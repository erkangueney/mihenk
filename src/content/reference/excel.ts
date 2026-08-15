import { entry, group, section } from "./helpers";

/**
 * Excel formül referansı.
 *
 * Türkçe Excel farklı fonksiyon adları kullanır ve argümanları noktalı virgülle
 * ayırır. Her girdide **iki sözdizimi de** verilir — TR arayüzünde çalışan
 * kullanıcı İngilizce dokümanlarda kaybolmasın.
 */
export const excelReference = group({
  slug: "excel",
  name: "Excel",
  icon: "📊",
  color: "hsl(142 71% 45%)",
  lang: "excel",
  trackSlug: "excel",
  tagline: ["Formüller — Türkçe ve İngilizce adlarıyla", "Formulas — with Turkish and English names"],
  description: [
    "Günlük işte kullanılan Excel formülleri. Her girdide Türkçe ve İngilizce sözdizimi birlikte verilir; argüman ayracı TR arayüzde `;`, EN arayüzde `,` olur.",
    "The Excel formulas used in daily work. Each entry gives both the Turkish and English syntax; the argument separator is `;` in the Turkish UI and `,` in the English one.",
  ],
  sections: [
    section("arama", ["Arama ve başvuru", "Lookup and reference"], [
      entry({
        slug: "dusey-ara",
        name: "DÜŞEYARA / VLOOKUP",
        summary: [
          "Bir değeri tablonun ilk sütununda arar, aynı satırdan başka bir sütunu getirir.",
          "Looks a value up in the first column of a range and returns another column from the same row.",
        ],
        syntax:
          "TR: =DÜŞEYARA(aranan; tablo; sütun_no; [aralık_bak])\nEN: =VLOOKUP(lookup; table; col_index; [range_lookup])",
        description: [
          "Son argümanı **her zaman `YANLIŞ` / `FALSE`** yaz — `DOĞRU` yaklaşık eşleşme yapar ve sıralı olmayan tabloda sessizce yanlış sonuç verir. Aranan değer tablonun **ilk** sütununda olmak zorundadır; solunda kalan bir sütunu getiremezsin.",
          "Always pass **`FALSE`** as the last argument — `TRUE` does approximate matching and silently returns wrong values on unsorted data. The lookup value must be in the **first** column; you cannot return a column to its left.",
        ],
        params: [
          ["aranan", "Aranacak değer veya hücre.", "The value or cell to look for."],
          ["tablo", "Arama yapılacak aralık. `$` ile sabitlenmeli: `$A$2:$D$500`.", "The range to search. Anchor it with `$`: `$A$2:$D$500`."],
          ["sütun_no", "Kaçıncı sütun döndürülecek — tablonun solundan sayılır.", "Which column to return, counted from the left of the range."],
          ["aralık_bak", "`YANLIŞ` tam eşleşme, `DOĞRU` yaklaşık.", "`FALSE` exact match, `TRUE` approximate."],
        ],
        example: {
          code: "=DÜŞEYARA(A2; $F$2:$H$200; 3; YANLIŞ)\n=VLOOKUP(A2, $F$2:$H$200, 3, FALSE)",
          note: [
            "Sütun eklendiğinde 3 numarası kayar; bu yüzden yeni tablolarda XLOOKUP tercih edilir.",
            "Adding a column shifts index 3; that's why XLOOKUP is preferred in new work.",
          ],
        },
        related: ["excel/xlookup", "excel/index-kacinci"],
        keywords: ["düşeyara", "vlookup", "arama", "eşleştirme", "lookup"],
      }),
      entry({
        slug: "xlookup",
        name: "ÇAPRAZARA / XLOOKUP",
        summary: [
          "DÜŞEYARA'nın modern hâli: sola da bakar, bulunamadı değeri alır.",
          "The modern replacement for VLOOKUP: looks left too and takes a not-found value.",
        ],
        syntax:
          "TR: =ÇAPRAZARA(aranan; arama_dizisi; döndürülecek_dizi; [bulunamadı])\nEN: =XLOOKUP(lookup; lookup_array; return_array; [if_not_found])",
        description: [
          "Sütun numarası yerine doğrudan diziyi verirsin — araya sütun eklenince formül bozulmaz. Varsayılanı tam eşleşmedir ve `#YOK` hatası yerine kendi mesajını yazabilirsin.",
          "You pass the array itself instead of a column index, so inserting a column doesn't break it. It defaults to exact match and lets you replace `#N/A` with your own message.",
        ],
        example: {
          code: "=ÇAPRAZARA(A2; $F$2:$F$200; $H$2:$H$200; \"bulunamadı\")\n=XLOOKUP(A2, $F$2:$F$200, $H$2:$H$200, \"not found\")",
        },
        related: ["excel/dusey-ara", "excel/index-kacinci"],
        keywords: ["çaprazara", "xlookup", "arama", "modern", "lookup"],
      }),
      entry({
        slug: "index-kacinci",
        name: "İNDİS + KAÇINCI / INDEX + MATCH",
        summary: [
          "Her yöne çalışan klasik arama ikilisi.",
          "The classic lookup pair that works in every direction.",
        ],
        syntax:
          "TR: =İNDİS(döndürülecek_aralık; KAÇINCI(aranan; arama_aralığı; 0))\nEN: =INDEX(return_range, MATCH(lookup, lookup_range, 0))",
        description: [
          "ÇAPRAZARA olmayan sürümlerde standart çözüm. `KAÇINCI` konumu bulur, `İNDİS` o konumdaki değeri getirir. `0` argümanı tam eşleşme demektir.",
          "The standard solution in versions without XLOOKUP. `MATCH` finds the position, `INDEX` returns the value there. The `0` means exact match.",
        ],
        example: {
          code: "=İNDİS($H$2:$H$200; KAÇINCI(A2; $F$2:$F$200; 0))\n=INDEX($H$2:$H$200, MATCH(A2, $F$2:$F$200, 0))",
        },
        related: ["excel/xlookup", "excel/dusey-ara"],
        keywords: ["indis", "kaçıncı", "index", "match", "arama"],
      }),
    ]),

    section("kosul", ["Koşullu hesap", "Conditional calculation"], [
      entry({
        slug: "eger",
        name: "EĞER / IF",
        summary: ["Koşula göre iki farklı sonuç üretir.", "Returns one of two results based on a condition."],
        syntax: "TR: =EĞER(koşul; doğruysa; yanlışsa)\nEN: =IF(condition, if_true, if_false)",
        description: [
          "İç içe üçten fazla `EĞER` yazıyorsan `İÇOKEĞER` (`IFS`) ya da bir eşleştirme tablosu + `DÜŞEYARA` daha okunur olur.",
          "If you're nesting more than three `IF`s, `IFS` or a mapping table + `VLOOKUP` will read far better.",
        ],
        example: {
          code: "=EĞER(B2>1000; \"yüksek\"; \"normal\")\n=IF(B2>1000, \"high\", \"normal\")",
        },
        related: ["excel/etopla", "excel/eger-hata"],
        keywords: ["eğer", "if", "koşul", "condition"],
      }),
      entry({
        slug: "eger-hata",
        name: "EĞERHATA / IFERROR",
        summary: ["Hata veren formülü kendi mesajınla değiştirir.", "Replaces a formula's error with your own value."],
        syntax: "TR: =EĞERHATA(formül; hata_durumunda)\nEN: =IFERROR(formula, value_if_error)",
        description: [
          "Rapor tablolarındaki `#YOK` ve `#SAYI/0!` kalabalığını temizler. Dikkat: hatayı **gizler**, düzeltmez — önce hatanın gerçekten beklenen bir durum olduğundan emin ol.",
          "Cleans `#N/A` and `#DIV/0!` noise out of report tables. Careful: it **hides** the error rather than fixing it — make sure the error is genuinely expected first.",
        ],
        example: {
          code: "=EĞERHATA(DÜŞEYARA(A2; $F$2:$H$200; 3; YANLIŞ); \"eşleşme yok\")\n=IFERROR(VLOOKUP(A2, $F$2:$H$200, 3, FALSE), \"no match\")",
        },
        related: ["excel/eger", "excel/dusey-ara"],
        keywords: ["eğerhata", "iferror", "hata", "yok", "n/a"],
      }),
      entry({
        slug: "etopla",
        name: "ETOPLA / ÇOKETOPLA — SUMIF / SUMIFS",
        summary: ["Koşula uyan hücreleri toplar.", "Sums the cells matching a condition."],
        syntax:
          "TR: =ETOPLA(aralık; ölçüt; [toplam_aralığı])\n    =ÇOKETOPLA(toplam_aralığı; aralık1; ölçüt1; ...)\nEN: =SUMIF(range, criteria, [sum_range])\n    =SUMIFS(sum_range, range1, criteria1, ...)",
        description: [
          "Argüman sırasının farklı olmasına dikkat: `ETOPLA`'da toplanacak aralık **sonda**, `ÇOKETOPLA`'da **başta**. Ölçüt metin olarak da yazılabilir: `\">1000\"`, `\"<>iptal\"`.",
          "Watch the argument order: in `SUMIF` the summed range comes **last**, in `SUMIFS` it comes **first**. Criteria can be text expressions: `\">1000\"`, `\"<>cancelled\"`.",
        ],
        example: {
          code: "=ÇOKETOPLA($D$2:$D$500; $B$2:$B$500; \"İstanbul\"; $C$2:$C$500; \">1000\")\n=SUMIFS($D$2:$D$500, $B$2:$B$500, \"Istanbul\", $C$2:$C$500, \">1000\")",
        },
        related: ["excel/eger-say", "excel/pivot"],
        keywords: ["etopla", "çoketopla", "sumif", "sumifs", "koşullu toplam"],
      }),
      entry({
        slug: "eger-say",
        name: "EĞERSAY / ÇOKEĞERSAY — COUNTIF / COUNTIFS",
        summary: ["Koşula uyan hücreleri sayar.", "Counts the cells matching a condition."],
        syntax:
          "TR: =EĞERSAY(aralık; ölçüt)\n    =ÇOKEĞERSAY(aralık1; ölçüt1; aralık2; ölçüt2; ...)\nEN: =COUNTIF(range, criteria)\n    =COUNTIFS(range1, criteria1, ...)",
        description: [
          "Mükerrer kayıt bulmanın en hızlı yolu: `=EĞERSAY($A$2:$A$500; A2)>1` formülünü koşullu biçimlendirmeye koy, tekrar edenler renklensin.",
          "The fastest duplicate finder: put `=COUNTIF($A$2:$A$500, A2)>1` into conditional formatting and duplicates light up.",
        ],
        example: {
          code: "=ÇOKEĞERSAY($B$2:$B$500; \"İstanbul\"; $E$2:$E$500; \"teslim\")\n=COUNTIFS($B$2:$B$500, \"Istanbul\", $E$2:$E$500, \"delivered\")",
        },
        related: ["excel/etopla"],
        keywords: ["eğersay", "çokeğersay", "countif", "countifs", "say", "mükerrer"],
      }),
    ]),

    section("metin-tarih", ["Metin ve tarih", "Text and dates"], [
      entry({
        slug: "metin-birlestir",
        name: "METİNBİRLEŞTİR / TEXTJOIN",
        summary: [
          "Birden çok hücreyi ayraçla birleştirir.",
          "Joins multiple cells with a separator.",
        ],
        syntax:
          "TR: =METİNBİRLEŞTİR(ayraç; boşları_yoksay; aralık)\nEN: =TEXTJOIN(delimiter, ignore_empty, range)",
        description: [
          "`&` ile tek tek birleştirmekten çok daha kısadır ve boş hücreleri atlayabilir. Etiket, adres ve anahtar üretmede kullanılır.",
          "Much shorter than chaining `&` and it can skip blanks. Used to build labels, addresses and composite keys.",
        ],
        example: {
          code: "=METİNBİRLEŞTİR(\", \"; DOĞRU; A2:D2)\n=TEXTJOIN(\", \", TRUE, A2:D2)",
        },
        related: ["excel/kirp"],
        keywords: ["metinbirleştir", "textjoin", "birleştir", "concat"],
      }),
      entry({
        slug: "kirp",
        name: "KIRP / TEMİZ — TRIM / CLEAN",
        summary: [
          "Görünmeyen boşluk ve karakterleri siler.",
          "Strips invisible spaces and characters.",
        ],
        syntax: "TR: =KIRP(metin) · =TEMİZ(metin)\nEN: =TRIM(text) · =CLEAN(text)",
        description: [
          "DÜŞEYARA'nın 'aynı görünüyor ama eşleşmiyor' hatasının bir numaralı sebebi sondaki boşluktur. Dışarıdan gelen her metin sütununu önce `KIRP`'ten geçir.",
          "A trailing space is the number-one cause of the \"looks identical but won't match\" VLOOKUP bug. Run every imported text column through `TRIM` first.",
        ],
        example: { code: "=KIRP(A2)\n=TRIM(A2)" },
        related: ["excel/dusey-ara", "excel/metin-birlestir"],
        keywords: ["kırp", "trim", "temiz", "clean", "boşluk", "temizlik"],
      }),
      entry({
        slug: "bugun",
        name: "BUGÜN / TARİH / EDATE",
        summary: ["Tarih üretir ve kaydırır.", "Creates and shifts dates."],
        syntax:
          "TR: =BUGÜN() · =TARİH(yıl; ay; gün) · =SERİAY(tarih; ay_sayısı)\nEN: =TODAY() · =DATE(y, m, d) · =EDATE(date, months)",
        description: [
          "Excel'de tarih aslında bir sayıdır (1 = 1 Ocak 1900), bu yüzden tarihler çıkarılabilir: `=B2-A2` gün farkını verir. Geçen yılın aynı ayı için `=SERİAY(A2; -12)`.",
          "A date in Excel is really a number (1 = 1 Jan 1900), so dates can be subtracted: `=B2-A2` gives the day difference. For the same month last year use `=EDATE(A2, -12)`.",
        ],
        example: {
          code: "=SERİAY(A2; -12)      // geçen yılın aynı ayı\n=EDATE(A2, -12)",
        },
        related: ["excel/etopla"],
        keywords: ["bugün", "today", "tarih", "date", "edate", "seriay"],
      }),
    ]),

    section("dizi-pivot", ["Dinamik diziler ve pivot", "Dynamic arrays and pivot"], [
      entry({
        slug: "filtre",
        name: "FİLTRE / FILTER",
        summary: [
          "Koşula uyan satırları formülle döker.",
          "Spills the rows matching a condition.",
        ],
        syntax: "TR: =FİLTRE(dizi; koşul; [boşsa])\nEN: =FILTER(array, include, [if_empty])",
        description: [
          "Dinamik dizi fonksiyonu: sonuç kaç satırsa o kadar hücreye kendiliğinden taşar. Kaynak veri değişince rapor da değişir — kopyala-yapıştır gerekmez.",
          "A dynamic array function: the result spills into as many cells as it needs. When the source changes, the report changes with it — no copy-paste.",
        ],
        example: {
          code: "=FİLTRE(A2:D500; (B2:B500=\"İstanbul\")*(C2:C500>1000); \"kayıt yok\")\n=FILTER(A2:D500, (B2:B500=\"Istanbul\")*(C2:C500>1000), \"no records\")",
          note: [
            "Birden çok koşul `*` (ve) ve `+` (veya) ile birleştirilir.",
            "Multiple conditions combine with `*` (and) and `+` (or).",
          ],
        },
        related: ["excel/benzersiz", "excel/sirala"],
        keywords: ["filtre", "filter", "dinamik dizi", "spill"],
      }),
      entry({
        slug: "benzersiz",
        name: "BENZERSİZ / UNIQUE",
        summary: ["Benzersiz değer listesi döker.", "Spills a list of unique values."],
        syntax: "TR: =BENZERSİZ(dizi)\nEN: =UNIQUE(array)",
        description: [
          "Açılır liste (veri doğrulama) kaynağı üretmenin en temiz yolu. `SIRALA` ile sararak alfabetik liste elde edersin: `=SIRALA(BENZERSİZ(B2:B500))`.",
          "The cleanest way to feed a dropdown (data validation). Wrap it in `SORT` for an alphabetical list: `=SORT(UNIQUE(B2:B500))`.",
        ],
        example: { code: "=SIRALA(BENZERSİZ(B2:B500))\n=SORT(UNIQUE(B2:B500))" },
        related: ["excel/filtre", "excel/sirala"],
        keywords: ["benzersiz", "unique", "tekilleştir", "liste"],
      }),
      entry({
        slug: "sirala",
        name: "SIRALA / SORT",
        summary: ["Diziyi formülle sıralar.", "Sorts an array with a formula."],
        syntax: "TR: =SIRALA(dizi; [sütun_no]; [yön])\nEN: =SORT(array, [sort_index], [sort_order])",
        description: [
          "Yön `1` artan, `-1` azalandır. `FİLTRE` ile birlikte kullanıldığında canlı bir 'ilk 10' tablosu kurabilirsin.",
          "Order `1` is ascending, `-1` descending. Combined with `FILTER` it gives you a live top-10 table.",
        ],
        example: {
          code: "=SIRALA(FİLTRE(A2:D500; D2:D500>0); 4; -1)\n=SORT(FILTER(A2:D500, D2:D500>0), 4, -1)",
        },
        related: ["excel/filtre", "excel/benzersiz"],
        keywords: ["sırala", "sort", "dizi", "top 10"],
      }),
      entry({
        slug: "pivot",
        name: "Pivot tablo",
        summary: [
          "Veriyi sürükleyerek özetleyen çapraz tablo.",
          "The drag-and-drop cross-tab that summarises data.",
        ],
        syntax: "Ekle → PivotTable · Satırlar / Sütunlar / Değerler / Filtreler",
        description: [
          "Kaynak aralığı **tabloya çevir** (`Ctrl+T`) — böylece veri büyüdükçe pivot kendiliğinden kapsar. Değer alanına atılan sayı varsayılan olarak toplanır; metin ise sayılır. Yenilemeyi unutma: `Alt+F5`.",
          "**Convert the source to a table** (`Ctrl+T`) so the pivot grows with the data. A number dropped into Values is summed by default; text is counted. Don't forget to refresh: `Alt+F5`.",
        ],
        example: {
          code: "Satırlar: Şehir · Sütunlar: Ay · Değerler: Toplam Ciro · Filtreler: Segment",
        },
        related: ["excel/etopla", "python/pivot-table"],
        keywords: ["pivot", "özet tablo", "pivottable", "çapraz"],
      }),
    ]),
  ],
});
