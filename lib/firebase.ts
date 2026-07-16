import { initializeApp, getApps, getApp } from "firebase/app";

import {
  getAuth,
  connectAuthEmulator,
} from "firebase/auth";

import {
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

import {
  getFunctions,
  connectFunctionsEmulator,
} from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const functions = getFunctions(app);

/**
 * ============================================================================
 * FIREBASE EMULATORS
 * ----------------------------------------------------------------------------
 *
 * Se abilitati tramite variabile d'ambiente,
 * l'applicazione utilizza gli emulatori locali
 * invece dei servizi Firebase in produzione.
 * ============================================================================
 */
if (
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true"
) {

  connectFirestoreEmulator(
    db,
    "127.0.0.1",
    8080
  );

  connectFunctionsEmulator(
    functions,
    "127.0.0.1",
    5001
  );

  connectAuthEmulator(
    auth,
    "http://127.0.0.1:9099",
    {
      disableWarnings: true,
    }
  );

}