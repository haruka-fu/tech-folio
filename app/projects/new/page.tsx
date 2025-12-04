"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useProjectForm } from "@/lib/hooks/useProjectForm";
import TagSelector from "@/app/_components/TagSelector";
import ProjectBasicFields from "@/app/_components/modal/ProjectBasicFields";
import DateRangeFields from "@/app/_components/modal/DateRangeFields";
import PhaseSelector from "@/app/_components/modal/PhaseSelector";

const supabase = createClient();

export default function NewProjectPage() {
  const router = useRouter();
  const {
    formData,
    setFormData,
    isCurrent,
    setIsCurrent,
    availableTags,
    availablePhases,
    handleAddPhase,
    handleRemovePhase,
    handleToggleTag,
    handleRemoveTag,
  } = useProjectForm();

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // ユーザー認証確認
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('User error:', userError);
        throw new Error(`認証エラー: ${userError.message}`);
      }
      if (!user) {
        throw new Error('ログインが必要です');
      }

      console.log('User ID:', user.id);

      // プロフィールID取得
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, user_id')
        .eq('user_id', user.id)
        .maybeSingle();

      console.log('Profile query result:', { profile, profileError });

      if (profileError) {
        throw new Error(`プロフィール取得エラー: ${profileError.message}`);
      }

      if (!profile) {
        throw new Error('プロフィールが見つかりません。登録画面から登録してください。');
      }

      // 役割名から役割IDを取得
      const { data: rolesData, error: rolesError } = await supabase
        .from('roles')
        .select('id, name')
        .in('name', formData.roles);

      console.log('Roles query result:', { rolesData, rolesError, selectedRoles: formData.roles });

      if (rolesError) {
        throw new Error(`役割取得エラー: ${rolesError.message}`);
      }

      const roleIds = rolesData?.map(role => role.id) || [];

      // 日付を YYYY-MM-DD 形式に変換
      const periodStart = formData.startDate ? `${formData.startDate}-01` : null;
      const periodEnd = formData.endDate && !isCurrent ? `${formData.endDate}-01` : null;

      console.log('Saving project with data:', {
        profile_id: profile.id,
        title: formData.title,
        summary: formData.summary,
        description: formData.description,
        period_start: periodStart,
        period_end: periodEnd,
        is_current: isCurrent,
        roles: roleIds,
      });

      // プロジェクトを保存
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          profile_id: profile.id,
          title: formData.title,
          summary: formData.summary,
          description: formData.description,
          period_start: periodStart,
          period_end: periodEnd,
          is_current: isCurrent,
          roles: roleIds,
        })
        .select()
        .single();

      console.log('Project insert result:', { project, projectError });

      if (projectError) throw new Error(`プロジェクト保存エラー: ${projectError.message}`);

      // タグの関連を保存
      if (formData.tags.length > 0) {
        // タグ名からタグIDを取得
        const { data: tagsData, error: tagsQueryError } = await supabase
          .from('tags')
          .select('id, name')
          .in('name', formData.tags);

        console.log('Tags query result:', { tagsData, tagsQueryError, selectedTags: formData.tags });

        if (tagsQueryError) {
          throw new Error(`タグ取得エラー: ${tagsQueryError.message}`);
        }

        if (tagsData && tagsData.length > 0) {
          const projectTags = tagsData.map(tag => ({
            project_id: project.id,
            tag_id: tag.id,
          }));

          console.log('Inserting project tags:', projectTags);

          const { error: tagsError } = await supabase
            .from('project_tags')
            .insert(projectTags);

          console.log('Project tags insert result:', { tagsError });

          if (tagsError) throw new Error(`タグ関連保存エラー: ${tagsError.message}`);
        }
      }

      console.log('Save successful! Redirecting to /projects');

      // 成功したらプロジェクト一覧へ遷移
      router.push('/projects');
    } catch (error) {
      console.error('Save error:', error);
      setError(error instanceof Error ? error.message : 'プロジェクトの保存に失敗しました');
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-20">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-10">
        {/* ヘッダー */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">新規プロジェクト追加</h1>
            <p className="mt-1 text-sm text-gray-500">プロジェクトの詳細情報を入力してください</p>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <span className="material-symbols-outlined text-lg">close</span>
            <span className="hidden sm:inline">閉じる</span>
          </Link>
        </div>

        {/* 注意メッセージ */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600">info</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">このアプリについて</p>
              <p className="mt-1 text-sm text-blue-700">
                Tech Folioはスキルセットを可視化し、アピールするためのポートフォリオツールです。
                実在の企業名や機密情報は入力せず、技術スタックや担当工程などのスキル情報を中心に記載してください。
              </p>
            </div>
          </div>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-600">error</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">エラー</p>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <ProjectBasicFields
              title={formData.title}
              summary={formData.summary}
              description={formData.description}
              onTitleChange={(value) => setFormData({ ...formData, title: value })}
              onSummaryChange={(value) => setFormData({ ...formData, summary: value })}
              onDescriptionChange={(value) => setFormData({ ...formData, description: value })}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <DateRangeFields
              startDate={formData.startDate}
              endDate={formData.endDate}
              isCurrent={isCurrent}
              onStartDateChange={(value) => setFormData({ ...formData, startDate: value })}
              onEndDateChange={(value) => setFormData({ ...formData, endDate: value })}
              onCurrentChange={(checked) => {
                setIsCurrent(checked);
                if (checked) {
                  setFormData({ ...formData, endDate: "" });
                }
              }}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <PhaseSelector
              selectedPhases={formData.roles}
              availablePhases={availablePhases}
              onAddPhase={handleAddPhase}
              onRemovePhase={handleRemovePhase}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <TagSelector
              selectedTags={formData.tags}
              availableTags={availableTags}
              onToggleTag={handleToggleTag}
              onRemoveTag={handleRemoveTag}
            />
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col-reverse items-center justify-end gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="flex h-11 w-full min-w-[84px] items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
            >
              <span className="truncate">キャンセル</span>
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex h-11 w-full min-w-[84px] items-center justify-center rounded-lg bg-[#2b6cee] px-6 text-sm font-bold text-white transition-colors hover:bg-[#2b6cee]/90 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
            >
              {isSaving ? (
                <span className="truncate">保存中...</span>
              ) : (
                <span className="truncate">プロジェクトを追加</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
