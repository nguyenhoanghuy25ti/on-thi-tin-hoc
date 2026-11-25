"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Check,
  CirclePlay,
  Clock,
  Code2,
  FileCheck2,
  Lightbulb,
  ListChecks,
  Target,
} from "lucide-react";
import {
  getChapterByLessonId,
  getLessonById,
  getNextLesson,
} from "@/lib/curriculum";
import { toggleLessonDone, useProgress } from "@/lib/progress";

const ORIENTATION_LABEL: Record<string, string> = {
  CHUNG: "Phần chung",
  ICT: "Định hướng Tin học ứng dụng (ICT)",
  CS: "Định hướng Khoa học máy tính (CS)",
  ICT_CS: "Nền tảng CS & ICT",
};

export default function LessonDetailPage() {
  const params = useParams();
  const lessonId = params?.lessonId as string;

  const lesson = getLessonById(lessonId);
  const chapter = getChapterByLessonId(lessonId);
  const nextLesson = getNextLesson(lessonId);
  const { isLessonDone } = useProgress();

  if (!lesson) {
    return (
      <div className="container-page py-20">
        <h1 className="font-heading text-2xl font-bold">Không tìm thấy bài học này</h1>
        <Link
          href="/theory"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          ← Về danh sách kiến thức
        </Link>
      </div>
    );
  }

  const done = isLessonDone(lesson.id);
  const orientationText =
    ORIENTATION_LABEL[lesson.orientation || chapter?.orientation || "CHUNG"];

  return (
    <div className="container-page py-10 lg:py-14 space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
        <Link href={`/theory?grade=${lesson.grade}`} className="hover:text-primary font-semibold">
          Lớp {lesson.grade}
        </Link>
        <span>·</span>
        <span>{chapter ? chapter.title : "Chuyên đề"}</span>
        <span>·</span>
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-accent-foreground">
          {orientationText}
        </span>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 font-mono text-[11px] font-bold text-accent-foreground">
        <BookOpen className="h-3.5 w-3.5 shrink-0" />
        Nội dung tóm tắt bám sát SGK Tin học 10, 11, 12 — Bộ Kết nối tri thức với cuộc sống (SGK dùng chung)
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_310px]">
        <article className="space-y-8">
          <div>
            <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-[2.3rem]">
              {lesson.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted-foreground">
              <span>Lớp {lesson.grade}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {lesson.minutes} phút đọc
              </span>
              <span>·</span>
              <span>{lesson.tags.join(" · ")}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => toggleLessonDone(lesson.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[12.5px] font-semibold transition ${
                  done
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                <Check className="h-4 w-4" />
                {done ? "Đã hoàn thành bài học" : "Đánh dấu đã học"}
              </button>

              <Link
                href={`/practice/${lesson.id}?type=mcq`}
                className="btn-primary text-[12.5px]"
              >
                <FileCheck2 className="h-4 w-4" />
                Làm bài tập bài này
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={`/videos?grade=${lesson.grade}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-[12.5px] font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <CirclePlay className="h-4 w-4" />
                Video bài giảng
              </Link>
            </div>
          </div>

          {/* Tóm tắt trọng tâm 3 phần */}
          <div className="space-y-6">
            {/* (1) Mục tiêu cần đạt */}
            <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
              <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-primary">
                  <Target className="h-4 w-4" />
                </span>
                (1) Mục tiêu cần đạt
              </h2>
              <ul className="space-y-2">
                {lesson.objectives.map((obj, idx) => (
                  <li
                    key={obj}
                    className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-foreground/85"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-bold text-primary">
                      {idx + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* (2) Kiến thức cốt lõi */}
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-primary">
                  <ListChecks className="h-4 w-4" />
                </span>
                (2) Kiến thức cốt lõi
              </h2>
              <ol className="space-y-3">
                {lesson.bullets.map((bullet, idx) => (
                  <li
                    key={bullet}
                    className="flex gap-4 rounded-2xl border border-border bg-card px-5 py-4"
                  >
                    <span className="font-mono text-[11px] font-semibold text-primary mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-relaxed text-foreground/85">{bullet}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* (3) Ví dụ / Cú pháp minh họa */}
            <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
              <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-primary">
                  <Code2 className="h-4 w-4" />
                </span>
                (3) Ví dụ & Cú pháp minh họa
              </h2>
              <p className="text-sm font-semibold text-foreground">{lesson.example.title}</p>
              {lesson.example.code && (
                <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200">
                  <code>{lesson.example.code}</code>
                </pre>
              )}
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Giải thích:</strong> {lesson.example.explanation}
              </p>
            </section>

            {/* Lưu ý khi làm đề */}
            <div className="flex gap-3 rounded-2xl border border-primary/20 bg-accent px-5 py-4">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Lưu ý khi làm đề thi
                </p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground/80">
                  {lesson.note}
                </p>
              </div>
            </div>
          </div>

          {/* Chuyển nhanh sang làm bài tập 3 dạng */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="mono-id text-primary">Thực hành ngay sau khi đọc</p>
                <h3 className="font-heading text-base font-bold text-foreground">
                  Luyện tập 3 dạng câu hỏi của bài học này
                </h3>
              </div>
              {nextLesson && (
                <Link href={`/theory/${nextLesson.id}`} className="btn-ghost text-xs">
                  Bài tiếp: {nextLesson.title}
                </Link>
              )}
            </div>

            <div className="grid gap-2.5 sm:grid-cols-3">
              <Link
                href={`/practice/${lesson.id}?type=mcq`}
                className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-xs font-bold text-foreground hover:border-primary/60 hover:text-primary transition"
              >
                <span>Trắc nghiệm (10 câu)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={`/practice/${lesson.id}?type=truefalse`}
                className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-xs font-bold text-foreground hover:border-primary/60 hover:text-primary transition"
              >
                <span>Đúng / Sai (5 câu)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={`/practice/${lesson.id}?type=short`}
                className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-xs font-bold text-foreground hover:border-primary/60 hover:text-primary transition"
              >
                <span>Tự luận (5 câu)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </article>

        <aside className="h-max rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24 space-y-4">
          <div>
            <p className="mono-id text-primary">{chapter?.topicCode || "Chủ đề"}</p>
            <p className="mt-1 text-xs font-semibold text-foreground">{chapter?.title}</p>
          </div>
          <ul className="space-y-1 border-t border-border pt-3">
            {chapter?.lessons.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/theory/${item.id}`}
                  className={`block rounded-lg px-3 py-2 text-[12.5px] leading-snug transition ${
                    item.id === lesson.id
                      ? "bg-accent font-semibold text-accent-foreground"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
