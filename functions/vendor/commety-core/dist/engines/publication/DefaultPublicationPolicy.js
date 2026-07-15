"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPublicationPolicy = void 0;
/**
 * Policy predefinita del Publication Engine.
 *
 * Definisce le soglie utilizzate per decidere
 * la pubblicazione di una segnalazione.
 */
class DefaultPublicationPolicy {
    getPublishThreshold() {
        return 0.90;
    }
    getPublishWithReservationThreshold() {
        return 0.70;
    }
    getConfirmationThreshold() {
        return 0.50;
    }
    getReviewThreshold() {
        return 0.30;
    }
}
exports.DefaultPublicationPolicy = DefaultPublicationPolicy;
//# sourceMappingURL=DefaultPublicationPolicy.js.map