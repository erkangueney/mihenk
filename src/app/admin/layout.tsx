import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/dal";
import { signOutAction } from "@/lib/auth/actions";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: "Yönetim paneli",
  robots: { index: false, follow: false },
};

/**
 * Hiçbir admin sayfası önceden üretilmemeli.
 *
 * Normalde `requireAdmin()` içindeki `cookies()` çağrısı bunu zaten sağlar.
 * Ama Supabase anahtarları tanımlı değilken o kod yoluna hiç girilmiyor ve
 * sayfa "girişe yönlendir" hâliyle statik olarak dondurulabiliyor. Bir yetki
 * sınırının derleme ortamına bağlı davranması kabul edilemez; açıkça
 * kapatıyoruz.
 */
export const dynamic = "force-dynamic";

/**
 * Panelin dış kabuğu ve tek yetki kapısı.
 *
 * `requireAdmin()` cookies() okuduğu için bu ağaç istek anında render edilir;
 * hiçbir admin sayfası statik olarak üretilmez.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-bg-soft">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-display text-lg font-semibold">
            <span
              aria-hidden
              className="bg-accent text-on-accent grid h-8 w-8 place-items-center rounded-lg text-sm"
            >
              ⚙
            </span>
            <span className="hidden sm:inline">Yönetim</span>
          </Link>

          <AdminNav />

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/tr"
              className="hidden rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-surface-2 hover:text-text sm:block"
            >
              Siteye dön
            </Link>
            <span className="hidden max-w-[12rem] truncate text-xs text-muted lg:block">
              {admin.email}
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-muted transition hover:border-danger/50 hover:text-danger"
              >
                Çıkış
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
