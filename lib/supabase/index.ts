/**
 * Supabase関連の型定義とクライアント作成関数のエクスポート
 *
 * @module lib/supabase
 */

// ========================================
// データベーステーブルの型定義
// ========================================

/**
 * プロフィールテーブルの型定義
 *
 * @description
 * ユーザーの基本情報とSNSリンクを管理するテーブル
 */
export type Profile = {
  /** プロフィールID (UUID) */
  id: string;
  /** Supabase AuthのユーザーID */
  user_id: string;
  /** 表示名 */
  display_name: string;
  /** ユーザーID変更回数（1回のみ変更可能） */
  user_id_change_count: number;
  /** メールアドレス */
  email: string | null;
  /** 自己紹介 */
  bio: string | null;
  /** アバター画像URL */
  avatar_url: string | null;
  /** GitHub URL */
  github_url: string | null;
  /** Twitter/X URL */
  twitter_url: string | null;
  /** Qiita URL */
  qiita_url: string | null;
  /** その他のURL */
  other_url: string | null;
  /** Qiita APIアクセストークン */
  qiita_access_token: string | null;
  /** 作成日時 */
  created_at: string;
  /** 更新日時 */
  updated_at: string;
};

/**
 * 認証プロバイダーテーブルの型定義
 *
 * @description
 * ユーザーが使用している認証プロバイダー情報を管理
 */
export type AuthProvider = {
  /** 認証プロバイダーID (UUID) */
  id: string;
  /** プロフィールID（外部キー） */
  profile_id: string;
  /** プロバイダー種別 (google, github等) */
  provider_type: string;
  /** プロバイダー側のユーザーID */
  provider_user_id: string;
  /** プロバイダー側のメールアドレス */
  provider_email: string | null;
  /** メイン認証かどうか */
  is_primary: boolean;
  /** 作成日時 */
  created_at: string;
  /** 更新日時 */
  updated_at: string;
};

/**
 * タグテーブルの型定義
 *
 * @description
 * プロジェクトに紐づく技術タグを管理
 */
export type Tag = {
  /** タグID (UUID) */
  id: string;
  /** タグ名 (例: React, TypeScript) */
  name: string;
  /** カテゴリ (例: フロントエンド、バックエンド) */
  category: string | null;
  /** 表示色 (HEXカラーコード) */
  color: string | null;
  /** 作成日時 */
  created_at: string;
  /** 更新日時 */
  updated_at: string;
};

/**
 * 工程・役割テーブルの型定義
 *
 * @description
 * プロジェクト内での担当工程を管理（要件定義、設計、開発等）
 */
export type Role = {
  /** 役割ID */
  id: number;
  /** 役割名 (例: 要件定義、開発) */
  name: string;
  /** 表示順序 */
  display_order: number;
  /** 作成日時 */
  created_at: string;
  /** 更新日時 */
  updated_at: string;
};

/**
 * プロジェクトテーブルの型定義
 *
 * @description
 * ユーザーが参加したプロジェクトの情報を管理
 */
export type Project = {
  /** プロジェクトID (UUID) */
  id: string;
  /** プロフィールID（外部キー） */
  profile_id: string;
  /** プロジェクト名 */
  title: string;
  /** 概要（1-2行の簡潔な説明） */
  summary: string;
  /** 詳細説明 */
  description: string;
  /** 開始日 (YYYY-MM-DD) */
  period_start: string;
  /** 終了日 (YYYY-MM-DD) ※進行中の場合はnull */
  period_end: string | null;
  /** 現在進行中かどうか */
  is_current: boolean;
  /** 担当工程のID配列 */
  roles: number[];
  /** 作成日時 */
  created_at: string;
  /** 更新日時 */
  updated_at: string;
};

// ========================================
// 拡張型定義
// ========================================

/**
 * タグと役割名を含むプロジェクト型
 *
 * @description
 * プロジェクト一覧表示時など、関連データを結合した形で取得する場合に使用
 */
export type ProjectWithDetails = Project & {
  /** 紐づくタグの配列 */
  tags: Tag[];
  /** 担当工程の名前配列（IDから変換済み） */
  role_names: string[];
};

// ========================================
// クライアント作成関数のエクスポート
// ========================================

/**
 * ブラウザ用のSupabaseクライアント作成関数
 *
 * @description
 * クライアントサイド（'use client'コンポーネント）で使用
 */
export { createClient as createBrowserClient } from './client';

/**
 * サーバー用のSupabaseクライアント作成関数
 *
 * @description
 * Server Components、Route Handlers、Server Actionsで使用
 */
export { createClient as createServerClient } from './server';
