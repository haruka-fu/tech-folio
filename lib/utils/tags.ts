import type { Tag } from "@/lib/supabase";

/**
 * タグ名から色を取得するためのMapを作成
 * @param tags タグの配列
 * @returns タグ名（小文字）をキーとした色のMap
 */
export function createTagColorMap(tags: Tag[]): Map<string, string> {
  const map = new Map<string, string>();
  tags.forEach(tag => {
    map.set(tag.name.toLowerCase(), tag.color || '#6B7280');
  });
  return map;
}

/**
 * タグ名から色を取得
 * @param tagName タグ名
 * @param colorMap タグカラーマップ
 * @returns タグの色（存在しない場合はデフォルトの灰色）
 */
export function getTagColor(tagName: string, colorMap: Map<string, string>): string {
  return colorMap.get(tagName.toLowerCase()) || '#6B7280';
}
