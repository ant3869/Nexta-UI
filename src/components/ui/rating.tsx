import * as React from "react"
import { cn } from "../lib/utils"

export interface StarRatingProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  max?: number
  size?: "sm" | "default" | "lg" | "xl"
  readonly?: boolean
  allowHalf?: boolean
  allowClear?: boolean
  emptyIcon?: React.ReactNode
  filledIcon?: React.ReactNode
  halfFilledIcon?: React.ReactNode
  color?: string
  emptyColor?: string
  showValue?: boolean
  precision?: number
  className?: string
}

const starSizes = {
  sm: "h-4 w-4",
  default: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8"
}

const StarIcon: React.FC<{ filled: number; size: string; color?: string; emptyColor?: string }> = ({ 
  filled, 
  size, 
  color = "text-primary",
  emptyColor = "text-muted-foreground/30"
}) => {
  const fillPercentage = Math.min(100, Math.max(0, filled * 100))
  const id = React.useId()
  
  return (
    <div className={cn("relative", size)}>
      {/* Empty star */}
      <svg
        className={cn("absolute inset-0", emptyColor)}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      
      {/* Filled star with gradient */}
      <svg
        className={cn("absolute inset-0", color)}
        fill="currentColor"
        viewBox="0 0 24 24"
        style={{ clipPath: `url(#${id})` }}
      >
        <defs>
          <clipPath id={id}>
            <rect x="0" y="0" width={`${fillPercentage}%`} height="100%" />
          </clipPath>
        </defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>
  )
}

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  ({ 
    value: controlledValue,
    defaultValue = 0,
    onChange,
    max = 5,
    size = "default",
    readonly = false,
    allowHalf = false,
    allowClear = false,
    emptyIcon,
    filledIcon,
    halfFilledIcon,
    color,
    emptyColor,
    showValue = false,
    precision = 1,
    className,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue
    const displayValue = hoverValue !== null ? hoverValue : value
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      if (readonly) return
      
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percent = x / rect.width
      
      let newValue = index + 1
      if (allowHalf) {
        newValue = percent <= 0.5 ? index + 0.5 : index + 1
      }
      
      setHoverValue(newValue)
    }
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      if (readonly) return
      
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percent = x / rect.width
      
      let newValue = index + 1
      if (allowHalf) {
        newValue = percent <= 0.5 ? index + 0.5 : index + 1
      }
      
      if (allowClear && value === newValue) {
        newValue = 0
      }
      
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }
    
    const handleMouseLeave = () => {
      setHoverValue(null)
    }
    
    const renderStar = (index: number) => {
      const filled = Math.min(1, Math.max(0, displayValue - index))
      
      if (emptyIcon && filledIcon) {
        if (filled === 0) return emptyIcon
        if (filled === 1) return filledIcon
        if (halfFilledIcon && filled === 0.5) return halfFilledIcon
      }
      
      return <StarIcon filled={filled} size={starSizes[size]} color={color} emptyColor={emptyColor} />
    }
    
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1", className)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className={cn(
          "inline-flex items-center",
          !readonly && "gap-0.5"
        )}>
          {Array.from({ length: max }, (_, i) => (
            <div
              key={i}
              className={cn(
                "relative transition-all duration-200",
                !readonly && [
                  "cursor-pointer",
                  "hover:scale-110",
                  displayValue > i && "scale-105"
                ]
              )}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onClick={(e) => handleClick(e, i)}
            >
              {renderStar(i)}
            </div>
          ))}
        </div>
        
        {showValue && (
          <span className={cn(
            "ml-2 font-medium",
            size === "sm" && "text-xs",
            size === "default" && "text-sm",
            size === "lg" && "text-base",
            size === "xl" && "text-lg"
          )}>
            {displayValue.toFixed(precision)}
          </span>
        )}
      </div>
    )
  }
)

StarRating.displayName = "StarRating"

// Preset rating components
export const BasicRating: React.FC<Omit<StarRatingProps, "showValue">> = (props) => {
  return <StarRating {...props} />
}

export const RatingWithValue: React.FC<StarRatingProps> = (props) => {
  return <StarRating {...props} showValue />
}

export const HalfStarRating: React.FC<Omit<StarRatingProps, "allowHalf">> = (props) => {
  return <StarRating {...props} allowHalf />
}

export const ReadOnlyRating: React.FC<Omit<StarRatingProps, "readonly">> = (props) => {
  return <StarRating {...props} readonly />
}

export const ColoredRating: React.FC<StarRatingProps> = (props) => {
  return (
    <div className="space-y-2">
      <StarRating {...props} color="text-yellow-500" emptyColor="text-yellow-500/20" />
      <StarRating {...props} color="text-red-500" emptyColor="text-red-500/20" />
      <StarRating {...props} color="text-green-500" emptyColor="text-green-500/20" />
      <StarRating {...props} color="text-purple-500" emptyColor="text-purple-500/20" />
    </div>
  )
}

// Rate buttons component (like in the image)
export interface RateButtonsProps {
  value?: number
  onChange?: (value: number) => void
  className?: string
}

export const RateButtons: React.FC<RateButtonsProps> = ({ value = 3, onChange, className }) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        onClick={() => onChange?.(Math.max(0, value - 1))}
        className={cn(
          "px-4 py-2 rounded-md bg-muted hover:bg-muted/80",
          "transition-colors duration-200",
          "flex items-center gap-2 text-sm font-medium"
        )}
      >
        Rate
        <span className="text-destructive">−</span>
      </button>
      
      <StarRating value={value} onChange={onChange} size="lg" />
      
      <button
        onClick={() => onChange?.(Math.min(5, value + 1))}
        className={cn(
          "px-4 py-2 rounded-md bg-muted hover:bg-muted/80",
          "transition-colors duration-200",
          "flex items-center gap-2 text-sm font-medium"
        )}
      >
        Rate
        <span className="text-primary">+</span>
      </button>
    </div>
  )
}

export { StarRating }
