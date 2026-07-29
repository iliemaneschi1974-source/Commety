import "server-only";

import { FieldValue, Timestamp } from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase-admin";
import {
  AdminPriority,
  AdminReport,
  AdminReportStatus,
} from "@/lib/admin/dashboard-types";
import {resolveRomaMunicipio} from "@/lib/territory/romaMunicipalityResolver";

const ROMA_MUNICIPALITY_CODE = "058091";
const REPORT_LIMIT = 500;

const notificationStatusMessages: Partial<
  Record<AdminReportStatus, string>
> = {
  TAKEN: "ha preso in carico la tua segnalazione.",
  IN_PROGRESS: "ha avviato la lavorazione della tua segnalazione.",
  RESOLVED: "ha indicato la tua segnalazione come risolta.",
  OUT_OF_SCOPE:
    "ha indicato che la segnalazione non è di propria competenza.",
  DUPLICATE:
    "ha collegato la segnalazione a una pratica già esistente.",
  HIDDEN: "ha oscurato la segnalazione.",
};

const categoryLabels: Record<string, AdminReport["category"]> = {
  traffico: "Traffico",
  pericolo: "Pericolo",
  trasporti: "Trasporti",
  accessibilita: "Accessibilità",
  rete: "Rete",
  animali: "Animali",
  meteo: "Meteo",
  evento: "Evento",
  mare: "Meteo",
};

function asDate(value: unknown): Date {
  if (value instanceof Timestamp) return value.toDate();
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate();
  }
  return new Date(0);
}

function asStatus(value: unknown): AdminReportStatus {
  const allowed: AdminReportStatus[] = [
    "NEW",
    "TAKEN",
    "IN_PROGRESS",
    "RESOLVED",
    "OUT_OF_SCOPE",
    "DUPLICATE",
    "HIDDEN",
  ];
  return allowed.includes(value as AdminReportStatus)
    ? (value as AdminReportStatus)
    : "NEW";
}

function asPriority(value: unknown): AdminPriority {
  const allowed: AdminPriority[] = [
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT",
  ];
  return allowed.includes(value as AdminPriority)
    ? (value as AdminPriority)
    : "MEDIUM";
}

function initialStatus(
  workflowStatus: unknown,
  publicStatus: unknown
): AdminReportStatus {
  if (workflowStatus) return asStatus(workflowStatus);
  return publicStatus === "RESOLVED" ? "RESOLVED" : "NEW";
}

export async function getRomaAdminReports(): Promise<AdminReport[]> {
  const snapshot = await adminDb
    .collection("reports")
    .where(
      "territory.municipalityCode",
      "==",
      ROMA_MUNICIPALITY_CODE
    )
    .limit(REPORT_LIMIT)
    .get();

  return snapshot.docs
    .filter((document) => {
      const data = document.data();
      return (
        data.isVisible === true ||
        data.archivedForMunicipality === true
      );
    })
    .map((document) => {
      const data = document.data();
      const workflow = data.municipalWorkflow ?? {};
      const firstImage = Array.isArray(data.images)
        ? data.images[0]
        : undefined;
      const createdAt = asDate(data.createdAt);
      const resolvedDistrict = resolveRomaMunicipio(
        data.lat,
        data.lng
      );

      return {
        id: document.id,
        title: String(data.title ?? "Segnalazione senza titolo"),
        description: String(data.description ?? ""),
        category:
          categoryLabels[String(data.type)] ?? "Pericolo",
        status: initialStatus(workflow.status, data.status),
        priority: asPriority(workflow.priority),
        municipality: "Roma",
        district: String(
          data.territory?.districtName ??
            resolvedDistrict?.districtName ??
            "Municipio non assegnato"
        ),
        address: String(
          data.address ?? "Indirizzo non disponibile"
        ),
        createdAt: createdAt.toISOString(),
        author: {
          displayName: data.userId
            ? String(
                data.displayName ??
                  data.username ??
                  "Utente registrato"
              )
            : "Utente anonimo",
          kind: data.userId
            ? ("Registrato" as const)
            : ("Anonimo" as const),
        },
        confirmations: Number(data.confirmations ?? 0),
        activeVotes: Number(data.activeStatusVotes ?? 0),
        expiredVotes: Number(data.endedStatusVotes ?? 0),
        media: firstImage?.url
          ? {
              type: "image" as const,
              url: String(firstImage.url),
              alt: `Foto della segnalazione ${String(data.title ?? "")}`,
            }
          : data.video?.url
            ? {
                type: "video" as const,
                url: String(data.video.url),
                alt: `Video della segnalazione ${String(data.title ?? "")}`,
              }
            : undefined,
        institutionalNote:
          typeof workflow.institutionalNote === "string"
            ? workflow.institutionalNote
            : undefined,
        deletedByAuthor:
          data.archivedForMunicipality === true,
        deletedByAuthorAt: data.deletedByAuthorAt
          ? asDate(data.deletedByAuthorAt).toISOString()
          : undefined,
      } satisfies AdminReport;
    })
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime()
    );
}

