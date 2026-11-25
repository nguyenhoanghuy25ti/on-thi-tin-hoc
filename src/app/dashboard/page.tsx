import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { gradeExam } from "@/lib/scoring";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Trophy,
  FileCheck2,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import DashboardCharts, { ScorePoint, TopicAccuracyStat } from "@/components/DashboardCharts";

export const dynamic = "force-dynamic";

const TOPIC_SLUG_MAP: Record<string, string> = {
  "AI & Máy tính": "khai-niem-va-ung-dung-ai",
  "Mạng & An toàn": "giao-thuc-mang-ip-dns-cloud",
  "Đạo đức & Pháp luật": "dao-duc-phap-luat-van-hoa-so",
  "HTML & CSS": "cau-truc-html5-va-css3",
  "CSDL & SQL": "khoa-chinh-khoa-ngoai-va-sql",
  "Thuật toán & Python": "tim-kiem-nhi-phan-python",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const attempts = await prisma.examAttempt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      exam: {
        include: {
          questions: {
            orderBy: { orderIndex: "asc" },
          },
        },
      },
    },
  });

  const totalAttempts = attempts.length;
  const highestScore = totalAttempts > 0 ? Math.max(...attempts.map((a) => a.totalScore)) : 0;
  const avgScore =
    totalAttempts > 0
      ? Math.round((attempts.reduce((a, c) => a + c.totalScore, 0) / totalAttempts) * 100) / 100
      : 0;

  // Build chronological score points (up to last 10 attempts)
  const chronological = [...attempts].reverse().slice(-10);
  const scorePoints: ScorePoint[] = chronological.map((a, idx) => ({
    attemptId: a.id,
    label: `Lần ${idx + 1}`,
    examTitle: a.exam.title,
    totalScore: a.totalScore,
    part1Score: a.part1Score,
    part2Score: a.part2Score,
    dateLabel: new Date(a.createdAt).toLocaleDateString("vi-VN"),
  }));

  // Compute topic accuracy across all attempts
  const topicCounters: Record<string, { correct: number; total: number }> = {};

  for (const attempt of attempts) {
    let parsedAnswers = { part1: {}, part2: {} };
    try {
      parsedAnswers = JSON.parse(attempt.answersJson);
    } catch {
      continue;
    }

    const breakdown = gradeExam(
      attempt.exam.questions as any,
      attempt.selectedOrientation as any,
      parsedAnswers as any
    );

    for (const qRes of breakdown.questionResults) {
      const topic = qRes.topicTag || "Chung";
      if (!topicCounters[topic]) {
        topicCounters[topic] = { correct: 0, total: 0 };
      }

      if (qRes.part === 1) {
        topicCounters[topic].total += 1;
        if (qRes.earnedScore > 0) topicCounters[topic].correct += 1;
      } else if (qRes.part === 2 && qRes.subResults) {
        topicCounters[topic].total += qRes.subResults.length;
        topicCounters[topic].correct += qRes.subResults.filter((s) => s.isCorrect).length;
      }
    }
  }

  const topicStats: TopicAccuracyStat[] = Object.entries(topicCounters)
    .map(([topic, { correct, total }]) => ({
      topic,
      correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
      lessonSlug: TOPIC_SLUG_MAP[topic],
    }))
    .sort((a, b) => a.percentage - b.percentage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Hồ sơ học tập cá nhân
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Xin chào, {user.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Theo dõi tiến độ luyện thi THPT, biểu đồ điểm số và tỷ lệ đúng theo chuyên đề của bạn.
          </p>
        </div>

        <Link
          href="/exams"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all"
        >
          <FileCheck2 className="w-4 h-4" />
          Vào phòng thi mới
        </Link>
      </div>

      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              Số lần thi
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">{totalAttempts}</div>
          <div className="text-[11px] text-slate-400 mt-1">Bài thi đã hoàn thành</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              Điểm cao nhất
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
            {highestScore.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Kỷ lục cá nhân (Thang 10)</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              Điểm trung bình
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-2">
            {avgScore.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Qua các lượt thi thử</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              Định hướng
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-2">
            {user.orientationPreference || "ICT"}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {user.orientationPreference === "CS" ? "Khoa học máy tính" : "Tin học ứng dụng"}
          </div>
        </div>
      </div>

      {/* Charts: Score Progression & Topic Accuracy */}
      <DashboardCharts scorePoints={scorePoints} topicStats={topicStats} />

      {/* History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Lịch Sử Làm Bài Thi
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {totalAttempts} bản ghi
          </span>
        </div>

        {totalAttempts === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">Bạn chưa làm bài thi nào.</p>
            <Link
              href="/exams"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Làm bài thi thử đầu tiên
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold">
                <tr>
                  <th className="px-6 py-3.5 text-left">Đề thi</th>
                  <th className="px-6 py-3.5 text-center">Định hướng</th>
                  <th className="px-6 py-3.5 text-center">Phần I (Trắc nghiệm)</th>
                  <th className="px-6 py-3.5 text-center">Phần II (Đúng/Sai)</th>
                  <th className="px-6 py-3.5 text-center">Tổng điểm</th>
                  <th className="px-6 py-3.5 text-center">Thời gian</th>
                  <th className="px-6 py-3.5 text-center">Ngày thi</th>
                  <th className="px-6 py-3.5 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {attempts.map((a) => {
                  const mins = Math.floor(a.timeSpentSeconds / 60);
                  const secs = a.timeSpentSeconds % 60;
                  return (
                    <tr key={a.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white line-clamp-1">
                        {a.exam.title}
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
                      <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-400 font-bold">
                        {a.part1Score.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center text-indigo-600 dark:text-indigo-400 font-bold">
                        {a.part2Score.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-base font-black text-slate-900 dark:text-white">
                          {a.totalScore.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-500 dark:text-slate-400 font-mono text-xs">
                        {mins}p {secs}s
                      </td>
                      <td className="px-6 py-4 text-center text-slate-500 dark:text-slate-400 text-xs">
                        {new Date(a.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/exams/${a.examId}/result/${a.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Xem lại
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
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
