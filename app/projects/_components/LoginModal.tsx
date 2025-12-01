import Link from "next/link";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex flex-col items-center text-center">
          <span className="material-symbols-outlined mb-4 text-6xl text-[#2b6cee]">
            lock
          </span>
          <h3 className="mb-2 text-xl font-bold text-slate-900">
            ログインが必要です
          </h3>
          <p className="mb-6 text-sm text-slate-600">
            プロジェクトの詳細を表示するには、ログインしてください。
            <br />
            現在はデモモードで閲覧しています。
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-[#2b6cee] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2357c9]"
          >
            <span className="material-symbols-outlined text-lg">login</span>
            ログインする
          </Link>
        </div>
      </div>
    </div>
  );
}
