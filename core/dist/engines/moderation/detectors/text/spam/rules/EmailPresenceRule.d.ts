import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";
/**
 * Rileva la presenza di uno o più indirizzi
 * email all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class EmailPresenceRule implements SpamRule {
    /**
     * Espressione regolare utilizzata per
     * individuare indirizzi email nel testo.
     */
    private static readonly EMAIL_REGEX;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=EmailPresenceRule.d.ts.map