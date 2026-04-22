import Link from "next/link";

const destinations = [
  {
    href: "/jobti",
    index: "01",
    title: "Jobti 职业测绘",
  },
  {
    href: "/super-spy-racer",
    index: "02",
    title: "超级间谍赛车",
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

        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--accent-strong)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-strong)] shadow-[0_0_18px_rgba(125,231,255,0.9)]" />
              Moonsilver
            </div>

            <h1 className="max-w-3xl font-serif text-5xl leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              欢迎来到 Moonsilver 的小家！
            </h1>
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
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-sky-400/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full border border-white/10 bg-white/6 blur-xl"
                />

                <div className="relative flex h-full items-start justify-between gap-6">
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
