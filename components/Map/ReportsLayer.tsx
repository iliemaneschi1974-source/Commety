"use client";

import { Marker, Popup } from "react-leaflet";

import useReports from "@/hooks/useReports";
import { Report } from "@/types/report";
import { getMarkerIcon } from "./MapMarker";

interface ReportsLayerProps {
  onReportClick: (report: Report) => void;
}

export default function ReportsLayer({
  onReportClick,
}: ReportsLayerProps) {
  const {
    reports,
    loading,
    error,
  } = useReports();

  if (loading) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <>
      {reports.map((report) => (
        <Marker
  key={report.id}
  position={[report.lat, report.lng]}
  icon={getMarkerIcon(report.type)}
  eventHandlers={{
    click: () => onReportClick(report),
  }}
/>
      ))}
    </>
  );
}