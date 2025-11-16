const qiitaArticles = [
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

export default function QiitaIntegrationPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full bg-[#f8f9fa] font-sans text-gray-800">
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-2">
              <div
                className="size-10 aspect-square rounded-full bg-cover bg-center bg-no-repeat"
                aria-hidden
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqDMYzPPR0xGO3gFiw3AvMea-Yz6iXA2MTnq7t7xjmG8nMJwfy9FQkX4j8M5G5KslnCOxatb97QCbPtLuJydf-h4Bd86LqR7uY8BjMqm4Z2NFCeAMZvzTGXqjjdrHzNUGWCaVFcXuDkC3lj0z9w6J-clz7Pfwl5tYiT8cI1eHx6gyk6RO2A597_W-2cPmOrLFbr4B8veNQRmXowYfHnTTK-8klWsYtU6ftUoPLBMZxyqBnDfP8g1UBjJJLJfNMydQ4pEcQU889HicU")',
                }}
              />
              <div className="flex flex-col">
                <h1 className="text-base font-medium leading-normal text-gray-900">Taro Yamada</h1>
                <p className="text-sm font-normal leading-normal text-gray-500">Software Engineer</p>
              </div>
            </div>
            <nav className="mt-4 flex flex-col gap-2">
              <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100" href="#">
                <span className="material-symbols-outlined text-base">dashboard</span>
                <p className="text-sm font-medium leading-normal">Dashboard</p>
              </a>
              <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100" href="#">
                <span className="material-symbols-outlined text-base">work</span>
                <p className="text-sm font-medium leading-normal">Portfolio</p>
              </a>
              <a className="flex items-center gap-3 rounded-lg bg-[#2b6cee1a] px-3 py-2 text-[#2b6cee]" href="#">
                <span className="material-symbols-outlined text-base">link</span>
                <p className="text-sm font-medium leading-normal">Integrations</p>
              </a>
              <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100" href="#">
                <span className="material-symbols-outlined text-base">settings</span>
                <p className="text-sm font-medium leading-normal">Settings</p>
              </a>
            </nav>
          </div>
          <div className="flex flex-col gap-1">
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100" href="#">
              <span className="material-symbols-outlined text-base">help</span>
              <p className="text-sm font-medium leading-normal">Help</p>
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100" href="#">
              <span className="material-symbols-outlined text-base">logout</span>
              <p className="text-sm font-medium leading-normal">Logout</p>
            </a>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-4xl">
          <div className="pb-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Qiita連携</h1>
            <p className="mt-2 text-base font-normal leading-normal text-gray-600">
              Qiitaアカウントを連携すると、投稿した記事を自動でポートフォリオに追加できます。
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-10">
            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="border-b border-gray-200 pb-4 text-lg font-semibold leading-tight text-gray-900">連携ステータス</h2>
              <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#55C5001a] text-[#55C500]">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <div>
                    <p className="text-base font-medium leading-normal text-gray-900">連携済み</p>
                    <p className="text-sm text-gray-500">Qiita ID: @yamada-taro</p>
                  </div>
                </div>
                <div className="w-full shrink-0 sm:w-auto">
                  <button className="flex h-10 min-w-[84px] max-w-[480px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-[#DC3545] bg-red-50 px-4 text-sm font-medium leading-normal text-[#DC3545] transition-colors hover:bg-red-100">
                    <span className="truncate">連携を解除する</span>
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold leading-tight text-gray-900">連携済みの記事一覧</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm text-gray-500">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700">
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
                      <tr key={article.title} className="border-b border-gray-200 bg-white last:border-b-0">
                        <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                          <a className="hover:text-[#55C500] hover:underline" href="#">
                            {article.title}
                          </a>
                        </th>
                        <td className="px-6 py-4">{article.date}</td>
                        <td className="px-6 py-4 text-center">{article.lgtm}</td>
                        <td className="px-6 py-4 text-center">
                          {article.added ? (
                            <span className="text-gray-500">追加済み</span>
                          ) : (
                            <button className="font-medium text-[#2b6cee] hover:underline">ポートフォリオに追加</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav aria-label="Table navigation" className="flex items-center justify-between pt-4">
                <span className="text-sm font-normal text-gray-500">
                  Showing <span className="font-semibold text-gray-900">1-4</span> of{" "}
                  <span className="font-semibold text-gray-900">10</span>
                </span>
                <ul className="inline-flex items-center -space-x-px text-sm">
                  <li>
                    <a
                      href="#"
                      className="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Previous
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex h-8 items-center justify-center border border-[#2b6cee] bg-[#2b6cee1a] px-3 text-[#2b6cee]"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

