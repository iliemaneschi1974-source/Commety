"use client";

import { Marker } from "react-leaflet";

import { useMapContext } from "@/contexts/MapContext";
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

  const { filter } = useMapContext();

  if (loading) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const visibleReports =
    filter === "all"
      ? reports
      : reports.filter(
          (report) => report.type === filter
        );

  return (
    <>
      {visibleReports.map((report) => (
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