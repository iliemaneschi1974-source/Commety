import L, { DivIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CloudRain,
  Car,
  TriangleAlert,
  PartyPopper,
  Umbrella,
} from "lucide-react";

import { ReportCategory } from "@/types/report";

delete (L.Icon.Default.prototype as any)._getIconUrl;

export interface MarkerConfig {
  color: string;
  icon: JSX.Element;
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
    icon: <Umbrella size={20} color="white" />,
  },
};

export function getMarkerIcon(type: ReportCategory): DivIcon {
  const config = MARKER_CONFIG[type];

  return L.divIcon({
    className: "commety-marker",

    html: `
      <div
        style="
          width:42px;
          height:42px;
          border-radius:50%;
          background:${config.color};
          display:flex;
          align-items:center;
          justify-content:center;
          border:3px solid white;
          box-shadow:0 8px 18px rgba(0,0,0,.30);
        "
      >
        ${renderToStaticMarkup(config.icon)}
      </div>
    `,

    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -18],
  });
}