import { L } from "@/content/helpers";
import type { CheatRow, CheatSection, Cheatsheet } from "@/lib/types";

/**
 * Kopya kâğıtları — tek sayfalık özetler.
 *
 * Amaç öğretmek değil **hatırlatmak**: kullanıcı konuyu biliyor, sözdizimini
 * unutmuş. Bu yüzden satırlar kısa, açıklamalar tek cümle.
 */

type Pair = [tr: string, en: string];

const row = (code: string, desc: Pair, note?: Pair): CheatRow => ({
  code,
  desc: L(...desc),
  note: note ? L(...note) : undefined,
});

const sheetSection = (
  title: Pair,
  rows: CheatRow[],
  columns?: [Pair, Pair] | [Pair, Pair, Pair],
): CheatSection => ({
  title: L(...title),
  rows,
  columns: columns
    ? (columns.map((pair) => L(...pair)) as CheatSection["columns"])
    : undefined,
});

/* ------------------------------------------------------------------ */
/* 1. SQL komutları                                                     */
/* ------------------------------------------------------------------ */

const sqlSheet: Cheatsheet = {
  slug: "sql-hizli-referans",
  title: L("SQL komutları — hızlı referans", "SQL commands — quick reference"),
  summary: L(
    "Sorgu iskeletinden pencere fonksiyonlarına, bir sayfada tüm SQL sözdizimi.",
    "From the query skeleton to window functions — all the SQL syntax on one page.",
  ),
  tool: "sql",
  icon: "🗄️",
  color: "hsl(199 89% 55%)",
  lang: "sql",
  updated: "2026-08-04",
  sections: [
    sheetSection(["Sorgu iskeleti (yazılış sırası)", "Query skeleton (as written)"], [
      row("SELECT sütunlar", ["Ne dönecek", "What comes back"]),
      row("FROM tablo", ["Nereden", "From where"]),
      row("JOIN diger ON koşul", ["Neyle birleşecek", "What it joins to"]),
      row("WHERE koşul", ["Satır filtresi — gruplamadan ÖNCE", "Row filter — BEFORE grouping"]),
      row("GROUP BY sütun", ["Gruplama", "Grouping"]),
      row("HAVING koşul", ["Grup filtresi — gruplamadan SONRA", "Group filter — AFTER grouping"]),
      row("ORDER BY sütun DESC", ["Sıralama", "Sorting"]),
      row("LIMIT n OFFSET m", ["Sayfalama", "Pagination"]),
    ]),
    sheetSection(["Filtre operatörleri", "Filter operators"], [
      row("=  <>  >  <  >=  <=", ["Karşılaştırma", "Comparison"]),
      row("AND  OR  NOT", ["Mantıksal birleştirme", "Logical combination"]),
      row("BETWEEN a AND b", ["Aralık, iki uç dahil", "Range, both ends included"]),
      row("IN (a, b, c)", ["Listede mi", "Is it in the list"]),
      row("LIKE 'a%'", ["Desen: % çok, _ tek karakter", "Pattern: % many, _ one character"]),
      row("IS NULL / IS NOT NULL", ["Boş kontrolü — = NULL çalışmaz", "Null check — = NULL never works"]),
    ]),
    sheetSection(["Birleştirme", "Joins"], [
      row("INNER JOIN", ["İki tarafta da olanlar", "Rows present on both sides"]),
      row("LEFT JOIN", ["Soldakilerin hepsi", "Every row on the left"]),
      row("LEFT JOIN + IS NULL", ["Eksik olanı bul", "Find what's missing"]),
      row("UNION / UNION ALL", ["Alt alta ekle (ALL tekrarı korur)", "Stack rows (ALL keeps duplicates)"]),
      row("CROSS JOIN", ["Her satırı her satırla", "Every row with every row"]),
    ]),
    sheetSection(["Toplama fonksiyonları", "Aggregates"], [
      row("COUNT(*)", ["Tüm satırlar", "All rows"]),
      row("COUNT(sütun)", ["NULL olmayanlar", "Non-NULL values"]),
      row("COUNT(DISTINCT sütun)", ["Benzersiz değerler", "Unique values"]),
      row("SUM / AVG / MIN / MAX", ["Toplam, ortalama, uçlar", "Total, average, extremes"]),
      row("ROUND(x, 2)", ["İki ondalığa yuvarla", "Round to two decimals"]),
    ]),
    sheetSection(["Pencere fonksiyonları", "Window functions"], [
      row("ROW_NUMBER() OVER (...)", ["1'den başlayan sıra", "Sequential number from 1"]),
      row("RANK() / DENSE_RANK()", ["Beraberlikli sıralama", "Ranking with ties"]),
      row("LAG(x, 1) / LEAD(x, 1)", ["Önceki / sonraki satır", "Previous / next row"]),
      row("SUM(x) OVER (ORDER BY t)", ["Kümülatif toplam", "Running total"]),
      row("PARTITION BY grup", ["Pencereyi gruba böl", "Split the window by group"]),
    ]),
    sheetSection(["Yapı ve ifade", "Structure and expressions"], [
      row("WITH ad AS (...)", ["CTE — sorguyu adımlara böl", "CTE — split the query into steps"]),
      row("CASE WHEN ... THEN ... END", ["Koşullu değer", "Conditional value"]),
      row("COALESCE(a, b, 0)", ["İlk NULL olmayan", "First non-NULL value"]),
      row("NULLIF(a, 0)", ["Sıfıra bölmeyi engelle", "Guard against divide-by-zero"]),
      row("CAST(x AS REAL)", ["Tam sayı bölmesini kır", "Break integer division"]),
    ]),
  ],
};

