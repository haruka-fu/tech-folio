import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
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
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-[#e5e7eb]">
          <div className="mx-auto max-w-6xl w-full px-4 py-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-3 text-[#1f2937]"
                >
                  <div className="size-6 text-[#2b6cee]">
                    <svg
                      aria-hidden
                      className="text-[#2b6cee]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.38 2.22c-2.33-1.04-5.1-.34-6.6 1.77-1.13 1.59-.8 3.7.69 4.85 1.15.89 2.69 1.15 4.09.73l2.81 3.65-4.2 4.14-3.72-3.66a1.003 1.003 0 0 0-1.42 1.42l4.42 4.36c.39.39 1.02.39 1.41 0l4.9-4.83c.2-.2.33-.45.39-.73H17a3 3 0 0 0 3-3V6c0-1.65-1.35-3-3-3h-3.3c-.22 0-.44-.06-.62-.18zM17 10h-3.23c.53.53.86 1.25.86 2.05 0 1.63-1.32 2.95-2.95 2.95S8.73 13.68 8.73 12.05c0-.8.33-1.52.86-2.05H8.73A3.009 3.009 0 0 0 5.78 12.8l2.92 2.87c.39.39 1.02.39 1.41 0l3.19-3.15c.35-.35.56-.83.56-1.36V6.05c.86.66 1.43 1.73 1.43 2.95V10z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold">TechFolio</h2>
                </Link>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm text-[#6b7280]">
                <Link href="/" className="hover:text-[#111827]">
                  ダッシュボード
                </Link>
                <Link href="/profile" className="hover:text-[#111827]">
                  プロフィール
                </Link>
                <Link
                  href="/integrations/qiita"
                  className="hover:text-[#111827]"
                >
                  Qiita連携
                </Link>
                <Link href="/tags" className="hover:text-[#111827]">
                  タグ管理
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <button className="hidden h-10 min-w-[84px] items-center justify-center rounded-lg bg-[#2b6cee] px-4 text-sm font-bold text-white sm:flex">
                  新規プロジェクト追加
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#e5e7eb] text-[#111827] shadow-sm">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                </button>
                <div
                  className="size-10 aspect-square rounded-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA6PWaaBW8av2RMEZAe1O8YRJ_R5D9bVtlpA6q_cj4OTGpZItFOKLbUj1OAJpPFdCakF56t2Tf3jViZLgi7Bjk0NMIuEOMbAKhCZiOURefbX1PriQA7Fm3ynSDT2Pe0PseWUeRg3kAijGb")',
                  }}
                />
              </div>
            </div>
          </div>
        </header>
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-8">
          <main className="flex-1 pb-10">{children}</main>
          <footer className="mt-10 border-t border-white/10 pt-4 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Tech Folio Demo
          </footer>
        </div>
      </body>
    </html>
  );
}
