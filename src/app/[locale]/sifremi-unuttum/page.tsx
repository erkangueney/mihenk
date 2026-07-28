import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResetRequestForm } from "@/components/auth/auth-forms";
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
    title: isLocale(locale) ? ui("auth.resetTitle", locale) : undefined,
    // Üyelik sayfaları aramada görünmemeli.
    robots: { index: false, follow: false },
  };
}

export default async function ForgotPasswordPage({
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
      title={ui("auth.resetTitle", locale)}
      subtitle={ui("auth.resetSub", locale)}
    >
      <ResetRequestForm locale={locale} />
    </AuthShell>
  );
}
