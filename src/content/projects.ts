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
