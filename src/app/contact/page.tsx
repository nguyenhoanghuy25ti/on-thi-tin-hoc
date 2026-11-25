"use client";

import { useState } from "react";
import { Clock, Facebook, Mail, Phone, Send, Youtube } from "lucide-react";

const TOPICS = [
  "Tư vấn lộ trình ôn thi",
  "Góp ý / báo lỗi câu hỏi",
  "Hợp tác giảng dạy",
  "Khác",
];

const SUPPORT_CHANNELS = [
  { icon: Mail, label: "Người phụ trách", value: "Nguyễn Hoàng Huy" },
  { icon: Phone, label: "Hotline", value: "0986 808 430", href: "tel:0986808430" },
  {
    icon: Mail,
    label: "Email",
    value: "nguyenhoanghuy25ti@gmail.com",
    href: "mailto:nguyenhoanghuy25ti@gmail.com",
  },
  {
    icon: Clock,
    label: "Thời gian hỗ trợ",
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
      setError("Em cần điền họ tên, email và nội dung cần hỗ trợ.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Chưa gửi được yêu cầu. Em thử lại giúp nhé.");
      } else {
        setSent(true);
        setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
      }
    } catch {
      setError("Chưa gửi được yêu cầu. Em thử lại giúp nhé.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="max-w-2xl">
        <p className="eyebrow">Liên hệ</p>
        <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Cần hỗ trợ ôn thi?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Gửi câu hỏi về lộ trình, báo lỗi câu hỏi hoặc góp ý nội dung. Thầy sẽ phản hồi qua email em để lại.
        </p>
      </div>

      <div className="mt-9 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-5 sm:p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[12px] font-semibold text-foreground">
                Họ và tên
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
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="ban@email.com"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
              />
            </div>
          </div>

          <label className="mt-4 block text-[12px] font-semibold text-foreground">
            Nội dung cần hỗ trợ
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

          <label className="mt-4 block text-[12px] font-semibold text-foreground">
            Chi tiết
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            rows={5}
            placeholder="Em cần hỗ trợ về…"
            className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
          />

          {error && (
            <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-[12px] text-destructive">
              {error}
            </p>
          )}

          {sent && !error && (
            <p className="mt-3 rounded-lg bg-success/10 px-3 py-2 text-[12px] text-success">
              Đã nhận yêu cầu của em. Thầy sẽ phản hồi qua email sớm nhất.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-5 disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Đang gửi…" : "Gửi yêu cầu hỗ trợ"}
          </button>
        </form>

        <aside className="space-y-4">
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
