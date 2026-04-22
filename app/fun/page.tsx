import Link from "next/link";

const entries = [
  {
    href: "/jobti",
    icon: "🎮",
    title: "Jobti",
    description: "一个带职业测绘感的互动小游戏，做完题后再统一生成结果。",
    action: "进入体验",
    badge: "Interactive",
  },
  {
    href: "/football",
    icon: "⚽",
    title: "足球",
    description: "切换查看五大联赛的积分榜、射手榜和相关统计信息。",
    action: "查看联赛",
    badge: "Widget",
  },
];

export default function FunPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black pt-20 text-white">
      <div className="mx-auto flex max-w-5xl flex-1 flex-col px-6 py-24">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">
            Entertainment
          </span>
          <h1 className="mt-4 mb-4 text-4xl font-bold md:text-5xl">娱乐</h1>
          <p className="text-sm leading-relaxed text-white/40">
            这里放一些轻一点的内容。可以玩一玩，也可以随手看看足球数据。
          </p>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
          {entries.map((entry) => (
            <Link key={entry.href} href={entry.href} className="group relative block">
              <div className="relative h-full rounded-[28px] border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]">
                <div
                  className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "inset 0 0 30px rgba(255,255,255,0.03)" }}
                />
                <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 transition-colors group-hover:border-white/25">
                      <span className="text-2xl">{entry.icon}</span>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/30">
                      {entry.badge}
                    </span>
                  </div>

                  <h2 className="mb-3 text-2xl font-semibold text-white transition-colors group-hover:text-white">
                    {entry.title}
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-white/40">
                    {entry.description}
                  </p>

                  <div className="mt-auto pt-10">
                    <div className="flex items-center gap-2 text-xs text-white/30 transition-colors group-hover:text-white/60">
                      <span>{entry.action}</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-xs tracking-widest text-white/15">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
