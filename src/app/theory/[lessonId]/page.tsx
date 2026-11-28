"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BookmarkCheck,
  BookOpen,
  Check,
  CirclePlay,
  Clock,
  Code2,
  FileCheck2,
  Lightbulb,
  ListChecks,
  Sparkles,
  Target,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import MarkdownRenderer from "@/components/MarkdownRenderer";
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

const CODE_LANGUAGES = new Set(["python", "sql", "html", "css", "javascript", "json"]);

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
  const examples = lesson.examples && lesson.examples.length > 0 ? lesson.examples : [lesson.example];

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
        Bài giảng chi tiết bám sát SGK Tin học 10, 11, 12 — Bộ Kết nối tri thức với cuộc sống
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

          {lesson.intro && (
            <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-accent/60 to-card p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                <Sparkles className="h-4 w-4" />
                Dẫn nhập & Bối cảnh bài học
              </div>
              <p className="text-[14.5px] leading-relaxed text-foreground/90">{lesson.intro}</p>
            </section>
          )}

          {/* (1) Mục tiêu cần đạt */}
          <section id="muc-tieu" className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3 scroll-mt-24">
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
                  className="flex items-start gap-2.5 text-[14px] leading-relaxed text-foreground/85"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-bold text-primary">
                    {idx + 1}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* (2) Kiến thức chi tiết */}
          <section id="kien-thuc" className="space-y-5 scroll-mt-24">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-primary">
                <BookOpen className="h-4 w-4" />
              </span>
              (2) Nội dung kiến thức chi tiết
            </h2>

            {lesson.sections && lesson.sections.length > 0 ? (
              <div className="space-y-5">
                {lesson.sections.map((sec, idx) => (
                  <div
                    key={sec.title}
                    id={`sec-${idx + 1}`}
                    className="rounded-2xl border border-border bg-card p-5 sm:p-7 space-y-3 scroll-mt-24"
                  >
                    <div className="flex items-center gap-2.5 border-b border-border/70 pb-3">
                      <span className="rounded-lg bg-primary/10 px-2.5 py-1 font-mono text-xs font-bold text-primary">
                        2.{idx + 1}
                      </span>
                      <h3 className="font-heading text-[17px] font-bold text-foreground">
                        {sec.title}
                      </h3>
                    </div>
                    <MarkdownRenderer content={sec.content} />
                  </div>
                ))}
              </div>
            ) : (
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
            )}
          </section>

          {/* (3) Ví dụ & Bài tập minh họa */}
          <section id="vi-du" className="space-y-4 scroll-mt-24">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-primary">
                <Code2 className="h-4 w-4" />
              </span>
              (3) Ví dụ & Bài tập minh họa
            </h2>

            <div className="space-y-4">
              {examples.map((ex, idx) => {
                const isCodeLang = ex.language && CODE_LANGUAGES.has(ex.language.toLowerCase());
                return (
                  <div
                    key={ex.title}
                    className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
                        Ví dụ {idx + 1}
                      </span>
                      <p className="text-[15px] font-bold text-foreground">{ex.title}</p>
                    </div>

                    {ex.code &&
                      (isCodeLang ? (
                        <CodeBlock code={ex.code} language={ex.language} />
                      ) : (
                        <pre className="overflow-x-auto rounded-xl border border-border bg-secondary/60 p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-foreground">
                          <code>{ex.code}</code>
                        </pre>
                      ))}

                    {ex.steps && ex.steps.length > 0 && (
                      <div className="rounded-xl bg-background/80 border border-border/70 p-4 space-y-1.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">
                          Phân tích từng bước
                        </p>
                        <ol className="list-decimal ml-5 space-y-1 text-[13.5px] text-foreground/85">
                          {ex.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                      <strong className="text-foreground">Giải thích & Kết luận:</strong>{" "}
                      {ex.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* (4) Lỗi sai thường gặp & Bẫy đề thi */}
          {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
            <section
              id="bay-de-thi"
              className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5 sm:p-6 space-y-3 scroll-mt-24"
            >
              <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                (4) Lỗi sai thường gặp & Bẫy đề thi
              </h2>
              <ul className="space-y-2.5">
                {lesson.commonMistakes.map((mistake) => (
                  <li
                    key={mistake}
                    className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-foreground/90"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* (5) Ghi nhớ cốt lõi & Lưu ý ôn thi */}
          <section id="ghi-nho" className="space-y-4 scroll-mt-24">
            {lesson.sections && lesson.sections.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3">
                <h2 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-primary">
                    <BookmarkCheck className="h-4 w-4" />
                  </span>
                  Tóm tắt ý chính cần nhớ nhanh
                </h2>
                <ul className="space-y-2">
                  {lesson.bullets.map((bullet, idx) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-[13.5px] leading-relaxed text-foreground/85"
                    >
                      <span className="font-mono text-[11px] font-bold text-primary mt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 rounded-2xl border border-primary/20 bg-accent px-5 py-4">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Mẹo làm đề thi trọng tâm
                </p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground/85">
                  {lesson.note}
                </p>
              </div>
            </div>
          </section>

          {/* Chuyển nhanh sang làm bài tập 3 dạng */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="mono-id text-primary">Thực hành ngay sau khi học</p>
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

        <aside className="h-max space-y-4 lg:sticky lg:top-24">
          {lesson.sections && lesson.sections.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <p className="mono-id text-primary flex items-center gap-1.5">
                <ListChecks className="h-3.5 w-3.5" />
                Mục lục bài học
              </p>
              <ul className="space-y-1 text-[12.5px]">
                <li>
                  <a href="#muc-tieu" className="block rounded-md px-2 py-1 text-muted-foreground hover:text-primary">
                    (1) Mục tiêu cần đạt
                  </a>
                </li>
                {lesson.sections.map((sec, idx) => (
                  <li key={sec.title}>
                    <a
                      href={`#sec-${idx + 1}`}
                      className="block rounded-md px-2 py-1 text-muted-foreground hover:text-primary leading-snug"
                    >
                      2.{idx + 1}. {sec.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#vi-du" className="block rounded-md px-2 py-1 text-muted-foreground hover:text-primary">
                    (3) Ví dụ & Bài tập minh họa
                  </a>
                </li>
                {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                  <li>
                    <a href="#bay-de-thi" className="block rounded-md px-2 py-1 text-muted-foreground hover:text-primary">
                      (4) Lỗi hay gặp & Bẫy đề thi
                    </a>
                  </li>
                )}
                <li>
                  <a href="#ghi-nho" className="block rounded-md px-2 py-1 text-muted-foreground hover:text-primary">
                    (5) Ghi nhớ nhanh
                  </a>
                </li>
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
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
          </div>
        </aside>
      </div>
    </div>
  );
}
