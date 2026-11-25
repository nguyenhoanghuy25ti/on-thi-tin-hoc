import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  FileCheck2,
  Users,
  Layers,
  TrendingUp,
  PlusCircle,
  FileText,
  BookOpen,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  const [userCount, examCount, attemptCount, lessonsCount] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.exam.count(),
    prisma.examAttempt.count(),
    prisma.lesson.count(),
  ]);

  const recentAttempts = await prisma.examAttempt.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      exam: { select: { title: true } },
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            Hệ Thống Quản Trị
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Quản trị ngân hàng đề thi, bài giảng lý thuyết & flashcard, và theo dõi kết quả học sinh.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/exams"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            Quản lý đề thi
          </Link>
          <Link
            href="/admin/lessons"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            Quản lý bài giảng
          </Link>
          <Link
            href="/admin/students"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            <Users className="w-4 h-4 text-emerald-600" />
            Quản lý học sinh
          </Link>
          <Link
            href="/admin/exams/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Thêm đề thi mới
          </Link>
        </div>
      </div>

      {/* Stats 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/students"
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Học sinh</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">{userCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Tài khoản thí sinh</div>
        </Link>

        <Link
          href="/admin/exams"
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Đề thi</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-2">{examCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Trong ngân hàng đề</div>
        </Link>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Lượt làm bài</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">{attemptCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Đã hoàn thành thi thử</div>
        </div>

        <Link
          href="/admin/lessons"
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Bài giảng</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-2">{lessonsCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Chuyên đề lý thuyết</div>
        </Link>
      </div>

      {/* Recent Attempts Activity */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Lượt Thi Gần Đây Nhất
          </h2>
          <span className="text-xs text-slate-400">Thời gian thực</span>
        </div>

        {recentAttempts.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Chưa có lượt nộp bài nào.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold">
                <tr>
                  <th className="px-6 py-3.5 text-left">Thí sinh</th>
                  <th className="px-6 py-3.5 text-left">Đề thi</th>
                  <th className="px-6 py-3.5 text-center">Định hướng</th>
                  <th className="px-6 py-3.5 text-center">Phần I</th>
                  <th className="px-6 py-3.5 text-center">Phần II</th>
                  <th className="px-6 py-3.5 text-center">Tổng điểm</th>
                  <th className="px-6 py-3.5 text-center">Thời gian</th>
                  <th className="px-6 py-3.5 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {recentAttempts.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{a.user.name}</div>
                      <div className="text-[10px] text-slate-400">{a.user.email}</div>
                    </td>
                    <td className="px-6 py-3.5 text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[200px]">
                      {a.exam.title}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded font-bold text-xs bg-slate-100 dark:bg-slate-800">
                        {a.selectedOrientation}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center font-bold text-blue-600 dark:text-blue-400">
                      {a.part1Score.toFixed(2)}
                    </td>
                    <td className="px-6 py-3.5 text-center font-bold text-indigo-600 dark:text-indigo-400">
                      {a.part2Score.toFixed(2)}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="text-base font-black text-slate-900 dark:text-white">
                        {a.totalScore.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center text-xs text-slate-500 dark:text-slate-400">
                      {new Date(a.createdAt).toLocaleTimeString("vi-VN")}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Link
                        href={`/exams/${a.examId}/result/${a.id}`}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Xem kết quả
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
