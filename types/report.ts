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

/**
 * Riferimento ad un'immagine
 * archiviata su Firebase Storage.
 */
export interface ReportImageReference {

  /**
   * Percorso dell'oggetto
   * all'interno di Firebase Storage.
   *
   * Esempio:
   * reports/{reportId}/{imageId}.jpg
   */
  storagePath: string;

  /**
   * URL pubblico utilizzato
   * dal frontend per la visualizzazione.
   */
  url: string;

}

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

  /**
   * Ultima attività registrata sulla segnalazione.
   * Viene aggiornata con conferme, commenti,
   * foto e future modifiche.
   */
  lastActivityAt?: Timestamp;

  /**
   * Data/ora di scadenza della segnalazione.
   */
  expiresAt?: Timestamp;

  /**
   * Data/ora massima oltre la quale
   * la segnalazione non può più essere prorogata.
   */
  maxExpiresAt?: Timestamp;

  /**
   * Proprietario della segnalazione.
   */
  userId?: string;

  username?: string;

  displayName?: string;

  avatarUrl?: string;

  /**
   * Immagini associate alla segnalazione.
   */
  images: ReportImageReference[];

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
   * Utente autenticato.
   * Se assente la segnalazione rimane anonima.
   */
  userId?: string;

  username?: string;

  displayName?: string;

  avatarUrl?: string;

  /**
   * File compressi selezionati
   * dall'utente.
   */
  images: File[];
}