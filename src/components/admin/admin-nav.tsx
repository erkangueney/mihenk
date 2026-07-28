"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Panel", exact: true },
  { href: "/admin/uyeler", label: "Üyeler", exact: false },
  { href: "/admin/icerik", label: "İçerik", exact: false },
  { href: "/admin/kayitlar", label: "Kayıtlar", exact: false },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="thin-scroll -mx-1 flex items-center gap-1 overflow-x-auto px-1">
      {items.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition ${
              active ? "bg-surface-2 text-text" : "text-muted hover:bg-surface-2 hover:text-text"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
