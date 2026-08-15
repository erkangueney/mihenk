# Reklam ve Premium Plan

Mihenk şu an tamamen ücretsiz: 12 patika, ~150 ders, 24 uçtan uca proje, XP/seviye/seri/rozet
oyunlaştırması, avatar özelleştirme, liderlik tablosu — hepsi hesap açan herkese açık. Gelir
modeli yok. Bu doküman iki katmanlı bir gelir stratejisi önerir: **ücretsiz kullanıcıda reklam +
ücretli kullanıcıda reklamsız/genişletilmiş erişim (freemium)**. Uygulama planı değildir, karar
ve önceliklendirme dokümanıdır.

## 1. Neden freemium (reklam + premium birlikte)

- Sadece reklam → düşük gelir/kullanıcı, öğrenme deneyimini kalıcı olarak bozar.
- Sadece premium (ücretsiz katman yok) → büyüme durur; platformun değeri "önce dene, sonra öde"ye dayanıyor.
- Freemium → geniş ücretsiz kitle SEO/ağızdan ağıza büyümeyi sağlar, reklam gelirini besler; küçük bir
  yüzdenin premium'a geçmesi asıl geliri oluşturur (edtech'te tipik dönüşüm ~%2-5).

## 2. Ücretsiz / Premium sınırı

