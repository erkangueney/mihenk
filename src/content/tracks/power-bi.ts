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
      id: "foundation",
      title: L("Power BI'a giriş", "Getting started with Power BI"),
      description: L(
        "Araç ne işe yarar, parçaları nelerdir ve ilk görselini nasıl kurarsın?",
        "What the tool is for, what its pieces are, and how you build your first visual.",
      ),
      lessons: [
        lesson({
          slug: "power-bi-nedir",
          title: L("Power BI nedir ve parçaları", "What Power BI is, and its pieces"),
          summary: L(
            "Desktop, Service, Gateway… Hangi parça ne iş yapıyor?",
            "Desktop, Service, Gateway… which piece does what?",
          ),
          minutes: 12,
          blocks: [
            text(
              "Power BI tek bir program değil, birkaç parçadan oluşan bir ailedir:\n\n- **Power BI Desktop** — Ücretsiz Windows uygulaması. Veriyi bağlarsın, modeli kurarsın, raporu tasarlarsın. İşin %90'ı burada yapılır.\n- **Power BI Service (app.powerbi.com)** — Bulut tarafı. Raporu yayınlar, paylaşır, zamanlanmış yenileme kurarsın. Lisans gerektirir.\n- **Power BI Mobile** — Yayınlanan raporları telefonda görüntüler.\n- **Gateway** — Şirket içi (on-premise) veritabanına buluttan erişimi sağlayan köprü. Verin kendi sunucundaysa bu şart.\n\nAkış her zaman aynıdır: **Desktop'ta yap → Service'e yayınla → kullanıcı tarayıcıdan veya telefondan görsün.**",
              "Power BI is not one program but a family of pieces:\n\n- **Power BI Desktop** — a free Windows application. You connect data, build the model and design the report. 90% of the work happens here.\n- **Power BI Service (app.powerbi.com)** — the cloud side. You publish, share and set up scheduled refresh. It requires a licence.\n- **Power BI Mobile** — views published reports on a phone.\n- **Gateway** — the bridge that lets the cloud reach an on-premise database. Essential when your data sits on your own servers.\n\nThe flow is always the same: **build in Desktop → publish to Service → users view it in a browser or on a phone.**",
            ),
            text(
              "**Desktop'taki üç görünüm** — sol kenardaki üç simge, işin üç aşamasıdır:\n\n1. **Rapor** — Görselleri yerleştirdiğin tuval. Zamanın çoğu burada geçer gibi görünür ama geçmemeli.\n2. **Veri** — Yüklenen tabloları satır satır gördüğün yer. Kontrol için kullanılır.\n3. **Model** — Tablolar arası ilişkileri kurduğun şema görünümü. **Raporun kaderi burada belirlenir.**\n\nYeni başlayanların en büyük hatası doğrudan Rapor görünümüne atlayıp görsel yerleştirmeye başlamaktır. Model yanlışsa görseller de yanlış sayı gösterir — ve sorunu görselde aramak saatler kaybettirir.",
              "**The three views in Desktop** — the three icons down the left edge are the three stages of the work:\n\n1. **Report** — the canvas where you place visuals. It looks like where most time goes, but it should not be.\n2. **Data** — where you see the loaded tables row by row. Used for checking.\n3. **Model** — the schema view where you define relationships between tables. **This is where a report's fate is decided.**\n\nThe biggest beginner mistake is jumping straight into Report view and placing visuals. If the model is wrong the visuals show wrong numbers — and hunting for the problem in the visual wastes hours.",
            ),
            quiz({
              id: "q1",
              q: [
                "Şirket içi SQL Server'daki veriyi Power BI Service üzerinden her sabah otomatik yenilemek istiyorsun. Neye ihtiyacın var?",
                "You want to auto-refresh data from an on-premise SQL Server through Power BI Service every morning. What do you need?",
              ],
              options: [
                ["On-premises data gateway", "An on-premises data gateway"],
                ["Power BI Mobile", "Power BI Mobile"],
                ["Yalnızca Desktop yeterli", "Desktop alone is enough"],
                ["Excel eklentisi", "An Excel add-in"],
              ],
              answer: 0,
              explain: [
                "Power BI Service buluttadır ve şirket ağının içindeki sunucuya doğrudan ulaşamaz. Gateway, şirket ağında çalışan ve bulutla güvenli bir tünel kuran bir hizmettir. Veri buluttaysa (Azure SQL, SharePoint gibi) gateway gerekmez.",
                "Power BI Service lives in the cloud and cannot reach a server inside your corporate network directly. A gateway is a service running inside that network which opens a secure tunnel to the cloud. If the data is already in the cloud (Azure SQL, SharePoint) no gateway is needed.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "ilk-gorsel",
          title: L("İlk görselini kurmak", "Building your first visual"),
          summary: L(
            "Alan kuyularına ne sürüklersin ve Power BI arka planda ne yapar?",
            "What do you drag into the field wells, and what does Power BI do behind the scenes?",
          ),
          minutes: 14,
          blocks: [
            text(
              "Power BI'da her görsel aynı mantıkla çalışır: alanları **kuyulara (wells)** sürüklersin.\n\n- **Eksen / Kategori** — Neye göre böleceğin: şehir, ay, kategori. Genelde metin veya tarih.\n- **Değerler** — Ne ölçeceğin: tutar, adet. Genelde sayı ve **otomatik olarak toplanır**.\n- **Açıklama / Renk** — İkinci bir kırılım: segment, durum.\n- **Araç ipucu** — Üzerine gelince görünecek ek bilgi.\n\nBir alanı Değerler kuyusuna sürüklediğinde Power BI arkada sessizce `SUM()` uygular. Bu **örtük ölçü (implicit measure)** denir ve kolaylık sağlar ama bir noktadan sonra sorun çıkarır — bunu bir sonraki kademede göreceksin.",
              "Every visual in Power BI works the same way: you drag fields into **wells**.\n\n- **Axis / Category** — what you slice by: city, month, category. Usually text or a date.\n- **Values** — what you measure: amount, count. Usually numeric, and **aggregated automatically**.\n- **Legend / Colour** — a second breakdown: segment, status.\n- **Tooltip** — extra information shown on hover.\n\nWhen you drag a field into Values, Power BI quietly applies `SUM()` behind the scenes. This is called an **implicit measure**; it is convenient but causes trouble past a certain point — you will see why at the next stage.",
            ),
            text(
              "**Hangi görsel ne zaman?** Bu, öğrenilecek en kârlı kurallardan biridir:\n\n- **Sütun grafiği** — Kategorileri karşılaştırmak. En güvenli varsayılan.\n- **Çubuk grafiği** — Kategori adları uzunsa (şehir, ürün adı) yatay olan okunur.\n- **Çizgi grafiği** — **Yalnızca** zaman içindeki değişim için.\n- **Kart** — Tek bir önemli sayı: toplam ciro, aktif müşteri.\n- **Tablo / Matris** — Kesin sayıların okunması gerektiğinde.\n- **Harita** — Coğrafi desen gerçekten önemliyse.\n- **Pasta grafiği** — Nadiren. İkiden fazla dilim varsa sütun grafiği her zaman daha okunurdur.",
              "**Which visual, when?** This is one of the highest-return rules to learn:\n\n- **Column chart** — comparing categories. The safest default.\n- **Bar chart** — when category names are long (city, product name), horizontal reads better.\n- **Line chart** — **only** for change over time.\n- **Card** — a single important number: total revenue, active customers.\n- **Table / Matrix** — when exact numbers must be read.\n- **Map** — when the geographic pattern genuinely matters.\n- **Pie chart** — rarely. With more than two slices a column chart is always more readable.",
            ),
            pitfall(
              "Görsel sayısını sınırla",
              "Limit the number of visuals",
              "Bir sayfaya 15 görsel koymak raporu \"zengin\" yapmaz; **okunmaz** yapar. Ayrıca her görsel ayrı bir sorgu çalıştırır, yani rapor da yavaşlar.\n\nPratik kural: **bir sayfa, bir soru.** Sayfanın en üstünde 3-4 kart (özet sayılar), altında 2-3 detay görseli yeterlidir. Kullanıcı daha derine inmek isterse ayrı bir sayfaya veya detaya git (drill-through) özelliğine yönlendir.",
              "Putting 15 visuals on a page does not make a report \"rich\"; it makes it **unreadable**. Each visual also fires its own query, so the report gets slower.\n\nA practical rule: **one page, one question.** Three or four cards across the top (headline numbers) and two or three detail visuals below is enough. If a user wants to go deeper, send them to a separate page or a drill-through.",
            ),
            quiz({
              id: "q1",
              q: [
                "Aylık ciro değişimini göstermek için hangi görsel doğrudur?",
                "Which visual is right for showing how revenue changes month by month?",
              ],
              options: [
                ["Çizgi grafiği", "A line chart"],
                ["Pasta grafiği", "A pie chart"],
                ["Harita", "A map"],
                ["Kart", "A card"],
              ],
              answer: 0,
              explain: [
                "Çizgi grafiği zaman içindeki sürekliliği ve eğilimi gösterir — noktaları birleştiren çizgi, \"bu değerler birbirini takip ediyor\" der. Sütun grafiği de kullanılabilir ama trendi okumak zorlaşır. Pasta grafiği bir bütünün parçalarını gösterir, zamanı değil.",
                "A line chart shows continuity and trend over time — the line connecting the points says \"these values follow one another\". A column chart also works but makes the trend harder to read. A pie chart shows parts of a whole, not time.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "veriyi-baglamak",
          title: L("Veriyi bağlamak: Import mı DirectQuery mi?", "Connecting data: Import or DirectQuery?"),
          summary: L(
            "İlk ekranda verdiğin bu karar, raporun tüm ömrünü belirler.",
            "The choice you make on the first screen shapes the report's entire life.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Power BI veriye bağlanırken sana iki mod sunar ve bu karar sonradan değiştirmesi zor bir karardır.\n\n**Import (İçe aktarma)** — Veri Power BI dosyasının içine kopyalanır ve sıkıştırılır.\n\n- ✅ **Çok hızlı** — tüm hesaplar bellekte yapılır\n- ✅ DAX'ın tüm özellikleri çalışır\n- ❌ Veri yenileme anına ait — canlı değil\n- ❌ Boyut sınırı var (Pro lisansta 1 GB)\n\n**DirectQuery** — Veri kopyalanmaz; her görsel kaynağa canlı sorgu atar.\n\n- ✅ **Her zaman güncel**\n- ✅ Boyut sınırı yok — milyarlarca satır\n- ❌ Yavaş; her tıklama kaynağa yük bindirir\n- ❌ Bazı DAX fonksiyonları çalışmaz",
              "Power BI offers two modes when connecting, and the choice is hard to change later.\n\n**Import** — the data is copied into the Power BI file and compressed.\n\n- ✅ **Very fast** — all calculation happens in memory\n- ✅ Every DAX feature works\n- ❌ Reflects the moment of refresh — not live\n- ❌ There is a size limit (1 GB on a Pro licence)\n\n**DirectQuery** — nothing is copied; every visual sends a live query to the source.\n\n- ✅ **Always current**\n- ✅ No size limit — billions of rows\n- ❌ Slow; every click loads the source\n- ❌ Some DAX functions do not work",
            ),
            tip(
              "Şüphedeysen Import seç",
              "When in doubt, choose Import",
              "Gerçek projelerin büyük çoğunluğu Import ile çalışır ve çalışmalıdır. DirectQuery yalnızca iki durumda haklıdır: **veri gerçekten çok büyükse** (belleğe sığmıyorsa) veya **saniyelik güncellik gerçekten gerekiyorsa** (canlı operasyon panosu gibi).\n\n\"Veri her zaman güncel olsun\" isteği çoğu zaman gerçek bir ihtiyaç değildir. Yöneticiye sor: \"dünkü veriyle karar verebilir misin?\" Cevap genellikle evettir — ve o zaman Import, hem çok daha hızlı hem çok daha az sorunlu bir rapor demektir.\n\nOrta yol: **Composite model** — büyük olgu tablosu DirectQuery, küçük boyut tabloları Import.",
              "The overwhelming majority of real projects run on Import, and should. DirectQuery is justified in only two cases: the **data is genuinely huge** (it will not fit in memory) or **second-by-second freshness is genuinely required** (a live operations dashboard).\n\nThe request \"the data must always be current\" is usually not a real requirement. Ask the executive: \"can you decide on yesterday's data?\" The answer is normally yes — and then Import gives you a far faster and far less troublesome report.\n\nA middle path: a **composite model** — the large fact table on DirectQuery, the small dimension tables on Import.",
            ),
            quiz({
              id: "q1",
              q: [
                "Günlük satış raporu, veri gecelik güncelleniyor ve 5 milyon satır var. Hangi mod?",
                "A daily sales report, data updated overnight, 5 million rows. Which mode?",
              ],
              options: [
                [
                  "Import — gecelik yenileme yeterli, hız kazanılır",
                  "Import — an overnight refresh is enough, and you gain speed",
                ],
                ["DirectQuery — veri büyük", "DirectQuery — the data is large"],
                ["Live connection", "Live connection"],
                ["Fark etmez", "It makes no difference"],
              ],
              answer: 0,
              explain: [
                "5 milyon satır Power BI için büyük değildir; sıkıştırma sonrası rahatlıkla belleğe sığar. Veri zaten gecelik güncellendiğine göre canlı sorguya ihtiyaç yok. Import seçmek, kullanıcıya çok daha hızlı bir rapor ve sana tüm DAX özelliklerini verir.",
                "Five million rows is not large for Power BI; after compression it fits comfortably in memory. Since the data only updates overnight anyway, there is no need for live queries. Import gives the user a far faster report and gives you the full DAX feature set.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "junior",
      title: L("Power Query ve ilk rapor", "Power Query and your first report"),
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
        lesson({
          slug: "gorsel-etkilesimi-ve-filtreler",
          title: L("Dilimleyiciler ve görsel etkileşimi", "Slicers and visual interactions"),
          summary: L(
            "Bir görsele tıklayınca diğerleri neden değişiyor — ve bunu nasıl kontrol edersin?",
            "Why do other visuals change when you click one — and how do you control it?",
          ),
          minutes: 16,
          blocks: [
            text(
              "Power BI raporlarının en güçlü yanı **çapraz filtrelemedir**: bir görselde bir sütuna tıkladığında sayfadaki tüm diğer görseller o seçime göre süzülür. Kullanıcı hiçbir şey öğrenmeden veriyi keşfedebilir.\n\n**Filtreleme dört seviyede çalışır** ve hepsi birleşerek uygulanır:\n\n1. **Görsel düzeyi** — yalnızca o görseli etkiler\n2. **Sayfa düzeyi** — o sayfadaki tüm görseller\n3. **Rapor düzeyi** — tüm sayfalar\n4. **Dilimleyici (slicer)** — kullanıcının kendi seçtiği filtre\n\nBir görselde gördüğün sayı, bu dördünün **kesişimidir**. Yanlış sayı gördüğünde ilk bakılacak yer budur — genelde unutulmuş bir rapor düzeyi filtresi vardır.",
              "The greatest strength of a Power BI report is **cross-filtering**: click a bar in one visual and every other visual on the page filters to that selection. A user can explore the data without learning anything.\n\n**Filtering works at four levels**, and they combine:\n\n1. **Visual level** — affects only that visual\n2. **Page level** — every visual on that page\n3. **Report level** — every page\n4. **Slicers** — the filter the user picks themselves\n\nThe number you see in a visual is the **intersection** of all four. When a number looks wrong this is the first place to look — usually there is a forgotten report-level filter.",
            ),
            text(
              "**Etkileşimi kontrol etmek:** Bir görseli seç → Biçim sekmesi → **Etkileşimleri Düzenle**. Her diğer görselin üstünde üç simge belirir:\n\n- **Filtre** — Seçime göre süzülür (varsayılan)\n- **Vurgu** — Seçim vurgulanır, gerisi soluk kalır. Bütün içindeki payı görmek için idealdir.\n- **Yok** — Etkilenmez. Toplam gösteren kartlar için genelde bu istenir; kullanıcı bir şehre tıklasa bile \"toplam ciro\" kartının değişmemesini isteyebilirsin.\n\n**Dilimleyici türleri:** liste, açılır menü, tarih aralığı, sayı aralığı ve **hiyerarşik dilimleyici** (ülke → şehir). Az yer kaplaması için açılır menü tercih edilir.",
              "**Controlling interactions:** select a visual → Format tab → **Edit Interactions**. Three icons appear above every other visual:\n\n- **Filter** — filters to the selection (the default)\n- **Highlight** — highlights the selection and dims the rest. Ideal for seeing a share of the whole.\n- **None** — unaffected. This is usually what you want for cards showing totals; even when the user clicks a city you may want the \"total revenue\" card to stay put.\n\n**Slicer types:** list, dropdown, date range, numeric range and **hierarchy slicer** (country → city). Dropdowns are preferred to save space.",
            ),
            tip(
              "Dilimleyici senkronizasyonu",
              "Syncing slicers",
              "Çok sayfalı bir raporda kullanıcı her sayfada tarih filtresini yeniden seçmek zorunda kalmamalı. **Görünüm → Dilimleyicileri Senkronize Et** panelinden bir dilimleyicinin hangi sayfalarda geçerli olacağını ve hangilerinde **görüneceğini** ayrı ayrı işaretlersin.\n\nYaygın kullanım: dilimleyici yalnızca ilk sayfada **görünür**, ama seçim tüm sayfalarda **geçerli** olur. Böylece hem yer kazanırsın hem tutarlılık sağlarsın.",
              "In a multi-page report the user should not have to re-pick the date filter on every page. In **View → Sync Slicers** you tick separately which pages a slicer **applies** to and which pages it is **visible** on.\n\nA common setup: the slicer is **visible** only on the first page but **applies** to all of them. You save space and keep the selection consistent.",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir kart görselinin, kullanıcı şehir seçse bile toplam ciroyu göstermesini istiyorsun. Ne yaparsın?",
                "You want a card to keep showing total revenue even when the user selects a city. What do you do?",
              ],
              options: [
                [
                  "Etkileşimleri Düzenle ile o karta gelen etkileşimi \"Yok\" yaparsın",
                  "Use Edit Interactions to set that card's interaction to \"None\"",
                ],
                ["Kartı başka sayfaya taşırsın", "Move the card to another page"],
                ["Dilimleyiciyi kaldırırsın", "Remove the slicer"],
                ["Bu mümkün değildir", "This is not possible"],
              ],
              answer: 0,
              explain: [
                "Etkileşimleri Düzenle her görsel çifti için ayrı ayrı ayarlanır. Alternatif olarak DAX tarafında `CALCULATE([Toplam], ALL(Sehir))` yazarak ölçüyü filtreye kapatabilirsin — ama tek bir görsel için arayüzden ayarlamak daha basittir.",
                "Edit Interactions is configured per pair of visuals. Alternatively you could write `CALCULATE([Total], ALL(City))` in DAX to make the measure ignore the filter — but for a single visual the interface setting is simpler.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "mid",
      title: L("Veri modeli ve DAX", "Data model and DAX"),
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
      id: "senior",
      title: L("Yayın, güvenlik, ölçek", "Deployment, security, scale"),
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
        lesson({
          slug: "performans-optimizasyonu",
          title: L("Rapor performansı", "Report performance"),
          summary: L(
            "Rapor neden yavaş açılıyor ve hangi üç değişiklik en çok fark yaratır?",
            "Why is the report slow to open, and which three changes make the biggest difference?",
          ),
          minutes: 18,
          blocks: [
            text(
              "Yavaş rapor kullanılmayan rapordur. Power BI'da performansın **%80'i model tasarımından** gelir, görsellerden değil. Etki sırasına göre yapılacaklar:\n\n**1. Modeli küçült — en büyük kazanç**\n\n- Kullanmadığın sütunları Power Query'de **sil**. Her sütun bellekte yer kaplar ve yenilemeyi yavaşlatır.\n- Yüksek kardinaliteli sütunlardan kurtul. En kötüsü **tarih-saat** sütunlarıdır: saniye içeren bir sütunda milyonlarca benzersiz değer olur ve sıkıştırma çalışmaz. Tarih ile saati **iki ayrı sütuna** böl.\n- Gereksiz ondalık hassasiyeti azalt.\n\n**2. Hesaplanan sütun yerine ölçü kullan**\n\nHesaplanan sütun (calculated column) yenileme anında hesaplanır ve **bellekte saklanır**. Ölçü (measure) ise sorgu anında hesaplanır ve yer kaplamaz. Toplama gerektiren her şey ölçü olmalıdır.\n\n**3. İki yönlü ilişkilerden kaçın**\n\nHer iki yönlü ilişki, sorgu planını karmaşıklaştırır ve belirsizlik yaratır. Gerçekten gerekmedikçe tek yön kullan.",
              "A slow report is an unused report. In Power BI **80% of performance comes from model design**, not from the visuals. What to do, in order of impact:\n\n**1. Shrink the model — the biggest win**\n\n- **Delete** columns you do not use, in Power Query. Every column occupies memory and slows the refresh.\n- Get rid of high-cardinality columns. The worst offenders are **datetime** columns: one containing seconds has millions of distinct values and compression fails. Split date and time into **two separate columns**.\n- Reduce unnecessary decimal precision.\n\n**2. Prefer measures over calculated columns**\n\nA calculated column is computed at refresh time and **stored in memory**. A measure is computed at query time and occupies nothing. Anything requiring aggregation should be a measure.\n\n**3. Avoid bi-directional relationships**\n\nEach bi-directional relationship complicates the query plan and introduces ambiguity. Use a single direction unless you genuinely need both.",
            ),
            text(
              "**Ölçüm araçları — tahmin etme, ölç:**\n\n- **Performans Çözümleyici (Performance Analyzer)** — Desktop'ta Görünüm sekmesinde. Kaydı başlat, sayfayı yenile ve her görselin kaç milisaniye sürdüğünü gör. Yavaş olan görseli **kesin olarak** bulur.\n- **DAX Studio** — Ücretsiz harici araç. Görselin ürettiği DAX sorgusunu ve sorgu planını gösterir; ölçü optimizasyonunun ciddi işi burada yapılır.\n- **VertiPaq Analyzer** — Hangi tablonun ve sütunun kaç MB yediğini gösterir. \"Modeli küçült\" adımına nereden başlayacağını söyler.\n\nGenel eşik: bir görsel 2 saniyeden uzun sürüyorsa kullanıcı bunu yavaş hisseder.",
              "**Measurement tools — measure, do not guess:**\n\n- **Performance Analyzer** — in Desktop, on the View tab. Start recording, refresh the page and see how many milliseconds each visual took. It finds the slow visual **definitively**.\n- **DAX Studio** — a free external tool. It shows the DAX query a visual generates and its query plan; serious measure optimisation happens here.\n- **VertiPaq Analyzer** — shows how many MB each table and column consumes. It tells you where to start on the \"shrink the model\" step.\n\nA general threshold: if a visual takes more than 2 seconds, users perceive the report as slow.",
            ),
            quiz({
              id: "q1",
              q: [
                "Modeli küçültmek için hangi sütun türü en çok yer kaplar?",
                "Which kind of column consumes the most space in a model?",
              ],
              options: [
                [
                  "Saniye içeren tarih-saat sütunu — çok yüksek kardinalite, sıkıştırma çalışmaz",
                  "A datetime column with seconds — very high cardinality, compression fails",
                ],
                ["Az sayıda değeri olan metin sütunu", "A text column with few distinct values"],
                ["Boolean sütun", "A boolean column"],
                ["Tam sayı sütunu", "An integer column"],
              ],
              answer: 0,
              explain: [
                "Power BI'ın VertiPaq motoru sütunları benzersiz değerleri sözlükte tutarak sıkıştırır. Az benzersiz değer = mükemmel sıkıştırma. Saniye hassasiyetli bir tarih-saat sütununda neredeyse her satır benzersizdir, dolayısıyla sıkıştırma hiç çalışmaz ve sütun modelin en büyük parçası olur.",
                "Power BI's VertiPaq engine compresses a column by keeping its distinct values in a dictionary. Few distinct values means excellent compression. In a datetime column with second precision nearly every row is unique, so compression does nothing and the column becomes the largest part of the model.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "expert",
      title: L("Kurumsal Power BI", "Enterprise Power BI"),
      description: L(
        "Tek raporun ötesi: yeniden kullanılabilir veri kümeleri, sürüm yönetimi ve yönetişim.",
        "Beyond a single report: reusable datasets, version control and governance.",
      ),
      lessons: [
        lesson({
          slug: "paylasilan-veri-kumeleri",
          title: L("Paylaşılan veri kümeleri ve yeniden kullanım", "Shared datasets and reuse"),
          summary: L(
            "On rapor, on ayrı model demek olmamalı. Tek modeli herkes kullansın.",
            "Ten reports should not mean ten separate models. Let everyone build on one.",
          ),
          minutes: 18,
          blocks: [
            text(
              "Power BI'da en sık görülen kurumsal hata şudur: her analist kendi `.pbix` dosyasında kendi modelini kurar. Sonuç, aynı şirkette **\"toplam ciro\" için beş farklı sayı** olmasıdır — çünkü beş kişi filtreyi ve iade mantığını farklı yazmıştır.\n\nÇözüm **paylaşılan anlamsal model (shared semantic dataset)**: bir kişi modeli kurar ve yayınlar; diğerleri Power BI Desktop'tan **\"Power BI anlamsal modelleri\"** kaynağına bağlanıp yalnızca rapor tasarlar. Model tek, raporlar çok olur.\n\nBu, tek doğruluk kaynağını teknik olarak **zorunlu** kılan yapıdır — belge veya toplantıyla değil, mimariyle.",
              "The most common enterprise mistake in Power BI is this: every analyst builds their own model inside their own `.pbix`. The result is **five different numbers for \"total revenue\"** in the same company — because five people wrote the filter and the returns logic differently.\n\nThe fix is a **shared semantic dataset**: one person builds and publishes the model; everyone else connects from Power BI Desktop via the **\"Power BI semantic models\"** source and designs only reports. One model, many reports.\n\nThis is the structure that makes a single source of truth technically **compulsory** — through architecture rather than documents and meetings.",
            ),
            text(
              "**Kurumsal düzende üç kavram:**\n\n- **Çalışma alanı (workspace)** — Raporların ve modellerin yaşadığı klasör. Geliştirme / Test / Üretim için **ayrı** çalışma alanları kur.\n- **Uygulama (app)** — Bir çalışma alanındaki raporların son kullanıcıya paketlenmiş hâli. Kullanıcılar çalışma alanına değil uygulamaya erişir; böylece sen çalışma alanında değişiklik yaparken onlar etkilenmez.\n- **Dağıtım hattı (deployment pipeline)** — Geliştirme → Test → Üretim geçişini yöneten araç (Premium gerektirir). Değişikliği elle kopyalamak yerine düğmeye basarsın.\n\n**Yetkilendirme:** Kullanıcıya raporu değil **uygulamayı** paylaş; çalışma alanı rollerini (Yönetici, Üye, Katkıda Bulunan, Görüntüleyici) doğru dağıt.",
              "**Three concepts in an enterprise setup:**\n\n- **Workspace** — the folder where reports and models live. Create **separate** workspaces for Development / Test / Production.\n- **App** — the packaged form of a workspace's reports for end users. Users access the app rather than the workspace, so your edits do not disturb them.\n- **Deployment pipeline** — the tool managing Development → Test → Production promotion (requires Premium). Instead of copying changes by hand, you press a button.\n\n**Permissions:** share the **app**, not the report; and assign workspace roles (Admin, Member, Contributor, Viewer) deliberately.",
            ),
            quiz({
              id: "q1",
              q: [
                "Şirkette \"toplam ciro\" için farklı raporlarda farklı sayılar çıkıyor. En yapısal çözüm nedir?",
                "Different reports in the company show different numbers for \"total revenue\". What is the most structural fix?",
              ],
              options: [
                [
                  "Tek bir paylaşılan anlamsal model kurup tüm raporları ona bağlamak",
                  "Build one shared semantic model and connect every report to it",
                ],
                ["Herkese aynı Excel dosyasını göndermek", "Send everybody the same Excel file"],
                ["Raporları haftalık kontrol etmek", "Review the reports weekly"],
                ["Tanımı belgeye yazmak", "Write the definition down in a document"],
              ],
              answer: 0,
              explain: [
                "Belge yazmak ve kontrol etmek yardımcı olur ama insan disiplinine bağlıdır ve zamanla bozulur. Paylaşılan model, ölçüyü tek yerde tanımlar; kimse kendi sürümünü yazamaz. Mimari çözüm, süreç çözümünden daha dayanıklıdır.",
                "Documents and reviews help but depend on human discipline and decay over time. A shared model defines the measure in one place; nobody can write their own version. An architectural fix outlasts a procedural one.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "surum-yonetimi-ve-yonetisim",
          title: L("Sürüm yönetimi ve yönetişim", "Version control and governance"),
          summary: L(
            "İkili `.pbix` dosyasını nasıl versiyonlarsın ve raporlar nasıl çoğalmadan yönetilir?",
            "How do you version a binary `.pbix`, and how do you stop reports from multiplying?",
          ),
          minutes: 18,
          blocks: [
            text(
              "Power BI'ın klasik `.pbix` dosyası **ikili (binary)** biçimdedir. Git'e koyabilirsin ama fark (diff) göremezsin — \"ne değişti?\" sorusunun cevabı yoktur ve iki kişinin değişikliği birleştirilemez.\n\n**Çözüm: PBIP (Power BI Project) biçimi.** Dosya → Farklı Kaydet → **Power BI project** seçersen rapor ve model, klasör içinde **metin dosyalarına** açılır. Artık:\n\n- Git'te gerçek fark görürsün — hangi ölçü değişti, hangi görsel eklendi\n- İki kişi farklı dallarda çalışıp birleştirebilir\n- Kod incelemesi (pull request) yapılabilir\n- Otomatik yayın hattı (CI/CD) kurulabilir\n\nBunun yanında **TMDL** (Tabular Model Definition Language), modeli okunabilir metin olarak tanımlar ve ölçüleri gerçekten sürüm kontrolüne sokar.",
              "Power BI's classic `.pbix` is a **binary** file. You can put it in Git but you cannot diff it — there is no answer to \"what changed?\", and two people's edits cannot be merged.\n\n**The fix: the PBIP (Power BI Project) format.** File → Save As → **Power BI project** unpacks the report and model into **text files** in a folder. Now:\n\n- You see real diffs in Git — which measure changed, which visual was added\n- Two people can work on branches and merge\n- Code review (pull requests) becomes possible\n- An automated release pipeline (CI/CD) can be built\n\nAlongside it, **TMDL** (Tabular Model Definition Language) describes the model as readable text and brings measures properly under version control.",
            ),
            text(
              "**Yönetişim — rapor çoğalmasını (report sprawl) durdurmak:**\n\nHer şirkette aynı hikâye yaşanır: iki yılda 300 rapor birikir, hangisinin güncel olduğunu kimse bilmez ve kimse silmeye cesaret edemez. Dört pratik önlem:\n\n1. **Onaylı içerik etiketleri** — Power BI'da bir veri kümesini **Onaylı (Certified)** veya **Tanıtılan (Promoted)** olarak işaretle. Kullanıcı hangisine güveneceğini görür.\n2. **Kullanım ölçümü** — Service'te her raporun kullanım istatistiği vardır. 90 gündür açılmayan raporu arşivle.\n3. **Sahiplik** — Her raporun bir sahibi olsun ve bu ad raporun üstünde yazsın. Sahipsiz rapor kısa sürede çürür.\n4. **Adlandırma standardı** — `Departman - Konu - Sıklık` gibi bir kural, 300 rapor arasında aramayı mümkün kılar.",
              "**Governance — stopping report sprawl:**\n\nEvery company lives the same story: 300 reports accumulate in two years, nobody knows which is current, and nobody dares delete any. Four practical measures:\n\n1. **Endorsement labels** — mark a dataset **Certified** or **Promoted** in Power BI. Users can see which to trust.\n2. **Usage metrics** — the Service records usage statistics per report. Archive anything unopened for 90 days.\n3. **Ownership** — every report has an owner, and that name appears on the report. An ownerless report rots quickly.\n4. **A naming standard** — a rule like `Department - Subject - Frequency` makes searching among 300 reports possible.",
            ),
            quiz({
              id: "q1",
              q: [
                "İki analistin aynı rapor üzerinde paralel çalışıp değişiklikleri birleştirebilmesi için ne gerekir?",
                "What is needed for two analysts to work on the same report in parallel and merge their changes?",
              ],
              options: [
                [
                  "Raporu PBIP biçiminde kaydedip Git ile sürümlemek",
                  "Save the report in PBIP format and version it with Git",
                ],
                ["`.pbix` dosyasını OneDrive'a koymak", "Put the `.pbix` on OneDrive"],
                ["Sırayla çalışmak", "Take turns"],
                ["Power BI bunu desteklemez", "Power BI does not support this"],
              ],
              answer: 0,
              explain: [
                "İkili `.pbix` birleştirilemez; OneDrive yalnızca sürüm geçmişi tutar ve çakışmada birinin işini kaybettirir. PBIP biçimi raporu metin dosyalarına açtığı için Git'in normal dallanma ve birleştirme akışı çalışır.",
                "A binary `.pbix` cannot be merged; OneDrive only keeps version history and, on a conflict, loses someone's work. The PBIP format unpacks the report into text files, so Git's normal branch-and-merge flow works.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
