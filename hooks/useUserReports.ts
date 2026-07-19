"use client";

import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { listenUserReports } from "@/services/reports";
import { isReportExpired } from "@/services/lifecycle/expiration";

import { ProfileGalleryItem } from "@/types/profile";
import { Report } from "@/types/report";

export function useUserReports() {
  const { user } = useAuth();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!user) {
      const resetTimeoutId = window.setTimeout(() => {
        setReports([]);
        setLoading(false);
      }, 0);

      return () => window.clearTimeout(resetTimeoutId);
    }

    const unsubscribe = listenUserReports(
      user.uid,
      (reports) => {
        setReports(reports);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const approvedReports = useMemo(
    () => reports.filter((report) => report.isVisible),
    [reports]
  );

  const activePublishedReports = useMemo(
    () => approvedReports.filter((report) => {
      if (report.status !== "ACTIVE") {
        return false;
      }

      return !report.expiresAt || !isReportExpired(report.expiresAt, now);
    }),
    [approvedReports, now]
  );

  const createGalleryItems = (sourceReports: Report[]) => {
    return sourceReports.flatMap((report) =>
      report.video ? [] : report.images.map((image, index) => ({
        id: `${report.id}-${index}`,
        imageUrl: image.url,
        reportId: report.id,
      }))
    );
  };

  const gallery = useMemo<ProfileGalleryItem[]>(() => {
    return createGalleryItems(activePublishedReports);
  }, [activePublishedReports]);

  const approvedPhotosCount = useMemo(
    () => createGalleryItems(approvedReports).length,
    [approvedReports]
  );

  return {
    reports: activePublishedReports,

    gallery,

    reportsCount: approvedReports.length,

    photosCount: approvedPhotosCount,

    loading,
  };
}
