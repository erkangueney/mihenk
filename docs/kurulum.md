# Kurulum ve ücretsiz yayına alma

Bu belge sıfırdan başlayıp siteyi **hiçbir ücret ödemeden** canlıya almanın tam yolunu anlatır:
Supabase (veritabanı + üyelik) ve Vercel (barındırma) — ikisi de ücretsiz katmanda.

Toplam süre: yaklaşık 20 dakika.

---

## 0. Önce şunu bil

Supabase anahtarları tanımlı **değilken** de site tam çalışır: dersler, alıştırmalar,
XP, rozetler — hepsi. Tek fark ilerlemenin yalnızca o tarayıcıda (localStorage) durması,
üyelik ve admin panelinin kapalı olması. Yani aşağıdaki adımlar "site çalışsın" için
değil, "üyeler ve yönetim olsun" içindir.

---

## Alternatif: buluta hiç çıkmadan, yerelde

Bulut hesabı açmadan önce her şeyi kendi makinende deneyebilirsin. Supabase'in yerel
yığını Docker üzerinde tam bir Postgres + Auth + PostgREST çalıştırır — canlıdaki
davranışın aynısı.

```bash
brew install supabase/tap/supabase   # tek seferlik
npm run db:start                     # Docker açık olmalı
```

`npm run db:start` çıktısındaki `API_URL`, `ANON_KEY` ve `SERVICE_ROLE_KEY` değerlerini
`.env.local`'e yaz. Migration otomatik uygulanır. Sonra:

```bash
npm run create-admin -- admin@ornek.test "GucluBirSifre123"
npm run dev
```

| Komut | Ne yapar |
| --- | --- |
| `npm run db:start` | Yerel Supabase yığınını başlatır, migration'ları uygular |
| `npm run db:reset` | Veritabanını sıfırlar ve migration'ları baştan uygular |
| `npm run db:studio` | Tarayıcıda tablo yöneticisini açar |
| `npm run db:stop` | Yığını durdurur |

Şemayı değiştirdiğinde `npm run db:reset` ile sınamak, hatayı canlıda değil burada
yakalamanı sağlar.

---

## 1. Supabase projesi

