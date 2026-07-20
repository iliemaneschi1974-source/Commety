"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

import { ReportCategory } from "@/types/report";

export type BoundingBox = [
  number, // south
  number, // north
  number, // west
  number // east
];

export type ReportFilter =
  | "all"
  | ReportCategory;

interface MapContextType {
  center: [number, number];
  zoom: number;

  userLocation: [number, number] | null;

  bounds: BoundingBox | null;

  filter: ReportFilter;

  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;

  setUserLocation: (
    position: [number, number] | null
  ) => void;

  setFilter: (
    filter: ReportFilter
  ) => void;

  flyTo: (
    center: [number, number],
    zoom?: number
  ) => void;

  fitBounds: (
    bounds: BoundingBox
  ) => void;

}

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [center, setCenter] =
    useState<[number, number]>([45.4642, 9.19]);

  const [zoom, setZoom] =
    useState(13);

  const [userLocation, setUserLocation] =
    useState<[number, number] | null>(null);

  const [bounds, setBounds] =
    useState<BoundingBox | null>(null);

  const [filter, setFilter] =
    useState<ReportFilter>("all");

  const flyTo = useCallback(
  (
    position: [number, number],
    newZoom = 15
  ) => {
    setBounds(null);
    setCenter(position);
    setZoom(newZoom);
  },
  []
);

  const fitBounds = useCallback(
  (newBounds: BoundingBox) => {
    setBounds(newBounds);
  },
  []
);

  return (
    <MapContext.Provider
      value={{
        center,
        zoom,

        userLocation,
        setUserLocation,

        bounds,

        filter,
        setFilter,

        setCenter,
        setZoom,

        flyTo,
        fitBounds,

      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error(
      "useMapContext deve essere usato dentro MapProvider"
    );
  }

  return context;
}
