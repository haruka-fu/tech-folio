import { useRef } from "react";

interface AvatarUploadProps {
  avatarPreview: string | null;
  currentAvatarUrl: string | null | undefined;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AvatarUpload({
  avatarPreview,
  currentAvatarUrl,
  onFileChange,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center justify-between border-b pb-6">
      <div className="flex items-center gap-5">
        <div className="relative">
          {avatarPreview || currentAvatarUrl ? (
            <div
              className="w-24 h-24 rounded-full bg-cover bg-center bg-no-repeat border-2 border-slate-200"
              data-alt="Current user avatar"
              style={{
                backgroundImage: `url("${avatarPreview || currentAvatarUrl}")`,
              }}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center border-2 border-slate-300">
              <span className="material-symbols-outlined text-4xl text-slate-500">
                person
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={handleAvatarClick}
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#4A90E2] text-white hover:bg-[#4A90E2]/90 transition-colors"
          >
            <span className="material-symbols-outlined text-base">edit</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
