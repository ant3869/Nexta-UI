import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "/src/lib/utils";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "",
        circle: "rounded-full",
        square: "rounded-none",
        outline: "border-2",
        filled: "bg-secondary/50 border-0 data-[state=checked]:bg-primary",
        minimal: "border-0 bg-secondary/30 data-[state=checked]:bg-primary",
      },
      size: {
        default: "h-4 w-4",
        sm: "h-3 w-3",
        lg: "h-5 w-5",
        xl: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CheckboxProps 
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string
  description?: string
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, label, description, ...props }, ref) => (
  <div className="flex items-start space-x-2">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ variant, size, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center")}
      >
        <Check className="h-3.5 w-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {(label || description) && (
      <div className="grid gap-1.5 leading-none">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    )}
  </div>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
