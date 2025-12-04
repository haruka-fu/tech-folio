"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase";

const supabase = createClient();

export default function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 現在のパスを取得

  // プロフィール情報を取得する関数
  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsLoggedIn(false);
        setProfile(null);
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
        setIsLoggedIn(true);
      } else {
        // ユーザーは認証済みだがプロフィールが未作成
        setIsLoggedIn(false);
        setProfile(null);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      setIsLoggedIn(false);
      setProfile(null);
    }
  };

  // 初回ロードと認証状態の変更を監視
  useEffect(() => {
    // 初回ロード
    loadProfile();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        loadProfile();
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setProfile(null);
      }
    });

    // クリーンアップ
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ページ遷移のたびにログイン状態をチェック
  useEffect(() => {
    loadProfile();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setProfile(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* フローティング新規プロジェクト追加ボタン（1200px未満、ログイン時のみ） */}
      {isLoggedIn && (
        <Link
          href="/projects/new"
          className="fixed bottom-6 left-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#2b6cee] text-white shadow-lg transition-all hover:bg-[#2357c9] laptop:hidden btn-glow"
          aria-label="新規プロジェクト追加"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </Link>
      )}

      <header className="sticky top-0 z-20 border-b border-[#e5e7eb] bg-white/80 backdrop-blur-sm slide-in-up">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* 左側：ロゴ */}
            <div className="flex items-center gap-4 w-[284px] laptop:ml-0 ml-16">
              <Link href="/" className="flex items-center gap-3 text-[#1f2937] hover-scale">
                <div className="size-6 text-[#2b6cee] hover-scale">
                  <svg
                    aria-hidden
                    className="text-[#2b6cee]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.38 2.22c-2.33-1.04-5.1-.34-6.6 1.77-1.13 1.59-.8 3.7.69 4.85 1.15.89 2.69 1.15 4.09.73l2.81 3.65-4.2 4.14-3.72-3.66a1.003 1.003 0 0 0-1.42 1.42l4.42 4.36c.39.39 1.02.39 1.41 0l4.9-4.83c.2-.2.33-.45.39-.73H17a3 3 0 0 0 3-3V6c0-1.65-1.35-3-3-3h-3.3c-.22 0-.44-.06-.62-.18zM17 10h-3.23c.53.53.86 1.25.86 2.05 0 1.63-1.32 2.95-2.95 2.95S8.73 13.68 8.73 12.05c0-.8.33-1.52.86-2.05H8.73A3.009 3.009 0 0 0 5.78 12.8l2.92 2.87c.39.39 1.02.39 1.41 0l3.19-3.15c.35-.35.56-.83.56-1.36V6.05c.86.66 1.43 1.73 1.43 2.95V10z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold">TechFolio</h2>
              </Link>
            </div>
            {/* 中央：ナビゲーション（860px以上で表示） */}
            <div className="hidden flex-1 items-center justify-center gap-6 text-base text-[#6b7280] tablet:flex">
              <Link href="/projects" className="underline-center transition-colors hover:text-[#111827]">
                アクティビティ
              </Link>
              <Link href="/profile" className="underline-center transition-colors hover:text-[#111827]">
                スキル一覧
              </Link>
            </div>
            {/* 右側：ボタン */}
            <div className="flex items-center gap-3 w-[284px] justify-end">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/projects/new"
                    className="hidden h-10 min-w-[84px] items-center justify-center rounded-lg bg-[#2b6cee] px-4 text-sm font-bold text-white laptop:flex btn-shimmer btn-glow"
                  >
                    新規プロジェクト追加
                  </Link>
                  <div className="relative shrink-0">
                    {profile?.avatar_url ? (
                      <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="size-10 aspect-square cursor-pointer rounded-full bg-cover bg-center bg-no-repeat border-2 border-slate-300 transition-all hover:border-[#2b6cee] hover-scale"
                        style={{
                          backgroundImage: `url("${profile.avatar_url}")`,
                        }}
                      />
                    ) : (
                      <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="size-10 aspect-square cursor-pointer rounded-full bg-slate-200 border-2 border-slate-300 transition-all hover:border-[#2b6cee] hover-scale flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-slate-500">
                          person
                        </span>
                      </button>
                    )}
                    {isMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setIsMenuOpen(false)}
                        />
                        <div className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg scale-in">
                          <div className="py-1">
                            {/* ナビゲーションリンク（860px以下で表示） */}
                            <Link
                              href="/projects"
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors tablet:hidden"
                            >
                              <span className="material-symbols-outlined text-xl text-scale">
                                folder_open
                              </span>
                              アクティビティ
                            </Link>
                            <Link
                              href="/profile"
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors tablet:hidden"
                            >
                              <span className="material-symbols-outlined text-xl text-scale">
                                person
                              </span>
                              スキル一覧
                            </Link>
                            {/* 区切り線（860px以下で表示） */}
                            <div className="border-t border-slate-200 my-1 tablet:hidden" />
                            <Link
                              href="/projects/new"
                              onClick={() => setIsMenuOpen(false)}
                              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors laptop:hidden"
                            >
                              <span className="material-symbols-outlined text-xl text-scale">
                                add_circle
                              </span>
                              新規プロジェクト追加
                            </Link>
                            <Link
                              href="/profile/settings"
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                              <span className="material-symbols-outlined text-xl text-scale">
                                settings
                              </span>
                              設定
                            </Link>
                            <Link
                              href="/contact"
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                              <span className="material-symbols-outlined text-xl text-scale">
                                contact_support
                              </span>
                              お問い合わせ
                            </Link>
                            <button
                              onClick={() => {
                                setIsMenuOpen(false);
                                handleLogout();
                              }}
                              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                              <span className="material-symbols-outlined text-xl text-scale">
                                logout
                              </span>
                              ログアウト
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2b6cee] px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-[#2357c9]"
                >
                  <span className="material-symbols-outlined text-lg">login</span>
                  ログイン
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
