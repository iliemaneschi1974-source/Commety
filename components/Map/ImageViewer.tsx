"use client";

import { useEffect, useState } from "react";

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  open: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ANIMATION_DURATION = 200;

export default function ImageViewer({
  images,
  currentIndex,
  open,
  onClose,
  onPrevious,
  onNext,
}: ImageViewerProps) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, ANIMATION_DURATION);

      return () => clearTimeout(timer);
    }
  }, [open, visible]);

  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowLeft":
          onPrevious();
          break;

        case "ArrowRight":
          onNext();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [visible, onClose, onPrevious, onNext]);

  if (!visible) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/95
        transition-opacity duration-200
        ${open ? "opacity-100" : "opacity-0"}
      `}
    >
      <button
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-5 top-5 text-4xl text-white transition-all duration-200 hover:scale-110 active:scale-95"
      >
        ✕
      </button>

      {images.length > 1 && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            onPrevious();
          }}
          className="absolute left-5 text-5xl text-white transition-all duration-200 hover:scale-110 active:scale-95"
        >
          ‹
        </button>
      )}

      <img
        src={images[currentIndex]}
        alt="Segnalazione"
        onClick={(event) => event.stopPropagation()}
        className={`
          max-h-[90vh]
          max-w-[95vw]
          rounded-2xl
          object-contain
          shadow-2xl
          transition-all duration-200
          ${
            open
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0"
          }
        `}
      />

      {images.length > 1 && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          className="absolute right-5 text-5xl text-white transition-all duration-200 hover:scale-110 active:scale-95"
        >
          ›
        </button>
      )}

      {images.length > 1 && (
        <div
          className={`
            absolute bottom-6 flex gap-2
            transition-opacity duration-200
            ${open ? "opacity-100" : "opacity-0"}
          `}
        >
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}