import { info, pitfall, tip } from "@/content/helpers";
import { howTo, step } from "./helpers";

/** Power BI, Tableau ve Excel senaryoları. */
export const biHowTos = [
  howTo({
    slug: "power-bide-yoy-nasil-hesaplanir",
    title: [
      "Power BI'da yıllık büyüme (YoY) nasıl hesaplanır?",
      "How do you calculate year-over-year growth in Power BI?",
    ],
    summary: [
      "Takvim tablosu kur, SAMEPERIODLASTYEAR ile geçen yılı getir, DIVIDE ile oranı al.",
      "Set up a date table, fetch last year with SAMEPERIODLASTYEAR, then take the ratio with DIVIDE.",
    ],
    tool: "power-bi",
    trackSlug: "power-bi",
    minutes: 8,
    updated: "2026-08-04",
    answer: {
      body: [
        "Üç ölçü: temel ciro, geçen yılın cirosu ve ikisinin oranı. Şartı, modelde **tarih tablosu olarak işaretlenmiş** kesintisiz bir takvim tablosunun bulunması.",
        "Three measures: base revenue, last year's revenue, and the ratio between them. The prerequisite is a continuous calendar table **marked as a date table** in the model.",
      ],
      code: "Ciro = SUM(Satis[Tutar])\n\nCiro GY =\nCALCULATE([Ciro]; SAMEPERIODLASTYEAR('Takvim'[Tarih]))\n\nYoY % =\nVAR BuYil = [Ciro]\nVAR GecenYil = [Ciro GY]\nRETURN DIVIDE(BuYil - GecenYil; GecenYil)",
      lang: "dax",
    },
    steps: [
      step({
        title: ["Takvim tablosunu kur", "Build the date table"],
        body: [
          "Zaman zekâsı fonksiyonları kesintisiz bir tarih sütunu ister. Tarihleri satış tablosundan kullanmaya çalışırsan satış olmayan günler seride boşluk açar ve sonuç sessizce yanlış çıkar.",
          "Time intelligence needs an unbroken date column. Using the dates from the sales table leaves holes on days with no sales, and the result comes out silently wrong.",
        ],
        code: "Takvim =\nADDCOLUMNS(\n    CALENDARAUTO();\n    \"Yıl\";    YEAR([Date]);\n    \"Ay No\";  MONTH([Date]);\n    \"Ay\";     FORMAT([Date]; \"MMMM\")\n)",
        lang: "dax",
      }),
      step({
        title: ["Tarih tablosu olarak işaretle", "Mark it as a date table"],
        body: [
          "Tablo görünümünde takvimi seç → **Tarih tablosu olarak işaretle** → tarih sütununu göster. Bu adım atlanırsa `SAMEPERIODLASTYEAR` boş döner ve sebebi görünmez.",
          "In table view select the calendar → **Mark as date table** → point at the date column. Skip this and `SAMEPERIODLASTYEAR` returns blank with no visible reason.",
        ],
      }),
      step({
        title: ["İlişkiyi kur", "Create the relationship"],
        body: [
          "Takvim[Tarih] → Satis[Tarih] yönünde bire-çok ilişki. İlişki tek yönlü olmalı; çift yönlü filtreleme burada gereksiz ve risklidir.",
          "A one-to-many relationship from Calendar[Date] to Sales[Date]. Keep it single-directional; bidirectional filtering is unnecessary and risky here.",
        ],
      }),
      step({
        title: ["Ölçüleri yaz", "Write the measures"],
        body: [
          "Temel ölçüyü bir kez yaz, diğerlerini onun üstüne kur. Böylece ciro tanımı değiştiğinde tek bir yeri düzeltirsin.",
          "Write the base measure once and build the others on top. When the definition of revenue changes you fix a single place.",
        ],
        code: "Ciro GY = CALCULATE([Ciro]; SAMEPERIODLASTYEAR('Takvim'[Tarih]))\nYoY Fark = [Ciro] - [Ciro GY]\nYoY % = DIVIDE([YoY Fark]; [Ciro GY])",
        lang: "dax",
      }),
      step({
        title: ["Yüzde olarak biçimlendir", "Format as a percentage"],
        body: [
          "Ölçüyü seçip biçimi **Yüzde** yap, ondalık basamağı 1'de bırak. Görselde `0,183` yerine `%18,3` görünür.",
          "Select the measure and set the format to **Percentage** with one decimal. The visual then shows `18.3%` instead of `0.183`.",
        ],
      }),
    ],
    blocks: [
      pitfall(
        "YoY boş çıkıyorsa",
        "If YoY comes back blank",
        "Sırayla kontrol et: (1) takvim tablosu tarih tablosu olarak işaretli mi, (2) tam yılları kapsıyor mu — 2023 Mart'ta başlayan bir takvim 2024 Şubat için karşılık bulamaz, (3) ölçüde satış tablosunun tarihi mi kullanılıyor? Zaman zekâsı **takvim** tablosunun sütununu ister.",
        "Check in order: (1) is the calendar marked as a date table, (2) does it cover whole years — a calendar starting in March 2023 has no match for February 2024, (3) is the measure using the sales table's date? Time intelligence needs the **calendar's** column.",
      ),
      info(
        "SAMEPERIODLASTYEAR yerine DATEADD",
        "DATEADD instead of SAMEPERIODLASTYEAR",
        "İkisi de aynı işi yapar; `DATEADD('Takvim'[Tarih]; -1; YEAR)` daha genel olduğu için aylık (`MONTH`) ve çeyreklik (`QUARTER`) karşılaştırmalara da uyar. Tek bir ölçü kalıbı öğrenmek istiyorsan `DATEADD` seç.",
        "Both do the same job; `DATEADD('Calendar'[Date], -1, YEAR)` is more general and also covers monthly (`MONTH`) and quarterly (`QUARTER`) comparisons. Learn `DATEADD` if you want one pattern for all of them.",
      ),
    ],
    faq: [
      {
        q: ["Mali yılım Aralık'ta bitmiyor.", "My fiscal year doesn't end in December."],
        a: [
          "`TOTALYTD` ve `DATESYTD` üçüncü argüman olarak yıl sonunu alır: `TOTALYTD([Ciro]; 'Takvim'[Tarih]; \"31/03\")`. Takvim tablosuna mali yıl ve mali çeyrek sütunları eklemek de görselleri kolaylaştırır.",
          "`TOTALYTD` and `DATESYTD` take the year end as a third argument: `TOTALYTD([Revenue], 'Calendar'[Date], \"31/03\")`. Adding fiscal year and quarter columns to the calendar also simplifies your visuals.",
        ],
      },
      {
        q: ["Geçen yıl veri yoksa %100 büyüme mi göstermeli?", "Should it show 100% growth when there's no prior year?"],
        a: [
          "Hayır — bölen sıfır ya da boşken oran tanımsızdır. `DIVIDE` bunu kendisi boş bırakır; üçüncü argümana `0` yazarsan gerçekte olmayan bir büyümeyi rapora sokarsın.",
          "No — the ratio is undefined when the denominator is zero or blank. `DIVIDE` leaves it blank on its own; passing `0` as the third argument invents growth that never happened.",
        ],
      },
    ],
    related: ["power-bide-takvim-tablosu-nasil-olusturulur", "sqlde-aylik-buyume-nasil-hesaplanir"],
    keywords: ["yoy", "yıllık büyüme", "dax", "sameperiodlastyear", "power bi", "büyüme oranı"],
  }),

  howTo({
    slug: "power-bide-takvim-tablosu-nasil-olusturulur",
    title: [
      "Power BI'da takvim tablosu nasıl oluşturulur?",
      "How do you create a date table in Power BI?",
    ],
    summary: [
      "CALENDAR ile üret, sütunları ekle, tarih tablosu olarak işaretle, ay sıralamasını bağla.",
      "Generate it with CALENDAR, add columns, mark it as a date table, then fix the month sort.",
    ],
    tool: "power-bi",
    trackSlug: "power-bi",
    minutes: 6,
    updated: "2026-08-04",
    answer: {
      body: [
        "Tek bir DAX tablosu yeter. `CALENDAR` ile aralığı üret, `ADDCOLUMNS` ile yıl/ay/çeyrek sütunlarını ekle, sonra modelde tarih tablosu olarak işaretle.",
        "One DAX table is enough. Generate the range with `CALENDAR`, add year/month/quarter columns with `ADDCOLUMNS`, then mark it as a date table in the model.",
      ],
      code: "Takvim =\nADDCOLUMNS(\n    CALENDAR(DATE(2022;1;1); DATE(2026;12;31));\n    \"Yıl\";      YEAR([Date]);\n    \"Ay No\";    MONTH([Date]);\n    \"Ay\";       FORMAT([Date]; \"MMMM\");\n    \"Çeyrek\";   \"Ç\" & QUARTER([Date]);\n    \"Yıl-Ay\";   FORMAT([Date]; \"yyyy-MM\")\n)",
      lang: "dax",
    },
    steps: [
      step({
        title: ["Aralığı belirle", "Choose the range"],
        body: [
          "Veri hangi yıllarda? `CALENDARAUTO()` modeldeki tüm tarihleri tarayıp aralığı kendisi bulur; sabit tarih vermek ise geleceğe dönük planlama tablolarında daha güvenlidir. **Her iki durumda da tam yıllar** olmalı.",
          "Which years does the data cover? `CALENDARAUTO()` scans every date in the model and picks the range; fixed dates are safer for forward-looking planning tables. Either way it must span **whole years**.",
        ],
      }),
      step({
        title: ["Sütunları ekle", "Add the columns"],
        body: [
          "Görsellerde kullanacağın her kırılım bir sütun olmalı: yıl, çeyrek, ay adı, ay numarası, hafta. Ay adını `FORMAT` ile üretmek yerelleştirmeyi de halleder.",
          "Every breakdown you'll use in a visual needs a column: year, quarter, month name, month number, week. Producing the month name with `FORMAT` also handles localisation.",
        ],
      }),
      step({
        title: ["Tarih tablosu olarak işaretle", "Mark as date table"],
        body: [
          "Tablo görünümü → tabloyu seç → **Tarih tablosu olarak işaretle** → `Date` sütununu göster. Zaman zekâsı fonksiyonlarının çalışması bu adıma bağlıdır.",
          "Table view → select the table → **Mark as date table** → point at the `Date` column. Time intelligence depends on this step.",
        ],
      }),
      step({
        title: ["Ay sıralamasını düzelt", "Fix the month sort"],
        body: [
          "Ay adı sütununu seç → **Sütuna göre sırala** → Ay No. Bu yapılmazsa görselde aylar alfabetik dizilir: Ağustos, Aralık, Ekim…",
          "Select the month-name column → **Sort by column** → Month No. Without it, visuals order months alphabetically: April, August, December…",
        ],
      }),
    ],
    blocks: [
      tip(
        "Bir model, bir takvim",
        "One model, one calendar",
        "Birden fazla tarih sütunu varsa (sipariş tarihi, teslim tarihi) ikinci bir takvim tablosu oluşturmak yerine tek takvimi kullan ve ikinci ilişkiyi pasif bırakıp `USERELATIONSHIP` ile ölçü içinde aç.",
        "With several date columns (order date, delivery date), keep one calendar rather than adding a second: leave the extra relationship inactive and switch it on inside a measure with `USERELATIONSHIP`.",
      ),
    ],
    related: ["power-bide-yoy-nasil-hesaplanir", "excel-tablosunu-uzun-bicime-cevirme"],
    keywords: ["takvim tablosu", "date table", "calendar", "dax", "zaman zekası", "mark as date"],
  }),

  howTo({
    slug: "excelde-dusey-ara-yok-hatasi",
    title: [
      "Excel'de DÜŞEYARA neden #YOK veriyor?",
      "Why does VLOOKUP return #N/A in Excel?",
    ],
    summary: [
      "Beş yaygın sebep: boşluk, tür uyuşmazlığı, yanlış son argüman, kayan aralık, aranan değerin ilk sütunda olmaması.",
      "Five usual causes: stray spaces, type mismatch, the wrong last argument, a shifting range, and the lookup value not being in the first column.",
    ],
    tool: "excel",
    trackSlug: "excel",
    minutes: 6,
    updated: "2026-08-04",
    answer: {
      body: [
        "Sırayla kontrol et: (1) `KIRP` ile boşlukları temizle, (2) bir taraf metin bir taraf sayı mı, (3) son argüman `YANLIŞ` mı, (4) tablo aralığı `$` ile sabitlenmiş mi, (5) aranan değer tablonun **ilk** sütununda mı.",
        "Check in order: (1) clean spaces with `TRIM`, (2) is one side text and the other a number, (3) is the last argument `FALSE`, (4) is the range anchored with `$`, (5) is the lookup value in the **first** column of the range.",
      ],
      code: "=EĞERHATA(DÜŞEYARA(KIRP(A2); $F$2:$H$500; 3; YANLIŞ); \"eşleşme yok\")\n=IFERROR(VLOOKUP(TRIM(A2), $F$2:$H$500, 3, FALSE), \"no match\")",
      lang: "excel",
    },
    steps: [
      step({
        title: ["Boşlukları temizle", "Clean the spaces"],
        body: [
          "Bir numaralı sebep budur. Sistemden dışa aktarılan metinlerde görünmeyen bir sondaki boşluk kalır ve `\"Ankara \"` ile `\"Ankara\"` eşleşmez. İki tarafı da `KIRP`'ten geçir.",
          "This is the number-one cause. Exported text keeps an invisible trailing space, and `\"Ankara \"` won't match `\"Ankara\"`. Run both sides through `TRIM`.",
        ],
        code: "=UZUNLUK(A2)   // görünen metinden uzunsa boşluk var\n=LEN(A2)",
        lang: "excel",
      }),
      step({
        title: ["Türleri karşılaştır", "Compare the types"],
        body: [
          "Metin olarak saklanan `\"1024\"` ile sayı olan `1024` eşleşmez. Hücre sola yaslıysa metin, sağa yaslıysa sayıdır. Sütunu seçip **Metni Sütunlara Dönüştür → Son** en hızlı düzeltmedir.",
          "Text `\"1024\"` won't match the number `1024`. Left-aligned cells are text, right-aligned are numbers. Selecting the column and running **Text to Columns → Finish** is the quickest fix.",
        ],
      }),
      step({
        title: ["Son argümanı YANLIŞ yap", "Set the last argument to FALSE"],
        body: [
          "Argüman verilmezse Excel `DOĞRU` varsayar ve **yaklaşık** eşleşme arar. Sıralı olmayan tabloda bu yanlış satır getirir ya da `#YOK` verir.",
          "With no argument Excel assumes `TRUE` and performs an **approximate** match, which returns the wrong row on unsorted data — or `#N/A`.",
        ],
        code: "=DÜŞEYARA(A2; $F$2:$H$500; 3; YANLIŞ)",
        lang: "excel",
      }),
      step({
        title: ["Aralığı sabitle", "Anchor the range"],
        body: [
          "Formülü aşağı kopyaladığında `F2:H500` aralığı da kayar ve alttaki satırlar tabloyu ıskalar. `$F$2:$H$500` yaz ya da aralığı tabloya (`Ctrl+T`) çevirip ad kullan.",
          "Copying the formula down shifts `F2:H500`, so lower rows miss part of the table. Write `$F$2:$H$500`, or convert the range to a table (`Ctrl+T`) and use its name.",
        ],
      }),
      step({
        title: ["Sütun sırasını kontrol et", "Check the column order"],
        body: [
          "`DÜŞEYARA` yalnızca sağa bakar; aranan değer aralığın ilk sütununda olmalı. Sola bakman gerekiyorsa `İNDİS + KAÇINCI` ya da `ÇAPRAZARA` kullan.",
          "`VLOOKUP` only looks right; the lookup value must sit in the first column of the range. To look left, use `INDEX + MATCH` or `XLOOKUP`.",
        ],
        code: "=İNDİS($D$2:$D$500; KAÇINCI(A2; $F$2:$F$500; 0))\n=INDEX($D$2:$D$500, MATCH(A2, $F$2:$F$500, 0))",
        lang: "excel",
      }),
    ],
    blocks: [
      pitfall(
        "EĞERHATA'yı erken sarma",
        "Don't wrap in IFERROR too early",
        "`EĞERHATA` hatayı **gizler**, çözmez. Önce yukarıdaki beş adımı geçir; gerçekten karşılığı olmayan kayıtlar kaldıysa o zaman sar. Aksi halde bir veri sorunu, temiz görünen bir raporun içinde kaybolur.",
        "`IFERROR` **hides** the error rather than fixing it. Work through the five steps first; only wrap it once the remaining rows genuinely have no match. Otherwise a data problem disappears inside a clean-looking report.",
      ),
    ],
    faq: [
      {
        q: ["Bazı satırlar çalışıyor, bazıları çalışmıyor.", "Some rows work, some don't."],
        a: [
          "Neredeyse her zaman aralık kaymasıdır — `$` eksiktir. İkinci ihtimal, çalışmayan satırlardaki metinlerde boşluk veya farklı bir karakter olmasıdır (örneğin normal tire yerine uzun tire).",
          "Almost always a shifting range — a missing `$`. The second possibility is stray spaces or lookalike characters in the failing rows (an en dash instead of a hyphen, for instance).",
        ],
      },
    ],
    related: ["csv-turkce-karakter-sorunu", "excelde-mukerrer-kayitlar-nasil-bulunur"],
    keywords: ["düşeyara", "vlookup", "#yok", "n/a", "hata", "eşleşmiyor", "excel"],
  }),

  howTo({
    slug: "excelde-mukerrer-kayitlar-nasil-bulunur",
    title: [
      "Excel'de mükerrer kayıtlar nasıl bulunur?",
      "How do you find duplicates in Excel?",
    ],
    summary: [
      "EĞERSAY ile say, koşullu biçimlendirmeyle renklendir, gerekirse Yinelenenleri Kaldır ile temizle.",
      "Count with COUNTIF, highlight with conditional formatting, then clean up with Remove Duplicates.",
    ],
    tool: "excel",
    trackSlug: "excel",
    minutes: 4,
    updated: "2026-08-04",
    answer: {
      body: [
        "Tek sütunda mükerrer arıyorsan `=EĞERSAY($A$2:$A$500; A2)>1` formülünü koşullu biçimlendirmeye koy. Birden çok sütunun **birlikte** benzersiz olması gerekiyorsa önce yardımcı bir anahtar sütunu üret.",
        "For duplicates in one column, put `=COUNTIF($A$2:$A$500, A2)>1` into conditional formatting. When several columns must be unique **together**, build a helper key column first.",
      ],
      code: "=EĞERSAY($A$2:$A$500; A2)>1\n=COUNTIF($A$2:$A$500, A2)>1",
      lang: "excel",
    },
    steps: [
      step({
        title: ["Benzersizlik kuralını seç", "Choose the uniqueness rule"],
        body: [
          "Yalnız e-posta mı benzersiz olmalı, yoksa ad + şehir birlikte mi? Bu karar sonraki her adımı belirler.",
          "Should email alone be unique, or name + city together? This decision drives every following step.",
        ],
      }),
      step({
        title: ["Çok sütunluysa anahtar üret", "Build a key for multiple columns"],
        body: [
          "Sütunları bir ayraçla birleştir. Ayraç önemlidir: ayraçsız birleştirmede `\"ab\"+\"c\"` ile `\"a\"+\"bc\"` aynı görünür.",
          "Join the columns with a separator. The separator matters: without one, `\"ab\"+\"c\"` and `\"a\"+\"bc\"` look identical.",
        ],
        code: "=KIRP(A2)&\"|\"&KIRP(B2)\n=TRIM(A2)&\"|\"&TRIM(B2)",
        lang: "excel",
      }),
      step({
        title: ["Renklendir", "Highlight them"],
        body: [
          "Aralığı seç → Koşullu Biçimlendirme → Yeni Kural → Formül kullan. Formülü **seçimin sol üst hücresine** göre yaz; Excel geri kalanına kendisi uyarlar.",
          "Select the range → Conditional Formatting → New Rule → Use a formula. Write it relative to the **top-left cell** of the selection; Excel adapts the rest.",
        ],
      }),
      step({
        title: ["Say ve temizle", "Count then clean"],
        body: [
          "Kaç tane olduğunu gör, sonra karar ver. **Yinelenenleri Kaldır** ilk kaydı tutar; en güncelin kalmasını istiyorsan önce tarihe göre azalan sırala.",
          "See how many there are before deciding. **Remove Duplicates** keeps the first occurrence; sort by date descending first if you want the newest to survive.",
        ],
        code: "=TOPLA.ÇARPIM((EĞERSAY(A2:A500; A2:A500)>1)*1)   // mükerrer satır sayısı\n=SUMPRODUCT((COUNTIF(A2:A500, A2:A500)>1)*1)",
        lang: "excel",
      }),
    ],
    blocks: [
      pitfall(
        "Yinelenenleri Kaldır geri alınamaz",
        "Remove Duplicates can't be undone later",
        "Komut satırları anında siler ve dosyayı kaydettikten sonra geri dönüş yoktur. Önce sayfanın bir kopyasını al ya da işlemi kopya sayfada yap.",
        "The command deletes rows immediately, and once the file is saved there's no way back. Duplicate the sheet first, or run it on the copy.",
      ),
    ],
    related: ["sqlde-mukerrer-kayitlar-nasil-bulunur", "excelde-dusey-ara-yok-hatasi"],
    keywords: ["mükerrer", "yinelenen", "duplicate", "eğersay", "countif", "koşullu biçimlendirme"],
  }),

  howTo({
    slug: "tableauda-hareketli-ortalama",
    title: [
      "Tableau'da hareketli ortalama nasıl hesaplanır?",
      "How do you compute a moving average in Tableau?",
    ],
    summary: [
      "WINDOW_AVG ile pencereyi tanımla, sonra 'Hesapla' ayarını doğru boyuta bağla.",
      "Define the window with WINDOW_AVG, then point Compute Using at the right dimension.",
    ],
    tool: "tableau",
    trackSlug: "tableau",
    minutes: 5,
    updated: "2026-08-04",
    answer: {
      body: [
        "`WINDOW_AVG(SUM([Satış]); -2; 0)` bulunduğun nokta dahil son üç dönemin ortalamasını verir. Asıl kritik ayar formül değil, tablo hesaplamasının **hangi boyut üzerinde** çalıştığıdır.",
        "`WINDOW_AVG(SUM([Sales]), -2, 0)` averages the last three periods including the current one. The critical setting isn't the formula but **which dimension** the table calculation runs along.",
      ],
      code: "WINDOW_AVG(SUM([Satış]); -2; 0)",
      lang: "sql",
    },
    steps: [
      step({
        title: ["Görseli önce kur", "Build the view first"],
        body: [
          "Tablo hesaplamaları veri kaynağında değil, görselde görünen sonuç üzerinde çalışır. Bu yüzden önce tarih ekseni ve ölçü yerinde olmalı.",
          "Table calculations run on what's visible in the view, not on the data source. So get the date axis and the measure in place first.",
        ],
      }),
      step({
        title: ["Pencereyi tanımla", "Define the window"],
        body: [
          "İlk sayı kaç dönem geriye, ikincisi kaç dönem ileriye bakılacağını söyler. `-2; 0` geriye dönük üç dönemdir; `-1; 1` ise merkezlenmiş üç dönem — trend çizerken merkezlenmiş olan daha yumuşak durur ama son noktayı hesaplayamaz.",
          "The first number is how far back, the second how far forward. `-2, 0` is a trailing three-period window; `-1, 1` is centred — smoother for a trend line, but it can't compute the final point.",
        ],
      }),
      step({
        title: ["Hesapla ayarını düzelt", "Fix Compute Using"],
        body: [
          "Ölçüye sağ tık → **Hesapla** → tarih boyutunu seç. Yanlış boyut seçilirse ortalama kategoriler arasında gezinir ve tamamen anlamsız bir çizgi çıkar.",
          "Right-click the measure → **Compute Using** → pick the date dimension. Choose the wrong one and the average walks across categories, producing a meaningless line.",
        ],
      }),
      step({
        title: ["Ham seriyle birlikte göster", "Show it against the raw series"],
        body: [
          "Hareketli ortalamayı tek başına göstermek gürültüyü gizler ama okuyucudan da saklar. Ham seriyi soluk, ortalamayı belirgin çiz — okuyucu ikisini karşılaştırabilsin.",
          "Showing the moving average alone hides the noise from the reader too. Draw the raw series faintly and the average boldly so both can be compared.",
        ],
      }),
    ],
    blocks: [
      info(
        "Hızlı tablo hesaplaması",
        "Quick table calculation",
        "Formül yazmadan da olur: ölçüye sağ tık → **Hızlı Tablo Hesaplaması → Hareketli Ortalama**, sonra **Hesaplamayı Düzenle** ile pencereyi ayarla. Öğrenirken formülü elle yazmak neyin nasıl çalıştığını daha iyi gösterir.",
        "You can skip the formula: right-click the measure → **Quick Table Calculation → Moving Average**, then **Edit Table Calculation** to set the window. While learning, writing the formula by hand shows you more.",
      ),
    ],
    faq: [
      {
        q: ["Çizginin başı neden boş?", "Why is the start of the line empty?"],
        a: [
          "Pencere dolmadığı için — ilk iki noktada geriye bakacak üç dönem yok. Bu doğru davranıştır; eksik pencereyi doldurmak ilk noktaları yanıltıcı biçimde yumuşatır.",
          "Because the window isn't full — the first two points have no three periods behind them. That's correct behaviour; filling a partial window would misleadingly smooth the opening points.",
        ],
      },
    ],
    related: ["sqlde-aylik-buyume-nasil-hesaplanir", "power-bide-yoy-nasil-hesaplanir"],
    keywords: ["hareketli ortalama", "moving average", "window_avg", "tableau", "trend", "yumuşatma"],
  }),
];
