import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CloudRain,
  Car,
  TriangleAlert,
  PartyPopper,
} from "lucide-react";

export function getMarkerIcon(type: string) {
  const colors: Record<string, string> = {
    meteo: "#2563FF",
    traffico: "#F59E0B",
    pericolo: "#EF4444",
    evento: "#8B5CF6",
  };

  const icons = {
    meteo: <CloudRain size={20} color="white" />,
    traffico: <Car size={20} color="white" />,
    pericolo: <TriangleAlert size={20} color="white" />,
    evento: <PartyPopper size={20} color="white" />,
  };

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:42px;
        height:42px;
        border-radius:50%;
        background:${colors[type] || "#2563FF"};
        display:flex;
        align-items:center;
        justify-content:center;
        border:3px solid white;
        box-shadow:0 6px 16px rgba(0,0,0,.30);
      ">
        ${renderToStaticMarkup(
          icons[type as keyof typeof icons] ?? (
            <CloudRain size={20} color="white" />
          )
        )}
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });
}