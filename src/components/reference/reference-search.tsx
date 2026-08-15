"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

/**
 * Aramanın istemciye taşıdığı hafif kayıt.
 *
 * Girdilerin tamamı (açıklama, örnek, playground) gönderilmez — yalnızca
 * eşleştirme ve listeleme için gerekenler. Böylece 90+ girdilik sözlük
 * sayfayı şişirmiyor.
 */
export interface ReferenceSearchItem {
  key: string;
  name: string;
  summary: string;
  groupSlug: string;
  groupName: string;
  groupIcon: string;
  sectionTitle: string;
  /** Önceden küçük harfe indirilmiş arama gövdesi. */
  haystack: string;
}

const MAX_RESULTS = 40;

export function ReferenceSearch({
  items,
  locale,
  groups,
  placeholder,
}: {
  items: ReferenceSearchItem[];
  locale: Locale;
  /** Filtre çipleri; verilmezse yalnızca arama kutusu gösterilir. */
  groups?: { slug: string; name: string; icon: string }[];
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
    const pool = activeGroup ? items.filter((item) => item.groupSlug === activeGroup) : items;
    if (needle.length === 0) return { list: pool.slice(0, MAX_RESULTS), total: pool.length };

    // Adı eşleşen girdiler önce gelsin: "join" araması INNER JOIN'i tepede göstersin.
    const scored = pool
      .map((item) => {
        const name = item.name.toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
        if (name.startsWith(needle)) return { item, score: 0 };
        if (name.includes(needle)) return { item, score: 1 };
        if (item.haystack.includes(needle)) return { item, score: 2 };
        return null;
      })
      .filter((hit): hit is { item: ReferenceSearchItem; score: number } => hit !== null)
      .sort((a, b) => a.score - b.score);

    return { list: scored.slice(0, MAX_RESULTS).map((hit) => hit.item), total: scored.length };
  }, [items, query, activeGroup, locale]);

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
          placeholder={placeholder ?? ui("reference.searchPlaceholder", locale)}
          aria-label={ui("common.search", locale)}
          className="w-full rounded-xl border border-border bg-surface py-3.5 pr-4 pl-11 text-base outline-none focus:border-accent"
        />
      </div>

      {groups && groups.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveGroup(null)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              activeGroup === null
                ? "border-accent bg-accent text-on-accent"
                : "border-border bg-surface-2 text-muted hover:text-text"
            }`}
          >
            {ui("common.all", locale)}
          </button>
          {groups.map((group) => (
            <button
              key={group.slug}
              type="button"
              onClick={() => setActiveGroup((current) => (current === group.slug ? null : group.slug))}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                activeGroup === group.slug
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border bg-surface-2 text-muted hover:text-text"
              }`}
            >
              <span aria-hidden>{group.icon}</span> {group.name}
            </button>
          ))}
        </div>
      ) : null}

      <p className="mt-4 text-xs text-muted">
        {results.total} {ui("reference.entries", locale)}
        {results.total > results.list.length
          ? ` · ${locale === "tr" ? `ilk ${results.list.length} tanesi` : `showing first ${results.list.length}`}`
          : ""}
      </p>

      {results.list.length === 0 ? (
        <p className="mt-6 rounded-xl border border-border bg-surface-2 p-6 text-center text-sm text-muted">
          {ui("common.noResults", locale)} — {ui("reference.noteEntries", locale)}
        </p>
      ) : (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {results.list.map((item) => (
            <li key={item.key}>
              <Link
                href={`/${locale}/reference/${item.key}`}
                className="card flex h-full flex-col gap-1 p-4 transition hover:border-accent"
              >
                <span className="flex items-center gap-2">
                  <code className="font-mono text-sm font-semibold text-accent-2">{item.name}</code>
                  <span className="ml-auto shrink-0 text-[11px] text-muted">
                    <span aria-hidden>{item.groupIcon}</span> {item.groupName}
                  </span>
                </span>
                <span className="text-sm leading-6 text-muted">{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
