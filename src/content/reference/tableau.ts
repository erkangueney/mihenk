import { entry, group, section } from "./helpers";

/** Tableau: hesaplanmış alanlar, LOD ifadeleri ve tablo hesaplamaları. */
export const tableauReference = group({
  slug: "tableau",
  name: "Tableau",
  icon: "🎨",
  color: "hsl(217 91% 60%)",
  lang: "sql",
  trackSlug: "tableau",
  tagline: ["Hesaplanmış alanlar ve LOD", "Calculated fields and LOD expressions"],
  description: [
    "Tableau'da yazdığın hesaplamaların sözdizimi: mantık fonksiyonları, tablo hesaplamaları ve ayrıntı düzeyi (LOD) ifadeleri.",
    "The syntax of the calculations you write in Tableau: logic functions, table calculations and level-of-detail (LOD) expressions.",
  ],
  sections: [
    section("hesap", ["Hesaplanmış alanlar", "Calculated fields"], [
      entry({
        slug: "if-then",
        name: "IF / ELSEIF / END",
        summary: ["Koşullu değer üretir.", "Produces a conditional value."],
        syntax: "IF <koşul> THEN <değer>\nELSEIF <koşul> THEN <değer>\nELSE <değer>\nEND",
        description: [
          "Tableau'da her `IF` bloğu `END` ile kapatılır. Tek bir alanı sabit değerlerle eşleştiriyorsan `CASE` daha okunur ve daha hızlıdır.",
          "Every `IF` block closes with `END`. When mapping one field to fixed values, `CASE` reads better and runs faster.",
        ],
        example: {
          code: "IF [Kar] < 0 THEN \"Zarar\"\nELSEIF [Kar] < 1000 THEN \"Düşük\"\nELSE \"Yüksek\"\nEND",
        },
        related: ["tableau/case", "tableau/zn"],
        keywords: ["if", "then", "else", "end", "koşul", "hesaplanmış alan"],
      }),
      entry({
        slug: "case",
        name: "CASE / WHEN",
        summary: ["Bir alanı değerlere göre eşleştirir.", "Maps one field to a set of values."],
        syntax: "CASE [Alan]\n  WHEN \"a\" THEN 1\n  WHEN \"b\" THEN 2\n  ELSE 0\nEND",
        description: [
          "Yalnızca eşitlik karşılaştırması yapar; aralık ya da bileşik koşul gerekiyorsa `IF` kullan. Parametrelerle birlikte kullanıldığında 'ölçü seçici' kurmanın standart yoludur.",
          "It only compares for equality; for ranges or compound conditions use `IF`. Combined with parameters it's the standard way to build a measure switcher.",
        ],
        example: {
          code: "CASE [Seçilen Ölçü]\n  WHEN \"Ciro\" THEN SUM([Satış])\n  WHEN \"Kâr\" THEN SUM([Kar])\nEND",
        },
        related: ["tableau/if-then", "tableau/parameter"],
        keywords: ["case", "when", "eşleştirme", "parametre", "ölçü seçici"],
      }),
      entry({
        slug: "zn",
        name: "ZN() / IFNULL() / ISNULL()",
        summary: ["Boş değerleri güvene alır.", "Makes NULL values safe."],
        syntax: "ZN([Alan]) · IFNULL([Alan]; 0) · ISNULL([Alan])",
        description: [
          "`ZN` boş sayısal değeri sıfıra çevirir — çizgi grafiğindeki kopuklukları ve toplamlardaki boşlukları giderir. Metin alanlarında `IFNULL` kullanılır.",
          "`ZN` turns a NULL number into zero — it fixes gaps in line charts and holes in totals. For text fields use `IFNULL`.",
        ],
        example: { code: "ZN(SUM([Satış])) - ZN(LOOKUP(SUM([Satış]); -1))" },
        related: ["tableau/if-then"],
        keywords: ["zn", "ifnull", "isnull", "boş", "null", "eksik"],
      }),
      entry({
        slug: "datediff",
        name: "DATEDIFF() / DATETRUNC() / DATEPART()",
        summary: ["Tarihleri karşılaştırır ve kırpar.", "Compares and truncates dates."],
        syntax:
          "DATEDIFF('day'; [Baş]; [Son])\nDATETRUNC('month'; [Tarih])\nDATEPART('year'; [Tarih])",
        description: [
          "`DATETRUNC` tarihi dönemin başına çeker — aylık kırılım için doğru araç budur, çünkü sonuç hâlâ bir tarihtir ve doğru sıralanır. `DATEPART` sayı döner ve yıllar arası karşılaştırmada işe yarar.",
          "`DATETRUNC` snaps a date to the start of its period — the right tool for monthly buckets, because the result is still a date and sorts correctly. `DATEPART` returns a number, useful for comparing across years.",
        ],
        example: { code: "DATEDIFF('day'; [Sipariş Tarihi]; [Teslim Tarihi])" },
        related: ["tableau/lod-fixed"],
        keywords: ["datediff", "datetrunc", "datepart", "tarih", "gün farkı"],
      }),
      entry({
        slug: "parameter",
        name: "Parametreler",
        summary: [
          "Kullanıcının değiştirebildiği tek değerli girdi.",
          "A single-value input the user can change.",
        ],
        syntax: "[Parametre Adı] — hesaplamada normal bir alan gibi kullanılır",
        description: [
          "Filtreden farkı: parametre veriyi kendi başına süzmez, yalnızca bir değer taşır. Etkili olması için bir hesaplanmış alanda kullanılıp o alanın filtreye/renklere sürüklenmesi gerekir. Eşik, senaryo ve ölçü seçici kurmanın temeli.",
          "Unlike a filter, a parameter doesn't filter anything by itself — it just holds a value. To have an effect it must be used in a calculated field that you then place on filters or colours. The basis of thresholds, scenarios and measure switchers.",
        ],
        example: { code: "SUM([Satış]) > [Hedef Eşiği]" },
        related: ["tableau/case"],
        keywords: ["parametre", "parameter", "eşik", "senaryo", "what-if"],
      }),
    ]),

    section("tablo-hesap", ["Tablo hesaplamaları", "Table calculations"], [
      entry({
        slug: "window-sum",
        name: "WINDOW_SUM() / WINDOW_AVG()",
        summary: [
          "Görünen satırlar üzerinde pencere hesabı yapar.",
          "Aggregates over the rows visible in the view.",
        ],
        syntax: "WINDOW_SUM(SUM([Satış]); -2; 0)",
        description: [
          "Tablo hesaplamaları veri kaynağında değil, **görselde görünen sonuç üzerinde** çalışır. Bu yüzden 'Hesapla' (Compute Using) ayarı sonucu tamamen değiştirir — hareketli ortalamada ilk kontrol edeceğin yer burasıdır.",
          "Table calculations run on the **result visible in the view**, not on the data source. That's why the Compute Using setting changes everything — it's the first thing to check on a moving average.",
        ],
        example: { code: "// 3 dönemlik hareketli ortalama\nWINDOW_AVG(SUM([Satış]); -2; 0)" },
        related: ["tableau/lookup", "tableau/index"],
        keywords: ["window_sum", "window_avg", "hareketli ortalama", "tablo hesaplaması"],
      }),
      entry({
        slug: "lookup",
        name: "LOOKUP()",
        summary: [
          "Önceki veya sonraki satırın değerini getirir.",
          "Fetches the value from a previous or following row.",
        ],
        syntax: "LOOKUP(SUM([Satış]); -1)",
        description: [
          "SQL'deki `LAG`'in karşılığı. Büyüme hesabının temeli: `(bu dönem - önceki dönem) / önceki dönem`. Boş dönem varsa `ZN` ile sarmayı unutma.",
          "The equivalent of SQL's `LAG`. The basis of growth: `(this period - previous) / previous`. Wrap it in `ZN` when periods can be empty.",
        ],
        example: {
          code: "(SUM([Satış]) - LOOKUP(SUM([Satış]); -1)) / LOOKUP(SUM([Satış]); -1)",
        },
        related: ["tableau/window-sum", "sql/lag"],
        keywords: ["lookup", "önceki", "büyüme", "lag", "değişim"],
      }),
      entry({
        slug: "index",
        name: "INDEX() / RANK()",
        summary: ["Sıra numarası ve sıralama üretir.", "Produces row numbers and rankings."],
        syntax: "INDEX() · RANK(SUM([Satış]); 'desc')",
        description: [
          "`INDEX() <= 10` filtresi 'ilk 10' görselinin en esnek yoludur — üst filtreden farklı olarak diğer filtreler uygulandıktan sonra çalışır ve dinamik kalır.",
          "An `INDEX() <= 10` filter is the most flexible top-10: unlike a Top filter it runs after other filters and stays dynamic.",
        ],
        example: { code: "INDEX() <= 10" },
        related: ["tableau/window-sum"],
        keywords: ["index", "rank", "ilk 10", "top n", "sıralama"],
      }),
    ]),

    section("lod", ["Ayrıntı düzeyi (LOD)", "Level of detail (LOD)"], [
      entry({
        slug: "lod-fixed",
        name: "{ FIXED }",
        summary: [
          "Görselden bağımsız, sabit bir ayrıntı düzeyinde hesaplar.",
          "Computes at a fixed level of detail, independent of the view.",
        ],
        syntax: "{ FIXED [Boyut] : AGG([Ölçü]) }",
        description: [
          "Görselde ne olursa olsun belirttiğin boyutta hesaplar. Klasik kullanımı 'müşteri başına toplam harcama' — sonra bunu segmentlemede kullanırsın. **Filtre sırası önemlidir**: `FIXED` normal filtrelerden önce çalışır; filtrenin etkilemesini istiyorsan bağlam filtresine çevir.",
          "Computes at the dimension you name, whatever the view shows. The classic use is total spend per customer, which you then bucket. **Filter order matters**: `FIXED` runs before normal filters; convert a filter to a context filter if you want it to apply.",
        ],
        example: {
          code: "{ FIXED [Müşteri ID] : SUM([Satış]) }",
        },
        related: ["tableau/lod-include", "tableau/lod-exclude"],
        keywords: ["fixed", "lod", "ayrıntı düzeyi", "müşteri başına", "kohort"],
      }),
      entry({
        slug: "lod-include",
        name: "{ INCLUDE }",
        summary: [
          "Görseldeki boyutlara ek boyut katarak hesaplar.",
          "Adds a dimension to those already in the view.",
        ],
        syntax: "{ INCLUDE [Boyut] : AGG([Ölçü]) }",
        description: [
          "'Sipariş başına ortalamanın bölge ortalaması' gibi iki kademeli hesaplarda kullanılır: önce alt kırılımda topla, sonra üst kırılımda ortala.",
          "Used for two-stage calculations such as the regional average of per-order totals: aggregate at the finer level first, then average at the coarser one.",
        ],
        example: { code: "AVG({ INCLUDE [Sipariş ID] : SUM([Satış]) })" },
        related: ["tableau/lod-fixed"],
        keywords: ["include", "lod", "iki kademeli", "ortalama"],
      }),
      entry({
        slug: "lod-exclude",
        name: "{ EXCLUDE }",
        summary: [
          "Görseldeki bir boyutu hesabın dışında bırakır.",
          "Removes a dimension from the calculation.",
        ],
        syntax: "{ EXCLUDE [Boyut] : AGG([Ölçü]) }",
        description: [
          "'Bu ürünün cirosunun kategori toplamı içindeki payı' gibi yüzde-toplam hesaplarında paydayı üretir: ürünü hesap dışında bırakırsın, kategori kalır.",
          "Produces the denominator in percent-of-total calculations: exclude the product and the category total remains.",
        ],
        example: {
          code: "SUM([Satış]) / { EXCLUDE [Ürün] : SUM([Satış]) }",
        },
        related: ["tableau/lod-fixed", "power-bi/all"],
        keywords: ["exclude", "lod", "pay", "yüzde", "toplam"],
      }),
    ]),
  ],
});
