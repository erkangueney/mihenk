import "server-only";

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, supabaseEnabled } from "./config";
import type { Database } from "./types";

/**
 * Oturumsuz sunucu istemcisi — yalnızca herkese açık veriyi okur.
 *
 * Neden `server.ts` yerine bu: oradaki istemci `cookies()` çağırır ve
 * `cookies()` dinamik bir API'dir; onu kullanan her sayfa istek anında
 * render edilmeye başlar. İçerik sayfaları derleme anında üretiliyor ve
 * öyle kalmalı. Yayınlanan içerik zaten anon rolüne açık (RLS), bu yüzden
 * oturuma ihtiyaç yok.
 */
export function getSupabasePublic() {
  if (!supabaseEnabled) return null;

  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
