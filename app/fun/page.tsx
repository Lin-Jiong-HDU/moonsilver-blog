import Link from "next/link";

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
            放松一下，玩玩小游戏。
          </p>
        </div>

        <div className="flex flex-1 items-start">
          <Link href="/jobti" className="group relative block w-full max-w-sm">
            <div className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]">
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: "inset 0 0 30px rgba(255,255,255,0.03)" }}
              />

              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 transition-colors group-hover:border-white/25">
                  <span className="text-2xl">🎮</span>
                </div>

                <h2 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-white">
                  Jobti
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-white/40">
                  一个有趣的小游戏，点击进入开始体验。
                </p>

                <div className="flex items-center gap-2 text-xs text-white/30 transition-colors group-hover:text-white/60">
                  <span>进入游戏</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-xs tracking-widest text-white/15">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
