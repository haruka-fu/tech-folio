export default function HowToUseSection() {
  return (
    <section className="mb-16">
      <h2 className="mb-10 text-center text-3xl font-bold text-[#1f2937]">
        使い方は簡単3ステップ
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {/* ステップ1 */}
        <div className="relative">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-linear-to-br from-[#2b6cee] to-[#1e40af] text-2xl font-bold text-white shadow-lg">
            1
          </div>
          <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
            Googleでログイン
          </h3>
          <p className="text-[#6b7280]">
            面倒な登録は不要。Googleアカウントで数秒でログインできます。
          </p>
        </div>

        {/* ステップ2 */}
        <div className="relative">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-linear-to-br from-[#10b981] to-[#059669] text-2xl font-bold text-white shadow-lg">
            2
          </div>
          <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
            プロジェクトを登録
          </h3>
          <p className="text-[#6b7280]">
            過去のプロジェクトや学習内容を追加。技術スタック、成果物、期間を記録します。
          </p>
        </div>

        {/* ステップ3 */}
        <div className="relative">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-linear-to-br from-[#f59e0b] to-[#d97706] text-2xl font-bold text-white shadow-lg">
            3
          </div>
          <h3 className="mb-3 text-xl font-bold text-[#1f2937]">
            スキルを可視化
          </h3>
          <p className="text-[#6b7280]">
            ダッシュボードで実績を確認。あなたの技術力を一目で把握できます。
          </p>
        </div>
      </div>
    </section>
  );
}
