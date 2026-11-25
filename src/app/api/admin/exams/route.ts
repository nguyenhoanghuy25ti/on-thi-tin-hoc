import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    const exams = await prisma.exam.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { questions: true, attempts: true },
        },
      },
    });

    return NextResponse.json({ exams });
  } catch (error: any) {
    console.error("List exams error:", error);
    return NextResponse.json({ error: "Lỗi tải danh sách đề thi." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, difficulty, durationMinutes, isPublished, questions } = body;

    if (!title) {
      return NextResponse.json({ error: "Tiêu đề đề thi không được để trống." }, { status: 400 });
    }

    const exam = await prisma.exam.create({
      data: {
        title,
        description: description || "",
        difficulty: difficulty || "CHUAN_BO",
        durationMinutes: Number(durationMinutes) || 50,
        isPublished: isPublished ?? true,
      },
    });

    if (Array.isArray(questions) && questions.length > 0) {
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

    return NextResponse.json({ success: true, examId: exam.id });
  } catch (error: any) {
    console.error("Create exam error:", error);
    return NextResponse.json({ error: "Lỗi khi tạo đề thi." }, { status: 500 });
  }
}
