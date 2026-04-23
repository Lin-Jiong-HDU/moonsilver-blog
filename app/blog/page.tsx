import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, formatBlogDate } from "@/app/lib/blog-content";
import BlogContentClient from "./blog-content-client";

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

      <BlogContentClient posts={posts} />
    </div>
  );
}
