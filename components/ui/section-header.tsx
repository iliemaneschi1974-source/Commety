import { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  actionLabel?: string
  actionIcon?: ReactNode
  onAction?: () => void
  className?: string
}

export function SectionHeader({
  title,
  description,
  actionLabel,
  actionIcon,
  onAction,
  className,
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex items-start justify-between gap-4",
        className
      )}
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {actionLabel && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onAction}
          className="shrink-0"
        >
          {actionLabel}

          {actionIcon}
        </Button>
      )}
    </div>
  )
}