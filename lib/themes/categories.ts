import {
  Car,
  CloudRain,
  PartyPopper,
  TriangleAlert,
  Umbrella,
  LucideIcon,
} from "lucide-react"

import { CommetyColors } from "@/lib/themes/colors"
import { ReportCategory } from "@/types/report"

export interface CategoryTheme {
  label: string
  color: string
  icon: LucideIcon
}

export const CategoryThemes: Record<ReportCategory, CategoryTheme> = {
  meteo: {
    label: "Meteo",
    color: CommetyColors.primary,
    icon: CloudRain,
  },

  traffico: {
    label: "Traffico",
    color: CommetyColors.warning,
    icon: Car,
  },

  pericolo: {
    label: "Pericolo",
    color: CommetyColors.danger,
    icon: TriangleAlert,
  },

  evento: {
    label: "Evento",
    color: CommetyColors.event,
    icon: PartyPopper,
  },

  mare: {
    label: "Mare",
    color: CommetyColors.info,
    icon: Umbrella,
  },
}