import { CommetyHeader } from "@/components/ui/CommetyHeader";
import { CommetyLogo } from "@/components/ui/CommetyLogo";
import { Surface } from "@/components/ui/Surface";

export default function DesignSystemPage() {
  return (
    <main className="min-h-dvh bg-slate-100 p-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Commety Logo
          </h2>

          <Surface className="flex justify-center p-8">
            <CommetyLogo priority className="h-16 w-16" />
          </Surface>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Commety Header
          </h2>

          <CommetyHeader
            title="Design System"
            subtitle="Laboratorio dei componenti condivisi"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Surface
          </h2>

          <Surface className="p-8">
            <p className="text-slate-700">
              Questa è la Surface ufficiale di Commety.
            </p>
          </Surface>
        </section>
      </div>
    </main>
  );
}