// Qiita関連の型定義

export interface QiitaArticle {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  stocks_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  tags: { name: string }[];
}

export interface QiitaApiResponse {
  articles: QiitaArticle[];
  username: string | null;
  hasToken: boolean;
  error?: string;
}
