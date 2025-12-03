"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  startGoogleOAuth,
  createProfile,
  createAuthProvider,
  verifyRegistration,
} from "@/lib/utils/auth";
import RegisterLogo from "./_components/RegisterLogo";
import ErrorMessage from "./_components/ErrorMessage";
import GoogleSignInButton from "./_components/GoogleSignInButton";
import ProfileForm from "./_components/ProfileForm";
import TermsFooter from "./_components/TermsFooter";

const supabase = createClient();

/**
 * 新規ユーザー登録ページ
 *
 * @description
 * 2段階の登録フローを提供します：
 * 1. Google OAuth認証
 * 2. 表示名の入力とプロフィール作成
 *
 * @flow
 * - 未認証: Google認証ボタンを表示
 * - 認証済み（プロフィール未作成）: 表示名入力フォームを表示
 * - 認証済み（プロフィール作成済み）: プロジェクト一覧にリダイレクト
 */
export default function RegisterPage() {
  // ========================================
  // State管理
  // ========================================

  /** 表示名の入力値 */
  const [displayName, setDisplayName] = useState("");

  /** ローディング状態 */
  const [isLoading, setIsLoading] = useState(false);

  /** エラーメッセージ */
  const [error, setError] = useState<string | null>(null);

  /** ユーザーが認証済みかどうか */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /** Next.jsルーター */
  const router = useRouter();

  // ========================================
  // 副作用：初期認証チェック
  // ========================================

  useEffect(() => {
    /**
     * ユーザーの認証状態とプロフィール存在をチェック
     */
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setIsAuthenticated(true);

        // プロフィールが既に存在するかチェック
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profile) {
          // プロフィールが既に存在する場合はプロジェクト一覧へリダイレクト
          router.push('/projects');
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [router]);

  // ========================================
  // イベントハンドラー
  // ========================================

  /**
   * Google認証ボタンクリック時の処理
   */
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await startGoogleOAuth();

    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error instanceof Error ? error.message : 'Google認証に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * プロフィール作成フォーム送信時の処理
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション: 表示名が空でないことを確認
    if (!displayName.trim()) {
      setError('表示名を入力してください');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // 現在のユーザー情報を取得
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('ログインしていません');
      }

      // プロフィールが既に存在しないか確認
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingProfile) {
        router.push('/projects');
        return;
      }

      // ステップ1: プロフィールを作成
      // Google OAuthからアバターURLを取得
      const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null;

      const profile = await createProfile({
        userId: user.id,
        displayName: displayName,
        email: user.email,
        avatarUrl: avatarUrl,
      });

      // ステップ2: 認証プロバイダー情報を登録
      const providerType = user.app_metadata?.provider || 'google';
      const authProvider = await createAuthProvider({
        profileId: profile.id,
        providerType: providerType,
        providerUserId: user.id,
        providerEmail: user.email,
      });

      // ステップ3: 両方のレコードが正しく作成されたか検証
      await verifyRegistration(profile.id);

      // 登録完了後、プロジェクト一覧ページへリダイレクト
      // window.location.hrefを使用して完全なページリロードを行い、
      // 認証状態を確実に反映させる
      window.location.href = '/projects';

    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : '登録に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  // ========================================
  // レンダリング
  // ========================================

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] px-4">
      <div className="w-full max-w-md">
        <RegisterLogo isAuthenticated={isAuthenticated} />

        <div className="rounded-xl border border-[#e5e7eb] bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-xl font-bold text-[#1f2937]">
            {isAuthenticated ? '表示名を入力してください' : 'アカウント作成'}
          </h2>

          <ErrorMessage error={error} />

          {!isAuthenticated ? (
            <GoogleSignInButton onClick={handleGoogleSignIn} isLoading={isLoading} />
          ) : (
            <ProfileForm
              displayName={displayName}
              isLoading={isLoading}
              onDisplayNameChange={setDisplayName}
              onSubmit={handleSubmit}
            />
          )}

          <TermsFooter />
        </div>

        <p className="mt-6 text-center text-sm text-[#6b7280]">
          © 2025 Tech Folio Demo
        </p>
      </div>
    </div>
  );
}
