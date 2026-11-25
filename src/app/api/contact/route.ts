import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, topic, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Em cần điền họ tên, email và nội dung cần hỗ trợ." },
        { status: 400 }
      );
    }

    const item = await prisma.contactRequest.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        topic: (topic || "Khác").trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: "Chưa gửi được yêu cầu." }, { status: 500 });
  }
}
