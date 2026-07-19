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

export type ProcessingOverlaySubject =
  | "image"
  | "video";

interface ProcessingOverlayContextValue {
  state: ProcessingOverlayState;
  subject: ProcessingOverlaySubject;

  showProcessing(subject?: ProcessingOverlaySubject): void;

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
  const [subject, setSubject] =
    useState<ProcessingOverlaySubject>("image");

  const showProcessing =
    useCallback((nextSubject: ProcessingOverlaySubject = "image") => {
      setSubject(nextSubject);
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
        subject,
        showProcessing,
        showSuccess,
        showError,
        hide,
      }),
      [
        state,
        subject,
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
