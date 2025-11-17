"use client";

import { useState } from "react";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewProjectModal({
  isOpen,
  onClose,
}: NewProjectModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    startDate: "",
    endDate: "",
    roles: [] as string[],
    tags: [] as string[],
  });

  const [isCurrent, setIsCurrent] = useState(false);
  const [tagInput, setTagInput] = useState("");

  // 工程の選択肢
  const phaseOptions = [
    "要件定義",
    "基本設計",
    "詳細設計",
    "実装",
    "テスト",
    "リリース",
    "保守・運用",
  ];

  const handleAddPhase = (phase: string) => {
    if (!formData.roles.includes(phase)) {
      setFormData({
        ...formData,
        roles: [...formData.roles, phase],
      });
    }
  };

  const handleRemovePhase = (phase: string) => {
    setFormData({
      ...formData,
      roles: formData.roles.filter((r) => r !== phase),
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to TOON file
    console.log("New project data:", formData);
    // Reset form and close modal
    setFormData({
      title: "",
      summary: "",
      description: "",
      startDate: "",
      endDate: "",
      roles: [],
      tags: [],
    });
    setIsCurrent(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-2xl font-bold text-slate-900">
            新規プロジェクト追加
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Title */}
          <div>
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
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Summary */}
          <div>
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
              placeholder="例: 大手小売企業のECサイト全面リニューアル"
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                開始年月 <span className="text-red-500">*</span>
              </label>
              <input
                id="startDate"
                type="month"
                required
                className="input-field w-full"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                終了年月 {!isCurrent && <span className="text-red-500">*</span>}
              </label>
              <input
                id="endDate"
                type="month"
                required={!isCurrent}
                disabled={isCurrent}
                className="input-field w-full disabled:bg-slate-100 disabled:text-slate-400"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="isCurrent"
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) => {
                    setIsCurrent(e.target.checked);
                    if (e.target.checked) {
                      setFormData({ ...formData, endDate: "" });
                    }
                  }}
                  className="h-4 w-4 rounded border-slate-300 text-[#2b6cee] focus:ring-[#2b6cee]"
                />
                <label
                  htmlFor="isCurrent"
                  className="text-sm text-slate-700 cursor-pointer"
                >
                  現在進行中
                </label>
              </div>
            </div>
          </div>

          {/* Phases */}
          <div>
            <label
              htmlFor="phase"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              工程
            </label>
            <select
              id="phase"
              className="input-field w-full"
              onChange={(e) => {
                if (e.target.value) {
                  handleAddPhase(e.target.value);
                  e.target.value = "";
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>
                工程を選択してください
              </option>
              {phaseOptions
                .filter((phase) => !formData.roles.includes(phase))
                .map((phase) => (
                  <option key={phase} value={phase}>
                    {phase}
                  </option>
                ))}
            </select>
            {formData.roles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.roles.map((phase) => (
                  <span
                    key={phase}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {phase}
                    <button
                      type="button"
                      onClick={() => handleRemovePhase(phase)}
                      className="rounded-full hover:bg-blue-200"
                    >
                      <span className="material-symbols-outlined text-base">
                        close
                      </span>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              技術タグ
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="input-field flex-1"
                placeholder="例: React"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="btn-primary flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">add</span>
                追加
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="rounded-full hover:bg-green-200"
                    >
                      <span className="material-symbols-outlined text-base">
                        close
                      </span>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">save</span>
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
