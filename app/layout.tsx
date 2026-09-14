import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.css";
import "./styles/hero.css";
import "./styles/process.css";
import "./styles/navigation.css";
import "./styles/about.css";
import "./styles/showcase.css";
import "./styles/faq-contact.css";
import "./styles/projects.css";
import "./styles/mobile.css";

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  variable: "--font-space-grotesk",
  weight: "500 700",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "400 600",
  display: "swap",
});

const jbMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  variable: "--font-mono-jb",
  weight: "400 500",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NX2Y — Next to You",
  description: "Estratégias digitais e sites autorais para negócios que querem crescer, ser lembrados e transformar visitas em oportunidades.",
  metadataBase: new URL("https://nx2y.vercel.app"),
  openGraph: {
    title: "NX2Y — Estratégias digitais para negócios que querem crescer",
    description: "Sites autorais, responsivos e pensados para transformar visitas em oportunidades.",
    url: "https://nx2y.vercel.app",
    siteName: "NX2Y",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/nx2y-card-back-og.png", width: 1732, height: 908, alt: "NX2Y — verso da carta" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NX2Y — Estratégias digitais para negócios que querem crescer",
    description: "Sites autorais, responsivos e pensados para transformar visitas em oportunidades.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jbMono.variable} h-full`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--ink)]">{children}</body>
    </html>
  );
}
