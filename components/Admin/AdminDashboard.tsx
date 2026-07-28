"use client";

import Image from "next/image";
import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  Download,
  Eye,
  FileText,
  Gauge,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Search,
  ShieldCheck,
  TimerReset,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ADMIN_PRIORITY_LABELS,
  ADMIN_STATUS_LABELS,
  AdminPriority,
  AdminReport,
  AdminReportStatus,
} from "@/lib/admin/dashboard-types";

interface AdminDashboardProps {
  initialReports: AdminReport[];
  adminEmail: string;
}

const statusStyles: Record<AdminReportStatus, string> = {
  NEW: "bg-blue-50 text-blue-700 ring-blue-600/15",
  TAKEN: "bg-amber-50 text-amber-700 ring-amber-600/15",
  IN_PROGRESS: "bg-violet-50 text-violet-700 ring-violet-600/15",
  RESOLVED: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  OUT_OF_SCOPE: "bg-slate-100 text-slate-600 ring-slate-500/15",
  DUPLICATE: "bg-orange-50 text-orange-700 ring-orange-600/15",
  HIDDEN: "bg-red-50 text-red-700 ring-red-600/15",
};

const priorityStyles: Record<AdminPriority, string> = {
  LOW: "text-slate-500",
  MEDIUM: "text-blue-600",
  HIGH: "text-orange-600",
  URGENT: "text-red-600",
};

