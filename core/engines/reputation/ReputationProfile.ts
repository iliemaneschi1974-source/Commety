import { ReputationDecision } from "./ReputationDecision";
import { ReputationEvidence } from "./ReputationEvidence";

/**
 * Rappresenta il profilo di fiducia corrente
 * associato a un utente.
 *
 * Il profilo è una rappresentazione del risultato
 * dell'analisi svolta dal Reputation Engine.
 * Non contiene logiche di calcolo.
 */
export class ReputationProfile {
  constructor(
    /**
     * Decisione corrente del Reputation Engine.
     */
    public readonly decision: ReputationDecision,

    /**
     * Evidenze che giustificano la decisione.
     */
    public readonly evidenze: readonly ReputationEvidence[],

    /**
     * Momento dell'ultima valutazione.
     */
    public readonly aggiornatoIl: Date
  ) {}

  equals(other: ReputationProfile): boolean {
    if (!this.decision.equals(other.decision)) {
      return false;
    }

    if (this.aggiornatoIl.getTime() !== other.aggiornatoIl.getTime()) {
      return false;
    }

    if (this.evidenze.length !== other.evidenze.length) {
      return false;
    }

    return this.evidenze.every((evidenza, index) =>
      evidenza.equals(other.evidenze[index])
    );
  }
}