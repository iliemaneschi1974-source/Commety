"use client";

import {
  createContext,
  ReactNode,
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
} from "@/services/users";

import { CommettyUser } from "@/types/user";

interface AuthContextType {
  loading: boolean;

  isAuthenticated: boolean;

  user: CommettyUser | null;

  signInWithGoogle: () => Promise<void>;

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

          const commettyUser =
            await ensureUserExists(
              firebaseUser
            );

          setUser(commettyUser);
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

  async function signInWithGoogle() {
    setLoading(true);

    try {
      await firebaseSignInWithGoogle();
    } finally {
      setLoading(false);
    }
  }

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

      signOut,
    }),
    [loading, user]
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