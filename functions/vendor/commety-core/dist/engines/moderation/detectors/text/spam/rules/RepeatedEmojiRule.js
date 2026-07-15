"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatedEmojiRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
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
class RepeatedEmojiRule {
    /**
     * Numero minimo di emoji consecutive uguali
     * necessario per produrre un'evidenza.
     */
    static MINIMO_EMOJI_CONSECUTIVE = 6;
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const emoji = contenuto.testo.match(/\p{Extended_Pictographic}/gu);
        if (emoji === null || emoji.length === 0) {
            return [];
        }
        let ultimaEmoji = "";
        let consecutive = 0;
        for (const corrente of emoji) {
            if (corrente === ultimaEmoji) {
                consecutive++;
                if (consecutive >=
                    RepeatedEmojiRule.MINIMO_EMOJI_CONSECUTIVE) {
                    return [
                        new ModerationEvidence_1.ModerationEvidence("EMOJI_RIPETUTE", "Rilevata una sequenza eccessiva di emoji consecutive.", 1, "TESTO"),
                    ];
                }
            }
            else {
                ultimaEmoji = corrente;
                consecutive = 1;
            }
        }
        return [];
    }
}
exports.RepeatedEmojiRule = RepeatedEmojiRule;
//# sourceMappingURL=RepeatedEmojiRule.js.map