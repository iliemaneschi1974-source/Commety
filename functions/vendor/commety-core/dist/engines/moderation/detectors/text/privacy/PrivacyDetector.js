"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyDetector = void 0;
const CodiceFiscalePresenceRule_1 = require("./rules/CodiceFiscalePresenceRule");
const IbanPresenceRule_1 = require("./rules/IbanPresenceRule");
const PaymentCardPresenceRule_1 = require("./rules/PaymentCardPresenceRule");
/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Privacy.
 */
class PrivacyDetector {
    rules = [
        new CodiceFiscalePresenceRule_1.CodiceFiscalePresenceRule(),
        new IbanPresenceRule_1.IbanPresenceRule(),
        new PaymentCardPresenceRule_1.PaymentCardPresenceRule(),
    ];
    analizza(contenuto) {
        const evidenze = [];
        for (const rule of this.rules) {
            evidenze.push(...rule.analizza(contenuto));
        }
        return evidenze;
    }
}
exports.PrivacyDetector = PrivacyDetector;
//# sourceMappingURL=PrivacyDetector.js.map