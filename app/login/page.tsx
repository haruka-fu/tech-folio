"use client";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col overflow-x-hidden bg-[#f8f9fa] font-sans">
      <div className="flex h-full flex-1 flex-col">
        <div className="pt-4" />

        <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:py-16">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                ポートフォリオ管理を、
                <br />
                シンプルに。
              </h1>
              <p className="mt-4 text-center text-base text-gray-600">
                パスワード不要で安全にログインできます。
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="space-y-6">
                <h2 className="text-center text-xl font-bold text-gray-900">
                  ログイン
                </h2>
                <div className="flex flex-col gap-3">
                  <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-gray-100 px-4 text-sm font-bold text-gray-800 transition-colors hover:bg-gray-200">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.578 12.285c0-.85-.075-1.68-.22-2.482H12.01v4.68h5.92c-.26 1.503-1.025 2.78-2.316 3.65v3.027h3.877c2.27-2.09 3.585-5.18 3.585-8.875Z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M12.01 23c3.24 0 5.953-1.07 7.936-2.9l-3.877-3.027c-1.08.72-2.45.11-3.64.11-2.79 0-5.16-1.88-6.006-4.39H2.07v3.12C4.028 19.94,7.74 23,12.01 23Z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M5.996 14.288a6.54 6.54 0 0 1 0-4.57V6.598H2.07c-1.15 2.27-1.15 5.08 0 7.35l3.926-3.12Z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M12.01 5.38c1.65 0 3.06.57 4.2 1.69l3.43-3.43C17.954 1.76,15.25 0,12.01 0 7.74 0 4.028 3.06 2.07 7.12l3.926 3.12c.85-2.5 3.22-4.39 6.014-4.39Z"
                        fill="#EA4335"
                      ></path>
                    </svg>
                    <span className="truncate">Googleで続ける</span>
                  </button>
                  <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-gray-100 px-4 text-sm font-bold text-gray-800 transition-colors hover:bg-gray-200">
                    <svg
                      className="h-5 w-5 text-gray-800"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                    <span className="truncate">GitHubで続ける</span>
                  </button>
                </div>
              </div>

              <div className="my-6 flex items-center">
                <hr className="w-full border-t border-gray-200" />
                <span className="px-2 text-xs font-medium text-gray-500">
                  OR
                </span>
                <hr className="w-full border-t border-gray-200" />
              </div>

              <div className="space-y-4">
                <h2 className="text-center text-xl font-bold text-gray-900">
                  ようこそ
                </h2>
                <p className="text-center text-sm text-gray-600">
                  利用を開始するためにユーザー名を設定してください。
                </p>
                <div>
                  <label htmlFor="username" className="sr-only">
                    ユーザー名
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400">
                        person
                      </span>
                    </span>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="ユーザー名"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-3 py-2 text-sm text-gray-900 focus:border-[#2b6cee] focus:outline-none focus:ring-2 focus:ring-[#2b6cee]"
                    />
                  </div>
                </div>
                <button className="flex h-12 w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#2b6cee] px-5 text-base font-bold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-[#245bcc] focus:outline-none focus:ring-2 focus:ring-[#2b6cee] focus:ring-offset-2">
                  <span className="truncate">登録して始める</span>
                </button>
              </div>
            </div>
          </div>

          <footer className="mt-12 text-center">
            <p className="text-xs text-gray-500">
              <a href="#" className="hover:underline">
                利用規約
              </a>
              {" ・ "}
              <a href="#" className="hover:underline">
                プライバシーポリシー
              </a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
