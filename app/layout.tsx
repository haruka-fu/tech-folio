import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppHeader from "./_components/AppHeader";
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
  title: "Tech Folio Dashboard",
  description: "個人向けポートフォリオ管理ダッシュボードの最小実装デモです。",
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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#f8f9fa] text-[#111827] antialiased`}
      >
        <AppHeader />
        <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col px-4 py-6 sm:px-8">
          <main className="flex-1 pb-10">{children}</main>
          <footer className="mt-10 border-t border-white/10 pt-4 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Tech Folio Demo
          </footer>
        </div>
      </body>
    </html>
  );
}
