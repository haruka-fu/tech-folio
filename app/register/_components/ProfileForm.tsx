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
  );
}
