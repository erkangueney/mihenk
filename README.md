# Veri Akademi

Oyunlaştırılmış veri analizi ve veri bilimi eğitim platformu. Türkçe ve İngilizce; web ve mobil uyumlu.

- **12 öğrenme patikası** — SQL, Python, Power BI, Tableau, Excel, Microsoft Fabric, İstatistik, Veri Görselleştirme, Makine Öğrenmesi, Veri Mühendisliği, R, Git & GitHub
- **Her patikada 3 seviye** — başlangıç, orta, ileri
- **24 uçtan uca proje** — gerçek veri seti, net teslimatlar, adım adım plan ve GitHub'da yayınlama adımı
- **Tarayıcıda çalışan gerçek kod** — Python (Pyodide, pandas dahil) ve SQL (sql.js / SQLite), kurulum gerekmez
- **Oyunlaştırma** — XP, seviye, günlük seri, 12 rozet, liderlik tablosu, XP ile açılan avatar parçaları
- **Alet çantası** — patikalardan bağımsız başvuru katmanı:
  - **Referans sözlüğü** — 100+ girdi (SQL, pandas, Excel formülleri, DAX, Tableau, Git), çoğunda çalıştırılabilir örnek
  - **Nasıl yapılır?** — nokta atışı senaryolara kısa cevaplar, adım adım anlatım ve SSS
  - **Kopya kâğıtları** — tek sayfalık, yazdırılabilir özetler
  - **Deneme alanı** — serbest Python/SQL editörü, hazır veri setleriyle

## Hızlı başlangıç

