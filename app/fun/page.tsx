"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SearchBar from "@/app/components/search-bar";

const entries = [
  {
    href: "/jobti",
    title: "Jobti",
    description: "职业向量测绘",
    note: "Test",
  },
  {
    href: "/football",
    title: "足球",
    description: "赛程 / 积分 / 射手榜",
    note: "Data",
  },
  {
    href: "/fun/2048",
    title: "2048",
    description: "滑动合并，往一个角落堆数字",
    note: "Game",
  },
  {
    href: "/fun/tetris",
    title: "俄罗斯方块",
    description: "下落、旋转、消行",
    note: "Game",
  },
  {
    href: "/fun/gomoku",
    title: "五子棋",
    description: "连成五颗同色棋子即可获胜",
    note: "Game",
  },
];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default function FunPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = useMemo(() => {
    const query = normalize(searchQuery);
    if (!query) {
      return entries;
    }

    return entries.filter((entry) => {
      const haystack = [entry.title, entry.description, entry.note].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-20 text-[var(--app-fg)] transition-colors duration-300">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--app-muted)]">
              Entertainment
            </span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">Fun</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--app-muted)] md:text-base">
              点进去就能玩。
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs text-[var(--app-muted)]">
              <span className="rounded-full border border-[var(--app-border)] px-3 py-2">Local games</span>
              <span className="rounded-full border border-[var(--app-border)] px-3 py-2">Fast entry</span>
              <span className="rounded-full border border-[var(--app-border)] px-3 py-2">No clutter</span>
            </div>
            <div className="mt-8">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="搜索游戏..."
              />
            </div>
          </div>

          <div className="rounded-[32px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-5 backdrop-blur-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className="group flex min-h-[180px] flex-col justify-between rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/55 p-5 transition-colors hover:border-[var(--app-border-strong)] hover:bg-[var(--app-surface)]/80"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)]">
                        {entry.note}
                      </p>
                      <span className="text-sm text-[var(--app-muted)] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                    <div>
                      <h2 className="mt-6 text-2xl font-semibold tracking-tight md:text-[2rem]">
                        {entry.title}
                      </h2>
                      <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--app-muted)]">
                        {entry.description}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center rounded-[28px] border border-dashed border-[var(--app-border)] bg-[var(--app-surface)]/40 py-12 text-sm text-[var(--app-muted)]">
                  没有找到匹配的游戏
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[30px] border border-[var(--app-border)] bg-[var(--app-surface)]/55">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {filteredEntries.map((entry, index) => (
              <Link
                key={entry.href}
                href={entry.href}
                className={`group p-6 transition-colors hover:bg-[var(--app-surface)]/80 ${
                  index < filteredEntries.length - 1 ? "md:border-r md:border-[var(--app-border)]" : ""
                } ${index < 3 ? "border-b border-[var(--app-border)] md:border-b-0" : ""}`}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--app-muted)]">{entry.note}</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight">{entry.title}</h2>
                <p className="mt-4 max-w-xs text-sm leading-7 text-[var(--app-muted)]">
                  {entry.description}
                </p>
                <div className="mt-8 text-sm text-[var(--app-muted)] transition-transform group-hover:translate-x-1">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="h-px bg-[var(--app-border)]" />
          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-[var(--app-muted)]">
            Pick a module, then keep moving.
          </p>
        </div>
      </section>
    </div>
  );
}
