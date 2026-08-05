import { ImageResponse } from "next/og";

import ReportOpenGraphImage from "@/components/opengraph-image/ReportOpenGraphImage";
import { mapReportToOpenGraphModel } from "@/lib/opengraphMapper";
import { getServerReportById } from "@/services/serverReports";

// La card completa viene memorizzata all'edge per evitare che i crawler social
// debbano attendere a ogni richiesta Firestore, Firebase Storage e ImageResponse.
// Dopo dieci minuti Next.js la rigenera con gli eventuali aggiornamenti.
export const revalidate = 600;

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface OpenGraphImageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Genera dinamicamente l'immagine Open Graph
 * di una segnalazione.
 */
export default async function OpenGraphImage({
  params,
}: OpenGraphImageProps) {
  const { id } = await params;

  const report = await getServerReportById(id);

  if (!report) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#FFFFFF",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Segnalazione non trovata
        </div>
      ),
      size
    );
  }

  const model = mapReportToOpenGraphModel(report);

  return new ImageResponse(
    <ReportOpenGraphImage report={model} />,
    size
  );
}
