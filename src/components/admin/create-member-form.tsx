"use client";

import { useActionState, useState } from "react";
import { createMemberAction } from "@/lib/admin/actions";
import { emptyActionResult } from "@/lib/auth/types";
import { Label, ResultNotice, SubmitButton, adminField } from "./ui";

/** Paylaşması kolay, tahmini zor geçici şifre. */
function suggestPassword(): string {
  // Karıştırılabilecek karakterler (0/O, 1/l/I) alfabeden çıkarıldı — bu şifre
  // çoğu zaman elle yazılarak veya sesli okunarak iletiliyor.
  const alphabet = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint32Array(14);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (value) => alphabet[value % alphabet.length]).join("");
}

/**
 * Şifre alanı ayrı bir bileşen.
 *
 * Böylece başarılı kayıttan sonra `key` değiştirilerek sıfırlanabiliyor.
 * Aynı durum üst bileşende tutulsaydı, ikinci üyeye farkında olmadan
 * birincinin şifresi verilebilirdi — formun kalanı temizlendiği için bu
 * fark edilmezdi.
 */
function PasswordField() {
  const [password, setPassword] = useState("");

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
      <div>
        <Label htmlFor="new-password">Geçici şifre</Label>
        <input
          id="new-password"
          name="password"
          type="text"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="En az 8 karakter"
          className={`${adminField} font-mono`}
        />
      </div>
      <button
        type="button"
        onClick={() => setPassword(suggestPassword())}
        className="h-9 rounded-lg border border-border bg-surface-2 px-3 text-sm text-muted transition hover:text-text"
      >
        Üret
      </button>
    </div>
  );
}

export function CreateMemberForm() {
  const [result, action] = useActionState(createMemberAction, emptyActionResult);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setOpen(true)} className="btn-gold h-9 px-4 text-sm">
          + Üye oluştur
        </button>
        {result.message ? <ResultNotice result={result} /> : null}
      </div>
    );
  }

  return (
    // w-full: açıldığında başlık satırının sağına sıkışmayıp tam genişliğe yayılır.
    <form action={action} className="card w-full space-y-4 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Yeni üye</h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-muted hover:text-text"
        >
          Kapat
        </button>
      </div>

      <ResultNotice result={result} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="new-email">E-posta</Label>
          <input
            id="new-email"
            name="email"
            type="email"
            required
            placeholder="uye@ornek.com"
            className={adminField}
          />
        </div>
        <div>
          <Label htmlFor="new-name">Görünen ad</Label>
          <input
            id="new-name"
            name="displayName"
            maxLength={40}
            placeholder="Ad Soyad"
            className={adminField}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_10rem] sm:items-end">
        {/* key: başarılı kayıttan sonra alan sıfırdan kurulur, şifre taşınmaz. */}
        <PasswordField key={result.ok ? result.message : "yeni"} />
        <div>
          <Label htmlFor="new-role">Rol</Label>
          <select id="new-role" name="role" defaultValue="member" className={adminField}>
            <option value="member">Üye</option>
            <option value="admin">Yönetici</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-muted">
        Hesap doğrulanmış olarak açılır; üye bu şifreyle hemen giriş yapabilir. Şifreyi güvenli bir
        kanaldan ilet ve değiştirmesini iste.
      </p>

      <SubmitButton>Üyeyi oluştur</SubmitButton>
    </form>
  );
}
