"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Database,
  Sparkles,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";
import { ALL_LESSONS, CURRICULUM, TOTAL_LESSONS_COUNT } from "@/lib/curriculum";
import { TOTAL_VIDEOS_COUNT, getVideosByGrade } from "@/lib/videos";
import { updateStudentProfile, useProgress } from "@/lib/progress";
import { QUESTION_TYPES } from "@/lib/questions";

export default function ProgressPage() {
  const {
    lessons,
    videos,
    practice,
    profile,
    doneCount,
    watchedVideosCount,
    averageScore,
  } = useProgress();

  const [nameInput, setNameInput] = useState(profile.studentName);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setNameInput(profile.studentName);
  }, [profile.studentName]);

  const handleSaveName = () => {
    updateStudentProfile({ studentName: nameInput.trim() || "Bạn học sinh" });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  // Personalized recommendations based on focusGrade & unfinished lessons/videos
  const nextLessons = ALL_LESSONS.filter(
    (l) => l.grade === profile.focusGrade && !lessons[l.id]
  ).slice(0, 3);

  const nextVideos = getVideosByGrade(profile.focusGrade)
    .filter((v) => !videos[v.id])
    .slice(0, 2);

  const statCards = [
    {
      icon: BookOpen,
      label: "Bài lý thuyết đã học",
      value: `${doneCount}/${TOTAL_LESSONS_COUNT}`,
    },
    {
      icon: Video,
      label: "Video bài giảng đã xem",
      value: `${watchedVideosCount}/${TOTAL_VIDEOS_COUNT}`,
    },
    {
      icon: Target,
      label: "Lượt ôn luyện",
      value: String(practice.length),
    },
    {
      icon: TrendingUp,
      label: `Điểm TB / Mục tiêu ${profile.targetScore}`,
      value: `${averageScore}%`,
    },
  ];

  return (
    <div className="container-page py-10 lg:py-12 space-y-10">
      {/* Personalized Goal Setup Header */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-bold text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              TIẾN TRÌNH HỌC CÁ NHÂN HÓA
            </span>
            <h1 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Lộ trình học của {profile.studentName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Thiết lập định hướng thi và khối trọng tâm bên dưới để hệ thống đề xuất bài học, video và bộ câu hỏi phù hợp nhất với mục tiêu của bạn.
            </p>
          </div>

          <Link href="/practice" className="btn-primary shrink-0">
            Vào ôn luyện ngay
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Personalization Controls */}
        <div className="grid gap-4 rounded-2xl border border-border bg-background p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1.5">
              Tên của bạn
            </label>
            <div className="flex gap-1.5">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={handleSaveName}
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={handleSaveName}
                className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shrink-0"
              >
                {savedNotice ? "Đã lưu" : "Lưu"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1.5">
              Định hướng thi THPT
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => updateStudentProfile({ track: "CS" })}
                className={`flex items-center justify-center gap-1 rounded-xl border py-2 text-xs font-semibold transition ${
                  profile.track === "CS"
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <Brain className="h-3.5 w-3.5" />
                CS (Thuật toán)
              </button>
              <button
                type="button"
                onClick={() => updateStudentProfile({ track: "ICT" })}
                className={`flex items-center justify-center gap-1 rounded-xl border py-2 text-xs font-semibold transition ${
                  profile.track === "ICT"
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <Database className="h-3.5 w-3.5" />
                ICT (CSDL)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1.5">
              Khối đang ưu tiên
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[10, 11, 12].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => updateStudentProfile({ focusGrade: g })}
                  className={`rounded-xl border py-2 text-xs font-semibold transition ${
                    profile.focusGrade === g
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  Lớp {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1.5">
              Mục tiêu điểm THPT
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[7.5, 8.5, 9.5].map((sc) => (
                <button
                  key={sc}
                  type="button"
                  onClick={() => updateStudentProfile({ targetScore: sc })}
                  className={`rounded-xl border py-2 font-mono text-xs font-semibold transition ${
                    profile.targetScore === sc
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {sc}+
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Summary Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <Icon className="h-4 w-4 text-primary" />
              <p className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-foreground">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Personalized Next-Steps Plan */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="mono-id text-primary">Đề xuất cá nhân hóa · Khối {profile.focusGrade}</p>
            <h2 className="mt-1 font-heading text-xl font-bold text-foreground">
              Gợi ý bước học tiếp theo dành cho bạn
            </h2>
          </div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
            Định hướng {profile.track === "CS" ? "Khoa học máy tính" : "Tin học ứng dụng"}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
            <p className="text-xs font-bold uppercase text-foreground flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" />
              Bài lý thuyết Khối {profile.focusGrade} chưa đọc
            </p>
            {nextLessons.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Tuyệt vời! Bạn đã hoàn thành toàn bộ bài lý thuyết Khối {profile.focusGrade}.
              </p>
            ) : (
              <ul className="space-y-2">
                {nextLessons.map((l) => (
                  <li key={l.id}>
                    <Link
                      href={`/theory/${l.id}`}
                      className="flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-medium text-foreground hover:border-primary/50 hover:text-primary transition"
                    >
                      <span className="truncate pr-2">{l.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
            <p className="text-xs font-bold uppercase text-foreground flex items-center gap-1.5">
              <Video className="h-4 w-4 text-primary" />
              Video bài giảng Khối {profile.focusGrade} nên xem tiếp
            </p>
            {nextVideos.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Bạn đã xem hết video của Khối {profile.focusGrade}!
              </p>
            ) : (
              <ul className="space-y-2">
                {nextVideos.map((v) => (
                  <li key={v.id}>
                    <Link
                      href={`/videos?grade=${v.grade}`}
                      className="flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-medium text-foreground hover:border-primary/50 hover:text-primary transition"
                    >
                      <span className="truncate pr-2">{v.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Grade Breakdown */}
      <div>
        <h2 className="font-heading text-xl font-bold text-foreground">
          Tiến độ theo từng khối lớp
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {CURRICULUM.map((g) => {
            const allGradeLessons = g.chapters.flatMap((c) => c.lessons);
            const gradeDone = allGradeLessons.filter((l) => lessons[l.id]).length;
            const gradePct = allGradeLessons.length
              ? Math.round((gradeDone / allGradeLessons.length) * 100)
              : 0;

            return (
              <section
                key={g.grade}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Lớp {g.grade}
                  </h3>
                  <span className="mono-id text-primary">{gradePct}%</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {gradeDone}/{allGradeLessons.length} bài · {g.chapters.length} chuyên đề
                </p>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${gradePct}%` }}
                  />
                </div>

                <ul className="mt-4 space-y-2.5">
                  {g.chapters.map((ch) => {
                    const chDone = ch.lessons.filter((l) => lessons[l.id]).length;
                    const chPct = Math.round((chDone / ch.lessons.length) * 100);
                    return (
                      <li key={ch.id}>
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="text-foreground/85">{ch.title}</span>
                          <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                            {chPct}%
                          </span>
                        </div>
                        <div className="mt-1 h-1 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-foreground/70"
                            style={{ width: `${chPct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href={`/theory?grade=${g.grade}`}
                  className="mt-4 inline-block text-xs font-semibold text-primary hover:underline"
                >
                  Học tiếp lớp {g.grade} →
                </Link>
              </section>
            );
          })}
        </div>
      </div>

      {/* Practice History */}
      <div>
        <h2 className="font-heading text-xl font-bold text-foreground">
          Lịch sử ôn luyện gần đây
        </h2>
        {practice.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border bg-card px-5 py-10 text-center">
            <p className="text-sm font-medium text-foreground">Chưa có lượt ôn luyện nào</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Hãy làm một bộ câu hỏi để hệ thống ghi nhận kết quả học tập của bạn.
            </p>
            <Link href="/practice" className="btn-primary mt-5">
              Làm bài ngay
            </Link>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {practice.map((item) => {
              const typeLabel =
                QUESTION_TYPES.find((t) => t.key === item.type)?.label || item.type;
              const pct = item.total ? Math.round((item.score / item.total) * 100) : 0;
              return (
                <li
                  key={`${item.setId}-${item.at}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Lớp {item.grade} · {typeLabel} ·{" "}
                      {new Date(item.at).toLocaleString("vi-VN", { timeZone: "Asia/Bangkok" })}
                    </p>
                  </div>
                  <p className="font-mono text-xs font-bold text-primary">
                    {Number(Number(item.score).toFixed(1))}/{item.total} · {pct}%
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
