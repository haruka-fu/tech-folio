// プロフィール関連の型定義

import type { Tag } from "@/lib/supabase";

export interface SkillStat {
  tagName: string;
  usageCount: number;
  tag: Tag;
}

export interface RoleStat {
  roleName: string;
  count: number;
}
