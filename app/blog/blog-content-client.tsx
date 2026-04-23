"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/app/components/search-bar";
import { formatBlogDate } from "@/app/lib/blog-content";
import type { BlogPost } from "@/app/lib/blog-content";

interface BlogContentClientProps {
  posts: BlogPost[];
}

export default function BlogContentClient({ posts }: BlogContentClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-8">
        <SearchBar
          placeholder="搜索文章..."
          onSearch={setSearchQuery}
        />
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
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
          {posts.length === 0
            ? "还没有文章。去 `content/blog` 里新增一个 JSON 文件吧。"
            : "没有找到匹配的文章"}
        </div>
      )}
    </section>
  );
}
