import "server-only";

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";
import type { Database } from "./types";

const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** Yönetim işlemleri (üye açma/silme) için anahtar tanımlı mı? */
export const adminEnabled = SUPABASE_URL.length > 0 && SERVICE_ROLE_KEY.length > 0;

/**
 * service_role istemcisi — RLS'i tamamen atlar.
 *
 * Kuralları:
 *  1. Yalnızca sunucuda. `server-only` importu, bu dosyanın bir istemci
 *     bileşenine sızması hâlinde derlemeyi hata ile durdurur.
 *  2. Her çağrıdan ÖNCE `requireAdmin()` (src/lib/auth/dal.ts) çalışmalı.
 *     Bu istemci kendi başına hiçbir yetki kontrolü yapmaz.
 *  3. Anahtar asla NEXT_PUBLIC_ ile başlayan bir değişkende tutulmaz.
 */
export function getSupabaseAdmin() {
  if (!adminEnabled) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY tanımlı değil. Yönetim işlemleri için bu anahtar gerekir.",
    );
  }

  return createClient<Database>(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
