import { createBrowserClient } from '@supabase/ssr';

/**
 * クライアントサイド用のSupabaseクライアントを作成
 *
 * @description
 * ブラウザ環境で使用するSupabaseクライアントインスタンスを生成します。
 * このクライアントは「use client」ディレクティブを持つコンポーネントでのみ使用してください。
 *
 * @returns Supabaseブラウザクライアントインスタンス
 *
 * @throws {Error} 環境変数が設定されていない場合
 *
 * @example
 * ```tsx
 * "use client";
 * import { createClient } from '@/lib/supabase/client';
 *
 * const supabase = createClient();
 * const { data } = await supabase.from('projects').select('*');
 * ```
 */
export function createClient() {
  // 環境変数の存在チェック
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase環境変数が設定されていません。.env.localファイルを確認してください。'
    );
  }

  // ブラウザ用のSupabaseクライアントを作成
  // SSR (Server-Side Rendering) 対応のため @supabase/ssr を使用
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
