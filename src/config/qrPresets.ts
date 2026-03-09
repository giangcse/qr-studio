import type { QrConfig } from "../types/qr";

export type QrContentPresetId =
  | "default_link"
  | "discount_voucher"
  | "restaurant_menu"
  | "contact_card_basic"
  | "group_invite";

export interface QrContentPreset {
  id: QrContentPresetId;
  label: string;
  description: string;
  apply: (config: QrConfig) => QrConfig;
}

export const qrContentPresets: QrContentPreset[] = [
  {
    id: "default_link",
    label: "Link website",
    description: "Dùng nhanh cho link trang web bất kỳ",
    apply: (config) => ({
      ...config,
      qrType: "url",
      text: "https://your-website.com",
    }),
  },
  {
    id: "discount_voucher",
    label: "Voucher giảm giá",
    description: "QR dẫn tới landing page khuyến mãi",
    apply: (config) => ({
      ...config,
      qrType: "url",
      text: "https://your-shop.com/khuyen-mai",
      fgColor: "#e11d48",
      bgColor: "#fff7ed",
      useGradient: true,
      gradientColor: "#fb7185",
    }),
  },
  {
    id: "restaurant_menu",
    label: "Menu nhà hàng",
    description: "Khách quét để xem menu online",
    apply: (config) => ({
      ...config,
      qrType: "url",
      text: "https://your-restaurant.com/menu",
      fgColor: "#0f766e",
      bgColor: "#ecfdf5",
      useGradient: false,
    }),
  },
  {
    id: "contact_card_basic",
    label: "Danh thiếp cơ bản",
    description: "Lưu nhanh thông tin liên hệ của bạn",
    apply: (config) => ({
      ...config,
      qrType: "vcard",
      vcardConfig: {
        ...config.vcardConfig,
        fullName: config.vcardConfig?.fullName || "Tên của bạn",
        phone: config.vcardConfig?.phone || "+84",
      },
      fgColor: "#1f2937",
      bgColor: "#f9fafb",
      useGradient: false,
    }),
  },
  {
    id: "group_invite",
    label: "Mời vào nhóm",
    description: "Dùng cho link nhóm Zalo/Telegram/Facebook",
    apply: (config) => ({
      ...config,
      qrType: "custom_link",
      text: "https://zalo.me/your-group-or-telegram-link",
      fgColor: "#2563eb",
      bgColor: "#eff6ff",
      useGradient: false,
    }),
  },
];

