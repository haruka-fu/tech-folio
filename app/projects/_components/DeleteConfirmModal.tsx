interface DeleteConfirmModalProps {
  isOpen: boolean;
  projectTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  projectTitle,
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 fade-in">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl scale-in">
        <div className="p-6">
          {/* アイコンとタイトル */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <span className="material-symbols-outlined text-2xl text-red-600">
                warning
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              プロジェクトを削除しますか？
            </h3>
            <p className="mb-1 text-sm text-gray-600">
              以下のプロジェクトを削除しようとしています：
            </p>
            <p className="mb-4 font-medium text-gray-900">
              「{projectTitle}」
            </p>
            <p className="text-sm text-red-600">
              この操作は取り消せません。
            </p>
          </div>
        </div>

        {/* ボタン */}
        <div className="flex gap-3 border-t border-gray-200 p-4">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex h-11 flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex h-11 flex-1 items-center justify-center rounded-lg bg-red-600 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? '削除中...' : '削除する'}
          </button>
        </div>
      </div>
    </div>
  );
}
