import { pitfall, tip, trySql } from "@/content/helpers";
import { howTo, step } from "./helpers";

/** SQL senaryoları — hepsi e-ticaret veri setinde çalıştırılabilir. */
export const sqlHowTos = [
  howTo({
    slug: "sqlde-mukerrer-kayitlar-nasil-bulunur",
    title: [
      "SQL'de mükerrer (yinelenen) kayıtlar nasıl bulunur ve silinir?",
      "How do you find and remove duplicate rows in SQL?",
    ],
    summary: [
      "GROUP BY ile mükerrerleri say, ROW_NUMBER ile hangisinin kalacağına karar ver, sonra sil.",
      "Count duplicates with GROUP BY, pick the survivor with ROW_NUMBER, then delete the rest.",
    ],
    tool: "sql",
    trackSlug: "sql",
    minutes: 6,
    updated: "2026-08-04",
    answer: {
      body: [
        "Önce hangi sütunların birlikte benzersiz olması gerektiğine karar ver. Bulmak için `GROUP BY` + `HAVING COUNT(*) > 1`, silmek için `ROW_NUMBER()` ile her gruptan birini işaretleyip diğerlerini sil.",
        "First decide which columns should be unique together. Find them with `GROUP BY` + `HAVING COUNT(*) > 1`; to delete, mark one row per group with `ROW_NUMBER()` and remove the rest.",
      ],
      code: "SELECT email, COUNT(*) AS adet\nFROM customers\nGROUP BY email\nHAVING COUNT(*) > 1;",
      lang: "sql",
    },
    steps: [
      step({
        title: ["Benzersizlik kuralını tanımla", "Define the uniqueness rule"],
        body: [
          "\"Mükerrer\" mutlak bir kavram değil. Aynı e-postayla iki kayıt mükerrer mi, yoksa aynı e-posta + aynı tarih mi? Yanlış sütun seçmek gerçek veriyi siler; bu adım en önemlisidir.",
          "\"Duplicate\" isn't absolute. Are two rows with the same email duplicates, or same email + same date? Choosing the wrong columns deletes real data; this is the most important step.",
        ],
      }),
      step({
        title: ["Kaç tane olduğunu say", "Count how many there are"],
        body: [
          "Silmeden önce hacmi gör. Sonuç beklediğinden çok büyükse benzersizlik kuralın yanlış olabilir.",
          "See the volume before deleting. If the result is much larger than expected, your uniqueness rule is probably wrong.",
        ],
        code: "SELECT name, city, COUNT(*) AS adet\nFROM customers\nGROUP BY name, city\nHAVING COUNT(*) > 1\nORDER BY adet DESC;",
        lang: "sql",
      }),
      step({
        title: ["Hangi satırın kalacağını seç", "Choose which row survives"],
        body: [
          "`ROW_NUMBER()` her gruba 1'den başlayan numara verir. `ORDER BY` ile en güncel ya da en eksiksiz kaydın 1 numarayı almasını sağlarsın; kalanlar silinecek olanlardır.",
          "`ROW_NUMBER()` numbers each group from 1. The `ORDER BY` decides which record — the newest or most complete — gets number 1; the rest are the ones to delete.",
        ],
        code: "WITH numarali AS (\n  SELECT id,\n         ROW_NUMBER() OVER (PARTITION BY name, city ORDER BY signup_date DESC) AS sira\n  FROM customers\n)\nSELECT * FROM numarali WHERE sira > 1;",
        lang: "sql",
      }),
      step({
        title: ["Sil", "Delete"],
        body: [
          "Yukarıdaki `SELECT` doğru satırları döndürüyorsa başını `DELETE`'e çevir. Önce yedek al ya da işlemi bir transaction içinde çalıştır.",
          "Once the `SELECT` above returns the right rows, swap its head for `DELETE`. Take a backup first, or run it inside a transaction.",
        ],
        code: "DELETE FROM customers\nWHERE id IN (\n  SELECT id FROM (\n    SELECT id, ROW_NUMBER() OVER (PARTITION BY name, city ORDER BY signup_date DESC) AS sira\n    FROM customers\n  ) WHERE sira > 1\n);",
        lang: "sql",
      }),
    ],
    blocks: [
      pitfall(
        "Önce SELECT, sonra DELETE",
        "SELECT first, DELETE second",
        "Silme sorgusunu doğrudan yazma. Aynı `WHERE` ile önce `SELECT` çalıştır, dönen satırları gözünle doğrula, ardından yalnızca sorgunun başını değiştir.",
        "Never write the delete directly. Run a `SELECT` with the same `WHERE`, eyeball the rows, then change only the head of the query.",
      ),
      trySql(
        "-- Aynı şehirde birden fazla müşteri: gruplama mantığını burada dene\nSELECT city, COUNT(*) AS adet\nFROM customers\nGROUP BY city\nHAVING COUNT(*) > 1\nORDER BY adet DESC;",
      ),
    ],
    faq: [
      {
        q: ["Tablomda id sütunu yoksa ne yaparım?", "What if my table has no id column?"],
        a: [
          "SQLite ve PostgreSQL'de gizli satır kimliği vardır (`rowid`, `ctid`). Yoksa mükerrersiz satırları yeni bir tabloya `CREATE TABLE ... AS SELECT DISTINCT` ile yazıp tabloları takas etmek en güvenli yoldur.",
          "SQLite and PostgreSQL expose a hidden row identifier (`rowid`, `ctid`). Otherwise the safest route is writing the de-duplicated rows into a new table with `CREATE TABLE ... AS SELECT DISTINCT` and swapping the tables.",
        ],
      },
      {
        q: ["DISTINCT yeterli değil mi?", "Isn't DISTINCT enough?"],
        a: [
          "`DISTINCT` yalnızca sorgunun **çıktısını** tekilleştirir, tabloyu değiştirmez. Ayrıca tüm sütunlar birebir aynı olmadıkça satırları birleştirmez — bir sütundaki tek karakterlik fark iki satırı farklı kılar.",
          "`DISTINCT` only de-duplicates the **output** of a query; it doesn't change the table. And it won't collapse rows unless every column matches exactly — a one-character difference keeps them apart.",
        ],
      },
    ],
    related: ["sqlde-her-grubun-ilk-n-kaydi", "pandasta-birlesme-sonrasi-satir-artisi"],
    keywords: ["mükerrer", "duplicate", "yinelenen", "tekrar eden kayıt", "row_number", "sil"],
  }),

  howTo({
    slug: "sqlde-her-grubun-ilk-n-kaydi",
    title: [
      "SQL'de her grubun ilk N kaydı nasıl getirilir?",
      "How do you get the top N rows per group in SQL?",
    ],
    summary: [
      "ROW_NUMBER() ile grup içinde numaralandır, CTE'ye al, numaraya göre filtrele.",
      "Number rows within each group with ROW_NUMBER(), wrap it in a CTE, then filter by the number.",
    ],
    tool: "sql",
    trackSlug: "sql",
    minutes: 5,
    updated: "2026-08-04",
    answer: {
      body: [
        "`LIMIT` tüm sonuca uygulanır, gruba değil. Doğru yol pencere fonksiyonudur: `ROW_NUMBER() OVER (PARTITION BY grup ORDER BY ölçüt DESC)` ile numaralandır, sonucu bir CTE'ye alıp `WHERE sira <= N` ile süz.",
        "`LIMIT` applies to the whole result, not to each group. The right tool is a window function: number the rows with `ROW_NUMBER() OVER (PARTITION BY group ORDER BY metric DESC)`, wrap it in a CTE and filter with `WHERE rn <= N`.",
      ],
      code: "WITH sirali AS (\n  SELECT p.name, p.category_id, p.price,\n         ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY p.price DESC) AS sira\n  FROM products p\n)\nSELECT * FROM sirali WHERE sira <= 2;",
      lang: "sql",
    },
    steps: [
      step({
        title: ["Grup ve sıralama ölçütünü belirle", "Pick the group and the ordering metric"],
        body: [
          "`PARTITION BY` grubu, `ORDER BY` ise \"ilk\"in neye göre ilk olduğunu söyler: en yüksek ciro mu, en yeni tarih mi?",
          "`PARTITION BY` sets the group and `ORDER BY` defines what \"top\" means: highest revenue, most recent date?",
        ],
      }),
      step({
        title: ["Numaralandır", "Number the rows"],
        body: [
          "Pencere fonksiyonu satırları birleştirmez; her satır durur, yanına numarası eklenir.",
          "The window function doesn't collapse rows; each row stays and gains a number.",
        ],
        code: "SELECT name, category_id, price,\n       ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) AS sira\nFROM products;",
        lang: "sql",
      }),
      step({
        title: ["CTE'ye al ve filtrele", "Wrap in a CTE and filter"],
        body: [
          "Pencere fonksiyonu `WHERE` içinde doğrudan kullanılamaz — `WHERE` pencereden önce çalışır. Bu yüzden sonucu bir CTE'ye alıp dışarıdan filtrelersin.",
          "You can't use a window function directly in `WHERE`, because `WHERE` runs before the window. So wrap the result in a CTE and filter from outside.",
        ],
        code: "WITH sirali AS ( ... )\nSELECT * FROM sirali WHERE sira <= 3;",
        lang: "sql",
      }),
    ],
    blocks: [
      tip(
        "RANK mı ROW_NUMBER mı?",
        "RANK or ROW_NUMBER?",
        "Beraberlik olduğunda kaç satır dönmesini istiyorsun? Tam N satır istiyorsan `ROW_NUMBER`, beraberlerin hepsini istiyorsan `RANK` kullan.",
        "How many rows do you want when there's a tie? Use `ROW_NUMBER` for exactly N rows, `RANK` to keep all tied rows.",
      ),
      trySql(
        "-- Her kategorinin en pahalı 2 ürünü\nWITH sirali AS (\n  SELECT p.name, c.name AS kategori, p.price,\n         ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY p.price DESC) AS sira\n  FROM products p\n  JOIN categories c ON c.id = p.category_id\n)\nSELECT kategori, name, price FROM sirali WHERE sira <= 2 ORDER BY kategori;",
      ),
    ],
    faq: [
      {
        q: ["Veritabanım pencere fonksiyonu desteklemiyorsa?", "What if my database has no window functions?"],
        a: [
          "Korelasyonlu alt sorgu kullanılır: `WHERE (SELECT COUNT(*) FROM t2 WHERE t2.grup = t1.grup AND t2.deger > t1.deger) < N`. Doğru çalışır ama büyük tablolarda belirgin şekilde yavaştır.",
          "Use a correlated subquery: `WHERE (SELECT COUNT(*) FROM t2 WHERE t2.grp = t1.grp AND t2.val > t1.val) < N`. It works, but is noticeably slower on large tables.",
        ],
      },
    ],
    related: ["sqlde-aylik-buyume-nasil-hesaplanir", "sqlde-mukerrer-kayitlar-nasil-bulunur"],
    keywords: ["top n", "ilk n", "grup içinde", "row_number", "partition by", "en yüksek"],
  }),

  howTo({
    slug: "sqlde-aylik-buyume-nasil-hesaplanir",
    title: [
      "SQL'de aylık büyüme (MoM) nasıl hesaplanır?",
      "How do you calculate month-over-month growth in SQL?",
    ],
    summary: [
      "Ayları grupla, LAG ile bir önceki ayı yan sütuna getir, farkı orana çevir.",
      "Group by month, bring the previous month alongside with LAG, then turn the difference into a rate.",
    ],
    tool: "sql",
    trackSlug: "sql",
    minutes: 7,
    updated: "2026-08-04",
    answer: {
      body: [
        "İki adım: önce ayı `STRFTIME`/`DATE_TRUNC` ile üret ve gruplayarak aylık toplamı çıkar; sonra `LAG()` ile önceki ayın değerini yan sütuna getirip `(bu ay - önceki) / önceki` hesapla.",
        "Two steps: build the month with `STRFTIME`/`DATE_TRUNC` and aggregate by it; then bring the previous month alongside with `LAG()` and compute `(this - previous) / previous`.",
      ],
      code: "SELECT ay,\n       ciro,\n       ROUND(100.0 * (ciro - LAG(ciro) OVER (ORDER BY ay)) / LAG(ciro) OVER (ORDER BY ay), 1) AS mom_yuzde\nFROM aylik_ciro;",
      lang: "sql",
    },
    steps: [
      step({
        title: ["Ay sütununu üret", "Build the month column"],
        body: [
          "Tarihi ayın ilk gününe indir. SQLite'ta `STRFTIME('%Y-%m', tarih)`, PostgreSQL'de `DATE_TRUNC('month', tarih)`. Yıl bilgisini de içermeli — yoksa farklı yılların Ocak ayları birbirine karışır.",
          "Snap the date to the start of the month: `STRFTIME('%Y-%m', date)` in SQLite, `DATE_TRUNC('month', date)` in PostgreSQL. It must include the year, otherwise Januaries from different years collide.",
        ],
        code: "SELECT STRFTIME('%Y-%m', order_date) AS ay, COUNT(*) FROM orders GROUP BY ay;",
        lang: "sql",
      }),
      step({
        title: ["Aylık toplamı bir CTE'ye al", "Aggregate into a CTE"],
        body: [
          "Pencere fonksiyonu, gruplanmış sonucun üzerinde çalışmalı. İkisini tek sorguda yapmaya çalışmak yerine adımı ayır — okunur ve hata ayıklaması kolay olur.",
          "The window function must run on the aggregated result. Rather than cramming both into one query, split the step — it reads better and is easier to debug.",
        ],
        code: "WITH aylik AS (\n  SELECT STRFTIME('%Y-%m', o.order_date) AS ay,\n         SUM(oi.quantity * oi.unit_price) AS ciro\n  FROM orders o JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY ay\n)\nSELECT * FROM aylik ORDER BY ay;",
        lang: "sql",
      }),
      step({
        title: ["LAG ile önceki ayı getir", "Bring the previous month with LAG"],
        body: [
          "`LAG(ciro) OVER (ORDER BY ay)` bir önceki satırın değerini verir. İlk ayda önceki satır olmadığı için sonuç NULL'dur — bu doğru davranıştır, sıfır yazma.",
          "`LAG(revenue) OVER (ORDER BY month)` reads the previous row. The first month has no predecessor, so the result is NULL — that's correct, don't replace it with zero.",
        ],
        code: "SELECT ay, ciro, LAG(ciro) OVER (ORDER BY ay) AS onceki FROM aylik;",
        lang: "sql",
      }),
      step({
        title: ["Oranı hesapla", "Compute the rate"],
        body: [
          "`100.0 *` ile başlamayı unutma: tam sayı bölmesi sonucu sıfıra yuvarlar. Payda sıfır olabiliyorsa `NULLIF(onceki, 0)` ile koru.",
          "Start with `100.0 *`: integer division would round the result to zero. If the denominator can be zero, guard it with `NULLIF(previous, 0)`.",
        ],
        code: "ROUND(100.0 * (ciro - onceki) / NULLIF(onceki, 0), 1) AS mom_yuzde",
        lang: "sql",
      }),
    ],
    blocks: [
      trySql(
        "WITH aylik AS (\n  SELECT STRFTIME('%Y-%m', o.order_date) AS ay,\n         SUM(oi.quantity * oi.unit_price) AS ciro\n  FROM orders o JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY ay\n)\nSELECT ay,\n       ROUND(ciro, 2) AS ciro,\n       ROUND(LAG(ciro) OVER (ORDER BY ay), 2) AS onceki_ay,\n       ROUND(100.0 * (ciro - LAG(ciro) OVER (ORDER BY ay)) / NULLIF(LAG(ciro) OVER (ORDER BY ay), 0), 1) AS mom_yuzde\nFROM aylik\nORDER BY ay;",
      ),
      pitfall(
        "Boş aylar sessizce atlanır",
        "Empty months are silently skipped",
        "Hiç sipariş olmayan bir ay `GROUP BY` sonucunda satır üretmez; `LAG` de o ayı görmez ve büyümeyi yanlış aya bağlar. Kesintisiz seri istiyorsan bir takvim tablosuyla `LEFT JOIN` yap.",
        "A month with no orders produces no row, so `LAG` skips it and attributes growth to the wrong month. For an unbroken series, `LEFT JOIN` against a calendar table.",
      ),
    ],
    faq: [
      {
        q: ["Yıllık büyüme (YoY) için ne değişir?", "What changes for year-over-year?"],
        a: [
          "Aylık seride 12 satır geriye bakarsın: `LAG(ciro, 12) OVER (ORDER BY ay)`. Seride boş ay varsa bu yanlış satırı getirir — önce seriyi takvimle tamamla.",
          "On a monthly series you look back 12 rows: `LAG(revenue, 12) OVER (ORDER BY month)`. If any month is missing this reads the wrong row — complete the series with a calendar first.",
        ],
      },
    ],
    related: ["power-bide-yoy-nasil-hesaplanir", "sqlde-her-grubun-ilk-n-kaydi"],
    keywords: ["mom", "aylık büyüme", "growth", "lag", "yüzde değişim", "trend"],
  }),

  howTo({
    slug: "sqlde-hic-siparis-vermemis-musteriler",
    title: [
      "SQL'de \"hiç ... yapmamış\" kayıtlar nasıl bulunur?",
      "How do you find records that never did something in SQL?",
    ],
    summary: [
      "LEFT JOIN + IS NULL ya da NOT EXISTS — ikisi de eksik olanı bulur.",
      "LEFT JOIN + IS NULL or NOT EXISTS — both find what's missing.",
    ],
    tool: "sql",
    trackSlug: "sql",
    minutes: 4,
    updated: "2026-08-04",
    answer: {
      body: [
        "Soldaki tablonun tamamını koru, sağdakiyle birleştir ve **eşleşmeyenleri** al: `LEFT JOIN ... WHERE sag.id IS NULL`. Aynı sonucu `NOT EXISTS` ile de alırsın; büyük tablolarda genelde daha hızlıdır.",
        "Keep every row of the left table, join the right one and take the **non-matches**: `LEFT JOIN ... WHERE right.id IS NULL`. `NOT EXISTS` gives the same answer and is usually faster on large tables.",
      ],
      code: "SELECT c.id, c.name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;",
      lang: "sql",
    },
    steps: [
      step({
        title: ["LEFT JOIN ile hepsini koru", "Keep everything with LEFT JOIN"],
        body: [
          "`INNER JOIN` eşleşmeyenleri düşürür — tam da aradığın satırları. `LEFT JOIN` onları NULL sütunlarla birlikte tutar.",
          "`INNER JOIN` drops the non-matching rows — exactly the ones you're after. `LEFT JOIN` keeps them with NULL columns.",
        ],
      }),
      step({
        title: ["IS NULL ile eşleşmeyenleri süz", "Filter the non-matches with IS NULL"],
        body: [
          "Sağ tablodan **NOT NULL** bir sütun seç (birincil anahtar en güvenlisi). Zaten boş olabilen bir sütuna bakarsan gerçek eşleşmeleri de yakalarsın.",
          "Test a **NOT NULL** column from the right table (the primary key is safest). Testing a nullable column would also catch genuine matches.",
        ],
        code: "WHERE o.id IS NULL   -- o.status DEĞİL: status zaten NULL olabilir",
        lang: "sql",
      }),
      step({
        title: ["Alternatif: NOT EXISTS", "Alternative: NOT EXISTS"],
        body: [
          "Niyeti daha net anlatır ve ilk eşleşmede durduğu için büyük tablolarda hızlıdır. `NOT IN` kullanma: alt sorgu tek bir NULL döndürürse tüm sonuç boşalır.",
          "It states the intent more clearly and stops at the first match, so it's fast on large tables. Avoid `NOT IN`: a single NULL from the subquery empties the entire result.",
        ],
        code: "SELECT c.id, c.name\nFROM customers c\nWHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
        lang: "sql",
      }),
    ],
    blocks: [
      trySql(
        "-- İki yolu yan yana çalıştır, sonuçlar aynı olmalı\nSELECT 'left join' AS yol, COUNT(*) AS adet\nFROM customers c LEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL\nUNION ALL\nSELECT 'not exists', COUNT(*)\nFROM customers c\nWHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
      ),
      pitfall(
        "NOT IN ve NULL tuzağı",
        "The NOT IN and NULL trap",
        "`WHERE id NOT IN (SELECT customer_id FROM orders)` — alt sorgudaki `customer_id` bir kez bile NULL ise sonuç **hiç satır** döner. Sebep, NULL ile karşılaştırmanın \"bilinmiyor\" üretmesidir. `NOT EXISTS` bu sorunu yaşamaz.",
        "`WHERE id NOT IN (SELECT customer_id FROM orders)` returns **zero rows** if `customer_id` is NULL even once, because comparing to NULL yields \"unknown\". `NOT EXISTS` has no such problem.",
      ),
    ],
    related: ["sqlde-mukerrer-kayitlar-nasil-bulunur", "pythonla-eksik-veriler-nasil-doldurulur"],
    keywords: ["left join", "not exists", "eksik", "hiç sipariş vermemiş", "is null", "anti join"],
  }),
];
