import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/lesson/lesson-view";
import { flatLessons, getLesson, getTrack, tracks } from "@/lib/content";
import { isLocale, locales, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    tracks.flatMap((track) =>
      track.levels.flatMap((level) =>
        level.lessons.map((lesson) => ({
          locale,
          track: track.slug,
          lesson: lesson.slug,
        })),
      ),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; track: string; lesson: string }>;
}): Promise<Metadata> {
  const { locale, track, lesson } = await params;
  const found = getLesson(track, lesson);
  if (!found || !isLocale(locale)) return {};
  return {
    title: `${t(found.lesson.title, locale)} · ${found.track.name}`,
    description: t(found.lesson.summary, locale),
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; track: string; lesson: string }>;
}) {
  const { locale: raw, track: trackSlug, lesson: lessonSlug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const found = getLesson(trackSlug, lessonSlug);
  const track = getTrack(trackSlug);
  if (!found || !track) notFound();

  // Önceki/sonraki ders, patikanın düz ders listesindeki komşulardır.
  const list = flatLessons(track, locale);
  const index = list.findIndex((item) => item.slug === lessonSlug);
  const previous = index > 0 ? list[index - 1] : null;
  const next = index >= 0 && index < list.length - 1 ? list[index + 1] : null;

  return (
    <LessonView
      track={{ slug: track.slug, name: track.name }}
      lesson={found.lesson}
      locale={locale}
      prev={previous ? { slug: previous.slug, title: previous.title } : null}
      next={next ? { slug: next.slug, title: next.title } : null}
    />
  );
}
