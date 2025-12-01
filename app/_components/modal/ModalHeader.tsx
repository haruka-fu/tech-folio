interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
      <h2 className="text-lg font-bold text-slate-900 slide-in-left sm:text-xl md:text-2xl">
        {title}
      </h2>
      <button
        onClick={onClose}
        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 hover-scale"
      >
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}
