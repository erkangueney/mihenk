import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AvatarStudio } from "@/components/avatar/avatar-studio";
import { isLocale, locales, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";
  return {
    title: tr ? "Avatar stüdyosu" : "Avatar studio",
    description: tr
      ? "Kazandığın XP'yi harcayarak avatarını özelleştir: karakter, kıyafet, aksesuar ve görsel efektler."
      : "Spend the XP you earn to customize your avatar: character, outfit, accessories and visual effects.",
  };
}

export default async function AvatarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 max-w-2xl">
        <p className="eyebrow">{ui("nav.profile", locale)}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {ui("avatar.title", locale)}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{ui("avatar.subtitle", locale)}</p>
      </header>

      <AvatarStudio locale={locale} />
    </div>
  );
}
