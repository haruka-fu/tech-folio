// 統計計算関連のユーティリティ関数

import type { ProjectWithDetails, Tag } from "@/lib/supabase";
import type { SkillStat, RoleStat } from "@/lib/types/profile";

/**
 * プロジェクトリストからスキル統計を計算
 * @param projects プロジェクトの配列
 * @param limit 上位何件まで取得するか（デフォルト: 10）
 * @returns スキル統計の配列
 */
export function calculateSkillStats(
  projects: ProjectWithDetails[],
  limit: number = 10
): SkillStat[] {
  const tagCounts = new Map<string, { count: number; tag: Tag }>();

  projects.forEach(project => {
    project.tags?.forEach(tag => {
      const existing = tagCounts.get(tag.name);
      if (existing) {
        existing.count++;
      } else {
        tagCounts.set(tag.name, { count: 1, tag });
      }
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tagName, { count, tag }]) => ({
      tagName,
      usageCount: count,
      tag,
    }))
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, limit);
}

/**
 * プロジェクトリストからロール統計を計算
 * @param projects プロジェクトの配列
 * @returns ロール統計の配列
 */
export function calculateRoleStats(projects: ProjectWithDetails[]): RoleStat[] {
  const roleCounts = new Map<string, number>();

  projects.forEach(project => {
    project.role_names?.forEach(roleName => {
      const count = roleCounts.get(roleName) || 0;
      roleCounts.set(roleName, count + 1);
    });
  });

  return Array.from(roleCounts.entries())
    .map(([roleName, count]) => ({
      roleName,
      count,
    }))
    .filter(stat => stat.count > 0);
}
