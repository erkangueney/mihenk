import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

/** Kök adres varsayılan dile yönlendirilir: / -> /tr */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
