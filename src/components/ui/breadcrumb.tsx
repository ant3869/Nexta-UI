import * as React from "react"
import { ChevronRight, MoreHorizontal, Home } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "/src/lib/utils";

const breadcrumbVariants = cva(
  "flex items-center space-x-1 text-sm text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        pills: "[&_li]:rounded-full [&_li]:bg-muted [&_li]:px-3 [&_li]:py-1",
        underlined: "[&_li]:border-b-2 [&_li]:border-transparent [&_li:last-child]:border-primary [&_li:last-child]:text-primary",
        arrows: "[&_li]:after:content-['>'] [&_li]:after:ml-2 [&_li]:after:text-muted-foreground [&_li:last-child]:after:content-['']",
        slashes: "[&_li]:after:content-['/'] [&_li]:after:ml-2 [&_li]:after:text-muted-foreground [&_li:last-child]:after:content-['']",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  separator?: React.ReactNode
  showHomeIcon?: boolean
  items: {
    href?: string
    label: string
    active?: boolean
  }[]
  maxItems?: number
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, variant, separator, showHomeIcon = false, items, maxItems, ...props }, ref) => {
    const displayItems = React.useMemo(() => {
      if (!maxItems || items.length <= maxItems) return items
      
      const firstItem = items[0]
      const lastItems = items.slice(-2)
      
      return [
        firstItem,
        { label: "...", href: undefined, active: false },
        ...lastItems,
      ]
    }, [items, maxItems])
    
    return (
      <nav
        ref={ref}
        className={cn("", className)}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className={cn(breadcrumbVariants({ variant }))}>
          {showHomeIcon && (
            <li className="inline-flex items-center">
              <a href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </a>
            </li>
          )}
          
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1
            
            return (
              <li key={index} className="inline-flex items-center">
                {index > 0 && separator ? (
                  <span className="mx-2 text-muted-foreground">{separator}</span>
                ) : index > 0 ? (
                  <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
                ) : null}
                
                {item.label === "..." ? (
                  <MoreHorizontal className="h-4 w-4" />
                ) : item.href && !isLast ? (
                  <a 
                    href={item.href}
                    className={cn(
                      "hover:text-foreground",
                      item.active && "text-foreground font-medium"
                    )}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className={cn(
                    isLast && "text-foreground font-medium",
                    item.active && "text-foreground font-medium"
                  )}>
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }
