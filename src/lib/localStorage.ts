import type { QrConfig } from "../types/qr";

const RECENT_KEY = "qr_studio_recent_configs";
const TEMPLATES_KEY = "qr_studio_my_templates";
const MAX_RECENT = 5;

export interface SavedTemplate {
  id: string;
  name: string;
  config: QrConfig;
  createdAt: number;
}

export function saveRecentConfig(config: QrConfig) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const list: QrConfig[] = raw ? JSON.parse(raw) : [];
    const next = [config, ...list].slice(0, MAX_RECENT);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function loadRecentConfigs(): QrConfig[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as QrConfig[]) : [];
  } catch {
    return [];
  }
}

export function saveMyTemplate(name: string, config: QrConfig) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(TEMPLATES_KEY);
    const list: SavedTemplate[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const item: SavedTemplate = {
      id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim() || "Mẫu không tên",
      config,
      createdAt: now,
    };
    const next = [item, ...list];
    window.localStorage.setItem(TEMPLATES_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function loadMyTemplates(): SavedTemplate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(TEMPLATES_KEY);
    return raw ? (JSON.parse(raw) as SavedTemplate[]) : [];
  } catch {
    return [];
  }
}

