"use client";

import { useState } from "react";
import Link from "next/link";

const leagues = [
  {
    code: "PL",
    name: "英超",
    country: "England",
    url: "https://cafescore.com/football/england/english-premier-league-81/standings",
  },
  {
    code: "PD",
    name: "西甲",
    country: "Spain",
    url: "https://cafescore.com/football/spain/spanish-la-liga-119/standings",
  },
  {
    code: "BL1",
    name: "德甲",
    country: "Germany",
    url: "https://cafescore.com/football/germany/bundesliga-127/standings",
  },
  {
    code: "SA",
    name: "意甲",
    country: "Italy",
    url: "https://cafescore.com/football/italy/italian-serie-a-107/standings",
  },
  {
    code: "FL1",
    name: "法甲",
    country: "France",
    url: "https://cafescore.com/football/france/french-ligue1-140/standings",
  },
] as const;

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">
      {children}
    </span>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 text-center">
      <p className="text-xs tracking-widest text-white/15">© {new Date().getFullYear()}</p>
    </footer>
  );
}

export function FootballWidgetPage() {
  const [activeCode, setActiveCode] = useState<(typeof leagues)[number]["code"]>("PL");
  const activeLeague = leagues.find((league) => league.code === activeCode) ?? leagues[0];

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionLabel>Football</SectionLabel>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">五大联赛</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/40">
          改成 widget 方案了，不再走 API。这里直接嵌入联赛现成页面，积分榜和射手榜会跟着外部数据同步更新。
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {leagues.map((league) => {
            const active = league.code === activeCode;

            return (
              <button
                key={league.code}
                type="button"
                onClick={() => setActiveCode(league.code)}
                className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  active
                    ? "border-white/25 bg-white/[0.08] text-white"
                    : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                }`}
              >
                {league.name}
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-white/8 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-3 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                {activeLeague.country}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{activeLeague.name}</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/35">
              当前嵌入页面里已经包含积分榜、主客场榜、部分统计和射手榜。
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/8 bg-black">
            <iframe
              key={activeLeague.code}
              src={activeLeague.url}
              title={`${activeLeague.name} standings widget`}
              className="h-[1800px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/fun"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
          >
            返回娱乐区
          </Link>
          <a
            href={activeLeague.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
          >
            在新窗口打开
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
