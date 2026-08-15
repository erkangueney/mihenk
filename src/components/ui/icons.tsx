/**
 * Site genelinde kullanılan çizgi (stroke) ikonlar.
 *
 * Emoji yerine tutarlı, tema rengini miras alan SVG'ler: gerçek ürün
 * hissinin en ucuz ama en etkili adımı. Hepsi 24x24 viewBox, 1.8 kalem
 * kalınlığı, `currentColor` — boyut ve renk kullanan tarafta belirlenir.
 */

interface IconProps {
  size?: number;
  className?: string;
}

function base(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
}

/** Kitap — başvuru sözlüğü. */
export function IconBook({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a1 1 0 0 0-1-1H6.5A2.5 2.5 0 0 0 4 5.5v14Z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </svg>
  );
}

/** Pusula — nasıl yapılır rehberleri. */
export function IconCompass({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

/** Pano — kopya kâğıtları. */
export function IconClipboard({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
      <path d="M9.5 10h5M9.5 14h5" />
    </svg>
  );
}

/** Oynat — kod alanı. */
export function IconPlay({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M7 4.5v15l12-7.5L7 4.5Z" />
    </svg>
  );
}

/** Hedef — görevle öğrenme. */
export function IconTarget({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Şimşek — tarayıcıda çalıştırma. */
export function IconBolt({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H13L13 2Z" />
    </svg>
  );
}

/** Kupa — XP ve rozetler. */
export function IconTrophy({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4h10v6a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4.5a0.5 0.5 0 0 0-.5.5C4 9 5.5 10.5 7 10.5M17 6h2.5a.5.5 0 0 1 .5.5C20 9 18.5 10.5 17 10.5" />
    </svg>
  );
}

/** Çanta — portföy projeleri. */
export function IconBriefcase({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3" y="7.5" width="18" height="13" rx="2" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 13h18" />
    </svg>
  );
}

/** Güneş — açık tema. */
export function IconSun({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

/** Ay — koyu tema. */
export function IconMoon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

/** Menü — mobil gezinme. */
export function IconMenu({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/** Kapat — mobil gezinme. */
export function IconClose({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
