"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NewProjectModal from "./NewProjectModal";

export default function AppHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-[#e5e7eb] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 text-[#1f2937]">
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
            <div className="hidden items-center gap-4 text-sm text-[#6b7280] md:flex">
              <Link href="/profile" className="hover:text-[#111827]">
                スキル一覧
              </Link>
              <Link href="/" className="hover:text-[#111827]">
                プロジェクト一覧
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {pathname === "/" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hidden h-10 min-w-[84px] items-center justify-center rounded-lg bg-[#2b6cee] px-4 text-sm font-bold text-white sm:flex"
                >
                  新規プロジェクト追加
                </button>
              )}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="size-10 aspect-square cursor-pointer rounded-full bg-cover bg-center bg-no-repeat border-2 border-slate-300 transition-all hover:border-[#2b6cee]"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjRibWRXMrRAeffJBSYqrUvPBepXfAcL__fSwR60eoWjPbC_NmicCUhm3uPqMJE9BbGwOJGw8n7VtbYx39CQzEvxR7jIfHap8zbdjh8Agulk9W2--ldTL5eOSDfU_A-cS-cJGaFbUlq1b4ytoozp1FHVgMGzaINwn9A8FKE3uZ8MT1cXlLoMdl_uSifcZc67EIz1XElq3gX0RIT34IKOBY9TjWAAI38Xg_Q8HhBaA8FXEeXKD0--FW0uFm6Ld9h_iIcBIlzvgvFUwV",)',
                  }}
                />
                {isMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                      <div className="py-1">
                        <Link
                          href="/profile/settings"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          <span className="material-symbols-outlined text-xl">
                            settings
                          </span>
                          設定
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
