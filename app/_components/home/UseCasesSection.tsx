export default function UseCasesSection() {
  return (
    <section className="mb-16">
      <h2 className="mb-10 text-center text-3xl font-bold text-[#1f2937]">
        こんな方におすすめ
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow">
          <span className="material-symbols-outlined text-4xl text-[#2b6cee]">
            person
          </span>
          <div>
            <h3 className="mb-2 text-lg font-bold text-[#1f2937]">
              個人エンジニア
            </h3>
            <p className="text-sm text-[#6b7280]">
              個人開発やサイドプロジェクトの実績を整理して、転職活動や案件獲得に活用したい方
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow">
          <span className="material-symbols-outlined text-4xl text-[#10b981]">
            school
          </span>
          <div>
            <h3 className="mb-2 text-lg font-bold text-[#1f2937]">学習者</h3>
            <p className="text-sm text-[#6b7280]">
              学習した技術や作成したプロジェクトを記録し、自身の成長を可視化したい方
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow">
          <span className="material-symbols-outlined text-4xl text-[#f59e0b]">
            trending_up
          </span>
          <div>
            <h3 className="mb-2 text-lg font-bold text-[#1f2937]">
              フリーランス
            </h3>
            <p className="text-sm text-[#6b7280]">
              過去の案件実績を整理して、クライアントへの提案資料を素早く作成したい方
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow">
          <span className="material-symbols-outlined text-4xl text-[#8b5cf6]">
            workspace_premium
          </span>
          <div>
            <h3 className="mb-2 text-lg font-bold text-[#1f2937]">
              キャリアアップ志向
            </h3>
            <p className="text-sm text-[#6b7280]">
              技術的な実績を体系的に管理し、キャリアの棚卸しをしたい方
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
