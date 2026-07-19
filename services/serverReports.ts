import { adminDb } from "@/lib/firebase-admin";

import { Report } from "@/types/report";

/**
 * Recupera una segnalazione tramite ID
 * utilizzando Firebase Admin SDK.
 *
 * Questo servizio è destinato
 * esclusivamente all'esecuzione server-side
 * (Open Graph, Metadata, API Route, ecc.).
 */
export async function getServerReportById(
  id: string
): Promise<Report | null> {
  const snapshot = await adminDb
    .collection("reports")
    .doc(id)
    .get();

  if (!snapshot.exists) {
    return null;
  }

  const report = {
    id: snapshot.id,
    ...(snapshot.data() as Omit<
      Report,
      "id"
    >),
  };

  // Le anteprime condivise non devono rivelare segnalazioni in attesa,
  // rifiutate o nascoste dalla moderazione.
  if (!report.isVisible) {
    return null;
  }

  return report;
}