/* ------------------------------------------------------------------ */
/* 2. pandas                                                            */
/* ------------------------------------------------------------------ */

const pandasSheet: Cheatsheet = {
  slug: "pandas-hizli-referans",
  title: L("pandas — hızlı referans", "pandas — quick reference"),
  summary: L(
    "Okuma, keşif, filtreleme, gruplama, birleştirme ve temizlik komutları.",
    "Loading, exploring, filtering, grouping, joining and cleaning commands.",
  ),
  tool: "python",
  icon: "🐍",
  color: "hsl(45 93% 55%)",
  lang: "python",
  updated: "2026-08-04",
  sections: [
    sheetSection(["Okuma ve yazma", "Reading and writing"], [
      row("pd.read_csv(p, sep=';', decimal=',')", ["Türkçe CSV okuma", "Reading a European CSV"]),
      row("pd.read_excel(p, sheet_name='Sayfa1')", ["Excel sayfası", "An Excel sheet"]),
      row("df.to_csv(p, index=False, encoding='utf-8-sig')", ["Excel'in doğru açtığı CSV", "A CSV Excel opens correctly"]),
      row("pd.read_sql(sorgu, baglanti)", ["Veritabanından", "Straight from a database"]),
    ]),
    sheetSection(["İlk bakış", "First look"], [
      row("df.head(10) / df.tail()", ["İlk / son satırlar", "First / last rows"]),
      row("df.shape", ["(satır, sütun)", "(rows, columns)"]),
      row("df.info()", ["Tür ve eksik sayısı", "Types and non-null counts"]),
      row("df.describe()", ["Sayısal özet", "Numeric summary"]),
      row("df['a'].value_counts(dropna=False)", ["Frekans tablosu", "Frequency table"]),
      row("df.isna().sum()", ["Sütun başına eksik", "Missing values per column"]),
    ]),
    sheetSection(["Seçme ve filtreleme", "Selecting and filtering"], [
      row("df[['a', 'b']]", ["Sütun seçimi", "Column selection"]),
      row("df.loc[koşul, 'a']", ["Etiketle seç — atama için de bu", "Select by label — also use it to assign"]),
      row("df.iloc[0:5, 0:3]", ["Konumla seç", "Select by position"]),
      row("df[(df.a > 1) & (df.b == 'x')]", ["Parantez zorunlu, and/or çalışmaz", "Parentheses required; and/or won't work"]),
      row("df.query(\"a > @esik\")", ["Metin ifadeyle filtre", "Filter as a string expression"]),
      row("df['a'].isin([1, 2])", ["Listede olanlar", "Values in a list"]),
    ]),
    sheetSection(["Gruplama ve şekil", "Grouping and reshaping"], [
      row("df.groupby('a')['b'].sum()", ["Grup toplamı", "Sum per group"]),
      row("df.groupby('a').agg(x=('b', 'mean'))", ["Adlandırılmış özet", "Named aggregation"]),
      row("pd.pivot_table(df, index=, columns=, values=)", ["Çapraz tablo", "Cross-tab"]),
      row("df.melt(id_vars='a')", ["Geniş → uzun", "Wide → long"]),
      row("df.sort_values('a', ascending=False)", ["Sıralama", "Sorting"]),
    ]),
    sheetSection(["Birleştirme", "Combining"], [
      row("df.merge(o, on='k', how='left')", ["Anahtara göre birleştir", "Join on a key"]),
      row("validate='m:1'", ["Satır çoğalmasını hata yap", "Turn row fan-out into an error"]),
      row("indicator=True", ["Hangi taraftan geldi", "Which side each row came from"]),
      row("pd.concat([a, b], ignore_index=True)", ["Alt alta ekle", "Stack rows"]),
    ]),
    sheetSection(["Temizlik", "Cleaning"], [
      row("df['a'].fillna(df['a'].median())", ["Medyanla doldur", "Fill with the median"]),
      row("df.dropna(subset=['a'])", ["Eksik satırı at", "Drop rows with gaps"]),
      row("df.drop_duplicates(subset=['id'], keep='last')", ["Mükerreri temizle", "Remove duplicates"]),
      row("pd.to_numeric(x, errors='coerce')", ["Bozuk sayıyı NaN yap", "Turn bad numbers into NaN"]),
      row("pd.to_datetime(x, format='%d.%m.%Y')", ["Tarihe çevir", "Parse to a date"]),
      row("df['a'].str.strip().str.lower()", ["Metin temizliği", "Text cleanup"]),
    ]),
  ],
};

