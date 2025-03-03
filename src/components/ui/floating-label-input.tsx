import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "/src/lib/utils";

const floatingLabelInputVariants = cva(
  "relative border rounded-md focus-within:border-primary transition-colors",
  {
    variants: {
      variant: {
        default: "border-input bg-background neo-input",
        filled: "border-transparent bg-secondary/50 neo-input",
        ghost: "border-transparent bg-transparent shadow-none",
        underlined: "border-0 border-b-2 rounded-none",
        dark: "bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 neo-input",
      },
      size: {
        default: "h-14",
        sm: "h-12",
        lg: "h-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface FloatingLabelInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof floatingLabelInputVariants> {
  label: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
  labelClassName?: string
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ 
    className, 
    variant, 
    size, 
    label, 
    leftIcon, 
    rightIcon, 
    containerClassName, 
    labelClassName,
    id,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(!!props.value || !!props.defaultValue)
    const inputId = id || React.useId()

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value)
      props.onChange?.(e)
    }

    return (
      <div
        className={cn(
          floatingLabelInputVariants({ variant, size }),
          containerClassName
        )}
      >
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-3 transition-all duration-200 pointer-events-none text-muted-foreground",
            (isFocused || hasValue) ? "text-xs top-2" : "text-base top-1/2 -translate-y-1/2",
            isFocused && "text-primary",
            leftIcon && "left-9",
            labelClassName
          )}
        >
          {label}
        </label>
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full h-full bg-transparent px-3 pt-6 pb-2 text-foreground focus:outline-none",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    )
  }
)
FloatingLabelInput.displayName = "FloatingLabelInput"

export { FloatingLabelInput }
