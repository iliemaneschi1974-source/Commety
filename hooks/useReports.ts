"use client";

import { useEffect, useState } from "react";
import { Report } from "@/types/report";
import { listenReports } from "@/services/reports";

interface UseReportsResult {
  reports: Report[];
  loading: boolean;
  error: Error | null;
}

export default function useReports(): UseReportsResult {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = listenReports((data) => {
        setReports(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return {
    reports,
    loading,
    error,
  };
}