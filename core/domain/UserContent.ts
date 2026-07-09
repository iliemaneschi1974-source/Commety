/**
 * Rappresenta il contenuto fornito da un utente.
 *
 * È un oggetto di dominio indipendente dalla piattaforma
 * e può essere utilizzato da diversi motori del Core
 * (Moderation, AI, Search, ecc.).
 */
export class UserContent {
  /**
   * Testo completo derivato da titolo e descrizione.
   *
   * Mantiene la retrocompatibilità con tutti i detector
   * esistenti che oggi analizzano un unico testo.
   */
  public readonly testo?: string;

  /**
   * Titolo della segnalazione.
   */
  public readonly titolo?: string;

  /**
   * Descrizione della segnalazione.
   */
  public readonly descrizione?: string;

  /**
   * Riferimenti alle immagini associate al contenuto.
   */
  public readonly immagini: readonly string[];

  /**
   * --------------------------------------------------------------------------
   * Costruttore retrocompatibile.
   *
   * Supporta entrambe le firme:
   *
   * Nuova API:
   *   new UserContent(titolo, descrizione, immagini)
   *
   * API storica:
   *   new UserContent(testo, immagini)
   * --------------------------------------------------------------------------
   */
  constructor(
    titolo?: string,
    descrizione?: string,
    immagini?: readonly string[]
  );

  constructor(
    testo?: string,
    immagini?: readonly string[]
  );

  constructor(
    arg1?: string,
    arg2?: string | readonly string[],
    arg3: readonly string[] = []
  ) {
    if (Array.isArray(arg2)) {
      // ==========================================================
      // Firma storica:
      // new UserContent(testo, immagini)
      // ==========================================================
      this.testo =
        arg1?.trim().length
          ? arg1.trim()
          : undefined;

      this.titolo = undefined;
      this.descrizione = undefined;
      this.immagini = arg2;
      return;
    }

    // ==========================================================
    // Nuova firma:
    // new UserContent(titolo, descrizione, immagini)
    // ==========================================================
    this.titolo =
      arg1?.trim().length
        ? arg1.trim()
        : undefined;

    const descrizione =
  typeof arg2 === "string"
    ? arg2.trim()
    : undefined;

this.descrizione = descrizione;

    this.immagini = arg3;

    const parti = [
      this.titolo,
      this.descrizione,
    ].filter(
      (parte): parte is string =>
        parte !== undefined &&
        parte.length > 0
    );

    this.testo =
      parti.length > 0
        ? parti.join("\n")
        : undefined;
  }

  /**
   * Indica se il contenuto contiene del testo.
   */
  hasTesto(): boolean {
    return (
      this.testo !== undefined &&
      this.testo.trim().length > 0
    );
  }

  /**
   * Indica se è presente un titolo.
   */
  hasTitolo(): boolean {
    return (
      this.titolo !== undefined &&
      this.titolo.trim().length > 0
    );
  }

  /**
   * Indica se è presente una descrizione.
   */
  hasDescrizione(): boolean {
    return (
      this.descrizione !== undefined &&
      this.descrizione.trim().length > 0
    );
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
    return (
      !this.hasTesto() &&
      !this.hasImmagini()
    );
  }
}