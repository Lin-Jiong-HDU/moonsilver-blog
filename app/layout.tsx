import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { NavLinks } from "@/app/components/nav-links";

export const metadata: Metadata = {
  title: {
    default: "Moonsilver 的小家",
    template: "%s | Moonsilver 的小家",
  },
  description: "Moonsilver 的小家。",
  keywords: ["Moonsilver", "Jobti", "职业测绘", "NES", "超级间谍赛车"],
  openGraph: {
    title: "Moonsilver 的小家",
    description: "Moonsilver 的小家。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moonsilver 的小家",
    description: "Moonsilver 的小家。",
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
            className="pointer-events-none absolute inset-x-0 top-[-16rem] h-[34rem] bg-[radial-gradient(circle_at_top,rgba(103,181,255,0.22),transparent_58%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[-10rem] left-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(110,79,255,0.18),transparent_66%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-8rem] top-[28%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(0,255,209,0.14),transparent_64%)] blur-3xl"
          />

          <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 sm:px-8 lg:px-10">
            <header className="sticky top-0 z-30 -mx-6 border-b border-white/10 bg-[rgba(5,10,24,0.72)] px-6 backdrop-blur-2xl sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
              <div className="flex flex-wrap items-center gap-4 py-4">
                <Link href="/" className="group flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-sm font-semibold tracking-[0.22em] text-white shadow-[0_18px_40px_-26px_rgba(74,146,255,0.8)] transition-transform group-hover:-translate-y-0.5">
                    MS
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold tracking-[0.08em] text-white">
                      Moonsilver 的小家
                    </p>
                  </div>
                </Link>

                <div className="ml-auto flex flex-1 justify-end md:justify-center">
                  <NavLinks />
                </div>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-white/10 py-8">
              <div className="flex flex-col gap-4 text-sm text-[var(--muted)] sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-white">Moonsilver 的小家</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href="/jobti" className="transition-colors hover:text-white">
                    Jobti
                  </Link>
                  <Link href="/super-spy-racer" className="transition-colors hover:text-white">
                    超级间谍赛车
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
