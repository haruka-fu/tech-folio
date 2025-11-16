const tags = ["JavaScript", "React", "Node.js", "Tailwind CSS", "Figma"];

export default function TagsPage() {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <aside className="w-64 shrink-0 border-r border-[#E5E7EB] bg-white">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-2">
              <div
                className="size-10 aspect-square rounded-full bg-cover bg-center bg-no-repeat"
                aria-hidden
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3-9qEqqOvsZlHtZscTg5XqRy9RrYnik-74C2SPnbUyR6JvMzRjZlj3a5q-v5ECJhNYQuTjiv7iTr0jcCVPd7bg6Vg3_WtHFqFQ455LOvms5FEb1CXluakAWS_pqmtGl75AfpOTfM8J5xcK0-drpXddn3XlLqxH-_UsrpRuyc9vdh6xxYNb6lSBpxa4d_uBLmTSt-72ifsOA4q1cYSL-jPGEYTTYchfALNa_4lJ9grBhPWn1auU7lIhxW8GV07gE2j6R0bjCK1tzTD")',
                }}
              />
              <div className="flex flex-col">
                <h1 className="text-base font-bold leading-normal">
                  Taro Yamada
                </h1>
                <p className="text-sm font-normal leading-normal text-[#6B7280]">
                  Frontend Developer
                </p>
              </div>
            </div>
            <nav className="mt-4 flex flex-col gap-2">
              <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#6B7280] hover:bg-gray-100 hover:text-[#111827]">
                <span className="material-symbols-outlined text-xl">
                  dashboard
                </span>
                <p>Dashboard</p>
              </a>
              <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#6B7280] hover:bg-gray-100 hover:text-[#111827]">
                <span className="material-symbols-outlined text-xl">
                  folder_special
                </span>
                <p>Portfolio</p>
              </a>
              <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#6B7280] hover:bg-gray-100 hover:text-[#111827]">
                <span className="material-symbols-outlined text-xl">
                  lightbulb
                </span>
                <p>Projects</p>
              </a>
              <a className="flex items-center gap-3 rounded-lg bg-[#3B82F61A] px-3 py-2 text-sm font-bold leading-normal text-[#3B82F6]">
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sell
                </span>
                <p>Tags</p>
              </a>
              <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#6B7280] hover:bg-gray-100 hover:text-[#111827]">
                <span className="material-symbols-outlined text-xl">
                  settings
                </span>
                <p>Settings</p>
              </a>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#3B82F6] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-[#2563EB]">
              <span className="truncate">New Project</span>
            </button>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal text-[#6B7280] hover:bg-gray-100 hover:text-[#111827]">
              <span className="material-symbols-outlined text-xl">logout</span>
              <p>Logout</p>
            </a>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#111827]">
              技術タグ管理
            </h1>
            <p className="mt-1 text-base font-normal leading-normal text-[#6B7280]">
              プロジェクトやスキルを整理するためのタグを管理します。
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
                <h2 className="text-[#111827] text-lg font-semibold leading-tight">
                  新しいタグを追加
                </h2>
                <div className="mt-4 flex flex-col sm:flex-row items-start gap-4">
                  <div className="relative w-full flex-1">
                    <label className="sr-only" htmlFor="tag-input">
                      タグ名
                    </label>
                    <input
                      className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-md text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] border border-[#E5E7EB] bg-white h-12 placeholder:text-[#6B7280] px-4 text-base font-normal leading-normal"
                      id="tag-input"
                      placeholder="新しいタグ名を入力 (例: Python)"
                    />
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-[#E5E7EB] hidden">
                      <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
                        <li className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-[#111827] hover:bg-[#3B82F6] hover:text-white">
                          <span className="block truncate">Python</span>
                        </li>
                        <li className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-[#111827] hover:bg-[#3B82F6] hover:text-white">
                          <span className="block truncate">PyTorch</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-5 bg-[#3B82F6] text-white gap-2 text-sm font-bold leading-normal tracking-wide hover:bg-[#3B82F6]/90 transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      add
                    </span>
                    <span className="truncate">追加する</span>
                  </button>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-[#111827] text-lg font-semibold leading-tight mb-4">
                登録済みタグ一覧
              </h2>
              <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden">
                <div className="p-4 border-b border-[#E5E7EB]">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-xl">
                      search
                    </span>
                    <input
                      className="form-input w-full max-w-sm rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] border border-[#E5E7EB] bg-[#F9FAFB] placeholder:text-[#6B7280] pl-10 pr-4 py-2"
                      placeholder="タグを検索..."
                      type="text"
                    />
                  </div>
                </div>
                <div className="divide-y divide-[#E5E7EB]">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center justify-between p-4 hover:bg-gray-50/50"
                    >
                      <span className="text-base font-medium text-[#111827]">
                        {tag}
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-md text-[#6B7280] hover:bg-gray-200/60 hover:text-[#111827] transition-colors">
                          <span className="material-symbols-outlined text-xl">
                            edit
                          </span>
                        </button>
                        <button className="p-2 rounded-md text-[#6B7280] hover:bg-red-100 hover:text-[#EF4444] transition-colors">
                          <span className="material-symbols-outlined text-xl">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
