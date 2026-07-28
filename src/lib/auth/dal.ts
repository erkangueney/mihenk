import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { ProfileRow, UserRole } from "@/lib/supabase/types";

export interface SessionUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  suspended: boolean;
  hiddenFromLeaderboard: boolean;
}

/**
 * Oturumdaki kullanıcı — yoksa null.
 *
 * `getUser()` kullanılır, `getSession()` değil: getSession çerezdeki JWT'ye
 * olduğu gibi güvenir, getUser ise Supabase'e doğrulatır. Yetki kararı
 * verecek bir yerde tek güvenilir olan getUser'dır.
 *
 * React `cache` ile tek render turunda yalnızca bir kez çalışır.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;

  // Supabase ulaşılamazsa oturum doğrulanamaz. Bu durumda "girişli değil"
  // saymak doğru davranış: kapalı yönde başarısız oluruz, kesinti bir
  // erişim açığına dönüşmez.
  let user;
  try {
    ({
      data: { user },
    } = await supabase.auth.getUser());
  } catch {
    return null;
  }
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, display_name, role, suspended, hidden_from_leaderboard")
    .eq("id", user.id)
    .maybeSingle<Pick<
      ProfileRow,
      "id" | "email" | "display_name" | "role" | "suspended" | "hidden_from_leaderboard"
    >>();

  return {
    id: user.id,
    email: profile?.email || user.email || "",
    displayName: profile?.display_name ?? "",
    // Profil satırı henüz oluşmadıysa en dar yetkiye düş.
    role: profile?.role === "admin" ? "admin" : "member",
    suspended: profile?.suspended ?? false,
    hiddenFromLeaderboard: profile?.hidden_from_leaderboard ?? false,
  };
});

/** Giriş zorunlu sayfalar için. Oturum yoksa girişe yollar. */
export async function requireUser(returnTo = "/"): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`/tr/giris?next=${encodeURIComponent(returnTo)}`);
  if (user.suspended) redirect("/tr/giris?error=suspended");
  return user;
}

/**
 * Admin zorunlu sayfalar ve TÜM yönetim işlemleri için.
 *
 * Yalnızca proxy.ts'e güvenme: proxy iyimser bir kontroldür (çerezin
 * varlığına bakar). Yetkiyi veriye dokunan katmanda doğrulamak gerekir.
 */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/tr/giris?next=%2Fadmin");
  if (user.role !== "admin") redirect("/tr?error=forbidden");
  return user;
}

/** Server action'lar için: yönlendirme yerine sonuç döner. */
export async function checkAdmin(): Promise<SessionUser | null> {
  const user = await getCurrentUser();
  return user && user.role === "admin" && !user.suspended ? user : null;
}
