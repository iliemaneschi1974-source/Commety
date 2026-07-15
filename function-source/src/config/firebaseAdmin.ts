import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

/**
 * Inizializza Firebase Admin una sola volta.
 */
const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp();

/**
 * Istanza Firestore Admin.
 */
export const adminDb = getFirestore(app);

/**
 * Istanza Firebase Storage Admin.
 */
export const adminStorage = getStorage(app);

export default app;