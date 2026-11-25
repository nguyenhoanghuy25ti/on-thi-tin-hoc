import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { gradeExam } from "@/lib/scoring";

export async function GET(
  request: Request,
  { params }: { params: { attemptId: string } }
) {
  try {
    const { attemptId } = params;

    const attempt = await prisma.examAttempt.findUnique({
      where: { id: attemptId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        exam: {
          include: {
            questions: {
              orderBy: { orderIndex: "asc" },
            },
          },
        },
      },
    });

    if (!attempt) {
      return NextResponse.json(
        { error: "Không tìm thấy kết quả làm bài." },
        { status: 404 }
      );
    }

    let parsedAnswers = { part1: {}, part2: {} };
    try {
      parsedAnswers = JSON.parse(attempt.answersJson);
    } catch (e) {
      console.error("Error parsing answersJson:", e);
    }

    const breakdown = gradeExam(
      attempt.exam.questions as any,
      attempt.selectedOrientation as any,
      parsedAnswers as any
    );

    return NextResponse.json({
      attempt: {
        id: attempt.id,
        examId: attempt.examId,
        examTitle: attempt.exam.title,
        durationMinutes: attempt.exam.durationMinutes,
        studentName: attempt.user.name,
        selectedOrientation: attempt.selectedOrientation,
        part1Score: attempt.part1Score,
        part2Score: attempt.part2Score,
        totalScore: attempt.totalScore,
        timeSpentSeconds: attempt.timeSpentSeconds,
        createdAt: attempt.createdAt,
      },
      breakdown,
    });
  } catch (error: any) {
    console.error("Get attempt error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi lấy kết quả làm bài." },
      { status: 500 }
    );
  }
}
