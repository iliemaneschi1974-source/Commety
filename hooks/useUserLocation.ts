"use client";

import { useEffect, useState } from "react";

interface UseUserLocationOptions {
  initialPosition: [number, number];
  onPositionFound?: (
    position: [number, number]
  ) => void;
}

export function useUserLocation({
  initialPosition,
  onPositionFound,
}: UseUserLocationOptions) {
  const [userPosition, setUserPosition] =
    useState<[number, number]>(
      initialPosition
    );

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn(
        "Geolocalizzazione non supportata"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setUserPosition(coords);

        onPositionFound?.(coords);
      },
      () => {
        console.warn(
          "Posizione non autorizzata"
        );
      }
    );
  }, [onPositionFound]);

  return {
    userPosition,
    setUserPosition,
  };
}