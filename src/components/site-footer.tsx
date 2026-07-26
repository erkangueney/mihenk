import Link from "next/link";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const link = (href: string) => `/${locale}${href}`;

  return (
    <footer className="mt-16 border-t border-border bg-bg-soft/60">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-base font-bold">
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-black text-white"
            >
              VA
            </span>
            Veri Akademi
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            {locale === "tr"
              ? "Veri analizi ve veri bilimi öğrenmenin oyunlaştırılmış yolu. Tarayıcıda çalışan gerçek kod, her seviyede uçtan uca projeler ve portföye dönüşen çıktılar."
              : "The gamified way to learn data analytics and data science. Real code that runs in your browser, end-to-end projects at every level, and outputs that become your portfolio."}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{ui("nav.learn", locale)}</h3>
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
          <h3 className="text-sm font-semibold">{ui("nav.profile", locale)}</h3>
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
        © {year} Veri Akademi ·{" "}
        {locale === "tr"
          ? "İlerlemen şu an bu cihazda saklanıyor."
          : "Your progress is currently stored on this device."}
      </div>
    </footer>
  );
}
