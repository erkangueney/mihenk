import { ImageResponse } from "next/og";
import { BRAND_COLORS } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS ana ekran ikonu. SVG amblemin aynısı, ama Satori yalnızca kutu
 * düzenini anladığı için ayar izleri döndürülmüş kutularla kuruluyor.
 */
export default function AppleIcon() {
  const streak = (height: number) => (
    <div
      style={{
        width: 15,
        height,
        borderRadius: 999,
        transform: "rotate(-7deg)",
        background: `linear-gradient(20deg, ${BRAND_COLORS.goldDeep}, ${BRAND_COLORS.gold} 55%, ${BRAND_COLORS.goldLight})`,
      }}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 15,
          paddingBottom: 42,
          background: `linear-gradient(180deg, ${BRAND_COLORS.stoneTop}, ${BRAND_COLORS.stoneBottom})`,
        }}
      >
        {streak(44)}
        {streak(67)}
        {streak(90)}
      </div>
    ),
    size,
  );
}
