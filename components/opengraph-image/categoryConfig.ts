import { ReportCategory } from "@/types/report";

export interface OpenGraphCategoryConfig {
  readonly label: string;
  readonly color: string;
  readonly emoji: string;
}

export const OPEN_GRAPH_CATEGORY_CONFIG: Record<
  ReportCategory,
  OpenGraphCategoryConfig
> = {
  meteo: {
    label: "Meteo",
    color: "#2563FF",
    emoji: "🌧️",
  },
  traffico: {
    label: "Traffico",
    color: "#F59E0B",
    emoji: "🚗",
  },
  pericolo: {
    label: "Pericolo",
    color: "#EF4444",
    emoji: "⚠️",
  },
  evento: {
    label: "Evento",
    color: "#8B5CF6",
    emoji: "🎉",
  },
  mare: {
    label: "Mare",
    color: "#06B6D4",
    emoji: "🌊",
  },
  animali: {
    label: "Animali",
    color: "#F97316",
    emoji: "🐾",
  },
  rete: {
    label: "Rete",
    color: "#DB2777",
    emoji: "Wi-Fi",
  },
  trasporti: {
    label: "Trasporti",
    color: "#65A30D",
    emoji: "Bus",
  },
  accessibilita: {
    label: "Accessibilità",
    color: "#475569",
    emoji: "Accesso",
  },
};
