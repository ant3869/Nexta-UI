import React, { useState, useRef, useEffect, cloneElement, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from "../../lib/utils";

// Types
export type TooltipPlacement = 
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

// Tooltip content variants
const tooltipContentVariants = cva(
  "relative rounded-md px-3 py-2 text-sm leading-normal text-center shadow-md",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-dark-800 text-dark-900 dark:text-white border border-dark-200 dark:border-dark-600",
        light: "bg-white text-dark-900 border border-dark-200",
        dark: "bg-dark-800 text-white",
        colored: "bg-primary-500 text-white",
        glass: "bg-white/75 dark:bg-dark-800/75 text-dark-900 dark:text-white border border-white/10 dark:border-dark-600/20 backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TooltipProps extends VariantProps<typeof tooltipContentVariants> {
  /**
   * Content to display in the tooltip
   */
  content: React.ReactNode;
  
  /**
   * Child element that triggers tooltip
   */
  children: React.ReactElement;
  
  /**
   * Tooltip placement relative to trigger
   * @default 'top'
   */
  placement?: TooltipPlacement;
  
  /**
   * Event that triggers tooltip
   * @default 'hover'
   */
  trigger?: TooltipTrigger | TooltipTrigger[];
  
  /**
   * Delay before showing tooltip (ms)
   * @default 0
   */
  delayShow?: number;
  
  /**
   * Delay before hiding tooltip (ms)
   * @default 0
   */
  delayHide?: number;
  
  /**
   * Whether tooltip is visible (controlled mode)
   */
  visible?: boolean;
  
  /**
   * Default visibility (uncontrolled mode)
   * @default false
   */
  defaultVisible?: boolean;
  
  /**
   * Whether tooltip should be arrow-less
   * @default false
   */
  noArrow?: boolean;
  
  /**
   * Custom tooltip color
   */
  color?: string;
  
  /**
   * Maximum width of tooltip
   * @default '20rem'
   */
  maxWidth?: string;
  
  /**
   * Custom tooltip class
   */
  className?: string;
  
  /**
   * Whether tooltip should animate
   * @default true
   */
  animated?: boolean;
  
  /**
   * Z-index for tooltip
   * @default 1050
   */
  zIndex?: number;
  
  /**
   * Offset from target element (in pixels)
   * @default 8
   */
  offset?: number;
  
  /**
   * Control showing/hiding
   */
  onVisibleChange?: (visible: boolean) => void;
  
  /**
   * Function to get the container to append the tooltip to
   * @default () => document.body
   */
  getContainer?: () => HTMLElement;
  
  /**
   * Whether to show tooltip as an interactive element
   * @default false
   */
  interactive?: boolean;
  
  /**
   * Whether to keep tooltip in viewport
   * @default true
   */
  keepInViewport?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  variant = 'default',
  trigger = 'hover',
  delayShow = 0,
  delayHide = 0,
  visible,
  defaultVisible = false,
  noArrow = false,
  color,
  maxWidth = '20rem',
  className,
  animated = true,
  zIndex = 1050,
  offset = 8,
  onVisibleChange,
  getContainer = () => document.body,
  interactive = false,
  keepInViewport = true,
}) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substring(2, 11)}`);
  
  // Normalize trigger to array
  const triggers = Array.isArray(trigger) ? trigger : [trigger];
  
  // Controlled/uncontrolled handling
  const tooltipVisible = visible !== undefined ? visible : isVisible;
  
  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  
  // Create portal container
  useEffect(() => {
    if (!isBrowser) return;
    
    const container = getContainer();
    const portal = document.createElement('div');
    portal.style.position = 'absolute';
    portal.style.top = '0';
    portal.style.left = '0';
    portal.style.width = '100%';
    
    container.appendChild(portal);
    setPortalElement(portal);
    
    return () => {
      if (portal && container.contains(portal)) {
        container.removeChild(portal);
      }
    };
  }, [getContainer, isBrowser]);
  
  // Calculate tooltip position
  const updatePosition = () => {
    if (!isBrowser || !triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const scrollX = window.scrollX || document.documentElement.scrollLeft || 0;
    
    let top = 0;
    let left = 0;
    
    // Base positioning
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = triggerRect.top - tooltipRect.height - offset + scrollY;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = triggerRect.bottom + offset + scrollY;
        break;
      case 'left':
      case 'left-start':
      case 'left-end':
        left = triggerRect.left - tooltipRect.width - offset + scrollX;
        break;
      case 'right':
      case 'right-start':
      case 'right-end':
        left = triggerRect.right + offset + scrollX;
        break;
    }
    
    // Horizontal alignment
    switch (placement) {
      case 'top':
      case 'bottom':
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2) + scrollX;
        break;
      case 'top-start':
      case 'bottom-start':
        left = triggerRect.left + scrollX;
        break;
      case 'top-end':
      case 'bottom-end':
        left = triggerRect.right - tooltipRect.width + scrollX;
        break;
      case 'left':
      case 'right':
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2) + scrollY;
        break;
      case 'left-start':
      case 'right-start':
        top = triggerRect.top + scrollY;
        break;
      case 'left-end':
      case 'right-end':
        top = triggerRect.bottom - tooltipRect.height + scrollY;
        break;
    }
    
    // Keep in viewport if enabled
    if (keepInViewport && isBrowser) {
      // Viewport dimensions
      const viewportWidth = document.documentElement?.clientWidth || window.innerWidth;
      const viewportHeight = document.documentElement?.clientHeight || window.innerHeight;
      
      // Horizontal constraints
      if (left < 0) {
        left = 0;
      } else if (left + tooltipRect.width > viewportWidth) {
        left = viewportWidth - tooltipRect.width;
      }
      
      // Vertical constraints
      if (top < 0) {
        top = 0;
      } else if (top + tooltipRect.height > viewportHeight + scrollY) {
        top = viewportHeight + scrollY - tooltipRect.height;
      }
    }
    
    setPosition({ top, left });
  };
  
  // Show tooltip
  const showTooltip = () => {
    if (hideTimeoutRef.current !== null) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    if (showTimeoutRef.current !== null) {
      clearTimeout(showTimeoutRef.current);
    }
    
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      onVisibleChange?.(true);
    }, delayShow);
  };
  
  // Hide tooltip
  const hideTooltip = () => {
    if (showTimeoutRef.current !== null) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    
    if (hideTimeoutRef.current !== null) {
      clearTimeout(hideTimeoutRef.current);
    }
    
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      onVisibleChange?.(false);
    }, delayHide);
  };
  
  // Event handlers
  const eventHandlers = {
    onMouseEnter: triggers.includes('hover') ? showTooltip : undefined,
    onMouseLeave: triggers.includes('hover') ? hideTooltip : undefined,
    onFocus: triggers.includes('focus') ? showTooltip : undefined,
    onBlur: triggers.includes('focus') ? hideTooltip : undefined,
    onClick: triggers.includes('click') 
      ? (e: React.MouseEvent) => {
          e.preventDefault();
          
          if (tooltipVisible) {
            hideTooltip();
          } else {
            showTooltip();
          }
        }
      : undefined,
    'aria-describedby': tooltipVisible ? tooltipId.current : undefined,
  };
  
  // Interactive tooltip handlers
  const tooltipHandlers = interactive ? {
    onMouseEnter: triggers.includes('hover') ? showTooltip : undefined,
    onMouseLeave: triggers.includes('hover') ? hideTooltip : undefined,
  } : {};
  
  // Update position when tooltip becomes visible
  useEffect(() => {
    if (!isBrowser) return;
    
    if (tooltipVisible) {
      // Use requestAnimationFrame to ensure the tooltip is rendered before measuring
      requestAnimationFrame(() => {
        updatePosition();
      });
      
      // Add event listeners
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }
    
    return () => {
      if (isBrowser) {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      }
    };
  }, [tooltipVisible, isBrowser]);
  
  // Update position when content changes
  useEffect(() => {
    if (tooltipVisible && isBrowser) {
      updatePosition();
    }
  }, [content, tooltipVisible, placement, isBrowser]);
  
  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current !== null) {
        clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current !== null) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);
  
  // Get arrow placement class
  const getArrowClass = () => {
    switch (placement) {
      case 'top':
        return 'bottom-[-4px] left-1/2 transform -translate-x-1/2 rotate-45';
      case 'top-start':
        return 'bottom-[-4px] left-4 rotate-45';
      case 'top-end':
        return 'bottom-[-4px] right-4 rotate-45';
      case 'right':
        return 'left-[-4px] top-1/2 transform -translate-y-1/2 rotate-45';
      case 'right-start':
        return 'left-[-4px] top-4 rotate-45';
      case 'right-end':
        return 'left-[-4px] bottom-4 rotate-45';
      case 'bottom':
        return 'top-[-4px] left-1/2 transform -translate-x-1/2 rotate-45';
      case 'bottom-start':
        return 'top-[-4px] left-4 rotate-45';
      case 'bottom-end':
        return 'top-[-4px] right-4 rotate-45';
      case 'left':
        return 'right-[-4px] top-1/2 transform -translate-y-1/2 rotate-45';
      case 'left-start':
        return 'right-[-4px] top-4 rotate-45';
      case 'left-end':
        return 'right-[-4px] bottom-4 rotate-45';
      default:
        return 'bottom-[-4px] left-1/2 transform -translate-x-1/2 rotate-45';
    }
  };
  
  // Determine appropriate arrow border style based on placement
  const getArrowBorderClass = () => {
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return 'border-b border-r';
      case 'right':
      case 'right-start':
      case 'right-end':
        return 'border-b border-l';
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return 'border-t border-l';
      case 'left':
      case 'left-start':
      case 'left-end':
        return 'border-t border-r';
      default:
        return 'border-b border-r';
    }
  };
  
  // Animation classes
  const getAnimationClass = () => {
    if (!animated || !tooltipVisible) return '';
    
    return 'animate-in fade-in duration-200';
  };
  
  // Handle ref merging for the trigger element
  const setTriggerRef = (node: HTMLElement | null) => {
    triggerRef.current = node;
  };
  
  // Clone the trigger element with event handlers
  const triggerElement = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        ref: setTriggerRef,
        ...eventHandlers,
      })
    : children;
  
  // Style object for custom colors
  const customStyle: React.CSSProperties = {};
  if (color && variant === 'colored') {
    customStyle.backgroundColor = color;
  }
  if (maxWidth) {
    customStyle.maxWidth = maxWidth;
  }
  
  return (
    <>
      {triggerElement}
      
      {isBrowser && tooltipVisible && portalElement && createPortal(
        <div
          id={tooltipId.current}
          ref={tooltipRef}
          role="tooltip"
          className={cn(
            "absolute",
            interactive ? "pointer-events-auto" : "pointer-events-none",
            getAnimationClass(),
            className
          )}
          style={{
            ...customStyle,
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex,
          }}
          {...tooltipHandlers}
        >
          <div
            className={cn(
              tooltipContentVariants({ variant }),
              "break-words"
            )}
          >
            {content}
            
            {!noArrow && (
              <span 
                className={cn(
                  "absolute w-2 h-2", 
                  getArrowClass(),
                  getArrowBorderClass(),
                  variant === 'default' ? 'bg-white dark:bg-dark-800 border-dark-200 dark:border-dark-600' :
                  variant === 'light' ? 'bg-white border-dark-200' :
                  variant === 'dark' ? 'bg-dark-800 border-dark-800' :
                  variant === 'colored' ? 'bg-primary-500 border-primary-500' :
                  variant === 'glass' ? 'bg-white/75 dark:bg-dark-800/75 border-white/10 dark:border-dark-600/20 backdrop-blur-md' :
                  'bg-white dark:bg-dark-800'
                )}
                style={color && variant === 'colored' ? { backgroundColor: color, borderColor: color } : {}}
              />
            )}
          </div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default Tooltip;