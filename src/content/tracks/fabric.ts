import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, quiz, text, tip } from "../helpers";

export const fabricTrack: Track = {
  slug: "microsoft-fabric",
  name: "Microsoft Fabric",
  category: "platform",
  color: "#22c55e",
  icon: "🧩",
  tagline: L("Uçtan uca tek veri platformu", "One end-to-end data platform"),
  description: L(
    "Fabric; veri gölü (OneLake), veri mühendisliği (Spark), veri ambarı, gerçek zamanlı analiz ve Power BI'ı tek çatı altında toplar. Bu patika, hangi iş yükünü ne zaman seçeceğini ve medallion mimarisini gerçek bir akış üzerinde öğretir.",
    "Fabric brings the lakehouse (OneLake), data engineering (Spark), warehousing, real-time analytics and Power BI under one roof. This track teaches which workload to pick when, and the medallion architecture on a real pipeline.",
  ),
  levels: [
    {
      id: "beginner",
      title: L("Başlangıç — Fabric'in parçaları", "Beginner — The pieces of Fabric"),
      description: L(
        "OneLake, lakehouse, warehouse ve iş yükleri arasındaki farkı netleştir.",
        "Get clear on OneLake, lakehouse, warehouse and the different workloads.",
      ),
      projectSlug: "fabric-lakehouse-pipeline",
      lessons: [
        lesson({
          slug: "fabric-mimarisi",
          title: L("OneLake ve iş yükleri", "OneLake and workloads"),
          summary: L(
            "Fabric'i anlamanın kısayolu: tek depo, çok motor.",
            "The shortcut to understanding Fabric: one storage, many engines.",
          ),
          minutes: 15,
          blocks: [
            text(
              "Fabric'in merkezinde **OneLake** vardır: kuruluşun tek veri gölü. Tüm iş yükleri aynı depoya yazar ve aynı depodan okur; veri kopyalamak zorunda kalmazsın. Depolama biçimi açık standart **Delta Lake / Parquet**'tir.",
              "At the centre of Fabric sits **OneLake**: one data lake for the whole organisation. Every workload writes to and reads from the same storage, so you never copy data around. The storage format is the open **Delta Lake / Parquet** standard.",
            ),
            text(
              "Başlıca iş yükleri:\n\n- **Data Factory** — veri taşıma ve orkestrasyon (pipeline, dataflow)\n- **Data Engineering** — Spark not defterleri, lakehouse\n- **Data Warehouse** — T-SQL ile klasik ambar\n- **Real-Time Intelligence** — akış verisi, KQL veritabanı\n- **Data Science** — model eğitimi, MLflow\n- **Power BI** — raporlama, Direct Lake modu",
              "The main workloads:\n\n- **Data Factory** — movement and orchestration (pipelines, dataflows)\n- **Data Engineering** — Spark notebooks, lakehouse\n- **Data Warehouse** — a classic warehouse over T-SQL\n- **Real-Time Intelligence** — streaming data, KQL database\n- **Data Science** — model training, MLflow\n- **Power BI** — reporting, with Direct Lake mode",
            ),
            info(
              "Lakehouse mu Warehouse mu?",
              "Lakehouse or Warehouse?",
              "**Lakehouse**: yapılandırılmamış/yarı yapılandırılmış veri, Spark ve Python ile çalışmak, büyük dosya işleme. **Warehouse**: tamamen T-SQL, çok kullanıcılı eşzamanlı sorgu, klasik BI raporlaması, tam transaksiyon desteği. Ekibin Python'la mı SQL'le mi rahat olduğu, çoğu zaman bu kararı tek başına verir.",
              "**Lakehouse**: unstructured or semi-structured data, working in Spark and Python, heavy file processing. **Warehouse**: pure T-SQL, high-concurrency querying, classic BI reporting, full transactional support. Whether your team is more comfortable in Python or SQL usually decides this on its own.",
            ),
            quiz({
              id: "q1",
              q: [
                "Power BI'daki **Direct Lake** modunun temel avantajı nedir?",
                "What is the main advantage of **Direct Lake** mode in Power BI?",
              ],
              options: [
                [
                  "Veriyi kopyalamadan Delta dosyalarını doğrudan okur; import hızına yakın, DirectQuery tazeliğinde",
                  "It reads Delta files directly without copying — near-import speed with DirectQuery freshness",
                ],
                ["Raporları otomatik olarak tasarlar", "It designs reports automatically"],
                ["Veriyi her sorguda kaynaktan çeker ve önbelleğe almaz", "It re-queries the source every time with no caching"],
                ["Sadece küçük veri setlerinde çalışır", "It only works on small datasets"],
              ],
              answer: 0,
              explain: [
                "Direct Lake, import modunun performansıyla DirectQuery'nin tazeliğini birleştirir: veri OneLake'teki Delta dosyalarından doğrudan okunur, ayrı bir import kopyası tutulmaz ve yenileme beklenmez.",
                "Direct Lake combines import-mode performance with DirectQuery freshness: data is read straight from the Delta files in OneLake, with no separate import copy and no refresh to wait for.",
              ],
              xp: 20,
            }),
          ],
        }),
      ],
    },
    {
      id: "intermediate",
      title: L("Orta — Medallion mimarisi", "Intermediate — Medallion architecture"),
      description: L(
        "Bronze → Silver → Gold katmanlarıyla güvenilir bir veri akışı kur.",
        "Build a trustworthy pipeline with Bronze → Silver → Gold layers.",
      ),
      projectSlug: "fabric-medallion",
      lessons: [
        lesson({
          slug: "medallion",
          title: L("Bronze, Silver, Gold", "Bronze, Silver, Gold"),
          summary: L(
            "Ham veriden rapora giden yolu üç katmana böl; her katmanın tek bir sorumluluğu olsun.",
            "Split the path from raw data to report into three layers, each with a single responsibility.",
          ),
          minutes: 18,
          blocks: [
            text(
              "- **Bronze** — kaynaktan geldiği gibi, **hiç dokunulmamış** ham veri. Şema değişse bile burada saklanır; hata ayıklamanın ve yeniden işlemenin tek güvencesi budur.\n- **Silver** — temizlenmiş, tipleri düzeltilmiş, tekrarları ayıklanmış, birleştirilmiş veri. İş kuralları burada uygulanır.\n- **Gold** — iş sorusuna göre şekillendirilmiş, toplanmış tablolar. Raporlar ve modeller yalnızca buradan okur.",
              "- **Bronze** — raw data exactly as it arrived, **untouched**. It is kept even when the schema changes; this is your only guarantee for debugging and reprocessing.\n- **Silver** — cleaned, typed, de-duplicated and conformed data. Business rules are applied here.\n- **Gold** — tables shaped and aggregated for a business question. Reports and models read only from here.",
            ),
            code(
              "python",
              `# Fabric not defteri (PySpark) — Bronze'dan Silver'a
from pyspark.sql import functions as F

bronze = spark.read.format("delta").load("Files/bronze/satis")

silver = (
    bronze
    .withColumn("tarih", F.to_date("tarih", "yyyy-MM-dd"))
    .withColumn("tutar", F.col("tutar").cast("double"))
    .filter(F.col("tutar").isNotNull() & (F.col("tutar") > 0))
    .dropDuplicates(["siparis_id"])
    .withColumn("islenme_zamani", F.current_timestamp())
)

silver.write.format("delta").mode("overwrite").saveAsTable("silver_satis")`,
            ),
            code(
              "sql",
              `-- Gold katmanı: rapora hazır özet (Fabric Warehouse, T-SQL)
CREATE TABLE gold_aylik_ciro AS
SELECT
    FORMAT(tarih, 'yyyy-MM')   AS ay,
    kategori,
    SUM(tutar)                 AS ciro,
    COUNT(DISTINCT siparis_id) AS siparis_sayisi
FROM silver_satis
GROUP BY FORMAT(tarih, 'yyyy-MM'), kategori;`,
            ),
            pitfall(
              "Bronze katmanını temizlemek",
              "Cleaning the Bronze layer",
              "Bronze'a dokunma isteği güçlüdür — \"zaten bozuk, düzeltiverelim\". Ama ham veriyi kaybettiğin anda geçmişi yeniden işleyemez, bir hatanın nereden geldiğini kanıtlayamaz ve kaynağın kendisiyle karşılaştırma yapamazsın. Bronze append-only kalsın; tüm düzeltmeler Silver'da yapılsın.",
              "The urge to fix Bronze is strong — \"it is broken anyway, let's clean it\". But the moment you lose the raw data you cannot reprocess history, prove where an error came from, or reconcile against the source. Keep Bronze append-only and do every correction in Silver.",
            ),
            order({
              id: "o1",
              prompt: [
                "Fabric'te uçtan uca bir veri akışının adımlarını sıraya diz.",
                "Order the steps of an end-to-end Fabric pipeline.",
              ],
              lines: [
                "Data Factory pipeline ile kaynaktan Files/bronze'a ham veriyi kopyala",
                "Spark not defterinde Bronze'u oku, tip ve tekrar temizliği yap",
                "Sonucu Delta tablosu olarak Silver'a yaz",
                "Silver üzerinden iş sorusuna göre Gold özet tablolarını üret",
                "Gold tabloları üzerine Direct Lake semantic model kur",
                "Power BI raporunu yayınla ve pipeline'ı zamanla",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "advanced",
      title: L("İleri — Yönetişim ve maliyet", "Advanced — Governance and cost"),
      description: L(
        "Kapasite yönetimi, veri soyu, güvenlik ve gerçek zamanlı analiz.",
        "Capacity management, lineage, security and real-time analytics.",
      ),
      projectSlug: "fabric-gercek-zamanli",
      lessons: [
        lesson({
          slug: "yonetisim-ve-maliyet",
          title: L("Kapasite, maliyet ve veri soyu", "Capacity, cost and lineage"),
          summary: L(
            "Fabric'te teknik kararların doğrudan bir faturası vardır. Bunu baştan planla.",
            "In Fabric your technical decisions have a direct invoice. Plan for it up front.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Fabric, **kapasite birimi (CU)** üzerinden faturalanır. Spark not defteri, ambar sorgusu, pipeline çalıştırması ve rapor yenilemesi aynı havuzdan tüketir. Bu yüzden \"çalışıyor\" yetmez; **ne kadara çalışıyor** sorusunu da sormak gerekir.\n\nMaliyeti düşüren pratikler:\n\n- Gereksiz `overwrite` yerine artımlı yükleme (`merge`)\n- Küçük dosya sorununu `OPTIMIZE` ve `V-Order` ile çözmek\n- Not defterlerinde uygun havuz boyutu seçmek, boşta bırakmamak\n- Gold katmanını gerçekten özet tutmak — rapor ham tablo taramasın",
              "Fabric is billed in **capacity units (CU)**. Spark notebooks, warehouse queries, pipeline runs and report refreshes all draw from the same pool. So \"it works\" is not enough; you also have to ask **what it costs**.\n\nPractices that lower the bill:\n\n- Incremental loads (`merge`) instead of blanket `overwrite`\n- Fixing the small-file problem with `OPTIMIZE` and `V-Order`\n- Right-sizing notebook pools and not leaving them idle\n- Keeping Gold genuinely summarised — never let a report scan raw tables",
            ),
            text(
              "**Veri soyu (lineage)**, Fabric'in en değerli yönetişim özelliğidir: bir rapordaki sayının hangi Gold tablosundan, o tablonun hangi Silver'dan, onun da hangi kaynaktan geldiğini görsel olarak izleyebilirsin. Bir sayı tartışmaya açıldığında cevabı dakikalar içinde bulmanı sağlar.",
              "**Lineage** is Fabric's most valuable governance feature: you can trace a number in a report back to its Gold table, that table to its Silver source, and that to the original system, visually. When a number gets questioned, it gives you the answer in minutes.",
            ),
            tip(
              "Domain ve endorsement kullan",
              "Use domains and endorsement",
              "Kurumda veri çoğaldıkça asıl sorun \"veri yok\" değil, \"hangi tablo doğru?\" olur. Fabric'te öğeleri **Domain**'lere ayır ve güvenilir olanları **Promoted** ya da **Certified** olarak işaretle. Böylece arama yapan kişi doğru tabloyu tahmin etmek zorunda kalmaz.",
              "As data grows, the problem is never \"no data\" but \"which table is the right one?\". Organise items into **Domains** and mark the trustworthy ones as **Promoted** or **Certified**. Then whoever is searching does not have to guess.",
            ),
            quiz({
              id: "q1",
              q: [
                "Delta tablolarında `OPTIMIZE` komutu hangi sorunu çözer?",
                "Which problem does the `OPTIMIZE` command solve on Delta tables?",
              ],
              options: [
                [
                  "Çok sayıda küçük dosyayı birleştirerek okuma performansını artırır",
                  "It compacts many small files into fewer larger ones, improving read performance",
                ],
                ["Veriyi şifreler", "It encrypts the data"],
                ["Eksik değerleri doldurur", "It fills in missing values"],
                ["Tabloyu yedekler", "It backs up the table"],
              ],
              answer: 0,
              explain: [
                "Sık ve küçük yazmalar binlerce ufak Parquet dosyası bırakır; her okuma bu dosyaların tümünü açmak zorunda kalır. `OPTIMIZE` bunları birleştirir, `V-Order` ise Power BI'ın Direct Lake okumasını hızlandıracak biçimde sıralar.",
                "Frequent small writes leave thousands of tiny Parquet files, and every read has to open all of them. `OPTIMIZE` compacts them, while `V-Order` lays them out so Power BI's Direct Lake reads are fast.",
              ],
              xp: 25,
            }),
          ],
        }),
      ],
    },
  ],
};
