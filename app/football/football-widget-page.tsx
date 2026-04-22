"use client";

import Link from "next/link";
import { useState } from "react";

const leagues = [
  {
    code: "PL",
    name: "英超",
    country: "England",
    accent: "Premier League",
    url: "https://cafescore.com/football/england/english-premier-league-81/standings",
  },
  {
    code: "PD",
    name: "西甲",
    country: "Spain",
    accent: "LaLiga",
    url: "https://cafescore.com/football/spain/spanish-la-liga-119/standings",
  },
  {
    code: "BL1",
    name: "德甲",
    country: "Germany",
    accent: "Bundesliga",
    url: "https://cafescore.com/football/germany/bundesliga-127/standings",
  },
  {
    code: "SA",
    name: "意甲",
    country: "Italy",
    accent: "Serie A",
    url: "https://cafescore.com/football/italy/italian-serie-a-107/standings",
  },
  {
    code: "FL1",
    name: "法甲",
    country: "France",
    accent: "Ligue 1",
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
        <div className="max-w-3xl">
          <SectionLabel>Football</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">五大联赛</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/40">
            这里不走 API，而是用外部 widget 页面来同步信息。你可以直接切换联赛，
            看积分榜、射手榜以及联赛里已经整理好的相关统计。
          </p>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/8 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">League Switcher</p>
                <div className="mt-4 space-y-2">
                  {leagues.map((league) => {
                    const active = league.code === activeCode;

                    return (
                      <button
                        key={league.code}
                        type="button"
                        onClick={() => setActiveCode(league.code)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                          active
                            ? "border-white/25 bg-white/[0.08] text-white"
                            : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <p className="text-sm font-medium">{league.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">
                          {league.accent}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">Current View</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{activeLeague.name}</h2>
                <p className="mt-2 text-sm text-white/35">{activeLeague.country}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/40">
                  当前嵌入页通常会包含积分榜、主客场榜、Top Scorers 和一些赛季相关统计。
                </p>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="rounded-[28px] border border-white/8 bg-black p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <div className="mb-3 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/25">Embedded Widget</p>
                    <p className="mt-1 text-sm text-white/55">
                      {activeLeague.accent} · {activeLeague.country}
                    </p>
                  </div>
                  <a
                    href={activeLeague.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/55 transition-colors hover:border-white/20 hover:text-white"
                  >
                    新窗口打开
                  </a>
                </div>

                <div className="overflow-hidden rounded-[22px] border border-white/8 bg-black">
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
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/fun"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
          >
            返回娱乐区
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
