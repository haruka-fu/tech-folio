"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// ========================================
// 定数定義
// ========================================

/** Supabaseクライアントインスタンス */
const supabase = createClient();

/** OAuthリダイレクト先URL */
const OAUTH_REDIRECT_URL = `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`;

// ========================================
// 型定義
// ========================================

/** プロフィール作成時のパラメータ */
interface CreateProfileParams {
  userId: string;
  displayName: string;
  email: string | undefined;
  avatarUrl: string | undefined;
}

/** 認証プロバイダー登録時のパラメータ */
interface CreateAuthProviderParams {
  profileId: string;
  providerType: string;
  providerUserId: string;
  providerEmail: string | undefined;
}

// ========================================
// ヘルパー関数
// ========================================

/**
 * Google OAuth認証を開始
 *
 * @throws {Error} OAuth認証の開始に失敗した場合
 */
async function startGoogleOAuth(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: OAUTH_REDIRECT_URL,
    },
  });

  if (error) {
    throw error;
  }
}

/**
 * プロフィールをデータベースに作成
 *
 * @param params - プロフィール作成パラメータ
 * @returns 作成されたプロフィールデータ
 * @throws {Error} プロフィール作成に失敗した場合
 */
async function createProfile(params: CreateProfileParams) {
  const { userId, displayName, email, avatarUrl } = params;

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      user_id: userId,
      display_name: displayName,
      email: email,
      avatar_url: avatarUrl,
    })
    .select();

  if (error) {
    console.error('Profile creation error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw new Error(error.message || 'プロフィールの作成に失敗しました');
  }

  if (!data || data.length === 0) {
    throw new Error('プロフィールの作成に失敗しました: データが返されませんでした');
  }

  return data[0];
}

/**
 * 認証プロバイダー情報をデータベースに登録
 *
 * @param params - 認証プロバイダー登録パラメータ
 * @returns 登録された認証プロバイダーデータ
 * @throws {Error} 認証プロバイダー登録に失敗した場合
 */
async function createAuthProvider(params: CreateAuthProviderParams) {
  const { profileId, providerType, providerUserId, providerEmail } = params;

  const { data, error } = await supabase
    .from('auth_providers')
    .insert({
      profile_id: profileId,
      provider_type: providerType,
      provider_user_id: providerUserId,
      provider_email: providerEmail,
      is_primary: true,
    })
    .select();

  if (error) {
    console.error('Auth provider registration error:', error);
    throw new Error(error.message || '認証プロバイダーの登録に失敗しました');
  }

  if (!data || data.length === 0) {
    throw new Error('認証プロバイダーの登録に失敗しました: データが返されませんでした');
  }

  return data[0];
}

/**
 * プロフィールと認証プロバイダーの存在を検証
 *
 * @param profileId - プロフィールID
 * @throws {Error} レコードの検証に失敗した場合
 */
async function verifyRegistration(profileId: string): Promise<void> {
  // プロフィールレコードの存在確認
  const { data: verifyProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', profileId)
    .maybeSingle();

  // 認証プロバイダーレコードの存在確認
  const { data: verifyAuthProvider } = await supabase
    .from('auth_providers')
    .select('id')
    .eq('profile_id', profileId)
    .maybeSingle();

  // どちらかのレコードが存在しない場合はエラー
  if (!verifyProfile || !verifyAuthProvider) {
    console.error('Registration verification failed:', {
      profileExists: !!verifyProfile,
      authProviderExists: !!verifyAuthProvider
    });
    throw new Error('登録が完了していません: データベースの検証に失敗しました');
  }

  console.log('Registration verified successfully');
}

// ========================================
// メインコンポーネント
// ========================================

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

      console.log('Creating profile for user:', user.id);

      // プロフィールが既に存在しないか確認
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingProfile) {
        console.log('Profile already exists, redirecting...');
        router.push('/projects');
        return;
      }

      // ステップ1: プロフィールを作成
      // Google OAuthからアバターURLを取得
      const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

      const profile = await createProfile({
        userId: user.id,
        displayName: displayName,
        email: user.email,
        avatarUrl: avatarUrl,
      });

      console.log('Profile created:', profile);

      // ステップ2: 認証プロバイダー情報を登録
      const providerType = user.app_metadata?.provider || 'google';
      const authProvider = await createAuthProvider({
        profileId: profile.id,
        providerType: providerType,
        providerUserId: user.id,
        providerEmail: user.email,
      });

      console.log('Auth provider registered:', authProvider);

      // ステップ3: 両方のレコードが正しく作成されたか検証
      await verifyRegistration(profile.id);

      // 登録完了後、プロジェクト一覧ページへリダイレクト
      router.push('/projects');

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
        {/* ロゴとタイトル */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="size-16 text-[#2b6cee]">
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
          </div>
          <h1 className="mb-2 text-3xl font-black text-[#1f2937]">
            TechFolio
          </h1>
          <p className="text-base text-[#6b7280]">
            {isAuthenticated ? 'プロフィールを完成させましょう' : 'Googleアカウントで登録'}
          </p>
        </div>

        {/* 登録カード */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-xl font-bold text-[#1f2937]">
            {isAuthenticated ? '表示名を入力してください' : 'アカウント作成'}
          </h2>

          {/* エラーメッセージ */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-600">
                  error
                </span>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {!isAuthenticated ? (
            // ステップ1: Google認証ボタン
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm font-medium text-[#1f2937] transition-all hover:bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="size-5 animate-spin rounded-full border-2 border-[#2b6cee] border-t-transparent" />
                  <span>認証中...</span>
                </>
              ) : (
                <>
                  <svg className="size-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Googleで登録</span>
                </>
              )}
            </button>
          ) : (
            // ステップ2: 表示名入力フォーム
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-[#1f2937] mb-2">
                  表示名 *
                </label>
                <input
                  id="displayName"
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#9ca3af] focus:border-[#2b6cee] focus:outline-none focus:ring-2 focus:ring-[#2b6cee]"
                  placeholder="山田 太郎"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-[#2b6cee] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>プロフィール作成中...</span>
                  </div>
                ) : (
                  '登録を完了'
                )}
              </button>
            </form>
          )}

          {/* 利用規約 */}
          <p className="mt-6 text-center text-xs text-[#9ca3af]">
            登録することで、利用規約とプライバシーポリシーに
            <br />
            同意したものとみなされます
          </p>
        </div>

        {/* フッター */}
        <p className="mt-6 text-center text-sm text-[#6b7280]">
          © 2025 Tech Folio Demo
        </p>
      </div>
    </div>
  );
}
