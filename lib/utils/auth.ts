// 認証関連のユーティリティ関数

import { createClient } from "@/lib/supabase/client";
import type { CreateProfileParams, CreateAuthProviderParams } from "@/lib/types/auth";

const supabase = createClient();

/** OAuthリダイレクト先URL */
const OAUTH_REDIRECT_URL = `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`;

/**
 * Google OAuth認証を開始
 *
 * @throws {Error} OAuth認証の開始に失敗した場合
 */
export async function startGoogleOAuth(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: OAUTH_REDIRECT_URL,
    },
  });

  if (error) {
    throw error;
  }
}

/**
 * プロフィールをデータベースに作成
 *
 * @param params - プロフィール作成パラメータ
 * @returns 作成されたプロフィールデータ
 * @throws {Error} プロフィール作成に失敗した場合
 */
export async function createProfile(params: CreateProfileParams) {
  const { userId, displayName, email, avatarUrl } = params;

  // デバッグ: 挿入しようとしているデータを確認
  console.log('Creating profile with params:', {
    user_id: userId,
    display_name: displayName,
    email: email,
    avatar_url: avatarUrl,
  });

  // 現在の認証ユーザーを確認
  const { data: { user: currentUser } } = await supabase.auth.getUser();
  console.log('Current auth user:', currentUser?.id);

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      user_id: userId,
      display_name: displayName,
      email: email,
      avatar_url: avatarUrl,
    })
    .select();

  if (error) {
    // エラーの完全な内容をログ出力
    console.error('Profile creation error - Full error object:', error);
    console.error('Profile creation error - Stringified:', JSON.stringify(error, null, 2));
    console.error('Profile creation error - Details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    // より詳細なエラーメッセージを作成
    let errorMessage = 'プロフィールの作成に失敗しました';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.code) {
      errorMessage = `プロフィールの作成に失敗しました (エラーコード: ${error.code})`;
    }

    throw new Error(errorMessage);
  }

  if (!data || data.length === 0) {
    throw new Error('プロフィールの作成に失敗しました: データが返されませんでした');
  }

  console.log('Profile created successfully:', data[0]);
  return data[0];
}

/**
 * 認証プロバイダー情報をデータベースに登録
 *
 * @param params - 認証プロバイダー登録パラメータ
 * @returns 登録された認証プロバイダーデータ
 * @throws {Error} 認証プロバイダー登録に失敗した場合
 */
export async function createAuthProvider(params: CreateAuthProviderParams) {
  const { profileId, providerType, providerUserId, providerEmail } = params;

  const { data, error } = await supabase
    .from('auth_providers')
    .insert({
      profile_id: profileId,
      provider_type: providerType,
      provider_user_id: providerUserId,
      provider_email: providerEmail,
      is_primary: true,
    })
    .select();

  if (error) {
    console.error('Auth provider registration error:', error);
    throw new Error(error.message || '認証プロバイダーの登録に失敗しました');
  }

  if (!data || data.length === 0) {
    throw new Error('認証プロバイダーの登録に失敗しました: データが返されませんでした');
  }

  return data[0];
}

/**
 * プロフィールと認証プロバイダーの存在を検証
 *
 * @param profileId - プロフィールID
 * @throws {Error} レコードの検証に失敗した場合
 */
export async function verifyRegistration(profileId: string): Promise<void> {
  // プロフィールレコードの存在確認
  const { data: verifyProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', profileId)
    .maybeSingle();

  // 認証プロバイダーレコードの存在確認
  const { data: verifyAuthProvider } = await supabase
    .from('auth_providers')
    .select('id')
    .eq('profile_id', profileId)
    .maybeSingle();

  // どちらかのレコードが存在しない場合はエラー
  if (!verifyProfile || !verifyAuthProvider) {
    console.error('Registration verification failed:', {
      profileExists: !!verifyProfile,
      authProviderExists: !!verifyAuthProvider
    });
    throw new Error('登録が完了していません: データベースの検証に失敗しました');
  }

  console.log('Registration verified successfully');
}
