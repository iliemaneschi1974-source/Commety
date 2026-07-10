"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReputationSignal = void 0;
/**
 * Rappresenta un segnale di dominio osservato dal Reputation Engine.
 *
 * I segnali vengono prodotti dagli altri Engine del Core
 * e costituiscono l'unico punto di ingresso per la valutazione
 * della reputazione.
 */
class ReputationSignal {
    tipo;
    timestamp;
    origine;
    metadata;
    constructor(
    /**
     * Tipo del segnale osservato.
     */
    tipo, 
    /**
     * Momento in cui il fenomeno è stato osservato.
     */
    timestamp, 
    /**
     * Origine del segnale.
     */
    origine, 
    /**
     * Metadati opzionali associati al segnale.
     */
    metadata = {}) {
        this.tipo = tipo;
        this.timestamp = timestamp;
        this.origine = origine;
        this.metadata = metadata;
    }
    equals(other) {
        return (this.tipo === other.tipo &&
            this.timestamp.getTime() === other.timestamp.getTime() &&
            this.origine === other.origine);
    }
}
exports.ReputationSignal = ReputationSignal;
//# sourceMappingURL=ReputationSignal.js.map