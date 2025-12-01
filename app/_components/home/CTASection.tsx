import Link from "next/link";

interface CTASectionProps {
  isLoggedIn: boolean;
}

export default function CTASection({ isLoggedIn }: CTASectionProps) {
  if (!isLoggedIn) {
    return (
      <section className="mb-8 rounded-2xl bg-linear-to-br from-[#2b6cee] to-[#1e40af] p-12 text-center text-white shadow-xl">
        <h2 className="mb-4 text-3xl font-bold">今すぐ始めましょう</h2>
        <p className="mb-8 text-lg opacity-90">
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
    <section className="mb-8 rounded-2xl bg-linear-to-br from-[#10b981] to-[#059669] p-12 text-center text-white shadow-xl">
      <h2 className="mb-4 text-3xl font-bold">
        プロジェクトを管理しましょう
      </h2>
      <p className="mb-8 text-lg opacity-90">
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
