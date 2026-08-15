import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeCard, CodeView } from "@/components/ui/code-view";
import { Markdown } from "@/components/ui/markdown";
import { ProseBlocks } from "@/components/ui/prose-blocks";
import { getHowTo, howTos, toolOf } from "@/lib/how-to";
import { isLocale, locales, t, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return locales.flatMap((locale) => howTos.map((guide) => ({ locale, slug: guide.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getHowTo(slug);
  if (!guide || !isLocale(locale)) return {};
  return {
    title: t(guide.title, locale),
    description: t(guide.summary, locale),
    alternates: { canonical: `/${locale}/how-to/${slug}` },
    openGraph: {
      type: "article",
      title: t(guide.title, locale),
      description: t(guide.summary, locale),
      modifiedTime: guide.updated,
    },
  };
}

export default async function HowToPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const guide = getHowTo(slug);
  if (!guide) notFound();

  const tool = toolOf(guide.tool);
  const related = (guide.related ?? [])
    .map((key) => getHowTo(key))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

  /**
   * Arama motorları için yapılandırılmış veri.
   *
   * `HowTo` şeması adımları, `FAQPage` ise soruları arama sonucunda
   * gösterilebilir hâle getirir — bu sayfaların varlık sebebi tam olarak
   * arama trafiği olduğu için ikisi de ekleniyor.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: t(guide.title, locale),
        description: t(guide.summary, locale),
        totalTime: `PT${guide.minutes}M`,
        dateModified: guide.updated,
        step: guide.steps.map((item, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: t(item.title, locale),
          text: t(item.body, locale),
        })),
      },
      ...(guide.faq && guide.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: guide.faq.map((item) => ({
                "@type": "Question",
                name: t(item.q, locale),
                acceptedAnswer: { "@type": "Answer", text: t(item.a, locale) },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href={`/${locale}/how-to`} className="hover:text-text">
          {ui("howTo.title", locale)}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-text">{tool.name}</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {t(guide.title, locale)}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="rounded-full bg-surface-2 px-3 py-1 font-medium">
            <span aria-hidden>{tool.icon}</span> {tool.name}
          </span>
          <span className="rounded-full bg-surface-2 px-3 py-1 font-medium">
            ⏱ {guide.minutes} {ui("howTo.readTime", locale)}
          </span>
          <span className="rounded-full bg-surface-2 px-3 py-1 font-medium">
            {ui("common.updated", locale)}: {guide.updated}
          </span>
        </div>
      </header>

      {/* Arama sonucundan gelen kullanıcı cevabı ilk ekranda görmeli. */}
      <section className="mb-10 rounded-2xl border border-accent/35 bg-accent/8 p-5 sm:p-6">
        <p className="eyebrow mb-2">{ui("howTo.quickAnswer", locale)}</p>
        <Markdown text={t(guide.answer.body, locale)} className="text-[15px]" />
        {guide.answer.code ? (
          <div className="mt-4">
            <CodeView code={guide.answer.code} lang={guide.answer.lang ?? "sql"} />
          </div>
        ) : null}
      </section>

      <section className="mb-10">
        <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight">
          {ui("howTo.steps", locale)}
        </h2>
        <ol className="space-y-6">
          {guide.steps.map((item, index) => (
            <li key={index} className="flex gap-4">
              <span
                aria-hidden
                className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-2 to-accent text-sm font-black text-on-accent"
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold">{t(item.title, locale)}</h3>
                <Markdown text={t(item.body, locale)} className="mt-2 text-sm" />
                {item.code ? (
                  <div className="mt-3">
                    <CodeCard code={item.code} lang={item.lang ?? "sql"} />
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {guide.blocks && guide.blocks.length > 0 ? (
        <section className="mb-10">
          <ProseBlocks blocks={guide.blocks} locale={locale} />
        </section>
      ) : null}

      {guide.faq && guide.faq.length > 0 ? (
        <section className="mb-10">
          <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight">
            {ui("howTo.faq", locale)}
          </h2>
          <div className="space-y-3">
            {guide.faq.map((item, index) => (
              <details key={index} className="card overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold">
                  {t(item.q, locale)}
                </summary>
                <div className="px-5 pb-5">
                  <Markdown text={t(item.a, locale)} className="text-sm" />
                </div>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <footer className="border-t border-border pt-6">
        {guide.trackSlug ? (
          <Link
            href={`/${locale}/learn/${guide.trackSlug}`}
            className="card mb-6 flex items-center gap-3 p-4 transition hover:border-accent"
          >
            <span aria-hidden className="text-2xl">
              {tool.icon}
            </span>
            <span>
              <span className="block text-sm font-semibold">{ui("reference.openTrack", locale)}</span>
              <span className="block text-xs text-muted">{tool.name}</span>
            </span>
            <span aria-hidden className="ml-auto text-muted">
              →
            </span>
          </Link>
        ) : null}

        {related.length > 0 ? (
          <>
            <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">
              {ui("howTo.related", locale)}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${locale}/how-to/${item.slug}`}
                    className="card block p-4 text-sm font-medium transition hover:border-accent"
                  >
                    {t(item.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </footer>
    </article>
  );
}
