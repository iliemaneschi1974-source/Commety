"use client";

import BottomSheet from "@/components/ui/BottomSheet";
import { Report } from "@/types/report";

interface ReportBottomSheetProps {
  report: Report | null;
  open: boolean;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<Report["type"], string> = {
  meteo: "🌧️ Meteo",
  traffico: "🚗 Traffico",
  pericolo: "⚠️ Pericolo",
  evento: "🎉 Evento",
  mare: "🏖️ Mare",
};

export default function ReportBottomSheet({
  report,
  open,
  onClose,
}: ReportBottomSheetProps) {
  if (!report) return null;

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="px-6 pb-8">
        <div className="mb-4">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {CATEGORY_LABELS[report.type]}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          {report.title}
        </h2>

        <p className="mt-2 text-slate-600">
          {report.description}
        </p>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-100 p-4">
          <div className="text-center">
            <div className="text-xl">👍</div>

            <div className="font-semibold">
              {report.confirmations}
            </div>

            <div className="text-xs text-slate-500">
              Conferme
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl">💬</div>

            <div className="font-semibold">
              {report.commentsCount}
            </div>

            <div className="text-xs text-slate-500">
              Commenti
            </div>
          </div>

          <div className="text-center max-w-[140px]">
            <div className="text-xl">📍</div>

            {report.address ? (
              <>
                <div className="text-xs font-medium text-slate-700 break-words">
                  {report.address}
                </div>

                {report.city && (
                  <div className="text-xs text-slate-500">
                    {report.city}
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs">
                {report.lat.toFixed(4)}
                <br />
                {report.lng.toFixed(4)}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="rounded-xl bg-[#2563FF] py-3 font-semibold text-white transition hover:bg-[#1d4ed8]">
            👍 Conferma
          </button>

          <button className="rounded-xl border py-3 font-semibold transition hover:bg-slate-100">
            💬 Commenta
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}