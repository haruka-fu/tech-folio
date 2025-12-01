interface ErrorMessageProps {
  error: string | null;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-red-600">
          error
        </span>
        <p className="text-sm text-red-800">{error}</p>
      </div>
    </div>
  );
}
