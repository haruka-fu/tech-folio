"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { ProjectWithDetails, Role, Tag } from "@/lib/supabase";
import { demoProjects, demoQiitaArticles, demoRoles } from "@/lib/demo-data";

const supabase = createClient();

const ITEMS_PER_PAGE = 20;

// Qiita記事の型定義
interface QiitaArticle {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  stocks_count: number;
  created_at: string;
  tags: { name: string }[];
}

// 統合アイテムの型定義
type TimelineItem =
  | { type: "project"; data: ProjectWithDetails; date: Date }
  | { type: "qiita"; data: QiitaArticle; date: Date };

// タブの型定義
type FilterTab = "all" | "project" | "qiita";

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<ProjectWithDetails[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // ドロップダウン表示状態
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // Qiita関連の状態
  const [qiitaArticles, setQiitaArticles] = useState<QiitaArticle[]>([]);
  const [qiitaLoading, setQiitaLoading] = useState(true);
  const [hasQiitaToken, setHasQiitaToken] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // ドロップダウン外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target as Node)) {
        setShowTagDropdown(false);
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setShowRoleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load projects from Supabase
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        // 未ログイン時はデモデータを表示
        if (!user) {
          setIsDemoMode(true);
          setAllProjects(demoProjects);
          setAllRoles(demoRoles);
          setQiitaArticles(demoQiitaArticles);
          setHasQiitaToken(true);
          setQiitaLoading(false);
          setIsLoading(false);
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Profile error:', profileError);
          throw profileError;
        }

        if (!profile) {
          window.location.href = '/register';
          return;
        }

        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('profile_id', profile.id)
          .order('period_start', { ascending: false });

        if (projectsError) throw projectsError;

        const { data: tags, error: tagsError } = await supabase
          .from('tags')
          .select('*');

        if (tagsError) throw tagsError;
        setAllTags(tags || []);

        const { data: roles, error: rolesError } = await supabase
          .from('roles')
          .select('*')
          .order('display_order', { ascending: true });

        if (rolesError) throw rolesError;
        setAllRoles(roles || []);

        const { data: projectTags, error: projectTagsError } = await supabase
          .from('project_tags')
          .select('*');

        if (projectTagsError) throw projectTagsError;

        const projectsWithDetails: ProjectWithDetails[] = (projects || []).map(project => {
          const relatedTagIds = (projectTags || [])
            .filter(pt => pt.project_id === project.id)
            .map(pt => pt.tag_id);

          const projectTagObjects = (tags || [])
            .filter(tag => relatedTagIds.includes(tag.id));

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
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Qiita記事を取得（ログイン済みの場合のみ）
  useEffect(() => {
    const loadQiitaArticles = async () => {
      // デモモードまたは初期ロード中の場合は何もしない
      if (isDemoMode || isLoading) {
        return;
      }

      setQiitaLoading(true);
      try {
        const response = await fetch("/api/qiita/articles");
        const data = await response.json();
        setQiitaArticles(data.articles || []);
        setHasQiitaToken(data.hasToken);
      } catch (error) {
        console.error("Failed to load Qiita articles:", error);
      } finally {
        setQiitaLoading(false);
      }
    };

    loadQiitaArticles();
  }, [isDemoMode, isLoading]);

  // DBの全タグを取得し、使用件数順にソート
  const availableTags = useMemo(() => {
    const tagCountMap = new Map<string, number>();

    // DBの全タグを初期化（件数0で）
    allTags.forEach(tag => {
      tagCountMap.set(tag.name, 0);
    });

    // プロジェクトのタグをカウント
    allProjects.forEach(project => {
      project.tags.forEach(tag => {
        const count = tagCountMap.get(tag.name) || 0;
        tagCountMap.set(tag.name, count + 1);
      });
    });

    // Qiitaのタグをカウント
    qiitaArticles.forEach(article => {
      article.tags.forEach(tag => {
        const count = tagCountMap.get(tag.name) || 0;
        tagCountMap.set(tag.name, count + 1);
      });
    });

    // タグを件数順（降順）でソート、件数が同じ場合は名前順
    return Array.from(tagCountMap.entries())
      .sort((a, b) => {
        if (b[1] !== a[1]) {
          return b[1] - a[1]; // 件数の降順
        }
        return a[0].localeCompare(b[0]); // 名前の昇順
      })
      .map(([tagName]) => tagName);
  }, [allTags, allProjects, qiitaArticles]);

  // 使用中の工程一覧を取得
  const usedRoles = useMemo(() => {
    const roleSet = new Set<string>();
    allProjects.forEach(project => {
      project.role_names.forEach(role => roleSet.add(role));
    });
    return allRoles.filter(role => roleSet.has(role.name));
  }, [allProjects, allRoles]);

  // プロジェクトとQiita記事を統合して日付順にソート
  const timelineItems = useMemo(() => {
    const items: TimelineItem[] = [];

    // プロジェクトを追加
    if (activeTab === "all" || activeTab === "project") {
      allProjects.forEach((project) => {
        const matchesSearch =
          searchQuery === "" ||
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.summary.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTag = selectedTags.length === 0 || selectedTags.some(selectedTag =>
          project.tags.some(tag => tag.name === selectedTag)
        );
        const matchesRole = !selectedRole || project.role_names.includes(selectedRole);

        if (matchesSearch && matchesTag && matchesRole) {
          items.push({
            type: "project",
            data: project,
            date: new Date(project.period_start),
          });
        }
      });
    }

    // Qiita記事を追加
    if (activeTab === "all" || activeTab === "qiita") {
      // 工程フィルタがある場合はQiita記事を表示しない
      if (!selectedRole) {
        qiitaArticles.forEach((article) => {
          const matchesSearch =
            searchQuery === "" ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase());

          // Qiita記事のタグでもフィルタリング
          const matchesTag = selectedTags.length === 0 || selectedTags.some(selectedTag =>
            article.tags.some(tag => tag.name.toLowerCase() === selectedTag.toLowerCase())
          );

          if (matchesSearch && matchesTag) {
            items.push({
              type: "qiita",
              data: article,
              date: new Date(article.created_at),
            });
          }
        });
      }
    }

    // 日付の降順でソート
    items.sort((a, b) => b.date.getTime() - a.date.getTime());

    return items;
  }, [allProjects, qiitaArticles, searchQuery, selectedTags, selectedRole, activeTab]);

  // ページネーション
  const displayedItems = useMemo(() => {
    return timelineItems.slice(0, page * ITEMS_PER_PAGE);
  }, [timelineItems, page]);

  const hasMore = useMemo(() => {
    return page * ITEMS_PER_PAGE < timelineItems.length;
  }, [page, timelineItems.length]);

  // フィルタ変更時にページリセット
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedTags, selectedRole, activeTab]);

  // 無限スクロール
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !qiitaLoading) {
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
  }, [hasMore, isLoading, qiitaLoading]);

  // 期間表示フォーマット
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

  const bothLoading = isLoading || qiitaLoading;

  // カウント計算
  const projectCount = allProjects.length;
  const qiitaCount = qiitaArticles.length;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f9fa]">
      <div className="pt-4" />

      <main className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-[#1f2937] sm:text-4xl">
                アクティビティ
              </h1>
              <p className="text-base font-normal leading-normal text-[#6b7280]">
                プロジェクトとQiita記事を時系列で表示します。
              </p>
            </div>
            {!hasQiitaToken && !qiitaLoading && !isDemoMode && (
              <Link
                href="/profile/settings?tab=qiita"
                className="inline-flex items-center gap-2 rounded-lg bg-[#55c500] px-4 py-2 text-sm font-medium text-white hover:bg-[#4ab000] btn-shimmer btn-glow"
              >
                Qiitaと連携する
              </Link>
            )}
          </div>


          {/* Demo Mode Banner */}
          {isDemoMode && (
            <div className="rounded-lg border border-[#f59e0b] bg-[#fffbeb] p-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-2xl text-[#f59e0b]">
                  info
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[#92400e]">
                    デモモードで表示中
                  </h3>
                  <p className="mt-1 text-sm text-[#78350f]">
                    これはサンプルデータです。実際のプロジェクトを管理するには、ログインしてください。
                  </p>
                  <Link
                    href="/login"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#f59e0b] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#d97706]"
                  >
                    <span className="material-symbols-outlined text-lg">login</span>
                    ログインして始める
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* Tab Filter */}
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab("all")}
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
              onClick={() => setActiveTab("project")}
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
              onClick={() => setActiveTab("qiita")}
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
                    placeholder="キーワードで検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </label>
            </div>

            <div className="flex gap-3 overflow-visible pb-2">
              {/* Tag Filter Dropdown */}
              <div className="relative" ref={tagDropdownRef}>
                <button
                  onClick={() => {
                    setShowTagDropdown(!showTagDropdown);
                    setShowRoleDropdown(false);
                  }}
                  className={`flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border px-4 transition-colors ${
                    selectedTags.length > 0
                      ? "border-[#2b6cee] bg-[#2b6cee]/5 text-[#2b6cee]"
                      : "border-[#e5e7eb] bg-white hover:bg-gray-50"
                  }`}
                >
                  <p className="text-sm font-medium leading-normal">
                    {selectedTags.length > 0 ? `技術タグ (${selectedTags.length})` : "技術タグ"}
                  </p>
                  <span className="material-symbols-outlined text-xl">
                    {showTagDropdown ? "expand_less" : "expand_more"}
                  </span>
                </button>
                {selectedTags.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTags([]);
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
                        <p className="px-3 py-2 text-sm text-[#6b7280]">タグがありません</p>
                      ) : (
                        availableTags.map((tag) => {
                          const isSelected = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedTags(selectedTags.filter(t => t !== tag));
                                } else {
                                  setSelectedTags([...selectedTags, tag]);
                                }
                              }}
                              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                                isSelected
                                  ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                                  : "text-[#1f2937] hover:bg-gray-100"
                              }`}
                            >
                              <span className={`material-symbols-outlined text-lg ${isSelected ? "text-[#2b6cee]" : "text-gray-300"}`}>
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
                      setShowRoleDropdown(!showRoleDropdown);
                      setShowTagDropdown(false);
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
                        setSelectedRole(null);
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
                          <p className="px-3 py-2 text-sm text-[#6b7280]">工程がありません</p>
                        ) : (
                          usedRoles.map((role) => (
                            <button
                              key={role.id}
                              onClick={() => {
                                setSelectedRole(role.name);
                                setShowRoleDropdown(false);
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

          {/* Results Count */}
          {!bothLoading && (
            <div className="text-sm text-[#6b7280]">
              {timelineItems.length}件のアイテム
              {(searchQuery || selectedTags.length > 0 || selectedRole) && (
                <span> (フィルタ適用中)</span>
              )}
            </div>
          )}

          {/* Timeline Items */}
          <div className="flex flex-col gap-4">
            {bothLoading ? (
              <div className="flex justify-center py-12">
                <div className="spinner"></div>
              </div>
            ) : timelineItems.length === 0 ? (
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
            ) : (
              <>
                {displayedItems.map((item, index) => {
                  if (item.type === "project") {
                    const project = item.data;
                    return (
                      <Link
                        key={`project-${project.id}`}
                        href={`/projects/${project.id}`}
                        className={`project-card slide-in-up ${index < 5 ? `stagger-${Math.min(index + 1, 5)}` : ''}`}
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
                      </Link>
                    );
                  } else {
                    const article = item.data;
                    return (
                      <a
                        key={`qiita-${article.id}`}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
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
                          {article.tags.map((tag) => (
                            <span
                              key={tag.name}
                              className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 tag-bounce"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </a>
                    );
                  }
                })}

                {/* Infinite Scroll Trigger */}
                {hasMore && (
                  <div ref={observerTarget} className="flex justify-center py-8">
                    <div className="spinner"></div>
                  </div>
                )}

                {!hasMore && displayedItems.length > 0 && (
                  <div className="py-8 text-center text-sm text-[#6b7280]">
                    すべてのアイテムを表示しました
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
