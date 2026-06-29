import { redirect } from "next/navigation";

interface ReportPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReportPage({
  params,
}: ReportPageProps) {
  const { id } = await params;

  redirect(`/mappa?report=${id}`);
}