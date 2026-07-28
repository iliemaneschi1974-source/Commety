import Image from "next/image";
import { redirect } from "next/navigation";
import {
  BarChart3,
  Building2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import AdminLoginForm from "@/components/Admin/AdminLoginForm";
import { getAdminSession } from "@/lib/admin/session";

export default async function AdminLoginPage() {
  if (await getAdminSession()) {
    redirect("/admin-comune/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#061936] px-5 py-8 text-white sm:px-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:p-0">
      <section className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1d5ca6_0%,#0d3268_34%,#061936_74%)] p-14 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 top-28 size-80 rounded-full bg-cyan-300/10 blur-3xl" />
        <Image
          src="/logo-header-cropped.png"
          alt="Commety"
          width={240}
          height={70}
          className="relative h-auto w-56 object-contain"
          priority
        />
        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
            <Building2 className="size-4" />
            Commety per i Comuni
          </span>
          <h1 className="mt-7 text-5xl font-black leading-[1.05] tracking-tight">
            Il territorio diventa
            <span className="block text-cyan-300">
              un flusso operativo.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-blue-100/75">
            Segnalazioni, presa in carico, aggiornamenti
            istituzionali e statistiche in un unico pannello.
          </p>
        </div>
        <div className="relative grid grid-cols-3 gap-3">
          {([
            [BarChart3, "Statistiche"],
            [ShieldCheck, "Tracciabilità"],
            [LockKeyhole, "Accesso protetto"],
          ] as const).map(([Icon, label]) => (
            <div
              key={String(label)}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <Icon className="size-5 text-cyan-300" />
              <p className="mt-3 text-sm font-bold">{String(label)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center rounded-[2rem] bg-[#f3f7fc] p-5 text-slate-900 shadow-2xl lg:min-h-screen lg:rounded-none lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <Image
              src="/logo-header-cropped.png"
              alt="Commety"
              width={190}
              height={54}
              className="mx-auto h-auto w-44 rounded-xl bg-[#0b2857] px-4 py-2 lg:hidden"
            />
            <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-[#2073c9]">
              Dashboard dimostrativa
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#092653]">
              Accesso Admin Comune
            </h2>
            <p className="mt-3 leading-7 text-slate-500">
              Ambiente Roma con dati simulati. Nessuna
              collaborazione istituzionale è attualmente in essere.
            </p>
          </div>
          <AdminLoginForm />
          <p className="mt-6 text-center text-xs leading-5 text-slate-400">
            Accesso riservato. Tutte le operazioni amministrative
            vengono tracciate.
          </p>
        </div>
      </section>
    </main>
  );
}
