"use client";

import { ReactNode } from "react";
import { MapProvider } from "@/contexts/MapContext";

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return <MapProvider>{children}</MapProvider>;
}