1. [supabase.com](https://supabase.com) → ücretsiz hesap aç → **New project**.
2. Bölge olarak kullanıcılarına en yakınını seç (Türkiye için `eu-central-1` iyi bir seçim).
3. Veritabanı şifresini bir yere kaydet — sonra lazım olmayacak ama kaybedersen sıfırlaman gerekir.

Proje hazır olunca **SQL Editor**'ü aç ve `supabase/migrations/` altındaki dosyaları
**numara sırasıyla** çalıştır — her birinin tamamını yapıştır:

1. `0001_init.sql` — şema, görünümler ve RLS politikaları
2. `0002_avatar.sql` — avatar sütunu ve liderlik tablosunun güncel sürümü

İlk dosya şunları kurar:

| Nesne | İşlevi |
|---|---|
| `profiles` | Üye bilgileri, rol, askı durumu |
| `progress` | XP, tamamlanan ders/proje, rozetler, aktif günler, avatar |
| `content_docs` | Panelden düzenlenen patika/proje sürümleri |
| `audit_log` | Panelde yapılan yönetim işlemleri |
| `admin_members` | Üye listesi için birleşik görünüm |
| RLS politikaları | Kimin neyi görebileceği |

Dosya tekrar çalıştırılabilir; ikinci kez çalıştırmak veriyi bozmaz.

> **Atlamamak gereken adım:** Bu SQL, satır düzeyi güvenliği (RLS) de açar. RLS olmadan
> anon anahtarıyla herkes herkesin satırını okuyabilir. Şemayı elle kurup bu kısmı
> atlarsan üyelerinin ilerlemesi herkese açık olur.

### E-posta doğrulaması

Varsayılan olarak Supabase kayıt sonrası doğrulama e-postası ister. Ücretsiz katmanda
e-posta gönderim kotası düşüktür (saatte birkaç adet). İki seçenek:

- **Doğrulamayı kapat:** Authentication → Sign In / Providers → Email → "Confirm email"
  kapalı. Kayıt anında giriş yapılır. Kapalı/davetli bir grup için en pratiği budur.
- **Açık bırak:** Gerçek hacim bekliyorsan Authentication → Emails → SMTP Settings'ten
  kendi SMTP'ni (Resend, Brevo, Postmark — hepsinin ücretsiz katmanı var) bağla.

Panelden oluşturulan üyeler her hâlükârda doğrulanmış sayılır; doğrulama beklemezler.

---

## 2. Anahtarlar

Supabase panelinde **Project Settings → API**:

| Değer | Nereye |
|---|---|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| `anon` `public` anahtarı | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` `secret` anahtarı | `SUPABASE_SERVICE_ROLE_KEY` |

Yerelde:

```bash
cp .env.example .env.local
# .env.local'i açıp üç değeri doldur
```

> `anon` anahtarının tarayıcıya açık olması **normaldir**; güvenliği sağlayan RLS'tir.
> `service_role` ise RLS'i tamamen atlar — onu asla `NEXT_PUBLIC_` ile başlayan bir
> değişkene koyma ve istemci koduna taşıma. `src/lib/supabase/admin.ts` içindeki
> `server-only` importu bu hatayı derleme zamanında yakalar.

---

## 3. İlk yönetici

Panele girebilmek için yönetici olman, yönetici olmak için de panele girmen gerekir.
Bu döngüyü kıran script:

```bash
npm run create-admin -- eposta@ornek.com "GucluBirSifre123"
```

Adres zaten kayıtlıysa şifresini günceller ve yönetici yapar. Alternatif olarak
Supabase SQL Editor'de tek satır:

```sql
update public.profiles set role = 'admin' where email = 'eposta@ornek.com';
```

Artık `npm run dev` deyip `http://localhost:3000/admin` adresine girebilirsin.

---

## 4. Vercel'e yayınla

1. Projeyi GitHub'a it (henüz yapmadıysan).
2. [vercel.com](https://vercel.com) → **Add New → Project** → depoyu seç.
3. Framework otomatik **Next.js** algılanır; derleme ayarlarına dokunma.
4. **Environment Variables** bölümüne dört değeri gir:

   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   NEXT_PUBLIC_SITE_URL     → https://<projen>.vercel.app
   ```

5. **Deploy**.

Dağıtım bitince Supabase'e dön ve **Authentication → URL Configuration**:

- **Site URL**: `https://<projen>.vercel.app`
- **Redirect URLs** listesine ekle: `https://<projen>.vercel.app/**`

Bu adım atlanırsa şifre sıfırlama bağlantıları localhost'a döner.

> `NEXT_PUBLIC_SITE_URL`'i ilk dağıtımdan sonra öğrendiğin gerçek adresle güncelleyip
> yeniden dağıtman gerekir; bu değişken derleme anında koda gömülür.

---

## 5. Mobil uygulama (iOS/Android)

Repoda `ios/` ve `android/` klasörleri hazır — [Capacitor](https://capacitorjs.com) ile
kurulmuş, native kabuk canlı adresi (`capacitor.config.ts`'teki `server.url`) bir
WebView'da açıyor. Statik dosya paketlemiyor; site SSR/auth kullandığı için bu şart.

1. `capacitor.config.ts`'teki `server.url`'i kendi canlı adresinle güncelle (varsayılan
   `https://mihenk-xi.vercel.app`), sonra `npm run cap:sync`.
2. **iOS**: App Store'dan tam Xcode kur (bu ortamda yalnızca Command Line Tools var,
   yeterli değil), sonra `npm run cap:ios` ile Xcode'da aç. Signing için Apple Developer
   Program (yıllık $99) hesabı gerekir.
3. **Android**: Android Studio kur, `npm run cap:android` ile aç. Yayın için Google Play
   Developer (tek seferlik $25) hesabı gerekir.
4. Uygulama içi satın alma (abonelik) henüz **kurulu değil** — `src/lib/iap.ts` bir stub.
   Apple/Google, dijital abonelikte kendi ödeme sistemlerini (IAP/Play Billing, ~%15-30
   komisyon) zorunlu kılıyor; `/premium` sayfası bu yüzden native uygulamada satın alma
   butonlarını hiç göstermiyor (yalnızca web'de İyzico ile çalışıyor).
5. Reklam: AdSense native uygulama içinde gösterilmiyor (Google politikası — AdMob
   gerekir, ayrı bir iş). Mobil app şu an reklamsız.

---

## 6. Ücretsiz katmanın sınırları

Bilerek girmen için:

| | Ücretsiz sınır | Ne olur aşılırsa |
|---|---|---|
| Supabase veritabanı | 500 MB | Yazma durur. Bu proje için fazlasıyla yeterli — ilerleme kayıtları çok küçük. |
| Supabase — hareketsizlik | 7 gün | Proje duraklatılır. Panelden tek tıkla geri açılır; veri kaybolmaz. |
| Supabase e-posta | Saatte birkaç adet | Doğrulama/sıfırlama e-postaları gecikir. Çözüm: kendi SMTP'ni bağla. |
| Vercel | 100 GB bant genişliği/ay | Bu ölçekte pratikte ulaşılmaz. |

**Duraklama uyarısı önemli:** Siteye 7 gün hiç kimse girmezse Supabase projesi uyur ve
giriş çalışmaz. Düzenli kullanıcın olacaksa sorun değil; olmayacaksa haftada bir
uğraman yeterli.

---

## 7. Kurulum doğru mu?

Canlıda sırayla dene:

- [ ] `/tr/kayit` — yeni hesap açılıyor mu?
- [ ] `/tr/giris` — giriş sonrası profile yönlendiriyor mu?
- [ ] Bir ders bitir, sonra çıkış yapıp tekrar gir — XP duruyor mu?
- [ ] `/tr/leaderboard` — kendi satırını "sen" etiketiyle görüyor musun?
- [ ] `/admin` — üye olmayan bir hesapla girişe yönlendiriyor mu?
- [ ] `/admin/uyeler` — üye oluştur, sonra o hesapla giriş yap.

Hepsi çalışıyorsa kurulum tamam.

---

## Sorun giderme

**`/admin`'e girince ana sayfaya atıyor**
Hesabın yönetici değil. `npm run create-admin` ile yükselt.

**Panelde "SUPABASE_SERVICE_ROLE_KEY tanımlı değil" uyarısı**
Listeleri görürsün ama üye açma/silme kapalıdır. Anahtarı Vercel'de ekleyip **yeniden
dağıt** — ortam değişkenleri mevcut dağıtıma geriye dönük uygulanmaz.

**Şifre sıfırlama bağlantısı localhost'a gidiyor**
`NEXT_PUBLIC_SITE_URL` yanlış veya Supabase'deki Redirect URLs eksik. Adım 4'ün sonuna bak.

**Liderlik tablosu boş**
Tablo yalnızca XP'si sıfırdan büyük üyeleri gösterir. Bir ders bitir. İlerleme yazımı
ağ trafiğini azaltmak için ~1,2 saniye geciktirilir; hemen görünmezse sayfayı yenile.

**İlerleme kaydedilmiyor**
Tarayıcı konsolunda RLS hatası var mı bak. Genellikle `0001_init.sql`'in tamamı değil
bir kısmı çalıştırılmıştır — dosyayı baştan çalıştır, tekrar çalıştırmak güvenlidir.
