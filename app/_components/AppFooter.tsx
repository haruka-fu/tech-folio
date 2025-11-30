import Link from "next/link";

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e7eb] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* ブランド情報 */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#2b6cee]">
              dashboard
            </span>
            <span className="text-lg font-bold text-[#1f2937]">
              Tech Folio
            </span>
          </div>

          {/* ナビゲーション */}
          <div className="flex gap-6 text-sm text-[#6b7280]">
            <Link
              href="/projects"
              className="transition-colors hover:text-[#2b6cee]"
            >
              アクティビティ
            </Link>
            <Link
              href="/profile"
              className="transition-colors hover:text-[#2b6cee]"
            >
              スキル一覧
            </Link>
          </div>

          {/* コピーライト */}
          <div className="text-sm text-[#6b7280]">
            &copy; {currentYear} Tech Folio
          </div>
        </div>
      </div>
    </footer>
  );
}
