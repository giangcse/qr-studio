import { useId, useState } from "react";
import { Image as ImageIcon, Trash2 } from "lucide-react";

const MAX_LOGO_BYTES = 500 * 1024;

export function LogoUploader({ logo, onLogoChange, onError }) {
  const inputId = useId();
  const [error, setError] = useState("");

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    if (file.type !== "image/png") {
      const msg = "Vui lòng chọn ảnh PNG (khuyến nghị PNG trong suốt).";
      setError(msg);
      onError?.(msg);
      return;
    }

    if (file.size > MAX_LOGO_BYTES) {
      const msg = "Logo quá lớn (tối đa 500KB). Hãy chọn ảnh nhỏ hơn.";
      setError(msg);
      onError?.(msg);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        onLogoChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-2 text-center">
      <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
        <ImageIcon size={40} />
      </div>
      <h3 className="text-lg font-bold mb-2">Chèn Logo thương hiệu</h3>
      <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">
        Tải ảnh PNG trong suốt lên để tăng tính nhận diện thương hiệu.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          type="file"
          onChange={handleLogoUpload}
          className="hidden"
          id={inputId}
          accept="image/png"
        />
        <label
          htmlFor={inputId}
          className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold cursor-pointer hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
        >
          Chọn tệp ảnh
        </label>
        {logo && (
          <button
            type="button"
            onClick={() => {
              setError("");
              onLogoChange("");
            }}
            className="w-full sm:w-auto px-10 py-4 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-2xl font-bold hover:bg-red-100 dark:hover:bg-red-950/45 transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
          >
            <Trash2 size={18} /> Gỡ bỏ
          </button>
        )}
      </div>

      {error && (
        <div className="mt-5 text-sm font-semibold text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}

