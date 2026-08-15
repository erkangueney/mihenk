import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/dal";
import { createCheckoutForm, iyzicoEnabled, type PremiumPlanId } from "@/lib/payments/iyzico";

const PRICES: Record<PremiumPlanId, string> = {
  monthly: "99.00",
  yearly: "799.00",
};

/** Abonelik başlatır — anahtarlar tanımlı değilse 503 döner (bkz. /premium sayfasındaki checkoutEnabled). */
export async function POST(request: Request) {
  if (!iyzicoEnabled) {
    return NextResponse.json({ message: "Ödeme sağlayıcısı bu kurulumda kapalı." }, { status: 503 });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Bu işlem için giriş yapmalısın." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { planId?: string } | null;
  const planId = body?.planId;
  if (planId !== "monthly" && planId !== "yearly") {
    return NextResponse.json({ message: "Geçersiz plan." }, { status: 400 });
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const result = await createCheckoutForm({
    userId: user.id,
    email: user.email,
    planId,
    priceTl: PRICES[planId],
    callbackUrl: `${site}/api/checkout/webhook`,
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: 502 });
  }

  return NextResponse.json({ url: result.checkoutFormUrl, token: result.token });
}
