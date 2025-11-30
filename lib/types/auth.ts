// 認証関連の型定義

/** プロフィール作成時のパラメータ */
export interface CreateProfileParams {
  userId: string;
  displayName: string;
  email: string | undefined;
  avatarUrl: string | undefined;
}

/** 認証プロバイダー登録時のパラメータ */
export interface CreateAuthProviderParams {
  profileId: string;
  providerType: string;
  providerUserId: string;
  providerEmail: string | undefined;
}
