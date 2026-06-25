"use client";

import { Marker } from "react-leaflet";
import { useMapContext } from "@/contexts/MapContext";

export default function UserLocation() {
  const { userLocation } = useMapContext();

  console.log(userLocation);

  if (!userLocation) return null;

  return <Marker position={userLocation} />;
}