/* ------------------------------------------------------------------ */
/* 3. Excel formülleri                                                  */
/* ------------------------------------------------------------------ */

const excelSheet: Cheatsheet = {
  slug: "excel-formul-referansi",
  title: L("Excel formülleri — TR / EN", "Excel formulas — TR / EN"),
  summary: L(
    "Türkçe ve İngilizce fonksiyon adları yan yana. Argüman ayracı TR'de ';', EN'de ','.",
    "Turkish and English function names side by side. The argument separator is ';' in TR and ',' in EN.",
  ),
  tool: "excel",
  icon: "📊",
  color: "hsl(142 71% 45%)",
  lang: "excel",
  updated: "2026-08-04",
  sections: [
    sheetSection(
      ["Arama", "Lookup"],
      [
        row("DÜŞEYARA / VLOOKUP", ["İlk sütunda ara, sağdan getir", "Search the first column, return from the right"], ["Son argüman hep YANLIŞ", "Always pass FALSE last"]),
        row("ÇAPRAZARA / XLOOKUP", ["Her yöne arar, bulunamadı değeri alır", "Looks both ways, takes a not-found value"], ["Yeni işlerde bunu tercih et", "Prefer this in new work"]),
        row("İNDİS / INDEX", ["Konumdaki değeri getirir", "Returns the value at a position"]),
        row("KAÇINCI / MATCH", ["Değerin konumunu bulur", "Finds the position of a value"], ["0 = tam eşleşme", "0 = exact match"]),
      ],
      [
        ["Formül", "Formula"],
        ["Ne yapar", "What it does"],
        ["Not", "Note"],
      ],
    ),
    sheetSection(["Koşul", "Conditions"], [
      row("EĞER / IF", ["Koşula göre iki sonuç", "Two outcomes from one condition"]),
      row("EĞERHATA / IFERROR", ["Hatayı kendi metninle değiştir", "Replace an error with your own text"]),
      row("ETOPLA / SUMIF", ["Tek koşullu toplam", "Sum with one condition"]),
      row("ÇOKETOPLA / SUMIFS", ["Çok koşullu toplam", "Sum with many conditions"]),
      row("EĞERSAY / COUNTIF", ["Tek koşullu sayım", "Count with one condition"]),
      row("ÇOKEĞERSAY / COUNTIFS", ["Çok koşullu sayım", "Count with many conditions"]),
    ]),
    sheetSection(["Metin", "Text"], [
      row("KIRP / TRIM", ["Baş-son boşlukları siler", "Strips leading and trailing spaces"]),
      row("SOLDAN / SAĞDAN / PARÇAAL", ["LEFT / RIGHT / MID", "LEFT / RIGHT / MID"]),
      row("UZUNLUK / LEN", ["Karakter sayısı", "Character count"]),
      row("YERİNEKOY / SUBSTITUTE", ["Metin değiştirir", "Replaces text"]),
      row("METİNBİRLEŞTİR / TEXTJOIN", ["Ayraçla birleştirir", "Joins with a separator"]),
    ]),
    sheetSection(["Tarih", "Dates"], [
      row("BUGÜN / TODAY", ["Bugünün tarihi", "Today's date"]),
      row("TARİH / DATE", ["Yıl-ay-günden tarih üretir", "Builds a date from parts"]),
      row("SERİAY / EDATE", ["Ay kaydırır (-12 = geçen yıl)", "Shifts months (-12 = last year)"]),
      row("YIL / AY / GÜN", ["YEAR / MONTH / DAY", "YEAR / MONTH / DAY"]),
    ]),
    sheetSection(["Dinamik diziler", "Dynamic arrays"], [
      row("FİLTRE / FILTER", ["Koşula uyan satırları döker", "Spills the matching rows"]),
      row("BENZERSİZ / UNIQUE", ["Benzersiz listeyi döker", "Spills the unique list"]),
      row("SIRALA / SORT", ["Diziyi sıralar", "Sorts an array"]),
      row("SIRALAÖLÇÜT / SORTBY", ["Başka bir diziye göre sıralar", "Sorts by another array"]),
    ]),
    sheetSection(["Kısayollar", "Shortcuts"], [
      row("Ctrl + T", ["Aralığı tabloya çevir", "Convert a range to a table"]),
      row("F4", ["Referansı sabitle ($)", "Toggle absolute reference ($)"]),
      row("Ctrl + Shift + L", ["Filtre aç/kapat", "Toggle filters"]),
      row("Alt + F5", ["Pivotu yenile", "Refresh the pivot"]),
      row("Ctrl + Shift + ↓", ["Sütunun sonuna kadar seç", "Select to the end of the column"]),
    ]),
  ],
};