export interface AdminReportUpdate {
  status?: AdminReportStatus;
  priority?: AdminPriority;
  institutionalNote?: string;
}

export async function updateRomaAdminReport(
  reportId: string,
  update: AdminReportUpdate,
  adminEmail: string
): Promise<void> {
  const reportRef = adminDb.collection("reports").doc(reportId);

  await adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(reportRef);
    if (!snapshot.exists) {
      throw new Error("REPORT_NOT_FOUND");
    }
    if (
      snapshot.data()?.territory?.municipalityCode !==
      ROMA_MUNICIPALITY_CODE
    ) {
      throw new Error("REPORT_OUTSIDE_TERRITORY");
    }

    const report = snapshot.data() ?? {};
    const workflow = report.municipalWorkflow ?? {};
    const statusChanged =
      Boolean(update.status) && update.status !== workflow.status;
    const noteChanged =
      update.institutionalNote !== undefined &&
      update.institutionalNote !== workflow.institutionalNote;

    const fields: Record<string, unknown> = {
      "municipalWorkflow.updatedAt": FieldValue.serverTimestamp(),
      "municipalWorkflow.updatedBy": adminEmail,
      "municipalWorkflow.municipalityCode":
        ROMA_MUNICIPALITY_CODE,
    };
    if (update.status) {
      fields["municipalWorkflow.status"] = update.status;
    }
    if (update.priority) {
      fields["municipalWorkflow.priority"] = update.priority;
    }
    if (update.institutionalNote !== undefined) {
      fields["municipalWorkflow.institutionalNote"] =
        update.institutionalNote;
    }

    transaction.update(reportRef, fields);

    if (
      typeof report.userId === "string" &&
      report.userId &&
      (statusChanged || noteChanged)
    ) {
      const notificationRef = adminDb
        .collection("userNotifications")
        .doc();
      const statusMessage = update.status
        ? notificationStatusMessages[update.status]
        : undefined;
      const message = statusMessage
        ? `Il Comune di Roma ${statusMessage}`
        : "Il Comune di Roma ha pubblicato un aggiornamento sulla tua segnalazione.";

      transaction.set(notificationRef, {
        userId: report.userId,
        type: "MUNICIPAL_UPDATE",
        reportId,
        reportTitle: String(
          report.title ?? "Segnalazione Commety"
        ).slice(0, 160),
        municipalityCode: ROMA_MUNICIPALITY_CODE,
        municipalityName: "Roma",
        status: update.status ?? workflow.status ?? "NEW",
        message,
        eventKind:
          statusChanged && noteChanged
            ? "STATUS_AND_NOTE"
            : statusChanged
              ? "STATUS"
              : "NOTE",
        institutionalNote:
          noteChanged
            ? update.institutionalNote
            : null,
        createdAt: FieldValue.serverTimestamp(),
        readAt: null,
      });
    }
  });
}
