import { Timestamp } from "firebase/firestore";

import { ReportCategory } from "@/types/report";

const HOUR = 60 * 60 * 1000;
const MINUTE = 60 * 1000;

export const REPORT_EXPIRATION = {
  traffico: {
    duration: 2 * HOUR,
    extensionDuration: 1 * HOUR,
    extensionWindow: 30 * MINUTE,
    maxDuration: 6 * HOUR,
  },

  meteo: {
    duration: 2 * HOUR,
    extensionDuration: 1 * HOUR,
    extensionWindow: 30 * MINUTE,
    maxDuration: 6 * HOUR,
  },

  pericolo: {
    duration: 12 * HOUR,
    extensionDuration: 6 * HOUR,
    extensionWindow: 2 * HOUR,
    maxDuration: 48 * HOUR,
  },

  mare: {
    duration: 12 * HOUR,
    extensionDuration: 6 * HOUR,
    extensionWindow: 2 * HOUR,
    maxDuration: 48 * HOUR,
  },

  evento: {
    duration: 24 * HOUR,
    extensionDuration: 12 * HOUR,
    extensionWindow: 4 * HOUR,
    maxDuration: 72 * HOUR,
  },
} satisfies Record<
  ReportCategory,
  {
    duration: number;
    extensionDuration: number;
    extensionWindow: number;
    maxDuration: number;
  }
>;

export interface ReportExpiration {
  expiresAt: Timestamp;
  maxExpiresAt: Timestamp;
}

export function calculateReportExpiration(
  category: ReportCategory
): ReportExpiration {
  const now = Date.now();

  const config = REPORT_EXPIRATION[category];

  return {
    expiresAt: Timestamp.fromMillis(
      now + config.duration
    ),

    maxExpiresAt: Timestamp.fromMillis(
      now + config.maxDuration
    ),
  };
}

export function getExtensionDuration(
  category: ReportCategory
): number {
  return REPORT_EXPIRATION[category]
    .extensionDuration;
}

export function getExtensionWindow(
  category: ReportCategory
): number {
  return REPORT_EXPIRATION[category]
    .extensionWindow;
}

/**
 * Calcola la nuova data di scadenza
 * dopo una proroga.
 *
 * Il nuovo expiresAt non può mai
 * superare maxExpiresAt.
 */
export function calculateExtendedExpiration(
  currentExpiresAt: Timestamp,
  maxExpiresAt: Timestamp,
  category: ReportCategory
): Timestamp {
  const extension =
    getExtensionDuration(category);

  const nextExpiration =
    currentExpiresAt.toMillis() + extension;

  return Timestamp.fromMillis(
    Math.min(
      nextExpiration,
      maxExpiresAt.toMillis()
    )
  );
}