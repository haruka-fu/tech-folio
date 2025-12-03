"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ProjectWithDetails, Role, Tag } from "@/lib/supabase";
import {
  demoProjects,
  demoQiitaArticles,
  demoRoles,
  demoTags,
} from "@/lib/demo-data";
import type {
  QiitaArticle,
  TimelineItem,
  FilterTab,
} from "@/lib/types/project";
import { createTagColorMap } from "@/lib/utils/tags";
import PageHeader from "@/app/projects/_components/PageHeader";
import DemoModeBanner from "@/app/projects/_components/DemoModeBanner";
import TabFilter from "@/app/projects/_components/TabFilter";
import SearchAndFilters from "@/app/projects/_components/SearchAndFilters";
import TimelineList from "@/app/projects/_components/TimelineList";
import LoginModal from "@/app/projects/_components/LoginModal";

const supabase = createClient();

const ITEMS_PER_PAGE = 20;

export default function ProjectsPage() {
  const router = useRouter();
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
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ドロップダウン表示状態
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // Qiita関連の状態
  const [qiitaArticles, setQiitaArticles] = useState<QiitaArticle[]>([]);
  const [qiitaLoading, setQiitaLoading] = useState(true);
  const [hasQiitaToken, setHasQiitaToken] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Load projects from Supabase
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // 未ログイン時はデモデータを表示
        if (!user) {
          setIsDemoMode(true);
          setAllProjects(demoProjects);
          setAllTags(demoTags);
          setAllRoles(demoRoles);
          setQiitaArticles(demoQiitaArticles);
          setHasQiitaToken(true);
          setQiitaLoading(false);
          setIsLoading(false);
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile error:", profileError);
          throw profileError;
        }

        if (!profile) {
          router.push("/register");
          return;
        }

        // 並列クエリ実行でパフォーマンス向上
        const [
          { data: projects, error: projectsError },
          { data: tags, error: tagsError },
          { data: roles, error: rolesError },
          { data: projectTags, error: projectTagsError },
        ] = await Promise.all([
          supabase
            .from("projects")
            .select("*")
            .eq("profile_id", profile.id)
            .order("period_start", { ascending: false }),
          supabase.from("tags").select("*"),
          supabase
            .from("roles")
            .select("*")
            .order("display_order", { ascending: true }),
          supabase.from("project_tags").select("*"),
        ]);

        if (projectsError) throw projectsError;
        if (tagsError) throw tagsError;
        if (rolesError) throw rolesError;
        if (projectTagsError) throw projectTagsError;

        setAllTags(tags || []);
        setAllRoles(roles || []);

        const projectsWithDetails: ProjectWithDetails[] = (projects || []).map(
          (project) => {
            const relatedTagIds = (projectTags || [])
              .filter((pt) => pt.project_id === project.id)
              .map((pt) => pt.tag_id);

            const projectTagObjects = (tags || []).filter((tag) =>
              relatedTagIds.includes(tag.id)
            );

            const roleNames = (project.roles || [])
              .map((roleId: number) => {
                const role = (roles || []).find((r: Role) => r.id === roleId);
                return role?.name || "";
              })
              .filter((name: string) => name !== "");

            return {
              ...project,
              tags: projectTagObjects,
              role_names: roleNames,
            };
          }
        );

        setAllProjects(projectsWithDetails);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // タグ名から色を取得するためのMap
  const tagColorMap = useMemo(() => createTagColorMap(allTags), [allTags]);

  // DBの全タグを取得し、タグ名の昇順でソート（Qiitaのタグは含めない）
  const availableTags = useMemo(() => {
    const tagCountMap = new Map<string, number>();

    // DBの全タグを初期化（件数0で）
    allTags.forEach((tag) => {
      tagCountMap.set(tag.name, 0);
    });

    // プロジェクトのタグをカウント
    allProjects.forEach((project) => {
      project.tags.forEach((tag) => {
        const count = tagCountMap.get(tag.name) || 0;
        tagCountMap.set(tag.name, count + 1);
      });
    });

    // タグを名前順（昇順）でソート
    return Array.from(tagCountMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0])) // 名前の昇順
      .map(([tagName]) => tagName);
  }, [allTags, allProjects]);

  // 使用中の工程一覧を取得
  const usedRoles = useMemo(() => {
    const roleSet = new Set<string>();
    allProjects.forEach((project) => {
      project.role_names.forEach((role) => roleSet.add(role));
    });
    return allRoles.filter((role) => roleSet.has(role.name));
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

        const matchesTag =
          selectedTags.length === 0 ||
          selectedTags.some((selectedTag) =>
            project.tags.some((tag) => tag.name === selectedTag)
          );
        const matchesRole =
          !selectedRole || project.role_names.includes(selectedRole);

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
          const matchesTag =
            selectedTags.length === 0 ||
            selectedTags.some((selectedTag) =>
              article.tags.some(
                (tag) => tag.name.toLowerCase() === selectedTag.toLowerCase()
              )
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
  }, [
    allProjects,
    qiitaArticles,
    searchQuery,
    selectedTags,
    selectedRole,
    activeTab,
  ]);

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
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isLoading &&
          !qiitaLoading
        ) {
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

  const bothLoading = isLoading || qiitaLoading;

  // カウント計算
  const projectCount = allProjects.length;
  const qiitaCount = qiitaArticles.length;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f9fa]">
      <div className="pt-4" />

      <main className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          <PageHeader
            hasQiitaToken={hasQiitaToken}
            qiitaLoading={qiitaLoading}
            isDemoMode={isDemoMode}
          />

          {isDemoMode && <DemoModeBanner />}

          <TabFilter
            activeTab={activeTab}
            projectCount={projectCount}
            qiitaCount={qiitaCount}
            onTabChange={setActiveTab}
          />

          <SearchAndFilters
            searchQuery={searchQuery}
            selectedTags={selectedTags}
            selectedRole={selectedRole}
            availableTags={availableTags}
            usedRoles={usedRoles}
            activeTab={activeTab}
            showTagDropdown={showTagDropdown}
            showRoleDropdown={showRoleDropdown}
            onSearchChange={setSearchQuery}
            onTagsChange={setSelectedTags}
            onRoleChange={setSelectedRole}
            onTagDropdownToggle={setShowTagDropdown}
            onRoleDropdownToggle={setShowRoleDropdown}
          />

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
            <TimelineList
              items={displayedItems}
              isLoading={bothLoading}
              hasMore={hasMore}
              isDemoMode={isDemoMode}
              tagColorMap={tagColorMap}
              observerTarget={observerTarget}
              onDemoClick={() => setShowLoginModal(true)}
            />
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

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
