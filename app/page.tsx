"use client";import { useState, useEffect } from "react";import Link from "next/link";import { createClient } from "@/lib/supabase/client";const supabase = createClient();export default function HomePage() {  const [isLoggedIn, setIsLoggedIn] = useState(false);  const [isLoading, setIsLoading] = useState(true);  useEffect(() => {    const checkAuth = async () => {      try {        const { data: { user } } = await supabase.auth.getUser();        setIsLoggedIn(!!user);      } catch (error) {        console.error("Auth check error:", error);      } finally {        setIsLoading(false);      }    };    checkAuth();  }, []);
  return (
    <div className="mx-auto max-w-6xl">
      {/* ヒーローセクション */}
      <section className="mb-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="size-24 text-[#2b6cee]">
            <svg
              aria-hidden="true"
              className="text-[#2b6cee]"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.38 2.22c-2.33-1.04-5.1-.34-6.6 1.77-1.13 1.59-.8 3.7.69 4.85 1.15.89 2.69 1.15 4.09.73l2.81 3.65-4.2 4.14-3.72-3.66a1.003 1.003 0 0 0-1.42 1.42l4.42 4.36c.39.39 1.02.39 1.41 0l4.9-4.83c.2-.2.33-.45.39-.73H17a3 3 0 0 0 3-3V6c0-1.65-1.35-3-3-3h-3.3c-.22 0-.44-.06-.62-.18zM17 10h-3.23c.53.53.86 1.25.86 2.05 0 1.63-1.32 2.95-2.95 2.95S8.73 13.68 8.73 12.05c0-.8.33-1.52.86-2.05H8.73A3.009 3.009 0 0 0 5.78 12.8l2.92 2.87c.39.39 1.02.39 1.41 0l3.19-3.15c.35-.35.56-.83.56-1.36V6.05c.86.66 1.43 1.73 1.43 2.95V10z" />
            </svg>
          </div>
        </div>
        <h1 className="mb-4 text-5xl font-black text-[#1f2937]">
          Tech Folio
        </h1>
        <p className="mb-8 text-xl text-[#6b7280]">
          あなたのプロジェクトとスキルを一元管理する
          <br />
          ポートフォリオダッシュボード
        </p>
        <div className="flex justify-center gap-4">
          {!isLoggedIn && (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2b6cee] px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#2357c9] hover:shadow-xl"
            >
              <span className="material-symbols-outlined text-xl">login</span>
              ログインして始める
            </Link>
          )}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-8 py-3 text-base font-semibold text-[#1f2937] shadow transition-all hover:bg-gray-50 hover:shadow-md"
          >
            <span className="material-symbols-outlined text-xl">
              {isLoggedIn ? "folder_open" : "visibility"}
            </span>
            {isLoggedIn ? "アクティビティ" : "デモを見る"}
          </Link>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="mb-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-[#1f2937]">
          主な機能
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {/* 機能1: プロジェクト管理 */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow transition-all hover:shadow-lg">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[#eff6ff]">
              <span className="material-symbols-outlined text-3xl text-[#2b6cee]">
                folder_open
              </span>
            </div>
            <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
              プロジェクト管理
            </h3>
            <p className="text-[#6b7280]">
              あなたの技術プロジェクトを一箇所に集約。使用技術、成果物、期間などを詳細に記録できます。
            </p>
          </div>

          {/* 機能2: スキル可視化 */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow transition-all hover:shadow-lg">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[#f0fdf4]">
              <span className="material-symbols-outlined text-3xl text-[#10b981]">
                analytics
              </span>
            </div>
            <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
              スキル可視化
            </h3>
            <p className="text-[#6b7280]">
              プロジェクトから自動的にスキルセットを抽出。あなたの技術的な強みを効果的にアピールできます。
            </p>
          </div>

          {/* 機能3: シンプルな管理 */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow transition-all hover:shadow-lg">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[#fef3c7]">
              <span className="material-symbols-outlined text-3xl text-[#f59e0b]">
                edit_note
              </span>
            </div>
            <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
              シンプルな管理
            </h3>
            <p className="text-[#6b7280]">
              直感的なインターフェースで、技術的な経験を簡単に記録。いつでもすぐに更新できます。
            </p>
          </div>
        </div>
      </section>


      {/* 使い方の流れセクション */}
      <section className="mb-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-[#1f2937]">
          使い方は簡単3ステップ
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {/* ステップ1 */}
          <div className="relative">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2b6cee] to-[#1e40af] text-2xl font-bold text-white shadow-lg">
              1
            </div>
            <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
              Googleでログイン
            </h3>
            <p className="text-[#6b7280]">
              面倒な登録は不要。Googleアカウントで数秒でログインできます。
            </p>
          </div>

          {/* ステップ2 */}
          <div className="relative">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] text-2xl font-bold text-white shadow-lg">
              2
            </div>
            <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
              プロジェクトを登録
            </h3>
            <p className="text-[#6b7280]">
              過去のプロジェクトや学習内容を追加。技術スタック、成果物、期間を記録します。
            </p>
          </div>

          {/* ステップ3 */}
          <div className="relative">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-2xl font-bold text-white shadow-lg">
              3
            </div>
            <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
              スキルを可視化
            </h3>
            <p className="text-[#6b7280]">
              ダッシュボードで実績を確認。あなたの技術力を一目で把握できます。
            </p>
          </div>
        </div>
      </section>
      {/* ユースケースセクション */}
      <section className="mb-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-[#1f2937]">
          こんな方におすすめ
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow">
            <span className="material-symbols-outlined text-4xl text-[#2b6cee]">
              person
            </span>
            <div>
              <h3 className="mb-2 text-lg font-bold text-[#1f2937]">
                個人エンジニア
              </h3>
              <p className="text-sm text-[#6b7280]">
                個人開発やサイドプロジェクトの実績を整理して、転職活動や案件獲得に活用したい方
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow">
            <span className="material-symbols-outlined text-4xl text-[#10b981]">
              school
            </span>
            <div>
              <h3 className="mb-2 text-lg font-bold text-[#1f2937]">
                学習者
              </h3>
              <p className="text-sm text-[#6b7280]">
                学習した技術や作成したプロジェクトを記録し、自身の成長を可視化したい方
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow">
            <span className="material-symbols-outlined text-4xl text-[#f59e0b]">
              trending_up
            </span>
            <div>
              <h3 className="mb-2 text-lg font-bold text-[#1f2937]">
                フリーランス
              </h3>
              <p className="text-sm text-[#6b7280]">
                過去の案件実績を整理して、クライアントへの提案資料を素早く作成したい方
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow">
            <span className="material-symbols-outlined text-4xl text-[#8b5cf6]">
              workspace_premium
            </span>
            <div>
              <h3 className="mb-2 text-lg font-bold text-[#1f2937]">
                キャリアアップ志向
              </h3>
              <p className="text-sm text-[#6b7280]">
                技術的な実績を体系的に管理し、キャリアの棚卸しをしたい方
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      {!isLoggedIn ? (
        <section className="mb-8 rounded-2xl bg-gradient-to-br from-[#2b6cee] to-[#1e40af] p-12 text-center text-white shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">
            今すぐ始めましょう
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Googleアカウントで簡単にログインできます
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-base font-semibold text-[#2b6cee] shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
          >
            <span className="material-symbols-outlined text-xl">login</span>
            無料で始める
          </Link>
        </section>
      ) : (
        <section className="mb-8 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] p-12 text-center text-white shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">
            プロジェクトを管理しましょう
          </h2>
          <p className="mb-8 text-lg opacity-90">
            あなたの技術実績を記録して、スキルを可視化しましょう
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-base font-semibold text-[#10b981] shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
          >
            <span className="material-symbols-outlined text-xl">folder_open</span>
            アクティビティを見る
          </Link>
        </section>
      )}
    </div>
  );
}
