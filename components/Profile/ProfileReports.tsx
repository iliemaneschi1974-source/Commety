import {
  Calendar,
  ChevronRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/Surface";
import { CategoryThemes } from "@/lib/themes/categories";
import { Report } from "@/types/report";

interface ProfileReportsProps {
  reports: Report[];
}

export function ProfileReports({
  reports,
}: ProfileReportsProps) {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Ultime segnalazioni"
      />

      <Surface className="p-6">
        {reports.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Nessuna segnalazione pubblicata.
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            {reports.map((report, index) => {
              const category = CategoryThemes[report.type];
              const Icon = category.icon;

              return (
                <Link
                  key={report.id}
                  href={`/mappa?report=${encodeURIComponent(report.id)}`}
                  className={`flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-muted/40 ${
                    index !== reports.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="size-5"
                        style={{
                          color: category.color,
                        }}
                      />

                      <p className="font-medium">
                        {report.title}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {report.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {report.city}
                        </span>
                      )}

                      {report.createdAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="size-4" />
                          {report.createdAt
                            .toDate()
                            .toLocaleDateString("it-IT")}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="size-5 text-muted-foreground" />
                </Link>
              );
            })}
          </div>
        )}
      </Surface>
    </section>
  );
}
