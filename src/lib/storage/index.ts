import { localAdapter } from "./local";
import type { ProgressAdapter } from "./adapter";

/**
 * Aktif ilerleme deposu.
 *
 * Supabase'e geçerken yapılacak tek değişiklik burada olur:
 *   import { supabaseAdapter } from "./supabase";
 *   export const adapter = supabaseAdapter;
 * Kurulum adımları ve hazır adaptör kodu: `docs/supabase-adapter.md`
 */
export const adapter: ProgressAdapter = localAdapter;

export { emptyProgress, normalize, PROGRESS_VERSION } from "./adapter";
export type { ProgressAdapter } from "./adapter";
