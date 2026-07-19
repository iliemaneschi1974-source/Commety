"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;

  title?: string;

  children: ReactNode;

  onClose: () => void;
}

export default function Modal({
  open,
  title,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[2000]
        flex
        items-center
        justify-center
        bg-black/50
        p-6
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-h-[calc(100dvh-2rem)]
          max-w-md
          overflow-y-auto
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {title && (
          <h2
            className="
              mb-6
              text-center
              text-2xl
              font-bold
            "
          >
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}
