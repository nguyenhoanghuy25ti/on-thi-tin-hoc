"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import {
  Users,
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

interface StudentAttempt {
  id: string;
  examId: string;
  examTitle: string;
  selectedOrientation: string;
  part1Score: number;
  part2Score: number;
  totalScore: number;
  timeSpentSeconds: number;
  createdAt: string;
}

interface StudentRow {
  id: string;
  name: string;
  email: string;
  orientationPreference: string;
  createdAt: string;
  attemptCount: number;
  avgScore: number;
  bestScore: number;
  attempts: StudentAttempt[];
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/students")
      .then((res) => res.json())
      .then((data) => {
        if (data.students) setStudents(data.students);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Về Admin Dashboard
          </Link>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-emerald-600" />
            Danh Sách Học Sinh & Kết Quả Thi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Theo dõi quá trình làm bài và điểm số chi tiết của từng tài khoản học sinh.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold">
                <tr>
                  <th className="px-6 py-4 text-left">Học sinh</th>
                  <th className="px-6 py-4 text-center">Định hướng</th>
                  <th className="px-6 py-4 text-center">Số lượt thi</th>
                  <th className="px-6 py-4 text-center">Điểm TB</th>
                  <th className="px-6 py-4 text-center">Cao nhất</th>
                  <th className="px-6 py-4 text-right">Lịch sử bài thi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {filtered.map((s) => {
                  const isOpen = expandedId === s.id;
                  return (
                    <Fragment key={s.id}>
                      <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 dark:text-white">{s.name}</div>
                          <div className="text-[11px] text-slate-400">{s.email}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              s.orientationPreference === "CS"
                                ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                                : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                            }`}
                          >
                            {s.orientationPreference}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-bold">{s.attemptCount}</td>
                        <td className="px-6 py-4 text-center font-bold text-indigo-600 dark:text-indigo-400">
                          {s.avgScore.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-emerald-600 dark:text-emerald-400">
                          {s.bestScore.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setExpandedId(isOpen ? null : s.id)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {isOpen ? "Thu gọn" : `Xem (${s.attemptCount})`}
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr>
                          <td colSpan={6} className="bg-slate-50/70 dark:bg-slate-950/60 px-6 py-4">
                            {s.attempts.length === 0 ? (
                              <p className="text-xs text-slate-400 italic">
                                Học sinh này chưa thực hiện bài thi nào.
                              </p>
                            ) : (
                              <div className="space-y-2">
                                {s.attempts.map((a) => (
                                  <div
                                    key={a.id}
                                    className="flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs"
                                  >
                                    <div>
                                      <span className="font-bold text-slate-900 dark:text-white">
                                        {a.examTitle}
                                      </span>
                                      <span className="ml-2 text-slate-400">
                                        ({new Date(a.createdAt).toLocaleString("vi-VN")})
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <span>Nhánh: <strong>{a.selectedOrientation}</strong></span>
                                      <span>P1: <strong className="text-blue-600">{a.part1Score.toFixed(2)}</strong></span>
                                      <span>P2: <strong className="text-indigo-600">{a.part2Score.toFixed(2)}</strong></span>
                                      <span>Tổng: <strong className="text-emerald-600">{a.totalScore.toFixed(2)}</strong></span>
                                      <Link
                                        href={`/exams/${a.examId}/result/${a.id}`}
                                        className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                                      >
                                        Chi tiết
                                        <ArrowRight className="w-3.5 h-3.5" />
                                      </Link>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
