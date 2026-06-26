"use client";

import { useMapEvents } from "react-leaflet";

interface ClickHandlerProps {
  onSelect: (
    position: [number, number]
  ) => void;
}

export default function ClickHandler({
  onSelect,
}: ClickHandlerProps) {
  useMapEvents({
    click(event) {
      onSelect([
        event.latlng.lat,
        event.latlng.lng,
      ]);
    },
  });

  return null;
}