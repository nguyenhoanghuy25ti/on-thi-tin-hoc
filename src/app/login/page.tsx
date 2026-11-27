"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  CloudUpload,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  Mail,
  Sparkles,
} from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { useAuth } from "@/components/AuthProvider";
import { hasProgressData, readGuestProgress } from "@/lib/progress";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/progress";
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasGuestProgress, setHasGuestProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setHasGuestProgress(hasProgressData(readGuestProgress()));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại.");
        setLoading(false);
        return;
      }

      await refreshUser({ mergeGuest: true });
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Lỗi kết nối máy chủ. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  const handleQuickFill = (userEmail: string, pass: string) => {
    setEmail(userEmail);
    setPassword(pass);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <h2 className="font-heading text-xl font-extrabold text-foreground sm:text-2xl">
            Đăng nhập tài khoản
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Tiếp tục lộ trình ôn thi Tin học đã lưu của bạn
          </p>
        </div>
        <Link
          href="/register"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Chưa có tài khoản? Tạo mới →
        </Link>
      </div>

      {hasGuestProgress && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-800 dark:text-emerald-200">
          <CloudUpload className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>
            Tiến trình học tạm trên trình duyệt này sẽ được tự động gộp vào tài khoản sau khi bạn đăng nhập.
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs font-medium text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="hocsinh@tinhoc.vn"
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 disabled:opacity-60"
        >
          {loading ? (
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
      </form>

      {/* Demo Accounts */}
      <div className="border-t border-border pt-5">
        <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          Điền nhanh tài khoản mẫu để trải nghiệm:
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleQuickFill("hocsinh@tinhoc.vn", "hocsinh123")}
            className="rounded-xl border border-border bg-background px-3.5 py-2.5 text-left transition hover:border-primary/50 hover:bg-accent/50"
          >
            <div className="text-xs font-bold text-foreground">Học sinh mẫu</div>
            <div className="mt-0.5 truncate font-mono text-[11px] text-primary">
              hocsinh@tinhoc.vn
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("admin@tinhoc.vn", "admin123")}
            className="rounded-xl border border-border bg-background px-3.5 py-2.5 text-left transition hover:border-primary/50 hover:bg-accent/50"
          >
            <div className="text-xs font-bold text-foreground">Quản trị viên</div>
            <div className="mt-0.5 truncate font-mono text-[11px] text-primary">
              admin@tinhoc.vn
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthShell
      badge="CHÀO MỪNG TRỞ LẠI"
      title="Đăng nhập để tiếp tục hành trình chinh phục Tin học"
      subtitle="Toàn bộ tiến độ học tập, điểm số luyện tập và đề thi thử của bạn luôn sẵn sàng ở mọi nơi."
    >
      <Suspense fallback={<div className="py-8 text-center text-sm text-muted-foreground">Đang tải...</div>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
