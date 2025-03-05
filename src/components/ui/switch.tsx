import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils";

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input neo-switch-track",
  {
    variants: {
      variant: {
        default: "",
        slim: "h-4 w-8",
        pill: "h-7 w-14 rounded-full",
        square: "rounded-md",
        ios: "h-7 w-14 bg-gray-800 data-[state=checked]:bg-blue-600",
        dark: "h-7 w-14 bg-gray-800 data-[state=checked]:bg-blue-600",
      },
      size: {
        default: "",
        sm: "h-4 w-8",
        lg: "h-8 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const thumbVariants = cva(
  "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 neo-switch-thumb",
  {
    variants: {
      variant: {
        default: "",
        slim: "h-3 w-3 data-[state=checked]:translate-x-4",
        pill: "h-6 w-6 data-[state=checked]:translate-x-7",
        square: "rounded-sm",
        ios: "h-6 w-6 data-[state=checked]:translate-x-7",
        dark: "h-6 w-6 data-[state=checked]:translate-x-7 bg-gray-700",
      },
      size: {
        default: "",
        sm: "h-3 w-3 data-[state=checked]:translate-x-4",
        lg: "h-7 w-7 data-[state=checked]:translate-x-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof switchVariants> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  thumbClassName?: string
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, variant, size, checked, onCheckedChange, disabled, thumbClassName, ...props }, ref) => {
    // Handle controlled/uncontrolled input
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(event.target.checked)
    }

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only" // Visually hidden but accessible to screen readers
          {...props}
        />
        <label 
          className={cn(
            switchVariants({ variant, size, className }),
            "relative inline-block"
          )}
          data-state={checked ? "checked" : "unchecked"}
        >
          <span
            data-state={checked ? "checked" : "unchecked"}
            className={cn(thumbVariants({ variant, size }), thumbClassName)}
          />
        </label>
      </div>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
