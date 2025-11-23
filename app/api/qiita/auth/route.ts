import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Qiita OAuth認可を開始するAPI
 * GET /api/qiita/auth
 *
 * Qiitaの認可ページにリダイレクトします
 */
export async function GET() {
  const supabase = await createClient();

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
  }

  const clientId = process.env.QIITA_CLIENT_ID || process.env.Qiita_Client_ID;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!clientId) {
    return NextResponse.redirect(
      `${baseUrl}/profile/settings?tab=qiita&error=${encodeURIComponent("Qiita連携の設定が完了していません。管理者にお問い合わせください。")}`
    );
  }

  // CSRF対策のstateを生成（ユーザーIDを含める）
  const state = Buffer.from(
    JSON.stringify({
      userId: user.id,
      timestamp: Date.now(),
    })
  ).toString("base64");

  // Qiita OAuth認可URL
  const authUrl = new URL("https://qiita.com/api/v2/oauth/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("scope", "read_qiita");
  authUrl.searchParams.set("state", state);

  return NextResponse.redirect(authUrl.toString());
}
