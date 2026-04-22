import Link from "next/link";

const entries = [
  {
    href: "/jobti",
    icon: "🎮",
    title: "Jobti",
    description: "一个有趣的小游戏，点击进入开始体验。",
    action: "进入游戏",
  },
  {
    href: "/football",
    icon: "⚽",
    title: "足球",
    description: "同步查看五大联赛的积分榜、射手榜和赛季信息。",
    action: "查看联赛",
  },
];

export default function FunPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black pt-20 text-white">
      <div className="mx-auto flex max-w-4xl flex-1 flex-col px-6 py-24">
        <div className="mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">
            Entertainment
          </span>
          <h1 className="mt-4 mb-4 text-4xl font-bold md:text-5xl">娱乐</h1>
          <p className="max-w-lg text-sm leading-relaxed text-white/40">
            放松一下，玩玩小游戏，也可以看看足球数据。
          </p>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
          {entries.map((entry) => (
            <Link key={entry.href} href={entry.href} className="group relative block">
              <div className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]">
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "inset 0 0 30px rgba(255,255,255,0.03)" }}
                />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 transition-colors group-hover:border-white/25">
                    <span className="text-2xl">{entry.icon}</span>
                  </div>

                  <h2 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-white">
                    {entry.title}
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-white/40">{entry.description}</p>

                  <div className="flex items-center gap-2 text-xs text-white/30 transition-colors group-hover:text-white/60">
                    <span>{entry.action}</span>
                    <span>→</span>
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
