import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  Type,
  Palette,
  Maximize,
  RotateCcw,
  Image as ImageIcon,
  Layout,
  Box,
  Circle,
  CheckCircle2,
  Trash2,
  Sliders,
  ChevronDown,
  Settings,
  Eye,
  Square,
  Disc,
  icons,
} from "lucide-react";

const useQRCodeStyling = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);
  return loaded;
};

export default function App() {
  const [text, setText] = useState("https://google.com");
  const [dotsType, setDotsType] = useState("square");
  const [cornersType, setCornersType] = useState("square");
  const [cornersDotType, setCornersDotType] = useState("square");
  const [fgColor, setFgColor] = useState("#4f46e5");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [useGradient, setUseGradient] = useState(false);
  const [gradientColor, setGradientColor] = useState("#9333ea");
  const [logo, setLogo] = useState("");
  const [size, setSize] = useState(300);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  const qrRef = useRef(null);
  const qrCodeInstance = useRef(null);
  const isLibReady = useQRCodeStyling();

  useEffect(() => {
    if (isLibReady && !qrCodeInstance.current) {
      qrCodeInstance.current = new window.QRCodeStyling({
        width: size,
        height: size,
        margin: 16,
        data: text,
        image: logo,
        dotsOptions: { color: fgColor, type: dotsType },
        backgroundOptions: { color: bgColor },
        imageOptions: { crossOrigin: "anonymous", margin: 5 },
        cornersSquareOptions: { type: cornersType, color: fgColor },
        cornersDotOptions: { type: cornersDotType, color: fgColor },
      });
      qrCodeInstance.current.append(qrRef.current);
    }
    updateQR();
  }, [
    isLibReady,
    text,
    dotsType,
    cornersType,
    cornersDotType,
    fgColor,
    bgColor,
    useGradient,
    gradientColor,
    logo,
    size,
  ]);

  const updateQR = () => {
    if (!qrCodeInstance.current) return;

    const dotsOptions = {
      type: dotsType,
      color: useGradient ? undefined : fgColor,
      gradient: useGradient
        ? {
            type: "linear",
            rotation: 45,
            colorStops: [
              { offset: 0, color: fgColor },
              { offset: 1, color: gradientColor },
            ],
          }
        : null,
    };

    qrCodeInstance.current.update({
      data: text,
      width: size,
      height: size,
      margin: 16,
      image: logo,
      dotsOptions: dotsOptions,
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: { type: cornersType, color: fgColor },
      cornersDotOptions: { type: cornersDotType, color: fgColor },
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const downloadQR = (ext) => {
    qrCodeInstance.current.download({ name: "qr-code", extension: ext });
  };

  const copyToClipboard = () => {
    const svg = qrRef.current.querySelector("svg");
    if (svg) {
      const xml = new XMLSerializer().serializeToString(svg);
      const svg64 = btoa(unescape(encodeURIComponent(xml)));
      const img = new Image();
      img.src = `data:image/svg+xml;base64,${svg64}`;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      };
    }
  };

  const tabs = [
    { id: "content", label: "Nội dung", icon: <Type size={18} /> },
    { id: "style", label: "Kiểu dáng", icon: <Layout size={18} /> },
    { id: "colors", label: "Màu sắc", icon: <Palette size={18} /> },
    { id: "logo", label: "Logo", icon: <ImageIcon size={18} /> },
  ];

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

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 shadow-sm">
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
              onClick={() => downloadQR("png")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-indigo-100"
            >
              <Download size={16} />{" "}
              <span className="hidden xs:inline">Tải về</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            <div className="flex overflow-x-auto no-scrollbar gap-1 mb-6 p-1 bg-slate-200/50 rounded-2xl w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all flex-1 min-w-fit
                    ${
                      activeTab === tab.id
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {activeTab === "content" && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Dữ liệu mã QR
                  </h3>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Dán link website, email hoặc tin nhắn tại đây..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none min-h-[140px] transition-all resize-none text-lg"
                  />
                </div>
              )}

              {activeTab === "style" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
                      Kiểu điểm dữ liệu (Dots)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {dotOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setDotsType(opt.id)}
                          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
                            ${
                              dotsType === opt.id
                                ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                                : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                            }`}
                        >
                          <div
                            className={`p-2 rounded-lg ${dotsType === opt.id ? "bg-indigo-600 text-white" : "bg-white text-slate-400 border border-slate-100"}`}
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

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
                      Hình dạng khung góc (Eye Frame)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {cornerOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setCornersType(opt.id)}
                          className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all
                            ${
                              cornersType === opt.id
                                ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                                : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                            }`}
                        >
                          <span className="text-sm font-bold">{opt.label}</span>
                          {cornersType === opt.id && <CheckCircle2 size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "colors" && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
                    Màu sắc phối hợp
                  </h3>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <span className="text-sm font-semibold text-slate-600 block">
                          Màu chính
                        </span>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus-within:border-indigo-500 transition-all">
                          <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                          />
                          <span className="text-sm font-mono font-bold uppercase">
                            {fgColor}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <span className="text-sm font-semibold text-slate-600 block">
                          Màu nền
                        </span>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus-within:border-indigo-500 transition-all">
                          <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                          />
                          <span className="text-sm font-mono font-bold uppercase">
                            {bgColor}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-slate-600">
                          Sử dụng màu Gradient
                        </span>
                        <button
                          onClick={() => setUseGradient(!useGradient)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${useGradient ? "bg-indigo-600" : "bg-slate-300"}`}
                        >
                          <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${useGradient ? "left-7" : "left-1"}`}
                          />
                        </button>
                      </div>
                      {useGradient && (
                        <div className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-100 rounded-2xl w-fit animate-in zoom-in-95">
                          <input
                            type="color"
                            value={gradientColor}
                            onChange={(e) => setGradientColor(e.target.value)}
                            className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                          />
                          <span className="text-sm font-mono font-bold uppercase pr-4">
                            {gradientColor}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "logo" && (
                <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 text-center">
                  <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <ImageIcon size={40} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    Chèn Logo thương hiệu
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">
                    Tải ảnh PNG trong suốt lên để tăng tính nhận diện thương
                    hiệu.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <input
                      type="file"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-input"
                      accept="image/*"
                    />
                    <label
                      htmlFor="logo-input"
                      className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold cursor-pointer hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                      Chọn tệp ảnh
                    </label>
                    {logo && (
                      <button
                        onClick={() => setLogo("")}
                        className="w-full sm:w-auto px-10 py-4 bg-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 size={18} /> Gỡ bỏ
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setText("https://google.com");
                setFgColor("#4f46e5");
                setBgColor("#ffffff");
                setUseGradient(false);
                setLogo("");
                setDotsType("square");
                setCornersType("square");
              }}
              className="mt-10 flex items-center justify-center gap-2 w-full py-4 text-slate-400 hover:text-slate-600 font-medium transition-colors border-t border-slate-100 pt-10"
            >
              <RotateCcw size={16} /> Đặt lại cấu hình ban đầu
            </button>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col items-center">
                <div className="relative mb-8 p-4 bg-white rounded-[2rem] shadow-inner border border-slate-50 min-h-[300px] flex items-center justify-center w-full">
                  <div
                    ref={qrRef}
                    className="qr-wrapper mx-auto shadow-2xl shadow-indigo-100/50 rounded-2xl bg-white"
                    style={{ width: `min(100%, ${size}px)` }}
                  ></div>
                  {!text && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center rounded-[2rem]">
                      <Eye className="text-slate-200 mb-3" size={40} />
                      <p className="text-slate-400 font-semibold tracking-tight">
                        Đang đợi dữ liệu...
                      </p>
                    </div>
                  )}
                </div>

                <div className="w-full space-y-3">
                  <button
                    onClick={copyToClipboard}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98]"
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
                      onClick={() => downloadQR("png")}
                      className="py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-100 transition-all"
                    >
                      Tải PNG
                    </button>
                    <button
                      onClick={() => downloadQR("svg")}
                      className="py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all"
                    >
                      Tải SVG
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-600 p-5 rounded-3xl text-white shadow-lg shadow-indigo-200">
                <div className="flex items-center gap-3 mb-2">
                  <Settings size={18} className="opacity-80" />
                  <h4 className="text-sm font-bold">Mẹo thiết kế</h4>
                </div>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  Màu mã (Dots) đậm hơn màu nền (Background) sẽ giúp các thiết
                  bị quét nhanh và chính xác nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 py-12 text-center">
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
    </div>
  );
}
