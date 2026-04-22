"use client";

import Link from "next/link";
import { useState } from "react";

const widgetViews = [
  {
    id: "livescore",
    title: "Live Scores",
    description: "比赛、赛程和实时比分",
    src: "https://www.scorebat.com/embed/livescore/",
  },
  {
    id: "standings",
    title: "Standings",
    description: "联赛积分与分组概览",
    src: "https://www.scorebat.com/embed/standings/",
  },
  {
    id: "videos",
    title: "Highlights",
    description: "集锦与进球视频",
    src: "https://www.scorebat.com/embed/",
  },
] as const;

const featuredLeagues = [
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "Champions League",
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
  const [activeView, setActiveView] =
    useState<(typeof widgetViews)[number]["id"]>("livescore");
  const activeWidget =
    widgetViews.find((view) => view.id === activeView) ?? widgetViews[0];

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <SectionLabel>Football</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            五大联赛
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/45 md:text-base">
            这里不再依赖 CafeScore，改为直接嵌入 ScoreBat 的官方 widget。
            你可以在比分、积分榜和集锦之间切换，页面保持现成面板的使用方式。
          </p>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/8 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                  Widget View
                </p>
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
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                  Coverage
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredLeagues.map((league) => (
                    <span
                      key={league}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55"
                    >
                      {league}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/40">
                  ScoreBat 的 widget 会自带联赛选择和比赛浏览，不需要你自己维护数据源。
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                  Current Widget
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {activeWidget.title}
                </h2>
                <p className="mt-2 text-sm text-white/35">{activeWidget.description}</p>
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
                      ScoreBat / {activeWidget.title}
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
                    key={activeWidget.id}
                    src={activeWidget.src}
                    title={`ScoreBat ${activeWidget.title} widget`}
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
