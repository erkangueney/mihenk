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
      id: "foundation",
      title: L("Veritabanı nedir?", "What is a database?"),
      description: L(
        "Tek satır SQL yazmadan önce: veri nerede durur, tablo neye benzer ve bir sorgu nasıl okunur?",
        "Before writing a single line of SQL: where does data live, what does a table look like, and how is a query read?",
      ),
      lessons: [
        lesson({
          slug: "veri-nerede-durur",
          title: L("Veri nerede durur?", "Where does data live?"),
          summary: L(
            "Excel dosyasından veritabanına: şirketler veriyi neden tabloya bölerek saklar?",
            "From a spreadsheet to a database: why do companies split data across tables?",
          ),
          minutes: 10,
          blocks: [
            text(
              "Küçük bir liste tutuyorsan bir Excel dosyası yeter. Ama veri büyüdüğünde üç sorun çıkar:\n\n- **Tekrar** — aynı müşterinin adını her siparişte yeniden yazarsın. Adı değişince yüzlerce satırı düzeltmen gerekir.\n- **Eşzamanlılık** — aynı dosyayı iki kişi aynı anda değiştiremez.\n- **Boyut** — milyonlarca satırda tablo açılmaz bile.\n\n**Veritabanı** bu üç sorunu çözmek için tasarlanmış bir programdır. Veriyi diskte düzenli tutar, aynı anda yüzlerce kişiye hizmet eder ve milyarlarca satırda saniyeler içinde cevap verir.",
              "If you keep a short list, a spreadsheet is enough. But once data grows, three problems appear:\n\n- **Repetition** — you retype the same customer's name on every order. When the name changes you must fix hundreds of rows.\n- **Concurrency** — two people cannot edit the same file at the same time.\n- **Size** — a table with millions of rows will not even open.\n\nA **database** is a program built to solve exactly these three problems. It keeps data organised on disk, serves hundreds of people at once, and answers in seconds across billions of rows.",
            ),
            text(
              "**İlişkisel veritabanı**, veriyi birbirine bağlı tablolara böler. E-ticaret örneğinde:\n\n- `customers` — her müşteri **bir kez** yazılır\n- `orders` — her sipariş, müşteriye bir **numarayla** bağlanır\n- `products` — her ürün bir kez yazılır\n- `order_items` — hangi siparişte hangi üründen kaç adet olduğu\n\nMüşterinin adı yalnızca `customers` tablosunda durur. Ad değişirse tek bir satırı düzeltirsin, tüm siparişler otomatik olarak güncel kalır. Buna **normalizasyon** denir.",
              "A **relational database** splits data into linked tables. In an e-commerce example:\n\n- `customers` — each customer is written **once**\n- `orders` — each order links to a customer by a **number**\n- `products` — each product is written once\n- `order_items` — how many of which product appear in which order\n\nThe customer's name lives only in `customers`. If it changes you fix one row and every order stays correct automatically. This is called **normalisation**.",
            ),
            info(
              "SQL ne demek?",
              "What does SQL mean?",
              "**S**tructured **Q**uery **L**anguage — yapılandırılmış sorgu dili. 1970'lerde IBM'de doğdu ve elli yıldır ayakta. PostgreSQL, MySQL, SQL Server, Oracle, SQLite, BigQuery, Snowflake… hepsi aynı temel dili konuşur. Birinde öğrendiğin, diğerinde küçük farklarla çalışır. Bu yüzden SQL, bir analistin öğrenebileceği en uzun ömürlü beceridir.",
              "**S**tructured **Q**uery **L**anguage. It was born at IBM in the 1970s and is still standing fifty years later. PostgreSQL, MySQL, SQL Server, Oracle, SQLite, BigQuery, Snowflake — they all speak the same core language. What you learn in one works in another with minor differences. That makes SQL the longest-lived skill an analyst can pick up.",
            ),
            quiz({
              id: "q1",
              q: [
                "Müşterinin adı neden `orders` tablosunda değil de `customers` tablosunda tutulur?",
                "Why is the customer's name kept in `customers` rather than in `orders`?",
              ],
              options: [
                [
                  "Ad tek yerde durursa değiştiğinde tek satır güncellenir ve tutarsızlık oluşmaz",
                  "If the name lives in one place, a change updates one row and no inconsistency appears",
                ],
                ["`orders` tablosunda metin saklanamaz", "Text cannot be stored in the `orders` table"],
                ["Veritabanları sütun sayısını sınırlar", "Databases limit the number of columns"],
                ["Alfabetik sıralama için gereklidir", "It is required for alphabetical sorting"],
              ],
              answer: 0,
              explain: [
                "Buna \"tek doğruluk kaynağı\" denir. Ad her siparişte tekrarlansaydı, bir müşteri soyadını değiştirdiğinde bazı satırlar eski, bazıları yeni adı gösterirdi — ve hangisinin doğru olduğunu kimse bilemezdi.",
                "This is called a single source of truth. If the name were repeated on every order, then when a customer changed their surname some rows would show the old name and some the new — and nobody could tell which was right.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "tablo-satir-sutun",
          title: L("Tablo, satır, sütun ve veri tipleri", "Tables, rows, columns and data types"),
          summary: L(
            "Bir tabloyu okumayı öğren: anahtar nedir, NULL ne anlama gelir, tip neden önemlidir?",
            "Learn to read a table: what is a key, what does NULL mean, why do types matter?",
          ),
          minutes: 12,
          blocks: [
            text(
              "Bir **tablo**, bir konuya ait kayıtları tutan ızgaradır:\n\n- **Sütun (column)** — bir özellik: `name`, `price`, `stock`. Her sütunun sabit bir **tipi** vardır.\n- **Satır (row)** — tek bir kayıt: bir ürün, bir müşteri, bir sipariş.\n- **Birincil anahtar (primary key)** — satırı benzersiz kılan sütun, genellikle `id`. İki satır aynı `id`'yi taşıyamaz.\n- **Yabancı anahtar (foreign key)** — başka bir tablonun anahtarına işaret eden sütun. `orders.customer_id`, `customers.id`'ye bakar.",
              "A **table** is a grid holding records about one subject:\n\n- **Column** — one attribute: `name`, `price`, `stock`. Every column has a fixed **type**.\n- **Row** — one record: a product, a customer, an order.\n- **Primary key** — the column that makes a row unique, usually `id`. No two rows may share an `id`.\n- **Foreign key** — a column pointing at another table's key. `orders.customer_id` points at `customers.id`.",
            ),
            code(
              "sql",
              `-- Bu patikadaki e-ticaret veritabanının products tablosu:
CREATE TABLE products (
  id          INTEGER PRIMARY KEY,   -- benzersiz numara
  name        TEXT    NOT NULL,      -- metin, boş olamaz
  category_id INTEGER,               -- categories.id'ye işaret eder
  price       REAL    NOT NULL,      -- ondalıklı sayı
  stock       INTEGER NOT NULL       -- tam sayı
);`,
              "Şema, tablonun sözleşmesidir: hangi sütun, hangi tip, hangi kural.",
              "A schema is the table's contract: which column, which type, which rule.",
            ),
            text(
              "**En sık kullanılan tipler:**\n\n- `INTEGER` — tam sayı: adet, yaş, kimlik numarası\n- `REAL` / `DECIMAL` — ondalıklı sayı: fiyat, oran\n- `TEXT` / `VARCHAR` — metin: ad, şehir, açıklama\n- `DATE` / `TIMESTAMP` — tarih ve saat\n- `BOOLEAN` — doğru/yanlış\n\nTip önemlidir çünkü davranışı belirler. `'10' + '2'` metinse birleşip `'102'` olabilir; sayıysa `12` eder. Fiyatı metin olarak saklarsan sıralaman da alfabetik olur: `'1000'` değeri `'9'` değerinden **önce** gelir.",
              "**The most common types:**\n\n- `INTEGER` — whole numbers: quantity, age, id\n- `REAL` / `DECIMAL` — decimals: price, ratio\n- `TEXT` / `VARCHAR` — text: name, city, description\n- `DATE` / `TIMESTAMP` — date and time\n- `BOOLEAN` — true/false\n\nType matters because it decides behaviour. `'10' + '2'` as text may concatenate into `'102'`; as numbers it is `12`. Store a price as text and your sorting goes alphabetical too: `'1000'` sorts **before** `'9'`.",
            ),
            pitfall(
              "NULL bir değer değildir",
              "NULL is not a value",
              "`NULL`, \"burada değer yok\" demektir — sıfır da değil, boş metin de değil. **Bilinmeyen** anlamına gelir. Bu yüzden `NULL = NULL` sorusunun cevabı `true` değil, yine `NULL`'dur: iki bilinmeyenin eşit olup olmadığını kimse bilemez. NULL'u sınamak için `IS NULL` ve `IS NOT NULL` kullanılır. Bu ayrımı kaçıran analistler sessizce yanlış sayılar üretir.",
              "`NULL` means \"there is no value here\" — not zero, not an empty string. It means **unknown**. That is why the answer to `NULL = NULL` is not `true` but `NULL` again: nobody can know whether two unknowns are equal. To test for it you use `IS NULL` and `IS NOT NULL`. Analysts who miss this distinction quietly produce wrong numbers.",
            ),
            quiz({
              id: "q1",
              q: [
                "`customers` tablosunda `signup_date` sütunu bazı satırlarda `NULL`. Bu ne anlama gelir?",
                "In the `customers` table the `signup_date` column is `NULL` on some rows. What does that mean?",
              ],
              options: [
                [
                  "O müşteriler için kayıt tarihi bilinmiyor veya girilmemiş",
                  "The signup date is unknown or was never recorded for those customers",
                ],
                ["O müşteriler bugün kaydolmuş", "Those customers signed up today"],
                ["Kayıt tarihi sıfırdır", "The signup date is zero"],
                ["Satır silinmiştir", "The row has been deleted"],
              ],
              answer: 0,
              explain: [
                "`NULL` bilginin yokluğudur. Bu satırları saymak istersen `WHERE signup_date IS NULL` yazman gerekir; `= NULL` yazarsan hiçbir satır dönmez çünkü karşılaştırmanın sonucu da `NULL` olur.",
                "`NULL` is the absence of information. To count those rows you must write `WHERE signup_date IS NULL`; writing `= NULL` returns nothing, because the comparison itself evaluates to `NULL`.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Bir tablonun birincil anahtarı ne işe yarar?",
                "What is a table's primary key for?",
              ],
              options: [
                [
                  "Her satırı benzersiz şekilde tanımlar, böylece o satıra kesin olarak ulaşılabilir",
                  "It identifies each row uniquely, so that exact row can always be found",
                ],
                ["Tabloyu alfabetik sıralar", "It sorts the table alphabetically"],
                ["Sütun sayısını belirler", "It sets the number of columns"],
                ["Verinin şifrelenmesini sağlar", "It encrypts the data"],
              ],
              answer: 0,
              explain: [
                "Birincil anahtar olmadan \"şu satırı güncelle\" diyemezsin — hangi satır olduğunu kesin gösteremezsin. Diğer tablolar da bu anahtara yabancı anahtarla bağlanır; ilişkisel modelin tümü buna dayanır.",
                "Without a primary key you cannot say \"update that row\" — you have no way to point at exactly one. Other tables also link to this key through foreign keys; the whole relational model rests on it.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "sorgu-anatomisi",
          title: L("Bir sorgunun anatomisi", "The anatomy of a query"),
          summary: L(
            "SELECT, FROM, WHERE… Yazma sırası ile veritabanının çalıştırma sırası neden farklıdır?",
            "SELECT, FROM, WHERE… why does the order you write differ from the order the database runs?",
          ),
          minutes: 12,
          blocks: [
            text(
              "Her SQL sorgusu aynı iskeleti kullanır. Hepsini kullanmak zorunda değilsin, ama kullandıklarının **sırası sabittir**:\n\n```\nSELECT   hangi sütunlar\nFROM     hangi tablo\nWHERE    hangi satırlar\nGROUP BY neye göre gruplanacak\nHAVING   hangi gruplar kalacak\nORDER BY neye göre sıralanacak\nLIMIT    kaç satır\n```\n\nBu sırayı bozarsan veritabanı hata verir.",
              "Every SQL query uses the same skeleton. You don't have to use all of it, but the **order of what you do use is fixed**:\n\n```\nSELECT   which columns\nFROM     which table\nWHERE    which rows\nGROUP BY what to group by\nHAVING   which groups survive\nORDER BY how to sort\nLIMIT    how many rows\n```\n\nBreak this order and the database raises an error.",
            ),
            info(
              "Yazma sırası ≠ çalıştırma sırası",
              "Writing order ≠ execution order",
              "Veritabanı sorguyu yukarıdan aşağı okumaz. Önce **FROM** ile tabloyu alır, sonra **WHERE** ile satırları eler, sonra **GROUP BY** ile gruplar, sonra **HAVING**, ancak ondan sonra **SELECT** ile sütunları seçer, en sonunda **ORDER BY** ve **LIMIT** uygular.\n\nBu, en çok kafa karıştıran iki durumu açıklar: `SELECT`'te verdiğin takma adı `WHERE` içinde kullanamazsın (henüz oluşmamıştır), ama `ORDER BY` içinde kullanabilirsin (artık oluşmuştur).",
              "The database does not read the query top to bottom. It first takes the table with **FROM**, filters rows with **WHERE**, groups with **GROUP BY**, then **HAVING**, and only then picks columns with **SELECT**, finally applying **ORDER BY** and **LIMIT**.\n\nThis explains the two most confusing situations: you cannot use an alias defined in `SELECT` inside `WHERE` (it does not exist yet), but you can use it in `ORDER BY` (by then it does).",
            ),
            order({
              id: "o1",
              prompt: [
                "Bu parçaları geçerli bir SQL sorgusu oluşturacak şekilde sırala.",
                "Arrange these fragments into a valid SQL query.",
              ],
              lines: [
                "SELECT name, price",
                "FROM products",
                "WHERE price > 1000",
                "ORDER BY price DESC",
                "LIMIT 5",
              ],
              xp: 25,
            }),
            text(
              "SQL **bildirimsel** bir dildir: ne istediğini yazarsın, nasıl bulunacağını değil. \"1000 TL üzerindeki ürünleri pahalıdan ucuza sırala\" dersin; veritabanının hangi indeksi kullanacağına, satırları nasıl tarayacağına **sorgu planlayıcı** karar verir.\n\nBu yüzden SQL öğrenmek, döngü yazmayı öğrenmekten farklıdır. Soruyu doğru sormayı öğrenirsin.",
              "SQL is a **declarative** language: you write what you want, not how to find it. You say \"sort products above 1000 from expensive to cheap\"; the **query planner** decides which index to use and how to scan the rows.\n\nThat is why learning SQL differs from learning to write loops. You learn to ask the question correctly.",
            ),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "İlk sorgunu yaz: `categories` tablosundaki tüm sütunları ve tüm satırları getir.",
                "Write your first query: return every column and every row from the `categories` table.",
              ],
              starter: `SELECT `,
              solution: `SELECT * FROM categories;`,
              hint: [
                "`*` yıldızı \"tüm sütunlar\" demektir. `SELECT * FROM tablo_adi;` kalıbını kullan.",
                "The `*` star means \"all columns\". Use the pattern `SELECT * FROM table_name;`.",
              ],
              xp: 25,
            }),
            tip(
              "Gerçek işte `SELECT *` kullanma",
              "Avoid `SELECT *` in real work",
              "Öğrenirken tabloyu tanımak için `SELECT *` çok pratiktir. Ama üretimdeki bir raporda sütunları tek tek yazmak gerekir: `SELECT id, name` gibi. Sebebi şu — biri tabloya yeni bir sütun eklediğinde `SELECT *` kullanan raporun sessizce değişir, hatta bozulur. Açıkça yazılan sütun listesi bu sürprizi engeller.",
              "While learning, `SELECT *` is a handy way to get to know a table. But in a production report you should name the columns: `SELECT id, name`. The reason is that when somebody adds a new column, a report built on `SELECT *` silently changes — or breaks. An explicit column list prevents that surprise.",
            ),
          ],
        }),
      ],
    },
    /* ---------------------------------------------------------------- */
    {
      id: "junior",
      title: L("İlk sorgularım", "My first queries"),
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
        lesson({
          slug: "case-ile-kosullu-sutunlar",
          title: L("CASE: koşullu sütunlar üretmek", "CASE: building conditional columns"),
          summary: L(
            "Ham değerleri iş diline çevir: fiyatı segmente, sayıyı etikete dönüştür.",
            "Turn raw values into business language: price into a segment, a number into a label.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Rapor isteyen kimse \"fiyatı 4990\" görmek istemez; \"premium ürün\" görmek ister. `CASE` ifadesi, satır satır koşul kontrol edip yeni bir sütun üretir. SQL'in `if/else`'idir.\n\n```sql\nCASE\n  WHEN koşul1 THEN sonuç1\n  WHEN koşul2 THEN sonuç2\n  ELSE varsayılan\nEND\n```\n\nKoşullar **yukarıdan aşağı** sınanır ve **ilk tutan** kazanır; gerisine bakılmaz. Bu yüzden en dar koşulu en üste yazarsın.",
              "Nobody asking for a report wants to see \"price 4990\"; they want to see \"premium product\". A `CASE` expression checks conditions row by row and produces a new column. It is SQL's `if/else`.\n\n```sql\nCASE\n  WHEN condition1 THEN result1\n  WHEN condition2 THEN result2\n  ELSE fallback\nEND\n```\n\nConditions are tested **top to bottom** and the **first match wins**; the rest are skipped. That is why you put the narrowest condition first.",
            ),
            code(
              "sql",
              `SELECT
  name,
  price,
  CASE
    WHEN price >= 5000 THEN 'premium'
    WHEN price >= 1500 THEN 'orta'
    ELSE 'giriş'
  END AS fiyat_segmenti
FROM products
ORDER BY price DESC;`,
              "ELSE yazmazsan, hiçbir koşula uymayan satırlar NULL olur.",
              "If you omit ELSE, rows matching no condition become NULL.",
            ),
            pitfall(
              "Koşul sırası sonucu değiştirir",
              "Condition order changes the answer",
              "Yukarıdaki örnekte `WHEN price >= 1500` satırını en üste alsaydın, 7990 TL'lik robot süpürge de \"orta\" olurdu — çünkü `1500` koşulu ilk tutar ve `CASE` orada durur. Basamaklı eşiklerde daima **en yüksekten en düşüğe** yaz.",
              "In the example above, if you moved `WHEN price >= 1500` to the top, the 7990 robot vacuum would also be labelled \"orta\" — because the `1500` condition matches first and `CASE` stops there. With laddered thresholds, always write **highest to lowest**.",
            ),
            text(
              "`CASE`'in en güçlü kullanımı toplama fonksiyonlarının **içindedir**. Buna \"koşullu toplama\" denir ve tek geçişte birden çok metrik üretir:\n\n```sql\nSELECT\n  COUNT(*) AS toplam_siparis,\n  SUM(CASE WHEN status = 'teslim' THEN 1 ELSE 0 END) AS teslim,\n  SUM(CASE WHEN status = 'iptal'  THEN 1 ELSE 0 END) AS iptal\nFROM orders;\n```\n\nAynı işi üç ayrı sorgu yazıp birleştirerek de yapabilirdin — ama bu hem daha yavaş hem daha kırılgan olurdu.",
              "The most powerful use of `CASE` is **inside** aggregate functions. This is called conditional aggregation and produces several metrics in a single pass:\n\n```sql\nSELECT\n  COUNT(*) AS total_orders,\n  SUM(CASE WHEN status = 'teslim' THEN 1 ELSE 0 END) AS delivered,\n  SUM(CASE WHEN status = 'iptal'  THEN 1 ELSE 0 END) AS cancelled\nFROM orders;\n```\n\nYou could do the same with three separate queries stitched together — but that would be both slower and more fragile.",
            ),
            quiz({
              id: "q1",
              q: [
                "`SUM(CASE WHEN status = 'iptal' THEN 1 ELSE 0 END)` ifadesi ne hesaplar?",
                "What does `SUM(CASE WHEN status = 'iptal' THEN 1 ELSE 0 END)` compute?",
              ],
              options: [
                [
                  "Durumu 'iptal' olan satırların sayısını",
                  "The number of rows whose status is 'iptal'",
                ],
                ["İptal edilen siparişlerin toplam tutarını", "The total amount of cancelled orders"],
                ["Tüm satırların sayısını", "The number of all rows"],
                ["İptal oranını yüzde olarak", "The cancellation rate as a percentage"],
              ],
              answer: 0,
              explain: [
                "Koşul tuttuğunda 1, tutmadığında 0 üretilir; bunların toplamı da eşleşen satır sayısına eşittir. Oranı istiyorsan bu ifadeyi `COUNT(*)` değerine bölmen gerekir.",
                "The expression yields 1 when the condition holds and 0 otherwise; summing those gives the count of matching rows. For a rate you would divide this by `COUNT(*)`.",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "`customers` tablosundan her şehir için toplam müşteri sayısını ve bunların kaçının kurumsal olduğunu getir. Sütunlar: `city`, `toplam`, `kurumsal`. Toplam müşteriye göre azalan sırala.",
                "From `customers`, return each city's total customer count and how many of them are corporate. Columns: `city`, `toplam`, `kurumsal`. Sort by total descending.",
              ],
              starter: `SELECT
  city,
  COUNT(*) AS toplam,

FROM customers
GROUP BY city
ORDER BY toplam DESC;`,
              solution: `SELECT
  city,
  COUNT(*) AS toplam,
  SUM(CASE WHEN segment = 'kurumsal' THEN 1 ELSE 0 END) AS kurumsal
FROM customers
GROUP BY city
ORDER BY toplam DESC;`,
              hint: [
                "`SUM(CASE WHEN segment = 'kurumsal' THEN 1 ELSE 0 END)` kalıbını kullan.",
                "Use the pattern `SUM(CASE WHEN segment = 'kurumsal' THEN 1 ELSE 0 END)`.",
              ],
              mustContain: [
                {
                  needle: "CASE",
                  msg: ["Çözümde CASE kullanılmalı", "The solution must use CASE"],
                },
              ],
              xp: 40,
            }),
          ],
        }),
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "mid",
      title: L("Tabloları birleştirmek", "Joining tables"),
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
        lesson({
          slug: "cte-ile-okunabilir-sorgular",
          title: L("CTE: uzun sorguları okunur kılmak", "CTEs: making long queries readable"),
          summary: L(
            "İç içe geçmiş alt sorgular yerine adım adım okunan `WITH` blokları yaz.",
            "Replace deeply nested subqueries with `WITH` blocks that read step by step.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Bir sorgu büyüdükçe alt sorgular iç içe girer ve okunmaz hale gelir. **CTE** (Common Table Expression, ortak tablo ifadesi) bu karmaşayı düzleştirir: sorgunun başında `WITH` ile adlandırılmış ara adımlar tanımlarsın, sonra bunları normal bir tabloymuş gibi kullanırsın.\n\n```sql\nWITH adim_bir AS (\n  ...\n),\nadim_iki AS (\n  SELECT * FROM adim_bir WHERE ...\n)\nSELECT * FROM adim_iki;\n```\n\nSonuç aynı, ama sorgu artık yukarıdan aşağı bir hikâye gibi okunur.",
              "As a query grows, subqueries nest inside each other and become unreadable. A **CTE** (Common Table Expression) flattens that mess: you define named intermediate steps at the top with `WITH`, then use them as if they were ordinary tables.\n\n```sql\nWITH step_one AS (\n  ...\n),\nstep_two AS (\n  SELECT * FROM step_one WHERE ...\n)\nSELECT * FROM step_two;\n```\n\nThe result is identical, but the query now reads top to bottom like a story.",
            ),
            code(
              "sql",
              `-- Aynı iş, iki yazım. Önce alt sorguyla:
SELECT city, ortalama
FROM (
  SELECT c.city, AVG(oi.quantity * oi.unit_price) AS ortalama
  FROM customers c
  JOIN orders o ON o.customer_id = c.id
  JOIN order_items oi ON oi.order_id = o.id
  GROUP BY c.city
)
WHERE ortalama > 3000;

-- Şimdi CTE ile — adımlar isimlendirilmiş:
WITH sehir_ortalamalari AS (
  SELECT c.city, AVG(oi.quantity * oi.unit_price) AS ortalama
  FROM customers c
  JOIN orders o ON o.customer_id = c.id
  JOIN order_items oi ON oi.order_id = o.id
  GROUP BY c.city
)
SELECT city, ortalama
FROM sehir_ortalamalari
WHERE ortalama > 3000;`,
            ),
            tip(
              "CTE'yi hata ayıklarken kullan",
              "Use CTEs while debugging",
              "CTE'nin en sevilen yanı test edilebilirliğidir. Sorgu yanlış sonuç veriyorsa, en alttaki `SELECT`'i geçici olarak `SELECT * FROM adim_bir` yapıp o adımın çıktısını gözünle görebilirsin. İç içe alt sorgularda bunu yapmak için sorguyu parçalamak gerekir; CTE'de tek satır değiştirmen yeter.",
              "The best-loved property of a CTE is testability. If a query returns the wrong numbers, temporarily change the final `SELECT` to `SELECT * FROM step_one` and look at that step's output with your own eyes. With nested subqueries you would have to take the query apart; with a CTE you change one line.",
            ),
            text(
              "Birden fazla CTE'yi virgülle zincirlersin ve sonraki adım öncekine başvurabilir:\n\n```sql\nWITH teslim_siparisler AS (\n  SELECT * FROM orders WHERE status = 'teslim'\n),\nsiparis_tutarlari AS (\n  SELECT o.id, o.customer_id,\n         SUM(oi.quantity * oi.unit_price) AS tutar\n  FROM teslim_siparisler o\n  JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY o.id, o.customer_id\n)\nSELECT customer_id, SUM(tutar) AS toplam\nFROM siparis_tutarlari\nGROUP BY customer_id;\n```\n\nHer adım tek bir iş yapar. Bu, uzun analitik sorgularda bakımı mümkün kılan tek yaklaşımdır.",
              "You chain multiple CTEs with commas, and a later step may reference an earlier one:\n\n```sql\nWITH delivered_orders AS (\n  SELECT * FROM orders WHERE status = 'teslim'\n),\norder_totals AS (\n  SELECT o.id, o.customer_id,\n         SUM(oi.quantity * oi.unit_price) AS amount\n  FROM delivered_orders o\n  JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY o.id, o.customer_id\n)\nSELECT customer_id, SUM(amount) AS total\nFROM order_totals\nGROUP BY customer_id;\n```\n\nEach step does one job. For long analytical queries this is the only approach that stays maintainable.",
            ),
            quiz({
              id: "q1",
              q: [
                "CTE kullanmanın alt sorguya göre asıl kazancı nedir?",
                "What is the main gain of a CTE over a subquery?",
              ],
              options: [
                [
                  "Sorgu adım adım okunur ve her adım tek başına test edilebilir",
                  "The query reads step by step and each step can be tested on its own",
                ],
                ["Her zaman daha hızlı çalışır", "It always runs faster"],
                ["Daha az bellek kullanır", "It uses less memory"],
                ["JOIN yazma ihtiyacını ortadan kaldırır", "It removes the need to write JOINs"],
              ],
              answer: 0,
              explain: [
                "CTE bir okunabilirlik ve bakım aracıdır; çoğu veritabanında performans farkı yoktur çünkü planlayıcı iki yazımı da benzer şekilde ele alır. Kazanç, sorguyu altı ay sonra açtığında anlayabilmendir.",
                "A CTE is a readability and maintenance tool; in most databases there is no performance difference, because the planner treats both forms similarly. The gain is being able to understand the query when you open it six months later.",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "CTE kullanarak, teslim edilmiş siparişlerde **müşteri başına toplam harcamayı** hesapla ve yalnızca 10.000 TL üzerinde harcayanları getir. Sütunlar: `name`, `toplam`. Toplama göre azalan sırala.",
                "Using a CTE, compute **total spend per customer** across delivered orders and return only those spending over 10,000. Columns: `name`, `toplam`. Sort by total descending.",
              ],
              starter: `WITH musteri_harcamalari AS (

)
SELECT name, toplam
FROM musteri_harcamalari
WHERE toplam > 10000
ORDER BY toplam DESC;`,
              solution: `WITH musteri_harcamalari AS (
  SELECT c.name AS name,
         SUM(oi.quantity * oi.unit_price) AS toplam
  FROM customers c
  JOIN orders o ON o.customer_id = c.id
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.status = 'teslim'
  GROUP BY c.id, c.name
)
SELECT name, toplam
FROM musteri_harcamalari
WHERE toplam > 10000
ORDER BY toplam DESC;`,
              hint: [
                "CTE içinde `customers`, `orders` ve `order_items` tablolarını birleştirip müşteri bazında `SUM` al. Dış sorgu yalnızca süzer ve sıralar.",
                "Inside the CTE, join `customers`, `orders` and `order_items` and `SUM` per customer. The outer query only filters and sorts.",
              ],
              mustContain: [
                { needle: "WITH", msg: ["Çözümde CTE kullanılmalı", "The solution must use a CTE"] },
              ],
              xp: 45,
            }),
          ],
        }),
        lesson({
          slug: "kume-islemleri",
          title: L("Küme işlemleri: UNION, INTERSECT, EXCEPT", "Set operations: UNION, INTERSECT, EXCEPT"),
          summary: L(
            "İki sorgu sonucunu alt alta ekle, kesişimini al veya farkını çıkar.",
            "Stack two result sets, intersect them, or subtract one from the other.",
          ),
          minutes: 14,
          blocks: [
            text(
              "`JOIN` tabloları **yan yana** birleştirir; küme işlemleri ise **alt alta**. Üç işlem vardır:\n\n- **`UNION`** — iki sonucu birleştirir ve **tekrarları atar**\n- **`UNION ALL`** — birleştirir ama tekrarları **korur** (daha hızlıdır)\n- **`INTERSECT`** — yalnızca **her ikisinde de** olan satırlar\n- **`EXCEPT`** — birincide olup ikincide **olmayan** satırlar\n\nTek kural: iki sorgunun **sütun sayısı ve tipleri uyuşmalıdır**. Sütun adları ilk sorgudan alınır.",
              "`JOIN` combines tables **side by side**; set operations stack them **on top of each other**. There are three:\n\n- **`UNION`** — combines two results and **removes duplicates**\n- **`UNION ALL`** — combines but **keeps** duplicates (it is faster)\n- **`INTERSECT`** — only rows present in **both**\n- **`EXCEPT`** — rows in the first that are **not** in the second\n\nOne rule: the two queries must have **matching column counts and types**. Column names come from the first query.",
            ),
            code(
              "sql",
              `-- Hem İstanbul'da hem de kurumsal olan müşteriler (kesişim)
SELECT name FROM customers WHERE city = 'İstanbul'
INTERSECT
SELECT name FROM customers WHERE segment = 'kurumsal';

-- Hiç sipariş vermemiş müşteriler (fark)
SELECT id FROM customers
EXCEPT
SELECT customer_id FROM orders;

-- İki farklı listeyi tek rapora yığmak
SELECT 'pahalı' AS grup, name FROM products WHERE price >= 5000
UNION ALL
SELECT 'ucuz',        name FROM products WHERE price < 500;`,
            ),
            info(
              "UNION mu, UNION ALL mı?",
              "UNION or UNION ALL?",
              "`UNION`, tekrarları atmak için sonucun tamamını sıralamak veya karma tablosuna almak zorundadır — bu, büyük veride ciddi maliyettir. Tekrar olmayacağını biliyorsan (örneğin iki sorgu birbirini dışlayan tarih aralıklarını getiriyorsa) daima **`UNION ALL`** kullan. Deneyimli analistleri ayıran küçük alışkanlıklardan biridir.",
              "`UNION` has to sort or hash the entire result to remove duplicates — a serious cost on large data. When you know duplicates cannot occur (for example the two queries cover mutually exclusive date ranges), always use **`UNION ALL`**. It is one of the small habits that separates experienced analysts.",
            ),
            quiz({
              id: "q1",
              q: [
                "`SELECT id FROM customers EXCEPT SELECT customer_id FROM orders` sorgusu neyi getirir?",
                "What does `SELECT id FROM customers EXCEPT SELECT customer_id FROM orders` return?",
              ],
              options: [
                [
                  "Hiç sipariş vermemiş müşterilerin kimliklerini",
                  "The ids of customers who have never placed an order",
                ],
                ["Tüm müşterileri", "All customers"],
                ["Sipariş vermiş müşterileri", "Customers who have placed orders"],
                ["Siparişi iptal edilen müşterileri", "Customers whose orders were cancelled"],
              ],
              answer: 0,
              explain: [
                "`EXCEPT`, birinci kümeden ikinci kümede bulunanları çıkarır. Aynı sonuca `LEFT JOIN ... WHERE o.id IS NULL` veya `NOT EXISTS` ile de ulaşabilirsin; üçü de aynı soruyu farklı dillerle sorar.",
                "`EXCEPT` subtracts from the first set anything present in the second. You could reach the same result with `LEFT JOIN ... WHERE o.id IS NULL` or `NOT EXISTS`; all three ask the same question in different words.",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "Küme işlemi kullanarak hiç sipariş vermemiş müşterilerin adlarını getir. Sütun: `name`. Ada göre artan sırala.",
                "Using a set operation, return the names of customers who never placed an order. Column: `name`. Sort ascending by name.",
              ],
              starter: `SELECT name FROM customers
WHERE id IN (
  SELECT id FROM customers

)
ORDER BY name;`,
              solution: `SELECT name FROM customers
WHERE id IN (
  SELECT id FROM customers
  EXCEPT
  SELECT customer_id FROM orders
)
ORDER BY name;`,
              hint: [
                "Önce `EXCEPT` ile siparişi olmayan kimlikleri bul, sonra bu kimlikleri `customers` tablosunda ada çevir.",
                "First find the ids with no orders using `EXCEPT`, then translate those ids into names via `customers`.",
              ],
              mustContain: [
                {
                  needle: "EXCEPT",
                  msg: ["Çözümde EXCEPT kullanılmalı", "The solution must use EXCEPT"],
                },
              ],
              xp: 40,
            }),
          ],
        }),
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "senior",
      title: L("Analitik SQL", "Analytical SQL"),
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
        lesson({
          slug: "veri-kalitesi-ve-dogrulama",
          title: L("Veri kalitesi ve doğrulama sorguları", "Data quality and validation queries"),
          summary: L(
            "Raporu yayınlamadan önce kendine sor: bu sayılara gerçekten güvenebilir miyim?",
            "Before you publish a report, ask yourself: can I actually trust these numbers?",
          ),
          minutes: 18,
          blocks: [
            text(
              "Kıdemli analisti ayıran şey karmaşık sorgu yazması değil, **yanlış sayı yayınlamamasıdır**. Her raporun altında görünmeyen bir doğrulama katmanı vardır. Dört klasik kontrol:\n\n1. **Satır sayısı** — birleştirme sonrası satır sayısı beklenmedik şekilde arttıysa çoğullama vardır\n2. **Benzersizlik** — anahtar olması gereken sütun gerçekten benzersiz mi?\n3. **Boşluk** — kritik sütunlarda kaç `NULL` var?\n4. **Aralık** — negatif fiyat, gelecekteki tarih, %100'ü aşan oran var mı?",
              "What sets a senior analyst apart is not writing complex queries but **not publishing wrong numbers**. Under every report sits an invisible validation layer. Four classic checks:\n\n1. **Row count** — if the count jumped unexpectedly after a join, you have fan-out\n2. **Uniqueness** — is the column that should be a key actually unique?\n3. **Nullness** — how many `NULL`s sit in critical columns?\n4. **Range** — are there negative prices, future dates, rates above 100%?",
            ),
            code(
              "sql",
              `-- 1. Anahtar gerçekten benzersiz mi? Sonuç boşsa temiz demektir.
SELECT id, COUNT(*) AS adet
FROM customers
GROUP BY id
HAVING COUNT(*) > 1;

-- 2. Kritik sütunlarda boşluk profili
SELECT
  COUNT(*)                                            AS satir,
  SUM(CASE WHEN city IS NULL THEN 1 ELSE 0 END)       AS sehir_bos,
  SUM(CASE WHEN segment IS NULL THEN 1 ELSE 0 END)    AS segment_bos
FROM customers;

-- 3. Yetim kayıt: siparişi olan ama müşteri tablosunda bulunmayan
SELECT o.id
FROM orders o
LEFT JOIN customers c ON c.id = o.customer_id
WHERE c.id IS NULL;

-- 4. Aralık kontrolü: olmaması gereken değerler
SELECT COUNT(*) AS hatali
FROM products
WHERE price <= 0 OR stock < 0;`,
            ),
            pitfall(
              "JOIN sonrası çoğullama en sinsi hatadır",
              "Fan-out after a JOIN is the sneakiest bug",
              "`orders` tablosunu `order_items` ile birleştirirsen, iki kalemli bir sipariş **iki satır** olur. Bu noktada `SUM(o.toplam)` yazarsan sipariş tutarını iki kez sayarsın ve ciron şişer. Rapor kimseye yanlış görünmez — sadece sessizce fazladır.\n\nKorunma yolu: birleştirmeden önce ve sonra `COUNT(*)` al, sayı beklediğin gibi mi bak. Ya da toplamayı önce alt sorguda yapıp sonra birleştir.",
              "Join `orders` to `order_items` and an order with two line items becomes **two rows**. Write `SUM(o.total)` at that point and you count the order amount twice, inflating revenue. The report looks fine to everyone — it is just quietly too high.\n\nThe defence: take `COUNT(*)` before and after the join and check the number is what you expected. Or aggregate in a subquery first and join afterwards.",
            ),
            quiz({
              id: "q1",
              q: [
                "`orders` ile `order_items` birleştirildikten sonra satır sayısı 25'ten 39'a çıktı. Bu ne anlama gelir?",
                "After joining `orders` with `order_items` the row count went from 25 to 39. What does that mean?",
              ],
              options: [
                [
                  "Bazı siparişlerde birden fazla kalem var; sipariş düzeyindeki değerleri toplarken dikkat gerekir",
                  "Some orders have several line items; care is needed when summing order-level values",
                ],
                ["Birleştirme hatalıdır ve düzeltilmelidir", "The join is wrong and must be fixed"],
                ["14 sipariş kaybolmuştur", "14 orders have been lost"],
                ["Veritabanı bozulmuştur", "The database is corrupted"],
              ],
              answer: 0,
              explain: [
                "Bu, bire-çok ilişkinin normal sonucudur ve kendi başına hata değildir. Hata, bu durumda sipariş düzeyindeki bir değeri (kargo ücreti gibi) toplarsan ortaya çıkar — o değer kalem sayısı kadar tekrarlanır.",
                "This is the normal outcome of a one-to-many relationship and is not an error in itself. The error appears if you then sum an order-level value (like a shipping fee) — it gets repeated once per line item.",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "Bir doğrulama sorgusu yaz: `order_items` tablosunda `orders` tablosunda karşılığı olmayan sipariş var mı? Sonuç boş dönmelidir. Sütun: `order_id`.",
                "Write a validation query: are there rows in `order_items` whose order does not exist in `orders`? The result should come back empty. Column: `order_id`.",
              ],
              starter: `SELECT DISTINCT oi.order_id
FROM order_items AS oi
LEFT JOIN orders AS o ON o.id = oi.order_id
`,
              solution: `SELECT DISTINCT oi.order_id
FROM order_items AS oi
LEFT JOIN orders AS o ON o.id = oi.order_id
WHERE o.id IS NULL;`,
              hint: [
                "`LEFT JOIN` eşleşme bulamazsa sağ tarafın sütunları `NULL` olur. Yetimleri bulmak için `WHERE o.id IS NULL` yaz.",
                "When a `LEFT JOIN` finds no match, the right-hand columns come back `NULL`. Find orphans with `WHERE o.id IS NULL`.",
              ],
              xp: 40,
            }),
          ],
        }),
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "expert",
      title: L("Uzmanlık: hiyerarşi, pivot, tutarlılık", "Expertise: hierarchy, pivot, consistency"),
      description: L(
        "Özyinelemeli sorgular, çok boyutlu özetler ve veri bütünlüğünü koruyan yazma desenleri.",
        "Recursive queries, multi-dimensional summaries and write patterns that protect data integrity.",
      ),
      lessons: [
        lesson({
          slug: "ozyinelemeli-cte",
          title: L("Özyinelemeli CTE: hiyerarşileri çözmek", "Recursive CTEs: unravelling hierarchies"),
          summary: L(
            "Organizasyon şeması, kategori ağacı, yol bulma: kendine bağlanan tabloları gezmek.",
            "Org charts, category trees, path finding: walking tables that point at themselves.",
          ),
          minutes: 20,
          blocks: [
            text(
              "Bazı tablolar kendilerine bağlanır. `employees` tablosunda her çalışanın `manager_id` sütunu yine `employees.id`'ye işaret eder. \"Bu kişinin altında toplam kaç kişi çalışıyor?\" sorusunun cevabı kaç seviye derine ineceğini önceden bilemediğin için sabit sayıda `JOIN` ile bulunamaz.\n\n**Özyinelemeli CTE** bu sorunu çözer. İki parçadan oluşur:\n\n- **Çapa (anchor)** — başlangıç satırları; özyineleme buradan başlar\n- **Özyinelemeli adım** — kendi kendine başvurup bir sonraki seviyeyi getirir\n\nİkisi `UNION ALL` ile birleşir ve yeni satır gelmeyene kadar tekrarlanır.",
              "Some tables point at themselves. In `employees`, each person's `manager_id` refers back to `employees.id`. The question \"how many people work under this person in total?\" cannot be answered with a fixed number of `JOIN`s, because you do not know in advance how deep the tree goes.\n\nA **recursive CTE** solves this. It has two parts:\n\n- **Anchor** — the starting rows; recursion begins here\n- **Recursive step** — refers to itself and fetches the next level\n\nThe two are combined with `UNION ALL` and repeat until no new rows arrive.",
            ),
            code(
              "sql",
              `WITH RECURSIVE hiyerarsi AS (
  -- Çapa: yöneticisi olmayanlar, yani en tepedekiler
  SELECT id, name, manager_id, 1 AS seviye
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Özyinelemeli adım: bir üst seviyeye bağlı olanları ekle
  SELECT e.id, e.name, e.manager_id, h.seviye + 1
  FROM employees AS e
  JOIN hiyerarsi AS h ON e.manager_id = h.id
)
SELECT seviye, name
FROM hiyerarsi
ORDER BY seviye, name;`,
              "Her tur bir seviye derine iner; yeni satır kalmayınca durur.",
              "Each pass descends one level; it stops when no new rows appear.",
            ),
            pitfall(
              "Sonsuz döngü riski",
              "The infinite loop risk",
              "Veride bir çevrim varsa (A'nın yöneticisi B, B'nin yöneticisi A) özyineleme hiç durmaz ve sorgu veritabanını kilitler. Üretimde daima bir derinlik sınırı koy: `WHERE seviye < 20` gibi bir koşulu özyinelemeli adıma ekle. PostgreSQL'de ayrıca gezilen kimlikleri bir dizide biriktirip `NOT id = ANY(yol)` kontrolü yapmak yaygındır.",
              "If the data contains a cycle (A's manager is B and B's manager is A) the recursion never stops and the query locks up the database. In production always add a depth guard: put a condition like `WHERE level < 20` in the recursive step. In PostgreSQL it is also common to accumulate visited ids into an array and check `NOT id = ANY(path)`.",
            ),
            text(
              "Özyinelemeli CTE'nin ikinci klasik kullanımı **seri üretmektir**. Raporlarda \"veri olmayan günler de sıfır olarak görünsün\" istendiğinde tarih tablosu üretmek gerekir:\n\n```sql\nWITH RECURSIVE gunler(gun) AS (\n  SELECT DATE('2024-01-01')\n  UNION ALL\n  SELECT DATE(gun, '+1 day') FROM gunler WHERE gun < '2024-01-31'\n)\nSELECT * FROM gunler;\n```\n\nBu takvimi ciro tablosuna `LEFT JOIN` yaparsan, satış olmayan günler grafikte boşluk yerine sıfır olarak görünür — çizgi grafiklerde doğru okuma için şarttır.",
              "The second classic use of a recursive CTE is **generating a series**. When a report needs \"days with no data should still show as zero\", you must produce a date table:\n\n```sql\nWITH RECURSIVE days(day) AS (\n  SELECT DATE('2024-01-01')\n  UNION ALL\n  SELECT DATE(day, '+1 day') FROM days WHERE day < '2024-01-31'\n)\nSELECT * FROM days;\n```\n\n`LEFT JOIN` this calendar to your revenue table and days without sales appear as zero rather than as gaps — essential for reading line charts correctly.",
            ),
            quiz({
              id: "q1",
              q: [
                "Özyinelemeli CTE'de çapa sorgusu ne işe yarar?",
                "What is the anchor query for in a recursive CTE?",
              ],
              options: [
                [
                  "Özyinelemenin başlayacağı ilk satır kümesini verir",
                  "It supplies the initial set of rows that recursion starts from",
                ],
                ["Sonucu sıralar", "It sorts the result"],
                ["Tekrarları temizler", "It removes duplicates"],
                ["Derinlik sınırını belirler", "It sets the depth limit"],
              ],
              answer: 0,
              explain: [
                "Çapa olmadan özyinelemenin tutunacağı bir başlangıç olmaz. Genellikle ağacın kökünü seçer: `WHERE manager_id IS NULL` gibi. Özyinelemeli adım de her turda bir önceki turun sonucuna bakarak bir seviye daha iner.",
                "Without an anchor the recursion has nothing to grab onto. It usually selects the root of the tree, such as `WHERE manager_id IS NULL`. The recursive step then looks at the previous pass's output each round and descends one more level.",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "hr",
              prompt: [
                "Özyinelemeli CTE ile her çalışanın hiyerarşideki seviyesini hesapla. Yöneticisi olmayanlar 1. seviyedir. Sütunlar: `seviye`, `name`. Seviyeye, sonra ada göre sırala.",
                "With a recursive CTE, compute each employee's level in the hierarchy. Those without a manager are level 1. Columns: `seviye`, `name`. Sort by level, then name.",
              ],
              starter: `WITH RECURSIVE hiyerarsi AS (
  SELECT id, name, manager_id, 1 AS seviye
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

)
SELECT seviye, name
FROM hiyerarsi
ORDER BY seviye, name;`,
              solution: `WITH RECURSIVE hiyerarsi AS (
  SELECT id, name, manager_id, 1 AS seviye
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  SELECT e.id, e.name, e.manager_id, h.seviye + 1
  FROM employees AS e
  JOIN hiyerarsi AS h ON e.manager_id = h.id
)
SELECT seviye, name
FROM hiyerarsi
ORDER BY seviye, name;`,
              hint: [
                "Özyinelemeli adımda `employees` tablosunu CTE'nin kendisiyle `e.manager_id = h.id` üzerinden birleştir ve seviyeyi bir artır.",
                "In the recursive step, join `employees` to the CTE itself on `e.manager_id = h.id` and increment the level by one.",
              ],
              mustContain: [
                {
                  needle: "RECURSIVE",
                  msg: [
                    "Çözümde özyinelemeli CTE kullanılmalı",
                    "The solution must use a recursive CTE",
                  ],
                },
              ],
              xp: 55,
            }),
          ],
        }),
        lesson({
          slug: "ileri-gruplama-ve-pivot",
          title: L("Çok boyutlu özetler ve pivot", "Multi-dimensional summaries and pivoting"),
          summary: L(
            "Ara toplamlar, genel toplam ve satırları sütuna çevirmek: yönetici raporunun iskeleti.",
            "Subtotals, grand totals and turning rows into columns: the skeleton of an executive report.",
          ),
          minutes: 18,
          blocks: [
            text(
              "Yöneticiler tek düzeyli liste istemez; **ara toplamlı** tablo ister: şehir bazında satış, altında bölge toplamı, en altta genel toplam. Standart SQL bunu üç yapıyla sunar:\n\n- **`ROLLUP(a, b)`** — a+b, sonra yalnız a, sonra genel toplam (hiyerarşik ara toplam)\n- **`CUBE(a, b)`** — tüm kombinasyonlar: a+b, a, b, genel\n- **`GROUPING SETS`** — hangi kombinasyonları istediğini tek tek yazarsın\n\nBunlar PostgreSQL, SQL Server, Oracle ve BigQuery'de vardır. SQLite'ta yoktur — bu yüzden aşağıda taşınabilir karşılığını da göreceksin.",
              "Executives do not want a flat list; they want a table **with subtotals**: sales by city, a regional subtotal beneath, and a grand total at the bottom. Standard SQL offers three constructs for this:\n\n- **`ROLLUP(a, b)`** — a+b, then a alone, then the grand total (hierarchical subtotals)\n- **`CUBE(a, b)`** — every combination: a+b, a, b, grand\n- **`GROUPING SETS`** — you list exactly which combinations you want\n\nThese exist in PostgreSQL, SQL Server, Oracle and BigQuery. SQLite does not have them — which is why you will also see the portable equivalent below.",
            ),
            code(
              "sql",
              `-- PostgreSQL / BigQuery / SQL Server sözdizimi
SELECT city, segment, COUNT(*) AS musteri
FROM customers
GROUP BY ROLLUP(city, segment);

-- Aynı sonucun her yerde çalışan karşılığı:
SELECT city, segment, COUNT(*) AS musteri
FROM customers
GROUP BY city, segment
UNION ALL
SELECT city, NULL, COUNT(*) FROM customers GROUP BY city
UNION ALL
SELECT NULL, NULL, COUNT(*) FROM customers;`,
              "ROLLUP taşınabilir değilse UNION ALL ile aynı sonucu üretebilirsin.",
              "When ROLLUP is not portable, UNION ALL produces the same result.",
            ),
            text(
              "**Pivot**, satırları sütuna çevirmektir: \"her şehir bir satır, her segment bir sütun\". SQL'de bunun taşınabilir yolu koşullu toplamadır — `CASE`'i zaten biliyorsun:\n\n```sql\nSELECT\n  city,\n  SUM(CASE WHEN segment = 'bireysel' THEN 1 ELSE 0 END) AS bireysel,\n  SUM(CASE WHEN segment = 'kurumsal' THEN 1 ELSE 0 END) AS kurumsal\nFROM customers\nGROUP BY city;\n```\n\nSQL Server'ın `PIVOT` operatörü ve PostgreSQL'in `crosstab` fonksiyonu daha kısadır ama taşınabilir değildir. Sütun listesi sabit olduğu sürece `CASE` yaklaşımı her yerde çalışır — ve sütunlar dinamikse zaten SQL'in değil, rapor aracının işidir.",
              "**Pivoting** means turning rows into columns: \"one row per city, one column per segment\". The portable way to do it in SQL is conditional aggregation — you already know `CASE`:\n\n```sql\nSELECT\n  city,\n  SUM(CASE WHEN segment = 'bireysel' THEN 1 ELSE 0 END) AS individual,\n  SUM(CASE WHEN segment = 'kurumsal' THEN 1 ELSE 0 END) AS corporate\nFROM customers\nGROUP BY city;\n```\n\nSQL Server's `PIVOT` operator and PostgreSQL's `crosstab` are shorter but not portable. As long as the column list is fixed, the `CASE` approach works everywhere — and if the columns are dynamic, that is the reporting tool's job, not SQL's.",
            ),
            quiz({
              id: "q1",
              q: [
                "`GROUP BY ROLLUP(city, segment)` sonucunda `segment` sütunu neden bazı satırlarda `NULL` görünür?",
                "In the output of `GROUP BY ROLLUP(city, segment)`, why is the `segment` column `NULL` on some rows?",
              ],
              options: [
                [
                  "O satır, segmentten bağımsız ara toplamı gösterir — yani şehrin tamamını",
                  "That row is the subtotal across segments — the city as a whole",
                ],
                ["Veride eksik segment vardır", "The data has missing segments"],
                ["Sorgu hatalıdır", "The query is wrong"],
                ["ROLLUP her zaman NULL üretir", "ROLLUP always produces NULL"],
              ],
              answer: 0,
              explain: [
                "Ara toplam satırlarında, toplanan boyut `NULL` ile işaretlenir. Gerçek eksik veriyle karıştırmamak için `GROUPING(segment)` fonksiyonu kullanılır: ara toplam satırında 1, normal satırda 0 döner.",
                "On subtotal rows, the dimension being aggregated over is marked with `NULL`. To distinguish this from genuinely missing data you use the `GROUPING(segment)` function: it returns 1 on subtotal rows and 0 on ordinary rows.",
              ],
            }),
            sqlTask({
              id: "t1",
              dataset: "shop",
              prompt: [
                "Pivot tablosu üret: her şehir için bireysel ve kurumsal müşteri sayısını **ayrı sütunlarda** göster. Sütunlar: `city`, `bireysel`, `kurumsal`. Şehre göre artan sırala.",
                "Build a pivot table: for each city show individual and corporate customer counts in **separate columns**. Columns: `city`, `bireysel`, `kurumsal`. Sort ascending by city.",
              ],
              starter: `SELECT
  city,

FROM customers
GROUP BY city
ORDER BY city;`,
              solution: `SELECT
  city,
  SUM(CASE WHEN segment = 'bireysel' THEN 1 ELSE 0 END) AS bireysel,
  SUM(CASE WHEN segment = 'kurumsal' THEN 1 ELSE 0 END) AS kurumsal
FROM customers
GROUP BY city
ORDER BY city;`,
              hint: [
                "Her sütun için bir `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` yaz.",
                "Write one `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` per column.",
              ],
              xp: 45,
            }),
          ],
        }),
        lesson({
          slug: "islemler-ve-tutarlilik",
          title: L("İşlemler, ACID ve tekrarlanabilir yazma", "Transactions, ACID and idempotent writes"),
          summary: L(
            "Analist de veri yazar. Yarım kalan bir güncellemenin tabloyu bozmaması nasıl sağlanır?",
            "Analysts write data too. How do you stop a half-finished update from corrupting a table?",
          ),
          minutes: 18,
          blocks: [
            text(
              "Bir **işlem (transaction)**, ya tamamı uygulanan ya da hiçbiri uygulanmayan bir grup komuttur:\n\n```sql\nBEGIN;\n  UPDATE hesaplar SET bakiye = bakiye - 100 WHERE id = 1;\n  UPDATE hesaplar SET bakiye = bakiye + 100 WHERE id = 2;\nCOMMIT;\n```\n\nİki komut arasında elektrik kesilirse `COMMIT` çalışmaz ve veritabanı **her ikisini birden geri alır**. Para havada kalmaz. Hata durumunda `ROLLBACK` ile elle de geri alabilirsin.",
              "A **transaction** is a group of statements that is either applied in full or not at all:\n\n```sql\nBEGIN;\n  UPDATE accounts SET balance = balance - 100 WHERE id = 1;\n  UPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n```\n\nIf the power fails between the two statements, `COMMIT` never runs and the database **undoes both**. The money does not vanish mid-air. On error you can also undo manually with `ROLLBACK`.",
            ),
            info(
              "ACID nedir?",
              "What is ACID?",
              "**A**tomicity — hep ya da hiç.\n**C**onsistency — kurallar (anahtarlar, kısıtlar) her zaman geçerli kalır.\n**I**solation — eşzamanlı işlemler birbirinin yarım işini görmez.\n**D**urability — `COMMIT` dedikten sonra veri kalıcıdır; sunucu çökse de kaybolmaz.\n\nBu dört garanti, ilişkisel veritabanlarını elli yıldır vazgeçilmez kılan şeydir. Analitik ambarlar (BigQuery, Snowflake) bunları biraz gevşetir çünkü öncelikleri okuma hızıdır.",
              "**A**tomicity — all or nothing.\n**C**onsistency — the rules (keys, constraints) always hold.\n**I**solation — concurrent transactions never see each other's half-finished work.\n**D**urability — once you `COMMIT`, the data survives even a server crash.\n\nThese four guarantees are what has kept relational databases indispensable for fifty years. Analytical warehouses (BigQuery, Snowflake) relax them somewhat, because their priority is read speed.",
            ),
            text(
              "Analistin günlük hayatında bunun karşılığı **tekrarlanabilir (idempotent) yükleme**dir. Bir günlük özet tablosunu her sabah yeniden üreten iş, iki kez çalışırsa veriyi ikiye katlamamalıdır. Doğru desen şudur:\n\n```sql\nBEGIN;\n  DELETE FROM gunluk_ozet WHERE gun = '2024-08-01';\n  INSERT INTO gunluk_ozet\n  SELECT '2024-08-01', ... FROM ham_veri WHERE ...;\nCOMMIT;\n```\n\nÖnce o günü sil, sonra yeniden yaz — ikisi tek işlemde. İş kaç kez çalışırsa çalışsın sonuç aynıdır. Modern ambarlarda aynı işi `MERGE` (upsert) tek komutta yapar.",
              "In an analyst's daily life the equivalent of this is an **idempotent load**. A job that rebuilds a daily summary table every morning must not double the data if it runs twice. The correct pattern is:\n\n```sql\nBEGIN;\n  DELETE FROM daily_summary WHERE day = '2024-08-01';\n  INSERT INTO daily_summary\n  SELECT '2024-08-01', ... FROM raw_data WHERE ...;\nCOMMIT;\n```\n\nDelete that day first, then rewrite it — both inside one transaction. However many times the job runs, the result is the same. In modern warehouses `MERGE` (upsert) does the same job in a single statement.",
            ),
            pitfall(
              "UPDATE ve DELETE'i WHERE'siz çalıştırma",
              "Never run UPDATE or DELETE without WHERE",
              "`DELETE FROM orders;` tablodaki **her satırı** siler. Alışkanlık edin: silme veya güncelleme yazarken önce `SELECT` olarak yaz, dönen satırları gör, sonra `SELECT`'i `DELETE`/`UPDATE` ile değiştir. Üretim veritabanında çalışıyorsan ayrıca `BEGIN` ile başla — sonucu görmeden `COMMIT` etme.",
              "`DELETE FROM orders;` removes **every row**. Build the habit: write the delete or update as a `SELECT` first, look at the rows it returns, then swap the `SELECT` for `DELETE`/`UPDATE`. If you are on a production database, also open with `BEGIN` — and do not `COMMIT` until you have seen the outcome.",
            ),
            quiz({
              id: "q1",
              q: [
                "Günlük özet üreten bir iş neden `DELETE` + `INSERT` çiftini tek işleme alır?",
                "Why does a daily summary job wrap its `DELETE` + `INSERT` pair in one transaction?",
              ],
              options: [
                [
                  "Silme ile ekleme arasında hata olursa tablo boş kalmasın; ya ikisi de olur ya hiçbiri",
                  "So a failure between delete and insert cannot leave the table empty; either both happen or neither",
                ],
                ["Sorgu daha hızlı çalışsın diye", "To make the query run faster"],
                ["Daha az disk kullansın diye", "To use less disk space"],
                ["İndeksler otomatik güncellensin diye", "So indexes update automatically"],
              ],
              answer: 0,
              explain: [
                "İşlem olmadan, `DELETE` çalışıp `INSERT` çalışmazsa o günün verisi tamamen kaybolur ve rapor boş görünür. İşlem, bu ara durumun dışarıdan hiç görünmemesini garanti eder.",
                "Without a transaction, if the `DELETE` runs but the `INSERT` fails, that day's data disappears entirely and the report shows blank. The transaction guarantees that this intermediate state is never visible from outside.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Aynı yükleme işi bir gün içinde iki kez çalıştı ama tablo değişmedi. Bu işin hangi özelliğidir?",
                "The same load job ran twice in one day but the table did not change. Which property is this?",
              ],
              options: [
                ["Tekrarlanabilirlik (idempotency)", "Idempotency"],
                ["Atomiklik", "Atomicity"],
                ["Kalıcılık", "Durability"],
                ["Yalıtım", "Isolation"],
              ],
              answer: 0,
              explain: [
                "Tekrarlanabilir bir iş, kaç kez çalışırsa çalışsın aynı sonucu bırakır. Veri hatlarında bu kritik bir özelliktir çünkü işler ağ hatası, yeniden deneme veya elle tetikleme yüzünden beklenmedik şekilde tekrar çalışır.",
                "An idempotent job leaves the same result however many times it runs. This is critical in data pipelines, because jobs get re-run unexpectedly due to network errors, retries or manual triggers.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
