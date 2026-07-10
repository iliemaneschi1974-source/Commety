import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";
/**
 * Rileva la ripetizione consecutiva della stessa emoji
 * all'interno del testo.
 *
 * Esempi:
 *
 * 😂😂😂😂😂😂
 * 🔥🔥🔥🔥🔥🔥
 * ❤️❤️❤️❤️❤️❤️
 *
 * La regola osserva esclusivamente questo fenomeno
 * e produce una singola evidenza di moderazione.
 */
export declare class RepeatedEmojiRule implements SpamRule {
    /**
     * Numero minimo di emoji consecutive uguali
     * necessario per produrre un'evidenza.
     */
    private static readonly MINIMO_EMOJI_CONSECUTIVE;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=RepeatedEmojiRule.d.ts.map