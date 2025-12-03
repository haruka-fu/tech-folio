import { NextRequest, NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

/**
 * Display name availability check API
 *
 * @description
 * 指定されたdisplay_nameが使用可能かどうかをチェックします。
 * 登録時と編集時の両方で使用されます。
 * サービスロールを使用してRLSをバイパスし、全てのdisplay_nameをチェックします。
 *
 * @param request - NextRequest object
 * @returns JSON response with availability status
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const displayName = searchParams.get('displayName');
    const currentUserId = searchParams.get('currentUserId'); // 編集時の現在のユーザーID

    // displayNameパラメータの検証
    if (!displayName || displayName.trim() === '') {
      return NextResponse.json(
        { error: 'Display name is required' },
        { status: 400 }
      );
    }

    // サービスロールクライアントを使用してRLSをバイパス
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const supabaseAdmin = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // display_nameが既に存在するかチェック（RLSをバイパス）
    const { data: existingProfile, error } = await supabaseAdmin
      .from('profiles')
      .select('id, user_id')
      .eq('display_name', displayName.trim())
      .maybeSingle();

    if (error) {
      console.error('Error checking display name:', error);
      return NextResponse.json(
        { error: 'Failed to check display name availability' },
        { status: 500 }
      );
    }

    // プロフィールが存在しない場合は使用可能
    if (!existingProfile) {
      return NextResponse.json({ available: true });
    }

    // 編集時：自分自身のdisplay_nameの場合は使用可能
    if (currentUserId && existingProfile.user_id === currentUserId) {
      return NextResponse.json({ available: true });
    }

    // 他のユーザーが既に使用している場合は使用不可
    return NextResponse.json({ available: false });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
