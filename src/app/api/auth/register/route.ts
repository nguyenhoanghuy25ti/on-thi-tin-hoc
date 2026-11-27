import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { normalizeProgressState } from "@/lib/progress-shared";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      orientationPreference,
      focusGrade,
      targetScore,
      initialProgress,
    } = body;

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (trimmedName.length < 2) {
      return NextResponse.json(
        { error: "Họ và tên cần có ít nhất 2 ký tự." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Địa chỉ email không hợp lệ." },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải có tối thiểu 6 ký tự." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác." },
        { status: 409 }
      );
    }

    const track = orientationPreference === "CS" ? "CS" : "ICT";
    const parsedGrade = Number(focusGrade);
    const parsedTarget = Number(targetScore);

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: trimmedName,
        email: normalizedEmail,
        passwordHash,
        role: "STUDENT",
        orientationPreference: track,
      },
    });

    const normalizedProgress = normalizeProgressState(initialProgress, {
      studentName: user.name,
      track,
      focusGrade: [10, 11, 12].includes(parsedGrade) ? parsedGrade : 12,
      targetScore: [7.5, 8.5, 9.5].includes(parsedTarget) ? parsedTarget : 8.5,
    });

    try {
      await prisma.userProgress.create({
        data: {
          userId: user.id,
          dataJson: JSON.stringify(normalizedProgress),
        },
      });
    } catch (progressErr) {
      console.warn("UserProgress create skipped (migration may be pending):", progressErr);
    }

    const token = await createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: "STUDENT",
      orientationPreference: track,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        orientationPreference: user.orientationPreference,
      },
      progress: normalizedProgress,
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Lỗi hệ thống khi đăng ký tài khoản." },
      { status: 500 }
    );
  }
}
