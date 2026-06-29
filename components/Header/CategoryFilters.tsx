"use client";

import { useMapContext } from "@/contexts/MapContext";

const FILTERS = [
  {
    id: "all",
    label: "🌍 Tutte",
  },
  {
    id: "meteo",
    label: "🌧️ Meteo",
  },
  {
    id: "traffico",
    label: "🚗 Traffico",
  },
  {
    id: "pericolo",
    label: "⚠️ Pericolo",
  },
  {
    id: "evento",
    label: "🎉 Evento",
  },
  {
    id: "mare",
    label: "🏖️ Mare",
  },
];

export default function CategoryFilters() {
  const {
    filter,
    setFilter,
  } = useMapContext();

  return (
    <div
      className="
        flex
        gap-2
        overflow-x-auto
        scrollbar-hide
        pb-1
      "
    >
      {FILTERS.map((item) => (
        <button
          key={item.id}
          onClick={() => setFilter(item.id as any)}
          className={`
            whitespace-nowrap
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            transition-all
            duration-200
            ${
              filter === item.id
                ? "bg-[#2563FF] text-white shadow-md scale-105"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }
          `}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}