import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { gradeExam } from "@/lib/scoring";
import { Orientation } from "@/lib/types";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    let user = await getCurrentUser();

    // If user is not logged in, look for default student account or create guest
    if (!user) {
      const student = await prisma.user.findFirst({
        where: { role: "STUDENT" },
      });
      if (student) {
        user = {
          id: student.id,
          name: student.name,
          email: student.email,
          role: "STUDENT",
          orientationPreference: student.orientationPreference as any,
        };
      } else {
        return NextResponse.json(
          { error: "Vui lòng đăng nhập để nộp bài thi." },
          { status: 401 }
        );
      }
    }

    const body = await request.json();
    const { selectedOrientation, answers, timeSpentSeconds } = body as {
      selectedOrientation: Orientation;
      answers: {
        part1: Record<string, string>;
        part2: Record<string, Record<string, boolean>>;
      };
      timeSpentSeconds: number;
    };

    if (!selectedOrientation || !answers) {
      return NextResponse.json(
        { error: "Dữ liệu nộp bài không hợp lệ." },
        { status: 400 }
      );
    }

    const exam = await prisma.exam.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!exam) {
      return NextResponse.json({ error: "Không tìm thấy đề thi." }, { status: 404 });
    }

    // Grade exam according to GDPT 2018 guidelines
    const breakdown = gradeExam(
      exam.questions as any,
      selectedOrientation,
      answers
    );

    // Save attempt in database
    const attempt = await prisma.examAttempt.create({
      data: {
        userId: user.id,
        examId: exam.id,
        selectedOrientation,
        answersJson: JSON.stringify(answers),
        part1Score: breakdown.part1Score,
        part2Score: breakdown.part2Score,
        totalScore: breakdown.totalScore,
        timeSpentSeconds: timeSpentSeconds || 0,
      },
    });

    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
      breakdown,
    });
  } catch (error: any) {
    console.error("Submit exam error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi chấm điểm và nộp bài thi." },
      { status: 500 }
    );
  }
}
