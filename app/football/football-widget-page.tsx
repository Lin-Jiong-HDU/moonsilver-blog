"use client";

import { useMemo, useState } from "react";

type ViewId = "table" | "scorer";
type LeagueCode = "PL" | "PD" | "BL1" | "SA" | "FL1";

const leagues: Array<{
  code: LeagueCode;
  name: string;
  season: string;
  tableUrl: string;
  scorerUrl: string;
}> = [
    {
      code: "PL",
      name: "英超",
      season: "2025-2026",
      tableUrl: "https://saishi.zgzcw.com/soccer/league/82/2025-2026/sxds",
      scorerUrl: "https://saishi.zgzcw.com/soccer/league/36/2025-2026/ssb",
    },
    {
      code: "PD",
      name: "西甲",
      season: "2025-2026",
      tableUrl: "https://saishi.zgzcw.com/soccer/league/31/2025-2026/sxds",
      scorerUrl: "https://saishi.zgzcw.com/soccer/league/31/2025-2026/ssb",
    },
    {
      code: "BL1",
      name: "德甲",
      season: "2025-2026",
      tableUrl: "https://saishi.zgzcw.com/soccer/league/8/2025-2026/sxds",
      scorerUrl: "https://saishi.zgzcw.com/soccer/league/8/2025-2026/ssb",
    },
    {
      code: "SA",
      name: "意甲",
      season: "2025-2026",
      tableUrl: "https://saishi.zgzcw.com/soccer/league/34/2025-2026/sxds",
      scorerUrl: "https://saishi.zgzcw.com/soccer/league/34/2025-2026/ssb",
    },
    {
      code: "FL1",
      name: "法甲",
      season: "2025-2026",
      tableUrl: "https://saishi.zgzcw.com/soccer/league/11/2025-2026/sxds",
      scorerUrl: "https://saishi.zgzcw.com/soccer/league/11/2025-2026/ssb",
    },
  ];

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
  const [activeLeagueCode, setActiveLeagueCode] = useState<LeagueCode>("PL");
  const [activeView, setActiveView] = useState<ViewId>("table");

  const activeLeague = useMemo(
    () => leagues.find((league) => league.code === activeLeagueCode) ?? leagues[0],
    [activeLeagueCode],
  );

  const activeSrc = activeView === "table" ? activeLeague.tableUrl : activeLeague.scorerUrl;
  const activeLabel = activeView === "table" ? "赛程 / 积分榜" : "射手榜";

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <SectionLabel>Football</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            足球数据
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/45 md:text-base">
            和moonsilver一起看球（我还没做这个功能）
          </p>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/8 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                  League Switcher
                </p>
                <div className="mt-4 space-y-2">
                  {leagues.map((league) => {
                    const active = league.code === activeLeagueCode;

                    return (
                      <button
                        key={league.code}
                        type="button"
                        onClick={() => setActiveLeagueCode(league.code)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${active
                          ? "border-white/25 bg-white/[0.08] text-white"
                          : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                          }`}
                      >
                        <p className="text-sm font-medium">{league.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">
                          {league.season}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                  View Switcher
                </p>
                <div className="mt-4 grid gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveView("table")}
                    className={`rounded-2xl border px-4 py-3 text-left transition-colors ${activeView === "table"
                      ? "border-white/25 bg-white/[0.08] text-white"
                      : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                      }`}
                  >
                    <p className="text-sm font-medium">赛程 / 积分榜</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">
                      看轮次、对阵和积分
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView("scorer")}
                    className={`rounded-2xl border px-4 py-3 text-left transition-colors ${activeView === "scorer"
                      ? "border-white/25 bg-white/[0.08] text-white"
                      : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                      }`}
                  >
                    <p className="text-sm font-medium">射手榜</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">
                      看进球、点球和排名
                    </p>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                  Current View
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {activeLeague.name} {activeLeague.season}
                </h2>
                <p className="mt-2 text-sm text-white/35">{activeLabel}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/40">
                  内容直接在当前页面中打开，减少跳转，也更适合移动端浏览。
                </p>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="rounded-[28px] border border-white/8 bg-black p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <div className="mb-3 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                      Embedded Page
                    </p>
                    <p className="mt-1 text-sm text-white/55">
                      {activeLeague.name} / {activeLabel}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/55">
                    内嵌显示
                  </span>
                </div>

                <div className="overflow-hidden rounded-[22px] border border-white/8 bg-black">
                  <iframe
                    key={`${activeLeague.code}-${activeView}`}
                    src={activeSrc}
                    title={`${activeLeague.name} ${activeLabel}`}
                    className="h-[1800px] w-full"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
