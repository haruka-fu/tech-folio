"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Tag } from "@/lib/supabase";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const supabase = createClient();

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
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  // タグ一覧を取得
  useEffect(() => {
    const loadTags = async () => {
      const { data: tags } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });

      if (tags) {
        setAvailableTags(tags);
      }
    };

    if (isOpen) {
      loadTags();
    }
  }, [isOpen]);

  // ドロップダウン外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target as Node)) {
        setShowTagDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // モーダル表示時に背景のスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      // モーダルを開いた時、背景のスクロールを無効化
      document.body.style.overflow = 'hidden';
    } else {
      // モーダルを閉じた時、スクロールを有効化
      document.body.style.overflow = 'unset';
    }

    // クリーンアップ: コンポーネントがアンマウントされた時にスクロールを戻す
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  const handleToggleTag = (tagName: string) => {
    if (formData.tags.includes(tagName)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter((t) => t !== tagName),
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagName],
      });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 fade-in">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl scale-in">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-2xl font-bold text-slate-900 slide-in-left">
            新規プロジェクト追加
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 hover-scale"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Title */}
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
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Summary */}
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
              placeholder="例: 大手小売企業のECサイト全面リニューアル"
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
            />
          </div>

          {/* Description */}
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
          <div className="relative" ref={tagDropdownRef}>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              技術タグ
            </label>
            <button
              type="button"
              onClick={() => setShowTagDropdown(!showTagDropdown)}
              className={`flex w-full items-center justify-between rounded-lg border px-4 py-2.5 transition-colors ${
                formData.tags.length > 0
                  ? "border-[#2b6cee] bg-[#2b6cee]/5"
                  : "border-slate-300 bg-white hover:bg-slate-50"
              }`}
            >
              <span className="text-sm font-medium text-slate-700">
                {formData.tags.length > 0
                  ? `${formData.tags.length}個のタグを選択中`
                  : "タグを選択してください"}
              </span>
              <span className="material-symbols-outlined text-xl text-slate-400">
                {showTagDropdown ? "expand_less" : "expand_more"}
              </span>
            </button>
            {showTagDropdown && (
              <div className="absolute left-0 top-full z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                <div className="p-2">
                  {availableTags.length === 0 ? (
                    <p className="px-3 py-2 text-sm text-slate-500">タグがありません</p>
                  ) : (
                    availableTags.map((tag) => {
                      const isSelected = formData.tags.includes(tag.name);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => handleToggleTag(tag.name)}
                          className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                            isSelected
                              ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span className={`material-symbols-outlined text-lg ${isSelected ? "text-[#2b6cee]" : "text-slate-300"}`}>
                            {isSelected ? "check_box" : "check_box_outline_blank"}
                          </span>
                          {tag.name}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
            {formData.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map((tag) => {
                  const tagObj = availableTags.find(t => t.name === tag);
                  return (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium tag-bounce scale-in"
                      style={{
                        backgroundColor: tagObj?.color ? `${tagObj.color}20` : '#f3f4f6',
                        color: tagObj?.color || '#374151'
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="rounded-full hover:opacity-70 hover-scale"
                      >
                        <span className="material-symbols-outlined text-base">
                          close
                        </span>
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
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
        </form>
      </div>
    </div>
  );
}
