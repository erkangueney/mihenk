import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeView } from "@/components/ui/code-view";
import { Markdown } from "@/components/ui/markdown";
import { isLocale, locales, t, ui } from "@/lib/i18n";
import { getReferenceGroup, referenceEntryCount, referenceGroups } from "@/lib/reference";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    referenceGroups.map((group) => ({ locale, group: group.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; group: string }>;
}): Promise<Metadata> {
  const { locale, group: slug } = await params;
  const group = getReferenceGroup(slug);
  if (!group || !isLocale(locale)) return {};
  return {
    title: `${group.name} — ${locale === "tr" ? "referans" : "reference"}`,
    description: t(group.description, locale),
    alternates: { canonical: `/${locale}/reference/${group.slug}` },
  };
}

export default async function ReferenceGroupPage({
  params,
}: {
  params: Promise<{ locale: string; group: string }>;
}) {
  const { locale: raw, group: slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const group = getReferenceGroup(slug);
  if (!group) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href={`/${locale}/reference`} className="hover:text-text">
          {ui("reference.title", locale)}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-text">{group.name}</span>
      </nav>

      <header className="mb-8 max-w-3xl">
        <span
          aria-hidden
          className="mb-3 inline-grid h-12 w-12 place-items-center rounded-2xl text-2xl"
          style={{ backgroundColor: `color-mix(in oklab, ${group.color} 22%, transparent)` }}
        >
          {group.icon}
        </span>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {group.name}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {t(group.description, locale)}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-surface-2 px-3 py-1 font-semibold text-muted">
            {referenceEntryCount(group)} {ui("reference.entries", locale)}
          </span>
          {group.trackSlug ? (
            <Link
              href={`/${locale}/learn/${group.trackSlug}`}
              className="rounded-full border border-accent/40 px-3 py-1 font-semibold text-accent transition hover:bg-accent/10"
            >
              {ui("reference.openTrack", locale)} →
            </Link>
          ) : null}
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
        {/* Yan gezinme — mobilde başlıkların üstünde katlanır bir liste. */}
        <aside className="mb-8 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <p className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
              {ui("reference.inGroup", locale)}
            </p>
            <nav className="space-y-4">
              {group.sections.map((section) => (
                <div key={section.id}>
                  <p className="mb-1.5 text-sm font-semibold">{t(section.title, locale)}</p>
                  <ul className="space-y-0.5 border-l border-border pl-3">
                    {section.entries.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/${locale}/reference/${group.slug}/${item.slug}`}
                          className="block py-1 font-mono text-xs text-muted transition hover:text-accent-2"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <div className="min-w-0 space-y-10">
          {group.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="mb-4 font-display text-xl font-semibold tracking-tight">
                {t(section.title, locale)}
              </h2>
              <ul className="space-y-3">
                {section.entries.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${locale}/reference/${group.slug}/${item.slug}`}
                      className="card block p-5 transition hover:border-accent"
                    >
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <code className="font-mono text-base font-semibold text-accent-2">
                          {item.name}
                        </code>
                        {item.playground ? (
                          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-accent uppercase">
                            ▶ {ui("playground.title", locale)}
                          </span>
                        ) : null}
                      </span>
                      <Markdown text={t(item.summary, locale)} className="mt-2 text-sm" />
                      <CodeView code={item.syntax} lang={group.lang} className="mt-3 text-xs" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
