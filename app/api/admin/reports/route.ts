import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_PRIORITY_LABELS,
  ADMIN_STATUS_LABELS,
  AdminPriority,
  AdminReportStatus,
} from "@/lib/admin/dashboard-types";
import {
  getRomaAdminReports,
  updateRomaAdminReport,
} from "@/lib/admin/reports";
import { getAdminSession } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json(
      { error: "Accesso non autorizzato." },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { reports: await getRomaAdminReports() },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    }
  );
}

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "Accesso non autorizzato." },
      { status: 401 }
    );
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json(
      { error: "Richiesta non valida." },
      { status: 403 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Dati non validi." },
      { status: 400 }
    );
  }

  const reportId =
    typeof body.reportId === "string" ? body.reportId : "";
  if (!/^[A-Za-z0-9_-]{1,160}$/.test(reportId)) {
    return NextResponse.json(
      { error: "Segnalazione non valida." },
      { status: 400 }
    );
  }

  const status =
    typeof body.status === "string" &&
    body.status in ADMIN_STATUS_LABELS
      ? (body.status as AdminReportStatus)
      : undefined;
  const priority =
    typeof body.priority === "string" &&
    body.priority in ADMIN_PRIORITY_LABELS
      ? (body.priority as AdminPriority)
      : undefined;
  const institutionalNote =
    typeof body.institutionalNote === "string"
      ? body.institutionalNote.trim().slice(0, 500)
      : undefined;

  if (
    !status &&
    !priority &&
    institutionalNote === undefined
  ) {
    return NextResponse.json(
      { error: "Nessuna modifica valida." },
      { status: 400 }
    );
  }

  try {
    await updateRomaAdminReport(
      reportId,
      { status, priority, institutionalNote },
      session.email
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "";
    return NextResponse.json(
      {
        error:
          message === "REPORT_OUTSIDE_TERRITORY"
            ? "La segnalazione non appartiene al Comune di Roma."
            : "Non è stato possibile aggiornare la segnalazione.",
      },
      { status: message === "REPORT_NOT_FOUND" ? 404 : 403 }
    );
  }
}
