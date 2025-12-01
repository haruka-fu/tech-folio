interface SNSLinksFormProps {
  formData: {
    twitter_url: string;
    github_url: string;
    qiita_url: string;
    other_url: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function SNSLinksForm({ formData, onChange }: SNSLinksFormProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          SNS・外部リンク
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
            <svg
              className="h-5 w-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </div>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
            placeholder="https://x.com/username"
            type="url"
            value={formData.twitter_url}
            onChange={(e) => onChange('twitter_url', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
            <svg
              className="h-6 w-6 text-gray-600"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
          </div>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
            placeholder="https://github.com/username"
            type="url"
            value={formData.github_url}
            onChange={(e) => onChange('github_url', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">
              article
            </span>
          </div>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
            placeholder="https://qiita.com/username"
            type="url"
            value={formData.qiita_url}
            onChange={(e) => onChange('qiita_url', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">
              link
            </span>
          </div>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-[#4A90E2]/50 border border-gray-300 bg-white focus:border-[#4A90E2] h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
            placeholder="https://example.com"
            type="url"
            value={formData.other_url}
            onChange={(e) => onChange('other_url', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
