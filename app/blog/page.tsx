import type { Metadata } from "next";
import { getAllBlogPosts } from "@/app/lib/blog-content";
import BlogPageClient from "./blog-page-client";

export const metadata: Metadata = {
  title: "Blog / 博客",
  description: "A local file-driven blog index / 基于本地文件驱动的博客索引。",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return <BlogPageClient posts={posts} />;
}
