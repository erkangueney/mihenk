import { entry, group, section } from "./helpers";

/**
 * SQL referansı.
 *
 * Tüm "kendin dene" örnekleri e-ticaret veri setinde (`shop`) çalışır:
 * categories, products, customers, orders, order_items.
 */
export const sqlReference = group({
  slug: "sql",
  name: "SQL",
  icon: "🗄️",
  color: "hsl(199 89% 55%)",
  lang: "sql",
  trackSlug: "sql",
  tagline: ["Sorgu dili — komut komut", "The query language, command by command"],
  description: [
    "Veriyi çekmenin, filtrelemenin, birleştirmenin ve özetlemenin tüm sözdizimi. Her girdinin altındaki editörde gerçek bir SQLite veritabanı çalışır.",
    "Every piece of syntax for selecting, filtering, joining and summarising data. A real SQLite database runs in the editor under each entry.",
  ],
  sections: [
    section("temel", ["Sorgu temelleri", "Query basics"], [
      entry({
        slug: "select",
        name: "SELECT",
        summary: ["Tablodan sütun seçer.", "Selects columns from a table."],
        syntax: "SELECT sütun1, sütun2 FROM tablo;",
        description: [
          "Her sorgunun başlangıcı. `*` tüm sütunları getirir ama üretimde sütunları tek tek yazmak daha güvenlidir: tabloya sütun eklendiğinde sorgun değişmez.",
          "The start of every query. `*` returns all columns, but naming them explicitly is safer in production: your query won't change when a column is added.",
        ],
        params: [
          ["sütun", "Getirilecek sütun adı. `AS` ile yeniden adlandırılabilir.", "Column to return. Can be renamed with `AS`."],
          ["tablo", "Veri kaynağı tablo veya görünüm.", "The source table or view."],
        ],
        example: {
          code: "SELECT name, price FROM products;",
          note: ["Yalnızca iki sütun döner.", "Returns only two columns."],
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT name AS urun, price AS fiyat\nFROM products;",
        },
        related: ["sql/where", "sql/distinct", "sql/order-by"],
        keywords: ["select", "sorgu", "sütun seç", "query", "columns"],
      }),
      entry({
        slug: "distinct",
        name: "SELECT DISTINCT",
        summary: ["Tekrar eden satırları teke indirir.", "Removes duplicate rows."],
        syntax: "SELECT DISTINCT sütun FROM tablo;",
        description: [
          "Benzersiz değer listesi çıkarmanın en kısa yolu. Birden fazla sütun yazarsan **kombinasyon** benzersizleştirilir, tek tek sütunlar değil.",
          "The shortest way to list unique values. With multiple columns the **combination** is de-duplicated, not each column separately.",
        ],
        example: { code: "SELECT DISTINCT city FROM customers;" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT DISTINCT city, segment\nFROM customers\nORDER BY city;",
        },
        related: ["sql/select", "sql/group-by"],
        keywords: ["distinct", "benzersiz", "unique", "tekrar"],
      }),
      entry({
        slug: "where",
        name: "WHERE",
        summary: ["Satırları koşula göre filtreler.", "Filters rows by a condition."],
        syntax: "SELECT * FROM tablo WHERE koşul;",
        description: [
          "Gruplamadan **önce** çalışır. `AND`, `OR`, `NOT`, `BETWEEN`, `IN`, `LIKE`, `IS NULL` operatörlerini alır. Metin karşılaştırmaları tek tırnakla yazılır.",
          "Runs **before** grouping. Accepts `AND`, `OR`, `NOT`, `BETWEEN`, `IN`, `LIKE`, `IS NULL`. Text comparisons use single quotes.",
        ],
        params: [
          ["koşul", "Doğru/yanlış üreten mantıksal ifade.", "A boolean expression."],
        ],
        example: { code: "SELECT * FROM products WHERE price > 2000 AND stock < 60;" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT name, price, stock\nFROM products\nWHERE price BETWEEN 1000 AND 5000\n  AND name LIKE '%a%';",
        },
        related: ["sql/having", "sql/in", "sql/like", "sql/is-null"],
        keywords: ["where", "filtre", "koşul", "filter", "condition"],
      }),
      entry({
        slug: "in",
        name: "IN",
        summary: [
          "Bir değerin listede olup olmadığını kontrol eder.",
          "Checks whether a value is in a list.",
        ],
        syntax: "WHERE sütun IN (değer1, değer2, ...)",
        description: [
          "Uzun `OR` zincirlerinin kısası. Sağ tarafa alt sorgu da yazılabilir: `WHERE id IN (SELECT ...)`.",
          "A short form for long `OR` chains. The right-hand side can also be a subquery: `WHERE id IN (SELECT ...)`.",
        ],
        example: { code: "SELECT * FROM customers WHERE city IN ('İstanbul', 'İzmir');" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT name, city\nFROM customers\nWHERE city IN ('İstanbul', 'Ankara')\nORDER BY city, name;",
        },
        related: ["sql/where", "sql/exists"],
        keywords: ["in", "liste", "list", "or"],
      }),
      entry({
        slug: "like",
        name: "LIKE",
        summary: ["Metin deseni arar.", "Matches a text pattern."],
        syntax: "WHERE sütun LIKE 'desen'",
        description: [
          "`%` sıfır veya daha fazla karakter, `_` tam olarak bir karakter demektir. SQLite'ta ASCII harfler için büyük/küçük harf duyarsızdır; Türkçe karakterlerde duyarlıdır.",
          "`%` matches zero or more characters, `_` exactly one. In SQLite it is case-insensitive for ASCII letters only.",
        ],
        example: { code: "SELECT name FROM products WHERE name LIKE 'Akıllı%';" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT name\nFROM products\nWHERE name LIKE '%Set%' OR name LIKE 'K%';",
        },
        related: ["sql/where"],
        keywords: ["like", "desen", "pattern", "arama", "wildcard"],
      }),
      entry({
        slug: "is-null",
        name: "IS NULL",
        summary: ["Boş değerleri yakalar.", "Matches empty (NULL) values."],
        syntax: "WHERE sütun IS NULL / IS NOT NULL",
        description: [
          "NULL bir değer değil, **değerin yokluğudur**. Bu yüzden `= NULL` hiçbir zaman doğru olmaz; her zaman `IS NULL` yazılır.",
          "NULL is not a value but the **absence of one**. That's why `= NULL` is never true; always write `IS NULL`.",
        ],
        example: { code: "SELECT * FROM users WHERE signup_date IS NULL;" },
        try: {
          engine: "sql",
          dataset: "web",
          code: "SELECT id, country, signup_date\nFROM users\nWHERE signup_date IS NULL;",
        },
        related: ["sql/coalesce", "sql/left-join"],
        keywords: ["null", "boş", "eksik", "missing", "empty"],
      }),
      entry({
        slug: "order-by",
        name: "ORDER BY",
        summary: ["Sonucu sıralar.", "Sorts the result."],
        syntax: "SELECT ... ORDER BY sütun [ASC|DESC];",
        description: [
          "Varsayılan `ASC` (artan). Birden çok sütun yazılırsa soldan sağa öncelik sırasıyla uygulanır. Sıralama sorgunun en son adımıdır — `LIMIT` ondan sonra gelir.",
          "Defaults to `ASC`. With multiple columns the priority runs left to right. Sorting is the last step of the query — `LIMIT` comes after it.",
        ],
        example: { code: "SELECT name, price FROM products ORDER BY price DESC;" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT name, category_id, price\nFROM products\nORDER BY category_id ASC, price DESC;",
        },
        related: ["sql/limit", "sql/rank"],
        keywords: ["order by", "sırala", "sort", "desc", "asc"],
      }),
      entry({
        slug: "limit",
        name: "LIMIT / OFFSET",
        summary: ["Dönen satır sayısını sınırlar.", "Limits the number of rows returned."],
        syntax: "SELECT ... LIMIT n OFFSET m;",
        description: [
          "`LIMIT` ilk n satırı, `OFFSET` baştan m satır atlamayı sağlar — sayfalama böyle yapılır. `ORDER BY` olmadan hangi satırların geleceği garanti değildir.",
          "`LIMIT` takes the first n rows, `OFFSET` skips m — that's how pagination works. Without `ORDER BY` which rows you get is not guaranteed.",
        ],
        example: { code: "SELECT * FROM products ORDER BY price DESC LIMIT 5;" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "-- 2. sayfa: 6-10. en pahalı ürünler\nSELECT name, price\nFROM products\nORDER BY price DESC\nLIMIT 5 OFFSET 5;",
        },
        related: ["sql/order-by"],
        keywords: ["limit", "offset", "sayfalama", "pagination", "top"],
      }),
    ]),

    section("birlestirme", ["Tablo birleştirme", "Joining tables"], [
      entry({
        slug: "inner-join",
        name: "INNER JOIN",
        summary: [
          "İki tabloda da karşılığı olan satırları birleştirir.",
          "Joins rows that exist in both tables.",
        ],
        syntax: "FROM a INNER JOIN b ON a.id = b.a_id",
        description: [
          "En sık kullanılan birleştirme. Eşleşmeyen satırlar sonuçtan **düşer** — bu yüzden 'kaç müşterim var' gibi sorularda satır kaybına dikkat et.",
          "The most common join. Non-matching rows are **dropped** — watch out for row loss in questions like \"how many customers do I have\".",
        ],
        params: [
          ["ON", "Birleştirme koşulu — genelde yabancı anahtar eşitliği.", "The join condition — usually a foreign-key equality."],
        ],
        example: {
          code: "SELECT o.id, c.name\nFROM orders o\nINNER JOIN customers c ON c.id = o.customer_id;",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT o.id AS siparis, c.name AS musteri, o.order_date\nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nORDER BY o.order_date\nLIMIT 10;",
        },
        related: ["sql/left-join", "sql/group-by"],
        keywords: ["join", "inner join", "birleştir", "ilişki", "foreign key"],
      }),
      entry({
        slug: "left-join",
        name: "LEFT JOIN",
        summary: [
          "Soldaki tablonun tüm satırlarını korur.",
          "Keeps every row of the left table.",
        ],
        syntax: "FROM a LEFT JOIN b ON a.id = b.a_id",
        description: [
          "Sağ tarafta karşılık yoksa o sütunlar NULL gelir. 'Hiç sipariş vermemiş müşteriler' gibi **eksik olanı bul** sorularının standart çözümü: `LEFT JOIN` + `WHERE b.id IS NULL`.",
          "When there is no match on the right those columns come back NULL. The standard answer to **find what's missing** questions: `LEFT JOIN` + `WHERE b.id IS NULL`.",
        ],
        example: {
          code: "SELECT c.name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "-- Hiç sipariş vermemiş müşteriler\nSELECT c.id, c.name, c.city\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;",
        },
        related: ["sql/inner-join", "sql/is-null"],
        keywords: ["left join", "outer join", "eksik", "missing", "null"],
      }),
      entry({
        slug: "union",
        name: "UNION / UNION ALL",
        summary: [
          "İki sorgunun sonuçlarını alt alta ekler.",
          "Stacks the results of two queries.",
        ],
        syntax: "SELECT ... UNION [ALL] SELECT ...",
        description: [
          "Sütun sayıları ve türleri uyuşmalı. `UNION` tekrarları siler (yavaş), `UNION ALL` hepsini bırakır (hızlı). Tekrar olmadığını biliyorsan `UNION ALL` kullan.",
          "Column counts and types must match. `UNION` removes duplicates (slower), `UNION ALL` keeps everything (faster). Use `UNION ALL` when you know there are no duplicates.",
        ],
        example: {
          code: "SELECT name FROM customers\nUNION ALL\nSELECT name FROM products;",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT 'musteri' AS tur, name FROM customers WHERE city = 'İzmir'\nUNION ALL\nSELECT 'urun', name FROM products WHERE price < 500;",
        },
        related: ["sql/inner-join"],
        keywords: ["union", "birleştir", "alt alta", "append", "concat"],
      }),
      entry({
        slug: "self-join",
        name: "Self join",
        summary: [
          "Bir tabloyu kendisiyle birleştirir.",
          "Joins a table to itself.",
        ],
        syntax: "FROM tablo a JOIN tablo b ON a.parent_id = b.id",
        description: [
          "Hiyerarşiler için kullanılır: çalışan → yönetici, kategori → üst kategori. Aynı tabloyu iki farklı takma adla yazmak zorunludur.",
          "Used for hierarchies: employee → manager, category → parent category. You must alias the same table twice.",
        ],
        example: {
          code: "SELECT e.name, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON m.id = e.manager_id;",
        },
        try: {
          engine: "sql",
          dataset: "hr",
          code: "SELECT e.name AS calisan, m.name AS yonetici\nFROM employees e\nLEFT JOIN employees m ON m.id = e.manager_id\nORDER BY yonetici NULLS LAST, calisan;",
        },
        related: ["sql/inner-join", "sql/left-join"],
        keywords: ["self join", "hiyerarşi", "yönetici", "hierarchy"],
      }),
    ]),

    section("gruplama", ["Gruplama ve özetleme", "Grouping and aggregation"], [
      entry({
        slug: "group-by",
        name: "GROUP BY",
        summary: [
          "Satırları gruplayıp her grup için özet üretir.",
          "Groups rows and produces one summary row per group.",
        ],
        syntax: "SELECT sütun, COUNT(*) FROM tablo GROUP BY sütun;",
        description: [
          "`SELECT` içindeki her sütun ya `GROUP BY`'da olmalı ya da bir toplama fonksiyonunun içinde. Bu kuralı unutmak SQL'de en sık yapılan hatadır.",
          "Every column in `SELECT` must be either in `GROUP BY` or inside an aggregate. Forgetting this is the most common SQL mistake.",
        ],
        example: {
          code: "SELECT city, COUNT(*) AS musteri_sayisi\nFROM customers\nGROUP BY city;",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT c.name AS kategori,\n       COUNT(*) AS urun_sayisi,\n       ROUND(AVG(p.price), 2) AS ort_fiyat\nFROM products p\nJOIN categories c ON c.id = p.category_id\nGROUP BY c.name\nORDER BY ort_fiyat DESC;",
        },
        related: ["sql/having", "sql/count", "sql/sum"],
        keywords: ["group by", "grupla", "özet", "aggregate", "gruplama"],
      }),
      entry({
        slug: "having",
        name: "HAVING",
        summary: [
          "Grupları, özet değerlerine göre filtreler.",
          "Filters groups by their aggregated values.",
        ],
        syntax: "GROUP BY sütun HAVING COUNT(*) > n",
        description: [
          "`WHERE` satırları gruplamadan **önce**, `HAVING` grupları gruplamadan **sonra** eler. `WHERE COUNT(*) > 3` yazılmaz — o iş `HAVING`'indir.",
          "`WHERE` filters rows **before** grouping, `HAVING` filters groups **after**. You cannot write `WHERE COUNT(*) > 3` — that's `HAVING`'s job.",
        ],
        example: {
          code: "SELECT city, COUNT(*) c FROM customers GROUP BY city HAVING COUNT(*) >= 2;",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "-- Birden fazla sipariş vermiş müşteriler\nSELECT c.name, COUNT(o.id) AS siparis\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nGROUP BY c.name\nHAVING COUNT(o.id) > 1\nORDER BY siparis DESC;",
        },
        related: ["sql/group-by", "sql/where"],
        keywords: ["having", "grup filtre", "aggregate filter"],
      }),
      entry({
        slug: "count",
        name: "COUNT()",
        summary: ["Satır sayar.", "Counts rows."],
        syntax: "COUNT(*) | COUNT(sütun) | COUNT(DISTINCT sütun)",
        description: [
          "`COUNT(*)` tüm satırları sayar. `COUNT(sütun)` **NULL olmayan** değerleri sayar — aradaki fark eksik veri raporlarının temelidir. `COUNT(DISTINCT ...)` benzersizleri sayar.",
          "`COUNT(*)` counts all rows. `COUNT(column)` counts **non-NULL** values — that difference is the basis of missing-data reports. `COUNT(DISTINCT ...)` counts unique values.",
        ],
        example: { code: "SELECT COUNT(*) AS toplam, COUNT(DISTINCT city) AS sehir FROM customers;" },
        try: {
          engine: "sql",
          dataset: "web",
          code: "SELECT COUNT(*) AS toplam_kullanici,\n       COUNT(signup_date) AS kayitli,\n       COUNT(*) - COUNT(signup_date) AS eksik\nFROM users;",
        },
        related: ["sql/group-by", "sql/is-null"],
        keywords: ["count", "say", "adet", "kaç"],
      }),
      entry({
        slug: "sum",
        name: "SUM() / AVG() / MIN() / MAX()",
        summary: [
          "Sayısal sütunları toplar, ortalar, uçlarını bulur.",
          "Sums, averages and finds extremes of numeric columns.",
        ],
        syntax: "SUM(sütun), AVG(sütun), MIN(sütun), MAX(sütun)",
        description: [
          "Hepsi NULL'ları yok sayar. `AVG` paydaya NULL satırları katmaz — 'ortalama neden yüksek çıktı' sorusunun cevabı genelde budur. Ondalık için `ROUND(x, 2)` ile sar.",
          "All of them ignore NULLs. `AVG` excludes NULL rows from the denominator — usually the answer to \"why is my average so high\". Wrap with `ROUND(x, 2)` for decimals.",
        ],
        example: { code: "SELECT SUM(quantity * unit_price) AS ciro FROM order_items;" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT ROUND(SUM(quantity * unit_price), 2) AS toplam_ciro,\n       ROUND(AVG(unit_price), 2) AS ort_birim_fiyat,\n       MIN(unit_price) AS en_ucuz,\n       MAX(unit_price) AS en_pahali\nFROM order_items;",
        },
        related: ["sql/group-by", "sql/round"],
        keywords: ["sum", "avg", "min", "max", "toplam", "ortalama"],
      }),
    ]),

    section("ifadeler", ["İfadeler ve fonksiyonlar", "Expressions and functions"], [
      entry({
        slug: "case",
        name: "CASE WHEN",
        summary: ["Sorgu içinde koşullu değer üretir.", "Produces a conditional value inside a query."],
        syntax: "CASE WHEN koşul THEN değer ELSE diğer END",
        description: [
          "SQL'in if-else'i. Segment/kova (bucket) oluşturmanın ve 'koşullu sayma' yapmanın standart yolu: `SUM(CASE WHEN ... THEN 1 ELSE 0 END)`.",
          "SQL's if-else. The standard way to build buckets and to count conditionally: `SUM(CASE WHEN ... THEN 1 ELSE 0 END)`.",
        ],
        example: {
          code: "SELECT name,\n  CASE WHEN price > 3000 THEN 'premium' ELSE 'standart' END AS segment\nFROM products;",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT\n  CASE\n    WHEN price < 1000 THEN 'ucuz'\n    WHEN price < 4000 THEN 'orta'\n    ELSE 'pahalı'\n  END AS bant,\n  COUNT(*) AS urun\nFROM products\nGROUP BY bant\nORDER BY urun DESC;",
        },
        related: ["sql/coalesce", "sql/group-by"],
        keywords: ["case", "when", "koşul", "if", "else", "segment"],
      }),
      entry({
        slug: "coalesce",
        name: "COALESCE()",
        summary: [
          "İlk NULL olmayan değeri döndürür.",
          "Returns the first non-NULL value.",
        ],
        syntax: "COALESCE(değer1, değer2, ...)",
        description: [
          "Eksik veriyi varsayılanla doldurmanın en kısa yolu. `LEFT JOIN` sonrası NULL kalan toplamları sıfıra çevirmek için sürekli kullanılır.",
          "The shortest way to fill missing data with a default. Constantly used to turn NULL sums into zeros after a `LEFT JOIN`.",
        ],
        example: { code: "SELECT COALESCE(signup_date, 'bilinmiyor') FROM users;" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT c.name,\n       COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS harcama\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nLEFT JOIN order_items oi ON oi.order_id = o.id\nGROUP BY c.name\nORDER BY harcama;",
        },
        related: ["sql/is-null", "sql/left-join"],
        keywords: ["coalesce", "ifnull", "varsayılan", "default", "null"],
      }),
      entry({
        slug: "round",
        name: "ROUND() / CAST()",
        summary: ["Sayıyı yuvarlar veya türünü değiştirir.", "Rounds a number or converts its type."],
        syntax: "ROUND(sayı, basamak) · CAST(değer AS tür)",
        description: [
          "Rapor sayıları ham ondalıkla gösterilmez. `CAST(x AS REAL)` tam sayı bölmesi tuzağını da çözer: SQLite'ta `1/2` sıfırdır, `CAST(1 AS REAL)/2` ise 0.5.",
          "Report numbers are never shown raw. `CAST(x AS REAL)` also fixes the integer-division trap: in SQLite `1/2` is zero, `CAST(1 AS REAL)/2` is 0.5.",
        ],
        example: { code: "SELECT ROUND(AVG(price), 2) FROM products;" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT 1/2 AS tamsayi_bolme,\n       CAST(1 AS REAL)/2 AS ondalik_bolme,\n       ROUND(AVG(price), 2) AS ort_fiyat\nFROM products;",
        },
        related: ["sql/sum"],
        keywords: ["round", "cast", "yuvarla", "tür", "convert"],
      }),
      entry({
        slug: "string-functions",
        name: "Metin fonksiyonları",
        summary: [
          "Metni birleştirir, keser, büyütür, temizler.",
          "Concatenates, slices, upper-cases and trims text.",
        ],
        syntax: "a || b · UPPER(x) · LOWER(x) · LENGTH(x) · SUBSTR(x, 1, 3) · TRIM(x) · REPLACE(x, 'a', 'b')",
        description: [
          "SQLite'ta birleştirme `+` değil `||` ile yapılır. `SUBSTR` 1'den başlar (0'dan değil) — Python'dan gelenlerin en sık takıldığı yer.",
          "In SQLite you concatenate with `||`, not `+`. `SUBSTR` is 1-indexed (not 0) — the classic trip-up for people coming from Python.",
        ],
        example: { code: "SELECT UPPER(name) || ' - ' || city FROM customers;" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT name,\n       UPPER(SUBSTR(name, 1, 1)) AS bas_harf,\n       LENGTH(name) AS uzunluk,\n       REPLACE(name, ' ', '_') AS slug\nFROM customers\nLIMIT 8;",
        },
        related: ["sql/date-functions"],
        keywords: ["substr", "upper", "lower", "trim", "replace", "metin", "string"],
      }),
      entry({
        slug: "date-functions",
        name: "Tarih fonksiyonları",
        summary: ["Tarihleri parçalar ve biçimlendirir.", "Extracts and formats dates."],
        syntax: "STRFTIME('%Y-%m', tarih) · DATE('now') · JULIANDAY(a) - JULIANDAY(b)",
        description: [
          "SQLite'ta ayrı bir tarih türü yoktur; tarihler `YYYY-AA-GG` metni olarak tutulur. Aylık kırılım için `STRFTIME('%Y-%m', ...)`, gün farkı için `JULIANDAY` kullanılır.",
          "SQLite has no dedicated date type; dates are stored as `YYYY-MM-DD` text. Use `STRFTIME('%Y-%m', ...)` for monthly buckets and `JULIANDAY` for day differences.",
        ],
        example: { code: "SELECT STRFTIME('%Y-%m', order_date) AS ay FROM orders;" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT STRFTIME('%Y-%m', o.order_date) AS ay,\n       COUNT(*) AS siparis,\n       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS ciro\nFROM orders o\nJOIN order_items oi ON oi.order_id = o.id\nGROUP BY ay\nORDER BY ay;",
        },
        related: ["sql/group-by", "sql/lag"],
        keywords: ["tarih", "date", "strftime", "ay", "month", "julianday"],
      }),
    ]),

    section("pencere", ["Pencere fonksiyonları", "Window functions"], [
      entry({
        slug: "row-number",
        name: "ROW_NUMBER()",
        summary: [
          "Her satıra sıra numarası verir.",
          "Assigns a sequential number to each row.",
        ],
        syntax: "ROW_NUMBER() OVER (PARTITION BY grup ORDER BY sütun)",
        description: [
          "`GROUP BY`'dan farkı: satırları **birleştirmez**, her satır durur ve yanına numara eklenir. 'Her kategorinin en pahalı 2 ürünü' gibi grup-içi-ilk-N sorularının cevabı budur.",
          "Unlike `GROUP BY` it does **not** collapse rows — every row stays and gets a number. This is the answer to top-N-per-group questions like \"the 2 priciest products in each category\".",
        ],
        example: {
          code: "SELECT name, ROW_NUMBER() OVER (ORDER BY price DESC) AS sira FROM products;",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "-- Her kategorinin en pahalı 2 ürünü\nWITH sirali AS (\n  SELECT p.name, c.name AS kategori, p.price,\n         ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY p.price DESC) AS sira\n  FROM products p\n  JOIN categories c ON c.id = p.category_id\n)\nSELECT kategori, name, price FROM sirali WHERE sira <= 2;",
        },
        related: ["sql/rank", "sql/cte"],
        keywords: ["row_number", "pencere", "window", "sıra", "top n"],
      }),
      entry({
        slug: "rank",
        name: "RANK() / DENSE_RANK()",
        summary: ["Beraberlikleri gözeterek sıralar.", "Ranks rows, handling ties."],
        syntax: "RANK() OVER (ORDER BY sütun DESC)",
        description: [
          "`RANK` beraberlikten sonra numara atlar (1, 1, 3), `DENSE_RANK` atlamaz (1, 1, 2). Liderlik tabloları genelde `DENSE_RANK` ister.",
          "`RANK` skips numbers after a tie (1, 1, 3), `DENSE_RANK` doesn't (1, 1, 2). Leaderboards usually want `DENSE_RANK`.",
        ],
        example: { code: "SELECT name, RANK() OVER (ORDER BY price DESC) FROM products;" },
        try: {
          engine: "sql",
          dataset: "hr",
          code: "SELECT name, salary,\n       RANK()       OVER (ORDER BY salary DESC) AS rank,\n       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense\nFROM employees\nORDER BY salary DESC\nLIMIT 10;",
        },
        related: ["sql/row-number"],
        keywords: ["rank", "dense_rank", "sıralama", "beraberlik", "tie"],
      }),
      entry({
        slug: "lag",
        name: "LAG() / LEAD()",
        summary: [
          "Önceki veya sonraki satırın değerini getirir.",
          "Reads the value from the previous or next row.",
        ],
        syntax: "LAG(sütun, 1) OVER (ORDER BY tarih)",
        description: [
          "Zaman serisi analizinin bel kemiği: bir önceki ayla karşılaştırma (MoM), büyüme oranı, fark hesabı. `LEAD` aynısını ileri yönde yapar.",
          "The backbone of time-series analysis: month-over-month comparison, growth rate, deltas. `LEAD` does the same looking forward.",
        ],
        example: {
          code: "SELECT ay, ciro, ciro - LAG(ciro) OVER (ORDER BY ay) AS fark FROM aylik;",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "WITH aylik AS (\n  SELECT STRFTIME('%Y-%m', o.order_date) AS ay,\n         SUM(oi.quantity * oi.unit_price) AS ciro\n  FROM orders o JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY ay\n)\nSELECT ay,\n       ROUND(ciro, 2) AS ciro,\n       ROUND(ciro - LAG(ciro) OVER (ORDER BY ay), 2) AS fark,\n       ROUND(100.0 * (ciro - LAG(ciro) OVER (ORDER BY ay)) / LAG(ciro) OVER (ORDER BY ay), 1) AS buyume_yuzde\nFROM aylik ORDER BY ay;",
        },
        related: ["sql/cte", "sql/date-functions"],
        keywords: ["lag", "lead", "önceki", "büyüme", "mom", "yoy", "growth"],
      }),
      entry({
        slug: "running-total",
        name: "Kümülatif toplam",
        summary: [
          "Satır satır birikerek artan toplam.",
          "A total that accumulates row by row.",
        ],
        syntax: "SUM(sütun) OVER (ORDER BY tarih ROWS UNBOUNDED PRECEDING)",
        description: [
          "Toplama fonksiyonuna `OVER` eklendiğinde satırlar korunur ve toplam birikir. Kümülatif ciro, koşan bakiye ve Pareto (80/20) analizlerinin temeli.",
          "Adding `OVER` to an aggregate keeps the rows and accumulates the total. The basis of cumulative revenue, running balances and Pareto (80/20) analysis.",
        ],
        example: {
          code: "SELECT ay, SUM(ciro) OVER (ORDER BY ay) AS kumulatif FROM aylik;",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "WITH aylik AS (\n  SELECT STRFTIME('%Y-%m', o.order_date) AS ay,\n         SUM(oi.quantity * oi.unit_price) AS ciro\n  FROM orders o JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY ay\n)\nSELECT ay,\n       ROUND(ciro, 2) AS ciro,\n       ROUND(SUM(ciro) OVER (ORDER BY ay), 2) AS kumulatif\nFROM aylik ORDER BY ay;",
        },
        related: ["sql/lag", "sql/sum"],
        keywords: ["kümülatif", "running total", "birikimli", "over"],
      }),
    ]),

    section("yapilar", ["Alt sorgular ve yapılar", "Subqueries and structures"], [
      entry({
        slug: "cte",
        name: "WITH (CTE)",
        summary: [
          "Sorguyu adlandırılmış adımlara böler.",
          "Splits a query into named steps.",
        ],
        syntax: "WITH ad AS (SELECT ...) SELECT * FROM ad;",
        description: [
          "İç içe geçmiş alt sorguların okunabilir hâli. Uzun sorguları yukarıdan aşağı okunur adımlara böler; aynı ara sonucu birden çok yerde kullanmayı da sağlar.",
          "The readable form of nested subqueries. Splits long queries into steps read top to bottom, and lets you reuse the same intermediate result.",
        ],
        example: {
          code: "WITH toplam AS (\n  SELECT customer_id, SUM(1) AS n FROM orders GROUP BY customer_id\n)\nSELECT * FROM toplam WHERE n > 2;",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "WITH musteri_harcama AS (\n  SELECT o.customer_id, SUM(oi.quantity * oi.unit_price) AS harcama\n  FROM orders o JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY o.customer_id\n),\nortalama AS (SELECT AVG(harcama) AS ort FROM musteri_harcama)\nSELECT c.name, ROUND(m.harcama, 2) AS harcama\nFROM musteri_harcama m\nJOIN customers c ON c.id = m.customer_id\nCROSS JOIN ortalama\nWHERE m.harcama > ortalama.ort\nORDER BY harcama DESC;",
        },
        related: ["sql/subquery", "sql/row-number"],
        keywords: ["cte", "with", "alt sorgu", "adım", "temporary"],
      }),
      entry({
        slug: "subquery",
        name: "Alt sorgu",
        summary: [
          "Sorgunun içine yerleştirilen ikinci sorgu.",
          "A query nested inside another query.",
        ],
        syntax: "WHERE sütun > (SELECT AVG(sütun) FROM tablo)",
        description: [
          "`WHERE`, `SELECT` ve `FROM` içinde kullanılabilir. Tek değer döndüren alt sorgular karşılaştırmada, çok satır döndürenler `IN` ile kullanılır.",
          "Can appear in `WHERE`, `SELECT` and `FROM`. Single-value subqueries go in comparisons; multi-row ones go with `IN`.",
        ],
        example: {
          code: "SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products);",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "SELECT name, price\nFROM products\nWHERE price > (SELECT AVG(price) FROM products)\nORDER BY price DESC;",
        },
        related: ["sql/cte", "sql/exists"],
        keywords: ["alt sorgu", "subquery", "nested", "iç içe"],
      }),
      entry({
        slug: "exists",
        name: "EXISTS",
        summary: [
          "Alt sorgunun satır döndürüp döndürmediğini kontrol eder.",
          "Checks whether a subquery returns any rows.",
        ],
        syntax: "WHERE EXISTS (SELECT 1 FROM ... WHERE ...)",
        description: [
          "İlk eşleşmede durur, bu yüzden büyük tablolarda `IN`'den hızlıdır. `NOT EXISTS` 'hiç ... olmayan' sorularının en net cevabıdır.",
          "Stops at the first match, so it beats `IN` on large tables. `NOT EXISTS` is the cleanest answer to \"those that never…\" questions.",
        ],
        example: {
          code: "SELECT name FROM customers c\nWHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "-- Hiç iptal siparişi olmayan müşteriler\nSELECT c.name\nFROM customers c\nWHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)\n  AND NOT EXISTS (\n    SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'iptal'\n  );",
        },
        related: ["sql/in", "sql/left-join"],
        keywords: ["exists", "not exists", "var mı", "hiç"],
      }),
      entry({
        slug: "insert-update-delete",
        name: "INSERT / UPDATE / DELETE",
        summary: ["Veriyi yazar, günceller, siler.", "Writes, updates and deletes data."],
        syntax:
          "INSERT INTO t (a, b) VALUES (1, 2);\nUPDATE t SET a = 1 WHERE id = 5;\nDELETE FROM t WHERE id = 5;",
        description: [
          "`UPDATE` ve `DELETE` yazarken **önce `WHERE`'i yaz**. `WHERE` unutulursa tüm tablo etkilenir ve geri dönüşü yoktur. Alışkanlık: sorguyu `SELECT` ile dene, sonra başını değiştir.",
          "When writing `UPDATE` or `DELETE`, **write the `WHERE` first**. Forget it and the whole table changes, irreversibly. Habit: test with `SELECT`, then swap the head.",
        ],
        example: { code: "UPDATE products SET stock = stock - 1 WHERE id = 3;" },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "-- Her çalıştırmada veritabanı sıfırdan kurulur, gönül rahatlığıyla dene\nUPDATE products SET price = price * 1.1 WHERE category_id = 1;\nSELECT name, ROUND(price, 2) AS yeni_fiyat FROM products WHERE category_id = 1;",
        },
        related: ["sql/create-table"],
        keywords: ["insert", "update", "delete", "ekle", "güncelle", "sil"],
      }),
      entry({
        slug: "create-table",
        name: "CREATE TABLE",
        summary: ["Yeni tablo tanımlar.", "Defines a new table."],
        syntax: "CREATE TABLE tablo (\n  id INTEGER PRIMARY KEY,\n  ad TEXT NOT NULL\n);",
        description: [
          "Sütun türü, `NOT NULL`, `PRIMARY KEY`, `REFERENCES` kısıtları burada verilir. Kısıtlar veriyi temiz tutar — kontrolü uygulamaya bırakmak yerine veritabanına yaptır.",
          "Column types and the `NOT NULL`, `PRIMARY KEY`, `REFERENCES` constraints go here. Constraints keep data clean — let the database enforce them instead of the application.",
        ],
        example: {
          code: "CREATE TABLE notlar (\n  id INTEGER PRIMARY KEY,\n  ogrenci TEXT NOT NULL,\n  puan REAL CHECK (puan BETWEEN 0 AND 100)\n);",
        },
        try: {
          engine: "sql",
          dataset: "shop",
          code: "CREATE TABLE kampanya (\n  id INTEGER PRIMARY KEY,\n  ad TEXT NOT NULL,\n  indirim REAL CHECK (indirim BETWEEN 0 AND 1)\n);\nINSERT INTO kampanya (id, ad, indirim) VALUES (1, 'Yaz', 0.2), (2, 'Kış', 0.35);\nSELECT * FROM kampanya;",
        },
        related: ["sql/insert-update-delete"],
        keywords: ["create table", "tablo oluştur", "şema", "ddl", "primary key"],
      }),
    ]),
  ],
});
