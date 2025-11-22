import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * OAuth認証コールバックハンドラー
 *
 * @description
 * Google OAuth認証後にSupabaseからリダイレクトされるエンドポイント。
 * 認証コードをセッションに交換し、ユーザーの登録状況に応じて適切なページへリダイレクトします。
 *
 * @param request - Next.jsのリクエストオブジェクト
 * @returns リダイレクトレスポンス
 *
 * @flow
 * 1. URLパラメータから認証コード（code）またはエラーを取得
 * 2. エラーがある場合はログインページにリダイレクト
 * 3. 認証コードをセッショントークンに交換
 * 4. ユーザーのプロフィール存在確認
 * 5. プロフィールがない場合は登録ページへ、ある場合はプロジェクト一覧へ
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  // URLパラメータから認証情報を取得
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  // OAuth認証エラーが発生した場合の処理
  if (error) {
    console.error('OAuth authentication error:', {
      error,
      description: errorDescription,
    });

    // エラーメッセージをエンコードしてログインページにリダイレクト
    const errorParam = encodeURIComponent(errorDescription || error);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${errorParam}`
    );
  }

  // 認証コードが存在する場合、セッション交換処理を実行
  if (code) {
    try {
      const supabase = await createClient();

      // 認証コードをセッショントークンに交換
      // これによりユーザーのログイン状態が確立される
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        throw exchangeError;
      }

      // 現在ログイン中のユーザー情報を取得
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('ユーザー情報の取得に失敗しました');
      }

      // ユーザーのプロフィールが既に作成されているか確認
      // maybeSingle()は0件または1件の結果を期待（2件以上の場合はエラー）
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) {
        // プロフィール確認時のエラーをログ出力
        // ただし、プロフィールが存在しない場合は正常なフローなので処理は継続
        console.error('Profile lookup error:', profileError);
      }

      // プロフィールが存在しない場合は新規登録画面へリダイレクト
      // 表示名などの追加情報を入力してもらう
      if (!profile) {
        return NextResponse.redirect(`${requestUrl.origin}/register`);
      }

      // プロフィールが既に存在する場合はプロジェクト一覧ページへ
      return NextResponse.redirect(`${requestUrl.origin}/projects`);

    } catch (error) {
      // 認証コード交換失敗時のエラーハンドリング
      console.error('Authentication error:', error);

      const errorMsg = encodeURIComponent('認証に失敗しました');
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${errorMsg}`
      );
    }
  }

  // codeもerrorもない場合（不正なアクセス）はログインページへリダイレクト
  return NextResponse.redirect(`${requestUrl.origin}/login`);
}
