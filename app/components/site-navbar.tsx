"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/components/auth-provider";

const links = [
  { href: "/", label: "首页" },
  { href: "/fun", label: "娱乐" },
  { href: "/blog", label: "博客" },
  { href: "/contest", label: "竞赛专区" },
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
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("site-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
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
            aria-label={theme === "dark" ? "切换到白天模式" : "切换到黑夜模式"}
            className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)] lg:hidden"
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
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
            <Link
              href="/account"
              className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
            >
              {user ? user.username : "登录"}
            </Link>
            {user ? (
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
              >
                退出
              </button>
            ) : null}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "切换到白天模式" : "切换到黑夜模式"}
              className="hidden rounded-full border border-[var(--app-border)] px-3 py-2 text-xs text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)] lg:inline-flex"
            >
              <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
