import { PlaygroundBlock } from "@/components/lesson/playground-block";
import { CodeCard } from "@/components/ui/code-view";
import { Markdown } from "@/components/ui/markdown";
import { t } from "@/lib/i18n";
import type { Block, Locale } from "@/lib/types";

/**
 * Görev içermeyen blokların ortak çizimi.
 *
 * Ders sayfası kendi `BlockRenderer`'ını kullanır (quiz/order/exercise için
 * ilerleme bağlamına ihtiyacı var); referans ve nasıl-yapılır sayfaları
 * yalnızca anlatım bloklarını gösterdiği için burayı paylaşır.
 */

const calloutStyles: Record<string, { border: string; bg: string; icon: string }> = {
  tip: { border: "border-[var(--success)]/40", bg: "bg-[var(--success)]/10", icon: "💡" },
  warning: { border: "border-[var(--warning)]/40", bg: "bg-[var(--warning)]/10", icon: "⚠️" },
  info: { border: "border-accent/40", bg: "bg-accent/10", icon: "ℹ️" },
  pitfall: { border: "border-[var(--danger)]/40", bg: "bg-[var(--danger)]/10", icon: "🚨" },
};

export function ProseBlocks({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => (
        <ProseBlock key={index} block={block} locale={locale} />
      ))}
    </div>
  );
}

function ProseBlock({ block, locale }: { block: Block; locale: Locale }) {
  switch (block.type) {
    case "heading":
      return <h2 className="pt-2 text-xl font-bold tracking-tight">{t(block.text, locale)}</h2>;

    case "text":
      return <Markdown text={t(block.body, locale)} />;

    case "code":
      return (
        <CodeCard
          code={block.code}
          lang={block.lang}
          caption={block.caption ? t(block.caption, locale) : undefined}
        />
      );

    case "callout": {
      const style = calloutStyles[block.variant] ?? calloutStyles.info;
      return (
        <aside className={`rounded-xl border p-4 ${style.border} ${style.bg}`}>
          <p className="flex items-center gap-2 font-semibold text-text">
            <span aria-hidden>{style.icon}</span>
            {t(block.title, locale)}
          </p>
          <Markdown text={t(block.body, locale)} className="mt-2 text-sm" />
        </aside>
      );
    }

    case "playground":
      return <PlaygroundBlock block={block} locale={locale} />;

    // Görev blokları (quiz/order/exercise) burada gösterilmez; onlar ders
    // akışına ve ilerleme bağlamına ait.
    default:
      return null;
  }
}
