/**
 * Vercel環境やローカル開発環境に対応したサイトURLを取得する
 *
 * @returns アプリケーションのベースURL
 */
export function getSiteURL(): string {
  // 本番環境のサイトURL（環境変数で設定）
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Vercelの環境変数で設定
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Vercelが自動設定
    'http://localhost:3000' // ローカル開発環境

  // httpsプレフィックスを確認（localhostを除く）
  url = url.startsWith('http') ? url : `https://${url}`

  // 末尾のスラッシュを確認
  url = url.endsWith('/') ? url : `${url}/`

  return url
}
