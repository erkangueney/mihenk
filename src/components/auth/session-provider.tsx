"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { supabaseEnabled } from "@/lib/supabase/config";
import type { UserRole } from "@/lib/supabase/types";

export interface SessionUserClient {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  plan: "free" | "premium";
  planExpiresAt: string | null;
}

interface SessionValue {
  user: SessionUserClient | null;
  /** İlk okuma bitti mi? Bitmeden arayüz "giriş yap" göstermemeli (titreme olur). */
  ready: boolean;
  /** Supabase yapılandırılmış mı? false ise üyelik arayüzü hiç çizilmez. */
  enabled: boolean;
}

const SessionContext = createContext<SessionValue>({
  user: null,
  ready: !supabaseEnabled,
  enabled: supabaseEnabled,
});

/**
 * Oturumu istemcide tutar.
 *
 * Neden sunucuda değil: içerik sayfaları derleme anında üretiliyor (SSG).
 * Başlığa sunucu tarafı oturum koymak tüm siteyi istek başına render'a
 * çevirirdi. Yetki gerektiren yerler (admin) zaten sunucuda doğrulanıyor;
 * buradaki bilgi yalnızca "ne gösterelim" sorusunu yanıtlar.
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUserClient | null>(null);
  const [ready, setReady] = useState(!supabaseEnabled);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    let cancelled = false;

    async function sync() {
      const client = getSupabaseBrowser();
      if (!client) return;

      const {
        data: { user: authUser },
      } = await client.auth.getUser();

      if (cancelled) return;

      if (!authUser) {
        setUser(null);
        setReady(true);
        return;
      }

      const { data: profile } = await client
        .from("profiles")
        .select("display_name, role, email, plan, plan_expires_at")
        .eq("id", authUser.id)
        .maybeSingle<{
          display_name: string;
          role: UserRole;
          email: string;
          plan: "free" | "premium";
          plan_expires_at: string | null;
        }>();

      if (cancelled) return;

      setUser({
        id: authUser.id,
        email: profile?.email || authUser.email || "",
        displayName: profile?.display_name ?? "",
        role: profile?.role === "admin" ? "admin" : "member",
        plan: profile?.plan === "premium" ? "premium" : "free",
        planExpiresAt: profile?.plan_expires_at ?? null,
      });
      setReady(true);
    }

    void sync();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void sync();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<SessionValue>(
    () => ({ user, ready, enabled: supabaseEnabled }),
    [user, ready],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  return useContext(SessionContext);
}
