// 日付フォーマット関連のユーティリティ関数

/**
 * プロジェクトの期間を日本語形式でフォーマット
 * @param start 開始日（YYYY-MM形式）
 * @param end 終了日（YYYY-MM形式、nullの場合は終了日なし）
 * @param isCurrent 現在進行中かどうか
 * @returns フォーマットされた期間文字列
 */
export function formatPeriod(start: string, end: string | null, isCurrent: boolean): string {
  const formatMonth = (dateStr: string) => {
    const [year, month] = dateStr.split("-");
    return `${year}年${month}月`;
  };

  if (isCurrent) {
    return `${formatMonth(start)} 〜 現在`;
  }

  return end ? `${formatMonth(start)} 〜 ${formatMonth(end)}` : formatMonth(start);
}

/**
 * ISO8601形式の日付文字列を日本語フォーマットに変換
 * @param dateString ISO8601形式の日付文字列
 * @returns YYYY/MM/DD形式の文字列
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
