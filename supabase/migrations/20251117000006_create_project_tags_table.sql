-- project_tags テーブル作成
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
