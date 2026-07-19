"use client";

import { useMapContext, ReportFilter } from "@/contexts/MapContext";
import { CATEGORY_COLORS } from "@/lib/categoryColors";

import {
  Globe,
  CloudRain,
  Car,
  TriangleAlert,
  PartyPopper,
  Waves,
} from "lucide-react";

const FILTERS: {
  id: ReportFilter;
  title: string;
  icon: React.ElementType;
}[] = [
  {
    id: "all",
    title: "Tutte",
    icon: Globe,
  },
  {
    id: "meteo",
    title: "Meteo",
    icon: CloudRain,
  },
  {
    id: "traffico",
    title: "Traffico",
    icon: Car,
  },
  {
    id: "pericolo",
    title: "Pericolo",
    icon: TriangleAlert,
  },
  {
    id: "evento",
    title: "Evento",
    icon: PartyPopper,
  },
  {
    id: "mare",
    title: "Mare",
    icon: Waves,
  },
];

export function CategoryRail() {
  return (
    <aside
      aria-label="Filtri categorie"
      className="fixed left-0 top-[60%] z-[1100] flex -translate-y-1/2 flex-col gap-1 rounded-r-3xl border border-white/15 bg-[linear-gradient(145deg,#071a3c_0%,#0F2D5F_55%,#123b73_100%)] p-1 shadow-[0_18px_42px_rgba(2,16,42,0.38)] sm:top-1/2 sm:gap-2 sm:p-2"
    >
      <CategoryButtons compact />
    </aside>
  );
}

function CategoryButtons({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { filter, setFilter } = useMapContext();

  return FILTERS.map((item) => {
    const Icon = item.icon;
    const active = filter === item.id;

    return (
      <button
        key={item.id}
        type="button"
        title={item.title}
        aria-label={item.title}
        onClick={() => setFilter(item.id)}
        style={
          active
            ? {
                backgroundColor: CATEGORY_COLORS[item.id],
              }
            : undefined
        }
        className={`flex items-center justify-center rounded-2xl transition-all duration-200 ${
          compact ? "size-10 sm:size-12" : "h-12"
        } ${
          active
            ? "scale-105 text-white shadow-[0_8px_18px_rgba(2,16,42,0.28)]"
            : "border border-white/15 bg-white/12 text-white hover:bg-white/22 active:scale-95"
        }`}
      >
        <Icon size={22} strokeWidth={2.3} />
      </button>
    );
  });
}
