/**
 * Rappresenta un segnale di dominio osservato dal Reputation Engine.
 *
 * I segnali vengono prodotti dagli altri Engine del Core
 * e costituiscono l'unico punto di ingresso per la valutazione
 * della reputazione.
 */
export class ReputationSignal {
  constructor(
    /**
     * Tipo del segnale osservato.
     */
    public readonly tipo: ReputationSignalType,

    /**
     * Momento in cui il fenomeno è stato osservato.
     */
    public readonly timestamp: Date,

    /**
     * Origine del segnale.
     */
    public readonly origine: ReputationSignalSource,

    /**
     * Metadati opzionali associati al segnale.
     */
    public readonly metadata: Readonly<Record<string, unknown>> = {}
  ) {}

  equals(other: ReputationSignal): boolean {
    return (
      this.tipo === other.tipo &&
      this.timestamp.getTime() === other.timestamp.getTime() &&
      this.origine === other.origine
    );
  }
}

/**
 * Tipologie di segnali supportate dal Reputation Engine.
 */
export type ReputationSignalType =
  // Publication
  | "REPORT_PUBBLICATO"
  | "REPORT_NON_PUBBLICATO"
  | "REPORT_SMENTITO"
  | "SEGNALAZIONE_PRECISA"

  // Moderation
  | "CONTENUTO_APPROVATO"
  | "CONTENUTO_LIMITATO"
  | "CONTENUTO_RIMOSSO"
  | "SEGNALAZIONE_SPAM"

  // Community
  | "CONFERMA_COMMUNITY"
  | "SCONFERMA_COMMUNITY"
  

  // Lifecycle
  | "REPORT_RISOLTO"
  | "REPORT_SCADUTO"
  | "REPORT_CONFERMATO_NEL_TEMPO"

  // Account
  | "ACCOUNT_CREATO"
  | "ACCOUNT_SOSPESO";

/**
 * Origine del segnale.
 */
export type ReputationSignalSource =
  | "PUBLICATION"
  | "MODERATION"
  | "COMMUNITY"
  | "LIFECYCLE"
  | "ACCOUNT";