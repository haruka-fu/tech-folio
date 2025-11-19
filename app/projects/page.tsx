"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { ProjectWithDetails, Role } from "@/lib/supabase";

const supabase = createClient();

const ITEMS_PER_PAGE = 20;

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<ProjectWithDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [userProfileId, setUserProfileId] = useState<string | null>(null);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Load projects from Supabase
  useEffect(() => {
    const loadProjects = async () => {
      try {
        // 認証状態を確認
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          // ログインしていない場合はログインページにリダイレクト
          window.location.href = '/login';
          return;
        }

        // プロフィール情報を取得
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Profile error:', profileError);
          throw profileError;
        }

        // プロフィールが存在しない場合は登録画面へ
        if (!profile) {
          window.location.href = '/register';
          return;
        }

        setUserProfileId(profile.id);

        // ログインユーザーのプロジェクトデータを取得
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('profile_id', profile.id)
          .order('period_start', { ascending: false });

        if (projectsError) throw projectsError;

        // タグデータを取得
        const { data: tags, error: tagsError } = await supabase
          .from('tags')
          .select('*');

        if (tagsError) throw tagsError;

        // ロールデータを取得
        const { data: roles, error: rolesError } = await supabase
          .from('roles')
          .select('*')
          .order('display_order', { ascending: true });

        if (rolesError) throw rolesError;

        // プロジェクトとタグの関連を取得
        const { data: projectTags, error: projectTagsError } = await supabase
          .from('project_tags')
          .select('*');

        if (projectTagsError) throw projectTagsError;

        // プロジェクトにタグとロール名を追加
        const projectsWithDetails: ProjectWithDetails[] = (projects || []).map(project => {
          // プロジェクトに関連するタグIDを取得
          const relatedTagIds = (projectTags || [])
            .filter(pt => pt.project_id === project.id)
            .map(pt => pt.tag_id);

          // タグオブジェクトを取得
          const projectTagObjects = (tags || [])
            .filter(tag => relatedTagIds.includes(tag.id));

          // ロール名を取得
          const roleNames = (project.roles || [])
            .map((roleId: number) => {
              const role = (roles || []).find((r: Role) => r.id === roleId);
              return role?.name || '';
            })
            .filter((name: string) => name !== '');

          return {
            ...project,
            tags: projectTagObjects,
            role_names: roleNames,
          };
        });

        setAllProjects(projectsWithDetails);
      } catch (error) {
        console.error("Failed to load projects:", error);
        // エラーの詳細をログに出力
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = !selectedTag || project.tags.some(tag => tag.name === selectedTag);
      const matchesRole = !selectedRole || project.role_names.includes(selectedRole);

      return matchesSearch && matchesTag && matchesRole;
    });
  }, [allProjects, searchQuery, selectedTag, selectedRole]);

  // Calculate displayed projects based on current page
  const displayedProjects = useMemo(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    return filteredProjects.slice(0, endIndex);
  }, [filteredProjects, page]);

  // Calculate if there are more items to load
  const hasMore = useMemo(() => {
    return page * ITEMS_PER_PAGE < filteredProjects.length;
  }, [page, filteredProjects.length]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedTag, selectedRole]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading]);

  // Format period display
  const formatPeriod = (start: string, end: string | null, isCurrent: boolean) => {
    const formatMonth = (dateStr: string) => {
      const [year, month] = dateStr.split("-");
      return `${year}年${month}月`;
    };

    if (isCurrent) {
      return `${formatMonth(start)} 〜 現在`;
    }

    return end ? `${formatMonth(start)} 〜 ${formatMonth(end)}` : formatMonth(start);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f9fa]">
      <div className="pt-4" />

      <main className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-[#1f2937] sm:text-4xl">
                プロジェクト一覧
              </h1>
              <p className="text-base font-normal leading-normal text-[#6b7280]">
                あなたのプロジェクトを管理・フィルタリングします。
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="grow">
              <label className="flex h-12 w-full min-w-40 flex-col">
                <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                  <div className="flex items-center justify-center rounded-l-lg border-y border-l border-[#e5e7eb] bg-gray-50 pl-4 text-[#6b7280]">
                    <span className="material-symbols-outlined text-2xl">
                      search
                    </span>
                  </div>
                  <input
                    className="form-input flex h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none border border-l-0 border-[#e5e7eb] bg-white px-4 pl-2 text-base font-normal leading-normal text-[#1f2937] placeholder:text-[#6b7280] focus:border-[#2b6cee] focus:outline-0 focus:ring-2 focus:ring-[#2b6cee]"
                    placeholder="プロジェクト名で検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#1f2937]"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  )}
                </div>
              </label>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {/* Tag Filter */}
              <div className="relative">
                <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-[#e5e7eb] bg-white px-4 transition-colors hover:bg-gray-50">
                  <p className="text-sm font-medium leading-normal text-[#1f2937]">
                    {selectedTag || "技術タグ"}
                  </p>
                  <span className="material-symbols-outlined text-xl text-[#6b7280]">
                    expand_more
                  </span>
                </button>
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2b6cee] text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Role Filter */}
              <div className="relative">
                <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-[#e5e7eb] bg-white px-4 transition-colors hover:bg-gray-50">
                  <p className="text-sm font-medium leading-normal text-[#1f2937]">
                    {selectedRole || "工程"}
                  </p>
                  <span className="material-symbols-outlined text-xl text-[#6b7280]">
                    expand_more
                  </span>
                </button>
                {selectedRole && (
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2b6cee] text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Count */}
          {!isLoading && (
            <div className="text-sm text-[#6b7280]">
              {filteredProjects.length}件のプロジェクト
              {(searchQuery || selectedTag || selectedRole) && (
                <span> (フィルタ適用中)</span>
              )}
            </div>
          )}

          {/* Project Cards */}
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="spinner"></div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="rounded-lg border border-[#e5e7eb] bg-white p-8 text-center">
                <span className="material-symbols-outlined mb-2 text-6xl text-[#6b7280]">
                  folder_open
                </span>
                <p className="text-lg font-medium text-[#1f2937]">
                  プロジェクトが見つかりませんでした
                </p>
                <p className="mt-1 text-sm text-[#6b7280]">
                  検索条件を変更してください
                </p>
              </div>
            ) : (
              <>
                {displayedProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="project-card"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-base font-bold leading-normal text-[#1f2937]">
                            {project.title}
                          </p>
                          {project.is_current && (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              進行中
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm font-normal leading-normal text-[#6b7280]">
                          {project.summary}
                        </p>
                        <p className="mt-2 text-xs font-medium text-[#9ca3af]">
                          {formatPeriod(project.period_start, project.period_end, project.is_current)}
                        </p>
                      </div>
                      <button
                        className="ml-2 rounded-full p-1 hover:bg-gray-100"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="material-symbols-outlined text-2xl text-[#6b7280]">
                          more_vert
                        </span>
                      </button>
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium"
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
                            className="inline-flex items-center rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-xs font-medium text-[#6b7280]"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}

                {/* Infinite Scroll Trigger */}
                {hasMore && (
                  <div ref={observerTarget} className="flex justify-center py-8">
                    <div className="spinner"></div>
                  </div>
                )}

                {!hasMore && displayedProjects.length > 0 && (
                  <div className="py-8 text-center text-sm text-[#6b7280]">
                    すべてのプロジェクトを表示しました
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Add Button */}
          <button className="mt-6 flex h-12 w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#2b6cee] px-4 text-base font-bold leading-normal tracking-[0.015em] text-white transition-opacity hover:opacity-90 sm:hidden">
            <span className="truncate">新規プロジェクト追加</span>
          </button>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <a
        href="#top"
        className="fixed bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#1f2937] shadow-lg transition-colors hover:bg-gray-100"
      >
        <span className="material-symbols-outlined text-3xl">arrow_upward</span>
      </a>
    </div>
  );
}
