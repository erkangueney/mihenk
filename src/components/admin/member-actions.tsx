"use client";

import { useActionState } from "react";
import {
  deleteMemberAction,
  resetProgressAction,
  sendResetEmailAction,
  setPasswordAction,
  updateMemberAction,
} from "@/lib/admin/actions";
import { emptyActionResult } from "@/lib/auth/types";
import type { AdminMemberRow } from "@/lib/supabase/types";
import { Label, ResultNotice, SubmitButton, adminField } from "./ui";

function Checkbox({
  name,
  defaultChecked,
  label,
  hint,
}: {
  name: string;
  defaultChecked: boolean;
  label: string;
  hint: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface p-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
      />
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-muted">{hint}</span>
      </span>
    </label>
  );
}

/** Rol, askı durumu, liderlik görünürlüğü ve yönetici notu. */
export function MemberSettingsForm({ member }: { member: AdminMemberRow }) {
  const [result, action] = useActionState(updateMemberAction, emptyActionResult);

  return (
    <form action={action} className="card space-y-4 p-4 sm:p-5">
      <h2 className="font-semibold">Hesap ayarları</h2>
      <input type="hidden" name="id" value={member.id} />
      <ResultNotice result={result} />

      <div>
        <Label htmlFor="role">Rol</Label>
        <select id="role" name="role" defaultValue={member.role} className={adminField}>
          <option value="member">Üye</option>
          <option value="admin">Yönetici</option>
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Checkbox
          name="suspended"
          defaultChecked={member.suspended}
          label="Askıya al"
          hint="Giriş engellenir ve açık oturumları kapatılır."
        />
        <Checkbox
          name="hidden"
          defaultChecked={member.hidden_from_leaderboard}
          label="Liderlikte gizle"
          hint="Sıralamada görünmez; ilerlemesi işlenmeye devam eder."
        />
      </div>

      <div>
        <Label htmlFor="note">Yönetici notu</Label>
        <textarea
          id="note"
          name="note"
          rows={2}
          maxLength={500}
          defaultValue={member.note}
          placeholder="Yalnızca yöneticilerin gördüğü not"
          className={adminField}
        />
      </div>

      <SubmitButton>Kaydet</SubmitButton>
    </form>
  );
}

/** Şifreyi doğrudan belirle ya da sıfırlama e-postası gönder. */
export function MemberPasswordForms({ member }: { member: AdminMemberRow }) {
  const [setResult, setAction] = useActionState(setPasswordAction, emptyActionResult);
  const [mailResult, mailAction] = useActionState(sendResetEmailAction, emptyActionResult);

  return (
    <div className="card space-y-5 p-4 sm:p-5">
      <h2 className="font-semibold">Şifre</h2>

      <form action={setAction} className="space-y-3">
        <input type="hidden" name="id" value={member.id} />
        <ResultNotice result={setResult} />
        <div>
          <Label htmlFor="password">Yeni şifre belirle</Label>
          <input
            id="password"
            name="password"
            type="text"
            minLength={8}
            required
            placeholder="En az 8 karakter"
            className={`${adminField} font-mono`}
          />
        </div>
        <SubmitButton variant="ghost">Şifreyi değiştir</SubmitButton>
      </form>

      <form action={mailAction} className="space-y-3 border-t border-border pt-4">
        <input type="hidden" name="email" value={member.email} />
        <ResultNotice result={mailResult} />
        <p className="text-xs text-muted">
          Şifreyi hiç görmemeyi tercih edersen üyeye sıfırlama bağlantısı gönder.
        </p>
        <SubmitButton variant="ghost">Sıfırlama e-postası gönder</SubmitButton>
      </form>
    </div>
  );
}

/** Geri alınamaz işlemler — ikisi de yazılı onay ister. */
export function MemberDangerZone({ member }: { member: AdminMemberRow }) {
  const [resetResult, resetAction] = useActionState(resetProgressAction, emptyActionResult);
  const [deleteResult, deleteAction] = useActionState(deleteMemberAction, emptyActionResult);

  return (
    <div className="card space-y-5 border-danger/30 p-4 sm:p-5">
      <h2 className="font-semibold text-danger">Tehlikeli alan</h2>

      <form action={resetAction} className="space-y-3">
        <input type="hidden" name="id" value={member.id} />
        <ResultNotice result={resetResult} />
        <div>
          <Label htmlFor="reset-confirm">
            İlerlemeyi sıfırla — onaylamak için <code className="font-mono">SIFIRLA</code> yaz
          </Label>
          <input
            id="reset-confirm"
            name="confirm"
            required
            placeholder="SIFIRLA"
            className={adminField}
          />
        </div>
        <p className="text-xs text-muted">
          XP, dersler, projeler ve rozetler silinir. Hesap açık kalır.
        </p>
        <SubmitButton variant="danger">İlerlemeyi sıfırla</SubmitButton>
      </form>

      <form action={deleteAction} className="space-y-3 border-t border-danger/20 pt-4">
        <input type="hidden" name="id" value={member.id} />
        <ResultNotice result={deleteResult} />
        <div>
          <Label htmlFor="delete-confirm">
            Hesabı sil — onaylamak için <code className="font-mono">SIL</code> yaz
          </Label>
          <input id="delete-confirm" name="confirm" required placeholder="SIL" className={adminField} />
        </div>
        <p className="text-xs text-muted">
          Hesap ve tüm ilerlemesi kalıcı olarak silinir. Geri alınamaz.
        </p>
        <SubmitButton variant="danger">Hesabı sil</SubmitButton>
      </form>
    </div>
  );
}
