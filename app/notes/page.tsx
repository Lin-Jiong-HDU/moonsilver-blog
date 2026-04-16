import type { Metadata } from "next";
import { notes } from "@/app/lib/site-data";

export const metadata: Metadata = {
  title: "Notes",
  description: "Moonsilver 的短笔记，用更轻的方式记录界面细节、写作观察和工作流想法。",
};

const panelClass =
  "rounded-[30px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] backdrop-blur-xl";

export default function NotesPage() {
  return (
    <div className="flex flex-1 flex-col gap-12 pb-24 pt-10 sm:pt-14">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            Notes
          </p>
          <h1 className="font-serif text-5xl leading-[1] tracking-[-0.055em] text-[var(--foreground)] sm:text-6xl">
            更轻一点，
            <br />
            更接近随手记下。
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          Notes 像工作台上的便签，记录那些还不一定值得写成长文、但已经足够真实和有启发的想法。它们会慢慢成为后续文章的种子。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {notes.map((note) => (
          <article key={note.title} className={`p-6 ${panelClass}`}>
            <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              <span>{note.tag}</span>
              <span>{note.date}</span>
            </div>
            <h2 className="mt-5 text-2xl font-medium leading-9 tracking-[-0.03em] text-[var(--foreground)]">
              {note.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
              {note.body}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
