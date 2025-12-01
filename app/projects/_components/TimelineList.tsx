import type { TimelineItem } from "@/lib/types/project";
import ProjectCard from "@/app/projects/_components/ProjectCard";
import QiitaCard from "@/app/projects/_components/QiitaCard";

interface TimelineListProps {
  items: TimelineItem[];
  isLoading: boolean;
  hasMore: boolean;
  isDemoMode: boolean;
  tagColorMap: Map<string, string>;
  observerTarget: React.RefObject<HTMLDivElement | null>;
  onDemoClick: () => void;
}

export default function TimelineList({
  items,
  isLoading,
  hasMore,
  isDemoMode,
  tagColorMap,
  observerTarget,
  onDemoClick,
}: TimelineListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="spinner"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-[#e5e7eb] bg-white p-8 text-center">
        <span className="material-symbols-outlined mb-2 text-6xl text-[#6b7280]">
          folder_open
        </span>
        <p className="text-lg font-medium text-[#1f2937]">
          アイテムが見つかりませんでした
        </p>
        <p className="mt-1 text-sm text-[#6b7280]">
          検索条件を変更してください
        </p>
      </div>
    );
  }

  return (
    <>
      {items.map((item, index) => {
        if (item.type === "project") {
          return (
            <ProjectCard
              key={`project-${item.data.id}`}
              project={item.data}
              index={index}
              isDemoMode={isDemoMode}
              onDemoClick={onDemoClick}
            />
          );
        } else {
          return (
            <QiitaCard
              key={`qiita-${item.data.id}`}
              article={item.data}
              index={index}
              isDemoMode={isDemoMode}
              tagColorMap={tagColorMap}
              onDemoClick={onDemoClick}
            />
          );
        }
      })}

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          <div className="spinner"></div>
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <div className="py-8 text-center text-sm text-[#6b7280]">
          すべてのアイテムを表示しました
        </div>
      )}
    </>
  );
}
