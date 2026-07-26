"use client";

import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/button";
import { useMapContext } from "@/contexts/MapContext";
import { REPORT_CATEGORY_CONFIG } from "@/lib/reportCategoryConfig";
import { ReportCategory } from "@/types/report";

interface FiltersBottomSheetProps {
  open: boolean;
  onClose: () => void;
}

const ADDITIONAL_FILTERS: ReportCategory[] = [
  "evento",
  "mare",
  "rete",
  "trasporti",
  "accessibilita",
];

export default function FiltersBottomSheet({
  open,
  onClose,
}: FiltersBottomSheetProps) {
  const { filter, setFilter } = useMapContext();

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="px-6 pb-8">
        <h2 className="mb-6 text-2xl font-bold">Filtri</h2>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Altre categorie
        </h3>
        <div className="space-y-3">
          {ADDITIONAL_FILTERS.map((category) => {
            const config = REPORT_CATEGORY_CONFIG[category];

            return (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                className="w-full justify-start gap-3"
                onClick={() => {
                  setFilter(category);
                  onClose();
                }}
              >
                {config.icon}
                {config.label}
              </Button>
            );
          })}
          <Button
            variant={filter === "all" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => {
              setFilter("all");
              onClose();
            }}
          >
            Tutte
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
