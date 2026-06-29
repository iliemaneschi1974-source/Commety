"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({
  open,
  onClose,
  children,
}: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-[1998]
          bg-black/40
          backdrop-blur-[2px]
          transition-all duration-300
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* Bottom Sheet */}
      <div
        className={`
          fixed
          bottom-0
          left-0
          right-0
          z-[1999]

          rounded-t-3xl
          bg-white
          shadow-2xl

          transition-transform
          duration-300
          ease-out

          max-h-[85vh]
          overflow-hidden

          ${
            open
              ? "translate-y-0"
              : "translate-y-full"
          }
        `}
      >
        {/* Header */}
        <div className="relative">

          {/* Handle */}
          <div className="flex justify-center py-3">
            <div className="h-1.5 w-12 rounded-full bg-slate-300" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="
              absolute
              right-3
              top-2

              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-full

              text-slate-500

              transition-all
              duration-200

              hover:bg-slate-100
              hover:text-slate-700

              active:scale-95
            "
          >
            <X size={22} strokeWidth={2.5} />
          </button>

        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-32px)]">
          {children}
        </div>

      </div>
    </>
  );
}