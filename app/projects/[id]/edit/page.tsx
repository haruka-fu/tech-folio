"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useProjectForm } from "@/lib/hooks/useProjectForm";
import TagSelector from "@/app/_components/TagSelector";
import ProjectBasicFields from "@/app/_components/modal/ProjectBasicFields";
import DateRangeFields from "@/app/_components/modal/DateRangeFields";
import PhaseSelector from "@/app/_components/modal/PhaseSelector";

const supabase = createClient();

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // プロジェクトデータを読み込み
  useEffect(() => {
    const loadProject = async () => {
      try {
        const [
          { data: project, error: projectError },
          { data: allRoles, error: rolesError }
        ] = await Promise.all([
          supabase
            .from('projects')
            .select(`
              *,
              project_tags (
                tags (
                  id,
                  name
                )
              )
            `)
            .eq('id', projectId)
            .single(),
          supabase
            .from('roles')
            .select('*')
            .order('display_order', { ascending: true })
        ]);

        if (projectError) throw projectError;
        if (rolesError) throw rolesError;
        if (!project) throw new Error('プロジェクトが見つかりません');

        // 役割IDから役割名を取得
        let roleNames: string[] = [];
        if (project.roles && project.roles.length > 0 && allRoles) {
          roleNames = project.roles
            .map((roleId: number) => {
              const role = allRoles.find(r => r.id === roleId);
              return role?.name || '';
            })
            .filter((name: string) => name !== '');
        }

        // タグ名を取得
        const tagNames = project.project_tags?.map((pt: any) => pt.tags.name) || [];

        // 日付を YYYY-MM 形式に変換
        const startDate = project.period_start ? project.period_start.substring(0, 7) : "";
        const endDate = project.period_end ? project.period_end.substring(0, 7) : "";

        setFormData({
          title: project.title,
          summary: project.summary,
          description: project.description,
          startDate,
          endDate,
          roles: roleNames,
          tags: tagNames,
        });

        setIsCurrent(project.is_current || false);
        setIsLoading(false);
      } catch (error) {
        console.error('Load error:', error);
        setError(error instanceof Error ? error.message : 'プロジェクトの読み込みに失敗しました');
        setIsLoading(false);
      }
    };

    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // 役割名から役割IDを取得
      const { data: rolesData } = await supabase
        .from('roles')
        .select('id, name')
        .in('name', formData.roles);

      const roleIds = rolesData?.map(role => role.id) || [];

      // 日付を YYYY-MM-DD 形式に変換
      const periodStart = formData.startDate ? `${formData.startDate}-01` : null;
      const periodEnd = formData.endDate && !isCurrent ? `${formData.endDate}-01` : null;

      // プロジェクトを更新
      const { error: projectError } = await supabase
        .from('projects')
        .update({
          title: formData.title,
          summary: formData.summary,
          description: formData.description,
          period_start: periodStart,
          period_end: periodEnd,
          is_current: isCurrent,
          roles: roleIds,
          updated_at: new Date().toISOString(),
        })
        .eq('id', projectId);

      if (projectError) throw projectError;

      // 既存のタグ関連を削除
      const { error: deleteError } = await supabase
        .from('project_tags')
        .delete()
        .eq('project_id', projectId);

      if (deleteError) throw deleteError;

      // 新しいタグの関連を保存
      if (formData.tags.length > 0) {
        const { data: tagsData } = await supabase
          .from('tags')
          .select('id, name')
          .in('name', formData.tags);

        if (tagsData && tagsData.length > 0) {
          const projectTags = tagsData.map(tag => ({
            project_id: projectId,
            tag_id: tag.id,
          }));

          const { error: tagsError } = await supabase
            .from('project_tags')
            .insert(projectTags);

          if (tagsError) throw tagsError;
        }
      }

      // 成功したらプロジェクト一覧へ遷移
      router.push('/projects');
    } catch (error) {
      console.error('Save error:', error);
      setError(error instanceof Error ? error.message : 'プロジェクトの更新に失敗しました');
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-20">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-10">
        {/* ヘッダー */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">プロジェクトを編集</h1>
            <p className="mt-1 text-sm text-gray-500">プロジェクトの詳細情報を編集してください</p>
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
                <span className="truncate">変更を保存</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
