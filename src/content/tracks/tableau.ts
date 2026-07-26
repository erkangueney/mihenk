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
      id: "beginner",
      title: L("Başlangıç — İlk panom", "Beginner — My first dashboard"),
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
      id: "intermediate",
      title: L("Orta — Hesaplamalar ve etkileşim", "Intermediate — Calculations and interactivity"),
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
      id: "advanced",
      title: L("İleri — LOD ve performans", "Advanced — LOD and performance"),
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
  ],
};
