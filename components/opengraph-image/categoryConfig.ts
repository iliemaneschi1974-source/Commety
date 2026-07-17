import { ReportCategory } from "@/types/report";

export interface OpenGraphCategoryConfig {
  /**
   * Nome visualizzato.
   */
  readonly label: string;

  /**
   * Colore ufficiale della categoria.
   */
  readonly color: string;

  /**
   * Emoji utilizzata dal renderer
   * Open Graph.
   *
   * Le emoji sono pienamente supportate
   * da @vercel/og e non richiedono
   * librerie client.
   */
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
};