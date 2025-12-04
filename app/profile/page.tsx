"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase";
import { demoProfile, demoProjects } from "@/lib/demo-data";
import type { SkillStat, RoleStat } from "@/lib/types/profile";
import { calculateSkillStats, calculateRoleStats } from "@/lib/utils/stats";
import ProfileCard from "./_components/ProfileCard";
import RoleStatsCard from "./_components/RoleStatsCard";
import SkillStatsCard from "./_components/SkillStatsCard";

const supabase = createClient();

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skillStats, setSkillStats] = useState<SkillStat[]>([]);
  const [roleStats, setRoleStats] = useState<RoleStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<"chart" | "grid">("chart");
  const [isDemoMode, setIsDemoMode] = useState(false);

  // プロジェクトとスキル統計をロード
  useEffect(() => {
    const loadData = async () => {
      try {
        // 認証状態を確認
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          // ログインしていない場合はデモモードで表示
          setIsDemoMode(true);
          setProfile(demoProfile);
          
          // デモプロジェクトからスキル統計を計算
          const stats = calculateSkillStats(demoProjects);
          const roleStatsData = calculateRoleStats(demoProjects);

          setSkillStats(stats);
          setRoleStats(roleStatsData);
          setIsLoading(false);
          return;
        }

        // プロフィール情報を取得
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Profile error:', profileError);
          throw profileError;
        }

        // プロフィールが存在しない場合は登録画面へ
        if (!profileData) {
          window.location.href = '/register';
          return;
        }

        setProfile(profileData);

        // ユーザーのプロジェクトを取得（rolesも含める）
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('id, roles')
          .eq('profile_id', profileData.id);

        if (projectsError) throw projectsError;

        if (!projects || projects.length === 0) {
          setSkillStats([]);
          setRoleStats([]);
          setIsLoading(false);
          return;
        }

        const projectIds = projects.map(p => p.id);

        // ロールの使用回数を集計
        const roleCounts = new Map<number, number>();
        projects.forEach(project => {
          (project.roles || []).forEach((roleId: number) => {
            const count = roleCounts.get(roleId) || 0;
            roleCounts.set(roleId, count + 1);
          });
        });

        // ロール情報を取得
        const { data: roles, error: rolesError } = await supabase
          .from('roles')
          .select('*')
          .order('display_order', { ascending: true });

        if (rolesError) throw rolesError;

        // ロール統計を作成
        const roleStatsData: RoleStat[] = (roles || [])
          .map(role => ({
            roleName: role.name,
            count: roleCounts.get(role.id) || 0,
          }))
          .filter(stat => stat.count > 0);

        setRoleStats(roleStatsData);

        // tagsテーブルから全タグを取得
        const { data: allTags, error: allTagsError } = await supabase
          .from('tags')
          .select('*');

        if (allTagsError) throw allTagsError;

        // タグ名（小文字）からタグIDへのマッピングを作成
        const tagNameToTag = new Map<string, typeof allTags[0]>();
        (allTags || []).forEach(tag => {
          tagNameToTag.set(tag.name.toLowerCase(), tag);
        });

        // プロジェクトに紐づくタグを取得
        const { data: projectTags, error: projectTagsError } = await supabase
          .from('project_tags')
          .select('tag_id')
          .in('project_id', projectIds);

        if (projectTagsError) throw projectTagsError;

        // プロジェクトのタグ使用回数を集計（tag.idベース）
        const projectTagCounts = new Map<string, number>();
        projectTags?.forEach(pt => {
          const count = projectTagCounts.get(pt.tag_id) || 0;
          projectTagCounts.set(pt.tag_id, count + 1);
        });

        // Qiita記事からタグを取得して集計
        const qiitaTagCounts = new Map<string, number>();
        try {
          const qiitaResponse = await fetch('/api/qiita/articles');
          if (qiitaResponse.ok) {
            const qiitaData = await qiitaResponse.json();
            if (qiitaData.articles && qiitaData.articles.length > 0) {
              // Qiita記事のタグを集計（tagsテーブルに存在するもののみ）
              qiitaData.articles.forEach((article: { tags: { name: string }[] }) => {
                article.tags.forEach(tag => {
                  const tagName = tag.name.toLowerCase();
                  // tagsテーブルに存在するタグのみカウント
                  if (tagNameToTag.has(tagName)) {
                    const count = qiitaTagCounts.get(tagName) || 0;
                    qiitaTagCounts.set(tagName, count + 1);
                  }
                });
              });
            }
          }
        } catch (error) {
          console.error("Failed to fetch Qiita articles:", error);
        }

        // tagsテーブルのタグごとに使用回数を合算
        const combinedTagCounts = new Map<string, { count: number; tag: typeof allTags[0] }>();

        (allTags || []).forEach(tag => {
          const tagName = tag.name.toLowerCase();
          const projectCount = projectTagCounts.get(tag.id) || 0;
          const qiitaCount = qiitaTagCounts.get(tagName) || 0;
          const totalCount = projectCount + qiitaCount;

          // 使用回数が1回以上のタグのみ追加
          if (totalCount > 0) {
            combinedTagCounts.set(tag.id, {
              count: totalCount,
              tag: tag,
            });
          }
        });

        // タグに使用回数を追加してトップ10を取得
        const stats: SkillStat[] = Array.from(combinedTagCounts.values())
          .map(({ count, tag }) => ({
            tagName: tag.name,
            usageCount: count,
            tag: tag,
          }))
          .sort((a, b) => b.usageCount - a.usageCount)
          .slice(0, 10);

        setSkillStats(stats);
      } catch (error) {
        console.error("Failed to load profile data:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <div className="pt-4" />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <SkillListView
          profile={profile}
          skillStats={skillStats}
          roleStats={roleStats}
          isLoading={isLoading}
          activeView={activeView}
          setActiveView={setActiveView}
          isDemoMode={isDemoMode}
        />
      </main>
    </div>
  );
}

interface ViewProps {
  isDemoMode: boolean;
  profile: Profile | null;
  skillStats: SkillStat[];
  roleStats: RoleStat[];
  isLoading: boolean;
  activeView: "chart" | "grid";
  setActiveView: (view: "chart" | "grid") => void;
}

function SkillListView({ profile, skillStats, roleStats, isLoading, activeView, setActiveView, isDemoMode }: ViewProps) {
  return (
    <div className="space-y-8">
      {/* ページタイトル */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-slate-900 sm:text-4xl">
          スキル一覧
        </h1>
        <p className="text-sm text-slate-600">
          プロジェクトとQiita記事全体でのスキル統計を表示します。
        </p>
      </div>
{/* デモモードバナー */}      {isDemoMode && (        <div className="rounded-lg border border-[#f59e0b] bg-[#fffbeb] p-4 flex items-start gap-3">          <span className="material-symbols-outlined text-[#f59e0b] text-2xl shrink-0">            info          </span>          <div className="flex-1">            <p className="text-sm font-medium text-[#92400e] mb-1">              デモモード            </p>            <p className="text-sm text-[#92400e]">              これはサンプルデータです。実際のスキル統計を管理するには、              <a href="/login" className="underline font-medium hover:text-[#78350f]">                ログイン              </a>              してください。            </p>          </div>        </div>      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* 860px以下: 縦並び、860px～1280px: 横並び、1280px以上: 縦並び */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 xl:flex xl:flex-col xl:col-span-1 gap-8">
          <ProfileCard profile={profile} isLoading={isLoading} />
          <RoleStatsCard roleStats={roleStats} isLoading={isLoading} />
        </div>

        {/* スキル表示 */}
        <div className="xl:col-span-2">
          <SkillStatsCard
            skillStats={skillStats}
            isLoading={isLoading}
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>
      </div>
    </div>
  );
}
