import { redirect } from "next/navigation";

interface ReportRedirectPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Route pubblica di una segnalazione.
 *
 * Viene utilizzata esclusivamente per:
 *
 * - condivisioni
 * - Open Graph
 * - deep link
 *
 * L'utente viene immediatamente reindirizzato
 * alla mappa di Commety con la segnalazione
 * preselezionata.
 */
export default async function ReportRedirectPage({
  params,
}: ReportRedirectPageProps) {
  const { id } = await params;

  redirect(`/?r=${encodeURIComponent(id)}`);
}