const categoryColors: Record<string, string> = {
  Traffico: "#26b3e0",
  Pericolo: "#ef4444",
  Trasporti: "#65a30d",
  Accessibilità: "#64748b",
  Rete: "#d62976",
  Animali: "#8b5cf6",
  Meteo: "#2563eb",
  Evento: "#f59e0b",
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function escapeCsvCell(value: unknown): string {
  let text = String(value ?? "");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function StatusBadge({ status }: { status: AdminReportStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-black ring-1 ring-inset ${statusStyles[status]}`}
    >
      {ADMIN_STATUS_LABELS[status]}
    </span>
  );
}

export default function AdminDashboard({
  initialReports,
  adminEmail,
}: AdminDashboardProps) {
  const router = useRouter();
  const currentDate = new Intl.DateTimeFormat("it-IT", {
    dateStyle: "full",
    timeZone: "Europe/Rome",
  }).format(new Date());
  const [reports, setReports] = useState(initialReports);
  const [selected, setSelected] = useState<AdminReport | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AdminReportStatus | "ALL">("ALL");
  const [category, setCategory] = useState("ALL");
  const [district, setDistrict] = useState("ALL");
  const [menuOpen, setMenuOpen] = useState(false);
  const [note, setNote] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [reportMonth, setReportMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    async function refreshReports() {
      try {
        const response = await fetch("/api/admin/reports", {
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = (await response.json()) as {
          reports?: AdminReport[];
        };
        if (Array.isArray(data.reports)) {
          setReports(data.reports);
          setSelected((current) =>
            current
              ? data.reports?.find(
                  (report) => report.id === current.id
                ) ?? current
              : null
          );
        }
      } catch {
        // Il polling riproverà automaticamente al ciclo successivo.
      }
    }

    void fetch("/admin-comune/session", {
      method: "POST",
    }).then((response) => {
      if (response.ok) void refreshReports();
    });

    const interval = window.setInterval(
      () => void refreshReports(),
      15_000
    );
    return () => window.clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return reports.filter((report) => {
      const matchesQuery =
        !needle ||
        report.title.toLowerCase().includes(needle) ||
        report.address.toLowerCase().includes(needle) ||
        report.id.toLowerCase().includes(needle);
      return (
        matchesQuery &&
        (status === "ALL" || report.status === status) &&
        (category === "ALL" || report.category === category) &&
        (district === "ALL" || report.district === district)
      );
    });
  }, [category, district, query, reports, status]);

  const counts = useMemo(
    () => ({
      new: reports.filter((report) => report.status === "NEW").length,
      taken: reports.filter((report) => report.status === "TAKEN").length,
      progress: reports.filter(
        (report) => report.status === "IN_PROGRESS"
      ).length,
      resolved: reports.filter(
        (report) => report.status === "RESOLVED"
      ).length,
    }),
    [reports]
  );

  const categoryStats = useMemo(() => {
    const totals = new Map<string, number>();
    reports.forEach((report) =>
      totals.set(report.category, (totals.get(report.category) ?? 0) + 1)
    );
    return [...totals.entries()].sort((a, b) => b[1] - a[1]);
  }, [reports]);

  const chartData = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, index) => {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - 11 + index,
        1
      );
      const value = reports.filter((report) => {
        const createdAt = new Date(report.createdAt);
        return (
          createdAt.getFullYear() === date.getFullYear() &&
          createdAt.getMonth() === date.getMonth()
        );
      }).length;
      return {
        label: new Intl.DateTimeFormat("it-IT", {
          month: "short",
        })
          .format(date)
          .replace(".", ""),
        value,
      };
    });
  }, [reports]);

  const maximumChartValue = Math.max(
    1,
    ...chartData.map((entry) => entry.value)
  );
  const resolutionRate =
    reports.length > 0
      ? Math.round((counts.resolved / reports.length) * 100)
      : 0;
  const confirmedRate =
    reports.length > 0
      ? Math.round(
          (reports.filter((report) => report.confirmations > 0)
            .length /
            reports.length) *
            100
        )
      : 0;

  const monthlyReports = useMemo(
    () =>
      reports.filter((report) => {
        const createdAt = new Date(report.createdAt);
        const key = `${createdAt.getFullYear()}-${String(
          createdAt.getMonth() + 1
        ).padStart(2, "0")}`;
        return key === reportMonth;
      }),
    [reportMonth, reports]
  );

  const monthlyLabel = useMemo(() => {
    const [year, month] = reportMonth.split("-").map(Number);
    return new Intl.DateTimeFormat("it-IT", {
      month: "long",
      year: "numeric",
    }).format(new Date(year, month - 1, 1));
  }, [reportMonth]);

  const monthlyResolved = monthlyReports.filter(
    (report) => report.status === "RESOLVED"
  ).length;
  const monthlyUrgent = monthlyReports.filter(
    (report) => report.priority === "URGENT"
  ).length;
  const monthlyConfirmations = monthlyReports.reduce(
    (total, report) => total + report.confirmations,
    0
  );

  async function updateSelected(
    changes: Partial<Pick<AdminReport, "status" | "priority" | "institutionalNote">>
  ) {
    if (!selected) return;
    const previous = selected;
    const updated = { ...selected, ...changes };
    setReports((current) =>
      current.map((report) =>
        report.id === selected.id ? updated : report
      )
    );
    setSelected(updated);
    setSaving(true);
    setActionMessage("");
    try {
      const response = await fetch("/api/admin/reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId: selected.id,
          ...changes,
        }),
      });
      const result = (await response.json()) as {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(
          result.error ?? "Aggiornamento non riuscito."
        );
      }
      if (changes.institutionalNote !== undefined) {
        setNote("");
      }
      setActionMessage("Aggiornamento salvato.");
    } catch (error) {
      setReports((current) =>
        current.map((report) =>
          report.id === previous.id ? previous : report
        )
      );
      setSelected(previous);
      setActionMessage(
        error instanceof Error
          ? error.message
          : "Aggiornamento non riuscito."
      );
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin-comune/login");
    router.refresh();
  }

  function navigateTo(section: string) {
    setActiveSection(section);
    setMenuOpen(false);
    if (section === "dashboard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document
      .getElementById(section)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function exportCsv(
    items: AdminReport[],
    filename: string
  ) {
    const headers = [
      "ID",
      "Data e ora",
      "Titolo",
      "Categoria",
      "Stato",
      "Priorità",
      "Luogo",
      "Municipio",
      "Autore",
      "Conferme",
      "Segnalazione valida",
      "Segnalazione scaduta",
      "Nota istituzionale",
    ];
    const rows = items.map((report) => [
      report.id,
      new Date(report.createdAt).toLocaleString("it-IT"),
      report.title,
      report.category,
      ADMIN_STATUS_LABELS[report.status],
      ADMIN_PRIORITY_LABELS[report.priority],
      report.address,
      report.district,
      report.author.displayName,
      report.confirmations,
      report.activeVotes,
      report.expiredVotes,
      report.institutionalNote ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsvCell).join(";"))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([`\uFEFF${csv}`], {
        type: "text/csv;charset=utf-8",
      })
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function printMonthlyReport() {
    const popup = window.open(
      "",
      "_blank",
      "width=1200,height=850"
    );
    if (!popup) {
      setActionMessage(
        "Il browser ha bloccato la finestra del report. Consenti i popup e riprova."
      );
      return;
    }
    popup.opener = null;

    const tableRows = monthlyReports
      .map(
        (report) => `
          <tr>
            <td>${escapeHtml(report.id)}</td>
            <td>${escapeHtml(formatDate(report.createdAt))}</td>
            <td><strong>${escapeHtml(report.title)}</strong><br><small>${escapeHtml(report.address)}</small></td>
            <td>${escapeHtml(report.category)}</td>
            <td>${escapeHtml(ADMIN_PRIORITY_LABELS[report.priority])}</td>
            <td>${escapeHtml(ADMIN_STATUS_LABELS[report.status])}</td>
          </tr>`
      )
      .join("");

    popup.document.write(`<!doctype html>
      <html lang="it">
        <head>
          <meta charset="utf-8">
          <title>Report Commety Roma - ${escapeHtml(monthlyLabel)}</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 15mm 14mm 16mm;
            }
            * { box-sizing: border-box; }
            html {
              background: #ffffff;
              color-scheme: light;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            body {
              width: 100%;
              margin: 0;
              background: #ffffff;
              color: #17365f;
              font-family: Arial, Helvetica, sans-serif;
            }
            .report-page {
              width: 100%;
              max-width: 269mm;
              margin: 0 auto;
            }
            header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 4px solid #1f79bd; padding-bottom: 12px; }
            h1 { margin: 0; color: #092653; font-size: 24px; line-height: 1.15; }
            header p { margin: 5px 0 0; color: #60738c; }
            .brand { color: #1f79bd; font-size: 24px; font-weight: 800; }
            .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 16px 0; break-inside: avoid; page-break-inside: avoid; }
            .metric { border: 1px solid #dbe5ef; border-radius: 10px; padding: 11px 12px; background: #f5f9fd; }
            .metric strong { display: block; color: #092653; font-size: 22px; }
            .metric span { color: #64748b; font-size: 11px; text-transform: uppercase; }
            table { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 9.5px; }
            thead { display: table-header-group; }
            tr { break-inside: avoid; page-break-inside: avoid; }
            th { background: #0d376f; color: white; padding: 8px 7px; text-align: left; }
            td { overflow-wrap: anywhere; border-bottom: 1px solid #dbe5ef; padding: 7px; vertical-align: top; }
            th:nth-child(1), td:nth-child(1) { width: 17%; }
            th:nth-child(2), td:nth-child(2) { width: 12%; }
            th:nth-child(3), td:nth-child(3) { width: 31%; }
            th:nth-child(4), td:nth-child(4) { width: 15%; }
            th:nth-child(5), td:nth-child(5) { width: 13%; }
            th:nth-child(6), td:nth-child(6) { width: 12%; }
            small { color: #64748b; }
            .empty { padding: 40px; text-align: center; color: #64748b; border: 1px solid #dbe5ef; }
            footer { margin-top: 12px; padding-top: 8px; border-top: 1px solid #dbe5ef; color: #718096; font-size: 9px; text-align: right; break-inside: avoid; page-break-inside: avoid; }
            @media screen {
              body { padding: 15mm 14mm 16mm; }
              .report-page { min-height: 179mm; }
            }
            @media print {
              html, body { width: 100%; min-height: 0; }
              body { padding: 0; }
              .report-page { max-width: none; margin: 0; }
            }
          </style>
        </head>
        <body>
          <main class="report-page">
          <header>
            <div>
              <h1>Report mensile delle segnalazioni</h1>
              <p>Comune pilota di Roma · ${escapeHtml(monthlyLabel)}</p>
            </div>
            <div class="brand">commety</div>
          </header>
          <section class="metrics">
            <div class="metric"><strong>${monthlyReports.length}</strong><span>Segnalazioni</span></div>
            <div class="metric"><strong>${monthlyResolved}</strong><span>Risolte</span></div>
            <div class="metric"><strong>${monthlyUrgent}</strong><span>Urgenti</span></div>
            <div class="metric"><strong>${monthlyConfirmations}</strong><span>Conferme community</span></div>
          </section>
          ${
            monthlyReports.length
              ? `<table>
                  <thead><tr><th>ID</th><th>Data</th><th>Segnalazione</th><th>Categoria</th><th>Priorità</th><th>Stato</th></tr></thead>
                  <tbody>${tableRows}</tbody>
                </table>`
              : `<div class="empty">Nessuna segnalazione registrata nel periodo selezionato.</div>`
          }
          <footer>Documento generato dal pannello Commety · ${escapeHtml(currentDate)}</footer>
          </main>
          <script>window.addEventListener("load", () => { window.print(); });<\/script>
        </body>
      </html>`);
    popup.document.close();
  }

  const nav = [
    [LayoutDashboard, "Dashboard", "dashboard"],
    [Inbox, "Segnalazioni", "segnalazioni"],
    [BarChart3, "Statistiche", "statistiche"],
    [FileText, "Report mensile", "report-mensile"],
  ] as const;

  return (
    <main className="min-h-screen bg-[#f3f6fb] text-slate-800">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-[#071d41] px-5 py-6 text-white shadow-2xl transition lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Image
            src="/logo-header-cropped.png"
            alt="Commety"
            width={180}
            height={50}
            className="h-auto w-40"
            priority
          />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="rounded-xl p-2 text-white/70 lg:hidden"
            aria-label="Chiudi menu"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-8 rounded-2xl border border-cyan-300/15 bg-white/5 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">
            Ambiente operativo
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-cyan-300/15">
              <Building2 className="size-5 text-cyan-300" />
            </span>
            <div>
              <p className="font-black">Roma</p>
              <p className="text-xs text-blue-100/60">Admin Comune</p>
            </div>
          </div>
        </div>
        <nav className="mt-8 space-y-2">
          {nav.map(([Icon, label, section]) => (
            <button
              key={label}
              type="button"
              onClick={() => navigateTo(section)}
              aria-current={
                activeSection === section ? "page" : undefined
              }
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                activeSection === section
                  ? "bg-[#1d65ad] text-white shadow-lg"
                  : "text-blue-100/65 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-5" />
              {label}
            </button>
          ))}
        </nav>
        <div className="absolute inset-x-5 bottom-6">
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-emerald-400 font-black text-[#062b20]">
                A
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{adminEmail}</p>
                <p className="text-xs text-blue-100/55">Sessione protetta</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void logout()}
              disabled={loggingOut}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2 text-xs font-black text-blue-100/75 hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              <LogOut className="size-4" />
              {loggingOut ? "Uscita..." : "Esci"}
            </button>
          </div>
        </div>
      </aside>

      {menuOpen ? (
        <button
          type="button"
          aria-label="Chiudi menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-7">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-xl border border-slate-200 p-2.5 text-[#0d376f] lg:hidden"
            aria-label="Apri menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-black text-[#092653] sm:text-xl">
              Pannello amministrativo
            </h1>
            <p className="hidden text-xs text-slate-400 sm:block">
              Roma · {currentDate}
            </p>
          </div>
          <span className="hidden rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-700 ring-1 ring-amber-200 sm:inline-flex">
            Dati reali
          </span>
          <button
            type="button"
            className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500"
            aria-label="Notifiche"
          >
            <Bell className="size-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
          </button>
        </header>

        <div className="mx-auto max-w-[1600px] space-y-7 p-4 pb-16 sm:p-7">
          <section className="overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#0b2a59,#14569b_65%,#2188c9)] p-6 text-white shadow-[0_18px_50px_rgba(11,59,112,0.22)] sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                  Commety per i Comuni
                </p>
                <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                  Buongiorno, Admin Roma
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100/75">
                  Hai {counts.new} nuove segnalazioni da verificare.
                  Le statistiche si aggiornano quando cambi lo stato
                  di una pratica.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStatus("NEW");
                  document
                    .getElementById("segnalazioni")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#10457f] shadow-xl"
              >
                <Inbox className="size-5" />
                Verifica le nuove
              </button>
            </div>
          </section>

          <section
            id="statistiche"
            className="scroll-mt-24 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {([
              [Inbox, "Nuove", counts.new, "Da verificare", "#2476c8"],
              [ShieldCheck, "Prese in carico", counts.taken, "Gestione avviata", "#d58b16"],
              [Activity, "In lavorazione", counts.progress, "Intervento attivo", "#7c55c7"],
              [CheckCircle2, "Risolte", counts.resolved, "Questo periodo", "#1b9b6a"],
            ] as const).map(([Icon, label, value, detail, color]) => (
              <article
                key={String(label)}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="flex size-11 items-center justify-center rounded-2xl text-white"
                    style={{ backgroundColor: String(color) }}
                  >
                    <Icon className="size-5" />
                  </span>
                  <TrendingUp className="size-4 text-emerald-500" />
                </div>
                <p className="mt-5 text-3xl font-black text-[#092653]">
                  {String(value)}
                </p>
                <p className="mt-1 font-extrabold text-slate-700">
                  {String(label)}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {String(detail)}
                </p>
              </article>
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.45fr_0.8fr]">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-black text-[#092653]">
                    Andamento delle segnalazioni
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Ultimi 12 mesi · dati reali del territorio
                  </p>
                </div>
                <span className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                  +12,4%
                </span>
              </div>
              <div className="mt-8 flex h-52 items-end gap-2 sm:gap-3">
                {chartData.map((entry, index) => (
                  <div
                    key={`${entry.label}-${index}`}
                    className="group flex h-full flex-1 items-end"
                  >
                    <div
                      className="relative w-full rounded-t-lg bg-[linear-gradient(180deg,#2aa8db,#1c63aa)] transition group-hover:brightness-110"
                      style={{
                        height: `${Math.max(
                          entry.value > 0 ? 8 : 2,
                          (entry.value / maximumChartValue) * 100
                        )}%`,
                      }}
                    >
                      <span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 text-[9px] font-bold text-slate-500 sm:block">
                        {entry.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-6 text-center text-[9px] font-bold text-slate-400 sm:grid-cols-12">
                {chartData.map((entry) => (
                  <span key={entry.label}>{entry.label}</span>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-black text-[#092653]">
                Indicatori di servizio
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Indicatori calcolati sulle segnalazioni reali
              </p>
              <div className="mt-6 space-y-5">
                {([
                  [Gauge, "Tasso di risoluzione", `${resolutionRate}%`, "text-emerald-600"],
                  [Clock3, "Prese in carico", String(counts.taken), "text-blue-600"],
                  [TimerReset, "In lavorazione", String(counts.progress), "text-violet-600"],
                  [CircleDot, "Segnalazioni confermate", `${confirmedRate}%`, "text-orange-600"],
                ] as const).map(([Icon, label, value, color]) => (
                  <div
                    key={String(label)}
                    className="flex items-center gap-3"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-slate-50">
                      <Icon className={`size-5 ${String(color)}`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400">
                        {String(label)}
                      </p>
                      <p className="font-black text-[#14345f]">
                        {String(value)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-black text-[#092653]">
                Categorie più segnalate
              </h3>
              <div className="mt-6 space-y-4">
                {categoryStats.map(([name, value]) => (
                  <div key={name}>
                    <div className="flex justify-between text-xs font-bold">
                      <span>{name}</span>
                      <span className="text-slate-400">{value}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(16, (value / Math.max(...categoryStats.map((entry) => entry[1]))) * 100)}%`,
                          backgroundColor: categoryColors[name],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-black text-[#092653]">
                    Criticità da monitorare
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Priorità e conferme della community
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-black text-[#1c5e9e]">
                  Vedi tutte <ChevronRight className="size-4" />
                </button>
              </div>
              <div className="mt-5 space-y-3">
                {reports
                  .filter(
                    (report) =>
                      report.priority === "URGENT" ||
                      report.confirmations >= 25
                  )
                  .slice(0, 4)
                  .map((report) => (
                    <button
                      key={report.id}
                      type="button"
                      onClick={() => {
                        setSelected(report);
                        setNote("");
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 p-3 text-left hover:border-blue-200 hover:bg-blue-50/30"
                    >
                      <span
                        className="size-3 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            categoryColors[report.category],
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold text-[#14345f]">
                          {report.title}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-400">
                          {report.district} · {report.confirmations} conferme
                        </p>
                      </div>
                      <StatusBadge status={report.status} />
                    </button>
                  ))}
              </div>
            </article>
          </section>

          <section
            id="report-mensile"
            className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex flex-col gap-5 border-b border-slate-200 bg-[linear-gradient(120deg,#092653,#145b9d)] p-6 text-white sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                  Rendicontazione
                </p>
                <h3 className="mt-2 text-xl font-black">
                  Report mensile
                </h3>
                <p className="mt-1 text-sm text-blue-100/70">
                  Riepilogo operativo delle segnalazioni di Roma.
                </p>
              </div>
              <label className="text-xs font-black text-blue-100">
                Mese di riferimento
                <input
                  type="month"
                  value={reportMonth}
                  onChange={(event) => {
                    if (event.target.value) {
                      setReportMonth(event.target.value);
                    }
                  }}
                  className="mt-2 block h-11 rounded-xl border border-white/15 bg-white px-4 font-bold text-[#14345f] outline-none"
                />
              </label>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h4 className="font-black capitalize text-[#092653]">
                    {monthlyLabel}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    Dati aggiornati automaticamente dalla dashboard.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      exportCsv(
                        monthlyReports,
                        `commety-roma-${reportMonth}.csv`
                      )
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-black text-[#14345f] hover:bg-slate-50"
                  >
                    <Download className="size-4" />
                    Scarica CSV
                  </button>
                  <button
                    type="button"
                    onClick={printMonthlyReport}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1d65ad] px-4 text-xs font-black text-white shadow-lg shadow-blue-900/15 hover:bg-[#15558f]"
                  >
                    <FileText className="size-4" />
                    Esporta PDF
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Segnalazioni ricevute", monthlyReports.length],
                  ["Segnalazioni risolte", monthlyResolved],
                  ["Priorità urgente", monthlyUrgent],
                  ["Conferme community", monthlyConfirmations],
                ].map(([label, value]) => (
                  <article
                    key={String(label)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-2xl font-black text-[#0d376f]">
                      {String(value)}
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      {String(label)}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                {monthlyReports.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {monthlyReports.slice(0, 5).map((report) => (
                      <button
                        key={report.id}
                        type="button"
                        onClick={() => {
                          setSelected(report);
                          setNote("");
                        }}
                        className="flex w-full items-center gap-3 p-4 text-left hover:bg-blue-50/30"
                      >
                        <span
                          className="size-3 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              categoryColors[report.category],
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-extrabold text-[#14345f]">
                            {report.title}
                          </p>
                          <p className="mt-1 truncate text-xs text-slate-400">
                            {formatDate(report.createdAt)} · {report.address}
                          </p>
                        </div>
                        <StatusBadge status={report.status} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-9 text-center">
                    <FileText className="mx-auto size-8 text-slate-300" />
                    <p className="mt-3 text-sm font-black text-[#14345f]">
                      Nessuna segnalazione nel mese selezionato
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section
            id="segnalazioni"
            className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                <div>
                  <h3 className="text-lg font-black text-[#092653]">
                    Segnalazioni del territorio
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    {filtered.length} risultati · Roma
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    exportCsv(
                      filtered,
                      `commety-roma-segnalazioni-${new Date()
                        .toISOString()
                        .slice(0, 10)}.csv`
                    )
                  }
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-black text-[#14345f]"
                >
                  <Download className="size-4" />
                  Esporta CSV
                </button>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.5fr_0.75fr_0.75fr_0.75fr]">
                <label className="relative">
                  <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Cerca ID, titolo o indirizzo"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-400 focus:bg-white"
                  />
                </label>
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as AdminReportStatus | "ALL"
                    )
                  }
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none"
                >
                  <option value="ALL">Tutti gli stati</option>
                  {Object.entries(ADMIN_STATUS_LABELS).map(
                    ([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    )
                  )}
                </select>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none"
                >
                  <option value="ALL">Tutte le categorie</option>
                  {[...new Set(reports.map((report) => report.category))].map(
                    (value) => (
                      <option key={value}>{value}</option>
                    )
                  )}
                </select>
                <select
                  value={district}
                  onChange={(event) => setDistrict(event.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none"
                >
                  <option value="ALL">Tutti i Municipi</option>
                  {[...new Set(reports.map((report) => report.district))]
                    .sort()
                    .map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Segnalazione</th>
                    <th className="px-4 py-4">Categoria</th>
                    <th className="px-4 py-4">Luogo</th>
                    <th className="px-4 py-4">Autore</th>
                    <th className="px-4 py-4">Priorità</th>
                    <th className="px-4 py-4">Stato</th>
                    <th className="px-4 py-4">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((report) => (
                    <tr
                      key={report.id}
                      className="border-t border-slate-100 text-sm hover:bg-blue-50/25"
                    >
                      <td className="max-w-xs px-6 py-4">
                        <p className="font-extrabold text-[#14345f]">
                          {report.title}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400">
                          {report.id} · {formatDate(report.createdAt)}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-2 font-bold">
                          <span
                            className="size-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                categoryColors[report.category],
                            }}
                          />
                          {report.category}
                        </span>
                      </td>
                      <td className="max-w-52 px-4 py-4">
                        <p className="truncate font-semibold">
                          {report.district}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-400">
                          {report.address}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold">
                          {report.author.displayName}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {report.author.kind}
                        </p>
                      </td>
                      <td
                        className={`px-4 py-4 text-xs font-black ${priorityStyles[report.priority]}`}
                      >
                        {ADMIN_PRIORITY_LABELS[report.priority]}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(report);
                            setNote("");
                          }}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#eaf3fc] px-3 py-2 text-xs font-black text-[#145b9d]"
                        >
                          <Eye className="size-4" />
                          Apri
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 lg:hidden">
              {filtered.map((report) => (
                <button
                  key={report.id}
                  type="button"
                  onClick={() => {
                    setSelected(report);
                    setNote("");
                  }}
                  className="block w-full p-5 text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-extrabold text-[#14345f]">
                        {report.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {report.id} · {report.district}
                      </p>
                    </div>
                    <StatusBadge status={report.status} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-bold">{report.category}</span>
                    <span className="text-slate-400">
                      {formatDate(report.createdAt)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {filtered.length === 0 ? (
              <div className="border-t border-slate-100 px-6 py-14 text-center">
                <Inbox className="mx-auto size-10 text-slate-300" />
                <p className="mt-4 font-black text-[#14345f]">
                  Nessuna segnalazione trovata
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Le nuove segnalazioni pubblicate nel territorio di
                  Roma compariranno automaticamente qui.
                </p>
              </div>
            ) : null}
          </section>

          <p className="text-center text-xs leading-5 text-slate-400">
            Ambiente operativo collegato alle segnalazioni di Roma Capitale
            non è affiliata né partner di Commety.
          </p>
        </div>
      </div>

      {selected ? (
        <div className="fixed inset-0 z-[70] flex justify-end bg-slate-950/55 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setSelected(null)}
            aria-label="Chiudi dettaglio"
          />
          <aside className="relative h-full w-full max-w-2xl overflow-y-auto bg-[#f7f9fc] shadow-2xl">
            <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-xl">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#2476c8]">
                  {selected.id}
                </p>
                <h2 className="mt-1 truncate text-lg font-black text-[#092653]">
                  Dettaglio segnalazione
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl border border-slate-200 p-2.5 text-slate-500"
                aria-label="Chiudi"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="space-y-5 p-5 sm:p-7">
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={selected.status} />
                  <span
                    className={`text-xs font-black ${priorityStyles[selected.priority]}`}
                  >
                    Priorità {ADMIN_PRIORITY_LABELS[selected.priority]}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black leading-tight text-[#092653]">
                  {selected.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {selected.description}
                </p>
                {selected.media ? (
                  <div className="relative mt-5 aspect-video overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={selected.media.url}
                      alt={selected.media.alt}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-lg bg-slate-950/70 px-3 py-1.5 text-xs font-bold text-white">
                      {selected.media.type === "video"
                        ? "Video"
                        : "Foto allegata"}
                    </span>
                  </div>
                ) : null}
              </section>

              <section className="grid gap-3 sm:grid-cols-2">
                {([
                  [Building2, "Luogo", selected.address],
                  [Clock3, "Pubblicata", formatDate(selected.createdAt)],
                  [
                    UserRound,
                    "Autore",
                    `${selected.author.displayName} · ${selected.author.kind}`,
                  ],
                  [
                    ShieldCheck,
                    "Community",
                    `${selected.confirmations} conferme · ${selected.activeVotes} ancora valida`,
                  ],
                ] as const).map(([Icon, label, value]) => (
                  <div
                    key={String(label)}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <Icon className="size-5 text-[#2476c8]" />
                    <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {String(label)}
                    </p>
                    <p className="mt-1 text-sm font-bold leading-5 text-[#14345f]">
                      {String(value)}
                    </p>
                  </div>
                ))}
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-black text-[#092653]">
                  Gestione amministrativa
                </h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-black text-slate-500">
                    Stato
                    <select
                      value={selected.status}
                      disabled={saving}
                      onChange={(event) =>
                        void updateSelected({
                          status: event.target
                            .value as AdminReportStatus,
                        })
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-[#14345f] outline-none"
                    >
                      {Object.entries(ADMIN_STATUS_LABELS).map(
                        ([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        )
                      )}
                    </select>
                  </label>
                  <label className="text-xs font-black text-slate-500">
                    Priorità
                    <select
                      value={selected.priority}
                      disabled={saving}
                      onChange={(event) =>
                        void updateSelected({
                          priority: event.target
                            .value as AdminPriority,
                        })
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-[#14345f] outline-none"
                    >
                      {Object.entries(ADMIN_PRIORITY_LABELS).map(
                        ([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        )
                      )}
                    </select>
                  </label>
                </div>

                <label className="mt-5 block text-xs font-black text-slate-500">
                  Aggiornamento istituzionale
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={4}
                    maxLength={500}
                    placeholder="Scrivi un aggiornamento visibile alla community..."
                    className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none focus:border-blue-400 focus:bg-white"
                  />
                </label>
                <div className="mt-3 flex justify-end text-xs text-slate-400">
                  {note.length}/500
                </div>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    void updateSelected({
                      institutionalNote: note.trim(),
                    })
                  }
                  className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#145b9d] text-sm font-black text-white"
                >
                  <MessageSquareText className="size-5" />
                  {saving
                    ? "Salvataggio..."
                    : "Pubblica aggiornamento"}
                </button>
                <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
                  Le modifiche vengono salvate nel flusso
                  amministrativo della segnalazione.
                </p>
                {actionMessage ? (
                  <p
                    className={`mt-3 text-center text-xs font-bold ${
                      actionMessage === "Aggiornamento salvato."
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {actionMessage}
                  </p>
                ) : null}
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-[#092653]">
                  Registro attività
                </h3>
                <div className="mt-4 space-y-4 border-l-2 border-blue-100 pl-5">
                  <div>
                    <p className="text-sm font-bold text-[#14345f]">
                      Segnalazione ricevuta
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(selected.createdAt)} · Community
                    </p>
                  </div>
                  {selected.institutionalNote ? (
                    <div>
                      <p className="text-sm font-bold text-[#14345f]">
                        Aggiornamento istituzionale
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {selected.institutionalNote}
                      </p>
                    </div>
                  ) : null}
                </div>
              </section>
            </div>
          </aside>
        </div>
      ) : null}
    </main>
  );
}
