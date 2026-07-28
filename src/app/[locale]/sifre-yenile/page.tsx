import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewPasswordForm } from "@/components/auth/auth-forms";
import { AuthShell } from "@/components/auth/auth-shell";
import { isLocale, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: isLocale(locale) ? ui("auth.newPasswordTitle", locale) : undefined,
    // Üyelik sayfaları aramada görünmemeli.
    robots: { index: false, follow: false },
  };
}

/**
 * Sıfırlama e-postasındaki bağlantı buraya döner. Supabase istemcisi
 * adresteki token'ı okuyup geçici bir oturum açar; form da o oturumda
 * `updateUser({ password })` çağırır.
 */
export default async function NewPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <AuthShell
      locale={locale}
      title={ui("auth.newPasswordTitle", locale)}
      subtitle={ui("auth.newPasswordSub", locale)}
    >
      <NewPasswordForm locale={locale} />
    </AuthShell>
  );
}
