import type { ProgressState } from "../types";
import { emptyProgress, normalize, type ProgressAdapter } from "./adapter";

const KEY = "veri-akademi:progress:v1";

/**
 * Tarayıcı deposu. Sunucuda (SSR) çağrılırsa sessizce boş durum döner —
 * bileşenler hidrasyon sonrası gerçek veriyle güncellenir.
 */
export const localAdapter: ProgressAdapter = {
  async load(): Promise<ProgressState> {
    if (typeof window === "undefined") return emptyProgress();
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return emptyProgress();
      return normalize(JSON.parse(raw));
    } catch {
      // Bozuk JSON veya kapalı depolama: ilerlemeyi kaybetmek yerine sıfırdan başla.
      return emptyProgress();
    }
  },

  async save(state: ProgressState): Promise<void> {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // Kota dolu veya gizli mod: yazamamak oturumu bozmamalı.
    }
  },

  async clear(): Promise<void> {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* yoksay */
    }
  },
};
