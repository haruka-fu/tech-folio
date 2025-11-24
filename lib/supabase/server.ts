import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * サーバーサイド用のSupabaseクライアントを作成
 *
 * @description
 * Next.jsのServer Components、Server Actions、Route Handlersで使用するための
 * Supabaseクライアントインスタンスを生成します。
 * クッキーベースの認証セッション管理を自動的に処理します。
 *
 * @returns Supabaseサーバークライアントインスタンス
 *
 * @throws {Error} 環境変数が設定されていない場合
 *
 * @example
 * ```tsx
 * // Server Component内で使用
 * import { createClient } from '@/lib/supabase/server';
 *
 * export default async function Page() {
 *   const supabase = await createClient();
 *   const { data } = await supabase.from('projects').select('*');
 *   return <div>{JSON.stringify(data)}</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Route Handler内で使用
 * import { createClient } from '@/lib/supabase/server';
 *
 * export async function GET() {
 *   const supabase = await createClient();
 *   const { data } = await supabase.from('projects').select('*');
 *   return Response.json(data);
 * }
 * ```
 */
export async function createClient() {
  // 環境変数の存在チェック
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase環境変数が設定されていません。.env.localファイルを確認してください。'
    );
  }

  // Next.jsのcookiesヘルパーを使用してクッキーストアを取得
  // これによりセッション情報の読み書きが可能になる
  const cookieStore = await cookies();

  // サーバー用のSupabaseクライアントを作成
  // クッキーベースの認証を自動的に処理
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      /**
       * すべてのクッキーを取得
       * @returns クッキーの配列
       */
      getAll() {
        return cookieStore.getAll();
      },

      /**
       * クッキーをセット
       *
       * @param cookiesToSet - セットするクッキーの配列
       *
       * @description
       * Server Componentから呼ばれた場合、クッキーの設定はできないため
       * エラーを無視します。ミドルウェアでセッション更新を行う場合は
       * この挙動で問題ありません。
       */
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch (error) {
          // Server Componentから呼ばれた場合はクッキーの設定ができない
          // ミドルウェアでセッション更新を行っている場合は無視して問題ない
          // 詳細: https://supabase.com/docs/guides/auth/server-side/nextjs
        }
      },
    },
  });
}
