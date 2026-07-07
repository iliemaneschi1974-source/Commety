import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";
import { ReputationRule } from "./ReputationRule";

/**
 * Rileva la presenza di numerose conferme
 * della community sui contenuti dell'utente.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di reputazione.
 */
export class ConfermeFrequentiRule
  implements ReputationRule
{
  /**
   * Numero minimo di conferme richieste
   * per considerare il fenomeno significativo.
   */
  private static readonly SOGLIA_CONFERME = 10;

  analizza(
    contesto: ReputationContext
  ): readonly ReputationEvidence[] {
    if (
      contesto.contaSegnali("CONFERMA_COMMUNITY") <
      ConfermeFrequentiRule.SOGLIA_CONFERME
    ) {
      return [];
    }

    return [
      new ReputationEvidence(
        "CONFERME_FREQUENTI",
        "L'utente riceve frequentemente conferme dalla community.",
        1,
        "COMMUNITY"
      ),
    ];
  }
}