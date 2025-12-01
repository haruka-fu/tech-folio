// プロジェクト関連の型定義

export interface QiitaArticle {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  stocks_count: number;
  created_at: string;
  tags: { name: string }[];
}

export type TimelineItem =
  | { type: "project"; data: import("@/lib/supabase").ProjectWithDetails; date: Date }
  | { type: "qiita"; data: QiitaArticle; date: Date };

export type FilterTab = "all" | "project" | "qiita";
