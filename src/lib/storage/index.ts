import { supabaseEnabled } from "../supabase/config";
import { localAdapter } from "./local";
import { supabaseAdapter } from "./supabase";
import type { ProgressAdapter } from "./adapter";

/**
 * Aktif ilerleme deposu.
 *
 * Supabase anahtarları tanımlıysa bulut adaptörü — giriş yapılmamışsa o da
 * kendi içinde localStorage'a düşer. Anahtar yoksa doğrudan localStorage.
 * Uygulamanın geri kalanı yalnızca `ProgressAdapter` arayüzünü tanır;
 * hangisinin seçildiğini bilmez.
 */
export const adapter: ProgressAdapter = supabaseEnabled ? supabaseAdapter : localAdapter;

export { emptyProgress, normalize, PROGRESS_VERSION } from "./adapter";
export { flushPendingProgress } from "./supabase";
export type { ProgressAdapter } from "./adapter";
