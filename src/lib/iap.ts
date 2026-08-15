/**
 * Native uygulama içi satın alma (IAP) — STUB.
 *
 * Apple/Google Developer hesapları henüz açılmadı ve Apple/Google store
 * politikaları dijital abonelik için harici (web) ödeme linkine
 * yönlendirmeyi yasaklıyor — yani mobil uygulamada İyzico checkout'a
 * yönlendirmek de review reddi riski taşır. Bu yüzden `/premium` sayfası
 * native platformda satın alma butonlarını hiç GÖSTERMEZ (bkz. PremiumActions,
 * isNativePlatform()); bu fonksiyon yalnızca gelecekte gerçek bir IAP
 * eklentisi (ör. RevenueCat/cordova-plugin-purchases) bağlanana kadar
 * arayüzü sabit tutmak için var.
 */
export interface IapResult {
  ok: false;
  reason: "iap-not-configured";
}

export async function purchasePremium(): Promise<IapResult> {
  return { ok: false, reason: "iap-not-configured" };
}
