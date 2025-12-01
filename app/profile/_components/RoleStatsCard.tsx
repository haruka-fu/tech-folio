import type { RoleStat } from "@/lib/types/profile";

interface RoleStatsCardProps {
  roleStats: RoleStat[];
  isLoading: boolean;
}

export default function RoleStatsCard({ roleStats, isLoading }: RoleStatsCardProps) {
  if (isLoading || roleStats.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <h3 className="text-slate-900 text-lg font-bold leading-tight mb-4">
        担当工程
      </h3>
      <div className="space-y-3">
        {roleStats.map((stat) => (
          <div
            key={stat.roleName}
            className="flex items-center justify-between"
          >
            <span className="text-slate-600 text-sm">
              {stat.roleName}
            </span>
            <span className="text-slate-900 text-sm font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full">
              {stat.count}件
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
