"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  listenAuthState,
  signInWithGoogle as firebaseSignInWithGoogle,
  signOutUser,
} from "@/services/auth";

import {
  ensureUserExists,
  listenUser,
  saveUserConsents,
} from "@/services/users";

import { CommettyUser } from "@/types/user";

interface AuthContextType {
  loading: boolean;

  isAuthenticated: boolean;

  user: CommettyUser | null;

  signInWithGoogle: (analyticsEnabled: boolean) => Promise<void>;

  acceptLegalConsent: (analyticsEnabled: boolean) => Promise<void>;

  signOut: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<CommettyUser | null>(null);

  useEffect(() => {
    const unsubscribe = listenAuthState(
      async (firebaseUser) => {
        try {
          if (!firebaseUser) {
            setUser(null);
            setLoading(false);
            return;
          }

          await ensureUserExists(firebaseUser);

const unsubscribeUser = listenUser(
  firebaseUser.uid,
  (commettyUser) => {
    setUser(commettyUser);
  }
);

setLoading(false);

return unsubscribeUser;
        } catch (error) {
          console.error(
            "Errore autenticazione:",
            error
          );

          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  async function signInWithGoogle(
    analyticsEnabled: boolean
  ) {
    setLoading(true);

    try {
      const credential = await firebaseSignInWithGoogle();

      await ensureUserExists(credential.user);
      await saveUserConsents(
        credential.user.uid,
        analyticsEnabled
      );
    } finally {
      setLoading(false);
    }
  }

  const acceptLegalConsent = useCallback(async (
    analyticsEnabled: boolean
  ) => {
    if (!user) {
      return;
    }

    await saveUserConsents(user.uid, analyticsEnabled);
  }, [user]);

  async function signOut() {
    setLoading(true);

    try {
      await signOutUser();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const value = useMemo(
    () => ({
      loading,

      isAuthenticated: !!user,

      user,

      signInWithGoogle,

      acceptLegalConsent,

      signOut,
    }),
    [loading, user, acceptLegalConsent]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve essere usato dentro AuthProvider"
    );
  }

  return context;
}
