"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  requestPasswordResetAction,
  signInAction,
  signUpAction,
  updatePasswordAction,
} from "@/lib/auth/actions";
import { emptyAuthState } from "@/lib/auth/types";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* Ortak parçalar                                                      */
/* ------------------------------------------------------------------ */

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text " +
  "outline-none transition placeholder:text-muted/70 focus:border-accent " +
  "focus:ring-2 focus:ring-accent/25";

function Field({
  label,
  name,
  type = "text",
  error,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `field-${name}`;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={fieldClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Form geneline ait başarı/hata bildirimi. */
function Notice({ ok, message }: { ok: boolean; message: string }) {
  if (!message) return null;
  return (
    <p
      role="status"
      className={`rounded-xl border px-3.5 py-2.5 text-sm ${
        ok
          ? "border-success/40 bg-success/10 text-success"
          : "border-danger/40 bg-danger/10 text-danger"
      }`}
    >
      {message}
    </p>
  );
}

function Submit({
  pending,
  label,
  locale,
}: {
  pending: boolean;
  label: string;
  locale: Locale;
}) {
  return (
    <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-60">
      {pending ? ui("auth.pending", locale) : label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Giriş                                                               */
/* ------------------------------------------------------------------ */

export function LoginForm({ locale, next }: { locale: Locale; next?: string }) {
  const [state, action, pending] = useActionState(signInAction, emptyAuthState);

  return (
    <form action={action} className="space-y-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <Notice ok={state.ok} message={state.message} />
      <Field
        label={ui("auth.email", locale)}
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="ornek@eposta.com"
        error={state.errors.email}
      />
      <Field
        label={ui("auth.password", locale)}
        name="password"
        type="password"
        autoComplete="current-password"
        required
        placeholder="••••••••"
        error={state.errors.password}
      />
      <Submit pending={pending} label={ui("auth.signIn", locale)} locale={locale} />
      <div className="flex items-center justify-between text-xs">
        <Link href={`/${locale}/sifremi-unuttum`} className="text-muted hover:text-text">
          {ui("auth.forgot", locale)}
        </Link>
        <Link
          href={`/${locale}/kayit`}
          className="font-semibold text-accent hover:underline"
        >
          {ui("auth.createAccount", locale)}
        </Link>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Kayıt                                                               */
/* ------------------------------------------------------------------ */

export function SignupForm({ locale }: { locale: Locale }) {
  const [state, action, pending] = useActionState(signUpAction, emptyAuthState);

  return (
    <form action={action} className="space-y-4">
      <Notice ok={state.ok} message={state.message} />
      <Field
        label={ui("auth.displayName", locale)}
        name="displayName"
        autoComplete="nickname"
        required
        maxLength={40}
        placeholder={ui("auth.displayNameHint", locale)}
        error={state.errors.displayName}
      />
      <Field
        label={ui("auth.email", locale)}
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="ornek@eposta.com"
        error={state.errors.email}
      />
      <Field
        label={ui("auth.password", locale)}
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        placeholder={ui("auth.passwordHint", locale)}
        error={state.errors.password}
      />
      <Submit pending={pending} label={ui("auth.createAccount", locale)} locale={locale} />
      <p className="text-center text-xs text-muted">
        {ui("auth.haveAccount", locale)}{" "}
        <Link href={`/${locale}/giris`} className="font-semibold text-accent hover:underline">
          {ui("auth.signIn", locale)}
        </Link>
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Şifre sıfırlama                                                     */
/* ------------------------------------------------------------------ */

export function ResetRequestForm({ locale }: { locale: Locale }) {
  const [state, action, pending] = useActionState(requestPasswordResetAction, emptyAuthState);

  return (
    <form action={action} className="space-y-4">
      <Notice ok={state.ok} message={state.message} />
      <Field
        label={ui("auth.email", locale)}
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="ornek@eposta.com"
      />
      <Submit pending={pending} label={ui("auth.resetSend", locale)} locale={locale} />
      <p className="text-center text-xs text-muted">
        <Link href={`/${locale}/giris`} className="hover:text-text">
          {ui("auth.backToSignIn", locale)}
        </Link>
      </p>
    </form>
  );
}

export function NewPasswordForm({ locale }: { locale: Locale }) {
  const [state, action, pending] = useActionState(updatePasswordAction, emptyAuthState);

  return (
    <form action={action} className="space-y-4">
      <Notice ok={state.ok} message={state.message} />
      <Field
        label={ui("auth.newPassword", locale)}
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        error={state.errors.password}
      />
      <Field
        label={ui("auth.newPasswordAgain", locale)}
        name="confirm"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        error={state.errors.confirm}
      />
      <Submit pending={pending} label={ui("auth.updatePassword", locale)} locale={locale} />
    </form>
  );
}
