import type { LevelId, Localized } from "@/lib/types";
import { L } from "./helpers";

export interface RoadmapStop {
  trackSlug: string;
  level: LevelId;
  /** Bu durakta neden burada olduğunu açıklayan kısa gerekçe. */
  why: Localized;
}

export interface RoadmapPhase {
  id: string;
  title: Localized;
  outcome: Localized;
  weeks: string;
  stops: RoadmapStop[];
}

/**
 * Sıfırdan veri bilimciliğine önerilen sıra.
 * Kural: her aşama bir **iş çıktısıyla** biter, sadece konu listesiyle değil.
 */
export const roadmap: RoadmapPhase[] = [
  {
    id: "temel",
    title: L("1. Temel: veriyi okumak", "1. Foundation: reading data"),
    outcome: L(
      "Bir veri setini açıp ne olduğunu anlatabilir, temel özet raporunu çıkarabilirsin.",
      "You can open a dataset, explain what it contains and produce a basic summary report.",
    ),
    weeks: "4–6",
    stops: [
      {
        trackSlug: "excel",
        level: "junior",
        why: L(
          "Veriyi analiz edilebilir biçimde tutmayı burada öğrenirsin; bu alışkanlık her araca taşınır.",
          "This is where you learn to keep data in an analysable shape — a habit that carries into every tool.",
        ),
      },
      {
        trackSlug: "sql",
        level: "junior",
        why: L(
          "Veriyi kaynağından çekmeden analiz başlamaz. SQL, analist ilanlarının neredeyse tamamında geçer.",
          "Analysis does not start until you can pull the data. SQL appears in almost every analyst job ad.",
        ),
      },
      {
        trackSlug: "istatistik",
        level: "junior",
        why: L(
          "Ortalama ile medyan arasındaki farkı bilmeden çıkarılan her rapor yanıltıcıdır.",
          "Any report written without knowing mean from median is misleading.",
        ),
      },
    ],
  },
  {
    id: "analist",
    title: L("2. Veri analisti olmak", "2. Becoming a data analyst"),
    outcome: L(
      "Birden çok tabloyu birleştirip iş sorusuna cevap veren bir pano yayınlayabilirsin.",
      "You can join several tables and publish a dashboard that answers a business question.",
    ),
    weeks: "8–10",
    stops: [
      {
        trackSlug: "sql",
        level: "mid",
        why: L(
          "Gerçek veri hiç tek tabloda durmaz; JOIN ve CTE günlük işin merkezindedir.",
          "Real data never sits in one table; JOINs and CTEs are the centre of daily work.",
        ),
      },
      {
        trackSlug: "python",
        level: "junior",
        why: L(
          "SQL'in yapamadığı yerde Python devreye girer: tekrarlanabilir temizlik ve otomasyon.",
          "Python starts where SQL stops: reproducible cleaning and automation.",
        ),
      },
      {
        trackSlug: "veri-gorsellestirme",
        level: "junior",
        why: L(
          "Doğru grafiği seçmek, aracı öğrenmekten önce gelir — yoksa her aracı yanlış kullanırsın.",
          "Choosing the right chart comes before learning a tool; otherwise you misuse every tool.",
        ),
      },
      {
        trackSlug: "power-bi",
        level: "junior",
        why: L(
          "Kurumsal raporlamada en yaygın araç. Tableau'yu tercih ediyorsan onun başlangıç seviyesini al.",
          "The most common tool in enterprise reporting. If you prefer Tableau, take its beginner level instead.",
        ),
      },
      {
        trackSlug: "git-github",
        level: "junior",
        why: L(
          "Çalışmanı sürümlemeden portföy olmaz. Bu adım seni 'gösterilebilir' hale getirir.",
          "No versioning, no portfolio. This step makes your work showable.",
        ),
      },
    ],
  },
  {
    id: "kidemli",
    title: L("3. Kıdemli analist", "3. Senior analyst"),
    outcome: L(
      "Kohort, huni ve segmentasyon analizlerini kendi başına kurup yorumlayabilirsin.",
      "You can build and interpret cohort, funnel and segmentation analyses on your own.",
    ),
    weeks: "10–12",
    stops: [
      {
        trackSlug: "python",
        level: "mid",
        why: L(
          "pandas ile veri işleme, analistin en çok kullandığı beceridir.",
          "Wrangling with pandas is the analyst's most-used skill.",
        ),
      },
      {
        trackSlug: "sql",
        level: "senior",
        why: L(
          "Pencere fonksiyonları, analist ile kıdemli analist arasındaki en görünür farktır.",
          "Window functions are the most visible gap between analyst and senior analyst.",
        ),
      },
      {
        trackSlug: "istatistik",
        level: "senior",
        why: L(
          "A/B testi okumayı bilmeyen analist, ürün ekibiyle aynı dili konuşamaz.",
          "An analyst who cannot read an A/B test cannot speak the product team's language.",
        ),
      },
      {
        trackSlug: "power-bi",
        level: "mid",
        why: L(
          "Yıldız şema ve DAX, raporun doğru sayıyı göstermesinin ön koşuludur.",
          "A star schema and DAX are the precondition for a report showing the right number.",
        ),
      },
    ],
  },
  {
    id: "veri-bilimci",
    title: L("4. Veri bilimine geçiş", "4. Moving into data science"),
    outcome: L(
      "Bir tahmin modelini kurup değerlendirebilir ve iş değerini savunabilirsin.",
      "You can build and evaluate a predictive model and defend its business value.",
    ),
    weeks: "12–16",
    stops: [
      {
        trackSlug: "machine-learning",
        level: "junior",
        why: L(
          "Önce hangi problemin ML problemi olduğunu ayırt etmeyi öğren.",
          "First learn to tell which problems are actually ML problems.",
        ),
      },
      {
        trackSlug: "machine-learning",
        level: "mid",
        why: L(
          "Doğru metriği seçmek, doğru algoritmayı seçmekten önemlidir.",
          "Choosing the right metric matters more than choosing the right algorithm.",
        ),
      },
      {
        trackSlug: "python",
        level: "senior",
        why: L(
          "Not defterinden çıkıp test edilebilir, tekrarlanabilir kod yazmaya geçiş.",
          "Moving out of the notebook into testable, reproducible code.",
        ),
      },
      {
        trackSlug: "machine-learning",
        level: "senior",
        why: L(
          "Üretime alınmayan model, yapılmamış model sayılır.",
          "A model that never ships is a model that was never built.",
        ),
      },
    ],
  },
  {
    id: "platform",
    title: L("5. Platform ve ölçek (opsiyonel)", "5. Platform and scale (optional)"),
    outcome: L(
      "Veri akışını uçtan uca kurabilir, ekibin veri altyapısına katkı verebilirsin.",
      "You can build a pipeline end to end and contribute to your team's data platform.",
    ),
    weeks: "10–14",
    stops: [
      {
        trackSlug: "veri-muhendisligi",
        level: "mid",
        why: L(
          "Veriyi kendi çekebilen analist, kimseyi beklemez.",
          "An analyst who can pull their own data waits for no one.",
        ),
      },
      {
        trackSlug: "microsoft-fabric",
        level: "mid",
        why: L(
          "Microsoft ekosistemindeysen medallion mimarisi doğrudan işine yarar.",
          "If you are in the Microsoft ecosystem, the medallion architecture pays off immediately.",
        ),
      },
      {
        trackSlug: "veri-muhendisligi",
        level: "senior",
        why: L(
          "Veri kalitesi testleri, güvenilir raporun tek gerçek garantisidir.",
          "Data quality tests are the only real guarantee behind a trustworthy report.",
        ),
      },
    ],
  },
];
