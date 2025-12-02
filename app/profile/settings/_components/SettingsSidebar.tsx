import Link from "next/link";

type SettingsTab = "profile" | "qiita";

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsSidebar({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
}: SettingsSidebarProps) {
  return (
    <>
      {/* オーバーレイ（laptop以下で表示） */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 laptop:hidden"
          onClick={onClose}
        />
      )}

      {/* サイドバー */}
      <aside className={`flex w-64 flex-col gap-8 border-r border-gray-200 bg-white p-4 laptop:relative laptop:translate-x-0 ${
        isOpen ? 'fixed left-0 top-0 bottom-0 z-40 translate-x-0' : 'fixed left-0 top-0 bottom-0 z-40 -translate-x-full laptop:translate-x-0'
      } transition-transform duration-300`}>
      <div className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 px-2 py-2">
          <span className="material-symbols-outlined text-3xl text-[#2b6cee]">
            folder_special
          </span>
          <h1 className="text-xl font-bold leading-normal text-gray-900">
            TechFolio
          </h1>
        </Link>
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => onTabChange("profile")}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal transition-colors text-left ${
              activeTab === "profile"
                ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={
                activeTab === "profile"
                  ? { fontVariationSettings: "'FILL' 1" }
                  : {}
              }
            >
              person
            </span>
            <p>プロフィール設定</p>
          </button>
          <button
            onClick={() => onTabChange("qiita")}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal transition-colors text-left ${
              activeTab === "qiita"
                ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={
                activeTab === "qiita"
                  ? { fontVariationSettings: "'FILL' 1" }
                  : {}
              }
            >
              link
            </span>
            <p>Qiita連携</p>
          </button>
        </nav>
      </div>
    </aside>
    </>
  );
}
