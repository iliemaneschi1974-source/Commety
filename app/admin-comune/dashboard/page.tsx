import { redirect } from "next/navigation";

import AdminDashboard from "@/components/Admin/AdminDashboard";
import { getRomaAdminReports } from "@/lib/admin/reports";
import { getAdminSession } from "@/lib/admin/session";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin-comune/login");
  }

  return (
    <AdminDashboard
      initialReports={await getRomaAdminReports()}
      adminEmail={session.email}
    />
  );
}
