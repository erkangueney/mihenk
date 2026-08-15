import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, pyTask, quiz, text, tip, tryPy } from "../helpers";

export const pythonTrack: Track = {
  slug: "python",
  name: "Python",
  category: "language",
  color: "#facc15",
  icon: "🐍",
  tagline: L("Veri biliminin ana dili", "The main language of data science"),
  description: L(
    "Sıfırdan Python, oradan pandas ile veri analizi ve makine öğrenmesine hazırlık. Alıştırmalar tarayıcında gerçek bir Python yorumlayıcısında (Pyodide) çalışır — kurulum yok.",
    "Python from zero, then data analysis with pandas and the groundwork for machine learning. Exercises run in a real Python interpreter in your browser (Pyodide) — nothing to install.",
  ),
  levels: [
    /* ---------------------------------------------------------------- */
    {
      id: "foundation",
      title: L("Programlamaya ilk adım", "Your first step into programming"),
      description: L(
        "Hiç kod yazmadıysan buradan başla: bilgisayara nasıl talimat verilir, hata mesajı nasıl okunur?",
        "Start here if you have never written code: how do you instruct a computer, and how do you read an error?",
      ),
      lessons: [
        lesson({
          slug: "neden-python",
          title: L("Neden Python ve kod nasıl çalışır?", "Why Python, and how does code run?"),
          summary: L(
            "İlk satırını yaz ve arka planda ne olduğunu anla.",
            "Write your first line and understand what happens behind it.",
          ),
          minutes: 10,
          blocks: [
            text(
              "Bilgisayar yalnızca kendisine **tam olarak** söyleneni yapar. Program, bu talimatların sırayla yazılmış hâlidir. Python'un veri dünyasında bu kadar yaygın olmasının üç sebebi var:\n\n- **Okunabilir** — `if yas > 18:` neredeyse İngilizce cümle gibi okunur\n- **Kütüphaneler** — pandas, NumPy, scikit-learn gibi hazır araçlar analiz işinin %90'ını çözer\n- **Her yerde** — veri analizinden yapay zekâya, web'den otomasyona aynı dil\n\nBu patikadaki tüm kodlar tarayıcında gerçek bir Python yorumlayıcısında çalışıyor. Kurulum yapmana gerek yok.",
              "A computer does only what it is told, **exactly**. A program is those instructions written in order. Python became this widespread in the data world for three reasons:\n\n- **Readable** — `if age > 18:` reads almost like an English sentence\n- **Libraries** — ready-made tools like pandas, NumPy and scikit-learn solve 90% of analysis work\n- **Everywhere** — from data analysis to AI, from web to automation, the same language\n\nAll the code in this track runs in a real Python interpreter inside your browser. There is nothing to install.",
            ),
            code(
              "python",
              `# Bir satırın başındaki # yorum işaretidir; Python onu yok sayar.
print("Merhaba veri dünyası")

# print, ekrana yazdırır. Programın sana bir şey söylemesinin yoludur.
print(2 + 3)          # 5
print("2" + "3")      # 23  <- metin birleştirme, toplama değil!`,
            ),
            quiz({
              id: "q2",
              q: [
                "Bir satırın başındaki `#` işareti ne işe yarar?",
                "What does a `#` at the start of a line do?",
              ],
              options: [
                ["O satırı yorum yapar; Python onu çalıştırmaz", "Marks that line as a comment; Python does not run it"],
                ["O satırı ekrana yazdırır", "It prints that line to the screen"],
                ["Programı orada durdurur", "It stops the program there"],
                ["Değişken tanımlar", "It declares a variable"],
              ],
              answer: 0,
              explain: [
                "`#` ile başlayan her şey yorumdur; yorumlayıcı o satırı tamamen yok sayar. Yorumlar kod için değil, kodu okuyacak insan için yazılır.",
                "Everything after `#` is a comment; the interpreter ignores that part entirely. Comments are written for the human reading the code, not for the computer.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`print(\"Merhaba\" + \"veri\")` ne yazdırır?",
                "What does `print(\"Merhaba\" + \"veri\")` print?",
              ],
              options: [
                ["Merhabaveri", "Merhabaveri"],
                ["Merhaba veri", "Merhaba veri"],
                ["Merhaba+veri", "Merhaba+veri"],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "Metin birleştirme (`+`) iki metni olduğu gibi yan yana yapıştırır; aralarına otomatik boşluk koymaz. Boşluk istiyorsan kendin eklemelisin: `\"Merhaba\" + \" \" + \"veri\"`.",
                "String concatenation (`+`) glues two strings together exactly as they are; it does not insert a space. If you want one, you must add it yourself: `\"Merhaba\" + \" \" + \"veri\"`.",
              ],
            }),
            info(
              "Yorumlayıcı satır satır ilerler",
              "The interpreter goes line by line",
              "Python **yorumlanan** bir dildir: kodu yukarıdan aşağı okur ve her satırı sırayla çalıştırır. Üçüncü satırda hata varsa ilk iki satır **zaten çalışmıştır**. Bu, hata ayıklarken çok işine yarar — programın nereye kadar geldiğini `print` koyarak görebilirsin.",
              "Python is an **interpreted** language: it reads your code top to bottom and runs each line in turn. If line three has an error, the first two lines have **already run**. This helps a lot when debugging — you can see how far the program got by dropping in a `print`.",
            ),
            quiz({
              id: "q4",
              q: [
                "Python'un \"yorumlanan bir dil\" olması ne anlama gelir?",
                "What does it mean that Python is an \"interpreted\" language?",
              ],
              options: [
                ["Kodu yukarıdan aşağı okur, her satırı sırayla çalıştırır", "It reads the code top to bottom and runs each line in order"],
                ["Kodu önce İngilizceye çevirir", "It translates the code into English first"],
                ["Bütün dosyayı bir kerede çalıştırıp sonucu sonra gösterir", "It runs the whole file at once and shows the result afterwards"],
                ["Sadece yorum satırlarını çalıştırır", "It only executes comment lines"],
              ],
              answer: 0,
              explain: [
                "Yorumlanan dillerde kod satır satır okunup çalıştırılır; bu yüzden bir hata programın **tamamını** değil, o satırdan sonrasını durdurur.",
                "In an interpreted language the code is read and run line by line, so an error halts everything **after** that line, not the whole run at once.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Beş satırlık bir programın üçüncü satırında hata çıkarsa, ilk iki satır için ne söylenebilir?",
                "If a five-line program errors on line three, what can you say about the first two lines?",
              ],
              options: [
                ["Zaten çalışmışlardır", "They have already run"],
                ["Hiç çalışmamışlardır", "They never ran"],
                ["Python onları atlamıştır", "Python skipped them"],
                ["Bilinemez", "There is no way to know"],
              ],
              answer: 0,
              explain: [
                "Yorumlayıcı yukarıdan aşağı ilerlediği için üçüncü satıra ulaşabilmesi, ilk iki satırın sorunsuz çalıştığı anlamına gelir. Hata ayıklarken bu bilgi nereden başlayacağını söyler.",
                "Because the interpreter moves top to bottom, reaching line three means the first two lines already ran without issue. That fact tells you where to start debugging.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Metne göre, programın nereye kadar çalıştığını görmek için pratik bir yöntem nedir?",
                "According to the text, what is a practical way to see how far a program got?",
              ],
              options: [
                ["Şüpheli satırların arasına `print` eklemek", "Dropping extra `print` calls between suspect lines"],
                ["Bilgisayarı yeniden başlatmak", "Restarting the computer"],
                ["Kodu baştan yazmak", "Rewriting the code from scratch"],
                ["Yorum satırlarını silmek", "Deleting the comment lines"],
              ],
              answer: 0,
              explain: [
                "Ara `print` satırları, yorumlayıcının hangi noktaya kadar ilerlediğini gözle görülür hale getirir — programın çöktüğü nokta, en son yazdırılan satırdan hemen sonrasıdır.",
                "Extra `print` statements make it visible how far the interpreter got — the crash point sits right after the last line that printed.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "`print(\"2\" + \"3\")` ne yazdırır?",
                "What does `print(\"2\" + \"3\")` print?",
              ],
              options: [
                ["23", "23"],
                ["5", "5"],
                ["\"5\"", "\"5\""],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "Tırnak içindekiler metindir (`str`). Metinlerde `+` işareti toplama değil, birleştirme yapar. Sayı olarak toplamak isteseydin `int(\"2\") + int(\"3\")` yazman gerekirdi.",
                "Anything in quotes is text (`str`). For text, `+` means concatenation, not addition. To add them as numbers you would write `int(\"2\") + int(\"3\")`.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Metne göre, pandas, NumPy ve scikit-learn gibi hazır araçlar analiz işinin ne kadarını çözer?",
                "According to the text, how much of the analysis work do ready-made tools like pandas, NumPy and scikit-learn solve?",
              ],
              options: [
                ["%90'ını", "90% of it"],
                ["Yarısını", "Half of it"],
                ["Neredeyse hiçbirini", "Almost none of it"],
                ["Tamamını", "All of it"],
              ],
              answer: 0,
              explain: [
                "Metin, Python'un veri dünyasında yaygın olmasının sebeplerinden birini bu şekilde açıklar: hazır kütüphaneler işin büyük kısmını üstlenir, sen kendi tekerleğini yeniden icat etmezsin.",
                "The text gives this as one reason Python dominates the data world: ready-made libraries carry most of the load, so you are not reinventing the wheel.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bu patikadaki alıştırmaları çalıştırmak için bilgisayarına neden Python kurmana gerek yok?",
                "Why do you not need to install Python on your computer to run this track's exercises?",
              ],
              options: [
                [
                  "Kod, tarayıcının içinde gerçek bir Python yorumlayıcısında çalışıyor",
                  "The code runs inside a real Python interpreter inside your browser",
                ],
                ["Sorular gerçek kod içermiyor", "The questions do not contain real code"],
                ["Python kurulumu artık gerekli değil", "Python installation is no longer required by anyone"],
                ["Kod sunucuda değil, kâğıt üzerinde çalışıyor", "The code runs on paper, not on any machine"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça söylüyor: kod tarayıcında gerçek bir Python yorumlayıcısında çalışır, bu yüzden kurulum yapmana gerek yoktur.",
                "The text states this directly: the code runs in a real Python interpreter inside your browser, so there is nothing to install.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`2 + 3` ile `\"2\" + \"3\"` arasındaki temel fark nedir?",
                "What is the key difference between `2 + 3` and `\"2\" + \"3\"`?",
              ],
              options: [
                [
                  "Biri sayısal toplama, diğeri metin birleştirmedir — `+` işareti tipe göre anlam değiştirir",
                  "One is numeric addition, the other is string concatenation — `+` means something different depending on the type",
                ],
                ["İkisi de aynı sonucu verir", "Both give exactly the same result"],
                ["`\"2\" + \"3\"` her zaman hata verir", "`\"2\" + \"3\"` always raises an error"],
                ["`2 + 3` metin, `\"2\" + \"3\"` sayı üretir", "`2 + 3` produces text and `\"2\" + \"3\"` produces a number"],
              ],
              answer: 0,
              explain: [
                "Python operatörleri işlenenlerin tipine göre davranır: sayılarda `+` toplar, metinlerde birleştirir. Bu tek işaretin iki farklı anlamı, yeni başlayanların en sık düştüğü karışıklıktır.",
                "Python operators behave according to operand type: `+` adds numbers but concatenates strings. This single symbol having two meanings is the most common source of confusion for beginners.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "`mesaj` adlı bir değişkene kendi tanıtımını yaz ve ekrana bastır. Metin en az 10 karakter olsun.",
                "Assign your own introduction to a variable called `mesaj` and print it. The text must be at least 10 characters.",
              ],
              starter: `mesaj =
print(mesaj)`,
              solution: `mesaj = "Veri analizi öğreniyorum"
print(mesaj)`,
              hint: [
                "Metinleri çift tırnak içine al: `mesaj = \"...\"`",
                "Wrap text in double quotes: `mesaj = \"...\"`",
              ],
              checks: [
                {
                  code: "isinstance(mesaj, str)",
                  msg: ["`mesaj` bir metin olmalı", "`mesaj` must be a string"],
                },
                {
                  code: "len(mesaj) >= 10",
                  msg: ["Metin en az 10 karakter olmalı", "The text must be at least 10 characters"],
                },
              ],
              xp: 25,
            }),
          ],
        }),
        lesson({
          slug: "sayilar-metinler-ve-degiskenler",
          title: L("Sayılar, metinler ve değişkenler", "Numbers, text and variables"),
          summary: L(
            "Değeri bir isme bağla, üzerinde işlem yap, sonucu okunur biçimde yazdır.",
            "Bind a value to a name, compute with it, and print the result readably.",
          ),
          minutes: 12,
          blocks: [
            text(
              "**Değişken**, bir değere taktığın isimdir. Python'da tip belirtmezsin; değeri verirsin, tipi kendi anlar:\n\n```python\nurun = \"Kablosuz Kulaklık\"   # str  — metin\nfiyat = 1899.0                # float — ondalıklı sayı\nstok = 120                    # int  — tam sayı\nindirimde = True              # bool — doğru/yanlış\n```\n\nİsimlendirme kuralları: harf veya alt çizgiyle başlar, boşluk içermez, Türkçe karakter kullanmamak iyi bir alışkanlıktır. `toplam_ciro` gibi küçük harf ve alt çizgi yaygın kullanımdır.",
              "A **variable** is a name you attach to a value. In Python you do not declare a type; you give the value and it works the type out:\n\n```python\nproduct = \"Wireless Headphones\"  # str  — text\nprice = 1899.0                   # float — decimal\nstock = 120                      # int  — whole number\non_sale = True                   # bool — true/false\n```\n\nNaming rules: start with a letter or underscore, no spaces. Lowercase words joined by underscores, like `total_revenue`, is the common convention.",
            ),
            quiz({
              id: "q2",
              q: [
                "Aşağıdakilerden hangisi geçerli bir Python değişken ismi **değildir**?",
                "Which of the following is **not** a valid Python variable name?",
              ],
              options: [
                ["2fiyat", "2fiyat"],
                ["toplam_ciro", "total_revenue"],
                ["_gecici", "_temp"],
                ["fiyat2", "fiyat2"],
              ],
              answer: 0,
              explain: [
                "Değişken isimleri rakamla **başlayamaz**; harf veya alt çizgiyle başlamalıdır. `2fiyat` bu yüzden geçersizdir, ama `fiyat2` geçerlidir — rakam ortada veya sonda olabilir, başta olamaz.",
                "A variable name cannot **start** with a digit; it must begin with a letter or underscore. `2fiyat` is invalid for that reason, while `fiyat2` is fine — digits are allowed in the middle or end, just not at the start.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`indirimde = True` satırından sonra `indirimde` hangi tiptedir?",
                "After `indirimde = True`, what type is `indirimde`?",
              ],
              options: [
                ["bool", "bool"],
                ["str", "str"],
                ["int", "int"],
                ["Tipi yoktur", "It has no type"],
              ],
              answer: 0,
              explain: [
                "`True` ve `False` Python'da `bool` tipindedir. Python tip belirtmeni istemez; `True` değerini görüp tipi kendisi çıkarır — tıpkı `1899.0`'ın `float`, `120`'nin `int` olduğunu anladığı gibi.",
                "`True` and `False` are the `bool` type in Python. You never declare the type; Python infers it from the value — the same way it knows `1899.0` is a `float` and `120` is an `int`.",
              ],
            }),
            code(
              "python",
              `fiyat = 1899.0
adet = 3

ara_toplam = fiyat * adet
kdv = ara_toplam * 0.20
toplam = ara_toplam + kdv

# f-string: değişkeni metnin içine gömer, :.2f iki ondalık gösterir
print(f"Ara toplam: {ara_toplam:.2f} TL")
print(f"KDV:        {kdv:.2f} TL")
print(f"Genel toplam: {toplam:.2f} TL")`,
              "f-string, rapor çıktısı üretmenin en okunur yoludur.",
              "f-strings are the most readable way to produce report output.",
            ),
            quiz({
              id: "q4",
              q: [
                "`f\"{kdv:.2f}\"` ifadesindeki `:.2f` ne işe yarar?",
                "In `f\"{kdv:.2f}\"`, what does the `:.2f` part do?",
              ],
              options: [
                ["Sayıyı iki ondalık basamakla gösterir", "Displays the number with two decimal places"],
                ["Sayıyı iki katına çıkarır", "Doubles the number"],
                ["Sayıyı metne çevirmeyi engeller", "Prevents the number from being converted to text"],
                ["Sayıyı yuvarlar ve değişkeni kalıcı olarak değiştirir", "Rounds and permanently changes the variable"],
              ],
              answer: 0,
              explain: [
                "`:.2f` bir biçimlendirme belirtecidir: sayıyı ondalıklı (`f`) ve iki basamakla (`.2`) göster der. Bu yalnızca **görünümü** değiştirir; `kdv` değişkeninin kendi değeri aynı kalır.",
                "`:.2f` is a format spec: show as a decimal (`f`) with two digits (`.2`). It only changes how the value is **displayed** — the `kdv` variable itself is untouched.",
              ],
            }),
            tip(
              "Bölme her zaman ondalık verir",
              "Division always gives a decimal",
              "Python'da `10 / 4` sonucu `2.5`'tir — tam sayılarla bölsen bile `float` döner. Tam sayı bölümü istiyorsan `//` kullan: `10 // 4` sonucu `2`. Kalanı almak için `%` vardır: `10 % 4` sonucu `2`. Bu üçünü karıştırmak, oran hesaplarında sık görülen bir hatadır.",
              "In Python `10 / 4` is `2.5` — you get a `float` even when dividing whole numbers. For integer division use `//`: `10 // 4` is `2`. For the remainder there is `%`: `10 % 4` is `2`. Mixing these three up is a common bug in rate calculations.",
            ),
            quiz({
              id: "q5",
              q: ["`10 // 4` ifadesinin sonucu nedir?", "What is the result of `10 // 4`?"],
              options: [
                ["2", "2"],
                ["2.5", "2.5"],
                ["2.0", "2.0"],
                ["3", "3"],
              ],
              answer: 0,
              explain: [
                "`//` tam sayı bölmesidir: sonucu ondalığı atarak tam sayıya indirir. `10 / 4` `2.5` verirken `10 // 4` sadece `2` verir.",
                "`//` is floor division: it drops the fractional part and gives a whole number. `10 / 4` is `2.5`, but `10 // 4` is just `2`.",
              ],
            }),
            quiz({
              id: "q6",
              q: ["`10 % 4` ifadesinin sonucu nedir?", "What is the result of `10 % 4`?"],
              options: [
                ["2", "2"],
                ["2.5", "2.5"],
                ["0", "0"],
                ["4", "4"],
              ],
              answer: 0,
              explain: [
                "`%` bölümden **kalanı** verir: 10, 4'e 2 kere tam bölünür (8 eder), kalan 2'dir. `//` bölümün tam kısmını, `%` ise kalanını verir — ikisi birbirini tamamlar.",
                "`%` gives the **remainder** of division: 10 divided by 4 goes in twice (8), leaving a remainder of 2. `//` gives the whole part, `%` gives what is left over — the two complement each other.",
              ],
            }),
            quiz({
              id: "q7",
              q: ["`5 / 2` ifadesinin sonucu nedir?", "What is the result of `5 / 2`?"],
              options: [
                ["2.5", "2.5"],
                ["2", "2"],
                ["2.0", "2.0"],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "Normal bölme (`/`) iki tam sayı ile çalışsa bile her zaman `float` döndürür. Tam sayı sonucu istiyorsan `//` kullanmalısın.",
                "Regular division (`/`) always returns a `float`, even for two whole numbers. If you want a whole-number result you must use `//` instead.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bir sayının çift mi tek mi olduğunu anlamak istiyorsun. Hangi operatörü kullanırsın?",
                "You want to check whether a number is even or odd. Which operator do you use?",
              ],
              options: [
                ["`%` — `sayi % 2 == 0` çift demektir", "`%` — `number % 2 == 0` means even"],
                ["`//`", "`//`"],
                ["`/`", "`/`"],
                ["`*`", "`*`"],
              ],
              answer: 0,
              explain: [
                "2'ye bölümden kalan 0 ise sayı çifttir, 1 ise tektir. `%` kalanı verdiği için çift/tek kontrolünün standart yoludur.",
                "If the remainder after dividing by 2 is 0 the number is even, if 1 it is odd. Because `%` gives the remainder, it is the standard way to check even/odd.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "`toplam = 0` yazdıktan sonra `toplam = toplam + 5` çalıştırılırsa `toplam` kaç olur?",
                "After `toplam = 0`, running `toplam = toplam + 5` leaves `toplam` at what?",
              ],
              options: [
                ["5", "5"],
                ["0", "0"],
                ["Hata verir", "It raises an error"],
                ["\"05\"", "\"05\""],
              ],
              answer: 0,
              explain: [
                "`=` matematikteki eşittir değil, **atama** işaretidir. Sağ taraf önce hesaplanır (`0 + 5`), sonuç sol taraftaki isme bağlanır. Bu kalıp o kadar sık kullanılır ki kısayolu vardır: `toplam += 5`.",
                "`=` is not equality from maths; it is **assignment**. The right side is evaluated first (`0 + 5`) and the result is bound to the name on the left. This pattern is so common it has a shorthand: `toplam += 5`.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`toplam += 5` ifadesi hangi uzun yazıma eşittir?",
                "The shorthand `toplam += 5` is equivalent to which longer form?",
              ],
              options: [
                ["`toplam = toplam + 5`", "`toplam = toplam + 5`"],
                ["`toplam = 5`", "`toplam = 5`"],
                ["`toplam == toplam + 5`", "`toplam == toplam + 5`"],
                ["`5 = toplam + 5`", "`5 = toplam + 5`"],
              ],
              answer: 0,
              explain: [
                "`+=` bir kısayoldur: mevcut değere bir şey ekleyip sonucu aynı değişkene geri yazmayı tek işaretle yapar. Toplama biriktiren döngülerde sürekli karşına çıkar.",
                "`+=` is shorthand for adding to the current value and writing the result back to the same name in one symbol. You will see it constantly in loops that accumulate a total.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Bir siparişin toplamını hesapla: `fiyat` 2450, `adet` 4, KDV oranı %20. `ara_toplam`, `kdv` ve `toplam` değişkenlerini üret.",
                "Compute an order total: `fiyat` 2450, `adet` 4, VAT 20%. Produce the variables `ara_toplam`, `kdv` and `toplam`.",
              ],
              starter: `fiyat = 2450
adet = 4

ara_toplam =
kdv =
toplam =

print(toplam)`,
              solution: `fiyat = 2450
adet = 4

ara_toplam = fiyat * adet
kdv = ara_toplam * 0.20
toplam = ara_toplam + kdv

print(toplam)`,
              hint: [
                "Çarpma `*`, yüzde 20 için `* 0.20`. Toplam, ara toplam ile KDV'nin toplamıdır.",
                "Multiplication is `*`; for 20% use `* 0.20`. The total is the subtotal plus the VAT.",
              ],
              checks: [
                {
                  code: "abs(ara_toplam - 9800) < 0.01",
                  msg: ["Ara toplam 9800 olmalı", "The subtotal must be 9800"],
                },
                { code: "abs(kdv - 1960) < 0.01", msg: ["KDV 1960 olmalı", "The VAT must be 1960"] },
                {
                  code: "abs(toplam - 11760) < 0.01",
                  msg: ["Toplam 11760 olmalı", "The total must be 11760"],
                },
              ],
              xp: 30,
            }),
          ],
        }),
        lesson({
          slug: "hata-okumak",
          title: L("Hata mesajını okumak", "Reading an error message"),
          summary: L(
            "Kırmızı yazı düşman değil, en hızlı öğretmenindir. Nasıl okunacağını öğren.",
            "Red text is not your enemy; it is your fastest teacher. Learn how to read it.",
          ),
          minutes: 12,
          blocks: [
            text(
              "Yeni başlayanların en büyük engeli hata yapmak değil, hatadan **korkmaktır**. Python'un hata mesajı aslında son derece bilgilendiricidir. Üç parçadan oluşur:\n\n1. **Traceback** — hatanın hangi satırda oluştuğu\n2. **Hata tipi** — `NameError`, `TypeError`, `ValueError`…\n3. **Açıklama** — ne beklendiği, ne bulunduğu\n\nMesajı **en alttan** okumaya başla; en kritik bilgi oradadır.",
              "The biggest obstacle for beginners is not making mistakes but being **afraid** of them. Python's error messages are in fact remarkably informative. They have three parts:\n\n1. **Traceback** — which line the error occurred on\n2. **Error type** — `NameError`, `TypeError`, `ValueError`…\n3. **Description** — what was expected and what was found\n\nStart reading the message **from the bottom**; the most critical information is there.",
            ),
            quiz({
              id: "q2",
              q: [
                "Bir Python hata mesajı hangi üç parçadan oluşur?",
                "What three parts make up a Python error message?",
              ],
              options: [
                [
                  "Traceback, hata tipi, açıklama",
                  "Traceback, error type, description",
                ],
                ["Satır, sütun, dosya adı", "Line, column, filename"],
                ["Uyarı, hata, kritik hata", "Warning, error, critical"],
                ["Girdi, işlem, çıktı", "Input, process, output"],
              ],
              answer: 0,
              explain: [
                "Traceback nerede olduğunu, hata tipi ne tür bir sorun olduğunu, açıklama ise ne beklenip ne bulunduğunu söyler. Üçü birlikte hemen hemen her hatayı çözmeye yeter.",
                "The traceback tells you where, the error type tells you what kind of problem, and the description tells you what was expected versus found. Together they are usually enough to fix almost any error.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir hata mesajını okumaya nereden başlamalısın?",
                "Where should you start reading an error message?",
              ],
              options: [
                ["En alttan", "From the bottom"],
                ["En üstten", "From the top"],
                ["Ortadan", "From the middle"],
                ["Sıra önemli değildir", "The order does not matter"],
              ],
              answer: 0,
              explain: [
                "En kritik bilgi — hata tipi ve açıklama — mesajın en altındadır. Üstteki satırlar sadece hataya nasıl ulaşıldığını (traceback) gösterir.",
                "The most critical information — the error type and description — sits at the bottom. The lines above it just show how execution got there (the traceback).",
              ],
            }),
            code(
              "python",
              `# 1. NameError — olmayan bir isme başvurdun (çoğu zaman yazım hatası)
print(toplaam)
# NameError: name 'toplaam' is not defined

# 2. TypeError — tipler uyuşmuyor
"fiyat: " + 1899
# TypeError: can only concatenate str (not "int") to str

# 3. ValueError — tip doğru ama değer uygun değil
int("abc")
# ValueError: invalid literal for int() with base 10: 'abc'

# 4. IndentationError — girinti bozuk (Python'da girinti sözdiziminin parçası)
if True:
print("merhaba")
# IndentationError: expected an indented block`,
            ),
            quiz({
              id: "q4",
              q: [
                "`int(\"abc\")` çalıştırıldığında hangi hata çıkar?",
                "Which error does `int(\"abc\")` raise?",
              ],
              options: [
                ["ValueError", "ValueError"],
                ["NameError", "NameError"],
                ["TypeError", "TypeError"],
                ["IndentationError", "IndentationError"],
              ],
              answer: 0,
              explain: [
                "`\"abc\"` bir tam sayı olarak yorumlanamaz. Tip doğrudur (metin), ama **değer** uygun değildir — bu tam olarak `ValueError`'ın tanımıdır.",
                "`\"abc\"` cannot be parsed as an integer. The type is fine (it is a string), but the **value** is unsuitable — that is exactly what `ValueError` means.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Hiç tanımlanmamış bir değişkeni `print` etmeye çalışırsan hangi hata çıkar?",
                "Which error do you get when you try to `print` a variable that was never defined?",
              ],
              options: [
                ["NameError", "NameError"],
                ["TypeError", "TypeError"],
                ["ValueError", "ValueError"],
                ["SyntaxError", "SyntaxError"],
              ],
              answer: 0,
              explain: [
                "Python o ismi hiçbir yerde bulamaz ve `NameError: name '...' is not defined` verir. Çoğu zaman bunun sebebi bir yazım hatasıdır.",
                "Python cannot find that name anywhere and raises `NameError: name '...' is not defined`. Most of the time the cause is a simple typo.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`\"fiyat: \" + 1899` neden `TypeError` verir?",
                "Why does `\"fiyat: \" + 1899` raise a `TypeError`?",
              ],
              options: [
                [
                  "Metin ile sayı doğrudan `+` ile birleştirilemez",
                  "A string and a number cannot be joined directly with `+`",
                ],
                ["1899 çok büyük bir sayıdır", "1899 is too large a number"],
                ["Metnin sonunda boşluk vardır", "The string has a trailing space"],
                ["`+` işareti Python'da tanımlı değildir", "The `+` operator is not defined in Python"],
              ],
              answer: 0,
              explain: [
                "`+`, iki tarafın da aynı ailede olmasını bekler: iki metin ya da iki sayı. Metni sayıyla birleştirmek istiyorsan önce `str(1899)` ile sayıyı metne çevirmelisin.",
                "`+` expects both sides to be the same kind: two strings or two numbers. To join text with a number you must first convert it with `str(1899)`.",
              ],
            }),
            text(
              "**Hata çözme sırası — deneyimliler bu adımları izler:**\n\n1. Hata **tipini** oku: `TypeError` mi `NameError` mı? Tip, sorunun ailesini söyler.\n2. **Satır numarasına** git ve o satıra bak.\n3. Değişkenlerin gerçekte ne içerdiğini `print(type(x), x)` ile gör. Tahmin etme, bak.\n4. Hâlâ çözülmediyse hata mesajının **son satırını** aynen arama motoruna yapıştır. Senden önce binlerce kişi aynı hatayı almıştır.",
              "**The order in which experienced people debug:**\n\n1. Read the **error type**: is it a `TypeError` or a `NameError`? The type tells you the family of the problem.\n2. Go to the **line number** and look at that line.\n3. See what the variables actually hold with `print(type(x), x)`. Do not guess — look.\n4. If it is still unsolved, paste the **last line** of the error verbatim into a search engine. Thousands of people have hit the same error before you.",
            ),
            quiz({
              id: "q7",
              q: [
                "Deneyimli hata çözme sırasında ilk adım nedir?",
                "In the experienced debugging order, what is the first step?",
              ],
              options: [
                ["Hatanın tipini okumak", "Read the error type"],
                ["Kodu baştan yazmak", "Rewrite the code from scratch"],
                ["Değişkenleri silmek", "Delete the variables"],
                ["Doğrudan arama motoruna gitmek", "Go straight to a search engine"],
              ],
              answer: 0,
              explain: [
                "Hata tipi, sorunun ailesini söyler — `TypeError` mi `NameError` mı olduğunu bilmeden satıra bakmak zaman kaybettirir. Sıradaki adımlar (satıra bakmak, değerleri yazdırmak, aramak) hep bu ilk sınıflandırmaya dayanır.",
                "The error type tells you the family of the problem — looking at the line before knowing whether it is a `TypeError` or a `NameError` wastes time. Every later step builds on this first classification.",
              ],
            }),
            pitfall(
              "Girinti Python'da isteğe bağlı değildir",
              "Indentation is not optional in Python",
              "Çoğu dilde girinti sadece güzel görünsün diyedir; Python'da **dilin parçasıdır**. Bir `if`, `for` veya `def` bloğunun içindeki satırlar aynı miktarda içeri kaydırılmalıdır — standart 4 boşluktur. Boşluk ile sekmeyi karıştırmak, gözle görünmeyen ama programı durduran hatalara yol açar. Editörünü \"sekmeleri boşluğa çevir\" ayarında tut.",
              "In most languages indentation is just for looks; in Python it is **part of the language**. Lines inside an `if`, `for` or `def` block must be indented by the same amount — four spaces is the standard. Mixing spaces and tabs produces errors that are invisible to the eye but stop the program. Keep your editor set to convert tabs into spaces.",
            ),
            quiz({
              id: "q8",
              q: [
                "Bir `if` bloğu içindeki satırlar için standart girinti kaç boşluktur?",
                "What is the standard indentation for lines inside an `if` block?",
              ],
              options: [
                ["4 boşluk", "4 spaces"],
                ["1 boşluk", "1 space"],
                ["8 boşluk", "8 spaces"],
                ["Girinti önemli değildir", "Indentation does not matter"],
              ],
              answer: 0,
              explain: [
                "Python topluluğunda standart 4 boşluktur. Önemli olan miktar değil **tutarlılıktır** — bir blok içindeki tüm satırlar aynı miktarda girintili olmalıdır, yoksa `IndentationError` alırsın.",
                "The Python community standard is 4 spaces. What matters most is **consistency** — every line in a block must be indented by the same amount, or you get an `IndentationError`.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bir dosyada boşluk ve sekme (tab) karışık kullanılırsa ne olur?",
                "What happens if a file mixes spaces and tabs for indentation?",
              ],
              options: [
                [
                  "Gözle görünmeyen ama programı durduran girinti hataları oluşabilir",
                  "It can produce indentation errors that are invisible to the eye but stop the program",
                ],
                ["Python otomatik olarak düzeltir", "Python automatically fixes it"],
                ["Hiçbir fark yaratmaz", "It makes no difference at all"],
                ["Sadece yorum satırlarını etkiler", "It only affects comment lines"],
              ],
              answer: 0,
              explain: [
                "Bir sekme ile birkaç boşluk ekranda aynı görünebilir ama Python için farklı karakterlerdir; bu görünmez fark `IndentationError` veya `TabError` olarak patlar. Editörünü sekmeleri boşluğa çeviren ayarda tutmak bu sınıf hatayı tamamen ortadan kaldırır.",
                "A tab and a few spaces can look identical on screen but are different characters to Python; that invisible difference surfaces as `IndentationError` or `TabError`. Keeping your editor set to convert tabs to spaces eliminates this whole class of bug.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "`yas = \"25\"` yazdıktan sonra `yas + 5` çalıştırırsan ne olur?",
                "After `yas = \"25\"`, what happens when you run `yas + 5`?",
              ],
              options: [
                [
                  "`TypeError` — metin ile sayı toplanamaz; önce `int(yas)` yapmak gerekir",
                  "`TypeError` — text and a number cannot be added; you must convert with `int(yas)` first",
                ],
                ["30 sonucunu verir", "It returns 30"],
                ["\"255\" sonucunu verir", "It returns \"255\""],
                ["`NameError` verir", "It raises a `NameError`"],
              ],
              answer: 0,
              explain: [
                "Tırnak yüzünden `yas` bir metindir. Bu hata, CSV dosyasından okunan sayıların metin olarak gelmesiyle gerçek hayatta sürekli karşına çıkar — bu yüzden veri okuduktan sonra ilk iş tipleri kontrol etmektir.",
                "Because of the quotes, `yas` is text. You will meet this error constantly in real life when numbers read from a CSV arrive as text — which is why checking types right after loading data is the first job.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Aşağıdaki kod hata **vermez** ama yanlış çalışır: `adet` metin olduğu için Python `\"4\"` metnini 549 kez tekrarlar. Sayıya çevirerek `toplam` değerini doğru hesapla.",
                "The code below raises **no error** but is wrong: because `adet` is text, Python repeats the string `\"4\"` 549 times. Convert it to a number so `toplam` is computed correctly.",
              ],
              starter: `fiyat = 549
adet = "4"   # CSV'den metin olarak geldi

toplam = fiyat * adet
print(toplam)`,
              solution: `fiyat = 549
adet = "4"   # CSV'den metin olarak geldi

toplam = fiyat * int(adet)
print(toplam)`,
              hint: [
                "`int(\"4\")` metni tam sayıya çevirir. Ondalıklı olsaydı `float()` kullanırdın.",
                "`int(\"4\")` converts the text to an integer. For decimals you would use `float()`.",
              ],
              checks: [
                {
                  code: "toplam == 2196",
                  msg: [
                    "`toplam` 2196 olmalı (549 × 4)",
                    "`toplam` must be 2196 (549 × 4)",
                  ],
                },
                {
                  code: "isinstance(toplam, int)",
                  msg: [
                    "Sonuç tam sayı olmalı — metin tekrarı değil",
                    "The result must be an integer — not a repeated string",
                  ],
                },
              ],
              xp: 35,
            }),
          ],
        }),
      ],
    },
    /* ---------------------------------------------------------------- */
    {
      id: "junior",
      title: L("Dilin temelleri", "Language basics"),
      description: L(
        "Değişkenler, veri yapıları, döngüler ve fonksiyonlar. Veri işlemenin yapı taşları.",
        "Variables, data structures, loops and functions. The building blocks of data work.",
      ),
      projectSlug: "python-veri-temizligi",
      lessons: [
        lesson({
          slug: "degiskenler-ve-tipler",
          title: L("Değişkenler ve veri tipleri", "Variables and data types"),
          summary: L(
            "Python'da veri nasıl saklanır ve tipler neden analizin ilk hata kaynağıdır?",
            "How Python stores data, and why types are the first source of bugs in analysis.",
          ),
          minutes: 12,
          blocks: [
            text(
              "Değişken, bir değere verdiğin isimdir. Python'da tip bildirmezsin; tip değerin kendisinden anlaşılır.",
              "A variable is a name you give a value. In Python you do not declare a type; the value determines it.",
            ),
            code(
              "python",
              `urun = "Kablosuz Kulaklık"   # str  — metin
fiyat = 1899.0                # float — ondalıklı sayı
stok = 120                    # int   — tam sayı
indirimde = True              # bool  — doğru/yanlış
iade_tarihi = None            # None  — değer yok

print(type(fiyat))            # <class 'float'>
print(f"{urun}: {fiyat} TL")  # f-string ile biçimleme`,
            ),
            quiz({
              id: "q2",
              q: ["`print(type(fiyat))` ne yazdırır?", "What does `print(type(fiyat))` print?"],
              options: [
                ["<class 'float'>", "<class 'float'>"],
                ["<class 'int'>", "<class 'int'>"],
                ["1899.0", "1899.0"],
                ["fiyat", "fiyat"],
              ],
              answer: 0,
              explain: [
                "`fiyat = 1899.0` ondalıklı yazıldığı için Python onu `float` olarak saklar. `type(...)` bir değerin gerçek tipini gösterir — veri temizlerken tahmin etmek yerine bunu kullan.",
                "Because `fiyat = 1899.0` is written with a decimal point, Python stores it as a `float`. `type(...)` shows a value's real type — use it instead of guessing when cleaning data.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`iade_tarihi = None` satırı ne anlama gelir?",
                "What does the line `iade_tarihi = None` mean?",
              ],
              options: [
                ["Değişkenin şu anda bir değeri yoktur", "The variable currently has no value"],
                ["Değişken 0'a eşittir", "The variable equals 0"],
                ["Değişken boş bir metindir", "The variable is an empty string"],
                ["Satır hata verir", "The line raises an error"],
              ],
              answer: 0,
              explain: [
                "`None`, Python'da \"değer yok\" anlamına gelen özel bir işaretçidir — `0` veya `\"\"` gibi bir değer değil, değerin **bilinçli olarak boş** olduğunu belirtir. Ürün henüz iade edilmediyse `iade_tarihi` için doğru seçim budur.",
                "`None` is Python's special marker for \"no value\" — not `0`, not `\"\"`, but a deliberate statement that there is nothing here yet. It is the right choice for `iade_tarihi` when a product has not been returned.",
              ],
            }),
            text(
              "Analizde en sık karşılaşılan hata, **sayı gibi görünen metindir**. CSV'den okunan `\"1.899\"` bir metindir; toplamaya kalkarsan Python hata verir veya daha kötüsü, metinleri birleştirir.",
              "The most common bug in analysis is **text that looks like a number**. A `\"1,899\"` read from CSV is a string; adding it either raises an error or, worse, concatenates the strings.",
            ),
            quiz({
              id: "q4",
              q: [
                "CSV dosyasından okunan `\"1.899\"` değeri Python'da hangi tiptedir?",
                "What type is `\"1.899\"` read from a CSV file, in Python?",
              ],
              options: [
                ["str (metin)", "str (text)"],
                ["float", "float"],
                ["int", "int"],
                ["Otomatik olarak sayıya çevrilir", "It is automatically converted to a number"],
              ],
              answer: 0,
              explain: [
                "CSV dosyaları tamamen metin içerir; pandas veya `open()` ile okuduğunda değerler önce metindir. Sayı **gibi görünmesi** onu sayı yapmaz — toplamadan önce açıkça `float()` veya `int()` ile çevirmen gerekir.",
                "CSV files are pure text; when you read them, values start out as strings. Looking like a number does not make it one — you must explicitly convert with `float()` or `int()` before adding.",
              ],
            }),
            code(
              "python",
              `a = "10"
b = "5"
print(a + b)        # "105"  — metin birleştirme!
print(int(a) + int(b))  # 15  — doğru
print(float("3.14"))    # 3.14`,
            ),
            quiz({
              id: "q5",
              q: [
                "`a = \"10\"`, `b = \"5\"` iken `a + b` nedir?",
                "With `a = \"10\"` and `b = \"5\"`, what is `a + b`?",
              ],
              options: [
                ["\"105\"", "\"105\""],
                ["15", "15"],
                ["\"15\"", "\"15\""],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "İkisi de metin olduğu için `+` toplama değil birleştirme yapar: `\"10\"` ile `\"5\"` yan yana gelip `\"105\"` olur. 15 sonucunu almak istiyorsan önce `int(a) + int(b)` yazmalısın.",
                "Since both are strings, `+` concatenates rather than adds: `\"10\"` and `\"5\"` glue together into `\"105\"`. To get 15 you must first write `int(a) + int(b)`.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`int(a) + int(b)` neden `a + b`'den farklı sonuç verir?",
                "Why does `int(a) + int(b)` give a different result from `a + b`?",
              ],
              options: [
                [
                  "`int()` metinleri sayıya çevirir; artık `+` toplama yapar",
                  "`int()` converts the strings to numbers, so `+` now performs addition",
                ],
                ["`int()` metni tersine çevirir", "`int()` reverses the string"],
                ["İkisi aslında aynı sonucu verir", "They actually give the same result"],
                ["`int()` sadece görünümü değiştirir, tipi değil", "`int()` only changes the display, not the type"],
              ],
              answer: 0,
              explain: [
                "`int(a)` ve `int(b)` çalıştığında elindeki artık metin değil sayıdır; aynı `+` işareti bu kez toplama yapar. Operatörün davranışı, işlenenlerin tipine bağlıdır.",
                "Once `int(a)` and `int(b)` run, you no longer have strings but numbers; the very same `+` now performs addition. An operator's behaviour depends on the type of its operands.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`float(\"3.14\")` ifadesinin tipi nedir?",
                "What is the type of `float(\"3.14\")`?",
              ],
              options: [
                ["float", "float"],
                ["str", "str"],
                ["int", "int"],
                ["Hata verir çünkü zaten ondalıklı bir metin", "It errors because it is already a decimal string"],
              ],
              answer: 0,
              explain: [
                "`float(...)` girdisi ne olursa olsun her zaman bir `float` döndürür (dönüştürülebilirse). `\"3.14\"` bir metindi, sonucu ise sayısal bir ondalıktır.",
                "`float(...)` always returns a `float` regardless of the input (as long as it is convertible). `\"3.14\"` was a string; the result is a numeric decimal.",
              ],
            }),
            pitfall(
              "Ondalık ayırıcı tuzağı",
              "The decimal separator trap",
              "Türkçe biçimli veride `1.899,50` yazar; Python `1899.50` bekler. Dönüştürmeden önce binlik ayıracı sil, ondalık virgülü noktaya çevir: `float(metin.replace('.', '').replace(',', '.'))`. Bu tek satır, Türkiye'de çalışan analistlerin en sık düştüğü hatayı çözer.",
              "Turkish-formatted data writes `1.899,50` while Python expects `1899.50`. Strip the thousands separator and swap the decimal comma before converting: `float(text.replace('.', '').replace(',', '.'))`. That one line fixes the most common conversion bug for analysts working with European data.",
            ),
            quiz({
              id: "q8",
              q: [
                "`\"1.899,50\"` metnini `float`'a çevirirken hangi sırayla `.replace()` uygulanmalı?",
                "When converting `\"1.899,50\"` to a `float`, in which order should `.replace()` be applied?",
              ],
              options: [
                [
                  "Önce noktayı sil (`.replace('.', '')`), sonra virgülü noktaya çevir (`.replace(',', '.')`)",
                  "First remove the dot (`.replace('.', '')`), then turn the comma into a dot (`.replace(',', '.')`)",
                ],
                [
                  "Önce virgülü noktaya çevir, sonra noktayı sil",
                  "First turn the comma into a dot, then remove the dot",
                ],
                ["Sıra önemli değildir", "The order does not matter"],
                ["Sadece `float(...)` yeterlidir, `.replace()` gerekmez", "`float(...)` alone is enough, no `.replace()` needed"],
              ],
              answer: 0,
              explain: [
                "Sırayı ters çevirirsen binlik ayıracını silmeden önce virgülü noktaya çevirirsin, ardından o yeni noktayı da silersin — ondalık kısmı kaybolur. Önce binlik ayıracı (nokta) sil, sonra ondalık virgülü noktaya çevir.",
                "If you swap the order, you turn the comma into a dot before removing the thousands separator, then delete that new dot too — the decimal part disappears. Remove the thousands separator (dot) first, then convert the decimal comma to a dot.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`float(\"1.899,50\")` doğrudan çalıştırılırsa ne olur?",
                "What happens if you run `float(\"1.899,50\")` directly?",
              ],
              options: [
                ["ValueError verir", "It raises a ValueError"],
                ["1899.50 döner", "It returns 1899.50"],
                ["1.899 döner", "It returns 1.899"],
                ["\"1899.50\" metnini döner", "It returns the string \"1899.50\""],
              ],
              answer: 0,
              explain: [
                "Python'un `float()` fonksiyonu yalnızca kendi biçimini (nokta ondalık ayıracı) anlar; içinde hem nokta hem virgül olan bir metni doğrudan çeviremez ve `ValueError` fırlatır. Önce `.replace()` ile Python'un beklediği biçime getirmen gerekir.",
                "Python's `float()` only understands its own format (a dot as the decimal separator); it cannot parse a string with both a dot and a comma and raises a `ValueError`. You must reshape it with `.replace()` first.",
              ],
            }),
            quiz({
              id: "q1",
              q: ["`print(\"7\" * 3)` çıktısı nedir?", "What does `print(\"7\" * 3)` print?"],
              options: [
                ["777", "777"],
                ["21", "21"],
                ["Hata verir", "It raises an error"],
                ["7 7 7", "7 7 7"],
              ],
              answer: 0,
              explain: [
                "Metin ile sayı çarpımı, metni o kadar kez tekrarlar. `21` istiyorsan önce `int(\"7\")` ile sayıya çevirmelisin. Bu, veri okurken tip kontrolünün neden ilk iş olduğunu gösteren küçük ama öğretici bir örnek.",
                "Multiplying a string by an integer repeats the string. For `21` you must convert first with `int(\"7\")`. It is a small but telling example of why type checking comes first when reading data.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Aşağıdaki metinleri sayıya çevirip toplamını `toplam` değişkenine ata.\n\nBeklenen sonuç: `4589.5`",
                "Convert the strings below to numbers and store their sum in `toplam`.\n\nExpected result: `4589.5`",
              ],
              starter: `fiyat_metin = "1899.0"
kargo_metin = "49.5"
kulaklik_metin = "2641.0"

# toplam değişkenini burada hesapla
toplam = `,
              solution: `fiyat_metin = "1899.0"
kargo_metin = "49.5"
kulaklik_metin = "2641.0"

toplam = float(fiyat_metin) + float(kargo_metin) + float(kulaklik_metin)
print(toplam)`,
              hint: [
                "Her metni `float(...)` ile çevirip artı ile topla.",
                "Wrap each string in `float(...)` and add them with `+`.",
              ],
              checks: [
                {
                  code: "abs(toplam - 4589.5) < 1e-9",
                  msg: ["toplam değişkeni 4589.5 olmalı", "toplam must equal 4589.5"],
                },
                {
                  code: "isinstance(toplam, float)",
                  msg: ["toplam bir float olmalı (metin değil)", "toplam must be a float, not a string"],
                },
              ],
              xp: 25,
            }),
          ],
        }),

        lesson({
          slug: "listeler-ve-sozlukler",
          title: L("Listeler, sözlükler ve dilimleme", "Lists, dictionaries and slicing"),
          summary: L(
            "Bir veri satırını, bir sütunu, bir tabloyu Python'da nasıl temsil edersin?",
            "How do you represent a row, a column and a table in plain Python?",
          ),
          minutes: 14,
          blocks: [
            text(
              "**Liste** sıralı bir koleksiyondur — bir sütun gibi düşün. **Sözlük** ise anahtar–değer çiftidir — bir satır gibi düşün. pandas'ın `DataFrame`'i aslında bu ikisinin üstüne kurulur.",
              "A **list** is an ordered collection — think of a column. A **dict** maps keys to values — think of a row. pandas' `DataFrame` is essentially built on top of these two.",
            ),
            code(
              "python",
              `fiyatlar = [1899, 2450, 4290, 549, 320]

print(fiyatlar[0])     # 1899  — ilk eleman (0'dan başlar)
print(fiyatlar[-1])    # 320   — son eleman
print(fiyatlar[1:3])   # [2450, 4290] — 1'den 3'e (3 hariç)
print(len(fiyatlar))   # 5
print(sum(fiyatlar) / len(fiyatlar))  # ortalama

fiyatlar.append(999)   # sona ekle
fiyatlar.sort()        # yerinde sırala`,
            ),
            quiz({
              id: "q2",
              q: [
                "`fiyatlar = [1899, 2450, 4290, 549, 320]` iken `fiyatlar[0]` nedir?",
                "With `fiyatlar = [1899, 2450, 4290, 549, 320]`, what is `fiyatlar[0]`?",
              ],
              options: [
                ["1899", "1899"],
                ["2450", "2450"],
                ["320", "320"],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "Python listeleri 0'dan indekslenir; `[0]` her zaman **ilk** elemanı verir. Bu, `range()` ve pandas'ın `iloc`'unda da geçerli olan evrensel bir kural.",
                "Python lists are indexed from 0; `[0]` always gives the **first** element. It is a universal rule that also holds for `range()` and pandas' `iloc`.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Aynı listede `fiyatlar[-1]` neyi verir?",
                "In the same list, what does `fiyatlar[-1]` give?",
              ],
              options: [
                ["320 — son eleman", "320 — the last element"],
                ["1899 — ilk eleman", "1899 — the first element"],
                ["Hata verir", "It raises an error"],
                ["Listenin uzunluğunu", "The list's length"],
              ],
              answer: 0,
              explain: [
                "Negatif indeksler sondan sayar: `-1` son elemanı, `-2` sondan ikinciyi verir. Uzun listelerde son elemana ulaşmak için `len(liste) - 1` yazmaktan çok daha okunur bir yoldur.",
                "Negative indices count from the end: `-1` is the last element, `-2` the second-to-last. It is far more readable than writing `len(list) - 1` to reach the final item.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`fiyatlar.append(999)` çalıştırıldıktan sonra ne olur?",
                "What happens after `fiyatlar.append(999)` runs?",
              ],
              options: [
                [
                  "`fiyatlar` listesinin kendisi değişir, sonuna 999 eklenir",
                  "The `fiyatlar` list itself changes — 999 is added to the end",
                ],
                ["Yeni bir liste döner, `fiyatlar` değişmez", "A new list is returned; `fiyatlar` is unchanged"],
                ["999, listenin başına eklenir", "999 is added to the start of the list"],
                ["Hata verir çünkü liste zaten doludur", "It raises an error because the list is already full"],
              ],
              answer: 0,
              explain: [
                "`append`, listeyi **yerinde** (in place) değiştirir; orijinal listenin kendisi büyür. `fiyatlar = fiyatlar.append(999)` yazmak yaygın bir hatadır çünkü `append` `None` döner.",
                "`append` mutates the list **in place**; the original list itself grows. Writing `fiyatlar = fiyatlar.append(999)` is a common mistake because `append` returns `None`.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`fiyatlar` beş elemanlıyken `fiyatlar.append(999)` çalıştırılırsa `len(fiyatlar)` kaç olur?",
                "If `fiyatlar` has five elements and you run `fiyatlar.append(999)`, what is `len(fiyatlar)` afterwards?",
              ],
              options: [
                ["6", "6"],
                ["5", "5"],
                ["999", "999"],
                ["1", "1"],
              ],
              answer: 0,
              explain: [
                "`append` bir eleman ekler, dolayısıyla uzunluk bir artar. `len()` bir listenin eleman sayısını verir; sonucu tahmin etmek yerine gerektiğinde her zaman `print(len(...))` ile doğrula.",
                "`append` adds one element, so the length increases by one. `len()` counts a list's elements; when in doubt, verify with `print(len(...))` instead of guessing.",
              ],
            }),
            tryPy(
              `# Dilimlemeyi kendin sına: indeksleri değiştir, çalıştır, sonucu gör.
fiyatlar = [1899, 2450, 4290, 549, 320]

print("ilk üç :", fiyatlar[:3])
print("son iki:", fiyatlar[-2:])
print("ters   :", fiyatlar[::-1])
print("ortalama:", sum(fiyatlar) / len(fiyatlar))`,
            ),
            code(
              "python",
              `urun = {
    "ad": "Akıllı Saat",
    "fiyat": 4290.0,
    "kategori": "Elektronik",
    "stok": 34,
}

print(urun["fiyat"])              # 4290.0
print(urun.get("renk", "yok"))    # anahtar yoksa varsayılan döner
urun["indirim"] = 0.15            # yeni anahtar ekle

for anahtar, deger in urun.items():
    print(anahtar, "->", deger)`,
            ),
            quiz({
              id: "q6",
              q: [
                "`urun[\"fiyat\"]` nasıl bir değer döndürür?",
                "What kind of value does `urun[\"fiyat\"]` return?",
              ],
              options: [
                ["\"fiyat\" anahtarına karşılık gelen değeri (4290.0)", "The value mapped to the \"fiyat\" key (4290.0)"],
                ["Anahtarın kendisini (\"fiyat\")", "The key itself (\"fiyat\")"],
                ["Sözlükteki tüm değerleri liste olarak", "All the dict's values as a list"],
                ["Her zaman `None`", "Always `None`"],
              ],
              answer: 0,
              explain: [
                "Köşeli parantez içindeki isim bir **anahtardır**; sözlük o anahtara bağlı **değeri** döndürür. Liste indeksinin konuma göre çalışmasının aksine, sözlük ismine göre çalışır.",
                "The name in the brackets is a **key**; the dict returns the **value** bound to it. Unlike a list index which works by position, a dict works by name.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`urun.get(\"renk\", \"yok\")` sözlükte `\"renk\"` anahtarı yoksa ne döner?",
                "If the key `\"renk\"` is not in the dict, what does `urun.get(\"renk\", \"yok\")` return?",
              ],
              options: [
                ["\"yok\"", "\"yok\""],
                ["Hata verir", "It raises an error"],
                ["None", "None"],
                ["\"renk\"", "\"renk\""],
              ],
              answer: 0,
              explain: [
                "`.get(anahtar, varsayilan)` anahtar yoksa çökmek yerine ikinci argümanı döner. `urun[\"renk\"]` yazsaydın anahtar olmadığı için `KeyError` alırdın — `.get` bunu güvenli hale getirir.",
                "`.get(key, default)` returns the second argument instead of crashing when the key is missing. Writing `urun[\"renk\"]` would raise a `KeyError` since the key does not exist — `.get` makes this safe.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`urun[\"indirim\"] = 0.15` satırı ne yapar?",
                "What does the line `urun[\"indirim\"] = 0.15` do?",
              ],
              options: [
                ["Sözlüğe yeni bir anahtar-değer çifti ekler", "Adds a new key-value pair to the dict"],
                ["Hata verir çünkü anahtar zaten yok", "Raises an error because the key does not already exist"],
                ["Sadece okuma yapar, değiştirmez", "Only reads the dict, does not change it"],
                ["`urun` sözlüğünü siler", "Deletes the `urun` dict"],
              ],
              answer: 0,
              explain: [
                "Sözlüklerde olmayan bir anahtara değer atamak, onu **oluşturur**. Listede olmayan bir indekse atama yapmak hata verirken, sözlükte bu son derece normaldir — bu fark satır ekleme (`append`) ile sütun ekleme arasındaki mantığa benzer.",
                "Assigning to a key that does not exist yet **creates** it in a dict. Assigning to a list index that does not exist raises an error, but this is completely normal for a dict — similar in spirit to how adding a row differs from adding a column.",
              ],
            }),
            info(
              "Sözlük listesi = tablo",
              "A list of dicts is a table",
              "Bir API'den gelen JSON verisi genelde \"sözlüklerden oluşan liste\"dir. `pd.DataFrame(kayitlar)` yazdığın anda bu yapı doğrudan bir tabloya dönüşür — pandas'a geçtiğinde bu bağlantıyı hatırla.",
              "JSON coming back from an API is usually a list of dicts. The moment you write `pd.DataFrame(records)` that structure becomes a table — remember this link when you get to pandas.",
            ),
            quiz({
              id: "q9",
              q: [
                "Bir API'den gelen JSON, sözlüklerden oluşan bir liste olarak geliyor. pandas'a geçince bu ne olur?",
                "JSON from an API arrives as a list of dicts. What does this become once you move to pandas?",
              ],
              options: [
                ["Doğrudan bir tabloya (DataFrame) dönüşür", "It converts directly into a table (a DataFrame)"],
                ["Önce metne çevrilmesi gerekir", "It must first be converted to text"],
                ["pandas bu yapıyı okuyamaz", "pandas cannot read this structure"],
                ["Yalnızca ilk sözlük kullanılır", "Only the first dict is used"],
              ],
              answer: 0,
              explain: [
                "Listedeki her sözlük bir **satıra**, her anahtar bir **sütuna** karşılık gelir. `pd.DataFrame(kayitlar)` yazmak yeter — bu yüzden liste ve sözlüğü iyi bilmek pandas'a geçişi kolaylaştırır.",
                "Each dict in the list becomes a **row**, each key becomes a **column**. Writing `pd.DataFrame(records)` is all it takes — which is why knowing lists and dicts well makes the move to pandas easy.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "`sayilar = [10, 20, 30, 40, 50]` için `sayilar[1:4]` nedir?",
                "For `sayilar = [10, 20, 30, 40, 50]`, what is `sayilar[1:4]`?",
              ],
              options: [
                ["[20, 30, 40]", "[20, 30, 40]"],
                ["[10, 20, 30, 40]", "[10, 20, 30, 40]"],
                ["[20, 30, 40, 50]", "[20, 30, 40, 50]"],
                ["[10, 20, 30]", "[10, 20, 30]"],
              ],
              answer: 0,
              explain: [
                "Dilimleme başlangıcı **dahil**, bitişi **hariç** alır: indeks 1, 2 ve 3. Bu kural `range()` ve pandas'ın `iloc`'unda da aynıdır; bir kez oturunca çok yerde işine yarar.",
                "Slicing includes the start and **excludes** the end: indices 1, 2 and 3. The same rule holds for `range()` and pandas' `iloc`; learn it once, use it everywhere.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "`fiyatlar` listesinden **2000'den büyük** olanları `pahali` listesine, listenin **ortalamasını** `ortalama` değişkenine ata.",
                "From `fiyatlar`, put every value **greater than 2000** into `pahali`, and the list's **mean** into `ortalama`.",
              ],
              starter: `fiyatlar = [1899, 2450, 4290, 549, 320, 7990, 3150]

pahali =
ortalama = `,
              solution: `fiyatlar = [1899, 2450, 4290, 549, 320, 7990, 3150]

pahali = [f for f in fiyatlar if f > 2000]
ortalama = sum(fiyatlar) / len(fiyatlar)
print(pahali, ortalama)`,
              hint: [
                "Liste üreteci (comprehension): `[f for f in fiyatlar if f > 2000]`. Ortalama için `sum(...) / len(...)`.",
                "List comprehension: `[f for f in fiyatlar if f > 2000]`. Mean is `sum(...) / len(...)`.",
              ],
              checks: [
                {
                  code: "pahali == [2450, 4290, 7990, 3150]",
                  msg: [
                    "pahali listesi 2000 üstü değerleri sırasıyla içermeli",
                    "pahali must contain the values above 2000, in order",
                  ],
                },
                {
                  code: "abs(ortalama - 2949.7142857142857) < 1e-6",
                  msg: ["ortalama doğru hesaplanmalı", "ortalama must be computed correctly"],
                },
              ],
              xp: 30,
            }),
          ],
        }),

        lesson({
          slug: "kosul-ve-dongu",
          title: L("Koşullar ve döngüler", "Conditions and loops"),
          summary: L(
            "Veriyi satır satır gezmek, kural uygulamak ve kategori türetmek.",
            "Walking data row by row, applying rules and deriving categories.",
          ),
          minutes: 14,
          blocks: [
            text(
              "`if / elif / else` bir kuralı ifade eder; `for` bir koleksiyonu gezer. Python'da blokları **girinti** belirler — süslü parantez yoktur, boşluklar dilin bir parçasıdır.",
              "`if / elif / else` expresses a rule; `for` walks a collection. In Python **indentation** defines blocks — there are no braces, whitespace is part of the language.",
            ),
            code(
              "python",
              `fiyatlar = [1899, 549, 7990, 320]

for fiyat in fiyatlar:
    if fiyat < 500:
        segment = "ekonomik"
    elif fiyat < 3000:
        segment = "orta"
    else:
        segment = "premium"
    print(fiyat, "->", segment)`,
            ),
            quiz({
              id: "q1",
              q: [
                "Yukarıdaki koda göre `fiyat = 200` için `segment` ne olur?",
                "Given the code above, what is `segment` for `fiyat = 200`?",
              ],
              options: [
                ["\"ekonomik\"", "\"ekonomik\""],
                ["\"orta\"", "\"orta\""],
                ["\"premium\"", "\"premium\""],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "İlk koşul `fiyat < 500` doğrudur (200 < 500), Python ilk doğru dala girer ve gerisini hiç bakmaz. `elif` ve `else` yalnızca önceki koşullar yanlışsa denenir.",
                "The first condition `fiyat < 500` is true (200 < 500), so Python takes that branch and never checks the rest. `elif` and `else` are only tried when the earlier conditions are false.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Aynı koda göre `fiyat = 1899` için `segment` ne olur?",
                "With the same code, what is `segment` for `fiyat = 1899`?",
              ],
              options: [
                ["\"orta\"", "\"orta\""],
                ["\"ekonomik\"", "\"ekonomik\""],
                ["\"premium\"", "\"premium\""],
                ["Hem \"ekonomik\" hem \"orta\"", "Both \"ekonomik\" and \"orta\""],
              ],
              answer: 0,
              explain: [
                "1899, 500'den küçük değil ama 3000'den küçük — bu yüzden `elif fiyat < 3000` dalı çalışır ve `segment = \"orta\"` olur. Python koşulları sırayla dener ve **ilk doğru olanda durur**.",
                "1899 is not less than 500 but is less than 3000, so the `elif fiyat < 3000` branch runs and `segment` becomes `\"orta\"`. Python checks conditions in order and **stops at the first true one**.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Python'da bir `for` döngüsünün içeriği neyle belirlenir?",
                "In Python, what determines the contents of a `for` loop's body?",
              ],
              options: [
                ["Girinti (indentation)", "Indentation"],
                ["Süslü parantezler `{}`", "Curly braces `{}`"],
                ["`end` anahtar kelimesi", "The `end` keyword"],
                ["Noktalı virgül", "Semicolons"],
              ],
              answer: 0,
              explain: [
                "Python'da blok sınırlarını süslü parantez değil **girinti** çizer. `for` satırından sonra aynı miktarda içeri kaydırılmış her satır, döngünün bir parçasıdır; girinti biterse döngü de biter.",
                "Python marks block boundaries with **indentation**, not curly braces. Every line indented by the same amount after the `for` line belongs to the loop; the loop ends where the indentation does.",
              ],
            }),
            text(
              "Aynı işi tek satırda yapan **liste üreteci** (list comprehension) Python'un en çok kullanılan kalıbıdır. Kısa dönüşümlerde döngü yazmak yerine bunu tercih et.",
              "A **list comprehension** does the same in one line and is Python's most-used idiom. Prefer it over a loop for short transformations.",
            ),
            code(
              "python",
              `kdvli = [f * 1.20 for f in fiyatlar]
indirimliler = [f for f in fiyatlar if f > 1000]
etiketler = ["pahalı" if f > 2000 else "uygun" for f in fiyatlar]

# enumerate: hem indeks hem değer
for i, fiyat in enumerate(fiyatlar):
    print(i, fiyat)

# zip: iki listeyi birlikte gez
urunler = ["kulaklık", "mat", "süpürge", "kitap"]
for urun, fiyat in zip(urunler, fiyatlar):
    print(urun, fiyat)`,
            ),
            quiz({
              id: "q4",
              q: [
                "`fiyatlar = [1899, 549, 7990, 320]` iken `kdvli = [f * 1.20 for f in fiyatlar]` ne üretir?",
                "With `fiyatlar = [1899, 549, 7990, 320]`, what does `kdvli = [f * 1.20 for f in fiyatlar]` produce?",
              ],
              options: [
                [
                  "Her fiyatın %20 KDV'li halini içeren yeni bir liste",
                  "A new list containing each price with 20% VAT added",
                ],
                ["`fiyatlar` listesinin kendisini değiştirir", "It modifies the `fiyatlar` list in place"],
                ["Tek bir sayı döner (toplam)", "It returns a single number (the total)"],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "Liste üreteci, orijinal listeyi bozmadan her elemana aynı dönüşümü uygulayıp **yeni** bir liste döndürür — `for fiyat in fiyatlar: ... append(...)` yazmanın kısayoludur.",
                "A list comprehension applies the same transformation to every element without touching the original, returning a **new** list — it is shorthand for writing `for fiyat in fiyatlar: ... append(...)`.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`indirimliler = [f for f in fiyatlar if f > 1000]` ifadesindeki `if` ne işe yarar?",
                "In `indirimliler = [f for f in fiyatlar if f > 1000]`, what does the `if` do?",
              ],
              options: [
                ["Yalnızca koşulu sağlayan elemanları listeye alır (filtreler)", "It keeps only the elements that satisfy the condition (filters)"],
                ["Her elemanı 1000 ile çarpar", "It multiplies every element by 1000"],
                ["Listeyi büyükten küçüğe sıralar", "It sorts the list from largest to smallest"],
                ["Koşulu sağlamayanları hata olarak işaretler", "It flags elements that fail the condition as errors"],
              ],
              answer: 0,
              explain: [
                "Liste üretecindeki `if`, döngüye bir **filtre** ekler: yalnızca `f > 1000` doğru olan elemanlar sonuç listesine girer, gerisi atlanır.",
                "The `if` inside a comprehension adds a **filter** to the loop: only elements where `f > 1000` is true make it into the result list; the rest are skipped.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`etiketler = [\"pahalı\" if f > 2000 else \"uygun\" for f in fiyatlar]` ne yapar?",
                "What does `etiketler = [\"pahalı\" if f > 2000 else \"uygun\" for f in fiyatlar]` do?",
              ],
              options: [
                [
                  "Her fiyata, koşula göre \"pahalı\" veya \"uygun\" etiketi atar — hiçbir eleman elenmez",
                  "It labels every price \"pahalı\" or \"uygun\" based on the condition — no element is dropped",
                ],
                ["Yalnızca pahalı olanları listeye alır, ucuzları atar", "It keeps only the expensive ones and drops the rest"],
                ["`indirimliler` ile tamamen aynı çalışır", "It behaves exactly like `indirimliler`"],
                ["Hata verir çünkü iki `if` bir arada olamaz", "It raises an error because two `if`s cannot coexist"],
              ],
              answer: 0,
              explain: [
                "Burada `if/else` bir **filtre değil**, koşula bağlı bir **değer seçimidir** (üçlü ifade / ternary) — her eleman sonuçta kalır, sadece hangi etiketi alacağı değişir. Filtreleyen `if` (q5'teki gibi) `for`'dan **sonra**, değer seçen `if/else` ise `for`'dan **önce** yazılır.",
                "Here `if/else` is not a **filter** but a conditional **value choice** (a ternary expression) — every element survives, only its label changes. A filtering `if` (as in q5) comes **after** the `for`; a value-choosing `if/else` comes **before** it.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`for i, fiyat in enumerate(fiyatlar):` yazmanın amacı nedir?",
                "What is the point of writing `for i, fiyat in enumerate(fiyatlar):`?",
              ],
              options: [
                [
                  "Her elemanın hem indeksini hem değerini aynı anda almak",
                  "To get each element's index and value at the same time",
                ],
                ["Listeyi tersten okumak", "To read the list in reverse"],
                ["Listeyi sıralamak", "To sort the list"],
                ["Yalnızca ilk elemanı almak", "To get only the first element"],
              ],
              answer: 0,
              explain: [
                "`enumerate`, döngü sırasında elemanla birlikte konumunu (`i`) da verir. İndeksi ayrıca `fiyatlar.index(...)` ile aramaktan çok daha pratiktir.",
                "`enumerate` hands you the element's position (`i`) alongside its value as you loop. It is far more practical than separately looking up the index with `fiyatlar.index(...)`.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`for urun, fiyat in zip(urunler, fiyatlar):` yazmanın amacı nedir?",
                "What is the point of writing `for urun, fiyat in zip(urunler, fiyatlar):`?",
              ],
              options: [
                [
                  "İki listeyi aynı anda, eşleşen konumlarıyla birlikte gezmek",
                  "To walk two lists at once, pairing up matching positions",
                ],
                ["İki listeyi tek bir listede birleştirmek (concat)", "To concatenate the two lists into one"],
                ["Listeleri karşılaştırıp farkını bulmak", "To compare the lists and find their difference"],
                ["Yalnızca daha uzun olan listeyi gezmek", "To iterate only over the longer list"],
              ],
              answer: 0,
              explain: [
                "`zip`, iki (veya daha fazla) listeyi paralel gezdirir: her turda birinci listeden bir eleman, ikinci listeden aynı konumdaki eleman birlikte gelir. Ürün adını fiyatıyla eşleştirmenin en doğal yoludur.",
                "`zip` walks two (or more) lists in parallel: each turn pairs up the element at the same position from each list. It is the natural way to match a product name with its price.",
              ],
            }),
            order({
              id: "o1",
              prompt: [
                "Bir sözlükte ürün başına toplam ciroyu biriktiren kodu doğru sıraya diz.",
                "Order the code that accumulates revenue per product into a dictionary.",
              ],
              lines: [
                "ciro = {}",
                "for satir in satislar:",
                "    urun = satir['urun']",
                "    tutar = satir['adet'] * satir['fiyat']",
                "    ciro[urun] = ciro.get(urun, 0) + tutar",
                "print(ciro)",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "`satislar` listesindeki her satır için `adet * fiyat` hesapla ve ürün bazında toplamı `ciro` sözlüğüne biriktir.\n\nBeklenen: `{'kulaklık': 5697.0, 'mat': 1098.0}`",
                "For each row in `satislar` compute `adet * fiyat` and accumulate the total per product into the `ciro` dict.\n\nExpected: `{'kulaklık': 5697.0, 'mat': 1098.0}`",
              ],
              starter: `satislar = [
    {"urun": "kulaklık", "adet": 2, "fiyat": 1899.0},
    {"urun": "mat", "adet": 2, "fiyat": 549.0},
    {"urun": "kulaklık", "adet": 1, "fiyat": 1899.0},
]

ciro = {}
# döngüyü buraya yaz
`,
              solution: `satislar = [
    {"urun": "kulaklık", "adet": 2, "fiyat": 1899.0},
    {"urun": "mat", "adet": 2, "fiyat": 549.0},
    {"urun": "kulaklık", "adet": 1, "fiyat": 1899.0},
]

ciro = {}
for satir in satislar:
    urun = satir["urun"]
    tutar = satir["adet"] * satir["fiyat"]
    ciro[urun] = ciro.get(urun, 0) + tutar

print(ciro)`,
              hint: [
                "`ciro.get(urun, 0)` anahtar yoksa 0 döner; böylece ilk seferi ayrıca kontrol etmen gerekmez.",
                "`ciro.get(urun, 0)` returns 0 when the key is missing, so you do not need a special case for the first hit.",
              ],
              checks: [
                {
                  code: "ciro == {'kulaklık': 5697.0, 'mat': 1098.0}",
                  msg: [
                    "ciro sözlüğü ürün başına doğru toplamı içermeli",
                    "ciro must hold the correct total per product",
                  ],
                },
              ],
              xp: 35,
            }),
          ],
        }),

        lesson({
          slug: "fonksiyonlar",
          title: L("Fonksiyonlar: kendini tekrar etme", "Functions: stop repeating yourself"),
          summary: L(
            "Tekrarlayan temizlik adımlarını yeniden kullanılabilir parçalara dönüştür.",
            "Turn repeated cleaning steps into reusable pieces.",
          ),
          minutes: 13,
          blocks: [
            text(
              "Bir işi ikinci kez kopyalıyorsan fonksiyona çevirme vaktidir. Fonksiyon; girdi alır, iş yapar, `return` ile sonuç döndürür.",
              "The second time you copy a block of code, it is time for a function. A function takes input, does work and hands a result back with `return`.",
            ),
            code(
              "python",
              `def kdv_ekle(tutar, oran=0.20):
    """Tutara KDV ekler. Oran varsayılan olarak %20."""
    return round(tutar * (1 + oran), 2)

print(kdv_ekle(1000))        # 1200.0
print(kdv_ekle(1000, 0.10))  # 1100.0
print(kdv_ekle(oran=0.01, tutar=1000))  # isimle çağırma`,
            ),
            quiz({
              id: "q2",
              q: [
                "`kdv_ekle(1000)` çağrısı neden `oran` argümanı vermeden çalışır?",
                "Why does `kdv_ekle(1000)` work without passing the `oran` argument?",
              ],
              options: [
                [
                  "`oran` parametresinin bir varsayılan değeri (`0.20`) var",
                  "The `oran` parameter has a default value (`0.20`)",
                ],
                ["Python eksik argümanları otomatik olarak 0 sayar", "Python treats missing arguments as 0 automatically"],
                ["`oran` aslında zorunlu değildir, hiçbir zaman kullanılmaz", "`oran` is not actually used at all"],
                ["Fonksiyon tanımı hatalıdır ama yine de çalışır", "The function definition is technically wrong but runs anyway"],
              ],
              answer: 0,
              explain: [
                "`def kdv_ekle(tutar, oran=0.20):` yazımında `oran=0.20` bir **varsayılan değerdir**. Çağıran kişi bu argümanı vermezse Python otomatik olarak `0.20` kullanır.",
                "In `def kdv_ekle(tutar, oran=0.20):`, `oran=0.20` is a **default value**. If the caller does not supply it, Python automatically uses `0.20`.",
              ],
            }),
            quiz({
              id: "q3",
              q: ["`kdv_ekle(1000, 0.10)` ne döner?", "What does `kdv_ekle(1000, 0.10)` return?"],
              options: [
                ["1100.0", "1100.0"],
                ["1200.0", "1200.0"],
                ["1000.0", "1000.0"],
                ["0.10", "0.10"],
              ],
              answer: 0,
              explain: [
                "İkinci konumsal argüman `oran`'ı `0.10` yapar; `1000 * (1 + 0.10) = 1100.0`. Konumsal çağrıda argümanlar sırayla parametrelere eşlenir.",
                "The second positional argument sets `oran` to `0.10`; `1000 * (1 + 0.10) = 1100.0`. In a positional call, arguments map to parameters in order.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`kdv_ekle(oran=0.01, tutar=1000)` çağrısında argüman sırası neden önemli değil?",
                "In the call `kdv_ekle(oran=0.01, tutar=1000)`, why doesn't argument order matter?",
              ],
              options: [
                [
                  "İsimle çağrıldıkları (keyword argument) için Python isme göre eşler",
                  "Because they are passed by name (keyword arguments), Python matches by name",
                ],
                ["Python sıradan bağımsız her zaman tahmin eder", "Python always guesses regardless of order"],
                ["Bu çağrı aslında hata verir", "This call actually raises an error"],
                ["`kdv_ekle` sırasız argümanlar için özel tanımlanmış", "`kdv_ekle` was specially written to ignore order"],
              ],
              answer: 0,
              explain: [
                "İsimle (`argüman=değer`) çağrıldığında Python değeri konuma göre değil **isme** göre eşler; bu yüzden sıra fark etmez. Uzun parametre listelerinde okunabilirliği artıran yaygın bir kalıptır.",
                "When you pass `argument=value`, Python matches by **name**, not position, so order stops mattering. It is a common pattern that improves readability with long parameter lists.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Fonksiyon gövdesindeki üç tırnaklı `\"\"\"Tutara KDV ekler...\"\"\"` satırının amacı nedir?",
                "What is the purpose of the triple-quoted `\"\"\"Adds VAT to an amount...\"\"\"` line in the function body?",
              ],
              options: [
                [
                  "Docstring — fonksiyonun ne yaptığını açıklayan belge metni",
                  "A docstring — documentation text describing what the function does",
                ],
                ["Yorum satırı, `#` ile aynı işi görür ama zorunludur", "A comment, functionally identical to `#` but mandatory"],
                ["Fonksiyonun geri döneceği metin", "The text the function will return"],
                ["Hata mesajı şablonu", "An error message template"],
              ],
              answer: 0,
              explain: [
                "Üç tırnakla yazılan ilk satır bir **docstring**'dir; `help(kdv_ekle)` gibi araçlar bunu okur ve fonksiyonun ne işe yaradığını gösterir. `return`'le hiçbir ilgisi yoktur.",
                "The first triple-quoted line in a function is a **docstring**; tools like `help(kdv_ekle)` read it to show what the function does. It has nothing to do with `return`.",
              ],
            }),
            pitfall(
              "Değiştirilebilir varsayılan argüman",
              "Mutable default arguments",
              "`def ekle(x, liste=[])` yazma. Varsayılan liste fonksiyon **bir kez** oluşturulur ve çağrılar arasında paylaşılır; ikinci çağrıda içi dolu gelir. Doğrusu: `def ekle(x, liste=None):` ve gövdede `if liste is None: liste = []`.",
              "Never write `def add(x, items=[])`. The default list is created **once** and shared across calls, so the second call starts with leftovers. Write `def add(x, items=None):` and inside `if items is None: items = []`.",
            ),
            quiz({
              id: "q6",
              q: [
                "`def ekle(x, liste=[])` neden tehlikelidir?",
                "Why is `def ekle(x, liste=[])` dangerous?",
              ],
              options: [
                [
                  "Varsayılan liste bir kez oluşturulur ve tüm çağrılar arasında paylaşılır",
                  "The default list is created once and shared across every call",
                ],
                ["Python bu satırı çalıştırmaz", "Python refuses to run this line"],
                ["`liste` her çağrıda otomatik olarak boşalır", "`liste` automatically empties on every call"],
                ["Yalnızca büyük listelerde sorun çıkarır", "It only causes problems with large lists"],
              ],
              answer: 0,
              explain: [
                "Varsayılan değerler fonksiyon **tanımlandığında bir kez** hesaplanır, her çağrıda yeniden değil. Değiştirilebilir (mutable) bir liste olduğunda, bir çağrıda yapılan değişiklik sonraki çağrıda da görünür — sinsi bir hata.",
                "Default values are evaluated **once, at definition time**, not on every call. Since a list is mutable, a change made in one call is still visible in the next — a sneaky bug.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Değiştirilebilir varsayılan argüman hatasının doğru çözümü nedir?",
                "What is the correct fix for the mutable default argument bug?",
              ],
              options: [
                [
                  "`liste=None` varsayılanı kullanmak ve gövdede `if liste is None: liste = []` yazmak",
                  "Default to `liste=None` and inside the body write `if liste is None: liste = []`",
                ],
                ["Varsayılan değeri hiç kullanmamak", "Never use a default value at all"],
                ["Listeyi global değişken yapmak", "Make the list a global variable"],
                ["Fonksiyonu her çağrıdan önce yeniden tanımlamak", "Redefine the function before every call"],
              ],
              answer: 0,
              explain: [
                "`None` değiştirilemez (immutable) olduğu için varsayılan olarak paylaşılması zararsızdır; gerçek boş liste her çağrıda **gövde içinde**, taze olarak oluşturulur.",
                "Since `None` is immutable, sharing it as the default is harmless; the actual empty list is created fresh **inside the body** on every call.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Bir fonksiyonda `return` yazılmazsa ne döner?",
                "What does a function return if you omit `return`?",
              ],
              options: [
                ["None", "None"],
                ["0", "0"],
                ["Son satırın değeri", "The value of the last line"],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "Python `return`'süz fonksiyonlarda sessizce `None` döndürür. `sonuc = df.sort_values('x')` yerine `sonuc = liste.sort()` yazıp `None` almak, yeni başlayanların klasik hatasıdır — `sort()` yerinde sıralar ve `None` döner.",
                "Python silently returns `None`. Writing `result = items.sort()` and getting `None` is the classic beginner bug — `sort()` sorts in place and returns nothing.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`def kdv_ekle(tutar, oran=0.20): ...` şeklinde tanımlıyken `kdv_ekle()` (hiç argümansız) çağrılırsa ne olur?",
                "With `def kdv_ekle(tutar, oran=0.20): ...`, what happens if you call `kdv_ekle()` with no arguments at all?",
              ],
              options: [
                [
                  "TypeError — `tutar` zorunlu bir parametre, varsayılanı yok",
                  "TypeError — `tutar` is a required parameter with no default",
                ],
                ["`tutar` otomatik olarak 0 kabul edilir", "`tutar` is automatically treated as 0"],
                ["`oran`'ın varsayılanı `tutar` için de kullanılır", "The default for `oran` gets used for `tutar` too"],
                ["Sessizce `None` döner", "It silently returns `None`"],
              ],
              answer: 0,
              explain: [
                "Yalnızca varsayılanı olan parametreler isteğe bağlıdır. `tutar`'ın varsayılanı yok, bu yüzden verilmemesi `TypeError: missing 1 required positional argument` hatası verir.",
                "Only parameters with a default are optional. `tutar` has none, so omitting it raises `TypeError: missing 1 required positional argument`.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`kdv_ekle` fonksiyonunda `oran` parametresine neden bir varsayılan değer (`0.20`) verilmiş?",
                "Why does the `oran` parameter in `kdv_ekle` have a default value (`0.20`)?",
              ],
              options: [
                [
                  "Çoğu çağrıda oran aynıdır; çağıran kişi her seferinde tekrar yazmasın diye",
                  "The rate is usually the same, so the caller does not have to repeat it every time",
                ],
                ["Python'da varsayılan değer vermek zorunludur", "Python requires every parameter to have a default"],
                ["Varsayılan değersiz fonksiyonlar hata verir", "Functions without a default value fail to run"],
                ["`tutar` parametresi için de aynısı zorunludur", "The `tutar` parameter must also have one"],
              ],
              answer: 0,
              explain: [
                "En yaygın kullanım örneği için makul bir varsayılan tanımlamak, çağıran kişinin işini kolaylaştırır: `kdv_ekle(1000)` yeterlidir, farklı bir oran gerektiğinde `kdv_ekle(1000, 0.10)` yazılabilir.",
                "Defining a sensible default for the most common case makes life easier for callers: `kdv_ekle(1000)` is enough, and `kdv_ekle(1000, 0.10)` still works when a different rate is needed.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Türkçe biçimli fiyat metnini (`\"1.899,50\"`) float'a çeviren `fiyat_cevir` fonksiyonunu yaz.\n\n`fiyat_cevir(\"1.899,50\")` → `1899.5`",
                "Write `fiyat_cevir`, which converts a European-formatted price string (`\"1.899,50\"`) to a float.\n\n`fiyat_cevir(\"1.899,50\")` → `1899.5`",
              ],
              starter: `def fiyat_cevir(metin):
    # binlik ayıracı (.) sil, ondalık virgülü noktaya çevir
    return

print(fiyat_cevir("1.899,50"))`,
              solution: `def fiyat_cevir(metin):
    return float(metin.replace(".", "").replace(",", "."))

print(fiyat_cevir("1.899,50"))`,
              hint: [
                "Önce `.replace(\".\", \"\")`, sonra `.replace(\",\", \".\")`, en sonda `float(...)`.",
                "First `.replace(\".\", \"\")`, then `.replace(\",\", \".\")`, then `float(...)`.",
              ],
              checks: [
                {
                  code: "abs(fiyat_cevir('1.899,50') - 1899.5) < 1e-9",
                  msg: ["\"1.899,50\" → 1899.5 olmalı", "\"1.899,50\" must become 1899.5"],
                },
                {
                  code: "abs(fiyat_cevir('12.345,00') - 12345.0) < 1e-9",
                  msg: ["\"12.345,00\" → 12345.0 olmalı", "\"12.345,00\" must become 12345.0"],
                },
                {
                  code: "abs(fiyat_cevir('99,90') - 99.9) < 1e-9",
                  msg: [
                    "Binlik ayıracı olmayan \"99,90\" da çalışmalı",
                    "\"99,90\" without a thousands separator must work too",
                  ],
                },
              ],
              xp: 35,
            }),
          ],
        }),
        lesson({
          slug: "hatalar-ve-moduller",
          title: L("Hata yönetimi ve modüller", "Error handling and modules"),
          summary: L(
            "Beklenen hatayı yakala, programı ayakta tut ve başkalarının yazdığı kodu kullan.",
            "Catch the errors you expect, keep the program alive, and use code other people wrote.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Gerçek veride her zaman bozuk satır vardır: sayı olması gereken yerde `\"bilinmiyor\"`, tarih olması gereken yerde boşluk. Program ilk bozuk satırda durursa 100.000 satırlık dosyayı hiç işleyemezsin.\n\n`try` / `except` bloğu, riskli kodu koruma altına alır:\n\n```python\ntry:\n    deger = float(ham)\nexcept ValueError:\n    deger = None      # bozuksa boş geç, programı durdurma\n```\n\nMantık şudur: `try` içindeki kod hata verirse Python `except` bloğuna atlar ve devam eder.",
              "Real data always contains broken rows: `\"unknown\"` where a number should be, a blank where a date should be. If the program halts on the first broken row you will never process a 100,000-row file.\n\nA `try` / `except` block puts risky code under protection:\n\n```python\ntry:\n    value = float(raw)\nexcept ValueError:\n    value = None      # if broken, leave it empty rather than stopping\n```\n\nThe logic: if the code in `try` raises, Python jumps to `except` and carries on.",
            ),
            quiz({
              id: "q2",
              q: [
                "`try` bloğu içindeki kod hiç hata vermezse `except` bloğu ne olur?",
                "If the code inside `try` never raises, what happens to the `except` block?",
              ],
              options: [
                ["Hiç çalışmaz, atlanır", "It never runs — it is skipped"],
                ["Yine de çalışır", "It runs anyway"],
                ["Program hata verir", "The program raises an error"],
                ["`try` bloğu iki kez çalışır", "The `try` block runs twice"],
              ],
              answer: 0,
              explain: [
                "`except`, yalnızca `try` içinde bir hata **oluşursa** devreye girer. Her şey yolunda giderse Python `except` bloğunu tamamen atlar ve devamındaki kodla akışa devam eder.",
                "`except` only kicks in if an error actually **occurs** inside `try`. If everything goes fine, Python skips the `except` block entirely and continues with the code after it.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`ham = \"bilinmiyor\"` iken `float(ham)` hangi hatayı fırlatır?",
                "With `ham = \"bilinmiyor\"`, which error does `float(ham)` raise?",
              ],
              options: [
                ["ValueError", "ValueError"],
                ["TypeError", "TypeError"],
                ["NameError", "NameError"],
                ["Hata vermez, `None` döner", "It does not error — it returns `None`"],
              ],
              answer: 0,
              explain: [
                "`\"bilinmiyor\"` bir sayıya çevrilemez; tip doğrudur (metin) ama değer uygun değildir — bu yüzden `except ValueError:` ile yakalanması gereken hata tam olarak budur.",
                "`\"bilinmiyor\"` cannot be parsed as a number; the type is fine (a string) but the value is unsuitable — which is exactly why it must be caught with `except ValueError:`.",
              ],
            }),
            pitfall(
              "Çıplak `except` yazma",
              "Never write a bare `except`",
              "`except:` veya `except Exception:` yazmak, **her** hatayı yutar — yazım hatanı, bellek hatasını, hatta kullanıcının programı durdurma isteğini bile. Sonuç: program sessizce yanlış çalışır ve nedenini asla bulamazsın.\n\nDaima beklediğin hatayı adıyla yakala: `except ValueError:`, `except KeyError:`, `except FileNotFoundError:`. Beklemediğin hata zaten patlamalı ki haberin olsun.",
              "Writing `except:` or `except Exception:` swallows **every** error — your typos, memory errors, even the user's request to stop the program. The result: the program quietly misbehaves and you never find out why.\n\nAlways catch the error you expect, by name: `except ValueError:`, `except KeyError:`, `except FileNotFoundError:`. An error you did not anticipate should blow up, so that you learn about it.",
            ),
            quiz({
              id: "q4",
              q: [
                "`except:` yazıp hiçbir hata tipi belirtmemenin riski nedir?",
                "What is the risk of writing a bare `except:` with no error type?",
              ],
              options: [
                [
                  "Beklemediğin hataları da (yazım hatası dahil) sessizce yutar",
                  "It silently swallows errors you did not expect too, including typos",
                ],
                ["Programı daha yavaş çalıştırır", "It makes the program run slower"],
                ["Sadece `ValueError`'ları yakalar", "It only catches `ValueError`"],
                ["Python bunu zaten yasaklar", "Python forbids this outright"],
              ],
              answer: 0,
              explain: [
                "`except:` her hatayı yutar; bir değişken adını yanlış yazsan bile program çökmek yerine sessizce yanlış çalışmaya devam eder. Bu, hatayı bulmayı çok daha zorlaştırır.",
                "`except:` swallows every error; even a misspelled variable name lets the program keep running silently instead of crashing. That makes the real bug far harder to find.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Doğru yaklaşım hangisidir?",
                "Which is the correct approach?",
              ],
              options: [
                [
                  "Beklediğin hatayı adıyla yakalamak: `except ValueError:`",
                  "Catch the error you expect, by name: `except ValueError:`",
                ],
                ["Her zaman `except:` yazmak, daha güvenlidir", "Always write bare `except:`, it is safer"],
                ["`try` bloğunu hiç kullanmamak", "Never use a `try` block at all"],
                ["Tüm hataları `print` ile yazdırıp yoksaymak", "Print every error and ignore it"],
              ],
              answer: 0,
              explain: [
                "Hatayı adıyla yakalamak, yalnızca **beklediğin** sorunu sessizce yönetmeni sağlar; beklemediğin bir hata yine patlar ve haberin olur. Bu, programın öngörülebilir kalmasının anahtarıdır.",
                "Catching an error by name lets you silently handle only the problem you **expect**; anything unanticipated still blows up and you find out. This is the key to keeping a program predictable.",
              ],
            }),
            text(
              "**Modüller**, başkalarının yazdığı hazır kodu programına getirir. Python'un standart kütüphanesi kurulum gerektirmez:\n\n```python\nimport math\nimport statistics as ist          # takma ad ver\nfrom datetime import date         # sadece bir parçasını al\n\nprint(math.sqrt(16))              # 4.0\nprint(ist.median([3, 1, 4, 1, 5]))  # 3\nprint(date.today().year)\n```\n\nÜç yazım da yaygındır. `import x` her şeyi getirir; `from x import y` yalnızca ihtiyacın olanı; `as` uzun isimleri kısaltır — `import pandas as pd` bunun en bilinen örneğidir.",
              "**Modules** bring code written by other people into your program. Python's standard library needs no installation:\n\n```python\nimport math\nimport statistics as st           # give it an alias\nfrom datetime import date         # take only one piece\n\nprint(math.sqrt(16))              # 4.0\nprint(st.median([3, 1, 4, 1, 5])) # 3\nprint(date.today().year)\n```\n\nAll three forms are common. `import x` brings everything; `from x import y` only what you need; `as` shortens long names — `import pandas as pd` being the most famous example.",
            ),
            quiz({
              id: "q6",
              q: ["`math.sqrt(16)` ne döner?", "What does `math.sqrt(16)` return?"],
              options: [
                ["4.0", "4.0"],
                ["16", "16"],
                ["8.0", "8.0"],
                ["Hata verir çünkü `math` kurulum gerektirir", "It errors because `math` needs installing"],
              ],
              answer: 0,
              explain: [
                "`math.sqrt`, karekök alır; `math` standart kütüphanenin bir parçası olduğu için kurulum gerektirmez, sadece `import math` yeterlidir.",
                "`math.sqrt` computes a square root; `math` is part of the standard library, so no installation is needed — just `import math`.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`ist.median([3, 1, 4, 1, 5])` (burada `ist`, `statistics` modülünün takma adıdır) ne döner?",
                "What does `ist.median([3, 1, 4, 1, 5])` return (`ist` being the alias for the `statistics` module)?",
              ],
              options: [
                ["3", "3"],
                ["1", "1"],
                ["2.8", "2.8"],
                ["5", "5"],
              ],
              answer: 0,
              explain: [
                "Medyan, sıralı verinin ortanca değeridir: `[1, 1, 3, 4, 5]` sıralandığında ortadaki değer `3`'tür. Ortalamadan farklı olarak aykırı değerlere karşı dayanıklıdır.",
                "The median is the middle value of sorted data: sorting `[1, 1, 3, 4, 5]` gives a middle value of `3`. Unlike the mean, it is robust to outliers.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`import statistics as ist` satırındaki `as ist` ne işe yarar?",
                "What does the `as ist` part of `import statistics as ist` do?",
              ],
              options: [
                [
                  "Modüle kısa bir takma ad verir; kodda `ist.median(...)` yazılır",
                  "Gives the module a short alias; you then write `ist.median(...)` in code",
                ],
                ["Modülün yalnızca bir parçasını içe aktarır", "Imports only part of the module"],
                ["Modülü yeniden adlandırıp diske kaydeder", "Renames the module and saves it to disk"],
                ["Python sürümünü değiştirir", "Changes the Python version"],
              ],
              answer: 0,
              explain: [
                "`as`, uzun modül isimlerini kısaltmak için kullanılır; `import pandas as pd` en tanıdık örnektir. `ist.median(...)` yazmak `statistics.median(...)` yazmaktan daha kısadır ve aynı şeyi yapar.",
                "`as` shortens long module names; `import pandas as pd` is the most familiar example. Writing `ist.median(...)` is shorter than `statistics.median(...)` and does exactly the same thing.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`from datetime import date` yazıp `date.today().year` çağırmanın amacı nedir?",
                "What is the point of `from datetime import date` followed by `date.today().year`?",
              ],
              options: [
                [
                  "İçinde bulunulan yılı, sabit bir sayı yazmadan koddan almak",
                  "To get the current year from code, without hard-coding a number",
                ],
                ["Bir dosyanın oluşturulma tarihini bulmak", "To find a file's creation date"],
                ["Yalnızca ayı döndürür, yılı değil", "It returns only the month, not the year"],
                ["`datetime` modülünün tamamını içe aktarır", "It imports the whole `datetime` module"],
              ],
              answer: 0,
              explain: [
                "`from x import y` yalnızca ihtiyaç duyduğun parçayı (`date`) getirir. `date.today()` bugünün tarihini verir, `.year` ise ondan yıl bilgisini çeker — raporlarda \"2024\" gibi sabit değerler yazmak yerine bu her zaman güncel kalır.",
                "`from x import y` brings in only the piece you need (`date`). `date.today()` gives today's date, and `.year` pulls the year out of it — this stays current instead of hard-coding a value like \"2024\" in a report.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Bozuk satırları atlayarak bir listeyi sayıya çevirmek istiyorsun. Hangi yaklaşım doğrudur?",
                "You want to convert a list to numbers, skipping broken rows. Which approach is right?",
              ],
              options: [
                [
                  "`try` içine dönüşümü koy, `except ValueError` ile o satırı atla",
                  "Put the conversion in `try` and skip that row with `except ValueError`",
                ],
                [
                  "`except:` yazıp tüm hataları yut",
                  "Write a bare `except:` and swallow every error",
                ],
                ["Hata veren satırları önceden silmek imkânsızdır", "It is impossible to remove broken rows beforehand"],
                ["Dönüşümü hiç yapmamak", "Simply not converting at all"],
              ],
              answer: 0,
              explain: [
                "Beklenen hata `ValueError`'dır çünkü `float(\"abc\")` bunu fırlatır. Yalnızca onu yakalarsan, farklı bir sorun (örneğin listenin hiç var olmaması) yine seni uyarır.",
                "The expected error is `ValueError`, because that is what `float(\"abc\")` raises. By catching only that, a different problem — such as the list not existing at all — still alerts you.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "`ham` listesindeki değerleri sayıya çevir. Çevrilemeyenleri **atla**. Sonucu `temiz` listesine, atlanan sayısını `bozuk` değişkenine yaz.",
                "Convert the values in `ham` to numbers, **skipping** those that cannot be converted. Put the result in `temiz` and the number skipped in `bozuk`.",
              ],
              starter: `ham = ["1899", "2450,5", "bilinmiyor", "4290", "", "549"]

temiz = []
bozuk = 0

for deger in ham:
    # virgülü noktaya çevirip float'a dönüştürmeyi dene
    pass

print(temiz, bozuk)`,
              solution: `ham = ["1899", "2450,5", "bilinmiyor", "4290", "", "549"]

temiz = []
bozuk = 0

for deger in ham:
    try:
        temiz.append(float(deger.replace(",", ".")))
    except ValueError:
        bozuk += 1

print(temiz, bozuk)`,
              hint: [
                "`deger.replace(\",\", \".\")` ondalık ayıracını düzeltir. `float()` başarısız olursa `ValueError` fırlatır.",
                "`deger.replace(\",\", \".\")` fixes the decimal separator. `float()` raises `ValueError` when it fails.",
              ],
              checks: [
                {
                  code: "temiz == [1899.0, 2450.5, 4290.0, 549.0]",
                  msg: [
                    "`temiz` dört geçerli sayıyı içermeli",
                    "`temiz` must contain the four valid numbers",
                  ],
                },
                {
                  code: "bozuk == 2",
                  msg: [
                    "İki değer çevrilemez: \"bilinmiyor\" ve boş metin",
                    "Two values cannot be converted: \"bilinmiyor\" and the empty string",
                  ],
                },
              ],
              xp: 40,
            }),
          ],
        }),
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "mid",
      title: L("pandas ile veri analizi", "Data analysis with pandas"),
      description: L(
        "Gerçek analiz işinin %80'i burada geçer: okuma, temizleme, filtreleme, gruplama.",
        "80% of real analysis happens here: reading, cleaning, filtering and grouping.",
      ),
      projectSlug: "python-satis-analizi",
      lessons: [
        lesson({
          slug: "pandas-giris",
          title: L("pandas'a giriş: Series ve DataFrame", "Intro to pandas: Series and DataFrame"),
          summary: L(
            "Excel'deki sayfayı koda çevir; ama milyon satırla ve tekrarlanabilir şekilde.",
            "Turn a spreadsheet into code — with millions of rows and full reproducibility.",
          ),
          minutes: 16,
          blocks: [
            text(
              "`Series` tek bir sütundur (etiketli dizi), `DataFrame` ise sütunlardan oluşan tablodur. pandas'ın gücü, tüm sütuna tek seferde işlem yapabilmenden gelir — döngü yazmadan.",
              "A `Series` is a single labelled column; a `DataFrame` is a table of them. pandas' power comes from operating on a whole column at once — without writing a loop.",
            ),
            code(
              "python",
              `import pandas as pd

df = pd.DataFrame({
    "urun": ["Kulaklık", "Klavye", "Saat", "Mat"],
    "kategori": ["Elektronik", "Elektronik", "Elektronik", "Spor"],
    "fiyat": [1899.0, 2450.0, 4290.0, 549.0],
    "adet": [3, 1, 2, 5],
})

print(df.head())        # ilk 5 satır
print(df.shape)         # (satır, sütun)
print(df.dtypes)        # sütun tipleri
print(df.describe())    # sayısal özet
print(df.info())        # bellek ve NULL durumu`,
            ),
            quiz({
              id: "q2",
              q: [
                "`Series` ile `DataFrame` arasındaki temel fark nedir?",
                "What is the key difference between a `Series` and a `DataFrame`?",
              ],
              options: [
                [
                  "`Series` tek bir sütundur, `DataFrame` sütunlardan oluşan bir tablodur",
                  "A `Series` is a single column, a `DataFrame` is a table made of columns",
                ],
                ["İkisi de tamamen aynı şeydir", "They are exactly the same thing"],
                ["`Series` yalnızca sayı, `DataFrame` yalnızca metin tutar", "A `Series` holds only numbers, a `DataFrame` only text"],
                ["`DataFrame` her zaman `Series`'ten daha küçüktür", "A `DataFrame` is always smaller than a `Series`"],
              ],
              answer: 0,
              explain: [
                "Bir `DataFrame`'in her sütunu aslında bir `Series`'tir. `df[\"fiyat\"]` yazdığında elde ettiğin şey bir `Series`; `df` ise bunlardan birden çoğunun yan yana durduğu tablodur.",
                "Every column of a `DataFrame` is in fact a `Series`. When you write `df[\"fiyat\"]` you get a `Series`; the `df` itself is the table made of several of them side by side.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`df.shape` ne döndürür?",
                "What does `df.shape` return?",
              ],
              options: [
                ["(satır sayısı, sütun sayısı) şeklinde bir tuple", "A tuple of (number of rows, number of columns)"],
                ["Sütun isimlerinin listesi", "A list of column names"],
                ["Sadece satır sayısı", "Only the row count"],
                ["Tablonun bellekte kapladığı yer", "The table's memory footprint"],
              ],
              answer: 0,
              explain: [
                "`df.shape`, `(satır, sütun)` biçiminde bir tuple döner — 4 sütunlu, 4 satırlı örnek tabloda `(4, 4)` çıkar. Bir DataFrame'in boyutunu hızlıca kontrol etmenin en kısa yoludur.",
                "`df.shape` returns a tuple shaped `(rows, columns)` — for the 4-column, 4-row example table it is `(4, 4)`. It is the fastest way to check a DataFrame's size.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`df.head()` varsayılan olarak kaç satır gösterir?",
                "How many rows does `df.head()` show by default?",
              ],
              options: [
                ["5", "5"],
                ["1", "1"],
                ["10", "10"],
                ["Tüm satırları", "All rows"],
              ],
              answer: 0,
              explain: [
                "`head()` argümansız çağrıldığında varsayılan olarak ilk **5** satırı gösterir. Farklı bir sayı istersen `df.head(10)` gibi parantez içine yazarsın.",
                "Called without an argument, `head()` shows the first **5** rows by default. For a different count you pass it explicitly, like `df.head(10)`.",
              ],
            }),
            tryPy(
              `# Gerçek pandas, tarayıcında. Sütun ekle, filtrele, grupla — sonra çalıştır.
import pandas as pd

df = pd.DataFrame({
    "urun": ["Kulaklık", "Klavye", "Saat", "Mat"],
    "kategori": ["Elektronik", "Elektronik", "Elektronik", "Spor"],
    "fiyat": [1899.0, 2450.0, 4290.0, 549.0],
    "adet": [3, 1, 2, 5],
})

df["tutar"] = df["fiyat"] * df["adet"]
print(df, "\\n")
print(df.groupby("kategori")["tutar"].sum())`,
            ),
            text(
              "Gerçek veriyi genelde dosyadan okursun. Okumanın kendisi tek satırdır; asıl iş **doğru okumaktır**.",
              "In practice you read from a file. Reading is one line; the real work is **reading it correctly**.",
            ),
            code(
              "python",
              `df = pd.read_csv(
    "satislar.csv",
    sep=";",              # Türkçe Excel'den gelen dosyalarda sık
    decimal=",",          # ondalık ayırıcı
    encoding="utf-8-sig", # Excel'in BOM'u için
    parse_dates=["tarih"],
)

df = pd.read_excel("rapor.xlsx", sheet_name="Ocak")`,
              "Okuma parametreleri, sonraki tüm temizlik işinin yarısını baştan çözer",
              "Read parameters solve half of your cleaning work up front",
            ),
            quiz({
              id: "q5",
              q: [
                "`pd.read_csv(..., sep=\";\")` satırındaki `sep` parametresi ne belirtir?",
                "In `pd.read_csv(..., sep=\";\")`, what does the `sep` parameter specify?",
              ],
              options: [
                ["Sütunları ayıran karakteri", "The character that separates columns"],
                ["Ondalık ayıracı", "The decimal separator"],
                ["Dosyanın kodlamasını", "The file's encoding"],
                ["Kaç satır okunacağını", "How many rows to read"],
              ],
              answer: 0,
              explain: [
                "`sep`, dosyadaki sütun ayıracını söyler. Türkçe Excel çıktıları genelde noktalı virgül kullanır (çünkü virgül zaten ondalık ayıracıdır) — bu yüzden `sep=\";\"` çok sık görülür.",
                "`sep` tells pandas which character separates columns in the file. Turkish Excel exports commonly use a semicolon (because the comma is already the decimal separator) — hence `sep=\";\"` shows up constantly.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`parse_dates=[\"tarih\"]` parametresi ne işe yarar?",
                "What does the `parse_dates=[\"tarih\"]` parameter do?",
              ],
              options: [
                [
                  "`tarih` sütununu metin yerine tarih tipinde okur",
                  "Reads the `tarih` column as a date type instead of text",
                ],
                ["Sütunu tamamen siler", "It deletes the column entirely"],
                ["Yalnızca tarihi olan satırları tutar", "It keeps only rows that have a date"],
                ["Tarihi bugünün tarihiyle değiştirir", "It replaces the date with today's date"],
              ],
              answer: 0,
              explain: [
                "Bu parametre olmadan tarihler düz metin olarak okunur ve üzerlerinde tarih işlemi (ay/yıl çıkarma, sıralama) yapamazsın. `parse_dates` okuma anında doğru tipe çevirir.",
                "Without this parameter, dates load as plain text and you cannot do date arithmetic on them (extracting month/year, sorting). `parse_dates` converts them to the right type at load time.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`encoding=\"utf-8-sig\"` parametresi hangi sorunu çözer?",
                "Which problem does the `encoding=\"utf-8-sig\"` parameter solve?",
              ],
              options: [
                [
                  "Excel'in dosya başına eklediği görünmez BOM karakterinden kaynaklanan bozulmaları",
                  "Corruption caused by the invisible BOM character Excel adds at the start of the file",
                ],
                ["Sütunları otomatik olarak yeniden sıralar", "It automatically reorders the columns"],
                ["Sayıları otomatik olarak Türkçe biçime çevirir", "It automatically formats numbers into Turkish style"],
                ["Dosyayı sıkıştırır", "It compresses the file"],
              ],
              answer: 0,
              explain: [
                "Excel'den kaydedilen CSV dosyaları genellikle başında görünmeyen bir BOM işareti taşır; sıradan `utf-8` bunu ilk sütun adına karıştırabilir. `utf-8-sig` bu işareti tanıyıp doğru şekilde atlar.",
                "CSVs saved from Excel often carry an invisible BOM marker at the start; plain `utf-8` can leak it into the first column's name. `utf-8-sig` recognises and skips that marker correctly.",
              ],
            }),
            text(
              "Yeni sütun türetmek, tüm sütuna aynı anda uygulanır — bu **vektörel** çalışmadır ve döngüden kat kat hızlıdır.",
              "Deriving a new column applies to the entire column at once — this is **vectorised** work and it is far faster than a loop.",
            ),
            code(
              "python",
              `df["ciro"] = df["fiyat"] * df["adet"]
df["kdvli"] = (df["fiyat"] * 1.20).round(2)
print(df.sort_values("ciro", ascending=False))`,
            ),
            quiz({
              id: "q8",
              q: [
                "`df[\"ciro\"] = df[\"fiyat\"] * df[\"adet\"]` yazmanın döngü yazmaya göre avantajı nedir?",
                "What is the advantage of writing `df[\"ciro\"] = df[\"fiyat\"] * df[\"adet\"]` over a loop?",
              ],
              options: [
                [
                  "Vektörel çalışır: tüm sütun tek seferde, döngü yazmadan işlenir — çok daha hızlıdır",
                  "It is vectorised: the whole column is processed at once without writing a loop — much faster",
                ],
                ["Sonuç farklı bir değer üretir", "It produces a different result"],
                ["Yalnızca ilk satırı hesaplar", "It only computes the first row"],
                ["Bellekte hiç yer kaplamaz", "It uses no memory at all"],
              ],
              answer: 0,
              explain: [
                "pandas'ın gücü tam olarak buradan gelir: tek satırlık bir işlem tüm sütuna aynı anda uygulanır. `for satir in df: ...` yazmak hem daha uzun hem de büyük tablolarda çok daha yavaştır.",
                "This is exactly where pandas' power comes from: a one-line operation applies to the whole column at once. Writing `for row in df: ...` is both longer and, on large tables, far slower.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`df.sort_values(\"ciro\", ascending=False)` ne yapar?",
                "What does `df.sort_values(\"ciro\", ascending=False)` do?",
              ],
              options: [
                [
                  "Tabloyu `ciro` sütununa göre büyükten küçüğe sıralar",
                  "Sorts the table by the `ciro` column from largest to smallest",
                ],
                ["Tabloyu `ciro` sütununa göre küçükten büyüğe sıralar", "Sorts the table by `ciro` from smallest to largest"],
                ["Yalnızca en yüksek `ciro` değerine sahip satırı tutar", "Keeps only the row with the highest `ciro`"],
                ["`ciro` sütununu tablodan siler", "Deletes the `ciro` column from the table"],
              ],
              answer: 0,
              explain: [
                "`ascending=False`, artan sırayı **kapatır**, yani azalan (büyükten küçüğe) sıralama yapar. Varsayılan `ascending=True` küçükten büyüğe sıralardı.",
                "`ascending=False` **turns off** ascending order, giving a descending (largest-to-smallest) sort. The default `ascending=True` would sort smallest to largest.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "`df.describe()` varsayılan olarak hangi sütunları özetler?",
                "Which columns does `df.describe()` summarise by default?",
              ],
              options: [
                ["Sadece sayısal sütunları", "Only the numeric columns"],
                ["Tüm sütunları", "All columns"],
                ["Sadece metin sütunlarını", "Only text columns"],
                ["İlk beş sütunu", "The first five columns"],
              ],
              answer: 0,
              explain: [
                "Varsayılanda sayısal sütunlar özetlenir. Metin ve kategorileri de görmek için `df.describe(include='all')` kullan — eksik değer ve benzersiz sayım gibi ipuçları oradan gelir.",
                "By default only numeric columns. Use `df.describe(include='all')` to include text and categorical columns — that is where hints about missing values and cardinality show up.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "`ciro` adında yeni bir sütun oluştur (`fiyat * adet`) ve **toplam ciroyu** `toplam_ciro` değişkenine ata.\n\nBeklenen toplam: `19472.0`",
                "Create a new column `ciro` (`fiyat * adet`) and store the **total revenue** in `toplam_ciro`.\n\nExpected total: `19472.0`",
              ],
              starter: `import pandas as pd

df = pd.DataFrame({
    "urun": ["Kulaklık", "Klavye", "Saat", "Mat"],
    "fiyat": [1899.0, 2450.0, 4290.0, 549.0],
    "adet": [3, 1, 2, 5],
})

# ciro sütununu oluştur

toplam_ciro = `,
              solution: `import pandas as pd

df = pd.DataFrame({
    "urun": ["Kulaklık", "Klavye", "Saat", "Mat"],
    "fiyat": [1899.0, 2450.0, 4290.0, 549.0],
    "adet": [3, 1, 2, 5],
})

df["ciro"] = df["fiyat"] * df["adet"]
toplam_ciro = df["ciro"].sum()
print(df)
print(toplam_ciro)`,
              hint: [
                "`df[\"ciro\"] = df[\"fiyat\"] * df[\"adet\"]` ardından `df[\"ciro\"].sum()`",
                "`df[\"ciro\"] = df[\"fiyat\"] * df[\"adet\"]` then `df[\"ciro\"].sum()`",
              ],
              checks: [
                {
                  code: "'ciro' in df.columns",
                  msg: ["df içinde ciro sütunu olmalı", "df must contain a ciro column"],
                },
                {
                  code: "abs(float(toplam_ciro) - 19472.0) < 1e-6",
                  msg: ["toplam_ciro 19472.0 olmalı", "toplam_ciro must equal 19472.0"],
                },
              ],
              xp: 35,
            }),
          ],
        }),

        lesson({
          slug: "secim-ve-filtreleme",
          title: L("Seçim ve filtreleme: loc, iloc, maskeler", "Selecting and filtering: loc, iloc, masks"),
          summary: L(
            "Doğru satırı ve sütunu seçmek, pandas'ta en çok zaman kaybedilen konudur. Bir kez netleştir.",
            "Picking the right rows and columns is where most pandas time is lost. Settle it once.",
          ),
          minutes: 16,
          blocks: [
            text(
              "İki temel seçici var:\n\n- `df.loc[satır_etiketi, sütun_adı]` — **etikete** göre\n- `df.iloc[satır_no, sütun_no]` — **konuma** göre (0'dan başlar)\n\nKoşullu seçim için **boolean maske** kullanılır: koşul her satır için True/False üretir, pandas sadece True olanları getirir.",
              "There are two selectors:\n\n- `df.loc[row_label, column_name]` — by **label**\n- `df.iloc[row_position, column_position]` — by **position** (0-based)\n\nFor conditional selection use a **boolean mask**: the condition produces True/False per row and pandas keeps the True ones.",
            ),
            quiz({
              id: "q2",
              q: [
                "`df.loc[...]` ile `df.iloc[...]` arasındaki temel fark nedir?",
                "What is the key difference between `df.loc[...]` and `df.iloc[...]`?",
              ],
              options: [
                [
                  "`loc` etikete göre, `iloc` konuma (0'dan başlayan sayıya) göre seçer",
                  "`loc` selects by label, `iloc` selects by position (a 0-based number)",
                ],
                ["İkisi de tamamen aynı çalışır", "They work identically"],
                ["`loc` yalnızca sütun, `iloc` yalnızca satır seçer", "`loc` selects only columns, `iloc` only rows"],
                ["`iloc` sadece sayısal verilerde çalışır", "`iloc` only works on numeric data"],
              ],
              answer: 0,
              explain: [
                "`loc` satır/sütun **isimlerini** kullanır (örn. `\"urun\"`); `iloc` konumu kullanır (örn. `0`, ilk satır). İkisi de `[satır, sütun]` biçiminde çağrılır.",
                "`loc` uses row/column **names** (e.g. `\"urun\"`); `iloc` uses position (e.g. `0`, the first row). Both are called as `[row, column]`.",
              ],
            }),
            code(
              "python",
              `# Tek koşul
pahali = df[df["fiyat"] > 2000]

# Çoklu koşul — her koşul parantez içinde, & ve | kullanılır
secim = df[(df["fiyat"] > 1000) & (df["kategori"] == "Elektronik")]

# Listeye göre
df[df["kategori"].isin(["Elektronik", "Spor"])]

# Metin araması
df[df["urun"].str.contains("Saat", case=False, na=False)]

# loc ile satır + sütun birlikte
df.loc[df["fiyat"] > 2000, ["urun", "fiyat"]]`,
            ),
            quiz({
              id: "q3",
              q: [
                "`df[df[\"kategori\"].isin([\"Elektronik\", \"Spor\"])]` ne yapar?",
                "What does `df[df[\"kategori\"].isin([\"Elektronik\", \"Spor\"])]` do?",
              ],
              options: [
                [
                  "`kategori` sütunu Elektronik veya Spor olan satırları getirir",
                  "Returns rows where `kategori` is Elektronik or Spor",
                ],
                ["`kategori` sütunu Elektronik VE Spor olan satırları getirir (aynı satırda ikisi birden)", "Returns rows where `kategori` equals both Elektronik and Spor at once"],
                ["Elektronik ve Spor kategorilerini siler", "Deletes the Elektronik and Spor categories"],
                ["Yalnızca listenin ilk elemanına eşit satırları getirir", "Returns only rows equal to the list's first element"],
              ],
              answer: 0,
              explain: [
                "`.isin([...])`, bir listedeki değerlerden **herhangi birine** eşit olan satırları seçer — art arda `|` ile birden çok `==` yazmanın kısayoludur.",
                "`.isin([...])` selects rows that match **any** value in the list — a shortcut for chaining several `==` checks together with `|`.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`df[\"urun\"].str.contains(\"Saat\", case=False, na=False)` ifadesindeki `case=False` ne işe yarar?",
                "In `df[\"urun\"].str.contains(\"Saat\", case=False, na=False)`, what does `case=False` do?",
              ],
              options: [
                ["Büyük/küçük harf duyarlılığını kapatır", "Turns off case sensitivity"],
                ["Yalnızca büyük harfli eşleşmeleri kabul eder", "Accepts only uppercase matches"],
                ["Metni tamamen küçük harfe çevirip kaydeder", "Permanently lowercases the text and saves it"],
                ["Sayısal sütunlarda arama yapar", "Searches numeric columns"],
              ],
              answer: 0,
              explain: [
                "`case=False` olmadan `\"saat\"` araması `\"Saat\"` ile eşleşmez, çünkü varsayılan arama büyük/küçük harf duyarlıdır. `case=False`, \"Saat\", \"saat\", \"SAAT\" hepsini yakalar.",
                "Without `case=False`, searching for `\"saat\"` would not match `\"Saat\"`, since the default search is case-sensitive. `case=False` catches \"Saat\", \"saat\" and \"SAAT\" alike.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Aynı ifadedeki `na=False` parametresi neden önemlidir?",
                "Why does the `na=False` parameter in the same expression matter?",
              ],
              options: [
                [
                  "`urun` sütununda eksik (NaN) değer varsa hata yerine False döner",
                  "If `urun` has missing (NaN) values, it returns False instead of raising an error",
                ],
                ["Sayısal sütunları metne çevirir", "It converts numeric columns to text"],
                ["Eksik değerleri otomatik doldurur", "It automatically fills missing values"],
                ["Hiçbir işe yaramaz, isteğe bağlıdır", "It does nothing, it is purely cosmetic"],
              ],
              answer: 0,
              explain: [
                "`str.contains`, eksik bir değerle karşılaşınca ne yapacağını bilemez ve varsayılan olarak hata verebilir. `na=False` diyerek \"eksikse eşleşmemiş say\" demiş olursun — filtreleme sırasında programın çökmesini önler.",
                "`str.contains` does not know what to do when it hits a missing value and can raise by default. Setting `na=False` says \"treat missing as no match\" — it keeps the filter from crashing.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`df.loc[df[\"fiyat\"] > 2000, [\"urun\", \"fiyat\"]]` ile ne elde edersin?",
                "What do you get from `df.loc[df[\"fiyat\"] > 2000, [\"urun\", \"fiyat\"]]`?",
              ],
              options: [
                [
                  "Fiyatı 2000'den büyük satırların yalnızca `urun` ve `fiyat` sütunlarını",
                  "Only the `urun` and `fiyat` columns for rows where price exceeds 2000",
                ],
                ["Tüm sütunları, tüm satırları", "All columns, all rows"],
                ["Yalnızca sütun isimlerinin listesini", "Just a list of the column names"],
                ["Hata verir çünkü `loc` iki argüman almaz", "It raises an error because `loc` cannot take two arguments"],
              ],
              answer: 0,
              explain: [
                "`loc`'un virgülden önceki kısmı satır **filtresini**, sonraki kısmı ise seçilecek **sütunları** belirler. Böylece filtreleme ve sütun seçimini tek satırda birleştirmiş olursun.",
                "The part before the comma in `loc` is the row **filter**, the part after picks the **columns**. This combines filtering and column selection in a single line.",
              ],
            }),
            pitfall(
              "and / or değil, & / |",
              "Use & / | , not and / or",
              "Python'un `and` operatörü tek bir doğruluk değeri bekler; pandas maskesi ise bir dizidir. `df[(a) & (b)]` yaz ve **her koşulu parantez içine al** — `&` operatörü `>` işaretinden önce çalıştığı için parantezsiz kod sessizce yanlış sonuç verir.",
              "Python's `and` expects a single truth value while a pandas mask is an array. Write `df[(a) & (b)]` and **wrap each condition in parentheses** — `&` binds tighter than `>`, so unparenthesised code fails or silently misbehaves.",
            ),
            quiz({
              id: "q7",
              q: [
                "İki pandas koşulunu `&` ile birleştirirken her koşulu neden parantez içine almalısın?",
                "When combining two pandas conditions with `&`, why must each condition be wrapped in parentheses?",
              ],
              options: [
                [
                  "`&` operatörü `>`, `<`, `==` gibi karşılaştırma işaretlerinden önce çalışır",
                  "`&` binds tighter than comparison operators like `>`, `<`, `==`",
                ],
                ["Sadece görünüm için, işlevsel bir gerekliliği yoktur", "It is purely cosmetic, with no functional effect"],
                ["Python bunu zorunlu kılan bir kural koymaz, alışkanlıktır", "Python has no such rule, it is just a habit"],
                ["Parantez, koşulları `or` gibi birleştirir", "Parentheses make the conditions combine like `or`"],
              ],
              answer: 0,
              explain: [
                "Parantezsiz yazarsan Python `&`'i önce, karşılaştırmayı sonra değerlendirmeye çalışır — bu da `df[\"fiyat\"] > (1000 & df[\"adet\"])` gibi anlamsız bir ifadeye yol açar. Parantezler doğru sırayı garanti eder.",
                "Without parentheses, Python tries to evaluate `&` before the comparison, producing something meaningless like `df[\"fiyat\"] > (1000 & df[\"adet\"])`. Parentheses guarantee the right order of evaluation.",
              ],
            }),
            pitfall(
              "SettingWithCopyWarning",
              "SettingWithCopyWarning",
              "`alt = df[df.fiyat > 100]` ardından `alt[\"yeni\"] = ...` yazarsan pandas seni uyarır: elindeki bir kopya mı görünüm mü belirsizdir. Niyetin ayrı bir tablo ise `.copy()` ekle: `alt = df[df.fiyat > 100].copy()`. Niyetin asıl tabloyu değiştirmekse `df.loc[maske, \"yeni\"] = ...` kullan.",
              "Writing `sub = df[df.price > 100]` then `sub[\"new\"] = ...` triggers a warning: pandas cannot tell whether you hold a copy or a view. If you want a separate table add `.copy()`. If you meant to edit the original, use `df.loc[mask, \"new\"] = ...`.",
            ),
            quiz({
              id: "q8",
              q: [
                "`alt = df[df.fiyat > 100].copy()` yazımındaki `.copy()` neden eklenir?",
                "Why is `.copy()` added in `alt = df[df.fiyat > 100].copy()`?",
              ],
              options: [
                [
                  "`alt`'ın bağımsız, ayrı bir tablo olduğunu netleştirir; SettingWithCopyWarning'i önler",
                  "It makes `alt` an explicitly independent table, avoiding the SettingWithCopyWarning",
                ],
                ["Tabloyu diske kaydeder", "It saves the table to disk"],
                ["`df`'in orijinalini siler", "It deletes the original `df`"],
                ["Yalnızca performansı artırmak için, işlevsel etkisi yoktur", "It is only for performance, with no functional effect"],
              ],
              answer: 0,
              explain: [
                "`.copy()` olmadan `alt`, `df`'in bir görünümü mü yoksa kopyası mı belli değildir — pandas bu belirsizlikte uyarı verir. `.copy()` eklemek niyetini netleştirir: \"bu artık ayrı bir tablo\".",
                "Without `.copy()`, whether `alt` is a view of `df` or a separate copy is ambiguous — pandas warns about that ambiguity. Adding `.copy()` makes the intent explicit: \"this is now a separate table\".",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Asıl tabloyu (kopyasını değil) değiştirmek istiyorsan doğru yazım hangisidir?",
                "If you actually want to edit the original table (not a copy), which is the right form?",
              ],
              options: [
                [
                  "`df.loc[maske, \"yeni\"] = ...`",
                  "`df.loc[mask, \"yeni\"] = ...`",
                ],
                ["`alt = df[maske]` sonra `alt[\"yeni\"] = ...`", "`alt = df[mask]` then `alt[\"yeni\"] = ...`"],
                ["`df.copy()[\"yeni\"] = ...`", "`df.copy()[\"yeni\"] = ...`"],
                ["Hiçbiri; orijinal tablo asla değiştirilemez", "None of these; the original table can never be edited"],
              ],
              answer: 0,
              explain: [
                "`df.loc[maske, \"yeni\"] = ...` yazmak, filtrelenmiş satırlardaki `yeni` sütununu **doğrudan orijinal `df` üzerinde** günceller — ara bir kopya oluşturmaz, bu yüzden belirsizlik ve uyarı ortadan kalkar.",
                "Writing `df.loc[mask, \"yeni\"] = ...` updates the `yeni` column on the filtered rows **directly on the original `df`** — no intermediate copy is created, so the ambiguity and the warning both disappear.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "`df[df[\"fiyat\"] > 1000 & df[\"adet\"] > 2]` neden hatalıdır?",
                "Why is `df[df[\"fiyat\"] > 1000 & df[\"adet\"] > 2]` wrong?",
              ],
              options: [
                [
                  "`&` operatörü `>`'den önce çalışır; koşullar parantez içine alınmalı",
                  "`&` binds tighter than `>`; each condition needs its own parentheses",
                ],
                ["`&` yerine `and` yazılmalı", "It should use `and` instead of `&`"],
                ["pandas iki koşulu desteklemez", "pandas does not support two conditions"],
                ["`fiyat` sütunu sayısal olmalı", "The `fiyat` column must be numeric"],
              ],
              answer: 0,
              explain: [
                "Python `1000 & df[\"adet\"]` ifadesini önce hesaplamaya çalışır ve anlamsız bir sonuç üretir. Doğrusu: `df[(df[\"fiyat\"] > 1000) & (df[\"adet\"] > 2)]`.",
                "Python evaluates `1000 & df[\"adet\"]` first, which is meaningless. The correct form is `df[(df[\"fiyat\"] > 1000) & (df[\"adet\"] > 2)]`.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "**Elektronik** kategorisindeki ve fiyatı **2000'den büyük** ürünleri `secim` değişkenine ata. Ardından bu seçimin satır sayısını `adet_sonuc` değişkenine yaz.",
                "Store products in the **Elektronik** category priced **above 2000** in `secim`, then put the number of rows in `adet_sonuc`.",
              ],
              starter: `import pandas as pd

df = pd.DataFrame({
    "urun": ["Kulaklık", "Klavye", "Saat", "Mat", "Süpürge"],
    "kategori": ["Elektronik", "Elektronik", "Elektronik", "Spor", "Ev"],
    "fiyat": [1899.0, 2450.0, 4290.0, 549.0, 7990.0],
})

secim =
adet_sonuc = `,
              solution: `import pandas as pd

df = pd.DataFrame({
    "urun": ["Kulaklık", "Klavye", "Saat", "Mat", "Süpürge"],
    "kategori": ["Elektronik", "Elektronik", "Elektronik", "Spor", "Ev"],
    "fiyat": [1899.0, 2450.0, 4290.0, 549.0, 7990.0],
})

secim = df[(df["kategori"] == "Elektronik") & (df["fiyat"] > 2000)]
adet_sonuc = len(secim)
print(secim)`,
              hint: [
                "İki koşulu `&` ile birleştir ve her birini parantez içine al.",
                "Combine the two conditions with `&`, each wrapped in parentheses.",
              ],
              checks: [
                {
                  code: "adet_sonuc == 2",
                  msg: ["Seçim 2 satır içermeli", "The selection must contain 2 rows"],
                },
                {
                  code: "set(secim['urun']) == {'Klavye', 'Saat'}",
                  msg: [
                    "Seçimde Klavye ve Saat olmalı",
                    "The selection must contain Klavye and Saat",
                  ],
                },
              ],
              xp: 35,
            }),
          ],
        }),

        lesson({
          slug: "gruplama-ve-pivot",
          title: L("groupby ve pivot: özet üretmek", "groupby and pivot: producing summaries"),
          summary: L(
            "SQL'deki GROUP BY'ın pandas karşılığı; raporların büyük çoğunluğu bu üç satırla çıkar.",
            "The pandas counterpart of SQL's GROUP BY; most reports come out of these three lines.",
          ),
          minutes: 16,
          blocks: [
            text(
              "`groupby` üç adımda çalışır: **böl** (gruplara ayır) → **uygula** (her gruba fonksiyon) → **birleştir** (tek tabloya topla).",
              "`groupby` works in three steps: **split** into groups → **apply** a function to each → **combine** back into one table.",
            ),
            quiz({
              id: "q1",
              q: [
                "`groupby` işleminin üç adımı hangi sırayla gerçekleşir?",
                "In what order do `groupby`'s three steps happen?",
              ],
              options: [
                ["Böl → uygula → birleştir", "Split → apply → combine"],
                ["Birleştir → böl → uygula", "Combine → split → apply"],
                ["Uygula → birleştir → böl", "Apply → combine → split"],
                ["Sırası önemli değildir", "The order does not matter"],
              ],
              answer: 0,
              explain: [
                "Önce veri gruplara **bölünür** (örneğin kategoriye göre), her gruba ayrı ayrı bir fonksiyon **uygulanır** (örn. `sum`), sonuçlar tek bir tabloda **birleştirilir**. Bu üçlü zihinsel model, karmaşık gruplama sorgularını çözmeyi kolaylaştırır.",
                "Data is first **split** into groups (say, by category), a function is **applied** to each group separately (e.g. `sum`), and the results are **combined** back into a single table. This three-step mental model makes complex grouping queries easier to reason about.",
              ],
            }),
            code(
              "python",
              `# Tek metrik
df.groupby("kategori")["ciro"].sum()

# Birden çok metrik, adlandırılmış
ozet = df.groupby("kategori").agg(
    toplam_ciro=("ciro", "sum"),
    ortalama_fiyat=("fiyat", "mean"),
    urun_sayisi=("urun", "count"),
).reset_index()

# Çok seviyeli gruplama
df.groupby(["kategori", "sehir"])["ciro"].sum()

# Pivot tablo — Excel'deki pivotun aynısı
df.pivot_table(
    index="kategori",
    columns="sehir",
    values="ciro",
    aggfunc="sum",
    fill_value=0,
)`,
            ),
            quiz({
              id: "q2",
              q: [
                "`df.groupby(\"kategori\")[\"ciro\"].sum()` ifadesinin sonucu nasıl bir yapıdır?",
                "What kind of structure does `df.groupby(\"kategori\")[\"ciro\"].sum()` produce?",
              ],
              options: [
                [
                  "Kategori adlarının indeks olduğu, toplam ciroları içeren bir Series",
                  "A Series of total revenue, indexed by category name",
                ],
                ["Orijinal `df` ile tamamen aynı DataFrame", "The exact same DataFrame as the original `df`"],
                ["Tek bir sayı", "A single number"],
                ["Bir Python listesi", "A plain Python list"],
              ],
              answer: 0,
              explain: [
                "Tek bir sütun (`[\"ciro\"]`) üzerinde `sum()` çağırdığın için sonuç bir `Series`'tir; her kategori bir indeks etiketi, karşılığı da o kategorinin toplam cirosudur.",
                "Because `sum()` is called on a single column (`[\"ciro\"]`), the result is a `Series`; each category becomes an index label paired with that category's total revenue.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`agg(toplam_ciro=(\"ciro\", \"sum\"))` yazımındaki `toplam_ciro=` kısmı ne işe yarar?",
                "In `agg(toplam_ciro=(\"ciro\", \"sum\"))`, what does the `toplam_ciro=` part do?",
              ],
              options: [
                [
                  "Sonuç tablosundaki sütuna verilecek ismi belirler",
                  "Names the resulting column in the output table",
                ],
                ["`ciro` sütununu yeniden adlandırıp orijinal df'i değiştirir", "Renames the `ciro` column and mutates the original df"],
                ["Yalnızca `ciro` sütununun toplamını yazdırır, sonuç tutmaz", "Just prints the sum of `ciro`, without storing a result"],
                ["Bir hata mesajı şablonudur", "It is an error message template"],
              ],
              answer: 0,
              explain: [
                "Adlandırılmış toplama (named aggregation) sözdizimi `yeni_sutun_adi=(\"kaynak_sutun\", \"fonksiyon\")` şeklindedir. Bu, sonuç tablosunun sütun adını sen belirlersin — `agg({\"ciro\": \"sum\"})` gibi eski yazımların ürettiği belirsiz isimlerden kaçınırsın.",
                "The named-aggregation syntax is `new_column_name=(\"source_column\", \"function\")`. It lets you choose the output column's name directly — avoiding the ambiguous names older forms like `agg({\"ciro\": \"sum\"})` would produce.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`df.groupby([\"kategori\", \"sehir\"])[\"ciro\"].sum()` sonucu ne üretir?",
                "What does `df.groupby([\"kategori\", \"sehir\"])[\"ciro\"].sum()` produce?",
              ],
              options: [
                [
                  "Kategori ve şehir kombinasyonu başına toplamı olan, iki seviyeli (MultiIndex) bir Series",
                  "A two-level (MultiIndex) Series with one total per category-and-city combination",
                ],
                ["Yalnızca kategoriye göre gruplanmış, şehri yok sayan bir sonuç", "A result grouped only by category, ignoring city"],
                ["Hata verir çünkü groupby birden çok sütun almaz", "It raises an error because groupby cannot take multiple columns"],
                ["Şehir ve kategoriyi ayrı ayrı iki tabloya böler", "It splits city and category into two separate tables"],
              ],
              answer: 0,
              explain: [
                "Listeye birden fazla sütun verildiğinde gruplama her kombinasyon için ayrı yapılır ve sonuç **çok seviyeli bir indekse** (MultiIndex) sahip olur — her satır bir kategori-şehir çiftini temsil eder.",
                "Passing a list of multiple columns groups by every combination of them, and the result has a **MultiIndex** — each row represents one category-city pair.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`pivot_table` çağrısındaki `fill_value=0` parametresi neyi çözer?",
                "What problem does `fill_value=0` solve in a `pivot_table` call?",
              ],
              options: [
                [
                  "Bazı kategori-şehir kombinasyonu hiç veri içermiyorsa boş yerine 0 yazar",
                  "Writes 0 instead of leaving a blank when a category-city combination has no data",
                ],
                ["Tüm tabloyu sıfırlarla doldurur", "Fills the entire table with zeros"],
                ["Sıfır olan satırları siler", "Deletes rows that are zero"],
                ["Sadece ilk sütunu etkiler", "Only affects the first column"],
              ],
              answer: 0,
              explain: [
                "Pivot tabloda her satır-sütun kombinasyonu için veri olmayabilir; varsayılan olarak bu hücreler `NaN` olur. `fill_value=0`, hiç satış olmayan kombinasyonları doğal biçimde 0 olarak gösterir.",
                "Not every row-column combination in a pivot has data; by default those cells become `NaN`. `fill_value=0` naturally shows combinations with no sales as 0 instead.",
              ],
            }),
            tip(
              "reset_index() alışkanlığı",
              "Get used to reset_index()",
              "`groupby` sonucunda grup anahtarı **indekse** taşınır. Sonucu Excel'e yazacak, grafik çizecek veya başka tabloyla birleştireceksen `.reset_index()` ile onu tekrar normal bir sütuna çevir.",
              "After `groupby` the group key moves into the **index**. If you are exporting to Excel, plotting, or merging with another table, call `.reset_index()` to bring it back as a regular column.",
            ),
            quiz({
              id: "q6",
              q: [
                "`groupby` işleminden sonra grup anahtarı (örn. \"kategori\") nereye taşınır?",
                "After a `groupby`, where does the group key (e.g. \"kategori\") end up?",
              ],
              options: [
                ["Sonucun indeksine", "The result's index"],
                ["Ayrı bir dosyaya", "A separate file"],
                ["Silinir, sonuçta hiç görünmez", "It is deleted and never appears in the result"],
                ["Değişmez, normal bir sütun olarak kalır", "It stays unchanged as a regular column"],
              ],
              answer: 0,
              explain: [
                "`groupby`, gruplama yaptığın sütunu artık normal bir sütun olmaktan çıkarıp **indekse** taşır. Bu, ilk bakışta kafa karıştırıcı olabilir çünkü o sütunu `df[\"kategori\"]` gibi artık doğrudan çağıramazsın.",
                "`groupby` moves the column you grouped by out of being a regular column and into the **index**. This can be confusing at first, since you can no longer reach it directly with something like `df[\"kategori\"]`.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`.reset_index()` çağırmanın etkisi nedir?",
                "What is the effect of calling `.reset_index()`?",
              ],
              options: [
                [
                  "İndeksteki grup anahtarını tekrar normal bir sütuna çevirir",
                  "Turns the group key sitting in the index back into a regular column",
                ],
                ["Tüm veriyi siler ve baştan başlar", "Deletes all the data and starts over"],
                ["Satırları rastgele karıştırır", "Shuffles the rows randomly"],
                ["Sadece sütun isimlerini büyük harfe çevirir", "Only uppercases the column names"],
              ],
              answer: 0,
              explain: [
                "`reset_index()`, indekste duran grup anahtarını alıp tekrar sıradan bir sütun yapar ve indeksi 0, 1, 2... şeklinde varsayılana döndürür. `groupby`'ın tersi gibi düşünebilirsin.",
                "`reset_index()` takes whatever sits in the index and turns it back into an ordinary column, resetting the index to the default 0, 1, 2, ... You can think of it as undoing part of what `groupby` did.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Bir `groupby` sonucunu Excel'e yazmadan veya başka bir tabloyla birleştirmeden önce neden genelde `.reset_index()` çağrılır?",
                "Why is `.reset_index()` typically called before exporting a `groupby` result to Excel or merging it with another table?",
              ],
              options: [
                [
                  "Bu araçlar grup anahtarının normal bir sütun olmasını bekler, indekste değil",
                  "Those tools expect the group key to be a regular column, not sitting in the index",
                ],
                ["`reset_index()` performansı artırmak için zorunludur", "`reset_index()` is required purely for performance"],
                ["Excel indeksli tabloları hiç kabul etmez", "Excel refuses indexed tables entirely"],
                ["Aksi halde toplamlar yanlış hesaplanır", "Otherwise the totals are computed incorrectly"],
              ],
              answer: 0,
              explain: [
                "`merge` bir sütun adına göre birleştirme yapar, indekse göre değil; Excel'e yazarken de grup anahtarının görünür bir sütun olması beklenir. `reset_index()` bu uyumu sağlar.",
                "`merge` joins on a column name, not the index; when writing to Excel you also want the group key to appear as a visible column. `reset_index()` provides that compatibility.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Şehir bazında **toplam tutarı** hesapla ve sonucu `ozet` değişkenine ata (indeks şehir olacak şekilde bir Series yeter).",
                "Compute the **total amount per city** and store it in `ozet` (a Series indexed by city is fine).",
              ],
              starter: `import pandas as pd

df = pd.DataFrame({
    "sehir": ["İstanbul", "Ankara", "İzmir", "İstanbul", "Ankara", "İstanbul"],
    "tutar": [1200, 800, 950, 1500, 700, 300],
})

ozet = `,
              solution: `import pandas as pd

df = pd.DataFrame({
    "sehir": ["İstanbul", "Ankara", "İzmir", "İstanbul", "Ankara", "İstanbul"],
    "tutar": [1200, 800, 950, 1500, 700, 300],
})

ozet = df.groupby("sehir")["tutar"].sum()
print(ozet)`,
              hint: [
                "`df.groupby(\"sehir\")[\"tutar\"].sum()`",
                "`df.groupby(\"sehir\")[\"tutar\"].sum()`",
              ],
              checks: [
                {
                  code: "int(ozet['İstanbul']) == 3000",
                  msg: ["İstanbul toplamı 3000 olmalı", "İstanbul total must be 3000"],
                },
                {
                  code: "int(ozet['Ankara']) == 1500 and int(ozet['İzmir']) == 950",
                  msg: [
                    "Ankara 1500, İzmir 950 olmalı",
                    "Ankara must be 1500 and İzmir 950",
                  ],
                },
              ],
              xp: 40,
            }),
            pyTask({
              id: "t2",
              prompt: [
                "Kategori bazında **toplam ciro** ve **ortalama fiyat** içeren bir özet tablo üret; sütun adları `toplam_ciro` ve `ort_fiyat` olsun ve sonucu `ozet` değişkenine ata.",
                "Produce a summary per category with **total revenue** and **average price**; name the columns `toplam_ciro` and `ort_fiyat`, and store it in `ozet`.",
              ],
              starter: `import pandas as pd

df = pd.DataFrame({
    "kategori": ["Elektronik", "Elektronik", "Spor", "Spor", "Ev"],
    "fiyat": [1899.0, 2450.0, 549.0, 2790.0, 7990.0],
    "adet": [2, 1, 4, 1, 1],
})
df["ciro"] = df["fiyat"] * df["adet"]

ozet = `,
              solution: `import pandas as pd

df = pd.DataFrame({
    "kategori": ["Elektronik", "Elektronik", "Spor", "Spor", "Ev"],
    "fiyat": [1899.0, 2450.0, 549.0, 2790.0, 7990.0],
    "adet": [2, 1, 4, 1, 1],
})
df["ciro"] = df["fiyat"] * df["adet"]

ozet = df.groupby("kategori").agg(
    toplam_ciro=("ciro", "sum"),
    ort_fiyat=("fiyat", "mean"),
).reset_index()
print(ozet)`,
              hint: [
                "`agg(yeni_ad=(\"sütun\", \"fonksiyon\"))` biçimi sütun adını doğrudan belirlemeni sağlar.",
                "The `agg(new_name=(\"column\", \"func\"))` form lets you name the output columns directly.",
              ],
              checks: [
                {
                  code: "'toplam_ciro' in ozet.columns and 'ort_fiyat' in ozet.columns",
                  msg: [
                    "ozet tablosunda toplam_ciro ve ort_fiyat sütunları olmalı",
                    "ozet must have toplam_ciro and ort_fiyat columns",
                  ],
                },
                {
                  code: "abs(float(ozet.set_index('kategori').loc['Elektronik', 'toplam_ciro']) - 6248.0) < 1e-6",
                  msg: [
                    "Elektronik toplam cirosu 6248.0 olmalı",
                    "Elektronik total revenue must be 6248.0",
                  ],
                },
              ],
              xp: 45,
            }),
          ],
        }),

        lesson({
          slug: "veri-temizligi",
          title: L("Veri temizliği: eksik ve bozuk değerler", "Data cleaning: missing and broken values"),
          summary: L(
            "Analiz süresinin çoğu burada geçer. Sistematik yaklaş, her kararı kaydet.",
            "Most analysis time is spent here. Be systematic and record every decision.",
          ),
          minutes: 18,
          blocks: [
            text(
              "Yeni bir veri setiyle karşılaştığında her seferinde aynı dört soruyu sor:\n\n1. Kaç satır, kaç sütun, hangi tipler? (`df.info()`)\n2. Hangi sütunda kaç eksik değer var? (`df.isna().sum()`)\n3. Tekrarlanan satır var mı? (`df.duplicated().sum()`)\n4. Sayısal sütunların aralığı mantıklı mı? (`df.describe()`)",
              "Every time you meet a new dataset, ask the same four questions:\n\n1. How many rows, columns and what types? (`df.info()`)\n2. How many missing values per column? (`df.isna().sum()`)\n3. Are there duplicate rows? (`df.duplicated().sum()`)\n4. Are the numeric ranges plausible? (`df.describe()`)",
            ),
            quiz({
              id: "q2",
              q: [
                "Her sütunda kaç eksik değer olduğunu görmek için hangi kod kullanılır?",
                "Which code shows how many missing values each column has?",
              ],
              options: [
                ["`df.isna().sum()`", "`df.isna().sum()`"],
                ["`df.duplicated().sum()`", "`df.duplicated().sum()`"],
                ["`df.describe()`", "`df.describe()`"],
                ["`df.info()` tek başına yeterlidir, başka hiçbir şeye gerek yoktur", "`df.info()` alone is enough, nothing else is needed"],
              ],
              answer: 0,
              explain: [
                "`isna()` her hücre için True/False üretir, `.sum()` sütun başına True sayısını (yani eksik değer sayısını) toplar. Yeni bir veri setiyle karşılaşınca sorulacak dört sorudan ikincisi tam olarak budur.",
                "`isna()` produces True/False for every cell, and `.sum()` adds up the True count per column (i.e. the number of missing values). This is exactly the second of the four questions to ask a new dataset.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`df.duplicated().sum()` ne sayar?",
                "What does `df.duplicated().sum()` count?",
              ],
              options: [
                ["Tekrar eden satır sayısını", "The number of duplicate rows"],
                ["Eksik değer sayısını", "The number of missing values"],
                ["Sütun sayısını", "The number of columns"],
                ["Benzersiz değer sayısını", "The number of unique values"],
              ],
              answer: 0,
              explain: [
                "`duplicated()` her satır için, daha önce aynısı görülmüşse True döner; `.sum()` bunları toplar. Yeni bir veri setinde sorulacak üçüncü soru tam olarak budur — tekrarlanan satır var mı?",
                "`duplicated()` returns True for each row that repeats one already seen; `.sum()` adds those up. This is exactly the third question to ask of a new dataset — are there duplicate rows?",
              ],
            }),
            code(
              "python",
              `# Eksik değerleri gör
print(df.isna().sum())
print(df.isna().mean().round(3))   # oransal

# Doldur veya sil
df["fiyat"] = df["fiyat"].fillna(df["fiyat"].median())
df["kategori"] = df["kategori"].fillna("bilinmiyor")
df = df.dropna(subset=["musteri_id"])   # kritik sütun boşsa satır işe yaramaz

# Tekrarlar
df = df.drop_duplicates(subset=["siparis_no"], keep="last")

# Tip düzeltme
df["tarih"] = pd.to_datetime(df["tarih"], errors="coerce")
df["fiyat"] = pd.to_numeric(df["fiyat"], errors="coerce")

# Metin normalizasyonu
df["sehir"] = df["sehir"].str.strip().str.title()`,
            ),
            quiz({
              id: "q4",
              q: [
                "`df.isna().mean().round(3)` ne gösterir?",
                "What does `df.isna().mean().round(3)` show?",
              ],
              options: [
                [
                  "Her sütunda eksik değerlerin oranını (0 ile 1 arasında)",
                  "The proportion of missing values in each column (between 0 and 1)",
                ],
                ["Eksik değerlerin toplam sayısını", "The total count of missing values"],
                ["Sütunların ortalama değerini", "The average value of the columns"],
                ["Yalnızca ilk satırdaki eksikleri", "Only the missing values in the first row"],
              ],
              answer: 0,
              explain: [
                "`isna()` True/False üretir; bunların **ortalaması**, True olanların oranını verir (True=1, False=0 sayıldığı için). `.sum()` sayıyı, `.mean()` oranı gösterir — 1000 satırda 50 eksik ile 10 satırda 5 eksik, sayı olarak farklı ama oran olarak aynıdır.",
                "`isna()` produces True/False; their **mean** gives the proportion that are True (since True counts as 1, False as 0). `.sum()` shows the count, `.mean()` shows the ratio — 50 missing out of 1000 rows and 5 missing out of 10 rows have different counts but the same ratio.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`df.dropna(subset=[\"musteri_id\"])` hangi satırları siler?",
                "Which rows does `df.dropna(subset=[\"musteri_id\"])` drop?",
              ],
              options: [
                [
                  "Yalnızca `musteri_id` sütunu boş olan satırları",
                  "Only rows where the `musteri_id` column is empty",
                ],
                ["Herhangi bir sütunu boş olan tüm satırları", "Any row that has an empty value in any column"],
                ["`musteri_id` sütununun tamamını", "The entire `musteri_id` column"],
                ["Hiçbir satırı, sadece uyarı verir", "No rows at all, it only warns"],
              ],
              answer: 0,
              explain: [
                "`subset` parametresi olmadan `dropna()` herhangi bir sütunu boş olan satırı silerdi — çoğu zaman çok agresiftir. `subset=[\"musteri_id\"]` kontrolü yalnızca o **kritik sütuna** daraltır.",
                "Without `subset`, `dropna()` would drop any row with a blank in any column — often far too aggressive. `subset=[\"musteri_id\"]` narrows the check to just that one **critical column**.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`df.drop_duplicates(subset=[\"siparis_no\"], keep=\"last\")` tekrarlarda hangi satırı tutar?",
                "When there are duplicates, which row does `df.drop_duplicates(subset=[\"siparis_no\"], keep=\"last\")` keep?",
              ],
              options: [
                ["Aynı `siparis_no`'ya sahip satırların **sonuncusunu**", "The **last** row among those sharing the same `siparis_no`"],
                ["Aynı `siparis_no`'ya sahip satırların ilkini", "The first row among those sharing the same `siparis_no`"],
                ["Rastgele birini", "A random one"],
                ["Hiçbirini, tümünü siler", "None of them — it drops all of them"],
              ],
              answer: 0,
              explain: [
                "`keep=\"last\"`, tekrar eden gruplardan **sonuncusunu** saklar — bir sipariş güncellenmişse en güncel kaydı tutmak istediğinde kullanışlıdır. Varsayılan `keep=\"first\"` ise ilkini tutardı.",
                "`keep=\"last\"` retains the **last** row in each group of duplicates — useful when an order was updated and you want the most recent record. The default, `keep=\"first\"`, would keep the earliest instead.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`df[\"sehir\"].str.strip().str.title()` zincirinin amacı nedir?",
                "What is the point of the chain `df[\"sehir\"].str.strip().str.title()`?",
              ],
              options: [
                [
                  "Baştaki/sondaki boşlukları siler ve her kelimenin ilk harfini büyütür",
                  "Trims leading/trailing whitespace and capitalises the first letter of each word",
                ],
                ["Metni tamamen büyük harfe çevirir", "Converts the text entirely to uppercase"],
                ["Şehir isimlerini sayıya çevirir", "Converts city names to numbers"],
                ["Yalnızca metnin uzunluğunu ölçer", "Only measures the text's length"],
              ],
              answer: 0,
              explain: [
                "`\" istanbul \"` ve `\"İstanbul\"` gözle aynı görünse de pandas için farklı metinlerdir; `.strip()` fazladan boşlukları, `.title()` tutarsız büyük/küçük harfi temizler. Bu ikili, gruplamadan önce \"aynı şehrin\" farklı yazımlarla ikiye bölünmesini önler.",
                "`\" istanbul \"` and `\"İstanbul\"` may look the same to the eye but are different strings to pandas; `.strip()` removes stray whitespace, `.title()` fixes inconsistent casing. Together they stop \"the same city\" from splitting into two groups before a `groupby`.",
              ],
            }),
            info(
              "Eksik değeri doldurmak masum bir karar değildir",
              "Filling missing values is never a neutral decision",
              "Ortalamayla doldurmak varyansı düşürür ve istatistiksel testleri yanıltır. Medyan aykırı değerlere dayanıklıdır. Bazen en doğrusu doldurmamak, `eksik_mi` diye bir bayrak sütunu eklemektir — çünkü **verinin eksik olması** bilginin kendisi olabilir (örneğin formu yarıda bırakan kullanıcı).",
              "Filling with the mean shrinks variance and skews statistical tests. The median is robust to outliers. Sometimes the right answer is not to fill at all but to add an `is_missing` flag — because **missingness itself** can be the signal (a user who abandoned the form, say).",
            ),
            quiz({
              id: "q8",
              q: [
                "Eksik değerleri **ortalama** ile doldurmak neden riskli olabilir?",
                "Why can filling missing values with the **mean** be risky?",
              ],
              options: [
                [
                  "Varyansı düşürür ve istatistiksel testleri yanıltabilir",
                  "It shrinks variance and can skew statistical tests",
                ],
                ["Python bunu yasaklar", "Python forbids it outright"],
                ["Her zaman sütunu metne çevirir", "It always converts the column to text"],
                ["Yalnızca sayısal olmayan sütunlarda sorun çıkarır", "It only causes problems on non-numeric columns"],
              ],
              answer: 0,
              explain: [
                "Ortalama ile doldurmak, aslında hiç ölçülmemiş noktaları veri dağılımının tam ortasına yerleştirir — bu, gerçekte var olan değişkenliği yapay olarak azaltır ve sonraki analizleri yanıltır. Medyan, uç değerlere daha dayanıklı olduğu için genelde daha güvenli bir seçimdir.",
                "Filling with the mean plants points that were never actually measured right in the middle of the distribution — artificially shrinking real variability and misleading later analysis. The median, being more robust to outliers, is usually the safer choice.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Metne göre, bazen eksik değeri doldurmak yerine ne yapmak daha doğru olabilir?",
                "According to the text, what can sometimes be the better move instead of filling a missing value?",
              ],
              options: [
                [
                  "Doldurmadan bırakıp bir `eksik_mi` bayrak sütunu eklemek",
                  "Leaving it unfilled and adding an `is_missing` flag column",
                ],
                ["Tüm satırı silmek", "Deleting the entire row"],
                ["Sütunu tamamen kaldırmak", "Removing the column entirely"],
                ["Rastgele bir değer atamak", "Assigning a random value"],
              ],
              answer: 0,
              explain: [
                "Bazı durumlarda **verinin eksik olması** kendi başına bir bilgidir — örneğin formu yarıda bırakan bir kullanıcı. Bunu bir doldurma değeriyle gizlemek yerine `eksik_mi` gibi ayrı bir bayrak sütunu, bu bilgiyi analiz için saklar.",
                "Sometimes **the fact that data is missing** is itself informative — a user who abandoned a form, say. Instead of hiding that behind a filled-in value, a separate flag column like `is_missing` preserves that signal for analysis.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "`pd.to_numeric(df[\"fiyat\"], errors=\"coerce\")` çevrilemeyen değerlere ne yapar?",
                "What does `pd.to_numeric(df[\"price\"], errors=\"coerce\")` do with unconvertible values?",
              ],
              options: [
                ["NaN yapar", "Turns them into NaN"],
                ["Hata fırlatır", "Raises an error"],
                ["0 yapar", "Turns them into 0"],
                ["Satırı siler", "Drops the row"],
              ],
              answer: 0,
              explain: [
                "`errors=\"coerce\"` bozuk değerleri NaN'a çevirir; böylece `df[df[\"fiyat\"].isna()]` ile tam olarak hangi satırların sorunlu olduğunu görebilirsin. Bu, veriyi sessizce kaybetmeden temizlemenin en pratik yoludur.",
                "`errors=\"coerce\"` converts broken values to NaN, so `df[df[\"price\"].isna()]` shows you exactly which rows are problematic. It is the most practical way to clean without silently losing data.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "`fiyat` sütunundaki eksik değerleri **medyan** ile doldur ve `adet` sütunu boş olan satırları sil. Sonuçtaki satır sayısını `kalan` değişkenine ata.",
                "Fill missing values in `fiyat` with the **median**, then drop rows where `adet` is missing. Store the remaining row count in `kalan`.",
              ],
              starter: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "urun": ["A", "B", "C", "D", "E"],
    "fiyat": [100.0, np.nan, 300.0, 500.0, np.nan],
    "adet": [1, 2, np.nan, 4, 5],
})

# fiyat -> medyan ile doldur

# adet boş olan satırları sil

kalan = `,
              solution: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "urun": ["A", "B", "C", "D", "E"],
    "fiyat": [100.0, np.nan, 300.0, 500.0, np.nan],
    "adet": [1, 2, np.nan, 4, 5],
})

df["fiyat"] = df["fiyat"].fillna(df["fiyat"].median())
df = df.dropna(subset=["adet"])
kalan = len(df)
print(df)`,
              hint: [
                "`df[\"fiyat\"].median()` medyanı verir; satır silmek için `df.dropna(subset=[\"adet\"])`.",
                "`df[\"fiyat\"].median()` gives the median; drop rows with `df.dropna(subset=[\"adet\"])`.",
              ],
              checks: [
                {
                  code: "kalan == 4",
                  msg: ["Geriye 4 satır kalmalı", "4 rows must remain"],
                },
                {
                  code: "df['fiyat'].isna().sum() == 0",
                  msg: ["fiyat sütununda eksik değer kalmamalı", "No missing values may remain in fiyat"],
                },
              ],
              xp: 45,
            }),
          ],
        }),
        lesson({
          slug: "veri-okuma-ve-yazma",
          title: L("Veri okuma ve yazma", "Reading and writing data"),
          summary: L(
            "CSV, Excel, JSON ve Parquet: dosyayı doğru tiplerle okumak analizin yarısıdır.",
            "CSV, Excel, JSON and Parquet: loading a file with the right types is half the analysis.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Analiz bir dosyayla başlar ve pandas neredeyse her formatı okur:\n\n```python\npd.read_csv(\"satis.csv\")        # en yaygın\npd.read_excel(\"rapor.xlsx\", sheet_name=\"Ocak\")\npd.read_json(\"kayit.json\")\npd.read_parquet(\"buyuk.parquet\")  # sütunlu, sıkıştırılmış, hızlı\npd.read_sql(\"SELECT * FROM orders\", baglanti)\n```\n\nYazmak da simetriktir: `df.to_csv(...)`, `df.to_excel(...)`, `df.to_parquet(...)`.",
              "Analysis starts with a file, and pandas reads nearly every format:\n\n```python\npd.read_csv(\"sales.csv\")        # the most common\npd.read_excel(\"report.xlsx\", sheet_name=\"January\")\npd.read_json(\"records.json\")\npd.read_parquet(\"big.parquet\")   # columnar, compressed, fast\npd.read_sql(\"SELECT * FROM orders\", connection)\n```\n\nWriting is symmetric: `df.to_csv(...)`, `df.to_excel(...)`, `df.to_parquet(...)`.",
            ),
            quiz({
              id: "q2",
              q: [
                "Bir Excel dosyasını (`.xlsx`) okumak için hangi fonksiyon kullanılır?",
                "Which function is used to read an Excel (`.xlsx`) file?",
              ],
              options: [
                ["`pd.read_excel(...)`", "`pd.read_excel(...)`"],
                ["`pd.read_csv(...)`", "`pd.read_csv(...)`"],
                ["`pd.read_json(...)`", "`pd.read_json(...)`"],
                ["`pd.read_sql(...)`", "`pd.read_sql(...)`"],
              ],
              answer: 0,
              explain: [
                "Her dosya formatının kendi okuma fonksiyonu vardır ve isimleri formatla eşleşir: CSV için `read_csv`, Excel için `read_excel`, JSON için `read_json`. `sheet_name` parametresi Excel'de hangi sayfanın okunacağını belirtir.",
                "Every file format has its own read function, named after the format: `read_csv` for CSV, `read_excel` for Excel, `read_json` for JSON. The `sheet_name` parameter picks which Excel sheet to read.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir DataFrame'i Parquet dosyası olarak kaydetmek için hangi kodu yazarsın?",
                "What code do you write to save a DataFrame as a Parquet file?",
              ],
              options: [
                ["`df.to_parquet(\"dosya.parquet\")`", "`df.to_parquet(\"file.parquet\")`"],
                ["`df.read_parquet(\"dosya.parquet\")`", "`df.read_parquet(\"file.parquet\")`"],
                ["`pd.save(df, \"dosya.parquet\")`", "`pd.save(df, \"file.parquet\")`"],
                ["`df.export_parquet(\"dosya.parquet\")`", "`df.export_parquet(\"file.parquet\")`"],
              ],
              answer: 0,
              explain: [
                "Yazma fonksiyonları okuma fonksiyonlarıyla simetriktir: `read_csv` ↔ `to_csv`, `read_excel` ↔ `to_excel`, `read_parquet` ↔ `to_parquet`. `read_...` bir dosyayı içeri alır, `to_...` bir DataFrame'i dışarı yazar.",
                "Write functions mirror read functions: `read_csv` ↔ `to_csv`, `read_excel` ↔ `to_excel`, `read_parquet` ↔ `to_parquet`. `read_...` brings a file in, `to_...` writes a DataFrame out.",
              ],
            }),
            code(
              "python",
              `# Varsayılanlarla okumak çoğu zaman yetmez. Gerçek hayatta:
df = pd.read_csv(
    "satis.csv",
    sep=";",                    # Türkiye'de ayıraç çoğu zaman noktalı virgül
    decimal=",",                # ondalık ayıracı virgül
    encoding="utf-8",           # Türkçe karakterler bozulmasın
    parse_dates=["tarih"],      # tarihi metin değil tarih olarak oku
    dtype={"musteri_no": str},  # başındaki sıfırlar kaybolmasın
    na_values=["", "NA", "yok", "-"],  # bunları eksik say
)`,
              "Bu altı parametre, veri temizliğinde saatler kazandırır.",
              "These six parameters save hours of cleaning later.",
            ),
            quiz({
              id: "q4",
              q: [
                "`dtype={\"musteri_no\": str}` parametresini okuma anında vermenin amacı nedir?",
                "What is the point of passing `dtype={\"musteri_no\": str}` at read time?",
              ],
              options: [
                [
                  "`musteri_no` sütununu sayıya çevirtmeyip metin olarak tutmak",
                  "Keeping the `musteri_no` column as text rather than letting it become a number",
                ],
                ["Sütunu tamamen silmek", "Deleting the column entirely"],
                ["Sütunu otomatik olarak sıralamak", "Automatically sorting the column"],
                ["Yalnızca görünümü değiştirmek, veriyi etkilememek", "Only changing the display, not the underlying data"],
              ],
              answer: 0,
              explain: [
                "pandas, rakamlardan oluşan bir sütunu varsayılan olarak sayıya çevirmeye çalışır. `dtype={\"musteri_no\": str}` diyerek bunu önceden engellersin — kimlik numaraları gibi üzerinde matematik yapmayacağın alanlar için gereklidir.",
                "By default pandas tries to turn a column of digits into a number. Passing `dtype={\"musteri_no\": str}` heads that off — essential for identifier fields you will never do arithmetic on.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`na_values=[\"\", \"NA\", \"yok\", \"-\"]` parametresi ne yapar?",
                "What does the `na_values=[\"\", \"NA\", \"yok\", \"-\"]` parameter do?",
              ],
              options: [
                [
                  "Listedeki metinleri okuma anında eksik değer (NaN) olarak işaretler",
                  "Marks the listed strings as missing (NaN) at read time",
                ],
                ["Bu metinleri sütundan tamamen siler", "Removes those strings from the column entirely"],
                ["Yalnızca boş hücreleri etkiler, \"yok\" gibi metinleri değil", "Only affects truly blank cells, not text like \"yok\""],
                ["Sütunları yeniden adlandırır", "Renames the columns"],
              ],
              answer: 0,
              explain: [
                "Gerçek veride \"eksik\" farklı biçimlerde yazılır: boş hücre, `\"NA\"`, `\"yok\"`, tire. `na_values` bunların hepsini pandas'ın tanıdığı standart eksik değere (`NaN`) çevirir — sonradan tek tek `.replace()` yazmaktan kurtarır.",
                "Real data spells \"missing\" in different ways: a blank cell, `\"NA\"`, `\"yok\"`, a dash. `na_values` converts all of them into pandas' standard missing marker (`NaN`) at load time, saving you from writing `.replace()` calls afterwards.",
              ],
            }),
            pitfall(
              "Kimlik numaraları sayı olarak okunmamalı",
              "Identifiers must not be read as numbers",
              "`musteri_no` sütununda `00123` varsa ve pandas bunu sayı sanarsa `123` olur — baştaki sıfırlar gider ve o kayıt artık başka bir sistemle eşleşmez. Aynı sorun TC kimlik, IBAN, barkod, telefon ve posta kodunda da yaşanır.\n\nKural: **üzerinde matematik yapmayacağın hiçbir sayı, sayı tipinde olmamalıdır.** `dtype={\"musteri_no\": str}` yazmak bu hatayı kökten keser.",
              "If `customer_no` contains `00123` and pandas takes it for a number, it becomes `123` — the leading zeros vanish and that record no longer matches any other system. The same happens with national ids, IBANs, barcodes, phone numbers and postcodes.\n\nThe rule: **any number you will not do arithmetic on should not be a numeric type.** Writing `dtype={\"customer_no\": str}` eliminates the bug at the root.",
            ),
            quiz({
              id: "q6",
              q: [
                "`musteri_no` sütununda `\"00123\"` varsa ve pandas bunu sayı sanarsa ne olur?",
                "If the `musteri_no` column has `\"00123\"` and pandas mistakes it for a number, what happens?",
              ],
              options: [
                [
                  "Baştaki sıfırlar kaybolur, değer `123` olur",
                  "The leading zeros vanish and the value becomes `123`",
                ],
                ["Değer aynı kalır, sadece görünümü değişir", "The value stays the same, only the display changes"],
                ["pandas hata verir ve okumayı durdurur", "pandas raises an error and stops reading"],
                ["Sütun otomatik olarak metne çevrilir", "The column is automatically converted back to text"],
              ],
              answer: 0,
              explain: [
                "Sayılarda baştaki sıfırların matematiksel bir anlamı yoktur, bu yüzden pandas onları atar. Ama kimlik alanlarında o sıfırlar **verinin kendisidir** — kaybolunca kayıt başka bir sistemle eşleşmez olur.",
                "Leading zeros have no mathematical meaning in a number, so pandas drops them. But in an identifier field those zeros **are** the data — losing them means the record no longer matches any other system.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Metnin verdiği genel kurala göre, hangi tür sayılar sayısal tipte **olmamalıdır**?",
                "Per the rule the text gives, which kind of numbers should **not** be a numeric type?",
              ],
              options: [
                [
                  "Üzerinde matematik yapmayacağın sayılar (kimlik no, IBAN, posta kodu gibi)",
                  "Numbers you will never do arithmetic on (like ids, IBANs, postcodes)",
                ],
                ["Fiyat gibi toplanacak, çarpılacak sayılar", "Numbers like prices that will be added or multiplied"],
                ["Yalnızca ondalıklı sayılar", "Only decimal numbers"],
                ["Tüm sayılar sayısal tipte olmalıdır, istisnası yoktur", "All numbers must be numeric, without exception"],
              ],
              answer: 0,
              explain: [
                "Kural nettir: bir değer üzerinde toplama, ortalama gibi işlem yapmayacaksan, onu metin (`str`) olarak sakla. TC kimlik, IBAN, barkod, telefon, posta kodu bu kategoriye girer — hepsi rakamlardan oluşur ama hiçbiri gerçek bir \"miktar\" değildir.",
                "The rule is clear: if you will never add, average, or otherwise compute with a value, store it as text (`str`). National ids, IBANs, barcodes, phone numbers and postcodes all fall into this category — they are made of digits but none of them represent a true \"quantity\".",
              ],
            }),
            info(
              "CSV ne zaman yetmez?",
              "When is CSV not enough?",
              "CSV her yerde açılır ama tipleri saklamaz — her okuyuşta pandas tipleri yeniden tahmin eder ve bazen yanılır. Ayrıca sıkıştırılmamıştır ve satır satır okunur.\n\n**Parquet** bu üç sorunu da çözer: tipleri dosyanın içinde tutar, 5-10 kat küçüktür ve sütunlu olduğu için yalnızca ihtiyacın olan sütunları okur. Ara çıktıları saklarken CSV yerine Parquet kullanmak, büyük veri setlerinde tek satırla ciddi hız kazandırır.",
              "CSV opens everywhere but stores no types — pandas re-guesses them on every read and sometimes gets it wrong. It is also uncompressed and read row by row.\n\n**Parquet** solves all three: it keeps types inside the file, is 5-10× smaller, and being columnar it reads only the columns you ask for. Saving intermediate outputs as Parquet instead of CSV is a one-line change that buys real speed on large datasets.",
            ),
            quiz({
              id: "q8",
              q: [
                "CSV'nin Parquet'e göre en temel eksikliği nedir?",
                "What is CSV's most fundamental shortcoming compared to Parquet?",
              ],
              options: [
                [
                  "Sütun tiplerini saklamaz; her okumada pandas tipleri yeniden tahmin eder",
                  "It does not store column types; pandas re-guesses them on every read",
                ],
                ["Hiçbir programda açılamaz", "It cannot be opened by any program"],
                ["Yalnızca sayısal veri içerebilir", "It can only contain numeric data"],
                ["Türkçe karakter desteklemez", "It does not support Turkish characters"],
              ],
              answer: 0,
              explain: [
                "CSV saf metindir; hangi sütunun sayı, hangisinin tarih olduğu dosyanın içinde yazmaz. pandas bunu her seferinde yeniden tahmin eder ve bazen yanlış tahmin eder — bu yüzden `dtype` ve `parse_dates` gibi parametrelere ihtiyaç duyarsın.",
                "CSV is plain text; nothing in the file records which column is numeric or which is a date. pandas re-guesses this every time and sometimes gets it wrong — which is exactly why you need parameters like `dtype` and `parse_dates`.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Parquet'in \"sütunlu\" (columnar) olması ne avantaj sağlar?",
                "What advantage does Parquet's \"columnar\" storage provide?",
              ],
              options: [
                [
                  "Sadece ihtiyaç duyulan sütunları okuyabilir, tüm dosyayı taramak zorunda kalmaz",
                  "It can read only the columns you need, without scanning the whole file",
                ],
                ["Sütun sayısını otomatik olarak azaltır", "It automatically reduces the number of columns"],
                ["Yalnızca tek sütunlu tablolarda çalışır", "It only works with single-column tables"],
                ["Satırları alfabetik sıralar", "It sorts the rows alphabetically"],
              ],
              answer: 0,
              explain: [
                "CSV satır satır okunur; ihtiyacın olmayan sütunlar da diskten geçer. Parquet veriyi sütun sütun sakladığı için yalnızca istediğin sütunları okuyabilir — geniş tablolarda bu ciddi bir hız kazancıdır.",
                "CSV is read row by row, so even columns you do not need pass through disk I/O. Because Parquet stores data column by column, it can read just the columns you ask for — a real speed win on wide tables.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Türkçe bir CSV'de fiyatlar `1.899,50` biçiminde. Doğru okuma nasıl yapılır?",
                "In a Turkish CSV, prices look like `1.899,50`. How do you read them correctly?",
              ],
              options: [
                [
                  "`pd.read_csv(..., decimal=\",\", thousands=\".\")`",
                  "`pd.read_csv(..., decimal=\",\", thousands=\".\")`",
                ],
                ["Okuduktan sonra elle düzeltmek şarttır", "You must fix them by hand afterwards"],
                ["pandas bunu otomatik anlar", "pandas works this out automatically"],
                ["Fiyatları metin olarak bırakmak gerekir", "The prices have to stay as text"],
              ],
              answer: 0,
              explain: [
                "`decimal` ve `thousands` parametreleri olmadan pandas bu sütunu metin olarak okur — ve toplama yapmaya çalıştığında sessizce yanlış sonuç alırsın. Bu iki parametre okuma anında sorunu çözer.",
                "Without `decimal` and `thousands`, pandas reads the column as text — and when you try to sum it you quietly get the wrong answer. These two parameters fix it at load time.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Metin olarak gelen Türkçe biçimli fiyat sütununu sayıya çevir. `df[\"fiyat\"]` sütununu `float` yap ve `toplam` değişkenine toplamını yaz.",
                "Convert a Turkish-formatted price column that arrived as text. Make `df[\"fiyat\"]` a `float` and put its sum in `toplam`.",
              ],
              starter: `import pandas as pd

df = pd.DataFrame({
    "urun": ["Kulaklık", "Klavye", "Saat"],
    "fiyat": ["1.899,00", "2.450,50", "4.290,00"],
})

# nokta binlik ayıracı, virgül ondalık ayıracı
df["fiyat"] =
toplam =
print(df, toplam)`,
              solution: `import pandas as pd

df = pd.DataFrame({
    "urun": ["Kulaklık", "Klavye", "Saat"],
    "fiyat": ["1.899,00", "2.450,50", "4.290,00"],
})

df["fiyat"] = (
    df["fiyat"].str.replace(".", "", regex=False)
               .str.replace(",", ".", regex=False)
               .astype(float)
)
toplam = df["fiyat"].sum()
print(df, toplam)`,
              hint: [
                "Önce binlik ayıracı olan noktayı sil, sonra virgülü noktaya çevir, en son `.astype(float)` uygula.",
                "First delete the dot used as a thousands separator, then turn the comma into a dot, and finally apply `.astype(float)`.",
              ],
              checks: [
                {
                  code: "str(df['fiyat'].dtype).startswith('float')",
                  msg: ["fiyat sütunu float olmalı", "The fiyat column must be float"],
                },
                {
                  code: "abs(float(toplam) - 8639.5) < 0.01",
                  msg: ["Toplam 8639.50 olmalı", "The total must be 8639.50"],
                },
              ],
              xp: 45,
            }),
          ],
        }),
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "senior",
      title: L("Üretime yakın analiz", "Production-grade analysis"),
      description: L(
        "Birleştirme, zaman serisi, performans ve tekrarlanabilir kod.",
        "Merging, time series, performance and reproducible code.",
      ),
      projectSlug: "python-kohort-dashboard",
      lessons: [
        lesson({
          slug: "merge-ve-zaman-serisi",
          title: L("merge ve zaman serisi", "merge and time series"),
          summary: L(
            "Tabloları birleştir, tarihe göre yeniden örnekle, hareketli ortalama çıkar.",
            "Join tables, resample by date and compute rolling averages.",
          ),
          minutes: 18,
          blocks: [
            text(
              "`pd.merge`, SQL'deki JOIN'in pandas karşılığıdır. `how` parametresi birleşim türünü belirler: `inner`, `left`, `right`, `outer`.",
              "`pd.merge` is pandas' JOIN. The `how` parameter picks the join type: `inner`, `left`, `right`, `outer`.",
            ),
            quiz({
              id: "q1",
              q: [
                "`pd.merge(a, b, how=\"left\")` yazıldığında hangi satırlar sonuçta yer alır?",
                "With `pd.merge(a, b, how=\"left\")`, which rows appear in the result?",
              ],
              options: [
                [
                  "`a`'daki tüm satırlar; `b`'de eşleşme yoksa boş (NaN) bırakılır",
                  "Every row from `a`; where there is no match in `b`, the columns are left blank (NaN)",
                ],
                ["Yalnızca her iki tabloda da eşleşen satırlar", "Only rows that match in both tables"],
                ["`b`'deki tüm satırlar", "Every row from `b`"],
                ["Hiçbir satır, çünkü \"left\" geçersiz bir değerdir", "No rows, because \"left\" is not a valid value"],
              ],
              answer: 0,
              explain: [
                "`how=\"left\"`, soldaki tabloyu (`a`) referans alır: onun tüm satırları korunur, sağdan eşleşme bulunamazsa o satırın sağ taraftaki sütunları `NaN` olur. `inner` yalnızca eşleşenleri, `outer` ikisinin birleşimini tutar.",
                "`how=\"left\"` treats the left table (`a`) as the anchor: all of its rows are kept, and where no match exists on the right, that row's right-hand columns become `NaN`. `inner` keeps only matches, `outer` keeps the union of both.",
              ],
            }),
            code(
              "python",
              `birlesik = pd.merge(
    siparisler, musteriler,
    left_on="musteri_id", right_on="id",
    how="left",
    validate="many_to_one",   # beklenmedik çoğalmayı erken yakalar
    indicator=True,           # _merge sütunu: eşleşti mi?
)

print(birlesik["_merge"].value_counts())`,
            ),
            quiz({
              id: "q2",
              q: [
                "`left_on=\"musteri_id\", right_on=\"id\"` yazmanın sebebi nedir?",
                "Why write `left_on=\"musteri_id\", right_on=\"id\"`?",
              ],
              options: [
                [
                  "İki tabloda birleştirme anahtarının sütun adı farklı olduğunda hangi sütunun hangisiyle eşleşeceğini belirtmek",
                  "To specify which column matches which when the join key has a different name in each table",
                ],
                ["İki sütunu birleştirip yeni bir sütun oluşturmak", "To concatenate the two columns into a new one"],
                ["Yalnızca sol tablodaki sütunları göstermek", "To show only the columns from the left table"],
                ["Birleştirmeyi tamamen iptal etmek", "To cancel the merge entirely"],
              ],
              answer: 0,
              explain: [
                "İki tablo aynı bilgiyi farklı sütun adlarıyla tutabilir (`musteri_id` vs `id`). Sütun adı aynıysa tek başına `on=\"...\"` yeterlidir; farklıysa `left_on`/`right_on` ile her tarafın hangi sütunu kullanacağını ayrı ayrı söylersin.",
                "Two tables can hold the same information under different column names (`musteri_id` vs `id`). When the name matches, `on=\"...\"` alone is enough; when it differs, `left_on`/`right_on` tell each side which column to use separately.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`indicator=True` parametresi ne ekler?",
                "What does the `indicator=True` parameter add?",
              ],
              options: [
                [
                  "Her satırın hangi tarafta (veya her ikisinde) bulunduğunu gösteren `_merge` sütunu",
                  "A `_merge` column showing which side (or both) each row came from",
                ],
                ["Eşleşmeyen satırları otomatik siler", "It automatically deletes unmatched rows"],
                ["Sonucu küçükten büyüğe sıralar", "It sorts the result from smallest to largest"],
                ["Yalnızca sayısal sütunları gösterir", "It shows only the numeric columns"],
              ],
              answer: 0,
              explain: [
                "`_merge` sütunu `left_only`, `right_only` veya `both` değerlerini alır — birleştirmenin kalitesini denetlemenin hızlı bir yoludur. `value_counts()` ile bakıldığında kaç satırın eşleşmediği tek satırda görülür.",
                "The `_merge` column takes the value `left_only`, `right_only` or `both` — a quick way to audit the quality of a merge. Checking it with `value_counts()` shows in one line how many rows failed to match.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`validate=\"many_to_one\"` parametresi ne işe yarar?",
                "What does the `validate=\"many_to_one\"` parameter do?",
              ],
              options: [
                [
                  "Sağ taraftaki anahtarın benzersiz olduğunu doğrular, değilse hata fırlatır",
                  "Checks that the right side's key is unique, and raises an error if it is not",
                ],
                ["Birleştirmeyi hızlandırır ama başka bir işlevi yoktur", "It only speeds up the merge, nothing else"],
                ["Eksik değerleri otomatik doldurur", "It automatically fills missing values"],
                ["Sonuçtaki sütun sayısını sınırlar", "It limits the number of columns in the result"],
              ],
              answer: 0,
              explain: [
                "\"many_to_one\" demek, sol tarafta bir anahtarın birden çok kez, sağ tarafta ise **yalnızca bir kez** geçmesi beklenir demektir. Bu varsayım tutmuyorsa (sağda tekrar varsa) pandas sessizce yanlış sonuç üretmek yerine hemen hata verir.",
                "\"many_to_one\" means the key can repeat on the left, but is expected to appear **only once** on the right. If that assumption is violated (the right side has duplicates), pandas raises immediately instead of silently producing a wrong result.",
              ],
            }),
            tip(
              "Birleştirme sonrası satır sayısını kontrol et",
              "Check the row count after every merge",
              "Birleştirmeden önce ve sonra `len(df)` yaz. Satır sayısı beklenmedik şekilde arttıysa sağ tarafta tekrarlanan anahtar vardır ve tüm metriklerin şişer. `validate=\"many_to_one\"` bu hatayı sessiz kalmak yerine anında hataya çevirir.",
              "Print `len(df)` before and after. If the count grew unexpectedly, the right side has duplicate keys and every metric is now inflated. `validate=\"many_to_one\"` turns that silent bug into an immediate error.",
            ),
            quiz({
              id: "q5",
              q: [
                "Bir birleştirmeden sonra satır sayısı beklenmedik şekilde arttıysa en olası sebep nedir?",
                "If the row count grows unexpectedly after a merge, what is the most likely cause?",
              ],
              options: [
                [
                  "Sağ tabloda anahtar tekrarlanıyor, her eşleşme birden fazla satır üretiyor",
                  "The right table has duplicate keys, so each match produces more than one row",
                ],
                ["`how=\"left\"` yazmak her zaman satır sayısını artırır", "Using `how=\"left\"` always increases the row count"],
                ["pandas rastgele fazladan satır ekler", "pandas randomly adds extra rows"],
                ["Sol tablo bozuktur", "The left table is corrupted"],
              ],
              answer: 0,
              explain: [
                "Bir anahtar sağ tabloda birden çok kez geçiyorsa, sol taraftaki her satır o anahtarla **birden fazla kez** eşleşir ve çoğalır. Sonuç: toplamlar şişer ve rapor yanlış çıkar — birleştirme öncesi/sonrası `len(df)` kontrolü bunu hemen yakalar.",
                "If a key appears more than once in the right table, every matching row on the left gets duplicated **once per match**. The result: totals inflate and the report is wrong — checking `len(df)` before and after the merge catches this immediately.",
              ],
            }),
            code(
              "python",
              `# Zaman serisi
df["tarih"] = pd.to_datetime(df["tarih"])
df = df.set_index("tarih")

aylik = df["ciro"].resample("MS").sum()      # ay başına topla
haftalik = df["ciro"].resample("W").mean()

# Hareketli ortalama ve dönemsel değişim
aylik_df = aylik.to_frame("ciro")
aylik_df["hareketli_3"] = aylik_df["ciro"].rolling(3).mean()
aylik_df["degisim_%"] = aylik_df["ciro"].pct_change().mul(100).round(1)`,
            ),
            quiz({
              id: "q6",
              q: [
                "`df = df.set_index(\"tarih\")` neden zaman serisi işlemlerinden önce yapılır?",
                "Why is `df = df.set_index(\"tarih\")` done before time-series operations?",
              ],
              options: [
                [
                  "`resample` gibi zaman tabanlı işlemler, tarihin indekste olmasını gerektirir",
                  "Time-based operations like `resample` require the date to be the index",
                ],
                ["Tarih sütununu tamamen siler", "It deletes the date column entirely"],
                ["Satırları rastgele karıştırır", "It shuffles the rows randomly"],
                ["Sadece görünümü değiştirir, gerekli değildir", "It only affects display and is not actually required"],
              ],
              answer: 0,
              explain: [
                "`resample`, `rolling` gibi pandas'ın zaman serisi araçları, hangi satırın hangi tarihe ait olduğunu **indeksten** okur. Tarih normal bir sütunda kalırsa bu araçlar çalışmaz.",
                "pandas' time-series tools such as `resample` and `rolling` read which row belongs to which date **from the index**. If the date stays as a plain column, these tools do not work.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`df[\"ciro\"].resample(\"MS\").sum()` ne hesaplar?",
                "What does `df[\"ciro\"].resample(\"MS\").sum()` compute?",
              ],
              options: [
                ["Her ay başına düşen toplam ciroyu", "The total revenue for each month"],
                ["Her haftanın ortalamasını", "The average for each week"],
                ["Tüm verinin tek bir toplamını", "A single grand total of all the data"],
                ["Günlük en yüksek ciroyu", "The highest daily revenue"],
              ],
              answer: 0,
              explain: [
                "`resample(\"MS\")` veriyi ay başlangıcına göre yeniden örnekler; `.sum()` her ay grubunun toplamını alır. `groupby`'ın zaman eksenindeki karşılığı gibi düşünebilirsin.",
                "`resample(\"MS\")` regroups the data by the start of each month; `.sum()` totals each monthly group. You can think of it as `groupby`'s counterpart along the time axis.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`aylik_df[\"ciro\"].rolling(3).mean()` neyi hesaplar?",
                "What does `aylik_df[\"ciro\"].rolling(3).mean()` compute?",
              ],
              options: [
                [
                  "Her satır için son 3 dönemin hareketli ortalamasını",
                  "The moving average of the last 3 periods, for each row",
                ],
                ["Tüm verinin genel ortalamasını, tek bir sayı olarak", "The overall average of all the data, as a single number"],
                ["Yalnızca ilk 3 satırın ortalamasını", "The average of only the first 3 rows"],
                ["3 ile çarpılmış ciroyu", "Revenue multiplied by 3"],
              ],
              answer: 0,
              explain: [
                "`rolling(3)` her satır için kendisi ve önündeki 2 satırdan oluşan bir pencere açar; `.mean()` o pencerenin ortalamasını alır. Sonuç, ay ay dalgalanan veride genel eğilimi görmeni sağlayan **hareketli ortalamadır**.",
                "`rolling(3)` opens a window of the current row plus the 2 before it, for every row; `.mean()` averages that window. The result is a **moving average** that smooths month-to-month noise so you can see the underlying trend.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`aylik_df[\"ciro\"].pct_change().mul(100).round(1)` ne üretir?",
                "What does `aylik_df[\"ciro\"].pct_change().mul(100).round(1)` produce?",
              ],
              options: [
                [
                  "Bir önceki döneme göre yüzde değişimi, bir ondalıkla yuvarlanmış",
                  "The percentage change from the previous period, rounded to one decimal",
                ],
                ["Toplam cironun yüzde kaçı olduğunu", "What percentage of the total revenue each row represents"],
                ["Cironun mutlak farkını (TL cinsinden)", "The absolute difference in revenue (in TL)"],
                ["İlk dönemle son dönem arasındaki farkı", "The difference between the first and last period only"],
              ],
              answer: 0,
              explain: [
                "`pct_change()`, her satırı bir önceki satıra göre oransal olarak karşılaştırır (örn. `0.05` = %5 artış); `.mul(100)` bunu yüzdeye çevirir, `.round(1)` okunabilir hale getirir. Ay ay büyüme/düşüş oranını görmenin standart yoludur.",
                "`pct_change()` compares each row to the one before it as a ratio (e.g. `0.05` means a 5% increase); `.mul(100)` turns that into a percentage, `.round(1)` makes it readable. It is the standard way to see month-over-month growth or decline.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "İki tabloyu `musteri_id` üzerinden **sol birleştirme** ile birleştir ve sonucu `birlesik` değişkenine ata. Eşleşmeyen satır sayısını `eksik` değişkenine yaz.",
                "Left-join the two tables on `musteri_id` into `birlesik`, and store the number of unmatched rows in `eksik`.",
              ],
              starter: `import pandas as pd

siparisler = pd.DataFrame({
    "siparis_id": [1, 2, 3, 4],
    "musteri_id": [10, 11, 12, 99],
    "tutar": [100, 200, 300, 400],
})
musteriler = pd.DataFrame({
    "musteri_id": [10, 11, 12],
    "sehir": ["İstanbul", "Ankara", "İzmir"],
})

birlesik =
eksik = `,
              solution: `import pandas as pd

siparisler = pd.DataFrame({
    "siparis_id": [1, 2, 3, 4],
    "musteri_id": [10, 11, 12, 99],
    "tutar": [100, 200, 300, 400],
})
musteriler = pd.DataFrame({
    "musteri_id": [10, 11, 12],
    "sehir": ["İstanbul", "Ankara", "İzmir"],
})

birlesik = pd.merge(siparisler, musteriler, on="musteri_id", how="left")
eksik = birlesik["sehir"].isna().sum()
print(birlesik)`,
              hint: [
                "`pd.merge(..., on=\"musteri_id\", how=\"left\")`; eşleşmeyenlerde `sehir` NaN olur.",
                "`pd.merge(..., on=\"musteri_id\", how=\"left\")`; unmatched rows get NaN in `sehir`.",
              ],
              checks: [
                {
                  code: "len(birlesik) == 4",
                  msg: ["Sol birleştirme 4 satır vermeli", "The left join must yield 4 rows"],
                },
                {
                  code: "int(eksik) == 1",
                  msg: ["1 sipariş eşleşmemeli", "Exactly 1 order must be unmatched"],
                },
              ],
              xp: 45,
            }),
          ],
        }),

        lesson({
          slug: "gorsellestirme",
          title: L("Python ile görselleştirme", "Visualisation with Python"),
          summary: L(
            "matplotlib, seaborn ve plotly arasında ne zaman hangisini seçmelisin?",
            "When to reach for matplotlib, seaborn or plotly.",
          ),
          minutes: 15,
          blocks: [
            text(
              "- **matplotlib** — her şeyin altındaki motor. Tam kontrol, çok satır kod.\n- **seaborn** — istatistiksel grafikler için matplotlib üstünde kısayol. Keşif aşamasının varsayılanı.\n- **plotly** — etkileşimli grafikler; sunum ve web panosu için.\n- **pandas `.plot()`** — hızlı bakış için tek satır.",
              "- **matplotlib** — the engine underneath everything. Full control, more lines.\n- **seaborn** — a shortcut over matplotlib for statistical charts. The default while exploring.\n- **plotly** — interactive charts, for presentations and web dashboards.\n- **pandas `.plot()`** — one line for a quick look.",
            ),
            quiz({
              id: "q2",
              q: [
                "matplotlib metinde nasıl tanımlanıyor?",
                "How does the text describe matplotlib?",
              ],
              options: [
                ["Her şeyin altındaki motor — tam kontrol ama daha çok satır", "The engine underneath everything — full control but more lines"],
                ["Yalnızca etkileşimli grafikler için", "Only for interactive charts"],
                ["Yalnızca sunumlar için tasarlanmış", "Designed only for presentations"],
                ["pandas'ın bir parçası, ayrı bir kütüphane değil", "Part of pandas, not a separate library"],
              ],
              answer: 0,
              explain: [
                "matplotlib, diğer kütüphanelerin (seaborn dahil) üzerine kurulduğu temel katmandır. Her ayrıntıyı kontrol edebilirsin ama bu genelde daha fazla satır kod yazmak demektir.",
                "matplotlib is the foundational layer that other libraries (including seaborn) are built on top of. You can control every detail, but that usually means writing more lines of code.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Metne göre, keşif aşamasının varsayılan aracı hangisidir?",
                "According to the text, which is the default tool while exploring data?",
              ],
              options: [
                ["seaborn", "seaborn"],
                ["plotly", "plotly"],
                ["matplotlib", "matplotlib"],
                ["Hiçbiri, hepsi eşit önceliklidir", "None — they are all equal priority"],
              ],
              answer: 0,
              explain: [
                "seaborn, matplotlib üzerine kurulu bir kısayoldur ve istatistiksel grafikleri az kodla üretir; bu yüzden metin onu keşif aşamasının varsayılanı olarak önerir.",
                "seaborn is a shortcut built on matplotlib that produces statistical charts with little code, which is why the text recommends it as the default while exploring.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "plotly hangi kullanım durumu için önerilir?",
                "For which use case is plotly recommended?",
              ],
              options: [
                ["Etkileşimli grafikler — sunum ve web panosu", "Interactive charts — presentations and web dashboards"],
                ["Yalnızca statik PNG üretimi", "Only producing static PNGs"],
                ["Yalnızca çok büyük veri setleri", "Only very large datasets"],
                ["Yalnızca tek değişkenli grafikler", "Only single-variable charts"],
              ],
              answer: 0,
              explain: [
                "plotly'nin gücü etkileşimliliktir — yakınlaştırma, üzerine gelince değer gösterme gibi. Bu, statik bir rapordan çok canlı bir sunum veya web panosunda değerlidir.",
                "plotly's strength is interactivity — zooming, hovering to see values. That matters far more in a live presentation or web dashboard than in a static report.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "pandas'ın `.plot()` metodu ne zaman tercih edilir?",
                "When is pandas' `.plot()` method the right choice?",
              ],
              options: [
                ["Hızlı bir bakış için, tek satırda", "For a quick look, in a single line"],
                ["Yayına hazır, etkileşimli sunum grafikleri için", "For publication-ready, interactive presentation charts"],
                ["Yalnızca çok büyük veri setlerinde", "Only for very large datasets"],
                ["Hiçbir zaman, seaborn her zaman tercih edilmelidir", "Never — seaborn should always be preferred instead"],
              ],
              answer: 0,
              explain: [
                "`df[\"ciro\"].plot()` gibi tek satırlık bir çağrı, veriye hızlıca göz atmak için idealdir. Sunuma hazır, ayrıntılı bir grafik gerektiğinde seaborn veya matplotlib'e geçilir.",
                "A one-line call like `df[\"ciro\"].plot()` is ideal for a quick glance at the data. When you need a polished, presentation-ready chart, you move to seaborn or matplotlib.",
              ],
            }),
            code(
              "python",
              `import matplotlib.pyplot as plt
import seaborn as sns

fig, ax = plt.subplots(figsize=(9, 5))
sns.barplot(data=ozet, x="kategori", y="toplam_ciro", ax=ax)
ax.set_title("Kategori bazında ciro (2024)")
ax.set_xlabel("")
ax.set_ylabel("Ciro (TL)")
ax.bar_label(ax.containers[0], fmt="%.0f")
sns.despine()
fig.tight_layout()
fig.savefig("ciro.png", dpi=150)`,
              "Başlık, eksen etiketi ve değer etiketi olmayan grafik yarım kalmıştır",
              "A chart without a title, axis labels and value labels is unfinished",
            ),
            quiz({
              id: "q6",
              q: [
                "`fig, ax = plt.subplots(figsize=(9, 5))` satırı ne yapar?",
                "What does the line `fig, ax = plt.subplots(figsize=(9, 5))` do?",
              ],
              options: [
                [
                  "Belirli bir boyutta boş bir figür ve üzerine çizim yapılacak eksen nesnesi oluşturur",
                  "Creates an empty figure of a given size, plus an axes object to draw on",
                ],
                ["Veriyi doğrudan çizer, veri gerektirmez", "Draws the data directly, without needing any data"],
                ["Grafik dosyasını diske kaydeder", "Saves the chart file to disk"],
                ["Yalnızca `figsize` parametresini doğrular, çizim yapmaz", "Only validates the `figsize` parameter, without drawing"],
              ],
              answer: 0,
              explain: [
                "`plt.subplots()` iki nesne döner: `fig` (tüm görselin çerçevesi) ve `ax` (üzerine çizim yapılan eksen). `figsize=(9, 5)` genişlik-yükseklik oranını inç cinsinden belirler. Sonraki tüm çizim komutları `ax` üzerinden çağrılır.",
                "`plt.subplots()` returns two objects: `fig` (the overall canvas) and `ax` (the axes you draw on). `figsize=(9, 5)` sets the width-height ratio in inches. Every subsequent drawing call is made on `ax`.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Metne göre, başlığı, eksen etiketi ve değer etiketi olmayan bir grafik için ne söylenebilir?",
                "According to the caption, what can be said about a chart with no title, axis labels or value labels?",
              ],
              options: [
                ["Yarım kalmıştır", "It is unfinished"],
                ["Daha profesyonel görünür", "It looks more professional"],
                ["Daha hızlı yüklenir", "It loads faster"],
                ["Yalnızca sunumlarda sorun olur, raporlarda olmaz", "It is only a problem in presentations, not in reports"],
              ],
              answer: 0,
              explain: [
                "Bir grafiğin okuyucuya bir şey anlatabilmesi için ne gösterdiğini (başlık), eksenlerin ne olduğunu (etiket) ve tam değerleri (değer etiketi) belirtmesi gerekir. Bunlar eksikse grafik güzel görünse de mesajını iletemez.",
                "For a chart to actually tell the reader something, it needs to state what it shows (title), what the axes are (labels), and the exact values (value labels). Without these, a chart can look nice but fail to communicate its message.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`ax.bar_label(ax.containers[0], fmt=\"%.0f\")` satırı çubuk grafiğe ne ekler?",
                "What does `ax.bar_label(ax.containers[0], fmt=\"%.0f\")` add to a bar chart?",
              ],
              options: [
                [
                  "Her çubuğun tepesine tam sayı olarak değer etiketi",
                  "A value label on top of each bar, formatted as a whole number",
                ],
                ["Çubukların rengini değiştirir", "It changes the bars' colour"],
                ["X eksenini kaldırır", "It removes the x-axis"],
                ["Grafiği yatay hale getirir", "It turns the chart horizontal"],
              ],
              answer: 0,
              explain: [
                "`bar_label`, her çubuğun üzerine sayısal değerini yazar; `fmt=\"%.0f\"` bu değeri ondalıksız (tam sayı) gösterir. Okuyucunun çubuğun yüksekliğini gözle tahmin etmesine gerek kalmaz.",
                "`bar_label` writes each bar's numeric value above it; `fmt=\"%.0f\"` formats it as a whole number with no decimals. The reader no longer has to eyeball the bar's height.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`fig.savefig(\"ciro.png\", dpi=150)` içindeki `dpi` parametresi neyi kontrol eder?",
                "What does the `dpi` parameter in `fig.savefig(\"ciro.png\", dpi=150)` control?",
              ],
              options: [
                ["Kaydedilen görüntünün çözünürlüğünü (inç başına nokta sayısı)", "The saved image's resolution (dots per inch)"],
                ["Dosyanın hangi formatta kaydedileceğini", "Which file format it is saved as"],
                ["Grafiğin renklerini", "The chart's colours"],
                ["Grafiğin başlığını", "The chart's title"],
              ],
              answer: 0,
              explain: [
                "`dpi` (dots per inch), görüntünün ne kadar keskin/yüksek çözünürlüklü kaydedileceğini belirler. Sunum veya baskı için yüksek `dpi` (150-300), yalnızca ekranda görüntülemek içinse daha düşük değer yeterlidir.",
                "`dpi` (dots per inch) determines how sharp and high-resolution the saved image is. A higher `dpi` (150-300) suits presentations or print; a lower value is fine for on-screen viewing only.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Zaman içindeki değişimi göstermek için hangi grafik türü uygundur?",
                "Which chart type fits change over time?",
              ],
              options: [
                ["Çizgi grafiği", "Line chart"],
                ["Pasta grafiği", "Pie chart"],
                ["Dağılım grafiği (scatter)", "Scatter plot"],
                ["Isı haritası", "Heatmap"],
              ],
              answer: 0,
              explain: [
                "Çizgi, sürekli bir eksende (zaman) trendi gösterir. Pasta yalnızca bir bütünün parçalarını, üstelik 4-5 kategoriden fazlası olmadan gösterir; iki değişken arasındaki ilişki için scatter, iki kategorik boyutun kesişimi için ısı haritası kullanılır.",
                "A line shows a trend along a continuous axis. Pie only shows parts of a whole, and only with a handful of slices; scatter shows the relationship between two variables, and a heatmap the intersection of two categorical dimensions.",
              ],
            }),
            tip(
              "Renk, süs değil bilgi taşımalı",
              "Colour should carry information, not decoration",
              "Her çubuğu farklı renk yapmak bilgi eklemez, gürültü ekler. Tek bir vurgu rengi seç, vurgulamak istediğin çubuğu onunla boya, gerisini nötr gri bırak. Okuyucunun gözü doğrudan mesaja gider.",
              "Giving every bar its own colour adds noise, not information. Pick one accent colour, use it on the bar you want to highlight, and leave the rest neutral grey. The reader's eye goes straight to the message.",
            ),
            quiz({
              id: "q10",
              q: [
                "İpucuna göre, her çubuğu farklı renk yapmanın etkisi nedir?",
                "According to the tip, what is the effect of giving every bar its own colour?",
              ],
              options: [
                ["Bilgi eklemez, gürültü ekler", "It adds no information, only noise"],
                ["Grafiği daha hızlı yükler", "It makes the chart load faster"],
                ["Okuyucunun mesajı daha hızlı bulmasını sağlar", "It helps the reader find the message faster"],
                ["dpi değerini otomatik yükseltir", "It automatically raises the dpi value"],
              ],
              answer: 0,
              explain: [
                "Renk, farklılaştığı her yerde okuyucunun dikkatini çeker. Her çubuk farklı renkse göz nereye bakacağını şaşırır; bu bilgi değil gürültüdür.",
                "Colour draws the eye everywhere it changes. If every bar has a different colour, the eye has nowhere obvious to land — that is noise, not information.",
              ],
            }),
            quiz({
              id: "q11",
              q: [
                "İpucuna göre bir çubuk grafikte tek bir çubuğu vurgulamak için önerilen yaklaşım nedir?",
                "According to the tip, what is the recommended way to highlight a single bar in a bar chart?",
              ],
              options: [
                [
                  "Tek bir vurgu rengi seçip yalnızca o çubuğa uygulamak, gerisini nötr gri bırakmak",
                  "Pick one accent colour, apply it only to that bar, and leave the rest neutral grey",
                ],
                ["Tüm çubukları farklı renklere boyamak", "Paint every bar a different colour"],
                ["Vurgulanacak çubuğu kaldırmak", "Remove the bar you want to highlight"],
                ["Tüm çubukları aynı canlı renge boyamak", "Paint every bar the same bright colour"],
              ],
              answer: 0,
              explain: [
                "Tek bir vurgu rengi + nötr gri arka plan, okuyucunun gözünü doğrudan vurgulanan çubuğa yönlendirir. Bu, renk paletini büyütmekten çok daha etkilidir.",
                "One accent colour against a neutral grey background sends the reader's eye straight to the highlighted bar — far more effective than expanding the colour palette.",
              ],
            }),
          ],
        }),

        lesson({
          slug: "performans-ve-kalite",
          title: L("Performans ve kod kalitesi", "Performance and code quality"),
          summary: L(
            "Vektörel düşünmek, bellek yönetimi ve altı ay sonra okunabilen analiz kodu.",
            "Thinking in vectors, managing memory, and analysis code you can still read in six months.",
          ),
          minutes: 15,
          blocks: [
            text(
              "pandas'ta hız sıralaması nettir: **vektörel işlem > `.map()` > `.apply()` > `iterrows()`**. `iterrows()` neredeyse her zaman yanlış cevaptır; bir milyon satırda dakikalar sürer, vektörel karşılığı saniyenin altındadır.",
              "The speed ranking in pandas is clear: **vectorised ops > `.map()` > `.apply()` > `iterrows()`**. `iterrows()` is almost always the wrong answer; on a million rows it takes minutes where the vectorised version takes under a second.",
            ),
            quiz({
              id: "q2",
              q: [
                "Metindeki hız sıralamasına göre en yavaştan en hızlıya doğru doğru sıralama hangisidir?",
                "According to the speed ranking in the text, which order goes from slowest to fastest?",
              ],
              options: [
                [
                  "iterrows() < apply() < map() < vektörel işlem",
                  "iterrows() < apply() < map() < vectorised op",
                ],
                ["vektörel işlem < map() < apply() < iterrows()", "vectorised op < map() < apply() < iterrows()"],
                ["Hepsi aynı hızdadır", "They are all the same speed"],
                ["apply() < iterrows() < vektörel işlem < map()", "apply() < iterrows() < vectorised op < map()"],
              ],
              answer: 0,
              explain: [
                "Metin sıralamayı 'vektörel işlem > .map() > .apply() > iterrows()' olarak verir; yani en yavaş iterrows(), en hızlı vektörel işlemdir.",
                "The text gives the order as 'vectorised op > .map() > .apply() > iterrows()' — so iterrows() is slowest and the vectorised op is fastest.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir milyon satırlık bir DataFrame'de `iterrows()` kullanmanın metne göre sonucu nedir?",
                "According to the text, what happens when you use `iterrows()` on a million-row DataFrame?",
              ],
              options: [
                ["Dakikalar sürer, oysa vektörel karşılığı saniyenin altındadır", "It takes minutes, while the vectorised equivalent takes under a second"],
                ["Vektörel işlemle aynı hızdadır", "It runs at the same speed as the vectorised op"],
                ["Bellek hatası verir, hiç çalışmaz", "It throws a memory error and never runs"],
                ["Sadece ilk 1000 satırı işler", "It only processes the first 1000 rows"],
              ],
              answer: 0,
              explain: [
                "iterrows() her satırı Python seviyesinde tek tek dolaşır; bir milyon satırda bu dakikalar sürebilirken, vektörel karşılığı saniyenin altında biter.",
                "iterrows() walks every row one by one at the Python level; on a million rows that can take minutes, while the vectorised equivalent finishes in under a second.",
              ],
            }),
            code(
              "python",
              `# Yavaş
df["kdvli"] = df.apply(lambda r: r["fiyat"] * 1.2, axis=1)

# Hızlı
df["kdvli"] = df["fiyat"] * 1.2

# Koşullu türetme: np.where / np.select
import numpy as np
df["segment"] = np.select(
    [df["fiyat"] < 500, df["fiyat"] < 3000],
    ["ekonomik", "orta"],
    default="premium",
)

# Bellek: kategorik tip tekrar eden metinlerde çok yer kazandırır
df["sehir"] = df["sehir"].astype("category")
print(df.memory_usage(deep=True).sum() / 1e6, "MB")`,
            ),
            quiz({
              id: "q4",
              q: [
                "Yukarıdaki kodda `fiyat` değeri 1000 olan bir satır için `segment` sütunu ne olur?",
                "In the code above, for a row where `fiyat` is 1000, what does the `segment` column become?",
              ],
              options: [
                ["\"orta\"", "\"orta\" (mid)"],
                ["\"ekonomik\"", "\"ekonomik\" (economy)"],
                ["\"premium\"", "\"premium\""],
                ["Hata verir", "It raises an error"],
              ],
              answer: 0,
              explain: [
                "np.select koşulları sırayla dener: 1000, 500'den küçük değildir (ilk koşul yanlış) ama 3000'den küçüktür (ikinci koşul doğru), bu yüzden ikinci karşılık olan \"orta\" atanır.",
                "np.select checks conditions in order: 1000 is not less than 500 (first condition false) but is less than 3000 (second condition true), so it gets the second choice, \"orta\" (mid).",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`np.select` çağrısındaki `default=\"premium\"` parametresi ne işe yarar?",
                "What does the `default=\"premium\"` parameter do in the `np.select` call?",
              ],
              options: [
                [
                  "Verilen koşulların hiçbiri doğru olmayan satırlara atanacak değeri belirler",
                  "It sets the value assigned to rows where none of the given conditions is true",
                ],
                ["İlk koşulu geçersiz kılar", "It overrides the first condition"],
                ["Sütunun veri tipini belirler", "It sets the column's data type"],
                ["Yalnızca boş (NaN) değerler için kullanılır", "It is only used for missing (NaN) values"],
              ],
              answer: 0,
              explain: [
                "Koşul listesindeki hiçbir koşul doğru değilse (yani fiyat 3000'den büyük veya eşitse) `default` değeri kullanılır — burada \"premium\".",
                "When none of the listed conditions is true (i.e. fiyat is 3000 or more) the `default` value is used — here \"premium\".",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`df[\"sehir\"] = df[\"sehir\"].astype(\"category\")` satırının amacı nedir?",
                "What is the purpose of `df[\"sehir\"] = df[\"sehir\"].astype(\"category\")`?",
              ],
              options: [
                [
                  "Tekrar eden metin değerlerini bellekte daha az yer kaplayacak şekilde saklamak",
                  "To store repeated text values in a way that takes up less memory",
                ],
                ["Sütunu sayısal tipe çevirmek", "To convert the column to a numeric type"],
                ["Sütundaki boş değerleri silmek", "To remove missing values in the column"],
                ["Sütunu alfabetik sıraya dizmek", "To sort the column alphabetically"],
              ],
              answer: 0,
              explain: [
                "`sehir` gibi az sayıda benzersiz değere sahip metin sütunları `category` tipine çevrildiğinde, her benzersiz metin bir kez saklanır ve satırlarda küçük kod numaraları tutulur — bellek kullanımı ciddi şekilde düşer.",
                "When a text column with few unique values, like `sehir`, is converted to `category`, each unique string is stored once and rows keep small code numbers instead — memory use drops significantly.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`df.memory_usage(deep=True).sum()` ne hesaplar?",
                "What does `df.memory_usage(deep=True).sum()` compute?",
              ],
              options: [
                ["DataFrame'in bellekte kapladığı toplam bayt sayısını", "The total number of bytes the DataFrame occupies in memory"],
                ["DataFrame'deki satır sayısını", "The number of rows in the DataFrame"],
                ["Diskte kapladığı dosya boyutunu", "The file size it occupies on disk"],
                ["Sütun sayısını", "The number of columns"],
              ],
              answer: 0,
              explain: [
                "`memory_usage(deep=True)` her sütunun bayt cinsinden bellek kullanımını verir; `deep=True` metin (object) sütunlarının gerçek içerik boyutunu da hesaba katar. `.sum()` bunları toplar.",
                "`memory_usage(deep=True)` reports each column's memory use in bytes; `deep=True` also accounts for the actual content size of text (object) columns. `.sum()` adds them up.",
              ],
            }),
            text(
              "Tekrarlanabilirlik, hızdan daha değerlidir. Bir analiz betiği şu üç şeyi sağlamalı: **kaynak veri sabit**, **adımlar sıralı ve yorumlu**, **çıktı tek komutla yeniden üretilebilir**.",
              "Reproducibility beats speed. An analysis script should guarantee three things: **a fixed source dataset**, **ordered and commented steps**, and **an output you can regenerate with one command**.",
            ),
            quiz({
              id: "q8",
              q: [
                "Metne göre bir analiz betiğinin sağlaması gereken üç şey nedir?",
                "According to the text, what three things should an analysis script guarantee?",
              ],
              options: [
                [
                  "Kaynak veri sabit, adımlar sıralı ve yorumlu, çıktı tek komutla yeniden üretilebilir",
                  "A fixed source dataset, ordered and commented steps, and an output you can regenerate with one command",
                ],
                ["En hızlı kod, en az satır sayısı, en az yorum", "The fastest code, the fewest lines, the fewest comments"],
                ["En yeni kütüphane sürümü, en çok test, en büyük veri seti", "The newest library version, the most tests, the largest dataset"],
                ["Renkli grafikler, kısa değişken adları, tek dosya", "Colourful charts, short variable names, a single file"],
              ],
              answer: 0,
              explain: [
                "Metin, tekrarlanabilirliğin hızdan daha değerli olduğunu ve bunun için sabit kaynak veri, sıralı/yorumlu adımlar ve tek komutla yeniden üretilebilir çıktı gerektiğini söyler.",
                "The text says reproducibility beats speed, and that this requires a fixed source dataset, ordered/commented steps, and an output reproducible with a single command.",
              ],
            }),
            code(
              "python",
              `# Zincirleme okunur bir dönüşüm hattı
rapor = (
    df
    .query("status == 'teslim'")
    .assign(ciro=lambda d: d["fiyat"] * d["adet"])
    .groupby("kategori", as_index=False)
    .agg(toplam=("ciro", "sum"), adet=("ciro", "size"))
    .sort_values("toplam", ascending=False)
)`,
              "Yöntem zinciri: her adım tek satır, ara değişken yok",
              "Method chaining: one line per step, no intermediate variables",
            ),
            quiz({
              id: "q9",
              q: [
                "Yukarıdaki zincirde `.query(\"status == 'teslim'\")` ne yapar?",
                "What does `.query(\"status == 'teslim'\")` do in the chain above?",
              ],
              options: [
                ["status sütunu 'teslim' olan satırları filtreler", "It filters rows where the status column is 'teslim'"],
                ["status sütununu siler", "It deletes the status column"],
                ["Tüm satırları sıralar", "It sorts all the rows"],
                ["Yeni bir status sütunu oluşturur", "It creates a new status column"],
              ],
              answer: 0,
              explain: [
                "`.query()` bir koşul ifadesi alır ve yalnızca o koşulu sağlayan satırları döndürür — burada status'u 'teslim' olan satırlar kalır.",
                "`.query()` takes a condition string and returns only the rows that satisfy it — here, the rows whose status is 'teslim'.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "`.assign(ciro=lambda d: d[\"fiyat\"] * d[\"adet\"])` zincire ne katar?",
                "What does `.assign(ciro=lambda d: d[\"fiyat\"] * d[\"adet\"])` add to the chain?",
              ],
              options: [
                [
                  "fiyat ve adet çarpımından yeni bir ciro sütunu oluşturur",
                  "It creates a new ciro column as the product of fiyat and adet",
                ],
                ["fiyat sütununu ciro ile değiştirir, adet'i siler", "It replaces fiyat with ciro and deletes adet"],
                ["Yalnızca satırları filtreler", "It only filters rows"],
                ["DataFrame'i diske kaydeder", "It saves the DataFrame to disk"],
              ],
              answer: 0,
              explain: [
                "`.assign()` mevcut sütunları koruyarak yeni bir sütun ekler; burada `ciro`, o anki (filtrelenmiş) DataFrame'in `fiyat` ve `adet` sütunlarının çarpımı olarak hesaplanır.",
                "`.assign()` adds a new column while keeping the existing ones; here `ciro` is computed as the product of the current (filtered) DataFrame's `fiyat` and `adet` columns.",
              ],
            }),
            quiz({
              id: "q11",
              q: [
                "Metne/başlığa göre yöntem zincirinin (`method chaining`) faydası nedir?",
                "According to the caption, what is the benefit of method chaining?",
              ],
              options: [
                [
                  "Her adım tek satırdır, ara değişkene gerek kalmaz",
                  "Each step is one line, with no need for intermediate variables",
                ],
                ["Kodu daha yavaş çalıştırır", "It makes the code run slower"],
                ["Yalnızca SQL sorgularında kullanılabilir", "It can only be used in SQL queries"],
                ["Hata mesajlarını gizler", "It hides error messages"],
              ],
              answer: 0,
              explain: [
                "Zincirleme, her dönüşüm adımını tek satırda tutar ve `rapor2 = ...`, `rapor3 = ...` gibi ara değişkenlere gerek bırakmaz; bu da kodu baştan sona okumayı kolaylaştırır.",
                "Chaining keeps each transformation step to one line and avoids intermediate variables like `report2 = ...`, `report3 = ...`, which makes the code easier to read top to bottom.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "1 milyon satırda `df[\"a\"] * 2` ile `df.apply(lambda r: r[\"a\"] * 2, axis=1)` arasındaki temel fark nedir?",
                "On a million rows, what is the key difference between `df[\"a\"] * 2` and `df.apply(lambda r: r[\"a\"] * 2, axis=1)`?",
              ],
              options: [
                [
                  "Vektörel işlem C seviyesinde tek seferde çalışır; apply her satır için Python fonksiyonu çağırır",
                  "The vectorised op runs once at C level; apply calls a Python function per row",
                ],
                ["Sonuçları farklıdır", "They produce different results"],
                ["apply daha az bellek kullanır", "apply uses less memory"],
                ["Fark yoktur, sadece yazım tercihi", "No difference, just style"],
              ],
              answer: 0,
              explain: [
                "Vektörel işlemler NumPy üzerinden derlenmiş kodda toplu çalışır. `apply` ise satır başına Python yorumlayıcısına dönüş yapar; bu geçiş maliyeti milyon kez ödendiğinde 100 kata varan fark oluşur.",
                "Vectorised operations run in compiled NumPy code over the whole array. `apply` returns to the Python interpreter for every row, and paying that cost a million times produces differences up to 100×.",
              ],
              xp: 20,
            }),
          ],
        }),
        lesson({
          slug: "ileri-donusumler",
          title: L("Geniş, uzun ve MultiIndex", "Wide, long and MultiIndex"),
          summary: L(
            "melt, pivot ve stack: aynı veriyi soruna uygun şekle sokmak.",
            "melt, pivot and stack: reshaping the same data to fit the question.",
          ),
          minutes: 18,
          blocks: [
            text(
              "Aynı veri iki biçimde durabilir:\n\n**Geniş (wide)** — insan gözüne kolay, her ay bir sütun:\n\n| urun | ocak | subat | mart |\n|---|---|---|---|\n| Kulaklık | 12 | 15 | 9 |\n\n**Uzun (long / tidy)** — makineye kolay, her satır bir gözlem:\n\n| urun | ay | adet |\n|---|---|---|\n| Kulaklık | ocak | 12 |\n| Kulaklık | subat | 15 |\n\nGörselleştirme kütüphaneleri, gruplama ve modelleme neredeyse her zaman **uzun** biçimi ister. Sunum tabloları ise **geniş** olur. Aralarında gidip gelmeyi bilmek analiz hızını doğrudan belirler.",
              "The same data can sit in two shapes:\n\n**Wide** — easy on the human eye, one column per month:\n\n| product | jan | feb | mar |\n|---|---|---|---|\n| Headphones | 12 | 15 | 9 |\n\n**Long (tidy)** — easy on the machine, one observation per row:\n\n| product | month | qty |\n|---|---|---|\n| Headphones | jan | 12 |\n| Headphones | feb | 15 |\n\nPlotting libraries, grouping and modelling almost always want the **long** shape. Presentation tables want the **wide** one. Knowing how to move between them directly determines how fast you can work.",
            ),
            quiz({
              id: "q2",
              q: [
                "Metne göre sunum tabloları genellikle hangi biçimde olur?",
                "According to the text, which shape do presentation tables usually take?",
              ],
              options: [
                ["Geniş biçim", "Wide"],
                ["Uzun biçim", "Long"],
                ["Her zaman MultiIndex biçimi", "Always MultiIndex form"],
                ["Hiçbiri, tablo kullanılmaz", "Neither — tables are not used"],
              ],
              answer: 0,
              explain: [
                "Geniş biçim insan gözüne kolaydır — her ay ayrı bir sütundur ve bir bakışta karşılaştırma yapılabilir. Bu yüzden sunum tabloları genelde geniş olur.",
                "Wide form is easy on the human eye — each month is its own column, easy to compare at a glance. That is why presentation tables are usually wide.",
              ],
            }),
            code(
              "python",
              `import pandas as pd

genis = pd.DataFrame({
    "urun":  ["Kulaklık", "Klavye"],
    "ocak":  [12, 8],
    "subat": [15, 11],
})

# Geniş -> uzun
uzun = genis.melt(
    id_vars="urun",          # sabit kalacak sütun(lar)
    var_name="ay",           # sütun adlarının gideceği yeni sütun
    value_name="adet",       # değerlerin gideceği yeni sütun
)

# Uzun -> geniş (melt'in tersi)
tekrar_genis = uzun.pivot(index="urun", columns="ay", values="adet").reset_index()`,
            ),
            quiz({
              id: "q3",
              q: [
                "`genis.melt(id_vars=\"urun\", ...)` çağrısında `id_vars` parametresi ne belirtir?",
                "In `genis.melt(id_vars=\"urun\", ...)`, what does the `id_vars` parameter specify?",
              ],
              options: [
                ["Erimeden sabit kalacak sütun(lar)ı", "The column(s) that stay fixed and are not melted"],
                ["Yeni oluşacak sütunun adını", "The name of the newly created column"],
                ["Değerlerin gideceği sütunun adını", "The name of the column the values go into"],
                ["Silinecek sütunları", "The columns to be deleted"],
              ],
              answer: 0,
              explain: [
                "`id_vars`, hangi sütun(lar)ın her satırda aynı kalacağını, yani erimeyeceğini belirtir. Burada `urun` her satırda tekrar eder, ay sütunları ise tek bir sütuna erir.",
                "`id_vars` specifies which column(s) stay the same on every row instead of being melted. Here `urun` repeats on every row, while the month columns melt into a single column.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`var_name=\"ay\"` parametresi melt sonucunda neyi belirler?",
                "What does the `var_name=\"ay\"` parameter determine in the melt result?",
              ],
              options: [
                [
                  "Eski sütun adlarının (ocak, subat) taşınacağı yeni sütunun adını",
                  "The name of the new column that the old column names (ocak, subat) move into",
                ],
                ["Değerlerin taşınacağı sütunun adını", "The name of the column the values move into"],
                ["Sabit kalacak sütunun adını", "The name of the column that stays fixed"],
                ["DataFrame'in genel adını", "The overall name of the DataFrame"],
              ],
              answer: 0,
              explain: [
                "melt öncesi `ocak`, `subat` birer sütun adıydı. melt sonrası bu adlar tek bir sütunun **değerleri** olur; o sütunun adı `var_name` ile belirlenir — burada `ay`.",
                "Before melt, `ocak` and `subat` were column names. After melt, those names become the **values** of a single column; that column's name is set by `var_name` — here, `ay`.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`value_name=\"adet\"` parametresi ne işe yarar?",
                "What does the `value_name=\"adet\"` parameter do?",
              ],
              options: [
                ["Eski hücre değerlerinin taşınacağı yeni sütuna ad verir", "It names the new column that the old cell values move into"],
                ["Sabit kalacak sütunu belirler", "It determines which column stays fixed"],
                ["Sütun sayısını sınırlar", "It limits the number of columns"],
                ["Veri tipini değiştirir", "It changes the data type"],
              ],
              answer: 0,
              explain: [
                "Geniş tablodaki hücre değerleri (12, 15, 8, 11...) uzun biçimde tek bir sütuna toplanır; o sütunun adı `value_name` ile verilir — burada `adet`.",
                "The cell values from the wide table (12, 15, 8, 11...) are gathered into a single column in long form; that column's name is set by `value_name` — here, `adet`.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`uzun.pivot(index=\"urun\", columns=\"ay\", values=\"adet\")` ne yapar?",
                "What does `uzun.pivot(index=\"urun\", columns=\"ay\", values=\"adet\")` do?",
              ],
              options: [
                [
                  "melt'in tersini yapar: uzun biçimi tekrar geniş biçime çevirir",
                  "It does the opposite of melt: turns the long shape back into wide",
                ],
                ["Verideki yinelenen satırları siler", "It deletes duplicate rows in the data"],
                ["Sütunları alfabetik sıraya dizer", "It sorts the columns alphabetically"],
                ["Yeni bir veri kaynağından okuma yapar", "It reads from a new data source"],
              ],
              answer: 0,
              explain: [
                "`pivot`, `ay` sütunundaki değerleri (ocak, subat) tekrar ayrı sütunlara dönüştürür ve `adet` değerlerini o sütunlara yerleştirir — melt'in tam tersi.",
                "`pivot` turns the values in the `ay` column (ocak, subat) back into separate columns and places the `adet` values into them — the exact reverse of melt.",
              ],
            }),
            text(
              "**MultiIndex**, birden çok sütuna göre grupladığında ortaya çıkar:\n\n```python\nozet = df.groupby([\"sehir\", \"segment\"])[\"ciro\"].sum()\nozet.loc[\"İstanbul\"]              # tek seviye seç\nozet.unstack()                     # ikinci seviyeyi sütuna çevir\nozet.reset_index()                 # düz DataFrame'e dön\n```\n\nMultiIndex güçlüdür ama okuması zordur. Pratik tavsiye: hesabı MultiIndex ile yap, sonucu paylaşmadan önce `reset_index()` ile düzleştir. Böylece hem hesap kısa olur hem çıktı herkesin anlayabileceği düz bir tablo.",
              "A **MultiIndex** appears when you group by more than one column:\n\n```python\nsummary = df.groupby([\"city\", \"segment\"])[\"revenue\"].sum()\nsummary.loc[\"İstanbul\"]           # select one level\nsummary.unstack()                  # move the second level into columns\nsummary.reset_index()              # return to a flat DataFrame\n```\n\nA MultiIndex is powerful but hard to read. Practical advice: compute with it, then flatten with `reset_index()` before sharing. That keeps the computation short and the output a flat table anyone can read.",
            ),
            quiz({
              id: "q7",
              q: [
                "Metne göre bir MultiIndex ne zaman ortaya çıkar?",
                "According to the text, when does a MultiIndex appear?",
              ],
              options: [
                ["Birden çok sütuna göre gruplandığında", "When you group by more than one column"],
                ["Bir DataFrame okunduğunda her zaman", "Always, whenever a DataFrame is read"],
                ["Yalnızca melt kullanıldığında", "Only when melt is used"],
                ["Yalnızca CSV dosyalarında", "Only in CSV files"],
              ],
              answer: 0,
              explain: [
                "Örnekte `df.groupby([\"sehir\", \"segment\"])` iki sütuna göre gruplama yapar; sonuç, iki seviyeli bir MultiIndex ile döner.",
                "In the example, `df.groupby([\"sehir\", \"segment\"])` groups by two columns; the result comes back with a two-level MultiIndex.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`ozet.unstack()` bir MultiIndex üzerinde ne yapar?",
                "What does `ozet.unstack()` do on a MultiIndex?",
              ],
              options: [
                ["İkinci seviyeyi satırlardan sütunlara taşır", "It moves the second level from rows into columns"],
                ["Tüm indeksi siler", "It deletes the entire index"],
                ["Veriyi sıfırdan yeniden okur", "It re-reads the data from scratch"],
                ["Yalnızca ilk seviyeyi gösterir, ikinciyi atar", "It shows only the first level and drops the second"],
              ],
              answer: 0,
              explain: [
                "`unstack()`, MultiIndex'in ikinci seviyesini (örneğin `segment`) sütun başlıklarına dönüştürür; böylece veri daha geniş, tablo biçiminde görünür.",
                "`unstack()` turns the MultiIndex's second level (e.g. `segment`) into column headers, so the data appears in a wider, table-like shape.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "MultiIndex'li bir sonuç üzerinde `.reset_index()` çağırmanın etkisi nedir?",
                "What is the effect of calling `.reset_index()` on a MultiIndex result?",
              ],
              options: [
                ["İndeksleri sıradan sütunlara çevirip düz bir DataFrame'e döner", "It turns the index levels into ordinary columns, returning a flat DataFrame"],
                ["Veriyi tamamen siler", "It deletes the data entirely"],
                ["Gruplama işlemini geri alır", "It undoes the groupby operation"],
                ["Yalnızca sütun adlarını büyük harfe çevirir", "It only capitalises the column names"],
              ],
              answer: 0,
              explain: [
                "`reset_index()`, MultiIndex'in seviyelerini normal sütunlara çevirir ve 0'dan başlayan varsayılan bir sıra indeksi atar — sonuç, herkesin kolayca okuyabileceği düz bir tablodur.",
                "`reset_index()` converts the MultiIndex levels into regular columns and assigns a default 0-based row index — the result is a flat table anyone can read easily.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Metindeki pratik tavsiyeye göre MultiIndex ile nasıl çalışılmalı?",
                "According to the text's practical advice, how should you work with a MultiIndex?",
              ],
              options: [
                [
                  "Hesabı MultiIndex ile yap, paylaşmadan önce reset_index() ile düzleştir",
                  "Compute with the MultiIndex, then flatten with reset_index() before sharing",
                ],
                ["MultiIndex'i hiçbir zaman kullanma", "Never use a MultiIndex at all"],
                ["MultiIndex'i her zaman CSV olarak öylece kaydet", "Always save the MultiIndex to CSV as-is"],
                ["MultiIndex'i unstack etmeden asla paylaşma", "Never share a MultiIndex without unstacking it first"],
              ],
              answer: 0,
              explain: [
                "MultiIndex güçlü ama okuması zordur; tavsiye, hesaplamayı onunla kısa tutup sonucu paylaşmadan önce `reset_index()` ile düz bir tabloya çevirmektir.",
                "A MultiIndex is powerful but hard to read; the advice is to keep the computation short with it, then flatten the result into a plain table with `reset_index()` before sharing.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Aylık satışları çizgi grafikte göstermek istiyorsun. Hangi biçim gerekir?",
                "You want to plot monthly sales as a line chart. Which shape do you need?",
              ],
              options: [
                [
                  "Uzun biçim — her satır bir ürün-ay gözlemi",
                  "Long — one row per product-month observation",
                ],
                ["Geniş biçim — her ay bir sütun", "Wide — one column per month"],
                ["İkisi de aynı sonucu verir", "Both give the same result"],
                ["Biçim önemli değildir", "The shape does not matter"],
              ],
              answer: 0,
              explain: [
                "Çizim kütüphaneleri \"x ekseni şu sütun, y ekseni bu sütun, renk şu sütun\" ister — bu ancak uzun biçimde mümkündür. Geniş biçimde ay bilgisi sütun **adında** saklıdır ve eksen olarak kullanılamaz.",
                "Plotting libraries want \"x is this column, y is that column, colour is this column\" — which is only possible in long form. In wide form the month lives in the column **name** and cannot be used as an axis.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Geniş biçimdeki tabloyu uzun biçime çevir. Sonuç `uzun` adlı DataFrame olsun; sütunları `urun`, `ay`, `adet`.",
                "Convert the wide table to long form. Call the result `uzun`, with columns `urun`, `ay`, `adet`.",
              ],
              starter: `import pandas as pd

genis = pd.DataFrame({
    "urun":  ["Kulaklık", "Klavye", "Saat"],
    "ocak":  [12, 8, 5],
    "subat": [15, 11, 7],
})

uzun =
print(uzun)`,
              solution: `import pandas as pd

genis = pd.DataFrame({
    "urun":  ["Kulaklık", "Klavye", "Saat"],
    "ocak":  [12, 8, 5],
    "subat": [15, 11, 7],
})

uzun = genis.melt(id_vars="urun", var_name="ay", value_name="adet")
print(uzun)`,
              hint: [
                "`melt` üç şey ister: sabit kalacak sütun (`id_vars`), yeni sütunun adı (`var_name`) ve değer sütununun adı (`value_name`).",
                "`melt` needs three things: the column to keep (`id_vars`), the new column's name (`var_name`) and the value column's name (`value_name`).",
              ],
              checks: [
                {
                  code: "list(uzun.columns) == ['urun', 'ay', 'adet']",
                  msg: [
                    "Sütunlar urun, ay, adet olmalı",
                    "The columns must be urun, ay, adet",
                  ],
                },
                { code: "len(uzun) == 6", msg: ["6 satır olmalı", "There must be 6 rows"] },
                {
                  code: "int(uzun['adet'].sum()) == 58",
                  msg: ["Toplam adet 58 olmalı", "The quantities must sum to 58"],
                },
              ],
              xp: 45,
            }),
          ],
        }),
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "expert",
      title: L("Üretim kalitesinde Python", "Production-grade Python"),
      description: L(
        "Test edilen, tekrar üretilebilen ve büyük veride ayakta kalan analiz kodu yazmak.",
        "Writing analysis code that is tested, reproducible and survives large data.",
      ),
      lessons: [
        lesson({
          slug: "test-ve-veri-dogrulama",
          title: L("Test ve veri doğrulama", "Testing and data validation"),
          summary: L(
            "Analizin doğru olduğunu nereden biliyorsun? Kanıtı koda göm.",
            "How do you know your analysis is right? Put the proof in the code.",
          ),
          minutes: 20,
          blocks: [
            text(
              "Bir analiz kodu iki şekilde bozulur: **kod** değişir ya da **veri** değişir. İkisine karşı iki farklı savunma vardır.\n\n**Birim testi** kodu korur. Bir fonksiyon yazdın; beklenen girdiye beklenen çıktıyı veriyor mu?\n\n```python\ndef kdv_ekle(tutar, oran=0.20):\n    return tutar * (1 + oran)\n\ndef test_kdv_ekle():\n    assert kdv_ekle(100) == 120\n    assert kdv_ekle(100, 0.10) == 110\n    assert kdv_ekle(0) == 0\n```\n\n`pytest` bu dosyayı çalıştırıp `test_` ile başlayan her fonksiyonu dener. Kodu değiştirdiğinde testler kırılırsa, bir şeyi bozduğunu **anında** öğrenirsin.",
              "Analysis code breaks in two ways: the **code** changes, or the **data** changes. There are two different defences.\n\n**Unit tests** protect the code. You wrote a function; does it give the expected output for the expected input?\n\n```python\ndef add_vat(amount, rate=0.20):\n    return amount * (1 + rate)\n\ndef test_add_vat():\n    assert add_vat(100) == 120\n    assert add_vat(100, 0.10) == 110\n    assert add_vat(0) == 0\n```\n\n`pytest` runs this file and tries every function beginning with `test_`. When you change the code and a test breaks, you learn **immediately** that you broke something.",
            ),
            quiz({
              id: "q2",
              q: [
                "`pytest` bir dosyayı çalıştırdığında hangi fonksiyonları test olarak dener?",
                "When `pytest` runs a file, which functions does it try as tests?",
              ],
              options: [
                ["Adı `test_` ile başlayan her fonksiyonu", "Every function whose name begins with `test_`"],
                ["Dosyadaki tüm fonksiyonları, adına bakmaksızın", "Every function in the file, regardless of name"],
                ["Yalnızca `main()` fonksiyonunu", "Only the `main()` function"],
                ["Yalnızca `assert` içermeyen fonksiyonları", "Only functions that do not contain `assert`"],
              ],
              answer: 0,
              explain: [
                "pytest, bir dosyayı taradığında `test_` ön ekiyle başlayan her fonksiyonu otomatik olarak bulur ve çalıştırır; `test_kdv_ekle` bu yüzden otomatik keşfedilir.",
                "pytest scans a file and automatically finds and runs every function prefixed with `test_`; `test_add_vat` is discovered this way.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Kodu değiştirdiğinde bir birim testi kırılırsa metne göre ne olur?",
                "According to the text, what happens if a unit test breaks after you change the code?",
              ],
              options: [
                ["Bir şeyi bozduğunu anında öğrenirsin", "You learn immediately that you broke something"],
                ["Kod otomatik olarak eski haline döner", "The code automatically reverts to its previous state"],
                ["Hiçbir şey olmaz, testler sessizce görmezden gelinir", "Nothing happens, the tests are silently ignored"],
                ["Yalnızca üretim ortamında fark edilir", "It is only noticed in the production environment"],
              ],
              answer: 0,
              explain: [
                "Testlerin amacı budur: kodu değiştirdiğinde beklenen davranış bozulmuşsa test başarısız olur ve bunu hemen, üretime gitmeden önce öğrenirsin.",
                "That is the whole point of tests: if changing the code breaks the expected behaviour, the test fails and you find out right away, before it reaches production.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`add_vat(amount, rate=0.20)` fonksiyonunda `assert add_vat(100) == 120` neyi doğrular?",
                "In `add_vat(amount, rate=0.20)`, what does `assert add_vat(100) == 120` verify?",
              ],
              options: [
                [
                  "Varsayılan oran (%20) kullanıldığında 100'ün 120 olduğunu",
                  "That with the default rate (20%), 100 becomes 120",
                ],
                ["rate parametresinin zorunlu olduğunu", "That the rate parameter is required"],
                ["Fonksiyonun negatif sayı kabul etmediğini", "That the function rejects negative numbers"],
                ["100 sayısının asal olmadığını", "That the number 100 is not prime"],
              ],
              answer: 0,
              explain: [
                "`rate` parametresi verilmediğinde varsayılan değeri %20'dir (0.20); 100 * 1.20 = 120. Test, varsayılan davranışın doğru olduğunu kontrol eder.",
                "When `rate` is not given, its default is 20% (0.20); 100 * 1.20 = 120. The test checks that this default behaviour is correct.",
              ],
            }),
            text(
              "**Veri doğrulama** ise veriyi korur. Kod değişmese bile kaynak sistem bir gün fiyatları kuruş cinsinden göndermeye başlarsa raporun sessizce 100 katına çıkar. Bunu yakalamanın yolu, beklentilerini koda yazmaktır:\n\n```python\ndef dogrula(df):\n    assert len(df) > 0, \"Veri boş geldi\"\n    assert df[\"fiyat\"].between(0, 100_000).all(), \"Fiyat beklenen aralık dışında\"\n    assert df[\"musteri_no\"].notna().all(), \"Müşteri numarası boş olamaz\"\n    assert not df[\"siparis_no\"].duplicated().any(), \"Tekrarlı sipariş var\"\n    return df\n```\n\nBu fonksiyonu veri hattının başına koyarsan, bozuk veri rapora hiç ulaşamaz — hata sessiz kalmak yerine yüksek sesle patlar. Büyük projelerde aynı işi `pandera` ve `Great Expectations` kütüphaneleri yapar.",
              "**Data validation** protects the data. Even if your code never changes, the day the source system starts sending prices in cents your report silently multiplies by 100. The way to catch this is to write your expectations into the code:\n\n```python\ndef validate(df):\n    assert len(df) > 0, \"Data came back empty\"\n    assert df[\"price\"].between(0, 100_000).all(), \"Price outside expected range\"\n    assert df[\"customer_no\"].notna().all(), \"Customer number cannot be blank\"\n    assert not df[\"order_no\"].duplicated().any(), \"Duplicate orders present\"\n    return df\n```\n\nPut this at the head of the pipeline and broken data never reaches the report — the failure is loud instead of silent. On larger projects the `pandera` and `Great Expectations` libraries do the same job.",
            ),
            quiz({
              id: "q5",
              q: [
                "Örnekteki `dogrula(df)` fonksiyonunda `assert not df[\"siparis_no\"].duplicated().any()` ne kontrol eder?",
                "In the example `dogrula(df)` function, what does `assert not df[\"siparis_no\"].duplicated().any()` check?",
              ],
              options: [
                ["Hiçbir sipariş numarasının tekrarlanmadığını", "That no order number is duplicated"],
                ["Sipariş numaralarının sıralı olduğunu", "That order numbers are sorted"],
                ["Sipariş sayısının sıfırdan fazla olduğunu", "That the number of orders is greater than zero"],
                ["Fiyatların pozitif olduğunu", "That the prices are positive"],
              ],
              answer: 0,
              explain: [
                "`.duplicated()` her tekrarlanan değer için True döner; `.any()` en az bir tekrar var mı diye bakar; `not` ile bu, 'hiç tekrar yok' koşuluna çevrilir.",
                "`.duplicated()` returns True for each repeated value; `.any()` checks whether at least one repeat exists; `not` turns this into the condition 'there are no duplicates at all'.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`assert df[\"musteri_no\"].notna().all()` satırı hangi durumda test başarısız olur?",
                "In what situation does `assert df[\"musteri_no\"].notna().all()` fail?",
              ],
              options: [
                ["musteri_no sütununda en az bir boş (NaN) değer varsa", "If the musteri_no column has at least one missing (NaN) value"],
                ["musteri_no sütunundaki tüm değerler doluysa", "If every value in the musteri_no column is filled in"],
                ["DataFrame boşsa", "If the DataFrame is empty"],
                ["fiyat sütunu negatifse", "If the fiyat column has negatives"],
              ],
              answer: 0,
              explain: [
                "`.notna()` her değer için 'boş değil mi' sorusunu True/False olarak döner; `.all()` hepsinin True olmasını ister. Tek bir boş değer bile bu koşulu bozar.",
                "`.notna()` returns True/False for each value asking 'is this not missing'; `.all()` requires every one to be True. Even a single missing value breaks the condition.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Kaynak sistem fiyatları aniden kuruş cinsinden göndermeye başlarsa, kodu hiç değiştirmeden neden fark edersin?",
                "If the source system suddenly starts sending prices in cents, why would you notice without ever changing the code?",
              ],
              options: [
                [
                  "`price.between(0, 100_000).all()` gibi bir aralık kontrolü artık başarısız olur",
                  "A range check like `price.between(0, 100_000).all()` would now fail",
                ],
                ["pytest otomatik olarak veriyi düzeltir", "pytest automatically fixes the data"],
                ["Python bu tür değişiklikleri kendiliğinden engeller", "Python inherently prevents this kind of change"],
                ["Fark edilmez, veri doğrulama yalnızca kod hatalarını yakalar", "It would not be noticed — data validation only catches code bugs"],
              ],
              answer: 0,
              explain: [
                "Fiyatlar aniden 100 kat büyürse aralık kontrolü (`between(0, 100_000)`) devre dışına çıkar ve doğrulama fonksiyonu hatayı yüksek sesle bildirir.",
                "If prices suddenly jump 100×, the range check (`between(0, 100_000)`) is violated and the validation function reports the failure loudly.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Metne göre `pandera` ve `Great Expectations` kütüphaneleri ne için kullanılır?",
                "According to the text, what are the `pandera` and `Great Expectations` libraries used for?",
              ],
              options: [
                [
                  "Büyük projelerde elle yazılan veri doğrulama assert'lerinin aynı işini yapmak için",
                  "To do the same job as hand-written data validation asserts, on larger projects",
                ],
                ["Grafik çizmek için", "For drawing charts"],
                ["Birim testlerini pytest yerine çalıştırmak için", "To run unit tests instead of pytest"],
                ["Veriyi diske kaydetmek için", "To save data to disk"],
              ],
              answer: 0,
              explain: [
                "Metin, `dogrula`/`validate` fonksiyonu gibi elle yazılan kontrollerin büyük projelerde `pandera` ve `Great Expectations` gibi özel kütüphanelerle yapıldığını belirtir.",
                "The text notes that on larger projects, hand-written checks like the `dogrula`/`validate` function are done by dedicated libraries such as `pandera` and `Great Expectations`.",
              ],
            }),
            tip(
              "Sınır durumlarını test et",
              "Test the edges",
              "Ortalama bir girdiyle test yazmak kolaydır ama hatalar sınırda yaşar. Her fonksiyon için şunları dene: **boş girdi** (`[]`, boş DataFrame), **tek eleman**, **sıfır**, **negatif değer**, **çok büyük değer** ve **eksik değer** (`None`, `NaN`). Kodun bu altısında ne yaptığını biliyorsan, gerisi genellikle kendiliğinden doğrudur.",
              "Writing a test with an average input is easy, but bugs live at the edges. For every function try: **empty input** (`[]`, an empty DataFrame), **a single element**, **zero**, **a negative value**, **a very large value**, and **missing values** (`None`, `NaN`). If you know what your code does in those six cases, the rest is usually right by itself.",
            ),
            quiz({
              id: "q9",
              q: [
                "İpucuna göre her fonksiyon için denenmesi önerilen altı sınır durumu nedir?",
                "According to the tip, what are the six edge cases recommended for every function?",
              ],
              options: [
                [
                  "Boş girdi, tek eleman, sıfır, negatif değer, çok büyük değer, eksik değer",
                  "Empty input, a single element, zero, a negative value, a very large value, missing values",
                ],
                ["Yalnızca ortalama girdiler", "Only average inputs"],
                ["Yalnızca pozitif tam sayılar", "Only positive integers"],
                ["Yalnızca metin girdiler", "Only string inputs"],
              ],
              answer: 0,
              explain: [
                "İpucu, ortalama bir girdiyle test yazmanın kolay ama yetersiz olduğunu, hataların sınırda (boş, tek eleman, sıfır, negatif, çok büyük, eksik) yaşadığını söyler.",
                "The tip says testing with an average input is easy but insufficient — bugs live at the edges (empty, single element, zero, negative, very large, missing).",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "İpucuna göre sınır durumlarını (edge cases) test etmenin mantığı nedir?",
                "According to the tip, what is the reasoning behind testing edge cases?",
              ],
              options: [
                [
                  "Bu altı durumda kodun ne yaptığını biliyorsan gerisi genellikle kendiliğinden doğrudur",
                  "If you know what your code does in these six cases, the rest is usually right by itself",
                ],
                ["Sınır durumları asla hata vermez, bu yüzden test edilmesine gerek yoktur", "Edge cases never fail, so they don't need testing"],
                ["Yalnızca büyük veri setlerinde sınır durumları önemlidir", "Edge cases only matter on large datasets"],
                ["Ortalama girdi hiçbir zaman test edilmemelidir", "Average inputs should never be tested"],
              ],
              answer: 0,
              explain: [
                "İpucu, ortalama girdinin kolay ama yetersiz olduğunu, gerçek hataların sınırlarda çıktığını vurgular; altı sınır durumunu bilmek genelde geri kalan davranış için de güven verir.",
                "The tip stresses that an average input is easy but insufficient, and real bugs surface at the edges; knowing those six cases usually gives confidence about the rest of the behaviour too.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Kaynak sistem bir gün tutarları kuruş cinsinden göndermeye başlarsa bunu ne yakalar?",
                "If the source system starts sending amounts in cents one day, what catches it?",
              ],
              options: [
                [
                  "Veri doğrulama — değerlerin beklenen aralıkta olduğunu sınayan kontrol",
                  "Data validation — a check asserting values fall in the expected range",
                ],
                ["Birim testi", "A unit test"],
                ["Tip denetleyicisi", "A type checker"],
                ["Hiçbiri; bu yakalanamaz", "Nothing; this cannot be caught"],
              ],
              answer: 0,
              explain: [
                "Birim testi **kodun** davranışını sınar ve kod değişmediği için geçmeye devam eder. Veriyi ise ancak veri üzerinde çalışan bir kontrol yakalar. İkisi birbirinin yerine geçmez; ikisi de gerekir.",
                "A unit test checks the behaviour of the **code**, and since the code did not change it keeps passing. Only a check that runs against the data can catch the data. The two are not substitutes; you need both.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "`dogrula(df)` fonksiyonunu yaz: bulduğu **tüm** sorunları bir liste olarak döndürsün. Boşsa `\"bos\"`, `fiyat` negatif içeriyorsa `\"negatif\"`, `siparis_no` tekrarlıysa `\"tekrar\"` ekle. Sorun yoksa boş liste dönsün.",
                "Write `dogrula(df)`: return **all** the problems it finds as a list. Append `\"bos\"` if empty, `\"negatif\"` if `fiyat` has negatives, `\"tekrar\"` if `siparis_no` has duplicates. Return an empty list when clean.",
              ],
              starter: `import pandas as pd

def dogrula(df):
    sorunlar = []

    return sorunlar

temiz = pd.DataFrame({"siparis_no": [1, 2, 3], "fiyat": [10.0, 20.0, 30.0]})
bozuk = pd.DataFrame({"siparis_no": [1, 1, 3], "fiyat": [10.0, -5.0, 30.0]})
bos   = pd.DataFrame({"siparis_no": [], "fiyat": []})`,
              solution: `import pandas as pd

def dogrula(df):
    sorunlar = []
    if len(df) == 0:
        sorunlar.append("bos")
    if (df["fiyat"] < 0).any():
        sorunlar.append("negatif")
    if df["siparis_no"].duplicated().any():
        sorunlar.append("tekrar")
    return sorunlar

temiz = pd.DataFrame({"siparis_no": [1, 2, 3], "fiyat": [10.0, 20.0, 30.0]})
bozuk = pd.DataFrame({"siparis_no": [1, 1, 3], "fiyat": [10.0, -5.0, 30.0]})
bos   = pd.DataFrame({"siparis_no": [], "fiyat": []})`,
              hint: [
                "Üç ayrı `if` yaz. Negatif için `(df[\"fiyat\"] < 0).any()`, tekrar için `df[\"siparis_no\"].duplicated().any()` kullan.",
                "Write three separate `if`s. Use `(df[\"fiyat\"] < 0).any()` for negatives and `df[\"siparis_no\"].duplicated().any()` for duplicates.",
              ],
              checks: [
                {
                  code: "dogrula(temiz) == []",
                  msg: ["Temiz veride liste boş olmalı", "Clean data must yield an empty list"],
                },
                {
                  code: "set(dogrula(bozuk)) == {'negatif', 'tekrar'}",
                  msg: [
                    "Bozuk veride hem negatif hem tekrar bulunmalı",
                    "Broken data must report both negatif and tekrar",
                  ],
                },
                {
                  code: "'bos' in dogrula(bos)",
                  msg: [
                    "Boş DataFrame 'bos' sorununu bildirmeli",
                    "An empty DataFrame must report the 'bos' problem",
                  ],
                },
              ],
              xp: 55,
            }),
          ],
        }),
        lesson({
          slug: "yeniden-uretilebilirlik",
          title: L("Yeniden üretilebilir analiz", "Reproducible analysis"),
          summary: L(
            "Altı ay sonra aynı kodu çalıştırdığında aynı sayıyı almanı ne garanti eder?",
            "What guarantees you get the same number when you run the same code six months later?",
          ),
          minutes: 18,
          blocks: [
            text(
              "\"Bende çalışıyordu\" cümlesi, veri ekiplerinin en pahalı cümlesidir. Bir analizin yeniden üretilebilir olması için dört şeyin sabitlenmesi gerekir:\n\n1. **Kod** — sürüm kontrolünde (Git)\n2. **Bağımlılıklar** — hangi kütüphanenin hangi sürümü\n3. **Veri** — hangi tarihli anlık görüntü\n4. **Rastgelelik** — tohum (seed) sabitlenmiş mi\n\nDördü de sabit değilse, aynı kod farklı zamanlarda farklı sayı üretir ve hangisinin doğru olduğunu kimse bilemez.",
              "\"It worked on my machine\" is the most expensive sentence in data teams. For an analysis to be reproducible, four things must be pinned down:\n\n1. **Code** — under version control (Git)\n2. **Dependencies** — which library at which version\n3. **Data** — which dated snapshot\n4. **Randomness** — whether the seed is fixed\n\nIf any of the four floats, the same code produces different numbers at different times and nobody can tell which is right.",
            ),
            quiz({
              id: "q3",
              q: [
                "Metindeki dört maddeden 'Kod' başlığı hangi pratikle sabitlenir?",
                "Of the four items in the text, which practice pins down the 'Code' item?",
              ],
              options: [
                ["Sürüm kontrolü (Git)", "Version control (Git)"],
                ["Rastgele tohum belirlemek", "Setting a random seed"],
                ["Kütüphane sürümünü dondurmak", "Pinning the library version"],
                ["Tarihli veri anlık görüntüsü almak", "Taking a dated data snapshot"],
              ],
              answer: 0,
              explain: [
                "Metin, dört kalemi 'kod (sürüm kontrolünde/Git), bağımlılıklar, veri, rastgelelik' olarak sıralar; kodun sabitlenmesi Git ile sağlanır.",
                "The text lists the four items as 'code (under version control/Git), dependencies, data, randomness'; pinning code down is what Git provides.",
              ],
            }),
            code(
              "python",
              `# 1. Sanal ortam: her projenin kendi kütüphane kümesi olur
#    python -m venv .venv
#    source .venv/bin/activate        (Windows: .venv\\Scripts\\activate)
#    pip install pandas==2.2.0
#    pip freeze > requirements.txt    <- sürümleri dondurur

# 2. Rastgeleliği sabitle — örnekleme ve model bölmede şart
import numpy as np
rng = np.random.default_rng(seed=42)
ornek = rng.choice(1000, size=10, replace=False)

# 3. Sihirli sayıları tepeye topla, koda gömme
BASLANGIC = "2024-01-01"
KDV_ORANI = 0.20
VERI_YOLU = "veri/satis_2024-08-01.parquet"   # tarihli anlık görüntü`,
            ),
            quiz({
              id: "q4",
              q: [
                "Koddaki `pip freeze > requirements.txt` satırının amacı nedir?",
                "What is the purpose of the `pip freeze > requirements.txt` line in the code?",
              ],
              options: [
                [
                  "O anki kurulu kütüphane sürümlerini bir dosyaya dondurmak",
                  "To freeze the currently installed library versions into a file",
                ],
                ["Sanal ortamı silmek", "To delete the virtual environment"],
                ["Kodu çalıştırmak", "To run the code"],
                ["Veri dosyasını indirmek", "To download the data file"],
              ],
              answer: 0,
              explain: [
                "`pip freeze`, o anda kurulu her paketin tam sürümünü listeler; bunu bir dosyaya yönlendirmek, ortamın altı ay sonra birebir yeniden kurulabilmesini sağlar.",
                "`pip freeze` lists the exact version of every currently installed package; redirecting it into a file lets the environment be rebuilt identically six months later.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Kodda `KDV_ORANI = 0.20` gibi sabitlerin dosyanın en üstünde tanımlanmasının amacı nedir?",
                "What is the point of defining constants like `KDV_ORANI = 0.20` at the top of the file?",
              ],
              options: [
                [
                  "Sihirli sayıları kodun içine gömmek yerine tek bir yerde görünür ve değiştirilebilir tutmak",
                  "To keep magic numbers visible and changeable in one place instead of buried inside the code",
                ],
                ["Python'da zorunlu bir kural olduğu için", "Because it is a mandatory Python rule"],
                ["Kodu daha hızlı çalıştırmak için", "To make the code run faster"],
                ["Bellek kullanımını azaltmak için", "To reduce memory usage"],
              ],
              answer: 0,
              explain: [
                "'Sihirli sayıları tepeye topla, koda gömme' yorumu bunu açıkça belirtir: sabitleri dosyanın başında tutmak, onları bulmayı ve değiştirmeyi kolaylaştırır, kodun ortasına gizlenmelerini önler.",
                "The comment 'gather magic numbers at the top, don't bury them in the code' states this directly: keeping constants at the top makes them easy to find and change, instead of hidden mid-code.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`rng = np.random.default_rng(seed=42)` satırı ne garanti eder?",
                "What does the line `rng = np.random.default_rng(seed=42)` guarantee?",
              ],
              options: [
                [
                  "Kod her çalıştırıldığında aynı rastgele sayı dizisinin üretilmesini",
                  "That the same sequence of random numbers is produced every time the code runs",
                ],
                ["Rastgele sayıların hiç kullanılmamasını", "That random numbers are never used"],
                ["Kodun daha hızlı çalışmasını", "That the code runs faster"],
                ["Verinin otomatik olarak sıralanmasını", "That the data gets automatically sorted"],
              ],
              answer: 0,
              explain: [
                "Bir tohum (`seed=42`) vermek, rastgele sayı üretecinin her çalıştırmada aynı diziyi üretmesini sağlar; bu olmadan `ornek` her seferinde farklı olurdu.",
                "Providing a seed (`seed=42`) makes the random number generator produce the same sequence on every run; without it, `ornek` would differ each time.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`VERI_YOLU = \"veri/satis_2024-08-01.parquet\"` gibi tarihli bir dosya adı kullanmak neyi sabitler?",
                "What does using a dated filename like `VERI_YOLU = \"veri/satis_2024-08-01.parquet\"` pin down?",
              ],
              options: [
                ["Hangi anlık veri görüntüsünün kullanıldığını", "Which dated snapshot of the data is being used"],
                ["Kodun hangi sürümde olduğunu", "Which version the code is on"],
                ["Rastgele tohum değerini", "The random seed value"],
                ["Kütüphane sürümünü", "The library version"],

              ],
              answer: 0,
              explain: [
                "Dosya adına tarih koymak, kaynak verinin sürekli güncellenen bir dosya yerine belirli bir ana ait sabit bir anlık görüntü olmasını sağlar — dört pinden 'veri' maddesi budur.",
                "Putting a date in the filename ensures the source data is a fixed snapshot from a specific moment, rather than a file that keeps changing — this is the 'data' item among the four things to pin.",
              ],
            }),
            info(
              "Notebook mu, betik mi?",
              "Notebook or script?",
              "Jupyter notebook keşif için mükemmeldir: kodu parça parça çalıştırır, çıktıyı hemen görürsün. Ama iki tuzağı vardır: hücreleri **sırasız** çalıştırabilirsin (yukarıdaki hücre aşağıdakinden sonra çalışmış olabilir) ve çıktılar dosyaya gömüldüğü için Git'te okunmaz farklar üretir.\n\nPratik kural: **keşfi notebook'ta yap, tekrarlanan işi `.py` dosyasına taşı.** Notebook'u paylaşmadan önce \"Restart & Run All\" ile baştan çalıştır — sırasız hücre hatalarını bu yakalar.",
              "A Jupyter notebook is superb for exploration: you run code in pieces and see output instantly. But it has two traps: you can run cells **out of order** (the cell above may have run after the one below), and because outputs are embedded in the file it produces unreadable diffs in Git.\n\nA practical rule: **explore in a notebook, move repeated work into a `.py` file.** Before sharing a notebook, do \"Restart & Run All\" — that is what catches out-of-order-cell bugs.",
            ),
            quiz({
              id: "q8",
              q: [
                "Metne göre notebook'ların ilk tuzağı nedir?",
                "According to the text, what is the first trap of notebooks?",
              ],
              options: [
                [
                  "Hücreler sırasız çalıştırılabilir; üstteki hücre alttakinden sonra çalışmış olabilir",
                  "Cells can be run out of order; the cell above may have run after the one below",
                ],
                ["Notebook'lar Python kodu çalıştıramaz", "Notebooks cannot run Python code"],
                ["Notebook'lar hiçbir çıktı göstermez", "Notebooks show no output at all"],
                ["Notebook'lar yalnızca SQL destekler", "Notebooks only support SQL"],
              ],
              answer: 0,
              explain: [
                "Metin, hücreleri sırasız çalıştırabileceğini belirtir; bu, dosyanın en üstten aşağı yeniden çalıştırıldığında farklı bir sonuç vermesine yol açabilir.",
                "The text notes you can run cells out of order; this can mean the file gives a different result when re-run top to bottom.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Notebook çıktılarının dosyaya gömülmesi Git açısından neye yol açar?",
                "What does embedding notebook outputs in the file cause for Git?",
              ],
              options: [
                ["Okunmaz (anlaşılması zor) farklar (diff) üretir", "It produces unreadable diffs"],
                ["Dosyanın Git'e hiç eklenememesine", "The file cannot be added to Git at all"],
                ["Kodun çalışmamasına", "The code failing to run"],
                ["Otomatik olarak test yazılmasına", "Tests being written automatically"],
              ],
              answer: 0,
              explain: [
                "Çıktılar (grafikler, tablolar) dosyanın içine gömülü olduğu için, küçük bir kod değişikliği bile Git diff'inde devasa, okunmaz bir fark olarak görünür.",
                "Because outputs (charts, tables) are embedded in the file, even a small code change shows up as a huge, unreadable diff in Git.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir notebook'u paylaşmadan önce \"Restart & Run All\" yapmanın amacı nedir?",
                "What is the point of doing \"Restart & Run All\" before sharing a notebook?",
              ],
              options: [
                [
                  "Sırasız çalıştırılan hücrelerden kaynaklanan hataları yakalamak",
                  "To catch bugs caused by cells having been run out of order",
                ],
                ["Notebook'u daha hızlı çalıştırmak", "To make the notebook run faster"],
                ["Tüm çıktıları silmek", "To delete all the outputs"],
                ["Kütüphaneleri güncellemek", "To update the libraries"],
              ],
              answer: 0,
              explain: [
                "\"Restart & Run All\", çekirdeği sıfırlayıp tüm hücreleri baştan sona sırayla çalıştırır; böylece yalnızca elle sırasız çalıştırıldığı için 'çalışan' kod ortaya çıkar.",
                "\"Restart & Run All\" resets the kernel and runs every cell top to bottom in order, exposing code that only 'worked' because it was run out of order by hand.",
              ],
            }),
            quiz({
              id: "q11",
              q: [
                "Metindeki pratik kurala göre notebook ve `.py` dosyası nasıl kullanılmalı?",
                "According to the text's practical rule, how should notebooks and `.py` files be used?",
              ],
              options: [
                [
                  "Keşfi notebook'ta yap, tekrarlanan işi bir .py dosyasına taşı",
                  "Explore in a notebook, move repeated work into a .py file",
                ],
                ["Her şeyi yalnızca notebook'ta yap, .py dosyasına hiç geçme", "Do everything only in the notebook, never move to a .py file"],
                ["Her şeyi yalnızca .py dosyasında yap, notebook hiç kullanma", "Do everything only in a .py file, never use a notebook"],
                ["İkisi birbirinin yerine geçebilir, fark yoktur", "The two are interchangeable, no difference"],
              ],
              answer: 0,
              explain: [
                "Metin, notebook'un keşif için mükemmel olduğunu ama tekrarlanan/üretim işinin `.py` dosyasına taşınması gerektiğini söyler; her aracın güçlü olduğu bir iş vardır.",
                "The text says the notebook is superb for exploration, but repeated/production work should move into a `.py` file; each tool has the job it is strong at.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "Aynı model kodu iki kez çalıştırıldığında farklı doğruluk veriyor. En olası sebep?",
                "The same model code gives a different accuracy on two runs. The most likely cause?",
              ],
              options: [
                [
                  "Rastgele tohum sabitlenmemiş; eğitim/test bölmesi her seferinde değişiyor",
                  "The random seed is not fixed, so the train/test split changes every run",
                ],
                ["Bilgisayar yavaşlamış", "The computer got slower"],
                ["Python sürümü değişmiş", "The Python version changed"],
                ["Veri bozulmuş", "The data is corrupted"],
              ],
              answer: 0,
              explain: [
                "`train_test_split`, `KMeans`, `RandomForest` gibi araçlar rastgelelik içerir. `random_state=42` gibi bir tohum vermezsen her çalıştırmada farklı bölme yaparlar. Sonuç raporlanabilir olmaz — ve modelin gerçekten iyileşip iyileşmediğini anlayamazsın.",
                "Tools like `train_test_split`, `KMeans` and `RandomForest` involve randomness. Without a seed such as `random_state=42` they split differently on every run. The result is not reportable — and you cannot tell whether the model actually improved.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "`requirements.txt` dosyasında `pandas` yerine `pandas==2.2.0` yazmanın sebebi nedir?",
                "Why write `pandas==2.2.0` instead of just `pandas` in `requirements.txt`?",
              ],
              options: [
                [
                  "Sürüm sabitlenmezse yeni sürüm davranışı değiştirebilir ve analiz sessizce farklı sonuç verir",
                  "Without pinning, a new version can change behaviour and the analysis quietly returns different numbers",
                ],
                ["Kurulum hızlansın diye", "To make installation faster"],
                ["Daha az disk kullansın diye", "To use less disk"],
                ["Zorunlu bir yazım kuralı", "It is a required syntax"],
              ],
              answer: 0,
              explain: [
                "Kütüphaneler sürüm değiştirdiğinde varsayılanları değiştirebilir veya bir fonksiyonu kaldırabilir. Sürümü sabitlemek, altı ay sonra aynı ortamı kurabilmenin tek yoludur.",
                "Libraries change defaults or remove functions between versions. Pinning is the only way to rebuild the same environment six months later.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "bellek-ve-buyuk-veri",
          title: L("Bellek yönetimi ve büyük veri", "Memory and larger-than-RAM data"),
          summary: L(
            "Dosya belleğe sığmıyorsa ne yaparsın? Tip seçiminden parçalı okumaya.",
            "What do you do when the file does not fit in memory? From dtype choice to chunked reads.",
          ),
          minutes: 20,
          blocks: [
            text(
              "pandas veriyi **tamamen belleğe** yükler. 8 GB RAM'li bir makinede 10 GB'lık CSV açılmaz. Üç kademeli çözüm vardır ve sırayla denenmelidir:\n\n1. **Veriyi küçült** — doğru tipler ve yalnızca gerekli sütunlar\n2. **Parça parça oku** — `chunksize` ile akış hâlinde işle\n3. **Aracı değiştir** — Polars, DuckDB veya Dask'a geç\n\nÇoğu insan doğrudan üçüncü adıma atlar; oysa birinci adım genellikle tek başına yeter ve bellek kullanımını 5-10 kat düşürür.",
              "pandas loads data **fully into memory**. A 10 GB CSV will not open on a machine with 8 GB of RAM. There is a three-step solution, to be tried in order:\n\n1. **Shrink the data** — correct dtypes and only the columns you need\n2. **Read in chunks** — process as a stream with `chunksize`\n3. **Change tool** — move to Polars, DuckDB or Dask\n\nMost people jump straight to step three; yet step one alone is usually enough and cuts memory use by 5-10×.",
            ),
            quiz({
              id: "q2",
              q: [
                "Metindeki üç adımlı çözümde ilk denenmesi gereken adım hangisidir?",
                "In the text's three-step solution, which step should be tried first?",
              ],
              options: [
                ["Veriyi küçültmek — doğru tipler ve yalnızca gerekli sütunlar", "Shrinking the data — correct dtypes and only the needed columns"],
                ["Aracı değiştirip Polars veya DuckDB'ye geçmek", "Changing tools to Polars or DuckDB"],
                ["Veriyi parça parça okumak", "Reading the data in chunks"],
                ["Daha fazla RAM satın almak", "Buying more RAM"],
              ],
              answer: 0,
              explain: [
                "Metin, üç adımın sırayla denenmesi gerektiğini söyler; ilk adım veriyi küçültmektir çünkü genellikle tek başına yeterlidir ve belleği 5-10 kat düşürür.",
                "The text says the three steps should be tried in order; the first is shrinking the data because it is usually enough on its own and cuts memory 5-10×.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Metne göre çoğu insanın yaptığı yaygın hata nedir?",
                "According to the text, what common mistake do most people make?",
              ],
              options: [
                [
                  "Doğrudan üçüncü adıma (aracı değiştirmeye) atlamak",
                  "Jumping straight to the third step (changing tools)",
                ],
                ["Veriyi hiç küçültmemeye çalışmamak", "Never trying to shrink the data at all — this phrasing itself"],
                ["Çok fazla chunksize kullanmak", "Using too large a chunksize"],
                ["category tipini hiç kullanmamak", "Never using the category dtype"],
              ],
              answer: 0,
              explain: [
                "Metin açıkça 'çoğu insan doğrudan üçüncü adıma atlar' der; oysa birinci adım (veriyi küçültme) genellikle tek başına yeterlidir.",
                "The text explicitly says 'most people jump straight to step three'; yet step one (shrinking the data) is usually enough on its own.",
              ],
            }),
            code(
              "python",
              `import pandas as pd

# 1. Sadece gerekli sütunlar + doğru tipler
df = pd.read_csv(
    "buyuk.csv",
    usecols=["tarih", "sehir", "urun", "adet", "tutar"],
    dtype={
        "sehir": "category",   # 5 farklı değer -> metin yerine kategori
        "urun":  "category",
        "adet":  "int32",      # int64 gereksiz; 32 bit yeter
        "tutar": "float32",
    },
    parse_dates=["tarih"],
)

# 2. Belleğe sığmıyorsa parça parça oku ve her parçayı özetle
toplamlar = []
for parca in pd.read_csv("buyuk.csv", chunksize=500_000):
    toplamlar.append(parca.groupby("sehir")["tutar"].sum())

sonuc = pd.concat(toplamlar).groupby(level=0).sum()`,
              "Kategorik tip, az sayıda benzersiz değeri olan metin sütunlarında belleği onda birine indirir.",
              "The category dtype cuts memory to a tenth on text columns with few distinct values.",
            ),
            quiz({
              id: "q4",
              q: [
                "`pd.read_csv(..., usecols=[\"tarih\", \"sehir\", \"urun\", \"adet\", \"tutar\"])` içindeki `usecols` parametresi ne işe yarar?",
                "What does the `usecols` parameter do in `pd.read_csv(..., usecols=[\"tarih\", \"sehir\", \"urun\", \"adet\", \"tutar\"])`?",
              ],
              options: [
                [
                  "Yalnızca listelenen sütunları belleğe yükler, gerisini okumaz",
                  "It loads only the listed columns into memory, skipping the rest",
                ],
                ["Sütunları alfabetik sıraya dizer", "It sorts the columns alphabetically"],
                ["Yalnızca ilk 5 satırı okur", "It reads only the first 5 rows"],
                ["Sütun adlarını değiştirir", "It renames the columns"],
              ],
              answer: 0,
              explain: [
                "CSV'deki tüm sütunları okumak yerine `usecols` yalnızca ihtiyaç duyulanları belleğe alır; kullanılmayan sütunlar için hiç bellek harcanmaz.",
                "Instead of reading every column in the CSV, `usecols` loads only the ones you need into memory; unused columns cost no memory at all.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`dtype={\"adet\": \"int32\"}` yerine varsayılan `int64` kullanmanın maliyeti nedir?",
                "What is the cost of using the default `int64` instead of `dtype={\"adet\": \"int32\"}`?",
              ],
              options: [
                [
                  "Değerler daha küçük bir tipe sığsa bile gereğinden fazla bellek harcanır",
                  "Even when values fit a smaller type, more memory than necessary is used",
                ],
                ["Kod çalışmaz, hata verir", "The code fails to run and raises an error"],
                ["Sonuçlar yanlış hesaplanır", "The results are computed incorrectly"],
                ["Sütun otomatik olarak silinir", "The column is automatically dropped"],
              ],
              answer: 0,
              explain: [
                "`int64` her değer için 8 bayt ayırır; değerler `int32`'ye (4 bayt) sığıyorsa `int64` kullanmak belleğin gereksiz yere iki katına çıkmasına yol açar.",
                "`int64` reserves 8 bytes per value; if the values fit in `int32` (4 bytes), using `int64` needlessly doubles the memory used.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`pd.read_csv(\"buyuk.csv\", chunksize=500_000)` içindeki `chunksize` ne sağlar?",
                "What does `chunksize` provide in `pd.read_csv(\"buyuk.csv\", chunksize=500_000)`?",
              ],
              options: [
                [
                  "Dosyayı tamamen belleğe yüklemeden 500.000 satırlık parçalar hâlinde okumayı",
                  "Reading the file in 500,000-row pieces without loading it all into memory at once",
                ],
                ["Dosyayı 500.000 kopyaya bölmeyi", "Splitting the file into 500,000 copies"],
                ["Yalnızca ilk 500.000 satırı okumayı, gerisini atlamayı", "Reading only the first 500,000 rows and skipping the rest"],
                ["Dosyayı 500.000 kat sıkıştırmayı", "Compressing the file 500,000×"],
              ],
              answer: 0,
              explain: [
                "`chunksize` verildiğinde `read_csv` bir iterator döner; dosya parça parça (burada 500.000 satırlık gruplar hâlinde) okunur, tamamı asla aynı anda bellekte olmaz.",
                "When `chunksize` is given, `read_csv` returns an iterator; the file is read in pieces (here, 500,000-row groups), and the whole thing is never in memory at once.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`toplamlar.append(parca.groupby(\"sehir\")[\"tutar\"].sum())` döngüsünden sonra `pd.concat(toplamlar).groupby(level=0).sum()` ne yapar?",
                "After the loop appending `parca.groupby(\"sehir\")[\"tutar\"].sum()`, what does `pd.concat(toplamlar).groupby(level=0).sum()` do?",
              ],
              options: [
                [
                  "Her parçanın kısmi toplamlarını birleştirip şehir başına nihai toplamı hesaplar",
                  "It combines each chunk's partial sums into a final total per city",
                ],
                ["Yalnızca son parçanın toplamını alır", "It only takes the last chunk's total"],
                ["Tüm parçaları tek bir sütuna dönüştürür", "It turns all the chunks into a single column"],
                ["Dosyayı diske geri yazar", "It writes the file back to disk"],
              ],
              answer: 0,
              explain: [
                "Her parça kendi şehir bazlı kısmi toplamını üretir; bunları `pd.concat` ile birleştirip tekrar `groupby(level=0).sum()` yapmak, tüm dosya için doğru nihai toplamı verir.",
                "Each chunk produces its own partial per-city total; concatenating them and grouping again with `groupby(level=0).sum()` yields the correct final total across the whole file.",
              ],
            }),
            tip(
              "Önce ölç, sonra optimize et",
              "Measure first, optimise second",
              "`df.info(memory_usage=\"deep\")` her sütunun kaç bayt yediğini gösterir. Genellikle bellek tüketiminin büyük kısmını bir veya iki metin sütunu yapar; onları `category` tipine çevirmek çoğu zaman tek başına sorunu çözer.\n\nHız için de aynısı geçerli: `%%timeit` ile ölçmeden hangi satırın yavaş olduğunu tahmin etme. Yavaş sandığın satır genellikle yavaş olan değildir.",
              "`df.info(memory_usage=\"deep\")` shows how many bytes each column consumes. Usually one or two text columns account for most of it; converting those to `category` often solves the problem on its own.\n\nThe same goes for speed: do not guess which line is slow without measuring with `%%timeit`. The line you think is slow usually is not.",
            ),
            quiz({
              id: "q8",
              q: [
                "`df.info(memory_usage=\"deep\")` çağrısı ne gösterir?",
                "What does calling `df.info(memory_usage=\"deep\")` show?",
              ],
              options: [
                ["Her sütunun kaç bayt yediğini", "How many bytes each column consumes"],
                ["Yalnızca satır sayısını", "Only the number of rows"],
                ["Dosyanın diskteki boyutunu", "The file's size on disk"],
                ["Sütunların alfabetik sırasını", "The alphabetical order of the columns"],
              ],
              answer: 0,
              explain: [
                "İpucu, bunun her sütunun bellekte kaç bayt kapladığını gösterdiğini ve genelde bir-iki metin sütununun tüketimin büyük kısmını oluşturduğunu söyler.",
                "The tip states this shows how many bytes each column consumes, and that usually one or two text columns account for most of it.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "İpucuna göre hangi satırın yavaş olduğuna nasıl karar verilmelidir?",
                "According to the tip, how should you decide which line is slow?",
              ],
              options: [
                [
                  "Tahmin etmeden `%%timeit` ile ölçerek",
                  "By measuring with `%%timeit`, not by guessing",
                ],
                ["Kodun uzunluğuna bakarak", "By looking at how long the code is"],
                ["Değişken adlarına bakarak", "By looking at the variable names"],
                ["Her zaman iterrows() kullanan satırın yavaş olduğunu varsayarak", "By always assuming the line using iterrows() is the slow one"],
              ],
              answer: 0,
              explain: [
                "İpucu, hız için de aynı prensibin geçerli olduğunu söyler: ölçmeden tahmin etme, çünkü yavaş sandığın satır genellikle yavaş olan değildir.",
                "The tip says the same principle applies to speed: do not guess without measuring, because the line you think is slow usually is not.",
              ],
            }),
            text(
              "**Ne zaman pandas'tan çıkmalı?**\n\n- **Polars** — pandas'a çok benzeyen ama çok çekirdekli ve tembel değerlendirmeli bir kütüphane. Aynı işi 5-20 kat hızlı yapar, bellek kullanımı daha düşüktür.\n- **DuckDB** — dosyanın üzerinde doğrudan SQL çalıştırır: `duckdb.query(\"SELECT sehir, SUM(tutar) FROM 'buyuk.parquet' GROUP BY sehir\")`. Belleğe sığmayan dosyalarda bile çalışır.\n- **Dask / Spark** — veri tek makineye sığmıyorsa, işi kümeye dağıtır.\n\nSıralama önemlidir: DuckDB çoğu analitik iş için en az çabayla en çok kazancı verir; Spark'a ancak gerçekten dağıtık ölçekte ihtiyaç duyulur.",
              "**When should you leave pandas?**\n\n- **Polars** — a library very similar to pandas but multi-core and lazily evaluated. It does the same work 5-20× faster with lower memory use.\n- **DuckDB** — runs SQL directly over the file: `duckdb.query(\"SELECT city, SUM(amount) FROM 'big.parquet' GROUP BY city\")`. It works even on files that do not fit in memory.\n- **Dask / Spark** — when the data does not fit on one machine, they distribute the work across a cluster.\n\nThe order matters: DuckDB gives the largest gain for the least effort on most analytical work; Spark is only needed at genuinely distributed scale.",
            ),
            quiz({
              id: "q10",
              q: [
                "Metne göre DuckDB'nin özel yeteneği nedir?",
                "According to the text, what is DuckDB's special ability?",
              ],
              options: [
                [
                  "Belleğe sığmayan dosyalar üzerinde bile doğrudan SQL çalıştırabilmesi",
                  "It can run SQL directly over files even when they do not fit in memory",
                ],
                ["Yalnızca küçük dosyalarda çalışması", "It only works on small files"],
                ["Yalnızca grafik çizmesi", "It only draws charts"],
                ["pandas'tan 100 kat daha yavaş olması", "It is 100× slower than pandas"],
              ],
              answer: 0,
              explain: [
                "Metin, DuckDB'nin dosyanın üzerinde doğrudan SQL çalıştırdığını ve belleğe sığmayan dosyalarda bile çalıştığını belirtir — bu, verinin tamamını RAM'e yüklemeden sorgu yapabilmek demektir.",
                "The text states DuckDB runs SQL directly over the file and works even on files that do not fit in memory — meaning it can query without loading the whole dataset into RAM.",
              ],
            }),
            quiz({
              id: "q11",
              q: [
                "Metindeki sıralama tavsiyesine göre Spark ne zaman gerekir?",
                "According to the text's ordering advice, when is Spark actually needed?",
              ],
              options: [
                ["Yalnızca gerçekten dağıtık ölçekte, veri tek makineye sığmadığında", "Only at genuinely distributed scale, when the data does not fit on one machine"],
                ["Her analiz projesinde varsayılan olarak", "By default, on every analysis project"],
                ["Yalnızca küçük CSV dosyalarında", "Only for small CSV files"],
                ["Görselleştirme yapmak için her zaman", "Always, for making visualisations"],
              ],
              answer: 0,
              explain: [
                "Metin, DuckDB'nin çoğu analitik iş için en az çabayla en çok kazancı verdiğini, Spark'ın ise ancak gerçekten dağıtık ölçekte gerektiğini söyler; sırayı atlamak gereksiz karmaşıklık getirir.",
                "The text says DuckDB gives the largest gain for the least effort on most analytical work, and Spark is only needed at genuinely distributed scale; skipping the order adds needless complexity.",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "5 milyon satırlık bir tabloda `sehir` sütununda yalnızca 81 farklı değer var. Hangi değişiklik belleği en çok düşürür?",
                "A 5-million-row table has only 81 distinct values in its `city` column. Which change cuts memory the most?",
              ],
              options: [
                [
                  "Sütunu `category` tipine çevirmek",
                  "Converting the column to the `category` dtype",
                ],
                ["Sütunu silmek", "Deleting the column"],
                ["`int64` yerine `int32` kullanmak", "Using `int32` instead of `int64`"],
                ["Satırları sıralamak", "Sorting the rows"],
              ],
              answer: 0,
              explain: [
                "`category` tipi, metni bir kez sözlükte saklar ve satırlarda yalnızca küçük tam sayı kodlar tutar. 5 milyon uzun metin yerine 81 metin + 5 milyon küçük sayı saklanır — bellek genellikle onda birine iner.",
                "The `category` dtype stores each distinct string once in a dictionary and keeps only small integer codes on the rows. Instead of 5 million long strings you store 81 strings plus 5 million small integers — memory typically drops to a tenth.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
