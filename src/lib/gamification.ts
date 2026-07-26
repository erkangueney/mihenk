import type { Badge, ProgressState } from "./types";

/* ------------------------------------------------------------------ */
/* Seviye eğrisi                                                       */
/* ------------------------------------------------------------------ */

/**
 * Seviye n'e ulaşmak için gereken toplam XP.
 * Kareye yakın bir eğri: ilk seviyeler hızlı gelir, sonrakiler emek ister.
 *   Sv.1 = 0, Sv.2 = 120, Sv.3 = 320, Sv.4 = 600, Sv.5 = 960 ...
 */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  const n = level - 1;
  return 40 * n * n + 80 * n;
}

export interface LevelInfo {
  level: number;
  /** Bu seviyenin başladığı toplam XP */
  floor: number;
  /** Sonraki seviyenin gerektirdiği toplam XP */
  ceiling: number;
  /** Seviye içindeki ilerleme, 0–1 */
  ratio: number;
  /** Sonraki seviyeye kalan XP */
  remaining: number;
}

export function levelInfo(xp: number): LevelInfo {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level += 1;
  const floor = xpForLevel(level);
  const ceiling = xpForLevel(level + 1);
  return {
    level,
    floor,
    ceiling,
    ratio: ceiling === floor ? 1 : (xp - floor) / (ceiling - floor),
    remaining: Math.max(0, ceiling - xp),
  };
}

/** Seviyeye takılan unvan — profilde ve liderlik tablosunda gösterilir. */
export function rankTitle(level: number): { tr: string; en: string } {
  if (level >= 20) return { tr: "Veri Efsanesi", en: "Data Legend" };
  if (level >= 15) return { tr: "Veri Mimarı", en: "Data Architect" };
  if (level >= 11) return { tr: "Veri Bilimci", en: "Data Scientist" };
  if (level >= 8) return { tr: "Kıdemli Analist", en: "Senior Analyst" };
  if (level >= 5) return { tr: "Veri Analisti", en: "Data Analyst" };
  if (level >= 3) return { tr: "Çırak Analist", en: "Junior Analyst" };
  return { tr: "Yeni Başlayan", en: "Newcomer" };
}

/* ------------------------------------------------------------------ */
/* Seri (streak)                                                       */
/* ------------------------------------------------------------------ */

/** Yerel saat diliminde YYYY-AA-GG. UTC kullanılmaz; kullanıcının günü esastır. */
export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function shiftDays(key: string, days: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return todayKey(date);
}

/**
 * Kesintisiz gün sayısı.
 * Bugün henüz çalışılmadıysa dün biten seri korunur (kullanıcı günü kaybetmesin),
 * iki gün önce bitmişse seri kopmuştur.
 */
export function currentStreak(activeDays: string[], today = todayKey()): number {
  if (activeDays.length === 0) return 0;
  const set = new Set(activeDays);
  let cursor = set.has(today) ? today : shiftDays(today, -1);
  if (!set.has(cursor)) return 0;
  let streak = 0;
  while (set.has(cursor)) {
    streak += 1;
    cursor = shiftDays(cursor, -1);
  }
  return streak;
}

/** Son 7 günün aktivite durumu — profildeki mini takvim için. */
export function lastWeek(activeDays: string[], today = todayKey()) {
  const set = new Set(activeDays);
  return Array.from({ length: 7 }, (_, i) => {
    const key = shiftDays(today, i - 6);
    return { key, active: set.has(key) };
  });
}

/* ------------------------------------------------------------------ */
/* Rozetler                                                            */
/* ------------------------------------------------------------------ */

const tracksTouched = (p: ProgressState) =>
  new Set(p.lessons.map((l) => l.split("/")[0])).size;

