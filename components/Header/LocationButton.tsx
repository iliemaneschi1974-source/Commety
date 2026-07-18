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
        border
        border-white/20
        bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_45%,#1b4b87_100%)]
        text-white
        shadow-[0_10px_24px_rgba(2,16,42,0.34)]
        hover:brightness-110
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
