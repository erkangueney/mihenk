"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/components/consent-banner";
import { usePlanInfo } from "@/lib/entitlements-client";
import { isNativePlatform } from "@/lib/platform";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Reklam yuvası. Sıralı kapı:
 *   native (Capacitor WebView) → hiç render etme (AdSense politikası; AdMob ayrı iş)
 *   onay yok → hiç render etme (KVKK/GDPR)
 *   premium → hiç render etme
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID yok → hiç render etme (anahtar eklenene kadar sessizce kapalı)
 *
 * DOM'a bile eklenmez — premium kullanıcıda CLS/performans maliyeti sıfır.
 */
export function AdSlot({ placement, className = "" }: { placement: string; className?: string }) {
  const consent = useConsent();
  const { ready, isPremium } = usePlanInfo();
  const insRef = useRef<HTMLModElement>(null);

  const eligible =
    !isNativePlatform() && consent === "accepted" && ready && !isPremium && Boolean(ADSENSE_CLIENT_ID);

  useEffect(() => {
    if (!eligible || !insRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Script henüz yüklenmemiş olabilir (lazyOnload) — sessizce geç.
    }
  }, [eligible, placement]);

  if (!eligible) return null;

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-ad-placement={placement}
    />
  );
}
