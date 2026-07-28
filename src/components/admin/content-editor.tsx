"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { deleteContentDocAction, saveContentDocAction } from "@/lib/admin/actions";
import { emptyActionResult } from "@/lib/auth/types";
import { validateContentDoc } from "@/lib/content-docs/validate";
import type { ContentKind } from "@/lib/supabase/types";
import { Label, ResultNotice, SubmitButton, adminField } from "./ui";

interface Props {
  kind: ContentKind;
  /** Düzenlenen içeriğin başlangıç JSON'u (biçimlendirilmiş). */
  initialJson: string;
  /** Veritabanında kaydı var mı? Yoksa silme seçeneği gösterilmez. */
  existsInDb: boolean;
  publishedInDb: boolean;
  slug: string | null;
  /** Kaydetme sonrası yönlendirmeden gelen bildirim. */
  savedNotice?: string;
}

export function ContentEditor({
  kind,
  initialJson,
  existsInDb,
  publishedInDb,
  slug,
  savedNotice,
}: Props) {
  const [saveResult, saveAction] = useActionState(saveContentDocAction, emptyActionResult);
  const [deleteResult, deleteAction] = useActionState(deleteContentDocAction, emptyActionResult);

  const [json, setJson] = useState(initialJson);
  // Kaydetmeden önce yerel doğrulama: sunucuya gitmeden hatayı göster.
  const [check, setCheck] = useState<{ ok: boolean; message: string } | null>(null);

  function runCheck(): void {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch (error) {
      setCheck({ ok: false, message: `JSON hatası: ${(error as Error).message}` });
      return;
    }
    const result = validateContentDoc(kind, parsed);
    setCheck(
      result.ok
        ? { ok: true, message: `Geçerli. Slug: ${result.slug}` }
        : { ok: false, message: result.message },
    );
  }

  function format(): void {
    try {
      setJson(JSON.stringify(JSON.parse(json), null, 2));
      setCheck(null);
    } catch (error) {
      setCheck({ ok: false, message: `Biçimlendirilemedi: ${(error as Error).message}` });
    }
  }

  return (
    <div className="space-y-4">
      <form action={saveAction} className="space-y-4">
        <input type="hidden" name="kind" value={kind} />

        <div className="card p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <Label htmlFor="data">{`${kind === "track" ? "Patika" : "Proje"} JSON'u`}</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={format}
                className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-text"
              >
                Biçimlendir
              </button>
              <button
                type="button"
                onClick={runCheck}
                className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-text"
              >
                Doğrula
              </button>
            </div>
          </div>

          {check ? (
            <p
              className={`mb-3 rounded-lg border px-3 py-2 font-mono text-xs ${
                check.ok
                  ? "border-success/40 bg-success/10 text-success"
                  : "border-danger/40 bg-danger/10 text-danger"
              }`}
            >
              {check.message}
            </p>
          ) : null}

          <textarea
            id="data"
            name="data"
            value={json}
            onChange={(event) => {
              setJson(event.target.value);
              setCheck(null);
            }}
            spellCheck={false}
            rows={28}
            className={`${adminField} thin-scroll resize-y font-mono text-xs leading-relaxed`}
          />

          <p className="mt-2 text-xs text-muted">
            Slug, JSON&apos;un içindeki <code className="font-mono">slug</code> alanından
            okunur. Dosyadaki bir slug&apos;ı kullanırsan o içeriğin yerine geçer.
          </p>
        </div>

        <div className="card space-y-4 p-4 sm:p-5">
          <ResultNotice
            result={
              saveResult.message ? saveResult : { ok: true, message: savedNotice ?? "" }
            }
          />

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="published"
              defaultChecked={publishedInDb}
              className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
            />
            <span>
              <span className="block text-sm font-medium">Yayınla</span>
              <span className="block text-xs text-muted">
                İşaretlenmezse taslak olarak saklanır ve sitede görünmez.
              </span>
            </span>
          </label>

          <div className="flex flex-wrap gap-2">
            <SubmitButton>Kaydet</SubmitButton>
            <Link
              href="/admin/icerik"
              className="flex h-9 items-center rounded-lg border border-border bg-surface-2 px-4 text-sm font-semibold text-muted transition hover:text-text"
            >
              Vazgeç
            </Link>
          </div>
        </div>
      </form>

      {existsInDb && slug ? (
        <form action={deleteAction} className="card space-y-3 border-danger/30 p-4 sm:p-5">
          <input type="hidden" name="kind" value={kind} />
          <input type="hidden" name="slug" value={slug} />
          <ResultNotice result={deleteResult} />
          <h2 className="font-semibold text-danger">Veritabanı kaydını sil</h2>
          <p className="text-xs text-muted">
            Bu içeriğin veritabanı sürümü silinir. Dosyada bir karşılığı varsa (
            <code className="font-mono">src/content</code>) o sürüm yeniden geçerli olur; yoksa
            içerik siteden tamamen kalkar.
          </p>
          <SubmitButton variant="danger">Kaydı sil</SubmitButton>
        </form>
      ) : null}
    </div>
  );
}
