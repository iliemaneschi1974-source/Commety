import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";

import { db } from "@/lib/firebase";
import { DEFAULT_USER } from "@/lib/defaults/user";
import {
  toCommettyUser,
  toUserDocument,
} from "@/lib/mappers/user";

import { CreateUserDocument } from "@/types/create-user-document";
import { UserDocument } from "@/types/firestore-user";
import { CommettyUser } from "@/types/user";

const usersCollection = collection(db, "users");

/**
 * Recupera un utente tramite UID.
 */
export async function getUser(
  uid: string
): Promise<CommettyUser | null> {
  const snapshot = await getDoc(doc(usersCollection, uid));

  if (!snapshot.exists()) {
    return null;
  }

  return toCommettyUser(snapshot.data() as UserDocument);
}

/**
 * Crea un nuovo utente.
 */
export async function createUser(
  firebaseUser: FirebaseUser
): Promise<CommettyUser> {
  const userDocument: CreateUserDocument = {
    uid: firebaseUser.uid,

    email: firebaseUser.email ?? undefined,

    role: DEFAULT_USER.role,

    status: DEFAULT_USER.status,

    profile: {
      ...DEFAULT_USER.profile,

      displayName:
        firebaseUser.displayName ?? "",

      username:
        firebaseUser.displayName ?? "",

      avatarUrl:
        firebaseUser.photoURL ?? "",
    },

    statistics: DEFAULT_USER.statistics,

    reputation: DEFAULT_USER.reputation,

    preferences: DEFAULT_USER.preferences,

    metadata: {
      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),
    },
  };

  await setDoc(
    doc(usersCollection, firebaseUser.uid),
    userDocument
  );

  const createdUser = await getUser(
    firebaseUser.uid
  );

  if (!createdUser) {
    throw new Error(
      "Impossibile creare il profilo utente."
    );
  }

  return createdUser;
}

/**
 * Aggiorna un utente.
 */
export async function updateUser(
  uid: string,
  data: Partial<UserDocument>
) {
  return updateDoc(doc(usersCollection, uid), {
    ...data,

    "metadata.updatedAt": serverTimestamp(),
  });
}

/**
 * Listener realtime del profilo utente.
 */
export function listenUser(
  uid: string,
  callback: (
    user: CommettyUser | null
  ) => void
) {
  return onSnapshot(
    doc(usersCollection, uid),
    (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }

      callback(
        toCommettyUser(
          snapshot.data() as UserDocument
        )
      );
    },
    (error) => {
      console.error(
        "Errore listener user:",
        error
      );
    }
  );
}

/**
 * Restituisce il profilo utente,
 * creandolo automaticamente
 * al primo accesso.
 */
export async function ensureUserExists(
  firebaseUser: FirebaseUser
): Promise<CommettyUser> {
  const existingUser = await getUser(
    firebaseUser.uid
  );

  if (existingUser) {
    return existingUser;
  }

  return createUser(firebaseUser);
}