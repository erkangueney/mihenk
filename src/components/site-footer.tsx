import Link from "next/link";
import { BrandLockup } from "@/components/brand";
import { BRAND_NAME } from "@/lib/brand";
import { StorageNote } from "@/components/storage-note";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const link = (href: string) => `/${locale}${href}`;

  return (
    <footer className="relative mt-20 border-t border-border bg-bg-soft/60">
      {/* Üst kenarda incecik altın çizgi — kapanışa imza atar. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <BrandLockup size={32} />
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            {locale === "tr"
              ? "Mihenk taşı, altının ayarını sınamak için üzerine altın sürülen siyah taştır. Bu platform da veriyle çalışma becerini aynı şekilde sınar: tarayıcıda çalışan gerçek kod, her kademede uçtan uca projeler ve portföye dönüşen çıktılar."
              : "A touchstone is the black stone against which gold is rubbed to prove its purity. This platform tests your data skills the same way: real code running in your browser, end-to-end projects at every stage, and outputs that become your portfolio."}
          </p>
        </div>

        <div>
          <h3 className="eyebrow">{ui("nav.learn", locale)}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link className="hover:text-text" href={link("/learn")}>
                {ui("tracks.title", locale)}
              </Link>
            </li>
            <li>
              <Link className="hover:text-text" href={link("/projects")}>
                {ui("projects.title", locale)}
              </Link>
            </li>
            <li>
              <Link className="hover:text-text" href={link("/roadmap")}>
                {ui("roadmap.title", locale)}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">{ui("nav.profile", locale)}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link className="hover:text-text" href={link("/profile")}>
                {ui("profile.overview", locale)}
              </Link>
            </li>
            <li>
              <Link className="hover:text-text" href={link("/leaderboard")}>
                {ui("leaderboard.title", locale)}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted sm:px-6">
        © {year} {BRAND_NAME} · <StorageNote locale={locale} />
      </div>
    </footer>
  );
}
