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
            quiz({
              id: "q2",
              q: [
                "Power BI Desktop'ın temel işlevi nedir?",
                "What is Power BI Desktop's core role?",
              ],
              options: [
                [
                  "Veriyi bağlamak, modeli kurmak ve raporu tasarlamak — işin çoğu burada yapılır",
                  "Connecting data, building the model and designing the report — most of the work happens here",
                ],
                ["Yalnızca yayınlanmış raporları görüntülemek", "Only viewing published reports"],
                [
                  "Şirket içi veritabanına bulut erişimi sağlamak",
                  "Providing cloud access to an on-premise database",
                ],
                ["Raporu telefonda göstermek", "Showing the report on a phone"],
              ],
              answer: 0,
              explain: [
                "Desktop, verinin bağlandığı, modelin kurulduğu ve raporun tasarlandığı yerdir — işin yaklaşık %90'ı burada geçer. Görüntüleme Mobile'ın, bulut erişimi Gateway'in işidir.",
                "Desktop is where data gets connected, the model gets built and the report gets designed — roughly 90% of the work happens here. Viewing is Mobile's job, cloud access is Gateway's job.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Power BI'ın hangi parçası lisans gerektirir?",
                "Which piece of Power BI requires a licence?",
              ],
              options: [
                [
                  "Power BI Service — raporu yayınlamak ve paylaşmak için",
                  "Power BI Service — to publish and share reports",
                ],
                ["Power BI Desktop — rapor tasarlamak için", "Power BI Desktop — to design reports"],
                ["Gateway — kurulum için", "Gateway — to install it"],
                ["Hiçbiri lisans gerektirmez", "None of them require a licence"],
              ],
              answer: 0,
              explain: [
                "Desktop ücretsizdir; raporu yayınlayıp paylaşmak istediğinde bulut tarafı olan Service devreye girer ve bu lisans ister. Gateway'in kendisi bir bağlantı hizmetidir, ayrı bir lisans şartı değildir.",
                "Desktop is free; once you want to publish and share a report, the cloud-side Service takes over and that requires a licence. Gateway itself is a connectivity service, not a separate licence requirement.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Bir saha ekibi, yayınlanmış satış raporunu telefondan kontrol etmek istiyor. Hangi parça kullanılır?",
                "A field team wants to check a published sales report from their phones. Which piece do they use?",
              ],
              options: [
                ["Power BI Mobile", "Power BI Mobile"],
                ["Power BI Desktop", "Power BI Desktop"],
                ["Gateway", "Gateway"],
                ["Power Query", "Power Query"],
              ],
              answer: 0,
              explain: [
                "Mobile, yayınlanmış raporları telefonda görüntülemek için vardır. Desktop rapor kurmak içindir ve masaüstü uygulamasıdır; Gateway ise bulut-şirket ağı köprüsüdür, kullanıcıya bir arayüz sunmaz.",
                "Mobile exists to view published reports on a phone. Desktop is for building reports and is a desktop app; Gateway is the cloud-to-corporate-network bridge and does not present a user interface.",
              ],
            }),
            text(
              "**Desktop'taki üç görünüm** — sol kenardaki üç simge, işin üç aşamasıdır:\n\n1. **Rapor** — Görselleri yerleştirdiğin tuval. Zamanın çoğu burada geçer gibi görünür ama geçmemeli.\n2. **Veri** — Yüklenen tabloları satır satır gördüğün yer. Kontrol için kullanılır.\n3. **Model** — Tablolar arası ilişkileri kurduğun şema görünümü. **Raporun kaderi burada belirlenir.**\n\nYeni başlayanların en büyük hatası doğrudan Rapor görünümüne atlayıp görsel yerleştirmeye başlamaktır. Model yanlışsa görseller de yanlış sayı gösterir — ve sorunu görselde aramak saatler kaybettirir.",
              "**The three views in Desktop** — the three icons down the left edge are the three stages of the work:\n\n1. **Report** — the canvas where you place visuals. It looks like where most time goes, but it should not be.\n2. **Data** — where you see the loaded tables row by row. Used for checking.\n3. **Model** — the schema view where you define relationships between tables. **This is where a report's fate is decided.**\n\nThe biggest beginner mistake is jumping straight into Report view and placing visuals. If the model is wrong the visuals show wrong numbers — and hunting for the problem in the visual wastes hours.",
            ),
            quiz({
              id: "q5",
              q: [
                "Yüklenen bir tabloyu satır satır kontrol etmek istiyorsun. Hangi görünüme gidersin?",
                "You want to check a loaded table row by row. Which view do you go to?",
              ],
              options: [
                ["Veri görünümü", "Data view"],
                ["Rapor görünümü", "Report view"],
                ["Model görünümü", "Model view"],
                ["Service", "Service"],
              ],
              answer: 0,
              explain: [
                "Veri görünümü, yüklenen tabloları satır satır gösterir ve kontrol için kullanılır. Rapor, görselleri yerleştirdiğin tuvaldir; Model ise tablolar arası ilişkileri kurduğun şema görünümüdür.",
                "Data view shows loaded tables row by row and is used for checking. Report is the canvas where you place visuals; Model is the schema view where you define relationships between tables.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Tablolar arasındaki ilişkileri kurduğun ve raporun kaderinin belirlendiği görünüm hangisidir?",
                "Which view is where you set relationships between tables, and where a report's fate is decided?",
              ],
              options: [
                ["Model görünümü", "Model view"],
                ["Rapor görünümü", "Report view"],
                ["Veri görünümü", "Data view"],
                ["Mobile görünümü", "Mobile view"],
              ],
              answer: 0,
              explain: [
                "Model görünümü şema görünümüdür; ilişkiler burada kurulur. Model yanlışsa Rapor görünümündeki görseller de yanlış sayı gösterir — bu yüzden metin bunu \"raporun kaderi burada belirlenir\" diye tanımlıyor.",
                "Model view is the schema view; relationships are set here. If the model is wrong, visuals in Report view show wrong numbers too — which is why the text calls this \"where a report's fate is decided\".",
              ],
            }),
            quiz({
              id: "q7",
              q: ["Yeni başlayanların en sık yaptığı hata nedir?", "What is the most common beginner mistake?"],
              options: [
                [
                  "Model kurmadan doğrudan Rapor görünümüne geçip görsel yerleştirmeye başlamak",
                  "Skipping the model and jumping straight into Report view to place visuals",
                ],
                ["Veri görünümünde çok zaman geçirmek", "Spending too much time in Data view"],
                ["Raporu yayınlamadan önce test etmek", "Testing the report before publishing"],
                ["Model görünümünde ilişki kurmak", "Setting up relationships in Model view"],
              ],
              answer: 0,
              explain: [
                "Model kurulmadan Rapor görünümüne atlamak, yanlış sayılar gösteren görseller üretir ve sorunu sonradan görselde aramak saatler kaybettirir. Doğru sıra önce Model, sonra Rapordur.",
                "Jumping into Report view before the model is set produces visuals with wrong numbers, and hunting for the problem in the visual afterward wastes hours. The right order is Model first, then Report.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: [
                "Veri kaynağın Azure SQL gibi zaten bulutta ise gateway'e ihtiyacın var mı?",
                "If your data source is already in the cloud, like Azure SQL, do you need a gateway?",
              ],
              options: [
                [
                  "Hayır — gateway yalnızca şirket içi (on-premise) kaynaklar için gerekir",
                  "No — a gateway is only needed for on-premise sources",
                ],
                ["Evet — her zaman gerekir", "Yes — it is always required"],
                ["Yalnızca Mobile kullanılıyorsa gerekir", "Only if Mobile is being used"],
                ["Yalnızca DirectQuery kullanılıyorsa gerekir", "Only if DirectQuery is being used"],
              ],
              answer: 0,
              explain: [
                "Gateway'in tek görevi, bulutun şirket ağının içindeki bir kaynağa ulaşmasını sağlamaktır. Kaynak zaten buluttaysa (Azure SQL, SharePoint gibi) Service ona doğrudan erişebilir, köprüye gerek kalmaz.",
                "A gateway's only job is letting the cloud reach a source inside a corporate network. If the source is already in the cloud (Azure SQL, SharePoint) Service can reach it directly and no bridge is needed.",
              ],
            }),
            quiz({
              id: "q9",
              q: ["Gateway teknik olarak ne yapar?", "What does a gateway technically do?"],
              options: [
                [
                  "Şirket ağında çalışıp bulutla güvenli bir tünel açar",
                  "It runs inside the corporate network and opens a secure tunnel to the cloud",
                ],
                ["Veriyi kalıcı olarak buluta kopyalar", "It permanently copies the data to the cloud"],
                ["Power BI Desktop'ın yerini alır", "It replaces Power BI Desktop"],
                ["Raporu otomatik olarak tasarlar", "It automatically designs the report"],
              ],
              answer: 0,
              explain: [
                "Gateway, şirket ağı içinde çalışan ve bulut tarafındaki Service ile güvenli bir tünel kuran bir hizmettir; veriyi kalıcı olarak kopyalamaz, yalnızca bağlantıyı taşır.",
                "A gateway is a service that runs inside the corporate network and opens a secure tunnel to the cloud-side Service; it does not permanently copy the data, it only carries the connection.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Veri kaynağın hem şirket içi SQL Server hem de bulutta SharePoint ise gateway hangisi için gerekir?",
                "If your sources are both an on-premise SQL Server and cloud SharePoint, which one needs a gateway?",
              ],
              options: [
                [
                  "Yalnızca SQL Server — şirket ağının içinde olduğu için",
                  "Only SQL Server — because it sits inside the corporate network",
                ],
                ["Yalnızca SharePoint", "Only SharePoint"],
                ["İkisi de gerekir", "Both need one"],
                ["Hiçbiri gerekmez", "Neither needs one"],
              ],
              answer: 0,
              explain: [
                "Gateway ihtiyacı kaynağın konumuna bağlıdır, türüne değil. Şirket ağının içindeki SQL Server'a bulutun ulaşması için köprü şarttır; SharePoint zaten bulutta olduğu için Service ona doğrudan bağlanır.",
                "The need for a gateway depends on where the source lives, not its type. Reaching an on-premise SQL Server from the cloud requires the bridge; SharePoint is already in the cloud, so Service connects to it directly.",
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
            quiz({
              id: "q2",
              q: [
                "Bir alanı Değerler kuyusuna sürüklediğinde Power BI arka planda ne yapar?",
                "When you drag a field into the Values well, what does Power BI do behind the scenes?",
              ],
              options: [
                [
                  "Sessizce SUM() uygular — örtük ölçü oluşturur",
                  "It quietly applies SUM() — creating an implicit measure",
                ],
                ["Alanı otomatik olarak sıralar", "It automatically sorts the field"],
                ["Alanı bir dilimleyiciye çevirir", "It turns the field into a slicer"],
                ["Hiçbir şey yapmaz, ham veriyi gösterir", "It does nothing, showing raw data"],
              ],
              answer: 0,
              explain: [
                "Values kuyusuna sürüklenen sayısal bir alan otomatik olarak toplanır (SUM). Buna örtük ölçü denir; kolaydır ama ölçülerin nasıl davrandığını gizlediği için ileride sorun çıkarabilir.",
                "A numeric field dragged into Values is aggregated automatically (SUM). This is called an implicit measure; it is convenient but hides how the aggregation behaves, which can cause trouble later.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Eksen / Kategori kuyusuna genelde ne tür bir alan sürüklenir?",
                "What kind of field usually goes into the Axis / Category well?",
              ],
              options: [
                ["Metin veya tarih — neye göre böleceğin", "Text or a date — what you slice by"],
                ["Yalnızca sayısal ölçüler", "Only numeric measures"],
                ["Yalnızca renk kodları", "Only colour codes"],
                ["Yalnızca araç ipucu metinleri", "Only tooltip text"],
              ],
              answer: 0,
              explain: [
                "Eksen/Kategori, veriyi neye göre böleceğini belirler — şehir, ay, kategori gibi genelde metin veya tarih alanlarıdır. Sayısal ölçüler Değerler kuyusuna gider.",
                "Axis/Category decides what you slice the data by — usually text or date fields like city, month or category. Numeric measures go into the Values well.",
              ],
            }),
            quiz({
              id: "q4",
              q: ["Açıklama / Renk (Legend) kuyusu ne işe yarar?", "What is the Legend / Colour well for?"],
              options: [
                [
                  "İkinci bir kırılım eklemek — segment, durum gibi",
                  "Adding a second breakdown — like segment or status",
                ],
                [
                  "Görseli tamamen renklendirmek dışında hiçbir işlevi yok",
                  "It has no function beyond colouring the visual",
                ],
                ["Verinin toplamını hesaplamak", "Calculating the data's total"],
                ["Araç ipucunu gizlemek", "Hiding the tooltip"],
              ],
              answer: 0,
              explain: [
                "Legend, ana kategoriye ek olarak ikinci bir kırılım getirir — örneğin şehre göre bölünmüş bir grafiği ayrıca duruma göre de ayırabilirsin. Bu, tek boyutlu bir görseli iki boyutlu hale getirir.",
                "Legend adds a second breakdown on top of the main category — for example splitting a chart by city and then further by status. It turns a one-dimensional visual into a two-dimensional one.",
              ],
            }),
            text(
              "**Hangi görsel ne zaman?** Bu, öğrenilecek en kârlı kurallardan biridir:\n\n- **Sütun grafiği** — Kategorileri karşılaştırmak. En güvenli varsayılan.\n- **Çubuk grafiği** — Kategori adları uzunsa (şehir, ürün adı) yatay olan okunur.\n- **Çizgi grafiği** — **Yalnızca** zaman içindeki değişim için.\n- **Kart** — Tek bir önemli sayı: toplam ciro, aktif müşteri.\n- **Tablo / Matris** — Kesin sayıların okunması gerektiğinde.\n- **Harita** — Coğrafi desen gerçekten önemliyse.\n- **Pasta grafiği** — Nadiren. İkiden fazla dilim varsa sütun grafiği her zaman daha okunurdur.",
              "**Which visual, when?** This is one of the highest-return rules to learn:\n\n- **Column chart** — comparing categories. The safest default.\n- **Bar chart** — when category names are long (city, product name), horizontal reads better.\n- **Line chart** — **only** for change over time.\n- **Card** — a single important number: total revenue, active customers.\n- **Table / Matrix** — when exact numbers must be read.\n- **Map** — when the geographic pattern genuinely matters.\n- **Pie chart** — rarely. With more than two slices a column chart is always more readable.",
            ),
            quiz({
              id: "q5",
              q: [
                "Şehir adları gibi uzun kategori isimlerini karşılaştırırken hangi görsel daha okunur?",
                "When comparing categories with long names like city names, which visual reads better?",
              ],
              options: [
                [
                  "Çubuk grafiği — yatay olduğu için uzun isimler sığar",
                  "Bar chart — being horizontal, it fits long names",
                ],
                ["Çizgi grafiği", "Line chart"],
                ["Pasta grafiği", "Pie chart"],
                ["Kart", "Card"],
              ],
              answer: 0,
              explain: [
                "Sütun grafiğinde uzun kategori isimleri eksende sıkışır veya döner; çubuk grafiği yatay olduğu için isimler soldan itibaren rahatça okunur.",
                "In a column chart, long category names get cramped or rotated on the axis; a bar chart is horizontal, so names read comfortably from the left.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Toplam ciro gibi tek bir önemli sayıyı göstermek için en doğru görsel hangisidir?",
                "What is the right visual for showing a single important number, like total revenue?",
              ],
              options: [
                ["Kart", "Card"],
                ["Çizgi grafiği", "Line chart"],
                ["Harita", "Map"],
                ["Matris", "Matrix"],
              ],
              answer: 0,
              explain: [
                "Kart, tek bir sayıyı büyük ve net gösterir — toplam ciro, aktif müşteri gibi özet değerler için idealdir. Diğer görseller karşılaştırma veya dağılım göstermek içindir, tek sayı için gereksiz karmaşıklık katar.",
                "A card shows a single number large and clear — ideal for headline values like total revenue or active customers. Other visuals exist to show comparison or distribution, and would add unnecessary complexity for a single number.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "İkiden fazla dilimi olan bir pasta grafiğinin yerine metin ne öneriyor, ve neden?",
                "What does the text recommend instead of a pie chart with more than two slices, and why?",
              ],
              options: [
                ["Sütun grafiği — daha okunur olduğu için", "A column chart — because it is more readable"],
                ["Harita — coğrafi olduğu için", "A map — because it is geographic"],
                ["Kart — tek sayı olduğu için", "A card — because it is a single number"],
                ["Pasta grafiği zaten en iyisidir", "A pie chart is already the best option"],
              ],
              answer: 0,
              explain: [
                "Metne göre pasta grafiği nadiren kullanılmalı; ikiden fazla dilim varsa sütun grafiği her zaman daha okunurdur çünkü açıları karşılaştırmak, çubuk yüksekliklerini karşılaştırmaktan gözle daha zordur.",
                "Per the text, pie charts should be used rarely; with more than two slices a column chart is always more readable because comparing angles by eye is harder than comparing bar heights.",
              ],
            }),
            pitfall(
              "Görsel sayısını sınırla",
              "Limit the number of visuals",
              "Bir sayfaya 15 görsel koymak raporu \"zengin\" yapmaz; **okunmaz** yapar. Ayrıca her görsel ayrı bir sorgu çalıştırır, yani rapor da yavaşlar.\n\nPratik kural: **bir sayfa, bir soru.** Sayfanın en üstünde 3-4 kart (özet sayılar), altında 2-3 detay görseli yeterlidir. Kullanıcı daha derine inmek isterse ayrı bir sayfaya veya detaya git (drill-through) özelliğine yönlendir.",
              "Putting 15 visuals on a page does not make a report \"rich\"; it makes it **unreadable**. Each visual also fires its own query, so the report gets slower.\n\nA practical rule: **one page, one question.** Three or four cards across the top (headline numbers) and two or three detail visuals below is enough. If a user wants to go deeper, send them to a separate page or a drill-through.",
            ),
            quiz({
              id: "q8",
              q: [
                "Bir sayfaya 15 görsel koymanın iki sorunu nedir?",
                "What are the two problems with putting 15 visuals on one page?",
              ],
              options: [
                [
                  "Rapor okunmaz hale gelir ve her görsel ayrı sorgu çalıştırdığı için yavaşlar",
                  "The report becomes unreadable, and it slows down because each visual fires its own query",
                ],
                [
                  "Yalnızca estetik bir sorundur, performansı etkilemez",
                  "It is purely an aesthetic issue and does not affect performance",
                ],
                [
                  "Yalnızca yavaşlatır, okunabilirliği etkilemez",
                  "It only slows things down, readability is unaffected",
                ],
                ["Hiçbir sorun yaratmaz", "It causes no problems at all"],
              ],
              answer: 0,
              explain: [
                "Metin iki ayrı etkiyi vurguluyor: çok görsel hem sayfayı görsel olarak okunmaz kılar hem de her görsel kendi sorgusunu çalıştırdığı için raporu teknik olarak yavaşlatır.",
                "The text highlights two separate effects: too many visuals both make the page visually unreadable and technically slow the report down, since each visual fires its own query.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "\"Bir sayfa, bir soru\" pratik kuralına göre önerilen düzen nedir?",
                "Per the \"one page, one question\" rule of thumb, what layout is recommended?",
              ],
              options: [
                [
                  "Üstte 3-4 özet kart, altında 2-3 detay görseli",
                  "Three or four summary cards at the top, two or three detail visuals below",
                ],
                ["Sayfa başına en az 10 görsel", "At least 10 visuals per page"],
                ["Yalnızca tek bir kart, başka hiçbir şey yok", "Just a single card and nothing else"],
                ["Tüm görselleri tek bir matrise sığdırmak", "Fitting all visuals into a single matrix"],
              ],
              answer: 0,
              explain: [
                "Kural, sayfanın en üstünde özet sayıları veren 3-4 kart, altında ise 2-3 detay görseli önerir. Daha derine inme ihtiyacı ayrı bir sayfaya veya drill-through'a yönlendirilir.",
                "The rule suggests three or four cards giving headline numbers at the top of the page, with two or three detail visuals below. Any need to go deeper is routed to a separate page or a drill-through.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "Aylık ciro trendini gösteren bir çizgi grafiğine, karşılaştırma amacıyla sütun grafiği de eklenebilir mi?",
                "Can a column chart also be added alongside a line chart showing the monthly revenue trend, for comparison?",
              ],
              options: [
                [
                  "Evet, sütun da kullanılabilir ama trendi okumak çizgiye göre daha zordur",
                  "Yes, a column chart also works, but reading the trend is harder than with a line",
                ],
                [
                  "Hayır, sütun grafiği zaman verisiyle asla kullanılamaz",
                  "No, a column chart can never be used with time data",
                ],
                [
                  "Hayır, yalnızca pasta grafiği zaman verisiyle uyumludur",
                  "No, only a pie chart works with time data",
                ],
                [
                  "Sütun grafiği zaman verisinde çizgiden daha iyi okunur",
                  "A column chart reads better than a line chart for time data",
                ],
              ],
              answer: 0,
              explain: [
                "Metin, sütun grafiğinin de kullanılabileceğini ama trendi okumanın zorlaştığını belirtiyor — çizginin noktaları birleştirmesi \"bu değerler birbirini takip ediyor\" mesajını doğrudan verirken sütunlarda bu bağlantı gözle kurulmalıdır.",
                "The text notes a column chart also works but makes the trend harder to read — a line directly conveys \"these values follow one another\" by connecting the points, while with columns that connection must be inferred by eye.",
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
            quiz({
              id: "q2",
              q: ["Import modunda veri nerede saklanır?", "In Import mode, where is the data stored?"],
              options: [
                [
                  "Power BI dosyasının içinde, sıkıştırılmış olarak kopyalanır",
                  "Inside the Power BI file, copied and compressed",
                ],
                [
                  "Yalnızca kaynak sunucuda kalır, hiç kopyalanmaz",
                  "It stays only on the source server, never copied",
                ],
                ["Bulutta ayrı bir veritabanında", "In a separate cloud database"],
                ["Yalnızca önbellekte, geçici olarak", "Only in a temporary cache"],
              ],
              answer: 0,
              explain: [
                "Import modu veriyi Power BI dosyasının içine kopyalar ve sıkıştırır; bu yüzden tüm hesaplar bellekte, hızlıca yapılır. DirectQuery'de ise veri hiç kopyalanmaz, her görsel kaynağa gider.",
                "Import mode copies and compresses the data into the Power BI file itself, so all calculations happen quickly in memory. In DirectQuery nothing is copied — every visual queries the source directly.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "DirectQuery'nin Import'a göre en büyük dezavantajı nedir?",
                "What is DirectQuery's biggest disadvantage compared to Import?",
              ],
              options: [
                ["Yavaştır — her tıklama kaynağa yük bindirir", "It is slow — every click loads the source"],
                ["Boyut sınırı vardır", "It has a size limit"],
                ["Veri asla güncel olmaz", "The data is never current"],
                ["DAX kullanılamaz", "DAX cannot be used at all"],
              ],
              answer: 0,
              explain: [
                "DirectQuery her görselde kaynağa canlı sorgu attığı için yavaştır ve kaynağa yük bindirir. Boyut sınırı olmaması ve güncellik aslında DirectQuery'nin avantajlarıdır; DAX tamamen kullanılamaz değildir, yalnızca bazı fonksiyonlar çalışmaz.",
                "DirectQuery is slow because every visual sends a live query to the source, loading it. No size limit and freshness are actually DirectQuery's advantages; DAX is not entirely unusable, only some functions do not work.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Import modunun Pro lisansındaki boyut sınırı ne anlama gelir?",
                "What does Import mode's size limit on a Pro licence mean?",
              ],
              options: [
                [
                  "Sıkıştırılmış model 1 GB'ı geçerse Import ile bu veri modele sığmayabilir",
                  "If the compressed model exceeds 1 GB, that data may not fit in an Import model",
                ],
                ["Hiçbir sınır yoktur", "There is no limit at all"],
                ["Yalnızca DirectQuery'de sınır vardır", "Only DirectQuery has a limit"],
                ["Sınır yalnızca görsellerin sayısını kısıtlar", "The limit only restricts the number of visuals"],
              ],
              answer: 0,
              explain: [
                "Import modunda dosya boyutu Pro lisansta 1 GB ile sınırlıdır; çok büyük veri setleri bu sınıra takılabilir ve bu durumda DirectQuery veya Premium lisans gündeme gelir.",
                "Import mode's file size on a Pro licence is capped at 1 GB; very large datasets can hit this limit, at which point DirectQuery or a Premium licence becomes relevant.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "DirectQuery'de bazı DAX fonksiyonlarının çalışmamasının pratik sonucu nedir?",
                "What is the practical consequence of some DAX functions not working in DirectQuery?",
              ],
              options: [
                [
                  "Import'ta yazabileceğin bazı ölçüleri DirectQuery'de yazamayabilirsin",
                  "Some measures you could write in Import may not be writable in DirectQuery",
                ],
                ["Hiçbir sonucu yoktur, fark etmez", "It has no consequence, it makes no difference"],
                ["Yalnızca görsel seçimini etkiler", "It only affects which visuals you can pick"],
                ["Yalnızca tarih tablosunu etkiler", "It only affects the date table"],
              ],
              answer: 0,
              explain: [
                "Import modunda DAX'ın tüm özellikleri çalışırken DirectQuery'de bazı fonksiyonlar (özellikle karmaşık zaman zekâsı gibi) desteklenmez veya performans sorunu yaratır — bu, model tasarımını doğrudan etkiler.",
                "While Import supports every DAX feature, DirectQuery does not support (or performs poorly with) some functions, especially complex time-intelligence ones — this directly constrains model design.",
              ],
            }),
            tip(
              "Şüphedeysen Import seç",
              "When in doubt, choose Import",
              "Gerçek projelerin büyük çoğunluğu Import ile çalışır ve çalışmalıdır. DirectQuery yalnızca iki durumda haklıdır: **veri gerçekten çok büyükse** (belleğe sığmıyorsa) veya **saniyelik güncellik gerçekten gerekiyorsa** (canlı operasyon panosu gibi).\n\n\"Veri her zaman güncel olsun\" isteği çoğu zaman gerçek bir ihtiyaç değildir. Yöneticiye sor: \"dünkü veriyle karar verebilir misin?\" Cevap genellikle evettir — ve o zaman Import, hem çok daha hızlı hem çok daha az sorunlu bir rapor demektir.\n\nOrta yol: **Composite model** — büyük olgu tablosu DirectQuery, küçük boyut tabloları Import.",
              "The overwhelming majority of real projects run on Import, and should. DirectQuery is justified in only two cases: the **data is genuinely huge** (it will not fit in memory) or **second-by-second freshness is genuinely required** (a live operations dashboard).\n\nThe request \"the data must always be current\" is usually not a real requirement. Ask the executive: \"can you decide on yesterday's data?\" The answer is normally yes — and then Import gives you a far faster and far less troublesome report.\n\nA middle path: a **composite model** — the large fact table on DirectQuery, the small dimension tables on Import.",
            ),
            quiz({
              id: "q6",
              q: [
                "DirectQuery'nin gerçekten haklı olduğu iki durum nedir?",
                "What are the two situations where DirectQuery is genuinely justified?",
              ],
              options: [
                [
                  "Veri gerçekten çok büyükse veya saniyelik güncellik gerçekten gerekiyorsa",
                  "When the data is genuinely huge, or second-by-second freshness is genuinely required",
                ],
                ["Rapor küçükse ve az kullanılıyorsa", "When the report is small and rarely used"],
                ["Yalnızca kullanıcı sayısı azsa", "Only when the number of users is small"],
                ["Her zaman haklıdır, varsayılan seçim olmalı", "It is always justified and should be the default choice"],
              ],
              answer: 0,
              explain: [
                "Metin, gerçek projelerin çoğunun Import ile çalışması gerektiğini, DirectQuery'nin yalnızca veri belleğe sığmayacak kadar büyükse veya canlı operasyon panosu gibi saniyelik güncellik gerçekten gerekiyorsa haklı olduğunu söylüyor.",
                "The text says most real projects should run on Import, and DirectQuery is justified only when the data will not fit in memory, or second-by-second freshness is genuinely needed, like a live operations dashboard.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "\"Veri her zaman güncel olsun\" isteği hakkında metin ne diyor?",
                "What does the text say about the request \"the data must always be current\"?",
              ],
              options: [
                [
                  "Çoğu zaman gerçek bir ihtiyaç değildir; dünkü veriyle karar verilebilir",
                  "It is usually not a real requirement; decisions can often be made on yesterday's data",
                ],
                [
                  "Her zaman haklı bir taleptir, DirectQuery şart olur",
                  "It is always a valid demand, making DirectQuery mandatory",
                ],
                ["Yalnızca finans raporlarında geçerlidir", "It only applies to financial reports"],
                ["Import bu isteği hiç karşılayamaz", "Import can never satisfy this request"],
              ],
              answer: 0,
              explain: [
                "Metne göre bu istek çoğu zaman gerçek bir ihtiyaç değildir; yöneticiye \"dünkü veriyle karar verebilir misin?\" diye sorulduğunda cevap genellikle evettir, ve o zaman Import daha hızlı ve daha az sorunlu bir seçenektir.",
                "Per the text this request is usually not a real requirement; asked \"can you decide on yesterday's data?\", the answer is normally yes — and then Import is the faster, less troublesome option.",
              ],
            }),
            quiz({
              id: "q8",
              q: ["Composite model nedir?", "What is a composite model?"],
              options: [
                [
                  "Büyük olgu tablosunun DirectQuery, küçük boyut tablolarının Import olduğu orta yol",
                  "A middle path where the large fact table uses DirectQuery and the small dimension tables use Import",
                ],
                [
                  "İki ayrı .pbix dosyasının birleştirilmesi",
                  "The merging of two separate .pbix files",
                ],
                ["Yalnızca DirectQuery kullanan bir model türü", "A model type that only uses DirectQuery"],
                ["Power Query'de kullanılan bir birleştirme adımı", "A merge step used in Power Query"],
              ],
              answer: 0,
              explain: [
                "Composite model, olgu tablosu gibi büyük ve sık değişen tabloyu DirectQuery'de tutup, boyut tabloları gibi küçük ve nadiren değişen tabloları Import'ta tutarak iki modun avantajını birleştirir.",
                "A composite model combines the advantages of both modes by keeping a large, frequently changing table like the fact table on DirectQuery, while small, rarely changing dimension tables stay on Import.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "Aynı senaryoda (günlük satış, gecelik güncelleme, 5 milyon satır) veri 500 milyon satıra çıksaydı ne değişirdi?",
                "In the same scenario (daily sales, overnight refresh, 5 million rows) if the data grew to 500 million rows, what would change?",
              ],
              options: [
                [
                  "Bellek sınırına yaklaşılabilir; DirectQuery veya composite model değerlendirilmeye başlanır",
                  "It could approach the memory limit; DirectQuery or a composite model starts to become worth considering",
                ],
                ["Hiçbir şey değişmez, Import her zaman en iyisidir", "Nothing changes, Import is always the best choice"],
                ["Otomatik olarak DirectQuery'e geçilir", "It automatically switches to DirectQuery"],
                ["Gateway kurulması gerekir", "A gateway becomes necessary"],
              ],
              answer: 0,
              explain: [
                "Import'un sınırı büyüklüktür — veri belleğe sığmayacak kadar büyüdüğünde metnin belirttiği \"veri gerçekten çok büyükse\" koşulu devreye girer ve DirectQuery veya composite model gündeme gelir.",
                "Import's limit is size — once data grows too large to fit in memory, the text's \"data is genuinely huge\" condition kicks in and DirectQuery or a composite model becomes worth considering.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Aynı senaryoda güncelleme sıklığı gecelikten \"her 5 dakikada bir\" değişse, karar nasıl etkilenirdi?",
                "If the refresh cadence in the same scenario changed from overnight to \"every 5 minutes\", how would the decision be affected?",
              ],
              options: [
                [
                  "Import hâlâ uygun olabilir — zamanlanmış yenileme sık aralıklarla da kurulabilir; saniyelik canlılık hâlâ gerekmiyor",
                  "Import could still be fine — scheduled refresh can be set at short intervals too; second-by-second freshness still isn't required",
                ],
                ["Bu durumda kesinlikle DirectQuery gerekir", "This would definitely require DirectQuery"],
                ["Gateway artık gereksiz olur", "A gateway would no longer be needed"],
                ["Veri boyutu otomatik olarak küçülür", "The data size automatically shrinks"],
              ],
              answer: 0,
              explain: [
                "Zamanlanmış yenileme Import'ta da sık aralıklarla kurulabilir (dakikalar seviyesinde). DirectQuery'nin gerekçesi saniyelik/canlı güncellik ihtiyacıdır — 5 dakikalık bir yenileme bu eşiğin altında kalır.",
                "Scheduled refresh can be set at short intervals even in Import (down to a few minutes). DirectQuery's justification is second-by-second, truly live freshness — a 5-minute refresh stays well below that threshold.",
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
            quiz({
              id: "q2",
              q: [
                "Power Query'de bir adım kaydedildikten sonra ne olur?",
                "After a step is recorded in Power Query, what happens?",
              ],
              options: [
                [
                  "Bir tarif gibi saklanır ve sonraki her yenilemede otomatik tekrarlanır",
                  "It is stored like a recipe and automatically replayed on every subsequent refresh",
                ],
                [
                  "Yalnızca o oturumda geçerlidir, kapatınca kaybolur",
                  "It only applies to that session and is lost when you close the file",
                ],
                ["Elle her seferinde tekrar uygulanması gerekir", "It must be manually reapplied every time"],
                ["Yalnızca ilk yüklemede bir kez çalışır", "It only runs once, at the first load"],
              ],
              answer: 0,
              explain: [
                "Power Query'nin gücü tam olarak buradan gelir: adımlar bir tarif olarak saklanır ve yeni veri geldiğinde otomatik olarak sırayla tekrar uygulanır — Excel'de elle yapılan temizliğin aksine.",
                "This is exactly where Power Query's power comes from: steps are stored as a recipe and automatically replayed in order whenever new data arrives — unlike manual cleanup in Excel.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Power Query'de yapılan temizliğin Excel'de elle yapılan temizlikten farkı nedir?",
                "How does cleaning in Power Query differ from manual cleanup in Excel?",
              ],
              options: [
                [
                  "Power Query'deki iş tekrarlanabilir; Excel'de elle yapılan iş yeni veri geldiğinde boşa gider",
                  "Power Query's work is repeatable; manual work in Excel is thrown away when new data arrives",
                ],
                ["İkisi de birebir aynıdır, fark yoktur", "They are identical, there is no difference"],
                ["Excel'de yapılan temizlik daha hızlıdır", "Cleanup done in Excel is faster"],
                ["Power Query yalnızca sayısal sütunlarda çalışır", "Power Query only works on numeric columns"],
              ],
              answer: 0,
              explain: [
                "Excel'de elle yapılan temizlik her yeni dosya için baştan tekrarlanmalıdır. Power Query'de adımlar kaydedildiği için yeni ay verisi geldiğinde tek tıkla aynı temizlik tekrar uygulanır — hiçbir iş boşa gitmez.",
                "Manual cleanup in Excel must be redone from scratch for every new file. Because Power Query records its steps, next month's data gets the same cleaning with one click — nothing is wasted.",
              ],
            }),
            text(
              "En sık kullanılan adımlar:\n\n- **Promote Headers** — ilk satırı başlık yap\n- **Change Type** — özellikle tarih ve ondalık sayı; yerel ayarı (Locale) doğru seç\n- **Remove Columns** — kullanmayacağın sütunu modele hiç sokma\n- **Unpivot Columns** — geniş tabloyu uzun tabloya çevirir; Power BI uzun tabloyu sever\n- **Merge / Append Queries** — birleştir / alt alta ekle\n- **Group By** — kaynakta özetle, modele küçük gelsin",
              "The steps you will use most:\n\n- **Promote Headers** — turn the first row into headers\n- **Change Type** — especially dates and decimals; pick the right Locale\n- **Remove Columns** — never let an unused column into the model\n- **Unpivot Columns** — turns a wide table into a long one, which Power BI prefers\n- **Merge / Append Queries** — join / stack\n- **Group By** — summarise at the source so the model stays small",
            ),
            quiz({
              id: "q4",
              q: [
                "Geniş bir tabloyu (aylar sütun olarak) uzun tabloya çeviren adım hangisidir?",
                "Which step turns a wide table (months as columns) into a long table?",
              ],
              options: [
                ["Unpivot Columns", "Unpivot Columns"],
                ["Promote Headers", "Promote Headers"],
                ["Group By", "Group By"],
                ["Remove Columns", "Remove Columns"],
              ],
              answer: 0,
              explain: [
                "Unpivot Columns, sütun halindeki tekrarlayan kategorileri (Ocak, Şubat...) tek bir sütuna çevirip yanına değer sütunu ekler. Power BI bu uzun formatı geniş formata tercih eder.",
                "Unpivot Columns turns repeating column categories (Jan, Feb…) into a single column with a paired value column. Power BI prefers this long format over a wide one.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Tarih ve ondalık sayı sütunlarında \"Change Type\" adımında nelere dikkat edilmeli?",
                "In the \"Change Type\" step for date and decimal columns, what should you watch for?",
              ],
              options: [
                ["Yerel ayarın (Locale) doğru seçilmesi", "That the Locale is set correctly"],
                ["Sütun adının İngilizce olması", "That the column name is in English"],
                ["Sütunun renklendirilmesi", "That the column is colour-coded"],
                [
                  "Hiçbir şeye dikkat edilmemesi, otomatik doğru algılanır",
                  "Nothing — it is always detected correctly automatically",
                ],
              ],
              answer: 0,
              explain: [
                "Tarih ve ondalık formatları ülkeye göre değişir (gün/ay sırası, ondalık ayracı virgül mü nokta mı). Yanlış Locale seçimi tarihleri veya sayıları hatalı yorumlayıp sessizce yanlış veri üretebilir.",
                "Date and decimal formats vary by region (day/month order, comma vs. period as decimal separator). Picking the wrong Locale can silently misinterpret dates or numbers and produce wrong data.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Kullanmayacağın bir sütunu Power Query'de \"Remove Columns\" ile silmenin faydası nedir?",
                "What is the benefit of deleting an unused column with \"Remove Columns\" in Power Query?",
              ],
              options: [
                [
                  "O sütun modele hiç girmez, gereksiz yer kaplamaz",
                  "That column never enters the model, so it wastes no space",
                ],
                [
                  "Yalnızca görünümü sadeleştirir, modele etkisi yoktur",
                  "It only simplifies the view, with no effect on the model",
                ],
                ["Veri tipini otomatik düzeltir", "It automatically fixes the data type"],
                ["Sütunu gizler ama hâlâ modele yüklenir", "It hides the column but still loads it into the model"],
              ],
              answer: 0,
              explain: [
                "Power Query'de silinen bir sütun modele hiç girmez; bu, sonraki bir kademede göreceğin \"modeli küçültme\" pratiğinin ilk ve en kolay adımıdır.",
                "A column deleted in Power Query never enters the model at all; this is the first and easiest step of the \"shrink the model\" practice you will see at a later stage.",
              ],
            }),
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
              id: "q7",
              q: [
                "Aylar sütun olarak gelen bir tablo (Ocak, Şubat, Mart…) Power BI'da neden sorun çıkarır?",
                "Why does a table with months as columns (Jan, Feb, Mar…) cause trouble in Power BI?",
              ],
              options: [
                [
                  "Her yeni ay geldiğinde modelin yeniden düzenlenmesi gerekir",
                  "Every new month requires the model to be reworked",
                ],
                ["Power BI böyle bir tabloyu hiç yükleyemez", "Power BI cannot load such a table at all"],
                [
                  "Yalnızca görsel olarak çirkin durur, teknik bir sorun yoktur",
                  "It is only visually ugly, with no technical issue",
                ],
                ["DAX ile hiç çalışılamaz", "DAX cannot be used with it at all"],
              ],
              answer: 0,
              explain: [
                "Aylar ayrı sütun olduğunda her yeni ay yeni bir sütun demektir ve model her seferinde elle güncellenmelidir. Unpivot ile Ay ve Değer diye iki sütuna çevrildiğinde yeni bir ay sadece yeni satırlar demektir, model hiç değişmez.",
                "When months are separate columns, every new month means a new column and the model must be manually reworked each time. Unpivoted into Month and Value columns, a new month just means new rows — the model never needs to change.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Unpivot Columns uyguladıktan sonra kaç sütun elde edersin ve bunlar nedir?",
                "After applying Unpivot Columns, how many columns do you end up with, and what are they?",
              ],
              options: [
                ["İki sütun: Ay ve Değer", "Two columns: Month and Value"],
                ["Aynı sayıda sütun, sadece isimleri değişir", "The same number of columns, only the names change"],
                ["Tek bir sütun, her şey birleşir", "A single column, everything merged together"],
                ["Sütun sayısı ay sayısının iki katına çıkar", "The column count doubles the number of months"],
              ],
              answer: 0,
              explain: [
                "Seçilen ay sütunları (Ocak, Şubat, Mart…) tek bir Ay sütununa ve karşılık gelen değerlerin toplandığı bir Değer sütununa dönüşür — bu iki sütunluk yapı bir daha asla değişmesi gerekmeyen kalıcı bir çözümdür.",
                "The selected month columns (Jan, Feb, Mar…) collapse into a single Month column plus a Value column holding the corresponding values — this two-column shape is a permanent fix that never needs to change again.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "Bir Power Query adımını sildikten sonra bir sonraki yenilemede ne olur?",
                "If you delete a Power Query step, what happens on the next refresh?",
              ],
              options: [
                [
                  "Kalan adımlar sırayla tekrar uygulanır, silinen adımın etkisi artık olmaz",
                  "The remaining steps are reapplied in order, and the deleted step no longer has any effect",
                ],
                ["Yenileme tamamen durur", "Refresh stops working entirely"],
                [
                  "Silinen adım yine de arka planda çalışmaya devam eder",
                  "The deleted step still keeps running in the background",
                ],
                [
                  "Tüm sorgu sıfırlanır ve yeniden kaynağa bağlanman gerekir",
                  "The whole query resets and you must reconnect to the source",
                ],
              ],
              answer: 0,
              explain: [
                "Adımlar sıralı bir tarif olduğu için bir adımı silmek tarifi kısaltır. Bir sonraki yenilemede yalnızca kalan adımlar sırasıyla uygulanır; bu da tekrarlanabilirliğin adımların listesine bağlı olduğunu gösterir.",
                "Since steps form an ordered recipe, deleting one shortens that recipe. On the next refresh only the remaining steps run in sequence — showing that reproducibility depends entirely on the list of steps.",
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
            quiz({
              id: "q2",
              q: [
                "Bir görselde gördüğün sayı aslında neyin kesişimidir?",
                "The number you see in a visual is actually the intersection of what?",
              ],
              options: [
                [
                  "Görsel, sayfa, rapor düzeyi filtreler ve dilimleyicilerin dördü birden",
                  "All four: visual-level, page-level, report-level filters and slicers",
                ],
                ["Yalnızca görsel düzeyi filtre", "Only the visual-level filter"],
                ["Yalnızca dilimleyici seçimi", "Only the slicer selection"],
                ["Yalnızca sayfa düzeyi filtre", "Only the page-level filter"],
              ],
              answer: 0,
              explain: [
                "Dört filtre seviyesi (görsel, sayfa, rapor, dilimleyici) birleşerek uygulanır; gördüğün sayı bunların kesişimidir. Yanlış sayı gördüğünde genelde unutulmuş bir üst seviye filtre vardır.",
                "The four filter levels (visual, page, report, slicer) combine, and what you see is their intersection. A wrong-looking number usually means a forgotten filter at a higher level.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir görselde beklenmedik şekilde düşük bir sayı görüyorsun. İlk bakılacak yer neresi olmalı?",
                "A visual unexpectedly shows a low number. Where should you look first?",
              ],
              options: [
                [
                  "Unutulmuş olabilecek bir rapor düzeyi filtre",
                  "A possibly forgotten report-level filter",
                ],
                ["Power Query adımları", "The Power Query steps"],
                ["Gateway ayarları", "The Gateway settings"],
                ["Görselin rengi", "The visual's colour"],
              ],
              answer: 0,
              explain: [
                "Metin açıkça \"yanlış sayı gördüğünde ilk bakılacak yer budur — genelde unutulmuş bir rapor düzeyi filtresi vardır\" diyor. Dört filtre seviyesi kesiştiği için en görünmeyen (rapor düzeyi) genelde atlanır.",
                "The text explicitly says: \"this is the first place to look when a number looks wrong — usually there is a forgotten report-level filter.\" Since four levels intersect, the least visible one (report level) is the one most often overlooked.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Sayfa düzeyi bir filtre hangi görselleri etkiler?",
                "Which visuals does a page-level filter affect?",
              ],
              options: [
                ["O sayfadaki tüm görseller", "Every visual on that page"],
                ["Yalnızca seçtiğin tek görsel", "Only the single visual you select"],
                ["Raporun tüm sayfaları", "Every page in the report"],
                [
                  "Hiçbir görseli etkilemez, yalnızca gösterge amaçlıdır",
                  "It affects nothing, it is purely indicative",
                ],
              ],
              answer: 0,
              explain: [
                "Dört seviye kapsam bakımından iç içedir: görsel düzeyi tek görseli, sayfa düzeyi o sayfadaki tüm görselleri, rapor düzeyi ise tüm sayfaları etkiler. Dilimleyici ise kullanıcının kendi seçtiği filtredir.",
                "The four levels nest in scope: visual level affects one visual, page level affects every visual on that page, and report level affects every page. Slicers are the filter the user picks themselves.",
              ],
            }),
            text(
              "**Etkileşimi kontrol etmek:** Bir görseli seç → Biçim sekmesi → **Etkileşimleri Düzenle**. Her diğer görselin üstünde üç simge belirir:\n\n- **Filtre** — Seçime göre süzülür (varsayılan)\n- **Vurgu** — Seçim vurgulanır, gerisi soluk kalır. Bütün içindeki payı görmek için idealdir.\n- **Yok** — Etkilenmez. Toplam gösteren kartlar için genelde bu istenir; kullanıcı bir şehre tıklasa bile \"toplam ciro\" kartının değişmemesini isteyebilirsin.\n\n**Dilimleyici türleri:** liste, açılır menü, tarih aralığı, sayı aralığı ve **hiyerarşik dilimleyici** (ülke → şehir). Az yer kaplaması için açılır menü tercih edilir.",
              "**Controlling interactions:** select a visual → Format tab → **Edit Interactions**. Three icons appear above every other visual:\n\n- **Filter** — filters to the selection (the default)\n- **Highlight** — highlights the selection and dims the rest. Ideal for seeing a share of the whole.\n- **None** — unaffected. This is usually what you want for cards showing totals; even when the user clicks a city you may want the \"total revenue\" card to stay put.\n\n**Slicer types:** list, dropdown, date range, numeric range and **hierarchy slicer** (country → city). Dropdowns are preferred to save space.",
            ),
            quiz({
              id: "q5",
              q: [
                "Etkileşimi \"Vurgu\" (Highlight) yapmanın \"Filtre\"den farkı nedir?",
                "How does setting an interaction to \"Highlight\" differ from \"Filter\"?",
              ],
              options: [
                [
                  "Seçim vurgulanır, geri kalan veri soluk olarak görünür durur — bütündeki payı görmeyi sağlar",
                  "The selection is highlighted while the rest stays visible but dimmed — letting you see its share of the whole",
                ],
                ["Diğer görsel tamamen kaybolur", "The other visual disappears entirely"],
                ["İkisi tamamen aynı sonucu verir", "They both produce exactly the same result"],
                ["Vurgu yalnızca kartlarda çalışır", "Highlight only works on cards"],
              ],
              answer: 0,
              explain: [
                "Filtre modunda görsel yalnızca seçilen veriyi gösterir, geri kalanı tamamen kaybolur. Vurgu modunda ise tüm veri görünür kalır ama seçim öne çıkar — bu, seçimin bütün içindeki payını görmek için idealdir.",
                "In Filter mode a visual shows only the selected data and the rest disappears entirely. In Highlight mode all the data stays visible but the selection stands out — ideal for seeing the selection's share of the whole.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Az yer kaplaması istenen bir dilimleyici için hangi tür tercih edilir?",
                "Which slicer type is preferred when space is limited?",
              ],
              options: [
                ["Açılır menü (dropdown)", "Dropdown"],
                ["Liste", "List"],
                ["Tarih aralığı", "Date range"],
                ["Hiyerarşik dilimleyici", "Hierarchy slicer"],
              ],
              answer: 0,
              explain: [
                "Metin, az yer kaplaması için açılır menünün tercih edildiğini belirtiyor — liste türü tüm seçenekleri her zaman açık tutar ve daha fazla dikey alan kaplar.",
                "The text states dropdown is preferred to save space — a list keeps every option visible at all times and takes up more vertical room.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Ülke → şehir gibi iç içe geçmiş bir seçim için hangi dilimleyici türü kullanılır?",
                "Which slicer type is used for a nested selection like country → city?",
              ],
              options: [
                ["Hiyerarşik dilimleyici", "Hierarchy slicer"],
                ["Sayı aralığı", "Numeric range"],
                ["Tarih aralığı", "Date range"],
                ["Basit liste", "A plain list"],
              ],
              answer: 0,
              explain: [
                "Hiyerarşik dilimleyici, ülke → şehir gibi iç içe geçmiş seviyeleri tek bir dilimleyicide sunar; kullanıcı önce ülkeyi daraltır, sonra şehri seçer.",
                "A hierarchy slicer presents nested levels like country → city in a single slicer; the user narrows by country first, then picks a city.",
              ],
            }),
            tip(
              "Dilimleyici senkronizasyonu",
              "Syncing slicers",
              "Çok sayfalı bir raporda kullanıcı her sayfada tarih filtresini yeniden seçmek zorunda kalmamalı. **Görünüm → Dilimleyicileri Senkronize Et** panelinden bir dilimleyicinin hangi sayfalarda geçerli olacağını ve hangilerinde **görüneceğini** ayrı ayrı işaretlersin.\n\nYaygın kullanım: dilimleyici yalnızca ilk sayfada **görünür**, ama seçim tüm sayfalarda **geçerli** olur. Böylece hem yer kazanırsın hem tutarlılık sağlarsın.",
              "In a multi-page report the user should not have to re-pick the date filter on every page. In **View → Sync Slicers** you tick separately which pages a slicer **applies** to and which pages it is **visible** on.\n\nA common setup: the slicer is **visible** only on the first page but **applies** to all of them. You save space and keep the selection consistent.",
            ),
            quiz({
              id: "q8",
              q: [
                "Sync Slicers panelinde \"geçerli\" (apply) ve \"görünür\" (visible) ayarları neden ayrıdır?",
                "Why are \"applies to\" and \"visible on\" separate settings in the Sync Slicers panel?",
              ],
              options: [
                [
                  "Bir dilimleyici yalnızca bir sayfada görünürken seçimi diğer tüm sayfalarda geçerli olabilir",
                  "A slicer can be visible on only one page while its selection still applies to every other page",
                ],
                [
                  "İkisi aynı anlama gelir, ayrı olmaları bir hatadır",
                  "They mean the same thing and being separate is a bug",
                ],
                ["\"Görünür\" yalnızca mobilde çalışır", "\"Visible\" only works on mobile"],
                ["\"Geçerli\" yalnızca bir sayfada çalışabilir", "\"Applies to\" can only ever work on one page"],
              ],
              answer: 0,
              explain: [
                "Yaygın kullanım, dilimleyicinin yalnızca ilk sayfada görünür olması ama seçimin tüm sayfalarda geçerli olmasıdır. Bu, hem yer kazandırır hem de kullanıcının her sayfada aynı filtreyi yeniden seçmesini gereksiz kılar.",
                "The common setup makes a slicer visible only on the first page while its selection still applies everywhere. This saves space and means the user never has to re-pick the same filter on every page.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Çok sayfalı bir raporda dilimleyici senkronizasyonu kurulmazsa ne olur?",
                "What happens in a multi-page report if slicer sync is not set up?",
              ],
              options: [
                [
                  "Kullanıcı her sayfada tarih filtresini yeniden seçmek zorunda kalır",
                  "The user has to re-pick the date filter on every single page",
                ],
                ["Rapor açılmaz", "The report fails to open"],
                ["Dilimleyiciler otomatik olarak kaybolur", "The slicers automatically disappear"],
                [
                  "Hiçbir fark olmaz, senkronizasyon zaten varsayılandır",
                  "There is no difference, sync is on by default anyway",
                ],
              ],
              answer: 0,
              explain: [
                "Metin açıkça bunun önlenmesi gereken durum olduğunu söylüyor: senkronizasyon kurulmazsa kullanıcı her sayfada aynı filtreyi tekrar seçmek zorunda kalır, bu da kötü bir deneyimdir.",
                "The text explicitly frames this as the situation to avoid: without sync, the user must re-select the same filter on every page, which is a poor experience.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "Bir kartın etkileşimini \"Yok\" yapmak yerine DAX ile aynı sonucu elde etmek istesen ne yazardın?",
                "If instead of setting a card's interaction to \"None\" you wanted the same result in DAX, what would you write?",
              ],
              options: [
                [
                  "CALCULATE([Ölçü], ALL(Sehir)) gibi, şehir filtresini yok sayan bir ifade",
                  "Something like CALCULATE([Measure], ALL(City)) that ignores the city filter",
                ],
                ["Ölçüyü tamamen silmek", "Deleting the measure entirely"],
                ["Şehir sütununu modelden kaldırmak", "Removing the City column from the model"],
                ["Görseli sayfadan silmek", "Deleting the visual from the page"],
              ],
              answer: 0,
              explain: [
                "ALL(Sehir), CALCULATE içinde şehir filtresini kaldırarak ölçünün her zaman genel toplamı göstermesini sağlar — bu, Edit Interactions ile arayüzden yapılanın DAX karşılığıdır, ama tek bir görsel için arayüz ayarı daha basittir.",
                "ALL(City) inside CALCULATE removes the city filter so the measure always shows the grand total — the DAX equivalent of what Edit Interactions does in the UI, though for a single visual the UI setting is simpler.",
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
            quiz({
              id: "q2",
              q: [
                "Fact (olgu) tablosu ile dimension (boyut) tablosu arasındaki temel fark nedir?",
                "What is the core difference between a fact table and a dimension table?",
              ],
              options: [
                [
                  "Fact olayları tutar ve çok satırlıdır; dimension tanımları tutar ve az satırlıdır",
                  "Fact holds events and has many rows; dimension holds definitions and has few rows",
                ],
                ["İkisi de aynı sayıda satır içerir", "Both contain the same number of rows"],
                [
                  "Dimension sayısal ölçüleri, fact ise metinleri tutar",
                  "Dimension holds numeric measures, fact holds text",
                ],
                ["Fact tablosu yalnızca tarih içerir", "A fact table only contains dates"],
              ],
              answer: 0,
              explain: [
                "Fact tablosu satış, sipariş gibi olayları tutar ve satır sayısı çok yüksektir; sayısal ölçüler buradadır. Dimension tabloları müşteri, ürün gibi tanımları tutar, az satırlıdır ve filtrelediğin alanlar buradadır.",
                "A fact table records events like sales or orders and has a very high row count; numeric measures live here. Dimension tables hold definitions like customer or product, have few rows, and are the fields you filter by.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Filtre bir dilimleyicide seçildiğinde hangi yönde akar?",
                "When a filter is selected in a slicer, which direction does it flow?",
              ],
              options: [
                ["Boyut tablosundan fact tablosuna", "From the dimension table to the fact table"],
                ["Fact tablosundan boyuta", "From the fact table to the dimension"],
                ["Her iki yöne eşit olarak", "Equally in both directions"],
                ["Hiçbir yöne akmaz, yalnızca görseli etkiler", "It does not flow anywhere, it only affects the visual"],
              ],
              answer: 0,
              explain: [
                "Yıldız şemada ilişkiler bire-çok kurulur ve filtre daima boyuttan (bir müşteri, bir ürün) olguya (o müşteriye/ürüne ait birçok satır) doğru akar.",
                "In a star schema relationships are one-to-many, and filters always flow from the dimension (one customer, one product) toward the fact (the many rows belonging to that customer/product).",
              ],
            }),
            info(
              "Tek büyük tablo neden kötüdür?",
              "Why one big flat table is bad",
              "Her şeyi tek tabloda tutmak Excel alışkanlığıdır. Power BI'ın motoru (VertiPaq) sütunları sıkıştırarak çalışır; tekrar eden metinler tek büyük tabloda modeli şişirir, ilişkili filtreleme kaybolur ve `Ürün Kategorisi` gibi bir dilimleyici tüm tabloyu taramak zorunda kalır. Yıldız şema hem küçültür hem hızlandırır.",
              "Keeping everything in one table is an Excel habit. Power BI's engine (VertiPaq) compresses column by column; repeated text in one flat table bloats the model, relational filtering disappears, and a slicer like `Product Category` has to scan the whole table. A star schema makes the model both smaller and faster.",
            ),
            quiz({
              id: "q4",
              q: [
                "VertiPaq motoru neden tek büyük tabloyla iyi çalışmaz?",
                "Why does the VertiPaq engine not work well with one large flat table?",
              ],
              options: [
                [
                  "Sütunları sıkıştırarak çalışır ve tekrar eden metinler tek tabloda modeli şişirir",
                  "It works by compressing columns, and repeated text in one flat table bloats the model",
                ],
                [
                  "VertiPaq yalnızca birden fazla tabloyla çalışabilir, teknik bir zorunluluktur",
                  "VertiPaq can technically only function with multiple tables",
                ],
                ["Tek tablo DAX'ı tamamen devre dışı bırakır", "A single table disables DAX entirely"],
                [
                  "Tek tablo yalnızca görsel karmaşıklık yaratır, performansı etkilemez",
                  "A single table only creates visual clutter, with no performance effect",
                ],
              ],
              answer: 0,
              explain: [
                "VertiPaq sütun bazlı sıkıştırma yapar; tek büyük tabloda tekrar eden metinler (aynı müşteri adı, aynı kategori) defalarca yer kaplar ve sıkıştırma verimsizleşir. Yıldız şema bu tekrarı boyut tablolarına taşıyarak ortadan kaldırır.",
                "VertiPaq compresses column by column; in one flat table repeated text (the same customer name, the same category) takes up space over and over, so compression becomes inefficient. A star schema removes this repetition by moving it into dimension tables.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Tek büyük tabloda `Ürün Kategorisi` gibi bir dilimleyici neden yavaşlar?",
                "Why does a slicer like `Product Category` slow down in one giant flat table?",
              ],
              options: [
                [
                  "Tüm tabloyu taramak zorunda kalır çünkü ilişkisel filtreleme kaybolmuştur",
                  "It has to scan the whole table because relational filtering is gone",
                ],
                [
                  "Dilimleyiciler yalnızca boyut tablolarında çalışabilir, tek tabloda hiç çalışmaz",
                  "Slicers can only ever work on dimension tables, and won't work at all on one table",
                ],
                ["Tek tablo sıkıştırmayı tamamen imkansız kılar", "A single table makes compression entirely impossible"],
                ["Kategori sütunu otomatik olarak silinir", "The category column gets automatically deleted"],
              ],
              answer: 0,
              explain: [
                "Yıldız şemada bir boyut tablosundaki filtre ilişki üzerinden fact tablosuna küçük bir arama işlemiyle yayılır. Tek büyük tabloda bu ilişki yoktur, dolayısıyla filtre tüm satırları tarayarak uygulanmak zorunda kalır.",
                "In a star schema, a filter on a dimension table propagates to the fact table through the relationship via a small lookup. In one giant table there is no such relationship, so the filter must scan every row to apply.",
              ],
            }),
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
              id: "q6",
              q: [
                "Bir tabloyu \"Mark as Date Table\" ile işaretlemenin amacı nedir?",
                "What is the purpose of flagging a table with \"Mark as Date Table\"?",
              ],
              options: [
                [
                  "Zaman zekâsı fonksiyonlarının (TOTALYTD, SAMEPERIODLASTYEAR) doğru çalışmasını sağlamak",
                  "Making time-intelligence functions (TOTALYTD, SAMEPERIODLASTYEAR) work correctly",
                ],
                ["Tabloyu görsellerde otomatik gizlemek", "Automatically hiding the table from visuals"],
                ["Tabloyu Import'tan DirectQuery'ye çevirmek", "Converting the table from Import to DirectQuery"],
                ["Sıkıştırmayı devre dışı bırakmak", "Disabling compression"],
              ],
              answer: 0,
              explain: [
                "Power BI, zaman zekâsı fonksiyonlarının doğru çalışması için hangi tablonun eksiksiz ve sürekli bir tarih dizisi olduğunu bilmesi gerekir. Mark as Date Table bunu açıkça belirtir; işaretlenmeden bu fonksiyonlar hatalı sonuç verebilir.",
                "For time-intelligence functions to work correctly, Power BI needs to know which table is a complete, contiguous date sequence. Mark as Date Table declares this explicitly; without it, those functions can return wrong results.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Neden fact tablosundaki bir tarih sütunu yerine ayrı bir tarih tablosu oluşturulur?",
                "Why create a separate date table instead of using a date column already inside the fact table?",
              ],
              options: [
                [
                  "Zaman zekâsı fonksiyonları eksiksiz, sürekli ve tek başına duran bir tarih tablosu gerektirir",
                  "Time-intelligence functions require a complete, contiguous, standalone date table",
                ],
                ["Fact tablosunda tarih sütunu bulunması yasaktır", "Fact tables are not allowed to contain a date column"],
                ["Ayrı tablo yalnızca estetik bir tercihtir", "A separate table is purely a stylistic preference"],
                [
                  "Ayrı tarih tablosu performansı düşürür ama zorunludur",
                  "A separate date table hurts performance but is mandatory anyway",
                ],
              ],
              answer: 0,
              explain: [
                "Fact tablosundaki tarihler yalnızca işlem olan günleri içerir, boşluklar olabilir (satış olmayan gün). Zaman zekâsı fonksiyonları sürekli bir takvime ihtiyaç duyar; bu yüzden ayrı, boşluksuz bir tarih tablosu kurulur.",
                "Dates inside the fact table only cover days with transactions and can have gaps (a day with no sales). Time-intelligence functions need a continuous calendar, which is why a separate, gapless date table is built.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Kod örneğindeki DAX tarih tablosunda `\"Çeyrek\", \"Ç\" & QUARTER([Date])` satırı ne üretir?",
                "In the DAX date table example, what does the line `\"Çeyrek\", \"Ç\" & QUARTER([Date])` produce?",
              ],
              options: [
                [
                  "\"Ç1\", \"Ç2\" gibi metin biçiminde bir çeyrek etiketi",
                  "A text quarter label like \"Q1\", \"Q2\"",
                ],
                ["Yalnızca 1, 2, 3, 4 gibi sayısal bir değer", "Only a numeric value like 1, 2, 3, 4"],
                ["Tarihi tamamen siler", "It deletes the date entirely"],
                [
                  "Bir hata üretir çünkü QUARTER metinle birleştirilemez",
                  "It produces an error because QUARTER cannot be concatenated with text",
                ],
              ],
              answer: 0,
              explain: [
                "QUARTER([Date]) sayısal bir çeyrek değeri (1-4) döndürür; `&` operatörü bunu \"Ç\" metniyle birleştirip \"Ç1\", \"Ç2\" gibi okunabilir bir etiket üretir — görsellerde ve dilimleyicilerde sayıdan daha anlaşılır durur.",
                "QUARTER([Date]) returns a numeric quarter (1-4); the `&` operator concatenates it with the text \"Ç\" to produce a readable label like \"Ç1\", \"Ç2\" — clearer in visuals and slicers than a bare number.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "Çift yönlü ilişkiler neden yalnızca zorunlu hallerde açılmalı?",
                "Why should bi-directional relationships be enabled only when necessary?",
              ],
              options: [
                ["Belirsizliğe ve yavaşlığa yol açarlar", "They create ambiguity and slowness"],
                [
                  "Power BI'da teknik olarak hiç desteklenmezler",
                  "They are technically not supported by Power BI at all",
                ],
                ["Yalnızca DirectQuery'de sorun çıkarırlar", "They only cause problems in DirectQuery"],
                [
                  "Yalnızca görsel hatalara yol açarlar, performansı etkilemezler",
                  "They only cause visual bugs, with no performance effect",
                ],
              ],
              answer: 0,
              explain: [
                "Filtrenin normalde tek yönde (boyuttan fact'e) akması modeli öngörülebilir kılar. Çift yönlü açtığında filtre fact'ten de boyuta geri akabilir, bu da hangi filtrenin nereden geldiğini belirsizleştirir ve sorgu motorunu yavaşlatır.",
                "Filters normally flowing one way (dimension to fact) keeps the model predictable. Making a relationship bi-directional lets filters flow back from fact to dimension too, which makes it ambiguous where a filter originated and slows the query engine.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Boyut tablosundaki bir satırın benzersiz (unique) olması neden önemlidir?",
                "Why does it matter that a row in a dimension table is unique?",
              ],
              options: [
                [
                  "İlişkinin \"bir\" tarafını oluşturur; fact tablosundaki birçok satır bu tek satıra bağlanır",
                  "It forms the \"one\" side of the relationship, with many fact-table rows linking to that single row",
                ],
                [
                  "Benzersizlik yalnızca görsel bir tercihtir, ilişkiyi etkilemez",
                  "Uniqueness is purely a stylistic choice with no effect on the relationship",
                ],
                ["Fact tablosundaki satırların da benzersiz olması gerekir", "Fact table rows must also be unique"],
                ["Benzersizlik yalnızca tarih tablosunda gereklidir", "Uniqueness is only required in the date table"],
              ],
              answer: 0,
              explain: [
                "Bire-çok ilişki, boyut tablosunda her satırın (bir müşteri, bir ürün) yalnızca bir kez geçmesini gerektirir. Bu benzersizlik olmadan Power BI ilişkiyi kuramaz veya çoktan-çoğa gibi belirsiz bir ilişkiye düşer.",
                "A one-to-many relationship requires each dimension-table row (one customer, one product) to appear exactly once. Without that uniqueness Power BI cannot form the relationship, or falls back to an ambiguous many-to-many one.",
              ],
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
            quiz({
              id: "q2",
              q: [
                "Hesaplanan sütun (calculated column) ile ölçü (measure) arasındaki temel fark nedir?",
                "What is the core difference between a calculated column and a measure?",
              ],
              options: [
                [
                  "Sütun satır satır hesaplanıp modelde saklanır; ölçü görselin bağlamında hesaplanır ve yer kaplamaz",
                  "A column is computed row by row and stored in the model; a measure is computed in the visual's context and stores nothing",
                ],
                ["İkisi de tamamen aynı şekilde çalışır", "Both work in exactly the same way"],
                [
                  "Ölçü modelde saklanır, sütun görsel anında hesaplanır",
                  "A measure is stored in the model, a column is computed on the fly",
                ],
                [
                  "Sütunlar yalnızca metin, ölçüler yalnızca sayı içerir",
                  "Columns can only hold text, measures can only hold numbers",
                ],
              ],
              answer: 0,
              explain: [
                "Hesaplanan sütun her satır için bir kez hesaplanıp diske/belleğe yazılır ve dilimleyici olarak kullanılabilir. Ölçü ise hiçbir şey saklamaz, yalnızca bir görsel onu çağırdığında o an geçerli filtre bağlamında hesaplanır.",
                "A calculated column is computed once per row and written to memory, and can be used as a slicer. A measure stores nothing — it is computed on demand, in whatever filter context is active when a visual calls it.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "\"Şüphedeysen ölçü yaz\" kuralının pratik sebebi nedir?",
                "What is the practical reason behind the rule \"when in doubt, write a measure\"?",
              ],
              options: [
                [
                  "Ölçü yer kaplamaz ve yalnızca dilimleyici/ilişki gerekmedikçe sütuna gerek yoktur",
                  "A measure stores nothing, and a column is only needed for a slicer or a relationship key",
                ],
                [
                  "Ölçüler her zaman daha yavaştır ama daha güvenlidir",
                  "Measures are always slower, but safer",
                ],
                ["Sütunlar DAX ile hiç yazılamaz", "Columns cannot be written in DAX at all"],
                ["Kural yalnızca büyük modellerde geçerlidir", "The rule only applies to large models"],
              ],
              answer: 0,
              explain: [
                "Metin, hesaplanan sütunun yalnızca dilimleyici veya ilişki anahtarı için gerektiğinde kullanılmasını söylüyor. Bunun dışındaki her toplamsal hesap ölçü olmalı, çünkü ölçü modeli şişirmez.",
                "The text says to use a calculated column only when you need a slicer or a relationship key. Everything else requiring aggregation should be a measure, because a measure never bloats the model.",
              ],
            }),
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
            quiz({
              id: "q4",
              q: [
                "Kod örneğindeki `İstanbul Satış = CALCULATE([Toplam Satış], Musteri[Sehir] = \"İstanbul\")` ne yapar?",
                "What does `İstanbul Satış = CALCULATE([Total Sales], Customer[City] = \"Istanbul\")` from the code example do?",
              ],
              options: [
                [
                  "Toplam Satış ölçüsünü yalnızca İstanbul'a ait satırlarla sınırlı olarak hesaplar",
                  "It computes the Total Sales measure restricted only to rows belonging to Istanbul",
                ],
                ["Yalnızca İstanbul dışındaki satırları hesaplar", "It computes only the rows outside Istanbul"],
                ["Tüm şehirlerdeki satışları toplar", "It sums sales across all cities"],
                ["Şehir sütununu modelden kaldırır", "It removes the City column from the model"],
              ],
              answer: 0,
              explain: [
                "CALCULATE, ikinci argümanındaki koşulu yeni bir filtre olarak uygular; burada filtre şehri İstanbul'a sabitler, böylece [Toplam Satış] yalnızca o satırlar üzerinden hesaplanır.",
                "CALCULATE applies the condition in its second argument as a new filter; here it pins the city to Istanbul, so [Total Sales] is computed only over those rows.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`Genel Toplam = CALCULATE([Toplam Satış], ALL(Satis))` ile `Kategori Payı %` içindeki `ALL(Urun[Kategori]))` arasındaki fark nedir?",
                "What is the difference between `Genel Toplam = CALCULATE([Total Sales], ALL(Satis))` and the `ALL(Product[Category]))` used inside `Category Share %`?",
              ],
              options: [
                [
                  "ALL(Satis) tüm fact tablosundaki filtreleri kaldırır; ALL(Urun[Kategori]) yalnızca kategori sütunundaki filtreyi kaldırır",
                  "ALL(Satis) clears every filter on the whole fact table; ALL(Product[Category]) clears only the filter on the category column",
                ],
                ["İkisi tamamen aynı sonucu verir", "Both produce exactly the same result"],
                ["ALL(Satis) yalnızca ilk satırı alır", "ALL(Satis) only picks the first row"],
                ["ALL(Urun[Kategori]) tüm tabloyu siler", "ALL(Product[Category]) deletes the entire table"],
              ],
              answer: 0,
              explain: [
                "`ALL(tablo)` o tablo üzerindeki her filtreyi (hangi sütundan gelirse gelsin) kaldırır ve gerçek bir genel toplam üretir. `ALL(sütun)` ise yalnızca o sütunun filtresini kaldırır, diğer filtreler (ör. tarih) yerinde kalır.",
                "`ALL(table)` clears every filter on that table regardless of which column it came from, producing a true grand total. `ALL(column)` clears only that column's filter, leaving other filters (e.g. date) intact.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`Kategori Payı %` ölçüsündeki `CALCULATE([Toplam Satış], ALL(Urun[Kategori]))` neden gereklidir?",
                "Why is `CALCULATE([Total Sales], ALL(Product[Category]))` necessary inside the `Category Share %` measure?",
              ],
              options: [
                [
                  "Payda için kategori filtresini kaldırıp genel toplamı elde etmek gerekir",
                  "To clear the category filter for the denominator and get the grand total",
                ],
                [
                  "Yalnızca kodu daha uzun göstermek için eklenmiştir",
                  "It is only there to make the code look longer",
                ],
                ["ALL kullanmadan DIVIDE çalışmaz", "DIVIDE does not work without ALL"],
                ["Bu satır aslında gereksizdir, kaldırılabilir", "This line is actually unnecessary and can be removed"],
              ],
              answer: 0,
              explain: [
                "Pay/payda oranında payda \"genel toplam\" olmalı, yoksa her kategori kendi payını kendine böler ve sonuç hep %100 çıkar. ALL(Urun[Kategori]) kategorinin filtresini kaldırarak paydayı gerçek genel toplama sabitler.",
                "In a share calculation the denominator must be the grand total, otherwise each category divides by itself and the result is always 100%. ALL(Product[Category]) clears the category filter so the denominator is the true grand total.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`Geçen Yıl = CALCULATE([Toplam Satış], SAMEPERIODLASTYEAR(Tarih[Date]))` neden bir tarih tablosu gerektirir?",
                "Why does `Geçen Yıl = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Date[Date]))` require a date table?",
              ],
              options: [
                [
                  "Zaman zekâsı fonksiyonları sürekli, boşluksuz bir tarih dizisine ihtiyaç duyar",
                  "Time-intelligence functions need a continuous, gapless date sequence",
                ],
                ["SAMEPERIODLASTYEAR yalnızca fact tablosunda çalışır", "SAMEPERIODLASTYEAR only works on the fact table"],
                ["Tarih tablosu olmadan CALCULATE hiç çalışmaz", "CALCULATE does not work at all without a date table"],
                ["Bu fonksiyon aslında tarih tablosu gerektirmez", "This function does not actually need a date table"],
              ],
              answer: 0,
              explain: [
                "Bir önceki kademede görüldüğü gibi, SAMEPERIODLASTYEAR gibi fonksiyonlar tarihte bir yıl geriye kayarken boşluksuz bir takvime ihtiyaç duyar; fact tablosundaki işlem tarihleri bu sürekliliği garanti etmez.",
                "As covered at the previous stage, functions like SAMEPERIODLASTYEAR shift a year back along the calendar and need a gapless date sequence; transaction dates in the fact table do not guarantee that continuity.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`YTD = TOTALYTD([Toplam Satış], Tarih[Date])` ölçüsü ne hesaplar?",
                "What does the measure `YTD = TOTALYTD([Total Sales], Date[Date])` compute?",
              ],
              options: [
                [
                  "Yıl başından geçerli tarihe kadar birikmiş toplam satışı",
                  "The cumulative total sales from the start of the year up to the current date",
                ],
                ["Yalnızca geçerli ayın satışını", "Only the current month's sales"],
                ["Geçen yılın toplam satışını", "Last year's total sales"],
                ["Gelecek yılın tahmini satışını", "Next year's projected sales"],
              ],
              answer: 0,
              explain: [
                "TOTALYTD, SAMEPERIODLASTYEAR gibi bir zaman zekâsı fonksiyonudur; bir ölçüyü yılın 1 Ocak'ından geçerli filtre bağlamındaki son tarihe kadar biriktirir, bu yüzden diğer zaman zekâsı fonksiyonları gibi bir tarih tablosuna ihtiyaç duyar.",
                "TOTALYTD is a time-intelligence function like SAMEPERIODLASTYEAR; it accumulates a measure from January 1st of the year up to the last date in the current filter context, so like the others it needs a date table.",
              ],
            }),
            pitfall(
              "Sıfıra bölme ve DIVIDE",
              "Division by zero and DIVIDE",
              "`[A] / [B]` payda sıfır veya boşken hata üretir ve görselde `Infinity` görürsün. `DIVIDE([A], [B])` aynı durumda sessizce BLANK döner ve istersen üçüncü argümanla alternatif verirsin: `DIVIDE([A], [B], 0)`. DAX'ta bölme daima `DIVIDE` ile yapılır.",
              "`[A] / [B]` errors or shows `Infinity` when the denominator is zero or blank. `DIVIDE([A], [B])` returns BLANK instead, and takes an optional third argument for a fallback: `DIVIDE([A], [B], 0)`. In DAX you always divide with `DIVIDE`.",
            ),
            quiz({
              id: "q9",
              q: [
                "Neden `[A] / [B]` yerine daima `DIVIDE([A], [B])` kullanılmalı?",
                "Why should you always use `DIVIDE([A], [B])` instead of `[A] / [B]`?",
              ],
              options: [
                [
                  "Payda sıfır veya boşken hata/Infinity yerine sessizce BLANK (veya verilen alternatif) döner",
                  "When the denominator is zero or blank it returns BLANK (or a given fallback) instead of an error or Infinity",
                ],
                ["DIVIDE her zaman daha hızlı çalışır", "DIVIDE always runs faster"],
                ["/ operatörü DAX'ta hiç desteklenmez", "The / operator is not supported at all in DAX"],
                ["DIVIDE ondalık sayıları tam sayıya çevirir", "DIVIDE converts decimals to integers"],
              ],
              answer: 0,
              explain: [
                "`/` payda sıfır veya boşken hata üretir ve raporda `Infinity` görünür. `DIVIDE` aynı durumda sessizce BLANK (ya da üçüncü argümanla verilen alternatif) döner, bu yüzden DAX'ta bölme her zaman DIVIDE ile yapılır.",
                "`/` errors when the denominator is zero or blank and shows `Infinity` in the report. `DIVIDE` returns BLANK instead (or the fallback given as a third argument), which is why division in DAX is always done with DIVIDE.",
              ],
            }),
            text(
              "**Filtre bağlamı**, bir ölçünün hangi satırlar üzerinde çalıştığını belirleyen her şeydir: görseldeki satır/sütun başlıkları, dilimleyiciler, sayfa filtreleri, `CALCULATE` içindeki koşullar. Bir ölçünün değeri tek başına anlamlı değildir — hangi bağlamda okunduğuna bağlıdır.",
              "**Filter context** is everything that decides which rows a measure runs over: row and column headers in the visual, slicers, page filters, and conditions inside `CALCULATE`. A measure's value means nothing on its own — it depends on the context it is read in.",
            ),
            quiz({
              id: "q10",
              q: [
                "Bir ölçünün (measure) 'filtre bağlamı' neyi ifade eder?",
                "What does a measure's 'filter context' refer to?",
              ],
              options: [
                [
                  "Görseldeki satır/sütun başlıkları, dilimleyiciler, sayfa filtreleri ve CALCULATE koşulları gibi ölçünün hangi satırlar üzerinde çalıştığını belirleyen her şey",
                  "Everything that decides which rows a measure runs over — row/column headers, slicers, page filters, and conditions inside CALCULATE",
                ],
                ["Yalnızca DAX kodunun kendisi", "Just the DAX code itself"],
                ["Modeldeki tüm tabloların listesi", "The list of all tables in the model"],
                ["Ölçünün XP değeri", "The measure's XP value"],
              ],
              answer: 0,
              explain: [
                "Metnin vurguladığı gibi bir ölçünün değeri tek başına anlamsızdır — hangi bağlamda (görsel, dilimleyici, sayfa filtresi, CALCULATE koşulu) okunduğuna bağlıdır. Aynı ölçü farklı bağlamlarda farklı sonuç verir.",
                "As the text stresses, a measure's value means nothing on its own — it depends on the context (visual, slicer, page filter, CALCULATE condition) it is read in. The same measure returns different results in different contexts.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "RLS (Row-Level Security) nasıl çalışır?",
                "How does RLS (Row-Level Security) work?",
              ],
              options: [
                [
                  "Modelde bir rol tanımlanır, role bir DAX filtresi bağlanır ve kullanıcı raporu açtığında bu filtre sessizce uygulanır",
                  "A role is defined in the model, a DAX filter is attached to it, and the filter is applied silently when the user opens the report",
                ],
                [
                  "Her kullanıcı için ayrı bir .pbix dosyası oluşturulur",
                  "A separate .pbix file is created for each user",
                ],
                [
                  "Kullanıcı adı ve şifre modele elle girilir",
                  "The username and password are typed into the model by hand",
                ],
                [
                  "RLS yalnızca görselleri gizler, veriyi filtrelemez",
                  "RLS only hides visuals, it does not filter data",
                ],
              ],
              answer: 0,
              explain: [
                "RLS bir kullanıcı yönetim sistemi değil, model içindeki bir rol tanımıdır. Role bağlı DAX ifadesi, o rolü taşıyan kullanıcının raporu açtığı anda satırları otomatik olarak süzer.",
                "RLS is not a user-management system — it is a role defined inside the model. The DAX expression attached to the role automatically filters rows the moment a user carrying that role opens the report.",
              ],
            }),
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
            quiz({
              id: "q3",
              q: [
                "Dinamik RLS örneğindeki `USERPRINCIPALNAME()` fonksiyonu ne döndürür?",
                "What does the `USERPRINCIPALNAME()` function return in the dynamic RLS example?",
              ],
              options: [
                [
                  "Raporu açan oturum açmış kullanıcının e-posta/oturum kimliğini",
                  "The signed-in email/login identity of the user currently viewing the report",
                ],
                ["Veritabanı yöneticisinin adını", "The database administrator's name"],
                ["Rapor dosyasının oluşturulma tarihini", "The report file's creation date"],
                ["Sabit bir metin, her zaman aynı değeri döndürür", "A fixed string, always the same value"],
              ],
              answer: 0,
              explain: [
                "USERPRINCIPALNAME(), Service'te raporu açan kullanıcının oturum kimliğini (genelde e-postasını) döndürür. LOOKUPVALUE bu kimliği KullaniciBolge tablosuyla eşleştirerek doğru bölgeyi bulur.",
                "USERPRINCIPALNAME() returns the login identity (usually the email) of whoever opens the report in the Service. LOOKUPVALUE matches that identity against the KullaniciBolge table to find the right region.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`LOOKUPVALUE(KullaniciBolge[Bolge], KullaniciBolge[Email], USERPRINCIPALNAME())` ifadesi ne yapar?",
                "What does `LOOKUPVALUE(KullaniciBolge[Bolge], KullaniciBolge[Email], USERPRINCIPALNAME())` do?",
              ],
              options: [
                [
                  "KullaniciBolge tablosunda e-postası oturum açan kullanıcıyla eşleşen satırın Bölge değerini getirir",
                  "It looks up the Region value in the KullaniciBolge table for the row whose Email matches the signed-in user",
                ],
                [
                  "Tüm kullanıcıların bölgelerini birleştirip listeler",
                  "It concatenates and lists every user's region",
                ],
                ["E-posta sütununu tamamen siler", "It deletes the Email column entirely"],
                ["Rastgele bir bölge seçer", "It picks a random region"],
              ],
              answer: 0,
              explain: [
                "LOOKUPVALUE bir arama tablosunda eşleşen satırı bulup istenen sütunun değerini döndürür. Burada eşleşme kriteri Email = USERPRINCIPALNAME(), sonuç ise o kullanıcının Bölge değeridir — RLS filtresi bu değere göre kurulur.",
                "LOOKUPVALUE finds the matching row in a lookup table and returns the value of the requested column. Here the match condition is Email = USERPRINCIPALNAME(), and the result is that user's Region — the RLS filter is built around this value.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`[Sehir] = \"İstanbul\"` statik rolü ile dinamik RLS örneği arasındaki fark nedir?",
                "What is the difference between the static role `[Sehir] = \"İstanbul\"` and the dynamic RLS example?",
              ],
              options: [
                [
                  "Statik rol sabit bir değere filtreler, herkes aynı sonucu görür; dinamik rol oturum açan kullanıcıya göre değişir",
                  "The static role filters to a fixed value and shows everyone the same result; the dynamic role changes per signed-in user",
                ],
                [
                  "İkisi de aynı şekilde her kullanıcı için farklı sonuç üretir",
                  "Both produce a different result per user in the same way",
                ],
                ["Statik rol daha karmaşık DAX gerektirir", "The static role requires more complex DAX"],
                [
                  "Dinamik rol yalnızca Desktop'ta çalışır, Service'te çalışmaz",
                  "The dynamic role only works in Desktop, not in the Service",
                ],
              ],
              answer: 0,
              explain: [
                "Statik rol, kodda yazılı sabit bir koşuldur (ör. her zaman İstanbul) — bu role atanan herkes aynı süzülmüş veriyi görür. Dinamik rol ise USERPRINCIPALNAME() gibi bir fonksiyonla oturum açan kişiye göre değişir, tek bir rol tüm kullanıcılara hizmet eder.",
                "The static role is a fixed condition hard-coded in the DAX (e.g. always Istanbul) — everyone assigned to it sees the same filtered data. The dynamic role changes per signed-in user via a function like USERPRINCIPALNAME(), so a single role serves every user.",
              ],
            }),
            text(
              "Yayın akışı ve yönetişim:\n\n1. **Workspace** oluştur (kişisel My Workspace'te üretim raporu tutma).\n2. Raporu yayınla, **Semantic model** ile rapor ayrılsın.\n3. **Scheduled refresh** kur; kaynak şirket içindeyse **Gateway** gerekir.\n4. **Deployment pipeline** ile Dev → Test → Prod ayır.\n5. Son kullanıcıya **App** olarak dağıt, ham workspace erişimi verme.",
              "Publishing and governance flow:\n\n1. Create a **Workspace** (never keep production reports in My Workspace).\n2. Publish, keeping the **semantic model** separate from the report.\n3. Set up **scheduled refresh**; an on-premises source needs a **Gateway**.\n4. Separate Dev → Test → Prod with a **deployment pipeline**.\n5. Distribute to end users as an **App**, not by granting raw workspace access.",
            ),
            quiz({
              id: "q6",
              q: [
                "Yayın akışındaki uyarıya göre üretim raporları nerede tutulmamalıdır?",
                "According to the publishing flow's warning, where should production reports not be kept?",
              ],
              options: [
                ["Kişisel My Workspace'te", "In the personal My Workspace"],
                ["Ayrı bir workspace'te", "In a dedicated workspace"],
                ["Bir App içinde", "Inside an App"],
                ["Bir deployment pipeline'da", "In a deployment pipeline"],
              ],
              answer: 0,
              explain: [
                "My Workspace kişiseldir ve paylaşılan üretim içeriği için tasarlanmamıştır. Üretim raporları ayrı bir workspace'te tutulmalı ki izinler ve yaşam döngüsü doğru yönetilebilsin.",
                "My Workspace is personal and not designed for shared production content. Production reports belong in a dedicated workspace so permissions and lifecycle can be managed properly.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Yayınlarken semantic model'i rapordan ayrı tutmanın faydası nedir?",
                "What is the benefit of keeping the semantic model separate from the report when publishing?",
              ],
              options: [
                [
                  "Aynı modele birden fazla rapor bağlanabilir, model tekrar kurulmaz",
                  "Multiple reports can connect to the same model, so it does not need to be rebuilt each time",
                ],
                ["Rapor artık hiç yenilenmez", "The report no longer needs to be refreshed"],
                ["RLS artık gerekmez", "RLS is no longer needed"],
                ["Model otomatik olarak silinir", "The model gets automatically deleted"],
              ],
              answer: 0,
              explain: [
                "Semantic model'i rapordan ayırmak, aynı modelin birden çok rapor tarafından yeniden kullanılmasını sağlar — bu, ilerideki 'paylaşılan veri kümeleri' fikrinin temelidir.",
                "Separating the semantic model from the report lets the same model be reused by multiple reports — this is the foundation of the shared-dataset idea covered later.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Kaynak veri şirket içinde (on-premises) ise zamanlanmış yenileme için ek olarak ne gerekir?",
                "If the source data is on-premises, what is additionally required for scheduled refresh?",
              ],
              options: [
                ["Bir Gateway", "A Gateway"],
                ["Bir deployment pipeline", "A deployment pipeline"],
                ["Bir App", "An App"],
                ["Ekstra bir workspace", "An extra workspace"],
              ],
              answer: 0,
              explain: [
                "Bulut hizmeti şirket içi kaynağa doğrudan erişemez; bir Gateway aradaki köprüyü kurar ve zamanlanmış yenilemenin bu kaynağa güvenli şekilde bağlanmasını sağlar.",
                "The cloud service cannot reach an on-premises source directly; a Gateway bridges the gap so scheduled refresh can connect to that source securely.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Deployment pipeline yayın akışında hangi amaca hizmet eder?",
                "What purpose does the deployment pipeline serve in the publishing flow?",
              ],
              options: [
                [
                  "Dev → Test → Prod ortamlarını ayırıp aralarında kontrollü geçiş sağlar",
                  "It separates Dev → Test → Prod environments and provides controlled promotion between them",
                ],
                ["RLS filtrelerini otomatik yazar", "It automatically writes RLS filters"],
                ["Gateway kurulumunu yapar", "It sets up the Gateway"],
                ["Kullanıcı e-postalarını doğrular", "It validates user email addresses"],
              ],
              answer: 0,
              explain: [
                "Deployment pipeline, bir raporun geliştirme aşamasından test ve üretime kontrollü biçimde ilerlemesini sağlar; değişiklikler doğrudan üretime sızmaz.",
                "The deployment pipeline lets a report move from development through test to production in a controlled way, so changes never leak straight into production.",
              ],
            }),
            tip(
              "RLS'i yayınlamadan test et",
              "Test RLS before you publish",
              "Power BI Desktop'ta `Modeling → View As` ile bir rolü veya belirli bir kullanıcıyı taklit edip raporu onun gözünden görebilirsin. Yayınladıktan sonra Service tarafında da `Test as role` vardır. Bu adımı atlayan ekipler, yanlış kişiye yanlış veriyi göstermenin ne kadar hızlı olduğunu zor yoldan öğrenir.",
              "In Power BI Desktop, `Modeling → View As` lets you impersonate a role or a specific user and see the report through their eyes. The Service has `Test as role` too. Teams that skip this step learn the hard way how quickly the wrong data reaches the wrong person.",
            ),
            quiz({
              id: "q10",
              q: [
                "RLS'i yayınlamadan önce test etmenin önerilen yolu nedir?",
                "What is the recommended way to test RLS before publishing?",
              ],
              options: [
                [
                  "Desktop'ta Modeling → View As ile bir rolü veya kullanıcıyı taklit edip raporu onun gözünden görmek",
                  "Use Modeling → View As in Desktop to impersonate a role or user and view the report through their eyes",
                ],
                [
                  "Raporu yayınlayıp gerçek kullanıcılardan geri bildirim beklemek",
                  "Publish the report and wait for feedback from real users",
                ],
                ["RLS'i tamamen kapatıp test etmek", "Turn RLS off entirely to test"],
                ["Yalnızca kod incelemesi yapmak yeterlidir", "A code review alone is sufficient"],
              ],
              answer: 0,
              explain: [
                "View As, yayınlamadan önce hatayı yakalamanı sağlar; yayınladıktan sonra da Service'te aynı işi gören Test as role vardır. Bu adımı atlamak, yanlış kişiye yanlış veriyi göstermenin en hızlı yoludur.",
                "View As lets you catch mistakes before publishing; after publishing, the Service offers the equivalent Test as role. Skipping this step is the fastest way to show the wrong data to the wrong person.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Power Query'de kullanılmayan sütunları silmenin performansa faydası nedir?",
                "What is the performance benefit of deleting unused columns in Power Query?",
              ],
              options: [
                [
                  "Her sütun bellekte yer kapladığından silmek modeli küçültür ve yenilemeyi hızlandırır",
                  "Since every column occupies memory, deleting it shrinks the model and speeds up refresh",
                ],
                ["Sütun silmek görsellerin rengini değiştirir", "Deleting a column changes the visuals' colors"],
                ["Sütun silmek RLS'i otomatik kurar", "Deleting a column automatically sets up RLS"],
                ["Sütun silmenin performansla ilgisi yoktur", "Deleting a column has nothing to do with performance"],
              ],
              answer: 0,
              explain: [
                "Metnin belirttiği gibi her sütun modelde bellek kaplar ve yenilemeyi yavaşlatır. Kullanılmayan sütunu Power Query aşamasında silmek, modeli en büyük tek adımla küçültür.",
                "As the text states, every column occupies memory and slows the refresh. Deleting an unused column at the Power Query stage is the single biggest step in shrinking the model.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Saniye içeren bir tarih-saat sütununu neden tarih ve saat olarak iki ayrı sütuna bölmelisin?",
                "Why should you split a datetime column that includes seconds into two separate date and time columns?",
              ],
              options: [
                [
                  "Tek sütunda milyonlarca benzersiz değer olur ve sıkıştırma çalışmaz; ayrılınca her sütunun kardinalitesi düşer",
                  "In a single column there are millions of distinct values and compression fails; split apart, each column's cardinality drops",
                ],
                [
                  "Power BI birleşik tarih-saat sütununu hiç okuyamaz",
                  "Power BI cannot read a combined datetime column at all",
                ],
                ["Bölmek yalnızca görünüşü güzelleştirir", "Splitting is only cosmetic"],
                ["Bölmek RLS için zorunludur", "Splitting is required for RLS"],
              ],
              answer: 0,
              explain: [
                "Yüksek kardinalite VertiPaq'in sıkıştırmasını bozar. Tarih ve saat ayrı sütunlara bölündüğünde her biri kendi başına çok daha az benzersiz değere sahip olur, bu da sıkıştırmayı ve dolayısıyla model boyutunu iyileştirir.",
                "High cardinality breaks VertiPaq's compression. Once date and time are split apart, each column has far fewer distinct values on its own, which improves compression and therefore model size.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Modeli küçültme adımlarından biri olan 'gereksiz ondalık hassasiyeti azaltma' neden işe yarar?",
                "Why does reducing unnecessary decimal precision, one of the shrink-the-model steps, help?",
              ],
              options: [
                [
                  "Daha az hassas değerler daha az benzersiz değer üretir, bu da sıkıştırmayı iyileştirir",
                  "Less precise values produce fewer distinct values, which improves compression",
                ],
                ["Ondalık sayılar DAX'ta desteklenmez", "Decimal numbers are not supported in DAX"],
                [
                  "Hassasiyet azaltmak görselleri otomatik olarak hızlandırır",
                  "Reducing precision automatically speeds up visuals regardless of the model",
                ],
                [
                  "Bu adımın performansla ilgisi yoktur, yalnızca görünüm içindir",
                  "This step has nothing to do with performance, it is purely cosmetic",
                ],
              ],
              answer: 0,
              explain: [
                "Aynı yüksek-kardinalite mantığı ondalık sayılar için de geçerlidir: gereksiz basamaklar benzersiz değer sayısını artırır ve VertiPaq'in sözlük sıkıştırmasını zayıflatır.",
                "The same high-cardinality logic applies to decimals: unnecessary digits increase the number of distinct values and weaken VertiPaq's dictionary compression.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Metne göre hesaplanan sütun ile ölçü arasında bellek kullanımı açısından fark nedir?",
                "According to the text, what is the memory-usage difference between a calculated column and a measure?",
              ],
              options: [
                [
                  "Hesaplanan sütun yenileme anında hesaplanıp bellekte saklanır; ölçü sorgu anında hesaplanır ve yer kaplamaz",
                  "A calculated column is computed at refresh time and stored in memory; a measure is computed at query time and occupies nothing",
                ],
                ["İkisi de aynı miktarda bellek kullanır", "Both use the same amount of memory"],
                ["Ölçü her zaman sütundan daha çok bellek kullanır", "A measure always uses more memory than a column"],
                ["Hesaplanan sütun hiç bellek kullanmaz", "A calculated column uses no memory at all"],
              ],
              answer: 0,
              explain: [
                "Bu fark, ikinci en etkili optimizasyon adımının temelidir: toplama gerektiren her hesap bir ölçü olmalı, çünkü ölçü hiçbir şeyi diskte/bellekte saklamaz.",
                "This difference is the basis of the second most effective optimisation step: anything requiring aggregation should be a measure, because a measure stores nothing on disk or in memory.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Metne göre iki yönlü ilişkilerden neden mümkünse kaçınılmalıdır?",
                "According to the text, why should bi-directional relationships be avoided when possible?",
              ],
              options: [
                [
                  "Sorgu planını karmaşıklaştırır ve belirsizlik yaratır",
                  "It complicates the query plan and introduces ambiguity",
                ],
                [
                  "Power BI iki yönlü ilişkileri desteklemez",
                  "Power BI does not support bi-directional relationships at all",
                ],
                [
                  "İki yönlü ilişki modeli otomatik olarak küçültür",
                  "A bi-directional relationship automatically shrinks the model",
                ],
                [
                  "İki yönlü ilişki yalnızca DirectQuery'de sorun çıkarır",
                  "Bi-directional relationships only cause problems in DirectQuery",
                ],
              ],
              answer: 0,
              explain: [
                "Üçüncü etki sıralı adım budur: filtrenin her iki yönde de akması, motorun hangi yolu izleyeceği konusunda belirsizlik yaratır ve sorguyu yavaşlatabilir. Gerçekten gerekmedikçe tek yön tercih edilir.",
                "This is the third step in order of impact: letting the filter flow in both directions creates ambiguity about which path the engine should take and can slow the query. A single direction is preferred unless truly needed.",
              ],
            }),
            text(
              "**Ölçüm araçları — tahmin etme, ölç:**\n\n- **Performans Çözümleyici (Performance Analyzer)** — Desktop'ta Görünüm sekmesinde. Kaydı başlat, sayfayı yenile ve her görselin kaç milisaniye sürdüğünü gör. Yavaş olan görseli **kesin olarak** bulur.\n- **DAX Studio** — Ücretsiz harici araç. Görselin ürettiği DAX sorgusunu ve sorgu planını gösterir; ölçü optimizasyonunun ciddi işi burada yapılır.\n- **VertiPaq Analyzer** — Hangi tablonun ve sütunun kaç MB yediğini gösterir. \"Modeli küçült\" adımına nereden başlayacağını söyler.\n\nGenel eşik: bir görsel 2 saniyeden uzun sürüyorsa kullanıcı bunu yavaş hisseder.",
              "**Measurement tools — measure, do not guess:**\n\n- **Performance Analyzer** — in Desktop, on the View tab. Start recording, refresh the page and see how many milliseconds each visual took. It finds the slow visual **definitively**.\n- **DAX Studio** — a free external tool. It shows the DAX query a visual generates and its query plan; serious measure optimisation happens here.\n- **VertiPaq Analyzer** — shows how many MB each table and column consumes. It tells you where to start on the \"shrink the model\" step.\n\nA general threshold: if a visual takes more than 2 seconds, users perceive the report as slow.",
            ),
            quiz({
              id: "q7",
              q: [
                "Performans Çözümleyici (Performance Analyzer) ne işe yarar?",
                "What is the Performance Analyzer for?",
              ],
              options: [
                [
                  "Kaydı başlatıp sayfayı yenileyerek her görselin kaç milisaniye sürdüğünü göstererek yavaş görseli kesin olarak bulur",
                  "Starting a recording and refreshing the page shows how many milliseconds each visual took, pinpointing the slow one definitively",
                ],
                [
                  "Modeldeki sütunların MB cinsinden boyutunu gösterir",
                  "It shows the size in MB of each column in the model",
                ],
                [
                  "DAX sorgu planını gösteren harici bir araçtır",
                  "It is an external tool that shows the DAX query plan",
                ],
                ["Yalnızca yenileme süresini ölçer, görselleri ölçmez", "It only measures refresh time, not visuals"],
              ],
              answer: 0,
              explain: [
                "Performans Çözümleyici Desktop'a yerleşiktir; kayıt başlatıp sayfayı yenilediğinde her görselin süresini milisaniye cinsinden gösterir, böylece tahmin etmek yerine hangi görselin yavaş olduğunu kesin olarak bilirsin.",
                "Performance Analyzer is built into Desktop; start a recording and refresh the page and it shows each visual's duration in milliseconds, so instead of guessing you know exactly which visual is slow.",
              ],
            }),
            quiz({
              id: "q8",
              q: ["DAX Studio hangi amaçla kullanılır?", "What is DAX Studio used for?"],
              options: [
                [
                  "Görselin ürettiği DAX sorgusunu ve sorgu planını göstererek ciddi ölçü optimizasyonuna imkân verir",
                  "It shows the DAX query a visual generates and its query plan, enabling serious measure optimisation",
                ],
                ["Power BI Desktop içinde yerleşik bir sekmedir", "It is a built-in tab inside Power BI Desktop"],
                ["Yalnızca renk temalarını düzenler", "It only edits color themes"],
                ["Modeli otomatik olarak yeniden yapılandırır", "It automatically restructures the model"],
              ],
              answer: 0,
              explain: [
                "Performans Çözümleyici'nin aksine DAX Studio Desktop'a yerleşik değildir — ücretsiz harici bir araçtır ve bir görselin arkasındaki gerçek DAX sorgusunu ve sorgu planını göstererek derin optimizasyona olanak tanır.",
                "Unlike Performance Analyzer, DAX Studio is not built into Desktop — it is a free external tool, and it shows the actual DAX query and query plan behind a visual, enabling deep optimisation.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "VertiPaq Analyzer'ın gösterdiği bilgi hangisidir?",
                "What information does VertiPaq Analyzer show?",
              ],
              options: [
                [
                  "Hangi tablonun ve sütunun kaç MB yediğini, böylece modeli küçültmeye nereden başlanacağını gösterir",
                  "How many MB each table and column consumes, showing where to start shrinking the model",
                ],
                [
                  "Her görselin render süresini milisaniye cinsinden",
                  "Each visual's render time in milliseconds",
                ],
                ["Kullanıcıların oturum açma geçmişini", "Users' sign-in history"],
                ["RLS rollerinin listesini", "The list of RLS roles"],
              ],
              answer: 0,
              explain: [
                "VertiPaq Analyzer, model boyutunu tablo ve sütun düzeyinde MB cinsinden gösterir; bu, 'modeli küçült' adımına tam olarak nereden başlanacağını söyleyen ölçüm aracıdır.",
                "VertiPaq Analyzer breaks down model size in MB at the table and column level; it is the measurement tool that tells you exactly where to start on the 'shrink the model' step.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Metne göre kullanıcılar bir görseli ne zaman 'yavaş' olarak algılar?",
                "According to the text, when do users perceive a visual as 'slow'?",
              ],
              options: [
                ["2 saniyeden uzun sürdüğünde", "When it takes more than 2 seconds"],
                ["5 saniyeden uzun sürdüğünde", "When it takes more than 5 seconds"],
                ["Hiçbir zaman, kullanıcılar süreyi fark etmez", "Never — users do not notice duration"],
                ["Yalnızca yenileme sırasında", "Only during refresh"],
              ],
              answer: 0,
              explain: [
                "Metindeki genel eşik 2 saniyedir — bir görsel bunun üzerinde sürerse kullanıcı raporu yavaş olarak algılar, bu yüzden Performans Çözümleyici'deki ölçümler bu eşiğe göre değerlendirilir.",
                "The text's general threshold is 2 seconds — beyond that, users perceive the report as slow, so measurements from Performance Analyzer should be judged against this threshold.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Metne göre şirkette 'toplam ciro' için farklı sayılar çıkmasının kök nedeni nedir?",
                "According to the text, what is the root cause of different 'total revenue' numbers appearing in the company?",
              ],
              options: [
                [
                  "Her analistin kendi .pbix dosyasında kendi modelini kurup filtre ve iade mantığını farklı yazması",
                  "Each analyst building their own model in their own .pbix and writing the filter and returns logic differently",
                ],
                ["Excel'in Power BI ile uyumsuz olması", "Excel being incompatible with Power BI"],
                ["Şirketin yeterli lisansı olmaması", "The company not having enough licenses"],
                ["RLS'in yanlış yapılandırılması", "RLS being misconfigured"],
              ],
              answer: 0,
              explain: [
                "Sorun teknik bir kısıt değil, mimari tekrardır: beş analist beş ayrı model kurup her biri ölçüyü kendi yorumuyla yazınca aynı isim altında beş farklı sonuç ortaya çıkar.",
                "The problem is not a technical limitation but architectural duplication: when five analysts build five separate models and each writes the measure with their own interpretation, five different results appear under the same name.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Paylaşılan anlamsal modelde diğer kişiler Power BI Desktop'tan nasıl bağlanır?",
                "In a shared semantic dataset, how do other people connect from Power BI Desktop?",
              ],
              options: [
                [
                  "\"Power BI anlamsal modelleri\" kaynağına bağlanıp yalnızca rapor tasarlarlar, kendi modellerini kurmazlar",
                  "They connect via the \"Power BI semantic models\" source and design only reports, without building their own model",
                ],
                [
                  "Modeli her seferinde kopyalayıp kendi .pbix'lerine yapıştırırlar",
                  "They copy the model each time and paste it into their own .pbix",
                ],
                [
                  "E-posta ile model dosyasını isteyip elle birleştirirler",
                  "They request the model file by email and merge it by hand",
                ],
                ["Yalnızca PDF export ile erişirler", "They only access it via PDF export"],
              ],
              answer: 0,
              explain: [
                "Bu bağlantı türü, modeli kopyalamadan yeniden kullanmayı sağlar: tek kişi modeli kurup yayınlar, geri kalan herkes o modele bağlanıp yalnızca görsel ve rapor tasarımıyla ilgilenir.",
                "This connection type reuses the model without copying it: one person builds and publishes the model, and everyone else connects to it and focuses only on visual and report design.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Metne göre paylaşılan model, tek doğruluk kaynağını nasıl 'zorunlu' kılar?",
                "According to the text, how does a shared model make a single source of truth 'compulsory'?",
              ],
              options: [
                [
                  "Belge veya toplantıyla değil, mimariyle — model tek yerde tanımlandığı için kimse farklı bir sürüm yazamaz",
                  "Through architecture rather than documents or meetings — since the model is defined in one place, nobody can write a different version",
                ],
                [
                  "Şirket politikası her analistin aynı sayıyı yazmasını zorunlu kılar",
                  "Company policy requires every analyst to write the same number",
                ],
                [
                  "Power BI yanlış sayı girmeyi teknik olarak engeller",
                  "Power BI technically blocks entering a wrong number",
                ],
                ["Model her gece otomatik olarak silinir", "The model gets automatically deleted every night"],
              ],
              answer: 0,
              explain: [
                "Belge yazmak veya kural koymak insan disiplinine dayanır ve zamanla bozulur. Model tek bir yerde tanımlandığında, kimsenin \"kendi ciro tanımını\" yazacağı ayrı bir yer kalmaz — çözüm yapısal, yani süreçten bağımsızdır.",
                "Writing documents or setting policy depends on human discipline and decays over time. When the model is defined in exactly one place, there is no separate place left for someone to write \"their own\" revenue definition — the fix is structural, independent of process.",
              ],
            }),
            text(
              "**Kurumsal düzende üç kavram:**\n\n- **Çalışma alanı (workspace)** — Raporların ve modellerin yaşadığı klasör. Geliştirme / Test / Üretim için **ayrı** çalışma alanları kur.\n- **Uygulama (app)** — Bir çalışma alanındaki raporların son kullanıcıya paketlenmiş hâli. Kullanıcılar çalışma alanına değil uygulamaya erişir; böylece sen çalışma alanında değişiklik yaparken onlar etkilenmez.\n- **Dağıtım hattı (deployment pipeline)** — Geliştirme → Test → Üretim geçişini yöneten araç (Premium gerektirir). Değişikliği elle kopyalamak yerine düğmeye basarsın.\n\n**Yetkilendirme:** Kullanıcıya raporu değil **uygulamayı** paylaş; çalışma alanı rollerini (Yönetici, Üye, Katkıda Bulunan, Görüntüleyici) doğru dağıt.",
              "**Three concepts in an enterprise setup:**\n\n- **Workspace** — the folder where reports and models live. Create **separate** workspaces for Development / Test / Production.\n- **App** — the packaged form of a workspace's reports for end users. Users access the app rather than the workspace, so your edits do not disturb them.\n- **Deployment pipeline** — the tool managing Development → Test → Production promotion (requires Premium). Instead of copying changes by hand, you press a button.\n\n**Permissions:** share the **app**, not the report; and assign workspace roles (Admin, Member, Contributor, Viewer) deliberately.",
            ),
            quiz({
              id: "q5",
              q: [
                "Kurumsal düzende Geliştirme / Test / Üretim için önerilen yapı nedir?",
                "In the enterprise setup, what is the recommended structure for Development / Test / Production?",
              ],
              options: [
                [
                  "Her biri için ayrı çalışma alanları (workspace) kurmak",
                  "Set up separate workspaces for each",
                ],
                ["Hepsini tek bir workspace'te tutmak", "Keep them all in a single workspace"],
                [
                  "Yalnızca üretim için workspace kurmak, geri kalanı My Workspace'te tutmak",
                  "Only set up a workspace for production, keeping the rest in My Workspace",
                ],
                ["Her analist için ayrı bir workspace kurmak", "Set up a separate workspace per analyst"],
              ],
              answer: 0,
              explain: [
                "Workspace, raporların ve modellerin yaşadığı klasördür; Geliştirme/Test/Üretim'i ayrı workspace'lere koymak, bir aşamadaki değişikliğin diğerini kazara bozmasını engeller.",
                "A workspace is the folder where reports and models live; putting Development/Test/Production in separate workspaces prevents a change in one stage from accidentally breaking another.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Kullanıcıların çalışma alanına değil uygulamaya (app) erişmesinin faydası nedir?",
                "What is the benefit of users accessing the app instead of the workspace?",
              ],
              options: [
                [
                  "Sen çalışma alanında değişiklik yaparken kullanıcılar bundan etkilenmez",
                  "While you make changes in the workspace, users are not disturbed by them",
                ],
                ["Uygulama workspace'ten daha fazla veri gösterir", "The app shows more data than the workspace"],
                ["Uygulama otomatik olarak RLS'i devre dışı bırakır", "The app automatically disables RLS"],
                ["Kullanıcılar uygulama üzerinden modeli düzenleyebilir", "Users can edit the model through the app"],
              ],
              answer: 0,
              explain: [
                "App, workspace'in son kullanıcıya paketlenmiş hâlidir. Kullanıcı app'i görür, workspace'i görmez; bu yüzden sen orada geliştirme yaparken onların gördüğü sürüm sabit kalır.",
                "The app is the packaged form of the workspace for end users. Users see the app, not the workspace, so while you develop there, the version they see stays stable.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Dağıtım hattı (deployment pipeline) hangi lisans koşuluna bağlıdır?",
                "What licensing condition does a deployment pipeline require?",
              ],
              options: [
                ["Premium gerektirir", "It requires Premium"],
                ["Ücretsiz sürümde de tam olarak çalışır", "It works fully in the free tier too"],
                ["Yalnızca Desktop lisansı yeterlidir", "Only a Desktop license is enough"],
                ["Herhangi bir lisans gerektirmez", "It requires no license at all"],
              ],
              answer: 0,
              explain: [
                "Metinde belirtildiği gibi Geliştirme → Test → Üretim geçişini yöneten dağıtım hattı Premium gerektirir; bu olmadan geçişler elle kopyalanarak yapılır.",
                "As the text states, the deployment pipeline that manages Development → Test → Production promotion requires Premium; without it, promotions are done by copying changes by hand.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Yetkilendirme önerisine göre kullanıcıya ne paylaşılmalıdır?",
                "According to the permissions guidance, what should be shared with users?",
              ],
              options: [
                ["Rapor değil, uygulama (app)", "The app, not the report"],
                ["Doğrudan .pbix dosyası", "The .pbix file directly"],
                ["Çalışma alanının Yönetici rolü", "The workspace's Admin role"],
                ["Yalnızca semantic model", "Only the semantic model"],
              ],
              answer: 0,
              explain: [
                "Metindeki kural açık: kullanıcıya raporu değil uygulamayı paylaş. Bu, app-workspace ayrımının doğal sonucudur ve kullanıcının ham workspace erişimi almasını engeller.",
                "The text's rule is explicit: share the app with users, not the report. This is the natural consequence of the app/workspace split, and it keeps users from getting raw workspace access.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Metinde sayılan çalışma alanı rolleri hangileridir?",
                "Which workspace roles are listed in the text?",
              ],
              options: [
                ["Yönetici, Üye, Katkıda Bulunan, Görüntüleyici", "Admin, Member, Contributor, Viewer"],
                ["Sahip, Misafir, Denetçi, Ziyaretçi", "Owner, Guest, Auditor, Visitor"],
                ["Süper Kullanıcı, Standart, Salt Okunur", "Super User, Standard, Read-only"],
                ["Yalnızca Yönetici ve Kullanıcı", "Only Admin and User"],
              ],
              answer: 0,
              explain: [
                "Metin dört rolü sayar: Yönetici, Üye, Katkıda Bulunan, Görüntüleyici. Bunların doğru dağıtılması, yetkilendirme önerisinin ikinci yarısıdır.",
                "The text lists four roles: Admin, Member, Contributor, Viewer. Assigning them deliberately is the second half of the permissions guidance.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Çalışma alanı rollerinin 'doğru dağıtılması' neden önemlidir?",
                "Why does it matter that workspace roles are assigned deliberately?",
              ],
              options: [
                [
                  "Her kişinin modelde/raporda yapabileceği değişiklik düzeyini sınırlayarak yanlışlıkla üretim içeriğini bozmayı önler",
                  "It limits how much each person can change in the model/report, preventing accidental damage to production content",
                ],
                ["Roller yalnızca görsel tercihleri belirler", "Roles only determine visual preferences"],
                ["Rollerin performansla hiçbir ilgisi yoktur", "Roles have nothing to do with performance"],
                ["Roller yalnızca raporun rengini değiştirir", "Roles only change the report's color"],
              ],
              answer: 0,
              explain: [
                "Yönetici ile Görüntüleyici çok farklı yetkilere sahiptir; rolleri özensiz dağıtmak, örneğin bir görüntüleyicinin üretim modelini kazara değiştirmesine yol açabilir. Doğru dağıtım, workspace/app ayrımının güvenlik katmanını tamamlar.",
                "Admin and Viewer carry very different privileges; assigning roles carelessly could let, say, a viewer accidentally alter the production model. Deliberate assignment completes the security layer that the workspace/app split provides.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Klasik `.pbix` dosyasının versiyon kontrolünde en büyük sorunu nedir?",
                "What is the biggest version-control problem with the classic `.pbix` file?",
              ],
              options: [
                [
                  "İkili (binary) olduğu için Git'te fark (diff) görülemez ve 'ne değişti?' sorusuna cevap yoktur",
                  "Because it is binary, Git cannot show a diff, and there is no answer to 'what changed?'",
                ],
                ["Dosya boyutu çok küçük olduğu için kaybolur", "The file is too small, so it gets lost"],
                ["Git .pbix dosyalarını hiç kabul etmez", "Git does not accept .pbix files at all"],
                [".pbix dosyaları yalnızca bulutta saklanabilir", ".pbix files can only be stored in the cloud"],
              ],
              answer: 0,
              explain: [
                "Git .pbix'i kabul eder ve saklar, ama ikili içeriği satır satır karşılaştıramaz. Bu yüzden hangi ölçünün veya görselin değiştiğini görmek imkânsızdır — asıl sorun bu.",
                "Git accepts and stores a .pbix fine, but it cannot compare binary content line by line. That is why seeing which measure or visual changed is impossible — that is the real problem.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir raporu PBIP biçimine dönüştürmek için Power BI Desktop'ta ne yapılır?",
                "What do you do in Power BI Desktop to convert a report to the PBIP format?",
              ],
              options: [
                ["Dosya → Farklı Kaydet → Power BI project seçilir", "File → Save As → Power BI project is selected"],
                ["Rapor doğrudan Git'e sürüklenir", "The report is dragged directly into Git"],
                ["Yalnızca Service'te bir düğmeye basılır", "You just click a button in the Service"],
                ["Model dışa aktarılıp Excel'e yapıştırılır", "The model is exported and pasted into Excel"],
              ],
              answer: 0,
              explain: [
                "Metinde tarif edilen adım budur: File → Save As → Power BI project, rapor ve modeli klasör içinde metin dosyalarına açar; sonrasında bu klasör normal şekilde Git'e eklenir.",
                "This is exactly the step described in the text: File → Save As → Power BI project unpacks the report and model into text files inside a folder, which you then add to Git normally.",
              ],
            }),
            quiz({
              id: "q4",
              q: ["TMDL (Tabular Model Definition Language) ne işe yarar?", "What is TMDL (Tabular Model Definition Language) for?"],
              options: [
                [
                  "Modeli okunabilir metin olarak tanımlayıp ölçüleri gerçekten sürüm kontrolüne sokar",
                  "It describes the model as readable text, properly bringing measures under version control",
                ],
                ["Yalnızca görsellerin renklerini tanımlar", "It only defines the visuals' colors"],
                ["RLS rollerini otomatik oluşturur", "It automatically creates RLS roles"],
                ["Veritabanı bağlantı bilgilerini şifreler", "It encrypts database connection details"],
              ],
              answer: 0,
              explain: [
                "TMDL, PBIP'in yanında çalışan bir dildir ve modeli (tablolar, ilişkiler, ölçüler) okunabilir metin olarak tanımlar; böylece bir ölçünün DAX kodundaki değişiklik Git'te satır satır görülebilir.",
                "TMDL works alongside PBIP and describes the model (tables, relationships, measures) as readable text, so a change to a measure's DAX code becomes visible line by line in Git.",
              ],
            }),
            text(
              "**Yönetişim — rapor çoğalmasını (report sprawl) durdurmak:**\n\nHer şirkette aynı hikâye yaşanır: iki yılda 300 rapor birikir, hangisinin güncel olduğunu kimse bilmez ve kimse silmeye cesaret edemez. Dört pratik önlem:\n\n1. **Onaylı içerik etiketleri** — Power BI'da bir veri kümesini **Onaylı (Certified)** veya **Tanıtılan (Promoted)** olarak işaretle. Kullanıcı hangisine güveneceğini görür.\n2. **Kullanım ölçümü** — Service'te her raporun kullanım istatistiği vardır. 90 gündür açılmayan raporu arşivle.\n3. **Sahiplik** — Her raporun bir sahibi olsun ve bu ad raporun üstünde yazsın. Sahipsiz rapor kısa sürede çürür.\n4. **Adlandırma standardı** — `Departman - Konu - Sıklık` gibi bir kural, 300 rapor arasında aramayı mümkün kılar.",
              "**Governance — stopping report sprawl:**\n\nEvery company lives the same story: 300 reports accumulate in two years, nobody knows which is current, and nobody dares delete any. Four practical measures:\n\n1. **Endorsement labels** — mark a dataset **Certified** or **Promoted** in Power BI. Users can see which to trust.\n2. **Usage metrics** — the Service records usage statistics per report. Archive anything unopened for 90 days.\n3. **Ownership** — every report has an owner, and that name appears on the report. An ownerless report rots quickly.\n4. **A naming standard** — a rule like `Department - Subject - Frequency` makes searching among 300 reports possible.",
            ),
            quiz({
              id: "q5",
              q: [
                "Metindeki 'rapor çoğalması' (report sprawl) sorunu nasıl tarif ediliyor?",
                "How is the 'report sprawl' problem described in the text?",
              ],
              options: [
                [
                  "İki yılda 300 rapor birikir, hangisinin güncel olduğu bilinmez ve kimse silmeye cesaret edemez",
                  "300 reports accumulate in two years, nobody knows which is current, and nobody dares delete any",
                ],
                ["Raporların hepsi otomatik olarak silinir", "All reports get automatically deleted"],
                [
                  "Yalnızca bir rapor kalır, geri kalanı Power BI tarafından birleştirilir",
                  "Only one report remains, Power BI merges the rest",
                ],
                ["Kullanıcılar rapor oluşturamaz hale gelir", "Users become unable to create reports at all"],
              ],
              answer: 0,
              explain: [
                "Metin bunu 'her şirkette yaşanan aynı hikâye' olarak tanımlar: zamanla birikip hiç temizlenmeyen raporlar, hangisinin doğru olduğunu belirsizleştirir. Bu belirsizlik, aşağıdaki dört önlemin nedenidir.",
                "The text calls it 'the same story every company lives': reports pile up over time and are never cleaned out, making it unclear which one is correct. That uncertainty is exactly why the four measures below exist.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Onaylı (Certified) veya Tanıtılan (Promoted) etiketleri ne işe yarar?",
                "What are Certified or Promoted labels for?",
              ],
              options: [
                [
                  "Kullanıcının hangi veri kümesine güveneceğini görmesini sağlar",
                  "They let users see which dataset to trust",
                ],
                ["Raporu otomatik olarak yeniler", "They automatically refresh the report"],
                ["RLS filtresini devre dışı bırakır", "They disable the RLS filter"],
                ["Raporu Git'e otomatik ekler", "They automatically add the report to Git"],
              ],
              answer: 0,
              explain: [
                "Dört önlemden ilki budur: bir veri kümesini Onaylı veya Tanıtılan olarak işaretlemek, 300 rapor arasında kullanıcının hangi kaynağa güvenebileceğini görsel olarak belirtir.",
                "This is the first of the four measures: marking a dataset Certified or Promoted visually signals to users, among 300 reports, which source they can trust.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Kullanım ölçümüne göre 90 gündür açılmayan bir rapora ne yapılmalı?",
                "According to usage metrics guidance, what should be done with a report unopened for 90 days?",
              ],
              options: [
                ["Arşivlenmeli", "It should be archived"],
                ["Hemen kalıcı olarak silinmeli", "It should be permanently deleted immediately"],
                ["Sahibi değiştirilmeli", "Its owner should be changed"],
                ["Certified olarak işaretlenmeli", "It should be marked Certified"],
              ],
              answer: 0,
              explain: [
                "İkinci önlem kullanım istatistiklerini takip etmektir: 90 gündür kimse açmamışsa rapor arşivlenir — silinmez, ama aktif listeden çıkarılarak rapor çoğalmasının önüne geçilir.",
                "The second measure is tracking usage statistics: if nobody has opened it in 90 days, the report is archived — not deleted, but removed from the active list to curb report sprawl.",
              ],
            }),
            quiz({
              id: "q8",
              q: ["Metne göre sahipsiz bir rapora ne olur?", "According to the text, what happens to an ownerless report?"],
              options: [
                ["Kısa sürede çürür", "It rots quickly"],
                ["Otomatik olarak Certified olur", "It automatically becomes Certified"],
                ["Performansı artar", "Its performance improves"],
                ["Hiçbir şey değişmez, sahiplik önemsizdir", "Nothing changes, ownership is unimportant"],
              ],
              answer: 0,
              explain: [
                "Üçüncü önlem sahipliktir: her raporun bir sahibi olmalı ve bu ad rapor üzerinde görünmeli. Sahipsiz kalan rapor kimin sorumluluğunda olduğu belirsizleştiği için hızla güncelliğini yitirir.",
                "The third measure is ownership: every report should have an owner, and that name should appear on the report. Left ownerless, it becomes unclear who is responsible, and the report quickly goes stale.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Metindeki `Departman - Konu - Sıklık` gibi bir adlandırma kuralı ne sağlar?",
                "What does a naming rule like `Department - Subject - Frequency` from the text provide?",
              ],
              options: [
                ["300 rapor arasında aramayı mümkün kılar", "It makes searching among 300 reports possible"],
                ["Raporun otomatik olarak yenilenmesini sağlar", "It makes the report refresh automatically"],
                ["RLS rollerini otomatik atar", "It automatically assigns RLS roles"],
                ["Raporun performansını doğrudan artırır", "It directly improves the report's performance"],
              ],
              answer: 0,
              explain: [
                "Dördüncü önlem adlandırma standardıdır: tutarlı bir isimlendirme kuralı, yüzlerce rapor arasında doğru olanı aramayı ve bulmayı mümkün kılar.",
                "The fourth measure is a naming standard: a consistent naming rule makes it possible to search for and find the right report among hundreds.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "PBIP biçiminin sağladığı olanaklardan biri olarak metinde ne geçiyor?",
                "Which capability enabled by the PBIP format is mentioned in the text?",
              ],
              options: [
                ["Otomatik yayın hattı (CI/CD) kurulabilmesi", "An automated release pipeline (CI/CD) can be built"],
                ["Raporun otomatik olarak Certified olması", "The report automatically becoming Certified"],
                ["RLS'in tamamen kaldırılması", "RLS being removed entirely"],
                ["Modelin sıkıştırılmadan saklanması", "The model being stored uncompressed"],
              ],
              answer: 0,
              explain: [
                "Metin, PBIP'in gerçek Git farkları, dallanıp birleştirme, kod incelemesi ve son olarak otomatik bir yayın hattı (CI/CD) kurulmasını mümkün kıldığını sayar — bunların hepsi ikili .pbix ile imkânsızdır.",
                "The text lists real Git diffs, branching and merging, code review, and finally an automated release pipeline (CI/CD) as things PBIP enables — none of which are possible with the binary .pbix.",
              ],
            }),
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
