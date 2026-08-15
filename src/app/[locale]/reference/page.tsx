import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ReferenceSearch,
  type ReferenceSearchItem,
} from "@/components/reference/reference-search";
import { isLocale, locales, t, ui } from "@/lib/i18n";
import {
  flatReference,
  referenceEntryCount,
  referenceGroups,
  searchHaystack,
  totalReferenceEntries,
} from "@/lib/reference";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";
  return {
    title: tr ? "Referans sözlüğü — SQL, Python, Excel, DAX" : "Reference — SQL, Python, Excel, DAX",
    description: tr
      ? "SQL komutları, pandas fonksiyonları, Excel formülleri, DAX ölçüleri ve Tableau hesaplamaları için tek sayfalık başvuru kaynağı. Her girdide çalıştırılabilir örnek."
      : "A single reference hub for SQL commands, pandas functions, Excel formulas, DAX measures and Tableau calculations. Every entry has a runnable example.",
    alternates: { canonical: `/${locale}/reference` },
  };
}

export default async function ReferenceIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const items: ReferenceSearchItem[] = flatReference(locale).map((item) => ({
    key: item.key,
    name: item.entry.name,
    summary: t(item.entry.summary, locale),
    groupSlug: item.groupSlug,
    groupName: item.groupName,
    groupIcon: item.groupIcon,
    sectionTitle: item.sectionTitle,
    haystack: searchHaystack(item, locale),
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">{ui("nav.toolbox", locale)}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {ui("reference.title", locale)}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {ui("reference.subtitle", locale)}
        </p>
        <p className="mt-3 text-sm font-semibold text-accent">
          {totalReferenceEntries()} {ui("reference.entries", locale)} ·{" "}
          {referenceGroups.length} {locale === "tr" ? "başlık" : "topics"}
        </p>
      </header>

      <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {referenceGroups.map((group) => (
          <Link
            key={group.slug}
            href={`/${locale}/reference/${group.slug}`}
            className="card group flex flex-col p-5 transition hover:border-accent"
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-10 w-10 place-items-center rounded-xl text-xl"
                style={{ backgroundColor: `color-mix(in oklab, ${group.color} 22%, transparent)` }}
              >
                {group.icon}
              </span>
              <span className="font-display text-lg font-semibold">{group.name}</span>
              <span className="ml-auto text-xs font-semibold text-muted">
                {referenceEntryCount(group)}
              </span>
            </span>
            <span className="mt-3 text-sm leading-6 text-muted">{t(group.tagline, locale)}</span>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl font-semibold">{ui("common.search", locale)}</h2>
        <ReferenceSearch
          items={items}
          locale={locale}
          groups={referenceGroups.map((group) => ({
            slug: group.slug,
            name: group.name,
            icon: group.icon,
          }))}
        />
      </section>
    </div>
  );
}
