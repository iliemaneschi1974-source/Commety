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
  animation?: "standard" | "report";
}

export default function BottomSheet({
  open,
  onClose,
  children,
  animation = "standard",
}: BottomSheetProps) {
  const [animationPhase, setAnimationPhase] = useState<
    "hidden" | "entering" | "exiting"
  >("hidden");
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      hasOpened.current = true;
    }

    if (!open && !hasOpened.current) {
      return;
    }

    const delay = open ? 48 : 0;
    const timeout = window.setTimeout(() => {
      setAnimationPhase(open ? "entering" : "exiting");
    }, delay);

    return () => window.clearTimeout(timeout);
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

          rounded-t-[2rem]
          border-t border-white/15
          bg-[linear-gradient(145deg,#071a3c_0%,#0F2D5F_45%,#123b73_100%)]
          shadow-[0_-18px_45px_rgba(2,16,42,0.42)]

          transition-[transform,opacity]
          duration-300
          ease-out

          max-h-[85vh]
          overflow-hidden

          ${
            animationPhase === "entering"
              ? animation === "report"
                ? "commety-report-sheet-enter opacity-100"
                : "translate-y-0 opacity-100"
              : animationPhase === "exiting" && animation === "report"
                ? "commety-report-sheet-exit pointer-events-none"
                : "translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        {/* Header */}
        <div className="relative z-30">

          {/* Handle */}
          <div className="flex justify-center py-3">
            <div className="h-1.5 w-12 rounded-full bg-white/55" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="
              absolute
              z-40
              right-3
              top-2

              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-xl

              bg-red-500
              text-white
              shadow-[0_8px_18px_rgba(239,68,68,0.35)]

              transition-all
              duration-200

              hover:bg-red-600

              active:scale-95
            "
          >
            <X size={22} strokeWidth={2.5} />
          </button>

        </div>

        {/* Content */}
        <div className="relative z-10 overflow-y-auto max-h-[calc(85vh-32px)]">
          {children}
        </div>

      </div>
    </>
  );
}
