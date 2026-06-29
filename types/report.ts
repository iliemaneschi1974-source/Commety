import { Timestamp } from "firebase/firestore";

export type ReportCategory =
  | "meteo"
  | "traffico"
  | "pericolo"
  | "evento"
  | "mare";

export type ReportStatus =
  | "ACTIVE"
  | "RESOLVED"
  | "EXPIRED"
  | "HIDDEN";

export interface Report {
  id: string;

  type: ReportCategory;

  title: string;
  description: string;

  lat: number;
  lng: number;

  // Reverse Geocoding
  address?: string;
  city?: string;

  status: ReportStatus;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;

  userId?: string;
  username?: string;

  /**
   * URL pubblici delle immagini salvate
   * su Firebase Storage.
   */
  images: string[];

  confirmations: number;
  commentsCount: number;
}

export interface CreateReportInput {
  type: ReportCategory;

  title: string;
  description: string;

  lat: number;
  lng: number;

  /**
   * File compressi selezionati
   * dall'utente.
   */
  images: File[];
}