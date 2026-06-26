"use client";
import { Report } from "@/types/report";
import ReportBottomSheet from "@/components/Map/ReportBottomSheet";
import { useEffect, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Header from "@/components/Header/Header";
import ClickHandler from "@/components/Map/ClickHandler";
import FloatingButton from "@/components/Map/FloatingButton";
import RecenterMap from "@/components/Map/RecenterMap";
import ReportForm, {
  ReportFormData,
} from "@/components/Map/ReportForm";
import ReportsLayer from "@/components/Map/ReportsLayer";
import UserLocation from "@/components/Map/UserLocation";

import { useMapContext } from "@/contexts/MapContext";
import { createReport } from "@/services/reports";

// Fix marker Leaflet + Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapComponent() {
  const {
    center,
    zoom,
    flyTo,
  } = useMapContext();

  const [userPosition, setUserPosition] =
    useState<[number, number]>(center);

  const [selectedPosition, setSelectedPosition] =
    useState<[number, number] | null>(null);

  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] =
  useState<Report | null>(null);

const [sheetOpen, setSheetOpen] =
  useState(false);
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocalizzazione non supportata");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setUserPosition(coords);
        flyTo(coords, 15);
      },
      () => {
        console.warn("Posizione non autorizzata");
      }
    );
  }, []);

 const handleCreateReport = async (
  data: ReportFormData
) => {
  try {
    const position =
      selectedPosition ?? userPosition;

    console.log("selectedPosition:", selectedPosition);
    console.log("userPosition:", userPosition);

    await createReport({
      ...data,
      lat: position[0],
      lng: position[1],
    });

    setSelectedPosition(null);
    setOpen(false);
  } catch (error) {
    console.error(
      "Errore durante la creazione della segnalazione:",
      error
    );
  }
};

  return (
    <main className="relative h-screen w-screen">
      <Header />

      <MapContainer
        center={center}
        zoom={zoom}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <RecenterMap />

        <ClickHandler
          onSelect={(position) => {
            setSelectedPosition(position);
            setOpen(true);
          }}
        />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UserLocation />

        {selectedPosition && (
          <Marker position={selectedPosition}>
            <Popup>
              Nuova segnalazione
            </Popup>
          </Marker>
        )}

        <ReportsLayer
  onReportClick={(report) => {
    setSelectedReport(report);
    setSheetOpen(true);
  }}
/>
      </MapContainer>

      <FloatingButton
        onClick={() => setOpen(true)}
      />

      <ReportForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateReport}
      />
      <ReportBottomSheet
  report={selectedReport}
  open={sheetOpen}
  onClose={() => setSheetOpen(false)}
/>
    </main>
  );
}