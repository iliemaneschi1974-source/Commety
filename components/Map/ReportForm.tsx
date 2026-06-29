"use client";

import { useEffect, useState } from "react";

import ImagePicker from "@/components/Map/ImagePicker";
import { ReportCategory } from "@/types/report";

export interface ReportFormData {
  type: ReportCategory;
  title: string;
  description: string;
  images: File[];
}

interface ReportFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReportFormData) => Promise<void> | void;
}

const INITIAL_FORM: ReportFormData = {
  type: "meteo",
  title: "",
  description: "",
  images: [],
};

export default function ReportForm({
  open,
  onClose,
  onSubmit,
}: ReportFormProps) {
  const [form, setForm] =
    useState<ReportFormData>(INITIAL_FORM);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm(INITIAL_FORM);
      setSubmitting(false);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  async function handleSubmit() {
    if (!form.title.trim() || submitting) {
      return;
    }

    try {
      setSubmitting(true);

      await onSubmit({
        type: form.type,
        title: form.title.trim(),
        description: form.description.trim(),
        images: form.images,
      });

      setForm(INITIAL_FORM);

      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

        <h2 className="mb-6 text-2xl font-bold">
          Nuova segnalazione
        </h2>

        <select
          className="mb-4 w-full rounded-xl border p-3"
          value={form.type}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              type: e.target.value as ReportCategory,
            }))
          }
        >
          <option value="meteo">🌧️ Meteo</option>
          <option value="traffico">🚗 Traffico</option>
          <option value="pericolo">⚠️ Pericolo</option>
          <option value="evento">🎉 Evento</option>
          <option value="mare">🏖️ Mare</option>
        </select>

        <input
          type="text"
          placeholder="Titolo"
          className="mb-4 w-full rounded-xl border p-3"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />

        <textarea
          placeholder="Descrizione"
          className="mb-4 h-32 w-full resize-none rounded-xl border p-3"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />

        <ImagePicker
          maxImages={1}
          onChange={(images) =>
            setForm((prev) => ({
              ...prev,
              images,
            }))
          }
        />

        <div className="flex gap-3">

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="flex-1 rounded-xl border py-3 font-medium transition hover:bg-slate-100 disabled:opacity-50"
          >
            Annulla
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              submitting ||
              !form.title.trim()
            }
            className="flex-1 rounded-xl bg-[#2563FF] py-3 font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Pubblicazione..."
              : "Pubblica"}
          </button>

        </div>

      </div>
    </div>
  );
}