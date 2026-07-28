import Link from "next/link";
import { getContentDoc } from "@/lib/admin/queries";
import { projects as fileProjects, tracks as fileTracks } from "@/content";
import { ContentEditor } from "@/components/admin/content-editor";
import { templateFor } from "@/lib/content-docs/templates";
import { Badge } from "@/components/admin/ui";
import type { ContentKind } from "@/lib/supabase/types";

/**
 * İçerik editörü.
 *
 * Başlangıç değeri şu sırayla aranır:
 *   1. Veritabanındaki kayıt (taslak da olsa) — üzerinde çalışılan sürüm odur.
 *   2. Dosyadaki sürüm — ilk kez düzenleniyorsa taban alınır.
 *   3. Şablon — tamamen yeni içerik.
 */
export default async function ContentEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; slug?: string; saved?: string }>;
}) {
  const params = await searchParams;
  const kind: ContentKind = params.kind === "project" ? "project" : "track";
  const slug = params.slug?.trim() || null;

  // Kaydetme sonrası yönlendirmeden geliyorsa sonucu bildir.
  const savedNotice =
    params.saved === "yayin"
      ? "Kaydedildi ve yayınlandı."
      : params.saved === "taslak"
        ? "Taslak olarak kaydedildi."
        : undefined;

  const doc = slug ? await getContentDoc(kind, slug) : null;

  const fileVersion = slug
    ? kind === "track"
      ? fileTracks.find((track) => track.slug === slug)
      : fileProjects.find((project) => project.slug === slug)
    : undefined;

  const source = doc?.data ?? fileVersion ?? templateFor(kind);
  const initialJson = JSON.stringify(source, null, 2);

  const heading = slug
    ? `${kind === "track" ? "Patika" : "Proje"}: ${slug}`
    : `Yeni ${kind === "track" ? "patika" : "proje"}`;

  return (
    <div className="space-y-6">
      <nav className="text-sm">
        <Link href="/admin/icerik" className="text-muted transition hover:text-text">
          ← İçerik
        </Link>
      </nav>

      <header>
        <h1 className="flex flex-wrap items-center gap-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {heading}
          {doc ? (
            doc.published ? (
              <Badge tone="success">yayında</Badge>
            ) : (
              <Badge tone="danger">taslak</Badge>
            )
          ) : fileVersion ? (
            <Badge>dosyadan</Badge>
          ) : (
            <Badge tone="accent">şablon</Badge>
          )}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          {doc
            ? "Veritabanındaki sürümü düzenliyorsun."
            : fileVersion
              ? "Dosyadaki sürüm taban alındı. Kaydettiğinde veritabanına yazılır ve yayınlandığında dosyadakinin yerine geçer — dosya değişmez."
              : "Boş bir şablondan başlıyorsun."}
        </p>
      </header>

      <ContentEditor
        kind={kind}
        initialJson={initialJson}
        existsInDb={Boolean(doc)}
        publishedInDb={doc?.published ?? false}
        slug={slug}
        savedNotice={savedNotice}
      />
    </div>
  );
}
