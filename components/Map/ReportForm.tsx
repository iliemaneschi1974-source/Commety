"use client";

import { useState } from "react";

import ImagePicker from "@/components/Map/ImagePicker";
import VideoRecorder from "@/components/Map/VideoRecorder";
import { ReportCategory } from "@/types/report";

export interface ReportFormData {
  type: ReportCategory;
  title: string;
  description: string;
  images: File[];
  video?: File;
  videoModerationFrames?: File[];
}

interface ReportFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReportFormData) => Promise<boolean> | boolean;
}

const INITIAL_FORM: ReportFormData = {
  type: "meteo",
  title: "",
  description: "",
  images: [],
  video: undefined,
  videoModerationFrames: [],
};

export default function ReportForm({
  open,
  onClose,
  onSubmit,
}: ReportFormProps) {
  const [form, setForm] =
    useState<ReportFormData>(INITIAL_FORM);

  const [submitting, setSubmitting] = useState(false);
  const [mediaMode, setMediaMode] = useState<"photo" | "video">("photo");

  const isCommunityEvent = form.type === "evento";
  const isAnimalReport = form.type === "animali";

  if (!open) {
    return null;
  }

  function handleClose() {
    setForm(INITIAL_FORM);
    setSubmitting(false);
    onClose();
  }

  async function handleSubmit() {
    if (!form.title.trim() || submitting) {
      return;
    }

    try {
      setSubmitting(true);

      const shouldClose = await onSubmit({
        type: form.type,
        title: form.title.trim(),
        description: form.description.trim(),
        images: form.images,
        video: form.video,
        videoModerationFrames: form.videoModerationFrames,
      });

      if (shouldClose) {
        handleClose();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4">
      <div className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_42%,#1b4b87_62%,#0a2553_100%)] p-6 text-white shadow-[0_18px_45px_rgba(2,16,42,0.45)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.18)_48%,transparent_62%)] [&>*]:relative [&>*]:z-10">

        <h2 className="mb-6 text-center text-2xl font-bold">
          Nuova segnalazione
        </h2>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <select
          className="mb-4 w-full rounded-xl border border-white/70 bg-white/95 p-3 text-slate-900 shadow-sm outline-none focus:border-white focus:ring-4 focus:ring-white/20"
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
          <option value="animali">🐾 Animali</option>
        </select>

        <input
          type="text"
          placeholder={
            isCommunityEvent
              ? "Es. Concerto live in piazza"
              : "Titolo"
          }
          className="mb-4 w-full rounded-xl border border-white/70 bg-white/95 p-3 text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-white focus:ring-4 focus:ring-white/20"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />

        <textarea
          placeholder={
            isCommunityEvent
              ? "Racconta cosa sta accadendo: concerto, partita, aperitivo, iniziativa o criticità locale."
              : "Descrizione"
          }
          className="mb-4 h-32 w-full resize-none rounded-xl border border-white/70 bg-white/95 p-3 text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-white focus:ring-4 focus:ring-white/20"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />

        {isCommunityEvent ? (
          <p className="-mt-1 mb-4 text-center text-xs leading-5 text-white/75">
            Gli Eventi raccontano la vita del territorio: momenti belli,
            iniziative, sport, musica e anche eventuali criticità. Evita volti
            riconoscibili nelle foto.
          </p>
        ) : null}

        {isAnimalReport ? (
          <p className="-mt-1 mb-4 text-center text-xs leading-5 text-white/75">
            Segnala animali in difficolta e luoghi amici degli animali. Per emergenze o maltrattamenti in corso contatta subito le autorita competenti.
          </p>
        ) : null}

        <div className="mb-4 grid grid-cols-2 rounded-xl border border-white/20 bg-white/10 p-1 text-sm font-bold">
          <button type="button" onClick={() => { setMediaMode("photo"); setForm((prev) => ({ ...prev, video: undefined, videoModerationFrames: [] })); }} className={`rounded-lg py-2 transition ${mediaMode === "photo" ? "bg-white text-[#0F2D5F]" : "text-white/75"}`}>Foto</button>
          <button type="button" onClick={() => { setMediaMode("video"); setForm((prev) => ({ ...prev, images: [] })); }} className={`rounded-lg py-2 transition ${mediaMode === "video" ? "bg-white text-[#0F2D5F]" : "text-white/75"}`}>Video · 5 s</button>
        </div>

        {mediaMode === "photo" ? <ImagePicker maxImages={1} onChange={(images) => setForm((prev) => ({ ...prev, images, video: undefined, videoModerationFrames: [] }))} /> : <VideoRecorder onChange={(video, videoModerationFrames) => setForm((prev) => ({ ...prev, video: video ?? undefined, images: [], videoModerationFrames }))} />}

        </div>

        <div className="mt-4 flex shrink-0 gap-3 border-t border-white/15 pt-4">

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="flex-1 rounded-xl border border-red-300/70 bg-red-500 py-3 font-medium text-white shadow-sm transition hover:bg-red-600 disabled:opacity-50"
          >
            Annulla
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              submitting ||
              !form.title.trim() ||
              (mediaMode === "video" &&
                (!form.video || form.videoModerationFrames?.length !== 3))
            }
            className="flex-1 rounded-xl border border-emerald-300/70 bg-emerald-500 py-3 font-medium text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-700/70"
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
