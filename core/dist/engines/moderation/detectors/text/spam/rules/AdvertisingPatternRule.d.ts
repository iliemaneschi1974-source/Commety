import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";
/**
 * Rileva la presenza di espressioni tipicamente
 * utilizzate in contenuti pubblicitari o promozionali.
 *
 * La regola osserva esclusivamente il linguaggio
 * utilizzato e non prende decisioni sul contenuto.
 */
export declare class AdvertisingPatternRule implements SpamRule {
    /**
     * Pattern linguistici comunemente presenti
     * nei contenuti promozionali.
     */
    private static readonly PATTERN;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=AdvertisingPatternRule.d.ts.map