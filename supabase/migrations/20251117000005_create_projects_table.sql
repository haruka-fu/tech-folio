-- projects テーブル作成
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
