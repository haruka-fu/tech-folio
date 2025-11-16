"use client";

import { useState } from "react";

type ViewMode = "profile" | "dashboard";

export default function ProfilePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("profile");

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <div className="pt-4" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ビューモード切り替えボタン */}
        <div className="mb-6 flex items-center justify-between">
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-600 sm:flex">
            <button
              type="button"
              onClick={() => setViewMode("profile")}
              className={`rounded-full px-3 py-1 transition ${
                viewMode === "profile"
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-200"
              }`}
            >
              プロフィール
            </button>
            <button
              type="button"
              onClick={() => setViewMode("dashboard")}
              className={`rounded-full px-3 py-1 transition ${
                viewMode === "dashboard"
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-200"
              }`}
            >
              ダッシュボード
            </button>
          </div>
        </div>

        {viewMode === "profile" ? <ProfileView /> : <DashboardView />}
      </main>
    </div>
  );
}

function ProfileView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1 flex flex-col gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-20 h-20 shrink-0"
              data-alt="User avatar image of Taro Yamada"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjRibWRXMrRAeffJBSYqrUvPBepXfAcL__fSwR60eoWjPbC_NmicCUhm3uPqMJE9BbGwOJGw8n7VtbYx39CQzEvxR7jIfHap8zbdjh8Agulk9W2--ldTL5eOSDfU_A-cS-cJGaFbUlq1b4ytoozp1FHVgMGzaINwn9A8FKE3uZ8MT1cXlLoMdl_uSifcZc67EIz1XElq3gX0RIT34IKOBY9TjWAAI38Xg_Q8HhBaA8FXEeXKD0--FW0uFm6Ld9h_iIcBIlzvgvFUwV")',
              }}
            />
            <div className="flex flex-col">
              <p className="text-slate-900 text-2xl font-bold leading-tight tracking-[-0.015em]">
                山田 太郎
              </p>
              <p className="text-slate-500 text-sm font-normal leading-normal">
                @yamada_taro
              </p>
            </div>
          </div>
          <p className="text-slate-900 text-base font-medium leading-normal mb-1">
            職種
          </p>
          <p className="text-[#2b6cee] text-base font-medium leading-normal mb-4">
            ソフトウェアエンジニア
          </p>
          <p className="text-slate-900 text-base font-medium leading-normal mb-1">
            自己紹介
          </p>
          <p className="text-slate-600 text-base font-normal leading-relaxed mb-6">
            フロントエンド開発と直感的なユーザー体験の構築に重点を置く、情熱的なソフトウェアエンジニア。React、TypeScript、および最新のWeb技術を専門としています。
          </p>
          <p className="text-slate-900 text-base font-medium leading-normal mb-3">
            SNSリンク
          </p>
          <div className="flex flex-wrap justify-start gap-4">
            <a
              className="flex flex-col items-center justify-center gap-2 text-center w-20 group"
              href="#"
            >
              <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200">
                <svg
                  className="size-6 text-slate-700 group-hover:text-[#2b6cee]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </div>
              <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                GitHub
              </p>
            </a>
            <a
              className="flex flex-col items-center justify-center gap-2 text-center w-20 group"
              href="#"
            >
              <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200">
                <svg
                  className="size-6 text-slate-700 group-hover:text-[#2b6cee]"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.602.75Zm-1.282 13.025h1.426L3.926 2.165H2.468l8.85 11.61Z"></path>
                </svg>
              </div>
              <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                X
              </p>
            </a>
            <a
              className="flex flex-col items-center justify-center gap-2 text-center w-20 group"
              href="#"
            >
              <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200">
                <svg
                  className="size-6 text-slate-700 group-hover:text-[#2b6cee]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3v9Zm-1.5-10.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.94 0-1.62.61-1.62 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.38 1.02 3.38 4.54V19Z"></path>
                </svg>
              </div>
              <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                LinkedIn
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 flex flex-col gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-[-0.015em] pb-1">
            スキルサマリー
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            ポートフォリオ内のプロジェクト全体での技術タグの使用頻度です。
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <p className="text-slate-600 font-medium text-sm w-24 shrink-0">
                React
              </p>
              <div className="flex-1 bg-slate-100 rounded-full h-8 relative">
                <div
                  className="bg-[#2b6cee] h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: "93.75%" }}
                >
                  <span className="text-white text-sm font-bold">15</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <p className="text-slate-600 font-medium text-sm w-24 shrink-0">
                Python
              </p>
              <div className="flex-1 bg-slate-100 rounded-full h-8 relative">
                <div
                  className="bg-[#2b6cee] h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: "75%" }}
                >
                  <span className="text-white text-sm font-bold">12</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <p className="text-slate-600 font-medium text-sm w-24 shrink-0">
                AWS
              </p>
              <div className="flex-1 bg-slate-100 rounded-full h-8 relative">
                <div
                  className="bg-[#2b6cee] h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: "62.5%" }}
                >
                  <span className="text-white text-sm font-bold">10</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <p className="text-slate-600 font-medium text-sm w-24 shrink-0">
                TypeScript
              </p>
              <div className="flex-1 bg-slate-100 rounded-full h-8 relative">
                <div
                  className="bg-[#2b6cee]/80 h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: "56.25%" }}
                >
                  <span className="text-white text-sm font-bold">9</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <p className="text-slate-600 font-medium text-sm w-24 shrink-0">
                Node.js
              </p>
              <div className="flex-1 bg-slate-100 rounded-full h-8 relative">
                <div
                  className="bg-[#2b6cee]/80 h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: "50%" }}
                >
                  <span className="text-white text-sm font-bold">8</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <p className="text-slate-600 font-medium text-sm w-24 shrink-0">
                Figma
              </p>
              <div className="flex-1 bg-slate-100 rounded-full h-8 relative">
                <div
                  className="bg-[#2b6cee]/60 h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: "37.5%" }}
                >
                  <span className="text-white text-sm font-bold">6</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <p className="text-slate-600 font-medium text-sm w-24 shrink-0">
                Docker
              </p>
              <div className="flex-1 bg-slate-100 rounded-full h-8 relative">
                <div
                  className="bg-[#2b6cee]/60 h-full rounded-full flex items-center justify-end pr-3"
                  style={{ width: "31.25%" }}
                >
                  <span className="text-white text-sm font-bold">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardView() {
  const skillsData = [
    { label: "Next.js", value: 12 },
    { label: "AWS", value: 10 },
    { label: "TypeScript", value: 9 },
    { label: "Node.js", value: 8 },
    { label: "Figma", value: 6 },
    { label: "Docker", value: 5 },
    { label: "React", value: 15 },
    { label: "Python", value: 12 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-slate-900 sm:text-4xl">
            ダッシュボード
          </h1>
          <p className="text-sm text-slate-600">
            スキルごとの案件数を棒グラフで一覧表示します。
          </p>
        </div>
      </div>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-900">
          スキル実績サマリー
        </h2>
        <p className="text-sm text-slate-600">
          ポートフォリオ内のプロジェクト全体での技術タグの使用頻度を棒グラフで表示します。
        </p>
        <div className="mt-6 space-y-4">
          {skillsData.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <p className="w-24 shrink-0 text-sm font-medium text-slate-600">
                {item.label}
              </p>
              <div className="relative h-8 flex-1 rounded bg-slate-100">
                <div
                  className="flex h-full items-center justify-end rounded bg-[#2b6cee] px-3 text-sm font-bold text-white"
                  style={{ width: `${(item.value / 15) * 100}%` }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-900">
          直近のプロジェクト
        </h2>
        <p className="text-sm text-slate-600">
          最近参画した案件と使用技術の概要です。
        </p>
        <div className="mt-4 space-y-3">
          {[
            {
              name: "SaaS管理ダッシュボード",
              tech: "Next.js / TypeScript / Tailwind CSS",
            },
            {
              name: "社内ナレッジポータル",
              tech: "React / Supabase / Chakra UI",
            },
            {
              name: "マーケティングLP改善",
              tech: "Next.js / Vercel / Google Analytics",
            },
          ].map((project) => (
            <div
              key={project.name}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {project.name}
                </p>
                <p className="text-xs text-slate-500">{project.tech}</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">
                chevron_right
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
