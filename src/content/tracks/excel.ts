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
            quiz({
              id: "q2",
              q: [
                "`$A1` referansı ne anlama gelir?",
                "What does the reference `$A1` mean?",
              ],
              options: [
                [
                  "Sütun sabit kalır, satır formülü kopyaladıkça kayar",
                  "Column is fixed, row shifts as you copy",
                ],
                ["Satır sabit kalır, sütun kayar", "Row is fixed, column shifts"],
                ["Her ikisi de sabit kalır", "Both are fixed"],
                ["Her ikisi de kayar", "Both shift"],
              ],
              answer: 0,
              explain: [
                "$ işareti kendinden sonra gelen kısmı sabitler. `$A1`'de $ sütun harfinin önünde olduğu için sütun (A) sabit kalır; satır numarası ise formülü aşağı ya da yukarı kopyaladıkça değişir.",
                "The $ sign fixes whatever comes right after it. In `$A1` the $ sits before the column letter, so column A stays fixed while the row number changes as you copy the formula up or down.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`A$1` referansını sağa doğru kopyalarsan ne olur?",
                "If you copy `A$1` to the right, what happens?",
              ],
              options: [
                [
                  "Sütun harfi değişir (B$1, C$1...), satır hep 1 kalır",
                  "The column letter changes (B$1, C$1...), the row always stays 1",
                ],
                ["Hiçbir şey değişmez", "Nothing changes"],
                ["Satır numarası değişir, sütun sabit kalır", "The row number changes, column stays fixed"],
                ["Formül hata verir", "The formula raises an error"],
              ],
              answer: 0,
              explain: [
                "`A$1`'de $ satır numarasının önünde olduğu için satır (1) sabit kalır; sütun harfi göreli olduğu için sağa kopyalandıkça B, C, D... diye kayar.",
                "In `A$1` the $ sits before the row number, so row 1 stays fixed; the column letter is relative, so it shifts to B, C, D... as you copy rightward.",
              ],
            }),
            pitfall(
              "En sık görülen Excel hatası budur",
              "This is the single most common Excel error",
              "Bir formülü aşağı çekmek Excel'in en çok kullanılan hareketidir — ve sabitlenmesi gereken referansı sabitlememek en çok yapılan hatadır. Sonuç genellikle **hata mesajı vermez**: bölen boş hücre olur, Excel sıfır sayar ve `#DIV/0!` verir; ya da daha kötüsü, yanlış bir hücreye bakar ve **makul görünen ama yanlış** bir sayı üretir.\n\nAlışkanlık: bir formülde bir hücre \"sabit\" olacaksa, yazarken hemen F4'e bas. Sonra düzeltmek için hatayı bulmayı bekleme.",
              "Dragging a formula down is Excel's most-used gesture — and forgetting to fix the reference that should stay fixed is the most common mistake. It usually produces **no error message**: the divisor becomes an empty cell, Excel treats it as zero and shows `#DIV/0!`; or worse, it points at the wrong cell and produces a number that **looks plausible but is wrong**.\n\nThe habit: the moment you write a reference that must stay fixed, press F4. Do not wait to find the bug later.",
            ),
            quiz({
              id: "q4",
              q: [
                "Sabitlenmesi gereken bir referansı sabitlemeyi unuttun ve bölen hücre boşa düştü. Excel ne gösterir?",
                "You forgot to fix a reference that should have stayed fixed, and the divisor cell became empty. What does Excel show?",
              ],
              options: [
                ["`#DIV/0!`", "`#DIV/0!`"],
                ["`#REF!`", "`#REF!`"],
                ["`#VALUE!`", "`#VALUE!`"],
                ["Hiçbir şey, formül sessizce 0 sonucu verir", "Nothing, the formula silently returns 0"],
              ],
              answer: 0,
              explain: [
                "Excel boş bir hücreyi bölme işleminde sıfır sayar ve sıfıra bölmeyi `#DIV/0!` olarak işaretler. Bu hata görünür olduğu için aslında iyi durumdur — asıl tehlikeli olan, formülün yanlış ama boş olmayan bir hücreye bakıp mantıklı görünen yanlış bir sayı üretmesidir.",
                "Excel treats an empty cell as zero in a division and flags dividing by zero as `#DIV/0!`. This is actually the fortunate case because it's visible — the real danger is a formula pointing at the wrong but non-empty cell, producing a plausible-looking wrong number.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Metne göre, bir hücrenin sabit kalması gerektiğini fark ettiğin an ne yapmalısın?",
                "According to the lesson, the moment you realize a cell reference must stay fixed, what should you do?",
              ],
              options: [
                ["Hemen F4'e basıp referansı sabitlemek", "Press F4 immediately to fix the reference"],
                ["Formülü yazmayı bitirip sonra hatayı aramak", "Finish writing the formula and look for the error afterward"],
                ["Hücreyi yeniden adlandırmak", "Rename the cell"],
                ["Sayfayı korumaya almak", "Protect the sheet"],
              ],
              answer: 0,
              explain: [
                "Metin, hatayı sonradan bulmayı beklemek yerine referansı yazarken anında sabitlemeyi önerir; çünkü yanlış referans genelde hata mesajı vermeden, makul görünen ama yanlış bir sayı üretir ve fark edilmesi zaman alır.",
                "The lesson recommends fixing the reference the instant you write it rather than waiting to find the bug later, because a wrong reference usually produces no error message — just a plausible-looking wrong number that's slow to notice.",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "F4 tuşuna bir hücre referansı üzerinde arka arkaya bastığında ne olur?",
                "What happens when you press F4 repeatedly while the cursor is on a cell reference?",
              ],
              options: [
                [
                  "Göreli, mutlak ve iki karma tür arasında sırayla geçiş yapar",
                  "It cycles through relative, absolute and the two mixed forms in order",
                ],
                ["Hücreyi siler", "It deletes the cell"],
                ["Formülü hesaplar", "It calculates the formula"],
                ["Hücreyi kilitler", "It locks the cell"],
              ],
              answer: 0,
              explain: [
                "F4, referansı `A1` → `$A$1` → `A$1` → `$A1` → `A1` şeklinde dört durum arasında döndürür; elle $ işareti yazmaktan çok daha hızlıdır.",
                "F4 cycles the reference through `A1` → `$A$1` → `A$1` → `$A1` → `A1`; it is much faster than typing $ signs by hand.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`=B2/$B$10` formülünü aşağı kopyaladığında B10 neden sabit kalmalı?",
                "When you copy `=B2/$B$10` downward, why must B10 stay fixed?",
              ],
              options: [
                [
                  "Çünkü B10 toplamı içeriyor ve her satırın payı aynı toplama bölünmeli",
                  "Because B10 holds the total, and every row's share must divide by that same total",
                ],
                ["Çünkü B10 boş bir hücre", "Because B10 is an empty cell"],
                ["Çünkü Excel sabit referansı zorunlu kılar", "Because Excel requires an absolute reference there"],
                ["Çünkü B sütunu metin içeriyor", "Because column B contains text"],
              ],
              answer: 0,
              explain: [
                "Yüzde payı hesaplarken her satır aynı toplama bölünür; B2 göreli kalıp aşağı kaydıkça pay hücresini takip etmeli, ama bölen ($B$10) sabit kalmazsa her satır farklı (ve çoğu boş) bir hücreye bölünür.",
                "When computing a share, every row divides by the same total; B2 stays relative and follows the share cell downward, but if the divisor ($B$10) were not fixed, each row would divide by a different (and mostly empty) cell.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Excel'de yeni yazılan bir hücre referansının varsayılan türü nedir?",
                "What is the default type of a newly typed cell reference in Excel?",
              ],
              options: [
                ["Göreli (`A1`)", "Relative (`A1`)"],
                ["Mutlak (`$A$1`)", "Absolute (`$A$1`)"],
                ["Karma, sütun sabit", "Mixed, column fixed"],
                ["Karma, satır sabit", "Mixed, row fixed"],
              ],
              answer: 0,
              explain: [
                "Excel'de $ işareti eklenmediği sürece her referans göreli sayılır; formülü kopyaladığında otomatik olarak kayar. Sabit kalması gereken durumları sen belirtmelisin.",
                "Unless you add $ signs, every reference in Excel is relative by default and shifts automatically when the formula is copied. You must explicitly mark the ones that should stay fixed.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Metne göre, referans hatasının en tehlikeli hâli nedir?",
                "According to the lesson, what is the most dangerous form a reference mistake can take?",
              ],
              options: [
                [
                  "Hata mesajı vermeden yanlış bir hücreye bakıp makul görünen yanlış bir sayı üretmesi",
                  "Pointing at the wrong cell with no error message, producing a number that looks plausible but is wrong",
                ],
                ["`#DIV/0!` göstermesi", "Showing `#DIV/0!`"],
                ["Excel'in çökmesi", "Excel crashing"],
                ["Formülün silinmesi", "The formula being deleted"],
              ],
              answer: 0,
              explain: [
                "`#DIV/0!` gibi görünür hatalar en azından fark edilir. Asıl tehlike, formülün sessizce yanlış bir hücreye bakıp gerçekçi görünen ama yanlış bir sonuç üretmesidir — bu tür hatalar genelde çok geç fark edilir.",
                "Visible errors like `#DIV/0!` are at least noticed. The real danger is a formula that silently points at the wrong cell and produces a realistic-looking but wrong result — these mistakes tend to surface far too late.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Metne göre Excel'de en çok kullanılan hareket hangisidir?",
                "According to the lesson, what is Excel's most-used gesture?",
              ],
              options: [
                ["Bir formülü aşağı doğru kopyalamak (sürüklemek)", "Dragging a formula down to copy it"],
                ["Hücreleri birleştirmek", "Merging cells"],
                ["Yeni sayfa eklemek", "Adding a new sheet"],
                ["Grafik oluşturmak", "Creating a chart"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça belirtir: formülü aşağı çekmek Excel'in en yaygın hareketidir, bu yüzden referans türlerini doğru yönetmek bu kadar kritiktir.",
                "The lesson states this directly: dragging a formula down is Excel's most common gesture, which is exactly why managing reference types correctly matters so much.",
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
            quiz({
              id: "q2",
              q: [
                "Birden fazla koşula göre toplam almak istiyorsun. Hangi fonksiyonu kullanmalısın?",
                "You want to sum values based on more than one condition. Which function should you use?",
              ],
              options: [
                ["ÇOKETOPLA / SUMIFS", "SUMIFS"],
                ["TOPLAKOŞUL / SUMIF", "SUMIF"],
                ["TOPLA / SUM", "SUM"],
                ["EĞER / IF", "IF"],
              ],
              answer: 0,
              explain: [
                "TOPLAKOŞUL/SUMIF tek koşulla çalışır; birden fazla koşul gerektiğinde ÇOKETOPLA/SUMIFS kullanılır ve gerçek işte bu ikincisi daha sık karşına çıkar.",
                "SUMIF works with a single condition; when you need more than one, use SUMIFS — and in real work this is the one you meet more often.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "BENZERSİZ / UNIQUE fonksiyonu ne yapar?",
                "What does the UNIQUE function do?",
              ],
              options: [
                [
                  "Bir aralıktaki tekrarsız değerlerin listesini döndürür",
                  "Returns a list of the distinct values in a range",
                ],
                ["En büyük değeri bulur", "Finds the largest value"],
                ["Koşula uyanları sayar", "Counts items matching a condition"],
                ["Metni büyük harfe çevirir", "Converts text to uppercase"],
              ],
              answer: 0,
              explain: [
                "UNIQUE, Excel 365'te gelen bir fonksiyondur ve bir aralıktaki tekrar eden değerleri eleyerek benzersiz listeyi döndürür — örneğin bir şehir sütunundaki farklı şehirleri listelemek için kullanılır.",
                "UNIQUE, available in Excel 365, strips out repeats and returns the distinct list — for example, listing the different cities found in a city column.",
              ],
            }),
            text(
              "**Hata mesajlarını okumak** hata ayıklamanın yarısıdır:\n\n- **`#YOK` / `#N/A`** — Arama fonksiyonu değeri bulamadı. Genelde boşluk karakteri veya tip uyuşmazlığı yüzündendir.\n- **`#BAŞV!` / `#REF!`** — Formülün baktığı hücre silinmiş.\n- **`#DEĞER!` / `#VALUE!`** — Sayı beklenen yerde metin var.\n- **`#SAYI/0!` / `#DIV/0!`** — Sıfıra veya boş hücreye bölme.\n- **`#AD?` / `#NAME?`** — Fonksiyon adı yanlış yazılmış.\n- **`######`** — Hata değil! Sütun içeriği göstermek için çok dar; genişletmen yeterli.",
              "**Reading error messages** is half of debugging:\n\n- **`#N/A`** — a lookup could not find the value. Usually a stray space or a type mismatch.\n- **`#REF!`** — the cell the formula pointed at has been deleted.\n- **`#VALUE!`** — text sits where a number was expected.\n- **`#DIV/0!`** — division by zero or by an empty cell.\n- **`#NAME?`** — the function name is misspelled.\n- **`######`** — not an error! The column is too narrow to display the content; just widen it.",
            ),
            quiz({
              id: "q4",
              q: [
                "Bir arama fonksiyonu aradığı değeri bulamazsa hangi hatayı verir?",
                "Which error appears when a lookup function cannot find the value it is searching for?",
              ],
              options: [
                ["`#YOK` / `#N/A`", "`#N/A`"],
                ["`#BAŞV!` / `#REF!`", "`#REF!`"],
                ["`#DEĞER!` / `#VALUE!`", "`#VALUE!`"],
                ["`#AD?` / `#NAME?`", "`#NAME?`"],
              ],
              answer: 0,
              explain: [
                "`#YOK`/`#N/A` özellikle arama fonksiyonlarının (DÜŞEYARA, XARA...) değeri bulamadığında verdiği hatadır; genelde bir boşluk karakteri ya da tip uyuşmazlığından kaynaklanır.",
                "`#N/A` is specifically what lookup functions (VLOOKUP, XLOOKUP...) return when they cannot find the value; usually caused by a stray space or a type mismatch.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Bir formülün baktığı hücre silinirse hangi hata görünür?",
                "Which error appears when the cell a formula points to has been deleted?",
              ],
              options: [
                ["`#BAŞV!` / `#REF!`", "`#REF!`"],
                ["`#YOK` / `#N/A`", "`#N/A`"],
                ["`#DEĞER!` / `#VALUE!`", "`#VALUE!`"],
                ["`#SAYI/0!` / `#DIV/0!`", "`#DIV/0!`"],
              ],
              answer: 0,
              explain: [
                "`#BAŞV!`/`#REF!` tam olarak bunu anlatır: formül artık var olmayan bir hücreye başvuruyor demektir, çünkü o hücre silinmiştir.",
                "`#REF!` says exactly this: the formula now points at a cell reference that no longer exists because that cell was deleted.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Bir hücrede `######` görüyorsun. Bu ne anlama gelir?",
                "A cell shows `######`. What does this mean?",
              ],
              options: [
                [
                  "Hata değil; sütun içeriği göstermek için dar, genişletmen yeterli",
                  "It is not an error; the column is too narrow to show the content, just widen it",
                ],
                ["`#DIV/0!` hatasının başka bir gösterimi", "Another way `#DIV/0!` is displayed"],
                ["Formül bozulmuş", "The formula is broken"],
                ["Dosya bozulmuş", "The file is corrupted"],
              ],
              answer: 0,
              explain: [
                "Metin bunu özellikle belirtir: `######` bir hata değildir, yalnızca sütun genişliği sayı veya tarihi göstermeye yetmiyordur. Sütunu genişletmek yeterlidir.",
                "The lesson calls this out specifically: `######` is not an error, the column is simply too narrow to display the number or date. Widening the column fixes it.",
              ],
            }),
            tip(
              "Hatayı gizlemek yerine ele al",
              "Handle errors rather than hiding them",
              "`EĞERHATA / IFERROR` ile hatayı temiz bir mesaja çevirebilirsin: `=EĞERHATA(DÜŞEYARA(...);\"bulunamadı\")`.\n\nAma dikkat: `EĞERHATA(...;0)` yazıp hatayı sıfıra çevirmek tehlikelidir. Hata gerçek bir veri probleminin habercisiyse, onu sıfıra çevirmek problemi **gizler** ve toplamların sessizce eksik çıkmasına yol açar. Hatayı yalnızca **beklediğin ve zararsız olduğunu bildiğin** durumlarda bastır.",
              "`IFERROR` turns an error into a clean message: `=IFERROR(VLOOKUP(...),\"not found\")`.\n\nBut beware: writing `IFERROR(...,0)` to turn errors into zero is dangerous. If the error signals a genuine data problem, converting it to zero **hides** that problem and makes your totals quietly too low. Only suppress an error when you **expect it and know it is harmless**.",
            ),
            quiz({
              id: "q7",
              q: [
                "`=EĞERHATA(DÜŞEYARA(...);\"bulunamadı\")` formülü ne yapar?",
                "What does `=IFERROR(VLOOKUP(...),\"not found\")` do?",
              ],
              options: [
                [
                  "DÜŞEYARA hata verirse hatayı temiz bir mesaja çevirir",
                  "If VLOOKUP raises an error, it turns it into a clean message",
                ],
                ["DÜŞEYARA'yı her zaman \"bulunamadı\" döndürecek şekilde zorlar", "Forces VLOOKUP to always return \"not found\""],
                ["Hatayı sıfıra çevirir", "Turns the error into zero"],
                ["Formülü tamamen devre dışı bırakır", "Disables the formula entirely"],
              ],
              answer: 0,
              explain: [
                "EĞERHATA/IFERROR, sarmaladığı formül bir hata üretirse, o hata yerine belirttiğin değeri (burada \"bulunamadı\" metni) gösterir; formül hata vermezse normal sonucu döner.",
                "IFERROR shows the value you specify (here the text \"not found\") only when the wrapped formula raises an error; if there is no error it returns the normal result.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`EĞERHATA(...;0)` yazarak her hatayı sıfıra çevirmek neden tehlikelidir?",
                "Why is turning every error into zero with `IFERROR(...,0)` dangerous?",
              ],
              options: [
                [
                  "Gerçek bir veri problemini gizler ve toplamlar sessizce eksik çıkar",
                  "It hides a genuine data problem, so totals quietly come up too low",
                ],
                ["Excel'i yavaşlatır", "It slows Excel down"],
                ["Formül artık kopyalanamaz", "The formula can no longer be copied"],
                ["Hücre biçimini bozar", "It breaks the cell formatting"],
              ],
              answer: 0,
              explain: [
                "Hata bazen gerçek bir problemin habercisidir. Onu körü körüne sıfıra çevirmek problemi ortadan kaldırmaz, sadece görünmez kılar — toplamlar sessizce yanlış çıkar ve kimse fark etmez.",
                "An error can be a signal of a real problem. Blindly converting it to zero does not fix the problem, it just makes it invisible — totals come out quietly wrong and nobody notices.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "EĞERSAY (COUNTIF) ile TOPLAKOŞUL (SUMIF) arasındaki fark nedir?",
                "What is the difference between COUNTIF and SUMIF?",
              ],
              options: [
                [
                  "EĞERSAY koşula uyan hücreleri sayar, TOPLAKOŞUL koşula uyanları toplar",
                  "COUNTIF counts the cells matching a condition, SUMIF sums the values matching a condition",
                ],
                ["İkisi de aynı şeyi yapar", "They both do the same thing"],
                ["EĞERSAY yalnızca metinlerle çalışır", "COUNTIF only works with text"],
                ["TOPLAKOŞUL koşulsuz çalışır", "SUMIF works without a condition"],
              ],
              answer: 0,
              explain: [
                "Fonksiyon adları amacı anlatır: EĞERSAY/COUNTIF \"kaç tane\" sorusuna, TOPLAKOŞUL/SUMIF \"ne kadar\" sorusuna cevap verir. İkisi de aynı koşul mantığını kullanır, farkları saymak ile toplamaktır.",
                "The names describe the intent: COUNTIF answers \"how many\", SUMIF answers \"how much\". Both use the same condition logic; the difference is counting versus summing.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir formülde fonksiyon adı yanlış yazılmışsa hangi hata görünür?",
                "Which error appears when a function name is misspelled in a formula?",
              ],
              options: [
                ["`#AD?` / `#NAME?`", "`#NAME?`"],
                ["`#YOK` / `#N/A`", "`#N/A`"],
                ["`#BAŞV!` / `#REF!`", "`#REF!`"],
                ["`######`", "`######`"],
              ],
              answer: 0,
              explain: [
                "Excel `#AD?`/`#NAME?` hatasını, formülde tanımadığı bir isim gördüğünde verir — bu genelde bir fonksiyon adının yanlış yazılmasından kaynaklanır.",
                "Excel raises `#NAME?` when it encounters a name in the formula it does not recognise — most often because a function name was misspelled.",
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
            quiz({
              id: "q2",
              q: [
                "`=TOPLA(Satis[Tutar])` gibi bir yapılandırılmış referansın avantajı nedir?",
                "What is the advantage of a structured reference like `=SUM(Sales[Amount])`?",
              ],
              options: [
                [
                  "Sabit aralık yerine anlamlı isim kullanır, altı ay sonra da okunabilir kalır",
                  "It uses a meaningful name instead of a fixed range, so it stays readable six months later",
                ],
                ["Excel'i daha hızlı hesaplar", "It makes Excel calculate faster"],
                ["Dosya boyutunu küçültür", "It reduces the file size"],
                ["Yalnızca sayısal sütunlarda çalışır", "It only works on numeric columns"],
              ],
              answer: 0,
              explain: [
                "`=TOPLA(B2:B4718)` altı ay sonra neyin toplandığını anlatmaz. `=TOPLA(Satis[Tutar])` ise adından bellidir ve tablo büyüdüğünde aralığı elle güncellemene gerek kalmaz.",
                "`=SUM(B2:B4718)` tells you nothing about what is being summed six months later. `=SUM(Sales[Amount])` is self-explanatory and you never have to update the range by hand as the table grows.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Tablo Tasarımı sekmesinde Toplam Satırı'nı açmanın faydası nedir?",
                "What is the benefit of turning on the Totals Row in Table Design?",
              ],
              options: [
                ["Tek tıkla alta otomatik özet ekler", "It adds an automatic summary at the bottom with one click"],
                ["Tabloyu PivotTable'a çevirir", "It converts the table into a PivotTable"],
                ["Süzgeçleri kaldırır", "It removes the filters"],
                ["Sütunları sabitler", "It freezes the columns"],
              ],
              answer: 0,
              explain: [
                "Toplam Satırı, elle `=TOPLA(...)` yazmadan tablonun altına toplam, ortalama veya sayım gibi bir özet ekler ve açılır menüden hangi işlemi istediğini seçersin.",
                "The Totals Row adds a summary — sum, average, count — below the table without you typing a formula, and lets you pick the operation from a dropdown.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Bir Tabloya yeni bir satır eklediğinde ne olur?",
                "What happens when you add a new row to a Table?",
              ],
              options: [
                [
                  "Formüller, PivotTable'lar ve grafikler kendiliğinden yeni satırı da kapsar",
                  "Formulas, PivotTables and charts automatically include the new row",
                ],
                ["Hiçbir şey, aralığı elle güncellemen gerekir", "Nothing, you must update the range by hand"],
                ["Tablo formatı bozulur", "The table formatting breaks"],
                ["Yeni satır süzgeçten hariç tutulur", "The new row is excluded from the filter"],
              ],
              answer: 0,
              explain: [
                "Tablonun en büyük katkısı budur: alta eklenen her satır otomatik olarak tablonun bir parçası olur, bu yüzden ona bağlı tüm formüller ve pivotlar da onu kapsar.",
                "This is the Table's biggest contribution: every row added at the bottom automatically becomes part of the table, so every formula and pivot built on it includes it too.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Tabloya `Satis` gibi bir isim vermenin faydası nedir?",
                "What is the benefit of giving a table a name like `Sales`?",
              ],
              options: [
                [
                  "Formüller `=TOPLA(Satis[Tutar])` gibi okunur hâle gelir",
                  "Formulas become readable, like `=SUM(Sales[Amount])`",
                ],
                ["Excel dosyayı daha hızlı açar", "Excel opens the file faster"],
                ["Tablo otomatik korunur", "The table is automatically protected"],
                ["Sütun sayısı sınırlanır", "The number of columns is limited"],
              ],
              answer: 0,
              explain: [
                "Varsayılan `Tablo1`, `Tablo2` gibi isimler hiçbir şey anlatmaz. Tabloya `Satis` gibi anlamlı bir isim verdiğinde, o tabloya başvuran her formül de anlamlı hâle gelir.",
                "The default names like `Table1`, `Table2` say nothing. Giving the table a meaningful name like `Sales` makes every formula that references it meaningful too.",
              ],
            }),
            text(
              "**Biçimlendirmede iki kural:**\n\n1. **Biçim ile veriyi karıştırma.** Bir hücreye `1.899 TL` yazmak yerine `1899` yaz ve hücreyi para birimi olarak **biçimlendir**. Böylece sayı hâlâ sayıdır ve üzerinde işlem yapılabilir. Metin olarak yazılmış \"sayılar\" toplanamaz.\n\n2. **Koşullu biçimlendirmeyi ölçülü kullan.** Veri çubukları ve renk skalaları bir tabloyu okunur kılar; ama her hücre renkliyse hiçbir şey öne çıkmaz. Kural: yalnızca **karar verilecek** sütuna uygula.",
              "**Two rules for formatting:**\n\n1. **Do not mix format with data.** Instead of typing `1,899 USD` into a cell, type `1899` and **format** the cell as currency. That way the number is still a number and can be computed with. \"Numbers\" typed as text cannot be summed.\n\n2. **Use conditional formatting sparingly.** Data bars and colour scales make a table readable; but if every cell is coloured, nothing stands out. The rule: apply it only to the column a **decision** will be made on.",
            ),
            quiz({
              id: "q6",
              q: [
                "Bir hücreye `1.899 TL` yazmak yerine ne yapmalısın?",
                "Instead of typing `1,899 USD` into a cell, what should you do?",
              ],
              options: [
                [
                  "1899 yaz, hücreyi para birimi olarak biçimlendir",
                  "Type 1899 and format the cell as currency",
                ],
                ["\"1.899 TL\" metnini olduğu gibi bırak", "Leave the \"1,899 USD\" text as it is"],
                ["Sayıyı ayrı bir sütuna açıklama olarak yaz", "Write the number as a note in a separate column"],
                ["Hücreyi birleştirip ortala", "Merge and centre the cell"],
              ],
              answer: 0,
              explain: [
                "Biçim ile veriyi karıştırmamak kuralı tam olarak budur: sayıyı saf hâliyle (`1899`) yaz, para birimi görünümünü biçimlendirme ile ekle. Böylece hücre hem okunur kalır hem de üzerinde işlem yapılabilir.",
                "This is exactly the rule of not mixing format with data: type the raw number (`1899`) and add the currency look through formatting. That way the cell stays readable and remains computable.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Bir sayıyı metin olarak yazarsan (örneğin tırnakla \"1899\") ne olur?",
                "If you type a number as text (for example with quotes, \"1899\"), what happens?",
              ],
              options: [
                [
                  "Hücre artık sayı sayılmaz ve TOPLA gibi fonksiyonlarla toplanamaz",
                  "The cell is no longer treated as a number and cannot be summed with functions like SUM",
                ],
                ["Hiçbir fark olmaz", "There is no difference"],
                ["Excel otomatik olarak sayıya çevirir", "Excel automatically converts it to a number"],
                ["Hücre kırmızıya döner", "The cell turns red"],
              ],
              answer: 0,
              explain: [
                "Metin olarak yazılmış \"sayılar\" Excel için gerçek bir sayı değildir; TOPLA veya ORTALAMA gibi fonksiyonlar onları yok sayar ve sonuç sessizce eksik çıkar.",
                "\"Numbers\" typed as text are not real numbers to Excel; functions like SUM or AVERAGE ignore them and the result comes out quietly too low.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Metne göre koşullu biçimlendirmeyi hangi sütuna uygulamalısın?",
                "According to the lesson, which column should you apply conditional formatting to?",
              ],
              options: [
                ["Yalnızca karar verilecek sütuna", "Only the column a decision will be made on"],
                ["Tablodaki tüm sütunlara", "Every column in the table"],
                ["Yalnızca başlık satırına", "Only the header row"],
                ["Yalnızca metin içeren sütunlara", "Only columns containing text"],
              ],
              answer: 0,
              explain: [
                "Her hücre renkliyse hiçbir şey öne çıkmaz — koşullu biçimlendirmenin gücü seçiciliğinde. Kural, onu yalnızca üzerinde bir karar verilecek sütuna uygulamaktır.",
                "If every cell is coloured, nothing stands out — conditional formatting's power lies in selectivity. The rule is to apply it only to the column a decision will actually be made on.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "Ctrl+T'ye basmadan önce ne yapmalısın?",
                "What should you do before pressing Ctrl+T?",
              ],
              options: [
                ["Tablo yapmak istediğin veri aralığını seçmelisin", "Select the data range you want to turn into a table"],
                ["Dosyayı kaydetmelisin", "Save the file"],
                ["Tüm sayfayı seçmelisin", "Select the whole sheet"],
                ["Süzgeçleri kapatmalısın", "Turn off the filters"],
              ],
              answer: 0,
              explain: [
                "Ctrl+T, o an seçili olan aralığı Tablo'ya çevirir. Doğru aralığı (başlık satırı dahil) önce seçmezsen Excel'in tahmini yanlış sınırları kapsayabilir.",
                "Ctrl+T converts whatever range is currently selected into a Table. If you have not selected the correct range (header row included) first, Excel's guess may cover the wrong boundaries.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir aralığı Tablo'ya çevirdiğinde başlık satırında otomatik olarak ne belirir?",
                "When you convert a range to a Table, what automatically appears in the header row?",
              ],
              options: [
                ["Süzgeç (filtre) okları", "Filter arrows"],
                ["Koşullu biçimlendirme kuralları", "Conditional formatting rules"],
                ["PivotTable alanları", "PivotTable fields"],
                ["DAX ölçüleri", "DAX measures"],
              ],
              answer: 0,
              explain: [
                "Tablo, başlık satırını otomatik olarak biçimlendirir ve her başlığa bir süzgeç oku ekler; bu sayede elle Veri → Süzgeç uygulamana gerek kalmaz.",
                "The Table automatically formats the header row and adds a filter arrow to each header, so you never have to apply Data → Filter by hand.",
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
            quiz({
              id: "q2",
              q: [
                "Düzgün veri kuralına göre bir sütun ne olmalıdır?",
                "According to the tidy-data rule, what should one column represent?",
              ],
              options: [
                ["Tek bir değişken", "A single variable"],
                ["Birden çok değişken", "Multiple variables"],
                ["Bir toplam satırı", "A total row"],
                ["Bir başlık ve bir logo", "A header and a logo"],
              ],
              answer: 0,
              explain: [
                "Kuralın özü budur: her sütun bir değişkeni temsil eder, her satır bir gözlemi. Bu düzen sağlanmadan filtreleme, pivot ve formüller güvenilir çalışmaz.",
                "That is the essence of the rule: one column per variable, one row per observation. Without this shape, filtering, pivots and formulas cannot work reliably.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Düzgün bir tabloda başlık satırının üstünde ne olmamalıdır?",
                "In a tidy table, what should not appear above the header row?",
              ],
              options: [
                ["Logo, boş satır veya birleştirilmiş hücre", "A logo, blank row or merged cell"],
                ["Sütun genişliği ayarı", "Column width settings"],
                ["Hücre biçimlendirmesi", "Cell formatting"],
                ["Sayfa adı", "The sheet name"],
              ],
              answer: 0,
              explain: [
                "Başlık satırının üstünde herhangi bir şey (logo, boş satır, birleştirilmiş hücre) olması, Excel'in ve Power Query'nin tabloyu doğru tanımasını engeller; Tablo'ya çevirmek veya Power Query ile okumak zorlaşır.",
                "Anything above the header row — a logo, a blank row, a merged cell — stops Excel and Power Query from recognising the table correctly, making it harder to convert to a Table or read with Power Query.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`\"Ankara / 2024\"` gibi tek hücrede iki bilgi tutmak neden sorunludur?",
                "Why is keeping two pieces of information in one cell like `\"Ankara / 2024\"` a problem?",
              ],
              options: [
                [
                  "Şehir ve yıl ayrı sütun olmalı; aksi hâlde filtreleme ve gruplama zorlaşır",
                  "City and year should be separate columns; otherwise filtering and grouping become hard",
                ],
                ["Hücre çok uzun görünür", "The cell looks too long"],
                ["Excel bu hücreyi kabul etmez", "Excel would reject the cell"],
                ["Yalnızca görsel bir sorundur", "It is only a visual issue"],
              ],
              answer: 0,
              explain: [
                "Bir hücrede tek değer kuralı tam olarak bunu önler: \"Ankara / 2024\" tek bir hücrede iki değişkeni karıştırır. Şehre göre filtrelemek veya yıla göre gruplamak, bu iki bilgi ayrı sütunlarda olmadan mümkün değildir.",
                "The one-value-per-cell rule exists exactly for this: \"Ankara / 2024\" mixes two variables into one cell. Filtering by city or grouping by year is impossible unless those two pieces of information live in separate columns.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Toplam satırlarını verinin neresine koymalısın?",
                "Where should you put total rows?",
              ],
              options: [
                ["Verinin dışına, ayrı bir özet alanına", "Outside the data, in a separate summary area"],
                ["Verinin en üstüne", "At the very top of the data"],
                ["Verinin ortasına, kategoriler arasına", "In the middle of the data, between categories"],
                ["Her satırın yanına", "Next to every row"],
              ],
              answer: 0,
              explain: [
                "Toplam satırı veri aralığının içine karışırsa, bir pivot veya SUM formülü onu bir \"gözlem\" sanıp toplamlara dahil eder ve sonuçlar şişer. Özetler her zaman ayrı bir alanda tutulmalıdır.",
                "If a total row sits inside the data range, a pivot or a SUM formula may mistake it for an \"observation\" and include it in the totals, inflating the result. Summaries always belong in a separate area.",
              ],
            }),
            pitfall(
              "Birleştirilmiş hücrelerin bedeli",
              "The cost of merged cells",
              "Birleştirilmiş hücre görsel olarak düzenli görünür ama sıralama, filtreleme, pivot ve neredeyse her formül onunla bozulur. Aynı görünümü **Merge & Center** yerine `Format Cells → Alignment → Center Across Selection` ile veriyi bozmadan elde edersin.",
              "Merged cells look tidy but break sorting, filtering, pivots and nearly every formula. Get the same look without damaging the data using `Format Cells → Alignment → Center Across Selection` instead of Merge & Center.",
            ),
            quiz({
              id: "q6",
              q: [
                "Birleştirilmiş hücreler hangi işlemleri bozar?",
                "Which operations do merged cells break?",
              ],
              options: [
                [
                  "Sıralama, filtreleme, pivot ve neredeyse her formül",
                  "Sorting, filtering, pivots and almost every formula",
                ],
                ["Yalnızca yazdırma önizlemesini", "Only the print preview"],
                ["Yalnızca dosya boyutunu", "Only the file size"],
                ["Hiçbirini, yalnızca görseldir", "None of them, it is purely visual"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça sayar: birleştirilmiş hücreler görsel olarak düzenli görünse de, sıralama, filtreleme, pivot ve formüllerin neredeyse tamamı bu hücrelerde beklenmedik şekilde bozulur.",
                "The lesson lists this directly: merged cells may look tidy, but sorting, filtering, pivots and almost every formula break unpredictably around them.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Birleştirilmiş hücre görünümünü veriyi bozmadan elde etmenin yolu nedir?",
                "How can you get the merged-cell look without damaging the data?",
              ],
              options: [
                [
                  "Format Cells → Alignment → Center Across Selection kullanmak",
                  "Use Format Cells → Alignment → Center Across Selection",
                ],
                ["Merge & Center kullanmak", "Use Merge & Center"],
                ["Hücreleri gizlemek", "Hide the cells"],
                ["Sütun genişliğini artırmak", "Increase the column width"],
              ],
              answer: 0,
              explain: [
                "`Center Across Selection`, metni birden çok hücrenin ortasında gösterir ama hücreleri gerçekten birleştirmez; böylece görünüm aynı kalırken veri yapısı bozulmaz.",
                "`Center Across Selection` displays text centred across several cells without actually merging them, so the look stays the same while the data structure remains intact.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: [
                "Aşağıdakilerden hangisi düzgün veri kuralını ihlal eder?",
                "Which of the following violates the tidy-data rule?",
              ],
              options: [
                [
                  "Bir sütunda hem şehir hem tarih bilgisini birlikte tutmak",
                  "Keeping both city and date information together in one column",
                ],
                ["Her sütuna bir değişken adı vermek", "Giving each column a variable name"],
                ["Veriyi Ctrl+T ile Tablo'ya çevirmek", "Converting the data to a Table with Ctrl+T"],
                ["Başlıkları ilk satırda tutmak", "Keeping headers on the first row"],
              ],
              answer: 0,
              explain: [
                "Diğer üç seçenek kuralların kendisidir. Şehir ve tarihi tek sütunda birleştirmek ise \"bir hücre, tek değer\" kuralını doğrudan ihlal eder ve analiz sırasında ayrıştırma yükü doğurur.",
                "The other three options are the rules themselves. Combining city and date in one column directly breaks the \"one value per cell\" rule and creates extra parsing work during analysis.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Birleştirilmiş hücreler içeren bir aralıktan PivotTable oluşturmaya çalışırsan ne olur?",
                "What happens if you try to build a PivotTable from a range containing merged cells?",
              ],
              options: [
                [
                  "Pivot bozulur veya beklenmedik biçimde yanlış gruplama yapar",
                  "The pivot breaks or groups the data incorrectly",
                ],
                ["Pivot birleştirilmiş hücreleri otomatik ayırır", "The pivot automatically un-merges the cells"],
                ["Hiçbir fark olmaz", "There is no difference"],
                ["Excel dosyayı açmayı reddeder", "Excel refuses to open the file"],
              ],
              answer: 0,
              explain: [
                "PivotTable her satırı ayrı bir gözlem sayar; birleştirilmiş bir hücrenin altındaki boş görünen satırlar aslında değeri boş satırlardır ve pivotta yanlış veya eksik gruplara düşerler.",
                "A PivotTable treats every row as a separate observation; the rows that visually sit under a merged cell actually have empty values and end up in wrong or missing groups in the pivot.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir tabloda başlık satırı neden tek ve en üstte olmalıdır?",
                "Why must a table have a single header row right at the top?",
              ],
              options: [
                [
                  "Excel'in Tablo'ya çevirmesi ve doğru sütun adlarını tanıması için",
                  "So Excel can convert it to a Table and recognise the correct column names",
                ],
                ["Yalnızca estetik nedenlerle", "Purely for aesthetic reasons"],
                ["Excel iki başlık satırını desteklemez ve hata verir", "Excel does not support two header rows and errors out"],
                ["Yazdırma sırasında zorunludur", "It is required for printing"],
              ],
              answer: 0,
              explain: [
                "Ctrl+T ile Tabloya çevirme ve Power Query gibi araçlar, ilk satırı başlık olarak varsayar. Üstte fazladan satır veya birden fazla başlık satırı varsa sütun adlarını yanlış okurlar.",
                "Converting to a Table with Ctrl+T and tools like Power Query assume the first row is the header. Extra rows above it, or more than one header row, make them read the column names wrong.",
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
            quiz({
              id: "q2",
              q: [
                "`=COUNTIFS(Satis[Segment]; \"kurumsal\")` formülü ne yapar?",
                "What does `=COUNTIFS(Sales[Segment], \"corporate\")` do?",
              ],
              options: [
                [
                  "Segment sütunu \"kurumsal\" olan satırları sayar",
                  "Counts the rows where the Segment column is \"corporate\"",
                ],
                ["Kurumsal segmentin toplam tutarını verir", "Returns the total amount for the corporate segment"],
                ["Kurumsal olmayanları siler", "Deletes the non-corporate rows"],
                ["Segment sütununu alfabetik sıralar", "Sorts the Segment column alphabetically"],
              ],
              answer: 0,
              explain: [
                "COUNTIFS, SUMIFS ile aynı mantıkla çalışır ama toplamak yerine sayar: koşula uyan satırların adedini döndürür.",
                "COUNTIFS works the same way as SUMIFS but counts instead of summing: it returns how many rows match the condition.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`=IFS(B2>100000; \"yüksek\"; B2>50000; \"orta\"; TRUE; \"düşük\")` formülündeki son `TRUE` koşulunun amacı nedir?",
                "What is the purpose of the final `TRUE` condition in `=IFS(B2>100000, \"high\", B2>50000, \"medium\", TRUE, \"low\")`?",
              ],
              options: [
                [
                  "Önceki koşulların hiçbiri sağlanmazsa varsayılan bir değer döndürür",
                  "Acts as a catch-all default when none of the earlier conditions are true",
                ],
                ["Formülü her zaman TRUE yapar", "Forces the formula to always be TRUE"],
                ["Bir yazım hatasıdır, gerekli değildir", "It is a typo and unnecessary"],
                ["Yalnızca boş hücrelerde çalışır", "It only applies to empty cells"],
              ],
              answer: 0,
              explain: [
                "IFS, koşulları sırayla dener ve ilk doğru olanın değerini döner. `TRUE` her zaman doğru olduğundan en sona konursa, önceki hiçbir koşul sağlanmadığında devreye giren bir \"aksi hâlde\" kolu olur.",
                "IFS tests conditions in order and returns the value of the first one that is true. Placing `TRUE` last, since it is always true, gives you a catch-all \"otherwise\" branch for when nothing earlier matched.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`=TEXTSPLIT(A2; \" / \")` formülü ne yapar?",
                "What does `=TEXTSPLIT(A2, \" / \")` do?",
              ],
              options: [
                [
                  "A2 hücresini \" / \" ayıracına göre birden çok hücreye böler",
                  "Splits cell A2 into multiple cells using \" / \" as the delimiter",
                ],
                ["A2 içindeki tüm boşlukları siler", "Removes every space inside A2"],
                ["A2'yi başka bir hücreyle birleştirir", "Joins A2 with another cell"],
                ["A2'nin karakter sayısını verir", "Returns the character count of A2"],
              ],
              answer: 0,
              explain: [
                "TEXTSPLIT, Excel 365'in dinamik dizi fonksiyonlarından biridir; bir hücredeki metni verdiğin ayıraca göre parçalayıp yan yana hücrelere döker.",
                "TEXTSPLIT is one of Excel 365's dynamic array functions; it breaks a cell's text apart at the delimiter you give and spills the pieces across adjacent cells.",
              ],
            }),
            text(
              "**XLOOKUP neden VLOOKUP'tan iyi?**\n\n- Sola doğru arama yapabilir (VLOOKUP yapamaz)\n- Sütun numarası yerine doğrudan sütun aralığı alır; sütun eklenince bozulmaz\n- Bulunamadı durumunu dördüncü argümanla yönetir, `IFERROR` sarmalamana gerek kalmaz\n- Varsayılanı **tam eşleşme**'dir; VLOOKUP'ın yaklaşık eşleşme varsayılanı sessiz hataların klasik kaynağıdır",
              "**Why XLOOKUP beats VLOOKUP:**\n\n- It can look to the left (VLOOKUP cannot)\n- It takes a column range instead of a column number, so inserting a column does not break it\n- It handles \"not found\" in its fourth argument, no `IFERROR` wrapper needed\n- It defaults to an **exact match**; VLOOKUP's approximate-match default is a classic source of silent errors",
            ),
            quiz({
              id: "q5",
              q: [
                "XLOOKUP'ın VLOOKUP'a göre en temel avantajlarından biri nedir?",
                "What is one of XLOOKUP's most basic advantages over VLOOKUP?",
              ],
              options: [
                ["Sola doğru arama yapabilir", "It can look to the left"],
                ["Yalnızca sayılarla çalışır", "It only works with numbers"],
                ["Daha az bellek kullanır", "It uses less memory"],
                ["Türkçe karakterleri desteklemez", "It does not support Turkish characters"],
              ],
              answer: 0,
              explain: [
                "VLOOKUP yalnızca arama sütununun sağındaki bir değeri getirebilir; arama sütunu solda kalırsa çalışmaz. XLOOKUP her iki yöne de bakabilir.",
                "VLOOKUP can only return a value to the right of the lookup column; if the lookup column is on the right, it fails. XLOOKUP can look in either direction.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "XLOOKUP, araya yeni bir sütun eklendiğinde neden bozulmaz ama VLOOKUP bozulabilir?",
                "Why doesn't XLOOKUP break when a new column is inserted, while VLOOKUP can?",
              ],
              options: [
                [
                  "XLOOKUP sütun numarası yerine doğrudan sütun aralığı alır",
                  "XLOOKUP takes a column range directly instead of a column number",
                ],
                ["XLOOKUP sütun eklemeyi otomatik engeller", "XLOOKUP automatically prevents column insertion"],
                ["VLOOKUP sütunları hatırlamaz", "VLOOKUP does not remember columns"],
                ["Aralarında fark yoktur", "There is no difference between them"],
              ],
              answer: 0,
              explain: [
                "VLOOKUP'a `3` gibi bir sütun numarası verirsin; araya sütun eklenince bu numara artık yanlış sütunu gösterir. XLOOKUP'a doğrudan sütunun kendisini (aralığını) verdiğin için sütun kayması onu etkilemez.",
                "You give VLOOKUP a column number like `3`; insert a column and that number now points at the wrong one. XLOOKUP is given the column range itself, so a column shift does not affect it.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "XLOOKUP'ın varsayılan eşleşme türü nedir?",
                "What is XLOOKUP's default match type?",
              ],
              options: [
                ["Tam eşleşme", "Exact match"],
                ["Yaklaşık eşleşme", "Approximate match"],
                ["Büyük/küçük harf duyarlı eşleşme", "Case-sensitive match"],
                ["Joker karakterli eşleşme", "Wildcard match"],
              ],
              answer: 0,
              explain: [
                "XLOOKUP varsayılan olarak tam eşleşme arar. VLOOKUP'ın varsayılanı ise yaklaşık eşleşmedir; dördüncü argümana `YANLIŞ/FALSE` yazmayı unutmak sinsi hatalara yol açar — XLOOKUP bu tuzağı baştan ortadan kaldırır.",
                "XLOOKUP defaults to an exact match. VLOOKUP's default is approximate match; forgetting to type `FALSE` as the fourth argument produces insidious bugs — XLOOKUP removes that trap entirely.",
              ],
            }),
            info(
              "Mutlak ve göreli referans",
              "Absolute vs relative references",
              "`A1` kopyalandığında kayar, `$A$1` sabit kalır, `$A1` sütunu sabitler, `A$1` satırı sabitler. `F4` tuşu bu dördü arasında sırayla geçiş yapar. Çapraz tablo formüllerinde doğru `$` yerleşimi, formülü bir kez yazıp her yere kopyalayabilmen demektir.",
              "`A1` shifts when copied, `$A$1` stays put, `$A1` locks the column and `A$1` locks the row. `F4` cycles through all four. In a cross-tab, getting the `$` right means writing the formula once and copying it everywhere.",
            ),
            quiz({
              id: "q8",
              q: [
                "Info blokta anlatıldığı gibi, çapraz tablo formüllerinde doğru `$` yerleşiminin faydası nedir?",
                "As the info box explains, what is the benefit of correct `$` placement in cross-tab formulas?",
              ],
              options: [
                [
                  "Formülü bir kez yazıp tablonun her yerine kopyalayabilirsin",
                  "You can write the formula once and copy it everywhere in the table",
                ],
                ["Excel dosyasını daha hızlı açar", "It makes Excel open the file faster"],
                ["Formülü otomatik olarak çevirir", "It automatically translates the formula"],
                ["Hücreleri renklendirir", "It colours the cells"],
              ],
              answer: 0,
              explain: [
                "Bir çapraz tabloda satır ve sütun başlıklarına göre doğru $ kombinasyonunu seçtiğinde, tek formülü yazıp tüm tabloya kopyalaman yeterli olur — her hücre için ayrı formül yazmana gerek kalmaz.",
                "Once you pick the right $ combination relative to the row and column headers, writing the formula once and copying it across the whole table is enough — you never write a separate formula per cell.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Info blokta anlatılan `$A1` referansı neyi sabitler?",
                "According to the info box, what does the `$A1` reference fix?",
              ],
              options: [
                ["Sütunu sabitler, satır kayar", "It fixes the column, the row shifts"],
                ["Satırı sabitler, sütun kayar", "It fixes the row, the column shifts"],
                ["İkisini de sabitler", "It fixes both"],
                ["İkisini de kaydırır", "It shifts both"],
              ],
              answer: 0,
              explain: [
                "Info blokta açıkça belirtildiği gibi `$A1` sütunu sabitler; formülü yatay kopyaladığında A sabit kalır, dikey kopyaladığında satır numarası değişir.",
                "As the info box states directly, `$A1` locks the column; copy the formula horizontally and A stays put, copy it vertically and the row number changes.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "SUMIFS'e kaç tane koşul (aralık; ölçüt) çifti ekleyebilirsin?",
                "How many condition (range; criteria) pairs can you add to SUMIFS?",
              ],
              options: [
                ["İstediğin kadar", "As many as you need"],
                ["En fazla bir", "At most one"],
                ["En fazla iki", "At most two"],
                ["Yalnızca sabit üç tane", "Exactly three, fixed"],
              ],
              answer: 0,
              explain: [
                "SUMIF tek koşulla sınırlıyken SUMIFS istediğin kadar (aralık; ölçüt) çifti kabul eder — bu yüzden gerçek işte çok koşullu raporlarda hep SUMIFS tercih edilir.",
                "Where SUMIF is limited to a single condition, SUMIFS accepts as many (range; criteria) pairs as you need — which is why real-world multi-condition reports always reach for SUMIFS.",
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
            quiz({
              id: "q2",
              q: [
                "KIRP / TRIM fonksiyonu ne yapar?",
                "What does the TRIM function do?",
              ],
              options: [
                [
                  "Baştaki, sondaki ve fazla iç boşlukları siler",
                  "Removes leading, trailing and extra internal spaces",
                ],
                ["Metni büyük harfe çevirir", "Converts text to uppercase"],
                ["Metnin uzunluğunu döndürür", "Returns the length of the text"],
                ["Sayıları metne çevirir", "Converts numbers to text"],
              ],
              answer: 0,
              explain: [
                "TRIM özellikle görünmeyen fazla boşuklardan kaynaklanan arama hatalarının klasik çözümüdür; metnin başındaki, sonundaki ve içindeki fazla boşlukları temizler.",
                "TRIM is the classic fix for lookup failures caused by invisible extra spaces; it cleans up leading, trailing and extra internal whitespace.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Kod örneğinde `=UZUNLUK(A2)` 10, `=UZUNLUK(KIRP(A2))` 9 veriyor. Bu ne anlama gelir?",
                "In the code example `=LEN(A2)` returns 10 while `=LEN(TRIM(A2))` returns 9. What does this mean?",
              ],
              options: [
                [
                  "A2'de fazladan bir boşluk karakteri var",
                  "A2 contains one extra space character",
                ],
                ["A2'de bir yazım hatası var", "A2 has a typo"],
                ["A2 sayı olarak biçimlenmiş", "A2 is formatted as a number"],
                ["KIRP fonksiyonu hatalı çalışıyor", "The TRIM function is malfunctioning"],
              ],
              answer: 0,
              explain: [
                "İki UZUNLUK/LEN sonucu arasındaki fark tam olarak temizlenen boşluk sayısını verir; burada fark 1 olduğu için A2'de görünmeyen tek bir fazla boşluk vardır.",
                "The difference between the two LEN results is exactly the number of spaces removed; a difference of 1 here means A2 contains a single invisible extra space.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "BİRLEŞTİR / TEXTJOIN fonksiyonu ne işe yarar?",
                "What is TEXTJOIN used for?",
              ],
              options: [
                ["Birden çok hücreyi bir ayıraçla birleştirir", "Combines several cells with a delimiter"],
                ["Bir hücreyi ayıraçtan böler", "Splits a cell at a delimiter"],
                ["İki tarihi karşılaştırır", "Compares two dates"],
                ["Bir sütunu sıralar", "Sorts a column"],
              ],
              answer: 0,
              explain: [
                "TEXTJOIN, TEXTSPLIT'in tersi bir işi yapar: birden çok hücreyi seçtiğin bir ayıraçla (örneğin virgül veya boşluk) tek bir metinde birleştirir.",
                "TEXTJOIN does the opposite of TEXTSPLIT: it combines several cells into one string using a delimiter you choose, such as a comma or a space.",
              ],
            }),
            pitfall(
              "Tarih olarak görünen metinler",
              "Text that only looks like a date",
              "CSV'den gelen tarihler çok sık **metin** olarak yüklenir. Belirtisi: hücre sola yaslanmıştır (Excel sayı ve tarihleri sağa yaslar) ve `YIL()` fonksiyonu hata verir.\n\nÇözüm sırası: önce sütunu seç → Veri sekmesi → **Metni Sütunlara Dönüştür** → tarih biçimini seç. Ya da `TARİHSAYISI / DATEVALUE` fonksiyonuyla çevir.\n\nTürkçe Excel'de ek bir tuzak: `01/02/2024` sistem ayarına göre 1 Şubat ya da 2 Ocak olarak okunabilir. Belirsizliği tamamen ortadan kaldırmak için veri kaynağından **`YYYY-MM-DD`** biçimi istemek en güvenli yoldur.",
              "Dates from a CSV very often load as **text**. The symptom: the cell is left-aligned (Excel right-aligns numbers and dates) and `YEAR()` raises an error.\n\nThe fix, in order: select the column → Data tab → **Text to Columns** → choose the date format. Or convert with `DATEVALUE`.\n\nAn extra trap: `01/02/2024` may be read as 1 February or 2 January depending on locale. The safest way to eliminate the ambiguity entirely is to ask the source system for the **`YYYY-MM-DD`** format.",
            ),
            quiz({
              id: "q5",
              q: [
                "CSV'den gelen bir tarih sütunu metin olarak yüklenmişse bunu nasıl anlarsın?",
                "How can you tell that a date column loaded from a CSV is actually text?",
              ],
              options: [
                [
                  "Hücre sola yaslanır ve YIL() fonksiyonu hata verir",
                  "The cell is left-aligned and the YEAR() function raises an error",
                ],
                ["Hücre kırmızı görünür", "The cell appears red"],
                ["Excel dosyayı açmayı reddeder", "Excel refuses to open the file"],
                ["Hücrenin fontu değişir", "The cell's font changes"],
              ],
              answer: 0,
              explain: [
                "Excel sayı ve tarihleri varsayılan olarak sağa, metni sola yaslar. Bir \"tarih\" sola yaslanmışsa aslında metindir ve YIL() gibi tarih fonksiyonları onu işleyemeyip hata verir.",
                "Excel right-aligns numbers and dates by default and left-aligns text. If a \"date\" is left-aligned it is actually text, and date functions like YEAR() cannot process it and raise an error.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Metin olarak yüklenmiş bir tarih sütununu düzeltmenin yollarından biri nedir?",
                "What is one way to fix a date column that loaded as text?",
              ],
              options: [
                ["Veri → Metni Sütunlara Dönüştür kullanmak", "Use Data → Text to Columns"],
                ["Hücreyi silip yeniden yazmak", "Delete the cell and retype it"],
                ["Sütun genişliğini artırmak", "Increase the column width"],
                ["Hücreyi birleştirmek", "Merge the cell"],
              ],
              answer: 0,
              explain: [
                "Metin, sütunu seçip Veri sekmesinden Metni Sütunlara Dönüştür'ü kullanarak ve tarih biçimini seçerek bu sorunun çözülebileceğini söyler; alternatif olarak TARİHSAYISI/DATEVALUE fonksiyonuyla da çevrilebilir.",
                "The lesson states this can be fixed by selecting the column, using Text to Columns on the Data tab and choosing the date format; alternatively it can be converted with the DATEVALUE function.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`01/02/2024` gibi bir tarihin belirsizliğini tamamen ortadan kaldırmanın en güvenli yolu nedir?",
                "What is the safest way to eliminate the ambiguity of a date like `01/02/2024`?",
              ],
              options: [
                [
                  "Veri kaynağından YYYY-MM-DD biçimi istemek",
                  "Ask the source system for the YYYY-MM-DD format",
                ],
                ["Excel'in dilini İngilizce yapmak", "Switch Excel's language to English"],
                ["Tarihi her zaman metin olarak bırakmak", "Always leave the date as text"],
                ["Ayı elle yazmak", "Type the month by hand"],
              ],
              answer: 0,
              explain: [
                "`01/02/2024` sistem ayarına göre 1 Şubat ya da 2 Ocak olarak okunabilir. YYYY-MM-DD biçimi yıl-ay-gün sırasını sabitlediği için hiçbir yerel ayara bağlı olmadan tek bir şekilde okunur.",
                "`01/02/2024` may be read as 1 February or 2 January depending on locale. The YYYY-MM-DD format fixes the year-month-day order, so it reads unambiguously regardless of locale settings.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: [
                "BUL / SEARCH fonksiyonu ne bulur?",
                "What does the SEARCH function find?",
              ],
              options: [
                [
                  "Bir karakterin metin içinde kaçıncı sırada olduğunu",
                  "The position of a character within a string",
                ],
                ["Bir karakterin kaç kez tekrarlandığını", "How many times a character repeats"],
                ["Metnin toplam uzunluğunu", "The total length of the text"],
                ["Metindeki büyük harfleri", "The uppercase letters in the text"],
              ],
              answer: 0,
              explain: [
                "BUL/SEARCH, aradığın karakterin (örneğin boşluğun) metindeki kaçıncı pozisyonda olduğunu bir sayı olarak döndürür; SOLDAN/RIGHT gibi fonksiyonlarla birlikte kullanılarak metnin bir kısmını almaya yarar.",
                "SEARCH returns, as a number, the position of the character you are looking for (such as a space) within the text; it is combined with functions like LEFT/RIGHT to extract part of a string.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`=SOLDAN(A2; BUL(\" \"; A2) - 1)` formülü \"Elif Kaya\" hücresinden neyi çıkarır?",
                "What does `=LEFT(A2, SEARCH(\" \", A2) - 1)` extract from the cell \"Elif Kaya\"?",
              ],
              options: [
                ["\"Elif\" — boşluktan önceki kısmı", "\"Elif\" — the part before the space"],
                ["\"Kaya\" — boşluktan sonraki kısmı", "\"Kaya\" — the part after the space"],
                ["Yalnızca boşluk karakterini", "Just the space character"],
                ["Tüm hücreyi olduğu gibi", "The whole cell unchanged"],
              ],
              answer: 0,
              explain: [
                "BUL boşluğun konumunu bulur (6. karakter); SOLDAN bu konuma kadar olan karakterleri alır, `-1` ise boşluğun kendisini dışarıda bırakmak içindir. Sonuç: \"Elif\".",
                "SEARCH finds the position of the space (character 6); LEFT then takes everything up to that position, and the `-1` excludes the space itself. The result is \"Elif\".",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Metin olarak yüklenmiş bir tarihi bir formülle çevirmek istersen hangi fonksiyonu kullanırsın?",
                "If you want to convert a text-looking date with a formula, which function would you use?",
              ],
              options: [
                ["TARİHSAYISI / DATEVALUE", "DATEVALUE"],
                ["METİNEÇEVİR / TEXT", "TEXT"],
                ["UZUNLUK / LEN", "LEN"],
                ["BUGÜN / TODAY", "TODAY"],
              ],
              answer: 0,
              explain: [
                "Metin, metin olarak görünen bir tarihi Metni Sütunlara Dönüştür yerine formülle çevirmek istersen TARİHSAYISI/DATEVALUE fonksiyonunu alternatif olarak sunar.",
                "The lesson offers DATEVALUE as the formula-based alternative to Text to Columns for converting a text-looking date.",
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
            quiz({
              id: "q1",
              q: [
                "PivotTable'da Rows alanına ne yerleştirilir?",
                "What goes into the Rows zone of a PivotTable?",
              ],
              options: [
                ["Satır başlıkları oluşturan bir boyut", "A dimension that becomes the row headers"],
                ["Yalnızca sayısal bir metrik", "Only a numeric metric"],
                ["Sayfa düzeyinde bir filtre", "A page-level filter"],
                ["Grafik türü", "A chart type"],
              ],
              answer: 0,
              explain: [
                "Rows alanı bir boyutu (örneğin Kategori ya da Şehir) alır ve bunu satır başlıkları olarak gösterir; her benzersiz değer için bir satır oluşur.",
                "The Rows zone takes a dimension (like Category or City) and displays it as row headers; each distinct value becomes one row.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "PivotTable'da Values alanına ne konur?",
                "What goes into the Values zone of a PivotTable?",
              ],
              options: [
                [
                  "Hesaplanan metrik (ölçü), örneğin toplam tutar",
                  "The computed metric (a measure), such as total amount",
                ],
                ["Yalnızca metinsel bir boyut", "Only a text dimension"],
                ["Sayfa filtresi", "The page filter"],
                ["Sütun başlığı", "A column header"],
              ],
              answer: 0,
              explain: [
                "Values alanı, Rows ve Columns'un kestiği her hücrede gösterilecek sayıyı üretir — toplam, ortalama, sayım gibi bir özet hesabıdır.",
                "The Values zone produces the number shown at the intersection of Rows and Columns — a summary calculation like sum, average or count.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "PivotTable'daki Filters alanı ne işe yarar?",
                "What does the Filters zone of a PivotTable do?",
              ],
              options: [
                ["Sayfa düzeyinde filtre uygular", "Applies a page-level filter"],
                ["Satırları sıralar", "Sorts the rows"],
                ["Sütunları renklendirir", "Colours the columns"],
                ["Değerleri toplar", "Sums the values"],
              ],
              answer: 0,
              explain: [
                "Filters alanına bıraktığın bir alan, tüm pivotu o alanın seçtiğin değerine göre daraltan bir sayfa düzeyi filtre görevi görür; Rows/Columns/Values'u etkilemeden dışarıdan süzer.",
                "A field dropped into Filters acts as a page-level filter that narrows the whole pivot to the value you pick; it filters from the outside without touching Rows/Columns/Values.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Aynı alanı Values'a iki kez atıp birini \"% of Column Total\" yaparsan ne elde edersin?",
                "If you drop the same field into Values twice and set one to \"% of Column Total\", what do you get?",
              ],
              options: [
                ["Hem tutarı hem payı yan yana görürsün", "You see the amount and the share side by side"],
                ["Pivot hata verir", "The pivot raises an error"],
                ["Alan otomatik silinir", "The field is automatically deleted"],
                ["Yalnızca yüzde görünür, tutar kaybolur", "Only the percentage shows, the amount disappears"],
              ],
              answer: 0,
              explain: [
                "Values, aynı alanı birden çok kez kabul eder ve her kopyaya farklı bir \"Show Values As\" ayarı verebilirsin; biri ham tutarı, diğeri toplam içindeki payını gösterir — ikisi yan yana okunur.",
                "Values accepts the same field more than once, and each copy can have its own \"Show Values As\" setting; one shows the raw amount, the other its share of the total — readable side by side.",
              ],
            }),
            tip(
              "Slicer ve Timeline",
              "Slicers and Timelines",
              "`Insert → Slicer` ile tıklanabilir filtre düğmeleri, `Insert → Timeline` ile tarih kaydırıcısı eklersin. Bir slicer'ı birden çok pivota bağlamak için `Report Connections` kullan — böylece tek tıkla tüm sayfa aynı anda filtrelenir ve elinde çalışan bir pano olur.",
              "`Insert → Slicer` gives you clickable filter buttons and `Insert → Timeline` a date slider. Use `Report Connections` to wire one slicer to several pivots — one click then filters the whole sheet and you effectively have a dashboard.",
            ),
            quiz({
              id: "q5",
              q: [
                "Insert → Slicer ne ekler?",
                "What does Insert → Slicer add?",
              ],
              options: [
                ["Tıklanabilir filtre düğmeleri", "Clickable filter buttons"],
                ["Tarih kaydırıcısı", "A date slider"],
                ["Yeni bir sayfa", "A new sheet"],
                ["Bir grafik", "A chart"],
              ],
              answer: 0,
              explain: [
                "Slicer, klasik süzgeç açılır menüsü yerine tıklanabilir düğmeler sunar; hangi değerlerin gösterildiği tek bakışta görülür ve seçim yapmak tek tıkla olur.",
                "A Slicer offers clickable buttons instead of a classic filter dropdown; which values are shown is visible at a glance and selecting one takes a single click.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Insert → Timeline ne ekler?",
                "What does Insert → Timeline add?",
              ],
              options: [
                ["Tarih kaydırıcısı", "A date slider"],
                ["Tıklanabilir kategori düğmeleri", "Clickable category buttons"],
                ["Bir PivotChart", "A PivotChart"],
                ["Bir Ad Yöneticisi girdisi", "A Name Manager entry"],
              ],
              answer: 0,
              explain: [
                "Timeline, tarih alanları için özel bir slicer türüdür; gün/ay/çeyrek/yıl arasında kaydırarak pivotu bir tarih aralığına göre filtrelemeni sağlar.",
                "A Timeline is a slicer built specifically for date fields; you drag across day/month/quarter/year to filter the pivot to a date range.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Bir slicer'ı birden çok pivota bağlamak için ne kullanılır?",
                "What do you use to connect one slicer to several pivots?",
              ],
              options: [
                ["Report Connections", "Report Connections"],
                ["Ad Yöneticisi / Name Manager", "Name Manager"],
                ["Sayfa Koruması / Protect Sheet", "Protect Sheet"],
                ["Veri Doğrulama / Data Validation", "Data Validation"],
              ],
              answer: 0,
              explain: [
                "Report Connections, bir slicer'ı aynı veri kaynağından beslenen birden çok PivotTable'a bağlar; böylece tek slicer tıklaması tüm sayfadaki pivotları aynı anda filtreler ve elinde çalışan bir pano olur.",
                "Report Connections wires one slicer to several PivotTables fed from the same data source; a single slicer click then filters every pivot on the sheet at once, giving you a working dashboard.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "PivotTable'ın en büyük avantajı nedir?",
                "What is the biggest advantage of a PivotTable?",
              ],
              options: [
                [
                  "Tek satır formül yazmadan çok boyutlu özet üretmek",
                  "Producing a multi-dimensional summary without writing a single formula",
                ],
                ["Dosya boyutunu küçültmek", "Reducing the file size"],
                ["Veriyi otomatik temizlemek", "Automatically cleaning the data"],
                ["Sayfaları korumaya almak", "Protecting sheets"],
              ],
              answer: 0,
              explain: [
                "Dersin özetinde de vurgulandığı gibi, PivotTable'ın gücü, alanları sürükleyip bırakarak beş dakikada çok boyutlu bir özet elde etmen, hiç formül yazmana gerek kalmamasıdır.",
                "As the lesson's summary highlights, the PivotTable's power is that dragging fields into place gives you a multi-dimensional summary in five minutes, with no formula writing at all.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "PivotTable'da Columns alanı ne için kullanılır?",
                "What is the Columns zone used for in a PivotTable?",
              ],
              options: [
                [
                  "İkinci bir boyutu sütun başlığı olarak göstermek",
                  "Displaying a second dimension as column headers",
                ],
                ["Yalnızca sayısal bir ölçüyü göstermek", "Displaying only a numeric measure"],
                ["Sayfa filtresi uygulamak", "Applying the page filter"],
                ["Grafiği renklendirmek", "Colouring the chart"],
              ],
              answer: 0,
              explain: [
                "Rows tek bir boyutu satırlara yayarken, Columns ikinci bir boyutu sütun başlığı olarak ekleyerek çapraz tablo (Kategori × Ay gibi) oluşturmanı sağlar.",
                "While Rows spreads one dimension down the rows, Columns adds a second dimension as column headers, letting you build a cross-tab such as Category × Month.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Power Query'de kaydedilen adımları yeni bir ay için tekrar uygulamak için ne yaparsın?",
                "What do you do to replay the recorded steps on a new month's data in Power Query?",
              ],
              options: [
                ["Yenile / Refresh'e basmak", "Press Refresh"],
                ["Sorguyu yeniden yazmak", "Rewrite the query from scratch"],
                ["Yeni bir dosya oluşturmak", "Create a new file"],
                ["Excel'i yeniden başlatmak", "Restart Excel"],
              ],
              answer: 0,
              explain: [
                "Power Query'nin bütün değeri burada: adımları bir kez kaydedersin, sonraki her ay yeni dosyayı koyup Yenile dersin ve tüm adımlar sırayla otomatik tekrar uygulanır.",
                "This is Power Query's whole value: you record the steps once, and every following month you drop in the new file and press Refresh, replaying every step automatically in order.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Power Query'ye nereden erişilir?",
                "Where do you access Power Query from?",
              ],
              options: [
                ["Veri sekmesi → Veri Al ve Dönüştür", "Data tab → Get & Transform Data"],
                ["Formüller sekmesi → Ad Yöneticisi", "Formulas tab → Name Manager"],
                ["Gözden Geçir sekmesi → Sayfayı Koru", "Review tab → Protect Sheet"],
                ["Ekle sekmesi → PivotTable", "Insert tab → PivotTable"],
              ],
              answer: 0,
              explain: [
                "Power Query, Veri sekmesindeki Veri Al ve Dönüştür grubunda yaşar; kaynak olarak CSV, Excel, klasör, veritabanı veya web sayfası seçebilirsin.",
                "Power Query lives under Get & Transform Data on the Data tab; you can pick a CSV, Excel file, folder, database or web page as the source.",
              ],
            }),
            text(
              "**En çok kullanılan dönüşümler:**\n\n- **Sütun kaldır / tut** — gereksiz sütunları at\n- **Veri tipini değiştir** — metin gelen sayıyı ve tarihi düzelt\n- **Sütunu böl** — ayıraçtan veya karakter sayısından\n- **Değiştir** — bul-değiştir, ama kayıtlı ve tekrarlanabilir\n- **Kaldırılmış yinelenenler** — tekrarlı satırları temizle\n- **Sütunu ters çevir (Unpivot)** — geniş tabloyu uzun biçime çevirir. Aylar sütun olarak gelmiş bir tabloyu analiz edilebilir hâle getirmenin tek doğru yolu.\n- **Sorguları birleştir (Merge)** — JOIN karşılığı; iki tabloyu anahtar üzerinden eşler\n- **Sorguları ekle (Append)** — UNION karşılığı; tabloları alt alta yığar\n- **Klasörden içe aktar** — bir klasördeki **tüm** dosyaları tek tabloda toplar",
              "**The most-used transformations:**\n\n- **Remove / keep columns** — drop what you do not need\n- **Change data type** — fix numbers and dates that arrived as text\n- **Split column** — by delimiter or character count\n- **Replace values** — find-and-replace, but recorded and repeatable\n- **Remove duplicates** — clear repeated rows\n- **Unpivot columns** — turns a wide table into long form. The only correct way to make a table whose months arrived as columns analysable.\n- **Merge queries** — the JOIN equivalent; matches two tables on a key\n- **Append queries** — the UNION equivalent; stacks tables on top of each other\n- **Import from folder** — collects **every** file in a folder into one table",
            ),
            quiz({
              id: "q4",
              q: [
                "Sorguları Birleştir (Merge) ile Sorguları Ekle (Append) arasındaki fark nedir?",
                "What is the difference between Merge queries and Append queries?",
              ],
              options: [
                [
                  "Merge JOIN gibi anahtar üzerinden eşler, Append UNION gibi alt alta yığar",
                  "Merge matches on a key like a JOIN, Append stacks tables on top of each other like a UNION",
                ],
                ["İkisi de aynı işi yapar", "They both do the same thing"],
                ["Merge sütun ekler, Append satır siler", "Merge adds columns, Append deletes rows"],
                ["Append yalnızca sayısal verilerde çalışır", "Append only works on numeric data"],
              ],
              answer: 0,
              explain: [
                "Merge, iki tabloyu ortak bir anahtar üzerinden yan yana eşler — SQL'deki JOIN'in karşılığıdır. Append ise tabloları alt alta yığar — SQL'deki UNION'ın karşılığıdır.",
                "Merge matches two tables side by side on a shared key — the equivalent of a SQL JOIN. Append stacks tables on top of each other — the equivalent of a SQL UNION.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Kaldırılmış Yinelenenler adımı ne yapar?",
                "What does the Remove Duplicates step do?",
              ],
              options: [
                ["Tekrarlı satırları temizler", "Clears repeated rows"],
                ["Boş hücreleri siler", "Deletes empty cells"],
                ["Sütun adlarını değiştirir", "Renames the columns"],
                ["Veriyi sıralar", "Sorts the data"],
              ],
              answer: 0,
              explain: [
                "Bu adım, seçilen sütun(lar)a göre birebir aynı olan tekrar eden satırları tablodan çıkarır — özellikle birden çok kaynağı Append ile birleştirdikten sonra sık kullanılır.",
                "This step removes rows that are exact duplicates on the chosen column(s) — commonly needed right after combining several sources with Append.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Sütunu Böl adımı hangi durumda kullanılır?",
                "When would you use the Split Column step?",
              ],
              options: [
                [
                  "Tek sütundaki bilgiyi ayıraçtan veya karakter sayısından bölerek birden çok sütuna ayırmak için",
                  "To split the information in one column into several columns, by delimiter or by character count",
                ],
                ["İki sütunu tek sütunda birleştirmek için", "To combine two columns into one"],
                ["Satırları silmek için", "To delete rows"],
                ["Veri tipini değiştirmek için", "To change the data type"],
              ],
              answer: 0,
              explain: [
                "Sütunu Böl, örneğin \"Elif / Kaya\" gibi tek sütunda gelen bir değeri bir ayıraçtan (\" / \") ya da sabit karakter sayısından bölerek ad ve soyad gibi ayrı sütunlara dağıtır.",
                "Split Column takes a value arriving in one column — like \"Elif / Kaya\" — and breaks it apart at a delimiter (\" / \") or a fixed character count into separate columns, such as first and last name.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Veri Tipini Değiştir adımı hangi sorunu çözer?",
                "What problem does the Change Data Type step solve?",
              ],
              options: [
                [
                  "Metin olarak gelen sayı ve tarihleri düzeltir",
                  "Fixes numbers and dates that arrived as text",
                ],
                ["Yinelenen satırları siler", "Deletes duplicate rows"],
                ["Sütun adlarını çevirir", "Translates column names"],
                ["Dosya boyutunu küçültür", "Reduces the file size"],
              ],
              answer: 0,
              explain: [
                "Kaynak sistemden gelen sayı ve tarihler çoğu zaman metin olarak yüklenir. Bu adım onları gerçek sayı veya tarih tipine çevirir, böylece toplama ve tarih fonksiyonları düzgün çalışır.",
                "Numbers and dates coming from a source system frequently arrive as text. This step converts them to real number or date types so summing and date functions work correctly.",
              ],
            }),
            tip(
              "Klasörden içe aktarma sihirdir",
              "Import from folder is the magic trick",
              "Her ay gelen 12 aylık rapor dosyasını tek tek açıp kopyalamak yerine, hepsini bir klasöre koy ve Power Query'de **Klasörden** kaynağını seç. Power Query klasördeki tüm dosyaları okur, aynı şekilde dönüştürür ve alt alta ekler.\n\nGelecek ay 13. dosyayı klasöre atıp Yenile demen yeterlidir. Yıllarca süren bir manuel işi bir kereye indirir — ve Excel öğrenirken karşılaşacağın en yüksek getirili tek özellik budur.",
              "Instead of opening and copying twelve monthly report files one by one, put them in a folder and choose the **From Folder** source in Power Query. It reads every file, transforms them identically and stacks them.\n\nNext month you drop file thirteen into the folder and press Refresh. It reduces years of manual work to a one-off — and it is the single highest-return feature you will meet while learning Excel.",
            ),
            quiz({
              id: "q8",
              q: [
                "Klasörden içe aktarma özelliğinin en büyük faydası nedir?",
                "What is the biggest benefit of the Import from folder feature?",
              ],
              options: [
                [
                  "Bir klasördeki tüm dosyaları aynı şekilde dönüştürüp tek tabloda birleştirir",
                  "It transforms every file in a folder identically and combines them into one table",
                ],
                ["Dosyaları otomatik olarak siler", "It automatically deletes the files"],
                ["Yalnızca CSV dosyalarında çalışır", "It only works with CSV files"],
                ["Dosyaları e-posta ile gönderir", "It emails the files"],
              ],
              answer: 0,
              explain: [
                "Klasörden kaynağı, bir klasördeki her dosyayı okur, aynı dönüşüm adımlarını her birine uygular ve hepsini alt alta tek bir tabloda birleştirir — on iki dosyayı tek tek açıp kopyalamanın yerini alır.",
                "The From Folder source reads every file in a folder, applies the same transformation steps to each, and stacks them all into one table — replacing opening and copying twelve files by hand.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Gelecek ay 13. rapor dosyası geldiğinde, Klasörden içe aktarma kurulu bir sorguda ne yapman yeterlidir?",
                "Next month, when the 13th report file arrives, what is enough to do with a From Folder query already set up?",
              ],
              options: [
                ["Dosyayı klasöre atıp Yenile demek", "Drop the file in the folder and press Refresh"],
                ["Sorguyu sıfırdan yeniden kurmak", "Rebuild the query from scratch"],
                ["Tüm eski dosyaları silmek", "Delete all the old files"],
                ["Yeni bir çalışma kitabı açmak", "Open a new workbook"],
              ],
              answer: 0,
              explain: [
                "Klasörden kaynağı kurulduktan sonra tek yapman gereken yeni dosyayı klasöre koymak ve Yenile'ye basmaktır; sorgu klasördeki tüm dosyaları otomatik olarak yeniden okur.",
                "Once the From Folder source is set up, all you do is drop the new file into the folder and press Refresh; the query automatically re-reads every file in the folder.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Power Query'nin temel değeri nedir?",
                "What is the core value of Power Query?",
              ],
              options: [
                [
                  "Temizleme işini bir kez yapıp adımları kaydederek her seferinde tekrarlanabilir kılmak",
                  "Doing the cleaning work once and recording the steps so it repeats automatically every time",
                ],
                ["Dosyayı şifrelemek", "Encrypting the file"],
                ["Grafik çizmek", "Drawing charts"],
                ["Sayfayı korumaya almak", "Protecting the sheet"],
              ],
              answer: 0,
              explain: [
                "Metnin baştaki cümlesi bunu özetler: elle temizlemek her ay yeniden yapılması gereken bir iştir; Power Query bunu bir kez yapmanı ve adımları kaydedip her sefer otomatik tekrarlamanı sağlar.",
                "The lesson opens with exactly this: manual cleaning is work you must redo every month; Power Query lets you do it once, record the steps, and have them replay automatically every time.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Power Pivot nedir?",
                "What is Power Pivot?",
              ],
              options: [
                [
                  "Excel'in içindeki, birden çok tabloyu ilişkilendiren ve DAX ölçüleri yazmanı sağlayan veri modeli",
                  "Excel's built-in data model that relates multiple tables and lets you write DAX measures",
                ],
                ["Excel'in yeni grafik motoru", "Excel's new charting engine"],
                ["Bir tür koşullu biçimlendirme", "A type of conditional formatting"],
                ["Yalnızca metin fonksiyonları eklentisi", "An add-in that only adds text functions"],
              ],
              answer: 0,
              explain: [
                "Metin tanımı açık: Power Pivot, Excel'in içindeki veri modelidir; birden çok tabloyu ilişkilendirir, veriyi sıkıştırarak tutar ve DAX ölçüleri yazmana izin verir.",
                "The lesson's definition is direct: Power Pivot is Excel's built-in data model — it relates multiple tables, stores data compressed, and lets you write DAX measures.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Power Pivot ile Power BI arasındaki ilişki nedir?",
                "What is the relationship between Power Pivot and Power BI?",
              ],
              options: [
                [
                  "Aynı motoru kullanırlar; Power Pivot öğrenmek Power BI'ın yarısını öğrenmektir",
                  "They share the same engine; learning Power Pivot is learning half of Power BI",
                ],
                ["Birbirleriyle hiç ilgileri yoktur", "They have nothing to do with each other"],
                ["Power BI, Power Pivot'un eski sürümüdür", "Power BI is an older version of Power Pivot"],
                ["Power Pivot yalnızca grafik çizer", "Power Pivot only draws charts"],
              ],
              answer: 0,
              explain: [
                "Metin bunu doğrudan söyler: Power Pivot, Power BI'ın motorunun aynısıdır. Bu yüzden Power Pivot'ta öğrendiğin ilişkiler ve DAX bilgisi doğrudan Power BI'a taşınır.",
                "The lesson states this directly: Power Pivot is the same engine as Power BI. So the relationships and DAX knowledge you learn in Power Pivot carry straight over to Power BI.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Power Pivot veri modelinin normal bir Excel sayfasına göre avantajı nedir?",
                "What advantage does the Power Pivot data model have over a normal Excel sheet?",
              ],
              options: [
                ["Milyonlarca satırı sıkıştırarak tutabilir", "It can hold millions of rows by compressing them"],
                ["Yalnızca metin verisi tutar", "It only stores text data"],
                ["Formül yazmaya izin vermez", "It does not allow writing formulas"],
                ["Dosyayı otomatik olarak şifreler", "It automatically encrypts the file"],
              ],
              answer: 0,
              explain: [
                "Bir sayfa 1.048.576 satırla sınırlıyken, Power Pivot verinin sıkıştırılmış bir modelde tutulmasını sağlar; bu sayede milyonlarca satırı sayfaya hiç dökmeden işleyebilirsin.",
                "A sheet is capped at 1,048,576 rows, but Power Pivot keeps data in a compressed model, letting you work with millions of rows without ever spilling them onto a sheet.",
              ],
            }),
            code(
              "dax",
              `Toplam Ciro = SUM(Satis[Tutar])
Sipariş Sayısı = DISTINCTCOUNT(Satis[SiparisNo])
Ortalama Sepet = DIVIDE([Toplam Ciro]; [Sipariş Sayısı])
Geçen Yıl = CALCULATE([Toplam Ciro]; SAMEPERIODLASTYEAR(Tarih[Tarih]))`,
              "Power Pivot ölçüleri — Power BI ile birebir aynı söz dizimi",
              "Power Pivot measures — identical syntax to Power BI",
            ),
            quiz({
              id: "q5",
              q: [
                "`Toplam Ciro = SUM(Satis[Tutar])` ölçüsü ne yapar?",
                "What does the measure `Toplam Ciro = SUM(Satis[Tutar])` do?",
              ],
              options: [
                ["Satis tablosundaki Tutar sütununu toplar", "Sums the Amount column in the Sales table"],
                ["Satis tablosundaki satır sayısını sayar", "Counts the rows in the Sales table"],
                ["En yüksek tutarı bulur", "Finds the largest amount"],
                ["Tutar sütununu sıralar", "Sorts the Amount column"],
              ],
              answer: 0,
              explain: [
                "DAX'ta SUM, tıpkı Excel'deki TOPLA gibi çalışır: belirtilen tablonun sütunundaki tüm değerleri toplar. Fark, bunun bir hücre yerine bir ölçü (measure) olarak tanımlanmasıdır.",
                "SUM in DAX works just like SUM in Excel: it adds up all the values in the specified table column. The difference is that here it is defined as a measure, not a cell formula.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`Sipariş Sayısı = DISTINCTCOUNT(Satis[SiparisNo])` neden düz bir sayım yerine DISTINCTCOUNT kullanır?",
                "Why does `Sipariş Sayısı = DISTINCTCOUNT(Satis[SiparisNo])` use DISTINCTCOUNT rather than a plain count?",
              ],
              options: [
                [
                  "Bir siparişin birden çok satırı olabilir; DISTINCTCOUNT benzersiz sipariş sayısını verir",
                  "An order can span multiple rows; DISTINCTCOUNT gives the count of unique orders",
                ],
                ["DISTINCTCOUNT daha hızlı çalışır", "DISTINCTCOUNT simply runs faster"],
                ["COUNT metinlerde çalışmaz", "COUNT does not work on text"],
                ["Rastgele seçilmiş bir fonksiyon", "It is an arbitrary choice"],
              ],
              answer: 0,
              explain: [
                "Satis tablosunda bir sipariş genelde birden fazla satırla temsil edilir (her ürün bir satır). Sipariş sayısını doğru bulmak için satırları değil, benzersiz SiparisNo değerlerini saymak gerekir — bu da DISTINCTCOUNT'un işidir.",
                "In the Sales table an order is usually represented by several rows (one per product). To count orders correctly you must count unique SiparisNo values, not rows — which is exactly what DISTINCTCOUNT does.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`Geçen Yıl = CALCULATE([Toplam Ciro]; SAMEPERIODLASTYEAR(Tarih[Tarih]))` ölçüsü ne hesaplar?",
                "What does the measure `Geçen Yıl = CALCULATE([Toplam Ciro], SAMEPERIODLASTYEAR(Tarih[Tarih]))` calculate?",
              ],
              options: [
                [
                  "Aynı dönemin bir önceki yılki toplam cirosunu",
                  "The total revenue for the same period one year earlier",
                ],
                ["Bu yılın toplam cirosunu", "This year's total revenue"],
                ["Gelecek yılın tahmini cirosunu", "Next year's forecasted revenue"],
                ["Bugüne kadarki toplam ciroyu", "The total revenue to date"],
              ],
              answer: 0,
              explain: [
                "CALCULATE, [Toplam Ciro] ölçüsünü SAMEPERIODLASTYEAR'ın kaydırdığı bir tarih filtresiyle yeniden hesaplar; sonuç, aynı dönemin bir yıl öncesindeki toplam ciro olur.",
                "CALCULATE recomputes the [Toplam Ciro] measure under a date filter shifted by SAMEPERIODLASTYEAR; the result is the total revenue for the same period one year earlier.",
              ],
            }),
            text(
              "**Excel'den çıkma zamanı geldi** dediren işaretler:\n\n- Dosya 50 MB'ı geçiyor veya açılması dakikalar sürüyor\n- Aynı raporu her ay elle güncelliyorsun\n- Birden fazla kişi aynı dosyayı aynı anda düzenlemek zorunda\n- Satır sayısı 1.048.576 sınırına yaklaşıyor\n- \"Hangi dosya güncel?\" sorusu ekipte düzenli soruluyor\n\nBu maddelerden ikisi doğruysa Power BI veya bir veritabanı, harcadığın zamanı kısa sürede geri öder.",
              "Signs it is **time to leave Excel**:\n\n- The file passes 50 MB or takes minutes to open\n- You rebuild the same report by hand every month\n- More than one person needs to edit the same file at once\n- Row counts approach the 1,048,576 limit\n- \"Which file is the current one?\" is a regular question in the team\n\nIf two of these are true, moving to Power BI or a database pays for itself quickly.",
            ),
            quiz({
              id: "q8",
              q: [
                "Metne göre Excel'den çıkma zamanının geldiğini gösteren işaretlerden biri nedir?",
                "According to the lesson, which is one sign it is time to leave Excel?",
              ],
              options: [
                [
                  "Dosya 50 MB'ı geçiyor veya açılması dakikalar sürüyor",
                  "The file passes 50 MB or takes minutes to open",
                ],
                ["Dosyada birden fazla sayfa olması", "Having more than one sheet in the file"],
                ["Dosyanın Türkçe adlandırılmış olması", "The file having a Turkish name"],
                ["Formüllerin renkli olması", "The formulas being coloured"],
              ],
              answer: 0,
              explain: [
                "Metnin listelediği işaretlerden biri budur: dosya büyüyüp açılması dakikalar sürmeye başladığında, bu Excel'in performans sınırlarına yaklaşıldığının bir habercisidir.",
                "This is one of the signs the lesson lists: once the file grows large enough that opening it takes minutes, it signals you are nearing Excel's performance limits.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Birden fazla kişinin aynı dosyayı aynı anda düzenlemek zorunda kalması neyin işaretidir?",
                "What is it a sign of when more than one person needs to edit the same file at once?",
              ],
              options: [
                ["Excel'den çıkma zamanının geldiğinin", "That it is time to leave Excel"],
                ["Dosyanın bozuk olduğunun", "That the file is corrupted"],
                ["Sayfa korumasının açık olması gerektiğinin", "That sheet protection should be turned on"],
                ["Power Query kullanılması gerektiğinin", "That Power Query should be used"],
              ],
              answer: 0,
              explain: [
                "Excel dosyaları tek kullanıcı için tasarlanmıştır; eşzamanlı düzenleme ihtiyacı, verinin artık paylaşılan bir veritabanına veya bulut aracına taşınması gerektiğinin işaretlerinden biridir.",
                "Excel files are designed for a single editor; a need for simultaneous editing is one of the signals that the data should move to a shared database or cloud tool.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Metindeki kurala göre, listelenen işaretlerden kaçı doğruysa Power BI veya bir veritabanına geçiş kısa sürede karşılığını verir?",
                "According to the lesson's rule of thumb, how many of the listed signs being true means moving to Power BI or a database pays off quickly?",
              ],
              options: [
                ["İkisi", "Two"],
                ["Beşi de", "All five"],
                ["Yalnızca biri", "Just one"],
                ["Hiçbiri, her zaman geçmelisin", "None, you should always switch"],
              ],
              answer: 0,
              explain: [
                "Metin açıkça belirtir: bu maddelerden ikisi doğruysa Power BI veya bir veritabanına geçiş kısa sürede kendini amorti eder.",
                "The lesson states this directly: if two of these signs are true, moving to Power BI or a database pays for itself quickly.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Dinamik dizi formülünün sonucu neden \"döküldü\" (spill) olarak adlandırılır?",
                "Why is a dynamic array formula's result called a \"spill\"?",
              ],
              options: [
                [
                  "Tek hücreye yazılan formül sonucu otomatik olarak birden çok hücreye yayılır",
                  "A formula written in one cell automatically spreads its result across multiple cells",
                ],
                ["Formül hata verdiğinde kullanılan bir terimdir", "It is a term used only when the formula errors"],
                ["Veri kaybını ifade eder", "It refers to data loss"],
                ["Yalnızca grafiklerde geçerlidir", "It only applies to charts"],
              ],
              answer: 0,
              explain: [
                "Metin bunu tanımlar: dinamik diziler tek hücre yerine birden çok hücre döndürür ve sonuç otomatik olarak aşağıya \"dökülür\" (spill); komşu hücrelere elle formül yazman gerekmez.",
                "The lesson defines it this way: dynamic arrays return many cells instead of one, and the result automatically \"spills\" outward; you never type formulas into the neighbouring cells by hand.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "FİLTRE / FILTER fonksiyonu ne döndürür?",
                "What does the FILTER function return?",
              ],
              options: [
                ["Koşula uyan satırları", "The rows matching a condition"],
                ["Yalnızca ilk satırı", "Only the first row"],
                ["Sütun başlıklarını", "The column headers"],
                ["Tekrarsız bir liste", "A de-duplicated list"],
              ],
              answer: 0,
              explain: [
                "FİLTRE/FILTER, verdiğin koşula uyan tüm satırları döndürür; sonuç satır sayısı koşula kaç kaydın uyduğuna göre değişir ve otomatik olarak aşağı yayılır.",
                "FILTER returns every row matching the condition you give it; the number of result rows depends on how many records match, and the result spills down automatically.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "SEQUENCE ve RANDARRAY fonksiyonları ne üretir?",
                "What do SEQUENCE and RANDARRAY generate?",
              ],
              options: [
                ["Sırasıyla bir seri ve rastgele bir dizi", "A series and a random array, respectively"],
                ["İkisi de benzersiz listeler üretir", "Both generate distinct-value lists"],
                ["İkisi de metin birleştirir", "Both concatenate text"],
                ["İkisi de hata ayıklar", "Both perform error checking"],
              ],
              answer: 0,
              explain: [
                "Metinde belirtildiği gibi SEQUENCE ardışık bir sayı serisi üretir (1, 2, 3...), RANDARRAY ise belirttiğin boyutta rastgele sayılardan oluşan bir dizi üretir.",
                "As the lesson states, SEQUENCE generates a series of consecutive numbers (1, 2, 3...), while RANDARRAY generates an array of random numbers in the size you specify.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "`=FİLTRE(Satis; Satis[Sehir]=\"İstanbul\")` formülü kaç hücrelik bir sonuç döndürebilir?",
                "How many cells of result can `=FILTER(Satis, Satis[Sehir]=\"İstanbul\")` return?",
              ],
              options: [
                [
                  "Koşula uyan kaç satır varsa o kadar",
                  "As many as there are rows matching the condition",
                ],
                ["Her zaman tam olarak bir hücre", "Always exactly one cell"],
                ["Her zaman tüm tablo kadar", "Always the full table"],
                ["Yalnızca sıfır veya bir", "Only zero or one"],
              ],
              answer: 0,
              explain: [
                "FİLTRE bir dinamik dizi fonksiyonudur: tek hücreye yazılır ama İstanbul'daki sipariş sayısı kaçsa o kadar satır aşağı döker. Sonuç veriye göre büyür veya küçülür.",
                "FILTER is a dynamic array function: you type it into one cell, but it spills as many rows as there are İstanbul orders. The result grows or shrinks with the data.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`=SIRALA(BENZERSİZ(Satis[Sehir]))` formülü ne üretir?",
                "What does `=SORT(UNIQUE(Satis[Sehir]))` produce?",
              ],
              options: [
                [
                  "Benzersiz şehirlerin alfabetik sıralı listesini",
                  "An alphabetically sorted list of the distinct cities",
                ],
                ["Şehir sayısını tek bir sayı olarak", "The count of cities as a single number"],
                ["Tekrarlı şehirlerin listesini", "A list of the repeated cities"],
                ["En kalabalık şehri", "The most frequent city"],
              ],
              answer: 0,
              explain: [
                "İçteki BENZERSİZ önce tekrarları eleyip benzersiz şehir listesini üretir; dıştaki SIRALA bu listeyi alıp alfabetik sıraya dizer. İç içe dinamik diziler böyle zincirlenir.",
                "The inner UNIQUE first strips duplicates to produce the distinct city list; the outer SORT then takes that list and orders it alphabetically. This is how nested dynamic arrays chain together.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`=AL(SIRALAYAGÖRE(Satis; Satis[Tutar]; -1); 5)` formülü ne yapar?",
                "What does `=TAKE(SORTBY(Satis, Satis[Tutar], -1), 5)` do?",
              ],
              options: [
                [
                  "Tutara göre büyükten küçüğe sıralayıp ilk 5 satırı alır",
                  "Sorts by amount from largest to smallest and takes the first 5 rows",
                ],
                ["Tutarı küçükten büyüğe sıralayıp son 5 satırı alır", "Sorts amount smallest to largest and takes the last 5 rows"],
                ["Yalnızca 5. satırı döndürür", "Returns only row 5"],
                ["Tutarları 5'e böler", "Divides the amounts by 5"],
              ],
              answer: 0,
              explain: [
                "SIRALAYAGÖRE'de `-1` azalan sırayı (büyükten küçüğe) belirtir; AL/TAKE ise sıralanmış sonuçtan ilk 5 satırı keser. Birlikte \"en yüksek 5 sipariş\"i verirler.",
                "In SORTBY, `-1` means descending order (largest to smallest); TAKE then cuts the first 5 rows from the sorted result. Together they give you the \"top 5 orders\".",
              ],
            }),
            info(
              "Neden XLOOKUP, DÜŞEYARA'dan iyidir?",
              "Why XLOOKUP beats VLOOKUP",
              "**DÜŞEYARA'nın üç kronik sorunu:**\n\n1. Yalnızca **sağa** bakabilir — arama sütunu solda olmak zorundadır\n2. Sütun numarası verirsin (`3` gibi); araya yeni sütun eklenirse formül sessizce **yanlış sütuna** bakmaya başlar\n3. Varsayılanı yaklaşık eşleşmedir; `YANLIŞ` yazmayı unutmak sinsi hatalar üretir\n\n**XARA / XLOOKUP** üçünü de çözer: her yöne bakar, sütun numarası değil sütunun kendisini verirsin, varsayılanı tam eşleşmedir ve bulunamazsa ne döneceğini doğrudan yazabilirsin. 365 kullanıyorsan DÜŞEYARA'yı öğrenmene bile gerek yok.",
              "**VLOOKUP's three chronic problems:**\n\n1. It can only look **to the right** — the lookup column must be on the left\n2. You pass a column number (like `3`); insert a new column and the formula silently starts reading the **wrong** one\n3. Its default is approximate match; forgetting to write `FALSE` produces insidious bugs\n\n**XLOOKUP** fixes all three: it looks in any direction, you pass the column itself rather than a number, its default is exact match, and you can state directly what to return when nothing is found. If you are on 365 you need not even learn VLOOKUP.",
            ),
            quiz({
              id: "q8",
              q: [
                "DÜŞEYARA'nın kronik sorunlarından biri olarak, hangi yönde arama yapamaz?",
                "As one of VLOOKUP's chronic problems, in which direction can it not search?",
              ],
              options: [
                ["Sola", "To the left"],
                ["Sağa", "To the right"],
                ["Yukarı", "Upward"],
                ["Aşağı", "Downward"],
              ],
              answer: 0,
              explain: [
                "DÜŞEYARA yalnızca sağa doğru bakabilir; arama sütunu sonuç sütununun solunda olmak zorundadır. XARA/XLOOKUP bu kısıtı kaldırıp her iki yöne de bakabilir.",
                "VLOOKUP can only look to the right; the lookup column must sit to the left of the result column. XLOOKUP removes this constraint and can look in either direction.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "DÜŞEYARA'da sütun numarası vermek neden risklidir?",
                "Why is giving VLOOKUP a column number risky?",
              ],
              options: [
                [
                  "Araya yeni sütun eklenirse formül sessizce yanlış sütuna bakmaya başlar",
                  "If a new column is inserted, the formula silently starts reading the wrong column",
                ],
                ["Excel sütun numarasını kabul etmez", "Excel does not accept column numbers"],
                ["Formül her zaman hata verir", "The formula always raises an error"],
                ["Sütun numarası yalnızca metinlerde kullanılır", "Column numbers are only used with text"],
              ],
              answer: 0,
              explain: [
                "DÜŞEYARA'ya verdiğin `3` gibi bir sayı, o anki sütun sırasına göredir. Araya bir sütun eklendiğinde bu sıra kayar ama formül hata vermez — sessizce yanlış sütunu okumaya devam eder.",
                "A number like `3` given to VLOOKUP is relative to the current column order. Insert a column and that order shifts, but the formula does not error — it silently keeps reading the wrong column.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "DÜŞEYARA'da `YANLIŞ / FALSE` yazmayı unutmak neden tehlikelidir?",
                "Why is forgetting to write `FALSE` in VLOOKUP dangerous?",
              ],
              options: [
                [
                  "Varsayılan yaklaşık eşleşme kullanılır ve bu sinsi hatalar üretebilir",
                  "The default approximate match is used instead, and it can produce insidious errors",
                ],
                ["Formül hemen hata verir", "The formula errors out immediately"],
                ["Excel dosyayı kaydetmeyi reddeder", "Excel refuses to save the file"],
                ["Hiçbir fark olmaz", "It makes no difference"],
              ],
              answer: 0,
              explain: [
                "DÜŞEYARA'nın varsayılanı yaklaşık eşleşmedir; dördüncü argümanı boş bırakmak veya YANLIŞ yazmayı unutmak, tam olarak eşleşmeyen ama \"yakın\" bir değeri sessizce döndürebilir. XARA/XLOOKUP bu tuzağı varsayılan tam eşleşmeyle ortadan kaldırır.",
                "VLOOKUP's default is approximate match; leaving the fourth argument out or forgetting FALSE can silently return a \"close\" but not exact value. XLOOKUP removes this trap by defaulting to exact match.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Girdi (input) katmanı için doğru olan nedir?",
                "What is true of the input layer?",
              ],
              options: [
                [
                  "Elle yazılan tüm varsayımlar ve ham veri; tek doğruluk kaynağıdır",
                  "All hand-entered assumptions and raw data; the single source of truth",
                ],
                ["Yalnızca grafikleri içerir", "It contains only charts"],
                ["Tüm formülleri barındırır", "It holds all the formulas"],
                ["Yalnızca çıktı raporlarına başvurur", "It references only the output reports"],
              ],
              answer: 0,
              explain: [
                "Girdi katmanı, modeldeki her varsayımın ve ham verinin elle yazıldığı tek yerdir; genelde açık renkle işaretlenir ki kimse yanlışlıkla bir hesap hücresine sayı yazmasın.",
                "The input layer is the one place where every assumption and raw data point is hand-typed; it is usually shaded a distinct colour so nobody accidentally types a number into a calculation cell.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Hesap (calculation) katmanına dair kural nedir?",
                "What is the rule for the calculation layer?",
              ],
              options: [
                [
                  "Buraya elle sayı yazılmaz; her şey girdi katmanına başvurur",
                  "No number is ever typed here; everything references the input layer",
                ],
                ["Yalnızca metin içerir", "It contains only text"],
                ["Girdi katmanına asla başvurmaz", "It never references the input layer"],
                ["Renkli olması zorunludur", "It must be colour-shaded"],
              ],
              answer: 0,
              explain: [
                "Hesap katmanının tüm hücreleri formüldür ve bu formüller yalnızca girdi katmanındaki hücrelere başvurur; elle sabit bir sayı yazmak bu katmanın kuralını bozar.",
                "Every cell in the calculation layer is a formula, and those formulas reference only cells in the input layer; hand-typing a hard-coded number breaks this layer's rule.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Girdi, hesap ve çıktı katmanlarını ayırmanın tek amacı nedir?",
                "What is the single purpose of separating input, calculation and output layers?",
              ],
              options: [
                [
                  "Bir sayıyı değiştirmek gerektiğinde nereye bakacağını bilmek",
                  "Knowing where to look when a number needs to change",
                ],
                ["Dosya boyutunu küçültmek", "Reducing the file size"],
                ["Excel'in daha hızlı hesaplamasını sağlamak", "Making Excel calculate faster"],
                ["Yazdırma için gereklidir", "It is required for printing"],
              ],
              answer: 0,
              explain: [
                "Metin bu ayrımın amacını tek cümlede özetler: bir sayıyı değiştirmek gerektiğinde nereye bakacağını bilmek. Girdiler formüllerin arasına dağılmışsa, altı ay sonra hangisinin varsayım hangisinin sonuç olduğunu kimse ayırt edemez.",
                "The lesson sums up the purpose in one line: knowing where to look when a number must change. If inputs are scattered among formulas, nobody can tell six months later which number is an assumption and which is a result.",
              ],
            }),
            text(
              "**Denetim (audit) araçları — Formüller sekmesi:**\n\n- **Etkileyenleri İzle** — Bu hücre hangi hücrelere bakıyor? Oklarla gösterir.\n- **Etkilenenleri İzle** — Bu hücreyi kim kullanıyor? Bir sayıyı değiştirmeden önce sormanın yolu.\n- **Formülleri Göster (Ctrl+`)** — Tüm sayfayı formül olarak gösterir. Bir dosyayı hızla anlamanın en iyi yolu.\n- **Hata Denetimi** — Tutarsız formülleri ve şüpheli desenleri bulur.\n- **Ad Yöneticisi** — Hücrelere isim ver: `=Tutar*KDV_Orani` formülü `=B2*$D$1`'den kat kat okunurdur.",
              "**Auditing tools — the Formulas tab:**\n\n- **Trace Precedents** — which cells does this one read? Shown with arrows.\n- **Trace Dependents** — who uses this cell? The way to ask before changing a number.\n- **Show Formulas (Ctrl+`)** — displays the whole sheet as formulas. The fastest way to understand a file.\n- **Error Checking** — finds inconsistent formulas and suspicious patterns.\n- **Name Manager** — give cells names: the formula `=Amount*VAT_Rate` is far more readable than `=B2*$D$1`.",
            ),
            quiz({
              id: "q5",
              q: [
                "Etkileyenleri İzle / Trace Precedents ne gösterir?",
                "What does Trace Precedents show?",
              ],
              options: [
                ["Bu hücrenin hangi hücrelere baktığını", "Which cells this one reads from"],
                ["Bu hücreye bağımlı olan formülleri", "The formulas that depend on this cell"],
                ["Dosyadaki tüm hataları", "Every error in the file"],
                ["Sayfa korumasının durumunu", "The sheet protection status"],
              ],
              answer: 0,
              explain: [
                "Etkileyenleri İzle, seçili hücrenin beslendiği hücreleri oklarla gösterir; bir sayının nereden geldiğini anlamak için kullanılır — Etkilenenleri İzle'nin tam tersidir.",
                "Trace Precedents draws arrows to the cells that feed the selected one; it is used to understand where a number comes from — the exact reverse of Trace Dependents.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Formülleri Göster (Ctrl+`) ne yapar?",
                "What does Show Formulas (Ctrl+`) do?",
              ],
              options: [
                ["Tüm sayfayı formül olarak gösterir", "Displays the whole sheet as formulas"],
                ["Yalnızca seçili hücrenin formülünü gösterir", "Shows only the selected cell's formula"],
                ["Formülleri siler", "Deletes the formulas"],
                ["Formülleri kilitler", "Locks the formulas"],
              ],
              answer: 0,
              explain: [
                "Ctrl+` tüm sayfa görünümünü sonuç değerlerinden formüllere çevirir; bir dosyayı hızla anlamanın en iyi yolu olarak tanımlanır çünkü tüm mantığı tek bakışta görürsün.",
                "Ctrl+` switches the entire sheet view from result values to formulas; it's described as the fastest way to understand a file because you see all the logic at a glance.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Ad Yöneticisi / Name Manager'ın faydası nedir?",
                "What is the benefit of the Name Manager?",
              ],
              options: [
                [
                  "Hücrelere isim vererek formülleri daha okunur yapar, örn. `=Tutar*KDV_Orani`",
                  "Naming cells makes formulas more readable, e.g. `=Amount*VAT_Rate`",
                ],
                ["Dosyayı şifreler", "It encrypts the file"],
                ["Hataları otomatik düzeltir", "It automatically fixes errors"],
                ["Sayfaları birleştirir", "It merges sheets"],
              ],
              answer: 0,
              explain: [
                "Ad Yöneticisi ile bir hücreye `KDV_Orani` gibi bir isim verdiğinde, formül `=B2*$D$1` yerine `=Tutar*KDV_Orani` olarak yazılabilir — anlamı hemen anlaşılır.",
                "With the Name Manager you give a cell a name like `VAT_Rate`, so a formula can read `=Amount*VAT_Rate` instead of `=B2*$D$1` — its meaning is instantly clear.",
              ],
            }),
            tip(
              "Kendini kontrol eden dosya kur",
              "Build a file that checks itself",
              "Her ciddi çalışma kitabında bir **kontrol satırı** olmalıdır. Örnekler:\n\n- `=TOPLA(detay_sutunu) - ozet_hucresi` → sonuç 0 olmalı\n- `=EĞER(ABS(kontrol)<0,01;\"✓ TAMAM\";\"✗ HATA\")` → gözle görünür uyarı\n- Yüzde sütununun toplamı 100 mü?\n- Satır sayısı beklediğin kadar mı?\n\nBu kontrolleri koşullu biçimlendirmeyle kırmızıya boyarsan, bir sonraki güncellemede bir şey bozulduğunda dosya sana **kendisi** haber verir. Excel'de yanlış sayı yayınlamanın en yaygın sebebi, kimsenin kontrol satırı koymamış olmasıdır.",
              "Every serious workbook should have a **check row**. Examples:\n\n- `=SUM(detail_column) - summary_cell` → the result must be 0\n- `=IF(ABS(check)<0.01,\"✓ OK\",\"✗ ERROR\")` → a visible warning\n- Does the percentage column sum to 100?\n- Is the row count what you expected?\n\nPaint these checks red with conditional formatting and the file will tell you **itself** when the next update breaks something. The most common reason wrong numbers get published from Excel is that nobody added a check row.",
            ),
            quiz({
              id: "q8",
              q: [
                "`=EĞER(ABS(kontrol)<0,01;\"✓ TAMAM\";\"✗ HATA\")` gibi bir kontrol satırının amacı nedir?",
                "What is the purpose of a check row like `=IF(ABS(check)<0.01,\"✓ OK\",\"✗ ERROR\")`?",
              ],
              options: [
                [
                  "Bir sonraki güncellemede bir şey bozulursa dosyanın kendisinin haber vermesini sağlamak",
                  "So the file itself warns you when the next update breaks something",
                ],
                ["Dosyayı şifrelemek", "To encrypt the file"],
                ["Hesaplama hızını artırmak", "To increase calculation speed"],
                ["Grafiği renklendirmek", "To colour the chart"],
              ],
              answer: 0,
              explain: [
                "Kontrol satırları görünür bir uyarı üretir; koşullu biçimlendirmeyle kırmızıya boyanınca bir sonraki güncellemede bir şey bozulduğunda dosya kimsenin fark etmesini beklemeden kendisi haber verir.",
                "Check rows produce a visible warning; painted red with conditional formatting, the file announces a break the moment the next update introduces one, instead of waiting for someone to notice.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`=TOPLA(detay_sutunu) - ozet_hucresi` kontrolünün sonucu ne olmalıdır?",
                "What should the result of the check `=SUM(detail_column) - summary_cell` be?",
              ],
              options: [
                ["0", "0"],
                ["1", "1"],
                ["Her zaman pozitif bir sayı", "Always a positive number"],
                ["Boş hücre", "An empty cell"],
              ],
              answer: 0,
              explain: [
                "Bu kontrol, detay toplamı ile özet hücresinin birbirini tutup tutmadığını sınar; ikisi eşitse fark sıfır çıkar. Sıfırdan sapma, bir yerde tutarsızlık olduğunu gösterir.",
                "This check tests whether the detail total agrees with the summary cell; if they match, the difference is zero. Any deviation from zero signals an inconsistency somewhere.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Metne göre, Excel'de yanlış sayı yayınlamanın en yaygın sebebi nedir?",
                "According to the lesson, what is the most common reason wrong numbers get published from Excel?",
              ],
              options: [
                ["Kimsenin kontrol satırı koymamış olması", "Nobody having added a check row"],
                ["Excel'in eski sürüm olması", "Excel being an old version"],
                ["Dosyanın şifreli olmaması", "The file not being password protected"],
                ["Formüllerin renkli olmaması", "The formulas not being colour-coded"],
              ],
              answer: 0,
              explain: [
                "Metin bunu doğrudan söyler: yanlış sayı yayınlamanın en yaygın sebebi, kimsenin dosyaya bir kontrol satırı eklememiş olmasıdır — hata sessizce yayılır ve fark edilmez.",
                "The lesson states this directly: the most common reason wrong numbers get published is that nobody added a check row to the file — the error spreads silently and goes unnoticed.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Veri Doğrulama'da Liste seçeneği ne sağlar?",
                "What does the List option in Data Validation provide?",
              ],
              options: [
                [
                  "Açılır bir menü; kullanıcı yalnızca izin verilen değerleri seçebilir",
                  "A dropdown menu; the user can only pick values you allow",
                ],
                ["Hücreyi otomatik olarak renklendirir", "It automatically colours the cell"],
                ["Hücreyi kilitler", "It locks the cell"],
                ["Yalnızca sayısal girişe izin verir", "It only allows numeric input"],
              ],
              answer: 0,
              explain: [
                "Liste doğrulaması, kullanıcının serbest metin yazmasını engelleyip önceden tanımladığın değerlerden birini seçmesini sağlar; bu, yazım hatası ve tutarsız kategori sorununu kökten çözer.",
                "List validation stops free-text typing and makes the user pick from values you predefined; this eliminates typos and inconsistent categories at the root.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Tam sayı / ondalık aralığı doğrulaması hangi tür hataları engeller?",
                "What kind of mistakes does a whole number / decimal range validation block?",
              ],
              options: [
                [
                  "Negatif fiyat veya %150 gibi imkânsız değerleri",
                  "Impossible values like a negative price or 150%",
                ],
                ["Yazım hatalarını", "Typos"],
                ["Yanlış tarih biçimlerini", "Incorrect date formats"],
                ["Boş hücreleri", "Empty cells"],
              ],
              answer: 0,
              explain: [
                "Aralık doğrulaması, girilen sayının mantıklı bir sınır içinde kalmasını zorlar; örneğin bir fiyat sütununa negatif bir değer veya bir yüzde sütununa 150 girilmesini engeller.",
                "A range validation forces the entered number to stay within a sensible bound; for example, it blocks a negative value in a price column or 150 in a percentage column.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Her doğrulamaya girdi mesajı ve hata uyarısı eklemenin amacı nedir?",
                "What is the purpose of adding an input message and error alert to every validation?",
              ],
              options: [
                ["Kullanıcının ne beklendiğini okuyabilmesi", "So the user can read what is expected"],
                ["Excel'in daha hızlı çalışması", "So Excel runs faster"],
                ["Dosyanın şifrelenmesi", "So the file gets encrypted"],
                ["Formüllerin gizlenmesi", "So the formulas get hidden"],
              ],
              answer: 0,
              explain: [
                "Bir doğrulama kuralı tek başına yalnızca yanlış girişi reddeder; girdi mesajı ve hata uyarısı olmadan kullanıcı neden reddedildiğini veya ne yazması gerektiğini anlamaz.",
                "A validation rule alone only rejects bad input; without an input message and error alert, the user does not understand why it was rejected or what they should type instead.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Tarih aralığı doğrulaması hangi durumu engeller?",
                "What does a date range validation block?",
              ],
              options: [
                [
                  "Örneğin gelecekteki bir doğum tarihinin girilmesini",
                  "For example, entering a birth date in the future",
                ],
                ["Negatif fiyat girilmesini", "Entering a negative price"],
                ["Yazım hatalarını", "Typos"],
                ["Boş hücre bırakılmasını", "Leaving a cell empty"],
              ],
              answer: 0,
              explain: [
                "Metin bunu örnek olarak verir: tarih aralığı doğrulaması, gelecekteki bir doğum tarihi gibi mantıksız tarihlerin girilmesini engeller.",
                "The lesson gives this as the example: a date range validation blocks illogical dates such as a birth date set in the future.",
              ],
            }),
            text(
              "**2. Sayfa koruma** — formülleri kazara silinmekten korur. Sıra önemlidir ve çoğu kişi ters yapıp şaşırır:\n\n1. **Önce** kullanıcının yazacağı hücreleri seç → Hücreleri Biçimlendir → Koruma sekmesi → **Kilitli** onayını **kaldır**\n2. **Sonra** Gözden Geçir → **Sayfayı Koru** → şifre (isteğe bağlı)\n\nExcel'de tüm hücreler varsayılan olarak \"kilitli\" işaretlidir ama bu ancak sayfa korumaya alındığında etkili olur. Yani önce açmak istediklerinin kilidini kaldırır, sonra sayfayı korursun.",
              "**2. Sheet protection** — guards formulas against accidental deletion. The order matters, and most people get it backwards and are then confused:\n\n1. **First** select the cells the user will type in → Format Cells → Protection tab → **uncheck** Locked\n2. **Then** Review → **Protect Sheet** → password (optional)\n\nIn Excel every cell is marked \"locked\" by default, but that only takes effect once the sheet is protected. So you unlock what you want open first, then protect the sheet.",
            ),
            quiz({
              id: "q5",
              q: [
                "Excel'de tüm hücreler varsayılan olarak nasıl işaretlidir?",
                "How are all cells marked by default in Excel?",
              ],
              options: [
                ["Kilitli / Locked", "Locked"],
                ["Kilitsiz / Unlocked", "Unlocked"],
                ["Gizli / Hidden", "Hidden"],
                ["Salt okunur / Read-only", "Read-only"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça belirtir: her hücre baştan \"kilitli\" işaretlidir; ancak bu işaret yalnızca sayfa korumaya alındığında fiilen etkili olur.",
                "The lesson states this directly: every cell is marked \"locked\" from the start, but that mark only takes effect once the sheet is actually protected.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Sayfayı koruduktan sonra hangi hücrelere yazılabilir?",
                "After protecting the sheet, which cells can still be typed into?",
              ],
              options: [
                [
                  "Yalnızca korumadan önce kilidi kaldırılmış olan hücreler",
                  "Only the cells that had Locked unchecked before protection",
                ],
                ["Tüm hücreler", "All cells"],
                ["Hiçbir hücre", "No cells"],
                ["Yalnızca boş hücreler", "Only empty cells"],
              ],
              answer: 0,
              explain: [
                "Sıra tam olarak bunun için önemlidir: korumayı açmadan önce kilidini kaldırdığın hücreler açık kalır, geri kalan her hücre (varsayılan olarak kilitli oldukları için) yazılamaz hâle gelir.",
                "This is exactly why the order matters: the cells you unlocked before protecting stay open, while every other cell (locked by default) becomes uneditable.",
              ],
            }),
            pitfall(
              "Koruma güvenlik değildir",
              "Protection is not security",
              "Excel sayfa ve çalışma kitabı koruması **kazaya karşıdır**, kötü niyete karşı değil. İnternette birkaç tıkla kaldırılabilir. Gerçekten gizli veri varsa dosya şifreleme (Dosya → Bilgi → Çalışma Kitabını Koru → **Parolayla Şifrele**) kullan — ama en doğrusu, hassas veriyi Excel dosyasında hiç taşımamaktır.\n\nAyrıca şifreni kaybederseniz Microsoft'un bile kurtarma yolu yoktur; şifreyi bir parola yöneticisinde tut.",
              "Excel's sheet and workbook protection guards against **accidents**, not against malice. It can be removed with a few clicks found online. If the data is genuinely confidential, use file encryption (File → Info → Protect Workbook → **Encrypt with Password**) — but the right answer is not to carry sensitive data in an Excel file at all.\n\nAlso, if you lose that password not even Microsoft can recover it; keep it in a password manager.",
            ),
            quiz({
              id: "q7",
              q: [
                "Excel sayfa/çalışma kitabı koruması neye karşı koruma sağlar?",
                "What does Excel's sheet/workbook protection guard against?",
              ],
              options: [
                ["Kazara değişikliklere, kötü niyete karşı değil", "Accidents, not against malice"],
                ["Kötü niyete karşı, kazalara değil", "Malice, not against accidents"],
                ["Hem kazalara hem kötü niyete karşı eşit ölçüde", "Both accidents and malice equally"],
                ["Yalnızca virüslere karşı", "Only against viruses"],
              ],
              answer: 0,
              explain: [
                "Metin bunu net şekilde belirtir: sayfa/çalışma kitabı koruması kazaya karşıdır, kötü niyete karşı değildir; internette birkaç tıkla kaldırılabilir.",
                "The lesson states this clearly: sheet/workbook protection guards against accidents, not malice; it can be removed with a few clicks found online.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Gerçekten gizli veri için hangi yöntem kullanılmalıdır?",
                "What method should be used for genuinely confidential data?",
              ],
              options: [
                [
                  "Dosya → Bilgi → Çalışma Kitabını Koru → Parolayla Şifrele",
                  "File → Info → Protect Workbook → Encrypt with Password",
                ],
                ["Yalnızca Sayfayı Koru", "Just Protect Sheet"],
                ["Hücreleri gizlemek", "Hiding the cells"],
                ["Yazı tipini beyaz yapmak", "Making the font white"],
              ],
              answer: 0,
              explain: [
                "Sayfa koruması yalnızca kazaya karşıdır; gerçekten gizli veri için metin, dosya şifrelemeyi (Dosya → Bilgi → Çalışma Kitabını Koru → Parolayla Şifrele) önerir — ama en doğrusu hassas veriyi Excel'de hiç taşımamaktır.",
                "Sheet protection only guards against accidents; for genuinely confidential data the lesson recommends file encryption (File → Info → Protect Workbook → Encrypt with Password) — though the best answer is not carrying sensitive data in Excel at all.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bir çalışma kitabı şifresini kaybedersen ne olur?",
                "What happens if you lose a workbook's encryption password?",
              ],
              options: [
                ["Microsoft bile onu kurtaramaz", "Not even Microsoft can recover it"],
                ["Microsoft destek ile kurtarır", "Microsoft support recovers it"],
                ["Dosya otomatik olarak şifresiz açılır", "The file automatically opens unencrypted"],
                ["Yalnızca 24 saat içinde kurtarılabilir", "It can only be recovered within 24 hours"],
              ],
              answer: 0,
              explain: [
                "Metin bunu özellikle uyarır: şifreyi kaybedersen Microsoft'un bile kurtarma yolu yoktur; bu yüzden şifreyi bir parola yöneticisinde saklamak şarttır.",
                "The lesson specifically warns about this: if you lose the password, not even Microsoft has a way to recover it — which is why keeping it in a password manager is essential.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Tabloya göre \"Veri deposu\" rolünü hangi araç devralmalıdır?",
                "According to the table, which tool should take over the \"Data store\" role?",
              ],
              options: [
                ["Bir veritabanı (PostgreSQL, SQL Server)", "A database (PostgreSQL, SQL Server)"],
                ["Power BI", "Power BI"],
                ["Git", "Git"],
                ["Excel — burada hâlâ rakipsiz", "Excel — still unmatched here"],
              ],
              answer: 0,
              explain: [
                "Tabloda \"Veri deposu\" satırının karşılığı bir veritabanıdır (PostgreSQL, SQL Server); Excel dosyaları büyüyen veya paylaşılan veri için güvenilir bir depo değildir.",
                "In the table, the \"Data store\" row maps to a database (PostgreSQL, SQL Server); Excel files are not a reliable store for growing or shared data.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Tabloya göre \"Veri temizleme\" işini hangi araçlar devralmalıdır?",
                "According to the table, which tools should take over \"Data cleaning\"?",
              ],
              options: [
                ["Power Query, dbt, Python", "Power Query, dbt, Python"],
                ["Power BI, Tableau, Metabase", "Power BI, Tableau, Metabase"],
                ["Git, ortak veri ambarı", "Git, a shared warehouse"],
                ["SQL + Python/R", "SQL + Python/R"],
              ],
              answer: 0,
              explain: [
                "Tabloda \"Veri temizleme\" satırının karşılığı Power Query, dbt ve Python'dur; bunlar tekrarlanabilir, denetlenebilir temizleme adımları sağlar.",
                "In the table, the \"Data cleaning\" row maps to Power Query, dbt and Python; they give you repeatable, auditable cleaning steps.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Tabloya göre \"Raporlama ve pano\" için doğru araçlar hangileridir?",
                "According to the table, what are the right tools for \"Reporting and dashboards\"?",
              ],
              options: [
                ["Power BI, Tableau, Metabase", "Power BI, Tableau, Metabase"],
                ["Bir veritabanı", "A database"],
                ["Power Query, dbt, Python", "Power Query, dbt, Python"],
                ["Git", "Git"],
              ],
              answer: 0,
              explain: [
                "Tabloda \"Raporlama ve pano\" satırının karşılığı Power BI, Tableau ve Metabase gibi pano araçlarıdır.",
                "In the table, the \"Reporting and dashboards\" row maps to dashboard tools like Power BI, Tableau and Metabase.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Tabloya göre \"Ad hoc analiz\" için doğru araç kombinasyonu nedir?",
                "According to the table, what is the right tool combination for \"Ad hoc analysis\"?",
              ],
              options: [
                ["SQL + Python/R", "SQL + Python/R"],
                ["Power BI, Tableau, Metabase", "Power BI, Tableau, Metabase"],
                ["Git, ortak veri ambarı", "Git, a shared warehouse"],
                ["Yalnızca Excel", "Excel only"],
              ],
              answer: 0,
              explain: [
                "Tabloda \"Ad hoc analiz\" satırının karşılığı SQL + Python/R'dir; tek seferlik, esnek sorgular için bu ikili Excel'den daha güçlüdür.",
                "In the table, the \"Ad hoc analysis\" row maps to SQL + Python/R; this pair is more powerful than Excel for one-off, flexible queries.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Tabloya göre \"İş birliği ve versiyon\" için doğru araçlar hangileridir?",
                "According to the table, what are the right tools for \"Collaboration and versioning\"?",
              ],
              options: [
                ["Git, ortak veri ambarı", "Git, a shared warehouse"],
                ["Power Query, dbt, Python", "Power Query, dbt, Python"],
                ["Bir veritabanı", "A database"],
                ["Power BI, Tableau, Metabase", "Power BI, Tableau, Metabase"],
              ],
              answer: 0,
              explain: [
                "Tabloda \"İş birliği ve versiyon\" satırının karşılığı Git ve ortak bir veri ambarıdır; e-posta ile dolaşan Excel dosyaları versiyon takibi sağlamaz.",
                "In the table, the \"Collaboration and versioning\" row maps to Git and a shared warehouse; Excel files circulating by email give you no version tracking.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Tabloya göre Excel hangi rolde hâlâ rakipsizdir?",
                "According to the table, in which role is Excel still unmatched?",
              ],
              options: [
                ["Hesaplama ve senaryo", "Calculation and scenarios"],
                ["Veri deposu", "Data store"],
                ["Raporlama ve pano", "Reporting and dashboards"],
                ["İş birliği ve versiyon", "Collaboration and versioning"],
              ],
              answer: 0,
              explain: [
                "Tablonun son satırı bunu açıkça söyler: hesaplama ve senaryo işinde Excel hâlâ rakipsizdir; bu yüzden Excel'i tamamen bırakmak gerekmez.",
                "The table's last row says this explicitly: for calculation and scenarios, Excel is still unmatched — which is why you need not abandon it entirely.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Geçişi yönetmenin pratik yolunda ilk adım nedir?",
                "In the practical way to manage the move, what is the first step?",
              ],
              options: [
                [
                  "En acılı raporu seçmek — en çok zaman alan, en çok hata çıkan raporu bulmak",
                  "Pick the most painful report — find the one that eats the most time and produces the most errors",
                ],
                ["Tüm raporları aynı anda taşımak", "Move all the reports at once"],
                ["Eski Excel raporunu hemen kapatmak", "Immediately switch off the old Excel report"],
                ["Bir veritabanı satın almak", "Buy a database"],
              ],
              answer: 0,
              explain: [
                "Beş adımlı yaklaşımın ilk maddesi budur: her ay en çok zamanını alan, en çok hata çıkan tek raporu bulup oradan başlamak.",
                "This is the first item in the five-step approach: find the single report that eats the most time and produces the most errors each month, and start there.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Neden tüm raporları birden değil, tek bir raporla başlamak önerilir?",
                "Why is it recommended to start with a single report instead of changing everything at once?",
              ],
              options: [
                [
                  "Riski düşürür ve ekibin güvenini kazanır; \"her şeyi taşıyoruz\" diyen projeler genelde yarıda kalır",
                  "It lowers risk and earns the team's trust; projects that say \"we're moving everything\" usually stall",
                ],
                ["Excel lisansı gerektirdiği için", "Because Excel requires a licence"],
                ["Diğer araçlar tek rapor kabul ettiği için", "Because other tools only accept one report"],
                ["Zorunlu bir teknik kısıt olduğu için", "Because it is a mandatory technical limit"],
              ],
              answer: 0,
              explain: [
                "Metin bunu doğrudan söyler: bu yaklaşım riski düşürür ve ekibin güvenini kazanır; \"her şeyi taşıyoruz\" diye başlayan projeler genellikle yarıda kalırken tek rapordan başlayanlar tamamlanır.",
                "The lesson states this directly: the approach lowers risk and earns the team's trust; projects that begin with \"we're moving everything\" usually stall, while those that begin with one report get finished.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Paralel çalıştırma dönemi bittikten sonra ne yapılmalıdır?",
                "What should happen once the parallel-running period ends?",
              ],
              options: [
                [
                  "Eski Excel sürümü gerçekten durdurulmalı",
                  "The old Excel version should genuinely be stopped",
                ],
                ["İkisi de süresiz sürdürülmeli", "Both should be kept running indefinitely"],
                ["Yeni araç kapatılmalı", "The new tool should be shut down"],
                ["Rapor tekrar Excel'e taşınmalı", "The report should be moved back to Excel"],
              ],
              answer: 0,
              explain: [
                "Beşinci adım bunu vurgular: paralel dönem bitince Excel sürümü gerçekten durdurulmalıdır — ikisini birden sürdürmek metnin belirttiği en kötü senaryodur.",
                "The fifth step stresses this: once the parallel period ends, the Excel version must genuinely be stopped — carrying both, as the lesson notes, is the worst outcome.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
