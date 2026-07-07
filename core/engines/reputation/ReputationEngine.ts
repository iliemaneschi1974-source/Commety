import { ReputationProfile } from "./ReputationProfile";
import { ReputationSignal } from "./ReputationSignal";

/**
 * Contratto pubblico del Reputation Engine.
 *
 * Il motore valuta i segnali di dominio disponibili
 * e costruisce il profilo di fiducia corrente.
 */
export interface ReputationEngine {
  /**
   * Valuta i segnali ricevuti e costruisce
   * il profilo di reputazione dell'utente.
   */
  valuta(
    segnali: readonly ReputationSignal[]
  ): ReputationProfile;
}