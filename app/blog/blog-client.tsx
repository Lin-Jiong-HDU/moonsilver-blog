"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/components/auth-provider";
import {
  DEFAULT_BLOG_POSTS,
  createEmptyBlogPost,
  type BlogPost,
} from "@/app/lib/blog-data";

function getFallbackPost(posts: BlogPost[]) {
  return posts[0] ?? DEFAULT_BLOG_POSTS[0] ?? createEmptyBlogPost();
}

function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function BlogClient() {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin ?? false;

  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_BLOG_POSTS);
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_BLOG_POSTS[0]?.id ?? "");
  const [draft, setDraft] = useState<BlogPost>(() => getFallbackPost(DEFAULT_BLOG_POSTS));
  const [tagInput, setTagInput] = useState<string>(() => getFallbackPost(DEFAULT_BLOG_POSTS).tags.join(", "));
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        const response = await fetch("/api/blog", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load blog posts.");
        }

        const data = (await response.json()) as { posts?: BlogPost[] };
        if (!active) {
          return;
        }

        const nextPosts = Array.isArray(data.posts) && data.posts.length > 0 ? data.posts : DEFAULT_BLOG_POSTS;
        setPosts(nextPosts);
        setSelectedId((current) => nextPosts.find((post) => post.id === current)?.id ?? nextPosts[0]?.id ?? "");
      } catch {
        if (active) {
          setPosts(DEFAULT_BLOG_POSTS);
          setSelectedId(DEFAULT_BLOG_POSTS[0]?.id ?? "");
          setStatusMessage("博客暂时读取本地默认内容，保存后会同步到服务器。");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const selectedPost = posts.find((post) => post.id === selectedId);
    if (!selectedPost) {
      return;
    }

    setDraft(selectedPost);
    setTagInput(selectedPost.tags.join(", "));
  }, [posts, selectedId]);

  const selectedPost = posts.find((post) => post.id === selectedId) ?? draft;

  async function persistPosts(nextPosts: BlogPost[]) {
    if (!user || !isAdmin) {
      setStatusMessage("只有管理员账号可以保存博客内容。");
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/blog", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
          posts: nextPosts,
        }),
      });

      const data = (await response.json().catch(() => null)) as { posts?: BlogPost[]; error?: string } | null;

      if (!response.ok) {
        throw new Error(data?.error ?? "Save failed.");
      }

      const savedPosts = Array.isArray(data?.posts) && data?.posts.length > 0 ? data.posts : nextPosts;
      setPosts(savedPosts);
      setSelectedId((current) => savedPosts.find((post) => post.id === current)?.id ?? savedPosts[0]?.id ?? "");
      setStatusMessage("博客已同步到站点服务器。");
    } catch {
      setStatusMessage("保存失败，请稍后再试。");
    } finally {
      setIsSaving(false);
    }
  }

  function handleNewPost() {
    const nextDraft = createEmptyBlogPost();
    setSelectedId(nextDraft.id);
    setDraft(nextDraft);
    setTagInput("");
    setStatusMessage(null);
  }

  async function handleSave() {
    const title = draft.title.trim();
    if (!title) {
      setStatusMessage("标题不能为空。");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const tags = parseTags(tagInput);
    const nextPost: BlogPost = {
      ...draft,
      title,
      excerpt: draft.excerpt.trim(),
      content: draft.content.trim(),
      tags,
      updatedAt: today,
      createdAt: draft.createdAt || today,
    };

    const exists = posts.some((post) => post.id === nextPost.id);
    const nextPosts = exists
      ? posts.map((post) => (post.id === nextPost.id ? nextPost : post))
      : [nextPost, ...posts];

    setDraft(nextPost);
    setSelectedId(nextPost.id);
    setTagInput(tags.join(", "));
    await persistPosts(nextPosts);
  }

  async function handleDelete() {
    const nextPosts = posts.filter((post) => post.id !== selectedId);
    const fallback = nextPosts[0] ?? DEFAULT_BLOG_POSTS[0] ?? createEmptyBlogPost();

    if (nextPosts.length === 0) {
      setSelectedId(DEFAULT_BLOG_POSTS[0]?.id ?? fallback.id);
      setDraft(DEFAULT_BLOG_POSTS[0] ?? fallback);
      setTagInput((DEFAULT_BLOG_POSTS[0] ?? fallback).tags.join(", "));
      await persistPosts(DEFAULT_BLOG_POSTS);
      return;
    }

    setSelectedId(fallback.id);
    setDraft(fallback);
    setTagInput(fallback.tags.join(", "));
    await persistPosts(nextPosts);
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24 text-[var(--app-fg)] transition-colors duration-300">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--app-muted)]">Blog</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">博客页</h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--app-muted)] md:text-base">
            文章内容由站点服务器统一保存。管理员登录后可以直接在前端新增、编辑和删除文章，所有访问者看到的都是同一份内容。
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="space-y-4">
            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Posts</p>
                {isLoading ? <span className="text-xs text-[var(--app-muted)]">同步中</span> : null}
              </div>
              <div className="mt-4 space-y-2">
                {posts.map((post) => {
                  const active = post.id === selectedId;

                  return (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => setSelectedId(post.id)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                        active
                          ? "border-[var(--app-border-strong)] bg-[var(--app-surface-strong)] text-[var(--app-fg)]"
                          : "border-[var(--app-border)] text-[var(--app-muted)] hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
                      }`}
                    >
                      <p className="text-sm font-medium">{post.title || "未命名文章"}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--app-muted)]">
                        {post.updatedAt}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Current</p>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--app-fg)]">{selectedPost.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--app-muted)]">{selectedPost.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--app-border)] px-3 py-1 text-xs text-[var(--app-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Reading</p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--app-fg)]">{selectedPost.title}</h2>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--app-muted)]">
                {selectedPost.content}
              </p>
              {statusMessage ? (
                <p className="mt-5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-muted)]">
                  {statusMessage}
                </p>
              ) : null}
            </div>

            {isAdmin ? (
              <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Editor</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--app-fg)]">管理员编辑区</h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleNewPost}
                    className="rounded-full border border-[var(--app-border)] px-4 py-2 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
                  >
                    新建文章
                  </button>
                </div>

                <div className="mt-6 grid gap-4">
                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Title</span>
                    <input
                      value={draft.title}
                      onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors focus:border-[var(--app-border-strong)]"
                      placeholder="文章标题"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Excerpt</span>
                    <input
                      value={draft.excerpt}
                      onChange={(event) => setDraft((current) => ({ ...current, excerpt: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors focus:border-[var(--app-border-strong)]"
                      placeholder="摘要"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Tags</span>
                    <input
                      value={tagInput}
                      onChange={(event) => setTagInput(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors focus:border-[var(--app-border-strong)]"
                      placeholder="标签，用逗号分隔"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Content</span>
                    <textarea
                      value={draft.content}
                      onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))}
                      className="mt-2 min-h-48 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors focus:border-[var(--app-border-strong)]"
                      placeholder="正文内容"
                    />
                  </label>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="rounded-full bg-[var(--app-fg)] px-5 py-3 text-sm font-medium text-[var(--app-bg)] transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? "保存中..." : "保存文章"}
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={isSaving}
                      className="rounded-full border border-[var(--app-border)] px-5 py-3 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      删除当前文章
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Editor Locked</p>
                <h3 className="mt-4 text-2xl font-semibold text-[var(--app-fg)]">登录后开放编辑</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--app-muted)]">
                  只有管理员账号可以修改博客内容。普通访问者可以直接阅读文章。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/account"
                    className="rounded-full bg-[var(--app-fg)] px-5 py-3 text-sm font-medium text-[var(--app-bg)] transition-colors hover:opacity-90"
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
