import type { QiitaArticle } from "@/lib/types/project";
import { getTagColor } from "@/lib/utils/tags";

interface QiitaCardProps {
  article: QiitaArticle;
  index: number;
  isDemoMode: boolean;
  tagColorMap: Map<string, string>;
  onDemoClick: () => void;
}

export default function QiitaCard({
  article,
  index,
  isDemoMode,
  tagColorMap,
  onDemoClick,
}: QiitaCardProps) {
  const handleQiitaClick = (e: React.MouseEvent) => {
    if (isDemoMode) {
      e.preventDefault();
      onDemoClick();
    }
  };

  return (
    <a
      key={`qiita-${article.id}`}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleQiitaClick}
      className={`project-card border-l-4 border-l-[#55c500] slide-in-up ${index < 5 ? `stagger-${Math.min(index + 1, 5)}` : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#55c500]/10 px-2.5 py-0.5 text-xs font-medium text-[#55c500] tag-bounce">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              Qiita
            </span>
          </div>
          <p className="mt-2 text-base font-bold leading-normal text-[#1f2937]">
            {article.title}
          </p>
          <p className="mt-2 text-xs font-medium text-[#9ca3af]">
            {new Date(article.created_at).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="ml-4 flex flex-col items-end gap-1 text-xs text-[#6b7280]">
          <span className="flex items-center gap-1 hover-scale">
            <span className="material-symbols-outlined text-sm">thumb_up</span>
            {article.likes_count}
          </span>
          <span className="flex items-center gap-1 hover-scale">
            <span className="material-symbols-outlined text-sm">bookmark</span>
            {article.stocks_count}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {article.tags.map((tag) => {
          const color = getTagColor(tag.name, tagColorMap);
          return (
            <span
              key={tag.name}
              className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium tag-bounce"
              style={{
                backgroundColor: `${color}20`,
                color: color
              }}
            >
              {tag.name}
            </span>
          );
        })}
      </div>
    </a>
  );
}
