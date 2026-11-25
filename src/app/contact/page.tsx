"use client";

import { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Facebook,
  GraduationCap,
  Mail,
  Phone,
  Send,
  User,
  Youtube,
} from "lucide-react";

const TOPICS = [
  "Báo lỗi câu hỏi / đáp án",
  "Góp ý nội dung bài học SGK",
  "Tư vấn lộ trình ôn thi THPT",
  "Khác",
];

const SUPPORT_CHANNELS = [
  { icon: User, label: "Tác giả thực hiện", value: "Nguyễn Hoàng Huy" },
  { icon: Phone, label: "Hotline hỗ trợ", value: "0986 808 430", href: "tel:0986808430" },
  {
    icon: Mail,
    label: "Email",
    value: "nguyenhoanghuy25ti@gmail.com",
    href: "mailto:nguyenhoanghuy25ti@gmail.com",
  },
  {
    icon: Clock,
    label: "Thời gian phản hồi",
    value: "Hỗ trợ 24/7 — cả ngày, mọi ngày",
  },
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    studentClass: "",
    school: "",
    email: "",
    topic: TOPICS[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSent(false);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Em cần điền Họ tên, Email và Nội dung phản hồi / báo lỗi.");
      return;
    }

    const formattedMessage = [
      form.studentClass.trim() ? `Lớp: ${form.studentClass.trim()}` : null,
      form.school.trim() ? `Trường: ${form.school.trim()}` : null,
      form.message.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          topic: form.topic,
          message: formattedMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Chưa gửi được phản hồi. Em thử lại giúp nhé.");
      } else {
        setSent(true);
        setForm({
          name: "",
          studentClass: "",
          school: "",
          email: "",
          topic: TOPICS[0],
          message: "",
        });
      }
    } catch {
      setError("Chưa gửi được phản hồi. Em thử lại giúp nhé.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-10 lg:py-14 space-y-8">
      <div className="max-w-2xl">
        <p className="eyebrow">Liên hệ & Góp ý</p>
        <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Gửi phản hồi & Báo lỗi câu hỏi
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Nếu em phát hiện câu hỏi/đáp án cần chỉnh sửa, cần tư vấn lộ trình ôn thi hoặc góp ý tính năng cho IT Master THPT, hãy điền biểu mẫu bên dưới.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[12px] font-semibold text-foreground">
                Họ và tên *
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Nguyễn Văn A"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-foreground">
                Email liên hệ *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="hocsinh@email.com"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[12px] font-semibold text-foreground">
                Lớp
              </label>
              <input
                value={form.studentClass}
                onChange={(e) => setForm((p) => ({ ...p, studentClass: e.target.value }))}
                placeholder="Ví dụ: 12A1"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-foreground">
                Trường
              </label>
              <input
                value={form.school}
                onChange={(e) => setForm((p) => ({ ...p, school: e.target.value }))}
                placeholder="Ví dụ: THPT Chuyên..."
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-foreground">
              Chủ đề phản hồi
            </label>
            <select
              value={form.topic}
              onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-foreground">
              Nội dung chi tiết *
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              rows={5}
              placeholder="Mô tả câu hỏi cần báo lỗi (mã bài/câu số) hoặc nội dung góp ý của em…"
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-4 py-3 text-[12.5px] font-medium text-destructive">
              {error}
            </p>
          )}

          {sent && !error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-3 text-[12.5px] font-semibold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                Gửi thành công! Cảm ơn em đã gửi phản hồi / báo lỗi. Hệ thống đã ghi nhận và sẽ phản hồi qua email sớm nhất.
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Đang gửi…" : "Gửi phản hồi / báo lỗi"}
          </button>
        </form>

        <aside className="space-y-4">
          {/* Author & HK1 Exam Project Info Box */}
          <div className="rounded-2xl border border-primary/30 bg-accent/60 p-5 sm:p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Award className="h-4 w-4" />
              Thông tin tác giả thực hiện dự án
            </div>
            <h2 className="font-heading text-lg font-extrabold text-foreground">
              Sản phẩm Bài thi HK1 - Môn Tin học
            </h2>
            <ul className="space-y-2 text-[13px] text-foreground/90">
              <li className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                <span>
                  Nền tảng: <strong>IT Master THPT</strong>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary shrink-0" />
                <span>
                  Tác giả: <strong>Nguyễn Hoàng Huy</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Nội dung: Bám sát SGK Tin học 10, 11, 12 — Bộ Kết nối tri thức với cuộc sống (GDPT 2018)
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-heading text-base font-bold text-foreground">
              Kênh hỗ trợ ôn thi
            </h2>
            <ul className="mt-4 space-y-4">
              {SUPPORT_CHANNELS.map((ch) => {
                const Icon = ch.icon;
                return (
                  <li key={ch.label} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Icon className="h-4 w-4 text-primary" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {ch.label}
                      </p>
                      {ch.href ? (
                        <a
                          href={ch.href}
                          className="text-[13px] font-medium text-foreground hover:text-primary"
                        >
                          {ch.value}
                        </a>
                      ) : (
                        <p className="text-[13px] font-medium text-foreground">{ch.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-heading text-base font-bold text-foreground">
              Theo dõi lớp học
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Nhận thông báo bài giảng mới và đề luyện tập bổ sung.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2 text-[12.5px] font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {s.label}
                  </a>
                );
              })}
              <a
                href="https://zalo.me/0986808430"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2 text-[12.5px] font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
              >
                Zalo
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
