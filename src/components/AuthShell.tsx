import Link from "next/link";
import {
  Cloud,
  Cpu,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Cloud,
    title: "Đồng bộ tiến trình mọi thiết bị",
    desc: "Bài lý thuyết đã học, video đã xem và lịch sử làm bài được lưu trữ an toàn theo tài khoản.",
  },
  {
    icon: Target,
    title: "Lộ trình cá nhân hóa CS / ICT",
    desc: "Tự động phân tích điểm yếu theo 3 dạng câu hỏi và gợi ý bài cần ôn tập lại.",
  },
  {
    icon: FileCheck2,
    title: "Phòng thi thử 50 phút chuẩn Bộ",
    desc: "Lưu lịch sử thi thử, bảng điểm chi tiết và theo dõi sự tiến bộ qua từng đề.",
  },
  {
    icon: ShieldCheck,
    title: "Chuyển tiếp dữ liệu liền mạch",
    desc: "Tiến trình học thử trước khi đăng ký được tự động gộp vào tài khoản mới.",
  },
];

interface AuthShellProps {
  badge: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthShell({
  badge,
  title,
  subtitle,
  children,
}: AuthShellProps) {
  return (
    <div className="relative overflow-hidden py-10 lg:py-14">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="container-page relative grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Brand & Benefits Panel */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-card px-3.5 py-2 shadow-sm"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white">
              <Cpu className="h-4 w-4" />
            </span>
            <span className="leading-none">
              <span className="block font-heading text-sm font-extrabold text-foreground">
                IT Master <span className="text-primary">THPT</span>
              </span>
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                Tin học GDPT 2018
              </span>
            </span>
          </Link>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-bold text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              {badge}
            </span>
            <h1 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {BENEFITS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card/80 p-3.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-2.5 rounded-2xl border border-border bg-card p-3.5 text-center">
            <div>
              <p className="font-heading text-lg font-extrabold text-foreground">33</p>
              <p className="text-[11px] text-muted-foreground">Bài lý thuyết</p>
            </div>
            <div className="border-x border-border">
              <p className="font-heading text-lg font-extrabold text-primary">89</p>
              <p className="text-[11px] text-muted-foreground">Video bài giảng</p>
            </div>
            <div>
              <p className="font-heading text-lg font-extrabold text-foreground">660+</p>
              <p className="text-[11px] text-muted-foreground">Câu luyện tập</p>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/30">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
