import { Box, CheckCircle2, Eye, Settings } from "lucide-react";

export function PreviewPanel({
  qrRef,
  text,
  size,
  copied,
  onCopy,
  onDownloadPng,
  onDownloadSvg,
  onSizeChange,
  onSizePresetChange,
  caption,
  onCaptionChange,
  onCopyCaption,
}) {
  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 dark:shadow-black/30 border border-slate-100 dark:border-slate-800 flex flex-col items-center">
        <div className="w-full mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
              Kích thước QR
            </span>
            <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200">
              {size}px
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSizePresetChange?.(320)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500"
            >
              Chat app
            </button>
            <button
              type="button"
              onClick={() => onSizePresetChange?.(240)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500"
            >
              In nhỏ
            </button>
            <button
              type="button"
              onClick={() => onSizePresetChange?.(480)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500"
            >
              Poster
            </button>
          </div>
          <input
            type="range"
            min={200}
            max={600}
            step={10}
            value={size}
            onChange={(e) => onSizeChange?.(Number(e.target.value))}
            className="mt-1 w-full accent-indigo-600"
            aria-label="Chỉnh kích thước QR"
          />
        </div>

        <div className="relative mb-8 p-4 bg-white dark:bg-slate-950 rounded-[2rem] shadow-inner border border-slate-50 dark:border-slate-800 min-h-[300px] flex items-center justify-center w-full">
          <div
            ref={qrRef}
            className="qr-wrapper mx-auto shadow-2xl shadow-indigo-100/50 dark:shadow-black/30 rounded-2xl bg-white dark:bg-slate-950"
            style={{ width: `min(100%, ${size}px)` }}
          ></div>
          {!text && (
            <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center rounded-[2rem]">
              <Eye className="text-slate-200 dark:text-slate-700 mb-3" size={40} />
              <p className="text-slate-400 dark:text-slate-400 font-semibold tracking-tight">
                Đang đợi dữ liệu...
              </p>
            </div>
          )}
        </div>

        <div className="w-full space-y-3">
          <button
            type="button"
            onClick={onCopy}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
          >
            {copied ? (
              <CheckCircle2 size={18} className="text-green-400" />
            ) : (
              <Box size={18} />
            )}
            {copied ? "Đã sao chép" : "Sao chép ảnh"}
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onDownloadPng}
              className="py-4 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-300 rounded-2xl font-bold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-950/45 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
            >
              Tải PNG
            </button>
            <button
              type="button"
              onClick={onDownloadSvg}
              className="py-4 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-900 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
            >
              Tải SVG
            </button>
          </div>
        </div>
      </div>

      <div className="bg-indigo-600 p-5 rounded-3xl text-white shadow-lg shadow-indigo-200 dark:shadow-black/30">
        <div className="flex items-center gap-3 mb-2">
          <Settings size={18} className="opacity-80" />
          <h4 className="text-sm font-bold">Mẹo thiết kế</h4>
        </div>
        <p className="text-xs text-indigo-100 leading-relaxed">
          Màu mã (Dots) đậm hơn màu nền (Background) sẽ giúp các thiết bị quét
          nhanh và chính xác nhất.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          Chia sẻ nhanh
        </h4>
        <textarea
          value={caption}
          onChange={(e) => onCaptionChange?.(e.target.value)}
          placeholder="Nhập hoặc chỉnh sửa caption kèm QR để gửi vào ứng dụng chat..."
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[72px] resize-none"
        />
        <button
          type="button"
          onClick={onCopyCaption}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
        >
          Sao chép caption
        </button>
      </div>
    </div>
  );
}

