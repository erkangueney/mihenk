import type { ProgressState } from "../types";

/**
 * İlerleme deposu arayüzü.
 *
 * Uygulamanın geri kalanı yalnızca bu arayüzü tanır; verinin localStorage'da mı
 * Supabase'de mi durduğunu bilmez. Seçim `src/lib/storage/index.ts` içinde tek
 * satırda yapılır. Ayrıntı: `docs/backend.md`
 */
export interface ProgressAdapter {
  /** Depodan durumu okur; kayıt yoksa boş durum döner. */
  load(): Promise<ProgressState>;
  /** Durumu kalıcı hale getirir. */
  save(state: ProgressState): Promise<void>;
  /** Tüm ilerlemeyi siler. */
  clear(): Promise<void>;
}

export const PROGRESS_VERSION = 1;

export function emptyProgress(): ProgressState {
  return {
    xp: 0,
    tasks: {},
    lessons: [],
    projects: [],
    badges: [],
    activeDays: [],
    displayName: "",
    version: PROGRESS_VERSION,
  };
}

/**
 * Dışarıdan gelen (localStorage, dosya yedeği, ileride API) veriyi güvene alır.
 * Bozuk veya eski kayıtlar uygulamayı çökertmek yerine boş alanlara düşer.
 */
export function normalize(raw: unknown): ProgressState {
  const base = emptyProgress();
  if (!raw || typeof raw !== "object") return base;
  const r = raw as Partial<ProgressState>;

  const tasks: Record<string, number> = {};
  if (r.tasks && typeof r.tasks === "object") {
    for (const [key, value] of Object.entries(r.tasks)) {
      if (typeof value === "number" && Number.isFinite(value)) tasks[key] = value;
    }
  }

  const strings = (value: unknown): string[] =>
    Array.isArray(value) ? Array.from(new Set(value.filter((v): v is string => typeof v === "string"))) : [];

  return {
    xp: typeof r.xp === "number" && Number.isFinite(r.xp) ? Math.max(0, Math.round(r.xp)) : 0,
    tasks,
    lessons: strings(r.lessons),
    projects: strings(r.projects),
    badges: strings(r.badges),
    activeDays: strings(r.activeDays).sort(),
    displayName: typeof r.displayName === "string" ? r.displayName.slice(0, 40) : "",
    version: PROGRESS_VERSION,
  };
}
