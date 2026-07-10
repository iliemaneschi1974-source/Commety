"use client";

import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { listenUserReports } from "@/services/reports";

import { ProfileGalleryItem } from "@/types/profile";
import { Report } from "@/types/report";

export function useUserReports() {
  const { user } = useAuth();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setReports([]);
      setLoading(false);
      return;
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

  const gallery = useMemo<ProfileGalleryItem[]>(() => {
    return reports.flatMap((report) =>
      report.images.map((image, index) => ({
        id: `${report.id}-${index}`,
        imageUrl: image.url,
        reportId: report.id,
      }))
    );
  }, [reports]);

  return {
    reports,

    gallery,

    reportsCount: reports.length,

    photosCount: gallery.length,

    loading,
  };
}