import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HowToSearch, type HowToSearchItem } from "@/components/how-to/how-to-search";
import { howToHaystack, howToTools, howTos, toolOf } from "@/lib/how-to";
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
    title: tr ? "Nasıl yapılır? — veri rehberleri" : "How to — data guides",
    description: tr
      ? "Power BI'da YoY, Python'da eksik veri, SQL'de mükerrer kayıt… Veri dünyasının nokta atışı soruları ve kısa cevapları."
      : "YoY in Power BI, missing data in Python, duplicates in SQL… Precise questions from the data world with short answers.",
    alternates: { canonical: `/${locale}/how-to` },
  };
}

export default async function HowToIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const items: HowToSearchItem[] = howTos.map((guide) => {
    const tool = toolOf(guide.tool);
    return {
      slug: guide.slug,
      title: t(guide.title, locale),
      summary: t(guide.summary, locale),
      tool: guide.tool,
      toolName: tool.name,
      toolIcon: tool.icon,
      minutes: guide.minutes,
      haystack: howToHaystack(guide, locale),
    };
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">{ui("nav.toolbox", locale)}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {ui("howTo.title", locale)}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{ui("howTo.subtitle", locale)}</p>
      </header>

      <HowToSearch items={items} tools={howToTools()} locale={locale} />
    </div>
  );
}
