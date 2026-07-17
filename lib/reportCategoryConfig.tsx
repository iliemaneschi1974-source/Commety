import { ReactElement } from "react";
import {
  Car,
  CloudRain,
  PartyPopper,
  TriangleAlert,
  Waves,
} from "lucide-react";

import { ReportCategory } from "@/types/report";

export interface ReportCategoryConfig {
  /**
   * Nome visualizzato all'utente.
   */
  readonly label: string;

  /**
   * Colore ufficiale della categoria.
   */
  readonly color: string;

  /**
   * Icona ufficiale della categoria.
   */
  readonly icon: ReactElement;
}

export const REPORT_CATEGORY_CONFIG: Record<
  ReportCategory,
  ReportCategoryConfig
> = {
  meteo: {
    label: "Meteo",
    color: "#2563FF",
    icon: <CloudRain size={20} color="white" />,
  },

  traffico: {
    label: "Traffico",
    color: "#F59E0B",
    icon: <Car size={20} color="white" />,
  },

  pericolo: {
    label: "Pericolo",
    color: "#EF4444",
    icon: <TriangleAlert size={20} color="white" />,
  },

  evento: {
    label: "Evento",
    color: "#8B5CF6",
    icon: <PartyPopper size={20} color="white" />,
  },

  mare: {
    label: "Mare",
    color: "#06B6D4",
    icon: <Waves size={20} color="white" />,
  },
};