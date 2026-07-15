"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationEvidence = void 0;
/**
 * Rappresenta una singola evidenza prodotta durante
 * il processo di moderazione dei contenuti.
 *
 * L'evidenza descrive un fatto rilevato dagli analyzer,
 * senza esprimere alcuna decisione finale.
 */
class ModerationEvidence {
    tipo;
    descrizione;
    confidenza;
    origine;
    constructor(
    /**
     * Categoria dell'evidenza rilevata.
     */
    tipo, 
    /**
     * Descrizione leggibile dell'evidenza.
     */
    descrizione, 
    /**
     * Livello di confidenza dell'analisi.
     *
     * Valore compreso tra 0 e 1.
     */
    confidenza, 
    /**
     * Origine dell'evidenza.
     */
    origine) {
        this.tipo = tipo;
        this.descrizione = descrizione;
        this.confidenza = confidenza;
        this.origine = origine;
    }
    equals(other) {
        return (this.tipo === other.tipo &&
            this.descrizione === other.descrizione &&
            this.confidenza === other.confidenza &&
            this.origine === other.origine);
    }
}
exports.ModerationEvidence = ModerationEvidence;
//# sourceMappingURL=ModerationEvidence.js.map