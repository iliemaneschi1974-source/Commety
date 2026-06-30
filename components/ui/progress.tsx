import * as React from "react"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value = 0,
  ...props
}: React.ComponentProps<"div"> & {
  value?: number
}) {
  const progress = Math.min(100, Math.max(0, value))

  return (
    <div
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className="h-full origin-left rounded-full bg-primary transition-transform duration-300 ease-out"
        style={{
          transform: `scaleX(${progress / 100})`,
        }}
      />
    </div>
  )
}

export { Progress }