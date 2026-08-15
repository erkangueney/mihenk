"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/dal";
import { adminEnabled, getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ActionResult } from "@/lib/auth/types";

function ok(message: string): ActionResult {
  return { ok: true, message };
}

function fail(message: string): ActionResult {
  return { ok: false, message };
}

const TRIAL_DAYS = 7;

/**
 * 7 günlük ücretsiz deneme — kredi kartsız, İyzico'dan tamamen bağımsız.
 * Yalnızca hesap başına bir kez kullanılabilir (`trial_used`).
 *
 * `useActionState`in beklediği (prevState, formData) imzasını fazladan
 * argüman olarak kabul eder — ikisi de kullanılmadığı için parametre alınmaz.
 */
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
