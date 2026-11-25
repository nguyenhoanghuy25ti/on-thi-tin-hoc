"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Check, CirclePlay, Clock, Lightbulb } from "lucide-react";
import {
  getChapterByLessonId,
  getLessonById,
  getNextLesson,
} from "@/lib/curriculum";
import { toggleLessonDone, useProgress } from "@/lib/progress";

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

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
        <Link href={`/theory?grade=${lesson.grade}`} className="hover:text-primary">
          Lớp {lesson.grade}
        </Link>
        <span>·</span>
        <span>{chapter ? chapter.title : "Chuyên đề"}</span>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article>
          <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-[2.4rem]">
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
                  ? "border-success/40 bg-success/10 text-success"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              <Check className="h-4 w-4" />
              {done ? "Đã đánh dấu đã học" : "Đánh dấu đã học"}
            </button>

            <Link
              href={`/videos?grade=${lesson.grade}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-[12.5px] font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
            >
              <CirclePlay className="h-4 w-4" />
              Video bài giảng
            </Link>
          </div>

          <h2 className="mt-10 font-heading text-lg font-bold text-foreground">
            Ý chính cần nhớ
          </h2>

          <ol className="mt-4 space-y-3">
            {lesson.bullets.map((bullet, idx) => (
              <li
                key={bullet}
                className="flex gap-4 rounded-2xl border border-border bg-card px-5 py-4"
              >
                <span className="font-mono text-[11px] font-semibold text-primary">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-[14px] leading-relaxed text-foreground/85">{bullet}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex gap-3 rounded-2xl border border-primary/20 bg-accent px-5 py-4">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                Lưu ý khi làm đề
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground/80">
                {lesson.note}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/practice/${lesson.id}?type=mcq`}
              className="btn-primary"
            >
              Luyện tập bài này
              <ArrowRight className="h-4 w-4" />
            </Link>

            {nextLesson && (
              <Link href={`/theory/${nextLesson.id}`} className="btn-ghost">
                Bài tiếp: {nextLesson.title}
              </Link>
            )}
          </div>
        </article>

        <aside className="h-max rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
          <p className="mono-id">Trong chuyên đề</p>
          <ul className="mt-3 space-y-1">
            {chapter?.lessons.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/theory/${item.id}`}
                  className={`block rounded-lg px-3 py-2 text-[12.5px] leading-snug transition ${
                    item.id === lesson.id
                      ? "bg-secondary font-semibold text-foreground"
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