**Karar (2026-08-15'te güncellendi):** Mevcut tüm müfredat — 12 patikanın tamamı, tüm seviyeler
(Junior → Expert) ve 24 uçtan uca projenin tamamı — **her zaman ücretsizdir**. Kullanıcının
kaydolduğunda karşılaştığı hiçbir şey kilitlenmez; ücretsiz/premium ayrımının kendisi mevcut
içeriğe hiç uygulanmaz.

Premium, bunun yerine **yalnızca ileride eklenecek yeni, premium-özel** ders ve projelerle var
olur: her patikaya premium-özel ileri seviye ek dersler (patika başına 3-5) ve premium-özel
uçtan uca projeler (patika başına 2+). Bu içerik `src/lib/types.ts`'teki `premium?: boolean`
bayrağıyla işaretlenir (`Track`, `Level`, `Project`) — bayrak yoksa (mevcut tüm içerikte olduğu
gibi) her zaman serbesttir (bkz. `src/lib/entitlements.ts`).

| Alan | Ücretsiz | Premium |
|---|---|---|
| Patikalar (mevcut 12) | Tamamı, tüm seviyeler | Aynı — zaten dahil |
| Uçtan uca projeler (mevcut 24) | Tamamı | Aynı — zaten dahil |
| Yeni premium ders/proje | — | Patika başına 3-5 ek ders + 2+ ek proje (ileride eklenecek, ayrı bir içerik üretim işi) |
| Alet çantası (referans, nasıl yapılır, kopya kâğıdı, deneme alanı) | Tamamı açık | + kopya kâğıtlarında PDF indirme, sınırsız deneme alanı geçmişi |
| Reklam | Ders arası ve sayfa içi banner/native reklam gösterilir | **Reklamsız** |
| Avatar | Ücretsiz parçalar + XP ile açılanlar | + premium-özel nadir/efsanevi parça seti (satın almayla değil, **abonelik süresince** açık) |
| Liderlik tablosu | Görünür, yarışır | + profilde "Premium" rozeti/çerçeve |
| Sertifika | — | Seviye/patika tamamlama sertifikası (PDF, LinkedIn'e eklenebilir) |
| İlerleme yedeği | Hesapla bulut yedekleme (zaten var) | Aynı |

Yönetici (admin) rolündeki kullanıcılar plan durumundan bağımsız her zaman tam erişime sahiptir;
onlara kilit/reklam/premium'a geç arayüzü hiç gösterilmez (bkz. `usePlanInfo()`).

Not: XP, seri, rozet, liderlik — oyunlaştırmanın çekirdeği — hiçbir katmanda kısıtlanmaz. Parayla
XP ya da seviye satmak (pay-to-win) bu platformun "gerçek beceri kazandırma" konumlamasıyla çelişir;
**yalnızca içerik erişimi ve konfor** satılır.

## 3. Reklam stratejisi (ücretsiz katman)

**Yerleşim — izin verilen:**
- Ana sayfa, patika/ders listesi sayfaları arasında native banner (1 adet, sayfa altı)
- Ders **tamamlandıktan sonra** ara ekranında (XP kazanma animasyonuyla aynı ekranda değil, bir sonrakine
  geçmeden önce ayrı bir "devam et" adımında) — interstitial, sık değil (her 3-4 derste bir)
- Profil/liderlik/referans sayfalarında kenar çubuğu reklamı (masaüstü)

**Kesinlikle yasak yerleşimler:**
- Ders içeriğinin ortasında (blok arası) — okuma akışını böler
- Alıştırma/quiz/kod editörü ekranında — dikkat dağıtır, yanlış cevaba yol açar
- Deneme alanı (playground) çalıştırma sırasında — geliştirici deneyimini bozar
- Çocuk/öğrenci kitlesi düşünülürse agresif/atlatılamaz video reklam yok

**Teknik:**
- Ağ: Google AdSense (TR pazarında en yüksek doluluk oranı) — ileride Google Ad Manager'a geçiş
  büyüdükçe düşünülebilir. Ne zaman uygulamaya geçilirse Vercel Marketplace üzerinden uygun bir
  reklam/analytics entegrasyonu araştırılıp öyle kurulmalı; şu an hiçbir SDK kodda yok.
- Reklam bileşeni `ProgressProvider`'daki `premium` durumunu okuyup premium kullanıcıda kendini hiç
  render etmemeli (DOM'a bile eklenmemeli — CLS/performans için).
- KVKK/GDPR: TR ve uluslararası kullanıcı karışık olduğundan **çerez onayı** (consent banner) reklamdan
  önce şart. Onay yoksa yalnızca bağlamsal (kullanıcı verisi kullanmayan) reklam gösterilmeli.
- Sayfa hızı bütçesi: reklam scripti `next/script` ile `strategy="lazyOnload"`; LCP'yi etkilememeli
  (mevcut platformun "kurulumsuz, hızlı" konumlamasıyla çelişmesin).

**Gelir beklentisi (kaba):** Eğitim içerikli TR trafiğinde eCPM genelde düşük (~$0.5-2). Reklam geliri
tek başına sürdürülebilir olmayabilir — bu yüzden asıl hedef premium dönüşümüdür, reklam ek gelirdir.

## 4. Premium fiyatlandırma

- **Aylık**: ~₺89-129 (bölgesel; Udemy/Kodluyoruz gibi TR edtech fiyat aralığına yakın)
- **Yıllık**: ~₺699-899 (aylığa göre ~%35-45 indirim — yıllık taahhüt churn'ü azaltır)
- **Öğrenci indirimi**: `.edu.tr` e-posta doğrulamasıyla %30-50 indirim — hedef kitlenin büyük kısmı öğrenci/yeni mezun
- 7 günlük ücretsiz deneme (kredi kartı istemeden, hesap yeterli) — deneme sonunda otomatik ücretsiz
  katmana düşer, kart bilgisi yoksa otomatik ücretlendirme riski olmaz (sürtünmesiz churn)

Ödeme altyapısı henüz yok. Uygulamaya geçilirken abonelik/ödeme sağlayıcısı Vercel Marketplace
üzerinden seçilmeli (ör. Stripe) — bu plan aşamasında bir SDK/anahtar kurulmuyor.

## 5. Teknik uygulama — sıralı yol haritası (ayrı bir iş, bu dokümanın kapsamı dışında ama burada özetlenir)

1. **Şema**: `profiles` tablosuna `plan` (`free` | `premium`), `plan_expires_at`, `trial_used` alanları
2. **Yetkilendirme**: `src/lib/entitlements.ts` — "bu kullanıcı şu patikaya/projeye erişebilir mi" tek
   kaynak; `content-docs/resolve.ts` ve proje sayfaları bunu sorar
3. **Ödeme sağlayıcı**: Vercel Marketplace'ten seçim + webhook → `profiles.plan` güncellemesi
4. **Reklam bileşeni**: `<AdSlot placement="..." />` — `useProgress()`'ten `plan === "free"` okur
5. **Kilit ekranı**: Kilitli patika/projede "Premium'a geç" CTA'sı — asla ders içeriğinin ortasında değil,
   patika/proje listesinde kilit rozeti olarak
6. **Sertifika**: Seviye tamamlandığında PDF üretimi (mevcut `@media print` altyapısı — kopya kâğıtlarında
   kurulan yazdırma stili — buraya da taşınabilir)

## 6. Takip edilecek metrikler

- Ücretsiz → premium dönüşüm oranı (hedef: ilk 6 ayda %2+)
- 7 günlük deneme → ücretli abonelik oranı
- Reklam eCPM ve doluluk oranı, sayfa başına reklam nedeniyle LCP/CLS regresyonu var mı
- Kilitli patika/projede "Premium'a geç" tıklama oranı (hangi patikalar en çok istek görüyor —
  ücretsiz/ücretli sınırını buna göre ayarla)
- Churn: aylık vs yıllık plan, öğrenci indirimi kullananlarda churn farkı
