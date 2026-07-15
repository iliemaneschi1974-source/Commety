/**
 * ============================================================================
 * PLATFORM CHECK RESULT
 * ----------------------------------------------------------------------------
 *
 * Rappresenta il risultato prodotto da un singolo controllo
 * eseguito dal Platform Doctor.
 *
 * Ogni check restituisce sempre un PlatformCheckResult,
 * indipendentemente dal suo esito.
 *
 * Questa classe non contiene alcuna logica di business.
 * È un semplice oggetto di dominio immutabile.
 * ============================================================================
 */
export class PlatformCheckResult {

  /**
   * Nome del controllo eseguito.
   */
  public readonly name: string;

  /**
   * Indica se il controllo è stato superato.
   */
  public readonly success: boolean;

  /**
   * Messaggio descrittivo del risultato.
   */
  public readonly message: string;

  /**
   * Suggerimento opzionale per la risoluzione
   * di eventuali problemi rilevati.
   */
  public readonly suggestion?: string;

  constructor(
    name: string,
    success: boolean,
    message: string,
    suggestion?: string
  ) {

    this.name = name;
    this.success = success;
    this.message = message;
    this.suggestion = suggestion;

  }

}