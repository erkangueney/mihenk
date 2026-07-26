import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, quiz, text, tip } from "../helpers";

export const excelTrack: Track = {
  slug: "excel",
  name: "Excel",
  category: "foundation",
  color: "#10b981",
  icon: "🧮",
  tagline: L("Hâlâ en yaygın veri aracı", "Still the most widely used data tool"),
  description: L(
    "Excel'i küçümseme: veri analistlerinin işe alım mülakatlarında en çok test edilen araç odur. Bu patika, tablo yapısından PivotTable'a, XLOOKUP'tan Power Query'ye kadar profesyonel kullanımı öğretir.",
    "Do not underestimate Excel: it is the tool most often tested in data analyst interviews. This track covers professional use from table structure to PivotTables, XLOOKUP and Power Query.",
  ),
  levels: [
    {
      id: "beginner",
      title: L("Başlangıç — Doğru tablo, doğru formül", "Beginner — Proper tables, proper formulas"),
      description: L(
        "Veriyi analiz edilebilir biçimde tutmak ve temel formülleri güvenle kullanmak.",
        "Keeping data in an analysable shape and using the core formulas with confidence.",
      ),
      projectSlug: "excel-satis-ozeti",
      lessons: [
        lesson({
          slug: "duzgun-veri",
          title: L("Düzgün veri nasıl görünür?", "What tidy data looks like"),
          summary: L(
            "Analizin zorluğu genellikle formülde değil, tablonun yapısındadır.",
            "The difficulty in analysis is rarely the formula; it is the shape of the table.",
          ),
          minutes: 12,
          blocks: [
            text(
              "Analiz edilebilir bir tablonun kuralları:\n\n1. Her sütun **bir değişken**, her satır **bir gözlem**\n2. İlk satır başlık, üstünde başka hiçbir şey yok — logo, boş satır, birleştirilmiş hücre yok\n3. **Birleştirilmiş hücre kullanma** — pivot ve formülleri bozar\n4. Bir hücrede tek değer — `\"Ankara / 2024\"` iki sütun olmalı\n5. Toplam satırlarını verinin **içine** koyma; ayrı bir özet alanına al\n6. Veriyi `Ctrl+T` ile **Tablo**'ya çevir — adlandırılmış aralık, otomatik genişleme ve okunur formüller gelir",
              "The rules of an analysable table:\n\n1. One **variable** per column, one **observation** per row\n2. Headers on the first row, nothing above them — no logo, blank row or merged cell\n3. **Never merge cells** — it breaks pivots and formulas\n4. One value per cell — `\"Ankara / 2024\"` should be two columns\n5. Keep total rows **out** of the data; put them in a separate summary area\n6. Convert the range to a **Table** with `Ctrl+T` — you get a named range, auto-expansion and readable formulas",
            ),
            pitfall(
              "Birleştirilmiş hücrelerin bedeli",
              "The cost of merged cells",
              "Birleştirilmiş hücre görsel olarak düzenli görünür ama sıralama, filtreleme, pivot ve neredeyse her formül onunla bozulur. Aynı görünümü **Merge & Center** yerine `Format Cells → Alignment → Center Across Selection` ile veriyi bozmadan elde edersin.",
              "Merged cells look tidy but break sorting, filtering, pivots and nearly every formula. Get the same look without damaging the data using `Format Cells → Alignment → Center Across Selection` instead of Merge & Center.",
            ),
            quiz({
              id: "q1",
              q: [
                "Veriyi `Ctrl+T` ile Tablo'ya çevirmenin en önemli faydası nedir?",
                "What is the main benefit of converting a range to a Table with `Ctrl+T`?",
              ],
              options: [
                [
                  "Yeni satır eklendiğinde formüller ve pivotlar aralığı otomatik genişletir",
                  "Formulas and pivots expand automatically when new rows are added",
                ],
                ["Dosya boyutu küçülür", "The file gets smaller"],
                ["Renkler otomatik atanır", "Colours are assigned automatically"],
                ["Formüller daha hızlı hesaplanır", "Formulas calculate faster"],
              ],
              answer: 0,
              explain: [
                "Tablo yapısı dinamiktir: `=SUM(Satis[Tutar])` yazdığında yarın 500 satır daha eklensen bile formülü güncellemen gerekmez. Sabit aralık (`A2:A100`) kullanan dosyalarda en sık görülen hata budur.",
                "A Table is dynamic: write `=SUM(Sales[Amount])` and you never touch it again, even after 500 more rows arrive. Fixed ranges like `A2:A100` are the single most common source of stale numbers.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "formuller",
          title: L("Arama ve koşul formülleri", "Lookup and conditional formulas"),
          summary: L(
            "XLOOKUP, SUMIFS, IFS: günlük analiz işinin %90'ını bu üçlü çözer.",
            "XLOOKUP, SUMIFS, IFS: this trio covers 90% of day-to-day analysis.",
          ),
          minutes: 15,
          blocks: [
            code(
              "javascript",
              `// XLOOKUP — VLOOKUP'ın her açıdan iyisi
=XLOOKUP(A2; Urunler[Kod]; Urunler[Fiyat]; "bulunamadı")

// Koşullu toplama / sayma / ortalama
=SUMIFS(Satis[Tutar]; Satis[Sehir]; "İstanbul"; Satis[Yil]; 2024)
=COUNTIFS(Satis[Segment]; "kurumsal")
=AVERAGEIFS(Satis[Tutar]; Satis[Kategori]; "Elektronik")

// Koşullu mantık
=IFS(B2>100000; "yüksek"; B2>50000; "orta"; TRUE; "düşük")
=IFERROR(A2/B2; 0)

// Dinamik diziler (Microsoft 365)
=UNIQUE(Satis[Sehir])
=SORT(FILTER(Satis; Satis[Tutar]>1000); 3; -1)
=TEXTSPLIT(A2; " / ")`,
            ),
            text(
              "**XLOOKUP neden VLOOKUP'tan iyi?**\n\n- Sola doğru arama yapabilir (VLOOKUP yapamaz)\n- Sütun numarası yerine doğrudan sütun aralığı alır; sütun eklenince bozulmaz\n- Bulunamadı durumunu dördüncü argümanla yönetir, `IFERROR` sarmalamana gerek kalmaz\n- Varsayılanı **tam eşleşme**'dir; VLOOKUP'ın yaklaşık eşleşme varsayılanı sessiz hataların klasik kaynağıdır",
              "**Why XLOOKUP beats VLOOKUP:**\n\n- It can look to the left (VLOOKUP cannot)\n- It takes a column range instead of a column number, so inserting a column does not break it\n- It handles \"not found\" in its fourth argument, no `IFERROR` wrapper needed\n- It defaults to an **exact match**; VLOOKUP's approximate-match default is a classic source of silent errors",
            ),
            info(
              "Mutlak ve göreli referans",
              "Absolute vs relative references",
              "`A1` kopyalandığında kayar, `$A$1` sabit kalır, `$A1` sütunu sabitler, `A$1` satırı sabitler. `F4` tuşu bu dördü arasında sırayla geçiş yapar. Çapraz tablo formüllerinde doğru `$` yerleşimi, formülü bir kez yazıp her yere kopyalayabilmen demektir.",
              "`A1` shifts when copied, `$A$1` stays put, `$A1` locks the column and `A$1` locks the row. `F4` cycles through all four. In a cross-tab, getting the `$` right means writing the formula once and copying it everywhere.",
            ),
            quiz({
              id: "q1",
              q: [
                "İstanbul'daki 2024 yılı satışlarının toplamını hangi formül verir?",
                "Which formula sums 2024 sales in İstanbul?",
              ],
              options: [
                [
                  "`=SUMIFS(Satis[Tutar]; Satis[Sehir]; \"İstanbul\"; Satis[Yil]; 2024)`",
                  "`=SUMIFS(Sales[Amount]; Sales[City]; \"İstanbul\"; Sales[Year]; 2024)`",
                ],
                ["`=SUMIF(Satis[Tutar]; \"İstanbul\"; 2024)`", "`=SUMIF(Sales[Amount]; \"İstanbul\"; 2024)`"],
                ["`=SUM(Satis[Tutar]; \"İstanbul\")`", "`=SUM(Sales[Amount]; \"İstanbul\")`"],
                ["`=COUNTIFS(Satis[Tutar]; \"İstanbul\")`", "`=COUNTIFS(Sales[Amount]; \"İstanbul\")`"],
              ],
              answer: 0,
              explain: [
                "`SUMIFS` önce toplanacak aralığı, sonra koşul çiftlerini (aralık; ölçüt) alır ve istediğin kadar koşul ekleyebilirsin. Tek koşullu `SUMIF`'te argüman sırası tersidir — bu ikisini karıştırmak sık yapılan bir hatadır.",
                "`SUMIFS` takes the sum range first, then pairs of (range; criteria), and accepts as many pairs as you need. Single-condition `SUMIF` reverses the argument order — mixing them up is a common mistake.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "intermediate",
      title: L("Orta — PivotTable ve Power Query", "Intermediate — PivotTables and Power Query"),
      description: L(
        "Elle formül yazmadan özet üret, tekrarlayan temizliği otomatikleştir.",
        "Summarise without hand-written formulas and automate repetitive cleaning.",
      ),
      projectSlug: "excel-aylik-rapor",
      lessons: [
        lesson({
          slug: "pivot",
          title: L("PivotTable ile özetleme", "Summarising with PivotTables"),
          summary: L(
            "Beş dakikada, tek satır formül yazmadan çok boyutlu özet.",
            "A multi-dimensional summary in five minutes, without writing a single formula.",
          ),
          minutes: 14,
          blocks: [
            text(
              "PivotTable dört alandan oluşur:\n\n- **Rows** — satır başlıkları (boyut)\n- **Columns** — sütun başlıkları (ikinci boyut)\n- **Values** — hesaplanan metrik (ölçü)\n- **Filters** — sayfa düzeyi filtre\n\nAynı alanı `Values`'a iki kez atıp birini \"% of Column Total\" olarak ayarlarsan hem tutarı hem payı yan yana gösterebilirsin.",
              "A PivotTable has four zones:\n\n- **Rows** — row headers (a dimension)\n- **Columns** — column headers (a second dimension)\n- **Values** — the computed metric (a measure)\n- **Filters** — page-level filter\n\nDrop the same field into `Values` twice and set one to \"% of Column Total\" to show the amount and the share side by side.",
            ),
            tip(
              "Slicer ve Timeline",
              "Slicers and Timelines",
              "`Insert → Slicer` ile tıklanabilir filtre düğmeleri, `Insert → Timeline` ile tarih kaydırıcısı eklersin. Bir slicer'ı birden çok pivota bağlamak için `Report Connections` kullan — böylece tek tıkla tüm sayfa aynı anda filtrelenir ve elinde çalışan bir pano olur.",
              "`Insert → Slicer` gives you clickable filter buttons and `Insert → Timeline` a date slider. Use `Report Connections` to wire one slicer to several pivots — one click then filters the whole sheet and you effectively have a dashboard.",
            ),
            order({
              id: "o1",
              prompt: [
                "Excel'de aylık satış panosu kurma adımlarını sıraya diz.",
                "Order the steps for building a monthly sales dashboard in Excel.",
              ],
              lines: [
                "Ham veriyi Ctrl+T ile Tablo'ya çevir ve tabloya isim ver",
                "Power Query ile tipleri düzelt ve gereksiz sütunları at",
                "Insert → PivotTable ile özet tablo oluştur",
                "Rows'a Kategori, Values'a Tutar (Sum) yerleştir",
                "Slicer ve Timeline ekleyip pivotlara bağla",
                "PivotChart ekle ve panoyu tek sayfada düzenle",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "advanced",
      title: L("İleri — Otomasyon ve model", "Advanced — Automation and modelling"),
      description: L(
        "Power Pivot, veri modeli, DAX ölçüleri ve Excel'in sınırlarını bilmek.",
        "Power Pivot, the data model, DAX measures — and knowing Excel's limits.",
      ),
      projectSlug: "excel-otomatik-pano",
      lessons: [
        lesson({
          slug: "power-pivot-ve-sinirlar",
          title: L("Power Pivot ve Excel'in sınırları", "Power Pivot and the limits of Excel"),
          summary: L(
            "Excel'de nereye kadar gidilir, ne zaman Power BI'a geçilir?",
            "How far Excel takes you, and when to move to Power BI.",
          ),
          minutes: 15,
          blocks: [
            text(
              "**Power Pivot**, Excel'in içindeki veri modelidir: birden çok tabloyu ilişkilendirir, milyonlarca satırı sıkıştırarak tutar ve DAX ölçüleri yazmanı sağlar. Power BI'ın motorunun aynısıdır — Power Pivot öğrenmek, Power BI'ın yarısını öğrenmektir.",
              "**Power Pivot** is Excel's built-in data model: it relates multiple tables, compresses millions of rows and lets you write DAX measures. It is the same engine as Power BI — learning Power Pivot is learning half of Power BI.",
            ),
            code(
              "dax",
              `Toplam Ciro = SUM(Satis[Tutar])
Sipariş Sayısı = DISTINCTCOUNT(Satis[SiparisNo])
Ortalama Sepet = DIVIDE([Toplam Ciro]; [Sipariş Sayısı])
Geçen Yıl = CALCULATE([Toplam Ciro]; SAMEPERIODLASTYEAR(Tarih[Tarih]))`,
              "Power Pivot ölçüleri — Power BI ile birebir aynı söz dizimi",
              "Power Pivot measures — identical syntax to Power BI",
            ),
            text(
              "**Excel'den çıkma zamanı geldi** dediren işaretler:\n\n- Dosya 50 MB'ı geçiyor veya açılması dakikalar sürüyor\n- Aynı raporu her ay elle güncelliyorsun\n- Birden fazla kişi aynı dosyayı aynı anda düzenlemek zorunda\n- Satır sayısı 1.048.576 sınırına yaklaşıyor\n- \"Hangi dosya güncel?\" sorusu ekipte düzenli soruluyor\n\nBu maddelerden ikisi doğruysa Power BI veya bir veritabanı, harcadığın zamanı kısa sürede geri öder.",
              "Signs it is **time to leave Excel**:\n\n- The file passes 50 MB or takes minutes to open\n- You rebuild the same report by hand every month\n- More than one person needs to edit the same file at once\n- Row counts approach the 1,048,576 limit\n- \"Which file is the current one?\" is a regular question in the team\n\nIf two of these are true, moving to Power BI or a database pays for itself quickly.",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir Excel sayfası en fazla kaç satır alır?",
                "How many rows can a single Excel sheet hold?",
              ],
              options: [
                ["1.048.576", "1,048,576"],
                ["65.536", "65,536"],
                ["10.000.000", "10,000,000"],
                ["Sınır yok", "There is no limit"],
              ],
              answer: 0,
              explain: [
                "2007'den beri sınır 1.048.576 satır (2²⁰). Power Pivot veri modeli bu sınırın **üstünde** veri tutabilir, çünkü veri sayfada değil sıkıştırılmış modelde durur — ama sayfaya döktüğün anda sınır geri gelir.",
                "Since 2007 the limit is 1,048,576 rows (2²⁰). The Power Pivot data model can hold **more** than that because the data lives in a compressed model rather than a sheet — but the limit returns the moment you spill it onto a sheet.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
