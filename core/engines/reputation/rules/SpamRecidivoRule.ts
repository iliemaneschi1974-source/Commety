import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";
import { ReputationRule } from "./ReputationRule";

/**
 * Rileva la presenza di almeno una violazione
 * di spam osservata dal Reputation Engine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di reputazione.
 */
export class SpamRecidivoRule
  implements ReputationRule
{
  analizza(
    contesto: ReputationContext
  ): readonly ReputationEvidence[] {
    if (!contesto.haSegnale("SEGNALAZIONE_SPAM")) {
      return [];
    }

    return [
      new ReputationEvidence(
        "SPAM_RECIDIVO",
        "L'utente ha ricevuto almeno una segnalazione di spam.",
        1,
        "MODERATION"
      ),
    ];
  }
}