import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerReportById } from "@/services/serverReports";

interface ReportRedirectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ReportRedirectPageProps): Promise<Metadata> {
  const { id } = await params;

  const report = await getServerReportById(id);

  if (!report) {
    return {
      title: "Segnalazione non trovata | Commety",
    };
  }

  const title = report.title;

  const description =
    report.description ||
    report.address ||
    "Scopri cosa sta succedendo vicino a te.";

  const image = `https://www.commety.it/r/${id}/opengraph-image`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: [image],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Route pubblica di una segnalazione.
 *
 * Utilizzata per:
 * - metadata dinamici
 * - Open Graph
 * - condivisioni
 * - deep link
 */
export default async function ReportRedirectPage({
  params,
}: ReportRedirectPageProps) {
  const { id } = await params;

  redirect(`/?r=${encodeURIComponent(id)}`);
}