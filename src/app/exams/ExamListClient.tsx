"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileCheck2,
  Clock,
  HelpCircle,
  ArrowRight,
  Brain,
  Database,
  X,
  Sparkles,
  ShieldCheck,
  Search,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Orientation } from "@/lib/types";

interface ExamItem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  activeQuestionCount: number;
  _count: {
    questions: number;
    attempts: number;
  };
  userStatus: {
    bestScore: number;
    attemptCount: number;
    latestAttemptId: string;
  } | null;
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  CO_BAN: {
    label: "Cơ bản",
    color: "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300",
  },
  CHUAN_BO: {
    label: "Chuẩn Bộ GD&ĐT",
    color: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300",
  },
  NANG_CAO: {
    label: "Nâng cao",
    color: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300",
  },
};

export default function ExamListClient({ exams }: { exams: ExamItem[] }) {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null);
  const [orientation, setOrientation] = useState<Orientation>("ICT");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "DONE" | "TODO">("ALL");

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      if (
        searchQuery.trim() &&
        !exam.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
        !exam.description.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ) {
        return false;
      }
      if (difficultyFilter !== "ALL" && exam.difficulty !== difficultyFilter) {
        return false;
      }
      if (statusFilter === "DONE" && !exam.userStatus) return false;
      if (statusFilter === "TODO" && exam.userStatus) return false;
      return true;
    });
  }, [exams, searchQuery, difficultyFilter, statusFilter]);

  const handleOpenModal = (exam: ExamItem) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const handleStartExam = () => {
    if (!selectedExam) return;
    router.push(`/exams/${selectedExam.id}/take?orientation=${orientation}`);
  };

  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm đề thi theo tên hoặc mô tả..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Lọc:
          </div>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Tất cả mức độ</option>
            <option value="CO_BAN">Cơ bản</option>
            <option value="CHUAN_BO">Chuẩn Bộ GD&ĐT</option>
            <option value="NANG_CAO">Nâng cao</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="TODO">Chưa làm</option>
            <option value="DONE">Đã làm</option>
          </select>
        </div>
      </div>

      {filteredExams.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-sm text-slate-500 dark:text-slate-400">
          Không tìm thấy đề thi nào phù hợp với bộ lọc hiện tại.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExams.map((exam) => {
            const diffBadge = DIFFICULTY_LABELS[exam.difficulty] || DIFFICULTY_LABELS.CHUAN_BO;
            return (
              <div
                key={exam.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${diffBadge.color}`}>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {diffBadge.label}
                      </span>
                      {exam.userStatus ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đã làm ({exam.userStatus.bestScore.toFixed(2)}đ)
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                          Chưa làm
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {exam._count.attempts} lượt thi
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {exam.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {exam.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span className="font-semibold">{exam.durationMinutes} phút</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="font-semibold">{exam.activeQuestionCount} câu hỏi</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-semibold">Thang 10đ</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(exam)}
                    className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    {exam.userStatus ? "Thi lại đề này" : "Chọn định hướng & Vào thi"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {exam.userStatus && (
                    <Link
                      href={`/exams/${exam.id}/result/${exam.userStatus.latestAttemptId}`}
                      className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
                    >
                      Xem bài gần nhất
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Orientation Selection Modal */}
      {isModalOpen && selectedExam && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Bước chuẩn bị phòng thi
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Chọn Định Hướng Làm Bài (Phần II)
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Theo quy chế thi THPT 2018 môn Tin học, ở <strong className="text-slate-800 dark:text-slate-200">Phần II</strong> bạn sẽ làm 2 câu hỏi phần chung và <strong className="text-slate-800 dark:text-slate-200">2 câu hỏi tự chọn</strong> theo một trong hai định hướng dưới đây:
            </p>

            <div className="space-y-3">
              <label
                onClick={() => setOrientation("ICT")}
                className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                  orientation === "ICT"
                    ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="orientation"
                  checked={orientation === "ICT"}
                  onChange={() => setOrientation("ICT")}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Tin học ứng dụng (ICT)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                      Phổ biến
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Kiến thức về Cơ sở dữ liệu quan hệ, câu lệnh truy vấn SQL (SELECT, JOIN, GROUP BY), thiết kế Web HTML5 & CSS3.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setOrientation("CS")}
                className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                  orientation === "CS"
                    ? "border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="orientation"
                  checked={orientation === "CS"}
                  onChange={() => setOrientation("CS")}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Khoa học máy tính (CS)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Kiến thức về Thuật toán tìm kiếm, sắp xếp, lập trình Python (hàm, đệ quy, danh sách), phân tích độ phức tạp thời gian Big-O.
                  </p>
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleStartExam}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                Bắt đầu làm bài
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
