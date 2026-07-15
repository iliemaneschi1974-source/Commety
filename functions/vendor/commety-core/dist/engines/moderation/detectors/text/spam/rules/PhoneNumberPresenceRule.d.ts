import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";
/**
 * Rileva la presenza di uno o più numeri
 * di telefono all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class PhoneNumberPresenceRule implements SpamRule {
    /**
     * Espressione regolare utilizzata per
     * individuare numeri di telefono.
     */
    private static readonly PHONE_REGEX;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=PhoneNumberPresenceRule.d.ts.map