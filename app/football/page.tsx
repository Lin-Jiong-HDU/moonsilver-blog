import type { Metadata } from "next";
import Link from "next/link";
import { getFiveLeagueSnapshots } from "@/app/lib/football-data";

export const metadata: Metadata = {
  title: "足球",
  description: "五大联赛积分榜、射手榜与赛季信息。",
};

export const dynamic = "force-dynamic";

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

async function loadLeagues() {
  try {
    const leagues = await getFiveLeagueSnapshots();
    return { leagues, error: null as string | null };
  } catch (error) {
    const message =
      error instanceof Error && error.message === "missing_api_key"
        ? "当前还没有配置足球数据 API key。把 `FOOTBALL_DATA_API_KEY` 或 `FOOTBALL_DATA_TOKEN` 配到环境变量后，这里就会开始同步五大联赛的积分榜和射手榜。"
        : "足球数据源暂时不可用，稍后再试。";

    return { leagues: null, error: message };
  }
}

export default async function FootballPage() {
  const { leagues, error } = await loadLeagues();

  if (error || !leagues) {
    return (
      <div className="min-h-screen bg-black pt-20 text-white">
        <section className="mx-auto max-w-4xl px-6 py-24">
          <SectionLabel>Football</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">五大联赛</h1>
          <div className="mt-10 rounded-3xl border border-white/8 bg-white/[0.02] p-8">
            <p className="text-sm leading-relaxed text-white/40">{error}</p>
          </div>
          <div className="mt-10">
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

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionLabel>Football</SectionLabel>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">五大联赛</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/40">
          同步查看英超、西甲、德甲、意甲、法甲的积分榜和射手榜。
        </p>

        <div className="mt-12 space-y-10">
          {leagues.map((league) => (
            <section
              key={league.league.code}
              className="rounded-3xl border border-white/8 bg-white/[0.02] p-6 md:p-8"
            >
              <div className="flex flex-col gap-3 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                    {league.league.country}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{league.league.name}</h2>
                </div>
                <div className="text-sm text-white/35">
                  <p>赛季：{league.season ?? "当前赛季"}</p>
                  <p>轮次：{league.matchday ?? "更新中"}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">积分榜</h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/25">
                      Standings
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/8">
                    <div className="grid grid-cols-[52px_minmax(0,1fr)_56px_56px_56px_56px_64px] gap-3 border-b border-white/8 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/30">
                      <span>#</span>
                      <span>球队</span>
                      <span>场</span>
                      <span>胜</span>
                      <span>平</span>
                      <span>负</span>
                      <span>分</span>
                    </div>
                    <div>
                      {league.standings.slice(0, 10).map((row) => (
                        <div
                          key={row.team.id}
                          className="grid grid-cols-[52px_minmax(0,1fr)_56px_56px_56px_56px_64px] gap-3 border-b border-white/6 px-4 py-3 text-sm last:border-b-0"
                        >
                          <span className="text-white/35">{row.position}</span>
                          <div className="min-w-0">
                            <p className="truncate text-white">{row.team.shortName || row.team.name}</p>
                            <p className="text-xs text-white/25">
                              {row.goalsFor}:{row.goalsAgainst} · GD {row.goalDifference}
                            </p>
                          </div>
                          <span className="text-white/55">{row.playedGames}</span>
                          <span className="text-white/55">{row.won}</span>
                          <span className="text-white/55">{row.draw}</span>
                          <span className="text-white/55">{row.lost}</span>
                          <span className="font-medium text-white">{row.points}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">射手榜</h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/25">
                      Scorers
                    </span>
                  </div>

                  <div className="space-y-3">
                    {league.scorers.slice(0, 10).map((scorer, index) => (
                      <div
                        key={`${league.league.code}-${scorer.player.name}-${index}`}
                        className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                              {String(index + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-2 text-base font-medium text-white">
                              {scorer.player.name}
                            </p>
                            <p className="mt-1 text-sm text-white/35">{scorer.team.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-semibold text-white">{scorer.goals ?? 0}</p>
                            <p className="text-xs text-white/25">goals</p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-4 text-xs text-white/30">
                          <span>出场 {scorer.playedMatches ?? "-"}</span>
                          <span>助攻 {scorer.assists ?? "-"}</span>
                          <span>点球 {scorer.penalties ?? "-"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12">
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
