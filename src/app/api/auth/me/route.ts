import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ user: null });
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        orientationPreference: true,
      },
    });
    if (!dbUser) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({ user: dbUser });
  } catch {
    return NextResponse.json({ user: session });
  }
}
