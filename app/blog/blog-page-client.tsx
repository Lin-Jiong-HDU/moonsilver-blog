"use client";

import { useSiteLanguage } from "@/app/components/language-provider";
import BlogContentClient from "./blog-content-client";
import type { BlogPost } from "@/app/lib/blog-content";

type BlogPageClientProps = {
  posts: BlogPost[];
};

const copy = {
  zh: {
    eyebrow: "博客",
    title: "moonsilver 的博客",
    description: "记录一些琐碎的日常和想法。",
  },
  en: {
    eyebrow: "Blog",
    title: "moonsilver blog",
    description: "Notes, drafts, and occasional long-form posts.",
  },
} as const;

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const { language } = useSiteLanguage();

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24 text-[var(--app-fg)] transition-colors duration-300">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--app-muted)]">
            {copy[language].eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{copy[language].title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--app-muted)] md:text-base">
            {copy[language].description}
          </p>
        </div>
      </section>

      <BlogContentClient posts={posts} />
    </div>
  );
}
