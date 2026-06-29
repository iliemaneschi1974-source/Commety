"use client";

import { useEffect } from "react";

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  open: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ImageViewer({
  images,
  currentIndex,
  open,
  onClose,
  onPrevious,
  onNext,
}: ImageViewerProps) {
  useEffect(() => {
    if (!open) return;

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

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose, onPrevious, onNext]);

  if (!open) {
    return null;
  }

  return (
   <div
  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
  onClick={onClose}
>
      <button
  onClick={(event) => {
    event.stopPropagation();
    onClose();
  }}
  className="absolute right-5 top-5 text-4xl font-light text-white transition hover:scale-110"
>
  ✕
</button>

      {images.length > 1 && (
        <button
  onClick={(event) => {
    event.stopPropagation();
    onPrevious();
  }}
  className="absolute left-5 text-5xl text-white transition hover:scale-110"
>
  ‹
</button>
      )}

      <img onClick={(event) => event.stopPropagation()}
        src={images[currentIndex]}
        alt="Segnalazione"
        className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain"
      />

      {images.length > 1 && (
        <button
  onClick={(event) => {
    event.stopPropagation();
    onNext();
  }}
  className="absolute right-5 text-5xl text-white transition hover:scale-110"
>
  ›
</button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 flex gap-2">
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