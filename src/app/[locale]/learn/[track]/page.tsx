import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackLevels, type LevelData } from "@/components/track-levels";
import { lessonKeyOf, lessonStats, trackStats } from "@/lib/content";
import { getProjectBySlug, getTrackBySlug, getTracks } from "@/lib/content-docs/resolve";
import { isLocale, locales, t, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export async function generateStaticParams() {
  const tracks = await getTracks();
  return locales.flatMap((locale) => tracks.map((track) => ({ locale, track: track.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; track: string }>;
}): Promise<Metadata> {
  const { locale, track: slug } = await params;
  const track = await getTrackBySlug(slug);
  if (!track || !isLocale(locale)) return {};
  return {
    title: track.name,
    description: t(track.description, locale),
  };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ locale: string; track: string }>;
}) {
  const { locale: raw, track: slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const track = await getTrackBySlug(slug);
  if (!track) notFound();

  const stats = trackStats(track);

  const levels: LevelData[] = await Promise.all(
    track.levels.map(async (level) => {
      const project = level.projectSlug ? await getProjectBySlug(level.projectSlug) : undefined;
      return {
        id: level.id,
        title: t(level.title, locale),
        description: t(level.description, locale),
        lessons: level.lessons.map((lesson) => {
          const ls = lessonStats(track, lesson.slug);
          return {
            slug: lesson.slug,
            title: t(lesson.title, locale),
            summary: t(lesson.summary, locale),
            minutes: lesson.minutes,
            tasks: ls.tasks,
            xp: ls.xp,
            key: lessonKeyOf(track.slug, lesson.slug),
          };
        }),
        project: project
          ? {
              slug: project.slug,
              title: t(project.title, locale),
              hours: project.hours,
              xp: project.xp,
            }
          : undefined,
      };
    }),
  );

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 text-sm text-muted">
        <Link href={`/${locale}/learn`} className="hover:text-text">
          ← {ui("tracks.title", locale)}
        </Link>
      </nav>

      <header className="mb-10">
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl"
            style={{ backgroundColor: `color-mix(in oklab, ${track.color} 18%, transparent)` }}
          >
            {track.icon}
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{track.name}</h1>
            <p className="mt-1 text-base font-medium" style={{ color: track.color }}>
              {t(track.tagline, locale)}
            </p>
          </div>
        </div>

        <p className="mt-5 text-base leading-relaxed text-muted">
          {t(track.description, locale)}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          {[
            `${stats.levels} ${ui("tracks.levelCount", locale)}`,
            `${stats.lessons} ${ui("tracks.lessonCount", locale)}`,
            `~${Math.round(stats.minutes / 60)} ${locale === "tr" ? "saat" : "hours"}`,
            `${stats.xp.toLocaleString(locale)} XP`,
          ].map((chip) => (
            <span key={chip} className="rounded-full bg-surface-2 px-3 py-1.5 font-medium text-muted">
              {chip}
            </span>
          ))}
        </div>
      </header>

      <TrackLevels levels={levels} trackSlug={track.slug} color={track.color} locale={locale} />
    </div>
  );
}
