import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await prisma.communityQuestion.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ items });
  } catch (error) {
    console.error("GET /api/qa error:", error);
    return NextResponse.json({ error: "Không tải được danh sách câu hỏi." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, grade, topic, content } = body;

    if (!name?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Em cần điền tên hiển thị và nội dung câu hỏi." },
        { status: 400 }
      );
    }

    const item = await prisma.communityQuestion.create({
      data: {
        name: name.trim(),
        grade: ["10", "11", "12"].includes(String(grade)) ? String(grade) : "10",
        topic: (topic || "").trim(),
        content: content.trim(),
      },
    });

    return NextResponse.json({ item });
  } catch (error) {
    console.error("POST /api/qa error:", error);
    return NextResponse.json({ error: "Chưa gửi được câu hỏi." }, { status: 500 });
  }
}
