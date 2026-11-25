"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageCircleQuestion, Send } from "lucide-react";

interface CommunityQuestion {
  id: string;
  name: string;
  grade: string;
  topic: string;
  content: string;
  createdAt?: string;
}

const GRADE_OPTIONS = ["10", "11", "12"];
const FILTER_TABS = [
  { key: "all", label: "Tất cả" },
  { key: "10", label: "Lớp 10" },
  { key: "11", label: "Lớp 11" },
  { key: "12", label: "Lớp 12" },
];

export default function QaPage() {
  const [items, setItems] = useState<CommunityQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [filterGrade, setFilterGrade] = useState("all");

  // Form state
  const [form, setForm] = useState({ name: "", grade: "10", topic: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetch("/api/qa");
      const data = await res.json();
      if (res.ok && Array.isArray(data.items)) {
        setItems(data.items);
        setLoadError(false);
      } else {
        setLoadError(true);
      }
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!form.name.trim() || !form.content.trim()) {
      setFormError("Em cần điền tên hiển thị và nội dung câu hỏi.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Chưa gửi được câu hỏi. Em thử lại giúp nhé.");
      } else {
        setForm({ name: "", grade: form.grade, topic: "", content: "" });
        setFormSuccess("Đã gửi câu hỏi của em.");
        fetchQuestions();
      }
    } catch {
      setFormError("Chưa gửi được câu hỏi. Em thử lại giúp nhé.");
    } finally {
      setSubmitting(false);
    }
  };

  const visibleItems =
    filterGrade === "all"
      ? items
      : items.filter((item) => String(item.grade) === filterGrade);

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Hỏi đáp</p>
          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Hỏi bài cùng cả lớp
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Chỗ nào chưa hiểu, em cứ hỏi. Câu hỏi được công khai để các bạn cùng khối tham khảo và cùng ôn.
          </p>
        </div>

        <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterGrade(tab.key)}
              className={`rounded-lg px-3 py-2 text-[12px] font-semibold transition ${
                filterGrade === tab.key
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-9 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div>
          {loadError && (
            <p className="mb-3 rounded-xl bg-destructive/10 px-4 py-3 text-[12.5px] text-destructive">
              Chưa tải được danh sách câu hỏi. Em tải lại trang giúp nhé.
            </p>
          )}

          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl border border-border bg-card"
                />
              ))}
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-12 text-center">
              <MessageCircleQuestion className="mx-auto h-6 w-6 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">
                Chưa có câu hỏi nào phù hợp
              </p>
              <p className="mt-1 text-[12.5px] text-muted-foreground">
                Em có thể là người đặt câu hỏi đầu tiên ở khung bên cạnh.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {visibleItems.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13px] font-semibold text-foreground">
                      {item.name}
                    </span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                      Lớp {item.grade}
                    </span>
                    {item.topic && (
                      <span className="text-[11.5px] text-primary">{item.topic}</span>
                    )}
                  </div>
                  <p className="mt-2 whitespace-pre-line text-[13.5px] leading-relaxed text-foreground/85">
                    {item.content}
                  </p>
                  <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("vi-VN", {
                          timeZone: "Asia/Bangkok",
                        })
                      : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:sticky lg:top-24">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-5 sm:p-6"
          >
            <h2 className="font-heading text-lg font-bold text-foreground">
              Gửi câu hỏi mới
            </h2>

            <label className="mt-5 block text-[12px] font-semibold text-foreground">
              Tên hiển thị
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ví dụ: Minh Anh"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
            />

            <label className="mt-4 block text-[12px] font-semibold text-foreground">
              Khối lớp
            </label>
            <select
              value={form.grade}
              onChange={(e) => setForm((p) => ({ ...p, grade: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
            >
              {GRADE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </select>

            <label className="mt-4 block text-[12px] font-semibold text-foreground">
              Chủ đề / bài học
            </label>
            <input
              value={form.topic}
              onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
              placeholder="Ví dụ: Vòng lặp while"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
            />

            <label className="mt-4 block text-[12px] font-semibold text-foreground">
              Nội dung câu hỏi
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              rows={5}
              placeholder="Em chưa hiểu chỗ này vì…"
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] outline-none transition focus:border-primary/50"
            />

            {formError && (
              <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-[12px] text-destructive">
                {formError}
              </p>
            )}

            {formSuccess && (
              <p className="mt-3 rounded-lg bg-success/10 px-3 py-2 text-[12px] text-success">
                {formSuccess}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-5 w-full disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Đang gửi…" : "Gửi câu hỏi"}
            </button>

            <p className="mt-3 text-[11.5px] leading-relaxed text-muted-foreground">
              Câu hỏi được công khai để các bạn cùng tham khảo — em không nên ghi số điện thoại hay địa chỉ cá nhân.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
