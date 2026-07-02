import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CommetyLogo } from "./CommetyLogo";
import { Surface } from "./Surface";

interface CommetyHeaderProps {
  title: string;
  subtitle?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
}

export function CommetyHeader({
  title,
  subtitle,
  leftSlot,
  rightSlot,
  className,
}: CommetyHeaderProps) {
  return (
    <header
      data-slot="commety-header"
      className={cn("sticky top-4 z-40 w-full", className)}
    >
      <Surface as="section" className="mx-auto p-6">
        <div className="flex items-center justify-between">
          <div className="flex w-10 justify-start">
            {leftSlot}
          </div>

          <CommetyLogo priority />

          <div className="flex w-10 justify-end">
            {rightSlot}
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      </Surface>
    </header>
  );
}