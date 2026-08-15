import type { LevelId, Project, ProjectStep } from "@/lib/types";
import { L } from "./helpers";

/** Proje yazımını kısaltan kurucu. */
function project(config: {
  slug: string;
  track: string;
  level: LevelId;
  title: [string, string];
  stack: string[];
  hours: number;
  xp: number;
  summary: [string, string];
  dataset: [string, string];
  deliverables: [string, string][];
  steps: { title: [string, string]; body: [string, string]; code?: string; lang?: string }[];
  /** true ise premium (bkz. src/lib/entitlements.ts) — mevcut projelerde kullanılmaz. */
  premium?: boolean;
}): Project {
  return {
    slug: config.slug,
    trackSlug: config.track,
    level: config.level,
    title: L(...config.title),
    stack: config.stack,
    hours: config.hours,
    xp: config.xp,
    summary: L(...config.summary),
    dataset: L(...config.dataset),
    deliverables: config.deliverables.map(([tr, en]) => L(tr, en)),
    steps: config.steps.map(
      (step): ProjectStep => ({
        title: L(...step.title),
        body: L(...step.body),
        code: step.code?.trim(),
        lang: step.lang,
      }),
    ),
    premium: config.premium === true,
  };
}

/** Her projenin son adımı aynıdır: çalışmayı GitHub'da yayınlamak. */
const githubStep = (repo: string) => ({
  title: ["GitHub'da yayınla", "Publish on GitHub"] as [string, string],
  body: [
    `Projeyi bir depoya çevir ve portföyüne ekle. README'nin en üstünde tek cümlelik özet, hemen altında sonuç görseli olsun; teknik detay aşağı insin. Depo adı önerisi: \`${repo}\`.\n\nVeri dosyalarını \`.gitignore\` ile hariç tut, bunun yerine küçük bir örnek veri (\`data/sample.csv\`) commit'le — böylece başkası projeyi çalıştırabilir.`,
    `Turn this into a repository and add it to your portfolio. Put a one-sentence summary at the very top of the README and the result image right below it; technical detail goes further down. Suggested repo name: \`${repo}\`.\n\nExclude data files with \`.gitignore\` and commit a small sample instead (\`data/sample.csv\`) so someone else can actually run it.`,
  ] as [string, string],
  lang: "javascript",
  code: `git init
printf "data/raw/\\n*.xlsx\\n.env\\n__pycache__/\\n.ipynb_checkpoints/\\n" > .gitignore
git add .
git commit -m "${repo}: ilk sürüm"
git branch -M main
git remote add origin https://github.com/<kullanici>/${repo}.git
git push -u origin main`,
});

