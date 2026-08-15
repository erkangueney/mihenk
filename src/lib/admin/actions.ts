"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { checkAdmin } from "@/lib/auth/dal";
import { getSupabaseAdmin, adminEnabled } from "@/lib/supabase/admin";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/auth/types";
import type { SessionUser } from "@/lib/auth/dal";
import { validateContentDoc } from "@/lib/content-docs/validate";
import { CONTENT_TAG } from "@/lib/content-docs/resolve";

/* ------------------------------------------------------------------ */
/* Ortak yardımcılar                                                   */
/* ------------------------------------------------------------------ */

function ok(message: string): ActionResult {
  return { ok: true, message };
}

function fail(message: string): ActionResult {
  return { ok: false, message };
}

/**
 * Her yönetim işleminin ilk satırı.
 *
 * proxy.ts'teki kontrol yalnızca iyimserdir; server action'lar dışarıdan
 * doğrudan POST edilebilen uç noktalardır. Yetki burada doğrulanır.
 */
async function guard(): Promise<{ actor: SessionUser } | { error: ActionResult }> {
  const actor = await checkAdmin();
  if (!actor) return { error: fail("Bu işlem için yönetici yetkisi gerekiyor.") };
  if (!adminEnabled) {
    return {
      error: fail("SUPABASE_SERVICE_ROLE_KEY tanımlı değil; yönetim işlemleri kapalı."),
    };
  }
  return { actor };
}

async function audit(
  actor: SessionUser,
  action: string,
  target: string,
  detail: Record<string, unknown> = {},
): Promise<void> {
  try {
    await getSupabaseAdmin().from("audit_log").insert({
      actor_id: actor.id,
      actor_email: actor.email,
      action,
      target,
      detail,
    });
  } catch {
    // Kayıt tutulamaması asıl işlemi geri almamalı.
  }
}

/** Panelin kendini kilitlemesini önler: son yönetici yetkisini kaybedemez. */
async function isLastAdmin(userId: string): Promise<boolean> {
  const supabase = await getSupabaseServer();
  if (!supabase) return true;

  const { data } = await supabase.from("profiles").select("id").eq("role", "admin");
  const admins = data ?? [];
  return admins.length <= 1 && admins.some((row) => row.id === userId);
}

const MIN_PASSWORD = 8;

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function refreshAdmin(): void {
  revalidatePath("/admin", "layout");
}

/**
 * İçerik değiştiğinde çağrılır.
 *
 * İki adım da gerekli: etiket, çözümleyicinin veri önbelleğini düşürür;
 * revalidatePath ise o veriyle üretilmiş statik sayfaları yeniden ürettirir.
 * Yalnızca biri yapılırsa site eski içeriği göstermeye devam eder.
 *
 * `revalidateTag` değil `updateTag`: ilki etiketi "bayat" işaretler ve
 * tazelemeyi arka plana bırakır — yönetici kaydettikten sonra kendi
 * değişikliğini göremezdi. `updateTag` önbelleği anında düşürür.
 */
function refreshContent(): void {
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

/* ------------------------------------------------------------------ */
/* Üye işlemleri                                                       */
/* ------------------------------------------------------------------ */

/**
 * Panelden üye açar.
 *
 * `email_confirm: true` ile hesap doğrulanmış sayılır — üye e-posta
 * beklemeden verilen şifreyle girer. Kapalı/kurumsal kayıt akışının
 * karşılığı budur.
 */
export async function createMemberAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const g = await guard();
  if ("error" in g) return g.error;

  const email = String(form.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(form.get("password") ?? "");
  const displayName = String(form.get("displayName") ?? "")
    .trim()
    .slice(0, 40);
  const role = String(form.get("role") ?? "member") === "admin" ? "admin" : "member";

  if (!isEmail(email)) return fail("Geçerli bir e-posta adresi gir.");
  if (password.length < MIN_PASSWORD) {
    return fail(`Şifre en az ${MIN_PASSWORD} karakter olmalı.`);
  }

  const admin = getSupabaseAdmin();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: displayName || email.split("@")[0] },
  });

  if (error || !data.user) {
    return fail(
      error?.message.includes("already been registered")
        ? "Bu e-posta zaten kayıtlı."
        : `Üye oluşturulamadı: ${error?.message ?? "bilinmeyen hata"}`,
    );
  }

  // Rol tetikleyicide her zaman 'member' atanır; admin ise burada yükseltilir.
  if (role === "admin") {
    await admin.from("profiles").update({ role: "admin" }).eq("id", data.user.id);
  }

  await audit(g.actor, "member.create", email, { role });
  refreshAdmin();
  return ok(`${email} oluşturuldu.`);
}