```bash
npm install
npm run dev      # http://localhost:3000
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu (webpack) |
| `npm run build` | Üretim derlemesi — tüm sayfalar statik üretilir |
| `npm start` | Derlenmiş sürümü çalıştırır |
| `npm run typecheck` | TypeScript kontrolü |
| `npm run lint` | ESLint (uyarı toleransı yok) |
| `npm run check` | Üçünü sırayla çalıştırır — yayın öncesi bunu koştur |

> **Not:** `dev` betiği bilerek `--webpack` kullanıyor. Proje yolu Türkçe karakter
> (`Masaüstü`) içerdiği için Turbopack geliştirme modunda çöküyor. Üretim derlemesi
> (`npm run build`) Turbopack ile sorunsuz çalışıyor. Projeyi ASCII bir yola taşırsan
> `npm run dev:turbo` ile Turbopack'e dönebilirsin.

## Mimari

```
src/
├── proxy.ts                          # Next 16'da middleware'in adı bu
├── app/
│   ├── layout.tsx                    # kök: fontlar, tema betiği, sağlayıcılar
│   ├── page.tsx                      # / → /tr yönlendirmesi
│   ├── admin/                        # yönetim paneli (yalnızca yöneticiler)
│   │   ├── uyeler/                   # üye listesi ve detayı
│   │   ├── icerik/                   # patika/proje editörü
│   │   └── kayitlar/                 # yönetim işlem dökümü
│   └── [locale]/                     # tr | en
│       ├── page.tsx                  # ana sayfa
│       ├── learn/                    # patikalar → seviyeler → dersler
│       ├── projects/                 # uçtan uca projeler
│       ├── reference/                # referans sözlüğü: grup → girdi
│       ├── how-to/                   # nokta atışı rehberler
│       ├── cheatsheets/              # yazdırılabilir kopya kâğıtları
│       ├── playground/               # serbest Python/SQL editörü
│       ├── avatar/                   # avatar stüdyosu
│       ├── profile/                  # XP, rozet, seri, yedekleme
│       ├── leaderboard/
│       ├── roadmap/                  # önerilen öğrenme sırası
│       ├── giris/ kayit/             # üyelik
│       └── sifremi-unuttum/ sifre-yenile/
├── content/                          # TÜM EĞİTİM İÇERİĞİ BURADA
│   ├── helpers.ts                    # içerik yazım yardımcıları
│   ├── tracks/*.ts                   # patika başına bir dosya
│   ├── projects.ts                   # uçtan uca projeler
│   ├── reference/*.ts                # referans sözlüğü, araç başına bir dosya
│   ├── how-to/*.ts                   # nasıl-yapılır rehberleri
│   ├── cheatsheets.ts                # kopya kâğıtları
│   ├── roadmap.ts                    # yol haritası
│   └── index.ts                      # patika sırası
├── lib/
│   ├── types.ts                      # içerik ve ilerleme tipleri
│   ├── i18n.ts                       # arayüz sözlüğü (TR/EN)
│   ├── content.ts                    # içerik sorgulama + ilerleme hesapları
│   ├── reference.ts                  # referans arama ve sorgulama
│   ├── how-to.ts                     # rehber sorgulama ve arama
│   ├── gamification.ts               # XP eğrisi, seri, rozetler, liderlik
│   ├── avatar.ts                     # avatar kataloğu, kilit ve XP harcama kuralları
│   ├── highlight.ts                  # bağımlılıksız sözdizimi vurgulama
│   ├── storage/                      # ilerleme deposu (adaptör deseni)
│   ├── supabase/                     # dört istemci: tarayıcı, sunucu, anon, admin
│   ├── auth/                         # oturum doğrulama (DAL) ve form action'ları
│   ├── admin/                        # panel sorguları ve yönetim işlemleri
│   ├── content-docs/                 # veritabanı içeriği: doğrulama + birleştirme
│   └── engines/                      # Pyodide + sql.js worker'ları
├── components/                       # arayüz
supabase/migrations/                  # veritabanı şeması ve RLS politikaları
```

### İki karar, gerisi buradan çıkıyor

**1. İçerik veri, kod değil.** Her ders `src/content/tracks/*.ts` içinde düz bir nesne.
Yeni ders eklemek için hiçbir bileşene dokunmazsın — dosyaya bir `lesson({...})` eklersin;
sayfa, ilerleme, XP ve rozetler kendiliğinden çalışır.

**2. İlerleme bir adaptörün arkasında.** `src/lib/storage/index.ts` tek satırlık bir seçim:
Supabase anahtarları tanımlıysa bulut, değilse `localStorage`. Uygulamanın geri kalanı
farkı görmez. Ayrıntı: [`docs/backend.md`](docs/backend.md).

## Yeni ders ekleme

```ts
// src/content/tracks/sql.ts → ilgili seviyenin lessons dizisine
lesson({
  slug: "yeni-ders",
  title: L("Türkçe başlık", "English title"),
  summary: L("Türkçe özet.", "English summary."),
  minutes: 12,
  blocks: [
    text("Türkçe anlatım…", "English explanation…"),
    code("sql", `SELECT 1;`),
    tip("Başlık", "Title", "Türkçe gövde", "English body"),
    quiz({
      id: "q1",
      q: ["Soru?", "Question?"],
      options: [["A", "A"], ["B", "B"]],
      answer: 0,
      explain: ["Açıklama.", "Explanation."],
    }),
    sqlTask({
      id: "t1",
      dataset: "shop",
      prompt: ["Görev metni.", "Task text."],
      starter: `SELECT`,
      solution: `SELECT name FROM customers;`,
    }),
  ],
})
```

Blok türleri: `text`, `heading`, `code`, `tip` / `info` / `pitfall`, `quiz`, `order`,
`pyTask` (gerçek Python), `sqlTask` (gerçek SQLite), `trySql` / `tryPy` (kendin dene —
doğrulaması ve XP'si olmayan serbest editör).

## Referans, rehber ve kopya kâğıdı eklemek

Üçü de ders içeriğiyle aynı mantıkta: düz veri, TR/EN zorunlu.

```ts
// src/content/reference/sql.ts → ilgili bölümün entries dizisine
entry({
  slug: "yeni-komut",
  name: "KOMUT",
  summary: ["Türkçe özet.", "English summary."],
  syntax: "KOMUT ...;",
  example: { code: `KOMUT tablo;` },
  try: { engine: "sql", dataset: "shop", code: `SELECT 1;` },  // kendin dene
  related: ["sql/select"],
  keywords: ["arama", "için", "ek", "kelimeler"],
})
```

`related` ve arama `grup/slug` anahtarıyla çalışır. Rehberler için
`src/content/how-to/*.ts` içindeki `howTo({...})`, kopya kâğıtları için
`src/content/cheatsheets.ts` aynı desende yazılır.

## Avatar parçası eklemek

Çizim tek bir SVG bileşenidir (`src/components/avatar/avatar.tsx`); katalog ise
`src/lib/avatar.ts` içindeki düz bir dizidir. Mevcut bir `look` biçimini kullanan
yeni bir parça eklemek için bileşene dokunmazsın:

```ts
{
  id: "acc-yeni",
  slot: "accessory",
  name: L("Yeni", "New"),
  description: L("Ne olduğu.", "What it is."),
  rarity: "rare",
  cost: 500,        // 0 = ücretsiz
  level: 6,         // isteğe bağlı seviye kilidi
  badge: "scholar", // isteğe bağlı rozet kilidi
  look: { gear: "glasses", accent: "#22d3ee" },
}
```

**Harcama seviyeyi düşürmez.** Seviye ham `xp`'den, harcanabilir bakiye
`xp - avatar.spent`'ten hesaplanır.

**Her metin iki dilde yazılır.** Tip sistemi bunu zorunlu tutar — TR yazıp EN unutursan
`npm run typecheck` hata verir.

## Kod motorları nasıl çalışıyor?

Alıştırmalar, Blob URL'inden oluşturulan bir Web Worker içinde koşuyor
(`src/lib/engines/`). Motorlar **tembel** yükleniyor: kullanıcı editöre dokunana kadar
tek bayt inmiyor.

- **Python** — Pyodide 0.26.4 (CDN). `loadPackagesFromImports` sayesinde `import pandas`
  yazan bir alıştırmada pandas otomatik iniyor. Doğrulama, kullanıcı kodunun ad alanında
  kontrol ifadelerinin `eval` edilmesiyle yapılıyor.
- **SQL** — sql.js 1.11 (CDN), her çalıştırmada sıfırdan kurulan bir SQLite veritabanı.
  Doğrulama, referans çözümün sonucuyla karşılaştırma: **yazım değil sonuç** kontrol edilir,
  bu yüzden `IN (...)` ile `OR` aynı şekilde kabul edilir. Referans sorguda `ORDER BY` varsa
  satır sırası da kontrol edilir, yoksa edilmez.

Sonsuz döngüye giren kullanıcı kodu 45 saniyede durdurulup worker yeniden başlatılıyor.

### İçerik doğrulama

`scripts/` altındaki doğrulayıcılar, her alıştırmanın çözümünün gerçekten çalıştığını ve
başlangıç kodunun kontrolleri **geçmediğini** kanıtlar (geçiyorsa alıştırma boş demektir):

```bash
node scripts/verify-sql.mjs      # sqlite3 CLI gerekir
node scripts/verify-python.mjs   # python3 + pandas + numpy gerekir
```

## Üyelik ve yönetim paneli

Supabase anahtarları tanımlıysa üyelik, cihazlar arası senkron ilerleme, gerçek liderlik
tablosu ve `/admin` yönetim paneli açılır. Tanımlı değilse site tam olarak eskisi gibi
çalışır — ilerleme tarayıcıda kalır, üyelik ve panel kapalıdır.

Panelde neler var:

- **Üyeler** — arama, filtre, sayfalama; üye oluştur/sil, şifre belirle veya sıfırlama
  e-postası gönder, rol ata, askıya al, liderlik tablosundan gizle
- **Üye detayı** — XP, seri, rozetler, patika bazlı ilerleme; ilerlemeyi sıfırlama
- **İçerik** — patika ve projeleri panelden düzenle; doğrulamalı JSON editörü,
  taslak/yayın ayrımı, dosyadaki sürüme geri dönme
- **Kayıtlar** — panelden yapılan yönetim işlemlerinin dökümü

## Canlıya alma (ücretsiz)

Supabase (veritabanı + üyelik) ve Vercel (barındırma) ücretsiz katmanlarıyla, adım adım:
**[`docs/kurulum.md`](docs/kurulum.md)**

Bulut hesabı açmadan denemek istersen `npm run db:start` yerel bir Postgres + Auth
yığını kaldırır (Docker gerekir) — canlıdakiyle aynı şema, aynı davranış.

Özetle: `supabase/migrations/` altındaki dosyaları numara sırasıyla Supabase SQL
Editor'de çalıştır, üç anahtarı `.env.local`'e (ve Vercel'e) gir, `npm run create-admin`
ile ilk yöneticiyi aç.

Üyelik istemiyorsan hiçbir ortam değişkeni gerekmez; depoyu Vercel'e bağlaman yeter.

Yayına almadan önce `src/app/layout.tsx` içindeki `metadataBase` değerini kendi alan
adınla güncelle — Open Graph bağlantıları buna göre üretiliyor.

## Yol haritası (bu proje için)

- [x] Supabase ile giriş ve cihazlar arası senkron ilerleme
- [x] Gerçek liderlik tablosu
- [x] Yönetim paneli: üye, ilerleme ve içerik yönetimi
- [x] Referans sözlüğü, nasıl-yapılır kütüphanesi ve kopya kâğıtları
- [x] Ders içinde ve referansta "kendin dene" editörleri, serbest deneme alanı
- [x] XP ile açılan avatar sistemi
- [ ] Ders içi arama
- [ ] Daha fazla `sqlTask` / `pyTask` — Excel ve BI patikalarında şu an quiz ağırlıkta
- [ ] PWA: çevrimdışı ders okuma

## Lisans

Kişisel kullanım. İçerik ve kod telifi sana ait.
