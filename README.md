# Veri Akademi

Oyunlaştırılmış veri analizi ve veri bilimi eğitim platformu. Türkçe ve İngilizce; web ve mobil uyumlu.

- **12 öğrenme patikası** — SQL, Python, Power BI, Tableau, Excel, Microsoft Fabric, İstatistik, Veri Görselleştirme, Makine Öğrenmesi, Veri Mühendisliği, R, Git & GitHub
- **Her patikada 3 seviye** — başlangıç, orta, ileri
- **24 uçtan uca proje** — gerçek veri seti, net teslimatlar, adım adım plan ve GitHub'da yayınlama adımı
- **Tarayıcıda çalışan gerçek kod** — Python (Pyodide, pandas dahil) ve SQL (sql.js / SQLite), kurulum gerekmez
- **Oyunlaştırma** — XP, seviye, günlük seri, 12 rozet, liderlik tablosu

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
├── app/
│   ├── layout.tsx                    # kök: fontlar, tema betiği, sağlayıcılar
│   ├── page.tsx                      # / → /tr yönlendirmesi
│   └── [locale]/                     # tr | en
│       ├── page.tsx                  # ana sayfa
│       ├── learn/                    # patikalar → seviyeler → dersler
│       ├── projects/                 # uçtan uca projeler
│       ├── profile/                  # XP, rozet, seri, yedekleme
│       ├── leaderboard/
│       └── roadmap/                  # önerilen öğrenme sırası
├── content/                          # TÜM EĞİTİM İÇERİĞİ BURADA
│   ├── helpers.ts                    # içerik yazım yardımcıları
│   ├── tracks/*.ts                   # patika başına bir dosya
│   ├── projects.ts                   # uçtan uca projeler
│   ├── roadmap.ts                    # yol haritası
│   └── index.ts                      # patika sırası
├── lib/
│   ├── types.ts                      # içerik ve ilerleme tipleri
│   ├── i18n.ts                       # arayüz sözlüğü (TR/EN)
│   ├── content.ts                    # içerik sorgulama + ilerleme hesapları
│   ├── gamification.ts               # XP eğrisi, seri, rozetler, liderlik
│   ├── highlight.ts                  # bağımlılıksız sözdizimi vurgulama
│   ├── storage/                      # ilerleme deposu (adaptör deseni)
│   └── engines/                      # Pyodide + sql.js worker'ları
└── components/                       # arayüz
```

### İki karar, gerisi buradan çıkıyor

**1. İçerik veri, kod değil.** Her ders `src/content/tracks/*.ts` içinde düz bir nesne.
Yeni ders eklemek için hiçbir bileşene dokunmazsın — dosyaya bir `lesson({...})` eklersin;
sayfa, ilerleme, XP ve rozetler kendiliğinden çalışır.

**2. İlerleme bir adaptörün arkasında.** `src/lib/storage/index.ts` tek satırlık bir seçim.
Bugün `localStorage`, yarın Supabase — uygulamanın geri kalanı farkı görmez.
Geçiş için hazır kod: [`docs/supabase-adapter.md`](docs/supabase-adapter.md).

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
`pyTask` (gerçek Python), `sqlTask` (gerçek SQLite).

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

## Canlıya alma (Vercel)

```bash
npm i -g vercel
vercel            # ilk kurulum
vercel --prod     # yayın
```

Ya da GitHub deposunu Vercel'e bağla — her `main` push'unda otomatik yayınlanır.
Ortam değişkeni gerekmiyor; ilerleme tarayıcıda saklanıyor.

Yayına almadan önce `src/app/layout.tsx` içindeki `metadataBase` değerini kendi alan
adınla güncelle — Open Graph bağlantıları buna göre üretiliyor.

## Yol haritası (bu proje için)

- [ ] Supabase ile giriş ve cihazlar arası senkron ilerleme ([`docs/supabase-adapter.md`](docs/supabase-adapter.md))
- [ ] Gerçek liderlik tablosu (şu an yerel, sabit rakiplerle)
- [ ] Ders içi arama
- [ ] Daha fazla `sqlTask` / `pyTask` — Excel ve BI patikalarında şu an quiz ağırlıkta
- [ ] PWA: çevrimdışı ders okuma

## Lisans

Kişisel kullanım. İçerik ve kod telifi sana ait.
