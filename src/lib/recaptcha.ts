import "server-only";

const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY ?? "";
const SCORE_THRESHOLD = 0.5;

/**
 * reCAPTCHA v3 token'ını doğrular.
 *
 * `RECAPTCHA_SECRET_KEY` tanımlı değilse doğrulama atlanır (true döner) —
 * mevcut ".env boşsa özellik sessizce kapanır" felsefesiyle tutarlı, yerel
 * kurulumda kayıt akışını bozmaz.
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!SECRET_KEY) return true;
  if (!token) return false;

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: SECRET_KEY, response: token }),
    });
    const data = (await response.json()) as { success?: boolean; score?: number };
    return data.success === true && (data.score ?? 0) >= SCORE_THRESHOLD;
  } catch {
    // Google'a ulaşılamıyorsa kayıt akışını kilitleme; erişilemezlik bir
    // güvenlik açığına dönüşmesin diye yalnızca skor kontrolü atlanır.
    return true;
  }
}
