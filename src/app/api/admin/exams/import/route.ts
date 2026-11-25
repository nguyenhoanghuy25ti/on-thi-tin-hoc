import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    const data = await request.json();
    const { title, description, difficulty, durationMinutes, isPublished, questions } = data;

    if (!title || !Array.isArray(questions)) {
      return NextResponse.json({ error: "Dữ liệu JSON không đúng cấu trúc đề thi." }, { status: 400 });
    }

    const exam = await prisma.exam.create({
      data: {
        title,
        description: description || "Đề thi nhập từ JSON",
        difficulty: difficulty || "CHUAN_BO",
        durationMinutes: Number(durationMinutes) || 50,
        isPublished: isPublished ?? true,
      },
    });

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

    return NextResponse.json({ success: true, examId: exam.id });
  } catch (error: any) {
    console.error("Import exam error:", error);
    return NextResponse.json({ error: "Lỗi xử lý file JSON nhập đề." }, { status: 500 });
  }
}
