/**
 * Supabase ortam değişkenleri ve "yapılandırıldı mı?" bayrağı.
 *
 * Anahtarlar yoksa uygulama çökmez: giriş kapalı kalır, ilerleme
 * localStorage'da tutulur. Böylece depoyu klonlayan biri hiçbir kurulum
 * yapmadan `npm run dev` diyebilir.
 *
 * NEXT_PUBLIC_* değişkenleri derleme anında gömülür; bu yüzden
 * `process.env.X` düz metin olarak yazılmalı (dinamik erişim çalışmaz).
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Giriş, senkron ilerleme ve admin paneli yalnızca bu true iken çalışır. */
export const supabaseEnabled = SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
