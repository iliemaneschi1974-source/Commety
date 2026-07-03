import { PublicationEngine } from "./PublicationEngine";
import { PublicationEvidence } from "./PublicationEvidence";
import { PublicationDecision } from "./PublicationDecision";
import { PublicationPolicy } from "./PublicationPolicy";

/**
 * Implementazione predefinita del motore
 * di decisione della pubblicazione.
 */
export class DefaultPublicationEngine
  implements PublicationEngine
{
  constructor(
    private readonly policy: PublicationPolicy,
  ) {}

  decide(
    evidence: PublicationEvidence,
  ): PublicationDecision {
    const trust = evidence.trust.value;

    if (trust >= this.policy.getPublishThreshold()) {
      return "PUBBLICA";
    }

    if (
      trust >=
      this.policy.getPublishWithReservationThreshold()
    ) {
      return "PUBBLICA_CON_RISERVA";
    }

    if (
      trust >=
      this.policy.getConfirmationThreshold()
    ) {
      return "RICHIEDI_CONFERME";
    }

    if (trust >= this.policy.getReviewThreshold()) {
      return "REVISIONE";
    }

    return "RIFIUTA";
  }
}