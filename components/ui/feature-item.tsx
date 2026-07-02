import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FeatureItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureItem({
  icon,
  title,
  description,
  className,
}: FeatureItemProps) {
  return (
    <div
      data-slot="feature-item"
      className={cn(
        "flex flex-col items-center text-center",
        "gap-6",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center">
        {icon}
      </div>

      <div className="space-y-3">
        <h3 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h3>

        <p className="text-base leading-8 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}