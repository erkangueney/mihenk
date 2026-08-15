import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/cheatsheet/print-button";
import { Markdown } from "@/components/ui/markdown";
import { cheatsheets, getCheatsheet } from "@/content/cheatsheets";
import { isLocale, locales, t, ui } from "@/lib/i18n";
import { getReferenceGroup } from "@/lib/reference";
import type { CheatSection, Locale } from "@/lib/types";

export function generateStaticParams() {
  return locales.flatMap((locale) => cheatsheets.map((sheet) => ({ locale, slug: sheet.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const sheet = getCheatsheet(slug);
  if (!sheet || !isLocale(locale)) return {};
  return {
    title: t(sheet.title, locale),
    description: t(sheet.summary, locale),
    alternates: { canonical: `/${locale}/cheatsheets/${slug}` },
  };
}

export default async function CheatsheetPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const sheet = getCheatsheet(slug);
  if (!sheet) notFound();

  const referenceGroup = getReferenceGroup(sheet.tool);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="no-print mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href={`/${locale}/cheatsheets`} className="hover:text-text">
          {ui("cheatsheet.title", locale)}
        </Link>
      </nav>

      <header className="mb-8 flex flex-wrap items-start gap-4">
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl"
          style={{ backgroundColor: `color-mix(in oklab, ${sheet.color} 22%, transparent)` }}
        >
          {sheet.icon}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {t(sheet.title, locale)}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">{t(sheet.summary, locale)}</p>
          <p className="mt-2 text-xs text-muted">
            {ui("common.updated", locale)}: {sheet.updated}
          </p>
        </div>
        <div className="flex gap-2">
          <PrintButton locale={locale} />
          {referenceGroup ? (
            <Link
              href={`/${locale}/reference/${referenceGroup.slug}`}
              className="no-print rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm font-medium transition hover:border-accent"
            >
              {ui("reference.title", locale)} →
            </Link>
          ) : null}
        </div>
      </header>

      <div className="space-y-8">
        {sheet.sections.map((section, index) => (
          <SheetTable key={index} section={section} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function SheetTable({ section, locale }: { section: CheatSection; locale: Locale }) {
  const headers = section.columns
    ? section.columns.map((column) => t(column, locale))
    : [ui("cheatsheet.colSyntax", locale), ui("cheatsheet.colWhat", locale)];

  // Not sütunu, ya başlıklarda tanımlıysa ya da satırlardan biri doldurmuşsa çizilir.
  const hasNote = headers.length > 2 || section.rows.some((row) => row.note);
  const columnCount = hasNote ? 3 : 2;
  const finalHeaders =
    headers.length >= columnCount
      ? headers.slice(0, columnCount)
      : [...headers, ui("cheatsheet.colNote", locale)];

  return (
    <section className="card overflow-hidden break-inside-avoid">
      <h2 className="border-b border-border bg-surface-2/60 px-4 py-3 font-display text-base font-semibold sm:px-5">
        {t(section.title, locale)}
      </h2>
      <div className="thin-scroll overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs tracking-wide text-muted uppercase">
              {finalHeaders.map((header) => (
                <th key={header} className="px-4 py-2.5 font-semibold sm:px-5">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, index) => (
              <tr key={index} className="border-b border-border/50 last:border-0 align-top">
                <td className="px-4 py-2.5 sm:px-5">
                  <code className="font-mono text-[13px] font-semibold whitespace-pre-wrap text-accent-2">
                    {row.code}
                  </code>
                </td>
                <td className="px-4 py-2.5 text-muted sm:px-5">
                  <Markdown text={t(row.desc, locale)} className="space-y-1 text-sm" />
                </td>
                {hasNote ? (
                  <td className="px-4 py-2.5 text-xs text-muted sm:px-5">
                    {row.note ? t(row.note, locale) : ""}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
