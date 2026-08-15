import "server-only";
import crypto from "node:crypto";

/**
 * İyzico entegrasyonu — SCAFFOLD.
 *
 * Gerçek API anahtarı yok, bu yüzden istek/yanıt şekli İyzico'nun genel
 * dokümantasyonuna göre yazıldı ama CANLI DOĞRULANMADI. Anahtarları
 * ekleyip devreye almadan önce https://docs.iyzico.com üzerinden
 * "Checkout Form" (ödeme sayfası) ve "retrieve" (durum sorgulama) uç
 * noktalarının güncel istek/yanıt alanlarını teyit et.
 */

const API_KEY = process.env.IYZICO_API_KEY ?? "";
const SECRET_KEY = process.env.IYZICO_SECRET_KEY ?? "";
const BASE_URL = process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";

export const iyzicoEnabled = API_KEY.length > 0 && SECRET_KEY.length > 0;

export type PremiumPlanId = "monthly" | "yearly";

interface CheckoutFormResult {
  ok: true;
  checkoutFormUrl: string;
  token: string;
}

interface CheckoutFormError {
  ok: false;
  message: string;
}

/**
 * İyzico "Checkout Form Initialize" isteği.
 *
 * `conversationId`, webhook geldiğinde ödemenin hangi kullanıcıya/plana ait
 * olduğunu bulmak için kullanılır — burada `${userId}:${planId}:${nonce}`
 * biçiminde tutulur, webhook tarafında ayrıştırılır.
 */
export async function createCheckoutForm(params: {
  userId: string;
  email: string;
  planId: PremiumPlanId;
  priceTl: string;
  callbackUrl: string;
}): Promise<CheckoutFormResult | CheckoutFormError> {
  if (!iyzicoEnabled) return { ok: false, message: "İyzico anahtarları tanımlı değil." };

  const conversationId = `${params.userId}:${params.planId}:${crypto.randomUUID()}`;
  const body = {
    locale: "tr",
    conversationId,
    price: params.priceTl,
    paidPrice: params.priceTl,
    currency: "TRY",
    basketId: conversationId,
    paymentGroup: "SUBSCRIPTION",
    callbackUrl: params.callbackUrl,
    buyer: {
      id: params.userId,
      email: params.email,
    },
    basketItems: [
      {
        id: `premium-${params.planId}`,
        name: params.planId === "monthly" ? "Mihenk Premium (Aylık)" : "Mihenk Premium (Yıllık)",
        category1: "Abonelik",
        itemType: "VIRTUAL",
        price: params.priceTl,
      },
    ],
  };

  const response = await fetch(`${BASE_URL}/payment/iyzipos/checkoutform/initialize/auth/ecom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(body),
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => null)) as {
    status?: string;
    checkoutFormContent?: string;
    paymentPageUrl?: string;
    token?: string;
    errorMessage?: string;
  } | null;

  if (!data || data.status !== "success" || !data.token) {
    return { ok: false, message: data?.errorMessage ?? "Ödeme başlatılamadı." };
  }

  return {
    ok: true,
    checkoutFormUrl: data.paymentPageUrl ?? "",
    token: data.token,
  };
}

/** İyzico'nun kimlik doğrulama başlığı — HMAC şeması, canlıya almadan güncel dokümanla teyit edilmeli. */
function authHeader(body: unknown): string {
  const randomKey = `${Date.now()}${crypto.randomBytes(8).toString("hex")}`;
  const payload = randomKey + JSON.stringify(body);
  const signature = crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");
  return `IYZWSv2 ${API_KEY}:${signature}`;
}

interface RetrieveResult {
  paid: boolean;
  conversationId: string | null;
}

/**
 * Callback'te gelen `token`'a GÜVENME — İyzico'nun geri yönlendirmesi
 * sahtelenebilir bir tarayıcı isteğidir. Ödeme durumunu sunucudan sunucuya,
 * kendi gizli anahtarımızla İyzico'ya SORARAK doğrularız ("retrieve").
 * Bu, webhook gövdesindeki bir imzaya güvenmekten daha sağlam bir modeldir
 * (PayPal/Stripe'ın da önerdiği "always verify server-side" deseni).
 */
export async function retrieveCheckoutForm(token: string): Promise<RetrieveResult> {
  if (!iyzicoEnabled) return { paid: false, conversationId: null };

  const body = { locale: "tr", token };
  const response = await fetch(`${BASE_URL}/payment/iyzipos/checkoutform/auth/ecom/detail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(body),
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => null)) as {
    status?: string;
    paymentStatus?: string;
    conversationId?: string;
  } | null;

  return {
    paid: data?.status === "success" && data?.paymentStatus === "SUCCESS",
    conversationId: data?.conversationId ?? null,
  };
}

/** `conversationId`'den userId/planId çıkarır (bkz. createCheckoutForm). */
export function parseConversationId(conversationId: string): { userId: string; planId: PremiumPlanId } | null {
  const [userId, planId] = conversationId.split(":");
  if (!userId || (planId !== "monthly" && planId !== "yearly")) return null;
  return { userId, planId };
}
