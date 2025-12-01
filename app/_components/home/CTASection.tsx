import Link from "next/link";

interface CTASectionProps {
  isLoggedIn: boolean;
}

export default function CTASection({ isLoggedIn }: CTASectionProps) {
  if (!isLoggedIn) {
    return (
      <section className="mb-8 rounded-2xl bg-linear-to-br from-[#2b6cee] to-[#1e40af] p-6 text-center text-white shadow-xl sm:p-8 md:p-12">
        <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">今すぐ始めましょう</h2>
        <p className="mb-6 text-base opacity-90 sm:mb-8 sm:text-lg">
          Googleアカウントで簡単にログインできます
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-base font-semibold text-[#2b6cee] shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
        >
          <span className="material-symbols-outlined text-xl">login</span>
          無料で始める
        </Link>
      </section>
    );
  }

  return (
    <section className="mb-8 rounded-2xl bg-linear-to-br from-[#10b981] to-[#059669] p-6 text-center text-white shadow-xl sm:p-8 md:p-12">
      <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
        プロジェクトを管理しましょう
      </h2>
      <p className="mb-6 text-base opacity-90 sm:mb-8 sm:text-lg">
        あなたの技術実績を記録して、スキルを可視化しましょう
      </p>
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-base font-semibold text-[#10b981] shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
      >
        <span className="material-symbols-outlined text-xl">
          folder_open
        </span>
        アクティビティを見る
      </Link>
    </section>
  );
}
