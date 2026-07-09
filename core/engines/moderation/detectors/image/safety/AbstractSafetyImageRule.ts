import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import {
  ModerationEvidence,
  ModerationEvidenceType,
} from "../../../ModerationEvidence";
import { AbstractImageRule } from "../AbstractImageRule";

/**
 * Classe base per tutte le Safety Rule.
 *
 * Implementa l'algoritmo comune di valutazione
 * dei contenuti potenzialmente pericolosi.
 *
 * Le sottoclassi devono solamente specificare:
 * - il valore da osservare;
 * - la soglia;
 * - il tipo di evidenza;
 * - la descrizione.
 */
export abstract class AbstractSafetyImageRule extends AbstractImageRule {

  /**
   * Restituisce la probabilità da valutare.
   */
  protected abstract valore(
    analisi: ImageAnalysis
  ): number;

  /**
   * Restituisce la soglia della regola.
   */
  protected abstract soglia(): number;

  /**
   * Restituisce il tipo di evidenza prodotto.
   */
  protected abstract tipo(): ModerationEvidenceType;

  /**
   * Restituisce la descrizione dell'evidenza.
   */
  protected abstract descrizione(): string;

  /**
   * Analizza una singola immagine.
   */
  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {

    const confidenza = this.valore(analisi);

    if (confidenza < this.soglia()) {
      return [];
    }

    return [
      this.creaEvidence(
        this.tipo(),
        this.descrizione(),
        confidenza
      )
    ];

  }

}