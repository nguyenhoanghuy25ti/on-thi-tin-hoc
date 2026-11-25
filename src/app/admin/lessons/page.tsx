"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  PlusCircle,
  Pencil,
  Trash2,
  ArrowLeft,
  Save,
  X,
  Layers,
} from "lucide-react";

interface Topic {
  id: string;
  title: string;
  slug: string;
}

interface Lesson {
  id: string;
  topicId: string;
  title: string;
  slug: string;
  category: string;
  contentMarkdown: string;
  flashcardsJson: string;
  orderIndex: number;
  topic?: { title: string; slug: string };
}

export default function AdminLessonsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const [topicId, setTopicId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Lớp 12");
  const [orderIndex, setOrderIndex] = useState(1);
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [flashcardsText, setFlashcardsText] = useState("[]");
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("/api/admin/lessons");
      const data = await res.json();
      if (data.topics) setTopics(data.topics);
      if (data.lessons) setLessons(data.lessons);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingLesson(null);
    setTopicId(topics[0]?.id || "");
    setTitle("");
    setSlug("");
    setCategory("Lớp 12");
    setOrderIndex(lessons.length + 1);
    setContentMarkdown("# Tiêu đề bài giảng\n\n## 1. Nội dung chính\n");
    setFlashcardsText(
      JSON.stringify(
        [{ id: "fc-1", front: "Khái niệm...", back: "Định nghĩa...", tag: "Lý thuyết" }],
        null,
        2
      )
    );
    setModalOpen(true);
  };

  const openEditModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setTopicId(lesson.topicId);
    setTitle(lesson.title);
    setSlug(lesson.slug);
    setCategory(lesson.category);
    setOrderIndex(lesson.orderIndex);
    setContentMarkdown(lesson.contentMarkdown);
    try {
      setFlashcardsText(JSON.stringify(JSON.parse(lesson.flashcardsJson), null, 2));
    } catch {
      setFlashcardsText(lesson.flashcardsJson || "[]");
    }
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      JSON.parse(flashcardsText);
    } catch {
      alert("JSON Flashcards không hợp lệ. Vui lòng kiểm tra lại cú pháp.");
      return;
    }

    setSaving(true);
    try {
      const url = editingLesson
        ? `/api/admin/lessons/${editingLesson.id}`
        : "/api/admin/lessons";
      const method = editingLesson ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId,
          title,
          slug,
          category,
          orderIndex,
          contentMarkdown,
          flashcardsJson: flashcardsText,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Lỗi lưu bài giảng.");
        setSaving(false);
        return;
      }

      setModalOpen(false);
      setSaving(false);
      loadData();
    } catch {
      alert("Lỗi kết nối máy chủ.");
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, lessonTitle: string) => {
    if (!confirm(`Xóa bài giảng "${lessonTitle}"?`)) return;
    const res = await fetch(`/api/admin/lessons/${id}`, { method: "DELETE" });
    if (res.ok) {
      setLessons((prev) => prev.filter((l) => l.id !== id));
    } else {
      alert("Không thể xóa bài giảng.");
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
            Quản Lý Bài Giảng & Flashcards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Thêm mới, chỉnh sửa nội dung lý thuyết Markdown và bộ thẻ Flashcard ôn tập.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Thêm bài giảng mới
        </button>
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
                  <th className="px-6 py-4 text-left">Tiêu đề bài giảng</th>
                  <th className="px-6 py-4 text-left">Chủ đề</th>
                  <th className="px-6 py-4 text-center">Phân loại</th>
                  <th className="px-6 py-4 text-center">Flashcards</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {lessons.map((l) => {
                  let fcCount = 0;
                  try {
                    const parsed = JSON.parse(l.flashcardsJson);
                    fcCount = Array.isArray(parsed) ? parsed.length : 0;
                  } catch {}
                  return (
                    <tr key={l.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white">{l.title}</div>
                        <div className="text-[11px] font-mono text-slate-400">/{l.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300">
                        {l.topic?.title}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          {l.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                          <Layers className="w-3.5 h-3.5" />
                          {fcCount} thẻ
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/learn/${l.slug}`}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                          >
                            Xem
                          </Link>
                          <button
                            onClick={() => openEditModal(l)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                            title="Sửa bài giảng"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(l.id, l.title)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                            title="Xóa bài giảng"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4 my-8"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                {editingLesson ? "Chỉnh Sửa Bài Giảng" : "Thêm Bài Giảng Mới"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Chủ đề *
                </label>
                <select
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                >
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Phân loại (Khối / Nhánh)
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Tiêu đề bài học *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Slug URL *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="vd: bai-moi-html-css"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Nội dung bài giảng (Markdown) *
              </label>
              <textarea
                rows={8}
                required
                value={contentMarkdown}
                onChange={(e) => setContentMarkdown(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Danh sách Flashcards (JSON Array)
              </label>
              <textarea
                rows={5}
                value={flashcardsText}
                onChange={(e) => setFlashcardsText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-xs"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
              >
                <Save className="w-4 h-4" />
                {saving ? "Đang lưu..." : "Lưu bài giảng"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
