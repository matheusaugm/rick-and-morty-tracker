import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90 dark:bg-primary/80 dark:text-primary-foreground dark:hover:bg-primary/70",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary/30 dark:text-white dark:hover:bg-secondary/40",
        pagination: "px-3 py-1 mx-1 rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:text-muted-foreground dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 dark:bg-destructive/80 dark:hover:bg-destructive/70",
        outline: "border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:text-gray-300 dark:hover:bg-gray-700",
        link: "text-primary underline-offset-4 hover:underline dark:text-blue-400",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean

  onClick?: () => void
}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

/* 
Example usage:

Basic buttons:
<Button>Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="destructive">Destructive Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>

Size variants:
<Button size="default">Default Size</Button>
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>
<Button size="icon"><SomeIcon /></Button>

With icons:
<Button>
  <SomeIcon />
  Button with Icon
</Button>

As a link:
<Button asChild>
  <a href="/some-page">Navigate</a>
</Button>
*/ 