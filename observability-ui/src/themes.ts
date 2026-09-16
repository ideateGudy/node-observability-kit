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
}

export const RUNTIME_THEMES: Record<RuntimeTheme, ThemeColors> = {
  "tokyo-night": {
    id: "tokyo-night",
    name: "Tokyo Night",
    description: "Deep indigo & neon cyan",
    accent: "#7aa2f7",
    accentSecondary: "#bb9af7",
    background: "#1a1b26",
    cardBg: "rgba(26, 27, 38, 0.85)",
    cardBorder: "rgba(122, 162, 247, 0.2)",
    headerBg: "linear-gradient(135deg, rgba(26, 27, 38, 0.95) 0%, rgba(36, 40, 59, 0.85) 100%)",
    text: "#c0caf5",
    textMuted: "#7982a9",
    switcherBg: "linear-gradient(90deg, #16161e 0%, #1f2335 100%)",
    badgeBg: "rgba(122, 162, 247, 0.15)",
    badgeBorder: "rgba(122, 162, 247, 0.35)",
    glow: "rgba(122, 162, 247, 0.35)",
  },
  nord: {
    id: "nord",
    name: "Nord",
    description: "Arctic cool frost blues",
    accent: "#88c0d0",
    accentSecondary: "#81a1c1",
    background: "#2e3440",
    cardBg: "rgba(46, 52, 64, 0.85)",
    cardBorder: "rgba(136, 192, 208, 0.2)",
    headerBg: "linear-gradient(135deg, rgba(46, 52, 64, 0.95) 0%, rgba(59, 66, 82, 0.85) 100%)",
    text: "#eceff4",
    textMuted: "#d8dee9",
    switcherBg: "linear-gradient(90deg, #242933 0%, #3b4252 100%)",
    badgeBg: "rgba(136, 192, 208, 0.15)",
    badgeBorder: "rgba(136, 192, 208, 0.35)",
    glow: "rgba(136, 192, 208, 0.35)",
  },
  dracula: {
    id: "dracula",
    name: "Dracula",
    description: "Vibrant purple & pink accents",
    accent: "#bd93f9",
    accentSecondary: "#ff79c6",
    background: "#282a36",
    cardBg: "rgba(40, 42, 54, 0.85)",
    cardBorder: "rgba(189, 147, 249, 0.25)",
    headerBg: "linear-gradient(135deg, rgba(40, 42, 54, 0.95) 0%, rgba(68, 71, 90, 0.85) 100%)",
    text: "#f8f8f2",
    textMuted: "#6272a4",
    switcherBg: "linear-gradient(90deg, #21222c 0%, #44475a 100%)",
    badgeBg: "rgba(189, 147, 249, 0.15)",
    badgeBorder: "rgba(189, 147, 249, 0.35)",
    glow: "rgba(189, 147, 249, 0.35)",
  },
  catppuccin: {
    id: "catppuccin",
    name: "Catppuccin Mocha",
    description: "Soothing pastel dark palette",
    accent: "#cba6f7",
    accentSecondary: "#f5c2e7",
    background: "#1e1e2e",
    cardBg: "rgba(30, 30, 46, 0.85)",
    cardBorder: "rgba(203, 166, 247, 0.2)",
    headerBg: "linear-gradient(135deg, rgba(30, 30, 46, 0.95) 0%, rgba(49, 50, 68, 0.85) 100%)",
    text: "#cdd6f4",
    textMuted: "#a6adc8",
    switcherBg: "linear-gradient(90deg, #181825 0%, #313244 100%)",
    badgeBg: "rgba(203, 166, 247, 0.15)",
    badgeBorder: "rgba(203, 166, 247, 0.35)",
    glow: "rgba(203, 166, 247, 0.35)",
  },
  "emerald-terminal": {
    id: "emerald-terminal",
    name: "Emerald Terminal",
    description: "Monochrome hacker terminal",
    accent: "#10b981",
    accentSecondary: "#34d399",
    background: "#021d12",
    cardBg: "rgba(2, 29, 18, 0.85)",
    cardBorder: "rgba(16, 185, 129, 0.25)",
    headerBg: "linear-gradient(135deg, rgba(2, 29, 18, 0.95) 0%, rgba(6, 78, 59, 0.85) 100%)",
    text: "#ecfdf5",
    textMuted: "#6ee7b7",
    switcherBg: "linear-gradient(90deg, #01140c 0%, #064e3b 100%)",
    badgeBg: "rgba(16, 185, 129, 0.15)",
    badgeBorder: "rgba(16, 185, 129, 0.35)",
    glow: "rgba(16, 185, 129, 0.35)",
  },
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "High-contrast neon pink",
    accent: "#ff007f",
    accentSecondary: "#00f0ff",
    background: "#0d0221",
    cardBg: "rgba(13, 2, 33, 0.85)",
    cardBorder: "rgba(255, 0, 127, 0.3)",
    headerBg: "linear-gradient(135deg, rgba(13, 2, 33, 0.95) 0%, rgba(38, 12, 69, 0.85) 100%)",
    text: "#ffffff",
    textMuted: "#00f0ff",
    switcherBg: "linear-gradient(90deg, #070114 0%, #2a0845 100%)",
    badgeBg: "rgba(255, 0, 127, 0.2)",
    badgeBorder: "rgba(255, 0, 127, 0.4)",
    glow: "rgba(255, 0, 127, 0.4)",
  },
};
