import type { FilterTab } from "@/lib/types/project";

interface TabFilterProps {
  activeTab: FilterTab;
  projectCount: number;
  qiitaCount: number;
  onTabChange: (tab: FilterTab) => void;
}

export default function TabFilter({
  activeTab,
  projectCount,
  qiitaCount,
  onTabChange,
}: TabFilterProps) {
  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
      <button
        onClick={() => onTabChange("all")}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
          activeTab === "all"
            ? "bg-white text-[#1f2937] shadow-sm scale-in"
            : "text-[#6b7280] hover:text-[#1f2937] hover-scale"
        }`}
      >
        すべて
        <span className="ml-1 text-xs text-[#9ca3af]">
          ({projectCount + qiitaCount})
        </span>
      </button>
      <button
        onClick={() => onTabChange("project")}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
          activeTab === "project"
            ? "bg-white text-[#1f2937] shadow-sm scale-in"
            : "text-[#6b7280] hover:text-[#1f2937] hover-scale"
        }`}
      >
        案件
        <span className="ml-1 text-xs text-[#9ca3af]">
          ({projectCount})
        </span>
      </button>
      <button
        onClick={() => onTabChange("qiita")}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
          activeTab === "qiita"
            ? "bg-white text-[#55c500] shadow-sm scale-in"
            : "text-[#6b7280] hover:text-[#1f2937] hover-scale"
        }`}
      >
        Qiita
        <span className="ml-1 text-xs text-[#9ca3af]">
          ({qiitaCount})
        </span>
      </button>
    </div>
  );
}
