"use client";

import { Loader2 } from "lucide-react";

import { useProcessingOverlay } from "@/hooks/useProcessingOverlay";

/**
 * ============================================================================
 * PROCESSING OVERLAY
 * ----------------------------------------------------------------------------
 *
 * Overlay globale mostrato durante
 * operazioni asincrone di lunga durata.
 *
 * Attualmente viene utilizzato dalla
 * pipeline di moderazione AI.
 *
 * ============================================================================
 */
export default function ProcessingOverlay() {

  const { state } =
    useProcessingOverlay();

  if (state === "IDLE") {
    return null;
  }

  let title = "";
  let description = "";

  switch (state) {

    case "PROCESSING":
      title =
        "Analisi della segnalazione";

      description =
        "Stiamo verificando automaticamente la tua segnalazione. L'operazione potrebbe richiedere alcuni secondi.";
      break;

    case "SUCCESS":
      title =
        "Segnalazione pubblicata";

      description =
        "Grazie per il tuo contributo.";
      break;

    case "ERROR":
      title =
        "Segnalazione non pubblicata";

      description =
        "L'immagine caricata non soddisfa i requisiti di pubblicazione di Commetty. Ti invitiamo a caricarne una diversa.";
      break;

  }

  return (

    <div
      className="
        fixed
        inset-0
        z-[99999]
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-8
          shadow-2xl
          text-center
        "
      >

        {state === "PROCESSING" && (

          <Loader2
            className="
              mx-auto
              mb-6
              h-12
              w-12
              animate-spin
              text-[#2563FF]
            "
          />

        )}

        {state === "SUCCESS" && (

          <div className="mb-6 text-5xl">
            ✅
          </div>

        )}

        {state === "ERROR" && (

          <div className="mb-6 text-5xl">
            ⚠️
          </div>

        )}

        <h2
          className="
            mb-4
            text-2xl
            font-bold
          "
        >
          {title}
        </h2>

        <p
          className="
            text-sm
            leading-6
            text-slate-600
          "
        >
          {description}
        </p>

      </div>

    </div>

  );

}