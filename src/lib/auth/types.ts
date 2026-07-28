/**
 * Form action durumları.
 *
 * Ayrı dosyada duruyorlar çünkü `"use server"` işaretli bir modül yalnızca
 * async fonksiyon dışa aktarabilir — sabit veya tip oraya konamaz.
 */

export interface AuthFormState {
  ok: boolean;
  message: string;
  /** Alan bazlı hatalar: { email: "...", password: "..." } */
  errors: Record<string, string>;
}

export const emptyAuthState: AuthFormState = { ok: false, message: "", errors: {} };

/** Admin panelindeki işlemlerin ortak dönüşü. */
export interface ActionResult {
  ok: boolean;
  message: string;
}

export const emptyActionResult: ActionResult = { ok: false, message: "" };
