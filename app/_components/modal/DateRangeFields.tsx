interface DateRangeFieldsProps {
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onCurrentChange: (checked: boolean) => void;
}

export default function DateRangeFields({
  startDate,
  endDate,
  isCurrent,
  onStartDateChange,
  onEndDateChange,
  onCurrentChange,
}: DateRangeFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label
          htmlFor="startDate"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          開始年月 <span className="text-red-500">*</span>
        </label>
        <input
          id="startDate"
          type="month"
          required
          min="1980-01"
          max="2030-12"
          className="input-field w-full"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="endDate"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          終了年月 {!isCurrent && <span className="text-red-500">*</span>}
        </label>
        <input
          id="endDate"
          type="month"
          required={!isCurrent}
          disabled={isCurrent}
          min="1980-01"
          max="2030-12"
          className="input-field w-full disabled:bg-slate-100 disabled:text-slate-400"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
        <div className="mt-2 flex items-center gap-2">
          <input
            id="isCurrent"
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => onCurrentChange(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#2b6cee] focus:ring-[#2b6cee]"
          />
          <label
            htmlFor="isCurrent"
            className="text-sm text-slate-700 cursor-pointer"
          >
            現在進行中
          </label>
        </div>
      </div>
    </div>
  );
}
