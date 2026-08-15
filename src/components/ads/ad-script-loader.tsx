"use client";

import Script from "next/script";
import { useConsent } from "@/components/consent-banner";
import { isNativePlatform } from "@/lib/platform";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

/**
 * AdSense script'i — yalnızca onay verilmişse, native olmayan platformda ve
 * anahtar tanımlıysa yüklenir. `lazyOnload`: sayfa hızı bütçesini (LCP)
 * etkilememesi için en son yüklenen kaynaklardan biri olur.
 */
export function AdScriptLoader() {
  const consent = useConsent();

  if (isNativePlatform() || consent !== "accepted" || !ADSENSE_CLIENT_ID) return null;

  return (
    <Script
      async
      strategy="lazyOnload"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
