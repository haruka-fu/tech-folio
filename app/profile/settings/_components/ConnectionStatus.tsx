interface ConnectionStatusProps {
  isLoading: boolean;
  hasToken: boolean;
  username: string | null;
  isSaving: boolean;
  onDisconnect: () => void;
}

export default function ConnectionStatus({
  isLoading,
  hasToken,
  username,
  isSaving,
  onDisconnect,
}: ConnectionStatusProps) {
  return (
    <section className="card">
      <h2 className="border-b border-[#e5e7eb] pb-4 text-lg font-semibold leading-tight text-[#1f2937]">
        連携ステータス
      </h2>
      <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
        {isLoading ? (
          <div className="flex items-center gap-4">
            <div className="spinner"></div>
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : hasToken ? (
          <>
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <span className="material-symbols-outlined text-3xl">
                  check_circle
                </span>
              </div>
              <div>
                <p className="text-base font-medium leading-normal text-[#1f2937]">
                  連携済み
                </p>
                <p className="text-sm text-[#6b7280]">
                  Qiita ID: @{username || "不明"}
                </p>
              </div>
            </div>
            <div className="w-full shrink-0 sm:w-auto">
              <button
                onClick={onDisconnect}
                disabled={isSaving}
                className="flex h-10 w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-red-300 bg-red-50 px-4 text-sm font-medium leading-normal text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                <span className="truncate">
                  {isSaving ? "処理中..." : "連携を解除する"}
                </span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <span className="material-symbols-outlined text-3xl">
                  link_off
                </span>
              </div>
              <div>
                <p className="text-base font-medium leading-normal text-[#1f2937]">
                  未連携
                </p>
                <p className="text-sm text-[#6b7280]">
                  Qiitaアカウントを連携してください
                </p>
              </div>
            </div>

            {/* OAuth連携ボタン */}
            <a
              href="/api/qiita/auth"
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#55c500] px-6 text-base font-medium text-white transition-colors hover:bg-[#4ab000]"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              Qiitaアカウントで連携する
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
