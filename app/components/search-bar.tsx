"use client";

import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  searchFields?: string[];
}

export default function SearchBar({
  placeholder = "搜索...",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)]/50 px-4 py-3 text-sm text-[var(--app-fg)] placeholder-[var(--app-muted)] transition-colors focus:border-[var(--app-border-strong)] focus:outline-none focus:ring-1 focus:ring-[var(--app-border-strong)]"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--app-muted)] transition-colors hover:text-[var(--app-fg)]"
        >
          ✕
        </button>
      )}
    </div>
  );
}