/* ------------------------------------------------------------------ */
/* 4. ML algoritma seçim haritası                                       */
/* ------------------------------------------------------------------ */

const mlSheet: Cheatsheet = {
  slug: "makine-ogrenmesi-secim-haritasi",
  title: L(
    "Makine öğrenmesi — algoritma seçim haritası",
    "Machine learning — algorithm selection map",
  ),
  summary: L(
    "Problem türünden algoritmaya, metrikten yaygın hataya: hangi durumda ne kullanılır.",
    "From problem type to algorithm, from metric to common mistake: what to use when.",
  ),
  tool: "machine-learning",
  icon: "🤖",
  color: "hsl(271 76% 60%)",
  lang: "python",
  updated: "2026-08-04",
  sections: [
    sheetSection(
      ["Önce soruyu sınıflandır", "Classify the question first"],
      [
        row("Etiketli veri + sayı tahmini", ["Regresyon", "Regression"], ["Fiyat, talep, süre", "Price, demand, duration"]),
        row("Etiketli veri + sınıf tahmini", ["Sınıflandırma", "Classification"], ["Terk, dolandırıcılık, onay", "Churn, fraud, approval"]),
        row("Etiketsiz veri + gruplama", ["Kümeleme", "Clustering"], ["Müşteri segmentasyonu", "Customer segmentation"]),
        row("Etiketsiz veri + sıra dışı", ["Anomali tespiti", "Anomaly detection"], ["Arıza, sahtekârlık", "Failures, fraud"]),
        row("Zaman ekseni var", ["Zaman serisi", "Time series"], ["Satış tahmini", "Sales forecasting"]),
      ],
      [
        ["Elindeki", "What you have"],
        ["Problem türü", "Problem type"],
        ["Örnek", "Example"],
      ],
    ),
    sheetSection(
      ["Nereden başlanır", "Where to start"],
      [
        row("Doğrusal / Lojistik regresyon", ["Her projenin ilk modeli", "The first model of every project"], ["Yorumlanabilir, hızlı, taban çizgisi", "Interpretable, fast, your baseline"]),
        row("Karar ağacı", ["Kuralları göstermek gerektiğinde", "When you must show the rules"], ["Tek başına kolay ezberler", "Overfits easily on its own"]),
        row("Random Forest", ["Tablo verisinde güvenli seçim", "The safe choice on tabular data"], ["Az ayar, iyi sonuç", "Little tuning, good results"]),
        row("Gradient Boosting (XGBoost, LightGBM)", ["Tablo verisinde en iyi doğruluk", "Best accuracy on tabular data"], ["Ayar gerektirir, yorumu zor", "Needs tuning, harder to explain"]),
        row("k-NN", ["Küçük ve dengeli veri", "Small, balanced datasets"], ["Ölçekleme şart", "Scaling is mandatory"]),
        row("K-Means", ["Küme sayısını biliyorsan", "When you know the number of clusters"], ["Ölçekle; küresel kümeler varsayar", "Scale first; assumes spherical clusters"]),
        row("DBSCAN", ["Küme sayısı bilinmiyorsa", "When the cluster count is unknown"], ["Gürültüyü kendisi ayırır", "Separates noise on its own"]),
        row("Derin öğrenme", ["Görüntü, ses, metin", "Images, audio, text"], ["Tablo verisinde genelde gereksiz", "Usually unnecessary on tabular data"]),
      ],
      [
        ["Algoritma", "Algorithm"],
        ["Ne zaman", "When"],
        ["Not", "Note"],
      ],
    ),
    sheetSection(
      ["Metrik seçimi", "Choosing a metric"],
      [
        row("Accuracy", ["Sınıflar dengeliyse", "Only when classes are balanced"], ["%99 dolandırıcılık yok → %99 doğruluk anlamsız", "99% not-fraud → 99% accuracy is meaningless"]),
        row("Precision", ["Yanlış alarmın maliyeti yüksekse", "When false alarms are costly"]),
        row("Recall", ["Kaçırmanın maliyeti yüksekse", "When misses are costly"], ["Hastalık taraması", "Disease screening"]),
        row("F1", ["İkisi de önemliyse", "When both matter"]),
        row("ROC-AUC", ["Sıralama kalitesi", "Ranking quality"], ["Çok dengesizde PR-AUC daha dürüst", "PR-AUC is more honest when very imbalanced"]),
        row("MAE / RMSE", ["Regresyon hatası", "Regression error"], ["RMSE büyük hataları cezalandırır", "RMSE punishes large errors"]),
      ],
      [
        ["Metrik", "Metric"],
        ["Ne zaman", "When"],
        ["Not", "Note"],
      ],
    ),
    sheetSection(["Sık yapılan hatalar", "Common mistakes"], [
      row("Veri sızıntısı", ["Hedeften türeyen bir sütunu modele vermek", "Feeding the model a column derived from the target"]),
      row("Test setine dokunmak", ["Ölçekleyiciyi tüm veriye fit etmek", "Fitting the scaler on the whole dataset"]),
      row("Zaman serisinde rastgele bölme", ["Geleceği görerek geçmişi tahmin etmek", "Predicting the past while seeing the future"]),
      row("Dengesiz veride accuracy", ["Hiçbir şey öğrenmeyen modelin yüksek skoru", "A model that learned nothing scoring high"]),
      row("Tek bölmeye güvenmek", ["Çapraz doğrulama yapmamak", "Skipping cross-validation"]),
    ]),
  ],
};

