/** İlerleme halkası — patika kartlarında ve profil sayfasında kullanılır. */
export function ProgressRing({
  value,
  size = 56,
  stroke = 5,
  label,
  color = "var(--accent)",
}: {
  /** 0–1 arası oran */
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  color?: string;
}) {
  const clamped = Math.max(0, Math.min(1, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `%${Math.round(clamped * 100)}`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span
        className="absolute inset-0 grid place-items-center font-semibold"
        style={{ fontSize: size * 0.26 }}
      >
        {Math.round(clamped * 100)}
        <span className="sr-only"> yüzde</span>
      </span>
    </div>
  );
}

/** Yatay ilerleme çubuğu. */
export function ProgressBar({
  value,
  className = "",
  gradient = true,
}: {
  value: number;
  className?: string;
  gradient?: boolean;
}) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-surface-2 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(clamped * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-700 ease-out ${
          gradient ? "bg-gradient-to-r from-accent to-accent-2" : "bg-accent"
        }`}
        style={{ width: `${clamped * 100}%` }}
      />
    </div>
  );
}
