"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase";
import { demoProfile, demoProjects } from "@/lib/demo-data";
import type { SkillStat, RoleStat } from "@/lib/types/profile";
import { calculateSkillStats, calculateRoleStats } from "@/lib/utils/stats";
import ProfileCard from "./_components/ProfileCard";
import RoleStatsCard from "./_components/RoleStatsCard";

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

        // プロジェクトに紐づくタグを取得
        const { data: projectTags, error: projectTagsError } = await supabase
          .from('project_tags')
          .select('tag_id')
          .in('project_id', projectIds);

        if (projectTagsError) throw projectTagsError;

        // タグの使用回数を集計
        const tagCounts = new Map<string, number>();
        projectTags?.forEach(pt => {
          const count = tagCounts.get(pt.tag_id) || 0;
          tagCounts.set(pt.tag_id, count + 1);
        });

        // タグ情報を取得
        const { data: tags, error: tagsError } = await supabase
          .from('tags')
          .select('*')
          .in('id', Array.from(tagCounts.keys()));

        if (tagsError) throw tagsError;

        // タグに使用回数を追加してトップ10を取得
        const stats: SkillStat[] = (tags || [])
          .map(tag => ({
            tagName: tag.name,
            usageCount: tagCounts.get(tag.id) || 0,
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
  const maxUsageCount = Math.max(...skillStats.map((s) => s.usageCount), 1);

  return (
    <div className="space-y-8">
      {/* ページタイトル */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-slate-900 sm:text-4xl">
          スキル一覧
        </h1>
        <p className="text-sm text-slate-600">
          プロジェクト全体でのスキル統計を表示します。
        </p>
      </div>
{/* デモモードバナー */}      {isDemoMode && (        <div className="rounded-lg border border-[#f59e0b] bg-[#fffbeb] p-4 flex items-start gap-3">          <span className="material-symbols-outlined text-[#f59e0b] text-2xl shrink-0">            info          </span>          <div className="flex-1">            <p className="text-sm font-medium text-[#92400e] mb-1">              デモモード            </p>            <p className="text-sm text-[#92400e]">              これはサンプルデータです。実際のスキル統計を管理するには、              <a href="/login" className="underline font-medium hover:text-[#78350f]">                ログイン              </a>              してください。            </p>          </div>        </div>      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 左側: プロフィール情報 */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <ProfileCard profile={profile} isLoading={isLoading} />
          <RoleStatsCard roleStats={roleStats} isLoading={isLoading} />
        </div>

        {/* 右側: スキル表示 */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* ビュー切り替えタブ */}
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
        </div>
      </div>
    </div>
  );
}
