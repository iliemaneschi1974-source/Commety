/**
 * Motivo per cui il Lifecycle Engine
 * sta eseguendo un'operazione sulla segnalazione.
 *
 * Questo enum rappresenta il contratto pubblico
 * del Lifecycle Engine.
 */
export enum LifecycleReason {
  /**
   * Scadenza naturale della segnalazione.
   */
  EXPIRED = "EXPIRED",

  /**
   * Chiusura volontaria da parte dell'autore.
   */
  RESOLVED = "RESOLVED",

  /**
   * Rimozione effettuata dalla moderazione.
   */
  MODERATED = "MODERATED",

  /**
   * Eliminazione amministrativa.
   */
  ADMIN = "ADMIN",
}