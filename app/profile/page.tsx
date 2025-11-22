"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Tag, Profile } from "@/lib/supabase";

const supabase = createClient();

interface SkillStat {
  tagName: string;
  usageCount: number;
  tag: Tag;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skillStats, setSkillStats] = useState<SkillStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<"chart" | "grid">("chart");

  // プロジェクトとスキル統計をロード
  useEffect(() => {
    const loadData = async () => {
      try {
        // 認証状態を確認
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          // ログインしていない場合はログインページにリダイレクト
          window.location.href = '/login';
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

        // ユーザーのプロジェクトを取得
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('id')
          .eq('profile_id', profileData.id);

        if (projectsError) throw projectsError;

        if (!projects || projects.length === 0) {
          setSkillStats([]);
          setIsLoading(false);
          return;
        }

        const projectIds = projects.map(p => p.id);

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
          isLoading={isLoading}
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </main>
    </div>
  );
}

interface ViewProps {
  profile: Profile | null;
  skillStats: SkillStat[];
  isLoading: boolean;
  activeView: "chart" | "grid";
  setActiveView: (view: "chart" | "grid") => void;
}

function SkillListView({ profile, skillStats, isLoading, activeView, setActiveView }: ViewProps) {
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 左側: プロフィール情報 */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="spinner"></div>
              </div>
            ) : profile ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  {profile.avatar_url ? (
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-20 h-20 shrink-0"
                      style={{
                        backgroundImage: `url("${profile.avatar_url}")`,
                      }}
                    />
                  ) : (
                    <div className="bg-slate-200 rounded-full w-20 h-20 shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-slate-500">
                        person
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <p className="text-slate-900 text-2xl font-bold leading-tight tracking-[-0.015em]">
                      {profile.display_name}
                    </p>
                    {profile.email && (
                      <p className="text-slate-500 text-sm font-normal leading-normal">
                        {profile.email}
                      </p>
                    )}
                  </div>
                </div>

                {profile.bio && (
                  <>
                    <p className="text-slate-900 text-base font-medium leading-normal mb-1">
                      自己紹介
                    </p>
                    <p className="text-slate-600 text-base font-normal leading-relaxed mb-6">
                      {profile.bio}
                    </p>
                  </>
                )}

                {/* SNSリンク */}
                {(profile.github_url || profile.twitter_url || profile.qiita_url || profile.other_url) && (
                  <>
                    <p className="text-slate-900 text-base font-medium leading-normal mb-3">
                      SNSリンク
                    </p>
                    <div className="flex flex-wrap justify-start gap-4">
                      {profile.github_url && (
                        <a
                          className="flex flex-col items-center justify-center gap-2 text-center w-20 group"
                          href={profile.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200">
                            <svg
                              className="size-6 text-slate-700 group-hover:text-[#2b6cee]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                            </svg>
                          </div>
                          <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                            GitHub
                          </p>
                        </a>
                      )}
                      {profile.twitter_url && (
                        <a
                          className="flex flex-col items-center justify-center gap-2 text-center w-20 group"
                          href={profile.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200">
                            <svg
                              className="size-6 text-slate-700 group-hover:text-[#2b6cee]"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.602.75Zm-1.282 13.025h1.426L3.926 2.165H2.468l8.85 11.61Z"></path>
                            </svg>
                          </div>
                          <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                            X
                          </p>
                        </a>
                      )}
                      {profile.qiita_url && (
                        <a
                          className="flex flex-col items-center justify-center gap-2 text-center w-20 group"
                          href={profile.qiita_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200">
                            <span className="material-symbols-outlined size-6 text-slate-700 group-hover:text-[#2b6cee]">
                              article
                            </span>
                          </div>
                          <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                            Qiita
                          </p>
                        </a>
                      )}
                      {profile.other_url && (
                        <a
                          className="flex flex-col items-center justify-center gap-2 text-center w-20 group"
                          href={profile.other_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200">
                            <span className="material-symbols-outlined size-6 text-slate-700 group-hover:text-[#2b6cee]">
                              link
                            </span>
                          </div>
                          <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                            その他
                          </p>
                        </a>
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-center text-slate-500">プロフィール情報が見つかりません</p>
            )}
          </div>
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
                    <div key={skill.tagName} className="flex items-center gap-4 group">
                      <p className="text-slate-600 font-medium text-sm w-24 shrink-0">
                        {skill.tagName}
                      </p>
                      <div className="flex-1 bg-slate-100 rounded-full h-8 relative">
                        <div
                          className="bg-[#2b6cee] h-full rounded-full flex items-center justify-end pr-3"
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
                      className="flex flex-col items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 p-4"
                    >
                      <p
                        className="text-4xl font-bold text-[#2b6cee]"
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
