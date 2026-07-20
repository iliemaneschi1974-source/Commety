import { Timestamp } from "firebase/firestore";

export type ReportCategory =
  | "meteo"
  | "traffico"
  | "pericolo"
  | "evento"
  | "mare"
  | "animali";

export type ReportStatus =
  | "ACTIVE"
  | "RESOLVED"
  | "EXPIRED"
  | "HIDDEN";

/**
 * Percorso di moderazione scelto alla creazione della segnalazione.
 */
export type ReportModerationMode =
  | "TEXT"
  | "IMAGE";

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

export interface ReportVideoReference extends ReportImageReference {
  durationSeconds: number;
  /** Fotogrammi tecnici, non mostrati, usati per la moderazione del video. */
  moderationFrames: ReportImageReference[];
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

  moderationMode?: ReportModerationMode;

/**
 * Indica se la segnalazione
 * è visibile pubblicamente sulla mappa.
 *
 * La visibilità è controllata
 * esclusivamente dal backend dopo
 * la moderazione.
 */
isVisible: boolean;

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

  /**
   * Impronta tecnica, non reversibile e specifica della segnalazione,
   * usata per impedire all'autore anonimo di auto-confermarla.
   */
  authorConfirmationKey?: string;

  /**
   * Impronta tecnica non reversibile del dispositivo, usata dal backend per
   * riconoscere invii ripetuti e contrastare lo spam.
   */
  authorSpamKey?: string;

  username?: string;

  displayName?: string;

  avatarUrl?: string;

  /**
   * Immagini associate alla segnalazione.
   */
  images: ReportImageReference[];

  video?: ReportVideoReference;

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

  video?: File;

  /** Fotogrammi estratti lungo il video per moderarne l'intera durata. */
  videoModerationFrames?: File[];
}
