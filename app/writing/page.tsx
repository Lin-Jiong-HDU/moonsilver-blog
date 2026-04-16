import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/app/lib/site-data";

export const metadata: Metadata = {
  title: "Writing",
  description: "Moonsilver 的文章列表，围绕设计、前端、写作与长期主义展开。",
};

const panelClass =
  "rounded-[32px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] backdrop-blur-xl";

export default function WritingPage() {
  return (
    <div className="flex flex-1 flex-col gap-12 pb-24 pt-10 sm:pt-14">
      <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            Writing
          </p>
          <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] text-[var(--foreground)] sm:text-6xl">
            写一些值得反复看的东西。
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          这里不追求频率，而追求每一篇文章都足够清楚、足够完整。它们更像被认真整理过的长期笔记，而不是一次性的信息投递。
        </p>
      </section>

      <section className={`overflow-hidden ${panelClass}`}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group flex flex-col gap-5 border-t border-[var(--line)] px-6 py-7 transition-colors first:border-t-0 hover:bg-white/45 sm:px-8 sm:py-8 md:flex-row md:items-start md:justify-between"
          >
            <div className="max-w-3xl">
              <p className="text-sm text-[var(--muted)]">
                {post.category} · {post.date} · {post.readTime}
              </p>
              <h2 className="mt-3 text-3xl font-medium leading-10 tracking-[-0.04em] text-[var(--foreground)]">
                {post.title}
              </h2>
              <p className="mt-3 text-base leading-8 text-[var(--muted-strong)]">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-4 md:min-w-[180px] md:justify-end">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm text-[var(--foreground)] transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
