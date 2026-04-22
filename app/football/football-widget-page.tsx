import Link from "next/link";
import type { ReactNode } from "react";

const leagues = [
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
] as const;

const quickLinks = [
  {
    title: "中国足彩网",
    description: "赛程、积分榜、射手榜集中入口",
    href: "https://www.zgzcw.com/",
  },
  {
    title: "中国足协数据中心",
    description: "中超、中甲、中乙等国内赛事",
    href: "https://www.thecfa.cn/data/",
  },
  {
    title: "五大联赛速查",
    description: "适合快速切换到热门联赛",
    href: "https://saishi.zgzcw.com/soccer/league/82/2025-2026/sxds",
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

function ExternalButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 transition-colors hover:border-white/20 hover:text-white"
    >
      {children}
    </a>
  );
}

export function FootballWidgetPage() {
  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <SectionLabel>Football</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            足球数据
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/45 md:text-base">
            这个页面改成国内更稳的轻量入口，不再内嵌第三方整页。
            直接点开赛程、积分榜和射手榜即可，加载更快，也更适合中国网络环境。
          </p>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/8 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:items-start">
            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                  Quick Links
                </p>
                <div className="mt-4 grid gap-2">
                  {quickLinks.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/8 px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
                    >
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">
                        {item.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                  Supported Leagues
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {leagues.map((league) => (
                    <span
                      key={league.code}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55"
                    >
                      {league.name}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/40">
                  这里覆盖五大联赛的常用数据入口，先保证“能打开、够简单、够快”。
                </p>
              </div>
            </aside>

            <div className="space-y-4">
              {leagues.map((league) => (
                <div
                  key={league.code}
                  className="rounded-[28px] border border-white/8 bg-black/40 p-5 md:p-6"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                        {league.code}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        {league.name} {league.season}
                      </h2>
                      <p className="mt-2 text-sm text-white/40">
                        赛程、积分榜、射手榜三项直达
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <ExternalButton href={league.tableUrl}>赛程 / 积分榜</ExternalButton>
                      <ExternalButton href={league.scorerUrl}>射手榜</ExternalButton>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <a
                      href={league.tableUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <p className="text-sm font-medium text-white">赛程</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/40">
                        查看轮次、对阵和开赛时间
                      </p>
                    </a>
                    <a
                      href={league.tableUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <p className="text-sm font-medium text-white">积分榜</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/40">
                        查看排名、积分和净胜球
                      </p>
                    </a>
                    <a
                      href={league.scorerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <p className="text-sm font-medium text-white">射手榜</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/40">
                        查看总进球、点球和排名
                      </p>
                    </a>
                  </div>
                </div>
              ))}
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
