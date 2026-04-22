import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--app-border)] bg-[var(--app-surface)]/60 px-6 py-8 text-[var(--app-muted)] transition-colors duration-300 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs tracking-widest">© {new Date().getFullYear()} Portfolio</p>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <a
            href="https://www.johnlin.top/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--app-border)] px-3 py-2 transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
          >
            友站
          </a>
          <a
            href="https://github.com/moonsilver-1"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--app-border)] px-3 py-2 transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
          >
            GitHub
          </a>
          <Link
            href="/account"
            className="rounded-full border border-[var(--app-border)] px-3 py-2 transition-colors hover:border-[var(--app-border-strong)] hover:text-[var(--app-fg)]"
          >
            登录 / 注册
          </Link>
        </div>
      </div>
    </footer>
  );
}
