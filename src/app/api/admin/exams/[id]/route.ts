import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    const exam = await prisma.exam.findUnique({
      where: { id: params.id },
      include: {
        questions: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!exam) {
      return NextResponse.json({ error: "Không tìm thấy đề thi." }, { status: 404 });
    }

    return NextResponse.json({ exam });
  } catch {
    return NextResponse.json({ error: "Lỗi tải đề thi." }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, year, difficulty, durationMinutes, isPublished, questions } = body;

    const exam = await prisma.exam.update({
      where: { id: params.id },
      data: {
        title,
        description: description || "",
        year: Number(year) || 2025,
        difficulty: difficulty || "CHUAN_BO",
        durationMinutes: Number(durationMinutes) || 50,
        isPublished: isPublished ?? true,
      },
    });

    if (Array.isArray(questions)) {
      await prisma.question.deleteMany({ where: { examId: exam.id } });
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        await prisma.question.create({
          data: {
            examId: exam.id,
            part: Number(q.part) || 1,
            sectionType: q.sectionType || "COMMON",
            topicTag: q.topicTag || "Chung",
            contentMarkdown: q.contentMarkdown || "",
            codeSnippet: q.codeSnippet || null,
            optionsJson: q.optionsJson
              ? typeof q.optionsJson === "string"
                ? q.optionsJson
                : JSON.stringify(q.optionsJson)
              : null,
            correctOption: q.correctOption || null,
            subQuestionsJson: q.subQuestionsJson
              ? typeof q.subQuestionsJson === "string"
                ? q.subQuestionsJson
                : JSON.stringify(q.subQuestionsJson)
              : null,
            explanation: q.explanation || "",
            orderIndex: Number(q.orderIndex) || i + 1,
          },
        });
      }
    }

    return NextResponse.json({ success: true, exam });
  } catch (error: any) {
    console.error("Update exam error:", error);
    return NextResponse.json({ error: "Lỗi khi cập nhật đề thi." }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    await prisma.exam.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Đã xóa đề thi." });
  } catch {
    return NextResponse.json({ error: "Lỗi khi xóa đề thi." }, { status: 500 });
  }
}
