"use client";

import { useEffect, useState } from "react";

import {
  ReportStatusVote,
  submitReportStatusVote,
  subscribeReportStatusVote,
} from "@/services/reportStatusVotes";

export function useReportStatusVote(reportId?: string) {
  const [vote, setVote] = useState<ReportStatusVote | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!reportId) return;
    return subscribeReportStatusVote(reportId, setVote);
  }, [reportId]);

  async function submit(nextVote: ReportStatusVote): Promise<boolean> {
    if (!reportId || loading || vote === nextVote) return false;

    try {
      setLoading(true);
      const result = await submitReportStatusVote(reportId, nextVote);
      return result.closed;
    } finally {
      setLoading(false);
    }
  }

  return { vote, loading, submit };
}
