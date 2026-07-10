import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";
/**
 * Rileva contenuti composti esclusivamente
 * da emoji.
 *
 * Ogni riga del contenuto viene analizzata
 * separatamente, così da gestire correttamente
 * titolo e descrizione.
 */
export declare class EmojiOnlyRule implements QualityRule {
    /**
     * Espressione regolare Unicode che verifica
     * se una riga contiene esclusivamente emoji
     * e spazi.
     *
     * Include anche:
     * - Emoji Presentation
     * - Variation Selector-16
     * - Zero Width Joiner
     */
    private static readonly EMOJI_ONLY_REGEX;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=EmojiOnlyRule.d.ts.map