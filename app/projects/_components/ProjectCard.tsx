import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ProjectWithDetails } from "@/lib/supabase";
import { formatPeriod } from "@/lib/utils/format";

interface ProjectCardProps {
  project: ProjectWithDetails;
  index: number;
  isDemoMode: boolean;
  onDemoClick: () => void;
}

export default function ProjectCard({
  project,
  index,
  isDemoMode,
  onDemoClick,
}: ProjectCardProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (isDemoMode) {
      e.preventDefault();
      onDemoClick();
    } else {
      router.push(`/projects/${project.id}`);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDemoMode) {
      onDemoClick();
    } else {
      router.push(`/projects/${project.id}/edit`);
    }
  };

  return (
    <div
      key={`project-${project.id}`}
      className={`project-card slide-in-up ${index < 5 ? `stagger-${Math.min(index + 1, 5)}` : ''} cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 tag-bounce">
              案件
            </span>
            {project.is_current && (
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 tag-pulse">
                進行中
              </span>
            )}
          </div>
          <p className="mt-2 text-base font-bold leading-normal text-[#1f2937]">
            {project.title}
          </p>
          <p className="mt-1 text-sm font-normal leading-normal text-[#6b7280]">
            {project.summary}
          </p>
          <p className="mt-2 text-xs font-medium text-[#9ca3af]">
            {formatPeriod(project.period_start, project.period_end, project.is_current)}
          </p>
        </div>
        {!isDemoMode && (
          <button
            onClick={handleEditClick}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="編集"
          >
            <span className="material-symbols-outlined text-xl">edit</span>
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium tag-bounce"
            style={{
              backgroundColor: tag.color ? `${tag.color}20` : '#f3f4f6',
              color: tag.color || '#374151'
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* Roles */}
      {project.role_names.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {project.role_names.map((role) => (
            <span
              key={role}
              className="inline-flex items-center rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-xs font-medium text-[#6b7280] hover-scale"
            >
              {role}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
