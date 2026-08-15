"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/dal";
import { getSupabaseServer } from "@/lib/supabase/server";
import { adminEnabled, getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ActionResult } from "@/lib/auth/types";
import {
  FREE_TRACK_CHANGE_COOLDOWN_DAYS,
  isFreeTrackOption,
  type FreeTrackOption,
} from "@/lib/entitlements";

function ok(message: string): ActionResult {
  return { ok: true, message };
}

function fail(message: string): ActionResult {
  return { ok: false, message };
}

/**
 * Ücretsiz kullanıcının "tamamen açık" tek patikasını seçer/değiştirir.
 *
 * 30 günlük bekleme süresi kötüye kullanımı engeller — yoksa kullanıcı her
 * patikayı sırayla "seçip" tamamını ücretsiz gezebilirdi.
 */
export async function setFreeTrackChoiceAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const trackSlug = String(form.get("trackSlug") ?? "");
  if (!isFreeTrackOption(trackSlug)) {
    return fail("Yalnızca SQL veya Python seçilebilir.");
  }

  const user = await getCurrentUser();
  if (!user) return fail("Bu işlem için giriş yapmalısın.");

  const supabase = await getSupabaseServer();
  if (!supabase) return fail("Giriş sistemi bu kurulumda kapalı.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("free_track_choice, free_track_choice_changed_at")
    .eq("id", user.id)
    .maybeSingle<{ free_track_choice: string | null; free_track_choice_changed_at: string | null }>();

  if (profile?.free_track_choice === trackSlug) {
    return ok("Bu patika zaten ücretsiz seçimin.");
  }

  if (profile?.free_track_choice_changed_at) {
    const changedAt = new Date(profile.free_track_choice_changed_at);
    const cooldownEnds = new Date(changedAt);
    cooldownEnds.setDate(cooldownEnds.getDate() + FREE_TRACK_CHANGE_COOLDOWN_DAYS);
    if (cooldownEnds > new Date()) {
      const days = Math.ceil((cooldownEnds.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return fail(`Ücretsiz patikanı ${days} gün sonra tekrar değiştirebilirsin.`);
    }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      free_track_choice: trackSlug satisfies FreeTrackOption,
      free_track_choice_changed_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return fail(`Kaydedilemedi: ${error.message}`);

  revalidatePath("/", "layout");
  return ok("Ücretsiz patikan güncellendi.");
}

const TRIAL_DAYS = 7;

/**
 * 7 günlük ücretsiz deneme — kredi kartsız, İyzico'dan tamamen bağımsız.
 * Yalnızca hesap başına bir kez kullanılabilir (`trial_used`).
 */
/** `useActionState`in beklediği (prevState, formData) imzasını fazladan
 * argüman olarak kabul eder — ikisi de kullanılmadığı için parametre alınmaz. */
export async function startTrialAction(): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return fail("Bu işlem için giriş yapmalısın.");
  // plan/plan_expires_at/trial_used, protect_profile_columns tetikleyicisiyle
  // korunuyor — kullanıcının kendi RLS istemcisiyle değiştirilemez, bilinçli
  // olarak yalnızca service_role (bu sunucu kararı) yazabilir.
  if (!adminEnabled) return fail("SUPABASE_SERVICE_ROLE_KEY tanımlı değil.");

  const admin = getSupabaseAdmin();
  const { data: profile } = await admin
    .from("profiles")
    .select("trial_used")
    .eq("id", user.id)
    .maybeSingle<{ trial_used: boolean }>();

  if (profile?.trial_used) return fail("Deneme hakkını daha önce kullandın.");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + TRIAL_DAYS);

  const { error } = await admin
    .from("profiles")
    .update({
      plan: "premium",
      plan_expires_at: expiresAt.toISOString(),
      plan_source: "trial",
      trial_used: true,
    })
    .eq("id", user.id);

  if (error) return fail(`Başlatılamadı: ${error.message}`);

  revalidatePath("/", "layout");
  return ok(`${TRIAL_DAYS} günlük deneme başladı.`);
}
