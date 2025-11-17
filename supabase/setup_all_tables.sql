-- ============================================
-- Tech Folio データベース セットアップスクリプト
-- すべてのテーブル、インデックス、トリガーを作成
-- ============================================

-- ============================================
-- 1. profiles テーブル作成
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE
    CHECK (char_length(user_id) >= 4 AND char_length(user_id) <= 20),
  user_id_change_count INTEGER DEFAULT 0 CHECK (user_id_change_count <= 1),
  display_name TEXT NOT NULL CHECK (display_name <> ''),
  email TEXT,
  bio TEXT,
  avatar_url TEXT CHECK (avatar_url IS NULL OR avatar_url ~ '^https?://'),
  github_url TEXT CHECK (github_url IS NULL OR github_url ~ '^https?://'),
  twitter_url TEXT CHECK (twitter_url IS NULL OR twitter_url ~ '^https?://'),
  qiita_url TEXT CHECK (qiita_url IS NULL OR qiita_url ~ '^https?://'),
  other_url TEXT CHECK (other_url IS NULL OR other_url ~ '^https?://'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- コメント
COMMENT ON TABLE profiles IS 'ユーザープロフィール情報';
COMMENT ON COLUMN profiles.id IS 'プロフィールの一意識別子';
COMMENT ON COLUMN profiles.user_id IS 'ユーザーID（4〜20文字、初回登録時+1回変更可能）';
COMMENT ON COLUMN profiles.user_id_change_count IS 'user_id変更回数（最大1回まで）';
COMMENT ON COLUMN profiles.display_name IS '表示名';
COMMENT ON COLUMN profiles.email IS 'メールアドレス（auth_providersから取得）';
COMMENT ON COLUMN profiles.bio IS '自己紹介文';
COMMENT ON COLUMN profiles.avatar_url IS 'プロフィール画像のURL';
COMMENT ON COLUMN profiles.github_url IS 'GitHubプロフィールURL（手動入力）';
COMMENT ON COLUMN profiles.twitter_url IS 'TwitterプロフィールURL（手動入力）';
COMMENT ON COLUMN profiles.qiita_url IS 'QiitaプロフィールURL（手動入力）';
COMMENT ON COLUMN profiles.other_url IS 'その他のURL（個人サイトなど）';

-- ============================================
-- 2. auth_providers テーブル作成
-- ============================================
CREATE TABLE auth_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  provider_type TEXT NOT NULL CHECK (provider_type IN ('google', 'github', 'qiita')),
  provider_user_id TEXT NOT NULL,
  provider_email TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider_type, provider_user_id),
  UNIQUE(profile_id, provider_type)
);

-- インデックス
CREATE INDEX idx_auth_providers_profile_id ON auth_providers(profile_id);
CREATE INDEX idx_auth_providers_type ON auth_providers(provider_type);
CREATE INDEX idx_auth_providers_primary ON auth_providers(is_primary) WHERE is_primary = true;

-- コメント
COMMENT ON TABLE auth_providers IS '認証プロバイダー情報（Google/GitHub/Qiita）';
COMMENT ON COLUMN auth_providers.id IS '認証情報の一意識別子';
COMMENT ON COLUMN auth_providers.profile_id IS 'プロフィールID（外部キー）';
COMMENT ON COLUMN auth_providers.provider_type IS '認証プロバイダーの種類';
COMMENT ON COLUMN auth_providers.provider_user_id IS 'プロバイダー側のユーザーID';
COMMENT ON COLUMN auth_providers.provider_email IS 'プロバイダーから取得したメールアドレス';
COMMENT ON COLUMN auth_providers.is_primary IS 'プライマリー認証かどうか（最初に連携したもの）';

-- ============================================
-- 3. roles テーブル作成
-- ============================================
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE CHECK (name <> ''),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_roles_name ON roles(name);

-- 初期データ投入
INSERT INTO roles (name, display_order) VALUES
  ('要件定義', 1),
  ('基本設計', 2),
  ('詳細設計', 3),
  ('開発', 4),
  ('テスト', 5),
  ('運用', 6);

