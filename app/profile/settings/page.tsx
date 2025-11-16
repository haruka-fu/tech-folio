"use client";

export default function ProfileSettingsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F7F8FA]">
      <div className="flex h-full flex-1">
        <aside className="flex w-64 flex-col gap-8 border-r border-gray-200 bg-white p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-2 py-2">
              <span className="material-symbols-outlined text-3xl text-[#4A90E2]">
                terminal
              </span>
              <h1 className="text-xl font-bold leading-normal text-gray-900">
                TechFolio
              </h1>
            </div>
            <nav className="flex flex-col gap-2">
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-gray-500 transition-colors hover:bg-gray-100"
                href="#"
              >
                <span className="material-symbols-outlined">dashboard</span>
                <p>ダッシュボード</p>
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-gray-500 transition-colors hover:bg-gray-100"
                href="#"
              >
                <span className="material-symbols-outlined">folder</span>
                <p>ポートフォリオ</p>
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-gray-500 transition-colors hover:bg-gray-100"
                href="#"
              >
                <span className="material-symbols-outlined">person</span>
                <p>プロフィール</p>
              </a>
              <a
                className="flex items-center gap-3 rounded-lg bg-[#4A90E21A] px-3 py-2 text-sm font-medium leading-normal text-[#4A90E2]"
                href="#"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  settings
                </span>
                <p>アカウント設定</p>
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-gray-500 transition-colors hover:bg-gray-100"
                href="#"
              >
                <span className="material-symbols-outlined">article</span>
                <p>ブログ</p>
              </a>
            </nav>
          </div>
          <div className="mt-auto flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <div
                className="size-10 aspect-square rounded-full bg-cover bg-center bg-no-repeat"
                aria-hidden
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXkeTZJsoPgLq4f6ZgyLHe8RooizW1j6YPTrxe32KPIYA0kA7PTcDcQFZ6Z93JZrmIPtO9L5mc5GTVl5ftUSnKnxdik8E0z3R5Ezoqftrnxx_EKg2OpG_Xxan8ZO2v7yF3Jn2NI5yF1b5XgedgcZJbG47s6vJSfcx19eMv1o68xhNx1w1PXFKcPub90TDW--CS8VLMgDJZoLTLraQ3o3RpQn4jY26MJt82wcNoa6gJLn8a1stMb2zLN49ePuUQPwmcTIZRDHSDsLc-")',
                }}
              />
              <div className="flex flex-col">
                <h2 className="text-base font-medium leading-normal text-gray-900">
                  Taro Yamada
                </h2>
                <p className="text-sm font-normal leading-normal text-gray-500">
                  Web Developer
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex flex-1 flex-col p-6 md:p-10">
          <div className="mx-auto w-full max-w-4xl">
            <header className="mb-8">
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900">
                プロフィール編集
              </h1>
              <p className="mt-2 text-base font-normal leading-normal text-gray-500">
                あなたの公開プロフィール情報を管理・編集します。
              </p>
            </header>

            <div className="flex flex-col gap-8">
              <section className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    基本情報
                  </h2>
                </div>
                <div className="flex w-full flex-col gap-4 md:flex-row md:items-center justify-between border-b pb-6">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div
                        className="w-24 h-24 rounded-full bg-cover bg-center bg-no-repeat"
                        data-alt="Current user avatar"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuALBBk5aiS4OHraQtT063jnzpCgcohWFAUYwHN9REUW5KR1CPjrm_aJCPHR7LqcR2bz5gFtHof2TO-yRvanIliJYuhtCQWTQgrlmuSOLI1DA6DvHmuZqucUq4eT8xQIcnY5kUll0AtqMvUksxI6-MsSHg8YX-VmNWkJ7y-KhYc2U6iTLNOEoWZoz2kJgPp_Cy7o8qhgOpS90OTGa9rPEn9nBKfOkZqqFDIxhiik9cSxUYb5qpKtoIwd9PAUjRShjWEjZfVU_D9mpTEM")',
                        }}
                      />
                      <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#4A90E2] text-white hover:bg-[#4A90E2]/90 transition-colors">
                        <span className="material-symbols-outlined text-base">
                          edit
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-900 text-lg font-bold leading-tight">
                        アバター
                      </p>
                      <p className="text-gray-500 text-sm font-normal leading-normal mt-1">
                        推奨: 400x400px, PNG or JPG
                      </p>
                    </div>
                  </div>
                </div>
                <form className="grid grid-cols-1 gap-y-6 pt-6">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="grow">
                      <label
                        className="text-gray-800 text-base font-medium leading-normal pb-2 block"
                        htmlFor="display-name"
                      >
                        表示名
                      </label>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                        id="display-name"
                        type="text"
                        defaultValue="Taro Yamada"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="grow">
                      <label
                        className="text-gray-800 text-base font-medium leading-normal pb-2 block"
                        htmlFor="username"
                      >
                        ユーザー名
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500">@</span>
                        </div>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 pl-7 text-base font-normal leading-normal"
                          id="username"
                          type="text"
                          defaultValue="taro-yamada"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        4〜20文字の英数字で入力してください。ユーザー名は月に1回のみ変更可能です。
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="grow">
                      <label
                        className="text-gray-800 text-base font-medium leading-normal pb-2 block"
                        htmlFor="job-title"
                      >
                        職種
                      </label>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                        id="job-title"
                        type="text"
                        defaultValue="Web Developer"
                      />
                    </div>
                    <div className="flex flex-col gap-2 pt-2 md:pt-8">
                      <p className="text-gray-500 text-sm font-medium">
                        公開設定
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">
                          非公開
                        </span>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            checked
                            type="checkbox"
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-[#4A90E2] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </label>
                        <span className="text-sm font-medium text-gray-600">
                          公開
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="grow">
                      <label
                        className="text-gray-800 text-base font-medium leading-normal pb-2 block"
                        htmlFor="bio"
                      >
                        自己紹介
                      </label>
                      <textarea
                        className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
                        id="bio"
                        rows={4}
                        defaultValue="フロントエンド開発を中心に、ユーザーにとって使いやすいUI/UXを追求しています。趣味はキャンプと写真です。"
                      />
                    </div>
                    <div className="flex flex-col gap-2 pt-2 md:pt-8">
                      <p className="text-gray-500 text-sm font-medium">
                        公開設定
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">
                          非公開
                        </span>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            checked
                            type="checkbox"
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-[#4A90E2] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </label>
                        <span className="text-sm font-medium text-gray-600">
                          公開
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    SNS・外部リンク
                  </h2>
                  <div className="flex flex-col gap-2 items-end">
                    <p className="text-gray-500 text-sm font-medium">
                      公開設定
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        非公開
                      </span>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          checked
                          type="checkbox"
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-[#4A90E2] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                      </label>
                      <span className="text-sm font-medium text-gray-600">
                        公開
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                      </svg>
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                      placeholder="Username"
                      type="text"
                      defaultValue="taro_dev"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                      <svg
                        className="h-6 w-6 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                      </svg>
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                      placeholder="Username"
                      type="text"
                      defaultValue="yamada-taro"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                      <svg
                        className="h-6 w-6 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M211.49,37.36a8,8,0,0,0-10.74,2.2L128,143.43,55.25,39.56a8,8,0,0,0-13-1.71L19.5,69.56a8,8,0,0,0,1.71,13l89.17,89.17a8,8,0,0,0,11.32,0L211.86,82.56a8,8,0,0,0,1.71-13l-22.75-31.7A8,8,0,0,0,211.49,37.36ZM128,158.34,51.31,81.65l16-22.29L128,126.57l60.69-67.21,16,22.29Z"></path>
                      </svg>
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                      placeholder="Username"
                      type="text"
                    />
                  </div>
                </div>
              </section>

              <div className="flex flex-col-reverse items-center justify-end gap-3 pt-4 sm:flex-row">
                <button className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-white border border-gray-300 text-gray-700 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 transition-colors">
                  <span className="truncate">キャンセル</span>
                </button>
                <button className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-[#4A90E2] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#4A90E2]/90 transition-colors">
                  <span className="truncate">変更を保存</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
