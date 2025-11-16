"use client";

interface QiitaArticle {
  title: string;
  date: string;
  lgtm: number;
  added: boolean;
  url?: string;
}

const qiitaArticles: QiitaArticle[] = [
  {
    title: "Tailwind CSSで作るモダンなUIデザイン",
    date: "2023-10-26",
    lgtm: 128,
    added: false,
  },
  {
    title: "Reactのパフォーマンス最適化Tips",
    date: "2023-09-15",
    lgtm: 256,
    added: false,
  },
  {
    title: "REST API設計のベストプラクティス",
    date: "2023-08-01",
    lgtm: 512,
    added: true,
  },
  {
    title: "Next.js 13 App Router入門",
    date: "2023-07-20",
    lgtm: 98,
    added: false,
  },
];

export default function QiitaIntegration() {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900">
          Qiita連携
        </h1>
        <p className="mt-2 text-base font-normal leading-normal text-gray-500">
          Qiitaアカウントを連携すると、投稿した記事を自動でポートフォリオに追加できます。
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {/* Connection Status */}
        <section className="card">
          <h2 className="border-b border-[#e5e7eb] pb-4 text-lg font-semibold leading-tight text-[#1f2937]">
            連携ステータス
          </h2>
          <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <span className="material-symbols-outlined text-3xl">
                  check_circle
                </span>
              </div>
              <div>
                <p className="text-base font-medium leading-normal text-[#1f2937]">
                  連携済み
                </p>
                <p className="text-sm text-[#6b7280]">Qiita ID: @yamada-taro</p>
              </div>
            </div>
            <div className="w-full shrink-0 sm:w-auto">
              <button className="flex h-10 w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-red-300 bg-red-50 px-4 text-sm font-medium leading-normal text-red-600 transition-colors hover:bg-red-100 sm:w-auto">
                <span className="truncate">連携を解除する</span>
              </button>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section>
          <h2 className="mb-4 text-lg font-semibold leading-tight text-[#1f2937]">
            連携済みの記事一覧
          </h2>
          <div className="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
            <table className="w-full text-left text-sm text-[#6b7280]">
              <thead className="bg-[#f9fafb] text-xs uppercase text-[#1f2937]">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    タイトル
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    投稿日
                  </th>
                  <th scope="col" className="px-6 py-3 text-center font-medium">
                    LGTM数
                  </th>
                  <th scope="col" className="px-6 py-3 text-center font-medium">
                    アクション
                  </th>
                </tr>
              </thead>
              <tbody>
                {qiitaArticles.map((article) => (
                  <tr
                    key={article.title}
                    className="border-b border-[#e5e7eb] bg-white last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-[#1f2937]"
                    >
                      <a className="hover:text-green-600 hover:underline" href="#">
                        {article.title}
                      </a>
                    </th>
                    <td className="px-6 py-4">{article.date}</td>
                    <td className="px-6 py-4 text-center">{article.lgtm}</td>
                    <td className="px-6 py-4 text-center">
                      {article.added ? (
                        <span className="text-[#6b7280]">追加済み</span>
                      ) : (
                        <button className="font-medium text-[#2b6cee] hover:underline">
                          ポートフォリオに追加
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav
            aria-label="Table navigation"
            className="flex items-center justify-between pt-4"
          >
            <span className="text-sm font-normal text-[#6b7280]">
              Showing <span className="font-semibold text-[#1f2937]">1-4</span> of{" "}
              <span className="font-semibold text-[#1f2937]">10</span>
            </span>
            <ul className="-space-x-px inline-flex items-center text-sm">
              <li>
                <a
                  href="#"
                  className="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-[#e5e7eb] bg-white px-3 leading-tight text-[#6b7280] hover:bg-gray-100 hover:text-[#1f2937]"
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex h-8 items-center justify-center border border-[#e5e7eb] bg-white px-3 leading-tight text-[#6b7280] hover:bg-gray-100 hover:text-[#1f2937]"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex h-8 items-center justify-center border border-[#2b6cee] bg-[#2b6cee]/10 px-3 text-[#2b6cee] hover:bg-[#2b6cee]/20"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex h-8 items-center justify-center rounded-r-lg border border-[#e5e7eb] bg-white px-3 leading-tight text-[#6b7280] hover:bg-gray-100 hover:text-[#1f2937]"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </>
  );
}
