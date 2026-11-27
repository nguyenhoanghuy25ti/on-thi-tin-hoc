import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  AUTH_COOKIE_NAME,
  createSessionToken,
  getCurrentUser,
} from "@/lib/auth";
import {
  mergeProgressStates,
  normalizeProgressState,
  ProgressState,
} from "@/lib/progress-shared";

export const dynamic = "force-dynamic";

function parseJsonSafe(raw: string | null | undefined): unknown {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function GET() {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        name: true,
        orientationPreference: true,
        progress: {
          select: { dataJson: true, updatedAt: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy tài khoản." }, { status: 404 });
    }

    const raw = parseJsonSafe(user.progress?.dataJson);
    const progress = normalizeProgressState(raw, {
      studentName: user.name,
      track: user.orientationPreference === "CS" ? "CS" : "ICT",
    });

    return NextResponse.json({
      progress,
      updatedAt: user.progress?.updatedAt ?? null,
    });
  } catch (error) {
    console.error("GET /api/progress error:", error);
    return NextResponse.json(
      { error: "Không tải được tiến trình từ máy chủ." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const mode = body?.mode === "merge" ? "merge" : "replace";
    const incomingRaw = body?.progress ?? body;

    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        orientationPreference: true,
        progress: { select: { dataJson: true } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy tài khoản." }, { status: 404 });
    }

    const incomingState = normalizeProgressState(incomingRaw);
    let nextState: ProgressState;

    if (mode === "merge") {
      const existingRaw = parseJsonSafe(user.progress?.dataJson);
      const existingState = normalizeProgressState(existingRaw, {
        studentName: user.name,
        track: user.orientationPreference === "CS" ? "CS" : "ICT",
      });
      nextState = mergeProgressStates(existingState, incomingState, {
        studentName: user.name,
        track: user.orientationPreference === "CS" ? "CS" : "ICT",
      });
    } else {
      nextState = incomingState;
    }

    const nextName =
      nextState.profile.studentName && nextState.profile.studentName !== "Bạn học sinh"
        ? nextState.profile.studentName
        : user.name;
    const nextTrack = nextState.profile.track === "CS" ? "CS" : "ICT";

    nextState = {
      ...nextState,
      profile: {
        ...nextState.profile,
        studentName: nextName,
        track: nextTrack,
      },
    };

    const userChanged =
      nextName !== user.name || nextTrack !== user.orientationPreference;

    if (userChanged) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: nextName,
          orientationPreference: nextTrack,
        },
      });
    }

    const saved = await prisma.userProgress.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        dataJson: JSON.stringify(nextState),
      },
      update: {
        dataJson: JSON.stringify(nextState),
      },
      select: { updatedAt: true },
    });

    const response = NextResponse.json({
      success: true,
      progress: nextState,
      updatedAt: saved.updatedAt,
    });

    if (userChanged) {
      const refreshedToken = await createSessionToken({
        id: user.id,
        name: nextName,
        email: user.email,
        role: user.role as "STUDENT" | "ADMIN",
        orientationPreference: nextTrack,
      });
      response.cookies.set(AUTH_COOKIE_NAME, refreshedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("PUT /api/progress error:", error);
    return NextResponse.json(
      { error: "Không lưu được tiến trình lên máy chủ." },
      { status: 500 }
    );
  }
}
