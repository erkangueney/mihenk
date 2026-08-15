import type { Track } from "@/lib/types";
import { L, code, info, lesson, pitfall, pyTask, quiz, text, tip } from "../helpers";

export const statisticsTrack: Track = {
  slug: "istatistik",
  name: "İstatistik",
  category: "foundation",
  color: "#a78bfa",
  icon: "📐",
  tagline: L("Sayıların ardındaki akıl yürütme", "The reasoning behind the numbers"),
  description: L(
    "Araç öğrenmek kolaydır; sayının ne anlama geldiğini bilmek zordur. Bu patika betimleyici istatistikten hipotez testine ve A/B testine kadar analistin karar verirken dayandığı temeli kurar.",
    "Tools are easy to learn; knowing what a number means is hard. This track builds the foundation an analyst actually reasons with, from descriptive statistics to hypothesis testing and A/B tests.",
  ),
  levels: [
    {
      id: "foundation",
      title: L("Veriyi okumaya başlamak", "Learning to read data"),
      description: L(
        "Ölçek türleri, frekans dağılımı ve olasılığın sezgisi: her istatistik kavramının altındaki zemin.",
        "Scales of measurement, frequency distributions and the intuition of probability: the ground beneath every statistical idea.",
      ),
      lessons: [
        lesson({
          slug: "veri-turleri-ve-olcekler",
          title: L("Veri türleri ve ölçek düzeyleri", "Data types and scales of measurement"),
          summary: L(
            "Bir sütunun ortalamasını almak her zaman anlamlı mıdır? Cevap ölçek türünde saklı.",
            "Is averaging a column always meaningful? The answer lies in its scale.",
          ),
          minutes: 12,
          blocks: [
            text(
              "Her sütun aynı türden bilgi taşımaz ve bu, üzerinde hangi işlemi yapabileceğini belirler. Dört ölçek düzeyi vardır:\n\n- **Nominal** — yalnızca isim: şehir, cinsiyet, ürün kategorisi. Sıralanamaz. Anlamlı özet: **mod** ve **frekans**.\n- **Sıralı (ordinal)** — sırası var, ama aralıklar eşit değil: memnuniyet (kötü/orta/iyi), eğitim düzeyi. Anlamlı özet: **medyan**.\n- **Aralık (interval)** — aralıklar eşit, ama sıfır keyfî: sıcaklık (°C), takvim yılı. Fark alınır, oran alınamaz.\n- **Oran (ratio)** — gerçek sıfır var: fiyat, ağırlık, süre, adet. Her işlem geçerlidir.",
              "Not every column carries the same kind of information, and that decides what you may do with it. There are four scales:\n\n- **Nominal** — names only: city, gender, product category. Cannot be ordered. Meaningful summary: **mode** and **frequency**.\n- **Ordinal** — ordered, but the gaps are not equal: satisfaction (poor/fair/good), education level. Meaningful summary: **median**.\n- **Interval** — equal gaps, but zero is arbitrary: temperature (°C), calendar year. Differences work, ratios do not.\n- **Ratio** — a true zero exists: price, weight, duration, count. Every operation is valid.",
            ),
            quiz({
              id: "q2",
              q: [
                "\"Şehir\" sütunu hangi ölçek düzeyindedir?",
                "Which scale of measurement does a \"city\" column belong to?",
              ],
              options: [
                ["Nominal — yalnızca isim taşır, sıralanamaz", "Nominal — it only carries a name, it cannot be ordered"],
                ["Sıralı — büyükten küçüğe dizilebilir", "Ordinal — it can be ranked large to small"],
                ["Aralık — sıfırı keyfîdir", "Interval — its zero is arbitrary"],
                ["Oran — gerçek bir sıfırı vardır", "Ratio — it has a true zero"],
              ],
              answer: 0,
              explain: [
                "Şehir isimleri arasında doğal bir sıra yoktur; tek anlamlı özet mod (en sık geçen şehir) ve frekans tablosudur.",
                "There is no natural order among city names; the only meaningful summaries are the mode (the most frequent city) and a frequency table.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir yarışta sporcuların bitiriş sırası (1., 2., 3. ...) hangi ölçek düzeyindedir?",
                "A race's finishing order (1st, 2nd, 3rd ...) belongs to which scale?",
              ],
              options: [
                [
                  "Sıralı — sıra bilgisi var ama birinci ile ikinci arasındaki süre farkı, ikinci ile üçüncü arasındakiyle aynı olmak zorunda değil",
                  "Ordinal — the order is meaningful, but the time gap between 1st and 2nd need not equal the gap between 2nd and 3rd",
                ],
                ["Nominal — sadece etiket", "Nominal — just a label"],
                ["Aralık — eşit aralıklı", "Interval — equally spaced"],
                ["Oran — gerçek sıfırı var", "Ratio — has a true zero"],
              ],
              answer: 0,
              explain: [
                "Bitiş sırası bir sıralama taşır ama sıralar arası mesafe garanti edilmez; bu yüzden \"ortalama sıra\" gibi işlemler tartışmalıdır.",
                "The finishing order carries a ranking, but the distance between ranks is not guaranteed to be equal, which is why operations like \"average rank\" are contestable.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Sıcaklık (°C) neden bir oran (ratio) ölçeği değil, aralık (interval) ölçeğidir?",
                "Why is temperature (°C) an interval scale rather than a ratio scale?",
              ],
              options: [
                [
                  "0°C gerçek bir \"sıcaklık yokluğu\" değildir, keyfî bir referans noktasıdır",
                  "0°C is not a true \"absence of temperature\", it is an arbitrary reference point",
                ],
                ["Sıcaklık negatif olamaz", "Temperature cannot be negative"],
                ["Sıcaklık kategoriktir", "Temperature is categorical"],
                ["Sıcaklık sıralanamaz", "Temperature cannot be ordered"],
              ],
              answer: 0,
              explain: [
                "0°C, suyun donma noktası gibi keyfî bir seçimdir; bu yüzden \"40°C, 20°C'nin iki katı sıcaktır\" demek anlamsızdır — oysa fark almak (40°C, 20°C'den 20 derece daha sıcak) geçerlidir.",
                "0°C is an arbitrary choice like water's freezing point, so \"40°C is twice as hot as 20°C\" is meaningless — while taking a difference (40°C is 20 degrees hotter than 20°C) is valid.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Fiyat, ağırlık ve süre gibi değişkenlerin oran (ratio) ölçeğinde olmasının pratik sonucu nedir?",
                "What is the practical consequence of price, weight and duration being ratio-scale variables?",
              ],
              options: [
                [
                  "\"20 TL, 10 TL'nin iki katıdır\" gibi oran ifadeleri geçerlidir çünkü gerçek bir sıfır vardır",
                  "Ratio statements like \"20 lira is twice 10 lira\" are valid because a true zero exists",
                ],
                ["Ortalaması hiçbir zaman alınamaz", "Its mean can never be computed"],
                ["Yalnızca mod anlamlıdır", "Only the mode is meaningful"],
                ["Sıralanamaz", "It cannot be ordered"],
              ],
              answer: 0,
              explain: [
                "Oran ölçeğinde sıfır gerçekten \"yokluk\" demektir (0 TL = para yok), bu yüzden toplama, çıkarma, çarpma ve oran alma dahil her işlem anlamlıdır.",
                "On a ratio scale, zero genuinely means \"absence\" (0 lira = no money), so every operation — addition, subtraction, multiplication and taking ratios — is meaningful.",
              ],
            }),
            pitfall(
              "Sayı görünen her şey sayı değildir",
              "Not everything that looks numeric is a number",
              "Posta kodu, müşteri numarası ve anket kodları veritabanında tam sayı olarak durur ama **nominal**dir. \"Ortalama posta kodu 34521\" cümlesi anlamsızdır.\n\nAynı tuzak sıralı ölçekte de vardır: memnuniyeti 1-5 arası kodlarsan ortalaması 3,7 çıkar — ama \"iyi\" ile \"çok iyi\" arasındaki mesafenin \"kötü\" ile \"orta\" arasındakiyle aynı olduğunu kimse garanti etmedi. Bu yüzden anket sonuçlarında medyan ve dağılım, ortalamadan daha dürüst bir özettir.",
              "Postcodes, customer numbers and survey codes sit in the database as integers but are **nominal**. \"The average postcode is 34521\" is a meaningless sentence.\n\nThe same trap exists on ordinal scales: code satisfaction 1-5 and the mean comes out at 3.7 — but nobody guaranteed the distance between \"good\" and \"very good\" equals the one between \"poor\" and \"fair\". This is why the median and the distribution are a more honest summary of survey results than the mean.",
            ),
            quiz({
              id: "q6",
              q: [
                "Posta kodu bir veritabanında tam sayı olarak saklanır. \"Ortalama posta kodu 34521\" cümlesi neden anlamsızdır?",
                "A postcode is stored as an integer in the database. Why is \"the average postcode is 34521\" a meaningless sentence?",
              ],
              options: [
                [
                  "Posta kodu sayı gibi görünse de nominaldir; sayısal işlemler değil yalnızca mod/frekans anlamlıdır",
                  "A postcode looks numeric but is nominal; numeric operations are not meaningful, only mode/frequency are",
                ],
                ["Posta kodları çok büyük sayılardır", "Postcodes are just very large numbers"],
                ["Ortalama her zaman yanlış hesaplanır", "The mean is always calculated incorrectly"],
                ["Posta kodları negatif olamaz", "Postcodes cannot be negative"],
              ],
              answer: 0,
              explain: [
                "Veritabanındaki veri tipi (integer) ile ölçek düzeyi (nominal) farklı şeylerdir; bir sütunun hangi işlemi kaldırdığına veri tipi değil ölçek düzeyi karar verir.",
                "The database data type (integer) and the scale of measurement (nominal) are different things; it is the scale, not the data type, that decides which operations a column can bear.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Nominal veri için hangi özetler anlamlıdır?",
                "Which summaries are meaningful for nominal data?",
              ],
              options: [
                ["Mod ve frekans tablosu", "The mode and a frequency table"],
                ["Ortalama ve standart sapma", "The mean and the standard deviation"],
                ["Medyan ve çeyrekler açıklığı", "The median and the interquartile range"],
                ["Z-skoru", "The z-score"],
              ],
              answer: 0,
              explain: [
                "Nominal veride bir sıralama ya da mesafe kavramı olmadığı için yalnızca \"hangi kategori en sık görülüyor\" (mod) ve \"her kategoriden kaç tane var\" (frekans) anlamlıdır.",
                "Nominal data has no notion of order or distance, so only \"which category is most common\" (the mode) and \"how many of each category\" (frequency) are meaningful.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Memnuniyeti 1-5 arası kodlayan bir ankette ortalama 3,7 çıktı. Bu sayıyı raporlarken en dürüst yaklaşım nedir?",
                "A satisfaction survey coded 1-5 gives a mean of 3.7. What is the most honest way to report this?",
              ],
              options: [
                [
                  "Ortalamanın yanında medyanı ve her seçeneğin yüzdesini de vermek",
                  "Report the median and the per-option percentages alongside the mean",
                ],
                ["Yalnızca ortalamayı raporlamak yeterlidir", "Reporting the mean alone is enough"],
                ["Ortalamayı en yakın tam sayıya yuvarlayıp raporlamak", "Round the mean to the nearest integer and report that"],
                ["Ortalamayı hiç hesaplamamak gerekir", "The mean should never be computed at all"],
              ],
              answer: 0,
              explain: [
                "Ortalama, aralıkların eşit olduğunu varsayar; bu varsayım sıralı veride garanti değildir. Medyan ve yüzdeler bu varsayıma ihtiyaç duymadan aynı veriyi daha dürüst anlatır.",
                "The mean assumes the gaps are equal, an assumption ordinal data does not guarantee. The median and the percentages tell the same story more honestly, without needing that assumption.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Bir müşteri memnuniyet anketinde cevaplar 1-5 arası kodlanmış. Hangi özet en güvenlidir?",
                "In a customer satisfaction survey the answers are coded 1-5. Which summary is safest?",
              ],
              options: [
                [
                  "Medyan ve her seçeneğin yüzdesi — ölçek sıralı olduğu için",
                  "The median and the percentage per option — because the scale is ordinal",
                ],
                ["Yalnızca ortalama", "The mean alone"],
                ["Standart sapma", "The standard deviation"],
                ["Toplam", "The sum"],
              ],
              answer: 0,
              explain: [
                "Sıralı ölçekte aralıkların eşit olduğu varsayılamaz, bu yüzden ortalama tartışmalıdır. Medyan sıralamaya saygı duyar; seçenek yüzdeleri ise \"kaç kişi çok memnun\" gibi asıl karar verilecek soruyu doğrudan yanıtlar.",
                "On an ordinal scale you cannot assume the gaps are equal, so the mean is contestable. The median respects the ordering, and the per-option percentages answer the question you will actually decide on — such as \"how many are very satisfied\".",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "\"Takvim yılı\" (2020, 2021, 2022...) hangi ölçek düzeyindedir?",
                "Which scale of measurement does \"calendar year\" (2020, 2021, 2022...) belong to?",
              ],
              options: [
                [
                  "Aralık — yıllar arasındaki fark anlamlıdır ama \"yıl 0\" gerçek bir yokluk değildir",
                  "Interval — the gap between years is meaningful, but \"year 0\" is not a true absence",
                ],
                ["Oran — takvim yılının gerçek sıfırı vardır", "Ratio — calendar year has a true zero"],
                ["Nominal — yıllar sadece etikettir", "Nominal — years are just labels"],
                ["Sıralı — yıllar arası mesafe belirsizdir", "Ordinal — the gap between years is undefined"],
              ],
              answer: 0,
              explain: [
                "2020 ile 2010 arasındaki 10 yıllık fark anlamlıdır, ama takvimin sıfır noktası keyfîdir; bu yüzden \"2020, 1010'un iki katı bir yıldır\" demek anlamsızdır — tıpkı sıcaklıkta olduğu gibi.",
                "The 10-year gap between 2020 and 2010 is meaningful, but the calendar's zero point is arbitrary, so \"2020 is twice the year 1010\" is meaningless — just like with temperature.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir e-ticaret veri setinde \"sipariş tutarı\" (0 TL dahil) sütunu için hangi ifade doğrudur?",
                "In an e-commerce dataset, for the \"order amount\" column (0 included), which statement is correct?",
              ],
              options: [
                [
                  "Oran ölçeğidir; 0 TL gerçekten \"hiç harcama yok\" demektir, bu yüzden \"200 TL, 100 TL'nin iki katıdır\" geçerlidir",
                  "It is a ratio scale; 0 lira genuinely means \"no spending at all\", so \"200 lira is twice 100 lira\" is valid",
                ],
                ["Aralık ölçeğidir, çünkü 0 keyfîdir", "It is an interval scale because 0 is arbitrary"],
                ["Nominal ölçeğidir, çünkü fiyat bir kategoridir", "It is nominal because price is a category"],
                ["Sıralı ölçeğidir, çünkü tutarlar sıralanabilir", "It is ordinal because amounts can be ranked"],
              ],
              answer: 0,
              explain: [
                "Para tutarlarında 0, gerçek bir yokluğu temsil eder — sıcaklık veya takvim yılındaki keyfî sıfırdan farklıdır. Bu yüzden fiyat, ağırlık, süre gibi değişkenlerde oran ifadeleri güvenle kurulabilir.",
                "For monetary amounts, 0 represents a true absence — unlike the arbitrary zero of temperature or calendar year. This is why ratio statements can safely be made about price, weight or duration.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "frekans-ve-histogram",
          title: L("Frekans dağılımı ve histogram", "Frequency distributions and histograms"),
          summary: L(
            "Tek bir sayı yerine tüm şekli gör: veri nasıl yayılmış?",
            "See the whole shape instead of a single number: how is the data spread?",
          ),
          minutes: 14,
          blocks: [
            text(
              "**Frekans dağılımı**, her değerin kaç kez göründüğünü sayar. Kategorik veride bu doğrudan bir tablodur; sürekli veride önce değerleri **aralıklara (bin)** böler, sonra sayarsın. Grafiği **histogram**dır.\n\nHistogram, ortalamanın asla söyleyemeyeceği şeyleri anlatır:\n\n- Dağılım **tek tepeli mi, çok tepeli mi**? İki tepe genellikle veride iki farklı grup olduğunu gösterir.\n- **Simetrik mi, çarpık mı**?\n- **Aykırı değer** var mı, uçlarda tek tük noktalar duruyor mu?",
              "A **frequency distribution** counts how many times each value appears. For categorical data that is simply a table; for continuous data you first split values into **bins**, then count. Its chart is the **histogram**.\n\nA histogram tells you things a mean never can:\n\n- Is the distribution **unimodal or multimodal**? Two peaks usually mean two different groups sit inside the data.\n- Is it **symmetric or skewed**?\n- Are there **outliers**, lonely points out at the edges?",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir histogramda iki ayrı tepe (iki mod) görülüyor. Bu genellikle neyi gösterir?",
                "A histogram shows two separate peaks (bimodal). What does this usually indicate?",
              ],
              options: [
                [
                  "Veride muhtemelen iki farklı grup birbirine karışmış",
                  "The data likely mixes two different underlying groups",
                ],
                ["Veri toplama hatası yapılmıştır", "A data collection error was made"],
                ["Aralık sayısı yanlış seçilmiştir", "The wrong bin count was chosen"],
                ["Değişken nominaldir", "The variable is nominal"],
              ],
              answer: 0,
              explain: [
                "İki tepe, genellikle tek bir sütunun içinde birbirinden farklı davranan iki alt popülasyon olduğunu gösterir — örneğin yeni ve eski kullanıcıların oturum süreleri birlikte histograma dökülmüş olabilir.",
                "Two peaks usually mean two subpopulations with different behaviour are mixed into a single column — for example, new and returning users' session times plotted together.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Sürekli bir değişkenin (örneğin oturum süresi) histogramını çizmeden önce ne yapman gerekir?",
                "Before drawing a histogram of a continuous variable (e.g. session duration), what must you do first?",
              ],
              options: [
                ["Değerleri aralıklara (bin) bölmek", "Split the values into bins"],
                ["Değerleri sıralamak", "Sort the values"],
                ["Ortalamayı hesaplamak", "Compute the mean"],
                ["Aykırı değerleri silmek", "Delete the outliers"],
              ],
              answer: 0,
              explain: [
                "Sürekli veride her değer neredeyse benzersizdir, bu yüzden doğrudan sayım yapmak anlamsızdır; önce değer aralığını eşit parçalara (bin) bölüp her parçaya kaç gözlem düştüğünü sayarsın.",
                "In continuous data almost every value is unique, so counting directly is meaningless; you first split the range into equal bins and then count how many observations fall in each.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Kategorik bir sütun (örneğin ürün kategorisi) için frekans dağılımı doğrudan nedir?",
                "For a categorical column (e.g. product category), what is the frequency distribution directly?",
              ],
              options: [
                ["Her kategorinin kaç kez göründüğünü gösteren bir tablo", "A table showing how many times each category appears"],
                ["Bir histogram", "A histogram"],
                ["Bir standart sapma değeri", "A standard deviation value"],
                ["Bir çeyrekler açıklığı", "An interquartile range"],
              ],
              answer: 0,
              explain: [
                "Kategorik veride binleme gerekmez; her kategori zaten kendi başına bir grup olduğu için sayım doğrudan bir tablo verir.",
                "Categorical data needs no binning; since each category is already its own group, counting directly produces a table.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Bir histogramın sağa doğru uzun bir kuyruğu var, tepe noktası solda toplanmış. Bu şekil ne anlama gelir?",
                "A histogram has a long tail stretching to the right, with the peak bunched on the left. What does this shape mean?",
              ],
              options: [
                ["Dağılım sağa çarpık (asimetrik)", "The distribution is right-skewed (asymmetric)"],
                ["Dağılım simetriktir", "The distribution is symmetric"],
                ["Veri nominaldir", "The data is nominal"],
                ["Aralık sayısı çok azdır", "The bin count is too low"],
              ],
              answer: 0,
              explain: [
                "Histogram sadece tepe sayısını değil şeklin simetrisini de gösterir; uzun bir kuyruk şeklin çarpık olduğuna işaret eder — bu, ortalamanın tek başına yeterli olmayacağının erken bir sinyalidir.",
                "A histogram reveals not just the number of peaks but the symmetry of the shape too; a long tail signals a skewed distribution — an early sign the mean alone will not be enough.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Histogramın sağ ucunda, ana kütleden kopuk tek tük çubuklar görüyorsun. Bunlar muhtemelen nedir?",
                "At the far right edge of a histogram you see a few isolated bars, disconnected from the main body. What are these likely to be?",
              ],
              options: [
                ["Aykırı değerler", "Outliers"],
                ["Yanlış hesaplanmış aralıklar", "Incorrectly computed bins"],
                ["Nominal kategoriler", "Nominal categories"],
                ["Medyan noktaları", "Median points"],
              ],
              answer: 0,
              explain: [
                "Ana kütleden uzakta, tek tük duran noktalar aykırı değerdir; histogram bunları ortalamadan çok daha net gösterir çünkü şekli gözle görürsün.",
                "Lonely points sitting far from the main body are outliers; a histogram exposes them far more clearly than a mean would, because you can see the shape directly.",
              ],
            }),
            info(
              "Aralık sayısı sonucu değiştirir",
              "The bin count changes the story",
              "Histogramda kaç aralık kullandığın, gördüğün şekli belirler. Çok az aralık ayrıntıyı yok eder (her şey tek tepe görünür); çok fazla aralık gürültüyü tepe sanmana yol açar.\n\nPratik başlangıç: **Sturges kuralı** ile `1 + log2(n)` veya karekök kuralı ile `√n` aralık. Ama asıl doğru yaklaşım birkaç farklı aralık sayısını deneyip şeklin **kararlı** olup olmadığına bakmaktır. Bir tepe yalnızca tek bir aralık sayısında görünüyorsa, muhtemelen gerçek değildir.",
              "How many bins you use decides the shape you see. Too few bins destroy detail (everything looks unimodal); too many make you mistake noise for peaks.\n\nA practical start: **Sturges' rule**, `1 + log2(n)` bins, or the square-root rule, `√n`. But the truly correct approach is to try several bin counts and check whether the shape is **stable**. A peak that appears at only one bin count is probably not real.",
            ),
            quiz({
              id: "q6",
              q: [
                "Bir histogramda çok az aralık (bin) kullanırsan ne olur?",
                "What happens if you use too few bins in a histogram?",
              ],
              options: [
                ["Ayrıntı kaybolur, dağılım her zaman tek tepeli görünür", "Detail is lost, and the distribution always looks unimodal"],
                ["Gürültü tepe sanılır", "You mistake noise for peaks"],
                ["Aykırı değerler daha görünür olur", "Outliers become more visible"],
                ["Hiçbir şey değişmez", "Nothing changes"],
              ],
              answer: 0,
              explain: [
                "Çok az aralık, birçok farklı değeri aynı kutuya sıkıştırır; bu da gerçekte var olan iki tepe gibi ince ayrıntıları yok ederek her şeyi tek bir yığın gibi gösterir.",
                "Too few bins cram many distinct values into the same box, destroying fine detail — such as a real second peak — and making everything look like a single lump.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Çok fazla aralık kullanmanın riski nedir?",
                "What is the risk of using too many bins?",
              ],
              options: [
                ["Rastgele gürültüyü gerçek bir tepe sanabilirsin", "You may mistake random noise for a real peak"],
                ["Aykırı değerler kaybolur", "Outliers disappear"],
                ["Dağılım her zaman simetrik görünür", "The distribution always looks symmetric"],
                ["Veri kategorik hâle gelir", "The data becomes categorical"],
              ],
              answer: 0,
              explain: [
                "Her aralık az sayıda gözlem içerdiğinde rastgele dalgalanmalar bile küçük tepecikler gibi görünür; bu tepecikler örneklem değişse kaybolur, gerçek değildir.",
                "When each bin holds very few observations, random fluctuation can look like small peaks; those bumps vanish with a different sample, so they are not real.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Sturges kuralına göre aralık sayısı nasıl hesaplanır?",
                "How does Sturges' rule compute the number of bins?",
              ],
              options: [
                ["`1 + log2(n)`", "`1 + log2(n)`"],
                ["`√n`", "`√n`"],
                ["`n / 10`", "`n / 10`"],
                ["Her zaman 10 aralık", "Always 10 bins"],
              ],
              answer: 0,
              explain: [
                "Sturges kuralı `1 + log2(n)` formülünü kullanır; alternatif olarak karekök kuralı `√n` de pratikte sık kullanılır — ikisi de yalnızca bir başlangıç noktasıdır.",
                "Sturges' rule uses `1 + log2(n)`; the alternative square-root rule, `√n`, is also common in practice — both are only a starting point.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bir tepe yalnızca tek bir aralık sayısında görünüyor, aralık sayısını biraz değiştirdiğinde kayboluyor. Bu tepe hakkında ne düşünmelisin?",
                "A peak appears at only one bin count and disappears once you change it slightly. What should you conclude about that peak?",
              ],
              options: [
                [
                  "Muhtemelen gerçek değil, gürültü olabilir",
                  "It is probably not real — it may just be noise",
                ],
                ["Kesinlikle gerçek bir ikinci gruptur", "It is definitely a real second group"],
                ["Veri hatalıdır", "The data is faulty"],
                ["Aralık sayısı önemli değildir", "The bin count does not matter"],
              ],
              answer: 0,
              explain: [
                "Doğru yaklaşım birkaç farklı aralık sayısı deneyip şeklin kararlı olup olmadığına bakmaktır; yalnızca bir ayarda beliren bir tepe gerçek bir yapıdan çok rastlantıya işaret eder.",
                "The correct approach is to try several bin counts and check whether the shape stays stable; a peak that shows up at only one setting points more to chance than to real structure.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Verilen oturum sürelerinin çeyrekliklerini hesapla: `q1` (%25), `q2` (medyan) ve `q3` (%75). Ardından `iqr` değerini (Q3 − Q1) bul.",
                "Compute the quartiles of the session durations: `q1` (25th), `q2` (median) and `q3` (75th). Then find `iqr` (Q3 − Q1).",
              ],
              starter: `import numpy as np

sureler = [45, 60, 30, 185, 420, 95, 540, 310, 275, 150, 600, 225]

q1 =
q2 =
q3 =
iqr = `,
              solution: `import numpy as np

sureler = [45, 60, 30, 185, 420, 95, 540, 310, 275, 150, 600, 225]

q1 = np.percentile(sureler, 25)
q2 = np.percentile(sureler, 50)
q3 = np.percentile(sureler, 75)
iqr = q3 - q1
print(q1, q2, q3, iqr)`,
              hint: [
                "`np.percentile(liste, 25)` çeyreklik verir. IQR, üçüncü çeyreklikten birinciyi çıkarmaktır.",
                "`np.percentile(list, 25)` gives a quartile. The IQR is the third quartile minus the first.",
              ],
              checks: [
                {
                  code: "abs(float(q1) - 86.25) < 0.01",
                  msg: ["Q1 86.25 olmalı", "Q1 must be 86.25"],
                },
                {
                  code: "abs(float(q2) - 205.0) < 0.01",
                  msg: ["Medyan 205 olmalı", "The median must be 205"],
                },
                {
                  code: "abs(float(q3) - 337.5) < 0.01",
                  msg: ["Q3 337.5 olmalı", "Q3 must be 337.5"],
                },
                {
                  code: "abs(float(iqr) - 251.25) < 0.01",
                  msg: ["IQR 251.25 olmalı", "The IQR must be 251.25"],
                },
              ],
              xp: 35,
            }),
          ],
        }),
        lesson({
          slug: "olasilik-temelleri",
          title: L("Olasılığın temelleri", "The basics of probability"),
          summary: L(
            "Belirsizliği sayıyla ifade etmek: bağımsızlık, koşullu olasılık ve sezginin yanıldığı yer.",
            "Putting a number on uncertainty: independence, conditional probability, and where intuition fails.",
          ),
          minutes: 16,
          blocks: [
            text(
              "**Olasılık**, bir olayın gerçekleşme eğiliminin 0 ile 1 arasında ifadesidir. Üç kural neredeyse her şeyi çözer:\n\n- **Tümleyen:** `P(A olmaz) = 1 − P(A)`\n- **Toplama:** `P(A veya B) = P(A) + P(B) − P(A ve B)`\n- **Çarpma:** `P(A ve B) = P(A) × P(B | A)`\n\nSon kuraldaki `P(B | A)`, \"A gerçekleştiği bilindiğinde B'nin olasılığı\" demektir ve **koşullu olasılık** adını alır. A ile B **bağımsızsa** `P(B | A) = P(B)` olur ve çarpma kuralı basitleşir.",
              "**Probability** expresses an event's tendency to occur as a number between 0 and 1. Three rules solve almost everything:\n\n- **Complement:** `P(not A) = 1 − P(A)`\n- **Addition:** `P(A or B) = P(A) + P(B) − P(A and B)`\n- **Multiplication:** `P(A and B) = P(A) × P(B | A)`\n\nIn the last rule `P(B | A)` means \"the probability of B given that A happened\" and is called **conditional probability**. If A and B are **independent** then `P(B | A) = P(B)` and the multiplication rule simplifies.",
            ),
            quiz({
              id: "q2",
              q: [
                "`P(A) = 0,3` ise `P(A olmaz)` nedir?",
                "If `P(A) = 0.3`, what is `P(not A)`?",
              ],
              options: [
                ["0,7", "0.7"],
                ["0,3", "0.3"],
                ["1,3", "1.3"],
                ["0", "0"],
              ],
              answer: 0,
              explain: [
                "Tümleyen kuralı `P(A olmaz) = 1 − P(A)` der; `1 − 0,3 = 0,7`. A ile A-olmaz her zaman toplamda 1 eder çünkü ikisinden biri kesin gerçekleşir.",
                "The complement rule says `P(not A) = 1 − P(A)`; `1 − 0.3 = 0.7`. A and not-A always sum to 1 because exactly one of them must happen.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Toplama kuralı `P(A veya B) = P(A) + P(B) − P(A ve B)` şeklindedir. Son terim neden çıkarılır?",
                "The addition rule is `P(A or B) = P(A) + P(B) − P(A and B)`. Why is the last term subtracted?",
              ],
              options: [
                [
                  "A ve B'nin kesiştiği durumlar hem P(A) hem P(B) içinde bir kez daha sayılmış olur, bu çift sayımı düzeltir",
                  "The overlap between A and B gets counted once inside P(A) and once inside P(B), and subtracting corrects that double count",
                ],
                ["Olasılıklar her zaman 1'i geçmemelidir", "Probabilities must never exceed 1"],
                ["A ve B bağımsız olduğu için", "Because A and B are independent"],
                ["Formül gereği rastgele bir düzeltme terimidir", "It is just an arbitrary correction term in the formula"],
              ],
              answer: 0,
              explain: [
                "A ve B kesişiyorsa, o kesişim bölgesi hem \"A\" sayılırken hem \"B\" sayılırken bir kez daha dahil edilmiş olur; çıkarma işlemi bu fazlalığı düzeltir.",
                "If A and B overlap, the overlapping region gets included once while counting A and once more while counting B; subtracting removes that extra count.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`P(B | A)` ifadesi ne anlama gelir?",
                "What does the expression `P(B | A)` mean?",
              ],
              options: [
                [
                  "A gerçekleştiği bilindiğinde B'nin olasılığı",
                  "The probability of B given that A is known to have happened",
                ],
                ["A ve B'nin aynı anda gerçekleşme olasılığı", "The probability of A and B happening at the same time"],
                ["A'nın olasılığı çarpı B'nin olasılığı", "The probability of A multiplied by the probability of B"],
                ["B'nin A'ya sebep olma olasılığı", "The probability that B causes A"],
              ],
              answer: 0,
              explain: [
                "`P(B | A)` koşullu olasılıktır: örnek uzayı A'nın gerçekleştiği durumlara daraltıp, o daralmış uzayda B'nin ne kadar olası olduğunu sorar.",
                "`P(B | A)` is conditional probability: it narrows the sample space to cases where A happened, and asks how likely B is within that narrowed space.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Çarpma kuralı `P(A ve B) = P(A) × P(B | A)` ne zaman `P(A) × P(B)`'ye sadeleşir?",
                "When does the multiplication rule `P(A and B) = P(A) × P(B | A)` simplify to `P(A) × P(B)`?",
              ],
              options: [
                ["A ve B bağımsızsa, yani `P(B | A) = P(B)` olduğunda", "When A and B are independent, i.e. `P(B | A) = P(B)`"],
                ["A ve B ayrık (mutually exclusive) olduğunda", "When A and B are mutually exclusive"],
                ["P(A) sıfır olduğunda", "When P(A) is zero"],
                ["Her zaman sadeleşir", "It always simplifies this way"],
              ],
              answer: 0,
              explain: [
                "Bağımsızlık tam olarak \"A'nın gerçekleşmesi B'nin olasılığını değiştirmez\" demektir, yani `P(B | A) = P(B)`; bu durumda koşullu terim gereksizleşir.",
                "Independence means exactly that \"A happening does not change the probability of B\", i.e. `P(B | A) = P(B)`; in that case the conditional term becomes unnecessary.",
              ],
            }),
            info(
              "Bağımsızlık varsayımı en pahalı varsayımdır",
              "Independence is the most expensive assumption",
              "İki olayın bağımsız olduğunu varsaymak hesabı kolaylaştırır ama gerçekte nadiren doğrudur. \"Her müşterinin ayrılma olasılığı %5, o hâlde 10 müşterinin hepsinin kalma olasılığı 0,95¹⁰\" hesabı, müşteriler aynı fiyat zammından etkileniyorsa tamamen yanlıştır.\n\n2008 finansal krizinin arkasındaki modelleme hatası da tam olarak buydu: konut kredilerinin birbirinden bağımsız olarak batacağı varsayılmıştı. Aynı ekonomik şok hepsini birden vurunca model çöktü.",
              "Assuming two events are independent makes the arithmetic easy but is rarely true in practice. The calculation \"each customer has a 5% chance of churning, so the chance all 10 stay is 0.95¹⁰\" is completely wrong if the customers are all reacting to the same price rise.\n\nThis was precisely the modelling error behind the 2008 financial crisis: mortgages were assumed to default independently of one another. When a single economic shock hit them all at once, the model collapsed.",
            ),
            quiz({
              id: "q6",
              q: [
                "\"Her müşterinin ayrılma olasılığı %5, o hâlde 10 müşterinin hepsinin kalma olasılığı 0,95¹⁰'dur\" hesabı ne zaman yanlış çıkar?",
                "When does the calculation \"each customer has a 5% churn chance, so the chance all 10 stay is 0.95¹⁰\" go wrong?",
              ],
              options: [
                [
                  "Müşteriler aynı ortak etkiden (örneğin bir fiyat zammından) birlikte etkileniyorsa",
                  "When the customers are all reacting together to the same shared factor, such as a price rise",
                ],
                ["Müşteri sayısı 10'dan fazlaysa", "When there are more than 10 customers"],
                ["Ayrılma olasılığı %5'ten düşükse", "When the churn probability is below 5%"],
                ["Hiçbir zaman yanlış çıkmaz", "It is never wrong"],
              ],
              answer: 0,
              explain: [
                "0,95¹⁰ hesabı, müşterilerin birbirinden bağımsız karar verdiğini varsayar. Ortak bir etki (fiyat zammı gibi) hepsini aynı anda etkilerse, bağımsızlık bozulur ve gerçek risk hesaplanandan çok daha yüksek olur.",
                "The 0.95¹⁰ calculation assumes customers decide independently. If a shared factor like a price rise affects them all at once, independence breaks down and the real risk is far higher than the calculation suggests.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "2008 finansal krizinin arkasındaki modelleme hatası neydi?",
                "What was the modelling error behind the 2008 financial crisis?",
              ],
              options: [
                [
                  "Konut kredilerinin birbirinden bağımsız olarak batacağı varsayılmıştı",
                  "Mortgages were assumed to default independently of one another",
                ],
                ["Örneklem çok küçüktü", "The sample size was too small"],
                ["Ortalama yerine medyan kullanılmıştı", "The median was used instead of the mean"],
                ["Veriler yanlış toplanmıştı", "The data was collected incorrectly"],
              ],
              answer: 0,
              explain: [
                "Modeller her bir konut kredisinin batma riskini diğerlerinden bağımsız kabul etmişti. Tek bir ekonomik şok hepsini aynı anda vurunca, bu bağımsızlık varsayımı çöktü ve gerçek kayıplar modelin öngördüğünden çok daha büyük çıktı.",
                "The models treated each mortgage's default risk as independent of the others. When a single economic shock hit them all at once, that independence assumption collapsed, and the real losses far exceeded what the models predicted.",
              ],
            }),
            text(
              "**Sezgiyi en çok yanıltan konu koşullu olasılıktır.** Klasik örnek:\n\nBir hastalık nüfusun %1'inde var. Test, hastaysan %99 ihtimalle pozitif çıkıyor; sağlıklıysan %5 ihtimalle yanlışlıkla pozitif çıkıyor. Testin pozitif çıktı. Gerçekten hasta olma olasılığın nedir?\n\nÇoğu kişi \"%99\" der. Doğru cevap **%17**'dir.\n\n10.000 kişi düşün: 100'ü hasta, 9.900'ü sağlıklı. Hastaların 99'u pozitif çıkar. Sağlıklıların %5'i, yani 495'i de pozitif çıkar. Toplam 594 pozitif var ama bunların yalnızca 99'u gerçekten hasta: 99 / 594 ≈ **%17**.\n\nSebep, hastalığın **nadir** olmasıdır. Nadir olayları test ederken yanlış pozitifler doğru pozitifleri sayıca ezer.",
              "**Conditional probability is where intuition fails hardest.** The classic example:\n\nA disease affects 1% of the population. The test is positive 99% of the time if you have it, and falsely positive 5% of the time if you do not. Your test came back positive. What is the probability you actually have the disease?\n\nMost people say \"99%\". The correct answer is **17%**.\n\nPicture 10,000 people: 100 are ill, 9,900 are healthy. Of the ill, 99 test positive. Of the healthy, 5% — that is 495 — also test positive. There are 594 positives in total but only 99 are genuinely ill: 99 / 594 ≈ **17%**.\n\nThe reason is that the disease is **rare**. When you test for rare events, false positives outnumber true positives.",
            ),
            quiz({
              id: "q8",
              q: [
                "10.000 kişiden 100'ü hasta, 9.900'ü sağlıklı. Testin yanlış pozitif oranı %5. Sağlıklı kişilerden kaçı yanlışlıkla pozitif çıkar?",
                "Out of 10,000 people, 100 are ill and 9,900 are healthy. The test's false-positive rate is 5%. How many healthy people test positive by mistake?",
              ],
              options: [
                ["495", "495"],
                ["100", "100"],
                ["50", "50"],
                ["5", "5"],
              ],
              answer: 0,
              explain: [
                "`9.900 × 0,05 = 495`. Bu sayı, hastalıktan gerçekten pozitif çıkan 99 kişiden çok daha büyüktür — nadir hastalıklarda yanlış pozitifler her zaman doğru pozitifleri sayıca ezer.",
                "`9,900 × 0.05 = 495`. That is far larger than the 99 people who test positive because they are genuinely ill — for rare diseases, false positives always outnumber true positives.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "99 gerçek pozitif ve 495 yanlış pozitif olmak üzere toplam 594 pozitif test var. Testi pozitif çıkan birinin gerçekten hasta olma olasılığı yaklaşık nedir?",
                "There are 594 total positives: 99 true positives and 495 false positives. What is the approximate probability that someone who tests positive is genuinely ill?",
              ],
              options: [
                ["%17 (99/594)", "17% (99/594)"],
                ["%99", "99%"],
                ["%50", "50%"],
                ["%95", "95%"],
              ],
              answer: 0,
              explain: [
                "`99 / 594 ≈ 0,167`, yani yaklaşık %17. Testin kendi doğruluğu (%99 duyarlılık) yüksek olsa da, hastalığın nadirliği yüzünden pozitif çıkanların büyük çoğunluğu aslında sağlıklıdır.",
                "`99 / 594 ≈ 0.167`, roughly 17%. Even though the test's own accuracy (99% sensitivity) is high, because the disease is rare, the large majority of those who test positive are actually healthy.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Test pozitif çıktığında gerçek hastalık olasılığının sezgisel tahminden (%99) çok daha düşük (%17) çıkmasının temel sebebi nedir?",
                "What is the fundamental reason the true probability after a positive test (17%) is so much lower than the intuitive guess (99%)?",
              ],
              options: [
                [
                  "Hastalık nadir olduğu için, sağlıklı nüfusun küçük bir yanlış pozitif oranı bile mutlak sayıda hastaları geride bırakır",
                  "Because the disease is rare, even a small false-positive rate among the huge healthy population outnumbers the truly ill in absolute terms",
                ],
                ["Test cihazı bozuktur", "The testing equipment is faulty"],
                ["%99 duyarlılık rakamı yanlış hesaplanmıştır", "The 99% sensitivity figure was miscalculated"],
                ["Örneklem çok küçüktür", "The sample size is too small"],
              ],
              answer: 0,
              explain: [
                "Sezgi, testin kendi doğruluğuna (%99) odaklanır ama hastalığın ne kadar nadir olduğunu göz ardı eder. Sağlıklı nüfus çok büyük olduğu için, küçük bir yanlış pozitif oranı bile mutlak sayıda gerçek pozitifleri geride bırakır.",
                "Intuition focuses on the test's own accuracy (99%) but ignores how rare the disease is. Because the healthy population is so large, even a small false-positive rate outnumbers the true positives in absolute terms.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Dolandırıcılık tespit modelin %95 doğrulukla çalışıyor ve işlemlerin yalnızca %0,1'i dolandırıcılık. Model \"dolandırıcılık\" dediğinde ne beklemelisin?",
                "Your fraud model is 95% accurate and only 0.1% of transactions are fraudulent. What should you expect when it flags one?",
              ],
              options: [
                [
                  "İşaretlenenlerin büyük çoğunluğu yanlış pozitif olacaktır",
                  "The vast majority of flagged transactions will be false positives",
                ],
                [
                  "İşaretlenenlerin %95'i gerçekten dolandırıcılıktır",
                  "95% of flagged ones are genuinely fraud",
                ],
                ["Model kullanılamaz demektir", "It means the model is unusable"],
                ["Doğruluk oranı yanlış hesaplanmıştır", "The accuracy has been miscalculated"],
              ],
              answer: 0,
              explain: [
                "100.000 işlemde 100 dolandırıcılık var; model bunların 95'ini yakalar. Ama 99.900 temiz işlemin %5'i, yani ~4.995'i de yanlışlıkla işaretlenir. İşaretlenen ~5.090 işlemin yalnızca %2'si gerçektir. Nadir olaylarda \"doğruluk\" yanıltıcı bir metriktir — bu yüzden kesinlik (precision) ve duyarlılık (recall) kullanılır.",
                "In 100,000 transactions there are 100 frauds; the model catches 95. But 5% of the 99,900 clean ones — about 4,995 — are flagged too. Of the ~5,090 flagged, only 2% are real. For rare events \"accuracy\" is a misleading metric — which is why precision and recall are used instead.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "junior",
      title: L("Betimleyici istatistik", "Descriptive statistics"),
      description: L(
        "Merkez, yayılım, çarpıklık ve ilişki: veriyi tek bakışta ve dürüstçe özetlemek.",
        "Centre, spread, skew and association: summarising data at a glance, honestly.",
      ),
      projectSlug: "istatistik-kesif-analizi",
      lessons: [
        lesson({
          slug: "merkez-ve-yayilim",
          title: L("Merkez ve yayılım ölçüleri", "Measures of centre and spread"),
          summary: L(
            "Tek bir ortalama neredeyse hiçbir zaman yeterli değildir. Yanına neyi koyman gerekir?",
            "A single average is almost never enough. What has to go next to it?",
          ),
          minutes: 15,
          blocks: [
            text(
              "**Merkez ölçüleri:**\n\n- **Ortalama (mean)** — tüm değerlerin toplamı / adet. Aykırı değerlerden çok etkilenir.\n- **Medyan** — sıralandığında ortadaki değer. Aykırı değerlere dayanıklıdır.\n- **Mod** — en sık görülen değer. Kategorik veride tek anlamlı merkez ölçüsüdür.\n\n**Yayılım ölçüleri:**\n\n- **Standart sapma** — değerlerin ortalamadan tipik uzaklığı\n- **IQR (çeyrekler açıklığı)** — Q3 − Q1, ortadaki %50'nin genişliği\n- **Aralık** — maksimum − minimum, aykırı değere tamamen bağımlı",
              "**Measures of centre:**\n\n- **Mean** — sum of values / count. Heavily affected by outliers.\n- **Median** — the middle value once sorted. Robust to outliers.\n- **Mode** — the most frequent value. The only meaningful centre for categorical data.\n\n**Measures of spread:**\n\n- **Standard deviation** — the typical distance from the mean\n- **IQR (interquartile range)** — Q3 − Q1, the width of the middle 50%\n- **Range** — max − min, entirely at the mercy of outliers",
            ),
            quiz({
              id: "q2",
              q: [
                "Aykırı değerlerden en çok hangi merkez ölçüsü etkilenir?",
                "Which measure of centre is most affected by outliers?",
              ],
              options: [
                ["Ortalama (mean)", "The mean"],
                ["Medyan", "The median"],
                ["Mod", "The mode"],
                ["Hiçbiri etkilenmez", "None of them are affected"],
              ],
              answer: 0,
              explain: [
                "Ortalama, tüm değerlerin toplamını kullandığı için tek bir uç değer bile sonucu ciddi şekilde çekebilir; medyan yalnızca sıradaki konuma baktığı için buna karşı dayanıklıdır.",
                "The mean uses the sum of every value, so a single extreme point can drag it substantially; the median only looks at rank position, which makes it robust against this.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "En çok satılan ürün rengi gibi kategorik bir sütun için hangi merkez ölçüsü anlamlıdır?",
                "For a categorical column like \"best-selling product colour\", which measure of centre is meaningful?",
              ],
              options: [
                ["Mod", "The mode"],
                ["Ortalama", "The mean"],
                ["Medyan", "The median"],
                ["Standart sapma", "The standard deviation"],
              ],
              answer: 0,
              explain: [
                "Kategorik veride sıralama ya da toplama işlemi anlamsızdır; yalnızca \"hangi kategori en sık görülüyor\" sorusuna cevap veren mod, geçerli bir merkez ölçüsüdür.",
                "Ordering or summing categorical data is meaningless; only the mode, which answers \"which category appears most often\", is a valid measure of centre.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "IQR (çeyrekler açıklığı) neyi ölçer?",
                "What does the IQR (interquartile range) measure?",
              ],
              options: [
                ["Q3 − Q1, yani ortadaki %50'lik dilimin genişliğini", "Q3 − Q1, the width of the middle 50% of the data"],
                ["En büyük değer eksi en küçük değeri", "The maximum minus the minimum"],
                ["Ortalamadan tipik uzaklığı", "The typical distance from the mean"],
                ["En sık görülen değeri", "The most frequent value"],
              ],
              answer: 0,
              explain: [
                "IQR, verinin en uçtaki %25'lik dilimlerini göz ardı ederek ortadaki %50'nin ne kadar yayıldığını gösterir; bu yüzden aykırı değerlere karşı standart sapmadan daha dayanıklıdır.",
                "The IQR ignores the outermost 25% on each side and shows how spread out the middle 50% is, which makes it more robust to outliers than the standard deviation.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Aralık (range = maksimum − minimum) ölçüsünün en büyük zayıflığı nedir?",
                "What is the biggest weakness of the range (maximum − minimum)?",
              ],
              options: [
                [
                  "Tamamen tek bir aykırı değere bağımlıdır; verinin geri kalanını hiç dikkate almaz",
                  "It depends entirely on a single outlying value and ignores the rest of the data completely",
                ],
                ["Hesaplaması çok zordur", "It is very hard to compute"],
                ["Yalnızca kategorik veride kullanılabilir", "It can only be used on categorical data"],
                ["Her zaman negatif çıkar", "It always comes out negative"],
              ],
              answer: 0,
              explain: [
                "Aralık yalnızca en uç iki noktaya bakar; verinin geri kalanı ister sıkışık ister yayılmış olsun aralık aynı kalır, bu da onu tek bir aykırı gözleme karşı son derece kırılgan yapar.",
                "The range looks only at the two most extreme points; whether the rest of the data is tightly packed or spread out, the range stays the same, making it extremely fragile against a single outlying observation.",
              ],
            }),
            info(
              "Ortalama maaş neden yanıltır?",
              "Why the average salary misleads",
              "Dokuz kişinin 30.000 TL, bir kişinin 500.000 TL kazandığı bir ekipte **ortalama 77.000 TL**'dir — ama kimse o parayı kazanmaz. **Medyan 30.000 TL**'dir ve gerçeği çok daha iyi anlatır. Gelir, ev fiyatı, oturum süresi gibi sağa çarpık dağılımlarda daima medyanı da raporla.",
              "In a team where nine people earn 30,000 and one earns 500,000, the **mean is 77,000** — a number nobody actually earns. The **median is 30,000** and describes reality far better. For right-skewed distributions like income, house prices or session length, always report the median too.",
            ),
            quiz({
              id: "q6",
              q: [
                "Dokuz kişi 30.000 TL, bir kişi 500.000 TL kazanıyor. Ortalama 77.000 TL çıkıyor. Bu sayı neden yanıltıcı?",
                "Nine people earn 30,000 and one earns 500,000. The mean comes out at 77,000. Why is this number misleading?",
              ],
              options: [
                [
                  "Ekipteki kimse gerçekte 77.000 TL kazanmıyor; tek bir yüksek değer ortalamayı yukarı çekmiş",
                  "Nobody on the team actually earns 77,000; a single high value has pulled the mean upward",
                ],
                ["Hesaplama hatalıdır", "The calculation is wrong"],
                ["77.000 TL çok düşük bir rakamdır", "77,000 is far too low a figure"],
                ["Ortalama yalnızca çift sayıda kişide hesaplanabilir", "The mean can only be computed for an even number of people"],
              ],
              answer: 0,
              explain: [
                "Ortalama, toplamı kişi sayısına böler; 500.000'lik tek bir değer toplamı öyle şişirir ki sonuç, dokuz kişinin gerçek kazancından (30.000) çok uzaklaşır ve kimseyi temsil etmez.",
                "The mean divides the total by the headcount; a single value of 500,000 inflates that total so much that the result drifts far from the nine people's actual earnings (30,000) and represents nobody.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Aynı ekipte (dokuz kişi 30.000 TL, bir kişi 500.000 TL) medyan kaç TL'dir?",
                "In that same team (nine people earning 30,000, one earning 500,000), what is the median?",
              ],
              options: [
                ["30.000 TL", "30,000"],
                ["77.000 TL", "77,000"],
                ["265.000 TL", "265,000"],
                ["500.000 TL", "500,000"],
              ],
              answer: 0,
              explain: [
                "On kişiyi sıraladığında ortadaki iki değer (5. ve 6. sıradaki) ikisi de 30.000'dir, çünkü dokuz kişi zaten bu değeri kazanıyor; medyan bu yüzden 30.000'de kalır ve gerçek durumu ortalamadan çok daha iyi yansıtır.",
                "Sorting all ten values, the two middle ones (5th and 6th) are both 30,000, since nine people already earn that amount; the median therefore stays at 30,000 and reflects reality far better than the mean.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "`[10, 12, 11, 13, 200]` veri seti için hangi ifade doğrudur?",
                "For the dataset `[10, 12, 11, 13, 200]`, which statement is true?",
              ],
              options: [
                [
                  "Medyan (12) merkezi ortalamadan (49,2) daha iyi temsil eder",
                  "The median (12) represents the centre better than the mean (49.2)",
                ],
                ["Ortalama daima medyandan iyidir", "The mean is always better than the median"],
                ["İkisi de aynı sonucu verir", "Both give the same answer"],
                ["200 değeri hesaplardan çıkarılmalıdır", "The value 200 must simply be removed"],
              ],
              answer: 0,
              explain: [
                "Tek bir aykırı değer ortalamayı 49,2'ye çekerken medyan 12'de kalır. Aykırı değeri körü körüne silmek de doğru değildir — önce onun bir hata mı yoksa gerçek ve önemli bir gözlem mi olduğunu araştırman gerekir.",
                "A single outlier drags the mean to 49.2 while the median stays at 12. Blindly deleting the outlier is not the answer either — first find out whether it is an error or a real and important observation.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Gelir, ev fiyatı gibi sağa çarpık dağılımlarda ortalamanın yanına daima hangi ölçü de raporlanmalıdır?",
                "For right-skewed distributions like income or house prices, which measure should always be reported alongside the mean?",
              ],
              options: [
                ["Medyan", "The median"],
                ["Mod", "The mode"],
                ["Aralık (range)", "The range"],
                ["Hiçbiri, ortalama tek başına yeterlidir", "None — the mean alone is sufficient"],
              ],
              answer: 0,
              explain: [
                "Sağa çarpık dağılımlarda birkaç büyük değer ortalamayı yukarı çeker; medyan bu etkiye dayanıklı olduğu için tipik durumu çok daha dürüst yansıtır.",
                "In right-skewed distributions a few large values pull the mean upward; the median resists this and reflects the typical case far more honestly.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`[10, 12, 11, 13, 200]` veri setinde standart sapma neden çok yüksek çıkar?",
                "Why does the standard deviation of `[10, 12, 11, 13, 200]` come out very large?",
              ],
              options: [
                [
                  "Standart sapma, değerlerin ortalamadan uzaklığına dayanır ve tek bir uç değer (200) bu uzaklığı ciddi şekilde büyütür",
                  "The standard deviation is based on distance from the mean, and a single extreme value (200) inflates that distance a lot",
                ],
                ["Veri seti çok küçüktür", "The dataset is too small"],
                ["Standart sapma yalnızca beş veya daha az değerde büyük çıkar", "The standard deviation is only large for five or fewer values"],
                ["Hesaplama formülü yanlıştır", "The formula itself is wrong"],
              ],
              answer: 0,
              explain: [
                "Standart sapma her değerin ortalamadan farkının karesini alır; 200 gibi bir uç değer, ortalamayı da yukarı çekip kendisiyle ortalama arasındaki farkı büyük tuttuğu için sapmayı orantısız şekilde artırır.",
                "The standard deviation squares each value's distance from the mean; an extreme value like 200 both drags the mean up and keeps its own distance from it large, so it inflates the deviation disproportionately.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Verilen maaş listesi için `ortalama`, `medyan` ve `std` (standart sapma) değerlerini hesapla. NumPy kullanabilirsin.",
                "Compute `ortalama` (mean), `medyan` (median) and `std` (standard deviation) for the salary list. You may use NumPy.",
              ],
              starter: `import numpy as np

maaslar = [30000, 32000, 28000, 31000, 35000, 500000]

ortalama =
medyan =
std = `,
              solution: `import numpy as np

maaslar = [30000, 32000, 28000, 31000, 35000, 500000]

ortalama = np.mean(maaslar)
medyan = np.median(maaslar)
std = np.std(maaslar)
print(ortalama, medyan, std)`,
              hint: [
                "`np.mean`, `np.median`, `np.std` fonksiyonları listeyi doğrudan alır.",
                "`np.mean`, `np.median` and `np.std` accept the list directly.",
              ],
              checks: [
                {
                  code: "abs(float(ortalama) - 109333.33333333333) < 0.01",
                  msg: ["Ortalama doğru hesaplanmalı", "The mean must be correct"],
                },
                {
                  code: "abs(float(medyan) - 31500.0) < 0.01",
                  msg: ["Medyan 31500 olmalı", "The median must be 31500"],
                },
                {
                  code: "float(std) > 100000",
                  msg: [
                    "Standart sapma aykırı değer nedeniyle çok büyük çıkmalı",
                    "The standard deviation must come out very large because of the outlier",
                  ],
                },
              ],
              xp: 40,
            }),
          ],
        }),
        lesson({
          slug: "carpiklik-ve-aykiri-degerler",
          title: L("Çarpıklık ve aykırı değerler", "Skewness and outliers"),
          summary: L(
            "Aykırı değeri silmeli mi, tutmalı mı? Karar, onun nereden geldiğine bağlı.",
            "Should you delete an outlier or keep it? The decision depends on where it came from.",
          ),
          minutes: 16,
          blocks: [
            text(
              "**Çarpıklık (skewness)**, dağılımın simetriden ne kadar saptığıdır:\n\n- **Sağa çarpık** — uzun kuyruk sağda. Ortalama > medyan. Gelir, satış tutarı, oturum süresi neredeyse hep böyledir.\n- **Sola çarpık** — uzun kuyruk solda. Ortalama < medyan. Emeklilik yaşı, sınav notları (tavan etkisi) örnektir.\n- **Simetrik** — ortalama ≈ medyan. Boy, ölçüm hataları.\n\nHızlı sınama: **ortalama ile medyanı karşılaştır.** Aralarında büyük fark varsa dağılım çarpıktır ve tek başına ortalama raporlamak yanıltıcı olur.",
              "**Skewness** is how far a distribution departs from symmetry:\n\n- **Right-skewed** — long tail on the right. Mean > median. Income, order value and session length almost always look like this.\n- **Left-skewed** — long tail on the left. Mean < median. Retirement age and exam scores (ceiling effect) are examples.\n- **Symmetric** — mean ≈ median. Height, measurement error.\n\nA quick test: **compare the mean and the median.** A large gap means the distribution is skewed and reporting the mean alone will mislead.",
            ),
            quiz({
              id: "q1",
              q: [
                "Sipariş tutarı gibi bir değişkende ortalama medyandan belirgin şekilde büyük çıkıyor (ortalama > medyan). Bu hangi çarpıklığın işaretidir?",
                "For a variable like order value, the mean is noticeably larger than the median (mean > median). What kind of skew does this signal?",
              ],
              options: [
                ["Sağa çarpık — uzun kuyruk sağda", "Right-skewed — a long tail on the right"],
                ["Sola çarpık — uzun kuyruk solda", "Left-skewed — a long tail on the left"],
                ["Simetrik", "Symmetric"],
                ["Bu bilgiden çarpıklık anlaşılamaz", "Skew cannot be inferred from this"],
              ],
              answer: 0,
              explain: [
                "Sağa çarpık dağılımlarda birkaç büyük değer ortalamayı yukarı çeker ama medyanı etkilemez, bu yüzden ortalama medyandan büyük çıkar — sipariş tutarı, gelir ve oturum süresi bu şekle neredeyse hep sahiptir.",
                "In right-skewed distributions, a few large values pull the mean up without moving the median, so the mean ends up above the median — order value, income and session length almost always take this shape.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Emeklilik yaşı gibi bir değişkende ortalama medyandan küçük çıkıyor (ortalama < medyan). Bu hangi çarpıklığın işaretidir?",
                "For a variable like retirement age, the mean comes out lower than the median (mean < median). What kind of skew does this signal?",
              ],
              options: [
                ["Sola çarpık — uzun kuyruk solda", "Left-skewed — a long tail on the left"],
                ["Sağa çarpık — uzun kuyruk sağda", "Right-skewed — a long tail on the right"],
                ["Simetrik", "Symmetric"],
                ["Bimodal", "Bimodal"],
              ],
              answer: 0,
              explain: [
                "Sola çarpık dağılımlarda az sayıda küçük değer ortalamayı aşağı çeker; emeklilik yaşında erken emekli olan az sayıdaki kişi bu etkiyi yaratır, çoğunluk ise daha yüksek yaşlarda kümelenir.",
                "In left-skewed distributions a few small values drag the mean down; a handful of early retirees create exactly this effect, while the majority cluster at higher ages.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir dağılımın çarpık mı yoksa simetrik mi olduğunu hızlıca anlamanın pratik yolu nedir?",
                "What is the practical shortcut for quickly checking whether a distribution is skewed or symmetric?",
              ],
              options: [
                ["Ortalama ile medyanı karşılaştırmak", "Compare the mean and the median"],
                ["Yalnızca standart sapmaya bakmak", "Look only at the standard deviation"],
                ["Veri setinin büyüklüğüne bakmak", "Look at the size of the dataset"],
                ["Mod ile aralığı karşılaştırmak", "Compare the mode and the range"],
              ],
              answer: 0,
              explain: [
                "Ortalama ve medyan simetrik bir dağılımda birbirine yakın çıkar; aralarında büyük bir fark varsa dağılım çarpıktır ve ortalamayı tek başına raporlamak yanıltıcı olur.",
                "In a symmetric distribution the mean and median sit close together; a large gap between them signals skew, and reporting the mean alone would be misleading.",
              ],
            }),
            text(
              "**Aykırı değer tespiti** için iki standart yöntem:\n\n- **IQR kuralı** — `Q1 − 1,5×IQR` altındaki veya `Q3 + 1,5×IQR` üstündeki değerler. Çarpık dağılımlarda da çalışır, bu yüzden varsayılan tercihtir.\n- **Z-skoru** — ortalamadan 3 standart sapmadan uzak değerler. Yalnızca dağılım yaklaşık normalse anlamlıdır; çarpık veride ortalamayı ve sapmayı aykırı değerin kendisi şişirdiği için güvenilmezdir.",
              "Two standard ways to **detect outliers**:\n\n- **The IQR rule** — values below `Q1 − 1.5×IQR` or above `Q3 + 1.5×IQR`. It works on skewed distributions too, which makes it the default choice.\n- **The z-score** — values more than 3 standard deviations from the mean. Meaningful only when the distribution is roughly normal; on skewed data it is unreliable because the outlier itself inflates the mean and the deviation.",
            ),
            quiz({
              id: "q4",
              q: [
                "IQR kuralına göre bir değer ne zaman aykırı sayılır?",
                "Under the IQR rule, when is a value flagged as an outlier?",
              ],
              options: [
                [
                  "`Q1 − 1,5×IQR` altındaysa veya `Q3 + 1,5×IQR` üstündeyse",
                  "When it is below `Q1 − 1.5×IQR` or above `Q3 + 1.5×IQR`",
                ],
                ["Ortalamadan 1 standart sapma uzaktaysa", "When it is 1 standard deviation from the mean"],
                ["Medyandan büyükse", "When it is above the median"],
                ["Negatifse", "When it is negative"],
              ],
              answer: 0,
              explain: [
                "IQR kuralı, ortadaki %50'lik dilimin (Q1-Q3) genişliğini referans alıp bunun 1,5 katı kadar dışına taşan değerleri aykırı sayar; medyan tabanlı olduğu için sağlam bir eşiktir.",
                "The IQR rule takes the width of the middle 50% (Q1-Q3) as a reference and flags anything beyond 1.5 times that width as an outlier; being median-based, it gives a robust threshold.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Z-skoru yöntemi neden çarpık dağılımlarda güvenilmez hâle gelir?",
                "Why does the z-score method become unreliable on skewed distributions?",
              ],
              options: [
                [
                  "Aykırı değerin kendisi, ölçütü hesaplarken kullanılan ortalamayı ve standart sapmayı şişirir",
                  "The outlier itself inflates the very mean and standard deviation used to compute the score",
                ],
                ["Z-skoru yalnızca kategorik veride tanımlıdır", "Z-scores are only defined for categorical data"],
                ["Z-skoru asla negatif çıkamaz", "Z-scores can never be negative"],
                ["Z-skoru hesaplamak IQR'den daha yavaştır", "Computing z-scores is slower than computing the IQR"],
              ],
              answer: 0,
              explain: [
                "Z-skoru ortalama ve standart sapmayı referans alır; ama bu iki değer aykırı gözlemin kendisinden etkilenip şişer, bu da tam olarak tespit etmeye çalıştığın şeyi bulanıklaştırır.",
                "The z-score is anchored to the mean and standard deviation — but those two statistics are themselves inflated by the outlying observation, which blurs the very thing you are trying to detect.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "IQR kuralı neden aykırı değer tespitinde varsayılan tercih olarak önerilir?",
                "Why is the IQR rule recommended as the default choice for outlier detection?",
              ],
              options: [
                [
                  "Medyan ve çeyrekliklere dayandığı için çarpık dağılımlarda da güvenilir çalışır",
                  "Because it is based on the median and quartiles, it stays reliable even on skewed distributions",
                ],
                ["Hesaplaması Z-skorundan daha basittir", "Because it is computationally simpler than the z-score"],
                ["Yalnızca normal dağılımda çalışır", "Because it only works on normal distributions"],
                ["Aykırı değerleri asla yanlış işaretlemez", "Because it never mislabels an outlier"],
              ],
              answer: 0,
              explain: [
                "Medyan ve çeyrekler açıklığı aykırı değerlerden Z-skorunun dayandığı ortalama ve standart sapma kadar etkilenmez; bu yüzden IQR kuralı hem normal hem çarpık dağılımlarda tutarlı sonuç verir.",
                "The median and IQR are far less swayed by outliers than the mean and standard deviation the z-score relies on, so the IQR rule gives consistent results on both normal and skewed distributions.",
              ],
            }),
            pitfall(
              "Aykırı değeri silmek çoğu zaman yanlıştır",
              "Deleting an outlier is usually wrong",
              "Aykırı değer üç şeyden biridir ve her biri farklı davranış gerektirir:\n\n1. **Veri hatası** — eksi yaş, 1899 doğum tarihi, kuruş yerine lira. Düzelt veya çıkar.\n2. **Farklı popülasyon** — bireysel müşteriler arasına karışmış kurumsal sipariş. Ayır ve ayrı analiz et.\n3. **Gerçek ve önemli olay** — kara cuma satışı, viral olmuş içerik. **Sakın silme** — analizin asıl konusu o olabilir.\n\nSilmeden önce daima sor: bu değer neden var? Cevabı bilmeden silmek, veriyi hikâyene uydurmaktır.",
              "An outlier is one of three things, and each demands different handling:\n\n1. **A data error** — negative age, an 1899 birth date, lira recorded instead of cents. Fix it or drop it.\n2. **A different population** — a corporate order mixed in among consumer ones. Separate it and analyse it apart.\n3. **A real and important event** — Black Friday sales, a piece of content going viral. **Do not delete it** — it may be the whole point of the analysis.\n\nBefore deleting, always ask: why does this value exist? Deleting without knowing the answer is bending the data to fit your story.",
            ),
            quiz({
              id: "q7",
              q: [
                "Bir veri setinde \"-5 yaş\" veya \"1899 doğum tarihi\" gibi bir değer görüyorsun. Bu genellikle hangi tür aykırı değerdir?",
                "You spot a value like \"age -5\" or \"birth year 1899\" in a dataset. What type of outlier is this usually?",
              ],
              options: [
                ["Veri hatası — düzeltilmeli veya çıkarılmalı", "A data error — it should be fixed or dropped"],
                ["Farklı bir popülasyon", "A different population"],
                ["Gerçek ve önemli bir olay", "A real and important event"],
                ["Normal bir gözlem", "A perfectly normal observation"],
              ],
              answer: 0,
              explain: [
                "Negatif yaş veya imkânsız bir doğum tarihi fiziksel olarak gerçekleşemez; bu, veri girişi ya da sistem hatasının işaretidir ve düzeltilmeli ya da çıkarılmalıdır.",
                "A negative age or an impossible birth date cannot physically occur; it signals a data entry or system error and should be fixed or removed.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Kara cuma satış rakamları, veri setinde diğer günlerden çok uzakta duran bir aykırı değer olarak görünüyor. Ne yapmalısın?",
                "Black Friday sales figures show up as an outlier, sitting far from every other day in the dataset. What should you do?",
              ],
              options: [
                [
                  "Silme — bu gerçek ve önemli bir olay olabilir, analizin asıl konusu bile olabilir",
                  "Do not delete it — it may be a real, important event and could even be the whole point of the analysis",
                ],
                ["Hemen sil, ortalamayı bozuyor", "Delete it immediately, it distorts the mean"],
                ["Değerini diğer günlerin ortalamasıyla değiştir", "Replace its value with the average of the other days"],
                ["Veri hatası olduğunu varsay", "Assume it is a data error"],
              ],
              answer: 0,
              explain: [
                "Kara cuma gibi bilinen, gerçek bir olayı temsil eden bir aykırı değeri silmek, tam olarak anlamak istediğin dinamiği veriden çıkarmak demektir; önce onun neden var olduğunu anlaman gerekir.",
                "Deleting an outlier that represents a known, real event like Black Friday removes exactly the dynamic you are trying to understand; you first need to understand why it exists.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bir aykırı değeri silmeden önce sormanın gereken en önemli soru nedir?",
                "What is the single most important question to ask before deleting an outlier?",
              ],
              options: [
                ["Bu değer neden var — hata mı, farklı bir grup mu, yoksa gerçek bir olay mı?", "Why does this value exist — is it an error, a different group, or a real event?"],
                ["Değer pozitif mi negatif mi?", "Is the value positive or negative?"],
                ["Veri setinde kaç satır var?", "How many rows are in the dataset?"],
                ["Değer tam sayı mı ondalıklı mı?", "Is the value an integer or a decimal?"],
              ],
              answer: 0,
              explain: [
                "Aykırı değerin kaynağını bilmeden silmek, veriyi hikâyene uydurmaktır. Üç olasılıktan (hata, farklı popülasyon, gerçek olay) hangisi olduğunu belirlemek, doğru işlemi seçmenin ön koşuludur.",
                "Deleting an outlier without knowing its source is bending the data to fit your story. Determining which of the three possibilities — error, different population, or real event — applies is a prerequisite for choosing the right action.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "IQR kuralıyla aykırı değerleri bul. `alt_sinir`, `ust_sinir` ve aykırı değerlerin listesi olan `aykirilar` değişkenlerini üret.",
                "Find outliers with the IQR rule. Produce `alt_sinir`, `ust_sinir` and a list `aykirilar` of the outlying values.",
              ],
              starter: `import numpy as np

tutarlar = [120, 135, 128, 142, 119, 131, 125, 138, 2400, 133, 127, 5]

q1 = np.percentile(tutarlar, 25)
q3 = np.percentile(tutarlar, 75)
iqr = q3 - q1

alt_sinir =
ust_sinir =
aykirilar = `,
              solution: `import numpy as np

tutarlar = [120, 135, 128, 142, 119, 131, 125, 138, 2400, 133, 127, 5]

q1 = np.percentile(tutarlar, 25)
q3 = np.percentile(tutarlar, 75)
iqr = q3 - q1

alt_sinir = q1 - 1.5 * iqr
ust_sinir = q3 + 1.5 * iqr
aykirilar = [x for x in tutarlar if x < alt_sinir or x > ust_sinir]
print(alt_sinir, ust_sinir, aykirilar)`,
              hint: [
                "Sınırlar `q1 - 1.5*iqr` ve `q3 + 1.5*iqr`. Aykırıları liste kavraması ile süz.",
                "The bounds are `q1 - 1.5*iqr` and `q3 + 1.5*iqr`. Filter the outliers with a list comprehension.",
              ],
              checks: [
                {
                  code: "sorted(aykirilar) == [5, 2400]",
                  msg: ["Aykırı değerler 5 ve 2400 olmalı", "The outliers must be 5 and 2400"],
                },
                {
                  code: "float(alt_sinir) < float(ust_sinir)",
                  msg: [
                    "Alt sınır üst sınırdan küçük olmalı",
                    "The lower bound must be below the upper",
                  ],
                },
              ],
              xp: 40,
            }),
          ],
        }),
        lesson({
          slug: "iliski-ve-korelasyon",
          title: L("İlişki ve korelasyon", "Association and correlation"),
          summary: L(
            "İki değişken birlikte mi hareket ediyor? Ve bu, birinin diğerine sebep olduğu anlamına gelir mi?",
            "Do two variables move together? And does that mean one causes the other?",
          ),
          minutes: 16,
          blocks: [
            text(
              "**Korelasyon katsayısı (r)**, iki sayısal değişkenin birlikte hareket etme derecesini −1 ile +1 arasında ölçer:\n\n- `r = +1` — kusursuz doğrusal artış\n- `r = 0` — doğrusal ilişki yok\n- `r = −1` — kusursuz doğrusal azalış\n\nKaba yorum: |r| < 0,3 zayıf, 0,3-0,7 orta, > 0,7 güçlü. Ama eşikler alana göre değişir — fizikte 0,7 zayıf sayılırken sosyal bilimlerde güçlüdür.\n\n**Pearson** doğrusal ilişkiyi ölçer; **Spearman** ise sıralamaya bakar ve doğrusal olmayan ama tek yönlü ilişkileri de yakalar. Aykırı değer varsa Spearman daha güvenlidir.",
              "The **correlation coefficient (r)** measures how strongly two numeric variables move together, from −1 to +1:\n\n- `r = +1` — perfect linear increase\n- `r = 0` — no linear relationship\n- `r = −1` — perfect linear decrease\n\nA rough reading: |r| < 0.3 weak, 0.3-0.7 moderate, > 0.7 strong. But the thresholds depend on the field — 0.7 is weak in physics and strong in social science.\n\n**Pearson** measures linear association; **Spearman** works on ranks and also catches monotonic but non-linear relationships. When outliers are present, Spearman is the safer choice.",
            ),
            quiz({
              id: "q2",
              q: [
                "r = +1 çıktığında bu iki değişken arasında nasıl bir ilişki vardır?",
                "When r = +1, what kind of relationship exists between the two variables?",
              ],
              options: [
                ["Kusursuz doğrusal artan ilişki", "A perfect linear increasing relationship"],
                ["Kusursuz doğrusal azalan ilişki", "A perfect linear decreasing relationship"],
                ["Hiçbir doğrusal ilişki yok", "No linear relationship at all"],
                ["Rastgele bir ilişki", "A random relationship"],
              ],
              answer: 0,
              explain: [
                "r = +1, biri artarken diğerinin de tam orantılı biçimde arttığı, noktaların tam bir doğru üzerinde durduğu durumu ifade eder.",
                "r = +1 means that as one variable rises the other rises in exact proportion, with every point sitting perfectly on a straight line.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "r = −1 ne anlama gelir?",
                "What does r = −1 mean?",
              ],
              options: [
                ["Biri artarken diğeri kusursuz doğrusal biçimde azalır", "As one variable rises, the other falls in a perfect linear way"],
                ["İki değişken arasında hiçbir ilişki yoktur", "There is no relationship between the two variables"],
                ["İki değişken bağımsızdır", "The two variables are independent"],
                ["Veri hatalıdır", "The data is faulty"],
              ],
              answer: 0,
              explain: [
                "r = −1, iki değişkenin ters yönde ama tam orantılı hareket ettiği kusursuz bir doğrusal ilişkidir; biri her arttığında diğeri her seferinde aynı oranda azalır.",
                "r = −1 is a perfect linear relationship moving in opposite directions but exact proportion; every rise in one is matched by a proportional fall in the other.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Pearson ve Spearman korelasyonu arasındaki temel fark nedir?",
                "What is the key difference between Pearson and Spearman correlation?",
              ],
              options: [
                [
                  "Pearson doğrusal ilişkiyi ölçer; Spearman sıralamaya dayanır ve doğrusal olmayan monotonik ilişkileri de yakalar",
                  "Pearson measures linear association; Spearman works on ranks and also catches non-linear monotonic relationships",
                ],
                ["İkisi tamamen aynı sonucu verir", "The two always give identical results"],
                ["Spearman yalnızca kategorik veride kullanılır", "Spearman can only be used on categorical data"],
                ["Pearson yalnızca negatif değerlerde çalışır", "Pearson only works with negative values"],
              ],
              answer: 0,
              explain: [
                "Pearson noktaların bir doğruya ne kadar yakın durduğunu ölçer. Spearman ise değerleri sıralamaya çevirip, doğrusal olmasa bile tutarlı bir yönde artan/azalan (monotonik) ilişkileri de yakalayabilir.",
                "Pearson measures how closely points hug a straight line. Spearman converts values to ranks and can therefore also catch monotonic relationships that consistently rise or fall without being linear.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Veri setinde birkaç aşırı aykırı değer varsa hangi korelasyon yöntemi daha güvenlidir?",
                "If the dataset contains a few extreme outliers, which correlation method is safer to use?",
              ],
              options: [
                ["Spearman", "Spearman"],
                ["Pearson", "Pearson"],
                ["İkisi de aynı derecede güvenlidir", "Both are equally safe"],
                ["Hiçbiri kullanılamaz", "Neither can be used"],
              ],
              answer: 0,
              explain: [
                "Spearman, ham değerler yerine sıralamalarla çalıştığı için tek bir uç değerin etkisi sınırlı kalır; Pearson ise ham değerlere dayandığından aykırı değerlerden ciddi şekilde etkilenebilir.",
                "Spearman works on ranks rather than raw values, so a single extreme point has limited influence; Pearson relies on raw values and can be seriously distorted by outliers.",
              ],
            }),
            pitfall(
              "Korelasyon nedensellik değildir — ama bu kadarla bitmez",
              "Correlation is not causation — but it does not end there",
              "Bu cümleyi herkes bilir, asıl mesele **neden** olmadığıdır. Üç alternatif açıklama vardır:\n\n1. **Ters yönlü nedensellik** — B, A'ya sebep oluyordur. \"Çok destek talebi açan müşteriler daha çok ödüyor\" — belki de çok ödeyenler daha çok kullanıyordur.\n2. **Karıştırıcı değişken** — üçüncü bir etken ikisini birden etkiliyordur. Dondurma satışı ile boğulma vakaları korelasyonludur; sebep **sıcaklıktır**.\n3. **Rastlantı** — yeterince çok değişken çiftine bakarsan bazıları şansa korelasyonlu çıkar.\n\nNedensellik iddiası için ya deney (A/B testi) ya da nedensel çıkarım yöntemleri gerekir.",
              "Everyone knows the phrase; what matters is **why** it holds. There are three alternative explanations:\n\n1. **Reverse causation** — B may cause A. \"Customers who open many support tickets pay more\" — perhaps those who pay more simply use the product more.\n2. **A confounder** — a third factor drives both. Ice cream sales correlate with drownings; the cause is **temperature**.\n3. **Chance** — look at enough pairs of variables and some will correlate by luck.\n\nTo claim causation you need either an experiment (an A/B test) or causal inference methods.",
            ),
            quiz({
              id: "q6",
              q: [
                "\"Çok destek talebi açan müşteriler daha çok ödüyor\" korelasyonu bulunmuş. Bu hangi alternatif açıklamayla yanlış yorumlanabilir?",
                "A correlation is found: \"customers who open many support tickets pay more\". Which alternative explanation could make this misleading?",
              ],
              options: [
                [
                  "Ters yönlü nedensellik — belki de çok ödeyenler ürünü daha çok kullandığı için daha çok destek talep ediyor",
                  "Reverse causation — perhaps those who pay more simply use the product more, and that is why they open more tickets",
                ],
                ["Veri hatası", "A data error"],
                ["Örneklem çok küçük", "The sample is too small"],
                ["Ölçek düzeyi yanlış", "The scale of measurement is wrong"],
              ],
              answer: 0,
              explain: [
                "\"A, B'ye sebep oluyor\" sonucuna atlamadan önce tersini de düşünmek gerekir: burada yüksek ödeme, yoğun kullanıma ve dolayısıyla daha fazla destek talebine yol açıyor olabilir — sebep zinciri ters çalışıyor olabilir.",
                "Before jumping to \"A causes B\", you must consider the reverse: here, higher spending may drive heavier usage and therefore more tickets — the causal chain may run the other way.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Dondurma satışları ile boğulma vakaları arasında güçlü bir korelasyon var. Bunun gerçek sebebi nedir?",
                "There is a strong correlation between ice cream sales and drowning incidents. What is the real cause?",
              ],
              options: [
                [
                  "Sıcaklık — her ikisini de birlikte etkileyen bir karıştırıcı değişken",
                  "Temperature — a confounder that drives both at once",
                ],
                ["Dondurma yemek boğulma riskini artırır", "Eating ice cream increases drowning risk"],
                ["Boğulma vakaları dondurma satışını artırır", "Drowning incidents increase ice cream sales"],
                ["Tesadüf, hiçbir bağlantı yoktur", "Pure coincidence, there is no link at all"],
              ],
              answer: 0,
              explain: [
                "Sıcak havalarda hem dondurma satışları hem de yüzme (ve dolayısıyla boğulma riski) artar. Sıcaklık, ikisini de aynı anda etkileyen bir karıştırıcı değişkendir; dondurma ile boğulma arasında doğrudan bir bağ yoktur.",
                "In hot weather both ice cream sales and swimming (and therefore drowning risk) rise. Temperature is a confounder driving both at once; there is no direct link between ice cream and drowning.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Yeterince çok değişken çiftine bakarsan bazı korelasyonların sadece şansa %5 düzeyinde \"anlamlı\" çıkmasının sebebi nedir?",
                "Why do some correlations turn out \"significant\" at the 5% level purely by chance if you examine enough variable pairs?",
              ],
              options: [
                [
                  "Çok sayıda karşılaştırma yapıldığında, bazı çiftler yalnızca rastlantı sonucu güçlü korelasyon gösterir",
                  "When you run enough comparisons, some pairs will show a strong correlation purely by luck",
                ],
                ["Pearson formülü büyük veri setlerinde bozulur", "The Pearson formula breaks down on large datasets"],
                ["Bu yalnızca kategorik veride olur", "This only happens with categorical data"],
                ["Bu asla gerçekleşmez", "This never actually happens"],
              ],
              answer: 0,
              explain: [
                "Her karşılaştırmada şansla anlamlı çıkma ihtimali küçük de olsa vardır; onlarca, yüzlerce çift denediğinde bu küçük olasılıklar toplamda birkaç sahte \"anlamlı\" sonuç üretir.",
                "Each single comparison carries a small chance of looking significant by luck; test dozens or hundreds of pairs and those small chances add up to a few spurious \"significant\" results.",
              ],
            }),
            code(
              "python",
              `import numpy as np
from scipy import stats

reklam = np.array([10, 15, 22, 30, 18, 25, 40, 12])
satis  = np.array([120, 150, 190, 260, 175, 230, 320, 130])

r, p = stats.pearsonr(reklam, satis)
rho, p2 = stats.spearmanr(reklam, satis)

print(f"Pearson  r = {r:.3f}  (p = {p:.4f})")
print(f"Spearman rho = {rho:.3f}")

# r kareye alındığında "açıklanan varyans oranı" olur
print(f"Satıştaki değişimin %{r**2*100:.0f} kadarı reklamla birlikte hareket ediyor")`,
            ),
            quiz({
              id: "q9",
              q: [
                "r kareye alındığında (r²) ne anlama gelir?",
                "What does r squared (r²) represent?",
              ],
              options: [
                ["Bir değişkendeki değişimin diğeriyle birlikte açıklanan oranı", "The proportion of variation in one variable explained jointly with the other"],
                ["r'nin yönünü", "The direction of r"],
                ["Örneklem büyüklüğünü", "The sample size"],
                ["p-değerini", "The p-value"],
              ],
              answer: 0,
              explain: [
                "r'nin karesi, iki değişken arasındaki doğrusal ilişkinin, bir değişkendeki değişimin ne kadarını açıkladığını yüzde olarak verir; r = 0,8 ise r² = 0,64, yani değişimin %64'ü birlikte hareket ediyor demektir.",
                "Squaring r gives, as a percentage, how much of the variation in one variable the linear relationship accounts for; if r = 0.8, then r² = 0.64, meaning 64% of the variation moves together.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "İki değişken arasında r = 0 çıktı. Bu kesin olarak ne demektir?",
                "Two variables give r = 0. What does that definitely mean?",
              ],
              options: [
                [
                  "Aralarında **doğrusal** ilişki yoktur; eğrisel bir ilişki hâlâ olabilir",
                  "There is no **linear** relationship; a curved relationship may still exist",
                ],
                ["Aralarında hiçbir ilişki yoktur", "There is no relationship of any kind"],
                ["İki değişken bağımsızdır", "The two variables are independent"],
                ["Veri hatalıdır", "The data is faulty"],
              ],
              answer: 0,
              explain: [
                "Pearson yalnızca doğruya benzeyen ilişkileri ölçer. Mükemmel bir U şeklinde ilişkide r sıfıra yakın çıkar — ama ilişki son derece güçlüdür. Bu yüzden korelasyonu hesaplamadan önce daima **saçılım grafiğine bak**.",
                "Pearson only measures straight-line association. A perfect U-shaped relationship gives an r near zero — yet the relationship is extremely strong. This is why you should always **look at a scatter plot** before computing a correlation.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "İki değişken arasında güçlü bir korelasyon (r = 0,85) bulundu. Nedensellik iddia edebilmek için ne gerekir?",
                "A strong correlation (r = 0.85) is found between two variables. What is required before you can claim causation?",
              ],
              options: [
                [
                  "Bir deney (A/B testi) ya da uygun bir nedensel çıkarım yöntemi",
                  "An experiment (an A/B test) or a proper causal inference method",
                ],
                ["r'nin 0,9'un üzerinde olması yeterlidir", "It is enough for r to exceed 0.9"],
                ["Daha fazla veri toplamak yeterlidir", "Simply collecting more data is enough"],
                ["Hiçbir ek adım gerekmez, korelasyon yeterlidir", "No further step is needed, correlation is enough"],
              ],
              answer: 0,
              explain: [
                "Korelasyon ne kadar güçlü olursa olsun, ters yönlü nedensellik, karıştırıcı değişken veya rastlantı gibi alternatifleri eleyemez; nedensellik iddiası ancak rastgele atamalı bir deney ya da nedensel çıkarım yöntemiyle desteklenebilir.",
                "However strong the correlation, it cannot rule out reverse causation, a confounder or chance; a causal claim needs the support of a randomised experiment or a proper causal inference method.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "mid",
      title: L("Olasılık ve çıkarım", "Probability and inference"),
      description: L(
        "Örneklemden evrene geçmek: normal dağılım, örnekleme yanlılığı ve güven aralığı.",
        "Getting from a sample to a population: the normal distribution, sampling bias and confidence intervals.",
      ),
      projectSlug: "istatistik-ab-testi",
      lessons: [
        lesson({
          slug: "normal-dagilim-ve-z-skoru",
          title: L("Normal dağılım ve z-skoru", "The normal distribution and z-scores"),
          summary: L(
            "Neden bu kadar çok şey çan eğrisine benziyor ve bir değer ne kadar sıra dışı?",
            "Why do so many things look like a bell curve, and how unusual is a given value?",
          ),
          minutes: 16,
          blocks: [
            text(
              "**Normal dağılım**, ortalaması etrafında simetrik, çan biçimli dağılımdır. İki sayıyla tamamen tanımlanır: ortalama (μ) ve standart sapma (σ).\n\n**68-95-99,7 kuralı** — normal bir dağılımda değerlerin:\n\n- %68'i ortalamadan ±1σ içinde\n- %95'i ±2σ içinde\n- %99,7'si ±3σ içinde\n\nBu kural, bir değerin sıra dışı olup olmadığını kafadan hesaplamanı sağlar. Ortalaması 100, sapması 15 olan bir ölçümde 145 gördüysen, bu +3σ demektir: binde üçlük bir olay.",
              "The **normal distribution** is the symmetric, bell-shaped distribution around its mean. Two numbers define it completely: the mean (μ) and the standard deviation (σ).\n\n**The 68-95-99.7 rule** — in a normal distribution:\n\n- 68% of values lie within ±1σ of the mean\n- 95% within ±2σ\n- 99.7% within ±3σ\n\nThis rule lets you judge in your head whether a value is unusual. If a measurement with mean 100 and deviation 15 shows 145, that is +3σ: a three-in-a-thousand event.",
            ),
            quiz({
              id: "q1",
              q: [
                "68-95-99,7 kuralına göre normal bir dağılımda değerlerin yaklaşık yüzde kaçı ortalamadan ±1σ içindedir?",
                "Under the 68-95-99.7 rule, roughly what percentage of values in a normal distribution lie within ±1σ of the mean?",
              ],
              options: [
                ["%68", "68%"],
                ["%95", "95%"],
                ["%99,7", "99.7%"],
                ["%50", "50%"],
              ],
              answer: 0,
              explain: [
                "Kuralın ilk basamağı budur: normal dağılımda değerlerin yaklaşık %68'i ortalamadan bir standart sapma uzaklığın içinde kalır.",
                "This is the first step of the rule: in a normal distribution, roughly 68% of values fall within one standard deviation of the mean.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "68-95-99,7 kuralına göre değerlerin yaklaşık yüzde kaçı ortalamadan ±2σ içindedir?",
                "Under the 68-95-99.7 rule, roughly what percentage of values lie within ±2σ of the mean?",
              ],
              options: [
                ["%95", "95%"],
                ["%68", "68%"],
                ["%99,7", "99.7%"],
                ["%75", "75%"],
              ],
              answer: 0,
              explain: [
                "İki standart sapma genişliğinde bir aralık, normal dağılımdaki değerlerin yaklaşık %95'ini kapsar — anket ve deney sonuçlarında sıkça görülen %95 güven aralığının da kökeni budur.",
                "A band two standard deviations wide covers roughly 95% of the values in a normal distribution — this is also the origin of the 95% confidence interval seen so often in surveys and experiments.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir ölçümün ortalaması 100, standart sapması 15. 145 değeri görüldüğünde, bu kaç standart sapma uzaklıktadır ve ne kadar sıra dışıdır?",
                "A measurement has mean 100 and standard deviation 15. A value of 145 is observed. How many standard deviations away is this, and how unusual is it?",
              ],
              options: [
                ["+3σ, yaklaşık binde üçlük bir olay", "+3σ, roughly a three-in-a-thousand event"],
                ["+1σ, oldukça sık görülen bir olay", "+1σ, a fairly common event"],
                ["+2σ, yaklaşık %5'lik bir olay", "+2σ, roughly a 5% event"],
                ["0σ, tam ortalama değeri", "0σ, exactly the mean"],
              ],
              answer: 0,
              explain: [
                "`(145 − 100) / 15 = 3`, yani +3σ. 68-95-99,7 kuralına göre değerlerin %99,7'si ±3σ içindedir, dolayısıyla bunun dışında kalmak yaklaşık binde üçlük, oldukça nadir bir olaydır.",
                "`(145 − 100) / 15 = 3`, so +3σ. The 68-95-99.7 rule says 99.7% of values lie within ±3σ, so falling outside that band is roughly a three-in-a-thousand, fairly rare event.",
              ],
            }),
            text(
              "**Z-skoru**, bir değerin ortalamadan kaç standart sapma uzakta olduğudur:\n\n`z = (değer − ortalama) / standart sapma`\n\nZ-skoru, farklı birimlerdeki değerleri karşılaştırılabilir kılar. Matematikten 80, edebiyattan 70 alan öğrenci hangisinde daha başarılıdır? Sınıf ortalamaları ve sapmaları farklıysa ham not bunu söyleyemez; z-skoru söyler.",
              "A **z-score** is how many standard deviations a value sits from the mean:\n\n`z = (value − mean) / standard deviation`\n\nZ-scores make values in different units comparable. A student scoring 80 in maths and 70 in literature — which did they do better in? If the class means and deviations differ, the raw marks cannot tell you; the z-score can.",
            ),
            quiz({
              id: "q4",
              q: [
                "Z-skoru formülü nedir?",
                "What is the z-score formula?",
              ],
              options: [
                ["`(değer − ortalama) / standart sapma`", "`(value − mean) / standard deviation`"],
                ["`değer × ortalama`", "`value × mean`"],
                ["`(değer − ortalama)²`", "`(value − mean)²`"],
                ["`ortalama / standart sapma`", "`mean / standard deviation`"],
              ],
              answer: 0,
              explain: [
                "Z-skoru, bir değerin ortalamadan farkını alıp bunu standart sapma birimine böler; böylece \"kaç standart sapma uzakta\" sorusuna doğrudan cevap verir.",
                "The z-score takes a value's distance from the mean and divides it by the standard deviation, directly answering \"how many standard deviations away is it?\"",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Matematikten 80, edebiyattan 70 alan bir öğrencinin hangi derste daha başarılı olduğunu ham notlarla neden doğrudan söyleyemezsin?",
                "Why can't you tell directly from raw scores which subject a student — who got 80 in maths and 70 in literature — did better in?",
              ],
              options: [
                [
                  "İki sınavın ortalaması ve standart sapması farklı olabilir; ham not bu farkı hesaba katmaz",
                  "The two exams may have different means and standard deviations, and the raw score ignores that difference",
                ],
                ["Notlar farklı ölçek düzeyindedir", "The scores are on different scales of measurement"],
                ["80 her zaman 70'ten iyidir, karşılaştırmaya gerek yoktur", "80 is always better than 70, no comparison is needed"],
                ["Ham notlar nominal veridir", "Raw scores are nominal data"],
              ],
              answer: 0,
              explain: [
                "Bir sınıfta 80 ortalamanın çok üzerinde, diğerinde ortalamaya yakın olabilir. Z-skoru, her notu kendi sınıfının ortalama ve sapmasına göre standartlaştırarak adil bir karşılaştırma sağlar.",
                "An 80 might be far above one class's average while close to another's. The z-score standardises each score against its own class's mean and deviation, enabling a fair comparison.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Bir değerin z-skoru negatif çıktı. Bu ne anlama gelir?",
                "A value's z-score comes out negative. What does this mean?",
              ],
              options: [
                ["Değer, ortalamanın altındadır", "The value is below the mean"],
                ["Değer, ortalamanın üstündedir", "The value is above the mean"],
                ["Hesaplama hatalıdır", "The calculation is wrong"],
                ["Değer negatif bir sayıdır", "The value itself is a negative number"],
              ],
              answer: 0,
              explain: [
                "Z-skorunun işareti, `(değer − ortalama)` farkının işaretinden gelir; değer ortalamadan küçükse fark negatiftir, dolayısıyla z-skoru da negatif çıkar — değerin kendisi negatif olmasa bile.",
                "The sign of the z-score comes from the sign of `(value − mean)`; if the value is below the mean, that difference is negative, so the z-score is negative too — even if the value itself is positive.",
              ],
            }),
            info(
              "Her şey normal dağılmaz",
              "Not everything is normally distributed",
              "Normal dağılım, birbirinden bağımsız birçok küçük etkinin toplandığı durumlarda ortaya çıkar — boy, ölçüm hatası, üretim toleransı gibi.\n\nAma iş dünyasındaki birçok değişken normal **değildir**: gelir, sipariş tutarı, şirket büyüklüğü ve web sitesi oturum süresi sağa çarpıktır; bunlarda ortalama ile medyan farklıdır ve 68-95-99,7 kuralı geçerli olmaz. Bir yönteme başlamadan önce dağılımın gerçekten normal olup olmadığını histogram veya Q-Q grafiği ile kontrol et.",
              "The normal distribution arises when many small independent effects add up — height, measurement error, manufacturing tolerance.\n\nBut many business variables are **not** normal: income, order value, company size and session duration are right-skewed; for those the mean differs from the median and the 68-95-99.7 rule does not hold. Before applying a method, check whether the distribution really is normal using a histogram or a Q-Q plot.",
            ),
            quiz({
              id: "q7",
              q: [
                "Gelir, sipariş tutarı, şirket büyüklüğü gibi iş dünyası değişkenleri genellikle hangi şekle sahiptir?",
                "What shape do business variables like income, order value and company size typically have?",
              ],
              options: [
                ["Sağa çarpık — normal dağılmazlar", "Right-skewed — they are not normally distributed"],
                ["Kusursuz normal (çan eğrisi)", "Perfectly normal (bell-shaped)"],
                ["Sola çarpık", "Left-skewed"],
                ["Tamamen rastgele, şekilsiz", "Completely random with no shape"],
              ],
              answer: 0,
              explain: [
                "Bu değişkenlerde çoğu gözlem düşük-orta bölgede toplanır, az sayıda çok büyük değer ise uzun bir sağ kuyruk oluşturur; bu yüzden ortalama medyandan büyük çıkar ve 68-95-99,7 kuralı geçerli olmaz.",
                "In these variables most observations cluster in the low-to-mid range while a few very large values create a long right tail; the mean ends up above the median and the 68-95-99.7 rule does not apply.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bir dağılımın gerçekten normal olup olmadığını kontrol etmenin pratik bir yolu nedir?",
                "What is a practical way to check whether a distribution is actually normal?",
              ],
              options: [
                ["Histogram veya Q-Q grafiğine bakmak", "Look at a histogram or a Q-Q plot"],
                ["Yalnızca ortalamayı hesaplamak", "Just compute the mean"],
                ["Veri setinin boyutuna bakmak", "Look at the size of the dataset"],
                ["Sütun adını kontrol etmek", "Check the column's name"],
              ],
              answer: 0,
              explain: [
                "Histogram, dağılımın çan şeklinde olup olmadığını gözle görmeni sağlar; Q-Q grafiği ise veriyi teorik normal dağılımla karşılaştırıp sapmaları daha keskin ortaya koyar.",
                "A histogram lets you see by eye whether the shape is bell-like; a Q-Q plot compares the data against a theoretical normal distribution and exposes deviations more sharply.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Sağa çarpık bir değişkene (örneğin oturum süresi) 68-95-99,7 kuralını uygularsan ne olur?",
                "What happens if you apply the 68-95-99.7 rule to a right-skewed variable, like session duration?",
              ],
              options: [
                [
                  "Kural geçerli olmaz; ortalama ile medyan farklı olduğu için tahminler yanıltıcı çıkar",
                  "The rule does not hold; since the mean and median differ, the resulting estimates are misleading",
                ],
                ["Kural her zaman doğru çalışır", "The rule always works correctly regardless of shape"],
                ["Kural yalnızca daha hassas hâle gelir", "The rule simply becomes more precise"],
                ["Standart sapma hesaplanamaz hâle gelir", "The standard deviation becomes impossible to compute"],
              ],
              answer: 0,
              explain: [
                "68-95-99,7 kuralı simetrik, çan biçimli bir dağılım varsayar. Çarpık bir dağılımda ortalama ile medyan ayrışır ve ±1σ, ±2σ aralıkları artık gerçek yüzdeleri yansıtmaz.",
                "The 68-95-99.7 rule assumes a symmetric, bell-shaped distribution. In a skewed distribution the mean and median diverge, and the ±1σ, ±2σ bands no longer reflect the true percentages.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Bir sınavın ortalaması 65, standart sapması 12. `ogrenci_notu` 89 için `z` skorunu hesapla ve yuvarlanmış hâlini `sapma_sayisi` değişkenine yaz.",
                "An exam has mean 65 and standard deviation 12. Compute the `z` score for `ogrenci_notu` 89 and store its rounded value in `sapma_sayisi`.",
              ],
              starter: `ortalama = 65
std = 12
ogrenci_notu = 89

z =
sapma_sayisi = `,
              solution: `ortalama = 65
std = 12
ogrenci_notu = 89

z = (ogrenci_notu - ortalama) / std
sapma_sayisi = round(z)
print(z, sapma_sayisi)`,
              hint: [
                "Formül: `(değer - ortalama) / std`. Yuvarlamak için `round()` kullan.",
                "The formula is `(value - mean) / std`. Use `round()` to round it.",
              ],
              checks: [
                {
                  code: "abs(float(z) - 2.0) < 0.001",
                  msg: ["z skoru 2.0 olmalı", "The z-score must be 2.0"],
                },
                {
                  code: "int(sapma_sayisi) == 2",
                  msg: ["Yuvarlanmış sapma 2 olmalı", "The rounded deviation must be 2"],
                },
              ],
              xp: 35,
            }),
          ],
        }),
        lesson({
          slug: "orneklem-ve-yanlilik",
          title: L("Örnekleme ve yanlılık", "Sampling and bias"),
          summary: L(
            "En büyük veri seti bile yanlış toplanmışsa yanlış cevap verir.",
            "Even the largest dataset gives the wrong answer if it was collected the wrong way.",
          ),
          minutes: 16,
          blocks: [
            text(
              "**Evren (popülasyon)** hakkında bilmek istediğin şeyi, elindeki **örneklem** üzerinden tahmin edersin. Bu ancak örneklem evreni temsil ediyorsa işe yarar.\n\n**En sık görülen yanlılık türleri:**\n\n- **Seçim yanlılığı** — örneklem rastgele değil. Yalnızca uygulamayı hâlâ kullananlara anket yaparsan, ayrılanların neden ayrıldığını asla öğrenemezsin.\n- **Hayatta kalan yanlılığı** — yalnızca başarılı olanları görürsün. \"Girişimcilerin %70'i üniversiteyi bitirmemiş\" verisi, bitirmeyip başarısız olanları saymaz.\n- **Gönüllü yanlılığı** — ankete cevap verenler, vermeyenlerden sistematik olarak farklıdır. Çok memnun ve çok kızgın olanlar cevap verir; ortadakiler sessizdir.\n- **Ölçüm yanlılığı** — soru cevabı yönlendirir. \"Bu harika özelliği beğendiniz mi?\"",
              "You estimate what you want to know about a **population** through the **sample** you hold. That only works if the sample represents the population.\n\n**The most common kinds of bias:**\n\n- **Selection bias** — the sample is not random. Survey only the people still using your app and you will never learn why the leavers left.\n- **Survivorship bias** — you see only the successes. The claim \"70% of entrepreneurs never finished university\" does not count those who dropped out and failed.\n- **Non-response bias** — those who answer a survey differ systematically from those who do not. The delighted and the furious reply; the middle stays silent.\n- **Measurement bias** — the question leads the answer. \"Did you enjoy this wonderful feature?\"",
            ),
            quiz({
              id: "q2",
              q: [
                "\"Girişimcilerin %70'i üniversiteyi bitirmemiş\" istatistiği hangi yanlılık türüne örnektir?",
                "The statistic \"70% of entrepreneurs never finished university\" is an example of which bias?",
              ],
              options: [
                [
                  "Hayatta kalan yanlılığı — üniversiteyi bitirmeyip başarısız olanlar sayılmamış",
                  "Survivorship bias — those who dropped out and failed are not counted",
                ],
                ["Ölçüm yanlılığı", "Measurement bias"],
                ["Gönüllü yanlılığı", "Non-response bias"],
                ["Seçim yanlılığı", "Selection bias"],
              ],
              answer: 0,
              explain: [
                "Bu istatistik yalnızca başarılı olmuş girişimcileri sayar; üniversiteyi bitirmeyip başarısız olan çok daha kalabalık grup görünmez kaldığı için gerçek tabloyu vermez.",
                "This statistic only counts entrepreneurs who succeeded; the far larger group who dropped out and failed remains invisible, so it does not give the true picture.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir üründe çok memnun ve çok kızgın kullanıcılar ankete cevap veriyor, ortadakiler sessiz kalıyor. Bu hangi yanlılık türüdür?",
                "For a product, the delighted and the furious users answer the survey while those in the middle stay silent. Which bias is this?",
              ],
              options: [
                ["Gönüllü yanlılığı", "Non-response bias"],
                ["Ölçüm yanlılığı", "Measurement bias"],
                ["Hayatta kalan yanlılığı", "Survivorship bias"],
                ["Bu bir yanlılık değildir", "This is not a bias at all"],
              ],
              answer: 0,
              explain: [
                "Ankete kimin cevap verdiği rastgele değildir; duygusal olarak uçlarda olanlar cevap verme motivasyonuna sahiptir, ortadaki sessiz çoğunluk temsil edilmez.",
                "Who answers a survey is not random; people at the emotional extremes are motivated to respond, while the silent middle majority goes unrepresented.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "\"Bu harika özelliği beğendiniz mi?\" sorusu hangi yanlılık türüne örnektir?",
                "The question \"Did you enjoy this wonderful feature?\" is an example of which bias?",
              ],
              options: [
                ["Ölçüm yanlılığı — soru cevabı yönlendiriyor", "Measurement bias — the question leads the answer"],
                ["Seçim yanlılığı", "Selection bias"],
                ["Hayatta kalan yanlılığı", "Survivorship bias"],
                ["Gönüllü yanlılığı", "Non-response bias"],
              ],
              answer: 0,
              explain: [
                "Soru zaten \"harika\" sıfatını içeriyor; bu, cevap verenin nesnel bir değerlendirme yapmasını değil, sorunun ima ettiği olumlu tona uymasını teşvik eder.",
                "The question already contains the word \"wonderful\"; this nudges the respondent toward matching the question's positive tone rather than giving an objective assessment.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Bir örneklemden evren hakkında geçerli bir tahmin yapabilmen için temel koşul nedir?",
                "What is the basic condition that lets you make a valid estimate about a population from a sample?",
              ],
              options: [
                ["Örneklemin evreni temsil etmesi", "The sample must represent the population"],
                ["Örneklemin çok büyük olması", "The sample must be very large"],
                ["Örneklemin yalnızca sayısal veri içermesi", "The sample must contain only numeric data"],
                ["Örneklemin evrenle aynı büyüklükte olması", "The sample must be the same size as the population"],
              ],
              answer: 0,
              explain: [
                "Tahminin geçerliliği örneklemin büyüklüğünden değil, evreni ne kadar iyi temsil ettiğinden gelir; temsil etmeyen dev bir örneklem bile yanlış sonuç verir.",
                "The validity of an estimate comes not from the sample's size but from how well it represents the population; even a huge unrepresentative sample gives the wrong answer.",
              ],
            }),
            info(
              "Büyük veri yanlılığı çözmez, gizler",
              "Big data does not fix bias — it hides it",
              "1936 ABD başkanlık seçiminde bir dergi **2,4 milyon** kişiye anket yaptı ve seçimi yanlış tahmin etti. Aynı yıl Gallup **50 bin** kişiyle doğru tahmin etti.\n\nFark örneklem büyüklüğü değil, yöntemdi: dergi listesini telefon rehberi ve otomobil kayıtlarından almıştı — Büyük Buhran yıllarında telefonu ve arabası olanlar zaten daha varlıklı ve sistematik olarak farklı oy veren kesimdi.\n\nÖrneklem yanlıysa, büyütmek yalnızca yanlış cevaba **daha dar bir güven aralığı** verir. Yani daha emin şekilde yanılırsın.",
              "In the 1936 US presidential election a magazine polled **2.4 million** people and got the result wrong. That same year Gallup polled **50,000** and got it right.\n\nThe difference was not sample size but method: the magazine drew its list from telephone directories and car registrations — and during the Great Depression, people who owned phones and cars were wealthier and voted systematically differently.\n\nIf the sample is biased, enlarging it only gives you a **narrower confidence interval around the wrong answer**. You become more confidently wrong.",
            ),
            quiz({
              id: "q6",
              q: [
                "1936 seçiminde dergi 2,4 milyon, Gallup 50 bin kişiyle anket yaptı. Doğru tahmini yapan Gallup'tu. Bunun temel sebebi neydi?",
                "In the 1936 election a magazine polled 2.4 million people and Gallup polled 50,000; Gallup got it right. What was the fundamental reason?",
              ],
              options: [
                [
                  "Örneklem yöntemi (temsiliyet) örneklem büyüklüğünden daha önemliydi",
                  "The sampling method (representativeness) mattered more than sample size",
                ],
                ["Gallup daha fazla soru sordu", "Gallup asked more questions"],
                ["50 bin her zaman 2,4 milyondan daha iyi bir sayıdır", "50,000 is always a better number than 2.4 million"],
                ["Dergi anketi çok kısa sürede yapıldı", "The magazine's survey was conducted too quickly"],
              ],
              answer: 0,
              explain: [
                "Dergi büyük ama yanlı bir listeden örneklem çekmişti; Gallup daha küçük ama evreni daha iyi temsil eden bir örneklem kullandı. Bu, örneklem büyüklüğünün tek başına yeterli olmadığının klasik kanıtıdır.",
                "The magazine drew a large but biased list; Gallup used a smaller sample that represented the population better. This is the classic proof that sample size alone is not enough.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Derginin 1936'daki örneklem listesi (telefon rehberi ve otomobil kayıtları) neden yanlıydı?",
                "Why was the magazine's 1936 sampling list (phone directories and car registrations) biased?",
              ],
              options: [
                [
                  "O dönemde telefon ve araba sahibi olanlar daha varlıklıydı ve sistematik olarak farklı oy veriyordu",
                  "At the time, phone and car owners were wealthier and voted systematically differently",
                ],
                ["Telefon rehberleri o dönemde mevcut değildi", "Phone directories did not exist at the time"],
                ["Liste çok küçüktü", "The list was too small"],
                ["Otomobil sahipleri oy kullanamıyordu", "Car owners were not allowed to vote"],
              ],
              answer: 0,
              explain: [
                "Büyük Buhran yıllarında telefon ve araba sahibi olmak varlıklı bir azınlığın göstergesiydi; bu grup nüfusun geri kalanından sistematik olarak farklı oy verdiği için örneklem evreni temsil etmedi.",
                "During the Great Depression, owning a phone or car marked a wealthier minority; this group voted systematically differently from the rest of the population, so the sample failed to represent it.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Örneklem yanlıysa, örneklemi büyütmek soruna nasıl yardımcı olur (ya da olmaz)?",
                "If the sample is biased, how does enlarging it help (or not help) the problem?",
              ],
              options: [
                [
                  "Yardımcı olmaz — yalnızca yanlış cevap etrafında daha dar bir güven aralığı verir, yani daha emin şekilde yanılırsın",
                  "It does not help — it only narrows the confidence interval around the wrong answer, making you more confidently wrong",
                ],
                ["Yanlılığı otomatik olarak düzeltir", "It automatically corrects the bias"],
                ["Yanlılığı yarıya indirir", "It halves the bias"],
                ["Sonucu rastgele hâle getirir", "It makes the result random"],
              ],
              answer: 0,
              explain: [
                "Örneklem büyüklüğü yalnızca tesadüfi hatayı azaltır, sistematik yanlılığı değil. Yanlı bir örneklemi büyütmek, aynı yanlış cevaba daha fazla \"güven\" duymana yol açar.",
                "Sample size only reduces random error, not systematic bias. Enlarging a biased sample just makes you more \"confident\" about the same wrong answer.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Uygulamandaki anket yalnızca uygulamayı açanlara gösteriliyor. Memnuniyet %85 çıktı. Sorun nedir?",
                "Your in-app survey is shown only to people who open the app. Satisfaction comes out at 85%. What is the problem?",
              ],
              options: [
                [
                  "Ayrılmış ve memnuniyetsiz kullanıcılar ankete hiç ulaşamıyor; sonuç yukarı yanlı",
                  "Churned and dissatisfied users never see the survey, so the result is biased upward",
                ],
                ["Örneklem çok küçük", "The sample is too small"],
                ["Soru yanlış yazılmış", "The question is badly worded"],
                ["Hiçbir sorun yok", "There is no problem"],
              ],
              answer: 0,
              explain: [
                "Bu klasik hayatta kalan yanlılığıdır: en memnuniyetsiz kullanıcılar zaten uygulamayı silmiştir, dolayısıyla ankette temsil edilmezler. Gerçek memnuniyeti ölçmek için ayrılan kullanıcılara e-posta ile ulaşmak gerekir.",
                "This is classic survivorship bias: the most dissatisfied users have already deleted the app and so are not represented in the survey at all. To measure real satisfaction you must reach churned users by email.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Seçim yanlılığından (selection bias) kaçınmanın en temel yolu nedir?",
                "What is the most fundamental way to avoid selection bias?",
              ],
              options: [
                [
                  "Örneklemi evrenin tamamını temsil edecek şekilde, mümkünse rastgele toplamak",
                  "Gather the sample so it represents the whole population, ideally at random",
                ],
                ["Örneklemi olabildiğince büyük tutmak", "Keep the sample as large as possible"],
                ["Yalnızca aktif kullanıcılara sormak", "Only ask active users"],
                ["Anketi kısa tutmak", "Keep the survey short"],
              ],
              answer: 0,
              explain: [
                "Seçim yanlılığının kökü, kimin örnekleme girdiğinin rastgele olmamasıdır; çözüm, veri toplama sürecini evrenin tamamına eşit şans tanıyacak şekilde tasarlamaktır — büyüklük bunu düzeltmez.",
                "Selection bias stems from who ends up in the sample not being random; the fix is to design data collection so the whole population has an equal chance of inclusion — size alone will not fix it.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir anket sorusunu \"Bu mükemmel özelliği ne kadar sevdiniz?\" şeklinde yazarsan hangi yanlılık riskini almış olursun?",
                "If you phrase a survey question as \"How much did you love this amazing feature?\", which bias risk are you taking on?",
              ],
              options: [
                ["Ölçüm yanlılığı — soru olumlu cevaba yönlendiriyor", "Measurement bias — the question steers respondents toward a positive answer"],
                ["Hayatta kalan yanlılığı", "Survivorship bias"],
                ["Seçim yanlılığı", "Selection bias"],
                ["Bu soru tamamen tarafsızdır", "This question is completely unbiased"],
              ],
              answer: 0,
              explain: [
                "Sorunun içine yerleştirilen \"mükemmel\" gibi sıfatlar, cevap verenin nesnel değerlendirmesini değil, sorunun ima ettiği olumlu tonu yansıtmasına yol açar; bu klasik bir ölçüm yanlılığıdır.",
                "Loading the question with words like \"amazing\" pushes respondents to mirror the question's implied positive tone rather than give an objective rating — a classic case of measurement bias.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "dagilimlar-ve-guven-araligi",
          title: L("Dağılımlar ve güven aralığı", "Distributions and confidence intervals"),
          summary: L(
            "Elindeki örneklem, evren hakkında ne kadar şey söyleyebilir?",
            "How much can your sample tell you about the population?",
          ),
          minutes: 18,
          blocks: [
            text(
              "**Merkezi limit teoremi**, istatistiğin en kullanışlı sonucudur: evrenin dağılımı ne olursa olsun, yeterince büyük örneklemlerin **ortalamaları** normal dağılıma yaklaşır. Bu yüzden bir anketten çıkan ortalamaya güven aralığı hesaplayabiliriz.",
              "The **central limit theorem** is statistics' most useful result: whatever the population's distribution, the **means** of sufficiently large samples approach a normal distribution. That is why we can attach a confidence interval to an average from a survey.",
            ),
            quiz({
              id: "q2",
              q: [
                "Merkezi limit teoremi ne söyler?",
                "What does the central limit theorem say?",
              ],
              options: [
                [
                  "Evrenin dağılımı ne olursa olsun, yeterince büyük örneklemlerin ortalamaları normal dağılıma yaklaşır",
                  "Whatever the population's distribution, the means of sufficiently large samples approach a normal distribution",
                ],
                ["Her evren dağılımı normaldir", "Every population distribution is normal"],
                ["Örneklem ortalaması her zaman evren ortalamasına eşittir", "The sample mean always equals the population mean exactly"],
                ["Küçük örneklemler büyük örneklemlerden daha güvenilirdir", "Small samples are more reliable than large ones"],
              ],
              answer: 0,
              explain: [
                "Teoremin gücü tam olarak burada: evrenin kendisi çarpık ya da tuhaf şekilli olsa bile, aldığın örneklemlerin ortalamaları yeterince büyük n için normale yaklaşır.",
                "The theorem's power lies exactly here: even if the population itself is skewed or oddly shaped, the means of your samples approach normality once n is large enough.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Merkezi limit teoremi pratikte neden bu kadar kullanışlıdır?",
                "Why is the central limit theorem so useful in practice?",
              ],
              options: [
                [
                  "Evrenin gerçek dağılımını bilmesen bile örneklem ortalamasına güven aralığı hesaplamana izin verir",
                  "It lets you compute a confidence interval for a sample mean even without knowing the population's true distribution",
                ],
                ["Örneklem büyüklüğü ihtiyacını ortadan kaldırır", "It removes the need for any sample size at all"],
                ["Yalnızca normal evrenlerde çalışır", "It only works when the population is already normal"],
                ["Aykırı değerleri otomatik olarak temizler", "It automatically cleans outliers from the data"],
              ],
              answer: 0,
              explain: [
                "Normal dağılımın kuyruk olasılıklarını bildiğimiz için, örneklem ortalaması normale yaklaştığında o bilgiyi kullanıp aralık hesaplayabiliriz — evrenin kendi şeklini bilmeye gerek kalmaz.",
                "Because we know the tail probabilities of a normal distribution, once the sample mean approaches normality we can use that knowledge to compute an interval — without ever needing to know the population's own shape.",
              ],
            }),
            text(
              "**%95 güven aralığı** şu anlama gelir: aynı yöntemle 100 kez örneklem alsaydın, hesapladığın aralıkların yaklaşık 95'i gerçek evren değerini içerirdi.\n\nYaygın yanlış okuma: \"gerçek değerin bu aralıkta olma olasılığı %95\". Gerçek değer sabittir; rastgele olan senin aralığındır.",
              "A **95% confidence interval** means this: if you drew 100 samples the same way, roughly 95 of the intervals you computed would contain the true population value.\n\nThe common misreading is \"there is a 95% chance the true value lies in this interval\". The true value is fixed; it is your interval that is random.",
            ),
            quiz({
              id: "q4",
              q: [
                "%95 güven aralığının doğru anlamı nedir?",
                "What is the correct interpretation of a 95% confidence interval?",
              ],
              options: [
                [
                  "Aynı yöntemle 100 kez örneklem alsaydın, hesapladığın aralıkların yaklaşık 95'i gerçek evren değerini içerirdi",
                  "If you drew 100 samples the same way, roughly 95 of the intervals you computed would contain the true population value",
                ],
                ["Gerçek değerin bu aralıkta olma olasılığı %95'tir", "There is a 95% chance the true value lies in this specific interval"],
                ["Verinin %95'i bu aralığın içindedir", "95% of the data itself falls inside this interval"],
                ["Ölçümün %95 doğru olduğu anlamına gelir", "It means the measurement is 95% accurate"],
              ],
              answer: 0,
              explain: [
                "Güven aralığı, tekrarlanan örneklem alma sürecinin uzun vadeli davranışıyla ilgilidir; her bir aralık gerçek değeri ya içerir ya içermez, ama süreç %95 oranında başarılı aralıklar üretir.",
                "A confidence interval describes the long-run behaviour of the sampling process; any single interval either contains the true value or it does not, but the process succeeds about 95% of the time.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "\"Gerçek değerin bu aralıkta olma olasılığı %95'tir\" cümlesi neden yanlış bir okumadır?",
                "Why is \"there is a 95% chance the true value lies in this interval\" a misreading?",
              ],
              options: [
                [
                  "Gerçek evren değeri sabittir, olasılıksal olan senin hesapladığın aralıktır",
                  "The true population value is fixed; what is probabilistic is the interval you calculated",
                ],
                ["Çünkü gerçek değer hiçbir zaman bilinemez", "Because the true value can never be known at all"],
                ["Çünkü %95 çok yüksek bir orandır", "Because 95% is too high a figure to be meaningful"],
                ["Bu cümle aslında doğrudur", "This statement is actually correct"],
              ],
              answer: 0,
              explain: [
                "Evrendeki gerçek ortalama tek ve sabit bir sayıdır, rastgele değildir. Rastgele olan, senin çektiğin örnekleme bağlı olarak değişen aralığın kendisidir.",
                "The true population mean is a single, fixed number — it is not random. What is random is the interval itself, which varies depending on the particular sample you happened to draw.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Bir güven aralığı hesabında rastgele olan tam olarak nedir?",
                "In a confidence interval calculation, what exactly is the random element?",
              ],
              options: [
                ["Örneklemden hesaplanan aralığın kendisi (sınırları)", "The interval computed from the sample — its bounds"],
                ["Evrendeki gerçek parametre", "The true parameter in the population"],
                ["Kullanılan güven düzeyi (%95)", "The confidence level used (95%)"],
                ["Örneklem büyüklüğü formülü", "The sample size formula"],
              ],
              answer: 0,
              explain: [
                "Farklı bir örneklem çekseydin, alt ve üst sınırlar değişirdi — bu yüzden rastgelelik aralığın sınırlarındadır, evrendeki sabit gerçek değerde değil.",
                "Draw a different sample and the lower and upper bounds would change — so the randomness lives in the interval's bounds, not in the fixed true value out in the population.",
              ],
            }),
            code(
              "python",
              `import numpy as np
from scipy import stats

ornek = np.array([12.1, 11.8, 13.2, 12.9, 12.4, 11.5, 13.8, 12.2])

ortalama = ornek.mean()
hata = stats.sem(ornek)                      # standart hata
alt, ust = stats.t.interval(0.95, len(ornek) - 1, ortalama, hata)

print(f"Ortalama: {ortalama:.2f}  %95 GA: [{alt:.2f}, {ust:.2f}]")`,
            ),
            quiz({
              id: "q7",
              q: [
                "Kodda `stats.sem(ornek)` tam olarak neyi hesaplar?",
                "In the code, what does `stats.sem(ornek)` compute exactly?",
              ],
              options: [
                [
                  "Örneklem ortalamasının standart hatasını (standart sapma / √n)",
                  "The standard error of the sample mean (standard deviation / √n)",
                ],
                ["Örneklemin standart sapmasını", "The sample's standard deviation"],
                ["Örneklem ortalamasını", "The sample mean"],
                ["Güven düzeyini (%95)", "The confidence level (95%)"],
              ],
              answer: 0,
              explain: [
                "`sem` \"standard error of the mean\" kısaltmasıdır — ortalamanın örneklemden örnekleme ne kadar değiştiğini tahmin eder ve güven aralığının genişliğini belirleyen temel bileşendir.",
                "`sem` stands for \"standard error of the mean\" — it estimates how much the mean would vary from sample to sample, and it is the key ingredient that sets the width of the confidence interval.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Kod neden normal dağılım yerine t dağılımını (`stats.t.interval`) kullanıyor?",
                "Why does the code use the t-distribution (`stats.t.interval`) instead of the normal distribution?",
              ],
              options: [
                [
                  "Örneklem küçük (n=8) ve evrenin gerçek standart sapması bilinmiyor; t dağılımı bu ek belirsizliği hesaba katıp daha kalın kuyruklu bir aralık verir",
                  "The sample is small (n=8) and the population's true standard deviation is unknown; the t-distribution accounts for that extra uncertainty with fatter tails",
                ],
                ["t dağılımı hesaplaması daha hızlıdır", "The t-distribution is faster to compute"],
                ["Sonuç aynı olduğu için fark etmez", "It makes no difference, the result is identical"],
                ["Veri kategoriktir", "The data is categorical"],
              ],
              answer: 0,
              explain: [
                "Standart sapmayı da örneklemden tahmin ettiğimiz için ekstra bir belirsizlik kaynağı vardır; t dağılımı bunu telafi etmek için normalden daha kalın kuyruklara sahiptir, özellikle küçük n'de.",
                "Because we are also estimating the standard deviation from the sample, there is an extra source of uncertainty; the t-distribution has fatter tails than the normal to compensate, especially at small n.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`stats.t.interval(0.95, len(ornek) - 1, ...)` çağrısında `len(ornek) - 1` neyi temsil eder?",
                "In `stats.t.interval(0.95, len(ornek) - 1, ...)`, what does `len(ornek) - 1` represent?",
              ],
              options: [
                ["Serbestlik derecesini (t dağılımının şeklini belirler)", "The degrees of freedom (it shapes the t-distribution)"],
                ["Güven düzeyini", "The confidence level"],
                ["Örneklem ortalamasını", "The sample mean"],
                ["Aralığın genişliğini", "The width of the interval"],
              ],
              answer: 0,
              explain: [
                "t dağılımının şekli serbestlik derecesine bağlıdır; örneklem büyüklüğünden bir eksiği kullanılır çünkü standart sapmayı tahmin etmek bir serbestlik derecesi \"tüketir\".",
                "The shape of the t-distribution depends on its degrees of freedom; sample size minus one is used because estimating the standard deviation itself \"consumes\" one degree of freedom.",
              ],
            }),
            tip(
              "Örneklem büyüklüğünün etkisi",
              "The effect of sample size",
              "Güven aralığının genişliği örneklem büyüklüğünün **kareköküyle** ters orantılıdır. Aralığı yarıya indirmek için örneklemi ikiye değil **dörde** katlaman gerekir. Bu, \"biraz daha veri toplayalım\" önerisinin neden çoğu zaman yetersiz olduğunu açıklar.",
              "The width of a confidence interval shrinks with the **square root** of the sample size. To halve it you need **four times** the data, not twice. This is why \"let's collect a bit more data\" is so often not enough.",
            ),
            quiz({
              id: "q1",
              q: [
                "Örneklem büyüklüğünü 4 katına çıkarırsan güven aralığının genişliği ne olur?",
                "If you quadruple the sample size, what happens to the width of the confidence interval?",
              ],
              options: [
                ["Yarıya iner", "It halves"],
                ["Dörtte birine iner", "It quarters"],
                ["Değişmez", "It stays the same"],
                ["İki katına çıkar", "It doubles"],
              ],
              answer: 0,
              explain: [
                "Genişlik `1/√n` ile orantılıdır; `√4 = 2` olduğu için aralık yarıya iner. Bu ilişki, deney tasarımında örneklem büyüklüğü planlamanın temelidir.",
                "Width scales with `1/√n`, and `√4 = 2`, so the interval halves. This relationship is the basis of sample size planning in experiment design.",
              ],
              xp: 20,
            }),
            quiz({
              id: "q10",
              q: [
                "Aynı `1/√n` ilişkisine göre, örneklemi 100 katına çıkarırsan aralığın genişliği nasıl değişir?",
                "Using the same `1/√n` relationship, if you multiply the sample size by 100, how does the interval's width change?",
              ],
              options: [
                ["Yaklaşık 10'da birine iner (√100 = 10)", "It shrinks to roughly one tenth (√100 = 10)"],
                ["Yaklaşık 100'de birine iner", "It shrinks to roughly one hundredth"],
                ["Değişmez", "It stays the same"],
                ["Yaklaşık 2 kat artar", "It roughly doubles"],
              ],
              answer: 0,
              explain: [
                "Genişlik `1/√n` ile orantılı olduğu için 100 kat veri, √100 = 10 kat daralma sağlar — dörtte bir değil onda bir. Bu yüzden çok daha dar bir aralık için çok daha fazla veri gerekir.",
                "Since width scales with `1/√n`, 100 times the data gives √100 = 10 times narrower, not a hundred times narrower. This is why a much tighter interval demands disproportionately more data.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "senior",
      title: L("Hipotez testi ve A/B testi", "Hypothesis and A/B testing"),
      description: L(
        "p-değeri, etki büyüklüğü, güç analizi ve deneyi doğru okumak.",
        "p-values, effect size, power analysis and reading an experiment correctly.",
      ),
      projectSlug: "istatistik-ab-testi",
      lessons: [
        lesson({
          slug: "hipotez-testi",
          title: L("Hipotez testi ve p-değeri", "Hypothesis testing and p-values"),
          summary: L(
            "En çok yanlış anlaşılan istatistik kavramını doğru öğren.",
            "Get the most misunderstood concept in statistics right.",
          ),
          minutes: 20,
          blocks: [
            text(
              "Hipotez testi iki iddiayı karşılaştırır:\n\n- **H₀ (sıfır hipotezi)** — bir fark yok, gördüğün şey rastlantı\n- **H₁ (alternatif)** — gerçek bir fark var\n\n**p-değeri**, H₀ doğruysa elindeki kadar uç bir sonucu görme olasılığıdır. Küçük p (< 0,05) \"bu veriyi sadece şansla açıklamak zor\" demektir.",
              "A hypothesis test weighs two claims:\n\n- **H₀ (null)** — there is no difference; what you see is chance\n- **H₁ (alternative)** — there is a real difference\n\nThe **p-value** is the probability of seeing a result at least as extreme as yours *if H₀ were true*. A small p (< 0.05) means \"chance alone is a poor explanation for this data\".",
            ),
            quiz({
              id: "q2",
              q: [
                "H₀ (sıfır hipotezi) ile H₁ (alternatif hipotez) arasındaki fark nedir?",
                "What is the difference between H₀ (the null) and H₁ (the alternative)?",
              ],
              options: [
                [
                  "H₀ fark olmadığını, H₁ gerçek bir fark olduğunu iddia eder",
                  "H₀ claims there is no difference; H₁ claims a real difference exists",
                ],
                ["H₀ her zaman doğrudur, H₁ her zaman yanlıştır", "H₀ is always true and H₁ is always false"],
                ["H₀ büyük örneklemler, H₁ küçük örneklemler içindir", "H₀ is for large samples, H₁ for small ones"],
                ["İkisi arasında bir fark yoktur", "There is no real difference between them"],
              ],
              answer: 0,
              explain: [
                "Hipotez testi, verinin H₀'ı (rastlantı açıklaması) çürütmeye yetip yetmediğini kontrol eder; yeterince kanıt varsa H₁ lehine karar verilir, ama H₀ hiçbir zaman doğrudan \"kanıtlanmaz\".",
                "A hypothesis test checks whether the data is strong enough to reject H₀ (the chance explanation); with enough evidence you decide in favour of H₁, but H₀ is never directly \"proven\" either way.",
              ],
            }),
            pitfall(
              "p-değeri ne DEĞİLDİR",
              "What a p-value is NOT",
              "p-değeri **hipotezin doğru olma olasılığı değildir**. Etkinin büyüklüğünü de söylemez: 1 milyon kullanıcılı bir testte %0,01'lik anlamsız bir fark bile p < 0,001 çıkabilir. Her zaman p ile birlikte **etki büyüklüğünü** ve **güven aralığını** raporla — karar bunlara göre verilir, p'ye göre değil.",
              "A p-value is **not the probability that the hypothesis is true**. It also says nothing about size: with a million users even a meaningless 0.01% difference can produce p < 0.001. Always report the **effect size** and **confidence interval** alongside p — decisions are made on those, not on p.",
            ),
            quiz({
              id: "q3",
              q: [
                "\"p = 0,02 ise, H₀'ın doğru olma olasılığı %2'dir\" cümlesi neden yanlıştır?",
                "Why is \"p = 0.02 means there is a 2% chance H₀ is true\" wrong?",
              ],
              options: [
                [
                  "p-değeri, H₀ doğruysa veriyi görme olasılığıdır — H₀'ın kendisinin doğru olma olasılığı değildir",
                  "The p-value is the probability of the data given H₀ — not the probability that H₀ itself is true",
                ],
                ["Çünkü p-değeri hiçbir zaman 0,02 çıkamaz", "Because a p-value can never actually equal 0.02"],
                ["Çünkü H₀ zaten her zaman yanlıştır", "Because H₀ is always false to begin with"],
                ["Bu cümle aslında doğrudur", "This statement is in fact correct"],
              ],
              answer: 0,
              explain: [
                "p-değeri `P(veri | H₀)` yönünde hesaplanır, `P(H₀ | veri)` değil. Bu iki koşullu olasılığı karıştırmak istatistikte en yaygın yorum hatasıdır.",
                "The p-value is computed as `P(data | H₀)`, not `P(H₀ | data)`. Confusing these two conditional probabilities is the most common misinterpretation in statistics.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Pitfall'a göre, milyonlarca kullanıcılı bir testte p < 0,001 çıkması neden tek başına yeterli değildir?",
                "Per the pitfall, why isn't p < 0.001 on a test with millions of users enough on its own?",
              ],
              options: [
                [
                  "Çok büyük örneklemlerde anlamsız derecede küçük farklar bile istatistiksel olarak anlamlı çıkabilir",
                  "With very large samples, even a meaninglessly tiny difference can turn out statistically significant",
                ],
                ["p < 0,001 her zaman hesaplama hatasıdır", "p < 0.001 is always a calculation error"],
                ["Büyük örneklemlerde p-değeri hesaplanamaz", "A p-value cannot be computed on large samples"],
                ["Bu durumda H₁ kesin olarak doğrudur", "In this case H₁ is definitely true"],
              ],
              answer: 0,
              explain: [
                "p-değeri farkın büyüklüğünü değil, rastlantıyla açıklanabilirliğini ölçer. Bu yüzden %0,01'lik anlamsız bir fark bile dev bir örneklemde p < 0,001 verebilir.",
                "The p-value measures how explainable-by-chance a difference is, not its size. That is why even a meaningless 0.01% difference can yield p < 0.001 with a huge sample.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Pitfall'a göre p-değeriyle birlikte her zaman ne raporlanmalıdır?",
                "Per the pitfall, what should always be reported alongside the p-value?",
              ],
              options: [
                ["Etki büyüklüğü ve güven aralığı", "Effect size and confidence interval"],
                ["Sadece örneklem büyüklüğü", "Just the sample size"],
                ["Testin çalışma süresi", "How long the test ran"],
                ["Kullanılan yazılımın sürümü", "The version of the software used"],
              ],
              answer: 0,
              explain: [
                "Karar p-değerine değil, farkın ne kadar büyük ve ne kadar güvenilir olduğuna göre verilir; etki büyüklüğü \"ne kadar\", güven aralığı ise \"ne kadar belirsiz\" sorusunu yanıtlar.",
                "Decisions rest on how large and how reliable the difference is, not on the p-value alone; effect size answers \"how much\" and the confidence interval answers \"how uncertain\".",
              ],
            }),
            code(
              "python",
              `from scipy import stats

# İki bağımsız grup: A/B testinde ortalama sepet tutarı
a = [120, 135, 128, 142, 119, 131]
b = [138, 145, 151, 133, 149, 141]

t_stat, p = stats.ttest_ind(a, b, equal_var=False)  # Welch t-testi
print(f"t = {t_stat:.3f}, p = {p:.4f}")

# Dönüşüm oranı karşılaştırması (oranlar için ki-kare)
from scipy.stats import chi2_contingency
tablo = [[120, 4880],   # A: 120 dönüşüm / 5000
         [150, 4850]]   # B: 150 dönüşüm / 5000
chi2, p2, dof, beklenen = chi2_contingency(tablo)
print(f"p = {p2:.4f}")`,
            ),
            quiz({
              id: "q6",
              q: [
                "Kodda `stats.ttest_ind(a, b, equal_var=False)` neden \"Welch t-testi\" olarak adlandırılıyor?",
                "Why is `stats.ttest_ind(a, b, equal_var=False)` in the code called the \"Welch t-test\"?",
              ],
              options: [
                [
                  "İki grubun varyanslarının eşit olduğunu varsaymaz, standart t-testinden farkı budur",
                  "It does not assume the two groups have equal variance, unlike the standard t-test",
                ],
                ["Sadece kategorik veri için çalışır", "It only works on categorical data"],
                ["p-değeri hesaplamaz", "It does not compute a p-value"],
                ["Örneklem büyüklüğü eşit olmak zorundadır", "It requires the sample sizes to be equal"],
              ],
              answer: 0,
              explain: [
                "`equal_var=False` parametresi Welch düzeltmesini devreye sokar: gruplar arasında varyans farklıysa bile p-değeri güvenilir kalır. A/B testlerinde varyans eşitliği garanti olmadığı için bu varsayılan güvenli seçimdir.",
                "The `equal_var=False` parameter activates the Welch correction: the p-value stays reliable even when the groups have different variances. Since equal variance is never guaranteed in A/B tests, this is the safe default.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Dönüşüm oranı karşılaştırmasında `chi2_contingency` neden `ttest_ind` yerine kullanılıyor?",
                "Why is `chi2_contingency` used instead of `ttest_ind` to compare conversion rates?",
              ],
              options: [
                [
                  "Dönüşüm/dönüşmeme kategorik sayımlardır; t-testi sürekli ortalamalar, ki-kare ise kategori tablolarını karşılaştırır",
                  "Conversion/no-conversion are categorical counts; the t-test compares continuous means while chi-square compares category tables",
                ],
                ["Ki-kare her zaman daha küçük p-değeri verir", "Chi-square always produces a smaller p-value"],
                ["ttest_ind sadece tek grup için çalışır", "ttest_ind only works with a single group"],
                ["Aralarında bir fark yoktur, ikisi de aynı sonucu verir", "There is no difference, both give the identical result"],
              ],
              answer: 0,
              explain: [
                "Sepet tutarı gibi sürekli bir ortalamayı karşılaştırırken t-testi, kaç kişinin dönüştüğü/dönüşmediği gibi kategorik sayımları karşılaştırırken ki-kare testi kullanılır — veri tipi doğru testi belirler.",
                "You use a t-test to compare a continuous average like basket value, and a chi-square test to compare categorical counts like how many converted versus did not — the data type determines the right test.",
              ],
            }),
            text(
              "**A/B testinde sık yapılan hatalar:**\n\n1. **Erken bakıp durdurmak** — anlamlı çıkana kadar günlük kontrol etmek yanlış pozitif üretir. Örneklem büyüklüğünü **önceden** hesapla ve süreye sadık kal.\n2. **Çok metriğe bakmak** — 20 metriğe bakarsan biri şansa %5 düzeyinde anlamlı çıkar. Baştan **tek bir birincil metrik** seç.\n3. **Rastgeleleştirmeyi bozmak** — kullanıcı bazlı değil oturum bazlı bölmek sonuçları kirletir.\n4. **Yenilik etkisi** — ilk günlerde her değişiklik ilgi çeker; testi en az bir tam haftaya yay.",
              "**Common A/B testing mistakes:**\n\n1. **Peeking and stopping early** — checking daily until it turns significant manufactures false positives. Compute the sample size **in advance** and stick to the duration.\n2. **Watching too many metrics** — look at 20 metrics and one will be significant at the 5% level by luck. Pick **one primary metric** up front.\n3. **Breaking randomisation** — splitting by session instead of by user contaminates the result.\n4. **Novelty effect** — anything new draws attention in the first days; run for at least one full week.",
            ),
            quiz({
              id: "q8",
              q: [
                "Bir A/B testini her gün kontrol edip anlamlı çıkar çıkmaz durdurmak neden yanlıştır?",
                "Why is it wrong to check an A/B test every day and stop the moment it turns significant?",
              ],
              options: [
                [
                  "Erken durdurma yanlış pozitif üretme oranını artırır; örneklem büyüklüğü önceden hesaplanıp süreye sadık kalınmalıdır",
                  "Early stopping inflates the false positive rate; the sample size should be computed in advance and the duration respected",
                ],
                ["Çünkü testler her zaman en az bir yıl sürmelidir", "Because tests must always run for at least a year"],
                ["Çünkü günlük kontrol veriyi bozar", "Because checking daily corrupts the data itself"],
                ["Bu aslında doğru bir uygulamadır", "This is actually correct practice"],
              ],
              answer: 0,
              explain: [
                "Her kontrolde \"anlamlı mı?\" diye bakmak, aslında birden fazla test yapmak demektir; şans eseri anlamlı görünen bir ana denk gelme olasılığı zamanla artar. Bu yüzden süre ve örneklem büyüklüğü baştan sabitlenir.",
                "Checking \"is it significant yet?\" repeatedly is effectively running many tests; the chance of hitting a moment that looks significant purely by luck grows over time. That is why the duration and sample size are fixed in advance.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "20 farklı metriğe bakıp birinin şans eseri anlamlı çıkması hangi hatayla ilgilidir ve çözümü nedir?",
                "Watching 20 different metrics and having one turn significant by luck relates to which mistake, and what is the fix?",
              ],
              options: [
                [
                  "Çok metriğe bakma hatası; çözüm baştan tek bir birincil metrik seçmektir",
                  "The too-many-metrics mistake; the fix is to pick one primary metric up front",
                ],
                ["Yenilik etkisi; çözüm testi kısaltmaktır", "The novelty effect; the fix is to shorten the test"],
                ["Rastgeleleştirme hatası; çözüm örneklemi büyütmektir", "The randomisation mistake; the fix is to enlarge the sample"],
                ["Bu bir hata değildir, normal bir sonuçtur", "This is not a mistake, it is a normal outcome"],
              ],
              answer: 0,
              explain: [
                "%5 anlamlılık düzeyinde, 20 bağımsız metriğe bakınca ortalama biri şans eseri \"anlamlı\" çıkar. Baştan tek bir birincil metrik seçmek bu çoklu karşılaştırma tuzağını önler.",
                "At the 5% significance level, watching 20 independent metrics means on average one turns \"significant\" by chance alone. Choosing a single primary metric up front avoids this multiple-comparisons trap.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Kullanıcı bazlı yerine oturum (session) bazlı bölme neden A/B test sonucunu kirletir?",
                "Why does splitting by session instead of by user contaminate an A/B test result?",
              ],
              options: [
                [
                  "Aynı kullanıcı farklı oturumlarda hem A hem B grubuna düşebilir, bu da rastgeleleştirmeyi bozar",
                  "The same user can land in both A and B across different sessions, which breaks the randomisation",
                ],
                ["Oturum bazlı bölme her zaman daha az veri toplar", "Session-based splitting always collects less data"],
                ["Bu aslında en doğru bölme yöntemidir", "This is in fact the most correct way to split"],
                ["Sadece mobil kullanıcıları etkiler", "It only affects mobile users"],
              ],
              answer: 0,
              explain: [
                "Rastgeleleştirmenin geçerli olması için her deney biriminin (genelde kullanıcı) tutarlı biçimde tek bir gruba atanması gerekir; oturum bazlı bölme aynı kişiyi iki gruba da maruz bırakarak karşılaştırmayı bozar.",
                "For randomisation to hold, each experimental unit (usually the user) must be assigned consistently to a single group; splitting by session exposes the same person to both groups and corrupts the comparison.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "A/B testinde p = 0,03 çıktı. Bu ne anlama gelir?",
                "An A/B test comes back with p = 0.03. What does that mean?",
              ],
              options: [
                [
                  "Gerçekte fark yoksa, bu kadar uç bir sonucu görme olasılığı %3'tür",
                  "If there were truly no difference, there is a 3% chance of seeing a result this extreme",
                ],
                ["B varyantının kazanma olasılığı %97'dir", "There is a 97% chance variant B wins"],
                ["Fark %3'tür", "The difference is 3%"],
                ["Testin %3 hata payı vardır", "The test has a 3% margin of error"],
              ],
              answer: 0,
              explain: [
                "p-değeri, sıfır hipotezi altında verinin ne kadar sıra dışı olduğunu ölçer. \"B'nin kazanma olasılığı\" gibi bir ifade Bayesçi bir yorumdur ve klasik p-değerinden doğrudan çıkarılamaz.",
                "The p-value measures how unusual the data is under the null hypothesis. A statement like \"the probability B wins\" is a Bayesian claim and does not follow directly from a classical p-value.",
              ],
              xp: 25,
            }),
          ],
        }),
        lesson({
          slug: "etki-buyuklugu-ve-guc",
          title: L("Etki büyüklüğü ve güç analizi", "Effect size and statistical power"),
          summary: L(
            "Testi çalıştırmadan önce kaç kişiye ihtiyacın var? Ve fark ne kadar büyükse anlamlı?",
            "How many users do you need before you start? And how large must the difference be to matter?",
          ),
          minutes: 18,
          blocks: [
            text(
              "**Etki büyüklüğü**, farkın **ne kadar büyük** olduğunu ölçer — p-değerinin asla söylemediği şeyi. En yaygın ölçü Cohen's d'dir:\n\n`d = (ortalama₁ − ortalama₂) / birleşik standart sapma`\n\nKaba yorum: d ≈ 0,2 küçük, 0,5 orta, 0,8 büyük etki.\n\nAma asıl soru istatistiksel değil ticaridir: **pratik anlamlılık**. Dönüşüm oranındaki %0,1'lik artış istatistiksel olarak anlamlı olabilir; ama bu değişikliği hayata geçirmenin maliyeti kazancından fazlaysa, karar \"hayır\"dır.",
              "**Effect size** measures **how large** the difference is — the thing a p-value never tells you. The most common measure is Cohen's d:\n\n`d = (mean₁ − mean₂) / pooled standard deviation`\n\nA rough reading: d ≈ 0.2 small, 0.5 medium, 0.8 large.\n\nBut the real question is commercial rather than statistical: **practical significance**. A 0.1% lift in conversion may be statistically significant; if shipping the change costs more than it earns, the decision is still \"no\".",
            ),
            quiz({
              id: "q2",
              q: [
                "Cohen's d neyi ölçer ve nasıl hesaplanır?",
                "What does Cohen's d measure, and how is it computed?",
              ],
              options: [
                [
                  "Farkın büyüklüğünü; iki ortalama farkının birleşik standart sapmaya bölünmesiyle",
                  "The size of the difference; two means' difference divided by the pooled standard deviation",
                ],
                ["p-değerinin kendisini", "The p-value itself"],
                ["Örneklem büyüklüğünü", "The sample size"],
                ["Testin güvenilirlik düzeyini (α)", "The test's significance level (α)"],
              ],
              answer: 0,
              explain: [
                "d = (ortalama₁ − ortalama₂) / birleşik standart sapma formülü, farkı standart sapma biriminden ifade eder — bu da farklı ölçeklerdeki çalışmaları karşılaştırılabilir kılar.",
                "The formula d = (mean₁ − mean₂) / pooled standard deviation expresses the difference in units of standard deviation, which makes studies on different scales comparable.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Kaba yorum kuralına göre d ≈ 0,5 hangi büyüklükte bir etkiye karşılık gelir?",
                "By the rough interpretation rule, what size effect does d ≈ 0.5 correspond to?",
              ],
              options: [
                ["Orta büyüklükte bir etki", "A medium effect"],
                ["Küçük bir etki", "A small effect"],
                ["Büyük bir etki", "A large effect"],
                ["Hiçbir etki yok demektir", "It means no effect at all"],
              ],
              answer: 0,
              explain: [
                "Dersteki kaba ölçek d ≈ 0,2 küçük, 0,5 orta, 0,8 büyük etki şeklindedir; bu sayılar mutlak kurallar değil, farkı yorumlarken kullanılan kaba referans noktalarıdır.",
                "The lesson's rough scale is d ≈ 0.2 small, 0.5 medium, 0.8 large; these are not absolute rules but rough reference points for interpreting a difference.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "\"İstatistiksel anlamlılık\" ile \"pratik anlamlılık\" arasındaki fark nedir?",
                "What is the difference between \"statistical significance\" and \"practical significance\"?",
              ],
              options: [
                [
                  "İstatistiksel anlamlılık farkın şans olmadığını gösterir; pratik anlamlılık ise farkın ticari olarak değerli/uygulamaya değer olup olmadığıdır",
                  "Statistical significance shows the difference isn't chance; practical significance is whether it is commercially worth acting on",
                ],
                ["İkisi aynı şeydir", "They are the same thing"],
                ["Pratik anlamlılık her zaman istatistiksel anlamlılıktan önce gelir", "Practical significance always comes before statistical significance"],
                ["İstatistiksel anlamlılık sadece küçük örneklemlerde geçerlidir", "Statistical significance only applies to small samples"],
              ],
              answer: 0,
              explain: [
                "%0,1'lik bir dönüşüm artışı istatistiksel olarak anlamlı çıkabilir; ama bu değişikliği hayata geçirmenin maliyeti kazancından fazlaysa, karar yine de \"hayır\"dır — bu tam olarak pratik anlamlılık sorusudur.",
                "A 0.1% conversion lift can be statistically significant; but if shipping it costs more than it earns, the decision is still \"no\" — that is exactly the practical significance question.",
              ],
            }),
            text(
              "**Güç (power)**, gerçekten var olan bir farkı yakalayabilme olasılığıdır. Standart hedef %80'dir: fark gerçekse, testi 100 kez yapsan 80'inde yakalarsın.\n\nGüç dört şeye bağlıdır:\n\n- **Örneklem büyüklüğü (n)** — artarsa güç artar\n- **Etki büyüklüğü** — büyük farkları yakalamak kolaydır\n- **Anlamlılık düzeyi (α)** — genelde 0,05\n- **Değişkenlik** — veri ne kadar gürültülüyse o kadar çok örneklem gerekir\n\n**Güç analizi**, testi başlatmadan önce yapılır: \"%5'lik bir artışı %80 güçle yakalamak için kaç kullanıcı gerekir?\" Cevap 20.000 ise ve haftada 2.000 kullanıcın varsa, o test 10 hafta sürecek demektir. Bunu önceden bilmek, üç hafta sonra sonuçsuz kalan bir testten çok daha iyidir.",
              "**Power** is the probability of detecting a difference that genuinely exists. The standard target is 80%: if the effect is real, you would catch it in 80 out of 100 runs.\n\nPower depends on four things:\n\n- **Sample size (n)** — more raises power\n- **Effect size** — large differences are easy to catch\n- **Significance level (α)** — usually 0.05\n- **Variability** — noisier data needs more samples\n\n**Power analysis** happens before you start: \"how many users do I need to detect a 5% lift with 80% power?\" If the answer is 20,000 and you get 2,000 users a week, that test will run for ten weeks. Knowing this up front is far better than an inconclusive test three weeks later.",
            ),
            quiz({
              id: "q5",
              q: [
                "%80 güç hedefi ne anlama gelir?",
                "What does an 80% power target mean?",
              ],
              options: [
                [
                  "Fark gerçekten varsa, testi 100 kez yapsan yaklaşık 80'inde bunu yakalarsın",
                  "If the effect genuinely exists, running the test 100 times would catch it roughly 80 times",
                ],
                ["Sonucun %80 doğru olduğu anlamına gelir", "It means the result is 80% correct"],
                ["p-değerinin 0,80'den küçük olması gerektiği anlamına gelir", "It means the p-value must be below 0.80"],
                ["Örneklemin %80'inin kullanılacağı anlamına gelir", "It means only 80% of the sample will be used"],
              ],
              answer: 0,
              explain: [
                "Güç, testin gerçek bir etkiyi yakalama olasılığıdır. %80 hedefi, gerçek bir farkı kaçırma riskini (yanlış negatif) makul bir düzeyde tutar — sıfıra indirmez ama pratikte kabul edilebilir bulunur.",
                "Power is the test's probability of catching a real effect. An 80% target keeps the risk of missing a real difference (a false negative) at a reasonable level — not zero, but practically acceptable.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Diğer her şey sabitken örneklem büyüklüğünü (n) artırmak testin gücüne ne yapar?",
                "With everything else held constant, what does increasing the sample size (n) do to a test's power?",
              ],
              options: [
                ["Gücü artırır", "It increases power"],
                ["Gücü azaltır", "It decreases power"],
                ["Gücü etkilemez", "It has no effect on power"],
                ["p-değerini otomatik olarak 0,05'in üstüne çıkarır", "It automatically pushes the p-value above 0.05"],
              ],
              answer: 0,
              explain: [
                "Dersin listelediği dört faktörden biri örneklem büyüklüğüdür: n arttıkça tahminler daha kesinleşir ve gerçek bir farkı yakalama olasılığı, yani güç, yükselir.",
                "Sample size is one of the four factors the lesson lists: as n rises, estimates get more precise and the probability of catching a real difference — power — goes up.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Verinin \"değişkenliği (gürültüsü)\" arttıkça, aynı gücü korumak için ne gerekir?",
                "As the data's \"variability (noise)\" increases, what is needed to keep power the same?",
              ],
              options: [
                ["Daha fazla örneklem", "More samples"],
                ["Daha az örneklem", "Fewer samples"],
                ["Daha düşük bir anlamlılık düzeyi (α)", "A lower significance level (α)"],
                ["Hiçbir şey, değişkenlik gücü etkilemez", "Nothing, variability does not affect power"],
              ],
              answer: 0,
              explain: [
                "Değişkenlik dersin listelediği dört faktörden biridir: veri ne kadar gürültülüyse, gerçek sinyali gürültüden ayırt etmek o kadar zordur, bu yüzden aynı gücü tutturmak için daha çok örnekleme ihtiyaç duyulur.",
                "Variability is one of the lesson's four factors: the noisier the data, the harder it is to separate the real signal from the noise, so more samples are needed to reach the same power.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Derste verilen örnekte %5'lik bir artışı %80 güçle yakalamak için 20.000 kullanıcı gerekiyor ve haftada 2.000 kullanıcı geliyor. Test kaç hafta sürer?",
                "In the lesson's example, detecting a 5% lift at 80% power needs 20,000 users, and you get 2,000 users a week. How many weeks will the test run?",
              ],
              options: [
                ["10 hafta", "10 weeks"],
                ["4 hafta", "4 weeks"],
                ["20 hafta", "20 weeks"],
                ["2 hafta", "2 weeks"],
              ],
              answer: 0,
              explain: [
                "20.000 / 2.000 = 10 hafta. Bu hesabı deneyi başlatmadan önce yapmak, üç hafta sonra sonuçsuz kalan bir teste kıyasla çok daha iyi bir plandır.",
                "20,000 / 2,000 = 10 weeks. Doing this calculation before starting the experiment is a far better plan than an inconclusive test three weeks in.",
              ],
            }),
            pitfall(
              "Anlamsız çıkan test, \"fark yok\" demek değildir",
              "A non-significant test does not mean \"no difference\"",
              "p > 0,05 çıktığında doğru cümle \"fark olmadığını gösterdik\" değil, **\"fark olduğunu gösteremedik\"**tir. Bu ikisi arasında büyük fark vardır.\n\nTestin gücü düşükse (örneklem küçükse) gerçek ve önemli bir farkı kaçırmış olabilirsin. Anlamsız bir sonucu raporlarken daima güven aralığını da ver: aralık `[-%1, +%12]` ise, %12'lik bir iyileşmeyi dışlayamıyorsun demektir — bu, \"etki yok\" ile aynı şey değildir.",
              "When p > 0.05 the correct sentence is not \"we showed there is no difference\" but **\"we failed to show there is one\"**. Those two are very different.\n\nIf the test was underpowered (the sample was small) you may have missed a real and important effect. When reporting a non-significant result, always give the confidence interval too: if it is `[-1%, +12%]`, you cannot rule out a 12% improvement — which is not the same as \"no effect\".",
            ),
            quiz({
              id: "q8",
              q: [
                "Bir A/B testinde p = 0,21 çıktı. Bu sonucu doğru şekilde nasıl ifade etmelisin?",
                "An A/B test comes back with p = 0.21. How should you correctly phrase that result?",
              ],
              options: [
                [
                  "\"Bir fark olduğunu gösteremedik\"",
                  "\"We failed to show there is a difference\"",
                ],
                ["\"Fark olmadığını kanıtladık\"", "\"We proved there is no difference\""],
                ["\"Etki büyüklüğü sıfırdır\"", "\"The effect size is zero\""],
                ["\"B varyantı kesinlikle A ile aynıdır\"", "\"Variant B is definitely identical to A\""],
              ],
              answer: 0,
              explain: [
                "Anlamsız bir sonuç, farkın yokluğunu kanıtlamaz — sadece elindeki veriyle onu gösteremediğini söyler. Özellikle test yeterince güçlü değilse, gerçek bir etki gözden kaçmış olabilir.",
                "A non-significant result does not prove the absence of a difference — it only says you failed to demonstrate one with the data you have. Especially if the test was underpowered, a real effect may have been missed.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Anlamsız çıkan bir test için güven aralığı `[-%1, +%12]` ise, bu neyi gösterir?",
                "If the confidence interval for a non-significant test is `[-1%, +12%]`, what does that tell you?",
              ],
              options: [
                [
                  "%12'lik önemli bir iyileşme ihtimalini dışlayamıyorsun; bu \"etki yok\" ile aynı şey değildir",
                  "You cannot rule out a meaningful 12% improvement; that is not the same as \"no effect\"",
                ],
                ["Gerçek etki kesinlikle %0'dır", "The true effect is definitely 0%"],
                ["Test tamamen geçersizdir", "The test is entirely invalid"],
                ["Aralığın genişliği önemsizdir", "The width of the interval is unimportant"],
              ],
              answer: 0,
              explain: [
                "Aralık geniş olduğunda, hem küçük bir zarar hem de büyük bir kazanç hâlâ olasıdır. p > 0,05 çıkması \"etki yok\" değil, \"bu veriyle net bir karar veremedik\" anlamına gelir.",
                "When the interval is wide, both a small loss and a large gain remain plausible. A p > 0.05 result means \"we could not reach a clear verdict with this data\", not \"there is no effect\".",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "10 milyon kullanıcılı bir testte dönüşüm oranı %2,00'den %2,01'e çıktı, p < 0,001. Ne yapmalısın?",
                "In a test with 10 million users, conversion rose from 2.00% to 2.01% with p < 0.001. What should you do?",
              ],
              options: [
                [
                  "Etkinin ticari değerini hesapla; istatistiksel anlamlılık tek başına yeterli gerekçe değil",
                  "Compute the commercial value of the effect; statistical significance alone is not a reason to ship",
                ],
                ["Hemen yayına al, p çok küçük", "Ship it immediately, the p-value is tiny"],
                ["Testi tekrarla", "Re-run the test"],
                ["Sonucu yok say, p güvenilmez", "Ignore the result, p is unreliable"],
              ],
              answer: 0,
              explain: [
                "Çok büyük örneklemlerde en ufak fark bile istatistiksel olarak anlamlı çıkar. %0,01'lik artış, geliştirme ve bakım maliyetini karşılıyorsa değerlidir; karşılamıyorsa p-değeri ne kadar küçük olursa olsun yayına almanın anlamı yoktur.",
                "With very large samples even the tiniest difference turns out significant. A 0.01% lift is worth having if it covers the build and maintenance cost; if it does not, shipping makes no sense however small the p-value is.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "regresyon-temelleri",
          title: L("Doğrusal regresyonun temelleri", "The basics of linear regression"),
          summary: L(
            "İki değişken arasındaki ilişkiyi bir denklemle ifade et ve katsayıyı doğru yorumla.",
            "Express the relationship between variables as an equation, and read the coefficient correctly.",
          ),
          minutes: 20,
          blocks: [
            text(
              "**Doğrusal regresyon**, bir bağımlı değişkeni (y) bir veya daha çok bağımsız değişkenle (x) açıklamaya çalışır:\n\n`y = β₀ + β₁x₁ + β₂x₂ + … + ε`\n\n- **β₀ (kesişim)** — tüm x'ler sıfırken y'nin beklenen değeri\n- **β₁ (eğim)** — x₁ bir birim artınca y'nin **ortalama** değişimi, *diğer değişkenler sabitken*\n- **ε (hata)** — modelin açıklayamadığı kısım\n\nO italik kısım kritiktir: çok değişkenli regresyonda her katsayı, diğerleri kontrol edildikten sonraki net etkiyi gösterir.",
              "**Linear regression** tries to explain a dependent variable (y) with one or more independent variables (x):\n\n`y = β₀ + β₁x₁ + β₂x₂ + … + ε`\n\n- **β₀ (intercept)** — the expected y when all x are zero\n- **β₁ (slope)** — the **average** change in y when x₁ rises by one unit, *holding the other variables constant*\n- **ε (error)** — what the model cannot explain\n\nThat italic clause is critical: in multiple regression each coefficient shows the net effect after the others are controlled for.",
            ),
            quiz({
              id: "q2",
              q: [
                "Regresyon denkleminde β₀ (kesişim) neyi ifade eder?",
                "In the regression equation, what does β₀ (the intercept) represent?",
              ],
              options: [
                ["Tüm x değişkenleri sıfırken y'nin beklenen değeri", "The expected value of y when all x variables are zero"],
                ["x'in bir birim artışının etkisi", "The effect of a one-unit increase in x"],
                ["Modelin açıklayamadığı hata payı", "The error the model cannot explain"],
                ["R-kare değeri", "The R-squared value"],
              ],
              answer: 0,
              explain: [
                "β₀, doğrunun y eksenini kestiği noktadır — tüm bağımsız değişkenler sıfır olduğunda modelin tahmin ettiği y değeridir. Bazı bağlamlarda gerçekçi olmayabilir ama denklemin matematiksel bir parçasıdır.",
                "β₀ is where the line crosses the y-axis — the y value the model predicts when every independent variable is zero. It may not always be realistic in context, but it is a mathematical part of the equation.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "β₁ (eğim) katsayısının \"diğer değişkenler sabitken\" koşuluyla okunması neden önemlidir?",
                "Why is it important that the β₁ (slope) coefficient is read \"holding the other variables constant\"?",
              ],
              options: [
                [
                  "Çünkü çok değişkenli regresyonda her katsayı, diğerleri kontrol edildikten sonraki net etkiyi gösterir",
                  "Because in multiple regression each coefficient shows the net effect after the others are controlled for",
                ],
                ["Çünkü aksi halde β₁ hesaplanamaz", "Because otherwise β₁ cannot be computed at all"],
                ["Bu koşul sadece tek değişkenli modellerde geçerlidir", "This condition only applies to single-variable models"],
                ["Bu koşulun bir önemi yoktur", "This condition has no real importance"],
              ],
              answer: 0,
              explain: [
                "Modelde başka değişkenler varsa, β₁ o değişkenlerin etkisinden arındırılmış nettir. Bu koşulu unutmak, katsayıyı yanlış — sanki tek başınaymış gibi — yorumlamaya yol açar.",
                "When other variables are in the model, β₁ is the net effect stripped of those other variables' influence. Forgetting this clause leads to misreading the coefficient as if it stood alone.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Denklemdeki ε (hata terimi) neyi temsil eder?",
                "What does the ε (error term) in the equation represent?",
              ],
              options: [
                ["Modelin açıklayamadığı, gözlenen ile tahmin edilen y arasındaki fark", "What the model cannot explain — the gap between observed and predicted y"],
                ["Bağımsız değişkenlerin sayısı", "The number of independent variables"],
                ["Güven aralığının genişliği", "The width of the confidence interval"],
                ["p-değeri", "The p-value"],
              ],
              answer: 0,
              explain: [
                "Gerçek dünyada hiçbir model y'yi mükemmel açıklayamaz; ε bu kalan, açıklanamayan kısmı temsil eder — ölçüm hatası, eksik değişkenler veya rastgelelik.",
                "No real-world model explains y perfectly; ε represents this leftover, unexplained part — measurement error, omitted variables, or randomness.",
              ],
            }),
            code(
              "python",
              `import numpy as np
from scipy import stats

reklam = np.array([10, 15, 22, 30, 18, 25, 40, 12])
satis  = np.array([120, 150, 190, 260, 175, 230, 320, 130])

sonuc = stats.linregress(reklam, satis)

print(f"Egim     : {sonuc.slope:.2f}")       # 1 birim reklam -> kaç birim satış
print(f"Kesisim  : {sonuc.intercept:.2f}")
print(f"R-kare   : {sonuc.rvalue**2:.3f}")   # açıklanan varyans oranı
print(f"p-degeri : {sonuc.pvalue:.5f}")

tahmin = sonuc.intercept + sonuc.slope * 35
print(f"35 birim reklamda beklenen satis: {tahmin:.0f}")`,
            ),
            quiz({
              id: "q5",
              q: [
                "Kodda `sonuc.rvalue**2` neyi hesaplar?",
                "In the code, what does `sonuc.rvalue**2` compute?",
              ],
              options: [
                ["R-kare — y'deki varyansın modelce açıklanan oranını", "R-squared — the proportion of variance in y explained by the model"],
                ["Eğim katsayısını", "The slope coefficient"],
                ["p-değerini", "The p-value"],
                ["Standart hatayı", "The standard error"],
              ],
              answer: 0,
              explain: [
                "`linregress` korelasyon katsayısını (`rvalue`) döndürür; onun karesi R-kare değeridir ve modelin y'deki değişimin ne kadarını açıkladığını gösterir.",
                "`linregress` returns the correlation coefficient (`rvalue`); squaring it gives R-squared, which shows how much of the variation in y the model explains.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Kodun son satırındaki `tahmin = sonuc.intercept + sonuc.slope * 35` ifadesi ne yapar?",
                "What does the last line, `tahmin = sonuc.intercept + sonuc.slope * 35`, do?",
              ],
              options: [
                [
                  "Uydurulan doğru denklemini kullanarak reklam = 35 için beklenen satışı hesaplar",
                  "It uses the fitted line's equation to compute the expected sales when advertising = 35",
                ],
                ["Modelin R-karesini yeniden hesaplar", "It recomputes the model's R-squared"],
                ["Verideki aykırı değerleri temizler", "It removes outliers from the data"],
                ["p-değerini test eder", "It tests the p-value"],
              ],
              answer: 0,
              explain: [
                "Bu, tam olarak `y = β₀ + β₁x` formülünün uygulanmasıdır: kesişim artı eğim çarpı x=35, o x değeri için modelin tahmin ettiği y'yi verir.",
                "This is exactly the `y = β₀ + β₁x` formula in action: intercept plus slope times x=35 gives the y the model predicts for that x value.",
              ],
            }),
            info(
              "R-kare her şey değildir",
              "R-squared is not everything",
              "**R-kare**, y'deki değişimin yüzde kaçının model tarafından açıklandığını söyler. 0,85 iyi görünür ama tek başına bir şey ifade etmez:\n\n- Modele değişken ekledikçe R-kare **daima** artar, model kötüleşse bile. Bu yüzden çok değişkenli modellerde **düzeltilmiş R-kare** kullanılır.\n- Yüksek R-kare, modelin doğru **kurulduğu** anlamına gelmez. Zaman serilerinde iki trendli değişken arasında sahte ve çok yüksek R-kare çıkabilir.\n- Düşük R-kare her zaman kötü değildir. İnsan davranışını modellerken 0,30 bile değerli olabilir.",
              "**R-squared** tells you what percentage of the variation in y the model explains. 0.85 looks good but means little on its own:\n\n- R-squared **always** rises as you add variables, even when the model gets worse. This is why multiple regression uses **adjusted R-squared**.\n- A high R-squared does not mean the model is **correctly specified**. In time series, two trending variables can produce a spurious and very high R-squared.\n- A low R-squared is not always bad. When modelling human behaviour even 0.30 can be valuable.",
            ),
            quiz({
              id: "q7",
              q: [
                "Modele rastgele, ilgisiz bir değişken daha eklersen R-kare ne olur?",
                "If you add one more random, unrelated variable to the model, what happens to R-squared?",
              ],
              options: [
                [
                  "Model kötüleşse bile R-kare her zaman artar (ya da aynı kalır)",
                  "R-squared always rises (or stays the same) even if the model gets worse",
                ],
                ["Her zaman düşer", "It always falls"],
                ["Değişmez", "It stays exactly the same"],
                ["Rastgele artar veya azalır, öngörülemez", "It changes randomly and unpredictably"],
              ],
              answer: 0,
              explain: [
                "R-kare, ne kadar alakasız olursa olsun her yeni değişkenle birlikte matematiksel olarak artar ya da aynı kalır — asla azalmaz. Bu davranış, çok değişkenli modellerde onu tek başına güvenilmez kılar.",
                "R-squared mathematically rises or stays the same with every added variable, however irrelevant — it never falls. This behaviour is exactly why it is unreliable on its own in multi-variable models.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Çok değişkenli regresyonda ham R-kare yerine neden düzeltilmiş (adjusted) R-kare kullanılır?",
                "Why is adjusted R-squared used instead of raw R-squared in multiple regression?",
              ],
              options: [
                [
                  "Çünkü ham R-kare her yeni değişkenle otomatik arttığı için modeli gerçekte iyileştirmeyen değişkenleri gizler",
                  "Because raw R-squared automatically rises with every new variable, masking variables that don't actually improve the model",
                ],
                ["Çünkü ham R-kare negatif olabilir", "Because raw R-squared can be negative"],
                ["Çünkü düzeltilmiş R-kare hesaplaması daha hızlıdır", "Because adjusted R-squared is faster to compute"],
                ["İkisi arasında pratik bir fark yoktur", "There is no practical difference between them"],
              ],
              answer: 0,
              explain: [
                "Düzeltilmiş R-kare, eklenen değişken sayısına göre bir ceza uygular; böylece bir değişkenin modele gerçekten değer katıp katmadığını, sadece \"daha fazla değişken\" etkisinden ayırt edebilirsin.",
                "Adjusted R-squared applies a penalty based on the number of variables added, letting you tell whether a variable genuinely improves the model apart from the mechanical \"more variables\" effect.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Zaman serisinde iki değişken de sadece zamanla trend gösteriyorsa, yüksek R-kare neden yanıltıcı olabilir?",
                "If two time-series variables are both simply trending over time, why can a high R-squared be misleading?",
              ],
              options: [
                [
                  "İki alakasız trend bile sahte (spurious) ve çok yüksek bir R-kare üretebilir; yüksek R-kare modelin doğru kurulduğu anlamına gelmez",
                  "Even two unrelated trends can produce a spurious, very high R-squared; a high R-squared does not mean the model is correctly specified",
                ],
                ["Zaman serilerinde R-kare hiç hesaplanamaz", "R-squared cannot be computed at all on time series"],
                ["Bu durumda R-kare her zaman düşük çıkar", "In this case R-squared always comes out low"],
                ["Trend olması R-kareyi etkilemez", "Trends have no effect on R-squared"],
              ],
              answer: 0,
              explain: [
                "İki değişken aralarında hiçbir gerçek nedensel bağ olmadan sadece ortak bir zaman trendi paylaşıyorsa bile güçlü bir korelasyon (ve yüksek R-kare) ortaya çıkabilir — bu klasik \"sahte korelasyon\" tuzağıdır.",
                "Two variables sharing nothing but a common time trend, with no real causal link between them, can still show a strong correlation (and high R-squared) — this is the classic \"spurious correlation\" trap.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Derse göre düşük bir R-kare (ör. 0,30) her zaman kötü modelleme anlamına mı gelir?",
                "Per the lesson, does a low R-squared (e.g. 0.30) always mean poor modelling?",
              ],
              options: [
                [
                  "Hayır — insan davranışını modellerken 0,30 bile değerli olabilir",
                  "No — when modelling human behaviour, even 0.30 can be valuable",
                ],
                ["Evet, her zaman modeli çöpe atmak gerekir", "Yes, the model should always be discarded"],
                ["Düşük R-kare imkansızdır", "A low R-squared is impossible"],
                ["Düşük R-kare her zaman veri hatası demektir", "A low R-squared always means a data error"],
              ],
              answer: 0,
              explain: [
                "R-kare'nin \"iyi\" sayılacağı eşik bağlama bağlıdır. Fizikte 0,30 zayıf sayılır ama insan davranışı gibi doğası gereği gürültülü alanlarda aynı sayı hâlâ pratik değer taşıyabilir.",
                "What counts as a \"good\" R-squared depends on context. In physics 0.30 would be weak, but in inherently noisy domains like human behaviour the same number can still carry practical value.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Ev fiyatı modelinde `oda_sayisi` katsayısı 150.000 çıktı ve metrekare de modelde. Doğru yorum nedir?",
                "In a house price model the `rooms` coefficient is 150,000, and square metres is also in the model. What is the correct reading?",
              ],
              options: [
                [
                  "Metrekare sabitken bir oda fazlası, fiyatı ortalama 150.000 artırıyor",
                  "Holding square metres constant, one extra room raises the price by 150,000 on average",
                ],
                ["Her oda 150.000 TL değerindedir", "Each room is worth 150,000"],
                ["Oda sayısı fiyatın %150.000'ini açıklar", "Rooms explain 150,000% of the price"],
                ["Model hatalıdır", "The model is wrong"],
              ],
              answer: 0,
              explain: [
                "Çok değişkenli regresyonda her katsayı \"diğerleri sabitken\" koşuluyla okunur. Metrekare modelde olduğu için bu katsayı, aynı büyüklükteki evi daha çok odaya bölmenin etkisini gösterir — genel oda değeri değil. Ayrıca bu ortalama bir ilişkidir, nedensel bir iddia değildir.",
                "In multiple regression every coefficient is read as \"holding the others constant\". Since square metres is in the model, this coefficient shows the effect of dividing the same floor area into more rooms — not the general value of a room. It is also an average association, not a causal claim.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "expert",
      title: L("Nedensellik ve ileri çıkarım", "Causality and advanced inference"),
      description: L(
        "Karıştırıcılar, Bayesçi düşünme ve deney yapılamadığında nedenselliği tahmin etme.",
        "Confounders, Bayesian thinking, and estimating causation when an experiment is impossible.",
      ),
      lessons: [
        lesson({
          slug: "karistiricilar-ve-simpson",
          title: L("Karıştırıcılar ve Simpson paradoksu", "Confounders and Simpson's paradox"),
          summary: L(
            "Aynı veri, gruplara ayrıldığında tam tersi sonucu verebilir. Hangisi doğru?",
            "The same data can reverse its conclusion once you split it into groups. Which one is right?",
          ),
          minutes: 20,
          blocks: [
            text(
              "**Karıştırıcı (confounder)**, hem sebebi hem sonucu etkileyen üçüncü bir değişkendir. Kontrol edilmezse ilişkiyi olduğundan güçlü, zayıf, hatta **ters** gösterir.\n\n**Simpson paradoksu** bunun en çarpıcı hâlidir: bir ilişki her alt grupta aynı yönde, ama gruplar birleştirildiğinde tersine döner.\n\nKlasik örnek — bir üniversitenin kabul oranları. Toplamda erkeklerin %44'ü, kadınların %35'i kabul edilmiş; görünüşe göre erkekler lehine ayrımcılık var. Ama bölümlere ayırınca hem kolay bölümde (%85'e %75) hem zor bölümde (%15'e %10) **kadınların oranı daha yüksek** çıkıyor. Nasıl olur?",
              "A **confounder** is a third variable affecting both the cause and the effect. Left uncontrolled it makes a relationship look stronger, weaker or even **reversed**.\n\n**Simpson's paradox** is its most striking form: a relationship points the same way inside every subgroup, yet flips when the groups are pooled.\n\nThe classic example — a university's admission rates. Overall 44% of men and 35% of women were admitted; it looks like discrimination favouring men. But split by department and women have the **higher** rate in both the easy one (85% vs 75%) and the hard one (15% vs 10%). How?",
            ),
            quiz({
              id: "q9",
              q: [
                "Kontrol edilmeyen bir karıştırıcı, iki değişken arasındaki gözlenen ilişkiyi nasıl etkileyebilir?",
                "How can an uncontrolled confounder affect the observed relationship between two variables?",
              ],
              options: [
                [
                  "Olduğundan güçlü, zayıf veya hatta ters gösterebilir",
                  "It can make it look stronger, weaker, or even reversed",
                ],
                ["Sadece ilişkiyi güçlendirir, başka bir etkisi olmaz", "It can only strengthen it, nothing else"],
                ["Hiçbir zaman ilişkinin yönünü değiştiremez", "It can never change the direction of the relationship"],
                ["Sadece örneklem büyüklüğünü etkiler", "It only affects the sample size"],
              ],
              answer: 0,
              explain: [
                "Karıştırıcı, hem sebep hem sonuçla bağlantılı olduğu için ilişkiyi üç yönde bozabilir: abartabilir, küçültebilir ya da tamamen tersine çevirebilir — tıpkı Simpson paradoksunda olduğu gibi.",
                "Because a confounder is tied to both the cause and the effect, it can distort the relationship in three ways: exaggerate it, shrink it, or flip it entirely — exactly as in Simpson's paradox.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Bir karıştırıcı (confounder) değişken tam olarak nedir?",
                "What exactly is a confounder variable?",
              ],
              options: [
                [
                  "Hem sebebi hem sonucu etkileyen, kontrol edilmezse ilişkiyi çarpıtabilen üçüncü bir değişken",
                  "A third variable affecting both the cause and the effect, which can distort the relationship if left uncontrolled",
                ],
                ["Sadece sonucu etkileyen bir değişken", "A variable that affects only the outcome"],
                ["Ölçüm hatasından kaynaklanan gürültü", "Noise arising from measurement error"],
                ["Modelin hiç dahil edilmemesi gereken bir değişken", "A variable that should never be included in a model"],
              ],
              answer: 0,
              explain: [
                "Karıştırıcı hem X'i (sebep) hem Y'yi (sonuç) etkilediği için, kontrol edilmezse X-Y ilişkisi olduğundan güçlü, zayıf, hatta ters görünebilir.",
                "Because a confounder affects both X (the cause) and Y (the effect), leaving it uncontrolled can make the X-Y relationship look stronger, weaker, or even reversed compared to reality.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Simpson paradoksu tam olarak neyi tanımlar?",
                "What exactly does Simpson's paradox describe?",
              ],
              options: [
                [
                  "Her alt grupta aynı yönde giden bir ilişkinin, gruplar birleştirildiğinde tersine dönmesi",
                  "A relationship pointing the same way in every subgroup, which reverses once the groups are pooled",
                ],
                ["Örneklem büyüklüğünün yetersiz olması", "The sample size being insufficient"],
                ["İki değişkenin hiç ilişkili olmaması", "Two variables having no relationship at all"],
                ["Bir dağılımın normale yakınsaması", "A distribution converging to normal"],
              ],
              answer: 0,
              explain: [
                "Üniversite örneğinde kadınlar her iki bölümde de daha yüksek kabul oranına sahipken, toplamda erkeklerin oranı daha yüksek çıkıyor — işte bu tersine dönüş paradoksun tanımıdır.",
                "In the university example, women have the higher admission rate in both departments, yet the pooled rate favours men — that reversal is exactly what the paradox describes.",
              ],
            }),
            text(
              "Cevap **başvuru dağılımındadır**. Kadınlar ağırlıklı olarak kabul oranı düşük olan zor bölüme, erkekler ise kolay bölüme başvurmuş. Bölüm, hem cinsiyetle hem kabulle ilişkili bir **karıştırıcıdır**.\n\nPeki hangi sayı doğru? **Soruya bağlı:**\n\n- \"Bölümler kabul kararında ayrımcılık yapıyor mu?\" → bölüm bazlı oranlara bak (kadınlar lehine)\n- \"Kadınların üniversiteye girme şansı daha mı düşük?\" → toplam orana bak (evet, ama sebebi bölüm tercihi)\n\nİstatistik hangi sayının doğru olduğunu söylemez; **hangi soruyu sorduğunu bilmek** senin işindir. Bu yüzden veriyi bölmeden önce nedensel varsayımlarını netleştirmen gerekir.",
              "The answer lies in the **application mix**. Women mostly applied to the hard department with a low admission rate, men to the easy one. Department is a **confounder**, related to both gender and admission.\n\nSo which number is right? **It depends on the question:**\n\n- \"Do departments discriminate in their decisions?\" → look at the per-department rates (favouring women)\n- \"Are women less likely to get into the university?\" → look at the pooled rate (yes, but because of which department they chose)\n\nStatistics will not tell you which number is correct; **knowing which question you are asking** is your job. That is why you must make your causal assumptions explicit before splitting the data.",
            ),
            quiz({
              id: "q4",
              q: [
                "Üniversite örneğinde \"bölüm\" değişkeni neden bir karıştırıcıdır?",
                "In the university example, why is \"department\" a confounder?",
              ],
              options: [
                [
                  "Çünkü hem başvuranın cinsiyetiyle (kadınlar zor bölüme daha çok başvurmuş) hem de kabul oranıyla ilişkilidir",
                  "Because it is related to both the applicant's gender (women applied more to the hard department) and the admission rate",
                ],
                ["Çünkü bölüm rastgele atanmıştır", "Because department was assigned at random"],
                ["Çünkü bölümün kabul oranıyla hiçbir ilgisi yoktur", "Because department has no relation to admission rate at all"],
                ["Çünkü veri toplama hatası vardır", "Because there was a data collection error"],
              ],
              answer: 0,
              explain: [
                "Bir değişkenin karıştırıcı olması için hem \"sebep\" (cinsiyet) hem de \"sonuç\" (kabul) ile ilişkili olması gerekir. Bölüm tam olarak bunu yapıyor: kadınlar ağırlıklı zor bölüme başvuruyor ve zor bölümün kabul oranı zaten düşük.",
                "For a variable to be a confounder it must relate to both the \"cause\" (gender) and the \"effect\" (admission). Department does exactly that: women disproportionately applied to the hard department, which already has a low admission rate.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Simpson paradoksu örneğinde hangi sayının \"doğru\" olduğuna nasıl karar verilir?",
                "In a Simpson's paradox example, how do you decide which number is \"correct\"?",
              ],
              options: [
                [
                  "İstatistik bunu tek başına söylemez; hangi soruyu sorduğuna göre pooled ya da bölüm bazlı orana bakılır",
                  "Statistics alone will not tell you; it depends on which question you're asking — pooled or per-group rate",
                ],
                ["Her zaman toplam (pooled) orana bakılır", "You always look at the pooled overall rate"],
                ["Her zaman alt grup oranlarına bakılır", "You always look at the subgroup rates"],
                ["İki sayı da her zaman aynı sonuca varır", "Both numbers always lead to the same conclusion"],
              ],
              answer: 0,
              explain: [
                "\"Bölümler ayrımcılık yapıyor mu?\" sorusunun cevabı bölüm bazlı oranlarda, \"kadınların genel şansı nedir?\" sorusunun cevabı ise toplam oranda saklıdır — doğru sayı, sorulan soruya bağlıdır.",
                "The answer to \"do departments discriminate?\" lives in the per-department rates, while \"what are women's overall odds?\" lives in the pooled rate — the right number depends on the question being asked.",
              ],
            }),
            tip(
              "Neyi kontrol edeceğine dikkat et",
              "Be careful what you control for",
              "\"Her değişkeni modele ekle, garanti olsun\" yaklaşımı yanlıştır. Bazı değişkenleri kontrol etmek ilişkiyi **bozar**:\n\n- **Aracı değişken (mediator)** — sebebin etkisini taşıyan değişken. Reklamın satışa etkisini ölçerken \"site trafiğini\" kontrol edersen, reklamın etkisinin tam da trafik üzerinden geçtiğini görmezden gelmiş olursun.\n- **Çarpışma değişkeni (collider)** — hem sebepten hem sonuçtan etkilenen değişken. Bunu kontrol etmek **olmayan** bir ilişki yaratır.\n\nDoğru yaklaşım, hangi değişkenin ne rol oynadığını bir nedensel diyagramla önceden düşünmektir.",
              "The approach \"throw every variable into the model to be safe\" is wrong. Controlling for some variables **breaks** the relationship:\n\n- **A mediator** — a variable that carries the effect. If you control for \"site traffic\" while measuring advertising's effect on sales, you erase exactly the channel the effect travels through.\n- **A collider** — a variable affected by both cause and outcome. Controlling for it manufactures an association that does not exist.\n\nThe right approach is to think through each variable's role in advance with a causal diagram.",
            ),
            quiz({
              id: "q6",
              q: [
                "Reklamın satışa etkisini ölçerken \"site trafiğini\" kontrol etmek neden yanlış olabilir?",
                "Why can controlling for \"site traffic\" be wrong when measuring advertising's effect on sales?",
              ],
              options: [
                [
                  "Site trafiği bir aracı (mediator) değişkendir; onu kontrol etmek reklamın etkisinin geçtiği kanalı siler",
                  "Site traffic is a mediator; controlling for it erases exactly the channel through which the advertising effect operates",
                ],
                ["Site trafiği hiçbir zaman ölçülemez", "Site traffic can never be measured"],
                ["Reklam ile trafik arasında hiçbir ilişki yoktur", "There is no relationship at all between advertising and traffic"],
                ["Bu her zaman doğru bir yaklaşımdır", "This is always the correct approach"],
              ],
              answer: 0,
              explain: [
                "Reklam satışı büyük ölçüde artan siteye trafik çekerek etkiler. Trafiği sabitlersen, reklamın tam da işlediği yolu kapatmış olursun ve etkisini yapay olarak küçültürsün ya da yok edersin.",
                "Advertising largely affects sales by driving more traffic to the site. Holding traffic constant closes off exactly the channel advertising works through, artificially shrinking or erasing its apparent effect.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Bir çarpışma değişkenini (collider) kontrol etmek ne gibi bir soruna yol açar?",
                "What problem does controlling for a collider variable cause?",
              ],
              options: [
                [
                  "Aslında var olmayan sahte bir ilişki yaratır",
                  "It manufactures a spurious association that does not actually exist",
                ],
                ["Her zaman ilişkiyi doğru şekilde güçlendirir", "It always correctly strengthens the relationship"],
                ["Modelin çalışmasını imkansız hale getirir", "It makes the model impossible to run"],
                ["Hiçbir etkisi yoktur", "It has no effect at all"],
              ],
              answer: 0,
              explain: [
                "Çarpışma değişkeni hem sebepten hem sonuçtan etkilenir. Onu sabitlemek (kontrol etmek), sebep ile sonuç arasında yapay bir bağlantı doğurur — tıpkı biri aynı anda hem uzun hem yetenekli olmadıkça basketbol takımına giremiyorsa, takım üyeleri arasında boy ile yetenek arasında sahte bir ters ilişki görmen gibi.",
                "A collider is affected by both the cause and the outcome. Holding it fixed (controlling for it) creates an artificial link between cause and outcome — like seeing a spurious inverse relationship between height and skill among basketball players, since only tall-or-skilled players make the team.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "\"Garanti olsun diye modele her değişkeni ekle\" yaklaşımı neden yanlıştır?",
                "Why is the approach \"add every variable to the model to be safe\" wrong?",
              ],
              options: [
                [
                  "Bazı değişkenler (aracı, çarpışma) kontrol edildiğinde gerçek ilişkiyi bozar ya da sahte bir ilişki yaratır",
                  "Some variables (mediators, colliders) distort the real relationship or create a spurious one when controlled for",
                ],
                ["Model her zaman daha yavaş çalışır", "The model always runs slower"],
                ["Bu yaklaşımın hiçbir sakıncası yoktur", "This approach has no downside at all"],
                ["Sadece hesaplama maliyetini artırır, başka etkisi yoktur", "It only raises computation cost, nothing else"],
              ],
              answer: 0,
              explain: [
                "Doğru yaklaşım, her değişkenin nedensel diyagramdaki rolünü önceden düşünmektir. Körü körüne her şeyi eklemek, aracı değişkenler üzerinden gerçek etkiyi silebilir veya çarpışma değişkenleri üzerinden var olmayan bir ilişki uydurabilir.",
                "The right approach is to think through each variable's role in a causal diagram beforehand. Blindly adding everything can erase the real effect through mediators, or fabricate a nonexistent relationship through colliders.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Üniversite örneğinde kolay bölümde kadınların kabul oranı %85, erkeklerin %75; zor bölümde kadınların %15, erkeklerin %10. Bu iki bölüm sonucu birlikte neyi gösteriyor?",
                "In the university example, women's admission rate is 85% vs men's 75% in the easy department, and 15% vs 10% in the hard one. What do these two department results show together?",
              ],
              options: [
                [
                  "Kadınlar her iki bölümde de erkeklerden daha yüksek kabul oranına sahip",
                  "Women have a higher admission rate than men in both departments",
                ],
                ["Erkekler her iki bölümde de daha yüksek orana sahip", "Men have a higher rate in both departments"],
                ["İki bölümde de oranlar eşittir", "The rates are equal in both departments"],
                ["Zor bölümde erkekler, kolay bölümde kadınlar daha yüksek orana sahip", "Men lead in the hard department, women in the easy one"],
              ],
              answer: 0,
              explain: [
                "85 > 75 ve 15 > 10 olduğu için kadınlar her iki bölümde de daha yüksek kabul oranına sahiptir. Toplamda erkeklerin daha yüksek görünmesi, kadınların ağırlıklı olarak düşük kabul oranlı zor bölüme başvurmuş olmasından kaynaklanır.",
                "Since 85 > 75 and 15 > 10, women have the higher admission rate in both departments. The overall figure favouring men arises purely because women disproportionately applied to the harder department with its lower admission rate.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Yeni tedavi, toplamda eski tedaviden kötü görünüyor; ama hem hafif hem ağır vakalarda daha iyi. Muhtemel sebep?",
                "A new treatment looks worse overall than the old one, yet better in both mild and severe cases. The likely cause?",
              ],
              options: [
                [
                  "Yeni tedavi ağırlıklı olarak ağır vakalara verilmiş; vaka ağırlığı karıştırıcı",
                  "The new treatment was mostly given to severe cases; case severity is a confounder",
                ],
                ["Veri hatalıdır", "The data is wrong"],
                ["Örneklem çok küçüktür", "The sample is too small"],
                ["Yeni tedavi gerçekten kötüdür", "The new treatment really is worse"],
              ],
              answer: 0,
              explain: [
                "Doktorlar yeni tedaviyi umutsuz vakalarda denemişse, o grubun sonuçları doğal olarak kötüdür ve toplam ortalamayı aşağı çeker. Karar için alt grup sonuçlarına bakmak gerekir — ya da en baştan rastgele atama yapan bir deney tasarlamak.",
                "If doctors reserved the new treatment for the most desperate cases, that group's outcomes are naturally poor and drag the pooled average down. The decision should rest on the subgroup results — or better, on an experiment that randomised assignment in the first place.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "bayesci-dusunme",
          title: L("Bayesçi düşünme", "Bayesian thinking"),
          summary: L(
            "Yeni kanıt geldiğinde inancını nasıl güncellersin? Ön bilgiyi hesaba katan yaklaşım.",
            "How do you update a belief when new evidence arrives? The approach that takes prior knowledge into account.",
          ),
          minutes: 20,
          blocks: [
            text(
              "Klasik (frekansçı) yaklaşım şunu sorar: \"Hipotez doğruysa bu veriyi görme olasılığı nedir?\" — yani `P(veri | hipotez)`.\n\nBayesçi yaklaşım tersini sorar: \"Bu veriyi gördüğüme göre hipotezin doğru olma olasılığı nedir?\" — yani `P(hipotez | veri)`. Bu, aslında herkesin bilmek istediği sorudur.\n\n**Bayes teoremi** ikisini birbirine bağlar:\n\n`P(H|V) = P(V|H) × P(H) / P(V)`\n\n- **P(H)** — **önsel (prior)**: veriyi görmeden önceki inancın\n- **P(V|H)** — **olabilirlik**: hipotez doğruysa bu veriyi görme şansı\n- **P(H|V)** — **sonsal (posterior)**: güncellenmiş inancın",
              "The classical (frequentist) approach asks: \"if the hypothesis were true, how likely is this data?\" — that is `P(data | hypothesis)`.\n\nThe Bayesian approach asks the reverse: \"given that I saw this data, how likely is the hypothesis?\" — that is `P(hypothesis | data)`. This is in fact the question everybody wants answered.\n\n**Bayes' theorem** connects the two:\n\n`P(H|D) = P(D|H) × P(H) / P(D)`\n\n- **P(H)** — the **prior**: what you believed before seeing the data\n- **P(D|H)** — the **likelihood**: the chance of this data if the hypothesis holds\n- **P(H|D)** — the **posterior**: your updated belief",
            ),
            quiz({
              id: "q2",
              q: [
                "Klasik (frekansçı) yaklaşım tam olarak hangi soruyu sorar?",
                "What exact question does the classical (frequentist) approach ask?",
              ],
              options: [
                ["Hipotez doğruysa bu veriyi görme olasılığı nedir? — P(veri | hipotez)", "If the hypothesis were true, how likely is this data? — P(data | hypothesis)"],
                ["Bu veriyi gördüğüme göre hipotezin doğru olma olasılığı nedir?", "Given that I saw this data, how likely is the hypothesis?"],
                ["Hipotez kaç kez test edilmiştir?", "How many times has the hypothesis been tested?"],
                ["Örneklem büyüklüğü yeterli midir?", "Is the sample size large enough?"],
              ],
              answer: 0,
              explain: [
                "Frekansçı yaklaşım `P(veri | hipotez)` yönünde ilerler: hipotezi sabit tutup verinin ne kadar olası olduğunu sorar. Bu, p-değerinin de temelini oluşturan mantıktır.",
                "The frequentist approach works in the direction `P(data | hypothesis)`: it holds the hypothesis fixed and asks how likely the data is. This is also the logic underlying the p-value.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bayesçi yaklaşım hangi soruyu sorar ve neden \"herkesin bilmek istediği soru\" olarak anılır?",
                "What question does the Bayesian approach ask, and why is it called \"the question everybody actually wants answered\"?",
              ],
              options: [
                [
                  "Bu veriyi gördüğüme göre hipotezin doğru olma olasılığı nedir? — çünkü karar verirken tam olarak bunu bilmek isteriz",
                  "Given that I saw this data, how likely is the hypothesis? — because that is exactly what we want to know when deciding",
                ],
                ["Hipotez doğruysa bu veriyi görme olasılığı nedir?", "If the hypothesis were true, how likely is this data?"],
                ["Testin ne kadar süreceği nedir?", "How long will the test take?"],
                ["Verinin normal dağılıp dağılmadığı nedir?", "Whether the data is normally distributed"],
              ],
              answer: 0,
              explain: [
                "Bir karar vericinin gerçekte merak ettiği \"bu hipotez ne kadar doğru?\" sorusudur, \"hipotez doğru olsaydı veri nasıl görünürdü?\" değil. Bayesçi yaklaşım doğrudan bu soruyu yanıtlar.",
                "What a decision-maker actually wants to know is \"how likely is this hypothesis?\", not \"what would the data look like if the hypothesis were true?\". The Bayesian approach answers that question directly.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Bayes teoreminde P(H) (önsel) neyi ifade eder?",
                "In Bayes' theorem, what does P(H) (the prior) represent?",
              ],
              options: [
                ["Veriyi görmeden önceki inancını", "What you believed before seeing the data"],
                ["Veriyi gördükten sonraki inancını", "What you believe after seeing the data"],
                ["Hipotez doğruysa verinin olasılığını", "The probability of the data given the hypothesis"],
                ["Testin anlamlılık düzeyini", "The test's significance level"],
              ],
              answer: 0,
              explain: [
                "Önsel, kanıt gelmeden önceki başlangıç inancıdır. Bayes teoremi bu inancı yeni kanıtla (olabilirlik) çarparak günceller.",
                "The prior is the starting belief before any evidence arrives. Bayes' theorem updates that belief by multiplying it with the new evidence (the likelihood).",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Bayes teoreminde P(D|H) (olabilirlik) ile P(H|D) (sonsal) arasındaki fark nedir?",
                "In Bayes' theorem, what is the difference between P(D|H) (the likelihood) and P(H|D) (the posterior)?",
              ],
              options: [
                [
                  "Olabilirlik hipotez doğruysa verinin şansıdır; sonsal ise veriyi gördükten sonraki güncellenmiş inançtır",
                  "The likelihood is the chance of the data given the hypothesis; the posterior is the updated belief after seeing the data",
                ],
                ["İkisi matematiksel olarak birbirinin aynıdır", "They are mathematically identical"],
                ["Olabilirlik her zaman sonsaldan büyüktür", "The likelihood is always larger than the posterior"],
                ["Sonsal hiçbir zaman hesaplanamaz", "The posterior can never actually be computed"],
              ],
              answer: 0,
              explain: [
                "Olabilirlik `P(veri|hipotez)` yönünde, sonsal ise `P(hipotez|veri)` yönündedir — Bayes teoremi tam olarak olabilirliği önselle çarpıp bu iki farklı koşullu olasılığı birbirine bağlar.",
                "The likelihood runs in the direction `P(data|hypothesis)`, the posterior in the direction `P(hypothesis|data)` — Bayes' theorem connects these two different conditional probabilities by multiplying the likelihood with the prior.",
              ],
            }),
            text(
              "Önsel olasılık, Bayesçi yaklaşımın hem gücü hem tartışmalı yanıdır. Gücü: **ön bilgiyi hesaba katar.**\n\nA/B testinde 100 kullanıcıyla %40 iyileşme gördüğünü düşün. Frekansçı yaklaşım p-değerini hesaplar. Bayesçi yaklaşım şunu sorar: \"Bu üründe daha önce yapılan 200 testin hiçbiri %5'i geçmedi. %40'lık bir iyileşme gerçekten olası mı, yoksa küçük örneklem gürültüsü mü?\"\n\nCevap genellikle ikincisidir ve Bayesçi tahmin bu yüzden %40'ı gerçeğe doğru çeker. Buna **küçültme (shrinkage)** denir ve az veriyle çalışırken aşırı iyimser sonuçlara karşı doğal bir korumadır.",
              "The prior is both the strength and the controversy of the Bayesian approach. Its strength: it **takes prior knowledge into account**.\n\nImagine an A/B test showing a 40% lift on 100 users. The frequentist approach computes a p-value. The Bayesian approach asks: \"none of the 200 previous tests on this product beat 5%. Is a 40% lift really plausible, or is this small-sample noise?\"\n\nThe answer is usually the latter, and the Bayesian estimate therefore pulls the 40% back toward reality. This is called **shrinkage**, and it is a natural defence against over-optimistic results when data is scarce.",
            ),
            quiz({
              id: "q6",
              q: [
                "100 kullanıcılı bir testte %40 iyileşme görüldüğünde Bayesçi yaklaşım neden bu sayıyı olduğu gibi kabul etmez?",
                "When a test on 100 users shows a 40% lift, why doesn't the Bayesian approach accept that number at face value?",
              ],
              options: [
                [
                  "Bu üründeki önceki 200 testin hiçbiri %5'i geçmediği için, %40'lık bir sonuç önsel bilgiyle çelişir ve muhtemelen küçük örneklem gürültüsüdür",
                  "None of the 200 previous tests on this product beat 5%, so a 40% result conflicts with the prior and is likely small-sample noise",
                ],
                ["Çünkü 100 kullanıcı istatistiksel olarak imkânsız bir sayıdır", "Because 100 users is a statistically impossible sample size"],
                ["Çünkü Bayesçi yaklaşım hiçbir zaman A/B testi sonucu kabul etmez", "Because the Bayesian approach never accepts A/B test results"],
                ["Çünkü %40 matematiksel olarak geçersiz bir orandır", "Because 40% is a mathematically invalid rate"],
              ],
              answer: 0,
              explain: [
                "Bayesçi yaklaşım geçmiş bilgiyi (önsel) hesaba katar. Bu ürün için geçmiş 200 test hiç %5'i geçmediyse, %40'lık bir sıçrama önsele göre çok olasılıksızdır ve tahmin gerçeğe doğru çekilir.",
                "The Bayesian approach factors in prior knowledge. If 200 past tests on this product never beat 5%, a 40% jump is highly implausible under that prior, so the estimate gets pulled back toward reality.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Bayesçi istatistikte \"küçültme (shrinkage)\" ne işe yarar?",
                "What does \"shrinkage\" do in Bayesian statistics?",
              ],
              options: [
                [
                  "Az veriyle çalışırken aşırı iyimser sonuçlara karşı doğal bir koruma sağlar, tahmini önsele doğru çeker",
                  "It provides a natural defence against over-optimistic results with scarce data, pulling the estimate toward the prior",
                ],
                ["Örneklem büyüklüğünü küçültür", "It shrinks the sample size"],
                ["p-değerini sıfıra indirir", "It reduces the p-value to zero"],
                ["Veri setinden aykırı değerleri siler", "It deletes outliers from the dataset"],
              ],
              answer: 0,
              explain: [
                "Küçültme, az veriyle elde edilen uç sonuçları önsel bilgi doğrultusunda daha ölçülü bir tahmine doğru çeker — bu, küçük örneklemlerde aşırı iyimser yorumlara karşı doğal bir fren görevi görür.",
                "Shrinkage pulls extreme results obtained from little data toward a more moderate estimate consistent with the prior — a natural brake against over-optimistic readings from small samples.",
              ],
            }),
            info(
              "Hangisini kullanmalı?",
              "Which should you use?",
              "İkisi rakip değil, farklı sorulara uygun araçlardır.\n\n**Frekansçı** — düzenleyici onay, bilimsel yayın ve standartlaşmış raporlama gereken yerler. Prosedürü nettir ve öznel önsel tartışması içermez.\n\n**Bayesçi** — az veri olan, ön bilginin gerçekten değerli olduğu ve kararın sürekli güncellendiği yerler: ürün deneyleri, tıbbi teşhis, spam filtresi, öneri sistemleri. \"B'nin kazanma olasılığı %92\" gibi doğrudan karar verilebilir cümleler kurar — ki yöneticilerin istediği tam olarak budur.",
              "They are not rivals but tools suited to different questions.\n\n**Frequentist** — regulatory approval, scientific publication and anywhere standardised reporting is required. The procedure is clear-cut and involves no argument about a subjective prior.\n\n**Bayesian** — settings with little data, where prior knowledge genuinely helps and decisions are updated continuously: product experiments, medical diagnosis, spam filters, recommender systems. It produces directly actionable sentences like \"there is a 92% probability B wins\" — which is exactly what decision-makers ask for.",
            ),
            quiz({
              id: "q10",
              q: [
                "Derse göre frekansçı ve Bayesçi yaklaşımlar birbirine nasıl konumlandırılır?",
                "Per the lesson, how are the frequentist and Bayesian approaches positioned relative to each other?",
              ],
              options: [
                [
                  "Rakip değildirler; farklı sorulara ve bağlamlara uygun iki ayrı araçtırlar",
                  "They are not rivals; they are two separate tools suited to different questions and contexts",
                ],
                ["Bayesçi yaklaşım her zaman frekansçı yaklaşımın yerini almalıdır", "The Bayesian approach should always replace the frequentist one"],
                ["Frekansçı yaklaşım artık kullanılmamalıdır", "The frequentist approach should no longer be used"],
                ["İkisi matematiksel olarak birbirinin tam aynısıdır", "The two are mathematically identical"],
              ],
              answer: 0,
              explain: [
                "Ders, ikisini de geçerli araçlar olarak sunar: standart, tekrarlanabilir prosedür gerektiğinde frekansçı; az veriyle sürekli güncellenen kararlarda Bayesçi yaklaşım tercih edilir.",
                "The lesson presents both as valid tools: frequentist when a standard, replicable procedure is needed; Bayesian when decisions are continuously updated with scarce data.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Düzenleyici onay veya bilimsel yayın gibi standartlaşmış raporlama gereken durumlarda hangi yaklaşım tercih edilir ve neden?",
                "In settings needing standardised reporting, like regulatory approval or scientific publication, which approach is preferred, and why?",
              ],
              options: [
                [
                  "Frekansçı yaklaşım; prosedürü nettir ve öznel bir önsel tartışması içermez",
                  "The frequentist approach; its procedure is clear-cut and involves no argument about a subjective prior",
                ],
                ["Bayesçi yaklaşım; her zaman daha hızlıdır", "The Bayesian approach; it is always faster"],
                ["İkisi de kullanılamaz bu durumlarda", "Neither approach can be used in these settings"],
                ["Rastgele seçilir, fark etmez", "It's chosen at random, it doesn't matter"],
              ],
              answer: 0,
              explain: [
                "Düzenleyici kurumlar ve dergiler, herkesin aynı şekilde tekrarlayabileceği standart bir prosedür ister; frekansçı yaklaşım öznel bir önsel seçimi gerektirmediği için bu bağlamda tercih edilir.",
                "Regulators and journals want a standard procedure everyone can replicate the same way; the frequentist approach is preferred here precisely because it requires no subjective choice of prior.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Ürün deneyleri, tıbbi teşhis, spam filtresi gibi alanlarda Bayesçi yaklaşım neden tercih edilir?",
                "Why is the Bayesian approach preferred in domains like product experiments, medical diagnosis, and spam filters?",
              ],
              options: [
                [
                  "Veri az olduğunda önsel bilgi gerçekten yardımcı olur ve kararlar sürekli güncellenir; doğrudan uygulanabilir sonuçlar üretir",
                  "Prior knowledge genuinely helps when data is scarce and decisions are updated continuously; it produces directly actionable results",
                ],
                ["Bu alanlarda p-değeri hesaplamak imkânsızdır", "Computing a p-value is impossible in these domains"],
                ["Bayesçi yaklaşım her zaman daha az hesaplama gerektirir", "The Bayesian approach always needs less computation"],
                ["Bu alanlarda önsel bilgiye hiç ihtiyaç yoktur", "Prior knowledge is never needed in these domains"],
              ],
              answer: 0,
              explain: [
                "Bu alanlarda veri sık sık az ve kararlar sürekli güncellenir; Bayesçi yaklaşım \"B'nin kazanma olasılığı %92\" gibi doğrudan karar verilebilir cümleler üretir — yöneticilerin istediği tam olarak budur.",
                "In these domains data is often scarce and decisions are continuously updated; the Bayesian approach produces directly actionable statements like \"there is a 92% probability B wins\" — exactly what decision-makers want.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Nadir bir hastalık için testin pozitif çıktı ama gerçekten hasta olma olasılığın düşük. Bu hangi kavramla açıklanır?",
                "Your test for a rare disease came back positive, yet your probability of being ill is low. Which concept explains this?",
              ],
              options: [
                [
                  "Önsel olasılık düşük olduğu için sonsal olasılık da düşük kalır",
                  "Because the prior is low, the posterior stays low as well",
                ],
                ["Test hatalıdır", "The test is faulty"],
                ["Örneklem yanlıdır", "The sample is biased"],
                ["p-değeri yanlış hesaplanmıştır", "The p-value was miscalculated"],
              ],
              answer: 0,
              explain: [
                "Bayes teoremi, kanıtı önsel olasılıkla çarpar. Hastalık nüfusun %1'indeyse, pozitif test bu inancı yükseltir ama sıfırdan başlamadığı için sonuç yine de düşük kalır. Bu, tarama testlerinin neden ikinci bir doğrulama testi gerektirdiğinin istatistiksel sebebidir.",
                "Bayes' theorem multiplies the evidence by the prior. If the disease affects 1% of people, a positive test raises that belief but, starting from such a low base, the result stays low. This is the statistical reason screening tests require a second confirmatory test.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "nedensel-cikarim",
          title: L("Deney yapamadığında nedensellik", "Causality when you cannot experiment"),
          summary: L(
            "A/B testi mümkün değilse, gözlemsel veriden nedensel etki nasıl tahmin edilir?",
            "When an A/B test is impossible, how do you estimate a causal effect from observational data?",
          ),
          minutes: 22,
          blocks: [
            text(
              "Altın standart **rastgele kontrollü deneydir**: kullanıcıları rastgele böl, birine değişikliği uygula, farkı ölç. Rastgelelik tüm karıştırıcıları ortalama olarak dengeler.\n\nAma çoğu zaman deney yapamazsın: fiyat artışını rastgele müşterilere uygulamak etik ve ticari olarak imkânsızdır; geçmişte yaşanmış bir olayı geri alamazsın; bazı değişiklikler herkese aynı anda uygulanmak zorundadır.\n\nBu durumlarda **yarı-deneysel (quasi-experimental)** yöntemler devreye girer.",
              "The gold standard is the **randomised controlled trial**: split users at random, apply the change to one group, measure the difference. Randomisation balances every confounder on average.\n\nBut often you cannot experiment: applying a price rise to random customers is ethically and commercially impossible; you cannot undo an event that already happened; some changes must go to everyone at once.\n\nIn those situations **quasi-experimental** methods step in.",
            ),
            quiz({
              id: "q2",
              q: [
                "Nedensel çıkarımda \"altın standart\" yöntem nedir?",
                "What is the \"gold standard\" method for causal inference?",
              ],
              options: [
                ["Rastgele kontrollü deney", "The randomised controlled trial"],
                ["Regresyon analizi", "Regression analysis"],
                ["Anket çalışması", "A survey study"],
                ["Betimsel istatistik", "Descriptive statistics"],
              ],
              answer: 0,
              explain: [
                "Rastgele kontrollü deneyde kullanıcılar şansa göre bölünür; bu, bilinen ya da bilinmeyen tüm karıştırıcıları iki grup arasında ortalama olarak dengeler ve sonuçtaki farkı doğrudan değişikliğe atfetmeyi mümkün kılar.",
                "In a randomised controlled trial, users are split by chance; this balances every confounder, known or unknown, between the two groups on average and lets you attribute the resulting difference directly to the change.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Rastgeleleştirme neden karıştırıcı değişkenler sorununu çözer?",
                "Why does randomisation solve the confounder problem?",
              ],
              options: [
                [
                  "Bilinen ya da bilinmeyen tüm karıştırıcıları iki grup arasında ortalama olarak dengeler",
                  "It balances every confounder, known or unknown, between the two groups on average",
                ],
                ["Çünkü tüm karıştırıcıları veri setinden siler", "Because it deletes all confounders from the dataset"],
                ["Çünkü örneklem büyüklüğünü otomatik olarak artırır", "Because it automatically increases the sample size"],
                ["Çünkü p-değerini sıfıra indirir", "Because it reduces the p-value to zero"],
              ],
              answer: 0,
              explain: [
                "Rastgele atama sayesinde, ölçtüğün ya da ölçemediğin hiçbir özellik (yaş, motivasyon, gelir vb.) iki grup arasında sistematik olarak farklılaşmaz — bu yüzden gözlenen fark güvenle değişikliğe atfedilebilir.",
                "With random assignment, no characteristic you measured or failed to measure — age, motivation, income, and so on — differs systematically between the two groups, so the observed difference can be confidently attributed to the change.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Derste verilen örneklere göre, deney yapmanın imkânsız olduğu durumlar hangileridir?",
                "Per the lesson's examples, which situations make running an experiment impossible?",
              ],
              options: [
                [
                  "Etik/ticari olarak imkânsız değişiklikler (ör. rastgele fiyat artışı), geçmiş bir olayı geri alamama, ya da değişikliğin herkese aynı anda uygulanması gereken durumlar",
                  "Ethically/commercially impossible changes (e.g. a random price rise), being unable to undo a past event, or changes that must apply to everyone at once",
                ],
                ["Sadece örneklem büyüklüğü yetersiz olduğunda", "Only when the sample size is insufficient"],
                ["Sadece veri toplama araçları eksik olduğunda", "Only when data collection tools are missing"],
                ["Deney her zaman mümkündür, hiçbir engel yoktur", "An experiment is always possible, there is no such barrier"],
              ],
              answer: 0,
              explain: [
                "Ders üç somut engel sayar: fiyat artışını rastgele müşterilere uygulamanın etik/ticari olarak imkânsız olması, geçmişte olmuş bir olayı geri alamamak ve bazı değişikliklerin herkese aynı anda uygulanmak zorunda olması.",
                "The lesson names three concrete barriers: applying a price rise to random customers being ethically/commercially impossible, being unable to undo an event that already happened, and some changes needing to go to everyone simultaneously.",
              ],
            }),
            text(
              "**Dört pratik yöntem:**\n\n1. **Fark-içinde-fark (difference-in-differences)** — Değişiklikten etkilenen ve etkilenmeyen iki grubun öncesi ve sonrasını karşılaştır; ortak trendi çıkarır. Bir şehirde açılan mağazanın etkisini benzer bir şehirle karşılaştırarak ölçersin.\n\n2. **Eşleştirme (propensity score matching)** — Tedavi görenlerle, gözlenen özellikleri benzer olan görmeyenleri eşleştir. \"Aynı yaş, aynı harcama, aynı şehir ama kampanyayı almamış\" müşteriyi bulursun.\n\n3. **Süreksizlik tasarımı (regression discontinuity)** — Keskin bir eşik varsa, eşiğin hemen iki yanındaki kişiler neredeyse rastgele bölünmüş sayılır. 999 TL harcayanla 1001 TL harcayan neredeyse aynı kişilerdir ama biri sadakat programına girer.\n\n4. **Araç değişken (instrumental variable)** — Sonucu yalnızca sebep üzerinden etkileyen dış bir değişken bul. Zor ama güçlüdür.",
              "**Four practical methods:**\n\n1. **Difference-in-differences** — Compare before and after for a group affected by the change and one that was not; it subtracts the shared trend. You measure a new store's effect in one city by comparing it with a similar city.\n\n2. **Propensity score matching** — Pair treated units with untreated ones that look similar on observed characteristics. You find the customer of \"the same age, same spend, same city, but who did not get the campaign\".\n\n3. **Regression discontinuity** — Where a sharp threshold exists, people just either side of it are effectively randomly split. Someone spending 999 and someone spending 1001 are nearly identical, yet only one enters the loyalty programme.\n\n4. **Instrumental variables** — Find an outside variable that affects the outcome only through the cause. Hard, but powerful.",
            ),
            quiz({
              id: "q5",
              q: [
                "Fark-içinde-fark (difference-in-differences) yöntemi ne yapar?",
                "What does the difference-in-differences method do?",
              ],
              options: [
                [
                  "Etkilenen ve etkilenmeyen grubun öncesi-sonrasını karşılaştırıp ortak trendi çıkarır",
                  "It compares before-and-after for an affected and an unaffected group, subtracting out the shared trend",
                ],
                ["Sadece etkilenen grubun öncesini ve sonrasını karşılaştırır", "It only compares before and after for the affected group"],
                ["Rastgele bir kontrol grubu oluşturur", "It creates a randomised control group"],
                ["Verideki aykırı değerleri çıkarır", "It removes outliers from the data"],
              ],
              answer: 0,
              explain: [
                "Sadece etkilenen grubun öncesi-sonrası farkına bakarsan mevsimsellik veya genel büyüme gibi ortak etkenleri kampanyaya mal edersin. Kontrol grubunun kendi değişimini çıkarmak, bu paylaşılan trendi elemeni sağlar.",
                "Looking only at the affected group's before-after change would misattribute shared factors like seasonality or general growth to the campaign. Subtracting the control group's own change removes that shared trend.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Eşleştirme (propensity score matching) yöntemi neyi yapar?",
                "What does propensity score matching do?",
              ],
              options: [
                [
                  "Tedavi görenleri, gözlenen özellikleri benzer olan tedavi görmeyenlerle eşleştirir",
                  "It pairs treated units with untreated ones that look similar on observed characteristics",
                ],
                ["Tüm kullanıcıları rastgele iki gruba böler", "It splits all users into two groups at random"],
                ["Sadece en yüksek harcama yapan müşterileri seçer", "It only selects the highest-spending customers"],
                ["Zaman serisindeki trendi çıkarır", "It removes the trend from a time series"],
              ],
              answer: 0,
              explain: [
                "Örnekte \"aynı yaş, aynı harcama, aynı şehir ama kampanyayı almamış\" müşteri bulunur — amaç, tedavi almayan grubu tedavi alan gruba mümkün olduğunca benzer kılmaktır.",
                "The example finds the customer of \"the same age, same spend, same city, but who did not get the campaign\" — the goal is to make the untreated group look as much as possible like the treated one.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Süreksizlik tasarımı (regression discontinuity) hangi durumda kullanılır ve mantığı nedir?",
                "When is regression discontinuity used, and what is its logic?",
              ],
              options: [
                [
                  "Keskin bir eşik varsa; eşiğin hemen iki yanındaki kişiler neredeyse rastgele bölünmüş sayılır",
                  "When a sharp threshold exists; people just either side of it are treated as nearly randomly split",
                ],
                ["Veri hiç eşik içermediğinde kullanılır", "It's used when the data contains no threshold at all"],
                ["Sadece çok büyük örneklemlerde çalışır", "It only works with very large samples"],
                ["Zaman serisi verisi gerektirmez", "It requires no time-series data"],
              ],
              answer: 0,
              explain: [
                "999 TL harcayanla 1001 TL harcayan kişi neredeyse aynıdır ama sadece biri eşiği geçip sadakat programına girer; bu doğal \"neredeyse rastgele\" bölünme, eşik civarındaki karşılaştırmayı deneye yakın kılar.",
                "Someone spending 999 and someone spending 1001 are nearly identical, yet only one crosses the threshold into the loyalty programme; this natural \"almost random\" split makes the comparison near the threshold close to an experiment.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Araç değişken (instrumental variable) yöntemi neyi arar?",
                "What does the instrumental variable method look for?",
              ],
              options: [
                [
                  "Sonucu yalnızca sebep üzerinden etkileyen dış bir değişken",
                  "An outside variable that affects the outcome only through the cause",
                ],
                ["Sonucu doğrudan etkileyen herhangi bir değişken", "Any variable that directly affects the outcome"],
                ["En yüksek korelasyona sahip değişken", "The variable with the highest correlation"],
                ["Zaman içinde sabit kalan bir değişken", "A variable that stays constant over time"],
              ],
              answer: 0,
              explain: [
                "Araç değişken, sonuca yalnızca ilgilenilen sebep aracılığıyla ulaşmalıdır — başka hiçbir yoldan sonucu etkilememelidir. Bu koşulu sağlayan değişken bulmak zordur ama bulunduğunda güçlü bir kanıt sağlar.",
                "An instrumental variable must reach the outcome only through the cause of interest — it must affect the outcome through no other path. Finding a variable that satisfies this is hard, but when found it provides strong evidence.",
              ],
            }),
            pitfall(
              "Bu yöntemler deneyin yerini tutmaz",
              "These methods do not replace an experiment",
              "Hepsi **gözlenmemiş karıştırıcı olmadığı** varsayımına dayanır ve bu varsayım veriyle kanıtlanamaz. Eşleştirme yalnızca ölçebildiğin değişkenler üzerinden çalışır; müşterinin motivasyonu gibi ölçemediğin bir şey hâlâ sonucu bozabilir.\n\nDoğru tutum, sonucu \"nedensel etki şudur\" diye değil, **\"şu varsayımlar altında nedensel etki şudur\"** diye raporlamaktır. Ve mümkünse, tahmini küçük bir deneyle doğrulamaktır.",
              "All of them rest on the assumption that **no unobserved confounder exists**, and that assumption cannot be proven from the data. Matching works only on the variables you can measure; something you cannot measure, such as customer motivation, can still distort the result.\n\nThe honest stance is to report the finding not as \"the causal effect is X\" but as **\"under these assumptions, the causal effect is X\"** — and, where possible, to validate the estimate with a small experiment.",
            ),
            quiz({
              id: "q9",
              q: [
                "Yarı-deneysel yöntemlerin (fark-içinde-fark, eşleştirme vb.) hepsinin dayandığı, veriyle kanıtlanamayan varsayım nedir?",
                "What is the assumption underlying all quasi-experimental methods (diff-in-diff, matching, etc.) that cannot be proven from the data?",
              ],
              options: [
                ["Gözlenmemiş bir karıştırıcının olmadığı varsayımı", "The assumption that no unobserved confounder exists"],
                ["Örneklem büyüklüğünün yeterli olduğu varsayımı", "The assumption that the sample size is sufficient"],
                ["Verinin normal dağıldığı varsayımı", "The assumption that the data is normally distributed"],
                ["p-değerinin 0,05'ten küçük olduğu varsayımı", "The assumption that the p-value is below 0.05"],
              ],
              answer: 0,
              explain: [
                "Eşleştirme gibi yöntemler sadece ölçebildiğin değişkenler üzerinden çalışır; müşterinin motivasyonu gibi ölçemediğin bir şey hâlâ sonucu bozabilir ve bunu veriden doğrudan görüp kanıtlayamazsın.",
                "Methods like matching only work on variables you can measure; something unmeasurable like customer motivation can still distort the result, and you cannot see or prove that directly from the data.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Pitfall'a göre, bu yöntemlerle bulunan bir nedensel etki nasıl dürüstçe raporlanmalıdır?",
                "Per the pitfall, how should a causal effect found with these methods be honestly reported?",
              ],
              options: [
                [
                  "\"Şu varsayımlar altında nedensel etki şudur\" şeklinde, koşullu olarak",
                  "Conditionally, as \"under these assumptions, the causal effect is X\"",
                ],
                ["\"Nedensel etki kesinlikle şudur\" şeklinde, koşulsuz olarak", "Unconditionally, as \"the causal effect is definitely X\""],
                ["Hiç raporlanmamalıdır, sonuç güvenilmezdir", "It should not be reported at all, the result is unreliable"],
                ["Sadece p-değeri raporlanmalıdır", "Only the p-value should be reported"],
              ],
              answer: 0,
              explain: [
                "Gözlenmemiş karıştırıcı olmadığı varsayımı kanıtlanamadığı için, bulguyu koşulsuz bir gerçek gibi değil, dayandığı varsayımlarla birlikte sunmak gerekir — mümkünse küçük bir deneyle de doğrulanmalıdır.",
                "Since the no-unobserved-confounder assumption cannot be proven, the finding should be presented together with the assumptions it rests on rather than as an unconditional fact — and validated with a small experiment where possible.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Bir şehirde reklam kampanyası yaptın, satışlar %12 arttı. Nedensel etkiyi tahmin etmenin en iyi yolu?",
                "You ran an ad campaign in one city and sales rose 12%. What is the best way to estimate the causal effect?",
              ],
              options: [
                [
                  "Kampanya yapılmayan benzer bir şehirle öncesi-sonrası farkını karşılaştırmak",
                  "Compare the before-after change against a similar city with no campaign",
                ],
                [
                  "%12'yi doğrudan kampanyanın etkisi saymak",
                  "Take the 12% as the campaign's effect directly",
                ],
                ["Geçen yılın aynı ayıyla karşılaştırmak", "Compare with the same month last year"],
                ["Kampanya süresini uzatmak", "Extend the campaign"],
              ],
              answer: 0,
              explain: [
                "%12'nin ne kadarı kampanyadan, ne kadarı mevsimsellikten veya genel pazar büyümesinden geliyor bilemezsin. Kontrol şehri bu ortak etkileri taşır; iki şehrin değişimi arasındaki fark, kampanyaya atfedilebilecek net etkidir. Bu, fark-içinde-fark yöntemidir.",
                "You cannot tell how much of the 12% came from the campaign versus seasonality or general market growth. A control city carries those shared effects; the difference between the two cities' changes is the net effect attributable to the campaign. This is difference-in-differences.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
