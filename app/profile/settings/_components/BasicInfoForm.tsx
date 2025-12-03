"use client";

import { useState, useEffect } from "react";

interface BasicInfoFormProps {
  displayName: string;
  bio: string;
  displayNameError: string | null;
  currentUserId: string;
  onDisplayNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export default function BasicInfoForm({
  displayName,
  bio,
  displayNameError,
  currentUserId,
  onDisplayNameChange,
  onBioChange,
  onValidationChange,
}: BasicInfoFormProps) {
  const [isCheckingName, setIsCheckingName] = useState(false);
  const [isNameAvailable, setIsNameAvailable] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState<string>("");

  // Display name availability check with debounce
  useEffect(() => {
    // 空の場合はチェックしない
    if (!displayName.trim()) {
      setIsNameAvailable(null);
      setValidationMessage("");
      onValidationChange?.(true);
      return;
    }

    // デバウンス処理（500ms）
    const timeoutId = setTimeout(async () => {
      setIsCheckingName(true);
      setValidationMessage("");

      try {
        const response = await fetch(
          `/api/profiles/check-display-name?displayName=${encodeURIComponent(displayName.trim())}&currentUserId=${currentUserId}`
        );

        if (!response.ok) {
          throw new Error('Failed to check display name availability');
        }

        const data = await response.json();

        if (data.available) {
          setIsNameAvailable(true);
          setValidationMessage("✓ この表示名は使用可能です");
          onValidationChange?.(true);
        } else {
          setIsNameAvailable(false);
          setValidationMessage("✗ この表示名は既に使用されています");
          onValidationChange?.(false);
        }
      } catch (error) {
        console.error('Display name check error:', error);
        setIsNameAvailable(null);
        setValidationMessage("表示名の確認中にエラーが発生しました");
        onValidationChange?.(true); // エラー時は保存を許可
      } finally {
        setIsCheckingName(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [displayName, currentUserId, onValidationChange]);

  return (
    <form className="grid grid-cols-1 gap-y-6 pt-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="grow">
          <label
            className="text-gray-800 text-base font-medium leading-normal pb-2 block"
            htmlFor="display-name"
          >
            表示名
          </label>
          <input
            className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal ${
              displayNameError || isNameAvailable === false ? "border-red-500" : isNameAvailable === true ? "border-green-500" : "border-gray-300"
            }`}
            id="display-name"
            type="text"
            value={displayName}
            onChange={(e) => onDisplayNameChange(e.target.value)}
            placeholder="表示名を入力"
          />
          {/* Validation messages */}
          {(isCheckingName || validationMessage) && !displayNameError && (
            <p className={`mt-1 text-xs ${
              isCheckingName
                ? 'text-gray-500'
                : isNameAvailable === true
                ? 'text-green-600'
                : isNameAvailable === false
                ? 'text-red-600'
                : 'text-gray-500'
            }`}>
              {isCheckingName ? '確認中...' : validationMessage}
            </p>
          )}
          {displayNameError && (
            <p className="mt-1 text-sm text-red-600">{displayNameError}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <label
            className="text-gray-800 text-base font-medium leading-normal pb-2 block"
            htmlFor="bio"
          >
            自己紹介
          </label>
          <textarea
            className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
            id="bio"
            rows={4}
            value={bio}
            onChange={(e) => onBioChange(e.target.value)}
            placeholder="自己紹介を入力"
          />
        </div>
      </div>
    </form>
  );
}
