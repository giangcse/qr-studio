import { Box, CheckCircle2, Circle, Disc, Layout, Square } from "lucide-react";

const dotOptions = [
  { id: "square", label: "Vuông", icon: <Square size={16} /> },
  { id: "dots", label: "Chấm", icon: <Circle size={16} /> },
  { id: "rounded", label: "Bo góc", icon: <Box size={16} /> },
  { id: "extra-rounded", label: "Tròn mạnh", icon: <Disc size={16} /> },
  { id: "classy", label: "Nghệ thuật", icon: <Layout size={16} /> },
];

const cornerOptions = [
  { id: "square", label: "Vuông" },
  { id: "dot", label: "Tròn" },
  { id: "extra-rounded", label: "Bo góc" },
];

export function StyleControls({
  dotsType,
  cornersType,
  onDotsTypeChange,
  onCornersTypeChange,
}) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
          Kiểu điểm dữ liệu (Dots)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {dotOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onDotsTypeChange(opt.id)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
                ${
                  dotsType === opt.id
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-300 hover:border-slate-200 dark:hover:border-slate-700"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900`}
            >
              <div
                className={`p-2 rounded-lg ${
                  dotsType === opt.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800"
                }`}
              >
                {opt.icon}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
          Hình dạng khung góc (Eye Frame)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {cornerOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onCornersTypeChange(opt.id)}
              className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all
                ${
                  cornersType === opt.id
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-300 hover:border-slate-200 dark:hover:border-slate-700"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900`}
            >
              <span className="text-sm font-bold">{opt.label}</span>
              {cornersType === opt.id && <CheckCircle2 size={16} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

