/**
 * Premium yetkilendirme kuralları.
 *
 * Framework-agnostik: hem sunucu (server action, API route) hem istemci
 * (`usePlanInfo`, bkz. entitlements-client.ts) buradan import eder. `plan`
 * bilgisi `profiles` tablosunda tutulur — `progress` tablosundaki local-first/
 * merge-based senkronizasyondan bilinçli olarak GEÇMEZ (bkz. storage/adapter.ts):
 * ödeme durumu için "son yazan kazanır" yanlış bir modeldir.
 */

import type { LevelId } from "./types";

/** Ücretsiz kullanıcının seçebileceği "tamamen açık" patika seçenekleri. */
export const FREE_TRACK_OPTIONS = ["sql", "python"] as const;
export type FreeTrackOption = (typeof FREE_TRACK_OPTIONS)[number];

export function isFreeTrackOption(value: string): value is FreeTrackOption {
  return (FREE_TRACK_OPTIONS as readonly string[]).includes(value);
}

/** Ücretsiz kullanıcıya da tamamen açık örnek projeler (bkz. src/content/projects.ts). */
export const FREE_SAMPLE_PROJECT_SLUGS = ["sql-satis-raporu", "python-veri-temizligi"] as const;

/** Ücretsiz patika seçimi ne sıklıkla değiştirilebilir (kötüye kullanım engeli). */
export const FREE_TRACK_CHANGE_COOLDOWN_DAYS = 30;

export interface PlanInfo {
  plan: "free" | "premium";
  planExpiresAt: string | null;
  freeTrackChoice: string | null;
}

export const FREE_PLAN_INFO: PlanInfo = {
  plan: "free",
  planExpiresAt: null,
  freeTrackChoice: null,
};

/**
 * Premium hâlâ aktif mi? Süre kontrolü her okumada burada yapılır — dolan
 * premium'u geri "free"ye çevirmek için ayrı bir cron/scheduled job gerekmez.
 */
export function isPremiumActive(info: PlanInfo, now: Date = new Date()): boolean {
  if (info.plan !== "premium") return false;
  if (!info.planExpiresAt) return true; // süresiz/manuel atanmış
  return new Date(info.planExpiresAt) > now;
}

/** Bir patikanın belirli bir seviyesine erişim var mı? */
export function canAccessLevel(trackSlug: string, levelId: LevelId, info: PlanInfo): boolean {
  if (isPremiumActive(info)) return true;
  if (levelId === "foundation") return true; // temel seviye her zaman serbest
  return info.freeTrackChoice === trackSlug;
}

/** Bir uçtan uca projeye erişim var mı? */
export function canAccessProject(
  project: { slug: string; trackSlug: string },
  info: PlanInfo,
): boolean {
  if (isPremiumActive(info)) return true;
  if (info.freeTrackChoice === project.trackSlug) return true;
  return (FREE_SAMPLE_PROJECT_SLUGS as readonly string[]).includes(project.slug);
}
