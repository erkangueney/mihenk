import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Inter, JetBrains_Mono } from "next/font/google";
import { ProgressProvider } from "@/components/progress-provider";
import { SessionProvider } from "@/components/auth/session-provider";
import { AdScriptLoader } from "@/components/ads/ad-script-loader";
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

// Başlıklar: Chicago sanayi tabelası kökenli, kalıba basılmış metal plaka
// karakterinde bir grotesk — mihenk taşına vurulan ayar damgasının
// tipografik karşılığı. Süsleyici bir "yayın" serifi değil, aletin kendisi.
const display = Big_Shoulders({
  variable: "--font-display-stack",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["600", "700", "800"],
});

// impeccable direction contract — grep the production build for the seed
// key (e18e4d03) to audit that this comment survived. See new-work.md §5.
const DIRECTION_CONTRACT_COMMENT = `<!--
THESIS: Mihenk taşı gerçek bir alet — süsleyici bir logo değil, ilerlemeyi
taşa sürülen ve uzayan bir altın çizgi olarak ölçen bir ayar atölyesi.
Kategori varsayılanı (parlak degrade + neon ışıma "SaaS camı") reddedilir.
OWN-WORLD: Sıcak bazalt-siyahı zemin, tek sıcak vurgu (22 ayar altın)
yalnızca aktif/kazanılmış durumlarda; ikincil soğuk kalay-gri ölçek
çizgileri için. Başlıklar Big Shoulders (basılmış metal plaka), gövde
Inter, sayısal veriler JetBrains Mono (kazınmış rakam).
STORY: Kullanıcı kendi ilerlemesini soyut bir yüzde değil, taşa işlenmiş
somut bir ayar damgası olarak görür; kilitli içerik boş bir damga
kalıbıdır, kilit ikonu değil.
FIRST VIEWPORT: Ana sayfa kahraman bölümü — solda tez metni ve tek altın
eylem, altında gerçek patika verisiyle çalışan canlı bir ayar skalası.
FORM: Kendi 7 adayımdan zarın atadığı #7 (mihenk taşının edebi okuması) +
step-row ve font-özeti meydan okuyucularından iki katkı. Seed key: e18e4d03.
FINISH: unreviewed and undocumented is unfinished; this build ends with
the finish review, the verdict, and DESIGN.md.
-->`;

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
    { media: "(prefers-color-scheme: dark)", color: "#15110c" },
    { media: "(prefers-color-scheme: light)", color: "#f4efe4" },
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
      // Tema sınıfı boyamadan önce betikle yazılır; sunucu HTML'i ile fark
      // beklenen bir durumdur ve React'in uyarısı bilinçli olarak susturulur.
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${display.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <span
          aria-hidden
          style={{ display: "none" }}
          dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT_COMMENT }}
        />
        {/* Oturum dışta: ilerleme deposu hangi kullanıcıya ait olduğunu bilmeli. */}
        <SessionProvider>
          <ProgressProvider>
            {children}
            <Toaster />
          </ProgressProvider>
        </SessionProvider>
        <AdScriptLoader />
      </body>
    </html>
  );
}
