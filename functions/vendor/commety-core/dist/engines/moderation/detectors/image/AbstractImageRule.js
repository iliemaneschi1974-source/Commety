"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractImageRule = void 0;
const ModerationEvidence_1 = require("../../ModerationEvidence");
/**
 * Classe base per tutte le ImageRule.
 *
 * Fornisce il contratto comune e le funzionalità
 * condivise tra le regole di moderazione immagini.
 */
class AbstractImageRule {
    /**
     * Crea una nuova evidenza di moderazione
     * con origine IMMAGINE.
     *
     * Tutte le ImageRule utilizzano questo metodo
     * per mantenere uniforme la creazione delle evidenze.
     */
    creaEvidence(tipo, descrizione, confidenza) {
        return new ModerationEvidence_1.ModerationEvidence(tipo, descrizione, confidenza, "IMMAGINE");
    }
}
exports.AbstractImageRule = AbstractImageRule;
//# sourceMappingURL=AbstractImageRule.js.map