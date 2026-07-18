import {
  Car,
  CloudRain,
  PartyPopper,
  TriangleAlert,
  Waves,
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
}
