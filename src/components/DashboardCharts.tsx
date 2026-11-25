"use client";

import Link from "next/link";
import { TrendingUp, Target, AlertCircle, BookOpen } from "lucide-react";

export interface ScorePoint {
  attemptId: string;
  label: string;
  examTitle: string;
  totalScore: number;
  part1Score: number;
  part2Score: number;
  dateLabel: string;
}

export interface TopicAccuracyStat {
  topic: string;
  correct: number;
  total: number;
  percentage: number;
  lessonSlug?: string;
}

export default function DashboardCharts({
  scorePoints,
  topicStats,
}: {
  scorePoints: ScorePoint[];
  topicStats: TopicAccuracyStat[];
}) {
  // SVG line chart dimensions
  const width = 640;
  const height = 220;
  const padLeft = 36;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 34;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const points = scorePoints.map((pt, idx) => {
    const x =
      scorePoints.length === 1
        ? padLeft + plotW / 2
        : padLeft + (idx / (scorePoints.length - 1)) * plotW;
    const y = padTop + plotH - (Math.min(10, Math.max(0, pt.totalScore)) / 10) * plotH;
    return { ...pt, x, y };
  });

  const linePath =
    points.length > 1
      ? points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
      : "";

  const areaPath =
    points.length > 1
      ? `${linePath} L ${points[points.length - 1].x} ${padTop + plotH} L ${points[0].x} ${padTop + plotH} Z`
      : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Score Progression */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Biểu Đồ Điểm Số Qua Các Lần Thi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Thang điểm 10 (Tổng hợp từ {scorePoints.length} lần thi gần nhất)
            </p>
          </div>
        </div>

        {scorePoints.length === 0 ? (
          <div className="h-52 flex items-center justify-center text-xs text-slate-400">
            Hoàn thành ít nhất 1 bài thi để hiển thị biểu đồ tiến bộ.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[420px]">
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal grid lines (0, 2.5, 5, 7.5, 10) */}
              {[0, 2.5, 5, 7.5, 10].map((val) => {
                const y = padTop + plotH - (val / 10) * plotH;
                return (
                  <g key={val}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={width - padRight}
                      y2={y}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padLeft - 8}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-slate-400 text-[10px] font-mono"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {areaPath && <path d={areaPath} fill="url(#scoreGrad)" />}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {points.map((p) => (
                <g key={p.attemptId}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="5.5"
                    className="fill-blue-600 stroke-white dark:stroke-slate-900"
                    strokeWidth="2"
                  />
                  <text
                    x={p.x}
                    y={p.y - 10}
                    textAnchor="middle"
                    className="fill-slate-800 dark:fill-slate-100 text-[11px] font-bold"
                  >
                    {p.totalScore.toFixed(2)}
                  </text>
                  <text
                    x={p.x}
                    y={height - 10}
                    textAnchor="middle"
                    className="fill-slate-500 dark:fill-slate-400 text-[10px]"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        )}
      </div>

      {/* Chart 2: Topic Accuracy Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            Tỷ Lệ Chính Xác Theo Chuyên Đề
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Phát hiện các mảng kiến thức còn yếu để ưu tiên ôn tập lại lý thuyết.
          </p>
        </div>

        {topicStats.length === 0 ? (
          <div className="h-52 flex items-center justify-center text-xs text-slate-400">
            Chưa có dữ liệu phân tích chuyên đề.
          </div>
        ) : (
          <div className="space-y-3.5">
            {topicStats.map((stat) => {
              const isWeak = stat.percentage < 60;
              const barColor =
                stat.percentage >= 80
                  ? "bg-emerald-500"
                  : stat.percentage >= 60
                  ? "bg-blue-500"
                  : "bg-rose-500";

              return (
                <div key={stat.topic} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                      <span>{stat.topic}</span>
                      {isWeak && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-[10px] font-bold">
                          <AlertCircle className="w-3 h-3" />
                          Cần ôn thêm
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 dark:text-slate-400 font-mono">
                        {stat.correct}/{stat.total} ý ({stat.percentage}%)
                      </span>
                      {isWeak && stat.lessonSlug && (
                        <Link
                          href={`/learn/${stat.lessonSlug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <BookOpen className="w-3 h-3" />
                          Ôn bài
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${barColor}`}
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
