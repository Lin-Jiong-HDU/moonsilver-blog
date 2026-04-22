import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jobti",
  description: "Enter the Jobti career exploration platform.",
};

const panelClass =
  "rounded-[32px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] backdrop-blur-xl";

export default function JobtiPage() {
  return (
    <div className="flex flex-1 flex-col gap-10 pb-24 pt-10 sm:gap-14 sm:pt-14">
      <section className={`relative overflow-hidden p-8 sm:p-10 ${panelClass}`}>
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.32),rgba(255,255,255,0)_68%)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-3rem] left-[-3rem] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,107,107,0.24),rgba(255,255,255,0)_70%)] blur-2xl"
        />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)] shadow-[var(--shadow-soft)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)]" />
            Career Platform
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] text-[var(--foreground)] sm:text-6xl">
              进入 Jobti
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              从博客直接进入当前的 Jobti 职业探索平台。点击下面的入口，会打开已经部署在本站里的静态版本。
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/jobti-platform/"
              className="inline-flex items-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              打开 Jobti 平台
            </a>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)]"
            >
              返回首页
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className={`p-6 ${panelClass}`}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-strong)]">
            Fast Access
          </p>
          <p className="mt-4 text-xl font-medium leading-8 tracking-[-0.03em] text-[var(--foreground)]">
            从博客一键进入
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
            不改动你们当前产品逻辑，只补一个稳定入口。
          </p>
        </article>
        <article className={`p-6 ${panelClass}`}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-strong)]">
            Static Deploy
          </p>
          <p className="mt-4 text-xl font-medium leading-8 tracking-[-0.03em] text-[var(--foreground)]">
            直接挂载现有版本
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
            当前 Jobti 构建产物已作为静态页面放进博客仓库里，部署简单。
          </p>
        </article>
        <article className={`p-6 ${panelClass}`}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-strong)]">
            Easy Upgrade
          </p>
          <p className="mt-4 text-xl font-medium leading-8 tracking-[-0.03em] text-[var(--foreground)]">
            后续可继续替换
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
            以后你们更新 Jobti，只需要重新构建并覆盖静态目录。
          </p>
        </article>
      </section>
    </div>
  );
}
