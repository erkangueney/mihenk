import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaygroundBlock } from "@/components/lesson/playground-block";
import { CodeView } from "@/components/ui/code-view";
import { Markdown } from "@/components/ui/markdown";
import { isLocale, locales, t, ui } from "@/lib/i18n";
import { getReferenceEntry, referenceGroups } from "@/lib/reference";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    referenceGroups.flatMap((group) =>
      group.sections.flatMap((section) =>
        section.entries.map((entry) => ({
          locale,
          group: group.slug,
          entry: entry.slug,
        })),
      ),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; group: string; entry: string }>;
}): Promise<Metadata> {
  const { locale, group, entry: entrySlug } = await params;
  const found = getReferenceEntry(group, entrySlug);
  if (!found || !isLocale(locale)) return {};
  const tr = locale === "tr";
  return {
    title: `${found.entry.name} — ${found.group.name}`,
    description: `${t(found.entry.summary, locale)} ${
      tr ? "Sözdizimi, parametreler ve çalıştırılabilir örnek." : "Syntax, parameters and a runnable example."
    }`,
    alternates: { canonical: `/${locale}/reference/${group}/${entrySlug}` },
  };
}

export default async function ReferenceEntryPage({
  params,
}: {
  params: Promise<{ locale: string; group: string; entry: string }>;
}) {
  const { locale: raw, group: groupSlug, entry: entrySlug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const found = getReferenceEntry(groupSlug, entrySlug);
  if (!found) notFound();
  const { group, section, entry } = found;

  // Aynı bölümdeki komşular — okuma akışını sürdürmek için.
  const siblings = section.entries;
  const index = siblings.findIndex((item) => item.slug === entry.slug);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index < siblings.length - 1 ? siblings[index + 1] : null;

  const related = (entry.related ?? [])
    .map((key) => {
      const [g, e] = key.split("/");
      const target = getReferenceEntry(g, e);
      return target ? { key, name: target.entry.name, group: target.group } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href={`/${locale}/reference`} className="hover:text-text">
          {ui("reference.title", locale)}
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/${locale}/reference/${group.slug}`} className="hover:text-text">
          {group.name}
        </Link>
      </nav>

      <header className="mb-8">
        <p className="eyebrow">{t(section.title, locale)}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight break-words sm:text-4xl">
          {entry.name}
        </h1>
        <Markdown text={t(entry.summary, locale)} className="mt-3 text-base" />
      </header>

      <section className="mb-8">
        <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">
          {ui("reference.syntax", locale)}
        </h2>
        <CodeView code={entry.syntax} lang={group.lang} />
      </section>

      {entry.description ? (
        <section className="mb-8">
          <Markdown text={t(entry.description, locale)} />
        </section>
      ) : null}

      {entry.params && entry.params.length > 0 ? (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">
            {ui("reference.params", locale)}
          </h2>
          <dl className="overflow-hidden rounded-xl border border-border">
            {entry.params.map((param) => (
              <div
                key={param.name}
                className="grid gap-1 border-b border-border/70 px-4 py-3 last:border-b-0 sm:grid-cols-[160px_1fr] sm:gap-4"
              >
                <dt className="font-mono text-sm font-semibold text-accent-2">{param.name}</dt>
                <dd className="text-sm leading-6 text-muted">
                  <Markdown text={t(param.text, locale)} className="space-y-2" />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {entry.returns ? (
        <section className="mb-8">
          <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">
            {ui("reference.returns", locale)}
          </h2>
          <Markdown text={t(entry.returns, locale)} />
        </section>
      ) : null}

      {entry.example ? (
        <section className="mb-8">
          <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">
            {ui("reference.example", locale)}
          </h2>
          <CodeView code={entry.example.code} lang={group.lang} />
          {entry.example.note ? (
            <p className="mt-2 text-sm text-muted">{t(entry.example.note, locale)}</p>
          ) : null}
        </section>
      ) : null}

      {entry.playground ? (
        <section className="mb-8">
          <PlaygroundBlock block={entry.playground} locale={locale} />
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">
            {ui("reference.related", locale)}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {related.map((item) => (
              <li key={item.key}>
                <Link
                  href={`/${locale}/reference/${item.key}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs transition hover:border-accent"
                >
                  <span aria-hidden>{item.group.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="border-t border-border pt-6">
        {group.trackSlug ? (
          <Link
            href={`/${locale}/learn/${group.trackSlug}`}
            className="card mb-6 flex items-center gap-3 p-4 transition hover:border-accent"
          >
            <span aria-hidden className="text-2xl">
              {group.icon}
            </span>
            <span>
              <span className="block text-sm font-semibold">{ui("reference.openTrack", locale)}</span>
              <span className="block text-xs text-muted">{t(group.tagline, locale)}</span>
            </span>
            <span aria-hidden className="ml-auto text-muted">
              →
            </span>
          </Link>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/${locale}/reference/${group.slug}/${prev.slug}`}
              className="card p-4 transition hover:border-accent"
            >
              <span className="text-xs text-muted">← {ui("lesson.prev", locale)}</span>
              <span className="mt-1 block font-mono text-sm font-semibold">{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/${locale}/reference/${group.slug}/${next.slug}`}
              className="card p-4 text-right transition hover:border-accent sm:col-start-2"
            >
              <span className="text-xs text-muted">{ui("lesson.next", locale)} →</span>
              <span className="mt-1 block font-mono text-sm font-semibold">{next.name}</span>
            </Link>
          ) : (
            <Link
              href={`/${locale}/reference/${group.slug}`}
              className="card p-4 text-right transition hover:border-accent sm:col-start-2"
            >
              <span className="text-xs text-muted">{ui("common.back", locale)} →</span>
              <span className="mt-1 block text-sm font-semibold">{group.name}</span>
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}
