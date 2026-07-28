import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { projects as fileProjects, tracks as fileTracks } from "@/content";
import { platformStatsOf } from "@/lib/content";
import { getSupabasePublic } from "@/lib/supabase/public";
import type { Project, Track } from "@/lib/types";
import { parseProjectDoc, parseTrackDoc } from "./validate";

/**
 * İçerik çözümleyici.
 *
 * Dosyalar (src/content) taban sürümdür — sürüm kontrolünde durur, kod
 * incelemesinden geçer. Veritabanındaki YAYINLANMIŞ dokümanlar bunun
 * üzerine biner:
 *   - Aynı slug varsa dosyadaki sürümün yerine geçer.
 *   - Yeni slug ise listeye eklenir.
 *
 * Bozuk bir doküman sessizce yok sayılır ve dosyadaki sürüm ayakta kalır;
 * hatalı bir kayıt yüzünden site çökmez.
 *
 * `cache()` tek render turunda tekrar tekrar sorgu atılmasını önler.
 */
/** İçerik önbelleğinin etiketi — yayın/silme sonrası bununla geçersiz kılınır. */
export const CONTENT_TAG = "content-docs";

/**
 * Yayınlanmış dokümanları çeker.
 *
 * `unstable_cache` şart, `cache()` yetmez: React'in `cache`'i yalnızca TEK
 * render turunda tekilleştirir. Derlemede 397 sayfa üretiliyor ve her biri
 * ayrı bir tur — yani sorgu 397 kez atılırdı (ölçüldü: derleme 1 sn yerine
 * 99 sn sürüyor). Bu sarmalayıcı sonucu turlar arasında saklar; admin bir
 * içerik yayınladığında `revalidateTag(CONTENT_TAG)` ile düşürülür.
 */
const fetchPublished = unstable_cache(
  async (kind: "track" | "project"): Promise<unknown[]> => {
    const supabase = getSupabasePublic();
    if (!supabase) return [];

    try {
      const { data, error } = await supabase
        .from("content_docs")
        .select("data")
        .eq("kind", kind)
        .eq("published", true);

      if (error || !data) return [];
      return data.map((row) => row.data);
    } catch {
      // Veritabanı ulaşılamazsa site dosyadaki içerikle çalışmaya devam etsin.
      return [];
    }
  },
  [CONTENT_TAG],
  { tags: [CONTENT_TAG] },
);

/** Slug eşleşenleri değiştirir, yenileri sona ekler. */
function overlay<T extends { slug: string }>(base: T[], extra: T[]): T[] {
  if (extra.length === 0) return base;

  const bySlug = new Map(extra.map((item) => [item.slug, item]));
  const merged = base.map((item) => bySlug.get(item.slug) ?? item);
  const known = new Set(base.map((item) => item.slug));

  for (const item of extra) {
    if (!known.has(item.slug)) merged.push(item);
  }
  return merged;
}

export const getTracks = cache(async (): Promise<Track[]> => {
  const docs = await fetchPublished("track");
  const parsed = docs.map(parseTrackDoc).filter((item): item is Track => item !== null);
  return overlay(fileTracks, parsed);
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const docs = await fetchPublished("project");
  const parsed = docs.map(parseProjectDoc).filter((item): item is Project => item !== null);
  return overlay(fileProjects, parsed);
});

export async function getTrackBySlug(slug: string): Promise<Track | undefined> {
  return (await getTracks()).find((track) => track.slug === slug);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((project) => project.slug === slug);
}

/** Ana sayfadaki sayaçlar — yayındaki gerçek içeriği yansıtır. */
export async function getPlatformStats() {
  const [trackList, projectList] = await Promise.all([getTracks(), getProjects()]);
  return platformStatsOf(trackList, projectList);
}

/** Bir patikanın uçtan uca projeleri. */
export async function getProjectsForTrack(trackSlug: string): Promise<Project[]> {
  return (await getProjects()).filter((project) => project.trackSlug === trackSlug);
}

/** Ders sayfası için: patika + seviye + ders üçlüsü. */
export async function getLessonResolved(trackSlug: string, lessonSlug: string) {
  const track = await getTrackBySlug(trackSlug);
  if (!track) return null;

  for (const level of track.levels) {
    const lesson = level.lessons.find((item) => item.slug === lessonSlug);
    if (lesson) return { track, level, lesson };
  }
  return null;
}
