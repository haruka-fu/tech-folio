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
