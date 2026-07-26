"use client";

import { useEffect, useRef } from "react";

import { useMapContext } from "@/contexts/MapContext";
import { REPORT_CATEGORY_CONFIG } from "@/lib/reportCategoryConfig";
import { ReportCategory } from "@/types/report";

interface FiltersMenuProps {
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

export default function FiltersMenu({ open, onClose }: FiltersMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { filter, setFilter } = useMapContext();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-16 z-[3000] w-72 rounded-2xl border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_55%,#123b73_100%)] p-4 text-white shadow-[0_18px_45px_rgba(2,16,42,0.38)]"
    >
      <h3 className="mb-4 text-lg font-bold">Filtri</h3>
      <div className="space-y-2">
        {ADDITIONAL_FILTERS.map((category) => {
          const config = REPORT_CATEGORY_CONFIG[category];
          const active = filter === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setFilter(category);
                onClose();
              }}
              style={active ? { backgroundColor: config.color } : undefined}
              className={`flex w-full items-center rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                active
                  ? "border-transparent text-white shadow-md"
                  : "border-white/15 bg-white/10 hover:bg-white/20"
              }`}
            >
              {config.icon}
              <span className="ml-3 font-medium">{config.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
