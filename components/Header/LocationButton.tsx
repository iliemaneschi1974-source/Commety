"use client";

import { useState } from "react";
import { Loader2, LocateFixed } from "lucide-react";
import { useMapContext } from "@/contexts/MapContext";

export default function LocationButton() {
  const {
    flyTo,
    setUserLocation,
  } = useMapContext();

  const [loading, setLoading] = useState(false);

  function handleLocation() {
    if (!navigator.geolocation) {
      alert("La geolocalizzazione non è supportata.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        // Salviamo la posizione reale dell'utente
        setUserLocation(coords);

        // Centriamo la mappa
        flyTo(coords, 17);

        setLoading(false);
      },
      () => {
        setLoading(false);
        alert("Impossibile ottenere la posizione.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  return (
    <button
      onClick={handleLocation}
      className="
        w-14
        h-14
        rounded-2xl
        bg-[#2563FF]
        text-white
        shadow-lg
        hover:bg-[#1f56e5]
        active:scale-95
        transition-all
        flex
        items-center
        justify-center
      "
    >
      {loading ? (
        <Loader2
          size={22}
          className="animate-spin"
        />
      ) : (
        <LocateFixed size={22} />
      )}
    </button>
  );
}