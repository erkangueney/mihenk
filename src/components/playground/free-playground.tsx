"use client";

import { useState } from "react";
import { Playground } from "@/components/lesson/playground-block";
import { ui } from "@/lib/i18n";
import type { CodeEngine, Locale } from "@/lib/types";

/**
 * Serbest deneme alanı.
 *
 * Ders bağlamı yok: kullanıcı motoru ve veri setini kendisi seçer, hazır
 * örneklerden birini yükleyip üzerinde oynayabilir.
 *
 * `key` ile Playground'u yeniden kurmak bilinçli: motor ya da örnek
 * değiştiğinde editörün içeriği de yenilenmeli, aksi halde SQL motoruna
 * Python kodu kalırdı.
 */

interface Sample {
  id: string;
  engine: CodeEngine;
  dataset?: string;
  label: { tr: string; en: string };
  code: string;
}

const samples: Sample[] = [
  {
    id: "sql-ciro",
    engine: "sql",
    dataset: "shop",
    label: { tr: "Kategoriye göre ciro", en: "Revenue by category" },
    code: `SELECT c.name AS kategori,
       COUNT(DISTINCT o.id) AS siparis,
       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS ciro
FROM order_items oi
JOIN orders o     ON o.id = oi.order_id
JOIN products p   ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id
GROUP BY c.name
ORDER BY ciro DESC;`,
  },
  {
    id: "sql-aylik",
    engine: "sql",
    dataset: "shop",
    label: { tr: "Aylık büyüme", en: "Monthly growth" },
    code: `WITH aylik AS (
  SELECT STRFTIME('%Y-%m', o.order_date) AS ay,
         SUM(oi.quantity * oi.unit_price) AS ciro
  FROM orders o JOIN order_items oi ON oi.order_id = o.id
  GROUP BY ay
)
SELECT ay,
       ROUND(ciro, 2) AS ciro,
       ROUND(100.0 * (ciro - LAG(ciro) OVER (ORDER BY ay))
             / NULLIF(LAG(ciro) OVER (ORDER BY ay), 0), 1) AS buyume_yuzde
FROM aylik ORDER BY ay;`,
  },
  {
    id: "sql-ik",
    engine: "sql",
    dataset: "hr",
    label: { tr: "Departman maaşları", en: "Salaries by department" },
    code: `SELECT d.name AS departman,
       COUNT(*) AS calisan,
       ROUND(AVG(e.salary)) AS ort_maas,
       MAX(e.salary) AS en_yuksek
FROM employees e
JOIN departments d ON d.id = e.department_id
GROUP BY d.name
ORDER BY ort_maas DESC;`,
  },
  {
    id: "py-pandas",
    engine: "python",
    label: { tr: "pandas ile özet tablo", en: "A summary table with pandas" },
    code: `import pandas as pd

df = pd.DataFrame({
    "sehir": ["İstanbul", "İstanbul", "Ankara", "Ankara", "İzmir"],
    "kanal": ["online", "mağaza", "online", "mağaza", "online"],
    "ciro": [125000, 84000, 61000, 40000, 72000],
})

ozet = (df.groupby(["sehir", "kanal"], as_index=False)["ciro"].sum()
          .sort_values("ciro", ascending=False))
print(ozet, "\\n")
print(pd.pivot_table(df, index="sehir", columns="kanal",
                     values="ciro", aggfunc="sum", fill_value=0))`,
  },
  {
    id: "py-temel",
    engine: "python",
    label: { tr: "Python temelleri", en: "Python basics" },
    code: `fiyatlar = [1899, 2450, 4290, 549, 349, 7990]

print("adet   :", len(fiyatlar))
print("toplam :", f"{sum(fiyatlar):,}")
print("ortalama:", f"{sum(fiyatlar) / len(fiyatlar):,.2f}")
print("pahalı :", [f for f in fiyatlar if f > 2000])

for i, fiyat in enumerate(sorted(fiyatlar, reverse=True)[:3], start=1):
    print(f"{i}. {fiyat:>8,} TL")`,
  },
];

export function FreePlayground({ locale }: { locale: Locale }) {
  const [sample, setSample] = useState<Sample>(samples[0]);
  const [engine, setEngine] = useState<CodeEngine>(samples[0].engine);
  const [dataset, setDataset] = useState<string>(samples[0].dataset ?? "shop");

  const pick = (next: Sample) => {
    setSample(next);
    setEngine(next.engine);
    if (next.dataset) setDataset(next.dataset);
  };

  /** Motor elle değiştirilirse o motorun ilk örneğine geç. */
  const switchEngine = (next: CodeEngine) => {
    if (next === engine) return;
    const first = samples.find((item) => item.engine === next);
    if (first) pick(first);
  };

  const visible = samples.filter((item) => item.engine === engine);

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">
          {ui("playground.samples", locale)}
        </p>
        <div className="flex flex-wrap gap-2">
          {visible.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => pick(item)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                sample.id === item.id
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border bg-surface-2 text-muted hover:text-text"
              }`}
            >
              {item.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <Playground
        key={`${sample.id}-${dataset}`}
        engine={engine}
        initialCode={sample.code}
        dataset={engine === "sql" ? dataset : undefined}
        locale={locale}
        minRows={14}
        onEngineChange={switchEngine}
        onDatasetChange={setDataset}
      />

      <p className="text-xs text-muted">{ui("playground.tip", locale)}</p>
    </div>
  );
}
