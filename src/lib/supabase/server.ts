import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, supabaseEnabled } from "./config";
import type { Database } from "./types";

type ServerClient = ReturnType<typeof createServerClient<Database>>;

/**
 * Sunucu istemcisi — kullanıcının çerezindeki oturumla çalışır, yani RLS
 * politikaları o kullanıcı için uygulanır. Yetki gerektiren her okuma
 * buradan geçmeli; service_role istemcisi (admin.ts) yalnızca RLS'in
 * yetmediği yönetim işleri içindir.
 */
export async function getSupabaseServer(): Promise<ServerClient | null> {
  if (!supabaseEnabled) return null;
  const cookieStore = await cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(list) {
        try {
          for (const { name, value, options } of list) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Sunucu bileşeni render'ı sırasında çerez yazılamaz. Oturum
          // tazeleme zaten proxy.ts içinde yapılıyor, burada yutmak güvenli.
        }
      },
    },
  });
}
