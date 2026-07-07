import { ReputationDecision } from "./ReputationDecision";
import { ReputationEvidence } from "./ReputationEvidence";

/**
 * Definisce la politica di valutazione della reputazione.
 *
 * Una policy interpreta le evidenze prodotte dal Reputation Engine
 * e determina il livello di fiducia da assegnare all'utente.
 */
export interface ReputationPolicy {
  /**
   * Valuta le evidenze disponibili e restituisce
   * la decisione di reputazione.
   */
  valuta(
    evidenze: readonly ReputationEvidence[]
  ): ReputationDecision;
}