export async function updateMemberAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const g = await guard();
  if ("error" in g) return g.error;

  const id = String(form.get("id") ?? "");
  if (!id) return fail("Üye bulunamadı.");

  const role = String(form.get("role") ?? "member") === "admin" ? "admin" : "member";
  const suspended = form.get("suspended") === "on";
  const hidden = form.get("hidden") === "on";
  const note = String(form.get("note") ?? "").slice(0, 500);

  if ((role === "member" || suspended) && (await isLastAdmin(id))) {
    return fail("Son yöneticinin yetkisini kaldıramaz veya hesabını askıya alamazsın.");
  }

  const admin = getSupabaseAdmin();
  const { error } = await admin
    .from("profiles")
    .update({ role, suspended, hidden_from_leaderboard: hidden, note })
    .eq("id", id);

  if (error) return fail(`Güncellenemedi: ${error.message}`);

  // Askıya alınan üyenin açık oturumları da kapatılmalı; yoksa çerezi
  // geçerli olduğu sürece girmiş gibi dolaşmaya devam eder.
  if (suspended) await admin.auth.admin.signOut(id, "global").catch(() => undefined);

  await audit(g.actor, "member.update", id, { role, suspended, hidden });
  refreshAdmin();
  return ok("Üye güncellendi.");
}

export async function deleteMemberAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const g = await guard();
  if ("error" in g) return g.error;

  const id = String(form.get("id") ?? "");
  const confirm = String(form.get("confirm") ?? "");
  if (!id) return fail("Üye bulunamadı.");
  if (confirm !== "SIL") return fail("Silmeyi onaylamak için kutuya SIL yaz.");
  if (id === g.actor.id) return fail("Kendi hesabını silemezsin.");
  if (await isLastAdmin(id)) return fail("Son yöneticiyi silemezsin.");

  // profiles ve progress, auth.users silinince zincirleme siliniyor.
  const { error } = await getSupabaseAdmin().auth.admin.deleteUser(id);
  if (error) return fail(`Silinemedi: ${error.message}`);

  await audit(g.actor, "member.delete", id);
  refreshAdmin();
  return ok("Üye silindi.");
}

export async function setPasswordAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const g = await guard();
  if ("error" in g) return g.error;

  const id = String(form.get("id") ?? "");
  const password = String(form.get("password") ?? "");
  if (!id) return fail("Üye bulunamadı.");
  if (password.length < MIN_PASSWORD) {
    return fail(`Şifre en az ${MIN_PASSWORD} karakter olmalı.`);
  }

  const { error } = await getSupabaseAdmin().auth.admin.updateUserById(id, { password });
  if (error) return fail(`Şifre değiştirilemedi: ${error.message}`);

  await audit(g.actor, "member.password", id);
  return ok("Şifre güncellendi. Yeni şifreyi üyeye güvenli bir kanaldan ilet.");
}

