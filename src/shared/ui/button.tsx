import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-strong",
        white: "bg-white text-button-secondary hover:bg-button-secondary-hover active:bg-button-secondary-pressed",
        cadat: "bg-space-cadat-default text-white border border-space-cadat-border hover:bg-space-cadat-hover active:bg-space-cadat-border shadow-inner-sm",
        outlined: "border border-primary text-primary hover:border-primary-hover hover:text-primary-hover active:border-primary-strong active:text-primary-strong",
      },
      size: {
        sm: "h-8 px-3 py-2 text-sm gap-1.5",
        md: "h-10 px-3 py-2 text-base gap-2",
        lg: "h-12 px-3 py-2 text-base gap-2",
        icon: "h-10 w-10 p-2",
      },
      withIcon: {
        true: "gap-1",
        false: null,
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      withIcon: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  withIcon?: boolean
}

function Button({
  className,
  variant,
  size,
  withIcon,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, withIcon, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
