import React, { useEffect, useMemo, useState } from "react";
import {
  Download,
  Box,
  RotateCcw,
  Image as ImageIcon,
  Palette,
  Layout,
  Type,
  Moon,
  Sun,
} from "lucide-react";
import { useQrStyling } from "./hooks/useQrStyling";
import { ContentForm } from "./components/qr/ContentForm";
import { StyleControls } from "./components/qr/StyleControls";
import { ColorControls } from "./components/qr/ColorControls";
import { LogoUploader } from "./components/qr/LogoUploader";
import { PreviewPanel } from "./components/qr/PreviewPanel";
import { Toast } from "./components/ui/Toast";

const defaultConfig = {
  text: "https://google.com",
  dotsType: "square",
  cornersType: "square",
  cornersDotType: "square",
  fgColor: "#4f46e5",
  bgColor: "#ffffff",
  useGradient: false,
  gradientColor: "#9333ea",
  logo: "",
  size: 300,
};

export default function App() {
  const [config, setConfig] = useState(defaultConfig);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [theme, setTheme] = useState("system"); // system | light | dark
  const [toast, setToast] = useState(null);

  const { qrRef, download, copyToClipboard } = useQrStyling(config);

  const updateConfig = (partial) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const showToast = (next) => {
    setToast(next);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 4500);
  };

  const resolvedTheme = useMemo(() => {
    if (theme !== "system") return theme;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const tabs = [
    { id: "content", label: "Nội dung", icon: <Type size={18} /> },
    { id: "style", label: "Kiểu dáng", icon: <Layout size={18} /> },
    { id: "colors", label: "Màu sắc", icon: <Palette size={18} /> },
    { id: "logo", label: "Logo", icon: <ImageIcon size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <nav className="sticky top-0 z-50 bg-white/85 dark:bg-slate-950/75 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Box className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              QR Studio <span className="text-indigo-600">Pro</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setTheme((t) => (t === "dark" ? "light" : t === "light" ? "system" : "dark"))
              }
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              aria-label="Đổi giao diện (Sáng/Tối/Hệ thống)"
              title="Đổi giao diện (Sáng/Tối/Hệ thống)"
            >
              {resolvedTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              type="button"
              onClick={() => download("png")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
            >
              <Download size={16} />{" "}
              <span className="hidden sm:inline">Tải về</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            <div
              className="flex overflow-x-auto no-scrollbar gap-1 mb-6 p-1 bg-slate-200/50 dark:bg-slate-900/60 rounded-2xl w-full"
              role="tablist"
              aria-label="Các mục tùy chỉnh"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all flex-1 min-w-fit
                    ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-slate-950 text-indigo-600 shadow-sm"
                        : "text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100"
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950`}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-controls={`panel-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {activeTab === "content" && (
                <div
                  role="tabpanel"
                  id="panel-content"
                  aria-labelledby="tab-content"
                >
                  <ContentForm
                    value={config.text}
                    onChange={(value) => updateConfig({ text: value })}
                  />
                </div>
              )}

              {activeTab === "style" && (
                <div role="tabpanel" id="panel-style" aria-labelledby="tab-style">
                  <StyleControls
                    dotsType={config.dotsType}
                    cornersType={config.cornersType}
                    onDotsTypeChange={(value) =>
                      updateConfig({ dotsType: value })
                    }
                    onCornersTypeChange={(value) =>
                      updateConfig({ cornersType: value })
                    }
                  />
                </div>
              )}

              {activeTab === "colors" && (
                <div
                  role="tabpanel"
                  id="panel-colors"
                  aria-labelledby="tab-colors"
                >
                  <ColorControls
                    fgColor={config.fgColor}
                    bgColor={config.bgColor}
                    useGradient={config.useGradient}
                    gradientColor={config.gradientColor}
                    onFgColorChange={(value) => updateConfig({ fgColor: value })}
                    onBgColorChange={(value) => updateConfig({ bgColor: value })}
                    onUseGradientChange={(value) =>
                      updateConfig({ useGradient: value })
                    }
                    onGradientColorChange={(value) =>
                      updateConfig({ gradientColor: value })
                    }
                    onApplyPreset={(preset) => {
                      updateConfig({
                        fgColor: preset.fg,
                        bgColor: preset.bg,
                        gradientColor: preset.gradient,
                      });
                    }}
                  />
                </div>
              )}

              {activeTab === "logo" && (
                <div role="tabpanel" id="panel-logo" aria-labelledby="tab-logo">
                  <LogoUploader
                    logo={config.logo}
                    onLogoChange={(value) => updateConfig({ logo: value })}
                    onError={(message) =>
                      showToast({
                        tone: "error",
                        title: "Không thể dùng logo",
                        message,
                      })
                    }
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setConfig(defaultConfig);
              }}
              className="mt-10 flex items-center justify-center gap-2 w-full py-4 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors border-t border-slate-100 dark:border-slate-800 pt-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950 rounded-2xl"
            >
              <RotateCcw size={16} /> Đặt lại cấu hình ban đầu
            </button>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
            <PreviewPanel
              qrRef={qrRef}
              text={config.text}
              size={config.size}
              copied={copied}
              onCopy={async () => {
                const ok = await copyToClipboard();
                if (ok) {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } else {
                  showToast({
                    tone: "error",
                    title: "Không sao chép được ảnh",
                    message:
                      "Trình duyệt có thể không hỗ trợ sao chép ảnh. Bạn hãy dùng nút “Tải PNG” để lưu về máy.",
                  });
                }
              }}
              onDownloadPng={() => download("png")}
              onDownloadSvg={() => download("svg")}
              onSizeChange={(value) => updateConfig({ size: value })}
            />
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-12 text-center">
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em]">
          QR Studio Pro • Vietnam
        </p>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-in { animation: fade-in 0.2s ease-out; }
        .zoom-in-95 { animation: zoom-in 0.2s ease-out; }

        .qr-wrapper svg,
        .qr-wrapper canvas {
          border-radius: 12px;
          display: block;
          width: 100% !important;
          height: auto !important;
          max-width: 100%;
        }
        
        input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
        input[type="color"]::-webkit-color-swatch { border: none; border-radius: 6px; }
      `}</style>

      {toast && (
        <Toast
          tone={toast.tone}
          title={toast.title}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
