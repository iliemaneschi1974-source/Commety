import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  updateDoc,
  UpdateData,
  where,
} from "firebase/firestore";

import { calculateReportExpiration } from "@/lib/reportExpiration";
import { db } from "@/lib/firebase";
import { reverseGeocode } from "@/services/geocoding";
import { rewardReportCreation } from "@/services/reputation";
import { uploadImages } from "@/services/storage";
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
  console.log("========== createReport ==========");
  console.log("Input ricevuto:", input);
  console.log("File ricevuti:", input.images);

  const location = await reverseGeocode(
    input.lat,
    input.lng
  );

  const { images, ...reportData } = input;

  const sanitizedReportData =
    Object.fromEntries(
      Object.entries(reportData).filter(
        ([, value]) => value !== undefined
      )
    );

  const {
    expiresAt,
    maxExpiresAt,
  } = calculateReportExpiration(input.type);

  const reportRef = await addDoc(
    reportsCollection,
    {
      ...sanitizedReportData,

      address: location.address,
      city: location.city,

      status: "ACTIVE",
      confirmations: 0,
      commentsCount: 0,
      images: [],

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastActivityAt: serverTimestamp(),

      expiresAt,
      maxExpiresAt,
    }
  );

  console.log("✅ Report creato:", reportRef.id);

  let imageUrls: string[] = [];

  if (images.length > 0) {
    console.log("⬆️ Inizio upload immagini...");

    imageUrls = await uploadImages(
      images,
      reportRef.id
    );

    console.log("✅ URL restituiti:", imageUrls);

    await updateDoc(reportRef, {
      images: imageUrls,
      updatedAt: serverTimestamp(),
    });

    console.log(
      "✅ Firestore aggiornato con gli URL"
    );
  } else {
    console.warn("⚠️ Nessuna immagine ricevuta");
  }

  if (input.userId) {
    await rewardReportCreation(
      input.userId,
      images.length
    );
  }

  console.log(
    "========== FINE createReport =========="
  );

  return reportRef;
}

/**
 * Recupera una segnalazione tramite ID.
 */
export async function getReportById(
  id: string
): Promise<Report | null> {
  const snapshot = await getDoc(
    doc(db, "reports", id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<
      Report,
      "id"
    >),
  };
}

/**
 * Restituisce tutte le segnalazioni ACTIVE.
 *
 * Utilizzata dal Lifecycle Engine,
 * Scheduler e Cloud Functions.
 */
export async function getActiveReports(): Promise<
  Report[]
> {
  const q = query(
    reportsCollection,
    where("status", "==", "ACTIVE"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<
      Report,
      "id"
    >),
  }));
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
      const reports: Report[] = snapshot.docs.map(
        (document) => ({
          id: document.id,
          ...(document.data() as Omit<
            Report,
            "id"
          >),
        })
      );

      callback(reports);
    },
    (error) => {
      console.error(
        "Errore listener reports:",
        error
      );
    }
  );
}

/**
 * Listener realtime delle segnalazioni
 * pubblicate da uno specifico utente.
 */
export function listenUserReports(
  userId: string,
  callback: (reports: Report[]) => void
) {
  const q = query(
    reportsCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const reports: Report[] = snapshot.docs.map(
        (document) => ({
          id: document.id,
          ...(document.data() as Omit<
            Report,
            "id"
          >),
        })
      );

      callback(reports);
    },
    (error) => {
      console.error(
        "Errore listener user reports:",
        error
      );
    }
  );
}

/**
 * Aggiorna una segnalazione.
 */
export async function updateReport(
  id: string,
  data: UpdateData<Report>
) {
  return updateDoc(doc(db, "reports", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Elimina una segnalazione.
 */
export async function deleteReport(
  id: string
) {
  return deleteDoc(doc(db, "reports", id));
}

/**
 * Incrementa il numero di conferme.
 */
export async function confirmReport(
  report: Report
) {
  return updateReport(report.id, {
    confirmations:
      report.confirmations + 1,
  });
}

/**
 * Segna una segnalazione come risolta.
 */
export async function resolveReport(
  id: string
) {
  return updateReport(id, {
    status: "RESOLVED",
  });
}