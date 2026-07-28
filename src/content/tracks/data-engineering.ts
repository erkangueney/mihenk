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
            text(
              "**Modern veri yığınının katmanları** — hemen her şirkette bu sıra vardır:\n\n1. **Kaynaklar** — Uygulama veritabanı, CRM, reklam platformları, dosyalar, olay akışları\n2. **Alma (ingestion)** — Veriyi kaynaktan çekip ham hâliyle depoya yazan araçlar (Fivetran, Airbyte, özel betikler)\n3. **Depolama** — Veri gölü (S3, ADLS) veya veri ambarı (Snowflake, BigQuery, Redshift)\n4. **Dönüştürme** — Ham veriyi iş mantığına çeviren katman (dbt, SQL, Spark)\n5. **Sunum** — Analistin ve BI aracının gördüğü temiz tablolar\n6. **Orkestrasyon** — Tüm bunları doğru sırada çalıştıran zamanlayıcı (Airflow, Dagster, Prefect)\n\nBu katmanları bilmek, bir iş ilanındaki araç listesini anlamlandırmanın da en hızlı yoludur.",
              "**The layers of the modern data stack** — nearly every company has this order:\n\n1. **Sources** — application databases, CRM, ad platforms, files, event streams\n2. **Ingestion** — tools that pull data from sources and land it raw (Fivetran, Airbyte, custom scripts)\n3. **Storage** — a data lake (S3, ADLS) or a warehouse (Snowflake, BigQuery, Redshift)\n4. **Transformation** — the layer turning raw data into business logic (dbt, SQL, Spark)\n5. **Serving** — the clean tables analysts and BI tools see\n6. **Orchestration** — the scheduler running all of it in the right order (Airflow, Dagster, Prefect)\n\nKnowing these layers is also the fastest way to make sense of the tool list in a job advert.",
            ),
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
            pitfall(
              "Analitik sorguyu üretim veritabanında çalıştırma",
              "Never run analytics on the production database",
              "Analistlerin uygulama veritabanına doğrudan bağlanması, veri ekiplerinin klasik ilk günahıdır. Ağır bir `GROUP BY` sorgusu üretim veritabanını kilitler ve **müşteriye hizmet veren uygulama yavaşlar veya durur**.\n\nÇözüm bir okuma kopyası (read replica) veya — daha doğrusu — veriyi ambara aktarmaktır. Ambara aktarma ayrıca geçmişi saklamanı sağlar: üretim veritabanı yalnızca **bugünkü** durumu tutar, ambar ise değişimin tarihçesini.",
              "Letting analysts connect straight to the application database is the classic original sin of data teams. One heavy `GROUP BY` locks the production database and **the customer-facing application slows down or stops**.\n\nThe answer is a read replica or — better — moving the data into a warehouse. Moving it also lets you keep history: the production database holds only **today's** state, while the warehouse holds how it changed.",
            ),
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
            tip(
              "Gerçek zamanlı ihtiyacını sorgula",
              "Interrogate the real-time requirement",
              "\"Veri gerçek zamanlı olsun\" isteği neredeyse her projede duyulur ve neredeyse hiçbirinde gerçek bir ihtiyaç değildir. Doğru soru şudur: **\"Bu veriyle 5 dakika içinde bir karar veriyor musun?\"**\n\nCevap hayırsa (ki genelde hayırdır — rapor haftalık toplantıda bakılıyorsa) toplu işleme yeterlidir ve sana on kat daha ucuz, on kat daha güvenilir bir sistem verir.\n\nAkış gerçekten gereken durumlar dardır: dolandırıcılık tespiti, canlı operasyon panosu, öneri motoru, alarm sistemleri. Bunların ortak özelliği, **gecikmenin doğrudan para kaybettirmesidir**.",
              "\"The data must be real-time\" is heard on nearly every project and is almost never a genuine requirement. The right question is: **\"do you make a decision on this data within five minutes?\"**\n\nIf the answer is no — and it usually is, if the report is reviewed in a weekly meeting — batch is enough and gives you a system ten times cheaper and ten times more reliable.\n\nThe cases that genuinely need streaming are narrow: fraud detection, live operations dashboards, recommendation engines, alerting. What they share is that **latency directly costs money**.",
            ),
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
            text(
              "Modern veri yığınının katmanları:\n\n- **Alma (ingestion)** — Fivetran, Airbyte, özel Python betikleri\n- **Depolama** — Snowflake, BigQuery, Databricks, Microsoft Fabric\n- **Dönüşüm** — dbt (SQL ile modelleme ve test)\n- **Orkestrasyon** — Airflow, Dagster, Prefect\n- **Sunum** — Power BI, Tableau, Looker\n- **Gözlemlenebilirlik** — veri kalitesi testleri, soy takibi, uyarılar",
              "The layers of the modern data stack:\n\n- **Ingestion** — Fivetran, Airbyte, custom Python\n- **Storage** — Snowflake, BigQuery, Databricks, Microsoft Fabric\n- **Transformation** — dbt (modelling and testing in SQL)\n- **Orchestration** — Airflow, Dagster, Prefect\n- **Serving** — Power BI, Tableau, Looker\n- **Observability** — data quality tests, lineage, alerting",
            ),
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
            pitfall(
              "Idempotent olmayan akış",
              "A pipeline that is not idempotent",
              "Bir görev aynı gün için ikinci kez çalıştığında veriyi ikiye katlıyorsa akış **idempotent değildir** ve er geç yanlış rapor üretir. Çözüm: `INSERT` yerine ilgili bölümü silip yeniden yaz (`DELETE WHERE tarih = ...` + `INSERT`) veya `MERGE` kullan. Her akış, kaç kez çalışırsa çalışsın aynı sonucu vermelidir.",
              "If rerunning a task for the same day doubles the data, the pipeline is **not idempotent** and will eventually produce a wrong report. The fix: replace the partition instead of appending (`DELETE WHERE date = ...` + `INSERT`), or use `MERGE`. A pipeline must give the same result no matter how many times it runs.",
            ),
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
            text(
              "**Veri kalitesi** tahmine bırakılamaz; test edilir. Her kritik tabloda en az şu dört kontrol olmalı:\n\n1. **Benzersizlik** — birincil anahtar tekrar ediyor mu?\n2. **Boşluk** — kritik sütunlarda NULL var mı?\n3. **Aralık** — tutar negatif, tarih gelecekte mi?\n4. **Hacim** — bugünkü satır sayısı dünkünden anormal mi saptı?\n\ndbt'de bunlar `tests`, Spark'ta Great Expectations veya basit `assert`'lerle yazılır. Testi geçmeyen veri **rapora hiç ulaşmamalıdır** — sessizce yanlış rapor üretmektense akışı durdurmak her zaman daha iyidir.",
              "**Data quality** cannot be assumed; it is tested. Every critical table needs at least these four checks:\n\n1. **Uniqueness** — is the primary key duplicated?\n2. **Nullness** — are critical columns empty?\n3. **Range** — are amounts negative, dates in the future?\n4. **Volume** — did today's row count deviate abnormally from yesterday's?\n\nIn dbt these are `tests`; in Spark, Great Expectations or plain `assert`s. Data that fails a test **must never reach a report** — stopping the pipeline always beats silently publishing a wrong number.",
            ),
            info(
              "Veri sözleşmesi (data contract)",
              "Data contracts",
              "Kaynak sistem bir sütunun adını habersiz değiştirdiğinde akış kırılır ve suçlanan hep veri ekibi olur. **Veri sözleşmesi**, üretici ile tüketici arasında şemayı, tipleri ve tazelik beklentisini yazılı hale getirir; CI'da doğrulanır. Kültürel bir çözümdür ama teknik borçtan çok daha fazla zaman kazandırır.",
              "When a source system renames a column without warning, the pipeline breaks and the data team gets blamed. A **data contract** writes down the schema, types and freshness expectations between producer and consumer, and validates them in CI. It is a cultural fix, but it saves far more time than any technical one.",
            ),
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
            text(
              "**Pratikte nasıl kurulur?** Her dönüşüm adımından sonra otomatik testler çalıştırırsın. dbt kullanıyorsan bunlar yapılandırma dosyasında birkaç satırdır:\n\n```yaml\nmodels:\n  - name: satislar\n    columns:\n      - name: siparis_id\n        tests: [unique, not_null]\n      - name: musteri_id\n        tests:\n          - relationships:\n              to: ref('musteriler')\n              field: id\n      - name: tutar\n        tests:\n          - dbt_utils.accepted_range:\n              min_value: 0\n```\n\nBu testler her çalıştırmada koşar ve başarısız olurlarsa hat **durur** — bozuk veri aşağı akmaz. Bu, veri kalitesini belgeden koda taşımanın en pratik yoludur.",
              "**How is it built in practice?** You run automated tests after every transformation step. With dbt these are a few lines of configuration:\n\n```yaml\nmodels:\n  - name: sales\n    columns:\n      - name: order_id\n        tests: [unique, not_null]\n      - name: customer_id\n        tests:\n          - relationships:\n              to: ref('customers')\n              field: id\n      - name: amount\n        tests:\n          - dbt_utils.accepted_range:\n              min_value: 0\n```\n\nThese run on every execution and, if they fail, the pipeline **stops** — bad data does not flow downstream. This is the most practical way to move data quality out of a document and into code.",
            ),
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
            text(
              "**Şema değişikliklerinin iki türü** ve nasıl ele alınacakları:\n\n**Geriye dönük uyumlu (güvenli):**\n- Yeni bir sütun eklemek\n- Bir alanı zorunludan isteğe bağlıya çevirmek\n- Enum'a yeni değer eklemek (tüketici bilmediği değeri tolere ediyorsa)\n\n**Kırıcı (tehlikeli):**\n- Sütun silmek veya yeniden adlandırmak\n- Tip daraltmak (`bigint` → `int`)\n- Alanı isteğe bağlıdan zorunluya çevirmek\n- Bir alanın **anlamını** değiştirmek — en sinsisi, çünkü şema aynı kalır ama sayılar değişir\n\nKırıcı değişiklik gerektiğinde doğru yol **genişlet-daralt (expand-contract)** desenidir: önce yeni alanı ekle, iki alanı bir süre birlikte yaz, tüketiciler geçince eskisini kaldır.",
              "**Two kinds of schema change** and how to handle them:\n\n**Backward compatible (safe):**\n- adding a new column\n- making a required field optional\n- adding a value to an enum (if consumers tolerate unknown values)\n\n**Breaking (dangerous):**\n- dropping or renaming a column\n- narrowing a type (`bigint` → `int`)\n- making an optional field required\n- changing a field's **meaning** — the most insidious, because the schema stays identical while the numbers change\n\nWhen a breaking change is unavoidable, the right approach is the **expand-contract** pattern: add the new field first, write both for a period, and remove the old one once consumers have migrated.",
            ),
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
            text(
              "**Ölçeklendirmede iki eksen** ve hangisinin ne zaman gerektiği:\n\n- **Dikey (vertical)** — Makineyi büyüt: daha çok CPU ve bellek. Basittir ve bir yere kadar en ucuz çözümdür. Çoğu şirketin verisi tek güçlü makineye sığar — \"büyük veri\" sandığın şey genelde büyük değildir.\n- **Yatay (horizontal)** — İşi çok makineye böl (Spark, dağıtık ambarlar). Gerçekten büyük veride şarttır ama karmaşıklık ve maliyet getirir.\n\n**Pratik sıra:** önce sorguyu iyileştir, sonra tabloyu bölümle, sonra makineyi büyüt, en son dağıt. İnsanların çoğu bu sırayı tersten uygular ve çözülebilecek bir sorgu problemine küme satın alır.\n\nÖlçmeden optimize etme: her modern ambar sorgu başına taranan bayt ve maliyet bilgisi verir. En pahalı on sorguyu bulmak, faturanın yarısını açıklar.",
              "**Two axes of scaling**, and when each is needed:\n\n- **Vertical** — make the machine bigger: more CPU and memory. Simple, and up to a point the cheapest answer. Most companies' data fits on one powerful machine — what you think is \"big data\" usually is not.\n- **Horizontal** — split the work across many machines (Spark, distributed warehouses). Essential at genuinely large scale, but it brings complexity and cost.\n\n**The practical order:** improve the query, then partition the table, then grow the machine, and only then distribute. Most people apply this order backwards and buy a cluster for a problem a query rewrite would have solved.\n\nDo not optimise without measuring: every modern warehouse reports bytes scanned and cost per query. Finding the ten most expensive queries explains half the bill.",
            ),
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
