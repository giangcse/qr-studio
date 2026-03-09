import { qrContentPresets } from "../../config/qrPresets";

const QR_TYPES = [
  { id: "url", label: "URL" },
  { id: "text", label: "Văn bản" },
  { id: "wifi", label: "WiFi" },
  { id: "vcard", label: "Danh bạ" },
  { id: "email", label: "Email" },
  { id: "sms", label: "SMS" },
  { id: "custom_link", label: "Link khác" },
];

export function ContentForm({
  qrType,
  onQrTypeChange,
  value,
  onChange,
  wifiConfig,
  onWifiChange,
  vcardConfig,
  onVcardChange,
  emailConfig,
  onEmailChange,
  smsConfig,
  onSmsChange,
  onPresetClick,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-2 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Kiểu nội dung
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {QR_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onQrTypeChange(type.id)}
            className={`px-3 py-2 rounded-2xl border text-xs font-bold uppercase tracking-tight transition-all
              ${
                qrType === type.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Preset nội dung nhanh
          </h4>
          {onPresetClick && (
            <div className="flex flex-wrap gap-2">
              {qrContentPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onPresetClick(preset.id)}
                  className="px-3 py-2 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-[11px] font-bold uppercase tracking-tight text-slate-600 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/60 dark:bg-slate-950/40"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {qrType === "url" || qrType === "text" || qrType === "custom_link" ? (
          <>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Dữ liệu mã QR
            </h4>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Dán link website, email hoặc tin nhắn tại đây..."
              className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xlfocus:ring-2 focus:ring-indigo-500 outline-none min-h-[140px] transition-all resize-none text-lg"
            />
          </>
        ) : null}

        {qrType === "wifi" && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              WiFi
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={wifiConfig?.ssid || ""}
                onChange={(e) => onWifiChange({ ...wifiConfig, ssid: e.target.value })}
                placeholder="Tên mạng (SSID)"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                value={wifiConfig?.password || ""}
                onChange={(e) =>
                  onWifiChange({ ...wifiConfig, password: e.target.value })
                }
                placeholder="Mật khẩu"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={wifiConfig?.security || "WPA"}
                onChange={(e) =>
                  onWifiChange({
                    ...wifiConfig,
                    security: e.target.value,
                  })
                }
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Không mật khẩu</option>
              </select>
              <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={wifiConfig?.hidden || false}
                  onChange={(e) =>
                    onWifiChange({
                      ...wifiConfig,
                      hidden: e.target.checked,
                    })
                  }
                  className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                Mạng ẩn (Hidden)
              </label>
            </div>
          </div>
        )}

        {qrType === "vcard" && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Thông tin liên hệ (vCard)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={vcardConfig?.fullName || ""}
                onChange={(e) =>
                  onVcardChange({ ...vcardConfig, fullName: e.target.value })
                }
                placeholder="Họ và tên *"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="tel"
                value={vcardConfig?.phone || ""}
                onChange={(e) =>
                  onVcardChange({ ...vcardConfig, phone: e.target.value })
                }
                placeholder="Số điện thoại *"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                value={vcardConfig?.email || ""}
                onChange={(e) =>
                  onVcardChange({ ...vcardConfig, email: e.target.value })
                }
                placeholder="Email"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={vcardConfig?.company || ""}
                onChange={(e) =>
                  onVcardChange({ ...vcardConfig, company: e.target.value })
                }
                placeholder="Công ty"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={vcardConfig?.title || ""}
                onChange={(e) =>
                  onVcardChange({ ...vcardConfig, title: e.target.value })
                }
                placeholder="Chức vụ"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
              />
            </div>
          </div>
        )}

        {qrType === "email" && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Email
            </h4>
            <input
              type="email"
              value={emailConfig?.to || ""}
              onChange={(e) =>
                onEmailChange({ ...emailConfig, to: e.target.value })
              }
              placeholder="Địa chỉ email người nhận *"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={emailConfig?.subject || ""}
              onChange={(e) =>
                onEmailChange({ ...emailConfig, subject: e.target.value })
              }
              placeholder="Tiêu đề"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              value={emailConfig?.body || ""}
              onChange={(e) =>
                onEmailChange({ ...emailConfig, body: e.target.value })
              }
              placeholder="Nội dung email"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-none"
            />
          </div>
        )}

        {qrType === "sms" && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              SMS
            </h4>
            <input
              type="tel"
              value={smsConfig?.to || ""}
              onChange={(e) => onSmsChange({ ...smsConfig, to: e.target.value })}
              placeholder="Số điện thoại người nhận *"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              value={smsConfig?.body || ""}
              onChange={(e) =>
                onSmsChange({ ...smsConfig, body: e.target.value })
              }
              placeholder="Nội dung tin nhắn (tùy chọn)"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px] resize-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}

