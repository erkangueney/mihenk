import { getAvatarPart } from "@/lib/avatar";
import type { AvatarLook } from "@/lib/avatar";
import type { AvatarState } from "@/lib/types";

/**
 * Avatar çizimi — tek bir SVG, harici görsel yok.
 *
 * Katmanlar arkadan öne: efekt → gövde/kıyafet → kafa → saç → aksesuar.
 * Yeni bir parça eklemek genelde `src/lib/avatar.ts` içindeki katalogla
 * sınırlıdır; burada yalnızca yeni bir `look` biçimi tanımlamak gerekir.
 *
 * Sunucuda da çizilebilir (durum yok), bu yüzden liderlik tablosu ve profil
 * gibi sayfalarda ek istemci paketi getirmez.
 */
export function Avatar({
  state,
  size = 96,
  className = "",
  animated = true,
}: {
  state: AvatarState;
  size?: number;
  className?: string;
  /** Efekt animasyonları — listelerde kapatmak için. */
  animated?: boolean;
}) {
  const base = getAvatarPart(state.base)?.look ?? { skin: "#e8b98a", hair: "short", hairColor: "#3b2a1f" };
  const outfit = getAvatarPart(state.outfit)?.look ?? { fill: "#3f4a63", collar: "tee" };
  const accessory = getAvatarPart(state.accessory)?.look;
  const effect = getAvatarPart(state.effect)?.look;

  const skin = base.skin ?? "#e8b98a";
  const hairColor = base.hairColor ?? "#3b2a1f";

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label="Avatar"
      className={className}
    >
      {/* Aynı sayfada birden çok avatar olduğunda id'ler tekrarlanır. Tanımlar
          birebir aynı olduğu için (sabit yarıçaplı daire, sabit degrade) hangi
          tanıma çözüldüğü sonucu değiştirmez. */}
      <defs>
        <clipPath id="va-avatar-clip">
          <circle cx="50" cy="50" r="46" />
        </clipPath>
        <linearGradient id="va-avatar-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--surface-2)" />
          <stop offset="100%" stopColor="var(--bg-soft)" />
        </linearGradient>
      </defs>

      {effect ? <Effect look={effect} animated={animated} /> : null}

      <circle cx="50" cy="50" r="46" fill="url(#va-avatar-bg)" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="var(--border)" strokeWidth="1.5" />

      <g clipPath="url(#va-avatar-clip)">
        <Body look={outfit} />
        {/* Boyun — gövdeyle kafa arasında kalmalı. */}
        <rect x="43" y="52" width="14" height="14" rx="6" fill={skin} />
        <circle cx="50" cy="41" r="17" fill={skin} />
        {/* Yüz */}
        <circle cx="44" cy="40" r="1.9" fill="#1c1917" />
        <circle cx="56" cy="40" r="1.9" fill="#1c1917" />
        <path
          d="M44.5 47 Q50 51 55.5 47"
          fill="none"
          stroke="#1c1917"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <Hair style={base.hair ?? "short"} color={hairColor} />
        {accessory ? <Accessory look={accessory} /> : null}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Katmanlar                                                           */
/* ------------------------------------------------------------------ */

function Body({ look }: { look: AvatarLook }) {
  const fill = look.fill ?? "#3f4a63";
  const shade = `color-mix(in oklab, ${fill} 70%, black)`;

  switch (look.collar) {
    case "hoodie":
      return (
        <g>
          <path d="M22 100 Q22 66 50 64 Q78 66 78 100 Z" fill={fill} />
          <path d="M38 65 Q50 78 62 65 Q57 62 50 62 Q43 62 38 65 Z" fill={shade} />
          <rect x="49" y="70" width="2" height="16" rx="1" fill={shade} />
        </g>
      );
    case "shirt":
      return (
        <g>
          <path d="M22 100 Q22 66 50 64 Q78 66 78 100 Z" fill={fill} />
          <path d="M43 64 L50 76 L57 64 L50 62 Z" fill="#fdfdfb" />
          <circle cx="50" cy="84" r="1.6" fill={shade} />
          <circle cx="50" cy="93" r="1.6" fill={shade} />
        </g>
      );
    case "blazer":
      return (
        <g>
          <path d="M22 100 Q22 66 50 64 Q78 66 78 100 Z" fill={fill} />
          <path d="M44 64 L50 78 L56 64 L50 62 Z" fill="#fdfdfb" />
          <path d="M40 65 L50 79 L38 100 L28 100 Z" fill={shade} />
          <path d="M60 65 L50 79 L62 100 L72 100 Z" fill={shade} />
        </g>
      );
    case "lab":
      return (
        <g>
          <path d="M22 100 Q22 66 50 64 Q78 66 78 100 Z" fill={fill} />
          <path d="M44 64 L50 76 L56 64 L50 62 Z" fill="#93c5fd" />
          <rect x="49.2" y="66" width="1.6" height="34" fill="#cbd5e1" />
          <rect x="62" y="82" width="9" height="11" rx="1.5" fill="#e2e8f0" />
        </g>
      );
    case "cape":
      return (
        <g>
          <path d="M14 100 Q26 70 50 64 Q74 70 86 100 Z" fill={fill} opacity="0.85" />
          <path d="M26 100 Q26 68 50 65 Q74 68 74 100 Z" fill="#2b3348" />
          <path d="M40 66 Q50 74 60 66 Q55 63 50 63 Q45 63 40 66 Z" fill={fill} />
        </g>
      );
    default:
      return (
        <g>
          <path d="M22 100 Q22 66 50 64 Q78 66 78 100 Z" fill={fill} />
          <path d="M42 64 Q50 71 58 64 Q54 62 50 62 Q46 62 42 64 Z" fill={shade} />
        </g>
      );
  }
}

function Hair({ style, color }: { style: NonNullable<AvatarLook["hair"]>; color: string }) {
  switch (style) {
    case "none":
      return null;
    case "curly":
      return (
        <g fill={color}>
          <circle cx="38" cy="30" r="8" />
          <circle cx="50" cy="25" r="9" />
          <circle cx="62" cy="30" r="8" />
          <circle cx="33" cy="38" r="6" />
          <circle cx="67" cy="38" r="6" />
        </g>
      );
    case "bun":
      return (
        <g fill={color}>
          <circle cx="50" cy="18" r="7" />
          <path d="M33 40 Q33 24 50 24 Q67 24 67 40 Q60 31 50 31 Q40 31 33 40 Z" />
        </g>
      );
    case "long":
      return (
        <g fill={color}>
          <path d="M31 44 Q31 23 50 23 Q69 23 69 44 L69 66 Q63 58 63 44 Q57 33 50 33 Q43 33 37 44 Q37 58 31 66 Z" />
        </g>
      );
    case "scarf":
      return (
        <g>
          <path
            d="M29 46 Q29 21 50 21 Q71 21 71 46 Q71 62 62 66 L60 46 Q56 36 50 36 Q44 36 40 46 L38 66 Q29 62 29 46 Z"
            fill={color}
          />
          <path d="M31 55 Q22 70 30 82 L44 70 Q34 66 31 55 Z" fill={color} opacity="0.85" />
        </g>
      );
    case "cap":
      return <path d="M32 38 Q32 22 50 22 Q68 22 68 38 Q50 32 32 38 Z" fill={color} />;
    default:
      return (
        <path
          d="M32 42 Q32 22 50 22 Q68 22 68 42 Q64 32 50 32 Q36 32 32 42 Z"
          fill={color}
        />
      );
  }
}

function Accessory({ look }: { look: AvatarLook }) {
  const accent = look.accent ?? "#1f2937";

  switch (look.gear) {
    case "glasses":
      return (
        <g fill="none" stroke={accent} strokeWidth="1.8">
          <circle cx="44" cy="40" r="6" />
          <circle cx="56" cy="40" r="6" />
          <path d="M50 40 h0" strokeWidth="2" />
          <path d="M38 39 L33 37 M62 39 L67 37" strokeLinecap="round" />
        </g>
      );
    case "shades":
      return (
        <g>
          <path d="M37 36 h12 v7 a6 6 0 0 1 -12 0 Z" fill={accent} />
          <path d="M51 36 h12 v7 a6 6 0 0 1 -12 0 Z" fill={accent} />
          <path d="M49 38 h2" stroke={accent} strokeWidth="2" />
          <path d="M37 37 L32 35 M63 37 L68 35" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      );
    case "headphones":
      return (
        <g>
          <path
            d="M30 42 Q30 20 50 20 Q70 20 70 42"
            fill="none"
            stroke={accent}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <rect x="26" y="38" width="8" height="13" rx="3.5" fill={accent} />
          <rect x="66" y="38" width="8" height="13" rx="3.5" fill={accent} />
        </g>
      );
    case "cap":
      return (
        <g fill={accent}>
          <path d="M31 33 Q31 17 50 17 Q69 17 69 33 Z" />
          <path d="M31 33 L20 37 Q28 41 50 39 L50 33 Z" opacity="0.9" />
        </g>
      );
    case "beanie":
      return (
        <g fill={accent}>
          <path d="M31 34 Q31 16 50 16 Q69 16 69 34 Z" />
          <rect x="29" y="31" width="42" height="7" rx="3.5" opacity="0.85" />
          <circle cx="50" cy="13" r="4" />
        </g>
      );
    case "visor":
      return (
        <g>
          <rect x="30" y="33" width="40" height="10" rx="5" fill={accent} opacity="0.55" />
          <rect x="30" y="33" width="40" height="10" rx="5" fill="none" stroke={accent} strokeWidth="1.6" />
          <path d="M33 38 h34" stroke="#fdfdfb" strokeWidth="1" opacity="0.7" />
        </g>
      );
    case "monocle":
      return (
        <g fill="none" stroke={accent} strokeWidth="1.8">
          <circle cx="56" cy="40" r="7" />
          <path d="M56 47 L58 58" strokeLinecap="round" />
        </g>
      );
    case "laurel":
      return (
        <g fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round">
          <path d="M30 44 Q26 28 42 20" />
          <path d="M70 44 Q74 28 58 20" />
          <path d="M33 38 l-5 -2 M35 32 l-5 -3 M39 26 l-4 -4" />
          <path d="M67 38 l5 -2 M65 32 l5 -3 M61 26 l4 -4" />
        </g>
      );
    default:
      return null;
  }
}

function Effect({ look, animated }: { look: AvatarLook; animated: boolean }) {
  const accent = look.accent ?? "var(--accent)";
  const spin = animated ? "va-avatar-spin 9s linear infinite" : undefined;

  switch (look.effect) {
    case "glow":
      return <circle cx="50" cy="50" r="48" fill={accent} opacity="0.22" />;
    case "ring":
      return (
        <g style={{ animation: spin, transformOrigin: "50px 50px" }}>
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeDasharray="14 8"
            opacity="0.8"
          />
        </g>
      );
    case "sparks":
      return (
        <g fill={accent} style={{ animation: spin, transformOrigin: "50px 50px" }}>
          <circle cx="50" cy="2.5" r="2.5" />
          <circle cx="88" cy="24" r="2" />
          <circle cx="88" cy="76" r="2.5" />
          <circle cx="50" cy="97.5" r="2" />
          <circle cx="12" cy="76" r="2.5" />
          <circle cx="12" cy="24" r="2" />
        </g>
      );
    case "orbit":
      return (
        <g style={{ animation: spin, transformOrigin: "50px 50px" }}>
          <ellipse
            cx="50"
            cy="50"
            rx="49"
            ry="24"
            fill="none"
            stroke={accent}
            strokeWidth="1.6"
            opacity="0.75"
          />
          <circle cx="99" cy="50" r="3.5" fill={accent} />
        </g>
      );
    case "aurora":
      return (
        <g opacity="0.55" style={{ animation: spin, transformOrigin: "50px 50px" }}>
          <circle cx="50" cy="50" r="49" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="40 90" />
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="40 90"
            strokeDashoffset="65"
          />
        </g>
      );
    default:
      return null;
  }
}
