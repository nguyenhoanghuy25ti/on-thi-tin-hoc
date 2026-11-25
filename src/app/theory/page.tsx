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
} from "lucide-react";
import GradeTabs from "@/components/GradeTabs";
import { getCurriculumByGrade } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

function TheoryContent() {
  const searchParams = useSearchParams();
  const gradeParam = searchParams.get("grade") || "10";
  const curriculum = getCurriculumByGrade(gradeParam);
  const { isLessonDone } = useProgress();

  const [selectedChapterId, setSelectedChapterId] = useState<string>("ALL");

  const totalLessons = curriculum.chapters.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedLessons = curriculum.chapters.reduce(
    (sum, c) => sum + c.lessons.filter((l) => isLessonDone(l.id)).length,
    0
  );

  const visibleChapters =
    selectedChapterId === "ALL"
      ? curriculum.chapters
      : curriculum.chapters.filter((c) => c.id === selectedChapterId);

  return (
    <div className="container-page py-10 lg:py-12 space-y-8">
      {/* Top Header Card */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2.5 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-bold text-accent-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              SGK BỘ SÁCH DÙNG CHUNG MỚI · KẾT NỐI TRI THỨC
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Tóm tắt Kiến thức Tin học Lớp {curriculum.grade}
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
              Tất cả chuyên đề
            </button>
            {curriculum.chapters.map((ch, idx) => (
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
                Chuyên đề {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters & Lesson Cards Grid */}
      <div className="space-y-8">
        {visibleChapters.map((chapter, idx) => {
          const doneInChapter = chapter.lessons.filter((l) => isLessonDone(l.id)).length;
          return (
            <section key={chapter.id} className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className="mono-id text-primary">
                    Chuyên đề {String(idx + 1).padStart(2, "0")} · {doneInChapter}/
                    {chapter.lessons.length} bài xong
                  </span>
                  <h2 className="mt-1 font-heading text-xl font-bold text-foreground">
                    {chapter.title}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{chapter.desc}</p>
                </div>

                <Link
                  href={`/practice/${chapter.practiceId}?type=mcq`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-bold text-accent-foreground transition hover:brightness-95"
                >
                  <FileCheck2 className="h-3.5 w-3.5" />
                  Làm bài luyện chuyên đề
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {chapter.lessons.map((lesson, lIdx) => {
                  const done = isLessonDone(lesson.id);
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
                        <div className="flex items-center justify-between">
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

                        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          {lesson.bullets[0]}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {lesson.tags.map((tag) => (
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
                          Đọc tóm tắt
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/practice/${lesson.id}?type=mcq`}
                            className="font-semibold text-emerald-500 hover:underline"
                          >
                            Ôn bài
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
