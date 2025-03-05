import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { ChevronDown } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils";

const megaMenuVariants = cva(
  "relative inline-flex",
  {
    variants: {
      variant: {
        default: "",
        underlined: "[&_button]:border-b-2 [&_button]:border-transparent [&_button:hover]:border-primary [&_button:focus]:border-primary [&_button:data-state=open]:border-primary",
        pill: "[&_button]:rounded-full",
        minimal: "[&_button]:bg-transparent [&_button:hover]:bg-transparent [&_button:focus]:bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface MegaMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof megaMenuVariants> {
  trigger: React.ReactNode
  align?: "start" | "center" | "end"
  sideOffset?: number
}

const MegaMenu = React.forwardRef<HTMLDivElement, MegaMenuProps>(
  ({ className, variant, trigger, align = "center", sideOffset = 4, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(megaMenuVariants({ variant, className }))} {...props}>
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
              {trigger}
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </DropdownMenuPrimitive.Trigger>
          
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align={align}
              sideOffset={sideOffset}
              className={cn(
                "z-50 min-w-[16rem] w-[32rem] overflow-hidden rounded-md border bg-popover p-0 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              )}
            >
              {children}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>
    )
  }
)
MegaMenu.displayName = "MegaMenu"

const MegaMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid grid-cols-3 gap-3 p-6", className)}
    {...props}
  />
))
MegaMenuContent.displayName = "MegaMenuContent"

const MegaMenuSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-3", className)}
    {...props}
  />
))
MegaMenuSection.displayName = "MegaMenuSection"

const MegaMenuSectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-sm font-medium", className)}
    {...props}
  />
))
MegaMenuSectionTitle.displayName = "MegaMenuSectionTitle"

const MegaMenuSectionItems = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
))
MegaMenuSectionItems.displayName = "MegaMenuSectionItems"

const MegaMenuSectionItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement> & { href?: string }
>(({ className, href, children, ...props }, ref) => {
  const content = (
    <li
      ref={ref}
      className={cn("text-sm", className)}
      {...props}
    >
      {children}
    </li>
  )
  
  if (href) {
    return (
      <a 
        href={href}
        className="block rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
      >
        {content}
      </a>
    )
  }
  
  return content
})
MegaMenuSectionItem.displayName = "MegaMenuSectionItem"

const MegaMenuFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-t bg-muted/50 p-4", className)}
    {...props}
  />
))
MegaMenuFooter.displayName = "MegaMenuFooter"

export {
  MegaMenu,
  MegaMenuContent,
  MegaMenuSection,
  MegaMenuSectionTitle,
  MegaMenuSectionItems,
  MegaMenuSectionItem,
  MegaMenuFooter,
}
