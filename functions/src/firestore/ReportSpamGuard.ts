import { FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";

import { adminDb } from "../config/firebaseAdmin";

const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;
const TEXT_SHORT_WINDOW_MS = 30 * 60 * 1000;
const TEXT_LONG_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_TEXT_REPORTS_SHORT_WINDOW = 3;
const MAX_TEXT_REPORTS_LONG_WINDOW = 10;

type ReportDocument = {
  type?: unknown;
  title?: unknown;
  description?: unknown;
  moderationMode?: unknown;
  authorSpamKey?: unknown;
  createdAt?: unknown;
};

type RecentReport = {
  id: string;
  data: ReportDocument;
  createdAtMs: number;
};

export type SpamGuardResult =
  | { blocked: false }
  | { blocked: true; description: string };

function normalizeText(value: unknown): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("it-IT")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function contentFingerprint(report: ReportDocument): string {
  return [report.type, report.title, report.description]
    .map(normalizeText)
    .join("|");
}

function getCreatedAtMs(value: unknown): number | null {
  if (
    value &&
    typeof value === "object" &&
    "toMillis" in value &&
    typeof value.toMillis === "function"
  ) {
    return value.toMillis();
  }

  return null;
}

/**
 * Controlla la frequenza e i duplicati degli invii dello stesso dispositivo.
 * Il controllo vive nelle Cloud Functions: non dipende dall'interfaccia e vale
 * allo stesso modo per account registrati e invii anonimi.
 */
export class ReportSpamGuard {
  async check(
    reportId: string,
    report: ReportDocument
  ): Promise<SpamGuardResult> {
    const authorSpamKey =
      typeof report.authorSpamKey === "string"
        ? report.authorSpamKey
        : "";

    // I report creati prima dell'introduzione della protezione non hanno
    // un'impronta tecnica comune e non possono essere correlati con certezza.
    if (!authorSpamKey) {
      return { blocked: false };
    }

    const snapshot = await adminDb
      .collection("reports")
      .where("authorSpamKey", "==", authorSpamKey)
      .get();

    const now = Date.now();
    const recentReports = snapshot.docs
      .filter((document) => document.id !== reportId)
      .map(toRecentReport)
      .filter((candidate): candidate is RecentReport => candidate !== null);

    const currentFingerprint = contentFingerprint(report);
    const hasDuplicate = recentReports.some(
      (candidate) =>
        now - candidate.createdAtMs <= DUPLICATE_WINDOW_MS &&
        contentFingerprint(candidate.data) === currentFingerprint
    );

    if (hasDuplicate) {
      return {
        blocked: true,
        description:
          "Hai già inviato questa stessa segnalazione nelle ultime 24 ore.",
      };
    }

    if (report.moderationMode !== "TEXT") {
      return { blocked: false };
    }

    const textReports = recentReports.filter(
      (candidate) => candidate.data.moderationMode === "TEXT"
    );

    const recentTextReports = textReports.filter(
      (candidate) => now - candidate.createdAtMs <= TEXT_SHORT_WINDOW_MS
    );

    if (recentTextReports.length >= MAX_TEXT_REPORTS_SHORT_WINDOW) {
      return {
        blocked: true,
        description:
          "Hai raggiunto il limite di 3 segnalazioni solo testuali in 30 minuti. Riprova più tardi.",
      };
    }

    const dailyTextReports = textReports.filter(
      (candidate) => now - candidate.createdAtMs <= TEXT_LONG_WINDOW_MS
    );

    if (dailyTextReports.length >= MAX_TEXT_REPORTS_LONG_WINDOW) {
      return {
        blocked: true,
        description:
          "Hai raggiunto il limite giornaliero di segnalazioni solo testuali. Riprova domani o documenta la situazione con una foto o un video.",
      };
    }

    return { blocked: false };
  }

  async block(reportId: string, description: string): Promise<void> {
    await adminDb.collection("reports").doc(reportId).update({
      isVisible: false,
      spamBlocked: true,
      moderation: {
        decision: "RIFIUTATO",
        evidences: [
          {
            type: "SPAM",
            description,
            confidence: 1,
            source: "COMPORTAMENTO",
          },
        ],
        analyzedAt: FieldValue.serverTimestamp(),
      },
    });
  }
}

function toRecentReport(
  document: QueryDocumentSnapshot
): RecentReport | null {
  const data = document.data() as ReportDocument;
  const createdAtMs = getCreatedAtMs(data.createdAt);

  if (createdAtMs === null) {
    return null;
  }

  return {
    id: document.id,
    data,
    createdAtMs,
  };
}
