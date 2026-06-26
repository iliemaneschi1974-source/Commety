"use client";

import { ReactNode, useEffect } from "react";

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
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-32px)]">
          {children}
        </div>
      </div>
    </>
  );
}