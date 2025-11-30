import type { SkillStat } from "@/lib/types/profile";

interface SkillStatsCardProps {
  skillStats: SkillStat[];
  isLoading: boolean;
  activeView: "chart" | "grid";
  setActiveView: (view: "chart" | "grid") => void;
}

export default function SkillStatsCard({
  skillStats,
  isLoading,
  activeView,
  setActiveView,
}: SkillStatsCardProps) {
  const maxUsageCount = Math.max(...skillStats.map((s) => s.usageCount), 1);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-[-0.015em]">
          スキル統計
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView("chart")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === "chart"
                ? "bg-[#2b6cee] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            棒グラフ
          </button>
          <button
            onClick={() => setActiveView("grid")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === "grid"
                ? "bg-[#2b6cee] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            グリッド
          </button>
        </div>
      </div>
      <p className="text-slate-500 text-sm mb-6">
        {activeView === "chart"
          ? "ポートフォリオ内のプロジェクト全体での技術タグの使用頻度です。"
          : "スキルごとの案件数を一覧表示します。"}
      </p>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : skillStats.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <span className="material-symbols-outlined mb-2 text-6xl text-slate-400">
            analytics
          </span>
          <p className="text-lg font-medium text-slate-900">
            スキルデータがありません
          </p>
          <p className="mt-1 text-sm text-slate-600">
            プロジェクトを追加してください
          </p>
        </div>
      ) : activeView === "chart" ? (
        <div className="space-y-6">
          {skillStats.map((skill, index) => {
            const percentage = (skill.usageCount / maxUsageCount) * 100;
            const opacity = index < 3 ? 1 : index < 5 ? 0.8 : 0.6;

            return (
              <div key={skill.tagName} className={`flex items-center gap-4 group slide-in-left ${index < 5 ? `stagger-${index + 1}` : ''}`}>
                <p className="text-slate-600 font-medium text-sm w-24 shrink-0">
                  {skill.tagName}
                </p>
                <div className="flex-1 bg-slate-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-[#2b6cee] h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700 ease-out hover:opacity-100"
                    style={{
                      width: `${percentage}%`,
                      opacity: opacity,
                    }}
                  >
                    <span className="text-white text-sm font-bold">
                      {skill.usageCount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {skillStats.map((skill, index) => {
            const opacity = index < 3 ? 1 : index < 6 ? 0.8 : 0.6;

            return (
              <div
                key={skill.tagName}
                className={`flex flex-col items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 p-4 hover-lift card-glow scale-in ${index < 5 ? `stagger-${index + 1}` : ''}`}
              >
                <p
                  className="text-4xl font-bold text-[#2b6cee] transition-all duration-300"
                  style={{ opacity }}
                >
                  {skill.usageCount}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {skill.tagName}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
