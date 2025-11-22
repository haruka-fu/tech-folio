"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Tag } from "@/lib/supabase";

const supabase = createClient();

export default function TagManagement() {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTags = async () => {
      try {
        // Supabaseからタグを取得
        const { data: tags, error } = await supabase
          .from('tags')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;

        setAllTags(tags || []);
      } catch (error) {
        console.error("Failed to load tags:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTags();
  }, []);

  const filteredTags = allTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900">
          技術タグ管理
        </h1>
        <p className="mt-2 text-base font-normal leading-normal text-gray-500">
          ポートフォリオで使用する技術タグを追加、編集、削除します。
        </p>
      </header>

      <div className="space-y-10">
        <section>
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold leading-tight text-[#111827]">
              新しいタグを追加
            </h2>
            <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row">
              <div className="relative w-full flex-1">
                <label className="sr-only" htmlFor="tag-input">
                  タグ名
                </label>
                <input
                  className="input-field"
                  id="tag-input"
                  placeholder="新しいタグ名を入力 (例: Python)"
                  type="text"
                />
              </div>
              <button className="btn-primary flex h-12 w-full min-w-[84px] items-center justify-center gap-2 sm:w-auto">
                <span className="material-symbols-outlined text-xl">add</span>
                <span className="truncate">追加する</span>
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold leading-tight text-[#111827]">
            登録済みタグ一覧
          </h2>
          <div className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-sm">
            <div className="border-b border-[#E5E7EB] p-4">
              <div className="search-input-wrapper">
                <span className="material-symbols-outlined text-xl">search</span>
                <input
                  className="input-field max-w-sm"
                  placeholder="タグを検索..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="spinner"></div>
              </div>
            ) : filteredTags.length === 0 ? (
              <div className="p-8 text-center">
                <span className="material-symbols-outlined mb-2 text-6xl text-[#6b7280]">
                  sell
                </span>
                <p className="text-lg font-medium text-[#1f2937]">
                  {searchQuery
                    ? "タグが見つかりませんでした"
                    : "タグがありません"}
                </p>
                <p className="mt-1 text-sm text-[#6b7280]">
                  {searchQuery
                    ? "別のキーワードで検索してください"
                    : "新しいタグを追加してください"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#E5E7EB]">
                {filteredTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50/50"
                  >
                    <span className="text-base font-medium text-[#111827]">
                      {tag.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="rounded-md p-2 text-[#6B7280] transition-colors hover:bg-gray-200/60 hover:text-[#111827]">
                        <span className="material-symbols-outlined text-xl">
                          edit
                        </span>
                      </button>
                      <button className="rounded-md p-2 text-[#6B7280] transition-colors hover:bg-red-100 hover:text-[#EF4444]">
                        <span className="material-symbols-outlined text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
