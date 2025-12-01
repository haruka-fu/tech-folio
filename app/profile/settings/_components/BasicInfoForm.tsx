interface BasicInfoFormProps {
  displayName: string;
  bio: string;
  displayNameError: string | null;
  onDisplayNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
}

export default function BasicInfoForm({
  displayName,
  bio,
  displayNameError,
  onDisplayNameChange,
  onBioChange,
}: BasicInfoFormProps) {
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
              displayNameError ? "border-red-500" : "border-gray-300"
            }`}
            id="display-name"
            type="text"
            value={displayName}
            onChange={(e) => onDisplayNameChange(e.target.value)}
            placeholder="表示名を入力"
          />
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
