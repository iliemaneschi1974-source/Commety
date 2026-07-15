"use strict";
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * TextQualityScore
 *
 * Value Object che rappresenta il livello di qualità
 * di un testo analizzato dal Core.
 *
 * Non appartiene alla Moderation.
 *
 * Potrà essere riutilizzato da:
 *
 * - Moderation Engine
 * - Reputation Engine
 * - AI Engine
 * - Search Engine
 * - Analytics
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextQualityScore = void 0;
class TextQualityScore {
    value;
    reasons;
    constructor(
    /**
     * Valore complessivo della qualità.
     *
     * Più è alto,
     * peggiore è il testo.
     */
    value, 
    /**
     * Motivazioni che hanno contribuito
     * al punteggio finale.
     */
    reasons = []) {
        this.value = value;
        this.reasons = reasons;
    }
    /**
     * Il testo è di qualità insufficiente.
     */
    isPoor() {
        return this.value >= 5;
    }
    /**
     * Il testo è accettabile.
     */
    isAcceptable() {
        return !this.isPoor();
    }
}
exports.TextQualityScore = TextQualityScore;
//# sourceMappingURL=TextQualityScore.js.map