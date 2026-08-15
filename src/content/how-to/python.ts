import { info, pitfall, tip, tryPy } from "@/content/helpers";
import { howTo, step } from "./helpers";

/** Python & pandas senaryoları. */
export const pythonHowTos = [
  howTo({
    slug: "pythonla-eksik-veriler-nasil-doldurulur",
    title: [
      "Python ile eksik veriler nasıl doldurulur?",
      "How do you fill missing data with Python?",
    ],
    summary: [
      "Önce eksiğin nerede ve neden olduğunu gör; doldurma yöntemini veriye göre seç.",
      "First see where the gaps are and why; then choose the fill strategy to fit the data.",
    ],
    tool: "python",
    trackSlug: "python",
    minutes: 8,
    updated: "2026-08-04",
    answer: {
      body: [
        "Tek bir doğru cevap yok — yöntem sütunun türüne bağlı. Sayısal sütunda genelde **medyan** (ortalama aykırı değerlerden etkilenir), kategorik sütunda `\"bilinmiyor\"` gibi açık bir etiket, zaman serisinde `ffill`. Satırı atmak ancak eksik oranı düşükse ve eksiklik rastgeleyse mantıklıdır.",
        "There is no single right answer — the method depends on the column. For numerics the **median** usually beats the mean (outliers skew it); for categories an explicit `\"unknown\"` label; for time series `ffill`. Dropping rows only makes sense when the missing share is small and the gaps are random.",
      ],
      code: "df[\"ciro\"] = df[\"ciro\"].fillna(df[\"ciro\"].median())\ndf[\"sehir\"] = df[\"sehir\"].fillna(\"bilinmiyor\")\ndf[\"sicaklik\"] = df[\"sicaklik\"].ffill()",
      lang: "python",
    },
    steps: [
      step({
        title: ["Eksiği ölç", "Measure the gaps"],
        body: [
          "Doldurmadan önce hangi sütunda ne kadar eksik olduğunu gör. Bir sütunun %60'ı eksikse doldurmak değil, o sütunu kullanmamak doğru karar olabilir.",
          "Before filling anything, see how much is missing where. If a column is 60% empty, the right call may be to drop the column rather than fill it.",
        ],
        code: "print(df.isna().sum())\nprint((df.isna().mean() * 100).round(1))  # yüzde olarak",
        lang: "python",
      }),
      step({
        title: ["Eksikliğin sebebini sor", "Ask why it's missing"],
        body: [
          "Eksik değer rastgele mi, yoksa bir kural mı üretti? \"İade tarihi\" boşsa ürün iade edilmemiştir — bu eksik değil, **bilgi**dir. Böyle bir sütunu medyanla doldurmak veriyi bozar.",
          "Is the gap random, or produced by a rule? An empty \"return date\" means the item wasn't returned — that's not missing data, it's **information**. Filling it with a median corrupts the data.",
        ],
      }),
      step({
        title: ["Sayısal sütunları doldur", "Fill numeric columns"],
        body: [
          "Medyan aykırı değerlere dayanıklıdır. Gruplara göre doldurmak daha da iyidir: her şehrin kendi medyanı, genel medyandan anlamlıdır.",
          "The median is robust to outliers. Filling by group is better still: each city's own median beats the global one.",
        ],
        code: "# Genel medyan\ndf[\"ciro\"] = df[\"ciro\"].fillna(df[\"ciro\"].median())\n\n# Grup bazlı medyan — daha isabetli\ndf[\"ciro\"] = df[\"ciro\"].fillna(df.groupby(\"sehir\")[\"ciro\"].transform(\"median\"))",
        lang: "python",
      }),
      step({
        title: ["Kategorik ve zaman serilerini doldur", "Fill categories and time series"],
        body: [
          "Kategoride en sık değeri yazmak dağılımı bozar; `\"bilinmiyor\"` etiketi hem dürüst hem de analizde kendi kategorisi olarak görünür. Zaman serisinde son bilinen değer (`ffill`) mantıklıdır ama uzun boşlukları `limit` ile sınırla.",
          "Using the mode distorts the distribution; an `\"unknown\"` label is honest and shows up as its own category. For time series the last known value (`ffill`) makes sense, but cap long gaps with `limit`.",
        ],
        code: "df[\"segment\"] = df[\"segment\"].fillna(\"bilinmiyor\")\ndf[\"sicaklik\"] = df[\"sicaklik\"].ffill(limit=3)",
        lang: "python",
      }),
      step({
        title: ["Ne yaptığını işaretle", "Flag what you did"],
        body: [
          "Doldurduğun değerleri bir bayrak sütunuyla işaretle. Sonraki adımda modelin ya da raporun hangi sayıların tahmin olduğunu bilmesi gerekir.",
          "Mark filled values with a flag column. Downstream, your model or report needs to know which numbers were estimated.",
        ],
        code: "df[\"ciro_dolduruldu\"] = df[\"ciro\"].isna()\ndf[\"ciro\"] = df[\"ciro\"].fillna(df[\"ciro\"].median())",
        lang: "python",
      }),
    ],
    blocks: [
      tryPy(
        "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \"sehir\": [\"İstanbul\", \"İstanbul\", \"Ankara\", \"Ankara\", \"İzmir\", None],\n    \"ciro\": [125000, np.nan, 84000, np.nan, 61000, 40000],\n})\nprint(\"eksik oranı (%):\")\nprint((df.isna().mean() * 100).round(1), \"\\n\")\n\ndf[\"ciro_dolduruldu\"] = df[\"ciro\"].isna()\ndf[\"ciro\"] = df[\"ciro\"].fillna(df.groupby(\"sehir\")[\"ciro\"].transform(\"median\"))\ndf[\"ciro\"] = df[\"ciro\"].fillna(df[\"ciro\"].median())  # grubu da boş olanlar\ndf[\"sehir\"] = df[\"sehir\"].fillna(\"bilinmiyor\")\nprint(df)",
      ),
      pitfall(
        "Ortalamayla doldurmanın bedeli",
        "The cost of filling with the mean",
        "Ortalamayla doldurmak varyansı düşürür ve o sütunun diğerleriyle korelasyonunu zayıflatır. Eksik oranı yüksekse model \"herkes ortalama\" sanır. Az sayıda eksik için sorun değil, çoklukta ciddi bir yanlılık kaynağı.",
        "Mean-filling shrinks variance and weakens the column's correlation with others. With a high missing rate the model starts believing everyone is average. Fine for a few gaps, a real source of bias at scale.",
      ),
    ],
    faq: [
      {
        q: ["dropna() ne zaman doğru seçim?", "When is dropna() the right call?"],
        a: [
          "Eksik oranı düşükse (kabaca %5'in altı) ve eksiklik rastgeleyse. Ayrıca hedef değişkeni eksik olan satırlar denetimli öğrenmede doldurulmaz, atılır.",
          "When the missing share is small (roughly under 5%) and the gaps are random. Also, rows with a missing target variable are dropped rather than filled in supervised learning.",
        ],
      },
      {
        q: ["inplace=True kullanmalı mıyım?", "Should I use inplace=True?"],
        a: [
          "Hayır. `inplace` beklenenin aksine bellek kazandırmaz, zincirlemeyi bozar ve pandas'ın yeni sürümlerinde önerilmiyor. Sonucu yeniden ata: `df[\"a\"] = df[\"a\"].fillna(0)`.",
          "No. `inplace` doesn't save memory as people expect, breaks chaining, and is discouraged in recent pandas. Reassign instead: `df[\"a\"] = df[\"a\"].fillna(0)`.",
        ],
      },
    ],
    related: ["pandasta-birlesme-sonrasi-satir-artisi", "csv-turkce-karakter-sorunu"],
    keywords: ["eksik veri", "missing", "nan", "fillna", "dropna", "imputation", "doldurma"],
  }),

  howTo({
    slug: "csv-turkce-karakter-sorunu",
    title: [
      "CSV'deki Türkçe karakterler neden bozuk görünüyor?",
      "Why are Turkish characters broken in my CSV?",
    ],
    summary: [
      "Kodlama uyuşmazlığı. encoding, sep ve decimal ayarlarını dosyaya göre ver.",
      "An encoding mismatch. Set encoding, sep and decimal to match the file.",
    ],
    tool: "python",
    trackSlug: "python",
    minutes: 5,
    updated: "2026-08-04",
    answer: {
      body: [
        "Dosya bir kodlamayla yazılmış, sen başka bir kodlamayla okuyorsun. Türkiye'de üretilen dosyalarda sırayla `utf-8`, `utf-8-sig` (Excel'in BOM'lu çıktısı) ve `cp1254` / `latin-5` dene. Ayraç genelde `;`, ondalık ayracı `,` olur.",
        "The file was written with one encoding and you're reading it with another. For files produced in Turkey try `utf-8`, then `utf-8-sig` (Excel's BOM output), then `cp1254` / `latin-5`. The separator is usually `;` and the decimal mark `,`.",
      ],
      code: "df = pd.read_csv(\"satis.csv\", encoding=\"utf-8-sig\", sep=\";\", decimal=\",\")",
      lang: "python",
    },
    steps: [
      step({
        title: ["Belirtiye bak", "Read the symptom"],
        body: [
          "`Ä°stanbul` gibi görünüyorsa dosya UTF-8, sen tek baytlık bir kodlamayla okuyorsun. `İstanbul` yerine `Ýstanbul` görüyorsan tersi geçerli. `UnicodeDecodeError` alıyorsan kodlama kesinlikle yanlış.",
          "Seeing `Ä°stanbul` means the file is UTF-8 but you're reading it as single-byte. Seeing `Ýstanbul` means the opposite. A `UnicodeDecodeError` is a definite encoding mismatch.",
        ],
      }),
      step({
        title: ["Kodlamayı sırayla dene", "Try encodings in order"],
        body: [
          "Tahmin etmek yerine küçük bir döngüyle dene. İlk hatasız okunan doğru olma ihtimali en yüksek olandır.",
          "Rather than guessing, loop through candidates. The first one that reads without error is usually right.",
        ],
        code: "for enc in [\"utf-8\", \"utf-8-sig\", \"cp1254\", \"latin-5\"]:\n    try:\n        df = pd.read_csv(\"satis.csv\", encoding=enc, sep=None, engine=\"python\", nrows=5)\n        print(enc, \"→ tamam\"); print(df.head(2)); break\n    except (UnicodeDecodeError, LookupError) as hata:\n        print(enc, \"→\", type(hata).__name__)",
        lang: "python",
      }),
      step({
        title: ["Ayraç ve ondalığı düzelt", "Fix separator and decimal"],
        body: [
          "Türkçe Excel `;` ile ayırır ve ondalıkta virgül kullanır. Bunları vermezsen sayılar metin olarak okunur — toplama yapamazsın.",
          "Turkish Excel separates with `;` and uses a comma as the decimal mark. Without these settings your numbers arrive as text and can't be summed.",
        ],
        code: "df = pd.read_csv(\"satis.csv\", encoding=\"utf-8-sig\", sep=\";\", decimal=\",\", thousands=\".\")",
        lang: "python",
      }),
      step({
        title: ["Yeniden yazarken UTF-8 sabitle", "Standardise on UTF-8 when writing"],
        body: [
          "Temizlenmiş veriyi kaydederken `utf-8-sig` kullan: hem Python hem Excel doğru açar, sorun bir daha dolaşıma girmez.",
          "When saving the cleaned data use `utf-8-sig`: both Python and Excel open it correctly, so the problem doesn't circulate again.",
        ],
        code: "df.to_csv(\"temiz.csv\", index=False, encoding=\"utf-8-sig\", sep=\";\", decimal=\",\")",
        lang: "python",
      }),
    ],
    blocks: [
      info(
        "utf-8 ile utf-8-sig farkı",
        "utf-8 vs utf-8-sig",
        "`utf-8-sig`, dosyanın başındaki BOM işaretini (Excel'in eklediği üç bayt) yok sayar. Bu işaret `utf-8` ile okunduğunda ilk sütun adının başına görünmez bir karakter olarak yapışır — `df.columns` beklendiği gibi görünür ama `df[\"id\"]` KeyError verir.",
        "`utf-8-sig` strips the BOM that Excel writes at the start of a file. Read as plain `utf-8`, that mark sticks to the first column name as an invisible character — `df.columns` looks right but `df[\"id\"]` raises a KeyError.",
      ),
    ],
    faq: [
      {
        q: ["Sütun adları doğru görünüyor ama KeyError alıyorum.", "Column names look right but I get a KeyError."],
        a: [
          "Neredeyse kesin BOM ya da görünmez boşluk. `encoding=\"utf-8-sig\"` kullan ve `df.columns = df.columns.str.strip()` ile adları kırp.",
          "Almost certainly a BOM or invisible whitespace. Use `encoding=\"utf-8-sig\"` and trim the names with `df.columns = df.columns.str.strip()`.",
        ],
      },
    ],
    related: ["pythonla-eksik-veriler-nasil-doldurulur", "excelde-dusey-ara-yok-hatasi"],
    keywords: ["encoding", "utf-8", "türkçe karakter", "csv", "bozuk", "read_csv", "latin-5"],
  }),

  howTo({
    slug: "pandasta-birlesme-sonrasi-satir-artisi",
    title: [
      "pandas'ta merge sonrası satır sayısı neden arttı?",
      "Why did my row count grow after a pandas merge?",
    ],
    summary: [
      "Anahtar sağ tabloda benzersiz değil. Önce çoğaltan anahtarı bul, sonra ya tekilleştir ya da kabul et.",
      "The key isn't unique on the right. Find the duplicating key first, then either de-duplicate or accept the fan-out.",
    ],
    tool: "python",
    trackSlug: "python",
    minutes: 6,
    updated: "2026-08-04",
    answer: {
      body: [
        "Birleştirme, soldaki her satırı sağda eşleşen **her** satırla çarpar. Sağ tabloda anahtar iki kez geçiyorsa o satır ikiye çıkar. `validate=\"m:1\"` bunu daha olmadan hata olarak yakalar.",
        "A merge pairs each left row with **every** matching right row. If the key appears twice on the right, that row doubles. `validate=\"m:1\"` turns this into an error before it happens.",
      ],
      code: "birlesik = siparis.merge(urun, on=\"urun_id\", how=\"left\", validate=\"m:1\")",
      lang: "python",
    },
    steps: [
      step({
        title: ["Önce ve sonra say", "Count before and after"],
        body: [
          "Her birleştirmeden sonra satır sayısını kontrol etmeyi alışkanlık hâline getir. Beklenmedik artış sessizce raporlara sızan en yaygın hatadır — ciro iki katına çıkar ve kimse fark etmez.",
          "Make checking the row count after every merge a habit. An unexpected increase is the most common bug that leaks silently into reports — revenue doubles and nobody notices.",
        ],
        code: "print(len(siparis), \"→\", len(birlesik))",
        lang: "python",
      }),
      step({
        title: ["Çoğaltan anahtarı bul", "Find the duplicating key"],
        body: [
          "Sağ tabloda anahtarın kaç kez geçtiğine bak. Bir tanesi bile 1'den büyükse sebebi buldun demektir.",
          "Check how often the key occurs on the right. A single count above 1 is your culprit.",
        ],
        code: "print(urun[\"urun_id\"].duplicated().sum())\nprint(urun[urun[\"urun_id\"].duplicated(keep=False)].sort_values(\"urun_id\"))",
        lang: "python",
      }),
      step({
        title: ["validate ile sözleşmeyi yaz", "State the contract with validate"],
        body: [
          "`validate=\"m:1\"` \"soldaki çok satır, sağdaki tek satıra bağlanacak\" demektir. Varsayım bozulursa pandas hata fırlatır — sessiz çoğalma yerine gürültülü bir hata alırsın.",
          "`validate=\"m:1\"` says \"many rows on the left map to one row on the right\". If the assumption breaks, pandas raises — a loud error instead of a silent fan-out.",
        ],
        code: "siparis.merge(urun, on=\"urun_id\", how=\"left\", validate=\"m:1\")",
        lang: "python",
      }),
      step({
        title: ["Karar ver: tekilleştir ya da özetle", "Decide: de-duplicate or aggregate"],
        body: [
          "Sağ tablo bir referans tablosuysa (ürün, müşteri) tekilleştir. Gerçekten çok satırlıysa (her ürünün birden çok fiyat kaydı) birleştirmeden **önce** özetle.",
          "If the right table is a reference table (products, customers), de-duplicate it. If it's genuinely multi-row (several price records per product), aggregate it **before** merging.",
        ],
        code: "# a) referans tablo → tekilleştir\nurun_tekil = urun.sort_values(\"guncelleme\").drop_duplicates(\"urun_id\", keep=\"last\")\n\n# b) gerçekten çok satır → önce özetle\nfiyat_ozet = fiyat.groupby(\"urun_id\", as_index=False)[\"tutar\"].mean()",
        lang: "python",
      }),
    ],
    blocks: [
      tryPy(
        "import pandas as pd\n\nsiparis = pd.DataFrame({\"id\": [1, 2, 3], \"urun_id\": [10, 11, 10]})\n# 10 numaralı ürün iki kez: birleştirme satırları çoğaltacak\nurun = pd.DataFrame({\"urun_id\": [10, 10, 11], \"ad\": [\"Kulaklık\", \"Kulaklık (eski)\", \"Klavye\"]})\n\nsorunlu = siparis.merge(urun, on=\"urun_id\", how=\"left\")\nprint(\"öncesi:\", len(siparis), \"→ sonrası:\", len(sorunlu))\nprint(sorunlu, \"\\n\")\n\nurun_tekil = urun.drop_duplicates(\"urun_id\", keep=\"first\")\ntemiz = siparis.merge(urun_tekil, on=\"urun_id\", how=\"left\", validate=\"m:1\")\nprint(\"düzeltilmiş:\", len(temiz))\nprint(temiz)",
      ),
      tip(
        "indicator ile ne kaybettiğini gör",
        "Use indicator to see what you lost",
        "`indicator=True` her satırın hangi taraftan geldiğini söyleyen bir `_merge` sütunu ekler. `left_only` sayısı, eşleşme bulamamış satırlarındır — satır artışının yanında satır **kaybını** da böyle yakalarsın.",
        "`indicator=True` adds a `_merge` column telling you which side each row came from. The `left_only` count is your unmatched rows — that's how you catch row **loss** alongside row growth.",
      ),
    ],
    faq: [
      {
        q: ["Satır sayım azaldıysa?", "What if my row count dropped?"],
        a: [
          "`how=\"inner\"` kullanıyorsundur (varsayılan) ve eşleşmeyen satırlar düşmüştür. Soldaki her satırı korumak istiyorsan `how=\"left\"` yaz.",
          "You're using `how=\"inner\"` (the default) and unmatched rows were dropped. Use `how=\"left\"` to keep every row on the left.",
        ],
      },
    ],
    related: ["sqlde-mukerrer-kayitlar-nasil-bulunur", "pythonla-eksik-veriler-nasil-doldurulur"],
    keywords: ["merge", "join", "satır arttı", "çoğalma", "fan-out", "validate", "duplicate key"],
  }),

  howTo({
    slug: "excel-tablosunu-uzun-bicime-cevirme",
    title: [
      "Her ay bir sütun olan Excel tablosu pandas'ta nasıl düzeltilir?",
      "How do you fix an Excel table with one column per month in pandas?",
    ],
    summary: [
      "melt() ile geniş tabloyu uzun (tidy) biçime çevir — grafik ve pivot bunu ister.",
      "Reshape the wide table into long (tidy) form with melt() — charts and pivots expect it.",
    ],
    tool: "python",
    trackSlug: "python",
    minutes: 5,
    updated: "2026-08-04",
    answer: {
      body: [
        "Sabit kalacak sütunları `id_vars` olarak ver, gerisini `melt` uzun biçime çevirsin. Ay adları bir sütun değerine, sayılar tek bir değer sütununa dönüşür.",
        "Pass the columns that stay as `id_vars` and let `melt` turn the rest into long form. Month names become values in one column and the numbers land in a single value column.",
      ],
      code: "uzun = genis.melt(id_vars=\"sehir\", var_name=\"ay\", value_name=\"ciro\")",
      lang: "python",
    },
    steps: [
      step({
        title: ["Sorunu tanı", "Recognise the problem"],
        body: [
          "Sütun adı bir **değer** taşıyorsa (Ocak, Şubat, 2024) tablo geniş biçimdedir. Yeni bir ay geldiğinde tüm kodun bozulması bunun bedelidir.",
          "If a column name carries a **value** (January, February, 2024), the table is in wide form. The price you pay is that every new month breaks your code.",
        ],
      }),
      step({
        title: ["Sabit sütunları belirle", "Identify the fixed columns"],
        body: [
          "Kimlik taşıyan sütunlar `id_vars` olur: şehir, ürün, müşteri. Geri kalan her şey eritilir.",
          "The identifying columns become `id_vars`: city, product, customer. Everything else gets melted.",
        ],
        code: "uzun = genis.melt(id_vars=[\"sehir\", \"kategori\"], var_name=\"ay\", value_name=\"ciro\")",
        lang: "python",
      }),
      step({
        title: ["Türleri düzelt", "Fix the types"],
        body: [
          "Ay adları metin olarak gelir ve alfabetik sıralanır. Gerçek tarihe çevir ya da sıralı bir kategori tipi ver; yoksa grafiklerde Ağustos, Nisan'dan önce görünür.",
          "Month names arrive as text and sort alphabetically. Convert them to real dates or an ordered category, otherwise August plots before April.",
        ],
        code: "sira = [\"Ocak\", \"Şubat\", \"Mart\", \"Nisan\"]\nuzun[\"ay\"] = pd.Categorical(uzun[\"ay\"], categories=sira, ordered=True)\nuzun = uzun.sort_values([\"sehir\", \"ay\"])",
        lang: "python",
      }),
      step({
        title: ["Sunum için geri çevir", "Pivot back for presentation"],
        body: [
          "Analiz uzun biçimde yapılır, sunum geniş biçimde. `pivot_table` ile istediğin an geri dönebilirsin — bu yüzden veriyi uzun tutmak bir kayıp değildir.",
          "Analyse in long form, present in wide form. `pivot_table` takes you back any time — which is why storing long costs you nothing.",
        ],
        code: "sunum = uzun.pivot_table(index=\"sehir\", columns=\"ay\", values=\"ciro\", aggfunc=\"sum\", observed=True)",
        lang: "python",
      }),
    ],
    blocks: [
      tryPy(
        "import pandas as pd\n\ngenis = pd.DataFrame({\n    \"sehir\": [\"İstanbul\", \"Ankara\", \"İzmir\"],\n    \"Ocak\": [125000, 84000, 61000],\n    \"Şubat\": [138000, 79000, 72000],\n    \"Mart\": [141000, 91000, 68000],\n})\nprint(\"GENİŞ\\n\", genis, \"\\n\")\n\nuzun = genis.melt(id_vars=\"sehir\", var_name=\"ay\", value_name=\"ciro\")\nsira = [\"Ocak\", \"Şubat\", \"Mart\"]\nuzun[\"ay\"] = pd.Categorical(uzun[\"ay\"], categories=sira, ordered=True)\nprint(\"UZUN\\n\", uzun.sort_values([\"sehir\", \"ay\"]), \"\\n\")\n\nprint(\"aylık toplam:\")\nprint(uzun.groupby(\"ay\", observed=True)[\"ciro\"].sum())",
      ),
    ],
    faq: [
      {
        q: ["Power BI'da aynı işi nasıl yaparım?", "How do I do the same in Power BI?"],
        a: [
          "Power Query'de sabit kalacak sütunları seç, sağ tık → **Diğer sütunları kaldır (Unpivot other columns)**. Böylece yeni bir ay eklendiğinde rapor kendiliğinden çalışır.",
          "In Power Query, select the columns that stay, right-click → **Unpivot other columns**. Then a new month works without touching the report.",
        ],
      },
    ],
    related: ["power-bide-takvim-tablosu-nasil-olusturulur", "pandasta-birlesme-sonrasi-satir-artisi"],
    keywords: ["melt", "unpivot", "geniş", "uzun", "tidy", "reshape", "pivot"],
  }),
];
