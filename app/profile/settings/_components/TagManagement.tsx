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
          技術タグ一覧
        </h1>
        <p className="mt-2 text-base font-normal leading-normal text-gray-500">
          プロジェクトで使用できる技術タグの一覧です。
        </p>
      </header>

      <div className="space-y-10">
        <section>
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
                    : ""}
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 p-4">
                {filteredTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium"
                    style={{
                      backgroundColor: tag.color ? `${tag.color}20` : '#f3f4f6',
                      color: tag.color || '#374151'
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
