"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Cloud,
  CloudUpload,
  Database,
  Eye,
  EyeOff,
  FileCheck2,
  LayoutDashboard,
  Loader2,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Sparkles,
  Target,
  TrendingUp,
  User,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { TOTAL_LESSONS_COUNT } from "@/lib/curriculum";
import { evaluatePasswordStrength } from "@/lib/password-strength";
import { hasProgressData, readGuestProgress, useProgress } from "@/lib/progress";
import { TOTAL_VIDEOS_COUNT } from "@/lib/videos";

const ACCOUNT_BENEFITS = [
  {
    icon: Cloud,
    title: "Đồng bộ tiến trình đa thiết bị",
    desc: "Lưu toàn bộ bài lý thuyết, video đã xem và kết quả luyện tập.",
  },
  {
    icon: FileCheck2,
    title: "Sẵn sàng vào phòng thi thử 50 phút",
    desc: "Mở khóa ngay kho đề chuẩn Bộ GD&ĐT và lưu lịch sử làm bài.",
  },
  {
    icon: Target,
    title: "Cá nhân hóa lộ trình CS / ICT",
    desc: "Theo dõi điểm mạnh, điểm yếu và gợi ý bài cần ôn tập lại.",
  },
];

const INPUT_CLASS =
  "w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

/**
 * Inline account registration & sign-in bento card embedded on the homepage.
 */
