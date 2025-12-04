import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AppHeader from "./_components/AppHeader";
import AppFooter from "./_components/AppFooter";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Tech Folio - プロジェクトとスキルを一元管理",
  description: "Tech Folioは、エンジニアのためのポートフォリオ管理ダッシュボードです。プロジェクト実績を管理・可視化し、スキルセットを効果的にアピールできます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${notoSansJP.variable} bg-[#f8f9fa] text-[#111827] antialiased`}
      >
        <AppHeader />
        <main className="mx-auto min-h-screen max-w-[1400px] px-4 py-6 sm:px-8">
          {children}
        </main>
        <AppFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
