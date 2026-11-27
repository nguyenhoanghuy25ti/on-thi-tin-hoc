"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Cpu,
  FileCheck2,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Shield,
  Sun,
  TrendingUp,
  UserCircle2,
  UserPlus,
  X,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/theory", label: "Kiến thức SGK" },
  { href: "/videos", label: "Video bài giảng" },
  { href: "/practice", label: "Ôn luyện" },
  { href: "/progress", label: "Tiến trình" },
  { href: "/qa", label: "Hỏi đáp" },
  { href: "/contact", label: "Liên hệ" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "HS";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, loading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    setMenuOpen(false);
    setMobileOpen(false);
    await logout();
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-sm">
            <Cpu className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-heading text-[15px] font-extrabold tracking-tight text-foreground">
              IT Master <span className="text-primary">THPT</span>
            </span>
            <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
              Tin học GDPT 2018
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-semibold transition ${
                isActive(item.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Chuyển giao diện sáng tối"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {!loading && user ? (
            <div ref={dropdownRef} className="relative flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Mở menu tài khoản"
                className="flex items-center gap-2 rounded-xl border border-border bg-background py-1.5 pl-1.5 pr-2 sm:pr-2.5 text-xs font-semibold text-foreground transition hover:border-primary/50"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-emerald-600 font-mono text-[10px] font-bold text-white">
                  {getInitials(user.name)}
                </span>
                <span className="hidden max-w-[110px] truncate sm:inline">{user.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>

              <button
                type="button"
                onClick={handleLogout}
                title="Đăng xuất"
                aria-label="Đăng xuất"
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive sm:flex"
              >
                <LogOut className="h-4 w-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border bg-card p-2 shadow-xl">
                  <div className="border-b border-border px-3 py-2.5">
                    <p className="truncate text-xs font-bold text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {user.email}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-bold text-accent-foreground">
                        {user.role === "ADMIN" ? "ADMIN" : "HỌC SINH"}
                      </span>
                      {user.orientationPreference && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
                          Định hướng {user.orientationPreference}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/progress"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground transition hover:bg-secondary"
                    >
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      Tiến trình học tập
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground transition hover:bg-secondary"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
                      Hồ sơ & Thống kê thi thử
                    </Link>
                    <Link
                      href="/exams"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground transition hover:bg-secondary"
                    >
                      <FileCheck2 className="h-3.5 w-3.5 text-primary" />
                      Phòng thi thử 50 phút
                    </Link>
                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground transition hover:bg-secondary"
                      >
                        <Shield className="h-3.5 w-3.5 text-amber-500" />
                        Quản trị hệ thống
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-border pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-destructive transition hover:bg-destructive/10"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                aria-label="Đăng nhập tài khoản"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary transition hover:border-primary/50 sm:hidden"
              >
                <UserCircle2 className="h-4 w-4" />
              </Link>
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/login"
                  className="inline-flex whitespace-nowrap items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-[12.5px] font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  <UserCircle2 className="h-4 w-4 text-primary" />
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="inline-flex whitespace-nowrap items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-3.5 py-2 text-[12.5px] font-semibold text-white shadow-sm transition hover:brightness-105"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Tạo tài khoản
                </Link>
              </div>
            </>
          )}

          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden">
          <div className="container-page border-t border-border py-4 space-y-4">
            <div className="grid gap-1 sm:grid-cols-2">
              {NAV_LINKS.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="mono-id">{String(idx + 1).padStart(2, "0")}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-border pt-3">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-background px-3.5 py-2.5 border border-border">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-foreground">
                        {user.name}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-2.5 py-1.5 text-xs font-semibold text-destructive"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Đăng xuất
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2 text-xs font-semibold text-foreground"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
                      Hồ sơ thi thử
                    </Link>
                    <Link
                      href="/exams"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2 text-xs font-semibold text-foreground"
                    >
                      <FileCheck2 className="h-3.5 w-3.5 text-primary" />
                      Phòng thi thử
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2.5 text-xs font-semibold text-foreground"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Đăng nhập
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-2.5 text-xs font-semibold text-white"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Tạo tài khoản
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
