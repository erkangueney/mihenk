import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, quiz, sqlTask, text, tip, trySql } from "../helpers";

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
            quiz({
              id: "q2",
              q: [
                "Bir sipariş tablosunda müşterinin adını her satırda tekrar yazmanın en büyük riski nedir?",
                "What is the biggest risk of retyping the customer's name on every row of an orders table?",
              ],
              options: [
                [
                  "Ad değiştiğinde yüzlerce satırı tek tek düzeltmen gerekir",
                  "When the name changes you must fix hundreds of rows one by one",
                ],
                ["Veritabanı bu kadar tekrarı saklayamaz", "The database cannot store that much repetition"],
                ["Sorgular otomatik olarak yavaşlar", "Queries automatically slow down"],
                ["Ad sütunu silinir", "The name column gets deleted"],
              ],
              answer: 0,
              explain: [
                "Tekrar, güncelleme maliyetini büyütür: bir müşteri adını değiştirdiğinde onu içeren her satırı bulup düzeltmen gerekir. Bu hem yavaştır hem hata payı yüksektir.",
                "Repetition inflates the cost of updates: when a customer's name changes you must find and fix every row that contains it. That is both slow and error-prone.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Aynı Excel dosyasını iki kişinin aynı anda düzenleyememesi hangi soruna örnektir?",
                "Two people being unable to edit the same spreadsheet at once is an example of which problem?",
              ],
              options: [
                ["Eşzamanlılık", "Concurrency"],
                ["Tekrar", "Repetition"],
                ["Boyut", "Size"],
                ["Normalizasyon", "Normalization"],
              ],
              answer: 0,
              explain: [
                "Bir veritabanı aynı anda yüzlerce kişiye hizmet edebilecek şekilde tasarlanmıştır; tek bir dosya bunu yapamaz.",
                "A database is built to serve hundreds of people at once; a single file cannot.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Milyonlarca satırlık bir tablo neden bir Excel dosyası olarak tutulamaz?",
                "Why can't a table with millions of rows be kept as a spreadsheet file?",
              ],
              options: [
                [
                  "Dosya bu boyutta açılmaz bile, veritabanı ise saniyeler içinde cevap verir",
                  "The file won't even open at that size, while a database answers in seconds",
                ],
                ["Excel metin saklayamaz", "Excel cannot store text"],
                ["Sadece veritabanları sayı saklayabilir", "Only databases can store numbers"],
                ["Tablo adı çok uzun olur", "The table name becomes too long"],
              ],
              answer: 0,
              explain: [
                "Boyut, üç sorundan biridir: bir elektronik tablo programı milyonlarca satırı belleğe sığdıramaz, bir veritabanı ise tam da bunun için tasarlanmıştır.",
                "Size is one of the three problems: a spreadsheet program cannot fit millions of rows in memory, while a database is built for exactly that.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "`customers`, `orders`, `products` ve `order_items` gibi ayrı tablolara bölmenin amacı nedir?",
                "What is the point of splitting data into separate tables like `customers`, `orders`, `products` and `order_items`?",
              ],
              options: [
                [
                  "Her bilgiyi bir kez yazıp tabloları anahtarlarla birbirine bağlamak",
                  "To write each piece of information once and link the tables together through keys",
                ],
                ["Veritabanını daha yavaş çalıştırmak", "To make the database run slower"],
                ["Her tabloya aynı sütunları koymak", "To put the same columns in every table"],
                ["Sorgu yazmayı zorlaştırmak", "To make queries harder to write"],
              ],
              answer: 0,
              explain: [
                "Bu, normalizasyonun tanımıdır: her gerçek bir kez yazılır, tablolar arasındaki ilişki bir anahtarla kurulur. Tekrar yoksa tutarsızlık da olmaz.",
                "This is the definition of normalization: every fact is written once, and the relationship between tables is established through a key. No repetition means no inconsistency.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`orders` tablosu bir müşteriyle nasıl ilişki kurar?",
                "How does the `orders` table relate to a customer?",
              ],
              options: [
                [
                  "Müşteriye bir numarayla (kimlikle) bağlanır, adını kendi içinde tekrar yazmaz",
                  "It links to the customer by a number (an id), without repeating the name inside itself",
                ],
                ["Müşterinin adını da kendi içinde saklar", "It also stores the customer's name internally"],
                ["`customers` tablosundan tamamen bağımsızdır", "It is completely independent from the `customers` table"],
                ["Her siparişte yeni bir müşteri oluşturur", "It creates a new customer on every order"],
              ],
              answer: 0,
              explain: [
                "`orders` bir müşteri kimliği (`customer_id`) taşır; asıl ad yalnızca `customers` tablosunda durur. Bu, tekrarı önleyen bağlantı biçimidir.",
                "`orders` carries a customer id; the actual name lives only in `customers`. This is the link that avoids repetition.",
              ],
            }),
            quiz({
              id: "q7",
              q: ["`order_items` tablosu ne tutar?", "What does the `order_items` table hold?"],
              options: [
                [
                  "Hangi siparişte hangi üründen kaç adet olduğunu",
                  "How many of which product appear in which order",
                ],
                ["Sadece müşteri adreslerini", "Only customer addresses"],
                ["Ürün kategorilerinin listesini", "The list of product categories"],
                ["Siparişlerin toplam tutarını doğrudan", "The total amount of orders directly"],
              ],
              answer: 0,
              explain: [
                "`order_items`, bir siparişi oluşturan kalemleri tutar — hangi ürün, hangi siparişte, kaç adet. Toplam tutar bu satırlardan hesaplanır, ayrıca saklanmaz.",
                "`order_items` holds the line items that make up an order — which product, in which order, in what quantity. The total amount is computed from these rows, not stored separately.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bir müşteri soyadını değiştirirse normalize edilmiş bu şemada ne olur?",
                "If a customer changes their surname, what happens in this normalized schema?",
              ],
              options: [
                [
                  "`customers` tablosunda tek bir satır güncellenir, tüm siparişler otomatik olarak güncel kalır",
                  "One row in `customers` is updated, and every order stays correct automatically",
                ],
                [
                  "Tüm siparişlerin ad sütunu tek tek güncellenmelidir",
                  "The name column on every order must be updated one by one",
                ],
                ["Eski siparişler silinir", "The old orders get deleted"],
                ["Yeni bir `customers` tablosu oluşturulmalıdır", "A new `customers` table must be created"],
              ],
              answer: 0,
              explain: [
                "Ad yalnızca `customers` tablosunda durduğu için tek satır güncellenir; `orders` zaten `customer_id` üzerinden o satıra bakar, ekstra iş çıkmaz.",
                "Because the name lives only in `customers`, updating one row is enough; `orders` already points at that row via `customer_id`, so no extra work is needed.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "SQL kısaltması ve kökeni için hangisi doğrudur?",
                "Which is correct about what SQL stands for and where it began?",
              ],
              options: [
                [
                  "Structured Query Language; 1970'lerde IBM'de doğdu",
                  "Structured Query Language; it was born at IBM in the 1970s",
                ],
                [
                  "Simple Query Logic; 2000'lerde bir arama motorunda doğdu",
                  "Simple Query Logic; it was born at a search engine in the 2000s",
                ],
                ["System Query List; tek bir şirketin ürünüdür", "System Query List; it is a single company's product"],
                ["Standard Quality Layer; bir dosya formatıdır", "Standard Quality Layer; it is a file format"],
              ],
              answer: 0,
              explain: [
                "SQL, Structured Query Language'ın kısaltmasıdır ve 1970'lerde IBM'de doğdu. Elli yıldır neredeyse her ilişkisel veritabanının ortak dili olmaya devam ediyor.",
                "SQL stands for Structured Query Language and was born at IBM in the 1970s. It has remained the common language of nearly every relational database for fifty years.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "PostgreSQL'de öğrendiğin SQL'in çoğu Snowflake veya BigQuery'de neden işe yarar?",
                "Why does most of the SQL you learn in PostgreSQL also work in Snowflake or BigQuery?",
              ],
              options: [
                [
                  "Hepsi aynı temel dili — SQL'i — küçük farklarla konuşur",
                  "They all speak the same core language — SQL — with small differences",
                ],
                ["Bütün veritabanları aynı şirkete aittir", "All databases belong to the same company"],
                ["SQL her sistemde otomatik olarak çevrilir", "SQL is automatically translated on every system"],
                ["Aslında hiçbiri birbirine benzemez, tesadüftür", "None of them are actually alike, it's a coincidence"],
              ],
              answer: 0,
              explain: [
                "Bu, dersin son fikridir: PostgreSQL, MySQL, SQL Server, Oracle, SQLite, BigQuery ve Snowflake aynı temel dili konuşur. Bu yüzden SQL, bir analistin öğrenebileceği en uzun ömürlü beceridir.",
                "This is the lesson's closing idea: PostgreSQL, MySQL, SQL Server, Oracle, SQLite, BigQuery and Snowflake all speak the same core language. That makes SQL the longest-lived skill an analyst can pick up.",
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
            quiz({
              id: "q3",
              q: [
                "`orders.customer_id` sütunu `customers.id`'ye işaret ediyor. Bu tür bir sütuna ne denir?",
                "The `orders.customer_id` column points at `customers.id`. What is this kind of column called?",
              ],
              options: [
                ["Yabancı anahtar (foreign key)", "Foreign key"],
                ["Birincil anahtar (primary key)", "Primary key"],
                ["Takma ad (alias)", "Alias"],
                ["Tip dönüşümü", "Type cast"],
              ],
              answer: 0,
              explain: [
                "Yabancı anahtar, başka bir tablonun birincil anahtarına işaret eden sütundur. Bu, tabloları birbirine bağlayan bağdır.",
                "A foreign key is a column that points at another table's primary key. It is the link that ties tables together.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Bir tabloda iki satır aynı `id` değerine sahip olabilir mi?",
                "Can two rows in a table share the same `id` value?",
              ],
              options: [
                [
                  "Hayır, id birincil anahtarsa her satır benzersiz olmalıdır",
                  "No, if id is the primary key every row must be unique",
                ],
                ["Evet, sorun olmaz", "Yes, that's fine"],
                ["Sadece id NULL ise olabilir", "Only if the id is NULL"],
                ["Sadece ilk iki satırda olabilir", "Only for the first two rows"],
              ],
              answer: 0,
              explain: [
                "Birincil anahtarın tanımı gereği her satırı benzersiz kılması gerekir. İki satır aynı id'yi taşırsa veritabanı hangi satırın kastedildiğini artık bilemez.",
                "By definition a primary key must make every row unique. If two rows shared the same id, the database could no longer tell which row is meant.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "Şemada `price REAL NOT NULL` yazması ne anlama gelir?",
                "What does `price REAL NOT NULL` mean in the schema?",
              ],
              options: [
                [
                  "price sütunu ondalıklı sayı olmalı ve asla boş bırakılamaz",
                  "The price column must be a decimal number and can never be left empty",
                ],
                ["price sütunu isteğe bağlıdır", "The price column is optional"],
                ["price her zaman sıfırdır", "price is always zero"],
                ["price metin olarak saklanır", "price is stored as text"],
              ],
              answer: 0,
              explain: [
                "`REAL` tipi ondalıklı sayı demektir, `NOT NULL` ise bu sütunun her satırda dolu olması gerektiğini zorunlu kılar. İkisi birlikte şemanın sözleşmesini oluşturur.",
                "`REAL` means a decimal number, and `NOT NULL` forces this column to be filled on every row. Together they form the schema's contract.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Şemada `category_id INTEGER` satırında `NOT NULL` yazmıyor. Bu ne anlama gelebilir?",
                "In the schema, `category_id INTEGER` has no `NOT NULL`. What might that mean?",
              ],
              options: [
                [
                  "Bir ürünün kategorisi olmayabilir; o zaman category_id NULL kalır",
                  "A product may have no category, in which case category_id stays NULL",
                ],
                ["category_id her zaman sıfırdır", "category_id is always zero"],
                ["Sütun metin tipindedir", "The column is text type"],
                ["Ürün hiç silinemez", "The product can never be deleted"],
              ],
              answer: 0,
              explain: [
                "`NOT NULL` yoksa sütun boş bırakılabilir demektir. Kategorilendirilmemiş bir ürün için category_id NULL kalır — bu, veritabanının bilinçli olarak izin verdiği bir durumdur.",
                "The absence of `NOT NULL` means the column may be left empty. For an uncategorized product, category_id simply stays NULL — a state the database deliberately allows.",
              ],
            }),
            text(
              "**En sık kullanılan tipler:**\n\n- `INTEGER` — tam sayı: adet, yaş, kimlik numarası\n- `REAL` / `DECIMAL` — ondalıklı sayı: fiyat, oran\n- `TEXT` / `VARCHAR` — metin: ad, şehir, açıklama\n- `DATE` / `TIMESTAMP` — tarih ve saat\n- `BOOLEAN` — doğru/yanlış\n\nTip önemlidir çünkü davranışı belirler. `'10' + '2'` metinse birleşip `'102'` olabilir; sayıysa `12` eder. Fiyatı metin olarak saklarsan sıralaman da alfabetik olur: `'1000'` değeri `'9'` değerinden **önce** gelir.",
              "**The most common types:**\n\n- `INTEGER` — whole numbers: quantity, age, id\n- `REAL` / `DECIMAL` — decimals: price, ratio\n- `TEXT` / `VARCHAR` — text: name, city, description\n- `DATE` / `TIMESTAMP` — date and time\n- `BOOLEAN` — true/false\n\nType matters because it decides behaviour. `'10' + '2'` as text may concatenate into `'102'`; as numbers it is `12`. Store a price as text and your sorting goes alphabetical too: `'1000'` sorts **before** `'9'`.",
            ),
            quiz({
              id: "q7",
              q: [
                "Fiyat `TEXT` tipinde saklanırsa `ORDER BY price` ne yapar?",
                "If price is stored as `TEXT`, what does `ORDER BY price` do?",
              ],
              options: [
                [
                  "Sayısal değil alfabetik sıralar; '1000' değeri '9'dan önce gelir",
                  "It sorts alphabetically, not numerically; '1000' comes before '9'",
                ],
                ["Hiçbir fark olmaz, sayı gibi sıralar", "There's no difference, it still sorts numerically"],
                ["Sıralama hata verir", "Sorting throws an error"],
                ["Otomatik olarak sayıya çevrilir", "It is automatically converted to a number"],
              ],
              answer: 0,
              explain: [
                "Metin sıralaması karakter karakter yapılır, sayı büyüklüğüne bakmaz. Bu yüzden fiyat gibi sayısal alanları her zaman sayısal tiple (REAL, INTEGER) saklamak gerekir.",
                "Text sorting compares character by character, not by numeric magnitude. That is why numeric fields like price should always be stored with a numeric type (REAL, INTEGER).",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`'10' + '2'` metin olarak birleştirilirse sonucu nedir, sayı olarak toplanırsa sonucu nedir?",
                "What is `'10' + '2'` if treated as text concatenation, versus as numeric addition?",
              ],
              options: [
                ["'102' vs 12", "'102' vs 12"],
                ["12 vs '102'", "12 vs '102'"],
                ["'12' vs 102", "'12' vs 102"],
                ["İkisi de 12'dir", "Both are 12"],
              ],
              answer: 0,
              explain: [
                "Metin olarak iki değer uç uca eklenir: '10' + '2' = '102'. Sayı olarak toplanırsa aritmetik yapılır: 10 + 2 = 12. Aynı sembol, tipe göre tamamen farklı davranır.",
                "As text the two values are glued end to end: '10' + '2' = '102'. As numbers, arithmetic happens: 10 + 2 = 12. The same symbol behaves completely differently depending on type.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bir müşterinin kayıt tarihini saklamak için en uygun tip hangisidir?",
                "Which type is most appropriate for storing a customer's signup date?",
              ],
              options: [
                ["DATE / TIMESTAMP", "DATE / TIMESTAMP"],
                ["TEXT", "TEXT"],
                ["BOOLEAN", "BOOLEAN"],
                ["INTEGER", "INTEGER"],
              ],
              answer: 0,
              explain: [
                "DATE/TIMESTAMP tipi tarih aritmetiğini ve kronolojik sıralamayı doğru yapar. Tarihi TEXT olarak saklarsan sıralama, tıpkı fiyatta olduğu gibi, alfabetik olur ve yanlış sonuç verebilir.",
                "The DATE/TIMESTAMP type handles date arithmetic and chronological sorting correctly. Store a date as TEXT and, just like with price, sorting turns alphabetical and can go wrong.",
              ],
            }),
            pitfall(
              "NULL bir değer değildir",
              "NULL is not a value",
              "`NULL`, \"burada değer yok\" demektir — sıfır da değil, boş metin de değil. **Bilinmeyen** anlamına gelir. Bu yüzden `NULL = NULL` sorusunun cevabı `true` değil, yine `NULL`'dur: iki bilinmeyenin eşit olup olmadığını kimse bilemez. NULL'u sınamak için `IS NULL` ve `IS NOT NULL` kullanılır. Bu ayrımı kaçıran analistler sessizce yanlış sayılar üretir.",
              "`NULL` means \"there is no value here\" — not zero, not an empty string. It means **unknown**. That is why the answer to `NULL = NULL` is not `true` but `NULL` again: nobody can know whether two unknowns are equal. To test for it you use `IS NULL` and `IS NOT NULL`. Analysts who miss this distinction quietly produce wrong numbers.",
            ),
            quiz({
              id: "q10",
              q: ["`NULL = NULL` ifadesinin sonucu nedir?", "What is the result of `NULL = NULL`?"],
              options: [
                ["NULL (bilinmiyor), `true` değil", "NULL (unknown), not `true`"],
                ["`true`", "`true`"],
                ["`false`", "`false`"],
                ["Hata verir", "It throws an error"],
              ],
              answer: 0,
              explain: [
                "İki bilinmeyenin eşit olup olmadığı bilinemez, bu yüzden karşılaştırma da NULL döner. Bu, `WHERE sütun = NULL` yazmanın hiçbir zaman satır getirmemesinin sebebidir.",
                "Whether two unknowns are equal cannot be known, so the comparison itself evaluates to NULL. This is why `WHERE column = NULL` never returns any rows.",
              ],
            }),
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
            quiz({
              id: "q1",
              q: [
                "SQL sorgusunda `SELECT`, `FROM`, `WHERE` gibi ifadelerin sırası neden önemlidir?",
                "Why does the order of clauses like `SELECT`, `FROM`, `WHERE` matter in a SQL query?",
              ],
              options: [
                [
                  "Kullandığın ifadelerin sırası sabittir; bu sırayı bozarsan veritabanı hata verir",
                  "The order of the clauses you use is fixed; breaking it makes the database raise an error",
                ],
                ["Sıra önemli değildir, istediğin gibi yazabilirsin", "Order doesn't matter, you can write them in any order"],
                ["Sadece SELECT'in yerini değiştirebilirsin", "Only SELECT's position can change"],
                ["Sıra sadece performansı etkiler, hata vermez", "Order only affects performance, not errors"],
              ],
              answer: 0,
              explain: [
                "SQL'in iskeleti sabittir: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT — hep bu sırayla yazılır. Sırayı bozan bir sorgu doğrudan sözdizimi hatası verir.",
                "SQL's skeleton is fixed: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT are always written in that order. A query that breaks this order fails with a syntax error.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "`WHERE` veya `GROUP BY` olmadan sadece `SELECT ... FROM ...` yazmak geçerli bir sorgu mudur?",
                "Is `SELECT ... FROM ...` alone, without `WHERE` or `GROUP BY`, a valid query?",
              ],
              options: [
                [
                  "Evet, ihtiyacın olmayan ifadeleri atlayabilirsin, ama kullandıklarının sırası sabit kalır",
                  "Yes, you can skip clauses you don't need, but the order of the ones you do use stays fixed",
                ],
                ["Hayır, her sorguda yedi ifadenin hepsi olmalı", "No, every query must include all seven clauses"],
                ["Hayır, en az WHERE gerekir", "No, WHERE is required at minimum"],
                ["Hayır, LIMIT olmadan sorgu çalışmaz", "No, a query won't run without LIMIT"],
              ],
              answer: 0,
              explain: [
                "İskeletteki her ifade isteğe bağlıdır, zorunlu olan yalnızca SELECT ve FROM'dur. Kullanmadığın ifadeleri atlarsın; kullandıkların sırasını değil.",
                "Every clause in the skeleton is optional except SELECT and FROM, which are required. You skip the clauses you don't need — never reorder the ones you do use.",
              ],
            }),
            info(
              "Yazma sırası ≠ çalıştırma sırası",
              "Writing order ≠ execution order",
              "Veritabanı sorguyu yukarıdan aşağı okumaz. Önce **FROM** ile tabloyu alır, sonra **WHERE** ile satırları eler, sonra **GROUP BY** ile gruplar, sonra **HAVING**, ancak ondan sonra **SELECT** ile sütunları seçer, en sonunda **ORDER BY** ve **LIMIT** uygular.\n\nBu, en çok kafa karıştıran iki durumu açıklar: `SELECT`'te verdiğin takma adı `WHERE` içinde kullanamazsın (henüz oluşmamıştır), ama `ORDER BY` içinde kullanabilirsin (artık oluşmuştur).",
              "The database does not read the query top to bottom. It first takes the table with **FROM**, filters rows with **WHERE**, groups with **GROUP BY**, then **HAVING**, and only then picks columns with **SELECT**, finally applying **ORDER BY** and **LIMIT**.\n\nThis explains the two most confusing situations: you cannot use an alias defined in `SELECT` inside `WHERE` (it does not exist yet), but you can use it in `ORDER BY` (by then it does).",
            ),
            quiz({
              id: "q3",
              q: [
                "`SELECT` içinde `AS toplam` diye bir takma ad tanımladın. Bunu `WHERE` içinde kullanabilir misin?",
                "You defined an alias `AS total` in `SELECT`. Can you use it inside `WHERE`?",
              ],
              options: [
                [
                  "Hayır, WHERE SELECT'ten önce çalışır; takma ad henüz oluşmamıştır",
                  "No, WHERE runs before SELECT; the alias doesn't exist yet",
                ],
                ["Evet, her zaman kullanılabilir", "Yes, always usable"],
                ["Sadece LIMIT ile birlikte kullanılırsa olur", "Only if used together with LIMIT"],
                ["Evet ama sonucu yanlış olur", "Yes, but the result will be wrong"],
              ],
              answer: 0,
              explain: [
                "Çalıştırma sırası FROM → WHERE → ... → SELECT'tir. WHERE, SELECT'ten önce çalıştığı için orada tanımlanan bir takma ad WHERE'in çalıştığı anda henüz mevcut değildir.",
                "The execution order is FROM → WHERE → ... → SELECT. Because WHERE runs before SELECT, an alias defined there does not yet exist at the moment WHERE executes.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Aynı takma adı `ORDER BY` içinde kullanabilir misin?",
                "Can you use that same alias inside `ORDER BY`?",
              ],
              options: [
                [
                  "Evet, çünkü ORDER BY SELECT'ten sonra çalışır ve takma ad artık vardır",
                  "Yes, because ORDER BY runs after SELECT, and the alias already exists by then",
                ],
                ["Hayır, hiçbir zaman", "No, never"],
                ["Sadece GROUP BY yoksa olur", "Only if there's no GROUP BY"],
                ["Sadece sayısal takma adlarda olur", "Only for numeric aliases"],
              ],
              answer: 0,
              explain: [
                "ORDER BY, çalıştırma sırasında SELECT'ten sonra gelir. SELECT'in ürettiği takma adlar bu noktada zaten mevcuttur, bu yüzden ORDER BY onları görebilir.",
                "ORDER BY comes after SELECT in the execution order. The aliases SELECT produces already exist by that point, so ORDER BY can see them.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Veritabanı bir sorguyu çalıştırırken ilk hangi ifadeyi işler?",
                "When the database executes a query, which clause does it process first?",
              ],
              options: [
                ["FROM", "FROM"],
                ["SELECT", "SELECT"],
                ["WHERE", "WHERE"],
                ["ORDER BY", "ORDER BY"],
              ],
              answer: 0,
              explain: [
                "Çalıştırma sırası FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT'tir. Veritabanı önce hangi tablodan çalışacağını belirlemek zorundadır, o yüzden FROM ilk işlenir.",
                "The execution order is FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. The database must first know which table to work from, so FROM is processed first.",
              ],
            }),
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
            quiz({
              id: "q7",
              q: [
                "Yukarıdaki sıralama alıştırmasında `HAVING`, `GROUP BY`'dan önce mi sonra mı gelir?",
                "In the ordering exercise above, does `HAVING` come before or after `GROUP BY`?",
              ],
              options: [
                ["Sonra — HAVING her zaman GROUP BY'ı takip eder", "After — HAVING always follows GROUP BY"],
                ["Önce", "Before"],
                ["Fark etmez, ikisi yer değiştirebilir", "It doesn't matter, they can swap places"],
                ["HAVING ile GROUP BY aynı satırda yazılır", "HAVING and GROUP BY are written on the same line"],
              ],
              answer: 0,
              explain: [
                "İskelette HAVING, GROUP BY'dan hemen sonra gelir çünkü hangi grupların kalacağına karar vermek için önce grupların oluşmuş olması gerekir.",
                "In the skeleton, HAVING immediately follows GROUP BY, because deciding which groups survive requires the groups to already exist.",
              ],
            }),
            text(
              "SQL **bildirimsel** bir dildir: ne istediğini yazarsın, nasıl bulunacağını değil. \"1000 TL üzerindeki ürünleri pahalıdan ucuza sırala\" dersin; veritabanının hangi indeksi kullanacağına, satırları nasıl tarayacağına **sorgu planlayıcı** karar verir.\n\nBu yüzden SQL öğrenmek, döngü yazmayı öğrenmekten farklıdır. Soruyu doğru sormayı öğrenirsin.",
              "SQL is a **declarative** language: you write what you want, not how to find it. You say \"sort products above 1000 from expensive to cheap\"; the **query planner** decides which index to use and how to scan the rows.\n\nThat is why learning SQL differs from learning to write loops. You learn to ask the question correctly.",
            ),
            quiz({
              id: "q6",
              q: [
                "SQL'in \"bildirimsel\" bir dil olması ne anlama gelir?",
                "What does it mean that SQL is a \"declarative\" language?",
              ],
              options: [
                [
                  "Ne istediğini yazarsın, nasıl bulunacağına sorgu planlayıcı karar verir",
                  "You write what you want; the query planner decides how to find it",
                ],
                ["Adım adım bir algoritma yazman gerekir", "You must write a step-by-step algorithm"],
                ["Döngü kullanman zorunludur", "You are required to use loops"],
                ["Veritabanı her zaman tabloyu baştan sona tarar", "The database always scans the table from start to end"],
              ],
              answer: 0,
              explain: [
                "Bildirimsel bir dilde \"ne\" istediğini söylersin, \"nasıl\" bulunacağını değil. Hangi indeksin kullanılacağı, satırların nasıl tarandığı sorgu planlayıcının işidir.",
                "In a declarative language you say \"what\" you want, not \"how\" to find it. Which index to use and how to scan the rows is the query planner's job.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: [
                "Üretim raporlarında `SELECT *` yerine sütunları tek tek yazmanın sebebi nedir?",
                "Why should production reports name columns explicitly instead of using `SELECT *`?",
              ],
              options: [
                [
                  "Biri tabloya yeni sütun eklediğinde SELECT * kullanan rapor sessizce değişir ya da bozulur",
                  "When someone adds a new column, a report using SELECT * silently changes or breaks",
                ],
                ["SELECT * her zaman hata verir", "SELECT * always throws an error"],
                ["SELECT * sadece ilk sütunu getirir", "SELECT * only returns the first column"],
                ["SELECT * veritabanını yavaşça siler", "SELECT * slowly deletes the database"],
              ],
              answer: 0,
              explain: [
                "Açıkça yazılan bir sütun listesi, tablo şeması değişse bile raporun ne göstereceğini sabit tutar. SELECT * ise tablo neyse onu getirir — sürpriz sütunlar dahil.",
                "An explicit column list keeps what the report shows fixed even if the table's schema changes. SELECT * returns whatever the table happens to have — surprise columns included.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: ["SELECT ve FROM sırasıyla neyi belirler?", "What do SELECT and FROM specify, respectively?"],
              options: [
                [
                  "SELECT hangi sütunları, FROM hangi tabloyu istediğini belirler",
                  "SELECT specifies which columns, FROM specifies which table you want",
                ],
                ["SELECT hangi tabloyu, FROM hangi sütunları belirler", "SELECT specifies the table, FROM the columns"],
                ["İkisi de aynı şeyi yapar", "Both do the same thing"],
                ["SELECT satır sayısını sınırlar", "SELECT limits the row count"],
              ],
              answer: 0,
              explain: [
                "SQL iki temel sorudan oluşur: hangi sütunlar (SELECT) ve hangi tablodan (FROM). Satır sayısını sınırlamak farklı bir ifadenin, LIMIT'in, işidir.",
                "SQL is built from two basic questions: which columns (SELECT) and from which table (FROM). Limiting the row count is a different clause's job — LIMIT.",
              ],
            }),
            code(
              "sql",
              `-- Tüm sütunlar (yıldız = hepsi)
SELECT * FROM products;

-- Sadece iki sütun
SELECT name, price FROM products;`,
              "İlk sorgular",
              "First queries",
            ),
            quiz({
              id: "q3",
              q: [
                "`SELECT * FROM products;` ile `SELECT name, price FROM products;` arasındaki fark nedir?",
                "What is the difference between `SELECT * FROM products;` and `SELECT name, price FROM products;`?",
              ],
              options: [
                [
                  "İlki tüm sütunları, ikincisi yalnızca name ve price sütunlarını getirir",
                  "The first returns every column, the second only name and price",
                ],
                ["İlki daha az satır getirir", "The first returns fewer rows"],
                ["İkincisi tabloyu değiştirir", "The second modifies the table"],
                ["Aralarında fark yoktur", "There is no difference"],
              ],
              answer: 0,
              explain: [
                "Her ikisi de products tablosundaki tüm satırları getirir; fark satır sayısında değil, hangi sütunların döndüğündedir.",
                "Both return every row in the products table; the difference isn't in row count, it's in which columns come back.",
              ],
            }),
            text(
              "`*` işareti \"bütün sütunlar\" demektir. Keşif yaparken pratiktir ama gerçek işlerde **ihtiyacın olan sütunları tek tek yaz**: sorgu hem hızlanır hem de tabloya sonradan sütun eklendiğinde raporun bozulmaz.\n\nSütunlara yeni bir ad vermek için `AS` kullanılır — buna *takma ad* (alias) denir.",
              "The `*` means \"every column\". It is handy while exploring, but in real work **list the columns you need**: the query gets faster and your report will not break when someone adds a column later.\n\nUse `AS` to give a column a new name — this is called an *alias*.",
            ),
            quiz({
              id: "q4",
              q: [
                "`*` kullanmak keşif yaparken neden pratiktir ama gerçek işte önerilmez?",
                "Why is `*` handy while exploring but discouraged in real work?",
              ],
              options: [
                [
                  "Tabloyu tanımanı sağlar, ama sorguyu yavaşlatabilir ve sonradan eklenen sütunlarla raporu bozabilir",
                  "It lets you get to know the table, but it can slow the query and break the report when columns are added later",
                ],
                ["* aslında çalışmaz, sadece görünür", "* doesn't actually run, it's just cosmetic"],
                ["* yalnızca ilk satırı getirir", "* only returns the first row"],
                ["* veritabanını kilitler", "* locks the database"],
              ],
              answer: 0,
              explain: [
                "Keşifte hız önemli değildir, tabloyu tanımak önemlidir. Ama üretimdeki bir raporda gereksiz sütun taşımak yavaşlatır, ayrıca biri tabloya sütun eklediğinde rapor sessizce değişir.",
                "While exploring, speed doesn't matter — getting to know the table does. But in a production report, carrying unneeded columns slows things down, and the report silently changes when someone adds a column.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`SELECT price AS fiyat FROM products;` sorgusunda `AS fiyat` ne işe yarar?",
                "In `SELECT price AS fiyat FROM products;`, what does `AS fiyat` do?",
              ],
              options: [
                [
                  "price sütununa sonuçta görünecek yeni bir ad (takma ad) verir",
                  "It gives the price column a new name (an alias) that shows in the result",
                ],
                ["price sütununu tablodan siler", "It deletes the price column from the table"],
                ["Fiyatları başka bir para birimine çevirir", "It converts prices to another currency"],
                ["Sonucu fiyata göre sıralar", "It sorts the result by price"],
              ],
              answer: 0,
              explain: [
                "AS yalnızca sonuçta görünen başlığı değiştirir; asıl sütunu ya da veriyi hiçbir şekilde değiştirmez.",
                "AS only changes the label shown in the result; it never modifies the actual column or the underlying data.",
              ],
            }),
            code(
              "sql",
              `SELECT
  name AS urun_adi,
  price AS fiyat
FROM products;`,
            ),
            trySql(
              `-- Bu senin alanın: sütunları değiştir, AS ekle, * dene, çalıştır.
SELECT
  name AS urun_adi,
  price AS fiyat,
  stock AS stok
FROM products;`,
            ),
            tip(
              "Noktalı virgül ve büyük harf",
              "Semicolons and capitals",
              "SQL anahtar kelimeleri büyük/küçük harfe duyarsızdır; `select` ile `SELECT` aynı işi yapar. Anahtar kelimeleri BÜYÜK, tablo ve sütunları küçük yazmak yaygın bir okunabilirlik geleneğidir.",
              "SQL keywords are case-insensitive; `select` and `SELECT` do the same thing. Writing keywords in UPPERCASE and tables/columns in lowercase is a common readability convention.",
            ),
            quiz({
              id: "q6",
              q: [
                "`select name from products;` ile `SELECT name FROM products;` arasında ne fark vardır?",
                "What is the difference between `select name from products;` and `SELECT name FROM products;`?",
              ],
              options: [
                [
                  "Hiçbir işlevsel fark yok; SQL anahtar kelimeleri büyük/küçük harfe duyarsızdır",
                  "No functional difference; SQL keywords are case-insensitive",
                ],
                ["İkincisi daha hızlı çalışır", "The second one runs faster"],
                ["Birincisi hata verir", "The first one throws an error"],
                ["İkincisi sonuçları büyük harfe çevirir", "The second converts the results to uppercase"],
              ],
              answer: 0,
              explain: [
                "SQL anahtar kelimeleri büyük/küçük harfe duyarsızdır, ikisi de aynı sonucu verir. Fark yalnızca okunabilirlik alışkanlığındadır.",
                "SQL keywords are case-insensitive, so both run identically. The only difference is a readability habit.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Anahtar kelimeleri BÜYÜK, tablo/sütun adlarını küçük harf yazmak neden yaygın bir gelenektir?",
                "Why is writing keywords in UPPERCASE and tables/columns in lowercase a common convention?",
              ],
              options: [
                [
                  "Sorguyu okunur kılar — anahtar kelime ile veri adı görsel olarak ayrışır",
                  "It keeps the query readable — keywords and data names stand apart visually",
                ],
                ["Veritabanı büyük harfleri daha hızlı işler", "The database processes uppercase faster"],
                ["SQL standardı bunu zorunlu kılar", "The SQL standard requires it"],
                ["Küçük harf kullanmak hata verir", "Lowercase throws an error"],
              ],
              answer: 0,
              explain: [
                "Bu bir performans kuralı değil, okunabilirlik alışkanlığıdır. Anahtar kelimeler büyük yazılınca gözün sorgunun yapısını, veri adlarından ayırt etmesi kolaylaşır.",
                "This isn't a performance rule, it's a readability habit. Capitalizing keywords makes it easy for the eye to separate the query's structure from the data names.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: [
                "customers tablosunda kaç satır olduğunu öğrenmek için hangi ifadeye ihtiyaç vardır?",
                "To find out how many rows are in the customers table, which construct do you need?",
              ],
              options: [
                ["`COUNT(*)`", "`COUNT(*)`"],
                ["`SELECT *`", "`SELECT *`"],
                ["`AS`", "`AS`"],
                ["`ORDER BY`", "`ORDER BY`"],
              ],
              answer: 0,
              explain: [
                "SELECT hangi sütunları, FROM hangi tabloyu belirtir; satır saymak ayrı bir araç ister: `COUNT(*)`. SELECT * ise sütunları getirir, sayıyı değil.",
                "SELECT specifies columns and FROM the table; counting rows needs a separate tool, `COUNT(*)`. SELECT * returns the columns, not a count.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bir raporda `stock` sütununu `stok_adedi` başlığıyla göstermek istiyorsun. Doğru yazım hangisi?",
                "You want a report to show the `stock` column under the header `stok_adedi`. Which is correct?",
              ],
              options: [
                ["`SELECT stock AS stok_adedi FROM products;`", "`SELECT stock AS stok_adedi FROM products;`"],
                ["`SELECT stok_adedi FROM stock;`", "`SELECT stok_adedi FROM stock;`"],
                [
                  "`FROM products AS stok_adedi SELECT stock;`",
                  "`FROM products AS stok_adedi SELECT stock;`",
                ],
                ["`SELECT stock FROM products AS stok_adedi;`", "`SELECT stock FROM products AS stok_adedi;`"],
              ],
              answer: 0,
              explain: [
                "Takma ad, seçtiğin sütunun hemen ardından `AS yeni_ad` ile verilir; sorgunun iskeleti (SELECT ... FROM ...) her zaman aynı sırayla kalır.",
                "An alias is given right after the selected column with `AS new_name`; the query's skeleton (SELECT ... FROM ...) always keeps the same order.",
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
            quiz({
              id: "q2",
              q: [
                "WHERE koşulunu sağlamayan bir satıra ne olur?",
                "What happens to a row that fails the WHERE condition?",
              ],
              options: [
                ["Sonuca hiç girmez", "It never appears in the result"],
                ["Sonuçta NULL olarak görünür", "It appears as NULL in the result"],
                ["Tablodan kalıcı olarak silinir", "It gets permanently deleted from the table"],
                ["En sona eklenir", "It gets appended at the end"],
              ],
              answer: 0,
              explain: [
                "WHERE bir filtredir, tabloyu değiştirmez. Koşulu sağlamayan satır yalnızca o sorgunun sonucunda görünmez; tablonun kendisi olduğu gibi kalır.",
                "WHERE is a filter, not a mutation. A row that fails the condition simply doesn't show up in that query's result; the table itself is untouched.",
              ],
            }),
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
            quiz({
              id: "q3",
              q: [
                "`WHERE price BETWEEN 500 AND 3000` hangi fiyatları içerir?",
                "Which prices does `WHERE price BETWEEN 500 AND 3000` include?",
              ],
              options: [
                ["500 ve 3000 dahil, aradaki tüm fiyatlar", "500 and 3000 inclusive, plus everything between"],
                ["Sadece 500 ile 3000 arasındaki, uçlar hariç", "Only strictly between 500 and 3000, excluding the ends"],
                ["Sadece 500 ve 3000'in kendisi", "Only 500 and 3000 themselves"],
                ["500'den küçük veya 3000'den büyük olanlar", "Anything less than 500 or greater than 3000"],
              ],
              answer: 0,
              explain: [
                "`BETWEEN a AND b` her iki ucu da dahil eder — `price >= a AND price <= b` ile aynı anlama gelir.",
                "`BETWEEN a AND b` includes both endpoints — it means the same thing as `price >= a AND price <= b`.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`WHERE name LIKE '%Saat%'` hangi ürünleri getirir?",
                "Which products does `WHERE name LIKE '%Saat%'` return?",
              ],
              options: [
                ["Adının herhangi bir yerinde 'Saat' geçen ürünleri", "Products whose name contains 'Saat' anywhere"],
                ["Adı tam olarak 'Saat' olanları", "Products whose name is exactly 'Saat'"],
                ["Yalnızca adı 'Saat' ile başlayanları", "Only products whose name starts with 'Saat'"],
                ["Fiyatı saat biriminde olanları", "Products priced in hours"],
              ],
              answer: 0,
              explain: [
                "`%` işareti \"sıfır veya daha fazla herhangi bir karakter\" demektir. İki tarafa da `%` koyunca desen metnin **herhangi bir yerinde** aranır.",
                "The `%` wildcard means \"zero or more of any character\". With `%` on both sides, the pattern is searched **anywhere** in the text.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "Parantezsiz `WHERE city = 'İstanbul' AND segment = 'bireysel' OR segment = 'kurumsal'` ifadesi neden yanıltıcıdır?",
                "Why is the parentheses-free `WHERE city = 'İstanbul' AND segment = 'bireysel' OR segment = 'kurumsal'` misleading?",
              ],
              options: [
                [
                  "AND, OR'dan önce çalışır; bu da şehir fark etmeksizin tüm 'kurumsal' müşterileri dahil eder",
                  "AND binds tighter than OR, so it also includes every 'kurumsal' customer regardless of city",
                ],
                ["SQL bu ifadeyi çalıştırmaz", "SQL refuses to run this expression"],
                ["AND ve OR aynı önceliktedir, fark yoktur", "AND and OR have equal precedence, there's no difference"],
                ["segment sütunu böyle kullanılamaz", "The segment column cannot be used this way"],
              ],
              answer: 0,
              explain: [
                "SQL bu ifadeyi `(city = 'İstanbul' AND segment = 'bireysel') OR segment = 'kurumsal'` olarak okur. Sonuçta İstanbul dışındaki kurumsal müşteriler de listeye sızar — niyet bu değildi.",
                "SQL reads this as `(city = 'İstanbul' AND segment = 'bireysel') OR segment = 'kurumsal'`. Corporate customers outside İstanbul leak into the list — that wasn't the intent.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Bir önceki sorudaki niyeti doğru ifade etmek için ne yapılmalı?",
                "How do you correctly express the intended meaning from the previous question?",
              ],
              options: [
                [
                  "OR'lu kısmı parantez içine almak: `city='İstanbul' AND (segment='bireysel' OR segment='kurumsal')`",
                  "Wrap the OR part in parentheses: `city='İstanbul' AND (segment='bireysel' OR segment='kurumsal')`",
                ],
                ["AND'i OR ile değiştirmek", "Replace AND with OR"],
                ["Koşulları tamamen kaldırmak", "Remove the conditions entirely"],
                ["WHERE yerine HAVING kullanmak", "Use HAVING instead of WHERE"],
              ],
              answer: 0,
              explain: [
                "Parantez, hangi koşulların birlikte değerlendirileceğini açıkça belirtir. Böylece \"İstanbul'da VE (bireysel VEYA kurumsal)\" niyeti sorguya doğru yansır.",
                "Parentheses explicitly state which conditions belong together, so the intent \"in İstanbul AND (individual OR corporate)\" is correctly reflected in the query.",
              ],
            }),
            pitfall(
              "NULL ile karşılaştırma yapılmaz",
              "You cannot compare with NULL",
              "`WHERE signup_date = NULL` **hiçbir zaman** satır döndürmez. NULL \"bilinmeyen\" demektir ve bilinmeyen bir şey hiçbir şeye eşit değildir — kendisine bile. Doğrusu: `WHERE signup_date IS NULL` veya `IS NOT NULL`.",
              "`WHERE signup_date = NULL` returns **no** rows, ever. NULL means \"unknown\", and an unknown value equals nothing — not even itself. Use `WHERE signup_date IS NULL` or `IS NOT NULL` instead.",
            ),
            quiz({
              id: "q7",
              q: [
                "`WHERE signup_date = NULL` sorgusu kaç satır döndürür?",
                "How many rows does `WHERE signup_date = NULL` return?",
              ],
              options: [
                ["Her zaman sıfır satır", "Always zero rows"],
                ["signup_date'i NULL olan tüm satırlar", "All rows where signup_date is NULL"],
                ["Tüm tablo", "The entire table"],
                ["Hata verir, sorgu çalışmaz", "It errors out and doesn't run"],
              ],
              answer: 0,
              explain: [
                "NULL hiçbir şeye eşit değildir, kendisine bile. `= NULL` karşılaştırması her zaman NULL (yani filtrelenir, satır dönmez) sonucunu üretir.",
                "NULL equals nothing, not even itself. The `= NULL` comparison always evaluates to NULL, so the row is filtered out and nothing is returned.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`WHERE city IN ('Ankara', 'İzmir')` hangi ifadeye eşdeğerdir?",
                "`WHERE city IN ('Ankara', 'İzmir')` is equivalent to which expression?",
              ],
              options: [
                ["`WHERE city = 'Ankara' OR city = 'İzmir'`", "`WHERE city = 'Ankara' OR city = 'İzmir'`"],
                ["`WHERE city = 'Ankara' AND city = 'İzmir'`", "`WHERE city = 'Ankara' AND city = 'İzmir'`"],
                ["`WHERE city BETWEEN 'Ankara' AND 'İzmir'`", "`WHERE city BETWEEN 'Ankara' AND 'İzmir'`"],
                ["`WHERE city LIKE 'Ankara,İzmir'`", "`WHERE city LIKE 'Ankara,İzmir'`"],
              ],
              answer: 0,
              explain: [
                "`IN` bir listedeki değerlerden herhangi birine eşitliği kısa yoldan ifade eder. `AND` burada işe yaramaz çünkü bir şehrin aynı anda iki değere eşit olması imkansızdır.",
                "`IN` is shorthand for matching any value in a list. `AND` would be wrong here, since a single city cannot equal two values at once.",
              ],
            }),
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
            quiz({
              id: "q1",
              q: ["ORDER BY için varsayılan sıralama yönü nedir?", "What is the default sort direction for ORDER BY?"],
              options: [
                ["ASC (artan)", "ASC (ascending)"],
                ["DESC (azalan)", "DESC (descending)"],
                ["Rastgele", "Random"],
                ["Veritabanına eklenme sırası", "Insertion order"],
              ],
              answer: 0,
              explain: [
                "`ASC` varsayılandır; `ORDER BY price` yazmak `ORDER BY price ASC` ile aynıdır. Azalan sıralama için `DESC` açıkça belirtilmelidir.",
                "`ASC` is the default; writing `ORDER BY price` is the same as `ORDER BY price ASC`. Descending order must be requested explicitly with `DESC`.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "En pahalı 5 ürünü bulmak için hangi ikili birlikte kullanılır?",
                "Which pair is used together to find the 5 most expensive products?",
              ],
              options: [
                ["ORDER BY price DESC ve LIMIT 5", "ORDER BY price DESC and LIMIT 5"],
                ["WHERE price DESC ve GROUP BY 5", "WHERE price DESC and GROUP BY 5"],
                ["ORDER BY price ASC ve LIMIT 5", "ORDER BY price ASC and LIMIT 5"],
                ["DISTINCT price ve LIMIT 5", "DISTINCT price and LIMIT 5"],
              ],
              answer: 0,
              explain: [
                "Önce en pahalıdan en ucuza sıralarsın (`DESC`), sonra ilk 5 satırı alırsın (`LIMIT 5`). `ASC` kullansaydın en ucuzları alırdın.",
                "You first sort from most to least expensive (`DESC`), then take the first 5 rows (`LIMIT 5`). Using `ASC` would give you the cheapest instead.",
              ],
            }),
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
            quiz({
              id: "q3",
              q: [
                "`ORDER BY category_id ASC, price DESC` sonucu nasıl sıralar?",
                "How does `ORDER BY category_id ASC, price DESC` sort the result?",
              ],
              options: [
                [
                  "Önce kategoriye göre artan, aynı kategori içinde fiyata göre azalan",
                  "First by category ascending, then within the same category by price descending",
                ],
                ["Sadece fiyata göre sıralar, kategoriyi yok sayar", "It sorts only by price, ignoring category"],
                ["Önce fiyata göre, sonra kategoriye göre", "First by price, then by category"],
                ["İki sütunu toplayıp tek değere göre sıralar", "It sums the two columns and sorts by that"],
              ],
              answer: 0,
              explain: [
                "ORDER BY'a verilen sütunlar soldan sağa öncelik sırasıyla uygulanır. İlk sütun ana sıralamayı belirler, ikincisi yalnızca eşitlikleri çözer.",
                "Columns passed to ORDER BY apply left to right in priority order. The first column sets the main sort, the second only breaks ties within it.",
              ],
            }),
            quiz({
              id: "q4",
              q: ["`SELECT DISTINCT city FROM customers;` ne döndürür?", "What does `SELECT DISTINCT city FROM customers;` return?"],
              options: [
                ["Her farklı şehri bir kez", "Each distinct city once"],
                ["Her müşterinin şehrini, tekrarlarla birlikte", "Every customer's city, including duplicates"],
                ["Şehir sayısını", "The count of cities"],
                ["Alfabetik olarak ilk şehri", "The alphabetically first city"],
              ],
              answer: 0,
              explain: [
                "`DISTINCT` sonuçtaki tekrar eden satırları eler. Beş müşteri İstanbul'da yaşasa bile 'İstanbul' sonuçta yalnızca bir kez görünür.",
                "`DISTINCT` removes duplicate rows from the result. Even if five customers live in İstanbul, 'İstanbul' appears only once in the output.",
              ],
            }),
            info(
              "Yazım sırası ≠ çalışma sırası",
              "Written order ≠ execution order",
              "SQL'i `SELECT ... FROM ... WHERE ... GROUP BY ... ORDER BY` diye yazarsın ama veritabanı şu sırayla çalıştırır: **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT**. Bu yüzden `SELECT`'te tanımladığın takma adı `WHERE` içinde kullanamazsın ama `ORDER BY` içinde kullanabilirsin.",
              "You write `SELECT ... FROM ... WHERE ... GROUP BY ... ORDER BY`, but the database runs it in this order: **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT**. That is why an alias defined in `SELECT` cannot be used in `WHERE`, but can be used in `ORDER BY`.",
            ),
            quiz({
              id: "q5",
              q: [
                "Çalıştırma sırasında LIMIT en son mu uygulanır?",
                "In the execution order, is LIMIT applied last?",
              ],
              options: [
                [
                  "Evet — FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT sırasında en sonda",
                  "Yes — it's last in FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
                ],
                ["Hayır, ilk uygulanır", "No, it's applied first"],
                ["LIMIT, WHERE'den önce çalışır", "LIMIT runs before WHERE"],
                ["LIMIT ile ORDER BY aynı anda çalışır", "LIMIT and ORDER BY run simultaneously"],
              ],
              answer: 0,
              explain: [
                "LIMIT, sonucun zaten sıralanmış ve seçilmiş halinden yalnızca bir dilim keser. Bu yüzden iskeletin en sonunda çalışır.",
                "LIMIT only slices a piece off the result after it has already been sorted and selected. That is why it runs at the very end of the pipeline.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "LIMIT, ORDER BY'dan önce çalışsaydı ne olurdu?",
                "What would go wrong if LIMIT ran before ORDER BY?",
              ],
              options: [
                [
                  "Sıralanmamış rastgele satırlardan ilk N'i alırdın, \"en pahalı N\" sorusuna cevap veremezdin",
                  "You'd take the first N unsorted, arbitrary rows — unable to answer a \"top N\" question",
                ],
                ["Hiçbir fark olmazdı", "There'd be no difference"],
                ["Sorgu hata verirdi", "The query would error out"],
                ["Sonuç iki katına çıkardı", "The result would double"],
              ],
              answer: 0,
              explain: [
                "\"En pahalı 5\" sorusunun cevabı, önce tüm satırların sıralanmasını, sonra kesilmesini gerektirir. Sıra tersine dönseydi, kesilen dilim anlamsız olurdu.",
                "Answering \"top 5 most expensive\" requires sorting all rows first and then cutting. Reverse the order and the slice you cut would be meaningless.",
              ],
            }),
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
            quiz({
              id: "q7",
              q: [
                "Sıralama alıştırmasındaki sorguda `LIMIT 3`, `ORDER BY adet DESC`'ten önce mi sonra mı yazılır?",
                "In the ordering exercise's query, is `LIMIT 3` written before or after `ORDER BY adet DESC`?",
              ],
              options: [
                ["Sonra — LIMIT iskeletin en son ifadesidir", "After — LIMIT is the last clause in the skeleton"],
                ["Önce", "Before"],
                ["Aralarına GROUP BY girer", "GROUP BY goes between them"],
                ["Fark etmez, sırası önemli değildir", "It doesn't matter, the order is irrelevant"],
              ],
              answer: 0,
              explain: [
                "İskelette LIMIT en sonda yer alır: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. Sıralamayı belirledikten sonra kaç satır alacağına karar verirsin.",
                "LIMIT sits last in the skeleton: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. You decide the sort first, then how many rows to keep.",
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
            quiz({
              id: "q8",
              q: [
                "En ucuz 3 ürünü bulmak istersen sorguyu nasıl değiştirirsin?",
                "If you wanted the 3 cheapest products instead, how would you change the query?",
              ],
              options: [
                ["`ORDER BY price ASC LIMIT 3` yazarsın", "Write `ORDER BY price ASC LIMIT 3`"],
                [
                  "Sadece LIMIT'i değiştirirsin, ORDER BY aynı (DESC) kalır",
                  "Only change the LIMIT number, keep ORDER BY as is (DESC)",
                ],
                ["`WHERE price < 3` eklersin", "Add `WHERE price < 3`"],
                ["`GROUP BY price` eklersin", "Add `GROUP BY price`"],
              ],
              answer: 0,
              explain: [
                "Yön DESC kalırsa hâlâ en pahalıları alırsın; \"en ucuz\" sorusuna cevap vermek için sıralama yönünü ASC'ye çevirmen gerekir.",
                "Leaving the direction as DESC still gives you the most expensive rows; to answer \"cheapest\" you must flip the sort direction to ASC.",
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
            quiz({
              id: "q2",
              q: [
                "GROUP BY olmadan `SELECT COUNT(*) FROM products;` çalıştırırsan ne olur?",
                "What happens if you run `SELECT COUNT(*) FROM products;` without GROUP BY?",
              ],
              options: [
                ["Tüm tablo için tek bir özet satır döner", "A single summary row for the whole table comes back"],
                ["Her satır için ayrı bir sayım döner", "A separate count comes back for every row"],
                ["Hata verir", "It throws an error"],
                ["Sadece ilk satır sayılır", "Only the first row gets counted"],
              ],
              answer: 0,
              explain: [
                "GROUP BY yoksa toplama fonksiyonu tüm tabloyu **tek bir grup** sayar ve tek bir özet satır üretir.",
                "Without GROUP BY, an aggregate treats the entire table as **one single group** and produces one summary row.",
              ],
            }),
            quiz({
              id: "q3",
              q: ["GROUP BY'ın toplama fonksiyonlarına kattığı şey nedir?", "What does GROUP BY add to aggregate functions?"],
              options: [
                [
                  "İndirgemeyi grup grup yapar — her şehir, her kategori için ayrı bir sonuç",
                  "It performs the collapse per group — a separate result for each city, each category",
                ],
                ["Toplama fonksiyonlarını devre dışı bırakır", "It disables aggregate functions"],
                ["Satırları alfabetik sıralar", "It sorts rows alphabetically"],
                ["NULL değerleri tabloya ekler", "It adds NULL values to the table"],
              ],
              answer: 0,
              explain: [
                "GROUP BY, tabloyu belirttiğin sütuna göre gruplara böler; her toplama fonksiyonu bu gruplardan her biri için ayrı ayrı çalışır.",
                "GROUP BY splits the table into groups by the column you name; each aggregate then runs separately for every one of those groups.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: [
                "`ROUND(AVG(price), 2)` ifadesinde `2` ne işe yarar?",
                "In `ROUND(AVG(price), 2)`, what does the `2` do?",
              ],
              options: [
                ["Sonucu virgülden sonra 2 basamağa yuvarlar", "It rounds the result to 2 decimal places"],
                ["Yalnızca ilk 2 satırı toplar", "It only sums the first 2 rows"],
                ["Ortalamayı 2'ye böler", "It divides the average by 2"],
                ["En az 2 satır olmasını zorunlu kılar", "It requires at least 2 rows to exist"],
              ],
              answer: 0,
              explain: [
                "`ROUND(değer, basamak)` ikinci argümanı virgülden sonra kaç basamak bırakılacağını belirtir. AVG genelde uzun ondalıklar üretir; ROUND bunu okunur kılar.",
                "`ROUND(value, digits)`'s second argument sets how many decimal places to keep. AVG often produces long decimals; ROUND makes it readable.",
              ],
            }),
            trySql(
              `-- GROUP BY'ı sil ve çalıştır: ne değişiyor?
-- Sonra category_id yerine stock > 100 gibi başka bir kırılım dene.
SELECT
  category_id,
  COUNT(*)             AS urun_sayisi,
  ROUND(AVG(price), 2) AS ortalama_fiyat,
  MAX(price)           AS en_pahali
FROM products
GROUP BY category_id;`,
            ),
            text(
              "Kural: `SELECT` içindeki her sütun ya `GROUP BY` listesinde olmalı ya da bir toplama fonksiyonunun içinde olmalı.\n\nGrupları filtrelemek için `WHERE` değil `HAVING` kullanılır. `WHERE` gruplama **öncesi** satırları, `HAVING` gruplama **sonrası** grupları eler.",
              "Rule: every column in `SELECT` must either appear in `GROUP BY` or sit inside an aggregate function.\n\nTo filter groups use `HAVING`, not `WHERE`. `WHERE` removes rows **before** grouping, `HAVING` removes groups **after** grouping.",
            ),
            quiz({
              id: "q4",
              q: [
                "`SELECT category_id, price FROM products GROUP BY category_id;` neden hataya yakın bir sorgudur?",
                "Why is `SELECT category_id, price FROM products GROUP BY category_id;` a problematic query?",
              ],
              options: [
                [
                  "price ne GROUP BY listesinde ne de bir toplama fonksiyonu içinde; hangi satırın price'ı gösterileceği belirsizdir",
                  "price is neither in GROUP BY nor inside an aggregate; it's unclear which row's price should show",
                ],
                ["category_id iki kez yazılmıştır", "category_id is written twice"],
                ["GROUP BY yalnızca sayısal sütunlarla çalışır", "GROUP BY only works with numeric columns"],
                ["price sütunu tabloda yoktur", "There is no price column in the table"],
              ],
              answer: 0,
              explain: [
                "Bir kategoride birden çok ürün varsa, hangisinin price'ı gösterilecek? Kural tam da bunu önler: her SELECT sütunu ya GROUP BY'da ya da bir toplama içinde olmalı.",
                "If a category has several products, whose price should be shown? The rule exists precisely to prevent this: every SELECT column must be in GROUP BY or inside an aggregate.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`WHERE segment = 'bireysel'` ile `HAVING COUNT(*) >= 2` arasındaki fark nedir?",
                "What is the difference between `WHERE segment = 'bireysel'` and `HAVING COUNT(*) >= 2`?",
              ],
              options: [
                [
                  "WHERE gruplamadan önce satırları eler, HAVING gruplamadan sonra grupları eler",
                  "WHERE removes rows before grouping, HAVING removes groups after grouping",
                ],
                ["İkisi de aynı anda, aynı şeyi yapar", "Both run at the same time and do the same thing"],
                ["HAVING satırları, WHERE grupları eler", "HAVING removes rows, WHERE removes groups"],
                ["WHERE yalnızca sayısal sütunlarla çalışır", "WHERE only works with numeric columns"],
              ],
              answer: 0,
              explain: [
                "WHERE, GROUP BY çalışmadan önce ham satırları filtreler. HAVING ise gruplar oluştuktan sonra, grup düzeyindeki bir koşula (COUNT, SUM gibi) göre filtreler.",
                "WHERE filters raw rows before GROUP BY runs. HAVING filters after the groups exist, based on a group-level condition like COUNT or SUM.",
              ],
            }),
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
              id: "q6",
              q: [
                "`WHERE COUNT(*) > 5` yazmak neden hata verir?",
                "Why does writing `WHERE COUNT(*) > 5` cause an error?",
              ],
              options: [
                [
                  "WHERE gruplama öncesi çalışır; COUNT(*) henüz hesaplanmamıştır — bunun için HAVING gerekir",
                  "WHERE runs before grouping; COUNT(*) doesn't exist yet — you need HAVING for that",
                ],
                ["COUNT fonksiyonu WHERE içinde hiçbir zaman kullanılamaz", "COUNT can never be used inside WHERE at all"],
                ["5 sayısı çok büyüktür", "The number 5 is too large"],
                ["WHERE yalnızca metin sütunlarıyla çalışır", "WHERE only works with text columns"],
              ],
              answer: 0,
              explain: [
                "COUNT(*) bir grup düzeyi hesabıdır ve ancak GROUP BY çalıştıktan sonra anlam kazanır. WHERE bundan önce çalıştığı için o anda COUNT(*) diye bir şey yoktur.",
                "COUNT(*) is a group-level computation that only makes sense after GROUP BY has run. Since WHERE runs before that, COUNT(*) simply doesn't exist yet at that point.",
              ],
            }),
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
            quiz({
              id: "q7",
              q: [
                "customers tablosunda kaç **farklı** şehir olduğunu saymak istersen ne yazarsın?",
                "If you want to count how many **distinct** cities appear in customers, what do you write?",
              ],
              options: [
                ["`COUNT(DISTINCT city)`", "`COUNT(DISTINCT city)`"],
                ["`COUNT(city)`", "`COUNT(city)`"],
                ["`COUNT(*)`", "`COUNT(*)`"],
                ["`SUM(city)`", "`SUM(city)`"],
              ],
              answer: 0,
              explain: [
                "`COUNT(city)` NULL olmayan tüm şehir değerlerini sayar, tekrarları dahil eder. Yalnızca farklı değerleri saymak için `DISTINCT` eklenir.",
                "`COUNT(city)` counts every non-NULL city value, duplicates included. To count only distinct values you add `DISTINCT`.",
              ],
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
            quiz({
              id: "q2",
              q: [
                "Bir CASE ifadesinde birden fazla WHEN koşulu doğruysa hangisi kullanılır?",
                "If multiple WHEN conditions in a CASE expression are true, which one is used?",
              ],
              options: [
                [
                  "Yukarıdan aşağı ilk tutan (eşleşen) koşul; gerisine bakılmaz",
                  "The first one that matches, read top to bottom; the rest are skipped",
                ],
                ["En alttaki koşul", "The bottommost condition"],
                ["Hepsi birleştirilir", "All of them are combined"],
                ["Rastgele biri seçilir", "One is chosen at random"],
              ],
              answer: 0,
              explain: [
                "CASE, WHEN'leri sırayla dener ve ilk tutan koşulda durur. Sonraki koşullar hiç değerlendirilmez, bu yüzden sıralama sonucu doğrudan etkiler.",
                "CASE tries each WHEN in order and stops at the first match. Later conditions are never evaluated, so the order directly affects the result.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "CASE ifadesinin SQL'deki karşılığı hangi programlama kavramıdır?",
                "What programming concept does a CASE expression correspond to in SQL?",
              ],
              options: [
                ["if/else", "if/else"],
                ["for döngüsü", "a for loop"],
                ["fonksiyon tanımı", "a function definition"],
                ["değişken atama", "variable assignment"],
              ],
              answer: 0,
              explain: [
                "CASE, koşulları sırayla kontrol edip ilk uyana göre bir sonuç üretir — tam olarak if/else zincirinin yaptığı iş.",
                "CASE checks conditions in order and produces a result based on the first one that matches — exactly what an if/else chain does.",
              ],
            }),
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
            quiz({
              id: "q4",
              q: [
                "Örnekteki CASE ifadesinden `ELSE 'giriş'` satırını kaldırırsan, hiçbir koşula uymayan bir satırın `fiyat_segmenti` değeri ne olur?",
                "If you remove the `ELSE 'giriş'` line from the example CASE, what does `fiyat_segmenti` become for a row matching no condition?",
              ],
              options: [
                ["NULL", "NULL"],
                ["'giriş'", "'giriş'"],
                ["0", "0"],
                ["Boş metin ''", "An empty string ''"],
              ],
              answer: 0,
              explain: [
                "ELSE yoksa ve hiçbir WHEN eşleşmezse CASE NULL döner. ELSE, tam olarak bu durumdaki varsayılan değeri belirlemek için vardır.",
                "Without an ELSE, if no WHEN matches, CASE returns NULL. ELSE exists precisely to set the default value for that situation.",
              ],
            }),
            pitfall(
              "Koşul sırası sonucu değiştirir",
              "Condition order changes the answer",
              "Yukarıdaki örnekte `WHEN price >= 1500` satırını en üste alsaydın, 7990 TL'lik robot süpürge de \"orta\" olurdu — çünkü `1500` koşulu ilk tutar ve `CASE` orada durur. Basamaklı eşiklerde daima **en yüksekten en düşüğe** yaz.",
              "In the example above, if you moved `WHEN price >= 1500` to the top, the 7990 robot vacuum would also be labelled \"orta\" — because the `1500` condition matches first and `CASE` stops there. With laddered thresholds, always write **highest to lowest**.",
            ),
            quiz({
              id: "q5",
              q: [
                "Pitfall'daki örnekte `WHEN price >= 1500` satırını en üste taşırsan 7990 TL'lik ürüne ne etiketi verilir?",
                "In the pitfall's example, if you move `WHEN price >= 1500` to the top, what label does the 7990 product get?",
              ],
              options: [
                ["'orta' — çünkü CASE ilk tutan koşulda durur", "'orta' — because CASE stops at the first matching condition"],
                ["'premium', doğru sonuç değişmez", "'premium', the correct result doesn't change"],
                ["NULL", "NULL"],
                ["Hata verir", "It throws an error"],
              ],
              answer: 0,
              explain: [
                "7990, hem `>= 1500` hem `>= 5000` koşulunu sağlar, ama CASE ilk tutan koşulda durur. `1500` en üstteyse ürün yanlışlıkla 'orta' etiketini alır.",
                "7990 satisfies both `>= 1500` and `>= 5000`, but CASE stops at the first match. If `1500` is on top, the product wrongly gets the 'orta' label.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Basamaklı eşiklerle (5000, 1500 gibi) CASE yazarken doğru sıra nedir?",
                "When writing CASE with laddered thresholds (like 5000, 1500), what is the correct order?",
              ],
              options: [
                ["En yüksekten en düşüğe", "Highest to lowest"],
                ["En düşükten en yükseğe", "Lowest to highest"],
                ["Alfabetik", "Alphabetical"],
                ["Fark etmez", "It doesn't matter"],
              ],
              answer: 0,
              explain: [
                "İlk tutan koşul kazandığı için en dar (en yüksek eşikli) koşulu en üste yazmazsan, geniş bir koşul onu hiç fırsat vermeden yakalar.",
                "Since the first match wins, if you don't put the narrowest (highest-threshold) condition first, a broader condition catches the row before it ever gets a chance.",
              ],
            }),
            text(
              "`CASE`'in en güçlü kullanımı toplama fonksiyonlarının **içindedir**. Buna \"koşullu toplama\" denir ve tek geçişte birden çok metrik üretir:\n\n```sql\nSELECT\n  COUNT(*) AS toplam_siparis,\n  SUM(CASE WHEN status = 'teslim' THEN 1 ELSE 0 END) AS teslim,\n  SUM(CASE WHEN status = 'iptal'  THEN 1 ELSE 0 END) AS iptal\nFROM orders;\n```\n\nAynı işi üç ayrı sorgu yazıp birleştirerek de yapabilirdin — ama bu hem daha yavaş hem daha kırılgan olurdu.",
              "The most powerful use of `CASE` is **inside** aggregate functions. This is called conditional aggregation and produces several metrics in a single pass:\n\n```sql\nSELECT\n  COUNT(*) AS total_orders,\n  SUM(CASE WHEN status = 'teslim' THEN 1 ELSE 0 END) AS delivered,\n  SUM(CASE WHEN status = 'iptal'  THEN 1 ELSE 0 END) AS cancelled\nFROM orders;\n```\n\nYou could do the same with three separate queries stitched together — but that would be both slower and more fragile.",
            ),
            quiz({
              id: "q7",
              q: [
                "CASE'i bir toplama fonksiyonu (SUM, COUNT gibi) içine koymanın faydası nedir?",
                "What is the benefit of putting CASE inside an aggregate function like SUM or COUNT?",
              ],
              options: [
                [
                  "Tek geçişte birden çok koşullu metriği aynı anda üretebilirsin",
                  "You can produce several conditional metrics in a single pass",
                ],
                ["Sorguyu her zaman yavaşlatır", "It always slows the query down"],
                ["Yalnızca metin sütunlarında çalışır", "It only works on text columns"],
                ["GROUP BY kullanmayı engeller", "It prevents you from using GROUP BY"],
              ],
              answer: 0,
              explain: [
                "Koşullu toplama, ayrı ayrı sorgular yazıp birleştirmek yerine tek geçişte teslim, iptal gibi birden çok sayıyı üretmeni sağlar — hem hızlı hem sade.",
                "Conditional aggregation lets you produce several counts — delivered, cancelled, and so on — in a single pass instead of writing and stitching together separate queries. It's both faster and simpler.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`SUM(CASE WHEN status = 'teslim' THEN 1 ELSE 0 END)` yerine yanlışlıkla `ELSE NULL` yazsaydın sonuç ne olurdu?",
                "If you mistakenly wrote `ELSE NULL` instead of `ELSE 0` in `SUM(CASE WHEN status = 'teslim' THEN 1 ELSE 0 END)`, what would the result be?",
              ],
              options: [
                [
                  "Aynı kalırdı, çünkü SUM zaten NULL değerleri atlar",
                  "The same, because SUM already skips NULL values",
                ],
                ["Her zaman 0 olurdu", "It would always be 0"],
                ["Sorgu hata verirdi", "The query would error out"],
                ["Tüm satırlar sayılırdı", "Every row would get counted"],
              ],
              answer: 0,
              explain: [
                "SUM, toplarken NULL'ları yok sayar. ELSE 0 ile ELSE NULL arasındaki fark yalnızca eşleşmeyen satırların değeridir — toplama katkıları ikisinde de sıfırdır.",
                "SUM ignores NULLs while summing. The only difference between ELSE 0 and ELSE NULL is the value on non-matching rows — their contribution to the sum is zero either way.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "Toplam sipariş sayısına oranla iptal **oranını** hesaplamak istersen ek olarak ne yaparsın?",
                "If you wanted the cancellation **rate** as a share of total orders, what would you do in addition?",
              ],
              options: [
                ["İptal sayısını `COUNT(*)`'a bölersin", "Divide the cancelled count by `COUNT(*)`"],
                ["SUM yerine COUNT kullanırsın", "Use COUNT instead of SUM"],
                ["CASE ifadesini kaldırırsın", "Remove the CASE expression"],
                ["ELSE kısmını 1 yaparsın", "Set the ELSE part to 1"],
              ],
              answer: 0,
              explain: [
                "`SUM(CASE ...)` sana yalnızca sayıyı verir. Oranı bulmak için bu sayıyı toplam satır sayısına (`COUNT(*)`) bölmen gerekir.",
                "`SUM(CASE ...)` only gives you a count. To get a rate you must divide that count by the total row count (`COUNT(*)`).",
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
            quiz({
              id: "q2",
              q: ["JOIN'in temel işi nedir?", "What is the basic job of JOIN?"],
              options: [
                [
                  "Bir kimlik sütununu kullanarak iki tabloyu yeniden birleştirmek",
                  "To stitch two tables back together using an id column",
                ],
                ["Bir tabloyu ikiye bölmek", "To split one table into two"],
                ["Yeni bir sütun eklemek", "To add a new column"],
                ["Satırları silmek", "To delete rows"],
              ],
              answer: 0,
              explain: [
                "Veritabanları tekrarı önlemek için veriyi tablolara böler; JOIN, bu ayrımı bir kimlik (id) üzerinden geri birleştiren araçtır.",
                "Databases split data into tables to avoid repetition; JOIN is the tool that stitches that split back together via an id.",
              ],
            }),
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
            quiz({
              id: "q3",
              q: [
                "`FROM orders AS o JOIN customers AS c ON c.id = o.customer_id` sorgusunda `o` ve `c` neye yarar?",
                "In `FROM orders AS o JOIN customers AS c ON c.id = o.customer_id`, what are `o` and `c` for?",
              ],
              options: [
                [
                  "Tablolara kısa takma adlar vererek sorguyu okunur kılar",
                  "They give the tables short aliases, keeping the query readable",
                ],
                ["Yeni tablolar oluşturur", "They create new tables"],
                ["Sütunları yeniden adlandırır", "They rename columns"],
                ["Sıralama belirler", "They set the sort order"],
              ],
              answer: 0,
              explain: [
                "`o` ve `c`, tablo takma adlarıdır. Birden çok tablo birleştiğinde hangi sütunun hangi tabloya ait olduğunu `tablo.sütun` yerine kısa bir önekle göstermeni sağlar.",
                "`o` and `c` are table aliases. When several tables are joined, they let you show which column belongs to which table with a short prefix instead of the full table name.",
              ],
            }),
            text(
              "- **INNER JOIN** (kısaca `JOIN`): yalnızca iki tarafta da eşleşen satırlar gelir.\n- **LEFT JOIN**: soldaki tablonun tüm satırları gelir; sağda eşleşme yoksa sütunlar NULL olur.\n\nLEFT JOIN, \"hiç sipariş vermemiş müşteriler\" gibi *eksik olanı* aramak için vazgeçilmezdir.",
              "- **INNER JOIN** (just `JOIN`): only rows that match on both sides.\n- **LEFT JOIN**: every row from the left table; when there is no match on the right, those columns become NULL.\n\nLEFT JOIN is the tool for finding *what is missing*, like customers who never ordered.",
            ),
            quiz({
              id: "q4",
              q: [
                "INNER JOIN ile LEFT JOIN arasındaki temel fark nedir?",
                "What is the core difference between INNER JOIN and LEFT JOIN?",
              ],
              options: [
                [
                  "INNER yalnızca eşleşen satırları getirir, LEFT soldaki tüm satırları (eşleşme olmasa da) getirir",
                  "INNER returns only matching rows; LEFT returns every row from the left table even without a match",
                ],
                ["LEFT sadece daha hızlıdır, başka fark yoktur", "LEFT is just faster, no other difference"],
                ["INNER sağdaki tüm satırları getirir", "INNER returns every row from the right table"],
                ["İkisi her zaman aynı sonucu verir", "They always return the same result"],
              ],
              answer: 0,
              explain: [
                "INNER JOIN eşleşmeyen satırları tamamen atar; LEFT JOIN soldaki her satırı korur ve sağda karşılık yoksa o sütunları NULL yapar.",
                "INNER JOIN drops unmatched rows entirely; LEFT JOIN keeps every row from the left side and fills the right-side columns with NULL when there's no match.",
              ],
            }),
            code(
              "sql",
              `-- Hiç sipariş vermemiş müşteriler
SELECT c.name
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
WHERE o.id IS NULL;`,
            ),
            quiz({
              id: "q5",
              q: [
                "Hiç sipariş vermemiş müşterileri bulmak için LEFT JOIN'den sonra hangi koşul gerekir?",
                "To find customers who never ordered, which condition is needed after the LEFT JOIN?",
              ],
              options: [
                ["`WHERE o.id IS NULL`", "`WHERE o.id IS NULL`"],
                ["`WHERE o.id IS NOT NULL`", "`WHERE o.id IS NOT NULL`"],
                ["`WHERE o.id = 0`", "`WHERE o.id = 0`"],
                ["`GROUP BY o.id`", "`GROUP BY o.id`"],
              ],
              answer: 0,
              explain: [
                "Eşleşmesi olmayan müşterilerde sağ tablonun sütunları (o.id dahil) NULL olur. Bu satırları yakalamak `IS NULL` gerektirir.",
                "For customers with no match, the right table's columns (including o.id) come back NULL. Catching those rows requires `IS NULL`.",
              ],
            }),
            trySql(
              `-- LEFT JOIN'i JOIN yap ve çalıştır: kaç satır kayboldu?
-- Sonra WHERE satırını silip tüm birleşimi gör.
SELECT c.name AS musteri, o.id AS siparis_no
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
              id: "q6",
              q: [
                "`LEFT JOIN orders o ON ... WHERE o.status = 'teslim'` yazmak LEFT JOIN'i neden anlamsızlaştırır, nasıl düzeltilir?",
                "Why does `LEFT JOIN orders o ON ... WHERE o.status = 'teslim'` make the LEFT JOIN pointless, and how do you fix it?",
              ],
              options: [
                [
                  "Sağ tabloyla ilgili koşulu WHERE yerine ON kısmına taşırsın",
                  "Move the condition on the right table from WHERE into the ON clause",
                ],
                ["WHERE'i tamamen kaldırırsın", "Remove the WHERE clause entirely"],
                ["LEFT JOIN'i INNER JOIN'e çevirirsin", "Convert the LEFT JOIN into an INNER JOIN"],
                ["status sütununu tablodan silersin", "Delete the status column from the table"],
              ],
              answer: 0,
              explain: [
                "Koşulu ON'a taşımak, filtrelemeyi birleştirme sırasında yapar; eşleşmeyen sol satırlar hâlâ NULL sağ sütunlarla görünür. WHERE'de bırakmak ise onları tamamen eler.",
                "Moving the condition into ON applies the filter during the join itself; unmatched left rows still show up with NULL right-side columns. Leaving it in WHERE drops them entirely.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Eşleşmeyen satırlarda `o.status` neden NULL olur ve bu WHERE koşulunu nasıl etkiler?",
                "Why is `o.status` NULL on unmatched rows, and how does that affect the WHERE condition?",
              ],
              options: [
                [
                  "LEFT JOIN eşleşme bulamayınca sağ tablonun sütunlarını NULL yapar; `status = 'teslim'` NULL'a asla eşit olamayacağı için o satır elenir",
                  "LEFT JOIN sets the right table's columns to NULL when there's no match; `status = 'teslim'` can never equal NULL, so that row gets dropped",
                ],
                ["NULL olmaz, LEFT JOIN her zaman bir değer üretir", "It never becomes NULL, LEFT JOIN always produces a value"],
                ["WHERE, NULL satırları otomatik olarak tutar", "WHERE automatically keeps NULL rows"],
                ["status sütunu LEFT JOIN'de hiç kullanılamaz", "The status column can't be used at all with LEFT JOIN"],
              ],
              answer: 0,
              explain: [
                "Bu, tam olarak pitfall'ın açıkladığı zincirdir: NULL, hiçbir değere eşit değildir, bu yüzden WHERE'deki eşitlik koşulu o satırı da eler ve LEFT JOIN'in amacı boşa çıkar.",
                "This is exactly the chain the pitfall describes: NULL equals nothing, so the equality condition in WHERE drops that row too, defeating the purpose of the LEFT JOIN.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: [
                "Aynı 15 müşteri / 12 siparişli örnekte `customers LEFT JOIN orders` kaç farklı müşteri döndürür?",
                "In the same 15 customer / 12 orders example, how many distinct customers does `customers LEFT JOIN orders` return?",
              ],
              options: [
                ["15 — LEFT JOIN soldaki tüm satırları korur", "15 — LEFT JOIN keeps every row from the left table"],
                ["12", "12"],
                ["3", "3"],
                ["0", "0"],
              ],
              answer: 0,
              explain: [
                "LEFT JOIN'de customers soldadır, bu yüzden siparişi olsun olmasın tüm 15 müşteri sonuçta yer alır; siparişi olmayan 3'ünün sipariş sütunları NULL olur.",
                "In the LEFT JOIN, customers is on the left, so all 15 customers appear in the result whether they have orders or not; the 3 without orders simply get NULL order columns.",
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
            quiz({
              id: "q1",
              q: ["Bir alt sorgu nerelerde kullanılabilir?", "Where can a subquery be used?"],
              options: [
                [
                  "WHERE içinde filtre, FROM içinde geçici tablo, SELECT içinde satır başına hesap olarak",
                  "As a filter inside WHERE, a temporary table inside FROM, or a per-row computation inside SELECT",
                ],
                ["Sadece WHERE içinde", "Only inside WHERE"],
                ["Sadece CREATE TABLE ile birlikte", "Only together with CREATE TABLE"],
                ["Yalnızca ORDER BY içinde", "Only inside ORDER BY"],
              ],
              answer: 0,
              explain: [
                "Alt sorgu üç farklı rolde görev alabilir: bir koşulu sınamak (WHERE), geçici bir tablo üretmek (FROM), ya da satır başına bir değer hesaplamak (SELECT).",
                "A subquery can play three different roles: testing a condition (WHERE), producing a temporary table (FROM), or computing a per-row value (SELECT).",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "`WHERE price > (SELECT AVG(price) FROM products)` ifadesi ne yapar?",
                "What does `WHERE price > (SELECT AVG(price) FROM products)` do?",
              ],
              options: [
                ["Ortalama fiyatın üzerindeki ürünleri getirir", "Returns products priced above the average"],
                [
                  "Ortalama fiyatı hesaplar ve sonuca yeni bir sütun olarak ekler",
                  "Computes the average and adds it as a new column to the result",
                ],
                ["Tüm ürünleri fiyata göre sıralar", "Sorts all products by price"],
                ["Yalnızca en pahalı ürünü getirir", "Returns only the single most expensive product"],
              ],
              answer: 0,
              explain: [
                "Parantez içindeki alt sorgu önce tek bir sayı (ortalama fiyat) üretir; dış sorgu bu sayıyı bir eşik olarak kullanıp WHERE ile satırları filtreler.",
                "The subquery in parentheses first produces a single number (the average price); the outer query uses that number as a threshold to filter rows with WHERE.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`WHERE customer_id IN (SELECT id FROM customers WHERE segment = 'kurumsal')` ne getirir?",
                "What does `WHERE customer_id IN (SELECT id FROM customers WHERE segment = 'kurumsal')` return?",
              ],
              options: [
                ["Kurumsal müşterilere ait siparişleri", "Orders belonging to corporate customers"],
                ["Sadece kurumsal müşterilerin adlarını", "Only the names of corporate customers"],
                ["Bireysel müşterilerin siparişlerini", "Orders of individual customers"],
                ["Tüm siparişleri", "All orders"],
              ],
              answer: 0,
              explain: [
                "Alt sorgu önce kurumsal müşterilerin kimliklerinin listesini üretir; dış sorgu `orders` tablosunda bu listedeki bir kimliğe sahip satırları filtreler.",
                "The subquery first produces a list of corporate customer ids; the outer query filters `orders` for rows whose customer_id is in that list.",
              ],
            }),
            text(
              "İç içe alt sorgular hızla okunmaz hale gelir. **CTE** (Common Table Expression, `WITH`) aynı işi yapar ama yukarıdan aşağı okunur ve adlandırılabilir — gerçek işlerde tercih edilen yol budur.",
              "Nested subqueries get unreadable fast. A **CTE** (Common Table Expression, `WITH`) does the same job but reads top-to-bottom and can be named — this is what people reach for in real work.",
            ),
            quiz({
              id: "q4",
              q: [
                "CTE (WITH), iç içe alt sorgulara göre ne kazandırır?",
                "What does a CTE (WITH) gain you over nested subqueries?",
              ],
              options: [
                [
                  "Aynı işi yapar ama yukarıdan aşağı okunur ve adlandırılabilir",
                  "It does the same job but reads top-to-bottom and can be named",
                ],
                ["Her zaman daha hızlı çalışır", "It always runs faster"],
                ["JOIN kullanmayı gereksiz kılar", "It removes the need for JOIN"],
                ["Sonucu otomatik sıralar", "It automatically sorts the result"],
              ],
              answer: 0,
              explain: [
                "CTE bir okunabilirlik aracıdır: aynı sonucu üretir ama iç içe parantezler yerine, adlandırılmış adımlar halinde yukarıdan aşağı okunur.",
                "A CTE is a readability tool: it produces the same result, but instead of nested parentheses it reads top-to-bottom as named steps.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "`WITH siparis_tutari AS (...) SELECT ...` yapısında `siparis_tutari` neyi ifade eder?",
                "In `WITH siparis_tutari AS (...) SELECT ...`, what does `siparis_tutari` represent?",
              ],
              options: [
                [
                  "CTE'ye verilen ad; ardından normal bir tablo gibi kullanılır",
                  "The name given to the CTE; it is then used like an ordinary table",
                ],
                ["Bir sütun adı", "A column name"],
                ["Bir veritabanı adı", "A database name"],
                ["Bir fonksiyon çağrısı", "A function call"],
              ],
              answer: 0,
              explain: [
                "WITH ile tanımlanan ad, o alt sorgunun sonucuna verilen isimdir. Dış SELECT bu ismi sanki gerçek bir tabloymuş gibi FROM'da kullanır.",
                "The name defined after WITH is the label given to that subquery's result. The outer SELECT then uses that name in FROM as if it were a real table.",
              ],
            }),
            tip(
              "CTE'yi adım adım yaz",
              "Build the CTE step by step",
              "Önce sadece `WITH` bloğundaki sorguyu çalıştırıp sonucuna bak. Doğruysa üstüne bir katman ekle. Karmaşık sorguları böyle yazmak hata ayıklamayı dakikalardan saniyelere indirir.",
              "Run just the query inside `WITH` first and look at its output. If it is right, add the next layer. Writing complex SQL this way cuts debugging from minutes to seconds.",
            ),
            quiz({
              id: "q6",
              q: [
                "CTE'yi adım adım yazma tavsiyesinin amacı nedir?",
                "What is the point of the advice to build a CTE step by step?",
              ],
              options: [
                [
                  "Her adımın çıktısını ayrı ayrı görüp hatayı erken yakalamak",
                  "To see each step's output separately and catch mistakes early",
                ],
                ["Sorguyu daha kısa yazmak", "To write a shorter query"],
                ["CTE'yi gizli tutmak", "To keep the CTE hidden"],
                ["Daha fazla XP kazanmak", "To earn more XP"],
              ],
              answer: 0,
              explain: [
                "Önce yalnızca WITH bloğunu çalıştırıp sonucuna bakmak, hatanın hangi katmanda olduğunu dakikalar yerine saniyelerde bulmanı sağlar.",
                "Running just the WITH block first and checking its output lets you find which layer the mistake is in within seconds instead of minutes.",
              ],
            }),
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
            quiz({
              id: "q7",
              q: [
                "Sipariş tutarı CTE'sinde `GROUP BY order_id` olmadan `SUM(quantity * unit_price)` yazsaydın ne olurdu?",
                "If you wrote `SUM(quantity * unit_price)` without `GROUP BY order_id` in the order-total CTE, what would happen?",
              ],
              options: [
                [
                  "Tüm siparişlerin toplamı tek bir satırda birleşirdi, sipariş başına ayrı tutar elde edemezdin",
                  "Every order's total would collapse into a single row; you couldn't get a per-order amount",
                ],
                ["Hiçbir fark olmazdı", "There'd be no difference"],
                ["Sorgu hata verirdi", "The query would error out"],
                ["Her satırda sıfır dönerdi", "Every row would return zero"],
              ],
              answer: 0,
              explain: [
                "GROUP BY olmadan SUM tüm order_items satırlarını tek bir grup sayar. Sipariş başına ayrı bir tutar için gruplama order_id'ye göre yapılmalıdır.",
                "Without GROUP BY, SUM treats every row in order_items as one single group. To get a separate amount per order, the grouping must be by order_id.",
              ],
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
            quiz({
              id: "q8",
              q: [
                "\"Hiç sipariş vermemiş müşteriler\" sorusunu LEFT JOIN dışında hangi yöntemle de cevaplayabilirsin?",
                "Besides a LEFT JOIN, what other way can answer \"customers who never ordered\"?",
              ],
              options: [
                ["`WHERE id NOT IN (SELECT customer_id FROM orders)`", "`WHERE id NOT IN (SELECT customer_id FROM orders)`"],
                ["`WHERE id IN (SELECT customer_id FROM orders)`", "`WHERE id IN (SELECT customer_id FROM orders)`"],
                ["`GROUP BY customer_id`", "`GROUP BY customer_id`"],
                ["`ORDER BY customer_id`", "`ORDER BY customer_id`"],
              ],
              answer: 0,
              explain: [
                "`NOT IN`, bir alt sorgudaki listede olmayan satırları getirir — LEFT JOIN + IS NULL ile aynı soruyu farklı bir yoldan sorar.",
                "`NOT IN` returns rows absent from a subquery's list — it asks the same question as LEFT JOIN + IS NULL, just through a different path.",
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
            quiz({
              id: "q2",
              q: ["`strftime('%Y-%m', order_date)` ifadesi ne işe yarar?", "What does `strftime('%Y-%m', order_date)` do?"],
              options: [
                [
                  "Tarihi yıl-ay granülerliğine indirger, aylık gruplamayı mümkün kılar",
                  "It truncates the date to year-month granularity, enabling monthly grouping",
                ],
                ["Tarihi tamamen siler", "It deletes the date entirely"],
                ["Yalnızca günü döndürür", "It returns only the day"],
                ["Tarihi bir tam sayıya çevirir", "It converts the date to an integer"],
              ],
              answer: 0,
              explain: [
                "strftime, bir tarihi istediğin formata dönüştürür. '%Y-%m' kalıbı yıl ve ayı bırakıp günü atar, böylece GROUP BY ile aylık özet alınabilir.",
                "strftime reformats a date however you specify. The '%Y-%m' pattern keeps year and month and drops the day, so GROUP BY can produce a monthly summary.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "PostgreSQL'de `strftime`'ın karşılığı olarak hangisi kullanılır?",
                "What is used in PostgreSQL as the equivalent of `strftime`?",
              ],
              options: [
                ["DATE_TRUNC", "DATE_TRUNC"],
                ["FORMAT_DATE", "FORMAT_DATE"],
                ["TRUNCATE_DATE", "TRUNCATE_DATE"],
                ["CAST_DATE", "CAST_DATE"],
              ],
              answer: 0,
              explain: [
                "Aynı iş — tarihi bir granülerliğe indirgemek — her motorda farklı bir isimle var: SQLite'ta strftime, PostgreSQL'de DATE_TRUNC, BigQuery'de FORMAT_DATE.",
                "The same job — truncating a date to a granularity — exists under a different name in each engine: strftime in SQLite, DATE_TRUNC in PostgreSQL, FORMAT_DATE in BigQuery.",
              ],
            }),
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
            quiz({
              id: "q4",
              q: [
                "Aylık sipariş sayısı sorgusunda `GROUP BY ay` neden gereklidir?",
                "Why is `GROUP BY ay` needed in the monthly order-count query?",
              ],
              options: [
                [
                  "COUNT(*) her ay için ayrı hesaplanmalı, yoksa tüm tablo tek grupta toplanır",
                  "COUNT(*) must be computed separately per month, otherwise the whole table collapses into one group",
                ],
                ["strftime onsuz çalışmaz", "strftime doesn't work without it"],
                ["Sıralama için zorunludur", "It's required for sorting"],
                ["Sadece performans içindir", "It's only for performance"],
              ],
              answer: 0,
              explain: [
                "strftime her satır için bir ay etiketi üretir; bu etiketlere göre gruplamak (GROUP BY) olmadan COUNT(*) tüm tabloyu tek bir sayıya indirger, ay ay kırılım kaybolur.",
                "strftime produces a month label per row; without grouping (GROUP BY) by that label, COUNT(*) collapses the whole table into one number, losing the month-by-month breakdown.",
              ],
            }),
            text(
              "`CASE WHEN`, SQL'in \"eğer\"idir. Sayısal bir sütunu iş diline çevirmek (segment, kova, bayrak) için en çok kullanılan araçtır.",
              "`CASE WHEN` is SQL's \"if\". It is the most common way to translate a numeric column into business language (segments, buckets, flags).",
            ),
            quiz({
              id: "q5",
              q: ["Bu derste CASE WHEN'in tipik kullanımı nedir?", "What is CASE WHEN's typical use in this lesson?"],
              options: [
                [
                  "Sayısal bir sütunu segment/kova/bayrak gibi iş diline çevirmek",
                  "Translating a numeric column into business language like segments, buckets, or flags",
                ],
                ["Bir tabloyu tamamen silmek", "Deleting a table entirely"],
                ["İki tabloyu birleştirmek", "Joining two tables"],
                ["Bir sütunun tipini kalıcı olarak değiştirmek", "Permanently changing a column's type"],
              ],
              answer: 0,
              explain: [
                "CASE WHEN, ham bir sayıyı (fiyat gibi) okunur bir etikete (ekonomik/orta/premium gibi) çevirmenin standart yoludur.",
                "CASE WHEN is the standard way to turn a raw number (like price) into a readable label (like ekonomik/orta/premium).",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "Örnekteki CASE'de `price < 500` en üstte, `ELSE 'premium'` en altta. Bu sıra neden mantıklıdır?",
                "In the example CASE, `price < 500` is on top and `ELSE 'premium'` at the bottom. Why does this order make sense?",
              ],
              options: [
                [
                  "Koşullar en düşükten en yükseğe kontrol edilir; her satır ilk uyan eşiği alır",
                  "Conditions are checked lowest to highest; each row gets the first threshold it satisfies",
                ],
                ["Sıra rastgeledir, fark etmez", "The order is random, it doesn't matter"],
                ["Fiyatlar önce ayrıca sıralanmalıdır", "Prices must be separately sorted first"],
                ["ELSE her zaman en üstte olmalıdır", "ELSE must always be on top"],
              ],
              answer: 0,
              explain: [
                "Burada eşikler artan sırada test edilir (< 500, sonra < 3000), bu yüzden ilk tutan koşul zaten en dar aralığı temsil eder. Basamaklar tersten yazılsaydı (büyükten küçüğe) sıra da tersine dönerdi.",
                "Here the thresholds are tested in ascending order (< 500, then < 3000), so the first match already represents the narrowest range. If the ladder ran the other way, the order would need to flip too.",
              ],
            }),
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
              id: "q7",
              q: ["`SUBSTR(name, 1, 3)` ne yapar?", "What does `SUBSTR(name, 1, 3)` do?"],
              options: [
                ["name metninin ilk 3 karakterini alır", "Takes the first 3 characters of the name string"],
                ["name'i 3 eşit parçaya böler", "Splits name into 3 equal parts"],
                ["name'in son 3 karakterini alır", "Takes the last 3 characters of name"],
                ["name'i 3 kez tekrarlar", "Repeats name 3 times"],
              ],
              answer: 0,
              explain: [
                "`SUBSTR(metin, başlangıç, uzunluk)` verilen konumdan başlayarak belirtilen uzunlukta bir alt metin döndürür; burada 1. karakterden başlayıp 3 karakter alır.",
                "`SUBSTR(text, start, length)` returns a substring of the given length starting at the given position; here it starts at character 1 and takes 3 characters.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: ["Örnekteki `UPPER(name)` sütunu ne üretir?", "What does the example's `UPPER(name)` column produce?"],
              options: [
                ["name değerini tamamen büyük harfe çevirir", "It converts the name value entirely to uppercase"],
                ["name değerini küçük harfe çevirir", "It converts the name value to lowercase"],
                ["name içindeki boşlukları siler", "It removes spaces inside name"],
                ["name'in ilk harfini büyütür, gerisini değiştirmez", "It capitalizes only the first letter, leaving the rest unchanged"],
              ],
              answer: 0,
              explain: [
                "`UPPER` bir metin fonksiyonudur ve girdideki tüm harfleri büyük harfe çevirir; sayı ve semboller değişmeden kalır.",
                "`UPPER` is a text function that converts every letter in the input to uppercase; numbers and symbols are left unchanged.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`TRIM('  bosluklu  ')` çağrısı neyi temizler?",
                "What does the call `TRIM('  bosluklu  ')` clean up?",
              ],
              options: [
                [
                  "Yalnızca metnin başındaki ve sonundaki boşlukları",
                  "Only the whitespace at the start and end of the text",
                ],
                ["Metin içindeki tüm boşlukları", "All whitespace anywhere in the text"],
                ["Metnin tamamını siler", "It deletes the entire text"],
                ["Sayısal karakterleri", "Numeric characters"],
              ],
              answer: 0,
              explain: [
                "`TRIM`, bir metnin yalnızca başındaki ve sonundaki boşluk karakterlerini kırpar; metnin ortasındaki boşluklara dokunmaz.",
                "`TRIM` strips whitespace only from the start and end of a string; whitespace in the middle of the text is left alone.",
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
            quiz({
              id: "q2",
              q: [
                "Bir CTE `WITH` ile tanımlandıktan sonra sorgunun geri kalanında nasıl kullanılır?",
                "Once a CTE is defined with `WITH`, how is it used in the rest of the query?",
              ],
              options: [
                [
                  "Sanki normal bir tabloymuş gibi FROM/JOIN içinde adıyla referans verilir",
                  "It is referenced by name in FROM/JOIN as if it were an ordinary table",
                ],
                ["Yalnızca WHERE koşulunda kullanılabilir", "It can only be used inside a WHERE condition"],
                ["Her sorguda yeniden tanımlanması gerekir", "It must be redefined in every query"],
                ["Doğrudan bir değişken gibi toplanır", "It is aggregated directly like a variable"],
              ],
              answer: 0,
              explain: [
                "CTE, tanımlandıktan sonra geri kalan sorguda adıyla anılan geçici bir tablo gibi davranır — FROM veya JOIN'de kullanılabilir.",
                "After being defined, a CTE behaves like a temporary table referred to by name in the rest of the query — usable in FROM or JOIN.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Örnekteki alt sorgulu ve CTE'li yazımlar hangi koşulu ortak filtreler?",
                "What condition do the subquery and CTE versions in the example both filter on?",
              ],
              options: [
                ["Şehir ortalaması 3000'den büyük olanlar", "Cities whose average is greater than 3000"],
                ["Şehir ortalaması 3000'den küçük olanlar", "Cities whose average is less than 3000"],
                ["Yalnızca İstanbul şehri", "Only the city of İstanbul"],
                ["Sipariş sayısı 3000'den fazla olanlar", "Cities with more than 3000 orders"],
              ],
              answer: 0,
              explain: [
                "İki yazım da `WHERE ortalama > 3000` koşuluyla aynı satırları döndürür; fark yalnızca okunabilirliktedir, sonuç aynıdır.",
                "Both versions return the same rows via `WHERE ortalama > 3000`; the only difference is readability, the result is identical.",
              ],
            }),
            tip(
              "CTE'yi hata ayıklarken kullan",
              "Use CTEs while debugging",
              "CTE'nin en sevilen yanı test edilebilirliğidir. Sorgu yanlış sonuç veriyorsa, en alttaki `SELECT`'i geçici olarak `SELECT * FROM adim_bir` yapıp o adımın çıktısını gözünle görebilirsin. İç içe alt sorgularda bunu yapmak için sorguyu parçalamak gerekir; CTE'de tek satır değiştirmen yeter.",
              "The best-loved property of a CTE is testability. If a query returns the wrong numbers, temporarily change the final `SELECT` to `SELECT * FROM step_one` and look at that step's output with your own eyes. With nested subqueries you would have to take the query apart; with a CTE you change one line.",
            ),
            quiz({
              id: "q4",
              q: [
                "Tip'e göre, CTE'li bir sorgu yanlış sonuç verdiğinde hata ayıklamak için ne yapılır?",
                "According to the tip, how do you debug a CTE query that returns the wrong result?",
              ],
              options: [
                [
                  "En alttaki SELECT'i geçici olarak `SELECT * FROM adim_bir` yaparak o adımın çıktısını incelemek",
                  "Temporarily change the final SELECT to `SELECT * FROM step_one` to inspect that step's output",
                ],
                ["Sorguyu tamamen silip yeniden yazmak", "Delete the whole query and rewrite it from scratch"],
                ["CTE'yi bir tetikleyiciye çevirmek", "Convert the CTE into a trigger"],
                ["Tüm WHERE koşullarını kaldırmak", "Remove every WHERE condition"],
              ],
              answer: 0,
              explain: [
                "Son SELECT'i geçici olarak bir ara adımı seçecek şekilde değiştirmek, o adımın çıktısını gözle görmeyi sağlar — tek satırlık bir değişiklikle.",
                "Temporarily pointing the final SELECT at an intermediate step lets you see that step's output with your own eyes — a one-line change.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Aynı hata ayıklama tekniğini iç içe alt sorgularda uygulamak neden daha zordur?",
                "Why is the same debugging technique harder to apply to nested subqueries?",
              ],
              options: [
                [
                  "Ara adımı görmek için sorguyu parçalara ayırmak gerekir",
                  "You have to take the query apart to see an intermediate step",
                ],
                ["İç içe alt sorgular hiç çalıştırılamaz", "Nested subqueries cannot be executed at all"],
                ["Alt sorgularda SELECT yazmak yasaktır", "Writing SELECT inside a subquery is forbidden"],
                ["Alt sorgular yalnızca INSERT ile kullanılır", "Subqueries can only be used with INSERT"],
              ],
              answer: 0,
              explain: [
                "İç içe alt sorgularda bir ara adımı ayrıca görmek istediğinde sorguyu sökmen gerekir; CTE'de ise adımlar zaten isimlendirilmiş ve ayrıştırılmış durumdadır.",
                "With nested subqueries, seeing an intermediate step means taking the query apart; with a CTE the steps are already named and separated.",
              ],
            }),
            text(
              "Birden fazla CTE'yi virgülle zincirlersin ve sonraki adım öncekine başvurabilir:\n\n```sql\nWITH teslim_siparisler AS (\n  SELECT * FROM orders WHERE status = 'teslim'\n),\nsiparis_tutarlari AS (\n  SELECT o.id, o.customer_id,\n         SUM(oi.quantity * oi.unit_price) AS tutar\n  FROM teslim_siparisler o\n  JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY o.id, o.customer_id\n)\nSELECT customer_id, SUM(tutar) AS toplam\nFROM siparis_tutarlari\nGROUP BY customer_id;\n```\n\nHer adım tek bir iş yapar. Bu, uzun analitik sorgularda bakımı mümkün kılan tek yaklaşımdır.",
              "You chain multiple CTEs with commas, and a later step may reference an earlier one:\n\n```sql\nWITH delivered_orders AS (\n  SELECT * FROM orders WHERE status = 'teslim'\n),\norder_totals AS (\n  SELECT o.id, o.customer_id,\n         SUM(oi.quantity * oi.unit_price) AS amount\n  FROM delivered_orders o\n  JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY o.id, o.customer_id\n)\nSELECT customer_id, SUM(amount) AS total\nFROM order_totals\nGROUP BY customer_id;\n```\n\nEach step does one job. For long analytical queries this is the only approach that stays maintainable.",
            ),
            quiz({
              id: "q6",
              q: ["Birden fazla CTE zincirlenirken adımlar arasına ne konur?", "What separates the steps when chaining multiple CTEs?"],
              options: [
                ["Virgül", "A comma"],
                ["Noktalı virgül", "A semicolon"],
                ["UNION ALL", "UNION ALL"],
                ["Yeni bir WITH anahtar kelimesi", "A new WITH keyword"],
              ],
              answer: 0,
              explain: [
                "`WITH` bir kez yazılır; ardından gelen CTE'ler virgülle ayrılır — `WITH adim1 AS (...), adim2 AS (...)` şeklinde.",
                "`WITH` is written once; the CTEs that follow are separated by commas — `WITH step1 AS (...), step2 AS (...)`.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Örnekte `siparis_tutarlari` CTE'si, `teslim_siparisler` CTE'sine nasıl erişir?",
                "In the example, how does the `siparis_tutarlari` CTE access the `teslim_siparisler` CTE?",
              ],
              options: [
                [
                  "FROM teslim_siparisler yazarak, sanki normal bir tabloymuş gibi",
                  "By writing FROM teslim_siparisler, as if it were an ordinary table",
                ],
                ["Ayrı bir WITH bloğu açarak", "By opening a separate WITH block"],
                ["Bir tetikleyici ile", "Via a trigger"],
                ["teslim_siparisler'i yeniden tanımlayarak", "By redefining teslim_siparisler"],
              ],
              answer: 0,
              explain: [
                "Daha önce tanımlanmış bir CTE, sonraki adımlarda FROM veya JOIN içinde doğrudan adıyla kullanılabilir — tıpkı gerçek bir tablo gibi.",
                "A CTE defined earlier can be used by name directly in FROM or JOIN in later steps — just like a real table.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Zincirleme CTE örneğinde en sondaki SELECT ne hesaplar?",
                "What does the final SELECT compute in the chained-CTE example?",
              ],
              options: [
                [
                  "Müşteri başına, siparis_tutarlari adımındaki tutarların toplamını",
                  "The total of the amounts from the siparis_tutarlari step, per customer",
                ],
                ["Tüm siparişlerin ortalamasını", "The average of all orders"],
                ["Yalnızca teslim edilmemiş siparişleri", "Only orders that were not delivered"],
                ["Müşteri sayısını", "The count of customers"],
              ],
              answer: 0,
              explain: [
                "Son sorgu `siparis_tutarlari` CTE'sini `customer_id`'ye göre gruplayıp `SUM(tutar)` ile müşteri başına toplam harcamayı hesaplar.",
                "The final query groups the `siparis_tutarlari` CTE by `customer_id` and sums the amount to get total spend per customer.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Metne göre, her CTE adımının 'tek bir iş yapması' ilkesi neyi sağlar?",
                "According to the text, what does the principle of each CTE step 'doing one job' provide?",
              ],
              options: [
                [
                  "Uzun analitik sorguların bakımının mümkün kalmasını",
                  "That long analytical queries stay maintainable",
                ],
                ["Sorgunun daha az bellek kullanmasını", "That the query uses less memory"],
                ["İndekslerin otomatik oluşmasını", "That indexes are created automatically"],
                ["Sorgunun her zaman daha hızlı çalışmasını", "That the query always runs faster"],
              ],
              answer: 0,
              explain: [
                "Her adımın tek bir işi yapması, uzun bir sorguyu altı ay sonra bile anlaşılır ve değiştirilebilir tutan şeydir — performans değil bakım kolaylığı sağlar.",
                "Each step doing one job is what keeps a long query understandable and changeable even six months later — it buys maintainability, not speed.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "JOIN ile küme işlemleri (UNION/INTERSECT/EXCEPT) arasındaki temel fark nedir?",
                "What is the basic difference between JOIN and set operations (UNION/INTERSECT/EXCEPT)?",
              ],
              options: [
                [
                  "JOIN tabloları yan yana birleştirir, küme işlemleri alt alta yığar",
                  "JOIN combines tables side by side, set operations stack them on top of each other",
                ],
                ["İkisi de aynı şeyi yapar", "They both do the same thing"],
                ["JOIN yalnızca sayısal sütunlarda çalışır", "JOIN only works on numeric columns"],
                ["Küme işlemleri yalnızca tek tabloda çalışır", "Set operations only work on a single table"],
              ],
              answer: 0,
              explain: [
                "JOIN, satırları ortak bir anahtara göre genişleterek sütun ekler; küme işlemleri ise iki sorgunun satırlarını üst üste yığar, sütun sayısı değişmez.",
                "JOIN widens rows by matching a key and adds columns; set operations stack the rows of two queries on top of each other, the column count stays the same.",
              ],
            }),
            quiz({
              id: "q3",
              q: ["`UNION` ile `UNION ALL` arasındaki fark nedir?", "What is the difference between `UNION` and `UNION ALL`?"],
              options: [
                [
                  "UNION tekrarları atar, UNION ALL tekrarları korur ve daha hızlıdır",
                  "UNION removes duplicates, UNION ALL keeps duplicates and is faster",
                ],
                ["UNION daha hızlıdır", "UNION is faster"],
                ["UNION ALL yalnızca sayısal sütunlarda çalışır", "UNION ALL only works on numeric columns"],
                ["İkisi arasında fark yoktur", "There is no difference between the two"],
              ],
              answer: 0,
              explain: [
                "UNION, tekrarları elemek için sonucu sıralar veya karma tablosuna alır — bu bir maliyettir. UNION ALL bu adımı atlar, tüm satırları (tekrarlar dahil) doğrudan döndürür.",
                "UNION sorts or hashes the result to eliminate duplicates — that costs something. UNION ALL skips this step and returns every row, duplicates included, directly.",
              ],
            }),
            quiz({
              id: "q4",
              q: ["`INTERSECT` hangi satırları döndürür?", "Which rows does `INTERSECT` return?"],
              options: [
                ["Yalnızca her iki sorguda da bulunan satırları", "Only rows present in both queries"],
                ["Yalnızca birinci sorguda bulunan satırları", "Only rows present in the first query"],
                ["İki sorgunun tüm satırlarını, tekrarsız", "All rows from both queries, without duplicates"],
                ["Hiçbir sorguda bulunmayan satırları", "Rows present in neither query"],
              ],
              answer: 0,
              explain: [
                "`INTERSECT`, iki sonuç kümesinin kesişimini alır — yalnızca her iki sorguda da aynen bulunan satırlar kalır.",
                "`INTERSECT` computes the intersection of two result sets — only rows present, as-is, in both queries survive.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "İki sorguyu `UNION` ile birleştirmek için hangi koşul sağlanmalıdır?",
                "What condition must hold to combine two queries with `UNION`?",
              ],
              options: [
                [
                  "Sütun sayıları ve tipleri eşleşmeli",
                  "The column counts and types must match",
                ],
                ["Aynı tablodan gelmeliler", "They must come from the same table"],
                ["Sütun adları birebir aynı olmalı", "The column names must be exactly identical"],
                ["Her iki sorguda da GROUP BY olmalı", "Both queries must contain GROUP BY"],
              ],
              answer: 0,
              explain: [
                "Küme işlemlerinin tek kuralı sütun sayısının ve tiplerinin uyuşmasıdır. Sütun adları farklı olabilir; sonuçtaki adlar ilk sorgudan alınır.",
                "The one rule for set operations is that column counts and types must match. Column names can differ; the result takes its names from the first query.",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "Örnekteki `INTERSECT` sorgusu hangi müşterileri getirir?",
                "Which customers does the example's `INTERSECT` query return?",
              ],
              options: [
                [
                  "Hem İstanbul'da yaşayan hem de kurumsal segmentteki müşterileri",
                  "Customers who both live in İstanbul and are in the corporate segment",
                ],
                ["İstanbul'da yaşayan tüm müşterileri", "All customers who live in İstanbul"],
                ["Kurumsal segmentteki tüm müşterileri", "All customers in the corporate segment"],
                ["İstanbul'da yaşamayan müşterileri", "Customers who do not live in İstanbul"],
              ],
              answer: 0,
              explain: [
                "İki sorgu ayrı ayrı bir koşulu süzer; `INTERSECT` yalnızca ikisinde de görünen isimleri bırakır, yani her iki koşulu birden sağlayanları.",
                "Each query filters on a separate condition; `INTERSECT` keeps only names that appear in both, i.e. customers satisfying both conditions at once.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Örnekteki `UNION ALL` sorgusunda `'pahalı'` ve `'ucuz'` sütunları neyi işaretler?",
                "In the example's `UNION ALL` query, what do the `'pahalı'` and `'ucuz'` columns mark?",
              ],
              options: [
                [
                  "Satırın hangi sorgudan (fiyat grubundan) geldiğini",
                  "Which query (price group) that row came from",
                ],
                ["Ürünün stok durumunu", "The product's stock status"],
                ["Müşterinin segmentini", "The customer's segment"],
                ["Siparişin durumunu", "The order's status"],
              ],
              answer: 0,
              explain: [
                "İki ayrı sorgu sabit bir metin sütunu ekleyip `UNION ALL` ile birleştirilince, o sabit değer satırın hangi kaynaktan geldiğini etiketler — burada pahalı/ucuz ürün grubunu.",
                "When two separate queries each add a constant text column and are combined with `UNION ALL`, that constant labels which source the row came from — here, the expensive/cheap product group.",
              ],
            }),
            info(
              "UNION mu, UNION ALL mı?",
              "UNION or UNION ALL?",
              "`UNION`, tekrarları atmak için sonucun tamamını sıralamak veya karma tablosuna almak zorundadır — bu, büyük veride ciddi maliyettir. Tekrar olmayacağını biliyorsan (örneğin iki sorgu birbirini dışlayan tarih aralıklarını getiriyorsa) daima **`UNION ALL`** kullan. Deneyimli analistleri ayıran küçük alışkanlıklardan biridir.",
              "`UNION` has to sort or hash the entire result to remove duplicates — a serious cost on large data. When you know duplicates cannot occur (for example the two queries cover mutually exclusive date ranges), always use **`UNION ALL`**. It is one of the small habits that separates experienced analysts.",
            ),
            quiz({
              id: "q8",
              q: [
                "Bilgi kutusuna göre, iki sorgunun tekrar üretmeyeceğini bildiğinde ne yapmalısın?",
                "According to the info box, what should you do when you know two queries cannot produce duplicates?",
              ],
              options: [
                ["UNION ALL kullanmalısın, çünkü sıralama/karma maliyeti gereksizdir", "Use UNION ALL, because the sort/hash cost is unnecessary"],
                ["Her zaman UNION kullanmalısın", "Always use UNION"],
                ["INTERSECT kullanmalısın", "Use INTERSECT"],
                ["İki sorguyu ayrı çalıştırmalısın", "Run the two queries separately"],
              ],
              answer: 0,
              explain: [
                "Tekrar oluşmayacağını biliyorsan UNION'ın tekrar temizleme maliyetine gerek yoktur; UNION ALL aynı sonucu daha ucuza verir.",
                "If you know duplicates cannot occur, UNION's deduplication cost buys nothing; UNION ALL gives the same result more cheaply.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "EXCEPT ile bulunan sonuca hangi başka iki yöntemle de ulaşılabilir?",
                "Which two other techniques can reach the same result as an EXCEPT?",
              ],
              options: [
                [
                  "LEFT JOIN ... WHERE ... IS NULL veya NOT EXISTS",
                  "LEFT JOIN ... WHERE ... IS NULL, or NOT EXISTS",
                ],
                ["INNER JOIN veya INTERSECT", "INNER JOIN, or INTERSECT"],
                ["UNION ALL veya GROUP BY", "UNION ALL, or GROUP BY"],
                ["ORDER BY veya LIMIT", "ORDER BY, or LIMIT"],
              ],
              answer: 0,
              explain: [
                "'Birincide olup ikincide olmayanı bul' sorusu üç farklı yazımla sorulabilir: EXCEPT, bir eşleşme bulamadığında NULL bırakan LEFT JOIN, veya bir alt sorguda eşleşme aranmadığını doğrulayan NOT EXISTS.",
                "The question 'find what's in the first but not the second' can be phrased three ways: EXCEPT, a LEFT JOIN that leaves NULL when no match is found, or NOT EXISTS checking that no match exists in a subquery.",
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
            quiz({
              id: "q2",
              q: [
                "`GROUP BY` ile pencere fonksiyonu arasındaki temel fark nedir?",
                "What is the basic difference between `GROUP BY` and a window function?",
              ],
              options: [
                [
                  "GROUP BY satırları birleştirir, pencere fonksiyonu her satırı korur ve yanına bir hesap ekler",
                  "GROUP BY collapses rows, a window function keeps every row and adds a computed column beside it",
                ],
                ["İkisi de aynı sonucu üretir", "Both produce the same result"],
                ["Pencere fonksiyonu satırları siler", "A window function deletes rows"],
                ["GROUP BY yalnızca sayısal sütunlarla çalışır", "GROUP BY only works with numeric columns"],
              ],
              answer: 0,
              explain: [
                "GROUP BY, aynı gruptaki satırları tek bir satıra indirger. Pencere fonksiyonu ise satır sayısını değiştirmeden her satıra grup düzeyinde bir hesap ekler.",
                "GROUP BY reduces rows in the same group to a single row. A window function instead adds a group-level computation to every row without changing the row count.",
              ],
            }),
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
            quiz({
              id: "q3",
              q: [
                "`OVER (PARTITION BY category_id ORDER BY price DESC)` ifadesinde `PARTITION BY` ne işe yarar?",
                "In `OVER (PARTITION BY category_id ORDER BY price DESC)`, what does `PARTITION BY` do?",
              ],
              options: [
                [
                  "Pencere fonksiyonunun hangi grup içinde hesap yapacağını belirler",
                  "It defines which group the window function computes within",
                ],
                ["Satırları siler", "It deletes rows"],
                ["Sonucu sıralı bir tabloya kaydeder", "It saves the result into a sorted table"],
                ["ORDER BY'ın yerini alır", "It replaces ORDER BY"],
              ],
              answer: 0,
              explain: [
                "PARTITION BY, tabloyu category_id'ye göre görünmez gruplara ayırır; RANK gibi fonksiyonlar her grubun içinde sıfırdan başlayarak hesap yapar. ORDER BY ise o grup içindeki sırayı belirler.",
                "PARTITION BY invisibly splits the table into groups by category_id; functions like RANK restart their computation fresh within each group. ORDER BY then sets the order within that group.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`AVG(price) OVER (PARTITION BY category_id)` her ürün satırına ne ekler?",
                "What does `AVG(price) OVER (PARTITION BY category_id)` add to each product row?",
              ],
              options: [
                [
                  "O ürünün ait olduğu kategorinin ortalama fiyatını, satırı tek satıra indirmeden",
                  "The average price of the category that product belongs to, without collapsing the row",
                ],
                ["Tüm ürünlerin genel ortalamasını", "The overall average across all products"],
                ["Ürünün kendi fiyatını iki katına çıkarır", "It doubles the product's own price"],
                ["Kategori adını", "The category name"],
              ],
              answer: 0,
              explain: [
                "PARTITION BY category_id sayesinde AVG, yalnızca aynı kategorideki fiyatların ortalamasını alır ve bunu o kategorideki her satıra tekrar tekrar yazar — satır sayısı değişmez.",
                "Because of PARTITION BY category_id, AVG averages only the prices in the same category and writes that value onto every row in that category — the row count never changes.",
              ],
            }),
            text(
              "En çok kullanılan pencere fonksiyonları:\n\n- `ROW_NUMBER()` — 1, 2, 3… beraberlik yok\n- `RANK()` — beraberlikte aynı sıra, sonra atlar (1, 1, 3)\n- `DENSE_RANK()` — beraberlikte aynı sıra, atlamaz (1, 1, 2)\n- `LAG(x)` / `LEAD(x)` — önceki / sonraki satırın değeri\n- `SUM(x) OVER (ORDER BY ...)` — kümülatif toplam",
              "The window functions you will use most:\n\n- `ROW_NUMBER()` — 1, 2, 3… no ties\n- `RANK()` — ties share a rank, then skip (1, 1, 3)\n- `DENSE_RANK()` — ties share a rank, no skip (1, 1, 2)\n- `LAG(x)` / `LEAD(x)` — value from the previous / next row\n- `SUM(x) OVER (ORDER BY ...)` — running total",
            ),
            quiz({
              id: "q5",
              q: [
                "`ROW_NUMBER()` beraberlik (eşit değer) durumunda nasıl davranır?",
                "How does `ROW_NUMBER()` behave when there is a tie (equal values)?",
              ],
              options: [
                [
                  "Beraberlik olsa bile her satıra farklı, ardışık bir numara verir (1, 2, 3…)",
                  "It gives every row a different, consecutive number even when tied (1, 2, 3…)",
                ],
                ["Beraberlikteki satırlara aynı numarayı verir", "It gives tied rows the same number"],
                ["Beraberlikteki satırları siler", "It deletes tied rows"],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "ROW_NUMBER() beraberliği hiç tanımaz; PARTITION içindeki her satıra, sıradaki bir sonraki tam sayıyı verir. Bu, RANK() ve DENSE_RANK()'i ondan ayıran özelliktir.",
                "ROW_NUMBER() never acknowledges ties; it hands out the next integer in sequence to every row in the partition. This is exactly what distinguishes it from RANK() and DENSE_RANK().",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Fiyatları 100, 100, 90 olan üç ürün için `DENSE_RANK()` ne döndürür?",
                "For three products priced 100, 100, 90, what does `DENSE_RANK()` return?",
              ],
              options: [
                ["1, 1, 2", "1, 1, 2"],
                ["1, 1, 3", "1, 1, 3"],
                ["1, 2, 3", "1, 2, 3"],
                ["1, 2, 2", "1, 2, 2"],
              ],
              answer: 0,
              explain: [
                "DENSE_RANK() beraberlikte aynı sırayı verir ama RANK()'in aksine bir sonraki sırayı atlamaz; bu yüzden 1, 1, 2 döner.",
                "DENSE_RANK() gives ties the same rank but, unlike RANK(), does not skip the next rank; so it returns 1, 1, 2.",
              ],
            }),
            quiz({
              id: "q7",
              q: ["`LAG(x)` bir satıra ne getirir?", "What does `LAG(x)` bring to a row?"],
              options: [
                ["Sıralamada bir önceki satırın x değerini", "The x value from the previous row in the ordering"],
                ["Sıralamada bir sonraki satırın x değerini", "The x value from the next row in the ordering"],
                ["x'in genel ortalamasını", "The overall average of x"],
                ["x'in kümülatif toplamını", "The running total of x"],
              ],
              answer: 0,
              explain: [
                "LAG(x), ORDER BY sırasına göre bir önceki satırdaki x değerini getirir — ay ay büyüme gibi \"bir öncekiyle karşılaştır\" hesapları için kullanılır. Ters yönü LEAD(x) yapar.",
                "LAG(x) fetches the x value from the row immediately before it in the ORDER BY sequence — used for \"compare to the previous one\" calculations like month-over-month growth. LEAD(x) does the opposite direction.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`SUM(x) OVER (ORDER BY ...)` neyi hesaplar?",
                "What does `SUM(x) OVER (ORDER BY ...)` compute?",
              ],
              options: [
                [
                  "Sıraya göre kümülatif (running) toplamı",
                  "The running (cumulative) total in order",
                ],
                ["Tüm x değerlerinin sabit genel toplamını", "A fixed grand total of all x values"],
                ["x'in ortalamasını", "The average of x"],
                ["Yalnızca son satırın değerini", "Only the last row's value"],
              ],
              answer: 0,
              explain: [
                "ORDER BY ile birlikte SUM() OVER, her satıra o satıra kadarki tüm x değerlerinin toplamını yazar — yani kümülatif toplam. PARTITION BY olmadan bu tüm tablo üzerinden ilerler.",
                "Combined with ORDER BY, SUM() OVER writes the total of every x value up to and including that row — a running total. Without PARTITION BY it runs across the whole table.",
              ],
            }),
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
            quiz({
              id: "q1",
              q: [
                "Kohort analizi kullanıcıları neye göre gruplar?",
                "What does cohort analysis group users by?",
              ],
              options: [
                ["İlk temas ettikleri aya göre", "By the month of their first contact"],
                ["Şehirlerine göre", "By their city"],
                ["Son giriş tarihine göre", "By their last login date"],
                ["Toplam harcamalarına göre", "By their total spend"],
              ],
              answer: 0,
              explain: [
                "Kohort, aynı ayda ilk kez temas eden (örneğin ilk siparişini veren) kullanıcıların oluşturduğu gruptur. Bu grup zamanla ayrı ayrı izlenir.",
                "A cohort is the group of users who made first contact (e.g. placed their first order) in the same month. That group is then tracked separately over time.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Kohort analizi, tek bir \"aktif kullanıcı\" sayısının gizlediği neyi ortaya çıkarır?",
                "What does cohort analysis reveal that a single \"active users\" number hides?",
              ],
              options: [
                [
                  "Büyümenin yeni kullanıcı akışından mı yoksa eski kullanıcıların kalmasından mı geldiğini",
                  "Whether growth is coming from new signups or from old users sticking around",
                ],
                ["Sunucu maliyetlerini", "Server costs"],
                ["Veritabanı şemasını", "The database schema"],
                ["Ürün fiyatlarını", "Product prices"],
              ],
              answer: 0,
              explain: [
                "Tek bir aktif kullanıcı sayısı, o sayının nereden geldiğini söylemez. Kohort tablosu her grubu ayrı ayrı izleyerek büyümenin kaynağını (yeni giriş mi, tutunma mı) ayırt eder.",
                "A single active-users figure does not say where that number came from. A cohort table tracks each group separately, separating out whether growth is new acquisition or retention.",
              ],
            }),
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
            quiz({
              id: "q3",
              q: [
                "`ilk_siparis` CTE'si her müşteri için ne hesaplar?",
                "What does the `ilk_siparis` CTE compute for each customer?",
              ],
              options: [
                [
                  "İlk siparişini verdiği ay-yıl etiketini (MIN ile en erken tarih)",
                  "The month-year label of their first order (the earliest date, via MIN)",
                ],
                ["Toplam sipariş sayısını", "Their total order count"],
                ["En son sipariş tarihini", "Their most recent order date"],
                ["Ortalama sipariş tutarını", "Their average order amount"],
              ],
              answer: 0,
              explain: [
                "`MIN(strftime('%Y-%m', order_date))`, her müşteri için en erken sipariş ayını bulur — bu, o müşterinin kohortudur.",
                "`MIN(strftime('%Y-%m', order_date))` finds the earliest order month per customer — that value becomes their cohort.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`aktivite` CTE'si neden `orders` tablosunu `ilk_siparis` ile birleştirir?",
                "Why does the `aktivite` CTE join the `orders` table with `ilk_siparis`?",
              ],
              options: [
                [
                  "Her sipariş satırına, o müşterinin ait olduğu kohort etiketini eklemek için",
                  "To attach the customer's cohort label onto every order row",
                ],
                ["Siparişleri silmek için", "To delete orders"],
                ["Fiyatları toplamak için", "To sum up prices"],
                ["Müşteri adını değiştirmek için", "To rename the customer"],
              ],
              answer: 0,
              explain: [
                "Birleştirme olmadan her siparişin hangi kohorta ait olduğunu bilemezsin. JOIN, her siparişe (hangi ayda olursa olsun) müşterinin sabit kohort etiketini iliştirir.",
                "Without the join you would not know which cohort each order belongs to. The JOIN attaches the customer's fixed cohort label onto every order, regardless of which month it happened in.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Son sorguda `COUNT(DISTINCT customer_id)` yerine `COUNT(*)` kullansaydık ne yanlış giderdi?",
                "If the final query used `COUNT(*)` instead of `COUNT(DISTINCT customer_id)`, what would go wrong?",
              ],
              options: [
                [
                  "Aynı ayda birden fazla sipariş veren bir müşteri birden çok kez sayılırdı",
                  "A customer who placed several orders in the same month would be counted more than once",
                ],
                ["Sonuç boş dönerdi", "The result would come back empty"],
                ["Sorgu hata verirdi", "The query would raise an error"],
                ["Fark etmezdi, sonuç aynı olurdu", "It wouldn't matter, the result would be identical"],
              ],
              answer: 0,
              explain: [
                "`COUNT(*)` sipariş satırlarını sayar; bir müşteri o ay iki sipariş verdiyse iki kez sayılır. `COUNT(DISTINCT customer_id)` ise kaç farklı müşterinin aktif olduğunu sorar — kohort için doğru soru budur.",
                "`COUNT(*)` counts order rows; a customer who placed two orders that month gets counted twice. `COUNT(DISTINCT customer_id)` asks how many distinct customers were active — the right question for a cohort table.",
              ],
            }),
            text(
              "**Huni (funnel) analizi** ise bir akıştaki adımları sayar: sayfa görüntüleme → ürün görüntüleme → sepete ekleme → satın alma. En büyük düşüşün olduğu adım, ürün ekibinin bir sonraki işidir.",
              "**Funnel analysis** counts the steps of a flow: page view → product view → add to cart → purchase. The step with the biggest drop-off is the product team's next job.",
            ),
            quiz({
              id: "q6",
              q: [
                "Huni analizinde ürün ekibinin bir sonraki işi neyle belirlenir?",
                "What determines the product team's next task in a funnel analysis?",
              ],
              options: [
                ["En büyük düşüşün olduğu adımla", "The step with the biggest drop-off"],
                ["En çok ziyaret edilen adımla", "The most-visited step"],
                ["İlk adımla her zaman", "Always the first step"],
                ["Rastgele bir adımla", "A random step"],
              ],
              answer: 0,
              explain: [
                "Huni, her adımdaki kullanıcı sayısını gösterir. Bir adımdan sonrakine geçişte en fazla kullanıcının kaybolduğu yer, iyileştirmenin en çok kazandıracağı yerdir.",
                "A funnel shows the user count at each step. Wherever the drop from one step to the next is largest is where an improvement pays off the most.",
              ],
            }),
            info(
              "Huni sayarken oturum mu, kullanıcı mı?",
              "Funnels: sessions or users?",
              "Aynı kullanıcı bir adımı iki kez yapabilir. Bu yüzden huni adımlarında `COUNT(*)` değil `COUNT(DISTINCT user_id)` veya `COUNT(DISTINCT session_id)` sayılır. Hangisini seçtiğini rapora yazmak, sonradan çıkacak \"bu sayı neden farklı?\" tartışmasını önler.",
              "The same user can repeat a step. That is why funnel steps use `COUNT(DISTINCT user_id)` or `COUNT(DISTINCT session_id)`, never `COUNT(*)`. Writing down which one you chose prevents the inevitable \"why is this number different?\" argument later.",
            ),
            quiz({
              id: "q7",
              q: [
                "Huni adımlarını sayarken neden `COUNT(*)` yerine `COUNT(DISTINCT user_id)` kullanılır?",
                "Why do funnel steps use `COUNT(DISTINCT user_id)` instead of `COUNT(*)`?",
              ],
              options: [
                [
                  "Aynı kullanıcı bir adımı birden fazla kez yapabilir, bu tekrarların sayıyı şişirmesini önler",
                  "The same user can repeat a step, and this prevents those repeats from inflating the count",
                ],
                ["COUNT(*) hatalıdır ve hiç kullanılmamalıdır", "COUNT(*) is broken and should never be used"],
                ["DISTINCT sorguyu hızlandırır", "DISTINCT makes the query faster"],
                ["user_id her zaman NULL olabilir", "user_id can always be NULL"],
              ],
              answer: 0,
              explain: [
                "Bir kullanıcı aynı adımı (örneğin ürün görüntüleme) birden fazla kez yapabilir. COUNT(*) bunların hepsini sayar, oysa huni \"kaç farklı kişi bu adıma ulaştı\" sorusunu sorar.",
                "A user can perform the same step (like viewing a product) multiple times. COUNT(*) would count all of them, but a funnel asks \"how many distinct people reached this step\".",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bilgi kutusuna göre, oturum mu kullanıcı mı sayıldığını rapora yazmak neden önemlidir?",
                "According to the info box, why is it important to write down whether you counted sessions or users?",
              ],
              options: [
                [
                  "Sonradan çıkabilecek \"bu sayı neden farklı?\" tartışmasını önler",
                  "It prevents the inevitable \"why is this number different?\" argument later",
                ],
                ["Sorguyu daha hızlı çalıştırır", "It makes the query run faster"],
                ["Veritabanı boyutunu küçültür", "It shrinks the database size"],
                ["SQL sözdizimi için zorunludur", "It's required by SQL syntax"],
              ],
              answer: 0,
              explain: [
                "Aynı huni farklı raporlarda oturum ya da kullanıcı bazlı sayılırsa sayılar tutmaz. Hangi birimi seçtiğini belgelemek, o farkı sonradan açıklamak zorunda kalmanı önler.",
                "The same funnel counted by session in one report and by user in another will not match. Documenting which unit you chose saves you from having to explain the discrepancy later.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "`WHERE` veya `JOIN` sütununda indeks yoksa veritabanı ne yapmak zorunda kalır?",
                "Without an index on a `WHERE` or `JOIN` column, what must the database do?",
              ],
              options: [
                ["Tüm tabloyu satır satır taramak", "Scan the whole table row by row"],
                ["Sorguyu reddetmek", "Reject the query"],
                ["Otomatik olarak bir indeks oluşturmak", "Automatically create an index"],
                ["Sonucu önbelleğe almak", "Cache the result"],
              ],
              answer: 0,
              explain: [
                "İndeks yoksa veritabanının aradığı satırları bulmak için başka yolu yoktur; tüm tabloyu baştan sona tarar (full table scan). Bu, büyük tablolarda ciddi bir maliyettir.",
                "Without an index the database has no shortcut to find the matching rows; it scans the whole table from start to end (a full table scan). That is a serious cost on large tables.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`SELECT *` gereksiz yere yazmanın maliyeti nedir?",
                "What is the cost of writing a needless `SELECT *`?",
              ],
              options: [
                [
                  "İhtiyaç duyulmayan sütunlar da taşınır, veri hacmi büyür",
                  "Columns you don't need are moved too, inflating the amount of data transferred",
                ],
                ["Sorgu sonucu her zaman yanlış çıkar", "The query result is always wrong"],
                ["Tablo otomatik silinir", "The table gets automatically deleted"],
                ["İndeksler devre dışı kalır", "Indexes get disabled"],
              ],
              answer: 0,
              explain: [
                "`SELECT *`, ihtiyacın olmayan sütunları da diskten okuyup ağdan taşır. Yalnızca gereken sütunları seçmek taşınan veriyi küçültür.",
                "`SELECT *` reads and transports columns you do not need, from disk and over the network. Selecting only the required columns shrinks the data moved.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "\"Erken değil geç filtreleme\" hatasından kaçınmak için ne yapılmalı?",
                "How do you avoid the \"filtering late instead of early\" mistake?",
              ],
              options: [
                [
                  "Filtreyi mümkün olan en erken katmana koymak",
                  "Push the filter into the earliest layer possible",
                ],
                ["Filtreyi hiç kullanmamak", "Never use a filter at all"],
                ["Filtreyi yalnızca en dış sorguya koymak", "Only put the filter in the outermost query"],
                ["ORDER BY'dan sonra filtrelemek", "Filter only after ORDER BY"],
              ],
              answer: 0,
              explain: [
                "Bir filtre ne kadar erken uygulanırsa, sonraki adımlar (JOIN, gruplama) o kadar az satırla uğraşır. Filtreyi en dışa bırakmak, gereksiz yere büyük ara sonuçlar üretir.",
                "The earlier a filter is applied, the fewer rows later steps (JOINs, grouping) have to work with. Leaving it for the outermost layer produces needlessly large intermediate results.",
              ],
            }),
            code(
              "sql",
              `-- Sık filtrelenen sütuna indeks
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Sorgunun planını gör (SQLite)
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE customer_id = 5;`,
            ),
            quiz({
              id: "q5",
              q: [
                "`CREATE INDEX idx_orders_customer ON orders(customer_id);` ne yapar?",
                "What does `CREATE INDEX idx_orders_customer ON orders(customer_id);` do?",
              ],
              options: [
                [
                  "orders.customer_id üzerinde arama yapan sorguları hızlandıracak bir indeks oluşturur",
                  "It creates an index that speeds up queries searching on orders.customer_id",
                ],
                ["customer_id sütununu tablodan siler", "It removes the customer_id column from the table"],
                ["Tüm siparişleri müşteriye göre yeniden sıralar", "It physically re-sorts all orders by customer"],
                ["Yeni bir orders tablosu oluşturur", "It creates a brand-new orders table"],
              ],
              answer: 0,
              explain: [
                "CREATE INDEX, belirtilen sütun(lar) üzerinde bir arama yapısı kurar; bu sütunla filtreleyen veya birleştiren sorgular artık tüm tabloyu taramak yerine bu yapıyı kullanır.",
                "CREATE INDEX builds a lookup structure on the given column(s); queries filtering or joining on that column now use this structure instead of scanning the whole table.",
              ],
            }),
            quiz({
              id: "q6",
              q: ["`EXPLAIN QUERY PLAN` ne için kullanılır?", "What is `EXPLAIN QUERY PLAN` used for?"],
              options: [
                [
                  "Veritabanının sorguyu nasıl çalıştıracağını (indeks mi tarama mı kullanacağını) göstermek için",
                  "To show how the database will execute the query (whether it uses an index or a scan)",
                ],
                ["Sorguyu otomatik olarak düzeltmek için", "To automatically fix the query"],
                ["Sonucu bir dosyaya kaydetmek için", "To save the result to a file"],
                ["Tabloyu silmeden önce onay almak için", "To ask for confirmation before deleting a table"],
              ],
              answer: 0,
              explain: [
                "EXPLAIN QUERY PLAN, sorguyu çalıştırmadan veritabanının izleyeceği planı gösterir — hangi indeksin kullanılacağı ya da tam tablo taraması yapılıp yapılmayacağı gibi. Yavaş sorguları teşhis etmenin ilk adımıdır.",
                "EXPLAIN QUERY PLAN shows, without running the query, the plan the database will follow — which index it will use, or whether it will do a full table scan. It's the first step in diagnosing a slow query.",
              ],
            }),
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
            quiz({
              id: "q7",
              q: [
                "Tip'e göre, altı ay sonra o sorguyu muhtemelen kim okuyacak?",
                "According to the tip, who will probably read that query again in six months?",
              ],
              options: [
                ["Büyük ihtimalle sorguyu yazan kişinin kendisi", "Most likely the same person who wrote the query"],
                ["Yalnızca veritabanı yöneticisi", "Only the database administrator"],
                ["Hiç kimse, sorgular tekrar okunmaz", "No one, queries are never read again"],
                ["Yalnızca bir yapay zeka aracı", "Only an AI tool"],
              ],
              answer: 0,
              explain: [
                "Tip, o sorguyu ileride muhtemelen yine senin okuyacağını hatırlatır — bu yüzden bugünkü okunabilirlik yatırımı gelecekteki kendine yapılan bir yatırımdır.",
                "The tip's point is that you are probably the one who will read that query again later — so today's investment in readability is an investment in your future self.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Tip'e göre \"en hızlı sorgu\" hangisidir?",
                "According to the tip, which is the \"fastest query\"?",
              ],
              options: [
                [
                  "Yeniden yazmak zorunda kalmadığın sorgu",
                  "The one you never have to rewrite",
                ],
                ["En kısa sorgu", "The shortest query"],
                ["En çok indeks kullanan sorgu", "The one that uses the most indexes"],
                ["En az satır döndüren sorgu", "The one that returns the fewest rows"],
              ],
              answer: 0,
              explain: [
                "Tip'in vurgusu çalıştırma süresi değil, insan zamanıdır: okunaklı, CTE'lerle katmanlanmış, iyi adlandırılmış bir sorguyu tekrar tekrar sökmek zorunda kalmazsın — bu da en büyük zaman kazancıdır.",
                "The tip's point is about human time, not execution time: a readable query layered with CTEs and well-named aliases never has to be taken apart again and again — that is the biggest time saving.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Tip, okunabilirliği artırmak için hangi somut alışkanlıkları önerir?",
                "Which concrete habits does the tip recommend to improve readability?",
              ],
              options: [
                [
                  "CTE'lerle katmanlamak, anlamlı takma adlar seçmek, her CTE'nin üstüne yorum yazmak",
                  "Layering with CTEs, choosing meaningful aliases, commenting above each CTE",
                ],
                ["Tüm sütun adlarını tek harfe indirmek", "Shortening all column names to a single letter"],
                ["Yorumları tamamen kaldırmak", "Removing all comments entirely"],
                ["Sorguyu tek satırda yazmak", "Writing the whole query on one line"],
              ],
              answer: 0,
              explain: [
                "Bu üç alışkanlık — CTE katmanları, anlamlı takma adlar, açıklayıcı yorumlar — bir sorguyu ay sonra açan kişinin (genelde senin) onu hızla kavramasını sağlar.",
                "These three habits — CTE layering, meaningful aliases, explanatory comments — let whoever opens the query months later (usually you) grasp it quickly.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bu dersteki dört yaygın yavaşlık nedeninden biri DEĞİLDİR?",
                "Which of the following is NOT one of the four common slowness causes in this lesson?",
              ],
              options: [
                ["Sorguya bir yorum satırı eklemek", "Adding a comment line to the query"],
                ["WHERE/JOIN sütununda indeks eksikliği", "Missing index on a WHERE/JOIN column"],
                ["Sütuna fonksiyon uygulamak", "Wrapping the column in a function"],
                ["Gereksiz SELECT *", "A needless SELECT *"],
              ],
              answer: 0,
              explain: [
                "Yorum satırı eklemenin performansla bir ilgisi yoktur; hatta okunabilirliği artırdığı için önerilir. Dersin saydığı dört neden indeks eksikliği, fonksiyona sarma, gereksiz SELECT * ve geç filtrelemedir.",
                "Adding a comment has no effect on performance at all; it is in fact recommended for readability. The lesson's four causes are a missing index, wrapping in a function, a needless SELECT *, and filtering too late.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Dört klasik kontrolden \"satır sayısı\" kontrolü neyi tespit etmeye çalışır?",
                "What does the \"row count\" check among the four classic checks try to detect?",
              ],
              options: [
                [
                  "Birleştirme sonrası satır sayısının beklenmedik şekilde artmasını (çoğullama)",
                  "The row count unexpectedly growing after a join (fan-out)",
                ],
                ["Yazım hatalarını", "Spelling mistakes"],
                ["Sunucu yükünü", "Server load"],
                ["Sütun adlarının doğruluğunu", "Whether column names are correct"],
              ],
              answer: 0,
              explain: [
                "Bir JOIN'den sonra satır sayısı beklenenden fazla çıktıysa, bire-çok bir ilişki satırları çoğaltmış demektir — bu da toplama hesaplarını şişirebilir.",
                "If the row count after a JOIN is higher than expected, a one-to-many relationship has multiplied rows — which can inflate any aggregate computed afterwards.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "\"Benzersizlik\" kontrolü hangi soruyu sorar?",
                "What question does the \"uniqueness\" check ask?",
              ],
              options: [
                [
                  "Anahtar olması gereken sütun gerçekten her satırda farklı mı",
                  "Is the column that should be a key actually distinct on every row",
                ],
                ["Tablo ne kadar büyük", "How large is the table"],
                ["Kaç tane JOIN kullanılmış", "How many JOINs were used"],
                ["Sorgu ne kadar sürede çalıştı", "How long did the query take to run"],
              ],
              answer: 0,
              explain: [
                "Bir sütunun 'anahtar' olduğunu varsaymak yetmez; GROUP BY ... HAVING COUNT(*) > 1 gibi bir sorguyla gerçekten benzersiz olduğunu doğrulaman gerekir.",
                "Assuming a column is a 'key' is not enough; you verify it is actually unique with something like GROUP BY ... HAVING COUNT(*) > 1.",
              ],
            }),
            quiz({
              id: "q4",
              q: ["\"Boşluk\" (nullness) kontrolü neyi ölçer?", "What does the \"nullness\" check measure?"],
              options: [
                ["Kritik sütunlarda kaç NULL değer olduğunu", "How many NULL values sit in critical columns"],
                ["Tablonun toplam boyutunu", "The total size of the table"],
                ["Kaç farklı şehir olduğunu", "How many distinct cities there are"],
                ["Sorgunun ne kadar bellek kullandığını", "How much memory the query uses"],
              ],
              answer: 0,
              explain: [
                "Kritik bir sütunda beklenmedik miktarda NULL varsa, bu genelde bir toplama işlemi (ör. join) veya veri kaynağında bir sorun olduğunun işaretidir.",
                "An unexpected amount of NULLs in a critical column is usually a sign of a problem upstream — in a join or in the source data.",
              ],
            }),
            quiz({
              id: "q5",
              q: ["\"Aralık\" (range) kontrolü hangi tür hataları yakalar?", "What kind of errors does the \"range\" check catch?"],
              options: [
                [
                  "Negatif fiyat, gelecekteki tarih, %100'ü aşan oran gibi imkânsız değerleri",
                  "Impossible values like negative prices, future dates, or rates above 100%",
                ],
                ["Yazım hatalarını", "Spelling mistakes"],
                ["Eksik indeksleri", "Missing indexes"],
                ["Yavaş çalışan sorguları", "Slow-running queries"],
              ],
              answer: 0,
              explain: [
                "Aralık kontrolü, değerlerin mantıken mümkün olan sınırlar içinde kalıp kalmadığına bakar — negatif bir fiyat ya da gelecekte bir sipariş tarihi veri hatasının işaretidir.",
                "The range check looks at whether values stay within logically possible bounds — a negative price or a future order date signals a data error.",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "İlk sorgu (`GROUP BY id HAVING COUNT(*) > 1`) boş sonuç döndürürse ne anlama gelir?",
                "If the first query (`GROUP BY id HAVING COUNT(*) > 1`) returns an empty result, what does that mean?",
              ],
              options: [
                [
                  "id sütunu gerçekten benzersizdir, tekrar eden anahtar yoktur",
                  "The id column really is unique, there are no repeated keys",
                ],
                ["Tablo tamamen boştur", "The table is completely empty"],
                ["Tüm id'ler NULL'dır", "All ids are NULL"],
                ["Sorgu hatalıdır", "The query is broken"],
              ],
              answer: 0,
              explain: [
                "Bu sorgu, id'ye göre gruplayıp birden fazla satırı olan grupları arar. Sonuç boşsa hiçbir id tekrar etmiyor demektir — benzersizlik doğrulanmıştır.",
                "This query groups by id and looks for groups with more than one row. An empty result means no id repeats — uniqueness is confirmed.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`SUM(CASE WHEN city IS NULL THEN 1 ELSE 0 END)` ifadesi ne sayar?",
                "What does `SUM(CASE WHEN city IS NULL THEN 1 ELSE 0 END)` count?",
              ],
              options: [
                ["city sütunu boş (NULL) olan satır sayısını", "The number of rows where the city column is empty (NULL)"],
                ["Tüm satır sayısını", "The total row count"],
                ["Farklı şehir sayısını", "The number of distinct cities"],
                ["En kalabalık şehri", "The most populous city"],
              ],
              answer: 0,
              explain: [
                "CASE, city NULL olduğunda 1 üretir, değilse 0; SUM bunları toplayarak kaç satırda city'nin boş olduğunu sayar — nullness kontrolünün kendisi budur.",
                "The CASE emits 1 when city is NULL and 0 otherwise; SUM adds those up to count how many rows have an empty city — this is exactly the nullness check in action.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "\"Yetim kayıt\" sorgusundaki `LEFT JOIN ... WHERE c.id IS NULL` deseni neyi bulur?",
                "What does the \"orphan record\" query's `LEFT JOIN ... WHERE c.id IS NULL` pattern find?",
              ],
              options: [
                [
                  "customers tablosunda karşılığı olmayan siparişleri",
                  "Orders that have no matching row in the customers table",
                ],
                ["Tüm siparişleri", "All orders"],
                ["Siparişi olmayan müşterileri", "Customers with no orders"],
                ["İptal edilmiş siparişleri", "Cancelled orders"],
              ],
              answer: 0,
              explain: [
                "LEFT JOIN, eşleşme bulamadığında sağ tablonun sütunlarını NULL bırakır. WHERE c.id IS NULL bu satırları süzer — yani müşteri tablosunda karşılığı olmayan yetim siparişleri.",
                "A LEFT JOIN leaves the right table's columns NULL when it finds no match. WHERE c.id IS NULL filters exactly those rows — orphan orders with no matching customer.",
              ],
            }),
            pitfall(
              "JOIN sonrası çoğullama en sinsi hatadır",
              "Fan-out after a JOIN is the sneakiest bug",
              "`orders` tablosunu `order_items` ile birleştirirsen, iki kalemli bir sipariş **iki satır** olur. Bu noktada `SUM(o.toplam)` yazarsan sipariş tutarını iki kez sayarsın ve ciron şişer. Rapor kimseye yanlış görünmez — sadece sessizce fazladır.\n\nKorunma yolu: birleştirmeden önce ve sonra `COUNT(*)` al, sayı beklediğin gibi mi bak. Ya da toplamayı önce alt sorguda yapıp sonra birleştir.",
              "Join `orders` to `order_items` and an order with two line items becomes **two rows**. Write `SUM(o.total)` at that point and you count the order amount twice, inflating revenue. The report looks fine to everyone — it is just quietly too high.\n\nThe defence: take `COUNT(*)` before and after the join and check the number is what you expected. Or aggregate in a subquery first and join afterwards.",
            ),
            quiz({
              id: "q9",
              q: [
                "Pitfall'a göre, JOIN sonrası çoğullamaya karşı önerilen korunma yöntemi nedir?",
                "According to the pitfall, what is the recommended defence against fan-out after a JOIN?",
              ],
              options: [
                [
                  "Birleştirmeden önce ve sonra COUNT(*) almak, ya da önce alt sorguda toplayıp sonra birleştirmek",
                  "Take COUNT(*) before and after the join, or aggregate in a subquery first and join afterwards",
                ],
                ["JOIN kullanmaktan tamamen kaçınmak", "Avoid using JOIN altogether"],
                ["Her zaman UNION ALL kullanmak", "Always use UNION ALL instead"],
                ["Sonucu iki katına bölmek", "Divide the result by two"],
              ],
              answer: 0,
              explain: [
                "İki savunma önerilir: satır sayısını birleştirmeden önce/sonra karşılaştırıp beklenmedik artışı yakalamak, ya da sipariş düzeyindeki toplamı JOIN'den önce bir alt sorguda çıkarıp sonra birleştirmek.",
                "Two defences are suggested: compare row counts before and after the join to catch an unexpected jump, or compute the order-level total in a subquery before joining at all.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "\"Bu kişinin altında toplam kaç kişi çalışıyor?\" sorusu neden sabit sayıda JOIN ile cevaplanamaz?",
                "Why can't \"how many people work under this person in total?\" be answered with a fixed number of JOINs?",
              ],
              options: [
                [
                  "Hiyerarşinin kaç seviye derine ineceği önceden bilinmez",
                  "You don't know in advance how many levels deep the hierarchy goes",
                ],
                ["employees tablosunda manager_id sütunu yoktur", "The employees table has no manager_id column"],
                ["JOIN yalnızca iki tabloyla çalışır", "JOIN only works with two tables"],
                ["Bu soru SQL ile hiç cevaplanamaz", "This question cannot be answered in SQL at all"],
              ],
              answer: 0,
              explain: [
                "Sabit sayıda JOIN yazmak, hiyerarşinin sabit bir derinlikte olduğunu varsayar. Gerçek organizasyonlarda derinlik değişkendir, bu yüzden kendine referans veren (özyinelemeli) bir yapı gerekir.",
                "Writing a fixed number of JOINs assumes the hierarchy has a fixed depth. Real organizations have variable depth, so a self-referencing (recursive) structure is required.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Özyinelemeli bir CTE'nin iki parçası nedir?",
                "What are the two parts of a recursive CTE?",
              ],
              options: [
                ["Çapa ve özyinelemeli adım", "Anchor and recursive step"],
                ["WHERE ve GROUP BY", "WHERE and GROUP BY"],
                ["INSERT ve UPDATE", "INSERT and UPDATE"],
                ["PARTITION BY ve ORDER BY", "PARTITION BY and ORDER BY"],
              ],
              answer: 0,
              explain: [
                "Çapa, özyinelemenin başlayacağı ilk satırları verir; özyinelemeli adım ise kendine başvurup bir sonraki seviyeyi getirir. İkisi UNION ALL ile birleşir.",
                "The anchor supplies the starting rows for the recursion; the recursive step refers to itself to fetch the next level. The two are combined with UNION ALL.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Özyinelemeli CTE, yeni satır kalmadığında ne yapar?",
                "What happens to a recursive CTE once no new rows are produced?",
              ],
              options: [
                ["Durur", "It stops"],
                ["Sonsuza kadar aynı satırları tekrar üretir", "It keeps producing the same rows forever"],
                ["Hata fırlatır", "It raises an error"],
                ["Baştan başlar", "It starts over from the beginning"],
              ],
              answer: 0,
              explain: [
                "Özyinelemeli adım her turda bir öncekinin sonucuna bakar; yeni satır üretmediği an döngü kendiliğinden sona erer.",
                "The recursive step looks at the previous round's output each time; the moment it produces no new rows, the loop ends on its own.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "Örnekteki çapa sorgusu `WHERE manager_id IS NULL` koşulunu kullanır. Neden?",
                "The example's anchor query uses `WHERE manager_id IS NULL`. Why?",
              ],
              options: [
                [
                  "Yöneticisi olmayanlar hiyerarşinin en tepesidir, özyineleme oradan başlar",
                  "Those with no manager are the top of the hierarchy, so recursion starts there",
                ],
                ["manager_id her zaman NULL'dır", "manager_id is always NULL"],
                ["NULL değerleri sorgudan hariç tutmak için", "To exclude NULL values from the query"],
                ["Performansı artırmak için", "To improve performance"],
              ],
              answer: 0,
              explain: [
                "Çapa, ağacın kökünü seçmelidir. Bu şemada kök, hiç yöneticisi olmayan kişilerdir — manager_id IS NULL onları bulur.",
                "The anchor must select the root of the tree. In this schema the root is whoever has no manager — manager_id IS NULL finds them.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Özyinelemeli adımdaki `JOIN hiyerarsi AS h ON e.manager_id = h.id` ne yapar?",
                "What does the recursive step's `JOIN hiyerarsi AS h ON e.manager_id = h.id` do?",
              ],
              options: [
                [
                  "Bir önceki turda bulunan kişilerin altında çalışanları bir sonraki seviye olarak ekler",
                  "It adds the people reporting to whoever was found in the previous round, as the next level",
                ],
                ["Tüm çalışanları tek seferde getirir", "It fetches all employees in a single pass"],
                ["Yöneticisi olmayanları tekrar getirir", "It re-fetches people with no manager"],
                ["Tabloyu sıralar", "It sorts the table"],
              ],
              answer: 0,
              explain: [
                "CTE kendine (hiyerarsi) başvurarak bir önceki turun sonucunu okur; employees ile bu sonucu manager_id = id üzerinden eşleştirmek, bir alt seviyeyi bulur ve seviyeyi bir artırır.",
                "The CTE refers to itself (hiyerarsi) to read the previous round's output; matching employees to that result on manager_id = id finds the next level down and increments the level.",
              ],
            }),
            pitfall(
              "Sonsuz döngü riski",
              "The infinite loop risk",
              "Veride bir çevrim varsa (A'nın yöneticisi B, B'nin yöneticisi A) özyineleme hiç durmaz ve sorgu veritabanını kilitler. Üretimde daima bir derinlik sınırı koy: `WHERE seviye < 20` gibi bir koşulu özyinelemeli adıma ekle. PostgreSQL'de ayrıca gezilen kimlikleri bir dizide biriktirip `NOT id = ANY(yol)` kontrolü yapmak yaygındır.",
              "If the data contains a cycle (A's manager is B and B's manager is A) the recursion never stops and the query locks up the database. In production always add a depth guard: put a condition like `WHERE level < 20` in the recursive step. In PostgreSQL it is also common to accumulate visited ids into an array and check `NOT id = ANY(path)`.",
            ),
            quiz({
              id: "q7",
              q: [
                "Veride A'nın yöneticisi B, B'nin yöneticisi A ise özyinelemeli CTE'de ne olur?",
                "If A's manager is B and B's manager is A in the data, what happens to the recursive CTE?",
              ],
              options: [
                [
                  "Bir çevrim oluşur, özyineleme hiç durmaz ve veritabanını kilitler",
                  "A cycle forms, the recursion never stops, and it locks up the database",
                ],
                ["Sorgu otomatik olarak düzelir", "The query automatically corrects itself"],
                ["Sonuç boş döner", "The result comes back empty"],
                ["Yalnızca A getirilir", "Only A is returned"],
              ],
              answer: 0,
              explain: [
                "A, B'ye; B de A'ya bağlandığında özyineleme sürekli birbirini yeniden üretir ve hiçbir zaman 'yeni satır yok' durumuna ulaşmaz — bu da sonsuz döngüdür.",
                "When A points to B and B points back to A, the recursion keeps regenerating each other and never reaches a 'no new rows' state — that is the infinite loop.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Sonsuz döngüye karşı önerilen üretim korumasi nedir?",
                "What is the recommended production safeguard against an infinite loop?",
              ],
              options: [
                [
                  "Özyinelemeli adıma `WHERE seviye < 20` gibi bir derinlik sınırı eklemek",
                  "Add a depth guard like `WHERE level < 20` to the recursive step",
                ],
                ["RECURSIVE anahtar kelimesini kaldırmak", "Remove the RECURSIVE keyword"],
                ["Çapayı kaldırmak", "Remove the anchor"],
                ["UNION ALL yerine UNION kullanmak", "Use UNION instead of UNION ALL"],
              ],
              answer: 0,
              explain: [
                "Bir derinlik sınırı, çevrim olsa bile özyinelemenin belirli bir turdan sonra durmasını garanti eder. PostgreSQL'de ayrıca ziyaret edilen yolu bir dizide tutup tekrarı doğrudan engellemek de yaygındır.",
                "A depth guard guarantees the recursion stops after a certain round even if there is a cycle. In PostgreSQL it is also common to track the visited path in an array and block repetition directly.",
              ],
            }),
            text(
              "Özyinelemeli CTE'nin ikinci klasik kullanımı **seri üretmektir**. Raporlarda \"veri olmayan günler de sıfır olarak görünsün\" istendiğinde tarih tablosu üretmek gerekir:\n\n```sql\nWITH RECURSIVE gunler(gun) AS (\n  SELECT DATE('2024-01-01')\n  UNION ALL\n  SELECT DATE(gun, '+1 day') FROM gunler WHERE gun < '2024-01-31'\n)\nSELECT * FROM gunler;\n```\n\nBu takvimi ciro tablosuna `LEFT JOIN` yaparsan, satış olmayan günler grafikte boşluk yerine sıfır olarak görünür — çizgi grafiklerde doğru okuma için şarttır.",
              "The second classic use of a recursive CTE is **generating a series**. When a report needs \"days with no data should still show as zero\", you must produce a date table:\n\n```sql\nWITH RECURSIVE days(day) AS (\n  SELECT DATE('2024-01-01')\n  UNION ALL\n  SELECT DATE(day, '+1 day') FROM days WHERE day < '2024-01-31'\n)\nSELECT * FROM days;\n```\n\n`LEFT JOIN` this calendar to your revenue table and days without sales appear as zero rather than as gaps — essential for reading line charts correctly.",
            ),
            quiz({
              id: "q9",
              q: [
                "Üretilen takvimi ciro tablosuna `LEFT JOIN` yapmanın amacı nedir?",
                "What is the point of `LEFT JOIN`ing the generated calendar to the revenue table?",
              ],
              options: [
                [
                  "Satış olmayan günlerin grafikte boşluk yerine sıfır olarak görünmesini sağlamak",
                  "So that days with no sales appear as zero in the chart instead of as gaps",
                ],
                ["Ciro tablosundaki hatalı satırları silmek", "To delete faulty rows from the revenue table"],
                ["Takvimdeki günleri rastgele sıralamak", "To randomly reorder the calendar's days"],
                ["Ciro tablosunu ikiye katlamak", "To double the revenue table"],
              ],
              answer: 0,
              explain: [
                "Ciro tablosu yalnızca satış olan günleri içerir; takvimle LEFT JOIN yapmak eksik günleri de satıra dönüştürür ve eşleşme bulunamadığında ciro NULL/0 görünür — çizgi grafiklerde doğru okuma için gereklidir.",
                "The revenue table only contains days with sales; LEFT JOINing the calendar turns the missing days into rows too, and where there is no match revenue shows as NULL/0 — necessary for reading line charts correctly.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: ["`ROLLUP(city, segment)` hangi satırları üretir?", "Which rows does `ROLLUP(city, segment)` produce?"],
              options: [
                [
                  "city+segment kırılımı, sonra yalnız city, sonra genel toplam",
                  "city+segment breakdown, then city alone, then the grand total",
                ],
                ["Yalnızca city+segment kırılımını", "Only the city+segment breakdown"],
                ["Tüm olası kombinasyonları (city, segment, ikisi, hiçbiri)", "Every possible combination (city, segment, both, neither)"],
                ["Yalnızca genel toplamı", "Only the grand total"],
              ],
              answer: 0,
              explain: [
                "ROLLUP hiyerarşik bir ara toplam üretir: önce en detaylı kırılım (city+segment), sonra bir üst seviye (yalnız city), en sonda genel toplam. CUBE'den farkı budur — CUBE tüm kombinasyonları dener.",
                "ROLLUP produces a hierarchical subtotal: first the most detailed breakdown (city+segment), then one level up (city alone), then the grand total. This is what distinguishes it from CUBE, which tries every combination.",
              ],
            }),
            quiz({
              id: "q3",
              q: ["`CUBE(city, segment)` ile `ROLLUP(city, segment)` arasındaki fark nedir?", "What is the difference between `CUBE(city, segment)` and `ROLLUP(city, segment)`?"],
              options: [
                [
                  "CUBE tüm kombinasyonları üretir (city+segment, city, segment, genel); ROLLUP yalnızca hiyerarşik olanları",
                  "CUBE produces every combination (city+segment, city, segment, grand); ROLLUP only the hierarchical ones",
                ],
                ["İkisi aynı sonucu verir", "They produce identical results"],
                ["CUBE yalnızca sayısal sütunlarda çalışır", "CUBE only works on numeric columns"],
                ["ROLLUP daha fazla satır üretir", "ROLLUP produces more rows"],
              ],
              answer: 0,
              explain: [
                "ROLLUP sıralı bir hiyerarşi izler (city+segment → city → genel). CUBE ise segment tek başına dahil olmak üzere olası her boyut kombinasyonunu üretir.",
                "ROLLUP follows an ordered hierarchy (city+segment → city → grand). CUBE produces every possible dimension combination, including segment on its own.",
              ],
            }),
            quiz({
              id: "q4",
              q: ["`GROUPING SETS` neyi sağlar?", "What does `GROUPING SETS` provide?"],
              options: [
                [
                  "Hangi kombinasyonların üretileceğini tek tek elle belirleme imkânı",
                  "The ability to specify exactly which combinations get produced, one by one",
                ],
                ["Otomatik olarak tüm kombinasyonları üretir", "It automatically produces every combination"],
                ["Yalnızca en detaylı kırılımı üretir", "It produces only the most detailed breakdown"],
                ["Sonuçları sıralar", "It sorts the results"],
              ],
              answer: 0,
              explain: [
                "ROLLUP ve CUBE önceden tanımlı desenler izlerken, GROUPING SETS ile tam olarak hangi kırılım kombinasyonlarını istediğini kendin listelersin — daha esnektir.",
                "While ROLLUP and CUBE follow predefined patterns, with GROUPING SETS you list yourself exactly which breakdown combinations you want — it's more flexible.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Metne göre, hangi veritabanı ROLLUP/CUBE/GROUPING SETS'i desteklemez?",
                "According to the text, which database does not support ROLLUP/CUBE/GROUPING SETS?",
              ],
              options: [
                ["SQLite", "SQLite"],
                ["PostgreSQL", "PostgreSQL"],
                ["BigQuery", "BigQuery"],
                ["SQL Server", "SQL Server"],
              ],
              answer: 0,
              explain: [
                "PostgreSQL, SQL Server, Oracle ve BigQuery bu üçünü destekler; SQLite desteklemez — bu yüzden dersin devamında taşınabilir bir UNION ALL karşılığı gösterilir.",
                "PostgreSQL, SQL Server, Oracle and BigQuery all support these three; SQLite does not — which is why the lesson also shows a portable UNION ALL equivalent.",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "Taşınabilir UNION ALL karşılığında üç sorgu neden alt alta yığılır?",
                "Why are three queries stacked with UNION ALL in the portable equivalent?",
              ],
              options: [
                [
                  "Her biri farklı bir kırılım seviyesini (detay, şehir toplamı, genel toplam) üretir ve tek tabloda birleştirilir",
                  "Each produces a different breakdown level (detail, city subtotal, grand total) and they are combined into one table",
                ],
                ["Performans için gereklidir", "It's required for performance"],
                ["SQLite UNION ALL'u yalnızca üçlü grupta kabul eder", "SQLite only accepts UNION ALL in groups of three"],
                ["Tekrarları elemek için", "To eliminate duplicates"],
              ],
              answer: 0,
              explain: [
                "ROLLUP'ın ürettiği üç seviyeyi (city+segment, yalnız city, genel) ayrı ayrı sorgularla üretip UNION ALL ile üst üste koymak, ROLLUP'sız veritabanlarında aynı tabloyu elde etmenin yoludur.",
                "Producing ROLLUP's three levels (city+segment, city alone, grand) as separate queries and stacking them with UNION ALL is how you get the same table on a database without ROLLUP.",
              ],
            }),
            text(
              "**Pivot**, satırları sütuna çevirmektir: \"her şehir bir satır, her segment bir sütun\". SQL'de bunun taşınabilir yolu koşullu toplamadır — `CASE`'i zaten biliyorsun:\n\n```sql\nSELECT\n  city,\n  SUM(CASE WHEN segment = 'bireysel' THEN 1 ELSE 0 END) AS bireysel,\n  SUM(CASE WHEN segment = 'kurumsal' THEN 1 ELSE 0 END) AS kurumsal\nFROM customers\nGROUP BY city;\n```\n\nSQL Server'ın `PIVOT` operatörü ve PostgreSQL'in `crosstab` fonksiyonu daha kısadır ama taşınabilir değildir. Sütun listesi sabit olduğu sürece `CASE` yaklaşımı her yerde çalışır — ve sütunlar dinamikse zaten SQL'in değil, rapor aracının işidir.",
              "**Pivoting** means turning rows into columns: \"one row per city, one column per segment\". The portable way to do it in SQL is conditional aggregation — you already know `CASE`:\n\n```sql\nSELECT\n  city,\n  SUM(CASE WHEN segment = 'bireysel' THEN 1 ELSE 0 END) AS individual,\n  SUM(CASE WHEN segment = 'kurumsal' THEN 1 ELSE 0 END) AS corporate\nFROM customers\nGROUP BY city;\n```\n\nSQL Server's `PIVOT` operator and PostgreSQL's `crosstab` are shorter but not portable. As long as the column list is fixed, the `CASE` approach works everywhere — and if the columns are dynamic, that is the reporting tool's job, not SQL's.",
            ),
            quiz({
              id: "q7",
              q: ["\"Pivot\" işlemi ne anlama gelir?", "What does a \"pivot\" operation mean?"],
              options: [
                ["Satırları sütuna çevirmek", "Turning rows into columns"],
                ["Sütunları silmek", "Deleting columns"],
                ["İki tabloyu birleştirmek", "Joining two tables"],
                ["Bir sütunu yeniden adlandırmak", "Renaming a column"],
              ],
              answer: 0,
              explain: [
                "Pivot, \"her şehir bir satır, her segment bir sütun\" örneğindeki gibi, bir boyutun değerlerini ayrı sütunlara yayar.",
                "Pivoting spreads the values of a dimension into separate columns, as in the \"one row per city, one column per segment\" example.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "SQL'de taşınabilir pivot yöntemi hangisidir?",
                "What is the portable pivoting technique in SQL?",
              ],
              options: [
                [
                  "Koşullu toplama: SUM(CASE WHEN segment = ... THEN 1 ELSE 0 END)",
                  "Conditional aggregation: SUM(CASE WHEN segment = ... THEN 1 ELSE 0 END)",
                ],
                ["Yalnızca SQL Server'ın PIVOT operatörü", "Only SQL Server's PIVOT operator"],
                ["Yalnızca PostgreSQL'in crosstab fonksiyonu", "Only PostgreSQL's crosstab function"],
                ["ROLLUP kullanmak", "Using ROLLUP"],
              ],
              answer: 0,
              explain: [
                "CASE ile koşullu toplama, zaten bilinen bir araçla her yerde çalışır. PIVOT ve crosstab daha kısa yazılır ama motora özeldir, taşınabilir değildir.",
                "Conditional aggregation with CASE uses a tool you already know and works everywhere. PIVOT and crosstab are shorter but engine-specific, not portable.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "CASE tabanlı pivot yaklaşımı hangi koşulda her yerde çalışır?",
                "Under what condition does the CASE-based pivot approach work everywhere?",
              ],
              options: [
                ["Sütun listesi sabit olduğu sürece", "As long as the column list is fixed"],
                ["Yalnızca SQLite'ta", "Only in SQLite"],
                ["Yalnızca segment iki değer aldığında", "Only when segment has two values"],
                ["Hiçbir zaman, her motor için ayrı yazılmalı", "Never, it must be written separately for each engine"],
              ],
              answer: 0,
              explain: [
                "Her hedef sütun için ayrı bir SUM(CASE WHEN ...) yazdığın sürece bu yaklaşım her SQL motorunda çalışır; sütunlar dinamikse (önceden bilinmiyorsa) bu artık SQL'in değil raporlama aracının işidir.",
                "As long as you write a separate SUM(CASE WHEN ...) for each target column, this approach works on any SQL engine; if the columns are dynamic (unknown ahead of time), that becomes the reporting tool's job, not SQL's.",
              ],
            }),
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
            quiz({
              id: "q3",
              q: [
                "`BEGIN` ile `COMMIT` arasındaki komutlar bir bütün olarak nasıl davranır?",
                "How do the statements between `BEGIN` and `COMMIT` behave as a unit?",
              ],
              options: [
                [
                  "Ya hepsi uygulanır ya da hiçbiri uygulanmaz",
                  "Either all of them are applied, or none of them are",
                ],
                ["Sırayla, biri başarısız olsa da devam eder", "They run in order, continuing even if one fails"],
                ["Rastgele bir sırada çalışır", "They run in a random order"],
                ["Yalnızca ilk komut çalışır", "Only the first statement runs"],
              ],
              answer: 0,
              explain: [
                "Bir işlem, içindeki komutları tek bir bütün olarak ele alır: COMMIT çalışırsa hepsi kalıcı olur, çalışmazsa veritabanı hepsini geri alır. Yarım bir sonuç asla görünmez.",
                "A transaction treats its statements as a single unit: if COMMIT runs, all of them become permanent; if it doesn't, the database undoes all of them. A half-applied result is never visible.",
              ],
            }),
            info(
              "ACID nedir?",
              "What is ACID?",
              "**A**tomicity — hep ya da hiç.\n**C**onsistency — kurallar (anahtarlar, kısıtlar) her zaman geçerli kalır.\n**I**solation — eşzamanlı işlemler birbirinin yarım işini görmez.\n**D**urability — `COMMIT` dedikten sonra veri kalıcıdır; sunucu çökse de kaybolmaz.\n\nBu dört garanti, ilişkisel veritabanlarını elli yıldır vazgeçilmez kılan şeydir. Analitik ambarlar (BigQuery, Snowflake) bunları biraz gevşetir çünkü öncelikleri okuma hızıdır.",
              "**A**tomicity — all or nothing.\n**C**onsistency — the rules (keys, constraints) always hold.\n**I**solation — concurrent transactions never see each other's half-finished work.\n**D**urability — once you `COMMIT`, the data survives even a server crash.\n\nThese four guarantees are what has kept relational databases indispensable for fifty years. Analytical warehouses (BigQuery, Snowflake) relax them somewhat, because their priority is read speed.",
            ),
            quiz({
              id: "q4",
              q: ["ACID'deki \"Atomicity\" (atomiklik) neyi garanti eder?", "What does \"Atomicity\" in ACID guarantee?"],
              options: [
                ["Bir işlemin ya tamamen uygulanacağını ya da hiç uygulanmayacağını", "That a transaction will either be applied completely or not at all"],
                ["Verinin her zaman doğru sırada okunacağını", "That data will always be read in the right order"],
                ["Sorguların hızlı çalışacağını", "That queries will run quickly"],
                ["Sunucunun asla çökmeyeceğini", "That the server will never crash"],
              ],
              answer: 0,
              explain: [
                "Atomicity, işlemi bölünemez tek bir birim olarak ele alır: hep ya da hiç. Para transferi örneğindeki iki UPDATE bu yüzden birlikte başarılı olur ya da birlikte geri alınır.",
                "Atomicity treats a transaction as one indivisible unit: all or nothing. That's why the two UPDATEs in the money-transfer example succeed together or roll back together.",
              ],
            }),
            quiz({
              id: "q5",
              q: ["ACID'deki \"Isolation\" (yalıtım) neyi garanti eder?", "What does \"Isolation\" in ACID guarantee?"],
              options: [
                [
                  "Eşzamanlı çalışan işlemlerin birbirinin yarım kalmış işini görmeyeceğini",
                  "That concurrently running transactions will not see each other's half-finished work",
                ],
                ["Verinin sunucu çökse bile kaybolmayacağını", "That data will not be lost even if the server crashes"],
                ["Anahtarların ve kısıtların her zaman geçerli kalacağını", "That keys and constraints will always hold"],
                ["Bir işlemin ya hep ya hiç uygulanacağını", "That a transaction will be all-or-nothing"],
              ],
              answer: 0,
              explain: [
                "Isolation, aynı anda çalışan iki işlemin birbirinin ara (henüz commit edilmemiş) durumunu görmesini engeller — her işlem kendi başınaymış gibi davranır.",
                "Isolation prevents two transactions running at the same time from seeing each other's intermediate (not-yet-committed) state — each behaves as if it were running alone.",
              ],
            }),
            quiz({
              id: "q6",
              q: ["ACID'deki \"Durability\" (kalıcılık) neyi garanti eder?", "What does \"Durability\" in ACID guarantee?"],
              options: [
                [
                  "COMMIT edilen verinin sunucu çökse bile kaybolmayacağını",
                  "That committed data will not be lost even if the server crashes",
                ],
                ["Sorgunun her zaman hızlı çalışacağını", "That the query will always run fast"],
                ["İşlemlerin eşzamanlı çalışamayacağını", "That transactions cannot run concurrently"],
                ["Verinin asla değiştirilemeyeceğini", "That data can never be modified"],
              ],
              answer: 0,
              explain: [
                "Durability, bir kez COMMIT dedikten sonra verinin kalıcı olduğunu garanti eder; ardından sunucu çökse bile o veri kaybolmaz.",
                "Durability guarantees that once you say COMMIT, the data is permanent; even if the server crashes right after, that data survives.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Analitik ambarlar (BigQuery, Snowflake gibi) ACID garantilerini neden biraz gevşetir?",
                "Why do analytical warehouses (like BigQuery, Snowflake) relax ACID guarantees somewhat?",
              ],
              options: [
                ["Önceliklerinin okuma hızı olması", "Because their priority is read speed"],
                ["ACID'i hiç desteklemedikleri için", "Because they don't support ACID at all"],
                ["Verilerini asla kalıcı yapmadıkları için", "Because they never make data durable"],
                ["Yalnızca tek kullanıcıyla çalıştıkları için", "Because they only work with a single user"],
              ],
              answer: 0,
              explain: [
                "İşlemsel veritabanları yazma güvenliğini önceliklendirirken, analitik ambarlar büyük veriyi hızlı okumayı önceliklendirir; bu yüzden bazı ACID garantilerinden ödün verirler.",
                "Where transactional databases prioritize write safety, analytical warehouses prioritize reading large volumes of data fast; that trade-off means relaxing some ACID guarantees.",
              ],
            }),
            text(
              "Analistin günlük hayatında bunun karşılığı **tekrarlanabilir (idempotent) yükleme**dir. Bir günlük özet tablosunu her sabah yeniden üreten iş, iki kez çalışırsa veriyi ikiye katlamamalıdır. Doğru desen şudur:\n\n```sql\nBEGIN;\n  DELETE FROM gunluk_ozet WHERE gun = '2024-08-01';\n  INSERT INTO gunluk_ozet\n  SELECT '2024-08-01', ... FROM ham_veri WHERE ...;\nCOMMIT;\n```\n\nÖnce o günü sil, sonra yeniden yaz — ikisi tek işlemde. İş kaç kez çalışırsa çalışsın sonuç aynıdır. Modern ambarlarda aynı işi `MERGE` (upsert) tek komutta yapar.",
              "In an analyst's daily life the equivalent of this is an **idempotent load**. A job that rebuilds a daily summary table every morning must not double the data if it runs twice. The correct pattern is:\n\n```sql\nBEGIN;\n  DELETE FROM daily_summary WHERE day = '2024-08-01';\n  INSERT INTO daily_summary\n  SELECT '2024-08-01', ... FROM raw_data WHERE ...;\nCOMMIT;\n```\n\nDelete that day first, then rewrite it — both inside one transaction. However many times the job runs, the result is the same. In modern warehouses `MERGE` (upsert) does the same job in a single statement.",
            ),
            quiz({
              id: "q8",
              q: [
                "Tekrarlanabilir (idempotent) günlük yükleme deseninde ilk adım nedir?",
                "In the idempotent daily load pattern, what is the first step?",
              ],
              options: [
                [
                  "O güne ait mevcut satırları silmek (DELETE), sonra yeniden eklemek (INSERT)",
                  "Delete the existing rows for that day (DELETE), then re-insert them (INSERT)",
                ],
                ["Doğrudan yeni satırları eklemek", "Directly insert the new rows"],
                ["Tüm tabloyu silmek", "Drop the entire table"],
                ["Bir yedek tablo oluşturmak", "Create a backup table"],
              ],
              answer: 0,
              explain: [
                "Önce o güne ait eski satırları silip sonra yeniden eklemek, işin kaç kez çalıştığından bağımsız olarak aynı sonucu garanti eder — doğrudan INSERT etmek her çalıştırmada veriyi ikiye katlardı.",
                "Deleting that day's old rows first and then re-inserting guarantees the same result no matter how many times the job runs — inserting directly would double the data on every run.",
              ],
            }),
            quiz({
              id: "q9",
              q: ["Modern ambarlarda `MERGE` (upsert) ne işe yarar?", "What does `MERGE` (upsert) do in modern warehouses?"],
              options: [
                [
                  "DELETE + INSERT çiftinin yaptığı işi tek bir komutta yapar",
                  "It does the same job as a DELETE + INSERT pair in a single statement",
                ],
                ["Yalnızca yeni satır ekler, hiç güncelleme yapmaz", "It only inserts new rows, never updates"],
                ["Tabloyu tamamen siler", "It drops the table entirely"],
                ["Yalnızca SELECT sorgularında kullanılır", "It is only used in SELECT queries"],
              ],
              answer: 0,
              explain: [
                "MERGE (upsert), var olan bir satırı güncelleyip olmayanı eklemeyi tek bir komutta yapar — DELETE + INSERT çiftinin yerini alan daha kısa bir yoldur.",
                "MERGE (upsert) updates an existing row or inserts a missing one in a single statement — a shorter path that replaces the DELETE + INSERT pair.",
              ],
            }),
            pitfall(
              "UPDATE ve DELETE'i WHERE'siz çalıştırma",
              "Never run UPDATE or DELETE without WHERE",
              "`DELETE FROM orders;` tablodaki **her satırı** siler. Alışkanlık edin: silme veya güncelleme yazarken önce `SELECT` olarak yaz, dönen satırları gör, sonra `SELECT`'i `DELETE`/`UPDATE` ile değiştir. Üretim veritabanında çalışıyorsan ayrıca `BEGIN` ile başla — sonucu görmeden `COMMIT` etme.",
              "`DELETE FROM orders;` removes **every row**. Build the habit: write the delete or update as a `SELECT` first, look at the rows it returns, then swap the `SELECT` for `DELETE`/`UPDATE`. If you are on a production database, also open with `BEGIN` — and do not `COMMIT` until you have seen the outcome.",
            ),
            quiz({
              id: "q10",
              q: [
                "Pitfall'a göre, bir DELETE veya UPDATE yazmadan önce önerilen alışkanlık nedir?",
                "According to the pitfall, what habit is recommended before writing a DELETE or UPDATE?",
              ],
              options: [
                [
                  "Önce aynı koşulu bir SELECT olarak yazıp dönen satırları görmek, sonra DELETE/UPDATE'e çevirmek",
                  "First write the same condition as a SELECT and look at the returned rows, then convert it to DELETE/UPDATE",
                ],
                ["Doğrudan COMMIT ile başlamak", "Start directly with COMMIT"],
                ["WHERE koşulunu hiç yazmamak", "Never write a WHERE condition"],
                ["Tabloyu önce yedeklemeden silmek", "Delete the table without backing it up first"],
              ],
              answer: 0,
              explain: [
                "SELECT olarak yazıp hangi satırların etkileneceğini gözle görmek, WHERE'siz veya yanlış bir DELETE/UPDATE'in tüm tabloyu silmesini önler. Üretimde ayrıca BEGIN ile açıp sonucu görmeden COMMIT etmemek gerekir.",
                "Writing it as a SELECT first and seeing which rows would be affected prevents a missing or wrong WHERE from wiping the whole table. In production you should also open with BEGIN and hold off on COMMIT until you've seen the result.",
              ],
            }),
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
