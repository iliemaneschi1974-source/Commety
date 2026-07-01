/**
 * ============================================================================
 * Commety Lifecycle Engine
 * ============================================================================
 *
 * Facade pubblica del Lifecycle Engine.
 *
 * Tutti i componenti, hook e servizi dell'applicazione devono importare
 * le funzionalità del Lifecycle esclusivamente da questo file.
 *
 * Questo permette di mantenere stabile l'API pubblica anche se
 * l'implementazione interna del Lifecycle dovesse cambiare nel tempo.
 * ============================================================================
 */

import { extendReportExpiration } from "./lifecycle/extension";

import type { ReportActivityType } from "@/types/reportActivity";

export * from "./lifecycle/expiration";

/**
 * Registra una nuova attività su una segnalazione.
 *
 * L'attività può essere generata da:
 *
 * - conferma
 * - commento
 * - caricamento foto
 * - modifica della segnalazione
 *
 * Sarà il Lifecycle Engine a decidere
 * come reagire all'evento.
 */
export async function registerReportActivity(
  reportId: string,
  activity: ReportActivityType
): Promise<void> {
  switch (activity) {
    case "confirmation":
      await extendReportExpiration(reportId);
      return;

    case "comment":
      await extendReportExpiration(reportId);
      return;

    case "photo":
      await extendReportExpiration(reportId);
      return;

    case "update":
      await extendReportExpiration(reportId);
      return;

    default: {
      const exhaustiveCheck: never = activity;
      return exhaustiveCheck;
    }
  }
}