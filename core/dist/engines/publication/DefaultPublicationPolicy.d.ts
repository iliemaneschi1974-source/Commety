import { PublicationPolicy } from "./PublicationPolicy";
/**
 * Policy predefinita del Publication Engine.
 *
 * Definisce le soglie utilizzate per decidere
 * la pubblicazione di una segnalazione.
 */
export declare class DefaultPublicationPolicy implements PublicationPolicy {
    getPublishThreshold(): number;
    getPublishWithReservationThreshold(): number;
    getConfirmationThreshold(): number;
    getReviewThreshold(): number;
}
//# sourceMappingURL=DefaultPublicationPolicy.d.ts.map