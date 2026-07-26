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
      id: "beginner",
      title: L("Başlangıç — Grafik dilbilgisi", "Beginner — The grammar of graphics"),
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
      id: "intermediate",
      title: L("Orta — Renk, metin ve düzen", "Intermediate — Colour, text and layout"),
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
      id: "advanced",
      title: L("İleri — Veriyle hikâye anlatımı", "Advanced — Storytelling with data"),
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
  ],
};
