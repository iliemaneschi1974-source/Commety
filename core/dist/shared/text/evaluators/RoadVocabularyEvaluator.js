"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadVocabularyEvaluator = void 0;
const TextQualityContribution_1 = require("../TextQualityContribution");
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * RoadVocabularyEvaluator
 *
 * Riconosce termini tipici della viabilità e
 * delle segnalazioni stradali.
 *
 * La presenza di questo vocabolario aumenta
 * l'affidabilità del testo e riduce il punteggio
 * complessivo del Text Quality Engine.
 * ============================================================================
 */
class RoadVocabularyEvaluator {
    /**
     * Vocabolario iniziale della viabilità.
     *
     * Potrà essere ampliato nel tempo senza
     * modificare l'algoritmo.
     */
    static KEYWORDS = [
        "a1",
        "a4",
        "a24",
        "a90",
        "ss",
        "sr",
        "sp",
        "autostrada",
        "tangenziale",
        "raccordo",
        "corsia",
        "carreggiata",
        "uscita",
        "ingresso",
        "svincolo",
        "rotatoria",
        "rotonda",
        "incrocio",
        "ponte",
        "galleria",
        "viadotto",
        "via",
        "viale",
        "piazza",
        "km",
        "chilometro",
        "chilometri",
        "traffico",
        "coda",
        "incidente",
        "tamponamento",
        "lavori",
        "deviazione",
        "allagamento",
        "frana",
        "albero",
        "semaforo",
    ];
    evaluate(testo) {
        const testoNormalizzato = testo.toLowerCase();
        const trovato = RoadVocabularyEvaluator.KEYWORDS.some((keyword) => testoNormalizzato.includes(keyword));
        if (!trovato) {
            return new TextQualityContribution_1.TextQualityContribution("RoadVocabularyEvaluator", 0, "Nessun termine tipico della viabilità rilevato.");
        }
        return new TextQualityContribution_1.TextQualityContribution("RoadVocabularyEvaluator", -2, "Il testo contiene termini tipici della viabilità.");
    }
}
exports.RoadVocabularyEvaluator = RoadVocabularyEvaluator;
//# sourceMappingURL=RoadVocabularyEvaluator.js.map