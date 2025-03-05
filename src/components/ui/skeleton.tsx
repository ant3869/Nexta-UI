import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils";

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "",
        shimmer: "shimmer",
        gradient: "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:400%_100%] animate-[gradient_2s_ease-in-out_infinite]",
        wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[wave_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({
  className,
  variant,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Skeleton }
