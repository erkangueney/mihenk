import Link from "next/link";
import { BrandLockup } from "@/components/brand";
import { supabaseEnabled } from "@/lib/supabase/config";

/**
 * Giriş/kayıt sayfalarının ortak çerçevesi.
 *
 * Supabase yapılandırılmamışsa form yerine açıklama gösterir — depoyu
 * anahtarsız çalıştıran biri boş bir forma tıklayıp hata almasın.
 */
export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-12 sm:px-6 sm:py-20">
      <Link href="/tr" className="mx-auto mb-8 flex items-center gap-2.5">
        <BrandLockup size={36} />
      </Link>

      <div className="card p-6 sm:p-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 mb-6 text-sm leading-relaxed text-muted">{subtitle}</p>

        {supabaseEnabled ? (
          children
        ) : (
          <div className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm leading-relaxed text-warning">
            <p className="font-semibold">Giriş bu kurulumda kapalı.</p>
            <p className="mt-1.5">
              Üyelik için <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> ve{" "}
              <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> tanımlanmalı.
              Adımlar: <code className="font-mono text-xs">docs/kurulum.md</code>
            </p>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        <Link href="/tr" className="hover:text-text">
          ← Siteye dön
        </Link>
      </p>
    </div>
  );
}
