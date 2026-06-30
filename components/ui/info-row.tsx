import * as React from "react"

import { cn } from "@/lib/utils"

function InfoRow({
  className,
  icon,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  icon: React.ReactNode
}) {
  return (
    <div
      data-slot="info-row"
      className={cn(
        "flex items-center justify-center gap-2 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      <span
        data-slot="info-row-icon"
        className="flex shrink-0 items-center justify-center"
      >
        {icon}
      </span>

      <span data-slot="info-row-content">
        {children}
      </span>
    </div>
  )
}

export { InfoRow }