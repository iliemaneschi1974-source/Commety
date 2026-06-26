import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import {
  CreateReportInput,
  Report,
} from "@/types/report";

const reportsCollection = collection(db, "reports");

/**
 * Crea una nuova segnalazione.
 */
export async function createReport(
  input: CreateReportInput
) {
  console.log("createReport INIZIO");

  const result = await addDoc(reportsCollection, {
    ...input,
    status: "ACTIVE",
    confirmations: 0,
    commentsCount: 0,
    images: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  console.log("createReport FINE", result.id);

  return result;
}

/**
 * Listener realtime delle segnalazioni attive.
 */
export function listenReports(
  callback: (reports: Report[]) => void
) {
  const q = query(
    reportsCollection,
    where("status", "==", "ACTIVE"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const reports: Report[] = snapshot.docs.map((document) => ({
        id: document.id,
        ...(document.data() as Omit<Report, "id">),
      }));

      callback(reports);
    },
    (error) => {
      console.error("Errore listener reports:", error);
    }
  );
}

/**
 * Aggiorna una segnalazione.
 */
export async function updateReport(
  id: string,
  data: Partial<Omit<Report, "id" | "createdAt">>
) {
  return updateDoc(doc(db, "reports", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Elimina una segnalazione.
 */
export async function deleteReport(id: string) {
  return deleteDoc(doc(db, "reports", id));
}

/**
 * Incrementa il numero di conferme.
 */
export async function confirmReport(
  report: Report
) {
  return updateReport(report.id, {
    confirmations: report.confirmations + 1,
  });
}

/**
 * Segna una segnalazione come risolta.
 */
export async function resolveReport(id: string) {
  return updateReport(id, {
    status: "RESOLVED",
  });
}