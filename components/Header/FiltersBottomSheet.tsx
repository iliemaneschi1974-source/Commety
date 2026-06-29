"use client";

import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/button";
import { useMapContext } from "@/contexts/MapContext";

interface FiltersBottomSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function FiltersBottomSheet({
  open,
  onClose,
}: FiltersBottomSheetProps) {
  const {
    filter,
    setFilter,
  } = useMapContext();

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
    >
      <div className="px-6 pb-8">

        <h2 className="mb-6 text-2xl font-bold">
          Filtri
        </h2>

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Altre categorie
        </h3>

        <div className="space-y-3">

          <Button
            variant={
              filter === "evento"
                ? "default"
                : "outline"
            }
            className="w-full justify-start"
            onClick={() => {
              setFilter("evento");
              onClose();
            }}
          >
            🎉 Evento
          </Button>

          <Button
            variant={
              filter === "mare"
                ? "default"
                : "outline"
            }
            className="w-full justify-start"
            onClick={() => {
              setFilter("mare");
              onClose();
            }}
          >
            🏖️ Mare
          </Button>

          <Button
            variant={
              filter === "all"
                ? "default"
                : "outline"
            }
            className="w-full justify-start"
            onClick={() => {
              setFilter("all");
              onClose();
            }}
          >
            🌍 Tutte
          </Button>

        </div>

        <div className="mt-8">

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            In arrivo
          </h3>

          <div className="space-y-2 text-sm text-slate-500">

            <div>📷 Solo con foto</div>

            <div>✅ Solo confermate</div>

            <div>📍 Vicino a me</div>

            <div>⏰ Ultima ora</div>

          </div>

        </div>

      </div>
    </BottomSheet>
  );
}