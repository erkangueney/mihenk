import Link from "next/link";
import { BrandLockup } from "@/components/brand";
import { ui } from "@/lib/i18n";
import { supabaseEnabled } from "@/lib/supabase/config";
import type { Locale } from "@/lib/types";

/**
 * Giriş/kayıt sayfalarının ortak çerçevesi.
 *
 * Supabase yapılandırılmamışsa form yerine açıklama gösterir — depoyu
 * anahtarsız çalıştıran biri boş bir forma tıklayıp hata almasın.
 */
export function AuthShell({
  locale,
  title,
  subtitle,
  children,
}: {
  locale: Locale;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-12 sm:px-6 sm:py-20">
      <Link href={`/${locale}`} className="mx-auto mb-8 flex items-center gap-2.5">
        <BrandLockup size={36} />
      </Link>

      <div className="card p-6 sm:p-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 mb-6 text-sm leading-relaxed text-muted">{subtitle}</p>

        {supabaseEnabled ? (
          children
        ) : (
          <div className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm leading-relaxed text-warning">
            <p className="font-semibold">{ui("auth.disabledTitle", locale)}</p>
            <p className="mt-1.5">{ui("auth.disabledBody", locale)}</p>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        <Link href={`/${locale}`} className="hover:text-text">
          {ui("auth.backToSite", locale)}
        </Link>
      </p>
    </div>
  );
}
