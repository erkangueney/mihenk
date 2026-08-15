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
            quiz({
              id: "q2",
              q: [
                "Bir sütun Tableau'da mavi renkle gösteriliyor. Bu ne anlama gelir?",
                "A column is shown in blue in Tableau. What does that mean?",
              ],
              options: [
                [
                  "Kategorik bir boyuttur ve veriyi böler",
                  "It's a categorical dimension and it splits the data",
                ],
                [
                  "Sayısal bir ölçüdür ve toplanır",
                  "It's a numeric measure and gets aggregated",
                ],
                ["Alan gizlenmiştir", "The field is hidden"],
                ["Alan hesaplanmış bir alandır", "The field is a calculated field"],
              ],
              answer: 0,
              explain: [
                "Mavi renk boyutu (dimension) gösterir: şehir, ürün, tarih gibi kategorik bilgi. Yeşil renk ise ölçüyü (measure) gösterir ve toplanır. \"Mavi böler, yeşil ölçer\" kuralını hatırla.",
                "Blue marks a dimension: categorical information like city, product or date. Green marks a measure, which gets aggregated. Remember the rule: blue divides, green measures.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`Müşteri Adı` sütununu sürüklediğinde Tableau bunu boyut olarak mı ölçü olarak mı ele alır?",
                "When you drag `Customer Name`, does Tableau treat it as a dimension or a measure?",
              ],
              options: [
                ["Boyut — kategorik bilgi olduğu için", "Dimension — because it is categorical information"],
                ["Ölçü — toplanabildiği için", "Measure — because it can be aggregated"],
                ["İkisi de değil, ayrı bir kategoridir", "Neither — it's a separate category"],
                [
                  "Kullanıcı her seferinde elle seçmelidir",
                  "The user must choose manually every time",
                ],
              ],
              answer: 0,
              explain: [
                "Müşteri adı sayısal değildir, toplanamaz; her değer kendi başına bir kategoridir. Bu yüzden Tableau onu otomatik olarak boyut (mavi) yapar.",
                "A customer name is not numeric and cannot be summed; each value is its own category. That is why Tableau automatically makes it a dimension (blue).",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`Satış Tutarı` sütununu Satırlar rafına sürüklediğinde Tableau varsayılan olarak ne yapar?",
                "When you drag `Sales Amount` onto Rows, what does Tableau do by default?",
              ],
              options: [
                ["SUM ile toplar çünkü sayısal bir ölçüdür", "Sums it with SUM because it's a numeric measure"],
                ["Her satırı ayrı ayrı listeler", "Lists each row separately"],
                ["Otomatik olarak ortalamasını alır", "Automatically takes the average"],
                ["Alanı bir boyuta çevirir", "Converts the field into a dimension"],
              ],
              answer: 0,
              explain: [
                "Sayısal alanlar ölçü olarak gelir ve Tableau'nun varsayılan toplaması SUM'dır. Farklı bir toplama istiyorsan (AVG, COUNT…) alana sağ tıklayıp Measure (Toplama) menüsünden değiştirirsin.",
                "Numeric fields arrive as measures and Tableau's default aggregation is SUM. If you want a different aggregation (AVG, COUNT…) right-click the field and change it from the Measure menu.",
              ],
            }),
            text(
              "**İkinci ayrım: sürekli mi ayrık mı?** Renk bunu da anlatır ve boyut/ölçü ile karıştırılmamalıdır:\n\n- **Ayrık (Discrete)** — mavi. Ayrı ayrı **başlıklar** üretir.\n- **Sürekli (Continuous)** — yeşil. Kesintisiz bir **eksen** üretir.\n\nEn çok kafa karıştıran yer tarihlerdir. Bir tarih alanını sürüklediğinde:\n\n- **YIL(Sipariş Tarihi)** ayrıksa → 2022, 2023, 2024 diye ayrı başlıklar\n- **YIL(Sipariş Tarihi)** sürekliyse → kesintisiz bir zaman ekseni, aradaki boş dönemler dâhil\n\nTrend çizmek istiyorsan sürekli, karşılaştırma yapmak istiyorsan ayrık kullanırsın. Alana sağ tıklayıp değiştirebilirsin.",
              "**A second distinction: continuous or discrete?** The colour signals this too, and it must not be confused with dimension/measure:\n\n- **Discrete** — blue. Produces separate **headers**.\n- **Continuous** — green. Produces an unbroken **axis**.\n\nDates are where this confuses people most. When you drag a date field:\n\n- **YEAR(Order Date)** as discrete → separate headers 2022, 2023, 2024\n- **YEAR(Order Date)** as continuous → an unbroken time axis, including empty periods\n\nUse continuous to draw a trend and discrete to compare. Right-click the field to switch.",
            ),
            quiz({
              id: "q5",
              q: [
                "`YIL(Sipariş Tarihi)` alanını sürekli (continuous, yeşil) olarak ayarlarsan görselde ne olur?",
                "If you set `YEAR(Order Date)` to continuous (green), what happens in the view?",
              ],
              options: [
                [
                  "Kesintisiz bir zaman ekseni oluşur, veri olmayan dönemler de görünür",
                  "An unbroken time axis appears, including periods with no data",
                ],
                [
                  "Her yıl için ayrı bir başlık kutusu oluşur",
                  "A separate header box appears for each year",
                ],
                ["Tarih otomatik olarak boyuta çevrilir", "The date is automatically converted to a dimension"],
                ["Yıllar alfabetik sıraya girer", "The years get sorted alphabetically"],
              ],
              answer: 0,
              explain: [
                "Sürekli alanlar kesintisiz bir eksen üretir; aradaki boş dönemler dahi gösterilir. Ayrık kullanırsan bunun yerine her yıl kendi başlığında ayrı bir kutu olur.",
                "Continuous fields produce an unbroken axis, showing even empty periods in between. Discrete instead gives each year its own separate header box.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Zaman içindeki bir trendi çizgi grafikle göstermek istiyorsun. Tarih alanını nasıl ayarlamalısın?",
                "You want to draw a trend over time with a line chart. How should you set the date field?",
              ],
              options: [
                ["Sürekli (continuous)", "Continuous"],
                ["Ayrık (discrete)", "Discrete"],
                ["Boyut yerine ölçü yapmalısın", "You should make it a measure instead of a dimension"],
                ["Fark etmez, ikisi de aynı sonucu verir", "It doesn't matter, both give the same result"],
              ],
              answer: 0,
              explain: [
                "Trend, kesintisiz bir eksen ister; bu yüzden sürekli (yeşil) kullanılır. Ayrık kullanırsan zaman ekseni yerine ayrı başlıklar (kutular) elde edersin, bu da trend çizgisini bozar.",
                "A trend needs an unbroken axis, so you use continuous (green). Discrete instead gives you separate header boxes rather than a time axis, which breaks the trend line.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "2022, 2023 ve 2024 yıllarını yan yana ayrı sütunlar olarak karşılaştırmak istiyorsun. Tarih alanını nasıl ayarlamalısın?",
                "You want to compare 2022, 2023 and 2024 as separate side-by-side columns. How should you set the date field?",
              ],
              options: [
                ["Ayrık (discrete)", "Discrete"],
                ["Sürekli (continuous)", "Continuous"],
                ["Hem sürekli hem ayrık aynı anda", "Both continuous and discrete at once"],
                ["Tarih alanı bu iş için kullanılamaz", "A date field cannot be used for this"],
              ],
              answer: 0,
              explain: [
                "Karşılaştırma yapmak istediğinde ayrık (mavi) kullanırsın; her yıl kendi başlığında ayrı bir kutu olur ve yan yana kıyaslanabilir. Sürekli olsaydı tek bir kesintisiz eksen elde ederdin.",
                "For comparison you use discrete (blue); each year gets its own header box so they sit side by side. Continuous would instead give you a single unbroken axis.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bir alanı ayrık ile sürekli arasında değiştirmek için ne yaparsın?",
                "How do you switch a field between discrete and continuous?",
              ],
              options: [
                ["Alana sağ tıklayıp seçeneği değiştiririm", "Right-click the field and change the option"],
                ["Alanı silip yeniden eklerim", "Delete and re-add the field"],
                [
                  "Veri kaynağına geri dönüp sütun tipini değiştiririm",
                  "Go back to the data source and change the column type",
                ],
                ["Bu ayar değiştirilemez", "This setting cannot be changed"],
              ],
              answer: 0,
              explain: [
                "Ayrık/sürekli, alanın kendi türünden değil onu nasıl kullandığından gelir; sağ tık menüsünden anında değiştirilebilir. Aynı alanı bir görselde ayrık, başka bir görselde sürekli kullanabilirsin.",
                "Discrete vs continuous comes from how you use the field, not its underlying type, and it can be switched instantly from the right-click menu. You can use the same field as discrete in one view and continuous in another.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Boyut/ölçü ayrımı ile ayrık/sürekli ayrımı aynı şey midir?",
                "Are the dimension/measure split and the discrete/continuous split the same thing?",
              ],
              options: [
                [
                  "Hayır, ikisi ayrı kavramlardır — bir ölçü bile ayrık olarak kullanılabilir",
                  "No, they are separate concepts — even a measure can be used as discrete",
                ],
                [
                  "Evet, boyut her zaman sürekli, ölçü her zaman ayrıktır",
                  "Yes, dimensions are always continuous and measures are always discrete",
                ],
                ["Evet, ikisi birebir aynı şeyi ifade eder", "Yes, they refer to exactly the same thing"],
                [
                  "Hayır, sadece tarih alanlarında bu iki kavram farklıdır",
                  "No, the two concepts only differ for date fields",
                ],
              ],
              answer: 0,
              explain: [
                "Boyut/ölçü, verinin kategorik mi sayısal mı olduğunu; ayrık/sürekli ise görselde başlık mı eksen mi üreteceğini belirler. İkisi bağımsızdır — örneğin bir yıl numarası (ölçü olabilecek bir sayı) ayrık bir boyut gibi kullanılabilir.",
                "Dimension/measure is about whether the data is categorical or numeric; discrete/continuous is about whether it produces a header or an axis in the view. The two are independent — for instance a year number could be used as a discrete field even though it's numeric.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "Fiyattan bir bin (kutulama) oluşturduktan sonra bu yeni alan hangi kategoriye girer?",
                "After creating a bin from price, which category does the new field fall into?",
              ],
              options: [
                [
                  "Boyut — artık kategorik aralıklar temsil eder",
                  "Dimension — it now represents categorical ranges",
                ],
                ["Ölçü — hâlâ sayısal olduğu için", "Measure — because it's still numeric"],
                [
                  "Ne boyut ne ölçü, ayrı bir alan türüdür",
                  "Neither dimension nor measure, it's a separate field type",
                ],
                [
                  "Orijinal fiyat alanının yerini alır ve onu siler",
                  "It replaces and deletes the original price field",
                ],
              ],
              answer: 0,
              explain: [
                "Bin oluşturmak sayısal bir alanı kategorik aralıklara böler; sonuç mavi bir boyuttur ve raflara sürüklendiğinde her aralık kendi başlığını alır. Orijinal fiyat alanı silinmez, bin ondan ayrı yeni bir alan olarak durur.",
                "Creating a bin splits a numeric field into categorical ranges; the result is a blue dimension, and each range gets its own header when dragged onto a shelf. The original price field is not deleted — the bin exists as a separate new field.",
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
            quiz({
              id: "q2",
              q: [
                "Yatay ekseni belirleyen raf hangisidir?",
                "Which shelf determines the horizontal axis?",
              ],
              options: [
                ["Sütunlar rafı", "The Columns shelf"],
                ["Satırlar rafı", "The Rows shelf"],
                ["İşaretler kartı", "The Marks card"],
                ["Show Me paneli", "The Show Me panel"],
              ],
              answer: 0,
              explain: [
                "Sütunlar rafına konan alan yatay ekseni oluşturur; Satırlar rafına konan alan ise dikey ekseni oluşturur. Grafik türünü bu iki rafa nelerin konduğu belirler.",
                "A field placed on the Columns shelf forms the horizontal axis; a field on Rows forms the vertical axis. What you put on these two shelves determines the chart type.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir ölçüyü Satırlar rafına koyarsan ne olur?",
                "What happens if you put a measure on the Rows shelf?",
              ],
              options: [
                ["Dikey ekseni oluşturur", "It forms the vertical axis"],
                ["Yatay ekseni oluşturur", "It forms the horizontal axis"],
                ["Veriyi renklendirir", "It colours the data"],
                ["Veriyi filtreler", "It filters the data"],
              ],
              answer: 0,
              explain: [
                "Satırlar rafı dikey ekseni belirler. Bir ölçü buraya konduğunda çubukların yüksekliği veya noktaların dikey konumu o ölçünün toplamına göre şekillenir.",
                "The Rows shelf determines the vertical axis. When a measure sits here, bar height or a point's vertical position follows that measure's aggregate.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "İşaretler kartındaki Renk kutusuna bir **ölçü** koyarsan ne elde edersin?",
                "What do you get if you put a **measure** on the Colour box of the Marks card?",
              ],
              options: [
                [
                  "Değere göre değişen sürekli bir renk gradyanı",
                  "A continuous colour gradient that varies with the value",
                ],
                ["Her kategori için ayrı bir sabit renk", "A separate fixed colour per category"],
                ["Renk kutusu ölçü kabul etmez", "The Colour box does not accept measures"],
                ["Veri otomatik olarak filtrelenir", "The data gets filtered automatically"],
              ],
              answer: 0,
              explain: [
                "Renk kutusuna boyut konursa her kategori kendi sabit rengini alır; ölçü konursa Tableau değere göre bir gradyan üretir — örneğin kâr negatifse kırmızıya, pozitifse yeşile kayan bir skala.",
                "A dimension on Colour gives each category its own fixed colour; a measure produces a value-driven gradient instead — for example a scale sliding from red for negative profit to green for positive.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Etiket (Label) kutusu ile Araç ipucu (Tooltip) kutusu arasındaki fark nedir?",
                "What is the difference between the Label box and the Tooltip box?",
              ],
              options: [
                [
                  "Etiket görselin üstüne sabit yazılır; Araç ipucu yalnızca fare üzerine gelince görünür",
                  "Label writes fixed text on the visual; Tooltip only appears on hover",
                ],
                ["İkisi tam olarak aynı işi yapar", "They do exactly the same thing"],
                ["Etiket sadece sayısal alan kabul eder", "Label only accepts numeric fields"],
                ["Araç ipucu görseli filtreler", "Tooltip filters the visual"],
              ],
              answer: 0,
              explain: [
                "Etiket, görselin üzerine kalıcı olarak yazılan metin/sayıdır — her zaman görünür. Araç ipucu ise ancak fare bir işaretin üzerine geldiğinde ortaya çıkan ek bilgidir; görseli kalabalıklaştırmadan detay eklemek için kullanılır.",
                "Label writes text or a number permanently on the visual — always visible. Tooltip is extra information that only appears when the mouse hovers over a mark, letting you add detail without cluttering the view.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Bir çubuk grafik yapmak için önce \"çubuk grafiği\" seçeneğini mi seçmen gerekir?",
                "Do you need to select the \"bar chart\" option first to make a bar chart?",
              ],
              options: [
                [
                  "Hayır, bir boyutu Sütunlar'a bir ölçüyü Satırlar'a koyarsan Tableau zaten çubuk çizer",
                  "No, put a dimension on Columns and a measure on Rows and Tableau already draws bars",
                ],
                ["Evet, Show Me panelinden seçilmesi zorunludur", "Yes, it must be chosen from the Show Me panel"],
                ["Evet, İşaretler kartından seçilmesi zorunludur", "Yes, it must be chosen from the Marks card"],
                ["Hayır ama ayrı bir grafik türü menüsünden seçilmelidir", "No, but it must be picked from a separate chart-type menu"],
              ],
              answer: 0,
              explain: [
                "Tableau'da grafik türünü alanların rafta durduğu yer belirler. Bir boyutu Sütunlar'a, bir ölçüyü Satırlar'a sürüklemek başlı başına bir çubuk grafiği üretir; ayrı bir \"grafik türü seç\" adımı yoktur.",
                "In Tableau the placement of fields on shelves determines the chart type. Dragging a dimension onto Columns and a measure onto Rows produces a bar chart on its own; there is no separate \"pick a chart type\" step.",
              ],
            }),
            tip(
              "Göster Bana (Show Me) ile başla, sonra terk et",
              "Start with Show Me, then leave it behind",
              "Sağ üstteki **Göster Bana** paneli, seçtiğin alanlara uygun grafik türlerini önerir ve öğrenirken çok işe yarar — hangi alan kombinasyonunun hangi grafiği ürettiğini gösterir.\n\nAma bir süre sonra bırakman gerekir. Göster Bana alanları **kendi bildiği yere** koyar; sen düzenlemek istediğinde kurduğu yapıyı çözmek zorunda kalırsın. Alanları doğrudan raflara sürüklemeyi öğrenmek, Tableau'da akıcılığın başladığı noktadır.",
              "The **Show Me** panel in the top right suggests chart types matching your selected fields, and it is very useful while learning — it shows which field combinations produce which chart.\n\nBut you should leave it behind after a while. Show Me places fields **where it sees fit**, and when you want to adjust something you must first unpick what it built. Learning to drag fields onto the shelves directly is where fluency in Tableau begins.",
            ),
            quiz({
              id: "q7",
              q: [
                "Show Me paneli ne işe yarar?",
                "What does the Show Me panel do?",
              ],
              options: [
                [
                  "Seçtiğin alanlara uygun grafik türlerini önerir",
                  "It suggests chart types that fit your selected fields",
                ],
                ["Verideki hataları temizler", "It cleans errors in the data"],
                ["Hesaplanan alan oluşturur", "It creates a calculated field"],
                ["Panoyu Tableau Server'a yayınlar", "It publishes the dashboard to Tableau Server"],
              ],
              answer: 0,
              explain: [
                "Show Me, seçtiğin alanların türüne (boyut/ölçü sayısı, veri tipi) bakarak uygun grafik türlerini önerir. Öğrenirken hangi alan kombinasyonunun hangi grafiği ürettiğini görmek için faydalıdır.",
                "Show Me looks at the type of fields you selected (how many dimensions/measures, data type) and suggests fitting chart types. It's useful while learning to see which field combination produces which chart.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bir süre sonra Show Me'yi bırakıp alanları doğrudan raflara sürüklemek neden önerilir?",
                "Why is it recommended to leave Show Me behind and drag fields onto shelves directly?",
              ],
              options: [
                [
                  "Show Me alanları kendi bildiği yere koyar; düzenlemek istediğinde önce o yapıyı çözmen gerekir",
                  "Show Me places fields where it sees fit; adjusting later means first unpicking what it built",
                ],
                ["Show Me artık Tableau'da mevcut değildir", "Show Me no longer exists in Tableau"],
                ["Show Me sadece pasta grafik üretebilir", "Show Me can only produce pie charts"],
                ["Raflara elle sürüklemek daha yavaştır", "Dragging onto shelves by hand is slower"],
              ],
              answer: 0,
              explain: [
                "Show Me hızlıdır ama alanları kendi mantığıyla yerleştirir. İnce ayar yapmak istediğinde bu otomatik yerleşimi önce çözmen gerekir. Alanları doğrudan sürüklemeyi öğrenmek, Tableau'da akıcılığın başladığı noktadır.",
                "Show Me is fast but places fields by its own logic. When you want to fine-tune something you must first undo that automatic layout. Learning to drag fields directly is where fluency in Tableau begins.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "Haritada her şehir için ayrı bir nokta istiyorsun ama şehre göre renklendirme yapmak istemiyorsun. Şehri hangi kutuya koymalısın?",
                "You want a separate point per city on a map but do not want to colour by city. Which box should city go on?",
              ],
              options: [
                ["Ayrıntı (Detail)", "Detail"],
                ["Renk (Colour)", "Colour"],
                ["Etiket (Label)", "Label"],
                ["Sütunlar rafı", "The Columns shelf"],
              ],
              answer: 0,
              explain: [
                "Ayrıntı tam olarak bu senaryo için var: veri düzeyini ince böler ama renk/boyut gibi bir görsel özellik atamaz. Şehri Renk'e koysaydın her şehir farklı renk alırdı — istenmeyen bir sonuç.",
                "Detail exists exactly for this case: it splits the granularity finely without assigning a visual property like colour or size. Putting city on Colour instead would give every city its own colour — not what you want here.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Ayrıntı (Detail) kutusu ile Renk (Colour) kutusu arasındaki temel fark nedir?",
                "What is the fundamental difference between the Detail box and the Colour box?",
              ],
              options: [
                [
                  "Ayrıntı sadece veri düzeyini böler; Renk hem böler hem de görsel bir özellik (renk) atar",
                  "Detail only splits the data's granularity; Colour both splits and assigns a visual property (colour)",
                ],
                ["İkisi birebir aynı sonucu üretir", "They produce exactly the same result"],
                ["Ayrıntı sadece sayısal alanlarla çalışır", "Detail only works with numeric fields"],
                ["Renk kutusu veriyi filtreler, Ayrıntı filtrelemez", "Colour filters the data, Detail does not"],
              ],
              answer: 0,
              explain: [
                "İkisi de görsele ek bir boyut katarak ayrıntı düzeyini artırır. Farkları şudur: Renk ayrıca her kategoriye görünür bir renk atar, Ayrıntı ise sessizce böler — görsel karmaşayı artırmadan ayrıntı eklemek istediğinde Ayrıntı'yı tercih edersin.",
                "Both add a dimension to the view and increase granularity. The difference: Colour also assigns a visible colour per category, while Detail splits silently — you reach for Detail when you want more granularity without adding visual clutter.",
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
            quiz({
              id: "q2",
              q: [
                "Bir rapor gerçek zamanlı veri gerektirmiyor ama hız çok önemli. Hangi bağlantı türünü seçmelisin?",
                "A report doesn't need real-time data but speed matters a lot. Which connection type should you pick?",
              ],
              options: [
                ["Çıkarma (Extract)", "Extract"],
                ["Canlı (Live)", "Live"],
                ["İkisi de aynı hızdadır", "Both are equally fast"],
                ["Bağlantı türü hızı etkilemez", "Connection type doesn't affect speed"],
              ],
              answer: 0,
              explain: [
                "Extract, veriyi Tableau'nun kendi sıkıştırılmış biçimine kopyaladığı için çok daha hızlıdır. Gerçek zamanlılık gerekmiyorsa pratikte neredeyse her zaman extract tercih edilir.",
                "An extract copies the data into Tableau's own compressed format, making it far faster. Unless real-time data truly matters, extracts are the practical default.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Canlı (Live) bağlantının en büyük dezavantajı nedir?",
                "What is the biggest downside of a Live connection?",
              ],
              options: [
                [
                  "Hız kaynağın hızına bağlıdır ve kaynağa ekstra yük biner",
                  "Speed depends on the source and it puts extra load on the source",
                ],
                ["Veri hiçbir zaman güncellenmez", "The data never updates"],
                ["Çevrimdışı çalışabilir", "It can work offline"],
                ["Yenileme zamanlaması gerektirmez", "It requires no refresh schedule"],
              ],
              answer: 0,
              explain: [
                "Canlı bağlantıda her etkileşim kaynağa yeni bir sorgu gönderir; kaynak yavaşsa Tableau da yavaşlar ve kaynak sistem sürekli yük altında kalır. Extract bu yükü tek seferlik bir kopyalamayla ortadan kaldırır.",
                "With a Live connection every interaction sends a fresh query to the source; if the source is slow, Tableau is slow too, and the source system stays under constant load. An extract removes that load with a one-time copy.",
              ],
            }),
            text(
              "**Tabloları birleştirmenin üç yolu** — hangisini seçtiğin sonucu değiştirir:\n\n1. **İlişki (Relationship)** — 2020'de gelen ve artık **varsayılan** olan yöntem. Tabloları birbirine bağlarsın ama Tableau satırları hemen birleştirmez; her görselde **o görselin ihtiyacı kadar** birleştirme yapar. Çoğullama (fan-out) sorununu kendisi yönetir. Şüphedeysen bunu kullan.\n\n2. **Birleştirme (Join)** — Klasik SQL JOIN. Satırlar fiziksel olarak birleşir. Bire-çok ilişkide **değerler çoğalır** ve toplamlar şişer. Ne yaptığını biliyorsan güçlüdür.\n\n3. **Ekleme (Union)** — Aynı yapıdaki tabloları alt alta yığar. Aylık dosyaları birleştirmek için idealdir; joker karakterle (`satis_2024_*.csv`) klasördeki tüm dosyaları otomatik alabilirsin.",
              "**Three ways to combine tables** — and the choice changes the result:\n\n1. **Relationship** — introduced in 2020 and now the **default**. You link tables but Tableau does not merge rows immediately; for each visual it joins **only as much as that visual needs**. It manages the fan-out problem for you. When in doubt, use this.\n\n2. **Join** — the classic SQL JOIN. Rows are physically merged. On a one-to-many relationship **values duplicate** and totals inflate. Powerful when you know what you are doing.\n\n3. **Union** — stacks tables of the same shape on top of each other. Ideal for combining monthly files; with a wildcard (`sales_2024_*.csv`) you can pull in every file in a folder automatically.",
            ),
            quiz({
              id: "q4",
              q: [
                "2020'den beri Tableau'da tablo bağlama için varsayılan yöntem hangisidir?",
                "Since 2020, which method is the default for linking tables in Tableau?",
              ],
              options: [
                ["İlişki (Relationship)", "Relationship"],
                ["Birleştirme (Join)", "Join"],
                ["Ekleme (Union)", "Union"],
                ["Hiçbiri, her seferinde elle seçilmeli", "None, it must be chosen manually every time"],
              ],
              answer: 0,
              explain: [
                "İlişki, 2020'de gelen ve artık varsayılan olan yöntemdir. Satırları hemen birleştirmez, her görselde sadece ihtiyaç kadar birleştirme yapar ve çoğullama sorununu kendisi yönetir.",
                "Relationship, introduced in 2020, is now the default. It does not merge rows immediately — for each visual it joins only as much as needed and manages the fan-out problem for you.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Bire-çok ilişkide klasik JOIN kullanırsan tipik olarak ne olur?",
                "What typically happens if you use a classic JOIN on a one-to-many relationship?",
              ],
              options: [
                ["Değerler çoğalır ve toplamlar şişer", "Values duplicate and totals inflate"],
                ["Değerler otomatik olarak düzeltilir", "Values get automatically corrected"],
                ["Hiçbir fark olmaz", "There is no difference"],
                ["Tableau JOIN kurmayı engeller", "Tableau blocks the join from being created"],
              ],
              answer: 0,
              explain: [
                "JOIN satırları fiziksel olarak birleştirir. Bir tarafta çok sayıda eşleşen satır varsa (bire-çok), diğer taraftaki değerler her eşleşmede tekrar eder ve toplamlar gerçek değerin katları kadar şişer.",
                "A JOIN physically merges rows. When one side has many matching rows (one-to-many), values from the other side repeat for every match, inflating totals to multiples of the real number.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Aynı yapıdaki aylık satış dosyalarını (`satis_2024_01.csv`, `satis_2024_02.csv`…) alt alta yığmak için hangi yöntem kullanılır?",
                "Which method stacks monthly sales files of the same shape (`sales_2024_01.csv`, `sales_2024_02.csv`…) on top of each other?",
              ],
              options: [
                ["Ekleme (Union)", "Union"],
                ["İlişki (Relationship)", "Relationship"],
                ["Birleştirme (Join)", "Join"],
                ["Ayrı ayrı çalışma kitapları açmak", "Opening a separate workbook for each"],
              ],
              answer: 0,
              explain: [
                "Union, aynı sütun yapısındaki tabloları alt alta ekler — tam olarak aylık dosyaları birleştirme senaryosu. Join ise tabloları yan yana (sütun bazında) birleştirir, bu senaryoda yanlış araçtır.",
                "Union stacks tables with the same column structure on top of each other — exactly the monthly-files scenario. Join instead combines tables side by side (by column), which is the wrong tool here.",
              ],
            }),
            pitfall(
              "Join sonrası şişen toplamlar",
              "Totals that inflate after a join",
              "`Siparisler` ile `SiparisKalemleri` tablosunu JOIN edersen, iki kalemli bir sipariş iki satır olur. Şimdi `SUM(Kargo Ücreti)` yazarsan kargo ücretini **iki kez** saymış olursun.\n\nBu hata rapora hiç hata gibi görünmez — sadece sayı fazladır ve genellikle aylar sonra biri \"bu rakam çok yüksek\" dediğinde fark edilir.\n\nTableau'nun **İlişki** modeli tam olarak bu sorunu çözmek için tasarlandı: her ölçüyü kendi tablosunun ayrıntı düzeyinde toplar. Yeni başlıyorsan JOIN yerine İlişki kullan.",
              "Join `Orders` to `OrderLines` and an order with two lines becomes two rows. Write `SUM(Shipping Fee)` now and you have counted the shipping fee **twice**.\n\nThis never looks like an error in the report — the number is simply too high, and it is usually spotted months later when somebody says \"that figure looks high\".\n\nTableau's **Relationship** model was designed to solve exactly this: it aggregates each measure at its own table's granularity. If you are starting out, use Relationships rather than Joins.",
            ),
            quiz({
              id: "q7",
              q: [
                "`Siparisler` ile `SiparisKalemleri` tablosunu JOIN edip iki kalemli bir sipariş için `SUM(Kargo Ücreti)` yazarsan ne olur?",
                "You join `Orders` to `OrderLines`; for a two-line order, what happens when you write `SUM(Shipping Fee)`?",
              ],
              options: [
                ["Kargo ücreti iki kez sayılır", "The shipping fee gets counted twice"],
                ["Kargo ücreti doğru şekilde hesaplanır", "The shipping fee is computed correctly"],
                ["Sipariş satırları tek satıra birleşir", "The order rows merge back into one row"],
                ["Tableau otomatik olarak hata verir", "Tableau throws an automatic error"],
              ],
              answer: 0,
              explain: [
                "JOIN sonrası iki kalemli sipariş iki satır olur; her satırda aynı kargo ücreti tekrar eder. `SUM` bu tekrar eden değerleri topladığı için kargo ücreti iki kez sayılmış olur — ve bu hata raporda hiç hata gibi görünmez.",
                "After the join, a two-line order becomes two rows, each repeating the same shipping fee. `SUM` adds those repeated values, so the shipping fee is counted twice — and it never looks like an error in the report.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bu şişme hatasını mimari düzeyde önlemek için başlangıçta hangi yöntem tercih edilmelidir?",
                "Which method should you prefer from the start to prevent this inflation error at the architectural level?",
              ],
              options: [
                [
                  "İlişki (Relationship) — her ölçüyü kendi tablosunun ayrıntı düzeyinde toplar",
                  "Relationship — it aggregates each measure at its own table's granularity",
                ],
                ["Birleştirme (Join)", "Join"],
                ["Canlı bağlantı", "A live connection"],
                ["Ekleme (Union)", "Union"],
              ],
              answer: 0,
              explain: [
                "İlişki modeli tam olarak bu sorunu çözmek için tasarlandı: satırları hemen birleştirmez, her ölçüyü kendi tablosunun ayrıntı düzeyinde toplar. Yeni başlıyorsan JOIN yerine İlişki kullanmak bu tür şişmeleri baştan engeller.",
                "The Relationship model was designed to solve exactly this: it does not merge rows immediately, and aggregates each measure at its own table's granularity. Using Relationships instead of Joins as a default prevents this kind of inflation from the start.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "Union ile Join arasındaki temel fark nedir?",
                "What is the fundamental difference between Union and Join?",
              ],
              options: [
                [
                  "Union tabloları alt alta yığar (satır ekler); Join tabloları yan yana birleştirir (sütun ekler)",
                  "Union stacks tables on top of each other (adds rows); Join combines tables side by side (adds columns)",
                ],
                ["İkisi de aynı sonucu üretir", "Both produce the same result"],
                ["Union sadece CSV dosyalarında çalışır", "Union only works with CSV files"],
                ["Join sadece iki tablo ile sınırlıdır, Union sınırsızdır", "Join is limited to two tables while Union is unlimited"],
              ],
              answer: 0,
              explain: [
                "Union, aynı yapıdaki tabloları alt alta ekleyerek satır sayısını artırır — aylık dosyaları birleştirmek gibi. Join ise ortak bir anahtar üzerinden tabloları yan yana birleştirip sütun ekler; bire-çok durumda satırları da çoğaltabilir.",
                "Union stacks same-shaped tables, growing the row count — like combining monthly files. Join instead merges tables side by side on a key, adding columns — and on a one-to-many match it can also duplicate rows.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Joker karakterli bir Union kurduysan (`satis_*.csv`), gelecek ay yeni bir dosya eklendiğinde ne yapman gerekir?",
                "With a wildcard Union set up (`sales_*.csv`), what do you need to do when a new file arrives next month?",
              ],
              options: [
                ["Sadece veri kaynağını yenilemen (refresh) yeterlidir", "You just need to refresh the data source"],
                ["Union'ı sıfırdan yeniden kurmalısın", "You must rebuild the Union from scratch"],
                ["Yeni bir çalışma kitabı açmalısın", "You must open a new workbook"],
                ["Hiçbir şey — Tableau otomatik farkına varır, işlem gerekmez", "Nothing — Tableau notices automatically, no action needed"],
              ],
              answer: 0,
              explain: [
                "Joker karakterli union, klasördeki desene uyan tüm dosyaları tarar. Yeni bir dosya eklendiğinde onu otomatik olarak dahil eder; senin tek yapman gereken veri kaynağını yenilemek, union'ı yeniden kurmak değil.",
                "A wildcard union scans every file in the folder matching the pattern. When a new file appears it is picked up automatically; the only action needed is refreshing the data source, not rebuilding the union.",
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
            quiz({
              id: "q2",
              q: [
                "Ölçü (measure) alanları hangi renkte gösterilir ve görselde ne yapılır?",
                "What colour are measure fields shown in, and what happens to them in a visual?",
              ],
              options: [
                ["Yeşil renkte gösterilir ve toplanır (SUM, AVG…)", "Shown in green and aggregated (SUM, AVG…)"],
                ["Mavi renkte gösterilir ve veriyi böler", "Shown in blue and it slices the data"],
                ["Renksiz gösterilir, biçimlendirme gerektirmez", "Shown without colour, needs no formatting"],
                ["Sadece metin olarak filtre panelinde görünür", "Only appears as text in the filter panel"],
              ],
              answer: 0,
              explain: [
                "Ölçüler sayısaldır ve yeşille gösterilir; ciro, adet, kâr gibi değerler SUM veya AVG gibi bir toplama ile özetlenir. Mavi renk ise boyutlara aittir ve veriyi kategorilere böler.",
                "Measures are numeric and shown in green; values like revenue, quantity or profit get summarised with an aggregation such as SUM or AVG. Blue instead belongs to dimensions, which slice the data into categories.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "\"Şu ölçüyü, şu boyutlara göre göster\" cümlesi bu derste neyi anlatmak için kullanılıyor?",
                "In this lesson, what does the sentence \"Show this measure, broken down by these dimensions\" describe?",
              ],
              options: [
                [
                  "Her görselleştirmenin temel mantığını: bir ölçünün, boyutlara göre kırılımı",
                  "The basic logic of every visualisation: a measure broken down by dimensions",
                ],
                ["Yalnızca pasta grafiklerin nasıl kurulduğunu", "How pie charts specifically are built"],
                ["Hesaplanan alan yazma söz dizimini", "The syntax for writing a calculated field"],
                ["Veri kaynağına nasıl bağlanılacağını", "How to connect to a data source"],
              ],
              answer: 0,
              explain: [
                "Bu cümle Tableau'daki her görselin özünü özetler: bir ölçü (ne ölçülüyor) ve onu kıran boyutlar (neye göre). Bir grafik kurarken kendine hep bu iki soruyu sor.",
                "The sentence captures the essence of every Tableau view: a measure (what is being measured) and the dimensions that break it down (by what). When building any chart, ask yourself exactly these two questions.",
              ],
            }),
            text(
              "İkinci ayrım **sürekli (continuous, yeşil)** ve **ayrık (discrete, mavi)** arasındadır. Bu, alanın türünden değil onu nasıl kullandığından gelir:\n\n- Ayrık alan → **başlık** (header) üretir, eksende ayrı kutular olur.\n- Sürekli alan → **eksen** (axis) üretir, kesintisiz bir çizgi olur.\n\nAynı `Sipariş Tarihi` alanını ayrık `YEAR` olarak kullanırsan yıl başlıkları, sürekli olarak kullanırsan zaman ekseni elde edersin.",
              "The second distinction is **continuous (green)** vs **discrete (blue)**. It comes from how you use the field, not from its type:\n\n- Discrete → produces **headers**, separate buckets along the shelf.\n- Continuous → produces an **axis**, an unbroken scale.\n\nUse the same `Order Date` as a discrete `YEAR` and you get year headers; use it as continuous and you get a time axis.",
            ),
            quiz({
              id: "q4",
              q: [
                "Ayrık (discrete) bir alan görselde ne üretir?",
                "What does a discrete field produce in a view?",
              ],
              options: [
                ["Başlık (header) — eksende ayrı kutular", "A header — separate buckets along the shelf"],
                ["Kesintisiz bir eksen", "An unbroken axis"],
                ["Renk gradyanı", "A colour gradient"],
                ["Otomatik bir filtre", "An automatic filter"],
              ],
              answer: 0,
              explain: [
                "Ayrık alanlar başlık üretir: her değer kendi kutusunda ayrı durur. Sürekli alanlar ise kesintisiz bir eksen üretir. Bu ikisi arasındaki fark, alanın türünden değil onu nasıl kullandığından gelir.",
                "Discrete fields produce headers: each value sits in its own separate bucket. Continuous fields instead produce an unbroken axis. The difference comes from how you use the field, not its underlying type.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`Sipariş Tarihi` alanını sürekli `YEAR` olarak kullanırsan ne elde edersin?",
                "If you use `Order Date` as continuous `YEAR`, what do you get?",
              ],
              options: [
                ["Kesintisiz bir zaman ekseni", "An unbroken time axis"],
                ["Her yıl için ayrı bir başlık", "A separate header for each year"],
                ["Otomatik bir kutulama (bin)", "An automatic bin"],
                ["Tarih alanı boyuta dönüşür", "The date field turns into a dimension"],
              ],
              answer: 0,
              explain: [
                "Sürekli kullanım kesintisiz bir eksen üretir. Aynı alanı ayrık `YEAR` olarak kullansaydın bunun yerine her yıl için ayrı bir başlık elde ederdin.",
                "Using it as continuous produces an unbroken axis. Using the same field as discrete `YEAR` instead would give you a separate header for each year.",
              ],
            }),
            info(
              "Show Me'ye güvenme, önce soruyu sor",
              "Do not lean on Show Me; ask the question first",
              "Tableau'nun *Show Me* paneli hızlıdır ama seni grafik türünü seçmeye zorlar. Doğru sıra tersidir: önce cevaplamak istediğin soruyu bir cümleyle yaz (\"hangi kategori aydan aya en çok büyüdü?\"), sonra bu cümleye uyan görseli kur. Soru netse grafik türü zaten kendini seçer.",
              "Tableau's *Show Me* panel is fast, but it pushes you to pick a chart type first. The right order is the reverse: write the question you want answered in one sentence (\"which category grew fastest month over month?\"), then build the view that answers it. With a clear question the chart type picks itself.",
            ),
            quiz({
              id: "q6",
              q: [
                "Bu derse göre doğru sıra nedir?",
                "According to this lesson, what is the right order?",
              ],
              options: [
                [
                  "Önce cevaplamak istediğin soruyu bir cümleyle yaz, sonra buna uyan görseli kur",
                  "First write the question you want answered in one sentence, then build the view that answers it",
                ],
                ["Önce Show Me'den bir grafik türü seç, sonra soruyu düşün", "First pick a chart type from Show Me, then think of the question"],
                ["Önce renkleri ayarla, sonra alanları sürükle", "First set the colours, then drag the fields"],
                ["Sıra önemli değildir", "The order doesn't matter"],
              ],
              answer: 0,
              explain: [
                "Show Me hızlıdır ama seni önce grafik türü seçmeye zorlar. Doğru sıra tersidir: önce soruyu netleştir, sonra o soruyu yanıtlayan görseli kur. Soru netse grafik türü zaten kendini seçer.",
                "Show Me is fast but pushes you to pick a chart type first. The right order is the reverse: clarify the question first, then build the view that answers it. With a clear question the chart type picks itself.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "\"Hangi kategori aydan aya en çok büyüdü?\" sorusunu netleştirdikten sonra sıradaki adım nedir?",
                "After clarifying \"which category grew fastest month over month?\", what is the next step?",
              ],
              options: [
                [
                  "Bu soruya uyan görseli kurmak — grafik türü sorudan kendiliğinden çıkar",
                  "Build the view that answers this question — the chart type follows from the question itself",
                ],
                ["Show Me panelini açıp rastgele bir grafik seçmek", "Open Show Me and pick a random chart"],
                ["Soruyu unutup veriye bakmaya başlamak", "Forget the question and just start looking at the data"],
                ["Önce bir hesaplanan alan yazmak zorunludur", "Writing a calculated field first is mandatory"],
              ],
              answer: 0,
              explain: [
                "Net bir soru, hangi görselin gerektiğini zaten belirler — burada aylık değişim ve kategoriler arası karşılaştırma olduğu için sonuç bir çizgi veya çubuk grafiğe çıkar. Grafik türünü seçmek ayrı bir karar değil, sorunun doğal sonucudur.",
                "A clear question already determines which view is needed — here, month-over-month change across categories naturally leads to a line or bar chart. Picking the chart type isn't a separate decision, it's a natural consequence of the question.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: [
                "Adımlarda ilk iş olarak alan tiplerini kontrol etmek (boyut mu ölçü mü, tarih doğru tanınmış mı) neden önemlidir?",
                "In the steps, why is checking field types first (dimension vs measure, is the date recognised correctly) important?",
              ],
              options: [
                [
                  "Tableau bir alanın türünü yanlış tahmin edebilir ve bu, baştan yanlış bir görsele yol açar",
                  "Tableau can guess a field's type wrong, and that leads to the wrong visual from the start",
                ],
                ["Bu adım hiçbir zaman gerekli değildir, atlanabilir", "This step is never necessary and can be skipped"],
                ["Sadece SQL bağlantılarında gereklidir", "It's only needed for SQL connections"],
                ["Alan tipleri Tableau'da hiçbir zaman değiştirilemez", "Field types can never be changed in Tableau"],
              ],
              answer: 0,
              explain: [
                "Tableau otomatik tahmin yapar ve bazen yanılır — bir yıl numarasını ölçü sanabilir ya da bir tarihi metin olarak bırakabilir. Grafiğe başlamadan önce bu ayrımı kontrol etmek, sonradan yapıyı sökmekten çok daha ucuzdur.",
                "Tableau's automatic guess can be wrong — it might treat a year number as a measure or leave a date as text. Checking this before building the chart is far cheaper than unpicking the structure afterwards.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Adımlarda boyut (Kategori) Rows rafına, ölçü (Satış) Columns rafına sürükleniyor. Bu hangi grafiği üretir?",
                "In the steps, the dimension (Category) goes on Rows and the measure (Sales) goes on Columns. Which chart does this produce?",
              ],
              options: [
                ["Yatay çubuk grafik", "A horizontal bar chart"],
                ["Dikey çubuk grafik", "A vertical bar chart"],
                ["Çizgi grafik", "A line chart"],
                ["Dağılım grafiği (scatter)", "A scatter plot"],
              ],
              answer: 0,
              explain: [
                "Boyut Rows'a (dikey eksende kategori başlıkları), ölçü Columns'a (yatay eksende değer) konunca çubuklar yatay uzanır. Tam tersi yerleşim — boyut Columns'a, ölçü Rows'a — dikey çubuk verirdi.",
                "With the dimension on Rows (category headers down the vertical axis) and the measure on Columns (value along the horizontal axis), the bars extend horizontally. The reverse placement — dimension on Columns, measure on Rows — would give a vertical bar chart instead.",
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
            quiz({
              id: "q2",
              q: [
                "İki ürün kategorisinden hangisinin daha çok sattığını karşılaştırmak istiyorsun. Hangi grafik?",
                "You want to compare which of two product categories sold more. Which chart?",
              ],
              options: [
                ["Yatay çubuk", "Horizontal bar"],
                ["Isı haritası", "Heatmap"],
                ["Dağılım grafiği", "Scatter plot"],
                ["Kutu grafiği", "Box plot"],
              ],
              answer: 0,
              explain: [
                "Karşılaştırma sorusu (\"hangisi daha çok?\") doğrudan yatay çubuğa karşılık gelir — çubuk uzunlukları göz için karşılaştırması en kolay biçimdir.",
                "A comparison question (\"which is bigger?\") maps directly to a horizontal bar — bar length is the easiest shape for the eye to compare.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bütünün parçalarını göstermek istiyorsun ama pasta grafik kullanmak istemiyorsun. Bu derse göre alternatif nedir?",
                "You want to show parts of a whole but don't want to use a pie chart. What is the alternative per this lesson?",
              ],
              options: [
                ["Yığılmış çubuk veya treemap", "Stacked bar or treemap"],
                ["Çizgi grafik", "Line chart"],
                ["Dağılım grafiği", "Scatter plot"],
                ["Kutu grafiği", "Box plot"],
              ],
              answer: 0,
              explain: [
                "Bütünün parçaları sorusu için yığılmış çubuk veya treemap, pasta grafiğe göre çok daha okunabilir bir alternatiftir — özellikle çok sayıda kategori varsa.",
                "For a parts-of-a-whole question, a stacked bar or a treemap is a far more readable alternative to a pie chart — especially with many categories.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Değerlerin nasıl yayıldığını (dağılımını) görmek istiyorsun. Hangi grafik türleri uygundur?",
                "You want to see how values are spread (distribution). Which chart types fit?",
              ],
              options: [
                ["Histogram veya kutu grafiği", "Histogram or box plot"],
                ["Isı haritası", "Heatmap"],
                ["Treemap", "Treemap"],
                ["Pasta", "Pie"],
              ],
              answer: 0,
              explain: [
                "Dağılım sorusu — değerler nasıl yayılmış, aykırı değer var mı — histogram veya kutu grafiği ile yanıtlanır. Bu ikisi tek tek değerleri değil, değerlerin yayılımını gösterir.",
                "A distribution question — how are the values spread, are there outliers — is answered with a histogram or a box plot. Both show the spread of values rather than individual points.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "İki kategorik boyutun kesişimini (örneğin şehir × ürün kategorisi) göstermek istiyorsun. Hangi grafik?",
                "You want to show the intersection of two categorical dimensions (e.g. city × product category). Which chart?",
              ],
              options: [
                ["Isı haritası (heatmap)", "Heatmap"],
                ["Dağılım grafiği", "Scatter plot"],
                ["Çizgi grafik", "Line chart"],
                ["Pasta", "Pie"],
              ],
              answer: 0,
              explain: [
                "İki kategorik boyut kesiştiğinde ısı haritası (heatmap) doğal seçimdir: bir boyut satırlarda, diğeri sütunlarda, hücreler renkle değeri kodlar.",
                "When two categorical dimensions cross, a heatmap is the natural choice: one dimension on rows, the other on columns, with cell colour encoding the value.",
              ],
            }),
            pitfall(
              "Pasta grafiğinin sorunu",
              "The problem with pie charts",
              "İnsan gözü açıyı uzunluktan çok daha kötü karşılaştırır. 3 dilimden fazlası olan bir pasta, aynı veriyi gösteren çubuk grafikten her zaman daha zor okunur. Yüzdeleri mutlaka göstermen gerekiyorsa yatay çubuk kullan ve etiketleri çubuk sonuna yaz.",
              "The human eye compares angles far worse than lengths. A pie with more than three slices is always harder to read than the equivalent bar chart. If you must show percentages, use horizontal bars and put the labels at the end of each bar.",
            ),
            quiz({
              id: "q6",
              q: [
                "İnsan gözü pasta grafiklerinde neyi karşılaştırmakta zayıftır?",
                "What does the human eye compare poorly on pie charts?",
              ],
              options: [
                ["Açıları — uzunluğa göre çok daha kötü karşılaştırır", "Angles — it compares them far worse than lengths"],
                ["Renkleri — hiç ayırt edemez", "Colours — it cannot distinguish them at all"],
                ["Sayıları — okuyamaz", "Numbers — it cannot read them"],
                ["Zaman eksenini — hiç anlayamaz", "The time axis — it cannot understand it at all"],
              ],
              answer: 0,
              explain: [
                "Göz açıları uzunluklara göre çok daha zayıf karşılaştırır; bu yüzden dilim büyüklüklerini kıyaslamak, eşdeğer çubukları kıyaslamaktan daima daha zordur.",
                "The eye compares angles far worse than lengths, which is why judging pie-slice sizes is always harder than judging the equivalent bars.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Bu derse göre, 3'ten fazla dilimi olan bir pasta grafiği ne zaman kullanılmalı?",
                "Per this lesson, when should a pie chart with more than three slices be used?",
              ],
              options: [
                [
                  "Neredeyse hiçbir zaman — eşdeğer çubuk grafik her zaman daha kolay okunur",
                  "Almost never — the equivalent bar chart is always easier to read",
                ],
                ["Her zaman, pasta en sezgisel grafiktir", "Always, pie is the most intuitive chart"],
                ["Sadece finans raporlarında", "Only in financial reports"],
                ["Sadece pano mobilde açıldığında", "Only when the dashboard is opened on mobile"],
              ],
              answer: 0,
              explain: [
                "Ders açıkça söylüyor: 3 dilimden fazlası olan bir pasta, aynı veriyi gösteren çubuk grafikten her zaman daha zor okunur. Yüzde göstermek zorunlu ise yatay çubuk ve uçtaki etiketler tercih edilmeli.",
                "The lesson is explicit: a pie with more than three slices is always harder to read than the equivalent bar chart. If percentages must be shown, prefer horizontal bars with labels at the end.",
              ],
            }),
            text(
              "Panonun okunabilirliğini artıran dört küçük karar:\n\n1. Çubukları **sırala** — alfabetik sıra neredeyse hiçbir zaman doğru sıra değildir.\n2. Ekseni **sıfırdan başlat** — çubuk grafikte kesilmiş eksen farkı abartır.\n3. Ondalıkları **kırp** — `1.899.234,56 TL` yerine `1,9 Mn TL`.\n4. Izgara çizgilerini ve kenarlıkları **azalt** — mürekkebi veriye ayır.",
              "Four small decisions that make a dashboard readable:\n\n1. **Sort** the bars — alphabetical is almost never the right order.\n2. **Start the axis at zero** — a truncated axis exaggerates differences in a bar chart.\n3. **Round** the numbers — `1,899,234.56` becomes `1.9M`.\n4. **Reduce** gridlines and borders — spend your ink on the data.",
            ),
            quiz({
              id: "q8",
              q: [
                "Bir çubuk grafikte ekseni sıfırdan başlatmamak (kesilmiş eksen) hangi soruna yol açar?",
                "What problem does not starting a bar chart's axis at zero (a truncated axis) cause?",
              ],
              options: [
                ["Çubuklar arasındaki farkı gerçekte olduğundan fazla abartır", "It exaggerates the difference between bars beyond reality"],
                ["Hiçbir sorun yaratmaz, sadece görünüşü değiştirir", "It causes no problem, only changes the look"],
                ["Grafiği daha hızlı çizer", "It renders the chart faster"],
                ["Sadece çizgi grafiklerde geçerli bir kuraldır", "This rule only applies to line charts"],
              ],
              answer: 0,
              explain: [
                "Kesilmiş bir eksen, aslında küçük olan bir farkı görsel olarak devasa gösterebilir çünkü çubuk uzunlukları artık gerçek oranları yansıtmaz. Sıfırdan başlamak bu yanıltmayı önler.",
                "A truncated axis can make a genuinely small difference look huge, because bar lengths no longer reflect the real proportions. Starting at zero prevents this distortion.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Çubukları alfabetik sırada bırakmak yerine ne yapılması önerilir?",
                "Instead of leaving bars in alphabetical order, what is recommended?",
              ],
              options: [
                [
                  "Anlamlı bir sıraya göre sıralamak, örneğin değere göre büyükten küçüğe",
                  "Sort by something meaningful, such as value from largest to smallest",
                ],
                ["Rastgele sıralamak", "Sort randomly"],
                ["Her zaman rengin alfabetik sırasına göre dizmek", "Always sort by the alphabetical order of the colour"],
                ["Sıralama önemsizdir, atlanabilir", "Sorting doesn't matter and can be skipped"],
              ],
              answer: 0,
              explain: [
                "Ders açıkça belirtiyor: alfabetik sıra neredeyse hiçbir zaman doğru sıra değildir. Değere göre sıralamak, en büyük veya en küçük değeri anında görünür kılar ve okumayı hızlandırır.",
                "The lesson states it plainly: alphabetical is almost never the right order. Sorting by value makes the largest or smallest instantly visible and speeds up reading.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "Reklam harcaması–satış dağılım grafiğine bir trend çizgisi ekleyip R² değerini göstermenin faydası nedir?",
                "What is the benefit of adding a trend line and showing R² on the ad-spend-vs-sales scatter plot?",
              ],
              options: [
                [
                  "İlişkinin gücü hakkındaki iddiayı ölçülebilir hale getirir",
                  "It makes the claim about the strength of the relationship measurable",
                ],
                ["Grafiği otomatik olarak bir pasta grafiğe çevirir", "It automatically converts the chart into a pie chart"],
                ["Veriyi filtreler ve aykırı değerleri siler", "It filters the data and removes outliers"],
                ["Renkleri kategoriye göre otomatik ayarlar", "It automatically sets colours by category"],
              ],
              answer: 0,
              explain: [
                "Sadece noktaların dağılımına bakmak sübjektiftir. Trend çizgisi ilişkinin yönünü gösterir, R² ise bu ilişkinin ne kadar güçlü olduğunu sayısal bir değerle ifade eder — iddian artık ölçülebilir.",
                "Just eyeballing the scatter of points is subjective. The trend line shows the direction of the relationship, and R² expresses how strong it is as a number — your claim becomes measurable.",
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
            quiz({
              id: "q2",
              q: [
                "Hesaplanan alan (calculated field) ile tablo hesaplaması (table calculation) arasındaki temel fark nedir?",
                "What is the fundamental difference between a calculated field and a table calculation?",
              ],
              options: [
                [
                  "Hesaplanan alan satır/toplama düzeyinde yeni bir alan üretir; tablo hesaplaması görselde zaten görünen değerler üzerinde çalışır",
                  "A calculated field creates a new field at row/aggregate level; a table calculation works on values already displayed in the view",
                ],
                ["İkisi tamamen aynı şeydir, sadece isimleri farklıdır", "They are exactly the same thing, only the names differ"],
                ["Tablo hesaplaması sadece SQL veri kaynaklarında çalışır", "Table calculations only work with SQL data sources"],
                ["Hesaplanan alan yalnızca metin alanları üretebilir", "A calculated field can only produce text fields"],
              ],
              answer: 0,
              explain: [
                "Hesaplanan alan veri katmanında yeni bir değer üretir (satır bazlı veya toplamalı). Tablo hesaplaması ise görselde zaten hesaplanmış değerleri alıp üzerlerinde ek işlem yapar (kümülatif toplam, sıralama gibi).",
                "A calculated field produces a new value at the data layer (row-based or aggregated). A table calculation instead takes values already computed in the view and processes them further (like a running total or a rank).",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bu derse göre Tableau'da en çok karıştırılan konu hangisidir?",
                "Per this lesson, what is the most-confused topic in Tableau?",
              ],
              options: [
                [
                  "Hesaplanan alan ile tablo hesaplaması arasındaki ayrım",
                  "The distinction between a calculated field and a table calculation",
                ],
                ["Boyut ile ölçü arasındaki ayrım", "The distinction between a dimension and a measure"],
                ["Join ile Union arasındaki ayrım", "The distinction between Join and Union"],
                ["Canlı ile çıkarma arasındaki ayrım", "The distinction between Live and Extract"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça belirtiyor: hesaplanan alan ile tablo hesaplaması arasındaki ayrım Tableau'da en çok karıştırılan konudur, çünkü ikisi de \"hesaplama\" gibi görünür ama farklı katmanlarda çalışır.",
                "The text states this explicitly: the distinction between a calculated field and a table calculation is the most-confused topic in Tableau, because both look like \"a calculation\" but operate at different layers.",
              ],
            }),
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
            quiz({
              id: "q4",
              q: [
                "Örnekteki `[Kâr] / [Satış]` ifadesi hangi düzeyde çalışır?",
                "What level does the example `[Profit] / [Sales]` expression operate at?",
              ],
              options: [
                ["Satır düzeyi", "Row level"],
                ["Toplama (aggregate) düzeyi", "Aggregate level"],
                ["Görsel düzeyi", "View level"],
                ["Tablo hesaplaması düzeyi", "Table calculation level"],
              ],
              answer: 0,
              explain: [
                "Parantezsiz, toplama fonksiyonu olmayan bu ifade her satır için ayrı ayrı hesaplanır — satır düzeyinde çalışır. Doğru toplam marj için `SUM([Kâr]) / SUM([Satış])` gibi toplama düzeyinde yazmak gerekir.",
                "Without an aggregation function this expression is evaluated separately for every row — it operates at row level. For a correct overall margin you need the aggregate-level form, `SUM([Profit]) / SUM([Sales])`.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Örnekteki `IF SUM([Satış]) > 100000 THEN \"Hedef üstü\" ELSEIF … END` bloğu ne üretir?",
                "What does the example `IF SUM([Sales]) > 100000 THEN \"Above target\" ELSEIF … END` block produce?",
              ],
              options: [
                [
                  "Satış tutarına göre kategorik bir durum etiketi",
                  "A categorical status label based on the sales amount",
                ],
                ["Sayısal bir kâr marjı", "A numeric profit margin"],
                ["Bir tarih farkı", "A date difference"],
                ["Otomatik bir renk kodu", "An automatic colour code"],
              ],
              answer: 0,
              explain: [
                "IF/ELSEIF/ELSE bloğu, sayısal bir koşulu metin kategorilerine çevirir — burada satış toplamına göre \"Hedef üstü\", \"Hedefe yakın\" veya \"Hedef altı\" etiketlerinden birini üretir. Sonuç bir boyut gibi kullanılabilir.",
                "An IF/ELSEIF/ELSE block turns a numeric condition into text categories — here it produces one of \"Above target\", \"Near target\" or \"Below target\" based on total sales. The result can be used like a dimension.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`DATEDIFF('day', [Sipariş Tarihi], [Teslim Tarihi])` ifadesi neyi hesaplar?",
                "What does `DATEDIFF('day', [Order Date], [Delivery Date])` compute?",
              ],
              options: [
                [
                  "Sipariş ile teslimat tarihi arasındaki gün sayısı farkını",
                  "The number of days between the order date and the delivery date",
                ],
                ["Sipariş tarihinin yılını", "The year of the order date"],
                ["Teslimat başına ortalama kârı", "The average profit per delivery"],
                ["Toplam sipariş sayısını", "The total number of orders"],
              ],
              answer: 0,
              explain: [
                "DATEDIFF iki tarih arasındaki farkı belirtilen birimde (burada gün) döndürür. Bu, teslimat süresini ölçmek gibi operasyonel metrikler için tipik bir kullanımdır.",
                "DATEDIFF returns the difference between two dates in the given unit (here, days). This is a typical use for operational metrics like measuring delivery time.",
              ],
            }),
            pitfall(
              "Ortalamaların ortalaması",
              "The average of averages",
              "`AVG([Kâr]/[Satış])` ile `SUM([Kâr])/SUM([Satış])` **farklı sayılardır**. İlki her satırın marjını hesaplayıp bunların ortalamasını alır ve küçük siparişlere büyükler kadar ağırlık verir. Doğru toplam marj daima ikincisidir. Bu hata, yönetim raporlarındaki en sık sessiz hatadır.",
              "`AVG([Profit]/[Sales])` and `SUM([Profit])/SUM([Sales])` are **different numbers**. The first computes a margin per row and averages them, weighting a tiny order the same as a huge one. The correct overall margin is always the second. This is the most common silent error in management reporting.",
            ),
            quiz({
              id: "q7",
              q: [
                "`AVG([Kâr]/[Satış])` neden genel kâr marjı için yanlış bir sayı verir?",
                "Why does `AVG([Profit]/[Sales])` give the wrong number for overall profit margin?",
              ],
              options: [
                [
                  "Her satırın marjını ayrı hesaplayıp ortalar; küçük bir siparişe büyük bir siparişle aynı ağırlığı verir",
                  "It computes a margin per row and averages them, weighting a small order the same as a large one",
                ],
                ["Sonuç her zaman negatif çıkar", "The result always comes out negative"],
                ["Yalnızca metin alanlarında çalışır", "It only works on text fields"],
                ["Tableau bu ifadeyi çalıştırmaz, hata verir", "Tableau refuses to run this expression and errors out"],
              ],
              answer: 0,
              explain: [
                "AVG([Kâr]/[Satış]) her satır için ayrı bir oran hesaplar ve bunların basit ortalamasını alır — 10 TL'lik bir siparişin marjı, 100.000 TL'lik bir siparişin marjıyla eşit ağırlıkta sayılır. Bu, işletmenin gerçek toplam marjını yansıtmaz.",
                "AVG([Profit]/[Sales]) computes a separate ratio per row and takes their plain average — a 10 dollar order's margin counts as much as a 100,000 dollar order's margin. That does not reflect the business's real overall margin.",
              ],
            }),
            text(
              "Tablo hesaplamaları (`Quick Table Calculation`) görseldeki sıraya bağlıdır: kümülatif toplam, yüzde fark, sıralama, hareketli ortalama. Her birinde **\"Compute Using\"** ayarı sonucun ne olacağını belirler — tablo boyunca mı, panel içinde mi, hücre bazında mı?",
              "Table calculations (`Quick Table Calculation`) depend on the layout of the view: running total, percent difference, rank, moving average. For each one the **\"Compute Using\"** setting decides the result — across the table, down a pane, or per cell?",
            ),
            quiz({
              id: "q8",
              q: [
                "Tablo hesaplamaları (kümülatif toplam, yüzde fark, sıralama, hareketli ortalama) neye bağlıdır?",
                "What do table calculations (running total, percent difference, rank, moving average) depend on?",
              ],
              options: [
                ["Görseldeki düzene/sıraya (layout)", "The layout of the view"],
                ["Veri kaynağının türüne (SQL, Excel…)", "The type of the data source (SQL, Excel…)"],
                ["Kullanılan renk paletine", "The colour palette used"],
                ["Ekran çözünürlüğüne", "The screen resolution"],
              ],
              answer: 0,
              explain: [
                "Tablo hesaplamaları görselde zaten görünen değerler üzerinden çalışır; bu yüzden sonuç, alanların hangi sırada ve hangi eksende durduğuna göre değişir. Aynı hesaplama farklı bir düzende farklı sayı verebilir.",
                "Table calculations work on the values already shown in the view, so the result depends on the order and axis the fields sit on. The same calculation can give a different number under a different layout.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "\"Compute Using\" ayarı bir tablo hesaplamasında ne belirler?",
                "What does the \"Compute Using\" setting decide for a table calculation?",
              ],
              options: [
                [
                  "Hesaplamanın hangi yönde/düzeyde yapılacağını — tablo boyunca mı, panel içinde mi, hücre bazında mı",
                  "The direction/level the calculation runs over — across the table, down a pane, or per cell",
                ],
                ["Hesaplamanın rengini", "The colour of the calculation"],
                ["Hesaplamanın veri kaynağını", "The data source of the calculation"],
                ["Hesaplamanın XP değerini", "The XP value of the calculation"],
              ],
              answer: 0,
              explain: [
                "Aynı tablo hesaplaması, \"Compute Using\" ayarına göre çok farklı sonuçlar verebilir — örneğin bir kümülatif toplam, tablo boyunca mı yoksa her panelde ayrı ayrı mı biriksin? Bu ayar tam olarak bunu belirler.",
                "The same table calculation can give very different results depending on \"Compute Using\" — for instance, should a running total accumulate across the whole table, or restart for each pane? This setting decides exactly that.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "`SUM([Kâr]) / SUM([Satış])` bir hesaplanan alan olarak yazıldığında bu bir tablo hesaplaması mıdır?",
                "When `SUM([Profit]) / SUM([Sales])` is written as a calculated field, is it a table calculation?",
              ],
              options: [
                [
                  "Hayır — toplama düzeyinde çalışan bir hesaplanan alandır, görseldeki mevcut değerler üzerinde ek işlem yapmaz",
                  "No — it's a calculated field working at aggregate level, it does not further process values already in the view",
                ],
                ["Evet, çünkü SUM fonksiyonu içeriyor", "Yes, because it contains a SUM function"],
                ["Evet, her hesaplama otomatik olarak tablo hesaplamasıdır", "Yes, every calculation is automatically a table calculation"],
                ["Bu ayrım Tableau'da yoktur", "This distinction does not exist in Tableau"],
              ],
              answer: 0,
              explain: [
                "Bu ifade doğrudan ham veriden toplama yapar — bir hesaplanan alandır. Tablo hesaplaması olması için görselde zaten hesaplanmış değerler üzerinde ek bir işlem (kümülatif toplam, sıralama gibi) yapması gerekirdi.",
                "This expression aggregates directly from raw data — it's a calculated field. To be a table calculation it would need to further process values already computed in the view, like a running total or a rank.",
              ],
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
            quiz({
              id: "q2",
              q: [
                "İyi bir pano tasarlamaya başlamadan önce hangi soruyu yanıtlamış olmalısın?",
                "Before starting to design a good dashboard, which question should you have answered?",
              ],
              options: [
                [
                  "Bunu kim, hangi kararı vermek için açacak?",
                  "Who opens this, and to make which decision?",
                ],
                ["Hangi renk paleti daha güzel görünür?", "Which colour palette looks nicer?"],
                ["Kaç görsel sığdırabilirim?", "How many charts can I fit?"],
                ["Hangi grafik kütüphanesini kullanmalıyım?", "Which charting library should I use?"],
              ],
              answer: 0,
              explain: [
                "Bu sorunun cevabı yoksa elinde pano değil, grafik yığını vardır. \"Kim açacak, hangi kararı verecek\" sorusu panonun tüm yerleşimini ve hangi metriklerin öne çıkacağını belirler.",
                "Without an answer to this question you don't have a dashboard, just a pile of charts. \"Who opens it, to make which decision\" shapes the whole layout and which metrics take priority.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Yerleşim kuralına göre panodaki en önemli metrik nereye konmalıdır?",
                "Per the layout rule, where should the dashboard's most important metric go?",
              ],
              options: [
                ["Sol üst", "Top-left"],
                ["Sağ alt", "Bottom-right"],
                ["Tam ortaya", "Dead centre"],
                ["Sayfanın en altına", "At the very bottom of the page"],
              ],
              answer: 0,
              explain: [
                "Batı dillerinde göz okumaya sol üstten başlar; en önemli metriği oraya koymak onun ilk görülen şey olmasını sağlar. Detay ve dökümler aşağıya, ikincil alanlara iner.",
                "In left-to-right languages the eye starts reading top-left, so putting the most important metric there guarantees it's seen first. Detail and breakdowns move down into secondary areas.",
              ],
            }),
            text(
              "Etkileşim araçları:\n\n- **Filter Action** — bir görselde tıklanan öğe diğerlerini filtreler\n- **Highlight Action** — filtrelemek yerine ilgili öğeleri vurgular\n- **Parametre** — kullanıcının metriği veya eşiği seçmesini sağlar\n- **Dashboard Container** — mobil düzen için yerleşimi gruplar",
              "Interaction tools:\n\n- **Filter Action** — clicking a mark in one view filters the others\n- **Highlight Action** — highlights related marks instead of filtering\n- **Parameter** — lets the user pick a metric or a threshold\n- **Dashboard Container** — groups layout for responsive/mobile design",
            ),
            quiz({
              id: "q4",
              q: [
                "Filter Action ne yapar?",
                "What does a Filter Action do?",
              ],
              options: [
                [
                  "Bir görselde tıklanan öğe, diğer görselleri filtreler",
                  "Clicking a mark in one view filters the other views",
                ],
                ["Sadece tıklanan öğeyi renklendirir, diğerlerini gizlemez", "Only colours the clicked mark without hiding others"],
                ["Kullanıcının bir metrik veya eşik seçmesini sağlar", "Lets the user pick a metric or threshold"],
                ["Panoyu mobil düzene göre gruplar", "Groups the dashboard for a mobile layout"],
              ],
              answer: 0,
              explain: [
                "Filter Action, bir görselde yapılan tıklamayı diğer görsellerin filtresi olarak yayar — örneğin bir bölgeye tıklamak, panonun geri kalanını o bölgeye göre daraltır.",
                "A Filter Action propagates a click in one view as a filter on the other views — for example, clicking a region narrows the rest of the dashboard down to that region.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Highlight Action, Filter Action'dan nasıl farklıdır?",
                "How does a Highlight Action differ from a Filter Action?",
              ],
              options: [
                [
                  "Veriyi filtrelemez, sadece ilgili öğeleri vurgular; geri kalanı görünür kalır",
                  "It doesn't filter the data, it only highlights related marks; the rest stays visible",
                ],
                ["İkisi tamamen aynı işi yapar", "They do exactly the same thing"],
                ["Highlight Action sadece haritalarda çalışır", "Highlight Action only works on maps"],
                ["Highlight Action veriyi kalıcı olarak siler", "Highlight Action permanently deletes the data"],
              ],
              answer: 0,
              explain: [
                "Filter Action ilgisiz verileri görselden çıkarırken, Highlight Action hiçbir şeyi filtrelemez — sadece ilgili işaretleri vurgulayıp geri kalanını soluklaştırır. Bağlamı korumak istediğinde tercih edilir.",
                "A Filter Action removes unrelated data from the view, while a Highlight Action filters nothing — it just highlights related marks and dims the rest. Use it when you want to keep the context visible.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Kullanıcının panoda gösterilecek metriği veya eşiği kendisinin seçmesini sağlayan araç hangisidir?",
                "Which tool lets the user choose which metric or threshold the dashboard shows?",
              ],
              options: [
                ["Parametre", "Parameter"],
                ["Filter Action", "Filter Action"],
                ["Highlight Action", "Highlight Action"],
                ["Dashboard Container", "Dashboard Container"],
              ],
              answer: 0,
              explain: [
                "Parametre, kullanıcıya bir kontrol (açılır liste, kaydırıcı) sunar ve seçtiği değer bir hesaplanan alan üzerinden görseli yönlendirir — örneğin \"Ciro\" ile \"Kâr\" arasında geçiş yapmak gibi.",
                "A Parameter offers the user a control (dropdown, slider), and their choice drives a view via a calculated field — for example switching between \"Revenue\" and \"Profit\".",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Dashboard Container ne işe yarar?",
                "What is a Dashboard Container for?",
              ],
              options: [
                [
                  "Yerleşimi gruplar, özellikle mobil/duyarlı düzen için",
                  "It groups layout, especially for responsive/mobile design",
                ],
                ["Verileri filtreler", "It filters the data"],
                ["Hesaplanan alan oluşturur", "It creates a calculated field"],
                ["Veri kaynağını yayınlar", "It publishes the data source"],
              ],
              answer: 0,
              explain: [
                "Container, görselleri yatay veya dikey bir grupta bir arada tutar; bu grup daha sonra ekran boyutuna göre otomatik olarak yeniden düzenlenebilir — mobil düzenin temel yapı taşıdır.",
                "A Container keeps views together in a horizontal or vertical group, which can then rearrange automatically based on screen size — it's the basic building block of a mobile layout.",
              ],
            }),
            tip(
              "Mobil düzeni ayrıca tasarla",
              "Design the phone layout separately",
              "Tableau'da `Device Preview` ile telefon düzeni ayrı kaydedilir. Masaüstünde yan yana duran üç grafik telefonda alt alta inmeli, filtre paneli üste taşınmalı ve metin boyutları büyütülmeli. Panolarını yöneticiler çoğunlukla telefondan açar — bu adımı atlamak, panonun kullanılmamasının en yaygın sebebidir.",
              "Tableau saves a separate phone layout via `Device Preview`. Three charts side by side on desktop should stack vertically on a phone, filters move to the top, and font sizes go up. Executives mostly open dashboards on their phone — skipping this step is the most common reason a dashboard goes unused.",
            ),
            quiz({
              id: "q8",
              q: [
                "Tableau'da telefon için ayrı bir düzen nasıl kaydedilir?",
                "How do you save a separate layout for phones in Tableau?",
              ],
              options: [
                ["`Device Preview` özelliğiyle", "With the `Device Preview` feature"],
                ["Otomatik olarak, ek bir işlem gerekmez", "Automatically, no extra step needed"],
                ["Sadece Tableau Server'a yayınlandıktan sonra", "Only after publishing to Tableau Server"],
                ["Mobil düzen Tableau'da kaydedilemez", "A mobile layout cannot be saved in Tableau"],
              ],
              answer: 0,
              explain: [
                "`Device Preview`, masaüstünden bağımsız olarak telefon (ve tablet) için ayrı bir düzen tasarlamanı ve kaydetmeni sağlar. Bu adımı atlayanların panosu telefonda genelde kullanılamaz hale gelir.",
                "`Device Preview` lets you design and save a separate layout for phone (and tablet), independent of the desktop version. Skipping this step usually makes a dashboard unusable on a phone.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Masaüstünde yan yana duran üç grafik, telefon düzeninde nasıl olmalı?",
                "Three charts sitting side by side on desktop — how should they appear in the phone layout?",
              ],
              options: [
                ["Alt alta (dikey) sıralanmalı", "Stacked vertically"],
                ["Aynı şekilde yan yana kalmalı", "Stay side by side exactly as-is"],
                ["Üçü de tek bir grafikte birleştirilmeli", "All three should be merged into one chart"],
                ["Telefonda hiç gösterilmemeli", "They shouldn't be shown on phone at all"],
              ],
              answer: 0,
              explain: [
                "Telefon ekranı dar olduğu için yan yana duran grafikler sıkışır ve okunmaz hale gelir. Doğru yaklaşım onları alt alta yığmak, filtre panelini üste taşımak ve yazı boyutlarını büyütmektir.",
                "A phone screen is narrow, so charts sitting side by side get cramped and unreadable. The right approach is to stack them vertically, move filters to the top, and increase font sizes.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "3–5'ten fazla KPI eklemek istiyorsun. Kalan metrikleri nereye taşımalısın?",
                "You want to add more than 3–5 KPIs. Where should the remaining metrics go?",
              ],
              options: [
                [
                  "İkinci bir sayfaya veya detay görünümüne",
                  "To a second page or a detail view",
                ],
                ["Aynı sayfaya, daha küçük punto ile sıkıştırarak", "Onto the same page, squeezed in at a smaller font size"],
                ["Tooltip'lere gizleyerek hiç göstermeden", "Hidden entirely inside tooltips"],
                ["Panonun kenarına renksiz olarak", "Along the edge of the dashboard, without colour"],
              ],
              answer: 0,
              explain: [
                "Ana sayfa 3–5 KPI ile sınırlı kalmalı ki kullanıcı bir bakışta kavrayabilsin. Kalan metrikler, isteyenin tıklayıp inceleyebileceği ikinci bir sayfaya veya detay görünümüne taşınır — bu, panonun ana mesajını korur.",
                "The main page should stay limited to 3–5 KPIs so someone can absorb it at a glance. The rest move to a second page or detail view that a curious user can click into — this protects the dashboard's core message.",
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
            quiz({
              id: "q2",
              q: [
                "FIXED LOD ifadesi ne yapar?",
                "What does a FIXED LOD expression do?",
              ],
              options: [
                [
                  "Görseldeki boyutları yok sayar, sadece ifadede belirtilenleri kullanır",
                  "It ignores the view's dimensions and uses only the ones named in the expression",
                ],
                ["Görseldeki boyutlara ek bir boyut katar", "It adds an extra dimension on top of the view's"],
                ["Görseldeki boyutlardan birini çıkarır", "It removes one of the view's dimensions"],
                ["Sadece filtrelerle birlikte çalışır", "It only works together with filters"],
              ],
              answer: 0,
              explain: [
                "FIXED, hesaplamayı görselin ayrıntı düzeyinden tamamen bağımsız hale getirir; yalnızca parantez içinde belirttiğin boyutları kullanır. Görsele hangi başka boyut eklenirse eklensin sonuç değişmez.",
                "FIXED makes the calculation entirely independent of the view's level of detail; it uses only the dimensions you name inside the braces. No matter what other dimension gets added to the view, the result stays the same.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "INCLUDE LOD ifadesi ne yapar?",
                "What does an INCLUDE LOD expression do?",
              ],
              options: [
                [
                  "Görseldeki boyutlara ek olarak belirttiğin boyutu da katar",
                  "It adds the dimension you name on top of the view's existing dimensions",
                ],
                ["Görseldeki boyutları tamamen yok sayar", "It ignores the view's dimensions entirely"],
                ["Görseldeki bir boyutu kaldırır", "It removes a dimension from the view"],
                ["Sadece tarih alanlarında çalışır", "It only works with date fields"],
              ],
              answer: 0,
              explain: [
                "INCLUDE, görselin mevcut ayrıntı düzeyine senin belirttiğin boyutu ekler ve hesaplamayı bu daha ince düzeyde yapar — sonra Tableau bunu görselin düzeyine geri toplar.",
                "INCLUDE adds the dimension you name to the view's existing level of detail and computes at that finer level — Tableau then re-aggregates it back to the view's level.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "EXCLUDE LOD ifadesi ne yapar?",
                "What does an EXCLUDE LOD expression do?",
              ],
              options: [
                [
                  "Görseldeki boyutlardan belirttiğini çıkarır, hesaplamayı daha kaba bir düzeyde yapar",
                  "It removes the named dimension from the view's, computing at a coarser level",
                ],
                ["Görseldeki boyutlara yeni bir boyut ekler", "It adds a new dimension to the view's"],
                ["Görseldeki tüm boyutları yok sayar", "It ignores all of the view's dimensions"],
                ["Sadece ölçülerle birlikte çalışır", "It only works together with measures"],
              ],
              answer: 0,
              explain: [
                "EXCLUDE, görselin ayrıntı düzeyinden belirttiğin boyutu çıkarır; sonuç daha kaba (daha genel) bir düzeyde hesaplanır. Bir alt kategorinin, üst kategori toplamına oranını hesaplamak tam bu mantığa dayanır.",
                "EXCLUDE removes the named dimension from the view's level of detail; the result is computed at a coarser (more general) level. Computing a sub-category's share of its parent category's total relies on exactly this.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "`SUM([Satış]) / { EXCLUDE [Alt Kategori] : SUM([Satış]) }` ifadesi neyi hesaplar?",
                "What does `SUM([Sales]) / { EXCLUDE [Sub-Category] : SUM([Sales]) }` compute?",
              ],
              options: [
                [
                  "Alt kategorinin, kendi üst kategorisinin toplam satışı içindeki payını",
                  "The sub-category's share of its parent category's total sales",
                ],
                ["Alt kategorinin müşteri başına ortalama satışını", "The sub-category's average sales per customer"],
                ["Alt kategorinin ilk sipariş tarihini", "The sub-category's first order date"],
                ["Tüm mağazanın toplam satışını", "The total sales of the whole store"],
              ],
              answer: 0,
              explain: [
                "Pay, görseldeki alt kategori bazlı satışı temsil eder; payda ise Alt Kategori'yi hariç tutarak (EXCLUDE) daha üst düzeyde, yani kategori toplamını hesaplar. Oran, alt kategorinin kategorisi içindeki payını verir.",
                "The numerator is the view's sub-category-level sales; the denominator excludes Sub-Category to compute at the coarser, category-total level. The ratio gives the sub-category's share within its category.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`{ INCLUDE [Sipariş ID] : SUM([Satış]) }` ifadesi hangi senaryoda kullanılır?",
                "In which scenario is `{ INCLUDE [Order ID] : SUM([Sales]) }` used?",
              ],
              options: [
                [
                  "Görselde ürün detayı gösterilse bile sipariş başına ortalama satışı hesaplamak için",
                  "To compute average sales per order even when the view shows product-level detail",
                ],
                ["Müşterinin ilk sipariş tarihini bulmak için", "To find a customer's first order date"],
                ["Bir alt kategorinin kategori içindeki payını hesaplamak için", "To compute a sub-category's share of its category"],
                ["Görseldeki tüm boyutları yok saymak için", "To ignore all dimensions in the view"],
              ],
              answer: 0,
              explain: [
                "Görsel ürün düzeyinde ayrıntılıysa doğrudan SUM([Satış]) sipariş başına değil ürün satırı başına hesaplanmış olur. INCLUDE [Sipariş ID], hesaplamayı sipariş düzeyine sabitler, sonra bu, görselin geri kalanına göre özetlenir.",
                "If the view is broken down by product, a plain SUM([Sales]) would be per product row, not per order. INCLUDE [Order ID] pins the calculation to order level first, which then gets summarised against the rest of the view.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`{ FIXED [Müşteri ID] : SUM([Satış]) }` ifadesinin sonucu, görsele yeni bir boyut (örneğin Kategori) eklendiğinde değişir mi?",
                "Does the result of `{ FIXED [Customer ID] : SUM([Sales]) }` change when a new dimension (e.g. Category) is added to the view?",
              ],
              options: [
                [
                  "Hayır — FIXED, görseldeki boyutlardan tamamen bağımsızdır",
                  "No — FIXED is entirely independent of the view's dimensions",
                ],
                ["Evet, her yeni boyutla birlikte yeniden hesaplanır", "Yes, it recalculates with every new dimension"],
                ["Sadece boyut bir tarih alanıysa değişir", "Only changes if the dimension is a date field"],
                ["Sadece görsel bir harita ise değişir", "Only changes if the view is a map"],
              ],
              answer: 0,
              explain: [
                "FIXED'ın en belirgin özelliği tam olarak budur: görsele hangi başka boyut eklenirse eklensin, müşteri başına toplam satış sabit kalır çünkü hesaplama yalnızca `[Müşteri ID]` düzeyinde yapılır.",
                "This is FIXED's defining trait: no matter what other dimension gets added to the view, the total sales per customer stays the same, because the calculation is pinned solely to `[Customer ID]` level.",
              ],
            }),
            info(
              "FIXED filtreden önce çalışır",
              "FIXED runs before dimension filters",
              "Tableau'nun işlem sırasında `FIXED` LOD, **boyut filtrelerinden önce** hesaplanır. Yani rafta bir yıl filtresi olsa bile `{FIXED [Müşteri]: SUM([Satış])}` tüm yılları kapsar. Filtrenin LOD'a işlemesini istiyorsan filtreyi **Context Filter** yap (sağ tık → Add to Context).",
              "In Tableau's order of operations a `FIXED` LOD is computed **before** dimension filters. So even with a year filter on the shelf, `{FIXED [Customer]: SUM([Sales])}` spans every year. To make the filter apply, promote it to a **Context Filter** (right-click → Add to Context).",
            ),
            quiz({
              id: "q8",
              q: [
                "Tableau'nun işlem sırasında `FIXED` LOD ne zaman hesaplanır?",
                "In Tableau's order of operations, when is a `FIXED` LOD computed?",
              ],
              options: [
                ["Boyut filtrelerinden önce", "Before dimension filters"],
                ["Boyut filtrelerinden sonra", "After dimension filters"],
                ["Sadece görsel yayınlandıktan sonra", "Only after the view is published"],
                ["Extract yenilenince", "Only when the extract refreshes"],
              ],
              answer: 0,
              explain: [
                "FIXED, boyut filtrelerinden önce hesaplanır. Bu yüzden rafta bir yıl filtresi olsa bile `{FIXED [Müşteri]: SUM([Satış])}` tüm yılları kapsamaya devam eder — filtre bu hesaplamayı etkilemez.",
                "FIXED is computed before dimension filters. So even with a year filter on the shelf, `{FIXED [Customer]: SUM([Sales])}` keeps spanning every year — the filter does not affect this calculation.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Rafa koyduğun bir yıl filtresinin FIXED LOD sonucuna da işlemesini istiyorsun. Ne yapmalısın?",
                "You want a year filter on the shelf to also apply to the FIXED LOD result. What do you do?",
              ],
              options: [
                [
                  "Filtreyi Context Filter yapmak (sağ tık → Add to Context)",
                  "Promote the filter to a Context Filter (right-click → Add to Context)",
                ],
                ["FIXED yerine hiçbir LOD kullanmamak", "Not use any LOD instead of FIXED"],
                ["Filtreyi silip yeniden eklemek", "Delete and re-add the filter"],
                ["Bu mümkün değildir", "This is not possible"],
              ],
              answer: 0,
              explain: [
                "Context Filter'a yükseltilen bir filtre, işlem sırasında daha erken çalışır ve FIXED LOD'un temelini oluşturan veri kümesini daralttığı için sonucu etkiler. Normal boyut filtreleri bunu yapamaz.",
                "A filter promoted to Context Filter runs earlier in the order of operations, narrowing the underlying data set that the FIXED LOD is built on — so it does affect the result. A regular dimension filter cannot do this.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "EXCLUDE ile FIXED arasındaki temel fark nedir?",
                "What is the fundamental difference between EXCLUDE and FIXED?",
              ],
              options: [
                [
                  "EXCLUDE görseldeki mevcut boyutlardan birini çıkarır (göreceli); FIXED görseldeki boyutları tamamen yok sayıp sadece belirtilenleri kullanır (mutlak)",
                  "EXCLUDE removes one of the view's existing dimensions (relative); FIXED ignores the view's dimensions entirely and uses only the named ones (absolute)",
                ],
                ["İkisi birebir aynı sonucu üretir", "They produce exactly the same result"],
                ["EXCLUDE sadece tarih alanlarında çalışır", "EXCLUDE only works with date fields"],
                ["FIXED, INCLUDE'un başka bir adıdır", "FIXED is just another name for INCLUDE"],
              ],
              answer: 0,
              explain: [
                "EXCLUDE, görselin mevcut düzeyine göre bir boyutu çıkarır — görsele yeni bir boyut eklenirse EXCLUDE'un sonucu da değişebilir. FIXED ise görseldeki boyutlardan tamamen bağımsızdır; sadece parantez içinde adı geçenleri kullanır.",
                "EXCLUDE removes a dimension relative to the view's current level — if a new dimension is added to the view, EXCLUDE's result can change too. FIXED is entirely independent of the view's dimensions; it only uses what's named inside the braces.",
              ],
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
            quiz({
              id: "q1",
              q: [
                "Canlı bağlantı yerine Hyper extract kullanmanın performans üzerindeki tipik etkisi nedir?",
                "What is the typical performance impact of using a Hyper extract instead of a live connection?",
              ],
              options: [
                ["Çoğu senaryoda kat kat daha hızlıdır", "It's far faster in most scenarios"],
                ["Her zaman daha yavaştır", "It's always slower"],
                ["Hiçbir fark yaratmaz", "It makes no difference"],
                ["Sadece çok küçük veri setlerinde faydalıdır", "It only helps with very small data sets"],
              ],
              answer: 0,
              explain: [
                "Extract, veriyi Tableau'nun sıkıştırılmış Hyper motoruna kopyalar; sorgular kaynağa değil bu yerel motora gider. Bu, çoğu senaryoda canlı bağlantıdan kat kat hızlıdır.",
                "An extract copies the data into Tableau's compressed Hyper engine; queries hit that local engine instead of the source. This is far faster than a live connection in most scenarios.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Extract'e sadece kullandığın alanları alıp gereksiz sütunları atmanın performans faydası nedir?",
                "What is the performance benefit of bringing only the fields you use into the extract and dropping unused columns?",
              ],
              options: [
                ["Extract'in boyutunu küçültür ve sorguları hızlandırır", "It shrinks the extract's size and speeds up queries"],
                ["Extract'i bozar, kullanılamaz hale getirir", "It breaks the extract, making it unusable"],
                ["Hiçbir etkisi yoktur, sadece görünümü değiştirir", "It has no effect, only changes appearance"],
                ["Sadece dosya adını kısaltır", "It only shortens the file name"],
              ],
              answer: 0,
              explain: [
                "Kullanılmayan sütunlar extract'in boyutunu büyütür ve her sorguyu yavaşlatır. Sadece gerçekten kullanılan alanları almak extract'i küçültür ve sorgu süresini doğrudan azaltır.",
                "Unused columns bloat the extract's size and slow down every query. Bringing in only the fields actually used shrinks the extract and directly reduces query time.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir Data Source Filter ne zaman uygulanır?",
                "When is a Data Source Filter applied?",
              ],
              options: [
                ["Extract oluşturulurken", "While the extract is being built"],
                ["Kullanıcı görseli her açtığında yeniden", "Freshly every time a user opens the view"],
                ["Sadece pano yayınlandıktan sonra", "Only after the dashboard is published"],
                ["Hiçbir zaman, sadece görsel filtreler çalışır", "Never, only view-level filters run"],
              ],
              answer: 0,
              explain: [
                "Data Source Filter, extract oluşturma aşamasında uygulanır; istenmeyen satırlar extract'e hiç girmez. Bu, filtreyi kaynağa itmenin (\"push filters to the source\") tam olarak nasıl çalıştığıdır ve extract'i baştan küçültür.",
                "A Data Source Filter is applied while the extract is being built, so unwanted rows never enter the extract at all. This is exactly how \"pushing filters to the source\" works, and it shrinks the extract from the start.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "12 görselli bir panonun performans açısından maliyeti nedir?",
                "What is the performance cost of a 12-view dashboard?",
              ],
              options: [
                [
                  "12 ayrı sorgu çalıştırır çünkü her görsel kendi sorgusudur",
                  "It runs 12 separate queries because every view is its own query",
                ],
                ["Tek bir sorgu tüm görselleri besler", "A single query feeds all the views"],
                ["Görsel sayısının performansla hiçbir ilgisi yoktur", "The number of views has no relation to performance"],
                ["Sadece pano ilk açıldığında bir sorgu çalışır", "Only one query runs, when the dashboard first opens"],
              ],
              answer: 0,
              explain: [
                "Her görsel, veri katmanına kendi sorgusunu gönderir. Bu yüzden bir panoya eklenen her yeni görsel, açılış süresine ekstra bir sorgu daha ekler — 12 görsel demek 12 sorgu demektir.",
                "Every view sends its own query to the data layer. So each new view added to a dashboard adds one more query to the load time — 12 views means 12 queries.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "\"Only Relevant Values\" ayarlı bir hızlı filtre (quick filter) neden performansı düşürebilir?",
                "Why can a quick filter with \"Only Relevant Values\" hurt performance?",
              ],
              options: [
                ["Her etkileşimde ek bir sorgu tetikler", "It fires an extra query on every interaction"],
                ["Hiçbir zaman sorgu tetiklemez", "It never triggers a query"],
                ["Sadece pano ilk açıldığında çalışır", "It only runs when the dashboard first opens"],
                ["Extract'i otomatik olarak siler", "It automatically deletes the extract"],
              ],
              answer: 0,
              explain: [
                "\"Only Relevant Values\", filtre listesini güncel tutmak için kullanıcı her etkileşimde kaynağa ek bir sorgu gönderir. Bu, tek bir tıklamayı bile beklenenden yavaş hale getirebilir.",
                "\"Only Relevant Values\" sends an extra query to the source on every interaction to keep the filter list current. This can make even a single click slower than expected.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Hızlı filtre yerine parametre kullanmak neden performans açısından önerilir?",
                "Why is a parameter recommended over a quick filter for performance?",
              ],
              options: [
                [
                  "Parametre her etkileşimde ekstra bir sorgu tetiklemez",
                  "A parameter does not fire an extra query on every interaction",
                ],
                ["Parametre daha renkli görünür", "A parameter looks more colourful"],
                ["Parametreler extract gerektirmez", "Parameters don't require an extract"],
                ["Hızlı filtreler artık Tableau'da yoktur", "Quick filters no longer exist in Tableau"],
              ],
              answer: 0,
              explain: [
                "Parametre, kullanıcının seçimini bir hesaplanan alan üzerinden yönlendirir ve bunun için kaynağa ek bir sorgu göndermez. \"Only Relevant Values\" ayarlı bir hızlı filtre ise her etkileşimde bu ek yükü getirir.",
                "A parameter drives the user's choice through a calculated field without sending an extra query to the source. A quick filter with \"Only Relevant Values\" instead brings that extra load on every interaction.",
              ],
            }),
            tip(
              "Performance Recorder",
              "Performance Recorder",
              "Tableau Desktop'ta `Help → Settings and Performance → Start Performance Recording` ile hangi görselin kaç saniye sürdüğünü satır satır görürsün. Tahmin etmek yerine ölç: neredeyse her zaman süreyi tek bir görsel veya tek bir hesaplama yiyordur.",
              "In Tableau Desktop, `Help → Settings and Performance → Start Performance Recording` shows you second by second which view costs what. Measure instead of guessing: almost always a single view or a single calculation is eating the time.",
            ),
            quiz({
              id: "q7",
              q: [
                "Performance Recorder'ı Tableau Desktop'ta nereden başlatırsın?",
                "Where do you start the Performance Recorder in Tableau Desktop?",
              ],
              options: [
                ["`Help → Settings and Performance → Start Performance Recording`", "`Help → Settings and Performance → Start Performance Recording`"],
                ["`File → Export → Performance`", "`File → Export → Performance`"],
                ["`Data → Extract → Record`", "`Data → Extract → Record`"],
                ["`Server → Publish → Performance`", "`Server → Publish → Performance`"],
              ],
              answer: 0,
              explain: [
                "Performance Recorder, `Help → Settings and Performance → Start Performance Recording` menüsünden başlatılır ve kaydı bittiğinde hangi olayın ne kadar sürdüğünü gösteren bir çalışma kitabı üretir.",
                "The Performance Recorder is started from `Help → Settings and Performance → Start Performance Recording`, and once stopped it produces a workbook showing how long each event took.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Performance Recorder sana ne gösterir?",
                "What does the Performance Recorder show you?",
              ],
              options: [
                [
                  "Hangi görselin veya olayın kaç saniye sürdüğünü, satır satır",
                  "Which view or event took how many seconds, event by event",
                ],
                ["Sadece toplam dosya boyutunu", "Only the total file size"],
                ["Sadece kullanıcı sayısını", "Only the number of users"],
                ["Sadece renk paletini", "Only the colour palette"],
              ],
              answer: 0,
              explain: [
                "Kayıt, sorgu çalıştırma, düzen oluşturma gibi her olayı ayrı ayrı listeler ve her birinin ne kadar sürdüğünü gösterir — bu sayede yavaşlığın kaynağını tahmin etmek yerine kesin olarak görürsün.",
                "The recording lists every event — running a query, computing a layout — separately, showing how long each one took, so you see the source of the slowdown precisely instead of guessing.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bu derse göre performans sorunlarını nasıl teşhis etmelisin: tahmin ederek mi, ölçerek mi?",
                "Per this lesson, how should you diagnose performance problems — by guessing or by measuring?",
              ],
              options: [
                ["Ölçerek — Performance Recorder ile", "By measuring — with the Performance Recorder"],
                ["Tahmin ederek — deneyimli gözle bakmak yeterlidir", "By guessing — an experienced eye is enough"],
                ["Rastgele görselleri silerek", "By randomly deleting views"],
                ["Sadece internet hızını kontrol ederek", "By only checking internet speed"],
              ],
              answer: 0,
              explain: [
                "Ders açıkça \"tahmin etmek yerine ölç\" diyor. Performance Recorder olmadan hangi görselin veya hesaplamanın yavaş olduğunu tahmin etmek genellikle yanlış yere zaman harcatır.",
                "The lesson is explicit: \"measure instead of guessing\". Without the Performance Recorder, guessing which view or calculation is slow usually wastes time fixing the wrong thing.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Performance Recorder ile ölçüm yaptığında derse göre tipik olarak neyi keşfedersin?",
                "Per this lesson, what do you typically discover when you measure with the Performance Recorder?",
              ],
              options: [
                [
                  "Neredeyse her zaman süreyi tek bir görsel veya tek bir hesaplama yiyordur",
                  "Almost always a single view or a single calculation is eating the time",
                ],
                ["Bütün görseller eşit derecede yavaştır", "All views are equally slow"],
                ["Yavaşlık her zaman internet bağlantısından kaynaklanır", "Slowness always comes from the internet connection"],
                ["Performance Recorder hiçbir zaman bir sorun bulmaz", "The Performance Recorder never finds a problem"],
              ],
              answer: 0,
              explain: [
                "Deneyimler gösteriyor ki panoyu yavaşlatan genellikle her şey değil, tek bir ağır görsel veya tek bir pahalı hesaplamadır. Ölçüm bu tek noktayı bulup düzeltmeni sağlar; tahmin genelde yanlış yeri işaret eder.",
                "Experience shows it's usually not everything that's slow, but a single heavy view or a single expensive calculation. Measuring lets you find and fix that one spot; guessing usually points at the wrong place.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Yayınlanan veri kaynağının kazandırdığı \"Tek tanım\" faydası ne anlama gelir?",
                "What does the \"one definition\" benefit of a published data source mean?",
              ],
              options: [
                [
                  "\"Net Ciro\" gibi hesaplanan alanlar tek bir yerde durur, herkes aynısını kullanır",
                  "A calculated field like \"Net Revenue\" lives in one place and everyone uses the same one",
                ],
                ["Her çalışma kitabı kendi tanımını yapmaya devam eder", "Every workbook still creates its own definition"],
                ["Sadece tek bir kişi Tableau kullanabilir", "Only a single person can use Tableau"],
                ["Veri kaynağı tek bir tabloya indirgenir", "The data source is reduced to a single table"],
              ],
              answer: 0,
              explain: [
                "Herkes kendi bağlantısını kurduğunda \"Net Ciro\" gibi tanımlar zamanla farklılaşır. Yayınlanan veri kaynağında bu hesaplanan alan bir kez yazılır ve herkes ona bağlanarak aynı tanımı kullanır.",
                "When everyone builds their own connection, definitions like \"Net Revenue\" drift apart over time. In a published data source that calculated field is written once, and everyone connecting to it uses the same definition.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Merkezi yenileme (central refresh) faydası ne sağlar?",
                "What does the central-refresh benefit provide?",
              ],
              options: [
                [
                  "Extract bir kez yenilenir ve buna bağlanan herkes güncel veriden yararlanır",
                  "The extract refreshes once and everyone connected benefits from current data",
                ],
                ["Her kullanıcı kendi extract'ini ayrı ayrı yenilemek zorundadır", "Every user must refresh their own extract separately"],
                ["Veri hiçbir zaman yenilenmez", "The data never refreshes"],
                ["Sadece Tableau Server yöneticisi veriyi görebilir", "Only the Tableau Server admin can see the data"],
              ],
              answer: 0,
              explain: [
                "Yayınlanan veri kaynağının extract'i merkezi olarak zamanlanır ve yenilenir; ona bağlanan tüm çalışma kitapları bu tek yenilemeden yararlanır. Herkesin ayrı ayrı kendi extract'ini yenilemesi gerekmez.",
                "The published data source's extract is scheduled and refreshed centrally; every workbook connected to it benefits from that single refresh. Nobody needs to refresh their own separate extract.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Erişim kontrolü yayınlanan veri kaynağında nasıl işler?",
                "How does access control work with a published data source?",
              ],
              options: [
                [
                  "Kimin hangi veriyi göreceği tek bir yerden yönetilir",
                  "Who sees which data is managed from a single place",
                ],
                ["Her kullanıcı kendi erişim kurallarını kendi çalışma kitabında ayarlar", "Every user sets their own access rules in their own workbook"],
                ["Erişim kontrolü sadece dosya adıyla yapılır", "Access control is done purely through the file name"],
                ["Yayınlanan veri kaynaklarında erişim kontrolü yoktur", "There is no access control on published data sources"],
              ],
              answer: 0,
              explain: [
                "İzinler veri kaynağı düzeyinde tanımlanır; kimin görebileceği, kimin düzenleyebileceği tek bir yerden yönetilir. Bu, her çalışma kitabında ayrı ayrı erişim kuralları uğraşmaktan çok daha güvenli ve sürdürülebilirdir.",
                "Permissions are defined at the data source level; who can view and who can edit is managed from one place. This is far more secure and maintainable than juggling separate access rules in every workbook.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Kaynak veritabanının şeması değiştiğinde yayınlanan veri kaynağının avantajı nedir?",
                "When the source database schema changes, what is the advantage of a published data source?",
              ],
              options: [
                [
                  "Tek bir yeri düzeltmen yeterlidir, buna bağlı tüm çalışma kitapları düzelir",
                  "You only need to fix one place, and every connected workbook is fixed too",
                ],
                ["Her çalışma kitabını tek tek elden geçirmen gerekir", "You must go through every workbook one by one"],
                ["Şema değişikliği Tableau'yu hiç etkilemez", "A schema change never affects Tableau"],
                ["Tüm panoları sıfırdan yeniden kurman gerekir", "You have to rebuild every dashboard from scratch"],
              ],
              answer: 0,
              explain: [
                "Bağlantı ve alan tanımları tek bir yayınlanan veri kaynağında yaşadığı için şema değişince orada bir düzeltme yeterlidir; buna bağlı tüm çalışma kitapları otomatik olarak düzelmiş olur. Ayrı bağlantılarda bu düzeltmeyi her yerde tekrarlaman gerekirdi.",
                "Because the connection and field definitions live in one published data source, a schema change needs just one fix there, and every connected workbook is automatically fixed. With separate connections you would have to repeat that fix everywhere.",
              ],
            }),
            text(
              "**Veri kaynağını kullanılabilir kılmak** — yayınlamadan önce yapılacaklar:\n\n1. **Alanları yeniden adlandır.** `cust_id_fk` değil `Müşteri No`. Kullanıcı veritabanı sütun adlarını bilmek zorunda değil.\n2. **Klasörlere ayır.** Müşteri, Ürün, Sipariş, Hesaplamalar gibi. 80 alanlı düz bir liste kimsenin işine yaramaz.\n3. **Kullanılmayanları gizle.** Teknik anahtarları ve ara sütunları gizle; görünen alan sayısı ne kadar azsa o kadar kullanılır.\n4. **Varsayılan biçimleri ayarla.** Para birimi, ondalık basamak, tarih biçimi bir kez ayarlanır ve her raporda doğru gelir.\n5. **Açıklama ekle.** Her alana açıklama yazabilirsin; kullanıcı fareyle üzerine gelince görür.\n\nBu beş adım yarım saat sürer ve veri kaynağının kullanılıp kullanılmayacağını belirler.",
              "**Making a data source usable** — what to do before publishing:\n\n1. **Rename the fields.** `Customer No`, not `cust_id_fk`. Users should not have to know database column names.\n2. **Group into folders.** Customer, Product, Order, Calculations. A flat list of 80 fields helps nobody.\n3. **Hide what is unused.** Hide technical keys and intermediate columns; the fewer visible fields, the more it gets used.\n4. **Set default formats.** Currency, decimal places and date format are set once and come out right in every report.\n5. **Add descriptions.** You can write a description on each field; users see it on hover.\n\nThese five steps take half an hour and decide whether the data source gets used at all.",
            ),
            quiz({
              id: "q6",
              q: [
                "Alanları `cust_id_fk` yerine `Müşteri No` gibi yeniden adlandırmak neden önerilir?",
                "Why is it recommended to rename fields like `cust_id_fk` to `Customer No`?",
              ],
              options: [
                [
                  "Kullanıcıların veritabanı sütun adlarını bilmesi gerekmesin diye",
                  "So users don't need to know database column names",
                ],
                ["Tableau ham sütun adlarıyla çalışamaz", "Tableau cannot work with raw column names"],
                ["Yeniden adlandırma performansı artırır", "Renaming improves query performance"],
                ["Bu adım isteğe bağlıdır, hiçbir fark yaratmaz", "This step is optional and makes no difference"],
              ],
              answer: 0,
              explain: [
                "`cust_id_fk` gibi teknik bir sütun adı analist için anlamsızdır. `Müşteri No` gibi okunabilir bir isim, veri kaynağını herkesin anlayabileceği hale getirir — bu yüzden yayınlamadan önce ilk yapılacak iştir.",
                "A technical column name like `cust_id_fk` means nothing to an analyst. A readable name like `Customer No` makes the data source understandable to everyone — which is why it's the first thing to do before publishing.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "80 alanlı düz bir liste yerine ne yapılması önerilir?",
                "Instead of a flat list of 80 fields, what is recommended?",
              ],
              options: [
                [
                  "Alanları klasörlere ayırmak (Müşteri, Ürün, Sipariş, Hesaplamalar gibi)",
                  "Group the fields into folders (Customer, Product, Order, Calculations)",
                ],
                ["Alanları alfabetik sıraya sokup öylece bırakmak", "Sort fields alphabetically and leave it at that"],
                ["Tüm alanları tek bir dev hesaplanan alanda birleştirmek", "Merge all fields into one giant calculated field"],
                ["Alan sayısını azaltmak imkansızdır", "It's impossible to reduce the number of fields"],
              ],
              answer: 0,
              explain: [
                "Düz bir 80 alanlık liste kimsenin işine yaramaz; kullanıcı aradığı alanı bulamaz. Müşteri, Ürün, Sipariş, Hesaplamalar gibi klasörlere ayırmak, veri kaynağını gezilebilir hale getirir.",
                "A flat list of 80 fields helps nobody — users can't find what they need. Grouping into folders like Customer, Product, Order, Calculations makes the data source navigable.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Kullanılmayan teknik anahtarları ve ara sütunları gizlemenin faydası nedir?",
                "What is the benefit of hiding unused technical keys and intermediate columns?",
              ],
              options: [
                [
                  "Görünen alan sayısı azaldıkça veri kaynağı daha çok kullanılır",
                  "The fewer visible fields there are, the more the data source gets used",
                ],
                ["Gizlenen alanlar Tableau'dan tamamen silinir", "Hidden fields are permanently deleted from Tableau"],
                ["Gizleme hiçbir kullanıcı deneyimini etkilemez", "Hiding has no effect on the user experience"],
                ["Sadece yöneticiler alan gizleyebilir", "Only admins are allowed to hide fields"],
              ],
              answer: 0,
              explain: [
                "Teknik anahtarlar ve ara hesaplamalar son kullanıcı için gürültüdür. Bunları gizlemek görünen alan sayısını azaltır ve kullanıcının aradığı gerçek alanı hızlıca bulmasını sağlar — bu da kullanımı artırır.",
                "Technical keys and intermediate calculations are noise to the end user. Hiding them reduces the number of visible fields and lets users find the field they actually need quickly — which drives adoption.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Para birimi, ondalık basamak, tarih biçimi gibi varsayılan biçimleri veri kaynağında bir kez ayarlamanın faydası nedir?",
                "What is the benefit of setting defaults like currency, decimal places and date format once at the data source level?",
              ],
              options: [
                [
                  "Her raporda otomatik olarak doğru gelir, her analist tekrar ayarlamak zorunda kalmaz",
                  "It comes out right automatically in every report, so no analyst has to set it again",
                ],
                ["Biçim ayarları sadece bir çalışma kitabında geçerlidir", "Format settings only apply within a single workbook"],
                ["Biçimlendirme veri kaynağı düzeyinde yapılamaz", "Formatting cannot be done at the data source level"],
                ["Bu ayar her yenilemede sıfırlanır", "This setting resets on every refresh"],
              ],
              answer: 0,
              explain: [
                "Biçim veri kaynağına bağlı olduğu için, ona bağlanan her yeni çalışma kitabı bu ayarı otomatik miras alır. Her analistin kendi raporunda para birimini veya ondalık basamağı yeniden ayarlaması gerekmez.",
                "Because formatting lives on the data source, every new workbook connecting to it automatically inherits it. No analyst needs to re-set currency or decimal places in their own report.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "Yeniden adlandırma, klasörleme, gizleme, biçim ve açıklama eklemeden oluşan beş hazırlık adımı ne kadar sürer ve neyi belirler?",
                "How long do the five prep steps — renaming, folders, hiding, formats, descriptions — take, and what do they decide?",
              ],
              options: [
                [
                  "Yarım saat sürer ve veri kaynağının gerçekten kullanılıp kullanılmayacağını belirler",
                  "They take half an hour and decide whether the data source actually gets used",
                ],
                ["Günler sürer ve sadece görsel estetiği etkiler", "They take days and only affect visual aesthetics"],
                ["Hiç sürmez, Tableau bunları otomatik yapar", "They take no time, Tableau does them automatically"],
                ["Sadece Tableau Server yöneticisi bu adımları yapabilir", "Only the Tableau Server admin can perform these steps"],
              ],
              answer: 0,
              explain: [
                "Ders bunu açıkça belirtiyor: bu beş adım yarım saat sürer ama veri kaynağının kullanılıp kullanılmayacağını belirler. İyi hazırlanmamış bir kaynak, teknik olarak doğru olsa bile kimse tarafından tercih edilmez.",
                "The lesson states this directly: these five steps take half an hour but decide whether the data source gets used at all. A poorly prepared source, even if technically correct, gets adopted by nobody.",
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
            quiz({
              id: "q2",
              q: [
                "Sertifikalı (Certified) projeye kim yayın yapabilir?",
                "Who may publish to the Certified project?",
              ],
              options: [
                ["Sadece veri ekibi", "Only the data team"],
                ["Herkes, sınırsız olarak", "Anyone, without limits"],
                ["Sadece Tableau Server yöneticisi", "Only the Tableau Server admin"],
                ["Departman analistleri", "Departmental analysts"],
              ],
              answer: 0,
              explain: [
                "Sertifikalı proje onaylanmış, güvenilir içeriği barındırır; bu güveni korumak için yalnızca veri ekibi buraya yayın yapabilir. Diğer herkes departman veya sandbox projelerini kullanır.",
                "The Certified project hosts approved, trusted content; to protect that trust, only the data team may publish there. Everyone else uses the departmental or sandbox projects.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Satış, Finans, Pazarlama gibi departman projelerine kim yayın yapar?",
                "Who publishes to departmental projects like Sales, Finance, Marketing?",
              ],
              options: [
                ["Departman analistleri", "Departmental analysts"],
                ["Sadece veri ekibi", "Only the data team"],
                ["Hiç kimse, bu projeler otomatik doldurulur", "Nobody, these projects fill automatically"],
                ["Sadece yöneticiler (executives)", "Only executives"],
              ],
              answer: 0,
              explain: [
                "Departman projeleri, o departmanın analistlerine ait çalışma alanıdır — Satış analisti Satış projesine yayın yapar. Bu, içeriğin sahipliğini ve sorumluluğunu departmanla eşleştirir.",
                "Departmental projects are the workspace for that department's analysts — a Sales analyst publishes to the Sales project. This matches content ownership and accountability with the department.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Bir çalışma kitabının tipik olgunlaşma yolu nasıl işler?",
                "How does a workbook's typical maturation path work?",
              ],
              options: [
                [
                  "Önce sandbox'ta doğar, olgunlaşınca departmana, kanıtlanınca sertifikalıya terfi eder",
                  "It is born in the sandbox, moves to a department as it matures, and is promoted to Certified once proven",
                ],
                ["Doğrudan sertifikalı projede oluşturulur", "It is created directly in the Certified project"],
                ["Hiçbir zaman proje değiştirmez", "It never changes project"],
                ["Sırasıyla departman, sandbox, sertifikalı olarak ilerler", "It progresses department, sandbox, Certified in that order"],
              ],
              answer: 0,
              explain: [
                "İçerik önce güvenli deneme alanı olan sandbox'ta ortaya çıkar. Olgunlaştıkça departman projesine, kanıtlandıkça (güvenilir ve doğru olduğu görüldükçe) sertifikalı projeye terfi eder.",
                "Content first appears in the safe experimentation space, the sandbox. As it matures it moves to the departmental project, and once proven trustworthy and correct it gets promoted to Certified.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Projeler (Projects), kontrolsüz büyümeye karşı neden \"ilk savunma\" olarak tanımlanıyor?",
                "Why are Projects described as the \"first line of defence\" against uncontrolled growth?",
              ],
              options: [
                [
                  "İçeriği kategorilere ayırır ve her kategorinin izinlerini ayrı yönetir",
                  "They split content into categories and manage each category's permissions separately",
                ],
                ["Projeler dosya boyutunu otomatik küçültür", "Projects automatically shrink file size"],
                ["Projeler grafiklerin görünümünü standartlaştırır", "Projects standardise how charts look"],
                ["Projeler içerik oluşturmayı tamamen engeller", "Projects prevent content creation entirely"],
              ],
              answer: 0,
              explain: [
                "Proje yapısı, güvenilirliği ve olgunluğu farklı içeriği birbirinden ayırır; her projenin kendi izinleri vardır. Bu ayrım olmadan tüm çalışma kitapları tek bir yığında birikir ve hiçbiri diğerinden ayırt edilemez.",
                "The project structure separates content of differing trust and maturity, each with its own permissions. Without this separation every workbook piles up in one heap, indistinguishable from the rest.",
              ],
            }),
            text(
              "**Ölçmeden yönetemezsin.** Tableau Server'ın kendi yönetim görünümleri (Admin Views) şunları söyler:\n\n- Hangi çalışma kitabı kaç kez açılmış\n- Hangi kitaplar aylardır hiç açılmamış\n- Hangi çıkarma yenilemeleri başarısız oluyor\n- Kim ne kadar kaynak tüketiyor\n\nBu verilerle basit ama etkili bir yaşam döngüsü kurabilirsin: **90 gün açılmayan içerik arşivlenir, 180 gün sonra silinir.** Sahibine önceden e-posta gider, itiraz ederse kalır.\n\nBu politika ilk bakışta sert görünür ama alternatifi daha kötüdür: kimsenin güvenmediği, hiçbirinin bakımı yapılmayan yüzlerce rapor. Kural, silmek değil **sahiplenmeye zorlamaktır**.",
              "**You cannot manage what you do not measure.** Tableau Server's own Admin Views tell you:\n\n- how many times each workbook was opened\n- which workbooks have not been opened in months\n- which extract refreshes are failing\n- who is consuming how much capacity\n\nWith that data you can run a simple but effective lifecycle: **content unopened for 90 days is archived and deleted after 180.** The owner is emailed in advance and can object to keep it.\n\nThe policy looks harsh at first, but the alternative is worse: hundreds of reports nobody trusts and nobody maintains. The rule is not really about deleting — it is about **forcing ownership**.",
            ),
            quiz({
              id: "q6",
              q: [
                "Tableau Server'ın Admin Views'i sana hangi bilgileri sunar?",
                "What information does Tableau Server's Admin Views give you?",
              ],
              options: [
                [
                  "Kaç kez açıldığı, hangi kitapların uzun süredir açılmadığı, hangi yenilemelerin başarısız olduğu, kimin ne kadar kaynak tükettiği",
                  "How many times each workbook was opened, which haven't been opened in a while, which refreshes are failing, who is consuming how much capacity",
                ],
                ["Sadece kullanıcıların şifrelerini", "Only users' passwords"],
                ["Sadece dosya boyutlarını", "Only file sizes"],
                ["Sadece renk temalarını", "Only colour themes"],
              ],
              answer: 0,
              explain: [
                "Admin Views, içerik yönetimi için gereken ham veriyi sağlar: kullanım sıklığı, terk edilmiş içerik, başarısız yenilemeler ve kaynak tüketimi. Bu veri olmadan yönetim kararları tahmine dayanır.",
                "Admin Views supplies the raw data needed for content management: usage frequency, abandoned content, failed refreshes and capacity consumption. Without this data, management decisions are just guesses.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Bu derste anlatılan yaşam döngüsü politikasına göre 90 gün açılmayan içeriğe ne olur?",
                "Per the lifecycle policy described in this lesson, what happens to content unopened for 90 days?",
              ],
              options: [
                ["Arşivlenir", "It gets archived"],
                ["Hemen kalıcı olarak silinir", "It's permanently deleted immediately"],
                ["Otomatik olarak sertifikalıya terfi eder", "It's automatically promoted to Certified"],
                ["Hiçbir şey olmaz", "Nothing happens"],
              ],
              answer: 0,
              explain: [
                "Politikanın ilk aşaması arşivlemedir, silme değil. Bu, sahibine tepki gösterecek zaman tanır ve içeriğin gerçekten terk edilip edilmediğini anlamak için bir ara adım sağlar.",
                "The first stage of the policy is archiving, not deleting. This gives the owner time to react and provides a middle step to check whether the content is truly abandoned.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "180 gün açılmayan bir içeriğe ne olur ve sahibine ne bildirilir?",
                "What happens to content unopened for 180 days, and what is the owner told?",
              ],
              options: [
                [
                  "Silinir; ama sahibine önceden e-posta gider ve itiraz ederse içerik kalır",
                  "It's deleted; but the owner is emailed in advance and can object to keep it",
                ],
                ["Silinir ve sahibine hiçbir bildirim yapılmaz", "It's deleted with no notification to the owner at all"],
                ["Sadece görünürlüğü kısıtlanır, silinmez", "It's only restricted from view, never deleted"],
                ["Otomatik olarak sertifikalıya terfi eder", "It's automatically promoted to Certified"],
              ],
              answer: 0,
              explain: [
                "180 gün sonrasında içerik silinir, ama bu sürpriz bir işlem değildir: sahibine önceden e-posta gider ve içeriğe hâlâ ihtiyacı varsa itiraz ederek koruyabilir. Politika sert görünse de kör bir silme değildir.",
                "After 180 days content is deleted, but this isn't a surprise action: the owner is emailed in advance and can object to keep it if they still need it. Harsh as it looks, the policy isn't blind deletion.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bu silme politikasının asıl amacı derse göre nedir?",
                "Per this lesson, what is the real point of this deletion policy?",
              ],
              options: [
                [
                  "Silmek değil, içeriğe sahip çıkmayı zorlamak",
                  "Not deleting per se, but forcing ownership of content",
                ],
                ["Depolama maliyetini sıfıra indirmek", "Reducing storage cost to zero"],
                ["Analistleri cezalandırmak", "Punishing analysts"],
                ["Tableau Server'ı tamamen boşaltmak", "Emptying Tableau Server entirely"],
              ],
              answer: 0,
              explain: [
                "Ders açıkça şunu söylüyor: kural aslında silmekle ilgili değil, sahiplenmeye zorlamakla ilgilidir. Alternatif — kimsenin güvenmediği, bakımı yapılmayan yüzlerce rapor — çok daha kötüdür.",
                "The lesson states it directly: the rule isn't really about deleting, it's about forcing ownership. The alternative — hundreds of reports nobody trusts and nobody maintains — is far worse.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "Kendi bilgisayarında iş tutmak neden sandbox'tan daha kötü bir seçenektir?",
                "Why is keeping work on a personal computer a worse option than the sandbox?",
              ],
              options: [
                [
                  "Kişi ayrıldığında iş kaybolur çünkü hiç yedeklenmemiştir",
                  "When the person leaves, the work disappears because it was never backed up",
                ],
                ["Kişisel bilgisayarlar Tableau dosyalarını açamaz", "Personal computers cannot open Tableau files"],
                ["Sandbox'tan daha yavaştır", "It's slower than the sandbox"],
                ["Aslında sandbox'tan hiçbir farkı yoktur", "It's actually no different from the sandbox"],
              ],
              answer: 0,
              explain: [
                "Sandbox, Tableau Server üzerinde durur ve kurumsal yedekleme kapsamındadır. Kişisel bilgisayarda tutulan iş hiçbir merkezi yedeklemeden geçmez; kişi ayrılınca o iş geri getirilemez şekilde kaybolur.",
                "The sandbox lives on Tableau Server and falls under organisational backup. Work kept on a personal computer goes through no central backup at all; when the person leaves, that work is lost for good.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
