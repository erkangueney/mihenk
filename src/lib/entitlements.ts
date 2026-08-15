/**
 * Premium yetkilendirme kuralları.
 *
 * Model: MEVCUT tüm içerik (12 patika, tüm seviyeler, 24 proje) her zaman
 * ücretsizdir. Premium yalnızca ileride eklenecek, içerikte açıkça
 * `premium: true` ile işaretlenmiş YENİ ders/seviye/proje için anlam
 * kazanır — bayrak yoksa (mevcut tüm içerikte olduğu gibi) her zaman serbest.
 *
 * Framework-agnostik: hem sunucu hem istemci (`usePlanInfo`, bkz.
 * entitlements-client.ts) buradan import eder. `plan` bilgisi `profiles`
 * tablosunda tutulur — `progress` tablosundaki local-first/merge-based
 * senkronizasyondan bilinçli olarak GEÇMEZ (bkz. storage/adapter.ts): ödeme
 * durumu için "son yazan kazanır" yanlış bir modeldir.
 */

export interface PlanInfo {
  plan: "free" | "premium";
  planExpiresAt: string | null;
}

export const FREE_PLAN_INFO: PlanInfo = { plan: "free", planExpiresAt: null };

/**
 * Premium hâlâ aktif mi? Süre kontrolü her okumada burada yapılır — dolan
 * premium'u geri "free"ye çevirmek için ayrı bir cron/scheduled job gerekmez.
 */
export function isPremiumActive(info: PlanInfo, now: Date = new Date()): boolean {
  if (info.plan !== "premium") return false;
  if (!info.planExpiresAt) return true; // süresiz/manuel atanmış
  return new Date(info.planExpiresAt) > now;
}

/** İçerik öğesi (patika/seviye/proje) premium olarak işaretli mi? */
export interface PremiumFlags {
  /** Bulunduğu patika premium mi (tüm seviyeler/dersler kilitlenir). */
  trackPremium?: boolean;
  /** Öğenin kendisi (seviye/proje) premium mi. */
  premium?: boolean;
}

/** Bayrak yoksa (mevcut tüm içerikte olduğu gibi) her zaman erişilebilir. */
export function canAccessContent(flags: PremiumFlags, info: PlanInfo): boolean {
  if (isPremiumActive(info)) return true;
  return !(flags.trackPremium || flags.premium);
}
