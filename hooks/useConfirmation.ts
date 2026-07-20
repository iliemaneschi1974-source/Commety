"use client";

import { useCallback, useEffect, useState } from "react";

import {
  isReportOwner,
  subscribeConfirmation,
  toggleConfirmation,
} from "@/services/confirmations";
import { useAuth } from "@/contexts/AuthContext";
import { Report } from "@/types/report";

export function useConfirmation(report?: Report | null) {
  const { user } = useAuth();
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ownership, setOwnership] = useState<{
    reportId: string;
    isOwner: boolean;
  } | null>(null);
  const reportId = report?.id;
  const isOwner = ownership?.reportId === reportId && ownership
    ? ownership.isOwner
    : null;

  useEffect(() => {
    let active = true;

    if (!reportId) return;

    void isReportOwner({
      id: reportId,
      userId: report?.userId,
      authorConfirmationKey: report?.authorConfirmationKey,
    }).then((owner) => {
      if (active) setOwnership({ reportId, isOwner: owner });
    });

    return () => {
      active = false;
    };
  }, [
    report?.authorConfirmationKey,
    report?.userId,
    reportId,
    user?.uid,
  ]);

  useEffect(() => {
    if (!reportId || isOwner !== false) return;

    const unsubscribe = subscribeConfirmation(
      reportId,
      setConfirmed
    );

    return unsubscribe;
  }, [isOwner, reportId]);

  const toggle = useCallback(async () => {
    if (!reportId || loading || isOwner !== false) return;

    setLoading(true);

    try {
      await toggleConfirmation(reportId);
    } catch (error) {
      console.error("Errore conferma:", error);
    } finally {
      setLoading(false);
    }
  }, [isOwner, loading, reportId]);

  return {
    confirmed,
    loading,
    isOwner,
    toggle,
  };
}
