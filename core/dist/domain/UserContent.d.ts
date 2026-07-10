/**
 * Rappresenta il contenuto fornito da un utente.
 *
 * È un oggetto di dominio indipendente dalla piattaforma
 * e può essere utilizzato da diversi motori del Core
 * (Moderation, AI, Search, ecc.).
 */
export declare class UserContent {
    /**
     * Testo completo derivato da titolo e descrizione.
     *
     * Mantiene la retrocompatibilità con tutti i detector
     * esistenti che oggi analizzano un unico testo.
     */
    readonly testo?: string;
    /**
     * Titolo della segnalazione.
     */
    readonly titolo?: string;
    /**
     * Descrizione della segnalazione.
     */
    readonly descrizione?: string;
    /**
     * Riferimenti alle immagini associate al contenuto.
     */
    readonly immagini: readonly string[];
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
    constructor(titolo?: string, descrizione?: string, immagini?: readonly string[]);
    constructor(testo?: string, immagini?: readonly string[]);
    /**
     * Indica se il contenuto contiene del testo.
     */
    hasTesto(): boolean;
    /**
     * Indica se è presente un titolo.
     */
    hasTitolo(): boolean;
    /**
     * Indica se è presente una descrizione.
     */
    hasDescrizione(): boolean;
    /**
     * Indica se il contenuto contiene almeno un'immagine.
     */
    hasImmagini(): boolean;
    /**
     * Indica se il contenuto è completamente vuoto.
     */
    isEmpty(): boolean;
}
//# sourceMappingURL=UserContent.d.ts.map