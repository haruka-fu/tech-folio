"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Project, parseToonFile, getTagColor } from "@/lib/toon-parser";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetch("/data/projects.toon");
        const content = await response.text();
        const projects = parseToonFile(content);
        const foundProject = projects.find((p) => p.id === params.id);

        if (foundProject) {
          setProject(foundProject);
        }
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [params.id]);

  const formatPeriod = (
    start: string,
    end: string | null,
    isCurrent: boolean
  ) => {
    const formatMonth = (dateStr: string) => {
      const [year, month] = dateStr.split("-");
      return `${year}年${month}月`;
    };

    if (isCurrent) {
      return `${formatMonth(start)} 〜 現在`;
    }

    return end
      ? `${formatMonth(start)} 〜 ${formatMonth(end)}`
      : formatMonth(start);
  };

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f9fa]">
        <div className="pt-4" />
        <main className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
          <div className="flex justify-center py-12">
            <div className="spinner"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f9fa]">
        <div className="pt-4" />
        <main className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
          <div className="rounded-lg border border-[#e5e7eb] bg-white p-8 text-center">
            <span className="material-symbols-outlined mb-2 text-6xl text-[#6b7280]">
              error
            </span>
            <p className="text-lg font-medium text-[#1f2937]">
              プロジェクトが見つかりませんでした
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-lg bg-[#2b6cee] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
            >
              プロジェクト一覧に戻る
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f9fa]">
      <div className="pt-4" />

      <main className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#6b7280]">
          <Link href="/" className="hover:text-[#2b6cee]">
            プロジェクト一覧
          </Link>
          <span className="material-symbols-outlined text-base">
            chevron_right
          </span>
          <span className="text-[#1f2937]">{project.title}</span>
        </div>

        {/* Project Details */}
        <div className="flex flex-col gap-6">
          {/* Header Card */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-[#1f2937]">
                    {project.title}
                  </h1>
                  {project.is_current && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      進行中
                    </span>
                  )}
                </div>
                <p className="text-base text-[#6b7280]">{project.summary}</p>
              </div>
              <button
                onClick={() => router.back()}
                className="ml-4 rounded-full p-2 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined text-[#6b7280]">
                  close
                </span>
              </button>
            </div>

            {/* Period */}
            <div className="mb-4 flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-[#6b7280]">
                calendar_month
              </span>
              <span className="font-medium text-[#1f2937]">
                {formatPeriod(
                  project.period_start,
                  project.period_end,
                  project.is_current
                )}
              </span>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-[#1f2937]">
                使用技術
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => {
                  const colors = getTagColor(tag);
                  return (
                    <span key={tag} className={`tag ${colors.bg} ${colors.text}`}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Roles */}
            {project.roles.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-[#1f2937]">
                  担当工程
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.roles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center rounded-md border border-[#e5e7eb] bg-white px-3 py-1.5 text-sm font-medium text-[#6b7280]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description Card */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[#1f2937]">
              プロジェクト詳細
            </h2>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-[#6b7280]">
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              onClick={() => router.back()}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">
                arrow_back
              </span>
              <span>戻る</span>
            </button>
            <div className="flex gap-3">
              <button className="btn-secondary flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">
                  edit
                </span>
                <span>編集</span>
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50">
                <span className="material-symbols-outlined text-base">
                  delete
                </span>
                <span>削除</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
