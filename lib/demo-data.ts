import type { ProjectWithDetails, Profile, Role } from "@/lib/supabase";

// デモ用のサンプルプロジェクトデータ
export const demoProjects: ProjectWithDetails[] = [
  {
    id: "demo-1",
    profile_id: "demo",
    title: "ECサイトリニューアルプロジェクト",
    summary: "大手ECサイトのフロントエンド全面リニューアル。React/Next.jsを使用したモダンなSPAを構築。",
    description: "既存のECサイトをモダンな技術スタックでリニューアルするプロジェクト。React/Next.jsを使用してSPAを構築し、ユーザー体験の向上とパフォーマンスの改善を実現しました。",
    period_start: "2024-01",
    period_end: "2024-06",
    is_current: false,
    roles: [1, 2],
    role_names: ["要件定義", "基本設計"],
    tags: [
      { id: "1", name: "React", category: "フロントエンド", color: "#61DAFB", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "2", name: "Next.js", category: "フロントエンド", color: "#000000", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "3", name: "TypeScript", category: "言語", color: "#3178C6", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "4", name: "Tailwind CSS", category: "フロントエンド", color: "#06B6D4", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
    ],
    created_at: "2024-01-01",
    updated_at: "2024-06-30",
  },
  {
    id: "demo-2",
    profile_id: "demo",
    title: "社内業務システム開発",
    summary: "勤怠管理・経費精算を統合した社内システムをフルスタックで開発。API設計からフロントエンドまで担当。",
    description: "勤怠管理と経費精算を統合した社内システムをフルスタックで開発。Node.js/Expressによるバックエンド、Vue.jsによるフロントエンド、PostgreSQLによるデータベース設計を担当しました。",
    period_start: "2023-07",
    period_end: "2023-12",
    is_current: false,
    roles: [2, 3, 4],
    role_names: ["基本設計", "詳細設計", "実装"],
    tags: [
      { id: "5", name: "Node.js", category: "バックエンド", color: "#339933", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "6", name: "Express", category: "バックエンド", color: "#000000", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "7", name: "PostgreSQL", category: "データベース", color: "#4169E1", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "8", name: "Vue.js", category: "フロントエンド", color: "#4FC08D", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
    ],
    created_at: "2023-07-01",
    updated_at: "2023-12-31",
  },
  {
    id: "demo-3",
    profile_id: "demo",
    title: "モバイルアプリ開発プロジェクト",
    summary: "iOS/Android向けネイティブアプリの開発。React Nativeを使用したクロスプラットフォーム開発。",
    description: "iOS/Android向けのモバイルアプリをReact Nativeでクロスプラットフォーム開発。Firebaseを活用したバックエンド、Reduxによる状態管理を実装し、効率的な開発を実現しました。",
    period_start: "2024-07",
    period_end: null,
    is_current: true,
    roles: [3, 4],
    role_names: ["詳細設計", "実装"],
    tags: [
      { id: "9", name: "React Native", category: "モバイル", color: "#61DAFB", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "3", name: "TypeScript", category: "言語", color: "#3178C6", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "10", name: "Firebase", category: "バックエンド", color: "#FFCA28", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "11", name: "Redux", category: "フロントエンド", color: "#764ABC", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
    ],
    created_at: "2024-07-01",
    updated_at: "2024-11-30",
  },
  {
    id: "demo-4",
    profile_id: "demo",
    title: "レガシーシステムマイグレーション",
    summary: "オンプレミスで稼働していたシステムをAWSへ移行。インフラ設計からCI/CD構築まで実施。",
    description: "オンプレミスで稼働していたレガシーシステムをAWSクラウドへ移行。Dockerコンテナ化、Terraformによるインフラコード化、GitHub Actionsを使用したCI/CDパイプラインの構築を実施しました。",
    period_start: "2023-01",
    period_end: "2023-06",
    is_current: false,
    roles: [1, 2, 3],
    role_names: ["要件定義", "基本設計", "詳細設計"],
    tags: [
      { id: "12", name: "AWS", category: "インフラ", color: "#FF9900", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "13", name: "Docker", category: "インフラ", color: "#2496ED", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "14", name: "Terraform", category: "インフラ", color: "#7B42BC", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "15", name: "GitHub Actions", category: "CI/CD", color: "#2088FF", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
    ],
    created_at: "2023-01-01",
    updated_at: "2023-06-30",
  },
  {
    id: "demo-5",
    profile_id: "demo",
    title: "データ分析基盤構築",
    summary: "ビッグデータ分析のための基盤を構築。データパイプライン設計とダッシュボード開発を担当。",
    description: "ビッグデータ分析のための基盤をゼロから構築。Pythonによるデータパイプライン設計、Apache Sparkによる大規模データ処理、BigQueryでのデータウェアハウス構築、Tableauによる可視化ダッシュボード開発を担当しました。",
    period_start: "2022-10",
    period_end: "2023-03",
    is_current: false,
    roles: [2, 3, 4],
    role_names: ["基本設計", "詳細設計", "実装"],
    tags: [
      { id: "16", name: "Python", category: "言語", color: "#3776AB", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "17", name: "Apache Spark", category: "データ処理", color: "#E25A1C", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "18", name: "BigQuery", category: "データベース", color: "#4285F4", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
      { id: "19", name: "Tableau", category: "BI", color: "#E97627", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
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
export const demoProfile: Profile = {
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
  qiita_access_token: null,
  created_at: "2022-01-01T00:00:00Z",
  updated_at: "2024-11-30T00:00:00Z",
};

// デモ用のロールデータ
export const demoRoles: Role[] = [
  { id: 1, name: "要件定義", display_order: 1, created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: 2, name: "基本設計", display_order: 2, created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: 3, name: "詳細設計", display_order: 3, created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: 4, name: "実装", display_order: 4, created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: 5, name: "テスト", display_order: 5, created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: 6, name: "保守運用", display_order: 6, created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
];

// デモ用のタグマスターデータ（データベースと同じ色を使用）
export const demoTags = [
  { id: "1", name: "React", category: "Frontend", color: "#06B6D4", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "2", name: "Next.js", category: "Frontend", color: "#000000", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "3", name: "TypeScript", category: "Frontend", color: "#3B82F6", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "4", name: "Tailwind CSS", category: "Frontend", color: "#06B6D4", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "5", name: "Node.js", category: "Backend", color: "#84CC16", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "6", name: "Express", category: "Backend", color: "#1F2937", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "7", name: "PostgreSQL", category: "Database", color: "#3B82F6", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "8", name: "Vue.js", category: "Frontend", color: "#10B981", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "9", name: "React Native", category: "Mobile", color: "#06B6D4", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "10", name: "Firebase", category: "Database", color: "#F59E0B", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "11", name: "Redux", category: "Frontend", color: "#7C3AED", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "12", name: "AWS", category: "Cloud", color: "#FF9900", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "13", name: "Docker", category: "DevOps", color: "#2563EB", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "14", name: "Terraform", category: "DevOps", color: "#7C3AED", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "15", name: "GitHub Actions", category: "DevOps", color: "#1D4ED8", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "16", name: "Python", category: "Language", color: "#3B82F6", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "17", name: "Apache Spark", category: "Backend", color: "#E25A1C", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "18", name: "BigQuery", category: "Database", color: "#4285F4", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "19", name: "Tableau", category: "Backend", color: "#E97627", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "20", name: "Supabase", category: "Database", color: "#10B981", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "21", name: "CSS", category: "Frontend", color: "#2563EB", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "22", name: "Lambda", category: "Cloud", color: "#FF9900", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
  { id: "23", name: "DevOps", category: "DevOps", color: "#3B82F6", created_at: "2022-01-01T00:00:00Z", updated_at: "2022-01-01T00:00:00Z" },
];
