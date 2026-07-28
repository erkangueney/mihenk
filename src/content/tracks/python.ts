import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, pyTask, quiz, text, tip } from "../helpers";

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
            info(
              "Yorumlayıcı satır satır ilerler",
              "The interpreter goes line by line",
              "Python **yorumlanan** bir dildir: kodu yukarıdan aşağı okur ve her satırı sırayla çalıştırır. Üçüncü satırda hata varsa ilk iki satır **zaten çalışmıştır**. Bu, hata ayıklarken çok işine yarar — programın nereye kadar geldiğini `print` koyarak görebilirsin.",
              "Python is an **interpreted** language: it reads your code top to bottom and runs each line in turn. If line three has an error, the first two lines have **already run**. This helps a lot when debugging — you can see how far the program got by dropping in a `print`.",
            ),
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
            tip(
              "Bölme her zaman ondalık verir",
              "Division always gives a decimal",
              "Python'da `10 / 4` sonucu `2.5`'tir — tam sayılarla bölsen bile `float` döner. Tam sayı bölümü istiyorsan `//` kullan: `10 // 4` sonucu `2`. Kalanı almak için `%` vardır: `10 % 4` sonucu `2`. Bu üçünü karıştırmak, oran hesaplarında sık görülen bir hatadır.",
              "In Python `10 / 4` is `2.5` — you get a `float` even when dividing whole numbers. For integer division use `//`: `10 // 4` is `2`. For the remainder there is `%`: `10 % 4` is `2`. Mixing these three up is a common bug in rate calculations.",
            ),
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
            text(
              "**Hata çözme sırası — deneyimliler bu adımları izler:**\n\n1. Hata **tipini** oku: `TypeError` mi `NameError` mı? Tip, sorunun ailesini söyler.\n2. **Satır numarasına** git ve o satıra bak.\n3. Değişkenlerin gerçekte ne içerdiğini `print(type(x), x)` ile gör. Tahmin etme, bak.\n4. Hâlâ çözülmediyse hata mesajının **son satırını** aynen arama motoruna yapıştır. Senden önce binlerce kişi aynı hatayı almıştır.",
              "**The order in which experienced people debug:**\n\n1. Read the **error type**: is it a `TypeError` or a `NameError`? The type tells you the family of the problem.\n2. Go to the **line number** and look at that line.\n3. See what the variables actually hold with `print(type(x), x)`. Do not guess — look.\n4. If it is still unsolved, paste the **last line** of the error verbatim into a search engine. Thousands of people have hit the same error before you.",
            ),
            pitfall(
              "Girinti Python'da isteğe bağlı değildir",
              "Indentation is not optional in Python",
              "Çoğu dilde girinti sadece güzel görünsün diyedir; Python'da **dilin parçasıdır**. Bir `if`, `for` veya `def` bloğunun içindeki satırlar aynı miktarda içeri kaydırılmalıdır — standart 4 boşluktur. Boşluk ile sekmeyi karıştırmak, gözle görünmeyen ama programı durduran hatalara yol açar. Editörünü \"sekmeleri boşluğa çevir\" ayarında tut.",
              "In most languages indentation is just for looks; in Python it is **part of the language**. Lines inside an `if`, `for` or `def` block must be indented by the same amount — four spaces is the standard. Mixing spaces and tabs produces errors that are invisible to the eye but stop the program. Keep your editor set to convert tabs into spaces.",
            ),
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
            text(
              "Analizde en sık karşılaşılan hata, **sayı gibi görünen metindir**. CSV'den okunan `\"1.899\"` bir metindir; toplamaya kalkarsan Python hata verir veya daha kötüsü, metinleri birleştirir.",
              "The most common bug in analysis is **text that looks like a number**. A `\"1,899\"` read from CSV is a string; adding it either raises an error or, worse, concatenates the strings.",
            ),
            code(
              "python",
              `a = "10"
b = "5"
print(a + b)        # "105"  — metin birleştirme!
print(int(a) + int(b))  # 15  — doğru
print(float("3.14"))    # 3.14`,
            ),
            pitfall(
              "Ondalık ayırıcı tuzağı",
              "The decimal separator trap",
              "Türkçe biçimli veride `1.899,50` yazar; Python `1899.50` bekler. Dönüştürmeden önce binlik ayıracı sil, ondalık virgülü noktaya çevir: `float(metin.replace('.', '').replace(',', '.'))`. Bu tek satır, Türkiye'de çalışan analistlerin en sık düştüğü hatayı çözer.",
              "Turkish-formatted data writes `1.899,50` while Python expects `1899.50`. Strip the thousands separator and swap the decimal comma before converting: `float(text.replace('.', '').replace(',', '.'))`. That one line fixes the most common conversion bug for analysts working with European data.",
            ),
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
            info(
              "Sözlük listesi = tablo",
              "A list of dicts is a table",
              "Bir API'den gelen JSON verisi genelde \"sözlüklerden oluşan liste\"dir. `pd.DataFrame(kayitlar)` yazdığın anda bu yapı doğrudan bir tabloya dönüşür — pandas'a geçtiğinde bu bağlantıyı hatırla.",
              "JSON coming back from an API is usually a list of dicts. The moment you write `pd.DataFrame(records)` that structure becomes a table — remember this link when you get to pandas.",
            ),
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
            pitfall(
              "Değiştirilebilir varsayılan argüman",
              "Mutable default arguments",
              "`def ekle(x, liste=[])` yazma. Varsayılan liste fonksiyon **bir kez** oluşturulur ve çağrılar arasında paylaşılır; ikinci çağrıda içi dolu gelir. Doğrusu: `def ekle(x, liste=None):` ve gövdede `if liste is None: liste = []`.",
              "Never write `def add(x, items=[])`. The default list is created **once** and shared across calls, so the second call starts with leftovers. Write `def add(x, items=None):` and inside `if items is None: items = []`.",
            ),
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
            pitfall(
              "Çıplak `except` yazma",
              "Never write a bare `except`",
              "`except:` veya `except Exception:` yazmak, **her** hatayı yutar — yazım hatanı, bellek hatasını, hatta kullanıcının programı durdurma isteğini bile. Sonuç: program sessizce yanlış çalışır ve nedenini asla bulamazsın.\n\nDaima beklediğin hatayı adıyla yakala: `except ValueError:`, `except KeyError:`, `except FileNotFoundError:`. Beklemediğin hata zaten patlamalı ki haberin olsun.",
              "Writing `except:` or `except Exception:` swallows **every** error — your typos, memory errors, even the user's request to stop the program. The result: the program quietly misbehaves and you never find out why.\n\nAlways catch the error you expect, by name: `except ValueError:`, `except KeyError:`, `except FileNotFoundError:`. An error you did not anticipate should blow up, so that you learn about it.",
            ),
            text(
              "**Modüller**, başkalarının yazdığı hazır kodu programına getirir. Python'un standart kütüphanesi kurulum gerektirmez:\n\n```python\nimport math\nimport statistics as ist          # takma ad ver\nfrom datetime import date         # sadece bir parçasını al\n\nprint(math.sqrt(16))              # 4.0\nprint(ist.median([3, 1, 4, 1, 5]))  # 3\nprint(date.today().year)\n```\n\nÜç yazım da yaygındır. `import x` her şeyi getirir; `from x import y` yalnızca ihtiyacın olanı; `as` uzun isimleri kısaltır — `import pandas as pd` bunun en bilinen örneğidir.",
              "**Modules** bring code written by other people into your program. Python's standard library needs no installation:\n\n```python\nimport math\nimport statistics as st           # give it an alias\nfrom datetime import date         # take only one piece\n\nprint(math.sqrt(16))              # 4.0\nprint(st.median([3, 1, 4, 1, 5])) # 3\nprint(date.today().year)\n```\n\nAll three forms are common. `import x` brings everything; `from x import y` only what you need; `as` shortens long names — `import pandas as pd` being the most famous example.",
            ),
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
            pitfall(
              "and / or değil, & / |",
              "Use & / | , not and / or",
              "Python'un `and` operatörü tek bir doğruluk değeri bekler; pandas maskesi ise bir dizidir. `df[(a) & (b)]` yaz ve **her koşulu parantez içine al** — `&` operatörü `>` işaretinden önce çalıştığı için parantezsiz kod sessizce yanlış sonuç verir.",
              "Python's `and` expects a single truth value while a pandas mask is an array. Write `df[(a) & (b)]` and **wrap each condition in parentheses** — `&` binds tighter than `>`, so unparenthesised code fails or silently misbehaves.",
            ),
            pitfall(
              "SettingWithCopyWarning",
              "SettingWithCopyWarning",
              "`alt = df[df.fiyat > 100]` ardından `alt[\"yeni\"] = ...` yazarsan pandas seni uyarır: elindeki bir kopya mı görünüm mü belirsizdir. Niyetin ayrı bir tablo ise `.copy()` ekle: `alt = df[df.fiyat > 100].copy()`. Niyetin asıl tabloyu değiştirmekse `df.loc[maske, \"yeni\"] = ...` kullan.",
              "Writing `sub = df[df.price > 100]` then `sub[\"new\"] = ...` triggers a warning: pandas cannot tell whether you hold a copy or a view. If you want a separate table add `.copy()`. If you meant to edit the original, use `df.loc[mask, \"new\"] = ...`.",
            ),
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
            tip(
              "reset_index() alışkanlığı",
              "Get used to reset_index()",
              "`groupby` sonucunda grup anahtarı **indekse** taşınır. Sonucu Excel'e yazacak, grafik çizecek veya başka tabloyla birleştireceksen `.reset_index()` ile onu tekrar normal bir sütuna çevir.",
              "After `groupby` the group key moves into the **index**. If you are exporting to Excel, plotting, or merging with another table, call `.reset_index()` to bring it back as a regular column.",
            ),
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
            info(
              "Eksik değeri doldurmak masum bir karar değildir",
              "Filling missing values is never a neutral decision",
              "Ortalamayla doldurmak varyansı düşürür ve istatistiksel testleri yanıltır. Medyan aykırı değerlere dayanıklıdır. Bazen en doğrusu doldurmamak, `eksik_mi` diye bir bayrak sütunu eklemektir — çünkü **verinin eksik olması** bilginin kendisi olabilir (örneğin formu yarıda bırakan kullanıcı).",
              "Filling with the mean shrinks variance and skews statistical tests. The median is robust to outliers. Sometimes the right answer is not to fill at all but to add an `is_missing` flag — because **missingness itself** can be the signal (a user who abandoned the form, say).",
            ),
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
            pitfall(
              "Kimlik numaraları sayı olarak okunmamalı",
              "Identifiers must not be read as numbers",
              "`musteri_no` sütununda `00123` varsa ve pandas bunu sayı sanarsa `123` olur — baştaki sıfırlar gider ve o kayıt artık başka bir sistemle eşleşmez. Aynı sorun TC kimlik, IBAN, barkod, telefon ve posta kodunda da yaşanır.\n\nKural: **üzerinde matematik yapmayacağın hiçbir sayı, sayı tipinde olmamalıdır.** `dtype={\"musteri_no\": str}` yazmak bu hatayı kökten keser.",
              "If `customer_no` contains `00123` and pandas takes it for a number, it becomes `123` — the leading zeros vanish and that record no longer matches any other system. The same happens with national ids, IBANs, barcodes, phone numbers and postcodes.\n\nThe rule: **any number you will not do arithmetic on should not be a numeric type.** Writing `dtype={\"customer_no\": str}` eliminates the bug at the root.",
            ),
            info(
              "CSV ne zaman yetmez?",
              "When is CSV not enough?",
              "CSV her yerde açılır ama tipleri saklamaz — her okuyuşta pandas tipleri yeniden tahmin eder ve bazen yanılır. Ayrıca sıkıştırılmamıştır ve satır satır okunur.\n\n**Parquet** bu üç sorunu da çözer: tipleri dosyanın içinde tutar, 5-10 kat küçüktür ve sütunlu olduğu için yalnızca ihtiyacın olan sütunları okur. Ara çıktıları saklarken CSV yerine Parquet kullanmak, büyük veri setlerinde tek satırla ciddi hız kazandırır.",
              "CSV opens everywhere but stores no types — pandas re-guesses them on every read and sometimes gets it wrong. It is also uncompressed and read row by row.\n\n**Parquet** solves all three: it keeps types inside the file, is 5-10× smaller, and being columnar it reads only the columns you ask for. Saving intermediate outputs as Parquet instead of CSV is a one-line change that buys real speed on large datasets.",
            ),
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
            tip(
              "Birleştirme sonrası satır sayısını kontrol et",
              "Check the row count after every merge",
              "Birleştirmeden önce ve sonra `len(df)` yaz. Satır sayısı beklenmedik şekilde arttıysa sağ tarafta tekrarlanan anahtar vardır ve tüm metriklerin şişer. `validate=\"many_to_one\"` bu hatayı sessiz kalmak yerine anında hataya çevirir.",
              "Print `len(df)` before and after. If the count grew unexpectedly, the right side has duplicate keys and every metric is now inflated. `validate=\"many_to_one\"` turns that silent bug into an immediate error.",
            ),
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
            text(
              "Tekrarlanabilirlik, hızdan daha değerlidir. Bir analiz betiği şu üç şeyi sağlamalı: **kaynak veri sabit**, **adımlar sıralı ve yorumlu**, **çıktı tek komutla yeniden üretilebilir**.",
              "Reproducibility beats speed. An analysis script should guarantee three things: **a fixed source dataset**, **ordered and commented steps**, and **an output you can regenerate with one command**.",
            ),
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
            text(
              "**MultiIndex**, birden çok sütuna göre grupladığında ortaya çıkar:\n\n```python\nozet = df.groupby([\"sehir\", \"segment\"])[\"ciro\"].sum()\nozet.loc[\"İstanbul\"]              # tek seviye seç\nozet.unstack()                     # ikinci seviyeyi sütuna çevir\nozet.reset_index()                 # düz DataFrame'e dön\n```\n\nMultiIndex güçlüdür ama okuması zordur. Pratik tavsiye: hesabı MultiIndex ile yap, sonucu paylaşmadan önce `reset_index()` ile düzleştir. Böylece hem hesap kısa olur hem çıktı herkesin anlayabileceği düz bir tablo.",
              "A **MultiIndex** appears when you group by more than one column:\n\n```python\nsummary = df.groupby([\"city\", \"segment\"])[\"revenue\"].sum()\nsummary.loc[\"İstanbul\"]           # select one level\nsummary.unstack()                  # move the second level into columns\nsummary.reset_index()              # return to a flat DataFrame\n```\n\nA MultiIndex is powerful but hard to read. Practical advice: compute with it, then flatten with `reset_index()` before sharing. That keeps the computation short and the output a flat table anyone can read.",
            ),
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
            text(
              "**Veri doğrulama** ise veriyi korur. Kod değişmese bile kaynak sistem bir gün fiyatları kuruş cinsinden göndermeye başlarsa raporun sessizce 100 katına çıkar. Bunu yakalamanın yolu, beklentilerini koda yazmaktır:\n\n```python\ndef dogrula(df):\n    assert len(df) > 0, \"Veri boş geldi\"\n    assert df[\"fiyat\"].between(0, 100_000).all(), \"Fiyat beklenen aralık dışında\"\n    assert df[\"musteri_no\"].notna().all(), \"Müşteri numarası boş olamaz\"\n    assert not df[\"siparis_no\"].duplicated().any(), \"Tekrarlı sipariş var\"\n    return df\n```\n\nBu fonksiyonu veri hattının başına koyarsan, bozuk veri rapora hiç ulaşamaz — hata sessiz kalmak yerine yüksek sesle patlar. Büyük projelerde aynı işi `pandera` ve `Great Expectations` kütüphaneleri yapar.",
              "**Data validation** protects the data. Even if your code never changes, the day the source system starts sending prices in cents your report silently multiplies by 100. The way to catch this is to write your expectations into the code:\n\n```python\ndef validate(df):\n    assert len(df) > 0, \"Data came back empty\"\n    assert df[\"price\"].between(0, 100_000).all(), \"Price outside expected range\"\n    assert df[\"customer_no\"].notna().all(), \"Customer number cannot be blank\"\n    assert not df[\"order_no\"].duplicated().any(), \"Duplicate orders present\"\n    return df\n```\n\nPut this at the head of the pipeline and broken data never reaches the report — the failure is loud instead of silent. On larger projects the `pandera` and `Great Expectations` libraries do the same job.",
            ),
            tip(
              "Sınır durumlarını test et",
              "Test the edges",
              "Ortalama bir girdiyle test yazmak kolaydır ama hatalar sınırda yaşar. Her fonksiyon için şunları dene: **boş girdi** (`[]`, boş DataFrame), **tek eleman**, **sıfır**, **negatif değer**, **çok büyük değer** ve **eksik değer** (`None`, `NaN`). Kodun bu altısında ne yaptığını biliyorsan, gerisi genellikle kendiliğinden doğrudur.",
              "Writing a test with an average input is easy, but bugs live at the edges. For every function try: **empty input** (`[]`, an empty DataFrame), **a single element**, **zero**, **a negative value**, **a very large value**, and **missing values** (`None`, `NaN`). If you know what your code does in those six cases, the rest is usually right by itself.",
            ),
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
            info(
              "Notebook mu, betik mi?",
              "Notebook or script?",
              "Jupyter notebook keşif için mükemmeldir: kodu parça parça çalıştırır, çıktıyı hemen görürsün. Ama iki tuzağı vardır: hücreleri **sırasız** çalıştırabilirsin (yukarıdaki hücre aşağıdakinden sonra çalışmış olabilir) ve çıktılar dosyaya gömüldüğü için Git'te okunmaz farklar üretir.\n\nPratik kural: **keşfi notebook'ta yap, tekrarlanan işi `.py` dosyasına taşı.** Notebook'u paylaşmadan önce \"Restart & Run All\" ile baştan çalıştır — sırasız hücre hatalarını bu yakalar.",
              "A Jupyter notebook is superb for exploration: you run code in pieces and see output instantly. But it has two traps: you can run cells **out of order** (the cell above may have run after the one below), and because outputs are embedded in the file it produces unreadable diffs in Git.\n\nA practical rule: **explore in a notebook, move repeated work into a `.py` file.** Before sharing a notebook, do \"Restart & Run All\" — that is what catches out-of-order-cell bugs.",
            ),
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
            tip(
              "Önce ölç, sonra optimize et",
              "Measure first, optimise second",
              "`df.info(memory_usage=\"deep\")` her sütunun kaç bayt yediğini gösterir. Genellikle bellek tüketiminin büyük kısmını bir veya iki metin sütunu yapar; onları `category` tipine çevirmek çoğu zaman tek başına sorunu çözer.\n\nHız için de aynısı geçerli: `%%timeit` ile ölçmeden hangi satırın yavaş olduğunu tahmin etme. Yavaş sandığın satır genellikle yavaş olan değildir.",
              "`df.info(memory_usage=\"deep\")` shows how many bytes each column consumes. Usually one or two text columns account for most of it; converting those to `category` often solves the problem on its own.\n\nThe same goes for speed: do not guess which line is slow without measuring with `%%timeit`. The line you think is slow usually is not.",
            ),
            text(
              "**Ne zaman pandas'tan çıkmalı?**\n\n- **Polars** — pandas'a çok benzeyen ama çok çekirdekli ve tembel değerlendirmeli bir kütüphane. Aynı işi 5-20 kat hızlı yapar, bellek kullanımı daha düşüktür.\n- **DuckDB** — dosyanın üzerinde doğrudan SQL çalıştırır: `duckdb.query(\"SELECT sehir, SUM(tutar) FROM 'buyuk.parquet' GROUP BY sehir\")`. Belleğe sığmayan dosyalarda bile çalışır.\n- **Dask / Spark** — veri tek makineye sığmıyorsa, işi kümeye dağıtır.\n\nSıralama önemlidir: DuckDB çoğu analitik iş için en az çabayla en çok kazancı verir; Spark'a ancak gerçekten dağıtık ölçekte ihtiyaç duyulur.",
              "**When should you leave pandas?**\n\n- **Polars** — a library very similar to pandas but multi-core and lazily evaluated. It does the same work 5-20× faster with lower memory use.\n- **DuckDB** — runs SQL directly over the file: `duckdb.query(\"SELECT city, SUM(amount) FROM 'big.parquet' GROUP BY city\")`. It works even on files that do not fit in memory.\n- **Dask / Spark** — when the data does not fit on one machine, they distribute the work across a cluster.\n\nThe order matters: DuckDB gives the largest gain for the least effort on most analytical work; Spark is only needed at genuinely distributed scale.",
            ),
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
