interface PhaseSelectorProps {
  selectedPhases: string[];
  availablePhases: string[];
  onAddPhase: (phase: string) => void;
  onRemovePhase: (phase: string) => void;
}

export default function PhaseSelector({
  selectedPhases,
  availablePhases,
  onAddPhase,
  onRemovePhase,
}: PhaseSelectorProps) {
  return (
    <div>
      <label
        htmlFor="phase"
        className="mb-2 block text-sm font-semibold text-slate-900"
      >
        工程
      </label>
      <select
        id="phase"
        className="input-field w-full"
        onChange={(e) => {
          if (e.target.value) {
            onAddPhase(e.target.value);
            e.target.value = "";
          }
        }}
        defaultValue=""
      >
        <option value="" disabled>
          工程を選択してください
        </option>
        {availablePhases
          .filter((phase) => !selectedPhases.includes(phase))
          .map((phase) => (
            <option key={phase} value={phase}>
              {phase}
            </option>
          ))}
      </select>
      {selectedPhases.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedPhases.map((phase) => (
            <span
              key={phase}
              className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
            >
              {phase}
              <button
                type="button"
                onClick={() => onRemovePhase(phase)}
                className="rounded-full hover:bg-blue-200"
              >
                <span className="material-symbols-outlined text-base">
                  close
                </span>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
