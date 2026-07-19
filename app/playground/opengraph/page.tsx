"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ReportOpenGraphImage from "@/components/opengraph-image/ReportOpenGraphImage";
import { mapReportToOpenGraphModel } from "@/lib/opengraphMapper";
import { getReportById } from "@/services/reports";
import { ReportOpenGraphModel } from "@/types/opengraph";

const institutionalPreview: ReportOpenGraphModel = {
  title: "Concerto live in piazza questa sera",
  address: "Via Cassia, Roma",
  relativeTime: "3 minuti fa",
  category: "evento",
};

export default function OpenGraphPlaygroundPage() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get("report");
  const [preview, setPreview] = useState<ReportOpenGraphModel | null>(() =>
    reportId ? null : institutionalPreview
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!reportId) {
      return;
    }

    getReportById(reportId)
      .then((report) => {
        if (!report || !report.isVisible) {
          setMessage("Segnalazione non trovata o non ancora approvata.");
          return;
        }

        setPreview(mapReportToOpenGraphModel(report));
        setMessage(null);
      })
      .catch(() => setMessage("Impossibile caricare questa segnalazione."));
  }, [reportId]);

  return (
    <main style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#E5E7EB", padding: 40, gap: 20 }}>
      {message ? <p style={{ color: "#0F2D5F", fontFamily: "sans-serif", fontWeight: 700 }}>{message}</p> : null}
      {!preview && !message ? <p style={{ color: "#0F2D5F", fontFamily: "sans-serif", fontWeight: 700 }}>Caricamento della segnalazione reale...</p> : null}
      {preview ? <div style={{ transform: "scale(0.7)", transformOrigin: "center center" }}><ReportOpenGraphImage report={preview} /></div> : null}
    </main>
  );
}
