import type { QiitaArticle } from "@/lib/types/qiita";
import { formatDate } from "@/lib/utils/format";

interface ArticlesTableProps {
  articles: QiitaArticle[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function ArticlesTable({
  articles,
  isLoading,
  onRefresh,
}: ArticlesTableProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold leading-tight text-[#1f2937]">
          記事一覧
        </h2>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-base">
            refresh
          </span>
          更新
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 py-12 text-center text-gray-500">
          記事がありません
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white shadow-sm -mx-4 sm:mx-0">
          <table className="w-full min-w-[600px] text-left text-sm text-[#6b7280]">
            <thead className="bg-[#f9fafb] text-xs uppercase text-[#1f2937]">
              <tr>
                <th scope="col" className="whitespace-nowrap px-3 py-2 font-medium sm:px-6 sm:py-3">
                  タイトル
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-2 font-medium sm:px-6 sm:py-3">
                  投稿日
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-2 text-center font-medium sm:px-6 sm:py-3">
                  LGTM
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-2 text-center font-medium sm:px-6 sm:py-3">
                  ストック
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-[#e5e7eb] bg-white last:border-b-0"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-3 py-3 font-medium text-[#1f2937] sm:px-6 sm:py-4"
                  >
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-600 hover:underline"
                    >
                      {article.title}
                    </a>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {article.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag.name}
                          className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </th>
                  <td className="px-3 py-3 sm:px-6 sm:py-4">
                    {formatDate(article.created_at)}
                  </td>
                  <td className="px-3 py-3 text-center sm:px-6 sm:py-4">
                    {article.likes_count}
                  </td>
                  <td className="px-3 py-3 text-center sm:px-6 sm:py-4">
                    {article.stocks_count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-500">
        全 {articles.length} 件の記事
      </p>
    </section>
  );
}
