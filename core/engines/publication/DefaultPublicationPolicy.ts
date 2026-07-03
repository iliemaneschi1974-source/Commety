import { PublicationPolicy } from "./PublicationPolicy";

/**
 * Policy predefinita del Publication Engine.
 *
 * Definisce le soglie utilizzate per decidere
 * la pubblicazione di una segnalazione.
 */
export class DefaultPublicationPolicy
  implements PublicationPolicy
{
  getPublishThreshold(): number {
    return 0.90;
  }

  getPublishWithReservationThreshold(): number {
    return 0.70;
  }

  getConfirmationThreshold(): number {
    return 0.50;
  }

  getReviewThreshold(): number {
    return 0.30;
  }
}