import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, quiz, text } from "../helpers";

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
      id: "beginner",
      title: L("Başlangıç — ETL ve ELT", "Beginner — ETL and ELT"),
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
      id: "intermediate",
      title: L("Orta — Modelleme ve orkestrasyon", "Intermediate — Modelling and orchestration"),
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
      id: "advanced",
      title: L("İleri — Ölçek ve veri kalitesi", "Advanced — Scale and data quality"),
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
  ],
};
