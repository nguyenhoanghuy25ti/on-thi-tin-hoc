import { prisma } from "@/lib/prisma";
import { Trophy } from "lucide-react";
import LeaderboardClient from "./LeaderboardClient";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const [attempts, exams] = await Promise.all([
    prisma.examAttempt.findMany({
      take: 100,
      orderBy: [
        { totalScore: "desc" },
        { timeSpentSeconds: "asc" },
        { createdAt: "asc" },
      ],
      include: {
        user: {
          select: { id: true, name: true, email: true, orientationPreference: true },
        },
        exam: {
          select: { id: true, title: true },
        },
      },
    }),
    prisma.exam.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true },
    }),
  ]);

  // Aggregate student averages across all attempts
  const userAgg: Record<
    string,
    {
      userId: string;
      studentName: string;
      studentEmail: string;
      orientationPreference: string;
      sumScore: number;
      bestScore: number;
      attemptCount: number;
    }
  > = {};

  for (const a of attempts) {
    if (!userAgg[a.userId]) {
      userAgg[a.userId] = {
        userId: a.userId,
        studentName: a.user.name,
        studentEmail: a.user.email,
        orientationPreference: a.user.orientationPreference || "ICT",
        sumScore: a.totalScore,
        bestScore: a.totalScore,
        attemptCount: 1,
      };
    } else {
      userAgg[a.userId].sumScore += a.totalScore;
      userAgg[a.userId].attemptCount += 1;
      if (a.totalScore > userAgg[a.userId].bestScore) {
        userAgg[a.userId].bestScore = a.totalScore;
      }
    }
  }

  const studentAverages = Object.values(userAgg)
    .map((u) => ({
      userId: u.userId,
      studentName: u.studentName,
      studentEmail: u.studentEmail,
      orientationPreference: u.orientationPreference,
      attemptCount: u.attemptCount,
      bestScore: u.bestScore,
      avgScore: Math.round((u.sumScore / u.attemptCount) * 100) / 100,
    }))
    .sort((a, b) => b.avgScore - a.avgScore || b.bestScore - a.bestScore);

  const attemptRows = attempts.map((a) => ({
    id: a.id,
    examId: a.examId,
    examTitle: a.exam.title,
    userId: a.userId,
    studentName: a.user.name,
    studentEmail: a.user.email,
    selectedOrientation: a.selectedOrientation,
    part1Score: a.part1Score,
    part2Score: a.part2Score,
    totalScore: a.totalScore,
    timeSpentSeconds: a.timeSpentSeconds,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-500" />
          Bảng Vinh Danh Học Sinh Xuất Sắc
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Bảng Xếp Hạng Thi Thử THPT
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Xem top điểm thi cao nhất theo từng đề và top học sinh có điểm trung bình cao nhất.
        </p>
      </div>

      <LeaderboardClient
        attempts={attemptRows}
        exams={exams}
        studentAverages={studentAverages}
      />
    </div>
  );
}
