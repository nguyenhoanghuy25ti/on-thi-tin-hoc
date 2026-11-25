import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const lesson = await prisma.lesson.findUnique({
      where: { slug },
      include: {
        topic: true,
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Không tìm thấy bài học." }, { status: 404 });
    }

    return NextResponse.json({ lesson });
  } catch (error: any) {
    console.error("Get lesson error:", error);
    return NextResponse.json({ error: "Lỗi máy chủ khi tải bài học." }, { status: 500 });
  }
}
