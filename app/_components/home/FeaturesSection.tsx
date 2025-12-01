export default function FeaturesSection() {
  return (
    <section className="mb-12 sm:mb-16">
      <h2 className="mb-6 text-center text-2xl font-bold text-[#1f2937] sm:mb-8 sm:text-3xl">
        主な機能
      </h2>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
        {/* 機能1: プロジェクト管理 */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow transition-all hover:shadow-lg">
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[#eff6ff]">
            <span className="material-symbols-outlined text-3xl text-[#2b6cee]">
              folder_open
            </span>
          </div>
          <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
            プロジェクト管理
          </h3>
          <p className="text-[#6b7280]">
            あなたの技術プロジェクトを一箇所に集約。使用技術、成果物、期間などを詳細に記録できます。
          </p>
        </div>

        {/* 機能2: スキル可視化 */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow transition-all hover:shadow-lg">
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[#f0fdf4]">
            <span className="material-symbols-outlined text-3xl text-[#10b981]">
              analytics
            </span>
          </div>
          <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
            スキル可視化
          </h3>
          <p className="text-[#6b7280]">
            プロジェクトから自動的にスキルセットを抽出。あなたの技術的な強みを効果的にアピールできます。
          </p>
        </div>

        {/* 機能3: シンプルな管理 */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow transition-all hover:shadow-lg">
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[#fef3c7]">
            <span className="material-symbols-outlined text-3xl text-[#f59e0b]">
              edit_note
            </span>
          </div>
          <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
            シンプルな管理
          </h3>
          <p className="text-[#6b7280]">
            直感的なインターフェースで、技術的な経験を簡単に記録。いつでもすぐに更新できます。
          </p>
        </div>
      </div>
    </section>
  );
}
