"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookOpen,
  Layers,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  ArrowLeft,
} from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Flashcard } from "@/lib/types";

export default function LessonDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"theory" | "flashcards">("theory");

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    fetch(`/api/lessons/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.lesson) {
          setLesson(data.lesson);
          try {
            const parsed = JSON.parse(data.lesson.flashcardsJson);
            setCards(parsed);
          } catch {
            setCards([]);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-sm text-slate-500">Đang tải bài giảng...</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Không tìm thấy bài học</h2>
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-blue-600 font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh mục chuyên đề
        </Link>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tất cả chuyên đề
        </Link>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
          {lesson.category}
        </span>
      </div>

      <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Chủ đề: <strong className="text-slate-700 dark:text-slate-200">{lesson.topic?.title}</strong>
        </p>

        <div className="flex gap-2 pt-4">
          <button
            onClick={() => setActiveTab("theory")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "theory"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Nội dung lý thuyết
          </button>

          <button
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "flashcards"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Layers className="w-4 h-4" />
            Flashcard lật thẻ ({cards.length})
          </button>
        </div>
      </div>

      {activeTab === "theory" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
          <MarkdownRenderer content={lesson.contentMarkdown} />
        </div>
      )}

      {activeTab === "flashcards" && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {cards.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              Chưa có flashcard cho bài học này.
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <div>
                  Thẻ số: <strong className="text-slate-900 dark:text-white">{currentIndex + 1}</strong> / {cards.length}
                </div>
                <button
                  onClick={handleShuffle}
                  title="Xáo trộn thứ tự thẻ"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  Trộn thẻ
                </button>
              </div>

              <div
                onClick={toggleFlip}
                className="cursor-pointer min-h-[300px] sm:min-h-[340px] perspective-1000 group select-none"
              >
                <div
                  className={`w-full h-full min-h-[300px] sm:min-h-[340px] rounded-3xl transition-transform duration-500 transform-style-3d shadow-xl relative border ${
                    isFlipped
                      ? "rotate-y-180 bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-indigo-700"
                      : "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {!isFlipped ? (
                    <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between backface-hidden">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          {currentCard.tag || "Khái niệm"}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <RotateCcw className="w-3.5 h-3.5" />
                          Bấm để lật xem đáp án
                        </span>
                      </div>

                      <div className="text-xl sm:text-2xl font-bold text-center text-slate-800 dark:text-slate-100 my-auto leading-relaxed">
                        {currentCard.front}
                      </div>

                      <div className="text-center text-xs text-slate-400">
                        Mặt trước câu hỏi
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between rotate-y-180 backface-hidden">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200">
                          Giải thích & Đáp án
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <RotateCcw className="w-3.5 h-3.5" />
                          Bấm để lật lại
                        </span>
                      </div>

                      <div className="text-base sm:text-lg font-medium text-center text-slate-100 my-auto leading-relaxed">
                        {currentCard.back}
                      </div>

                      <div className="text-center text-xs text-indigo-300 font-semibold">
                        Mặt sau lời giải
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={handlePrevCard}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Thẻ trước
                </button>

                <button
                  onClick={toggleFlip}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  {isFlipped ? "Xem câu hỏi" : "Lật thẻ"}
                </button>

                <button
                  onClick={handleNextCard}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm transition-all"
                >
                  Thẻ tiếp theo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
