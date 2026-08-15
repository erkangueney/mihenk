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
  stoneTop: "#241d14",
  stoneBottom: "#120e09",
  goldDeep: "#a67c3d",
  goldLight: "#e0bd76",
  gold: "#c9a153",
} as const;
