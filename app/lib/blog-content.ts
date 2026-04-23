import path from "node:path";
import { readdir, readFile } from "node:fs/promises";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  contentHtml: string;
};

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function normalizeDate(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function normalizePost(slug: string, value: unknown): BlogPost | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = typeof value.title === "string" ? value.title.trim() : "";
  const excerpt = typeof value.excerpt === "string" ? value.excerpt.trim() : "";
  const contentHtml = typeof value.contentHtml === "string" ? value.contentHtml.trim() : "";

  if (!title || !excerpt || !contentHtml) {
    return null;
  }

  const today = new Date().toISOString().slice(0, 10);

  return {
    slug,
    title,
    excerpt,
    publishedAt: normalizeDate(value.publishedAt, today),
    updatedAt: normalizeDate(value.updatedAt, normalizeDate(value.publishedAt, today)),
    tags: toStringArray(value.tags),
    contentHtml,
  };
}

async function readPostFile(fileName: string): Promise<BlogPost | null> {
  const slug = fileName.replace(/\.json$/i, "");
  const filePath = path.join(BLOG_CONTENT_DIR, fileName);

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return normalizePost(slug, parsed);
  } catch {
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const entries = await readdir(BLOG_CONTENT_DIR, { withFileTypes: true });
    const files = entries.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".json"));
    const posts = await Promise.all(files.map((entry) => readPostFile(entry.name)));

    return posts
      .filter((post): post is BlogPost => Boolean(post))
      .sort((a, b) => {
        const dateDiff = b.publishedAt.localeCompare(a.publishedAt);
        if (dateDiff !== 0) {
          return dateDiff;
        }

        return b.updatedAt.localeCompare(a.updatedAt);
      });
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}
