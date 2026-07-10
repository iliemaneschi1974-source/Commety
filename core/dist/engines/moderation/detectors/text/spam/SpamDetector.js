"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpamDetector = void 0;
const AdvertisingPatternRule_1 = require("./rules/AdvertisingPatternRule");
const EmailPresenceRule_1 = require("./rules/EmailPresenceRule");
const KeywordSpamRule_1 = require("./rules/KeywordSpamRule");
const PhoneNumberPresenceRule_1 = require("./rules/PhoneNumberPresenceRule");
const RepeatedCharactersRule_1 = require("./rules/RepeatedCharactersRule");
const RepeatedEmojiRule_1 = require("./rules/RepeatedEmojiRule");
const RepeatedWordsRule_1 = require("./rules/RepeatedWordsRule");
const UppercaseRule_1 = require("./rules/UppercaseRule");
const UrlPresenceRule_1 = require("./rules/UrlPresenceRule");
/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Spam.
 */
class SpamDetector {
    rules = [
        new RepeatedCharactersRule_1.RepeatedCharactersRule(),
        new RepeatedWordsRule_1.RepeatedWordsRule(),
        new RepeatedEmojiRule_1.RepeatedEmojiRule(),
        new UppercaseRule_1.UppercaseRule(),
        new AdvertisingPatternRule_1.AdvertisingPatternRule(),
        new UrlPresenceRule_1.UrlPresenceRule(),
        new EmailPresenceRule_1.EmailPresenceRule(),
        new PhoneNumberPresenceRule_1.PhoneNumberPresenceRule(),
        new KeywordSpamRule_1.KeywordSpamRule(),
    ];
    /**
     * Analizza il contenuto utilizzando tutte
     * le regole della famiglia Spam.
     */
    analizza(contenuto) {
        const evidenze = [];
        for (const rule of this.rules) {
            evidenze.push(...rule.analizza(contenuto));
        }
        return evidenze;
    }
}
exports.SpamDetector = SpamDetector;
//# sourceMappingURL=SpamDetector.js.map