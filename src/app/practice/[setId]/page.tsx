"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { CheckCircle, RotateCcw, Trophy } from "lucide-react";
import {
  McqQuestion,
  PracticeQuestionType,
  PracticeSet,
  QUESTION_TYPES,
  ShortQuestion,
  TrueFalseQuestion,
  getPracticeSetById,
  normalizeAnswer,
} from "@/lib/questions";
import { recordPracticeResult } from "@/lib/progress";

const TYPE_DESCRIPTIONS: Record<PracticeQuestionType, string> = {
  mcq: "Chọn một phương án đúng trong A, B, C, D — mỗi câu 1 điểm.",
  truefalse: "Đánh giá độc lập từng nhận định a, b, c — điểm tính theo số nhận định đúng.",
  short: "Trình bày câu trả lời tự luận ngắn gọn vào khung bên dưới, hệ thống tự đối chiếu từ khóa & hiển thị đáp án gợi ý.",
};

function isEssayCorrect(q: ShortQuestion, val?: string): boolean {
  const norm = normalizeAnswer(val || "");
  if (!norm) return false;
  return q.answers.some((a) => {
    const target = normalizeAnswer(a);
    return norm === target || norm.includes(target);
  });
}

function McqCard({
  question,
  index,
  value,
  onChange,
  submitted,
}: {
  question: McqQuestion;
  index: number;
  value?: number;
  onChange: (idx: number) => void;
  submitted: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <p className="mono-id text-primary">Câu {index + 1}</p>
      <p className="mt-2 text-[14.5px] font-medium leading-relaxed text-foreground">
        {question.prompt}
      </p>

      <div className="mt-4 grid gap-2">
        {question.options.map((opt, idx) => {
          const isSelected = value === idx;
          const isAnswer = question.answer === idx;

          let cls = "border-border bg-background hover:border-primary/50";
          if (submitted && isAnswer) {
            cls = "border-emerald-500/60 bg-emerald-500/10";
          } else if (submitted && isSelected && !isAnswer) {
            cls = "border-destructive/60 bg-destructive/10";
          } else if (isSelected) {
            cls = "border-primary bg-accent";
          }

          return (
            <button
              key={opt}
              type="button"
              disabled={submitted}
              onClick={() => onChange(idx)}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-[13.5px] transition ${cls} ${
                submitted ? "cursor-default" : ""
              }`}
            >
              <span className="font-mono text-[11px] font-bold text-muted-foreground mt-0.5">
                {String.fromCharCode(65 + idx)}.
              </span>
              <span className="text-foreground">{opt}</span>
            </button>
          );
        })}
      </div>

      {submitted && (
        <p className="mt-3 rounded-xl bg-secondary px-4 py-3 text-[12.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Giải thích:</strong> {question.explain}
        </p>
      )}
    </div>
  );
}

function TrueFalseCard({
  question,
  index,
  value,
  onChange,
  submitted,
}: {
  question: TrueFalseQuestion;
  index: number;
  value?: Record<number, boolean>;
  onChange: (stmtIdx: number, val: boolean) => void;
  submitted: boolean;
}) {
  const answers = value || {};

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <p className="mono-id text-primary">Câu {index + 1}</p>
      <p className="mt-2 text-[14.5px] font-medium leading-relaxed text-foreground">
        {question.prompt}
      </p>

      <div className="mt-4 space-y-2">
        {question.statements.map((stmt, idx) => {
          const picked = answers[idx];
          const isMatched = picked === stmt.answer;

          return (
            <div
              key={stmt.text}
              className={`flex flex-col gap-3 rounded-xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
                submitted
                  ? isMatched
                    ? "border-emerald-500/60 bg-emerald-500/10"
                    : "border-destructive/60 bg-destructive/10"
                  : "border-border bg-background"
              }`}
            >
              <p className="text-[13.5px] leading-relaxed text-foreground">
                <span className="mr-2 font-mono text-[11px] font-bold text-primary">
                  {String.fromCharCode(97 + idx)})
                </span>
                {stmt.text}
              </p>
              <div className="flex shrink-0 gap-1.5">
                {[true, false].map((optVal) => {
                  const isSelected = picked === optVal;
                  const isCorrectOpt = submitted && stmt.answer === optVal;
                  return (
                    <button
                      key={String(optVal)}
                      type="button"
                      disabled={submitted}
                      onClick={() => onChange(idx, optVal)}
                      className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition ${
                        isCorrectOpt
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : isSelected
                          ? "border-primary bg-accent text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {optVal ? "Đúng" : "Sai"}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {submitted && (
        <p className="mt-3 rounded-xl bg-secondary px-4 py-3 text-[12.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Giải thích:</strong> {question.explain}
        </p>
      )}
    </div>
  );
}

function EssayCard({
  question,
  index,
  value,
  onChange,
  submitted,
  isCorrect,
}: {
  question: ShortQuestion;
  index: number;
  value?: string;
  onChange: (val: string) => void;
  submitted: boolean;
  isCorrect: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <p className="mono-id text-primary">Câu tự luận {index + 1}</p>
      <p className="mt-2 text-[14.5px] font-medium leading-relaxed text-foreground">
        {question.prompt}
      </p>

      <textarea
        rows={3}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={submitted}
        placeholder="Trình bày câu trả lời tự luận của em tại đây..."
        className={`mt-4 w-full resize-none rounded-xl border bg-background px-4 py-3 text-[13.5px] text-foreground outline-none transition placeholder:text-muted-foreground ${
          submitted
            ? isCorrect
              ? "border-emerald-500/60"
              : "border-amber-500/60"
            : "border-border focus:border-primary/60"
        }`}
      />

      {submitted && (
        <div className="mt-3 rounded-xl bg-secondary px-4 py-3 text-[12.5px] leading-relaxed text-muted-foreground space-y-1">
          <p>
            <strong className="text-foreground">Đáp án / Từ khóa chuẩn:</strong>{" "}
            <span className="font-semibold text-primary">{question.answers[0]}</span>
          </p>
          <p>
            <strong className="text-foreground">Hướng dẫn giải chi tiết:</strong>{" "}
            {question.explain}
          </p>
        </div>
      )}
    </div>
  );
}

function PracticeQuizRunner({
  set,
  type,
}: {
  set: PracticeSet;
  type: PracticeQuestionType;
}) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

  const submitted = !!result;
  const list =
    type === "truefalse" ? set.truefalse : type === "short" ? set.short : set.mcq;

  const answeredCount = list.filter((q) => {
    const val = answers[q.id];
    if (type === "truefalse") {
      const tf = q as TrueFalseQuestion;
      return val && Object.keys(val).length === tf.statements.length;
    }
    return val !== undefined && val !== "";
  }).length;

  const handleSubmit = () => {
    let score = 0;
    let total = 0;

    if (type === "mcq") {
      set.mcq.forEach((q) => {
        total += 1;
        if (answers[q.id] === q.answer) score += 1;
      });
    } else if (type === "truefalse") {
      set.truefalse.forEach((q) => {
        const userSub = answers[q.id] || {};
        q.statements.forEach((stmt, idx) => {
          total += 1;
          if (userSub[idx] === stmt.answer) score += 1;
        });
      });
    } else {
      set.short.forEach((q) => {
        total += 1;
        if (isEssayCorrect(q, answers[q.id])) score += 1;
      });
    }

    setResult({ score, total });
    recordPracticeResult({
      setId: set.id,
      type,
      title: set.title,
      grade: set.grade,
      score,
      total,
      at: Date.now(),
    });
  };

  const handleReset = () => {
    setAnswers({});
    setResult(null);
  };

  const percent = result && result.total ? Math.round((result.score / result.total) * 100) : 0;

  return (
    <div>
      {submitted && result && (
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
              <Trophy className="h-5 w-5 text-primary" />
            </span>
            <div>
              <p className="font-heading text-lg font-bold text-foreground">
                {Number(result.score.toFixed(1))}/{result.total} điểm · {percent}%
              </p>
              <p className="text-[12.5px] text-muted-foreground">
                {percent >= 80
                  ? "Rất tốt, em đã nắm chắc chuyên đề này."
                  : percent >= 50
                  ? "Khá ổn, xem lại phần giải thích rồi thử lại nhé."
                  : "Đừng lo, đọc lại phần lý thuyết rồi làm lại một lượt."}
              </p>
            </div>
          </div>

          <button type="button" onClick={handleReset} className="btn-ghost">
            <RotateCcw className="h-4 w-4" />
            Làm lại
          </button>
        </div>
      )}

      <div className="space-y-4">
        {type === "mcq" &&
          set.mcq.map((q, idx) => (
            <McqCard
              key={q.id}
              question={q}
              index={idx}
              value={answers[q.id]}
              submitted={submitted}
              onChange={(optIdx) => setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
            />
          ))}

        {type === "truefalse" &&
          set.truefalse.map((q, idx) => (
            <TrueFalseCard
              key={q.id}
              question={q}
              index={idx}
              value={answers[q.id]}
              submitted={submitted}
              onChange={(stmtIdx, val) =>
                setAnswers((prev) => ({
                  ...prev,
                  [q.id]: { ...(prev[q.id] || {}), [stmtIdx]: val },
                }))
              }
            />
          ))}

        {type === "short" &&
          set.short.map((q, idx) => (
            <EssayCard
              key={q.id}
              question={q}
              index={idx}
              value={answers[q.id]}
              submitted={submitted}
              isCorrect={isEssayCorrect(q, answers[q.id])}
              onChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
            />
          ))}
      </div>

      {!submitted && (
        <div className="sticky bottom-4 mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-primary" />
            Đã trả lời {answeredCount} / {list.length} câu
          </p>
          <button type="button" onClick={handleSubmit} className="btn-primary">
            Nộp bài & xem đáp án
          </button>
        </div>
      )}
    </div>
  );
}

function PracticeSetContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const setId = params?.setId as string;
  const rawType = searchParams.get("type") || "mcq";
  const type: PracticeQuestionType = ["mcq", "truefalse", "short"].includes(rawType)
    ? (rawType as PracticeQuestionType)
    : "mcq";

  const set = getPracticeSetById(setId);

  if (!set) {
    return (
      <div className="container-page py-20">
        <h1 className="font-heading text-2xl font-bold">Không tìm thấy bộ câu hỏi này</h1>
        <Link
          href="/practice"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          ← Về danh sách luyện tập
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-12">
      <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
        <Link href={`/practice?grade=${set.grade}`} className="hover:text-primary">
          Ôn luyện
        </Link>
        <span>·</span>
        <span>Lớp {set.grade}</span>
      </div>

      <h1 className="mt-3 max-w-2xl font-heading text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
        {set.title}
      </h1>

      <div className="mt-5 inline-flex flex-wrap gap-1.5 rounded-xl border border-border bg-card p-1.5">
        {QUESTION_TYPES.map((t) => (
          <Link
            key={t.key}
            href={`/practice/${set.id}?type=${t.key}`}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              type === t.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <p className="mt-4 text-[13px] text-muted-foreground">{TYPE_DESCRIPTIONS[type]}</p>

      <div className="mt-6 max-w-3xl">
        <PracticeQuizRunner key={`${set.id}-${type}`} set={set} type={type} />
      </div>
    </div>
  );
}

export default function PracticeSetPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-14 text-sm text-muted-foreground">
          Đang tải bộ câu hỏi...
        </div>
      }
    >
      <PracticeSetContent />
    </Suspense>
  );
}
