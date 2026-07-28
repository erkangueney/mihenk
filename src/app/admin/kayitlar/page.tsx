import { listAuditLog } from "@/lib/admin/queries";

/** İşlem kodlarının okunabilir karşılıkları. */
const LABELS: Record<string, string> = {
  "member.create": "Üye oluşturdu",
  "member.update": "Üyeyi güncelledi",
  "member.delete": "Üyeyi sildi",
  "member.password": "Şifreyi değiştirdi",
  "member.reset_email": "Sıfırlama e-postası gönderdi",
  "member.reset_progress": "İlerlemeyi sıfırladı",
  "content.save": "İçerik kaydetti",
  "content.delete": "İçerik sildi",
  "content.publish": "İçerik yayınladı",
  "content.unpublish": "İçeriği yayından kaldırdı",
};

export default async function AuditLogPage() {
  const rows = await listAuditLog();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          İşlem kayıtları
        </h1>
        <p className="mt-1 text-sm text-muted">Panelden yapılan son 100 yönetim işlemi.</p>
      </header>

      <div className="card overflow-hidden">
        {rows.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-muted">Henüz kayıt yok.</p>
        ) : (
          <div className="thin-scroll overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted uppercase">
                  <th className="px-4 py-3 font-semibold sm:px-6">Zaman</th>
                  <th className="px-4 py-3 font-semibold">Yönetici</th>
                  <th className="px-4 py-3 font-semibold">İşlem</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Hedef</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-xs whitespace-nowrap text-muted sm:px-6">
                      {new Date(row.created_at).toLocaleString("tr", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">{row.actor_email || "—"}</td>
                    <td className="px-4 py-3 font-medium">{LABELS[row.action] ?? row.action}</td>
                    <td className="px-4 py-3 font-mono text-xs break-all text-muted sm:px-6">
                      {row.target || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
