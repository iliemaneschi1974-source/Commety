"use client";

import { useEffect, useRef } from "react";

import { useMapContext } from "@/contexts/MapContext";
import { CATEGORY_COLORS } from "@/lib/categoryColors";

interface FiltersMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function FiltersMenu({
  open,
  onClose,
}: FiltersMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const { filter, setFilter } = useMapContext();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="
        absolute
        right-0
        top-16
        z-[3000]
        w-72
        rounded-2xl
        border
        border-white/15
        bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_55%,#123b73_100%)]
        p-4
        text-white
        shadow-[0_18px_45px_rgba(2,16,42,0.38)]
      "
    >
      <h3 className="mb-4 text-lg font-bold">
        Filtri
      </h3>

      <div className="space-y-2">

        <button
          onClick={() => {
            setFilter("evento");
            onClose();
          }}
          style={
            filter === "evento"
              ? {
                  backgroundColor:
                    CATEGORY_COLORS.evento,
                }
              : undefined
          }
          className={`
            flex
            w-full
            items-center
            rounded-xl
            border
            px-4
            py-3
            text-left
            transition-all
            duration-200

            ${
              filter === "evento"
                ? "border-transparent text-white shadow-md"
                : "border-white/15 bg-white/10 hover:bg-white/20"
            }
          `}
        >
          🎉
          <span className="ml-3 font-medium">
            Evento
          </span>
        </button>

        <button
          onClick={() => {
            setFilter("mare");
            onClose();
          }}
          style={
            filter === "mare"
              ? {
                  backgroundColor:
                    CATEGORY_COLORS.mare,
                }
              : undefined
          }
          className={`
            flex
            w-full
            items-center
            rounded-xl
            border
            px-4
            py-3
            text-left
            transition-all
            duration-200

            ${
              filter === "mare"
                ? "border-transparent text-white shadow-md"
                : "border-white/15 bg-white/10 hover:bg-white/20"
            }
          `}
        >
          🏖️
          <span className="ml-3 font-medium">
            Mare
          </span>
        </button>

      </div>

      <div className="mt-5 border-t border-white/15 pt-4">

        <div className="text-xs font-semibold uppercase text-white/60">
          Prossimamente
        </div>

        <div className="mt-3 space-y-2 text-sm text-white/75">

          <div>📷 Solo con foto</div>

          <div>✅ Solo confermate</div>

          <div>📍 Vicino a me</div>

          <div>⏰ Ultima ora</div>

        </div>

      </div>
    </div>
  );
}
