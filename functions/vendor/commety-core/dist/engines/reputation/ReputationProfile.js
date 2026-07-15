"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReputationProfile = void 0;
/**
 * Rappresenta il profilo di fiducia corrente
 * associato a un utente.
 *
 * Il profilo è una rappresentazione del risultato
 * dell'analisi svolta dal Reputation Engine.
 * Non contiene logiche di calcolo.
 */
class ReputationProfile {
    decision;
    evidenze;
    aggiornatoIl;
    constructor(
    /**
     * Decisione corrente del Reputation Engine.
     */
    decision, 
    /**
     * Evidenze che giustificano la decisione.
     */
    evidenze, 
    /**
     * Momento dell'ultima valutazione.
     */
    aggiornatoIl) {
        this.decision = decision;
        this.evidenze = evidenze;
        this.aggiornatoIl = aggiornatoIl;
    }
    equals(other) {
        if (!this.decision.equals(other.decision)) {
            return false;
        }
        if (this.aggiornatoIl.getTime() !== other.aggiornatoIl.getTime()) {
            return false;
        }
        if (this.evidenze.length !== other.evidenze.length) {
            return false;
        }
        return this.evidenze.every((evidenza, index) => evidenza.equals(other.evidenze[index]));
    }
}
exports.ReputationProfile = ReputationProfile;
//# sourceMappingURL=ReputationProfile.js.map