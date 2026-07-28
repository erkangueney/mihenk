"use server";

import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { AuthFormState } from "./types";

const MIN_PASSWORD = 8;

function fail(message: string, errors: Record<string, string> = {}): AuthFormState {
  return { ok: false, message, errors };
}

function readEmail(form: FormData): string {
  return String(form.get("email") ?? "")
    .trim()
    .toLowerCase();
}

/** Basit ama pratikte yeterli e-posta kontrolü; asıl doğrulama Supabase'de. */
function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

/**
 * Açık kayıt. Rol her zaman 'member' olur — profil satırını veritabanı
 * tetikleyicisi açar ve rolü metadata'dan okumaz (bkz. 0001_init.sql).
 */
export async function signUpAction(_prev: AuthFormState, form: FormData): Promise<AuthFormState> {
  const supabase = await getSupabaseServer();
  if (!supabase) return fail("Giriş sistemi bu kurulumda kapalı.");

  const email = readEmail(form);
  const password = String(form.get("password") ?? "");
  const displayName = String(form.get("displayName") ?? "")
    .trim()
    .slice(0, 40);

  const errors: Record<string, string> = {};
  if (!isEmail(email)) errors.email = "Geçerli bir e-posta adresi gir.";
  if (password.length < MIN_PASSWORD) {
    errors.password = `Şifre en az ${MIN_PASSWORD} karakter olmalı.`;
  }
  if (displayName.length < 2) errors.displayName = "Görünen ad en az 2 karakter olmalı.";
  if (Object.keys(errors).length > 0) return fail("Formu kontrol et.", errors);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });

  if (error) {
    return fail(
      error.message.includes("already registered")
        ? "Bu e-posta zaten kayıtlı. Giriş yapmayı dene."
        : `Kayıt tamamlanamadı: ${error.message}`,
    );
  }

  // E-posta doğrulaması açıksa oturum gelmez; kullanıcıyı bilgilendir.
  if (!data.session) {
    return {
      ok: true,
      message: "Hesabın oluşturuldu. Doğrulama bağlantısı için e-postanı kontrol et.",
      errors: {},
    };
  }

  redirect("/tr/profile");
}

export async function signInAction(_prev: AuthFormState, form: FormData): Promise<AuthFormState> {
  const supabase = await getSupabaseServer();
  if (!supabase) return fail("Giriş sistemi bu kurulumda kapalı.");

  const email = readEmail(form);
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "").trim();

  if (!isEmail(email) || password.length === 0) {
    return fail("E-posta ve şifre gerekli.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // Hangi adresin kayıtlı olduğunu sızdırmamak için tek tip mesaj.
    return fail("E-posta veya şifre hatalı.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("suspended, role")
    .eq("id", data.user.id)
    .maybeSingle<{ suspended: boolean; role: string }>();

  if (profile?.suspended) {
    await supabase.auth.signOut();
    return fail("Bu hesap askıya alınmış. Yöneticiyle iletişime geç.");
  }

  // Açık yönlendirme (open redirect) olmasın: yalnızca site içi yollar.
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : null;
  redirect(safeNext ?? (profile?.role === "admin" ? "/admin" : "/tr/profile"));
}

export async function signOutAction(): Promise<void> {
  const supabase = await getSupabaseServer();
  if (supabase) await supabase.auth.signOut();
  redirect("/tr");
}

/** Şifre sıfırlama bağlantısı gönderir. */
export async function requestPasswordResetAction(
  _prev: AuthFormState,
  form: FormData,
): Promise<AuthFormState> {
  const supabase = await getSupabaseServer();
  if (!supabase) return fail("Giriş sistemi bu kurulumda kapalı.");

  const email = readEmail(form);
  if (!isEmail(email)) return fail("Geçerli bir e-posta adresi gir.");

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${site}/tr/sifre-yenile`,
  });

  // Adresin kayıtlı olup olmadığını ele vermemek için sonuç hep aynı.
  return {
    ok: true,
    message: "Adres kayıtlıysa şifre sıfırlama bağlantısı gönderildi.",
    errors: {},
  };
}

/** Sıfırlama bağlantısıyla gelen oturumda yeni şifreyi kaydeder. */
export async function updatePasswordAction(
  _prev: AuthFormState,
  form: FormData,
): Promise<AuthFormState> {
  const supabase = await getSupabaseServer();
  if (!supabase) return fail("Giriş sistemi bu kurulumda kapalı.");

  const password = String(form.get("password") ?? "");
  const confirm = String(form.get("confirm") ?? "");

  if (password.length < MIN_PASSWORD) {
    return fail("", { password: `Şifre en az ${MIN_PASSWORD} karakter olmalı.` });
  }
  if (password !== confirm) {
    return fail("", { confirm: "Şifreler eşleşmiyor." });
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return fail(`Şifre güncellenemedi: ${error.message}`);

  redirect("/tr/profile");
}
