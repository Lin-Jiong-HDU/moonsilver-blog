import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getAllBlogPosts } from "@/app/lib/blog-content";
import BlogContentClient from "./blog-content-client";
import {
  LANGUAGE_COOKIE,
  type SiteLanguage,
  normalizeSiteLanguage,
} from "@/app/lib/site-language";

const copy: Record<SiteLanguage, { title: string; description: string; eyebrow: string }> = {
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
};

export const metadata: Metadata = {
  title: "Blog",
  description: "A local file-driven blog index.",
};

export default async function BlogPage() {
  const storedLanguage = cookies().get(LANGUAGE_COOKIE)?.value;
  const language = normalizeSiteLanguage(storedLanguage);
  const posts = await getAllBlogPosts();

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

      <BlogContentClient posts={posts} language={language} />
    </div>
  );
}
