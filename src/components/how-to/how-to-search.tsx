"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export interface HowToSearchItem {
  slug: string;
  title: string;
  summary: string;
  tool: string;
  toolName: string;
  toolIcon: string;
  minutes: number;
  haystack: string;
}

export function HowToSearch({
  items,
  tools,
  locale,
}: {
  items: HowToSearchItem[];
  tools: { slug: string; name: string; icon: string }[];
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const [tool, setTool] = useState<string | null>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
    const pool = tool ? items.filter((item) => item.tool === tool) : items;
    if (needle.length === 0) return pool;
    return pool.filter((item) => item.haystack.includes(needle));
  }, [items, query, tool, locale]);

  return (
    <div>
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
        >
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={ui("howTo.searchPlaceholder", locale)}
          aria-label={ui("common.search", locale)}
          className="w-full rounded-xl border border-border bg-surface py-3.5 pr-4 pl-11 text-base outline-none focus:border-accent"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTool(null)}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            tool === null
              ? "border-accent bg-accent text-on-accent"
              : "border-border bg-surface-2 text-muted hover:text-text"
          }`}
        >
          {ui("common.all", locale)}
        </button>
        {tools.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setTool((current) => (current === item.slug ? null : item.slug))}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              tool === item.slug
                ? "border-accent bg-accent text-on-accent"
                : "border-border bg-surface-2 text-muted hover:text-text"
            }`}
          >
            <span aria-hidden>{item.icon}</span> {item.name}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted">
        {results.length} {ui("howTo.count", locale)}
      </p>

      {results.length === 0 ? (
        <p className="mt-4 rounded-xl border border-border bg-surface-2 p-6 text-center text-sm text-muted">
          {ui("common.noResults", locale)}
        </p>
      ) : (
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {results.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/${locale}/how-to/${item.slug}`}
                className="card flex h-full flex-col p-5 transition hover:border-accent"
              >
                <span className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-muted uppercase">
                  <span aria-hidden>{item.toolIcon}</span>
                  {item.toolName}
                  <span className="ml-auto normal-case">
                    {item.minutes} {ui("howTo.readTime", locale)}
                  </span>
                </span>
                <span className="mt-2 font-display text-base leading-6 font-semibold text-balance">
                  {item.title}
                </span>
                <span className="mt-2 text-sm leading-6 text-muted">{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
