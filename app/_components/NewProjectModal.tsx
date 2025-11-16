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
    thumbnail: "",
    startDate: "",
    endDate: "",
    roles: [] as string[],
    tags: [] as string[],
    achievements: [] as string[],
  });

  const [roleInput, setRoleInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");

  const handleAddRole = () => {
    if (roleInput.trim() && !formData.roles.includes(roleInput.trim())) {
      setFormData({
        ...formData,
        roles: [...formData.roles, roleInput.trim()],
      });
      setRoleInput("");
    }
  };

  const handleRemoveRole = (role: string) => {
    setFormData({
      ...formData,
      roles: formData.roles.filter((r) => r !== role),
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

  const handleAddAchievement = () => {
    if (
      achievementInput.trim() &&
      !formData.achievements.includes(achievementInput.trim())
    ) {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, achievementInput.trim()],
      });
      setAchievementInput("");
    }
  };

  const handleRemoveAchievement = (achievement: string) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((a) => a !== achievement),
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
      thumbnail: "",
      startDate: "",
      endDate: "",
      roles: [],
      tags: [],
      achievements: [],
    });
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

          {/* Thumbnail URL */}
          <div>
            <label
              htmlFor="thumbnail"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              サムネイルURL
            </label>
            <input
              id="thumbnail"
              type="url"
              className="input-field w-full"
              placeholder="https://example.com/image.jpg"
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData({ ...formData, thumbnail: e.target.value })
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
                開始日 <span className="text-red-500">*</span>
              </label>
              <input
                id="startDate"
                type="date"
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
                終了日 <span className="text-red-500">*</span>
              </label>
              <input
                id="endDate"
                type="date"
                required
                className="input-field w-full"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          {/* Roles */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              役割
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="input-field flex-1"
                placeholder="例: フロントエンドエンジニア"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddRole();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddRole}
                className="btn-primary flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">add</span>
                追加
              </button>
            </div>
            {formData.roles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {role}
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(role)}
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

          {/* Achievements */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              成果・実績
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="input-field flex-1"
                placeholder="例: パフォーマンス30%向上"
                value={achievementInput}
                onChange={(e) => setAchievementInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAchievement();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="btn-primary flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">add</span>
                追加
              </button>
            </div>
            {formData.achievements.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <span className="text-sm text-slate-700">
                      {achievement}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(achievement)}
                      className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    >
                      <span className="material-symbols-outlined text-base">
                        close
                      </span>
                    </button>
                  </div>
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
