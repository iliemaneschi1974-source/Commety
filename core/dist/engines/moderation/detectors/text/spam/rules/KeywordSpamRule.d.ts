import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";
/**
 * Rileva la presenza di parole o espressioni
 * comunemente associate a contenuti spam.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class KeywordSpamRule implements SpamRule {
    /**
     * Parole chiave ed espressioni tipicamente
     * utilizzate nei contenuti spam.
     */
    private static readonly KEYWORDS;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=KeywordSpamRule.d.ts.map