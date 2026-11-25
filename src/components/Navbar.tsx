"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Cpu, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/theory", label: "Kiến thức SGK" },
  { href: "/videos", label: "Video bài giảng" },
  { href: "/practice", label: "Ôn luyện" },
  { href: "/progress", label: "Tiến trình" },
  { href: "/qa", label: "Hỏi đáp" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold transition ${
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

          <Link
            href="/practice"
            className="hidden whitespace-nowrap items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-3.5 py-2 text-[12.5px] font-semibold text-white shadow-sm transition hover:brightness-105 sm:inline-flex"
          >
            Luyện tập
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

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
          <div className="container-page border-t border-border py-4">
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
          </div>
        </div>
      )}
    </header>
  );
}
