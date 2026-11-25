import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

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
    const { topicId, title, slug, category, contentMarkdown, flashcardsJson, orderIndex } = body;

    const lesson = await prisma.lesson.update({
      where: { id: params.id },
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
    console.error("Update lesson error:", error);
    return NextResponse.json({ error: "Lỗi cập nhật bài giảng." }, { status: 500 });
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

    await prisma.lesson.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi xóa bài giảng." }, { status: 500 });
  }
}
