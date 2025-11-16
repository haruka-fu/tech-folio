export type SocialLinks = {
  github?: string;
  qiita?: string;
  zenn?: string;
  other?: string;
};

export type Profile = {
  username: string;
  displayName: string;
  jobTitle: string;
  bio: string;
  avatarUrl: string;
  socials: SocialLinks;
};

export type SkillStat = {
  name: string;
  level: "learning" | "practicing" | "expert";
  projects: number;
};

export const demoProfile: Profile = {
  username: "ayaka_dev",
  displayName: "綾香 由衣",
  jobTitle: "フロントエンドエンジニア",
  bio: "BtoB SaaS の UI/UX 開発・設計を担当。セルフホスト型のポートフォリオ管理ツールを Next.js + Supabase で開発中。",
  avatarUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=200&q=80",
  socials: {
    github: "https://github.com/ayaka-dev",
    qiita: "https://qiita.com/ayaka-dev",
    zenn: "https://zenn.dev/ayaka",
    other: "https://x.com/ayaka_dev",
  },
};

export const demoSkills: SkillStat[] = [
  { name: "Next.js", level: "expert", projects: 8 },
  { name: "TypeScript", level: "expert", projects: 7 },
  { name: "Supabase", level: "practicing", projects: 4 },
  { name: "Tailwind CSS", level: "practicing", projects: 3 },
  { name: "GraphQL", level: "learning", projects: 2 },
];

export const loginUsers = [
  { email: "ayaka@example.com", password: "portfolio-dev", name: "綾香 由衣" },
];
