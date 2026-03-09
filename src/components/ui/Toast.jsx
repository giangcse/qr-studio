import { X } from "lucide-react";

export function Toast({ title, message, tone = "info", onDismiss }) {
  const toneClasses =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-900"
      : tone === "success"
        ? "border-green-200 bg-green-50 text-green-900"
        : "border-slate-200 bg-white text-slate-900";

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] w-[min(560px,calc(100vw-2rem))] -translate-x-1/2">
      <div
        className={`rounded-2xl border shadow-lg px-4 py-3 ${toneClasses} dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100`}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {title && <div className="font-bold text-sm">{title}</div>}
            {message && (
              <div className="text-sm opacity-90 leading-relaxed">{message}</div>
            )}
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
            aria-label="Đóng thông báo"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

