"use client";

import { Marker, Popup } from "react-leaflet";

import useReports from "@/hooks/useReports";
import { Report } from "@/types/report";
import { getMarkerIcon } from "./MapMarker";

interface ReportsLayerProps {
  onReportClick?: (report: Report) => void;
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
            click: () => onReportClick?.(report),
          }}
        >
          <Popup>
            <div className="min-w-[220px]">

              <h3 className="text-lg font-bold">
                {report.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {report.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">

                <span className="uppercase">
                  {report.type}
                </span>

                <span>
                  👍 {report.confirmations ?? 0}
                </span>

              </div>

            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}