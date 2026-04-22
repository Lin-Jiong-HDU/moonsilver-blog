"use client";

import Link from "next/link";
import { useState } from "react";

const leagues = [
  {
    code: "PL",
    name: "英超",
    country: "England",
    accent: "Premier League",
  },
  {
    code: "PD",
    name: "西甲",
    country: "Spain",
    accent: "LaLiga",
  },
  {
    code: "BL1",
    name: "德甲",
    country: "Germany",
    accent: "Bundesliga",
  },
  {
    code: "SA",
    name: "意甲",
    country: "Italy",
    accent: "Serie A",
  },
  {
    code: "FL1",
    name: "法甲",
    country: "France",
    accent: "Ligue 1",
  },
] as const;

const widgetViews = [
  {
    id: "standings",
    title: "积分榜",
    description: "联赛排名与积分变化",
    src: "https://cafescore.com/widget/iframe/standings",
  },
  {
    id: "schedule",
    title: "赛程",
    description: "接下来的比赛安排",
    src: "https://cafescore.com/widget/iframe/schedule",
  },
  {
    id: "matchCenter",
    title: "比赛中心",
    description: "比赛过程与即时信息",
    src: "https://cafescore.com/widget/iframe/matchCenter",
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
  const [activeView, setActiveView] = useState<(typeof widgetViews)[number]["id"]>("standings");
  const activeLeague = leagues.find((league) => league.code === activeCode) ?? leagues[0];
  const activeWidget = widgetViews.find((view) => view.id === activeView) ?? widgetViews[0];

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <SectionLabel>Football</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">五大联赛</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/40">
            这里不走 API，而是直接嵌入 CafeScore 官方 widget。你可以切换联赛和视图，
            查看积分榜、赛程以及比赛中心。
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
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">Widget View</p>
                <div className="mt-4 grid gap-2">
                  {widgetViews.map((view) => {
                    const active = view.id === activeView;

                    return (
                      <button
                        key={view.id}
                        type="button"
                        onClick={() => setActiveView(view.id)}
                        className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                          active
                            ? "border-white/25 bg-white/[0.08] text-white"
                            : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <p className="text-sm font-medium">{view.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">
                          {view.description}
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
                  当前嵌入页会根据右侧 widget 视图显示联赛信息。
                </p>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="rounded-[28px] border border-white/8 bg-black p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <div className="mb-3 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                      Embedded Widget
                    </p>
                    <p className="mt-1 text-sm text-white/55">
                      {activeLeague.accent} · {activeWidget.title}
                    </p>
                  </div>
                  <a
                    href={activeWidget.src}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/55 transition-colors hover:border-white/20 hover:text-white"
                  >
                    新窗口打开
                  </a>
                </div>

                <div className="overflow-hidden rounded-[22px] border border-white/8 bg-black">
                  <iframe
                    key={`${activeLeague.code}-${activeWidget.id}`}
                    src={activeWidget.src}
                    title={`${activeLeague.name} ${activeWidget.title} widget`}
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
