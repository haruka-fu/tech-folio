"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ContactType = "bug" | "improvement" | "other";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: "bug" as ContactType,
    subject: "",
    message: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contactTypes = [
    { value: "bug" as ContactType, label: "不具合報告", icon: "bug_report" },
    { value: "improvement" as ContactType, label: "改善提案", icon: "lightbulb" },
    { value: "other" as ContactType, label: "その他", icon: "mail" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Google Formsへの送信をシミュレート
    // 実際の実装では、Google FormsのURLやAPIエンドポイントを使用
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSuccess(true);
    setIsSubmitting(false);

    // 3秒後にトップページへ遷移
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-green-600">
                check_circle
              </span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">送信完了</h2>
          <p className="text-sm text-gray-600 mb-6">
            お問い合わせいただきありがとうございます。
            <br />
            内容を確認させていただきます。
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-[#2b6cee] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#2b6cee]/90"
          >
            トップページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-20">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-10">
        {/* ヘッダー */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">お問い合わせ</h1>
            <p className="mt-1 text-sm text-gray-500">
              不具合報告や改善提案をお待ちしております
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <span className="material-symbols-outlined text-lg">close</span>
            <span className="hidden sm:inline">閉じる</span>
          </button>
        </div>

        {/* 説明バナー */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600">info</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">フィードバックをお寄せください</p>
              <p className="mt-1 text-sm text-blue-700">
                Tech Folioをより良いサービスにするため、不具合報告や改善アイデアをお待ちしております。
                皆様のご意見を参考に、継続的な改善を行っていきます。
              </p>
            </div>
          </div>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* お問い合わせ種別 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <label className="mb-3 block text-sm font-medium text-gray-900">
              お問い合わせ種別
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {contactTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.value })}
                  className={`flex items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                    formData.type === type.value
                      ? "border-[#2b6cee] bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-xl ${
                      formData.type === type.value ? "text-[#2b6cee]" : "text-gray-400"
                    }`}
                  >
                    {type.icon}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      formData.type === type.value ? "text-[#2b6cee]" : "text-gray-700"
                    }`}
                  >
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 件名 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-900">
              件名
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors focus:border-[#2b6cee] focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20"
              placeholder="例：プロジェクト削除ボタンが動作しない"
              required
            />
          </div>

          {/* 詳細内容 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900">
              詳細内容
              <span className="ml-1 text-red-500">*</span>
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={8}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors focus:border-[#2b6cee] focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20"
              placeholder={
                formData.type === "bug"
                  ? "不具合の詳細をお知らせください。\n\n例：\n・どのような操作をしたか\n・期待していた動作\n・実際の動作\n・発生する頻度"
                  : formData.type === "improvement"
                  ? "改善のご提案をお聞かせください。\n\n例：\n・どの機能を改善したいか\n・現在の課題\n・期待する動作や機能"
                  : "お問い合わせ内容をご記入ください。"
              }
              required
            />
          </div>

          {/* メールアドレス（任意） */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
              メールアドレス
              <span className="ml-2 text-xs text-gray-500">（任意・返信が必要な場合）</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors focus:border-[#2b6cee] focus:outline-none focus:ring-2 focus:ring-[#2b6cee]/20"
              placeholder="example@email.com"
            />
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col-reverse items-center justify-end gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="flex h-11 w-full min-w-[84px] items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <span className="truncate">キャンセル</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.subject || !formData.message}
              className="flex h-11 w-full min-w-[84px] items-center justify-center rounded-lg bg-[#2b6cee] px-6 text-sm font-bold text-white transition-colors hover:bg-[#2b6cee]/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? (
                <span className="truncate">送信中...</span>
              ) : (
                <span className="truncate">送信する</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
