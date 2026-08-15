import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FreePlayground } from "@/components/playground/free-playground";
import { isLocale, locales, ui } from "@/lib/i18n";
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
    title: tr ? "Deneme alanı — tarayıcıda Python ve SQL" : "Playground — Python and SQL in your browser",
    description: tr
      ? "Kurulum yapmadan tarayıcında gerçek Python (pandas dahil) ve gerçek SQLite çalıştır. Hazır veri setleriyle dene."
      : "Run real Python (pandas included) and real SQLite in your browser with no setup, on ready-made datasets.",
    alternates: { canonical: `/${locale}/playground` },
  };
}

export default async function PlaygroundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 max-w-2xl">
        <p className="eyebrow">{ui("nav.toolbox", locale)}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {ui("playground.pageTitle", locale)}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {ui("playground.pageSubtitle", locale)}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <Link
            href={`/${locale}/reference`}
            className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-medium transition hover:border-accent"
          >
            {ui("reference.title", locale)} →
          </Link>
          <Link
            href={`/${locale}/cheatsheets`}
            className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-medium transition hover:border-accent"
          >
            {ui("cheatsheet.title", locale)} →
          </Link>
        </div>
      </header>

      <FreePlayground locale={locale} />
    </div>
  );
}
