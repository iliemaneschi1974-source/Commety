"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { playPublicationChime } from "@/lib/sounds";

/**
 * Stati possibili dell'overlay.
 */
export type ProcessingOverlayState =
  | "IDLE"
  | "PROCESSING"
  | "SUCCESS"
  | "ERROR";

interface ProcessingOverlayContextValue {
  state: ProcessingOverlayState;

  showProcessing(): void;

  showSuccess(): void;

  showError(): void;

  hide(): void;
}

const ProcessingOverlayContext =
  createContext<
    ProcessingOverlayContextValue | undefined
  >(undefined);

export function ProcessingOverlayProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [state, setState] =
    useState<ProcessingOverlayState>(
      "IDLE"
    );

  const showProcessing =
    useCallback(() => {
      setState("PROCESSING");
    }, []);

  const showSuccess =
    useCallback(() => {
      setState("SUCCESS");
      playPublicationChime();
    }, []);

  const showError =
    useCallback(() => {
      setState("ERROR");
    }, []);

  const hide =
    useCallback(() => {
      setState("IDLE");
    }, []);

  const value =
    useMemo(
      () => ({
        state,
        showProcessing,
        showSuccess,
        showError,
        hide,
      }),
      [
        state,
        showProcessing,
        showSuccess,
        showError,
        hide,
      ]
    );

  return (
    <ProcessingOverlayContext.Provider
      value={value}
    >
      {children}
    </ProcessingOverlayContext.Provider>
  );

}

export function useProcessingOverlayContext() {

  const context = useContext(
    ProcessingOverlayContext
  );

  if (!context) {
    throw new Error(
      "useProcessingOverlayContext deve essere utilizzato all'interno di ProcessingOverlayProvider."
    );
  }

  return context;

}
