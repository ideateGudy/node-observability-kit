export type RuntimeTheme =
  | "tokyo-night"
  | "nord"
  | "dracula"
  | "catppuccin"
  | "emerald-terminal"
  | "cyberpunk";

export interface ThemeColors {
  id: RuntimeTheme;
  name: string;
  description: string;
  accent: string;
  accentSecondary: string;
  background: string;
  cardBg: string;
  cardBorder: string;
  headerBg: string;
  text: string;
  textMuted: string;
  switcherBg: string;
  badgeBg: string;
  badgeBorder: string;
  glow: string;
  surfaceSubtle: string;
  borderSubtle: string;
}

export const RUNTIME_THEMES: Record<RuntimeTheme, ThemeColors> = {
  "tokyo-night": {
    id: "tokyo-night",
    name: "Tokyo Night",
    description: "Deep obsidian, indigo & radiant cyan",
    accent: "#38bdf8",
    accentSecondary: "#818cf8",
    background: "#0b0d14",
    cardBg: "rgba(18, 22, 34, 0.78)",
    cardBorder: "rgba(56, 189, 248, 0.16)",
    headerBg: "linear-gradient(135deg, rgba(16, 20, 32, 0.96) 0%, rgba(26, 32, 51, 0.90) 100%)",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    switcherBg: "linear-gradient(90deg, rgba(13, 16, 26, 0.95) 0%, rgba(22, 28, 44, 0.95) 100%)",
    badgeBg: "rgba(56, 189, 248, 0.12)",
    badgeBorder: "rgba(56, 189, 248, 0.28)",
    glow: "rgba(56, 189, 248, 0.25)",
    surfaceSubtle: "rgba(22, 28, 44, 0.65)",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
  },
  nord: {
    id: "nord",
    name: "Nord",
    description: "Arctic frost, polar night & crisp slate",
    accent: "#38bdf8",
    accentSecondary: "#88c0d0",
    background: "#0f141c",
    cardBg: "rgba(23, 30, 42, 0.80)",
    cardBorder: "rgba(136, 192, 208, 0.18)",
    headerBg: "linear-gradient(135deg, rgba(20, 27, 38, 0.96) 0%, rgba(32, 42, 58, 0.90) 100%)",
    text: "#f8fafc",
    textMuted: "#94a3b8",
    switcherBg: "linear-gradient(90deg, rgba(15, 20, 29, 0.95) 0%, rgba(27, 36, 50, 0.95) 100%)",
    badgeBg: "rgba(136, 192, 208, 0.12)",
    badgeBorder: "rgba(136, 192, 208, 0.28)",
    glow: "rgba(136, 192, 208, 0.22)",
    surfaceSubtle: "rgba(27, 36, 50, 0.65)",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
  },
  dracula: {
    id: "dracula",
    name: "Dracula",
    description: "Dark abyss with radiant violet & magenta",
    accent: "#c084fc",
    accentSecondary: "#f472b6",
    background: "#0e0d15",
    cardBg: "rgba(24, 21, 35, 0.80)",
    cardBorder: "rgba(192, 132, 252, 0.20)",
    headerBg: "linear-gradient(135deg, rgba(22, 19, 32, 0.96) 0%, rgba(35, 29, 52, 0.90) 100%)",
    text: "#f8fafc",
    textMuted: "#a8b3cf",
    switcherBg: "linear-gradient(90deg, rgba(16, 14, 24, 0.95) 0%, rgba(32, 26, 48, 0.95) 100%)",
    badgeBg: "rgba(192, 132, 252, 0.12)",
    badgeBorder: "rgba(192, 132, 252, 0.28)",
    glow: "rgba(192, 132, 252, 0.25)",
    surfaceSubtle: "rgba(32, 26, 48, 0.65)",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
  },
  catppuccin: {
    id: "catppuccin",
    name: "Catppuccin Mocha",
    description: "Warm velvet mocha & soothing lavender",
    accent: "#b4befe",
    accentSecondary: "#f5c2e7",
    background: "#11111b",
    cardBg: "rgba(24, 24, 37, 0.80)",
    cardBorder: "rgba(180, 190, 254, 0.18)",
    headerBg: "linear-gradient(135deg, rgba(20, 20, 32, 0.96) 0%, rgba(33, 33, 50, 0.90) 100%)",
    text: "#f5f5f7",
    textMuted: "#a6adc8",
    switcherBg: "linear-gradient(90deg, rgba(17, 17, 27, 0.95) 0%, rgba(30, 30, 46, 0.95) 100%)",
    badgeBg: "rgba(180, 190, 254, 0.12)",
    badgeBorder: "rgba(180, 190, 254, 0.28)",
    glow: "rgba(180, 190, 254, 0.22)",
    surfaceSubtle: "rgba(30, 30, 46, 0.65)",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
  },
  "emerald-terminal": {
    id: "emerald-terminal",
    name: "Emerald Terminal",
    description: "Matrix deep void & luminous jade",
    accent: "#10b981",
    accentSecondary: "#34d399",
    background: "#030d08",
    cardBg: "rgba(6, 24, 16, 0.82)",
    cardBorder: "rgba(16, 185, 129, 0.22)",
    headerBg: "linear-gradient(135deg, rgba(5, 20, 13, 0.96) 0%, rgba(10, 36, 24, 0.90) 100%)",
    text: "#f0fdf4",
    textMuted: "#86efac",
    switcherBg: "linear-gradient(90deg, rgba(3, 14, 9, 0.95) 0%, rgba(9, 32, 22, 0.95) 100%)",
    badgeBg: "rgba(16, 185, 129, 0.14)",
    badgeBorder: "rgba(16, 185, 129, 0.30)",
    glow: "rgba(16, 185, 129, 0.25)",
    surfaceSubtle: "rgba(9, 32, 22, 0.65)",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
  },
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Ultra-modern neon fuchsia & electric cyan",
    accent: "#ff2a85",
    accentSecondary: "#00f2fe",
    background: "#090514",
    cardBg: "rgba(21, 13, 38, 0.82)",
    cardBorder: "rgba(255, 42, 133, 0.24)",
    headerBg: "linear-gradient(135deg, rgba(18, 10, 33, 0.96) 0%, rgba(35, 18, 62, 0.90) 100%)",
    text: "#ffffff",
    textMuted: "#cbd5e1",
    switcherBg: "linear-gradient(90deg, rgba(12, 7, 24, 0.95) 0%, rgba(29, 15, 52, 0.95) 100%)",
    badgeBg: "rgba(255, 42, 133, 0.15)",
    badgeBorder: "rgba(255, 42, 133, 0.32)",
    glow: "rgba(255, 42, 133, 0.28)",
    surfaceSubtle: "rgba(29, 15, 52, 0.65)",
    borderSubtle: "rgba(255, 255, 255, 0.08)",
  },
};
