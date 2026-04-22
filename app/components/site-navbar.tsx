"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "首页" },
  { href: "/fun", label: "娱乐" },
  { href: "/contest", label: "竞赛专区" },
  { href: "/football", label: "足球数据" },
];

function isActive(pathname: string, href: string) {
  return pathname === href;
}

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem("site-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function SiteNavbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("site-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => {
      const nextTheme = current === "dark" ? "light" : "dark";
      window.localStorage.setItem("site-theme", nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      return nextTheme;
    });
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--app-border)] bg-[var(--app-surface)]/85 px-6 py-4 backdrop-blur-md transition-colors duration-300 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="select-none text-sm font-semibold uppercase tracking-widest text-[var(--app-fg)]"
          >
            Portfolio
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)] lg:hidden"
          >
            {theme === "dark" ? "白天模式" : "黑夜模式"}
          </button>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
          <ul className="flex flex-wrap gap-4 md:gap-6">
            {links.map((link) => {
              const active = isActive(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-sm tracking-wide transition-colors ${
                      active
                        ? "text-[var(--app-fg)]"
                        : "text-[var(--app-muted)] hover:text-[var(--app-fg)]"
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--app-fg)]" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://www.johnlin.top/games/fc"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
            >
              友站
            </a>
            <a
              href="https://github.com/moonsilver-1"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
            >
              GitHub 联系
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden rounded-full border border-[var(--app-border)] px-3 py-2 text-xs text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)] lg:inline-flex"
            >
              {theme === "dark" ? "白天模式" : "黑夜模式"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
