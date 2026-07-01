import {
  FieldPath,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

import { adminDb } from "../config/firebaseAdmin";

/**
 * Rappresentazione del report lato backend.
 *
 * Per il momento manteniamo una struttura
 * flessibile. Introdurremo un tipo condiviso
 * in uno sprint dedicato.
 */
export interface ReportDocument {
  id: string;
  [key: string]: unknown;
}

const reportsCollection =
  adminDb.collection("reports");

/**
 * Restituisce tutte le segnalazioni ACTIVE.
 */
export async function getActiveReports(): Promise<
  ReportDocument[]
> {
  const snapshot = await reportsCollection
    .where("status", "==", "ACTIVE")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map(toReportDocument);
}

/**
 * Recupera una segnalazione tramite ID.
 */
export async function getReportById(
  reportId: string
): Promise<ReportDocument | null> {
  const snapshot =
    await reportsCollection.doc(reportId).get();

  if (!snapshot.exists) {
    return null;
  }

  return toReportDocument(
    snapshot as QueryDocumentSnapshot
  );
}

/**
 * Aggiorna una segnalazione.
 */
export async function updateReport(
  reportId: string,
  data: Record<string, unknown>
): Promise<void> {
  await reportsCollection
    .doc(reportId)
    .update(data);
}

/**
 * Elimina definitivamente una segnalazione.
 */
export async function deleteReport(
  reportId: string
): Promise<void> {
  await reportsCollection
    .doc(reportId)
    .delete();
}

/**
 * Recupera più segnalazioni tramite ID.
 *
 * Utile per futuri batch.
 */
export async function getReportsByIds(
  ids: string[]
): Promise<ReportDocument[]> {
  if (ids.length === 0) {
    return [];
  }

  const snapshot = await reportsCollection
    .where(FieldPath.documentId(), "in", ids)
    .get();

  return snapshot.docs.map(toReportDocument);
}

/**
 * Mapper Firestore → dominio backend.
 */
function toReportDocument(
  document: QueryDocumentSnapshot
): ReportDocument {
  return {
    id: document.id,
    ...document.data(),
  };
}