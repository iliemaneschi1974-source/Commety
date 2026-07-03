import { TrustScore } from "../protection/trust/TrustScore";

/**
 * Evidenze disponibili per il Publication Engine.
 *
 * Nella versione corrente la decisione di pubblicazione
 * è basata esclusivamente sul TrustScore.
 *
 * Il modello è progettato per essere esteso con nuove
 * evidenze (moderazione, reputazione, consenso, ecc.)
 * senza modificare il contratto del motore.
 */
export interface PublicationEvidence {
  /**
   * Livello di affidabilità della segnalazione.
   */
  readonly trust: TrustScore;
}