export default function HomeAccountSection() {
  const router = useRouter();
  const { user, loading: authLoading, refreshUser, logout } = useAuth();
  const { doneCount, watchedVideosCount, practice, averageScore } = useProgress();

  const [mode, setMode] = useState<"register" | "login">("register");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [justAuthenticated, setJustAuthenticated] = useState(false);

  // Register fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [orientationPreference, setOrientationPreference] = useState<"CS" | "ICT">("ICT");
  const [focusGrade, setFocusGrade] = useState<number>(12);
  const [targetScore, setTargetScore] = useState<number>(8.5);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [guestSummary, setGuestSummary] = useState<{
    lessons: number;
    videos: number;
    practice: number;
  } | null>(null);

  useEffect(() => {
    const guest = readGuestProgress();
    if (hasProgressData(guest)) {
      setGuestSummary({
        lessons: Object.keys(guest.lessons).length,
        videos: Object.keys(guest.videos).length,
        practice: guest.practice.length,
      });
      if (guest.profile.studentName && guest.profile.studentName !== "Bạn học sinh") {
        setName((prev) => prev || guest.profile.studentName);
      }
      setOrientationPreference(guest.profile.track);
      setFocusGrade(guest.profile.focusGrade);
      setTargetScore(guest.profile.targetScore);
    }
  }, []);

  const strength = useMemo(() => evaluatePasswordStrength(password), [password]);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const switchMode = (nextMode: "register" | "login") => {
    setMode(nextMode);
    setError("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Họ và tên cần có ít nhất 2 ký tự.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu cần tối thiểu 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setSubmitting(true);
    try {
      const guestProgress = readGuestProgress();
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          orientationPreference,
          focusGrade,
          targetScore,
          initialProgress: hasProgressData(guestProgress) ? guestProgress : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đăng ký thất bại.");
        setSubmitting(false);
        return;
      }

      if (typeof window !== "undefined") {
        window.localStorage.removeItem("tinhoc-progress-v1");
      }

      await refreshUser();
      setJustAuthenticated(true);
      setSubmitting(false);
      router.refresh();
    } catch {
      setError("Không thể kết nối máy chủ. Vui lòng thử lại.");
      setSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại.");
        setSubmitting(false);
        return;
      }

      await refreshUser({ mergeGuest: true });
      setJustAuthenticated(true);
      setSubmitting(false);
      router.refresh();
    } catch {
      setError("Lỗi kết nối máy chủ. Vui lòng thử lại.");
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <section id="tai-khoan" className="scroll-mt-20 border-y border-border bg-card/60 py-16">
        <div className="container-page">
          <div className="h-72 animate-pulse rounded-3xl border border-border bg-card" />
        </div>
      </section>
    );
  }

  if (user) {
    return (
      <section id="tai-khoan" className="scroll-mt-20 border-y border-border bg-card/60 py-16">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-card p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  <Cloud className="h-3.5 w-3.5" />
                  {justAuthenticated
                    ? "TẠO TÀI KHOẢN & ĐỒNG BỘ THÀNH CÔNG"
                    : "TÀI KHOẢN ĐANG HOẠT ĐỘNG"}
                </div>

                <h2 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  Xin chào, {user.name}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hồ sơ học tập của bạn (<span className="font-mono text-foreground">{user.email}</span>) đã được kết nối đồng bộ. Hiện tại bạn đã hoàn thành{" "}
                  <strong className="text-foreground">{doneCount}/{TOTAL_LESSONS_COUNT}</strong> bài lý thuyết,{" "}
                  <strong className="text-foreground">{watchedVideosCount}/{TOTAL_VIDEOS_COUNT}</strong> video và{" "}
                  <strong className="text-foreground">{practice.length}</strong> lượt luyện tập (TB{" "}
                  <strong className="text-primary">{averageScore}%</strong>).
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-bold text-accent-foreground">
                    Định hướng {user.orientationPreference || "ICT"}
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 font-mono text-[11px] font-semibold text-muted-foreground">
                    {user.role === "ADMIN" ? "Quản trị viên" : "Học sinh THPT"}
                  </span>
                  <button
                    type="button"
                    onClick={async () => {
                      await logout();
                      setJustAuthenticated(false);
                      router.refresh();
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 font-mono text-[11px] font-semibold text-destructive transition hover:bg-destructive/15"
                  >
                    <LogOut className="h-3 w-3" />
                    Đăng xuất
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-[460px] shrink-0">
                <Link
                  href="/exams"
                  className="group flex flex-col justify-between rounded-2xl border border-primary/30 bg-accent/60 p-4 transition hover:-translate-y-0.5 hover:border-primary"
                >
                  <FileCheck2 className="h-5 w-5 text-primary" />
                  <div className="mt-4">
                    <p className="text-xs font-bold text-foreground">Phòng thi thử</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      Làm đề 50p <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                    </p>
                  </div>
                </Link>

                <Link
                  href="/progress"
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-4 transition hover:-translate-y-0.5 hover:border-primary/50"
                >
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div className="mt-4">
                    <p className="text-xs font-bold text-foreground">Tiến trình học</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground group-hover:text-primary">
                      Xem chi tiết <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                    </p>
                  </div>
                </Link>

                <Link
                  href="/dashboard"
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-4 transition hover:-translate-y-0.5 hover:border-primary/50"
                >
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  <div className="mt-4">
                    <p className="text-xs font-bold text-foreground">Thống kê thi</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground group-hover:text-primary">
                      Hồ sơ điểm <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tai-khoan" className="scroll-mt-20 border-y border-border bg-card/60 py-16">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/5 dark:shadow-black/25">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Info & Benefits Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] font-bold text-accent-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  TÀI KHOẢN HỌC TẬP · MIỄN PHÍ 100%
                </span>
                <h2 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
                  Tạo tài khoản ngay trên trang chủ để lưu trọn tiến trình
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Đăng ký nhanh trong 20 giây để đồng bộ bài đã học, video đã xem và mở khóa phòng thi thử 50 phút chuẩn Bộ GD&ĐT.
                </p>
              </div>

              {guestSummary && (
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-800 dark:text-emerald-200">
                  <CloudUpload className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="font-bold">Có sẵn dữ liệu học tạm trên trình duyệt này</p>
                    <p className="mt-0.5 opacity-90">
                      {guestSummary.lessons} bài lý thuyết · {guestSummary.videos} video ·{" "}
                      {guestSummary.practice} lượt luyện tập sẽ tự động gộp vào tài khoản mới.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {ACCOUNT_BENEFITS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-3.5"
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
            </div>

            {/* Right Interactive Registration / Login Form */}
            <div className="lg:col-span-7 rounded-2xl border border-border bg-background/80 p-5 sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div className="inline-flex rounded-xl border border-border bg-card p-1">
                  <button
                    type="button"
                    onClick={() => switchMode("register")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                      mode === "register"
                        ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Tạo tài khoản
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                      mode === "login"
                        ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Đăng nhập
                  </button>
                </div>

                <span className="font-mono text-[11px] text-muted-foreground">
                  {mode === "register" ? "Đồng bộ tức thì" : "Tiếp tục lộ trình"}
                </span>
              </div>

              {error && (
                <div className="mb-4 flex items-center gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs font-medium text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {mode === "register" ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Họ và tên
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nguyễn Văn An"
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Email đăng nhập
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="hocsinh@gmail.com"
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Mật khẩu
                      </label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Tối thiểu 6 ký tự"
                          className={`${INPUT_CLASS} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                          className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {password.length > 0 && (
                        <div className="mt-1.5 space-y-1">
                          <div className="grid grid-cols-4 gap-1">
                            {[1, 2, 3, 4].map((step) => (
                              <div
                                key={step}
                                className={`h-1 rounded-full transition-colors ${
                                  strength.score >= step ? strength.color : "bg-secondary"
                                }`}
                              />
                            ))}
                          </div>
                          <p className={`text-[11px] font-medium ${strength.textColor}`}>
                            {strength.label}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Xác nhận mật khẩu
                      </label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type={showConfirm ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Nhập lại mật khẩu"
                          className={`w-full rounded-xl border bg-background py-2.5 pl-10 pr-10 text-sm text-foreground outline-none transition focus:ring-2 ${
                            passwordsMismatch
                              ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                              : "border-border focus:border-primary focus:ring-primary/20"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((prev) => !prev)}
                          aria-label={showConfirm ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"}
                          className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {passwordsMatch && (
                        <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Mật khẩu khớp
                        </p>
                      )}
                      {passwordsMismatch && (
                        <p className="mt-1.5 text-[11px] font-medium text-destructive">
                          Mật khẩu xác nhận chưa khớp
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Compact Orientation & Grade row */}
                  <div className="grid gap-3.5 rounded-xl border border-border bg-card/70 p-3.5 sm:grid-cols-12">
                    <div className="sm:col-span-7">
                      <span className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                        Định hướng thi
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setOrientationPreference("ICT")}
                          className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs font-semibold transition ${
                            orientationPreference === "ICT"
                              ? "border-primary bg-accent text-accent-foreground"
                              : "border-border bg-background text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Database className="h-3.5 w-3.5 shrink-0 text-primary" />
                          <span className="truncate">ICT · Ứng dụng</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrientationPreference("CS")}
                          className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs font-semibold transition ${
                            orientationPreference === "CS"
                              ? "border-primary bg-accent text-accent-foreground"
                              : "border-border bg-background text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Brain className="h-3.5 w-3.5 shrink-0 text-primary" />
                          <span className="truncate">CS · Khoa học MT</span>
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-5">
                      <span className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                        Khối lớp
                      </span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[10, 11, 12].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setFocusGrade(g)}
                            className={`rounded-lg border py-2 text-xs font-semibold transition ${
                              focusGrade === g
                                ? "border-primary bg-accent text-accent-foreground"
                                : "border-border bg-background text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            L{g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full py-3 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang khởi tạo tài khoản...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        Tạo tài khoản & Bắt đầu học
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Email đăng nhập
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="hocsinh@tinhoc.vn"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`${INPUT_CLASS} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword((prev) => !prev)}
                        aria-label={showLoginPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                      >
                        {showLoginPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full py-3 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang đăng nhập...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4" />
                        Đăng nhập & Đồng bộ tiến trình
                      </>
                    )}
                  </button>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                    <span>Chưa có tài khoản?</span>
                    <button
                      type="button"
                      onClick={() => switchMode("register")}
                      className="font-semibold text-primary hover:underline"
                    >
                      Chuyển sang Tạo tài khoản →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
