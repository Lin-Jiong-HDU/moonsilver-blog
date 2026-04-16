import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/app/lib/site-data";

type WritingDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: WritingDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function WritingDetailPage({
  params,
}: WritingDetailProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pb-24 pt-10 sm:pt-14">
      <article className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="rounded-[36px] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-xl sm:p-10">
          <Link
            href="/writing"
            className="inline-flex rounded-full border border-[var(--line)] bg-white/75 px-4 py-2 text-sm text-[var(--muted-strong)] transition-colors hover:text-[var(--foreground)]"
          >
            ← 返回写作列表
          </Link>

          <div className="mt-8 max-w-3xl space-y-5">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              {post.heroLabel}
            </p>
            <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] text-[var(--foreground)] sm:text-6xl">
              {post.title}
            </h1>
            <p className="text-lg leading-8 text-[var(--muted-strong)]">
              {post.heroSummary}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted-strong)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-[var(--line)] bg-white/55 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              Overview
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  Category
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]">{post.category}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  Published
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]">{post.date}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  Reading Time
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]">{post.readTime}</p>
              </div>
            </div>
          </aside>

          <div className="article-copy rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-xl sm:p-10">
            {post.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.quote ? <blockquote>{section.quote}</blockquote> : null}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
