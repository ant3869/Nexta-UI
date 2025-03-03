import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "/src/lib/utils";

const sparklineVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        success: "text-green-500",
        warning: "text-yellow-500",
        danger: "text-red-500",
        info: "text-blue-500",
        gradient: "text-transparent",
      },
      size: {
        default: "h-8",
        sm: "h-4",
        lg: "h-12",
        xl: "h-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SparklineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sparklineVariants> {
  data: number[]
  fillColor?: string
  strokeWidth?: number
  showDots?: boolean
  dotSize?: number
  showArea?: boolean
  areaOpacity?: number
  animated?: boolean
  animationDuration?: number
}

const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
  ({ 
    className, 
    variant, 
    size,
    data, 
    fillColor,
    strokeWidth = 2,
    showDots = false,
    dotSize = 4,
    showArea = true,
    areaOpacity = 0.2,
    animated = false,
    animationDuration = 1000,
    ...props 
  }, ref) => {
    const svgRef = React.useRef<SVGSVGElement>(null)
    const [pathLength, setPathLength] = React.useState(0)
    
    // Normalize data to fit in the SVG
    const normalizedData = React.useMemo(() => {
      if (!data.length) return []
      
      const min = Math.min(...data)
      const max = Math.max(...data)
      const range = max - min || 1
      
      return data.map(value => 1 - ((value - min) / range))
    }, [data])
    
    // Generate SVG path
    const path = React.useMemo(() => {
      if (!normalizedData.length) return ""
      
      const width = 100
      const height = 100
      const points = normalizedData.map((value, index) => {
        const x = (index / (normalizedData.length - 1)) * width
        const y = value * height
        return `${x},${y}`
      })
      
      return `M${points.join(" L")}`
    }, [normalizedData])
    
    // Generate area path (for fill)
    const areaPath = React.useMemo(() => {
      if (!normalizedData.length) return ""
      
      const width = 100
      const height = 100
      const startPoint = `0,${normalizedData[0] * height}`
      const endPoint = `${width},${normalizedData[normalizedData.length - 1] * height}`
      
      return `M${startPoint} ${path.substring(1)} L${endPoint} L${width},${height} L0,${height} Z`
    }, [normalizedData, path])
    
    // Calculate path length for animation
    React.useEffect(() => {
      if (svgRef.current && animated) {
        const pathElement = svgRef.current.querySelector('path')
        if (pathElement) {
          setPathLength(pathElement.getTotalLength())
        }
      }
    }, [path, animated])
    
    // Generate gradient if needed
    const gradientId = React.useId()
    
    return (
      <div
        ref={ref}
        className={cn(sparklineVariants({ variant, size, className }))}
        {...props}
      >
        <svg
          ref={svgRef}
          className="w-full h-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {variant === 'gradient' && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          )}
          
          {showArea && (
            <path
              d={areaPath}
              fill={variant === 'gradient' ? `url(#${gradientId})` : fillColor || 'currentColor'}
              opacity={areaOpacity}
              className={animated ? "transition-opacity duration-700 opacity-0 animate-[fade-in_0.7s_ease-out_forwards]" : ""}
              style={animated ? { animationDelay: '0.3s' } : {}}
            />
          )}
          
          <path
            d={path}
            fill="none"
            stroke={variant === 'gradient' ? `url(#${gradientId})` : fillColor || 'currentColor'}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={animated ? "transition-all duration-1000" : ""}
            style={animated ? {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
              animation: `dash ${animationDuration}ms ease-out forwards`
            } : {}}
          />
          
          {showDots && normalizedData.map((value, index) => {
            const x = (index / (normalizedData.length - 1)) * 100
            const y = value * 100
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={dotSize}
                fill={variant === 'gradient' ? '#8b5cf6' : fillColor || 'currentColor'}
                className={animated ? "opacity-0 animate-[fade-in_0.3s_ease-out_forwards]" : ""}
                style={animated ? { animationDelay: `${(index / normalizedData.length) * animationDuration + 100}ms` } : {}}
              />
            )
          })}
        </svg>
        
        <style jsx>{`
          @keyframes dash {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    )
  }
)
Sparkline.displayName = "Sparkline"

export { Sparkline }
