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
      id: "beginner",
      title: L("Başlangıç — Betimleyici istatistik", "Beginner — Descriptive statistics"),
      description: L(
        "Ortalama, medyan, yayılım ve dağılım: veriyi tek bakışta özetlemek.",
        "Mean, median, spread and distribution: summarising data at a glance.",
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
      ],
    },
    {
      id: "intermediate",
      title: L("Orta — Olasılık ve dağılımlar", "Intermediate — Probability and distributions"),
      description: L(
        "Normal dağılım, örnekleme, güven aralığı ve belirsizliği ifade etmek.",
        "Normal distribution, sampling, confidence intervals and expressing uncertainty.",
      ),
      projectSlug: "istatistik-ab-testi",
      lessons: [
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
      id: "advanced",
      title: L("İleri — Hipotez testi ve A/B testi", "Advanced — Hypothesis and A/B testing"),
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
      ],
    },
  ],
};
