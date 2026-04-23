"use client";

import { useMemo, useState } from "react";
import { useSiteLanguage } from "@/app/components/language-provider";

type ViewId = "table" | "scorer";
type LeagueCode = "PL" | "PD" | "BL1" | "SA" | "FL1";

const leagues: Array<{
  code: LeagueCode;
  name: { zh: string; en: string };
  season: string;
  tableUrl: string;
  scorerUrl: string;
}> = [
  {
    code: "PL",
    name: { zh: "英超", en: "Premier League" },
    season: "2025-2026",
    tableUrl: "https://saishi.zgzcw.com/soccer/league/82/2025-2026/sxds",
    scorerUrl: "https://saishi.zgzcw.com/soccer/league/36/2025-2026/ssb",
  },
  {
    code: "PD",
    name: { zh: "西甲", en: "La Liga" },
    season: "2025-2026",
    tableUrl: "https://saishi.zgzcw.com/soccer/league/31/2025-2026/sxds",
    scorerUrl: "https://saishi.zgzcw.com/soccer/league/31/2025-2026/ssb",
  },
  {
    code: "BL1",
    name: { zh: "德甲", en: "Bundesliga" },
    season: "2025-2026",
    tableUrl: "https://saishi.zgzcw.com/soccer/league/8/2025-2026/sxds",
    scorerUrl: "https://saishi.zgzcw.com/soccer/league/8/2025-2026/ssb",
  },
  {
    code: "SA",
    name: { zh: "意甲", en: "Serie A" },
    season: "2025-2026",
    tableUrl: "https://saishi.zgzcw.com/soccer/league/34/2025-2026/sxds",
    scorerUrl: "https://saishi.zgzcw.com/soccer/league/34/2025-2026/ssb",
  },
  {
    code: "FL1",
    name: { zh: "法甲", en: "Ligue 1" },
    season: "2025-2026",
    tableUrl: "https://saishi.zgzcw.com/soccer/league/11/2025-2026/sxds",
    scorerUrl: "https://saishi.zgzcw.com/soccer/league/11/2025-2026/ssb",
  },
];

function SectionLabel({ children }: { children: string }) {
  return <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">{children}</span>;
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 text-center">
      <p className="text-xs tracking-widest text-white/15">© {new Date().getFullYear()}</p>
    </footer>
  );
}

export function FootballWidgetPage() {
  const { language } = useSiteLanguage();
  const [activeLeagueCode, setActiveLeagueCode] = useState<LeagueCode>("PL");
  const [activeView, setActiveView] = useState<ViewId>("table");

  const copy = {
    zh: {
      eyebrow: "Football",
      title: "足球数据",
      intro: "和 moonsilver 一起看球（我还没做这个功能）",
      leagueSwitcher: "联赛切换",
      viewSwitcher: "视图切换",
      table: "赛程 / 积分榜",
      tableDesc: "看轮次、对阵和积分",
      scorer: "射手榜",
      scorerDesc: "看进球、点球和排名",
      currentView: "当前视图",
      embedded: "内嵌显示",
      embeddedPage: "嵌入页面",
      tip: "内容直接在当前页面中打开，减少跳转，也更适合移动端浏览。",
      tableLabel: "赛程 / 积分榜",
      scorerLabel: "射手榜",
      footerView: (league: string, view: string) => `${league} / ${view}`,
    },
    en: {
      eyebrow: "Football",
      title: "Football Data",
      intro: "Watch football with moonsilver (this feature is not done yet).",
      leagueSwitcher: "League Switcher",
      viewSwitcher: "View Switcher",
      table: "Fixtures / Standings",
      tableDesc: "Rounds, matchups, and points",
      scorer: "Scorers",
      scorerDesc: "Goals, penalties, and ranking",
      currentView: "Current View",
      embedded: "Embedded",
      embeddedPage: "Embedded Page",
      tip: "The content opens directly on this page, which reduces jumping around and works better on mobile.",
      tableLabel: "Fixtures / Standings",
      scorerLabel: "Scorers",
      footerView: (league: string, view: string) => `${league} / ${view}`,
    },
  }[language];

  const activeLeague = useMemo(() => leagues.find((league) => league.code === activeLeagueCode) ?? leagues[0], [activeLeagueCode]);
  const activeSrc = activeView === "table" ? activeLeague.tableUrl : activeLeague.scorerUrl;
  const activeLabel = activeView === "table" ? copy.tableLabel : copy.scorerLabel;

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <SectionLabel>{copy.eyebrow}</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{copy.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/45 md:text-base">{copy.intro}</p>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/8 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">{copy.leagueSwitcher}</p>
                <div className="mt-4 space-y-2">
                  {leagues.map((league) => {
                    const active = league.code === activeLeagueCode;

                    return (
                      <button
                        key={league.code}
                        type="button"
                        onClick={() => setActiveLeagueCode(league.code)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                          active ? "border-white/25 bg-white/[0.08] text-white" : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <p className="text-sm font-medium">{league.name[language]}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">{league.season}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">{copy.viewSwitcher}</p>
                <div className="mt-4 grid gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveView("table")}
                    className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                      activeView === "table" ? "border-white/25 bg-white/[0.08] text-white" : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <p className="text-sm font-medium">{copy.table}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">{copy.tableDesc}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView("scorer")}
                    className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                      activeView === "scorer" ? "border-white/25 bg-white/[0.08] text-white" : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <p className="text-sm font-medium">{copy.scorer}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">{copy.scorerDesc}</p>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">{copy.currentView}</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {activeLeague.name[language]} {activeLeague.season}
                </h2>
                <p className="mt-2 text-sm text-white/35">{activeLabel}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/40">{copy.tip}</p>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="rounded-[28px] border border-white/8 bg-black p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <div className="mb-3 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/25">{copy.embeddedPage}</p>
                    <p className="mt-1 text-sm text-white/55">{copy.footerView(activeLeague.name[language], activeLabel)}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/55">{copy.embedded}</span>
                </div>

                <div className="overflow-hidden rounded-[22px] border border-white/8 bg-black">
                  <iframe
                    key={`${activeLeague.code}-${activeView}`}
                    src={activeSrc}
                    title={`${activeLeague.name[language]} ${activeLabel}`}
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
