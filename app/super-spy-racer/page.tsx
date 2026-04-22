import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "超级间谍赛车",
  description: "超级间谍赛车 NES ROM 的独立入口页，支持直接下载与使用说明。",
};

const facts = [
  { label: "格式", value: "NES ROM" },
  { label: "文件名", value: "super-spy-racer.nes" },
  { label: "体积", value: "约 256 KB" },
];

const playSteps = [
  "点击下载按钮获取 ROM 文件。",
  "用你常用的 NES 模拟器打开，比如 FCEUX、Mesen 或 RetroArch。",
  "如果只是做归档，这个页面也可以作为统一入口保留在站内。",
];

export default function SuperSpyRacerPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 pb-20 pt-8 sm:gap-10 sm:pb-24 sm:pt-14">
      <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[rgba(9,14,34,0.76)] px-6 py-8 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:px-10 sm:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,89,170,0.18),transparent_24%),radial-gradient(circle_at_88%_18%,rgba(113,108,255,0.24),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_58%)]"
        />

        <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#ff8fda]">
              <span className="h-2 w-2 rounded-full bg-[#ff8fda] shadow-[0_0_18px_rgba(255,143,218,0.9)]" />
              Arcade Archive
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-5xl leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">
                超级间谍赛车
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
                这里是根目录那份 `NES` 文件的站内入口页。你可以把它当成游戏归档，也可以直接下载后丢进模拟器开跑。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/roms/super-spy-racer.nes"
                download
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[#081122] transition-transform hover:-translate-y-0.5"
              >
                下载 ROM
              </a>
              <a
                href="/roms/super-spy-racer.nes"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/22 hover:bg-white/10"
              >
                新标签打开
              </a>
              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/22 hover:bg-white/10"
              >
                返回导航站
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#ffb2e6]">
                File Snapshot
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {facts.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/8 bg-black/14 px-4 py-4"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#ffb2e6]">
                How To Use
              </p>
              <div className="mt-5 space-y-3">
                {playSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-4 rounded-2xl border border-white/8 bg-black/14 px-4 py-4"
                  >
                    <span className="font-mono text-xs tracking-[0.2em] text-[#ff8fda]">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-7 text-[var(--muted-strong)]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
