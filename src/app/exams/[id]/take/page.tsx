"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  Clock,
  Flag,
  Send,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Orientation } from "@/lib/types";

interface TakeQuestion {
  id: string;
  part: number;
  sectionType: string;
  contentMarkdown: string;
  codeSnippet?: string | null;
  optionsJson?: string | null;
  subQuestionsJson?: string | null;
  orderIndex: number;
}

function TakeExamContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const examId = params?.id as string;
  const orientation = (searchParams.get("orientation") as Orientation) || "ICT";
  const draftKey = `exam-draft-${examId}-${orientation}`;

  const [exam, setExam] = useState<any>(null);
  const [questions, setQuestions] = useState<TakeQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  // Exam taking state
  const [part1Answers, setPart1Answers] = useState<Record<string, string>>({});
  const [part2Answers, setPart2Answers] = useState<Record<string, Record<string, boolean>>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState<number>(50 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Latest state refs so auto-submit never uses stale closures
  const part1Ref = useRef(part1Answers);
  const part2Ref = useRef(part2Answers);
  const timeLeftRef = useRef(timeLeft);
  const examRef = useRef(exam);
  const isSubmittingRef = useRef(isSubmitting);

  useEffect(() => {
    part1Ref.current = part1Answers;
  }, [part1Answers]);

  useEffect(() => {
    part2Ref.current = part2Answers;
  }, [part2Answers]);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    examRef.current = exam;
  }, [exam]);

  useEffect(() => {
    isSubmittingRef.current = isSubmitting;
  }, [isSubmitting]);

  // Load exam data & restore draft if present
  useEffect(() => {
    fetch(`/api/exams/${examId}?mode=take`)
      .then((res) => res.json())
      .then((data) => {
        if (data.exam) {
          setExam(data.exam);
          const rawQuestions: TakeQuestion[] = data.exam.questions || [];

          const filtered = rawQuestions.filter((q) => {
            if (q.part === 1) return true;
            if (q.part === 2) {
              return q.sectionType === "COMMON" || q.sectionType === orientation;
            }
            return false;
          });

          filtered.sort((a, b) => a.orderIndex - b.orderIndex);
          setQuestions(filtered);
          setTimeLeft(data.exam.durationMinutes * 60);

          try {
            const savedDraft = localStorage.getItem(draftKey);
            if (savedDraft) {
              const parsed = JSON.parse(savedDraft);
              if (parsed.part1) setPart1Answers(parsed.part1);
              if (parsed.part2) setPart2Answers(parsed.part2);
              if (parsed.flagged) setFlaggedQuestions(parsed.flagged);
            }
          } catch {
            // Ignore malformed draft
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [examId, orientation, draftKey]);

  // Save draft to localStorage when answers change
  useEffect(() => {
    if (loading || questions.length === 0) return;
    try {
      localStorage.setItem(
        draftKey,
        JSON.stringify({
          part1: part1Answers,
          part2: part2Answers,
          flagged: flaggedQuestions,
        })
      );
    } catch {
      // Ignore quota errors
    }
  }, [part1Answers, part2Answers, flaggedQuestions, draftKey, loading, questions.length]);

  const submitExam = useCallback(async () => {
    if (isSubmittingRef.current) return;
    setIsSubmitting(true);
    isSubmittingRef.current = true;

    try {
      const currentExam = examRef.current;
      const totalSeconds = (currentExam?.durationMinutes || 50) * 60;
      const timeSpentSeconds = Math.max(0, totalSeconds - timeLeftRef.current);

      const res = await fetch(`/api/exams/${examId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedOrientation: orientation,
          answers: {
            part1: part1Ref.current,
            part2: part2Ref.current,
          },
          timeSpentSeconds,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Có lỗi xảy ra khi nộp bài.");
        setIsSubmitting(false);
        isSubmittingRef.current = false;
        return;
      }

      try {
        localStorage.removeItem(draftKey);
      } catch {}

      router.push(`/exams/${examId}/result/${data.attemptId}`);
    } catch {
      alert("Lỗi kết nối khi nộp bài. Vui lòng thử lại!");
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  }, [examId, orientation, router, draftKey]);

  // Timer countdown effect
  useEffect(() => {
    if (loading || isSubmitting) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, isSubmitting, submitExam]);

  const handleSelectPart1 = (qId: string, optionId: string) => {
    setPart1Answers((prev) => ({
      ...prev,
      [qId]: optionId,
    }));
  };

  const handleSelectPart2 = (qId: string, subId: string, value: boolean) => {
    setPart2Answers((prev) => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || {}),
        [subId]: value,
      },
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeCritical = timeLeft < 300;

  const isQuestionAnswered = (q: TakeQuestion) => {
    if (q.part === 1) {
      return !!part1Answers[q.id];
    }
    if (q.part === 2) {
      const subAns = part2Answers[q.id] || {};
      let subs = [];
      try {
        subs = q.subQuestionsJson ? JSON.parse(q.subQuestionsJson) : [];
      } catch {
        subs = [];
      }
      return subs.length > 0 && subs.every((s: any) => typeof subAns[s.id] === "boolean");
    }
    return false;
  };

  const part1List = questions.filter((q) => q.part === 1);
  const part2List = questions.filter((q) => q.part === 2);
  const totalQuestions = questions.length;
  const answeredCount = questions.filter(isQuestionAnswered).length;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
          Đang khởi tạo phòng thi...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pb-24">
      {/* Sticky Exam Top Bar */}
      <header className="sticky top-16 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/exams")}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Rời phòng thi"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1">
                {exam?.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Định hướng:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    orientation === "CS"
                      ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                      : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  {orientation === "CS" ? "Khoa học máy tính (CS)" : "Tin học ứng dụng (ICT)"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-black transition-all ${
                isTimeCritical
                  ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 animate-pulse border border-rose-300 dark:border-rose-700"
                  : "bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Nộp bài</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Exam Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            {part1List.length > 0 && (
              <>
                <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                      Phần I ({(part1List.length * 0.25).toFixed(1)} điểm)
                    </span>
                    <h2 className="text-xl font-black mt-0.5">
                      Câu hỏi trắc nghiệm nhiều lựa chọn ({part1List.length} câu)
                    </h2>
                    <p className="text-xs text-blue-100 mt-1">
                      Mỗi câu hỏi thí sinh chọn đúng MỘT phương án trong số A, B, C hoặc D. Mỗi câu đúng được 0.25 điểm.
                    </p>
                  </div>
                </div>

                {part1List.map((q, idx) => {
                  let options: any[] = [];
                  try {
                    options = q.optionsJson ? JSON.parse(q.optionsJson) : [];
                  } catch {
                    options = [];
                  }

                  const isFlagged = flaggedQuestions[q.id];
                  const selectedOption = part1Answers[q.id];

                  return (
                    <div
                      key={q.id}
                      id={`question-${idx + 1}`}
                      className={`bg-white dark:bg-slate-900 rounded-2xl border p-6 sm:p-8 shadow-sm transition-all scroll-mt-32 ${
                        isFlagged
                          ? "border-amber-400 ring-2 ring-amber-400/20"
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold uppercase text-slate-400">
                            Câu {idx + 1} / {totalQuestions}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleFlag(q.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            isFlagged
                              ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                          }`}
                        >
                          <Flag className="w-3.5 h-3.5" />
                          {isFlagged ? "Đang đánh dấu" : "Đánh dấu xem lại"}
                        </button>
                      </div>

                      <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed mb-4">
                        <MarkdownRenderer content={q.contentMarkdown} />
                      </div>

                      {q.codeSnippet && (
                        <div className="mb-6">
                          <CodeBlock code={q.codeSnippet} />
                        </div>
                      )}

                      <div className="space-y-3 pt-2">
                        {options.map((opt) => {
                          const isSelected = selectedOption === opt.id;
                          return (
                            <label
                              key={opt.id}
                              onClick={() => handleSelectPart1(q.id, opt.id)}
                              className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                                isSelected
                                  ? "border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20"
                                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${q.id}`}
                                checked={isSelected}
                                onChange={() => handleSelectPart1(q.id, opt.id)}
                                className="mt-1 text-blue-600 focus:ring-blue-500"
                              />
                              <div className="flex-1 text-xs sm:text-sm">
                                <strong className="mr-1.5 text-blue-700 dark:text-blue-400">{opt.id}.</strong>
                                {opt.text}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {part2List.length > 0 && (
              <>
                <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-5 rounded-2xl shadow-md mt-12 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                      Phần II ({part2List.length}.0 điểm)
                    </span>
                    <h2 className="text-xl font-black mt-0.5">
                      Câu hỏi trắc nghiệm Đúng/Sai ({part2List.length} câu - {part2List.length * 4} ý)
                    </h2>
                    <p className="text-xs text-indigo-100 mt-1">
                      Mỗi câu có 4 ý a, b, c, d. Thí sinh chọn Đúng hoặc Sai cho từng ý. Điểm lũy tiến: 1 ý đúng (0.1đ), 2 ý đúng (0.25đ), 3 ý đúng (0.5đ), 4 ý đúng (1.0đ).
                    </p>
                  </div>
                </div>

                {part2List.map((q, p2Idx) => {
                  const questionNumber = part1List.length + p2Idx + 1;
                  let subItems: any[] = [];
                  try {
                    subItems = q.subQuestionsJson ? JSON.parse(q.subQuestionsJson) : [];
                  } catch {
                    subItems = [];
                  }

                  const isFlagged = flaggedQuestions[q.id];
                  const currentAnswers = part2Answers[q.id] || {};

                  return (
                    <div
                      key={q.id}
                      id={`question-${questionNumber}`}
                      className={`bg-white dark:bg-slate-900 rounded-2xl border p-6 sm:p-8 shadow-sm transition-all scroll-mt-32 ${
                        isFlagged
                          ? "border-amber-400 ring-2 ring-amber-400/20"
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-sm flex items-center justify-center shrink-0">
                            {questionNumber}
                          </span>
                          <div>
                            <span className="text-xs font-bold uppercase text-slate-400">
                              Câu {questionNumber} / {totalQuestions}
                            </span>
                            <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {q.sectionType === "COMMON" ? "Phần chung" : `Nhánh ${q.sectionType}`}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleFlag(q.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            isFlagged
                              ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                          }`}
                        >
                          <Flag className="w-3.5 h-3.5" />
                          {isFlagged ? "Đang đánh dấu" : "Đánh dấu xem lại"}
                        </button>
                      </div>

                      <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed mb-4">
                        <MarkdownRenderer content={q.contentMarkdown} />
                      </div>

                      {q.codeSnippet && (
                        <div className="mb-6">
                          <CodeBlock code={q.codeSnippet} />
                        </div>
                      )}

                      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mt-4">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-xs sm:text-sm">
                          <thead className="bg-slate-50 dark:bg-slate-800">
                            <tr>
                              <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200 w-16">
                                Ý
                              </th>
                              <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                                Mệnh đề phát biểu
                              </th>
                              <th className="px-4 py-3 text-center font-bold text-slate-700 dark:text-slate-200 w-44">
                                Lựa chọn của bạn
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                            {subItems.map((item) => {
                              const userChoice = currentAnswers[item.id];
                              return (
                                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                                  <td className="px-4 py-3.5 font-bold text-blue-700 dark:text-blue-400 uppercase align-top">
                                    {item.id})
                                  </td>
                                  <td className="px-4 py-3.5 text-slate-800 dark:text-slate-200 leading-relaxed align-top">
                                    {item.text}
                                  </td>
                                  <td className="px-4 py-3.5 text-center align-top">
                                    <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800">
                                      <button
                                        type="button"
                                        onClick={() => handleSelectPart2(q.id, item.id, true)}
                                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                                          userChoice === true
                                            ? "bg-emerald-600 text-white shadow-sm"
                                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                                        }`}
                                      >
                                        Đúng
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleSelectPart2(q.id, item.id, false)}
                                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                                          userChoice === false
                                            ? "bg-rose-600 text-white shadow-sm"
                                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
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
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Right Column: Question Palette */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Bảng điều hướng</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {answeredCount} / {totalQuestions} câu
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-semibold text-center">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-blue-600" />
                  Đã làm
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-slate-200 dark:bg-slate-700" />
                  Chưa làm
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                  Đánh dấu
                </div>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-4 gap-2 pt-2">
                {questions.map((q, idx) => {
                  const num = idx + 1;
                  const isDone = isQuestionAnswered(q);
                  const isFlagged = flaggedQuestions[q.id];

                  return (
                    <a
                      key={q.id}
                      href={`#question-${num}`}
                      className={`h-9 rounded-lg font-mono font-bold text-xs flex items-center justify-center transition-all relative ${
                        isFlagged
                          ? "bg-amber-100 dark:bg-amber-950 border border-amber-400 text-amber-800 dark:text-amber-300"
                          : isDone
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {num}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                      )}
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Nộp bài thi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Xác nhận nộp bài thi?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Bạn còn{" "}
                <strong className="text-slate-800 dark:text-slate-200">
                  {Math.floor(timeLeft / 60)} phút {timeLeft % 60} giây
                </strong>{" "}
                thời gian làm bài.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">Số câu đã trả lời:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {answeredCount} / {totalQuestions} câu
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">Số câu chưa hoàn thành:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">
                  {totalQuestions - answeredCount} câu
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Tiếp tục làm bài
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={submitExam}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Đang nộp..." : "Xác nhận nộp bài"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TakeExamPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
            Đang khởi tạo phòng thi...
          </p>
        </div>
      }
    >
      <TakeExamContent />
    </Suspense>
  );
}
