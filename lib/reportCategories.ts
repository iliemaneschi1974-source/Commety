import {
  Accessibility,
  BusFront,
  Globe,
  CloudRain,
  Car,
  TriangleAlert,
  PartyPopper,
  PawPrint,
  Waves,
  Wifi,
} from "lucide-react";

import { ReportFilter } from "@/contexts/MapContext";

export interface ReportCategory {
  id: ReportFilter;
  label: string;
  color: string;
  icon: React.ElementType;
}

export const REPORT_CATEGORIES: Record<
  ReportFilter,
  ReportCategory
> = {
  all: {
    id: "all",
    label: "Tutte",
    color: "#2563EB",
    icon: Globe,
  },

  meteo: {
    id: "meteo",
    label: "Meteo",
    color: "#0EA5E9",
    icon: CloudRain,
  },

  traffico: {
    id: "traffico",
    label: "Traffico",
    color: "#F59E0B",
    icon: Car,
  },

  pericolo: {
    id: "pericolo",
    label: "Pericolo",
    color: "#EF4444",
    icon: TriangleAlert,
  },

  evento: {
    id: "evento",
    label: "Evento",
    color: "#A855F7",
    icon: PartyPopper,
  },

  mare: {
    id: "mare",
    label: "Mare",
    color: "#14B8A6",
    icon: Waves,
  },

  animali: {
    id: "animali",
    label: "Animali",
    color: "#F97316",
    icon: PawPrint,
  },

  rete: {
    id: "rete",
    label: "Rete",
    color: "#DB2777",
    icon: Wifi,
  },

  trasporti: {
    id: "trasporti",
    label: "Trasporti",
    color: "#65A30D",
    icon: BusFront,
  },

  accessibilita: {
    id: "accessibilita",
    label: "Accessibilità",
    color: "#475569",
    icon: Accessibility,
  },
};
