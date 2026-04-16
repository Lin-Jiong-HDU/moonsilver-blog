import Link from "next/link";
import {
  currentFocus,
  designPrinciples,
  notes,
  posts,
} from "@/app/lib/site-data";

const featuredPost = posts[0];
const recentPosts = posts.slice(1);
const panelClass =
  "rounded-[32px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] backdrop-blur-xl";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-20 pb-24 pt-10 sm:gap-24 sm:pt-14">
      <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-xs tracking-[0.24em] text-[var(--accent-strong)] shadow-[var(--shadow-soft)] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-strong)]" />
            Moonsilver Journal
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.055em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              把技术、设计与生活，
              <br />
              写成可以慢慢读的文字。
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              这是 Moonsilver 的个人博客初版方向。它不追求信息密度，也不做热闹的内容流，
              而是更像一间安静的工作室，把长期有效的观察、项目经验和生活感受好好留下来。
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/writing"
              className="inline-flex items-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              进入写作
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)]"
            >
              了解作者
            </Link>
          </div>
        </div>

        <div className={`relative overflow-hidden p-8 sm:p-10 ${panelClass}`}>
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(161,173,192,0.78),rgba(255,255,255,0)_68%)] blur-md"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[-3rem] left-[-3rem] h-36 w-36 rounded-full border border-white/50 bg-white/35 backdrop-blur-2xl"
          />

          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            Currently
          </p>
          <h2 className="mt-4 max-w-sm text-2xl font-medium leading-9 tracking-[-0.04em] text-[var(--foreground)]">
            把博客做成一个更像作品、而不是资讯流的个人空间。
          </h2>

          <ul className="mt-8 space-y-4">
            {currentFocus.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-4 border-t border-[var(--line)] pt-4 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-xs tracking-[0.24em] text-[var(--accent-strong)]">
                  0{index + 1}
                </span>
                <p className="text-sm leading-7 text-[var(--muted-strong)]">{item}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-[var(--line)] pt-6">
            <div>
              <p className="text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                03
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Essays
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                04
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Notes
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                01
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Quiet tone
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Link
          href={`/writing/${featuredPost.slug}`}
          className={`group overflow-hidden p-8 transition-transform hover:-translate-y-1 sm:p-10 ${panelClass}`}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-5">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                Featured Essay
              </p>
              <div className="space-y-3">
                <p className="text-sm text-[var(--muted)]">
                  {featuredPost.category} · {featuredPost.date} · {featuredPost.readTime}
                </p>
                <h2 className="max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.05em] text-[var(--foreground)] sm:text-[3.3rem]">
                  {featuredPost.title}
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
                  {featuredPost.excerpt}
                </p>
              </div>
            </div>

            <span className="hidden rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-sm text-[var(--foreground)] shadow-[var(--shadow-soft)] transition-transform group-hover:translate-x-1 md:inline-flex">
              阅读 →
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {featuredPost.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs text-[var(--muted-strong)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>

        <div className={`p-8 sm:p-10 ${panelClass}`}>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            Design Direction
          </p>
          <h2 className="mt-4 max-w-lg font-serif text-4xl leading-[1.06] tracking-[-0.05em] text-[var(--foreground)]">
            苹果气质，不是冷淡，
            <br />
            而是克制之后的从容。
          </h2>

          <div className="mt-8 space-y-4">
            {designPrinciples.map((principle) => (
              <div
                key={principle.title}
                className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5"
              >
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {principle.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr]">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            Latest Writing
          </p>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.05em] text-[var(--foreground)] sm:text-5xl">
            用清楚的结构，
            <br />
            让内容自己说话。
          </h2>
          <p className="max-w-sm text-base leading-8 text-[var(--muted)]">
            文章列表不做信息轰炸，而是像一本薄杂志的目录。标题要克制，摘要要准确，读者应该一眼就知道这篇文章值不值得打开。
          </p>
        </div>

        <div className={`overflow-hidden ${panelClass}`}>
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group flex flex-col gap-5 border-t border-[var(--line)] px-6 py-6 transition-colors first:border-t-0 hover:bg-white/50 sm:px-8 sm:py-8 md:flex-row md:items-start md:justify-between"
            >
              <div className="max-w-2xl">
                <p className="text-sm text-[var(--muted)]">
                  {post.category} · {post.date} · {post.readTime}
                </p>
                <h3 className="mt-3 text-2xl font-medium leading-9 tracking-[-0.04em] text-[var(--foreground)]">
                  {post.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-[var(--muted-strong)]">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-4 md:min-w-[120px] md:justify-end">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-[var(--foreground)] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              Notes
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] tracking-[-0.05em] text-[var(--foreground)] sm:text-5xl">
              留一点更轻的、
              <br />
              更像随手记下的东西。
            </h2>
          </div>
          <Link
            href="/notes"
            className="text-sm text-[var(--muted-strong)] transition-colors hover:text-[var(--foreground)]"
          >
            查看全部短笔记 →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {notes.map((note) => (
            <article
              key={note.title}
              className={`p-6 transition-transform hover:-translate-y-1 ${panelClass}`}
            >
              <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                <span>{note.tag}</span>
                <span>{note.date}</span>
              </div>
              <h3 className="mt-5 text-xl font-medium leading-8 tracking-[-0.03em] text-[var(--foreground)]">
                {note.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                {note.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={`grid gap-8 p-8 sm:grid-cols-[0.9fr_1.1fr] sm:p-10 ${panelClass}`}>
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            About This Version
          </p>
          <h2 className="font-serif text-4xl leading-[1.06] tracking-[-0.05em] text-[var(--foreground)]">
            这是一个先把气质站稳的第一版。
          </h2>
          <p className="max-w-md text-base leading-8 text-[var(--muted)]">
            第一阶段不急着引入复杂 CMS、评论系统或标签体系，而是先把品牌感、结构感和阅读体验固定下来。这样后面无论接 Markdown、MDX 还是 Headless CMS，都不会推倒重来。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5">
            <p className="text-sm font-medium text-[var(--foreground)]">内容优先</p>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              首页、列表页和文章页的层级已经先站稳，后续填内容会很顺。
            </p>
          </div>
          <div className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5">
            <p className="text-sm font-medium text-[var(--foreground)]">视觉统一</p>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              统一使用银灰、留白、柔和边框和轻量阴影，避免样式漂移。
            </p>
          </div>
          <div className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5">
            <p className="text-sm font-medium text-[var(--foreground)]">便于扩展</p>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              下一步可以自然接入文章数据源、项目页、搜索和 RSS，不需要重做结构。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
