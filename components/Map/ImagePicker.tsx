"use client";

import { ChangeEvent, useRef, useState } from "react";

interface ImagePickerProps {
  onChange?: (files: File[]) => void;
  maxImages?: number;
}

export default function ImagePicker({
  onChange,
  maxImages = 1,
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  function handleSelect(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selected = Array.from(
      event.target.files ?? []
    ).slice(0, maxImages);

    setFiles(selected);

    const urls = selected.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(urls);

    onChange?.(selected);
  }

  function removeImage(index: number) {
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

      <label className="mb-2 block text-sm font-medium text-slate-700">
        Foto
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={maxImages > 1}
        className="hidden"
        onChange={handleSelect}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full rounded-xl border-2 border-dashed border-slate-300 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50"
      >
        📷 Seleziona foto
      </button>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative"
            >
              <img
                src={preview}
                alt="Anteprima"
                className="h-36 w-full rounded-xl object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white"
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