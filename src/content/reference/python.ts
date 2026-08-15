import { entry, group, section } from "./helpers";

/**
 * Python + pandas referansı.
 *
 * "Kendin dene" örnekleri Pyodide'da çalışır. `import pandas` geçen örneklerde
 * pandas ilk çalıştırmada indirilir (birkaç saniye), sonrasında anlıktır.
 */
export const pythonReference = group({
  slug: "python",
  name: "Python & pandas",
  icon: "🐍",
  color: "hsl(45 93% 55%)",
  lang: "python",
  trackSlug: "python",
  tagline: ["Veri analizinin ana dili", "The working language of data analysis"],
  description: [
    "Python temelleri ve pandas'ın günlük olarak kullanılan fonksiyonları. Her örnek tarayıcıda gerçekten çalışır — pandas dahil.",
    "Python fundamentals and the pandas functions you actually use daily. Every example truly runs in your browser — pandas included.",
  ],
  sections: [
    section("temel", ["Dilin temeli", "Language basics"], [
      entry({
        slug: "list",
        name: "list",
        summary: ["Sıralı, değiştirilebilir koleksiyon.", "An ordered, mutable collection."],
        syntax: "liste = [1, 2, 3]\nliste.append(4)\nliste[0]  # ilk öğe\nliste[-1] # son öğe",
        description: [
          "Dilimleme `liste[baş:son]` biçimindedir ve **son dahil değildir**. `liste[::-1]` listeyi ters çevirir.",
          "Slicing is `list[start:stop]` and the **stop is exclusive**. `list[::-1]` reverses the list.",
        ],
        example: { code: "sayilar = [4, 8, 15, 16, 23, 42]\nprint(sayilar[1:4])\nprint(sayilar[::-1])" },
        try: {
          engine: "python",
          code: "sayilar = [4, 8, 15, 16, 23, 42]\nprint(\"ilk üç:\", sayilar[:3])\nprint(\"son:\", sayilar[-1])\nprint(\"ters:\", sayilar[::-1])\nprint(\"toplam:\", sum(sayilar))",
        },
        related: ["python/dict", "python/comprehension"],
        keywords: ["list", "liste", "dizi", "slice", "dilimleme"],
      }),
      entry({
        slug: "dict",
        name: "dict",
        summary: ["Anahtar–değer eşlemesi.", "A key–value mapping."],
        syntax: "d = {\"ad\": \"Elif\", \"yas\": 30}\nd[\"ad\"]\nd.get(\"yok\", \"varsayılan\")",
        description: [
          "`d[\"yok\"]` anahtar yoksa hata verir; `d.get(\"yok\", varsayılan)` vermez. Sözlükler Python 3.7'den beri ekleme sırasını korur.",
          "`d[\"missing\"]` raises; `d.get(\"missing\", default)` does not. Dicts preserve insertion order since Python 3.7.",
        ],
        example: {
          code: "kisi = {\"ad\": \"Elif\", \"sehir\": \"İzmir\"}\nfor anahtar, deger in kisi.items():\n    print(anahtar, \"->\", deger)",
        },
        try: {
          engine: "python",
          code: "sehirler = {\"İstanbul\": 15840900, \"Ankara\": 5747325, \"İzmir\": 4462056}\nfor ad, nufus in sehirler.items():\n    print(f\"{ad:<10} {nufus:>10,}\")\nprint(\"en kalabalık:\", max(sehirler, key=sehirler.get))",
        },
        related: ["python/list", "python/fstring"],
        keywords: ["dict", "sözlük", "anahtar", "key", "value", "map"],
      }),
      entry({
        slug: "comprehension",
        name: "List comprehension",
        summary: [
          "Tek satırda liste üretir ve filtreler.",
          "Builds and filters a list in one line.",
        ],
        syntax: "[ifade for öğe in dizi if koşul]",
        description: [
          "Döngü + `append` kalıbının kısası. Sözlük ve küme için de çalışır: `{k: v for ...}`. Üç satırdan uzun mantığı comprehension'a sıkıştırma — okunmaz olur.",
          "The short form of a loop + `append`. Works for dicts and sets too: `{k: v for ...}`. Don't cram logic longer than three lines into one — it stops being readable.",
        ],
        example: { code: "kareler = [x**2 for x in range(10) if x % 2 == 0]" },
        try: {
          engine: "python",
          code: "fiyatlar = [1899, 2450, 4290, 549, 349, 7990]\nkdvli = [round(f * 1.2) for f in fiyatlar]\npahali = [f for f in fiyatlar if f > 2000]\nprint(\"KDV'li:\", kdvli)\nprint(\"pahalı:\", pahali)\nprint(\"etiketler:\", {f: (\"pahalı\" if f > 2000 else \"uygun\") for f in fiyatlar})",
        },
        related: ["python/list", "python/lambda"],
        keywords: ["comprehension", "liste üretimi", "filtre", "one-liner"],
      }),
      entry({
        slug: "def",
        name: "def",
        summary: ["Fonksiyon tanımlar.", "Defines a function."],
        syntax: "def ad(parametre, varsayilan=0):\n    return sonuç",
        description: [
          "Varsayılan değer olarak **asla** değiştirilebilir bir nesne (liste, sözlük) verme — o nesne tüm çağrılar arasında paylaşılır. `None` ver, içeride oluştur.",
          "**Never** use a mutable object (list, dict) as a default — it is shared across all calls. Pass `None` and create it inside.",
        ],
        example: {
          code: "def buyume(yeni, eski):\n    if eski == 0:\n        return None\n    return (yeni - eski) / eski",
        },
        try: {
          engine: "python",
          code: "def buyume(yeni, eski):\n    \"\"\"Yüzde değişim. Bölen sıfırsa None döner.\"\"\"\n    if not eski:\n        return None\n    return round(100 * (yeni - eski) / eski, 1)\n\nprint(buyume(1250, 1000), \"%\")\nprint(buyume(900, 1000), \"%\")\nprint(buyume(10, 0))",
        },
        related: ["python/lambda"],
        keywords: ["def", "fonksiyon", "function", "return"],
      }),
      entry({
        slug: "lambda",
        name: "lambda",
        summary: ["İsimsiz, tek satırlık fonksiyon.", "An anonymous one-line function."],
        syntax: "lambda x: x * 2",
        description: [
          "`sorted(key=...)`, `map`, `filter` ve pandas'ın `apply` çağrılarında kullanılır. Bir isim verecek kadar önemliyse `def` yaz.",
          "Used with `sorted(key=...)`, `map`, `filter` and pandas `apply`. If it deserves a name, write a `def`.",
        ],
        example: { code: "sirali = sorted(kisiler, key=lambda k: k[\"yas\"], reverse=True)" },
        try: {
          engine: "python",
          code: "urunler = [\n    {\"ad\": \"Kulaklık\", \"fiyat\": 1899},\n    {\"ad\": \"Klavye\", \"fiyat\": 2450},\n    {\"ad\": \"Yoga Matı\", \"fiyat\": 549},\n]\nfor u in sorted(urunler, key=lambda u: u[\"fiyat\"], reverse=True):\n    print(u[\"ad\"], u[\"fiyat\"])",
        },
        related: ["python/def", "python/apply"],
        keywords: ["lambda", "anonim", "key", "sorted", "map"],
      }),
      entry({
        slug: "fstring",
        name: "f-string",
        summary: ["Metnin içine değer ve biçim gömer.", "Embeds values and formatting into text."],
        syntax: "f\"{değer:,.2f}\"",
        description: [
          "`:,` binlik ayraç, `:.2f` iki ondalık, `:>10` sağa yaslama, `:%` yüzde. Rapor çıktılarını okunur yapmanın en hızlı yolu.",
          "`:,` thousands separator, `:.2f` two decimals, `:>10` right-align, `:%` percent. The fastest way to make report output readable.",
        ],
        example: { code: "print(f\"Ciro: {ciro:,.2f} TL ({buyume:.1%})\")" },
        try: {
          engine: "python",
          code: "ciro = 1284530.4567\nbuyume = 0.1832\nprint(f\"Ciro   : {ciro:>15,.2f} TL\")\nprint(f\"Büyüme : {buyume:>15.1%}\")\nprint(f\"Yuvarlak: {ciro:>14,.0f} TL\")",
        },
        related: ["python/dict"],
        keywords: ["f-string", "format", "biçim", "print", "yüzde"],
      }),
    ]),

    section("pandas-temel", ["pandas: veri okuma ve bakma", "pandas: loading and inspecting"], [
      entry({
        slug: "dataframe",
        name: "pd.DataFrame()",
        summary: ["Tablo yapısı oluşturur.", "Creates a tabular structure."],
        syntax: "import pandas as pd\ndf = pd.DataFrame({\"sütun\": [1, 2, 3]})",
        description: [
          "DataFrame satır (index) ve sütunlardan oluşan bir tablodur. Sözlükten, listelerden, CSV'den veya SQL sorgusundan üretilebilir.",
          "A DataFrame is a table of rows (an index) and columns. It can be built from a dict, lists, a CSV or a SQL query.",
        ],
        example: {
          code: "df = pd.DataFrame({\"urun\": [\"A\", \"B\"], \"fiyat\": [100, 250]})",
        },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"urun\": [\"Kulaklık\", \"Klavye\", \"Saat\", \"Mat\"],\n    \"kategori\": [\"elektronik\", \"elektronik\", \"elektronik\", \"spor\"],\n    \"fiyat\": [1899, 2450, 4290, 549],\n    \"stok\": [120, 58, 34, 210],\n})\nprint(df)\nprint()\nprint(df.dtypes)",
        },
        related: ["python/read-csv", "python/info"],
        keywords: ["dataframe", "pandas", "tablo", "veri çerçevesi"],
      }),
      entry({
        slug: "read-csv",
        name: "pd.read_csv()",
        summary: ["CSV dosyasını DataFrame'e okur.", "Reads a CSV file into a DataFrame."],
        syntax: "pd.read_csv(\"dosya.csv\", sep=\",\", encoding=\"utf-8\")",
        description: [
          "Türkçe veride en sık takılınan üç ayar: `encoding=\"utf-8\"` veya `\"latin-5\"`, ayraç `sep=\";\"` (Excel'in TR çıktısı), ve ondalık `decimal=\",\"`. Tarih sütunları için `parse_dates=[\"tarih\"]` ekle.",
          "The three settings that trip people up: `encoding`, the separator `sep=\";\"` and `decimal=\",\"` for European CSVs. Add `parse_dates=[\"date\"]` for date columns.",
        ],
        params: [
          ["sep", "Sütun ayracı. Excel'in TR çıktısında `;` olur.", "Column separator. Often `;` in European Excel exports."],
          ["encoding", "Karakter kodlaması — Türkçe karakter bozuksa burayı değiştir.", "Character encoding — change this when characters look broken."],
          ["parse_dates", "Tarihe çevrilecek sütun listesi.", "List of columns to parse as dates."],
          ["nrows", "Yalnızca ilk n satırı oku — büyük dosyayı keşfetmek için.", "Read only the first n rows — for exploring a large file."],
        ],
        example: {
          code: "df = pd.read_csv(\"satis.csv\", sep=\";\", decimal=\",\", parse_dates=[\"tarih\"])",
        },
        related: ["python/dataframe", "python/info"],
        keywords: ["read_csv", "csv", "oku", "dosya", "encoding", "import"],
      }),
      entry({
        slug: "info",
        name: "head() / info() / describe()",
        summary: [
          "Veriye ilk bakışın üç komutu.",
          "The three commands for a first look at data.",
        ],
        syntax: "df.head()\ndf.info()\ndf.describe()",
        description: [
          "Yeni bir veri setiyle karşılaştığında sırayla bu üçünü çalıştır: `head` neye benzediğini, `info` tür ve eksikleri, `describe` dağılımı gösterir. `describe(include=\"all\")` metin sütunlarını da katar.",
          "Run these three in order on any new dataset: `head` shows what it looks like, `info` shows types and missing values, `describe` shows the distribution. `describe(include=\"all\")` covers text columns too.",
        ],
        example: { code: "df.info()\ndf.describe().round(2)" },
        try: {
          engine: "python",
          code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \"sehir\": [\"İstanbul\", \"Ankara\", \"İzmir\", \"Bursa\", \"İstanbul\"],\n    \"ciro\": [125000, 84000, np.nan, 41000, 156000],\n    \"siparis\": [340, 210, 180, 95, 402],\n})\nprint(df.head(3), \"\\n\")\ndf.info()\nprint(\"\\n\", df.describe().round(1))",
        },
        related: ["python/isna", "python/dataframe"],
        keywords: ["head", "info", "describe", "keşif", "eda", "özet"],
      }),
      entry({
        slug: "loc",
        name: ".loc[] / .iloc[]",
        summary: [
          "Satır ve sütun seçer — etiketle veya konumla.",
          "Selects rows and columns — by label or by position.",
        ],
        syntax: "df.loc[satır_koşulu, [\"sütun\"]]\ndf.iloc[0:5, 0:3]",
        description: [
          "`loc` **etiketle** çalışır ve dilimlemede son değeri **dahil eder**; `iloc` konumla çalışır ve etmez. Değer atarken mutlaka `loc` kullan — zincirleme indeksleme (`df[a][b] = ...`) sessizce çalışmayabilir.",
          "`loc` works by **label** and slices are **inclusive**; `iloc` works by position and is not. Always assign through `loc` — chained indexing (`df[a][b] = ...`) may silently do nothing.",
        ],
        example: { code: "df.loc[df[\"fiyat\"] > 1000, [\"urun\", \"fiyat\"]]" },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"urun\": [\"Kulaklık\", \"Klavye\", \"Saat\", \"Mat\", \"Tişört\"],\n    \"fiyat\": [1899, 2450, 4290, 549, 349],\n    \"stok\": [120, 58, 34, 210, 400],\n})\nprint(df.loc[df[\"fiyat\"] > 1000, [\"urun\", \"fiyat\"]], \"\\n\")\nprint(df.iloc[:2], \"\\n\")\n\ndf.loc[df[\"stok\"] > 100, \"durum\"] = \"bol\"\ndf.loc[df[\"stok\"] <= 100, \"durum\"] = \"kritik\"\nprint(df)",
        },
        related: ["python/filter", "python/dataframe"],
        keywords: ["loc", "iloc", "seçim", "indeks", "select", "filtre"],
      }),
      entry({
        slug: "filter",
        name: "Boole filtreleme",
        summary: [
          "Koşula uyan satırları getirir.",
          "Returns the rows matching a condition.",
        ],
        syntax: "df[(df[\"a\"] > 1) & (df[\"b\"] == \"x\")]",
        description: [
          "Koşulları `&` (ve), `|` (veya), `~` (değil) ile birleştir ve **her koşulu parantez içine al** — operatör önceliği yüzünden parantezsiz yazım hata verir. `and`/`or` burada çalışmaz.",
          "Combine conditions with `&`, `|`, `~` and **wrap every condition in parentheses** — without them operator precedence raises an error. Python's `and`/`or` do not work here.",
        ],
        example: { code: "df[(df[\"fiyat\"] > 1000) & (df[\"kategori\"] == \"elektronik\")]" },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"urun\": [\"Kulaklık\", \"Klavye\", \"Saat\", \"Mat\", \"Tişört\"],\n    \"kategori\": [\"elektronik\"] * 3 + [\"spor\", \"moda\"],\n    \"fiyat\": [1899, 2450, 4290, 549, 349],\n})\nprint(df[(df[\"fiyat\"] > 1000) & (df[\"kategori\"] == \"elektronik\")], \"\\n\")\nprint(df[df[\"kategori\"].isin([\"spor\", \"moda\"])], \"\\n\")\nprint(df[~df[\"urun\"].str.startswith(\"K\")])",
        },
        related: ["python/loc", "python/query"],
        keywords: ["filtre", "filter", "boolean", "koşul", "isin", "maske"],
      }),
      entry({
        slug: "query",
        name: ".query()",
        summary: [
          "Filtreyi metin ifadesiyle yazar.",
          "Writes the filter as a string expression.",
        ],
        syntax: "df.query(\"fiyat > 1000 and kategori == 'elektronik'\")",
        description: [
          "Uzun filtrelerde parantez cehenneminden kurtarır ve SQL'e benzediği için okunur. Dışarıdaki bir değişkeni `@degisken` ile kullanırsın.",
          "Saves you from parenthesis hell in long filters and reads like SQL. Reference an outside variable with `@variable`.",
        ],
        example: { code: "esik = 1000\ndf.query(\"fiyat > @esik\")" },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"urun\": [\"Kulaklık\", \"Klavye\", \"Saat\", \"Mat\"],\n    \"kategori\": [\"elektronik\", \"elektronik\", \"elektronik\", \"spor\"],\n    \"fiyat\": [1899, 2450, 4290, 549],\n})\nesik = 1500\nprint(df.query(\"fiyat > @esik and kategori == 'elektronik'\"))",
        },
        related: ["python/filter"],
        keywords: ["query", "sorgu", "filtre", "string"],
      }),
    ]),

    section("pandas-donusum", ["pandas: dönüştürme ve özetleme", "pandas: transforming and summarising"], [
      entry({
        slug: "groupby",
        name: ".groupby()",
        summary: ["Grup bazında özet üretir.", "Aggregates by group."],
        syntax: "df.groupby(\"sütun\")[\"değer\"].sum()\ndf.groupby([\"a\", \"b\"]).agg({\"x\": \"mean\", \"y\": \"sum\"})",
        description: [
          "SQL'deki `GROUP BY`'ın karşılığı. `agg` ile sütun başına farklı fonksiyon verebilir, `reset_index()` ile sonucu düz bir tabloya çevirebilirsin.",
          "The equivalent of SQL's `GROUP BY`. Use `agg` for a different function per column, and `reset_index()` to flatten the result back into a table.",
        ],
        example: {
          code: "df.groupby(\"kategori\").agg(ciro=(\"tutar\", \"sum\"), adet=(\"tutar\", \"size\")).reset_index()",
        },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"kategori\": [\"elektronik\", \"elektronik\", \"spor\", \"spor\", \"moda\"],\n    \"urun\": [\"Kulaklık\", \"Klavye\", \"Mat\", \"Ayakkabı\", \"Tişört\"],\n    \"tutar\": [1899, 2450, 549, 2790, 349],\n    \"adet\": [3, 1, 4, 2, 5],\n})\nozet = (df.groupby(\"kategori\")\n          .agg(ciro=(\"tutar\", \"sum\"), ort=(\"tutar\", \"mean\"), satir=(\"tutar\", \"size\"))\n          .round(1)\n          .sort_values(\"ciro\", ascending=False)\n          .reset_index())\nprint(ozet)",
        },
        related: ["python/pivot-table", "python/agg-sort"],
        keywords: ["groupby", "grupla", "agg", "özet", "aggregate"],
      }),
      entry({
        slug: "pivot-table",
        name: "pd.pivot_table()",
        summary: [
          "Uzun tabloyu çapraz tabloya çevirir.",
          "Turns a long table into a cross-tab.",
        ],
        syntax: "pd.pivot_table(df, index=\"satır\", columns=\"sütun\", values=\"değer\", aggfunc=\"sum\")",
        description: [
          "Excel'in pivot tablosunun aynısı. `fill_value=0` boş hücreleri doldurur, `margins=True` genel toplam satırı/sütunu ekler.",
          "Exactly Excel's pivot table. `fill_value=0` fills empty cells, `margins=True` adds grand totals.",
        ],
        example: {
          code: "pd.pivot_table(df, index=\"sehir\", columns=\"ay\", values=\"ciro\", aggfunc=\"sum\", fill_value=0)",
        },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"sehir\": [\"İstanbul\", \"İstanbul\", \"Ankara\", \"Ankara\", \"İzmir\", \"İzmir\"],\n    \"ay\": [\"Oca\", \"Şub\", \"Oca\", \"Şub\", \"Oca\", \"Şub\"],\n    \"ciro\": [125000, 138000, 84000, 79000, 61000, 72000],\n})\ntablo = pd.pivot_table(df, index=\"sehir\", columns=\"ay\", values=\"ciro\",\n                       aggfunc=\"sum\", fill_value=0, margins=True, margins_name=\"Toplam\")\nprint(tablo)",
        },
        related: ["python/groupby", "python/melt"],
        keywords: ["pivot", "pivot_table", "çapraz tablo", "crosstab"],
      }),
      entry({
        slug: "melt",
        name: ".melt()",
        summary: [
          "Geniş tabloyu uzun (tidy) biçime çevirir.",
          "Reshapes a wide table into long (tidy) form.",
        ],
        syntax: "df.melt(id_vars=[\"sabit\"], var_name=\"degisken\", value_name=\"deger\")",
        description: [
          "Her ay bir sütun olan Excel tablolarını analiz edilebilir hâle getirir. Görselleştirme kütüphanelerinin neredeyse tamamı uzun biçim ister. `pivot` bunun tersidir.",
          "Turns Excel tables where each month is a column into something analysable. Almost every plotting library wants long form. `pivot` is the inverse.",
        ],
        example: { code: "uzun = genis.melt(id_vars=\"sehir\", var_name=\"ay\", value_name=\"ciro\")" },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ngenis = pd.DataFrame({\n    \"sehir\": [\"İstanbul\", \"Ankara\", \"İzmir\"],\n    \"Ocak\": [125000, 84000, 61000],\n    \"Şubat\": [138000, 79000, 72000],\n    \"Mart\": [141000, 91000, 68000],\n})\nprint(\"GENİŞ\\n\", genis, \"\\n\")\nuzun = genis.melt(id_vars=\"sehir\", var_name=\"ay\", value_name=\"ciro\")\nprint(\"UZUN\\n\", uzun)",
        },
        related: ["python/pivot-table"],
        keywords: ["melt", "tidy", "uzun", "geniş", "reshape", "unpivot"],
      }),
      entry({
        slug: "merge",
        name: ".merge()",
        summary: ["İki DataFrame'i anahtara göre birleştirir.", "Joins two DataFrames on a key."],
        syntax: "df.merge(diger, on=\"anahtar\", how=\"left\")",
        description: [
          "SQL `JOIN`'inin karşılığı. `how`: `inner` (varsayılan), `left`, `right`, `outer`. Birleştirmeden sonra **satır sayısını mutlaka kontrol et** — anahtar benzersiz değilse satırlar çoğalır.",
          "The equivalent of SQL `JOIN`. `how`: `inner` (default), `left`, `right`, `outer`. Always **check the row count** afterwards — a non-unique key multiplies rows.",
        ],
        params: [
          ["on", "İki tarafta da aynı adı taşıyan anahtar sütun.", "The key column, named the same on both sides."],
          ["left_on / right_on", "Adlar farklıysa her taraf için ayrı anahtar.", "Separate keys when the names differ."],
          ["how", "Birleştirme türü: inner, left, right, outer.", "Join type: inner, left, right, outer."],
          ["indicator", "`True` ise satırın hangi taraftan geldiğini gösteren sütun ekler.", "When `True`, adds a column showing which side each row came from."],
        ],
        example: { code: "siparis.merge(musteri, on=\"musteri_id\", how=\"left\")" },
        try: {
          engine: "python",
          code: "import pandas as pd\n\nsiparis = pd.DataFrame({\"id\": [1, 2, 3, 4], \"musteri_id\": [10, 11, 10, 99], \"tutar\": [250, 400, 175, 900]})\nmusteri = pd.DataFrame({\"musteri_id\": [10, 11, 12], \"ad\": [\"Elif\", \"Mert\", \"Zeynep\"]})\n\nbirlesik = siparis.merge(musteri, on=\"musteri_id\", how=\"left\", indicator=True)\nprint(birlesik, \"\\n\")\nprint(\"eşleşmeyen satır sayısı:\", (birlesik[\"_merge\"] == \"left_only\").sum())",
        },
        related: ["python/concat", "python/groupby"],
        keywords: ["merge", "join", "birleştir", "anahtar", "left join"],
      }),
      entry({
        slug: "concat",
        name: "pd.concat()",
        summary: [
          "DataFrame'leri alt alta veya yan yana ekler.",
          "Stacks DataFrames vertically or side by side.",
        ],
        syntax: "pd.concat([df1, df2], ignore_index=True)",
        description: [
          "`axis=0` alt alta (varsayılan), `axis=1` yan yana. Aynı yapıdaki aylık dosyaları tek tabloda toplamanın standart yolu. `ignore_index=True` indeksi yeniden numaralar.",
          "`axis=0` stacks (default), `axis=1` places side by side. The standard way to combine monthly files with the same structure. `ignore_index=True` renumbers the index.",
        ],
        example: { code: "tum = pd.concat([ocak, subat, mart], ignore_index=True)" },
        try: {
          engine: "python",
          code: "import pandas as pd\n\nocak = pd.DataFrame({\"ay\": \"Ocak\", \"urun\": [\"A\", \"B\"], \"adet\": [10, 4]})\nsubat = pd.DataFrame({\"ay\": \"Şubat\", \"urun\": [\"A\", \"C\"], \"adet\": [12, 7]})\ntum = pd.concat([ocak, subat], ignore_index=True)\nprint(tum, \"\\n\")\nprint(tum.groupby(\"urun\")[\"adet\"].sum())",
        },
        related: ["python/merge"],
        keywords: ["concat", "birleştir", "append", "alt alta"],
      }),
      entry({
        slug: "apply",
        name: ".apply() / .map()",
        summary: [
          "Her satıra veya değere fonksiyon uygular.",
          "Applies a function to each row or value.",
        ],
        syntax: "df[\"yeni\"] = df[\"a\"].apply(fonksiyon)\ndf.apply(fonksiyon, axis=1)",
        description: [
          "Esnek ama **yavaş**: milyon satırda vektörel işlem (`df[\"a\"] * 2`, `np.where`) `apply`'dan kat kat hızlıdır. Önce vektörel bir yol ara, bulamazsan `apply` kullan.",
          "Flexible but **slow**: on millions of rows, vectorised operations (`df[\"a\"] * 2`, `np.where`) beat `apply` by a wide margin. Look for the vectorised route first.",
        ],
        example: { code: "df[\"bant\"] = df[\"fiyat\"].apply(lambda f: \"pahalı\" if f > 2000 else \"uygun\")" },
        try: {
          engine: "python",
          code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\"urun\": [\"A\", \"B\", \"C\", \"D\"], \"fiyat\": [1899, 2450, 549, 4290]})\n\n# apply — okunur ama yavaş\ndf[\"bant_apply\"] = df[\"fiyat\"].apply(lambda f: \"pahalı\" if f > 2000 else \"uygun\")\n# vektörel — aynı sonuç, çok daha hızlı\ndf[\"bant_hizli\"] = np.where(df[\"fiyat\"] > 2000, \"pahalı\", \"uygun\")\nprint(df)",
        },
        related: ["python/lambda", "python/filter"],
        keywords: ["apply", "map", "uygula", "lambda", "vectorize"],
      }),
      entry({
        slug: "agg-sort",
        name: ".sort_values() / .value_counts()",
        summary: [
          "Sıralar ve frekans tablosu çıkarır.",
          "Sorts and builds a frequency table.",
        ],
        syntax: "df.sort_values(\"sütun\", ascending=False)\ndf[\"sütun\"].value_counts()",
        description: [
          "`value_counts()` kategorik bir sütunu keşfetmenin en hızlı yolu; `normalize=True` ile yüzde, `dropna=False` ile eksikleri de gösterir.",
          "`value_counts()` is the fastest way to explore a categorical column; `normalize=True` gives shares and `dropna=False` includes missing values.",
        ],
        example: { code: "df[\"sehir\"].value_counts(normalize=True).round(3)" },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ndf = pd.DataFrame({\"sehir\": [\"İstanbul\"] * 5 + [\"Ankara\"] * 3 + [\"İzmir\"] * 2 + [None]})\nprint(df[\"sehir\"].value_counts(dropna=False), \"\\n\")\nprint(df[\"sehir\"].value_counts(normalize=True).mul(100).round(1))",
        },
        related: ["python/groupby"],
        keywords: ["sort_values", "value_counts", "sırala", "frekans", "dağılım"],
      }),
    ]),

    section("temizlik", ["pandas: veri temizliği", "pandas: cleaning data"], [
      entry({
        slug: "isna",
        name: ".isna() / .fillna() / .dropna()",
        summary: ["Eksik veriyi bulur, doldurur, atar.", "Finds, fills and drops missing data."],
        syntax: "df.isna().sum()\ndf[\"a\"].fillna(0)\ndf.dropna(subset=[\"a\"])",
        description: [
          "Önce `df.isna().sum()` ile eksiklerin **nerede** olduğunu gör. Doldurma kararı veriye bağlıdır: sayısalda medyan, kategorikte 'bilinmiyor', zaman serisinde `ffill`. Satır atmak son çaredir.",
          "Start with `df.isna().sum()` to see **where** the gaps are. The fill strategy depends on the data: median for numerics, \"unknown\" for categories, `ffill` for time series. Dropping rows is the last resort.",
        ],
        example: { code: "df[\"ciro\"] = df[\"ciro\"].fillna(df[\"ciro\"].median())" },
        try: {
          engine: "python",
          code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \"sehir\": [\"İstanbul\", \"Ankara\", None, \"Bursa\"],\n    \"ciro\": [125000, np.nan, 61000, np.nan],\n})\nprint(\"eksikler:\\n\", df.isna().sum(), \"\\n\")\n\ndf[\"ciro\"] = df[\"ciro\"].fillna(df[\"ciro\"].median())\ndf[\"sehir\"] = df[\"sehir\"].fillna(\"bilinmiyor\")\nprint(df)",
        },
        related: ["python/duplicated", "python/astype"],
        keywords: ["isna", "fillna", "dropna", "eksik", "null", "nan", "missing"],
      }),
      entry({
        slug: "duplicated",
        name: ".duplicated() / .drop_duplicates()",
        summary: ["Tekrar eden satırları bulur ve siler.", "Finds and removes duplicate rows."],
        syntax: "df.duplicated(subset=[\"id\"]).sum()\ndf.drop_duplicates(subset=[\"id\"], keep=\"last\")",
        description: [
          "`subset` ile hangi sütunların birlikte benzersiz olması gerektiğini söylersin. `keep=\"last\"` en güncel kaydı tutar — kayıt güncellemeleri alt alta yazılan tablolarda tam da istediğin şey.",
          "`subset` states which columns must be unique together. `keep=\"last\"` keeps the most recent record — exactly what you want in append-only update tables.",
        ],
        example: { code: "temiz = df.drop_duplicates(subset=[\"musteri_id\"], keep=\"last\")" },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"musteri_id\": [1, 2, 1, 3, 2],\n    \"guncelleme\": [\"2024-01\", \"2024-01\", \"2024-05\", \"2024-02\", \"2024-06\"],\n    \"segment\": [\"bireysel\", \"kurumsal\", \"kurumsal\", \"bireysel\", \"bireysel\"],\n})\nprint(\"tekrar sayısı:\", df.duplicated(subset=[\"musteri_id\"]).sum())\ntemiz = df.sort_values(\"guncelleme\").drop_duplicates(subset=[\"musteri_id\"], keep=\"last\")\nprint(temiz.sort_values(\"musteri_id\"))",
        },
        related: ["python/isna"],
        keywords: ["duplicated", "drop_duplicates", "tekrar", "mükerrer", "duplicate"],
      }),
      entry({
        slug: "astype",
        name: ".astype() / pd.to_datetime()",
        summary: ["Sütun türünü değiştirir.", "Changes a column's type."],
        syntax: "df[\"a\"] = df[\"a\"].astype(\"int64\")\ndf[\"tarih\"] = pd.to_datetime(df[\"tarih\"])",
        description: [
          "CSV'den gelen sayılar sıklıkla metin olur; tür düzeltilmeden toplama yapılamaz. Bozuk değerler varsa `pd.to_numeric(x, errors=\"coerce\")` onları NaN yapar. Tarihte `format=` vermek hem hızlı hem güvenlidir.",
          "Numbers from CSVs often arrive as text and can't be summed until fixed. For dirty values, `pd.to_numeric(x, errors=\"coerce\")` turns them into NaN. Passing `format=` for dates is both faster and safer.",
        ],
        example: {
          code: "df[\"tutar\"] = pd.to_numeric(df[\"tutar\"], errors=\"coerce\")\ndf[\"tarih\"] = pd.to_datetime(df[\"tarih\"], format=\"%d.%m.%Y\")",
        },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"tarih\": [\"01.03.2024\", \"15.03.2024\", \"02.04.2024\"],\n    \"tutar\": [\"1.250\", \"980\", \"bozuk\"],\n})\nprint(df.dtypes, \"\\n\")\n\ndf[\"tarih\"] = pd.to_datetime(df[\"tarih\"], format=\"%d.%m.%Y\")\ndf[\"tutar\"] = pd.to_numeric(df[\"tutar\"].str.replace(\".\", \"\", regex=False), errors=\"coerce\")\nprint(df, \"\\n\")\nprint(df.dtypes)",
        },
        related: ["python/read-csv", "python/isna"],
        keywords: ["astype", "to_datetime", "to_numeric", "tür", "dönüşüm", "dtype"],
      }),
      entry({
        slug: "str-accessor",
        name: ".str erişimcisi",
        summary: [
          "Metin sütunlarında toplu string işlemi yapar.",
          "Runs string operations across a whole text column.",
        ],
        syntax: "df[\"ad\"].str.strip().str.lower().str.replace(\" \", \"_\")",
        description: [
          "Python'un string metotlarının sütun hâli. Veri temizliğinde zincirleme kullanılır: boşluk kırp, küçült, karakter değiştir. `str.contains(...)` filtrelemede işe yarar.",
          "The column-wide version of Python's string methods. Chained during cleaning: trim, lower, replace. `str.contains(...)` is handy for filtering.",
        ],
        example: { code: "df[\"email\"] = df[\"email\"].str.strip().str.lower()" },
        try: {
          engine: "python",
          code: "import pandas as pd\n\ndf = pd.DataFrame({\"email\": [\"  Elif@Site.COM \", \"MERT@site.com\", \"zeynep@Site.com \"]})\ndf[\"temiz\"] = df[\"email\"].str.strip().str.lower()\ndf[\"alan\"] = df[\"temiz\"].str.split(\"@\").str[1]\nprint(df)",
        },
        related: ["python/astype", "python/filter"],
        keywords: ["str", "metin", "string", "temizlik", "strip", "lower", "contains"],
      }),
    ]),
  ],
});
