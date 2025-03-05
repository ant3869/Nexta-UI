import * as React from "react";
import { cn } from "../../lib/utils";
export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  color?: string;
  bgColor?: string;
}

export const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  ({ 
    value, 
    max = 100, 
    size = 80, 
    strokeWidth = 6, 
    showValue = true, 
    valuePrefix = "", 
    valueSuffix = "%", 
    color = "currentColor", 
    bgColor = "rgba(0,0,0,0.1)", 
    className, 
    ...props 
  }, ref) => {
    const normalizedValue = Math.min(Math.max(0, value), max);
    const percentage = (normalizedValue / max) * 100;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const center = size / 2;

    return (
      <div 
        ref={ref} 
        className={cn("relative inline-flex items-center justify-center", className)} 
        style={{ width: size, height: size }}
        {...props}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={bgColor}
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
            {valuePrefix}{Math.round(normalizedValue)}{valueSuffix}
          </div>
        )}
      </div>
    );
  }
);

ProgressRing.displayName = "ProgressRing";
