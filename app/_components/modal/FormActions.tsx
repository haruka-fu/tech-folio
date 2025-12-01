interface FormActionsProps {
  onCancel: () => void;
}

export default function FormActions({ onCancel }: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover-lift"
      >
        キャンセル
      </button>
      <button
        type="submit"
        className="btn-primary flex items-center gap-2 btn-shimmer btn-glow"
      >
        <span className="material-symbols-outlined text-xl">save</span>
        保存
      </button>
    </div>
  );
}
