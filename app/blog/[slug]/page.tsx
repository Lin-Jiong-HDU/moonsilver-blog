import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatBlogDate, getAllBlogPosts, getBlogPostBySlug } from "@/app/lib/blog-content";

type PageParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "博客文章",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageParams) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24 text-[var(--app-fg)] transition-colors duration-300">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex rounded-full border border-[var(--app-border)] px-4 py-2 text-sm text-[var(--app-muted)] transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
        >
          返回博客
        </Link>

        <article className="mt-8 rounded-[32px] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--app-muted)]">
            {formatBlogDate(post.publishedAt)}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--app-muted)] md:text-base">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--app-border)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--app-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 space-y-6 text-[var(--app-fg)]/90 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_p]:leading-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 [&_code]:rounded [&_code]:bg-white/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm">
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </article>
      </section>
    </div>
  );
}
