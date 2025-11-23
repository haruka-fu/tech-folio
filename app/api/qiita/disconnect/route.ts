import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Qiita連携を解除するAPI
 * DELETE /api/qiita/disconnect
 */
export async function DELETE() {
  const supabase = await createClient();

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  // トークンを削除
  const { error } = await supabase
    .from("profiles")
    .update({
      qiita_access_token: null,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "連携解除に失敗しました" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
