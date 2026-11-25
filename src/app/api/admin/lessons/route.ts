import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    const [topics, lessons] = await Promise.all([
      prisma.topic.findMany({ orderBy: { orderIndex: "asc" } }),
      prisma.lesson.findMany({
        orderBy: [{ topicId: "asc" }, { orderIndex: "asc" }],
        include: { topic: { select: { title: true, slug: true } } },
      }),
    ]);

    return NextResponse.json({ topics, lessons });
  } catch (error: any) {
    console.error("Admin list lessons error:", error);
    return NextResponse.json({ error: "Lỗi tải danh sách bài giảng." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 403 });
    }

    const body = await request.json();
    const { topicId, title, slug, category, contentMarkdown, flashcardsJson, orderIndex } = body;

    if (!topicId || !title || !slug || !contentMarkdown) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ chủ đề, tiêu đề, slug và nội dung." },
        { status: 400 }
      );
    }

    const lesson = await prisma.lesson.create({
      data: {
        topicId,
        title,
        slug,
        category: category || "Lớp 12",
        contentMarkdown,
        flashcardsJson:
          typeof flashcardsJson === "string"
            ? flashcardsJson
            : JSON.stringify(flashcardsJson || []),
        orderIndex: Number(orderIndex) || 1,
      },
    });

    return NextResponse.json({ success: true, lesson });
  } catch (error: any) {
    console.error("Create lesson error:", error);
    return NextResponse.json(
      { error: "Lỗi khi tạo bài giảng (có thể trùng slug)." },
      { status: 500 }
    );
  }
}
