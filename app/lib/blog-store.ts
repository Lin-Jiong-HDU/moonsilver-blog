import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { DEFAULT_BLOG_POSTS, normalizeBlogPosts, type BlogPost } from "@/app/lib/blog-data";

const BLOG_STORE_PATH = path.join(process.cwd(), "data", "blog-posts.json");

async function ensureStoreFile() {
  await mkdir(path.dirname(BLOG_STORE_PATH), { recursive: true });

  try {
    await readFile(BLOG_STORE_PATH, "utf8");
  } catch {
    await writeFile(BLOG_STORE_PATH, JSON.stringify(DEFAULT_BLOG_POSTS, null, 2), "utf8");
  }
}

export async function readBlogPosts(): Promise<BlogPost[]> {
  await ensureStoreFile();

  try {
    const raw = await readFile(BLOG_STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    const posts = normalizeBlogPosts(parsed);

    if (posts.length === 0) {
      await writeFile(BLOG_STORE_PATH, JSON.stringify(DEFAULT_BLOG_POSTS, null, 2), "utf8");
      return DEFAULT_BLOG_POSTS;
    }

    return posts;
  } catch {
    await writeFile(BLOG_STORE_PATH, JSON.stringify(DEFAULT_BLOG_POSTS, null, 2), "utf8");
    return DEFAULT_BLOG_POSTS;
  }
}

export async function replaceBlogPosts(posts: BlogPost[]): Promise<BlogPost[]> {
  const nextPosts = normalizeBlogPosts(posts);
  await ensureStoreFile();
  await writeFile(BLOG_STORE_PATH, JSON.stringify(nextPosts, null, 2), "utf8");
  return nextPosts;
}
