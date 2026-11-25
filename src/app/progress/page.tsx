"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  Database,
  FileCheck2,
  Sparkles,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";
import { ALL_LESSONS, CURRICULUM, TOTAL_LESSONS_COUNT } from "@/lib/curriculum";
import { TOTAL_VIDEOS_COUNT, getVideosByGrade } from "@/lib/videos";
import { updateStudentProfile, useProgress } from "@/lib/progress";
import {
  LESSON_PRACTICE_SETS,
  PracticeQuestionType,
  QUESTION_TYPES,
  getPracticeSetById,
} from "@/lib/questions";

const FORMAT_COLORS: Record<
  PracticeQuestionType,
  { bar: string; badge: string; label: string }
> = {
  mcq: {
    bar: "bg-teal-600",
    badge: "bg-teal-500/15 text-teal-700 dark:text-teal-300",
    label: "Trắc nghiệm nhiều lựa chọn",
  },
  truefalse: {
    bar: "bg-emerald-600",
    badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    label: "Trắc nghiệm Đúng / Sai",
  },
  short: {
    bar: "bg-amber-500",
    badge: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    label: "Câu hỏi Tự luận",
  },
};

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

  // Unique practiced lesson sets
  const practicedSetIds = useMemo(() => {
    const validIds = new Set(LESSON_PRACTICE_SETS.map((s) => s.id));
    return new Set(practice.map((p) => p.setId).filter((id) => validIds.has(id)));
  }, [practice]);

  // Overall program completion % (Theory 40% + Videos 30% + Practice coverage 30%)
  const theoryPct = TOTAL_LESSONS_COUNT
    ? Math.round((doneCount / TOTAL_LESSONS_COUNT) * 100)
    : 0;
  const videoPct = TOTAL_VIDEOS_COUNT
    ? Math.round((watchedVideosCount / TOTAL_VIDEOS_COUNT) * 100)
    : 0;
  const practiceCoveragePct = LESSON_PRACTICE_SETS.length
    ? Math.round((practicedSetIds.size / LESSON_PRACTICE_SETS.length) * 100)
    : 0;
  const overallProgramPct = Math.round(
    theoryPct * 0.4 + videoPct * 0.3 + practiceCoveragePct * 0.3
  );

  // Breakdown by the 3 question types: mcq, truefalse, short
  const typeStats = useMemo(() => {
    return QUESTION_TYPES.map((qt) => {
      const records = practice.filter((p) => p.type === qt.key);
      const uniqueSets = new Set(records.map((r) => r.setId)).size;
      const coveragePct = LESSON_PRACTICE_SETS.length
        ? Math.round((uniqueSets / LESSON_PRACTICE_SETS.length) * 100)
        : 0;
      const avgAccuracy = records.length
        ? Math.round(
            records.reduce(
              (acc, r) => acc + (r.total ? (r.score / r.total) * 100 : 0),
              0
            ) / records.length
          )
        : 0;
      return {
        key: qt.key,
        label: FORMAT_COLORS[qt.key].label,
        attempts: records.length,
        uniqueSets,
        totalSets: LESSON_PRACTICE_SETS.length,
        coveragePct,
        avgAccuracy,
      };
    });
  }, [practice]);

  // Completed lessons list
  const completedLessonsList = useMemo(() => {
    return ALL_LESSONS.filter((l) => !!lessons[l.id]);
  }, [lessons]);

  // Low-scoring practiced lessons (< 70% based on latest/best attempt per set+type)
  const lowScoreSuggestions = useMemo(() => {
    const bestBySetType = new Map<
      string,
      { setId: string; type: string; title: string; grade: number; pct: number; score: number; total: number }
    >();
    for (const item of practice) {
      const pct = item.total ? Math.round((item.score / item.total) * 100) : 0;
      const key = `${item.setId}:${item.type}`;
      const existing = bestBySetType.get(key);
      if (!existing || pct > existing.pct) {
        bestBySetType.set(key, {
          setId: item.setId,
          type: item.type,
          title: item.title,
          grade: item.grade,
          pct,
          score: item.score,
          total: item.total,
        });
      }
    }
    return Array.from(bestBySetType.values())
      .filter((x) => x.pct < 70)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 4);
  }, [practice]);

  // Unfinished lessons (prioritizing focusGrade & track, then falling back to any unfinished)
  const unfinishedLessons = useMemo(() => {
    const focusMatches = ALL_LESSONS.filter(
      (l) => l.grade === profile.focusGrade && !lessons[l.id]
    );
    const prioritized = [...focusMatches].sort((a, b) => {
      const aMatch = a.orientation === profile.track ? 0 : 1;
      const bMatch = b.orientation === profile.track ? 0 : 1;
      return aMatch - bMatch;
    });
    if (prioritized.length >= 4) return prioritized.slice(0, 4);
    const others = ALL_LESSONS.filter(
      (l) => l.grade !== profile.focusGrade && !lessons[l.id]
    );
    return [...prioritized, ...others].slice(0, 4);
  }, [lessons, profile.focusGrade, profile.track]);

  const nextVideos = getVideosByGrade(profile.focusGrade)
    .filter((v) => !videos[v.id])
    .slice(0, 2);

  const statCards = [
    {
      icon: BookOpen,
      label: "Bài lý thuyết đã học",
      value: `${doneCount}/${TOTAL_LESSONS_COUNT}`,
      sub: `${theoryPct}% SGK`,
    },
    {
      icon: Video,
      label: "Video bài giảng đã xem",
      value: `${watchedVideosCount}/${TOTAL_VIDEOS_COUNT}`,
      sub: `${videoPct}% video`,
    },
    {
      icon: FileCheck2,
      label: "Bài đã làm câu hỏi",
      value: `${practicedSetIds.size}/${LESSON_PRACTICE_SETS.length}`,
      sub: `${practice.length} lượt nộp`,
    },
    {
      icon: TrendingUp,
      label: `Điểm TB / Mục tiêu ${profile.targetScore}`,
      value: `${averageScore}%`,
      sub: averageScore >= 80 ? "Đạt chuẩn tốt" : "Cần luyện thêm",
    },
  ];

  return (
    <div className="container-page py-10 lg:py-12 space-y-10">
      {/* Personalized Goal Setup Header */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-bold text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              TIẾN TRÌNH HỌC CÁ NHÂN HÓA
            </span>
            <h1 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Lộ trình học của {profile.studentName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Theo dõi mức độ hoàn thành chương trình, độ chính xác trên cả 3 dạng câu hỏi và nhận gợi ý bài cần ôn tập cá nhân hóa.
            </p>
          </div>

          {/* Overall Program Completion Card */}
          <div className="w-full lg:w-80 rounded-2xl border border-primary/25 bg-accent/60 p-5 space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Hoàn thành chương trình
              </span>
              <span className="font-heading text-2xl font-extrabold text-primary">
                {overallProgramPct}%
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-background/80 border border-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 transition-all duration-500"
                style={{ width: `${overallProgramPct}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Tổng hợp từ lý thuyết SGK ({theoryPct}%), video ({videoPct}%) và bài luyện ({practiceCoveragePct}%).
            </p>
          </div>
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
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-primary" />
                <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                  {card.sub}
                </span>
              </div>
              <p className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-foreground">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Progress Breakdown by 3 Question Types */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="mono-id text-primary">Phân tích theo 3 dạng thức đề thi</p>
            <h2 className="mt-1 font-heading text-xl font-bold text-foreground">
              Tiến độ & Độ chính xác theo 3 dạng câu hỏi
            </h2>
          </div>
          <Link href="/practice" className="text-xs font-bold text-primary hover:underline">
            Vào kho câu hỏi ôn luyện →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {typeStats.map((stat) => {
            const style = FORMAT_COLORS[stat.key];
            return (
              <div
                key={stat.key}
                className="rounded-2xl border border-border bg-background p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${style.badge}`}>
                      {stat.attempts} lượt làm
                    </span>
                    <span className="font-mono text-xs font-bold text-foreground">
                      TB: {stat.avgAccuracy}%
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-foreground">
                    {stat.label}
                  </h3>

                  {/* Accuracy bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Tỉ lệ trả lời đúng trung bình</span>
                      <span className="font-mono font-bold text-foreground">{stat.avgAccuracy}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
                        style={{ width: `${stat.avgAccuracy}%` }}
                      />
                    </div>
                  </div>

                  {/* Coverage bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Độ phủ bài học</span>
                      <span className="font-mono font-bold text-foreground">
                        {stat.uniqueSets}/{stat.totalSets} bài ({stat.coveragePct}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-foreground/60 transition-all duration-500"
                        style={{ width: `${stat.coveragePct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Link
                  href={`/practice?grade=${profile.focusGrade}&type=${stat.key}`}
                  className="inline-flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition"
                >
                  <span>Luyện dạng này</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gợi ý lộ trình ôn tập cá nhân */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="mono-id text-primary">Đề xuất thông minh · Khối {profile.focusGrade}</p>
            <h2 className="mt-1 font-heading text-xl font-bold text-foreground">
              Gợi ý lộ trình ôn tập cá nhân
            </h2>
          </div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
            Định hướng {profile.track === "CS" ? "Khoa học máy tính (CS)" : "Tin học ứng dụng (ICT)"}
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Column 1: Low-scoring sets */}
          <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
            <p className="text-xs font-bold uppercase text-foreground flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Bài có điểm thấp cần ôn lại (&lt; 70%)
            </p>
            {lowScoreSuggestions.length === 0 ? (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {practice.length === 0
                  ? "Chưa có dữ liệu điểm thấp. Hãy làm thử một bài ôn luyện để hệ thống phân tích điểm yếu!"
                  : "Tuyệt vời! Hiện chưa có bài luyện tập nào dưới 70%."}
              </p>
            ) : (
              <ul className="space-y-2">
                {lowScoreSuggestions.map((item) => {
                  const typeLabel =
                    QUESTION_TYPES.find((t) => t.key === item.type)?.label || item.type;
                  const setInfo = getPracticeSetById(item.setId);
                  return (
                    <li key={`${item.setId}-${item.type}`}>
                      <Link
                        href={`/practice/${item.setId}?type=${item.type}`}
                        className="flex items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-card px-3.5 py-2.5 text-xs hover:border-primary/50 transition"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">
                            {setInfo?.title || item.title}
                          </p>
                          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-mono">
                            {typeLabel} · {item.pct}% ({item.score}/{item.total})
                          </p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Column 2: Unfinished Theory Lessons */}
          <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
            <p className="text-xs font-bold uppercase text-foreground flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" />
              Bài học chưa hoàn thành
            </p>
            {unfinishedLessons.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Bạn đã hoàn thành toàn bộ 33 bài lý thuyết!
              </p>
            ) : (
              <ul className="space-y-2">
                {unfinishedLessons.map((l) => (
                  <li key={l.id}>
                    <Link
                      href={`/theory/${l.id}`}
                      className="flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-medium text-foreground hover:border-primary/50 hover:text-primary transition"
                    >
                      <span className="truncate pr-2">
                        Lớp {l.grade} · {l.title}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Column 3: Next Videos */}
          <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
            <p className="text-xs font-bold uppercase text-foreground flex items-center gap-1.5">
              <Video className="h-4 w-4 text-primary" />
              Video Khối {profile.focusGrade} nên xem tiếp
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
      </section>

      {/* Danh sách các bài đã hoàn thành */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="mono-id text-emerald-600 dark:text-emerald-400">
              Thành tích tích lũy
            </p>
            <h2 className="mt-1 font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-500" />
              Danh sách các bài đã hoàn thành ({completedLessonsList.length}/{TOTAL_LESSONS_COUNT})
            </h2>
          </div>
          <Link href="/theory" className="text-xs font-bold text-primary hover:underline">
            Xem tất cả bài học →
          </Link>
        </div>

        {completedLessonsList.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-background px-5 py-8 text-center space-y-2">
            <p className="text-sm font-medium text-foreground">
              Chưa có bài học nào được đánh dấu hoàn thành
            </p>
            <p className="text-xs text-muted-foreground">
              Khi học xong phần tóm tắt SGK ở mục Kiến thức SGK, hãy nhấn &ldquo;Đánh dấu đã học&rdquo; để lưu tại đây.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {completedLessonsList.map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span className="font-mono text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400">
                      LỚP {l.grade} · {l.topicCode}
                    </span>
                  </div>
                  <Link
                    href={`/theory/${l.id}`}
                    className="mt-1 block truncate text-xs font-bold text-foreground hover:text-primary"
                  >
                    {l.title}
                  </Link>
                </div>
                <Link
                  href={`/practice/${l.id}?type=mcq`}
                  className="shrink-0 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px] font-semibold text-foreground hover:border-primary/50 hover:text-primary transition"
                >
                  Ôn tập
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

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
                  {gradeDone}/{allGradeLessons.length} bài · {g.chapters.length} chủ đề
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
                          <span className="text-foreground/85 truncate">{ch.title}</span>
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
            <Target className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-foreground">Chưa có lượt ôn luyện nào</p>
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
