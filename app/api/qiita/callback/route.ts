import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Qiita OAuthコールバックを処理するAPI
 * GET /api/qiita/callback?code=xxx&state=xxx
 *
 * 認可コードをアクセストークンに交換し、DBに保存します
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const settingsUrl = `${baseUrl}/profile/settings?tab=qiita`;

  // エラーチェック
  if (error) {
    console.error("Qiita OAuth error:", error);
    return NextResponse.redirect(
      `${settingsUrl}&error=${encodeURIComponent("Qiita認証がキャンセルされました")}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${settingsUrl}&error=${encodeURIComponent("認証パラメータが不足しています")}`
    );
  }

  // stateを検証
  let stateData: { userId: string; timestamp: number };
  try {
    stateData = JSON.parse(Buffer.from(state, "base64").toString());
  } catch {
    return NextResponse.redirect(
      `${settingsUrl}&error=${encodeURIComponent("不正なstateパラメータです")}`
    );
  }

  // タイムスタンプチェック（10分以内）
  if (Date.now() - stateData.timestamp > 10 * 60 * 1000) {
    return NextResponse.redirect(
      `${settingsUrl}&error=${encodeURIComponent("認証がタイムアウトしました")}`
    );
  }

  const supabase = await createClient();

  // 現在のユーザーを確認
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== stateData.userId) {
    return NextResponse.redirect(
      `${settingsUrl}&error=${encodeURIComponent("ユーザー認証エラー")}`
    );
  }

  // 環境変数チェック
  const clientId = process.env.QIITA_CLIENT_ID || process.env.Qiita_Client_ID;
  const clientSecret = process.env.QIITA_CLIENT_SECRET || process.env.Qiita_Client_Secret;

  if (!clientId || !clientSecret) {
    console.error("Missing Qiita OAuth credentials");
    return NextResponse.redirect(
      `${settingsUrl}&error=${encodeURIComponent("サーバー設定エラー")}`
    );
  }

  // アクセストークンを取得
  try {
    const tokenResponse = await fetch("https://qiita.com/api/v2/access_tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Qiita token exchange failed:", errorText);
      return NextResponse.redirect(
        `${settingsUrl}&error=${encodeURIComponent("トークン取得に失敗しました")}`
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.token;

    if (!accessToken) {
      return NextResponse.redirect(
        `${settingsUrl}&error=${encodeURIComponent("アクセストークンが取得できませんでした")}`
      );
    }

    // DBに保存
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        qiita_access_token: accessToken,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Profile update error:", updateError);
      return NextResponse.redirect(
        `${settingsUrl}&error=${encodeURIComponent("トークンの保存に失敗しました")}`
      );
    }

    // 成功
    return NextResponse.redirect(`${settingsUrl}&success=true`);
  } catch (err) {
    console.error("Qiita OAuth callback error:", err);
    return NextResponse.redirect(
      `${settingsUrl}&error=${encodeURIComponent("予期しないエラーが発生しました")}`
    );
  }
}
