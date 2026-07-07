import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";

/**
 * Contratto comune per tutte le regole del Reputation Engine.
 *
 * Ogni implementazione osserva un singolo fenomeno
 * del dominio e produce esclusivamente evidenze
 * di reputazione.
 *
 * La regola non prende decisioni e non modifica
 * il profilo di reputazione: tali responsabilità
 * appartengono al ReputationEngine e alla
 * ReputationPolicy.
 */
export interface ReputationRule {
  /**
   * Analizza il contesto fornito e restituisce
   * le evidenze di reputazione rilevate.
   *
   * @param contesto Contesto di valutazione.
   * @returns Le evidenze prodotte dalla regola.
   */
  analizza(
    contesto: ReputationContext
  ): readonly ReputationEvidence[];
}