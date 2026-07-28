/**
 * İlk yöneticiyi oluşturur.
 *
 * Panelden üye açabilmek için önce bir yöneticiye ihtiyaç var — ama panele
 * girmek de yönetici olmayı gerektiriyor. Bu script o kısır döngüyü kırar.
 * Rol, kayıt akışında asla metadata'dan okunmadığı için (bkz. 0001_init.sql)
 * yükseltmeyi burada service_role anahtarıyla doğrudan yapıyoruz.
 *
 * Kullanım:
 *   node scripts/create-admin.mjs eposta@ornek.com "GucluBirSifre123"
 *
 * Ortam değişkenleri `.env.local` dosyasından okunur:
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** .env.local'i okur — projede dotenv bağımlılığı yok, basit ayrıştırma yeterli. */
function loadEnv() {
  const env = { ...process.env };
  try {
    const text = readFileSync(join(root, ".env.local"), "utf8");
    for (const line of text.split("\n")) {
      const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
      if (!match) continue;
      const value = match[2].trim().replace(/^["']|["']$/g, "");
      // Gerçek ortam değişkeni her zaman dosyayı ezer.
      if (!env[match[1]]) env[match[1]] = value;
    }
  } catch {
    // .env.local yoksa yalnızca process.env kullanılır.
  }
  return env;
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const [email, password] = process.argv.slice(2);

if (!url || !serviceKey) {
  console.error(
    "HATA: NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanımlı değil.\n" +
      "  .env.local dosyasını .env.example'dan kopyalayıp doldur.",
  );
  process.exit(1);
}

if (!email || !password) {
  console.error('Kullanım: node scripts/create-admin.mjs <eposta> "<sifre>"');
  process.exit(1);
}

if (password.length < 8) {
  console.error("HATA: Şifre en az 8 karakter olmalı.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const normalized = email.trim().toLowerCase();

/** Adres zaten kayıtlıysa yeni hesap açmak yerine onu yükseltiriz. */
async function findExisting() {
  const { data } = await supabase.from("profiles").select("id").eq("email", normalized).maybeSingle();
  return data?.id ?? null;
}

let userId = await findExisting();

if (userId) {
  console.log(`• ${normalized} zaten kayıtlı — şifresi güncellenip yönetici yapılıyor.`);
  const { error } = await supabase.auth.admin.updateUserById(userId, { password });
  if (error) {
    console.error(`HATA: Şifre güncellenemedi: ${error.message}`);
    process.exit(1);
  }
} else {
  const { data, error } = await supabase.auth.admin.createUser({
    email: normalized,
    password,
    email_confirm: true,
    user_metadata: { display_name: normalized.split("@")[0] },
  });
  if (error || !data.user) {
    console.error(`HATA: Kullanıcı oluşturulamadı: ${error?.message ?? "bilinmeyen"}`);
    process.exit(1);
  }
  userId = data.user.id;
  console.log(`• ${normalized} oluşturuldu.`);
}

const { error: roleError } = await supabase
  .from("profiles")
  .update({ role: "admin" })
  .eq("id", userId);

if (roleError) {
  console.error(
    `HATA: Rol yükseltilemedi: ${roleError.message}\n` +
      "  0001_init.sql çalıştırıldı mı? profiles tablosu yoksa bu adım başarısız olur.",
  );
  process.exit(1);
}

console.log(`✓ ${normalized} artık yönetici. /admin adresinden giriş yapabilirsin.`);
