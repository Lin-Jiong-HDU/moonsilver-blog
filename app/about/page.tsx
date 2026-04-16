import type { Metadata } from "next";
import { aboutHighlights, designPrinciples } from "@/app/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "关于 Moonsilver：关注设计表达、前端体验、写作节奏，以及长期有效的个人网站建设。",
};

const panelClass =
  "rounded-[32px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] backdrop-blur-xl";

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col gap-12 pb-24 pt-10 sm:pt-14">
      <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            About
          </p>
          <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] text-[var(--foreground)] sm:text-6xl">
            希望把个人网站，
            <br />
            做成一间慢慢长出来的工作室。
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          Moonsilver 关注的是长期而不喧哗的表达方式。这里会写界面、写前端、写项目判断，也会写那些让人慢下来之后才看得见的细节。
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <article className={`p-8 sm:p-10 ${panelClass}`}>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            What I Care About
          </p>
          <div className="mt-8 space-y-4">
            {aboutHighlights.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5"
              >
                <p className="text-sm leading-7 text-[var(--muted-strong)]">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className={`p-8 sm:p-10 ${panelClass}`}>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            Working Principles
          </p>
          <div className="mt-8 space-y-4">
            {designPrinciples.map((principle) => (
              <div
                key={principle.title}
                className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5"
              >
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {principle.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
