import { entry, group, section } from "./helpers";

/** Power BI: DAX ölçüleri ve Power Query (M) adımları. */
export const powerBiReference = group({
  slug: "power-bi",
  name: "Power BI (DAX)",
  icon: "📈",
  color: "hsl(38 92% 50%)",
  lang: "dax",
  trackSlug: "power-bi",
  tagline: ["Ölçüler, zaman zekâsı ve Power Query", "Measures, time intelligence and Power Query"],
  description: [
    "DAX'ın günlük olarak yazılan ölçüleri ve Power Query'nin veri hazırlama adımları. Formüller kopyalanmaya hazır — model adlarını kendi tablolarınla değiştirmen yeterli.",
    "The DAX measures written daily and the Power Query steps that prepare the data. Formulas are copy-ready — just swap in your own table names.",
  ],
  sections: [
    section("temel", ["Ölçü temelleri", "Measure basics"], [
      entry({
        slug: "calculate",
        name: "CALCULATE()",
        summary: [
          "Bir hesabı, değiştirilmiş filtre bağlamında çalıştırır.",
          "Evaluates an expression in a modified filter context.",
        ],
        syntax: "CALCULATE(<ifade>; <filtre1>; <filtre2>; ...)",
        description: [
          "DAX'ın en önemli fonksiyonu ve öğrenmesi en zor olanı. Verdiğin filtreler görseldeki mevcut filtreleri **ezer** (aynı sütun için) veya **ekler** (farklı sütun için). Neredeyse her ileri ölçü bunun etrafında kurulur.",
          "The most important DAX function and the hardest to learn. The filters you pass **override** the visual's filters on the same column, or **add** to them on a different column. Nearly every advanced measure is built around it.",
        ],
        params: [
          ["ifade", "Hesaplanacak toplama — genelde `SUM`, `COUNTROWS` veya başka bir ölçü.", "The aggregation to evaluate — usually `SUM`, `COUNTROWS` or another measure."],
          ["filtre", "Boole ifadesi ya da `ALL`, `VALUES` gibi tablo fonksiyonu.", "A boolean expression or a table function such as `ALL`, `VALUES`."],
        ],
        example: {
          code: "Elektronik Ciro =\nCALCULATE(\n    SUM(Satis[Tutar]);\n    Urun[Kategori] = \"Elektronik\"\n)",
        },
        related: ["power-bi/all", "power-bi/divide"],
        keywords: ["calculate", "filtre bağlamı", "ölçü", "measure", "filter context"],
      }),
      entry({
        slug: "sumx",
        name: "SUMX() ve yineleyiciler",
        summary: [
          "Satır satır hesaplayıp sonucu toplar.",
          "Evaluates row by row, then sums the result.",
        ],
        syntax: "SUMX(<tablo>; <satır_ifadesi>)",
        description: [
          "`SUM` hazır bir sütunu toplar; `SUMX` önce her satır için bir ifade hesaplar. Tabloda `Tutar` sütunu yoksa `SUMX(Satis; Satis[Adet] * Satis[Fiyat])` doğru cevaptır — hesaplanmış sütun eklemene gerek kalmaz. `AVERAGEX`, `MAXX`, `COUNTAX` aynı mantıkla çalışır.",
          "`SUM` totals an existing column; `SUMX` first evaluates an expression per row. With no `Amount` column, `SUMX(Sales, Sales[Qty] * Sales[Price])` is the right answer — no calculated column needed. `AVERAGEX`, `MAXX` and `COUNTAX` work the same way.",
        ],
        example: {
          code: "Ciro = SUMX(Satis; Satis[Adet] * Satis[BirimFiyat])",
        },
        related: ["power-bi/calculate", "power-bi/divide"],
        keywords: ["sumx", "averagex", "yineleyici", "iterator", "satır bağlamı"],
      }),
      entry({
        slug: "divide",
        name: "DIVIDE()",
        summary: [
          "Sıfıra bölme hatasını kendisi ele alan bölme.",
          "Division that handles divide-by-zero for you.",
        ],
        syntax: "DIVIDE(<pay>; <payda>; [<alternatif>])",
        description: [
          "`/` operatörü payda sıfırken sonsuz veya hata üretir; `DIVIDE` boş döner. Oran hesaplayan **her** ölçüde bunu kullan — kâr marjı, dönüşüm oranı, pazar payı.",
          "The `/` operator yields infinity or an error when the denominator is zero; `DIVIDE` returns blank. Use it in **every** ratio measure — margin, conversion rate, market share.",
        ],
        example: {
          code: "Kar Marjı = DIVIDE([Kar]; [Ciro]; 0)",
        },
        related: ["power-bi/calculate"],
        keywords: ["divide", "bölme", "oran", "sıfıra bölme", "ratio"],
      }),
      entry({
        slug: "var-return",
        name: "VAR ... RETURN",
        summary: [
          "Ölçü içinde ara değişken tanımlar.",
          "Declares intermediate variables inside a measure.",
        ],
        syntax: "MEASURE =\nVAR ad = <ifade>\nRETURN <sonuç>",
        description: [
          "Aynı hesabı iki kez yazmayı önler ve ölçüyü okunur yapar. Değişken **bir kez** hesaplanır, bu yüzden performansı da iyileştirir. Değişkenler tanımlandıkları filtre bağlamını taşır — sonradan `CALCULATE` içine girseler bile değişmezler.",
          "Avoids repeating the same computation and makes the measure readable. A variable is evaluated **once**, so it also improves performance. Variables carry the filter context where they were defined, even inside a later `CALCULATE`.",
        ],
        example: {
          code: "YoY % =\nVAR BuYil = [Ciro]\nVAR GecenYil = CALCULATE([Ciro]; SAMEPERIODLASTYEAR('Takvim'[Tarih]))\nRETURN DIVIDE(BuYil - GecenYil; GecenYil)",
        },
        related: ["power-bi/sameperiodlastyear", "power-bi/divide"],
        keywords: ["var", "return", "değişken", "variable", "okunabilirlik"],
      }),
    ]),

    section("filtre", ["Filtre bağlamı", "Filter context"], [
      entry({
        slug: "all",
        name: "ALL() / ALLSELECTED() / REMOVEFILTERS()",
        summary: ["Filtreleri kaldırır.", "Removes filters."],
        syntax: "ALL(<tablo veya sütun>) · ALLSELECTED(<tablo>) · REMOVEFILTERS(<tablo>)",
        description: [
          "`ALL` tüm filtreleri kaldırır — 'toplam içindeki pay' hesabının paydası budur. `ALLSELECTED` kullanıcının dilimleyicide seçtiklerini korur, yalnızca görselin kendi filtresini kaldırır. `REMOVEFILTERS` `ALL`'un okunur adıdır.",
          "`ALL` clears every filter — that's the denominator of a share-of-total. `ALLSELECTED` respects the user's slicer selection and only removes the visual's own filter. `REMOVEFILTERS` is the readable name for `ALL`.",
        ],
        example: {
          code: "Kategori Payı % =\nDIVIDE(\n    [Ciro];\n    CALCULATE([Ciro]; ALL(Urun[Kategori]))\n)",
        },
        related: ["power-bi/calculate", "power-bi/selectedvalue"],
        keywords: ["all", "allselected", "removefilters", "pay", "toplam"],
      }),
      entry({
        slug: "selectedvalue",
        name: "SELECTEDVALUE()",
        summary: [
          "Tek bir değer seçiliyse onu döndürür.",
          "Returns the single selected value, if there is one.",
        ],
        syntax: "SELECTEDVALUE(<sütun>; [<varsayılan>])",
        description: [
          "Dinamik başlık, dinamik ölçü seçimi ve 'ne seçildi' kontrollerinde kullanılır. Birden fazla değer seçiliyse varsayılanı döner — `HASONEVALUE` + `VALUES` ikilisinin kısa hâli.",
          "Used for dynamic titles, measure switching and \"what is selected\" checks. Returns the default when more than one value is selected — the short form of `HASONEVALUE` + `VALUES`.",
        ],
        example: {
          code: "Başlık =\n\"Seçili şehir: \" & SELECTEDVALUE(Musteri[Sehir]; \"Tümü\")",
        },
        related: ["power-bi/all"],
        keywords: ["selectedvalue", "dilimleyici", "slicer", "dinamik başlık"],
      }),
      entry({
        slug: "related",
        name: "RELATED() / RELATEDTABLE()",
        summary: [
          "İlişkili tablodan değer getirir.",
          "Pulls a value across a relationship.",
        ],
        syntax: "RELATED(<sütun>) · RELATEDTABLE(<tablo>)",
        description: [
          "`RELATED` **çoktan bire** yönünde tek bir değer getirir (satış satırından ürün kategorisi). `RELATEDTABLE` ters yönde bir tablo getirir (üründen o ürünün tüm satışları) ve genelde `COUNTROWS` ile sarılır.",
          "`RELATED` fetches a single value in the **many-to-one** direction (product category from a sales row). `RELATEDTABLE` returns a table in the other direction and is usually wrapped in `COUNTROWS`.",
        ],
        example: {
          code: "Satır Kategorisi = RELATED(Urun[Kategori])\nÜrün Satış Adedi = COUNTROWS(RELATEDTABLE(Satis))",
        },
        related: ["power-bi/calculate"],
        keywords: ["related", "relatedtable", "ilişki", "relationship", "model"],
      }),
    ]),

    section("zaman", ["Zaman zekâsı", "Time intelligence"], [
      entry({
        slug: "sameperiodlastyear",
        name: "SAMEPERIODLASTYEAR()",
        summary: [
          "Aynı dönemin geçen yılki karşılığını verir.",
          "Shifts the current period back one year.",
        ],
        syntax: "CALCULATE(<ölçü>; SAMEPERIODLASTYEAR('Takvim'[Tarih]))",
        description: [
          "YoY (yıllık büyüme) hesabının yarısı budur. **Şartı var**: modelde tarih tablosu olarak işaretlenmiş, kesintisiz ve tam yılları kapsayan bir takvim tablosu bulunmalı. Yoksa sonuç sessizce boş gelir.",
          "This is half of a YoY calculation. **It has a prerequisite**: the model needs a proper date table, marked as such, continuous and covering full years. Without it the result silently comes back blank.",
        ],
        example: {
          code: "Ciro GY =\nCALCULATE([Ciro]; SAMEPERIODLASTYEAR('Takvim'[Tarih]))\n\nYoY % =\nDIVIDE([Ciro] - [Ciro GY]; [Ciro GY])",
        },
        related: ["power-bi/dateadd", "power-bi/totalytd", "power-bi/var-return"],
        keywords: ["sameperiodlastyear", "yoy", "geçen yıl", "büyüme", "yıllık"],
      }),
      entry({
        slug: "dateadd",
        name: "DATEADD()",
        summary: [
          "Dönemi istediğin kadar ileri/geri kaydırır.",
          "Shifts the period by any number of intervals.",
        ],
        syntax: "DATEADD('Takvim'[Tarih]; <sayı>; <YEAR|QUARTER|MONTH|DAY>)",
        description: [
          "`SAMEPERIODLASTYEAR`'ın genel hâli. MoM (aylık büyüme) için `-1; MONTH`, çeyreklik için `-1; QUARTER` yazılır.",
          "The general form of `SAMEPERIODLASTYEAR`. Use `-1, MONTH` for month-over-month and `-1, QUARTER` for quarterly comparisons.",
        ],
        example: {
          code: "Ciro ÖncekiAy =\nCALCULATE([Ciro]; DATEADD('Takvim'[Tarih]; -1; MONTH))",
        },
        related: ["power-bi/sameperiodlastyear"],
        keywords: ["dateadd", "mom", "aylık", "kaydırma", "önceki dönem"],
      }),
      entry({
        slug: "totalytd",
        name: "TOTALYTD() / DATESYTD()",
        summary: [
          "Yıl başından bugüne kümülatif toplar.",
          "Accumulates from the start of the year to date.",
        ],
        syntax: "TOTALYTD(<ölçü>; 'Takvim'[Tarih]; [<yıl_sonu>])",
        description: [
          "Mali yılı Aralık'ta bitmeyen şirketler için üçüncü argümanı ver: `\"31/03\"` gibi. `TOTALMTD` ve `TOTALQTD` aynı işi ay ve çeyrek için yapar.",
          "For companies whose fiscal year doesn't end in December, pass the third argument, e.g. `\"31/03\"`. `TOTALMTD` and `TOTALQTD` do the same for months and quarters.",
        ],
        example: {
          code: "Ciro YTD = TOTALYTD([Ciro]; 'Takvim'[Tarih])",
        },
        related: ["power-bi/sameperiodlastyear"],
        keywords: ["totalytd", "ytd", "kümülatif", "yıl başından", "mali yıl"],
      }),
    ]),

    section("power-query", ["Power Query (M)", "Power Query (M)"], [
      entry({
        slug: "unpivot",
        name: "Sütunların Kaldırılması (Unpivot)",
        summary: [
          "Her ay bir sütun olan tabloyu analiz edilebilir hâle getirir.",
          "Turns a month-per-column table into something analysable.",
        ],
        syntax: "Table.UnpivotOtherColumns(kaynak; {\"Sabit Sütun\"}; \"Öznitelik\"; \"Değer\")",
        description: [
          "Power BI geniş tabloları sevmez. Sabit kalacak sütunları seç, sağ tık → **Diğer sütunları kaldır**. Böylece yeni bir ay eklendiğinde rapor kendiliğinden çalışır — sütun seçmediğin için.",
          "Power BI dislikes wide tables. Select the columns that stay, right-click → **Unpivot other columns**. When a new month arrives the report keeps working, because you never named the month columns.",
        ],
        example: {
          code: "= Table.UnpivotOtherColumns(Kaynak; {\"Sehir\"}; \"Ay\"; \"Ciro\")",
        },
        related: ["python/melt", "power-bi/merge-queries"],
        keywords: ["unpivot", "power query", "geniş", "uzun", "dönüştür"],
      }),
      entry({
        slug: "merge-queries",
        name: "Sorguları Birleştir (Merge)",
        summary: ["İki sorguyu anahtara göre birleştirir.", "Joins two queries on a key."],
        syntax: "Table.NestedJoin(sol; {\"anahtar\"}; sag; {\"anahtar\"}; \"yeni\"; JoinKind.LeftOuter)",
        description: [
          "Power Query'nin JOIN'i. **Ekle (Append)** ile karıştırma: Merge yan yana ekler (sütun kazanırsın), Append alt alta ekler (satır kazanırsın). Birleştirdikten sonra genişletme adımında yalnızca ihtiyacın olan sütunları seç — model şişmesin.",
          "Power Query's JOIN. Don't confuse it with **Append**: Merge adds columns, Append adds rows. After merging, expand only the columns you need so the model stays lean.",
        ],
        example: {
          code: "= Table.NestedJoin(Satis; {\"UrunID\"}; Urun; {\"ID\"}; \"Urun\"; JoinKind.LeftOuter)",
        },
        related: ["power-bi/unpivot", "python/merge"],
        keywords: ["merge", "append", "birleştir", "join", "power query"],
      }),
      entry({
        slug: "date-table",
        name: "Takvim tablosu",
        summary: [
          "Zaman zekâsının çalışması için gereken tarih tablosu.",
          "The date table that time intelligence depends on.",
        ],
        syntax: "Takvim =\nADDCOLUMNS(\n    CALENDARAUTO();\n    \"Yıl\"; YEAR([Date]);\n    \"Ay No\"; MONTH([Date]);\n    \"Ay\"; FORMAT([Date]; \"MMMM\")\n)",
        description: [
          "Kesintisiz olmalı, tam yılları kapsamalı ve **Tarih tablosu olarak işaretle** ile modelde tanımlanmalı. Ay adı sütununu sıralamak için 'Sütuna göre sırala' ile ay numarasına bağla — yoksa aylar alfabetik dizilir.",
          "It must be continuous, cover whole years and be registered with **Mark as date table**. Sort the month-name column by month number, otherwise months line up alphabetically.",
        ],
        example: {
          code: "Takvim = ADDCOLUMNS(CALENDAR(DATE(2022;1;1); DATE(2025;12;31)); \"Yıl\"; YEAR([Date]))",
        },
        related: ["power-bi/sameperiodlastyear", "power-bi/totalytd"],
        keywords: ["takvim", "date table", "calendar", "zaman zekası", "tarih tablosu"],
      }),
    ]),
  ],
});
