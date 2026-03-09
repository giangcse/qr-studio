import type { QrConfig } from "../types/qr";

const escapeVCard = (value: string) =>
  value.replace(/,/g, "\\,").replace(/;/g, "\\;");

export function buildQrPayload(config: QrConfig): string {
  switch (config.qrType) {
    case "wifi": {
      const wifi = config.wifiConfig;
      if (!wifi || !wifi.ssid) return config.text || "";
      const parts = [
        "WIFI:",
        `T:${wifi.security};`,
        `S:${wifi.ssid};`,
        wifi.password ? `P:${wifi.password};` : "",
        wifi.hidden ? "H:true;" : "",
        ";",
      ];
      return parts.join("");
    }
    case "vcard": {
      const v = config.vcardConfig;
      if (!v || !v.fullName) return config.text || "";
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${escapeVCard(v.fullName)}`,
        v.phone ? `TEL;TYPE=CELL:${v.phone}` : "",
        v.email ? `EMAIL;TYPE=INTERNET:${v.email}` : "",
        v.company ? `ORG:${escapeVCard(v.company)}` : "",
        v.title ? `TITLE:${escapeVCard(v.title)}` : "",
        "END:VCARD",
      ].filter(Boolean);
      return lines.join("\n");
    }
    case "email": {
      const e = config.emailConfig;
      if (!e || !e.to) return config.text || "";
      const params = new URLSearchParams();
      if (e.subject) params.set("subject", e.subject);
      if (e.body) params.set("body", e.body);
      const query = params.toString();
      return `mailto:${e.to}${query ? `?${query}` : ""}`;
    }
    case "sms": {
      const s = config.smsConfig;
      if (!s || !s.to) return config.text || "";
      if (s.body) {
        const encoded = encodeURIComponent(s.body);
        return `SMSTO:${s.to}:${encoded}`;
      }
      return `SMSTO:${s.to}`;
    }
    case "custom_link":
    case "url":
    case "text":
    default:
      return config.text || "";
  }
}

