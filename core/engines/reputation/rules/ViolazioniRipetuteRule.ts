import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";
import { ReputationRule } from "./ReputationRule";

/**
 * Rileva la presenza di violazioni di moderazione
 * ripetute nel tempo.
 *
 * La regola osserva esclusivamente i contenuti
 * limitati o rimossi e produce una singola
 * evidenza di reputazione.
 */
export class ViolazioniRipetuteRule
  implements ReputationRule
{
  /**
   * Numero minimo di violazioni richieste
   * per considerare il comportamento
   * ripetuto.
   */
  private static readonly SOGLIA_VIOLAZIONI = 3;

  analizza(
    contesto: ReputationContext
  ): readonly ReputationEvidence[] {
    const violazioni =
      contesto.contaSegnali("CONTENUTO_LIMITATO") +
      contesto.contaSegnali("CONTENUTO_RIMOSSO");

    if (
      violazioni <
      ViolazioniRipetuteRule.SOGLIA_VIOLAZIONI
    ) {
      return [];
    }

    return [
      new ReputationEvidence(
        "VIOLAZIONI_RIPETUTE",
        "L'utente ha accumulato ripetute violazioni di moderazione.",
        1,
        "MODERATION"
      ),
    ];
  }
}