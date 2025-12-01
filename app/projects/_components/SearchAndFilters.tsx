import { useRef, useEffect } from "react";
import type { FilterTab } from "@/lib/types/project";

interface SearchAndFiltersProps {
  searchQuery: string;
  selectedTags: string[];
  selectedRole: string | null;
  availableTags: string[];
  usedRoles: Array<{ id: number; name: string }>;
  activeTab: FilterTab;
  showTagDropdown: boolean;
  showRoleDropdown: boolean;
  onSearchChange: (query: string) => void;
  onTagsChange: (tags: string[]) => void;
  onRoleChange: (role: string | null) => void;
  onTagDropdownToggle: (show: boolean) => void;
  onRoleDropdownToggle: (show: boolean) => void;
}

export default function SearchAndFilters({
  searchQuery,
  selectedTags,
  selectedRole,
  availableTags,
  usedRoles,
  activeTab,
  showTagDropdown,
  showRoleDropdown,
  onSearchChange,
  onTagsChange,
  onRoleChange,
  onTagDropdownToggle,
  onRoleDropdownToggle,
}: SearchAndFiltersProps) {
  const tagDropdownRef = useRef<HTMLDivElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // ドロップダウン外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagDropdownRef.current &&
        !tagDropdownRef.current.contains(event.target as Node)
      ) {
        onTagDropdownToggle(false);
      }
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target as Node)
      ) {
        onRoleDropdownToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onTagDropdownToggle, onRoleDropdownToggle]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="grow">
        <label className="flex h-12 w-full min-w-40 flex-col">
          <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
            <div className="flex items-center justify-center rounded-l-lg border-y border-l border-[#e5e7eb] bg-gray-50 pl-4 text-[#6b7280]">
              <span className="material-symbols-outlined text-2xl">search</span>
            </div>
            <input
              className="form-input flex h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none border border-l-0 border-[#e5e7eb] bg-white px-4 pl-2 text-base font-normal leading-normal text-[#1f2937] placeholder:text-[#6b7280] focus:border-[#2b6cee] focus:outline-0 focus:ring-2 focus:ring-[#2b6cee]"
              placeholder="キーワードで検索..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </label>
      </div>

      <div className="flex gap-3 overflow-visible pb-2">
        {/* Tag Filter Dropdown */}
        <div className="relative" ref={tagDropdownRef}>
          <button
            onClick={() => {
              onTagDropdownToggle(!showTagDropdown);
              onRoleDropdownToggle(false);
            }}
            className={`flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border px-4 transition-colors ${
              selectedTags.length > 0
                ? "border-[#2b6cee] bg-[#2b6cee]/5 text-[#2b6cee]"
                : "border-[#e5e7eb] bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm font-medium leading-normal">
              {selectedTags.length > 0
                ? `技術タグ (${selectedTags.length})`
                : "技術タグ"}
            </p>
            <span className="material-symbols-outlined text-xl">
              {showTagDropdown ? "expand_less" : "expand_more"}
            </span>
          </button>
          {selectedTags.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTagsChange([]);
              }}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2b6cee] text-white text-xs"
            >
              ×
            </button>
          )}
          {showTagDropdown && (
            <div className="absolute left-0 top-14 z-20 max-h-64 w-56 overflow-y-auto rounded-lg border border-[#e5e7eb] bg-white shadow-lg">
              <div className="p-2">
                {availableTags.length === 0 ? (
                  <p className="px-3 py-2 text-sm text-[#6b7280]">
                    タグがありません
                  </p>
                ) : (
                  availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          if (isSelected) {
                            onTagsChange(selectedTags.filter((t) => t !== tag));
                          } else {
                            onTagsChange([...selectedTags, tag]);
                          }
                        }}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          isSelected
                            ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                            : "text-[#1f2937] hover:bg-gray-100"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-lg ${isSelected ? "text-[#2b6cee]" : "text-gray-300"}`}
                        >
                          {isSelected ? "check_box" : "check_box_outline_blank"}
                        </span>
                        {tag}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Role Filter Dropdown (案件タブ or すべてタブのみ) */}
        {activeTab !== "qiita" && (
          <div className="relative" ref={roleDropdownRef}>
            <button
              onClick={() => {
                onRoleDropdownToggle(!showRoleDropdown);
                onTagDropdownToggle(false);
              }}
              className={`flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border px-4 transition-colors ${
                selectedRole
                  ? "border-[#2b6cee] bg-[#2b6cee]/5 text-[#2b6cee]"
                  : "border-[#e5e7eb] bg-white hover:bg-gray-50"
              }`}
            >
              <p className="text-sm font-medium leading-normal">
                {selectedRole || "工程"}
              </p>
              <span className="material-symbols-outlined text-xl">
                {showRoleDropdown ? "expand_less" : "expand_more"}
              </span>
            </button>
            {selectedRole && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRoleChange(null);
                }}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2b6cee] text-white text-xs"
              >
                ×
              </button>
            )}
            {showRoleDropdown && (
              <div className="absolute left-0 top-14 z-20 max-h-64 w-48 overflow-y-auto rounded-lg border border-[#e5e7eb] bg-white shadow-lg">
                <div className="p-2">
                  {usedRoles.length === 0 ? (
                    <p className="px-3 py-2 text-sm text-[#6b7280]">
                      工程がありません
                    </p>
                  ) : (
                    usedRoles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => {
                          onRoleChange(role.name);
                          onRoleDropdownToggle(false);
                        }}
                        className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          selectedRole === role.name
                            ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                            : "text-[#1f2937] hover:bg-gray-100"
                        }`}
                      >
                        {role.name}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
