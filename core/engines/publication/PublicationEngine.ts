import { PublicationDecision } from "./PublicationDecision";
import { PublicationEvidence } from "./PublicationEvidence";

/**
 * Contratto del motore di decisione
 * della pubblicazione di una segnalazione.
 *
 * Il motore valuta le evidenze disponibili
 * e restituisce la decisione di pubblicazione.
 */
export interface PublicationEngine {
  /**
   * Determina la decisione di pubblicazione.
   *
   * @param evidence Evidenze disponibili.
   * @returns Decisione di pubblicazione.
   */
  decide(
    evidence: PublicationEvidence,
  ): PublicationDecision;
}