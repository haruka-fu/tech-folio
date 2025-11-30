import type { ProjectWithDetails, Profile } from "@/lib/supabase";

// デモ用のサンプルプロジェクトデータ
export const demoProjects: ProjectWithDetails[] = [
  {
    id: "demo-1",
    profile_id: "demo",
    title: "ECサイトリニューアルプロジェクト",
    summary: "大手ECサイトのフロントエンド全面リニューアル。React/Next.jsを使用したモダンなSPAを構築。",
    period_start: "2024-01",
    period_end: "2024-06",
    is_current: false,
    roles: [1, 2],
    role_names: ["要件定義", "基本設計"],
    tags: [
      { id: "1", name: "React", color: "#61DAFB" },
      { id: "2", name: "Next.js", color: "#000000" },
      { id: "3", name: "TypeScript", color: "#3178C6" },
      { id: "4", name: "Tailwind CSS", color: "#06B6D4" },
    ],
    created_at: "2024-01-01",
    updated_at: "2024-06-30",
  },
  {
    id: "demo-2",
    profile_id: "demo",
    title: "社内業務システム開発",
    summary: "勤怠管理・経費精算を統合した社内システムをフルスタックで開発。API設計からフロントエンドまで担当。",
    period_start: "2023-07",
    period_end: "2023-12",
    is_current: false,
    roles: [2, 3, 4],
    role_names: ["基本設計", "詳細設計", "実装"],
    tags: [
      { id: "5", name: "Node.js", color: "#339933" },
      { id: "6", name: "Express", color: "#000000" },
      { id: "7", name: "PostgreSQL", color: "#4169E1" },
      { id: "8", name: "Vue.js", color: "#4FC08D" },
    ],
    created_at: "2023-07-01",
    updated_at: "2023-12-31",
  },
  {
    id: "demo-3",
    profile_id: "demo",
    title: "モバイルアプリ開発プロジェクト",
    summary: "iOS/Android向けネイティブアプリの開発。React Nativeを使用したクロスプラットフォーム開発。",
    period_start: "2024-07",
    period_end: null,
    is_current: true,
    roles: [3, 4],
    role_names: ["詳細設計", "実装"],
    tags: [
      { id: "9", name: "React Native", color: "#61DAFB" },
      { id: "3", name: "TypeScript", color: "#3178C6" },
      { id: "10", name: "Firebase", color: "#FFCA28" },
      { id: "11", name: "Redux", color: "#764ABC" },
    ],
    created_at: "2024-07-01",
    updated_at: "2024-11-30",
  },
  {
    id: "demo-4",
    profile_id: "demo",
    title: "レガシーシステムマイグレーション",
    summary: "オンプレミスで稼働していたシステムをAWSへ移行。インフラ設計からCI/CD構築まで実施。",
    period_start: "2023-01",
    period_end: "2023-06",
    is_current: false,
    roles: [1, 2, 3],
    role_names: ["要件定義", "基本設計", "詳細設計"],
    tags: [
      { id: "12", name: "AWS", color: "#FF9900" },
      { id: "13", name: "Docker", color: "#2496ED" },
      { id: "14", name: "Terraform", color: "#7B42BC" },
      { id: "15", name: "GitHub Actions", color: "#2088FF" },
    ],
    created_at: "2023-01-01",
    updated_at: "2023-06-30",
  },
  {
    id: "demo-5",
    profile_id: "demo",
    title: "データ分析基盤構築",
    summary: "ビッグデータ分析のための基盤を構築。データパイプライン設計とダッシュボード開発を担当。",
    period_start: "2022-10",
    period_end: "2023-03",
    is_current: false,
    roles: [2, 3, 4],
    role_names: ["基本設計", "詳細設計", "実装"],
    tags: [
      { id: "16", name: "Python", color: "#3776AB" },
      { id: "17", name: "Apache Spark", color: "#E25A1C" },
      { id: "18", name: "BigQuery", color: "#4285F4" },
      { id: "19", name: "Tableau", color: "#E97627" },
    ],
    created_at: "2022-10-01",
    updated_at: "2023-03-31",
  },
];

// Qiita記事の型定義
export interface QiitaArticle {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  stocks_count: number;
  created_at: string;
  tags: { name: string }[];
}

// デモ用のQiita記事データ
export const demoQiitaArticles: QiitaArticle[] = [
  {
    id: "qiita-demo-1",
    title: "Next.js 16でApp Routerを使った最新のWebアプリケーション開発",
    url: "#",
    likes_count: 125,
    stocks_count: 89,
    created_at: "2024-08-15T10:00:00Z",
    tags: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
    ],
  },
  {
    id: "qiita-demo-2",
    title: "Supabaseを使ったリアルタイム認証の実装方法",
    url: "#",
    likes_count: 98,
    stocks_count: 67,
    created_at: "2024-07-20T14:30:00Z",
    tags: [
      { name: "Supabase" },
      { name: "PostgreSQL" },
      { name: "認証" },
    ],
  },
  {
    id: "qiita-demo-3",
    title: "TailwindCSSで作る美しいUIコンポーネント集",
    url: "#",
    likes_count: 156,
    stocks_count: 112,
    created_at: "2024-06-10T09:15:00Z",
    tags: [
      { name: "Tailwind CSS" },
      { name: "CSS" },
      { name: "デザイン" },
    ],
  },
  {
    id: "qiita-demo-4",
    title: "AWS Lambdaとサーバーレスアーキテクチャの実践",
    url: "#",
    likes_count: 78,
    stocks_count: 54,
    created_at: "2024-05-05T16:45:00Z",
    tags: [
      { name: "AWS" },
      { name: "Lambda" },
      { name: "サーバーレス" },
    ],
  },
  {
    id: "qiita-demo-5",
    title: "Dockerを使った開発環境の効率化テクニック",
    url: "#",
    likes_count: 92,
    stocks_count: 71,
    created_at: "2024-04-12T11:20:00Z",
    tags: [
      { name: "Docker" },
      { name: "DevOps" },
      { name: "環境構築" },
    ],
  },
];

// デモ用のプロフィールデータ
export const demoProfile = {
  id: "demo-profile-1",
  user_id: "demo-user",
  display_name: "山田 太郎",
  email: "demo@example.com",
  avatar_url: null,
  bio: "フルスタックエンジニアとして5年以上の経験があります。React/Next.jsを中心としたフロントエンド開発から、Node.js/Pythonを使ったバックエンド開発まで幅広く対応可能です。",
  github_url: "https://github.com",
  twitter_url: "https://twitter.com",
  qiita_url: "https://qiita.com",
  other_url: null,
  qiita_token_encrypted: null,
  created_at: "2022-01-01T00:00:00Z",
  updated_at: "2024-11-30T00:00:00Z",
};
