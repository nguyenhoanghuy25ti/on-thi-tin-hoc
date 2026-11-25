import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode"); // 'take' or 'review'

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

    // If student is taking the exam, mask correct answers to prevent inspecting network payload
    if (mode === "take") {
      const sanitizedQuestions = exam.questions.map((q) => {
        let subQuestions = [];
        if (q.subQuestionsJson) {
          try {
            const parsed = JSON.parse(q.subQuestionsJson);
            // Remove `isTrue` and `explanation` from subquestions
            subQuestions = parsed.map((item: any) => ({
              id: item.id,
              text: item.text,
            }));
          } catch {
            subQuestions = [];
          }
        }

        return {
          id: q.id,
          part: q.part,
          sectionType: q.sectionType,
          contentMarkdown: q.contentMarkdown,
          codeSnippet: q.codeSnippet,
          optionsJson: q.optionsJson,
          subQuestionsJson: JSON.stringify(subQuestions),
          orderIndex: q.orderIndex,
          // Intentionally omit correctOption and explanation
        };
      });

      return NextResponse.json({
        exam: {
          id: exam.id,
          title: exam.title,
          description: exam.description,
          durationMinutes: exam.durationMinutes,
          questions: sanitizedQuestions,
        },
      });
    }

    // Default: return full exam (for admin or review)
    return NextResponse.json({ exam });
  } catch (error: any) {
    console.error("Get exam error:", error);
    return NextResponse.json({ error: "Lỗi máy chủ khi tải đề thi." }, { status: 500 });
  }
}
