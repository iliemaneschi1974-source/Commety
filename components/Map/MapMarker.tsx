import L, { DivIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

import { ReportCategory } from "@/types/report";
import { REPORT_CATEGORY_CONFIG } from "@/lib/reportCategoryConfig";

delete (L.Icon.Default.prototype as any)._getIconUrl;

/**
 * Restituisce il marker Leaflet
 * utilizzando la configurazione ufficiale
 * delle categorie di Commety.
 */
export function getMarkerIcon(type: ReportCategory): DivIcon {
  const config = REPORT_CATEGORY_CONFIG[type];

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