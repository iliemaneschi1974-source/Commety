import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { CodiceFiscalePresenceRule } from "./rules/CodiceFiscalePresenceRule";
import { IbanPresenceRule } from "./rules/IbanPresenceRule";
import { PaymentCardPresenceRule } from "./rules/PaymentCardPresenceRule";

/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Privacy.
 */
export class PrivacyDetector {
  private readonly rules = [
    new CodiceFiscalePresenceRule(),
    new IbanPresenceRule(),
    new PaymentCardPresenceRule(),
  ] as const;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    const evidenze: ModerationEvidence[] = [];

    for (const rule of this.rules) {
      evidenze.push(...rule.analizza(contenuto));
    }

    return evidenze;
  }
}