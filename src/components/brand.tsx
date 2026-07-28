import { BRAND_COLORS, BRAND_WORDMARK } from "@/lib/brand";

/**
 * Mihenk amblemi.
 *
 * Obsidyen bir taş ve üzerinde yükselen üç altın ayar izi. Gerçek bir mihenk
 * taşında altın sürtülerek bıraktığı iz, madenin ayarını gösterir; burada
 * izlerin boyu Temel'den Uzman'a çıkan kademeleri anlatıyor.
 *
 * Gradyan kimlikleri sabittir: aynı sayfada birden çok amblem olsa da tanımlar
 * birebir aynı olduğu için ilkinin kazanması görsel bir fark yaratmaz.
 */
export function BrandMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="mihenk-stone" x1="20" y1="1" x2="20" y2="39" gradientUnits="userSpaceOnUse">
          <stop stopColor={BRAND_COLORS.stoneTop} />
          <stop offset="1" stopColor={BRAND_COLORS.stoneBottom} />
        </linearGradient>
        {/* İzler yukarı doğru parlar — sürtülen madenin ışığı. */}
        <linearGradient id="mihenk-gold" x1="14" y1="30" x2="28" y2="9" gradientUnits="userSpaceOnUse">
          <stop stopColor={BRAND_COLORS.goldDeep} />
          <stop offset="0.5" stopColor={BRAND_COLORS.gold} />
          <stop offset="1" stopColor={BRAND_COLORS.goldLight} />
        </linearGradient>
        <linearGradient id="mihenk-sheen" x1="20" y1="1" x2="20" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="1" y="1" width="38" height="38" rx="12" fill="url(#mihenk-stone)" />
      <rect x="1" y="1" width="38" height="38" rx="12" fill="url(#mihenk-sheen)" />

      {/* Ayar izleri — eşit eğimde, boyları kademe kademe artan. */}
      <g stroke="url(#mihenk-gold)" strokeWidth="3.4" strokeLinecap="round">
        <path d="M12.6 28 L14.2 21.6" />
        <path d="M19.4 28 L21 16.5" />
        <path d="M26.2 28 L27.8 11.4" />
      </g>

      {/* Madeni bir mühür hissi veren saç teli kalınlığındaki kenar. */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="12"
        stroke={BRAND_COLORS.gold}
        strokeOpacity="0.5"
        strokeWidth="1.3"
      />
    </svg>
  );
}

/** Amblem + kelime markası. Başlık ve alt bilgide birlikte kullanılır. */
export function BrandLockup({
  size = 32,
  hideWordmark = false,
}: {
  size?: number;
  hideWordmark?: boolean;
}) {
  return (
    <>
      <BrandMark size={size} />
      <span
        className={`font-display text-lg font-semibold tracking-[0.22em] ${
          hideWordmark ? "hidden sm:inline" : ""
        }`}
      >
        {BRAND_WORDMARK}
      </span>
    </>
  );
}
