"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReputationDecision = void 0;
/**
 * Decisione finale prodotta dal Reputation Engine.
 *
 * Rappresenta il livello di fiducia che Commetty
 * ripone in un utente sulla base delle evidenze
 * disponibili.
 */
class ReputationDecision {
    livello;
    constructor(livello) {
        this.livello = livello;
    }
    static fiduciaMassima() {
        return new ReputationDecision("FIDUCIA_MASSIMA");
    }
    static altaFiducia() {
        return new ReputationDecision("ALTA_FIDUCIA");
    }
    static fiduciaStandard() {
        return new ReputationDecision("FIDUCIA_STANDARD");
    }
    static fiduciaLimitata() {
        return new ReputationDecision("FIDUCIA_LIMITATA");
    }
    static osservazione() {
        return new ReputationDecision("OSSERVAZIONE");
    }
    static nonAffidabile() {
        return new ReputationDecision("NON_AFFIDABILE");
    }
    isFiduciaMassima() {
        return this.livello === "FIDUCIA_MASSIMA";
    }
    isAltaFiducia() {
        return this.livello === "ALTA_FIDUCIA";
    }
    isFiduciaStandard() {
        return this.livello === "FIDUCIA_STANDARD";
    }
    isFiduciaLimitata() {
        return this.livello === "FIDUCIA_LIMITATA";
    }
    isOsservazione() {
        return this.livello === "OSSERVAZIONE";
    }
    isNonAffidabile() {
        return this.livello === "NON_AFFIDABILE";
    }
    equals(other) {
        return this.livello === other.livello;
    }
}
exports.ReputationDecision = ReputationDecision;
//# sourceMappingURL=ReputationDecision.js.map