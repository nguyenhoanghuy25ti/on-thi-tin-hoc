"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { QuestionScoreResult } from "@/lib/types";

export default function ExamResultPage() {
  const params = useParams();

  const examId = params?.id as string;
  const attemptId = params?.attemptId as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterPart, setFilterPart] = useState<"ALL" | "PART1" | "PART2">("ALL");

  useEffect(() => {
    fetch(`/api/attempts/${attemptId}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.attempt) {
          setData(resData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [attemptId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
          Đang tổng hợp kết quả chấm điểm...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Không tìm thấy kết quả làm bài
        </h2>
        <Link href="/exams" className="text-blue-600 font-bold hover:underline">
          Quay lại danh sách đề thi
        </Link>
      </div>
    );
  }

  const { attempt, breakdown } = data;
  const minutes = Math.floor(attempt.timeSpentSeconds / 60);
  const seconds = attempt.timeSpentSeconds % 60;

  const getScoreBadgeColor = (score: number) => {
    if (score >= 8.0)
      return "text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800";
    if (score >= 6.5)
      return "text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800";
    if (score >= 5.0)
      return "text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800";
    return "text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800";
  };

  const questionResults: QuestionScoreResult[] = breakdown.questionResults || [];
  const part1Count = questionResults.filter((q) => q.part === 1).length;
  const part2Count = questionResults.filter((q) => q.part === 2).length;

  const indexedResults = questionResults.map((q, index) => ({
    ...q,
    displayNumber: index + 1,
  }));

  const filteredQuestions = indexedResults.filter((q) => {
    if (filterPart === "PART1") return q.part === 1;
    if (filterPart === "PART2") return q.part === 2;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner / Score Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-lg p-6 sm:p-10 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                Định hướng:{" "}
                {attempt.selectedOrientation === "CS"
                  ? "Khoa học máy tính (CS)"
                  : "Tin học ứng dụng (ICT)"}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(attempt.createdAt).toLocaleString("vi-VN")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
              {attempt.examTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Thí sinh: <strong className="text-slate-800 dark:text-slate-200">{attempt.studentName}</strong>
            </p>
          </div>

          <div
            className={`p-6 rounded-3xl border-2 text-center min-w-[180px] ${getScoreBadgeColor(
              attempt.totalScore
            )}`}
          >
            <div className="text-xs font-bold uppercase tracking-wider">Tổng Điểm Thi</div>
            <div className="text-5xl font-black tracking-tight my-1">
              {attempt.totalScore.toFixed(2)}
            </div>
            <div className="text-xs font-bold opacity-80">Thang điểm 10.0</div>
          </div>
        </div>

        {/* 3 Detail Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
              Điểm Phần I (Trắc nghiệm)
            </div>
            <div className="text-2xl font-black text-blue-900 dark:text-blue-200">
              {attempt.part1Score.toFixed(2)}{" "}
              <span className="text-xs text-blue-500 font-semibold">
                / {(part1Count * 0.25).toFixed(1)}
              </span>
            </div>
            <div className="text-[11px] text-blue-700 dark:text-blue-300 mt-1">
              Đúng {breakdown.part1CorrectCount} / {breakdown.part1TotalCount} câu (mỗi câu 0.25đ)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              Điểm Phần II (Đúng/Sai)
            </div>
            <div className="text-2xl font-black text-indigo-900 dark:text-indigo-200">
              {attempt.part2Score.toFixed(2)}{" "}
              <span className="text-xs text-indigo-500 font-semibold">/ {part2Count}.0</span>
            </div>
            <div className="text-[11px] text-indigo-700 dark:text-indigo-300 mt-1">
              Chấm lũy tiến ({part2Count} câu - {part2Count * 4} ý)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              Thời gian làm bài
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
              <Clock className="w-5 h-5 text-slate-400" />
              <span>
                {minutes}p {seconds}s
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Thời gian tối đa: {attempt.durationMinutes} phút
            </div>
          </div>
        </div>

        {/* Actions button bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link
            href={`/exams/${examId}/take?orientation=${attempt.selectedOrientation}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Làm lại đề này
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/leaderboard"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              Xem bảng xếp hạng
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
            >
              Xem lịch sử ôn tập
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Chi Tiết Lời Giải & Đáp Án Từng Câu Hỏi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Đối chiếu đáp án của bạn với đáp án chuẩn và đọc kỹ phần giải thích chi tiết.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setFilterPart("ALL")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterPart === "ALL"
                  ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Tất cả ({questionResults.length} câu)
            </button>
            <button
              onClick={() => setFilterPart("PART1")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterPart === "PART1"
                  ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Phần I ({part1Count} câu)
            </button>
            <button
              onClick={() => setFilterPart("PART2")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterPart === "PART2"
                  ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Phần II ({part2Count} câu)
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {filteredQuestions.map((res) => {
            const isPart1 = res.part === 1;
            const isFullScore = res.earnedScore === res.maxScore;
            const isPartial = res.earnedScore > 0 && res.earnedScore < res.maxScore;

            return (
              <div
                key={res.questionId}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-black text-sm flex items-center justify-center">
                      {res.displayNumber}
                    </span>
                    <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                      {isPart1
                        ? "Phần I (Trắc nghiệm)"
                        : `Phần II (Đúng/Sai - ${res.sectionType === "COMMON" ? "Phần chung" : res.sectionType})`}
                    </span>
                    {res.topicTag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {res.topicTag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                      Đạt:{" "}
                      <strong
                        className={
                          isFullScore
                            ? "text-emerald-600 dark:text-emerald-400"
                            : isPartial
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-rose-600 dark:text-rose-400"
                        }
                      >
                        {res.earnedScore.toFixed(2)}
                      </strong>{" "}
                      / {res.maxScore.toFixed(2)}đ
                    </span>
                    {isFullScore ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </div>
                </div>

                {/* Question Prompt & Code Snippet */}
                {res.contentMarkdown && (
                  <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100">
                    <MarkdownRenderer content={res.contentMarkdown} />
                  </div>
                )}

                {res.codeSnippet && <CodeBlock code={res.codeSnippet} />}

                {/* Part 1 Options & Answer Review */}
                {isPart1 && (
                  <div className="space-y-2 pt-1">
                    {res.options && res.options.length > 0 && (
                      <div className="grid grid-cols-1 gap-2">
                        {res.options.map((opt) => {
                          const isCorrectOpt = opt.id === res.correctAnswer;
                          const isUserChoice = opt.id === res.userAnswer;
                          let style =
                            "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300";
                          if (isCorrectOpt) {
                            style =
                              "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold";
                          } else if (isUserChoice && !isCorrectOpt) {
                            style =
                              "border-rose-400 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200";
                          }

                          return (
                            <div
                              key={opt.id}
                              className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs sm:text-sm ${style}`}
                            >
                              <div>
                                <strong className="mr-1.5">{opt.id}.</strong>
                                {opt.text}
                              </div>
                              <div className="shrink-0 text-[11px] font-bold">
                                {isCorrectOpt && (
                                  <span className="text-emerald-700 dark:text-emerald-300">
                                    ✓ Đáp án đúng
                                  </span>
                                )}
                                {isUserChoice && !isCorrectOpt && (
                                  <span className="text-rose-600 dark:text-rose-400">
                                    ✗ Bạn chọn
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-xs sm:text-sm">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Lựa chọn của bạn:</span>{" "}
                        <strong
                          className={`font-bold ml-1 ${
                            res.userAnswer === res.correctAnswer
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {res.userAnswer ? res.userAnswer : "(Chưa chọn)"}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Đáp án chính xác:</span>{" "}
                        <strong className="font-bold text-emerald-600 dark:text-emerald-400 ml-1">
                          {res.correctAnswer}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Part 2 Subresults Table */}
                {!isPart1 && res.subResults && (
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mt-3">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="px-3 py-2 text-left font-bold text-slate-700 dark:text-slate-200 w-12">
                            Ý
                          </th>
                          <th className="px-3 py-2 text-left font-bold text-slate-700 dark:text-slate-200">
                            Mệnh đề
                          </th>
                          <th className="px-3 py-2 text-center font-bold text-slate-700 dark:text-slate-200 w-24">
                            Bạn chọn
                          </th>
                          <th className="px-3 py-2 text-center font-bold text-slate-700 dark:text-slate-200 w-24">
                            Đáp án
                          </th>
                          <th className="px-3 py-2 text-center font-bold text-slate-700 dark:text-slate-200 w-20">
                            Kết quả
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        {res.subResults.map((sub) => (
                          <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                            <td className="px-3 py-2.5 font-bold text-blue-700 dark:text-blue-400 uppercase align-top">
                              {sub.id})
                            </td>
                            <td className="px-3 py-2.5 text-slate-800 dark:text-slate-200 leading-relaxed">
                              <div>{sub.text}</div>
                              {sub.explanation && (
                                <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 italic">
                                  {sub.explanation}
                                </div>
                              )}
                            </td>
                            <td className="px-3 py-2.5 text-center font-semibold">
                              {sub.userAnswer === true ? (
                                <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                                  Đúng
                                </span>
                              ) : sub.userAnswer === false ? (
                                <span className="text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">
                                  Sai
                                </span>
                              ) : (
                                <span className="text-slate-400 italic">Chưa chọn</span>
                              )}
                            </td>
                            <td className="px-3 py-2.5 text-center font-bold">
                              {sub.correctAnswer ? (
                                <span className="text-emerald-700 dark:text-emerald-400">Đúng</span>
                              ) : (
                                <span className="text-rose-700 dark:text-rose-400">Sai</span>
                              )}
                            </td>
                            <td className="px-3 py-2.5 text-center">
                              {sub.isCorrect ? (
                                <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
                                  ✓ Đúng
                                </span>
                              ) : (
                                <span className="inline-flex items-center text-rose-500 dark:text-rose-400 font-bold">
                                  ✗ Sai
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {res.explanation && (
                  <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs sm:text-sm text-blue-950 dark:text-blue-100 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-blue-800 dark:text-blue-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Lời giải chi tiết:
                    </div>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">{res.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
