interface ProjectBasicFieldsProps {
  title: string;
  summary: string;
  description: string;
  onTitleChange: (value: string) => void;
  onSummaryChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export default function ProjectBasicFields({
  title,
  summary,
  description,
  onTitleChange,
  onSummaryChange,
  onDescriptionChange,
}: ProjectBasicFieldsProps) {
  return (
    <>
      <div className="slide-in-up stagger-1">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          プロジェクト名 <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          required
          className="input-field w-full"
          placeholder="例: ECサイトリニューアル"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>

      <div className="slide-in-up stagger-2">
        <label
          htmlFor="summary"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          概要 <span className="text-red-500">*</span>
        </label>
        <input
          id="summary"
          type="text"
          required
          className="input-field w-full"
          placeholder="例: ECサイトのフロントエンド全面リニューアル"
          value={summary}
          onChange={(e) => onSummaryChange(e.target.value)}
        />
      </div>

      <div className="slide-in-up stagger-3">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          詳細説明 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          required
          rows={4}
          className="input-field w-full resize-none"
          placeholder="プロジェクトの詳細を入力してください"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
    </>
  );
}
