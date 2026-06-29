"use client";

import { useState } from "react";

import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/button";
import Comments from "@/components/Map/Comments";
import ImageViewer from "@/components/Map/ImageViewer";
import { useConfirmation } from "@/hooks/useConfirmation";
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

  const {
    confirmed,
    loading,
    toggle,
  } = useConfirmation(report?.id);
  const [viewerOpen, setViewerOpen] = useState(false);
const [currentImage, setCurrentImage] = useState(0);

  if (!report) return null;



  return (
    <BottomSheet
      open={open}
      onClose={onClose}
    >
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
      {report.images.length > 0 && (
  <div className="mt-6">

    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
      📷 Foto
    </h3>

    {report.images.length === 1 ? (

  <div className="mt-4">
    <img
  src={report.images[0]}
  onClick={() => {
    setCurrentImage(0);
    setViewerOpen(true);
  }}
      alt="Foto segnalazione"
      loading="lazy"
      className="cursor-pointer mx-auto max-h-[70vh] w-auto max-w-full rounded-2xl border border-slate-200 bg-slate-100 shadow-sm"
    />
  </div>

) : report.images.length > 1 ? (

  <>
    <div
      className="
        mt-4
        flex
        snap-x
        snap-mandatory
        gap-4
        overflow-x-auto
        scroll-smooth
        pb-3
      "
    >
      {report.images.map((image, index) => (
        <img
          key={index}
          src={image}
          onClick={() => {
    setCurrentImage(index);
    setViewerOpen(true);
  }}
          alt={`Foto ${index + 1}`}
          loading="lazy"
          className="cursor-pointer 
            h-auto
            max-h-[70vh]
            w-full
            min-w-full
            snap-center
            rounded-2xl
            border
            border-slate-200
            bg-slate-100
            object-contain
            shadow-sm
          "
        />
      ))}
    </div>

    <div className="mt-2 flex justify-center gap-2">
      {report.images.map((_, index) => (
        <div
          key={index}
          className="h-2 w-2 rounded-full bg-slate-300"
        />
      ))}
    </div>
  </>

) : null}

    {report.images.length === 2 && (
      <div className="mt-2 text-center text-xs text-slate-400">
        ← scorri →
      </div>
    )}

  </div>
)}
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
                <div className="break-words text-xs font-medium text-slate-700">
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

          <Button
            onClick={toggle}
            disabled={loading}
            variant={confirmed ? "secondary" : "default"}
          >
            {loading
              ? "⏳ Conferma..."
              : confirmed
                ? "✅ Confermato"
                : "👍 Conferma"}
          </Button>

          <Button
            variant="outline"
          >
            💬 Commenta
          </Button>

        </div>

        <Comments reportId={report.id} />
</div>

<ImageViewer
  images={report.images}
  currentIndex={currentImage}
  open={viewerOpen}
  onClose={() => setViewerOpen(false)}
  onPrevious={() =>
    setCurrentImage((prev) =>
      prev === 0
        ? report.images.length - 1
        : prev - 1
    )
  }
  onNext={() =>
    setCurrentImage((prev) =>
      prev === report.images.length - 1
        ? 0
        : prev + 1
    )
  }
/>

</BottomSheet>
  );
}