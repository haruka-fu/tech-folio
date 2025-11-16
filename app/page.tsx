"use client";

const projects = [
  {
    name: "プロジェクトアルファ",
    description: "ReactとFigmaを使用したEコマースサイトの再設計",
    tags: ["React", "Figma", "UI/UX"],
  },
  {
    name: "プロジェクトベータ",
    description: "PythonとDjangoで構築されたデータ分析ツール",
    tags: ["Python", "Django", "データ分析"],
  },
  {
    name: "プロジェクトガンマ",
    description: "Flutterで開発されたモバイルアプリ",
    tags: ["Flutter", "モバイルアプリ"],
  },
  {
    name: "プロジェクトデルタ",
    description: "Vue.jsとNode.jsを使用したマーケティングサイト",
    tags: ["Vue.js", "Node.js"],
  },
  {
    name: "プロジェクトイプシロン",
    description: "UI/UXデザインとプロトタイピングのケーススタディ",
    tags: ["UIデザイン", "UXデザイン"],
  },
  {
    name: "プロジェクトゼータ",
    description: "FigmaとIllustratorによるブランディングプロジェクト",
    tags: ["Figma", "Illustrator", "ブランディング"],
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f9fa]">
      <div className="pt-4" />

      <main className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-[#1f2937] sm:text-4xl">
                プロジェクト一覧
              </h1>
              <p className="text-base font-normal leading-normal text-[#6b7280]">
                あなたのプロジェクトを管理・フィルタリングします。
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="grow">
              <label className="flex h-12 w-full min-w-40 flex-col">
                <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                  <div className="text-[#6b7280] flex border-y border-l border-[#e5e7eb] bg-gray-50 items-center justify-center pl-4 rounded-l-lg">
                    <span className="material-symbols-outlined text-2xl">
                      search
                    </span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1f2937] focus:outline-0 focus:ring-2 focus:ring-[#2b6cee] border border-[#e5e7eb] bg-white focus:border-[#2b6cee] h-full placeholder:text-[#6b7280] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    placeholder="プロジェクト名で検索..."
                  />
                </div>
              </label>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border border-[#e5e7eb] px-4 hover:bg-gray-50 transition-colors">
                <p className="text-[#1f2937] text-sm font-medium leading-normal">
                  技術タグ
                </p>
                <span className="material-symbols-outlined text-[#6b7280] text-xl">
                  expand_more
                </span>
              </button>
              <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border border-[#e5e7eb] px-4 hover:bg-gray-50 transition-colors">
                <p className="text-[#1f2937] text-sm font-medium leading-normal">
                  工程
                </p>
                <span className="material-symbols-outlined text-[#6b7280] text-xl">
                  expand_more
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <div
                key={project.name}
                className="flex flex-col gap-2 p-4 rounded-lg bg-white border border-[#e5e7eb] hover:shadow-sm hover:border-[#2b6cee80] transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[#1f2937] text-base font-bold leading-normal">
                      {project.name}
                    </p>
                    <p className="text-[#6b7280] text-sm font-normal leading-normal mt-1">
                      {project.description}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[#6b7280] text-2xl">
                    more_vert
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => {
                    const colorMap: Record<
                      string,
                      { bg: string; text: string }
                    > = {
                      React: { bg: "bg-blue-100", text: "text-blue-800" },
                      Figma: { bg: "bg-purple-100", text: "text-purple-800" },
                      "UI/UX": { bg: "bg-green-100", text: "text-green-800" },
                      Python: { bg: "bg-yellow-100", text: "text-yellow-800" },
                      Django: { bg: "bg-green-100", text: "text-green-800" },
                      データ分析: {
                        bg: "bg-indigo-100",
                        text: "text-indigo-800",
                      },
                      Flutter: { bg: "bg-sky-100", text: "text-sky-800" },
                      モバイルアプリ: {
                        bg: "bg-red-100",
                        text: "text-red-800",
                      },
                      "Vue.js": { bg: "bg-green-100", text: "text-green-800" },
                      "Node.js": { bg: "bg-gray-100", text: "text-gray-800" },
                      UIデザイン: { bg: "bg-pink-100", text: "text-pink-800" },
                      UXデザイン: {
                        bg: "bg-orange-100",
                        text: "text-orange-800",
                      },
                      Illustrator: {
                        bg: "bg-orange-100",
                        text: "text-orange-800",
                      },
                      ブランディング: {
                        bg: "bg-gray-100",
                        text: "text-gray-800",
                      },
                    };
                    const colors = colorMap[tag] || {
                      bg: "bg-gray-100",
                      text: "text-gray-800",
                    };
                    return (
                      <span
                        key={tag}
                        className={`inline-block px-2.5 py-1 rounded-full ${colors.bg} ${colors.text} text-xs font-medium`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 flex h-12 w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#2b6cee] px-4 text-base font-bold leading-normal tracking-[0.015em] text-white transition-opacity hover:opacity-90 sm:hidden">
            <span className="truncate">新規プロジェクト追加</span>
          </button>
        </div>
      </main>

      <a
        href="#top"
        className="fixed bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#1f2937] shadow-lg transition-colors hover:bg-gray-100"
      >
        <span className="material-symbols-outlined text-3xl">arrow_upward</span>
      </a>
    </div>
  );
}
