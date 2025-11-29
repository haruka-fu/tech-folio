"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface QiitaArticle {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  stocks_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  tags: { name: string }[];
}

interface QiitaApiResponse {
  articles: QiitaArticle[];
  username: string | null;
  hasToken: boolean;
  error?: string;
}

export default function QiitaIntegration() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<QiitaArticle[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // URLパラメータからメッセージを取得
  useEffect(() => {
    const errorParam = searchParams.get("error");
    const successParam = searchParams.get("success");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
    if (successParam === "true") {
      setSuccess("Qiita連携が完了しました");
    }
  }, [searchParams]);

  // 記事を取得
  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/qiita/articles");
      const data: QiitaApiResponse = await response.json();

      setArticles(data.articles || []);
      setUsername(data.username);
      setHasToken(data.hasToken);
      if (data.error) {
        setError(data.error);
      }
    } catch {
      setError("記事の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // 連携を解除
  const handleDisconnect = async () => {
    if (!confirm("Qiita連携を解除しますか？")) return;

    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/qiita/disconnect", { method: "DELETE" });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "連携解除に失敗しました");
      }

      setHasToken(false);
      setArticles([]);
      setUsername(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setIsSaving(false);
    }
  };

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900">
          Qiita連携
        </h1>
        <p className="mt-2 text-base font-normal leading-normal text-gray-500">
          Qiitaアカウントを連携すると、投稿した記事を自動でポートフォリオに追加できます。
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {/* 成功メッセージ */}
        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
            {success}
          </div>
        )}

        {/* エラー表示 */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Connection Status */}
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
                    onClick={handleDisconnect}
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

        {/* Articles List */}
        {hasToken && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold leading-tight text-[#1f2937]">
                記事一覧
              </h2>
              <button
                onClick={fetchArticles}
                disabled={isLoading}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">
                  refresh
                </span>
                更新
              </button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="spinner"></div>
              </div>
            ) : articles.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 py-12 text-center text-gray-500">
                記事がありません
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
                <table className="w-full text-left text-sm text-[#6b7280]">
                  <thead className="bg-[#f9fafb] text-xs uppercase text-[#1f2937]">
                    <tr>
                      <th scope="col" className="whitespace-nowrap px-6 py-3 font-medium">
                        タイトル
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3 font-medium">
                        投稿日
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3 text-center font-medium">
                        LGTM
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3 text-center font-medium">
                        ストック
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr
                        key={article.id}
                        className="border-b border-[#e5e7eb] bg-white last:border-b-0"
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 font-medium text-[#1f2937]"
                        >
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-600 hover:underline"
                          >
                            {article.title}
                          </a>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {article.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag.name}
                                className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </th>
                        <td className="px-6 py-4">
                          {formatDate(article.created_at)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {article.likes_count}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {article.stocks_count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <p className="mt-4 text-sm text-gray-500">
              全 {articles.length} 件の記事
            </p>
          </section>
        )}
      </div>
    </>
  );
}
