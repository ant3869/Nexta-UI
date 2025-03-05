import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from "../../lib/utils";

// Badge variants
const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-medium ring-1 ring-inset transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-50 text-primary-700 ring-primary-600/20 dark:bg-primary-900/30 dark:text-primary-400 dark:ring-primary-500/20",
        secondary: "bg-dark-100 text-dark-700 ring-dark-600/20 dark:bg-dark-700 dark:text-dark-300 dark:ring-dark-500/20",
        outline: "bg-transparent text-dark-700 ring-dark-300 dark:text-dark-300 dark:ring-dark-600",
        success: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/20",
        warning: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/20",
        error: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/20",
        info: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-500/20",
      },
      size: {
        xs: "h-4 min-w-4 px-1 text-[10px]",
        sm: "h-5 min-w-5 px-1.5 text-xs",
        md: "h-6 min-w-6 px-2 text-xs",
        lg: "h-7 min-w-7 px-2.5 text-sm",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-md",
      },
      dot: {
        true: "flex gap-1",
      },
      removable: {
        true: "pr-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      pill: true,
      dot: false,
      removable: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Whether badge is currently active
   */
  active?: boolean;
  
  /**
   * Whether badge is visually muted
   */
  muted?: boolean;

  /**
   * Optional count to display inside the badge
   */
  count?: number;

  /**
   * Maximum count to display before showing "+"
   * @default 99
   */
  maxCount?: number;

  /**
   * Custom color for the badge
   */
  color?: string;

  /**
   * Whether to show a pulsing animation
   */
  pulse?: boolean;

  /**
   * Custom handler for remove button click
   */
  onRemove?: (e: React.MouseEvent) => void;
}

export function Badge({
  className,
  variant,
  size,
  pill,
  dot,
  removable,
  active,
  muted,
  count,
  maxCount = 99,
  color,
  pulse,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  // Handle counting display
  const displayCount = count !== undefined 
    ? count > maxCount ? `${maxCount}+` : count.toString()
    : null;

  // Custom styles for color
  const customStyle: React.CSSProperties & { "--tw-ring-color"?: string } = {};
  if (color) {
    // Create a style that adapts well to both light and dark themes
    customStyle.backgroundColor = `${color}20`; // 20% opacity
    customStyle.color = color;
    customStyle["--tw-ring-color"] = `${color}30`; // 30% opacity
  }

  return (
    <div
      className={cn(
        badgeVariants({ variant, size, pill, dot, removable }),
        active && "bg-primary-100 dark:bg-primary-900/50",
        muted && "opacity-60",
        pulse && "animate-pulse",
        className
      )}
      style={customStyle}
      {...props}
    >
      {dot && (
        <span className={cn(
          "inline-block w-1.5 h-1.5 rounded-full",
          variant === "default" ? "bg-primary-500" :
          variant === "secondary" ? "bg-dark-500" :
          variant === "outline" ? "bg-dark-500" :
          variant === "success" ? "bg-green-500" :
          variant === "warning" ? "bg-amber-500" :
          variant === "error" ? "bg-red-500" :
          variant === "info" ? "bg-blue-500" : ""
        )} style={color ? { backgroundColor: color } : {}} />
      )}
      
      {displayCount ?? children}
      
      {removable && (
        <button
          className="ml-1 -mr-0.5 h-3.5 w-3.5 rounded-full inline-flex items-center justify-center text-xs hover:bg-black/10 dark:hover:bg-white/10"
          onClick={onRemove}
          aria-label="Remove"
        >
          <svg 
            width="8" 
            height="8" 
            viewBox="0 0 8 8" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M1 1L7 7M7 1L1 7" 
              stroke="currentColor" 
              strokeWidth="1.25" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}