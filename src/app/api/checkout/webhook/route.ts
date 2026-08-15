import { NextResponse } from "next/server";
import { adminEnabled, getSupabaseAdmin } from "@/lib/supabase/admin";
import { parseConversationId, retrieveCheckoutForm } from "@/lib/payments/iyzico";

const PLAN_DAYS: Record<"monthly" | "yearly", number> = {
  monthly: 30,
  yearly: 365,
};

/**
 * İyzico, ödeme sonrası kullanıcıyı bu adrese `token` alanıyla (form-encoded)
 * geri gönderir. Bu isteğin gövdesine GÜVENMİYORUZ — token'ı alıp durumu
 * kendi gizli anahtarımızla İyzico'dan tekrar SORUYORUZ (bkz. retrieveCheckoutForm).
 */
export async function POST(request: Request) {
  if (!adminEnabled) {
    return NextResponse.json({ message: "SUPABASE_SERVICE_ROLE_KEY tanımlı değil." }, { status: 503 });
  }

  const form = await request.formData().catch(() => null);
  const token = String(form?.get("token") ?? "");
  if (!token) return NextResponse.json({ message: "Token eksik." }, { status: 400 });

  const { paid, conversationId } = await retrieveCheckoutForm(token);
  if (!paid || !conversationId) {
    return NextResponse.json({ message: "Ödeme doğrulanamadı." }, { status: 402 });
  }

  const parsed = parseConversationId(conversationId);
  if (!parsed) return NextResponse.json({ message: "Geçersiz conversationId." }, { status: 400 });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + PLAN_DAYS[parsed.planId]);

  const admin = getSupabaseAdmin();
  const { error } = await admin
    .from("profiles")
    .update({
      plan: "premium",
      plan_expires_at: expiresAt.toISOString(),
      plan_source: "iyzico",
    })
    .eq("id", parsed.userId);

  if (error) {
    return NextResponse.json({ message: `Güncellenemedi: ${error.message}` }, { status: 500 });
  }

  await admin.from("audit_log").insert({
    actor_id: parsed.userId,
    actor_email: "",
    action: "payment.iyzico.success",
    target: parsed.userId,
    detail: { planId: parsed.planId, conversationId },
  });

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return NextResponse.redirect(`${site}/tr/premium?odeme=basarili`, { status: 303 });
}
