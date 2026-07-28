/**
 * Marka kimliği tek kaynaktan yönetilir; ad değişirse yalnızca burası düzenlenir.
 *
 * "Mihenk" — mihenk taşı, altının ayarını sınamak için üzerine altın sürülen
 * siyah taştır. Amblem bu sahneyi taşır: obsidyen taş ve üzerinde yükselen
 * altın ayar izleri. İzlerin boyu Temel'den Uzman'a çıkan kademeleri anlatır.
 */

export const BRAND_NAME = "Mihenk";

/** Logoda kullanılan büyük harfli yazım. Türkçe İ sorununu önlemek için
 *  CSS `uppercase` yerine harfi harfine yazılır. */
export const BRAND_WORDMARK = "MİHENK";

/** Amblemin sabit renkleri. Tema değişse de taş her zaman koyu kalır —
 *  mihenk taşı tanımı gereği siyahtır ve bu marka tutarlılığını korur. */
export const BRAND_COLORS = {
  stoneTop: "#1c1f2a",
  stoneBottom: "#07080d",
  goldDeep: "#b98630",
  goldLight: "#f0d795",
  gold: "#d9a84e",
} as const;
