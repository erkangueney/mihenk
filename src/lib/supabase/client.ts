import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, supabaseEnabled } from "./config";
import type { Database } from "./types";

type BrowserClient = ReturnType<typeof createBrowserClient<Database>>;

let cached: BrowserClient | null = null;

/**
 * Tarayıcı istemcisi. Oturumu çereze yazar; sunucu bileşenleri aynı çerezi okur.
 *
 * Supabase yapılandırılmamışsa `null` döner — çağıran taraf bunu
 * "giriş özelliği kapalı" olarak yorumlar.
 */
export function getSupabaseBrowser(): BrowserClient | null {
  if (!supabaseEnabled) return null;
  cached ??= createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
  return cached;
}
