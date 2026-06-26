"use client";

import { Report } from "@/types/report";

interface ReportCardProps {
  report: Report;
  onClick?: (report: Report) => void;
}

const CATEGORY_ICONS: Record<Report["type"], string> = {
  meteo: "🌧️",
  traffico: "🚗",
  pericolo: "⚠️",
  evento: "🎉",
  mare: "🏖️",
};

const CATEGORY_LABELS: Record<Report["type"], string> = {
  meteo: "Meteo",
  traffico: "Traffico",
  pericolo: "Pericolo",
  evento: "Evento",
  mare: "Mare",
};

export default function ReportCard({
  report,
  onClick,
}: ReportCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(report)}
      className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md hover:border-blue-500"
    >
      <div className="flex items-start justify-between">

        <div className="flex gap-3">

          <div className="text-3xl">
            {CATEGORY_ICONS[report.type]}
          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              {report.title}
            </h3>

            <p className="mt-1 text-sm text-slate-600 line-clamp-2">
              {report.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                {CATEGORY_LABELS[report.type]}
              </span>

              <span className="text-xs text-slate-500">
                📍 {report.lat.toFixed(4)}, {report.lng.toFixed(4)}
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-4 flex items-center gap-5 text-sm text-slate-500">

        <span>
          👍 {report.confirmations ?? 0}
        </span>

        <span>
          💬 {report.commentsCount ?? 0}
        </span>

      </div>

    </button>
  );
}