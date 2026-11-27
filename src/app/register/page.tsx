"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  Brain,
  CheckCircle2,
  CloudUpload,
  Database,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  UserPlus,
} from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { useAuth } from "@/components/AuthProvider";
import { hasProgressData, readGuestProgress } from "@/lib/progress";
import { evaluatePasswordStrength } from "@/lib/password-strength";

export default function RegisterPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [orientationPreference, setOrientationPreference] = useState<"CS" | "ICT">("ICT");
  const [focusGrade, setFocusGrade] = useState<number>(12);
  const [targetScore, setTargetScore] = useState<number>(8.5);

  const [guestSummary, setGuestSummary] = useState<{
    lessons: number;
    videos: number;
    practice: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const guest = readGuestProgress();
    if (hasProgressData(guest)) {
      setGuestSummary({
        lessons: Object.keys(guest.lessons).length,
        videos: Object.keys(guest.videos).length,
        practice: guest.practice.length,
      });
      if (guest.profile.studentName && guest.profile.studentName !== "Bạn học sinh") {
        setName(guest.profile.studentName);
      }
      setOrientationPreference(guest.profile.track);
      setFocusGrade(guest.profile.focusGrade);
      setTargetScore(guest.profile.targetScore);
    }
  }, []);

  const strength = useMemo(() => evaluatePasswordStrength(password), [password]);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
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

    setLoading(true);
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
        setLoading(false);
        return;
      }

      if (typeof window !== "undefined") {
        window.localStorage.removeItem("tinhoc-progress-v1");
      }

      await refreshUser();
      router.push("/progress");
      router.refresh();
    } catch {
      setError("Không thể kết nối máy chủ. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  return (
    <AuthShell
      badge="TẠO TÀI KHOẢN HỌC TẬP"
      title="Xây dựng hồ sơ ôn thi Tin học của riêng bạn"
      subtitle="Đăng ký nhanh trong 30 giây để lưu trọn vẹn tiến trình 33 bài SGK, 89 video và kết quả thi thử trên mọi thiết bị."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <h2 className="font-heading text-xl font-extrabold text-foreground sm:text-2xl">
              Đăng ký tài khoản mới
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Miễn phí 100% cho học sinh THPT · Đồng bộ tức thì
            </p>
          </div>
          <Link
            href="/login"
            className="text-xs font-semibold text-primary hover:underline"
          >
            Đã có tài khoản? Đăng nhập →
          </Link>
        </div>

        {guestSummary && (
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-800 dark:text-emerald-200">
            <CloudUpload className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-bold">Phát hiện tiến trình học tạm trên thiết bị này</p>
              <p className="mt-0.5 opacity-90">
                {guestSummary.lessons} bài lý thuyết · {guestSummary.videos} video ·{" "}
                {guestSummary.practice} lượt luyện tập sẽ được tự động chuyển vào tài khoản mới.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs font-medium text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Name & Email */}
          <div className="grid gap-4 sm:grid-cols-2">
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
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Password & Confirm */}
          <div className="grid gap-4 sm:grid-cols-2">
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
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                <div className="mt-2 space-y-1">
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
                    Độ mạnh: {strength.label}
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

          {/* Learning Preferences */}
          <div className="space-y-4 rounded-2xl border border-border bg-background/70 p-4">
            <p className="mono-id text-primary">Thiết lập lộ trình cá nhân (có thể đổi sau)</p>

            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Định hướng thi THPT
              </label>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setOrientationPreference("ICT")}
                  className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                    orientationPreference === "ICT"
                      ? "border-primary bg-accent text-accent-foreground ring-2 ring-primary/15"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <Database
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      orientationPreference === "ICT" ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-foreground">
                      ICT (Tin học ứng dụng)
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      CSDL, SQL, Thiết kế Web
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOrientationPreference("CS")}
                  className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                    orientationPreference === "CS"
                      ? "border-primary bg-accent text-accent-foreground ring-2 ring-primary/15"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <Brain
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      orientationPreference === "CS" ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-foreground">
                      CS (Khoa học máy tính)
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      Thuật toán, Python, Độ phức tạp
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Khối ưu tiên
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[10, 11, 12].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFocusGrade(g)}
                      className={`rounded-xl border py-2 text-xs font-semibold transition ${
                        focusGrade === g
                          ? "border-primary bg-accent text-accent-foreground"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Lớp {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Mục tiêu điểm THPT
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[7.5, 8.5, 9.5].map((sc) => (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => setTargetScore(sc)}
                      className={`rounded-xl border py-2 font-mono text-xs font-semibold transition ${
                        targetScore === sc
                          ? "border-primary bg-accent text-accent-foreground"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {sc}+
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 disabled:opacity-60"
          >
            {loading ? (
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
      </div>
    </AuthShell>
  );
}
