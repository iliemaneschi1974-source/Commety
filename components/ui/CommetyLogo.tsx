import Image from "next/image";

import { cn } from "@/lib/utils";

interface CommetyLogoProps {
  className?: string;
  priority?: boolean;
}

export function CommetyLogo({
  className,
  priority = false,
}: CommetyLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Commety"
      width={180}
      height={48}
      priority={priority}
      className={cn(
        "h-12 w-auto shrink-0 select-none object-contain",
        className
      )}
    />
  );
}