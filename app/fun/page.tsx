import Link from "next/link";

const entries = [
  {
    href: "/jobti",
    title: "Jobti",
    description: "职业向量测绘",
    badge: "Test",
    accent: "from-amber-300/20 via-white/10 to-transparent",
    mark: "JT",
  },
  {
    href: "/football",
    title: "足球",
    description: "赛程、积分、射手榜",
    badge: "Data",
    accent: "from-sky-300/20 via-white/10 to-transparent",
    mark: "FB",
  },
  {
    href: "/fun/2048",
    title: "2048",
    description: "滑动合并，冲到 2048",
    badge: "Game",
    accent: "from-orange-300/20 via-white/10 to-transparent",
    mark: "20",
  },
  {
    href: "/fun/tetris",
    title: "俄罗斯方块",
    description: "下落、旋转、消行",
    badge: "Game",
    accent: "from-violet-300/20 via-white/10 to-transparent",
    mark: "T7",
  },
];

export default function FunPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,#050505_0%,#090909_45%,#050505_100%)] pt-20 text-white">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/30">Entertainment</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">Fun</h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/45 md:text-base">
            这里放的是轻量、直接、适合顺手打开的内容。职业测评、足球数据，还有两个本地小游戏。
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/45">
            <span className="rounded-full border border-white/10 px-3 py-2">Local games</span>
            <span className="rounded-full border border-white/10 px-3 py-2">Fast entry</span>
            <span className="rounded-full border border-white/10 px-3 py-2">No clutter</span>
          </div>
        </div>

        <div className="relative rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <div className="absolute inset-0 rounded-[32px] bg-[linear-gradient(135deg,transparent,rgba(255,255,255,0.05),transparent)]" />
          <div className="relative grid grid-cols-2 gap-3">
            {entries.map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40 p-4 transition-transform duration-300 hover:-translate-y-1 hover:border-white/25"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${entry.accent}`} />
                <div className="relative flex h-full min-h-[160px] flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/35">
                      {entry.badge}
                    </span>
                    <span className="text-xs text-white/25">{entry.mark}</span>
                  </div>
                  <div className="mt-auto">
                    <h2 className="text-xl font-semibold tracking-tight">{entry.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/45">{entry.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          {entries.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="group rounded-[30px] border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/30">{entry.badge}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{entry.title}</h2>
                </div>
                <div className="text-right text-xs uppercase tracking-[0.22em] text-white/25">
                  Open
                  <div className="mt-1 text-white/50 transition-transform group-hover:translate-x-1">→</div>
                </div>
              </div>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/45">{entry.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
