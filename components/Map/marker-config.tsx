import {
  Accessibility,
  BusFront,
  Car,
  CloudRain,
  PartyPopper,
  PawPrint,
  TriangleAlert,
  Waves,
  Wifi,
} from "lucide-react"
import { ReactElement } from "react"

import { ReportCategory } from "@/types/report"

export interface MarkerConfig {
  color: string
  icon: ReactElement
}

export const MARKER_CONFIG: Record<ReportCategory, MarkerConfig> = {
  meteo: {
    color: "#2563FF",
    icon: <CloudRain size={20} color="white" />,
  },

  traffico: {
    color: "#F59E0B",
    icon: <Car size={20} color="white" />,
  },

  pericolo: {
    color: "#EF4444",
    icon: <TriangleAlert size={20} color="white" />,
  },

  evento: {
    color: "#8B5CF6",
    icon: <PartyPopper size={20} color="white" />,
  },

  mare: {
    color: "#06B6D4",
    icon: <Waves size={20} color="white" />,
  },

  animali: {
    color: "#F97316",
    icon: <PawPrint size={20} color="white" />,
  },
  rete: {
    color: "#DB2777",
    icon: <Wifi size={20} color="white" />,
  },
  trasporti: {
    color: "#65A30D",
    icon: <BusFront size={20} color="white" />,
  },
  accessibilita: {
    color: "#475569",
    icon: <Accessibility size={20} color="white" />,
  },
}
