import type { Track } from "@/lib/types";
import { L, info, lesson, pitfall, quiz, text, tip } from "../helpers";

export const vizTrack: Track = {
  slug: "veri-gorsellestirme",
  name: "Veri Görselleştirme",
  category: "bi",
  color: "#fb7185",
  icon: "🎨",
  tagline: L("Sayıyı anlaşılır kılmak", "Making numbers understandable"),
  description: L(
    "Araçtan bağımsız görselleştirme ilkeleri: hangi grafik, hangi renk, hangi metin? Bir analizin değeri, karşı tarafın onu anlamasıyla sınırlıdır — bu patika o sınırı kaldırır.",
    "Tool-agnostic visualisation principles: which chart, which colour, which words? An analysis is only worth what the other side understands of it — this track removes that ceiling.",
  ),
  levels: [
    {
      id: "foundation",
      title: L("Neden görselleştiriyoruz?", "Why do we visualise?"),
      description: L(
        "Grafiğin işi süslemek değil, bir soruyu yanıtlamaktır. Doğru grafiği seçmeyi öğren.",
        "A chart's job is not decoration but answering a question. Learn to pick the right one.",
      ),
      lessons: [
        lesson({
          slug: "grafigin-amaci",
          title: L("Grafiğin amacı ve Anscombe dörtlüsü", "The purpose of a chart, and Anscombe's quartet"),
          summary: L(
            "Aynı ortalamaya sahip dört veri seti, dört tamamen farklı hikâye anlatabilir.",
            "Four datasets with identical statistics can tell four completely different stories.",
          ),
          minutes: 12,
          blocks: [
            text(
              "1973'te istatistikçi Frank Anscombe dört veri seti hazırladı. Dördünün de ortalaması, varyansı, korelasyonu ve regresyon doğrusu **neredeyse birebir aynıydı**. Ama çizildiklerinde:\n\n- Birincisi düzgün bir doğrusal ilişki\n- İkincisi belirgin bir eğri\n- Üçüncüsü tek bir aykırı değerin bozduğu kusursuz bir doğru\n- Dördüncüsü tek bir noktanın yarattığı sahte ilişki\n\nDers açık: **özet istatistikler yalan söyleyebilir, grafik söylemez.** Bu yüzden her analizin ilk adımı özet tablo değil, veriyi çizmektir.",
              "In 1973 the statistician Frank Anscombe built four datasets. All four had **virtually identical** means, variances, correlations and regression lines. But when plotted:\n\n- the first is a clean linear relationship\n- the second an obvious curve\n- the third a perfect line ruined by one outlier\n- the fourth a spurious relationship created by a single point\n\nThe lesson is plain: **summary statistics can lie; a chart cannot.** This is why the first step of any analysis is to plot the data, not to tabulate a summary.",
            ),
            quiz({
              id: "q2",
              q: [
                "Anscombe'nin dört veri setinde ortalama, varyans, korelasyon ve regresyon doğrusu nasıldı?",
                "How did the mean, variance, correlation and regression line compare across Anscombe's four datasets?",
              ],
              options: [
                ["Neredeyse birebir aynıydı", "Virtually identical"],
                ["Tamamen farklıydı", "Completely different"],
                ["Sadece ortalama aynıydı", "Only the mean matched"],
                ["Hiçbiri hesaplanamadı", "None of them could be computed"],
              ],
              answer: 0,
              explain: [
                "Dörtlünün tüm gücü buradan gelir: özet istatistikler neredeyse birebir eşleşirken çizilen şekiller tamamen farklıydı. Bu yüzden istatistik tek başına yeterli değildir.",
                "The whole point of the quartet is here: the summary statistics matched almost exactly while the plotted shapes were completely different. Statistics alone are never enough.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "İkinci Anscombe veri setini çizince ne görülür?",
                "What do you see when you plot the second Anscombe dataset?",
              ],
              options: [
                ["Belirgin bir eğri", "An obvious curve"],
                ["Düzgün doğrusal bir ilişki", "A clean linear relationship"],
                ["Tek bir aykırı değerin bozduğu doğru", "A line ruined by one outlier"],
                ["Tek bir noktanın yarattığı sahte ilişki", "A spurious relationship from a single point"],
              ],
              answer: 0,
              explain: [
                "İkinci veri seti bir eğridir; doğrusal regresyon ona uydurulunca ilişkinin gerçek şeklini gizler. Sadece grafiğe bakınca bu hemen görülür.",
                "The second dataset is a curve; fitting a linear regression to it hides the true shape of the relationship. Plotting it makes this immediately visible.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Üçüncü veri setinde grafiği bozan nedir?",
                "What corrupts the picture in the third dataset?",
              ],
              options: [
                ["Tek bir aykırı değer", "A single outlier"],
                ["Yanlış ölçeklenmiş eksen", "A wrongly scaled axis"],
                ["Eksik veri noktaları", "Missing data points"],
                ["Yanlış renk kodlaması", "Incorrect colour coding"],
              ],
              answer: 0,
              explain: [
                "Diğer noktalar kusursuz bir doğru üzerindedir; tek bir aykırı değer regresyon doğrusunu çekiştirir. Bu, tek bir noktanın istatistikleri nasıl domine edebileceğinin klasik örneğidir.",
                "The remaining points sit on a perfect line; one outlier alone drags the regression line. It is the classic example of a single point dominating a statistic.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Dördüncü veri setindeki ilişki neden sahtedir?",
                "Why is the relationship in the fourth dataset fake?",
              ],
              options: [
                ["Tek bir noktanın yarattığı yapay korelasyon", "An artificial correlation created by a single point"],
                ["Verinin çoğu eksik olduğu için", "Because most of the data is missing"],
                ["Ölçüm hatası olduğu için", "Because of a measurement error"],
                ["Örneklem çok büyük olduğu için", "Because the sample is too large"],
              ],
              answer: 0,
              explain: [
                "Noktaların neredeyse tamamı aynı x değerinde dikey bir çizgi üzerindedir; tek bir uç noktanın konumu regresyon doğrusunu var etmiş gibi görünür. Bu nokta kaldırılsa ilişki tamamen kaybolur.",
                "Almost all the points sit on a vertical line at the same x value; one lone point's position is what makes the regression line appear at all. Remove it and the relationship vanishes.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Anscombe dörtlüsüne göre bir analize başlarken ilk adım ne olmalı?",
                "According to Anscombe's quartet, what should be the first step of any analysis?",
              ],
              options: [
                ["Veriyi çizmek, özet tabloyla başlamamak", "Plot the data, not start from a summary table"],
                ["Ortalamayı hesaplamak", "Compute the mean"],
                ["Regresyon katsayısını bulmak", "Find the regression coefficient"],
                ["Korelasyonu raporlamak", "Report the correlation"],
              ],
              answer: 0,
              explain: [
                "Özet istatistikler, dörtlünün gösterdiği gibi tamamen farklı verileri aynı gösterebilir. Grafik bu farkı geri getirir; bu yüzden veriyi çizmek her analizin ilk adımı olmalıdır.",
                "As the quartet shows, summary statistics can make wildly different data look identical. A chart restores that difference, which is why plotting comes before tabulating.",
              ],
            }),
            text(
              "Bir grafik yapmadan önce cevaplaman gereken tek soru şudur: **bu grafik hangi soruyu yanıtlıyor?**\n\nCevap \"satışları göstermek\" ise grafik muhtemelen işe yaramayacaktır. İyi cevaplar somuttur:\n\n- \"Hangi bölge hedefin altında kaldı?\"\n- \"Ciro artışı mevsimsel mi, gerçek büyüme mi?\"\n- \"Fiyat artışı sonrası müşteri kaybı hızlandı mı?\"\n\nSoru netleştiğinde grafik türü çoğu zaman kendiliğinden belli olur. Soru belirsizse hiçbir grafik türü kurtarmaz.",
              "There is one question to answer before making any chart: **which question does this chart answer?**\n\nIf the answer is \"to show sales\", the chart will probably be useless. Good answers are specific:\n\n- \"Which region fell short of target?\"\n- \"Is the revenue rise seasonal or real growth?\"\n- \"Did churn accelerate after the price increase?\"\n\nOnce the question is sharp, the chart type usually becomes obvious. If the question is vague, no chart type will save it.",
            ),
            quiz({
              id: "q7",
              q: [
                "\"Bu grafik hangi soruyu yanıtlıyor?\" sorusuna \"satışları göstermek\" cevabı neden zayıftır?",
                "Why is \"to show sales\" a weak answer to \"which question does this chart answer?\"",
              ],
              options: [
                ["Çok genel, somut bir soru değil", "It is too general, not a specific question"],
                ["Satış verisi grafikle gösterilemez", "Sales data cannot be charted at all"],
                ["Yanlış grafik türünü işaret eder", "It points to the wrong chart type"],
                ["Cevap çok uzun", "The answer is too long"],
              ],
              answer: 0,
              explain: [
                "\"Satışları göstermek\" bir soru değil bir konudur. Somut bir soru olmadan hangi grafiğin doğru olduğuna karar veremezsin; onlarca grafik türü \"satışları gösterebilir\" ama hiçbiri belirli bir soruyu yanıtlamaz.",
                "\"To show sales\" is a topic, not a question. Without a specific question you cannot decide which chart is right — dozens of chart types could \"show sales\" but none of them answers a particular question.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Aşağıdakilerden hangisi iyi bir grafik sorusu örneğidir?",
                "Which of the following is an example of a good charting question?",
              ],
              options: [
                ["Hangi bölge hedefin altında kaldı?", "Which region fell short of target?"],
                ["Satışları göster", "Show sales"],
                ["Veriyi analiz et", "Analyse the data"],
                ["Rapor hazırla", "Prepare a report"],
              ],
              answer: 0,
              explain: [
                "Bu soru somuttur ve yanıtlanabilir bir karşılaştırma içerir: bölgeler arasında kim hedefin altında. Diğer seçenekler birer görev tanımıdır, soru değildir.",
                "This question is specific and contains an answerable comparison: which regions are below target. The other options describe a task, not a question.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Soru netleştiğinde genellikle ne olur?",
                "What usually happens once the question is sharp?",
              ],
              options: [
                ["Grafik türü çoğunlukla kendiliğinden belli olur", "The chart type usually becomes obvious on its own"],
                ["Renk paleti otomatik seçilir", "The colour palette is chosen automatically"],
                ["Veri temizliğine gerek kalmaz", "Data cleaning becomes unnecessary"],
                ["Analiz süresi otomatik kısalır", "The analysis time automatically shortens"],
              ],
              answer: 0,
              explain: [
                "Sorunun türü (karşılaştırma, dağılım, ilişki, kompozisyon) grafik ailesini büyük ölçüde belirler. Bu yüzden net bir soru, grafik seçimini neredeyse otomatik hale getirir.",
                "The kind of question (comparison, distribution, relationship, composition) largely determines the chart family. That is why a sharp question makes chart selection almost automatic.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Soru belirsizse ne olur?",
                "What happens when the question is vague?",
              ],
              options: [
                ["Hiçbir grafik türü durumu kurtaramaz", "No chart type can save the situation"],
                ["Pasta grafiği en iyi seçenektir", "A pie chart is the best option"],
                ["Daha fazla renk kullanmak yeterlidir", "Using more colours is enough"],
                ["3B grafik yardımcı olur", "A 3D chart helps"],
              ],
              answer: 0,
              explain: [
                "Grafik türü seçimi soruyu netleştirmenin yerini tutamaz. Belirsiz bir soruyla üretilen her grafik, okuyucunun kendi yorumunu üretmesine yol açar.",
                "Picking a chart type cannot substitute for sharpening the question. Any chart built on a vague question leaves the reader to invent their own conclusion.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Anscombe dörtlüsünün asıl dersi nedir?",
                "What is the real lesson of Anscombe's quartet?",
              ],
              options: [
                [
                  "Özet istatistikler aynı olsa bile veriler tamamen farklı olabilir; mutlaka çizmek gerekir",
                  "Datasets can be completely different even with identical summary statistics; you must plot them",
                ],
                ["Korelasyon her zaman yanıltıcıdır", "Correlation is always misleading"],
                ["Ortalama hesaplanmamalıdır", "The mean should never be computed"],
                ["Dört veri seti yeterlidir", "Four datasets are enough"],
              ],
              answer: 0,
              explain: [
                "Ortalama, sapma ve korelasyon veriyi **özetler** — ve her özet bilgi kaybeder. Kaybedilen bilgi bazen en önemli olandır: bir aykırı değer, bir eğri, iki ayrı grup. Grafik bu kaybı geri verir.",
                "Mean, deviation and correlation **summarise** data — and every summary loses information. Sometimes the lost part is the most important: an outlier, a curve, two separate groups. A chart gives it back.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "grafik-secim-rehberi",
          title: L("Hangi soru, hangi grafik?", "Which question, which chart?"),
          summary: L(
            "Karşılaştırma, dağılım, ilişki, kompozisyon: dört soru türü, dört grafik ailesi.",
            "Comparison, distribution, relationship, composition: four kinds of question, four chart families.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Neredeyse her veri sorusu dört aileden birine girer ve her ailenin kendi grafikleri vardır:\n\n**1. Karşılaştırma** — \"Hangisi daha büyük?\"\n→ Sütun grafiği (kategori sayısı azsa), çubuk grafiği (isimler uzunsa), çizgi grafiği (zaman içindeyse)\n\n**2. Dağılım** — \"Değerler nasıl yayılmış?\"\n→ Histogram, kutu grafiği (box plot), keman grafiği, nokta dağılımı\n\n**3. İlişki** — \"İki değişken birlikte mi hareket ediyor?\"\n→ Saçılım grafiği (scatter), ısı haritası (çok değişkense), kabarcık grafiği (üçüncü boyut varsa)\n\n**4. Kompozisyon** — \"Bütünün parçaları neler?\"\n→ Yığılmış sütun, alan grafiği (zaman içinde), ağaç haritası (treemap). **Pasta grafiği yalnızca 2-3 dilimde.**",
              "Almost every data question falls into one of four families, and each family has its charts:\n\n**1. Comparison** — \"which is bigger?\"\n→ Column chart (few categories), bar chart (long names), line chart (over time)\n\n**2. Distribution** — \"how are the values spread?\"\n→ Histogram, box plot, violin plot, dot plot\n\n**3. Relationship** — \"do two variables move together?\"\n→ Scatter plot, heatmap (many variables), bubble chart (a third dimension)\n\n**4. Composition** — \"what are the parts of the whole?\"\n→ Stacked bar, area chart (over time), treemap. **Pie charts only with two or three slices.**",
            ),
            quiz({
              id: "q2",
              q: [
                "\"Hangi ürün daha çok sattı?\" sorusu hangi grafik ailesine girer?",
                "Which chart family does \"which product sold more?\" belong to?",
              ],
              options: [
                ["Karşılaştırma", "Comparison"],
                ["Dağılım", "Distribution"],
                ["İlişki", "Relationship"],
                ["Kompozisyon", "Composition"],
              ],
              answer: 0,
              explain: [
                "Soru iki ya da daha fazla kategoriyi kıyaslıyor — bu tam olarak karşılaştırma ailesinin tanımıdır. Kategori sayısına göre sütun ya da çubuk grafiği seçilir.",
                "The question weighs two or more categories against each other — exactly the definition of the comparison family. Depending on the category count, a column or bar chart fits.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "İsimleri uzun kategorileri karşılaştırırken hangi grafik tercih edilir?",
                "Which chart is preferred when comparing categories with long names?",
              ],
              options: [
                ["Çubuk grafiği (yatay)", "A (horizontal) bar chart"],
                ["Sütun grafiği (dikey)", "A (vertical) column chart"],
                ["Isı haritası", "A heatmap"],
                ["Kabarcık grafiği", "A bubble chart"],
              ],
              answer: 0,
              explain: [
                "Yatay çubuk grafiğinde kategori adları satır boyunca soldan okunur ve döndürülmesine gerek kalmaz; dikey sütunda uzun isimler ya kesilir ya da döndürülüp okunması zorlaşır.",
                "In a horizontal bar chart the category names run left to right along the row and never need rotating; in a vertical column chart long names get truncated or rotated and become hard to read.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "İki değişkenin birlikte hareket edip etmediğini görmek için hangi grafik kullanılır?",
                "Which chart is used to see whether two variables move together?",
              ],
              options: [
                ["Saçılım grafiği (scatter)", "A scatter plot"],
                ["Histogram", "A histogram"],
                ["Ağaç haritası (treemap)", "A treemap"],
                ["Yığılmış sütun", "A stacked column"],
              ],
              answer: 0,
              explain: [
                "Saçılım grafiği her gözlemi iki eksende bir nokta olarak çizer, böylece iki değişken arasındaki ilişkinin yönü ve gücü doğrudan görülür.",
                "A scatter plot draws each observation as a point on two axes, so the direction and strength of the relationship between two variables is directly visible.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Bütünün parçalarını zaman içinde göstermek için uygun grafik hangisidir?",
                "Which chart suits showing the parts of a whole over time?",
              ],
              options: [
                ["Alan grafiği", "An area chart"],
                ["Kutu grafiği", "A box plot"],
                ["Saçılım grafiği", "A scatter plot"],
                ["Isı haritası", "A heatmap"],
              ],
              answer: 0,
              explain: [
                "Alan grafiği, yığılmış sütunun zaman ekseninde sürekli hale gelmiş versiyonudur; hem toplamın hem parçaların zaman içindeki seyrini gösterir.",
                "An area chart is a stacked column made continuous along a time axis; it shows how both the total and its parts evolve over time.",
              ],
            }),
            pitfall(
              "Pasta grafiğinin sorunu",
              "The trouble with pie charts",
              "İnsan gözü **uzunlukları** çok iyi, **açıları** kötü karşılaştırır. Bir pasta grafiğinde %23 ile %26 dilimini ayırt etmek neredeyse imkânsızdır; aynı iki değer sütun grafiğinde bir bakışta ayrılır.\n\nBuna bir de çoğu pasta grafiğinin 6-8 dilim içermesi eklenince grafik tamamen okunmaz olur. Kural: **iki veya üç dilimden fazlaysa sütun grafiği kullan.** Sıralı bir çubuk grafiği hem payları hem sıralamayı aynı anda gösterir.\n\n3B pasta grafiği ise perspektif yüzünden dilim boyutlarını fiilen çarpıtır — hiçbir durumda kullanılmamalıdır.",
              "The human eye compares **lengths** very well and **angles** badly. Telling a 23% slice from a 26% slice in a pie chart is nearly impossible; the same two values separate at a glance in a column chart.\n\nAdd the fact that most pie charts carry six to eight slices and the chart becomes unreadable. The rule: **more than two or three slices means use a bar chart.** A sorted bar chart shows both the shares and the ranking at once.\n\nA 3D pie chart actively distorts slice sizes through perspective — it should never be used.",
            ),
            quiz({
              id: "q6",
              q: [
                "Pasta grafiğinde neden %23 ile %26 dilimini ayırt etmek zordur?",
                "Why is it hard to tell a 23% pie slice from a 26% one?",
              ],
              options: [
                ["Göz açıları uzunluklar kadar iyi karşılaştıramaz", "The eye cannot compare angles as well as lengths"],
                ["Renkler her zaman birbirine karışır", "The colours always blend into each other"],
                ["Pasta grafiği veri kaybeder", "Pie charts lose data"],
                ["Yazılımlar açıyı yanlış hesaplar", "Software calculates the angle incorrectly"],
              ],
              answer: 0,
              explain: [
                "İnsan gözü uzunlukları çok iyi, açıları kötü karşılaştırır. İki yakın dilimin açı farkı görsel olarak neredeyse fark edilmezken, aynı iki değer bir sütun grafiğinde bir bakışta ayrılır.",
                "The human eye compares lengths very well and angles badly. The angle difference between two close slices is visually almost imperceptible, while the same two values separate at a glance in a column chart.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Kaç dilimden fazlası için pasta grafiği yerine sütun grafiği önerilir?",
                "Beyond how many slices should a bar chart replace a pie chart?",
              ],
              options: [
                ["İki veya üç", "Two or three"],
                ["Beş veya altı", "Five or six"],
                ["On", "Ten"],
                ["Sınır yok", "There is no limit"],
              ],
              answer: 0,
              explain: [
                "İki veya üç dilimden fazlası, açı farklarının ayırt edilmesini pratik olarak imkânsız kılar. Kural bu yüzden nettir: fazlası varsa sütun grafiğine geç.",
                "Beyond two or three slices, telling the angle differences apart becomes practically impossible. The rule is therefore clear: switch to a bar chart once you exceed that.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Sıralı (sorted) bir çubuk grafiğinin pasta grafiğine göre avantajı nedir?",
                "What is the advantage of a sorted bar chart over a pie chart?",
              ],
              options: [
                ["Hem payları hem sıralamayı aynı anda gösterir", "It shows both the shares and the ranking at once"],
                ["Daha renkli görünür", "It looks more colourful"],
                ["Daha az yer kaplar", "It takes up less space"],
                ["Yüzdeyi hiç göstermez", "It never shows a percentage"],
              ],
              answer: 0,
              explain: [
                "Sıralı çubuk grafiğinde en büyük değer en üstte veya en solda yer alır; okuyucu hem büyüklük sırasını hem de göreli payları konum ve uzunluktan okur — pasta grafiğinin açı okuması bunu sağlayamaz.",
                "In a sorted bar chart the largest value sits at the top or left; the reader reads both the ranking and the relative shares from position and length — something a pie chart's angle-reading cannot deliver.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "3B pasta grafiği neden hiçbir zaman kullanılmamalı?",
                "Why should a 3D pie chart never be used?",
              ],
              options: [
                ["Perspektif dilim boyutlarını çarpıtır", "Perspective distorts the slice sizes"],
                ["Yazdırılamaz", "It cannot be printed"],
                ["Renk körü dostu değildir", "It is not colour-blind-safe"],
                ["Çizilmesi çok yavaştır", "It is very slow to draw"],
              ],
              answer: 0,
              explain: [
                "3B efekt, öndeki dilimleri arkadakilerden daha büyük gösterir; bu, zaten zayıf olan açı okumasını bir de perspektif hatasıyla katmerler.",
                "The 3D effect makes front slices appear larger than back ones; it layers a perspective error on top of an already weak angle-reading task.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Çok değişkenli bir ilişkiyi göstermek için hangi grafik uygundur?",
                "Which chart suits showing a relationship across many variables?",
              ],
              options: [
                ["Isı haritası", "A heatmap"],
                ["Çizgi grafiği", "A line chart"],
                ["Pasta grafiği", "A pie chart"],
                ["Kutu grafiği", "A box plot"],
              ],
              answer: 0,
              explain: [
                "İlişki ailesinde saçılım grafiği iki değişkenle sınırlıdır; değişken sayısı arttığında ısı haritası her çift arasındaki ilişkiyi renk yoğunluğuyla tek tabloda özetler.",
                "Within the relationship family, a scatter plot is limited to two variables; once the variable count grows, a heatmap summarises the relationship between every pair in a single table using colour intensity.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "\"Müşterilerin sipariş tutarları nasıl dağılmış?\" sorusu için hangi grafik uygundur?",
                "Which chart suits the question \"how are customer order values distributed?\"",
              ],
              options: [
                ["Histogram veya kutu grafiği", "A histogram or box plot"],
                ["Pasta grafiği", "A pie chart"],
                ["Çizgi grafiği", "A line chart"],
                ["Harita", "A map"],
              ],
              answer: 0,
              explain: [
                "Soru dağılım sorusudur: değerlerin nerede yoğunlaştığını, çarpık olup olmadığını ve aykırı değer bulunup bulunmadığını görmek istiyorsun. Histogram şekli gösterir; kutu grafiği ise medyanı, çeyrekleri ve aykırıları özetler ve grupları karşılaştırmak için idealdir.",
                "This is a distribution question: you want to see where values cluster, whether they are skewed, and whether outliers exist. A histogram shows the shape; a box plot summarises median, quartiles and outliers and is ideal for comparing groups.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "algi-ve-kodlama",
          title: L("Görsel algı: göz neyi iyi okur?", "Visual perception: what does the eye read well?"),
          summary: L(
            "Konum, uzunluk, açı, alan, renk… Hepsi eşit doğrulukta okunmaz.",
            "Position, length, angle, area, colour… they are not read with equal accuracy.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Cleveland ve McGill'in araştırması, insanların sayısal bilgiyi görsel özelliklerden ne kadar doğru okuduğunu sıraladı. **En doğrudan en yanıltıcıya:**\n\n1. **Ortak eksende konum** — çubuk grafiği, saçılım. En doğru okuma.\n2. **Aynı ölçekte ama farklı eksende konum** — küçük çoklu grafikler\n3. **Uzunluk** — yığılmış çubukların parçaları\n4. **Eğim / açı** — çizgi grafiğinin eğimi, pasta dilimi\n5. **Alan** — kabarcık grafiği. İki katı alan, iki kat gibi **algılanmaz**.\n6. **Hacim / eğrilik** — 3B grafikler\n7. **Renk yoğunluğu / doygunluk** — ısı haritası. En kabası.\n\nPratik sonuç: bir sayıyı **doğru** okutman gerekiyorsa konum veya uzunluk kullan. Renk ve alan yalnızca kaba desen göstermek için uygundur.",
              "Research by Cleveland and McGill ranked how accurately people read numeric information from visual properties. **From most accurate to most misleading:**\n\n1. **Position on a common scale** — bar charts, scatter plots. The most accurate.\n2. **Position on identical but non-aligned scales** — small multiples\n3. **Length** — segments of a stacked bar\n4. **Slope / angle** — a line's gradient, a pie slice\n5. **Area** — bubble charts. Twice the area is **not perceived** as twice the value.\n6. **Volume / curvature** — 3D charts\n7. **Colour intensity / saturation** — heatmaps. The crudest.\n\nThe practical consequence: when a number must be read **accurately**, use position or length. Colour and area are only suitable for showing a rough pattern.",
            ),
            quiz({
              id: "q2",
              q: [
                "Cleveland-McGill sıralamasına göre en doğru okunan görsel özellik hangisidir?",
                "In the Cleveland-McGill ranking, which visual property is read most accurately?",
              ],
              options: [
                ["Ortak eksende konum", "Position on a common scale"],
                ["Renk yoğunluğu", "Colour intensity"],
                ["Alan", "Area"],
                ["Hacim", "Volume"],
              ],
              answer: 0,
              explain: [
                "Sıralamanın en üstünde ortak eksende konum yer alır; çubuk grafiği ve saçılım grafiği bu özelliği kullandığı için en doğru okunan grafik türleridir.",
                "Position on a common scale sits at the top of the ranking; bar charts and scatter plots read most accurately precisely because they rely on this property.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Isı haritası (heatmap) hangi görsel özelliği kullanır ve sıralamada nerede yer alır?",
                "Which visual property does a heatmap use, and where does it rank?",
              ],
              options: [
                ["Renk yoğunluğu/doygunluk — en kaba", "Colour intensity/saturation — the crudest"],
                ["Konum — en doğru", "Position — the most accurate"],
                ["Uzunluk — ikinci sırada", "Length — second"],
                ["Açı — üçüncü sırada", "Angle — third"],
              ],
              answer: 0,
              explain: [
                "Isı haritası sayıyı renk yoğunluğuna eşler; bu, sıralamanın en kaba (en yanıltıcı) ucundadır. Bu yüzden ısı haritaları kesin sayı okumak için değil, kaba desen görmek için kullanılır.",
                "A heatmap maps a number to colour intensity, which sits at the crudest, most misleading end of the ranking. That is why heatmaps are for spotting rough patterns, not reading exact numbers.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Yığılmış çubuk grafiğindeki parçalar hangi görsel özellikle okunur?",
                "Which visual property is used to read the segments of a stacked bar?",
              ],
              options: [
                ["Uzunluk", "Length"],
                ["Hacim", "Volume"],
                ["Renk yoğunluğu", "Colour intensity"],
                ["Eğrilik", "Curvature"],
              ],
              answer: 0,
              explain: [
                "Bir yığılmış çubuktaki her parça, kendi uzunluğuyla değeri kodlar. Uzunluk sıralamada konumdan sonra ikinci en doğru okunan özelliktir.",
                "Each segment in a stacked bar encodes its value through its own length. Length ranks just below position as the second most accurately read property.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Bir sayıyı doğru okutmak gerektiğinde hangi kodlamalar tercih edilmeli?",
                "When a number must be read accurately, which encodings should be preferred?",
              ],
              options: [
                ["Konum veya uzunluk", "Position or length"],
                ["Renk ve alan", "Colour and area"],
                ["Hacim ve eğrilik", "Volume and curvature"],
                ["Desen ve doku", "Pattern and texture"],
              ],
              answer: 0,
              explain: [
                "Konum ve uzunluk sıralamanın en doğru okunan iki özelliğidir. Renk ve alan yalnızca kaba bir desen göstermek için uygundur, kesin sayı karşılaştırması için değil.",
                "Position and length are the two most accurately read properties in the ranking. Colour and area are only suitable for showing a rough pattern, not for precise numeric comparison.",
              ],
            }),
            tip(
              "Ön-dikkatsel özellikler",
              "Pre-attentive attributes",
              "Bazı görsel farkları beyin **bilinçli bakmadan**, saniyenin onda birinde algılar: renk, boyut, yönelim, kalınlık, kapalılık, konum. Bunlara **ön-dikkatsel (pre-attentive) özellikler** denir.\n\nBu, tasarımda çok güçlü bir araçtır: 40 çubuğun içinde tek bir çubuğu farklı renge boyarsan, okuyucu grafiğe bakar bakmaz onu görür — okumasına gerek kalmaz.\n\nAma yalnızca **az kullanıldığında** çalışır. Her şey renkliyse, hiçbir şey öne çıkmaz. Kural: bir grafikte en fazla **bir** ön-dikkatsel vurgu kullan ve onu izleyicinin görmesini istediğin şeye ayır.",
              "Some visual differences are registered by the brain **without conscious attention**, in about a tenth of a second: colour, size, orientation, thickness, enclosure, position. These are called **pre-attentive attributes**.\n\nThis is a powerful design tool: colour one bar among forty differently and the reader sees it the moment they look — no reading required.\n\nBut it works only when used **sparingly**. If everything is coloured, nothing stands out. The rule: use at most **one** pre-attentive emphasis per chart, and spend it on the thing you want the viewer to see.",
            ),
            quiz({
              id: "q6",
              q: [
                "Ön-dikkatsel (pre-attentive) özellikler ne kadar sürede algılanır?",
                "How quickly are pre-attentive attributes perceived?",
              ],
              options: [
                ["Saniyenin onda birinde, bilinçli bakmadan", "In about a tenth of a second, without conscious attention"],
                ["Birkaç saniyede, dikkatlice bakınca", "In a few seconds, after looking carefully"],
                ["Yalnızca eğitimli gözle", "Only with a trained eye"],
                ["Hiçbir zaman otomatik algılanmaz", "They are never perceived automatically"],
              ],
              answer: 0,
              explain: [
                "Renk, boyut, yönelim gibi farklar beynin bilinçli dikkatinden önce, yaklaşık saniyenin onda birinde işlenir. Bu yüzden bunlara ön-dikkatsel denir.",
                "Differences like colour, size and orientation are processed before conscious attention kicks in, in roughly a tenth of a second — which is why they are called pre-attentive.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "40 çubuktan birini farklı renge boyamak neden işe yarar?",
                "Why does colouring one bar differently among forty work so well?",
              ],
              options: [
                ["Renk bir ön-dikkatsel özelliktir, göz onu okumadan fark eder", "Colour is a pre-attentive attribute; the eye notices it without reading"],
                ["Renk her zaman en doğru kodlamadır", "Colour is always the most accurate encoding"],
                ["Çubuk sayısı otomatik azalır", "The number of bars automatically decreases"],
                ["Izgara çizgileri kaybolur", "The gridlines disappear"],
              ],
              answer: 0,
              explain: [
                "Renk farkı ön-dikkatsel olduğu için okuyucu grafiğe bakar bakmaz farklı çubuğu görür — her çubuğu tek tek okumasına gerek kalmaz. Bu, doğruluktan değil, hızdan gelen bir avantajdır.",
                "Because the colour difference is pre-attentive, the reader spots the different bar the moment they look — no need to read every bar individually. The advantage comes from speed, not accuracy.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bir grafikte kaç ön-dikkatsel vurgu kullanmak idealdir?",
                "How many pre-attentive emphases is it ideal to use in one chart?",
              ],
              options: [
                ["En fazla bir", "At most one"],
                ["Mümkün olduğunca çok", "As many as possible"],
                ["Beş", "Five"],
                ["Hiç", "None"],
              ],
              answer: 0,
              explain: [
                "Ön-dikkatsel vurgu ancak seyrek kullanıldığında öne çıkar. Kural bu yüzden nettir: bir grafikte en fazla bir vurgu kullan ve onu izleyicinin görmesini istediğin şeye ayır.",
                "A pre-attentive emphasis only stands out when used sparingly. The rule is therefore clear: use at most one emphasis per chart, and spend it on what you want the viewer to notice.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Her şey renkliyse ön-dikkatsel vurgu neden işe yaramaz?",
                "Why does a pre-attentive emphasis stop working when everything is coloured?",
              ],
              options: [
                ["Hiçbir şey öne çıkmaz, karşıtlık kaybolur", "Nothing stands out any more, the contrast is lost"],
                ["Renk körü kullanıcılar için sorun olur", "It becomes a problem for colour-blind users"],
                ["Yazıcı maliyeti artar", "Printing costs go up"],
                ["Dosya boyutu büyür", "The file size grows"],
              ],
              answer: 0,
              explain: [
                "Ön-dikkatsel algı bir farkı diğerlerinden ayırt etmeye dayanır. Her şey renkliyse artık bir karşıtlık yoktur ve göz nereye bakacağını bilemez.",
                "Pre-attentive perception depends on one thing standing out from the rest. If everything is coloured there is no longer any contrast, and the eye has nowhere obvious to land.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Küçük çoklu grafiklerde (small multiples) kullanılan kodlama nedir?",
                "Which encoding do small multiples rely on?",
              ],
              options: [
                ["Aynı ölçekte ama farklı eksende konum", "Position on identical but non-aligned scales"],
                ["Alan", "Area"],
                ["Hacim", "Volume"],
                ["Renk doygunluğu", "Colour saturation"],
              ],
              answer: 0,
              explain: [
                "Küçük çoklu grafikler, aynı ölçeği paylaşan ama farklı panellerde çizilen konumları kullanır — sıralamada ortak eksende konumdan hemen sonra gelen, hâlâ oldukça doğru bir kodlamadır.",
                "Small multiples use position on scales that are identical but plotted on separate panels — the encoding right after position on a common scale in the ranking, and still fairly accurate.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Kabarcık grafiğinde bir kabarcığın alanı diğerinin iki katı. İzleyici bunu nasıl algılar?",
                "In a bubble chart one bubble has twice the area of another. How does a viewer perceive it?",
              ],
              options: [
                [
                  "İki kattan **az** — alan algısı gerçek oranı sistematik olarak küçük gösterir",
                  "As **less** than double — area perception systematically understates the true ratio",
                ],
                ["Tam iki kat", "Exactly double"],
                ["İki kattan fazla", "As more than double"],
                ["Kişiye göre değişir", "It varies by person"],
              ],
              answer: 0,
              explain: [
                "İnsanlar alan farklarını sistematik olarak olduğundan küçük algılar; bu yüzden kabarcık grafikleri farkları bastırır. Ayrıca birçok araç kabarcığı **çapa** göre ölçeklendirir ve o zaman alan dört katına çıkar — grafik bu kez farkı abartır. Kesin karşılaştırma gerekiyorsa kabarcık yerine çubuk kullan.",
                "People systematically underestimate differences in area, so bubble charts suppress differences. Worse, many tools scale bubbles by **diameter**, which quadruples the area — and then the chart exaggerates instead. When an accurate comparison matters, use bars rather than bubbles.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "junior",
      title: L("Grafik dilbilgisi", "The grammar of graphics"),
      description: L(
        "Veriyi görsel özelliklere eşlemek ve doğru grafiği seçmek.",
        "Mapping data to visual properties and choosing the right chart.",
      ),
      lessons: [
        lesson({
          slug: "gorsel-kodlama",
          title: L("Görsel kodlama ve algı", "Visual encoding and perception"),
          summary: L(
            "İnsan gözü bazı görsel özellikleri diğerlerinden çok daha iyi karşılaştırır.",
            "The human eye compares some visual properties far better than others.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Cleveland ve McGill'in çalışmasına göre görsel kodlamaların **doğruluk sırası** şudur:\n\n1. Ortak eksende **konum** (en doğru)\n2. Ortak olmayan eksende konum\n3. **Uzunluk**\n4. Eğim / açı\n5. **Alan**\n6. Hacim, eğrilik\n7. **Renk yoğunluğu / doygunluk** (en az doğru)\n\nBu liste, çubuk grafiğin (konum + uzunluk) neden pastadan (açı + alan) daha iyi okunduğunu ve baloncuk grafiğinin neden yanıltıcı olabileceğini açıklar.",
              "Cleveland and McGill ranked visual encodings by **accuracy**:\n\n1. **Position** on a common scale (most accurate)\n2. Position on non-aligned scales\n3. **Length**\n4. Slope / angle\n5. **Area**\n6. Volume, curvature\n7. **Colour intensity / saturation** (least accurate)\n\nThat ranking explains why a bar chart (position + length) reads better than a pie (angle + area), and why bubble charts can mislead.",
            ),
            quiz({
              id: "q2",
              q: [
                "Görsel kodlama doğruluk sıralamasında ikinci sırada ne var?",
                "What comes second in the visual-encoding accuracy ranking?",
              ],
              options: [
                ["Ortak olmayan eksende konum", "Position on non-aligned scales"],
                ["Uzunluk", "Length"],
                ["Alan", "Area"],
                ["Renk doygunluğu", "Colour saturation"],
              ],
              answer: 0,
              explain: [
                "En doğru okunan ortak eksende konumdur; hemen ardından, ortak olmayan ama aynı ölçekli eksenlerde konum gelir — küçük çoklu grafiklerin dayandığı kodlama budur.",
                "Position on a common scale is the most accurate; right after it comes position on scales that share the same units but are not aligned — the encoding small multiples rely on.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir çubuk grafiğin pastadan daha iyi okunmasının nedeni nedir?",
                "Why does a bar chart read better than a pie chart?",
              ],
              options: [
                ["Konum ve uzunluk kullanır, pasta ise açı ve alan kullanır", "It uses position and length, while a pie uses angle and area"],
                ["Daha renkli olması", "It is more colourful"],
                ["Daha az veri göstermesi", "It shows less data"],
                ["Yazılımların çubuğu tercih etmesi", "Software tools default to bars"],
              ],
              answer: 0,
              explain: [
                "Çubuk grafiği sıralamanın en üstündeki iki kodlamayı (konum + uzunluk) kullanır; pasta grafiği ise en altlara yakın ikisini (açı + alan) kullanır. Sıralamadaki mesafe, okunabilirlik farkını açıklar.",
                "A bar chart uses the two top-ranked encodings (position + length); a pie chart uses two near the bottom (angle + area). That gap in the ranking explains the difference in readability.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Baloncuk grafikleri neden yanıltıcı olabilir?",
                "Why can bubble charts be misleading?",
              ],
              options: [
                ["Alan, sıralamanın altlarında yer alan az doğru bir kodlamadır", "Area is a low-accuracy encoding near the bottom of the ranking"],
                ["Baloncuklar her zaman aynı renktedir", "Bubbles are always the same colour"],
                ["Eksen her zaman yanlıştır", "The axis is always wrong"],
                ["Veri kümesi küçük olmak zorundadır", "The dataset has to be small"],
              ],
              answer: 0,
              explain: [
                "Baloncuk grafiği değeri alana kodlar; alan, sıralamada konum ve uzunluğun çok gerisinde, az doğru okunan bir özelliktir. Bu yüzden farklar sistematik olarak yanlış algılanır.",
                "A bubble chart encodes value as area; area sits far below position and length in the ranking, a low-accuracy property. As a result, differences are systematically misjudged.",
              ],
            }),
            pitfall(
              "Alan iki kez sayılır",
              "Area counts twice",
              "Bir daireyi \"iki katı\" göstermek için yarıçapı iki katına çıkarırsan alan **dört katına** çıkar ve okuyucu farkı abartılı algılar. Baloncuk grafiklerinde daima **alanı** değerle orantıla, yarıçapı değil. Çoğu kütüphane bunu doğru yapar, ama elle ölçek verdiğinde tuzak burada.",
              "Doubling a circle's radius to show \"twice as much\" quadruples the **area**, and readers see an exaggerated difference. In bubble charts always scale the **area** to the value, never the radius. Most libraries get this right; the trap appears when you set the scale by hand.",
            ),
            quiz({
              id: "q5",
              q: [
                "Bir dairenin yarıçapını iki katına çıkarırsan alan kaç katına çıkar?",
                "If you double a circle's radius, how many times larger does the area become?",
              ],
              options: [
                ["Dört", "Four"],
                ["İki", "Two"],
                ["Üç", "Three"],
                ["Değişmez", "It stays the same"],
              ],
              answer: 0,
              explain: [
                "Alan yarıçapın karesiyle orantılıdır (πr²); yarıçap iki katına çıkarsa alan dört katına çıkar. Bu yüzden yarıçapı değere orantılamak farkı fazlasıyla abartır.",
                "Area scales with the square of the radius (πr²), so doubling the radius quadruples the area. That is why scaling radius directly to the value badly exaggerates the difference.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Baloncuk grafiğinde değeri neye orantılamak doğrudur?",
                "In a bubble chart, what should the value be scaled to correctly?",
              ],
              options: [
                ["Alana", "The area"],
                ["Yarıçapa", "The radius"],
                ["Çevreye", "The circumference"],
                ["Renk tonuna", "The colour hue"],
              ],
              answer: 0,
              explain: [
                "Göz kabarcığın büyüklüğünü alandan okur. Değeri alanla orantılamak, algılanan büyüklüğü gerçek orana en yakın tutan yöntemdir.",
                "The eye reads a bubble's size from its area. Scaling the value to area keeps the perceived size closest to the true ratio.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Yarıçapı doğrudan değere orantılamanın sonucu ne olur?",
                "What happens if you scale the radius directly to the value instead?",
              ],
              options: [
                ["Fark okuyucuya abartılı görünür", "The difference looks exaggerated to the reader"],
                ["Fark tam doğru görünür", "The difference looks exactly right"],
                ["Grafik daha hızlı çizilir", "The chart renders faster"],
                ["Renk körlüğü sorunu çözülür", "It solves the colour-blindness problem"],
              ],
              answer: 0,
              explain: [
                "Yarıçap değerle orantılanınca alan karesel olarak büyür; iki katı bir değer görsel olarak dört katıymış gibi algılanır.",
                "When radius is scaled directly to the value, area grows quadratically; a value that is twice as large ends up looking about four times as large.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Çoğu görselleştirme kütüphanesi baloncuk ölçeklemesini nasıl yapar?",
                "How do most visualisation libraries handle bubble scaling by default?",
              ],
              options: [
                ["Genelde alanı doğru orantılar, ama elle ölçek verilince hata riski artar", "They usually scale area correctly, but the risk rises when you set the scale by hand"],
                ["Her zaman yarıçapı kullanarak yanlış çizer", "They always draw it wrong using radius"],
                ["Hiçbir zaman doğru yapmaz", "They never get it right"],
                ["Kullanıcıya hiç seçenek sunmaz", "They give the user no options at all"],
              ],
              answer: 0,
              explain: [
                "Çoğu modern kütüphanenin varsayılanı alanı doğru orantılar; tuzak, geliştiricinin ölçeği elle (örneğin yarıçapla) tanımladığı durumlarda ortaya çıkar.",
                "Most modern libraries default to scaling area correctly; the trap appears when a developer defines the scale manually — for example by radius.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Isı haritası neden karşılaştırma için en zayıf seçeneklerden biridir?",
                "Why is a heatmap one of the weakest options for comparison?",
              ],
              options: [
                ["Renk yoğunluğu sıralamanın en az doğru kodlamasıdır", "Colour intensity is the least accurate encoding in the ranking"],
                ["Çok fazla yer kaplar", "It takes up too much space"],
                ["Yalnızca zaman verisiyle çalışır", "It only works with time-series data"],
                ["Sayısal veri kabul etmez", "It does not accept numeric data"],
              ],
              answer: 0,
              explain: [
                "Isı haritası değeri renk yoğunluğuna kodlar; bu, Cleveland-McGill sıralamasında en dipte yer alan, en az doğru okunan kodlamadır.",
                "A heatmap encodes value as colour intensity, which sits at the very bottom of the Cleveland-McGill ranking as the least accurately read encoding.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir baloncuk grafiğinde tam sayısal karşılaştırma gerekiyorsa hangi grafiğe geçmelisin?",
                "If a bubble chart needs to support an exact numeric comparison, which chart should you switch to?",
              ],
              options: [
                ["Çubuk grafiği", "A bar chart"],
                ["Isı haritası", "A heatmap"],
                ["Pasta grafiği", "A pie chart"],
                ["3B kabarcık grafiği", "A 3D bubble chart"],
              ],
              answer: 0,
              explain: [
                "Çubuk grafiği konum ve uzunluk kullanır — sıralamanın en tepesindeki iki kodlama. Kesin karşılaştırma gerektiğinde alan tabanlı bir kodlamadan (kabarcık) konum tabanlı bir kodlamaya (çubuk) geçmek doğru harekettir.",
                "A bar chart uses position and length — the two top-ranked encodings. When an exact comparison matters, moving from an area-based encoding (bubble) to a position-based one (bar) is the right move.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Beş kategorinin değerlerini karşılaştıracaksın. En doğru okunan grafik hangisi?",
                "You need to compare five categories. Which chart reads most accurately?",
              ],
              options: [
                ["Yatay çubuk grafiği", "Horizontal bar chart"],
                ["Pasta grafiği", "Pie chart"],
                ["Baloncuk grafiği", "Bubble chart"],
                ["Isı haritası", "Heatmap"],
              ],
              answer: 0,
              explain: [
                "Çubuk grafik, ortak bir eksende konum ve uzunluk kullanır — algısal doğruluk sıralamasının en üstü. Yatay olması ayrıca uzun kategori adlarının döndürülmeden okunmasını sağlar.",
                "A bar chart uses position on a common scale plus length — the top of the perceptual accuracy ranking. Making it horizontal also lets long category names stay readable without rotation.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "mid",
      title: L("Renk, metin ve düzen", "Colour, text and layout"),
      description: L(
        "Bir grafiği profesyonel yapan ayrıntılar ve erişilebilirlik.",
        "The details that make a chart professional — and accessible.",
      ),
      lessons: [
        lesson({
          slug: "renk-ve-metin",
          title: L("Renk paletleri ve grafik metinleri", "Colour palettes and chart text"),
          summary: L(
            "Renk bilgi taşımalı; başlık ise sonucu söylemeli.",
            "Colour should carry information; the title should state the finding.",
          ),
          minutes: 15,
          blocks: [
            text(
              "**Üç palet türü ve ne zaman kullanılacağı:**\n\n- **Kategorik** — sırasız gruplar (şehirler, ürünler). En fazla 6–8 renk; fazlası ayırt edilemez.\n- **Sıralı (sequential)** — düşükten yükseğe tek yönlü değer (yoğunluk, sıcaklık).\n- **Ayrışan (diverging)** — anlamlı bir orta noktası olan değer (hedeften sapma, kâr/zarar).\n\nRenk körlüğü nüfusun yaklaşık %8'ini etkiler. Kırmızı–yeşil karşıtlığını **tek başına** anlam taşıyıcı olarak kullanma; mavi–turuncu güvenli alternatiftir. Renge ek olarak şekil, desen veya doğrudan etiket kullan.",
              "**Three palette types and when to use them:**\n\n- **Categorical** — unordered groups (cities, products). Six to eight colours at most; beyond that they stop being distinguishable.\n- **Sequential** — a one-directional low-to-high value (density, temperature).\n- **Diverging** — a value with a meaningful midpoint (deviation from target, profit/loss).\n\nColour vision deficiency affects roughly 8% of people. Never let a red–green contrast carry meaning **on its own**; blue–orange is the safe alternative. Back colour up with shape, pattern or direct labels.",
            ),
            quiz({
              id: "q2",
              q: [
                "Sırasız gruplar (şehirler, ürünler) için hangi palet türü uygundur?",
                "Which palette type suits unordered groups (cities, products)?",
              ],
              options: [
                ["Kategorik", "Categorical"],
                ["Sıralı", "Sequential"],
                ["Iraksak", "Diverging"],
                ["Tek renk", "A single colour"],
              ],
              answer: 0,
              explain: [
                "Kategorik palet, aralarında doğal bir sıra olmayan grupları birbirinden ayırt etmek için tasarlanmıştır; her renk kendi başına bir kimlik taşır, bir büyüklük değil.",
                "A categorical palette is designed to distinguish groups that have no natural order between them; each colour carries an identity, not a magnitude.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Kategorik palette kaç renkten fazlası ayırt edilemez hale gelir?",
                "Beyond how many colours does a categorical palette stop being distinguishable?",
              ],
              options: [
                ["6-8 renkten fazlası", "More than 6-8 colours"],
                ["2-3 renkten fazlası", "More than 2-3 colours"],
                ["20 renkten fazlası", "More than 20 colours"],
                ["Sınır yoktur", "There is no limit"],
              ],
              answer: 0,
              explain: [
                "İnsan gözü aynı anda tutabildiği ayırt edici renk sayısında sınırlıdır; 6-8'i aşan kategorik paletlerde renkler birbirine benzemeye başlar ve okuyucu legend'a bakmak zorunda kalır.",
                "The eye has a limited capacity for holding distinct colours at once; past 6-8, colours in a categorical palette start to resemble each other and the reader has to keep checking the legend.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Sıcaklık gibi düşükten yükseğe tek yönlü bir değeri göstermek için hangi palet kullanılır?",
                "Which palette is used to show a one-directional low-to-high value like temperature?",
              ],
              options: [
                ["Sıralı (sequential)", "Sequential"],
                ["Kategorik", "Categorical"],
                ["Iraksak", "Diverging"],
                ["Rastgele", "Random"],
              ],
              answer: 0,
              explain: [
                "Sıralı palet açıktan koyuya (veya tersi) tek bir renk tonu ilerler; bu, tek yönlü artan bir değeri doğal olarak temsil eder.",
                "A sequential palette progresses through one hue from light to dark (or the reverse); that naturally represents a one-directional, increasing value.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Renk körlüğü nüfusun yaklaşık yüzde kaçını etkiler?",
                "Roughly what share of the population is affected by colour vision deficiency?",
              ],
              options: [
                ["%8", "8%"],
                ["%1", "1%"],
                ["%25", "25%"],
                ["%50", "50%"],
              ],
              answer: 0,
              explain: [
                "Rakam küçümsenmeyecek kadar büyük: her 100 kişiden yaklaşık 8'i (çoğunlukla erkek) renk görme eksikliğine sahip. Bu, kırmızı-yeşil kodlamanın neden riskli olduğunu açıklar.",
                "The number is too large to ignore: roughly 8 in 100 people (mostly men) have a colour vision deficiency. That is why red-green encoding is risky.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Kırmızı-yeşil yerine önerilen güvenli renk çifti hangisidir?",
                "Which safe colour pair is recommended instead of red-green?",
              ],
              options: [
                ["Mavi-turuncu", "Blue-orange"],
                ["Mor-sarı", "Purple-yellow"],
                ["Siyah-beyaz", "Black-white"],
                ["Pembe-yeşil", "Pink-green"],
              ],
              answer: 0,
              explain: [
                "Mavi-turuncu kontrastı en yaygın renk körlüğü türlerinde bile ayırt edilebilir kalır; bu yüzden kırmızı-yeşile güvenli bir alternatif olarak önerilir.",
                "Blue-orange contrast stays distinguishable even under the most common forms of colour blindness, which is why it is recommended as a safe alternative to red-green.",
              ],
            }),
            text(
              "**Grafik başlığı bir etiket değil, bir cümle olmalıdır.**\n\n- Zayıf: *\"Aylık Satışlar\"*\n- Güçlü: *\"Satışlar Mart'tan beri %18 arttı, büyümenin tamamı Elektronik'ten geliyor\"*\n\nBaşlık bulguyu söylerse okuyucu grafiği doğrulamak için bakar; söylemezse ne arayacağını bilemez ve kendi sonucunu üretir.",
              "**A chart title should be a sentence, not a label.**\n\n- Weak: *\"Monthly Sales\"*\n- Strong: *\"Sales are up 18% since March, and all of the growth is Electronics\"*\n\nWhen the title states the finding, the reader looks at the chart to verify it. When it does not, they do not know what to look for and invent their own conclusion.",
            ),
            quiz({
              id: "q7",
              q: [
                "\"Aylık Satışlar\" başlığı neden zayıf kabul edilir?",
                "Why is \"Monthly Sales\" considered a weak title?",
              ],
              options: [
                ["Sadece grafiğin ne olduğunu söyler, bulguyu söylemez", "It only states what the chart is, not what it found"],
                ["Çok uzun bir başlıktır", "It is too long a title"],
                ["Renk içermez", "It does not contain colour"],
                ["Sayı içermez", "It does not contain a number"],
              ],
              answer: 0,
              explain: [
                "Okuyucu eksenlere bakınca zaten \"aylık satışlar\" gösterildiğini görür. Başlığın işi bunu tekrar etmek değil, grafiğin ortaya koyduğu sonucu söylemektir.",
                "The reader can already see from the axes that monthly sales are shown. The title's job is not to repeat that but to state the conclusion the chart reveals.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Güçlü bir grafik başlığı ne yapmalıdır?",
                "What should a strong chart title do?",
              ],
              options: [
                ["Bulguyu bir cümleyle söylemeli", "State the finding in a sentence"],
                ["Sadece eksen adlarını tekrarlamalı", "Just repeat the axis labels"],
                ["Mümkün olduğunca kısa, tek kelime olmalı", "Be as short as possible, a single word"],
                ["Her zaman soru cümlesi olmalı", "Always be phrased as a question"],
              ],
              answer: 0,
              explain: [
                "\"Satışlar Mart'tan beri %18 arttı, büyümenin tamamı Elektronik'ten geliyor\" örneğinde olduğu gibi, güçlü başlık grafiğin ortaya koyduğu sonucu doğrudan yazar.",
                "As in the example \"Sales are up 18% since March, and all of the growth is Electronics\", a strong title states the chart's finding directly.",
              ],
            }),
            info(
              "Veri–mürekkep oranı",
              "The data–ink ratio",
              "Edward Tufte'nin ilkesi: her damla mürekkep veriyi göstermeli. Gereksiz ızgara çizgileri, kenarlıklar, gölgeler, 3B efektler ve arka plan dokuları silinmeli. Bir grafikten çıkarabileceğin her öğeyi çıkar — geriye kalan mesajdır. \"3B pasta grafiği\" bu ilkenin tam tersidir ve verinin okunmasını fiilen imkânsız kılar.",
              "Tufte's principle: every drop of ink should show data. Remove needless gridlines, borders, shadows, 3D effects and background textures. Strip out everything a chart can survive without — what remains is the message. A \"3D pie chart\" is the exact opposite and makes the data effectively unreadable.",
            ),
            quiz({
              id: "q9",
              q: [
                "Veri-mürekkep oranı ilkesine göre bir grafikten öncelikle ne çıkarılmalıdır?",
                "According to the data-ink ratio principle, what should be stripped from a chart first?",
              ],
              options: [
                ["Veriyi göstermeyen her öğe: gereksiz ızgara, kenarlık, gölge, 3B efekt", "Everything that shows no data: needless gridlines, borders, shadows, 3D effects"],
                ["Eksen etiketleri", "Axis labels"],
                ["Başlık", "The title"],
                ["Kaynak notu", "The source note"],
              ],
              answer: 0,
              explain: [
                "Tufte'nin ilkesi, verinin kendisini taşımayan her damla mürekkebin gereksiz olduğunu söyler; ızgara, kenarlık, gölge, 3B efekt ve doku bu kategoriye girer ve kaldırılmalıdır.",
                "Tufte's principle holds that any ink not carrying the data itself is unnecessary; gridlines, borders, shadows, 3D effects and textures fall into this category and should be removed.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bu ilkeye göre 3B pasta grafiği neden en kötü örneklerden biridir?",
                "By this principle, why is a 3D pie chart one of the worst offenders?",
              ],
              options: [
                ["Veri göstermeyen efektlerle doludur ve okunmayı fiilen imkânsız kılar", "It is full of effects that carry no data and makes reading it effectively impossible"],
                ["Çok fazla renk kullanır", "It uses too many colours"],
                ["Yazdırılamaz", "It cannot be printed"],
                ["Veri setini küçültür", "It shrinks the dataset"],
              ],
              answer: 0,
              explain: [
                "3B pasta grafiği hem zaten zayıf olan açı/alan kodlamasını hem de gereksiz perspektif efektini bir araya getirir — veri-mürekkep oranını mümkün olan en düşük seviyeye indirir.",
                "A 3D pie chart combines an already weak angle/area encoding with an unnecessary perspective effect — pushing the data-ink ratio to about as low as it gets.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Kârlılık verisini (negatif ve pozitif değerler) haritada göstereceksin. Hangi palet?",
                "You are mapping profitability with both negative and positive values. Which palette?",
              ],
              options: [
                ["Ayrışan (diverging) palet", "A diverging palette"],
                ["Sıralı (sequential) palet", "A sequential palette"],
                ["Kategorik palet", "A categorical palette"],
                ["Tek renk tonları", "Shades of a single colour"],
              ],
              answer: 0,
              explain: [
                "Sıfır anlamlı bir orta noktadır: zarar bir yöne, kâr diğerine gider. Ayrışan palet ortayı nötr bırakıp iki yönü farklı renklerle gösterir; sıralı palet ise negatif ile pozitif arasındaki kritik ayrımı görünmez kılar.",
                "Zero is a meaningful midpoint: losses go one way, profits the other. A diverging palette keeps the middle neutral and colours each direction differently, while a sequential palette hides the crucial negative/positive split.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "senior",
      title: L("Veriyle hikâye anlatımı", "Storytelling with data"),
      description: L(
        "Bulguyu karara dönüştürmek: sunum, anlatı yapısı ve etik.",
        "Turning a finding into a decision: presentation, narrative structure and ethics.",
      ),
      lessons: [
        lesson({
          slug: "hikaye-anlatimi",
          title: L("Veriyle hikâye anlatımı ve etik", "Storytelling with data, and ethics"),
          summary: L(
            "Doğru analiz, yanlış anlatıldığında hiçbir karar değiştirmez.",
            "A correct analysis told badly changes no decisions at all.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Bir bulgu sunumunun iskeleti:\n\n1. **Bağlam** — hangi soru, neden şimdi önemli?\n2. **Çatışma** — beklenen ile gerçekleşen arasındaki fark\n3. **Bulgu** — veri ne söylüyor, tek cümleyle\n4. **Kanıt** — 1–2 grafik, fazlası değil\n5. **Öneri** — ne yapılmalı, kim, ne zaman\n6. **Riskler** — analizin sınırları ve belirsizlikler\n\nEn sık hata, tüm keşif sürecini sırayla anlatmaktır. Dinleyici senin nasıl çalıştığını değil, **ne yapması gerektiğini** öğrenmek ister.",
              "The skeleton of presenting a finding:\n\n1. **Context** — which question, and why now?\n2. **Conflict** — the gap between expected and actual\n3. **Finding** — what the data says, in one sentence\n4. **Evidence** — one or two charts, no more\n5. **Recommendation** — what to do, who, by when\n6. **Risks** — the limits of the analysis and its uncertainties\n\nThe usual mistake is narrating the whole exploration in order. Your audience does not want to learn how you worked; they want to learn **what to do**.",
            ),
            quiz({
              id: "q2",
              q: [
                "Bulgu sunumunun iskeletinde 'Çatışma' adımı neyi ifade eder?",
                "What does the 'Conflict' step in the finding-presentation skeleton refer to?",
              ],
              options: [
                ["Beklenen ile gerçekleşen arasındaki fark", "The gap between expected and actual"],
                ["Analizin teknik detayları", "The technical details of the analysis"],
                ["Kullanılan yazılımlar", "The software tools used"],
                ["Verinin kaynağı", "The source of the data"],
              ],
              answer: 0,
              explain: [
                "Çatışma, dinleyicinin neden dikkat etmesi gerektiğini kurar: beklenenle gerçekleşen arasında bir fark yoksa zaten anlatılacak bir hikâye yoktur.",
                "The conflict step establishes why the audience should care: without a gap between what was expected and what happened, there is no story to tell in the first place.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Sunumda 'Kanıt' adımı için kaç grafik önerilir?",
                "How many charts does the 'Evidence' step recommend?",
              ],
              options: [
                ["1-2 grafik, fazlası değil", "One or two charts, no more"],
                ["5-10 grafik", "Five to ten charts"],
                ["Mümkün olduğunca çok", "As many as possible"],
                ["Hiç grafik gerekmez", "No charts are needed"],
              ],
              answer: 0,
              explain: [
                "Amaç kapsamlılık değil netliktir. Bir veya iki grafik, tek bir bulguyu kanıtlamaya yeter; fazlası dinleyicinin dikkatini dağıtır.",
                "The goal is clarity, not comprehensiveness. One or two charts are enough to support a single finding; more than that dilutes the audience's attention.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "En sık yapılan sunum hatası nedir?",
                "What is the most common presentation mistake?",
              ],
              options: [
                ["Tüm keşif sürecini sırayla anlatmak", "Narrating the whole exploration process in order"],
                ["Çok az veri göstermek", "Showing too little data"],
                ["Renkleri tutarsız kullanmak", "Using colours inconsistently"],
                ["Başlık koymamak", "Not adding a title"],
              ],
              answer: 0,
              explain: [
                "Analistler genelde kendi çalışma sırasını anlatır: önce şunu denedim, sonra bunu. Ama dinleyici sürecin değil sonucun peşindedir.",
                "Analysts tend to narrate their own working order: first I tried this, then that. But the audience is after the outcome, not the process.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Dinleyici bir bulgu sunumundan asıl ne öğrenmek ister?",
                "What does the audience of a finding presentation actually want to learn?",
              ],
              options: [
                ["Ne yapması gerektiğini", "What they should do"],
                ["Analistin nasıl çalıştığını", "How the analyst worked"],
                ["Kullanılan tüm formülleri", "Every formula that was used"],
                ["Veri setinin boyutunu", "The size of the dataset"],
              ],
              answer: 0,
              explain: [
                "Sunumun son adımı olan 'Öneri' bu yüzden vardır: dinleyici karar vermek için oradadır, sürecin kendisiyle ilgilenmez.",
                "This is exactly why the 'Recommendation' step exists: the audience is there to make a decision, not to sit through the process itself.",
              ],
            }),
            text(
              "**Grafikle yanıltmanın yaygın yolları** — bunları kendinde de kontrol et:\n\n- Çubuk grafikte ekseni sıfırdan başlatmamak (farkı abartır)\n- Kiraz toplamak: yalnızca iddiayı destekleyen dönemi göstermek\n- Ölçek değiştirmek: iki eksenli grafikle sahte korelasyon üretmek\n- Küçük örneklemi yüzdeyle sunmak (\"%50 arttı\" = 2 kişiden 3 kişiye)\n- Toplam yerine oran, oran yerine toplam göstererek hikâyeyi seçmek",
              "**Common ways charts mislead** — audit yourself for these too:\n\n- Not starting a bar chart's axis at zero (exaggerates the difference)\n- Cherry-picking: showing only the period that supports the claim\n- Rescaling: manufacturing fake correlation with a dual axis\n- Reporting a tiny sample as a percentage (\"up 50%\" = from 2 people to 3)\n- Choosing totals over rates, or rates over totals, to pick the story you want",
            ),
            quiz({
              id: "q6",
              q: [
                "Sütun grafiğinde ekseni sıfırdan başlatmamak ne yapar?",
                "What does not starting a bar chart's axis at zero do?",
              ],
              options: [
                ["Aradaki farkı abartır", "It exaggerates the difference"],
                ["Farkı gizler", "It hides the difference"],
                ["Hiçbir etkisi olmaz", "It has no effect"],
                ["Rengi değiştirir", "It changes the colour"],
              ],
              answer: 0,
              explain: [
                "Çubuğun uzunluğu değeri kodladığı için, eksenin sıfırdan başlamaması küçük bir farkı görsel olarak devasa gösterir.",
                "Since the bar's length encodes the value, an axis that does not start at zero makes a small difference look visually enormous.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "\"Kiraz toplamak\" (cherry-picking) ne anlama gelir?",
                "What does \"cherry-picking\" mean here?",
              ],
              options: [
                ["Yalnızca iddiayı destekleyen dönemi göstermek", "Showing only the period that supports the claim"],
                ["Tüm veriyi göstermek", "Showing all the data"],
                ["Rastgele örnekleme yapmak", "Sampling at random"],
                ["Ortalamayı hesaplamak", "Computing the mean"],
              ],
              answer: 0,
              explain: [
                "Genel bir düşüş içindeki kısa bir yükseliş dönemini seçip göstermek, izleyicide gerçek eğilimin tam tersi bir izlenim yaratır.",
                "Selecting and showing a brief upturn inside an overall decline creates the exact opposite impression of the real trend in the viewer's mind.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "\"%50 arttı\" derken örneklem 2 kişiden 3 kişiye çıkmışsa sorun nedir?",
                "If \"up 50%\" really means the sample went from 2 people to 3, what is the problem?",
              ],
              options: [
                ["Küçük örneklem yüzdeyle abartılı gösteriliyor", "A tiny sample is being dressed up as a dramatic percentage"],
                ["Yüzde yanlış hesaplanmış", "The percentage was calculated incorrectly"],
                ["Örneklem çok büyük", "The sample is too large"],
                ["Veri eksik", "The data is incomplete"],
              ],
              answer: 0,
              explain: [
                "Matematiksel olarak %50 doğrudur ama örneklem o kadar küçüktür ki tek bir kişinin değişimi orantısız büyük bir yüzdeye dönüşür — sunum bağlamı olmadan yanıltıcıdır.",
                "The 50% figure is mathematically correct, but the sample is so small that a single person's change becomes a disproportionately large percentage — misleading without the context.",
              ],
            }),
            tip(
              "Belirsizliği göstermek zayıflık değildir",
              "Showing uncertainty is not weakness",
              "Tahminlerine güven aralığı, örneklem büyüklüğü ve varsayımlarını eklemek seni daha az değil **daha güvenilir** yapar. \"Ciro %12 arttı\" yerine \"Ciro %12 arttı (±%3, n=1.240, Ocak–Haziran)\" diyen analistin sonraki analizine de güvenilir. Kesin konuşup sonra yanılmak, en pahalı itibar kaybıdır.",
              "Attaching confidence intervals, sample sizes and assumptions makes you **more** credible, not less. An analyst who says \"revenue is up 12% (±3%, n=1,240, Jan–Jun)\" instead of just \"up 12%\" gets trusted on the next analysis too. Speaking with certainty and being wrong is the most expensive reputational hit there is.",
            ),
            quiz({
              id: "q9",
              q: [
                "Güven aralığı ve örneklem büyüklüğü eklemek analistin güvenilirliğini nasıl etkiler?",
                "How does adding a confidence interval and sample size affect an analyst's credibility?",
              ],
              options: [
                ["Artırır", "It increases it"],
                ["Azaltır", "It decreases it"],
                ["Hiç etkilemez", "It has no effect"],
                ["Sadece akademik ortamda önemlidir", "It only matters in academic settings"],
              ],
              answer: 0,
              explain: [
                "\"Ciro %12 arttı (±%3, n=1.240, Ocak–Haziran)\" demek, tahminin sınırlarını açıkça göstererek analisti daha az değil daha güvenilir kılar.",
                "Saying \"revenue is up 12% (±3%, n=1,240, Jan–Jun)\" openly shows the limits of the estimate, which makes the analyst more credible, not less.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Kesin konuşup sonra yanılmanın sonucu nedir?",
                "What is the consequence of speaking with certainty and then being wrong?",
              ],
              options: [
                ["En pahalı itibar kaybı", "The most expensive reputational hit there is"],
                ["Küçük bir hata olarak unutulur", "It is forgotten as a minor mistake"],
                ["Sadece o analiz geçersiz sayılır", "Only that specific analysis is discounted"],
                ["Hiçbir etkisi yoktur", "It has no effect at all"],
              ],
              answer: 0,
              explain: [
                "Belirsizliği gizleyip kesin konuşan bir analist yanıldığında, dinleyici sonraki tüm analizlerine de şüpheyle yaklaşır — güven aralığı belirtmenin maliyeti bundan çok daha düşüktür.",
                "When an analyst who hides uncertainty and speaks with certainty turns out to be wrong, the audience starts doubting every future analysis too — a cost far higher than simply stating a confidence interval.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Yönetime 20 dakikalık bir bulgu sunumu yapacaksın. Kaç grafik göstermelisin?",
                "You have 20 minutes to present a finding to leadership. How many charts?",
              ],
              options: [
                ["1–3, her biri tek bir mesaj taşıyan", "1–3, each carrying a single message"],
                ["10–15, kapsamlı olsun", "10–15, to be comprehensive"],
                ["Tüm keşif sürecini gösteren hepsi", "All of them, showing the whole exploration"],
                ["Hiç, sadece sayılar", "None, just the numbers"],
              ],
              answer: 0,
              explain: [
                "Her grafik dinleyicinin dikkatinden pay alır. Bir bulgu, bir grafik. Kalan tüm analizi eke koy — soru gelirse açarsın, gelmezse sunumu kısaltmış olursun.",
                "Every chart spends some of your audience's attention. One finding, one chart. Put the rest in an appendix — open it if a question comes, and if none does, you just gave a shorter talk.",
              ],
              xp: 20,
            }),
          ],
        }),
      ],
    },
    {
      id: "expert",
      title: L("Etik, erişilebilirlik ve ölçek", "Ethics, accessibility and scale"),
      description: L(
        "Yanıltmayan, herkesin okuyabildiği ve tutarlı kalan görseller üretmek.",
        "Producing visuals that do not mislead, that everyone can read, and that stay consistent.",
      ),
      lessons: [
        lesson({
          slug: "yaniltici-grafikler",
          title: L("Yanıltıcı grafikler ve dürüstlük", "Misleading charts and honesty"),
          summary: L(
            "Aynı veriyle iki zıt hikâye anlatılabilir. Farkı nasıl yakalarsın?",
            "The same data can tell two opposite stories. How do you spot the difference?",
          ),
          minutes: 18,
          blocks: [
            text(
              "**En yaygın altı yanıltma tekniği** — hem yapmamak hem de başkasının grafiğinde tanımak için:\n\n1. **Kesilmiş eksen** — Sütun grafiğinin y ekseni sıfırdan başlamazsa küçük farklar dev görünür. %2'lik bir artış üç katı gibi çizilebilir.\n2. **Ters eksen** — Y eksenini ters çevirip artışı düşüş gibi göstermek.\n3. **Seçilmiş zaman aralığı** — Genel düşüş içindeki kısa yükseliş dönemini göstermek. \"Hangi tarihten başlıyor?\" sorusu daima sorulmalıdır.\n4. **Çift eksen manipülasyonu** — İki farklı ölçeği yan yana koyup ölçekleri kaydırarak sahte bir örtüşme yaratmak.\n5. **Kümülatif grafik** — Kümülatif toplam **her zaman** yükselir; büyüme yavaşlasa bile grafik yukarı gider.\n6. **Uygunsuz toplam** — Ortalamaların ortalamasını almak. Farklı büyüklükteki grupların ortalamaları doğrudan ortalanamaz.",
              "**The six most common ways to mislead** — both to avoid them and to recognise them in someone else's chart:\n\n1. **Truncated axis** — when a bar chart's y-axis does not start at zero, small differences look enormous. A 2% rise can be drawn as though it tripled.\n2. **Inverted axis** — flipping the y-axis so a rise reads as a fall.\n3. **Cherry-picked time window** — showing a brief upturn inside a general decline. \"What date does this start from?\" should always be asked.\n4. **Dual-axis manipulation** — placing two different scales side by side and shifting them to manufacture a fake correlation.\n5. **Cumulative charts** — a cumulative total **always** rises; the line goes up even when growth is slowing.\n6. **Improper aggregation** — averaging averages. The means of groups of different sizes cannot simply be averaged.",
            ),
            quiz({
              id: "q2",
              q: [
                "Ters eksen (inverted axis) tekniği neyi yapar?",
                "What does the inverted-axis technique do?",
              ],
              options: [
                ["Y eksenini ters çevirip artışı düşüş gibi gösterir", "It flips the y-axis so a rise reads as a fall"],
                ["Ekseni sıfırdan başlatır", "It makes the axis start at zero"],
                ["Renkleri tersine çevirir", "It inverts the colours"],
                ["Veriyi büyükten küçüğe sıralar", "It sorts the data from largest to smallest"],
              ],
              answer: 0,
              explain: [
                "Y eksenini ters çevirmek, yükselen bir eğilimi grafikte aşağı doğru gidiyormuş gibi gösterir — okuyucunun sezgisel eksen okumasını doğrudan kötüye kullanır.",
                "Flipping the y-axis makes a rising trend appear to go downward on the page — a direct abuse of the reader's intuitive expectation of how an axis works.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Seçilmiş zaman aralığı (cherry-picked window) hilesinde daima sorulması gereken soru nedir?",
                "With a cherry-picked time window, what question should always be asked?",
              ],
              options: [
                ["Hangi tarihten başlıyor?", "What date does this start from?"],
                ["Hangi renk kullanılmış?", "Which colour was used?"],
                ["Kaç grafik var?", "How many charts are there?"],
                ["Veri kaynağı ne?", "What is the data source?"],
              ],
              answer: 0,
              explain: [
                "Genel bir düşüş içindeki kısa bir yükseliş dönemi seçilip gösterildiğinde, başlangıç tarihini sorgulamak seçimin bilinçli mi tesadüfi mi olduğunu ortaya çıkarır.",
                "When a brief upturn inside a broader decline is chosen and shown, questioning the start date reveals whether the choice was deliberate or coincidental.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Çift eksen manipülasyonu ne yaratır?",
                "What does dual-axis manipulation create?",
              ],
              options: [
                ["İki farklı ölçeği kaydırarak sahte bir örtüşme", "A fake overlap by shifting two different scales"],
                ["Gerçek bir korelasyon", "A genuine correlation"],
                ["Daha okunaklı bir grafik", "A more readable chart"],
                ["Renk körü dostu bir görünüm", "A colour-blind-friendly look"],
              ],
              answer: 0,
              explain: [
                "İki farklı ölçeği yan yana koyup keyfi kaydırarak, aslında ilişkisiz olan iki çizgi görsel olarak örtüşür hale getirilebilir — bu, sahte bir korelasyon izlenimi üretir.",
                "By placing two different scales side by side and shifting them arbitrarily, two genuinely unrelated lines can be made to visually overlap — producing the impression of a fake correlation.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Kümülatif toplam grafiği hakkında ne doğrudur?",
                "What is true about a cumulative-total chart?",
              ],
              options: [
                ["Büyüme yavaşlasa bile grafik daima yukarı gider", "The line always goes up even when growth is slowing"],
                ["Büyüme durunca düz çizgi olur", "It becomes a flat line once growth stops"],
                ["Her zaman düşer", "It always falls"],
                ["Yalnızca negatif değerlerde kullanılır", "It is only used for negative values"],
              ],
              answer: 0,
              explain: [
                "Kümülatif toplam bir önceki değere her zaman ekleme yapar, hiç çıkarma yapmaz; bu yüzden büyüme yavaşlasa bile eğri hep yukarı yönlü kalır ve yavaşlamayı gizler.",
                "A cumulative total only ever adds to the previous value, never subtracts; so even when growth is slowing, the curve keeps trending upward and hides the slowdown.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "\"Uygunsuz toplam\" hatası neyi ifade eder?",
                "What does the \"improper aggregation\" mistake refer to?",
              ],
              options: [
                ["Farklı büyüklükteki grupların ortalamalarının ortalamasını almak", "Averaging the averages of groups with different sizes"],
                ["Toplamı hiç hesaplamamak", "Never computing a total"],
                ["Medyan kullanmak", "Using the median"],
                ["Yüzde hesaplamak", "Calculating a percentage"],
              ],
              answer: 0,
              explain: [
                "Grup büyüklükleri farklıysa, ortalamaların basit ortalaması küçük grupları büyük gruplarla eşit ağırlıklandırır ve gerçek genel ortalamayı çarpıtır; ağırlıklı ortalama gerekir.",
                "When group sizes differ, a plain average of averages weights small groups equally with large ones and distorts the true overall mean; a weighted average is needed instead.",
              ],
            }),
            info(
              "Sıfırdan başlamak ne zaman zorunlu?",
              "When must the axis start at zero?",
              "Bu, veri görselleştirmenin en çok tartışılan kuralıdır ve doğru cevap grafik türüne bağlıdır:\n\n**Sütun/çubuk grafiğinde zorunludur.** Çünkü çubuğun **uzunluğu** değeri kodlar; sıfırdan başlamayan bir çubuk fiilen yanlış bir uzunluk gösterir.\n\n**Çizgi grafiğinde zorunlu değildir.** Çizgide anlam **eğimde**dir, mutlak uzunlukta değil. Vücut sıcaklığını 0°C'den başlatmak grafiği okunmaz kılar — 36-40 aralığı doğru seçimdir.\n\nAma çizgide de eksen aralığını **dürüstçe** seçmelisin: veriyi rahat gösteren en dar aralık uygundur, dramatize eden aşırı dar aralık değil. Şüphedeysen ekseni açıkça etiketle.",
              "This is data visualisation's most argued rule, and the right answer depends on the chart type:\n\n**It is mandatory for bar charts.** The bar's **length** encodes the value, so a bar not starting at zero literally shows a wrong length.\n\n**It is not mandatory for line charts.** In a line the meaning lives in the **slope**, not in absolute length. Starting body temperature at 0°C makes the chart unreadable — 36 to 40 is the right range.\n\nBut even on a line you must choose the range **honestly**: the narrowest range that shows the data comfortably is fine; an extremely narrow one that dramatises is not. When in doubt, label the axis explicitly.",
            ),
            quiz({
              id: "q7",
              q: [
                "Sütun grafiğinde eksenin sıfırdan başlaması neden zorunludur?",
                "Why must a bar chart's axis start at zero?",
              ],
              options: [
                ["Çubuğun uzunluğu doğrudan değeri kodlar", "The bar's length directly encodes the value"],
                ["Estetik bir tercihtir, zorunlu değildir", "It is an aesthetic choice, not a requirement"],
                ["Yazılımlar başka türlü çizemez", "Software cannot draw it any other way"],
                ["Sadece büyük veri setlerinde gereklidir", "It is only needed for large datasets"],
              ],
              answer: 0,
              explain: [
                "Çubuk grafiğinde anlam uzunluktadır; eksen sıfırdan başlamazsa çubuğun uzunluğu artık gerçek oranı yansıtmaz ve grafik yanlış bir büyüklük ilişkisi gösterir.",
                "In a bar chart the meaning lives in the length; if the axis does not start at zero, the bar's length no longer reflects the true ratio and the chart shows a false magnitude relationship.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Çizgi grafiğinde ekseni sıfırdan başlatmak neden zorunlu değildir?",
                "Why is starting the axis at zero not mandatory for a line chart?",
              ],
              options: [
                ["Anlam eğimde taşınır, mutlak uzunlukta değil", "The meaning lives in the slope, not in absolute length"],
                ["Çizgi grafiği her zaman yanıltıcıdır", "Line charts are always misleading anyway"],
                ["Eksen zaten görünmez", "The axis is invisible anyway"],
                ["Çizgi grafiğinde değer önemsizdir", "Values do not matter in a line chart"],
              ],
              answer: 0,
              explain: [
                "Çizgi grafiğinde okuyucu noktanın eksenden mutlak uzaklığını değil, iki nokta arasındaki eğimi okur; bu yüzden dar bir aralık verinin okunmasını kolaylaştırabilir.",
                "In a line chart the reader reads the slope between points, not a point's absolute distance from the axis; a narrower range can therefore make the data easier to read.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Vücut sıcaklığını 0°C'den başlatmak grafiği neden okunmaz kılar?",
                "Why does starting body temperature at 0°C make the chart unreadable?",
              ],
              options: [
                ["36-40 aralığındaki asıl değişim ezilir, görünmez hale gelir", "The real 36-40 range of change gets squashed and becomes invisible"],
                ["Sıcaklık negatif olamaz", "Temperature cannot be negative"],
                ["Renk paleti bozulur", "It breaks the colour palette"],
                ["Eksen etiketleri sığmaz", "The axis labels no longer fit"],
              ],
              answer: 0,
              explain: [
                "Tüm anlamlı değişim 36-40°C arasında olurken 0-36 arası boş bir alan kaplar; bu, gerçek dalgalanmayı düz bir çizgiye sıkıştırıp görünmez kılar.",
                "All the meaningful change happens between 36-40°C while 0-36 is dead space; this compresses the real fluctuation into a nearly flat, invisible line.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Çizgi grafiğinde eksen aralığını seçerken kural nedir?",
                "What is the rule for choosing the axis range on a line chart?",
              ],
              options: [
                ["Veriyi rahat gösteren en dar aralık, dramatize eden aşırı dar aralık değil", "The narrowest range that shows the data comfortably, not one so narrow it dramatises"],
                ["Her zaman sıfırdan başlamalı", "It must always start at zero"],
                ["Mümkün olduğunca geniş olmalı", "It should be as wide as possible"],
                ["Rastgele seçilebilir", "It can be chosen at random"],
              ],
              answer: 0,
              explain: [
                "Dürüstlük burada da geçerlidir: veriyi okunur kılan en dar aralık uygundur, ama aralığı aşırı daraltarak küçük dalgalanmaları büyük olaylar gibi göstermek manipülasyondur.",
                "Honesty still applies here: the narrowest range that keeps the data legible is fine, but shrinking the range so far that small wobbles look like major events is manipulation.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Bir sütun grafiğinde y ekseni 95'ten başlıyor ve değerler 96-99 arasında. Sorun nedir?",
                "A bar chart's y-axis starts at 95 and the values run 96-99. What is the problem?",
              ],
              options: [
                [
                  "Çubuk uzunlukları gerçek oranı yansıtmaz; %3'lük fark kat kat büyük görünür",
                  "The bar lengths no longer reflect the real ratio; a 3% difference looks many times larger",
                ],
                ["Renkler yanlış", "The colours are wrong"],
                ["Hiçbir sorun yok", "There is no problem"],
                ["Çok fazla kategori var", "There are too many categories"],
              ],
              answer: 0,
              explain: [
                "96 ile 99 arasındaki gerçek fark %3'tür. Eksen 95'ten başlarsa çubuklar 1 ve 4 birim uzunluğunda çizilir — yani biri diğerinin **dört katı** görünür. Bu, bilerek yapıldığında manipülasyon, bilmeden yapıldığında ciddi bir hatadır. Çizgi grafiği kullanmak veya farkı doğrudan yazmak dürüst alternatiflerdir.",
                "The real difference between 96 and 99 is 3%. With the axis starting at 95 the bars are drawn 1 and 4 units long — one looks **four times** the other. Done deliberately this is manipulation; done unknowingly it is a serious error. Using a line chart, or simply writing the difference, are honest alternatives.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "erisilebilir-gorseller",
          title: L("Erişilebilir görselleştirme", "Accessible visualisation"),
          summary: L(
            "Erkeklerin %8'i renk körü. Grafiğin onlar için de çalışıyor mu?",
            "8% of men are colour-blind. Does your chart work for them too?",
          ),
          minutes: 16,
          blocks: [
            text(
              "Erkeklerin yaklaşık **%8'i**, kadınların %0,5'i renk görme eksikliğine sahiptir. En yaygın türü kırmızı-yeşil ayrımının zorlaşmasıdır — yani veri görselleştirmede en çok kullanılan renk çiftinin tam olarak işe yaramadığı tür.\n\n\"İyi yeşil, kötü kırmızı\" kodlaması, on kişilik bir toplantıda muhtemelen bir kişi için tamamen anlamsızdır.\n\n**Dört pratik kural:**\n\n1. **Renge tek başına anlam yükleme.** Renge ek olarak şekil, desen, etiket veya konum kullan. Renk kaldırıldığında grafik hâlâ okunuyorsa güvendesin.\n2. **Renk körü dostu paletler kullan.** Viridis, Cividis ve ColorBrewer'ın güvenli paletleri bunun için tasarlandı. Kırmızı-yeşil yerine **mavi-turuncu** kullan.\n3. **Kontrast oranını sına.** Metin ve arka plan arasında en az 4,5:1 kontrast olmalı.\n4. **Grafiği gri tonlamada yazdır.** Ayırt edilebiliyorsa erişilebilirdir. En hızlı sınama budur.",
              "About **8% of men** and 0.5% of women have a colour vision deficiency. The most common form makes red and green hard to tell apart — which is precisely the colour pair data visualisation uses most.\n\nA \"green is good, red is bad\" encoding is probably meaningless to one person in a meeting of ten.\n\n**Four practical rules:**\n\n1. **Never let colour carry meaning alone.** Add shape, pattern, label or position. If the chart still reads with colour removed, you are safe.\n2. **Use colour-blind-safe palettes.** Viridis, Cividis and ColorBrewer's safe palettes were designed for this. Use **blue-orange** instead of red-green.\n3. **Check contrast ratios.** Text against background needs at least 4.5:1.\n4. **Print the chart in greyscale.** If it still separates, it is accessible. This is the fastest test there is.",
            ),
            quiz({
              id: "q2",
              q: [
                "Kadınlarda renk görme eksikliği görülme oranı yaklaşık nedir?",
                "Roughly what share of women have a colour vision deficiency?",
              ],
              options: [
                ["%0,5", "0.5%"],
                ["%8", "8%"],
                ["%25", "25%"],
                ["%50", "50%"],
              ],
              answer: 0,
              explain: [
                "Renk görme eksikliği X kromozomuna bağlı olduğu için erkeklerde (%8) kadınlardan (%0,5) çok daha yaygındır.",
                "Because colour vision deficiency is X-linked, it is far more common in men (8%) than in women (0.5%).",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "En yaygın renk görme eksikliği türü hangi renk çiftini zorlaştırır?",
                "Which colour pair does the most common form of colour vision deficiency make hard to distinguish?",
              ],
              options: [
                ["Kırmızı-yeşil", "Red-green"],
                ["Mavi-sarı", "Blue-yellow"],
                ["Siyah-beyaz", "Black-white"],
                ["Mor-turuncu", "Purple-orange"],
              ],
              answer: 0,
              explain: [
                "Kırmızı-yeşil ayrımının zorlaşması en yaygın türdür — tam olarak veri görselleştirmede en sık kullanılan renk çifti.",
                "Difficulty distinguishing red from green is the most common form — precisely the colour pair used most often in data visualisation.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "\"Renge tek başına anlam yükleme\" kuralına göre renge ek olarak ne kullanılmalı?",
                "According to \"never let colour carry meaning alone\", what should be added alongside colour?",
              ],
              options: [
                ["Şekil, desen, etiket veya konum", "Shape, pattern, label or position"],
                ["Sadece daha canlı bir renk", "Just a brighter colour"],
                ["Daha büyük yazı tipi", "A larger font"],
                ["Ekstra ızgara çizgisi", "Extra gridlines"],
              ],
              answer: 0,
              explain: [
                "Renk kaldırıldığında grafik hâlâ okunuyorsa güvendesin — bu ancak şekil, desen, etiket veya konum gibi ikinci bir kanal renkle birlikte anlam taşıdığında mümkündür.",
                "If the chart still reads with colour removed, you are safe — which is only possible when a second channel like shape, pattern, label or position carries meaning alongside colour.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Renk körü dostu paletlere örnek olarak hangisi verilir?",
                "Which of these is given as an example of a colour-blind-safe palette?",
              ],
              options: [
                ["Viridis", "Viridis"],
                ["Klasik kırmızı-yeşil", "Classic red-green"],
                ["Rastgele renkler", "Random colours"],
                ["Tek bir gri tonu", "A single shade of grey"],
              ],
              answer: 0,
              explain: [
                "Viridis, Cividis ve ColorBrewer'ın güvenli paletleri renk körlüğü göz önünde bulundurularak tasarlanmıştır ve kırmızı-yeşil ayrımına dayanmaz.",
                "Viridis, Cividis and ColorBrewer's safe palettes were designed with colour blindness in mind and do not rely on the red-green split.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Metin ve arka plan arasında önerilen minimum kontrast oranı nedir?",
                "What is the recommended minimum contrast ratio between text and background?",
              ],
              options: [
                ["4,5:1", "4.5:1"],
                ["1:1", "1:1"],
                ["2:1", "2:1"],
                ["10:1", "10:1"],
              ],
              answer: 0,
              explain: [
                "4,5:1, çoğu erişilebilirlik standardının metin okunabilirliği için kabul ettiği eşiktir; altına düşen metinler zayıf görüşlü kullanıcılar için zorlaşır.",
                "4.5:1 is the threshold most accessibility standards accept for text legibility; anything below it becomes hard to read for users with low vision.",
              ],
            }),
            text(
              "**Renk körlüğünün ötesinde erişilebilirlik:**\n\n- **Alternatif metin** — Her grafiğin, ekran okuyucunun okuyabileceği bir açıklaması olmalı. \"Grafik\" değil; \"2024'te ciro her çeyrek arttı, en büyük sıçrama üçüncü çeyrekte\" gibi **sonucu anlatan** bir metin.\n- **Veri tablosu alternatifi** — Karmaşık bir görselin altında ham sayıları da sun.\n- **Yazı boyutu** — Sunum ekranında 18 punto altı okunmaz. Grafiği yapacağın ortamı düşün.\n- **Hareket ve animasyon** — Otomatik oynayan animasyonlar bazı kullanıcılar için rahatsız edicidir; durdurma imkânı ver.\n\nErişilebilirlik ek bir iş gibi görünür ama sonuç neredeyse her zaman **herkes için daha okunur** bir grafiktir. Renk körü dostu bir palet, normal görenler için de daha nettir.",
              "**Accessibility beyond colour blindness:**\n\n- **Alt text** — every chart needs a description a screen reader can read out. Not \"chart\", but something that states the **conclusion**: \"revenue rose every quarter in 2024, with the largest jump in Q3\".\n- **A data table alternative** — offer the raw numbers beneath a complex visual.\n- **Font size** — anything under 18pt is unreadable on a presentation screen. Design for where the chart will be seen.\n- **Motion and animation** — auto-playing animation is distressing for some users; provide a way to stop it.\n\nAccessibility looks like extra work, but the result is almost always a chart that is **more readable for everyone**. A colour-blind-safe palette is clearer for people with normal vision too.",
            ),
            quiz({
              id: "q7",
              q: [
                "Bir grafiğin alternatif metni nasıl yazılmalıdır?",
                "How should a chart's alt text be written?",
              ],
              options: [
                ["\"Grafik\" değil, sonucu anlatan bir cümle olarak", "As a sentence stating the conclusion, not just \"chart\""],
                ["Sadece 'grafik' kelimesiyle", "Just the word \"chart\""],
                ["Hiç yazılmamalı", "It should not be written at all"],
                ["Sadece renk kodlarıyla", "Just the colour codes"],
              ],
              answer: 0,
              explain: [
                "İyi bir alt metin \"2024'te ciro her çeyrek arttı, en büyük sıçrama üçüncü çeyrekte\" gibi sonucu anlatır; ekran okuyucu kullanan biri sadece \"grafik\" duyarsa hiçbir şey öğrenmez.",
                "A good alt text states the conclusion, like \"revenue rose every quarter in 2024, with the largest jump in Q3\"; a screen-reader user who just hears \"chart\" learns nothing.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Karmaşık bir görselin altına ne eklemek erişilebilirliği artırır?",
                "What can be added below a complex visual to improve accessibility?",
              ],
              options: [
                ["Ham sayıları içeren bir veri tablosu", "A data table with the raw numbers"],
                ["Daha fazla renk", "More colours"],
                ["Daha küçük yazı tipi", "A smaller font"],
                ["Otomatik oynayan animasyon", "An auto-playing animation"],
              ],
              answer: 0,
              explain: [
                "Görseli yorumlayamayan bir kullanıcı için ham sayıları içeren bir tablo, aynı bilgiye ulaşmanın bağımsız bir yolunu sağlar.",
                "For a user who cannot interpret the visual, a table with the raw numbers provides an independent way to reach the same information.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Sunum ekranında önerilen minimum yazı boyutu nedir?",
                "What is the recommended minimum font size for a presentation screen?",
              ],
              options: [
                ["18 punto", "18pt"],
                ["8 punto", "8pt"],
                ["10 punto", "10pt"],
                ["12 punto", "12pt"],
              ],
              answer: 0,
              explain: [
                "18 puntonun altı, sunum odasının arkasından okunmaz hale gelir. Kural, grafiği nerede göstereceğine göre yazı boyutunu ayarlamaktır.",
                "Anything under 18pt becomes unreadable from the back of a presentation room. The rule is to size the text for where the chart will actually be seen.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Otomatik oynayan animasyonlarla ilgili erişilebilirlik kuralı nedir?",
                "What is the accessibility rule for auto-playing animation?",
              ],
              options: [
                ["Kullanıcıya durdurma imkânı verilmeli", "The user must be given a way to stop it"],
                ["Her zaman otomatik oynamalı", "It must always autoplay"],
                ["Asla kullanılmamalı", "It must never be used"],
                ["Sadece mobilde gösterilmeli", "It should only appear on mobile"],
              ],
              answer: 0,
              explain: [
                "Otomatik oynayan animasyon bazı kullanıcılar için rahatsız edici veya dikkat dağıtıcıdır; bu yüzden durdurma kontrolü sunmak erişilebilirliğin bir parçasıdır.",
                "Auto-playing animation is distressing or distracting for some users, which is why offering a way to pause it is part of accessibility.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Grafiğinin erişilebilir olup olmadığını sınamanın en hızlı yolu nedir?",
                "What is the fastest way to test whether your chart is accessible?",
              ],
              options: [
                [
                  "Gri tonlamaya çevirip hâlâ okunabiliyor mu diye bakmak",
                  "Convert it to greyscale and see whether it still reads",
                ],
                ["Daha canlı renkler kullanmak", "Use brighter colours"],
                ["Yazı boyutunu büyütmek", "Increase the font size"],
                ["Grafiği büyütmek", "Make the chart bigger"],
              ],
              answer: 0,
              explain: [
                "Gri tonlama, rengi bir bilgi kanalı olmaktan çıkarır. Grafik gri tonlamada hâlâ anlaşılıyorsa, renk körü kullanıcılar için de anlaşılır demektir — ve fotokopi çekildiğinde de çalışır. Tek tıkla yapılabilen bu sınama, çoğu erişilebilirlik sorununu yakalar.",
                "Greyscale removes colour as an information channel. If the chart still makes sense in greyscale it will make sense to colour-blind users too — and it will survive being photocopied. This one-click test catches most accessibility problems.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "gorsel-sistem-kurmak",
          title: L("Görsel sistem ve şablon kurmak", "Building a visual system"),
          summary: L(
            "Tek grafik değil, yüz grafiğin tutarlı görünmesini sağlayan kuralları yaz.",
            "Write the rules that make a hundred charts look like one system, not one chart look good.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Tek bir grafiği güzel yapmak beceridir; **yüz grafiği tutarlı** yapmak sistemdir. Bir ekipte herkes kendi renklerini ve yazı tipini seçerse, raporlar bir arada dağınık görünür ve okuyucu her grafikte kodları yeniden öğrenmek zorunda kalır.\n\n**Bir görsel sistemin bileşenleri:**\n\n- **Renk paleti** — Kategorik (birbirinden ayrık 6-8 renk), sıralı (açıktan koyuya) ve ıraksak (iki uçlu, ortası nötr) olmak üzere üç ayrı palet. Her birinin ne zaman kullanılacağı yazılı olmalı.\n- **Anlamsal renkler** — Marka rengi, olumlu, olumsuz, nötr, vurgu. \"Kâr her zaman mavi, zarar her zaman turuncu.\"\n- **Tipografi** — Başlık, eksen etiketi ve açıklama için üç boyut yeter.\n- **Yerleşim** — Başlık nerede, açıklama nerede, kaynak notu nerede.\n- **Varsayılan kararlar** — Izgara çizgisi var mı, eksen sıfırdan mı başlıyor, sayı biçimi nasıl.",
              "Making one chart beautiful is a skill; making **a hundred charts consistent** is a system. If everyone in a team picks their own colours and fonts, reports look scrappy together and the reader has to relearn the encoding on every chart.\n\n**The components of a visual system:**\n\n- **Colour palettes** — three separate ones: categorical (6-8 clearly distinct colours), sequential (light to dark) and diverging (two ends, neutral middle). When to use each should be written down.\n- **Semantic colours** — brand, positive, negative, neutral, emphasis. \"Profit is always blue, loss is always orange.\"\n- **Typography** — three sizes are enough: title, axis label, annotation.\n- **Layout** — where the title goes, where the annotation goes, where the source note goes.\n- **Default decisions** — gridlines or not, does the axis start at zero, how are numbers formatted.",
            ),
            quiz({
              id: "q2",
              q: [
                "Bir görsel sistemde kaç ayrı renk paleti tanımlanmalıdır?",
                "How many separate colour palettes should a visual system define?",
              ],
              options: [
                ["Üç: kategorik, sıralı, ıraksak", "Three: categorical, sequential, diverging"],
                ["Sadece bir", "Just one"],
                ["Beş", "Five"],
                ["Sınırsız", "An unlimited number"],
              ],
              answer: 0,
              explain: [
                "Kategorik, sıralı ve ıraksak veriler farklı görsel mantıklar gerektirir; her biri için ayrı bir palet olmadan yanlış türde veriye yanlış türde renk uygulanır.",
                "Categorical, sequential and diverging data each need a different visual logic; without a separate palette for each, the wrong kind of colour ends up applied to the wrong kind of data.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "\"Kâr her zaman mavi, zarar her zaman turuncu\" kuralı neyi ifade eder?",
                "What does the rule \"profit is always blue, loss is always orange\" describe?",
              ],
              options: [
                ["Anlamsal renk kullanımını", "Semantic colour usage"],
                ["Kategorik paleti", "A categorical palette"],
                ["Tipografi kuralını", "A typography rule"],
                ["Izgara çizgisi kararını", "A gridline decision"],
              ],
              answer: 0,
              explain: [
                "Anlamsal renkler belirli bir kavramı (kâr, zarar, marka, vurgu) sabit bir renge bağlar; okuyucu bir kez öğrendiğinde her rapor boyunca aynı anlamı taşır.",
                "Semantic colours bind a specific concept (profit, loss, brand, emphasis) to a fixed colour; once the reader learns it, that colour carries the same meaning across every report.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Bir görsel sistemde tipografi için kaç boyut yeterli görülür?",
                "How many sizes are considered enough for typography in a visual system?",
              ],
              options: [
                ["Üç: başlık, eksen etiketi, açıklama", "Three: title, axis label, annotation"],
                ["Bir", "One"],
                ["On", "Ten"],
                ["Sınırsız", "An unlimited number"],
              ],
              answer: 0,
              explain: [
                "Üç net rol — başlık, eksen etiketi, açıklama — okuyucunun hiyerarşiyi anlamasına yeter; daha fazlası tutarlılığı bozar, daha azı hiyerarşiyi kaybettirir.",
                "Three clear roles — title, axis label, annotation — are enough for the reader to grasp the hierarchy; more breaks consistency, fewer loses the hierarchy altogether.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Herkes kendi renk ve yazı tipini seçerse raporlarda ne olur?",
                "What happens to reports when everyone picks their own colours and fonts?",
              ],
              options: [
                ["Dağınık görünür, okuyucu her grafikte kodları yeniden öğrenir", "They look scrappy together, and the reader has to relearn the encoding on every chart"],
                ["Daha yaratıcı olur", "They become more creative"],
                ["Hiçbir sorun çıkmaz", "No problem arises"],
                ["Otomatik olarak tutarlı hale gelir", "They automatically become consistent"],
              ],
              answer: 0,
              explain: [
                "Bir görsel sistem olmadan, aynı ekip içindeki iki grafik bile aynı renk aynı anlamı taşımayabilir; bu, okuyucunun bilişsel yükünü artırır.",
                "Without a visual system, even two charts from the same team may use the same colour for different meanings; that raises the reader's cognitive load with every new chart.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Görsel sistemin \"varsayılan kararlar\" bileşeni neyi kapsar?",
                "What does the \"default decisions\" component of a visual system cover?",
              ],
              options: [
                ["Izgara çizgisi olup olmayacağı, eksenin sıfırdan başlaması, sayı biçimi", "Whether to show gridlines, whether the axis starts at zero, number formatting"],
                ["Sadece renk paleti", "Just the colour palette"],
                ["Sadece yazı tipi", "Just the font"],
                ["Sadece dosya formatı", "Just the file format"],
              ],
              answer: 0,
              explain: [
                "Varsayılan kararlar, her grafikte tekrar tekrar sorulacak küçük soruları (ızgara var mı, eksen sıfırdan mı) tek seferde yazılı hale getirir, böylece her seferinde yeniden tartışılmaz.",
                "Default decisions write down once, in advance, the small questions that would otherwise be re-asked on every chart — gridlines or not, does the axis start at zero — so they are not re-litigated each time.",
              ],
            }),
            tip(
              "Başlık grafiğin en önemli parçasıdır",
              "The title is the most important part of a chart",
              "Çoğu grafiğin başlığı grafiğin **ne olduğunu** söyler: \"Aylık Ciro\". Bu boşa harcanmış bir satırdır — okuyucu eksene bakınca bunu zaten görüyor.\n\nİyi başlık grafiğin **ne söylediğini** yazar: \"Ciro üçüncü çeyrekte %18 arttı, sürükleyici Anadolu bayileri.\"\n\nBuna \"sonuç başlığı\" denir ve tek başına raporun anlaşılma oranını ciddi biçimde artırır. Okuyucunun grafiği yorumlamasını bekleme — yorumu sen yaz, grafik kanıt olsun.",
              "Most chart titles state what the chart **is**: \"Monthly Revenue\". That is a wasted line — the reader sees it from the axis already.\n\nA good title states what the chart **says**: \"Revenue rose 18% in Q3, driven by regional dealers.\"\n\nThis is called a conclusion title, and on its own it substantially raises how much of a report gets understood. Do not wait for the reader to interpret the chart — write the interpretation and let the chart be the evidence.",
            ),
            quiz({
              id: "q7",
              q: [
                "Çoğu grafiğin başlığı neden \"boşa harcanmış bir satır\" olarak nitelendirilir?",
                "Why is the typical chart title called \"a wasted line\"?",
              ],
              options: [
                ["Grafiğin ne olduğunu söyler, okuyucu bunu eksenden zaten görür", "It states what the chart is, and the reader already sees that from the axes"],
                ["Çok uzun olduğu için", "Because it is too long"],
                ["Renkli olduğu için", "Because it is coloured"],
                ["Türkçe yazıldığı için", "Because it is written in Turkish"],
              ],
              answer: 0,
              explain: [
                "\"Aylık Ciro\" gibi bir başlık, eksen etiketlerinin zaten söylediğini tekrar eder; o satırı kullanıp asıl bulguyu yazmak çok daha değerlidir.",
                "A title like \"Monthly Revenue\" just repeats what the axis labels already say; using that same line to state the actual finding is far more valuable.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "\"Sonuç başlığı\" (conclusion title) nedir?",
                "What is a \"conclusion title\"?",
              ],
              options: [
                ["Grafiğin ne söylediğini yazan başlık", "A title that states what the chart says"],
                ["Sadece verinin kaynağını belirten başlık", "A title that just names the data source"],
                ["Grafiğin türünü belirten başlık", "A title that just names the chart type"],
                ["Eksen adlarının tekrarı", "A repetition of the axis labels"],
              ],
              answer: 0,
              explain: [
                "\"Ciro üçüncü çeyrekte %18 arttı, sürükleyici Anadolu bayileri\" örneğinde olduğu gibi, sonuç başlığı grafiğin ortaya koyduğu bulguyu doğrudan yazar.",
                "As in \"Revenue rose 18% in Q3, driven by regional dealers\", a conclusion title states the chart's finding directly.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Sonuç başlığı kullanmanın raporun anlaşılırlığına etkisi nedir?",
                "What effect does using a conclusion title have on how well a report is understood?",
              ],
              options: [
                ["Ciddi biçimde artırır", "It substantially raises it"],
                ["Hiçbir etkisi yoktur", "It has no effect at all"],
                ["Azaltır", "It decreases it"],
                ["Sadece uzman okuyucular için işe yarar", "It only helps expert readers"],
              ],
              answer: 0,
              explain: [
                "Okuyucu grafiğe bakmadan önce ne arayacağını bildiğinde, grafiği çok daha hızlı ve doğru yorumlar; bu tek başlık değişikliği raporun anlaşılma oranını ciddi biçimde yükseltir.",
                "When the reader knows what to look for before even looking at the chart, they interpret it far faster and more accurately; this single title change substantially raises how well a report is understood.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir başlıkta okuyucunun yorumunu beklemek yerine ne yapılmalı?",
                "Instead of waiting for the reader to interpret the chart, what should the title do?",
              ],
              options: [
                ["Yorumu yazıp grafiği kanıt olarak sunmak", "State the interpretation and let the chart serve as evidence"],
                ["Hiçbir başlık koymamak", "Add no title at all"],
                ["Sadece sayıyı yazmak", "Just write the number"],
                ["Okuyucuya soru sormak", "Ask the reader a question"],
              ],
              answer: 0,
              explain: [
                "Yorumu okuyucuya bırakmak, herkesin farklı bir sonuç çıkarma riskini taşır. Yorumu sen yazarsan grafik onu doğrulayan kanıt olur, belirsizlik kaynağı olmaz.",
                "Leaving the interpretation to the reader risks everyone drawing a different conclusion. When you write the interpretation yourself, the chart becomes the evidence that confirms it, not a source of ambiguity.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Sıcaklık sapmasını (−5°C ile +5°C arası) göstermek için hangi palet türü doğrudur?",
                "Which palette type is right for showing a temperature anomaly from −5°C to +5°C?",
              ],
              options: [
                [
                  "Iraksak (diverging) — iki uç iki farklı renk, orta nokta nötr",
                  "Diverging — two different colours at the ends with a neutral midpoint",
                ],
                ["Sıralı (sequential)", "Sequential"],
                ["Kategorik", "Categorical"],
                ["Tek renk", "A single colour"],
              ],
              answer: 0,
              explain: [
                "Verinin anlamlı bir orta noktası (sıfır) varsa ve iki yöne de sapıyorsa ıraksak palet gerekir: örneğin soğuk için mavi, sıcak için kırmızı, sıfır için beyaz. Sıralı palet yalnızca tek yönde artan büyüklükler için uygundur ve burada sıfırın özel anlamını gizler.",
                "When the data has a meaningful midpoint (zero) and departs in both directions, you need a diverging palette: blue for cold, red for warm, white at zero. A sequential palette suits magnitudes increasing in one direction only and would hide the special meaning of zero here.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "kucuk-coklular-ile-karsilastirma",
          title: L("Küçük çoklular ile karşılaştırmalı düzen", "Comparative layout with small multiples"),
          summary: L(
            "12 şehri tek bir karmakarışık grafikte üst üste bindirmek yerine, aynı küçük grafiği 12 kez yan yana çiz.",
            "Instead of overlaying 12 cities on one tangled chart, draw the same small chart 12 times side by side.",
          ),
          minutes: 15,
          premium: true,
          blocks: [
            text(
              "12 şehrin aylık cirosunu **tek bir çizgi grafikte** üst üste çizersen, 12 renkli çizgi birbirine karışır — hangi çizginin hangi şehir olduğunu ayırt etmek imkânsızlaşır. **Küçük çoklular (small multiples)**, tam tersini yapar: aynı küçük grafiği, aynı eksenlerle, her kategori için **ayrı ayrı** çizip bir ızgarada yan yana koyar.\n\nBu yöntem, algı sıralamasında konumdan hemen sonra gelen \"aynı ölçekte ama ayrı eksende konum\" kodlamasına dayanır (bkz. Algı ve Kodlama dersi) — her panel kendi başına okunur, ama aynı ızgarada olduğu için karşılaştırma da kolaydır. Edward Tufte'nin deyişiyle: \"aynı sorunun, farklı bir değişkenle tekrar tekrar sorulmuş hâli.\"",
              "Overlay 12 cities' monthly revenue on **one line chart** and the 12 coloured lines tangle together — telling which line is which city becomes impossible. **Small multiples** do the opposite: draw the same small chart, on the same axes, **separately** for each category, and lay them out side by side in a grid.\n\nThe technique relies on the encoding that ranks right after position on perception's accuracy scale — \"position on identical but non-aligned scales\" (see the Perception and Encoding lesson) — each panel reads on its own, yet sits in the same grid so comparison stays easy. In Edward Tufte's words: \"the same question, asked repeatedly, for a different variable.\"",
            ),
            quiz({
              id: "q1",
              q: [
                "12 şehri tek bir üst üste bindirilmiş çizgi grafiğinde göstermek yerine küçük çoklular kullanmanın asıl sebebi nedir?",
                "What's the main reason to use small multiples instead of 12 overlaid lines on one chart?",
              ],
              options: [
                [
                  "Çok sayıda çizgi üst üste bindiğinde birbirinden ayırt edilemez hâle gelir; ayrı paneller her kategoriyi kendi başına okunur kılar",
                  "Too many overlaid lines become indistinguishable from each other; separate panels make each category readable on its own",
                ],
                ["Küçük çoklular her zaman daha az yer kaplar", "Small multiples always take up less space"],
                ["Tek grafikte en fazla 2 kategori gösterilebilir, bu bir Excel kuralıdır", "A single chart can only show 2 categories, this is an Excel rule"],
                ["Küçük çoklular yalnızca coğrafi verilerde kullanılır", "Small multiples are only used for geographic data"],
              ],
              answer: 0,
              explain: [
                "5-6'dan fazla çizgi/kategori aynı grafikte üst üste bindiğinde 'spagetti grafik' denen okunamaz bir karmaşa oluşur. Küçük çoklular her kategoriye kendi panelini vererek bu karmaşayı çözer, ızgara düzeni sayesinde karşılaştırmayı da korur.",
                "Overlay more than 5-6 lines/categories on one chart and you get what's called a \"spaghetti chart\" — unreadable. Small multiples solve this by giving each category its own panel, while the grid layout still preserves comparability.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Küçük çoklular tasarlarken tüm panellerde ORTAK olması gereken şey nedir?",
                "When designing small multiples, what must be COMMON across every panel?",
              ],
              options: [
                [
                  "Eksen ölçeği (min/maks) ve grafik türü — aksi hâlde paneller arası karşılaştırma yanıltıcı olur",
                  "The axis scale (min/max) and chart type — otherwise comparing across panels becomes misleading",
                ],
                ["Yalnızca renk", "Only the color"],
                ["Yalnızca başlık yazı tipi", "Only the title font"],
                ["Hiçbir şeyin ortak olması gerekmez", "Nothing needs to be common"],
              ],
              answer: 0,
              explain: [
                "Her panelin ekseni farklı bir ölçekte olursa (biri 0-100, diğeri 0-10.000), iki panelin görsel olarak benzer görünen eğimleri tamamen farklı büyüklükleri temsil edebilir — bu, kesilmiş eksenle aynı yanıltma riskini taşır. Ortak ölçek, küçük çoklu tekniğinin ön koşuludur.",
                "If each panel's axis uses a different scale (one 0-100, another 0-10,000), two panels with visually similar slopes can represent completely different magnitudes — carrying the same misleading risk as a truncated axis. A shared scale is a precondition of the small-multiples technique.",
              ],
            }),
            pitfall(
              "Çok fazla panel, küçük çoklu'yu da okunamaz yapar",
              "Too many panels make small multiples unreadable too",
              "Küçük çoklular 6-20 kategori arasında iyi çalışır. 50 şehrin her biri için ayrı panel açmak, sorunu \"üst üste binen çizgiler\"den \"gözle taranamayan kalabalık bir ızgara\"ya taşır. Kategori sayısı çok fazlaysa önce en önemli 8-12 tanesini seç, gerisini 'Diğer' altında topla veya bir filtre/arama ekle.",
              "Small multiples work well between 6 and 20 categories. Opening a separate panel for each of 50 cities just moves the problem from \"overlapping lines\" to \"a grid too crowded to scan\". If there are too many categories, pick the top 8-12 that matter most and group the rest under \"Other\", or add a filter/search instead.",
            ),
          ],
        }),
        lesson({
          slug: "belirsizligi-cizmek",
          title: L("Belirsizliği çizmek: hata çubukları ve güven bantları", "Drawing uncertainty: error bars and confidence bands"),
          summary: L(
            "Tek bir çizgi kesinlik iddia eder; oysa her tahminin bir belirsizlik payı vardır — onu görünür kılmanın yolları.",
            "A single line claims certainty; but every estimate carries uncertainty — here's how to make it visible.",
          ),
          minutes: 16,
          premium: true,
          blocks: [
            text(
              "Bir önceki kademede, belirsizliği **sözle** ifade etmenin (\"±%3, n=1.240\") güvenilirliği artırdığını gördün. Bu ders, belirsizliği **görsel olarak** çizmenin üç yaygın yolunu ele alır:\n\n1. **Hata çubukları (error bars)** — bir nokta tahmininin üstüne/altına, güven aralığını gösteren dikey çizgiler eklenir. Tekil noktaları (ör. anket sonuçları) karşılaştırırken en nettir.\n2. **Güven bandı (confidence ribbon)** — bir çizgi grafiğinin etrafına, zamanla değişen belirsizliği gösteren yarı saydam bir şerit çizilir. Zaman serisi tahminlerinde (bir sonraki 6 ay gibi) standarttır — bant, geleceğe gittikçe genelde genişler.\n3. **Gradyan/olası sonuç grafiği** — tek bir çizgi yerine, olası birden çok yörüngeyi soluk çizgilerle veya yoğunluk gradyanıyla üst üste çizmek. \"Kesin bir gelecek yok, olası bir aralık var\" fikrini en güçlü ileten yöntemdir.",
              "At the previous stage you saw that stating uncertainty **in words** (\"±3%, n=1,240\") increases credibility. This lesson covers three common ways to draw uncertainty **visually**:\n\n1. **Error bars** — vertical lines added above/below a point estimate, showing its confidence interval. Clearest when comparing individual points (like survey results).\n2. **Confidence ribbon** — a semi-transparent band drawn around a line chart, showing uncertainty that changes over time. Standard for time-series forecasts (like the next 6 months) — the band usually widens further into the future.\n3. **Gradient / hypothetical outcome plot** — instead of one line, overlay several plausible trajectories as faint lines or a density gradient. The strongest way to convey \"there is no single certain future, only a plausible range\".",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir zaman serisi tahmininde (gelecek 6 ay), güven bandının zamanla genişlemesi neyi ifade eder?",
                "In a time-series forecast (the next 6 months), what does the confidence band widening over time express?",
              ],
              options: [
                [
                  "Tahmin ne kadar uzağa gidiyorsa belirsizlik o kadar artar — yakın gelecek uzak gelecekten daha güvenilir tahmin edilir",
                  "The further out the forecast reaches, the more uncertainty grows — the near future is estimated more reliably than the far future",
                ],
                ["Bir çizim hatasıdır, düzeltilmelidir", "It's a drawing error and should be fixed"],
                ["Veri miktarının azaldığını gösterir", "It shows the amount of data is decreasing"],
                ["Bandın genişlemesinin hiçbir anlamı yoktur", "The band widening has no meaning at all"],
              ],
              answer: 0,
              explain: [
                "Bir tahmin modeli ne kadar ileriye gidiyorsa, dayandığı varsayımlar o kadar kırılgan hâle gelir; bu yüzden güven bandı genelde huni şeklinde genişler. Bandın genişlemesi bir hata değil, dürüst bir belirsizlik gösterimidir.",
                "The further a forecast model projects, the shakier its underlying assumptions become — which is why the confidence band typically widens into a funnel. The widening band isn't a mistake, it's an honest depiction of uncertainty.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Tekil anket sonuçlarını (ör. 5 farklı şehrin memnuniyet skoru) karşılaştırırken hangi belirsizlik gösterimi en nettir?",
                "When comparing individual survey results (e.g. satisfaction scores from 5 different cities), which uncertainty display is clearest?",
              ],
              options: [
                ["Hata çubukları — her nokta tahmininin kendi güven aralığını gösterir", "Error bars — each point estimate shows its own confidence interval"],
                ["Güven bandı — yalnızca zaman serilerinde anlamlıdır", "A confidence ribbon — only meaningful for time series"],
                ["Hiçbiri, tekil sonuçlarda belirsizlik gösterilmez", "None — uncertainty isn't shown for individual results"],
                ["Yalnızca 3B grafikler belirsizlik gösterebilir", "Only 3D charts can show uncertainty"],
              ],
              answer: 0,
              explain: [
                "Güven bandı bir çizginin (zaman ekseni boyunca değişen bir büyüklüğün) etrafını sarar; ayrı ayrı noktalarda (5 şehir) bu kavram uygulanamaz. Hata çubukları her noktaya kendi belirsizliğini ekler ve nokta karşılaştırmalarında standart yöntemdir.",
                "A confidence ribbon wraps around a line — a quantity that varies along a time axis; the concept doesn't apply to separate points (5 cities). Error bars attach uncertainty to each point individually and are the standard method for comparing points.",
              ],
            }),
            tip(
              "Belirsizlik göstermek okuru boğmak zorunda değil",
              "Showing uncertainty doesn't have to overwhelm the reader",
              "Her sayının yanına istatistiksel jargon dolu bir açıklama koymak gerekmez. Bir hata çubuğu veya soluk bir bant, çoğu izleyiciye 'bu sayı kesin değil, bir aralık içinde' mesajını görsel olarak, hiç metin okumadan verir. Görsel, sözlü açıklamanın yükünü hafifletir.",
              "You don't need to attach a jargon-heavy explanation to every number. An error bar or a faint band tells most viewers \"this number isn't exact, it sits within a range\" visually, without reading a word of text. The visual carries the load the verbal explanation would otherwise need to.",
            ),
          ],
        }),
        lesson({
          slug: "kademeli-acigacikarma-tooltip-drilldown",
          title: L(
            "Kademeli açığa çıkarma: tooltip ve drill-down tasarımı",
            "Progressive disclosure: designing tooltips and drill-down",
          ),
          summary: L(
            "Her şeyi tek ekranda göstermeye çalışmak yerine, izleyicinin merak ettiğini sorduğunda cevap vermek.",
            "Instead of trying to show everything on one screen, answer the viewer's question only when they ask it.",
          ),
          minutes: 14,
          premium: true,
          blocks: [
            text(
              "İyi bir gösterge panosu tasarımının zor kısmı, neyin **ana görünümde**, neyin **isteğe bağlı ayrıntıda** olacağına karar vermektir. Her sayıyı ekrana basmaya çalışan bir pano kalabalıklaşır ve asıl mesajı boğar. **Kademeli açığa çıkarma (progressive disclosure)** ilkesi şunu söyler: ana görünümde yalnızca **özeti** göster, ayrıntıyı yalnızca izleyici onu istediğinde (üzerine gelince, tıklayınca) ver.\n\nBunun iki temel aracı vardır:\n\n- **Tooltip (ipucu)** — fareyle bir noktanın üzerine gelince, o noktaya özel ek bilgi görünür. Ana görünümü hiç kirletmez.\n- **Drill-down** — bir kategoriye tıklayınca, o kategorinin alt kırılımına inersin (Bölge → Şehir → Mağaza gibi). İzleyici yalnızca merak ettiği dalı açar, diğerleri kapalı kalır.",
              "The hard part of good dashboard design is deciding what belongs in the **main view** and what belongs in **optional detail**. A dashboard that tries to print every number becomes cluttered and drowns out the main message. The **progressive disclosure** principle says: show only the **summary** in the main view, and reveal detail only when the viewer asks for it (by hovering, by clicking).\n\nIt has two main tools:\n\n- **Tooltip** — hovering over a point reveals extra information specific to that point. It never clutters the main view.\n- **Drill-down** — clicking a category descends into its sub-breakdown (Region → City → Store). The viewer opens only the branch they're curious about; the rest stays collapsed.",
            ),
            quiz({
              id: "q1",
              q: [
                "Kademeli açığa çıkarma (progressive disclosure) ilkesinin temel fikri nedir?",
                "What's the core idea behind the progressive disclosure principle?",
              ],
              options: [
                [
                  "Ana görünümde yalnızca özeti göster, ayrıntıyı yalnızca izleyici isteyince (hover/tıklama ile) ortaya çıkar",
                  "Show only the summary in the main view; reveal detail only when the viewer asks for it, via hover/click",
                ],
                ["Tüm sayıları tek ekranda, mümkün olduğunca küçük yazıyla sığdırmak", "Fit all numbers on one screen, in as small a font as possible"],
                ["Her grafiği animasyonla art arda oynatmak", "Play every chart in sequence with animation"],
                ["Yalnızca yöneticilere ayrıntı göstermek, diğer kullanıcılara özet vermek", "Show detail only to executives, and only summary to other users"],
              ],
              answer: 0,
              explain: [
                "İlke, bilgiyi gizlemek değil, doğru sırada sunmaktır: önce özet (herkesin ihtiyacı), sonra ayrıntı (yalnızca merak edenin talebiyle). Bu, ana görünümü sade tutarken ayrıntıyı kaybetmez.",
                "The principle isn't about hiding information, it's about sequencing it correctly: summary first (what everyone needs), then detail (only on request from someone curious). This keeps the main view clean without losing the detail.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Bir tooltip ile bir drill-down arasındaki temel fark nedir?",
                "What's the core difference between a tooltip and a drill-down?",
              ],
              options: [
                [
                  "Tooltip geçicidir ve ana görünümü değiştirmez; drill-down görünümün kendisini alt kırılıma indirir",
                  "A tooltip is transient and doesn't change the main view; a drill-down descends the view itself into a sub-breakdown",
                ],
                ["İkisi birebir aynı etkileşimdir", "They're exactly the same interaction"],
                ["Tooltip yalnızca metinde, drill-down yalnızca sayılarda çalışır", "Tooltips only work on text, drill-downs only on numbers"],
                ["Drill-down fare gerektirmez, yalnızca klavye kullanır", "Drill-down requires no mouse, only keyboard"],
              ],
              answer: 0,
              explain: [
                "Tooltip fareyi çektiğin anda kaybolur, altındaki görünüm hiç değişmez. Drill-down ise görünümün kendisini kalıcı olarak değiştirir — geri dönene kadar o alt kırılımda kalırsın.",
                "A tooltip disappears the moment you move the mouse away; the view underneath never changes. A drill-down permanently changes the view itself — you stay in that sub-breakdown until you navigate back.",
              ],
            }),
            pitfall(
              "Tooltip'e ana görünümde olması gereken bir bilgiyi saklama",
              "Don't hide information in a tooltip that belongs in the main view",
              "Kademeli açığa çıkarma, kritik bir sayıyı gizlemek için bahane olmamalı. Bir karar için gereken bilgi (ör. bu ayın hedefe göre durumu) tooltip'te değil, doğrudan görünür olmalı — tooltip yalnızca 'merak edilirse iyi olur' türü destekleyici bilgi içindir.",
              "Progressive disclosure shouldn't become an excuse to bury a critical number. Information needed to make a decision (like this month's status against target) belongs directly in view, not in a tooltip — tooltips are only for supporting \"nice to know if curious\" information.",
            ),
          ],
        }),
      ],
    },
  ],
};
