"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Trash2, Save, ArrowLeft, Pencil } from "lucide-react";

export interface EditorQuestion {
  id?: string;
  orderIndex: number;
  part: number;
  sectionType: "COMMON" | "CS" | "ICT";
  topicTag: string;
  contentMarkdown: string;
  codeSnippet: string | null;
  optionsJson?: string | null;
  correctOption?: string | null;
  subQuestionsJson?: string | null;
  explanation: string;
}

export interface EditorExam {
  id?: string;
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  isPublished: boolean;
  questions: EditorQuestion[];
}

const TOPIC_TAGS = [
  "AI & Máy tính",
  "Mạng & An toàn",
  "Đạo đức & Pháp luật",
  "HTML & CSS",
  "CSDL & SQL",
  "Thuật toán & Python",
  "Chung",
];

export default function ExamEditorForm({
  mode,
  initialExam,
}: {
  mode: "create" | "edit";
  initialExam?: EditorExam;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(initialExam?.title || "");
  const [description, setDescription] = useState(initialExam?.description || "");
  const [difficulty, setDifficulty] = useState(initialExam?.difficulty || "CHUAN_BO");
  const [durationMinutes, setDurationMinutes] = useState(initialExam?.durationMinutes || 50);
  const [isPublished, setIsPublished] = useState(initialExam?.isPublished ?? true);
  const [questions, setQuestions] = useState<EditorQuestion[]>(initialExam?.questions || []);

  // Question form states
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [part, setPart] = useState<number>(1);
  const [sectionType, setSectionType] = useState<"COMMON" | "CS" | "ICT">("COMMON");
  const [topicTag, setTopicTag] = useState<string>("Chung");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [explanation, setExplanation] = useState("");

  // Part 1 fields
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [correctOption, setCorrectOption] = useState<"A" | "B" | "C" | "D">("A");

  // Part 2 fields
  const [propA, setPropA] = useState("");
  const [isTrueA, setIsTrueA] = useState(true);
  const [propB, setPropB] = useState("");
  const [isTrueB, setIsTrueB] = useState(false);
  const [propC, setPropC] = useState("");
  const [isTrueC, setIsTrueC] = useState(true);
  const [propD, setPropD] = useState("");
  const [isTrueD, setIsTrueD] = useState(false);

  const [saving, setSaving] = useState(false);

  const resetQuestionForm = () => {
    setEditingIndex(null);
    setContentMarkdown("");
    setCodeSnippet("");
    setExplanation("");
    setOptA("");
    setOptB("");
    setOptC("");
    setOptD("");
    setCorrectOption("A");
    setPropA("");
    setIsTrueA(true);
    setPropB("");
    setIsTrueB(false);
    setPropC("");
    setIsTrueC(true);
    setPropD("");
    setIsTrueD(false);
  };

  const handleLoadQuestionForEdit = (idx: number) => {
    const q = questions[idx];
    setEditingIndex(idx);
    setPart(q.part);
    setSectionType((q.sectionType as any) || "COMMON");
    setTopicTag(q.topicTag || "Chung");
    setContentMarkdown(q.contentMarkdown);
    setCodeSnippet(q.codeSnippet || "");
    setExplanation(q.explanation || "");

    if (q.part === 1) {
      try {
        const opts = q.optionsJson ? JSON.parse(q.optionsJson) : [];
        setOptA(opts.find((o: any) => o.id === "A")?.text || "");
        setOptB(opts.find((o: any) => o.id === "B")?.text || "");
        setOptC(opts.find((o: any) => o.id === "C")?.text || "");
        setOptD(opts.find((o: any) => o.id === "D")?.text || "");
      } catch {
        setOptA("");
        setOptB("");
        setOptC("");
        setOptD("");
      }
      setCorrectOption(((q.correctOption || "A").toUpperCase() as any));
    } else {
      try {
        const subs = q.subQuestionsJson ? JSON.parse(q.subQuestionsJson) : [];
        const sA = subs.find((s: any) => s.id === "a");
        const sB = subs.find((s: any) => s.id === "b");
        const sC = subs.find((s: any) => s.id === "c");
        const sD = subs.find((s: any) => s.id === "d");
        setPropA(sA?.text || "");
        setIsTrueA(sA?.isTrue ?? true);
        setPropB(sB?.text || "");
        setIsTrueB(sB?.isTrue ?? false);
        setPropC(sC?.text || "");
        setIsTrueC(sC?.isTrue ?? true);
        setPropD(sD?.text || "");
        setIsTrueD(sD?.isTrue ?? false);
      } catch {}
    }
  };

  const handleSaveQuestionToList = () => {
    if (!contentMarkdown.trim()) {
      alert("Vui lòng nhập nội dung câu hỏi.");
      return;
    }

    let built: EditorQuestion;

    if (part === 1) {
      if (!optA || !optB || !optC || !optD) {
        alert("Vui lòng nhập đủ 4 phương án A, B, C, D cho câu hỏi Phần I.");
        return;
      }

      built = {
        orderIndex: editingIndex !== null ? questions[editingIndex].orderIndex : questions.length + 1,
        part: 1,
        sectionType: "COMMON",
        topicTag,
        contentMarkdown,
        codeSnippet: codeSnippet.trim() || null,
        optionsJson: JSON.stringify([
          { id: "A", text: optA },
          { id: "B", text: optB },
          { id: "C", text: optC },
          { id: "D", text: optD },
        ]),
        correctOption,
        explanation,
      };
    } else {
      if (!propA || !propB || !propC || !propD) {
        alert("Vui lòng nhập đủ 4 mệnh đề a, b, c, d cho câu hỏi Phần II.");
        return;
      }

      built = {
        orderIndex: editingIndex !== null ? questions[editingIndex].orderIndex : questions.length + 1,
        part: 2,
        sectionType,
        topicTag,
        contentMarkdown,
        codeSnippet: codeSnippet.trim() || null,
        subQuestionsJson: JSON.stringify([
          { id: "a", text: propA, isTrue: isTrueA },
          { id: "b", text: propB, isTrue: isTrueB },
          { id: "c", text: propC, isTrue: isTrueC },
          { id: "d", text: propD, isTrue: isTrueD },
        ]),
        explanation,
      };
    }

    if (editingIndex !== null) {
      setQuestions((prev) => prev.map((item, i) => (i === editingIndex ? built : item)));
    } else {
      setQuestions((prev) => [...prev, built]);
    }

    resetQuestionForm();
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions((prev) =>
      prev
        .filter((_, i) => i !== idx)
        .map((q, newIdx) => ({ ...q, orderIndex: newIdx + 1 }))
    );
    if (editingIndex === idx) resetQuestionForm();
  };

  const handleSubmitExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề đề thi.");
      return;
    }
    if (questions.length === 0) {
      alert("Vui lòng thêm ít nhất 1 câu hỏi vào đề thi.");
      return;
    }

    setSaving(true);
    try {
      const endpoint =
        mode === "edit" && initialExam?.id
          ? `/api/admin/exams/${initialExam.id}`
          : "/api/admin/exams";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          difficulty,
          durationMinutes,
          isPublished,
          questions,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Lỗi lưu đề thi.");
        setSaving(false);
        return;
      }

      router.push("/admin/exams");
      router.refresh();
    } catch {
      alert("Lỗi kết nối máy chủ.");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/exams"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Quay lại danh sách đề thi
        </Link>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Tổng số câu: <strong className="text-blue-600 dark:text-blue-400">{questions.length}</strong> câu hỏi
        </span>
      </div>

      <form onSubmit={handleSubmitExam} className="space-y-8">
        {/* Exam Metadata Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {mode === "edit" ? "Chỉnh Sửa Đề Thi" : "Thông Tin Đề Thi Mới"}
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Tiêu đề đề thi *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="vd: Đề thi thử THPT Môn Tin học số 02 (Năm 2025)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Mô tả ngắn gọn
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Đề gồm 24 câu trắc nghiệm nhiều lựa chọn và 4 câu Đúng/Sai..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Mức độ đề thi
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="CO_BAN">Cơ bản</option>
                <option value="CHUAN_BO">Chuẩn Bộ GD&ĐT</option>
                <option value="NANG_CAO">Nâng cao</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Thời gian làm bài (Phút)
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Công khai cho học sinh
              </label>
            </div>
          </div>
        </div>

        {/* Question Creator / Editor Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {editingIndex !== null
                ? `Chỉnh Sửa Câu Số ${editingIndex + 1}`
                : `Thêm Câu Hỏi (Câu số ${questions.length + 1})`}
            </h2>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPart(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  part === 1
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                Phần I (Trắc nghiệm A,B,C,D)
              </button>
              <button
                type="button"
                onClick={() => setPart(2)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  part === 2
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                Phần II (Đúng / Sai)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Chuyên đề kiến thức
              </label>
              <select
                value={topicTag}
                onChange={(e) => setTopicTag(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TOPIC_TAGS.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {part === 2 && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Phân loại nhánh (Section Type)
                </label>
                <select
                  value={sectionType}
                  onChange={(e) => setSectionType(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COMMON">COMMON (Phần chung - 2 câu)</option>
                  <option value="CS">CS (Khoa học máy tính - Thuật toán / Python)</option>
                  <option value="ICT">ICT (Tin học ứng dụng - CSDL / SQL / Web)</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Nội dung câu hỏi (Markdown) *
            </label>
            <textarea
              rows={3}
              value={contentMarkdown}
              onChange={(e) => setContentMarkdown(e.target.value)}
              placeholder="vd: Cho đoạn mã Python sau. Hãy xác định kết quả xuất ra màn hình..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Đoạn mã code kèm theo (nếu có)
            </label>
            <textarea
              rows={3}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              placeholder="def binary_search(arr, x): ..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {part === 1 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                4 Phương án lựa chọn & Đáp án đúng *
              </label>

              {(["A", "B", "C", "D"] as const).map((opt) => {
                const val = opt === "A" ? optA : opt === "B" ? optB : opt === "C" ? optC : optD;
                const setVal =
                  opt === "A" ? setOptA : opt === "B" ? setOptB : opt === "C" ? setOptC : setOptD;
                return (
                  <div key={opt} className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={correctOption === opt}
                        onChange={() => setCorrectOption(opt)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="font-bold text-sm w-4">{opt}.</span>
                    </label>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setVal(e.target.value)}
                      placeholder={`Nội dung phương án ${opt}`}
                      className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {part === 2 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                4 Mệnh đề phát biểu & Đáp án Đúng/Sai *
              </label>

              {[
                { id: "a", text: propA, setText: setPropA, isTrue: isTrueA, setIsTrue: setIsTrueA },
                { id: "b", text: propB, setText: setPropB, isTrue: isTrueB, setIsTrue: setIsTrueB },
                { id: "c", text: propC, setText: setPropC, isTrue: isTrueC, setIsTrue: setIsTrueC },
                { id: "d", text: propD, setText: setPropD, isTrue: isTrueD, setIsTrue: setIsTrueD },
              ].map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="font-bold text-sm w-4 text-indigo-700 dark:text-indigo-400">{p.id})</span>
                  <input
                    type="text"
                    value={p.text}
                    onChange={(e) => p.setText(e.target.value)}
                    placeholder={`Nội dung mệnh đề ${p.id}`}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => p.setIsTrue(true)}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        p.isTrue ? "bg-emerald-600 text-white" : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      Đúng
                    </button>
                    <button
                      type="button"
                      onClick={() => p.setIsTrue(false)}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        !p.isTrue ? "bg-rose-600 text-white" : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      Sai
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Lời giải chi tiết
            </label>
            <input
              type="text"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Giải thích vì sao đáp án này đúng..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveQuestionToList}
              className="flex-1 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              {editingIndex !== null
                ? `Cập nhật câu số ${editingIndex + 1}`
                : "Thêm câu này vào danh sách đề thi"}
            </button>
            {editingIndex !== null && (
              <button
                type="button"
                onClick={resetQuestionForm}
                className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm"
              >
                Hủy sửa
              </button>
            )}
          </div>
        </div>

        {/* Added Questions List Preview */}
        {questions.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Danh Sách Câu Hỏi Trong Đề ({questions.length} câu)
            </h3>
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-xl border text-xs ${
                    editingIndex === idx
                      ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30"
                      : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                  }`}
                >
                  <div className="space-y-1 flex-1 pr-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      Câu {idx + 1} (
                      {q.part === 1 ? "Phần I - Trắc nghiệm" : `Phần II - ${q.sectionType}`})
                      {q.topicTag ? ` • ${q.topicTag}` : ""}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 line-clamp-1">
                      {q.contentMarkdown}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleLoadQuestionForEdit(idx)}
                      title="Sửa câu hỏi"
                      className="p-1.5 text-slate-500 hover:text-blue-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(idx)}
                      title="Xóa câu hỏi"
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Entire Exam Button */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/exams"
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Hủy bỏ
          </Link>
          <button
            type="submit"
            disabled={saving || questions.length === 0}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving
              ? "Đang lưu đề..."
              : mode === "edit"
              ? `Lưu Thay Đổi (${questions.length} câu)`
              : `Hoàn tất & Lưu Đề (${questions.length} câu)`}
          </button>
        </div>
      </form>
    </div>
  );
}
