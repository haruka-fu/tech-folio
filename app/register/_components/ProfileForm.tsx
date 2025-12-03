"use client";

import { useState, useEffect } from "react";

interface ProfileFormProps {
  displayName: string;
  isLoading: boolean;
  onDisplayNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ProfileForm({
  displayName,
  isLoading,
  onDisplayNameChange,
  onSubmit,
}: ProfileFormProps) {
  const [isCheckingName, setIsCheckingName] = useState(false);
  const [isNameAvailable, setIsNameAvailable] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState<string>("");

  // Display name availability check with debounce
  useEffect(() => {
    // ローディング中はチェックしない（送信処理中）
    if (isLoading) {
      return;
    }

    // 空の場合はチェックしない
    if (!displayName.trim()) {
      setIsNameAvailable(null);
      setValidationMessage("");
      return;
    }

    // デバウンス処理（500ms）
    const timeoutId = setTimeout(async () => {
      setIsCheckingName(true);
      setValidationMessage("");

      try {
        const response = await fetch(
          `/api/profiles/check-display-name?displayName=${encodeURIComponent(displayName.trim())}`
        );

        if (!response.ok) {
          throw new Error('Failed to check display name availability');
        }

        const data = await response.json();

        if (data.available) {
          setIsNameAvailable(true);
          setValidationMessage("✓ この表示名は使用可能です");
        } else {
          setIsNameAvailable(false);
          setValidationMessage("✗ この表示名は既に使用されています");
        }
      } catch (error) {
        console.error('Display name check error:', error);
        setIsNameAvailable(null);
        setValidationMessage("表示名の確認中にエラーが発生しました");
      } finally {
        setIsCheckingName(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [displayName, isLoading]);

  // isLoadingがtrueになったらバリデーション状態をクリア
  useEffect(() => {
    if (isLoading) {
      setIsNameAvailable(null);
      setValidationMessage("");
      setIsCheckingName(false);
    }
  }, [isLoading]);

  // Submit button should be disabled if name is not available
  const isSubmitDisabled = isLoading || isCheckingName || isNameAvailable === false || !displayName.trim();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-[#1f2937] mb-2">
          表示名 *
        </label>
        <input
          id="displayName"
          type="text"
          required
          value={displayName}
          onChange={(e) => onDisplayNameChange(e.target.value)}
          className={`w-full rounded-lg border ${
            isNameAvailable === false
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : isNameAvailable === true
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
              : 'border-[#e5e7eb] focus:border-[#2b6cee] focus:ring-[#2b6cee]'
          } bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2`}
          placeholder="山田 太郎"
          autoFocus
        />
        {/* Validation message */}
        {(isCheckingName || validationMessage) && (
          <p className={`mt-2 text-xs ${
            isCheckingName
              ? 'text-[#6b7280]'
              : isNameAvailable === true
              ? 'text-green-600'
              : isNameAvailable === false
              ? 'text-red-600'
              : 'text-[#6b7280]'
          }`}>
            {isCheckingName ? '確認中...' : validationMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitDisabled}
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
  );
}
