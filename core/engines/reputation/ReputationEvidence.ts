/**
 * Rappresenta una singola evidenza prodotta durante
 * il processo di valutazione della reputazione.
 *
 * L'evidenza descrive un fatto osservato sul comportamento
 * dell'utente, senza esprimere alcuna decisione finale.
 */
export class ReputationEvidence {
  constructor(
    /**
     * Categoria dell'evidenza rilevata.
     */
    public readonly tipo: ReputationEvidenceType,

    /**
     * Descrizione leggibile dell'evidenza.
     */
    public readonly descrizione: string,

    /**
     * Livello di confidenza della valutazione.
     *
     * Valore compreso tra 0 e 1.
     */
    public readonly confidenza: number,

    /**
     * Origine dell'evidenza.
     */
    public readonly origine: ReputationEvidenceSource
  ) {}

  equals(other: ReputationEvidence): boolean {
    return (
      this.tipo === other.tipo &&
      this.descrizione === other.descrizione &&
      this.confidenza === other.confidenza &&
      this.origine === other.origine
    );
  }
}

/**
 * Tipologie di evidenze supportate dal Reputation Engine.
 *
 * Ogni evidenza rappresenta un fenomeno osservabile
 * del dominio e contribuisce alla costruzione del
 * profilo di fiducia dell'utente.
 */
export type ReputationEvidenceType =
  // Affidabilità
  | "STORICO_AFFIDABILE"
  | "SEGNALAZIONI_PRECISE"
  | "SEGNALAZIONI_ATTENDIBILI"
  | "CONFERME_FREQUENTI"

  // Collaborazione
  | "COLLABORAZIONE_COSTANTE"
  | "PARTECIPAZIONE_ATTIVA"
  | "VALIDATORE_AFFIDABILE"

  // Qualità
  | "CONTENUTI_DI_QUALITA"
  | "FOTO_DI_QUALITA"
  | "DESCRIZIONI_COMPLETE"

  // Comportamento
  | "COMPORTAMENTO_CORRETTO"
  | "SPAM_RECIDIVO"
  | "ABUSO_RECIDIVO"
  | "VIOLAZIONI_RIPETUTE"
  | "CONTENUTI_RIMOSSI_FREQUENTEMENTE"

  // Evoluzione
  | "FIDUCIA_IN_CRESCITA"
  | "FIDUCIA_STABILE"
  | "FIDUCIA_IN_DIMINUZIONE"

  // Generico
  | "ALTRO";

/**
 * Origine dell'evidenza.
 */
export type ReputationEvidenceSource =
  | "PUBLICATION"
  | "MODERATION"
  | "COMMUNITY"
  | "LIFECYCLE"
  | "AI"
  | "MANUALE";