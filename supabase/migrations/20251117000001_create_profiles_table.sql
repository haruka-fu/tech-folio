-- profiles テーブル作成
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
