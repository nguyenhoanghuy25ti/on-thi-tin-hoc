import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        orientationPreference: true,
        createdAt: true,
        attempts: {
          orderBy: { createdAt: "desc" },
          include: {
            exam: { select: { id: true, title: true } },
          },
        },
      },
    });

    const formatted = students.map((s) => {
      const attemptCount = s.attempts.length;
      const avgScore =
        attemptCount > 0
          ? Math.round(
              (s.attempts.reduce((acc, a) => acc + a.totalScore, 0) / attemptCount) * 100
            ) / 100
          : 0;
      const bestScore =
        attemptCount > 0 ? Math.max(...s.attempts.map((a) => a.totalScore)) : 0;

      return {
        id: s.id,
        name: s.name,
        email: s.email,
        orientationPreference: s.orientationPreference || "ICT",
        createdAt: s.createdAt,
        attemptCount,
        avgScore,
        bestScore,
        attempts: s.attempts.map((a) => ({
          id: a.id,
          examId: a.examId,
          examTitle: a.exam.title,
          selectedOrientation: a.selectedOrientation,
          part1Score: a.part1Score,
          part2Score: a.part2Score,
          totalScore: a.totalScore,
          timeSpentSeconds: a.timeSpentSeconds,
          createdAt: a.createdAt,
        })),
      };
    });

    return NextResponse.json({ students: formatted });
  } catch (error: any) {
    console.error("Admin list students error:", error);
    return NextResponse.json({ error: "Lỗi tải danh sách học sinh." }, { status: 500 });
  }
}
