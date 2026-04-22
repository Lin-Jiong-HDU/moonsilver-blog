"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/app/components/auth-provider";
import { DEFAULT_BLOG_POSTS, createEmptyBlogPost, type BlogPost } from "@/app/lib/blog-data";

function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getFallbackPost(posts: BlogPost[]) {
  return posts[0] ?? DEFAULT_BLOG_POSTS[0] ?? createEmptyBlogPost();
}

export function BlogClient() {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin ?? false;
  const editorRef = useRef<HTMLDivElement | null>(null);

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
        const response = await fetch("/api/blog", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load blog posts.");
        }

        const data = (await response.json()) as { posts?: BlogPost[] };
        if (!active) {
          return;
        }

        const nextPosts = Array.isArray(data.posts) && data.posts.length > 0 ? data.posts : DEFAULT_BLOG_POSTS;
        setPosts(nextPosts);
        setSelectedId(nextPosts[0]?.id ?? "");
      } catch {
        if (active) {
          setPosts(DEFAULT_BLOG_POSTS);
          setSelectedId(DEFAULT_BLOG_POSTS[0]?.id ?? "");
          setStatusMessage("博客暂时读取默认内容，保存后会同步到服务器。");
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
    if (editorRef.current) {
      editorRef.current.innerHTML = selectedPost.content;
    }
  }, [posts, selectedId]);

  const selectedPost = useMemo(() => posts.find((post) => post.id === selectedId) ?? draft, [posts, selectedId, draft]);

  function syncDraftFromEditor() {
    const content = editorRef.current?.innerHTML ?? draft.content;
    setDraft((current) => ({
      ...current,
      content,
    }));
  }

  function applyFormatting(command: "bold" | "italic" | "underline") {
    if (!editorRef.current) {
      return;
    }

    editorRef.current.focus();
    document.execCommand(command, false);
    syncDraftFromEditor();
  }

  async function persistPosts(nextPosts: BlogPost[], focusId: string) {
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
      setSelectedId(savedPosts.find((post) => post.id === focusId)?.id ?? savedPosts[0]?.id ?? "");
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
    if (editorRef.current) {
      editorRef.current.innerHTML = nextDraft.content;
      editorRef.current.focus();
    }
  }

  async function handleSave() {
    const title = draft.title.trim();
    if (!title) {
      setStatusMessage("标题不能为空。");
      return;
    }

    syncDraftFromEditor();
    const content = editorRef.current?.innerHTML ?? draft.content;
    const today = new Date().toISOString().slice(0, 10);
    const tags = parseTags(tagInput);

    const nextPost: BlogPost = {
      ...draft,
      title,
      excerpt: draft.excerpt.trim(),
      content,
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
    await persistPosts(nextPosts, nextPost.id);
  }

  async function handleDelete() {
    const nextPosts = posts.filter((post) => post.id !== selectedId);
    const fallback = nextPosts[0] ?? DEFAULT_BLOG_POSTS[0] ?? createEmptyBlogPost();

    if (nextPosts.length === 0) {
      setSelectedId(DEFAULT_BLOG_POSTS[0]?.id ?? fallback.id);
      setDraft(DEFAULT_BLOG_POSTS[0] ?? fallback);
      setTagInput((DEFAULT_BLOG_POSTS[0] ?? fallback).tags.join(", "));
      if (editorRef.current) {
        editorRef.current.innerHTML = (DEFAULT_BLOG_POSTS[0] ?? fallback).content;
      }
      await persistPosts(DEFAULT_BLOG_POSTS, DEFAULT_BLOG_POSTS[0]?.id ?? fallback.id);
      return;
    }

    setSelectedId(fallback.id);
    setDraft(fallback);
    setTagInput(fallback.tags.join(", "));
    if (editorRef.current) {
      editorRef.current.innerHTML = fallback.content;
    }
    await persistPosts(nextPosts, fallback.id);
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24 text-[var(--app-fg)] transition-colors duration-300">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--app-muted)]">Blog</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">博客页</h1>
            <p className="mt-4 text-sm leading-relaxed text-[var(--app-muted)] md:text-base">
              文章内容由站点服务器统一保存。管理员登录后可以在这里直接编辑，所有访问者看到的都是同一份内容。
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-[var(--app-border)] px-4 py-2 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
          >
            返回首页
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
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

              {isAdmin ? (
                <button
                  type="button"
                  onClick={handleNewPost}
                  className="mt-4 w-full rounded-full border border-[var(--app-border)] px-4 py-3 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
                >
                  新建文章
                </button>
              ) : null}
            </div>

            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Meta</p>
              <div className="mt-4 space-y-3 text-sm text-[var(--app-muted)]">
                <p>标题：{selectedPost.title || "未命名文章"}</p>
                <p>标签：{selectedPost.tags.length > 0 ? selectedPost.tags.join(" / ") : "无"}</p>
                <p>日期：{selectedPost.updatedAt}</p>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Editor</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[var(--app-fg)]">
                    {isAdmin ? "小型排版编辑器" : "只读预览"}
                  </h2>
                </div>
                {isAdmin ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => applyFormatting("bold")}
                      className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs font-semibold text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormatting("italic")}
                      className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs italic text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormatting("underline")}
                      className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs underline text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
                    >
                      U
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Title</span>
                  <input
                    value={draft.title}
                    onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors focus:border-[var(--app-border-strong)]"
                    placeholder="文章标题"
                    readOnly={!isAdmin}
                  />
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Excerpt</span>
                  <input
                    value={draft.excerpt}
                    onChange={(event) => setDraft((current) => ({ ...current, excerpt: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors focus:border-[var(--app-border-strong)]"
                    placeholder="摘要"
                    readOnly={!isAdmin}
                  />
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">Tags</span>
                  <input
                    value={tagInput}
                    onChange={(event) => setTagInput(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-fg)] outline-none transition-colors focus:border-[var(--app-border-strong)]"
                    placeholder="标签，用逗号分隔"
                    readOnly={!isAdmin}
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">
                    字号 {draft.fontSize}px
                  </span>
                  <input
                    type="range"
                    min="12"
                    max="28"
                    step="1"
                    value={draft.fontSize}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        fontSize: Number(event.target.value),
                      }))
                    }
                    className="mt-3 w-full"
                    disabled={!isAdmin}
                  />
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">
                    行距 {draft.lineHeight.toFixed(2)}
                  </span>
                  <input
                    type="range"
                    min="1.2"
                    max="2.4"
                    step="0.05"
                    value={draft.lineHeight}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        lineHeight: Number(event.target.value),
                      }))
                    }
                    className="mt-3 w-full"
                    disabled={!isAdmin}
                  />
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">
                    段落间距 {draft.paragraphSpacing}px
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="28"
                    step="1"
                    value={draft.paragraphSpacing}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        paragraphSpacing: Number(event.target.value),
                      }))
                    }
                    className="mt-3 w-full"
                    disabled={!isAdmin}
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {isAdmin ? (
                  <>
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
                  </>
                ) : null}
              </div>

              <div className="mt-6 rounded-[24px] border border-[var(--app-border)] bg-[var(--app-bg)] p-4">
                <div
                  ref={editorRef}
                  contentEditable={isAdmin}
                  suppressContentEditableWarning
                  onInput={syncDraftFromEditor}
                  onBlur={syncDraftFromEditor}
                  className="min-h-80 outline-none"
                  style={{
                    fontSize: `${draft.fontSize}px`,
                    lineHeight: draft.lineHeight,
                  }}
                  data-blog-editor
                />
                <style jsx global>{`
                  [data-blog-editor] p {
                    margin: 0 0 ${draft.paragraphSpacing}px;
                  }

                  [data-blog-editor] p:last-child {
                    margin-bottom: 0;
                  }

                  [data-blog-editor] ul,
                  [data-blog-editor] ol {
                    margin: 0 0 ${draft.paragraphSpacing}px 1.25rem;
                  }

                  [data-blog-editor] h1,
                  [data-blog-editor] h2,
                  [data-blog-editor] h3,
                  [data-blog-editor] h4 {
                    margin: 0 0 ${draft.paragraphSpacing}px;
                  }
                `}</style>
              </div>

              {statusMessage ? (
                <p className="mt-5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm text-[var(--app-muted)]">
                  {statusMessage}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
