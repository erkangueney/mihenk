import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LoginForm } from "@/components/auth/auth-forms";
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
    title: isLocale(locale) ? ui("auth.signIn", locale) : undefined,
    // Üyelik sayfaları aramada görünmemeli.
    robots: { index: false, follow: false },
  };
}

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const { next, error } = await searchParams;

  const subtitle =
    error === "suspended" ? ui("auth.suspended", locale) : ui("auth.welcomeBackSub", locale);

  return (
    <AuthShell locale={locale} title={ui("auth.welcomeBack", locale)} subtitle={subtitle}>
      <LoginForm locale={locale} next={next} />
    </AuthShell>
  );
}
