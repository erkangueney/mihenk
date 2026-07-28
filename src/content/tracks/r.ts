import type { Track } from "@/lib/types";
import { L, pitfall, code, info, lesson, order, quiz, text, tip } from "../helpers";

export const rTrack: Track = {
  slug: "r",
  name: "R",
  category: "language",
  color: "#60a5fa",
  icon: "📉",
  tagline: L("İstatistikçilerin dili", "The statisticians' language"),
  description: L(
    "R, istatistik ve akademik analizde hâlâ en güçlü araçtır. tidyverse ile veri işleme, ggplot2 ile görselleştirme ve R Markdown ile tekrarlanabilir raporlama.",
    "R remains the strongest tool in statistics and academic analysis. Data wrangling with tidyverse, visualisation with ggplot2 and reproducible reporting with R Markdown.",
  ),
  levels: [
    {
      id: "foundation",
      title: L("R'a giriş", "Getting started with R"),
      description: L(
        "R neden var, kimin için tasarlandı ve Python'dan farkı ne?",
        "Why R exists, who it was designed for, and how it differs from Python.",
      ),
      lessons: [
        lesson({
          slug: "neden-r",
          title: L("Neden R? Python ile karşılaştırma", "Why R? A comparison with Python"),
          summary: L(
            "İkisi de veri işler ama farklı insanlar için tasarlandılar.",
            "Both work with data, but they were designed for different people.",
          ),
          minutes: 12,
          blocks: [
            text(
              "**R, istatistikçiler tarafından istatistik için tasarlandı.** Python ise genel amaçlı bir programlama dilidir ve veri işleri sonradan eklendi. Bu köken farkı her ikisinin güçlü yanlarını açıklar.\n\n**R'ın güçlü olduğu yerler:**\n\n- **İstatistiksel modelleme** — Karma etkiler, hayatta kalma analizi, zaman serisi ve deneysel tasarım için hazır ve olgun paketler. Yeni istatistiksel yöntemler genellikle **önce R'da** yayımlanır.\n- **Görselleştirme** — `ggplot2` hâlâ dünyadaki en tutarlı grafik dilbilgisi uygulamasıdır.\n- **Raporlama** — R Markdown ve Quarto ile analiz, metin ve grafik tek belgede birleşir.\n- **Akademik ve klinik dünya** — Yayın, ilaç ve kamu istatistik kurumlarında baskın.\n\n**Python'ın güçlü olduğu yerler:** makine öğrenmesi, derin öğrenme, üretim sistemlerine gömme, genel yazılım geliştirme.",
              "**R was designed by statisticians for statistics.** Python is a general-purpose programming language to which data work was added later. That difference in origin explains where each is strong.\n\n**Where R is strong:**\n\n- **Statistical modelling** — mature, ready packages for mixed effects, survival analysis, time series and experimental design. New statistical methods are usually published **in R first**.\n- **Visualisation** — `ggplot2` is still the most coherent implementation of a grammar of graphics anywhere.\n- **Reporting** — R Markdown and Quarto merge analysis, prose and charts into one document.\n- **Academia and clinical work** — dominant in publishing, pharmaceuticals and national statistics offices.\n\n**Where Python is strong:** machine learning, deep learning, embedding in production systems, general software engineering.",
            ),
            info(
              "\"Hangisini öğrenmeliyim?\" sorusu yanlış soru",
              "\"Which should I learn?\" is the wrong question",
              "Doğru soru: **ne yapmak istiyorsun ve çevrende kim ne kullanıyor?**\n\n- Klinik araştırma, biyoistatistik, akademik yayın, kamu istatistiği → **R**\n- Makine öğrenmesi, veri mühendisliği, ürün ekibi, yazılım entegrasyonu → **Python**\n- Genel veri analistliği → İkisi de olur; ekibin ne kullandığı belirleyicidir\n\nİyi haber şu: birini öğrendiğinde diğeri çok daha kolay gelir. Kavramlar (veri çerçevesi, gruplama, birleştirme, modelleme) birebir aynıdır; yalnızca sözdizimi değişir. Deneyimli analistlerin çoğu ikisini de kullanır ve işe göre seçer.",
              "The right question is: **what do you want to do, and what do the people around you use?**\n\n- Clinical research, biostatistics, academic publishing, official statistics → **R**\n- Machine learning, data engineering, product teams, software integration → **Python**\n- General data analysis → either; what your team uses decides it\n\nThe good news: once you know one, the other comes much more easily. The concepts (data frame, grouping, joining, modelling) are identical; only the syntax changes. Most experienced analysts use both and pick per task.",
            ),
            quiz({
              id: "q1",
              q: [
                "Klinik bir araştırmada hayatta kalma analizi (survival analysis) yapman gerekiyor. Hangisi daha olgun?",
                "You need to run a survival analysis in a clinical study. Which is more mature?",
              ],
              options: [
                [
                  "R — istatistiksel yöntemler için paket ekosistemi daha derin ve akademide standart",
                  "R — its statistical package ecosystem is deeper and it is the standard in academia",
                ],
                ["Python", "Python"],
                ["Excel", "Excel"],
                ["İkisi de yapamaz", "Neither can do it"],
              ],
              answer: 0,
              explain: [
                "Python'da da hayatta kalma analizi yapılabilir (`lifelines` paketi), ama R'ın `survival` paketi onlarca yıllık, düzenleyici kurumlarca kabul görmüş ve literatürdeki neredeyse her yöntemi kapsayan bir referanstır. Alan uzmanlaştıkça R'ın avantajı artar.",
                "Survival analysis is possible in Python too (the `lifelines` package), but R's `survival` package is decades old, accepted by regulators and covers nearly every method in the literature. The more specialised the field, the larger R's advantage.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "r-veri-yapilari",
          title: L("R'ın veri yapıları", "R's data structures"),
          summary: L(
            "Vektör, liste, data.frame ve R'ın en şaşırtıcı davranışı: vektörleştirme.",
            "Vectors, lists, data frames — and R's most surprising behaviour: vectorisation.",
          ),
          minutes: 14,
          blocks: [
            text(
              "R'da **her şey vektördür.** Tek bir sayı bile aslında uzunluğu 1 olan bir vektördür. Bu, dili anlamanın anahtarıdır.\n\n**Temel yapılar:**\n\n- **Vektör** — Aynı tipte değerler dizisi: `c(1, 2, 3)`\n- **Liste** — Farklı tipte öğeler tutabilir: `list(ad = \"Elif\", yas = 30)`\n- **data.frame** — Sütunları vektör olan tablo. Analizin ana yapısı.\n- **tibble** — tidyverse'in modern data.frame'i; daha temiz yazdırır ve sürpriz tip dönüşümü yapmaz\n- **factor** — Kategorik değişken; düzeyleri (levels) vardır ve modellemede önemlidir",
              "In R **everything is a vector.** Even a single number is really a vector of length 1. This is the key to understanding the language.\n\n**The core structures:**\n\n- **Vector** — a sequence of values of one type: `c(1, 2, 3)`\n- **List** — can hold items of different types: `list(name = \"Elif\", age = 30)`\n- **data.frame** — a table whose columns are vectors. The main structure for analysis.\n- **tibble** — tidyverse's modern data frame; prints more cleanly and does not silently convert types\n- **factor** — a categorical variable with levels; important in modelling",
            ),
            code(
              "r",
              `# Vektörleştirme: döngü yazmadan tüm elemanlara işlem
fiyatlar <- c(1899, 2450, 4290, 549)
kdvli <- fiyatlar * 1.20        # dört elemana da uygulanır
print(kdvli)

# 1'den başlayan indeks (Python'da 0'dan başlar!)
fiyatlar[1]                      # 1899 — ilk eleman
fiyatlar[-1]                     # ilk hariç hepsi (Python'da son eleman!)
fiyatlar[fiyatlar > 2000]        # mantıksal süzme

# data.frame
df <- data.frame(
  urun = c("Kulaklık", "Klavye", "Saat"),
  fiyat = c(1899, 2450, 4290),
  adet = c(3, 1, 2)
)
df$ciro <- df$fiyat * df$adet    # yeni sütun
str(df)                          # yapıyı özetler — en çok kullanacağın fonksiyon`,
            ),
            pitfall(
              "Python'dan gelenlerin iki tuzağı",
              "Two traps for people coming from Python",
              "**1. İndeks 1'den başlar.** `fiyatlar[1]` ilk elemandır, ikinci değil. Bu, istatistik geleneğinden gelir ve alışması birkaç gün sürer.\n\n**2. Eksi indeks tamamen farklı çalışır.** Python'da `liste[-1]` **son** elemanı verir; R'da `vektor[-1]` ilk eleman **hariç** her şeyi verir. Bu iki dil arasında geçiş yapanların en sık düştüğü tuzaktır ve hata vermeden yanlış sonuç ürettiği için tehlikelidir.",
              "**1. Indexing starts at 1.** `prices[1]` is the first element, not the second. This comes from statistical convention and takes a few days to get used to.\n\n**2. Negative indexing means something entirely different.** In Python `list[-1]` gives the **last** element; in R `vec[-1]` gives everything **except** the first. This is the trap people switching between the languages fall into most, and it is dangerous because it produces a wrong answer without an error.",
            ),
            quiz({
              id: "q1",
              q: [
                "R'da `x <- c(10, 20, 30, 40)` için `x[-1]` ne döndürür?",
                "In R, given `x <- c(10, 20, 30, 40)`, what does `x[-1]` return?",
              ],
              options: [
                ["`c(20, 30, 40)` — ilk eleman hariç hepsi", "`c(20, 30, 40)` — everything but the first"],
                ["`40` — son eleman", "`40` — the last element"],
                ["`10`", "`10`"],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "R'da eksi işareti \"bu indeksi çıkar\" demektir, \"sondan say\" değil. Python'dan gelen biri `x[-1]` yazıp 40 beklerken üç elemanlı bir vektör alır — ve kod hata vermediği için sorunu fark etmesi uzun sürebilir. Son elemanı almak için `x[length(x)]` veya `dplyr::last(x)` kullanılır.",
                "In R the minus sign means \"drop this index\", not \"count from the end\". Someone from Python writing `x[-1]` and expecting 40 gets a three-element vector — and since the code raises no error the problem can go unnoticed for a while. To get the last element you use `x[length(x)]` or `dplyr::last(x)`.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "rstudio-ve-paketler",
          title: L("RStudio ve paket ekosistemi", "RStudio and the package ecosystem"),
          summary: L(
            "Çalışma ortamını kur, paketleri yönet ve projeni tekrarlanabilir yap.",
            "Set up your environment, manage packages and make your project reproducible.",
          ),
          minutes: 12,
          blocks: [
            text(
              "**RStudio** (yeni adıyla Posit Workbench), R için tasarlanmış ve dille bütünleşmiş bir geliştirme ortamıdır. Dört bölmesi vardır: kaynak kodu, konsol, ortam (environment) ve dosya/grafik/yardım.\n\nEn değerli özelliği **Ortam** bölmesidir: bellekteki tüm değişkenleri, tiplerini ve içeriklerini canlı gösterir. Bir data.frame'e tıklayıp Excel gibi inceleyebilirsin — veri keşfinde bu, Python'da alışık olmadığın bir rahatlıktır.\n\n**Paket kurmak ve kullanmak:**\n\n```r\ninstall.packages(\"tidyverse\")   # bir kez kurulur\nlibrary(tidyverse)               # her oturumda yüklenir\n```\n\nPaketler **CRAN**'dan gelir. CRAN'a kabul edilen her paket otomatik testlerden geçer ve belgelenmiş olmak zorundadır — bu, R ekosisteminin kalite açısından güçlü yanıdır.",
              "**RStudio** (now Posit Workbench) is a development environment designed for and integrated with R. It has four panes: source, console, environment, and files/plots/help.\n\nIts most valuable feature is the **Environment** pane: it shows every variable in memory, its type and its contents, live. You can click a data frame and inspect it like a spreadsheet — a convenience during exploration that you will not be used to from Python.\n\n**Installing and using packages:**\n\n```r\ninstall.packages(\"tidyverse\")   # installed once\nlibrary(tidyverse)               # loaded every session\n```\n\nPackages come from **CRAN**. Every package accepted onto CRAN passes automated checks and must be documented — a genuine quality strength of the R ecosystem.",
            ),
            tip(
              "Proje kullan, `setwd()` kullanma",
              "Use Projects, not `setwd()`",
              "R öğrenirken en sık öğretilen ve en zararlı alışkanlık `setwd(\"C:/Users/erkan/Desktop/analiz\")` yazmaktır. Bu satır **yalnızca senin bilgisayarında** çalışır; kodu paylaştığında ilk hata orada patlar.\n\nDoğru yol **RStudio Projesi** (`.Rproj`) kullanmaktır: proje klasörünü açtığında çalışma dizini otomatik olarak orası olur ve tüm yollar göreli yazılır (`data/satis.csv`). Kod her bilgisayarda çalışır.\n\nTekrarlanabilirliğin ikinci adımı **`renv`** paketidir: projenin kullandığı paket sürümlerini kilitler. Altı ay sonra veya başka bir makinede `renv::restore()` ile birebir aynı ortamı kurarsın.",
              "The most commonly taught and most harmful habit when learning R is writing `setwd(\"C:/Users/erkan/Desktop/analysis\")`. That line works **only on your machine**; the moment you share the code it fails there first.\n\nThe right way is an **RStudio Project** (`.Rproj`): opening the project folder makes it the working directory automatically and every path is written relative (`data/sales.csv`). The code then runs anywhere.\n\nThe second step to reproducibility is the **`renv`** package: it locks the package versions the project uses. Six months later, or on another machine, `renv::restore()` rebuilds exactly the same environment.",
            ),
            quiz({
              id: "q1",
              q: [
                "Kodunu bir arkadaşına gönderdiğinde çalışmasını nasıl garanti edersin?",
                "How do you make sure your code runs when you send it to a colleague?",
              ],
              options: [
                [
                  "RStudio Projesi kullanıp göreli yollar yazmak ve `renv` ile paket sürümlerini kilitlemek",
                  "Use an RStudio Project with relative paths and lock package versions with `renv`",
                ],
                ["`setwd()` ile kendi klasörünü yazmak", "Write your own folder with `setwd()`"],
                ["Tüm dosyaları masaüstüne koymak", "Put every file on the desktop"],
                ["Paket sürümü belirtmemek", "Not specifying package versions"],
              ],
              answer: 0,
              explain: [
                "Mutlak yollar ve sabitlenmemiş paket sürümleri, \"bende çalışıyordu\" sorununun iki ana kaynağıdır. Proje + göreli yol + `renv` üçlüsü, kodun başka bir makinede de aynı sonucu üretmesini sağlar. Bu üç adım toplam beş dakika sürer ve saatlerce hata ayıklamayı önler.",
                "Absolute paths and unpinned package versions are the two main sources of \"it worked on my machine\". The combination of a Project, relative paths and `renv` makes the code produce the same result elsewhere. The three steps take five minutes and save hours of debugging.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "junior",
      title: L("R'ın temelleri", "R fundamentals"),
      description: L(
        "Vektörler, veri çerçeveleri ve R'ın kendine has mantığı.",
        "Vectors, data frames and R's particular way of thinking.",
      ),
      lessons: [
        lesson({
          slug: "r-temelleri",
          title: L("Vektörler ve veri çerçeveleri", "Vectors and data frames"),
          summary: L(
            "R'da her şey bir vektördür; bu tek cümle dilin yarısını açıklar.",
            "In R everything is a vector; that one sentence explains half the language.",
          ),
          minutes: 14,
          blocks: [
            text(
              "R, baştan sona istatistik için tasarlanmıştır. En belirgin farkı: işlemler **vektörel** çalışır ve indeksleme **1'den** başlar (Python'da 0'dan).",
              "R was designed for statistics from the ground up. Its most visible difference: operations are **vectorised**, and indexing starts at **1** (Python starts at 0).",
            ),
            code(
              "r",
              `fiyatlar <- c(1899, 2450, 4290, 549, 320)

fiyatlar[1]           # 1899 — ilk eleman (1'den başlar!)
fiyatlar * 1.20       # tüm vektöre uygulanır
mean(fiyatlar)
median(fiyatlar)
summary(fiyatlar)

fiyatlar[fiyatlar > 2000]   # mantıksal filtreleme

df <- data.frame(
  urun = c("Kulaklık", "Klavye", "Saat"),
  fiyat = c(1899, 2450, 4290),
  stringsAsFactors = FALSE
)

str(df)
head(df)
nrow(df)`,
            ),
            info(
              "Atama operatörü `<-`",
              "The assignment operator `<-`",
              "R'da atama için hem `<-` hem `=` çalışır ama topluluk `<-` kullanır ve stil kılavuzları bunu şart koşar. RStudio'da `Alt + -` kısayolu doğrudan `<-` yazar. Fonksiyon argümanlarında ise daima `=` kullanılır.",
              "Both `<-` and `=` assign in R, but the community uses `<-` and style guides require it. In RStudio, `Alt + -` types it for you. Inside function calls you always use `=`.",
            ),
            quiz({
              id: "q1",
              q: [
                "`fiyatlar <- c(10, 20, 30)` için `fiyatlar[2]` nedir?",
                "For `fiyatlar <- c(10, 20, 30)`, what is `fiyatlar[2]`?",
              ],
              options: [
                ["20", "20"],
                ["30", "30"],
                ["10", "10"],
                ["Hata verir", "It errors"],
              ],
              answer: 0,
              explain: [
                "R'da indeks 1'den başlar, bu yüzden `[2]` ikinci elemandır. Python'dan geçen herkesin ilk günlerde en çok takıldığı fark budur.",
                "R indexes from 1, so `[2]` is the second element. It is the difference that trips up everyone arriving from Python.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "mid",
      title: L("tidyverse", "tidyverse"),
      description: L(
        "dplyr ve ggplot2 ile veri işleme ve görselleştirmenin modern yolu.",
        "The modern way to wrangle and visualise with dplyr and ggplot2.",
      ),
      projectSlug: "r-kesif-analizi",
      lessons: [
        lesson({
          slug: "dplyr-ggplot",
          title: L("dplyr ve ggplot2", "dplyr and ggplot2"),
          summary: L(
            "Beş fiil ve bir dilbilgisi: R'da veri analizinin tamamı.",
            "Five verbs and one grammar: the whole of data analysis in R.",
          ),
          minutes: 18,
          blocks: [
            text(
              "**dplyr**'ın beş temel fiili neredeyse her analizi kapsar:\n\n- `filter()` — satır seç\n- `select()` — sütun seç\n- `mutate()` — yeni sütun türet\n- `group_by()` + `summarise()` — grupla ve özetle\n- `arrange()` — sırala\n\nBunları `|>` (pipe) ile zincirlersin; kod soldan sağa, yukarıdan aşağı okunur.",
              "**dplyr**'s five verbs cover nearly every analysis:\n\n- `filter()` — pick rows\n- `select()` — pick columns\n- `mutate()` — derive a column\n- `group_by()` + `summarise()` — group and aggregate\n- `arrange()` — sort\n\nChain them with `|>` (the pipe) and the code reads left to right, top to bottom.",
            ),
            code(
              "r",
              `library(tidyverse)

ozet <- satislar |>
  filter(durum == "teslim") |>
  mutate(ciro = adet * fiyat) |>
  group_by(kategori) |>
  summarise(
    toplam_ciro = sum(ciro),
    ort_fiyat   = mean(fiyat),
    n           = n()
  ) |>
  arrange(desc(toplam_ciro))

print(ozet)`,
            ),
            code(
              "r",
              `# ggplot2: katmanlı grafik dilbilgisi
ggplot(ozet, aes(x = reorder(kategori, toplam_ciro), y = toplam_ciro)) +
  geom_col(fill = "#5b46f2") +
  geom_text(aes(label = scales::comma(toplam_ciro)), hjust = -0.1) +
  coord_flip() +
  labs(
    title = "Kategori bazında ciro",
    subtitle = "2024, yalnızca teslim edilen siparişler",
    x = NULL, y = "Ciro (TL)"
  ) +
  theme_minimal()`,
              "ggplot2: veri + estetik eşleme + geometri + katmanlar",
              "ggplot2: data + aesthetic mapping + geometry + layers",
            ),
            tip(
              "reorder() alışkanlığı",
              "Get used to reorder()",
              "ggplot2 kategorileri varsayılan olarak alfabetik sıralar ve bu neredeyse hiçbir zaman istediğin şey değildir. `reorder(kategori, deger)` ile çubukları değere göre sırala — grafiğin okunabilirliğini tek fonksiyonla ikiye katlarsın.",
              "ggplot2 sorts categories alphabetically by default, which is almost never what you want. Use `reorder(category, value)` to sort bars by value — one function that doubles the readability of the chart.",
            ),
            order({
              id: "o1",
              prompt: [
                "dplyr zincirini mantıklı sıraya diz.",
                "Put the dplyr chain in a sensible order.",
              ],
              lines: [
                "satislar |>",
                "  filter(durum == 'teslim') |>",
                "  mutate(ciro = adet * fiyat) |>",
                "  group_by(kategori) |>",
                "  summarise(toplam = sum(ciro)) |>",
                "  arrange(desc(toplam))",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "senior",
      title: L("Modelleme ve raporlama", "Modelling and reporting"),
      description: L(
        "Regresyon modelleri, tidymodels ve R Markdown ile tekrarlanabilir rapor.",
        "Regression models, tidymodels and reproducible reports with R Markdown.",
      ),
      lessons: [
        lesson({
          slug: "modelleme-ve-rapor",
          title: L("Model kurma ve R Markdown", "Modelling and R Markdown"),
          summary: L(
            "R'ın en güçlü olduğu iki alan: istatistiksel modelleme ve tekrarlanabilir rapor.",
            "The two areas where R is strongest: statistical modelling and reproducible reporting.",
          ),
          minutes: 16,
          blocks: [
            code(
              "r",
              `# Doğrusal regresyon — R'ın formül arayüzü
model <- lm(ciro ~ reklam_harcamasi + sezon + bolge, data = satislar)

summary(model)          # katsayılar, p-değerleri, R²
confint(model)          # güven aralıkları
par(mfrow = c(2, 2))
plot(model)             # varsayım kontrol grafikleri

# Lojistik regresyon
churn_model <- glm(ayrildi ~ uyelik_suresi + aylik_harcama,
                   data = musteriler, family = binomial)`,
            ),
            text(
              "**R Markdown / Quarto**, R'ın en değerli özelliğidir: metin, kod ve çıktı tek dosyada yaşar. `Knit` dediğinde kod baştan çalışır ve HTML, PDF veya Word raporu üretir. Veri değiştiğinde raporu elle güncellemezsin — yeniden derlersin.",
              "**R Markdown / Quarto** is R's most valuable feature: prose, code and output live in one file. Hit `Knit` and the code re-runs, producing an HTML, PDF or Word report. When the data changes you do not edit the report — you rebuild it.",
            ),
            code(
              "r",
              `---
title: "Aylık Satış Raporu"
date: "\`r Sys.Date()\`"
output: html_document
---

## Özet

Bu ay toplam ciro \`r format(sum(satislar$ciro), big.mark = ".")\` TL oldu.

\`\`\`{r, echo=FALSE, warning=FALSE}
library(tidyverse)
satislar |> count(kategori, wt = ciro) |> arrange(desc(n))
\`\`\``,
              "R Markdown: metin içine gömülü canlı kod",
              "R Markdown: live code embedded in prose",
            ),
            quiz({
              id: "q1",
              q: [
                "`lm(ciro ~ reklam + bolge, data = df)` formülünde `~` ne anlama gelir?",
                "In `lm(revenue ~ ads + region, data = df)`, what does `~` mean?",
              ],
              options: [
                [
                  "Sol taraf bağımlı değişken, sağ taraf açıklayıcı değişkenler",
                  "Left side is the dependent variable, right side the predictors",
                ],
                ["Eşitlik operatörü", "An equality operator"],
                ["Yorum satırı başlatır", "It starts a comment"],
                ["Vektör oluşturur", "It creates a vector"],
              ],
              answer: 0,
              explain: [
                "R'ın formül söz dizimi `sonuç ~ tahmin ediciler` biçimindedir ve `lm`, `glm`, `aov` gibi neredeyse tüm modelleme fonksiyonlarında aynıdır. Bir kez öğrendiğinde R'ın tüm modelleme ekosistemi açılır.",
                "R's formula syntax is `outcome ~ predictors` and it is identical across `lm`, `glm`, `aov` and nearly every modelling function. Learn it once and the whole modelling ecosystem opens up.",
              ],
              xp: 20,
            }),
          ],
        }),
      ],
    },
    {
      id: "expert",
      title: L("Üretim kalitesinde R", "Production-grade R"),
      description: L(
        "Paket yazmak, Shiny ile uygulama kurmak ve analizi otomatikleştirmek.",
        "Writing packages, building Shiny apps and automating the analysis.",
      ),
      lessons: [
        lesson({
          slug: "quarto-ile-raporlama",
          title: L("Quarto ile otomatik raporlama", "Automated reporting with Quarto"),
          summary: L(
            "Analiz, metin ve grafik tek belgede; her ay tek komutla yeniden üretilir.",
            "Analysis, prose and charts in one document, regenerated monthly with one command.",
          ),
          minutes: 18,
          blocks: [
            text(
              "R'ın en güçlü ama en az bilinen tarafı **okuryazar programlama (literate programming)** geleneğidir: kod ile açıklama metnini aynı belgede tutmak.\n\n**Quarto** (R Markdown'ın halefi) bir metin dosyasından PDF, Word, HTML, sunum veya web sitesi üretir. Belgenin içindeki kod blokları **çalıştırılır** ve çıktıları belgeye gömülür.\n\nBunun pratik anlamı şudur: aylık raporu bir kez yazarsın, ertesi ay tek komutla yeniden üretirsin. Grafikleri elle kopyalayıp Word'e yapıştırma işi tamamen ortadan kalkar — ve o iş, birçok analistin ayının üç gününü alır.",
              "R's strongest but least-known side is its tradition of **literate programming**: keeping code and explanation in the same document.\n\n**Quarto** (the successor to R Markdown) turns one text file into a PDF, Word document, HTML page, presentation or website. The code blocks inside are **executed** and their output embedded.\n\nWhat that means in practice: you write the monthly report once and regenerate it next month with a single command. The job of copying charts by hand into Word disappears entirely — and that job costs many analysts three days a month.",
            ),
            code(
              "r",
              `---
title: "Aylık Satış Raporu"
date: today
format:
  html: { toc: true, code-fold: true }
  pdf: default
params:
  ay: "2024-08"
---

## Özet

\`\`\`{r}
#| echo: false
#| message: false
library(tidyverse)
satis <- read_csv("data/satis.csv") |> filter(ay == params$ay)
toplam <- sum(satis$tutar)
\`\`\`

Bu ay toplam ciro **\`r format(toplam, big.mark = ".")\` TL** oldu.

\`\`\`{r}
#| echo: false
#| fig-cap: "Şehirlere göre ciro"
satis |>
  group_by(sehir) |>
  summarise(ciro = sum(tutar)) |>
  ggplot(aes(reorder(sehir, ciro), ciro)) +
  geom_col(fill = "#d9a84e") +
  coord_flip() +
  labs(x = NULL, y = "Ciro")
\`\`\``,
              "Metin içine gömülü `r toplam` ifadesi, sayıyı cümlenin içinde otomatik günceller.",
              "The inline `r toplam` expression updates the number inside the sentence automatically.",
            ),
            tip(
              "Parametreli rapor",
              "Parameterised reports",
              "Yukarıdaki `params` bölümü belgeyi **şablona** dönüştürür. Tek bir döngüyle 12 ay veya 30 bayi için ayrı ayrı rapor üretebilirsin:\n\n```r\nfor (ay in aylar) {\n  quarto::quarto_render(\n    \"rapor.qmd\",\n    execute_params = list(ay = ay),\n    output_file = paste0(\"rapor_\", ay, \".pdf\")\n  )\n}\n```\n\nBu, elle yapıldığında günler süren bir işi dakikalara indirir ve her raporun tutarlı olmasını garanti eder — kopyala-yapıştır hatası kalmaz.",
              "The `params` block above turns the document into a **template**. One loop can produce a separate report for 12 months or 30 dealers:\n\n```r\nfor (m in months) {\n  quarto::quarto_render(\n    \"report.qmd\",\n    execute_params = list(month = m),\n    output_file = paste0(\"report_\", m, \".pdf\")\n  )\n}\n```\n\nThis turns days of manual work into minutes and guarantees every report is consistent — no copy-paste errors remain.",
            ),
            quiz({
              id: "q1",
              q: [
                "Quarto'nun Word'e grafik kopyalamaya göre asıl üstünlüğü nedir?",
                "What is Quarto's real advantage over copying charts into Word?",
              ],
              options: [
                [
                  "Rapor veriyle birlikte otomatik güncellenir; kopyalama hatası ve eski sayı kalmaz",
                  "The report updates with the data automatically; no copy errors and no stale numbers",
                ],
                ["Daha güzel görünür", "It looks nicer"],
                ["Daha küçük dosya üretir", "It produces smaller files"],
                ["Ücretsizdir", "It is free"],
              ],
              answer: 0,
              explain: [
                "Elle hazırlanan raporlarda en sık görülen hata, veri güncellenirken metindeki bir sayının eski kalmasıdır — grafik yenidir ama cümledeki rakam geçen ayınkidir. Quarto'da metindeki sayı da kodla üretildiği için böyle bir tutarsızlık **yapısal olarak imkânsızdır**.",
                "The most common error in hand-built reports is a number in the prose going stale while the data updates — the chart is new but the figure in the sentence is last month's. In Quarto the number in the text is generated by code too, which makes that inconsistency **structurally impossible**.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "shiny-uygulamalari",
          title: L("Shiny ile etkileşimli uygulama", "Interactive apps with Shiny"),
          summary: L(
            "Web geliştirme bilmeden, R ile etkileşimli bir analiz aracı kur.",
            "Build an interactive analysis tool in R without knowing web development.",
          ),
          minutes: 18,
          blocks: [
            text(
              "**Shiny**, R kodundan tarayıcıda çalışan etkileşimli uygulamalar üretir. HTML, CSS veya JavaScript bilmene gerek yoktur.\n\nHer Shiny uygulaması iki parçadan oluşur:\n\n- **UI (arayüz)** — Kullanıcının gördüğü kontroller ve çıktı alanları\n- **Server (sunucu)** — Girdilere göre hesaplama yapıp çıktı üreten mantık\n\nAralarındaki bağ **tepkiselliktir (reactivity)**: kullanıcı bir kontrolü değiştirdiğinde, ona bağlı tüm çıktılar **kendiliğinden** yeniden hesaplanır. Hangi grafiğin güncelleneceğini sen yazmazsın; Shiny bağımlılıkları kendisi izler.",
              "**Shiny** turns R code into interactive applications that run in a browser. You need no HTML, CSS or JavaScript.\n\nEvery Shiny app has two parts:\n\n- **UI** — the controls and output areas the user sees\n- **Server** — the logic that computes outputs from inputs\n\nThe link between them is **reactivity**: when the user changes a control, everything depending on it recomputes **by itself**. You never write which chart to update; Shiny tracks the dependencies for you.",
            ),
            code(
              "r",
              `library(shiny)
library(tidyverse)

ui <- fluidPage(
  titlePanel("Satış Panosu"),
  sidebarLayout(
    sidebarPanel(
      selectInput("sehir", "Şehir:", choices = unique(satis$sehir)),
      dateRangeInput("tarih", "Tarih aralığı:")
    ),
    mainPanel(
      plotOutput("grafik"),
      tableOutput("ozet")
    )
  )
)

server <- function(input, output) {
  # Süzülmüş veri bir kez hesaplanır, iki çıktı da onu kullanır
  veri <- reactive({
    satis |> filter(sehir == input$sehir)
  })

  output$grafik <- renderPlot({
    ggplot(veri(), aes(tarih, tutar)) + geom_line()
  })

  output$ozet <- renderTable({
    veri() |> summarise(toplam = sum(tutar), ortalama = mean(tutar))
  })
}

shinyApp(ui, server)`,
            ),
            info(
              "Shiny ne zaman doğru araç?",
              "When is Shiny the right tool?",
              "**Shiny'nin güçlü olduğu yer:** Power BI veya Tableau'nun yapamadığı şeyler. Kullanıcının parametre girip **model çalıştırdığı**, senaryo simülasyonu yaptığı, istatistiksel bir hesabı etkileşimli keşfettiği araçlar. \"Faiz oranı %2 artarsa portföy ne olur?\" gibi.\n\n**Shiny'nin yanlış tercih olduğu yer:** standart bir satış panosu. Bunu Power BI veya Tableau daha hızlı, daha ucuz ve bakımı daha kolay şekilde yapar.\n\nBasit kural: **rapor gösteriyorsan BI aracı, hesap yaptırıyorsan Shiny.**",
              "**Where Shiny is strong:** things Power BI or Tableau cannot do. Tools where the user enters parameters and **runs a model**, simulates scenarios, or explores a statistical calculation interactively. \"What happens to the portfolio if rates rise 2%?\"\n\n**Where Shiny is the wrong choice:** a standard sales dashboard. Power BI or Tableau will do that faster, cheaper and with less maintenance.\n\nA simple rule: **if you are showing a report, use a BI tool; if you are running a calculation, use Shiny.**",
            ),
            quiz({
              id: "q1",
              q: [
                "Shiny'de `reactive()` kullanmanın faydası nedir?",
                "What is the benefit of using `reactive()` in Shiny?",
              ],
              options: [
                [
                  "Hesaplama bir kez yapılır ve onu kullanan tüm çıktılar paylaşır; tekrar hesaplama olmaz",
                  "The computation runs once and every output using it shares the result; no recomputation",
                ],
                ["Arayüzü güzelleştirir", "It improves the interface's appearance"],
                ["Uygulamayı yayınlar", "It publishes the app"],
                ["Veriyi kaydeder", "It saves the data"],
              ],
              answer: 0,
              explain: [
                "`reactive()` olmadan hem grafik hem tablo kendi içinde süzme yapar ve aynı hesap iki kez çalışır. Ağır bir hesapta bu, uygulamayı iki kat yavaşlatır. Tepkisel ifade sonucu önbelleğe alır ve yalnızca girdisi değiştiğinde yeniden hesaplar — Shiny performansının temel aracıdır.",
                "Without `reactive()` both the plot and the table would filter separately and the same computation would run twice. On a heavy calculation that halves the app's speed. A reactive expression caches its result and recomputes only when its inputs change — it is the fundamental performance tool in Shiny.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "r-paket-yazmak",
          title: L("Kendi paketini yazmak", "Writing your own package"),
          summary: L(
            "Kopyaladığın fonksiyonları paketle: ekibin ortak araç kutusunu kur.",
            "Package the functions you keep copying: build your team's shared toolbox.",
          ),
          minutes: 18,
          blocks: [
            text(
              "Aynı yardımcı fonksiyonu üçüncü kez bir projeden diğerine kopyaladığında paket yazma zamanı gelmiş demektir. R'da paket yazmak, sanılanın aksine, birkaç dakikalık bir iştir.\n\n```r\nusethis::create_package(\"~/kod/veriaraclari\")\nusethis::use_r(\"temizle\")        # R/temizle.R dosyası oluşturur\nusethis::use_test(\"temizle\")     # eşleşen test dosyası\nusethis::use_mit_license()\ndevtools::document()             # belgeleri üretir\ndevtools::check()                # her şeyi denetler\n```\n\nPaket, yalnızca kod paylaşmanın yolu değildir; **kaliteyi zorlayan bir çerçevedir**: her fonksiyonun belgesi olmalı, testleri geçmeli, bağımlılıkları açıkça yazılmalıdır.",
              "The third time you copy the same helper function from one project to another, it is time to write a package. Contrary to its reputation, writing an R package is a few minutes' work.\n\n```r\nusethis::create_package(\"~/code/datatools\")\nusethis::use_r(\"clean\")          # creates R/clean.R\nusethis::use_test(\"clean\")       # a matching test file\nusethis::use_mit_license()\ndevtools::document()             # generates the documentation\ndevtools::check()                # checks everything\n```\n\nA package is not just a way to share code; it is **a framework that forces quality**: every function must be documented, must pass its tests, and must declare its dependencies.",
            ),
            text(
              "**Bir paketin anatomisi:**\n\n- **`R/`** — Fonksiyonlar\n- **`man/`** — Belgeler (roxygen yorumlarından **otomatik** üretilir, elle yazılmaz)\n- **`tests/`** — `testthat` ile birim testleri\n- **`DESCRIPTION`** — Ad, sürüm, yazar, bağımlılıklar\n- **`NAMESPACE`** — Dışa açılan fonksiyonlar (otomatik üretilir)\n- **`vignettes/`** — Uzun kullanım rehberleri\n\nBelgeleme, fonksiyonun hemen üstüne yazılan yorumlarla yapılır:\n\n```r\n#' Türkçe biçimli sayıyı numeriğe çevirir\n#'\n#' @param x Karakter vektörü, \"1.899,50\" biçiminde\n#' @return Numerik vektör\n#' @examples\n#' tr_sayi(\"1.899,50\")\n#' @export\ntr_sayi <- function(x) {\n  as.numeric(gsub(\",\", \".\", gsub(\"\\\\.\", \"\", x)))\n}\n```\n\nEkip içi paketi paylaşmak için CRAN'a göndermene gerek yok: şirket Git deposundan `devtools::install_github(\"sirket/veriaraclari\")` ile kurulur.",
              "**The anatomy of a package:**\n\n- **`R/`** — the functions\n- **`man/`** — documentation (**generated** from roxygen comments, never hand-written)\n- **`tests/`** — unit tests with `testthat`\n- **`DESCRIPTION`** — name, version, author, dependencies\n- **`NAMESPACE`** — exported functions (generated)\n- **`vignettes/`** — longer usage guides\n\nDocumentation is written as comments directly above the function:\n\n```r\n#' Convert a Turkish-formatted number to numeric\n#'\n#' @param x Character vector in the form \"1.899,50\"\n#' @return A numeric vector\n#' @examples\n#' tr_number(\"1.899,50\")\n#' @export\ntr_number <- function(x) {\n  as.numeric(gsub(\",\", \".\", gsub(\"\\\\.\", \"\", x)))\n}\n```\n\nYou need not publish to CRAN to share an internal package: it installs from your company Git with `devtools::install_github(\"company/datatools\")`.",
            ),
            quiz({
              id: "q1",
              q: [
                "Ekipteki üç kişi aynı veri temizleme fonksiyonunu kendi projesine kopyalamış. En iyi çözüm?",
                "Three people on the team have each copied the same cleaning function into their own project. The best fix?",
              ],
              options: [
                [
                  "Ortak bir paket yazıp Git'ten kurmak; düzeltme herkese aynı anda ulaşır",
                  "Write a shared package installed from Git, so a fix reaches everyone at once",
                ],
                ["Fonksiyonu bir belgeye yazmak", "Write the function down in a document"],
                ["Herkesin kendi sürümünü tutması", "Let everyone keep their own version"],
                ["Kodu e-posta ile paylaşmak", "Share the code by email"],
              ],
              answer: 0,
              explain: [
                "Kopyalanan kod zamanla birbirinden ayrışır: biri hatayı düzeltir, diğerlerinde hata kalır ve aynı veriden farklı sonuçlar çıkar. Paket tek kaynak sağlar; ayrıca testler ve belgeler sayesinde fonksiyonun davranışı da kayıt altına alınır.",
                "Copied code drifts apart over time: one person fixes a bug, the others keep it, and the same data produces different results. A package provides a single source; and through its tests and documentation the function's behaviour is recorded too.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
