/**
 * Decisione finale del Publication Engine.
 *
 * Rappresenta l'azione da intraprendere
 * dopo la valutazione della segnalazione.
 */
export declare const PUBLICATION_DECISIONS: readonly ["PUBBLICA", "PUBBLICA_CON_RISERVA", "RICHIEDI_CONFERME", "REVISIONE", "RIFIUTA"];
/**
 * Decisione di pubblicazione.
 */
export type PublicationDecision = (typeof PUBLICATION_DECISIONS)[number];
/**
 * Verifica se un valore rappresenta
 * una decisione di pubblicazione valida.
 */
export declare function isPublicationDecision(value: string): value is PublicationDecision;
//# sourceMappingURL=PublicationDecision.d.ts.map