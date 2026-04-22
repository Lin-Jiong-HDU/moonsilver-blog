import type { Metadata } from "next";
import { BlogClient } from "@/app/blog/blog-client";

export const metadata: Metadata = {
  title: "博客",
  description: "站内博客页，文章由站点服务器统一保存。",
};

export default function BlogPage() {
  return <BlogClient />;
}
