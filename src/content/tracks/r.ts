import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, quiz, text, tip } from "../helpers";

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
      id: "beginner",
      title: L("Başlangıç — R'ın temelleri", "Beginner — R fundamentals"),
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
      id: "intermediate",
      title: L("Orta — tidyverse", "Intermediate — tidyverse"),
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
      id: "advanced",
      title: L("İleri — Modelleme ve raporlama", "Advanced — Modelling and reporting"),
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
  ],
};
