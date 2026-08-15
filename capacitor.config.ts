import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Native kabuk, statik dosya paketlemez — canlı production URL'ini WebView'da
 * yükler. Sebep: uygulama SSR/auth/middleware (bkz. src/proxy.ts) kullanıyor,
 * next.config.ts `output: "export"` yapmıyor (bkz. o dosyadaki not).
 *
 * Aynı origin'den yüklendiği için Supabase'in cookie tabanlı (@supabase/ssr)
 * oturumu WebView'da normal web davranışıyla çalışır.
 *
 * Canlı adres değişirse (custom domain bağlanırsa) `server.url`'i güncelle.
 */
const config: CapacitorConfig = {
  appId: "com.mihenk.app",
  appName: "Mihenk",
  webDir: "public",
  server: {
    url: "https://mihenk-xi.vercel.app",
    cleartext: false,
  },
  ios: {
    // Şifre sıfırlama e-postasındaki link cihazın harici tarayıcısında açılır
    // (bilinçli davranış — WebView içinde değil, bkz. auth/actions.ts).
    contentInset: "automatic",
  },
};

export default config;
