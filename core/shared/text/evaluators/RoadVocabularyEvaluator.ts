import { TextQualityContribution } from "../TextQualityContribution";
import { TextQualityEvaluator } from "../TextQualityEvaluator";

/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * RoadVocabularyEvaluator
 *
 * Riconosce termini tipici della viabilità e
 * delle segnalazioni stradali.
 *
 * La presenza di questo vocabolario aumenta
 * l'affidabilità del testo e riduce il punteggio
 * complessivo del Text Quality Engine.
 * ============================================================================
 */
export class RoadVocabularyEvaluator
  implements TextQualityEvaluator
{
  /**
   * Vocabolario iniziale della viabilità.
   *
   * Potrà essere ampliato nel tempo senza
   * modificare l'algoritmo.
   */
  private static readonly KEYWORDS = [
    "a1",
    "a4",
    "a24",
    "a90",
    "ss",
    "sr",
    "sp",
    "autostrada",
    "tangenziale",
    "raccordo",
    "corsia",
    "carreggiata",
    "uscita",
    "ingresso",
    "svincolo",
    "rotatoria",
    "rotonda",
    "incrocio",
    "ponte",
    "galleria",
    "viadotto",
    "via",
    "viale",
    "piazza",
    "km",
    "chilometro",
    "chilometri",
    "traffico",
    "coda",
    "incidente",
    "tamponamento",
    "lavori",
    "deviazione",
    "allagamento",
    "frana",
    "albero",
    "semaforo",
  ];

  evaluate(
    testo: string
  ): TextQualityContribution {
    const testoNormalizzato =
      testo.toLowerCase();

    const trovato =
      RoadVocabularyEvaluator.KEYWORDS.some(
        (keyword) =>
          testoNormalizzato.includes(keyword)
      );

    if (!trovato) {
      return new TextQualityContribution(
        "RoadVocabularyEvaluator",
        0,
        "Nessun termine tipico della viabilità rilevato."
      );
    }

    return new TextQualityContribution(
      "RoadVocabularyEvaluator",
      -2,
      "Il testo contiene termini tipici della viabilità."
    );
  }
}