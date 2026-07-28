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
            text(
              "Bir grafik yapmadan önce cevaplaman gereken tek soru şudur: **bu grafik hangi soruyu yanıtlıyor?**\n\nCevap \"satışları göstermek\" ise grafik muhtemelen işe yaramayacaktır. İyi cevaplar somuttur:\n\n- \"Hangi bölge hedefin altında kaldı?\"\n- \"Ciro artışı mevsimsel mi, gerçek büyüme mi?\"\n- \"Fiyat artışı sonrası müşteri kaybı hızlandı mı?\"\n\nSoru netleştiğinde grafik türü çoğu zaman kendiliğinden belli olur. Soru belirsizse hiçbir grafik türü kurtarmaz.",
              "There is one question to answer before making any chart: **which question does this chart answer?**\n\nIf the answer is \"to show sales\", the chart will probably be useless. Good answers are specific:\n\n- \"Which region fell short of target?\"\n- \"Is the revenue rise seasonal or real growth?\"\n- \"Did churn accelerate after the price increase?\"\n\nOnce the question is sharp, the chart type usually becomes obvious. If the question is vague, no chart type will save it.",
            ),
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
            pitfall(
              "Pasta grafiğinin sorunu",
              "The trouble with pie charts",
              "İnsan gözü **uzunlukları** çok iyi, **açıları** kötü karşılaştırır. Bir pasta grafiğinde %23 ile %26 dilimini ayırt etmek neredeyse imkânsızdır; aynı iki değer sütun grafiğinde bir bakışta ayrılır.\n\nBuna bir de çoğu pasta grafiğinin 6-8 dilim içermesi eklenince grafik tamamen okunmaz olur. Kural: **iki veya üç dilimden fazlaysa sütun grafiği kullan.** Sıralı bir çubuk grafiği hem payları hem sıralamayı aynı anda gösterir.\n\n3B pasta grafiği ise perspektif yüzünden dilim boyutlarını fiilen çarpıtır — hiçbir durumda kullanılmamalıdır.",
              "The human eye compares **lengths** very well and **angles** badly. Telling a 23% slice from a 26% slice in a pie chart is nearly impossible; the same two values separate at a glance in a column chart.\n\nAdd the fact that most pie charts carry six to eight slices and the chart becomes unreadable. The rule: **more than two or three slices means use a bar chart.** A sorted bar chart shows both the shares and the ranking at once.\n\nA 3D pie chart actively distorts slice sizes through perspective — it should never be used.",
            ),
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
            tip(
              "Ön-dikkatsel özellikler",
              "Pre-attentive attributes",
              "Bazı görsel farkları beyin **bilinçli bakmadan**, saniyenin onda birinde algılar: renk, boyut, yönelim, kalınlık, kapalılık, konum. Bunlara **ön-dikkatsel (pre-attentive) özellikler** denir.\n\nBu, tasarımda çok güçlü bir araçtır: 40 çubuğun içinde tek bir çubuğu farklı renge boyarsan, okuyucu grafiğe bakar bakmaz onu görür — okumasına gerek kalmaz.\n\nAma yalnızca **az kullanıldığında** çalışır. Her şey renkliyse, hiçbir şey öne çıkmaz. Kural: bir grafikte en fazla **bir** ön-dikkatsel vurgu kullan ve onu izleyicinin görmesini istediğin şeye ayır.",
              "Some visual differences are registered by the brain **without conscious attention**, in about a tenth of a second: colour, size, orientation, thickness, enclosure, position. These are called **pre-attentive attributes**.\n\nThis is a powerful design tool: colour one bar among forty differently and the reader sees it the moment they look — no reading required.\n\nBut it works only when used **sparingly**. If everything is coloured, nothing stands out. The rule: use at most **one** pre-attentive emphasis per chart, and spend it on the thing you want the viewer to see.",
            ),
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
            pitfall(
              "Alan iki kez sayılır",
              "Area counts twice",
              "Bir daireyi \"iki katı\" göstermek için yarıçapı iki katına çıkarırsan alan **dört katına** çıkar ve okuyucu farkı abartılı algılar. Baloncuk grafiklerinde daima **alanı** değerle orantıla, yarıçapı değil. Çoğu kütüphane bunu doğru yapar, ama elle ölçek verdiğinde tuzak burada.",
              "Doubling a circle's radius to show \"twice as much\" quadruples the **area**, and readers see an exaggerated difference. In bubble charts always scale the **area** to the value, never the radius. Most libraries get this right; the trap appears when you set the scale by hand.",
            ),
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
            text(
              "**Grafik başlığı bir etiket değil, bir cümle olmalıdır.**\n\n- Zayıf: *\"Aylık Satışlar\"*\n- Güçlü: *\"Satışlar Mart'tan beri %18 arttı, büyümenin tamamı Elektronik'ten geliyor\"*\n\nBaşlık bulguyu söylerse okuyucu grafiği doğrulamak için bakar; söylemezse ne arayacağını bilemez ve kendi sonucunu üretir.",
              "**A chart title should be a sentence, not a label.**\n\n- Weak: *\"Monthly Sales\"*\n- Strong: *\"Sales are up 18% since March, and all of the growth is Electronics\"*\n\nWhen the title states the finding, the reader looks at the chart to verify it. When it does not, they do not know what to look for and invent their own conclusion.",
            ),
            info(
              "Veri–mürekkep oranı",
              "The data–ink ratio",
              "Edward Tufte'nin ilkesi: her damla mürekkep veriyi göstermeli. Gereksiz ızgara çizgileri, kenarlıklar, gölgeler, 3B efektler ve arka plan dokuları silinmeli. Bir grafikten çıkarabileceğin her öğeyi çıkar — geriye kalan mesajdır. \"3B pasta grafiği\" bu ilkenin tam tersidir ve verinin okunmasını fiilen imkânsız kılar.",
              "Tufte's principle: every drop of ink should show data. Remove needless gridlines, borders, shadows, 3D effects and background textures. Strip out everything a chart can survive without — what remains is the message. A \"3D pie chart\" is the exact opposite and makes the data effectively unreadable.",
            ),
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
            text(
              "**Grafikle yanıltmanın yaygın yolları** — bunları kendinde de kontrol et:\n\n- Çubuk grafikte ekseni sıfırdan başlatmamak (farkı abartır)\n- Kiraz toplamak: yalnızca iddiayı destekleyen dönemi göstermek\n- Ölçek değiştirmek: iki eksenli grafikle sahte korelasyon üretmek\n- Küçük örneklemi yüzdeyle sunmak (\"%50 arttı\" = 2 kişiden 3 kişiye)\n- Toplam yerine oran, oran yerine toplam göstererek hikâyeyi seçmek",
              "**Common ways charts mislead** — audit yourself for these too:\n\n- Not starting a bar chart's axis at zero (exaggerates the difference)\n- Cherry-picking: showing only the period that supports the claim\n- Rescaling: manufacturing fake correlation with a dual axis\n- Reporting a tiny sample as a percentage (\"up 50%\" = from 2 people to 3)\n- Choosing totals over rates, or rates over totals, to pick the story you want",
            ),
            tip(
              "Belirsizliği göstermek zayıflık değildir",
              "Showing uncertainty is not weakness",
              "Tahminlerine güven aralığı, örneklem büyüklüğü ve varsayımlarını eklemek seni daha az değil **daha güvenilir** yapar. \"Ciro %12 arttı\" yerine \"Ciro %12 arttı (±%3, n=1.240, Ocak–Haziran)\" diyen analistin sonraki analizine de güvenilir. Kesin konuşup sonra yanılmak, en pahalı itibar kaybıdır.",
              "Attaching confidence intervals, sample sizes and assumptions makes you **more** credible, not less. An analyst who says \"revenue is up 12% (±3%, n=1,240, Jan–Jun)\" instead of just \"up 12%\" gets trusted on the next analysis too. Speaking with certainty and being wrong is the most expensive reputational hit there is.",
            ),
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
            info(
              "Sıfırdan başlamak ne zaman zorunlu?",
              "When must the axis start at zero?",
              "Bu, veri görselleştirmenin en çok tartışılan kuralıdır ve doğru cevap grafik türüne bağlıdır:\n\n**Sütun/çubuk grafiğinde zorunludur.** Çünkü çubuğun **uzunluğu** değeri kodlar; sıfırdan başlamayan bir çubuk fiilen yanlış bir uzunluk gösterir.\n\n**Çizgi grafiğinde zorunlu değildir.** Çizgide anlam **eğimde**dir, mutlak uzunlukta değil. Vücut sıcaklığını 0°C'den başlatmak grafiği okunmaz kılar — 36-40 aralığı doğru seçimdir.\n\nAma çizgide de eksen aralığını **dürüstçe** seçmelisin: veriyi rahat gösteren en dar aralık uygundur, dramatize eden aşırı dar aralık değil. Şüphedeysen ekseni açıkça etiketle.",
              "This is data visualisation's most argued rule, and the right answer depends on the chart type:\n\n**It is mandatory for bar charts.** The bar's **length** encodes the value, so a bar not starting at zero literally shows a wrong length.\n\n**It is not mandatory for line charts.** In a line the meaning lives in the **slope**, not in absolute length. Starting body temperature at 0°C makes the chart unreadable — 36 to 40 is the right range.\n\nBut even on a line you must choose the range **honestly**: the narrowest range that shows the data comfortably is fine; an extremely narrow one that dramatises is not. When in doubt, label the axis explicitly.",
            ),
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
            text(
              "**Renk körlüğünün ötesinde erişilebilirlik:**\n\n- **Alternatif metin** — Her grafiğin, ekran okuyucunun okuyabileceği bir açıklaması olmalı. \"Grafik\" değil; \"2024'te ciro her çeyrek arttı, en büyük sıçrama üçüncü çeyrekte\" gibi **sonucu anlatan** bir metin.\n- **Veri tablosu alternatifi** — Karmaşık bir görselin altında ham sayıları da sun.\n- **Yazı boyutu** — Sunum ekranında 18 punto altı okunmaz. Grafiği yapacağın ortamı düşün.\n- **Hareket ve animasyon** — Otomatik oynayan animasyonlar bazı kullanıcılar için rahatsız edicidir; durdurma imkânı ver.\n\nErişilebilirlik ek bir iş gibi görünür ama sonuç neredeyse her zaman **herkes için daha okunur** bir grafiktir. Renk körü dostu bir palet, normal görenler için de daha nettir.",
              "**Accessibility beyond colour blindness:**\n\n- **Alt text** — every chart needs a description a screen reader can read out. Not \"chart\", but something that states the **conclusion**: \"revenue rose every quarter in 2024, with the largest jump in Q3\".\n- **A data table alternative** — offer the raw numbers beneath a complex visual.\n- **Font size** — anything under 18pt is unreadable on a presentation screen. Design for where the chart will be seen.\n- **Motion and animation** — auto-playing animation is distressing for some users; provide a way to stop it.\n\nAccessibility looks like extra work, but the result is almost always a chart that is **more readable for everyone**. A colour-blind-safe palette is clearer for people with normal vision too.",
            ),
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
            tip(
              "Başlık grafiğin en önemli parçasıdır",
              "The title is the most important part of a chart",
              "Çoğu grafiğin başlığı grafiğin **ne olduğunu** söyler: \"Aylık Ciro\". Bu boşa harcanmış bir satırdır — okuyucu eksene bakınca bunu zaten görüyor.\n\nİyi başlık grafiğin **ne söylediğini** yazar: \"Ciro üçüncü çeyrekte %18 arttı, sürükleyici Anadolu bayileri.\"\n\nBuna \"sonuç başlığı\" denir ve tek başına raporun anlaşılma oranını ciddi biçimde artırır. Okuyucunun grafiği yorumlamasını bekleme — yorumu sen yaz, grafik kanıt olsun.",
              "Most chart titles state what the chart **is**: \"Monthly Revenue\". That is a wasted line — the reader sees it from the axis already.\n\nA good title states what the chart **says**: \"Revenue rose 18% in Q3, driven by regional dealers.\"\n\nThis is called a conclusion title, and on its own it substantially raises how much of a report gets understood. Do not wait for the reader to interpret the chart — write the interpretation and let the chart be the evidence.",
            ),
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
      ],
    },
  ],
};
