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
      id: "foundation",
      title: L("Fabric'e giriş", "Getting started with Fabric"),
      description: L(
        "Microsoft'un tek çatı altında topladığı veri platformu: neyi, neden birleştiriyor?",
        "Microsoft's data platform under one roof: what is it unifying, and why?",
      ),
      lessons: [
        lesson({
          slug: "fabric-neden-var",
          title: L("Fabric neden var?", "Why does Fabric exist?"),
          summary: L(
            "Beş ayrı araç yerine tek platform: çözdüğü sorun ve getirdiği bağımlılık.",
            "One platform instead of five separate tools: the problem it solves and the lock-in it brings.",
          ),
          minutes: 12,
          blocks: [
            text(
              "Klasik bir kurumsal veri kurulumunda beş ayrı ürün bir arada çalışır: veriyi taşımak için bir araç, depolamak için bir veri gölü, dönüştürmek için bir motor, ambar için başka bir servis, raporlamak için Power BI. Her birinin ayrı faturası, ayrı yetkilendirmesi ve aralarında veri kopyalayan hatları vardır.\n\n**Microsoft Fabric**, bunların hepsini tek bir SaaS ürününde birleştirir. Temelinde iki fikir vardır:\n\n1. **OneLake** — Tüm kuruluş için **tek** bir veri gölü. Her iş yükü aynı depoyu kullanır; veri kopyalamaya gerek kalmaz.\n2. **Delta-Parquet standardı** — Tüm bileşenler aynı açık dosya biçimini yazar. Ambar da, Spark da, Power BI da aynı dosyaları okur.",
              "A classic enterprise data setup runs five separate products side by side: one tool to move data, a lake to store it, an engine to transform it, another service for the warehouse, and Power BI to report on it. Each has its own bill, its own permissions and pipelines copying data between them.\n\n**Microsoft Fabric** merges all of it into a single SaaS product. Two ideas sit underneath:\n\n1. **OneLake** — **one** data lake for the whole organisation. Every workload uses the same store, so data need not be copied.\n2. **The Delta-Parquet standard** — every component writes the same open file format. The warehouse, Spark and Power BI all read the same files.",
            ),
            text(
              "**Fabric'in iş yükleri** — hepsi aynı OneLake üzerinde çalışır:\n\n- **Data Factory** — Veri taşıma ve hat kurma\n- **Synapse Data Engineering** — Spark ile büyük ölçekli dönüşüm (Lakehouse)\n- **Synapse Data Warehouse** — SQL ile ambar (T-SQL, tam işlem desteği)\n- **Synapse Data Science** — Model geliştirme ve MLflow\n- **Real-Time Intelligence** — Akış verisi ve olay işleme\n- **Power BI** — Raporlama ve pano\n- **Data Activator** — Veri koşullarına göre otomatik eylem tetikleme\n\nHepsi tek lisansla, tek yetkilendirme modeliyle ve tek kapasiteyle gelir.",
              "**Fabric's workloads** — all running on the same OneLake:\n\n- **Data Factory** — moving data and building pipelines\n- **Synapse Data Engineering** — large-scale transformation with Spark (Lakehouse)\n- **Synapse Data Warehouse** — a SQL warehouse (T-SQL, full transaction support)\n- **Synapse Data Science** — model development and MLflow\n- **Real-Time Intelligence** — streaming data and event processing\n- **Power BI** — reporting and dashboards\n- **Data Activator** — triggering actions automatically from data conditions\n\nAll of it comes under one licence, one permission model and one capacity.",
            ),
            pitfall(
              "Tek platformun bedeli: satıcı bağımlılığı",
              "The price of one platform: vendor lock-in",
              "Fabric'in vaadi gerçektir: entegrasyon derdi biter, yetkilendirme tek yerden yönetilir, Power BI ile bağ kusursuzdur. Ama karar verirken bedelini de görmek gerekir.\n\nTüm veri platformunu tek satıcıya bağlamak, **fiyat ve yol haritası pazarlığındaki gücünü** azaltır. Kapasite modeli (F-SKU) de dikkat ister: kapasite paylaşımlıdır ve ağır bir Spark işi aynı anda raporları yavaşlatabilir.\n\nAçık Delta biçimi bu riski kısmen azaltır — veri en azından standart bir formatta durur ve teorik olarak taşınabilir. Ama hatlar, ölçüler ve yetkilendirme yine Fabric'e özgüdür.",
              "Fabric's promise is real: integration pain disappears, permissions are managed in one place, and the tie to Power BI is seamless. But the cost belongs in the decision too.\n\nPutting your entire data platform with one vendor weakens your **leverage on price and roadmap**. The capacity model (F-SKUs) also needs care: capacity is shared, and a heavy Spark job can slow down reports at the same time.\n\nThe open Delta format mitigates the risk somewhat — the data at least sits in a standard format and is theoretically portable. But the pipelines, measures and permissions remain Fabric-specific.",
            ),
            quiz({
              id: "q1",
              q: [
                "OneLake'in temel fikri nedir?",
                "What is the core idea of OneLake?",
              ],
              options: [
                [
                  "Tüm iş yükleri tek bir depoyu paylaşır; veriyi kopyalamaya gerek kalmaz",
                  "Every workload shares one store, so data never needs copying",
                ],
                ["Veriyi sıkıştırır", "It compresses the data"],
                ["Yalnızca Power BI için depolama sağlar", "It provides storage only for Power BI"],
                ["Verileri şifreler", "It encrypts the data"],
              ],
              answer: 0,
              explain: [
                "Klasik mimarilerde aynı veri veri gölünde, ambarda ve BI modelinde ayrı ayrı durur; üç kopya, üç maliyet ve üç senkronizasyon sorunu demektir. OneLake tek kopyayı hedefler: Spark yazar, SQL okur, Power BI raporlar — hepsi aynı dosyalar üzerinden.",
                "In classic architectures the same data sits separately in the lake, the warehouse and the BI model: three copies, three costs and three synchronisation problems. OneLake targets a single copy: Spark writes, SQL reads, Power BI reports — all over the same files.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "lakehouse-mu-warehouse-mu",
          title: L("Lakehouse mu, Warehouse mu?", "Lakehouse or Warehouse?"),
          summary: L(
            "Fabric iki depolama öğesi sunuyor. Hangisini ne zaman seçersin?",
            "Fabric offers two storage items. Which do you choose, and when?",
          ),
          minutes: 14,
          blocks: [
            text(
              "Fabric'te veri tutmanın iki ana yolu vardır ve yeni başlayanların en çok takıldığı karar budur.\n\n**Lakehouse**\n- Dosya tabanlı; hem yapılandırılmış tabloları hem ham dosyaları (JSON, görüntü, log) tutar\n- **Spark (Python, Scala, SQL)** ile çalışır — notebook merkezli\n- SQL uç noktası **yalnızca okuma** sunar\n- Veri mühendisi ve veri bilimci için tasarlandı\n\n**Warehouse**\n- Tamamen tablo tabanlı; klasik ambar deneyimi\n- **T-SQL** ile çalışır — `INSERT`, `UPDATE`, `DELETE` ve tam işlem (transaction) desteği\n- SQL Server'dan gelen ekipler için tanıdık\n- Analist ve BI geliştirici için tasarlandı",
              "There are two main ways to hold data in Fabric, and this is the decision beginners stumble on most.\n\n**Lakehouse**\n- File-based; holds both structured tables and raw files (JSON, images, logs)\n- Works with **Spark (Python, Scala, SQL)** — notebook-centric\n- Its SQL endpoint is **read-only**\n- Designed for data engineers and data scientists\n\n**Warehouse**\n- Entirely table-based; the classic warehouse experience\n- Works with **T-SQL** — `INSERT`, `UPDATE`, `DELETE` and full transaction support\n- Familiar to teams coming from SQL Server\n- Designed for analysts and BI developers",
            ),
            tip(
              "İkisini birden kullanabilirsin",
              "You can use both",
              "Bu bir \"ya o ya bu\" kararı değildir. Yaygın ve sağlıklı desen şudur:\n\n**Lakehouse'ta ham ve işlenmiş katmanlar** (bronz, gümüş) → Spark ile ağır dönüşümler yapılır.\n**Warehouse'ta sunum katmanı** (altın) → analistler T-SQL ile rahatça sorgular, BI buradan beslenir.\n\nOneLake sayesinde iki öğe birbirinin verisini **kopyalamadan** okuyabilir: Warehouse, Lakehouse tablolarına kısayol (shortcut) ile bağlanır. Böylece her ekip alıştığı araçla çalışır ve veri tek kopya kalır.",
              "This is not an either/or decision. The common and healthy pattern is:\n\n**Raw and refined layers in the Lakehouse** (bronze, silver) → heavy transformation with Spark.\n**The serving layer in the Warehouse** (gold) → analysts query comfortably in T-SQL and BI feeds from here.\n\nThanks to OneLake the two items can read each other's data **without copying**: the Warehouse attaches to Lakehouse tables through a shortcut. Each team works in the tool it knows and the data stays a single copy.",
            ),
            quiz({
              id: "q1",
              q: [
                "SQL Server geçmişi olan analist ekibi `UPDATE` ve `DELETE` çalıştırmak istiyor. Hangi öğe?",
                "An analyst team from a SQL Server background wants to run `UPDATE` and `DELETE`. Which item?",
              ],
              options: [
                ["Warehouse — tam T-SQL yazma desteği sunar", "Warehouse — it offers full T-SQL write support"],
                ["Lakehouse", "Lakehouse"],
                ["Power BI veri kümesi", "A Power BI dataset"],
                ["KQL veritabanı", "A KQL database"],
              ],
              answer: 0,
              explain: [
                "Lakehouse'un SQL uç noktası yalnızca okuma sağlar; oradaki veriyi değiştirmek için Spark notebook yazmak gerekir. Warehouse ise klasik T-SQL yazma işlemlerini ve işlemleri destekler, dolayısıyla SQL Server'dan gelen bir ekip için doğrudan tanıdık gelir.",
                "The Lakehouse's SQL endpoint is read-only; changing that data requires writing a Spark notebook. The Warehouse supports classic T-SQL writes and transactions, so it feels immediately familiar to a team arriving from SQL Server.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "kapasite-ve-calisma-alani",
          title: L("Kapasite, çalışma alanı ve lisans", "Capacity, workspaces and licensing"),
          summary: L(
            "Fabric'te maliyet nasıl oluşur ve içerik nasıl düzenlenir?",
            "How does cost arise in Fabric, and how is content organised?",
          ),
          minutes: 14,
          blocks: [
            text(
              "Fabric'in ticari modeli üç kavrama dayanır:\n\n- **Kapasite (Capacity)** — Satın aldığın hesaplama gücü. F2'den F2048'e kadar boyutlar vardır; sayı kapasite birimini (CU) gösterir. **Tüm iş yükleri bu havuzu paylaşır**: Spark işi, ambar sorgusu, rapor yenilemesi aynı kaynaktan yer.\n- **Çalışma alanı (Workspace)** — İçeriğin yaşadığı klasör. Bir kapasiteye atanır. Geliştirme / Test / Üretim için ayrı çalışma alanları kurulur.\n- **Kullanıcı lisansı** — İçeriği görüntülemek için Power BI Pro veya kapasite F64 ve üzeriyse ücretsiz görüntüleme.\n\nÖnemli fark: kapasite **saatlik** ücretlendirilir ve kullanılmasa da çalışıyorsa faturalanır. Duraklatabilirsin (pause) — geliştirme kapasitelerini gece duraklatmak ciddi tasarruf sağlar.",
              "Fabric's commercial model rests on three concepts:\n\n- **Capacity** — the compute you buy. Sizes run from F2 to F2048; the number is capacity units (CU). **Every workload shares this pool**: a Spark job, a warehouse query and a report refresh all eat from the same source.\n- **Workspace** — the folder content lives in. It is assigned to a capacity. Separate workspaces are set up for Development / Test / Production.\n- **User licence** — Power BI Pro to view content, or free viewing when the capacity is F64 or above.\n\nAn important detail: capacity is billed **hourly** and charges whether used or not, as long as it is running. You can pause it — pausing development capacities overnight saves real money.",
            ),
            pitfall(
              "Kısıtlama (throttling) sürprizi",
              "The throttling surprise",
              "Kapasite paylaşımlı olduğu için ağır bir iş, aynı kapasitedeki her şeyi etkiler. Kapasiteyi aşan kullanım önce **yavaşlama**, sonra **kısıtlama (throttling)**, en sonunda **reddedilen istekler** olarak görünür.\n\nTipik senaryo: bir veri mühendisi öğleden sonra büyük bir Spark işi başlatır; aynı anda yönetim toplantısındaki rapor açılmaz.\n\nKorunma yolu: **üretim raporlarını ve ağır geliştirme işlerini ayrı kapasitelere koy.** Ayrıca Fabric Capacity Metrics uygulamasını kur ve kullanımı düzenli izle — kapasite doluluğu %80'i aşmaya başladığında büyütme veya iş dağıtımı planlaman gerekir.",
              "Because capacity is shared, a heavy job affects everything on it. Usage beyond the capacity shows up first as **slowdown**, then **throttling**, and finally **rejected requests**.\n\nThe typical scenario: a data engineer starts a large Spark job in the afternoon and the report in the management meeting will not open.\n\nThe defence: **put production reports and heavy development work on separate capacities.** Also install the Fabric Capacity Metrics app and watch utilisation regularly — once it starts passing 80% you need a plan to scale up or redistribute work.",
            ),
            quiz({
              id: "q1",
              q: [
                "Geliştirme ortamının gece boyunca maliyet üretmesini nasıl engellersin?",
                "How do you stop a development environment from costing money overnight?",
              ],
              options: [
                [
                  "Kapasiteyi duraklatmak (pause) — durdurulan kapasite ücretlendirilmez",
                  "Pause the capacity — a paused capacity is not billed",
                ],
                ["Çalışma alanını silmek", "Delete the workspace"],
                ["Kullanıcı lisansını iptal etmek", "Cancel the user licences"],
                ["Raporları kapatmak", "Close the reports"],
              ],
              answer: 0,
              explain: [
                "Fabric kapasitesi, üzerinde iş çalışmasa bile açık olduğu sürece saatlik ücretlendirilir. Duraklatmak faturayı durdurur ve içeriği silmez. Geliştirme kapasitelerini otomatik duraklatma zamanlamak, bulut maliyetini yarıya indirebilen en basit önlemdir.",
                "A Fabric capacity is billed hourly while it is running, even with no jobs on it. Pausing stops the billing and does not delete content. Scheduling automatic pauses for development capacities is the simplest measure that can halve a cloud bill.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "junior",
      title: L("Fabric'in parçaları", "The pieces of Fabric"),
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
      id: "mid",
      title: L("Medallion mimarisi", "Medallion architecture"),
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
      id: "senior",
      title: L("Yönetişim ve maliyet", "Governance and cost"),
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
    {
      id: "expert",
      title: L("Fabric'i üretimde işletmek", "Running Fabric in production"),
      description: L(
        "Kısayollar, dağıtım hatları ve gerçek zamanlı iş yükleri: platformu ekipçe yönetmek.",
        "Shortcuts, deployment pipelines and real-time workloads: running the platform as a team.",
      ),
      lessons: [
        lesson({
          slug: "kisayollar-ve-aynalama",
          title: L("Kısayollar ve veri aynalama", "Shortcuts and mirroring"),
          summary: L(
            "Veriyi kopyalamadan kullanmak: OneLake'in en pratik özelliği.",
            "Using data without copying it: OneLake's most practical feature.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Klasik veri mimarilerinde her yeni ihtiyaç bir kopya doğurur: veri gölünden ambara kopyala, ambardan BI modeline kopyala. Her kopya ayrı depolama maliyeti, ayrı senkronizasyon işi ve **tutarsızlık riski** demektir.\n\n**Kısayol (shortcut)**, OneLake'in bu döngüyü kıran özelliğidir. Başka bir konumdaki veriyi, kendi çalışma alanındaymış gibi gösterir — ama **fiziksel kopya oluşturmaz**. Kısayol kurabileceğin yerler:\n\n- Aynı kuruluştaki başka bir Lakehouse veya Warehouse\n- Amazon S3\n- Azure Data Lake Storage Gen2\n- Google Cloud Storage\n- Dataverse\n\nBu, farklı bulutlardaki veriyi tek bir mantıksal göl altında birleştirmeni sağlar: veri S3'te kalır, sen Fabric'ten okursun.",
              "In classic architectures every new need spawns a copy: from lake to warehouse, from warehouse to BI model. Each copy means separate storage cost, separate synchronisation work and **a risk of divergence**.\n\nA **shortcut** is the OneLake feature that breaks this cycle. It surfaces data held elsewhere as though it were in your own workspace — without making a **physical copy**. You can create shortcuts to:\n\n- another Lakehouse or Warehouse in the same organisation\n- Amazon S3\n- Azure Data Lake Storage Gen2\n- Google Cloud Storage\n- Dataverse\n\nThis lets you unify data across clouds under one logical lake: the data stays in S3 and you read it from Fabric.",
            ),
            text(
              "**Aynalama (mirroring)** ise farklı bir sorunu çözer: operasyonel bir veritabanını (Azure SQL, Cosmos DB, Snowflake) neredeyse gerçek zamanlı olarak Fabric'e yansıtır.\n\n- Kaynak veritabanı normal çalışmaya devam eder\n- Değişiklikler sürekli olarak OneLake'e Delta biçiminde akar\n- Analistler kaynağa hiç dokunmadan güncel veriyi sorgular\n- ETL hattı yazmana gerek kalmaz\n\nBu, \"analistlerin üretim veritabanını yormasını\" engelleyen en zahmetsiz yoldur: ayna kopya analitik yükü tamamen üstlenir, üretim veritabanı sadece uygulamaya hizmet eder.",
              "**Mirroring** solves a different problem: it replicates an operational database (Azure SQL, Cosmos DB, Snowflake) into Fabric in near real time.\n\n- the source database carries on as normal\n- changes flow continuously into OneLake in Delta format\n- analysts query current data without touching the source at all\n- you write no ETL pipeline\n\nThis is the least laborious way to stop analysts loading the production database: the mirror absorbs the entire analytical workload while production serves only the application.",
            ),
            quiz({
              id: "q1",
              q: [
                "Verin Amazon S3'te duruyor ve taşımak istemiyorsun ama Fabric'ten sorgulaman gerekiyor. Ne kullanırsın?",
                "Your data sits in Amazon S3 and you do not want to move it, but you need to query it from Fabric. What do you use?",
              ],
              options: [
                [
                  "OneLake kısayolu — veri yerinde kalır, Fabric üzerinden okunur",
                  "A OneLake shortcut — the data stays where it is and is read through Fabric",
                ],
                ["Veriyi kopyalayan bir hat kurmak", "Build a pipeline that copies the data"],
                ["Aynalama", "Mirroring"],
                ["Mümkün değil", "It is not possible"],
              ],
              answer: 0,
              explain: [
                "Kısayol tam olarak bunun için vardır: farklı bir bulutta duran veriyi kopyalamadan OneLake'e bağlar. Kopyalayan bir hat kurmak da çalışır ama depolama maliyetini ikiye katlar ve senkronizasyon sorumluluğu doğurur. Aynalama ise dosya değil operasyonel **veritabanları** içindir.",
                "A shortcut exists precisely for this: it attaches data living in another cloud to OneLake without copying it. A copy pipeline would also work but doubles storage cost and creates a synchronisation burden. Mirroring is for operational **databases**, not files.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "fabric-dagitim-ve-yasam-dongusu",
          title: L("Dağıtım hatları ve yaşam döngüsü", "Deployment pipelines and lifecycle"),
          summary: L(
            "Geliştirme → Test → Üretim: değişikliği elle kopyalamadan taşımak.",
            "Development → Test → Production: promoting changes without copying by hand.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Bir raporu veya veri hattını doğrudan üretimde geliştirmek, er ya da geç çalışan bir şeyi bozmakla biter. Fabric bunun için üç aşamalı bir yapı sunar.\n\n**Dağıtım hattı (deployment pipeline)** üç çalışma alanını birbirine bağlar:\n\n1. **Geliştirme** — Değişiklikler burada yapılır, serbestçe denenir\n2. **Test** — Gerçek veriye yakın koşullarda doğrulanır\n3. **Üretim** — Kullanıcıların gördüğü ortam\n\nBir aşamadan diğerine geçişte Fabric **neyin değiştiğini** karşılaştırmalı gösterir ve seçtiklerini taşır. Bağlantı dizeleri ve parametreler her ortam için **kural (deployment rule)** ile ayarlanır — test ortamı test veritabanına, üretim üretim veritabanına bakar.",
              "Developing a report or pipeline directly in production ends, sooner or later, in breaking something that worked. Fabric offers a three-stage structure for this.\n\nA **deployment pipeline** links three workspaces:\n\n1. **Development** — where changes are made and freely tried\n2. **Test** — validated under conditions close to real data\n3. **Production** — what users see\n\nMoving between stages, Fabric shows a comparison of **what changed** and promotes what you select. Connection strings and parameters are set per environment with **deployment rules** — test points at the test database, production at the production one.",
            ),
            text(
              "**Git entegrasyonu** ikinci katmandır. Bir çalışma alanını Azure DevOps veya GitHub deposuna bağlarsın; içerik metin dosyaları olarak depoda tutulur.\n\nBunun getirdikleri:\n\n- **Sürüm geçmişi** — Kim, ne zaman, neyi değiştirdi\n- **Dallanma** — İki kişi paralel çalışıp birleştirebilir\n- **Kod incelemesi** — Değişiklik üretime çıkmadan önce gözden geçirilir\n- **Geri alma** — Bozulan bir değişiklikten önceki hâle dönmek tek komut\n\nDağıtım hattı ile Git birbirinin alternatifi değildir: **Git kaynak kontrolü**, dağıtım hattı ise **ortamlar arası terfi** içindir. Olgun ekipler ikisini birlikte kullanır.",
              "**Git integration** is the second layer. You connect a workspace to an Azure DevOps or GitHub repository, and content is stored there as text files.\n\nWhat that brings:\n\n- **Version history** — who changed what, and when\n- **Branching** — two people can work in parallel and merge\n- **Code review** — a change is reviewed before it reaches production\n- **Rollback** — returning to the state before a bad change is one command\n\nDeployment pipelines and Git are not alternatives: **Git is for source control**, the pipeline is for **promotion between environments**. Mature teams use both.",
            ),
            quiz({
              id: "q1",
              q: [
                "Test ortamının test veritabanına, üretimin üretim veritabanına bakmasını nasıl sağlarsın?",
                "How do you make the test environment point at the test database and production at the production one?",
              ],
              options: [
                [
                  "Dağıtım kuralları (deployment rules) ile her aşamanın bağlantısını ayrı tanımlayarak",
                  "By defining each stage's connection separately with deployment rules",
                ],
                ["Her ortamda raporu yeniden kurarak", "By rebuilding the report in each environment"],
                ["Aynı veritabanını kullanarak", "By using the same database everywhere"],
                ["Elle bağlantıyı değiştirerek", "By changing the connection by hand each time"],
              ],
              answer: 0,
              explain: [
                "Dağıtım kuralları, içerik taşınırken ortama özgü ayarların **otomatik** olarak değiştirilmesini sağlar. Elle değiştirmek her terfide unutulabilecek bir adım demektir ve er ya da geç üretim raporu test verisini gösterir — bu, veri ekiplerinin klasik utanç anlarından biridir.",
                "Deployment rules swap environment-specific settings **automatically** as content is promoted. Doing it by hand is a step that will eventually be forgotten, and sooner or later the production report shows test data — one of the classic embarrassments in data teams.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "gercek-zamanli-ve-aktivasyon",
          title: L("Gerçek zamanlı zekâ ve Data Activator", "Real-Time Intelligence and Data Activator"),
          summary: L(
            "Veriye bakmayı bırak: koşul gerçekleştiğinde sistem seni uyarsın.",
            "Stop watching the data: let the system alert you when a condition is met.",
          ),
          minutes: 16,
          blocks: [
            text(
              "**Real-Time Intelligence**, Fabric'in akış verisi tarafıdır ve üç parçadan oluşur:\n\n- **Eventstream** — Olayları kaynaklardan (IoT cihazları, uygulama olayları, Azure Event Hubs) toplayıp yönlendirir\n- **KQL veritabanı (Eventhouse)** — Zaman serisi ve log verisi için optimize edilmiş depo. Milyarlarca olayda saniyeler içinde sorgu çalıştırır.\n- **KQL sorgu dili** — Log analizi için tasarlanmış, SQL'den farklı ama öğrenmesi kolay bir dil\n\nKlasik ambar, saatlik ve günlük toplu veriye göre tasarlanmıştır. Saniyede binlerce olay yazan bir sistemde ise KQL veritabanı hem çok daha hızlı hem çok daha ucuzdur.",
              "**Real-Time Intelligence** is Fabric's streaming side and has three parts:\n\n- **Eventstream** — collects and routes events from sources (IoT devices, application events, Azure Event Hubs)\n- **KQL database (Eventhouse)** — a store optimised for time-series and log data. It queries billions of events in seconds.\n- **KQL query language** — a language designed for log analysis; different from SQL but easy to pick up\n\nA classic warehouse is designed for hourly and daily batches. For a system writing thousands of events per second, a KQL database is both far faster and far cheaper.",
            ),
            text(
              "**Data Activator**, veri platformlarında az bilinen ama fikri güçlü bir bileşendir: veriyi izler ve **koşul gerçekleştiğinde eylem tetikler**.\n\nRaporu birinin açıp bakmasını beklemek yerine sistem şunu yapar:\n\n- Stok belirli bir eşiğin altına düşerse → satın alma ekibine e-posta\n- Bir mağazanın satışı normalin %40 altına inerse → bölge müdürüne Teams mesajı\n- Sensör sıcaklığı sınırı aşarsa → bakım iş emri açan bir Power Automate akışı\n\nBu, analitiğin doğal olgunlaşma yönüdür: **açıklayıcı** (ne oldu?) → **teşhis edici** (neden oldu?) → **uyarıcı** (bir şey oldu, bak!) → **kuralcı** (şunu yap).\n\nPratik değeri şudur: kimsenin sürekli bakmadığı bir rapor, kimsenin fark etmediği bir sorun demektir. Uyarı, raporun okunmasına bağımlılığı ortadan kaldırır.",
              "**Data Activator** is a little-known but conceptually strong component: it watches data and **triggers an action when a condition is met**.\n\nInstead of waiting for somebody to open a report, the system does this:\n\n- stock drops below a threshold → an email to the purchasing team\n- a store's sales fall 40% below normal → a Teams message to the regional manager\n- a sensor's temperature exceeds a limit → a Power Automate flow opening a maintenance ticket\n\nThis is the natural maturation of analytics: **descriptive** (what happened?) → **diagnostic** (why?) → **alerting** (something happened, look!) → **prescriptive** (do this).\n\nThe practical value is simple: a report nobody watches continuously is a problem nobody notices. Alerting removes the dependency on somebody reading it.",
            ),
            quiz({
              id: "q1",
              q: [
                "Saniyede 50.000 IoT olayı yazan bir sistemi analiz etmek için Fabric'te hangi depo uygundur?",
                "Which Fabric store suits analysing a system writing 50,000 IoT events per second?",
              ],
              options: [
                [
                  "KQL veritabanı (Eventhouse) — zaman serisi ve log verisi için optimize",
                  "A KQL database (Eventhouse) — optimised for time-series and log data",
                ],
                ["Warehouse", "The Warehouse"],
                ["Power BI veri kümesi", "A Power BI dataset"],
                ["Excel dosyası", "An Excel file"],
              ],
              answer: 0,
              explain: [
                "Klasik ambarlar toplu yükleme için tasarlanmıştır; saniyede on binlerce satırlık sürekli yazma onları zorlar. KQL veritabanı tam olarak yüksek hacimli, zaman damgalı olay akışı için kurulmuştur ve bu veri üzerinde sorgu performansı bir ambarınkiyle kıyaslanmayacak kadar iyidir.",
                "Classic warehouses are designed for batch loading; continuous writes of tens of thousands of rows per second strain them. A KQL database is built precisely for high-volume, timestamped event streams and its query performance on that data is not comparable to a warehouse's.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
