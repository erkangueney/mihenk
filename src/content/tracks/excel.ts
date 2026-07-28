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
      id: "foundation",
      title: L("Excel'e giriş", "Getting started with Excel"),
      description: L(
        "Hücre, referans ve ilk formüller: elektronik tablonun nasıl düşündüğünü anlamak.",
        "Cells, references and first formulas: understanding how a spreadsheet thinks.",
      ),
      lessons: [
        lesson({
          slug: "hucre-ve-referans",
          title: L("Hücre, referans ve $ işareti", "Cells, references and the $ sign"),
          summary: L(
            "Formülü kopyaladığında neden bozuluyor? Cevap tek bir karakterde.",
            "Why does your formula break when you copy it? The answer is one character.",
          ),
          minutes: 12,
          blocks: [
            text(
              "Excel'in tamamı **hücre referansları** üzerine kuruludur. `A1` yazdığında Excel \"A sütunu, 1. satır\" der. Üç referans türü vardır ve aralarındaki fark, formülü kopyaladığında ortaya çıkar:\n\n- **Göreli** — `A1`. Formülü bir satır aşağı kopyalarsan `A2` olur. Excel'in varsayılanı.\n- **Mutlak** — `$A$1`. Nereye kopyalarsan kopyala `$A$1` kalır.\n- **Karma** — `$A1` (sütun sabit, satır kayar) veya `A$1` (satır sabit, sütun kayar).\n\nKlavye kısayolu: hücre referansının üzerinde **F4** tuşuna basarak dört tür arasında geçiş yaparsın.",
              "All of Excel rests on **cell references**. Type `A1` and Excel reads \"column A, row 1\". There are three kinds, and the difference shows up when you copy a formula:\n\n- **Relative** — `A1`. Copy the formula one row down and it becomes `A2`. Excel's default.\n- **Absolute** — `$A$1`. Wherever you copy it, it stays `$A$1`.\n- **Mixed** — `$A1` (column fixed, row moves) or `A$1` (row fixed, column moves).\n\nKeyboard shortcut: with the cursor on a reference, press **F4** to cycle through the four forms.",
            ),
            code(
              "excel",
              `# KDV oranı D1 hücresinde duruyor (0,20)

=C2*D1        # YANLIŞ: aşağı kopyalayınca D2, D3... olur ve boş hücreye bakar
=C2*$D$1      # DOĞRU: oran hep D1'de kalır

# Yüzde payı hesabı — toplam B10'da
=B2/$B$10     # aşağı kopyalanabilir, bölen sabit kalır`,
            ),
            pitfall(
              "En sık görülen Excel hatası budur",
              "This is the single most common Excel error",
              "Bir formülü aşağı çekmek Excel'in en çok kullanılan hareketidir — ve sabitlenmesi gereken referansı sabitlememek en çok yapılan hatadır. Sonuç genellikle **hata mesajı vermez**: bölen boş hücre olur, Excel sıfır sayar ve `#DIV/0!` verir; ya da daha kötüsü, yanlış bir hücreye bakar ve **makul görünen ama yanlış** bir sayı üretir.\n\nAlışkanlık: bir formülde bir hücre \"sabit\" olacaksa, yazarken hemen F4'e bas. Sonra düzeltmek için hatayı bulmayı bekleme.",
              "Dragging a formula down is Excel's most-used gesture — and forgetting to fix the reference that should stay fixed is the most common mistake. It usually produces **no error message**: the divisor becomes an empty cell, Excel treats it as zero and shows `#DIV/0!`; or worse, it points at the wrong cell and produces a number that **looks plausible but is wrong**.\n\nThe habit: the moment you write a reference that must stay fixed, press F4. Do not wait to find the bug later.",
            ),
            quiz({
              id: "q1",
              q: [
                "`=B2*$C$1` formülünü B3 hücresine kopyalarsan ne olur?",
                "If you copy `=B2*$C$1` into cell B3, what does it become?",
              ],
              options: [
                ["`=B3*$C$1`", "`=B3*$C$1`"],
                ["`=B3*$C$2`", "`=B3*$C$2`"],
                ["`=B2*$C$1` aynı kalır", "`=B2*$C$1` stays identical"],
                ["`=B2*$C$2`", "`=B2*$C$2`"],
              ],
              answer: 0,
              explain: [
                "`B2` göreli olduğu için bir satır kayar ve `B3` olur. `$C$1` ise mutlak olduğu için hiç değişmez. Karma referansların tüm mantığı buradadır: neyin kaymasını, neyin sabit kalmasını istediğine karar verirsin.",
                "`B2` is relative so it shifts one row down to `B3`. `$C$1` is absolute so it never changes. This is the whole logic of mixed references: you decide what moves and what stays.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "temel-fonksiyonlar",
          title: L("Temel fonksiyonlar ve hata mesajları", "Core functions and error messages"),
          summary: L(
            "TOPLA, ORTALAMA, EĞERSAY ve bir hücrede `#YOK` gördüğünde ne yapmalı?",
            "SUM, AVERAGE, COUNTIF — and what to do when a cell shows `#N/A`.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Günlük işin %80'ini şu fonksiyonlar çözer (Türkçe / İngilizce):\n\n- **TOPLA / SUM** — toplar\n- **ORTALAMA / AVERAGE** — ortalama alır\n- **EĞERSAY / COUNTIF** — koşula uyanları sayar\n- **TOPLAKOŞUL / SUMIF** — koşula uyanları toplar\n- **EĞER / IF** — koşullu değer üretir\n- **MİN, MAK / MIN, MAX** — en küçük, en büyük\n- **BENZERSİZ / UNIQUE** — tekrarsız liste (Excel 365)\n\nÇoğullu koşul isteyen sürümleri `ÇOKEĞERSAY / COUNTIFS` ve `ÇOKETOPLA / SUMIFS`'tir ve gerçek işte daha sık kullanılırlar.",
              "These functions solve 80% of daily work:\n\n- **SUM** — adds up\n- **AVERAGE** — takes a mean\n- **COUNTIF** — counts what matches a condition\n- **SUMIF** — sums what matches a condition\n- **IF** — produces a conditional value\n- **MIN, MAX** — smallest and largest\n- **UNIQUE** — a de-duplicated list (Excel 365)\n\nThe multi-condition versions are `COUNTIFS` and `SUMIFS`, and in real work they come up more often.",
            ),
            code(
              "excel",
              `=TOPLA(B2:B100)                          # tüm tutarları topla
=ORTALAMA(B2:B100)                       # ortalama tutar
=EĞERSAY(C2:C100;"İstanbul")             # kaç sipariş İstanbul'dan
=TOPLAKOŞUL(C2:C100;"İstanbul";B2:B100)  # İstanbul'un toplam cirosu

# Çoklu koşul — gerçek işte en çok kullanılan
=ÇOKETOPLA(B2:B100; C2:C100;"İstanbul"; D2:D100;"teslim")

# Koşullu değer
=EĞER(B2>10000;"büyük";"normal")`,
            ),
            text(
              "**Hata mesajlarını okumak** hata ayıklamanın yarısıdır:\n\n- **`#YOK` / `#N/A`** — Arama fonksiyonu değeri bulamadı. Genelde boşluk karakteri veya tip uyuşmazlığı yüzündendir.\n- **`#BAŞV!` / `#REF!`** — Formülün baktığı hücre silinmiş.\n- **`#DEĞER!` / `#VALUE!`** — Sayı beklenen yerde metin var.\n- **`#SAYI/0!` / `#DIV/0!`** — Sıfıra veya boş hücreye bölme.\n- **`#AD?` / `#NAME?`** — Fonksiyon adı yanlış yazılmış.\n- **`######`** — Hata değil! Sütun içeriği göstermek için çok dar; genişletmen yeterli.",
              "**Reading error messages** is half of debugging:\n\n- **`#N/A`** — a lookup could not find the value. Usually a stray space or a type mismatch.\n- **`#REF!`** — the cell the formula pointed at has been deleted.\n- **`#VALUE!`** — text sits where a number was expected.\n- **`#DIV/0!`** — division by zero or by an empty cell.\n- **`#NAME?`** — the function name is misspelled.\n- **`######`** — not an error! The column is too narrow to display the content; just widen it.",
            ),
            tip(
              "Hatayı gizlemek yerine ele al",
              "Handle errors rather than hiding them",
              "`EĞERHATA / IFERROR` ile hatayı temiz bir mesaja çevirebilirsin: `=EĞERHATA(DÜŞEYARA(...);\"bulunamadı\")`.\n\nAma dikkat: `EĞERHATA(...;0)` yazıp hatayı sıfıra çevirmek tehlikelidir. Hata gerçek bir veri probleminin habercisiyse, onu sıfıra çevirmek problemi **gizler** ve toplamların sessizce eksik çıkmasına yol açar. Hatayı yalnızca **beklediğin ve zararsız olduğunu bildiğin** durumlarda bastır.",
              "`IFERROR` turns an error into a clean message: `=IFERROR(VLOOKUP(...),\"not found\")`.\n\nBut beware: writing `IFERROR(...,0)` to turn errors into zero is dangerous. If the error signals a genuine data problem, converting it to zero **hides** that problem and makes your totals quietly too low. Only suppress an error when you **expect it and know it is harmless**.",
            ),
            quiz({
              id: "q1",
              q: [
                "DÜŞEYARA formülü `#YOK` veriyor ama aradığın değerin listede olduğunu görüyorsun. En olası sebep?",
                "Your VLOOKUP returns `#N/A` although you can see the value in the list. The most likely cause?",
              ],
              options: [
                [
                  "Değerlerden birinde görünmeyen boşluk var veya biri metin diğeri sayı",
                  "One of the values has an invisible space, or one is text and the other a number",
                ],
                ["Excel sürümü eski", "The Excel version is out of date"],
                ["Liste sıralı değil", "The list is not sorted"],
                ["Formül yanlış yazılmış", "The formula is misspelled"],
              ],
              answer: 0,
              explain: [
                "Gözle aynı görünen iki değer Excel için farklı olabilir: `\"1001 \"` ile `\"1001\"` veya metin `\"1001\"` ile sayı `1001`. Çözüm: `KIRP / TRIM` ile boşlukları temizle, `=A2=B2` ile gerçekten eşit olduklarını sına ve gerekiyorsa `SAYIYAÇEVİR / VALUE` ile tipleri hizala.",
                "Two values that look identical can differ to Excel: `\"1001 \"` versus `\"1001\"`, or the text `\"1001\"` versus the number `1001`. The fix: clean spaces with `TRIM`, test real equality with `=A2=B2`, and align types with `VALUE` where needed.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "bicimlendirme-ve-tablo",
          title: L("Biçimlendirme ve Tablo nesnesi", "Formatting and the Table object"),
          summary: L(
            "Ctrl+T tuşuna basmak, Excel'de yapabileceğin en kârlı tek hareket.",
            "Pressing Ctrl+T is the single highest-return move you can make in Excel.",
          ),
          minutes: 12,
          blocks: [
            text(
              "Bir veri aralığını seçip **Ctrl+T** ile Tablo'ya çevirmek Excel'in en az bilinen ama en değerli özelliğidir. Kazandırdıkları:\n\n- **Otomatik genişleme** — Alta yeni satır eklediğinde formüller, PivotTable'lar ve grafikler kendiliğinden kapsar. Aralığı elle güncellemek zorunda kalmazsın.\n- **Yapılandırılmış referans** — `=TOPLA(Satis[Tutar])` yazarsın; `=TOPLA(B2:B4718)` yerine. Formül altı ay sonra da okunur.\n- **Otomatik biçim ve süzgeç** — Başlık satırı sabitlenir, süzgeç okları gelir.\n- **Toplam satırı** — Tek tıkla alta özet ekler.\n\nTabloya bir isim ver (Tablo Tasarımı → Tablo Adı): `Satis`, `Musteriler` gibi. Formüllerin okunabilirliği tamamen değişir.",
              "Selecting a data range and pressing **Ctrl+T** to make it a Table is Excel's least-known but most valuable feature. What it buys you:\n\n- **Automatic expansion** — add a row at the bottom and formulas, PivotTables and charts include it by themselves. You never update ranges by hand.\n- **Structured references** — you write `=SUM(Sales[Amount])` instead of `=SUM(B2:B4718)`. The formula is still readable six months later.\n- **Automatic formatting and filters** — the header row freezes and filter arrows appear.\n- **A totals row** — one click adds a summary at the bottom.\n\nGive the table a name (Table Design → Table Name): `Sales`, `Customers`. It transforms how readable your formulas are.",
            ),
            text(
              "**Biçimlendirmede iki kural:**\n\n1. **Biçim ile veriyi karıştırma.** Bir hücreye `1.899 TL` yazmak yerine `1899` yaz ve hücreyi para birimi olarak **biçimlendir**. Böylece sayı hâlâ sayıdır ve üzerinde işlem yapılabilir. Metin olarak yazılmış \"sayılar\" toplanamaz.\n\n2. **Koşullu biçimlendirmeyi ölçülü kullan.** Veri çubukları ve renk skalaları bir tabloyu okunur kılar; ama her hücre renkliyse hiçbir şey öne çıkmaz. Kural: yalnızca **karar verilecek** sütuna uygula.",
              "**Two rules for formatting:**\n\n1. **Do not mix format with data.** Instead of typing `1,899 USD` into a cell, type `1899` and **format** the cell as currency. That way the number is still a number and can be computed with. \"Numbers\" typed as text cannot be summed.\n\n2. **Use conditional formatting sparingly.** Data bars and colour scales make a table readable; but if every cell is coloured, nothing stands out. The rule: apply it only to the column a **decision** will be made on.",
            ),
            quiz({
              id: "q1",
              q: [
                "Verini Ctrl+T ile Tablo'ya çevirmenin en pratik faydası nedir?",
                "What is the most practical benefit of converting your data to a Table with Ctrl+T?",
              ],
              options: [
                [
                  "Yeni satır eklendiğinde formüller ve PivotTable'lar otomatik olarak kapsar",
                  "When you add a row, formulas and PivotTables include it automatically",
                ],
                ["Dosya boyutu küçülür", "The file gets smaller"],
                ["Excel daha hızlı açılır", "Excel opens faster"],
                ["Formüller otomatik yazılır", "Formulas are written for you"],
              ],
              answer: 0,
              explain: [
                "Sabit aralıklarla (`B2:B500`) çalışan raporlar, veri büyüdüğünde sessizce eksik hesaplar — 501. satır hesaba girmez ve kimse fark etmez. Tablo bu hata sınıfını tamamen ortadan kaldırır; bu yüzden düzenli güncellenen her dosyada ilk yapılacak iş Ctrl+T'dir.",
                "Reports built on fixed ranges (`B2:B500`) quietly under-count as the data grows — row 501 is excluded and nobody notices. A Table eliminates this entire class of bug, which is why Ctrl+T is the first thing to do in any file that gets updated regularly.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "junior",
      title: L("Doğru tablo, doğru formül", "Proper tables, proper formulas"),
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
        lesson({
          slug: "metin-ve-tarih-fonksiyonlari",
          title: L("Metin ve tarih fonksiyonları", "Text and date functions"),
          summary: L(
            "Dağınık gelen sütunları temizlemek: ayırmak, birleştirmek, tarihi düzeltmek.",
            "Cleaning up messy columns: splitting, joining and fixing dates.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Gerçek veri hiç temiz gelmez. En sık gereken metin fonksiyonları:\n\n- **KIRP / TRIM** — baştaki, sondaki ve fazla iç boşlukları siler. Arama hatalarının çözümü genelde budur.\n- **SOLDAN, SAĞDAN, PARÇAAL / LEFT, RIGHT, MID** — metnin bir kısmını alır\n- **BUL / SEARCH** — bir karakterin kaçıncı sırada olduğunu bulur\n- **YERİNEKOY / SUBSTITUTE** — bir metni başka metinle değiştirir\n- **BİRLEŞTİR / TEXTJOIN** — birden çok hücreyi ayıraçla birleştirir\n- **METİNBÖL / TEXTSPLIT** — bir hücreyi ayıraçtan bölerek birden çok hücreye dağıtır (Excel 365)\n- **UZUNLUK / LEN** — karakter sayısı. Görünmeyen boşlukları tespit etmenin en hızlı yolu.",
              "Real data never arrives clean. The text functions you will need most:\n\n- **TRIM** — removes leading, trailing and extra internal spaces. This is usually the fix for lookup failures.\n- **LEFT, RIGHT, MID** — take part of a string\n- **SEARCH** — find the position of a character\n- **SUBSTITUTE** — replace one piece of text with another\n- **TEXTJOIN** — combine several cells with a delimiter\n- **TEXTSPLIT** — split one cell across several by a delimiter (Excel 365)\n- **LEN** — character count. The fastest way to detect invisible spaces.",
            ),
            code(
              "excel",
              `# "Elif Kaya" -> ad ve soyad ayrı sütunlara
=SOLDAN(A2; BUL(" "; A2) - 1)                    # Elif
=SAĞDAN(A2; UZUNLUK(A2) - BUL(" "; A2))          # Kaya

# Görünmeyen boşluk avı: iki sayı farklıysa boşluk var
=UZUNLUK(A2)          # 10
=UZUNLUK(KIRP(A2))    # 9  -> fazla boşluk vardı

# Tarih parçalama ve kurma
=YIL(A2)  =AY(A2)  =GÜN(A2)                      # yıl, ay, gün
=METİNEÇEVİR(A2; "yyyy-mm")                      # 2024-08 biçiminde grup anahtarı
=TARİH(YIL(A2); AY(A2); 1)                       # ayın ilk günü — aylık gruplama için
=BUGÜN() - A2                                    # kaç gün geçti`,
            ),
            pitfall(
              "Tarih olarak görünen metinler",
              "Text that only looks like a date",
              "CSV'den gelen tarihler çok sık **metin** olarak yüklenir. Belirtisi: hücre sola yaslanmıştır (Excel sayı ve tarihleri sağa yaslar) ve `YIL()` fonksiyonu hata verir.\n\nÇözüm sırası: önce sütunu seç → Veri sekmesi → **Metni Sütunlara Dönüştür** → tarih biçimini seç. Ya da `TARİHSAYISI / DATEVALUE` fonksiyonuyla çevir.\n\nTürkçe Excel'de ek bir tuzak: `01/02/2024` sistem ayarına göre 1 Şubat ya da 2 Ocak olarak okunabilir. Belirsizliği tamamen ortadan kaldırmak için veri kaynağından **`YYYY-MM-DD`** biçimi istemek en güvenli yoldur.",
              "Dates from a CSV very often load as **text**. The symptom: the cell is left-aligned (Excel right-aligns numbers and dates) and `YEAR()` raises an error.\n\nThe fix, in order: select the column → Data tab → **Text to Columns** → choose the date format. Or convert with `DATEVALUE`.\n\nAn extra trap: `01/02/2024` may be read as 1 February or 2 January depending on locale. The safest way to eliminate the ambiguity entirely is to ask the source system for the **`YYYY-MM-DD`** format.",
            ),
            quiz({
              id: "q1",
              q: [
                "Siparişleri aya göre gruplamak istiyorsun. Hangi yaklaşım en güvenlidir?",
                "You want to group orders by month. Which approach is safest?",
              ],
              options: [
                [
                  "`=METİNEÇEVİR(tarih;\"yyyy-mm\")` ile `2024-08` gibi bir anahtar üretmek",
                  "Produce a key like `2024-08` with `=TEXT(date,\"yyyy-mm\")`",
                ],
                ["Yalnızca `=AY(tarih)` kullanmak", "Use `=MONTH(date)` alone"],
                ["Tarihi metin olarak bırakmak", "Leave the date as text"],
                ["Elle ay sütunu yazmak", "Type the month column by hand"],
              ],
              answer: 0,
              explain: [
                "Yalnızca `AY()` kullanırsan 2023 Ağustos ile 2024 Ağustos aynı gruba düşer ve iki yılın verisi birbirine karışır. `yyyy-mm` biçimi yılı da içerdiği için hem tekildir hem alfabetik sıralandığında kronolojik sırayı korur.",
                "With `MONTH()` alone, August 2023 and August 2024 fall into the same bucket and two years of data merge. The `yyyy-mm` form includes the year, so it is unique and also sorts chronologically when sorted alphabetically.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "mid",
      title: L("PivotTable ve Power Query", "PivotTables and Power Query"),
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
        lesson({
          slug: "power-query-temizlik",
          title: L("Power Query ile tekrarlanabilir temizlik", "Repeatable cleaning with Power Query"),
          summary: L(
            "Elle temizlediğin veriyi bir daha elle temizleme: adımları kaydet, her ay yenile.",
            "Never clean the same data by hand twice: record the steps and refresh monthly.",
          ),
          minutes: 18,
          blocks: [
            text(
              "Excel'de bir dosyayı elle temizlemek — sütun silmek, bul-değiştir yapmak, tipleri düzeltmek — her ay yeniden yapılması gereken bir iştir. **Power Query** bu işi bir kez yapmanı ve **adımları kaydetmesini** sağlar. Ertesi ay yeni dosyayı koyup **Yenile** dersin; tüm adımlar sırayla tekrar uygulanır.\n\nErişim: Veri sekmesi → **Veri Al ve Dönüştür**. Kaynak olarak CSV, Excel, klasör, veritabanı, web sayfası seçebilirsin.",
              "Cleaning a file by hand in Excel — deleting columns, find-and-replace, fixing types — is work you must redo every month. **Power Query** lets you do it once and **records the steps**. Next month you drop in the new file and press **Refresh**; every step replays in order.\n\nWhere to find it: Data tab → **Get & Transform Data**. Sources include CSV, Excel, a folder, a database or a web page.",
            ),
            text(
              "**En çok kullanılan dönüşümler:**\n\n- **Sütun kaldır / tut** — gereksiz sütunları at\n- **Veri tipini değiştir** — metin gelen sayıyı ve tarihi düzelt\n- **Sütunu böl** — ayıraçtan veya karakter sayısından\n- **Değiştir** — bul-değiştir, ama kayıtlı ve tekrarlanabilir\n- **Kaldırılmış yinelenenler** — tekrarlı satırları temizle\n- **Sütunu ters çevir (Unpivot)** — geniş tabloyu uzun biçime çevirir. Aylar sütun olarak gelmiş bir tabloyu analiz edilebilir hâle getirmenin tek doğru yolu.\n- **Sorguları birleştir (Merge)** — JOIN karşılığı; iki tabloyu anahtar üzerinden eşler\n- **Sorguları ekle (Append)** — UNION karşılığı; tabloları alt alta yığar\n- **Klasörden içe aktar** — bir klasördeki **tüm** dosyaları tek tabloda toplar",
              "**The most-used transformations:**\n\n- **Remove / keep columns** — drop what you do not need\n- **Change data type** — fix numbers and dates that arrived as text\n- **Split column** — by delimiter or character count\n- **Replace values** — find-and-replace, but recorded and repeatable\n- **Remove duplicates** — clear repeated rows\n- **Unpivot columns** — turns a wide table into long form. The only correct way to make a table whose months arrived as columns analysable.\n- **Merge queries** — the JOIN equivalent; matches two tables on a key\n- **Append queries** — the UNION equivalent; stacks tables on top of each other\n- **Import from folder** — collects **every** file in a folder into one table",
            ),
            tip(
              "Klasörden içe aktarma sihirdir",
              "Import from folder is the magic trick",
              "Her ay gelen 12 aylık rapor dosyasını tek tek açıp kopyalamak yerine, hepsini bir klasöre koy ve Power Query'de **Klasörden** kaynağını seç. Power Query klasördeki tüm dosyaları okur, aynı şekilde dönüştürür ve alt alta ekler.\n\nGelecek ay 13. dosyayı klasöre atıp Yenile demen yeterlidir. Yıllarca süren bir manuel işi bir kereye indirir — ve Excel öğrenirken karşılaşacağın en yüksek getirili tek özellik budur.",
              "Instead of opening and copying twelve monthly report files one by one, put them in a folder and choose the **From Folder** source in Power Query. It reads every file, transforms them identically and stacks them.\n\nNext month you drop file thirteen into the folder and press Refresh. It reduces years of manual work to a one-off — and it is the single highest-return feature you will meet while learning Excel.",
            ),
            quiz({
              id: "q1",
              q: [
                "Aylar sütun olarak gelmiş bir tabloyu (Ocak, Şubat, Mart… her biri bir sütun) PivotTable'da kullanmak için ne yapmalısın?",
                "A table arrived with months as columns (January, February, March… each its own column). What must you do to use it in a PivotTable?",
              ],
              options: [
                [
                  "Power Query'de ay sütunlarını Unpivot ederek uzun biçime çevirmek",
                  "Unpivot the month columns in Power Query to get long form",
                ],
                ["Her ay için ayrı PivotTable kurmak", "Build a separate PivotTable per month"],
                ["Sütunları elle alt alta kopyalamak", "Copy the columns underneath each other by hand"],
                ["PivotTable bunu doğrudan destekler", "A PivotTable supports this directly"],
              ],
              answer: 0,
              explain: [
                "PivotTable'ın \"ay\" boyutunu kullanabilmesi için ay bilgisinin sütun **adında** değil, bir sütunun **değerinde** olması gerekir. Unpivot tam olarak bunu yapar: 12 sütunu \"Ay\" ve \"Tutar\" olmak üzere iki sütuna dönüştürür. Elle kopyalamak da aynı sonucu verir ama her ay tekrar edilmesi gerekir.",
                "For a PivotTable to use \"month\" as a dimension, the month must live in a column's **value**, not in the column **name**. Unpivot does exactly that: it turns 12 columns into two, \"Month\" and \"Amount\". Copying by hand gets the same result but must be repeated every month.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "senior",
      title: L("Otomasyon ve model", "Automation and modelling"),
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
        lesson({
          slug: "dinamik-diziler",
          title: L("Dinamik diziler ve modern formüller", "Dynamic arrays and modern formulas"),
          summary: L(
            "FİLTRE, BENZERSİZ, SIRALA ve XLOOKUP: Excel'in son on yıldaki en büyük değişimi.",
            "FILTER, UNIQUE, SORT and XLOOKUP: Excel's biggest change in a decade.",
          ),
          minutes: 18,
          blocks: [
            text(
              "Excel 365 ile gelen **dinamik diziler**, bir formülün tek hücre değil **birden çok hücre** döndürmesini sağlar. Sonuç otomatik olarak aşağıya \"dökülür\" (spill). Bu, eskiden PivotTable veya karmaşık dizi formülü gerektiren işleri tek satıra indirir.\n\n**Yeni temel fonksiyonlar:**\n\n- **FİLTRE / FILTER** — koşula uyan satırları döndürür\n- **BENZERSİZ / UNIQUE** — tekrarsız liste\n- **SIRALA / SORT** ve **SIRALAYAGÖRE / SORTBY** — sıralar\n- **XARA / XLOOKUP** — DÜŞEYARA'nın yerine geçen, her yöne bakabilen arama\n- **SEQUENCE, RANDARRAY** — seri ve rastgele dizi üretir",
              "**Dynamic arrays**, introduced with Excel 365, let a single formula return **many cells** rather than one. The result automatically \"spills\" downward. This reduces work that used to need a PivotTable or a complex array formula to a single line.\n\n**The new core functions:**\n\n- **FILTER** — returns the rows matching a condition\n- **UNIQUE** — a de-duplicated list\n- **SORT** and **SORTBY** — sorting\n- **XLOOKUP** — the replacement for VLOOKUP, able to look in any direction\n- **SEQUENCE, RANDARRAY** — generate series and random arrays",
            ),
            code(
              "excel",
              `# İstanbul'daki tüm siparişleri getir — tek formül, çok satır sonuç
=FİLTRE(Satis; Satis[Sehir]="İstanbul")

# Benzersiz şehir listesi, alfabetik
=SIRALA(BENZERSİZ(Satis[Sehir]))

# En yüksek 5 sipariş
=AL(SIRALAYAGÖRE(Satis; Satis[Tutar]; -1); 5)

# XLOOKUP: DÜŞEYARA'nın tüm sorunlarını çözer
=XARA(A2; Musteriler[No]; Musteriler[Ad]; "bulunamadı")
#      ara   nerede         ne döndür       bulunamazsa`,
            ),
            info(
              "Neden XLOOKUP, DÜŞEYARA'dan iyidir?",
              "Why XLOOKUP beats VLOOKUP",
              "**DÜŞEYARA'nın üç kronik sorunu:**\n\n1. Yalnızca **sağa** bakabilir — arama sütunu solda olmak zorundadır\n2. Sütun numarası verirsin (`3` gibi); araya yeni sütun eklenirse formül sessizce **yanlış sütuna** bakmaya başlar\n3. Varsayılanı yaklaşık eşleşmedir; `YANLIŞ` yazmayı unutmak sinsi hatalar üretir\n\n**XARA / XLOOKUP** üçünü de çözer: her yöne bakar, sütun numarası değil sütunun kendisini verirsin, varsayılanı tam eşleşmedir ve bulunamazsa ne döneceğini doğrudan yazabilirsin. 365 kullanıyorsan DÜŞEYARA'yı öğrenmene bile gerek yok.",
              "**VLOOKUP's three chronic problems:**\n\n1. It can only look **to the right** — the lookup column must be on the left\n2. You pass a column number (like `3`); insert a new column and the formula silently starts reading the **wrong** one\n3. Its default is approximate match; forgetting to write `FALSE` produces insidious bugs\n\n**XLOOKUP** fixes all three: it looks in any direction, you pass the column itself rather than a number, its default is exact match, and you can state directly what to return when nothing is found. If you are on 365 you need not even learn VLOOKUP.",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir dinamik dizi formülünün sonucu `#TAŞMA!` / `#SPILL!` hatası veriyor. Sebep nedir?",
                "A dynamic array formula returns a `#SPILL!` error. What is the cause?",
              ],
              options: [
                [
                  "Sonucun döküleceği alanda başka veri var; alanın boşaltılması gerekir",
                  "Something else occupies the area the result needs to spill into; that area must be cleared",
                ],
                ["Formül yanlış yazılmış", "The formula is misspelled"],
                ["Excel sürümü desteklemiyor", "The Excel version does not support it"],
                ["Veri çok büyük", "The data is too large"],
              ],
              answer: 0,
              explain: [
                "Dinamik dizi sonucunu aşağıya ve sağa doğru yayar; yolunda dolu bir hücre varsa yayılamaz ve `#TAŞMA!` verir. Çözüm engelleyen hücreleri temizlemektir. Bu hata, dinamik dizilere yeni geçenlerin en sık karşılaştığı durumdur.",
                "A dynamic array spreads its result down and to the right; if an occupied cell sits in the way it cannot spread and reports `#SPILL!`. The fix is to clear the blocking cells. This is the error people meet most often when moving to dynamic arrays.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "expert",
      title: L("Denetlenebilir ve paylaşılabilir çalışma kitapları", "Auditable, shareable workbooks"),
      description: L(
        "Başkasının güvenle kullanabileceği, hatasını kendisi yakalayan dosyalar kurmak.",
        "Building files other people can trust — files that catch their own errors.",
      ),
      lessons: [
        lesson({
          slug: "model-tasarimi-ve-denetim",
          title: L("Çalışma kitabı tasarımı ve denetim", "Workbook design and auditing"),
          summary: L(
            "Girdi, hesap ve çıktıyı ayır. Altı ay sonra dosyayı açan kişi seni anlasın.",
            "Separate inputs, calculations and outputs so whoever opens the file in six months understands it.",
          ),
          minutes: 20,
          blocks: [
            text(
              "Profesyonel finansal modellerin hepsi aynı üç katmanlı yapıyı kullanır ve her katman **ayrı sayfada** durur:\n\n1. **Girdi (input)** — Elle yazılan tüm varsayımlar ve ham veri. Tek doğruluk kaynağı. Genelde açık renkle işaretlenir.\n2. **Hesap (calculation)** — Tüm formüller. Buraya elle sayı yazılmaz; her şey girdi katmanına başvurur.\n3. **Çıktı (output)** — Raporlar, grafikler, özet tablolar. Yalnızca hesap katmanına başvurur.\n\nBu ayrımın tek amacı şudur: bir sayıyı değiştirmek gerektiğinde **nereye bakacağını bilmek**. Girdiler formüllerin arasına serpilmişse, altı ay sonra hangi sayının varsayım hangisinin hesap olduğunu kimse ayırt edemez.",
              "Every professional financial model uses the same three-layer structure, each layer on its **own sheet**:\n\n1. **Inputs** — every hand-entered assumption and the raw data. The single source of truth. Usually shaded a distinct colour.\n2. **Calculations** — all the formulas. No number is ever typed here; everything references the input layer.\n3. **Outputs** — reports, charts, summary tables. They reference only the calculation layer.\n\nThe separation has one purpose: knowing **where to look** when a number must change. If inputs are scattered among formulas, nobody can tell six months later which number is an assumption and which is a result.",
            ),
            text(
              "**Denetim (audit) araçları — Formüller sekmesi:**\n\n- **Etkileyenleri İzle** — Bu hücre hangi hücrelere bakıyor? Oklarla gösterir.\n- **Etkilenenleri İzle** — Bu hücreyi kim kullanıyor? Bir sayıyı değiştirmeden önce sormanın yolu.\n- **Formülleri Göster (Ctrl+`)** — Tüm sayfayı formül olarak gösterir. Bir dosyayı hızla anlamanın en iyi yolu.\n- **Hata Denetimi** — Tutarsız formülleri ve şüpheli desenleri bulur.\n- **Ad Yöneticisi** — Hücrelere isim ver: `=Tutar*KDV_Orani` formülü `=B2*$D$1`'den kat kat okunurdur.",
              "**Auditing tools — the Formulas tab:**\n\n- **Trace Precedents** — which cells does this one read? Shown with arrows.\n- **Trace Dependents** — who uses this cell? The way to ask before changing a number.\n- **Show Formulas (Ctrl+`)** — displays the whole sheet as formulas. The fastest way to understand a file.\n- **Error Checking** — finds inconsistent formulas and suspicious patterns.\n- **Name Manager** — give cells names: the formula `=Amount*VAT_Rate` is far more readable than `=B2*$D$1`.",
            ),
            tip(
              "Kendini kontrol eden dosya kur",
              "Build a file that checks itself",
              "Her ciddi çalışma kitabında bir **kontrol satırı** olmalıdır. Örnekler:\n\n- `=TOPLA(detay_sutunu) - ozet_hucresi` → sonuç 0 olmalı\n- `=EĞER(ABS(kontrol)<0,01;\"✓ TAMAM\";\"✗ HATA\")` → gözle görünür uyarı\n- Yüzde sütununun toplamı 100 mü?\n- Satır sayısı beklediğin kadar mı?\n\nBu kontrolleri koşullu biçimlendirmeyle kırmızıya boyarsan, bir sonraki güncellemede bir şey bozulduğunda dosya sana **kendisi** haber verir. Excel'de yanlış sayı yayınlamanın en yaygın sebebi, kimsenin kontrol satırı koymamış olmasıdır.",
              "Every serious workbook should have a **check row**. Examples:\n\n- `=SUM(detail_column) - summary_cell` → the result must be 0\n- `=IF(ABS(check)<0.01,\"✓ OK\",\"✗ ERROR\")` → a visible warning\n- Does the percentage column sum to 100?\n- Is the row count what you expected?\n\nPaint these checks red with conditional formatting and the file will tell you **itself** when the next update breaks something. The most common reason wrong numbers get published from Excel is that nobody added a check row.",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir hücreyi değiştirmeden önce hangi denetim aracını kullanmalısın?",
                "Which auditing tool should you use before changing a cell?",
              ],
              options: [
                [
                  "Etkilenenleri İzle — o hücreye hangi formüllerin bağlı olduğunu gösterir",
                  "Trace Dependents — it shows which formulas rely on that cell",
                ],
                ["Etkileyenleri İzle", "Trace Precedents"],
                ["Hata Denetimi", "Error Checking"],
                ["Formülleri Göster", "Show Formulas"],
              ],
              answer: 0,
              explain: [
                "\"Etkilenenler\", o hücreye bağımlı olan formüllerdir — yani değiştirdiğinde neyin kırılacağını gösterir. \"Etkileyenler\" ise tersidir: o hücrenin hangi hücrelerden beslendiğini gösterir ve bir sayının nereden geldiğini anlamak için kullanılır.",
                "\"Dependents\" are the formulas that rely on that cell — so it shows what will break when you change it. \"Precedents\" is the reverse: it shows which cells feed into it, and is used to understand where a number came from.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "veri-dogrulama-ve-koruma",
          title: L("Veri doğrulama ve dosya koruma", "Data validation and protecting a file"),
          summary: L(
            "Başkası dosyanı bozmadan kullansın: girdiyi kısıtla, formülü kilitle.",
            "Let others use your file without breaking it: constrain inputs and lock the formulas.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Bir dosyayı başkasına verdiğin anda o dosya bozulmaya başlar — kötü niyetten değil, formülün üzerine yazmak çok kolay olduğu için. İki savunma katmanı vardır.\n\n**1. Veri doğrulama (Veri → Veri Doğrulama)** — girdiyi baştan kısıtlar:\n\n- **Liste** — açılır menü verir; kullanıcı yalnızca izin verdiğin değerleri seçebilir. Yazım hatası ve tutarsız kategori sorununu kökten çözer.\n- **Tam sayı / ondalık aralığı** — negatif fiyat, %150 gibi imkânsız değerleri engeller\n- **Tarih aralığı** — gelecekteki doğum tarihini engeller\n- **Özel formül** — kendi kuralını yazarsın\n\nHer doğrulamaya bir **girdi mesajı** ve **hata uyarısı** ekle; kullanıcı ne beklendiğini okuyabilsin.",
              "The moment you hand a file to somebody else it starts to break — not out of malice, but because overwriting a formula is so easy. There are two layers of defence.\n\n**1. Data validation (Data → Data Validation)** — constrains input up front:\n\n- **List** — gives a dropdown; the user can only pick values you allow. It eliminates typos and inconsistent categories at the root.\n- **Whole number / decimal range** — blocks impossible values like a negative price or 150%\n- **Date range** — blocks a birth date in the future\n- **Custom formula** — write your own rule\n\nAdd an **input message** and an **error alert** to every validation so the user can read what is expected.",
            ),
            text(
              "**2. Sayfa koruma** — formülleri kazara silinmekten korur. Sıra önemlidir ve çoğu kişi ters yapıp şaşırır:\n\n1. **Önce** kullanıcının yazacağı hücreleri seç → Hücreleri Biçimlendir → Koruma sekmesi → **Kilitli** onayını **kaldır**\n2. **Sonra** Gözden Geçir → **Sayfayı Koru** → şifre (isteğe bağlı)\n\nExcel'de tüm hücreler varsayılan olarak \"kilitli\" işaretlidir ama bu ancak sayfa korumaya alındığında etkili olur. Yani önce açmak istediklerinin kilidini kaldırır, sonra sayfayı korursun.",
              "**2. Sheet protection** — guards formulas against accidental deletion. The order matters, and most people get it backwards and are then confused:\n\n1. **First** select the cells the user will type in → Format Cells → Protection tab → **uncheck** Locked\n2. **Then** Review → **Protect Sheet** → password (optional)\n\nIn Excel every cell is marked \"locked\" by default, but that only takes effect once the sheet is protected. So you unlock what you want open first, then protect the sheet.",
            ),
            pitfall(
              "Koruma güvenlik değildir",
              "Protection is not security",
              "Excel sayfa ve çalışma kitabı koruması **kazaya karşıdır**, kötü niyete karşı değil. İnternette birkaç tıkla kaldırılabilir. Gerçekten gizli veri varsa dosya şifreleme (Dosya → Bilgi → Çalışma Kitabını Koru → **Parolayla Şifrele**) kullan — ama en doğrusu, hassas veriyi Excel dosyasında hiç taşımamaktır.\n\nAyrıca şifreni kaybederseniz Microsoft'un bile kurtarma yolu yoktur; şifreyi bir parola yöneticisinde tut.",
              "Excel's sheet and workbook protection guards against **accidents**, not against malice. It can be removed with a few clicks found online. If the data is genuinely confidential, use file encryption (File → Info → Protect Workbook → **Encrypt with Password**) — but the right answer is not to carry sensitive data in an Excel file at all.\n\nAlso, if you lose that password not even Microsoft can recover it; keep it in a password manager.",
            ),
            quiz({
              id: "q1",
              q: [
                "Kullanıcının yalnızca B2:B50 aralığına yazmasını, gerisini değiştirememesini istiyorsun. Doğru sıra nedir?",
                "You want the user to type only in B2:B50 and change nothing else. What is the correct order?",
              ],
              options: [
                [
                  "B2:B50'nin kilidini kaldır, sonra sayfayı koru",
                  "Unlock B2:B50, then protect the sheet",
                ],
                ["Sayfayı koru, sonra B2:B50'yi kilitle", "Protect the sheet, then lock B2:B50"],
                ["Yalnızca B2:B50'yi kilitle", "Just lock B2:B50"],
                ["Dosyayı salt okunur yap", "Make the file read-only"],
              ],
              answer: 0,
              explain: [
                "Tüm hücreler baştan \"kilitli\" işaretlidir; koruma açılınca hepsi kapanır. Bu yüzden önce açık kalmasını istediğin aralığın kilit işaretini kaldırman, sonra sayfayı korumaya alman gerekir. Ters sırada yaparsan hiçbir hücreye yazılamaz.",
                "Every cell is marked \"locked\" from the start, and protection closes them all. So you must first uncheck Locked on the range you want left open, then protect the sheet. Do it the other way round and no cell can be typed into.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "excelden-cikis-stratejisi",
          title: L("Excel'den çıkış stratejisi", "An exit strategy from Excel"),
          summary: L(
            "Doğru araca geçiş kararını nasıl verir ve geçişi nasıl yönetirsin?",
            "How do you decide to move to the right tool, and how do you manage the move?",
          ),
          minutes: 18,
          blocks: [
            text(
              "Excel'i bırakmak gerektiğini anlamak bir beceridir. Ama daha önemlisi, **hangi işi neyin devralacağını** bilmektir. Excel'in üstlendiği rolleri ayırırsan geçiş netleşir:\n\n| Excel'deki rol | Doğru araç |\n|---|---|\n| Veri deposu | Veritabanı (PostgreSQL, SQL Server) |\n| Veri temizleme | Power Query, dbt, Python |\n| Raporlama ve pano | Power BI, Tableau, Metabase |\n| Ad hoc analiz | SQL + Python/R |\n| İş birliği ve versiyon | Git, ortak veri ambarı |\n| Hesaplama ve senaryo | **Excel — burada hâlâ rakipsiz** |\n\nSon satır önemlidir: Excel'i tamamen bırakmak gerekmez. Senaryo analizi, hızlı hesap ve varsayım modellemesi için hâlâ en iyi araçtır.",
              "Recognising when to leave Excel is a skill. But the more important thing is knowing **what will take over which job**. Separating the roles Excel plays makes the move clear:\n\n| Role in Excel | The right tool |\n|---|---|\n| Data store | A database (PostgreSQL, SQL Server) |\n| Data cleaning | Power Query, dbt, Python |\n| Reporting and dashboards | Power BI, Tableau, Metabase |\n| Ad hoc analysis | SQL + Python/R |\n| Collaboration and versioning | Git, a shared warehouse |\n| Calculation and scenarios | **Excel — still unmatched here** |\n\nThat last row matters: you need not abandon Excel entirely. For scenario analysis, quick sums and assumption modelling it is still the best tool there is.",
            ),
            text(
              "**Geçişi yönetmenin pratik yolu — her şeyi birden değiştirme:**\n\n1. **En acılı raporu seç.** Her ay en çok zamanını alan, en çok hata çıkan tek raporu bul.\n2. **Yalnızca onu taşı.** Veriyi bir yere düzgün koy, raporu yeni araçta kur.\n3. **Bir dönem paralel çalıştır.** Eski Excel raporunu ve yenisini aynı ay için karşılaştır; sayılar tutuyorsa güven oluşur.\n4. **Eskisini kapat.** Paralel dönem bitince Excel sürümünü **gerçekten** durdur — ikisini birden sürdürmek en kötü senaryodur.\n5. **Sonrakine geç.**\n\nBu yaklaşım hem riski düşürür hem de ekibin güvenini kazanır. \"Her şeyi Power BI'a taşıyoruz\" diye başlayan projeler genellikle yarıda kalır; tek rapordan başlayanlar tamamlanır.",
              "**The practical way to manage the move — do not change everything at once:**\n\n1. **Pick the most painful report.** Find the single one that eats the most time and produces the most errors each month.\n2. **Move only that one.** Put the data somewhere proper and rebuild the report in the new tool.\n3. **Run both in parallel for one cycle.** Compare the old Excel report with the new one for the same month; when the numbers agree, trust follows.\n4. **Switch the old one off.** Once the parallel period ends, **genuinely** stop the Excel version — carrying both is the worst outcome.\n5. **Move to the next one.**\n\nThis lowers risk and earns the team's confidence. Projects that begin with \"we are moving everything to Power BI\" usually stall; those that begin with one report get finished.",
            ),
            quiz({
              id: "q1",
              q: [
                "Excel raporunu Power BI'a taşırken neden bir dönem paralel çalıştırmak gerekir?",
                "Why should you run the report in parallel for one cycle when moving from Excel to Power BI?",
              ],
              options: [
                [
                  "Yeni raporun sayıları eskisiyle tutuyor mu diye doğrulamak ve ekibin güvenini kazanmak için",
                  "To verify the new report's numbers match the old and to earn the team's trust",
                ],
                ["Power BI lisansı gerektirdiği için", "Because Power BI requires a licence"],
                ["Excel dosyası yedek olarak kalsın diye", "So the Excel file remains as a backup"],
                ["Zorunlu bir teknik adım olduğu için", "Because it is a mandatory technical step"],
              ],
              answer: 0,
              explain: [
                "Yeni raporun ilk sürümü neredeyse her zaman eskisinden farklı sayı üretir — genelde filtre veya birleştirme mantığındaki küçük farklardan. Paralel dönem bu farkları yakalamanı sağlar. Ayrıca ekip, yeni araca ancak sayıların tuttuğunu kendi gözüyle gördükten sonra güvenir.",
                "The first version of a new report almost always produces different numbers from the old one — usually from small differences in filter or join logic. The parallel period lets you catch those. And the team only trusts the new tool once they have seen the numbers agree with their own eyes.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
