"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { useMapContext } from "@/contexts/MapContext";

export default function RecenterMap() {
  const map = useMap();

  const {
    center,
    zoom,
    bounds,
  } = useMapContext();

  const previousCenter = useRef<[number, number] | null>(null);
  const previousZoom = useRef<number | null>(null);
  const previousBounds = useRef<string | null>(null);
  const isInitialPosition = useRef(true);

  useEffect(() => {
    if (bounds) {
      const boundsKey = JSON.stringify(bounds);

      if (previousBounds.current === boundsKey) {
        return;
      }

      previousBounds.current = boundsKey;

      const southWest: [number, number] = [
        bounds[0],
        bounds[2],
      ];

      const northEast: [number, number] = [
        bounds[1],
        bounds[3],
      ];

      map.flyToBounds([southWest, northEast], {
        padding: [60, 60],
        maxZoom: 17,
        animate: true,
        duration: 1.3,
      });

      return;
    }

    if (
      previousCenter.current &&
      previousCenter.current[0] === center[0] &&
      previousCenter.current[1] === center[1] &&
      previousZoom.current === zoom
    ) {
      return;
    }

    if (isInitialPosition.current) {
      isInitialPosition.current = false;
      previousCenter.current = center;
      previousZoom.current = zoom;
      previousBounds.current = null;
      map.setView(center, zoom, { animate: false });
      return;
    }

    previousCenter.current = center;
    previousZoom.current = zoom;
    previousBounds.current = null;

    map.flyTo(center, zoom, {
      animate: true,
      duration: 1.4,
      easeLinearity: 0.25,
    });
  }, [bounds, center, zoom, map]);

  return null;
}
