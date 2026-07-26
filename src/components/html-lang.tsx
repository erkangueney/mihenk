"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/types";

/**
 * Kök layout `<html lang="tr">` ile render edilir; dil segmenti kök layout'a
 * ulaşmadığı için aktif dili burada senkronlarız (ekran okuyucular ve SEO için).
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
