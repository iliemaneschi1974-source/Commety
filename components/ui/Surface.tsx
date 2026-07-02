import * as React from "react"

import { cn } from "@/lib/utils"

interface SurfaceProps
  extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

export function Surface({
  as: Component = "div",
  className,
  children,
  ...props
}: SurfaceProps) {
  return (
    <Component
      data-slot="surface"
      className={cn(
        "rounded-3xl",
        "border border-white/40",
        "bg-white/90",
        "shadow-xl",
        "backdrop-blur-xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}