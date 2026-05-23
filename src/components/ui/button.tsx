import { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border border-primary/35 bg-gradient-to-r from-primary to-primary text-white shadow-[0_12px_24px_-14px_rgba(0,143,199,0.5)] hover:from-[#0077A8] hover:to-[#0077A8] hover:shadow-[0_16px_28px_-16px_rgba(0,119,168,0.62)] dark:border-cyan-300/45 dark:bg-gradient-to-r dark:from-cyan-500 dark:via-cyan-400 dark:to-sky-500 dark:text-white dark:shadow-[0_16px_30px_-18px_rgba(6,182,212,0.9)] dark:hover:brightness-105 dark:hover:shadow-[0_20px_34px_-20px_rgba(6,182,212,1)]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "glass-outline text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-primary/50 hover:bg-primary/8 dark:border-cyan-400/35 dark:bg-[rgba(15,23,42,0.55)] dark:text-slate-50 dark:hover:border-cyan-300/65 dark:hover:bg-cyan-500/12",
        secondary:
          "border border-border/70 bg-secondary/70 text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-secondary/90 dark:border-cyan-400/35 dark:bg-[rgba(15,23,42,0.55)] dark:text-slate-50 dark:hover:border-cyan-300/65 dark:hover:bg-cyan-500/12",
        ghost:
          "hover:bg-accent/70 hover:text-accent-foreground dark:hover:bg-cyan-500/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
