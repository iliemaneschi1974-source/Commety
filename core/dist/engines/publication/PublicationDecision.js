"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLICATION_DECISIONS = void 0;
exports.isPublicationDecision = isPublicationDecision;
/**
 * Decisione finale del Publication Engine.
 *
 * Rappresenta l'azione da intraprendere
 * dopo la valutazione della segnalazione.
 */
exports.PUBLICATION_DECISIONS = [
    "PUBBLICA",
    "PUBBLICA_CON_RISERVA",
    "RICHIEDI_CONFERME",
    "REVISIONE",
    "RIFIUTA",
];
/**
 * Verifica se un valore rappresenta
 * una decisione di pubblicazione valida.
 */
function isPublicationDecision(value) {
    return exports.PUBLICATION_DECISIONS.includes(value);
}
//# sourceMappingURL=PublicationDecision.js.map