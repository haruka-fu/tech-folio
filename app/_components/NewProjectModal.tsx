"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Tag } from "@/lib/supabase";
import TagSelector from "./TagSelector";

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

        {/* 注意書き */}
        <div className="mx-6 mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-2xl text-blue-600">
              info
            </span>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900">
                スキル可視化のためのツールです
              </h3>
              <p className="mt-1 text-sm text-blue-800">
                具体的な企業名や機密情報は入力しないでください。このツールは、あなたのスキルや経験を可視化するためのものです。プロジェクト名は「ECサイトリニューアル」「社内業務システム開発」のような一般的な表現を使用してください。
              </p>
            </div>
          </div>
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
              placeholder="例: ECサイトのフロントエンド全面リニューアル"
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
          <TagSelector
            selectedTags={formData.tags}
            availableTags={availableTags}
            onToggleTag={handleToggleTag}
            onRemoveTag={handleRemoveTag}
          />

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
