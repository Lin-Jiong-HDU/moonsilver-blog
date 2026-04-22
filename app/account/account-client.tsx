"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAuth } from "@/app/components/auth-provider";

type Mode = "login" | "register";

export function AccountClient() {
  const { user, login, register, logout } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const adminHint = useMemo(() => "管理员账号：moonsilver / msv", []);

  function handleSubmit() {
    const success = mode === "login" ? login(username, password) : register(username, password);
    setMessage(
      success
        ? mode === "login"
          ? "登录成功。"
          : "注册成功并已登录。"
        : mode === "login"
          ? "账号或密码不正确。"
          : "用户名已存在，或输入为空。",
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/30">Account</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">登录 / 注册</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/40">
            登录后可以查看竞赛页；只有管理员账号可以编辑博客内容。
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/8 bg-white/[0.02] p-6 md:p-8">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  mode === "login"
                    ? "bg-white text-black"
                    : "border border-white/10 text-white/55 hover:border-white/20 hover:text-white"
                }`}
              >
                登录
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  mode === "register"
                    ? "bg-white text-black"
                    : "border border-white/10 text-white/55 hover:border-white/20 hover:text-white"
                }`}
              >
                注册
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-white/30">Username</span>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-white/25"
                  placeholder="请输入用户名"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-white/30">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-white/25"
                  placeholder="请输入密码"
                />
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                {mode === "login" ? "登录" : "注册并登录"}
              </button>

              {message ? (
                <p className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-white/45">
                  {message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/8 bg-black/30 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">Current Status</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                {user ? `已登录：${user.username}` : "当前未登录"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                {user
                  ? user.isAdmin
                    ? "你可以编辑博客内容，也可以查看竞赛页。"
                    : "你可以查看竞赛页，但不能编辑博客内容。"
                  : "未登录时，竞赛页会显示访问提示。"}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-black/30 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">Rules</p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/40">
                <p>· 管理员账号用于博客编辑。</p>
                <p>· 普通注册账号只用于解锁竞赛页。</p>
                <p>· 登录后会保存在本地浏览器里。</p>
                <p>{adminHint}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {user ? (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
                >
                  退出登录
                </button>
              ) : null}
              <Link
                href="/blog"
                className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                去博客页
              </Link>
              <Link
                href="/contest"
                className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
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
