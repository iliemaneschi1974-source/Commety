import type { AdminReportStatus } from "@/lib/admin/dashboard-types";

export interface InstitutionalNotification {
  id: string;
  type: "MUNICIPAL_UPDATE";
  reportId: string;
  reportTitle: string;
  municipalityName: string;
  status?: AdminReportStatus;
  message: string;
  institutionalNote?: string;
  createdAt: string;
  readAt?: string;
}

export interface NotificationInbox {
  notifications: InstitutionalNotification[];
  unreadCount: number;
}
