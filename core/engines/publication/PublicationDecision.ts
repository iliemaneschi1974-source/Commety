/**
 * Decisione finale del Publication Engine.
 *
 * Rappresenta l'azione da intraprendere
 * dopo la valutazione della segnalazione.
 */
export const PUBLICATION_DECISIONS = [
  "PUBBLICA",
  "PUBBLICA_CON_RISERVA",
  "RICHIEDI_CONFERME",
  "REVISIONE",
  "RIFIUTA",
] as const;

/**
 * Decisione di pubblicazione.
 */
export type PublicationDecision =
  (typeof PUBLICATION_DECISIONS)[number];

/**
 * Verifica se un valore rappresenta
 * una decisione di pubblicazione valida.
 */
export function isPublicationDecision(
  value: string,
): value is PublicationDecision {
  return PUBLICATION_DECISIONS.includes(
    value as PublicationDecision,
  );
}