import type { Track } from "@/lib/types";
import { L, tip, code, info, lesson, order, pitfall, quiz, text } from "../helpers";

export const dataEngineeringTrack: Track = {
  slug: "veri-muhendisligi",
  name: "Veri Mühendisliği",
  category: "advanced",
  color: "#2dd4bf",
  icon: "⚙️",
  tagline: L("Veriyi güvenilir şekilde taşımak", "Moving data reliably"),
  description: L(
    "Analistin veriye ulaşabilmesi için birinin o veriyi taşıması, temizlemesi ve zamanlaması gerekir. Bu patika ETL/ELT, veri ambarı modelleme, Spark, Airflow ve veri kalitesi konularını kapsar.",
    "Before an analyst can touch data, someone has to move, clean and schedule it. This track covers ETL/ELT, warehouse modelling, Spark, Airflow and data quality.",
  ),
  levels: [
    {
      id: "foundation",
      title: L("Veri mühendisliğine giriş", "Introduction to data engineering"),
      description: L(
        "Veri nereden gelir, nereye gider ve bu boruları kim döşer?",
        "Where does data come from, where does it go, and who lays the pipes?",
      ),
      lessons: [
        lesson({
          slug: "veri-muhendisi-ne-yapar",
          title: L("Veri mühendisi ne yapar?", "What does a data engineer do?"),
          summary: L(
            "Analistin sorgu yazdığı tablo oraya nasıl geldi? İşte o iş.",
            "How did the table an analyst queries get there? That is the job.",
          ),
          minutes: 12,
          blocks: [
            text(
              "Bir analist `SELECT * FROM satislar` yazdığında o tablonun orada, güncel ve temiz durması kendiliğinden olmaz. **Veri mühendisi**, veriyi kaynağından analiz edilebilir hâle getiren sistemleri kurar ve ayakta tutar.\n\nTipik bir günün işleri:\n\n- Kaynak sistemlerden (uygulama veritabanı, API, dosya) veriyi çekmek\n- Bozuk, eksik veya geç gelen veriyle başa çıkmak\n- Veriyi analiz için uygun şekle dönüştürmek\n- İşleri zamanlamak ve başarısız olduklarında haber vermek\n- Maliyeti ve performansı kontrol altında tutmak\n\n**Analist ile fark:** analist \"veri ne söylüyor?\" sorusunu, mühendis \"veri nasıl güvenilir şekilde buraya gelir?\" sorusunu yanıtlar.",
              "When an analyst writes `SELECT * FROM sales`, that table being there, fresh and clean, does not happen by itself. A **data engineer** builds and maintains the systems that take data from its source to something analysable.\n\nA typical day involves:\n\n- pulling data from source systems (application databases, APIs, files)\n- coping with broken, missing or late-arriving data\n- reshaping data into a form fit for analysis\n- scheduling jobs and being told when they fail\n- keeping cost and performance under control\n\n**The difference from an analyst:** the analyst answers \"what is the data saying?\", the engineer answers \"how does the data reliably get here?\"",
            ),
            quiz({
              id: "q2",
              q: [
                "`SELECT * FROM satislar` yazan bir analist için tablonun orada, güncel ve temiz durmasını kim sağlar?",
                "For an analyst writing `SELECT * FROM sales`, who ensures the table is there, fresh and clean?",
              ],
              options: [
                ["Veri mühendisi", "The data engineer"],
                ["Veritabanı kendiliğinden", "The database, on its own"],
                ["BI aracı", "The BI tool"],
                ["Müşteri", "The customer"],
              ],
              answer: 0,
              explain: [
                "Bu, kendiliğinden olmaz — birinin kaynaktan veriyi çekip temizleyen ve zamanlayan sistemleri kurup ayakta tutması gerekir. Bu iş veri mühendisinin işidir.",
                "It does not happen by itself — someone has to build and maintain the systems that pull, clean and schedule the data from its source. That someone is the data engineer.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Aşağıdakilerden hangisi dersin anlattığı tipik bir veri mühendisliği görevi DEĞİLDİR?",
                "Which of these is NOT a typical data engineering task described in the lesson?",
              ],
              options: [
                ["Pazarlama kampanyasının reklam metnini yazmak", "Writing the ad copy for a marketing campaign"],
                ["Bozuk veya geç gelen veriyle başa çıkmak", "Coping with broken or late-arriving data"],
                ["İşleri zamanlamak ve başarısızlıkları bildirmek", "Scheduling jobs and reporting failures"],
                ["Maliyet ve performansı kontrol altında tutmak", "Keeping cost and performance under control"],
              ],
              answer: 0,
              explain: [
                "Reklam metni yazmak pazarlamanın işidir. Derste sayılan görevler veriyi kaynağından çekmek, bozuk/geç veriyle uğraşmak, dönüştürmek, zamanlamak ve maliyeti kontrol etmektir.",
                "Writing ad copy belongs to marketing. The tasks the lesson lists are pulling data from sources, coping with broken/late data, reshaping it, scheduling and controlling cost.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Analist ile veri mühendisi arasındaki fark nasıl özetlenir?",
                "How is the difference between an analyst and a data engineer summarised?",
              ],
              options: [
                [
                  "Analist \"veri ne söylüyor?\" sorusunu, mühendis \"veri nasıl güvenilir şekilde buraya gelir?\" sorusunu yanıtlar",
                  "The analyst answers \"what is the data saying?\", the engineer answers \"how does the data reliably get here?\"",
                ],
                ["Analist kod yazmaz, mühendis hiç sorgu yazmaz", "The analyst never codes, the engineer never queries"],
                ["İkisi de aynı işi yapar", "They do exactly the same job"],
                ["Mühendis yalnızca grafik hazırlar", "The engineer only prepares charts"],
              ],
              answer: 0,
              explain: [
                "İkisi de veriyle çalışır ama farklı sorulara cevap arar: analist içerikle, mühendis güvenilirlik ve ulaşılabilirlikle ilgilenir.",
                "Both work with data but answer different questions: the analyst cares about content, the engineer about reliability and reach.",
              ],
            }),
            text(
              "**Modern veri yığınının katmanları** — hemen her şirkette bu sıra vardır:\n\n1. **Kaynaklar** — Uygulama veritabanı, CRM, reklam platformları, dosyalar, olay akışları\n2. **Alma (ingestion)** — Veriyi kaynaktan çekip ham hâliyle depoya yazan araçlar (Fivetran, Airbyte, özel betikler)\n3. **Depolama** — Veri gölü (S3, ADLS) veya veri ambarı (Snowflake, BigQuery, Redshift)\n4. **Dönüştürme** — Ham veriyi iş mantığına çeviren katman (dbt, SQL, Spark)\n5. **Sunum** — Analistin ve BI aracının gördüğü temiz tablolar\n6. **Orkestrasyon** — Tüm bunları doğru sırada çalıştıran zamanlayıcı (Airflow, Dagster, Prefect)\n\nBu katmanları bilmek, bir iş ilanındaki araç listesini anlamlandırmanın da en hızlı yoludur.",
              "**The layers of the modern data stack** — nearly every company has this order:\n\n1. **Sources** — application databases, CRM, ad platforms, files, event streams\n2. **Ingestion** — tools that pull data from sources and land it raw (Fivetran, Airbyte, custom scripts)\n3. **Storage** — a data lake (S3, ADLS) or a warehouse (Snowflake, BigQuery, Redshift)\n4. **Transformation** — the layer turning raw data into business logic (dbt, SQL, Spark)\n5. **Serving** — the clean tables analysts and BI tools see\n6. **Orchestration** — the scheduler running all of it in the right order (Airflow, Dagster, Prefect)\n\nKnowing these layers is also the fastest way to make sense of the tool list in a job advert.",
            ),
            quiz({
              id: "q5",
              q: [
                "\"Alma (ingestion)\" katmanının görevi nedir?",
                "What does the \"ingestion\" layer do?",
              ],
              options: [
                [
                  "Veriyi kaynak sistemlerden çekip ham hâliyle depoya yazar",
                  "It pulls data from source systems and lands it raw in storage",
                ],
                ["Veriyi analiz için görselleştirir", "It visualises data for analysis"],
                ["İş kurallarını uygular", "It applies business logic"],
                ["İşleri zamanlar", "It schedules jobs"],
              ],
              answer: 0,
              explain: [
                "Ingestion katmanı Fivetran, Airbyte gibi araçlar veya özel betiklerle kaynaktan veriyi çekip ham hâliyle depoya taşır — henüz dönüştürme yapmaz.",
                "The ingestion layer, via tools like Fivetran, Airbyte or custom scripts, pulls data from the source and lands it raw in storage — it does not transform yet.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Depolama katmanında hangi iki seçenek örnek verilir?",
                "Which two options are given for the storage layer?",
              ],
              options: [
                [
                  "Veri gölü (S3, ADLS) veya veri ambarı (Snowflake, BigQuery, Redshift)",
                  "A data lake (S3, ADLS) or a warehouse (Snowflake, BigQuery, Redshift)",
                ],
                ["Sadece yerel disk", "Only local disk"],
                ["Sadece e-posta ekleri", "Only email attachments"],
                ["Sadece kağıt kayıtlar", "Only paper records"],
              ],
              answer: 0,
              explain: [
                "Depolama katmanı için ders iki tipik seçenek sayar: dosya tabanlı veri gölü ya da yapılandırılmış veri ambarı.",
                "The lesson lists two typical storage options: a file-based data lake or a structured warehouse.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Dönüştürme katmanında örnek olarak hangi araçlar verilir?",
                "Which tools are given as examples for the transformation layer?",
              ],
              options: [
                ["dbt, SQL, Spark", "dbt, SQL, Spark"],
                ["Photoshop, Illustrator", "Photoshop, Illustrator"],
                ["Word, Excel", "Word, Excel"],
                ["Fivetran, Airbyte", "Fivetran, Airbyte"],
              ],
              answer: 0,
              explain: [
                "Ham veriyi iş mantığına çeviren katman dbt, SQL veya Spark gibi araçlarla çalışır. Fivetran/Airbyte ise ingestion katmanına aittir.",
                "The layer turning raw data into business logic works with tools like dbt, SQL or Spark. Fivetran/Airbyte belong to the ingestion layer instead.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "\"Sunum\" katmanı kime, neyi gösterir?",
                "What does the \"serving\" layer show, and to whom?",
              ],
              options: [
                [
                  "Analiste ve BI aracına temiz, kullanıma hazır tabloları gösterir",
                  "It shows the analyst and the BI tool clean, ready-to-use tables",
                ],
                ["Yalnızca ham logları gösterir", "It shows only raw logs"],
                ["Sadece geliştiricilere kaynak kodu gösterir", "It shows only source code to developers"],
                ["Hiçbir şey göstermez, sadece depolar", "It shows nothing, it only stores"],
              ],
              answer: 0,
              explain: [
                "Sunum katmanı, dönüştürme adımlarından geçmiş, analistin ve BI aracının doğrudan sorgulayabileceği temiz tablolardır.",
                "The serving layer is the clean tables that have been through transformation and that the analyst and BI tool can query directly.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Modern veri yığınının altı katmanını bilmek pratikte en çok neye yarar?",
                "What is the most practical use of knowing the six layers of the modern data stack?",
              ],
              options: [
                [
                  "Bir iş ilanındaki araç listesini anlamlandırmaya yardımcı olur",
                  "It helps you make sense of the tool list in a job advert",
                ],
                ["Kod yazmayı gereksiz kılar", "It makes writing code unnecessary"],
                ["Veritabanı lisansını ücretsizleştirir", "It makes the database license free"],
                ["Sadece sınavlarda işe yarar", "It is only useful for exams"],
              ],
              answer: 0,
              explain: [
                "Ders bunu açıkça belirtir: katmanları bilmek, bir iş ilanındaki dağınık araç isimlerini hangi işlevi gördüklerine göre gruplamanı sağlar.",
                "The lesson states this directly: knowing the layers lets you group the scattered tool names in a job advert by the function they serve.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Bir veri hattında \"orkestrasyon\" katmanı ne iş yapar?",
                "What does the \"orchestration\" layer do in a data pipeline?",
              ],
              options: [
                [
                  "İşleri doğru sırada, doğru zamanda çalıştırır ve başarısızlıkları yönetir",
                  "It runs jobs in the right order at the right time and handles failures",
                ],
                ["Veriyi depolar", "It stores the data"],
                ["Grafik üretir", "It produces charts"],
                ["Veriyi temizler", "It cleans the data"],
              ],
              answer: 0,
              explain: [
                "Orkestrasyon aracı işin kendisini yapmaz; **ne zaman ve hangi sırayla** yapılacağını yönetir. B işi A bitmeden başlamamalı, A başarısız olursa B hiç çalışmamalı ve birine haber gitmeli. Bu bağımlılık yönetimi, veri hatlarının en kritik ve en çok gözden kaçan parçasıdır.",
                "An orchestrator does not do the work itself; it manages **when and in what order** it happens. Job B must not start before A finishes, and if A fails then B must not run at all and somebody must be told. This dependency management is the most critical and most overlooked part of a data pipeline.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "\"Kaynaklar\" katmanına örnek olarak neler sayılır?",
                "What is given as an example of the \"sources\" layer?",
              ],
              options: [
                [
                  "Uygulama veritabanı, CRM, reklam platformları, dosyalar, olay akışları",
                  "Application databases, CRM, ad platforms, files, event streams",
                ],
                ["Sadece Excel dosyaları", "Only Excel files"],
                ["Sadece BI panoları", "Only BI dashboards"],
                ["Sadece orkestrasyon araçları", "Only orchestration tools"],
              ],
              answer: 0,
              explain: [
                "Kaynaklar katmanı, verinin ilk üretildiği yerdir: uygulama veritabanları, CRM'ler, reklam platformları, dosyalar ve olay akışları. Buradan sonraki her katman bu veriyi işler.",
                "The sources layer is where data is first produced: application databases, CRMs, ad platforms, files and event streams. Every later layer processes this data.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "depolama-secenekleri",
          title: L("Veritabanı, veri ambarı, veri gölü", "Database, warehouse, lake"),
          summary: L(
            "Üçü de veri saklar ama üçü tamamen farklı iş için tasarlandı.",
            "All three store data, and all three were designed for completely different jobs.",
          ),
          minutes: 14,
          blocks: [
            text(
              "**İşlemsel veritabanı (OLTP)** — PostgreSQL, MySQL. Uygulamanın çalıştığı yer. Tek satırı çok hızlı okur ve yazar; **satır tabanlıdır**. \"1234 numaralı siparişi getir\" için mükemmeldir. \"Son üç yılın ciro toplamı\" için felakettir.\n\n**Veri ambarı (OLAP)** — Snowflake, BigQuery, Redshift. Analiz için tasarlanmıştır. **Sütun tabanlıdır**: yalnızca sorduğun sütunları okur, bu yüzden milyarlarca satırda toplama yapabilir. Tek satır güncellemede ise yavaştır.\n\n**Veri gölü** — S3, ADLS üzerinde dosyalar. Her formatta ham veriyi ucuza saklar: CSV, JSON, Parquet, görüntü, log. Şema **okuma anında** uygulanır. Ucuzdur ve esnektir; ama disiplin yoksa \"veri bataklığına\" döner.\n\n**Lakehouse** — Son yılların yaklaşımı. Veri gölünün ucuzluğunu ambarın güvenilirliğiyle birleştirir (Delta Lake, Iceberg). Fabric ve Databricks bunun üzerine kuruludur.",
              "**Transactional database (OLTP)** — PostgreSQL, MySQL. Where the application runs. It reads and writes single rows very fast and is **row-oriented**. Perfect for \"fetch order 1234\". Disastrous for \"total revenue over three years\".\n\n**Data warehouse (OLAP)** — Snowflake, BigQuery, Redshift. Built for analysis. It is **columnar**: it reads only the columns you asked for, which is how it aggregates across billions of rows. It is slow at updating a single row.\n\n**Data lake** — files on S3 or ADLS. It stores raw data of any format cheaply: CSV, JSON, Parquet, images, logs. Schema is applied **on read**. Cheap and flexible; but without discipline it turns into a \"data swamp\".\n\n**Lakehouse** — the approach of recent years. It marries the lake's low cost with the warehouse's reliability (Delta Lake, Iceberg). Fabric and Databricks are built on it.",
            ),
            quiz({
              id: "q2",
              q: [
                "OLTP veritabanı (PostgreSQL, MySQL) hangi görev için tasarlanmıştır?",
                "What is an OLTP database (PostgreSQL, MySQL) designed for?",
              ],
              options: [
                [
                  "Tek satırı çok hızlı okumak/yazmak, örn. \"1234 numaralı siparişi getir\"",
                  "Reading/writing a single row very fast, e.g. \"fetch order 1234\"",
                ],
                ["Milyarlarca satırda toplama yapmak", "Aggregating across billions of rows"],
                ["Ham dosyaları ucuza saklamak", "Storing raw files cheaply"],
                ["Sadece raporlama yapmak", "Only reporting"],
              ],
              answer: 0,
              explain: [
                "OLTP satır tabanlıdır ve uygulamanın anlık işlemlerine hizmet eder — tek bir kaydı hızlı bulup güncellemek için optimize edilmiştir. Büyük toplama sorguları için tasarlanmamıştır.",
                "OLTP is row-oriented and serves the application's live transactions — optimised to find and update a single record fast. It was not designed for large aggregation queries.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Ders neden \"son üç yılın ciro toplamı\" sorgusunu OLTP için felaket olarak niteliyor?",
                "Why does the lesson call \"total revenue over three years\" a disaster for OLTP?",
              ],
              options: [
                [
                  "Satır tabanlı yapı büyük toplama sorgularında verimsizdir",
                  "The row-oriented structure is inefficient for large aggregation queries",
                ],
                ["OLTP hiç sorgu çalıştıramaz", "OLTP cannot run queries at all"],
                ["OLTP'de SQL desteklenmez", "OLTP does not support SQL"],
                ["Veriler şifrelidir", "The data is encrypted"],
              ],
              answer: 0,
              explain: [
                "Satır tabanlı depolamada bir toplama sorgusu, ilgisiz sütunlar da dahil tüm satırları taramak zorunda kalır. Bu, milyonlarca satırda yavaş ve pahalıdır.",
                "In row-oriented storage, an aggregation query has to scan whole rows, including irrelevant columns. Across millions of rows this is slow and expensive.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Veri ambarı (OLAP) tek satır güncellemede neden yavaştır?",
                "Why is a data warehouse (OLAP) slow at updating a single row?",
              ],
              options: [
                [
                  "Sütun tabanlı yapı toplu okuma için optimize edilmiştir, tekil satır işlemleri için değil",
                  "The columnar layout is optimised for bulk reads, not single-row operations",
                ],
                ["Ambarlar hiç veri yazamaz", "Warehouses cannot write data at all"],
                ["Ambarlar şema kullanmaz", "Warehouses use no schema"],
                ["Ambarlar sadece bulutta çalışır", "Warehouses only run in the cloud"],
              ],
              answer: 0,
              explain: [
                "Sütun tabanlı depolama, bir satırın sütunlarını farklı yerlerde tutar; bu da toplu analiz için hızlı ama tek bir satırı güncellemek için pahalıdır.",
                "Columnar storage keeps a row's columns in separate places; great for bulk analysis but expensive when you just want to update one row.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Veri gölünde (data lake) şema ne zaman uygulanır?",
                "When is schema applied in a data lake?",
              ],
              options: [
                ["Okuma anında (schema on read)", "On read (schema on read)"],
                ["Yazma anında (schema on write)", "On write (schema on write)"],
                ["Hiçbir zaman uygulanmaz", "It is never applied"],
                ["Sadece haftalık", "Only weekly"],
              ],
              answer: 0,
              explain: [
                "Veri gölü, herhangi bir formattaki ham veriyi önce saklar; şema yapısı, veriyi okuyan uygulama tarafından okuma sırasında yorumlanır. Bu esnekliği verir ama disiplinsizlikte bataklığa dönüşür.",
                "A data lake stores raw data of any format first; the schema is interpreted by the reading application at read time. This gives flexibility but turns into a swamp without discipline.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Disiplinsiz kullanılan bir veri gölü neye dönüşme riski taşır?",
                "What is a data lake used without discipline at risk of becoming?",
              ],
              options: [
                ["Veri bataklığı (data swamp)", "A data swamp"],
                ["Otomatik veri ambarı", "An automatic warehouse"],
                ["Daha hızlı bir OLTP", "A faster OLTP"],
                ["Bir CDN", "A CDN"],
              ],
              answer: 0,
              explain: [
                "Şema okuma anında uygulandığı ve giriş kontrolü gevşek olduğu için, düzenlenmeyen bir göl kısa sürede kimsenin ne olduğunu bilmediği dosyalarla dolar — buna \"veri bataklığı\" denir.",
                "Because schema is applied on read and entry is loosely controlled, an unmanaged lake quickly fills with files nobody understands — this is called a \"data swamp\".",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Lakehouse yaklaşımı hangi iki özelliği birleştirir?",
                "Which two properties does the lakehouse approach combine?",
              ],
              options: [
                [
                  "Veri gölünün ucuzluğu ile veri ambarının güvenilirliği",
                  "The data lake's low cost with the warehouse's reliability",
                ],
                ["OLTP hızı ile CDN esnekliği", "OLTP speed with CDN flexibility"],
                ["Sadece görsel dosya desteği", "Only image file support"],
                ["Yerel disk ve bulut yedekleme", "Local disk and cloud backup"],
              ],
              answer: 0,
              explain: [
                "Lakehouse, Delta Lake veya Iceberg gibi teknolojilerle göldeki ham verinin üzerine ambar disipliniyle şema ve işlem garantisi ekler — iki dünyanın avantajını birleştirir.",
                "The lakehouse, via technologies like Delta Lake or Iceberg, adds warehouse-grade schema and transaction guarantees on top of the lake's raw data — combining the best of both.",
              ],
            }),
            pitfall(
              "Analitik sorguyu üretim veritabanında çalıştırma",
              "Never run analytics on the production database",
              "Analistlerin uygulama veritabanına doğrudan bağlanması, veri ekiplerinin klasik ilk günahıdır. Ağır bir `GROUP BY` sorgusu üretim veritabanını kilitler ve **müşteriye hizmet veren uygulama yavaşlar veya durur**.\n\nÇözüm bir okuma kopyası (read replica) veya — daha doğrusu — veriyi ambara aktarmaktır. Ambara aktarma ayrıca geçmişi saklamanı sağlar: üretim veritabanı yalnızca **bugünkü** durumu tutar, ambar ise değişimin tarihçesini.",
              "Letting analysts connect straight to the application database is the classic original sin of data teams. One heavy `GROUP BY` locks the production database and **the customer-facing application slows down or stops**.\n\nThe answer is a read replica or — better — moving the data into a warehouse. Moving it also lets you keep history: the production database holds only **today's** state, while the warehouse holds how it changed.",
            ),
            quiz({
              id: "q8",
              q: [
                "Analistlerin ağır bir `GROUP BY` sorgusunu doğrudan üretim veritabanında çalıştırması neden risklidir?",
                "Why is it risky for analysts to run a heavy `GROUP BY` query directly on the production database?",
              ],
              options: [
                [
                  "Veritabanını kilitleyerek müşteriye hizmet veren uygulamayı yavaşlatabilir veya durdurabilir",
                  "It can lock the database and slow down or stop the customer-facing application",
                ],
                ["Sorgu hiç çalışmaz", "The query simply will not run"],
                ["Veriler otomatik silinir", "The data gets automatically deleted"],
                ["Hiçbir riski yoktur", "There is no risk at all"],
              ],
              answer: 0,
              explain: [
                "OLTP tek satır işlemleri için optimize edilmiştir. Ağır bir analitik sorgu kaynakları tüketip kilitlenmeye yol açar ve bu doğrudan üretimdeki uygulamayı etkiler — yani müşteriyi.",
                "OLTP is optimised for single-row operations. A heavy analytical query eats resources and causes locking, which directly hits the production application — and the customer.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Veriyi ambara taşımanın, sadece performans dışında sağladığı ek fayda nedir?",
                "Beyond performance, what extra benefit does moving data into a warehouse give?",
              ],
              options: [
                [
                  "Geçmişi saklama imkânı — üretim veritabanı sadece bugünü tutarken ambar değişim tarihçesini tutar",
                  "The ability to keep history — the production database holds only today's state, the warehouse holds how it changed",
                ],
                ["Uygulamayı otomatik olarak hızlandırır", "It automatically speeds up the application"],
                ["Kod yazma ihtiyacını ortadan kaldırır", "It removes the need to write code"],
                ["Veriyi şifresiz hale getirir", "It makes the data unencrypted"],
              ],
              answer: 0,
              explain: [
                "Üretim veritabanı genelde sadece güncel durumu tutar (üzerine yazar). Veriyi ambara taşıdığında geçmiş kayıtları da tutabilir, yani \"geçen ay ne durumdaydı?\" sorusuna cevap verebilirsin.",
                "The production database usually keeps only the current state (it overwrites). Moving data into a warehouse lets you retain history too — so you can answer \"what was the state last month?\"",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Sütun tabanlı depolama analitik sorgularda neden hızlıdır?",
                "Why is columnar storage fast for analytical queries?",
              ],
              options: [
                [
                  "Yalnızca sorguda geçen sütunları okur; 200 sütunlu tabloda 3 sütun için diskin %1,5'ini tarar",
                  "It reads only the columns in the query; on a 200-column table it scans 1.5% of the disk for 3 columns",
                ],
                ["Veriyi sıkıştırmaz", "It does not compress the data"],
                ["Daha fazla bellek kullanır", "It uses more memory"],
                ["İndeks gerektirmez", "It needs no indexes"],
              ],
              answer: 0,
              explain: [
                "Satır tabanlı depolamada bir satırın tüm sütunları yan yana durur, bu yüzden üç sütun için bile tüm satırı diskten okursun. Sütun tabanlı depoda her sütun ayrı saklanır. Ayrıca aynı tipteki değerler bir arada olduğu için sıkıştırma da çok daha etkilidir — çift kazanç.",
                "In row storage a row's columns sit together, so you read the whole row off disk even for three columns. In columnar storage each column is stored separately. And because values of the same type sit together, compression is far more effective too — a double win.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "\"Öncelikle veri gölünün ucuzluğunu, sonra ambarın güvenilirliğini istiyorum\" diyen bir ekip hangi depolama seçeneğine yönelmelidir?",
                "A team wanting first the data lake's low cost, then the warehouse's reliability should reach for which storage option?",
              ],
              options: [
                ["Lakehouse", "A lakehouse"],
                ["Salt OLTP", "Plain OLTP"],
                ["Yerel CSV dosyaları", "Local CSV files"],
                ["Sadece BI aracı", "Just a BI tool"],
              ],
              answer: 0,
              explain: [
                "Lakehouse tam olarak bu ihtiyaç için tasarlandı: Delta Lake veya Iceberg gibi teknolojilerle gölün ucuz depolamasına ambarın şema ve işlem güvenilirliğini ekler.",
                "The lakehouse was designed exactly for this need: via technologies like Delta Lake or Iceberg it adds warehouse-grade schema and transaction reliability on top of the lake's cheap storage.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "toplu-mu-akis-mi",
          title: L("Toplu işleme mi, akış mı?", "Batch or streaming?"),
          summary: L(
            "Veriyi her gece mi yoksa saniye saniye mi işlemelisin? Karar maliyeti belirler.",
            "Should you process data nightly or second by second? The decision drives the cost.",
          ),
          minutes: 14,
          blocks: [
            text(
              "**Toplu işleme (batch)** — Veri belirli aralıklarla, gruplar hâlinde işlenir: her gece 02:00'de, her saat başı. Veri mühendisliğinin **%90'ı** budur.\n\n- ✅ Basit, ucuz, hata ayıklaması kolay\n- ✅ Başarısız olursa tekrar çalıştırırsın\n- ❌ Veri işlem aralığı kadar gecikmeli\n\n**Akış işleme (streaming)** — Veri geldiği anda işlenir (Kafka, Flink, Kinesis).\n\n- ✅ Saniyeler içinde güncel\n- ❌ Karmaşık: geç gelen olaylar, sıra bozulması, tekrarlanan mesajlar\n- ❌ Pahalı — hem altyapı hem insan zamanı\n- ❌ Hata ayıklaması zor; \"dün geceki veriyi tekrar işle\" demek kolay değil",
              "**Batch** — data is processed in groups at intervals: every night at 02:00, every hour. This is **90%** of data engineering.\n\n- ✅ Simple, cheap, easy to debug\n- ✅ If it fails you just run it again\n- ❌ Data is as stale as the interval\n\n**Streaming** — data is processed the moment it arrives (Kafka, Flink, Kinesis).\n\n- ✅ Current within seconds\n- ❌ Complex: late-arriving events, out-of-order data, duplicate messages\n- ❌ Expensive — in infrastructure and in engineer time\n- ❌ Hard to debug; \"reprocess last night's data\" is not a simple request",
            ),
            quiz({
              id: "q2",
              q: [
                "Toplu işleme, veri mühendisliği işlerinin yaklaşık yüzde kaçını oluşturur?",
                "Roughly what percentage of data engineering work is batch processing?",
              ],
              options: [
                ["%90", "90%"],
                ["%10", "10%"],
                ["%50", "50%"],
                ["%100", "100%"],
              ],
              answer: 0,
              explain: [
                "Ders açıkça belirtir: toplu işleme veri mühendisliğinin %90'ıdır. Akış, dar ve gerçekten gerekli olan durumlar için ayrılır.",
                "The lesson states this directly: batch is 90% of data engineering. Streaming is reserved for the narrow cases that genuinely need it.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Toplu işlemenin başarısız olması durumunda tipik çözüm nedir?",
                "What is the typical fix when a batch job fails?",
              ],
              options: [
                ["İşi tekrar çalıştırmak", "Just run the job again"],
                ["Tüm sistemi yeniden kurmak", "Rebuild the entire system"],
                ["Akış işlemeye geçmek", "Switch to streaming"],
                ["Veriyi silmek", "Delete the data"],
              ],
              answer: 0,
              explain: [
                "Toplu işlemenin en büyük pratik avantajı budur: iş başarısız olursa basitçe yeniden çalıştırırsın. Akışta bu kadar kolay değildir çünkü olaylar zaten geçmiştir.",
                "This is batch's biggest practical advantage: if the job fails, you simply run it again. In streaming this is not as easy because the events have already passed.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Akış işlemenin karmaşıklığına yol açan sorunlardan biri olarak \"sıra bozulması\" ne anlama gelir?",
                "As a source of streaming complexity, what does \"out-of-order data\" mean?",
              ],
              options: [
                [
                  "Olayların üretildikleri sırayla değil, farklı bir sırayla sisteme ulaşması",
                  "Events arriving at the system in a different order than they were produced",
                ],
                ["Verinin alfabetik sırada olmaması", "Data not being in alphabetical order"],
                ["Tabloların yanlış sütun sırasında olması", "Tables having the wrong column order"],
                ["Kodun yanlış satırda çalışması", "Code running on the wrong line"],
              ],
              answer: 0,
              explain: [
                "Ağ gecikmeleri veya farklı kaynaklar yüzünden olaylar üretildikleri sırayla değil, karışık sırayla gelebilir. Akış sistemleri bunu doğru sırayla işlemek için ekstra mantık gerektirir.",
                "Because of network delays or multiple sources, events can arrive out of the order they were produced. Streaming systems need extra logic to process them in the correct order regardless.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Akış işleme neden pahalıdır?",
                "Why is streaming expensive?",
              ],
              options: [
                [
                  "Hem altyapı hem de bunu doğru işletecek insan zamanı gerektirir",
                  "It requires both infrastructure and the engineer time to run it correctly",
                ],
                ["Sadece lisans ücreti yüksektir", "Only the licence fee is high"],
                ["Depolama alanı gerektirmez", "It requires no storage at all"],
                ["Hiçbir zaman pahalı değildir", "It is never expensive"],
              ],
              answer: 0,
              explain: [
                "Kafka, Flink gibi sistemleri kurmak, izlemek ve geç gelen/tekrarlanan olaylar gibi uç durumları yönetmek hem altyapı maliyeti hem de sürekli mühendis emeği ister.",
                "Standing up systems like Kafka or Flink, monitoring them, and handling edge cases like late or duplicate events costs both infrastructure and ongoing engineer effort.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "\"Dün geceki veriyi tekrar işle\" isteği neden akışta basit bir istek değildir?",
                "Why is \"reprocess last night's data\" not a simple request in streaming?",
              ],
              options: [
                [
                  "Olaylar zaten akıp geçmiştir; toplu işlemedeki gibi tek komutla yeniden çalıştırmak mümkün değildir",
                  "The events have already flowed through; you cannot simply rerun a single command as in batch",
                ],
                ["Akışta veri hiç saklanmaz", "Streaming never stores any data"],
                ["Bu istek toplu işlemede de zordur", "This request is equally hard in batch"],
                ["Akış sistemleri komut satırını desteklemez", "Streaming systems do not support command lines"],
              ],
              answer: 0,
              explain: [
                "Toplu işte veri hâlâ kaynakta veya ara depoda durur, yeniden çalıştırmak kolaydır. Akışta olaylar anlık işlenip geçtiği için geçmişi yeniden oynatmak ayrı bir altyapı (event replay) gerektirir.",
                "In batch, the data still sits at the source or in an intermediate store, so rerunning is easy. In streaming events are processed and gone, so replaying history needs separate infrastructure (event replay).",
              ],
            }),
            tip(
              "Gerçek zamanlı ihtiyacını sorgula",
              "Interrogate the real-time requirement",
              "\"Veri gerçek zamanlı olsun\" isteği neredeyse her projede duyulur ve neredeyse hiçbirinde gerçek bir ihtiyaç değildir. Doğru soru şudur: **\"Bu veriyle 5 dakika içinde bir karar veriyor musun?\"**\n\nCevap hayırsa (ki genelde hayırdır — rapor haftalık toplantıda bakılıyorsa) toplu işleme yeterlidir ve sana on kat daha ucuz, on kat daha güvenilir bir sistem verir.\n\nAkış gerçekten gereken durumlar dardır: dolandırıcılık tespiti, canlı operasyon panosu, öneri motoru, alarm sistemleri. Bunların ortak özelliği, **gecikmenin doğrudan para kaybettirmesidir**.",
              "\"The data must be real-time\" is heard on nearly every project and is almost never a genuine requirement. The right question is: **\"do you make a decision on this data within five minutes?\"**\n\nIf the answer is no — and it usually is, if the report is reviewed in a weekly meeting — batch is enough and gives you a system ten times cheaper and ten times more reliable.\n\nThe cases that genuinely need streaming are narrow: fraud detection, live operations dashboards, recommendation engines, alerting. What they share is that **latency directly costs money**.",
            ),
            quiz({
              id: "q7",
              q: [
                "\"Veri gerçek zamanlı olsun\" isteğini değerlendirirken sorulması gereken doğru soru nedir?",
                "When evaluating a \"the data must be real-time\" request, what is the right question to ask?",
              ],
              options: [
                [
                  "Bu veriyle 5 dakika içinde bir karar veriyor musun?",
                  "Do you make a decision on this data within five minutes?",
                ],
                ["Veri ne kadar büyük?", "How big is the data?"],
                ["Bütçe ne kadar?", "What is the budget?"],
                ["Kaç kullanıcı var?", "How many users are there?"],
              ],
              answer: 0,
              explain: [
                "Gerçek ihtiyacı ortaya çıkaran soru budur. Cevap hayırsa — ki genelde öyledir — toplu işleme yeterlidir ve akışın karmaşıklığından kaçınmış olursun.",
                "This is the question that surfaces the real need. If the answer is no — which it usually is — batch suffices and you avoid streaming's complexity.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Aşağıdakilerden hangisi, akışın gerçekten gerekli olduğu dar durumlardan biri DEĞİLDİR?",
                "Which of these is NOT one of the narrow cases that genuinely need streaming?",
              ],
              options: [
                [
                  "Yönetimin ayda bir baktığı özet performans raporu",
                  "A summary performance report management reviews once a month",
                ],
                ["Dolandırıcılık tespiti", "Fraud detection"],
                ["Canlı operasyon panosu", "A live operations dashboard"],
                ["Alarm sistemleri", "Alerting systems"],
              ],
              answer: 0,
              explain: [
                "Ayda bir bakılan bir rapor için beş dakikalık gecikme önemsizdir — toplu işleme fazlasıyla yeterlidir. Dersin saydığı gerçek akış ihtiyaçları dolandırıcılık tespiti, canlı panolar, öneri motorları ve alarm sistemleridir.",
                "For a report reviewed once a month, a five-minute delay is irrelevant — batch is more than enough. The genuine streaming needs the lesson lists are fraud detection, live dashboards, recommendation engines and alerting.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Akışın gerçekten gerekli olduğu durumların ortak özelliği nedir?",
                "What do the cases that genuinely need streaming have in common?",
              ],
              options: [
                ["Gecikme doğrudan para kaybettirir", "Latency directly costs money"],
                ["Hepsi küçük veri kullanır", "They all use small data"],
                ["Hiçbiri internet gerektirmez", "None of them require the internet"],
                ["Hepsi ücretsizdir", "They are all free"],
              ],
              answer: 0,
              explain: [
                "Dolandırıcılık tespiti, canlı panolar, öneri motorları ve alarmların ortak noktası, birkaç dakikalık gecikmenin bile doğrudan maddi veya operasyonel zarara yol açmasıdır.",
                "Fraud detection, live dashboards, recommendation engines and alerting share this: even a few minutes of latency directly causes financial or operational damage.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Yönetimin her sabah baktığı satış raporu için hangi yaklaşım doğrudur?",
                "Which approach is right for a sales report management reads each morning?",
              ],
              options: [
                [
                  "Gecelik toplu işleme — rapor sabah bakılıyor, gece işlemek yeterli",
                  "Nightly batch — the report is read in the morning, so overnight processing is enough",
                ],
                ["Akış işleme", "Streaming"],
                ["Saniyelik yenileme", "Second-by-second refresh"],
                ["Elle güncelleme", "Manual updates"],
              ],
              answer: 0,
              explain: [
                "Rapor sabah okunuyorsa gece 03:00'te çalışan bir iş yeterlidir ve akış altyapısının karmaşıklığını, maliyetini ve kırılganlığını tamamen ortadan kaldırır. Mühendislikte doğru karar çoğu zaman en gelişmiş olan değil, ihtiyaca **yeten en basit** olandır.",
                "If the report is read in the morning, a job running at 03:00 is sufficient and removes all the complexity, cost and fragility of streaming infrastructure. In engineering the right decision is usually not the most advanced option but the **simplest one that suffices**.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir dolandırıcılık tespit sistemi için hangi yaklaşım genellikle doğrudur?",
                "Which approach is generally right for a fraud detection system?",
              ],
              options: [
                [
                  "Akış işleme — gecikme doğrudan maddi zarara yol açar",
                  "Streaming — latency directly causes financial damage",
                ],
                ["Haftalık toplu işleme", "Weekly batch"],
                ["Aylık toplu işleme", "Monthly batch"],
                ["Elle kontrol", "Manual review"],
              ],
              answer: 0,
              explain: [
                "Dolandırıcılık tespiti, dersin saydığı akışın gerçekten gerekli olduğu dar durumlardan biridir: işlem gerçekleşirken saniyeler içinde karar vermek gerekir, aksi hâlde zarar önlenemez.",
                "Fraud detection is one of the narrow cases the lesson lists where streaming is genuinely needed: the decision must happen within seconds of the transaction, or the damage cannot be prevented.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "junior",
      title: L("ETL ve ELT", "ETL and ELT"),
      description: L(
        "Veri akışının anatomisi ve modern veri yığınının parçaları.",
        "The anatomy of a data pipeline and the pieces of the modern data stack.",
      ),
      lessons: [
        lesson({
          slug: "etl-elt",
          title: L("ETL, ELT ve modern veri yığını", "ETL, ELT and the modern data stack"),
          summary: L(
            "Neden sıralamayı değiştirdik ve bu neyi değiştirdi?",
            "Why the industry swapped two letters, and what changed because of it.",
          ),
          minutes: 15,
          blocks: [
            text(
              "**ETL** (Extract → Transform → Load): veriyi çek, dönüştür, sonra ambara yaz. Depolama pahalıyken doğru yaklaşımdı.\n\n**ELT** (Extract → Load → Transform): veriyi çek, **ham haliyle** ambara yaz, dönüşümü ambarın içinde SQL ile yap. Bulut ambarları ucuz ve güçlü olduğu için bugün varsayılan budur.\n\nELT'nin asıl kazancı: ham veri elinde kaldığı için iş kuralı değiştiğinde geçmişi yeniden işleyebilirsin.",
              "**ETL** (Extract → Transform → Load): pull, transform, then write to the warehouse. It was the right call when storage was expensive.\n\n**ELT** (Extract → Load → Transform): pull, load the **raw** data into the warehouse, then transform inside it with SQL. Cloud warehouses are cheap and powerful, so this is the default today.\n\nELT's real win: because you kept the raw data, you can reprocess history when a business rule changes.",
            ),
            quiz({
              id: "q2",
              q: [
                "ETL'de adımların sırası nasıldır?",
                "In what order do the steps run in ETL?",
              ],
              options: [
                ["Extract → Transform → Load", "Extract → Transform → Load"],
                ["Extract → Load → Transform", "Extract → Load → Transform"],
                ["Load → Extract → Transform", "Load → Extract → Transform"],
                ["Transform → Extract → Load", "Transform → Extract → Load"],
              ],
              answer: 0,
              explain: [
                "ETL adının kendisi sırayı verir: önce çek, sonra dönüştür, en son ambara yaz. Dönüşüm ambara yazılmadan önce, ambarın dışında yapılır.",
                "ETL's name itself gives the order: extract first, then transform, then write to the warehouse. Transformation happens outside the warehouse, before loading.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "ELT'de adımların sırası nasıldır?",
                "In what order do the steps run in ELT?",
              ],
              options: [
                ["Extract → Load → Transform", "Extract → Load → Transform"],
                ["Extract → Transform → Load", "Extract → Transform → Load"],
                ["Transform → Load → Extract", "Transform → Load → Extract"],
                ["Load → Transform → Extract", "Load → Transform → Extract"],
              ],
              answer: 0,
              explain: [
                "ELT'de ham veri önce ambara yüklenir, dönüşüm ambarın içinde SQL ile en son yapılır. İki harfin yer değiştirmesi tüm yaklaşımı değiştirir.",
                "In ELT the raw data is loaded into the warehouse first, and transformation happens last, inside the warehouse with SQL. Swapping two letters changes the whole approach.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "ETL neden depolamanın pahalı olduğu dönemde doğru yaklaşımdı?",
                "Why was ETL the right approach when storage was expensive?",
              ],
              options: [
                [
                  "Veri ambara yazılmadan önce dönüştürülüp küçültüldüğü için gereksiz ham veri depolanmazdı",
                  "Data was transformed and slimmed before writing, so no unnecessary raw data was stored",
                ],
                ["ETL hiç depolama kullanmazdı", "ETL used no storage at all"],
                ["ETL'de SQL gerekmezdi", "ETL required no SQL"],
                ["ETL bulut olmadan çalışamazdı", "ETL could not run without the cloud"],
              ],
              answer: 0,
              explain: [
                "Depolama pahalıyken, ihtiyaç duyulmayan ham veriyi ambara hiç yazmamak mantıklıydı. Dönüşüm ambarın dışında yapılıp yalnızca gerekli sonuç ambara yazılırdı.",
                "When storage was expensive, it made sense never to write unneeded raw data into the warehouse. Transformation happened outside it, and only the needed result was written in.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "ELT'nin bugün varsayılan yaklaşım olmasının temel nedeni nedir?",
                "What is the main reason ELT is the default approach today?",
              ],
              options: [
                ["Bulut ambarları ucuz ve güçlü hâle geldi", "Cloud warehouses became cheap and powerful"],
                ["SQL artık kullanılmıyor", "SQL is no longer used"],
                ["Ham veri artık yasak", "Raw data is now forbidden"],
                ["Depolama pahalılaştı", "Storage became more expensive"],
              ],
              answer: 0,
              explain: [
                "Bulut ambarlarının ucuzlaması ve işlem gücünün artması, ham veriyi önce yükleyip dönüşümü ambarın güçlü SQL motorunda yapmayı hem daha kolay hem daha ucuz hâle getirdi.",
                "As cloud warehouses got cheaper and more powerful, loading raw data first and doing the transform in the warehouse's own strong SQL engine became both easier and cheaper.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "ELT'de dönüşüm işlemi nerede gerçekleşir?",
                "Where does transformation happen in ELT?",
              ],
              options: [
                ["Ambarın içinde, SQL ile", "Inside the warehouse, with SQL"],
                ["Kaynaktan çekilmeden önce", "Before it is even pulled from the source"],
                ["Ambara hiç dokunulmadan", "Without ever touching the warehouse"],
                ["Sadece analistin bilgisayarında", "Only on the analyst's own laptop"],
              ],
              answer: 0,
              explain: [
                "ELT'de veri önce ham hâliyle ambara yüklenir; dönüşüm bu ham katman üzerinde, ambarın SQL motoruyla en son adımda yapılır.",
                "In ELT the data is loaded raw into the warehouse first; transformation happens on top of that raw layer, as the last step, using the warehouse's own SQL engine.",
              ],
            }),
            text(
              "Modern veri yığınının katmanları:\n\n- **Alma (ingestion)** — Fivetran, Airbyte, özel Python betikleri\n- **Depolama** — Snowflake, BigQuery, Databricks, Microsoft Fabric\n- **Dönüşüm** — dbt (SQL ile modelleme ve test)\n- **Orkestrasyon** — Airflow, Dagster, Prefect\n- **Sunum** — Power BI, Tableau, Looker\n- **Gözlemlenebilirlik** — veri kalitesi testleri, soy takibi, uyarılar",
              "The layers of the modern data stack:\n\n- **Ingestion** — Fivetran, Airbyte, custom Python\n- **Storage** — Snowflake, BigQuery, Databricks, Microsoft Fabric\n- **Transformation** — dbt (modelling and testing in SQL)\n- **Orchestration** — Airflow, Dagster, Prefect\n- **Serving** — Power BI, Tableau, Looker\n- **Observability** — data quality tests, lineage, alerting",
            ),
            quiz({
              id: "q7",
              q: [
                "Bu derste dönüşüm katmanına örnek olarak hangi araç verilir?",
                "Which tool is given as the transformation-layer example in this lesson?",
              ],
              options: [
                ["dbt", "dbt"],
                ["Power BI", "Power BI"],
                ["Airflow", "Airflow"],
                ["Fivetran", "Fivetran"],
              ],
              answer: 0,
              explain: [
                "dbt, ham veriyi SQL ile modelleyip test etmeye yarayan araçtır — ELT'nin \"T\" (transform) adımını ambarın içinde gerçekleştirir.",
                "dbt is the tool for modelling and testing raw data with SQL — it carries out ELT's \"T\" (transform) step inside the warehouse.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Orkestrasyon katmanında örnek olarak hangi araçlar sayılır?",
                "Which tools are given as examples for the orchestration layer?",
              ],
              options: [
                ["Airflow, Dagster, Prefect", "Airflow, Dagster, Prefect"],
                ["Power BI, Tableau, Looker", "Power BI, Tableau, Looker"],
                ["Fivetran, Airbyte", "Fivetran, Airbyte"],
                ["Snowflake, BigQuery", "Snowflake, BigQuery"],
              ],
              answer: 0,
              explain: [
                "Airflow, Dagster ve Prefect işlerin ne zaman ve hangi sırayla çalışacağını yönetir — bunlar orkestrasyon katmanının tipik araçlarıdır.",
                "Airflow, Dagster and Prefect manage when and in what order jobs run — these are the typical tools of the orchestration layer.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Gözlemlenebilirlik katmanı neyi kapsar?",
                "What does the observability layer cover?",
              ],
              options: [
                ["Veri kalitesi testleri, soy takibi, uyarılar", "Data quality tests, lineage, alerting"],
                ["Sadece raporlama panoları", "Only reporting dashboards"],
                ["Sadece kaynak sistemler", "Only source systems"],
                ["Sadece işlerin zamanlanması", "Only job scheduling"],
              ],
              answer: 0,
              explain: [
                "Gözlemlenebilirlik, verinin sadece akmasını değil doğru akmasını izler: kalite testleri, hangi tablonun hangisinden beslendiğini gösteren soy takibi ve sorun olduğunda uyarı üretme.",
                "Observability watches not just that data flows but that it flows correctly: quality tests, lineage showing which table feeds which, and alerting when something is wrong.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Sunum katmanında örnek olarak hangi araçlar sayılır?",
                "Which tools are given as examples for the serving layer?",
              ],
              options: [
                ["Power BI, Tableau, Looker", "Power BI, Tableau, Looker"],
                ["Airflow, Dagster, Prefect", "Airflow, Dagster, Prefect"],
                ["dbt, SQL", "dbt, SQL"],
                ["Fivetran, Airbyte", "Fivetran, Airbyte"],
              ],
              answer: 0,
              explain: [
                "Power BI, Tableau ve Looker, dönüşüm katmanından çıkan temiz verinin son kullanıcıya ulaştığı BI araçlarıdır — sunum katmanının tipik örnekleridir.",
                "Power BI, Tableau and Looker are the BI tools where clean data from the transformation layer reaches end users — typical examples of the serving layer.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "ELT yaklaşımının ETL'e göre temel avantajı nedir?",
                "What is ELT's key advantage over ETL?",
              ],
              options: [
                [
                  "Ham veri saklandığı için iş kuralı değişince geçmiş yeniden işlenebilir",
                  "Raw data is retained, so history can be reprocessed when a rule changes",
                ],
                ["Daha az depolama kullanır", "It uses less storage"],
                ["Kod yazmayı tamamen ortadan kaldırır", "It removes the need to write code"],
                ["Sadece küçük veri için uygundur", "It only suits small data"],
              ],
              answer: 0,
              explain: [
                "ETL'de dönüşüm sırasında atılan veri geri gelmez. ELT'de ham katman durduğu için üç ay sonra \"aslında iadeleri de saymalıydık\" dendiğinde geçmişi yeniden hesaplayabilirsin. Bunun bedeli daha fazla depolamadır — ki bugün en ucuz kaynak odur.",
                "In ETL, data dropped during transformation is gone. With ELT the raw layer survives, so when someone says three months later \"actually we should have counted returns\", you can recompute history. The cost is more storage — the cheapest resource you have.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "mid",
      title: L("Modelleme ve orkestrasyon", "Modelling and orchestration"),
      description: L(
        "Boyutsal modelleme, dbt ile dönüşüm ve Airflow ile zamanlama.",
        "Dimensional modelling, transformation with dbt and scheduling with Airflow.",
      ),
      projectSlug: "de-etl-pipeline",
      lessons: [
        lesson({
          slug: "modelleme-ve-airflow",
          title: L("Boyutsal modelleme ve orkestrasyon", "Dimensional modelling and orchestration"),
          summary: L(
            "Ambarın şeması ve akışın zamanlaması: veri mühendisliğinin iki temel kararı.",
            "The warehouse schema and the pipeline schedule: data engineering's two core decisions.",
          ),
          minutes: 18,
          blocks: [
            text(
              "**Yıldız şema** ambar modellemenin standardıdır: merkezde olgu (fact) tablosu, çevresinde boyut (dimension) tabloları. Fact tablosu **grain**'i (bir satır neyi temsil eder?) net olarak tanımlanmalıdır — \"bir satır = bir sipariş satırı\" gibi.\n\n**Yavaş değişen boyutlar (SCD)** geçmişi korumanın yoludur:\n\n- **Tip 1** — üzerine yaz, geçmiş kaybolur\n- **Tip 2** — yeni satır ekle, `gecerli_baslangic` / `gecerli_bitis` tut; müşteri şehir değiştirdiğinde eski siparişler eski şehirle kalır",
              "The **star schema** is the standard for warehouse modelling: a fact table in the middle, dimensions around it. The fact table's **grain** (what does one row represent?) must be stated explicitly — \"one row = one order line\".\n\n**Slowly changing dimensions (SCD)** are how you preserve history:\n\n- **Type 1** — overwrite, history is lost\n- **Type 2** — insert a new row with `valid_from` / `valid_to`; when a customer moves city, old orders keep the old city",
            ),
            quiz({
              id: "q1",
              q: [
                "Yıldız şemada merkezde hangi tablo bulunur?",
                "In a star schema, which table sits in the middle?",
              ],
              options: [
                ["Olgu (fact) tablosu, çevresinde boyut tabloları ile", "The fact table, with dimension tables around it"],
                ["Boyut tablosu, çevresinde olgu tabloları ile", "A dimension table, with fact tables around it"],
                ["Sadece bir tane tablo vardır", "There is only ever one table"],
                ["Hiçbiri, tablolar rastgele dizilir", "Neither — tables are arranged randomly"],
              ],
              answer: 0,
              explain: [
                "Yıldız şemanın adı buradan gelir: merkezde ölçülebilir olayları tutan fact tablosu, çevresinde bu olayları tanımlayan boyut (dimension) tabloları yer alır.",
                "This is where the star schema gets its name: the fact table holding measurable events sits in the middle, with dimension tables describing those events around it.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Fact tablosunun \"grain\"i neyi ifade eder?",
                "What does the fact table's \"grain\" express?",
              ],
              options: [
                [
                  "Bir satırın neyi temsil ettiğini — örn. \"bir satır = bir sipariş satırı\"",
                  "What one row represents — e.g. \"one row = one order line\"",
                ],
                ["Tablonun toplam boyutunu (MB, GB)", "The table's total size (MB, GB)"],
                ["Kaç boyut tablosu olduğunu", "How many dimension tables exist"],
                ["Verinin hangi renkte gösterileceğini", "What colour the data is displayed in"],
              ],
              answer: 0,
              explain: [
                "Grain, fact tablosundaki bir satırın anlamını netleştirir. Bu net değilse aynı tabloda hem sipariş bazında hem satır bazında veri karışır ve toplamlar yanlış çıkar.",
                "Grain pins down what a single row in the fact table means. Without it, order-level and line-level data can mix in the same table, and sums come out wrong.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir müşteri şehir değiştirdiğinde, SCD Tip 2 eski siparişlere ne olmasını sağlar?",
                "When a customer moves city, what does SCD Type 2 ensure for old orders?",
              ],
              options: [
                [
                  "Eski siparişler eski şehirle kalır çünkü yeni satır `gecerli_baslangic`/`gecerli_bitis` ile eklenir",
                  "Old orders keep the old city, because a new row is inserted with `valid_from`/`valid_to`",
                ],
                ["Eski siparişlerin şehri de yeni şehre güncellenir", "Old orders' city is also updated to the new city"],
                ["Eski siparişler tamamen silinir", "Old orders are deleted entirely"],
                ["Hiçbir şey değişmez, geçmiş izlenmez", "Nothing changes, history is not tracked"],
              ],
              answer: 0,
              explain: [
                "Tip 2, üzerine yazmak yerine yeni bir satır ekler ve geçerlilik tarihlerini tutar. Böylece geçmişteki bir siparişi sorguladığında, o siparişin verildiği andaki doğru şehri görürsün — Tip 1'de bu bilgi kaybolurdu.",
                "Type 2 inserts a new row instead of overwriting, and keeps validity dates. So querying a past order shows the city that was correct at the time it was placed — Type 1 would have lost that.",
              ],
            }),
            code(
              "python",
              `# Airflow DAG — günlük satış akışı
from airflow.decorators import dag, task
from datetime import datetime

@dag(schedule="0 3 * * *", start_date=datetime(2024, 1, 1), catchup=False)
def gunluk_satis():

    @task
    def cek():
        # kaynaktan ham veriyi al, bronze'a yaz
        ...

    @task
    def donustur(yol: str):
        # temizle, tipleri düzelt, silver'a yaz
        ...

    @task
    def kalite_kontrol(tablo: str):
        # boş kritik alan, tekrar eden anahtar, beklenen satır sayısı
        ...

    ham = cek()
    temiz = donustur(ham)
    kalite_kontrol(temiz)

gunluk_satis()`,
            ),
            quiz({
              id: "q4",
              q: [
                "Örnek DAG'ta üç görev hangi sırayla birbirine bağımlıdır?",
                "In what order do the three tasks in the example DAG depend on each other?",
              ],
              options: [
                [
                  "cek() → donustur(ham) → kalite_kontrol(temiz)",
                  "cek() → donustur(ham) → kalite_kontrol(temiz)",
                ],
                ["kalite_kontrol() → donustur() → cek()", "kalite_kontrol() → donustur() → cek()"],
                ["Üçü de aynı anda, bağımsız çalışır", "All three run at the same time, independently"],
                ["donustur() → cek() → kalite_kontrol()", "donustur() → cek() → kalite_kontrol()"],
              ],
              answer: 0,
              explain: [
                "Kod, `ham = cek()`, `temiz = donustur(ham)`, `kalite_kontrol(temiz)` şeklinde zincirlenir: her görev bir öncekinin çıktısını girdi olarak alır, bu da Airflow'a sırayı ve bağımlılığı bildirir.",
                "The code chains `ham = cek()`, `temiz = donustur(ham)`, `kalite_kontrol(temiz)`: each task takes the previous one's output as input, which tells Airflow the order and the dependency.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Koddaki yorum satırına göre `donustur` görevi ne yapar?",
                "According to the code comment, what does the `donustur` (transform) task do?",
              ],
              options: [
                ["Temizler, tipleri düzeltir ve silver katmanına yazar", "Cleans, fixes types and writes to the silver layer"],
                ["Sadece raporu e-postayla gönderir", "Just emails the report"],
                ["Veriyi siler", "Deletes the data"],
                ["Sadece grafik çizer", "Just draws a chart"],
              ],
              answer: 0,
              explain: [
                "Yorum satırı açıkça belirtir: `donustur` görevi ham veriyi temizler, tipleri düzeltir ve sonucu silver katmanına yazar — bronze'daki ham veriden bir adım ileridedir.",
                "The comment states this directly: the `donustur` task cleans the data, fixes types, and writes the result to the silver layer — one step beyond the raw bronze data.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Koddaki yorum satırına göre `kalite_kontrol` görevi neyi denetler?",
                "According to the code comment, what does the `kalite_kontrol` (quality check) task inspect?",
              ],
              options: [
                [
                  "Boş kritik alan, tekrar eden anahtar, beklenen satır sayısı",
                  "Empty critical fields, duplicate keys, expected row count",
                ],
                ["Sadece kullanıcı adı ve şifre", "Only username and password"],
                ["Sadece dosya boyutunu", "Only the file size"],
                ["Hiçbir şeyi, sadece log yazar", "Nothing — it just writes a log"],
              ],
              answer: 0,
              explain: [
                "Yorum, kalite kontrolünün üç şeye baktığını söyler: kritik alanların boş olup olmadığı, birincil anahtarın tekrar edip etmediği ve satır sayısının beklenenle uyuşup uyuşmadığı.",
                "The comment says the quality check looks at three things: whether critical fields are empty, whether the primary key repeats, and whether the row count matches expectations.",
              ],
            }),
            pitfall(
              "Idempotent olmayan akış",
              "A pipeline that is not idempotent",
              "Bir görev aynı gün için ikinci kez çalıştığında veriyi ikiye katlıyorsa akış **idempotent değildir** ve er geç yanlış rapor üretir. Çözüm: `INSERT` yerine ilgili bölümü silip yeniden yaz (`DELETE WHERE tarih = ...` + `INSERT`) veya `MERGE` kullan. Her akış, kaç kez çalışırsa çalışsın aynı sonucu vermelidir.",
              "If rerunning a task for the same day doubles the data, the pipeline is **not idempotent** and will eventually produce a wrong report. The fix: replace the partition instead of appending (`DELETE WHERE date = ...` + `INSERT`), or use `MERGE`. A pipeline must give the same result no matter how many times it runs.",
            ),
            quiz({
              id: "q7",
              q: [
                "Bir görev aynı gün için ikinci kez çalıştığında veriyi ikiye katlıyorsa bu neyin göstergesidir?",
                "If rerunning a task for the same day doubles the data, what does that indicate?",
              ],
              options: [
                ["Akışın idempotent olmadığının", "That the pipeline is not idempotent"],
                ["Airflow'un bozuk olduğunun", "That Airflow is broken"],
                ["Verinin şifreli olduğunun", "That the data is encrypted"],
                ["Hiçbir sorun olmadığının", "That there is no problem"],
              ],
              answer: 0,
              explain: [
                "İdempotent bir akış, kaç kez çalışırsa çalışsın aynı sonucu üretir. Aynı gün için ikinci çalıştırma veriyi katlıyorsa bu tanım bozulmuştur ve akış er geç yanlış rapor üretir.",
                "An idempotent pipeline produces the same result no matter how many times it runs. If a second run for the same day doubles the data, that definition is broken, and the pipeline will eventually produce a wrong report.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Idempotent olmayan bir akışı düzeltmenin dersin önerdiği yollarından biri hangisidir?",
                "Which of the lesson's suggested fixes for a non-idempotent pipeline is this?",
              ],
              options: [
                [
                  "`INSERT` ile eklemek yerine ilgili bölümü silip yeniden yazmak (`DELETE WHERE tarih = ...` + `INSERT`)",
                  "Replacing the partition instead of appending (`DELETE WHERE date = ...` + `INSERT`)",
                ],
                ["Görevi tamamen kaldırmak", "Removing the task entirely"],
                ["Airflow'u yeniden kurmak", "Reinstalling Airflow"],
                ["Veriyi hiç yazmamak", "Never writing the data at all"],
              ],
              answer: 0,
              explain: [
                "Salt ekleme (`INSERT`) yerine önce ilgili günün bölümünü silip sonra yeniden yazmak, veya `MERGE` kullanmak, aynı günü kaç kez çalıştırırsan çalıştır aynı sonucu garanti eder.",
                "Instead of plain appending (`INSERT`), deleting and rewriting the day's partition first — or using `MERGE` — guarantees the same result no matter how many times you rerun that day.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "İyi bir veri akışının idempotency özelliği nasıl tanımlanır?",
                "How is a good pipeline's idempotency property defined?",
              ],
              options: [
                [
                  "Kaç kez çalışırsa çalışsın aynı sonucu vermelidir",
                  "It must give the same result no matter how many times it runs",
                ],
                ["Sadece bir kez çalışabilmelidir", "It must only ever be able to run once"],
                ["Her çalıştırmada farklı sonuç üretmelidir", "It must produce a different result each run"],
                ["Hiç hata vermemelidir", "It must never throw an error"],
              ],
              answer: 0,
              explain: [
                "İdempotency, tekrar çalıştırmanın güvenli olmasını sağlar: bir görevi bir kez ya da on kez çalıştır, sonuç tablo aynı kalmalıdır. Bu, yeniden çalıştırmayı korkulacak bir şey olmaktan çıkarır.",
                "Idempotency makes reruns safe: run a task once or ten times, the resulting table should be identical. This turns rerunning from something to fear into a routine operation.",
              ],
            }),
            order({
              id: "o1",
              prompt: [
                "Günlük bir veri akışının adımlarını sıraya diz.",
                "Order the steps of a daily data pipeline.",
              ],
              lines: [
                "Kaynak sistemin hazır olduğunu kontrol et (sensor)",
                "Ham veriyi çek ve bronze katmanına yaz",
                "Şema ve tip doğrulamasını yap",
                "Temizlenmiş veriyi silver katmanına yaz",
                "İş kurallarını uygulayıp gold özet tablolarını üret",
                "Veri kalitesi testlerini çalıştır",
                "Rapor modelini yenile ve ekibe bildirim gönder",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "senior",
      title: L("Ölçek ve veri kalitesi", "Scale and data quality"),
      description: L(
        "Spark ile dağıtık işleme, akış verisi ve veri sözleşmeleri.",
        "Distributed processing with Spark, streaming data and data contracts.",
      ),
      lessons: [
        lesson({
          slug: "spark-ve-kalite",
          title: L("Spark, akış ve veri kalitesi", "Spark, streaming and data quality"),
          summary: L(
            "Tek makineye sığmayan veri ve güvenilmezliği ölçülebilir kılmak.",
            "Data that outgrows one machine, and making unreliability measurable.",
          ),
          minutes: 18,
          blocks: [
            text(
              "**Spark**, veriyi parçalara bölüp birçok makinede paralel işler. Temel kavramlar:\n\n- **Partition** — verinin paralel işlenen parçası\n- **Lazy evaluation** — dönüşümler hemen çalışmaz; bir *action* (`count`, `write`) tetikler\n- **Shuffle** — `groupBy` ve `join` verinin makineler arası taşınmasına yol açar; en pahalı işlemdir\n- **Broadcast join** — küçük tabloyu tüm düğümlere kopyalayarak shuffle'ı ortadan kaldırır",
              "**Spark** splits data into chunks and processes them in parallel across machines. Core concepts:\n\n- **Partition** — the unit of parallelism\n- **Lazy evaluation** — transformations do not run until an *action* (`count`, `write`) triggers them\n- **Shuffle** — `groupBy` and `join` move data between machines; it is the expensive operation\n- **Broadcast join** — copies a small table to every node and removes the shuffle entirely",
            ),
            quiz({
              id: "q2",
              q: [
                "Spark'ta \"partition\" nedir?",
                "What is a \"partition\" in Spark?",
              ],
              options: [
                ["Verinin paralel işlenen parçası", "The unit of data processed in parallel"],
                ["Bir SQL sorgusu türü", "A type of SQL query"],
                ["Bir dosya formatı", "A file format"],
                ["Bir güvenlik ayarı", "A security setting"],
              ],
              answer: 0,
              explain: [
                "Spark, veriyi partition adı verilen parçalara böler ve her parçayı ayrı bir makinede işler; paralelliğin temel birimi budur.",
                "Spark splits data into chunks called partitions and processes each on a separate machine; it is the basic unit of parallelism.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "\"Lazy evaluation\" Spark'ta ne anlama gelir?",
                "What does \"lazy evaluation\" mean in Spark?",
              ],
              options: [
                [
                  "Dönüşümler hemen çalışmaz, bir action (`count`, `write`) tetiklediğinde çalışır",
                  "Transformations do not run immediately; they run only when an action (`count`, `write`) triggers them",
                ],
                ["Kod hiç çalışmaz", "The code never runs"],
                ["Sadece geceleri çalışır", "It only runs at night"],
                ["Her satır ayrı ayrı hemen işlenir", "Every row is processed immediately, one by one"],
              ],
              answer: 0,
              explain: [
                "Spark, `.filter()` veya `.join()` gibi dönüşümleri yazdığın anda çalıştırmaz; bir plan biriktirir ve yalnızca `count` veya `write` gibi bir action çağrıldığında gerçekten hesaplar.",
                "Spark does not execute transformations like `.filter()` or `.join()` the moment you write them; it builds up a plan and only actually computes when an action like `count` or `write` is called.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Spark'ta en pahalı işlem tipik olarak hangisidir?",
                "What is typically the most expensive operation in Spark?",
              ],
              options: [
                [
                  "Shuffle — `groupBy` ve `join` verinin makineler arası taşınmasına yol açar",
                  "A shuffle — `groupBy` and `join` cause data to move between machines",
                ],
                ["`filter` çağırmak", "Calling `filter`"],
                ["Bir sütun adı okumak", "Reading a column name"],
                ["Kodu içe aktarmak (import)", "Importing the code"],
              ],
              answer: 0,
              explain: [
                "`groupBy` ve `join` gibi işlemler, ilgili anahtarları bir araya getirmek için veriyi ağ üzerinden farklı makinelere taşımak zorundadır; bu ağ trafiği shuffle'ı en pahalı işlem yapar.",
                "Operations like `groupBy` and `join` must move data across the network between machines to bring matching keys together; this network traffic makes the shuffle the expensive operation.",
              ],
            }),
            code(
              "python",
              `from pyspark.sql import functions as F

satis = spark.read.format("delta").load("Files/silver/satis")
urun  = spark.read.format("delta").load("Files/silver/urun")

rapor = (
    satis
    .filter(F.col("tarih") >= "2024-01-01")
    .join(F.broadcast(urun), "urun_id")      # küçük tabloyu yayınla
    .groupBy("kategori", F.date_trunc("month", "tarih").alias("ay"))
    .agg(
        F.sum(F.col("adet") * F.col("fiyat")).alias("ciro"),
        F.countDistinct("siparis_id").alias("siparis"),
    )
)

rapor.write.format("delta").mode("overwrite") \\
     .partitionBy("ay").saveAsTable("gold_aylik_ciro")`,
            ),
            quiz({
              id: "q5",
              q: [
                "Kod örneğinde `F.broadcast(urun)` neden kullanılır?",
                "Why is `F.broadcast(urun)` used in the code example?",
              ],
              options: [
                [
                  "`urun` küçük bir tablo olduğu için tüm düğümlere kopyalanır ve shuffle önlenir",
                  "`urun` is a small table, so it is copied to every node to avoid a shuffle",
                ],
                ["`urun` en büyük tablo olduğu için", "Because `urun` is the largest table"],
                ["Sadece kodun daha kısa görünmesi için", "Just to make the code look shorter"],
                ["Akış verisi olduğu için", "Because it is streaming data"],
              ],
              answer: 0,
              explain: [
                "`satis` büyük, `urun` küçük bir tablodur. `broadcast()` küçük tabloyu her düğüme kopyalayarak `join`in ağ üzerinden veri taşımasını (shuffle) gereksiz kılar.",
                "`satis` is large, `urun` is small. `broadcast()` copies the small table to every node, making it unnecessary for the join to move data over the network (shuffle).",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Kod örneğindeki `.groupBy(\"kategori\", ...)` işlemi neden bir shuffle'a yol açar?",
                "Why does the `.groupBy(\"kategori\", ...)` in the code example cause a shuffle?",
              ],
              options: [
                [
                  "Aynı kategoriye ait satırları bir araya getirmek için veriyi makineler arasında taşıması gerekir",
                  "It has to move data between machines to bring rows of the same category together",
                ],
                ["`groupBy` hiçbir zaman shuffle yapmaz", "`groupBy` never causes a shuffle"],
                ["Sadece `join` shuffle yapar, `groupBy` yapmaz", "Only `join` causes a shuffle, not `groupBy`"],
                ["`broadcast` kullanıldığı için shuffle yoktur", "Because `broadcast` is used, there is no shuffle"],
              ],
              answer: 0,
              explain: [
                "Ders `groupBy` ve `join`i açıkça shuffle'a yol açan işlemler olarak sayar. Aynı `kategori`ye ait satırlar farklı partition'larda olabilir; toplama yapmadan önce bunların bir araya getirilmesi gerekir.",
                "The lesson explicitly lists `groupBy` and `join` as shuffle-causing operations. Rows of the same `kategori` can sit in different partitions; they must be brought together before aggregating.",
              ],
            }),
            text(
              "**Veri kalitesi** tahmine bırakılamaz; test edilir. Her kritik tabloda en az şu dört kontrol olmalı:\n\n1. **Benzersizlik** — birincil anahtar tekrar ediyor mu?\n2. **Boşluk** — kritik sütunlarda NULL var mı?\n3. **Aralık** — tutar negatif, tarih gelecekte mi?\n4. **Hacim** — bugünkü satır sayısı dünkünden anormal mi saptı?\n\ndbt'de bunlar `tests`, Spark'ta Great Expectations veya basit `assert`'lerle yazılır. Testi geçmeyen veri **rapora hiç ulaşmamalıdır** — sessizce yanlış rapor üretmektense akışı durdurmak her zaman daha iyidir.",
              "**Data quality** cannot be assumed; it is tested. Every critical table needs at least these four checks:\n\n1. **Uniqueness** — is the primary key duplicated?\n2. **Nullness** — are critical columns empty?\n3. **Range** — are amounts negative, dates in the future?\n4. **Volume** — did today's row count deviate abnormally from yesterday's?\n\nIn dbt these are `tests`; in Spark, Great Expectations or plain `assert`s. Data that fails a test **must never reach a report** — stopping the pipeline always beats silently publishing a wrong number.",
            ),
            quiz({
              id: "q7",
              q: [
                "Dört veri kalitesi kontrolünden \"benzersizlik\" neyi test eder?",
                "Of the four data quality checks, what does \"uniqueness\" test?",
              ],
              options: [
                ["Birincil anahtarın tekrar edip etmediğini", "Whether the primary key is duplicated"],
                ["Sütun renklerinin doğruluğunu", "Whether column colours are correct"],
                ["Dosya boyutunu", "The file size"],
                ["Kullanıcı sayısını", "The number of users"],
              ],
              answer: 0,
              explain: [
                "Benzersizlik kontrolü, birincil anahtarın (örn. sipariş id) her satırda yalnızca bir kez göründüğünü doğrular. Tekrar varsa toplamlar ve join'ler yanlış çıkar.",
                "The uniqueness check verifies the primary key (e.g. order id) appears exactly once per row. If it repeats, sums and joins come out wrong.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bir dbt testi başarısız olduğunda doğru davranış nedir?",
                "What is the right behaviour when a dbt test fails?",
              ],
              options: [
                [
                  "Akışı durdurmak — bozuk veri rapora hiç ulaşmamalı",
                  "Stop the pipeline — bad data must never reach a report",
                ],
                ["Testi görmezden gelip devam etmek", "Ignore the test and carry on"],
                ["Testi kod tabanından silmek", "Delete the test from the codebase"],
                ["Sadece bir log satırı yazıp devam etmek", "Just log a line and carry on"],
              ],
              answer: 0,
              explain: [
                "Ders bunu net söyler: testi geçmeyen veri rapora hiç ulaşmamalıdır. Sessizce yanlış bir rapor yayınlamaktansa akışı durdurmak her zaman daha iyidir.",
                "The lesson is explicit: data that fails a test must never reach a report. Stopping the pipeline always beats silently publishing a wrong number.",
              ],
            }),
            info(
              "Veri sözleşmesi (data contract)",
              "Data contracts",
              "Kaynak sistem bir sütunun adını habersiz değiştirdiğinde akış kırılır ve suçlanan hep veri ekibi olur. **Veri sözleşmesi**, üretici ile tüketici arasında şemayı, tipleri ve tazelik beklentisini yazılı hale getirir; CI'da doğrulanır. Kültürel bir çözümdür ama teknik borçtan çok daha fazla zaman kazandırır.",
              "When a source system renames a column without warning, the pipeline breaks and the data team gets blamed. A **data contract** writes down the schema, types and freshness expectations between producer and consumer, and validates them in CI. It is a cultural fix, but it saves far more time than any technical one.",
            ),
            quiz({
              id: "q9",
              q: [
                "Veri sözleşmesi (data contract) üretici ile tüketici arasında neyi yazılı hâle getirir?",
                "What does a data contract write down between producer and consumer?",
              ],
              options: [
                ["Şemayı, tipleri ve tazelik beklentisini", "The schema, types and freshness expectations"],
                ["Sadece fiyatlandırmayı", "Only pricing"],
                ["Sadece sunucu IP adresini", "Only the server IP address"],
                ["Hiçbir şeyi, sadece bir isimdir", "Nothing — it is just a name"],
              ],
              answer: 0,
              explain: [
                "Veri sözleşmesi, kaynak sistemin sunduğu alanları, tiplerini ve ne sıklıkla güncellendiğini açıkça tanımlar; bu tanım CI'da otomatik doğrulanır.",
                "A data contract explicitly defines the fields the source system exposes, their types, and how often they update; this definition is validated automatically in CI.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Ders, veri sözleşmesini ne tür bir çözüm olarak tanımlar?",
                "What kind of fix does the lesson describe a data contract as?",
              ],
              options: [
                [
                  "Kültürel bir çözüm — ama teknik borçtan çok daha fazla zaman kazandırır",
                  "A cultural fix — but it saves far more time than any technical one",
                ],
                ["Tamamen otomatik, insan gerektirmeyen bir çözüm", "A fully automatic fix needing no humans"],
                ["Sadece hukuki bir belge", "Just a legal document"],
                ["Geçici ve gereksiz bir bürokrasi", "A temporary and unnecessary piece of bureaucracy"],
              ],
              answer: 0,
              explain: [
                "Veri sözleşmesi ekipler arasında beklenti ve sorumluluğu netleştiren kültürel bir anlaşmadır; CI'da doğrulanması onu teknik olarak da uygulanabilir kılar.",
                "A data contract is a cultural agreement that clarifies expectations and responsibility between teams; validating it in CI also makes it technically enforceable.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Spark'ta `broadcast join` ne zaman kullanılır?",
                "When should you use a `broadcast join` in Spark?",
              ],
              options: [
                [
                  "Birleştirilen tablolardan biri küçük olduğunda; shuffle maliyetini ortadan kaldırır",
                  "When one side of the join is small; it eliminates the shuffle cost",
                ],
                ["Her zaman, daima daha hızlıdır", "Always — it is faster in every case"],
                ["İki tablo da çok büyük olduğunda", "When both tables are very large"],
                ["Sadece akış verisinde", "Only with streaming data"],
              ],
              answer: 0,
              explain: [
                "Küçük tabloyu (tipik olarak birkaç yüz MB altı) tüm düğümlere kopyalamak, büyük tabloyu ağ üzerinden yeniden dağıtmaktan çok daha ucuzdur. İki tablo da büyükse broadcast belleği taşırır ve iş çöker.",
                "Copying a small table (typically under a few hundred MB) to every node is far cheaper than reshuffling a large one across the network. If both sides are large, broadcasting blows up memory and the job dies.",
              ],
              xp: 25,
            }),
          ],
        }),
      ],
    },
    {
      id: "expert",
      title: L("Güvenilir veri platformu", "A reliable data platform"),
      description: L(
        "Gözlemlenebilirlik, sözleşmeler ve maliyet: hattı kurmak değil, yaşatmak.",
        "Observability, contracts and cost: not building the pipeline but keeping it alive.",
      ),
      lessons: [
        lesson({
          slug: "veri-gozlemlenebilirligi",
          title: L("Veri gözlemlenebilirliği", "Data observability"),
          summary: L(
            "Hat çalıştı ama veri yanlış. Bunu kullanıcıdan önce nasıl öğrenirsin?",
            "The pipeline ran but the data is wrong. How do you find out before your users do?",
          ),
          minutes: 18,
          blocks: [
            text(
              "Bir veri hattının \"başarılı\" bitmesi, verinin **doğru** olduğu anlamına gelmez. İş yeşil görünürken tablo boş olabilir, satır sayısı yarıya inmiş olabilir veya bir sütun tamamen `NULL` gelmiş olabilir.\n\n**Veri gözlemlenebilirliği** beş boyutu izler:\n\n1. **Tazelik (freshness)** — Tablo en son ne zaman güncellendi? Beklenenden geç mi?\n2. **Hacim (volume)** — Satır sayısı normal aralıkta mı? Ani düşüş kaynak sorununu, ani artış tekrar yüklemeyi gösterir.\n3. **Şema** — Sütun eklendi, silindi veya tipi değişti mi?\n4. **Dağılım** — Değerler beklenen aralıkta mı? `NULL` oranı arttı mı?\n5. **Soy ağacı (lineage)** — Bu tablo hangi tablolardan besleniyor, kimler kullanıyor?\n\nSon madde bir sorun çıktığında **etkiyi** ölçmeni sağlar: \"bu tablo bozuldu, hangi raporlar etkilendi?\"",
              "A pipeline finishing \"successfully\" does not mean the data is **correct**. The job can be green while the table is empty, the row count has halved, or a column arrived entirely `NULL`.\n\n**Data observability** monitors five dimensions:\n\n1. **Freshness** — when was the table last updated? Later than expected?\n2. **Volume** — is the row count in its normal range? A sudden drop points to a source problem, a sudden rise to a double load.\n3. **Schema** — has a column been added, removed or had its type changed?\n4. **Distribution** — are values in the expected range? Has the `NULL` rate risen?\n5. **Lineage** — which tables feed this one, and who consumes it?\n\nThe last one lets you measure **blast radius** when something breaks: \"this table is bad — which reports are affected?\"",
            ),
            quiz({
              id: "q2",
              q: [
                "Bir işin \"başarılı\" bitmesi neyi garanti ETMEZ?",
                "What does a job finishing \"successfully\" NOT guarantee?",
              ],
              options: [
                ["Verinin doğru olduğunu", "That the data is correct"],
                ["İşin çalıştığını", "That the job ran"],
                ["Kodun derlendiğini", "That the code compiled"],
                ["Zamanlayıcının tetiklendiğini", "That the scheduler triggered"],
              ],
              answer: 0,
              explain: [
                "İş teknik olarak yeşil görünse de tablo boş, satır sayısı yarıya inmiş veya bir sütun tamamen NULL gelmiş olabilir. Başarı, doğruluğun garantisi değildir.",
                "The job can be technically green while the table is empty, the row count has halved, or a column arrived entirely NULL. Success is not a guarantee of correctness.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "\"Tazelik (freshness)\" izlemesi neyi kontrol eder?",
                "What does \"freshness\" monitoring check?",
              ],
              options: [
                ["Tablonun en son ne zaman güncellendiğini ve beklenenden geç olup olmadığını", "When the table was last updated, and whether it is later than expected"],
                ["Tablonun rengini", "The table's colour"],
                ["Sütun sayısını", "The number of columns"],
                ["Kullanıcı izinlerini", "User permissions"],
              ],
              answer: 0,
              explain: [
                "Tazelik izlemesi, tablonun güncelleme zaman damgasını beklenen aralıkla karşılaştırır; iş çalışmış olsa bile veri beklenenden geç geldiyse bunu yakalar.",
                "Freshness monitoring compares the table's update timestamp against the expected window; it catches data arriving later than expected even if the job technically ran.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Hacim (volume) izlemede ani bir düşüş ile ani bir artış farklı neyi işaret eder?",
                "In volume monitoring, what do a sudden drop and a sudden rise each point to?",
              ],
              options: [
                [
                  "Ani düşüş kaynak sorununu, ani artış tekrar yüklemeyi (double load) gösterir",
                  "A sudden drop points to a source problem, a sudden rise to a double load",
                ],
                ["İkisi de her zaman zararsızdır", "Both are always harmless"],
                ["Ani düşüş tekrar yüklemeyi, ani artış kaynak sorununu gösterir", "A sudden drop points to a double load, a sudden rise to a source problem"],
                ["İkisi de aynı anlama gelir", "Both mean the same thing"],
              ],
              answer: 0,
              explain: [
                "Satır sayısındaki sapmalar yön bilgisi taşır: beklenmedik düşüş genelde kaynaktan veri gelmediğini, beklenmedik artış ise aynı verinin yanlışlıkla iki kez yüklendiğini gösterir.",
                "Deviations in row count carry directional meaning: an unexpected drop usually means data did not arrive from the source, an unexpected rise usually means the same data was loaded twice by mistake.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "\"Şema\" izlemesi hangi değişiklikleri yakalar?",
                "What changes does \"schema\" monitoring catch?",
              ],
              options: [
                ["Sütun eklenmesi, silinmesi veya tipinin değişmesi", "A column being added, removed, or having its type changed"],
                ["Sadece dosya adı değişikliklerini", "Only file name changes"],
                ["Sadece kullanıcı sayısını", "Only the user count"],
                ["Hiçbir şeyi", "Nothing"],
              ],
              answer: 0,
              explain: [
                "Şema izlemesi, tablonun yapısını (sütun listesi ve tipleri) sürekli karşılaştırır; beklenmedik bir sütun eklenme/silinme veya tip değişimi olduğunda haber verir.",
                "Schema monitoring continuously compares the table's structure (column list and types); it flags an unexpected column addition, removal, or type change.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "\"Soy ağacı (lineage)\" izlemesi bir tablo bozulduğunda sana ne sağlar?",
                "When a table breaks, what does \"lineage\" tracking give you?",
              ],
              options: [
                [
                  "Etkiyi (blast radius) ölçme imkânı — hangi raporların etkilendiğini görme",
                  "The ability to measure blast radius — seeing which reports are affected",
                ],
                ["Tabloyu otomatik olarak düzeltir", "It automatically fixes the table"],
                ["Depolama maliyetini düşürür", "It lowers storage cost"],
                ["Şifreleme sağlar", "It provides encryption"],
              ],
              answer: 0,
              explain: [
                "Lineage, bir tablonun hangi tablolardan beslendiğini ve kimler tarafından kullanıldığını gösterir. Bir sorun çıktığında bu bilgi, etkinin nereye kadar yayıldığını hızlıca görmeni sağlar.",
                "Lineage shows which tables feed a given one and who consumes it. When something breaks, this lets you quickly see how far the impact spreads.",
              ],
            }),
            text(
              "**Pratikte nasıl kurulur?** Her dönüşüm adımından sonra otomatik testler çalıştırırsın. dbt kullanıyorsan bunlar yapılandırma dosyasında birkaç satırdır:\n\n```yaml\nmodels:\n  - name: satislar\n    columns:\n      - name: siparis_id\n        tests: [unique, not_null]\n      - name: musteri_id\n        tests:\n          - relationships:\n              to: ref('musteriler')\n              field: id\n      - name: tutar\n        tests:\n          - dbt_utils.accepted_range:\n              min_value: 0\n```\n\nBu testler her çalıştırmada koşar ve başarısız olurlarsa hat **durur** — bozuk veri aşağı akmaz. Bu, veri kalitesini belgeden koda taşımanın en pratik yoludur.",
              "**How is it built in practice?** You run automated tests after every transformation step. With dbt these are a few lines of configuration:\n\n```yaml\nmodels:\n  - name: sales\n    columns:\n      - name: order_id\n        tests: [unique, not_null]\n      - name: customer_id\n        tests:\n          - relationships:\n              to: ref('customers')\n              field: id\n      - name: amount\n        tests:\n          - dbt_utils.accepted_range:\n              min_value: 0\n```\n\nThese run on every execution and, if they fail, the pipeline **stops** — bad data does not flow downstream. This is the most practical way to move data quality out of a document and into code.",
            ),
            quiz({
              id: "q7",
              q: [
                "YAML örneğinde `siparis_id` sütununa hangi testler uygulanır?",
                "In the YAML example, which tests are applied to the `order_id` column?",
              ],
              options: [
                ["`unique` ve `not_null`", "`unique` and `not_null`"],
                ["Sadece `accepted_range`", "Only `accepted_range`"],
                ["Sadece `relationships`", "Only `relationships`"],
                ["Hiçbiri", "None"],
              ],
              answer: 0,
              explain: [
                "`siparis_id`, tablonun birincil anahtarı olduğu için `unique` (tekrar etmemeli) ve `not_null` (boş olmamalı) testleriyle korunur.",
                "`order_id` is the table's primary key, so it is protected with `unique` (must not repeat) and `not_null` (must not be empty) tests.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`musteri_id` sütununa uygulanan `relationships` testi neyi kontrol eder?",
                "What does the `relationships` test on the `customer_id` column check?",
              ],
              options: [
                [
                  "Her `musteri_id`'nin `musteriler` tablosunda gerçekten var olduğunu",
                  "That every `customer_id` genuinely exists in the `customers` table",
                ],
                ["Müşteri adının doğru yazıldığını", "That the customer's name is spelled correctly"],
                ["Müşteri sayısının sabit kaldığını", "That the number of customers stays constant"],
                ["Sütunun rengini", "The column's colour"],
              ],
              answer: 0,
              explain: [
                "`relationships` testi bir referans bütünlüğü (foreign key) kontrolüdür: `musteri_id` değerinin, referans verdiği `musteriler` tablosundaki `id` alanında gerçekten bulunup bulunmadığını doğrular.",
                "`relationships` is a referential-integrity check: it verifies that the `customer_id` value genuinely exists in the `id` field of the `customers` table it references.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`tutar` sütununa uygulanan `accepted_range` testi (`min_value: 0`) neyi engeller?",
                "What does the `accepted_range` test (`min_value: 0`) on the `amount` column prevent?",
              ],
              options: [
                ["Negatif tutarların tabloya girmesini", "Negative amounts from entering the table"],
                ["Tutarın 0'dan büyük olmasını", "The amount from being greater than 0"],
                ["Tutarın ondalıklı olmasını", "The amount from having decimals"],
                ["Hiçbir şeyi", "Nothing"],
              ],
              answer: 0,
              explain: [
                "`min_value: 0` ile tanımlanan aralık testi, `tutar` sütununda 0'ın altına düşen (yani negatif) değerleri yakalar — bir sipariş tutarı mantıken negatif olamaz.",
                "The range test with `min_value: 0` catches values in the `amount` column that fall below zero — an order amount logically cannot be negative.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bu dbt testlerinden biri başarısız olduğunda ne olur?",
                "What happens when one of these dbt tests fails?",
              ],
              options: [
                ["Akış durur, bozuk veri aşağı akmaz", "The pipeline stops, bad data does not flow downstream"],
                ["Test görmezden gelinip akış devam eder", "The test is ignored and the pipeline continues"],
                ["Sadece bir uyarı e-postası gider, akış devam eder", "Only a warning email goes out, the pipeline continues"],
                ["Tablo otomatik olarak silinir", "The table is automatically deleted"],
              ],
              answer: 0,
              explain: [
                "Ders açıkça belirtir: bu testler her çalıştırmada koşar ve başarısız olurlarsa hat durur. Böylece bozuk veri hiçbir zaman aşağı akış tablolarına veya raporlara ulaşmaz.",
                "The lesson is explicit: these tests run on every execution and, if they fail, the pipeline stops. This way bad data never reaches downstream tables or reports.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Gecelik iş başarılı bitti ama tablodaki satır sayısı 2 milyondan 40 bine düştü. Bunu ne yakalar?",
                "The nightly job succeeded but the table's row count fell from 2 million to 40,000. What catches this?",
              ],
              options: [
                [
                  "Hacim izleme — satır sayısının beklenen aralıkta olduğunu sınayan kontrol",
                  "Volume monitoring — a check asserting the row count is in its expected range",
                ],
                ["İşin başarı durumu", "The job's success status"],
                ["Şema kontrolü", "The schema check"],
                ["Hiçbir şey", "Nothing"],
              ],
              answer: 0,
              explain: [
                "İş teknik olarak başarılıdır — kod çalıştı, hata fırlatmadı. Ama kaynak sistem o gece verinin yalnızca bir kısmını verdiyse sonuç sessizce eksiktir. Hacim izleme, satır sayısını geçmiş ortalamayla karşılaştırıp belirgin sapmalarda alarm üretir ve bu tür sessiz hataların tek savunmasıdır.",
                "The job is technically successful — the code ran and threw no error. But if the source only delivered part of the data that night, the result is quietly incomplete. Volume monitoring compares the row count against its historical average and alerts on significant deviation; it is the only defence against this kind of silent failure.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "veri-sozlesmeleri",
          title: L("Veri sözleşmeleri ve şema evrimi", "Data contracts and schema evolution"),
          summary: L(
            "Yazılım ekibi bir sütunu yeniden adlandırdı ve on rapor bozuldu. Bunu nasıl önlersin?",
            "The engineering team renamed a column and ten reports broke. How do you prevent that?",
          ),
          minutes: 18,
          blocks: [
            text(
              "Veri ekiplerinin en sık yaşadığı kriz şudur: uygulama ekibi kendi veritabanında masum bir değişiklik yapar — bir sütunu yeniden adlandırır, bir alanı `NULL` yapılabilir hâle getirir, bir enum değeri ekler — ve haberi olmadan aşağı akıştaki on raporu bozar.\n\nSuç kimsede değildir; **sorun arayüzün tanımsız olmasıdır.** Uygulama ekibi o sütunun kendi iç detayı olduğunu düşünür; veri ekibi onu bir API gibi kullanmaktadır.\n\n**Veri sözleşmesi (data contract)** bu arayüzü açık hâle getirir: hangi alanların, hangi tiplerle, hangi garantilerle sunulduğunu yazılı ve **otomatik denetlenebilir** biçimde tanımlar. Sözleşmeyi bozan bir değişiklik, uygulama ekibinin kendi CI hattında başarısız olur — üretime çıkmadan önce.",
              "The crisis data teams live most often is this: the application team makes an innocent change in their own database — renames a column, makes a field nullable, adds an enum value — and unknowingly breaks ten downstream reports.\n\nNobody is at fault; **the problem is that the interface was never defined.** The application team thinks the column is their internal detail; the data team is using it like an API.\n\nA **data contract** makes that interface explicit: it defines which fields are exposed, with which types and which guarantees, in a written and **automatically enforceable** form. A change that breaks the contract fails in the application team's own CI — before it reaches production.",
            ),
            quiz({
              id: "q2",
              q: [
                "Derste anlatılan kriz senaryosunda uygulama ekibinin yaptığı \"masum\" değişikliklere örnek olarak neler verilir?",
                "In the crisis scenario the lesson describes, what examples are given of the app team's \"innocent\" changes?",
              ],
              options: [
                [
                  "Bir sütunu yeniden adlandırmak, bir alanı NULL yapılabilir hâle getirmek, enum'a değer eklemek",
                  "Renaming a column, making a field nullable, adding an enum value",
                ],
                ["Sunucuyu yeniden başlatmak", "Restarting the server"],
                ["Yeni bir çalışan işe almak", "Hiring a new employee"],
                ["Fiyatlandırmayı değiştirmek", "Changing pricing"],
              ],
              answer: 0,
              explain: [
                "Ders bu üç örneği verir: bunlar uygulama ekibi için küçük, iç detaylar gibi görünür ama veri ekibinin o alana bağımlı raporlarını habersizce bozabilir.",
                "The lesson gives these three examples: they look like small, internal details to the app team, but can unknowingly break the data team's reports that depend on that field.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Derse göre bu krizde asıl sorun nedir?",
                "According to the lesson, what is the real problem in this crisis?",
              ],
              options: [
                ["Arayüzün hiç tanımlanmamış olması", "The interface was never defined"],
                ["Uygulama ekibinin kötü niyetli olması", "The app team acting in bad faith"],
                ["Veri ekibinin yetersiz olması", "The data team being incompetent"],
                ["Veritabanının bozuk olması", "The database being broken"],
              ],
              answer: 0,
              explain: [
                "Ders açıkça \"suç kimsede değildir\" der; sorun, uygulama ekibi ile veri ekibi arasındaki arayüzün hiç yazılı ve netleştirilmiş olmamasıdır.",
                "The lesson is explicit that \"nobody is at fault\"; the problem is that the interface between the app team and the data team was never written down and made explicit.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Uygulama ekibi ile veri ekibi arasındaki bakış açısı farkı nasıl özetlenir?",
                "How is the difference in perspective between the app team and the data team summarised?",
              ],
              options: [
                [
                  "Uygulama ekibi sütunu iç detay sanır; veri ekibi onu bir API gibi kullanır",
                  "The app team thinks the column is an internal detail; the data team uses it like an API",
                ],
                ["İkisi de sütunu aynı şekilde görür", "Both teams see the column the same way"],
                ["Uygulama ekibi hiç veritabanı kullanmaz", "The app team never uses a database"],
                ["Veri ekibi sütunu hiç kullanmaz", "The data team never uses the column"],
              ],
              answer: 0,
              explain: [
                "Bu bakış farkı krizin kökenidir: uygulama ekibi serbestçe değiştirebileceğini düşünür, oysa veri ekibi o sütuna dışarıdan bağımlı bir tüketici gibi güvenir.",
                "This mismatch in perspective is the root of the crisis: the app team thinks it can change freely, while the data team relies on that column like an external consumer of an API.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Veri sözleşmesini bozan bir değişiklik ideal durumda nerede yakalanır?",
                "Ideally, where does a contract-breaking change get caught?",
              ],
              options: [
                [
                  "Uygulama ekibinin kendi CI hattında, üretime çıkmadan önce",
                  "In the application team's own CI, before it reaches production",
                ],
                ["Kullanıcı şikayet ettiğinde", "When a user complains"],
                ["Üç ay sonra bir toplantıda", "In a meeting three months later"],
                ["Hiçbir zaman yakalanmaz", "It is never caught"],
              ],
              answer: 0,
              explain: [
                "Sözleşme otomatik denetlenebilir olduğu için, onu bozan bir değişiklik uygulama ekibinin kendi CI testlerinde başarısız olur — sorun üretime hiç ulaşmadan görülür.",
                "Because the contract is automatically enforceable, a breaking change fails in the app team's own CI tests — the problem is caught before it ever reaches production.",
              ],
            }),
            text(
              "**Şema değişikliklerinin iki türü** ve nasıl ele alınacakları:\n\n**Geriye dönük uyumlu (güvenli):**\n- Yeni bir sütun eklemek\n- Bir alanı zorunludan isteğe bağlıya çevirmek\n- Enum'a yeni değer eklemek (tüketici bilmediği değeri tolere ediyorsa)\n\n**Kırıcı (tehlikeli):**\n- Sütun silmek veya yeniden adlandırmak\n- Tip daraltmak (`bigint` → `int`)\n- Alanı isteğe bağlıdan zorunluya çevirmek\n- Bir alanın **anlamını** değiştirmek — en sinsisi, çünkü şema aynı kalır ama sayılar değişir\n\nKırıcı değişiklik gerektiğinde doğru yol **genişlet-daralt (expand-contract)** desenidir: önce yeni alanı ekle, iki alanı bir süre birlikte yaz, tüketiciler geçince eskisini kaldır.",
              "**Two kinds of schema change** and how to handle them:\n\n**Backward compatible (safe):**\n- adding a new column\n- making a required field optional\n- adding a value to an enum (if consumers tolerate unknown values)\n\n**Breaking (dangerous):**\n- dropping or renaming a column\n- narrowing a type (`bigint` → `int`)\n- making an optional field required\n- changing a field's **meaning** — the most insidious, because the schema stays identical while the numbers change\n\nWhen a breaking change is unavoidable, the right approach is the **expand-contract** pattern: add the new field first, write both for a period, and remove the old one once consumers have migrated.",
            ),
            quiz({
              id: "q6",
              q: [
                "Aşağıdakilerden hangisi geriye dönük uyumlu (güvenli) bir şema değişikliğidir?",
                "Which of these is a backward-compatible (safe) schema change?",
              ],
              options: [
                ["Yeni bir sütun eklemek", "Adding a new column"],
                ["Bir sütunu silmek", "Dropping a column"],
                ["Bir sütunu yeniden adlandırmak", "Renaming a column"],
                ["Tip daraltmak (`bigint` → `int`)", "Narrowing a type (`bigint` → `int`)"],
              ],
              answer: 0,
              explain: [
                "Yeni bir sütun eklemek mevcut tüketicileri etkilemez — onlar hâlâ bildikleri alanları görmeye devam eder. Diğer üç seçenek dersin \"kırıcı\" listesindedir.",
                "Adding a new column does not affect existing consumers — they still see the fields they already know. The other three are on the lesson's \"breaking\" list.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Tip daraltmak (`bigint` → `int`) hangi kategoriye girer?",
                "Which category does narrowing a type (`bigint` → `int`) fall into?",
              ],
              options: [
                ["Kırıcı (tehlikeli)", "Breaking (dangerous)"],
                ["Geriye dönük uyumlu (güvenli)", "Backward compatible (safe)"],
                ["Hiçbir kategoriye girmez, önemsizdir", "It fits no category, it is irrelevant"],
                ["Sadece performansı etkiler, veriyi etkilemez", "It only affects performance, not the data"],
              ],
              answer: 0,
              explain: [
                "Ders tip daraltmayı açıkça kırıcı değişiklikler listesine koyar: büyük bir `bigint` değeri `int`e sığmayabilir ve mevcut tüketiciler hata alır veya veri kesilir.",
                "The lesson explicitly places narrowing a type on the breaking-changes list: a large `bigint` value may not fit in an `int`, and existing consumers error out or the data gets truncated.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Derse göre en sinsi (fark edilmesi en zor) şema değişikliği türü hangisidir?",
                "According to the lesson, which type of schema change is the most insidious?",
              ],
              options: [
                [
                  "Bir alanın anlamını değiştirmek — şema aynı kalırken sayılar değişir",
                  "Changing a field's meaning — the schema stays identical while the numbers change",
                ],
                ["Yeni bir sütun eklemek", "Adding a new column"],
                ["Bir alanı isteğe bağlı yapmak", "Making a field optional"],
                ["Enum'a yeni değer eklemek", "Adding a new enum value"],
              ],
              answer: 0,
              explain: [
                "Anlam değişikliğinde sütun adı ve tipi aynı kaldığı için şema testleri hiçbir şey yakalamaz; ama sayılar sessizce farklı bir şeyi ifade etmeye başlar. Bu, en zor fark edilen kırıcı değişikliktir.",
                "When meaning changes, the column name and type stay the same, so schema tests catch nothing; but the numbers silently start meaning something different. This is the hardest breaking change to notice.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Kırıcı bir değişiklik kaçınılmaz olduğunda ders hangi deseni önerir?",
                "When a breaking change is unavoidable, which pattern does the lesson recommend?",
              ],
              options: [
                ["Genişlet-daralt (expand-contract)", "Expand-contract"],
                ["Doğrudan üretimde değiştirmek", "Changing it directly in production"],
                ["Eski alanı hemen silmek", "Deleting the old field immediately"],
                ["Hiçbir şey yapmamak", "Doing nothing"],
              ],
              answer: 0,
              explain: [
                "Genişlet-daralt deseni, tüketicileri hiç kesintiye uğratmadan geçiş yapmanı sağlar: önce yeni alanı eklersin, ikisini bir süre birlikte tutarsın, sonra eskisini kaldırırsın.",
                "The expand-contract pattern lets you migrate without ever breaking consumers: you add the new field first, keep both for a period, then remove the old one.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Genişlet-daralt (expand-contract) deseninde adımlar hangi sırayla ilerler?",
                "In the expand-contract pattern, in what order do the steps proceed?",
              ],
              options: [
                [
                  "Yeni alanı ekle → iki alanı bir süre birlikte yaz → tüketiciler geçince eskiyi kaldır",
                  "Add the new field → write both for a period → remove the old one once consumers have migrated",
                ],
                [
                  "Eski alanı sil → yeni alanı ekle → tüketicileri bilgilendir",
                  "Delete the old field → add the new one → inform consumers",
                ],
                [
                  "Tüketicilere haber ver → hiçbir şey ekleme → bekle",
                  "Inform consumers → add nothing → wait",
                ],
                [
                  "Yeni alanı ekle ve eskisini aynı anda sil",
                  "Add the new field and delete the old one at the same time",
                ],
              ],
              answer: 0,
              explain: [
                "Sıra önemlidir: önce ekleme yapılır ki hiçbir tüketici kırılmasın, iki alan bir süre paralel yazılır, ve ancak herkes geçtikten sonra eski alan güvenle kaldırılır.",
                "The order matters: you add first so no consumer breaks, write both fields in parallel for a while, and only remove the old field once everyone has migrated.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "`durum` sütunundaki `\"aktif\"` değeri sessizce `\"ACTIVE\"` olarak değiştirildi. Şema aynı kaldı. Bu neden tehlikelidir?",
                "The value `\"active\"` in a `status` column was quietly changed to `\"ACTIVE\"`. The schema is unchanged. Why is this dangerous?",
              ],
              options: [
                [
                  "Şema testleri geçer ama `WHERE durum = 'aktif'` yazan tüm sorgular sessizce sıfır satır döndürür",
                  "Schema tests pass, yet every query saying `WHERE status = 'active'` silently returns zero rows",
                ],
                ["Sütun tipi bozulur", "The column type breaks"],
                ["Tablo silinir", "The table is dropped"],
                ["Tehlikeli değildir", "It is not dangerous"],
              ],
              answer: 0,
              explain: [
                "Şema düzeyindeki kontroller sütun adına ve tipine bakar; değerin içeriğine bakmaz. Bu yüzden değişiklik tüm testlerden geçer ve raporlar hata vermeden **sıfır** gösterir. Korunmanın yolu, kabul edilen değer kümesini de sözleşmeye yazmak (`accepted_values` testi) ve dağılım izlemesi kurmaktır.",
                "Schema-level checks look at column names and types, not at the values inside. So the change passes every test and reports show **zero** without raising an error. The defence is to put the accepted value set into the contract too (an `accepted_values` test) and to monitor distributions.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "maliyet-ve-olceklendirme",
          title: L("Maliyet yönetimi ve ölçeklendirme", "Cost management and scaling"),
          summary: L(
            "Bulut faturası neden üç ayda beş katına çıkar — ve nasıl geri indirilir?",
            "Why does a cloud bill quintuple in three months — and how do you bring it back down?",
          ),
          minutes: 18,
          blocks: [
            text(
              "Bulut veri platformlarında maliyet, kimse bakmazsa **sessizce ve hızla** büyür. En yaygın dört sebep:\n\n1. **Gereksiz sık yenileme** — Haftalık bakılan bir rapor için saatlik yenileme kurmak, aynı işi 168 kat fazla yapmaktır.\n2. **Tam yenileme (full refresh)** — Her gece tüm tarihi yeniden işlemek. Oysa yalnızca değişenleri işlemek (artımlı / incremental) genelde yeterlidir.\n3. **Bölümlenmemiş tablolar** — Sorgu her seferinde tüm tabloyu tarar. Tarihe göre bölümleme (partitioning), taranan veriyi %99 azaltabilir.\n4. **Unutulmuş kaynaklar** — Kapatılmayan geliştirme kümeleri, kullanılmayan tablolar, silinmeyen ara çıktılar.",
              "On cloud data platforms, cost grows **quietly and fast** when nobody watches. The four most common causes:\n\n1. **Refreshing more often than needed** — hourly refresh for a report read weekly does the same work 168 times over.\n2. **Full refresh** — reprocessing all history every night, when processing only what changed (incremental) is usually enough.\n3. **Unpartitioned tables** — every query scans the whole table. Partitioning by date can cut the data scanned by 99%.\n4. **Forgotten resources** — development clusters left running, unused tables, intermediate outputs never deleted.",
            ),
            quiz({
              id: "q2",
              q: [
                "Haftalık bakılan bir rapor için saatlik yenileme kurmak neden israftır?",
                "Why is setting up hourly refresh for a report read weekly wasteful?",
              ],
              options: [
                ["Aynı işi 168 kat fazla yapmış olursun", "You do the same work 168 times over"],
                ["Raporu yavaşlatır", "It slows the report down"],
                ["Veriyi bozar", "It corrupts the data"],
                ["Hiçbir maliyeti yoktur", "It has no cost at all"],
              ],
              answer: 0,
              explain: [
                "Bir hafta 168 saat sürer. Rapor haftada bir okunuyorsa, onu saatte bir yenilemek aynı hesaplamayı 168 kat gereksiz yere tekrarlamak demektir.",
                "A week has 168 hours. If the report is read once a week, refreshing it hourly means repeating the same computation 168 times unnecessarily.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "'Tam yenileme (full refresh)' ile 'artımlı (incremental)' işleme arasındaki fark nedir?",
                "What is the difference between 'full refresh' and 'incremental' processing?",
              ],
              options: [
                [
                  "Tam yenileme her gece tüm tarihi yeniden işler; artımlı yalnızca değişenleri işler",
                  "Full refresh reprocesses all history every night; incremental processes only what changed",
                ],
                ["İkisi de aynı şeyi yapar", "Both do exactly the same thing"],
                ["Artımlı işleme her zaman daha pahalıdır", "Incremental is always more expensive"],
                ["Tam yenileme sadece yeni satırları işler", "Full refresh processes only new rows"],
              ],
              answer: 0,
              explain: [
                "Tam yenileme, tarihçenin tamamını her seferinde yeniden hesaplar — genelde gereksizdir. Artımlı işleme yalnızca değişen veya yeni gelen kısmı işler ve çoğu durumda yeterlidir.",
                "Full refresh recomputes the entire history every time — usually unnecessary. Incremental processing handles only the changed or newly arrived portion and is sufficient in most cases.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Bölümlenmemiş (unpartitioned) bir tablo sorgulandığında ne olur?",
                "What happens when an unpartitioned table is queried?",
              ],
              options: [
                ["Sorgu her seferinde tüm tabloyu tarar", "The query scans the whole table every time"],
                ["Sorgu otomatik olarak hızlanır", "The query automatically gets faster"],
                ["Tablo otomatik bölümlenir", "The table gets automatically partitioned"],
                ["Hiçbir fark yaratmaz", "It makes no difference"],
              ],
              answer: 0,
              explain: [
                "Bölümleme olmadan veritabanı, sorgunun ilgilendiği aralık ne olursa olsun tablonun tamamını taramak zorunda kalır — bu da gereksiz veri taraması ve maliyet demektir.",
                "Without partitioning, the database has to scan the entire table regardless of the range the query actually cares about — meaning unnecessary data scanned and cost.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Tarihe göre bölümleme (partitioning) taranan veriyi ne kadar azaltabilir?",
                "How much can partitioning by date cut the data scanned?",
              ],
              options: [
                ["%99'a kadar", "Up to 99%"],
                ["%1'e kadar", "Up to 1%"],
                ["Hiç azaltmaz", "Not at all"],
                ["Sadece %10'a kadar", "Only up to 10%"],
              ],
              answer: 0,
              explain: [
                "Ders bunu net rakamla verir: tarihe göre bölümleme, sorgunun yalnızca ilgili tarih aralığını taramasını sağlayarak taranan veriyi %99'a kadar azaltabilir.",
                "The lesson gives a concrete figure: partitioning by date lets a query scan only the relevant date range, cutting data scanned by up to 99%.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "\"Unutulmuş kaynaklar\" maliyet nedeni olarak neyi kapsar?",
                "What does \"forgotten resources\" as a cost cause cover?",
              ],
              options: [
                [
                  "Kapatılmayan geliştirme kümeleri, kullanılmayan tablolar, silinmeyen ara çıktılar",
                  "Development clusters left running, unused tables, undeleted intermediate outputs",
                ],
                ["Sadece kullanıcı hataları", "Only user errors"],
                ["Sadece ağ gecikmesi", "Only network latency"],
                ["Sadece lisans yenilemeleri", "Only licence renewals"],
              ],
              answer: 0,
              explain: [
                "Kimsenin fark etmeden çalışır bıraktığı geliştirme kümeleri, artık kullanılmayan tablolar ve temizlenmeyen ara çıktılar sessizce fatura biriktirir.",
                "Development clusters left running unnoticed, tables nobody uses anymore, and intermediate outputs nobody cleans up quietly rack up the bill.",
              ],
            }),
            text(
              "**Ölçeklendirmede iki eksen** ve hangisinin ne zaman gerektiği:\n\n- **Dikey (vertical)** — Makineyi büyüt: daha çok CPU ve bellek. Basittir ve bir yere kadar en ucuz çözümdür. Çoğu şirketin verisi tek güçlü makineye sığar — \"büyük veri\" sandığın şey genelde büyük değildir.\n- **Yatay (horizontal)** — İşi çok makineye böl (Spark, dağıtık ambarlar). Gerçekten büyük veride şarttır ama karmaşıklık ve maliyet getirir.\n\n**Pratik sıra:** önce sorguyu iyileştir, sonra tabloyu bölümle, sonra makineyi büyüt, en son dağıt. İnsanların çoğu bu sırayı tersten uygular ve çözülebilecek bir sorgu problemine küme satın alır.\n\nÖlçmeden optimize etme: her modern ambar sorgu başına taranan bayt ve maliyet bilgisi verir. En pahalı on sorguyu bulmak, faturanın yarısını açıklar.",
              "**Two axes of scaling**, and when each is needed:\n\n- **Vertical** — make the machine bigger: more CPU and memory. Simple, and up to a point the cheapest answer. Most companies' data fits on one powerful machine — what you think is \"big data\" usually is not.\n- **Horizontal** — split the work across many machines (Spark, distributed warehouses). Essential at genuinely large scale, but it brings complexity and cost.\n\n**The practical order:** improve the query, then partition the table, then grow the machine, and only then distribute. Most people apply this order backwards and buy a cluster for a problem a query rewrite would have solved.\n\nDo not optimise without measuring: every modern warehouse reports bytes scanned and cost per query. Finding the ten most expensive queries explains half the bill.",
            ),
            quiz({
              id: "q7",
              q: [
                "Dikey (vertical) ölçeklendirme neyi ifade eder?",
                "What does vertical scaling mean?",
              ],
              options: [
                ["Makineyi büyütmek: daha çok CPU ve bellek", "Making the machine bigger: more CPU and memory"],
                ["İşi çok makineye bölmek", "Splitting the work across many machines"],
                ["Veriyi silmek", "Deleting the data"],
                ["Sorguyu yeniden yazmak", "Rewriting the query"],
              ],
              answer: 0,
              explain: [
                "Dikey ölçeklendirme tek makineyi güçlendirmektir — daha fazla CPU ve bellek eklemek. Basittir ve çoğu şirketin verisi zaten tek güçlü makineye sığar.",
                "Vertical scaling means beefing up a single machine — adding more CPU and memory. It is simple, and most companies' data already fits on one powerful machine.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Derse göre pratik ölçeklendirme sırası nasıl olmalıdır?",
                "According to the lesson, what should the practical scaling order be?",
              ],
              options: [
                [
                  "Önce sorguyu iyileştir, sonra tabloyu bölümle, sonra makineyi büyüt, en son dağıt",
                  "First improve the query, then partition the table, then grow the machine, and only then distribute",
                ],
                [
                  "Önce dağıt, sonra makineyi büyüt, sonra tabloyu bölümle, en son sorguyu iyileştir",
                  "First distribute, then grow the machine, then partition the table, and only then improve the query",
                ],
                ["Sıra önemli değildir", "The order does not matter"],
                ["Sadece makineyi büyütmek yeterlidir", "Just growing the machine is enough"],
              ],
              answer: 0,
              explain: [
                "Ders bu sırayı açıkça verir: en ucuz ve en az riskli adımdan (sorgu iyileştirme) en pahalı ve en karmaşık adıma (dağıtık işlem) doğru ilerlemek gerekir.",
                "The lesson states this order explicitly: you move from the cheapest, lowest-risk step (query improvement) toward the most expensive, most complex one (distributed processing).",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Derse göre çoğu insanın yaptığı hata nedir?",
                "According to the lesson, what mistake do most people make?",
              ],
              options: [
                [
                  "Sırayı tersten uygulayıp sorgu ile çözülebilecek bir soruna küme satın almak",
                  "Applying the order backwards and buying a cluster for a problem a query rewrite would solve",
                ],
                ["Hiç makine kullanmamak", "Never using a machine at all"],
                ["Sorguyu asla iyileştirmemek", "Never improving the query"],
                ["Sadece dikey ölçeklendirme kullanmak", "Only ever using vertical scaling"],
              ],
              answer: 0,
              explain: [
                "İnsanlar genelde önce en pahalı çözüme (küme, dağıtık işlem) atlar, oysa sorun genelde ucuz bir sorgu iyileştirmesiyle çözülebilirdi.",
                "People often jump straight to the most expensive fix (a cluster, distributed processing), when the problem could usually have been solved with a cheap query rewrite.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "\"Ölçmeden optimize etme\" ilkesine göre en pahalı on sorguyu bulmak ne sağlar?",
                "Under the \"do not optimise without measuring\" principle, what does finding the ten most expensive queries give you?",
              ],
              options: [
                ["Faturanın yarısını açıklar", "It explains half the bill"],
                ["Faturayı sıfırlar", "It zeroes out the bill"],
                ["Hiçbir şey açıklamaz", "It explains nothing"],
                ["Sadece depolama maliyetini gösterir", "It only shows storage cost"],
              ],
              answer: 0,
              explain: [
                "Modern ambarlar sorgu başına taranan bayt ve maliyeti raporlar. Ders, en pahalı on sorguyu bulmanın tipik olarak faturanın yarısını açıkladığını söyler — optimizasyona buradan başlanır.",
                "Modern warehouses report bytes scanned and cost per query. The lesson states that finding the ten most expensive queries typically explains half the bill — that is where optimisation should start.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Ambar faturası hızla artıyor. İlk bakılacak yer neresidir?",
                "The warehouse bill is rising fast. Where do you look first?",
              ],
              options: [
                [
                  "En çok veri tarayan sorgular ve yenileme sıklıkları",
                  "The queries scanning the most data, and the refresh frequencies",
                ],
                ["Kullanıcı sayısı", "The number of users"],
                ["Tablo sayısı", "The number of tables"],
                ["Depolama boyutu", "The storage size"],
              ],
              answer: 0,
              explain: [
                "Modern ambarlarda depolama ucuzdur; asıl maliyet **işlem**dir, yani taranan veri miktarıdır. Bölümlenmemiş bir tabloyu her saat tam tarayan tek bir sorgu, faturanın yarısını tek başına oluşturabilir. Bu yüzden ilk iş en pahalı sorguları listelemektir.",
                "In modern warehouses storage is cheap; the real cost is **compute**, meaning the volume of data scanned. A single query fully scanning an unpartitioned table every hour can account for half the bill on its own. So the first move is to list the most expensive queries.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
