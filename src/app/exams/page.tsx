import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import ExamListClient from "./ExamListClient";

export const dynamic = "force-dynamic";

export default async function ExamsPage() {
  const user = await getCurrentUser();

  const exams = await prisma.exam.findMany({
    where: { isPublished: true },
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
    include: {
      _count: {
        select: { questions: true, attempts: true },
      },
      questions: {
        select: { part: true, sectionType: true },
      },
    },
  });

  // Fetch user's attempts to mark completed exams and best scores
  const userAttemptsMap: Record<
    string,
    { bestScore: number; attemptCount: number; latestAttemptId: string }
  > = {};

  if (user) {
    const attempts = await prisma.examAttempt.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, examId: true, totalScore: true },
    });

    for (const a of attempts) {
      if (!userAttemptsMap[a.examId]) {
        userAttemptsMap[a.examId] = {
          bestScore: a.totalScore,
          attemptCount: 1,
          latestAttemptId: a.id,
        };
      } else {
        userAttemptsMap[a.examId].attemptCount += 1;
        if (a.totalScore > userAttemptsMap[a.examId].bestScore) {
          userAttemptsMap[a.examId].bestScore = a.totalScore;
        }
      }
    }
  }

  const formattedExams = exams.map((exam) => {
    const part1Count = exam.questions.filter((q) => q.part === 1).length;
    const part2Common = exam.questions.filter((q) => q.part === 2 && q.sectionType === "COMMON").length;
    const part2Branch = Math.min(
      exam.questions.filter((q) => q.part === 2 && q.sectionType === "CS").length,
      exam.questions.filter((q) => q.part === 2 && q.sectionType === "ICT").length
    );
    const activeQuestionCount = part1Count + part2Common + part2Branch;

    return {
      id: exam.id,
      title: exam.title,
      description: exam.description,
      year: exam.year,
      difficulty: exam.difficulty,
      durationMinutes: exam.durationMinutes,
      activeQuestionCount: activeQuestionCount || exam._count.questions,
      _count: exam._count,
      userStatus: userAttemptsMap[exam.id] || null,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          Phòng Thi Thử Chuẩn Bộ GD&ĐT
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Danh Sách Đề Thi Tốt Nghiệp THPT Môn Tin Học
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Đề thi được biên soạn theo định dạng chuẩn 2025: 50 phút, 28 câu hỏi (Phần I: 24 câu trắc nghiệm 4 lựa chọn; Phần II: 4 câu trắc nghiệm Đúng/Sai với 2 nhánh tự chọn CS và ICT).
        </p>
      </div>

      <ExamListClient exams={formattedExams} />
    </div>
  );
}
