"use client";

import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { useSession } from "./auth/session-provider";

/**
 * Altbilgideki "ilerlemen nerede duruyor" cümlesi.
 *
 * Cevap oturuma göre değişiyor, altbilgi ise sunucu bileşeni — bu yüzden
 * yalnızca bu cümle istemcide çiziliyor.
 */
export function StorageNote({ locale }: { locale: Locale }) {
  const { user, enabled, ready } = useSession();

  // Üyelik hiç kurulmamışsa tek doğru cevap var.
  if (!enabled) return <>{ui("footer.storage.device", locale)}</>;

  // Oturum okunana kadar sessiz kal: yanlış cümleyi bir an gösterip
  // düzeltmek, hiç göstermemekten daha kötü.
  if (!ready) return null;

  return <>{ui(user ? "footer.storage.cloud" : "footer.storage.signIn", locale)}</>;
}
