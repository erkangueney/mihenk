import { projects, tracks } from "@/content";
import type {
  Block,
  LevelId,
  Locale,
  Project,
  ProgressState,
  Track,
  TrackCategory,
} from "./types";
import { t } from "./i18n";

export { projects, tracks };

/** Dersi tamamlama bonusu — görev XP'lerine ek olarak verilir. */
export const LESSON_BONUS_XP = 25;

/** Bir seviyenin kilidini açmak için önceki seviyede gereken tamamlanma oranı. */
export const UNLOCK_RATIO = 0.7;

export const levelOrder: LevelId[] = ["beginner", "intermediate", "advanced"];

export const categoryOrder: TrackCategory[] = [
  "language",
  "bi",
  "platform",
  "foundation",
  "advanced",
];

export function taskKeyOf(trackSlug: string, lessonSlug: string, blockId: string): string {
  return `${trackSlug}/${lessonSlug}#${blockId}`;
}

export function lessonKeyOf(trackSlug: string, lessonSlug: string): string {
  return `${trackSlug}/${lessonSlug}`;
}

export function getTrack(slug: string): Track | undefined {
  return tracks.find((track) => track.slug === slug);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export interface FlatLesson {
  trackSlug: string;
  levelId: LevelId;
  slug: string;
  title: string;
  minutes: number;
  index: number;
}

/** Patikadaki tüm dersleri seviye sırasına göre düz listeye açar. */
export function flatLessons(track: Track, locale: Locale): FlatLesson[] {
  const list: FlatLesson[] = [];
  for (const level of track.levels) {
    for (const lesson of level.lessons) {
      list.push({
        trackSlug: track.slug,
        levelId: level.id,
        slug: lesson.slug,
        title: t(lesson.title, locale),
        minutes: lesson.minutes,
        index: list.length,
      });
    }
  }
  return list;
}

export function getLesson(trackSlug: string, lessonSlug: string) {
  const track = getTrack(trackSlug);
  if (!track) return null;
  for (const level of track.levels) {
    const lesson = level.lessons.find((item) => item.slug === lessonSlug);
    if (lesson) return { track, level, lesson };
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* XP ve istatistikler                                                 */
/* ------------------------------------------------------------------ */

function isTask(block: Block): block is Extract<Block, { id: string; xp: number }> {
  return block.type === "quiz" || block.type === "order" || block.type === "exercise";
}

/** Bir dersteki görev sayısı ve toplam XP. */
export function lessonStats(track: Track, lessonSlug: string) {
  const found = getLesson(track.slug, lessonSlug);
  if (!found) return { tasks: 0, xp: 0 };
  const taskBlocks = found.lesson.blocks.filter(isTask);
  return {
    tasks: taskBlocks.length,
    xp: taskBlocks.reduce((sum, block) => sum + block.xp, LESSON_BONUS_XP),
  };
}

export function trackStats(track: Track) {
  let lessons = 0;
  let minutes = 0;
  let xp = 0;
  for (const level of track.levels) {
    for (const lesson of level.lessons) {
      lessons += 1;
      minutes += lesson.minutes;
      xp += lesson.blocks.filter(isTask).reduce((sum, block) => sum + block.xp, LESSON_BONUS_XP);
    }
  }
  return { lessons, minutes, xp, levels: track.levels.length };
}

export function platformStats() {
  let lessons = 0;
  let xp = 0;
  for (const track of tracks) {
    const stats = trackStats(track);
    lessons += stats.lessons;
    xp += stats.xp;
  }
  for (const project of projects) xp += project.xp;
  return { lessons, xp, tracks: tracks.length, projects: projects.length };
}

/* ------------------------------------------------------------------ */
/* Kullanıcı ilerlemesi                                                */
/* ------------------------------------------------------------------ */

export function levelProgress(track: Track, levelId: LevelId, progress: ProgressState) {
  const level = track.levels.find((item) => item.id === levelId);
  if (!level || level.lessons.length === 0) return { done: 0, total: 0, ratio: 0 };
  const done = level.lessons.filter((lesson) =>
    progress.lessons.includes(lessonKeyOf(track.slug, lesson.slug)),
  ).length;
  return { done, total: level.lessons.length, ratio: done / level.lessons.length };
}

export function trackProgress(track: Track, progress: ProgressState) {
  const total = track.levels.reduce((sum, level) => sum + level.lessons.length, 0);
  if (total === 0) return { done: 0, total: 0, ratio: 0 };
  const done = track.levels
    .flatMap((level) => level.lessons)
    .filter((lesson) => progress.lessons.includes(lessonKeyOf(track.slug, lesson.slug))).length;
  return { done, total, ratio: done / total };
}

/**
 * Seviye kilidi. İlk seviye herkese açık; sonrakiler önceki seviyenin
 * %70'i bitince açılır — böylece ilerleme hissi var ama duvar yok.
 */
export function isLevelUnlocked(track: Track, levelIndex: number, progress: ProgressState) {
  if (levelIndex === 0) return true;
  const previous = track.levels[levelIndex - 1];
  if (!previous) return true;
  return levelProgress(track, previous.id, progress).ratio >= UNLOCK_RATIO;
}

/** Kullanıcının kaldığı yer: tamamlanmamış ilk ders. */
export function nextLesson(track: Track, progress: ProgressState, locale: Locale) {
  const list = flatLessons(track, locale);
  return (
    list.find((lesson) => !progress.lessons.includes(lessonKeyOf(track.slug, lesson.slug))) ?? null
  );
}

/** Tüm patikalar arasında en son dokunulan patikayı bulur (ana sayfadaki "devam et"). */
export function resumePoint(progress: ProgressState, locale: Locale) {
  const started = tracks.filter((track) => trackProgress(track, progress).done > 0);
  const pool = started.length > 0 ? started : [];
  for (const track of pool) {
    const lesson = nextLesson(track, progress, locale);
    if (lesson) return { track, lesson };
  }
  return null;
}

export function projectsForTrack(trackSlug: string): Project[] {
  return projects.filter((project) => project.trackSlug === trackSlug);
}
