export default function NoticeInfo() {
  return (
    <div className="mx-6 mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-2xl text-blue-600">
          info
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900">
            スキル可視化のためのツールです
          </h3>
          <p className="mt-1 text-sm text-blue-800">
            具体的な企業名や機密情報は入力しないでください。このツールは、あなたのスキルや経験を可視化するためのものです。プロジェクト名は「ECサイトリニューアル」「社内業務システム開発」のような一般的な表現を使用してください。
          </p>
        </div>
      </div>
    </div>
  );
}
