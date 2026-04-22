export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  fontSize: number;
  lineHeight: number;
  paragraphSpacing: number;
};

const DEFAULT_DATE = "2026-04-22";

function createId() {
  return `post-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createPost(content: string, excerpt: string, tags: string[], title: string): BlogPost {
  return {
    id: createId(),
    title,
    excerpt,
    content,
    tags,
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE,
    fontSize: 16,
    lineHeight: 1.75,
    paragraphSpacing: 14,
  };
}

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  createPost(
    "<p>博客页现在由站点服务器统一保存。管理员登录后，可以直接在前端新增、编辑和删除文章，所有访问者看到的都是同一份内容。</p>",
    "这里会持续更新站点动态、想法和新内容。",
    ["站点更新", "博客"],
    "欢迎来到博客页",
  ),
  createPost(
    "<p>我们会继续调整页面结构和内容展示方式，让站点保持轻量、直接、好维护。新的文章和说明会优先同步到这里。</p>",
    "足球页、Jobti 和博客都会继续迭代。",
    ["更新", "说明"],
    "站点内容更新说明",
  ),
];

export function createEmptyBlogPost(): BlogPost {
  const today = new Date().toISOString().slice(0, 10);

  return {
    id: createId(),
    title: "",
    excerpt: "",
    content: "<p><br /></p>",
    tags: [],
    createdAt: today,
    updatedAt: today,
    fontSize: 16,
    lineHeight: 1.75,
    paragraphSpacing: 14,
  };
}

function normalizeDate(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function normalizeTags(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
    .filter(Boolean);
}

function normalizeNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function normalizeBlogPosts(value: unknown): BlogPost[] {
  if (!Array.isArray(value)) {
    return DEFAULT_BLOG_POSTS;
  }

  const posts = value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      const id = typeof item.id === "string" && item.id.trim() ? item.id : createId();
      const title = typeof item.title === "string" ? item.title.trim() : "";
      const excerpt = typeof item.excerpt === "string" ? item.excerpt.trim() : "";
      const content = typeof item.content === "string" && item.content.trim() ? item.content : "<p><br /></p>";
      const tags = normalizeTags(item.tags);
      const createdAt = normalizeDate(item.createdAt, new Date().toISOString().slice(0, 10));
      const updatedAt = normalizeDate(item.updatedAt, createdAt);
      const fontSize = normalizeNumber(item.fontSize, 16);
      const lineHeight = normalizeNumber(item.lineHeight, 1.75);
      const paragraphSpacing = normalizeNumber(item.paragraphSpacing, 14);

      return {
        id,
        title,
        excerpt,
        content,
        tags,
        createdAt,
        updatedAt,
        fontSize,
        lineHeight,
        paragraphSpacing,
      } satisfies BlogPost;
    })
    .filter((post): post is BlogPost => Boolean(post));

  return posts.length > 0 ? posts : DEFAULT_BLOG_POSTS;
}
