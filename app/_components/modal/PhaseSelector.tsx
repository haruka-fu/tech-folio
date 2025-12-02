import { useState, useEffect, useRef } from "react";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ドロップダウン外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTogglePhase = (phase: string) => {
    if (selectedPhases.includes(phase)) {
      onRemovePhase(phase);
    } else {
      onAddPhase(phase);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-2 block text-sm font-semibold text-slate-900">
        工程
      </label>
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex w-full items-center justify-between rounded-lg border px-4 py-2.5 transition-colors ${
          selectedPhases.length > 0
            ? "border-[#2b6cee] bg-[#2b6cee]/5"
            : "border-slate-300 bg-white hover:bg-slate-50"
        }`}
      >
        <span className="text-sm font-medium text-slate-700">
          {selectedPhases.length > 0
            ? `${selectedPhases.length}個の工程を選択中`
            : "工程を選択してください"}
        </span>
        <span className="material-symbols-outlined text-xl text-slate-400">
          {showDropdown ? "expand_less" : "expand_more"}
        </span>
      </button>
      {showDropdown && (
        <div className="absolute left-0 top-full z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="p-2">
            {availablePhases.length === 0 ? (
              <p className="px-3 py-2 text-sm text-slate-500">工程がありません</p>
            ) : (
              availablePhases.map((phase) => {
                const isSelected = selectedPhases.includes(phase);
                return (
                  <button
                    key={phase}
                    type="button"
                    onClick={() => handleTogglePhase(phase)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-[#2b6cee]/10 text-[#2b6cee]"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className={`material-symbols-outlined text-lg ${isSelected ? "text-[#2b6cee]" : "text-slate-300"}`}>
                      {isSelected ? "check_box" : "check_box_outline_blank"}
                    </span>
                    {phase}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
      {selectedPhases.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedPhases.map((phase) => (
            <span
              key={phase}
              className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 tag-bounce scale-in"
            >
              {phase}
              <button
                type="button"
                onClick={() => onRemovePhase(phase)}
                className="rounded-full hover:opacity-70 hover-scale"
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