/* ------------------------------------------------------------------ */
/* 5. Git                                                               */
/* ------------------------------------------------------------------ */

const gitSheet: Cheatsheet = {
  slug: "git-hizli-referans",
  title: L("Git — hızlı referans", "Git — quick reference"),
  summary: L(
    "Günlük döngü, dal yönetimi ve bir şeyler ters gittiğinde kurtarma komutları.",
    "The daily loop, branch management and the commands that get you out of trouble.",
  ),
  tool: "git",
  icon: "🔀",
  color: "hsl(14 89% 55%)",
  lang: "shell",
  updated: "2026-08-04",
  sections: [
    sheetSection(["Günlük döngü", "Daily loop"], [
      row("git status", ["Ne değişti", "What changed"]),
      row("git add -p", ["Parça parça onayla", "Stage hunk by hunk"]),
      row("git commit -m \"mesaj\"", ["Kaydet", "Record it"]),
      row("git pull --rebase", ["Uzaktan al, geçmişi düz tut", "Pull and keep history linear"]),
      row("git push -u origin dal", ["İlk gönderim", "First push of a branch"]),
    ]),
    sheetSection(["Dallar", "Branches"], [
      row("git switch -c yeni-dal", ["Dal aç ve geç", "Create a branch and switch"]),
      row("git switch -", ["Bir önceki dala dön", "Back to the previous branch"]),
      row("git branch -a", ["Tüm dallar", "All branches"]),
      row("git merge dal", ["Birleştir", "Merge"]),
      row("git merge --abort", ["Çakışmadan vazgeç", "Back out of a conflict"]),
    ]),
    sheetSection(["Bakmak", "Looking around"], [
      row("git log --oneline --graph -20", ["Geçmişi tek ekranda", "History on one screen"]),
      row("git diff", ["Kaydedilmemiş değişiklik", "Uncommitted changes"]),
      row("git diff --staged", ["Add edilmiş değişiklik", "Staged changes"]),
      row("git show <hash>", ["Bir commit'in içeriği", "The contents of a commit"]),
      row("git blame dosya", ["Satırı kim yazdı", "Who wrote each line"]),
    ]),
    sheetSection(
      ["Kurtarma", "Recovery"],
      [
        row("git restore dosya", ["Kaydedilmemişi at", "Discard uncommitted work"], ["Geri dönüşü yok", "No way back"]),
        row("git restore --staged dosya", ["Add'i geri al", "Unstage"], ["Değişiklik durur", "Changes are kept"]),
        row("git stash push -m \"not\"", ["Yarım işi sakla", "Park work in progress"]),
        row("git stash pop", ["Sakladığını geri al", "Restore parked work"]),
        row("git reset --soft HEAD~1", ["Commit'i çöz, emeği koru", "Undo the commit, keep the work"], ["Push edilmemişse", "Only if not pushed"]),
        row("git revert <hash>", ["Etkisini yeni commit'le sil", "Undo with a new commit"], ["Paylaşılan geçmişte doğru yol", "The right way on shared history"]),
      ],
      [
        ["Komut", "Command"],
        ["Ne yapar", "What it does"],
        ["Dikkat", "Careful"],
      ],
    ),
    sheetSection(["Veri projelerinde", "In data projects"], [
      row(".gitignore: *.csv .env", ["Veri ve anahtarlar depoya girmesin", "Keep data and secrets out"]),
      row("git rm --cached dosya", ["Takipten çıkar, diskte kalsın", "Untrack but keep on disk"]),
      row("nbstripout", ["Notebook çıktılarını temizle", "Strip notebook outputs"]),
    ]),
  ],
};

export const cheatsheets: Cheatsheet[] = [
  sqlSheet,
  pandasSheet,
  excelSheet,
  mlSheet,
  gitSheet,
];

export function getCheatsheet(slug: string): Cheatsheet | undefined {
  return cheatsheets.find((sheet) => sheet.slug === slug);
}

export function cheatsheetRowCount(sheet: Cheatsheet): number {
  return sheet.sections.reduce((sum, section) => sum + section.rows.length, 0);
}
