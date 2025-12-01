"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { QiitaArticle, QiitaApiResponse } from "@/lib/types/qiita";
import ConnectionStatus from "./ConnectionStatus";
import ArticlesTable from "./ArticlesTable";

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
        <ConnectionStatus
          isLoading={isLoading}
          hasToken={hasToken}
          username={username}
          isSaving={isSaving}
          onDisconnect={handleDisconnect}
        />

        {/* Articles List */}
        {hasToken && (
          <ArticlesTable
            articles={articles}
            isLoading={isLoading}
            onRefresh={fetchArticles}
          />
        )}
      </div>
    </>
  );
}
