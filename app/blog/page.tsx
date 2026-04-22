import type { Metadata } from "next";
import { BlogClient } from "@/app/blog/blog-client";

export const metadata: Metadata = {
  title: "博客",
  description: "站内博客页，支持管理员在前端直接编辑文章。",
};

export default function BlogPage() {
  return <BlogClient />;
}
