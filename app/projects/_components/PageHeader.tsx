import Link from "next/link";

interface PageHeaderProps {
  hasQiitaToken: boolean;
  qiitaLoading: boolean;
  isDemoMode: boolean;
}

export default function PageHeader({
  hasQiitaToken,
  qiitaLoading,
  isDemoMode,
}: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black leading-tight tracking-[-0.033em] text-[#1f2937] sm:text-3xl md:text-4xl">
          アクティビティ
        </h1>
        <p className="text-sm font-normal leading-normal text-[#6b7280] sm:text-base">
          プロジェクトとQiita記事を時系列で表示します。
        </p>
      </div>
      {!hasQiitaToken && !qiitaLoading && !isDemoMode && (
        <Link
          href="/profile/settings?tab=qiita"
          className="inline-flex items-center gap-2 rounded-lg bg-[#55c500] px-4 py-2 text-sm font-medium text-white hover:bg-[#4ab000] btn-shimmer btn-glow"
        >
          Qiitaと連携する
        </Link>
      )}
    </div>
  );
}
