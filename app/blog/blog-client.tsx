"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/components/auth-provider";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "moon-blog-posts";

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "welcome",
    title: "欢迎来到博客页",
    excerpt: "这里会持续记录一些页面更新、想法和新内容。",
    content:
      "博客页现在支持前端直接编辑。管理员登录后，可以新增文章、修改内容和维护展示顺序。",
    tags: ["站点更新", "日志"],
    createdAt: "2026-04-22",
    updatedAt: "2026-04-22",
  },
  {
    id: "football",
    title: "足球页更新说明",
    excerpt: "足球页改成了更适合国内访问的轻量嵌入式结构。",
    content:
      "当前足球页不再以外链列表为主，而是保留在站内页面中查看赛程、积分榜和射手榜。",
    tags: ["足球", "页面"],
    createdAt: "2026-04-22",
    updatedAt: "2026-04-22",
  },
];

function createId() {
  return `post-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function readPosts() {
  if (typeof window === "undefined") {
    return DEFAULT_POSTS;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
      return DEFAULT_POSTS;
    }

    const parsed = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
      return DEFAULT_POSTS;
    }

    return parsed;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
    return DEFAULT_POSTS;
  }
}

function emptyDraft(): BlogPost {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: createId(),
    title: "",
    excerpt: "",
    content: "",
    tags: [],
    createdAt: today,
    updatedAt: today,
  };
}

export function BlogClient() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>(() => readPosts());
  const [selectedId, setSelectedId] = useState<string>(() => readPosts()[0]?.id ?? DEFAULT_POSTS[0].id);
  const [draft, setDraft] = useState<BlogPost>(() => readPosts()[0] ?? DEFAULT_POSTS[0]);
  const [tagInput, setTagInput] = useState<string>(() => readPosts()[0]?.tags.join(", ") ?? DEFAULT_POSTS[0].tags.join(", "));

  const isAdmin = user?.isAdmin ?? false;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const selectedPost = posts.find((post) => post.id === selectedId) ?? posts[0] ?? null;

  function handleNewPost() {
    const nextDraft = emptyDraft();
    setDraft(nextDraft);
    setTagInput("");
    setSelectedId(nextDraft.id);
  }

  function handleSave() {
    const tags = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const today = new Date().toISOString().slice(0, 10);
    const nextPost: BlogPost = {
      ...draft,
      tags,
      updatedAt: today,
      createdAt: draft.createdAt || today,
    };

    setPosts((current) => {
      const exists = current.some((post) => post.id === nextPost.id);
      return exists ? current.map((post) => (post.id === nextPost.id ? nextPost : post)) : [nextPost, ...current];
    });
    setSelectedId(nextPost.id);
    setDraft(nextPost);
    setTagInput(tags.join(", "));
  }

  function handleDelete() {
    const fallback = posts.find((post) => post.id !== selectedId) ?? null;
    setPosts((current) => current.filter((post) => post.id !== selectedId));
    if (fallback) {
      setSelectedId(fallback.id);
      setDraft(fallback);
      setTagInput(fallback.tags.join(", "));
    } else {
      handleNewPost();
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/30">Blog</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">博客页</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/40 md:text-base">
            这里会展示最新内容。管理员登录后可以直接在前端新增、修改和删除文章。
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="space-y-4">
            <div className="rounded-[28px] border border-white/8 bg-white/[0.02] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">Posts</p>
              <div className="mt-4 space-y-2">
                {posts.map((post) => {
                  const active = post.id === selectedId;
                  return (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(post.id);
                        setDraft(post);
                        setTagInput(post.tags.join(", "));
                      }}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                        active
                          ? "border-white/25 bg-white/[0.08] text-white"
                          : "border-white/8 text-white/50 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <p className="text-sm font-medium">{post.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">
                        {post.updatedAt}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-black/30 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">Current</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">{selectedPost?.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/40">{selectedPost?.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedPost?.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/8 bg-white/[0.02] p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">Reading</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">{selectedPost?.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/40">{selectedPost?.content}</p>
            </div>

            {isAdmin ? (
              <div className="rounded-[28px] border border-white/8 bg-black/30 p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/30">Editor</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">管理员编辑区</h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleNewPost}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
                  >
                    新建文章
                  </button>
                </div>

                <div className="mt-6 grid gap-4">
                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/30">Title</span>
                    <input
                      value={draft.title}
                      onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/25"
                      placeholder="文章标题"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/30">Excerpt</span>
                    <input
                      value={draft.excerpt}
                      onChange={(event) => setDraft((current) => ({ ...current, excerpt: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/25"
                      placeholder="摘要"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/30">Tags</span>
                    <input
                      value={tagInput}
                      onChange={(event) => setTagInput(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/25"
                      placeholder="标签，用逗号分隔"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/30">Content</span>
                    <textarea
                      value={draft.content}
                      onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))}
                      className="mt-2 min-h-48 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/25"
                      placeholder="文章正文"
                    />
                  </label>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
                    >
                      保存文章
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
                    >
                      删除当前文章
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[28px] border border-white/8 bg-black/30 p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">Editor Locked</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">登录后开放编辑</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/40">
                  只有管理员账号可以修改博客内容。普通登录后只能查看文章。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/account"
                    className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
                  >
                    去登录
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
