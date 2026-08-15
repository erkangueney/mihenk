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
            quiz({
              id: "q2",
              q: [
                "Delta-Parquet standardının Fabric'teki rolü nedir?",
                "What role does the Delta-Parquet standard play in Fabric?",
              ],
              options: [
                [
                  "Tüm bileşenlerin (ambar, Spark, Power BI) aynı açık dosya biçimini okuyup yazmasını sağlar",
                  "It lets every component (warehouse, Spark, Power BI) read and write the same open file format",
                ],
                ["Veriyi otomatik olarak yedekler", "It automatically backs up the data"],
                ["Yalnızca Power BI'ın kullandığı özel bir formattır", "It is a proprietary format used only by Power BI"],
                ["Kapasite maliyetini düşürür", "It reduces capacity cost"],
              ],
              answer: 0,
              explain: [
                "OneLake tek depoyu sağlar ama bileşenlerin birbirinin verisini anlayabilmesi için ortak bir dosya biçimi gerekir; Delta-Parquet bu ortak dildir. Format özel değil açıktır, bu yüzden teorik olarak Fabric dışında da okunabilir.",
                "OneLake provides the single store, but the components still need a common file format to understand each other's data; Delta-Parquet is that common language. The format is open rather than proprietary, so it is theoretically readable outside Fabric too.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Klasik kurulumda beş ayrı ürünün bir arada çalışması hangi somut soruna yol açar?",
                "In the classic setup, what concrete problem does running five separate products side by side cause?",
              ],
              options: [
                [
                  "Ayrı faturalar, ayrı yetkilendirmeler ve veri kopyalayan hatlar",
                  "Separate bills, separate permissions, and pipelines that copy data around",
                ],
                ["Veri hiç depolanamaz", "Data cannot be stored at all"],
                ["Power BI çalışmaz hale gelir", "Power BI stops working"],
                ["Yalnızca performans düşer, maliyet değişmez", "Only performance drops, cost stays the same"],
              ],
              answer: 0,
              explain: [
                "Metinde tarif edilen sorun tam olarak budur: her araç kendi faturasını, kendi yetkilendirmesini getirir ve aralarında veri taşıyan ayrı hatlar kurulması gerekir. Fabric'in birleştirme vaadi doğrudan bu üç maliyeti hedefler.",
                "This is exactly the problem the text describes: each tool brings its own bill and permissions, and separate pipelines are needed to move data between them. Fabric's promise of unification targets exactly these three costs.",
              ],
            }),
            text(
              "**Fabric'in iş yükleri** — hepsi aynı OneLake üzerinde çalışır:\n\n- **Data Factory** — Veri taşıma ve hat kurma\n- **Synapse Data Engineering** — Spark ile büyük ölçekli dönüşüm (Lakehouse)\n- **Synapse Data Warehouse** — SQL ile ambar (T-SQL, tam işlem desteği)\n- **Synapse Data Science** — Model geliştirme ve MLflow\n- **Real-Time Intelligence** — Akış verisi ve olay işleme\n- **Power BI** — Raporlama ve pano\n- **Data Activator** — Veri koşullarına göre otomatik eylem tetikleme\n\nHepsi tek lisansla, tek yetkilendirme modeliyle ve tek kapasiteyle gelir.",
              "**Fabric's workloads** — all running on the same OneLake:\n\n- **Data Factory** — moving data and building pipelines\n- **Synapse Data Engineering** — large-scale transformation with Spark (Lakehouse)\n- **Synapse Data Warehouse** — a SQL warehouse (T-SQL, full transaction support)\n- **Synapse Data Science** — model development and MLflow\n- **Real-Time Intelligence** — streaming data and event processing\n- **Power BI** — reporting and dashboards\n- **Data Activator** — triggering actions automatically from data conditions\n\nAll of it comes under one licence, one permission model and one capacity.",
            ),
            quiz({
              id: "q4",
              q: [
                "Spark ile büyük ölçekli veri dönüşümü yapmak istiyorsun. Hangi iş yükünü kullanırsın?",
                "You want to run large-scale data transformation with Spark. Which workload do you use?",
              ],
              options: [
                ["Synapse Data Engineering", "Synapse Data Engineering"],
                ["Data Activator", "Data Activator"],
                ["Real-Time Intelligence", "Real-Time Intelligence"],
                ["Power BI", "Power BI"],
              ],
              answer: 0,
              explain: [
                "Synapse Data Engineering, Spark tabanlı lakehouse dönüşümleri için tasarlanmıştır. Diğer iş yükleri farklı amaçlara hizmet eder: Data Activator eylem tetikler, Real-Time Intelligence akış verisini işler, Power BI raporlar.",
                "Synapse Data Engineering is built for Spark-based lakehouse transformations. The other workloads serve different purposes: Data Activator triggers actions, Real-Time Intelligence processes streaming data, Power BI reports.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Bir stok değeri eşiğin altına düştüğünde otomatik olarak e-posta göndermek istiyorsun. Hangi iş yükü bunun içindir?",
                "You want to automatically send an email when a stock value drops below a threshold. Which workload is for this?",
              ],
              options: [
                ["Data Activator", "Data Activator"],
                ["Synapse Data Warehouse", "Synapse Data Warehouse"],
                ["Data Factory", "Data Factory"],
                ["Synapse Data Science", "Synapse Data Science"],
              ],
              answer: 0,
              explain: [
                "Data Activator, veri koşullarına göre otomatik eylem tetiklemek için tasarlanmıştır — tam olarak eşik aşıldığında bildirim gönderme senaryosu. Diğerleri veri taşıma, ambarlama veya model geliştirme içindir.",
                "Data Activator is built to trigger actions automatically from data conditions — exactly the scenario of notifying when a threshold is crossed. The others are for moving data, warehousing, or model development.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Akış verisi ve olay işleme hangi iş yüküne aittir?",
                "Which workload owns streaming data and event processing?",
              ],
              options: [
                ["Real-Time Intelligence", "Real-Time Intelligence"],
                ["Data Factory", "Data Factory"],
                ["Synapse Data Warehouse", "Synapse Data Warehouse"],
                ["Power BI", "Power BI"],
              ],
              answer: 0,
              explain: [
                "Real-Time Intelligence, sürekli akan olay verisini işlemek için vardır. Data Factory veri taşır ama akış işlemez; Warehouse ve Power BI ise durağan/toplu veri üzerinde çalışır.",
                "Real-Time Intelligence exists to process continuously flowing event data. Data Factory moves data but doesn't process streams; the Warehouse and Power BI work on static/batch data.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Kaynak sistemden veriyi taşımak ve hat (pipeline) kurmak hangi iş yükünün işidir?",
                "Moving data from a source system and building pipelines is the job of which workload?",
              ],
              options: [
                ["Data Factory", "Data Factory"],
                ["Synapse Data Science", "Synapse Data Science"],
                ["Real-Time Intelligence", "Real-Time Intelligence"],
                ["Data Activator", "Data Activator"],
              ],
              answer: 0,
              explain: [
                "Data Factory, Fabric'in veri taşıma ve orkestrasyon katmanıdır. Data Science model geliştirir, Real-Time Intelligence akış işler, Data Activator koşullara göre eylem tetikler — hiçbiri kaynaktan veri taşıma işini üstlenmez.",
                "Data Factory is Fabric's data-movement and orchestration layer. Data Science develops models, Real-Time Intelligence processes streams, and Data Activator triggers actions from conditions — none of them takes on moving data from a source.",
              ],
            }),
            pitfall(
              "Tek platformun bedeli: satıcı bağımlılığı",
              "The price of one platform: vendor lock-in",
              "Fabric'in vaadi gerçektir: entegrasyon derdi biter, yetkilendirme tek yerden yönetilir, Power BI ile bağ kusursuzdur. Ama karar verirken bedelini de görmek gerekir.\n\nTüm veri platformunu tek satıcıya bağlamak, **fiyat ve yol haritası pazarlığındaki gücünü** azaltır. Kapasite modeli (F-SKU) de dikkat ister: kapasite paylaşımlıdır ve ağır bir Spark işi aynı anda raporları yavaşlatabilir.\n\nAçık Delta biçimi bu riski kısmen azaltır — veri en azından standart bir formatta durur ve teorik olarak taşınabilir. Ama hatlar, ölçüler ve yetkilendirme yine Fabric'e özgüdür.",
              "Fabric's promise is real: integration pain disappears, permissions are managed in one place, and the tie to Power BI is seamless. But the cost belongs in the decision too.\n\nPutting your entire data platform with one vendor weakens your **leverage on price and roadmap**. The capacity model (F-SKUs) also needs care: capacity is shared, and a heavy Spark job can slow down reports at the same time.\n\nThe open Delta format mitigates the risk somewhat — the data at least sits in a standard format and is theoretically portable. But the pipelines, measures and permissions remain Fabric-specific.",
            ),
            quiz({
              id: "q8",
              q: [
                "Tüm veri platformunu tek satıcıya bağlamanın asıl riski nedir?",
                "What is the real risk of tying your entire data platform to one vendor?",
              ],
              options: [
                [
                  "Fiyat ve yol haritası pazarlığındaki gücün azalır",
                  "You lose leverage in price and roadmap negotiations",
                ],
                ["Veri hiç okunamaz hale gelir", "The data becomes completely unreadable"],
                ["Power BI çalışmayı durdurur", "Power BI stops working"],
                ["OneLake devre dışı kalır", "OneLake gets disabled"],
              ],
              answer: 0,
              explain: [
                "Metin bu riski açıkça pazarlık gücünün azalması olarak tanımlar; teknik bir arıza değil, ticari bir dezavantajdır. Açık Delta biçimi veriyi taşınabilir kılsa da hatlar ve yetkilendirme yine Fabric'e özgü kalır.",
                "The text names this risk explicitly as reduced negotiating leverage — a commercial disadvantage, not a technical failure. The open Delta format keeps the data portable, but the pipelines and permissions remain Fabric-specific.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "F-SKU kapasite modelinde ağır bir Spark işi neden dikkat gerektirir?",
                "Why does a heavy Spark job need care under the F-SKU capacity model?",
              ],
              options: [
                [
                  "Kapasite paylaşımlıdır; aynı anda çalışan raporları yavaşlatabilir",
                  "Capacity is shared, so it can slow down reports running at the same time",
                ],
                ["Spark işleri Fabric'te çalışmaz", "Spark jobs don't run in Fabric at all"],
                ["Her iş yükü ayrı kapasite kullanır", "Every workload uses its own separate capacity"],
                ["Kapasite otomatik olarak sınırsız büyür", "Capacity grows automatically without limit"],
              ],
              answer: 0,
              explain: [
                "F-SKU kapasitesi tüm iş yüklerinin paylaştığı ortak bir havuzdur. Bu yüzden ağır bir Spark işi, aynı kapasitedeki bir raporun yenilenmesini de yavaşlatabilir — kapasite planlaması bu paylaşımı hesaba katmalıdır.",
                "An F-SKU capacity is a shared pool used by every workload. A heavy Spark job can therefore slow down a report refresh sitting on the same capacity — capacity planning has to account for that sharing.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Açık Delta biçimi, satıcı bağımlılığı riskini tamamen ortadan kaldırır mı?",
                "Does the open Delta format completely remove the vendor lock-in risk?",
              ],
              options: [
                [
                  "Hayır, yalnızca kısmen azaltır — hatlar, ölçüler ve yetkilendirme yine Fabric'e özgüdür",
                  "No, it only reduces it partially — the pipelines, measures and permissions remain Fabric-specific",
                ],
                ["Evet, veri tamamen bağımsız hale gelir", "Yes, the data becomes completely independent"],
                ["Delta biçimi bağımlılıkla ilgisizdir", "The Delta format has nothing to do with lock-in"],
                ["Hayır, riski tamamen artırır", "No, it makes the risk completely worse"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça belirtir: veri standart formatta durduğu için teorik olarak taşınabilir, ama iş mantığını taşıyan hatlar, ölçüler ve yetkilendirme kuralları Fabric'e özgü kalır ve bunları başka bir platforma taşımak ayrı bir iştir.",
                "The text says this directly: because the data sits in a standard format it is theoretically portable, but the pipelines carrying the business logic, the measures, and the permission rules stay Fabric-specific — moving those to another platform is a separate job.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Lakehouse'un SQL uç noktası hangi işlemi desteklemez?",
                "Which operation does the Lakehouse's SQL endpoint NOT support?",
              ],
              options: [
                [
                  "Yazma işlemleri (INSERT/UPDATE/DELETE) — sadece okuma sunar",
                  "Write operations (INSERT/UPDATE/DELETE) — it only offers read",
                ],
                ["Okuma sorguları", "Read queries"],
                ["Tablo listeleme", "Listing tables"],
                ["Şema görüntüleme", "Viewing the schema"],
              ],
              answer: 0,
              explain: [
                "Lakehouse'ta veriyi değiştirmenin yolu Spark not defteri yazmaktır; SQL uç noktası yalnızca okuma amaçlıdır. Bu, Lakehouse'u T-SQL yazma alışkanlığı olan ekipler için doğrudan uygun yapmaz.",
                "Changing data in a Lakehouse means writing a Spark notebook; its SQL endpoint exists for reading only. That makes the Lakehouse not directly suited to teams used to writing T-SQL.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Lakehouse hangi tür veriyi tutabilir ama Warehouse tutamaz?",
                "What kind of data can the Lakehouse hold that the Warehouse cannot?",
              ],
              options: [
                [
                  "Ham dosyalar (JSON, görüntü, log) — yapılandırılmamış veri",
                  "Raw files (JSON, images, logs) — unstructured data",
                ],
                ["Sayısal sütunlar", "Numeric columns"],
                ["Tarih sütunları", "Date columns"],
                ["Metin tabloları", "Text tables"],
              ],
              answer: 0,
              explain: [
                "Warehouse tamamen tablo tabanlıdır; Lakehouse ise dosya tabanlı olduğu için hem yapılandırılmış tabloları hem ham dosyaları tutabilir. Bu esneklik, veri mühendisliği ve veri bilimi iş akışları için Lakehouse'u seçilesi kılar.",
                "The Warehouse is entirely table-based, while the Lakehouse is file-based and can hold both structured tables and raw files. That flexibility is what makes the Lakehouse the pick for data-engineering and data-science workflows.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Warehouse'un sunduğu ve Lakehouse'ta bulunmayan temel yetenek nedir?",
                "What core capability does the Warehouse offer that the Lakehouse lacks?",
              ],
              options: [
                [
                  "Tam işlem (transaction) desteğiyle T-SQL yazma",
                  "T-SQL writes with full transaction support",
                ],
                ["Dosya depolama", "File storage"],
                ["Spark ile çalışma", "Working with Spark"],
                ["OneLake'e bağlanma", "Connecting to OneLake"],
              ],
              answer: 0,
              explain: [
                "Warehouse, klasik ambar deneyimini T-SQL üzerinden tam transaction desteğiyle sunar; bu da SQL Server geçmişi olan ekiplere tanıdık gelir. Lakehouse'ta aynı yazma gücü yoktur, sadece Spark üzerinden dönüşüm yapılır.",
                "The Warehouse offers the classic warehouse experience over T-SQL with full transaction support, which feels familiar to teams from a SQL Server background. The Lakehouse has no equivalent write power — transformation only happens through Spark.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Bir veri bilimci Python ile ham log dosyaları üzerinde çalışacak. Hangi öğe uygundur?",
                "A data scientist will work in Python over raw log files. Which item fits?",
              ],
              options: [
                ["Lakehouse", "Lakehouse"],
                ["Warehouse", "Warehouse"],
                ["Power BI raporu", "A Power BI report"],
                ["KQL veritabanı", "A KQL database"],
              ],
              answer: 0,
              explain: [
                "Lakehouse, Spark (Python dahil) ile çalışmak ve ham/yapılandırılmamış dosyaları işlemek için tasarlanmıştır — tam olarak veri bilimcinin ihtiyacı. Warehouse T-SQL'e dayanır ve dosya işleme için uygun değildir.",
                "The Lakehouse is designed for working in Spark (Python included) and processing raw/unstructured files — exactly what a data scientist needs. The Warehouse is built around T-SQL and is not suited to file processing.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Lakehouse kimler için tasarlanmıştır?",
                "Who is the Lakehouse designed for?",
              ],
              options: [
                ["Veri mühendisi ve veri bilimci", "Data engineers and data scientists"],
                ["Yalnızca son kullanıcı raporu okuyanlar", "Only end users reading reports"],
                ["Yalnızca finans ekibi", "Only the finance team"],
                ["Yalnızca güvenlik ekibi", "Only the security team"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça ayırır: Lakehouse mühendis/bilimci için, Warehouse ise analist ve BI geliştirici için tasarlanmıştır. Bu ayrım, hangi öğeyi seçeceğine karar verirken ekibin rolünü de hesaba katmanı sağlar.",
                "The text draws this distinction explicitly: the Lakehouse is designed for engineers/scientists, the Warehouse for analysts and BI developers. That split means the team's role belongs in the decision too, not just the data shape.",
              ],
            }),
            tip(
              "İkisini birden kullanabilirsin",
              "You can use both",
              "Bu bir \"ya o ya bu\" kararı değildir. Yaygın ve sağlıklı desen şudur:\n\n**Lakehouse'ta ham ve işlenmiş katmanlar** (bronz, gümüş) → Spark ile ağır dönüşümler yapılır.\n**Warehouse'ta sunum katmanı** (altın) → analistler T-SQL ile rahatça sorgular, BI buradan beslenir.\n\nOneLake sayesinde iki öğe birbirinin verisini **kopyalamadan** okuyabilir: Warehouse, Lakehouse tablolarına kısayol (shortcut) ile bağlanır. Böylece her ekip alıştığı araçla çalışır ve veri tek kopya kalır.",
              "This is not an either/or decision. The common and healthy pattern is:\n\n**Raw and refined layers in the Lakehouse** (bronze, silver) → heavy transformation with Spark.\n**The serving layer in the Warehouse** (gold) → analysts query comfortably in T-SQL and BI feeds from here.\n\nThanks to OneLake the two items can read each other's data **without copying**: the Warehouse attaches to Lakehouse tables through a shortcut. Each team works in the tool it knows and the data stays a single copy.",
            ),
            quiz({
              id: "q7",
              q: [
                "Önerilen yaygın desende ham ve işlenmiş katmanlar (bronz, gümüş) nerede tutulur?",
                "In the recommended common pattern, where do the raw and refined layers (bronze, silver) live?",
              ],
              options: [
                [
                  "Lakehouse'ta — Spark ile ağır dönüşümler burada yapılır",
                  "In the Lakehouse — heavy transformation with Spark happens here",
                ],
                ["Warehouse'ta", "In the Warehouse"],
                ["Power BI'da", "In Power BI"],
                ["KQL veritabanında", "In a KQL database"],
              ],
              answer: 0,
              explain: [
                "Metindeki desende ham/işlenmiş katmanlar Lakehouse'ta durur çünkü Spark dönüşümleri burada koşar; sunum katmanı (gold) ise analistlerin T-SQL ile rahat çalıştığı Warehouse'a taşınır.",
                "In the pattern described, the raw/refined layers sit in the Lakehouse because that's where Spark transformations run; the serving (gold) layer moves to the Warehouse where analysts work comfortably in T-SQL.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Warehouse, Lakehouse tablolarına nasıl erişir — veri kopyalanır mı?",
                "How does the Warehouse access Lakehouse tables — is the data copied?",
              ],
              options: [
                [
                  "Hayır, kısayol (shortcut) ile bağlanır; veri kopyalanmaz",
                  "No, it connects through a shortcut; the data is not copied",
                ],
                ["Evet, her gece kopyalanır", "Yes, it's copied every night"],
                ["Warehouse, Lakehouse tablolarına hiç erişemez", "The Warehouse cannot access Lakehouse tables at all"],
                ["Power BI aracılığıyla dolaylı kopyalanır", "It's copied indirectly through Power BI"],
              ],
              answer: 0,
              explain: [
                "OneLake sayesinde Warehouse, Lakehouse tablolarına kısayolla bağlanıp aynı dosyaları okuyabilir; ayrı bir kopya oluşturulmaz. Bu, iki öğenin birbirinin verisini tek kopya olarak paylaşmasını sağlayan mekanizmadır.",
                "Thanks to OneLake, the Warehouse attaches to Lakehouse tables through a shortcut and reads the same files; no separate copy is made. This is the mechanism that lets the two items share a single copy of the data.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "İki öğeyi birden kullanmanın (Lakehouse + Warehouse) asıl avantajı nedir?",
                "What is the real advantage of using both items (Lakehouse + Warehouse) together?",
              ],
              options: [
                [
                  "Her ekip alıştığı araçla çalışır ve veri yine de tek kopya kalır",
                  "Each team works in the tool it knows, and the data still stays a single copy",
                ],
                ["Maliyet iki katına çıkar ama hız artar", "Cost doubles but speed increases"],
                ["Sadece biri gerçek veriyi tutar, diğeri boş kalır", "Only one holds real data, the other stays empty"],
                ["Power BI'a ihtiyaç kalmaz", "Power BI is no longer needed"],
              ],
              answer: 0,
              explain: [
                "Desenin gücü tam burada: mühendisler Spark'ta, analistler T-SQL'de rahat çalışır, ama OneLake ve kısayol sayesinde veri kopyalanmadığı için tutarsızlık riski doğmaz.",
                "That's exactly the strength of the pattern: engineers work comfortably in Spark, analysts in T-SQL, but because OneLake and the shortcut mean no copying, there is no risk of divergence.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir ekip yalnızca BI raporlaması yapacak, ham dosya işleme ihtiyacı yok. Hangi öğeyle başlamak daha basittir?",
                "A team will only do BI reporting, with no need to process raw files. Which item is simpler to start with?",
              ],
              options: [
                [
                  "Warehouse — doğrudan T-SQL ile tablo tabanlı çalışma sunar",
                  "Warehouse — it offers table-based work directly in T-SQL",
                ],
                ["Lakehouse", "Lakehouse"],
                ["KQL veritabanı", "A KQL database"],
                ["Eventstream", "Eventstream"],
              ],
              answer: 0,
              explain: [
                "Ham dosya işleme veya Spark ihtiyacı yoksa Lakehouse'un getirdiği notebook karmaşıklığına gerek kalmaz; Warehouse doğrudan tablo tabanlı, T-SQL ile tanıdık bir başlangıç sunar.",
                "Without a need for raw-file processing or Spark, there's no reason to take on the notebook complexity the Lakehouse brings; the Warehouse offers a directly table-based, T-SQL-familiar starting point.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Kapasite (F-SKU) hangi birimle ölçülür?",
                "What unit measures capacity (F-SKU)?",
              ],
              options: [
                ["Kapasite birimi (CU)", "Capacity units (CU)"],
                ["Gigabayt", "Gigabytes"],
                ["Kullanıcı sayısı", "Number of users"],
                ["Rapor sayısı", "Number of reports"],
              ],
              answer: 0,
              explain: [
                "F2'den F2048'e kadar giden boyutlar CU cinsindendir ve büyüklüğü belirler; depolanan veri miktarıyla veya kullanıcı sayısıyla doğrudan ilgili değildir.",
                "Sizes running from F2 to F2048 are expressed in CU and determine the compute available; it isn't tied directly to stored data volume or user count.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Çalışma alanı (workspace) neyi temsil eder?",
                "What does a workspace represent?",
              ],
              options: [
                [
                  "İçeriğin yaşadığı ve bir kapasiteye atanan klasör",
                  "The folder where content lives, assigned to a capacity",
                ],
                ["Bir kullanıcı lisans türü", "A type of user licence"],
                ["Bir Power BI raporu", "A Power BI report"],
                ["Bir Spark motoru", "A Spark engine"],
              ],
              answer: 0,
              explain: [
                "Workspace, içeriğin (rapor, lakehouse, pipeline) düzenlendiği klasördür ve bir kapasiteye bağlanır. Geliştirme/Test/Üretim ayrımı da bu klasörleme üzerinden kurulur.",
                "A workspace is the folder that organises content (reports, lakehouses, pipelines) and is bound to a capacity. The Development/Test/Production split is built on this same folder structure.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Kapasite F64 ve üzerindeyse kullanıcı lisansı için ne geçerli olur?",
                "If capacity is F64 or above, what applies to user licensing?",
              ],
              options: [
                ["İçeriği ücretsiz görüntüleme mümkün olur", "Free viewing of content becomes possible"],
                ["Tüm kullanıcılar otomatik yönetici olur", "All users automatically become admins"],
                ["Power BI Pro zorunlu hale gelir", "Power BI Pro becomes mandatory"],
                ["Kapasite otomatik duraklar", "The capacity automatically pauses"],
              ],
              answer: 0,
              explain: [
                "Normalde içerik görüntülemek Power BI Pro lisansı gerektirir; ama kapasite F64 ve üzerindeyse görüntüleyiciler ücretsiz erişebilir. Bu, büyük kullanıcı kitlesi olan kuruluşlar için önemli bir maliyet farkı yaratır.",
                "Normally viewing content needs a Power BI Pro licence, but once capacity is F64 or above, viewers get free access. That makes a real cost difference for organisations with a large viewer base.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Kapasite neye göre faturalanır?",
                "How is capacity billed?",
              ],
              options: [
                ["Saatlik, çalışıyorsa kullanılmasa bile", "Hourly, even if unused, as long as it's running"],
                ["Yalnızca sorgu sayısına göre", "Only by query count"],
                ["Yalnızca depolanan veri miktarına göre", "Only by data stored"],
                ["Yıllık sabit ücretle", "A flat annual fee"],
              ],
              answer: 0,
              explain: [
                "Bu, duraklatmanın (pause) neden önemli olduğunun temelidir: kapasite açık kaldığı her saat için ücretlendirilir, kullanım olsun olmasın. Geceleri duraklatmak bu yüzden gerçek tasarruf sağlar.",
                "This is the whole reason pausing matters: capacity is billed for every hour it stays on, used or not. Pausing overnight is therefore a real saving, not a cosmetic one.",
              ],
            }),
            pitfall(
              "Kısıtlama (throttling) sürprizi",
              "The throttling surprise",
              "Kapasite paylaşımlı olduğu için ağır bir iş, aynı kapasitedeki her şeyi etkiler. Kapasiteyi aşan kullanım önce **yavaşlama**, sonra **kısıtlama (throttling)**, en sonunda **reddedilen istekler** olarak görünür.\n\nTipik senaryo: bir veri mühendisi öğleden sonra büyük bir Spark işi başlatır; aynı anda yönetim toplantısındaki rapor açılmaz.\n\nKorunma yolu: **üretim raporlarını ve ağır geliştirme işlerini ayrı kapasitelere koy.** Ayrıca Fabric Capacity Metrics uygulamasını kur ve kullanımı düzenli izle — kapasite doluluğu %80'i aşmaya başladığında büyütme veya iş dağıtımı planlaman gerekir.",
              "Because capacity is shared, a heavy job affects everything on it. Usage beyond the capacity shows up first as **slowdown**, then **throttling**, and finally **rejected requests**.\n\nThe typical scenario: a data engineer starts a large Spark job in the afternoon and the report in the management meeting will not open.\n\nThe defence: **put production reports and heavy development work on separate capacities.** Also install the Fabric Capacity Metrics app and watch utilisation regularly — once it starts passing 80% you need a plan to scale up or redistribute work.",
            ),
            quiz({
              id: "q6",
              q: [
                "Kısıtlama (throttling) sürecinde sırasıyla ne olur?",
                "In the throttling process, what happens in order?",
              ],
              options: [
                ["Yavaşlama → kısıtlama → reddedilen istekler", "Slowdown → throttling → rejected requests"],
                ["Doğrudan reddedilen istekler", "Straight to rejected requests"],
                ["Önce reddedilme, sonra yavaşlama", "Rejection first, then slowdown"],
                ["Hiçbir şey, kapasite sınırsızdır", "Nothing — capacity is unlimited"],
              ],
              answer: 0,
              explain: [
                "Kapasiteyi aşan kullanım kademeli ilerler: önce performans düşer, sonra istekler kısıtlanır, en sonunda tamamen reddedilir. Bu kademeli yapı, erken uyarı sinyallerini (yavaşlama) izlemenin neden değerli olduğunu gösterir.",
                "Usage beyond capacity escalates in stages: performance drops first, then requests get throttled, and finally they're rejected outright. That staged behaviour is exactly why watching the early warning signal (slowdown) is worth doing.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Kısıtlama riskine karşı önerilen temel korunma yöntemi nedir?",
                "What is the recommended core defence against throttling risk?",
              ],
              options: [
                [
                  "Üretim raporlarını ve ağır geliştirme işlerini ayrı kapasitelere koymak",
                  "Put production reports and heavy development work on separate capacities",
                ],
                ["Tüm işleri tek kapasitede birleştirmek", "Merge all work onto a single capacity"],
                ["Kullanıcı sayısını azaltmak", "Reduce the number of users"],
                ["Power BI'ı devre dışı bırakmak", "Disable Power BI"],
              ],
              answer: 0,
              explain: [
                "Kapasite paylaşımlı olduğu için asıl çözüm izolasyondur: kritik üretim işini ağır geliştirme yükünden ayrı bir kapasiteye koymak, birinin diğerini etkilemesini engeller.",
                "Because capacity is shared, the real fix is isolation: putting critical production work on a capacity separate from heavy development load stops one from dragging down the other.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Fabric Capacity Metrics uygulaması ne işe yarar?",
                "What is the Fabric Capacity Metrics app for?",
              ],
              options: [
                ["Kapasite kullanımını düzenli izlemeyi sağlar", "It lets you monitor capacity utilisation regularly"],
                ["Raporları otomatik tasarlar", "It designs reports automatically"],
                ["Kullanıcı lisanslarını satın alır", "It purchases user licences"],
                ["Veri temizler", "It cleans data"],
              ],
              answer: 0,
              explain: [
                "Bu uygulama kapasite doluluğunu görselleştirir; doluluk %80'i geçmeye başladığında büyütme ya da iş dağıtımı kararı almak için erken sinyal sağlar.",
                "The app visualises capacity utilisation; once it starts crossing 80% it gives you the early signal to decide on scaling up or redistributing work.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Öğleden sonra başlatılan büyük bir Spark işi neden aynı anda açılan bir raporu etkileyebilir?",
                "Why can a large Spark job started in the afternoon affect a report opened at the same time?",
              ],
              options: [
                ["Aynı paylaşımlı kapasiteden kaynak tüketirler", "They both draw resources from the same shared capacity"],
                ["Spark işleri raporları otomatik kapatır", "Spark jobs automatically close reports"],
                [
                  "Rapor ve Spark işi farklı kapasitelerde asla çalışamaz",
                  "Reports and Spark jobs can never run on different capacities",
                ],
                ["Bu ikisi arasında hiçbir ilişki yoktur", "There is no relationship between the two at all"],
              ],
              answer: 0,
              explain: [
                "Kapasite paylaşımlı bir havuz olduğu için, aynı kapasitedeki her iş aynı kaynağı paylaşır. Ağır bir Spark işi kaynağın büyük kısmını tüketirse, aynı anda çalışan bir rapor yenilemesi kaynak bulamaz ve yavaşlar.",
                "Because capacity is a shared pool, every job on it draws from the same resource. If a heavy Spark job consumes most of it, a report refresh running at the same time finds nothing left and slows down.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Geliştirme/Test/Üretim için neden ayrı çalışma alanları kurulur?",
                "Why are separate workspaces set up for Development/Test/Production?",
              ],
              options: [
                [
                  "İçeriği ortamlara göre ayırmak ve değişiklikleri kontrollü taşımak için",
                  "To separate content by environment and move changes in a controlled way",
                ],
                [
                  "Her ortam farklı bir lisans türü gerektirdiği için",
                  "Because each environment requires a different licence type",
                ],
                ["Kapasite maliyetini artırmak için", "To increase capacity cost"],
                ["Power BI'ın zorunlu kıldığı bir kural olduğu için", "Because Power BI mandates it"],
              ],
              answer: 0,
              explain: [
                "Workspace'ler içeriğin organizasyon birimidir; ortamları ayırmak, bir değişikliğin doğrudan üretime sızmasını engeller ve kontrollü bir terfi süreci kurmayı mümkün kılar.",
                "Workspaces are the organisational unit for content; separating environments stops a change from leaking straight into production and makes a controlled promotion process possible.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "OneLake'in depolama biçimi nedir?",
                "What storage format does OneLake use?",
              ],
              options: [
                ["Açık standart Delta Lake / Parquet", "The open Delta Lake / Parquet standard"],
                ["Kapalı, Microsoft'a özel bir format", "A closed, Microsoft-proprietary format"],
                ["CSV", "CSV"],
                ["XML", "XML"],
              ],
              answer: 0,
              explain: [
                "OneLake, verinin fiziksel olarak nasıl saklandığını Delta Lake/Parquet açık standardıyla belirler; bu da farklı motorların (Spark, T-SQL, Power BI) aynı dosyaları okuyabilmesinin temelidir.",
                "OneLake fixes how data is physically stored with the open Delta Lake/Parquet standard; that's the foundation that lets different engines (Spark, T-SQL, Power BI) read the same files.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "OneLake sayesinde iş yükleri arasında neye gerek kalmaz?",
                "Thanks to OneLake, what do workloads no longer need to do?",
              ],
              options: [
                ["Veri kopyalamaya", "Copy data between each other"],
                ["Kullanıcı girişi yapmaya", "Log users in"],
                ["Rapor oluşturmaya", "Create reports"],
                ["Şema tanımlamaya", "Define a schema"],
              ],
              answer: 0,
              explain: [
                "Tüm iş yükleri aynı depoya yazıp aynı depodan okuduğu için veri kopyalamak gerekmez — bu, OneLake'in tek kopya vaadinin özeti.",
                "Because every workload writes to and reads from the same store, there is no need to copy data — that's the essence of OneLake's single-copy promise.",
              ],
            }),
            text(
              "Başlıca iş yükleri:\n\n- **Data Factory** — veri taşıma ve orkestrasyon (pipeline, dataflow)\n- **Data Engineering** — Spark not defterleri, lakehouse\n- **Data Warehouse** — T-SQL ile klasik ambar\n- **Real-Time Intelligence** — akış verisi, KQL veritabanı\n- **Data Science** — model eğitimi, MLflow\n- **Power BI** — raporlama, Direct Lake modu",
              "The main workloads:\n\n- **Data Factory** — movement and orchestration (pipelines, dataflows)\n- **Data Engineering** — Spark notebooks, lakehouse\n- **Data Warehouse** — a classic warehouse over T-SQL\n- **Real-Time Intelligence** — streaming data, KQL database\n- **Data Science** — model training, MLflow\n- **Power BI** — reporting, with Direct Lake mode",
            ),
            quiz({
              id: "q4",
              q: [
                "KQL veritabanı hangi iş yüküne aittir?",
                "Which workload owns the KQL database?",
              ],
              options: [
                ["Real-Time Intelligence", "Real-Time Intelligence"],
                ["Data Factory", "Data Factory"],
                ["Data Science", "Data Science"],
                ["Power BI", "Power BI"],
              ],
              answer: 0,
              explain: [
                "Real-Time Intelligence, akış verisini ve KQL veritabanını (Eventhouse) kapsar. Diğer iş yükleri farklı görevler üstlenir: taşıma, model geliştirme, raporlama.",
                "Real-Time Intelligence covers streaming data and the KQL database (Eventhouse). The other workloads take on different jobs: moving data, developing models, reporting.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Model eğitimi ve MLflow hangi iş yükünün alanıdır?",
                "Which workload's territory is model training and MLflow?",
              ],
              options: [
                ["Data Science", "Data Science"],
                ["Data Warehouse", "Data Warehouse"],
                ["Data Factory", "Data Factory"],
                ["Real-Time Intelligence", "Real-Time Intelligence"],
              ],
              answer: 0,
              explain: [
                "Data Science iş yükü, model geliştirme ve MLflow entegrasyonunu kapsar; ambar veya taşıma katmanlarıyla karıştırılmamalıdır.",
                "The Data Science workload covers model development and MLflow integration; it shouldn't be confused with the warehouse or movement layers.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Pipeline ve dataflow kurmak hangi iş yükünün görevidir?",
                "Building pipelines and dataflows is whose job?",
              ],
              options: [
                ["Data Factory", "Data Factory"],
                ["Power BI", "Power BI"],
                ["Data Engineering", "Data Engineering"],
                ["Data Science", "Data Science"],
              ],
              answer: 0,
              explain: [
                "Data Factory, veri taşıma ve orkestrasyonu (pipeline, dataflow) üstlenen iş yüküdür; Spark not defterleri ve lakehouse ise Data Engineering'e aittir.",
                "Data Factory is the workload responsible for movement and orchestration (pipelines, dataflows); Spark notebooks and the lakehouse belong to Data Engineering.",
              ],
            }),
            info(
              "Lakehouse mu Warehouse mu?",
              "Lakehouse or Warehouse?",
              "**Lakehouse**: yapılandırılmamış/yarı yapılandırılmış veri, Spark ve Python ile çalışmak, büyük dosya işleme. **Warehouse**: tamamen T-SQL, çok kullanıcılı eşzamanlı sorgu, klasik BI raporlaması, tam transaksiyon desteği. Ekibin Python'la mı SQL'le mi rahat olduğu, çoğu zaman bu kararı tek başına verir.",
              "**Lakehouse**: unstructured or semi-structured data, working in Spark and Python, heavy file processing. **Warehouse**: pure T-SQL, high-concurrency querying, classic BI reporting, full transactional support. Whether your team is more comfortable in Python or SQL usually decides this on its own.",
            ),
            quiz({
              id: "q7",
              q: [
                "Ekip Python'la mı SQL'le mi rahat olduğu, hangi kararı doğrudan etkiler?",
                "Whether a team is comfortable in Python or SQL directly shapes which decision?",
              ],
              options: [
                ["Lakehouse mu Warehouse mu seçileceğini", "Whether to choose the Lakehouse or the Warehouse"],
                [
                  "Hangi kapasite boyutunun (F-SKU) alınacağını",
                  "Which capacity size (F-SKU) to buy",
                ],
                ["Hangi ülkede barındırılacağını", "Which country to host in"],
                ["Lisans türünü", "The licence type"],
              ],
              answer: 0,
              explain: [
                "Metin bunu doğrudan söyler: çoğu zaman bu tek fark, Lakehouse mı Warehouse mı seçileceğine karar verir. Diğer seçenekler (kapasite, barındırma, lisans) farklı kararlardır.",
                "The text says this directly: often this single difference decides Lakehouse versus Warehouse on its own. The other options (capacity, hosting, licence) are separate decisions.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Çok kullanıcılı eşzamanlı SQL sorgusu ve tam transaksiyon desteği hangi öğede beklenir?",
                "Where would you expect high-concurrency SQL querying and full transactional support?",
              ],
              options: [
                ["Warehouse", "Warehouse"],
                ["Lakehouse", "Lakehouse"],
                ["Eventstream", "Eventstream"],
                ["KQL veritabanı", "A KQL database"],
              ],
              answer: 0,
              explain: [
                "Info kutusu bunu Warehouse'un tanımı olarak verir: tamamen T-SQL, çok kullanıcılı sorgu, tam transaksiyon desteği. Lakehouse bu özellikleri aynı düzeyde sunmaz.",
                "The info box gives this as the Warehouse's definition: pure T-SQL, high-concurrency querying, full transactional support. The Lakehouse doesn't offer these at the same level.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Direct Lake modu, import modu ve DirectQuery'nin hangi özelliklerini birleştirir?",
                "Direct Lake mode combines which properties of import mode and DirectQuery?",
              ],
              options: [
                ["Import'un hızını ve DirectQuery'nin tazeliğini", "Import's speed and DirectQuery's freshness"],
                ["Import'un yavaşlığını ve DirectQuery'nin maliyetini", "Import's slowness and DirectQuery's cost"],
                ["Sadece DirectQuery'nin özelliklerini", "Only DirectQuery's properties"],
                ["Sadece import'un özelliklerini", "Only import's properties"],
              ],
              answer: 0,
              explain: [
                "Bu, Direct Lake'in tüm değer önerisidir: ayrı bir import kopyası tutmadan Delta dosyalarını doğrudan okur, böylece hem import kadar hızlı hem DirectQuery kadar güncel kalır.",
                "This is Direct Lake's whole value proposition: it reads the Delta files directly without keeping a separate import copy, so it stays as fast as import and as current as DirectQuery.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Direct Lake'in veriyi doğrudan okuyabilmesinin ön koşulu nedir?",
                "What is the precondition for Direct Lake to read data directly?",
              ],
              options: [
                [
                  "Verinin OneLake'te Delta dosyaları biçiminde durması",
                  "The data must sit in OneLake as Delta files",
                ],
                ["Verinin CSV biçiminde olması", "The data must be in CSV format"],
                ["Power BI Pro lisansı olması", "Having a Power BI Pro licence"],
                ["Verinin Excel'de tutulması", "The data must be kept in Excel"],
              ],
              answer: 0,
              explain: [
                "Direct Lake, OneLake'teki Delta dosyalarını doğrudan okuyacak şekilde çalışır; bu yüzden veri bu biçimde ve bu depoda durmalıdır. Farklı bir dosya biçimi veya konum bu mekanizmayı devre dışı bırakır.",
                "Direct Lake works by reading Delta files in OneLake directly, so the data must sit in that format and that store. A different file format or location breaks the mechanism.",
              ],
            }),
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
            quiz({
              id: "q1",
              q: [
                "Bronze katmanının temel özelliği nedir?",
                "What is the defining property of the Bronze layer?",
              ],
              options: [
                [
                  "Kaynaktan geldiği gibi hiç dokunulmamış ham veridir",
                  "It is raw data, untouched, exactly as it arrived from the source",
                ],
                ["Tamamen temizlenmiş veridir", "It is fully cleaned data"],
                ["Yalnızca toplanmış özet tablolardır", "It is only aggregated summary tables"],
                ["Sadece Power BI'ın okuduğu katmandır", "It is the layer only Power BI reads"],
              ],
              answer: 0,
              explain: [
                "Bronze'un değeri tam olarak dokunulmamış olmasındadır: şema değişse bile saklanır, hata ayıklama ve yeniden işlemenin tek güvencesidir.",
                "Bronze's value lies precisely in being untouched: it's kept even when the schema changes, and it's your only guarantee for debugging and reprocessing.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "İş kuralları (business rules) hangi katmanda uygulanır?",
                "In which layer are business rules applied?",
              ],
              options: [
                ["Silver", "Silver"],
                ["Bronze", "Bronze"],
                ["Gold", "Gold"],
                ["Hiçbirinde, Power BI'da uygulanır", "None of them — they're applied in Power BI"],
              ],
              answer: 0,
              explain: [
                "Silver katmanı temizleme, tip düzeltme, tekrar ayıklama ve birleştirmenin yanında iş kurallarının uygulandığı yerdir; Bronze dokunulmaz kalır, Gold ise zaten kurallara göre şekillenmiş sonucu sunar.",
                "The Silver layer is where cleaning, typing, de-duplication and conforming happen alongside applying business rules; Bronze stays untouched, and Gold presents the already-shaped result.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Gold katmanının amacı nedir?",
                "What is the purpose of the Gold layer?",
              ],
              options: [
                [
                  "İş sorusuna göre şekillendirilmiş, toplanmış tablolar sunmak",
                  "To provide tables shaped and aggregated for a business question",
                ],
                ["Ham veriyi saklamak", "To store raw data"],
                ["Tekrarları tespit etmek", "To detect duplicates"],
                ["Şema doğrulaması yapmak", "To validate schemas"],
              ],
              answer: 0,
              explain: [
                "Raporlar ve modeller yalnızca Gold'dan okur; bu yüzden Gold'un görevi veriyi belirli bir iş sorusuna göre özetlemek ve şekillendirmektir, ham veya yarı temiz veri tutmak değildir.",
                "Reports and models read only from Gold, so its job is to summarise and shape data for a specific business question — not to hold raw or half-clean data.",
              ],
            }),
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
            quiz({
              id: "q4",
              q: [
                "Kod örneğinde `dropDuplicates([\"siparis_id\"])` satırı neyi sağlar?",
                "In the code sample, what does the `dropDuplicates([\"siparis_id\"])` line achieve?",
              ],
              options: [
                [
                  "Aynı sipariş ID'sine sahip tekrar eden satırları ayıklar",
                  "It removes repeated rows that share the same order ID",
                ],
                ["Tüm tabloyu siler", "It deletes the whole table"],
                ["Sütun tiplerini değiştirir", "It changes column types"],
                ["Null değerleri doldurur", "It fills in null values"],
              ],
              answer: 0,
              explain: [
                "Bu satır, Silver katmanının tekrar ayıklama görevini `siparis_id` üzerinden gerçekleştirir — aynı siparişin birden fazla kez görünmesini engeller.",
                "This line carries out Silver's de-duplication job on `siparis_id` — it stops the same order appearing more than once.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Kod örneğinde `filter(F.col(\"tutar\").isNotNull() & (F.col(\"tutar\") > 0))` satırının amacı nedir?",
                "What is the point of `filter(F.col(\"tutar\").isNotNull() & (F.col(\"tutar\") > 0))` in the code sample?",
              ],
              options: [
                [
                  "Eksik veya geçersiz (sıfır/negatif) tutar değerlerini elemek",
                  "To exclude missing or invalid (zero/negative) amount values",
                ],
                ["Tabloyu sıralamak", "To sort the table"],
                ["Yeni bir sütun eklemek", "To add a new column"],
                ["Veriyi Gold'a yazmak", "To write the data to Gold"],
              ],
              answer: 0,
              explain: [
                "Bu satır, Silver'ın temizleme görevinin bir parçasıdır: null veya anlamsız (sıfır/negatif) tutarları filtreleyerek yalnızca geçerli işlemlerin ileri taşınmasını sağlar.",
                "This line is part of Silver's cleaning job: it filters out null or nonsensical (zero/negative) amounts so only valid transactions move forward.",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "SQL kod örneğinde `GROUP BY FORMAT(tarih, 'yyyy-MM'), kategori` ifadesi neyi üretir?",
                "In the SQL sample, what does `GROUP BY FORMAT(tarih, 'yyyy-MM'), kategori` produce?",
              ],
              options: [
                ["Ay ve kategori bazında özetlenmiş satırlar", "Rows summarised by month and category"],
                ["Her siparişin ayrı bir satırı", "A separate row for every single order"],
                ["Ham log kayıtları", "Raw log records"],
                ["Tekilleştirilmemiş veri", "Non-deduplicated data"],
              ],
              answer: 0,
              explain: [
                "GROUP BY ifadesi verinin ay ve kategori kırılımında toplandığını gösterir — bu tam olarak Gold katmanının işidir: rapora hazır, özetlenmiş bir tablo üretmek.",
                "The GROUP BY clause shows the data being aggregated by month and category — exactly Gold's job: producing a report-ready, summarised table.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Gold tablosundaki `siparis_sayisi` sütunu neden `COUNT(DISTINCT siparis_id)` ile hesaplanıyor?",
                "Why is the `siparis_sayisi` column computed with `COUNT(DISTINCT siparis_id)`?",
              ],
              options: [
                [
                  "Aynı siparişin birden fazla satırdan (ör. birden fazla kalemden) sayılmasını önlemek için",
                  "To stop the same order being counted more than once (e.g. across multiple line items)",
                ],
                ["Sorguyu hızlandırmak için", "To make the query run faster"],
                ["Tabloyu küçültmek için", "To shrink the table"],
                ["Rastgele bir tercih, işlevi yok", "An arbitrary choice with no real function"],
              ],
              answer: 0,
              explain: [
                "Silver'daki bir sipariş birden fazla satır (kalem) içerebilir; DISTINCT olmadan sipariş sayısı olduğundan fazla çıkardı. Bu, Gold'da doğru iş metriği üretmenin bir parçasıdır.",
                "An order in Silver can span multiple rows (line items); without DISTINCT the order count would come out inflated. This is part of producing a correct business metric in Gold.",
              ],
            }),
            pitfall(
              "Bronze katmanını temizlemek",
              "Cleaning the Bronze layer",
              "Bronze'a dokunma isteği güçlüdür — \"zaten bozuk, düzeltiverelim\". Ama ham veriyi kaybettiğin anda geçmişi yeniden işleyemez, bir hatanın nereden geldiğini kanıtlayamaz ve kaynağın kendisiyle karşılaştırma yapamazsın. Bronze append-only kalsın; tüm düzeltmeler Silver'da yapılsın.",
              "The urge to fix Bronze is strong — \"it is broken anyway, let's clean it\". But the moment you lose the raw data you cannot reprocess history, prove where an error came from, or reconcile against the source. Keep Bronze append-only and do every correction in Silver.",
            ),
            quiz({
              id: "q8",
              q: [
                "Bronze'u temizlemek neden risklidir?",
                "Why is cleaning Bronze risky?",
              ],
              options: [
                [
                  "Ham veri kaybolunca geçmişi yeniden işleyemez, hatanın kaynağını kanıtlayamazsın",
                  "Once the raw data is lost you can't reprocess history or prove where an error came from",
                ],
                [
                  "Bronze zaten salt okunurdur, temizlemek teknik olarak imkansızdır",
                  "Bronze is already read-only, so cleaning it is technically impossible",
                ],
                ["Temizlemek kapasiteyi artırır", "Cleaning it increases capacity"],
                ["Hiçbir riski yoktur", "It carries no risk at all"],
              ],
              answer: 0,
              explain: [
                "Bronze'a dokunmanın cazibesi güçlüdür ama kaybedilen ham veri geri getirilemez; bir hatanın kaynağını kanıtlamak veya geçmişi yeniden işlemek artık mümkün olmaz. Bu yüzden düzeltmeler Silver'da yapılır.",
                "The temptation to touch Bronze is strong, but lost raw data can't be brought back; proving where an error came from or reprocessing history is no longer possible. That's why corrections belong in Silver.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "\"Bronze append-only kalsın\" kuralı pratikte ne anlama gelir?",
                "What does the rule \"keep Bronze append-only\" mean in practice?",
              ],
              options: [
                [
                  "Bronze'a yalnızca yeni veri eklenir, var olan kayıtlar değiştirilmez veya silinmez",
                  "New data is only added to Bronze; existing records are never changed or deleted",
                ],
                ["Bronze'a hiç veri eklenemez", "No data can ever be added to Bronze"],
                ["Bronze her gece tamamen silinir", "Bronze is fully wiped every night"],
                ["Bronze'daki veri şifrelenir", "Data in Bronze gets encrypted"],
              ],
              answer: 0,
              explain: [
                "Append-only, Bronze'un tarihsel bütünlüğünü korumanın somut kuralıdır: yeni gelen veri eklenir ama geçmiş kayıtlar asla üzerine yazılmaz veya silinmez; tüm düzeltmeler bir sonraki katmanda yapılır.",
                "Append-only is the concrete rule that protects Bronze's historical integrity: new data gets added but past records are never overwritten or deleted; every correction happens one layer up.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "`merge` ile artımlı yükleme, `overwrite`'a kıyasla maliyeti nasıl düşürür?",
                "How does incremental loading with `merge` lower cost compared to `overwrite`?",
              ],
              options: [
                [
                  "Sadece değişen veriyi işler, tüm tabloyu yeniden yazmaz",
                  "It processes only the changed data instead of rewriting the whole table",
                ],
                ["Veriyi sıkıştırır", "It compresses the data"],
                ["Kullanıcı sayısını azaltır", "It reduces the number of users"],
                ["Kapasiteyi büyütür", "It scales up the capacity"],
              ],
              answer: 0,
              explain: [
                "`overwrite` her seferinde tüm tabloyu yeniden yazar ve bu CU tüketir; `merge` yalnızca değişen/yeni satırları işleyerek aynı işi çok daha az kaynakla yapar.",
                "`overwrite` rewrites the entire table every time and burns CU doing it; `merge` processes only the changed or new rows, doing the same job with far less resource.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Küçük dosya sorununu çözmek için hangi ikili birlikte kullanılır?",
                "Which pair is used together to fix the small-file problem?",
              ],
              options: [
                ["`OPTIMIZE` ve `V-Order`", "`OPTIMIZE` and `V-Order`"],
                ["`merge` ve `overwrite`", "`merge` and `overwrite`"],
                ["Domain ve endorsement", "Domain and endorsement"],
                ["Lineage ve Capacity Metrics", "Lineage and Capacity Metrics"],
              ],
              answer: 0,
              explain: [
                "Metin bu ikisini birlikte önerir: `OPTIMIZE` küçük dosyaları birleştirir, `V-Order` ise Power BI'ın Direct Lake okumasını hızlandıracak şekilde sıralama yapar.",
                "The text recommends the pair together: `OPTIMIZE` compacts the small files, and `V-Order` lays them out to speed up Power BI's Direct Lake reads.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Not defteri havuzlarını boşta bırakmak neden maliyeti artırır?",
                "Why does leaving notebook pools idle raise cost?",
              ],
              options: [
                [
                  "Kapasite kaynağı kullanılmadan da tüketilmiş olur",
                  "Capacity resource gets consumed even without being put to use",
                ],
                ["Boşta kalan havuzlar veriyi bozar", "Idle pools corrupt the data"],
                ["Power BI ile hiç ilgisi yoktur", "It has nothing to do with Power BI"],
                ["Yalnızca güvenlik riski doğurur", "It only creates a security risk"],
              ],
              answer: 0,
              explain: [
                "Fabric'te kapasite paylaşımlı bir havuzdur ve çalışan/rezerve edilen kaynak kullanılmasa bile tüketim sayılır; bu yüzden uygun havuz boyutu seçmek ve boşta bırakmamak doğrudan faturaya yansır.",
                "Capacity in Fabric is a shared pool, and resource that's running or reserved counts as consumption even when idle — so right-sizing pools and not leaving them idle shows up directly on the bill.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Gold katmanını 'gerçekten özet tutmak' hangi maliyet sorununu önler?",
                "Keeping Gold 'genuinely summarised' prevents what cost problem?",
              ],
              options: [
                [
                  "Raporların ham tabloları taramasını, dolayısıyla gereksiz CU tüketimini",
                  "Reports scanning raw tables, and the unnecessary CU consumption that causes",
                ],
                ["Kullanıcı lisans maliyetini", "User licence cost"],
                ["Depolama şifreleme maliyetini", "Storage encryption cost"],
                ["Git entegrasyon maliyetini", "Git integration cost"],
              ],
              answer: 0,
              explain: [
                "Eğer Gold gerçekten özetlenmiş değilse, her rapor açılışında büyük ham tablolar taranır ve bu doğrudan kapasite tüketimine, dolayısıyla maliyete yansır.",
                "If Gold isn't genuinely summarised, every report open scans large raw tables, and that translates directly into capacity consumption — and therefore cost.",
              ],
            }),
            text(
              "**Veri soyu (lineage)**, Fabric'in en değerli yönetişim özelliğidir: bir rapordaki sayının hangi Gold tablosundan, o tablonun hangi Silver'dan, onun da hangi kaynaktan geldiğini görsel olarak izleyebilirsin. Bir sayı tartışmaya açıldığında cevabı dakikalar içinde bulmanı sağlar.",
              "**Lineage** is Fabric's most valuable governance feature: you can trace a number in a report back to its Gold table, that table to its Silver source, and that to the original system, visually. When a number gets questioned, it gives you the answer in minutes.",
            ),
            quiz({
              id: "q6",
              q: [
                "Veri soyu (lineage) hangi soruyu dakikalar içinde cevaplamana yardımcı olur?",
                "Lineage helps you answer which question within minutes?",
              ],
              options: [
                [
                  "Rapordaki bir sayının hangi kaynaktan geldiğini",
                  "Where a number in a report ultimately came from",
                ],
                ["Kapasitenin ne kadar CU tükettiğini", "How much CU the capacity is consuming"],
                ["Hangi kullanıcının giriş yaptığını", "Which user logged in"],
                ["Raporun ne zaman yayınlandığını", "When the report was published"],
              ],
              answer: 0,
              explain: [
                "Lineage, bir Gold tablosundan geriye doğru Silver'a ve oradan kaynak sisteme kadar görsel izleme sağlar; bir sayı tartışmaya açıldığında bu izi takip ederek cevabı bulursun.",
                "Lineage lets you visually trace back from a Gold table to Silver and from there to the source system; when a number gets questioned, following that trail is how you find the answer.",
              ],
            }),
            tip(
              "Domain ve endorsement kullan",
              "Use domains and endorsement",
              "Kurumda veri çoğaldıkça asıl sorun \"veri yok\" değil, \"hangi tablo doğru?\" olur. Fabric'te öğeleri **Domain**'lere ayır ve güvenilir olanları **Promoted** ya da **Certified** olarak işaretle. Böylece arama yapan kişi doğru tabloyu tahmin etmek zorunda kalmaz.",
              "As data grows, the problem is never \"no data\" but \"which table is the right one?\". Organise items into **Domains** and mark the trustworthy ones as **Promoted** or **Certified**. Then whoever is searching does not have to guess.",
            ),
            quiz({
              id: "q7",
              q: [
                "Kurumda veri çoğaldıkça asıl sorun neye dönüşür?",
                "As data grows across an organisation, what does the real problem become?",
              ],
              options: [
                ["'Hangi tablo doğru?' sorusuna", "The question 'which table is the right one?'"],
                ["'Veri hiç yok' sorununa", "The problem of 'there's no data at all'"],
                ["'Kapasite hiç yetmiyor' sorununa", "The problem of 'capacity is never enough'"],
                ["'Power BI çalışmıyor' sorununa", "The problem of 'Power BI doesn't work'"],
              ],
              answer: 0,
              explain: [
                "Metin bu geçişi açıkça vurgular: veri arttıkça asıl darboğaz veri eksikliği değil, hangi tablonun güvenilir olduğunu bulmaktır.",
                "The text makes this shift explicit: as data grows, the real bottleneck isn't a lack of data but figuring out which table can be trusted.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "'Promoted' veya 'Certified' işaretleri ne işe yarar?",
                "What do the 'Promoted' or 'Certified' labels do?",
              ],
              options: [
                [
                  "Güvenilir öğeleri işaretleyerek arayan kişinin doğru tabloyu tahmin etmesini gereksiz kılar",
                  "They flag trustworthy items, so whoever is searching doesn't have to guess the right table",
                ],
                ["Öğeyi otomatik olarak siler", "They automatically delete the item"],
                ["Kapasite maliyetini düşürür", "They lower capacity cost"],
                ["Yalnızca yöneticilerin erişimini engeller", "They only block admin access"],
              ],
              answer: 0,
              explain: [
                "Bu işaretler bir güven sinyalidir: bir tablo Certified ise, onu bulan kişi başka bir doğrulama yapmadan güvenle kullanabilir — bu da 'hangi tablo doğru' sorununu doğrudan çözer.",
                "These labels are a trust signal: if a table is Certified, whoever finds it can use it with confidence without further verification — which directly solves the 'which table is right' problem.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Öğeleri Domain'lere ayırmanın amacı nedir?",
                "What is the point of organising items into Domains?",
              ],
              options: [
                [
                  "İçeriği mantıklı gruplara bölerek bulunabilirliği ve sahiplenmeyi kolaylaştırmak",
                  "To split content into logical groups, making it easier to find and own",
                ],
                ["Kapasiteyi otomatik ölçeklendirmek", "To auto-scale capacity"],
                ["Kullanıcı şifrelerini yönetmek", "To manage user passwords"],
                ["Rapor performansını artırmak", "To improve report performance"],
              ],
              answer: 0,
              explain: [
                "Domain'ler, büyüyen bir kurumda içeriği anlamlı gruplara ayırarak hem sahiplenmeyi hem de doğru tabloyu bulmayı kolaylaştıran organizasyonel bir yapıdır.",
                "Domains are an organisational structure that splits content into meaningful groups in a growing organisation, making both ownership and finding the right table easier.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "`V-Order` biçimlendirmesinin Direct Lake ile ilişkisi nedir?",
                "How does `V-Order` formatting relate to Direct Lake?",
              ],
              options: [
                [
                  "Dosyaları Power BI'ın Direct Lake okumasını hızlandıracak şekilde sıralar",
                  "It lays files out in a way that speeds up Power BI's Direct Lake reads",
                ],
                ["Direct Lake ile hiçbir ilgisi yoktur", "It has no relationship to Direct Lake at all"],
                ["Direct Lake modunu devre dışı bırakır", "It disables Direct Lake mode"],
                ["Yalnızca Warehouse için geçerlidir", "It only applies to the Warehouse"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça bağlar: `OPTIMIZE` küçük dosyaları birleştirirken `V-Order`, Power BI'ın Direct Lake okumasını hızlandıracak biçimde veriyi düzenler — ikisi birlikte hem maliyeti hem performansı iyileştirir.",
                "The text ties the two together explicitly: while `OPTIMIZE` compacts small files, `V-Order` arranges the data to speed up Power BI's Direct Lake reads — together they improve both cost and performance.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Kısayol (shortcut) oluşturduğunda ne olur, veri fiziksel olarak taşınır mı?",
                "When you create a shortcut, does the data get physically moved?",
              ],
              options: [
                ["Hayır, veri yerinde kalır ve sadece işaret edilir", "No, the data stays where it is and is only referenced"],
                ["Evet, veri OneLake'e tamamen kopyalanır", "Yes, the data is fully copied into OneLake"],
                ["Evet ama yalnızca yarısı kopyalanır", "Yes, but only half of it is copied"],
                ["Veri her sorguda yeniden indirilir", "The data is re-downloaded on every query"],
              ],
              answer: 0,
              explain: [
                "Kısayolun tanımı tam olarak budur: başka bir konumdaki veriyi kendi çalışma alanındaymış gibi gösterir ama fiziksel kopya oluşturmaz. Bu, klasik kopyalama döngüsünü kıran özelliktir.",
                "That is exactly the definition of a shortcut: it surfaces data held elsewhere as though it were in your own workspace, without making a physical copy. That's the feature that breaks the classic copying cycle.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Klasik mimarilerde her yeni ihtiyaç neden bir kopya doğurur?",
                "In classic architectures, why does every new need spawn a copy?",
              ],
              options: [
                [
                  "Veri gölünden ambara, ambardan BI modeline aktarma alışkanlığı yüzünden",
                  "Because of the habit of moving data from lake to warehouse, and warehouse to BI model",
                ],
                ["Çünkü veri sıkıştırılamaz", "Because data can't be compressed"],
                ["Çünkü OneLake mevcut değildir", "Because OneLake doesn't exist yet"],
                ["Çünkü kullanıcı lisansları yetersizdir", "Because user licences are insufficient"],
              ],
              answer: 0,
              explain: [
                "Metin bu döngüyü açıkça tarif eder: her katman bir öncekinden veri kopyalar, bu da depolama maliyetini, senkronizasyon işini ve tutarsızlık riskini katlar.",
                "The text describes this cycle explicitly: each layer copies data from the one before it, multiplying storage cost, synchronisation work, and the risk of divergence.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Kısayol hangi kaynaklara bağlanabilir?",
                "Which sources can a shortcut connect to?",
              ],
              options: [
                [
                  "S3, ADLS Gen2, GCS, Dataverse ve başka bir Lakehouse/Warehouse",
                  "S3, ADLS Gen2, GCS, Dataverse, and another Lakehouse/Warehouse",
                ],
                ["Yalnızca Azure hizmetlerine", "Only Azure services"],
                ["Yalnızca Power BI raporlarına", "Only Power BI reports"],
                ["Yalnızca yerel dosyalara", "Only local files"],
              ],
              answer: 0,
              explain: [
                "Liste bulut sağlayıcı sınırlarını aşar: Amazon S3, ADLS Gen2, Google Cloud Storage, Dataverse ve aynı kuruluştaki başka bir Lakehouse/Warehouse — bu da farklı bulutlardaki veriyi tek mantıksal göl altında birleştirmeyi mümkün kılar.",
                "The list crosses cloud-provider boundaries: Amazon S3, ADLS Gen2, Google Cloud Storage, Dataverse, and another Lakehouse/Warehouse in the same org — which is what makes it possible to unify data across clouds under one logical lake.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Verinin S3'te kalıp Fabric'ten okunabilmesinin somut faydası nedir?",
                "What is the concrete benefit of data staying in S3 while being read from Fabric?",
              ],
              options: [
                [
                  "Farklı bulutlardaki veriyi taşımadan tek mantıksal göl altında birleştirmek",
                  "Unifying data across different clouds under one logical lake, without moving it",
                ],
                ["S3 maliyetini tamamen ortadan kaldırmak", "Eliminating S3 cost entirely"],
                ["Veriyi otomatik olarak yedeklemek", "Automatically backing up the data"],
                ["S3'ü Fabric'e dönüştürmek", "Converting S3 into Fabric"],
              ],
              answer: 0,
              explain: [
                "Kısayolun asıl faydası taşıma maliyetini ve senkronizasyon riskini ortadan kaldırırken çoklu bulut veriyi tek mantıksal görünüm altında toplayabilmesidir; S3'teki depolama maliyeti kendi başına devam eder.",
                "The shortcut's real benefit is gathering multi-cloud data under one logical view while removing the cost of moving it and the risk of it drifting out of sync; the storage cost in S3 itself continues on its own.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Kısayol kullanmanın kopyalama hattı kurmaya kıyasla avantajı nedir?",
                "What is the advantage of a shortcut over building a copy pipeline?",
              ],
              options: [
                [
                  "Depolama maliyetini ikiye katlamaz ve senkronizasyon sorumluluğu doğurmaz",
                  "It doesn't double storage cost or create a synchronisation burden",
                ],
                ["Kısayol her zaman daha hızlı sorgu çalıştırır", "A shortcut always runs faster queries"],
                ["Kısayol veriyi otomatik şifreler", "A shortcut automatically encrypts the data"],
                ["Hiçbir avantajı yoktur", "It has no advantage at all"],
              ],
              answer: 0,
              explain: [
                "Kopyalayan bir hat da teknik olarak çalışır ama iki kopya tutmak depolama maliyetini artırır ve iki kopyanın senkron kalmasını sağlamak sürekli bir iştir; kısayol bu iki maliyeti de ortadan kaldırır.",
                "A copy pipeline also works technically, but keeping two copies raises storage cost and keeping them in sync is ongoing work; a shortcut removes both of those costs.",
              ],
            }),
            text(
              "**Aynalama (mirroring)** ise farklı bir sorunu çözer: operasyonel bir veritabanını (Azure SQL, Cosmos DB, Snowflake) neredeyse gerçek zamanlı olarak Fabric'e yansıtır.\n\n- Kaynak veritabanı normal çalışmaya devam eder\n- Değişiklikler sürekli olarak OneLake'e Delta biçiminde akar\n- Analistler kaynağa hiç dokunmadan güncel veriyi sorgular\n- ETL hattı yazmana gerek kalmaz\n\nBu, \"analistlerin üretim veritabanını yormasını\" engelleyen en zahmetsiz yoldur: ayna kopya analitik yükü tamamen üstlenir, üretim veritabanı sadece uygulamaya hizmet eder.",
              "**Mirroring** solves a different problem: it replicates an operational database (Azure SQL, Cosmos DB, Snowflake) into Fabric in near real time.\n\n- the source database carries on as normal\n- changes flow continuously into OneLake in Delta format\n- analysts query current data without touching the source at all\n- you write no ETL pipeline\n\nThis is the least laborious way to stop analysts loading the production database: the mirror absorbs the entire analytical workload while production serves only the application.",
            ),
            quiz({
              id: "q7",
              q: [
                "Aynalama (mirroring) sırasında kaynak veritabanına ne olur?",
                "What happens to the source database during mirroring?",
              ],
              options: [
                ["Normal çalışmaya devam eder, hiç etkilenmez", "It carries on operating normally, unaffected"],
                ["Salt okunur hale gelir", "It becomes read-only"],
                ["Kapatılması gerekir", "It has to be shut down"],
                ["Fabric'e taşınır", "It gets moved into Fabric"],
              ],
              answer: 0,
              explain: [
                "Aynalamanın tasarım amacı üretim veritabanını rahatsız etmemektir: kaynak normal işine devam ederken değişiklikler sürekli olarak OneLake'e akar.",
                "Mirroring is designed precisely to leave the production database undisturbed: the source keeps doing its normal job while changes flow continuously into OneLake.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Aynalama, analistlerin üretim veritabanını yormasını nasıl engeller?",
                "How does mirroring stop analysts from straining the production database?",
              ],
              options: [
                [
                  "Analitik yükü tamamen ayna kopyaya taşıyarak",
                  "By moving the entire analytical workload onto the mirrored copy",
                ],
                ["Analistlerin erişimini tamamen keserek", "By cutting off analyst access entirely"],
                ["Üretim veritabanını yavaşlatarak", "By slowing down the production database"],
                ["Aynalamanın bununla hiçbir ilgisi yoktur", "Mirroring has nothing to do with this"],
              ],
              answer: 0,
              explain: [
                "Ayna kopya, analitik sorguların tümünü üstlenir; üretim veritabanı yalnızca uygulamaya hizmet etmeye devam eder, bu da iki yükün birbirini etkilemesini önler.",
                "The mirror absorbs all the analytical queries; the production database goes on serving only the application, which stops the two workloads from interfering with each other.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Aynalama kullanıldığında ETL hattı yazman gerekir mi?",
                "When you use mirroring, do you need to write an ETL pipeline?",
              ],
              options: [
                ["Hayır, değişiklikler otomatik olarak Delta biçiminde akar", "No, changes flow automatically in Delta format"],
                ["Evet, her tablo için ayrı bir hat gerekir", "Yes, a separate pipeline is needed for every table"],
                ["Evet ama yalnızca Python ile", "Yes, but only in Python"],
                ["Aynalama ETL'in yerini hiç almaz", "Mirroring never replaces ETL at all"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça listeler: aynalamanın avantajlarından biri, ETL hattı yazmaya gerek kalmadan değişikliklerin sürekli olarak OneLake'e Delta biçiminde akmasıdır.",
                "The text lists this explicitly as one of mirroring's advantages: changes flow continuously into OneLake in Delta format without you writing an ETL pipeline.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Kısayol mu, aynalama mı: hangisi dosya tabanlı bulut depolarına, hangisi operasyonel veritabanlarına yöneliktir?",
                "Shortcut or mirroring: which targets file-based cloud storage, and which targets operational databases?",
              ],
              options: [
                [
                  "Kısayol dosya tabanlı depolara (S3, ADLS), aynalama operasyonel veritabanlarına (Azure SQL, Cosmos DB, Snowflake) yöneliktir",
                  "Shortcuts target file-based storage (S3, ADLS), mirroring targets operational databases (Azure SQL, Cosmos DB, Snowflake)",
                ],
                ["İkisi de yalnızca dosyalar içindir", "Both are for files only"],
                ["İkisi de yalnızca veritabanları içindir", "Both are for databases only"],
                ["Aralarında hiçbir fark yoktur", "There is no difference between them"],
              ],
              answer: 0,
              explain: [
                "İki özellik farklı sorunlara çözümdür: kısayol S3/ADLS/GCS gibi dosya tabanlı depoları taşımadan bağlar; aynalama ise Azure SQL, Cosmos DB veya Snowflake gibi operasyonel veritabanlarını neredeyse gerçek zamanlı yansıtır.",
                "The two features solve different problems: a shortcut attaches file-based stores like S3/ADLS/GCS without moving them; mirroring replicates operational databases like Azure SQL, Cosmos DB or Snowflake in near real time.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Dağıtım hattı (deployment pipeline) kaç aşamayı birbirine bağlar?",
                "How many stages does a deployment pipeline link together?",
              ],
              options: [
                ["Üç — Geliştirme, Test, Üretim", "Three — Development, Test, Production"],
                ["İki — Test ve Üretim", "Two — Test and Production"],
                ["Dört — Geliştirme, Test, Kabul, Üretim", "Four — Development, Test, Acceptance, Production"],
                ["Bir — yalnızca Üretim", "One — Production only"],
              ],
              answer: 0,
              explain: [
                "Metin üç aşamalı yapıyı tanımlar: değişikliklerin serbestçe yapıldığı Geliştirme, gerçek veriye yakın koşullarda doğrulandığı Test, ve kullanıcıların gördüğü Üretim.",
                "The text defines a three-stage structure: Development where changes are made freely, Test where they're validated under near-real conditions, and Production, what users see.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir aşamadan diğerine geçerken Fabric ne gösterir?",
                "When moving from one stage to another, what does Fabric show?",
              ],
              options: [
                ["Neyin değiştiğinin karşılaştırmalı görünümünü", "A comparative view of what changed"],
                ["Yalnızca son kullanıcı sayısını", "Only the end-user count"],
                ["Kapasite faturasını", "The capacity invoice"],
                ["Hiçbir şey, geçiş otomatik ve görünmezdir", "Nothing — the move is automatic and invisible"],
              ],
              answer: 0,
              explain: [
                "Bu karşılaştırma, hangi öğelerin terfi edileceğine bilinçli karar vermeni sağlar; körlemesine bir kopyalama değil, seçilenlerin taşınmasıdır.",
                "That comparison lets you make a deliberate call about which items to promote; it's not a blind copy, only what you select gets moved.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Geliştirme ortamında değişiklikler nasıl ele alınır?",
                "How are changes handled in the Development stage?",
              ],
              options: [
                ["Serbestçe yapılır ve denenir", "They are made and tried freely"],
                ["Yalnızca yöneticiler değişiklik yapabilir", "Only admins can make changes"],
                ["Değişiklik yapmak tamamen yasaktır", "Making changes is completely forbidden"],
                ["Her değişiklik önce Üretim'de test edilir", "Every change is tested in Production first"],
              ],
              answer: 0,
              explain: [
                "Geliştirme aşaması tam olarak deneme alanıdır — değişiklikler burada serbestçe yapılır; ancak doğrulanmış hâliyle Test'e, sonra Üretim'e terfi eder.",
                "Development is exactly the sandbox stage — changes are made freely here, then the validated result is promoted to Test and then to Production.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Dağıtım kuralları (deployment rules) neyi otomatikleştirir?",
                "What do deployment rules automate?",
              ],
              options: [
                [
                  "Bağlantı dizeleri ve parametrelerin ortama göre ayarlanmasını",
                  "Setting connection strings and parameters per environment",
                ],
                ["Kullanıcı lisanslarının satın alınmasını", "Purchasing user licences"],
                ["Rapor tasarımının otomatik oluşturulmasını", "Automatically generating report designs"],
                ["Kapasitenin duraklatılmasını", "Pausing the capacity"],
              ],
              answer: 0,
              explain: [
                "Dağıtım kuralları, her ortamın kendi bağlantı dizesine ve parametrelerine sahip olmasını sağlar; böylece test ortamı test veritabanına, üretim üretim veritabanına otomatik olarak bakar.",
                "Deployment rules let each environment carry its own connection string and parameters, so test automatically points at the test database and production at the production one.",
              ],
            }),
            text(
              "**Git entegrasyonu** ikinci katmandır. Bir çalışma alanını Azure DevOps veya GitHub deposuna bağlarsın; içerik metin dosyaları olarak depoda tutulur.\n\nBunun getirdikleri:\n\n- **Sürüm geçmişi** — Kim, ne zaman, neyi değiştirdi\n- **Dallanma** — İki kişi paralel çalışıp birleştirebilir\n- **Kod incelemesi** — Değişiklik üretime çıkmadan önce gözden geçirilir\n- **Geri alma** — Bozulan bir değişiklikten önceki hâle dönmek tek komut\n\nDağıtım hattı ile Git birbirinin alternatifi değildir: **Git kaynak kontrolü**, dağıtım hattı ise **ortamlar arası terfi** içindir. Olgun ekipler ikisini birlikte kullanır.",
              "**Git integration** is the second layer. You connect a workspace to an Azure DevOps or GitHub repository, and content is stored there as text files.\n\nWhat that brings:\n\n- **Version history** — who changed what, and when\n- **Branching** — two people can work in parallel and merge\n- **Code review** — a change is reviewed before it reaches production\n- **Rollback** — returning to the state before a bad change is one command\n\nDeployment pipelines and Git are not alternatives: **Git is for source control**, the pipeline is for **promotion between environments**. Mature teams use both.",
            ),
            quiz({
              id: "q6",
              q: [
                "Git entegrasyonunda içerik nasıl saklanır?",
                "How is content stored under Git integration?",
              ],
              options: [
                ["Metin dosyaları olarak depoda", "As text files in the repository"],
                ["Şifreli ikili dosyalar olarak", "As encrypted binary files"],
                ["Yalnızca Power BI bulutunda", "Only in the Power BI cloud"],
                ["Excel dosyaları olarak", "As Excel files"],
              ],
              answer: 0,
              explain: [
                "Bir çalışma alanı Azure DevOps veya GitHub deposuna bağlandığında içerik metin dosyaları olarak tutulur; bu da sürüm geçmişi, dallanma ve kod incelemesi gibi klasik kaynak kontrolü özelliklerini mümkün kılar.",
                "When a workspace is connected to an Azure DevOps or GitHub repo, content is stored as text files; that's what makes classic source-control features like version history, branching and code review possible.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Git'in getirdiği 'geri alma (rollback)' özelliği ne işe yarar?",
                "What does the 'rollback' feature Git brings do?",
              ],
              options: [
                [
                  "Bozulan bir değişiklikten önceki hâle tek komutla dönmeyi sağlar",
                  "It lets you return to the state before a bad change with a single command",
                ],
                ["Kapasiteyi otomatik büyütür", "It automatically scales up capacity"],
                ["Kullanıcı lisanslarını iptal eder", "It cancels user licences"],
                ["Raporu otomatik yeniden tasarlar", "It automatically redesigns the report"],
              ],
              answer: 0,
              explain: [
                "Sürüm geçmişi tutulduğu için bozulan bir değişiklikten önceki duruma dönmek karmaşık bir kurtarma işlemi değil, tek komutluk bir işlemdir.",
                "Because version history is kept, returning to the state before a broken change isn't a complicated recovery operation — it's a single command.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Dağıtım hattı ile Git birbirinin alternatifi midir?",
                "Are deployment pipelines and Git alternatives to each other?",
              ],
              options: [
                [
                  "Hayır — Git kaynak kontrolü, dağıtım hattı ortamlar arası terfi içindir",
                  "No — Git is for source control, the pipeline is for promotion between environments",
                ],
                ["Evet, ikisi aynı işi yapar", "Yes, they do the same job"],
                ["Hayır, ikisi de yalnızca raporlama içindir", "No, both are only for reporting"],
                ["Evet, biri kullanılınca diğeri devre dışı kalır", "Yes, using one disables the other"],
              ],
              answer: 0,
              explain: [
                "Metin bu ayrımı net çizer: Git değişikliklerin tarihini ve iş birliğini yönetir, dağıtım hattı ise doğrulanmış içeriği bir ortamdan diğerine taşır. Olgun ekipler ikisini birlikte kullanır.",
                "The text draws this distinction cleanly: Git manages the history and collaboration around changes, while the pipeline moves validated content from one environment to the next. Mature teams use both together.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Git entegrasyonunun 'dallanma (branching)' özelliği neyi mümkün kılar?",
                "What does Git integration's 'branching' feature make possible?",
              ],
              options: [
                [
                  "İki kişinin paralel çalışıp değişikliklerini birleştirmesini",
                  "Two people working in parallel and merging their changes",
                ],
                ["Kapasitenin ikiye bölünmesini", "Splitting the capacity in two"],
                ["Kullanıcı lisanslarının paylaşılmasını", "Sharing user licences"],
                ["Raporun otomatik çevrilmesini", "Automatically translating the report"],
              ],
              answer: 0,
              explain: [
                "Dallanma, klasik kaynak kontrolünün temel yeteneğidir: farklı kişiler aynı içerik üzerinde birbirini bozmadan paralel çalışabilir ve sonra değişiklikleri birleştirebilir.",
                "Branching is a core capability of classic source control: different people can work on the same content in parallel without stepping on each other, then merge their changes.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Kod incelemesi (code review), bir değişiklik üretime çıkmadan önce ne sağlar?",
                "What does code review provide before a change reaches production?",
              ],
              options: [
                [
                  "Değişikliğin üretime çıkmadan önce gözden geçirilmesini",
                  "That the change gets reviewed before it reaches production",
                ],
                ["Değişikliğin otomatik olarak test edilmesini", "That the change is automatically tested"],
                ["Kapasitenin yeniden başlatılmasını", "That the capacity restarts"],
                ["Kullanıcı lisanslarının yenilenmesini", "That user licences get renewed"],
              ],
              answer: 0,
              explain: [
                "Git entegrasyonunun getirdiği kod incelemesi adımı, bir değişikliğin başka bir gözle kontrol edilmeden doğrudan üretime çıkmasını engeller — bu da hataların erken yakalanmasını sağlar.",
                "The code-review step that comes with Git integration stops a change from going straight to production without another set of eyes on it — which is what catches mistakes early.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Eventstream'in görevi nedir?",
                "What is Eventstream's job?",
              ],
              options: [
                ["Olayları kaynaklardan toplayıp yönlendirmek", "Collecting and routing events from sources"],
                ["Rapor tasarlamak", "Designing reports"],
                ["T-SQL sorguları çalıştırmak", "Running T-SQL queries"],
                ["Model eğitmek", "Training models"],
              ],
              answer: 0,
              explain: [
                "Eventstream, IoT cihazları, uygulama olayları veya Azure Event Hubs gibi kaynaklardan gelen olayları toplayıp doğru hedefe yönlendiren bileşendir; KQL veritabanına giden verinin giriş noktasıdır.",
                "Eventstream is the component that collects events from sources like IoT devices, application events, or Azure Event Hubs and routes them to the right destination; it's the entry point for data heading into the KQL database.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "KQL sorgu dili neyle karşılaştırılır ve nasıl tanımlanır?",
                "What is the KQL query language compared to, and how is it described?",
              ],
              options: [
                [
                  "SQL'den farklı ama öğrenmesi kolay, log analizi için tasarlanmış bir dil",
                  "A language different from SQL but easy to learn, designed for log analysis",
                ],
                ["T-SQL ile birebir aynı bir dil", "A language identical to T-SQL"],
                ["Yalnızca Python kütüphanesi", "Only a Python library"],
                ["Bir Power BI DAX türevi", "A DAX derivative used in Power BI"],
              ],
              answer: 0,
              explain: [
                "Metin KQL'i log analizi için tasarlanmış, SQL'den farklı ama kolay öğrenilen bir dil olarak tanımlar — bu, akış/log verisiyle çalışan ekiplerin hızla adapte olabilmesini sağlar.",
                "The text describes KQL as a language designed for log analysis, different from SQL but easy to pick up — which is what lets teams working with streaming/log data adapt quickly.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Klasik ambar hangi tür veri yükleme deseni için tasarlanmıştır?",
                "What kind of data-loading pattern is a classic warehouse designed for?",
              ],
              options: [
                ["Saatlik ve günlük toplu (batch) veri", "Hourly and daily batch data"],
                ["Saniyede binlerce olay", "Thousands of events per second"],
                ["Yalnızca tek seferlik yükleme", "Only a one-time load"],
                ["Gerçek zamanlı akış", "Real-time streaming"],
              ],
              answer: 0,
              explain: [
                "Metin bunu doğrudan söyler: klasik ambar saatlik/günlük toplu veriye göre tasarlanmıştır. Saniyede binlerce olay yazan sistemlerde bu tasarım hem hız hem maliyet açısından zorlanır — bu yüzden KQL veritabanı devreye girer.",
                "The text states this directly: a classic warehouse is designed for hourly/daily batch data. For systems writing thousands of events per second, that design strains under both speed and cost — which is exactly why the KQL database exists.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "KQL veritabanı (Eventhouse) hangi veri türü için optimize edilmiştir?",
                "What kind of data is the KQL database (Eventhouse) optimised for?",
              ],
              options: [
                ["Zaman serisi ve log verisi", "Time-series and log data"],
                ["Statik referans tabloları", "Static reference tables"],
                ["Yalnızca görüntü dosyaları", "Only image files"],
                ["Kullanıcı yetkilendirme kayıtları", "User permission records"],
              ],
              answer: 0,
              explain: [
                "Eventhouse, milyarlarca olayda saniyeler içinde sorgu çalıştıracak şekilde zaman serisi ve log verisine göre optimize edilmiştir; bu onu klasik ambardan farklı bir kullanım alanına yerleştirir.",
                "Eventhouse is optimised for time-series and log data so it can query billions of events in seconds; that puts it in a different use case from the classic warehouse.",
              ],
            }),
            text(
              "**Data Activator**, veri platformlarında az bilinen ama fikri güçlü bir bileşendir: veriyi izler ve **koşul gerçekleştiğinde eylem tetikler**.\n\nRaporu birinin açıp bakmasını beklemek yerine sistem şunu yapar:\n\n- Stok belirli bir eşiğin altına düşerse → satın alma ekibine e-posta\n- Bir mağazanın satışı normalin %40 altına inerse → bölge müdürüne Teams mesajı\n- Sensör sıcaklığı sınırı aşarsa → bakım iş emri açan bir Power Automate akışı\n\nBu, analitiğin doğal olgunlaşma yönüdür: **açıklayıcı** (ne oldu?) → **teşhis edici** (neden oldu?) → **uyarıcı** (bir şey oldu, bak!) → **kuralcı** (şunu yap).\n\nPratik değeri şudur: kimsenin sürekli bakmadığı bir rapor, kimsenin fark etmediği bir sorun demektir. Uyarı, raporun okunmasına bağımlılığı ortadan kaldırır.",
              "**Data Activator** is a little-known but conceptually strong component: it watches data and **triggers an action when a condition is met**.\n\nInstead of waiting for somebody to open a report, the system does this:\n\n- stock drops below a threshold → an email to the purchasing team\n- a store's sales fall 40% below normal → a Teams message to the regional manager\n- a sensor's temperature exceeds a limit → a Power Automate flow opening a maintenance ticket\n\nThis is the natural maturation of analytics: **descriptive** (what happened?) → **diagnostic** (why?) → **alerting** (something happened, look!) → **prescriptive** (do this).\n\nThe practical value is simple: a report nobody watches continuously is a problem nobody notices. Alerting removes the dependency on somebody reading it.",
            ),
            quiz({
              id: "q6",
              q: [
                "Data Activator'ın temel fikri nedir?",
                "What is Data Activator's core idea?",
              ],
              options: [
                [
                  "Veriyi izlemek ve koşul gerçekleştiğinde otomatik eylem tetiklemek",
                  "Watching data and triggering an action automatically when a condition is met",
                ],
                ["Rapor tasarımını otomatikleştirmek", "Automating report design"],
                ["Veriyi sıkıştırmak", "Compressing data"],
                ["Kapasiteyi izlemek", "Monitoring capacity"],
              ],
              answer: 0,
              explain: [
                "Data Activator, birinin raporu açıp bakmasını beklemek yerine veriyi sürekli izler ve tanımlı bir koşul gerçekleştiğinde (ör. stok eşiği) otomatik olarak bir eylem başlatır.",
                "Instead of waiting for someone to open a report and look, Data Activator continuously watches data and automatically kicks off an action once a defined condition (like a stock threshold) is met.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Analitiğin doğal olgunlaşma sırası nedir?",
                "What is the natural maturation order of analytics?",
              ],
              options: [
                [
                  "Açıklayıcı → teşhis edici → uyarıcı → kuralcı",
                  "Descriptive → diagnostic → alerting → prescriptive",
                ],
                [
                  "Kuralcı → uyarıcı → teşhis edici → açıklayıcı",
                  "Prescriptive → alerting → diagnostic → descriptive",
                ],
                [
                  "Uyarıcı → açıklayıcı → kuralcı → teşhis edici",
                  "Alerting → descriptive → prescriptive → diagnostic",
                ],
                ["Hepsi aynı anda gerçekleşir, sıra yoktur", "They all happen at once, there is no order"],
              ],
              answer: 0,
              explain: [
                "Metin bu sırayı net verir: önce ne olduğunu anlarsın (açıklayıcı), sonra neden olduğunu (teşhis edici), sonra bir şeyin olduğunu anında öğrenirsin (uyarıcı), en sonunda sistem ne yapman gerektiğini söyler (kuralcı). Data Activator bu son iki aşamayı hedefler.",
                "The text gives this order explicitly: first you understand what happened (descriptive), then why (diagnostic), then you learn instantly that something happened (alerting), and finally the system tells you what to do (prescriptive). Data Activator targets these last two stages.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "'Kimsenin sürekli bakmadığı bir rapor, kimsenin fark etmediği bir sorun demektir' ifadesi neyi vurgular?",
                "What does the phrase 'a report nobody watches continuously is a problem nobody notices' emphasise?",
              ],
              options: [
                [
                  "Uyarının, raporun okunmasına bağımlılığı ortadan kaldırdığını",
                  "That alerting removes the dependency on somebody reading the report",
                ],
                ["Raporların artık gereksiz olduğunu", "That reports are no longer needed at all"],
                ["Data Activator'ın rapor yerine geçtiğini", "That Data Activator replaces reports"],
                ["Kapasitenin boşa gittiğini", "That capacity is being wasted"],
              ],
              answer: 0,
              explain: [
                "Bu, Data Activator'ın pratik değerinin özetidir: pasif bir raporun fark edilmesi insana bağlıdır, ama sistem koşulu kendisi izleyip haber verdiğinde bu bağımlılık ortadan kalkar.",
                "This sums up Data Activator's practical value: noticing a passive report depends on a human, but once the system watches the condition itself and notifies you, that dependency disappears.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bir mağazanın satışı normalin %40 altına indiğinde bölge müdürüne Teams mesajı gönderilmesi, olgunlaşma zincirinin hangi aşamasına örnektir?",
                "Sending the regional manager a Teams message when a store's sales fall 40% below normal is an example of which stage in the maturation chain?",
              ],
              options: [
                ["Uyarıcı (alerting)", "Alerting"],
                ["Açıklayıcı (descriptive)", "Descriptive"],
                ["Teşhis edici (diagnostic)", "Diagnostic"],
                ["Kuralcı (prescriptive)", "Prescriptive"],
              ],
              answer: 0,
              explain: [
                "Bu örnek 'bir şey oldu, bak!' aşamasıdır — sistem koşulu tespit edip ilgili kişiye anında bildirir, ama neden düştüğünü açıklamaz veya ne yapılması gerektiğini emretmez; bu da onu uyarıcı aşamaya yerleştirir.",
                "This example is the 'something happened, look!' stage — the system detects the condition and notifies the right person instantly, but it doesn't explain why sales dropped or prescribe what to do, which places it at the alerting stage.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Data Activator örneklerinden biri olan 'sensör sıcaklığı sınırı aşarsa bakım iş emri açan Power Automate akışı', hangi tür eyleme örnektir?",
                "One Data Activator example — a Power Automate flow opening a maintenance ticket when sensor temperature exceeds a limit — is an example of what kind of action?",
              ],
              options: [
                [
                  "Tanımlı bir koşula bağlı otomatik iş akışı tetikleme",
                  "Triggering an automated workflow tied to a defined condition",
                ],
                ["Manuel olarak açılan bir rapor", "A report opened manually"],
                ["Kapasite ölçeklendirme", "Capacity scaling"],
                ["KQL sorgusu çalıştırma", "Running a KQL query"],
              ],
              answer: 0,
              explain: [
                "Bu örnek Data Activator'ın temel fikrinin somut hâlidir: sistem sıcaklık koşulunu izler ve eşik aşıldığında insan müdahalesi olmadan bir iş akışını (burada Power Automate) tetikler.",
                "This example is the concrete form of Data Activator's core idea: the system watches the temperature condition and, once the threshold is crossed, triggers a workflow (here, Power Automate) without human intervention.",
              ],
            }),
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
