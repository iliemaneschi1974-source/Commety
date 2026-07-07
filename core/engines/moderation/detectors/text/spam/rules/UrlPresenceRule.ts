import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";

/**
 * Rileva la presenza di uno o più URL
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class UrlPresenceRule implements SpamRule {
  /**
   * Espressione regolare utilizzata per
   * individuare URL nel testo.
   */
  private static readonly URL_REGEX =
    /\b(?:https?:\/\/|www\.)\S+\b/iu;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!;

    if (!UrlPresenceRule.URL_REGEX.test(testo)) {
      return [];
    }

    return [
      new ModerationEvidence(
        "LINK_MULTIPLI",
        "Rilevata la presenza di uno o più URL nel contenuto.",
        1.0,
        "TESTO"
      ),
    ];
  }
}