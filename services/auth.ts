import {
  GoogleAuthProvider,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

/**
 * Provider Google.
 */
const googleProvider = new GoogleAuthProvider();

/**
 * Effettua il login con Google.
 */
export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

/**
 * Effettua il logout.
 */
export async function signOutUser() {
  return signOut(auth);
}

/**
 * Restituisce l'utente Firebase corrente.
 */
export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}

/**
 * Listener dello stato di autenticazione.
 */
export function listenAuthState(
  callback: (user: FirebaseUser | null) => void
) {
  return onAuthStateChanged(auth, callback);
}