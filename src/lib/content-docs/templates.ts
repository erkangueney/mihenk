import type { Project, Track } from "@/lib/types";

/**
 * Yeni içerik için başlangıç iskeletleri.
 *
 * Doğrulayıcıdan (validate.ts) sorunsuz geçecek en küçük geçerli belge —
 * boş bir metin kutusuna bakıp şemayı tahmin etmek zorunda kalınmasın.
 */

export const trackTemplate: Track = {
  slug: "yeni-patika",
  name: "Yeni Patika",
  category: "language",
  color: "hsl(210 90% 60%)",
  icon: "📘",
  tagline: { tr: "Tek cümlelik tanıtım.", en: "One-line pitch." },
  description: {
    tr: "Bu patikanın neyi, kime, hangi sırayla öğrettiğini anlatan kısa paragraf.",
    en: "A short paragraph on what this track teaches, to whom, and in what order.",
  },
  levels: [
    {
      id: "foundation",
      title: { tr: "Temel", en: "Foundation" },
      description: {
        tr: "Sıfırdan başlayan biri için ilk adımlar.",
        en: "First steps for a complete beginner.",
      },
      lessons: [
        {
          slug: "ilk-ders",
          title: { tr: "İlk ders", en: "First lesson" },
          summary: { tr: "Bu derste ne öğrenilecek?", en: "What will you learn here?" },
          minutes: 10,
          blocks: [
            {
              type: "text",
              body: {
                tr: "Anlatım metni. **kalın**, `kod` ve [bağlantı](https://ornek.com) desteklenir.",
                en: "Body text. **bold**, `code` and [links](https://example.com) are supported.",
              },
            },
            {
              type: "quiz",
              id: "ilk-soru",
              question: { tr: "Örnek soru?", en: "Sample question?" },
              options: [
                { tr: "Yanlış seçenek", en: "Wrong option" },
                { tr: "Doğru seçenek", en: "Correct option" },
              ],
              answer: 1,
              explanation: {
                tr: "Doğru cevabın neden doğru olduğu.",
                en: "Why the correct answer is correct.",
              },
              xp: 10,
            },
          ],
        },
      ],
    },
  ],
};

export const projectTemplate: Project = {
  slug: "yeni-proje",
  title: { tr: "Yeni Proje", en: "New Project" },
  trackSlug: "sql",
  level: "foundation",
  stack: ["SQL"],
  hours: 4,
  xp: 150,
  summary: {
    tr: "Projenin tek paragraflık özeti ve ortaya çıkacak çıktı.",
    en: "A one-paragraph summary and the output it produces.",
  },
  dataset: {
    tr: "Kullanılacak veri seti ve nereden indirileceği.",
    en: "The dataset used and where to download it.",
  },
  deliverables: [
    { tr: "Teslim edilecek ilk çıktı.", en: "First deliverable." },
    { tr: "Teslim edilecek ikinci çıktı.", en: "Second deliverable." },
  ],
  steps: [
    {
      title: { tr: "Veriyi yükle", en: "Load the data" },
      body: { tr: "Adımın ne yapılacağını anlatan metni.", en: "What to do in this step." },
      code: "-- örnek kod",
      lang: "sql",
    },
  ],
};

export function templateFor(kind: "track" | "project"): Track | Project {
  return kind === "track" ? trackTemplate : projectTemplate;
}
