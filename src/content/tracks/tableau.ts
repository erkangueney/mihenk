import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, quiz, text, tip } from "../helpers";

export const tableauTrack: Track = {
  slug: "tableau",
  name: "Tableau",
  category: "bi",
  color: "#f97316",
  icon: "📊",
  tagline: L("Veriyi görsel hikâyeye çevir", "Turn data into a visual story"),
  description: L(
    "Tableau, keşifsel görselleştirmenin standardıdır. Bu patikada veri kaynağı bağlamaktan hesaplanan alanlara, LOD ifadelerinden yayınlanan panolara kadar ilerliyoruz. Her seviye sonunda gerçek bir pano tasarlıyorsun.",
    "Tableau is the standard for exploratory visualisation. This track goes from connecting a data source to calculated fields, LOD expressions and published dashboards. Each level ends with a real dashboard you design.",
  ),
  levels: [
    {
      id: "foundation",
      title: L("Tableau'ya giriş", "Getting started with Tableau"),
      description: L(
        "Boyut, ölçü, raf ve işaret: Tableau'nun dilini öğrenmek.",
        "Dimensions, measures, shelves and marks: learning Tableau's vocabulary.",
      ),
      lessons: [
        lesson({
          slug: "boyut-ve-olcu",
          title: L("Boyut ve ölçü ayrımı", "Dimensions and measures"),
          summary: L(
            "Tableau her sütunu ikiye ayırır. Bu ayrımı anlamadan hiçbir şey yerine oturmaz.",
            "Tableau splits every column in two. Nothing clicks until you understand this split.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Tableau veriye bağlandığında her sütunu otomatik olarak iki kutudan birine koyar:\n\n- **Boyut (Dimension) — mavi** — Kategorik bilgi: şehir, ürün, tarih, müşteri adı. Veriyi **böler**. Görselde eksen etiketi, renk ayrımı, satır/sütun başlığı olur.\n- **Ölçü (Measure) — yeşil** — Sayısal bilgi: tutar, adet, kâr. **Toplanır** (SUM, AVG…). Görselde çubuğun boyu, noktanın konumu olur.\n\nBasit kural: **mavi böler, yeşil ölçer.**\n\nBir alanı sürüklediğinde Tableau'nun ne yapacağını bu renk belirler. Ürün fiyatını yanlışlıkla boyut olarak alırsa her farklı fiyat ayrı bir satır olur; ölçü olarak alırsa toplar. İkisi de bazen doğrudur — hangisini istediğine sen karar verirsin.",
              "When Tableau connects to data it automatically puts each column into one of two boxes:\n\n- **Dimension — blue** — categorical information: city, product, date, customer name. It **splits** the data. In a visual it becomes an axis label, a colour split, a row or column header.\n- **Measure — green** — numeric information: amount, quantity, profit. It gets **aggregated** (SUM, AVG…). In a visual it becomes a bar's length or a point's position.\n\nA simple rule: **blue divides, green measures.**\n\nThis colour decides what Tableau does when you drag a field. If it takes product price as a dimension, every distinct price becomes its own row; as a measure, it sums them. Both are sometimes right — you decide which you want.",
            ),
            text(
              "**İkinci ayrım: sürekli mi ayrık mı?** Renk bunu da anlatır ve boyut/ölçü ile karıştırılmamalıdır:\n\n- **Ayrık (Discrete)** — mavi. Ayrı ayrı **başlıklar** üretir.\n- **Sürekli (Continuous)** — yeşil. Kesintisiz bir **eksen** üretir.\n\nEn çok kafa karıştıran yer tarihlerdir. Bir tarih alanını sürüklediğinde:\n\n- **YIL(Sipariş Tarihi)** ayrıksa → 2022, 2023, 2024 diye ayrı başlıklar\n- **YIL(Sipariş Tarihi)** sürekliyse → kesintisiz bir zaman ekseni, aradaki boş dönemler dâhil\n\nTrend çizmek istiyorsan sürekli, karşılaştırma yapmak istiyorsan ayrık kullanırsın. Alana sağ tıklayıp değiştirebilirsin.",
              "**A second distinction: continuous or discrete?** The colour signals this too, and it must not be confused with dimension/measure:\n\n- **Discrete** — blue. Produces separate **headers**.\n- **Continuous** — green. Produces an unbroken **axis**.\n\nDates are where this confuses people most. When you drag a date field:\n\n- **YEAR(Order Date)** as discrete → separate headers 2022, 2023, 2024\n- **YEAR(Order Date)** as continuous → an unbroken time axis, including empty periods\n\nUse continuous to draw a trend and discrete to compare. Right-click the field to switch.",
            ),
            quiz({
              id: "q1",
              q: [
                "Ürün fiyatı sütununu Tableau otomatik olarak ölçü yapmış ama sen fiyat aralıklarına göre kaç ürün olduğunu saymak istiyorsun. Ne yapmalısın?",
                "Tableau made the product price column a measure, but you want to count products by price band. What do you do?",
              ],
              options: [
                [
                  "Fiyattan bir grup/bin oluşturup boyut olarak kullanmak",
                  "Create a bin or group from price and use it as a dimension",
                ],
                ["Sütunu silmek", "Delete the column"],
                ["Ölçüyü ortalamaya çevirmek", "Change the aggregation to average"],
                ["Bu mümkün değil", "This is not possible"],
              ],
              answer: 0,
              explain: [
                "Sayısal bir alanı kategoriye çevirmenin yolu **bin (kutulama)** oluşturmaktır: alana sağ tıkla → Oluştur → Kutular. Tableau 0-500, 500-1000 gibi aralıklar üretir ve bunlar boyut gibi davranır. Böylece \"her fiyat aralığında kaç ürün var\" sorusunu yanıtlayabilirsin.",
                "The way to turn a numeric field into a category is to create **bins**: right-click the field → Create → Bins. Tableau produces ranges like 0-500 and 500-1000 that behave as a dimension. That lets you answer \"how many products fall in each price band\".",
              ],
            }),
          ],
        }),
        lesson({
          slug: "raflar-ve-isaretler",
          title: L("Raflar ve İşaretler kartı", "Shelves and the Marks card"),
          summary: L(
            "Satır, sütun ve İşaretler kartı: Tableau'da her görselin üretildiği üç yer.",
            "Rows, Columns and the Marks card: the three places every Tableau visual comes from.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Tableau'da grafik türü seçmezsin — **alanları nereye koyduğun** grafiği belirler. Üç ana bölge vardır:\n\n- **Sütunlar rafı** — Yatay eksen\n- **Satırlar rafı** — Dikey eksen\n- **İşaretler kartı** — Geri kalan her şey\n\nİşaretler kartındaki kutular, veriye görsel özellik atar:\n\n- **Renk** — Kategoriye veya değere göre renklendirir\n- **Boyut** — Nokta/çubuk kalınlığı\n- **Etiket** — Görselin üstüne yazılan sayı\n- **Ayrıntı** — Görseli daha ince böler ama görsel özellik vermez\n- **Araç ipucu** — Fare üzerine gelince görünen bilgi\n- **Şekil / Açı / Yol** — İşaret türüne göre değişir\n\nBir çubuk grafiği yapmak için \"çubuk grafiği\" seçmen gerekmez: bir boyutu Sütunlar'a, bir ölçüyü Satırlar'a koyarsan Tableau zaten çubuk çizer.",
              "In Tableau you do not pick a chart type — **where you put the fields** determines the chart. There are three main areas:\n\n- **The Columns shelf** — the horizontal axis\n- **The Rows shelf** — the vertical axis\n- **The Marks card** — everything else\n\nThe boxes on the Marks card assign visual properties to the data:\n\n- **Colour** — colours by category or value\n- **Size** — point or bar thickness\n- **Label** — the number written on the visual\n- **Detail** — splits the visual more finely without assigning a visual property\n- **Tooltip** — what appears on hover\n- **Shape / Angle / Path** — varies with the mark type\n\nYou do not need to choose \"bar chart\" to make one: put a dimension on Columns and a measure on Rows and Tableau already draws bars.",
            ),
            tip(
              "Göster Bana (Show Me) ile başla, sonra terk et",
              "Start with Show Me, then leave it behind",
              "Sağ üstteki **Göster Bana** paneli, seçtiğin alanlara uygun grafik türlerini önerir ve öğrenirken çok işe yarar — hangi alan kombinasyonunun hangi grafiği ürettiğini gösterir.\n\nAma bir süre sonra bırakman gerekir. Göster Bana alanları **kendi bildiği yere** koyar; sen düzenlemek istediğinde kurduğu yapıyı çözmek zorunda kalırsın. Alanları doğrudan raflara sürüklemeyi öğrenmek, Tableau'da akıcılığın başladığı noktadır.",
              "The **Show Me** panel in the top right suggests chart types matching your selected fields, and it is very useful while learning — it shows which field combinations produce which chart.\n\nBut you should leave it behind after a while. Show Me places fields **where it sees fit**, and when you want to adjust something you must first unpick what it built. Learning to drag fields onto the shelves directly is where fluency in Tableau begins.",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir alanı İşaretler kartındaki \"Ayrıntı\" kutusuna koymak ne yapar?",
                "What does putting a field on the \"Detail\" box of the Marks card do?",
              ],
              options: [
                [
                  "Görseli o alana göre daha ince böler ama renk/boyut gibi görsel bir özellik atamaz",
                  "It splits the visual more finely by that field without assigning colour, size or another visual property",
                ],
                ["Alanı etiket olarak yazar", "It writes the field as a label"],
                ["Alanı filtreler", "It filters by the field"],
                ["Hiçbir şey yapmaz", "It does nothing"],
              ],
              answer: 0,
              explain: [
                "Ayrıntı, veri ayrıntı düzeyini (granularity) artırır. Örneğin haritada her şehir için ayrı bir nokta istiyorsan ama şehri renklendirmek istemiyorsan, şehri Ayrıntı'ya koyarsın. Bu, Tableau'da ayrıntı düzeyini kontrol etmenin temel yoludur.",
                "Detail increases the granularity of the marks. If you want a separate point per city on a map but do not want to colour by city, you put city on Detail. It is the fundamental way to control level of detail in Tableau.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "veri-baglantisi-ve-birlestirme",
          title: L("Veri bağlantısı ve tabloları birleştirme", "Connecting data and combining tables"),
          summary: L(
            "Canlı mı çıkarma mı, birleştirme mi ilişki mi? İlk ekranın kararları.",
            "Live or extract, join or relationship? The decisions on the first screen.",
          ),
          minutes: 16,
          blocks: [
            text(
              "**Canlı (Live) mi, Çıkarma (Extract) mı?**\n\n- **Canlı** — Her etkileşimde kaynağa sorgu gider. Veri her zaman güncel, ama hız kaynağın hızına bağlıdır ve kaynağa yük biner.\n- **Çıkarma (.hyper)** — Veri Tableau'nun kendi sıkıştırılmış biçimine kopyalanır. **Çok daha hızlıdır** ve çevrimdışı çalışır; ama yenileme zamanlaman gerekir.\n\nPratikte çoğu rapor çıkarma ile çalışır — Power BI'daki Import kararının tıpatıp aynısıdır: gerçek zamanlılık gerçekten gerekmedikçe çıkarma seç.",
              "**Live or Extract?**\n\n- **Live** — every interaction queries the source. The data is always current, but speed depends on the source and the source carries the load.\n- **Extract (.hyper)** — the data is copied into Tableau's own compressed format. It is **far faster** and works offline; but you must schedule refreshes.\n\nIn practice most reports run on extracts — exactly the same decision as Import in Power BI: choose an extract unless real-time truly matters.",
            ),
            text(
              "**Tabloları birleştirmenin üç yolu** — hangisini seçtiğin sonucu değiştirir:\n\n1. **İlişki (Relationship)** — 2020'de gelen ve artık **varsayılan** olan yöntem. Tabloları birbirine bağlarsın ama Tableau satırları hemen birleştirmez; her görselde **o görselin ihtiyacı kadar** birleştirme yapar. Çoğullama (fan-out) sorununu kendisi yönetir. Şüphedeysen bunu kullan.\n\n2. **Birleştirme (Join)** — Klasik SQL JOIN. Satırlar fiziksel olarak birleşir. Bire-çok ilişkide **değerler çoğalır** ve toplamlar şişer. Ne yaptığını biliyorsan güçlüdür.\n\n3. **Ekleme (Union)** — Aynı yapıdaki tabloları alt alta yığar. Aylık dosyaları birleştirmek için idealdir; joker karakterle (`satis_2024_*.csv`) klasördeki tüm dosyaları otomatik alabilirsin.",
              "**Three ways to combine tables** — and the choice changes the result:\n\n1. **Relationship** — introduced in 2020 and now the **default**. You link tables but Tableau does not merge rows immediately; for each visual it joins **only as much as that visual needs**. It manages the fan-out problem for you. When in doubt, use this.\n\n2. **Join** — the classic SQL JOIN. Rows are physically merged. On a one-to-many relationship **values duplicate** and totals inflate. Powerful when you know what you are doing.\n\n3. **Union** — stacks tables of the same shape on top of each other. Ideal for combining monthly files; with a wildcard (`sales_2024_*.csv`) you can pull in every file in a folder automatically.",
            ),
            pitfall(
              "Join sonrası şişen toplamlar",
              "Totals that inflate after a join",
              "`Siparisler` ile `SiparisKalemleri` tablosunu JOIN edersen, iki kalemli bir sipariş iki satır olur. Şimdi `SUM(Kargo Ücreti)` yazarsan kargo ücretini **iki kez** saymış olursun.\n\nBu hata rapora hiç hata gibi görünmez — sadece sayı fazladır ve genellikle aylar sonra biri \"bu rakam çok yüksek\" dediğinde fark edilir.\n\nTableau'nun **İlişki** modeli tam olarak bu sorunu çözmek için tasarlandı: her ölçüyü kendi tablosunun ayrıntı düzeyinde toplar. Yeni başlıyorsan JOIN yerine İlişki kullan.",
              "Join `Orders` to `OrderLines` and an order with two lines becomes two rows. Write `SUM(Shipping Fee)` now and you have counted the shipping fee **twice**.\n\nThis never looks like an error in the report — the number is simply too high, and it is usually spotted months later when somebody says \"that figure looks high\".\n\nTableau's **Relationship** model was designed to solve exactly this: it aggregates each measure at its own table's granularity. If you are starting out, use Relationships rather than Joins.",
            ),
            quiz({
              id: "q1",
              q: [
                "Her ay klasöre yeni bir `satis_YYYY_MM.csv` dosyası ekleniyor. Hepsini otomatik almanın yolu?",
                "A new `sales_YYYY_MM.csv` lands in a folder each month. How do you pick them all up automatically?",
              ],
              options: [
                [
                  "Joker karakterli Union kurmak (`satis_*.csv`)",
                  "Set up a wildcard Union (`sales_*.csv`)",
                ],
                ["Her dosya için ayrı bağlantı", "A separate connection per file"],
                ["Join kullanmak", "Use a Join"],
                ["Dosyaları elle birleştirmek", "Merge the files by hand"],
              ],
              answer: 0,
              explain: [
                "Union, aynı sütun yapısındaki tabloları alt alta ekler. Joker karakterli union kurduğunda Tableau klasördeki desene uyan tüm dosyaları alır; gelecek ay yeni dosya eklendiğinde yenilemen yeterlidir. Join ise tabloları yan yana birleştirir ve burada yanlış araçtır.",
                "A Union stacks tables with the same column structure. With a wildcard union Tableau picks up every file matching the pattern; next month you simply refresh. A Join combines tables side by side and is the wrong tool here.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "junior",
      title: L("İlk panom", "My first dashboard"),
      description: L(
        "Veri bağlama, boyut/ölçü ayrımı, temel grafikler ve filtreler.",
        "Connecting data, dimensions vs measures, core chart types and filters.",
      ),
      projectSlug: "tableau-satis-panosu",
      lessons: [
        lesson({
          slug: "tableau-temelleri",
          title: L("Tableau'nun mantığı: boyut ve ölçü", "How Tableau thinks: dimensions and measures"),
          summary: L(
            "Tableau'yu anlamanın anahtarı tek bir ayrımda: neyi bölüyorsun, neyi topluyorsun?",
            "Understanding Tableau comes down to one distinction: what you slice by, and what you aggregate.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Tableau her alanı iki gruba ayırır:\n\n- **Boyut (Dimension)** — kategorik, veriyi **böler**: şehir, kategori, tarih, müşteri adı. Mavi renkle gösterilir.\n- **Ölçü (Measure)** — sayısal, **toplanır**: ciro, adet, kâr. Yeşil renkle gösterilir.\n\nBir görselleştirme aslında şu cümledir: *\"Şu ölçüyü, şu boyutlara göre göster.\"*",
              "Tableau splits every field into two groups:\n\n- **Dimension** — categorical, it **slices** the data: city, category, date, customer name. Shown in blue.\n- **Measure** — numeric, it **aggregates**: revenue, quantity, profit. Shown in green.\n\nEvery visualisation is really one sentence: *\"Show this measure, broken down by these dimensions.\"*",
            ),
            text(
              "İkinci ayrım **sürekli (continuous, yeşil)** ve **ayrık (discrete, mavi)** arasındadır. Bu, alanın türünden değil onu nasıl kullandığından gelir:\n\n- Ayrık alan → **başlık** (header) üretir, eksende ayrı kutular olur.\n- Sürekli alan → **eksen** (axis) üretir, kesintisiz bir çizgi olur.\n\nAynı `Sipariş Tarihi` alanını ayrık `YEAR` olarak kullanırsan yıl başlıkları, sürekli olarak kullanırsan zaman ekseni elde edersin.",
              "The second distinction is **continuous (green)** vs **discrete (blue)**. It comes from how you use the field, not from its type:\n\n- Discrete → produces **headers**, separate buckets along the shelf.\n- Continuous → produces an **axis**, an unbroken scale.\n\nUse the same `Order Date` as a discrete `YEAR` and you get year headers; use it as continuous and you get a time axis.",
            ),
            info(
              "Show Me'ye güvenme, önce soruyu sor",
              "Do not lean on Show Me; ask the question first",
              "Tableau'nun *Show Me* paneli hızlıdır ama seni grafik türünü seçmeye zorlar. Doğru sıra tersidir: önce cevaplamak istediğin soruyu bir cümleyle yaz (\"hangi kategori aydan aya en çok büyüdü?\"), sonra bu cümleye uyan görseli kur. Soru netse grafik türü zaten kendini seçer.",
              "Tableau's *Show Me* panel is fast, but it pushes you to pick a chart type first. The right order is the reverse: write the question you want answered in one sentence (\"which category grew fastest month over month?\"), then build the view that answers it. With a clear question the chart type picks itself.",
            ),
            quiz({
              id: "q1",
              q: [
                "`Sipariş Tarihi` alanını sütuna sürükleyip ayrık `YEAR` olarak ayarlarsan ne elde edersin?",
                "If you drop `Order Date` on Columns as a discrete `YEAR`, what do you get?",
              ],
              options: [
                ["Her yıl için ayrı bir başlık (kutu)", "A separate header (bucket) for each year"],
                ["Kesintisiz bir zaman ekseni", "A continuous time axis"],
                ["Yıl bazında filtre", "A filter by year"],
                ["Otomatik bir trend çizgisi", "An automatic trend line"],
              ],
              answer: 0,
              explain: [
                "Ayrık alanlar başlık üretir; her yıl kendi kutusunda durur. Sürekli olarak kullanırsan (yeşil) kesintisiz bir eksen ve doğal olarak çizgi grafiği elde edersin.",
                "Discrete fields produce headers, so each year gets its own bucket. Used as continuous (green) you get an unbroken axis and, naturally, a line chart.",
              ],
            }),
            order({
              id: "o1",
              prompt: [
                "Tableau'da sıfırdan bir çubuk grafik kurmanın adımlarını sıraya diz.",
                "Order the steps for building a bar chart in Tableau from scratch.",
              ],
              lines: [
                "Veri kaynağına bağlan (Connect to Data)",
                "Alan tiplerini kontrol et: boyut mu ölçü mü, tarih doğru tanınmış mı",
                "Boyutu (Kategori) Rows rafına sürükle",
                "Ölçüyü (Satış) Columns rafına sürükle",
                "Sort düğmesiyle çubukları büyükten küçüğe sırala",
                "Ölçüyü Label rafına da bırakıp değerleri çubuk üstünde göster",
                "Sayfaya anlamlı bir başlık yaz",
              ],
            }),
          ],
        }),
        lesson({
          slug: "grafik-secimi",
          title: L("Doğru grafiği seçmek", "Choosing the right chart"),
          summary: L(
            "Grafik türü estetik bir tercih değil, sorunun türünün sonucudur.",
            "Chart type is not an aesthetic choice; it follows from the type of question.",
          ),
          minutes: 13,
          blocks: [
            text(
              "Soruyu grafiğe eşleyen kısa tablo:\n\n- **Karşılaştırma** (hangisi daha çok?) → yatay çubuk\n- **Zaman içinde değişim** → çizgi\n- **Bütünün parçaları** → yığılmış çubuk veya treemap (pasta değil)\n- **İlişki / korelasyon** → dağılım grafiği\n- **Dağılım** (değerler nasıl yayılmış?) → histogram, kutu grafiği\n- **Coğrafya** → harita\n- **İki kategorik boyutun kesişimi** → ısı haritası",
              "A short map from question to chart:\n\n- **Comparison** (which is bigger?) → horizontal bar\n- **Change over time** → line\n- **Parts of a whole** → stacked bar or treemap (not pie)\n- **Relationship / correlation** → scatter plot\n- **Distribution** (how are values spread?) → histogram, box plot\n- **Geography** → map\n- **Two categorical dimensions crossed** → heatmap",
            ),
            pitfall(
              "Pasta grafiğinin sorunu",
              "The problem with pie charts",
              "İnsan gözü açıyı uzunluktan çok daha kötü karşılaştırır. 3 dilimden fazlası olan bir pasta, aynı veriyi gösteren çubuk grafikten her zaman daha zor okunur. Yüzdeleri mutlaka göstermen gerekiyorsa yatay çubuk kullan ve etiketleri çubuk sonuna yaz.",
              "The human eye compares angles far worse than lengths. A pie with more than three slices is always harder to read than the equivalent bar chart. If you must show percentages, use horizontal bars and put the labels at the end of each bar.",
            ),
            text(
              "Panonun okunabilirliğini artıran dört küçük karar:\n\n1. Çubukları **sırala** — alfabetik sıra neredeyse hiçbir zaman doğru sıra değildir.\n2. Ekseni **sıfırdan başlat** — çubuk grafikte kesilmiş eksen farkı abartır.\n3. Ondalıkları **kırp** — `1.899.234,56 TL` yerine `1,9 Mn TL`.\n4. Izgara çizgilerini ve kenarlıkları **azalt** — mürekkebi veriye ayır.",
              "Four small decisions that make a dashboard readable:\n\n1. **Sort** the bars — alphabetical is almost never the right order.\n2. **Start the axis at zero** — a truncated axis exaggerates differences in a bar chart.\n3. **Round** the numbers — `1,899,234.56` becomes `1.9M`.\n4. **Reduce** gridlines and borders — spend your ink on the data.",
            ),
            quiz({
              id: "q1",
              q: [
                "Reklam harcaması ile satış arasında ilişki olup olmadığını göstermek istiyorsun. Hangi grafik?",
                "You want to show whether ad spend relates to sales. Which chart?",
              ],
              options: [
                ["Dağılım grafiği (scatter)", "Scatter plot"],
                ["Yığılmış çubuk", "Stacked bar"],
                ["Pasta", "Pie"],
                ["Treemap", "Treemap"],
              ],
              answer: 0,
              explain: [
                "İki sürekli değişken arasındaki ilişkiyi gösteren tek doğal grafik dağılım grafiğidir. Üstüne bir trend çizgisi ekleyip R² değerini gösterirsen iddian ölçülebilir hale gelir.",
                "A scatter plot is the natural chart for the relationship between two continuous variables. Add a trend line and show R² and your claim becomes measurable.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "mid",
      title: L("Hesaplamalar ve etkileşim", "Calculations and interactivity"),
      description: L(
        "Hesaplanan alanlar, parametreler, tablo hesaplamaları ve pano etkileşimi.",
        "Calculated fields, parameters, table calculations and dashboard interactivity.",
      ),
      projectSlug: "tableau-kpi-panosu",
      lessons: [
        lesson({
          slug: "hesaplanan-alanlar",
          title: L("Hesaplanan alanlar ve tablo hesaplamaları", "Calculated fields and table calculations"),
          summary: L(
            "Veride olmayan metriği üret: kâr marjı, yıllık büyüme, hedefe uzaklık.",
            "Create the metric your data lacks: margin, year-over-year growth, distance to target.",
          ),
          minutes: 17,
          blocks: [
            text(
              "**Hesaplanan alan**, satır düzeyinde veya toplama düzeyinde yeni bir alan üretir. **Tablo hesaplaması** ise görselde zaten görünen değerler üzerinden çalışır — bu ayrım Tableau'da en çok karıştırılan konudur.",
              "A **calculated field** creates a new field at row level or aggregate level. A **table calculation** works on the values already displayed in the view — this distinction is the most-confused topic in Tableau.",
            ),
            code(
              "dax",
              `// Satır düzeyi hesaplama
[Kâr] / [Satış]

// Toplama düzeyi — doğru marj hesabı
SUM([Kâr]) / SUM([Satış])

// Koşullu
IF SUM([Satış]) > 100000 THEN "Hedef üstü"
ELSEIF SUM([Satış]) > 50000 THEN "Hedefe yakın"
ELSE "Hedef altı"
END

// Tarih
DATEDIFF('day', [Sipariş Tarihi], [Teslim Tarihi])`,
              "Tableau hesaplama söz dizimi",
              "Tableau calculation syntax",
            ),
            pitfall(
              "Ortalamaların ortalaması",
              "The average of averages",
              "`AVG([Kâr]/[Satış])` ile `SUM([Kâr])/SUM([Satış])` **farklı sayılardır**. İlki her satırın marjını hesaplayıp bunların ortalamasını alır ve küçük siparişlere büyükler kadar ağırlık verir. Doğru toplam marj daima ikincisidir. Bu hata, yönetim raporlarındaki en sık sessiz hatadır.",
              "`AVG([Profit]/[Sales])` and `SUM([Profit])/SUM([Sales])` are **different numbers**. The first computes a margin per row and averages them, weighting a tiny order the same as a huge one. The correct overall margin is always the second. This is the most common silent error in management reporting.",
            ),
            text(
              "Tablo hesaplamaları (`Quick Table Calculation`) görseldeki sıraya bağlıdır: kümülatif toplam, yüzde fark, sıralama, hareketli ortalama. Her birinde **\"Compute Using\"** ayarı sonucun ne olacağını belirler — tablo boyunca mı, panel içinde mi, hücre bazında mı?",
              "Table calculations (`Quick Table Calculation`) depend on the layout of the view: running total, percent difference, rank, moving average. For each one the **\"Compute Using\"** setting decides the result — across the table, down a pane, or per cell?",
            ),
            quiz({
              id: "q1",
              q: [
                "Genel kâr marjını doğru hesaplayan ifade hangisidir?",
                "Which expression computes the overall profit margin correctly?",
              ],
              options: [
                ["`SUM([Kâr]) / SUM([Satış])`", "`SUM([Profit]) / SUM([Sales])`"],
                ["`AVG([Kâr] / [Satış])`", "`AVG([Profit] / [Sales])`"],
                ["`SUM([Kâr] / [Satış])`", "`SUM([Profit] / [Sales])`"],
                ["`AVG([Kâr]) / AVG([Satış])`", "`AVG([Profit]) / AVG([Sales])`"],
              ],
              answer: 0,
              explain: [
                "Önce toplam kârı ve toplam satışı bul, sonra böl. Satır bazında oran alıp ortalama almak, küçük ve büyük siparişlere eşit ağırlık verdiği için işletme gerçeğini yansıtmaz.",
                "Sum profit, sum sales, then divide. Taking per-row ratios and averaging them gives a small order the same weight as a large one, which does not reflect the business.",
              ],
              xp: 20,
            }),
          ],
        }),
        lesson({
          slug: "pano-tasarimi",
          title: L("Pano tasarımı ve etkileşim", "Dashboard design and interactivity"),
          summary: L(
            "Bir pano rapor değildir; bir karar aracıdır. Buna göre tasarla.",
            "A dashboard is not a report; it is a decision tool. Design it accordingly.",
          ),
          minutes: 16,
          blocks: [
            text(
              "İyi bir pano tek bir soruyla başlar: **\"Bunu kim, hangi kararı vermek için açacak?\"** Cevap yoksa pano da olmaz, sadece grafik yığını olur.\n\nYerleşim kuralı: en önemli metrik **sol üstte**. Batı dillerinde göz oradan başlar. Detay ve dökümler aşağıya iner.",
              "A good dashboard starts with one question: **\"Who opens this, and to make which decision?\"** Without an answer you do not have a dashboard, just a pile of charts.\n\nLayout rule: the most important metric goes **top-left**. In left-to-right languages that is where the eye lands. Detail and breakdowns move down the page.",
            ),
            text(
              "Etkileşim araçları:\n\n- **Filter Action** — bir görselde tıklanan öğe diğerlerini filtreler\n- **Highlight Action** — filtrelemek yerine ilgili öğeleri vurgular\n- **Parametre** — kullanıcının metriği veya eşiği seçmesini sağlar\n- **Dashboard Container** — mobil düzen için yerleşimi gruplar",
              "Interaction tools:\n\n- **Filter Action** — clicking a mark in one view filters the others\n- **Highlight Action** — highlights related marks instead of filtering\n- **Parameter** — lets the user pick a metric or a threshold\n- **Dashboard Container** — groups layout for responsive/mobile design",
            ),
            tip(
              "Mobil düzeni ayrıca tasarla",
              "Design the phone layout separately",
              "Tableau'da `Device Preview` ile telefon düzeni ayrı kaydedilir. Masaüstünde yan yana duran üç grafik telefonda alt alta inmeli, filtre paneli üste taşınmalı ve metin boyutları büyütülmeli. Panolarını yöneticiler çoğunlukla telefondan açar — bu adımı atlamak, panonun kullanılmamasının en yaygın sebebidir.",
              "Tableau saves a separate phone layout via `Device Preview`. Three charts side by side on desktop should stack vertically on a phone, filters move to the top, and font sizes go up. Executives mostly open dashboards on their phone — skipping this step is the most common reason a dashboard goes unused.",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir panoda en fazla kaç KPI kartı olmalı (genel kabul gören pratik)?",
                "How many KPI tiles should a dashboard have (commonly accepted practice)?",
              ],
              options: [
                ["3–5", "3–5"],
                ["10–15", "10–15"],
                ["Sınır yok, ne kadar çok o kadar iyi", "No limit, the more the better"],
                ["Tam 1", "Exactly 1"],
              ],
              answer: 0,
              explain: [
                "3–5 KPI, kullanıcının bir bakışta kavrayabileceği sınırdır. Her ek metrik dikkati böler ve panonun asıl mesajını zayıflatır. Kalan metrikler ikinci sayfaya veya detay görünümüne taşınır.",
                "3–5 KPIs is what someone can absorb at a glance. Every extra metric splits attention and dilutes the dashboard's message. Move the rest to a second page or a detail view.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "senior",
      title: L("LOD ve performans", "LOD and performance"),
      description: L(
        "Level of Detail ifadeleri, veri kaynağı stratejisi ve büyük veri setinde hızlı panolar.",
        "Level of Detail expressions, data source strategy and fast dashboards on large data.",
      ),
      projectSlug: "tableau-yonetici-panosu",
      lessons: [
        lesson({
          slug: "lod-ifadeleri",
          title: L("LOD ifadeleri: FIXED, INCLUDE, EXCLUDE", "LOD expressions: FIXED, INCLUDE, EXCLUDE"),
          summary: L(
            "Görselin ayrıntı düzeyinden bağımsız hesap yapmanın yolu.",
            "How to compute at a detail level different from the one in the view.",
          ),
          minutes: 18,
          blocks: [
            text(
              "Normalde Tableau, hesaplamayı görseldeki ayrıntı düzeyinde yapar. LOD ifadeleri bu düzeyi **açıkça** belirtmeni sağlar:\n\n- **FIXED** — görseldeki boyutları yok sayar, sadece belirttiklerini kullanır\n- **INCLUDE** — görseldekilere ek boyut katar\n- **EXCLUDE** — görseldekilerden boyut çıkarır",
              "Normally Tableau computes at the view's level of detail. LOD expressions let you state that level **explicitly**:\n\n- **FIXED** — ignores the view's dimensions and uses only the ones you name\n- **INCLUDE** — adds a dimension on top of the view's\n- **EXCLUDE** — removes a dimension from the view's",
            ),
            code(
              "dax",
              `// Müşteri başına toplam satış — görselde hangi boyut olursa olsun
{ FIXED [Müşteri ID] : SUM([Satış]) }

// Müşterinin ilk sipariş tarihi (kohort analizinin temeli)
{ FIXED [Müşteri ID] : MIN([Sipariş Tarihi]) }

// Kategori içindeki payı
SUM([Satış]) / { EXCLUDE [Alt Kategori] : SUM([Satış]) }

// Sipariş başına ortalama, ürün detayı görselde olsa bile
{ INCLUDE [Sipariş ID] : SUM([Satış]) }`,
            ),
            info(
              "FIXED filtreden önce çalışır",
              "FIXED runs before dimension filters",
              "Tableau'nun işlem sırasında `FIXED` LOD, **boyut filtrelerinden önce** hesaplanır. Yani rafta bir yıl filtresi olsa bile `{FIXED [Müşteri]: SUM([Satış])}` tüm yılları kapsar. Filtrenin LOD'a işlemesini istiyorsan filtreyi **Context Filter** yap (sağ tık → Add to Context).",
              "In Tableau's order of operations a `FIXED` LOD is computed **before** dimension filters. So even with a year filter on the shelf, `{FIXED [Customer]: SUM([Sales])}` spans every year. To make the filter apply, promote it to a **Context Filter** (right-click → Add to Context).",
            ),
            quiz({
              id: "q1",
              q: [
                "Her müşterinin **ilk sipariş tarihini** bulup kohort oluşturmak için hangi ifade?",
                "Which expression finds each customer's **first order date** for cohort analysis?",
              ],
              options: [
                ["`{ FIXED [Müşteri ID] : MIN([Sipariş Tarihi]) }`", "`{ FIXED [Customer ID] : MIN([Order Date]) }`"],
                ["`MIN([Sipariş Tarihi])`", "`MIN([Order Date])`"],
                ["`{ INCLUDE [Sipariş ID] : MIN([Sipariş Tarihi]) }`", "`{ INCLUDE [Order ID] : MIN([Order Date]) }`"],
                ["`WINDOW_MIN(MIN([Sipariş Tarihi]))`", "`WINDOW_MIN(MIN([Order Date]))`"],
              ],
              answer: 0,
              explain: [
                "`FIXED [Müşteri ID]` hesabı müşteri düzeyine sabitler; görselde ay, kategori ne olursa olsun her müşterinin ilk tarihi aynı kalır. Kohort analizinin ilk adımı tam olarak budur.",
                "`FIXED [Customer ID]` pins the calculation to customer level, so each customer's first date stays the same no matter what the view shows. That is exactly step one of cohort analysis.",
              ],
              xp: 25,
            }),
          ],
        }),
        lesson({
          slug: "performans",
          title: L("Pano performansı", "Dashboard performance"),
          summary: L(
            "Yavaş açılan pano, kullanılmayan panodur. Hız bir tasarım kararıdır.",
            "A slow dashboard is an unused dashboard. Speed is a design decision.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Performansı belirleyen kararlar, çoğunlukla görselde değil veri katmanındadır:\n\n1. **Extract kullan** — canlı bağlantı yerine Hyper extract çoğu senaryoda kat kat hızlıdır.\n2. **Gereksiz sütunları at** — extract'e yalnızca kullandığın alanları al.\n3. **Filtreyi kaynağa it** — Data Source Filter, extract oluşurken uygulanır.\n4. **Görsel sayısını azalt** — her görsel ayrı bir sorgudur; 12 görselli pano 12 sorgu demektir.\n5. **Hızlı filtre yerine parametre** — \"Only Relevant Values\" ayarı her etkileşimde ek sorgu üretir.",
              "The decisions that drive performance mostly live in the data layer, not the view:\n\n1. **Use an extract** — a Hyper extract beats a live connection in most scenarios.\n2. **Drop unused columns** — only bring the fields you actually use into the extract.\n3. **Push filters to the source** — a Data Source Filter is applied while the extract is built.\n4. **Fewer views** — every view is its own query; a 12-view dashboard means 12 queries.\n5. **Parameters over quick filters** — \"Only Relevant Values\" fires an extra query on every interaction.",
            ),
            tip(
              "Performance Recorder",
              "Performance Recorder",
              "Tableau Desktop'ta `Help → Settings and Performance → Start Performance Recording` ile hangi görselin kaç saniye sürdüğünü satır satır görürsün. Tahmin etmek yerine ölç: neredeyse her zaman süreyi tek bir görsel veya tek bir hesaplama yiyordur.",
              "In Tableau Desktop, `Help → Settings and Performance → Start Performance Recording` shows you second by second which view costs what. Measure instead of guessing: almost always a single view or a single calculation is eating the time.",
            ),
          ],
        }),
      ],
    },
    {
      id: "expert",
      title: L("Kurumsal Tableau", "Enterprise Tableau"),
      description: L(
        "Yayınlanan veri kaynakları, yönetişim ve ekipçe sürdürülebilir analitik.",
        "Published data sources, governance and analytics a team can sustain.",
      ),
      lessons: [
        lesson({
          slug: "yayinlanan-veri-kaynaklari",
          title: L("Yayınlanan veri kaynakları", "Published data sources"),
          summary: L(
            "Her analistin kendi bağlantısını kurması neden felakete gider?",
            "Why does letting every analyst build their own connection end badly?",
          ),
          minutes: 16,
          blocks: [
            text(
              "Tableau'da her çalışma kitabı kendi veri bağlantısını taşıyabilir. Kolaydır — ve bu kolaylık, on kişilik bir ekipte on farklı \"ciro\" tanımına yol açar.\n\n**Yayınlanan veri kaynağı (published data source)** bunu çözer: bir kişi bağlantıyı, birleştirmeleri, hesaplanan alanları, klasörleri ve biçimlendirmeyi kurar ve Tableau Server/Cloud'a **veri kaynağı olarak** yayınlar. Diğerleri buna bağlanıp yalnızca görsel tasarlar.\n\nKazançlar:\n\n- **Tek tanım** — \"Net Ciro\" hesaplanan alanı bir yerde durur\n- **Merkezi yenileme** — çıkarma bir kez yenilenir, herkes yararlanır\n- **Erişim kontrolü** — kimin hangi veriyi göreceği tek yerden yönetilir\n- **Değişiklik tek noktadan** — kaynak şeması değişirse bir yeri düzeltirsin",
              "In Tableau every workbook can carry its own data connection. That is easy — and the ease produces ten different definitions of \"revenue\" in a team of ten.\n\nA **published data source** fixes this: one person builds the connection, the joins, the calculated fields, the folders and the formatting, then publishes it to Tableau Server/Cloud **as a data source**. Everyone else connects to it and designs only visuals.\n\nWhat you gain:\n\n- **One definition** — the \"Net Revenue\" calculated field lives in one place\n- **Central refresh** — the extract refreshes once and everyone benefits\n- **Access control** — who sees which data is managed in one place\n- **Single-point change** — when the source schema changes you fix one thing",
            ),
            text(
              "**Veri kaynağını kullanılabilir kılmak** — yayınlamadan önce yapılacaklar:\n\n1. **Alanları yeniden adlandır.** `cust_id_fk` değil `Müşteri No`. Kullanıcı veritabanı sütun adlarını bilmek zorunda değil.\n2. **Klasörlere ayır.** Müşteri, Ürün, Sipariş, Hesaplamalar gibi. 80 alanlı düz bir liste kimsenin işine yaramaz.\n3. **Kullanılmayanları gizle.** Teknik anahtarları ve ara sütunları gizle; görünen alan sayısı ne kadar azsa o kadar kullanılır.\n4. **Varsayılan biçimleri ayarla.** Para birimi, ondalık basamak, tarih biçimi bir kez ayarlanır ve her raporda doğru gelir.\n5. **Açıklama ekle.** Her alana açıklama yazabilirsin; kullanıcı fareyle üzerine gelince görür.\n\nBu beş adım yarım saat sürer ve veri kaynağının kullanılıp kullanılmayacağını belirler.",
              "**Making a data source usable** — what to do before publishing:\n\n1. **Rename the fields.** `Customer No`, not `cust_id_fk`. Users should not have to know database column names.\n2. **Group into folders.** Customer, Product, Order, Calculations. A flat list of 80 fields helps nobody.\n3. **Hide what is unused.** Hide technical keys and intermediate columns; the fewer visible fields, the more it gets used.\n4. **Set default formats.** Currency, decimal places and date format are set once and come out right in every report.\n5. **Add descriptions.** You can write a description on each field; users see it on hover.\n\nThese five steps take half an hour and decide whether the data source gets used at all.",
            ),
            quiz({
              id: "q1",
              q: [
                "Yayınlanan veri kaynağının en büyük kurumsal faydası nedir?",
                "What is the biggest organisational benefit of a published data source?",
              ],
              options: [
                [
                  "Hesaplanan alanlar ve tanımlar tek yerde durur; herkes aynı sayıyı görür",
                  "Calculated fields and definitions live in one place, so everyone sees the same number",
                ],
                ["Dosya boyutu küçülür", "Workbook files get smaller"],
                ["Grafikler daha güzel olur", "Charts look better"],
                ["Lisans maliyeti düşer", "Licence costs fall"],
              ],
              answer: 0,
              explain: [
                "Herkes kendi bağlantısını kurduğunda \"aktif müşteri\" veya \"net ciro\" gibi tanımlar sessizce birbirinden ayrışır ve toplantılarda hangi sayının doğru olduğu tartışılır. Yayınlanan veri kaynağı bu tartışmayı mimari düzeyde ortadan kaldırır.",
                "When everyone builds their own connection, definitions like \"active customer\" or \"net revenue\" quietly diverge and meetings turn into arguments about which number is right. A published data source removes that argument at the architectural level.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "tableau-yonetisim",
          title: L("Yönetişim ve içerik yaşam döngüsü", "Governance and the content lifecycle"),
          summary: L(
            "İki yılda biriken 400 çalışma kitabı nasıl yönetilir — veya nasıl önlenir?",
            "How do you manage 400 workbooks accumulated over two years — or prevent them?",
          ),
          minutes: 16,
          blocks: [
            text(
              "Tableau ortamları kontrolsüz büyür. Tipik ilerleme: ilk yıl 30 çalışma kitabı, ikinci yıl 200, üçüncü yıl kimse hangisinin doğru olduğunu bilmiyor.\n\n**Projeler (Projects)** bunun ilk savunmasıdır. Tableau Server'da içerik projelere ayrılır; her projenin izinleri ayrı yönetilir. Sağlıklı bir yapı genelde şöyledir:\n\n- **Sertifikalı** — Onaylanmış, güvenilir içerik. Yalnızca veri ekibi yayınlayabilir.\n- **Departman projeleri** — Satış, Finans, Pazarlama. Departman analistleri yayınlar.\n- **Kişisel korumalı alan (sandbox)** — Herkes deneyebilir; buradan kimse rapor paylaşmaz.\n\nİçerik önce sandbox'ta doğar, olgunlaşınca departmana, kanıtlanınca sertifikalıya terfi eder.",
              "Tableau environments grow without control. The typical progression: 30 workbooks in year one, 200 in year two, and by year three nobody knows which is correct.\n\n**Projects** are the first line of defence. Content on Tableau Server is split into projects, each with its own permissions. A healthy structure usually looks like this:\n\n- **Certified** — approved, trusted content. Only the data team may publish here.\n- **Departmental projects** — Sales, Finance, Marketing. Departmental analysts publish here.\n- **Personal sandbox** — anyone may experiment; nobody shares reports from here.\n\nContent is born in the sandbox, moves to a department as it matures, and is promoted to Certified once proven.",
            ),
            text(
              "**Ölçmeden yönetemezsin.** Tableau Server'ın kendi yönetim görünümleri (Admin Views) şunları söyler:\n\n- Hangi çalışma kitabı kaç kez açılmış\n- Hangi kitaplar aylardır hiç açılmamış\n- Hangi çıkarma yenilemeleri başarısız oluyor\n- Kim ne kadar kaynak tüketiyor\n\nBu verilerle basit ama etkili bir yaşam döngüsü kurabilirsin: **90 gün açılmayan içerik arşivlenir, 180 gün sonra silinir.** Sahibine önceden e-posta gider, itiraz ederse kalır.\n\nBu politika ilk bakışta sert görünür ama alternatifi daha kötüdür: kimsenin güvenmediği, hiçbirinin bakımı yapılmayan yüzlerce rapor. Kural, silmek değil **sahiplenmeye zorlamaktır**.",
              "**You cannot manage what you do not measure.** Tableau Server's own Admin Views tell you:\n\n- how many times each workbook was opened\n- which workbooks have not been opened in months\n- which extract refreshes are failing\n- who is consuming how much capacity\n\nWith that data you can run a simple but effective lifecycle: **content unopened for 90 days is archived and deleted after 180.** The owner is emailed in advance and can object to keep it.\n\nThe policy looks harsh at first, but the alternative is worse: hundreds of reports nobody trusts and nobody maintains. The rule is not really about deleting — it is about **forcing ownership**.",
            ),
            quiz({
              id: "q1",
              q: [
                "Analistlerin deneme amaçlı çalışmalarını nerede tutmaları gerekir?",
                "Where should analysts keep their experimental work?",
              ],
              options: [
                [
                  "Kişisel korumalı alanda (sandbox) — buradan kimseye rapor paylaşılmaz",
                  "In a personal sandbox — nothing is shared with others from there",
                ],
                ["Sertifikalı projede", "In the Certified project"],
                ["Kendi bilgisayarında", "On their own computer"],
                ["Departman projesinde", "In the departmental project"],
              ],
              answer: 0,
              explain: [
                "Sandbox, denemenin güvenli yeridir: kimse yanlışlıkla yarım kalmış bir raporu gerçek sanıp kullanmaz. Kendi bilgisayarında tutmak da yanlıştır — kişi ayrıldığında iş kaybolur ve yedeklenmez. İçeriğin olgunluk düzeyi ile bulunduğu yer örtüşmelidir.",
                "The sandbox is the safe place to experiment: nobody mistakes a half-finished report for a real one. Keeping work on a personal computer is also wrong — when the person leaves, the work disappears and was never backed up. Where content lives should match how mature it is.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
