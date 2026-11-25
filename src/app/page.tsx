"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  FileCheck2,
  Layers,
  PlayCircle,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useProgress } from "@/lib/progress";
import { CURRICULUM, TOTAL_LESSONS_COUNT } from "@/lib/curriculum";
import { QUESTION_TYPES, TOTAL_QUESTIONS_COUNT } from "@/lib/questions";
import { TOTAL_VIDEOS_COUNT } from "@/lib/videos";

const FORMAT_CARDS = [
  {
    code: "DẠNG 01",
    type: "mcq",
    badge: "A · B · C · D",
    badgeColor: "bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
    title: "Trắc nghiệm nhiều lựa chọn",
    desc: "Mỗi câu có 4 phương án và duy nhất 1 đáp án đúng. Chấm ngay lập tức kèm giải thích vì sao các phương án nhiễu sai.",
  },
  {
    code: "DẠNG 02",
    type: "truefalse",
    badge: "Đúng / Sai",
    badgeColor: "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    title: "Trắc nghiệm Đúng / Sai",
    desc: "Mỗi câu gồm nhiều nhận định độc lập a, b, c. Rèn tư duy đọc kỹ từng chi tiết code, SQL và lý thuyết.",
  },
  {
    code: "DẠNG 03",
    type: "short",
    badge: "Tự luận",
    badgeColor: "bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    title: "Câu hỏi Tự luận",
    desc: "Trình bày đáp án ngắn, kết quả thuật toán hoặc phân tích khái niệm — đối chiếu trực tiếp với lời giải chuẩn SGK.",
  },
];

