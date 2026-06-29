"use client";

import { useState } from "react";

import { useMapContext, ReportFilter } from "@/contexts/MapContext";
import { CATEGORY_COLORS } from "@/lib/categoryColors";

import FiltersMenu from "./FiltersMenu";

import {
  Globe,
  CloudRain,
  Car,
  TriangleAlert,
  SlidersHorizontal,
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
];

export default function CategoryFilters() {
  const { filter, setFilter } = useMapContext();

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <div className="relative">

      <div className="grid grid-cols-5 gap-3">

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
                    ? "text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95"
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

        <button
          title="Filtri"
          onClick={() =>
            setMenuOpen((open) => !open)
          }
          className="
            flex
            h-12
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            text-slate-600
            transition-all
            duration-200
            hover:bg-slate-200
            active:scale-95
          "
        >
          <SlidersHorizontal
            size={22}
            strokeWidth={2.3}
          />
        </button>

      </div>

      <FiltersMenu
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />

    </div>
  );
}