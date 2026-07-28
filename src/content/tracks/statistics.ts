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
            pitfall(
              "Sayı görünen her şey sayı değildir",
              "Not everything that looks numeric is a number",
              "Posta kodu, müşteri numarası ve anket kodları veritabanında tam sayı olarak durur ama **nominal**dir. \"Ortalama posta kodu 34521\" cümlesi anlamsızdır.\n\nAynı tuzak sıralı ölçekte de vardır: memnuniyeti 1-5 arası kodlarsan ortalaması 3,7 çıkar — ama \"iyi\" ile \"çok iyi\" arasındaki mesafenin \"kötü\" ile \"orta\" arasındakiyle aynı olduğunu kimse garanti etmedi. Bu yüzden anket sonuçlarında medyan ve dağılım, ortalamadan daha dürüst bir özettir.",
              "Postcodes, customer numbers and survey codes sit in the database as integers but are **nominal**. \"The average postcode is 34521\" is a meaningless sentence.\n\nThe same trap exists on ordinal scales: code satisfaction 1-5 and the mean comes out at 3.7 — but nobody guaranteed the distance between \"good\" and \"very good\" equals the one between \"poor\" and \"fair\". This is why the median and the distribution are a more honest summary of survey results than the mean.",
            ),
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
            info(
              "Aralık sayısı sonucu değiştirir",
              "The bin count changes the story",
              "Histogramda kaç aralık kullandığın, gördüğün şekli belirler. Çok az aralık ayrıntıyı yok eder (her şey tek tepe görünür); çok fazla aralık gürültüyü tepe sanmana yol açar.\n\nPratik başlangıç: **Sturges kuralı** ile `1 + log2(n)` veya karekök kuralı ile `√n` aralık. Ama asıl doğru yaklaşım birkaç farklı aralık sayısını deneyip şeklin **kararlı** olup olmadığına bakmaktır. Bir tepe yalnızca tek bir aralık sayısında görünüyorsa, muhtemelen gerçek değildir.",
              "How many bins you use decides the shape you see. Too few bins destroy detail (everything looks unimodal); too many make you mistake noise for peaks.\n\nA practical start: **Sturges' rule**, `1 + log2(n)` bins, or the square-root rule, `√n`. But the truly correct approach is to try several bin counts and check whether the shape is **stable**. A peak that appears at only one bin count is probably not real.",
            ),
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
            info(
              "Bağımsızlık varsayımı en pahalı varsayımdır",
              "Independence is the most expensive assumption",
              "İki olayın bağımsız olduğunu varsaymak hesabı kolaylaştırır ama gerçekte nadiren doğrudur. \"Her müşterinin ayrılma olasılığı %5, o hâlde 10 müşterinin hepsinin kalma olasılığı 0,95¹⁰\" hesabı, müşteriler aynı fiyat zammından etkileniyorsa tamamen yanlıştır.\n\n2008 finansal krizinin arkasındaki modelleme hatası da tam olarak buydu: konut kredilerinin birbirinden bağımsız olarak batacağı varsayılmıştı. Aynı ekonomik şok hepsini birden vurunca model çöktü.",
              "Assuming two events are independent makes the arithmetic easy but is rarely true in practice. The calculation \"each customer has a 5% chance of churning, so the chance all 10 stay is 0.95¹⁰\" is completely wrong if the customers are all reacting to the same price rise.\n\nThis was precisely the modelling error behind the 2008 financial crisis: mortgages were assumed to default independently of one another. When a single economic shock hit them all at once, the model collapsed.",
            ),
            text(
              "**Sezgiyi en çok yanıltan konu koşullu olasılıktır.** Klasik örnek:\n\nBir hastalık nüfusun %1'inde var. Test, hastaysan %99 ihtimalle pozitif çıkıyor; sağlıklıysan %5 ihtimalle yanlışlıkla pozitif çıkıyor. Testin pozitif çıktı. Gerçekten hasta olma olasılığın nedir?\n\nÇoğu kişi \"%99\" der. Doğru cevap **%17**'dir.\n\n10.000 kişi düşün: 100'ü hasta, 9.900'ü sağlıklı. Hastaların 99'u pozitif çıkar. Sağlıklıların %5'i, yani 495'i de pozitif çıkar. Toplam 594 pozitif var ama bunların yalnızca 99'u gerçekten hasta: 99 / 594 ≈ **%17**.\n\nSebep, hastalığın **nadir** olmasıdır. Nadir olayları test ederken yanlış pozitifler doğru pozitifleri sayıca ezer.",
              "**Conditional probability is where intuition fails hardest.** The classic example:\n\nA disease affects 1% of the population. The test is positive 99% of the time if you have it, and falsely positive 5% of the time if you do not. Your test came back positive. What is the probability you actually have the disease?\n\nMost people say \"99%\". The correct answer is **17%**.\n\nPicture 10,000 people: 100 are ill, 9,900 are healthy. Of the ill, 99 test positive. Of the healthy, 5% — that is 495 — also test positive. There are 594 positives in total but only 99 are genuinely ill: 99 / 594 ≈ **17%**.\n\nThe reason is that the disease is **rare**. When you test for rare events, false positives outnumber true positives.",
            ),
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
            info(
              "Ortalama maaş neden yanıltır?",
              "Why the average salary misleads",
              "Dokuz kişinin 30.000 TL, bir kişinin 500.000 TL kazandığı bir ekipte **ortalama 77.000 TL**'dir — ama kimse o parayı kazanmaz. **Medyan 30.000 TL**'dir ve gerçeği çok daha iyi anlatır. Gelir, ev fiyatı, oturum süresi gibi sağa çarpık dağılımlarda daima medyanı da raporla.",
              "In a team where nine people earn 30,000 and one earns 500,000, the **mean is 77,000** — a number nobody actually earns. The **median is 30,000** and describes reality far better. For right-skewed distributions like income, house prices or session length, always report the median too.",
            ),
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
            text(
              "**Aykırı değer tespiti** için iki standart yöntem:\n\n- **IQR kuralı** — `Q1 − 1,5×IQR` altındaki veya `Q3 + 1,5×IQR` üstündeki değerler. Çarpık dağılımlarda da çalışır, bu yüzden varsayılan tercihtir.\n- **Z-skoru** — ortalamadan 3 standart sapmadan uzak değerler. Yalnızca dağılım yaklaşık normalse anlamlıdır; çarpık veride ortalamayı ve sapmayı aykırı değerin kendisi şişirdiği için güvenilmezdir.",
              "Two standard ways to **detect outliers**:\n\n- **The IQR rule** — values below `Q1 − 1.5×IQR` or above `Q3 + 1.5×IQR`. It works on skewed distributions too, which makes it the default choice.\n- **The z-score** — values more than 3 standard deviations from the mean. Meaningful only when the distribution is roughly normal; on skewed data it is unreliable because the outlier itself inflates the mean and the deviation.",
            ),
            pitfall(
              "Aykırı değeri silmek çoğu zaman yanlıştır",
              "Deleting an outlier is usually wrong",
              "Aykırı değer üç şeyden biridir ve her biri farklı davranış gerektirir:\n\n1. **Veri hatası** — eksi yaş, 1899 doğum tarihi, kuruş yerine lira. Düzelt veya çıkar.\n2. **Farklı popülasyon** — bireysel müşteriler arasına karışmış kurumsal sipariş. Ayır ve ayrı analiz et.\n3. **Gerçek ve önemli olay** — kara cuma satışı, viral olmuş içerik. **Sakın silme** — analizin asıl konusu o olabilir.\n\nSilmeden önce daima sor: bu değer neden var? Cevabı bilmeden silmek, veriyi hikâyene uydurmaktır.",
              "An outlier is one of three things, and each demands different handling:\n\n1. **A data error** — negative age, an 1899 birth date, lira recorded instead of cents. Fix it or drop it.\n2. **A different population** — a corporate order mixed in among consumer ones. Separate it and analyse it apart.\n3. **A real and important event** — Black Friday sales, a piece of content going viral. **Do not delete it** — it may be the whole point of the analysis.\n\nBefore deleting, always ask: why does this value exist? Deleting without knowing the answer is bending the data to fit your story.",
            ),
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
            pitfall(
              "Korelasyon nedensellik değildir — ama bu kadarla bitmez",
              "Correlation is not causation — but it does not end there",
              "Bu cümleyi herkes bilir, asıl mesele **neden** olmadığıdır. Üç alternatif açıklama vardır:\n\n1. **Ters yönlü nedensellik** — B, A'ya sebep oluyordur. \"Çok destek talebi açan müşteriler daha çok ödüyor\" — belki de çok ödeyenler daha çok kullanıyordur.\n2. **Karıştırıcı değişken** — üçüncü bir etken ikisini birden etkiliyordur. Dondurma satışı ile boğulma vakaları korelasyonludur; sebep **sıcaklıktır**.\n3. **Rastlantı** — yeterince çok değişken çiftine bakarsan bazıları şansa korelasyonlu çıkar.\n\nNedensellik iddiası için ya deney (A/B testi) ya da nedensel çıkarım yöntemleri gerekir.",
              "Everyone knows the phrase; what matters is **why** it holds. There are three alternative explanations:\n\n1. **Reverse causation** — B may cause A. \"Customers who open many support tickets pay more\" — perhaps those who pay more simply use the product more.\n2. **A confounder** — a third factor drives both. Ice cream sales correlate with drownings; the cause is **temperature**.\n3. **Chance** — look at enough pairs of variables and some will correlate by luck.\n\nTo claim causation you need either an experiment (an A/B test) or causal inference methods.",
            ),
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
            text(
              "**Z-skoru**, bir değerin ortalamadan kaç standart sapma uzakta olduğudur:\n\n`z = (değer − ortalama) / standart sapma`\n\nZ-skoru, farklı birimlerdeki değerleri karşılaştırılabilir kılar. Matematikten 80, edebiyattan 70 alan öğrenci hangisinde daha başarılıdır? Sınıf ortalamaları ve sapmaları farklıysa ham not bunu söyleyemez; z-skoru söyler.",
              "A **z-score** is how many standard deviations a value sits from the mean:\n\n`z = (value − mean) / standard deviation`\n\nZ-scores make values in different units comparable. A student scoring 80 in maths and 70 in literature — which did they do better in? If the class means and deviations differ, the raw marks cannot tell you; the z-score can.",
            ),
            info(
              "Her şey normal dağılmaz",
              "Not everything is normally distributed",
              "Normal dağılım, birbirinden bağımsız birçok küçük etkinin toplandığı durumlarda ortaya çıkar — boy, ölçüm hatası, üretim toleransı gibi.\n\nAma iş dünyasındaki birçok değişken normal **değildir**: gelir, sipariş tutarı, şirket büyüklüğü ve web sitesi oturum süresi sağa çarpıktır; bunlarda ortalama ile medyan farklıdır ve 68-95-99,7 kuralı geçerli olmaz. Bir yönteme başlamadan önce dağılımın gerçekten normal olup olmadığını histogram veya Q-Q grafiği ile kontrol et.",
              "The normal distribution arises when many small independent effects add up — height, measurement error, manufacturing tolerance.\n\nBut many business variables are **not** normal: income, order value, company size and session duration are right-skewed; for those the mean differs from the median and the 68-95-99.7 rule does not hold. Before applying a method, check whether the distribution really is normal using a histogram or a Q-Q plot.",
            ),
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
            info(
              "Büyük veri yanlılığı çözmez, gizler",
              "Big data does not fix bias — it hides it",
              "1936 ABD başkanlık seçiminde bir dergi **2,4 milyon** kişiye anket yaptı ve seçimi yanlış tahmin etti. Aynı yıl Gallup **50 bin** kişiyle doğru tahmin etti.\n\nFark örneklem büyüklüğü değil, yöntemdi: dergi listesini telefon rehberi ve otomobil kayıtlarından almıştı — Büyük Buhran yıllarında telefonu ve arabası olanlar zaten daha varlıklı ve sistematik olarak farklı oy veren kesimdi.\n\nÖrneklem yanlıysa, büyütmek yalnızca yanlış cevaba **daha dar bir güven aralığı** verir. Yani daha emin şekilde yanılırsın.",
              "In the 1936 US presidential election a magazine polled **2.4 million** people and got the result wrong. That same year Gallup polled **50,000** and got it right.\n\nThe difference was not sample size but method: the magazine drew its list from telephone directories and car registrations — and during the Great Depression, people who owned phones and cars were wealthier and voted systematically differently.\n\nIf the sample is biased, enlarging it only gives you a **narrower confidence interval around the wrong answer**. You become more confidently wrong.",
            ),
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
            text(
              "**%95 güven aralığı** şu anlama gelir: aynı yöntemle 100 kez örneklem alsaydın, hesapladığın aralıkların yaklaşık 95'i gerçek evren değerini içerirdi.\n\nYaygın yanlış okuma: \"gerçek değerin bu aralıkta olma olasılığı %95\". Gerçek değer sabittir; rastgele olan senin aralığındır.",
              "A **95% confidence interval** means this: if you drew 100 samples the same way, roughly 95 of the intervals you computed would contain the true population value.\n\nThe common misreading is \"there is a 95% chance the true value lies in this interval\". The true value is fixed; it is your interval that is random.",
            ),
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
            pitfall(
              "p-değeri ne DEĞİLDİR",
              "What a p-value is NOT",
              "p-değeri **hipotezin doğru olma olasılığı değildir**. Etkinin büyüklüğünü de söylemez: 1 milyon kullanıcılı bir testte %0,01'lik anlamsız bir fark bile p < 0,001 çıkabilir. Her zaman p ile birlikte **etki büyüklüğünü** ve **güven aralığını** raporla — karar bunlara göre verilir, p'ye göre değil.",
              "A p-value is **not the probability that the hypothesis is true**. It also says nothing about size: with a million users even a meaningless 0.01% difference can produce p < 0.001. Always report the **effect size** and **confidence interval** alongside p — decisions are made on those, not on p.",
            ),
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
            text(
              "**A/B testinde sık yapılan hatalar:**\n\n1. **Erken bakıp durdurmak** — anlamlı çıkana kadar günlük kontrol etmek yanlış pozitif üretir. Örneklem büyüklüğünü **önceden** hesapla ve süreye sadık kal.\n2. **Çok metriğe bakmak** — 20 metriğe bakarsan biri şansa %5 düzeyinde anlamlı çıkar. Baştan **tek bir birincil metrik** seç.\n3. **Rastgeleleştirmeyi bozmak** — kullanıcı bazlı değil oturum bazlı bölmek sonuçları kirletir.\n4. **Yenilik etkisi** — ilk günlerde her değişiklik ilgi çeker; testi en az bir tam haftaya yay.",
              "**Common A/B testing mistakes:**\n\n1. **Peeking and stopping early** — checking daily until it turns significant manufactures false positives. Compute the sample size **in advance** and stick to the duration.\n2. **Watching too many metrics** — look at 20 metrics and one will be significant at the 5% level by luck. Pick **one primary metric** up front.\n3. **Breaking randomisation** — splitting by session instead of by user contaminates the result.\n4. **Novelty effect** — anything new draws attention in the first days; run for at least one full week.",
            ),
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
            text(
              "**Güç (power)**, gerçekten var olan bir farkı yakalayabilme olasılığıdır. Standart hedef %80'dir: fark gerçekse, testi 100 kez yapsan 80'inde yakalarsın.\n\nGüç dört şeye bağlıdır:\n\n- **Örneklem büyüklüğü (n)** — artarsa güç artar\n- **Etki büyüklüğü** — büyük farkları yakalamak kolaydır\n- **Anlamlılık düzeyi (α)** — genelde 0,05\n- **Değişkenlik** — veri ne kadar gürültülüyse o kadar çok örneklem gerekir\n\n**Güç analizi**, testi başlatmadan önce yapılır: \"%5'lik bir artışı %80 güçle yakalamak için kaç kullanıcı gerekir?\" Cevap 20.000 ise ve haftada 2.000 kullanıcın varsa, o test 10 hafta sürecek demektir. Bunu önceden bilmek, üç hafta sonra sonuçsuz kalan bir testten çok daha iyidir.",
              "**Power** is the probability of detecting a difference that genuinely exists. The standard target is 80%: if the effect is real, you would catch it in 80 out of 100 runs.\n\nPower depends on four things:\n\n- **Sample size (n)** — more raises power\n- **Effect size** — large differences are easy to catch\n- **Significance level (α)** — usually 0.05\n- **Variability** — noisier data needs more samples\n\n**Power analysis** happens before you start: \"how many users do I need to detect a 5% lift with 80% power?\" If the answer is 20,000 and you get 2,000 users a week, that test will run for ten weeks. Knowing this up front is far better than an inconclusive test three weeks later.",
            ),
            pitfall(
              "Anlamsız çıkan test, \"fark yok\" demek değildir",
              "A non-significant test does not mean \"no difference\"",
              "p > 0,05 çıktığında doğru cümle \"fark olmadığını gösterdik\" değil, **\"fark olduğunu gösteremedik\"**tir. Bu ikisi arasında büyük fark vardır.\n\nTestin gücü düşükse (örneklem küçükse) gerçek ve önemli bir farkı kaçırmış olabilirsin. Anlamsız bir sonucu raporlarken daima güven aralığını da ver: aralık `[-%1, +%12]` ise, %12'lik bir iyileşmeyi dışlayamıyorsun demektir — bu, \"etki yok\" ile aynı şey değildir.",
              "When p > 0.05 the correct sentence is not \"we showed there is no difference\" but **\"we failed to show there is one\"**. Those two are very different.\n\nIf the test was underpowered (the sample was small) you may have missed a real and important effect. When reporting a non-significant result, always give the confidence interval too: if it is `[-1%, +12%]`, you cannot rule out a 12% improvement — which is not the same as \"no effect\".",
            ),
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
            info(
              "R-kare her şey değildir",
              "R-squared is not everything",
              "**R-kare**, y'deki değişimin yüzde kaçının model tarafından açıklandığını söyler. 0,85 iyi görünür ama tek başına bir şey ifade etmez:\n\n- Modele değişken ekledikçe R-kare **daima** artar, model kötüleşse bile. Bu yüzden çok değişkenli modellerde **düzeltilmiş R-kare** kullanılır.\n- Yüksek R-kare, modelin doğru **kurulduğu** anlamına gelmez. Zaman serilerinde iki trendli değişken arasında sahte ve çok yüksek R-kare çıkabilir.\n- Düşük R-kare her zaman kötü değildir. İnsan davranışını modellerken 0,30 bile değerli olabilir.",
              "**R-squared** tells you what percentage of the variation in y the model explains. 0.85 looks good but means little on its own:\n\n- R-squared **always** rises as you add variables, even when the model gets worse. This is why multiple regression uses **adjusted R-squared**.\n- A high R-squared does not mean the model is **correctly specified**. In time series, two trending variables can produce a spurious and very high R-squared.\n- A low R-squared is not always bad. When modelling human behaviour even 0.30 can be valuable.",
            ),
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
            text(
              "Cevap **başvuru dağılımındadır**. Kadınlar ağırlıklı olarak kabul oranı düşük olan zor bölüme, erkekler ise kolay bölüme başvurmuş. Bölüm, hem cinsiyetle hem kabulle ilişkili bir **karıştırıcıdır**.\n\nPeki hangi sayı doğru? **Soruya bağlı:**\n\n- \"Bölümler kabul kararında ayrımcılık yapıyor mu?\" → bölüm bazlı oranlara bak (kadınlar lehine)\n- \"Kadınların üniversiteye girme şansı daha mı düşük?\" → toplam orana bak (evet, ama sebebi bölüm tercihi)\n\nİstatistik hangi sayının doğru olduğunu söylemez; **hangi soruyu sorduğunu bilmek** senin işindir. Bu yüzden veriyi bölmeden önce nedensel varsayımlarını netleştirmen gerekir.",
              "The answer lies in the **application mix**. Women mostly applied to the hard department with a low admission rate, men to the easy one. Department is a **confounder**, related to both gender and admission.\n\nSo which number is right? **It depends on the question:**\n\n- \"Do departments discriminate in their decisions?\" → look at the per-department rates (favouring women)\n- \"Are women less likely to get into the university?\" → look at the pooled rate (yes, but because of which department they chose)\n\nStatistics will not tell you which number is correct; **knowing which question you are asking** is your job. That is why you must make your causal assumptions explicit before splitting the data.",
            ),
            tip(
              "Neyi kontrol edeceğine dikkat et",
              "Be careful what you control for",
              "\"Her değişkeni modele ekle, garanti olsun\" yaklaşımı yanlıştır. Bazı değişkenleri kontrol etmek ilişkiyi **bozar**:\n\n- **Aracı değişken (mediator)** — sebebin etkisini taşıyan değişken. Reklamın satışa etkisini ölçerken \"site trafiğini\" kontrol edersen, reklamın etkisinin tam da trafik üzerinden geçtiğini görmezden gelmiş olursun.\n- **Çarpışma değişkeni (collider)** — hem sebepten hem sonuçtan etkilenen değişken. Bunu kontrol etmek **olmayan** bir ilişki yaratır.\n\nDoğru yaklaşım, hangi değişkenin ne rol oynadığını bir nedensel diyagramla önceden düşünmektir.",
              "The approach \"throw every variable into the model to be safe\" is wrong. Controlling for some variables **breaks** the relationship:\n\n- **A mediator** — a variable that carries the effect. If you control for \"site traffic\" while measuring advertising's effect on sales, you erase exactly the channel the effect travels through.\n- **A collider** — a variable affected by both cause and outcome. Controlling for it manufactures an association that does not exist.\n\nThe right approach is to think through each variable's role in advance with a causal diagram.",
            ),
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
            text(
              "Önsel olasılık, Bayesçi yaklaşımın hem gücü hem tartışmalı yanıdır. Gücü: **ön bilgiyi hesaba katar.**\n\nA/B testinde 100 kullanıcıyla %40 iyileşme gördüğünü düşün. Frekansçı yaklaşım p-değerini hesaplar. Bayesçi yaklaşım şunu sorar: \"Bu üründe daha önce yapılan 200 testin hiçbiri %5'i geçmedi. %40'lık bir iyileşme gerçekten olası mı, yoksa küçük örneklem gürültüsü mü?\"\n\nCevap genellikle ikincisidir ve Bayesçi tahmin bu yüzden %40'ı gerçeğe doğru çeker. Buna **küçültme (shrinkage)** denir ve az veriyle çalışırken aşırı iyimser sonuçlara karşı doğal bir korumadır.",
              "The prior is both the strength and the controversy of the Bayesian approach. Its strength: it **takes prior knowledge into account**.\n\nImagine an A/B test showing a 40% lift on 100 users. The frequentist approach computes a p-value. The Bayesian approach asks: \"none of the 200 previous tests on this product beat 5%. Is a 40% lift really plausible, or is this small-sample noise?\"\n\nThe answer is usually the latter, and the Bayesian estimate therefore pulls the 40% back toward reality. This is called **shrinkage**, and it is a natural defence against over-optimistic results when data is scarce.",
            ),
            info(
              "Hangisini kullanmalı?",
              "Which should you use?",
              "İkisi rakip değil, farklı sorulara uygun araçlardır.\n\n**Frekansçı** — düzenleyici onay, bilimsel yayın ve standartlaşmış raporlama gereken yerler. Prosedürü nettir ve öznel önsel tartışması içermez.\n\n**Bayesçi** — az veri olan, ön bilginin gerçekten değerli olduğu ve kararın sürekli güncellendiği yerler: ürün deneyleri, tıbbi teşhis, spam filtresi, öneri sistemleri. \"B'nin kazanma olasılığı %92\" gibi doğrudan karar verilebilir cümleler kurar — ki yöneticilerin istediği tam olarak budur.",
              "They are not rivals but tools suited to different questions.\n\n**Frequentist** — regulatory approval, scientific publication and anywhere standardised reporting is required. The procedure is clear-cut and involves no argument about a subjective prior.\n\n**Bayesian** — settings with little data, where prior knowledge genuinely helps and decisions are updated continuously: product experiments, medical diagnosis, spam filters, recommender systems. It produces directly actionable sentences like \"there is a 92% probability B wins\" — which is exactly what decision-makers ask for.",
            ),
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
            text(
              "**Dört pratik yöntem:**\n\n1. **Fark-içinde-fark (difference-in-differences)** — Değişiklikten etkilenen ve etkilenmeyen iki grubun öncesi ve sonrasını karşılaştır; ortak trendi çıkarır. Bir şehirde açılan mağazanın etkisini benzer bir şehirle karşılaştırarak ölçersin.\n\n2. **Eşleştirme (propensity score matching)** — Tedavi görenlerle, gözlenen özellikleri benzer olan görmeyenleri eşleştir. \"Aynı yaş, aynı harcama, aynı şehir ama kampanyayı almamış\" müşteriyi bulursun.\n\n3. **Süreksizlik tasarımı (regression discontinuity)** — Keskin bir eşik varsa, eşiğin hemen iki yanındaki kişiler neredeyse rastgele bölünmüş sayılır. 999 TL harcayanla 1001 TL harcayan neredeyse aynı kişilerdir ama biri sadakat programına girer.\n\n4. **Araç değişken (instrumental variable)** — Sonucu yalnızca sebep üzerinden etkileyen dış bir değişken bul. Zor ama güçlüdür.",
              "**Four practical methods:**\n\n1. **Difference-in-differences** — Compare before and after for a group affected by the change and one that was not; it subtracts the shared trend. You measure a new store's effect in one city by comparing it with a similar city.\n\n2. **Propensity score matching** — Pair treated units with untreated ones that look similar on observed characteristics. You find the customer of \"the same age, same spend, same city, but who did not get the campaign\".\n\n3. **Regression discontinuity** — Where a sharp threshold exists, people just either side of it are effectively randomly split. Someone spending 999 and someone spending 1001 are nearly identical, yet only one enters the loyalty programme.\n\n4. **Instrumental variables** — Find an outside variable that affects the outcome only through the cause. Hard, but powerful.",
            ),
            pitfall(
              "Bu yöntemler deneyin yerini tutmaz",
              "These methods do not replace an experiment",
              "Hepsi **gözlenmemiş karıştırıcı olmadığı** varsayımına dayanır ve bu varsayım veriyle kanıtlanamaz. Eşleştirme yalnızca ölçebildiğin değişkenler üzerinden çalışır; müşterinin motivasyonu gibi ölçemediğin bir şey hâlâ sonucu bozabilir.\n\nDoğru tutum, sonucu \"nedensel etki şudur\" diye değil, **\"şu varsayımlar altında nedensel etki şudur\"** diye raporlamaktır. Ve mümkünse, tahmini küçük bir deneyle doğrulamaktır.",
              "All of them rest on the assumption that **no unobserved confounder exists**, and that assumption cannot be proven from the data. Matching works only on the variables you can measure; something you cannot measure, such as customer motivation, can still distort the result.\n\nThe honest stance is to report the finding not as \"the causal effect is X\" but as **\"under these assumptions, the causal effect is X\"** — and, where possible, to validate the estimate with a small experiment.",
            ),
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
