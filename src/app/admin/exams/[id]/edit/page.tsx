"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ExamEditorForm, { EditorExam } from "@/components/ExamEditorForm";

export default function EditExamPage() {
  const params = useParams();
  const examId = params?.id as string;

  const [exam, setExam] = useState<EditorExam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/exams/${examId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.exam) {
          setExam(data.exam);
        } else {
          setError(data.error || "Không tìm thấy đề thi.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Lỗi tải dữ liệu đề thi.");
        setLoading(false);
      });
  }, [examId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
        <p className="mt-3 text-sm text-slate-500">Đang tải đề thi...</p>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-rose-600 font-bold">
        {error || "Không thể mở đề thi."}
      </div>
    );
  }

  return <ExamEditorForm mode="edit" initialExam={exam} />;
}
