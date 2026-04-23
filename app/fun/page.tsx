import Link from "next/link";

const features = [
  {
    href: "/fun/2048",
    title: "2048",
    description: "滑动合并，尽量把数字堆进一个角落。",
    eyebrow: "Game 01",
    note: "Arrow keys / WASD",
  },
  {
    href: "/fun/tetris",
    title: "俄罗斯方块",
    description: "控制下落节奏，清线，维持局面。",
    eyebrow: "Game 02",
    note: "Arrow keys / Space / P",
  },
];

const extras = [
  { href: "/jobti", label: "Jobti" },
  { href: "/football", label: "足球" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/30">
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px bg-white/5" />;
}

export default function FunPage() {
  return (
    <div className="bg-black text-white">
      <section className="relative flex min-h-[calc(100vh-5rem)] flex-col justify-center overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="home-orb-primary absolute left-1/2 top-1/2 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
          <div className="home-orb-secondary absolute left-1/2 top-1/2 h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

          {[...Array(10)].map((_, index) => (
            <span
              key={index}
              className="home-particle absolute h-1 w-1 rounded-full bg-white/20"
              style={{
                left: `${10 + index * 8}%`,
                top: `${18 + (index % 5) * 12}%`,
                animationDelay: `${index * 0.18}s`,
                animationDuration: `${3.2 + (index % 4) * 0.4}s`,
              }}
            />
          ))}

          {[...Array(5)].map((_, index) => (
            <div
              key={`v-${index}`}
              className="absolute bottom-0 top-0 w-px origin-top bg-white/5 home-fade-up"
              style={{
                left: `${(index + 1) * 16.5}%`,
                animationDelay: `${0.25 + index * 0.06}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-2xl">
            <SectionLabel>Entertainment</SectionLabel>
            <div className="mt-4 overflow-hidden">
              <h1
                className="home-reveal text-5xl font-bold tracking-tight md:text-8xl"
                style={{ animationDelay: "0.1s" }}
              >
                Fun
              </h1>
            </div>
            <p
              className="home-fade-up mt-6 max-w-xl text-sm leading-relaxed text-white/45 md:text-base"
              style={{ animationDelay: "0.35s" }}
            >
              这里放的是轻量、直接、适合顺手打开的内容。你可以从两个小游戏开始，也可以顺手去别的模块。
            </p>

            <div className="home-fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.55s" }}>
              <Link
                href="/fun/2048"
                className="rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Play 2048
              </Link>
              <Link
                href="/fun/tetris"
                className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                Play Tetris
              </Link>
            </div>
          </div>

          <div className="home-fade-up rounded-[32px] border border-white/8 bg-white/[0.02] p-5" style={{ animationDelay: "0.45s" }}>
            <div className="grid grid-cols-2 gap-4">
              {features.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[26px] border border-white/8 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">{item.eyebrow}</p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/45">{item.description}</p>
                  <div className="mt-6 border-t border-white/8 pt-4 text-xs uppercase tracking-[0.2em] text-white/30">
                    {item.note}
                  </div>
                  <div className="mt-4 text-sm text-white/30 transition-transform group-hover:translate-x-1">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20">
          <div className="mt-10 overflow-hidden rounded-[30px] border border-white/8 bg-white/[0.02]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {features.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group p-6 transition-colors hover:bg-white/[0.03] ${
                    index === 0 ? "md:border-r md:border-white/8" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-white/30">{item.eyebrow}</p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-tight">{item.title}</h2>
                    </div>
                    <span className="text-sm text-white/30 transition-transform group-hover:translate-x-1">↗</span>
                  </div>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-white/45">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <SectionLabel>More</SectionLabel>
            <div className="mt-5 flex flex-wrap gap-3">
              {extras.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/55 transition-colors hover:border-white/20 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <Divider />
            <p className="mt-5 text-xs uppercase tracking-[0.25em] text-white/20">
              Pick a game, then keep moving.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
