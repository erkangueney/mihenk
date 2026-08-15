"use client";

import { useMemo } from "react";
import { useSession } from "@/components/auth/session-provider";
import { FREE_PLAN_INFO, isPremiumActive, type PlanInfo } from "./entitlements";

export interface PlanInfoValue extends PlanInfo {
  /** Oturum/plan bilgisi ilk kez okundu mu? Okunmadan "kilitli" göstermek titremeye yol açar. */
  ready: boolean;
  isPremium: boolean;
}

/**
 * Kullanıcının plan bilgisini oturumdan okur.
 *
 * Oturum yoksa veya Supabase kapalıysa `free` döner (mevcut sessiz-kapanma
 * deseniyle tutarlı) — hiçbir yerde hata fırlatmaz.
 */
export function usePlanInfo(): PlanInfoValue {
  const { user, ready } = useSession();

  return useMemo(() => {
    const info: PlanInfo = user
      ? { plan: user.plan, planExpiresAt: user.planExpiresAt, freeTrackChoice: user.freeTrackChoice }
      : FREE_PLAN_INFO;
    return { ...info, ready, isPremium: isPremiumActive(info) };
  }, [user, ready]);
}
