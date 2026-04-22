"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "首页" },
  { href: "/fun", label: "娱乐" },
  { href: "/contest", label: "竞赛专区" },
];

function isActive(pathname: string, href: string) {
  return pathname === href;
}

export function SiteNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-black/80 px-6 py-4 backdrop-blur-md md:px-12">
      <Link href="/" className="select-none text-sm font-semibold uppercase tracking-widest text-white">
        Portfolio
      </Link>

      <ul className="flex gap-5 md:gap-8">
        {links.map((link) => {
          const active = isActive(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative text-sm tracking-wide transition-colors ${
                  active ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                {link.label}
                {active ? <span className="absolute -bottom-1 left-0 right-0 h-px bg-white" /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
