import type { Profile } from "@/lib/supabase";

interface ProfileCardProps {
  profile: Profile | null;
  isLoading: boolean;
}

export default function ProfileCard({ profile, isLoading }: ProfileCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <p className="text-center text-slate-500">プロフィール情報が見つかりません</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <div className="flex items-center gap-4 mb-6">
        {profile.avatar_url ? (
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-20 h-20 shrink-0"
            style={{
              backgroundImage: `url("${profile.avatar_url}")`,
            }}
          />
        ) : (
          <div className="bg-slate-200 rounded-full w-20 h-20 shrink-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-slate-500">
              person
            </span>
          </div>
        )}
        <div className="flex flex-col">
          <p className="text-slate-900 text-2xl font-bold leading-tight tracking-[-0.015em]">
            {profile.display_name}
          </p>
          {profile.email && (
            <p className="text-slate-500 text-sm font-normal leading-normal">
              {profile.email}
            </p>
          )}
        </div>
      </div>

      {profile.bio && (
        <>
          <p className="text-slate-900 text-base font-medium leading-normal mb-1">
            自己紹介
          </p>
          <p className="text-slate-600 text-base font-normal leading-relaxed mb-6">
            {profile.bio}
          </p>
        </>
      )}

      {/* SNSリンク */}
      {(profile.github_url || profile.twitter_url || profile.qiita_url || profile.other_url) && (
        <>
          <p className="text-slate-900 text-base font-medium leading-normal mb-3">
            SNSリンク
          </p>
          <div className="flex flex-wrap justify-start gap-4">
            {profile.github_url && (
              <a
                className="flex flex-col items-center justify-center gap-2 text-center w-20 group hover-scale"
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200 hover-lift">
                  <svg
                    className="size-6 text-slate-700 group-hover:text-[#2b6cee]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </div>
                <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                  GitHub
                </p>
              </a>
            )}
            {profile.twitter_url && (
              <a
                className="flex flex-col items-center justify-center gap-2 text-center w-20 group hover-scale"
                href={profile.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200 hover-lift">
                  <svg
                    className="size-6 text-slate-700 group-hover:text-[#2b6cee]"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.602.75Zm-1.282 13.025h1.426L3.926 2.165H2.468l8.85 11.61Z"></path>
                  </svg>
                </div>
                <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                  X
                </p>
              </a>
            )}
            {profile.qiita_url && (
              <a
                className="flex flex-col items-center justify-center gap-2 text-center w-20 group hover-scale"
                href={profile.qiita_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200 hover-lift">
                  <span className="material-symbols-outlined size-6 text-slate-700 group-hover:text-[#2b6cee]">
                    article
                  </span>
                </div>
                <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                  Qiita
                </p>
              </a>
            )}
            {profile.other_url && (
              <a
                className="flex flex-col items-center justify-center gap-2 text-center w-20 group hover-scale"
                href={profile.other_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full bg-slate-100 p-3.5 group-hover:bg-[#2b6cee]/10 transition-colors duration-200 hover-lift">
                  <span className="material-symbols-outlined size-6 text-slate-700 group-hover:text-[#2b6cee]">
                    link
                  </span>
                </div>
                <p className="text-slate-700 group-hover:text-[#2b6cee] text-sm font-medium leading-normal">
                  その他
                </p>
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}
