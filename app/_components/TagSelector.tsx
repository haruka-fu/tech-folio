import { useState, useEffect, useRef } from "react";
import type { Tag } from "@/lib/supabase";

interface TagSelectorProps {
  selectedTags: string[];
  availableTags: Tag[];
  onToggleTag: (tagName: string) => void;
  onRemoveTag: (tagName: string) => void;
}

export default function TagSelector({
  selectedTags,
  availableTags,
  onToggleTag,
  onRemoveTag,
}: TagSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ドロップダウン外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-2 block text-sm font-semibold text-slate-900">
        技術タグ
      </label>
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex w-full items-center justify-between rounded-lg border px-4 py-2.5 transition-colors ${
          selectedTags.length > 0
            ? "border-[#2b6cee] bg-[#2b6cee]/5"
            : "border-slate-300 bg-white hover:bg-slate-50"
        }`}
      >
        <span className="text-sm font-medium text-slate-700">
          {selectedTags.length > 0
            ? `${selectedTags.length}個のタグを選択中`
            : "タグを選択してください"}
        </span>
        <span className="material-symbols-outlined text-xl text-slate-400">
          {showDropdown ? "expand_less" : "expand_more"}
        </span>
      </button>
      {showDropdown && (
        <div className="absolute left-0 top-full z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="p-2">
            {availableTags.length === 0 ? (
              <p className="px-3 py-2 text-sm text-slate-500">タグがありません</p>
            ) : (
              availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.name);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => onToggleTag(tag.name)}
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
      {selectedTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedTags.map((tag) => {
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
                  onClick={() => onRemoveTag(tag)}
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
  );
}
