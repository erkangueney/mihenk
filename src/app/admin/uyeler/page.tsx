import Link from "next/link";
import { listMembers, type MemberSort } from "@/lib/admin/queries";
import { CreateMemberForm } from "@/components/admin/create-member-form";
import { Badge, adminField } from "@/components/admin/ui";

interface Search {
  q?: string;
  role?: string;
  status?: string;
  sort?: string;
  page?: string;
}

const SORTS: { value: MemberSort; label: string }[] = [
  { value: "recent", label: "En yeni" },
  { value: "xp", label: "En çok XP" },
  { value: "active", label: "Son aktif" },
  { value: "name", label: "Ada göre" },
];

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("tr", { day: "2-digit", month: "short", year: "2-digit" });
}

/** Sayfalama bağlantıları mevcut filtreleri korumalı. */
function pageHref(search: Search, page: number): string {
  const params = new URLSearchParams();
  if (search.q) params.set("q", search.q);
  if (search.role) params.set("role", search.role);
  if (search.status) params.set("status", search.status);
  if (search.sort) params.set("sort", search.sort);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/admin/uyeler?${query}` : "/admin/uyeler";
}

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const search = await searchParams;

  const { rows, total, page, pageCount } = await listMembers({
    q: search.q,
    role: search.role === "admin" || search.role === "member" ? search.role : undefined,
    status:
      search.status === "active" || search.status === "suspended" ? search.status : undefined,
    sort: (SORTS.find((s) => s.value === search.sort)?.value ?? "recent") as MemberSort,
    page: Number(search.page) || 1,
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Üyeler</h1>
          <p className="mt-1 text-sm text-muted">{total.toLocaleString("tr")} kayıt</p>
        </div>
        <CreateMemberForm />
      </header>

      {/* Düz GET formu: JavaScript olmadan da çalışır, bağlantılar paylaşılabilir. */}
      <form className="card flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-[12rem] flex-1">
          <label htmlFor="q" className="mb-1.5 block text-xs font-semibold text-muted">
            Ara
          </label>
          <input
            id="q"
            name="q"
            defaultValue={search.q ?? ""}
            placeholder="E-posta veya ad"
            className={adminField}
          />
        </div>
        <div>
          <label htmlFor="role" className="mb-1.5 block text-xs font-semibold text-muted">
            Rol
          </label>
          <select id="role" name="role" defaultValue={search.role ?? ""} className={adminField}>
            <option value="">Tümü</option>
            <option value="member">Üye</option>
            <option value="admin">Yönetici</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="mb-1.5 block text-xs font-semibold text-muted">
            Durum
          </label>
          <select
            id="status"
            name="status"
            defaultValue={search.status ?? ""}
            className={adminField}
          >
            <option value="">Tümü</option>
            <option value="active">Aktif</option>
            <option value="suspended">Askıda</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mb-1.5 block text-xs font-semibold text-muted">
            Sırala
          </label>
          <select id="sort" name="sort" defaultValue={search.sort ?? "recent"} className={adminField}>
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-gold h-9 px-4 text-sm">
          Uygula
        </button>
        <Link
          href="/admin/uyeler"
          className="flex h-9 items-center rounded-lg px-3 text-sm text-muted transition hover:text-text"
        >
          Temizle
        </Link>
      </form>

      <div className="card overflow-hidden">
        {rows.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-muted">
            Bu ölçütlere uyan üye yok.
          </p>
        ) : (
          <div className="thin-scroll overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted uppercase">
                  <th className="px-4 py-3 font-semibold sm:px-6">Üye</th>
                  <th className="px-4 py-3 font-semibold">Durum</th>
                  <th className="px-4 py-3 text-right font-semibold">XP</th>
                  <th className="px-4 py-3 text-right font-semibold">Ders</th>
                  <th className="px-4 py-3 text-right font-semibold">Proje</th>
                  <th className="px-4 py-3 text-right font-semibold">Son aktif</th>
                  <th className="px-4 py-3 text-right font-semibold sm:px-6">Katıldı</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-border/60 transition last:border-0 hover:bg-surface-2"
                  >
                    <td className="px-4 py-3 sm:px-6">
                      <Link href={`/admin/uyeler/${member.id}`} className="block">
                        <span className="font-medium">{member.display_name || "(adsız)"}</span>
                        <span className="block truncate text-xs text-muted">{member.email}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex flex-wrap gap-1">
                        {member.role === "admin" ? <Badge tone="accent">yönetici</Badge> : null}
                        {member.suspended ? <Badge tone="danger">askıda</Badge> : null}
                        {member.hidden_from_leaderboard ? <Badge>gizli</Badge> : null}
                        {!member.suspended &&
                        member.role === "member" &&
                        !member.hidden_from_leaderboard ? (
                          <Badge tone="success">aktif</Badge>
                        ) : null}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">
                      {member.xp.toLocaleString("tr")}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted">
                      {member.lessons_done}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted">
                      {member.projects_done}
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-muted">
                      {formatDate(member.last_active)}
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-muted sm:px-6">
                      {formatDate(member.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pageCount > 1 ? (
        <nav className="flex items-center justify-between gap-4 text-sm">
          {page > 1 ? (
            <Link href={pageHref(search, page - 1)} className="text-accent hover:underline">
              ← Önceki
            </Link>
          ) : (
            <span className="text-muted/50">← Önceki</span>
          )}
          <span className="text-muted">
            Sayfa {page} / {pageCount}
          </span>
          {page < pageCount ? (
            <Link href={pageHref(search, page + 1)} className="text-accent hover:underline">
              Sonraki →
            </Link>
          ) : (
            <span className="text-muted/50">Sonraki →</span>
          )}
        </nav>
      ) : null}
    </div>
  );
}
