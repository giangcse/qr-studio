export function ContentForm({ value, onChange }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-2">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
        Dữ liệu mã QR
      </h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Dán link website, email hoặc tin nhắn tại đây..."
        className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none min-h-[140px] transition-all resize-none text-lg"
      />
    </div>
  );
}

