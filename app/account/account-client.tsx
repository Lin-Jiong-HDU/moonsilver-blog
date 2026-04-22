"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAuth } from "@/app/components/auth-provider";

export function AccountClient() {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  async function handleSubmit() {
    setIsSubmitting(true);
    const success = await login(username, password);

    setMessage(success ? "登录成功。" : "账号或密码不正确。");
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24 text-[var(--app-fg)] transition-colors duration-300">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--app-muted)]">Account</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">登录</h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--app-muted)]">
            这里只保留登录入口。体验账号由站点统一发放，不再开放注册。
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-8">
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Username</span>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors placeholder:text-[var(--app-muted)] focus:border-[var(--app-border-strong)]"
                  placeholder="请输入体验账号"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors placeholder:text-[var(--app-muted)] focus:border-[var(--app-border-strong)]"
                  placeholder="请输入密码"
                />
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full rounded-full bg-[var(--app-fg)] px-5 py-3 text-sm font-medium text-[var(--app-bg)] transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "处理中..." : "登录"}
              </button>

              {message ? (
                <p className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-muted)]">
                  {message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Current Status</p>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--app-fg)]">
                {user ? `已登录：${user.username}` : "当前未登录"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--app-muted)]">
                {user
                  ? user.isAdmin
                    ? "你可以编辑博客内容，也可以查看竞赛页。"
                    : "你可以查看竞赛页，但不能编辑博客内容。"
                  : "未登录时，竞赛页会提示先登录。"}
              </p>
            </div>

            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Rules</p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--app-muted)]">
                <p>• 体验账号由站点统一发放。</p>
                <p>• 账号信息保存在站点服务器，不只在本地浏览器里。</p>
                <p>• 管理员账号用于博客编辑。</p>
                <p>{adminHint}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {user ? (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-[var(--app-border)] px-5 py-3 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
                >
                  退出登录
                </button>
              ) : null}
              <Link
                href="/blog"
                className="rounded-full border border-[var(--app-border)] px-5 py-3 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
              >
                去博客页
              </Link>
              <Link
                href="/contest"
                className="rounded-full border border-[var(--app-border)] px-5 py-3 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
              >
                去竞赛页
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
