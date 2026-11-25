"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Trophy, ArrowRight, Users, Award } from "lucide-react";

interface AttemptRow {
  id: string;
  examId: string;
  examTitle: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  selectedOrientation: string;
  part1Score: number;
  part2Score: number;
  totalScore: number;
  timeSpentSeconds: number;
}

interface StudentAvgRow {
  userId: string;
  studentName: string;
  studentEmail: string;
  attemptCount: number;
  avgScore: number;
  bestScore: number;
  orientationPreference: string;
}

interface ExamOption {
  id: string;
  title: string;
}

export default function LeaderboardClient({
  attempts,
  exams,
  studentAverages,
}: {
  attempts: AttemptRow[];
  exams: ExamOption[];
  studentAverages: StudentAvgRow[];
}) {
  const [viewMode, setViewMode] = useState<"by-exam" | "by-average">("by-exam");
  const [selectedExamId, setSelectedExamId] = useState<string>("ALL");

  const filteredAttempts = useMemo(() => {
    if (selectedExamId === "ALL") return attempts;
    return attempts.filter((a) => a.examId === selectedExamId);
  }, [attempts, selectedExamId]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shadow-md shadow-amber-400/30 mx-auto">
          1
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-black flex items-center justify-center shadow-md shadow-slate-300/30 mx-auto">
          2
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-black flex items-center justify-center shadow-md shadow-amber-600/30 mx-auto">
          3
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center text-xs mx-auto">
        {rank}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("by-exam")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === "by-exam"
                ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            Top điểm cao theo đề
          </button>
          <button
            onClick={() => setViewMode("by-average")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === "by-average"
                ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            <Users className="w-4 h-4 text-indigo-500" />
            Top điểm trung bình
          </button>
        </div>

        {viewMode === "by-exam" && (
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Tất cả đề thi</option>
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        {viewMode === "by-exam" ? (
          filteredAttempts.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Chưa có lượt thi nào cho lựa chọn này.
              </p>
              <Link
                href="/exams"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Là người đầu tiên ghi danh!
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold">
                  <tr>
                    <th className="px-6 py-4 text-center w-20">Hạng</th>
                    <th className="px-6 py-4 text-left">Học sinh</th>
                    <th className="px-6 py-4 text-left">Đề thi</th>
                    <th className="px-6 py-4 text-center">Định hướng</th>
                    <th className="px-6 py-4 text-center">Phần I</th>
                    <th className="px-6 py-4 text-center">Phần II</th>
                    <th className="px-6 py-4 text-center">Tổng điểm</th>
                    <th className="px-6 py-4 text-center">Thời gian</th>
                    <th className="px-6 py-4 text-right">Xem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                  {filteredAttempts.map((a, idx) => {
                    const rank = idx + 1;
                    const mins = Math.floor(a.timeSpentSeconds / 60);
                    const secs = a.timeSpentSeconds % 60;

                    return (
                      <tr
                        key={a.id}
                        className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                          rank <= 3 ? "bg-amber-50/30 dark:bg-amber-950/15" : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-center">{getRankBadge(rank)}</td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 dark:text-white">{a.studentName}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[150px]">
                            {a.studentEmail}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[240px]">
                          {a.examTitle}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                              a.selectedOrientation === "CS"
                                ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                                : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                            }`}
                          >
                            {a.selectedOrientation}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-blue-600 dark:text-blue-400">
                          {a.part1Score.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-indigo-600 dark:text-indigo-400">
                          {a.part2Score.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            {a.totalScore.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-mono text-xs text-slate-500 dark:text-slate-400">
                          {mins}p {secs}s
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/exams/${a.examId}/result/${a.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Bài làm
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : studentAverages.length === 0 ? (
          <div className="text-center py-20 text-sm text-slate-500 dark:text-slate-400">
            Chưa có dữ liệu xếp hạng theo điểm trung bình.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold">
                <tr>
                  <th className="px-6 py-4 text-center w-20">Hạng</th>
                  <th className="px-6 py-4 text-left">Học sinh</th>
                  <th className="px-6 py-4 text-center">Định hướng</th>
                  <th className="px-6 py-4 text-center">Số lượt thi</th>
                  <th className="px-6 py-4 text-center">Điểm cao nhất</th>
                  <th className="px-6 py-4 text-center">Điểm trung bình</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {studentAverages.map((s, idx) => {
                  const rank = idx + 1;
                  return (
                    <tr
                      key={s.userId}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                        rank <= 3 ? "bg-amber-50/30 dark:bg-amber-950/15" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-center">{getRankBadge(rank)}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white">{s.studentName}</div>
                        <div className="text-[11px] text-slate-400">{s.studentEmail}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                            s.orientationPreference === "CS"
                              ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                              : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          }`}
                        >
                          {s.orientationPreference}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-bold">{s.attemptCount} lượt</td>
                      <td className="px-6 py-4 text-center font-bold text-emerald-600 dark:text-emerald-400">
                        {s.bestScore.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-base font-black text-indigo-600 dark:text-indigo-400">
                          {s.avgScore.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
