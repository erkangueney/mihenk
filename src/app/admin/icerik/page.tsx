import Link from "next/link";
import { listContentDocs } from "@/lib/admin/queries";
import { projects as fileProjects, tracks as fileTracks } from "@/content";
import { Badge } from "@/components/admin/ui";
import type { ContentKind } from "@/lib/supabase/types";

interface Row {
  kind: ContentKind;
  slug: string;
  name: string;
  detail: string;
  /** file: yalnızca dosyada; override: dosyadakini değiştiriyor; new: yalnızca veritabanında */
  source: "file" | "override" | "new";
  published: boolean;
}

function SourceBadge({ row }: { row: Row }) {
  if (row.source === "file") return <Badge>dosya</Badge>;
  if (!row.published) return <Badge tone="danger">taslak</Badge>;
  return row.source === "override" ? (
    <Badge tone="accent">değiştirildi</Badge>
  ) : (
    <Badge tone="success">yeni</Badge>
  );
}

export default async function ContentPage() {
  const docs = await listContentDocs();
  const docBySlug = new Map(docs.map((doc) => [`${doc.kind}/${doc.slug}`, doc]));

  const rows: Row[] = [];

  for (const track of fileTracks) {
    const doc = docBySlug.get(`track/${track.slug}`);
    const lessons = track.levels.reduce((sum, level) => sum + level.lessons.length, 0);
    rows.push({
      kind: "track",
      slug: track.slug,
      name: track.name,
      detail: `${track.levels.length} seviye · ${lessons} ders`,
      source: doc ? "override" : "file",
      published: doc?.published ?? true,
    });
  }

  for (const project of fileProjects) {
    const doc = docBySlug.get(`project/${project.slug}`);
    rows.push({
      kind: "project",
      slug: project.slug,
      name: project.title.tr,
      detail: `${project.trackSlug} · ${project.xp} XP`,
      source: doc ? "override" : "file",
      published: doc?.published ?? true,
    });
  }

  // Yalnızca veritabanında olanlar — dosyada karşılığı yok.
  const fileSlugs = new Set([
    ...fileTracks.map((track) => `track/${track.slug}`),
    ...fileProjects.map((project) => `project/${project.slug}`),
  ]);
  for (const doc of docs) {
    const key = `${doc.kind}/${doc.slug}`;
    if (fileSlugs.has(key)) continue;
    const data = doc.data as { name?: string; title?: { tr?: string } };
    rows.push({
      kind: doc.kind,
      slug: doc.slug,
      name: data?.name ?? data?.title?.tr ?? doc.slug,
      detail: "yalnızca veritabanında",
      source: "new",
      published: doc.published,
    });
  }

  const tracks = rows.filter((row) => row.kind === "track");
  const projects = rows.filter((row) => row.kind === "project");

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">İçerik</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Dosyalardaki içerik (<code className="font-mono text-xs">src/content</code>) taban
            sürümdür. Buradan yaptığın düzenlemeler veritabanına yazılır ve yayınlandığında
            dosyadakinin yerine geçer.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/icerik/duzenle?kind=track" className="btn-gold h-9 px-4 text-sm">
            + Patika
          </Link>
          <Link
            href="/admin/icerik/duzenle?kind=project"
            className="flex h-9 items-center rounded-lg border border-border bg-surface-2 px-4 text-sm font-semibold text-muted transition hover:text-text"
          >
            + Proje
          </Link>
        </div>
      </header>

      {[
        { title: "Patikalar", items: tracks },
        { title: "Projeler", items: projects },
      ].map((group) => (
        <section key={group.title} className="card overflow-hidden">
          <h2 className="border-b border-border px-4 py-3 font-semibold sm:px-6">
            {group.title}{" "}
            <span className="text-sm font-normal text-muted">({group.items.length})</span>
          </h2>
          <ul className="divide-y divide-border">
            {group.items.map((row) => (
              <li key={`${row.kind}/${row.slug}`}>
                <Link
                  href={`/admin/icerik/duzenle?kind=${row.kind}&slug=${row.slug}`}
                  className="flex items-center gap-3 px-4 py-3 transition hover:bg-surface-2 sm:px-6"
                >
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
                      {row.name}
                      <SourceBadge row={row} />
                    </p>
                    <p className="truncate font-mono text-xs text-muted">
                      {row.slug} · {row.detail}
                    </p>
                  </div>
                  <span aria-hidden className="text-muted">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
