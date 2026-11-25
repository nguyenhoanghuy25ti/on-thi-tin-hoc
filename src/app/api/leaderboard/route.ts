import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const examId = url.searchParams.get("examId");

    const attempts = await prisma.examAttempt.findMany({
      where: examId ? { examId } : undefined,
      take: 50,
      orderBy: [
        { totalScore: "desc" },
        { timeSpentSeconds: "asc" },
        { createdAt: "asc" },
      ],
      include: {
        user: {
          select: { name: true, email: true },
        },
        exam: {
          select: { title: true },
        },
      },
    });

    const leaderboard = attempts.map((a, index) => ({
      rank: index + 1,
      attemptId: a.id,
      examId: a.examId,
      studentName: a.user.name,
      examTitle: a.exam.title,
      orientation: a.selectedOrientation,
      totalScore: a.totalScore,
      part1Score: a.part1Score,
      part2Score: a.part2Score,
      timeSpentSeconds: a.timeSpentSeconds,
      createdAt: a.createdAt,
    }));

    return NextResponse.json({ leaderboard });
  } catch (error: any) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Lỗi tải bảng xếp hạng." }, { status: 500 });
  }
}
