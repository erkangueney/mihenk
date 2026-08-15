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
            quiz({
              id: "q2",
              q: [
                "ggplot2 metne göre hangi özelliğiyle öne çıkıyor?",
                "According to the text, what makes ggplot2 stand out?",
              ],
              options: [
                [
                  "Dünyadaki en tutarlı grafik dilbilgisi (grammar of graphics) uygulaması olması",
                  "Being the most coherent implementation of a grammar of graphics anywhere",
                ],
                ["En hızlı grafik motoru olması", "Being the fastest plotting engine"],
                ["Excel ile birebir aynı arayüze sahip olması", "Having an interface identical to Excel"],
                ["Yalnızca web sitelerinde çalışması", "Only working on websites"],
              ],
              answer: 0,
              explain: [
                "Metin ggplot2'yi hız veya arayüz benzerliğiyle değil, tutarlılığıyla övüyor: aynı birkaç kavramla (veri, estetik eşleme, geometri, katman) neredeyse her grafik türü inşa edilebiliyor.",
                "The text praises ggplot2 not for speed or interface similarity but for coherence: nearly any chart type can be built from the same handful of concepts (data, aesthetic mapping, geometry, layer).",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Metne göre yeni istatistiksel yöntemler genellikle nerede ilk yayımlanır?",
                "According to the text, where are new statistical methods usually published first?",
              ],
              options: [
                ["R'da", "In R"],
                ["Python'da", "In Python"],
                ["Excel'de", "In Excel"],
                ["SPSS'te", "In SPSS"],
              ],
              answer: 0,
              explain: [
                "Metin bunu R'ın istatistiksel modelleme alanındaki olgunluğunun bir kanıtı olarak veriyor: akademisyenler yeni yöntemleri genellikle önce R paketi olarak yayınlıyor.",
                "The text gives this as evidence of R's maturity in statistical modelling: academics usually publish new methods as an R package first.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "R Markdown ve Quarto metne göre neyi tek belgede birleştirir?",
                "According to the text, what do R Markdown and Quarto merge into one document?",
              ],
              options: [
                ["Analiz, metin ve grafikleri", "Analysis, prose and charts"],
                ["Yalnızca grafikleri", "Only charts"],
                ["Yalnızca veritabanı bağlantılarını", "Only database connections"],
                ["Yalnızca kodu", "Only code"],
              ],
              answer: 0,
              explain: [
                "Bu, R'ın raporlama gücünün özeti: kod çalışır, çıktısı üretilir ve açıklayıcı metinle aynı belgede yaşar — üçü ayrı ayrı derlenip birleştirilmez.",
                "This sums up R's reporting strength: code runs, its output is produced, and it lives with the prose in the same document — the three are not compiled separately and stitched together.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Metne göre R hangi alanlarda baskındır?",
                "According to the text, where is R dominant?",
              ],
              options: [
                [
                  "Yayın, ilaç (klinik) ve kamu istatistik kurumlarında",
                  "In publishing, pharmaceuticals (clinical work) and national statistics offices",
                ],
                ["Mobil uygulama geliştirmede", "In mobile app development"],
                ["Oyun geliştirmede", "In game development"],
                ["İşletim sistemi tasarımında", "In operating system design"],
              ],
              answer: 0,
              explain: [
                "Metin R'ın 'akademik ve klinik dünyada' baskın olduğunu söylüyor; bu alanlar düzenleyici kabul ve yayın geleneği nedeniyle yıllardır R'a bağlı kalıyor.",
                "The text says R is dominant in 'academia and clinical work'; these fields have stayed tied to R for years because of regulatory acceptance and publishing tradition.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Metne göre Python'ın güçlü olduğu alanlar hangileridir?",
                "According to the text, where is Python strong?",
              ],
              options: [
                [
                  "Makine öğrenmesi, derin öğrenme, üretim sistemlerine gömme ve genel yazılım geliştirme",
                  "Machine learning, deep learning, embedding in production systems and general software engineering",
                ],
                ["İstatistiksel modelleme ve akademik yayın", "Statistical modelling and academic publishing"],
                ["Yalnızca klinik deneyler", "Only clinical trials"],
                ["Yalnızca zaman serisi analizi", "Only time-series analysis"],
              ],
              answer: 0,
              explain: [
                "Metin bu dört alanı açıkça Python'ın güçlü tarafı olarak sayıyor — istatistiksel modelleme ve akademik yayın ise R'ın güçlü tarafı olarak listeleniyor.",
                "The text lists these four areas explicitly as Python's strengths — statistical modelling and academic publishing are listed as R's strengths instead.",
              ],
            }),
            info(
              "\"Hangisini öğrenmeliyim?\" sorusu yanlış soru",
              "\"Which should I learn?\" is the wrong question",
              "Doğru soru: **ne yapmak istiyorsun ve çevrende kim ne kullanıyor?**\n\n- Klinik araştırma, biyoistatistik, akademik yayın, kamu istatistiği → **R**\n- Makine öğrenmesi, veri mühendisliği, ürün ekibi, yazılım entegrasyonu → **Python**\n- Genel veri analistliği → İkisi de olur; ekibin ne kullandığı belirleyicidir\n\nİyi haber şu: birini öğrendiğinde diğeri çok daha kolay gelir. Kavramlar (veri çerçevesi, gruplama, birleştirme, modelleme) birebir aynıdır; yalnızca sözdizimi değişir. Deneyimli analistlerin çoğu ikisini de kullanır ve işe göre seçer.",
              "The right question is: **what do you want to do, and what do the people around you use?**\n\n- Clinical research, biostatistics, academic publishing, official statistics → **R**\n- Machine learning, data engineering, product teams, software integration → **Python**\n- General data analysis → either; what your team uses decides it\n\nThe good news: once you know one, the other comes much more easily. The concepts (data frame, grouping, joining, modelling) are identical; only the syntax changes. Most experienced analysts use both and pick per task.",
            ),
            quiz({
              id: "q7",
              q: [
                "Metne göre 'hangisini öğrenmeliyim' yerine sorulması gereken doğru soru nedir?",
                "According to the text, what's the right question instead of 'which should I learn'?",
              ],
              options: [
                [
                  "Ne yapmak istediğin ve çevrende kim ne kullandığı",
                  "What you want to do, and what the people around you use",
                ],
                ["Hangisi daha yeni çıktı", "Which one was released more recently"],
                ["Hangisinin logosu daha güzel", "Which one has the nicer logo"],
                ["Hangisi daha az disk alanı kaplar", "Which one takes up less disk space"],
              ],
              answer: 0,
              explain: [
                "Metin dili seçimini soyut bir üstünlük yarışı olarak değil, hedef ve çevre bağlamına göre çözülecek pratik bir soru olarak çerçeveliyor.",
                "The text frames the language choice not as an abstract superiority contest but as a practical question resolved by your goal and your surroundings.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Metne göre genel veri analistliği için ne önerilir?",
                "According to the text, what's recommended for general data analysis?",
              ],
              options: [
                [
                  "İkisi de olur; ekibin ne kullandığı belirleyicidir",
                  "Either works; what your team uses decides it",
                ],
                ["Yalnızca R kullanılmalı", "Only R should be used"],
                ["Yalnızca Python kullanılmalı", "Only Python should be used"],
                ["SQL öğrenmek yeterlidir, ikisine de gerek yok", "Learning SQL alone is enough, neither is needed"],
              ],
              answer: 0,
              explain: [
                "Bu, metindeki listenin üçüncü ve son maddesi: klinik/akademik alanlar R'a, ML/ürün ekipleri Python'a, genel analistlik ise ekip pratiğine bağlanıyor.",
                "This is the third and last item in the text's list: clinical/academic work maps to R, ML/product teams to Python, and general analytics to whatever the team already uses.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Metne göre R ile Python arasındaki temel kavramlar (veri çerçevesi, gruplama, birleştirme, modelleme) nasıldır?",
                "According to the text, how do the core concepts (data frame, grouping, joining, modelling) compare between R and Python?",
              ],
              options: [
                [
                  "Birebir aynıdır; yalnızca sözdizimi değişir",
                  "They are identical; only the syntax changes",
                ],
                ["Tamamen farklıdır", "They are completely different"],
                ["R'da bu kavramlar yoktur", "R lacks these concepts"],
                ["Python'da bu kavramlar yoktur", "Python lacks these concepts"],
              ],
              answer: 0,
              explain: [
                "Bu yüzden metin bir dili öğrenmenin diğerini çok daha kolay hâle getirdiğini söylüyor — öğrenilen şey sözdizimi değil, zaten bilinen kavramların yeni bir yazımı.",
                "This is why the text says learning one makes the other much easier — what you're learning is a new notation for concepts you already know, not the concepts themselves.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Metne göre deneyimli analistlerin çoğu ne yapar?",
                "According to the text, what do most experienced analysts do?",
              ],
              options: [
                ["İkisini de kullanır ve işe göre seçer", "Use both and pick per task"],
                ["Yalnızca öğrendikleri ilk dili kullanır", "Stick only to the first language they learned"],
                ["Yöneticilerinin dediğini sorgusuzca kullanır", "Use whatever their manager says, without question"],
                ["Hiçbirini kullanmaz, yalnızca Excel kullanır", "Use neither, only Excel"],
              ],
              answer: 0,
              explain: [
                "Metnin kapanış cümlesi bu: dil seçimi ömür boyu bağlılık değil, göreve göre yapılan pratik bir tercihtir.",
                "This is the text's closing point: choosing a language isn't a lifelong allegiance, it's a practical choice made per task.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Listenin (list) vektörden farkı nedir?",
                "How does a list differ from a vector?",
              ],
              options: [
                [
                  "Liste farklı tipte öğeler tutabilir; vektör aynı tipte olmak zorundadır",
                  "A list can hold items of different types; a vector's items must all be the same type",
                ],
                ["İkisi tamamen aynıdır", "The two are completely identical"],
                ["Liste yalnızca sayı tutar", "A list can only hold numbers"],
                ["Vektör yalnızca metin tutar", "A vector can only hold text"],
              ],
              answer: 0,
              explain: [
                "`list(ad = \"Elif\", yas = 30)` örneğinde bir metin ve bir sayı aynı yapıda bir arada duruyor — bu bir vektörde mümkün değildir, çünkü vektörün tüm elemanları aynı tipte olmalıdır.",
                "In `list(name = \"Elif\", age = 30)` a string and a number sit together in one structure — that's not possible in a vector, since every element of a vector must share the same type.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Metne göre tibble'ın data.frame'e göre farkı nedir?",
                "According to the text, how does a tibble differ from a data.frame?",
              ],
              options: [
                [
                  "Daha temiz yazdırır ve sürpriz tip dönüşümü yapmaz",
                  "It prints more cleanly and does not silently convert types",
                ],
                ["Yalnızca sayısal veri tutabilir", "It can only hold numeric data"],
                ["R'ın çok eski bir yapısıdır", "It is a very old R structure"],
                ["Sütun kavramı yoktur", "It has no concept of columns"],
              ],
              answer: 0,
              explain: [
                "tibble, tidyverse'in modern data.frame'idir; klasik data.frame'in sessizce yaptığı bazı tip dönüşümlerini yapmaz, bu da beklenmedik hataları önler.",
                "A tibble is tidyverse's modern data frame; it skips some of the silent type conversions the classic data.frame performs, which prevents unexpected bugs.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "factor hangi tür değişkeni temsil eder?",
                "What kind of variable does a factor represent?",
              ],
              options: [
                [
                  "Kategorik bir değişkeni; düzeyleri (levels) vardır",
                  "A categorical variable; it has levels",
                ],
                ["Sürekli sayısal bir değişkeni", "A continuous numeric variable"],
                ["Bir tarih değişkenini", "A date variable"],
                ["Bir dosya yolunu", "A file path"],
              ],
              answer: 0,
              explain: [
                "Metin factor'ü açıkça kategorik değişken olarak tanımlıyor ve modellemede önemli olduğunu belirtiyor — çünkü çoğu istatistiksel model kategorileri factor düzeyleri üzerinden ayırt eder.",
                "The text explicitly defines a factor as a categorical variable and notes its importance in modelling — most statistical models distinguish categories through the factor's levels.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "Koddaki `kdvli <- fiyatlar * 1.20` satırı ne yapar?",
                "What does the line `kdvli <- fiyatlar * 1.20` in the code do?",
              ],
              options: [
                [
                  "Döngü yazmadan dört fiyatın hepsine 1.20 çarpımını uygular",
                  "Applies the 1.20 multiplication to all four prices without writing a loop",
                ],
                ["Yalnızca ilk elemanı çarpar", "It multiplies only the first element"],
                ["Vektörü büyükten küçüğe sıralar", "It sorts the vector from largest to smallest"],
                ["Hata verir çünkü vektörle sayı çarpılamaz", "It errors because a vector cannot be multiplied by a number"],
              ],
              answer: 0,
              explain: [
                "Bu vektörleştirmenin kendisi: `*` işlemi vektördeki her elemana ayrı ayrı, tek satırda uygulanır. Python'da bunun için genelde bir döngü veya liste kavraması gerekir.",
                "This is vectorisation itself: the `*` operation applies to every element of the vector, in one line. In Python this usually needs a loop or a list comprehension.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Koddaki `fiyatlar[fiyatlar > 2000]` ifadesi ne yapar?",
                "What does `fiyatlar[fiyatlar > 2000]` do in the code?",
              ],
              options: [
                [
                  "2000'den büyük olan fiyatları döndürür (mantıksal süzme)",
                  "Returns the prices greater than 2000 (logical filtering)",
                ],
                ["Tüm fiyatları 2000 yapar", "Sets every price to 2000"],
                ["Vektörü tersine çevirir", "Reverses the vector"],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "`fiyatlar > 2000` önce her elemanı TRUE/FALSE'a çeviren bir mantıksal vektör üretir; bu vektörle indeksleme, yalnızca TRUE olan elemanları geri döndürür.",
                "`fiyatlar > 2000` first produces a logical vector of TRUE/FALSE for each element; indexing with that vector returns only the elements that came out TRUE.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Koddaki `df$ciro <- df$fiyat * df$adet` satırının amacı nedir?",
                "What is the purpose of `df$ciro <- df$fiyat * df$adet` in the code?",
              ],
              options: [
                [
                  "`df` data.frame'ine `ciro` adında yeni bir sütun eklemek",
                  "To add a new column named `ciro` to the `df` data frame",
                ],
                ["Mevcut bir sütunu silmek", "To delete an existing column"],
                ["Yeni bir data.frame oluşturmak", "To create a brand-new data frame"],
                ["Satır sayısını değiştirmek", "To change the row count"],
              ],
              answer: 0,
              explain: [
                "`df$yeni_sutun <- ifade` kalıbı R'da yeni sütun eklemenin standart yoludur; `$` ile var olmayan bir isme atama yapmak, o sütunu data.frame'e ekler.",
                "The `df$new_column <- expression` pattern is the standard way to add a column in R; assigning with `$` to a name that doesn't exist yet adds that column to the data frame.",
              ],
            }),
            pitfall(
              "Python'dan gelenlerin iki tuzağı",
              "Two traps for people coming from Python",
              "**1. İndeks 1'den başlar.** `fiyatlar[1]` ilk elemandır, ikinci değil. Bu, istatistik geleneğinden gelir ve alışması birkaç gün sürer.\n\n**2. Eksi indeks tamamen farklı çalışır.** Python'da `liste[-1]` **son** elemanı verir; R'da `vektor[-1]` ilk eleman **hariç** her şeyi verir. Bu iki dil arasında geçiş yapanların en sık düştüğü tuzaktır ve hata vermeden yanlış sonuç ürettiği için tehlikelidir.",
              "**1. Indexing starts at 1.** `prices[1]` is the first element, not the second. This comes from statistical convention and takes a few days to get used to.\n\n**2. Negative indexing means something entirely different.** In Python `list[-1]` gives the **last** element; in R `vec[-1]` gives everything **except** the first. This is the trap people switching between the languages fall into most, and it is dangerous because it produces a wrong answer without an error.",
            ),
            quiz({
              id: "q8",
              q: [
                "Koddaki `fiyatlar[1]` hangi elemanı verir?",
                "In the code, which element does `fiyatlar[1]` give?",
              ],
              options: [
                ["İlk elemanı, çünkü R'da indeks 1'den başlar", "The first element, since R indexes from 1"],
                ["İkinci elemanı", "The second element"],
                ["Son elemanı", "The last element"],
                ["Hiçbirini; hata verir", "None; it errors"],
              ],
              answer: 0,
              explain: [
                "Pitfall bloğunda açıklandığı gibi, R'ın indekslemesi istatistik geleneğinden gelir ve 1'den başlar; bu yüzden `[1]` her zaman ilk elemandır.",
                "As the pitfall explains, R's indexing comes from statistical convention and starts at 1, so `[1]` is always the first element.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Pitfall'a göre Python'dan R'a geçenlerin en sık düştüğü tuzak nedir?",
                "According to the pitfall, what trap do people switching from Python to R fall into most?",
              ],
              options: [
                [
                  "Eksi indeksin Python'daki gibi \"sondan say\" değil \"bu indeksi çıkar\" anlamına gelmesi",
                  "Negative indexing meaning \"drop this index\" rather than \"count from the end\" as in Python",
                ],
                ["İndeksin 0'dan başlaması", "Indexing starting at 0"],
                ["Vektörlerin sıralı olmaması", "Vectors not being ordered"],
                ["data.frame yapısının bulunmaması", "The data.frame structure not existing"],
              ],
              answer: 0,
              explain: [
                "Bu tuzak özellikle tehlikelidir çünkü kod hata vermez — yanlış boyutta ama \"makul görünen\" bir sonuç üretir ve fark edilmesi zaman alabilir.",
                "This trap is especially dangerous because the code doesn't error — it produces a wrong-sized but \"plausible-looking\" result that can go unnoticed for a while.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "Koddaki `str(df)` fonksiyonu ne işe yarar?",
                "What does the `str(df)` function in the code do?",
              ],
              options: [
                [
                  "data.frame'in yapısını (sütun tipleri, örnek değerler) özetler",
                  "Summarises the data frame's structure (column types, sample values)",
                ],
                ["Veriyi diske CSV olarak kaydeder", "Saves the data to disk as CSV"],
                ["Sütunları alfabetik sıralar", "Sorts the columns alphabetically"],
                ["Veri çerçevesindeki tüm satırları siler", "Deletes every row in the data frame"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum da bunu doğruluyor: `str(df)` \"yapıyı özetler — en çok kullanacağın fonksiyon\". Yeni bir data.frame gördüğünde ilk çalıştırılacak komut genelde budur.",
                "The code's own comment confirms this: `str(df)` \"summarises the structure — the function you'll use most\". It's usually the first command you run when you see a new data frame.",
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
            quiz({
              id: "q2",
              q: [
                "RStudio'nun 'Ortam' (Environment) bölmesi ne gösterir?",
                "What does RStudio's 'Environment' pane show?",
              ],
              options: [
                [
                  "Bellekteki tüm değişkenleri, tiplerini ve içeriklerini canlı olarak",
                  "Every variable in memory, its type and its contents, live",
                ],
                ["Yalnızca en son çalıştırılan komutu", "Only the most recently run command"],
                ["İnternet bağlantısının durumunu", "The status of the internet connection"],
                ["Yüklü R sürümünü", "The installed R version"],
              ],
              answer: 0,
              explain: [
                "Metin bu bölmeyi RStudio'nun 'en değerli özelliği' olarak tanımlıyor çünkü Python'ın çoğu editöründe olmayan bir rahatlık sağlıyor: bir data.frame'e tıklayıp içeriğini Excel gibi görebilme.",
                "The text calls this pane RStudio's 'most valuable feature' because it offers a convenience most Python editors lack: clicking a data frame to inspect its contents like a spreadsheet.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`install.packages(\"tidyverse\")` ile `library(tidyverse)` arasındaki fark nedir?",
                "What's the difference between `install.packages(\"tidyverse\")` and `library(tidyverse)`?",
              ],
              options: [
                [
                  "`install.packages` paketi bir kez kurar; `library` her oturumda onu yükler",
                  "`install.packages` installs the package once; `library` loads it every session",
                ],
                ["İkisi tamamen aynı işi yapar", "The two do exactly the same thing"],
                ["`library` paketi bilgisayardan siler", "`library` deletes the package from the computer"],
                ["`install.packages` yalnızca CRAN dışı paketler içindir", "`install.packages` is only for non-CRAN packages"],
              ],
              answer: 0,
              explain: [
                "Kurulum bir defalık bir iştir (disk'e indirir); `library()` ise her yeni R oturumunda paketin fonksiyonlarını kullanılabilir kılmak için tekrar çağrılması gereken bir komuttur.",
                "Installing is a one-time operation (downloads it to disk); `library()` is the command you must call again every new R session to make the package's functions usable.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "CRAN'a kabul edilen bir paket hakkında metne göre ne söylenebilir?",
                "According to the text, what can be said about a package accepted onto CRAN?",
              ],
              options: [
                [
                  "Otomatik testlerden geçmiş ve belgelenmiş olmak zorundadır",
                  "It must pass automated checks and be documented",
                ],
                ["Mutlaka ücretli olmak zorundadır", "It must necessarily be paid"],
                ["Yalnızca Windows'ta çalışır", "It only works on Windows"],
                ["Kaynak kodu gizli tutulur", "Its source code is kept hidden"],
              ],
              answer: 0,
              explain: [
                "Metin bunu R ekosisteminin 'kalite açısından güçlü yanı' olarak işaretliyor: CRAN, gönderilen her paketi otomatik denetimlerden geçirir ve belgesiz paketi kabul etmez.",
                "The text flags this as a 'genuine quality strength' of the R ecosystem: CRAN runs every submitted package through automated checks and rejects undocumented ones.",
              ],
            }),
            tip(
              "Proje kullan, `setwd()` kullanma",
              "Use Projects, not `setwd()`",
              "R öğrenirken en sık öğretilen ve en zararlı alışkanlık `setwd(\"C:/Users/erkan/Desktop/analiz\")` yazmaktır. Bu satır **yalnızca senin bilgisayarında** çalışır; kodu paylaştığında ilk hata orada patlar.\n\nDoğru yol **RStudio Projesi** (`.Rproj`) kullanmaktır: proje klasörünü açtığında çalışma dizini otomatik olarak orası olur ve tüm yollar göreli yazılır (`data/satis.csv`). Kod her bilgisayarda çalışır.\n\nTekrarlanabilirliğin ikinci adımı **`renv`** paketidir: projenin kullandığı paket sürümlerini kilitler. Altı ay sonra veya başka bir makinede `renv::restore()` ile birebir aynı ortamı kurarsın.",
              "The most commonly taught and most harmful habit when learning R is writing `setwd(\"C:/Users/erkan/Desktop/analysis\")`. That line works **only on your machine**; the moment you share the code it fails there first.\n\nThe right way is an **RStudio Project** (`.Rproj`): opening the project folder makes it the working directory automatically and every path is written relative (`data/sales.csv`). The code then runs anywhere.\n\nThe second step to reproducibility is the **`renv`** package: it locks the package versions the project uses. Six months later, or on another machine, `renv::restore()` rebuilds exactly the same environment.",
            ),
            quiz({
              id: "q5",
              q: [
                "`setwd(\"C:/Users/erkan/Desktop/analiz\")` satırının asıl sorunu nedir?",
                "What is the real problem with the line `setwd(\"C:/Users/erkan/Desktop/analysis\")`?",
              ],
              options: [
                [
                  "Yalnızca yazan kişinin bilgisayarında çalışır; kod paylaşıldığında ilk hata orada patlar",
                  "It only works on the author's machine; sharing the code, this is where it fails first",
                ],
                ["R'da geçersiz bir komuttur, çalışmaz", "It's not a valid R command and won't run"],
                ["Çok yavaş çalışır", "It runs very slowly"],
                ["Yalnızca Mac'te çalışır", "It only works on Mac"],
              ],
              answer: 0,
              explain: [
                "`setwd()` mutlak bir yol yazdırdığı için o dizin yapısı yalnızca yazarın bilgisayarında vardır; başka birinde çalıştırıldığında dizin bulunamaz ve ilk satırda hata alınır.",
                "Because `setwd()` hardcodes an absolute path, that directory structure only exists on the author's machine; run elsewhere, the folder isn't found and the very first line errors.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "RStudio Projesi (`.Rproj`) kullanmanın metne göre faydası nedir?",
                "According to the text, what's the benefit of using an RStudio Project (`.Rproj`)?",
              ],
              options: [
                [
                  "Çalışma dizinini otomatik ayarlar, böylece göreli yollar her bilgisayarda çalışır",
                  "It sets the working directory automatically, so relative paths work on any machine",
                ],
                ["Kodu otomatik olarak yorumlar", "It automatically comments the code"],
                ["İnternet bağlantısı gerektirmez", "It requires no internet connection"],
                ["Yalnızca RStudio Cloud'da kullanılabilir", "It only works on RStudio Cloud"],
              ],
              answer: 0,
              explain: [
                "Proje klasörünü açtığında çalışma dizini otomatik olarak orası olur; bu sayede `data/satis.csv` gibi göreli bir yol, projeyi kimin nerede açtığından bağımsız olarak çalışır.",
                "Opening the project folder makes it the working directory automatically; that way a relative path like `data/sales.csv` works regardless of who opens the project or where.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`renv` paketi ne işe yarar?",
                "What does the `renv` package do?",
              ],
              options: [
                [
                  "Projenin kullandığı paket sürümlerini kilitler",
                  "It locks the package versions the project uses",
                ],
                ["Kodu otomatik olarak test eder", "It automatically tests the code"],
                ["Grafik üretir", "It produces charts"],
                ["Veritabanına bağlanır", "It connects to a database"],
              ],
              answer: 0,
              explain: [
                "`renv`, hangi paketin hangi sürümünün kullanıldığını kaydeder; böylece altı ay sonra veya başka bir makinede `renv::restore()` çağrısı birebir aynı ortamı yeniden kurar.",
                "`renv` records which version of each package is in use; that way, six months later or on another machine, calling `renv::restore()` rebuilds exactly the same environment.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Metne göre R öğrenirken en sık öğretilen ve en zararlı alışkanlık nedir?",
                "According to the text, what's the most commonly taught and most harmful habit when learning R?",
              ],
              options: [
                [
                  "`setwd()` ile mutlak (kişisel) bir yol yazmak",
                  "Writing an absolute (personal) path with `setwd()`",
                ],
                ["`library()` çağırmayı unutmak", "Forgetting to call `library()`"],
                ["Yorum satırı eklememek", "Not adding comments"],
                ["Fonksiyon adlarını küçük harfle yazmak", "Writing function names in lowercase"],
              ],
              answer: 0,
              explain: [
                "Metin bunu tam olarak bu sözlerle ifade ediyor; sorun `setwd()` fonksiyonunun kendisinde değil, içine yazılan mutlak, kişisel yoldadır.",
                "The text states this in almost exactly these words; the problem isn't the `setwd()` function itself but the absolute, personal path written inside it.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "CRAN'a paket göndermek isteyen bir geliştirici neye uymak zorundadır?",
                "What must a developer comply with to submit a package to CRAN?",
              ],
              options: [
                [
                  "Paket otomatik testlerden geçmeli ve belgelenmiş olmalı",
                  "The package must pass automated checks and be documented",
                ],
                ["Paket yalnızca İngilizce olmalı", "The package must be in English only"],
                ["Paket ücretsiz olmamalı", "The package must not be free"],
                ["Paket en az 100 fonksiyon içermeli", "The package must contain at least 100 functions"],
              ],
              answer: 0,
              explain: [
                "Bu, ilk metinde geçen CRAN kalite koşuludur: her paket otomatik denetimlerden geçirilir ve belgesiz bir paket kabul edilmez.",
                "This is the CRAN quality requirement from the opening text: every package is run through automated checks, and an undocumented package is rejected.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Tekrarlanabilirlik için metinde bahsedilen iki adım hangileridir?",
                "What are the two steps to reproducibility mentioned in the text?",
              ],
              options: [
                [
                  "RStudio Projesi ile göreli yollar ve `renv` ile paket sürümü kilitleme",
                  "An RStudio Project with relative paths, and locking package versions with `renv`",
                ],
                ["Yalnızca `install.packages()` çağırmak", "Just calling `install.packages()`"],
                ["Kodu bulut sunucusuna yüklemek", "Uploading the code to a cloud server"],
                ["Yalnızca yorum satırı eklemek", "Just adding comments"],
              ],
              answer: 0,
              explain: [
                "Metin bu ikisini açıkça sırayla sayıyor: önce Proje + göreli yol, sonra `renv` ile paket sürümlerini kilitleme. İkisi birlikte 'bende çalışıyordu' sorununu ortadan kaldırıyor.",
                "The text lists these two explicitly in order: first a Project with relative paths, then locking package versions with `renv`. Together they eliminate the \"it worked on my machine\" problem.",
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
            quiz({
              id: "q2",
              q: [
                "Metne göre işlemlerin \"vektörel\" (vectorised) çalışması ne anlama gelir?",
                "According to the text, what does it mean that operations are \"vectorised\"?",
              ],
              options: [
                [
                  "Bir işlem, döngü yazmadan vektördeki tüm elemanlara birden uygulanır",
                  "An operation applies to every element of a vector at once, without writing a loop",
                ],
                ["Vektörler otomatik olarak sıralanır", "Vectors get sorted automatically"],
                ["Yalnızca ilk elemana işlem uygulanır", "The operation applies only to the first element"],
                ["Vektörler bellekte saklanmaz", "Vectors aren't stored in memory"],
              ],
              answer: 0,
              explain: [
                "Bu, R'ın 'baştan sona istatistik için tasarlandığı' iddiasının somut karşılığı: `fiyatlar * 1.20` gibi bir ifade tek satırda tüm elemanlara uygulanır, döngüye gerek kalmaz.",
                "This is the concrete payoff of R being 'designed for statistics from the ground up': an expression like `fiyatlar * 1.20` applies to every element in one line, no loop needed.",
              ],
            }),
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
            quiz({
              id: "q3",
              q: [
                "Koddaki `mean(fiyatlar)` ve `median(fiyatlar)` arasındaki fark nedir?",
                "In the code, what's the difference between `mean(fiyatlar)` and `median(fiyatlar)`?",
              ],
              options: [
                [
                  "`mean` aritmetik ortalamayı, `median` ortanca değeri verir",
                  "`mean` gives the arithmetic average, `median` gives the middle value",
                ],
                ["İkisi her zaman aynı sonucu verir", "The two always give the same result"],
                ["`mean` en büyük değeri verir", "`mean` gives the largest value"],
                ["`median` en küçük değeri verir", "`median` gives the smallest value"],
              ],
              answer: 0,
              explain: [
                "`mean` tüm değerlerin toplamını eleman sayısına böler; `median` değerleri sıraya koyup ortadaki değeri alır. Aykırı değer varsa ikisi birbirinden uzaklaşır.",
                "`mean` divides the sum of all values by the count; `median` orders the values and takes the middle one. With an outlier present, the two drift apart from each other.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Koddaki `fiyatlar[fiyatlar > 2000]` satırı ne yapar?",
                "What does the line `fiyatlar[fiyatlar > 2000]` in the code do?",
              ],
              options: [
                [
                  "2000'den büyük fiyatları filtreler (mantıksal süzme)",
                  "Filters the prices greater than 2000 (logical filtering)",
                ],
                ["Tüm fiyatları 2000'e eşitler", "Sets every price to 2000"],
                ["Vektörü sıralar", "Sorts the vector"],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "Kodun kendi yorumu da bunu doğruluyor: 'mantıksal filtreleme'. `fiyatlar > 2000` önce bir TRUE/FALSE vektörü üretir, sonra bu vektörle indeksleme yalnızca TRUE olanları döndürür.",
                "The code's own comment confirms this: 'logical filtering'. `fiyatlar > 2000` first produces a TRUE/FALSE vector, then indexing with it returns only the TRUE elements.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Koddaki `str(df)` fonksiyonu ne için kullanılır?",
                "What is `str(df)` used for in the code?",
              ],
              options: [
                [
                  "Veri çerçevesinin yapısını (sütun tipleri, örnek değerler) özetlemek için",
                  "To summarise the data frame's structure (column types, sample values)",
                ],
                ["Veriyi diske kaydetmek için", "To save the data to disk"],
                ["Sütunları silmek için", "To delete columns"],
                ["Veriyi sıralamak için", "To sort the data"],
              ],
              answer: 0,
              explain: [
                "`str()`, yeni bir data.frame gördüğünde ilk çalıştırılacak fonksiyondur: her sütunun tipini ve birkaç örnek değerini tek bakışta gösterir.",
                "`str()` is the function you run first when you see a new data frame: it shows every column's type and a few sample values at a glance.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Koddaki `head(df)` ne döndürür?",
                "What does `head(df)` return in the code?",
              ],
              options: [
                ["Veri çerçevesinin ilk birkaç satırını", "The first few rows of the data frame"],
                ["Son birkaç satırı", "The last few rows"],
                ["Yalnızca sütun adlarını", "Only the column names"],
                ["Toplam satır sayısını", "The total row count"],
              ],
              answer: 0,
              explain: [
                "`head()` varsayılan olarak ilk 6 satırı gösterir; büyük bir veri setinin nasıl göründüğüne hızlıca bakmak için kullanılır.",
                "`head()` shows the first 6 rows by default; it's used to quickly peek at what a large dataset looks like.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Koddaki `nrow(df)` ne döndürür?",
                "What does `nrow(df)` return in the code?",
              ],
              options: [
                ["Satır sayısını", "The row count"],
                ["Sütun sayısını", "The column count"],
                ["İlk satırı", "The first row"],
                ["Veri tiplerini", "The data types"],
              ],
              answer: 0,
              explain: [
                "`nrow` \"number of rows\"un kısaltmasıdır; sütun sayısı için karşılığı `ncol()`'dur.",
                "`nrow` is short for \"number of rows\"; its counterpart for column count is `ncol()`.",
              ],
            }),
            info(
              "Atama operatörü `<-`",
              "The assignment operator `<-`",
              "R'da atama için hem `<-` hem `=` çalışır ama topluluk `<-` kullanır ve stil kılavuzları bunu şart koşar. RStudio'da `Alt + -` kısayolu doğrudan `<-` yazar. Fonksiyon argümanlarında ise daima `=` kullanılır.",
              "Both `<-` and `=` assign in R, but the community uses `<-` and style guides require it. In RStudio, `Alt + -` types it for you. Inside function calls you always use `=`.",
            ),
            quiz({
              id: "q8",
              q: [
                "R'da atama için topluluğun tercih ettiği ve stil kılavuzlarının şart koştuğu operatör hangisidir?",
                "Which assignment operator does the community prefer and style guides require in R?",
              ],
              options: [
                ["`<-`", "`<-`"],
                ["`=`", "`=`"],
                ["`==`", "`==`"],
                ["`->`", "`->`"],
              ],
              answer: 0,
              explain: [
                "İkisi de teknik olarak çalışır ama `<-` topluluk standardıdır; `=` genelde yalnızca fonksiyon argümanlarında kullanılır.",
                "Both technically work, but `<-` is the community standard; `=` is usually reserved for function arguments.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "RStudio'da `<-` yazmak için kısayol nedir?",
                "What is the RStudio keyboard shortcut to type `<-`?",
              ],
              options: [
                ["Alt + -", "Alt + -"],
                ["Ctrl + C", "Ctrl + C"],
                ["Cmd + S", "Cmd + S"],
                ["Shift + Enter", "Shift + Enter"],
              ],
              answer: 0,
              explain: [
                "Bu kısayol, `<-` yazmayı Python'daki `=` kadar hızlı hâle getirir ve iki karakter yazma zahmetini ortadan kaldırır.",
                "This shortcut makes typing `<-` as fast as typing `=` in Python, removing the friction of typing two characters.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Fonksiyon argümanlarında hangi operatör kullanılır?",
                "Which operator is used inside function arguments?",
              ],
              options: [
                ["Her zaman `=`", "Always `=`"],
                ["Her zaman `<-`", "Always `<-`"],
                ["İkisi de kullanılamaz", "Neither can be used"],
                ["`==`", "`==`"],
              ],
              answer: 0,
              explain: [
                "Metin bunu net bir kural olarak veriyor: genel atamada `<-`, ama `data.frame(urun = c(...))` gibi fonksiyon çağrılarının içinde daima `=`.",
                "The text states this as a clear rule: `<-` for general assignment, but always `=` inside function calls like `data.frame(urun = c(...))`.",
              ],
            }),
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
            quiz({
              id: "q1",
              q: [
                "dplyr'ın beş fiilinden `filter()` ne yapar?",
                "Among dplyr's five verbs, what does `filter()` do?",
              ],
              options: [
                ["Satır seçer", "Picks rows"],
                ["Sütun seçer", "Picks columns"],
                ["Yeni bir sütun türetir", "Derives a new column"],
                ["Veriyi sıralar", "Sorts the data"],
              ],
              answer: 0,
              explain: [
                "Metindeki listede `filter()` açıkça 'satır seç' olarak tanımlanıyor — belirttiğin koşulu sağlayan satırları tutar, diğerlerini atar.",
                "The text's list defines `filter()` explicitly as 'pick rows' — it keeps the rows matching your condition and drops the rest.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "`select()` fiili ne için kullanılır?",
                "What is the `select()` verb used for?",
              ],
              options: [
                ["Sütun seçmek için", "To pick columns"],
                ["Satır seçmek için", "To pick rows"],
                ["Veriyi gruplamak için", "To group the data"],
                ["Veriyi sıralamak için", "To sort the data"],
              ],
              answer: 0,
              explain: [
                "`filter()` satırla, `select()` sütunla ilgilenir — dplyr'da 'hangi satırlar' ile 'hangi sütunlar' sorusu her zaman ayrı fiillerle çözülür.",
                "`filter()` deals with rows, `select()` with columns — in dplyr, 'which rows' and 'which columns' are always answered by separate verbs.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`mutate()` fiili ne yapar?",
                "What does the `mutate()` verb do?",
              ],
              options: [
                ["Yeni bir sütun türetir", "Derives a new column"],
                ["Satırları filtreler", "Filters rows"],
                ["Veriyi sıralar", "Sorts the data"],
                ["Veriyi gruplar", "Groups the data"],
              ],
              answer: 0,
              explain: [
                "`mutate()`, var olan sütunlardan hesaplanan yeni bir sütun ekler — örneğin `adet` ve `fiyat`tan `ciro` türetmek gibi.",
                "`mutate()` adds a new column computed from existing ones — for example deriving `ciro` (revenue) from `adet` and `fiyat`.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`group_by()` ile `summarise()` birlikte kullanıldığında ne yapar?",
                "What do `group_by()` and `summarise()` do when used together?",
              ],
              options: [
                ["Veriyi gruplayıp her grup için özet hesaplar", "Group the data and compute a summary per group"],
                ["Veriyi filtreler", "Filter the data"],
                ["Veriyi sıralar", "Sort the data"],
                ["Yeni bir sütun türetir", "Derive a new column"],
              ],
              answer: 0,
              explain: [
                "İkisi bir çift olarak çalışır: `group_by()` veriyi kategoriye göre böler, `summarise()` her grup için toplam, ortalama gibi tek bir değer üretir.",
                "The two work as a pair: `group_by()` splits the data by category, `summarise()` produces a single value — a total, an average — per group.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`|>` (pipe) operatörünün metne göre faydası nedir?",
                "According to the text, what is the benefit of the `|>` (pipe) operator?",
              ],
              options: [
                [
                  "İşlemleri zincirleyip kodun soldan sağa, yukarıdan aşağı okunmasını sağlar",
                  "It chains operations so the code reads left to right, top to bottom",
                ],
                ["Veriyi diske kaydeder", "It saves the data to disk"],
                ["Grafik çizer", "It draws a chart"],
                ["Hataları otomatik düzeltir", "It automatically fixes errors"],
              ],
              answer: 0,
              explain: [
                "Pipe olmadan aynı zincir iç içe geçmiş fonksiyon çağrılarıyla yazılırdı ve okuma sırası içten dışa doğru olurdu — pipe bunu doğal okuma sırasına çevirir.",
                "Without the pipe, the same chain would be written as nested function calls read from the inside out — the pipe turns it into a natural top-to-bottom reading order.",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "Koddaki zincirin ürettiği `ozet` tablosunda, her kategori satırı için hangi sütunlar bulunur?",
                "In the `ozet` table produced by the chain in the code, what columns exist for each category row?",
              ],
              options: [
                [
                  "`toplam_ciro`, `ort_fiyat` ve `n`",
                  "`toplam_ciro`, `ort_fiyat` and `n`",
                ],
                ["Yalnızca orijinal `ciro` sütunu", "Only the original `ciro` column"],
                ["Yalnızca `durum` sütunu", "Only the `durum` column"],
                ["`satislar` tablosunun tüm sütunları değişmeden", "All of the `satislar` table's columns unchanged"],
              ],
              answer: 0,
              explain: [
                "`summarise()` içindeki üç isimlendirilmiş ifade (`toplam_ciro = sum(ciro)`, `ort_fiyat = mean(fiyat)`, `n = n()`) tam olarak çıktı tablosunun sütunlarını belirler; grup başına bir satır kalır.",
                "The three named expressions inside `summarise()` (`toplam_ciro = sum(ciro)`, `ort_fiyat = mean(fiyat)`, `n = n()`) define exactly the output table's columns; one row remains per group.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Zincirdeki `arrange(desc(toplam_ciro))` satırı ne yapar?",
                "What does `arrange(desc(toplam_ciro))` do in the chain?",
              ],
              options: [
                [
                  "Tabloyu toplam ciroya göre büyükten küçüğe sıralar",
                  "Sorts the table by total revenue from largest to smallest",
                ],
                ["Küçükten büyüğe sıralar", "Sorts from smallest to largest"],
                ["Kategoriye göre alfabetik sıralar", "Sorts alphabetically by category"],
                ["Sıralamayı değiştirmez", "Doesn't change the ordering"],
              ],
              answer: 0,
              explain: [
                "`desc()` sarmalayıcısı olmadan `arrange()` küçükten büyüğe sıralar; `desc(toplam_ciro)` bu sırayı tersine çevirip en yüksek ciroyu en üste getirir.",
                "Without the `desc()` wrapper, `arrange()` sorts ascending; `desc(toplam_ciro)` reverses that, putting the highest revenue at the top.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: [
                "ggplot2 kodundaki `ggplot(...) + geom_col(...) + coord_flip() + ...` yapısında `+` işareti ne anlama gelir?",
                "In the ggplot2 code's `ggplot(...) + geom_col(...) + coord_flip() + ...` structure, what does `+` mean?",
              ],
              options: [
                ["Grafiğe yeni bir katman eklemek", "Adding a new layer to the chart"],
                ["Matematiksel toplama yapmak", "Doing mathematical addition"],
                ["Yorum satırı başlatmak", "Starting a comment"],
                ["İki veri çerçevesini birleştirmek", "Merging two data frames"],
              ],
              answer: 0,
              explain: [
                "Bu, katmanlı grafik dilbilgisinin kalbi: her `+` bir önceki katmanın üstüne yeni bir katman (geometri, etiket, tema) ekler; sıralama önemlidir.",
                "This is the heart of the grammar of graphics: each `+` stacks a new layer (geometry, label, theme) on top of the previous one; order matters.",
              ],
            }),
            tip(
              "reorder() alışkanlığı",
              "Get used to reorder()",
              "ggplot2 kategorileri varsayılan olarak alfabetik sıralar ve bu neredeyse hiçbir zaman istediğin şey değildir. `reorder(kategori, deger)` ile çubukları değere göre sırala — grafiğin okunabilirliğini tek fonksiyonla ikiye katlarsın.",
              "ggplot2 sorts categories alphabetically by default, which is almost never what you want. Use `reorder(category, value)` to sort bars by value — one function that doubles the readability of the chart.",
            ),
            quiz({
              id: "q9",
              q: [
                "ggplot2'de kategoriler `reorder()` kullanılmadığında varsayılan olarak nasıl sıralanır?",
                "How are categories sorted by default in ggplot2 when `reorder()` isn't used?",
              ],
              options: [
                ["Alfabetik olarak", "Alphabetically"],
                ["Değere göre büyükten küçüğe", "By value, largest to smallest"],
                ["Veri çerçevesindeki orijinal satır sırasına göre", "By the original row order in the data frame"],
                ["Rastgele", "Randomly"],
              ],
              answer: 0,
              explain: [
                "Tip bloğu bunu açıkça söylüyor: alfabetik sıralama neredeyse hiçbir zaman istenen sıralama değildir, bu yüzden `reorder(kategori, deger)` neredeyse her çubuk grafikte gereklidir.",
                "The tip states this directly: alphabetical order is almost never the order you want, which is why `reorder(category, value)` is needed in almost every bar chart.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Koddaki `summary(model)` çıktısında neler bulunur?",
                "What does the `summary(model)` output in the code contain?",
              ],
              options: [
                ["Katsayılar, p-değerleri ve R²", "Coefficients, p-values and R²"],
                ["Yalnızca bir grafik", "Only a chart"],
                ["Ham veri seti", "The raw dataset"],
                ["Yalnızca modelin adı", "Only the model's name"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum bunu doğruluyor: `summary(model)` bir doğrusal regresyonun temel çıktısını verir — her tahmin edicinin katsayısı, o katsayının anlamlılığı (p-değeri) ve modelin genel açıklayıcılığı (R²).",
                "The code's own comment confirms this: `summary(model)` gives the core output of a linear regression — each predictor's coefficient, its significance (p-value), and the model's overall explanatory power (R²).",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Koddaki `confint(model)` ne döndürür?",
                "What does `confint(model)` return in the code?",
              ],
              options: [
                ["Katsayıların güven aralıklarını", "The confidence intervals of the coefficients"],
                ["Modelin doğruluk oranını", "The model's accuracy rate"],
                ["Veri setinin satır sayısını", "The dataset's row count"],
                ["Bir grafik", "A chart"],
              ],
              answer: 0,
              explain: [
                "`confint`, \"confidence interval\"in kısaltmasıdır; her katsayının gerçek değerinin hangi aralıkta olabileceğini gösterir, yalnızca tek bir tahmini sayı değil.",
                "`confint` is short for \"confidence interval\"; it shows the range each coefficient's true value likely falls in, not just a single point estimate.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Koddaki `plot(model)` neden çağrılır?",
                "Why is `plot(model)` called in the code?",
              ],
              options: [
                ["Modelin varsayım kontrol grafiklerini görmek için", "To see the model's assumption-diagnostic plots"],
                ["Ham veriyi çizmek için", "To plot the raw data"],
                ["Modeli kaydetmek için", "To save the model"],
                ["Yeni bir değişken eklemek için", "To add a new variable"],
              ],
              answer: 0,
              explain: [
                "Kodun kendi yorumu bunu söylüyor: 'varsayım kontrol grafikleri'. `lm` nesnesinde `plot()` çağırmak, doğrusal regresyonun varsayımlarının (doğrusallık, sabit varyans vb.) ihlal edilip edilmediğini gösteren dört grafik üretir.",
                "The code's own comment says it: 'assumption-diagnostic plots'. Calling `plot()` on an `lm` object produces four charts showing whether linear regression's assumptions (linearity, constant variance, etc.) are violated.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Koddaki `glm(..., family = binomial)` ne tür bir model kurar?",
                "What kind of model does `glm(..., family = binomial)` build in the code?",
              ],
              options: [
                ["Lojistik regresyon (ikili sonuç modeli)", "Logistic regression (a binary-outcome model)"],
                ["Doğrusal regresyon", "Linear regression"],
                ["Zaman serisi modeli", "A time-series model"],
                ["Kümeleme (clustering) modeli", "A clustering model"],
              ],
              answer: 0,
              explain: [
                "`glm` fonksiyonu `family` argümanıyla farklı model türleri kurar; `binomial` ailesi, `ayrildi` gibi 0/1 (evet/hayır) sonuçlar için lojistik regresyonu seçer.",
                "The `glm` function builds different model types through its `family` argument; the `binomial` family selects logistic regression for 0/1 (yes/no) outcomes like `ayrildi` (churned).",
              ],
            }),
            text(
              "**R Markdown / Quarto**, R'ın en değerli özelliğidir: metin, kod ve çıktı tek dosyada yaşar. `Knit` dediğinde kod baştan çalışır ve HTML, PDF veya Word raporu üretir. Veri değiştiğinde raporu elle güncellemezsin — yeniden derlersin.",
              "**R Markdown / Quarto** is R's most valuable feature: prose, code and output live in one file. Hit `Knit` and the code re-runs, producing an HTML, PDF or Word report. When the data changes you do not edit the report — you rebuild it.",
            ),
            quiz({
              id: "q6",
              q: [
                "Metne göre R Markdown / Quarto'nun en değerli özelliği nedir?",
                "According to the text, what is R Markdown / Quarto's most valuable feature?",
              ],
              options: [
                ["Metin, kod ve çıktının tek dosyada yaşaması", "Prose, code and output living in one file"],
                ["Yalnızca grafik üretmesi", "Only producing charts"],
                ["Excel'e otomatik veri aktarması", "Automatically exporting data to Excel"],
                ["E-posta göndermesi", "Sending email"],
              ],
              answer: 0,
              explain: [
                "Metin bu özelliği R'ın 'en değerli özelliği' olarak adlandırıyor: açıklama, çalışan kod ve o kodun ürettiği çıktı hep aynı belgede bir arada durur.",
                "The text calls this R's 'most valuable feature': explanation, running code and the output that code produces all live together in the same document.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Veri değiştiğinde bir R Markdown raporuna metne göre ne yapılır?",
                "According to the text, what happens to an R Markdown report when the data changes?",
              ],
              options: [
                ["Elle düzenlenmez; `Knit` ile yeniden derlenir", "It isn't edited by hand; it's rebuilt with `Knit`"],
                ["Rapor elle güncellenir", "The report is updated by hand"],
                ["Yeni bir dosya baştan yazılır", "A brand-new file is written from scratch"],
                ["Hiçbir şey yapılmaz", "Nothing is done"],
              ],
              answer: 0,
              explain: [
                "Bu, R Markdown'ın asıl gücü: kod baştan çalıştığı için rapordaki her sayı ve grafik otomatik olarak güncel veriyi yansıtır, elle düzeltmeye gerek kalmaz.",
                "This is R Markdown's real power: since the code re-runs from the top, every number and chart in the report automatically reflects the current data — no manual fixing needed.",
              ],
            }),
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
              id: "q8",
              q: [
                "Koddaki YAML başlığında `date: \"\\`r Sys.Date()\\`\"` satırı ne yapar?",
                "What does the line `date: \"\\`r Sys.Date()\\`\"` do in the YAML header of the code?",
              ],
              options: [
                [
                  "Belge her derlendiğinde o günün tarihini otomatik yazar",
                  "It automatically writes the current date every time the document is rendered",
                ],
                ["Sabit bir tarih yazar, hiç değişmez", "It writes a fixed date that never changes"],
                ["Hata verir çünkü YAML içinde kod çalışmaz", "It errors, because code can't run inside YAML"],
                ["Yalnızca yılı yazar", "It writes only the year"],
              ],
              answer: 0,
              explain: [
                "Ters tırnak (`` ` ``) içine yazılan `r Sys.Date()`, R Markdown'ın metin içine gömülü kod sözdizimidir; YAML başlığında bile çalışır ve belge her `Knit` edildiğinde güncel tarihi üretir.",
                "The backtick-wrapped `r Sys.Date()` is R Markdown's inline-code syntax; it works even inside the YAML header and produces the current date every time the document is `Knit` again.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Koddaki `` `r format(sum(satislar$ciro), big.mark = \".\")` `` gibi metin içine gömülü bir R ifadesinin amacı nedir?",
                "What is the purpose of an inline R expression like `` `r format(sum(satislar$ciro), big.mark = \".\")` `` in the code?",
              ],
              options: [
                [
                  "Hesaplanan bir sayıyı cümlenin içine otomatik ve güncel olarak yerleştirmek",
                  "To place a computed number inside a sentence automatically and up to date",
                ],
                ["Yalnızca metni renklendirmek", "Only to colour the text"],
                ["Kod bloğunu gizlemek", "To hide the code chunk"],
                ["Grafiği büyütmek", "To enlarge the chart"],
              ],
              answer: 0,
              explain: [
                "Bu satır, 'Bu ay toplam ciro ... TL oldu' cümlesindeki rakamı elle yazmak yerine kodla üretir; veri değiştiğinde cümledeki sayı da otomatik değişir.",
                "This line generates the figure in 'Total revenue this month was ... TL' with code instead of typing it by hand; when the data changes, the number in the sentence changes automatically too.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Koddaki kod bloğu başlığındaki `echo=FALSE, warning=FALSE` seçenekleri ne işe yarar?",
                "What do the `echo=FALSE, warning=FALSE` options in the code chunk header do?",
              ],
              options: [
                [
                  "Kod satırlarını ve uyarı mesajlarını nihai belgede gizler, yalnızca çıktıyı gösterir",
                  "They hide the code lines and warning messages in the final document, showing only the output",
                ],
                ["Kodun çalışmasını engeller", "They prevent the code from running"],
                ["Grafiği tamamen kaldırır", "They remove the chart entirely"],
                ["Belgeyi otomatik PDF yapar", "They automatically turn the document into a PDF"],
              ],
              answer: 0,
              explain: [
                "`echo` kodun kendisinin görünüp görünmeyeceğini, `warning` ise paket yükleme gibi işlemlerden gelen uyarı mesajlarının belgeye sızıp sızmayacağını kontrol eder; ikisi de FALSE olunca okuyucu yalnızca sonucu (tabloyu) görür.",
                "`echo` controls whether the code itself is shown, `warning` whether warning messages from things like package loading leak into the document; with both FALSE the reader sees only the result (the table).",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Metne göre 'okuryazar programlama' (literate programming) nedir?",
                "According to the text, what is 'literate programming'?",
              ],
              options: [
                ["Kod ile açıklama metnini aynı belgede tutmak", "Keeping code and explanation in the same document"],
                ["Yalnızca yorum satırı yazmak", "Just writing comments"],
                ["Kodu başka bir dilde açıklamak", "Explaining code in another language"],
                ["Kod yazmadan rapor üretmek", "Producing a report without writing code"],
              ],
              answer: 0,
              explain: [
                "Metin bu terimi tam olarak bu şekilde tanımlıyor: R'ın 'en güçlü ama en az bilinen tarafı' olarak, kod ile açıklamanın aynı dosyada yaşaması.",
                "The text defines the term exactly this way: as R's 'strongest but least-known side', code and explanation living in the same file.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Quarto bir metin dosyasından neler üretebilir?",
                "What can Quarto produce from a single text file?",
              ],
              options: [
                ["PDF, Word, HTML, sunum veya web sitesi", "PDF, Word, HTML, a presentation or a website"],
                ["Yalnızca PDF", "Only PDF"],
                ["Yalnızca Excel dosyası", "Only an Excel file"],
                ["Yalnızca e-posta", "Only email"],
              ],
              answer: 0,
              explain: [
                "Metin bu beş çıktı türünü açıkça sayıyor — Quarto'nun 'çok formatlılığı' onu R Markdown'ın halefi yapan özelliklerden biridir.",
                "The text lists these five output types explicitly — this 'multi-format' nature is one of the features that makes Quarto the successor to R Markdown.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Quarto belgesindeki kod blokları metne göre ne olur?",
                "According to the text, what happens to the code blocks in a Quarto document?",
              ],
              options: [
                ["Çalıştırılır ve çıktıları belgeye gömülür", "They are executed and their output is embedded"],
                ["Yalnızca görüntülenir, çalıştırılmaz", "They are only displayed, never run"],
                ["Otomatik olarak silinir", "They are automatically deleted"],
                ["Yorum satırına dönüştürülür", "They are converted into comments"],
              ],
              answer: 0,
              explain: [
                "Bu, literate programming'in pratikteki karşılığı: kod gösterişlik bir örnek değil, gerçekten çalışan ve sonucunu belgeye basan canlı bir bileşendir.",
                "This is literate programming's practical payoff: the code isn't a decorative example, it's a live component that actually runs and prints its result into the document.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "Koddaki `satis <- read_csv(...) |> filter(ay == params$ay)` satırında `params$ay` neye erişir?",
                "In the code's `satis <- read_csv(...) |> filter(ay == params$ay)`, what does `params$ay` access?",
              ],
              options: [
                [
                  "YAML başlığındaki `params:` bölümünde tanımlanan `ay` değerine",
                  "The `ay` value defined in the `params:` section of the YAML header",
                ],
                ["Bugünün tarihine", "Today's date"],
                ["Veri dosyasının adına", "The name of the data file"],
                ["Rastgele bir aya", "A random month"],
              ],
              answer: 0,
              explain: [
                "YAML başlığındaki `params: ay: \"2024-08\"` bölümü belgeye bir değişken tanımlar; belge içinde bu değere her zaman `params$ay` şeklinde erişilir.",
                "The `params: ay: \"2024-08\"` section in the YAML header defines a variable for the document; inside the document that value is always accessed as `params$ay`.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Kod bloğu başlığındaki `#| echo: false` seçeneği ne yapar?",
                "What does the `#| echo: false` option in the code chunk header do?",
              ],
              options: [
                [
                  "Kodun kendisini nihai belgede gizler, yalnızca çıktıyı gösterir",
                  "Hides the code itself in the final document, showing only its output",
                ],
                ["Kodu çalıştırmaz", "Prevents the code from running"],
                ["Grafiği gizler", "Hides the chart"],
                ["Belgeyi doğrudan PDF'e çevirir", "Directly converts the document to PDF"],
              ],
              answer: 0,
              explain: [
                "İş raporlarında okuyucu genelde kodu değil sonucu (tabloyu, grafiği, sayıyı) görmek ister; `echo: false` kodu koşturur ama satırlarını belgeden gizler.",
                "In business reports the reader usually wants the result (table, chart, figure), not the code; `echo: false` still runs the code but hides its lines from the document.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Koddaki `` `r format(toplam, big.mark = \".\")` `` gibi metin içine gömülü bir ifadenin faydası nedir?",
                "What is the benefit of an inline expression like `` `r format(toplam, big.mark = \".\")` `` in the code?",
              ],
              options: [
                [
                  "Metindeki sayı, veri güncellendiğinde otomatik olarak güncellenir",
                  "The figure in the prose updates automatically whenever the data updates",
                ],
                ["Yalnızca sayıyı renklendirir", "It only colours the number"],
                ["Sayıyı yuvarlar ama güncellemez", "It rounds the number but never updates it"],
                ["Hiçbir işlevi yoktur, yalnızca süsleme amaçlıdır", "It has no function, purely decorative"],
              ],
              answer: 0,
              explain: [
                "Elle yazılan bir raporda bu sayı unutulup eski kalabilir; kodla üretildiğinde belge her yeniden derlendiğinde otomatik olarak günceli yansıtır.",
                "In a hand-written report this number can be forgotten and go stale; generated by code, it automatically reflects the current value every time the document is re-rendered.",
              ],
            }),
            tip(
              "Parametreli rapor",
              "Parameterised reports",
              "Yukarıdaki `params` bölümü belgeyi **şablona** dönüştürür. Tek bir döngüyle 12 ay veya 30 bayi için ayrı ayrı rapor üretebilirsin:\n\n```r\nfor (ay in aylar) {\n  quarto::quarto_render(\n    \"rapor.qmd\",\n    execute_params = list(ay = ay),\n    output_file = paste0(\"rapor_\", ay, \".pdf\")\n  )\n}\n```\n\nBu, elle yapıldığında günler süren bir işi dakikalara indirir ve her raporun tutarlı olmasını garanti eder — kopyala-yapıştır hatası kalmaz.",
              "The `params` block above turns the document into a **template**. One loop can produce a separate report for 12 months or 30 dealers:\n\n```r\nfor (m in months) {\n  quarto::quarto_render(\n    \"report.qmd\",\n    execute_params = list(month = m),\n    output_file = paste0(\"report_\", m, \".pdf\")\n  )\n}\n```\n\nThis turns days of manual work into minutes and guarantees every report is consistent — no copy-paste errors remain.",
            ),
            quiz({
              id: "q8",
              q: [
                "Tip bloğuna göre `params` bölümü bir Quarto belgesini neye dönüştürür?",
                "According to the tip, what does the `params` block turn a Quarto document into?",
              ],
              options: [
                [
                  "Bir şablona; farklı ay veya bayi gibi girdilerle yeniden çalıştırılabilir",
                  "A template; it can be re-run with different inputs like month or dealer",
                ],
                ["Statik bir resme", "A static image"],
                ["Bir veritabanına", "A database"],
                ["Yalnızca bir başlık sayfasına", "Just a title page"],
              ],
              answer: 0,
              explain: [
                "Tip bunu açıkça 'şablon' olarak adlandırıyor: aynı `.qmd` dosyası, `execute_params` ile farklı bir `ay` değeri geçirilerek defalarca çalıştırılabilir.",
                "The tip explicitly calls this a 'template': the same `.qmd` file can be run over and over by passing a different `ay` value through `execute_params`.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bir döngüyle 12 ay için ayrı rapor üretmenin tip bloğuna göre faydası nedir?",
                "According to the tip, what's the benefit of looping to produce a separate report for 12 months?",
              ],
              options: [
                [
                  "Elle günler süren işi dakikalara indirir ve her raporun tutarlı olmasını garanti eder",
                  "It turns days of manual work into minutes and guarantees every report is consistent",
                ],
                ["Yalnızca raporları güzelleştirir", "It only makes the reports look nicer"],
                ["Dosya boyutunu küçültür", "It reduces file size"],
                ["İnternet bağlantısı gerektirmez hâle getirir", "It removes the need for an internet connection"],
              ],
              answer: 0,
              explain: [
                "Bu iki fayda tip bloğunda ayrı ayrı vurgulanıyor: hız kazancı (günler → dakikalar) ve tutarlılık garantisi (kopyala-yapıştır hatası kalmaz).",
                "Both benefits are called out separately in the tip: the speed gain (days to minutes) and the consistency guarantee (no copy-paste errors).",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "`quarto::quarto_render(\"rapor.qmd\", execute_params = list(ay = ay), ...)` çağrısında `execute_params` argümanının amacı nedir?",
                "In `quarto::quarto_render(\"report.qmd\", execute_params = list(month = m), ...)`, what is the purpose of the `execute_params` argument?",
              ],
              options: [
                [
                  "Her çalıştırmada belgeye farklı bir parametre değeri geçirmek",
                  "To pass a different parameter value into the document on each run",
                ],
                ["Belgeyi silmek", "To delete the document"],
                ["Belgeyi otomatik e-posta ile göndermek", "To automatically email the document"],
                ["Grafiği güncellemeden bırakmak", "To leave the chart unupdated"],
              ],
              answer: 0,
              explain: [
                "Bu argüman, döngünün her adımında belgenin `params` bölümündeki değeri değiştirerek aynı şablondan farklı bir raporun üretilmesini sağlar.",
                "This argument overrides the document's `params` value on each loop iteration, letting the same template produce a different report each time.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Shiny ile uygulama yazmak için metne göre hangi bilgiye gerek yoktur?",
                "According to the text, what knowledge is not needed to build a Shiny app?",
              ],
              options: [
                ["HTML, CSS veya JavaScript bilgisine", "HTML, CSS or JavaScript knowledge"],
                ["R programlama bilgisine", "R programming knowledge"],
                ["Veri analizi bilgisine", "Data analysis knowledge"],
                ["İstatistik bilgisine", "Statistics knowledge"],
              ],
              answer: 0,
              explain: [
                "Metin bunu Shiny'nin en büyük vaadi olarak sunuyor: R kodundan tarayıcı uygulaması üretebilirsin, ayrıca web teknolojileri öğrenmene gerek kalmaz.",
                "The text presents this as Shiny's biggest promise: you can produce a browser app from R code without also learning web technologies.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir Shiny uygulamasının metne göre iki temel parçası nedir?",
                "According to the text, what are the two core parts of a Shiny app?",
              ],
              options: [
                ["UI (arayüz) ve Server (sunucu)", "UI and Server"],
                ["Frontend ve Database", "Frontend and Database"],
                ["Client ve API", "Client and API"],
                ["HTML ve CSS", "HTML and CSS"],
              ],
              answer: 0,
              explain: [
                "Metin bu ayrımı net çiziyor: UI kullanıcının gördüğü kontroller ve çıktı alanlarıdır, Server ise girdilerden çıktı üreten hesaplama mantığıdır.",
                "The text draws this split clearly: the UI is the controls and output areas the user sees, the Server is the logic computing outputs from inputs.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "UI (arayüz) hangi bileşenleri içerir?",
                "What does the UI contain?",
              ],
              options: [
                ["Kullanıcının gördüğü kontroller ve çıktı alanları", "The controls and output areas the user sees"],
                ["Sunucu tarafı hesaplama mantığı", "Server-side computation logic"],
                ["Veritabanı bağlantı ayarları", "Database connection settings"],
                ["Model eğitim kodu", "Model-training code"],
              ],
              answer: 0,
              explain: [
                "Hesaplama mantığı Server'da yaşar; UI yalnızca kullanıcının etkileşime girdiği ve sonucu gördüğü kısımdır.",
                "The computation logic lives in the Server; the UI is only the part the user interacts with and sees the result in.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Metne göre 'tepkisellik' (reactivity) ne anlama gelir?",
                "According to the text, what does 'reactivity' mean?",
              ],
              options: [
                [
                  "Kullanıcı bir kontrolü değiştirdiğinde ona bağlı çıktıların kendiliğinden yeniden hesaplanması",
                  "Everything depending on a control the user changes recomputes by itself",
                ],
                ["Sayfanın her birkaç saniyede bir yeniden yüklenmesi", "The page reloading every few seconds"],
                ["Verinin otomatik olarak kaydedilmesi", "The data being saved automatically"],
                ["Uygulamanın hata verince kapanması", "The app closing when it errors"],
              ],
              answer: 0,
              explain: [
                "Metin bunu UI ile Server arasındaki 'bağ' olarak tanımlıyor: hangi çıktının ne zaman güncelleneceğini sen yazmazsın, Shiny bağımlılıkları izleyip kendisi karar verir.",
                "The text defines this as the 'link' between UI and Server: you never specify which output updates when; Shiny tracks the dependencies and decides for itself.",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "Örnek uygulamada `selectInput(\"sehir\", ...)` ile seçilen değere sunucu (server) tarafında nasıl erişilir?",
                "In the example app, how is the value chosen with `selectInput(\"sehir\", ...)` accessed on the server side?",
              ],
              options: [
                ["`input$sehir` ile", "Via `input$sehir`"],
                ["`output$sehir` ile", "Via `output$sehir`"],
                ["`sehir()` fonksiyonuyla", "Via a `sehir()` function"],
                ["`selectInput$sehir` ile", "Via `selectInput$sehir`"],
              ],
              answer: 0,
              explain: [
                "UI'daki her girdi kontrolü `input` listesine, kimliği (\"sehir\") ile eklenir; server fonksiyonu bu değere `input$sehir` şeklinde erişir, tıpkı örnekteki `reactive({ satis |> filter(sehir == input$sehir) })` satırında olduğu gibi.",
                "Every UI input control is added to the `input` list under its id (\"sehir\"); the server function reads it as `input$sehir`, exactly as in the example's `reactive({ satis |> filter(sehir == input$sehir) })` line.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Koddaki `output$grafik <- renderPlot({...})` satırının amacı nedir?",
                "What is the purpose of `output$grafik <- renderPlot({...})` in the code?",
              ],
              options: [
                [
                  "UI'daki `plotOutput(\"grafik\")` alanına gösterilecek grafiği üretmek",
                  "To produce the chart that gets shown in the UI's `plotOutput(\"grafik\")` area",
                ],
                ["Grafiği diske kaydetmek", "To save the chart to disk"],
                ["Veriyi filtrelemek", "To filter the data"],
                ["Sunucuyu başlatmak", "To start the server"],
              ],
              answer: 0,
              explain: [
                "`output$grafik` ile `plotOutput(\"grafik\")` aynı kimlikle eşleşir; `renderPlot()` içindeki kod, kullanıcı bir girdi değiştirdiğinde otomatik yeniden çalışıp o alana yeni bir grafik basar.",
                "`output$grafik` matches `plotOutput(\"grafik\")` by the same id; the code inside `renderPlot()` re-runs automatically when an input changes and draws a fresh chart into that area.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Örnekte hem `output$grafik` hem `output$ozet`, `satis |> filter(...)` yerine neden `veri()` (reactive ifadesi) çağırıyor?",
                "In the example, why do both `output$grafik` and `output$ozet` call `veri()` (the reactive expression) instead of `satis |> filter(...)` directly?",
              ],
              options: [
                [
                  "Filtreleme bir kez hesaplanıp iki çıktı arasında paylaşılsın diye",
                  "So the filtering is computed once and shared between the two outputs",
                ],
                ["Kod daha kısa görünsün diye", "Just to make the code look shorter"],
                ["R'da başka türlü yazmak mümkün değil", "There's no other way to write it in R"],
                ["Hata önlemek için R'ın zorunlu tuttuğu bir kural", "It's a rule R enforces to prevent errors"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum bunu açıkça söylüyor: 'Süzülmüş veri bir kez hesaplanır, iki çıktı da onu kullanır.' Bu, mevcut derste zaten var olan q1 sorusunun temelidir — `reactive()` gereksiz tekrar hesaplamayı önler.",
                "The code's own comment says it plainly: 'The filtered data is computed once, both outputs use it.' This is the foundation of the lesson's existing q1 question — `reactive()` avoids redundant recomputation.",
              ],
            }),
            info(
              "Shiny ne zaman doğru araç?",
              "When is Shiny the right tool?",
              "**Shiny'nin güçlü olduğu yer:** Power BI veya Tableau'nun yapamadığı şeyler. Kullanıcının parametre girip **model çalıştırdığı**, senaryo simülasyonu yaptığı, istatistiksel bir hesabı etkileşimli keşfettiği araçlar. \"Faiz oranı %2 artarsa portföy ne olur?\" gibi.\n\n**Shiny'nin yanlış tercih olduğu yer:** standart bir satış panosu. Bunu Power BI veya Tableau daha hızlı, daha ucuz ve bakımı daha kolay şekilde yapar.\n\nBasit kural: **rapor gösteriyorsan BI aracı, hesap yaptırıyorsan Shiny.**",
              "**Where Shiny is strong:** things Power BI or Tableau cannot do. Tools where the user enters parameters and **runs a model**, simulates scenarios, or explores a statistical calculation interactively. \"What happens to the portfolio if rates rise 2%?\"\n\n**Where Shiny is the wrong choice:** a standard sales dashboard. Power BI or Tableau will do that faster, cheaper and with less maintenance.\n\nA simple rule: **if you are showing a report, use a BI tool; if you are running a calculation, use Shiny.**",
            ),
            quiz({
              id: "q9",
              q: [
                "Info bloğuna göre standart bir satış panosu için hangi araç daha uygundur?",
                "According to the info block, which tool is more suitable for a standard sales dashboard?",
              ],
              options: [
                ["Power BI veya Tableau", "Power BI or Tableau"],
                ["Shiny", "Shiny"],
                ["Excel makroları", "Excel macros"],
                ["Hiçbiri gerekmez", "None is needed"],
              ],
              answer: 0,
              explain: [
                "Metin bunu Shiny'nin 'yanlış tercih olduğu yer' olarak işaretliyor: standart bir raporlama işini Power BI veya Tableau daha hızlı, daha ucuz ve daha az bakımla yapar.",
                "The text flags this as the case 'where Shiny is the wrong choice': standard reporting work is done faster, cheaper and with less maintenance by Power BI or Tableau.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Info bloğundaki basit kurala göre ne zaman Shiny kullanılmalı?",
                "According to the simple rule in the info block, when should Shiny be used?",
              ],
              options: [
                [
                  "Hesap/model yaptırıyorsan Shiny; rapor gösteriyorsan BI aracı",
                  "If you're running a calculation/model use Shiny; if you're showing a report use a BI tool",
                ],
                ["Her zaman Shiny kullanılmalı", "Shiny should always be used"],
                ["Her zaman BI aracı kullanılmalı", "A BI tool should always be used"],
                ["Veri az ise Shiny, çok ise BI aracı", "Shiny if the data is small, a BI tool if it's large"],
              ],
              answer: 0,
              explain: [
                "Bu, metnin kapanış kuralı: ayrım veri miktarına değil, kullanıcının etkileşimle bir hesap mı çalıştırdığına yoksa yalnızca bir sonucu mu izlediğine dayanır.",
                "This is the text's closing rule: the split isn't about data volume, it's about whether the user is interactively running a calculation or just viewing a result.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Metne göre ne zaman paket yazma zamanı gelmiştir?",
                "According to the text, when is it time to write a package?",
              ],
              options: [
                [
                  "Aynı yardımcı fonksiyonu üçüncü kez başka bir projeye kopyaladığında",
                  "When you copy the same helper function into another project for the third time",
                ],
                ["İlk fonksiyonu yazdığında", "The moment you write your first function"],
                ["Proje tamamen bittiğinde", "Once the project is completely finished"],
                ["Metne göre hiçbir zaman gerekmez", "According to the text, it's never necessary"],
              ],
              answer: 0,
              explain: [
                "Metin bu eşiği açıkça 'üçüncü kez' olarak koyuyor: bir kere kopyalamak tesadüf, iki kere alışkanlık, üç kere ise paketlemeyi hak eden bir kalıptır.",
                "The text sets this threshold explicitly at 'the third time': copying once is a coincidence, twice a habit, three times a pattern that earns being packaged.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Koddaki `usethis::use_r(\"temizle\")` komutu ne yapar?",
                "What does `usethis::use_r(\"temizle\")` do in the code?",
              ],
              options: [
                ["`R/temizle.R` adında bir dosya oluşturur", "It creates a file named `R/temizle.R`"],
                ["Fonksiyonu hemen çalıştırır", "It immediately runs the function"],
                ["Var olan bir testi siler", "It deletes an existing test"],
                ["Paketi doğrudan CRAN'a yükler", "It uploads the package straight to CRAN"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum bunu doğruluyor: `use_r(\"temizle\")` paketin `R/` klasöründe fonksiyonun yazılacağı boş bir dosya iskeleti oluşturur.",
                "The code's own comment confirms this: `use_r(\"temizle\")` scaffolds an empty file in the package's `R/` folder for the function to be written into.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Koddaki `usethis::use_test(\"temizle\")` ne oluşturur?",
                "What does `usethis::use_test(\"temizle\")` create in the code?",
              ],
              options: [
                ["Eşleşen bir test dosyası", "A matching test file"],
                ["Yalnızca bir belge dosyası", "Just a documentation file"],
                ["Yeni bir paket", "A brand-new package"],
                ["Bir lisans dosyası", "A license file"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum bunu açıkça söylüyor: 'eşleşen test dosyası'. `use_r()` ile `use_test()` genelde birlikte çağrılır — her fonksiyonun bir testi olsun diye.",
                "The code's comment says it plainly: 'a matching test file'. `use_r()` and `use_test()` are typically called together so every function gets a test.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Koddaki `devtools::document()` fonksiyonu ne üretir?",
                "What does `devtools::document()` produce in the code?",
              ],
              options: [
                ["Belgeleri, roxygen yorumlarından", "The documentation, from roxygen comments"],
                ["Testleri çalıştırıp sonucu raporlar", "It runs the tests and reports the result"],
                ["Paketi CRAN'a gönderir", "It submits the package to CRAN"],
                ["Kodu siler", "It deletes the code"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum bunu doğruluyor: 'belgeleri üretir'. `document()`, fonksiyonların üstündeki `#'` yorumlarını okuyup `man/` klasöründeki yardım sayfalarını otomatik üretir.",
                "The code's comment confirms this: 'generates the documentation'. `document()` reads the `#'` comments above functions and auto-generates the help pages in `man/`.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Koddaki `devtools::check()` ne işe yarar?",
                "What does `devtools::check()` do in the code?",
              ],
              options: [
                [
                  "Paketteki her şeyi (testler, belgeler, bağımlılıklar) kapsamlıca denetler",
                  "It thoroughly checks everything in the package (tests, documentation, dependencies)",
                ],
                ["Paketi yayınlar", "It publishes the package"],
                ["Yalnızca sözdizimini kontrol eder", "It only checks syntax"],
                ["Kodu otomatik biçimlendirir", "It automatically formats the code"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum bunu 'her şeyi denetler' diye özetliyor; `check()` CRAN'ın kendisinin de gönderilen paketlere uyguladığı denetimin aynısını yerelde çalıştırır.",
                "The code's comment sums it up as 'checks everything'; `check()` runs locally the same set of checks CRAN itself applies to submitted packages.",
              ],
            }),
            text(
              "**Bir paketin anatomisi:**\n\n- **`R/`** — Fonksiyonlar\n- **`man/`** — Belgeler (roxygen yorumlarından **otomatik** üretilir, elle yazılmaz)\n- **`tests/`** — `testthat` ile birim testleri\n- **`DESCRIPTION`** — Ad, sürüm, yazar, bağımlılıklar\n- **`NAMESPACE`** — Dışa açılan fonksiyonlar (otomatik üretilir)\n- **`vignettes/`** — Uzun kullanım rehberleri\n\nBelgeleme, fonksiyonun hemen üstüne yazılan yorumlarla yapılır:\n\n```r\n#' Türkçe biçimli sayıyı numeriğe çevirir\n#'\n#' @param x Karakter vektörü, \"1.899,50\" biçiminde\n#' @return Numerik vektör\n#' @examples\n#' tr_sayi(\"1.899,50\")\n#' @export\ntr_sayi <- function(x) {\n  as.numeric(gsub(\",\", \".\", gsub(\"\\\\.\", \"\", x)))\n}\n```\n\nEkip içi paketi paylaşmak için CRAN'a göndermene gerek yok: şirket Git deposundan `devtools::install_github(\"sirket/veriaraclari\")` ile kurulur.",
              "**The anatomy of a package:**\n\n- **`R/`** — the functions\n- **`man/`** — documentation (**generated** from roxygen comments, never hand-written)\n- **`tests/`** — unit tests with `testthat`\n- **`DESCRIPTION`** — name, version, author, dependencies\n- **`NAMESPACE`** — exported functions (generated)\n- **`vignettes/`** — longer usage guides\n\nDocumentation is written as comments directly above the function:\n\n```r\n#' Convert a Turkish-formatted number to numeric\n#'\n#' @param x Character vector in the form \"1.899,50\"\n#' @return A numeric vector\n#' @examples\n#' tr_number(\"1.899,50\")\n#' @export\ntr_number <- function(x) {\n  as.numeric(gsub(\",\", \".\", gsub(\"\\\\.\", \"\", x)))\n}\n```\n\nYou need not publish to CRAN to share an internal package: it installs from your company Git with `devtools::install_github(\"company/datatools\")`.",
            ),
            quiz({
              id: "q7",
              q: [
                "Metne göre `man/` klasöründeki belgeler nasıl üretilir?",
                "According to the text, how are the documents in the `man/` folder produced?",
              ],
              options: [
                [
                  "Roxygen yorumlarından otomatik üretilir, elle yazılmaz",
                  "Generated automatically from roxygen comments, never hand-written",
                ],
                ["Elle yazılır", "Written by hand"],
                ["İnternetten indirilir", "Downloaded from the internet"],
                ["Testlerden otomatik üretilir", "Generated automatically from the tests"],
              ],
              answer: 0,
              explain: [
                "Metin bunu parantez içinde vurguluyor: 'otomatik üretilir, elle yazılmaz'. Kaynak, fonksiyonun hemen üstüne yazılan `#'` yorumlarıdır; `devtools::document()` bunları okuyup `man/` sayfalarını üretir.",
                "The text stresses this in parentheses: 'generated, never hand-written'. The source is the `#'` comments written directly above the function; `devtools::document()` reads them to produce the `man/` pages.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`DESCRIPTION` dosyası metne göre neyi içerir?",
                "According to the text, what does the `DESCRIPTION` file contain?",
              ],
              options: [
                ["Ad, sürüm, yazar ve bağımlılıklar", "Name, version, author and dependencies"],
                ["Yalnızca fonksiyon kodu", "Only the function code"],
                ["Yalnızca testler", "Only the tests"],
                ["Grafik tema ayarları", "Chart theme settings"],
              ],
              answer: 0,
              explain: [
                "Anatomi listesinde `DESCRIPTION` açıkça bu dört bilgiyle tanımlanıyor; bir paketin 'kimlik kartı' gibi düşünülebilir.",
                "In the anatomy list `DESCRIPTION` is defined explicitly by these four pieces of information; think of it as the package's 'ID card'.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`NAMESPACE` dosyası metne göre ne belirtir?",
                "According to the text, what does the `NAMESPACE` file specify?",
              ],
              options: [
                ["Dışa açılan (export edilen) fonksiyonları", "The exported functions"],
                ["Paketin sürüm numarasını", "The package's version number"],
                ["Test sonuçlarını", "The test results"],
                ["Yazarın iletişim bilgilerini", "The author's contact details"],
              ],
              answer: 0,
              explain: [
                "Anatomi listesi bunu 'dışa açılan fonksiyonlar (otomatik üretilir)' diye tanımlıyor; roxygen'deki `@export` etiketi, fonksiyonun bu dosyaya eklenmesini sağlar.",
                "The anatomy list defines it as 'exported functions (generated)'; the `@export` tag in roxygen is what gets a function added to this file.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Şirket içi bir paketi ekip arkadaşlarınla paylaşmak için metne göre CRAN'a göndermene gerek var mı?",
                "According to the text, do you need to publish an internal package to CRAN to share it with teammates?",
              ],
              options: [
                [
                  "Hayır; şirket Git deposundan `devtools::install_github()` ile kurulabilir",
                  "No; it can be installed from your company Git with `devtools::install_github()`",
                ],
                ["Evet, mutlaka CRAN'a göndermek gerekir", "Yes, it must be submitted to CRAN"],
                ["Yalnızca e-posta ile paylaşılabilir", "It can only be shared by email"],
                ["Şirket içi paket paylaşımı mümkün değildir", "Sharing an internal package isn't possible at all"],
              ],
              answer: 0,
              explain: [
                "Metin son cümlede bunu açıkça çürütüyor: CRAN yalnızca herkese açık paketler için gereklidir; ekip içi paylaşım için Git deposu yeterlidir.",
                "The text's closing sentence rules this out explicitly: CRAN is only needed for public packages; a Git repo is enough for internal sharing.",
              ],
            }),
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
