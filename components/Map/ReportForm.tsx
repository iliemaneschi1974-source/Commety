"use client";

import { useState } from "react";

import ImagePicker from "@/components/Map/ImagePicker";
import VideoRecorder from "@/components/Map/VideoRecorder";
import { REPORT_CATEGORY_CONFIG } from "@/lib/reportCategoryConfig";
import {
  AccessibilityReportKind,
  NetworkService,
  ReportCategory,
  TransportMode,
} from "@/types/report";

export interface ReportFormData {
  type: ReportCategory;
  title: string;
  description: string;
  images: File[];
  video?: File;
  videoModerationFrames?: File[];
  networkDetails?: {
    operator: string;
    service: NetworkService;
    startedAt: string;
  };
  transportDetails?: {
    mode: TransportMode;
    line?: string;
  };
  accessibilityDetails?: {
    kind: AccessibilityReportKind;
  };
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
  networkDetails: {
    operator: "",
    service: "internet",
    startedAt: "",
  },
  transportDetails: {
    mode: "autobus",
    line: "",
  },
  accessibilityDetails: {
    kind: "ostacolo",
  },
};

const CATEGORY_OPTIONS: ReportCategory[] = [
  "meteo",
  "traffico",
  "pericolo",
  "evento",
  "mare",
  "animali",
  "rete",
  "trasporti",
  "accessibilita",
];

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
  const isNetworkReport = form.type === "rete";
  const isTransportReport = form.type === "trasporti";
  const isAccessibilityReport = form.type === "accessibilita";
  const hasRequiredCategoryDetails =
    !isNetworkReport ||
    Boolean(
      form.networkDetails?.operator.trim() &&
        form.networkDetails.service &&
        form.networkDetails.startedAt
    );

  if (!open) {
    return null;
  }

  function handleClose() {
    setForm(INITIAL_FORM);
    setSubmitting(false);
    onClose();
  }

  async function handleSubmit() {
    if (!form.title.trim() || !hasRequiredCategoryDetails || submitting) {
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
        networkDetails: isNetworkReport ? form.networkDetails : undefined,
        transportDetails: isTransportReport ? form.transportDetails : undefined,
        accessibilityDetails: isAccessibilityReport
          ? form.accessibilityDetails
          : undefined,
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
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
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
          <option value="rete">Rete</option>
          <option value="trasporti">Trasporti</option>
          <option value="accessibilita">Accessibilità</option>
        </select>

        <fieldset className="mb-5">
          <legend className="mb-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/70">
            Categoria
          </legend>

          <div className="grid grid-cols-3 gap-2">
            {CATEGORY_OPTIONS.map((category) => {
              const config = REPORT_CATEGORY_CONFIG[category];
              const selected = form.type === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      type: category,
                      ...(category === "rete"
                        ? {
                            images: [],
                            video: undefined,
                            videoModerationFrames: [],
                          }
                        : {}),
                    }))
                  }
                  style={
                    selected
                      ? {
                          backgroundColor: `${config.color}2b`,
                          borderColor: config.color,
                          boxShadow: `0 8px 20px ${config.color}45`,
                        }
                      : undefined
                  }
                  className={`flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-2 text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/70 active:scale-[0.97] ${
                    selected
                      ? "scale-[1.02] text-white"
                      : "border-white/15 bg-white/10 text-white/80 hover:border-white/35 hover:bg-white/18 hover:text-white"
                  }`}
                >
                  <span className="relative flex h-10 w-10 items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 h-4 w-4 rotate-45 rounded-[3px]"
                      style={{ backgroundColor: config.color }}
                    />
                    <span
                      className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-[0_5px_12px_rgba(2,16,42,0.35)]"
                      style={{ backgroundColor: config.color }}
                    >
                      {config.icon}
                    </span>
                  </span>
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

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

        {isNetworkReport ? (
          <fieldset className="mb-4 space-y-3 rounded-2xl border border-white/20 bg-white/10 p-4">
            <legend className="px-2 text-xs font-bold uppercase tracking-[0.14em] text-white/75">
              Dettagli del disservizio
            </legend>
            <label className="block text-sm font-semibold">
              Operatore
              <input
                type="text"
                required
                placeholder="Es. TIM, Vodafone, Iliad"
                value={form.networkDetails?.operator ?? ""}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    networkDetails: {
                      operator: event.target.value,
                      service: previous.networkDetails?.service ?? "internet",
                      startedAt: previous.networkDetails?.startedAt ?? "",
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-xl border border-white/70 bg-white/95 p-3 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-white/20"
              />
            </label>
            <label className="block text-sm font-semibold">
              Linea coinvolta
              <select
                value={form.networkDetails?.service ?? "internet"}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    networkDetails: {
                      operator: previous.networkDetails?.operator ?? "",
                      service: event.target.value as NetworkService,
                      startedAt: previous.networkDetails?.startedAt ?? "",
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-xl border border-white/70 bg-white/95 p-3 text-slate-900 outline-none focus:ring-4 focus:ring-white/20"
              >
                <option value="internet">Linea Internet</option>
                <option value="rete-fissa">Rete fissa</option>
                <option value="5g">Rete 5G</option>
                <option value="tutte">Tutte le linee</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">
              Inizio del disservizio
              <input
                type="datetime-local"
                required
                value={form.networkDetails?.startedAt ?? ""}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    networkDetails: {
                      operator: previous.networkDetails?.operator ?? "",
                      service: previous.networkDetails?.service ?? "internet",
                      startedAt: event.target.value,
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-xl border border-white/70 bg-white/95 p-3 text-slate-900 outline-none focus:ring-4 focus:ring-white/20"
              />
            </label>
            <p className="text-xs leading-5 text-white/70">
              Le segnalazioni Rete sono esclusivamente testuali.
            </p>
          </fieldset>
        ) : null}

        {isTransportReport ? (
          <fieldset className="mb-4 grid grid-cols-2 gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
            <legend className="px-2 text-xs font-bold uppercase tracking-[0.14em] text-white/75">
              Dettagli del trasporto
            </legend>
            <label className="text-sm font-semibold">
              Mezzo
              <select
                value={form.transportDetails?.mode ?? "autobus"}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    transportDetails: {
                      mode: event.target.value as TransportMode,
                      line: previous.transportDetails?.line ?? "",
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-xl border border-white/70 bg-white/95 p-3 text-slate-900 outline-none"
              >
                <option value="metro">Metro</option>
                <option value="autobus">Autobus</option>
                <option value="tram">Tram</option>
                <option value="treno">Treno</option>
                <option value="altro">Altro</option>
              </select>
            </label>
            <label className="text-sm font-semibold">
              Linea
              <input
                type="text"
                placeholder="Es. 64, M1"
                value={form.transportDetails?.line ?? ""}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    transportDetails: {
                      mode: previous.transportDetails?.mode ?? "autobus",
                      line: event.target.value,
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-xl border border-white/70 bg-white/95 p-3 text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>
          </fieldset>
        ) : null}

        {isAccessibilityReport ? (
          <label className="mb-4 block rounded-2xl border border-white/20 bg-white/10 p-4 text-sm font-semibold">
            Tipo di segnalazione
            <select
              value={form.accessibilityDetails?.kind ?? "ostacolo"}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  accessibilityDetails: {
                    kind: event.target.value as AccessibilityReportKind,
                  },
                }))
              }
              className="mt-1.5 w-full rounded-xl border border-white/70 bg-white/95 p-3 text-slate-900 outline-none"
            >
              <option value="spazio-accessibile">Spazio accessibile</option>
              <option value="ostacolo">Ostacolo o barriera</option>
              <option value="parcheggio">Parcheggio riservato</option>
              <option value="rampa">Rampa</option>
              <option value="ascensore">Ascensore</option>
              <option value="altro">Altro</option>
            </select>
          </label>
        ) : null}

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

        {!isNetworkReport ? (
        <>
        <div className="mb-4 grid grid-cols-2 rounded-xl border border-white/20 bg-white/10 p-1 text-sm font-bold">
          <button type="button" onClick={() => { setMediaMode("photo"); setForm((prev) => ({ ...prev, video: undefined, videoModerationFrames: [] })); }} className={`rounded-lg py-2 transition ${mediaMode === "photo" ? "bg-white text-[#0F2D5F]" : "text-white/75"}`}>Foto</button>
          <button type="button" onClick={() => { setMediaMode("video"); setForm((prev) => ({ ...prev, images: [] })); }} className={`rounded-lg py-2 transition ${mediaMode === "video" ? "bg-white text-[#0F2D5F]" : "text-white/75"}`}>Video · 5 s</button>
        </div>

        {mediaMode === "photo" ? <ImagePicker maxImages={1} onChange={(images) => setForm((prev) => ({ ...prev, images, video: undefined, videoModerationFrames: [] }))} /> : <VideoRecorder onChange={(video, videoModerationFrames) => setForm((prev) => ({ ...prev, video: video ?? undefined, images: [], videoModerationFrames }))} />}
        </>
        ) : null}

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
              !hasRequiredCategoryDetails ||
              (!isNetworkReport &&
                mediaMode === "video" &&
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
