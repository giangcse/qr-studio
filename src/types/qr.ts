export type QrDotStyle =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy";

export type QrEyeFrameStyle = "square" | "dot" | "extra-rounded";

export interface QrGradientConfig {
  enabled: boolean;
  color: string;
}

export type QrType =
  | "url"
  | "text"
  | "wifi"
  | "vcard"
  | "email"
  | "sms"
  | "custom_link";

export interface WifiConfig {
  ssid: string;
  password: string;
  security: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export interface VCardConfig {
  fullName: string;
  phone: string;
  email?: string;
  company?: string;
  title?: string;
}

export interface EmailConfig {
  to: string;
  subject?: string;
  body?: string;
}

export interface SmsConfig {
  to: string;
  body?: string;
}

export interface QrConfig {
  text: string;
  qrType: QrType;
  wifiConfig?: WifiConfig;
  vcardConfig?: VCardConfig;
  emailConfig?: EmailConfig;
  smsConfig?: SmsConfig;
  dotsType: QrDotStyle;
  cornersType: QrEyeFrameStyle;
  cornersDotType: QrEyeFrameStyle;
  fgColor: string;
  bgColor: string;
  useGradient: boolean;
  gradientColor: string;
  logo: string;
  size: number;
}

