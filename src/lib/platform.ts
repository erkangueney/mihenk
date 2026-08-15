/**
 * Capacitor native kabuğunda mı çalışıyoruz?
 *
 * `@capacitor/core` paketine bağımlı DEĞİL: Capacitor'ün native WebView'ı
 * çalışma zamanında `window.Capacitor` global'ini kendisi enjekte eder — bu
 * fonksiyon npm paketi kurulu olmasa (Faz 5 kurulumundan önce de) veya
 * derlemeye dahil edilmese bile production'da doğru çalışır.
 *
 * Neden önemli: Google AdSense politikası reklamın native mobil uygulama
 * (WebView dahil) içinde gösterilmesini yasaklar (AdMob gerekir). Bu yüzden
 * reklam bileşenleri native platformda hiç render olmamalı.
 */
export function isNativePlatform(): boolean {
  if (typeof window === "undefined") return false;
  const capacitor = (window as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  try {
    return capacitor?.isNativePlatform?.() ?? false;
  } catch {
    return false;
  }
}
