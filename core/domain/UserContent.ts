/**
 * Rappresenta il contenuto fornito da un utente.
 *
 * È un oggetto di dominio indipendente dalla piattaforma
 * e può essere utilizzato da diversi motori del Core
 * (Moderation, AI, Search, ecc.).
 */
export class UserContent {
  constructor(
    /**
     * Testo inserito dall'utente.
     */
    public readonly testo?: string,

    /**
     * Riferimenti alle immagini associate al contenuto.
     */
    public readonly immagini: readonly string[] = []
  ) {}

  /**
   * Indica se il contenuto contiene del testo.
   */
  hasTesto(): boolean {
    return this.testo !== undefined && this.testo.trim().length > 0;
  }

  /**
   * Indica se il contenuto contiene almeno un'immagine.
   */
  hasImmagini(): boolean {
    return this.immagini.length > 0;
  }

  /**
   * Indica se il contenuto è completamente vuoto.
   */
  isEmpty(): boolean {
    return !this.hasTesto() && !this.hasImmagini();
  }
}