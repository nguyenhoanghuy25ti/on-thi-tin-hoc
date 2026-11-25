"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
  Search,
  Video,
  Youtube,
} from "lucide-react";
import GradeTabs from "@/components/GradeTabs";
import { getCurriculumByGrade } from "@/lib/curriculum";
import {
  ALL_VIDEOS,
  GRADE_VIDEO_COUNTS,
  VideoLesson,
  getVideosByGrade,
} from "@/lib/videos";
import { markVideoWatched, toggleVideoWatched, useProgress } from "@/lib/progress";

function VideosContent() {
  const searchParams = useSearchParams();
  const gradeParam = searchParams.get("grade") || "10";
  const curriculum = getCurriculumByGrade(gradeParam);
  const { isVideoWatched } = useProgress();

  const [query, setQuery] = useState("");
  const [watchFilter, setWatchFilter] = useState<"all" | "unwatched" | "watched">("all");

  const gradeVideos = getVideosByGrade(curriculum.grade);
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(
    () => gradeVideos[0] || null
  );
  const playerRef = useRef<HTMLDivElement | null>(null);

  // Sync default video when switching grade tabs
  useEffect(() => {
    const list = getVideosByGrade(curriculum.grade);
    setSelectedVideo(list[0] || null);
    setQuery("");
  }, [curriculum.grade]);

  const watchedInGrade = gradeVideos.filter((v) => isVideoWatched(v.id)).length;
  const gradePct = gradeVideos.length
    ? Math.round((watchedInGrade / gradeVideos.length) * 100)
    : 0;

  const filteredVideos = gradeVideos.filter((v) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || String(v.number).includes(q) || v.title.toLowerCase().includes(q);
    if (!matchesQuery) return false;
    const watched = isVideoWatched(v.id);
    if (watchFilter === "watched") return watched;
    if (watchFilter === "unwatched") return !watched;
    return true;
  });

  const handleSelectVideo = (video: VideoLesson) => {
    markVideoWatched(video.id);
    setSelectedVideo(video);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const currentIndex = selectedVideo
    ? gradeVideos.findIndex((v) => v.id === selectedVideo.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < gradeVideos.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      const prev = gradeVideos[currentIndex - 1];
      markVideoWatched(prev.id);
      setSelectedVideo(prev);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const next = gradeVideos[currentIndex + 1];
      markVideoWatched(next.id);
      setSelectedVideo(next);
    }
  };

  return (
    <div className="container-page py-10 lg:py-12 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-bold text-accent-foreground">
              <Video className="h-3.5 w-3.5" />
              KHO VIDEO BÀI GIẢNG · {ALL_VIDEOS.length} BÀI HỌC
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Video bài giảng SGK Kết nối tri thức
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Trình phát YouTube nhúng trực tiếp ngay trên trang cho từng bài học môn Tin học Lớp {curriculum.grade}. Chọn bài giảng bên dưới để phát và tự động lưu tiến độ.
            </p>
          </div>

          <div className="w-full lg:w-72 rounded-2xl border border-border bg-background p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">
                Tiến độ xem Khối {curriculum.grade}
              </span>
              <span className="font-mono font-bold text-primary">
                {watchedInGrade}/{GRADE_VIDEO_COUNTS[curriculum.grade]} ({gradePct}%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 transition-all duration-500"
                style={{ width: `${gradePct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <GradeTabs basePath="/videos" activeGrade={curriculum.grade} />

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex rounded-xl border border-border bg-background p-1 text-xs font-semibold">
              {[
                { key: "all", label: "Tất cả" },
                { key: "unwatched", label: "Chưa xem" },
                { key: "watched", label: "Đã xem" },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setWatchFilter(t.key as any)}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    watchFilter === t.key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="relative flex-1 md:flex-none">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm tên bài hoặc số bài..."
                className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-xs text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/60 md:w-56"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inline Responsive YouTube Player */}
      {selectedVideo && (
        <section
          ref={playerRef}
          className="scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-card shadow-md"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-accent-foreground">
                  {selectedVideo.id} · Lớp {selectedVideo.grade}
                </span>
                <span className="text-xs text-muted-foreground">
                  {selectedVideo.subtitle}
                </span>
              </div>
              <h2 className="mt-1 font-heading text-base font-bold text-foreground sm:text-xl">
                {selectedVideo.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => toggleVideoWatched(selectedVideo.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                  isVideoWatched(selectedVideo.id)
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-border bg-background text-foreground hover:border-primary/50"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {isVideoWatched(selectedVideo.id) ? "Đã xem bài này" : "Đánh dấu đã xem"}
              </button>

              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:text-primary"
              >
                <Youtube className="h-3.5 w-3.5 text-rose-500" />
                Mở YouTube
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="aspect-video w-full bg-black">
            <iframe
              key={selectedVideo.id}
              src={selectedVideo.embedUrl}
              title={`${selectedVideo.title} · ${selectedVideo.subtitle}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-background/60 border-t border-border">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition hover:border-primary/50 disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Bài trước
            </button>

            <span className="font-mono text-xs text-muted-foreground">
              Bài {currentIndex + 1} / {gradeVideos.length} · Lớp {curriculum.grade}
            </span>

            <button
              type="button"
              disabled={!hasNext}
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-105 disabled:opacity-40"
            >
              Bài tiếp theo
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* Video Cards Grid with Real YouTube Thumbnails */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => {
          const watched = isVideoWatched(video.id);
          const isCurrent = selectedVideo?.id === video.id;
          const thumbUrl = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;

          return (
            <div
              key={video.id}
              className={`group flex flex-col overflow-hidden rounded-2xl border bg-card transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isCurrent
                  ? "border-primary ring-2 ring-primary/20"
                  : watched
                  ? "border-emerald-500/40"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => handleSelectVideo(video)}
                className="relative aspect-video w-full overflow-hidden bg-slate-900 text-left"
              >
                <img
                  src={thumbUrl}
                  alt={video.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                <span className="absolute left-3 top-3 rounded-lg bg-black/70 px-2.5 py-1 font-mono text-[10.5px] font-bold text-white backdrop-blur-sm">
                  BÀI {String(video.number).padStart(2, "0")}
                </span>

                {isCurrent ? (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-[10.5px] font-bold text-white backdrop-blur-sm">
                    Đang phát
                  </span>
                ) : (
                  watched && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-emerald-600/90 px-2.5 py-1 text-[10.5px] font-bold text-white backdrop-blur-sm">
                      <CheckCircle2 className="h-3 w-3" />
                      Đã xem
                    </span>
                  )
                )}

                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/95 text-white shadow-xl transition group-hover:scale-110">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </span>
              </button>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{video.id}</span>
                    <span>Tin học {video.grade} · KNTT</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectVideo(video)}
                    className="mt-1.5 text-left font-heading text-[15px] font-bold leading-snug text-foreground transition group-hover:text-primary line-clamp-2"
                  >
                    {video.title}
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <button
                    type="button"
                    onClick={() => handleSelectVideo(video)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <Play className="h-3.5 w-3.5" />
                    {isCurrent ? "Đang chọn phát" : "Phát bài giảng"}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleVideoWatched(video.id)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                      watched
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {watched ? "✓ Đã xong" : "Đánh dấu xong"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVideos.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          Không tìm thấy video phù hợp với bộ lọc hiện tại.
        </div>
      )}
    </div>
  );
}

export default function VideosPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-14 text-sm text-muted-foreground">
          Đang tải danh sách video...
        </div>
      }
    >
      <VideosContent />
    </Suspense>
  );
}
