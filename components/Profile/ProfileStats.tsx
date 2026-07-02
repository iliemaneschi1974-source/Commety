import {
  Camera,
  CheckCircle2,
  MapPinned,
  MessageCircle,
} from "lucide-react";

import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/Surface";
import { CommetyColors } from "@/lib/themes/colors";
import { ProfileStatsData } from "@/types/profile";

interface ProfileStatsProps {
  stats: ProfileStatsData;
}

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

function StatItem({
  icon,
  value,
  label,
}: StatItemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-6">
      {icon}

      <span className="text-2xl font-bold tracking-tight">
        {value.toLocaleString("it-IT")}
      </span>

      <span className="text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function ProfileStats({
  stats,
}: ProfileStatsProps) {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Statistiche"
        description="La tua attività su Commety"
      />

      <Surface className="p-0">
        <div
          data-slot="profile-stats"
          className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-3xl"
        >
          <StatItem
            icon={
              <MapPinned
                className="size-5"
                color={CommetyColors.primary}
              />
            }
            value={stats.reports}
            label="Segnalazioni"
          />

          <StatItem
            icon={
              <CheckCircle2
                className="size-5"
                color={CommetyColors.success}
              />
            }
            value={stats.confirmations}
            label="Conferme"
          />

          <StatItem
            icon={
              <MessageCircle
                className="size-5"
                color={CommetyColors.warning}
              />
            }
            value={stats.comments}
            label="Commenti"
          />

          <StatItem
            icon={
              <Camera
                className="size-5"
                color={CommetyColors.event}
              />
            }
            value={stats.photos}
            label="Foto"
          />
        </div>
      </Surface>
    </section>
  );
}