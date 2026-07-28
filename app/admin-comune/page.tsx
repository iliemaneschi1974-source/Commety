import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/admin/session";

export default async function AdminComunePage() {
  const session = await getAdminSession();
  redirect(
    session
      ? "/admin-comune/dashboard"
      : "/admin-comune/login"
  );
}