export default function HomePage() {
  const { lessons, doneCount, practice, averageScore } = useProgress();
  const percent = TOTAL_LESSONS_COUNT
    ? Math.round((doneCount / TOTAL_LESSONS_COUNT) * 100)
    : 0;

  return (
    <div className="space-y-20 pb-10">
      {/* 1. Asymmetric Bento Studio Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="container-page relative grid items-center gap-10 lg:grid-cols-12">
          {/* Left 6 Cols: Headline & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Ôn thi Tốt nghiệp THPT · Chương trình 2018</span>
            </div>

            <h1 className="font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-5xl">
              Chinh phục điểm cao Tin học bằng{" "}
              <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                tư duy thuật toán & thực hành
              </span>
            </h1>

            <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Hệ thống ôn luyện trọn bộ Lớp 10 – 11 – 12: tóm tắt trọng tâm SGK, kho 89 video bài giảng trực quan, luyện tập 3 dạng thức và phòng thực hành Python / SQL trực tiếp.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/theory" className="btn-primary">
                <BookOpen className="h-4 w-4" />
                Khám phá kiến thức SGK
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/practice" className="btn-ghost">
                <FileCheck2 className="h-4 w-4 text-primary" />
                Luyện tập 3 dạng thức
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                <Code2 className="h-4 w-4" />
                Mở Code Lab →
              </Link>
            </div>
          </div>

          {/* Right 6 Cols: Interactive Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bento 1: Personal Progress Card */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="mono-id text-primary">Tiến độ học tập</span>
                <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] font-bold text-accent-foreground">
                  {percent}%
                </span>
              </div>
              <div>
                <div className="font-heading text-3xl font-extrabold text-foreground">
                  {doneCount}
                  <span className="text-base font-medium text-muted-foreground">
                    /{TOTAL_LESSONS_COUNT} bài
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border">
                <span>Lượt luyện: <strong className="text-foreground">{practice.length}</strong></span>
                <span>TB: <strong className="text-foreground">{averageScore}%</strong></span>
              </div>
            </div>

            {/* Bento 2: Platform Numbers */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-background p-3 border border-border">
                <p className="font-heading text-2xl font-extrabold text-foreground">
                  {TOTAL_LESSONS_COUNT}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Bài lý thuyết</p>
              </div>
              <div className="rounded-xl bg-background p-3 border border-border">
                <p className="font-heading text-2xl font-extrabold text-primary">
                  {TOTAL_VIDEOS_COUNT}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Video bài giảng</p>
              </div>
              <div className="rounded-xl bg-background p-3 border border-border">
                <p className="font-heading text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                  {TOTAL_QUESTIONS_COUNT}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Câu luyện tập</p>
              </div>
              <div className="rounded-xl bg-background p-3 border border-border">
                <p className="font-heading text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {QUESTION_TYPES.length}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Dạng đề thi</p>
              </div>
            </div>

            {/* Bento 3: Mini Code Lab Snippet (Spans 2 cols on sm+) */}
            <div className="sm:col-span-2 rounded-2xl border border-slate-800 bg-slate-950 p-5 text-slate-200 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                  <span>binary_search.py · Chạy thử trên trình duyệt</span>
                </div>
                <Link
                  href="/playground"
                  className="rounded-lg bg-emerald-600/20 border border-emerald-500/30 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-300 hover:bg-emerald-600/30 transition"
                >
                  Chạy ngay →
                </Link>
              </div>
              <pre className="font-mono text-xs leading-relaxed overflow-x-auto text-slate-300">
                <code>
                  <span className="text-purple-400">def</span>{" "}
                  <span className="text-amber-300">tim_nhi_phan</span>(a, x):{"\n"}
                  {"  "}l, r = <span className="text-pink-400">0</span>,{" "}
                  <span className="text-sky-300">len</span>(a) -{" "}
                  <span className="text-pink-400">1</span>
                  {"  "}
                  <span className="text-slate-500"># Độ phức tạp O(log n)</span>
                  {"\n"}
                  {"  "}
                  <span className="text-purple-400">while</span> l &lt;= r: mid = (l + r) //{" "}
                  <span className="text-pink-400">2</span> ...
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Grade Roadmap: Timeline Stepper Cards */}
      <section className="container-page">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <p className="eyebrow">Lộ trình học tập 3 khối</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Hệ thống kiến thức liền mạch từ Lớp 10 đến 12
            </h2>
          </div>
          <Link
            href="/videos"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <PlayCircle className="h-4 w-4" />
            Xem trọn bộ {TOTAL_VIDEOS_COUNT} video bài giảng →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CURRICULUM.map((g, idx) => {
            const gradeLessons = g.chapters.flatMap((c) => c.lessons);
            const gradeDone = gradeLessons.filter((l) => lessons[l.id]).length;
            const gradePct = gradeLessons.length
              ? Math.round((gradeDone / gradeLessons.length) * 100)
              : 0;

            return (
              <article
                key={g.grade}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-bold text-accent-foreground">
                    <Layers className="h-3.5 w-3.5" />
                    KHỐI {g.grade} · BƯỚC 0{idx + 1}
                  </span>
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    {gradeDone}/{gradeLessons.length} bài
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground">
                  {g.headline}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {g.summary}
                </p>

                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${gradePct}%` }}
                  />
                </div>

                <ul className="mt-5 flex-1 space-y-2 border-t border-border pt-4">
                  {g.chapters.map((ch) => (
                    <li
                      key={ch.id}
                      className="flex items-start gap-2 text-xs text-foreground/85"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>{ch.title}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <Link
                    href={`/theory?grade=${g.grade}`}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Học lý thuyết lớp {g.grade} →
                  </Link>
                  <Link
                    href={`/videos?grade=${g.grade}`}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    Xem video
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. Three Exam Formats: Colored Bento Cards */}
      <section className="border-y border-border bg-card py-16">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow">Cấu trúc đề thi mới 2025</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Rèn kỹ năng trên cả 3 dạng câu hỏi chuẩn Bộ GD&ĐT
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Chấm điểm tức thì, giải thích tường tận từng câu đúng/sai và lưu lịch sử luyện tập tự động.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {FORMAT_CARDS.map((card) => (
              <Link
                key={card.type}
                href={`/practice?type=${card.type}`}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="mono-id">{card.code}</span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold text-primary">
                  <span>Luyện dạng này ngay</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Tools & Philosophy Section */}
      <section className="container-page grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-sm">
            <img
              src="/images/mission-sphere.png"
              alt="Minh hoạ hệ thống tri thức Tin học"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <p className="eyebrow">Phương pháp ByteLab THPT</p>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Học lý thuyết ngắn gọn — Kiểm chứng ngay bằng thực hành
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Thay vì học thuộc lòng máy móc, ByteLab THPT kết hợp sơ đồ kiến thức trọng tâm, 89 video giảng dạy từng bài, câu hỏi giải thích chi tiết và môi trường chạy mã nguồn trực tiếp ngay trong trình duyệt.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/exams"
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <Cpu className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">Phòng thi thử 50 phút</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Đề chuẩn 28 câu, tự chọn nhánh CS hoặc ICT.
                </p>
              </div>
            </Link>

            <Link
              href="/playground"
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <Database className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">Python, SQLite & HTML Lab</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Chạy thử code thực tế không cần cài đặt.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Emerald-Teal Gradient CTA Banner */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 px-6 py-12 text-white shadow-lg sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-200">
                Bắt đầu ôn tập ngay hôm nay
              </p>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                Sẵn sàng chinh phục kỳ thi THPT Quốc gia?
              </h2>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Chọn chuyên đề bạn muốn ôn hoặc làm ngay một bộ câu hỏi — tiến trình học tập của bạn được tự động lưu lại.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/theory"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-teal-800 shadow transition hover:bg-emerald-50"
              >
                Vào học lý thuyết
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/qa"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Hỏi đáp cùng lớp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
