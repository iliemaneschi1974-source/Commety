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

export default function CategoryFilters() {
  const { filter, setFilter } = useMapContext();

  return (
    <div className="relative">

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">

        {FILTERS.map((item) => {
          const Icon = item.icon;

          const active =
            filter === item.id;

          return (
            <button
              key={item.id}
              title={item.title}
              onClick={() => setFilter(item.id)}
              style={
                active
                  ? {
                      backgroundColor:
                        CATEGORY_COLORS[item.id],
                    }
                  : undefined
              }
              className={`
                flex
                h-12
                items-center
                justify-center
                rounded-2xl
                transition-all
                duration-200

                ${
                  active
                    ? "text-white shadow-[0_8px_18px_rgba(2,16,42,0.28)] scale-105"
                    : "border border-white/15 bg-white/12 text-white hover:bg-white/22 active:scale-95"
                }
              `}
            >
              <Icon
                size={22}
                strokeWidth={2.3}
              />
            </button>
          );
        })}

      </div>

    </div>
  );
}
