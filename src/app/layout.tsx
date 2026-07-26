import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ProgressProvider } from "@/components/progress-provider";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://veri-akademi.vercel.app"),
  title: {
    default: "Veri Akademi — Oyunlaştırılmış veri analizi ve veri bilimi eğitimi",
    template: "%s · Veri Akademi",
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
    siteName: "Veri Akademi",
    title: "Veri Akademi — Veriyle çalışmayı oynayarak öğren",
    description:
      "Uçtan uca projeler, tarayıcıda çalışan Python ve SQL, XP ve rozetlerle ilerleyen bir müfredat.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
    { media: "(prefers-color-scheme: light)", color: "#f7f9ff" },
  ],
  width: "device-width",
  initialScale: 1,
  // Erişilebilirlik: kullanıcı mobilde yakınlaştırabilmeli.
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ProgressProvider>
          {children}
          <Toaster />
        </ProgressProvider>
      </body>
    </html>
  );
}
