"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  Layers,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import GradeTabs from "@/components/GradeTabs";
import { getCurriculumByGrade } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import {
  LESSON_PRACTICE_SETS,
  QUESTION_TYPES,
  TOTAL_QUESTIONS_COUNT,
  getPracticeSetById,
} from "@/lib/questions";

function PracticeContent() {
  const searchParams = useSearchParams();
  const gradeParam = searchParams.get("grade") || "10";
  const activeType = searchParams.get("type") || "";
  const curriculum = getCurriculumByGrade(gradeParam);
  const { practice, isLessonDone } = useProgress();

  const [selectedChapterId, setSelectedChapterId] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const gradeTotalLessons = useMemo(
    () => curriculum.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0),
    [curriculum],
  );

  const gradeTotalQuestions = useMemo(() => {
    return curriculum.chapters.reduce((sum, ch) => {
      return (
        sum +
        ch.lessons.reduce((lSum, lesson) => {
          const set = getPracticeSetById(lesson.id);
          if (!set) return lSum;
          return lSum + set.mcq.length + set.truefalse.length + set.short.length;
        }, 0)
      );
    }, 0);
  }, [curriculum]);

  const bestScoreBySet = useMemo(() => {
    const map = new Map<string, { score: number; total: number }>();
    for (const item of practice) {
      const existing = map.get(item.setId);
      if (!existing || item.score / Math.max(item.total, 1) > existing.score / Math.max(existing.total, 1)) {
        map.set(item.setId, { score: item.score, total: item.total });
      }
    }
    return map;
  }, [practice]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleChapters = useMemo(() => {
    return curriculum.chapters
      .filter((ch) => selectedChapterId === "ALL" || ch.id === selectedChapterId)
      .map((ch, idx) => ({
        chapter: ch,
        chapterOrder:
          curriculum.chapters.findIndex((c) => c.id === ch.id) + 1 || idx + 1,
        lessons: ch.lessons.filter((lesson) => {
          if (!normalizedQuery) return true;
          return (
            lesson.title.toLowerCase().includes(normalizedQuery) ||
            lesson.tags.some((t) => t.toLowerCase().includes(normalizedQuery)) ||
            ch.title.toLowerCase().includes(normalizedQuery)
          );
        }),
      }))
      .filter((entry) => entry.lessons.length > 0);
  }, [curriculum, selectedChapterId, normalizedQuery]);

  return (
    <div className="container-page py-10 lg:py-12 space-y-8">
      {/* Header banner */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2.5 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-bold text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              ÔN LUYỆN ĐỦ {LESSON_PRACTICE_SETS.length} BÀI · 3 KHỐI 10 – 11 – 12
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Câu hỏi Ôn luyện Tin học Lớp {curriculum.grade}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Khối {curriculum.grade} có{" "}
              <strong>{gradeTotalLessons} bài học</strong> ({gradeTotalQuestions} câu hỏi ôn tập riêng từng bài trong tổng{" "}
              {TOTAL_QUESTIONS_COUNT} câu toàn hệ thống) với đủ 3 dạng:{" "}
              <strong>Trắc nghiệm nhiều lựa chọn</strong>,{" "}
              <strong>Đúng / Sai</strong> và <strong>Tự luận</strong>.
            </p>
          </div>

          <Link href="/exams" className="btn-primary shrink-0">
            <FileCheck2 className="h-4 w-4" />
            Vào phòng thi thử 50 phút
          </Link>
        </div>

        {/* Grade switcher + Question type filter */}
        <div className="mt-6 pt-5 border-t border-border flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <GradeTabs
            basePath="/practice"
            activeGrade={curriculum.grade}
            extraParams={activeType ? { type: activeType } : undefined}
          />

          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-background p-1">
            <Link
              href={`/practice?grade=${curriculum.grade}`}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                !activeType
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tất cả dạng
            </Link>
            {QUESTION_TYPES.map((t) => (
              <Link
                key={t.key}
                href={`/practice?grade=${curriculum.grade}&type=${t.key}`}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeType === t.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Chapter filter & lesson search */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedChapterId("ALL")}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                selectedChapterId === "ALL"
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              Tất cả chuyên đề ({curriculum.chapters.length})
            </button>
            {curriculum.chapters.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setSelectedChapterId(ch.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  selectedChapterId === ch.id
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                CĐ {idx + 1} · {ch.lessons.length} bài
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên bài học hoặc từ khóa..."
              className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Chapters and per-lesson practice cards */}
      {visibleChapters.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Không tìm thấy bài học phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedChapterId("ALL");
            }}
            className="btn-ghost text-xs"
          >
            Xem toàn bộ bài học Khối {curriculum.grade}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {visibleChapters.map(({ chapter, chapterOrder, lessons }) => {
            const chapterSet = getPracticeSetById(chapter.practiceId);
            return (
              <section key={chapter.id} className="space-y-4">
                {/* Chapter Header */}
                <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="mono-id text-primary">
                      CHUYÊN ĐỀ {String(chapterOrder).padStart(2, "0")} · {chapter.lessons.length} BÀI HỌC · LỚP {curriculum.grade}
                    </span>
                    <h2 className="mt-1 font-heading text-lg font-extrabold text-foreground">
                      {chapter.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {chapter.desc}
                    </p>
                  </div>

                  {chapterSet && (
                    <Link
                      href={`/practice/${chapter.practiceId}?type=${activeType || "mcq"}`}
                      className="btn-ghost shrink-0 text-xs"
                    >
                      <Layers className="h-3.5 w-3.5 text-primary" />
                      Ôn tổng hợp chuyên đề
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>

                {/* Individual Lesson Practice Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {lessons.map((lesson, lIdx) => {
                    const set = getPracticeSetById(lesson.id);
                    if (!set) return null;

                    const best = bestScoreBySet.get(lesson.id);
                    const theoryDone = isLessonDone(lesson.id);
                    const summaryText = lesson.bullets[0] || lesson.note;

                    return (
                      <article
                        key={lesson.id}
                        className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="mono-id text-primary">
                              L{curriculum.grade} · CĐ{chapterOrder} · BÀI {lIdx + 1}
                            </span>

                            <div className="flex items-center gap-1.5">
                              {theoryDone && (
                                <span
                                  title="Đã học xong lý thuyết"
                                  className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground"
                                >
                                  <CheckCircle2 className="h-3 w-3" />
                                  Đã học
                                </span>
                              )}
                              {best && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                                  <Trophy className="h-3 w-3" />
                                  {best.score}/{best.total}
                                </span>
                              )}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-heading text-base font-bold leading-snug text-foreground">
                              {lesson.title}
                            </h3>
                            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              {summaryText}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {lesson.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-background border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-3.5 border-t border-border space-y-2.5">
                          <div className="grid grid-cols-3 gap-2">
                            {QUESTION_TYPES.map((t) => {
                              const count = set[t.key].length;
                              const isHighlighted = activeType === t.key;
                              return (
                                <Link
                                  key={t.key}
                                  href={`/practice/${set.id}?type=${t.key}`}
                                  className={`group flex flex-col justify-between gap-1 rounded-xl border px-2.5 py-2 transition ${
                                    isHighlighted
                                      ? "border-primary bg-accent"
                                      : "border-border bg-background hover:border-primary/50"
                                  }`}
                                >
                                  <span className="text-[11px] font-bold text-foreground leading-tight">
                                    {t.key === "mcq"
                                      ? "Trắc nghiệm"
                                      : t.key === "truefalse"
                                      ? "Đúng / Sai"
                                      : "Tự luận"}
                                  </span>
                                  <span className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                                    {count} câu
                                    <ArrowRight className="h-2.5 w-2.5 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                                  </span>
                                </Link>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between text-[11px]">
                            <Link
                              href={`/theory/${lesson.id}`}
                              className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-primary transition"
                            >
                              <BookOpen className="h-3 w-3" />
                              Xem tóm tắt SGK
                            </Link>
                            <span className="font-mono text-muted-foreground">
                              {set.mcq.length + set.truefalse.length + set.short.length} câu hỏi
                            </span>
                          </div>
                        </div>
                      </article>
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

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-14 text-sm text-muted-foreground">
          Đang tải bộ câu hỏi ôn luyện theo từng bài học...
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
