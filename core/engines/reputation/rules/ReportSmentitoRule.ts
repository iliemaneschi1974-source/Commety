import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";
import { ReputationRule } from "./ReputationRule";

/**
 * Rileva la presenza di almeno un report
 * successivamente smentito.
 *
 * Un report smentito rappresenta un indicatore
 * negativo per la costruzione della fiducia
 * dell'utente.
 */
export class ReportSmentitoRule
  implements ReputationRule
{
  analizza(
    contesto: ReputationContext
  ): readonly ReputationEvidence[] {
    if (!contesto.haSegnale("REPORT_SMENTITO")) {
      return [];
    }

    return [
      new ReputationEvidence(
        "FIDUCIA_IN_DIMINUZIONE",
        "L'utente possiede almeno un report successivamente smentito.",
        1,
        "PUBLICATION"
      ),
    ];
  }
}