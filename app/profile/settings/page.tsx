"use client";

import { useState, useEffect } from "react";
import QiitaIntegration from "./_components/QiitaIntegration";
import SNSLinksForm from "./_components/SNSLinksForm";
import SettingsSidebar from "./_components/SettingsSidebar";
import ProfileHeader from "./_components/ProfileHeader";
import AvatarUpload from "./_components/AvatarUpload";
import BasicInfoForm from "./_components/BasicInfoForm";
import { useAuth } from "@/lib/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type SettingsTab = "profile" | "qiita";

export default function ProfileSettingsPage() {
  const { profile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [displayNameError, setDisplayNameError] = useState<string | null>(null);
  const [isDisplayNameValid, setIsDisplayNameValid] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    display_name: "",
    bio: "",
    twitter_url: "",
    github_url: "",
    qiita_url: "",
    other_url: "",
  });

  // プロフィールデータが読み込まれたらフォームを初期化
  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || "",
        bio: profile.bio || "",
        twitter_url: profile.twitter_url || "",
        github_url: profile.github_url || "",
        qiita_url: profile.qiita_url || "",
        other_url: profile.other_url || "",
      });
    }
  }, [profile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.onerror = () => {
        setError('ファイルの読み込みに失敗しました');
      };
      reader.readAsDataURL(file);
    }
  };

  // 保存処理
  const handleSave = async () => {
    if (!profile) return;

    setIsSaving(true);
    setDisplayNameError(null);
    setError(null);
    setSuccessMessage(null);

    try {
      let avatarUrl = profile.avatar_url;

      // アイコンがアップロードされている場合
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop() || 'jpg';
        const fileName = `${profile.id}.${fileExt}`;

        // Supabase Storageにアップロード
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile, { upsert: true });

        if (uploadError) throw uploadError;

        // 公開URLを取得
        const { data } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        avatarUrl = data.publicUrl;
      }

      // プロフィールを更新
      const updateData: {
        display_name: string;
        bio: string | null;
        twitter_url: string | null;
        github_url: string | null;
        qiita_url: string | null;
        other_url: string | null;
        avatar_url: string | null;
      } = {
        display_name: formData.display_name,
        bio: formData.bio || null,
        twitter_url: formData.twitter_url || null,
        github_url: formData.github_url || null,
        qiita_url: formData.qiita_url || null,
        other_url: formData.other_url || null,
        avatar_url: avatarUrl,
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', profile.id);

      if (error) throw error;

      setSuccessMessage('プロフィールを保存しました');
      setAvatarFile(null);
      setAvatarPreview(null);

      // 3秒後にメッセージを消す
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Save error:', error);

      // データベースのユニーク制約エラーを検出
      if (error instanceof Error && (error.message.includes('duplicate') || error.message.includes('unique'))) {
        setDisplayNameError('この表示名は既に使用されています。別の表示名を入力してください。');
        setError('この表示名は既に使用されています。別の表示名を入力してください。');
      } else {
        setError(error instanceof Error ? error.message : '保存に失敗しました');
      }
    } finally {
      setIsSaving(false);
    }
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
    <div className="relative flex min-h-screen w-full flex-col bg-[#F7F8FA]">
      <div className="flex h-full flex-1">
        <SettingsSidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex flex-1 flex-col p-6 md:p-10">
          {/* トグルボタン（laptop以下で表示） */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed left-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-lg bg-white border border-gray-200 shadow-md laptop:hidden hover:bg-gray-50 transition-colors"
            aria-label="メニューを開く"
          >
            <span className="material-symbols-outlined text-2xl text-gray-700">
              menu
            </span>
          </button>
          <div className="mx-auto w-full max-w-4xl">
            {activeTab === "profile" && (
              <>
                <ProfileHeader />

                {/* 成功メッセージ */}
                {successMessage && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600">
                        check_circle
                      </span>
                      <p className="text-sm text-green-800">{successMessage}</p>
                    </div>
                  </div>
                )}

                {/* エラーメッセージ */}
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-red-600">
                        error
                      </span>
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                )}

            <div className="flex flex-col gap-8">
              <section className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    基本情報
                  </h2>
                </div>
                <AvatarUpload
                  avatarPreview={avatarPreview}
                  currentAvatarUrl={profile?.avatar_url}
                  onFileChange={handleFileChange}
                />
                <BasicInfoForm
                  displayName={formData.display_name}
                  bio={formData.bio}
                  displayNameError={displayNameError}
                  currentUserId={profile?.user_id || ""}
                  onDisplayNameChange={(value) => {
                    setFormData({ ...formData, display_name: value });
                    setDisplayNameError(null);
                  }}
                  onBioChange={(value) =>
                    setFormData({ ...formData, bio: value })
                  }
                  onValidationChange={(isValid) => setIsDisplayNameValid(isValid)}
                />
              </section>

              <SNSLinksForm
                formData={formData}
                onChange={(field, value) => setFormData({ ...formData, [field]: value })}
              />

                <div className="flex flex-col-reverse items-center justify-end gap-3 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      if (profile) {
                        setFormData({
                          display_name: profile.display_name || "",
                          bio: profile.bio || "",
                          twitter_url: profile.twitter_url || "",
                          github_url: profile.github_url || "",
                          qiita_url: profile.qiita_url || "",
                          other_url: profile.other_url || "",
                        });
                        setAvatarFile(null);
                        setAvatarPreview(null);
                        setError(null);
                        setSuccessMessage(null);
                      }
                    }}
                    disabled={isSaving}
                    className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-white border border-gray-300 text-gray-700 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="truncate">キャンセル</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving || !isDisplayNameValid}
                    className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-[#2b6cee] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2b6cee]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <span className="truncate">保存中...</span>
                    ) : (
                      <span className="truncate">変更を保存</span>
                    )}
                  </button>
                </div>
              </div>
              </>
            )}

            {activeTab === "qiita" && <QiitaIntegration />}
          </div>
        </main>
      </div>
    </div>
  );
}
