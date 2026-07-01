/**
 * Tipologia di attività registrata
 * su una segnalazione.
 *
 * Il Lifecycle Engine utilizza queste
 * informazioni per decidere come
 * aggiornare il ciclo di vita della
 * segnalazione.
 */
export type ReportActivityType =
  | "confirmation"
  | "comment"
  | "photo"
  | "update";