-- コメント
COMMENT ON TABLE roles IS '役割マスターデータ（全ユーザー共通）';
COMMENT ON COLUMN roles.id IS '役割の一意識別子（連番）';
COMMENT ON COLUMN roles.name IS '役割名';
COMMENT ON COLUMN roles.display_order IS '表示順序';

-- ============================================
-- 4. tags テーブル作成
-- ============================================
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE CHECK (name <> ''),
  category TEXT,
  color TEXT CHECK (color IS NULL OR color ~ '^#[0-9A-Fa-f]{6}$'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_tags_name ON tags(name);

-- コメント
COMMENT ON TABLE tags IS '技術タグマスターデータ';
COMMENT ON COLUMN tags.id IS 'タグの一意識別子';
COMMENT ON COLUMN tags.name IS 'タグ名（例: React, TypeScript）';
COMMENT ON COLUMN tags.category IS 'カテゴリ分類（例: Frontend, Backend, DevOps）';
COMMENT ON COLUMN tags.color IS 'タグの表示色（16進数カラーコード）';

-- ============================================
-- 5. projects テーブル作成
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (title <> ''),
  summary TEXT NOT NULL CHECK (summary <> ''),
  description TEXT NOT NULL CHECK (description <> ''),
  period_start DATE NOT NULL,
  period_end DATE CHECK (period_end IS NULL OR period_end >= period_start),
  is_current BOOLEAN DEFAULT false,
  roles INTEGER[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_projects_profile_id ON projects(profile_id);
CREATE INDEX idx_projects_is_current ON projects(is_current);
CREATE INDEX idx_projects_period ON projects(period_start, period_end);

-- コメント
COMMENT ON TABLE projects IS 'プロジェクト情報';
COMMENT ON COLUMN projects.id IS 'プロジェクトの一意識別子';
COMMENT ON COLUMN projects.profile_id IS 'プロフィールID（外部キー）';
COMMENT ON COLUMN projects.title IS 'プロジェクトタイトル';
COMMENT ON COLUMN projects.summary IS 'プロジェクト概要';
COMMENT ON COLUMN projects.description IS 'プロジェクト詳細説明';
COMMENT ON COLUMN projects.period_start IS 'プロジェクト開始日';
COMMENT ON COLUMN projects.period_end IS 'プロジェクト終了日（NULL=進行中）';
COMMENT ON COLUMN projects.is_current IS '現在進行中かどうか';
COMMENT ON COLUMN projects.roles IS '担当役割IDの配列（rolesテーブル参照）';

-- ============================================
-- 6. project_tags テーブル作成
-- ============================================
CREATE TABLE project_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, tag_id)
);

-- インデックス
CREATE INDEX idx_project_tags_project_id ON project_tags(project_id);
CREATE INDEX idx_project_tags_tag_id ON project_tags(tag_id);

-- コメント
COMMENT ON TABLE project_tags IS 'プロジェクトとタグの多対多関連';
COMMENT ON COLUMN project_tags.id IS '関連レコードの一意識別子';
COMMENT ON COLUMN project_tags.project_id IS 'プロジェクトID（外部キー）';
COMMENT ON COLUMN project_tags.tag_id IS 'タグID（外部キー）';

-- ============================================
-- 7. トリガー作成
-- ============================================

-- updated_at 自動更新トリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- profiles テーブルのトリガー
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- auth_providers テーブルのトリガー
CREATE TRIGGER update_auth_providers_updated_at
BEFORE UPDATE ON auth_providers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- roles テーブルのトリガー
CREATE TRIGGER update_roles_updated_at
BEFORE UPDATE ON roles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- tags テーブルのトリガー
CREATE TRIGGER update_tags_updated_at
BEFORE UPDATE ON tags
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- projects テーブルのトリガー
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- コメント
COMMENT ON FUNCTION update_updated_at_column() IS 'updated_atカラムを自動更新するトリガー関数';

-- ============================================
-- セットアップ完了
-- ============================================
