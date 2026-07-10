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
export declare class UrlPresenceRule implements SpamRule {
    /**
     * Espressione regolare utilizzata per
     * individuare URL nel testo.
     */
    private static readonly URL_REGEX;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=UrlPresenceRule.d.ts.map