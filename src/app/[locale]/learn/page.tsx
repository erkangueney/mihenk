import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/ad-slot";
import { TrackExplorer, type ExplorerTrack } from "@/components/track-explorer";
import { lessonKeyOf, trackStats } from "@/lib/content";
import { getTracks } from "@/lib/content-docs/resolve";
import { isLocale, t, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";
  return {
    title: tr ? "Öğrenme patikaları" : "Learning tracks",
    description: tr
      ? "SQL, Python, Power BI, Tableau, Microsoft Fabric, Excel, istatistik ve makine öğrenmesi patikaları — her biri başlangıçtan ileri seviyeye."
      : "SQL, Python, Power BI, Tableau, Microsoft Fabric, Excel, statistics and machine learning tracks — each from beginner to advanced.",
  };
}

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const cards: ExplorerTrack[] = (await getTracks()).map((track) => {
    const stats = trackStats(track);
    return {
      slug: track.slug,
      name: track.name,
      icon: track.icon,
      color: track.color,
      category: track.category,
      tagline: t(track.tagline, locale),
      lessons: stats.lessons,
      levels: stats.levels,
      minutes: stats.minutes,
      lessonKeys: track.levels
        .flatMap((level) => level.lessons)
        .map((lesson) => lessonKeyOf(track.slug, lesson.slug)),
    };
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {ui("tracks.title", locale)}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {ui("home.tracks.subtitle", locale)}
        </p>
      </header>

      <TrackExplorer tracks={cards} locale={locale} />

      <AdSlot placement="learn-footer" className="mt-10" />
    </div>
  );
}
