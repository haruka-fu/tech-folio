import Link from "next/link";

export default function DemoModeBanner() {
  return (
    <div className="rounded-lg border border-[#f59e0b] bg-[#fffbeb] p-4">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-2xl text-[#f59e0b]">
          info
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[#92400e]">
            デモモードで表示中
          </h3>
          <p className="mt-1 text-sm text-[#78350f]">
            これはサンプルデータです。実際のプロジェクトを管理するには、ログインしてください。
          </p>
          <Link
            href="/login"
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#f59e0b] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#d97706]"
          >
            <span className="material-symbols-outlined text-lg">login</span>
            ログインして始める
          </Link>
        </div>
      </div>
    </div>
  );
}
