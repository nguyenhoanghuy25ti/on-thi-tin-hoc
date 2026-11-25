import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    const [userCount, examCount, attemptCount, recentAttempts] = await Promise.all([
      prisma.user.count(),
      prisma.exam.count(),
      prisma.examAttempt.count(),
      prisma.examAttempt.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, email: true } },
          exam: { select: { title: true } },
        },
      }),
    ]);

    // Average score calculation
    const attempts = await prisma.examAttempt.findMany({
      select: { totalScore: true },
    });
    const avgScore =
      attempts.length > 0
        ? Math.round(
            (attempts.reduce((acc, curr) => acc + curr.totalScore, 0) / attempts.length) * 100
          ) / 100
        : 0;

    return NextResponse.json({
      stats: {
        userCount,
        examCount,
        attemptCount,
        avgScore,
        recentAttempts,
      },
    });
  } catch (error: any) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Lỗi tải thống kê quản trị." }, { status: 500 });
  }
}
