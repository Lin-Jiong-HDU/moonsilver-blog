"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/components/auth-provider";
import { useSiteLanguage } from "@/app/components/language-provider";

type MessageKey = "success" | "failure" | null;

export function AccountClient() {
  const { user, login, logout } = useAuth();
  const { language } = useSiteLanguage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageKey, setMessageKey] = useState<MessageKey>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy = {
    zh: {
      eyebrow: "Account",
      title: "登录",
      intro: "这里只保留登录入口。体验账号由站点统一发放，不再开放注册。",
      username: "用户名",
      password: "密码",
      usernamePlaceholder: "请输入体验账号",
      passwordPlaceholder: "请输入密码",
      login: "登录",
      loggingIn: "处理中...",
      currentStatus: "当前状态",
      rules: "说明",
      loggedIn: (name: string) => `已登录：${name}`,
      notLoggedIn: "当前未登录",
      adminHint: "你可以编辑博客内容，也可以查看竞赛页。",
      memberHint: "你可以查看竞赛页，但不能编辑博客内容。",
      guestHint: "未登录时，竞赛页会提示先登录。",
      success: "登录成功。",
      failure: "账号或密码不正确。",
      ruleOne: "体验账号由站点统一发放。",
      ruleTwo: "账号信息保存在站点服务器，不只在本地浏览器里。",
      ruleThree: "管理员账号用于博客编辑。",
      logout: "退出登录",
      blog: "去博客页",
      contest: "去竞赛页",
    },
    en: {
      eyebrow: "Account",
      title: "Sign in",
      intro: "This page keeps only the sign-in entry. Trial accounts are issued by the site, and registration is closed.",
      username: "Username",
      password: "Password",
      usernamePlaceholder: "Enter trial username",
      passwordPlaceholder: "Enter password",
      login: "Sign in",
      loggingIn: "Processing...",
      currentStatus: "Current Status",
      rules: "Notes",
      loggedIn: (name: string) => `Signed in as: ${name}`,
      notLoggedIn: "Not signed in",
      adminHint: "You can edit blog content and view the contest page.",
      memberHint: "You can view the contest page, but not edit blog content.",
      guestHint: "When signed out, the contest page will ask you to sign in first.",
      success: "Signed in successfully.",
      failure: "The username or password is incorrect.",
      ruleOne: "Trial accounts are issued by the site.",
      ruleTwo: "Account information is stored on the site server, not only in your browser.",
      ruleThree: "Admin accounts are used for blog editing.",
      logout: "Sign out",
      blog: "Go to blog",
      contest: "Go to contest",
    },
  }[language];

  async function handleSubmit() {
    setIsSubmitting(true);
    const success = await login(username, password);
    setMessageKey(success ? "success" : "failure");
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24 text-[var(--app-fg)] transition-colors duration-300">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--app-muted)]">{copy.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{copy.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--app-muted)]">{copy.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-8">
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">{copy.username}</span>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors placeholder:text-[var(--app-muted)] focus:border-[var(--app-border-strong)]"
                  placeholder={copy.usernamePlaceholder}
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">{copy.password}</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors placeholder:text-[var(--app-muted)] focus:border-[var(--app-border-strong)]"
                  placeholder={copy.passwordPlaceholder}
                />
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full rounded-full bg-[var(--app-fg)] px-5 py-3 text-sm font-medium text-[var(--app-bg)] transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? copy.loggingIn : copy.login}
              </button>

              {messageKey ? (
                <p className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-muted)]">
                  {copy[messageKey]}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">{copy.currentStatus}</p>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--app-fg)]">
                {user ? copy.loggedIn(user.username) : copy.notLoggedIn}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--app-muted)]">
                {user ? (user.isAdmin ? copy.adminHint : copy.memberHint) : copy.guestHint}
              </p>
            </div>

            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">{copy.rules}</p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--app-muted)]">
                <p>• {copy.ruleOne}</p>
                <p>• {copy.ruleTwo}</p>
                <p>• {copy.ruleThree}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {user ? (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-[var(--app-border)] px-5 py-3 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
                >
                  {copy.logout}
                </button>
              ) : null}
              <Link
                href="/blog"
                className="rounded-full border border-[var(--app-border)] px-5 py-3 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
              >
                {copy.blog}
              </Link>
              <Link
                href="/contest"
                className="rounded-full border border-[var(--app-border)] px-5 py-3 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
              >
                {copy.contest}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
