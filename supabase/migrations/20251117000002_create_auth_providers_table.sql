-- auth_providers テーブル作成
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
