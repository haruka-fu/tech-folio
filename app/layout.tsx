import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppHeader from "./_components/AppHeader";
import AppFooter from "./_components/AppFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#f8f9fa] text-[#111827] antialiased`}
      >
        <AppHeader />
        <main className="mx-auto min-h-screen max-w-[1400px] px-4 py-6 sm:px-8">
          {children}
        </main>
        <AppFooter />
      </body>
    </html>
  );
}
