import Link from "next/link";

const destinations = [
  {
    href: "/jobti",
    index: "01",
    title: "Jobti 职业测绘",
    summary:
      "重做后的职业测评页，扩展到 12 类岗位、24 道场景题、8 个能力维度，不再轻易把所有人算成一种。",
    meta: ["24 道题", "12 类岗位", "能力雷达"],
    accent:
      "from-cyan-400/30 via-sky-400/16 to-transparent",
  },
  {
    href: "/super-spy-racer",
    index: "02",
    title: "超级间谍赛车",
    summary:
      "把根目录里的 NES ROM 做成独立入口页，方便直接进入、查看说明和下载使用。",
    meta: ["NES ROM", "归档入口", "极速模式"],
    accent:
      "from-fuchsia-400/28 via-violet-400/16 to-transparent",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col justify-center pb-20 pt-8 sm:pb-24 sm:pt-14">
      <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[rgba(7,12,28,0.7)] px-6 py-8 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:px-10 sm:py-12 lg:px-12 lg:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_34%,transparent_66%,rgba(255,255,255,0.03))]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)]"
        />

        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--accent-strong)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-strong)] shadow-[0_0_18px_rgba(125,231,255,0.9)]" />
              Moonsilver Navigator
            </div>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.26em] text-[var(--muted)]">
                Minimal Dispatch Point
              </p>
              <h1 className="max-w-3xl font-serif text-5xl leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                首页全收口，
                <br />
                现在只留两个入口。
              </h1>
              <p className="max-w-xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
                一个去做更像样的职业测绘，一个去打开超级间谍赛车。首页不再承担博客陈列任务，只做清晰分发。
              </p>
            </div>

            <div className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-3">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--accent-strong)]">
                  24Q
                </p>
                <p className="mt-2 leading-6">Jobti 已改成更细的场景题和能力维度。</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--accent-strong)]">
                  12R
                </p>
                <p className="mt-2 leading-6">岗位库扩展到更常见也更容易区分的方向。</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--accent-strong)]">
                  NES
                </p>
                <p className="mt-2 leading-6">赛车入口已经和 ROM 归档页接好了。</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {destinations.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(10,18,38,0.84)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[rgba(13,23,46,0.92)]"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full border border-white/10 bg-white/6 blur-xl"
                />

                <div className="relative flex h-full flex-col gap-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-3">
                      <p className="font-mono text-xs tracking-[0.28em] text-[var(--accent-strong)]">
                        {item.index}
                      </p>
                      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                        {item.title}
                      </h2>
                    </div>
                    <span className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white transition-transform duration-300 group-hover:translate-x-1">
                      Enter
                    </span>
                  </div>

                  <p className="max-w-2xl text-sm leading-7 text-[var(--muted-strong)] sm:text-base">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.meta.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-xs text-[var(--muted-strong)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
