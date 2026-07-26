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
      id: "beginner",
      title: L("Başlangıç — Dilin temelleri", "Beginner — Language basics"),
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
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "intermediate",
      title: L("Orta — pandas ile veri analizi", "Intermediate — Data analysis with pandas"),
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
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: "advanced",
      title: L("İleri — Üretime yakın analiz", "Advanced — Production-grade analysis"),
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
      ],
    },
  ],
};
