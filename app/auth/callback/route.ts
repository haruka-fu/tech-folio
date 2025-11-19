import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  if (error) {
    console.error('Auth callback error:', error, errorDescription);
    const errorParam = encodeURIComponent(errorDescription || error);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${errorParam}`
    );
  }

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        throw exchangeError;
      }

      // ログインユーザーを取得
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('ユーザー情報の取得に失敗しました');
      }

      // プロフィールが存在するか確認
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile check error:', profileError);
      }

      // プロフィールが存在しない場合は登録画面へ
      if (!profile) {
        return NextResponse.redirect(`${requestUrl.origin}/register`);
      }

      // プロフィールが存在する場合はプロジェクト一覧へ
      return NextResponse.redirect(`${requestUrl.origin}/projects`);
    } catch (error) {
      console.error('Code exchange error:', error);
      const errorMsg = encodeURIComponent('認証に失敗しました');
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${errorMsg}`
      );
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/login`);
}
