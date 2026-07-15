"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTemporalPolicy = void 0;
/**
 * Policy temporale predefinita del dominio Commetty.
 *
 * Definisce la durata massima di validità
 * delle principali categorie di segnalazione.
 */
class DefaultTemporalPolicy {
    static DEFAULT_DURATION = 60 * 60 * 1000;
    static DURATIONS = {
        traffico: 60 * 60 * 1000,
        meteo: 2 * 60 * 60 * 1000,
        pericolo: 3 * 60 * 60 * 1000,
        evento: 24 * 60 * 60 * 1000,
        mare: 3 * 60 * 60 * 1000,
    };
    getValidityDuration(category) {
        return (DefaultTemporalPolicy.DURATIONS[category] ??
            DefaultTemporalPolicy.DEFAULT_DURATION);
    }
}
exports.DefaultTemporalPolicy = DefaultTemporalPolicy;
//# sourceMappingURL=DefaultTemporalPolicy.js.map