import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cheatsheetRowCount, cheatsheets } from "@/content/cheatsheets";
import { isLocale, locales, t, ui } from "@/lib/i18n";
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
    title: tr ? "Kopya kâğıtları — SQL, pandas, Excel, Git" : "Cheatsheets — SQL, pandas, Excel, Git",
    description: tr
      ? "Tek sayfalık hızlı referanslar: SQL komutları, pandas fonksiyonları, Excel formülleri, makine öğrenmesi algoritma seçimi ve Git. Yazdırılabilir."
      : "One-page quick references: SQL commands, pandas functions, Excel formulas, ML algorithm selection and Git. Printable.",
    alternates: { canonical: `/${locale}/cheatsheets` },
  };
}

export default async function CheatsheetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">{ui("nav.toolbox", locale)}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {ui("cheatsheet.title", locale)}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {ui("cheatsheet.subtitle", locale)}
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {cheatsheets.map((sheet) => (
          <li key={sheet.slug}>
            <Link
              href={`/${locale}/cheatsheets/${sheet.slug}`}
              className="card flex h-full flex-col p-5 transition hover:border-accent"
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center rounded-xl text-xl"
                  style={{ backgroundColor: `color-mix(in oklab, ${sheet.color} 22%, transparent)` }}
                >
                  {sheet.icon}
                </span>
                <span className="font-display text-base leading-6 font-semibold text-balance">
                  {t(sheet.title, locale)}
                </span>
              </span>
              <span className="mt-3 text-sm leading-6 text-muted">{t(sheet.summary, locale)}</span>
              <span className="mt-4 flex items-center gap-2 text-xs text-muted">
                <span className="rounded-full bg-surface-2 px-2.5 py-1 font-semibold">
                  {cheatsheetRowCount(sheet)} {ui("cheatsheet.rows", locale)}
                </span>
                <span className="ml-auto font-semibold text-accent">
                  {ui("cheatsheet.open", locale)} →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
