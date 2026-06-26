"use client";

import { useCallback, useEffect, useState } from "react";

import {
  subscribeConfirmation,
  toggleConfirmation,
} from "@/services/confirmations";

export function useConfirmation(reportId?: string) {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!reportId) return;

    const unsubscribe = subscribeConfirmation(
      reportId,
      setConfirmed
    );

    return unsubscribe;
  }, [reportId]);

  const toggle = useCallback(async () => {
    if (!reportId || loading) return;

    setLoading(true);

    try {
      await toggleConfirmation(reportId);
    } catch (error) {
      console.error("Errore conferma:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, reportId]);

  return {
    confirmed,
    loading,
    toggle,
  };
}