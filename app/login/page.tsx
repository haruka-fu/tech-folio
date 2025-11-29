"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

// useSearchParams()を使用するコンポーネントを分離
function ErrorDisplay({ onError }: { onError: (error: string | null) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      onError(decodeURIComponent(errorParam));
    }
  }, [searchParams, onError]);

  return null;
}

function LoginPageContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Vercel環境変数を優先的に使用してリダイレクトURLを構築
      const getRedirectURL = () => {
        let url =
          process.env.NEXT_PUBLIC_SITE_URL ?? // 本番環境のサイトURL
          (typeof window !== 'undefined' ? window.location.origin : ''); // フォールバック

        // httpsプレフィックスを確認（localhostを除く）
        if (url && !url.startsWith('http')) {
          url = `https://${url}`;
        }

        return url;
      };

      const redirectUrl = `${getRedirectURL()}/auth/callback`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) throw error;

    } catch (error) {
      console.error('Google login error:', error);
      setError(error instanceof Error ? error.message : 'ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* useSearchParams()を使用するコンポーネントをSuspenseでラップ */}
      <Suspense fallback={null}>
        <ErrorDisplay onError={setError} />
      </Suspense>

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
              あなたのプロジェクトとスキルを管理
            </p>
          </div>

          {/* ログインカード */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-center text-xl font-bold text-[#1f2937]">
              ログイン
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

            {/* Google ログインボタン */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm font-medium text-[#1f2937] transition-all hover:bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="size-5 animate-spin rounded-full border-2 border-[#2b6cee] border-t-transparent" />
                  <span>ログイン中...</span>
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
                  <span>Googleでログイン</span>
                </>
              )}
            </button>

            {/* 説明テキスト */}
            <p className="mt-6 text-center text-xs text-[#9ca3af]">
              ログインすることで、
              <br />
              利用規約とプライバシーポリシーに同意したものとみなされます
            </p>
          </div>

          {/* フッター */}
          <p className="mt-6 text-center text-sm text-[#6b7280]">
            © 2025 Tech Folio Demo
          </p>
        </div>
      </div>
    </>
  );
}

// メインのエクスポートコンポーネント
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <div className="size-8 animate-spin rounded-full border-4 border-[#2b6cee] border-t-transparent" />
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
