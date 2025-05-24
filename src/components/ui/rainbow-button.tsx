import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "/src/lib/utils"

const rainbowButtonVariants = cva(
  "relative overflow-hidden cursor-pointer font-semibold rounded-xl border border-white/5",
  {
    variants: {
      variant: {
        primary: "rainbow-button-primary",
        secondary: "rainbow-button-secondary",
      },
      size: {
        default: "px-4 py-3",
        sm: "px-3 py-2 text-sm",
        lg: "px-6 py-4 text-lg",
        icon: "p-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rainbowButtonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  shortcut?: string
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, variant, size, children, isLoading, leftIcon, rightIcon, shortcut, disabled, ...props }, ref) => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || disabled) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setMousePos({ x, y });
    };

    const handleMouseEnter = () => {
      if (!disabled) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePos({ x: 0, y: 0 });
    };

    return (
      <button
        ref={buttonRef}
        className={cn(
          rainbowButtonVariants({ variant, size, className }),
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled || isLoading}
        style={{
          '--coord-x': mousePos.x,
          '--coord-y': mousePos.y,
          '--button-shadow-opacity': disabled ? '0' : isHovered ? '28' : '0',
          '--button-shadow-spread': disabled ? '0' : isHovered ? '24' : '0',
          '--button-bg-opacity': disabled ? '0' : isHovered ? '0.35' : '0',
          '--button-after-opacity': disabled ? '0' : isHovered ? '0.8' : '0',
        } as React.CSSProperties}
        {...props}
      >
        <div className="button-inner flex items-center justify-center gap-3">
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
          {shortcut && (
            <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs border border-white/10 ml-2">
              {shortcut}
            </span>
          )}
        </div>
      </button>
    )
  }
)
RainbowButton.displayName = "RainbowButton"

export { RainbowButton, rainbowButtonVariants }