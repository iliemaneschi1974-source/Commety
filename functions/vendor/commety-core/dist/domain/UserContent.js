"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContent = void 0;
/**
 * Rappresenta il contenuto fornito da un utente.
 *
 * È un oggetto di dominio indipendente dalla piattaforma
 * e può essere utilizzato da diversi motori del Core
 * (Moderation, AI, Search, ecc.).
 */
class UserContent {
    /**
     * Testo completo derivato da titolo e descrizione.
     *
     * Mantiene la retrocompatibilità con tutti i detector
     * esistenti che oggi analizzano un unico testo.
     */
    testo;
    /**
     * Titolo della segnalazione.
     */
    titolo;
    /**
     * Descrizione della segnalazione.
     */
    descrizione;
    /**
     * Riferimenti alle immagini associate al contenuto.
     */
    immagini;
    constructor(arg1, arg2, arg3 = []) {
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
        const descrizione = typeof arg2 === "string"
            ? arg2.trim()
            : undefined;
        this.descrizione = descrizione;
        this.immagini = arg3;
        const parti = [
            this.titolo,
            this.descrizione,
        ].filter((parte) => parte !== undefined &&
            parte.length > 0);
        this.testo =
            parti.length > 0
                ? parti.join("\n")
                : undefined;
    }
    /**
     * Indica se il contenuto contiene del testo.
     */
    hasTesto() {
        return (this.testo !== undefined &&
            this.testo.trim().length > 0);
    }
    /**
     * Indica se è presente un titolo.
     */
    hasTitolo() {
        return (this.titolo !== undefined &&
            this.titolo.trim().length > 0);
    }
    /**
     * Indica se è presente una descrizione.
     */
    hasDescrizione() {
        return (this.descrizione !== undefined &&
            this.descrizione.trim().length > 0);
    }
    /**
     * Indica se il contenuto contiene almeno un'immagine.
     */
    hasImmagini() {
        return this.immagini.length > 0;
    }
    /**
     * Indica se il contenuto è completamente vuoto.
     */
    isEmpty() {
        return (!this.hasTesto() &&
            !this.hasImmagini());
    }
}
exports.UserContent = UserContent;
//# sourceMappingURL=UserContent.js.map