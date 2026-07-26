import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, quiz, text, tip } from "../helpers";

export const powerBiTrack: Track = {
  slug: "power-bi",
  name: "Power BI",
  category: "bi",
  color: "#eab308",
  icon: "📈",
  tagline: L("Kurumsal raporlamanın standardı", "The standard for enterprise reporting"),
  description: L(
    "Power Query ile veri hazırlama, yıldız şema ile modelleme, DAX ile metrik yazma ve Power BI Service ile yayınlama. Microsoft ekosisteminde çalışıyorsan bu patika en yüksek getiriyi verir.",
    "Prepare data with Power Query, model it with a star schema, write measures in DAX and publish through Power BI Service. If you work in the Microsoft ecosystem, this track pays off fastest.",
  ),
  levels: [
    {
      id: "beginner",
      title: L("Başlangıç — Power Query ve ilk rapor", "Beginner — Power Query and your first report"),
      description: L(
        "Veriyi bağla, temizle, ilk görselleri kur ve raporu yayınla.",
        "Connect, clean, build your first visuals and publish the report.",
      ),
      projectSlug: "powerbi-satis-raporu",
      lessons: [
        lesson({
          slug: "power-query",
          title: L("Power Query ile veri hazırlama", "Preparing data with Power Query"),
          summary: L(
            "Rapordaki her hatanın kaynağı burasıdır. Temizliği görselde değil, burada yap.",
            "Every error in a report starts here. Clean the data here, never in the visual.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Power Query (Get & Transform), veriyi modele girmeden önce dönüştürdüğün katmandır. Yaptığın her adım **kaydedilir ve tekrarlanır** — yeni ay verisi geldiğinde tek tıkla aynı temizlik uygulanır. Excel'de elle yapılan temizliğin aksine, burada yaptığın hiçbir iş boşa gitmez.",
              "Power Query (Get & Transform) is the layer where you reshape data before it enters the model. Every step is **recorded and replayed** — next month's file gets the same cleaning with one click. Unlike manual cleanup in Excel, nothing you do here is throwaway work.",
            ),
            text(
              "En sık kullanılan adımlar:\n\n- **Promote Headers** — ilk satırı başlık yap\n- **Change Type** — özellikle tarih ve ondalık sayı; yerel ayarı (Locale) doğru seç\n- **Remove Columns** — kullanmayacağın sütunu modele hiç sokma\n- **Unpivot Columns** — geniş tabloyu uzun tabloya çevirir; Power BI uzun tabloyu sever\n- **Merge / Append Queries** — birleştir / alt alta ekle\n- **Group By** — kaynakta özetle, modele küçük gelsin",
              "The steps you will use most:\n\n- **Promote Headers** — turn the first row into headers\n- **Change Type** — especially dates and decimals; pick the right Locale\n- **Remove Columns** — never let an unused column into the model\n- **Unpivot Columns** — turns a wide table into a long one, which Power BI prefers\n- **Merge / Append Queries** — join / stack\n- **Group By** — summarise at the source so the model stays small",
            ),
            code(
              "m",
              `let
    Kaynak = Csv.Document(File.Contents("C:\\veri\\satis.csv"),
                          [Delimiter=";", Encoding=65001]),
    Basliklar = Table.PromoteHeaders(Kaynak, [PromoteAllScalars=true]),
    Tipler = Table.TransformColumnTypes(Basliklar, {
        {"Tarih", type date},
        {"Tutar", type number},
        {"Sehir", type text}
    }),
    Temiz = Table.SelectRows(Tipler, each [Tutar] <> null and [Tutar] > 0)
in
    Temiz`,
              "Power Query'nin arkasındaki M dili — arayüzdeki her tıklama bir satır üretir",
              "The M language behind Power Query — every click in the UI writes one line",
            ),
            pitfall(
              "Unpivot: geniş tablo tuzağı",
              "Unpivot: the wide-table trap",
              "Aylar sütun olarak gelen bir tablo (`Ocak`, `Şubat`, `Mart`…) Power BI'da işkencedir: her yeni ay modelin bozulması demektir. Ay sütunlarını seçip **Unpivot Columns** dediğinde `Ay` ve `Değer` diye iki sütun elde edersin ve model bir daha asla değişmez.",
              "A table with months as columns (`Jan`, `Feb`, `Mar`…) is misery in Power BI: every new month breaks the model. Select those columns, hit **Unpivot Columns**, and you get two columns — `Month` and `Value` — that never need changing again.",
            ),
            quiz({
              id: "q1",
              q: [
                "Power Query'de yapılan bir dönüşüm ne zaman çalışır?",
                "When does a Power Query transformation run?",
              ],
              options: [
                [
                  "Her veri yenilemesinde otomatik olarak tekrar uygulanır",
                  "Automatically on every data refresh",
                ],
                ["Sadece bir kez, ilk yüklemede", "Only once, at the first load"],
                ["Raporu her açtığında elle çalıştırman gerekir", "You must run it manually each time"],
                ["Yalnızca DAX ölçüsü çağırdığında", "Only when a DAX measure calls it"],
              ],
              answer: 0,
              explain: [
                "Adımlar bir tarif olarak saklanır ve her yenilemede sırayla tekrar uygulanır. Tekrarlanabilirliğin kaynağı budur; bu yüzden temizliği Excel'de elle değil burada yapmak gerekir.",
                "Steps are stored as a recipe and replayed in order on every refresh. That is where reproducibility comes from, and why cleaning belongs here rather than by hand in Excel.",
              ],
            }),
            order({
              id: "o1",
              prompt: [
                "Power BI'da sıfırdan rapor üretme akışını sıraya diz.",
                "Order the end-to-end flow of building a Power BI report.",
              ],
              lines: [
                "Get Data ile kaynağa bağlan",
                "Power Query'de temizle: başlık, tip, gereksiz sütun",
                "Model görünümünde tabloları ilişkilendir (yıldız şema)",
                "Tarih tablosu oluştur ve tarih tablosu olarak işaretle",
                "DAX ile ölçüleri (measure) yaz",
                "Raporu görsellerle kur ve dilimleyicileri ekle",
                "Power BI Service'e yayınla ve yenileme planı kur",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "intermediate",
      title: L("Orta — Veri modeli ve DAX", "Intermediate — Data model and DAX"),
      description: L(
        "Yıldız şema, ilişkiler, filtre yönü ve ilk gerçek DAX ölçüleri.",
        "Star schema, relationships, filter direction and your first real DAX measures.",
      ),
      projectSlug: "powerbi-kpi-panosu",
      lessons: [
        lesson({
          slug: "yildiz-sema",
          title: L("Yıldız şema: modelin temeli", "Star schema: the foundation of the model"),
          summary: L(
            "Power BI'daki performans ve doğruluk sorunlarının çoğu tek bir sebepten çıkar: yanlış model.",
            "Most accuracy and performance problems in Power BI come from one cause: a bad model.",
          ),
          minutes: 17,
          blocks: [
            text(
              "**Yıldız şema** iki tür tablodan oluşur:\n\n- **Fact (olgu)** — olayları tutar, çok satırlıdır: satış, sipariş, işlem. Sayısal ölçüler burada.\n- **Dimension (boyut)** — tanımları tutar, az satırlıdır: müşteri, ürün, tarih, mağaza. Filtrelediğin alanlar burada.\n\nBoyut tabloları fact tablosunu **bire-çok** ilişkiyle besler ve filtre daima boyuttan olguya akar.",
              "A **star schema** has two kinds of tables:\n\n- **Fact** — records events, many rows: sales, orders, transactions. Numeric measures live here.\n- **Dimension** — records definitions, few rows: customer, product, date, store. The fields you filter by live here.\n\nDimensions feed the fact table through **one-to-many** relationships, and filters always flow from dimension to fact.",
            ),
            info(
              "Tek büyük tablo neden kötüdür?",
              "Why one big flat table is bad",
              "Her şeyi tek tabloda tutmak Excel alışkanlığıdır. Power BI'ın motoru (VertiPaq) sütunları sıkıştırarak çalışır; tekrar eden metinler tek büyük tabloda modeli şişirir, ilişkili filtreleme kaybolur ve `Ürün Kategorisi` gibi bir dilimleyici tüm tabloyu taramak zorunda kalır. Yıldız şema hem küçültür hem hızlandırır.",
              "Keeping everything in one table is an Excel habit. Power BI's engine (VertiPaq) compresses column by column; repeated text in one flat table bloats the model, relational filtering disappears, and a slicer like `Product Category` has to scan the whole table. A star schema makes the model both smaller and faster.",
            ),
            text(
              "**Tarih tablosu** her modelde ayrı ve zorunludur. Kendi tarih tablonu oluştur, fact tablosuna bağla ve `Mark as Date Table` ile işaretle. Zaman zekâsı fonksiyonları (`TOTALYTD`, `SAMEPERIODLASTYEAR`) yalnızca böyle doğru çalışır.",
              "A **date table** is mandatory and separate in every model. Create your own, relate it to the fact table and flag it with `Mark as Date Table`. Time-intelligence functions (`TOTALYTD`, `SAMEPERIODLASTYEAR`) only work correctly this way.",
            ),
            code(
              "dax",
              `Tarih =
ADDCOLUMNS(
    CALENDAR(DATE(2023,1,1), DATE(2025,12,31)),
    "Yıl",       YEAR([Date]),
    "Ay No",     MONTH([Date]),
    "Ay Adı",    FORMAT([Date], "MMMM"),
    "Yıl-Ay",    FORMAT([Date], "YYYY-MM"),
    "Çeyrek",    "Ç" & QUARTER([Date]),
    "Hafta Günü", FORMAT([Date], "dddd")
)`,
              "DAX ile tarih tablosu",
              "A date table in DAX",
            ),
            quiz({
              id: "q1",
              q: [
                "Yıldız şemada ilişkiler hangi yönde kurulur?",
                "Which direction do relationships run in a star schema?",
              ],
              options: [
                ["Boyut tablosundan fact tablosuna, bire-çok", "From dimension to fact, one-to-many"],
                ["Fact tablosundan boyuta, bire-çok", "From fact to dimension, one-to-many"],
                ["Her ilişki çift yönlü olmalı", "Every relationship should be bidirectional"],
                ["Çoktan-çoğa en esnek olandır", "Many-to-many is the most flexible"],
              ],
              answer: 0,
              explain: [
                "Boyutun her satırı benzersizdir (bir müşteri, bir ürün), fact tablosunda ise defalarca geçer. Filtre bu yönde akar. Çift yönlü ilişkiler belirsizliğe ve yavaşlığa yol açtığı için ancak zorunlu hallerde açılır.",
                "Each dimension row is unique (one customer, one product) while appearing many times in the fact table. Filters flow along that direction. Bidirectional relationships create ambiguity and slowness, so enable them only when you must.",
              ],
              xp: 20,
            }),
          ],
        }),
        lesson({
          slug: "dax-temelleri",
          title: L("DAX temelleri ve filtre bağlamı", "DAX basics and filter context"),
          summary: L(
            "DAX'ta zorluk fonksiyonlar değil, bağlamdır. Bir kez oturduğunda gerisi kolay.",
            "The hard part of DAX is not the functions, it is context. Once that clicks, the rest follows.",
          ),
          minutes: 20,
          blocks: [
            text(
              "İki tür alan var:\n\n- **Hesaplanan sütun** — satır satır hesaplanır, modelde yer kaplar, dilimleyici olarak kullanılabilir.\n- **Ölçü (measure)** — görselin bağlamında hesaplanır, yer kaplamaz, ölçü olarak kullanılır.\n\nKural: **şüphedeysen ölçü yaz.** Hesaplanan sütun yalnızca dilimleyici veya ilişki için gerektiğinde.",
              "There are two kinds of fields:\n\n- **Calculated column** — computed row by row, stored in the model, usable as a slicer.\n- **Measure** — computed in the visual's context, stores nothing, used as a value.\n\nRule of thumb: **when in doubt, write a measure.** Use a calculated column only when you need a slicer or a relationship key.",
            ),
            code(
              "dax",
              `Toplam Satış = SUM(Satis[Tutar])

Satış Adedi = COUNTROWS(Satis)

Ortalama Sepet = DIVIDE([Toplam Satış], [Satış Adedi])

-- CALCULATE: filtre bağlamını değiştiren tek fonksiyon
İstanbul Satış =
CALCULATE([Toplam Satış], Musteri[Sehir] = "İstanbul")

-- Tüm filtreleri kaldır: pay/payda hesaplarının anahtarı
Genel Toplam = CALCULATE([Toplam Satış], ALL(Satis))

Kategori Payı % =
DIVIDE([Toplam Satış], CALCULATE([Toplam Satış], ALL(Urun[Kategori]))) * 100

-- Zaman zekâsı (tarih tablosu şart)
Geçen Yıl = CALCULATE([Toplam Satış], SAMEPERIODLASTYEAR(Tarih[Date]))
Büyüme % = DIVIDE([Toplam Satış] - [Geçen Yıl], [Geçen Yıl]) * 100
YTD = TOTALYTD([Toplam Satış], Tarih[Date])`,
            ),
            pitfall(
              "Sıfıra bölme ve DIVIDE",
              "Division by zero and DIVIDE",
              "`[A] / [B]` payda sıfır veya boşken hata üretir ve görselde `Infinity` görürsün. `DIVIDE([A], [B])` aynı durumda sessizce BLANK döner ve istersen üçüncü argümanla alternatif verirsin: `DIVIDE([A], [B], 0)`. DAX'ta bölme daima `DIVIDE` ile yapılır.",
              "`[A] / [B]` errors or shows `Infinity` when the denominator is zero or blank. `DIVIDE([A], [B])` returns BLANK instead, and takes an optional third argument for a fallback: `DIVIDE([A], [B], 0)`. In DAX you always divide with `DIVIDE`.",
            ),
            text(
              "**Filtre bağlamı**, bir ölçünün hangi satırlar üzerinde çalıştığını belirleyen her şeydir: görseldeki satır/sütun başlıkları, dilimleyiciler, sayfa filtreleri, `CALCULATE` içindeki koşullar. Bir ölçünün değeri tek başına anlamlı değildir — hangi bağlamda okunduğuna bağlıdır.",
              "**Filter context** is everything that decides which rows a measure runs over: row and column headers in the visual, slicers, page filters, and conditions inside `CALCULATE`. A measure's value means nothing on its own — it depends on the context it is read in.",
            ),
            quiz({
              id: "q1",
              q: [
                "`CALCULATE([Toplam Satış], ALL(Urun[Kategori]))` ne yapar?",
                "What does `CALCULATE([Total Sales], ALL(Product[Category]))` do?",
              ],
              options: [
                [
                  "Kategori filtresini kaldırıp tüm kategorilerin toplamını verir",
                  "Removes the category filter and returns the total across all categories",
                ],
                ["Sadece ilk kategoriyi hesaplar", "Computes only the first category"],
                ["Kategori sütununu tablodan siler", "Deletes the category column from the table"],
                ["Tüm filtreleri kaldırır", "Removes every filter in the model"],
              ],
              answer: 0,
              explain: [
                "`ALL(sütun)` yalnızca o sütunun filtresini kaldırır. Bu, \"bu kategorinin genel toplam içindeki payı\" gibi oranların standart kalıbıdır. Tüm filtreleri kaldırmak isteseydin `ALL(Tablo)` yazardın.",
                "`ALL(column)` clears the filter on that column only. This is the standard pattern for ratios like \"this category's share of the total\". To clear every filter you would write `ALL(Table)`.",
              ],
              xp: 25,
            }),
          ],
        }),
      ],
    },
    {
      id: "advanced",
      title: L("İleri — Yayın, güvenlik, ölçek", "Advanced — Deployment, security, scale"),
      description: L(
        "Satır düzeyi güvenlik, artımlı yenileme, çalışma alanı yönetimi ve model optimizasyonu.",
        "Row-level security, incremental refresh, workspace governance and model optimisation.",
      ),
      projectSlug: "powerbi-yonetici-panosu",
      lessons: [
        lesson({
          slug: "rls-ve-yayin",
          title: L("Satır düzeyi güvenlik ve yayınlama", "Row-level security and publishing"),
          summary: L(
            "Aynı raporu herkes açsın ama herkes yalnızca kendi verisini görsün.",
            "One report for everyone, where everyone sees only their own data.",
          ),
          minutes: 16,
          blocks: [
            text(
              "**RLS (Row-Level Security)** ile modelde rol tanımlar, role bir DAX filtresi yazarsın. Kullanıcı raporu açtığında filtre sessizce uygulanır.",
              "With **RLS (Row-Level Security)** you define a role in the model and attach a DAX filter to it. When a user opens the report the filter is applied silently.",
            ),
            code(
              "dax",
              `-- Rol: "Bölge Müdürü" için tablo filtresi
[Bolge] = LOOKUPVALUE(
    KullaniciBolge[Bolge],
    KullaniciBolge[Email], USERPRINCIPALNAME()
)

-- Basit statik rol: "Sadece İstanbul"
[Sehir] = "İstanbul"`,
              "Dinamik RLS: kullanıcının e-postasına göre bölge filtresi",
              "Dynamic RLS: filter by region based on the signed-in user's email",
            ),
            text(
              "Yayın akışı ve yönetişim:\n\n1. **Workspace** oluştur (kişisel My Workspace'te üretim raporu tutma).\n2. Raporu yayınla, **Semantic model** ile rapor ayrılsın.\n3. **Scheduled refresh** kur; kaynak şirket içindeyse **Gateway** gerekir.\n4. **Deployment pipeline** ile Dev → Test → Prod ayır.\n5. Son kullanıcıya **App** olarak dağıt, ham workspace erişimi verme.",
              "Publishing and governance flow:\n\n1. Create a **Workspace** (never keep production reports in My Workspace).\n2. Publish, keeping the **semantic model** separate from the report.\n3. Set up **scheduled refresh**; an on-premises source needs a **Gateway**.\n4. Separate Dev → Test → Prod with a **deployment pipeline**.\n5. Distribute to end users as an **App**, not by granting raw workspace access.",
            ),
            tip(
              "RLS'i yayınlamadan test et",
              "Test RLS before you publish",
              "Power BI Desktop'ta `Modeling → View As` ile bir rolü veya belirli bir kullanıcıyı taklit edip raporu onun gözünden görebilirsin. Yayınladıktan sonra Service tarafında da `Test as role` vardır. Bu adımı atlayan ekipler, yanlış kişiye yanlış veriyi göstermenin ne kadar hızlı olduğunu zor yoldan öğrenir.",
              "In Power BI Desktop, `Modeling → View As` lets you impersonate a role or a specific user and see the report through their eyes. The Service has `Test as role` too. Teams that skip this step learn the hard way how quickly the wrong data reaches the wrong person.",
            ),
            quiz({
              id: "q1",
              q: [
                "Artımlı yenileme (incremental refresh) ne işe yarar?",
                "What is incremental refresh for?",
              ],
              options: [
                [
                  "Yalnızca değişen son dönemi yenileyerek yenileme süresini kısaltır",
                  "It refreshes only the recent changed period, cutting refresh time",
                ],
                ["Raporu otomatik olarak sürekli günceller", "It keeps the report updating continuously"],
                ["Model boyutunu sıkıştırır", "It compresses the model"],
                ["Görselleri daha hızlı çizer", "It renders visuals faster"],
              ],
              answer: 0,
              explain: [
                "Beş yıllık veriyi her gece baştan çekmek yerine yalnızca son N günü yenilersin; geçmiş bölümler arşivde kalır. Büyük modellerde yenileme süresini saatlerden dakikalara indiren en etkili tek ayardır.",
                "Instead of pulling five years of history every night, you refresh only the last N days and keep older partitions archived. On large models it is the single most effective setting, cutting refresh from hours to minutes.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
