import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { ProgressProvider } from "@/components/progress-provider";
import { SessionProvider } from "@/components/auth/session-provider";
import { BRAND_NAME } from "@/lib/brand";
import { Toaster } from "@/components/toaster";
import { themeScript } from "@/components/theme-toggle";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans-stack",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  display: "swap",
});

// Başlıklar için serif display font — markaya "premium yayın" dokusu katar.
const display = Fraunces({
  variable: "--font-display-stack",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mihenk.vercel.app"),
  title: {
    default: `${BRAND_NAME} — Oyunlaştırılmış veri analizi ve veri bilimi eğitimi`,
    template: `%s · ${BRAND_NAME}`,
  },
  description:
    "Python, SQL, Tableau, Power BI, Microsoft Fabric ve daha fazlası. Tarayıcıda çalışan kod, XP ve rozetlerle oyunlaştırılmış dersler, her seviyede uçtan uca projeler.",
  keywords: [
    "veri analizi eğitimi",
    "veri bilimi",
    "SQL öğren",
    "Python veri analizi",
    "Power BI",
    "Tableau",
    "Microsoft Fabric",
    "pandas",
    "makine öğrenmesi",
  ],
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} — Veriyle çalışmayı oynayarak öğren`,
    description:
      "Uçtan uca projeler, tarayıcıda çalışan Python ve SQL, XP ve rozetlerle ilerleyen bir müfredat.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080d" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f2" },
  ],
  width: "device-width",
  initialScale: 1,
  // Erişilebilirlik: kullanıcı mobilde yakınlaştırabilmeli.
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${sans.variable} ${mono.variable} ${display.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Oturum dışta: ilerleme deposu hangi kullanıcıya ait olduğunu bilmeli. */}
        <SessionProvider>
          <ProgressProvider>
            {children}
            <Toaster />
          </ProgressProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
