import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, quiz, sqlTask, text, tip } from "../helpers";

export const sqlTrack: Track = {
  slug: "sql",
  name: "SQL",
  category: "language",
  color: "#38bdf8",
  icon: "🗄️",
  tagline: L(
    "Veriyi kaynağından çekmenin dili",
    "The language for pulling data from the source",
  ),
  description: L(
    "Veri analistliğinin en çok kullanılan aracı SQL'dir. Bu patikada tek tablodan başlayıp pencere fonksiyonları ve kohort analizine kadar gidiyoruz. Tüm alıştırmalar tarayıcında çalışan gerçek bir SQLite veritabanı üzerinde koşuyor.",
    "SQL is the most-used tool in data analytics. This track starts with a single table and goes all the way to window functions and cohort analysis. Every exercise runs on a real SQLite database inside your browser.",
  ),
  levels: [
    /* ---------------------------------------------------------------- */
    {
      id: "beginner",
      title: L("Başlangıç — İlk sorgularım", "Beginner — My first queries"),
      description: L(
        "Tek bir tablodan veri seçmeyi, filtrelemeyi, sıralamayı ve özetlemeyi öğren.",
        "Learn to select, filter, sort and summarise data from a single table.",
      ),
      projectSlug: "sql-satis-raporu",
      lessons: [
        lesson({
          slug: "select-from",
          title: L("SELECT ve FROM: veriyi çağırmak", "SELECT and FROM: calling data"),
          summary: L(
            "Bir veritabanına ilk sorunu sor: hangi tablodan hangi sütunları istiyorsun?",
            "Ask a database your first question: which columns do you want from which table?",
          ),
          minutes: 12,
          blocks: [
            text(
              "SQL, bir veritabanına soru sorma dilidir. Neredeyse her sorgu iki kelimeyle başlar: **SELECT** (hangi sütunlar) ve **FROM** (hangi tablo).\n\nSağdaki veritabanında bir e-ticaret sitesinin tabloları var: `products`, `customers`, `orders`, `order_items`, `categories`.",
              "SQL is the language for asking a database questions. Almost every query starts with two words: **SELECT** (which columns) and **FROM** (which table).\n\nThe database here holds the tables of an e-commerce site: `products`, `customers`, `orders`, `order_items`, `categories`.",
            ),
            code(
              "sql",
              `-- Tüm sütunlar (yıldız = hepsi)
SELECT * FROM products;

-- Sadece iki sütun
SELECT name, price FROM products;`,
              "İlk sorgular",
              "First queries",
            ),
            text(
              "`*` işareti \"bütün sütunlar\" demektir. Keşif yaparken pratiktir ama gerçek işlerde **ihtiyacın olan sütunları tek tek yaz**: sorgu hem hızlanır hem de tabloya sonradan sütun eklendiğinde raporun bozulmaz.\n\nSütunlara yeni bir ad vermek için `AS` kullanılır — buna *takma ad* (alias) denir.",
              "The `*` means \"every column\". It is handy while exploring, but in real work **list the columns you need**: the query gets faster and your report will not break when someone adds a column later.\n\nUse `AS` to give a column a new name — this is called an *alias*.",
            ),
            code(
              "sql",
              `SELECT
  name AS urun_adi,
  price AS fiyat
FROM products;`,
            ),
            tip(
              "Noktalı virgül ve büyük harf",
              "Semicolons and capitals",
              "SQL anahtar kelimeleri büyük/küçük harfe duyarsızdır; `select` ile `SELECT` aynı işi yapar. Anahtar kelimeleri BÜYÜK, tablo ve sütunları küçük yazmak yaygın bir okunabilirlik geleneğidir.",
              "SQL keywords are case-insensitive; `select` and `SELECT` do the same thing. Writing keywords in UPPERCASE and tables/columns in lowercase is a common readability convention.",
            ),
            quiz({
              id: "q1",
              q: [
                "`SELECT name FROM customers;` sorgusu ne döndürür?",
                "What does `SELECT name FROM customers;` return?",
              ],
              options: [
                ["customers tablosundaki tüm satırların name sütunu", "The name column of every row in customers"],
                ["Sadece ilk müşterinin adı", "Only the first customer's name"],
                ["customers tablosunun tüm sütunları", "All columns of the customers table"],
                ["Müşteri sayısı", "The number of customers"],
              ],
              answer: 0,
              explain: [
                "SELECT hangi **sütunları**, FROM hangi **tabloyu** istediğini söyler. Satır sayısını sınırlamak için `LIMIT`, saymak için `COUNT(*)` gerekir.",
                "SELECT says which **columns**, FROM says which **table**. To limit rows you need `LIMIT`, and to count them `COUNT(*)`.",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "`customers` tablosundan **name**, **city** ve **segment** sütunlarını seç.",
                "Select the **name**, **city** and **segment** columns from the `customers` table.",
              ],
              starter: `-- Sorgunu buraya yaz\nSELECT`,
              solution: `SELECT name, city, segment FROM customers;`,
              hint: [
                "Sütunları virgülle ayır: `SELECT a, b, c FROM tablo;`",
                "Separate columns with commas: `SELECT a, b, c FROM table;`",
              ],
            }),
          ],
        }),

        lesson({
          slug: "where-filtreleme",
          title: L("WHERE: doğru satırları süzmek", "WHERE: filtering the right rows"),
          summary: L(
            "Milyonlarca satırın içinden yalnızca sorunla ilgili olanları getir.",
            "Pull only the rows that matter to your question out of millions.",
          ),
          minutes: 14,
          blocks: [
            text(
              "`WHERE`, satırları bir koşula göre süzer. Koşulu sağlamayan satır sonuca hiç girmez.",
              "`WHERE` filters rows by a condition. Rows that fail the condition never reach the result.",
            ),
            code(
              "sql",
              `SELECT name, price
FROM products
WHERE price > 2000;

-- Metin karşılaştırması tırnak ister
SELECT name FROM customers WHERE city = 'İstanbul';

-- Aralık, liste ve desen
SELECT * FROM products WHERE price BETWEEN 500 AND 3000;
SELECT * FROM customers WHERE city IN ('Ankara', 'İzmir');
SELECT * FROM products WHERE name LIKE '%Saat%';`,
            ),
            text(
              "Birden fazla koşulu `AND` ve `OR` ile birleştirirsin. Karıştığı yerde parantez kullan — `AND`, `OR`'dan önce çalışır ve bu sessiz hatalara yol açar.",
              "Combine conditions with `AND` and `OR`. Use parentheses when it gets tricky — `AND` binds tighter than `OR`, which quietly produces wrong results.",
            ),
            code(
              "sql",
              `-- Yanlış: İstanbul'daki pahalılar VEYA her yerdeki kurumsallar
SELECT * FROM customers
WHERE city = 'İstanbul' AND segment = 'bireysel' OR segment = 'kurumsal';

-- Doğru: niyet parantezle netleşir
SELECT * FROM customers
WHERE city = 'İstanbul' AND (segment = 'bireysel' OR segment = 'kurumsal');`,
            ),
            pitfall(
              "NULL ile karşılaştırma yapılmaz",
              "You cannot compare with NULL",
              "`WHERE signup_date = NULL` **hiçbir zaman** satır döndürmez. NULL \"bilinmeyen\" demektir ve bilinmeyen bir şey hiçbir şeye eşit değildir — kendisine bile. Doğrusu: `WHERE signup_date IS NULL` veya `IS NOT NULL`.",
              "`WHERE signup_date = NULL` returns **no** rows, ever. NULL means \"unknown\", and an unknown value equals nothing — not even itself. Use `WHERE signup_date IS NULL` or `IS NOT NULL` instead.",
            ),
            quiz({
              id: "q1",
              q: [
                "Hangi sorgu, e-postası olmayan (NULL) kullanıcıları doğru getirir?",
                "Which query correctly returns users whose email is missing (NULL)?",
              ],
              options: [
                ["`WHERE email IS NULL`", "`WHERE email IS NULL`"],
                ["`WHERE email = NULL`", "`WHERE email = NULL`"],
                ["`WHERE email = ''`", "`WHERE email = ''`"],
                ["`WHERE NOT email`", "`WHERE NOT email`"],
              ],
              answer: 0,
              explain: [
                "NULL için `=` çalışmaz; `IS NULL` / `IS NOT NULL` kullanılır. `= ''` ise boş metni bulur, bu farklı bir şeydir.",
                "`=` does not work with NULL; use `IS NULL` / `IS NOT NULL`. `= ''` finds empty strings, which is a different thing.",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "**İstanbul veya Ankara'da yaşayan** müşterilerin `name`, `city` ve `segment` bilgisini getir.",
                "Return `name`, `city` and `segment` for customers who live **in İstanbul or Ankara**.",
              ],
              starter: `SELECT name, city, segment\nFROM customers\nWHERE`,
              solution: `SELECT name, city, segment
FROM customers
WHERE city IN ('İstanbul', 'Ankara');`,
              hint: [
                "`IN ('a', 'b')` veya `city = 'a' OR city = 'b'` — ikisi de olur.",
                "`IN ('a', 'b')` or `city = 'a' OR city = 'b'` — both work.",
              ],
            }),
            sqlTask({
              id: "t2",
              dataset: "shop",
              prompt: [
                "Fiyatı **1000 ile 5000 arasında** olan ürünlerin `name` ve `price` bilgisini getir.",
                "Return `name` and `price` of products priced **between 1000 and 5000**.",
              ],
              starter: `SELECT name, price\nFROM products\nWHERE`,
              solution: `SELECT name, price
FROM products
WHERE price BETWEEN 1000 AND 5000;`,
              xp: 25,
            }),
          ],
        }),

        lesson({
          slug: "order-limit-distinct",
          title: L("Sıralama, sınırlama ve benzersiz değerler", "Sorting, limiting and distinct values"),
          summary: L(
            "\"En çok\", \"en pahalı\", \"kaç farklı\" sorularının cevabı burada.",
            "This is where \"top\", \"most expensive\" and \"how many distinct\" get answered.",
          ),
          minutes: 12,
          blocks: [
            text(
              "`ORDER BY` sonucu sıralar (`ASC` artan — varsayılan, `DESC` azalan). `LIMIT` kaç satır döneceğini sınırlar. İkisi birlikte klasik \"ilk N\" sorusunu cevaplar.",
              "`ORDER BY` sorts the result (`ASC` ascending — the default, `DESC` descending). `LIMIT` caps how many rows come back. Together they answer the classic \"top N\" question.",
            ),
            code(
              "sql",
              `-- En pahalı 5 ürün
SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 5;

-- Önce kategoriye, kategori içinde fiyata göre
SELECT name, category_id, price
FROM products
ORDER BY category_id ASC, price DESC;

-- Kaç farklı şehir var?
SELECT DISTINCT city FROM customers;`,
            ),
            info(
              "Yazım sırası ≠ çalışma sırası",
              "Written order ≠ execution order",
              "SQL'i `SELECT ... FROM ... WHERE ... GROUP BY ... ORDER BY` diye yazarsın ama veritabanı şu sırayla çalıştırır: **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT**. Bu yüzden `SELECT`'te tanımladığın takma adı `WHERE` içinde kullanamazsın ama `ORDER BY` içinde kullanabilirsin.",
              "You write `SELECT ... FROM ... WHERE ... GROUP BY ... ORDER BY`, but the database runs it in this order: **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT**. That is why an alias defined in `SELECT` cannot be used in `WHERE`, but can be used in `ORDER BY`.",
            ),
            order({
              id: "o1",
              prompt: [
                "Bir SQL sorgusunun yazım sırasını doğru diz.",
                "Put the clauses of a SQL query into the correct written order.",
              ],
              lines: [
                "SELECT category_id, COUNT(*) AS adet",
                "FROM products",
                "WHERE price > 500",
                "GROUP BY category_id",
                "HAVING COUNT(*) > 1",
                "ORDER BY adet DESC",
                "LIMIT 3;",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "**En pahalı 3 ürünü** `name` ve `price` sütunlarıyla, pahalıdan ucuza sıralı getir.",
                "Return the **3 most expensive products** with `name` and `price`, sorted from expensive to cheap.",
              ],
              starter: `SELECT name, price\nFROM products`,
              solution: `SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 3;`,
              hint: [
                "Azalan sıralama için `ORDER BY price DESC`, ilk 3 için `LIMIT 3`.",
                "Use `ORDER BY price DESC` for descending, then `LIMIT 3`.",
              ],
            }),
          ],
        }),

        lesson({
          slug: "group-by",
          title: L("GROUP BY: satırları özete çevirmek", "GROUP BY: turning rows into summaries"),
          summary: L(
            "Ham satırlardan \"kategori başına ciro\", \"şehir başına müşteri\" gibi iş cevaplarına geç.",
            "Move from raw rows to business answers like revenue per category or customers per city.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Toplama (aggregate) fonksiyonları bir sütundaki birçok satırı tek bir değere indirger: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.\n\n`GROUP BY` ise bu indirgemeyi **grup grup** yapar: her şehir için ayrı, her kategori için ayrı.",
              "Aggregate functions collapse many rows of a column into one value: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.\n\n`GROUP BY` performs that collapse **per group**: once for each city, once for each category.",
            ),
            code(
              "sql",
              `-- Tüm tablo için tek satır özet
SELECT COUNT(*) AS urun_sayisi, AVG(price) AS ortalama_fiyat
FROM products;

-- Kategori başına özet
SELECT
  category_id,
  COUNT(*)               AS urun_sayisi,
  ROUND(AVG(price), 2)   AS ortalama_fiyat,
  MAX(price)             AS en_pahali
FROM products
GROUP BY category_id;`,
            ),
            text(
              "Kural: `SELECT` içindeki her sütun ya `GROUP BY` listesinde olmalı ya da bir toplama fonksiyonunun içinde olmalı.\n\nGrupları filtrelemek için `WHERE` değil `HAVING` kullanılır. `WHERE` gruplama **öncesi** satırları, `HAVING` gruplama **sonrası** grupları eler.",
              "Rule: every column in `SELECT` must either appear in `GROUP BY` or sit inside an aggregate function.\n\nTo filter groups use `HAVING`, not `WHERE`. `WHERE` removes rows **before** grouping, `HAVING` removes groups **after** grouping.",
            ),
            code(
              "sql",
              `SELECT city, COUNT(*) AS musteri_sayisi
FROM customers
WHERE segment = 'bireysel'    -- önce satırları ele
GROUP BY city
HAVING COUNT(*) >= 2          -- sonra grupları ele
ORDER BY musteri_sayisi DESC;`,
            ),
            quiz({
              id: "q1",
              q: [
                "`COUNT(*)` ile `COUNT(signup_date)` arasındaki fark nedir?",
                "What is the difference between `COUNT(*)` and `COUNT(signup_date)`?",
              ],
              options: [
                [
                  "`COUNT(*)` tüm satırları sayar; `COUNT(signup_date)` NULL olmayanları sayar",
                  "`COUNT(*)` counts all rows; `COUNT(signup_date)` counts non-NULL values",
                ],
                ["İkisi de aynı sonucu verir", "They always return the same result"],
                ["`COUNT(*)` daha yavaştır ama aynıdır", "`COUNT(*)` is slower but identical"],
                [
                  "`COUNT(signup_date)` benzersiz değerleri sayar",
                  "`COUNT(signup_date)` counts distinct values",
                ],
              ],
              answer: 0,
              explain: [
                "Toplama fonksiyonları NULL'ları atlar. Bu yüzden `COUNT(sütun)` çoğu zaman `COUNT(*)`'dan küçüktür — ve bu fark genelde veri kalitesi hakkında bir şey söyler. Benzersiz sayım için `COUNT(DISTINCT sütun)` gerekir.",
                "Aggregates skip NULLs, so `COUNT(column)` is often smaller than `COUNT(*)` — and that gap usually tells you something about data quality. For distinct counts use `COUNT(DISTINCT column)`.",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "Her **şehir** için müşteri sayısını hesapla. Sütunlar: `city` ve müşteri sayısı. Sonucu müşteri sayısına göre **azalan** sırala.",
                "Count customers per **city**. Columns: `city` and the customer count. Sort by the count **descending**.",
              ],
              starter: `SELECT city, COUNT(*) AS musteri_sayisi\nFROM customers`,
              solution: `SELECT city, COUNT(*) AS musteri_sayisi
FROM customers
GROUP BY city
ORDER BY musteri_sayisi DESC;`,
            }),
            sqlTask({
              id: "t2",
              dataset: "shop",
              prompt: [
                "Her `category_id` için **ürün sayısını** ve **ortalama fiyatı** getir; yalnızca ortalama fiyatı **2000'in üstünde** olan kategorileri göster.",
                "For each `category_id` return the **product count** and **average price**; keep only categories whose average price is **above 2000**.",
              ],
              starter: `SELECT category_id, COUNT(*) AS adet, AVG(price) AS ort\nFROM products\nGROUP BY category_id`,
              solution: `SELECT category_id, COUNT(*) AS adet, AVG(price) AS ort
FROM products
GROUP BY category_id
HAVING AVG(price) > 2000;`,
              hint: [
                "Grupları elemek için `HAVING` kullan, `WHERE` değil.",
                "Filter groups with `HAVING`, not `WHERE`.",
              ],
              xp: 35,
            }),
          ],
        }),
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "intermediate",
      title: L("Orta — Tabloları birleştirmek", "Intermediate — Joining tables"),
      description: L(
        "Gerçek veri hiç tek tabloda durmaz. JOIN, alt sorgu ve CTE ile parçaları birleştir.",
        "Real data never lives in one table. Bring the pieces together with JOINs, subqueries and CTEs.",
      ),
      projectSlug: "sql-musteri-segmentasyonu",
      lessons: [
        lesson({
          slug: "joinler",
          title: L("JOIN: tabloları birleştirmek", "JOIN: combining tables"),
          summary: L(
            "Siparişe müşteri adını, ürüne kategorisini ekle. INNER ve LEFT arasındaki farkı kavra.",
            "Attach customer names to orders and categories to products. Understand INNER vs LEFT.",
          ),
          minutes: 18,
          blocks: [
            text(
              "Veritabanları tekrarı önlemek için veriyi tablolara böler: sipariş tablosunda müşterinin adı değil `customer_id`'si durur. `JOIN`, bu kimlik üzerinden tabloları yeniden birleştirir.",
              "Databases split data into tables to avoid repetition: the orders table stores a `customer_id`, not the customer's name. `JOIN` stitches the tables back together on that key.",
            ),
            code(
              "sql",
              `SELECT
  o.id           AS siparis_no,
  c.name         AS musteri,
  o.order_date   AS tarih,
  o.status       AS durum
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id;`,
              "Tablolara kısa takma ad vermek sorguyu okunur kılar",
              "Short table aliases keep the query readable",
            ),
            text(
              "- **INNER JOIN** (kısaca `JOIN`): yalnızca iki tarafta da eşleşen satırlar gelir.\n- **LEFT JOIN**: soldaki tablonun tüm satırları gelir; sağda eşleşme yoksa sütunlar NULL olur.\n\nLEFT JOIN, \"hiç sipariş vermemiş müşteriler\" gibi *eksik olanı* aramak için vazgeçilmezdir.",
              "- **INNER JOIN** (just `JOIN`): only rows that match on both sides.\n- **LEFT JOIN**: every row from the left table; when there is no match on the right, those columns become NULL.\n\nLEFT JOIN is the tool for finding *what is missing*, like customers who never ordered.",
            ),
            code(
              "sql",
              `-- Hiç sipariş vermemiş müşteriler
SELECT c.name
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
WHERE o.id IS NULL;`,
            ),
            pitfall(
              "LEFT JOIN'i WHERE ile INNER'a çevirmek",
              "Turning a LEFT JOIN into an INNER by accident",
              "`LEFT JOIN orders o ON ... WHERE o.status = 'teslim'` yazarsan eşleşmeyen satırların `status`'ü NULL olur, `WHERE` onları eler ve LEFT JOIN anlamsızlaşır. Sağ tabloya ait koşulları `ON` kısmına taşı: `LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'teslim'`.",
              "If you write `LEFT JOIN orders o ON ... WHERE o.status = 'delivered'`, unmatched rows get a NULL status, `WHERE` drops them, and the LEFT JOIN becomes pointless. Move conditions on the right table into `ON`: `LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'delivered'`.",
            ),
            quiz({
              id: "q1",
              q: [
                "`customers` tablosunda 15 müşteri var ama bunların yalnızca 12'sinin siparişi var. `customers INNER JOIN orders` kaç **farklı müşteri** döndürür?",
                "The `customers` table has 15 rows but only 12 of them have orders. How many **distinct customers** does `customers INNER JOIN orders` return?",
              ],
              options: [
                ["12", "12"],
                ["15", "15"],
                ["3", "3"],
                ["Sipariş sayısı kadar", "As many as there are orders"],
              ],
              answer: 0,
              explain: [
                "INNER JOIN yalnızca eşleşenleri getirir, yani siparişi olan 12 müşteri. Kalan 3 müşteriyi görmek istiyorsan LEFT JOIN gerekir. (Toplam **satır** sayısı ise sipariş sayısı kadar olur, çünkü çok siparişli müşteri birden çok satırda tekrar eder.)",
                "INNER JOIN keeps only matches, so the 12 customers with orders. To see the remaining 3 you need a LEFT JOIN. (The total **row** count equals the number of orders, since a customer with many orders repeats.)",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "Her siparişi **müşteri adıyla** listele. Sütunlar: sipariş `id`, müşteri `name`, `order_date`. Sipariş numarasına göre artan sırala.",
                "List every order **with the customer's name**. Columns: order `id`, customer `name`, `order_date`. Sort ascending by order id.",
              ],
              starter: `SELECT o.id, c.name, o.order_date\nFROM orders AS o`,
              solution: `SELECT o.id, c.name, o.order_date
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
ORDER BY o.id;`,
            }),
            sqlTask({
              id: "t2",
              dataset: "shop",
              prompt: [
                "**Kategori bazında ciro** hesapla. Yalnızca `status = 'teslim'` siparişleri say. Ciro = `quantity * unit_price` toplamı. Sütunlar: kategori adı ve ciro; ciroya göre azalan sırala.",
                "Compute **revenue per category**. Count only orders with `status = 'teslim'`. Revenue = sum of `quantity * unit_price`. Columns: category name and revenue; sort by revenue descending.",
              ],
              starter: `SELECT ct.name, SUM(oi.quantity * oi.unit_price) AS ciro\nFROM order_items AS oi\nJOIN products AS p ON p.id = oi.product_id`,
              solution: `SELECT ct.name, SUM(oi.quantity * oi.unit_price) AS ciro
FROM order_items AS oi
JOIN products AS p ON p.id = oi.product_id
JOIN categories AS ct ON ct.id = p.category_id
JOIN orders AS o ON o.id = oi.order_id
WHERE o.status = 'teslim'
GROUP BY ct.name
ORDER BY ciro DESC;`,
              hint: [
                "Dört tabloyu zincirle: order_items → products → categories, ayrıca order_items → orders (durum filtresi için).",
                "Chain four tables: order_items → products → categories, plus order_items → orders for the status filter.",
              ],
              xp: 45,
            }),
          ],
        }),

        lesson({
          slug: "alt-sorgular",
          title: L("Alt sorgular ve CTE", "Subqueries and CTEs"),
          summary: L(
            "Bir sorgunun sonucunu başka bir sorgunun girdisi yap; karmaşık soruları katmanlara böl.",
            "Feed one query's result into another and break complex questions into layers.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Alt sorgu, parantez içindeki bir `SELECT`'tir. Üç yerde kullanılır: `WHERE` içinde (filtre), `FROM` içinde (geçici tablo), `SELECT` içinde (satır başına hesap).",
              "A subquery is a `SELECT` inside parentheses. It shows up in three places: inside `WHERE` (a filter), inside `FROM` (a temporary table), and inside `SELECT` (a per-row computation).",
            ),
            code(
              "sql",
              `-- Ortalamanın üstünde fiyatlı ürünler
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Kurumsal müşterilerin siparişleri
SELECT * FROM orders
WHERE customer_id IN (
  SELECT id FROM customers WHERE segment = 'kurumsal'
);`,
            ),
            text(
              "İç içe alt sorgular hızla okunmaz hale gelir. **CTE** (Common Table Expression, `WITH`) aynı işi yapar ama yukarıdan aşağı okunur ve adlandırılabilir — gerçek işlerde tercih edilen yol budur.",
              "Nested subqueries get unreadable fast. A **CTE** (Common Table Expression, `WITH`) does the same job but reads top-to-bottom and can be named — this is what people reach for in real work.",
            ),
            code(
              "sql",
              `WITH siparis_tutari AS (
  SELECT order_id, SUM(quantity * unit_price) AS tutar
  FROM order_items
  GROUP BY order_id
)
SELECT o.id, c.name, s.tutar
FROM siparis_tutari AS s
JOIN orders    AS o ON o.id = s.order_id
JOIN customers AS c ON c.id = o.customer_id
WHERE s.tutar > 5000
ORDER BY s.tutar DESC;`,
              "Aynı sorgu CTE ile katman katman",
              "The same query, layered with a CTE",
            ),
            tip(
              "CTE'yi adım adım yaz",
              "Build the CTE step by step",
              "Önce sadece `WITH` bloğundaki sorguyu çalıştırıp sonucuna bak. Doğruysa üstüne bir katman ekle. Karmaşık sorguları böyle yazmak hata ayıklamayı dakikalardan saniyelere indirir.",
              "Run just the query inside `WITH` first and look at its output. If it is right, add the next layer. Writing complex SQL this way cuts debugging from minutes to seconds.",
            ),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "Sipariş başına toplam tutarı hesapla ve **5.000 TL'den büyük** siparişleri listele. Sütunlar: `order_id` ve tutar; tutara göre azalan sırala.",
                "Compute the total amount per order and list orders **above 5,000**. Columns: `order_id` and the amount; sort by amount descending.",
              ],
              starter: `WITH siparis_tutari AS (\n  SELECT order_id, SUM(quantity * unit_price) AS tutar\n  FROM order_items\n  GROUP BY order_id\n)\nSELECT`,
              solution: `WITH siparis_tutari AS (
  SELECT order_id, SUM(quantity * unit_price) AS tutar
  FROM order_items
  GROUP BY order_id
)
SELECT order_id, tutar
FROM siparis_tutari
WHERE tutar > 5000
ORDER BY tutar DESC;`,
              xp: 35,
            }),
            sqlTask({
              id: "t2",
              dataset: "shop",
              prompt: [
                "**Hiç sipariş vermemiş** müşterilerin adlarını bul. Sütun: `name`.",
                "Find the names of customers who have **never placed an order**. Column: `name`.",
              ],
              starter: `SELECT c.name\nFROM customers AS c`,
              solution: `SELECT c.name
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
WHERE o.id IS NULL;`,
              hint: [
                "LEFT JOIN + `WHERE o.id IS NULL`, ya da `WHERE id NOT IN (SELECT customer_id FROM orders)`.",
                "LEFT JOIN + `WHERE o.id IS NULL`, or `WHERE id NOT IN (SELECT customer_id FROM orders)`.",
              ],
            }),
          ],
        }),

        lesson({
          slug: "tarih-ve-metin",
          title: L("Tarih ve metinle çalışmak", "Working with dates and text"),
          summary: L(
            "Aylık trend çıkarmak, isim temizlemek, kategori türetmek: günlük analiz işinin çoğu bu.",
            "Monthly trends, cleaning names, deriving categories: most day-to-day analysis lives here.",
          ),
          minutes: 15,
          blocks: [
            text(
              "Zaman serisi raporlarının temeli, tarihi istenen granülerliğe indirgemektir. SQLite'ta bunu `strftime` yapar; PostgreSQL'de `DATE_TRUNC`, BigQuery'de `FORMAT_DATE` aynı işi görür.",
              "Time-series reporting starts by truncating a date to the granularity you want. In SQLite that is `strftime`; PostgreSQL uses `DATE_TRUNC` and BigQuery `FORMAT_DATE` for the same job.",
            ),
            code(
              "sql",
              `-- Aylık sipariş sayısı
SELECT
  strftime('%Y-%m', order_date) AS ay,
  COUNT(*)                      AS siparis_sayisi
FROM orders
GROUP BY ay
ORDER BY ay;`,
            ),
            text(
              "`CASE WHEN`, SQL'in \"eğer\"idir. Sayısal bir sütunu iş diline çevirmek (segment, kova, bayrak) için en çok kullanılan araçtır.",
              "`CASE WHEN` is SQL's \"if\". It is the most common way to translate a numeric column into business language (segments, buckets, flags).",
            ),
            code(
              "sql",
              `SELECT
  name,
  price,
  CASE
    WHEN price < 500  THEN 'ekonomik'
    WHEN price < 3000 THEN 'orta'
    ELSE                   'premium'
  END AS fiyat_segmenti
FROM products;`,
            ),
            code(
              "sql",
              `-- Sık kullanılan metin fonksiyonları
SELECT
  UPPER(name)              AS buyuk,
  LENGTH(name)             AS uzunluk,
  SUBSTR(name, 1, 3)       AS ilk_uc,
  TRIM('  bosluklu  ')     AS temiz,
  COALESCE(signup_date, 'bilinmiyor') AS kayit
FROM customers;`,
            ),
            quiz({
              id: "q1",
              q: [
                "`COALESCE(signup_date, 'bilinmiyor')` ne yapar?",
                "What does `COALESCE(signup_date, 'unknown')` do?",
              ],
              options: [
                [
                  "signup_date NULL ise 'bilinmiyor' döndürür, değilse tarihi döndürür",
                  "Returns 'unknown' when signup_date is NULL, otherwise the date",
                ],
                ["Tüm tarihleri 'bilinmiyor' yapar", "Replaces every date with 'unknown'"],
                ["NULL satırları siler", "Deletes rows that are NULL"],
                ["Tarihi metne çevirir", "Casts the date to text"],
              ],
              answer: 0,
              explain: [
                "`COALESCE` argümanları soldan sağa gezip **ilk NULL olmayanı** döndürür. Raporlarda boş hücre yerine anlamlı bir etiket göstermek için kullanılır.",
                "`COALESCE` walks its arguments left to right and returns the **first non-NULL** one. It is how you show a meaningful label instead of a blank cell in a report.",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "**Aylık ciro** raporu çıkar: her ay için (`YYYY-MM`) teslim edilen siparişlerin toplam tutarı. Sütunlar: ay ve ciro; aya göre artan sırala.",
                "Build a **monthly revenue** report: total amount of delivered orders per month (`YYYY-MM`). Columns: month and revenue; sort ascending by month.",
              ],
              starter: `SELECT strftime('%Y-%m', o.order_date) AS ay,\n       SUM(oi.quantity * oi.unit_price) AS ciro\nFROM orders AS o`,
              solution: `SELECT strftime('%Y-%m', o.order_date) AS ay,
       SUM(oi.quantity * oi.unit_price) AS ciro
FROM orders AS o
JOIN order_items AS oi ON oi.order_id = o.id
WHERE o.status = 'teslim'
GROUP BY ay
ORDER BY ay;`,
              xp: 40,
            }),
          ],
        }),
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "advanced",
      title: L("İleri — Analitik SQL", "Advanced — Analytical SQL"),
      description: L(
        "Pencere fonksiyonları, kohort analizi ve performans: analist ile kıdemli analist arasındaki fark.",
        "Window functions, cohort analysis and performance: the gap between analyst and senior analyst.",
      ),
      projectSlug: "sql-kohort-analizi",
      lessons: [
        lesson({
          slug: "pencere-fonksiyonlari",
          title: L("Pencere fonksiyonları", "Window functions"),
          summary: L(
            "Satırları toplamadan, her satırın yanına grup hesabı yaz: sıralama, kümülatif toplam, önceki dönem.",
            "Add group-level maths next to each row without collapsing it: ranking, running totals, previous period.",
          ),
          minutes: 20,
          blocks: [
            text(
              "`GROUP BY` satırları **birleştirir**; pencere fonksiyonları satırları **korur** ve yanlarına hesaplanmış bir sütun ekler. \"Her ürünün kendi kategorisindeki sırası\" gibi sorular yalnızca böyle cevaplanır.",
              "`GROUP BY` **collapses** rows; window functions **keep** every row and add a computed column beside it. Questions like \"each product's rank within its own category\" can only be answered this way.",
            ),
            code(
              "sql",
              `SELECT
  name,
  category_id,
  price,
  RANK()       OVER (PARTITION BY category_id ORDER BY price DESC) AS kategori_sirasi,
  AVG(price)   OVER (PARTITION BY category_id)                     AS kategori_ortalamasi,
  price - AVG(price) OVER (PARTITION BY category_id)               AS ortalamadan_fark
FROM products;`,
              "PARTITION BY = grubu tanımlar, ORDER BY = grup içindeki sırayı",
              "PARTITION BY defines the group, ORDER BY the order inside it",
            ),
            text(
              "En çok kullanılan pencere fonksiyonları:\n\n- `ROW_NUMBER()` — 1, 2, 3… beraberlik yok\n- `RANK()` — beraberlikte aynı sıra, sonra atlar (1, 1, 3)\n- `DENSE_RANK()` — beraberlikte aynı sıra, atlamaz (1, 1, 2)\n- `LAG(x)` / `LEAD(x)` — önceki / sonraki satırın değeri\n- `SUM(x) OVER (ORDER BY ...)` — kümülatif toplam",
              "The window functions you will use most:\n\n- `ROW_NUMBER()` — 1, 2, 3… no ties\n- `RANK()` — ties share a rank, then skip (1, 1, 3)\n- `DENSE_RANK()` — ties share a rank, no skip (1, 1, 2)\n- `LAG(x)` / `LEAD(x)` — value from the previous / next row\n- `SUM(x) OVER (ORDER BY ...)` — running total",
            ),
            code(
              "sql",
              `-- Aydan aya büyüme
WITH aylik AS (
  SELECT strftime('%Y-%m', o.order_date) AS ay,
         SUM(oi.quantity * oi.unit_price) AS ciro
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.status = 'teslim'
  GROUP BY ay
)
SELECT
  ay,
  ciro,
  LAG(ciro) OVER (ORDER BY ay)                       AS onceki_ay,
  ROUND(100.0 * (ciro - LAG(ciro) OVER (ORDER BY ay))
        / LAG(ciro) OVER (ORDER BY ay), 1)           AS buyume_yuzde,
  SUM(ciro) OVER (ORDER BY ay)                       AS kumulatif
FROM aylik
ORDER BY ay;`,
            ),
            quiz({
              id: "q1",
              q: [
                "Fiyatları 100, 100, 90 olan üç ürün için `RANK()` ne döndürür?",
                "For three products priced 100, 100, 90, what does `RANK()` return?",
              ],
              options: [
                ["1, 1, 3", "1, 1, 3"],
                ["1, 1, 2", "1, 1, 2"],
                ["1, 2, 3", "1, 2, 3"],
                ["1, 2, 2", "1, 2, 2"],
              ],
              answer: 0,
              explain: [
                "`RANK()` beraberlikten sonra sıra atlar (1, 1, 3). Atlamayanı istiyorsan `DENSE_RANK()` (1, 1, 2), beraberlik istemiyorsan `ROW_NUMBER()` (1, 2, 3) kullan.",
                "`RANK()` skips after a tie (1, 1, 3). Use `DENSE_RANK()` if you do not want the skip (1, 1, 2), or `ROW_NUMBER()` if you want no ties at all (1, 2, 3).",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "Her ürünü `name`, `category_id`, `price` ve **kendi kategorisindeki fiyat sırası** ile listele (en pahalı = 1). Sırayı `sira` olarak adlandır; `category_id`, sonra sıra artan olacak şekilde sırala.",
                "List every product with `name`, `category_id`, `price` and its **price rank inside its own category** (most expensive = 1). Name the rank `sira`; sort by `category_id`, then rank ascending.",
              ],
              starter: `SELECT name, category_id, price,\n       -- pencere fonksiyonunu buraya yaz\nFROM products`,
              solution: `SELECT name, category_id, price,
       RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS sira
FROM products
ORDER BY category_id, sira;`,
              hint: [
                "`RANK() OVER (PARTITION BY category_id ORDER BY price DESC)`",
                "`RANK() OVER (PARTITION BY category_id ORDER BY price DESC)`",
              ],
              xp: 45,
            }),
            sqlTask({
              id: "t2",
              dataset: "shop",
              prompt: [
                "Aylık ciroyu ve **kümülatif ciroyu** hesapla (yalnızca `teslim` siparişler). Sütunlar: ay, ciro, kümülatif; aya göre artan sırala.",
                "Compute monthly revenue and the **running total** (delivered orders only). Columns: month, revenue, cumulative; sorted ascending by month.",
              ],
              starter: `WITH aylik AS (\n  SELECT strftime('%Y-%m', o.order_date) AS ay,\n         SUM(oi.quantity * oi.unit_price) AS ciro\n  FROM orders o\n  JOIN order_items oi ON oi.order_id = o.id\n  WHERE o.status = 'teslim'\n  GROUP BY ay\n)\nSELECT`,
              solution: `WITH aylik AS (
  SELECT strftime('%Y-%m', o.order_date) AS ay,
         SUM(oi.quantity * oi.unit_price) AS ciro
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.status = 'teslim'
  GROUP BY ay
)
SELECT ay, ciro, SUM(ciro) OVER (ORDER BY ay) AS kumulatif
FROM aylik
ORDER BY ay;`,
              xp: 50,
            }),
          ],
        }),

        lesson({
          slug: "kohort-ve-huni",
          title: L("Kohort ve huni analizi", "Cohort and funnel analysis"),
          summary: L(
            "Ürün ekiplerinin en çok istediği iki rapor: kullanıcılar kalıyor mu, nerede düşüyorlar?",
            "The two reports product teams ask for most: are users staying, and where do they drop off?",
          ),
          minutes: 20,
          blocks: [
            text(
              "**Kohort analizi**, kullanıcıları ilk temas ayına göre gruplar ve her grubun sonraki aylarda ne kadar kaldığını ölçer. Tek bir \"aktif kullanıcı\" sayısının gizlediği şeyi ortaya çıkarır: yeni kullanıcı akışı mı iyi, yoksa eskiler mi kalıyor?",
              "**Cohort analysis** groups users by the month of first contact and measures how many stay in later months. It reveals what a single \"active users\" number hides: is the growth new signups, or are old users sticking?",
            ),
            code(
              "sql",
              `WITH ilk_siparis AS (
  SELECT customer_id,
         MIN(strftime('%Y-%m', order_date)) AS kohort
  FROM orders
  GROUP BY customer_id
),
aktivite AS (
  SELECT o.customer_id,
         i.kohort,
         strftime('%Y-%m', o.order_date) AS ay
  FROM orders o
  JOIN ilk_siparis i ON i.customer_id = o.customer_id
)
SELECT kohort, ay, COUNT(DISTINCT customer_id) AS aktif_musteri
FROM aktivite
GROUP BY kohort, ay
ORDER BY kohort, ay;`,
              "Kohort tablosunun iskeleti",
              "The skeleton of a cohort table",
            ),
            text(
              "**Huni (funnel) analizi** ise bir akıştaki adımları sayar: sayfa görüntüleme → ürün görüntüleme → sepete ekleme → satın alma. En büyük düşüşün olduğu adım, ürün ekibinin bir sonraki işidir.",
              "**Funnel analysis** counts the steps of a flow: page view → product view → add to cart → purchase. The step with the biggest drop-off is the product team's next job.",
            ),
            info(
              "Huni sayarken oturum mu, kullanıcı mı?",
              "Funnels: sessions or users?",
              "Aynı kullanıcı bir adımı iki kez yapabilir. Bu yüzden huni adımlarında `COUNT(*)` değil `COUNT(DISTINCT user_id)` veya `COUNT(DISTINCT session_id)` sayılır. Hangisini seçtiğini rapora yazmak, sonradan çıkacak \"bu sayı neden farklı?\" tartışmasını önler.",
              "The same user can repeat a step. That is why funnel steps use `COUNT(DISTINCT user_id)` or `COUNT(DISTINCT session_id)`, never `COUNT(*)`. Writing down which one you chose prevents the inevitable \"why is this number different?\" argument later.",
            ),
            sqlTask({
              id: "t1",
              dataset: "web",
              prompt: [
                "`events` tablosundan bir **huni** çıkar: her `name` (olay adı) için kaç **farklı oturum** var? Sütunlar: olay adı ve farklı oturum sayısı; sayıya göre azalan sırala.",
                "Build a **funnel** from the `events` table: how many **distinct sessions** hit each `name`? Columns: event name and distinct session count; sort by the count descending.",
              ],
              starter: `SELECT name, COUNT(DISTINCT session_id) AS oturum\nFROM events`,
              solution: `SELECT name, COUNT(DISTINCT session_id) AS oturum
FROM events
GROUP BY name
ORDER BY oturum DESC;`,
              xp: 40,
            }),
            sqlTask({
              id: "t2",
              dataset: "web",
              prompt: [
                "Her **trafik kaynağı** (`sessions.source`) için oturum sayısını ve **satın alma yapan** oturum sayısını getir. Sütunlar: kaynak, oturum sayısı, satın alan oturum sayısı; oturum sayısına göre azalan sırala.",
                "For each **traffic source** (`sessions.source`) return the session count and the number of sessions that **purchased**. Columns: source, sessions, purchasing sessions; sort by sessions descending.",
              ],
              starter: `SELECT s.source,\n       COUNT(*) AS oturum,\n       -- satın alma yapan oturumları say\nFROM sessions AS s`,
              solution: `SELECT s.source,
       COUNT(*) AS oturum,
       COUNT(DISTINCT CASE WHEN e.name = 'satin_alma' THEN s.id END) AS satin_alan
FROM sessions AS s
LEFT JOIN events AS e ON e.session_id = s.id
GROUP BY s.source
ORDER BY oturum DESC;`,
              hint: [
                "Dikkat: LEFT JOIN sonrası `COUNT(*)` olayları sayar, oturumları değil. Oturum saymak için `COUNT(DISTINCT s.id)` gerekir — ya da önce oturum başına satın alma bayrağı üreten bir CTE yaz.",
                "Careful: after a LEFT JOIN, `COUNT(*)` counts events, not sessions. Use `COUNT(DISTINCT s.id)` — or write a CTE that flags purchase per session first.",
              ],
              xp: 55,
            }),
          ],
        }),

        lesson({
          slug: "performans",
          title: L("Sorgu performansı ve okunabilirlik", "Query performance and readability"),
          summary: L(
            "Yavaş sorgu, yanlış sorgudan daha az fark edilir ama iş akışını aynı şekilde bozar.",
            "A slow query is less visible than a wrong one, but it breaks the workflow just the same.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Bir sorgunun yavaşlamasının en yaygın sebepleri:\n\n- **İndeks yok**: `WHERE` ve `JOIN` sütunlarında indeks olmadan veritabanı tüm tabloyu tarar.\n- **Sütuna fonksiyon uygulamak**: `WHERE YEAR(order_date) = 2024` indeksi devre dışı bırakır. Doğrusu: `WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01'`.\n- **Gereksiz `SELECT *`**: taşınan veriyi büyütür.\n- **Erken değil geç filtreleme**: filtreyi mümkün olan en erken katmana koy.",
              "The usual reasons a query gets slow:\n\n- **No index**: without one on your `WHERE` and `JOIN` columns the database scans the whole table.\n- **Wrapping the column in a function**: `WHERE YEAR(order_date) = 2024` disables the index. Write `WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01'` instead.\n- **Needless `SELECT *`**: moves more data than required.\n- **Filtering late instead of early**: push filters into the earliest layer you can.",
            ),
            code(
              "sql",
              `-- Sık filtrelenen sütuna indeks
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Sorgunun planını gör (SQLite)
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE customer_id = 5;`,
            ),
            quiz({
              id: "q1",
              q: [
                "Hangi `WHERE` koşulu `order_date` üzerindeki indeksten yararlanabilir?",
                "Which `WHERE` condition can use an index on `order_date`?",
              ],
              options: [
                [
                  "`WHERE order_date >= '2024-01-01'`",
                  "`WHERE order_date >= '2024-01-01'`",
                ],
                [
                  "`WHERE strftime('%Y', order_date) = '2024'`",
                  "`WHERE strftime('%Y', order_date) = '2024'`",
                ],
                ["`WHERE CAST(order_date AS TEXT) LIKE '2024%'`", "`WHERE CAST(order_date AS TEXT) LIKE '2024%'`"],
                ["Üçü de aynı hızda çalışır", "All three run at the same speed"],
              ],
              answer: 0,
              explain: [
                "İndeks, sütunun **ham değeri** üzerinde tutulur. Sütunu bir fonksiyonla sardığında veritabanı her satır için o fonksiyonu çalıştırmak zorunda kalır ve indeksi kullanamaz. Aralık karşılaştırması ise indeksin tam da yapmak için var olduğu iştir.",
                "An index is built on the column's **raw value**. Wrap the column in a function and the database must evaluate it row by row, so the index is useless. A range comparison is exactly what an index is built for.",
              ],
              xp: 20,
            }),
            tip(
              "Okunabilirlik de performanstır",
              "Readability is performance too",
              "Altı ay sonra o sorguyu okuyacak kişi büyük ihtimalle sensin. CTE'lerle katmanla, takma adları anlamlı seç, her CTE'nin üstüne bir satır yorum yaz. Yeniden yazmak zorunda kalmadığın sorgu, en hızlı sorgudur.",
              "In six months the person reading that query is probably you. Layer it with CTEs, choose meaningful aliases, put one comment line above each CTE. The fastest query is the one you never have to rewrite.",
            ),
          ],
        }),
      ],
    },
  ],
};
