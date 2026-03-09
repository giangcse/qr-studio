export function ColorControls({
  fgColor,
  bgColor,
  useGradient,
  gradientColor,
  onFgColorChange,
  onBgColorChange,
  onUseGradientChange,
  onGradientColorChange,
  onApplyPreset,
}) {
  const presets = [
    {
      id: "indigo",
      label: "Indigo",
      fg: "#4f46e5",
      bg: "#ffffff",
      gradient: "#9333ea",
    },
    { id: "emerald", label: "Emerald", fg: "#059669", bg: "#ffffff", gradient: "#22c55e" },
    { id: "slate", label: "Slate", fg: "#0f172a", bg: "#ffffff", gradient: "#334155" },
    { id: "mono", label: "Mono", fg: "#111827", bg: "#f9fafb", gradient: "#111827" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-2">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
        Màu sắc phối hợp
      </h3>
      <div className="space-y-8">
        <div className="space-y-3">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 block">
            Preset nhanh
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onApplyPreset?.(p)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              >
                <span
                  className="inline-flex items-center gap-2"
                  aria-hidden="true"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: p.fg }}
                  />
                  {p.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 block">
              Màu chính
            </span>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus-within:border-indigo-500 transition-all">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => onFgColorChange(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                aria-label="Chọn màu chính"
              />
              <span className="text-sm font-mono font-bold uppercase text-slate-700 dark:text-slate-200">
                {fgColor}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 block">
              Màu nền
            </span>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus-within:border-indigo-500 transition-all">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                aria-label="Chọn màu nền"
              />
              <span className="text-sm font-mono font-bold uppercase text-slate-700 dark:text-slate-200">
                {bgColor}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              Sử dụng màu Gradient
            </span>
            <button
              type="button"
              onClick={() => onUseGradientChange(!useGradient)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                useGradient ? "bg-indigo-600" : "bg-slate-300"
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900`}
              role="switch"
              aria-checked={useGradient}
              aria-label="Bật/tắt gradient"
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                  useGradient ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
          {useGradient && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl w-fit animate-in zoom-in-95">
              <input
                type="color"
                value={gradientColor}
                onChange={(e) => onGradientColorChange(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                aria-label="Chọn màu gradient"
              />
              <span className="text-sm font-mono font-bold uppercase pr-4 text-slate-700 dark:text-slate-200">
                {gradientColor}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

