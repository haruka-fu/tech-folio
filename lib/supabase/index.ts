// 型定義
export type Profile = {
  id: string;
  user_id: string;
  display_name: string;
  email: string | null;
  bio: string | null;
  avatar_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  qiita_url: string | null;
  other_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Tag = {
  id: string;
  name: string;
  category: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
};

export type Role = {
  id: number;
  name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  profile_id: string;
  title: string;
  summary: string;
  description: string;
  period_start: string;
  period_end: string | null;
  is_current: boolean;
  roles: number[];
  created_at: string;
  updated_at: string;
};

export type ProjectWithDetails = Project & {
  tags: Tag[];
  role_names: string[];
};

// クライアント作成関数のエクスポート（クライアントサイドのみ）
export { createClient as createBrowserClient } from './client';
