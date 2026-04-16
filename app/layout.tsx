import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { NavLinks } from "@/app/components/nav-links";

export const metadata: Metadata = {
  title: {
    default: "Moonsilver",
    template: "%s | Moonsilver",
  },
  description:
    "Moonsilver 是一个围绕设计、前端、写作与个人成长展开的个人博客原型，强调克制、留白与阅读体验。",
  keywords: ["Moonsilver", "个人博客", "设计", "前端", "写作", "Apple aesthetic"],
  openGraph: {
    title: "Moonsilver",
    description:
      "一个克制、安静、内容优先的个人博客初版，围绕设计、前端与生活观察展开。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moonsilver",
    description:
      "一个克制、安静、内容优先的个人博客初版，围绕设计、前端与生活观察展开。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full">
        <div className="relative isolate min-h-screen overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[-22rem] h-[44rem] bg-[radial-gradient(circle_at_top,rgba(169,180,198,0.75),transparent_58%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[18rem] h-[28rem] bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.85),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(197,205,216,0.4),transparent_28%)]"
          />
          <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 sm:px-8 lg:px-10">
            <header className="sticky top-0 z-30 -mx-6 border-b border-[var(--line)] bg-[color:rgba(245,245,247,0.82)] px-6 backdrop-blur-2xl sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
              <div className="flex flex-wrap items-center gap-4 py-4">
                <Link href="/" className="group flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] text-sm font-semibold tracking-[0.18em] text-[var(--accent-strong)] shadow-[var(--shadow-soft)]">
                    MS
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold tracking-[0.08em] text-[var(--foreground)]">
                      Moonsilver
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      Quiet notes on design and life
                    </p>
                  </div>
                </Link>

                <div className="ml-auto flex flex-1 justify-end md:justify-center">
                  <NavLinks />
                </div>

                <a
                  href="mailto:linjiong@example.com"
                  className="hidden rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--muted-strong)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--foreground)] sm:inline-flex"
                >
                  Contact
                </a>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-[var(--line)] py-8">
              <div className="flex flex-col gap-4 text-sm text-[var(--muted)] sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-[var(--foreground)]">
                    Moonsilver
                  </p>
                  <p>
                    一个位于设计、技术与生活之间的个人博客原型，先把气质做好，再把内容慢慢长出来。
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href="/writing" className="transition-colors hover:text-[var(--foreground)]">
                    Writing
                  </Link>
                  <Link href="/notes" className="transition-colors hover:text-[var(--foreground)]">
                    Notes
                  </Link>
                  <Link href="/about" className="transition-colors hover:text-[var(--foreground)]">
                    About
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
