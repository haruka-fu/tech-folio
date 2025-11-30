"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import QiitaIntegration from "./_components/QiitaIntegration";
import SNSLinksForm from "./_components/SNSLinksForm";
import { useAuth } from "@/lib/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type SettingsTab = "profile" | "qiita";

export default function ProfileSettingsPage() {
  const { profile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [displayNameError, setDisplayNameError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    display_name: "",
    bio: "",
    twitter_url: "",
    github_url: "",
    qiita_url: "",
    other_url: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // アイコン選択
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 保存処理
  const handleSave = async () => {
    if (!profile) return;

    setIsSaving(true);
    setDisplayNameError(null);

    try {
      let avatarUrl = profile.avatar_url;

      // アイコンがアップロードされている場合
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
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

      alert('プロフィールを保存しました');
      window.location.reload();
    } catch (error) {
      console.error('Save error:', error);
      alert('保存に失敗しました');
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
        <aside className="flex w-64 flex-col gap-8 border-r border-gray-200 bg-white p-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 px-2 py-2">
              <span className="material-symbols-outlined text-3xl text-[#2b6cee]">
                folder_special
              </span>
              <h1 className="text-xl font-bold leading-normal text-gray-900">
                TechFolio
              </h1>
            </Link>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal transition-colors text-left ${
                  activeTab === "profile"
                    ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={
                    activeTab === "profile"
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  person
                </span>
                <p>プロフィール設定</p>
              </button>
              <button
                onClick={() => setActiveTab("qiita")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal transition-colors text-left ${
                  activeTab === "qiita"
                    ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={
                    activeTab === "qiita"
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  link
                </span>
                <p>Qiita連携</p>
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex flex-1 flex-col p-6 md:p-10">
          <div className="mx-auto w-full max-w-4xl">
            {activeTab === "profile" && (
              <>
                <header className="mb-8">
                  <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900">
                    プロフィール編集
                  </h1>
                  <p className="mt-2 text-base font-normal leading-normal text-gray-500">
                    あなたの公開プロフィール情報を管理・編集します。
                  </p>
                </header>

            <div className="flex flex-col gap-8">
              <section className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    基本情報
                  </h2>
                </div>
                <div className="flex w-full flex-col gap-4 md:flex-row md:items-center justify-between border-b pb-6">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      {avatarPreview || profile?.avatar_url ? (
                        <div
                          className="w-24 h-24 rounded-full bg-cover bg-center bg-no-repeat border-2 border-slate-200"
                          data-alt="Current user avatar"
                          style={{
                            backgroundImage: `url("${avatarPreview || profile?.avatar_url}")`,
                          }}
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center border-2 border-slate-300">
                          <span className="material-symbols-outlined text-4xl text-slate-500">
                            person
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={handleAvatarClick}
                        className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#4A90E2] text-white hover:bg-[#4A90E2]/90 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">
                          edit
                        </span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
                <form className="grid grid-cols-1 gap-y-6 pt-6">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="grow">
                      <label
                        className="text-gray-800 text-base font-medium leading-normal pb-2 block"
                        htmlFor="display-name"
                      >
                        表示名
                      </label>
                      <input
                        className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal ${
                          displayNameError ? 'border-red-500' : 'border-gray-300'
                        }`}
                        id="display-name"
                        type="text"
                        value={formData.display_name}
                        onChange={(e) => {
                          setFormData({ ...formData, display_name: e.target.value });
                          setDisplayNameError(null);
                        }}
                        placeholder="表示名を入力"
                      />
                      {displayNameError && (
                        <p className="mt-1 text-sm text-red-600">
                          {displayNameError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div>
                      <label
                        className="text-gray-800 text-base font-medium leading-normal pb-2 block"
                        htmlFor="bio"
                      >
                        自己紹介
                      </label>
                      <textarea
                        className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
                        id="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="自己紹介を入力"
                      />
                    </div>
                  </div>
                </form>
              </section>

              <SNSLinksForm
                formData={formData}
                onChange={(field, value) => setFormData({ ...formData, [field]: value })}
              />

                <div className="flex flex-col-reverse items-center justify-end gap-3 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    disabled={isSaving}
                    className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-white border border-gray-300 text-gray-700 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="truncate">キャンセル</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
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
