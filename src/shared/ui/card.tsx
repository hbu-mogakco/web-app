import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils"

const cardVariants = cva(
  "border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-card-default border-space-cadat-border",
        dark: "bg-space-cadat-default border-space-cadat-border",
        gradient: "bg-gradient-to-tr from-space-cadat-default to-[#545494] border-gradient-to-tr from-space-cadat-default via-[#515173] via-[#9E9ED3] via-[#66668C] to-space-cadat-default",
      },
      shadow: {
        none: "shadow-inner-sm",
        sm: "shadow-sm shadow-inner-sm",
        md: "shadow-md shadow-inner-sm",
      },
      radius: {
        sm: "rounded",
        md: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      shadow: "none",
      radius: "md",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, shadow, radius, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, shadow, radius, className }))} {...props} />
  )
}

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
