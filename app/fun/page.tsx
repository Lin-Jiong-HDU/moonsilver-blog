"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SearchBar from "@/app/components/search-bar";
import { useSiteLanguage } from "@/app/components/language-provider";

type Entry = {
  href: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  note: { zh: string; en: string };
};

const entries: Entry[] = [
  {
    href: "/jobti",
    title: { zh: "Jobti", en: "Jobti" },
    description: { zh: "职业向量测绘", en: "Career vector mapping" },
    note: { zh: "测试", en: "Test" },
  },
  {
    href: "/football",
    title: { zh: "足球", en: "Football" },
    description: { zh: "赛程 / 积分 / 射手榜", en: "Fixtures / standings / scorers" },
    note: { zh: "数据", en: "Data" },
  },
  {
    href: "/fun/2048",
    title: { zh: "2048", en: "2048" },
    description: { zh: "滑动合并，往一个角落堆数字", en: "Slide and merge tiles toward one corner" },
    note: { zh: "游戏", en: "Game" },
  },
  {
    href: "/fun/tetris",
    title: { zh: "俄罗斯方块", en: "Tetris" },
    description: { zh: "下落、旋转、消行", en: "Drop, rotate, and clear lines" },
    note: { zh: "游戏", en: "Game" },
  },
];

const easterEggKeywords = ["inter"];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default function FunPage() {
  const { language } = useSiteLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = normalize(searchQuery);
  const showInterEasterEgg = easterEggKeywords.includes(normalizedQuery);

  const copy =
    language === "en"
      ? {
          label: "Entertainment",
          title: "Fun",
          description: "Pick something and start playing.",
          search: "Search games...",
          empty: "No matching games found.",
          footer: "Pick a module, then keep moving.",
          easterEggAria: "Inter easter egg",
        }
      : {
          label: "娱乐",
          title: "Fun",
          description: "点进去就能玩。",
          search: "搜索游戏...",
          empty: "没有找到匹配的游戏。",
          footer: "选一个模块，然后继续往下走。",
          easterEggAria: "国米彩蛋",
        };

  const filteredEntries = useMemo(() => {
    if (!normalizedQuery) {
      return entries;
    }

    return entries.filter((entry) => {
      const haystack = [entry.title[language], entry.description[language], entry.note[language]].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [language, normalizedQuery]);

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-20 text-[var(--app-fg)] transition-colors duration-300">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--app-muted)]">{copy.label}</span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">{copy.title}</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--app-muted)] md:text-base">{copy.description}</p>
            <div className="mt-8">
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder={copy.search} />
            </div>
          </div>

          <div className="rounded-[32px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-5 backdrop-blur-sm">
            <div className="min-h-[260px] rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/55" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        {showInterEasterEgg ? (
          <div
            aria-label={copy.easterEggAria}
            className="mb-6 overflow-hidden rounded-[24px] border border-[#d4af37]/30 bg-[linear-gradient(135deg,#050b17_0%,#0b1730_42%,#0e3a78_100%)] p-5 text-white shadow-[0_18px_40px_rgba(5,11,23,0.22)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37]">⭐⭐</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">FORZA INTER ⚫🔵</h2>
                <p className="mt-2 text-sm font-medium text-[#f4df8c]">Two stars, one faith. ⭐⭐</p>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/78">
                  A hidden Nerazzurri corner, found by those who know.
                </p>
              </div>
              <div className="hidden h-16 w-16 shrink-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.95),rgba(212,175,55,0.12)_38%,transparent_62%)] sm:block" />
            </div>
          </div>
        ) : null}

        <div className="rounded-[30px] border border-[var(--app-border)] bg-[var(--app-surface)]/55">
          {filteredEntries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4">
              {filteredEntries.map((entry, index) => (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={`group p-6 transition-colors hover:bg-[var(--app-surface)]/80 ${
                    index < filteredEntries.length - 1 ? "md:border-r md:border-[var(--app-border)]" : ""
                  } ${index < 3 ? "border-b border-[var(--app-border)] md:border-b-0" : ""}`}
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--app-muted)]">{entry.note[language]}</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight">{entry.title[language]}</h2>
                  <p className="mt-4 max-w-xs text-sm leading-7 text-[var(--app-muted)]">{entry.description[language]}</p>
                  <div className="mt-8 text-sm text-[var(--app-muted)] transition-transform group-hover:translate-x-1">→</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-10 text-sm text-[var(--app-muted)]">{copy.empty}</div>
          )}
        </div>

        <div className="mt-14">
          <div className="h-px bg-[var(--app-border)]" />
          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-[var(--app-muted)]">{copy.footer}</p>
        </div>
      </section>
    </div>
  );
}
