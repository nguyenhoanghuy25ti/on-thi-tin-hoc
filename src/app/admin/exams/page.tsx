"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileCheck2,
  PlusCircle,
  Upload,
  Download,
  Trash2,
  Pencil,
  CheckCircle,
  XCircle,
  X,
  ArrowLeft,
} from "lucide-react";

export default function AdminExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");

  const loadExams = async () => {
    try {
      const res = await fetch("/api/admin/exams");
      const data = await res.json();
      if (data.exams) setExams(data.exams);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleDelete = async (examId: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa đề thi "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/exams/${examId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setExams((prev) => prev.filter((e) => e.id !== examId));
      } else {
        alert("Không thể xóa đề thi.");
      }
    } catch {
      alert("Lỗi kết nối máy chủ.");
    }
  };

  const handleExportJson = async (examId: string) => {
    try {
      const res = await fetch(`/api/admin/exams/${examId}`);
      const data = await res.json();
      if (data.exam) {
        const jsonStr = JSON.stringify(data.exam, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `de-thi-${data.exam.id.slice(0, 8)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      alert("Không thể xuất file JSON.");
    }
  };

  const handleImportJson = async () => {
    setImportError("");
    setImporting(true);

    try {
      const parsed = JSON.parse(importJsonText);
      const res = await fetch("/api/admin/exams/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const data = await res.json();
      if (!res.ok) {
        setImportError(data.error || "Nhập file thất bại.");
        setImporting(false);
        return;
      }

      setImportModalOpen(false);
      setImportJsonText("");
      setImporting(false);
      loadExams();
      alert("Đã nhập đề thi thành công!");
    } catch (e: any) {
      setImportError(`Cú pháp JSON không hợp lệ: ${e.message}`);
      setImporting(false);
    }
  };

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
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Quản Lý Ngân Hàng Đề Thi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Thêm mới, chỉnh sửa, xóa, nhập / xuất đề thi dưới dạng file JSON chuẩn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setImportModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            <Upload className="w-4 h-4 text-emerald-600" />
            Nhập JSON
          </button>
          <Link
            href="/admin/exams/new"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Tạo đề thi mới
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <p className="mt-3 text-sm text-slate-500">Đang tải danh sách đề thi...</p>
        </div>
      ) : exams.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-16 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="text-slate-500 text-sm">Chưa có đề thi nào trong hệ thống.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold">
                <tr>
                  <th className="px-6 py-4 text-left">Tên đề thi</th>
                  <th className="px-6 py-4 text-center">Mức độ</th>
                  <th className="px-6 py-4 text-center">Thời gian</th>
                  <th className="px-6 py-4 text-center">Số câu hỏi</th>
                  <th className="px-6 py-4 text-center">Lượt thi</th>
                  <th className="px-6 py-4 text-center">Trạng thái</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                        {exam.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">
                        {exam.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-xs font-semibold">
                      {exam.difficulty === "CO_BAN"
                        ? "Cơ bản"
                        : exam.difficulty === "NANG_CAO"
                        ? "Nâng cao"
                        : "Chuẩn Bộ"}
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-slate-600 dark:text-slate-300">
                      {exam.durationMinutes} phút
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-blue-600 dark:text-blue-400">
                      {exam._count?.questions || 0} câu
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-indigo-600 dark:text-indigo-400">
                      {exam._count?.attempts || 0} lượt
                    </td>
                    <td className="px-6 py-4 text-center">
                      {exam.isPublished ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Đang mở
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-bold">
                          <XCircle className="w-3.5 h-3.5" />
                          Bản nháp
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/exams/${exam.id}/edit`}
                          title="Chỉnh sửa đề thi"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleExportJson(exam.id)}
                          title="Xuất file JSON"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(exam.id, exam.title)}
                          title="Xóa đề thi"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {importModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Nhập Đề Thi Nhanh
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Dán Nội Dung File JSON Đề Thi
                </h3>
              </div>
              <button
                onClick={() => setImportModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {importError && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
                {importError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                Dữ liệu JSON (Cấu trúc: title, description, difficulty, durationMinutes, questions)
              </label>
              <textarea
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder={'{\n  "title": "Đề thi thử số 02",\n  "durationMinutes": 50,\n  "questions": [...]\n}'}
                rows={10}
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Hủy bỏ
              </button>
              <button
                disabled={importing || !importJsonText.trim()}
                onClick={handleImportJson}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
              >
                {importing ? "Đang xử lý..." : "Xác nhận nhập đề"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
