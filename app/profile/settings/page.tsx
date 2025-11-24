"use client";

import { useState } from "react";
import Link from "next/link";
import QiitaIntegration from "./_components/QiitaIntegration";
import { useAuth } from "@/lib/hooks/useAuth";

type SettingsTab = "profile" | "qiita";

export default function ProfileSettingsPage() {
  const { profile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F7F8FA]">
      <div className="flex h-full flex-1">
        <aside className="flex w-64 flex-col gap-8 border-r border-gray-200 bg-white p-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 px-2 py-2">
              <span className="material-symbols-outlined text-3xl text-[#2b6cee]">
                folder_special
              </span>
              <h1 className="text-xl font-bold leading-normal text-gray-900">
                TechFolio
              </h1>
            </Link>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal transition-colors text-left ${
                  activeTab === "profile"
                    ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={
                    activeTab === "profile"
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  person
                </span>
                <p>プロフィール設定</p>
              </button>
              <button
                onClick={() => setActiveTab("qiita")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal transition-colors text-left ${
                  activeTab === "qiita"
                    ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={
                    activeTab === "qiita"
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  link
                </span>
                <p>Qiita連携</p>
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex flex-1 flex-col p-6 md:p-10">
          <div className="mx-auto w-full max-w-4xl">
            {activeTab === "profile" && (
              <>
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
                      {profile?.avatar_url ? (
                        <div
                          className="w-24 h-24 rounded-full bg-cover bg-center bg-no-repeat"
                          data-alt="Current user avatar"
                          style={{
                            backgroundImage: `url("${profile.avatar_url}")`,
                          }}
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center">
                          <span className="material-symbols-outlined text-4xl text-slate-500">
                            person
                          </span>
                        </div>
                      )}
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
                        defaultValue={profile?.display_name || ""}
                        placeholder="表示名を入力"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div>
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
                        defaultValue={profile?.bio || ""}
                        placeholder="自己紹介を入力"
                      />
                    </div>
                  </div>
                </form>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    SNS・外部リンク
                  </h2>
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
                      placeholder="https://x.com/username"
                      type="url"
                      defaultValue={profile?.twitter_url || ""}
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
                      placeholder="https://github.com/username"
                      type="url"
                      defaultValue={profile?.github_url || ""}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                      <span className="material-symbols-outlined text-gray-600">
                        article
                      </span>
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                      placeholder="https://qiita.com/username"
                      type="url"
                      defaultValue={profile?.qiita_url || ""}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                      <span className="material-symbols-outlined text-gray-600">
                        link
                      </span>
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                      placeholder="https://example.com"
                      type="url"
                      defaultValue={profile?.other_url || ""}
                    />
                  </div>
                </div>
              </section>

                <div className="flex flex-col-reverse items-center justify-end gap-3 pt-4 sm:flex-row">
                  <button className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-white border border-gray-300 text-gray-700 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 transition-colors">
                    <span className="truncate">キャンセル</span>
                  </button>
                  <button className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-[#2b6cee] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2b6cee]/90 transition-colors">
                    <span className="truncate">変更を保存</span>
                  </button>
                </div>
              </div>
              </>
            )}

            {activeTab === "qiita" && <QiitaIntegration />}
          </div>
        </main>
      </div>
    </div>
  );
}
