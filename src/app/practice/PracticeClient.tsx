"use client";

import { useState, useMemo } from "react";
import { CheckCircle2, XCircle, Sparkles, Filter, RotateCcw } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import CodeBlock from "@/components/CodeBlock";

interface PracticeQuestion {
  id: string;
  part: number;
  sectionType: string;
  topicTag: string;
  contentMarkdown: string;
  codeSnippet: string | null;
  optionsJson: string | null;
  correctOption: string | null;
  subQuestionsJson: string | null;
  explanation: string;
  examTitle: string;
}

export default function PracticeClient({ questions }: { questions: PracticeQuestion[] }) {
  const [partFilter, setPartFilter] = useState<"ALL" | "1" | "2">("ALL");
  const [topicFilter, setTopicFilter] = useState<string>("ALL");

  // User answers & checked states
  const [p1Selections, setP1Selections] = useState<Record<string, string>>({});
  const [p2Selections, setP2Selections] = useState<Record<string, Record<string, boolean>>>({});
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const topics = useMemo(() => {
    const set = new Set(questions.map((q) => q.topicTag || "Chung"));
    return ["ALL", ...Array.from(set)];
  }, [questions]);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (partFilter !== "ALL" && String(q.part) !== partFilter) return false;
      if (topicFilter !== "ALL" && (q.topicTag || "Chung") !== topicFilter) return false;
      return true;
    });
  }, [questions, partFilter, topicFilter]);

  const checkedCount = Object.values(checkedMap).filter(Boolean).length;
  const correctCount = useMemo(() => {
    let count = 0;
    for (const q of questions) {
      if (!checkedMap[q.id]) continue;
      if (q.part === 1) {
        if (p1Selections[q.id] === q.correctOption) count++;
      } else {
        try {
          const subs = q.subQuestionsJson ? JSON.parse(q.subQuestionsJson) : [];
          const ans = p2Selections[q.id] || {};
          if (subs.length > 0 && subs.every((s: any) => ans[s.id] === s.isTrue)) count++;
        } catch {}
      }
    }
    return count;
  }, [questions, checkedMap, p1Selections, p2Selections]);

  const handleResetAll = () => {
    setP1Selections({});
    setP2Selections({});
    setCheckedMap({});
  };

  return (
    <div className="space-y-6">
      {/* Filter & Session Stats Bar */}
      <div className="hallmark-surface p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] mr-1">
            <Filter className="w-3.5 h-3.5" />
            Lọc:
          </span>
          <select
            value={partFilter}
            onChange={(e) => setPartFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-semibold text-[var(--text-primary)]"
          >
            <option value="ALL">Tất cả phần ({questions.length} câu)</option>
            <option value="1">Phần I - Trắc nghiệm 4 lựa chọn</option>
            <option value="2">Phần II - Trắc nghiệm Đúng/Sai</option>
          </select>

          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-semibold text-[var(--text-primary)]"
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t === "ALL" ? "Tất cả chuyên đề" : t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <div className="font-mono px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)]">
            Đã kiểm tra:{" "}
            <strong className="text-blue-600 dark:text-blue-400">
              {correctCount}/{checkedCount}
            </strong>{" "}
            câu đúng hoàn toàn
          </div>
          {checkedCount > 0 && (
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Làm lại
            </button>
          )}
        </div>
      </div>

      {/* Questions Feed */}
      <div className="space-y-6">
        {filtered.map((q, idx) => {
          const isChecked = !!checkedMap[q.id];
          let options: any[] = [];
          let subs: any[] = [];
          if (q.part === 1 && q.optionsJson) {
            try {
              options = JSON.parse(q.optionsJson);
            } catch {}
          }
          if (q.part === 2 && q.subQuestionsJson) {
            try {
              subs = JSON.parse(q.subQuestionsJson);
            } catch {}
          }

          return (
            <div key={q.id} className="hallmark-surface p-6 sm:p-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--accent-subtle)] text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
                    Câu {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-muted)]">
                    {q.part === 1 ? "Phần I" : `Phần II (${q.sectionType})`}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)]">
                    {q.topicTag || "Chung"}
                  </span>
                </div>
                <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[260px]">
                  {q.examTitle}
                </span>
              </div>

              <div className="text-sm sm:text-base text-[var(--text-primary)]">
                <MarkdownRenderer content={q.contentMarkdown} />
              </div>

              {q.codeSnippet && <CodeBlock code={q.codeSnippet} />}

              {q.part === 1 && (
                <div className="space-y-2.5">
                  {options.map((opt) => {
                    const selected = p1Selections[q.id] === opt.id;
                    const isRight = opt.id === q.correctOption;

                    let cardCls =
                      "border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]";
                    if (!isChecked && selected) {
                      cardCls =
                        "border-blue-600 bg-[var(--accent-subtle)] text-blue-900 dark:text-blue-200";
                    } else if (isChecked && isRight) {
                      cardCls =
                        "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold";
                    } else if (isChecked && selected && !isRight) {
                      cardCls =
                        "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isChecked}
                        onClick={() =>
                          setP1Selections((prev) => ({ ...prev, [q.id]: opt.id }))
                        }
                        className={`w-full text-left flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-xs sm:text-sm transition-colors ${cardCls}`}
                      >
                        <div>
                          <strong className="mr-2 font-mono">{opt.id}.</strong>
                          {opt.text}
                        </div>
                        {isChecked && isRight && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                        {isChecked && selected && !isRight && (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {q.part === 2 && (
                <div className="border border-[var(--border)] rounded-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-[var(--border)] text-xs sm:text-sm">
                    <thead className="bg-[var(--bg-subtle)]">
                      <tr>
                        <th className="px-4 py-2.5 text-left font-bold w-12">Ý</th>
                        <th className="px-4 py-2.5 text-left font-bold">Mệnh đề</th>
                        <th className="px-4 py-2.5 text-center font-bold w-36">Chọn</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {subs.map((s) => {
                        const val = p2Selections[q.id]?.[s.id];
                        const isMatched = typeof val === "boolean" && val === s.isTrue;
                        return (
                          <tr key={s.id}>
                            <td className="px-4 py-3 font-mono font-bold text-blue-600 dark:text-blue-400 uppercase align-top">
                              {s.id})
                            </td>
                            <td className="px-4 py-3 align-top">
                              <div>{s.text}</div>
                              {isChecked && (
                                <div
                                  className={`mt-1 text-[11px] font-semibold ${
                                    isMatched
                                      ? "text-emerald-600 dark:text-emerald-400"
                                      : "text-rose-600 dark:text-rose-400"
                                  }`}
                                >
                                  Đáp án chuẩn: {s.isTrue ? "Đúng" : "Sai"}
                                  {s.explanation ? ` — ${s.explanation}` : ""}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center align-top">
                              <div className="inline-flex rounded-lg border border-[var(--border)] p-0.5 bg-[var(--bg-subtle)]">
                                <button
                                  type="button"
                                  disabled={isChecked}
                                  onClick={() =>
                                    setP2Selections((prev) => ({
                                      ...prev,
                                      [q.id]: { ...(prev[q.id] || {}), [s.id]: true },
                                    }))
                                  }
                                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                                    val === true
                                      ? "bg-emerald-600 text-white"
                                      : "text-[var(--text-secondary)]"
                                  }`}
                                >
                                  Đúng
                                </button>
                                <button
                                  type="button"
                                  disabled={isChecked}
                                  onClick={() =>
                                    setP2Selections((prev) => ({
                                      ...prev,
                                      [q.id]: { ...(prev[q.id] || {}), [s.id]: false },
                                    }))
                                  }
                                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                                    val === false
                                      ? "bg-rose-600 text-white"
                                      : "text-[var(--text-secondary)]"
                                  }`}
                                >
                                  Sai
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                {!isChecked ? (
                  <button
                    type="button"
                    onClick={() => setCheckedMap((prev) => ({ ...prev, [q.id]: true }))}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCheckedMap((prev) => ({ ...prev, [q.id]: false }))}
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)]"
                  >
                    Thử lại câu này
                  </button>
                )}
              </div>

              {isChecked && q.explanation && (
                <div className="p-4 rounded-xl bg-[var(--accent-subtle)] border border-blue-200 dark:border-blue-900 text-xs sm:text-sm space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Giải thích chi tiết:
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
