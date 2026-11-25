import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BookOpen, Layers, ArrowRight, Brain, Database, Globe, Network, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

const GRADE_FILTERS = [
  { key: "ALL", label: "Tất cả" },
  { key: "10", label: "Lớp 10" },
  { key: "11", label: "Lớp 11" },
  { key: "12", label: "Lớp 12" },
  { key: "CS", label: "Nhánh CS" },
  { key: "ICT", label: "Nhánh ICT" },
];

export default async function LearnPage({
  searchParams,
}: {
  searchParams?: { grade?: string };
}) {
  const activeGrade = searchParams?.grade?.toUpperCase() || "ALL";

  const topics = await prisma.topic.findMany({
    orderBy: { orderIndex: "asc" },
    include: {
      lessons: {
        orderBy: { orderIndex: "asc" },
      },
    },
  });

  const filteredTopics = topics
    .map((topic) => {
      if (activeGrade === "ALL") return topic;
      const matchingLessons = topic.lessons.filter((l) => {
        const cat = l.category.toUpperCase();
        if (activeGrade === "10") return cat.includes("10") || l.slug.includes("python");
        if (activeGrade === "11") return cat.includes("11") || cat.includes("CS") || cat.includes("ICT");
        if (activeGrade === "12") return cat.includes("12");
        return cat.includes(activeGrade);
      });
      return { ...topic, lessons: matchingLessons };
    })
    .filter((t) => t.lessons.length > 0);

  const getTopicIcon = (slug: string) => {
    if (slug.includes("ai")) return Brain;
    if (slug.includes("mang")) return Network;
    if (slug.includes("dao-duc") || slug.includes("phap-luat")) return ShieldCheck;
    if (slug.includes("web") || slug.includes("html")) return Globe;
    if (slug.includes("du-lieu") || slug.includes("sql")) return Database;
    return BookOpen;
  };

  return (
    <div className="hallmark-container py-10 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-subtle)] text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Thư viện bài học & Flashcard
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Chuyên Đề Trọng Tâm Tin Học 10, 11, 12
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          Tổng hợp kiến thức cốt lõi theo Chương trình GDPT 2018. Kết hợp bài giảng Markdown chi tiết và bộ Flashcard lật thẻ giúp ghi nhớ nhanh cú pháp HTML, SQL và Python.
        </p>

        {/* Grade & Orientation Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {GRADE_FILTERS.map((f) => {
            const isActive = activeGrade === f.key;
            return (
              <Link
                key={f.key}
                href={f.key === "ALL" ? "/learn" : `/learn?grade=${f.key}`}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  isActive
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>
      </div>

      {filteredTopics.length === 0 ? (
        <div className="hallmark-surface p-12 text-center text-sm text-[var(--text-muted)]">
          Chưa có bài học nào trong mục lọc này.{" "}
          <Link href="/learn" className="text-blue-600 font-semibold hover:underline">
            Xem tất cả chuyên đề
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, index) => {
            const Icon = getTopicIcon(topic.slug);
            const totalFlashcards = topic.lessons.reduce((acc, lesson) => {
              try {
                const cards = JSON.parse(lesson.flashcardsJson);
                return acc + (Array.isArray(cards) ? cards.length : 0);
              } catch {
                return acc;
              }
            }, 0);

            return (
              <div
                key={topic.id}
                className="hallmark-surface flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-lg bg-[var(--accent-subtle)] text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                      Chủ đề {index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-2 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--border)] space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      Bài học ({topic.lessons.length})
                    </div>
                    {topic.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/learn/${lesson.slug}`}
                        className="block text-xs font-medium text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 py-1 transition-colors truncate"
                      >
                        • {lesson.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[var(--bg-subtle)] border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[var(--text-muted)] font-medium">
                    <Layers className="w-3.5 h-3.5 text-amber-500" />
                    <span>{totalFlashcards} Flashcards</span>
                  </div>

                  {topic.lessons[0] && (
                    <Link
                      href={`/learn/${topic.lessons[0].slug}`}
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Vào học ngay
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
