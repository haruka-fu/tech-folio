-- tags テーブル作成
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