/** Üyeye şifre sıfırlama e-postası gönderir (şifreyi admin görmez). */
export async function sendResetEmailAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const g = await guard();
  if ("error" in g) return g.error;

  const email = String(form.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!isEmail(email)) return fail("Geçerli bir e-posta adresi yok.");

  const supabase = await getSupabaseServer();
  if (!supabase) return fail("Supabase yapılandırılmamış.");

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${site}/tr/sifre-yenile`,
  });
  if (error) return fail(`Gönderilemedi: ${error.message}`);

  await audit(g.actor, "member.reset_email", email);
  return ok("Sıfırlama e-postası gönderildi.");
}

export async function resetProgressAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const g = await guard();
  if ("error" in g) return g.error;

  const id = String(form.get("id") ?? "");
  const confirm = String(form.get("confirm") ?? "");
  if (!id) return fail("Üye bulunamadı.");
  if (confirm !== "SIFIRLA") return fail("Onaylamak için kutuya SIFIRLA yaz.");

  const { error } = await getSupabaseAdmin()
    .from("progress")
    .update({
      xp: 0,
      tasks: {},
      lessons: [],
      projects: [],
      badges: [],
      active_days: [],
    })
    .eq("user_id", id);

  if (error) return fail(`Sıfırlanamadı: ${error.message}`);

  await audit(g.actor, "member.reset_progress", id);
  refreshAdmin();
  return ok("İlerleme sıfırlandı.");
}

/**
 * Üyeye elle premium/free planı atar — İyzico henüz kurulmadıysa test/destek
 * amaçlı kullanılır (bkz. docs/plan-reklam-ve-premium.md §5).
 */
export async function setMemberPlanAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const g = await guard();
  if ("error" in g) return g.error;

  const id = String(form.get("id") ?? "");
  const plan = String(form.get("plan") ?? "free") === "premium" ? "premium" : "free";
  const days = Number(form.get("days") ?? 0);
  if (!id) return fail("Üye bulunamadı.");

  const expiresAt =
    plan === "premium" && Number.isFinite(days) && days > 0
      ? new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
      : null;

  const { error } = await getSupabaseAdmin()
    .from("profiles")
    .update({
      plan,
      plan_expires_at: expiresAt,
      plan_source: plan === "premium" ? "manual" : "none",
    })
    .eq("id", id);

  if (error) return fail(`Güncellenemedi: ${error.message}`);

  await audit(g.actor, "member.set_plan", id, { plan, expiresAt });
  refreshAdmin();
  return ok(plan === "premium" ? "Premium atandı." : "Ücretsiz katmana alındı.");
}

/* ------------------------------------------------------------------ */
/* İçerik işlemleri                                                    */
/* ------------------------------------------------------------------ */

export async function saveContentDocAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const g = await guard();
  if ("error" in g) return g.error;

  const kind = String(form.get("kind") ?? "") === "project" ? "project" : "track";
  const raw = String(form.get("data") ?? "");
  const published = form.get("published") === "on";

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    return fail(`JSON çözümlenemedi: ${(error as Error).message}`);
  }

  // Bozuk bir doküman yayınlanırsa site çöker; şekli yazmadan önce doğrula.
  const check = validateContentDoc(kind, parsed);
  if (!check.ok) return fail(check.message);

  const { error } = await getSupabaseAdmin().from("content_docs").upsert(
    {
      kind,
      slug: check.slug,
      data: parsed,
      published,
      updated_by: g.actor.id,
    },
    { onConflict: "kind,slug" },
  );

  if (error) return fail(`Kaydedilemedi: ${error.message}`);

  await audit(g.actor, "content.save", `${kind}/${check.slug}`, { published });
  refreshAdmin();
  refreshContent();

  // Slug'ı adrese taşı.
  //
  // Yeni bir doküman "?kind=track" adresinden kaydedilirse sayfa hâlâ
  // "veritabanında kayıt yok" durumunu gösterir: yayın kutusu işaretsiz
  // döner ve ikinci bir Kaydet, içeriği farkında olmadan yayından
  // kaldırırdı. Yönlendirme sayfayı gerçek durumla yeniden kurar.
  redirect(
    `/admin/icerik/duzenle?kind=${kind}&slug=${encodeURIComponent(check.slug)}` +
      `&saved=${published ? "yayin" : "taslak"}`,
  );
}

export async function deleteContentDocAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const g = await guard();
  if ("error" in g) return g.error;

  const kind = String(form.get("kind") ?? "") === "project" ? "project" : "track";
  const slug = String(form.get("slug") ?? "");
  if (!slug) return fail("Doküman bulunamadı.");

  const { error } = await getSupabaseAdmin()
    .from("content_docs")
    .delete()
    .eq("kind", kind)
    .eq("slug", slug);

  if (error) return fail(`Silinemedi: ${error.message}`);

  await audit(g.actor, "content.delete", `${kind}/${slug}`);
  refreshAdmin();
  refreshContent();
  return ok("Doküman silindi. Dosyadaki sürüm varsa yeniden geçerli oldu.");
}

export async function toggleContentPublishAction(
  _prev: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const g = await guard();
  if ("error" in g) return g.error;

  const kind = String(form.get("kind") ?? "") === "project" ? "project" : "track";
  const slug = String(form.get("slug") ?? "");
  const publish = form.get("publish") === "true";
  if (!slug) return fail("Doküman bulunamadı.");

  const { error } = await getSupabaseAdmin()
    .from("content_docs")
    .update({ published: publish })
    .eq("kind", kind)
    .eq("slug", slug);

  if (error) return fail(`Güncellenemedi: ${error.message}`);

  await audit(g.actor, publish ? "content.publish" : "content.unpublish", `${kind}/${slug}`);
  refreshAdmin();
  refreshContent();
  return ok(publish ? "Yayınlandı." : "Yayından kaldırıldı.");
}
