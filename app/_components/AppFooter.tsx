import Link from "next/link";

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e7eb] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* ブランド情報 */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl text-[#2b6cee]">
                dashboard
              </span>
              <span className="text-lg font-bold text-[#1f2937]">
                Tech Folio
              </span>
            </div>
            <p className="text-sm text-[#6b7280]">
              あなたのプロジェクトと
              <br />
              スキルを一元管理する
              <br />
              ポートフォリオダッシュボード
            </p>
          </div>

          {/* 製品 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#1f2937]">
              製品
            </h3>
            <ul className="space-y-3 text-sm text-[#6b7280]">
              <li>
                <Link
                  href="/projects"
                  className="transition-colors hover:text-[#2b6cee]"
                >
                  プロジェクト一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-[#2b6cee]"
                >
                  ダッシュボード
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="transition-colors hover:text-[#2b6cee]"
                >
                  スキル管理
                </Link>
              </li>
            </ul>
          </div>

          {/* リソース */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#1f2937]">
              リソース
            </h3>
            <ul className="space-y-3 text-sm text-[#6b7280]">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[#2b6cee]"
                >
                  ドキュメント
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[#2b6cee]"
                >
                  使い方ガイド
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[#2b6cee]"
                >
                  よくある質問
                </a>
              </li>
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#1f2937]">
              サポート
            </h3>
            <ul className="space-y-3 text-sm text-[#6b7280]">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[#2b6cee]"
                >
                  お問い合わせ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[#2b6cee]"
                >
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[#2b6cee]"
                >
                  利用規約
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 border-t border-[#e5e7eb] pt-8 text-center text-sm text-[#6b7280]">
          &copy; {currentYear} Tech Folio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
