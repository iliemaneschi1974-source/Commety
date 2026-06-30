export const CommetyColors = {
  // Brand
  primary: "#2563FF",
  primaryLight: "#DBEAFE",
  primaryDark: "#1D4ED8",

  // Semantic
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#06B6D4",

  // Categories
  event: "#8B5CF6",

  // Surfaces
  background: "#FFFFFF",
  surface: "#FFFFFF",

  // Typography
  text: "#111827",
  textMuted: "#6B7280",

  // Borders
  border: "#E5E7EB",
  divider: "#F3F4F6",

  // Effects
  shadow: "rgba(15, 23, 42, 0.08)",
} as const

export type CommetyColor = keyof typeof CommetyColors