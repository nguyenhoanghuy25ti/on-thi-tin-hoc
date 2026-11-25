import Link from "next/link";
import { Cpu, Mail, Phone, Youtube, Facebook, ArrowUpRight } from "lucide-react";

const LEARN_LINKS = [
  { href: "/theory", label: "Kiến thức SGK" },
  { href: "/videos", label: "Video bài giảng" },
  { href: "/practice", label: "Luyện tập" },
  { href: "/progress", label: "Tiến trình" },
];

const SUPPORT_LINKS = [
  { href: "/qa", label: "Hỏi đáp" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-sm">
                <Cpu className="h-5 w-5" />
              </span>
              <div>
                <span className="font-heading text-base font-extrabold tracking-tight text-foreground">
                  IT Master THPT
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Tin học GDPT 2018
                </span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Không gian tự học và luyện thi tốt nghiệp THPT môn Tin học cho học sinh lớp 10 – 11 – 12: tóm tắt trọng tâm, 89 video bài giảng, luyện tập 3 dạng thức và phòng thực hành code trực tiếp.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <Facebook className="h-3.5 w-3.5" />
                Facebook
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <Youtube className="h-3.5 w-3.5" />
                YouTube
              </a>
            </div>
          </div>

          {/* Learning Links */}
          <div className="lg:col-span-3">
            <p className="mono-id text-primary">Học tập</p>
            <ul className="mt-4 space-y-2.5">
              {LEARN_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/playground"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Code Lab (Python/SQL/HTML)
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="mono-id text-primary">Hỗ trợ</p>
              <ul className="mt-3.5 space-y-2.5">
                <li className="flex flex-wrap gap-4">
                  {SUPPORT_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-foreground transition hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </li>
                <li className="pt-1 border-t border-border">
                  <a
                    href="tel:0986808430"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    0986 808 430
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:nguyenhoanghuy25ti@gmail.com"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
                  >
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    nguyenhoanghuy25ti@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 IT Master THPT · Ôn thi Tốt nghiệp THPT Môn Tin học</p>
          <p className="font-mono uppercase tracking-[0.16em]">GDPT 2018 · KHỐI 10 · 11 · 12</p>
        </div>
      </div>
    </footer>
  );
}
