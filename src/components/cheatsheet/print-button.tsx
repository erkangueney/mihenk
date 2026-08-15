"use client";

import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

/**
 * Yazdırma düğmesi.
 *
 * Yazdırma düzeninin kendisi CSS'te (`@media print`, globals.css): gezinme ve
 * dekoratif katmanlar gizlenir, kart kenarlıkları inceltilir. Kullanıcı
 * doğrudan `Ctrl+P` de diyebilir; düğme yalnızca keşfedilebilirlik için.
 */
export function PrintButton({ locale }: { locale: Locale }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm font-medium transition hover:border-accent"
    >
      🖨 {ui("cheatsheet.print", locale)}
    </button>
  );
}
