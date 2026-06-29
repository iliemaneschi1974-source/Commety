"use client";

import { ChangeEvent, useRef, useState } from "react";

import { compressImage } from "@/services/image";

interface ImagePickerProps {
  onChange?: (files: File[]) => void;
  maxImages?: number;
}

export default function ImagePicker({
  onChange,
  maxImages = 1,
}: ImagePickerProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [compressing, setCompressing] = useState(false);

  async function handleSelect(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selected = Array.from(
      event.target.files ?? []
    ).slice(0, maxImages);

    if (selected.length === 0) {
      return;
    }

    setCompressing(true);

    try {
      const compressed = await Promise.all(
        selected.map((file) => compressImage(file))
      );

      previews.forEach((preview) =>
        URL.revokeObjectURL(preview)
      );

      const urls = compressed.map((file) =>
        URL.createObjectURL(file)
      );

      setFiles(compressed);
      setPreviews(urls);

      onChange?.(compressed);
    } finally {
      setCompressing(false);

      event.target.value = "";
    }
  }

  function removeImage(index: number) {
    URL.revokeObjectURL(previews[index]);

    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter(
      (_, i) => i !== index
    );

    setFiles(newFiles);
    setPreviews(newPreviews);

    onChange?.(newFiles);
  }

  return (
    <div className="mb-6">

      <label className="mb-3 block text-sm font-medium text-slate-700">
        Foto
      </label>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleSelect}
      />

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple={maxImages > 1}
        className="hidden"
        onChange={handleSelect}
      />

      <div className="grid grid-cols-2 gap-3">

        <button
          type="button"
          disabled={compressing}
          onClick={() =>
            cameraInputRef.current?.click()
          }
          className="rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 p-4 font-medium text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
        >
          📷
          <br />
          Scatta foto
        </button>

        <button
          type="button"
          disabled={compressing}
          onClick={() =>
            galleryInputRef.current?.click()
          }
          className="rounded-xl border-2 border-dashed border-slate-300 p-4 font-medium transition hover:bg-slate-100 disabled:opacity-50"
        >
          🖼️
          <br />
          Galleria
        </button>

      </div>

      {compressing && (
        <p className="mt-3 text-sm text-slate-500">
          Ottimizzazione immagine...
        </p>
      )}

      {previews.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3">

          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative"
            >
              <img
                src={preview}
                alt="Anteprima"
                className="h-40 w-full rounded-xl object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  removeImage(index)
                }
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:bg-red-700"
              >
                ✕
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}