export const projects: Project[] = [
  /* ---------------------------- SQL ---------------------------- */
  project({
    slug: "sql-satis-raporu",
    track: "sql",
    level: "junior",
    title: ["E-ticaret Satış Raporu", "E-commerce Sales Report"],
    stack: ["SQL", "SQLite", "Excel"],
    hours: 4,
    xp: 150,
    summary: [
      "Bir e-ticaret veritabanından yönetimin her hafta soracağı beş soruyu cevaplayan bir sorgu seti hazırla ve sonuçları tek sayfalık bir rapora dönüştür.",
      "Build a query set that answers the five questions leadership asks every week from an e-commerce database, and turn the results into a one-page report.",
    ],
    dataset: [
      "Platformdaki `shop` veritabanı (products, customers, orders, order_items, categories) ya da Kaggle'daki \"Brazilian E-Commerce (Olist)\" veri seti.",
      "The platform's `shop` database (products, customers, orders, order_items, categories) or the \"Brazilian E-Commerce (Olist)\" dataset on Kaggle.",
    ],
    deliverables: [
      ["Yorumlanmış, çalışan 5 SQL sorgusu (`sorgular.sql`)", "5 working, commented SQL queries (`queries.sql`)"],
      ["Aylık ciro tablosu ve trend grafiği", "A monthly revenue table and trend chart"],
      ["En çok satan 10 ürün listesi", "A top-10 best-selling products list"],
      ["Bulguları özetleyen 5 maddelik yorum", "A 5-bullet summary of the findings"],
    ],
    steps: [
      {
        title: ["Veriyi tanı", "Get to know the data"],
        body: [
          "Her tabloyu `SELECT * ... LIMIT 10` ile aç. Satır sayılarını, tarih aralığını ve `status` gibi kategorik alanların hangi değerleri aldığını not et. Bu adımı atlarsan sonraki her sorguda tahmin yürütürsün.",
          "Open each table with `SELECT * ... LIMIT 10`. Note row counts, the date range and which values categorical fields like `status` actually take. Skip this and you will be guessing in every query that follows.",
        ],
        lang: "sql",
        code: `SELECT COUNT(*) FROM orders;
SELECT MIN(order_date), MAX(order_date) FROM orders;
SELECT status, COUNT(*) FROM orders GROUP BY status;`,
      },
      {
        title: ["Beş iş sorusunu yaz", "Write the five business questions"],
        body: [
          "Sorgu yazmadan önce soruları cümle olarak yaz: (1) Aylık ciro nasıl gidiyor? (2) En çok satan ürünler? (3) Hangi kategori en kârlı? (4) Şehir bazında müşteri dağılımı? (5) İptal/iade oranı nedir? Sorular netleşmeden yazılan SQL, cevabı olmayan bir sorgu olur.",
          "Write the questions as sentences before you write SQL: (1) How is monthly revenue trending? (2) What are the best sellers? (3) Which category is most profitable? (4) How are customers distributed by city? (5) What is the cancellation/return rate? SQL written before the question is a query without an answer.",
        ],
      },
      {
        title: ["Sorguları yaz ve doğrula", "Write and verify the queries"],
        body: [
          "Her sorguyu yazdıktan sonra sonucu **elle bir örnek üzerinden doğrula**. Örneğin bir siparişin toplamını tek tek çarpıp sorgunun verdiği sayıyla karşılaştır. Bu alışkanlık, sessiz JOIN hatalarını yakalamanın en ucuz yoludur.",
          "After each query, **verify one example by hand**. Multiply out one order's lines and compare with what the query returns. This habit is the cheapest way to catch silent JOIN errors.",
        ],
        lang: "sql",
        code: `SELECT strftime('%Y-%m', o.order_date) AS ay,
       SUM(oi.quantity * oi.unit_price) AS ciro,
       COUNT(DISTINCT o.id) AS siparis
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.status = 'teslim'
GROUP BY ay
ORDER BY ay;`,
      },
      {
        title: ["Raporu yaz", "Write the report"],
        body: [
          "Sonuçları Excel veya Google Sheets'e aktar, iki grafik çiz (aylık trend + ilk 10 ürün) ve her grafiğin altına **tek cümlelik bulgu** yaz. Rapor tek sayfayı geçmesin.",
          "Export the results to Excel or Google Sheets, draw two charts (monthly trend + top 10 products) and write a **one-sentence finding** under each. Keep the report to one page.",
        ],
      },
      githubStep("eticaret-satis-raporu"),
    ],
  }),

  project({
    slug: "sql-musteri-segmentasyonu",
    track: "sql",
    level: "mid",
    title: ["RFM ile Müşteri Segmentasyonu", "Customer Segmentation with RFM"],
    stack: ["SQL", "CTE", "Window Functions"],
    hours: 6,
    xp: 250,
    summary: [
      "Müşterileri son alışveriş tarihi (Recency), sıklık (Frequency) ve harcama (Monetary) boyutlarında puanlayıp pazarlama ekibinin doğrudan kullanabileceği segmentlere ayır.",
      "Score customers on Recency, Frequency and Monetary value, then split them into segments the marketing team can act on directly.",
    ],
    dataset: [
      "Platformdaki `shop` veritabanı veya UCI \"Online Retail\" veri seti.",
      "The platform's `shop` database or the UCI \"Online Retail\" dataset.",
    ],
    deliverables: [
      ["Müşteri başına R, F, M puanı üreten CTE tabanlı sorgu", "A CTE-based query producing R, F, M scores per customer"],
      ["Segment tanımları ve her segmentin müşteri sayısı", "Segment definitions and customer counts per segment"],
      ["Segment başına ortalama ciro tablosu", "Average revenue per segment"],
      ["Her segment için bir pazarlama aksiyonu önerisi", "One marketing action recommended per segment"],
    ],
    steps: [
      {
        title: ["RFM ham değerlerini hesapla", "Compute the raw RFM values"],
        body: [
          "Her müşteri için son sipariş tarihinden bugüne geçen gün (R), toplam sipariş sayısı (F) ve toplam harcama (M) değerlerini bir CTE'de üret.",
          "In a CTE, compute days since the last order (R), total order count (F) and total spend (M) for each customer.",
        ],
        lang: "sql",
        code: `WITH rfm_ham AS (
  SELECT
    c.id,
    c.name,
    julianday('2024-09-01') - julianday(MAX(o.order_date)) AS recency,
    COUNT(DISTINCT o.id)                                   AS frequency,
    SUM(oi.quantity * oi.unit_price)                       AS monetary
  FROM customers c
  JOIN orders      o  ON o.customer_id = c.id AND o.status = 'teslim'
  JOIN order_items oi ON oi.order_id = o.id
  GROUP BY c.id, c.name
)
SELECT * FROM rfm_ham;`,
      },
      {
        title: ["Puanlara çevir", "Turn them into scores"],
        body: [
          "`NTILE(4)` pencere fonksiyonuyla her boyutu 1–4 arası çeyreklere böl. Dikkat: recency'de **küçük iyidir**, bu yüzden onun sıralamasını ters çevirmen gerekir.",
          "Use the `NTILE(4)` window function to bucket each dimension into quartiles 1–4. Careful: for recency **lower is better**, so its ordering must be reversed.",
        ],
        lang: "sql",
        code: `SELECT *,
  NTILE(4) OVER (ORDER BY recency DESC)  AS r_puan,
  NTILE(4) OVER (ORDER BY frequency ASC) AS f_puan,
  NTILE(4) OVER (ORDER BY monetary ASC)  AS m_puan
FROM rfm_ham;`,
      },
      {
        title: ["Segmentleri adlandır", "Name the segments"],
        body: [
          "`CASE WHEN` ile puan kombinasyonlarını iş diline çevir: Şampiyonlar (444), Sadık müşteriler, Risk altındakiler, Uyuyanlar, Kaybedilenler. Segment adları pazarlamacının anlayacağı dilde olmalı — `r4f4m4` bir segment adı değildir.",
          "Translate score combinations into business language with `CASE WHEN`: Champions (444), Loyal, At Risk, Hibernating, Lost. Segment names must speak marketing's language — `r4f4m4` is not a segment name.",
        ],
      },
      {
        title: ["Aksiyon önerisi yaz", "Write the recommended actions"],
        body: [
          "Her segment için tek cümlelik bir aksiyon yaz: \"Risk altındakilere 15 gün içinde %15 indirim kuponu\", \"Şampiyonlara erken erişim daveti\". Analizi karara bağlamayan bir segmentasyon, sadece bir tablodur.",
          "Write one action per segment: \"Send At Risk a 15% coupon within 15 days\", \"Give Champions early access\". A segmentation that does not end in a decision is just a table.",
        ],
      },
      githubStep("rfm-musteri-segmentasyonu"),
    ],
  }),

  project({
    slug: "sql-kohort-analizi",
    track: "sql",
    level: "senior",
    title: ["Kohort ve Elde Tutma Analizi", "Cohort and Retention Analysis"],
    stack: ["SQL", "Window Functions", "Power BI / Tableau"],
    hours: 8,
    xp: 400,
    summary: [
      "Kullanıcıları ilk alışveriş ayına göre grupla ve her kohortun sonraki aylarda ne oranda geri döndüğünü gösteren bir elde tutma matrisi üret.",
      "Group users by their first purchase month and build a retention matrix showing what share of each cohort returns in later months.",
    ],
    dataset: [
      "Platformdaki `shop` veritabanı; daha zengin bir sonuç için Olist veya \"Online Retail II\" veri seti.",
      "The platform's `shop` database; for a richer result use Olist or \"Online Retail II\".",
    ],
    deliverables: [
      ["Kohort × ay elde tutma matrisi (mutlak ve yüzde)", "A cohort × month retention matrix (absolute and percentage)"],
      ["Üçgen ısı haritası görseli", "A triangular heatmap visual"],
      ["Kohort başına yaşam boyu değer (LTV) eğrisi", "An LTV curve per cohort"],
      ["Hangi ayın kohortu neden daha iyi/kötü — 1 sayfalık yorum", "A one-page interpretation of why certain cohorts perform better"],
    ],
    steps: [
      {
        title: ["Kohort ayını belirle", "Assign the cohort month"],
        body: [
          "Her müşterinin ilk sipariş ayını `MIN()` ile bul ve bunu o müşterinin kohortu olarak sabitle. Bu değer müşteri hayatı boyunca **değişmez** — kohort analizinin temel varsayımı budur.",
          "Find each customer's first order month with `MIN()` and fix it as their cohort. This value **never changes** for that customer — it is the core assumption of cohort analysis.",
        ],
        lang: "sql",
        code: `WITH kohort AS (
  SELECT customer_id,
         MIN(strftime('%Y-%m', order_date)) AS kohort_ay
  FROM orders WHERE status = 'teslim'
  GROUP BY customer_id
)`,
      },
      {
        title: ["Ay farkını hesapla", "Compute the month offset"],
        body: [
          "Her sipariş için \"kohorttan kaç ay sonra\" değerini üret (0, 1, 2, …). Bu, matrisin sütun eksenidir. Takvim ayı yerine **göreli ay** kullanmak, farklı zamanlarda başlayan kohortları karşılaştırılabilir kılar.",
          "For each order compute \"how many months after the cohort\" (0, 1, 2, …). This is the matrix's column axis. Using a **relative month** rather than a calendar month is what makes cohorts starting at different times comparable.",
        ],
      },
      {
        title: ["Matrisi ve oranları üret", "Build the matrix and rates"],
        body: [
          "Kohort × ay farkı kırılımında `COUNT(DISTINCT customer_id)` say, ardından her satırı kendi 0. ayına bölerek elde tutma yüzdesini çıkar.",
          "Count `COUNT(DISTINCT customer_id)` by cohort × month offset, then divide each row by its own month-0 value to get the retention rate.",
        ],
      },
      {
        title: ["Görselleştir ve yorumla", "Visualise and interpret"],
        body: [
          "Sonucu Power BI veya Tableau'da üçgen ısı haritası olarak çiz. Ardından şu soruyu cevapla: hangi kohort belirgin şekilde iyi/kötü ve o ay ne oldu (kampanya, fiyat değişimi, sezon)? Bir kohort matrisinin değeri, bu sorunun cevabındadır.",
          "Plot the result as a triangular heatmap in Power BI or Tableau. Then answer: which cohort clearly over- or under-performs, and what happened that month (a campaign, a price change, a season)? That answer is where a cohort matrix earns its keep.",
        ],
      },
      githubStep("kohort-elde-tutma-analizi"),
    ],
  }),

  project({
    slug: "sql-performans-denetimi",
    track: "sql",
    level: "expert",
    title: ["SQL Performans Denetimi", "SQL Performance Audit"],
    stack: ["SQL", "SQLite", "EXPLAIN QUERY PLAN", "İndeksleme"],
    hours: 10,
    xp: 600,
    summary: [
      "Yavaş çalışan beş raporu ele al: her birinin sorgu planını oku, darboğazı teşhis et, doğru indeksi ekle ve öncesi/sonrası hızlanmayı ölçüp belgele.",
      "Take five slow-running reports: read each one's query plan, diagnose the bottleneck, add the right index, and measure and document the before/after speed-up.",
    ],
    dataset: [
      "Platformdaki `shop` veritabanı; gerçekçi bir denetim için satır sayısını 100 katına büyütülmüş bir kopyasını kullan (`INSERT INTO ... SELECT` ile kendi üzerine çoğalt).",
      "The platform's `shop` database; for a realistic audit use a copy with row counts multiplied ~100x (replicate it onto itself with `INSERT INTO ... SELECT`).",
    ],
    deliverables: [
      ["5 sorgunun EXPLAIN QUERY PLAN çıktısı, öncesi ve sonrası", "EXPLAIN QUERY PLAN output for all 5 queries, before and after"],
      ["Her sorgu için eklenen indeks ve gerekçesi", "The index added for each query and why"],
      ["Öncesi/sonrası çalışma süresi ölçüm tablosu", "A before/after execution-time measurement table"],
      ["\"Ne zaman indeks eklenmez\" başlıklı 1 sayfalık not (yazma maliyeti trade-off'u)", "A one-page note titled \"when not to add an index\" (the write-cost trade-off)"],
    ],
    steps: [
      {
        title: ["Beş yavaş raporu topla", "Collect five slow reports"],
        body: [
          "Platformun kendi sorgularından (müşteri geçmişi, ürün araması, aylık özet, kohort filtreleme, ürün×kategori raporu) beşini seç. Her biri farklı bir filtre/JOIN deseni kullanmalı — tek bir indeks türüyle hepsini çözemeyeceksin.",
          "Pick five from the platform's own query patterns (customer history, product search, monthly summary, cohort filtering, product×category report). Each should use a different filter/JOIN pattern — one index type won't fix all of them.",
        ],
      },
      {
        title: ["Planı oku, darboğazı bul", "Read the plan, find the bottleneck"],
        body: [
          "Her sorgunun başına `EXPLAIN QUERY PLAN` koy. `SCAN` gördüğün her tabloyu not al — bu, indekssiz filtre veya JOIN adayıdır. Birden fazla `SCAN` varsa, en büyük tablodakini önceliklendir.",
          "Prefix each query with `EXPLAIN QUERY PLAN`. Note every table where you see `SCAN` — that's a candidate for a missing index on a filter or JOIN column. If there are multiple SCANs, prioritize the one on the largest table.",
        ],
        lang: "sql",
        code: `EXPLAIN QUERY PLAN
SELECT c.name, SUM(oi.quantity * oi.unit_price) AS toplam
FROM customers c
JOIN orders o ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
WHERE c.city = 'İstanbul' AND o.status = 'teslim'
GROUP BY c.name;
-- plan: SCAN oi  (order_items — en büyük tablo, hiç indeksi yok)
--       SEARCH o USING INTEGER PRIMARY KEY
--       SEARCH c USING INTEGER PRIMARY KEY
-- En büyük tablo SCAN ediliyor: order_items(order_id) indeks adayı.`,
      },
      {
        title: ["Doğru indeksi ekle", "Add the right index"],
        body: [
          "Her `SCAN`'i tek tek indeksle: filtrede kullanılan sütuna (`WHERE`) veya JOIN'de kullanılan yabancı anahtara. Çok sütunlu filtrelerde (`WHERE city = ? AND status = ?`) sıralı çok sütunlu indeks (`(city, status)`) tek sütunlu iki indeksten genelde daha etkilidir.",
          "Index each `SCAN` one at a time: on the column used in the filter (`WHERE`) or the foreign key used in the JOIN. For multi-column filters (`WHERE city = ? AND status = ?`), an ordered composite index (`(city, status)`) usually beats two separate single-column indexes.",
        ],
      },
      {
        title: ["Ölç, belgele, geri al gerekirse", "Measure, document, revert if needed"],
        body: [
          "Her indeksten sonra planı tekrar oku (`SCAN` → `SEARCH` değişti mi?) ve çalışma süresini kaydet. Bir indeks ölçülebilir bir fark yaratmıyorsa (sorgu zaten hızlıysa ya da tablo küçükse) onu **kaldır** — her indeks yazma maliyeti taşır, ölçülmeyen indeks borçtur.",
          "After each index, re-read the plan (did `SCAN` become `SEARCH`?) and record the execution time. If an index makes no measurable difference (the query was already fast, or the table is small), **drop it** — every index carries a write cost, and an unmeasured index is just debt.",
        ],
      },
      githubStep("sql-performans-denetimi"),
    ],
    premium: true,
  }),

  project({
    slug: "sql-yonetici-panosu-hareketli-ortalama",
    track: "sql",
    level: "expert",
    title: ["Yönetici Panosu: Trend ve Müşteri Dilimleri", "Executive Dashboard: Trend and Customer Tiers"],
    stack: ["SQL", "Window Functions", "Power BI / Tableau"],
    hours: 9,
    xp: 550,
    summary: [
      "Aylık geliri hareketli ortalamayla düzleştir, müşterileri harcamaya göre 4 dilime ayır ve ikisini tek bir yönetici panosunda birleştir.",
      "Smooth monthly revenue with a moving average, split customers into 4 spending tiers, and combine both into a single executive dashboard.",
    ],
    dataset: [
      "Platformdaki `shop` veritabanı; daha zengin bir trend için en az 18 aylık sipariş verisi öner.",
      "The platform's `shop` database; for a richer trend, use at least 18 months of order data.",
    ],
    deliverables: [
      ["Aylık ciro + 3 aylık hareketli ortalama çizgi grafiği", "A monthly revenue + 3-month moving average line chart"],
      ["Müşteri harcama dilimi (NTILE 4) tablosu ve dilim başına toplam ciro payı", "A customer spending-tier (NTILE 4) table and each tier's share of total revenue"],
      ["\"En üst dilim toplam cironun yüzde kaçını oluşturuyor?\" sorusunun cevabı", "The answer to \"what share of total revenue does the top tier produce?\""],
      ["Trend + dilim bulgularını birleştiren 1 sayfalık yönetici özeti", "A one-page executive summary combining the trend and tier findings"],
    ],
    steps: [
      {
        title: ["Aylık ciroyu ve hareketli ortalamayı hesapla", "Compute monthly revenue and the moving average"],
        body: [
          "Aylık ciroyu bir CTE'de topla, ardından `AVG() OVER (ORDER BY ay ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)` ile 3 aylık hareketli ortalamayı ekle. Ham ciro dalgalıyken hareketli ortalama trendi düzleştirir.",
          "Aggregate monthly revenue in a CTE, then add a 3-month moving average with `AVG() OVER (ORDER BY ay ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`. While raw revenue is noisy, the moving average smooths the trend.",
        ],
        lang: "sql",
        code: `WITH aylik AS (
  SELECT strftime('%Y-%m', o.order_date) AS ay,
         SUM(oi.quantity * oi.unit_price) AS ciro
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.status = 'teslim'
  GROUP BY ay
)
SELECT ay, ciro,
       ROUND(AVG(ciro) OVER (
         ORDER BY ay ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ), 0) AS hareketli_ortalama
FROM aylik ORDER BY ay;`,
      },
      {
        title: ["Müşterileri harcama dilimine ayır", "Split customers into spending tiers"],
        body: [
          "Her müşterinin toplam harcamasını hesapla, `NTILE(4) OVER (ORDER BY toplam_harcama DESC)` ile 4 eşit dilime böl. Dilim 1 en yüksek harcayanları temsil eder.",
          "Compute each customer's total spend, split into 4 equal tiers with `NTILE(4) OVER (ORDER BY toplam_harcama DESC)`. Tier 1 represents the top spenders.",
        ],
      },
      {
        title: ["Dilim başına gelir payını çıkar", "Extract each tier's revenue share"],
        body: [
          "Dilimlenmiş sonucu dilime göre `GROUP BY` yapıp topla, ardından her dilimin toplam ciroya oranını hesapla (`dilim_toplami / SUM(dilim_toplami) OVER ()`). Bu sayı genelde şaşırtıcıdır — az sayıda müşteri cironun büyük bir kısmını taşır.",
          "`GROUP BY` the tiered result by tier and sum, then compute each tier's share of total revenue (`tier_total / SUM(tier_total) OVER ()`). This number is usually surprising — a small number of customers carry a large share of revenue.",
        ],
      },
      {
        title: ["Panoya taşı ve yorumla", "Move it to the dashboard and interpret"],
        body: [
          "İki sonucu (trend + dilim) Power BI/Tableau'da yan yana koy. Yönetici özetinde şu ikisini cevapla: ciro trendi hangi yönde ve neden; en üst dilim (dilim 1) kaybedilirse ciro ne kadar düşer?",
          "Place both results (trend + tiers) side by side in Power BI/Tableau. In the executive summary, answer two things: which direction is the revenue trend going and why; and how much revenue would be lost if the top tier (tier 1) churned?",
        ],
      },
      githubStep("yonetici-panosu-trend-dilim"),
    ],
    premium: true,
  }),

  /* --------------------------- Python -------------------------- */
  project({
    slug: "python-veri-temizligi",
    track: "python",
    level: "junior",
    title: ["Kirli Veriyi Temizleme Hattı", "A Cleaning Pipeline for Messy Data"],
    stack: ["Python", "pandas"],
    hours: 5,
    xp: 180,
    summary: [
      "Gerçek dünyadan gelmiş, eksik ve tutarsız bir CSV'yi analiz edilebilir hale getiren, tekrar çalıştırılabilir bir temizlik betiği yaz.",
      "Write a rerunnable cleaning script that turns a messy, inconsistent real-world CSV into something you can actually analyse.",
    ],
    dataset: [
      "Kaggle \"Messy Data for Data Cleaning Practice\" veya kendi indirdiğin bir açık veri (TÜİK, data.gov.tr) — mükemmel olmayan bir veri seç, asıl ders orada.",
      "Kaggle's \"Messy Data for Data Cleaning Practice\", or any open dataset you download — deliberately pick an imperfect one, that is where the lesson is.",
    ],
    deliverables: [
      ["`temizle.py` — baştan sona çalışan tek betik", "`clean.py` — one script that runs end to end"],
      ["Temizlik öncesi/sonrası satır ve eksik değer karşılaştırması", "A before/after comparison of rows and missing values"],
      ["Her temizlik kararının gerekçesini içeren not", "A note documenting the reason for every cleaning decision"],
      ["Temizlenmiş `.csv` çıktısı", "The cleaned `.csv` output"],
    ],
    steps: [
      {
        title: ["Veriyi teşhis et", "Diagnose the data"],
        body: [
          "Temizlemeye başlamadan önce fotoğrafını çek: satır/sütun sayısı, tipler, eksik oranları, tekrar eden satırlar, sayısal sütunların aralığı. Bu çıktıyı sakla — sonunda \"neyi düzelttim\" sorusunun kanıtı olacak.",
          "Photograph the data before touching it: shape, dtypes, missing rates, duplicates, numeric ranges. Keep that output — at the end it is your evidence for \"what did I actually fix\".",
        ],
        lang: "python",
        code: `import pandas as pd

df = pd.read_csv("data/raw/veri.csv")
print(df.shape)
print(df.dtypes)
print(df.isna().mean().round(3).sort_values(ascending=False))
print("tekrar:", df.duplicated().sum())
print(df.describe(include="all").T)`,
      },
      {
        title: ["Tipleri düzelt", "Fix the types"],
        body: [
          "Tarihleri `pd.to_datetime(..., errors='coerce')`, sayıları `pd.to_numeric(..., errors='coerce')` ile çevir. Ardından **yeni oluşan NaN'ları say** — bunlar çevrilemeyen bozuk değerlerdir ve incelemen gerekir.",
          "Convert dates with `pd.to_datetime(..., errors='coerce')` and numbers with `pd.to_numeric(..., errors='coerce')`. Then **count the new NaNs** — those are the unconvertible values and they deserve a look.",
        ],
      },
      {
        title: ["Metinleri normalize et", "Normalise the text"],
        body: [
          "`\" istanbul \"`, `\"İSTANBUL\"` ve `\"Istanbul\"` üç ayrı kategori olarak sayılır. `.str.strip().str.title()` ile normalize et, ardından `value_counts()` ile hâlâ ayrı duran yazımları gözden geçir.",
          "`\" istanbul \"`, `\"ISTANBUL\"` and `\"Istanbul\"` count as three categories. Normalise with `.str.strip().str.title()`, then review what is still split with `value_counts()`.",
        ],
      },
      {
        title: ["Eksik ve aykırı değerlere karar ver", "Decide on missing values and outliers"],
        body: [
          "Her sütun için kararını **yaz**: neden doldurdun, neden sildin, hangi yöntemle. Aykırı değerleri IQR kuralıyla işaretle ama körü körüne silme — önce gerçek mi hata mı olduğuna bak.",
          "**Write down** your decision per column: why you filled, why you dropped, with which method. Flag outliers with the IQR rule but do not delete blindly — first check whether they are real or errors.",
        ],
        lang: "python",
        code: `q1, q3 = df["tutar"].quantile([0.25, 0.75])
iqr = q3 - q1
alt, ust = q1 - 1.5 * iqr, q3 + 1.5 * iqr
df["aykiri_mi"] = ~df["tutar"].between(alt, ust)
print(df["aykiri_mi"].sum(), "aykırı değer işaretlendi")`,
      },
      githubStep("veri-temizligi-hatti"),
    ],
  }),

  project({
    slug: "python-satis-analizi",
    track: "python",
    level: "mid",
    title: ["Uçtan Uca Satış Analizi", "End-to-End Sales Analysis"],
    stack: ["Python", "pandas", "matplotlib", "seaborn"],
    hours: 8,
    xp: 350,
    summary: [
      "Ham satış verisinden başlayıp keşif, segmentasyon ve görselleştirme adımlarından geçerek yönetime sunulabilir bir analiz not defteri üret.",
      "Start from raw sales data and work through exploration, segmentation and visualisation into a notebook you could present to leadership.",
    ],
    dataset: [
      "Kaggle \"Superstore Sales\" veya Olist veri seti — ikisi de ürün, müşteri, tarih ve coğrafya boyutları içerir.",
      "Kaggle's \"Superstore Sales\" or the Olist dataset — both carry product, customer, date and geography dimensions.",
    ],
    deliverables: [
      ["Numaralı, temiz bir Jupyter not defteri", "A numbered, tidy Jupyter notebook"],
      ["En az 6 grafik, her biri başlıkta bulgusuyla", "At least 6 charts, each with its finding in the title"],
      ["Aylık trend, kategori kırılımı ve müşteri segmentasyonu", "Monthly trend, category breakdown and customer segmentation"],
      ["Yönetici özeti: 5 bulgu + 3 öneri", "An executive summary: 5 findings + 3 recommendations"],
    ],
    steps: [
      {
        title: ["Keşifsel analiz (EDA)", "Exploratory data analysis"],
        body: [
          "Dağılımlara, zaman trendine ve kategorik kırılımlara bak. Bu aşamada güzel grafik yapmaya çalışma — hızlı ve çok grafik çiz, hangisinin hikâye taşıdığını sonra seçersin.",
          "Look at distributions, the time trend and categorical breakdowns. Do not polish charts yet — draw many, fast, and pick the ones carrying a story afterwards.",
        ],
      },
      {
        title: ["Metrikleri türet", "Derive the metrics"],
        body: [
          "Ciro, ortalama sepet, sipariş sayısı, müşteri başına ciro, aydan aya büyüme. Her metriği bir kez, adı belli bir fonksiyonda hesapla ki tekrar kullanabilesin.",
          "Revenue, average basket, order count, revenue per customer, month-over-month growth. Compute each once inside a clearly named function so you can reuse it.",
        ],
        lang: "python",
        code: `aylik = (
    df.assign(ay=df["tarih"].dt.to_period("M").dt.to_timestamp())
      .groupby("ay", as_index=False)
      .agg(ciro=("tutar", "sum"), siparis=("siparis_id", "nunique"))
      .assign(
          ortalama_sepet=lambda d: d["ciro"] / d["siparis"],
          buyume=lambda d: d["ciro"].pct_change().mul(100).round(1),
      )
)`,
      },
      {
        title: ["Segmentasyon yap", "Segment the customers"],
        body: [
          "Müşterileri harcama ve sıklık boyutunda kovalara ayır (`pd.qcut`). Her segmentin ciro içindeki payını hesapla — genelde müşterilerin %20'si cironun %60–80'ini getirir ve bu tek bulgu bile projeyi taşır.",
          "Bucket customers by spend and frequency (`pd.qcut`). Compute each segment's share of revenue — typically 20% of customers drive 60–80% of it, and that single finding can carry the whole project.",
        ],
      },
      {
        title: ["Sunuma çevir", "Turn it into a presentation"],
        body: [
          "En iyi 6 grafiği seç, her birinin başlığını bulguyu söyleyen bir cümleye çevir, not defterinin başına yönetici özeti ekle. Not defterini yukarıdan aşağı **hiç hata vermeden** yeniden çalıştırabildiğinden emin ol.",
          "Pick the best 6 charts, rewrite each title as a sentence stating the finding, and add an executive summary at the top of the notebook. Make sure it runs top to bottom **without a single error**.",
        ],
      },
      githubStep("uctan-uca-satis-analizi"),
    ],
  }),

  project({
    slug: "python-kohort-dashboard",
    track: "python",
    level: "senior",
    title: ["Kohort Panosu ve Otomatik Rapor", "Cohort Dashboard and Automated Report"],
    stack: ["Python", "pandas", "plotly", "Streamlit"],
    hours: 12,
    xp: 500,
    summary: [
      "Kohort ve elde tutma hesabını bir modüle çıkar, üzerine etkileşimli bir Streamlit panosu kur ve her çalıştırmada güncellenen bir HTML rapor üret.",
      "Extract cohort and retention logic into a module, build an interactive Streamlit dashboard on top of it, and generate an HTML report that refreshes on every run.",
    ],
    dataset: [
      "\"Online Retail II\" (UCI) veya kendi ürününün olay verisi. En az 12 ay ve müşteri kimliği içermelidir.",
      "\"Online Retail II\" (UCI) or your own product's event data. It needs at least 12 months and a customer identifier.",
    ],
    deliverables: [
      ["`kohort.py` — test edilebilir hesaplama modülü", "`cohort.py` — a testable calculation module"],
      ["Streamlit panosu: tarih ve segment filtreleri", "A Streamlit dashboard with date and segment filters"],
      ["Elde tutma ısı haritası ve LTV eğrisi", "A retention heatmap and LTV curve"],
      ["`pytest` ile en az 3 birim testi", "At least 3 unit tests with `pytest`"],
    ],
    steps: [
      {
        title: ["Hesabı modüle çıkar", "Move the logic into a module"],
        body: [
          "Kohort hesabını not defterinden çıkarıp saf fonksiyonlara çevir: girdi DataFrame, çıktı DataFrame, yan etki yok. Ancak böyle test edebilir ve panoda yeniden kullanabilirsin.",
          "Take the cohort logic out of the notebook and turn it into pure functions: DataFrame in, DataFrame out, no side effects. Only then can you test it and reuse it in the dashboard.",
        ],
        lang: "python",
        code: `def kohort_matrisi(df, musteri="musteri_id", tarih="tarih"):
    """Kohort × ay farkı bazında benzersiz müşteri sayısı döndürür."""
    d = df.copy()
    d[tarih] = pd.to_datetime(d[tarih])
    d["kohort"] = d.groupby(musteri)[tarih].transform("min").dt.to_period("M")
    d["donem"] = d[tarih].dt.to_period("M")
    d["ay_farki"] = (d["donem"] - d["kohort"]).apply(lambda x: x.n)
    return (
        d.groupby(["kohort", "ay_farki"])[musteri]
         .nunique()
         .unstack(fill_value=0)
    )`,
      },
      {
        title: ["Testleri yaz", "Write the tests"],
        body: [
          "Küçük ve elle doğrulanabilir bir örnek DataFrame kur, beklediğin matrisi elle yaz ve `assert` et. Bu testler, altı ay sonra fonksiyonu değiştirdiğinde seni hatadan koruyacak tek şeydir.",
          "Build a small DataFrame you can verify by hand, write the expected matrix yourself and `assert` it. These tests are the only thing protecting you when you change the function six months from now.",
        ],
      },
      {
        title: ["Streamlit panosunu kur", "Build the Streamlit dashboard"],
        body: [
          "Kenar çubuğuna tarih aralığı ve segment filtresi koy; ana alana ısı haritası, elde tutma eğrisi ve KPI kartlarını yerleştir. `@st.cache_data` ile veri okumayı önbelleğe al, yoksa her etkileşimde her şey yeniden hesaplanır.",
          "Put a date range and segment filter in the sidebar; place the heatmap, retention curve and KPI tiles in the main area. Cache data loading with `@st.cache_data`, otherwise every interaction recomputes everything.",
        ],
        lang: "python",
        code: `import streamlit as st

st.set_page_config(page_title="Kohort Panosu", layout="wide")

@st.cache_data
def veri_yukle(yol):
    return pd.read_parquet(yol)

df = veri_yukle("data/processed/satis.parquet")
baslangic, bitis = st.sidebar.date_input("Tarih aralığı", [])
matris = kohort_matrisi(df)
st.plotly_chart(isi_haritasi(matris), use_container_width=True)`,
      },
      githubStep("kohort-panosu"),
    ],
  }),

  project({
    slug: "python-performans-optimizasyonu",
    track: "python",
    level: "expert",
    title: ["Performans Optimizasyonu: 10 Kat Hızlandırma", "Performance Optimization: A 10x Speed-Up"],
    stack: ["Python", "pandas", "transform()", "Profiling"],
    hours: 11,
    xp: 600,
    summary: [
      "Yavaş çalışan (döngü ve apply ağırlıklı) bir analiz betiğini ele al; profille, darboğazı bul, vektörleştir ve öncesi/sonrası hızlanmayı ölçüp belgele.",
      "Take a slow analysis script (heavy on loops and apply); profile it, find the bottleneck, vectorize it, and measure and document the before/after speed-up.",
    ],
    dataset: [
      "En az 200.000 satırlık bir işlem/sipariş veri seti (\"Online Retail II\" veya kendi verin); küçük veride optimizasyon farkı görünmez.",
      "A transaction/order dataset with at least 200,000 rows (\"Online Retail II\" or your own data); the optimization gap won't show on small data.",
    ],
    deliverables: [
      ["Yavaş sürümün profil çıktısı (`%timeit` veya `cProfile`) ve darboğaz teşhisi", "The slow version's profile output (`%timeit` or `cProfile`) and bottleneck diagnosis"],
      ["Vektörleştirilmiş/transform tabanlı hızlı sürüm", "A vectorized/transform-based fast version"],
      ["Öncesi/sonrası çalışma süresi tablosu (en az 3 senaryoda)", "A before/after execution-time table across at least 3 scenarios"],
      ["\"Bu optimizasyon ne zaman gereksizdir?\" başlıklı 1 sayfalık not", "A one-page note titled \"when is this optimization not worth it?\""],
    ],
    steps: [
      {
        title: ["Yavaş sürümü yaz ve profille", "Write the slow version and profile it"],
        body: [
          "Önce \"doğal\" ama yavaş bir sürüm yaz: `for` döngüsüyle satır satır gezip her satır için bir hesap yap, ya da `df.apply(fonksiyon, axis=1)` kullan. `%timeit` (Jupyter) veya `time.perf_counter()` ile süresini ölç — bu senin karşılaştırma temelin.",
          "First write a \"natural\" but slow version: loop row by row with `for` and compute per row, or use `df.apply(function, axis=1)`. Time it with `%timeit` (Jupyter) or `time.perf_counter()` — this is your baseline for comparison.",
        ],
        lang: "python",
        code: `import time

start = time.perf_counter()
sonuclar = []
for _, satir in df.iterrows():
    sonuclar.append(satir["tutar"] * (1 + kdv_oranlari[satir["kategori"]]))
df["kdv_dahil"] = sonuclar
print(f"iterrows: {time.perf_counter() - start:.2f} sn")`,
      },
      {
        title: ["Vektörleştir", "Vectorize"],
        body: [
          "`iterrows()`/`apply(axis=1)` yerine, pandas'ın sütun bazlı işlemlerini kullan: `.map()`, boolean indeksleme, aritmetik operatörler doğrudan sütunlar üzerinde. Grup-bağıl hesaplarda (ör. \"her satırın kendi kategorisine göre payı\") `groupby(...).transform(...)` kullan — bir önceki derste gördüğün teknik.",
          "Replace `iterrows()`/`apply(axis=1)` with pandas' column-wise operations: `.map()`, boolean indexing, arithmetic operators applied directly to columns. For group-relative calculations (e.g. \"each row's share within its own category\"), use `groupby(...).transform(...)` — the technique from the previous lesson.",
        ],
      },
      {
        title: ["Öncesi/sonrasını 3 farklı veri boyutunda ölç", "Measure before/after at 3 different data sizes"],
        body: [
          "Aynı iki sürümü 10 bin, 100 bin ve 1 milyon satırlık örneklerde çalıştır ve süreleri bir tabloya yaz. Fark küçük veride görünmeyebilir ama veri büyüdükçe genelde katlanarak açılır — bu, \"neden önce ölçüyoruz\" sorusunun cevabıdır.",
          "Run both versions on samples of 10K, 100K and 1M rows and record the timings in a table. The gap might not show at small sizes but usually widens exponentially as data grows — this is the answer to \"why measure before optimizing\".",
        ],
      },
      {
        title: ["Ne zaman gereksiz olduğunu yaz", "Write down when it isn't worth it"],
        body: [
          "Vektörleştirme her zaman gerekli değildir: küçük veride (birkaç bin satır) veya yalnızca bir kez çalışacak bir betikte, okunabilir ama \"yavaş\" kod genelde tercih edilir. Notunda şunu cevapla: bu projede vektörleştirme ne kadar geliştirici zamanına mal oldu, karşılığında ne kazandırdı?",
          "Vectorizing isn't always necessary: on small data (a few thousand rows) or a script that runs only once, readable-but-\"slow\" code is often the right call. In your note, answer: how much developer time did vectorizing cost in this project, and what did it buy you?",
        ],
      },
      githubStep("performans-optimizasyonu"),
    ],
    premium: true,
  }),

  project({
    slug: "python-otomatik-rapor-betigi",
    track: "python",
    level: "expert",
    title: ["Otomatik Rapor Betiği: Loglama ve Yeniden Deneme", "Automated Report Script: Logging and Retry"],
    stack: ["Python", "logging", "argparse", "Zamanlanmış Görev"],
    hours: 9,
    xp: 550,
    summary: [
      "Bir Jupyter defterindeki analizi, her gün otomatik ve güvenilir şekilde çalışacak, loglayan ve geçici hatalarda kendini toparlayan bir komut satırı betiğine çevir.",
      "Turn a Jupyter-notebook analysis into a command-line script that runs automatically and reliably every day, logs what it does, and recovers from transient failures.",
    ],
    dataset: [
      "Herhangi bir tekrar eden rapor senaryosu (günlük satış özeti, haftalık KPI); gerçekçi bir kaynak dosya veya API yeterli.",
      "Any recurring report scenario (daily sales summary, weekly KPIs); a realistic source file or API is enough.",
    ],
    deliverables: [
      ["`argparse` ile parametreli çalışan bir CLI betiği (`--tarih`, `--cikti` gibi)", "A parameterized CLI script using `argparse` (e.g. `--tarih`, `--cikti`)"],
      ["`logging` ile zaman damgalı, seviyeli çalışma kaydı", "A timestamped, leveled run log using `logging`"],
      ["Geçici hatalar için yeniden deneme (retry) mantığı", "Retry logic for transient failures"],
      ["Betiği günlük çalıştıran bir zamanlama tanımı (cron ifadesi veya GitHub Actions workflow'u) ve neden o yöntemin seçildiğine dair kısa not", "A schedule definition that runs the script daily (a cron expression or a GitHub Actions workflow) with a short note on why that method was chosen"],
    ],
    steps: [
      {
        title: ["Analizi bir fonksiyona çıkar", "Extract the analysis into a function"],
        body: [
          "Jupyter hücrelerindeki kodu, açık girdi/çıktısı olan bir `calistir(tarih, cikti_yolu)` fonksiyonuna topla. Bu adım, betiği hem elle hem otomatik çalıştırılabilir hale getirir — Jupyter'e özgü hiçbir şey (görüntüleme, `%magic` komutları) fonksiyonun içinde kalmamalı.",
          "Gather the notebook-cell code into a `run(date, output_path)` function with clear inputs/outputs. This step makes the script runnable both manually and automatically — nothing Jupyter-specific (display calls, `%magic` commands) should remain inside the function.",
        ],
      },
      {
        title: ["CLI ve loglama ekle", "Add CLI and logging"],
        body: [
          "`argparse` ile tarihi/dosya yolunu dışarıdan parametre olarak al; kodun içine gömme. `logging.basicConfig` ile INFO seviyesinde, zaman damgalı bir log kur ve her önemli adımda (\"veri çekildi\", \"N satır işlendi\", \"rapor yazıldı\") bir log satırı bırak.",
          "Take the date/file path as an external parameter with `argparse` instead of hard-coding it. Set up INFO-level, timestamped logging with `logging.basicConfig` and leave a log line at every meaningful step (\"data fetched\", \"N rows processed\", \"report written\").",
        ],
        lang: "python",
        code: `import argparse, logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

parser = argparse.ArgumentParser()
parser.add_argument("--tarih", required=True)
parser.add_argument("--cikti", default="rapor.csv")
args = parser.parse_args()

logger.info("Rapor başlıyor: %s", args.tarih)`,
      },
      {
        title: ["Kaynağa erişimi yeniden denemeli yap", "Make the source access retry-capable"],
        body: [
          "Veri kaynağı bir API veya ağ paylaşımıysa, geçici hatalarda (`ConnectionError`, zaman aşımı) birkaç kez yeniden deneyen bir sarmalayıcı yaz — bir önceki derste kurduğun `retry()` deseni. Son denemede de başarısız olursa hatayı logla ve programı anlamlı bir çıkış koduyla sonlandır (`sys.exit(1)`), sessizce yutma.",
          "If the source is an API or network share, wrap it with a retry that tries a few times on transient errors (`ConnectionError`, timeouts) — the `retry()` pattern from the previous lesson. If the last attempt still fails, log the error and exit with a meaningful status code (`sys.exit(1)`) — don't swallow it silently.",
        ],
      },
      {
        title: ["Zamanla ve belgele", "Schedule it and document"],
        body: [
          "Betiği her gün belirli bir saatte çalıştıracak bir zamanlama tanımla — sunucuda `cron` (`0 7 * * * python rapor.py --tarih $(date +%F)`) veya GitHub Actions'ta bir `schedule` workflow'u. README'ye hangi yöntemi neden seçtiğini (sunucu erişimi var mı, kod zaten GitHub'da mı) yaz.",
          "Define a schedule that runs the script daily at a fixed time — server `cron` (`0 7 * * * python report.py --date $(date +%F)`) or a GitHub Actions `schedule` workflow. In the README, note why you picked that method (do you have server access, is the code already on GitHub).",
        ],
      },
      githubStep("otomatik-rapor-betigi"),
    ],
    premium: true,
  }),

  /* -------------------------- Tableau --------------------------- */
  project({
    slug: "tableau-satis-panosu",
    track: "tableau",
    level: "junior",
    title: ["İlk Satış Panom", "My First Sales Dashboard"],
    stack: ["Tableau Public", "Excel"],
    hours: 5,
    xp: 180,
    summary: [
      "Superstore veri setiyle dört görselden oluşan, filtrelenebilir ve mobil uyumlu bir satış panosu tasarla ve Tableau Public'te yayınla.",
      "Design a filterable, mobile-friendly four-view sales dashboard on the Superstore dataset and publish it to Tableau Public.",
    ],
    dataset: [
      "Tableau'nun kendi Sample - Superstore veri seti (Tableau Desktop ile birlikte gelir).",
      "Tableau's own Sample - Superstore dataset (ships with Tableau Desktop).",
    ],
    deliverables: [
      ["4 görsel: KPI satırı, zaman trendi, kategori kırılımı, coğrafya", "4 views: a KPI row, time trend, category breakdown and geography"],
      ["Çalışan tarih ve bölge filtreleri", "Working date and region filters"],
      ["Telefon düzeni ayrıca tasarlanmış", "A separately designed phone layout"],
      ["Tableau Public bağlantısı", "A Tableau Public link"],
    ],
    steps: [
      {
        title: ["Veriyi bağla ve alanları düzelt", "Connect and fix the fields"],
        body: [
          "Tarih alanının tarih olarak tanındığını, sayısal alanların ölçü (yeşil) olduğunu doğrula. Coğrafi alanlara harita rolü ata. Bu adımdaki bir hata, sonraki her görselde tekrar eder.",
          "Verify the date field is recognised as a date and numeric fields are measures (green). Assign geographic roles to location fields. A mistake here repeats in every view that follows.",
        ],
      },
      {
        title: ["Dört görseli kur", "Build the four views"],
        body: [
          "KPI satırı (toplam satış, kâr, sipariş, marj), aylık trend çizgisi, kategori/alt kategori yatay çubuğu ve eyalet/şehir haritası. Her görseli **ayrı bir sayfada** kur, sonra panoda birleştir.",
          "A KPI row (sales, profit, orders, margin), a monthly trend line, a horizontal bar by category/sub-category and a state/city map. Build each on its **own sheet**, then assemble the dashboard.",
        ],
      },
      {
        title: ["Panoyu düzenle ve etkileşim ekle", "Assemble and add interactivity"],
        body: [
          "KPI'ları en üste, trendi sol altta, kırılımı sağ altta konumlandır. Kategori çubuğuna tıklandığında diğer görselleri filtreleyen bir **Filter Action** ekle.",
          "Put the KPIs at the top, the trend bottom-left, the breakdown bottom-right. Add a **Filter Action** so clicking a category bar filters the other views.",
        ],
      },
      {
        title: ["Mobil düzeni ve yayın", "Phone layout and publishing"],
        body: [
          "`Device Preview` ile telefon düzeni ekle, görselleri alt alta diz, yazı boyutlarını büyüt. Tableau Public'e yayınla ve bağlantıyı README'ne koy.",
          "Add a phone layout in `Device Preview`, stack the views vertically and increase font sizes. Publish to Tableau Public and put the link in your README.",
        ],
      },
      githubStep("tableau-satis-panosu"),
    ],
  }),

  project({
    slug: "tableau-kpi-panosu",
    track: "tableau",
    level: "mid",
    title: ["Hedef Takipli KPI Panosu", "KPI Dashboard with Targets"],
    stack: ["Tableau", "Calculated Fields", "Parameters"],
    hours: 7,
    xp: 300,
    summary: [
      "Hesaplanan alanlar ve parametrelerle, kullanıcının hedef eşiğini kendisi belirleyebildiği bir performans takip panosu kur.",
      "Use calculated fields and parameters to build a performance dashboard where the user sets the target threshold themselves.",
    ],
    dataset: [
      "Superstore veri seti + kendi oluşturduğun bir hedef tablosu (kategori × ay × hedef).",
      "The Superstore dataset plus a target table you create yourself (category × month × target).",
    ],
    deliverables: [
      ["Hedefe göre renklenen KPI kartları", "KPI tiles coloured against target"],
      ["Parametre ile ayarlanabilir eşik", "A parameter-driven threshold"],
      ["Geçen yıla göre değişim (YoY) hesabı", "A year-over-year change calculation"],
      ["Bullet chart veya sapma grafiği", "A bullet chart or deviation chart"],
    ],
    steps: [
      {
        title: ["Hedef tablosunu birleştir", "Blend in the target table"],
        body: [
          "Hedef verisini ayrı bir kaynak olarak ekle ve kategori + ay üzerinden ilişkilendir. Granülerliğin aynı olduğundan emin ol; farklıysa hedefler yanlış dağılır.",
          "Add the target data as a second source and relate it on category + month. Make sure the grain matches; if it does not, targets get distributed incorrectly.",
        ],
      },
      {
        title: ["Hesaplanan alanları yaz", "Write the calculated fields"],
        body: [
          "Hedefe ulaşma oranı, geçen yıla göre değişim ve durum etiketi. Marj hesaplarken `SUM(kâr)/SUM(satış)` kullan — ortalamaların ortalaması tuzağına düşme.",
          "Attainment against target, year-over-year change and a status label. For margin use `SUM(profit)/SUM(sales)` — do not fall into the average-of-averages trap.",
        ],
        lang: "dax",
        code: `// Hedefe ulaşma
SUM([Satış]) / SUM([Hedef])

// Durum etiketi (parametreyle eşik)
IF SUM([Satış]) / SUM([Hedef]) >= [Eşik Parametresi] THEN "Hedefte"
ELSEIF SUM([Satış]) / SUM([Hedef]) >= 0.8 THEN "Yakın"
ELSE "Riskli" END`,
      },
      {
        title: ["Parametre ve bullet chart", "Parameter and bullet chart"],
        body: [
          "Eşik için bir parametre oluştur, panoya kaydırıcı olarak koy. Gerçekleşen–hedef karşılaştırması için bullet chart kur: çubuk gerçekleşen, referans çizgisi hedef.",
          "Create a parameter for the threshold and expose it as a slider. Build a bullet chart for actual vs target: the bar is actual, the reference line is target.",
        ],
      },
      githubStep("tableau-kpi-panosu"),
    ],
  }),

  project({
    slug: "tableau-yonetici-panosu",
    track: "tableau",
    level: "senior",
    title: ["Yönetici Panosu (LOD + Performans)", "Executive Dashboard (LOD + Performance)"],
    stack: ["Tableau", "LOD", "Extract", "Actions"],
    hours: 10,
    xp: 450,
    summary: [
      "LOD ifadeleriyle müşteri düzeyi metrikler üret, panoyu 3 saniyenin altında açılacak şekilde optimize et ve detaya inme akışı kur.",
      "Compute customer-level metrics with LOD expressions, optimise the dashboard to load in under 3 seconds, and build a drill-down flow.",
    ],
    dataset: [
      "Superstore veya en az 500 bin satırlık bir açık veri seti — performans farkını görebilmek için hacim gerekir.",
      "Superstore, or any open dataset with at least 500k rows — you need volume to see the performance difference.",
    ],
    deliverables: [
      ["LOD ile müşteri başına ilk sipariş ve toplam harcama", "First order and total spend per customer via LOD"],
      ["Yeni vs. mevcut müşteri kırılımı", "A new vs. returning customer split"],
      ["Özet → detay geçiş akışı (dashboard action)", "A summary → detail drill-down (dashboard action)"],
      ["Performance Recorder öncesi/sonrası karşılaştırması", "A before/after Performance Recorder comparison"],
    ],
    steps: [
      {
        title: ["LOD metriklerini kur", "Build the LOD metrics"],
        body: [
          "Müşteri başına ilk sipariş tarihi, toplam harcama ve sipariş sayısını FIXED ile hesapla. Filtrelerin bu hesaplara işlemesini istiyorsan ilgili filtreyi Context Filter yapmayı unutma.",
          "Compute first order date, total spend and order count per customer with FIXED. If you want filters to affect them, remember to promote those filters to Context Filters.",
        ],
        lang: "dax",
        code: `{ FIXED [Müşteri ID] : MIN([Sipariş Tarihi]) }
{ FIXED [Müşteri ID] : SUM([Satış]) }

// Yeni müşteri mi?
IF DATETRUNC('month', [İlk Sipariş]) = DATETRUNC('month', [Sipariş Tarihi])
THEN "Yeni" ELSE "Mevcut" END`,
      },
      {
        title: ["Performansı ölç ve iyileştir", "Measure and improve performance"],
        body: [
          "Performance Recorder ile başlangıç süresini kaydet. Extract'e geç, kullanılmayan sütunları at, görsel sayısını azalt ve tekrar ölç. İyileştirmeyi **sayıyla** raporla — bu, panonun kendisinden daha etkileyici bir çıktıdır.",
          "Record the baseline with Performance Recorder. Switch to an extract, drop unused columns, reduce the view count and measure again. Report the improvement **with numbers** — it is a more impressive deliverable than the dashboard itself.",
        ],
      },
      githubStep("tableau-yonetici-panosu"),
    ],
  }),

  project({
    slug: "tableau-kume-eylemli-segment-panosu",
    track: "tableau",
    level: "expert",
    title: ["Küme Eylemli Segment Panosu", "A Set-Action Segmentation Dashboard"],
    stack: ["Tableau", "Sets", "Set Actions", "LOD"],
    hours: 9,
    xp: 550,
    summary: [
      "Kullanıcının bir grafikte tıklayarak kendi karşılaştırma segmentini oluşturduğu, 'seçilenler vs geri kalan herkes' panosu kur.",
      "Build a dashboard where the viewer defines their own comparison segment by clicking a chart — \"selected vs everyone else\".",
    ],
    dataset: [
      "Müşteri/bölge/ürün kırılımlı herhangi bir satış veri seti (Superstore veya kendi verin).",
      "Any sales dataset with a customer/region/product breakdown (Superstore or your own data).",
    ],
    deliverables: [
      ["Bir harita veya çubuk grafikte tıklamayla güncellenen bir küme", "A set that updates via clicks on a map or bar chart"],
      ["'Seçilenler vs geri kalanlar' karşılaştırması yapan bir hesaplanan alan ve görsel", "A calculated field and visual comparing \"selected vs the rest\""],
      ["FIXED LOD ile hesaplanmış, kümenin dayandığı bir taban metrik (ör. müşteri başına toplam satış)", "A base metric computed with FIXED LOD that the set relies on (e.g. total sales per customer)"],
      ["Panoyu nasıl kullanacağını anlatan 3 cümlelik bir kullanım notu", "A 3-sentence usage note explaining how to use the dashboard"],
    ],
    steps: [
      {
        title: ["Taban metriği FIXED LOD ile kur", "Build the base metric with FIXED LOD"],
        body: [
          "Kümenin dayanacağı bir metrik hazırla — \"müşteri başına toplam satış\" gibi. Görseldeki diğer kırılımlardan etkilenmemesi için `{ FIXED [Müşteri ID] : SUM([Satış]) }` kullan.",
          "Prepare the metric the set will rely on — something like \"total sales per customer\". Use `{ FIXED [Customer ID] : SUM([Sales]) }` so it isn't affected by other breakdowns in the view.",
        ],
      },
      {
        title: ["Kümeyi oluştur ve küme eylemine bağla", "Create the set and wire it to a set action"],
        body: [
          "İlgili boyuttan (Müşteri, Bölge) bir küme oluştur, dashboard'a ekle. Sonra Dashboard → Actions → Add Action → Change Set Values ile bir görseldeki tıklamanın bu kümeyi güncellemesini sağla.",
          "Create a set from the relevant dimension (Customer, Region) and add it to the dashboard. Then use Dashboard → Actions → Add Action → Change Set Values so clicking in a view updates that set.",
        ],
      },
      {
        title: ["Karşılaştırma görselini kur", "Build the comparison visual"],
        body: [
          "`IF [Küme] THEN 'Seçili' ELSE 'Diğer' END` gibi bir hesaplanan alan yaz ve bunu renk/gruplamada kullanarak seçilenlerin toplamını geri kalanla yan yana göster.",
          "Write a calculated field like `IF [Set] THEN 'Selected' ELSE 'Other' END` and use it for color/grouping to show the selected group's total side by side with everyone else's.",
        ],
      },
      {
        title: ["Kullanım notunu yaz", "Write the usage note"],
        body: [
          "Panoyu ilk gören birinin ne yapması gerektiğini 3 cümleyle anlat: nereye tıklanır, seçim nasıl temizlenir, karşılaştırma nerede görünür. Etkileşimli bir pano, nasıl kullanılacağı yazılı olmadan çoğu zaman keşfedilmeden kalır.",
          "Explain in 3 sentences what a first-time viewer should do: where to click, how to clear the selection, where the comparison appears. An interactive dashboard usually goes undiscovered without written instructions on how to use it.",
        ],
      },
      githubStep("kume-eylemli-segment-panosu"),
    ],
    premium: true,
  }),

  project({
    slug: "tableau-hikaye-ceyrek-sonuclari",
    track: "tableau",
    level: "expert",
    title: ["Hikaye: Çeyrek Sonuçlarını Anlatmak", "A Story: Narrating the Quarterly Results"],
    stack: ["Tableau", "Story Points", "Dashboard Design"],
    hours: 7,
    xp: 500,
    summary: [
      "Bir çeyreğin sonuçlarını, izleyiciyi belirli bir sonuca adım adım götüren 4-5 noktalı bir Story'ye dönüştür.",
      "Turn a quarter's results into a 4-5 point Story that walks the viewer step by step to a specific conclusion.",
    ],
    dataset: [
      "En az bir çeyreklik (3 ay) satış/performans verisi; bir önceki dönemle karşılaştırma yapılabilmeli.",
      "At least one quarter (3 months) of sales/performance data, comparable against the prior period.",
    ],
    deliverables: [
      ["4-5 hikaye noktasından oluşan bir Tableau Story", "A Tableau Story made of 4-5 story points"],
      ["Her noktada bulguyu özetleyen bir başlık (caption)", "A caption on every point summarizing that point's finding"],
      ["Genelden özele giden bir anlatı sırası (toplam sonuç → sebep → detay → aksiyon önerisi)", "A narrative order that goes from general to specific (overall result → cause → detail → recommended action)"],
      ["Story'nin sonunda net bir 'öneri' noktası", "A clear \"recommendation\" point at the end of the Story"],
    ],
    steps: [
      {
        title: ["Anlatının sırasını kâğıt üzerinde planla", "Plan the narrative order on paper"],
        body: [
          "Tableau'yu açmadan önce, hangi 4-5 bulguyu hangi sırayla göstereceğini yaz. İyi bir sıra genelden özele gider: 'genel sonuç ne oldu' → 'en büyük sebep neydi' → 'hangi segment/bölge en çok etkiledi' → 'ne yapılmalı'.",
          "Before opening Tableau, write down which 4-5 findings you'll show and in what order. A good order goes from general to specific: 'what was the overall result' → 'what was the biggest cause' → 'which segment/region drove it most' → 'what should happen next'.",
        ],
      },
      {
        title: ["Her nokta için bir görsel/dashboard hazırla", "Prepare a view/dashboard for each point"],
        body: [
          "Her hikaye noktası ayrı bir sayfa veya dashboard kullanır. Noktalar arasında tutarlı bir görsel dil (renk, yazı tipi) koru — izleyici bir slayttan diğerine geçtiğinde kaybolmuş hissetmemeli.",
          "Each story point uses a separate sheet or dashboard. Keep a consistent visual language (color, font) across points — the viewer shouldn't feel lost moving from one point to the next.",
        ],
      },
      {
        title: ["Story'yi kur ve başlıkları yaz", "Build the Story and write the captions"],
        body: [
          "Yeni bir Story sayfası aç, hazırladığın görselleri sırayla sürükle. Her noktaya, o noktanın söylediği bulguyu tek cümlede özetleyen bir başlık yaz — başlıklar art arda okunduğunda hikayenin özeti çıkmalı.",
          "Open a new Story sheet and drag in your prepared views in order. Write each point a caption that summarizes its finding in one sentence — reading the captions back to back should give the gist of the whole story.",
        ],
      },
      {
        title: ["Öneri noktasıyla kapat", "Close with a recommendation point"],
        body: [
          "Son nokta yalnızca veri göstermemeli — \"bu yüzden şunu öneriyoruz\" diyen net bir aksiyon içermeli. Bir hikaye veri ile başlar ama bir kararla bitmelidir.",
          "The last point shouldn't just show data — it should state a clear action: \"which is why we recommend...\". A story starts with data but should end with a decision.",
        ],
      },
      githubStep("hikaye-ceyrek-sonuclari"),
    ],
    premium: true,
  }),

  /* -------------------------- Power BI -------------------------- */
  project({
    slug: "powerbi-satis-raporu",
    track: "power-bi",
    level: "junior",
    title: ["Power BI Satış Raporu", "Power BI Sales Report"],
    stack: ["Power BI Desktop", "Power Query"],
    hours: 5,
    xp: 180,
    summary: [
      "CSV kaynağından başlayıp Power Query'de temizleyerek, temel ölçülerle çalışan tek sayfalık bir satış raporu üret.",
      "Start from a CSV, clean it in Power Query and produce a single-page sales report backed by basic measures.",
    ],
    dataset: [
      "Contoso, AdventureWorks veya Superstore CSV'si. Ay sütunları geniş formattaysa unpivot alıştırması için ideal.",
      "Contoso, AdventureWorks or the Superstore CSV. If months come as wide columns, even better — good unpivot practice.",
    ],
    deliverables: [
      ["Power Query adımları belgelenmiş temiz sorgu", "A clean query with documented Power Query steps"],
      ["4 temel ölçü (ciro, sipariş, sepet, büyüme)", "4 core measures (revenue, orders, basket, growth)"],
      ["KPI kartları + trend + kırılım içeren rapor sayfası", "A report page with KPI cards, trend and breakdown"],
      ["Yayınlanmış rapor veya `.pbix` dosyası", "A published report or the `.pbix` file"],
    ],
    steps: [
      {
        title: ["Power Query'de temizle", "Clean in Power Query"],
        body: [
          "Başlıkları yükselt, tipleri (özellikle tarih ve ondalık) doğru Locale ile ayarla, kullanmayacağın sütunları at. Geniş ay sütunları varsa unpivot et.",
          "Promote headers, set types (especially dates and decimals) with the correct Locale, drop unused columns. Unpivot wide month columns if you have them.",
        ],
      },
      {
        title: ["Tarih tablosu ekle", "Add a date table"],
        body: [
          "DAX ile ayrı bir tarih tablosu üret, satış tablosuna bağla ve `Mark as Date Table` ile işaretle. Zaman zekâsı fonksiyonlarının doğru çalışmasının ön koşulu budur.",
          "Generate a separate date table in DAX, relate it to the sales table and flag it with `Mark as Date Table`. This is the precondition for time intelligence to work correctly.",
        ],
        lang: "dax",
        code: `Tarih =
ADDCOLUMNS(
    CALENDARAUTO(),
    "Yıl", YEAR([Date]),
    "Ay No", MONTH([Date]),
    "Ay", FORMAT([Date], "MMM"),
    "Yıl-Ay", FORMAT([Date], "yyyy-MM")
)`,
      },
      {
        title: ["Ölçüleri yaz ve raporu kur", "Write measures and build the report"],
        body: [
          "Ölçüleri ayrı bir `_Ölçüler` tablosunda topla — model büyüdükçe bunu yapmadığına pişman olursun. Ardından KPI kartları, aylık trend çizgisi ve kategori çubuğunu yerleştir.",
          "Keep measures in a dedicated `_Measures` table — as the model grows you will regret not doing this. Then place the KPI cards, a monthly trend line and a category bar.",
        ],
      },
      githubStep("powerbi-satis-raporu"),
    ],
  }),

  project({
    slug: "powerbi-kpi-panosu",
    track: "power-bi",
    level: "mid",
    title: ["Yıldız Şema ve DAX Panosu", "Star Schema and DAX Dashboard"],
    stack: ["Power BI", "DAX", "Star Schema"],
    hours: 8,
    xp: 350,
    summary: [
      "Düz bir tabloyu yıldız şemaya dönüştür, zaman zekâsı ölçüleri yaz ve dinamik başlıklı, dilimleyicili bir pano kur.",
      "Turn a flat table into a star schema, write time-intelligence measures and build a dashboard with slicers and dynamic titles.",
    ],
    dataset: [
      "Contoso veya kendi işyerinden anonimleştirilmiş bir satış verisi.",
      "Contoso, or anonymised sales data from your own workplace.",
    ],
    deliverables: [
      ["Yıldız şema model diyagramı ekran görüntüsü", "A screenshot of the star schema model diagram"],
      ["En az 8 DAX ölçüsü (YoY, YTD, pay, sıralama)", "At least 8 DAX measures (YoY, YTD, share, rank)"],
      ["Dilimleyicilerle etkileşimli 2 sayfalık rapor", "A 2-page interactive report with slicers"],
      ["Ölçü tanımlarını listeleyen bir belge", "A document listing the measure definitions"],
    ],
    steps: [
      {
        title: ["Modeli normalleştir", "Normalise the model"],
        body: [
          "Düz tablodan ürün, müşteri ve tarih boyutlarını ayır. Her boyutta benzersiz bir anahtar olduğundan emin ol, ilişkileri bire-çok kur ve çift yönlü filtrelemeden kaçın.",
          "Split product, customer and date dimensions out of the flat table. Ensure each dimension has a unique key, create one-to-many relationships and avoid bidirectional filtering.",
        ],
      },
      {
        title: ["Zaman zekâsı ölçüleri", "Time intelligence measures"],
        body: [
          "YTD, geçen yıl aynı dönem ve büyüme yüzdesi ölçülerini yaz. Bölmede daima `DIVIDE` kullan.",
          "Write YTD, same period last year and growth percentage measures. Always divide with `DIVIDE`.",
        ],
        lang: "dax",
        code: `Toplam Ciro = SUM(Satis[Tutar])
YTD Ciro = TOTALYTD([Toplam Ciro], Tarih[Date])
Geçen Yıl = CALCULATE([Toplam Ciro], SAMEPERIODLASTYEAR(Tarih[Date]))
Büyüme % = DIVIDE([Toplam Ciro] - [Geçen Yıl], [Geçen Yıl])
Kategori Payı % =
DIVIDE([Toplam Ciro], CALCULATE([Toplam Ciro], ALL(Urun[Kategori])))`,
      },
      {
        title: ["Dinamik başlık ve koşullu biçim", "Dynamic titles and conditional formatting"],
        body: [
          "Seçilen filtreyi başlıkta gösteren bir ölçü yaz (`SELECTEDVALUE`) ve görselin başlığına bağla. Büyüme sütununu koşullu biçimlendirmeyle renklendir — okuyucu neyin iyi neyin kötü olduğunu bakar bakmaz görsün.",
          "Write a measure using `SELECTEDVALUE` that reflects the current filter and bind it to the visual's title. Apply conditional formatting to the growth column so the reader sees good and bad at a glance.",
        ],
      },
      githubStep("powerbi-yildiz-sema-panosu"),
    ],
  }),

  project({
    slug: "powerbi-yonetici-panosu",
    track: "power-bi",
    level: "senior",
    title: ["Kurumsal Rapor: RLS ve Yenileme", "Enterprise Report: RLS and Refresh"],
    stack: ["Power BI Service", "RLS", "Incremental Refresh", "Gateway"],
    hours: 10,
    xp: 450,
    summary: [
      "Bölge müdürlerinin yalnızca kendi bölgelerini gördüğü, artımlı yenilemeyle beslenen ve uygulama olarak dağıtılan kurumsal bir rapor kur.",
      "Build an enterprise report where regional managers see only their own region, fed by incremental refresh and distributed as an app.",
    ],
    dataset: [
      "Bölge boyutu içeren herhangi bir satış verisi + kullanıcı–bölge eşleme tablosu.",
      "Any sales data with a region dimension, plus a user-to-region mapping table.",
    ],
    deliverables: [
      ["Dinamik RLS rolü ve test kanıtı (View As ekran görüntüsü)", "A dynamic RLS role plus proof of testing (a View As screenshot)"],
      ["Artımlı yenileme yapılandırması", "An incremental refresh configuration"],
      ["Workspace + App dağıtımı", "A workspace and app distribution"],
      ["Yenileme süresi öncesi/sonrası karşılaştırması", "A before/after refresh duration comparison"],
    ],
    steps: [
      {
        title: ["Dinamik RLS kur", "Set up dynamic RLS"],
        body: [
          "Kullanıcı e-postası ile bölgeyi eşleyen bir tablo ekle ve rolde `USERPRINCIPALNAME()` kullan. Yayınlamadan önce `View As` ile en az iki farklı kullanıcıyı test et.",
          "Add a table mapping user email to region and use `USERPRINCIPALNAME()` in the role. Test at least two different users with `View As` before publishing.",
        ],
        lang: "dax",
        code: `[Bolge] = LOOKUPVALUE(
    KullaniciBolge[Bolge],
    KullaniciBolge[Email], USERPRINCIPALNAME()
)`,
      },
      {
        title: ["Artımlı yenilemeyi yapılandır", "Configure incremental refresh"],
        body: [
          "`RangeStart` ve `RangeEnd` parametrelerini oluştur, sorguyu bu aralıkla filtrele ve tabloda artımlı yenileme politikası tanımla (örneğin 5 yıl arşiv, son 10 gün yenile).",
          "Create the `RangeStart` and `RangeEnd` parameters, filter the query by that range and define an incremental refresh policy on the table (say, archive 5 years, refresh the last 10 days).",
        ],
      },
      {
        title: ["Yayınla ve dağıt", "Publish and distribute"],
        body: [
          "Ayrı bir workspace aç, raporu yayınla, gerekiyorsa gateway kur, yenileme zamanla ve son kullanıcıya **App** olarak dağıt. Ham workspace erişimi verme.",
          "Create a dedicated workspace, publish, install a gateway if needed, schedule the refresh and distribute to end users as an **App**. Do not grant raw workspace access.",
        ],
      },
      githubStep("powerbi-kurumsal-rapor"),
    ],
  }),

  project({
    slug: "powerbi-alan-parametreli-pano",
    track: "power-bi",
    level: "expert",
    title: ["Yönetici Panosu: Alan Parametreleriyle Tek Görsel, Çok Metrik", "Executive Dashboard: One Visual, Many Metrics via Field Parameters"],
    stack: ["Power BI", "Field Parameters", "DAX"],
    hours: 8,
    xp: 500,
    summary: [
      "Ciro, kâr ve birim satışı ayrı ayrı sayfalarda tekrar çizmek yerine, alan parametresiyle tek bir görselde dilimleyerek göster.",
      "Instead of redrawing revenue, profit and units sold on separate pages, show them in a single visual switched by a slicer using field parameters.",
    ],
    dataset: [
      "En az 3 metriği (ciro, kâr, birim satış gibi) olan herhangi bir satış veri seti.",
      "Any sales dataset with at least 3 metrics (revenue, profit, units sold).",
    ],
    deliverables: [
      ["En az 3 ölçüyü içeren bir alan parametresi", "A field parameter containing at least 3 measures"],
      ["Alan parametresiyle beslenen, dilimleyiciyle değişen tek bir görsel", "A single visual driven by the field parameter, switched via a slicer"],
      ["Aynı deseni bir boyut/kırılım için de uygulayan ikinci bir örnek (şehre göre mi, kategoriye göre mi)", "A second example applying the same pattern to a dimension/breakdown (by city or by category)"],
      ["'Neden 5 ayrı sayfa yerine bu' başlıklı kısa bir not", "A short note titled \"why this instead of 5 separate pages\""],
    ],
    steps: [
      {
        title: ["Metrik alan parametresini oluştur", "Create the metric field parameter"],
        body: [
          "Modelleme → Yeni Parametre → Alanlar ile en az 3 ölçünü (Toplam Ciro, Toplam Kâr, Toplam Birim) tek bir alan parametresinde topla. Bu, arka planda bir hesaplanan tablo üretir.",
          "Use Modeling → New Parameter → Fields to gather at least 3 measures (Total Revenue, Total Profit, Total Units) into a single field parameter. This generates a calculated table behind the scenes.",
        ],
      },
      {
        title: ["Görsele bağla ve dilimleyici ekle", "Wire it to a visual and add a slicer"],
        body: [
          "Alan parametresini bir çizgi/çubuk grafiğe sürükle, yanına parametrenin ürettiği tabloyla beslenen bir dilimleyici koy. Kullanıcı dilimleyiciden metrik değiştirdiğinde aynı görsel güncellenmeli — yeni bir görsel eklemeden.",
          "Drag the field parameter onto a line/bar chart, and place a slicer next to it fed by the table the parameter generated. Switching the metric in the slicer should update the same visual — without adding a new visual.",
        ],
      },
      {
        title: ["Aynı deseni bir boyuta uygula", "Apply the same pattern to a dimension"],
        body: [
          "Bu kez metrik yerine bir kırılımı (Şehir vs Kategori) alan parametresine al ve aynı görselin eksenini kullanıcının değiştirmesine izin ver. İki örnek, alan parametrelerinin hem ölçü hem sütun kabul ettiğini kanıtlar.",
          "This time, put a breakdown (City vs Category) into a field parameter instead of a metric, and let the viewer switch the same visual's axis. The two examples prove field parameters accept both measures and columns.",
        ],
      },
      {
        title: ["Kazancı belgele", "Document the payoff"],
        body: [
          "5 ayrı sayfa/görsel yerine 1 görsel + 2 dilimleyici kurmanın bakım açısından ne kazandırdığını yaz: yeni bir metrik eklendiğinde kaç yerin güncellenmesi gerekiyor (1 vs 5)?",
          "Write down what building 1 visual + 2 slicers instead of 5 separate pages/visuals saves in maintenance: when a new metric is added, how many places need updating (1 vs 5)?",
        ],
      },
      githubStep("alan-parametreli-pano"),
    ],
    premium: true,
  }),

  project({
    slug: "powerbi-dax-performans-denetimi",
    track: "power-bi",
    level: "expert",
    title: ["DAX Performans Denetimi", "DAX Performance Audit"],
    stack: ["Power BI", "DAX", "VAR", "Performance Analyzer"],
    hours: 9,
    xp: 550,
    summary: [
      "Yavaş çalışan 3 ölçüyü Performance Analyzer ile tespit et, VAR/RETURN ile yeniden yaz ve öncesi/sonrası render süresini ölç.",
      "Find 3 slow measures with Performance Analyzer, rewrite them with VAR/RETURN, and measure the before/after render time.",
    ],
    dataset: [
      "İç içe/tekrarlı CALCULATE ifadeleri içeren, karmaşık bir DAX ölçü seti olan herhangi bir model (kendi raporundan veya bu patikanın DAX derslerinden).",
      "Any model with a set of complex DAX measures containing nested/repeated CALCULATE expressions (from your own report or this track's DAX lessons).",
    ],
    deliverables: [
      ["Performance Analyzer'dan alınmış, en yavaş 3 görsel/ölçünün render süresi", "Performance Analyzer output showing render time for the 3 slowest visuals/measures"],
      ["Her ölçünün VAR/RETURN ile yeniden yazılmış hâli", "Each measure rewritten with VAR/RETURN"],
      ["Öncesi/sonrası render süresi karşılaştırma tablosu", "A before/after render-time comparison table"],
      ["'VAR her zaman hızlandırmaz' başlıklı, ne zaman fark etmediğini anlatan bir not", "A note titled \"VAR doesn't always speed things up\", explaining when it makes no difference"],
    ],
    steps: [
      {
        title: ["Performance Analyzer ile yavaş görselleri bul", "Find slow visuals with Performance Analyzer"],
        body: [
          "Görünüm → Performance Analyzer'ı aç, Yenile'ye bas ve her görselin ne kadar sürdüğünü kaydet. En yavaş 3 görseli/ölçüyü hedefe al — geri kalanını optimize etmek zaman kaybıdır.",
          "Open View → Performance Analyzer, click Refresh and record how long each visual takes. Target the 3 slowest visuals/measures — optimizing the rest is wasted effort.",
        ],
      },
      {
        title: ["Tekrarlı CALCULATE ifadelerini bul", "Find the repeated CALCULATE expressions"],
        body: [
          "Her yavaş ölçünün DAX'ını oku: aynı `CALCULATE(...)` ifadesi birden fazla yerde mi geçiyor? Geçiyorsa, bu motorun aynı hesabı gereksiz yere tekrarladığının işaretidir.",
          "Read each slow measure's DAX: does the same `CALCULATE(...)` expression appear more than once? If so, that's a sign the engine is redundantly recomputing the same thing.",
        ],
        lang: "dax",
        code: `-- Önce (tekrarlı):
Marj % =
DIVIDE(
    CALCULATE([Toplam Satış], Urun[Kategori] = "Elektronik") - CALCULATE([Maliyet], Urun[Kategori] = "Elektronik"),
    CALCULATE([Toplam Satış], Urun[Kategori] = "Elektronik")
)

-- Sonra (VAR ile):
Marj % =
VAR Satis = CALCULATE([Toplam Satış], Urun[Kategori] = "Elektronik")
VAR Maliyet = CALCULATE([Maliyet], Urun[Kategori] = "Elektronik")
RETURN
    DIVIDE(Satis - Maliyet, Satis)`,
      },
      {
        title: ["VAR/RETURN ile yeniden yaz ve tekrar ölç", "Rewrite with VAR/RETURN and re-measure"],
        body: [
          "Her ölçüyü VAR/RETURN'e çevir, Performance Analyzer'ı tekrar çalıştır. Fark özellikle CALCULATE'in pahalı olduğu (büyük tablo, karmaşık filtre) ölçülerde belirgin olur.",
          "Convert each measure to VAR/RETURN, rerun Performance Analyzer. The difference is most visible on measures where CALCULATE is expensive (large table, complex filter).",
        ],
      },
      {
        title: ["Ne zaman fark etmediğini yaz", "Note when it makes no difference"],
        body: [
          "Küçük bir tabloda veya CALCULATE ucuzsa VAR'ın ölçülebilir bir fark yaratmadığı ölçüleri de raporla — bu, \"her zaman VAR kullan\" gibi kör bir kurala değil, ölçerek karar vermeye dayanan bir alışkanlık kazandırır.",
          "Also report the measures where VAR made no measurable difference, on a small table or where CALCULATE is cheap — this builds the habit of deciding by measurement, not a blind \"always use VAR\" rule.",
        ],
      },
      githubStep("dax-performans-denetimi"),
    ],
    premium: true,
  }),

  /* --------------------------- Fabric --------------------------- */
  project({
    slug: "fabric-lakehouse-pipeline",
    track: "microsoft-fabric",
    level: "junior",
    title: ["İlk Lakehouse ve Pipeline", "Your First Lakehouse and Pipeline"],
    stack: ["Microsoft Fabric", "Data Factory", "OneLake"],
    hours: 6,
    xp: 220,
    summary: [
      "Fabric'te bir lakehouse oluştur, bir kaynaktan veri çeken pipeline kur ve sonucu Delta tablosu olarak yaz.",
      "Create a lakehouse in Fabric, build a pipeline that pulls from a source, and land the result as a Delta table.",
    ],
    dataset: [
      "Açık bir API (örneğin döviz kuru veya hava durumu) ya da bir CSV dosyası. Fabric denemesi ücretsiz olarak başlatılabilir.",
      "A public API (exchange rates or weather, say) or a CSV file. The Fabric trial can be started for free.",
    ],
    deliverables: [
      ["Çalışan bir lakehouse ve içinde en az 2 Delta tablosu", "A working lakehouse with at least 2 Delta tables"],
      ["Zamanlanmış bir Data Factory pipeline'ı", "A scheduled Data Factory pipeline"],
      ["Tablodan üretilmiş basit bir Power BI raporu", "A simple Power BI report on top of the table"],
      ["Mimari şeması (kaynak → bronze → tablo → rapor)", "An architecture diagram (source → bronze → table → report)"],
    ],
    steps: [
      {
        title: ["Workspace ve lakehouse oluştur", "Create the workspace and lakehouse"],
        body: [
          "Fabric kapasitesi atanmış bir workspace aç ve içine bir lakehouse ekle. `Files` (ham dosya) ile `Tables` (Delta tabloları) arasındaki farkı kavradığından emin ol.",
          "Create a workspace with Fabric capacity assigned and add a lakehouse. Make sure you understand the difference between `Files` (raw files) and `Tables` (Delta tables).",
        ],
      },
      {
        title: ["Pipeline ile veri çek", "Pull data with a pipeline"],
        body: [
          "Data Factory'de bir `Copy data` etkinliği kur: kaynak API/CSV, hedef lakehouse `Files/bronze/`. Çalıştır ve dosyanın geldiğini doğrula.",
          "Create a `Copy data` activity in Data Factory: source is the API/CSV, destination is `Files/bronze/` in the lakehouse. Run it and confirm the file landed.",
        ],
      },
      {
        title: ["Not defteriyle tabloya çevir", "Turn it into a table with a notebook"],
        body: [
          "Bir PySpark not defteri ekle, ham dosyayı oku, tipleri düzelt ve Delta tablosu olarak kaydet. Pipeline'a bu not defterini bir adım olarak ekle ve günlük zamanla.",
          "Add a PySpark notebook, read the raw file, fix the types and save it as a Delta table. Add the notebook to the pipeline as a step and schedule it daily.",
        ],
        lang: "python",
        code: `df = spark.read.option("header", True).csv("Files/bronze/veri.csv")

from pyspark.sql import functions as F
temiz = (df
    .withColumn("tarih", F.to_date("tarih"))
    .withColumn("tutar", F.col("tutar").cast("double"))
    .dropna(subset=["tarih", "tutar"]))

temiz.write.format("delta").mode("overwrite").saveAsTable("silver_veri")`,
      },
      githubStep("fabric-lakehouse-pipeline"),
    ],
  }),

  project({
    slug: "fabric-medallion",
    track: "microsoft-fabric",
    level: "mid",
    title: ["Medallion Mimarisi Uygulaması", "Implementing Medallion Architecture"],
    stack: ["Fabric", "PySpark", "Delta Lake", "Direct Lake"],
    hours: 12,
    xp: 450,
    summary: [
      "Bronze, Silver ve Gold katmanlarını gerçek bir veri akışında kur; her katmanda veri kalitesi kontrolü yap ve Gold üzerine Direct Lake raporu bağla.",
      "Build Bronze, Silver and Gold layers on a real pipeline, add data quality checks at each layer and connect a Direct Lake report on Gold.",
    ],
    dataset: [
      "Çok tablolu bir kaynak: Olist, Contoso veya birden fazla CSV içeren herhangi bir açık veri.",
      "A multi-table source: Olist, Contoso or any open dataset with several CSVs.",
    ],
    deliverables: [
      ["Üç katmanlı lakehouse yapısı", "A three-layer lakehouse structure"],
      ["Katman geçişlerini yapan not defterleri", "Notebooks performing each layer transition"],
      ["Veri kalitesi kontrolleri ve hata durumunda durdurma", "Data quality checks that halt on failure"],
      ["Direct Lake modunda çalışan Power BI raporu", "A Power BI report running in Direct Lake mode"],
    ],
    steps: [
      {
        title: ["Bronze: ham veriyi olduğu gibi al", "Bronze: land the raw data untouched"],
        body: [
          "Kaynağı hiç dönüştürmeden yaz; yalnızca alım zamanı ve kaynak dosya adı gibi teknik sütunlar ekle. Bronze append-only kalmalı.",
          "Write the source with zero transformation; add only technical columns like ingestion timestamp and source filename. Bronze stays append-only.",
        ],
      },
      {
        title: ["Silver: temizle ve birleştir", "Silver: clean and conform"],
        body: [
          "Tipleri düzelt, tekrarları ayıkla, kritik alanlarda NULL olanları ayrı bir karantina tablosuna al (silme — sonra incelenmeli). Tabloları ortak anahtarlarla birleştir.",
          "Fix types, de-duplicate, and move rows with NULLs in critical fields into a quarantine table (do not delete them — they need review). Conform the tables on shared keys.",
        ],
      },
      {
        title: ["Gold: iş sorusuna göre şekillendir", "Gold: shape it around the question"],
        body: [
          "Yıldız şemaya uygun fact ve dimension tabloları üret; raporun ihtiyaç duyduğu granülerlikte özetle. Gold tabloları rapor için **hazır** olmalı, rapor içinde ek hesaplama gerekmemeli.",
          "Produce fact and dimension tables in a star schema, aggregated to the grain the report needs. Gold tables should be **report-ready**; the report should not need extra computation.",
        ],
      },
      {
        title: ["Kalite kontrollerini ekle", "Add the quality checks"],
        body: [
          "Her katman geçişinde test çalıştır: benzersizlik, boşluk, aralık ve hacim. Test başarısızsa pipeline'ı durdur — yanlış veriyi rapora ulaştırmaktansa raporu geciktirmek her zaman daha iyidir.",
          "Run tests at every layer transition: uniqueness, nullness, range and volume. If a test fails, stop the pipeline — delaying the report always beats publishing wrong data.",
        ],
        lang: "python",
        code: `def kontrol_et(df, anahtar, zorunlu):
    assert df.count() > 0, "Tablo boş"
    assert df.select(anahtar).distinct().count() == df.count(), "Anahtar tekrar ediyor"
    for sutun in zorunlu:
        bos = df.filter(F.col(sutun).isNull()).count()
        assert bos == 0, f"{sutun} sütununda {bos} boş değer var"
    return True

kontrol_et(silver_satis, "siparis_id", ["tarih", "tutar", "musteri_id"])`,
      },
      githubStep("fabric-medallion-mimarisi"),
    ],
  }),

  project({
    slug: "fabric-gercek-zamanli",
    track: "microsoft-fabric",
    level: "senior",
    title: ["Gerçek Zamanlı Analiz Akışı", "Real-Time Analytics Pipeline"],
    stack: ["Fabric", "Eventstream", "KQL Database", "Real-Time Dashboard"],
    hours: 14,
    xp: 550,
    summary: [
      "Akış verisini Eventstream ile al, KQL veritabanında sorgula ve saniyeler içinde güncellenen bir gerçek zamanlı pano kur.",
      "Ingest streaming data with Eventstream, query it in a KQL database and build a dashboard that updates within seconds.",
    ],
    dataset: [
      "Sentetik olay üreteci (Python betiği ile saniyede birkaç olay) veya bir IoT/tıklama akışı simülasyonu.",
      "A synthetic event generator (a Python script emitting a few events per second) or a simulated IoT/clickstream feed.",
    ],
    deliverables: [
      ["Çalışan Eventstream ve KQL veritabanı", "A working Eventstream and KQL database"],
      ["En az 5 KQL sorgusu (pencereleme dahil)", "At least 5 KQL queries, including windowing"],
      ["Gerçek zamanlı pano", "A real-time dashboard"],
      ["Eşik aşımında uyarı kuralı", "An alert rule on threshold breach"],
    ],
    steps: [
      {
        title: ["Olay üreteci yaz", "Write the event generator"],
        body: [
          "Python ile gerçekçi olaylar üreten bir betik yaz (kullanıcı, olay türü, zaman damgası, değer) ve Eventstream uç noktasına gönder.",
          "Write a Python script emitting realistic events (user, event type, timestamp, value) and send them to the Eventstream endpoint.",
        ],
      },
      {
        title: ["KQL ile sorgula", "Query with KQL"],
        body: [
          "Zaman pencereli toplamalar yaz: dakikalık olay sayısı, hareketli ortalama, anomali tespiti. KQL'in `summarize ... by bin(zaman, 1m)` kalıbı bu işin belkemiğidir.",
          "Write time-windowed aggregations: events per minute, moving averages, anomaly detection. KQL's `summarize ... by bin(time, 1m)` pattern is the backbone here.",
        ],
        lang: "sql",
        code: `Olaylar
| where Zaman > ago(1h)
| summarize Adet = count(), Ortalama = avg(Deger)
    by OlayTuru, bin(Zaman, 1m)
| order by Zaman desc`,
      },
      {
        title: ["Pano ve uyarı", "Dashboard and alerting"],
        body: [
          "Real-Time Dashboard oluştur, sorguları görsele bağla ve otomatik yenilemeyi aç. Ardından bir eşik aşıldığında (örneğin hata oranı %5'i geçtiğinde) tetiklenen bir uyarı kur.",
          "Create a Real-Time Dashboard, bind the queries to visuals and turn on auto-refresh. Then add an alert that fires when a threshold is crossed (error rate above 5%, say).",
        ],
      },
      githubStep("fabric-gercek-zamanli-analiz"),
    ],
  }),

  project({
    slug: "fabric-orkestre-edilmis-medallion-hatti",
    track: "microsoft-fabric",
    level: "expert",
    title: ["Orkestre Edilmiş Medallion Hattı", "An Orchestrated Medallion Pipeline"],
    stack: ["Microsoft Fabric", "Data Factory", "PySpark", "Medallion"],
    hours: 12,
    xp: 650,
    summary: [
      "Bronze → Silver → Gold adımlarını elle sırayla çalıştırmak yerine, bağımlılıkları ve zamanlanmış tetikleyicisi olan tek bir Data Factory pipeline'ında birleştir.",
      "Instead of running Bronze → Silver → Gold by hand in order, chain them into a single Data Factory pipeline with dependencies and a scheduled trigger.",
    ],
    dataset: [
      "Herhangi bir ham veri kaynağı (CSV/API); bu patikanın medallion dersindeki örnek akışı temel alabilirsin.",
      "Any raw data source (CSV/API); you can build on this track's medallion lesson's example flow.",
    ],
    deliverables: [
      ["Bronze, Silver, Gold katmanlarını üreten 3 ayrı not defteri", "3 separate notebooks producing the Bronze, Silver and Gold layers"],
      ["Bu 3 not defterini bağımlılıklarla ('yalnızca önceki başarılıysa') zincirleyen bir Data Factory pipeline'ı", "A Data Factory pipeline chaining the 3 notebooks with dependencies (\"only if the previous succeeded\")"],
      ["Günlük çalışacak bir zamanlanmış tetikleyici", "A scheduled trigger to run daily"],
      ["Bir adım başarısız olursa ne olacağını anlatan bir hata senaryosu notu", "A failure-scenario note explaining what happens if a step fails"],
    ],
    steps: [
      {
        title: ["Üç katman not defterini yaz", "Write the three layer notebooks"],
        body: [
          "Bronze (ham veriyi olduğu gibi al), Silver (temizle, tiple, tekilleştir) ve Gold (iş mantığına göre özetle) için ayrı ayrı not defterleri hazırla. Her biri kendi başına elle çalıştırılabilir olmalı.",
          "Prepare separate notebooks for Bronze (land the raw data as-is), Silver (clean, type, deduplicate) and Gold (summarize per business logic). Each should be runnable on its own by hand.",
        ],
      },
      {
        title: ["Pipeline'da zincirle", "Chain them in a pipeline"],
        body: [
          "Yeni bir Data Factory pipeline'ında üç 'Not Defteri Çalıştır' etkinliği ekle. Silver'ı Bronze'a, Gold'u Silver'a 'Başarılı' bağımlılığıyla bağla — bir öncekinin bittiğinden emin olmadan bir sonraki asla başlamamalı.",
          "In a new Data Factory pipeline, add three \"Run Notebook\" activities. Connect Silver to Bronze and Gold to Silver with a \"Succeeded\" dependency — the next step should never start without the previous one confirmed done.",
        ],
      },
      {
        title: ["Zamanlanmış tetikleyici ekle", "Add a scheduled trigger"],
        body: [
          "Pipeline'a günlük çalışacak bir zamanlanmış tetikleyici bağla. Üst üste binmeyi önlemek için eşzamanlılık ayarını kontrol et — bir çalışma normalden uzun sürerse ikinci bir çalışmanın üstüne binmemesi gerekir.",
          "Attach a daily scheduled trigger to the pipeline. Check the concurrency setting to prevent overlap — if one run takes longer than usual, a second run shouldn't stack on top of it.",
        ],
      },
      {
        title: ["Hata senaryosunu düşün ve belgele", "Think through and document the failure scenario"],
        body: [
          "Silver adımı başarısız olursa Gold'un çalışmaması gerektiğini doğrula (bağımlılık ayarını test et: Silver'ı bilerek bozup pipeline'ı çalıştır). Bunu ve genel hata bildirim planını (kim, nasıl haberdar olur) bir notta yaz.",
          "Verify that Gold does NOT run if Silver fails (test the dependency by deliberately breaking Silver and running the pipeline). Write this, plus the general failure-notification plan (who gets notified, how), in a short note.",
        ],
      },
      githubStep("orkestre-edilmis-medallion-hatti"),
    ],
    premium: true,
  }),

  project({
    slug: "fabric-semantic-link-uyum-kontrolu",
    track: "microsoft-fabric",
    level: "expert",
    title: ["Semantic Link ile Uyum Kontrolü", "A Reconciliation Check with Semantic Link"],
    stack: ["Microsoft Fabric", "Semantic Link", "Python", "Power BI"],
    hours: 8,
    xp: 550,
    summary: [
      "Bir Power BI semantic modelindeki ölçüleri Semantic Link ile bir Python not defterine çek ve Gold katmanındaki ham hesaplamayla otomatik karşılaştır.",
      "Pull a Power BI semantic model's measures into a Python notebook with Semantic Link and automatically compare them against the raw calculation in the Gold layer.",
    ],
    dataset: [
      "Zaten yayınlanmış bir Power BI semantic modeli (bu patikanın Gold katmanı örneğinden üretilebilir) ve aynı verinin Gold tablosu.",
      "An already-published Power BI semantic model (can be built from this track's Gold layer example) and the same data's Gold table.",
    ],
    deliverables: [
      ["Semantic Link ile çekilen en az 3 ölçünün pandas DataFrame'i", "A pandas DataFrame of at least 3 measures pulled via Semantic Link"],
      ["Gold tablosundan doğrudan pandas ile hesaplanan aynı 3 metrik", "The same 3 metrics computed directly from the Gold table with pandas"],
      ["İkisini otomatik karşılaştıran bir uyum kontrolü (fark varsa uyarı veren)", "An automated reconciliation check comparing the two (raising a warning on any mismatch)"],
      ["Bulunan bir uyuşmazlığın kök nedenini anlatan bir not (ör. filtre farkı, tarih aralığı farkı)", "A note explaining the root cause of any mismatch found (e.g. a filter difference, a date-range difference)"],
    ],
    steps: [
      {
        title: ["Semantic Link ile ölçüleri çek", "Pull the measures with Semantic Link"],
        body: [
          "`sempy.fabric.evaluate_measure()` ile semantic modelden en az 3 ölçüyü (ör. toplam ciro, müşteri sayısı, ortalama sipariş) uygun bir kırılımla çek.",
          "Use `sempy.fabric.evaluate_measure()` to pull at least 3 measures (e.g. total revenue, customer count, average order) from the semantic model at a suitable breakdown.",
        ],
      },
      {
        title: ["Aynı metrikleri Gold tablosundan hesapla", "Compute the same metrics from the Gold table"],
        body: [
          "Aynı 3 metriği bu kez semantic modele hiç dokunmadan, doğrudan Gold tablosu üzerinde pandas ile hesapla. İki hesaplama bağımsız yollardan aynı sonuca ulaşmalı.",
          "Compute the same 3 metrics this time without touching the semantic model at all, directly on the Gold table with pandas. The two calculations should arrive at the same result via independent paths.",
        ],
      },
      {
        title: ["Otomatik uyum kontrolü yaz", "Write an automated reconciliation check"],
        body: [
          "İki sonucu birleştirip farkı hesapla; fark bir toleransı (ör. yuvarlama hatası payı) aşarsa uyarı bassın. Bu kontrol, tek seferlik bir karşılaştırma değil, her çalıştırıldığında tekrar kullanılabilir bir sağlık kontrolüdür.",
          "Merge the two results and compute the difference; raise a warning if it exceeds a tolerance (a rounding-error margin). This check isn't a one-off comparison — it's a health check reusable every time it runs.",
        ],
      },
      {
        title: ["Uyuşmazlığın kök nedenini bul", "Find the mismatch's root cause"],
        body: [
          "Bilerek bir uyuşmazlık senaryosu yarat (ör. Power BI tarafında bir filtre etkin bırak) ve kontrolün bunu yakaladığını göster. Kök nedeni (filtre, tarih aralığı, NULL işleme farkı) bir notta açıkla — bu, gerçek bir üretim uyuşmazlığını hızlı teşhis etme becerisidir.",
          "Deliberately create a mismatch scenario (e.g. leave a filter active on the Power BI side) and show the check catches it. Explain the root cause (filter, date range, NULL-handling difference) in a note — this is the skill of diagnosing a real production discrepancy quickly.",
        ],
      },
      githubStep("semantic-link-uyum-kontrolu"),
    ],
    premium: true,
  }),

  /* ---------------------------- Excel --------------------------- */
  project({
    slug: "excel-satis-ozeti",
    track: "excel",
    level: "junior",
    title: ["Excel Satış Özeti", "Excel Sales Summary"],
    stack: ["Excel", "Tablolar", "Formüller"],
    hours: 3,
    xp: 120,
    summary: [
      "Dağınık bir satış listesini düzgün bir tabloya çevir, formüllerle özet üret ve tek sayfalık bir özet oluştur.",
      "Turn a messy sales list into a proper table, summarise it with formulas and build a one-page summary.",
    ],
    dataset: [
      "Herhangi bir satış CSV'si veya kendi oluşturduğun 200+ satırlık örnek veri.",
      "Any sales CSV, or a 200+ row sample you create yourself.",
    ],
    deliverables: [
      ["Ctrl+T ile tabloya çevrilmiş, adlandırılmış veri", "Data converted to a named Table with Ctrl+T"],
      ["SUMIFS/COUNTIFS ile kategori ve şehir özeti", "A category and city summary using SUMIFS/COUNTIFS"],
      ["XLOOKUP ile ürün bilgisi eşleştirme", "Product lookup with XLOOKUP"],
      ["Koşullu biçimlendirmeli özet sayfası", "A summary sheet with conditional formatting"],
    ],
    steps: [
      {
        title: ["Veriyi düzgün hale getir", "Make the data tidy"],
        body: [
          "Birleştirilmiş hücreleri aç, başlıkların tek satırda olduğundan emin ol, boş satır ve toplam satırlarını veriden çıkar, sonra `Ctrl+T` ile tabloya çevir ve tabloya anlamlı bir ad ver.",
          "Unmerge cells, ensure headers occupy a single row, remove blank and total rows from the data, then convert with `Ctrl+T` and give the table a meaningful name.",
        ],
      },
      {
        title: ["Özet formüllerini yaz", "Write the summary formulas"],
        body: [
          "Kategori ve şehir bazında toplam ve adet hesapla. Sabit aralık (`A2:A500`) yerine tablo referansı kullan ki yeni satırlar otomatik dahil olsun.",
          "Compute totals and counts by category and city. Use table references instead of fixed ranges (`A2:A500`) so new rows are included automatically.",
        ],
        lang: "javascript",
        code: `=SUMIFS(Satis[Tutar]; Satis[Kategori]; $A2)
=COUNTIFS(Satis[Sehir]; $A2)
=XLOOKUP($A2; Urunler[Kod]; Urunler[Ad]; "bulunamadı")`,
      },
      {
        title: ["Özet sayfasını tasarla", "Design the summary sheet"],
        body: [
          "Ayrı bir sayfa aç: en üstte 4 KPI, altında kategori tablosu ve bir grafik. Sayıları binlik ayıracıyla biçimlendir, negatifleri kırmızı yap.",
          "Use a separate sheet: 4 KPIs at the top, a category table and one chart below. Format numbers with thousands separators and colour negatives red.",
        ],
      },
      githubStep("excel-satis-ozeti"),
    ],
  }),

  project({
    slug: "excel-aylik-rapor",
    track: "excel",
    level: "mid",
    title: ["Otomatik Aylık Rapor", "Automated Monthly Report"],
    stack: ["Excel", "Power Query", "PivotTable"],
    hours: 5,
    xp: 200,
    summary: [
      "Her ay gelen yeni dosyayı tek tıkla rapora dönüştüren, Power Query ve pivot tabanlı bir rapor şablonu kur.",
      "Build a Power Query and pivot based template that turns each month's new file into a report with one click.",
    ],
    dataset: [
      "Aynı formatta en az 3 aylık dosya (kendin de bölebilirsin).",
      "At least three monthly files in the same format (you can split one yourself).",
    ],
    deliverables: [
      ["Klasörden okuyan Power Query sorgusu", "A Power Query that reads from a folder"],
      ["Slicer ve timeline ile bağlanmış 3 pivot", "3 pivots wired to slicers and a timeline"],
      ["Tek sayfalık pano", "A single-page dashboard"],
      ["\"Nasıl güncellenir\" talimatı", "A \"how to refresh\" instruction sheet"],
    ],
    steps: [
      {
        title: ["Klasörden okuma kur", "Read from a folder"],
        body: [
          "`Get Data → From Folder` ile klasördeki tüm dosyaları birleştir. Yeni ay dosyasını klasöre atıp `Refresh All` dediğinde rapor kendiliğinden güncellensin.",
          "Use `Get Data → From Folder` to combine every file in the folder. Dropping next month's file in and hitting `Refresh All` should update the whole report.",
        ],
      },
      {
        title: ["Pivotları ve panoyu kur", "Build the pivots and dashboard"],
        body: [
          "Kategori, şehir ve zaman kırılımlarında üç pivot oluştur. Tek bir slicer'ı `Report Connections` ile üçüne birden bağla.",
          "Create three pivots by category, city and time. Wire one slicer to all three with `Report Connections`.",
        ],
      },
      {
        title: ["Talimatı yaz", "Write the instructions"],
        body: [
          "Raporun ilk sayfasına \"her ay ne yapılacak\" adımlarını yaz. Bu şablonu senden başka birinin de kullanabilmesi, işin asıl teslimatıdır.",
          "Put the \"what to do each month\" steps on the first sheet. Someone other than you being able to use this template is the real deliverable.",
        ],
      },
      githubStep("excel-otomatik-aylik-rapor"),
    ],
  }),

  project({
    slug: "excel-otomatik-pano",
    track: "excel",
    level: "senior",
    title: ["Power Pivot Veri Modeli", "A Power Pivot Data Model"],
    stack: ["Excel", "Power Pivot", "DAX"],
    hours: 8,
    xp: 320,
    summary: [
      "Birden çok tabloyu Power Pivot veri modelinde ilişkilendir, DAX ölçüleri yaz ve Excel'in içinde tam bir BI çözümü kur.",
      "Relate several tables in a Power Pivot data model, write DAX measures and build a full BI solution inside Excel.",
    ],
    dataset: [
      "En az 3 tablo: satış, ürün, müşteri. Satış tablosu 100 bin+ satır olursa modelin faydası daha net görülür.",
      "At least 3 tables: sales, product, customer. With 100k+ rows in sales the benefit of the model becomes obvious.",
    ],
    deliverables: [
      ["İlişkilendirilmiş veri modeli diyagramı", "A related data model diagram"],
      ["En az 6 DAX ölçüsü", "At least 6 DAX measures"],
      ["Model üzerinden kurulmuş pivot panosu", "A pivot dashboard built on the model"],
      ["Dosya boyutu karşılaştırması (düz tablo vs. model)", "A file size comparison (flat table vs. model)"],
    ],
    steps: [
      {
        title: ["Modeli kur", "Build the model"],
        body: [
          "Tabloları veri modeline ekle (`Add to Data Model`), Diagram View'da ilişkileri kur ve bir tarih tablosu ekleyip işaretle.",
          "Add the tables to the data model (`Add to Data Model`), create relationships in Diagram View, then add and mark a date table.",
        ],
      },
      {
        title: ["Ölçüleri yaz", "Write the measures"],
        body: [
          "Ciro, sipariş sayısı, ortalama sepet, YTD ve geçen yıl karşılaştırması. Söz dizimi Power BI ile birebir aynıdır — buradaki emeğin oraya doğrudan taşınır.",
          "Revenue, order count, average basket, YTD and a prior-year comparison. The syntax is identical to Power BI — the work here transfers directly.",
        ],
      },
      {
        title: ["Panoyu kur ve karşılaştır", "Build the dashboard and compare"],
        body: [
          "Model üzerinden pivotlar oluştur. Aynı veriyi düz tablo olarak da kaydedip iki dosyanın boyutunu ve açılma süresini karşılaştır — VertiPaq sıkıştırmasının etkisini sayıyla göster.",
          "Create pivots on the model. Also save the same data as a flat table and compare file size and load time — quantify what VertiPaq compression buys you.",
        ],
      },
      githubStep("excel-power-pivot-modeli"),
    ],
  }),

  project({
    slug: "excel-lambda-fonksiyon-kutuphanesi",
    track: "excel",
    level: "expert",
    title: ["LAMBDA Fonksiyon Kütüphanesi", "A LAMBDA Function Library"],
    stack: ["Excel", "LAMBDA", "Ad Yöneticisi"],
    hours: 6,
    xp: 400,
    summary: [
      "Ekibinin tekrar tekrar yazdığı 5 formülü LAMBDA ile kendi fonksiyonlarına çevir, belgeleyip paylaşılabilir bir kütüphane hâline getir.",
      "Turn 5 formulas your team keeps rewriting into your own LAMBDA functions, documented and packaged as a shareable library.",
    ],
    dataset: [
      "Kendi işyerinden veya bu platformdaki derslerden tanıdık en az 5 tekrar eden hesaplama (KDV, komisyon, yaş hesabı, hafta numarası gibi).",
      "At least 5 recurring calculations from your own workplace or familiar from this platform's lessons (VAT, commission, age calculation, week number).",
    ],
    deliverables: [
      ["Ad Yöneticisi'nde tanımlanmış, isimlendirilmiş en az 5 LAMBDA fonksiyonu", "At least 5 named LAMBDA functions defined in the Name Manager"],
      ["Her fonksiyon için 1 satırlık açıklama ve örnek çağrı", "A one-line description and example call for each function"],
      ["Fonksiyonların çalıştığını gösteren bir test sayfası", "A test sheet demonstrating each function works"],
      ["Kütüphaneyi başka bir dosyaya taşıma talimatı (Ad Yöneticisi'nden dışa aktarma/kopyalama)", "Instructions for moving the library to another file (exporting/copying from Name Manager)"],
    ],
    steps: [
      {
        title: ["5 tekrar eden formülü listele", "List 5 recurring formulas"],
        body: [
          "Kendi çalışmalarında veya bu platformdaki derslerde en az 3 farklı yerde kopyaladığın formülleri bul. Her biri iyi bir LAMBDA adayıdır — ne kadar çok tekrarlanıyorsa, LAMBDA'nın kazancı o kadar büyük.",
          "Find formulas you've copied in at least 3 different places, either in your own work or across this platform's lessons. Each one is a good LAMBDA candidate — the more it repeats, the bigger LAMBDA's payoff.",
        ],
      },
      {
        title: ["Her formülü LAMBDA'ya çevir ve isimlendir", "Convert each formula to a LAMBDA and name it"],
        body: [
          "Formülü parametrelere ayır (hangi değerler her çağrıda değişecek?), `=LAMBDA(parametre1; parametre2; ...formül...)` olarak yaz ve Ad Yöneticisi'nde anlamlı bir isimle (`KOMISYON`, `YAS_HESAPLA`) kaydet.",
          "Break the formula into parameters (which values change on every call?), write it as `=LAMBDA(param1; param2; ...formula...)`, and save it under a meaningful name (`COMMISSION`, `CALC_AGE`) in the Name Manager.",
        ],
        lang: "excel",
        code: `# Ad Yöneticisi'nde "YAS_HESAPLA" adıyla kaydedilir:
=LAMBDA(dogum_tarihi; DATEDIF(dogum_tarihi; BUGÜN(); "y"))

# Kullanımı:
=YAS_HESAPLA(B2)`,
      },
      {
        title: ["Test sayfası kur", "Build a test sheet"],
        body: [
          "Ayrı bir sayfada her fonksiyonu birkaç farklı girdiyle çağır ve beklenen sonuçla karşılaştır. Bu, hem fonksiyonların doğru çalıştığını kanıtlar hem de kütüphaneyi devralacak birine canlı bir örnek sunar.",
          "On a separate sheet, call each function with a few different inputs and compare against the expected result. This both proves the functions work and gives anyone inheriting the library a live example.",
        ],
      },
      {
        title: ["Belgele ve paylaşılabilir hâle getir", "Document it and make it shareable"],
        body: [
          "Her fonksiyon için tek satırlık bir açıklama yaz (ne yapar, parametreleri ne). LAMBDA isimleri bir dosyaya özgüdür — kütüphaneyi başka bir dosyada kullanmak için Ad Yöneticisi'nden isimleri o dosyaya kopyalaman/dışa aktarman gerektiğini not et.",
          "Write a one-line description for each function (what it does, what its parameters are). LAMBDA names are file-specific — note that using the library in another file means copying/exporting the names from the Name Manager into that file.",
        ],
      },
      githubStep("lambda-fonksiyon-kutuphanesi"),
    ],
    premium: true,
  }),

  project({
    slug: "excel-vba-otomatik-rapor-dugmesi",
    track: "excel",
    level: "expert",
    title: ["VBA ile Otomatik Rapor Düğmesi", "An Automated Report Button with VBA"],
    stack: ["Excel", "VBA", "Makro"],
    hours: 7,
    xp: 450,
    summary: [
      "Her hafta elle yaptığın çok adımlı bir temizlik/rapor işini kaydet, VBA Düzenleyicisi'nde sadeleştir ve tek tıkla çalışan bir düğmeye bağla.",
      "Record a multi-step cleanup/report task you do by hand every week, simplify it in the VBA Editor, and wire it to a one-click button.",
    ],
    dataset: [
      "Kendi işinden düzenli tekrar eden bir Excel işlemi (haftalık satış özeti, aylık filtre temizliği gibi); yoksa bu patikadaki excel-otomatik-aylik-rapor projesinin verisini kullan.",
      "A recurring Excel task from your own work (a weekly sales summary, a monthly filter cleanup); if you don't have one, reuse this track's excel-otomatik-aylik-rapor project's data.",
    ],
    deliverables: [
      ["Makro Kaydet ile üretilmiş ham VBA kodu", "The raw VBA code produced by Record Macro"],
      ["VBA Düzenleyicisi'nde sadeleştirilmiş, gereksiz Select/Activate satırları temizlenmiş sürüm", "A version cleaned up in the VBA Editor with unnecessary Select/Activate lines removed"],
      ["Makroyu çalıştıran bir düğme/şekil", "A button/shape that runs the macro"],
      ["Öncesi (elle, kaç dakika) / sonrası (tek tık) süre karşılaştırması", "A before (by hand, how many minutes) / after (one click) time comparison"],
    ],
    steps: [
      {
        title: ["İşlemi Makro Kaydet ile kaydet", "Record the task with Record Macro"],
        body: [
          "Geliştirici sekmesinde Makro Kaydet'e bas, işlemi normalde yaptığın gibi elle yap (filtrele, sil, biçimlendir, kaydet), sonra kaydı durdur. Bu, kaba ama çalışan bir ilk sürüm üretir.",
          "Click Record Macro on the Developer tab, do the task by hand exactly as you normally would (filter, delete, format, save), then stop recording. This produces a rough but working first version.",
        ],
      },
      {
        title: ["VBA Düzenleyicisi'nde kodu oku ve sadeleştir", "Read and simplify the code in the VBA Editor"],
        body: [
          "Alt+F11 ile VBA Düzenleyicisi'ni aç, üretilen kodu satır satır oku. Gereksiz `.Select`/`.Activate` çiftlerini kaldır — çoğu satır, bir nesneyi seçip sonra ona işlem yapmak yerine doğrudan işlem yapılarak tek satıra indirilebilir.",
          "Open the VBA Editor with Alt+F11 and read the generated code line by line. Remove unnecessary `.Select`/`.Activate` pairs — most lines can shrink to one by acting on an object directly instead of selecting it first.",
        ],
        lang: "vba",
        code: `' Önce (kayıttan çıkan hâli):
Range("A1").Select
Selection.AutoFilter Field:=3, Criteria1:="İptal"

' Sonra (sadeleştirilmiş):
Range("A1").AutoFilter Field:=3, Criteria1:="İptal"`,
      },
      {
        title: ["Düğmeye bağla", "Wire it to a button"],
        body: [
          "Ekle → Şekiller ile bir düğme ekle, sağ tıkla \"Makro Ata\" ile makroyu bağla. Düğmeye işlemi anlatan bir metin yaz (\"Aylık Raporu Temizle\") — hangi tuşa basacağını bilmeyen biri bile kullanabilmeli.",
          "Insert a shape via Insert → Shapes, right-click it and \"Assign Macro\" to wire it up. Label the button with what it does (\"Clean Monthly Report\") — even someone who's never touched VBA should be able to use it.",
        ],
      },
      {
        title: ["Zaman kazancını ölç", "Measure the time saved"],
        body: [
          "İşlemi elle yaparken kaç dakika sürdüğünü, düğmeyle kaç saniye sürdüğünü not et. Haftalık/aylık tekrar sayısıyla çarpıp yıllık kazanılan saati hesapla — bu, otomasyonun iş değerini somutlaştırır.",
          "Note how many minutes the task took by hand versus how many seconds it takes with the button. Multiply by how often it repeats (weekly/monthly) to compute hours saved per year — this makes the automation's business value concrete.",
        ],
      },
      githubStep("vba-otomatik-rapor-dugmesi"),
    ],
    premium: true,
  }),

  /* ------------------------- İstatistik ------------------------- */
  project({
    slug: "istatistik-kesif-analizi",
    track: "istatistik",
    level: "junior",
    title: ["İstatistiksel Keşif Analizi", "Statistical Exploratory Analysis"],
    stack: ["Python", "pandas", "seaborn", "scipy"],
    hours: 6,
    xp: 220,
    summary: [
      "Bir veri setini istatistiksel olarak betimle: dağılımlar, aykırı değerler, korelasyonlar ve bunların ne anlama geldiği.",
      "Describe a dataset statistically: distributions, outliers, correlations — and what each of them actually means.",
    ],
    dataset: [
      "Kaggle \"Telco Customer Churn\", \"House Prices\" veya TÜİK'ten indirdiğin bir veri seti.",
      "Kaggle's \"Telco Customer Churn\", \"House Prices\", or a dataset from your national statistics office.",
    ],
    deliverables: [
      ["Her sayısal değişken için dağılım grafiği ve özet", "A distribution plot and summary for each numeric variable"],
      ["Korelasyon matrisi ve yorumu", "A correlation matrix with interpretation"],
      ["Aykırı değer analizi ve alınan kararlar", "An outlier analysis and the decisions taken"],
      ["5 maddelik bulgu listesi", "A 5-bullet findings list"],
    ],
    steps: [
      {
        title: ["Tek değişkenli analiz", "Univariate analysis"],
        body: [
          "Her sayısal değişken için histogram ve kutu grafiği çiz; ortalama, medyan, standart sapma ve çarpıklığı raporla. Ortalama ile medyan arasındaki fark büyükse dağılım çarpıktır ve bunu not et.",
          "For each numeric variable plot a histogram and a box plot; report mean, median, standard deviation and skew. A large gap between mean and median means the distribution is skewed — write that down.",
        ],
      },
      {
        title: ["İki değişkenli analiz", "Bivariate analysis"],
        body: [
          "Korelasyon matrisi çıkar ve ısı haritası çiz. Güçlü korelasyonları dağılım grafiğiyle doğrula — korelasyon katsayısı doğrusal olmayan ilişkileri göremez.",
          "Compute a correlation matrix and plot it as a heatmap. Verify strong correlations with scatter plots — the coefficient cannot see non-linear relationships.",
        ],
        lang: "python",
        code: `import seaborn as sns
korelasyon = df.select_dtypes("number").corr()
sns.heatmap(korelasyon, annot=True, fmt=".2f", cmap="RdBu_r", center=0)`,
      },
      {
        title: ["Aykırı değerleri incele", "Investigate the outliers"],
        body: [
          "IQR kuralıyla aykırı değerleri işaretle ve **tek tek bak**: hata mı, gerçek mi? Kararını ve gerekçesini yaz. Bu adım, analizi güvenilir kılan şeydir.",
          "Flag outliers with the IQR rule and **look at them individually**: error or real? Record your decision and the reason. This step is what makes the analysis trustworthy.",
        ],
      },
      {
        title: ["Bulguları yaz", "Write the findings"],
        body: [
          "\"Korelasyon nedensellik değildir\" cümlesini bir kez daha hatırla ve bulgularını buna göre yaz: \"X ile Y arasında güçlü ilişki var\" evet, \"X, Y'ye sebep oluyor\" hayır.",
          "Remind yourself once more that correlation is not causation, and phrase the findings accordingly: \"X and Y are strongly related\" yes, \"X causes Y\" no.",
        ],
      },
      githubStep("istatistiksel-kesif-analizi"),
    ],
  }),

  project({
    slug: "istatistik-ab-testi",
    track: "istatistik",
    level: "senior",
    title: ["A/B Testi Tasarımı ve Analizi", "A/B Test Design and Analysis"],
    stack: ["Python", "scipy", "statsmodels"],
    hours: 8,
    xp: 380,
    summary: [
      "Bir A/B testini baştan tasarla: örneklem büyüklüğünü hesapla, testi analiz et ve sonucu karar verilebilir bir rapora çevir.",
      "Design an A/B test from scratch: compute the sample size, analyse the result and turn it into a report someone can decide on.",
    ],
    dataset: [
      "Kaggle \"AB Testing\" veri setleri veya kendi ürettiğin simülasyon verisi.",
      "Kaggle's A/B testing datasets, or simulation data you generate yourself.",
    ],
    deliverables: [
      ["Güç analizi ile hesaplanmış örneklem büyüklüğü", "A sample size computed via power analysis"],
      ["Test sonucu: p-değeri, etki büyüklüğü, güven aralığı", "The result: p-value, effect size and confidence interval"],
      ["Karar önerisi ve gerekçesi", "A recommendation with its rationale"],
      ["Testin sınırlarını anlatan bölüm", "A section on the limits of the test"],
    ],
    steps: [
      {
        title: ["Hipotezi ve metriği tanımla", "Define the hypothesis and metric"],
        body: [
          "Tek bir **birincil metrik** seç ve minimum anlamlı etkiyi (MDE) belirle: \"dönüşüm oranını en az 2 puan artırmalı\". Bunu testten **önce** yazmak, sonuçları kendine göre yorumlamanı engeller.",
          "Pick a single **primary metric** and state the minimum detectable effect: \"must lift conversion by at least 2 points\". Writing this **before** the test stops you from reinterpreting the result to suit yourself.",
        ],
      },
      {
        title: ["Örneklem büyüklüğünü hesapla", "Compute the sample size"],
        body: [
          "Güç analizi ile her gruba kaç kullanıcı gerektiğini bul (tipik: α=0,05, güç=0,80). Bu sayı ve buna karşılık gelen süre, testin ne zaman biteceğini **önceden** belirler.",
          "Use power analysis to find how many users each group needs (typically α=0.05, power=0.80). That number, and the duration it implies, fixes the end date of the test **in advance**.",
        ],
        lang: "python",
        code: `from statsmodels.stats.power import NormalIndPower
from statsmodels.stats.proportion import proportion_effectsize

etki = proportion_effectsize(0.10, 0.12)   # %10 -> %12
n = NormalIndPower().solve_power(
    effect_size=etki, alpha=0.05, power=0.80, alternative="two-sided"
)
print(f"Grup başına gereken kullanıcı: {n:.0f}")`,
      },
      {
        title: ["Testi analiz et", "Analyse the test"],
        body: [
          "Oranlar için ki-kare veya iki oran z-testi, sürekli metrikler için Welch t-testi kullan. p-değeriyle birlikte **etki büyüklüğünü ve güven aralığını** mutlaka raporla.",
          "Use a chi-square or two-proportion z-test for rates, and Welch's t-test for continuous metrics. Always report the **effect size and confidence interval** alongside p.",
        ],
      },
      {
        title: ["Kararı yaz", "Write the decision"],
        body: [
          "\"İstatistiksel olarak anlamlı\" ile \"iş açısından anlamlı\" farkını açıkça yaz. %0,3'lük bir artış p<0,001 çıkabilir ama uygulama maliyetini karşılamıyorsa cevap yine hayırdır.",
          "Spell out the difference between \"statistically significant\" and \"practically significant\". A 0.3% lift can come back at p<0.001 and still be a no if it does not cover the cost of shipping it.",
        ],
      },
      githubStep("ab-testi-tasarimi"),
    ],
  }),

  project({
    slug: "istatistik-bootstrap-guven-araligi",
    track: "istatistik",
    level: "expert",
    title: ["Bootstrap: Formülsüz Güven Aralıkları", "Bootstrap: Formula-Free Confidence Intervals"],
    stack: ["Python", "Bootstrap", "NumPy"],
    hours: 8,
    xp: 550,
    summary: [
      "Çarpık bir metrik (kullanıcı başı gelir gibi) için hem klasik formülle hem bootstrap ile güven aralığı hesapla, ikisinin ne zaman anlaşıp ne zaman ayrıştığını göster.",
      "Compute a confidence interval both the classic formula way and via bootstrap for a skewed metric (like revenue per user), and show when the two agree and when they diverge.",
    ],
    dataset: [
      "Kullanıcı başı gelir, oturum süresi gibi sağa çarpık (birkaç yüksek değerin çoğunluğu çektiği) bir metrik; kendi ürün verinden veya Kaggle'dan.",
      "A right-skewed metric (a handful of high values pulling the rest) such as revenue per user or session duration; from your own product data or Kaggle.",
    ],
    deliverables: [
      ["Metriğin dağılım grafiği ve çarpıklık ölçümü", "A distribution plot of the metric with its skewness measured"],
      ["Klasik formülle (ortalama ± 1,96×standart hata) hesaplanan %95 GA", "A 95% CI computed with the classic formula (mean ± 1.96×standard error)"],
      ["Bootstrap ile (en az 5000 yeniden örneklem) hesaplanan %95 GA", "A 95% CI computed via bootstrap (at least 5000 resamples)"],
      ["İki aralığın karşılaştırması ve ne zaman güvenilmemesi gerektiğine dair not", "A comparison of the two intervals and a note on when not to trust the formula one"],
    ],
    steps: [
      {
        title: ["Metriği seç ve çarpıklığını ölç", "Pick the metric and measure its skew"],
        body: [
          "Sağa çarpık bir metrik seç (birkaç büyük harcayan kullanıcının çektiği bir ortalama tipik örnektir). Histogramını çiz ve çarpıklık katsayısını hesapla — klasik formül, normal dağılıma yakın veri varsayar; yüksek çarpıklıkta bu varsayım çöker.",
          "Pick a right-skewed metric (a mean pulled by a few big-spending users is a typical example). Plot its histogram and compute the skewness coefficient — the classic formula assumes near-normal data; with high skew that assumption breaks down.",
        ],
      },
      {
        title: ["Klasik formülle güven aralığı", "Confidence interval via the classic formula"],
        body: [
          "`ortalama ± 1,96 × (standart_sapma / sqrt(n))` ile %95 güven aralığını hesapla. Bu formül hızlıdır ama dağılımın normale yakın olduğunu **varsayar**.",
          "Compute the 95% CI with `mean ± 1.96 × (std / sqrt(n))`. This formula is fast, but it **assumes** the distribution is close to normal.",
        ],
      },
      {
        title: ["Bootstrap ile güven aralığı", "Confidence interval via bootstrap"],
        body: [
          "Aynı veriden en az 5000 kez yerine koyarak yeniden örnekle, her seferinde ortalamayı hesapla ve %2,5/%97,5 yüzdelik dilimlerini al. Bu yöntem dağılım şekli hakkında hiçbir varsayım yapmaz.",
          "Resample the same data with replacement at least 5000 times, computing the mean each time, then take the 2.5th/97.5th percentiles. This method makes no assumption about the shape of the distribution.",
        ],
        lang: "python",
        code: `import numpy as np

rng = np.random.default_rng(42)
yeniden_ortalamalar = [
    rng.choice(veri, size=len(veri), replace=True).mean()
    for _ in range(5000)
]
alt, ust = np.percentile(yeniden_ortalamalar, [2.5, 97.5])
print(f"Bootstrap %95 GA: {alt:.2f} - {ust:.2f}")`,
      },
      {
        title: ["Karşılaştır ve yorumla", "Compare and interpret"],
        body: [
          "İki aralığı yan yana koy. Çarpıklık yüksekse bootstrap aralığı genelde asimetriktir (formül aralığı her zaman simetriktir) — bu fark, formülün neyi kaçırdığının somut kanıtıdır. Raporunda hangi aralığa güveneceğini ve nedenini yaz.",
          "Place the two intervals side by side. With high skew the bootstrap interval is usually asymmetric (the formula interval is always symmetric) — that difference is concrete evidence of what the formula misses. In your report, state which interval you'd trust and why.",
        ],
      },
      githubStep("bootstrap-guven-araligi"),
    ],
    premium: true,
  }),

  project({
    slug: "istatistik-coklu-metrik-paneli",
    track: "istatistik",
    level: "expert",
    title: ["Çoklu Metrik Paneli: Yanlış Keşifleri Kontrol Altında Tutmak", "Multi-Metric Panel: Keeping False Discoveries in Check"],
    stack: ["Python", "Bonferroni", "İstatistiksel İzleme Planı"],
    hours: 9,
    xp: 600,
    summary: [
      "15-20 metriği aynı anda test eden bir deney panelini ele al: Bonferroni düzeltmesi uygula ve testi ne zaman/nasıl kontrol edeceğine dair önceden yazılmış bir izleme planı kur.",
      "Take an experiment dashboard that tests 15-20 metrics at once: apply the Bonferroni correction and set up a pre-written monitoring plan for when and how you'll check the test.",
    ],
    dataset: [
      "Bir deneyin (A/B testi) 15-20 metrikli sonuç tablosu; her metrik için p-değeri, etki büyüklüğü. Kendi verin yoksa gerçekçi bir simülasyon üret.",
      "A 15-20 metric result table from an experiment (A/B test): p-value and effect size per metric. If you don't have your own, generate a realistic simulation.",
    ],
    deliverables: [
      ["Düzeltmesiz vs Bonferroni-düzeltmeli 'anlamlı' metrik listesi karşılaştırması", "A comparison of the 'significant' metric list, uncorrected vs Bonferroni-corrected"],
      ["Hangi metriklerin birincil/ikincil olduğuna dair önceden yazılmış bir sınıflandırma", "A pre-written classification of which metrics are primary vs secondary"],
      ["Sabit ufuklu (fixed-horizon) bir izleme planı: ne zaman, kaç kez kontrol edilecek", "A fixed-horizon monitoring plan: when and how many times the test will be checked"],
      ["'Neden erken durmadık' başlıklı 1 sayfalık gerekçe notu", "A one-page rationale titled \"why we didn't stop early\""],
    ],
    steps: [
      {
        title: ["Metrikleri birincil/ikincil olarak sınıflandır", "Classify metrics as primary or secondary"],
        body: [
          "Testten ÖNCE (ya da bu proje kapsamında, analizden önce), 15-20 metrikten yalnızca 1-2 tanesini **birincil karar metriği** olarak işaretle; geri kalanı **keşifsel** say. Bu ayrım, hangi metriklere ne kadar sıkı bir eşik uygulayacağını belirler.",
          "BEFORE the test (or, within this project, before the analysis), mark only 1-2 of the 15-20 metrics as the **primary decision metric**; treat the rest as **exploratory**. This split determines how strict a threshold applies to which metric.",
        ],
      },
      {
        title: ["Bonferroni düzeltmesini uygula", "Apply the Bonferroni correction"],
        body: [
          "İkincil/keşifsel metriklere Bonferroni düzeltmesi (`α / n`) uygula. Birincil metriğe düzeltme gerekmez — zaten tek bir karar testi. Düzeltmesiz ve düzeltmeli 'anlamlı' listelerini yan yana koy; farkı göstermek raporun en güçlü parçasıdır.",
          "Apply the Bonferroni correction (`α / n`) to the secondary/exploratory metrics. The primary metric needs no correction — it's already a single decision test. Put the uncorrected and corrected 'significant' lists side by side; showing that gap is the most convincing part of the report.",
        ],
        lang: "python",
        code: `n_ikincil = len(ikincil_metrikler)
esik = 0.05 / n_ikincil

duzeltmesiz = [m for m in ikincil_metrikler if m["p"] < 0.05]
duzeltilmis = [m for m in ikincil_metrikler if m["p"] < esik]

print(f"Düzeltmesiz 'anlamlı': {len(duzeltmesiz)}")
print(f"Bonferroni sonrası 'anlamlı': {len(duzeltilmis)}")`,
      },
      {
        title: ["İzleme planını önceden yaz", "Write the monitoring plan in advance"],
        body: [
          "Testin ne zaman biteceğini (tarih veya örneklem büyüklüğü) ve sonuca yalnızca o noktada bakılacağını yaz. Sürekli izleme gerçekten gerekliyse, bunun için tasarlanmamış bir sabit eşiği (α=0,05) günlük kontrol etmenin peeking tuzağı olduğunu raporda açıkça belirt.",
          "Write down when the test will end (a date or sample size) and that the result will only be looked at then. If continuous monitoring is genuinely needed, explicitly note in the report that checking a plain fixed threshold (α=0.05) daily — when it wasn't designed for that — is the peeking trap.",
        ],
      },
      {
        title: ["Gerekçe notunu yaz", "Write the rationale note"],
        body: [
          "Test bitmeden önce ekipten biri erken bir 'anlamlı' sinyal görüp durdurmak isteseydi ne cevap verirdin? Bu senaryoyu ve neden izleme planına sadık kalman gerektiğini bir sayfada anlat — bu, gelecekteki bir tartışmada elinde hazır bir belge olur.",
          "If someone on the team wanted to stop early after seeing a 'significant' signal before the test ended, what would you say? Write that scenario and why sticking to the monitoring plan matters, in one page — this becomes a ready document for a future argument.",
        ],
      },
      githubStep("coklu-metrik-paneli"),
    ],
    premium: true,
  }),

  /* ----------------------- Makine Öğrenmesi --------------------- */
  project({
    slug: "ml-musteri-kaybi",
    track: "machine-learning",
    level: "junior",
    title: ["Müşteri Kaybı (Churn) Tahmini", "Customer Churn Prediction"],
    stack: ["Python", "scikit-learn", "pandas"],
    hours: 10,
    xp: 400,
    summary: [
      "Hangi müşterilerin ayrılacağını tahmin eden bir sınıflandırma modeli kur, doğru metrikle değerlendir ve iş kararına bağla.",
      "Build a classification model that predicts which customers will churn, evaluate it with the right metric and tie it to a business decision.",
    ],
    dataset: [
      "Kaggle \"Telco Customer Churn\" (7.043 satır, 21 sütun) — dengesiz sınıf yapısıyla gerçekçi bir alıştırma.",
      "Kaggle's \"Telco Customer Churn\" (7,043 rows, 21 columns) — realistically imbalanced.",
    ],
    deliverables: [
      ["Basit kural referansı (baseline) ve model karşılaştırması", "A simple rule baseline compared against the model"],
      ["Pipeline içinde ön işleme + model", "Preprocessing and model inside one pipeline"],
      ["Karışıklık matrisi, precision/recall, ROC-AUC", "A confusion matrix, precision/recall and ROC-AUC"],
      ["Değişken önemleri ve iş yorumu", "Feature importances plus a business interpretation"],
    ],
    steps: [
      {
        title: ["Baseline'ı kur", "Establish the baseline"],
        body: [
          "Model kurmadan önce basit bir kural yaz (\"aylık sözleşmeli + 12 aydan yeni = riskli\") ve skorunu ölç. Modelin bunu geçemiyorsa gerekli değildir.",
          "Before any model, write a simple rule (\"month-to-month contract + under 12 months tenure = at risk\") and score it. If your model cannot beat it, the model is not needed.",
        ],
      },
      {
        title: ["Pipeline kur", "Build the pipeline"],
        body: [
          "Sayısal ve kategorik sütunları `ColumnTransformer` ile ayrı işle, hepsini bir `Pipeline` içine koy. Bu, veri sızıntısını yapısal olarak imkânsız kılar.",
          "Handle numeric and categorical columns separately with a `ColumnTransformer` and wrap everything in a `Pipeline`. This makes data leakage structurally impossible.",
        ],
      },
      {
        title: ["Eşiği iş kararına göre ayarla", "Tune the threshold to the decision"],
        body: [
          "Varsayılan 0,5 eşiği neredeyse hiçbir zaman doğru değildir. Kampanya bütçen 1.000 kişiye yetiyorsa en yüksek olasılıklı 1.000 kişiyi seç ve bu eşikteki precision/recall'u raporla.",
          "The default 0.5 threshold is almost never right. If your campaign budget reaches 1,000 people, take the 1,000 highest-probability customers and report precision/recall at that threshold.",
        ],
        lang: "python",
        code: `olasilik = boru.predict_proba(X_test)[:, 1]
esik = np.quantile(olasilik, 1 - 1000 / len(olasilik))
secilen = olasilik >= esik
print("Seçilen:", secilen.sum(),
      "Gerçek churn:", y_test[secilen].sum(),
      "Precision:", y_test[secilen].mean().round(3))`,
      },
      {
        title: ["İş değerini hesapla", "Quantify the business value"],
        body: [
          "Yakalanan müşteri × ortalama yaşam boyu değer × kampanya başarı oranı − kampanya maliyeti. Bu tek hesap, projeyi teknik bir alıştırmadan iş çıktısına dönüştürür.",
          "Customers caught × average lifetime value × campaign success rate − campaign cost. That single calculation turns the project from a technical exercise into a business outcome.",
        ],
      },
      githubStep("musteri-kaybi-tahmini"),
    ],
  }),

  project({
    slug: "ml-talep-tahmini",
    track: "machine-learning",
    level: "senior",
    title: ["Zaman Serisi Talep Tahmini", "Time Series Demand Forecasting"],
    stack: ["Python", "scikit-learn", "Prophet", "statsmodels"],
    hours: 14,
    xp: 550,
    summary: [
      "Geçmiş satış verisinden gelecek talebi tahmin et; mevsimsellik, trend ve tatilleri modelle, tahmin hatasını dürüstçe ölç.",
      "Forecast future demand from historical sales; model seasonality, trend and holidays, and measure the error honestly.",
    ],
    dataset: [
      "Kaggle \"Store Item Demand\" veya \"Rossmann Store Sales\" — ikisi de mevsimsellik ve tatil etkisi içerir.",
      "Kaggle's \"Store Item Demand\" or \"Rossmann Store Sales\" — both include seasonality and holiday effects.",
    ],
    deliverables: [
      ["Zaman serisi ayrıştırması (trend, mevsimsellik, artık)", "A time series decomposition (trend, seasonality, residual)"],
      ["En az 3 model karşılaştırması (naif, istatistiksel, ML)", "A comparison of at least 3 models (naive, statistical, ML)"],
      ["Zaman bazlı çapraz doğrulama sonuçları", "Time-based cross-validation results"],
      ["Tahmin aralıklarıyla birlikte 30 günlük tahmin", "A 30-day forecast with prediction intervals"],
    ],
    steps: [
      {
        title: ["Seriyi ayrıştır", "Decompose the series"],
        body: [
          "Trend, mevsimsellik ve artığı ayır; durağanlık testini uygula. Haftalık ve yıllık mevsimselliğin ikisi de olabilir — hangisinin baskın olduğunu görmeden model seçme.",
          "Separate trend, seasonality and residual, and test for stationarity. Weekly and yearly seasonality can both be present — do not pick a model before you know which dominates.",
        ],
      },
      {
        title: ["Naif referansı kur", "Set the naive baseline"],
        body: [
          "\"Yarın bugünle aynı olacak\" ve \"bu hafta geçen haftayla aynı olacak\" tahminlerinin hatasını ölç. Karmaşık modelin bunu **ne kadar** geçtiğini göstermek, projenin en ikna edici kısmıdır.",
          "Measure the error of \"tomorrow equals today\" and \"this week equals last week\". Showing by **how much** the complex model beats them is the most persuasive part of the project.",
        ],
      },
      {
        title: ["Zaman bazlı doğrulama kullan", "Use time-based validation"],
        body: [
          "Zaman serisinde rastgele bölme **yasaktır** — geleceği görüp geçmişi tahmin etmiş olursun. `TimeSeriesSplit` ile kayan pencere kullan ve MAE/MAPE'yi her katmanda ayrı raporla.",
          "Random splits are **forbidden** in time series — you would be predicting the past having seen the future. Use `TimeSeriesSplit` with a rolling window and report MAE/MAPE per fold.",
        ],
        lang: "python",
        code: `from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import mean_absolute_error

tscv = TimeSeriesSplit(n_splits=5, test_size=30)
hatalar = []
for egitim_idx, test_idx in tscv.split(X):
    model.fit(X.iloc[egitim_idx], y.iloc[egitim_idx])
    tahmin = model.predict(X.iloc[test_idx])
    hatalar.append(mean_absolute_error(y.iloc[test_idx], tahmin))
print("MAE:", np.mean(hatalar).round(2), "±", np.std(hatalar).round(2))`,
      },
      {
        title: ["Belirsizliği göster", "Show the uncertainty"],
        body: [
          "Tek bir çizgi yerine tahmin aralığı çiz. Stok planlaması yapan kişi için \"120 adet\" ile \"90–150 adet\" arasındaki fark, tüm kararı değiştirir.",
          "Plot a prediction interval instead of a single line. For whoever plans inventory, the difference between \"120 units\" and \"90–150 units\" changes the entire decision.",
        ],
      },
      githubStep("talep-tahmini"),
    ],
  }),

  project({
    slug: "ml-musteri-segmentasyonu-kmeans",
    track: "machine-learning",
    level: "expert",
    title: ["K-Means ile Müşteri Segmentasyonu", "Customer Segmentation with K-Means"],
    stack: ["Python", "scikit-learn", "K-Means", "PCA"],
    hours: 10,
    xp: 600,
    summary: [
      "Etiketsiz müşteri verisini K-Means ile kümelere ayır, doğru küme sayısını seç, PCA ile görselleştir ve her segmente iş dünyasının anlayacağı bir isim ver.",
      "Cluster unlabeled customer data with K-Means, choose the right number of clusters, visualize with PCA, and give each segment a name the business will understand.",
    ],
    dataset: [
      "Kaggle \"Mall Customer Segmentation\" veya kendi müşteri verinden harcama/sıklık/yenilik (RFM benzeri) özellikleri.",
      "Kaggle's \"Mall Customer Segmentation\" or spend/frequency/recency (RFM-like) features from your own customer data.",
    ],
    deliverables: [
      ["Ölçeklendirilmiş özellikler ve dirsek (elbow) grafiğiyle seçilmiş küme sayısı", "Scaled features and a cluster count chosen via the elbow chart"],
      ["PCA ile 2 boyuta indirgenmiş, kümelere göre renklendirilmiş dağılım grafiği", "A PCA-reduced 2D scatter plot colored by cluster"],
      ["Her segment için profil tablosu (ortalama harcama, sıklık, vb.) ve iş dünyasına uygun bir isim (\"Sadık Yüksek Harcayanlar\" gibi)", "A profile table per segment (average spend, frequency, etc.) and a business-friendly name (like \"Loyal High Spenders\")"],
      ["Her segment için 1 somut aksiyon önerisi", "One concrete action recommendation per segment"],
    ],
    steps: [
      {
        title: ["Özellikleri seç ve ölçeklendir", "Select and scale features"],
        body: [
          "3-5 sayısal özellik seç (harcama, sıklık, son alışverişten geçen gün gibi). K-Means'ten önce `StandardScaler` ile ölçeklendirmeyi unutma — aksi halde en büyük sayılı sütun kümelemeye tek başına hükmeder.",
          "Pick 3-5 numeric features (spend, frequency, days since last purchase). Don't forget to scale with `StandardScaler` before K-Means — otherwise whichever column has the biggest numbers alone dictates the clustering.",
        ],
      },
      {
        title: ["Dirsek yöntemiyle küme sayısını seç", "Pick the cluster count with the elbow method"],
        body: [
          "K'yı 2'den 10'a kadar deneyip her birinde toplam küme-içi varyansı (`inertia_`) çiz. Eğrinin belirgin şekilde yavaşladığı (dirsek) noktayı seç — genelde 3-5 arası çıkar. Fazla küme, ayrımı anlamlı değil gürültülü kılar.",
          "Try K from 2 to 10 and plot the total within-cluster variance (`inertia_`) for each. Pick the point where the curve clearly bends (the elbow) — this is usually 3-5. Too many clusters makes the split noisy, not meaningful.",
        ],
        lang: "python",
        code: `from sklearn.cluster import KMeans

inertialar = []
for k in range(2, 11):
    model = KMeans(n_clusters=k, random_state=42, n_init=10).fit(X_olcekli)
    inertialar.append(model.inertia_)

plt.plot(range(2, 11), inertialar, marker="o")
plt.xlabel("k"); plt.ylabel("Inertia")`,
      },
      {
        title: ["PCA ile görselleştir", "Visualize with PCA"],
        body: [
          "Seçtiğin K ile modeli kur, sonra ölçeklenmiş özellikleri PCA ile 2 boyuta indirip kümelere göre renklendirilmiş bir scatter plot çiz. Bu görsel, raporun en ikna edici parçasıdır — sayısal bir tablodan çok daha hızlı anlaşılır.",
          "Fit the model with your chosen K, then reduce the scaled features to 2D with PCA and plot a scatter colored by cluster. This chart is the most persuasive part of the report — it lands far faster than a table of numbers.",
        ],
      },
      {
        title: ["Segmentleri isimlendir ve aksiyona bağla", "Name the segments and tie them to actions"],
        body: [
          "Her kümenin ortalama özelliklerine bak (`df.groupby(\"segment\").mean()`) ve iş dünyasının anlayacağı bir isim ver — \"Küme 2\" değil \"Nadir Ama Yüksek Harcayanlar\". Her segment için tek bir somut aksiyon yaz: kime, ne zaman, ne teklif edilecek.",
          "Look at each cluster's average features (`df.groupby(\"segment\").mean()`) and give it a business-friendly name — not \"Cluster 2\" but \"Rare But High Spenders\". Write one concrete action per segment: who gets what offer, and when.",
        ],
      },
      githubStep("musteri-segmentasyonu-kmeans"),
    ],
    premium: true,
  }),

  project({
    slug: "ml-oneri-motoru",
    track: "machine-learning",
    level: "expert",
    title: ["Basit Bir Öneri Motoru", "A Simple Recommendation Engine"],
    stack: ["Python", "pandas", "Birlikte Satın Alma Analizi"],
    hours: 9,
    xp: 550,
    summary: [
      "Sipariş geçmişinden bir 'bunu alanlar şunu da aldı' öneri motoru kur; popülerlik yanlılığını düzelt ve öneri kalitesini ölç.",
      "Build a \"customers who bought this also bought\" recommender from order history; correct for popularity bias and measure recommendation quality.",
    ],
    dataset: [
      "Kaggle \"Instacart Market Basket\" veya kendi sipariş/sepet verinden en az birkaç bin sipariş.",
      "Kaggle's \"Instacart Market Basket\" or at least a few thousand orders from your own order/basket data.",
    ],
    deliverables: [
      ["Ham co-purchase sayımıyla üretilmiş öneri tablosu", "A recommendation table built from raw co-purchase counts"],
      ["Popülerliğe göre normalize edilmiş (lift) öneri tablosu ve ikisinin karşılaştırması", "A popularity-normalized (lift) recommendation table and a comparison of the two"],
      ["En az 5 ürün için üretilen top-3 öneri listesi", "A top-3 recommendation list generated for at least 5 products"],
      ["Soğuk başlangıç (yeni/az satan ürün) sorununu anlatan 1 sayfalık not", "A one-page note on the cold-start problem (new/low-selling products)"],
    ],
    steps: [
      {
        title: ["Ham co-purchase sayımını çıkar", "Compute raw co-purchase counts"],
        body: [
          "Her sipariş için içindeki ürün çiftlerini say (`itertools.combinations`). Bu sana her ürün çifti için ham bir 'birlikte kaç kez görüldü' sayısı verir — öneri motorunun ilk, en basit versiyonu.",
          "For every order, count the item pairs inside it (`itertools.combinations`). This gives a raw 'seen together N times' count for every item pair — the first, simplest version of a recommender.",
        ],
      },
      {
        title: ["Popülerlik yanlılığını lift ile düzelt", "Correct popularity bias with lift"],
        body: [
          "Ham sayım, popüler ürünleri her şeyle 'ilişkili' gösterir. **Lift** bunu düzeltir: `lift(A,B) = P(A ve B birlikte) / (P(A) × P(B))`. Lift > 1 gerçek bir ilişkiyi, ≈ 1 tesadüfi birlikteliği gösterir.",
          "Raw counts make popular items look 'related' to everything. **Lift** corrects this: `lift(A,B) = P(A and B together) / (P(A) × P(B))`. Lift > 1 signals a real relationship, ≈ 1 signals coincidental co-occurrence.",
        ],
        lang: "python",
        code: `toplam_siparis = len(siparisler)
p_urun = {u: sayilar[u] / toplam_siparis for u in sayilar}

def lift(a, b):
    birlikte = cift_sayilari.get((a, b), 0) / toplam_siparis
    return birlikte / (p_urun[a] * p_urun[b])`,
      },
      {
        title: ["Ham ve lift-düzeltilmiş önerileri karşılaştır", "Compare raw vs lift-corrected recommendations"],
        body: [
          "En az 5 popüler ürün için hem ham sayımla hem lift ile top-3 öneri üret. İkisinin ne zaman aynı, ne zaman farklı çıktığını göster — fark, popülerlik yanlılığının somut kanıtıdır.",
          "For at least 5 popular products, generate top-3 recommendations both by raw count and by lift. Show where they agree and where they diverge — the divergence is concrete evidence of popularity bias.",
        ],
      },
      {
        title: ["Soğuk başlangıç sınırını yaz", "Write down the cold-start limit"],
        body: [
          "Yeni eklenen veya nadir satan bir ürünün hiç (veya çok az) co-purchase verisi olur — bu yöntem ona öneri üretemez. Notunda bu sınırı ve gerçek sistemlerin bunu nasıl çözdüğünü (kategori benzerliği, içerik tabanlı öneri) kısaca yaz.",
          "A newly added or rarely sold product has little or no co-purchase data — this method can't generate a recommendation for it. In your note, briefly describe this limit and how real systems work around it (category similarity, content-based recommendations).",
        ],
      },
      githubStep("basit-oneri-motoru"),
    ],
    premium: true,
  }),

  /* ------------------------------ R ----------------------------- */
  project({
    slug: "r-kesif-analizi",
    track: "r",
    level: "mid",
    title: ["R ile Keşif Analizi ve Rapor", "Exploratory Analysis and Report in R"],
    stack: ["R", "tidyverse", "ggplot2", "R Markdown"],
    hours: 7,
    xp: 300,
    summary: [
      "tidyverse ile veriyi işle, ggplot2 ile yayın kalitesinde grafikler üret ve R Markdown ile tek komutla yeniden üretilebilen bir rapor yaz.",
      "Wrangle with tidyverse, produce publication-quality charts with ggplot2 and write an R Markdown report that rebuilds with one command.",
    ],
    dataset: [
      "`gapminder`, `nycflights13` veya kendi seçtiğin bir açık veri seti.",
      "`gapminder`, `nycflights13`, or an open dataset of your choice.",
    ],
    deliverables: [
      ["dplyr zincirleriyle yazılmış temiz analiz kodu", "Clean analysis code written as dplyr chains"],
      ["En az 4 ggplot2 grafiği, tema tutarlı", "At least 4 ggplot2 charts with a consistent theme"],
      ["Knit edilebilir `.Rmd` dosyası", "A knittable `.Rmd` file"],
      ["HTML rapor çıktısı", "The rendered HTML report"],
    ],
    steps: [
      {
        title: ["Veriyi işle", "Wrangle the data"],
        body: [
          "Analizi `|>` zincirleriyle yaz; ara değişken üretme. Her zincir tek bir soruyu cevaplasın ve üstünde bir satır yorum bulunsun.",
          "Write the analysis as `|>` chains without intermediate variables. Each chain should answer one question and carry a one-line comment above it.",
        ],
      },
      {
        title: ["Tutarlı bir tema kur", "Build a consistent theme"],
        body: [
          "Kendi `theme_*` fonksiyonunu tanımla ve tüm grafiklerde kullan. Aynı yazı tipi, aynı renk paleti, aynı ızgara — grafiklerin bir sisteme ait olduğu anlaşılsın.",
          "Define your own `theme_*` function and apply it everywhere. Same typeface, same palette, same grid — the charts should read as one system.",
        ],
        lang: "r",
        code: `tema_rapor <- function() {
  theme_minimal(base_size = 12) +
    theme(
      plot.title = element_text(face = "bold", size = 14),
      plot.subtitle = element_text(color = "grey40"),
      panel.grid.minor = element_blank(),
      legend.position = "top"
    )
}`,
      },
      {
        title: ["R Markdown raporunu yaz", "Write the R Markdown report"],
        body: [
          "Kod bloklarında `echo=FALSE` kullanarak okuyucuya kodu değil sonucu göster. Sayıları metnin içine satır içi kodla göm (`` `r ortalama` ``) — veri değiştiğinde metin de kendiliğinden güncellensin.",
          "Use `echo=FALSE` in chunks so readers see results, not code. Embed numbers inline (`` `r mean_value` ``) so the prose updates itself when the data changes.",
        ],
      },
      githubStep("r-kesif-analizi"),
    ],
  }),

  /* --------------------- Veri Mühendisliği ---------------------- */
  project({
    slug: "de-etl-pipeline",
    track: "veri-muhendisligi",
    level: "mid",
    title: ["Uçtan Uca ETL Pipeline", "End-to-End ETL Pipeline"],
    stack: ["Python", "Airflow", "PostgreSQL", "Docker"],
    hours: 14,
    xp: 550,
    summary: [
      "Bir API'den günlük veri çeken, temizleyen, veritabanına yazan ve kalite testleriyle korunan zamanlanmış bir veri akışı kur.",
      "Build a scheduled pipeline that pulls daily data from an API, cleans it, writes it to a database and is protected by quality tests.",
    ],
    dataset: [
      "Açık bir API: döviz kuru, hava durumu, deprem verisi (AFAD/USGS) veya toplu taşıma. Günlük değişen bir kaynak seç.",
      "A public API: exchange rates, weather, earthquakes (USGS) or transit. Pick a source that changes daily.",
    ],
    deliverables: [
      ["Docker Compose ile ayağa kalkan Airflow ortamı", "An Airflow environment that comes up with Docker Compose"],
      ["Idempotent bir DAG (yeniden çalıştırma veriyi bozmaz)", "An idempotent DAG (a rerun does not corrupt data)"],
      ["Veri kalitesi testleri ve başarısızlıkta durdurma", "Data quality tests that halt on failure"],
      ["Mimari şeması ve README", "An architecture diagram and README"],
    ],
    steps: [
      {
        title: ["Ortamı kur", "Set up the environment"],
        body: [
          "Docker Compose ile Airflow ve PostgreSQL'i ayağa kaldır. Ortam değişkenlerini `.env` dosyasında tut ve bunu **kesinlikle** `.gitignore`'a ekle.",
          "Bring up Airflow and PostgreSQL with Docker Compose. Keep environment variables in `.env` and **absolutely** add it to `.gitignore`.",
        ],
      },
      {
        title: ["DAG'ı idempotent yaz", "Make the DAG idempotent"],
        body: [
          "Her görev bir **tarih bölümü** üzerinde çalışsın ve yazmadan önce o bölümü silsin. Böylece aynı gün için ikinci çalıştırma veriyi ikiye katlamaz.",
          "Have each task work on a **date partition** and delete that partition before writing. A second run for the same day then cannot double the data.",
        ],
        lang: "python",
        code: `@task
def yukle(tarih: str, kayitlar: list[dict]):
    with baglanti() as db:
        db.execute("DELETE FROM olcumler WHERE tarih = %s", (tarih,))
        db.executemany(
            "INSERT INTO olcumler (tarih, kaynak, deger) VALUES (%s, %s, %s)",
            [(tarih, k["kaynak"], k["deger"]) for k in kayitlar],
        )`,
      },
      {
        title: ["Kalite testlerini ekle", "Add the quality tests"],
        body: [
          "Yükleme sonrası kontrol et: satır sayısı beklenen aralıkta mı, kritik alanlarda NULL var mı, anahtar tekrar ediyor mu. Test düşerse DAG başarısız olsun ve bildirim gitsin.",
          "After loading, check: is the row count within the expected range, are critical fields NULL, is the key duplicated? If a test fails, the DAG should fail and notify.",
        ],
      },
      {
        title: ["Belgelendir", "Document it"],
        body: [
          "README'ye mimari şeması, kurulum adımları ve \"bir görev başarısız olursa ne yapılmalı\" bölümünü ekle. Bu son bölüm, projeyi gerçek bir mühendislik çıktısı gibi gösteren şeydir.",
          "Add an architecture diagram, setup steps and a \"what to do when a task fails\" section to the README. That last section is what makes the project read like real engineering work.",
        ],
      },
      githubStep("etl-pipeline-airflow"),
    ],
  }),
];
