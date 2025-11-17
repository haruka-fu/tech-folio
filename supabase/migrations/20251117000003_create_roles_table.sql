-- roles テーブル作成
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
