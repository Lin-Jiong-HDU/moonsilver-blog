import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, formatBlogDate } from "@/app/lib/blog-content";

export const metadata: Metadata = {
  title: "博客",
  description: "本地文件驱动的博客目录，只需在 content/blog 里新增文章并推送。",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24 text-[var(--app-fg)] transition-colors duration-300">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--app-muted)]">Blog</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">moonsilver的博客</h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--app-muted)] md:text-base">
            记录我琐碎的日常
          </p>
        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 transition-colors hover:border-[var(--app-border-strong)] hover:bg-[var(--app-surface-strong)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">
                  {formatBlogDate(post.publishedAt)}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--app-fg)]">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--app-muted)]">{post.excerpt}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--app-border)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--app-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex text-sm text-[var(--app-fg)]/70 transition-colors group-hover:text-[var(--app-fg)]">
                  阅读文章
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-[var(--app-border)] bg-[var(--app-surface)]/60 p-10 text-sm text-[var(--app-muted)]">
            还没有文章。去 `content/blog` 里新增一个 JSON 文件吧。
          </div>
        )}
      </section>
    </div>
  );
}
