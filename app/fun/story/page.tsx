import type { Metadata } from "next";
import Link from "next/link";
import { getFirstStory } from "@/app/lib/story-content";

export const metadata: Metadata = {
  title: "dxy.word / Story",
  description: "The first hidden story on moonsilver.work.",
};

function isChapter(paragraph: string) {
  return paragraph.startsWith("\u7b2c") && paragraph.includes("\u7ae0");
}

function isInsetTitle(paragraph: string) {
  return paragraph.startsWith("\u3010") && paragraph.endsWith("\u3011");
}

function chapterIndex(paragraph: string) {
  const match = paragraph.match(/^\S+/);
  return match?.[0] ?? "Chapter";
}

export default async function StoryPage() {
  const story = await getFirstStory();
  const chapterCount = story.paragraphs.filter(isChapter).length;

  return (
    <main className="min-h-screen bg-[#f7f1e7] text-[#241b16]">
      <section className="relative overflow-hidden border-b border-[#d9c9b7] bg-[#efe1cf]">
        <div className="absolute inset-x-0 top-0 h-px bg-[#7f5d42]/30" />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-28 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <Link
              href="/fun"
              className="inline-flex border-b border-[#7f5d42]/50 pb-1 text-sm text-[#6e533e] transition-colors hover:border-[#241b16] hover:text-[#241b16]"
            >
              Back to fun
            </Link>
            <p className="mt-14 text-xs uppercase tracking-[0.32em] text-[#7f5d42]">Hidden story</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">{story.title}</h1>
          </div>

          <div className="max-w-xl border-l border-[#bda892] pl-6 text-sm leading-7 text-[#6e533e]">
            <p>
              A private text recovered from {story.sourceName}, arranged as a quiet reading room. Images in the Word
              file are intentionally left outside this page.
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[#8d6d55]">
              {chapterCount} chapters / {story.paragraphs.length} fragments
            </p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 border-l border-[#cdbba8] pl-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[#8d6d55]">moonsilver.work</p>
              <p className="mt-4 text-sm leading-7 text-[#6e533e]">Search "story" to find the door. Read slowly.</p>
            </div>
          </aside>

          <div className="space-y-8">
            {story.paragraphs.map((paragraph, index) => {
              if (isChapter(paragraph)) {
                return (
                  <section key={`${paragraph}-${index}`} className="pt-12 first:pt-0">
                    <div className="mb-8 border-t border-[#cdbba8] pt-8">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#8d6d55]">{chapterIndex(paragraph)}</p>
                      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#241b16] md:text-5xl">
                        {paragraph}
                      </h2>
                    </div>
                  </section>
                );
              }

              if (isInsetTitle(paragraph)) {
                return (
                  <h3
                    key={`${paragraph}-${index}`}
                    className="pt-8 text-xl font-semibold leading-8 tracking-tight text-[#5b3f2d] md:text-2xl"
                  >
                    {paragraph}
                  </h3>
                );
              }

              const isShortLine = paragraph.length <= 34;

              return (
                <p
                  key={`${paragraph}-${index}`}
                  className={
                    isShortLine
                      ? "max-w-2xl text-base leading-8 text-[#5b3f2d] md:text-lg"
                      : "max-w-3xl text-base leading-9 text-[#342822] md:text-lg md:leading-10"
                  }
                >
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </article>
    </main>
  );
}
