import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Qiita APIのレスポンス型
export interface QiitaArticle {
  id: string;
  title: string;
  url: string;
  likes_count: number;
  stocks_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  tags: { name: string }[];
  user: {
    id: string;
    name: string;
    profile_image_url: string;
  };
}

// APIレスポンス型
interface QiitaApiResponse {
  articles: QiitaArticle[];
  username: string | null;
  hasToken: boolean;
  error?: string;
}

/**
 * Qiita記事一覧を取得するAPI
 * GET /api/qiita/articles
 */
export async function GET(): Promise<NextResponse<QiitaApiResponse>> {
  const supabase = await createClient();

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { articles: [], username: null, hasToken: false, error: "認証が必要です" },
      { status: 401 }
    );
  }

  // プロフィールからQiita情報を取得
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("qiita_access_token, qiita_url")
    .eq("user_id", user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json(
      { articles: [], username: null, hasToken: false, error: "プロフィールが見つかりません" },
      { status: 404 }
    );
  }

  const { qiita_access_token, qiita_url } = profile;

  // Qiita URLからユーザー名を抽出
  let username: string | null = null;
  if (qiita_url) {
    const match = qiita_url.match(/qiita\.com\/([^\/]+)/);
    if (match) {
      username = match[1];
    }
  }

  // アクセストークンがない場合
  if (!qiita_access_token) {
    return NextResponse.json({
      articles: [],
      username,
      hasToken: false,
    });
  }

  // ユーザー名が取得できない場合、認証ユーザー情報を取得
  if (!username) {
    try {
      const authResponse = await fetch("https://qiita.com/api/v2/authenticated_user", {
        headers: {
          Authorization: `Bearer ${qiita_access_token}`,
        },
      });
      if (authResponse.ok) {
        const authUser = await authResponse.json();
        username = authUser.id;
      }
    } catch {
      // 認証ユーザー取得に失敗した場合は続行
    }
  }

  if (!username) {
    return NextResponse.json({
      articles: [],
      username: null,
      hasToken: true,
      error: "Qiitaユーザー名を特定できません。プロフィールでQiita URLを設定してください。",
    });
  }

  // Qiita APIから記事を取得
  try {
    const response = await fetch(
      `https://qiita.com/api/v2/users/${username}/items?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${qiita_access_token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          articles: [],
          username,
          hasToken: true,
          error: `Qiita API エラー: ${response.status} - ${errorText}`,
        },
        { status: response.status }
      );
    }

    const articles: QiitaArticle[] = await response.json();
    return NextResponse.json({
      articles,
      username,
      hasToken: true,
    });
  } catch (error) {
    console.error("Qiita API error:", error);
    return NextResponse.json(
      {
        articles: [],
        username,
        hasToken: true,
        error: "Qiita APIへの接続に失敗しました",
      },
      { status: 500 }
    );
  }
}
