export type AdminReportStatus =
  | "NEW"
  | "TAKEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "OUT_OF_SCOPE"
  | "DUPLICATE"
  | "HIDDEN";

export type AdminPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface AdminReport {
  id: string;
  title: string;
  description: string;
  category:
    | "Traffico"
    | "Pericolo"
    | "Trasporti"
    | "Accessibilità"
    | "Rete"
    | "Animali"
    | "Meteo"
    | "Evento";
  status: AdminReportStatus;
  priority: AdminPriority;
  municipality: string;
  district: string;
  address: string;
  createdAt: string;
  author: {
    displayName: string;
    kind: "Registrato" | "Anonimo";
    reliability?: number;
  };
  confirmations: number;
  activeVotes: number;
  expiredVotes: number;
  media?: {
    type: "image" | "video";
    url: string;
    alt: string;
  };
  institutionalNote?: string;
  deletedByAuthor?: boolean;
  deletedByAuthorAt?: string;
}

export const ADMIN_STATUS_LABELS: Record<
  AdminReportStatus,
  string
> = {
  NEW: "Nuova",
  TAKEN: "Presa in carico",
  IN_PROGRESS: "In lavorazione",
  RESOLVED: "Risolta",
  OUT_OF_SCOPE: "Non di competenza",
  DUPLICATE: "Duplicata",
  HIDDEN: "Oscurata",
};

export const ADMIN_PRIORITY_LABELS: Record<
  AdminPriority,
  string
> = {
  LOW: "Bassa",
  MEDIUM: "Media",
  HIGH: "Alta",
  URGENT: "Urgente",
};