export const badges: Badge[] = [
  {
    id: "first-step",
    icon: "🌱",
    title: { tr: "İlk Adım", en: "First Step" },
    description: { tr: "İlk dersini tamamla.", en: "Complete your first lesson." },
    earned: (p) => p.lessons.length >= 1,
  },
  {
    id: "query-master",
    icon: "🔍",
    title: { tr: "Sorgu Ustası", en: "Query Master" },
    description: {
      tr: "SQL patikasında 5 ders tamamla.",
      en: "Complete 5 lessons in the SQL track.",
    },
    earned: (p) => p.lessons.filter((l) => l.startsWith("sql/")).length >= 5,
  },
  {
    id: "pythonista",
    icon: "🐍",
    title: { tr: "Pythonista", en: "Pythonista" },
    description: {
      tr: "Python patikasında 5 ders tamamla.",
      en: "Complete 5 lessons in the Python track.",
    },
    earned: (p) => p.lessons.filter((l) => l.startsWith("python/")).length >= 5,
  },
  {
    id: "visualizer",
    icon: "🎨",
    title: { tr: "Görselleştirici", en: "Visualizer" },
    description: {
      tr: "Tableau veya Power BI'da 3 ders tamamla.",
      en: "Complete 3 lessons in Tableau or Power BI.",
    },
    earned: (p) =>
      p.lessons.filter((l) => l.startsWith("tableau/") || l.startsWith("power-bi/")).length >= 3,
  },
  {
    id: "week-streak",
    icon: "🔥",
    title: { tr: "Yedi Gün", en: "Seven Days" },
    description: { tr: "7 gün üst üste çalış.", en: "Study 7 days in a row." },
    earned: (p) => currentStreak(p.activeDays) >= 7,
  },
  {
    id: "month-streak",
    icon: "⚡",
    title: { tr: "Otuz Gün", en: "Thirty Days" },
    description: { tr: "30 gün üst üste çalış.", en: "Study 30 days in a row." },
    earned: (p) => currentStreak(p.activeDays) >= 30,
  },
  {
    id: "builder",
    icon: "🏗️",
    title: { tr: "İnşaatçı", en: "Builder" },
    description: {
      tr: "İlk uçtan uca projeni tamamla.",
      en: "Complete your first end-to-end project.",
    },
    earned: (p) => p.projects.length >= 1,
  },
  {
    id: "portfolio",
    icon: "💼",
    title: { tr: "Portföy Sahibi", en: "Portfolio Owner" },
    description: { tr: "5 uçtan uca proje tamamla.", en: "Complete 5 end-to-end projects." },
    earned: (p) => p.projects.length >= 5,
  },
  {
    id: "polyglot",
    icon: "🌍",
    title: { tr: "Çok Yönlü", en: "Polyglot" },
    description: {
      tr: "4 farklı patikada ders tamamla.",
      en: "Complete lessons in 4 different tracks.",
    },
    earned: (p) => tracksTouched(p) >= 4,
  },
  {
    id: "grinder",
    icon: "💎",
    title: { tr: "Azimli", en: "Grinder" },
    description: { tr: "2.000 XP topla.", en: "Collect 2,000 XP." },
    earned: (p) => p.xp >= 2000,
  },
  {
    id: "scholar",
    icon: "🎓",
    title: { tr: "Bilgin", en: "Scholar" },
    description: { tr: "30 ders tamamla.", en: "Complete 30 lessons." },
    earned: (p) => p.lessons.length >= 30,
  },
  {
    id: "machine-mind",
    icon: "🤖",
    title: { tr: "Makine Zihni", en: "Machine Mind" },
    description: {
      tr: "Makine öğrenmesi patikasında 3 ders tamamla.",
      en: "Complete 3 lessons in the machine learning track.",
    },
    earned: (p) => p.lessons.filter((l) => l.startsWith("machine-learning/")).length >= 3,
  },
];

export function earnedBadges(progress: ProgressState): Badge[] {
  return badges.filter((b) => b.earned(progress));
}

/* ------------------------------------------------------------------ */
/* Liderlik tablosu (yerel)                                            */
/* ------------------------------------------------------------------ */

/**
 * Supabase bağlanana kadar sıralama yerel hesaplanır.
 * Rakipler sabit tohumlu — her yenilemede aynı kalsın, adil bir hedef sunsun.
 */
const rivals = [
  { name: "Elif K.", xp: 4820 },
  { name: "Mert A.", xp: 3960 },
  { name: "Zeynep T.", xp: 3140 },
  { name: "Can Y.", xp: 2585 },
  { name: "Burak S.", xp: 1970 },
  { name: "Deniz Ö.", xp: 1420 },
  { name: "Selin G.", xp: 980 },
  { name: "Ahmet R.", xp: 610 },
  { name: "Ece D.", xp: 240 },
];

export interface LeaderboardRow {
  rank: number;
  name: string;
  xp: number;
  level: number;
  isYou: boolean;
}

export function leaderboard(you: { name: string; xp: number }): LeaderboardRow[] {
  const rows = [...rivals.map((r) => ({ ...r, isYou: false })), { ...you, isYou: true }];
  rows.sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name));
  return rows.map((r, i) => ({
    rank: i + 1,
    name: r.name,
    xp: r.xp,
    level: levelInfo(r.xp).level,
    isYou: r.isYou,
  }));
}
