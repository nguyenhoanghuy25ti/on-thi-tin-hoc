"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  PlayCircle,
  Target,
} from "lucide-react";
import GradeTabs from "@/components/GradeTabs";
import { CurriculumOrientation, getCurriculumByGrade } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

const ORIENTATION_BADGES: Record<
  CurriculumOrientation,
  { label: string; cls: string }
> = {
  CHUNG: {
    label: "Phần chung",
    cls: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
  },
  ICT: {
    label: "Định hướng Tin học ứng dụng (ICT)",
    cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
  CS: {
    label: "Định hướng Khoa học máy tính (CS)",
    cls: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  },
  ICT_CS: {
    label: "Nền tảng CS & ICT",
    cls: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  },
};

function TheoryContent() {
  const searchParams = useSearchParams();
  const gradeParam = searchParams.get("grade") || "10";
  const curriculum = getCurriculumByGrade(gradeParam);
  const { isLessonDone } = useProgress();

  const [selectedChapterId, setSelectedChapterId] = useState<string>("ALL");
  const [orientationFilter, setOrientationFilter] = useState<string>("ALL");

  const totalLessons = curriculum.chapters.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedLessons = curriculum.chapters.reduce(
    (sum, c) => sum + c.lessons.filter((l) => isLessonDone(l.id)).length,
    0
  );

  const visibleChapters = curriculum.chapters.filter((c) => {
    if (selectedChapterId !== "ALL" && c.id !== selectedChapterId) return false;
    if (orientationFilter !== "ALL") {
      if (orientationFilter === "CHUNG") return c.orientation === "CHUNG";
      if (orientationFilter === "ICT")
        return c.orientation === "ICT" || c.orientation === "ICT_CS";
      if (orientationFilter === "CS")
        return c.orientation === "CS" || c.orientation === "ICT_CS";
    }
    return true;
  });

  return (
    <div className="container-page py-10 lg:py-12 space-y-8">
      {/* Top Header Card */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 font-mono text-[11px] font-bold text-accent-foreground">
              <BookOpen className="h-3.5 w-3.5 shrink-0" />
              Bài giảng chi tiết bám sát SGK Tin học 10, 11, 12 — Bộ Kết nối tri thức với cuộc sống
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Kiến thức trọng tâm & Bài giảng Lớp {curriculum.grade}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {curriculum.intro}
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
            <a
              href={curriculum.sgk}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-bold text-foreground transition hover:border-primary/50 hover:text-primary"
            >
              <BookOpen className="h-4 w-4 text-primary" />
              Mở file SGK Lớp {curriculum.grade}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <span className="font-mono text-xs text-muted-foreground">
              Đã hoàn thành:{" "}
              <strong className="text-primary">
                {completedLessons}/{totalLessons}
              </strong>{" "}
              bài
            </span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <GradeTabs basePath="/theory" activeGrade={curriculum.grade} />

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedChapterId("ALL")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition ${
                selectedChapterId === "ALL"
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              Tất cả chủ đề
            </button>
            {curriculum.chapters.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setSelectedChapterId(ch.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition ${
                  selectedChapterId === ch.id
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {ch.topicCode}
              </button>
            ))}
          </div>
        </div>

        {curriculum.grade >= 11 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-border/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mr-1">
              Định hướng SGK:
            </span>
            {[
              { key: "ALL", label: "Tất cả nội dung" },
              { key: "CHUNG", label: "Phần chung" },
              { key: "ICT", label: "Tin học ứng dụng (ICT)" },
              { key: "CS", label: "Khoa học máy tính (CS)" },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setOrientationFilter(opt.key)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold border transition ${
                  orientationFilter === opt.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chapters & Lesson Cards Grid */}
      {visibleChapters.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Không có chủ đề phù hợp với bộ lọc hiện tại.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedChapterId("ALL");
              setOrientationFilter("ALL");
            }}
            className="btn-ghost text-xs"
          >
            Xem toàn bộ chủ đề Lớp {curriculum.grade}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {visibleChapters.map((chapter) => {
            const doneInChapter = chapter.lessons.filter((l) => isLessonDone(l.id)).length;
            const oriBadge = ORIENTATION_BADGES[chapter.orientation];
            return (
              <section key={chapter.id} className="space-y-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="mono-id text-primary">
                        {chapter.topicCode} · {doneInChapter}/{chapter.lessons.length} bài xong
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${oriBadge.cls}`}
                      >
                        {oriBadge.label}
                      </span>
                    </div>
                    <h2 className="mt-1.5 font-heading text-xl font-bold text-foreground">
                      {chapter.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{chapter.desc}</p>
                  </div>

                  <Link
                    href={`/practice/${chapter.practiceId}?type=mcq`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-bold text-accent-foreground transition hover:brightness-95"
                  >
                    <FileCheck2 className="h-3.5 w-3.5" />
                    Làm bài luyện chủ đề
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {chapter.lessons.map((lesson, lIdx) => {
                    const done = isLessonDone(lesson.id);
                    const lessonOri =
                      ORIENTATION_BADGES[lesson.orientation || chapter.orientation];
                    return (
                      <div
                        key={lesson.id}
                        className={`group flex flex-col justify-between rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md ${
                          done
                            ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded-lg bg-secondary px-2.5 py-1 font-mono text-[10.5px] font-bold text-muted-foreground">
                              BÀI {String(lIdx + 1).padStart(2, "0")}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {lesson.minutes}p
                              </span>
                              {done && (
                                <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Đã học
                                </span>
                              )}
                            </div>
                          </div>

                          <Link
                            href={`/theory/${lesson.id}`}
                            className="block font-heading text-base font-bold leading-snug text-foreground transition group-hover:text-primary"
                          >
                            {lesson.title}
                          </Link>

                          <div className="space-y-1.5 rounded-xl bg-background/70 border border-border/70 p-3 text-xs">
                            <p className="inline-flex items-center gap-1 font-bold text-[11px] text-primary">
                              <Target className="h-3 w-3" />
                              Mục tiêu & Trọng tâm
                            </p>
                            <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                              {lesson.objectives[0] || lesson.bullets[0]}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <span
                              className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${lessonOri.cls}`}
                            >
                              {lessonOri.label}
                            </span>
                            {lesson.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-background border border-border px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-border pt-3.5 text-xs">
                          <Link
                            href={`/theory/${lesson.id}`}
                            className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
                          >
                            Học bài chi tiết
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/practice/${lesson.id}?type=mcq`}
                              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                            >
                              Làm bài tập
                            </Link>
                            <Link
                              href={`/videos?grade=${curriculum.grade}`}
                              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium"
                            >
                              <PlayCircle className="h-3.5 w-3.5" />
                              Video
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function TheoryPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-14 text-sm text-muted-foreground">
          Đang tải kiến thức SGK...
        </div>
      }
    >
      <TheoryContent />
    </Suspense>
  );
}
