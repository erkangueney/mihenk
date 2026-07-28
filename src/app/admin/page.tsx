import Link from "next/link";
import { getOverview, recentMembers } from "@/lib/admin/queries";
import { Badge, StatCard } from "@/components/admin/ui";
import { getPlatformStats } from "@/lib/content-docs/resolve";
import { adminEnabled } from "@/lib/supabase/admin";

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("tr", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminDashboard() {
  const [overview, recent, content] = await Promise.all([
    getOverview(),
    recentMembers(),
    getPlatformStats(),
  ]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Gösterge paneli
        </h1>
        <p className="mt-2 text-sm text-muted">
          Üyelik, ilerleme ve içerik durumunun özeti.
        </p>
      </header>

      {!adminEnabled ? (
        <p className="rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning">
          <strong>SUPABASE_SERVICE_ROLE_KEY tanımlı değil.</strong> Listeleri görebilirsin ama üye
          oluşturma, silme ve şifre işlemleri kapalı. Anahtarı ortam değişkenlerine ekleyip yeniden
          dağıt.
        </p>
      ) : null}

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Üye" value={overview.members} hint={`${overview.admins} yönetici`} />
        <StatCard
          label="Bugün aktif"
          value={overview.active_today}
          hint={`son 7 günde ${overview.active_week}`}
        />
        <StatCard label="Toplam XP" value={overview.total_xp} />
        <StatCard
          label="Tamamlanan ders"
          value={overview.lessons_done}
          hint={`${overview.projects_done} proje`}
        />
      </section>

      <section className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <StatCard
          label="Yayındaki içerik"
          value={`${content.tracks} patika · ${content.lessons} ders`}
          hint={`${content.projects} uçtan uca proje`}
        />
        <StatCard
          label="İçerik değişikliği"
          value={overview.overrides}
          hint={`${overview.drafts} taslak bekliyor`}
        />
        <StatCard
          label="Askıdaki hesap"
          value={overview.suspended}
          hint={overview.suspended > 0 ? "girişleri kapalı" : "yok"}
        />
      </section>

      <section className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
          <h2 className="font-semibold">Son kaydolanlar</h2>
          <Link href="/admin/uyeler" className="text-sm font-semibold text-accent hover:underline">
            Tümü →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted sm:px-6">
            Henüz üye yok.{" "}
            <Link href="/admin/uyeler" className="font-semibold text-accent hover:underline">
              İlk üyeyi oluştur
            </Link>
            .
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((member) => (
              <li key={member.id}>
                <Link
                  href={`/admin/uyeler/${member.id}`}
                  className="flex items-center gap-3 px-4 py-3 transition hover:bg-surface-2 sm:px-6"
                >
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 truncate text-sm font-medium">
                      {member.display_name || "(adsız)"}
                      {member.role === "admin" ? <Badge tone="accent">yönetici</Badge> : null}
                      {member.suspended ? <Badge tone="danger">askıda</Badge> : null}
                    </p>
                    <p className="truncate text-xs text-muted">{member.email}</p>
                  </div>
                  <div className="text-right text-xs text-muted">
                    <p className="font-semibold tabular-nums text-text">
                      {member.xp.toLocaleString("tr")} XP
                    </p>
                    <p>{formatDate(member.created_at)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
