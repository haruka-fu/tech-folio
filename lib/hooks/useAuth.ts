"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

const supabase = createClient();

/**
 * 認証状態を管理するカスタムフック
 *
 * @description
 * ユーザーの認証状態とプロフィール情報を取得し、
 * 未認証の場合はログインページにリダイレクトします。
 *
 * @param options.requireProfile - プロフィールの存在を必須とするか（デフォルト: true）
 * @returns 認証状態、ユーザー情報、プロフィール情報、ローディング状態
 */
export function useAuth(options: { requireProfile?: boolean } = {}) {
  const { requireProfile = true } = options;
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // ユーザー認証状態を確認
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (!authUser) {
          // 未認証の場合はログインページへリダイレクト
          router.push('/login');
          return;
        }

        setUser(authUser);
        setIsAuthenticated(true);

        // プロフィール情報を取得
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', authUser.id)
          .maybeSingle();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
        }

        // プロフィールが必須かつ存在しない場合は登録ページへ
        if (requireProfile && !profileData) {
          router.push('/register');
          return;
        }

        setProfile(profileData);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, requireProfile]);

  return {
    user,
    profile,
    isLoading,
    isAuthenticated,
  };
}
